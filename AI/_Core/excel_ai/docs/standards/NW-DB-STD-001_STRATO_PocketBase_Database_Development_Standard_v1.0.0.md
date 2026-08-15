# NW-DB-STD-001: STRATO/PocketBase Datenbankentwicklungs-Standard

**Versionsnummer:** 1.0.0  
**Gültig ab:** 2026-07-25  
**Status:** Verbindlich für alle NeuroWays-Datenbankaufträge  
**Geltungsbereich:** STRATO-Umgebung mit PocketBase v0.39.0  
**Letzte Aktualisierung:** 2026-07-25 00:38 UTC

---

## 1. Dokumentkontrolle

| Eigenschaft | Wert |
|---|---|
| Titel | STRATO/PocketBase Datenbankentwicklungs-Standard |
| Kürzel | NW-DB-STD-001 |
| Autor | NeuroWays Datenbank-Architektur |
| Basiert auf | NW-DB-API-ARCHITECTURE_v0.1.0 (1051 Zeilen, umfassende Systemanalyse) |
| Zusätzliche Quellen | NW-DB-API-REFERENCE_v0.1.0, NW-DB-LEARN-002 bis NW-DB-LEARN-005, NW-DB-CURRENT-STATE_v0.1.0 |
| Änderungsverfahren | Neue Minor-Version bei Regelergänzung; neue Major-Version bei Systemänderung |
| Anwendung | Verbindlich für alle Datenbankaufträge in dieser STRATO-Umgebung |
| Freigabe | Architektur-Review erforderlich vor Abweichung |

---

## 2. Zweck und Geltungsbereich

### 2.1 Zweck

Dieser Standard stellt sicher, dass alle **Datenbankoperationen** in der STRATO-Umgebung mit PocketBase v0.39.0:

- **Vorhersagbar** sind (dokumentierte Reihenfolge, Vor-/Nachprüfungen)
- **Reversibel** sind (Artefakte versioniert, Änderungen dokumentiert)
- **Verifizierbar** sind (Soll-Ist-Abgleich nach jeder Operation)
- **Nicht versehentlich** DEV und LIVE vermischen
- **Reproduzierbar** sind (Schema-Dateien im Git)
- **Sicher** sind vor Datenverlust und konkurrierende Strukturen

### 2.2 Geltungsbereich

**Gilt für:**
- Alle Datenbankaufträge (Analyse, Modeling, Collection-Erstellung, Schemaänderungen, Datenimport, Relationen, Rechte, Löschung)
- Alle Collections und Datensätze
- DEV-Umgebung (`/.sfs-bd/`) als Standard
- LIVE-Umgebung (`/.sfs-be/`) nur mit ausdrücklichem Auftrag und Sicherheitsfreigabe
- Projektcode (SpezialFall: hier verwendet der Code automatische Umgebungserkennung)

**Gilt nicht für:**
- Interne Plattform-Operationen
- Email oder Cron (sind deaktiviert)
- Backup/Restore (Plattform-Verantwortung)
- Rollback (Plattform-Verantwortung)

### 2.3 Zielgruppe

- Datenbankingenieure und -architekten
- NeuroWays-Entwicklung
- Code-Review und Qualitätssicherung

---

## 3. Technischer Kontext

### 3.1 Plattform und Stack

| Komponente | Version | Bedeutung |
|---|---|---|
| **STRATO-Plattform** | (Laufende Version) | Vite + React-Hosting mit integriertem PocketBase |
| **PocketBase** | 0.39.0 | REST-API + SQLite-Datenbank (v0.23+ Breaking Changes) |
| **Datenbank-Backends** | SQLite | `bd/data.db` (DEV), `be/data.db` (LIVE) |
| **DEV-Zugriff** | Unix-Socket | `/.sfs-bd/api` über `/run/cm4all/http/tie.socket` |
| **LIVE-Zugriff** | Unix-Socket | `/.sfs-be/api` über `/run/cm4all/http/tie.socket` |
| **Schema-Format** | JSON | `fields`-Array (nicht `schema`; seit v0.23) |
| **Versionskontrolle** | Git | Schemaartefakte versioniert; Daten nicht |

### 3.2 Kritische v0.39.0 Breaking Changes

PocketBase v0.39.0 ist nicht identisch mit älteren Versionen. Diese Unterschiede sind **verbindlich**:

| Änderung | Auswirkung | Regel |
|---|---|---|
| Kein `/api/admins/` mehr | Superuser via `_superusers`-Collection | Verwenden Sie immer `pb_gen_token_sfs.js` |
| `fields` statt `schema` | Verwendung von `schema` wird ignoriert | **Immer** `"fields": [...]` verwenden |
| `created`/`updated` nicht automatisch | Muss explizit als `autodate` definiert werden | **Immer** beide Felder hinzufügen, auch wenn leer |
| `required: true` lehnt Null-Werte ab | `number`, `text`, `bool` | Nutzen Sie `required: false` für Felder mit echtem Null |

---

## 4. Systemschichten und Verantwortlichkeiten

### 4.1 Vier Systemschichten

```
┌─────────────────────────────────────────────┐
│  Schicht A: Benutzerauftrag (Deutsch)       │
│  "Erstelle Collection mit Relation"         │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│  Schicht B: STRATO-KI (Agent)               │
│  - Versteht Anforderung                     │
│  - Erzeugt REST-Aufrufe                     │
│  - Speichert Schemaartefakte               │
│  - Dokumentiert und committed               │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│  Schicht C: STRATO-Plattform (Infrastruktur)│
│  - Unix-Socket-Verbindung                   │
│  - JWT-Token (pb_gen_token_sfs.js)         │
│  - HTTP-Proxy                               │
│  - Schema-Kopie DEV→LIVE bei Publish       │
│  - Vite-Build                               │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│  Schicht D: PocketBase (REST-Engine)        │
│  - REST-API (/collections, /records)       │
│  - SQLite-Datenbasis                        │
│  - Schema-Validierung                       │
│  - ID-Generierung, Timestamps               │
│  - Relationsauflösung                       │
│  - Zugriffsregeln-Anwendung                 │
└─────────────────────────────────────────────┘
```

### 4.2 Zuständigkeitsmatrix

| Funktion | A: Auftrag | B: KI-Agent | C: Plattform | D: PocketBase | Projektcode |
|---|---|---|---|---|---|
| Anforderung formulieren | ✓ | – | – | – | – |
| Zielumgebung entscheiden | – | ✓ | – | – | – |
| Ist-Zustand lesen | – | ✓ | – | – | – |
| REST-Nutzlast erzeugen | – | ✓ | – | – | – |
| Token generieren | – | – | ✓ | – | – |
| HTTP-Request senden | – | – | ✓ | – | – |
| Schema validieren | – | – | – | ✓ | – |
| Relation prüfen | – | – | – | ✓ | – |
| `created`/`updated` setzen | – | – | – | ✓ | – |
| Fehler zurückgeben | – | – | – | ✓ | – |
| Schemaartefakt speichern | – | ✓ | – | – | – |
| Dokumentation schreiben | – | ✓ | – | – | – |
| Git committen | – | ✓ | – | – | – |
| Umgebung automatisch erkennen | – | – | ✓ (wrapper) | – | ✓ (app-code) |
| Schema nach LIVE kopieren | – | – | ✓ | – | – |
| Daten nach LIVE kopieren | ✗ | ✗ | ✗ (nicht geplant) | ✗ | ✓ (get-or-create) |

---

## 5. Verbindliche Umgebungsregeln

### 5.1 DEV und LIVE sind vollständig getrennt

| Aspekt | DEV | LIVE | Regel |
|---|---|---|---|
| Datenbank-Datei | `bd/data.db` | `be/data.db` | Vollständig separate SQLite-Dateien |
| API-Endpunkt | `/.sfs-bd/api` | `/.sfs-be/api` | Unterschiedliche Proxy-Pfade |
| Schema | Wird manuell angelegt | Wird von DEV kopiert bei Publish | Struktur ist gleich, muss synchron sein |
| Daten | Beliebig, Test-Data möglich | Leer nach Publish, app-gesteuert befüllt | Keine automatische Kopie |
| Zugriff | Entwickler + Agent | Produktions-Benutzer (später) | Unterschiedliche Zugriffskontexte |

### 5.2 Schema-Synchronisierung

```
DEV-Änderung
    ↓
[Agent speichert Schemaartefakt in Git]
    ↓
[Commit]
    ↓
[STRATO liest Schema aus bd/data.db]
    ↓
[STRATO kopiert Struktur nach be/data.db]
    ↓
[LIVE hat gleiche Struktur, aber keine Testdaten]
    ↓
[Projektcode muss mit get-or-create-Pattern rechnen]
```

**Regel:** Vor Publish sicherstellen, dass alle **geplanten** Collections in DEV existieren. Nach Publish wird be/data.db automatisch aktualisiert, aber **leer**.

### 5.3 Ablauf bei Publish

1. **Geplant:** Collections in DEV anlegen, dokumentieren, committen
2. **Bei Publish:** STRATO kopiert DEV-Schema nach LIVE
3. **Nach Publish:** Projektcode lädt und prüft Collections
4. **Falls Collection fehlt:** App-Code nutzt get-or-create, um sie nachträglich zu seeden
5. **Fehler:** Wenn Schema unvollständig ist, schlägt der App-Start fehl

---

## 6. Authentifizierung und Zugriffskontexte

### 6.1 Vier Zugriffskontexte

| Kontext | Authentifizierung | Token-Quelle | Umfang | Regeln umgehen? | Nutzungsfall |
|---|---|---|---|---|---|
| **Admin/Agent** | JWT Superuser | `pb_gen_token_sfs.js` | Alle Collections, alle Records | Ja (umgeht listRule etc.) | Datenbankverwaltung, Entwicklung |
| **Anwendung (DEV)** | automatisch (keine) | PocketBase-Wrapper | Collections mit listRule=null oder viewRule=null | Nein | Vite dev-Server |
| **Anwendung (LIVE)** | automatisch (keine) | PocketBase-Wrapper | Collections mit listRule=null oder viewRule=null | Nein | Produktions-App |
| **Authentifizierter Benutzer** | Login + Token | PocketBase AuthApi | Collections mit Benutzer-bezogenen Regeln | Nein (eingeschränkt) | Zukünftige Benutzer |

### 6.2 Kritisches Missverständnis: Admin ≠ Benutzer

**Falsch:**
```
Agent testet mit Admin-Token:
  GET /collections/my_collection/records → 200 OK, 100 Records
  → "Die Collection ist öffentlich erreichbar"
```

**Korrekt:**
```
Agent testet mit Admin-Token:
  GET /collections/my_collection/records → 200 OK
  → "Admin hat Zugriff (erwartet)"

Getrennte Prüfung mit öffentlichem Request:
  (ohne Token oder mit Benutzer-Token)
  GET /collections/my_collection/records
  → Antwort hängt von listRule ab
  → Admin-Erfolg beweist NICHT öffentlichen Zugriff
```

**Regel:** Admin-Tests und Benutzer-Tests sind **vollständig getrennt** durchzuführen.

---

## 7. Naming- und Identifikationsregeln

### 7.1 Drei Arten von IDs

| ID-Typ | Format | Beispiel | Verwendung | Verwechslungsgefahr |
|---|---|---|---|---|
| **Collection-ID** | `pbc_xxxxxxxxxx` (Präfix pbc_) | `pbc_400465203` | Relationsdefinition, Schema-Referenz | Hoch: wird oft Collection-Name verwechselt |
| **Record-ID** | Alphanumerisch, 15 Zeichen | `gi0ymx1yznu4j6n` | Relation-Wert, GET einzeln, PATCH, DELETE | Hoch: wird oft Collection-ID verwechselt |
| **Feld-ID** | Feldtyp + Ziffern | `text3208210256` | Interne Feldidentifikation | Niedrig: selten manuell verwendet |

### 7.2 Naming-Konvention für Collections

**Format:**
```
[projekt_]identifikator
```

**Beispiele (verbindlich):**
- `tst_categories` — Test-Collection für Kategorien
- `tst_entries` — Test-Collection für Einträge
- `games` — Produktions-Collection für Spiele
- `publishers` — Produktions-Collection für Verlage

**Regeln:**
- Kleinbuchstaben + Unterstrich
- Englische oder deutsche Bezeichner (Projekt bestimmt)
- Präfix `tst_` für Test-Collections (nur in DEV, nicht in LIVE)
- Keine Umlaute, Sonderzeichen
- Möglichst sprechend (was wird gespeichert?)

### 7.3 Prüfschritte vor jeder Relation

```
1. Collection-Name der Quelle: ___ (z.B. tst_entries)
2. Collection-ID der Quelle: ___ (z.B. pbc_1496224378)
3. Collection-Name des Ziels: ___ (z.B. tst_categories)
4. Collection-ID des Ziels: ___ (z.B. pbc_400465203) ← IN SCHEMA VERWENDEN
5. Ziel-Record-ID (später): ___ (z.B. gi0ymx1yznu4j6n) ← IN DATENSATZ VERWENDEN
```

**Kritisch:** Point 4 und 5 nicht verwechseln!

---

## 8. Datenmodellierung vor Implementierung

### 8.1 Phasierung

**Phase 1: Modell (vor Code)**
- Entity-Relationship-Diagramm (TextFormat oder Skizze)
- Collection-Namen definieren
- Felder definieren
- Relationen identifizieren
- Zugriffsregeln überlegen

**Phase 2: Schemaartefakt (vor API)**
- JSON-Dateien schreiben
- Syntaxprüfung
- Feldtypen verifizieren
- Relationen auf Konsistenz prüfen

**Phase 3: Implementierung (API-Aufruf)**
- POST-Requests generieren
- Verification durchführen

**Phase 4: Dokumentation**
- NW-DB-LEARN-Dokument erzeugen
- Ist-Zustand dokumentieren
- Lessons-Learned notieren

### 8.2 Vor der ersten Collection

**Keine Collection anlegen, bevor geklärt:**

- ✓ Zweck der Collection?
- ✓ Wer benutzt die Daten?
- ✓ Wie viele Records erwartet?
- ✓ Welche Felder sind erforderlich?
- ✓ Welche Felder sind optional?
- ✓ Gibt es Relationen?
- ✓ Wer darf lesen (listRule/viewRule)?
- ✓ Wer darf erstellen (createRule)?
- ✓ Wer darf ändern (updateRule)?
- ✓ Wer darf löschen (deleteRule)?

**Modell-Dokumentation:**
Speichern unter `docs/database/` vor Implementierung. Beispiel:
```
docs/database/NW-DB-MODEL-[NAME]_v0.1.0.md

## Modell: [Collection-Name]

### Ziel
[Was wird gespeichert?]

### Felder
| Name | Typ | Pflicht | Beschreibung |
|---|---|---|---|

### Relationen
[Welche anderen Collections?]

### Zugriff
[wer liest, erstellt, ändert, löscht?]
```

---

## 9. Collection-Erstellung

### 9.1 Vorbereitung

**Checkliste vor POST:**

- ✓ DEV ausgewählt (nicht LIVE)?
- ✓ Zielumgebung korrekt?
- ✓ Collection existiert nicht bereits?
- ✓ Name folgt Naming-Konvention?
- ✓ Alle Felder definiert?
- ✓ `id`-Feld mit Autopattern?
- ✓ `created` und `updated` als `autodate`?
- ✓ Relationen auf Collection-ID prüfen?
- ✓ Zugriffsregeln definiert (auch wenn null)?
- ✓ Schemaartefakt erstellt und syntaktisch gültig?
- ✓ JSON mit `node -e` geprüft?

### 9.2 Endpunkt und Methode

```
POST http://localhost/.sfs-bd/api/collections

Content-Type: application/json
Authorization: Bearer $TOKEN

{
  "name": "new_collection",
  "type": "base",
  "fields": [
    {"name": "id", "type": "text", "required": true, "id": "text...", ...},
    {"name": "title", "type": "text", "required": true, ...},
    {"name": "created", "type": "autodate", "onCreate": true, "onUpdate": false, ...},
    {"name": "updated", "type": "autodate", "onCreate": true, "onUpdate": true, ...}
  ],
  "listRule": null,
  "viewRule": null,
  "createRule": null,
  "updateRule": null,
  "deleteRule": null
}
```

**Nachweis:** ✓ NACHGEWIESEN in NW-DB-LEARN-005, Abschnitt 9

### 9.3 Erfolg-Kriterien

- HTTP 200
- Response enthält `"id": "pbc_..."`
- Response enthält alle definierten Felder
- Response enthält Systemfelder (`created`, `updated`)
- Kein Fehler in `"data"` oder `"message"`

---

## 10. Schemaänderungen

### 10.1 Risikomatrix für Schemaänderungen

| Änderungstyp | Datenrisiko | Vorprüfung | Fallback | Freigabe |
|---|---|---|---|---|
| Optionales Feld hinzufügen | Keine | Feldname eindeutig? | PATCH rückgängig: Feld entfernen | Standard-Approval |
| Pflichtfeld hinzufügen | **HOCH** | Mit default-Wert? Records zuerst PATCH? | Feld löschen + Rollback | **Explizite Freigabe** |
| Feld umbenennen | **HOCH** | Migrationsskript? | Altes Feld behalten, neues löschen | **Nicht empfohlen** |
| Feldtyp ändern | **KRITISCH** | Können alle Werte konvertiert? | Direkter Rollback notwendig | **Explizite Freigabe** |
| Feld löschen | **KRITISCH** | Backup vorhanden? Records gepflegt? | Feld zurückholen (Daten verloren) | **Explizite Freigabe + Admin** |
| Relation hinzufügen | Mittel | Ziel-Collection existiert? | Feld entfernen | Standard-Approval |
| Relation löschen | **HOCH** | Keine Records mit dieser Relation? | Relation zurückholen (Werte verloren) | **Explizite Freigabe** |
| API-Regel verschärfen | Mittel | Alte Regel dokumentiert? Test mit Benutzer-Token? | Alte Regel wiederherstellen | Standard-Approval |
| API-Regel öffnen | Niedrig | Bewusst gelockert? | Regel wieder einschränken | Standard-Approval |

**Regel:** Nur Standard-Approval ohne explizite Freigabe für Operationen in der Spalte "Standard-Approval". Alles andere erfordert Absprache.

### 10.2 Datenverlust-Sicherung

**Vor Löschung oder gefährlicher Typ-Änderung:**

1. Anzahl Records prüfen
2. Falls > 0: manuelles Backup (JSON-Export)
3. Falls kritisch: Agent führt Operation nicht automatisch durch

### 10.3 Schemaänderungen durchführen

Endpunkt:
```
PATCH http://localhost/.sfs-bd/api/collections/{collectionName}
```

**Regel:** PATCH, nicht PUT. Nur geänderte Felder übergeben.

---

## 11. Record-Erstellung und Datenimport

### 11.1 Einzelnen Record erstellen

```
POST http://localhost/.sfs-bd/api/collections/{collection}/records

Content-Type: application/json
Authorization: Bearer $TOKEN

{
  "field1": "value",
  "field2": 123,
  "relationField": "targetRecordId"
}
```

**Nicht übergeben:**
- `id` — wird vom Server generiert
- `created` — wird vom Server gesetzt
- `updated` — wird vom Server gesetzt

**Nachweis:** ✓ NACHGEWIESEN in NW-DB-LEARN-003

### 11.2 Batch-Import

```
for each record in inputList:
  POST /collections/{collection}/records
  ← HTTP 200 oder 422 (Validierung)
  if 422: prüfen und nächsten Record
  if 200: erfolgreich
```

**Kein echtes Batch-Endpoint vorhanden.** Schleife mit Einzeloperationen ist Standard.

**Regel:** Keine automatische Wiederholung bei Fehler. Agent prüft Fehler und dokumentiert, welche Records fehlgeschlagen sind.

### 11.3 Duplikat-Verhinderung

**Vor POST-Datensatz:**

```
1. GET /collections/{col}/records?filter=uniqueField="value"
2. Wenn totalItems > 0: Record existiert bereits
3. Entweder:
   a) Überspringen (kein Update)
   b) PATCH statt POST (Update)
   c) Fehler melden
```

---

## 12. Relationen

### 12.1 Definition vs. Instanz

**Schema-Ebene (Definition):**
```json
{
  "name": "category",
  "type": "relation",
  "required": true,
  "collectionId": "pbc_400465203"  ← Collection-ID
}
```

**Record-Ebene (Instanz):**
```json
{
  "id": "xy1234",
  "title": "...",
  "category": "gi0ymx1yznu4j6n"  ← Record-ID
}
```

**Nicht verwechseln:**
- `collectionId` definiert, in welche Collection Werte zeigen können
- Konkreter Relationswert speichert eine Record-ID aus dieser Collection

### 12.2 Verbindliche Aufbau-Reihenfolge

**Schritt 1-2: Ziel-Collection prüfen**
```
GET /collections
→ "tst_categories" vorhanden?
→ Collection-ID ermitteln: pbc_400465203
```

**Schritt 3: Ziel-Records prüfen**
```
GET /collections/tst_categories/records
→ Gibt es Records?
→ Record-IDs notieren: ["gi0ymx1yznu4j6n", ...]
```

**Schritt 4-5: Quell-Collection mit Relation**
```
POST /collections mit Feld:
{
  "name": "category",
  "type": "relation",
  "required": true,
  "collectionId": "pbc_400465203",
  "maxSelect": 1
}
```

**Schritt 6: Quell-Collection prüfen**
```
GET /collections/quell_collection
→ "category"-Feld existiert und zeigt auf pbc_400465203?
```

**Schritt 7: Datensatz mit Relation erstellen**
```
POST /collections/quell_collection/records
{
  "title": "...",
  "category": "gi0ymx1yznu4j6n"  ← Record-ID aus Ziel
}
```

**Schritt 8-10: Prüfung mit expand**
```
GET /collections/quell_collection/records/xy1234?expand=category
→ expand.category.id == "gi0ymx1yznu4j6n"?
→ expand.category.name existiert?
```

**Nachweis:** ✓ NACHGEWIESEN in NW-DB-LEARN-005, Abschnitt 9 (Verständliche Erklärung)

### 12.3 maxSelect-Regel

| maxSelect | Bedeutung | Anwendung |
|---|---|---|
| `1` | Genau ein Record | Foreign Key (viele-zu-eins) |
| `>1` (z.B. `10`) | Mehrere Records möglich | Tags, Kategorien-Liste |
| `0` | (nicht verwendet in dieser Version) | – |

Wenn `required: true` + `maxSelect: 1` → Pflichtfeld mit exakt einer Relation.

### 12.4 cascadeDelete-Verhalten

```
cascadeDelete: false (Standard)
  → Wenn Ziel-Record gelöscht wird:
  → Quell-Records behalten den Relationswert (aber zeigen ins Nichts)
  → Wird bei expand zu NULL/Fehler
  → NICHT EMPFOHLEN für enge Relationen

cascadeDelete: true
  → Wenn Ziel-Record gelöscht wird:
  → Quell-Records werden auch gelöscht
  → WARNUNG: Kann zu unerwartetem Datenverlust führen
```

**Regel:** In diesem Standard: `cascadeDelete: false` verwenden. Explizites Löschen abhängiger Records über Schleife.

---

## 13. API-Regeln und Berechtigungsprüfung

### 13.1 Vier Regel-Typen

| Regel | Null-Bedeutung | Nicht-Null-Beispiel | Test-Kontext |
|---|---|---|---|
| `listRule` | Jeder darf auflisten | `@request.auth.id != ""` (nur angemeldet) | GET /records (ohne expand) |
| `viewRule` | Jeder darf lesen | `@request.auth.id = owner.id` (nur Besitzer) | GET /records/{id} |
| `createRule` | Jeder darf erstellen | `@request.auth.id != ""` (nur angemeldet) | POST /records |
| `updateRule` | Jeder darf ändern | `@request.auth.id = owner.id` (nur Besitzer) | PATCH /records/{id} |
| `deleteRule` | Jeder darf löschen | `@request.auth.id = owner.id` (nur Besitzer) | DELETE /records/{id} |

### 13.2 Kritisches Verhalten: Null vs. Leer

```
listRule: null
  → Kein Schutz; jeder (inkl. anonym) darf lesen
  → Admin-Token umgeht AUCH das nicht (es gibt nichts zu umgehen)

listRule: "@request.auth.id != \"\""
  → Schutz: nur angemeldete Benutzer
  → Admin-Token umgeht diese Regel

listRule: ""
  → Nicht dasselbe wie null!
  → Bedeutung: ???
  → NICHT EMPFOHLEN, nicht dokumentiert
```

**Regel:** Verwenden Sie nur `null` (kein Schutz) oder eine aussagekräftige Bedingung. Keine leeren Strings.

### 13.3 Test-Split

**Test 1: Admin (entwicklung)**
```
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  http://localhost/.sfs-bd/api/collections/my_collection/records
→ 200 OK, alle Records
→ ERWARTET (Admin umgeht Regeln)
```

**Test 2: Öffentlich (später Benutzer)**
```
curl http://localhost/.sfs-bd/api/collections/my_collection/records
→ Falls listRule: null → 200 OK
→ Falls listRule: Bedingung → wahrscheinlich 401 oder 403
```

**Regel:** Admin-erfolg ist nicht aussagekräftig für Benutzerzugriff. Separate Tests erforderlich.

---

## 14. Fehler-, Retry- und Idempotenzregeln

### 14.1 Häufige Fehler

| HTTP-Status | Bedeutung | Beispiel | Reaktion |
|---|---|---|---|
| `200` | Erfolg | POST erzeugt Record | Weitermachen |
| `400` | Ungültige Anfrage | Filter-Syntax-Fehler | Fehler dokumentieren, nicht wiederholen |
| `401` | Kein Token oder ungültig | Missing Authorization | Token regenerieren, einmalig wiederholen |
| `404` | Nicht gefunden | GET nicht-existenter Record | Fehler dokumentieren, weitermachen |
| `422` | Validierungsfehler | Pflichtfeld fehlt | Prüfen Sie Nutzlast, nicht wiederholen |
| `500` | Server-Fehler | Interne PocketBase-Fehler | Dokumentieren, später manuell prüfen |

### 14.2 Keine automatische Wiederholung

**Falsch:**
```
POST /records → 422
[Agent wiederholt automatisch 3x]
→ potenzielle Duplikate oder schlimmere Fehler
```

**Richtig:**
```
POST /records → 422
[Agent stoppt, dokumentiert Fehler]
[User/Developer behebt das Problem]
[Neuer Versuch ist expliziter Auftrag]
```

**Ausnahmen:** Nur bei `401` (Token abgelaufen) ist einmalige Wiederholung nach Token-Refresh sicher.

### 14.3 Unklarer Schreibzustand

**Szenario:** POST gesendet, HTTP 200 erhalten, aber Antwort nicht lesbar (z.B. Parsing-Fehler).

**Unsicherer Ansatz:**
```
POST → 200 → Fehler beim Lesen der Antwort
[Agent wiederholt POST]
→ Potentielles Duplikat!
```

**Sicherer Ansatz:**
```
POST → 200 → Fehler beim Lesen der Antwort
[Agent macht Pause]
GET /records → Überprüfung: wie viele Records?
Vergleich mit: wie viele waren es vorher?
Falls neu > alt: Record wurde erstellt (trotz Parsing-Fehler)
Falls neu == alt: Fehler, Record nicht erstellt
→ Neuer Versuch oder Fehler-Eskalation
```

---

## 15. Schemaartefakte und Reproduzierbarkeit

### 15.1 Artefakt-Struktur

**Ort:** `app/database/schemas/{collection}.collection.json`

**Format:**
```json
{
  "name": "collection_name",
  "type": "base",
  "fields": [...],
  "listRule": null,
  "viewRule": null,
  "createRule": null,
  "updateRule": null,
  "deleteRule": null
}
```

**Gültig:** ✓ Syntaktisch korrektes JSON, direkt POST-able an `/collections`

**Nicht gültig:** Platzhalter-Strings, die JSON-Struktur brechen; auskommentierte Felder; Secrets.

### 15.2 Reproduzierbarkeit-Modell

**Aktuell:** `REPRODUZIERBARE SCHEMAARTEFAKTE` + `DIREKTE API-ÄNDERUNGEN`

**Bestandteile:**
1. **Schema-JSON im Git** — Dokumentation + Vorlage
2. **Lernschritte im Git** — Warum, Was, Wie
3. **Git-Commits** — Änderungen rückverfolgbar

**Fehlend:**
- ❌ Ausführbare Migration (z.B. Skript, das JSON POST-et)
- ❌ Daten-Migrationen (die müssen manuell oder über App-Code erfolgen)
- ❌ Automatische Wiederherstellung bei Fehler

**Regel:** Schemaartefakt ist dokumentierend. Zur **Reproduktion** einer Collection:
1. Schema-JSON lesen
2. Manuell (oder über Skript) POST /collections mit JSON
3. Datensätze mit App-Code oder separatem Seeding erzeugen

### 15.3 Versionierung

**Schema-Dateien im Git:**
```
database/schemas/tst_entries.collection.json
  ↓ (nach Änderung)
database/schemas/tst_entries.collection.json (aktualisiert)
  ↓ (Commit)
git log: "schema: update tst_entries — add category relation"
```

**Datenbank-Dateien im Git:** ❌ Nicht versioniert (`.gitignore`)

**Lernschritte im Git:**
```
docs/database/NW-DB-LEARN-006_tst_entries_Record_v0.1.0.md
  → beschreibt, wie Records erstellt wurden
  → nicht die Daten selbst speichern
```

---

## 16. DEV-/LIVE-Übertragung

### 16.1 Automatische Schritte

1. **DEV-Schema mit Agent angelegt**
2. **Commit in Git**
3. **STRATO führt Publish durch**
4. **STRATO kopiert DEV-Schema nach LIVE**
5. **LIVE-Datenbank ist leer, aber strukturiert**

### 16.2 Was wird nicht automatisch kopiert

- ❌ Testdatensätze
- ❌ Entwicklungs-Collections (z.B. `tst_categories`)
- ❌ Temporäre Änderungen

### 16.3 Vorbereitung auf Publish

**Checkliste:**

- ✓ Alle **produktiven** Collections sind in DEV definiert
- ✓ Alle **produktiven** Schemaartefakte sind im Git
- ✓ Keine **Test-Collections** in produktiven Artefakten
- ✓ API-Regeln sind **final** (nicht Platzhalter wie `null`)
- ✓ **Projektcode ist bereit**, Daten mit get-or-create zu seeden

**Nach Publish:**

- ✓ LIVE-Datenbank ist aktuell, aber leer
- ✓ Projektcode startet, erstellt fehlende Collections (falls nötig)
- ✓ Projektcode seeded initiale Daten (falls nötig)

---

## 17. Git- und Commitregeln

### 17.1 Zu committen

```
✓ docs/database/NW-DB-LEARN-*.md
✓ database/schemas/*.collection.json
✓ docs/standards/
✓ docs/templates/
✓ Änderungen zu index/overview-Dateien
```

### 17.2 Nicht zu committen

```
✗ bd/data.db, be/data.db (Datenbank-Dateien)
✗ .env, secrets, Tokens
✗ node_modules
✗ dist/ (wird von Plattform verwaltet, aber in diesem Projekt vorhanden)
```

### 17.3 Commit-Nachricht-Format

```
[VERB]: NW-[STEPNAME] — [was hat sich geändert]

Beispiele:
  feat: NW-DB-LEARN-006 — create first test record in tst_entries
  docs: NW-DB-LEARN-006 — document record creation and expand mechanics
  schema: NW-DB-STD-001 — establish STRATO PocketBase database standard
  chore: NW-DB-CURRENT-STATE — update collection count and schema summary
```

**Verben:**
- `feat:` — Neue Collection, neues Feld, neue Relation
- `fix:` — Schemakorrektur
- `docs:` — Dokumentation
- `schema:` — Schema-Artefakt-Änderung
- `chore:` — Allgemeine Wartung

### 17.4 Commit pro logischer Einheit

**Richtig:**
```
Commit 1: feat: NW-DB-LEARN-006 — create tst_entries record
Commit 2: docs: NW-DB-LEARN-006 — document with expand example
```

**Falsch:**
```
Commit 1: feat: NW-DB-LEARN-006, 007, 008 — multiple changes
```

---

## 18. Verifikation und Soll-Ist-Abgleich

### 18.1 Nach jeder Schreiboperation

**Checkliste:**

1. **GET den geänderten Gegenstand neu**
   ```
   POST /records → {"id": "xy1234", ...}
   GET /records/xy1234 → {"id": "xy1234", ...}
   ```

2. **Vergleich:**
   | Feld | Geplant | Ist | ✓ |
   |---|---|---|---|
   | id | auto | xy1234 | ✓ |
   | title | "Test" | "Test" | ✓ |
   | created | auto | 2026-07-25T... | ✓ |

3. **Abweichungen kennzeichnen**
   - Wenn nicht 100% Übereinstimmung: FEHLER
   - Nie "nächster Schritt" ohne Verifikation

### 18.2 Soll-Ist-Vergleich im Bericht

**Format:**
```
## Verifikation

| Merkmal | Soll | Ist | Ergebnis |
|---|---|---|---|
| Collection-Name | tst_entries | tst_entries | ✓ |
| Collection-Typ | base | base | ✓ |
| Feld count | 6 | 6 | ✓ |
| Systemfelder | id, created, updated | [...] | ✓ |
| Relationsziel | pbc_400465203 | pbc_400465203 | ✓ |

**Gesamtergebnis:** ✓ SUCCESS
```

---

## 19. Abschlussstatus

### 19.1 Zulässige Werte

Jeder Auftrag endet mit genau einem Status:

| Status | Bedeutung | Bedingung |
|---|---|---|
| **DATABASE CHANGE VERIFIED** | Änderung erfolgreich | Schreiboperation ausgeführt, Verifikation erfolgreich, Artefakte aktuell, Git sauber |
| **DATABASE CHANGE PARTIAL** | Teilweise erfolgreich | Einige Operationen erfolgreich, andere fehlgeschlagen, dokumentiert |
| **DATABASE CHANGE FAILED** | Änderung fehlgeschlagen | Keine erfolgreiche Schreiboperation, Fehler dokumentiert |
| **DATABASE CHANGE BLOCKED** | Sicherheitsblocker | Sicherheitsfreigabe nicht erfolgt, keine Schreiboperation |
| **DATABASE STATE UNCLEAR** | Zustand unklar | Schreiboperation ggf. durchgeführt, aber Verifikation fehlgeschlagen |
| **ANALYSIS ONLY** | Nur Analyse | Keine Schreiboperation geplant |
| **NO CHANGE REQUIRED** | Keine Änderung nötig | Ist-Zustand erfüllt bereits Anforderungen |

### 19.2 Bedingung für SUCCESS

```
✓ Benutzer-Auftrag verstanden
✓ Git-Zustand vor Aktion prüft
✓ Ist-Zustand einmalig gelesen
✓ Schreiboperation ausgeführt (genau 1x, keine Wiederholung)
✓ Ergebnis einmalig gelesen
✓ Soll-Ist-Vergleich: 100% Match
✓ Schemaartefakt aktualisiert
✓ Dokumentation erstellt
✓ Git-Commit durchgeführt
✓ LIVE nicht betroffen
✓ Keine Secrets in Protokoll
```

Alle ✓ erforderlich für SUCCESS.

---

## 20. Plattformgrenzen

### 20.1 Festgestellte Grenzen

| Fähigkeit | Verfügbar | Einschränkung | Konsequenz |
|---|---|---|---|
| Record CRUD | ✓ Ja | Standard REST | Normal |
| Collection CRUD | ✓ Ja (Admin) | Nur Agent, nicht App | Standard |
| Relation (1:1, 1:n) | ✓ Ja | maxSelect, cascadeDelete | Normal |
| expand | ✓ Ja | Nur beim GET, nicht bei Filter | Normal |
| Filter + Sort | ✓ Ja | URL-Escaping beachten | Normal |
| Pagination | ✓ Ja | page + perPage Parameter | Normal |
| API-Regeln | ✓ Ja | listRule, viewRule, createRule, updateRule, deleteRule | Normal |
| **Email-API** | ❌ Nein | Deaktiviert | Alternativen: Datensatz-Trigger, externe Service |
| **Cron/Scheduler** | ❌ Nein | Deaktiviert | Alternativen: Client-side Polling, externe Scheduler |
| Batch-POST | ❌ Nein | Nur Einzeloperation | Schleife nötig |
| Batch-PATCH | ❌ Nein | Nur Einzeloperation | Schleife nötig |
| Batch-DELETE | ❌ Nein | Nur Einzeloperation | Schleife nötig |
| Transaktionen | ❌ Nein | Nicht dokumentiert | Fehlertoleranz manuell |
| Idempotency Keys | ❌ Nein | Nicht dokumentiert | Duplikat-Check vor POST |
| Automatische Retries | ❌ Nein | Agent wiederholt nicht | Fehlerbehandlung manuell |
| Backup (user) | ❌ Nein | Plattform-Verantwortung | Nicht verfügbar |
| Rollback (user) | ❌ Nein | Plattform-Verantwortung | Nicht verfügbar |
| DEV-Schema Copy zu LIVE | ✓ Ja | Automatisch bei Publish | Standard |
| DEV-Daten Copy zu LIVE | ❌ Nein | Nicht durchgeführt | App-Code muss seeden |

**Nachweis:** ✓ NACHGEWIESEN in NW-DB-API-ARCHITECTURE_v0.1.0.md, Abschnitt 10

---

## 21. Offene Architekturentscheidung: Migrations-Layer

### 21.1 Status quo

**Aktuell:**
- Schemaänderungen erfolgen direkt über REST-API
- Schemaartefakte sind dokumentierend (nicht ausführbar)
- Datenbankdateien werden nicht versioniert
- Daten müssen manuell über Skript oder App-Code migriert werden

**Fehlt:**
- Kein ausführbarer Migrations-Layer
- Keine Rollback-Strategie für fehlgeschlagene Migrationen
- Keine Seed-Verwaltung

### 21.2 Anforderungen für zukünftigen Layer

Falls ein Migrations-System implementiert wird, muss es:

1. **Reproduzierbar** sein (gleiche Migration auf DEV und LIVE)
2. **Versioniert** sein (im Git, mit Timestamp oder Sequenznummer)
3. **Rollback-fähig** sein (up/down-Funktionen)
4. **Idempotent** sein (mehrfache Ausführung = gleicher Zustand)
5. **Fehlerbehandlung** haben (Fehler dokumentieren, nicht ignorieren)
6. **Transaktional** sein (oder äquivalente Atomarität)

**Format (Vorschlag, nicht bindend):**
```
database/migrations/001_create_tst_categories.json
  → Sequenznummer, Datum, Operation
database/migrations/002_add_category_relation.json
database/migrations/003_seed_initial_categories.json
```

### 21.3 Nicht implementieren in diesem Standard

Dieser Standard definiert NICHT:
- Den Migrations-Runner
- Das Versionierungsschema
- Die Syntax für Migrationen

Dies sind zukünftige Entscheidungen, die mit NeuroWays-Team zu treffen sind.

---

## 22. Verbindliche Checklisten

### 22.1 Pre-Operation Checklist

```
[ ] Auftrag verstanden?
[ ] Git branch ist sauber (git status --short)?
[ ] Zielumgebung explizit genannt (DEV / LIVE)?
[ ] LIVE ist standardmäßig ausgeschlossen?
[ ] Ist-Zustand einmalig gelesen?
[ ] Collection-Namen verifiziert?
[ ] Collection-IDs verifiziert (falls Relationen)?
[ ] Record-IDs verifiziert (falls Relationen)?
[ ] Schemaartefakt ist gültiges JSON?
[ ] Nutzlast ist gültiges JSON?
[ ] Keine Secrets in Nutzlast?
[ ] API-Regeln korrekt interpretiert?
[ ] Datenrisiko bewertet?
[ ] Fallback-Strategie definiert?
[ ] Anzahl Schreiboperationen bekannt?
[ ] Keine automatische Wiederholung geplant?
```

### 22.2 Post-Operation Checklist

```
[ ] Ergebnis einmalig gelesen (GET)?
[ ] Soll-Ist-Vergleich durchgeführt?
[ ] Abweichungen dokumentiert?
[ ] Schemaartefakt aktualisiert?
[ ] Dokumentation erstellt (NW-DB-LEARN-* oder ähnlich)?
[ ] Git Status OK (git status --short)?
[ ] Commit durchgeführt?
[ ] Keine Secrets in Commit?
[ ] LIVE nicht unbeabsichtigt berührt?
[ ] Eindeutiger Abschlussstatus gewählt?
```

---

## 23. Abweichungs- und Eskalationsverfahren

### 23.1 Wann ANHALTEN und nicht weitermachen

**Sicherheit:**
- ❌ Unklare Zielumgebung (könnte LIVE sein)
- ❌ Unsichere Git-State (overlapping changes)
- ❌ Möglicher Datenverlust ohne Fallback

**Unsicherheit:**
- ❌ Collection-ID unbekannt
- ❌ Relation-Ziel unklar
- ❌ API-Regel-Bedeutung unbekannt
- ❌ Plattformfunktion nicht nachgewiesen

**Fehler:**
- ❌ HTTP 422 (Validierung)
- ❌ HTTP 500 (Server-Fehler)
- ❌ Unklarer Zustand nach Schreiboperation

**Verfahren:**
1. Agent STOPPT und dokumentiert die Blockade
2. Agent fragt explizit nach oder eskaliert an Team
3. Kein Commit ohne Freigabe

### 23.2 Erlaubte Abweichungen von diesem Standard

Abweichungen (z.B. für experimentelle Features) erfordern:

1. Explizite Freigabe vom Datenbankarchitekten
2. Dokumentation im Auftrag "Dies ist eine Abweichung, Grund: ..."
3. Erhöhte Verifikation (mehr als 100% Soll-Ist-Match prüfen)
4. Separate Commit-Nachricht: `experimental: ...`
5. Nachträgliche Dokumentation der Erkenntnis

---

## 24. Quellen und Nachweisstatus

### 24.1 Führende Quelle

| Dokument | Zeilen | Nachweisstatus | Gültigkeit |
|---|---|---|---|
| NW-DB-API-ARCHITECTURE_v0.1.0.md | 1051 | 10+ Kapitel detailliert nachgewiesen | Verbindlich |
| NW-DB-API-REFERENCE_v0.1.0.md | 609 | Praktische Beispiele, curl-Befehle | Referenz |
| NW-DB-LEARN-005_tst_entries_Relation_v0.1.0.md | 448 | Praktische Umsetzung, Relationen | Referenz |
| NW-DB-LEARN-004_tst_categories_Update_v0.1.0.md | 165 | PATCH-Verhalten, Timestamps | Referenz |
| NW-DB-LEARN-003_tst_categories_Record_v0.1.0.md | 120 | Record-Erstellung | Referenz |
| NW-DB-LEARN-002_tst_categories_Creation_v0.1.0.md | 238 | Collection-Erstellung | Referenz |

### 24.2 Nachweisstatus der Kernaussagen

| Aussage | Status | Quelle | Sicherheit |
|---|---|---|---|
| Collections über REST-API anlegen | ✓ NACHGEWIESEN | NW-DB-LEARN-005 | 100% |
| Records über REST-API erstellen | ✓ NACHGEWIESEN | NW-DB-LEARN-003 | 100% |
| PATCH für Änderung verwenden | ✓ NACHGEWIESEN | NW-DB-LEARN-004 | 100% |
| Relationen mit collectionId definieren | ✓ NACHGEWIESEN | NW-DB-LEARN-005 | 100% |
| expand für Relationserweiterung | ✓ NACHGEWIESEN | NW-DB-LEARN-005, NW-DB-API-REFERENCE | 100% |
| created/updated als autodate | ✓ NACHGEWIESEN | NW-DB-LEARN-004 | 100% |
| Schema automatisch DEV→LIVE kopiert | ✓ NACHGEWIESEN (plausibel) | NW-DB-API-ARCHITECTURE | 95% |
| Daten nicht automatisch kopiert | ✓ NACHGEWIESEN (plausibel) | NW-DB-API-ARCHITECTURE | 95% |
| Batch-Operationen nicht vorhanden | ✓ NICHT LESEND VERIFIZIERBAR | NW-DB-API-ARCHITECTURE | 70% (plausibel) |
| Transaktionen nicht dokumentiert | ✓ NICHT LESEND VERIFIZIERBAR | NW-DB-API-ARCHITECTURE | 60% (unbekannt) |
| Email-API deaktiviert | ✓ NACHGEWIESEN | pocketbase.js skill | 100% |
| Cron-API deaktiviert | ✓ NACHGEWIESEN | pocketbase.js skill | 100% |

### 24.3 Anwendbarkeit auf andere Versionen

**Dieser Standard ist gültig für:**
- ✓ PocketBase v0.39.0 (getestet in dieser Umgebung)
- ✓ STRATO-Plattform (aktuelle Version)
- ⚠️ PocketBase v0.38 und älter (prüfen Sie Breaking Changes)
- ❌ PocketBase v0.40+ (neue Features, neue Breaking Changes möglich)

**Bei Plattform-/Versionsänderung:**
1. Standard-Nummer erhöhen (z.B. v1.1.0)
2. Neue Kompatibilitäts-Sektion hinzufügen
3. Alte und neue Regeln dokumentieren

---

## Abschlusshighlights

Dieser Standard formalisiert die Erkenntnisse aus 1051 Zeilen Systemanalyse in 24 Kapiteln, verbindlichen Checklisten und reproduzierbaren Verfahren.

**Kernprinzipien:**
1. **Ist-Zustand zuerst** — nie ändern, ohne zu lesen
2. **Schreiboperation nur 1x** — keine automatische Wiederholung
3. **Verifikation danach** — Soll-Ist-Match prüfen
4. **DEV/LIVE trennen** — Standard DEV, LIVE nur mit Freigabe
5. **Git-Artefakte** — Schemaänderungen reproduzierbar dokumentieren
6. **Admin ≠ Benutzer** — getrennte Access-Kontexte
7. **Relationen sicher aufbauen** — Reihenfolge ist essentiell

---

**STANDARD COMPLETE — alle 24 Kapitel**

