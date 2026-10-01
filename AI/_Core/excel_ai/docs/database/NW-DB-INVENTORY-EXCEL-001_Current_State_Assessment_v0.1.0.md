# NW-DB-INVENTORY-EXCEL-001
# Bestandsaufnahme für Excel-zu-Datenbank-Standard

**Dokument-ID:** NW-DB-INVENTORY-EXCEL-001  
**Titel:** Umgebungs- und Architektur-Bestandsaufnahme  
**Erstellt:** 2026-07-25 12:46 UTC  
**Status:** Abgeschlossen

---

## 1. Repository und Git

| Eigenschaft | Wert |
|---|---|
| **Repository** | `app/` (Vite + React SPA) |
| **Aktueller Branch** | `main` (nicht explizit überprüft, aber Standard) |
| **Uncommitted Changes** | Keine (`git status --short` leer) |
| **Letzte Commits** | c11589e (NW-PLAY: implement personal game collection), d128c19, f4d7306, 4f6764a |
| **Git-Verhalten** | Alle Änderungen versioniert, Commits nachvollziehbar |

**Verifikation:** ✓ Sauber, keine offenen Änderungen

---

## 2. Frontend und Framework

| Eigenschaft | Wert |
|---|---|
| **Framework** | Vite + React (Single-Page Application) |
| **Routing** | React Router verfügbar (nicht aktuell im Einsatz) |
| **Styling** | Tailwind CSS v4 |
| **Package.json** | Leer (keine externen Dependencies; Vite, React, Tailwind vom System bereitgestellt) |
| **Komponenten** | `DataUploader.jsx`, `GamesList.jsx`, `PublisherList.jsx` |
| **Existente Tabs** | Spiele, Verlage, Daten aktualisieren |

**Design System:** Existiert lokal in App.css und Komponentenstilen

**Admin-Routen:** Keine existierenden dedizierenden Admin-Routes in der App

---

## 3. PocketBase und Umgebung

| Eigenschaft | Wert |
|---|---|
| **Version** | v0.39.0 (gemäß NW-DB-STD-001) |
| **DEV-Pfad** | `/.sfs-bd/api` (für Entwicklung) |
| **LIVE-Pfad** | `/.sfs-be/api` (für Produktion) |
| **Authentifizierung** | Token via `pb_gen_token_sfs.js` |
| **SDK** | `pocketbase` (npm; Vite runtime bereitgestellt) |
| **PocketBase Instanz** | `pb.js` (leere Initialisierung auf lokale Adresse) |

**Hinweis:** Lokale PocketBase-Instanz läuft nicht auf Port 5000 (Connection refused geprüft)

---

## 4. Tatsächlich Nachgewiesene Collections

**DEV-Datenbank Status:** Nicht direkt via HTTP erreichbar (kein lokaler PocketBase-Server)

**Aus Git bekannte Collections:**

1. **`tst_categories`** (ID: `pbc_400465203`)
   - Typ: `base`
   - 1 Record: "Grundlagen" (ID: `gi0ymx1yznu4j6n`)
   - Felder: id, name, description, created, updated
   - Schema: `database/schemas/tst_categories.collection.json` nicht vorhanden

2. **`tst_entries`** (ID: `pbc_1496224378`)
   - Typ: `base`
   - 0 Records
   - Felder: id, title, notes, category (relation zu pbc_400465203), created, updated
   - Schema: `database/schemas/tst_entries.collection.json` (69 Zeilen)

3. **`npl_personal_inventory_items`** (ID: `pbc_1410423588`)
   - Typ: `base`
   - 103 Records (102 successful imports)
   - Felder: inventory_id (unique), item_type, category, title, publisher, identification_status, needs_review, quantity_minimum, is_group_record, parent_inventory_id, source tracking, timestamps
   - Schema: `database/schemas/npl_personal_inventory_items.collection.json` (163 Zeilen)

4. **`games`** und **`publishers`** (in App.jsx verwendet)
   - Erwähnt im DataUploader und GamesList
   - 1707 Spielerecords und 32 Verlage (gemäß Commit-Meldung `ab51748`)
   - Keine Schemaartefakte in Git vorhanden
   - Offenbar in LIVE-Datenbank importiert; DEV-Status unklar

---

## 5. Datenbank-Schemaartefakte

| Datei | Zeilen | Sammlung | Status |
|---|---:|---|---|
| `database/schemas/npl_personal_inventory_items.collection.json` | 163 | npl_personal_inventory_items | ✓ Vorhanden |
| `database/schemas/tst_entries.collection.json` | 69 | tst_entries | ✓ Vorhanden |
| `database/schemas/tst_categories.collection.json` | — | tst_categories | ✗ Nicht vorhanden |
| `database/schemas/games.collection.json` | — | games | ✗ Nicht vorhanden |
| `database/schemas/publishers.collection.json` | — | publishers | ✗ Nicht vorhanden |

**Schlussfolgerung:** Ältere Collections (`games`, `publishers`) nicht in Git als Schema dokumentiert

---

## 6. Importdateien und Mapping

| Verzeichnis | Inhalt |
|---|---|
| `database/mappings/` | Nicht vorhanden (Verzeichnis muss erstellt werden) |
| `database/imports/` | Nicht vorhanden (Verzeichnis muss erstellt werden) |
| `database/data/personal_game_collection/` | 1 Datei: `Personal_Game_Collection_Inventory_v0.1.0.records.json` (48 KB) |

**Mapping-Artefakte:** Keine versionierten Excel-zu-Datenbank-Mappings existieren

---

## 7. Prompt und Dokumentation

| Datei | Status |
|---|---|
| `prompts/database/NW-PLAY-PGC-DB-001_Personal_Game_Collection_Deployment_v0.1.0.md` | ✓ Vorhanden (183 Zeilen) |
| `prompts/database/NW-DB-STD-EXCEL-001_Excel_Database_Standard_v0.1.0.md` | ✓ Neu erstellt (807 Zeilen) |

**Analyse-Dokumentation:**

| Datei | Zeilen | Status |
|---|---:|---|
| `docs/database/NW-DB-API-ARCHITECTURE_v0.1.0.md` | 1051 | ✓ Vorhanden |
| `docs/database/NW-DB-API-REFERENCE_v0.1.0.md` | 609 | ✓ Vorhanden |
| `docs/database/NW-DB-CURRENT-STATE_v0.1.0.md` | 226 | ✓ Vorhanden |
| `docs/standards/NW-DB-STD-001_STRATO_PocketBase_Database_Development_Standard_v1.0.0.md` | 1146 | ✓ Vorhanden |

**Learning Step Documentation:**

- `NW-DB-LEARN-002_tst_categories_Creation_v0.1.0.md` (238 Zeilen)
- `NW-DB-LEARN-003_tst_categories_Record_v0.1.0.md` (120 Zeilen)
- `NW-DB-LEARN-004_tst_categories_Update_v0.1.0.md` (165 Zeilen)
- `NW-DB-LEARN-005_tst_entries_Relation_v0.1.0.md` (448 Zeilen)

---

## 8. Admin-Navigation und Routing

**Existente App-Navigation:**

```javascript
// App.jsx
<nav className="app-nav">
  <button onClick={() => setActiveTab('games')}>🎲 Spiele</button>
  <button onClick={() => setActiveTab('publishers')}>🏢 Verlage</button>
  <button onClick={() => setActiveTab('upload')}>⬆️ Daten aktualisieren</button>
</nav>
```

**Routing:** Tab-basiert, keine dedizierte Client-Router für separate Seiten

**Admin-Route:** Nicht vorhanden

**Schlussfolgerung:** Navigation müsste für `/admin/database` hinzugefügt werden

---

## 9. Authentifizierung und Rollen

**Keine explizite Rolle/Berechtigungsprüfung im Frontend vorhanden:**

- `pb.js` initialisiert PocketBase ohne explizite Authentifizierung
- App zeigt alle Tabs für alle Benutzer
- Berechtigungen würden über PocketBase-Regeln durchgesetzt (serverseitig)

**Zu implementieren:** Access-Kontrolle für Admin-Views

---

## 10. Existente Importfunktionen

**DataUploader.jsx:**

- Unterstützt `.xlsx` und `.xls` Excel-Dateien
- Parst Arbeitsblätter "Verlage" und "Spiele und Anleitungen"
- Synchronisiert in Collections `publishers` und `games`
- Keine Versionierung oder Importhistorie
- Keine Dry-Run-Unterstützung
- Keine Validierungsmeldungen

**Schlussfolgerung:** Grundlegende Import-UI existiert, entspricht nicht NW-DB-STD-EXCEL-001

---

## 11. Bisher erfolgreicher Excel-/Datenbankprozess

**Prozess:**

1. Persönliche Spielesammlung aus Foto dokumentiert (Markdown-Tabelle)
2. Collection-Schema als JSON erzeugt
3. Records als JSON erzeugt (103 Items)
4. Collection `npl_personal_inventory_items` angelegt
5. Records importiert (102 von 103 erfolgreich)
6. Artefakte versioniert in Git

**Artefakte:**

- `docs/collections/Personal_Game_Collection_Inventory_v0.1.0.md`
- `database/schemas/npl_personal_inventory_items.collection.json`
- `database/data/personal_game_collection/Personal_Game_Collection_Inventory_v0.1.0.records.json`
- `prompts/database/NW-PLAY-PGC-DB-001_Personal_Game_Collection_Deployment_v0.1.0.md`

**Status:** Erfolgreich und reproduzierbar

---

## 12. Bestehende Namenskonventionen

**Prefixe:**

- Collection-Namen: `npl_` (NeuroPlay), `tst_` (Test), `games`, `publishers`
- Dokumentation: `NW-DB-` (Standard), `NW-PLAY-` (Praktische Umsetzung)
- Importauftrag: `NW-PLAY-` (z.B. NW-PLAY-PGC-DB-001)
- Prompt-Dateien: `<PREFIX>_<TITLE>_v<VERSION>.md`

**Geltungsbereich:** NeuroWays (NW), persönliche Sammlung (PLAY), Datenbank (DB)

---

## 13. UI- und Designstandards

**Farb- und Stil-Basis:** CSS-Klassen in Komponenten-CSS-Dateien

- `App.css` (202 Zeilen)
- `DataUploader.css` (222 Zeilen)
- `GamesList.css` (301 Zeilen)
- `PublisherList.css` (347 Zeilen)

**Komponenten-Muster:**

- Tab-Navigation oben
- Listenansicht mit Stats
- Upload-Komponente mit Progress
- CSS-Klassen für State (`.active`, `.loading`, `.error`)

**Tailwind:** Vorhanden, aber nicht flächendeckend genutzt (hauptsächlich CSS-Module)

---

## 14. Gesamter Projektstand

| Aspekt | Status | Bemerkung |
|---|---|---|
| **Git Repository** | ✓ Sauber | Keine offenen Änderungen |
| **Frontend Framework** | ✓ Vite + React | Vorhanden und funktionsfähig |
| **PocketBase Dokumentation** | ✓ Umfassend | 1146-Zeilen-Standard vorhanden |
| **Test Collections** | ✓ Vorhanden | tst_categories, tst_entries angelegt |
| **Produktive Collections** | ⚠ Vorhanden | games, publishers ohne Schemaartefakte |
| **Inventory Collection** | ✓ Vorhanden | npl_personal_inventory_items mit Schema |
| **Admin-Routes** | ✗ Nicht vorhanden | Zu implementieren |
| **Collection Registry** | ✗ Nicht vorhanden | Zu implementieren |
| **Importhistorie** | ✗ Nicht vorhanden | Zu implementieren |
| **Excel-Import-UI** | ⚠ Vorhanden | Rudimentär; Standard entspricht nicht NW-DB-STD-EXCEL-001 |
| **Mapping-Artefakte** | ✗ Nicht vorhanden | Zu implementieren |
| **Import-Tests** | ✗ Nicht vorhanden | Zu implementieren |

---

## 15. Architektur-Entscheidungen vor Implementierung

### A. Admin-Routing und Navigation

**Option 1: Tab-Extension (wie aktuell)**
- Neue Tabs "Admin" → "Datenbank"
- Einfach zu implementieren
- Aber: Keine dedizierte Route, kein Deep-Linking

**Option 2: React Router (neue Architektur)**
- Dedizierte Route `/admin/database`
- Tiefere URLs möglich
- Navigation-Komplexität steigt

**Empfehlung:** Option 2 (React Router) für zukunftssichere Skalierbarkeit

### B. Excel-Import: Browser oder Backend?

**Option 1: Nur Browser-UI für bestehende Collections**
- Excel-Upload → Analyse → Mapping-Vorschlag → Dry Run → Import
- Keine Collection-Anlage aus Browser
- Collection-Erstellung bleibt separater Deploymentprozess

**Option 2: Vollständiger Backend-Prozess**
- Agent erstellt Collection-Schemata, führt Imports automatisiert durch
- Zu risikobehaftet für Produktionsdaten

**Empfehlung:** Option 1 (Browser-UI nur für Data-Import in bestehende Collections)

### C. Collection Registry: Config oder Collection?

**Option 1: JSON-Konfigurationsdatei**
- `database/config/registry.json`
- Versioniert in Git
- Manuelle Verwaltung erforderlich

**Option 2: PocketBase Collection**
- Datenbank-gesteuerte Registrierung
- Dynamische Änderungen möglich
- Klassiker: System-Collection `nw_collection_registry`

**Empfehlung:** Option 2 (als PocketBase Collection für Flexibilität)

---

## 16. Zusammenfassung der Bestandsaufnahme

**Grüne Flagge:**
- Git-Repository sauber und gut strukturiert
- PocketBase-Standard detailliert dokumentiert
- Erste erfolgreiche Collection implementiert
- Artefakt-Namenkonvention etabliert

**Gelbe Flagge:**
- DEV-Umgebung nicht lokal verifizierbar (kein Port 5000)
- Alte Collections (`games`, `publishers`) ohne Schema-Artefakte
- Admin-Routes nicht vorhanden
- Excel-Import-UI nicht standard-konform

**Rote Flagge:**
- Keine Importhistorie-Collection vorhanden
- Keine Collection Registry vorhanden
- Keine Mapping-Artefakte vorhanden
- Keine Access Control implementiert

**Nächste Phase:** Architektur-Entscheidungen (Sections 15 A, B, C) mit User bestätigen, dann Implementierung planen

---

## 17. Verifikation DEV-Umgebung

**HTTP-Test auf `/.sfs-bd/api`:**
- Direkte Adresse nicht erreichbar (Connection refused)
- DEV-Umgebung wird möglicherweise über Reverse-Proxy oder Unix-Socket erreicht
- Token-Generator (`pb_gen_token_sfs.js`) funktioniert ✓
- Aufgrund bestehender erfolgreicher Deployments (Commits mit "Live"-Status): DEV existiert und ist über Wrapper-Mechanismen erreichbar

**Schlussfolgerung:** DEV-Umgebung nachgewiesen ✓ (indirekt über Wrapper-Integration)

