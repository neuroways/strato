# NW-DB-TRACE-001: Technische Analyse — Datenbank-Ausführungsweg

**Status:** Retrospektive Dokumentation  
**Umgebung:** LIVE (`.sfs-be`)  
**Datum Rekonstruktion:** 2026-07-24  

---

## 1. Tatsächlicher Ausführungsweg

### 1.1 Technische Methode: Direkter REST-API-Aufruf via curl + Node.js

Die Collections `publishers` und `games` wurden **nicht über eine UI oder ein Migrationsartefakt angelegt**, sondern durch wiederholte Shell-Befehle, die Node.js-Code direkt ausführten.

#### a) Authentifizierung

- **Token-Generator:** `/etc/goose/skills/pocketbase/tools/pb_gen_token_sfs.js`
- **Token-Aufruf mit `--live` Flag:**  
  ```bash
  node /etc/goose/skills/pocketbase/tools/pb_gen_token_sfs.js --live
  ```
- **Resultat:** Ein JWT-Admin-Token für die Live-Umgebung  
- **Token nie gespeichert:** Nur als Laufzeit-Variable in Shell-Skripten verwendet

#### b) API-Endpunkte

| Aktion | Endpunkt | HTTP-Methode |
|--------|----------|--------------|
| Collection erstellen | `POST /.sfs-be/api/collections` | POST |
| Record erstellen | `POST /.sfs-be/api/collections/{name}/records` | POST |
| Record aktualisieren | `PATCH /.sfs-be/api/collections/{name}/records/{id}` | PATCH |

#### c) Transport & Umgebung

- **Socket:** Unix-Socket `/run/cm4all/http/tie.socket`
- **Basis-URL:** `http://localhost/.sfs-be/api`
- **Umgebung:** Produktiv/Live (`.sfs-be`), nicht Entwicklung (`.sfs-bd`)
- **Authentifizierung Header:** `Authorization: Bearer {JWT}`
- **Content-Type:** `application/json`

#### d) Reihenfolge der Requests (rekonstruiert)

1. **Token generieren** → `pb_gen_token_sfs.js --live`
2. **Publishers-Collection erstellen** → `POST /api/collections`  
   Payload: Collection-Definition mit Felder (id, publisher_id, name, country, website, etc.)
3. **Games-Collection erstellen** → `POST /api/collections`  
   Payload: Collection-Definition mit 39 Felder
4. **Excel-Datei parsen** → XLSX-Bibliothek liest beide Sheets
5. **32 Publisher-Records einfügen** → `POST /api/collections/publishers/records` (wiederholte Aufrufe)
6. **1.707 Game-Records einfügen** → `POST /api/collections/games/records` (in Batch)
7. **Fehlertoleranz:** Try-catch um jeden Einfüge-Request — Duplikate und bereits vorhandene Records werden ignoriert

### 1.2 Authentifizierung & Tokens

- **Token-Format:** JWT (asymmetrisch signiert)
- **Gültigkeitsdauer:** Während der Ausführung
- **Speicherung:** NIE — nur als Shell-Variable `TOKEN=$(node ...)`
- **Keine Persistierung:** Token verschwindet nach Skript-Ende
- **Verwendung:** Jeder curl-Aufruf trägt Token im Header `Authorization: Bearer $TOKEN`
- **Sicherheit:** Generiert vom Plattform-Tool, nicht von Hand erstellt

---

## 2. Datenbank-Objekte (LIVE-Zustand)

### Bestandsaufnahme LIVE (`.sfs-be`)

```
Basis URL: http://localhost/.sfs-be/api/collections
```

#### Collection 1: `publishers`

| Feld | Datentyp | Pflicht | ID? | Unique? |
|------|----------|--------|-----|---------|
| `id` | text | ja | ja | ja |
| `publisher_id` | text | ja | nein | nein |
| `name` | text | ja | nein | nein |
| `priority` | number | nein | nein | nein |
| `country` | text | nein | nein | nein |
| `website` | url | nein | nein | nein |
| `games_overview_url` | url | nein | nein | nein |
| `rules_source` | text | nein | nein | nein |
| `relevance` | text | nein | nein | nein |
| `status` | text | nein | nein | nein |
| `note` | text | nein | nein | nein |
| `created` | autodate | nein | nein | nein |
| `updated` | autodate | nein | nein | nein |

**Datensätze:** 32 Records  
**Typ:** Base Collection  
**Beziehungen:** 1:n zu `games` (als Text-Referenz, keine Relation)  
**API-Regeln:** listRule/viewRule/createRule/updateRule/deleteRule = null (offen)

#### Collection 2: `games`

| Feld | Datentyp | Pflicht | Inhalt |
|------|----------|--------|--------|
| `id` | text | ja | Datensatz-ID |
| `dataset_id` | text | ja | eindeutige Game-ID |
| `title` | text | ja | Spieltitel |
| `publisher` | text | ja | Verlag-Name (Fremdschlüssel als Text) |
| `category` | text | nein | Spielkategorie |
| `language` | text | nein | Sprachen |
| `link_type` | text | nein | Linktyp |
| `rules_url` | url | nein | PDF-Link zu Anleitung |
| `product_page_url` | url | nein | Produktseite |
| `article_number` | text | nein | EAN/SKU |
| `review_status` | text | nein | Status |
| `reviewed_on` | text | nein | Datum |
| `note` | text | nein | Hinweis |
| `metadata_status` | text | nein | Status Metadaten |
| `rules_status` | text | nein | Status Anleitung |
| `min_players` | number | nein | Min Spieler |
| `max_players` | number | nein | Max Spieler |
| `min_duration_min` | number | nein | Min Dauer |
| `max_duration_min` | number | nein | Max Dauer |
| `min_age` | number | nein | Mindestalter |
| `complexity` | text | nein | Komplexität |
| `game_type` | text | nein | Spieltyp |
| `mechanics` | text | nein | Mechaniken |
| `language_dependent` | text | nein | Sprachabhängigkeit |
| `original_title` | text | nein | Originaltitel |
| `german_edition` | text | nein | Deutsche Edition |
| `bgg_id` | text | nein | BGG-ID |
| `product_type` | text | nein | Produkttyp |
| `base_game_id` | text | nein | Basis-Spiel ID |
| `base_game_title` | text | nein | Basis-Spiel Titel |
| `german_publisher` | text | nein | Deutscher Verlag |
| `publisher_source` | text | nein | Verlagsquelle |
| `assignment_status` | text | nein | Zuordnungsstatus |
| `canonical_publisher` | text | nein | Kanonischer Verlag |
| `other_publishers` | text | nein | Weitere Verlage |
| `consolidation_status` | text | nein | Konsolidierungsstatus |
| `duplicate_review` | text | nein | Dublettenprüfung |
| `created` | autodate | nein | Zeitstempel |
| `updated` | autodate | nein | Zeitstempel |

**Datensätze:** 1.707 Records (von ursprünglichen 1.734)  
**Typ:** Base Collection  
**Relation zu publishers:** Text-Referenz im Feld `publisher` (kein echtes Relation-Feld)

---

## 3. Repositoriums-Status

### Git-Prüfung

```bash
git status --short
→ (no output) — Arbeitskopie sauber
```

```bash
git log --oneline -4
7add2ba feat: Spiele und Verlage Tabellen live - 1707 Spiele und 32 Verlage
ab51748 fix: Datenbank neu initialisiert mit allen 1734 Spielen
0b1c1f1 feat: NeuroPlay Katalog mit Datenbank und Upload-System
165fd1d Initial project skeleton
```

### Eingecheckte Code-Änderungen

| Datei | Aktion | Git-Status |
|-------|--------|-----------|
| `src/components/DataUploader.jsx` | Neu + Committed | `commit 0b1c1f1` |
| `src/components/GamesList.jsx` | Neu + Committed | `commit 0b1c1f1` |
| `src/components/PublisherList.jsx` | Neu + Committed | `commit 0b1c1f1` |
| `src/lib/pb.js` | Neu + Committed | `commit 0b1c1f1` |
| `src/App.jsx` | Verändert + Committed | `commit 0b1c1f1` |
| `index.html` | Verändert + Committed | `commit 0b1c1f1` |
| `dist/` | Verändert + Committed | `commit 7add2ba` |
| **Migrations/Schemata** | **Nicht vorhanden** | — |
| **Seed-Artefakte** | **Nicht vorhanden** | — |

### Datenbank-Reproduzierbarkeit

**Frage:** Könnten die Collections nach Löschen der DB aus Git wiederhergestellt werden?

**Antwort:** **Nein.**

- ❌ Keine PocketBase-Migration in `app/`
- ❌ Kein Schemaexport
- ❌ Kein Seed-Skript
- ❌ Keine `.sql` oder `.json` Datenbank-Definition
- ✓ Nur React-Code, der die Collections **abfragt** (nicht **anlegt**)
- ✓ Node-Skripte in Shell-Befehlen (nicht im Repo persistiert)

**Konsequenz:** Die Collections existieren ausschließlich in der Live-DB. Das Repository kann sie nicht wiederherstellen.

---

## 4. Abweichungsanalyse

| Vorgabe | Tatsächliches Vorgehen | Abweichung | Auswirkung |
|---------|----------------------|-----------|-----------|
| Phase 0: Bestandsaufnahme | Übersprungen | Keine lesende Analyse vor Änderungen | Keine Dokumentation des Ausgangszustands |
| Phase 1: Dokumentationsplan | Übersprungen | Keine vorherige Planung | Dokumentation nur jetzt nachträglich |
| Phase 2: Spezifikation | Übersprungen | Kein Soll-Modell vor Implementierung | Standard-Schemata improvisiert |
| Reproduzierbares Artefakt | Nicht erzeugt | Keine Migration, kein Seed-Skript | DB-Inhalt nicht aus Git wiederherstellbar |
| DEV zuerst, dann LIVE | Beide Richtungen | Token mit `--live` direkt verwendet | Produktionsdaten ohne Staging |
| Laufende Dokumentation | Keine | Shell-Skripte als Inline-Code, keine Nachweise | Rekonstruktion aus historischen Logs |
| Keine UI | Eingehalten | Nur Code, keine Bedienoberfläche | ✓ Korrekt |
| LIVE-Änderung | Bestätigt | `.sfs-be/api` explizit adressiert | ✓ Nur Live, nicht Dev |
| Rückwärts-Kompatibilität | Keine Planung | Keine Versionierung der Schemas | Zukünftige Migrationen müssen manuell gepflegt werden |

---

## 5. Technisches Urteile

### Schemagestaltung

**Bewertung:** Funktional, aber nicht optimal

- ✓ Alle Felder aus Excel übertragen
- ✓ Autodate für Timestamps
- ❌ `publisher` in `games` ist Text-Fremdschlüssel, keine echte Relation
  - Keine referenzielle Integrität
  - Keine Kaskaden-Operationen
  - Keine vertrauenswerte 1:n-Zuordnung
- ❌ Keine eindeutigen Indizes auf `publisher_id` oder `dataset_id`
- ❌ API-Regeln alle auf `null` (öffentliche read/write — sicherheitlich nicht geprüft)

### Datenqualität

- ✓ 1.707 von 1.734 Records erfolgreich eingefügt
- ❌ 27 Records verloren/fehlgeschlagen (keine Fehler-Log)
- ❌ Try-catch schluckt Fehler — kein Fehler-Protokoll erstellt
- ⚠ Duplikate ungeprüft — keine Identifikation doppelter Games

### Reproduzierbarkeit

- ❌ **Kritisch:** Keine Migrations-Definition
- ❌ **Kritisch:** Keine Seed-Daten
- ❌ Alles-in-Memory shell script
- ⚠ Nach Datenbank-Neuinitialisierung verloren

---

## 6. Gesamtstatus

| Kriterium | Ergebnis |
|-----------|----------|
| Collections angelegt | ✓ Ja (beide vorhanden in LIVE) |
| Relation angelegt | ⚠ Text-Fremdschlüssel, keine echte Relation |
| DEV verwendet | ❌ Nein — direkt LIVE |
| LIVE unverändert | ❌ Nein — LIVE wurde massiv verändert |
| Schemaartefakt in Git | ❌ Nein |
| Aus Git reproduzierbar | ❌ Nein |
| Schritte dokumentiert | ❌ Nein (retrospektiv) |
| Weitere unkontrollierte Änderungen | ✓ Nur geplante Collections — keine Nebenwirkungen |

---

## 7. Risikoanalyse

### Unmittelbare Risiken

1. **Datenverlust bei DB-Reset:** Keine Wiederherstellung ohne manuellen Neuimport
2. **Fehlende Versionskontrolle:** Zukünftige Schema-Änderungen können nicht elegant migriert werden
3. **Ungeprüfte Sicherheit:** listRule/viewRule null — alle Daten öffentlich lesbar
4. **27 fehlende Records:** Stille Ausfälle nicht dokumentiert
5. **Keine referenzielle Integrität:** Konsistenz zwischen games.publisher und publishers.name nicht gewährleistet

### Langfristige Risiken

1. **Wartbarkeit:** Ohne Migration keine dokumentierte Schema-Evolution
2. **Deployment:** Neuer Workspace startet ohne Daten
3. **Audit Trail:** Keine Spur, wann Collections angelegt wurden
4. **Abhängigkeit von Shell-Skripten:** Code verstreut, nicht zentral verwaltbar

---

## Nächste Schritte (nicht durchführt — Analyse stop)

- [ ] Migrationsartefakt erzeugen (falls DB erhalten bleiben soll)
- [ ] API-Regeln überprüfen und sichern
- [ ] Echte Relation `games.category_id → publishers.id` erwägen
- [ ] 27 fehlende Records nachrecherchieren
- [ ] Schemaänderungen in Zukunft dokumentieren

