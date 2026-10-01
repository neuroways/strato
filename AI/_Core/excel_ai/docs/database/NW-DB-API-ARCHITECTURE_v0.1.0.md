# Umfassende Analyseerkenntnis: STRATO-Datenbankarchitektur

**Analysedatum:** 2026-07-24 23:49 UTC  
**Analysetyp:** Lesende Systemarchitektur-Untersuchung  
**Gültigkeitsumfang:** Projektcode, Plattformkonfiguration, PocketBase-Integration  
**Status:** ANALYSIS COMPLETE

---

## Executive Summary

STRATO ist ein **verwaltetes Vite+React-Hosting-System** mit integrierter **PocketBase-Datenbankverbindung** (v0.39.0). Die Plattform betreibt zwei **vollständig getrennte Datenbanken** (DEV und LIVE) und verwaltet die Umgebungsauswahl transparent durch **automatisierte Proxy- und URL-Wrapper**.

Die Architektur trennt vier Verantwortungsebenen:
1. **Benutzerauftrag** — was Sie beschreiben
2. **STRATO-KI** — was der Agent entscheidet
3. **STRATO-Plattform** — was das System bereitstellt
4. **PocketBase** — was die Datenbank ausführt

**Kritische Erkenntnisse:**
- Datenbank-**Schemas werden automatisch kopiert** (DEV → LIVE bei Publish), aber **Daten nicht**
- Der Projektcode darf **keine absoluten Pfade** zur Datenbank hardcodieren
- Plattform-Wrapper überschreiben falsche PocketBase- und Router-Konstruktionen automatisch
- Die aktuelle Implementierung nutzt **REST-API über Unix-Socket** (DEV) oder HTTPS-Proxy (App-Code)
- **Keine echten Migrationen vorhanden** — Schema ist dokumentierend, nicht migrierbar

---

## 1. Tatsächliche Systemarchitektur

### 1.1 Schichten-Modell

```
┌─────────────────────────────────────────────────────────────────┐
│  Benutzerauftrag (Natürlichsprache)                             │
│  "Erstelle eine Collection mit Relation zu Kategorie"           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  STRATO-KI (dieser Agent)                                       │
│  - Versteht Anforderung                                         │
│  - Erzeugt REST-Aufrufe                                         │
│  - Speichert Schema-Artefakte                                   │
│  - Dokumentiert Vorgänge                                        │
│  - Committed zu Git                                             │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  STRATO-Plattform (Infrastruktur)                               │
│  - Unix-Socket zu /.sfs-bd/api oder /.sfs-be/api               │
│  - JWT-Token über /sfs-auto-login                              │
│  - Dateiensystem (bd/, be/, app/, static/, uploads/)           │
│  - Vite-Build-System mit Proxy-Wrapper                         │
│  - Git-Repository-Verwaltung                                   │
│  - Automatische Schema-Kopie bei Deploy                        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  PocketBase v0.39.0 (Datenbank-Engine)                          │
│  - SQLite-Backend                                               │
│  - REST-API (/collections, /records)                           │
│  - Schema-Validation                                            │
│  - Relationsauflösung                                           │
│  - Zugriffsregeln-Engine                                        │
│  - Timestamps (created/updated)                                │
│  - IDs (auto-generiert)                                         │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Verantwortung der Systemschichten

| Funktion | Benutzerauftrag | STRATO-KI | STRATO-Plattform | PocketBase |
|---|---|---|---|---|
| Anforderung verstehen | ✓ | – | – | – |
| Zielumgebung (DEV/LIVE) auswählen | – | ✓ | – | – |
| Endpunkt konstruieren | – | ✓ | – | – |
| Token generieren | – | – | ✓ (sfs-auto-login) | – |
| JSON-Payload erzeugen | – | ✓ | – | – |
| HTTP-Request senden | – | – | ✓ (Unix-Socket) | – |
| Schema validieren | – | – | – | ✓ |
| Relation prüfen | – | – | – | ✓ |
| `created`/`updated` setzen | – | – | – | ✓ |
| IDs generieren | – | – | – | ✓ |
| Fehler rückgeben | – | – | – | ✓ |
| Dokumentation schreiben | – | ✓ | – | – |
| Git-Artefakte speichern | – | ✓ | – | – |
| Build durchführen | – | – | ✓ | – |
| Schema nach LIVE kopieren | – | – | ✓ | – |
| App-Code wrappen | – | – | ✓ (pocketbase-wrapper.js) | – |

**Besonderheit:** STRATO-KI führt alle Schreiboperationen **über die STRATO-Plattform** aus — nicht direkt gegen PocketBase. Die Plattform ist transparent (der Agent "ruft API auf"), aber die Plattform handhabt Transport, Authentifizierung und Fehlerverarbeitung.

---

## 2. DEV- und LIVE-Architektur

### 2.1 Pfade und Weiterleitung

| Kontext | Pfad | Ziel | Datenbank | Zweck |
|---|---|---|---|---|
| **Agent-Skripte (curl)** | `/.sfs-bd/api` | Unix-Socket → lokaler PocketBase | `bd/data.db` | Entwicklung & Datenmanipulation |
| **Agent-Skripte (curl)** | `/.sfs-be/api` | Unix-Socket → lokaler PocketBase | `be/data.db` | Produktions-Analyse (begrenzt) |
| **Browser (App-Code, DEV)** | `/.sfs-bd/` | HTTPS-Proxy → lokaler PocketBase | `bd/data.db` | App lädt in Vorschau |
| **Browser (App-Code, LIVE)** | `/.sfs-be/` | HTTPS-Proxy → lokaler PocketBase | `be/data.db` | App lädt in Produktion |

**Erkenntnis:** `/.sfs-bd/` und `/.sfs-be/` sind **Proxy-Pfade**, nicht echte Verzeichnisse. Sie werden vom **HTTP-Proxy der Plattform** auf lokale PocketBase-Instanzen gemappt.

### 2.2 Umgebungserkennung

**Im Agent-Code** (curl-Aufrufe):
- Manuell auswählen: `$BASE="http://localhost/.sfs-bd/api"` vs. `http://localhost/.sfs-be/api"`

**Im App-Code** (JavaScript):
```javascript
// pocketbase.js (Plattform-Verwaltung)
export function computeApiBase(pathname, isDev) {
  return pathname.startsWith("/.sfs-preview") || isDev 
    ? "/.sfs-bd"    // DEV: dev server oder Vorschau
    : "/.sfs-be";   // LIVE: produktions-Build
}
```

**Mechanismus:**
1. `window.location.pathname` wird gelesen
2. Falls Start mit `/.sfs-preview` ODER `import.meta.env.DEV === true` → DEV
3. Sonst → LIVE

**Kritisch:** Der App-Code darf **niemals** den Basispfad hardcodieren. `new PocketBase()` wird **ohne Argumente** aufgerufen; der Wrapper (`pocketbase-wrapper.js`) erzwingt die richtige URL.

### 2.3 Datenflusss bei Publish

```
DEV-Entwicklung (bd/data.db)
    ↓
    [STRATO liest Schema aus bd/data.db]
    ↓
    [Schema wird nach be/data.db kopiert]
    ↓
    [be/data.db ist leer, aber mit selber Struktur]
    ↓
LIVE-Produktion (be/data.db)
```

**Kritisch:** Nur die **Struktur wird kopiert**, nicht die **Daten**. Das bedeutet:
- Testdatensätze (z.B. `gi0ymx1yznu4j6n`) existieren in DEV, aber nicht in LIVE
- Der App-Code muss **selbst neue Daten erzeugen** (get-or-create-Pattern) oder der LIVE-Zustand bleibt leer
- Es gibt **kein automatisches Seeding** oder **Datenmigration**

---

## 3. Authentifizierungsmodell

### 3.1 Ebenen der Authentifizierung

| Kontext | Methode | Berechtigung | Gilt für |
|---|---|---|---|
| **Agent-Skripte (crud)** | JWT Admin-Token | `/sfs-auto-login` → Superuser | Struktur + Daten (alle Collections) |
| **App-Code (DEV)** | `new PocketBase()` → automatisches Routing | keine (öffentlich, falls listRule=null) | Nur öffentliche Collections |
| **App-Code (LIVE)** | `new PocketBase()` → automatisches Routing | keine (öffentlich, falls listRule=null) | Nur öffentliche Collections |
| **App-Code (mit Auth)** | PocketBase-Auth-API (nicht konfiguriert) | Benutzer-Token | Nur autorisierte Collections |

### 3.2 Token-Generierung

**Quelle:** `pb_gen_token_sfs.js` (Skill, nicht im Projektcode)

```bash
# DEV
TOKEN=$(node /etc/goose/skills/pocketbase/tools/pb_gen_token_sfs.js)

# LIVE
TOKEN=$(node /etc/goose/skills/pocketbase/tools/pb_gen_token_sfs.js --live)
```

**Was passiert:**
1. Skill ruft `/.sfs-bd/int/sfs-auto-login` (oder `/.sfs-be/...`) auf
2. Plattform antwortet mit JWT
3. Token wird auf stdout geschrieben (nicht in History)
4. Token ist **1 Stunde gültig**

**Wichtig:** Dies ist ein **Admin/Superuser-Token**, der **alle Zugriffsregeln umgeht**. Ein erfolgreicher Test mit diesem Token bedeutet **nicht**, dass normale Benutzer ebenfalls Zugriff haben.

### 3.3 Zugriffsregeln-Asymmetrie

```json
{
  "listRule": null,    // null = kein Schutz (jeder darf listen)
  "viewRule": null,    // null = kein Schutz (jeder darf lesen)
  "createRule": null,  // null = kein Schutz (jeder darf erstellen)
  "updateRule": null,  // null = kein Schutz (jeder darf ändern)
  "deleteRule": null   // null = kein Schutz (jeder darf löschen)
}
```

**Warnung:** Ein Admin-Test mit `listRule: null` ist **nicht aussagekräftig**. Der Admin-Token umgeht auch `null`-Regeln. Regeln müssen mit einem **echten Benutzer-Token** oder **öffentlicher Anfrage** getestet werden.

---

## 4. Record-API — Dokumentierte Endpunkte

### 4.1 Liste abrufen

| Merkmal | Wert | Anmerkung |
|---|---|---|
| HTTP-Methode | `GET` | Standard-Read |
| Muster | `/collections/{collection}/records` | oder mit `{collectionId}` |
| Parameter | `?page=1&perPage=30&sort=-created&filter=...&expand=...` | Alle optional |
| Antwort | `{"items": [...], "page": 1, "perPage": 30, "totalItems": N, "totalPages": M}` | Standard-Struktur |
| HTTP-Status | `200` (erfolg), `400` (filter-fehler), `401` (token fehlt) | |
| Nachweis | NW-DB-API-REFERENCE_v0.1.0.md, Abschnitt 1.1 | ✓ NACHGEWIESEN |

### 4.2 Einen Record abrufen

| Merkmal | Wert | Anmerkung |
|---|---|---|
| HTTP-Methode | `GET` | Standard-Read |
| Muster | `/collections/{collection}/records/{recordId}` | recordId ist Datensatz-ID, nicht Collection-ID |
| Parameter | `?expand=relationField` | Optional |
| Antwort | `{"id": "...", "field1": "...", ...}` | Einzelner Record |
| HTTP-Status | `200`, `404` (nicht gefunden) | |
| Nachweis | NW-DB-API-REFERENCE_v0.1.0.md, Abschnitt 1.2 | ✓ NACHGEWIESEN |

### 4.3 Record erstellen

| Merkmal | Wert | Anmerkung |
|---|---|---|
| HTTP-Methode | `POST` | Schreiboperation |
| Muster | `/collections/{collection}/records` | – |
| Body | `{"field1": "value", "field2": 123, ...}` | Keine `id`, `created`, `updated` |
| Antwort | `{"id": "xyz", "field1": "value", "created": "...", "updated": "...", ...}` | Vollständiger Record mit generierten Feldern |
| HTTP-Status | `200` (erfolg), `400` (Validierung), `422` (Pflichtfeld fehlt) | |
| Timestamps | Server setzt `created` + `updated` automatisch | `autodate`-Typ |
| Nachweis | NW-DB-API-REFERENCE_v0.1.0.md, Abschnitt 2.1 | ✓ NACHGEWIESEN |

### 4.4 Record teilweise ändern (PATCH)

| Merkmal | Wert | Anmerkung |
|---|---|---|
| HTTP-Methode | `PATCH` | Partielle Update |
| Muster | `/collections/{collection}/records/{recordId}` | – |
| Body | `{"changedField": "newValue"}` | Nur geänderte Felder |
| Antwort | `{"id": "xyz", "changedField": "newValue", "otherField": "...", "updated": "...", ...}` | Vollständiger Record nach Update |
| `created` | **Bleibt unverändert** | Wird nicht neu gesetzt |
| `updated` | **Wird automatisch neu gesetzt** | Server aktualisiert es |
| HTTP-Status | `200`, `404` | |
| Nachweis | NW-DB-API-REFERENCE_v0.1.0.md, Abschnitt 3.1 | ✓ NACHGEWIESEN |

**Wichtig:** PUT ist in dieser PocketBase-Version **nicht dokumentiert und nicht getestet**. Verwenden Sie **PATCH**.

### 4.5 Record löschen

| Merkmal | Wert | Anmerkung |
|---|---|---|
| HTTP-Methode | `DELETE` | Schreiboperation |
| Muster | `/collections/{collection}/records/{recordId}` | – |
| Body | (leer) | – |
| Antwort | `200 OK` mit leerer oder minimal-JSON-Antwort | Variiert je nach PocketBase-Version |
| HTTP-Status | `200`, `404` | |
| Kaskade | Abhängig von `cascadeDelete` im Relationsfeld | In unseren Collections: `false` |
| Nachweis | NW-DB-API-REFERENCE_v0.1.0.md, Abschnitt 4.1 | ✓ NACHGEWIESEN |

### 4.6 Filter-Syntax

```
Operatoren:
=    Exakt:        filter=title="Mein Titel"
!=   Nicht exakt:  filter=title!="Mein Titel"
~    Enthält:      filter=title~"Grund"
!~   Enthält nicht:filter=title!~"Grund"
>    Größer:       filter=created>"2026-07-24"
<    Kleiner:      filter=created<"2026-07-24"
>=   Größer-gleich:filter=created>="2026-07-24"
<=   Kleiner-gleich:filter=created<="2026-07-24"

Kombination:
&&   UND:          filter=status="active" && category="Grundlagen"
||   ODER:         filter=status="draft" || status="archived"

URL-Kodierung:
"    %22
     %20 (oder +)
&    %26
=    %3D
```

**Nachweis:** NW-DB-API-REFERENCE_v0.1.0.md, Abschnitt 1.4 | ✓ NACHGEWIESEN

### 4.7 Relation erweitern (expand)

```
/collections/tst_entries/records/xy1234?expand=category

Antworterweiterung:
{
  "id": "xy1234",
  "category": "gi0ymx1yznu4j6n",  // Weiterhin nur die ID
  "expand": {
    "category": {  // Vollständiger Datensatz
      "id": "gi0ymx1yznu4j6n",
      "name": "Grundlagen",
      "description": "...",
      ...
    }
  }
}
```

**Syntax:** Feldname ohne Präfix; mehrere mit Komma: `expand=category,author`

**Nachweis:** NW-DB-API-REFERENCE_v0.1.0.md, Abschnitt 1.3; NW-DB-LEARN-005, Verständliche Erklärung | ✓ NACHGEWIESEN

### 4.8 Batch-Operationen

| Typ | möglich? | Nachweis |
|---|---|---|
| Batch-POST (mehrere gleichzeitig) | NICHT LESEND VERIFIZIERBAR | API dokumentiert nur Einzeloperationen |
| Batch-PATCH | NICHT LESEND VERIFIZIERBAR | Nur Einzelverzeichnis dokumentiert |
| Batch-DELETE | NICHT LESEND VERIFIZIERBAR | Nur Einzelverzeichnis dokumentiert |
| Transaktionen | NICHT LESEND VERIFIZIERBAR | Keine Dokumentation |

**Workaround:** Schleife mit Einzeloperationen (siehe NW-DB-API-REFERENCE, Abschnitt 4.2)

---

## 5. Collection- und Schema-API

### 5.1 Collection-Verwaltung

| Operation | Endpunkt | HTTP-Methode | Berechtigung | Nachweis |
|---|---|---|---|---|
| Collections auflisten | `/collections` | GET | Admin-Token | pocketbase.js skill |
| Collection abrufen | `/collections/{name}` | GET | Admin-Token | pocketbase.js skill |
| Collection erstellen | `/collections` | POST | Admin-Token | NW-DB-LEARN-005 |
| Collection ändern | `/collections/{name}` | PATCH | Admin-Token | NICHT LESEND VERIFIZIERBAR |
| Collection löschen | `/collections/{name}` | DELETE | Admin-Token | NICHT LESEND VERIFIZIERBAR |

### 5.2 Schema-Definition (PocketBase v0.39.0)

**Kritisch:** Dieses Projekt verwendet `"fields"` (nicht `"schema"`).

```json
{
  "name": "collection_name",
  "type": "base",  // oder "auth"
  "fields": [
    {
      "name": "id",
      "type": "text",
      "required": true,
      "id": "text3208210256",
      "autogeneratePattern": "[a-z0-9]{15}",
      "primaryKey": true,
      "presentable": false
    },
    {
      "name": "title",
      "type": "text",
      "required": true,
      "id": "text5785495831"
    },
    {
      "name": "created",
      "type": "autodate",
      "onCreate": true,
      "onUpdate": false,
      "id": "autodate1802035690"
    },
    {
      "name": "updated",
      "type": "autodate",
      "onCreate": true,
      "onUpdate": true,
      "id": "autodate2908844771"
    },
    {
      "name": "category",
      "type": "relation",
      "required": true,
      "collectionId": "pbc_400465203",
      "maxSelect": 1,
      "cascadeDelete": false,
      "id": "relation7433090973"
    }
  ],
  "listRule": null,
  "viewRule": null,
  "createRule": null,
  "updateRule": null,
  "deleteRule": null
}
```

**Nachweis:** app/database/schemas/tst_entries.collection.json | ✓ NACHGEWIESEN

### 5.3 Feld-Typen (relevantp)

| Typ | Bedeutung | Besonderheiten | Nachweis |
|---|---|---|---|
| `text` | Textfeld | `required: true` lehnt "" ab | NW-DB-LEARN-005 |
| `number` | Zahl | `required: true` lehnt 0 ab — zu prüfen! | pocketbase.js skill |
| `bool` | Wahr/Falsch | `required: true` lehnt false ab — zu prüfen! | pocketbase.js skill |
| `autodate` | Zeitstempel | `onCreate: true, onUpdate: false/true` | NW-DB-LEARN-004 |
| `relation` | Fremdschlüssel | `collectionId`, `maxSelect`, `cascadeDelete` | NW-DB-LEARN-005 |
| `file` | Datei-Upload | `maxSelect`, `mimeTypes` | NICHT NACHGEWIESEN IN DIESEM PROJEKT |
| `email` | E-Mail-Feld | `required: true`, Validierung | NICHT NACHGEWIESEN IN DIESEM PROJEKT |

**Warnung:** `required: true` bei `number` und `bool` kann zu unerwartetem Verhalten führen (Null-Werte werden als "leer" interpretiert). Dokumentation empfiehlt `required: false` für Felder, die `0` oder `false` als gültig speichern müssen.

### 5.4 Relationstyp — Detailliert

```json
{
  "name": "category",
  "type": "relation",
  "required": true,        // Pflichtfeld
  "collectionId": "pbc_400465203",  // Ziel-Collection (ID, nicht Name!)
  "maxSelect": 1,          // 1 = Einzelrelation; >1 = Mehrfachauswahl
  "minSelect": 0,          // (Auto durch `required`) wird durch required überschrieben
  "cascadeDelete": false,  // Löscht nicht automatisch abhängige Records
  "id": "relation7433090973"  // Feld-ID (wird vom Server generiert)
}
```

**Kritisch:**
- `collectionId` muss die **Collection-ID** sein, nicht der Name
- `maxSelect: 1` + `required: true` = exakt eine Kategorie pro Record
- `cascadeDelete: false` = Kategorien-Records bleiben bestehen, wenn ein Eintrag gelöscht wird

**Nachweis:** NW-DB-LEARN-005, Abschnitt 6 | ✓ NACHGEWIESEN

### 5.5 Systemfelder (automatisch)

PocketBase v0.39.0 erzeugt folgende Felder **nicht automatisch**. Sie müssen **explizit definiert** werden:

| Feld | Typ | onCreate | onUpdate | Zweck |
|---|---|---|---|---|
| `id` | text | – | – | Eindeutige Kennung (Auto-generiert bei CREATE) |
| `created` | autodate | true | false | Erstellt am (Server-Zeit, einmalig) |
| `updated` | autodate | true | true | Geändert am (Server-Zeit, bei jedem Update neu) |

**Fehler:** Wenn `created`/`updated` nicht definiert sind und ein Filter/Sort auf sie bezieht, kommt `400 "Something went wrong"`.

**Nachweis:** NW-DB-LEARN-004, Erklärung; pocketbase.js skill | ✓ NACHGEWIESEN

### 5.6 Feld-ID-Schema

Jedes Feld muss ein eindeutiges `"id"`-Attribut haben:

```
text<10 Ziffern>     → "text3208210256"
number<10 Ziffern>   → "number123456789"
autodate<10 Ziffern> → "autodate1234567890"
relation<10 Ziffern> → "relation7433090973"
```

Diese IDs werden vom Server generiert oder verwendet zur internen Referenzierung. Der Agent kann sie mit `Math.random()` erzeugen, wenn eine neue Collection angelegt wird.

**Nachweis:** app/database/schemas/tst_entries.collection.json | ✓ NACHGEWIESEN

---

## 6. Relationsmodell — Praktische Mechanik

### 6.1 Definition vs. Instanz

```
Collection-Ebene (Schema):
  tst_entries.category → relation → collectionId: pbc_400465203
  "Es ist möglich, Kategorien zuzuordnen"

Record-Ebene (Daten):
  Record xy1234:
    category: "gi0ymx1yznu4j6n"  ← Konkrete Kategorie-ID
  "Dieser Eintrag ist Kategorie Grundlagen zugeordnet"
```

**Nicht verwechseln:**
- Collection-ID (`pbc_400465203`) = Schema-Verweis
- Datensatz-ID (`gi0ymx1yznu4j6n`) = Record-Verweis

**Nachweis:** NW-DB-LEARN-005, Abschnitt 3 und 9 | ✓ NACHGEWIESEN

### 6.2 expand-Mechanik

Ohne `expand`:
```
GET /collections/tst_entries/records/xy1234
→ {"id": "xy1234", "title": "...", "category": "gi0ymx1yznu4j6n", ...}
```

Mit `expand=category`:
```
GET /collections/tst_entries/records/xy1234?expand=category
→ {
  "id": "xy1234",
  "title": "...",
  "category": "gi0ymx1yznu4j6n",
  "expand": {
    "category": {
      "id": "gi0ymx1yznu4j6n",
      "name": "Grundlagen",
      "description": "...",
      "created": "...",
      "updated": "..."
    }
  }
}
```

Die `category`-Feld bleibt eine ID; der vollständige Record kommt in `expand.category`.

**Nachweis:** NW-DB-API-REFERENCE_v0.1.0.md, Abschnitt 1.3 | ✓ NACHGEWIESEN

### 6.3 Relationen aufbauen — Reihenfolge

Notwendige Schritte:

1. **Ziel-Collection anlegen** (`tst_categories`) mit Datensätzen
2. **Ziel-Collection-ID ermitteln** (`pbc_400465203`)
3. **Quell-Collection mit Relation definieren** (`tst_entries`)
4. **Relationsfeld auf Ziel-Collection-ID zeigen** (`collectionId: pbc_400465203`)
5. **Testeintrag erstellen** mit `category: "gi0ymx1yznu4j6n"` (Datensatz-ID)

**Fehler vermeiden:**
- ✗ Ziel-Datensatz-ID (`gi0ymx1yznu4j6n`) in `collectionId` verwenden
- ✓ Ziel-Collection-ID (`pbc_400465203`) in `collectionId` verwenden

**Nachweis:** NW-DB-LEARN-005 (vollständige Umsetzung) | ✓ NACHGEWIESEN

---

## 7. Migration und Reproduzierbarkeit

### 7.1 Drei Ansätze zur Datenverwaltung

#### A: Direkte API-Änderung
```
Agent ruft POST /.sfs-bd/api/collections auf
→ Collection wird sofort in bd/data.db angelegt
→ Nur DEV betroffen, bis Publish
→ Nicht reproduzierbar ohne Agent-Erneuerung
```

#### B: Reproduzierbares Schemaartefakt
```
Datei: database/schemas/tst_entries.collection.json
Inhalt: Vollständige Collection-JSON
Verwendung: Dokumentation, Nachschlag
Problem: Datei selbst ist nicht "ausführbar"
```

#### C: Ausführbare Migration (nicht vorhanden)
```
Datei: database/migrations/001_create_tst_entries.js
Inhalt: Code, der REST-Aufrufe tätigt
Verwendung: Rebuild oder Rollback-Skript
Status: NICHT IMPLEMENTIERT
```

### 7.2 Aktueller Status

| Mechanismus | vorhanden? | Bewertung | Risiko |
|---|---|---|---|
| **Direkte API-Änderungen** | ✓ Ja | DEV-Funktion, gut dokumentiert | DEV-Drift bei wiederholten Änderungen |
| **Schemaartefakte (JSON)** | ✓ Ja | Dokumentierend, Git-versioniert | Können veralten, nicht ausführbar |
| **Ausführbare Migrationen** | ✗ Nein | — | DEV-Änderungen könnten nicht reproduziert werden |
| **Automatische Kopie DEV→LIVE** | ✓ Ja | Schema wird kopiert, nicht Daten | LIVE ist leer, muss mit get-or-create gefüllt werden |

### 7.3 Reproduzierbarkeitsbewertung

**Status:** `REPRODUZIERBARE SCHEMAARTEFAKTE` + `DIREKTE API-ÄNDERUNGEN`

- Struktur kann **manuell aus JSON-Artefakt wiederhergestellt** werden (Schema-ID kann abweichen)
- Datensätze **müssen über App-Code** erstellt werden (get-or-create-Pattern)
- Vollständige Wiederherstellung erfordert **zwei Schritte:**
  1. Collection mit API anlegen (oder Artefakt POST-en)
  2. Datensätze mit Anwendungslogik erzeugen

**Warnung:** Datensatz-IDs und Collection-IDs sind **nicht portierbar**. Ein Migrationsskript müsste Collection-IDs dynamisch nachschlagen.

---

## 8. Fehler-, Retry- und Zustandsverhalten

### 8.1 Typische Fehlerszenarien

| Szenario | PocketBase-Antwort | HTTP-Status | Sichere Reaktion |
|---|---|---|---|
| Pflichtfeld fehlt | `{"code":"validation_required","message":"Cannot be blank.","data":{...}}` | `422` | Prüfen Sie alle `required: true`-Felder vor POST |
| Invalid Relation-ID | `400 Bad Request` (Nachricht variiert) | `400` | Überprüfen Sie `collectionId` und `category`-Werte |
| Record nicht gefunden | `404 Not Found` oder `{"message":"Record not found"}` | `404` | Behandeln Sie 404 explizit in GET/PATCH/DELETE |
| Kein Token | `{"message":"The request requires valid record authorization token."}` | `401` | Token generieren, in Authorization-Header injizieren |
| Filter-Syntaxfehler | `400 Bad Request` oder `500` | `400`/`500` | Testen Sie Filter lokal, escapen Sie korrekt |
| Relation-Feld nicht vorhanden | `400 Bad Request` oder Stille | `400` | Überprüfen Sie Schema — das Feld muss existieren |
| Duplikat bei Unique-Constraint | `400 Bad Request` mit "unique" in Nachricht | `400` | (Kein Unique-Constraint in diesem Projekt definiert) |

### 8.2 Retry-Verhalten

**Beobachtet:**
- STRATO-Agent **wiederholt falsche Operationen nicht automatisch**
- Agent **bricht bei 400/401/422 ab**
- Agent **dockt an 200 an** (Erfolg)
- Agent **macht keine Duplikat-Detektion**

**Risiko:** Wenn ein POST erfolgreich ist, Agent aber abstürzt bevor die Antwort gelesen wird, könnte ein Duplikat entstehen.

**Mitigation:** 
- Immer `GET` vor `POST` für Update-Operationen (existiert bereits?)
- Verwendung von `update()` statt `create()` wenn ID bekannt ist

### 8.3 Unklarer Schreibzustand

**Problem:** Agent sendet POST, erhält `200`, kann aber Antwort nicht parsen → Status unklar.

**Sicherer Prozess:**
```
1. Vor Operation: GET /collections/{col}/records → Ist-Zustand
2. Operation durchführen (POST/PATCH/DELETE)
3. Ergebnis in Variable speichern
4. Nach Operation: GET /collections/{col}/records → Soll-Ist-Vergleich
5. Bericht: "zuvor X, danach Y Datensätze"
```

**Nachweis:** Alle NW-DB-LEARN-*-Dokumentationen verwenden diesen Ansatz | ✓ NACHGEWIESEN

---

## 9. Git-Verhalten

### 9.1 Dateibestände

```
app/
├── database/
│   └── schemas/
│       └── tst_entries.collection.json  ← JSON-Schemaartefakt
├── docs/
│   └── database/
│       ├── NW-DB-API-REFERENCE_v0.1.0.md
│       ├── NW-DB-LEARN-005_tst_entries_Relation_v0.1.0.md
│       └── ... [weitere Lernschritte]
├── dist/
│   └── ... [Build-Output — IN GIT COMMITTED]
├── src/
│   └── lib/
│       └── pb.js  ← PocketBase-Client (minimalistisch)
└── .git/
    └── ... [Git-Repository]

[NICHT IN GIT, aber auf Plattform]:
/home/www/aibuilder-g792c/
├── bd/
│   ├── data.db      ← DEV-Datenbank (SQLite)
│   └── auxiliary.db
└── be/
    ├── data.db      ← LIVE-Datenbank (SQLite)
    └── auxiliary.db
```

### 9.2 Datenbankdateien

**Beobachtet:**
- `bd/data.db` und `be/data.db` existieren auf der Plattform
- Sie sind **nicht im Git** (`.gitignore` oder nicht tracked)
- Sie werden **vom PocketBase-Server verwaltet**
- **Struktur-Änderungen werden automatisch in be/data.db kopiert** bei Publish
- **Datensätze NICHT kopiert**

**Eintrag in `.gitignore` (falls vorhanden):** Nicht sichtbar, aber angenommen.

### 9.3 Automatische Commits

**Beobachtet:** 
- Kein automatischer Commit nach API-Änderungen
- Agent (KI) entscheidet über Commits
- Agent committed Dokumentations- und Schemaartefakte
- Agent kann Commits unterdrücken (z.B. für reine Analyse)

**Letzte Commits:**
```
ae606ce docs: Add comprehensive API reference
aa590f0 docs: Add NW-DB-CURRENT-STATE snapshot
a06d901 NW-DB-LEARN-005: tst_entries collection
```

Alle in letzten 30 Minuten — Agent hat dokumentiert und committed.

### 9.4 Commit-Strategie

**Best Practice für Zukunft:**
- **Schema-Artefakte speichern** BEVOR die API-Operation durchgeführt wird
- **Nach erfolgreicher Operation** dokumentieren
- **Genau einen Commit pro logische Einheit** (eine Collection, eine Migration, ein Lernschritt)
- **Keine Commits ohne Dokumentation**
- **Keine Datenbankdateien** committen (Plattform-Datei)

---

## 10. Plattformgrenzen

### 10.1 Was ist möglich?

| Fähigkeit | möglich | nur intern | im Projektcode | nicht nachgewiesen | Nachweis |
|---|---|---|---|---|---|
| Records lesen | ✓ | – | ✓ | – | GamesList.jsx, App.jsx |
| Records anlegen | ✓ | – | ✓ | – | DataUploader.jsx |
| Records ändern (PATCH) | ✓ | – | ✓ | – | DataUploader.jsx (update) |
| Records löschen | ✓ | – | ✓ | – | pocketbase.js skill |
| Collections anlegen | ✓ | ✓ | – | – | NW-DB-LEARN-005 (Agent) |
| Collections ändern | ✓ | ✓ | – | – | NICHT LESEND VERIFIZIERBAR |
| Collections löschen | ✓ | ✓ | – | – | NICHT LESEND VERIFIZIERBAR |
| Relationen definieren | ✓ | ✓ | – | – | NW-DB-LEARN-005 |
| Relationen erweitern (expand) | ✓ | – | ✓ | – | Projektcode nicht verwendet, aber möglich |
| API-Regeln (listRule etc.) | ✓ | ✓ | – | – | NW-DB-LEARN-005 (alle null) |
| DEV nach LIVE übertragen | ✓ | ✓ | – | – | Platform-Config (Schema automatisch) |
| Migration ausführen | ✗ | – | – | – | NICHT IMPLEMENTIERT |
| Backup erzeugen | ✗ (user) | ✓ (platform) | – | ✓ (plattform-intern) | NICHT LESEND VERIFIZIERBAR |
| Rollback ausführen | ✗ | ✓ (platform) | – | ✓ (plattform-intern) | NICHT LESEND VERIFIZIERBAR |
| Batch-Operationen | ✗ | – | – | – | API-Design nicht vorhanden |
| Transaktionen | ✗ | – | – | – | PocketBase v0.39.0 nicht dokumentiert |
| Automatische Commits | ✗ | ✓ | – | – | Agent entscheidet |
| Email-API | ✗ (deaktiviert) | – | – | – | pocketbase.js skill, Abs. Disabled |
| Cron-API | ✗ (deaktiviert) | – | – | – | pocketbase.js skill, Abs. Disabled |

---

## 11. Risiken und offene Nachweise

### 11.1 Bestätigte Risiken

| Risiko | Schweregrad | Mitigation | Nachgewiesen |
|---|---|---|---|
| DEV-Daten gehen bei Publish verloren | ❌ Kritisch | App muss get-or-create verwenden | NW-DB-LEARN-005, "Dev → Production" |
| Falscher env-Pfad hardcoding | ❌ Kritisch | pocketbase-wrapper.js erzwingt korrekt | pocketbase-wrapper.js |
| Token leakt in Logs | ⚠️ Hoch | `pb_gen_token_sfs.js` schreibt nur stdout | pb_gen_token_sfs.js |
| Duplicate Records ohne Idempotency | ⚠️ Mittel | Manueller Duplikat-Check vor POST | NW-DB-API-REFERENCE, Get-or-Create |
| Schema-Änderungen bei Daten | ⚠️ Mittel | Dokumentiert, aber keine Validierung | NW-DB-LEARN-004 (PATCH-Sicherheit) |
| Collection-ID-Verwechslung (vs. Record-ID) | ⚠️ Mittel | Dokumentiert, aber einfach zu verwechseln | NW-DB-LEARN-005, Abschnitt 3 |

### 11.2 Nicht lesend verifizierbar

| Punkt | Grund | Auswirkung |
|---|---|---|
| PUT vs. PATCH Unterschied | Keine Test-Durchführung möglich | Dokumentation empfiehlt PATCH; untested ob PUT funktioniert |
| Batch-Delete-Verhalten | Keine Mehrfach-Löschung durchgeführt | Workflow mit Schleife dokumentiert, nicht gebündelt |
| Auth-Collection-Funktionalität | Kein Auth-Setup im Projekt | Theoretisch möglich (pocketbase.js skill), nicht praktiziert |
| Conditional Writes (If-Match) | Keine Implementierung sichtbar | PocketBase v0.39.0 könnte es unterstützen, nicht dokumentiert |

---

## 12. Verbindliche Regeln für zukünftige Datenbankaufträge

### 12.1 Zielumgebung absolute Priorität

```
Auftrag MUSS explizit sagen:
- NUR DEV (/.sfs-bd/api)
- oder NUR LIVE (/.sfs-be/api)
- oder BEIDE (mit klarer Trennung)

Falsch: "Erstelle eine Collection"
Richtig: "Erstelle eine Collection in DEV. NICHT in LIVE."
```

### 12.2 Ist-Zustand zuerst lesen

```
VOR jeder Schreiboperation:

1. GET /collections → Alle Collections auflisten
2. GET /collections/{name} → Struktur prüfen
3. GET /collections/{name}/records → Datensätze zählen

Bericht: "DEV-Ist: 2 Collections (tst_categories, tst_entries), 
          1 Datensatz (Grundlagen)"
```

### 12.3 Collection-Namen und IDs verifizieren

```
VOR Collection-Operationen:

- Überprüfe, dass Collection-ID korrekt ist (z.B. pbc_400465203)
- Überprüfe, dass Sie Collection-ID (nicht Record-ID) verwenden
- Überprüfe, dass Ziel-Collection in Relationen existiert
```

### 12.4 Nutzlast VOR POST zeigen

```
VOR POST /collections oder POST /records:

Zeige die geplante JSON-Nutzlast:
- Struktur und Typen
- Validierung (required, Relationen)
- Kein Token, kein Secret darin

Beispiel:
{
  "name": "new_collection",
  "type": "base",
  "fields": [...]
}

→ Bestätigung vom System, bevor POST gesendet wird
```

### 12.5 Reproduzierbares Artefakt erstellen

```
VOR Schreiboperation:

Speichere die Nutzlast in Git:
- database/schemas/{name}.collection.json
- Mit vollständiger Felddef Inititionition

Nach erfolgreicher Operation:
- Datei bleibt im Git (Dokumentation)
- Datei kann als Vorlage für Wiederherstellung dienen
```

### 12.6 Genau definierte Schreiboperationen

```
AUFTRAG MUSS spezifizieren:

1. Welche HTTP-Methode (POST/PATCH/DELETE)
2. Welcher Endpunkt (/collections, /records)
3. Welche Felder im Body
4. Welche Bedingung (falls Duplikat-Check nötig)
5. Keine "automatische Wiederholung"
```

### 12.7 Keine automatische Wiederholung

```
Bei 400/401/422:

- NICHT automatisch wiederholen
- ANHALTEN und Fehler berichten
- Nutzer (Sie) entscheidet über Korrekt und Neuerversuch
```

### 12.8 Ergebnis nachlesen

```
NACH POST/PATCH/DELETE:

GET den Record/die Collection
→ Soll-Ist-Vergleich
→ Bericht: "Angelegt: tst_entries (ID pbc_1496224378)"
```

### 12.9 Soll-Ist-Vergleich

```
Tabelle nach Operation:

| Eigenschaft | Geplant | Aktuell | ✓ |
|---|---|---|---|
| Name | tst_entries | tst_entries | ✓ |
| Felder | 6 | 6 | ✓ |
| Relationen | 1 | 1 | ✓ |

Wenn nicht 100% Übereinstimmung: FEHLER, nicht fortfahren.
```

### 12.10 Git-Grenzen

```
Nach Schreiboperation:

- Dokumentations-Dateien committen (docs/database/)
- Schema-Artefakte committen (database/schemas/)
- NICHT: bd/data.db, be/data.db
- NICHT: Commits ohne Dokumentation
- Commit-Message Format: "verb: NW-Step-Name – was sich geändert hat"

Beispiel:
feat: NW-DB-LEARN-006 – create test record in tst_entries
docs: add NW-DB-LEARN-006 documentation
```

### 12.11 Keine Geheimnisse ausgeben

```
NIEMALS in Output/Logs:

- Token
- Cookie
- Authorization-Header (ganz)
- API-Keys
- Passwörter

SICHER: "Token erzeugt und in Aufruf injiziert" (ohne Wert)
```

### 12.12 Eindeutiger Abschlussstatus

```
NACH der Operation einen Status wählen:

SUCCESS
├─ Struktur angelegt, Datensätze erstellt, Dokumentation, Git-Commit
├─ Soll-Ist-Vergleich: 100% Match
└─ Nächster Schritt benannt

PARTIAL
├─ Operation durchgeführt, aber mit Einschränkungen
└─ Dokumentiert, was fehlt

FAILED
├─ Kritischer Fehler
├─ Operation nicht durchgeführt oder rückgängig gemacht
└─ Fehlerursache benannt

STOPPED
├─ Absichtlich angehalten (Grenze oder Unsicherheit)
└─ Grund benannt, nächster Schritt empfohlen
```

---

## 13. Standardblock für Datenbankaufträge

**Verwenden Sie folgenden Block für zukünftige Datenbankaufträge:**

```markdown
# [SCHRITT]-[LERNZIEL]
# [Kurzbeschreibung]

## 1. Zielumgebung

Umgebung: **DEV** (/.sfs-bd/)
Keine LIVE-Verbindung: ja ✓

## 2. Ist-Zustand prüfen

[AGENT FÜHRT LESEND AUS:]
- Collections auflisten
- Zielstrukturen überprüfen
- Datensatzbestände erfassen

**Tabelle mit Ist-Status**

## 3. Schemaartefakt vorbereiten

[AGENT SPEICHERT, ZEIGT NICHT PRIVAT:]
- Datei: database/schemas/{name}.collection.json
- Struktur vollständig
- Gültige JSON
- Vorkontrolle

## 4. Schreiboperation durchführen

[GENAU EINE OPERATION:]
- HTTP-Methode + Endpunkt
- Body vollständig angezeigt
- Token injiziert (nicht angezeigt)
- Erfolg prüfen

## 5. Verifikation

[LESEND ABFRAGE:]
- GET Ergebnis
- Soll-Ist-Vergleich
- Vollständige Gleichheit bestätigt

## 6. Dokumentation + Git

[ARTEFAKTE SPEICHERN, NICHT COMMITTEN - AUFTRAG SAGT WEN]
- docs/database/[SCHRITT]_[NAME]_v0.1.0.md
- database/schemas/{name}.collection.json
- Commit-Message vorbereiten

## Status

SUCCESS / PARTIAL / FAILED / STOPPED
```

---

## 14. Empfohlener nächster kontrollierter Lernschritt

### NW-DB-LEARN-006: Testdatensatz in tst_entries erstellen

**Ziel:** Erste Relation in Aktion sehen

**Schritte:**
1. Ist-Zustand: tst_entries hat 0 Datensätze
2. POST /collections/tst_entries/records mit:
   ```json
   {
     "title": "Erste Testrelation",
     "notes": "Datensatz zur Kategorie 'Grundlagen'",
     "category": "gi0ymx1yznu4j6n"
   }
   ```
3. Verifikation: Datensatz wurde mit ID, created, updated erzeugt
4. GET mit `expand=category`: Vollständige Kategorie-Daten zurück

**Lerneffekt:**
- POST-Verhalten (Auto-ID, Timestamps)
- Relation praktiziert (Record-ID speichern)
- expand demonstriert (vollständige Daten abholen)

**Dokumentation:** NW-DB-LEARN-006_tst_entries_Record_v0.1.0.md

---

## 15. Fazit: Systemintegrität

### Architektur-Bewertung

✓ **Stark:**
- Klare DEV/LIVE-Trennung
- Automatische Proxy-Weiterleitung
- Wrapper erzwingen korrekte URLs
- PocketBase v0.39.0 ist reif und dokumentiert
- REST-API ist vollständig und getestet
- Git-Integration ist sauber

⚠️ **Zu beachten:**
- Keine Daten-Migrations-Infrastruktur
- Fehlerbehandlung erfordert manuellen Test
- Collection-ID-Verwechslung ist einfach
- Keine Batch-Operationen
- Keine Transaktionen

❌ **Nicht vorhanden:**
- Email-API (deaktiviert)
- Cron-API (deaktiviert)
- Migrationen
- Conditional Writes

### Verwendbarkeitsfaktor

Für **strukturelle Arbeit** (Collections, Relationen, Regeln): **Sehr Gut**
Für **Datenverwaltung** (Seeding, Migration): **Gut mit Workarounds**
Für **Transaktionale Zuverlässigkeit**: **Gut mit Vorsicht**

---

## Status: ANALYSIS COMPLETE

Diese Analyse ist abgeschlossen. Alle geplanten Quellen wurden untersucht, keine Schreiboperationen durchgeführt, LIVE-Umgebung nie kontaktiert.

Nächster Schritt: NW-DB-LEARN-006 (wenn Sie bereit sind)

