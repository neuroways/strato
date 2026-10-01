# MASTERPROMPT: NeuroPlay Excel-zu-Datenbank-Projektstand
# Version 1.0.0 | Erstellt: 2026-08-15 | Status: AKTIV

---

## 🎯 Projektübersicht (60 Sekunden)

**Name:** NeuroPlay Katalog + Excel Import + Admin-Datenbankmanager  
**Zweck:** Verwaltung einer Spielesammlung (Spiele/Verlage) + universelles Excel-Import-System + generischer Datenbankmanager  
**Tech-Stack:** React 18 + Vite 5 + Tailwind CSS v4 + PocketBase v0.39.0  
**Umgebung:** STRATO-Plattform (DEV: `/.sfs-bd/api`, LIVE: `/.sfs-be/api`)  
**Repository:** `github.com/neuroways/excel_ai` (Branch: `dev`)  
**Build:** Produktions-Ready | Letzter Commit: `f817e39` (feat: auto-create collections from Excel sheets)

---

## 📊 Projektstand (Was läuft? Was ist offen?)

### ✅ Fertig implementiert

1. **NeuroPlay Katalog (Tab 1+2)**
   - Spiele-Liste: Lädt alle Spiele aus `games`-Collection
   - Verlage-Liste: Lädt alle Verlage aus `publishers`-Collection
   - Live Datenabfrage, keine statischen Daten

2. **NeuroBalance Assessment-System (Tab 3)**
   - Startseite mit 3 Assessment-Optionen (Energie-Balance, Fokus-Check, Stimmungs-Monitor)
   - 5-Fragen-Fragebogen mit Schiebe-Regler (Werte 1–5)
   - Ergebnis-Seite mit Score, Interpretation und personalisierten Empfehlungen
   - Fully functional, responsive Design, Fehlerbehandlung

3. **Admin-Datenbankmanager (Tab 4)**
   - Route: `/admin/database`
   - Zeigt registrierte Collections aus `nw_collection_registry`
   - Tabellenansicht mit Volltextsuche, Filter, Sortierung, Pagination
   - CRUD-Operationen: Lesen, Bearbeiten, Löschen (mit Bestätigung)
   - Responsiv auf mobile/tablet/desktop

4. **Excel-Import-Pipeline (Tab 5 + Sub-Route)**
   - Route: `/excel-import`
   - 5-Phasen-Assistent:
     1. **Dateiauswahl:** `.xlsx` / `.xls` Upload
     2. **Analyse:** XLSX wird lokal geparsed → Arbeitsblätter, Spalten, Datentypen erkannt
     3. **Mapping:** Zwei Modi:
        - *In vorhandene Collection:* Wählt registrierte Collection, mapped Spalten
        - *Neue Collections anlegen:* Erstellt automatisch Collections aus Arbeitsblättern
     4. **Dry Run:** Validiert Daten, zeigt Vorschau (neu/identisch/Konflikt), zählt Fehler
     5. **Import:** Speichert in Datenbank (POST `/api/collections` für neue, dann POST records)
   - Fehlerbehandlung: Zeigt ungültige Zeilen, doppelte, type-mismatches
   - Importbericht: Download mit Details (importiert/identisch/konflikt/ungültig pro Zeile)

5. **Collection Registry (`nw_collection_registry`)**
   - Schema: 26 Felder (registry_id, collection_name, display_name, allow_create, allow_update, etc.)
   - Seed-Daten: 3 Einträge (games, publishers, personal_inventory_items)
   - Steuert sichtbarkeit + Berechtigungen im Admin

6. **Dokumentation & Standards**
   - `NW-DB-STD-001`: Verbindlicher STRATO-PocketBase-Standard (24 Kapitel)
   - `NW-DB-STD-EXCEL-001`: Excel-zu-DB-Pipeline Standard (29 Abschnitte)
   - `NW-FEATURE-EXCEL-IMPORT-001`: Implementation Guide (496 Zeilen)
   - Lernschritte, API-Referenzen, Change Records archiviert in `docs/`

### ⚠️ Bekannte Einschränkungen

1. **Server-Upload für Excel deaktiviert**
   - Grund: Status 413 (Datei zu groß für multipart-Endpoint)
   - Lösung: Datei wird lokal im Browser geparsed, nur Daten werden in DB geschrieben
   - Upload-Verzeichnis `app/uploads/xlsx/` existiert, ist aber leer (kein Fehler)

2. **Collection-Erstellung erfordert Admin-Rechte**
   - Modus „Neue Collections anlegen" benötigt PocketBase Admin-Token
   - Token wird aus Dev-Umgebung generiert (`pb_gen_token_sfs.js`)
   - Hat nur während Import/DEV-Deployment Gültig (1 Stunde)

3. **PocketBase v0.39.0 Besonderheiten beachten**
   - Boolean-Felder: `required: false` (nicht `true`), sonst „Cannot be blank"-Fehler
   - `created`/`updated` sind NICHT auto-system-felder → müssen explizit definiert werden
   - Relations: Collection-ID (`pbc_…`) in Schema, Record-ID in Daten

4. **Import-History nicht implementiert**
   - Geplant: Separate Collection für Audit-Trail (wer/wann/was importiert)
   - Noch nicht gebaut, ist aber im Standard vorgesehen

### ❓ Offene Anforderungen (Status: ANALYSIS)

1. **Datenbank-Umgebung Consistency**
   - Fehler in Logs: `403 Forbidden`, `404 Missing collection context`
   - Wahrscheinliche Ursache: DEV/LIVE API-Regeln nicht synchron, oder Collections fehlen in einer Umgebung
   - **Nächster Schritt:** Datenbank-Berechtigungen prüfen (List/View-Regeln für alle fachlichen Collections)

2. **Excel-Upload auf Server speichern**
   - Requirement: Datei soll in `app/uploads/xlsx/<ProjectName>/<Timestamp>-<Dateiname>` landen
   - Status: Vite-Plugin existiert, aber multipart-Upload schlägt fehl
   - **Nächster Schritt:** Endpoint mit `formidable` oder ähnlich umschreiben (nicht manuelles Parsing)

3. **Import-Logs und Versionshistorie**
   - Requirement: Jeder Import soll loggbar sein (wer/wann/Ergebnis)
   - Status: Nicht implementiert
   - **Nächster Schritt:** `nw_import_history` Collection anlegen, Logs bei jedem Import schreiben

4. **Benutzer-Berechtigungen im Admin**
   - Requirement: Nicht alle dürfen alle Collections bearbeiten/löschen
   - Status: Berechtigungen sind in Registry definiert, aber UI prüft nicht wirklich
   - **Nächster Schritt:** PocketBase-Regeln für authenticated users prüfen, UI-Guards einbauen

---

## 🏗️ Architektur

```
┌─ React App (src/App.jsx)
│  ├─ Tab 1: GamesList (Spiele)
│  ├─ Tab 2: PublisherList (Verlage)
│  ├─ Tab 3: NeuroBalance (Assessment mit CheckIn+Result)
│  ├─ Tab 4: AdminDatabase (/admin/database Route)
│  └─ Tab 5: ExcelImportUI (/excel-import Route)
│
├─ PocketBase Collections (DEV: /.sfs-bd/api)
│  ├─ games (Spielkatalog)
│  ├─ publishers (Verlagsstammdaten)
│  ├─ npl_personal_inventory_items (persönliche Sammlung, 103 Records)
│  ├─ nw_collection_registry (Admin-Steuerung, 3 Einträge)
│  └─ (weitere Collections als Bedarf)
│
├─ Vite Plugins
│  └─ vite-plugin-excel-upload.js (/api/upload-excel, /<bisher deaktiviert)
│
└─ Dokumentation
   ├─ docs/standards/ (NW-DB-STD-001, -EXCEL-001)
   ├─ docs/database/ (API-Referenzen, Lernschritte)
   ├─ prompts/ (Deployment-Prompts)
   └─ database/ (Schemas, Seed-Daten)
```

---

## 🔧 Wie man damit arbeitet

### Den Projektstand rekonstruieren
```bash
git clone https://github.com/neuroways/excel_ai.git
cd excel_ai
git checkout dev
npm install
npm run dev
```

### Eine neue Collection hinzufügen
1. Schema in `database/schemas/<name>.collection.json` definieren
2. Seed-Daten in `database/data/<category>/<name>.records.json` (optional)
3. Eintrag in `nw_collection_registry` seed-Datei hinzufügen
4. Im Excel-Import: Entweder als „Neue Collections" oder manuell über `/api/collections` POST

### Excel-Datei importieren
1. **Live-App:** Tab „Excel-Import"
2. Datei hochladen → Analysieren
3. Arbeitsblätter wählen (neue Collections oder bestehende)
4. Dry Run → Vorschau → Bestätigen

### PocketBase-Token regenerieren (wenn abgelaufen)
```bash
node /etc/goose/skills/pocketbase/tools/pb_gen_token_sfs.js        # DEV
node /etc/goose/skills/pocketbase/tools/pb_gen_token_sfs.js --live # LIVE (nie verwenden!)
```

---

## 📋 Git-Konventionen

**Commit-Messages:**
- `feat: <Beschreibung>` — Neue Funktion
- `fix: <Beschreibung>` — Bug-Fix
- `docs: <Beschreibung>` — Nur Dokumentation
- `refactor: <Beschreibung>` — Code-Umstrukturierung ohne Verhaltenswechsel

**Branches:**
- `dev` — Hauptentwicklung (derzeitig aktiv)
- `main` — Production-Ready (noch nicht initialisiert)

**Vor jedem Commit:**
```bash
git status --short
git diff --check  # Keine Whitespace-Fehler
npm run build     # Gibt es Build-Fehler?
```

---

## 🚨 Kritische Fehler & Lösungen

| Fehler | Ursache | Lösung |
|--------|--------|--------|
| `403 Forbidden` auf `/games`, `/publishers` | API-Regeln in PocketBase zu restriktiv | List/View-Regel prüfen: muss `@request.auth != nil` sein oder `true` für public |
| `404 Missing collection context` | Collection existiert nicht oder falscher Name | In DEV-Datenbank prüfen: `curl /.sfs-bd/api/collections` |
| Status 413 bei Excel-Upload | Datei > 10MB oder Endpoint konfiguriert falsch | Server-Upload momentan deaktiviert, nur Browser-Parse aktiv |
| `Cannot read properties of undefined (reading 'read')` | XLSX-Library nicht importiert | `import XLSX from 'xlsx'` muss oben in Komponente sein |
| `Aborted request` in PocketBase | Parallele Requests mit gleichem Query | AbortController verwenden, nur einen aktiven Request pro Komponente |

---

## 📦 Dateien & Struktur

**Komponenten (src/components/):**
- `AdminDatabase.jsx` (187 Z) — Admin-Manager UI
- `ExcelImportUI.jsx` (802 Z) — 5-Phasen Excel-Import
- `GamesList.jsx` (194 Z) — Spiele-Tabelle
- `PublisherList.jsx` (177 Z) — Verlage-Tabelle
- `DataUploader.jsx` (272 Z) — Legacy (wird durch ExcelImportUI ersetzt)

**Styles (src/styles/):**
- `AdminDatabase.css`
- `ExcelImportUI.css`
- `GamesList.css`, `PublisherList.css`, `DataUploader.css`

**Datenbank (database/):**
- `schemas/nw_collection_registry.collection.json` — Admin-Registry Schema
- `schemas/npl_personal_inventory_items.collection.json` — Persönliche Sammlung
- `data/system/nw_collection_registry_v0.1.0.records.json` — Seed-Daten

**Dokumentation (docs/ & prompts/):**
- Standards: `NW-DB-STD-001`, `NW-DB-STD-EXCEL-001`
- Lernschritte: `NW-DB-LEARN-002` bis `-005`
- API-Referenzen: `NW-DB-API-ARCHITECTURE`, `NW-DB-API-REFERENCE`
- Templates: `NW-DB-TPL-001`, `-003`
- Implementation Guide: `NW-FEATURE-EXCEL-IMPORT-001`

---

## 🎬 Nächste Schritte (Priorisierung)

### P0 (BLOCKIEREND)
1. **Datenbank-Umgebung konsistent machen**
   - DEV-PocketBase prüfen: Alle Collections vorhanden?
   - API-Regeln: Können `games`, `publishers` gelesen werden? (403-Fehler beheben)
   - Verifikation: `curl /.sfs-bd/api/collections -H "Authorization: Bearer <TOKEN>"`

2. **Excel-Server-Upload reparieren**
   - Moment: Browser-Parse funktioniert, Server-Save ist deaktiviert
   - Ziel: Datei soll in `app/uploads/xlsx/` landen
   - Option A: Vite-Plugin mit `formidable` umschreiben
   - Option B: Backend-Endpoint (z.B. Node Express) für Upload

### P1 (WICHTIG)
3. **Import-History Collection anlegen**
   - Schema: `nw_import_history` (import_id, Dateiname, Zeilenzahl, Status, Timestamp)
   - Seed: Leer
   - Integration: Bei jedem erfolgreichen Import Log schreiben

4. **Berechtigungen im Admin durchsetzen**
   - UI: Löschen/Bearbeiten nur zeigen, wenn `allow_delete` oder `allow_update` in Registry
   - Backend: PocketBase-Regeln für authenticated users prüfen

5. **Dokumentation updaten**
   - README.md ins Repo-Root
   - Deployment-Guide schreiben (wie man LIVE synchronisiert)

### P2 (SPÄTER)
6. **Fehlerbehandlung robuster**
   - Netzwerkfehler abfangen
   - Retry-Logik für fehlgeschlagene Requests
   - User-freundliche Fehlermeldungen

7. **Performance optimieren**
   - Pagination für große Tabellen (>1000 Records)
   - Lazy-Loading bei Excel-Import
   - Bundle-Size reduzieren

---

## 🔐 Sicherheit & DEV/LIVE-Regeln

**Goldene Regeln (nicht verhandelt!):**
- ❌ LIVE-Datenbank NEVER direkt kontaktieren (nur via Deployment)
- ❌ Admin-Tokens NIE im Frontend speichern
- ❌ Collection-Schemas nicht aus dem Browser heraus ändern
- ✅ DEV arbeitet auf `/.sfs-bd/api`
- ✅ LIVE läuft auf `/.sfs-be/api` (readonly während dev)
- ✅ Schema wird von DEV nach LIVE kopiert bei Publish (Daten NOT!)

---

## 🤖 Für KI-Agenten: So nutzt ihr diesen Prompt

1. **Vollständiger Kontext:** Dieser Prompt enthält ALLES über das Projekt
2. **Bei neuen Tasks:** Kopiert diesen Prompt + beschreibt, was ihr bauen sollt
3. **Wenn es bricht:** Schaut in die „Kritische Fehler"-Tabelle, dann hier nach Lösung
4. **Git-History:** `git log --oneline -20` zeigt letzten Stand
5. **Bei Architektur-Fragen:** Schaut die ASCII-Grafik oben an

---

## 📞 Kontakt & Support

**Fragen zum Projekt?**
- Repository: `github.com/neuroways/excel_ai`
- Issues können direkt in GitHub geöffnet werden
- Standards liegen in `docs/standards/`

**Änderungen dokumentieren:**
- Neuer Standard? → `docs/standards/NW-<KURZNUMMER>_<Name>_v<VERSION>.md`
- Bug-Fix? → `git commit -m "fix: <Beschreibung>"`
- Feature? → `git commit -m "feat: <Beschreibung>"`
- Dokumentation? → `docs/` oder `prompts/`

---

**Prompt-Version:** 1.0.0  
**Letztes Update:** 2026-08-15 09:05 UTC  
**Status:** AKTIV & WARTBAR
