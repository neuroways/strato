# NW-DB-STD-EXCEL-001
# Technischer Standard: Excel-zu-Datenbank-Pipeline und Admin-Datenbankmanager

**Dokument-ID:** NW-DB-STD-EXCEL-001  
**Versionsnummer:** 0.1.0  
**Status:** Architektur-Spezifikation nach Bestandsaufnahme  
**Gültig ab:** 2026-07-25  
**Letzte Aktualisierung:** 2026-07-25 12:47 UTC

---

## 1. Ziel und Geltungsbereich

### 1.1 Ziel

Dieser Standard definiert ein reproduzierbares Verfahren zur Überführung strukturierter Daten aus Excel-Dateien in die NeuroWays-Datenbankinfrastruktur.

Der Standard umfasst zwei verbundene Systeme:

- **Bereich A:** Eine kontrollierte Excel-zu-Datenbank-Pipeline mit Analyse, Mapping, Validierung und Importhistorie
- **Bereich B:** Eine generische Admin-Datenbankmanager-Oberfläche zur CRUD-Verwaltung freigegebener Collections

### 1.2 Geltungsbereich

**Gilt für:**

- Alle Excel-basierten Datenimporte nach 2026-07-25
- PocketBase v0.39.0 in der STRATO-DEV-Umgebung (`/.sfs-bd/`)
- Fachliche (user-defined) Collections
- Datensetze mit bis zu 10.000 Zeilen pro Blatt

**Gilt nicht für:**

- System-Collections (Prefix `_`)
- Auth-Sammlungen (`_pb_users_auth_`, etc.)
- Archivsammlungen oder technische Protokoll-Collections
- Operationen auf LIVE-Umgebung (`/.sfs-be/`)

### 1.3 Bindung

Dieser Standard ist **verbindlich** für alle zukünftigen Datenbankaufträge dieser Klasse.

Abweichungen benötigen schriftliche Architektur-Genehmigung und müssen im Auftrag explizit begründet sein.

---

## 2. Prozessschritte (Pipeline)

### 2.1 Vorbereitung

**Checklist:**

- [ ] Quell-Excel-Datei liegt vor
- [ ] Zielcollection ist benannt oder vorhanden
- [ ] Schema-Anforderung geklärt (neue Collection vs. Datenerweiterung)
- [ ] Git-Branch aktuell: `git status --short` = leer
- [ ] Entwicklungsauftrag erstellt und in `prompts/database/` gespeichert

### 2.2 Phase 1: Analyse

**Artefakt:** `database/imports/<IMPORT-ID>_<NAME>_analysis_v<VERSION>.json`

**Ablauf:**

1. Excel-Datei einlesen
2. Je Arbeitsblatt dokumentieren:
   - Blattname
   - Tabellenbereich (erste Zeile, letzte Zeile, erste Spalte, letzte Spalte)
   - Überschriftenmuster
   - Anzahl Datenzeilen
   - Anzahl Spalten
   - Erkannte Datentypen je Spalte
   - Formeln (soweit vorhanden)
   - Fehlende Werte
   - Duplikate (Identifikation nach Schlüsselfeld)
   - Outliers oder Anomalien

3. Entscheidungen festlegen für jedes Arbeitsblatt:
   - Zielsammlung (neue oder existierende Collection)
   - Mapping (Spalte → Feld)
   - Eindeutigkeitsschlüssel
   - Relationen
   - Validierungsregeln

### 2.3 Phase 2: Mapping

**Artefakt:** `database/mappings/<IMPORT-ID>_<NAME>_mapping_v<VERSION>.json`

**Struktur:**

```json
{
  "import_id": "NW-IMPORT-<NUMBER>",
  "version": "0.1.0",
  "source": {
    "file": "<absolute oder relative Dateipfad>",
    "sheets": [
      {
        "name": "<Blattname>",
        "header_row": 1,
        "data_start_row": 2,
        "data_end_row": <Letzte Datenzeile>,
        "total_rows": <Anzahl Datenzeilen>
      }
    ]
  },
  "targets": [
    {
      "sheet": "<Blattname>",
      "collection": "<collection_name>",
      "type": "base",
      "create_if_missing": false,
      "schema_version": "0.1.0"
    }
  ],
  "field_mappings": [
    {
      "sheet": "<Blattname>",
      "collection": "<collection_name>",
      "source_column": "<Excel-Spaltenname>",
      "source_index": 0,
      "target_field": "<PocketBase-Feldname>",
      "source_type": "text|number|date|boolean",
      "target_type": "text|number|date|bool|relation|select|...",
      "required": false,
      "unique": false,
      "transformation": null,
      "null_handling": "preserve_null|empty_string|default",
      "default_value": null,
      "validation_rule": null,
      "decision_category": "EINDEUTIG|TECHNISCH_ABLEITBAR|FACHLICH_ZU_BESTÄTIGEN",
      "notes": ""
    }
  ],
  "validation_rules": [
    {
      "collection": "<collection_name>",
      "field": "<Feldname>",
      "rule": "<constraint>",
      "error_message": "<Meldungstext>"
    }
  ],
  "ignored_columns": [
    {
      "sheet": "<Blattname>",
      "column": "<Spaltenname>",
      "reason": "<Begründung>"
    }
  ],
  "decisions": []
}
```

**Qualitätsprüfung:**

- Alle Spalten sind zugeordnet oder als ignoriert dokumentiert
- Keine Spalte ist stillschweigend übersehen
- Eindeutigkeitsschlüssel definiert
- Pflichtfelder geklärt

### 2.4 Phase 3: Schema (nur bei neuen Collections)

**Artefakt:** `database/schemas/<collection_name>.collection.json`

**Ablauf:**

1. Existenz in Datenbank prüfen
2. Falls neu: Schema erzeugen (siehe NW-DB-STD-001, Kapitel „Schemaerzeugung")
3. Falls existierend: Ist-Schema auslesen, mit Mapping vergleichen
4. Abweichungen dokumentieren
5. Konsistenz mit anderen bestehenden Sammlungen prüfen (Relationen, Stammdaten)

**Keine neuen Collections ohne explizite Genehmigung.**

### 2.5 Phase 4: Records (Datensätze erzeugen)

**Artefakt:** `database/data/<fachbereich>/<name>_v<VERSION>.records.json`

**Ablauf:**

1. Mappingdatei einlesen
2. Für jede Datenzeile in der Excel-Datei:
   - Felder gemäß Mapping transformieren
   - Validierungsregeln prüfen
   - Eindeutigkeitsschlüssel prüfen
   - JSON-Record erzeugen
   - Status `GÜLTIG` oder Fehler dokumentieren

3. Alle gültigen Records in `records.json` speichern
4. Statistik und Fehlerbericht erzeugen

**Struktur:**

```json
{
  "metadata": {
    "import_id": "NW-IMPORT-<NUMBER>",
    "version": "0.1.0",
    "source_file": "<Dateipfad>",
    "collection": "<collection_name>",
    "created_at": "<ISO-Zeitstempel>",
    "total_records": <Anzahl>,
    "valid_records": <Anzahl>,
    "invalid_records": <Anzahl>,
    "mapping_file": "<Pfad>"
  },
  "records": [
    {
      "field1": "value1",
      "field2": "value2",
      "...": "..."
    }
  ],
  "invalid_records": [
    {
      "row_number": <Zeilennummer>,
      "source_data": { "...": "..." },
      "errors": [
        { "field": "<Feldname>", "error": "<Fehlerbeschreibung>" }
      ]
    }
  ]
}
```

### 2.6 Phase 5: Importmanifest

**Artefakt:** `database/imports/<IMPORT-ID>_<NAME>_manifest_v<VERSION>.json`

**Struktur:**

```json
{
  "import_id": "NW-IMPORT-<NUMBER>",
  "name": "<NAME>",
  "version": "0.1.0",
  "created_at": "<ISO-Zeitstempel>",
  "source_type": "xlsx|xls",
  "source_file": "<Dateipfad>",
  "source_checksum": "<SHA256-Hash>",
  "target_environment": "DEV",
  "target_collections": ["<collection_name>"],
  "mapping_file": "database/mappings/<IMPORT-ID>_<NAME>_mapping_v<VERSION>.json",
  "schema_files": ["database/schemas/<collection_name>.collection.json"],
  "records_files": ["database/data/<fachbereich>/<name>_v<VERSION>.records.json"],
  "import_mode": "ANALYSE_ONLY|DRY_RUN|IMPORT_NEW|REIMPORT_SAFE",
  "status": "prepared|dry_run_passed|imported|blocked",
  "error_summary": null
}
```

### 2.7 Phase 6: Deployment in DEV

**Vor Schreibzugriff:**

1. DEV-Pfad verifizieren: `/.sfs-bd/` ✓
2. Token aktuell: `pb_gen_token_sfs.js` ✓
3. Zielcollection existiert oder wird neu angelegt ✓
4. Records auf Eindeutigkeit und Gültigkeit prüft ✓

**Schreibprozess:**

- Für jede neue Collection: POST zu `/collections`
- Für jeden neuen Record: POST zu `/records/<collection>` oder batch-Insert (wenn verfügbar)
- Nach jedem POST: GET zur Verifikation
- Bei Fehler: Abbruch, Dokumentation, Keine Teilweise-Importe

**Importmodi:**

| Modus | Beschreibung | Aktion |
|---|---|---|
| **ANALYSE_ONLY** | Datei analysieren, keine Datenbank-Änderung | Nur Analyse-Artefakte speichern |
| **DRY_RUN** | Analyse + Schema + Records erzeugen, aber nicht in DB schreiben | Manifest mit Status `dry_run_passed` speichern |
| **IMPORT_NEW** | Nur neue Records einfügen (basierend auf unique key) | INSERT neue Records |
| **REIMPORT_SAFE** | Vergleich mit bestehendem Datenbestand, Skip identische, Report abweichend | Selective INSERT/UPDATE |

### 2.8 Phase 7: Verifikation

**Nach dem Import:**

1. Alle Records wiederlesen
2. Soll-Ist-Vergleich (Records in DB ↔ Records in JSON)
3. Feldtypen, Inhalte, Beziehungen prüfen
4. Importbericht erstellen

**Artefakt:** `database/imports/<IMPORT-ID>_<NAME>_report_v<VERSION>.json`

**Struktur:**

```json
{
  "import_id": "NW-IMPORT-<NUMBER>",
  "version": "0.1.0",
  "collection": "<collection_name>",
  "source_rows": <Anzahl Zeilen in Excel>,
  "imported_count": <Anzahl eingefügt>,
  "identical_count": <Anzahl übersprungen>,
  "conflict_count": <Anzahl Konflikte>,
  "invalid_count": <Anzahl ungültig>,
  "ignored_count": <Anzahl bewusst ignoriert>,
  "errors": [
    { "row": <Zeilennummer>, "field": "<Feldname>", "error": "<Text>" }
  ],
  "verification_status": "PASSED|WARNING|FAILED",
  "verification_details": "<Freitextbeschreibung>",
  "database_record_count": <Aktuelle Count in DB>,
  "timestamp": "<ISO-Zeitstempel>"
}
```

### 2.9 Phase 8: Git und Dokumentation

**Git-Vorbereitung:**

```bash
cd app
git status --short  # Muss leer sein

git add database/mappings/<IMPORT-ID>_<NAME>_mapping_v<VERSION>.json
git add database/schemas/<collection_name>.collection.json
git add database/data/<fachbereich>/<name>_v<VERSION>.records.json
git add database/imports/<IMPORT-ID>_<NAME>_manifest_v<VERSION>.json
git add database/imports/<IMPORT-ID>_<NAME>_report_v<VERSION>.json
git add prompts/database/imports/<IMPORT-ID>_<NAME>_v<VERSION>.md

git diff --check
git commit -m "NW-DB: <Kurzbeschreibung des Imports> [<IMPORT-ID>]"
git push
```

**Commit-Nachricht-Vorlage:**

```
NW-DB: import <collection_name> from Excel [<IMPORT-ID>]

- Source: <Dateipfad>
- Records: <Anzahl> imported
- Mappings: <Datei>
- Manifest: <Datei>
- Verification: PASSED
```

---

## 3. Ordnerstruktur (Mandatory)

```
app/
  database/
    schemas/              # Collection-Schemata (JSON)
      <collection_name>.collection.json
    mappings/             # Excel-zu-Feld-Mappings (JSON)
      <IMPORT-ID>_<NAME>_mapping_v<VERSION>.json
    imports/              # Import-Historie und Reports (JSON)
      <IMPORT-ID>_<NAME>_manifest_v<VERSION>.json
      <IMPORT-ID>_<NAME>_report_v<VERSION>.json
    data/                 # Versionierte Datensätze (JSON)
      <fachbereich>/
        <name>_v<VERSION>.records.json
  prompts/
    database/
      imports/            # Import-Aufträge (Markdown)
        <IMPORT-ID>_<NAME>_v<VERSION>.md
```

---

## 4. Artefakttypen und Namenkonvention

| Artefakt | Pfad | Muster |
|---|---|---|
| Import-Auftrag | `prompts/database/imports/` | `<ID>_<NAME>_v<VERSION>.md` |
| Mapping | `database/mappings/` | `<ID>_<NAME>_mapping_v<VERSION>.json` |
| Schema | `database/schemas/` | `<COLLECTION_NAME>.collection.json` |
| Records | `database/data/<BEREICH>/` | `<NAME>_v<VERSION>.records.json` |
| Manifest | `database/imports/` | `<ID>_<NAME>_manifest_v<VERSION>.json` |
| Report | `database/imports/` | `<ID>_<NAME>_report_v<VERSION>.json` |

**Beispiel:**

```
prompts/database/imports/NW-IMPORT-001_Games_Expansion_v0.1.0.md
database/mappings/NW-IMPORT-001_Games_Expansion_mapping_v0.1.0.json
database/schemas/games_expansion.collection.json
database/data/games/Games_Expansion_v0.1.0.records.json
database/imports/NW-IMPORT-001_Games_Expansion_manifest_v0.1.0.json
database/imports/NW-IMPORT-001_Games_Expansion_report_v0.1.0.json
```

---

## 5. Validierungsregeln (Mandatory)

**Vor jedem Import:**

- [ ] JSON-Syntax gültig
- [ ] UTF-8 Encoding
- [ ] Eindeutige fachliche Schlüssel pro Record
- [ ] Pflichtfelder gesetzt
- [ ] Datentypen korekt (text, number, date, boolean, ...)
- [ ] Relationsziele vorhanden (wenn Relation-Felder)
- [ ] Select-Werte in erlaubter Liste
- [ ] Datumsformate ISO-konform (YYYY-MM-DD)
- [ ] Keine leeren Titel/Bezeichnungen (Pflichtfeld)
- [ ] Duplikate gemeldet (nicht ignoriert)
- [ ] Excel-Datenzeilen = Records in JSON (ggf. minus Fehler)
- [ ] Keine Zeile unbemerkt verschwindend

**Fehlerbehandlung:**

- Ungültige Records in separates Array `invalid_records` verschieben
- Pro Fehler: Zeilennummer, Feldname, Fehlermeldung dokumentieren
- Import stockt beim ersten kritischen Fehler
- Report enthält vollständige Fehler-Zusammenfassung

---

## 6. Konfliktregeln

| Situation | Aktion |
|---|---|
| **Neue Collection** | Anlage via POST zu `/collections` |
| **Bestehende Collection, neuer Record** | INSERT via POST zu `/records/<collection>` |
| **Bestehende Collection, identischer Record** | SKIP, dokumentieren |
| **Bestehende Collection, abweichender Record** | Konflikt-Meldung, nicht überschreiben |
| **Doppelte Records in Excel** | Fehler, Import stoppen |
| **Relationsziel nicht vorhanden** | Fehler, Record ungültig |
| **Unique-Key-Verletzung** | Fehler, Record ungültig |
| **Netzwerkfehler beim POST** | Neuversuch 1x, dann dokumentieren |

---

## 7. Deployment-Regeln

### 7.1 DEV-Umgebung

**Nachzuweis vor Deployment:**

- DEV-Pfad: `/.sfs-bd/api` ist erreichbar
- Token gültig: `pb_gen_token_sfs.js` produziert aktuellen JWT
- Zielcollection existiert oder Schema liegt vor
- Verifikation nach Import durchgeführt

### 7.2 LIVE-Umgebung

**LIVE darf nicht berührt werden**, außer:

- Explizite schriftliche Genehmigung vorhanden
- Schema wurde vorher in DEV erfolgreich getestet
- Daten werden über App-UI importiert (nie direkt)
- Audit-Trail aktiviert

---

## 8. Admin-Datenbankmanager (Frontend)

### 8.1 Route und Navigation

**Logische Route:** `/admin/database` (oder `/admin/datenbank` bei deutschsprachiger Struktur)

**Navigation:**

- Hauptmenu → "Admin" (falls nicht vorhanden: implementieren)
- Admin → "Datenbank"
- Text: "Datenbank"
- Icon: Datenbankschema oder ähnlich

**React Router Struktur:**

```jsx
const adminRoutes = [
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'database',
        element: <DatabaseManager />
      }
    ]
  }
];
```

### 8.2 Collection Registry

**Datenmodell:**

```json
{
  "id": "<pk>",
  "collection_name": "games",
  "display_name": "Spiele",
  "description": "Brettspiele und Anleitungen",
  "category": "products",
  "enabled": true,
  "visible_in_admin": true,
  "allow_create": false,
  "allow_update": true,
  "allow_delete": false,
  "searchable_fields": ["title", "publisher"],
  "default_columns": ["id", "title", "publisher", "created"],
  "default_sort": "title",
  "page_size": 20,
  "schema_version": "0.1.0",
  "data_version": "1.0.0",
  "display_order": 1,
  "last_import": "<ISO-Zeitstempel>",
  "created": "<ISO-Zeitstempel>",
  "updated": "<ISO-Zeitstempel>"
}
```

**Collections:**

- `npl_personal_inventory_items` → visible, allow_update, no create/delete
- `games` → visible, allow_update, no create/delete
- `publishers` → visible, allow_update, no create/delete
- Weitere Fachsammlungen nach Bedarf

**System-Collections sind standardmäßig nicht sichtbar.**

### 8.3 UI-Komponenten

**Übersicht:**

- Registrierte Collections als Liste/Karten
- Pro Collection: Name, Beschreibung, Record-Count, letzter Import, Status
- Filter: Kategorie, sichtbar/hidden
- Sorting: Display Order, Name

**Tabellenansicht:**

- Spaltenauswahl (aus Schema)
- Volltextsuche (über searchable_fields)
- Filter pro Spalte (Text, Number, Date, Boolean, Select)
- Sortierung (beliebige Spalte)
- Pagination (page_size aus Registry)
- Ladezustand, Leerezustand, Fehlerzustand

**Datensatz-Detail:**

- Vollständige Felderanzeige
- Technische ID (system `id`) vs. fachliche ID (z.B. `inventory_id`)
- `created` und `updated` Timestamps
- Relationswerte verständlich anzeigen (z.B. "Spielname (ID: xyz)" statt nur ID)
- Längere Texte in Read-Only-Textareas

**Bearbeiten:**

- Formular mit Eingabefeldern je Feldtyp
- text → `<input type="text">`
- number → `<input type="number">`
- bool → `<input type="checkbox">` oder Toggle
- date → `<input type="date">`
- select → `<select>` mit Optionen
- relation → Autocomplete-Feld
- textarea → `<textarea>` für lange Texte
- Pflichtfeld-Indikator (Asterisk)
- Validierungsfehler unter Feld
- "Speichern" und "Abbrechen" Buttons
- Nach Speichern: Erfolgs-Toast, Rückleitung zur Liste

**Neuanlage:**

- Nur für Collections mit `allow_create: true`
- Identische Formular-UI wie Bearbeiten
- Keine Umgehung eindeutiger Schlüssel möglich
- Validierung vor Speichern

**Löschen:**

- Nur für Collections mit `allow_delete: true`
- Bestätigungsdialog mit Datensatz-Anzeige
- "Wirklich löschen?" mit Datensatz-Preview
- Bei Relationsprüfung: Warnung, falls Record referenziert wird
- "Löschen bestätigen" Button
- Nach Löschung: Toast, Rückleitung zur Liste

### 8.4 Excel-Import im Admin

**Route:** `/admin/database/import` (optional)

**Funktionen:**

1. **Dateiauswahl:** File-Input (`.xlsx`, `.xls`)
2. **Analyse:** Button "Analysieren" → Strukturanalyse anzeigen
3. **Mapping:** Automatisch vorgefüllt aus Mapping-Datei (falls vorhanden)
4. **Mapping-Editor:** Spalten ↔ Felder manuell zuordnen
5. **Ziel-Collection:** Auswahl aus registrierten Collections
6. **Validierung:** Fehler-Summary vor Import
7. **Dry Run:** Button "Trocken-Import" → Zeigt erwartete Änderungen
8. **Import:** Button "Importieren" → Schreibt Records
9. **Ergebnis:** Report anzeigen (importiert, übersprungen, Fehler)
10. **Manifest:** Download Manifest/Report als JSON

**Technische Beschränkung:**

- Keine Collection-Anlage aus Browser
- Nur Datenimport in existierende, registrierte Collections
- Schema-Änderungen außerhalb der Browser-UI (Deploymentprozess)

---

## 9. Rollen und Berechtigungen

### 9.1 Rollen

| Rolle | Admin-Zugriff | Datenbankansicht | Import | Bearbeitung |
|---|---|---|---|---|
| **NeuroWays-Admin** | Ja | Ja | Ja | Ja |
| **Unternehmensverantwortliche** | Nein | Ja (eingeschränkt) | Nein | Ja (eingeschränkt) |
| **Manager** | Nein | Nein | Nein | Nein |
| **Mitarbeitende** | Nein | Nein | Nein | Nein |

### 9.2 Serverseitige Durchsetzung

**Authentifizierung:**

- Benutzer muss angemeldet sein (`pb.authStore.isValid`)
- Token prüfen, ggf. refreshen

**Autorisierung (PocketBase Rule):**

```javascript
// Beispiel: Nur Admin darf in Datenbank-Collections schreiben
@request.auth.role = "admin" || @request.auth.role = "super"
```

**Frontend-Sicherheit:**

- Menüpunkt nur sichtbar für berechtigte Rollen
- Aber: Serverseitige Regel ist Quelle der Wahrheit
- Direkte URL ohne Berechtigung zeigt Fehlermeldung

---

## 10. Importhistorie und Audit-Trail

### 10.1 Import-History Collection

**Name:** `nw_import_history`

**Felder:**

```json
{
  "id": "<pk>",
  "import_id": "NW-IMPORT-001",
  "import_version": "0.1.0",
  "source_file": "<Dateipfad>",
  "source_checksum": "<SHA256>",
  "target_collection": "games",
  "mapping_version": "0.1.0",
  "schema_version": "0.1.0",
  "import_mode": "IMPORT_NEW",
  "records_imported": 100,
  "records_identical": 5,
  "records_conflict": 0,
  "records_invalid": 2,
  "started_at": "<ISO-Zeitstempel>",
  "completed_at": "<ISO-Zeitstempel>",
  "status": "SUCCESS|PARTIAL|FAILED",
  "error_summary": null,
  "git_commit": "<Commit-SHA>",
  "git_branch": "main",
  "executed_by": "<User-ID>",
  "manifest_file": "<Pfad>",
  "report_file": "<Pfad>",
  "created": "<ISO-Zeitstempel>",
  "updated": "<ISO-Zeitstempel>"
}
```

**Sicherheit:**

- Keine Tokens oder Zugangsdaten speichern
- SHA256-Checksumme der Quelldatei zur Verifizierung
- Nur Git-Commit-SHA (keine Auth-Daten)

### 10.2 Change Log (Optional)

**Name:** `nw_change_log`

**Felder:**

```json
{
  "id": "<pk>",
  "collection": "games",
  "record_id": "<Record-ID>",
  "action": "CREATE|UPDATE|DELETE",
  "changed_fields": ["title", "publisher"],
  "old_values": { "title": "...", "publisher": "..." },
  "new_values": { "title": "...", "publisher": "..." },
  "changed_at": "<ISO-Zeitstempel>",
  "changed_by": "<User-ID>",
  "change_source": "ADMIN_UI|IMPORT|API",
  "created": "<ISO-Zeitstempel>"
}
```

---

## 11. Wiederholbarkeit und Versionierung

### 11.1 Artefakt-Versionierung

**Alle Artefakte müssen versioniert sein:**

- Mapping: `_mapping_v0.1.0.json`
- Records: `_v0.1.0.records.json`
- Manifest: `_manifest_v0.1.0.json`
- Report: `_report_v0.1.0.json`

**Version-Scheme:** `<MAJOR>.<MINOR>.<PATCH>`

- **MAJOR:** Schema oder Mapping grundlegend geändert
- **MINOR:** Felder hinzugefügt oder Logik erweitert
- **PATCH:** Kleinere Anpassungen, Bugfixes

### 11.2 Git-Integration

**Für jeden Import:**

1. Artefakte in Git speichern
2. Commit mit eindeutigem Import-ID
3. Branch bleibt `main` (no feature branches für Datenimporte)
4. Push zu eindeutig konfiguriertem Remote

**Reproduzierbarkeit:**

- Anhand von Commit-SHA können alle Artefakte zurückgelesen werden
- Mappings sind dokumentiert
- Records sind versioniert
- Alle Schritte nachvollziehbar

---

## 12. Fehlerbehandlung

### 12.1 Kritische Fehler (Abbruch)

```
DEPLOYMENT BLOCKED – <REASON>

Beispiele:
- DEV ENVIRONMENT NOT VERIFIED
- SCHEMA DECISION REQUIRED
- MAPPING DECISION REQUIRED
- UNIQUE KEY VIOLATION
- RELATIONAL TARGET NOT FOUND
```

### 12.2 Warnungen (Continue mit Dokumentation)

```
IMPORT WARNING – <REASON>

Beispiele:
- <N> invalid records in batch (documented in report)
- Network retry on POST (retried successfully)
- Duplicate values in searchable field (allowed, documented)
```

### 12.3 Fehlerprotokollierung

**Im Report docummentieren:**

- Zeilennummer der Fehlerzeile
- Feldname
- Fehlerwert
- Fehlerbeschreibung
- Grund (Validierungsregel, Datentyp, Relation, etc.)

**Keine Fehlermeldungen im Browser-Log ohne Dokumentation in Report.**

---

## 13. Git-Verhalten (Mandatory)

**Vor jedem Commit:**

```bash
git status --short                # Prüfen: nur Import-Artefakte?
git diff --check                  # Whitespace-Fehler?
node -e "..." < database/mappings/<FILE>.json  # JSON-Syntax?
```

**Commit-Nachricht:**

```
NW-DB: import <collection> from <source> [<IMPORT-ID>]

- Records: <N> imported, <M> identical, <E> errors
- Mapping: <VERSION>
- Schema: <VERSION> (new|unchanged|updated)
- Verification: <STATUS>
```

**Erlaubte Dateien je Commit:**

- `database/mappings/`
- `database/schemas/`
- `database/imports/`
- `database/data/`
- `prompts/database/imports/`
- `docs/database/` (Dokumentation)

**Verbotene Dateien:**

- `src/` (nicht mit Import-Commits verändern)
- `dist/` (wird separat gebaut)
- `package.json` (keine neuen Dependencies)
- `.env` (keine Tokens)
- `node_modules/`

---

## 14. Zusammenfassung der Bindenden Regeln

1. **Vor jedem Import:** Bestandsaufnahme und Mapping dokumentieren
2. **Keine Schemänderung ohne Dokumentation:** Alle Feldänderungen in Git als Artefakt
3. **Keine DEV/LIVE-Vermischung:** Nur `/.sfs-bd/`, Umgebung prüfen
4. **Keine automatischen Überschreibungen:** Records nur anlegen oder skippieren
5. **Alle Zeilen nachverfolgbar:** Jede Excel-Zeile hat Status im Importbericht
6. **Validierung vor Schreiben:** Keine ungültigen Records in Datenbank
7. **Importhistorie als Collection:** Alle Importe dokumentiert und einsehbar
8. **Keine Tokens im Code:** Auth über Wrapper und Token-Generator
9. **Git ist Quelle der Wahrheit:** Artefakte in Git = aktueller Stand
10. **Rollback via Git:** Alte Version = älterer Commit

---

## 15. Status dieses Dokumentes

**Gültig ab:** 2026-07-25  
**Architektur-Review:** Nach Bestandsaufnahme erforderlich  
**Nächste Review:** Nach erstem Excel-Import gemäß Standard  
**Änderungsverfahren:** Neue Version bei Material-Änderung; Minor-Update bei Klarstellungen

