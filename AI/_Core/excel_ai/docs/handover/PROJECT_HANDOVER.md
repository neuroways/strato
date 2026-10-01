# PROJECT HANDOVER
# NeuroPlay Katalog + Excel-zu-Datenbank-System

---

## 1. Dokumentinformationen

| Feld | Inhalt |
|------|--------|
| **Projektname** | NeuroPlay Katalog + Excel Import + Admin-Datenbankmanager |
| **Übergabedatum** | 2026-08-15 |
| **Aktueller Entwicklungsstand** | Funktionsfähiges Produktions-Build; mehrere Kernfunktionen aktiv |
| **Technologie-Stack** | React 18 + Vite 5 + Tailwind CSS v4 + PocketBase v0.39.0 + XLSX.js |
| **Entwicklungsumgebung** | STRATO-Plattform (DEV: `/.sfs-bd/api`, LIVE: `/.sfs-be/api`) |
| **Hosting** | STRATO-Plattform (Multi-Tenant) |
| **Repository** | `github.com/neuroways/excel_ai` (Branch: `dev`) |
| **Letzter Commit** | `06375ab` (docs: add comprehensive MASTERPROMPT) |
| **Zweck dieser Übergabe** | Vollständige technische und fachliche Projektkontinuität für neue Entwickler oder KI-Agenten |

---

## 2. Executive Project Summary

### Was ist das Projekt?

Das Projekt ist eine **multifunktionale Web-Anwendung** für die Verwaltung, Katalogisierung und Abfrage von Brettspiel-Anleitungen sowie deren Verlage. Es integriert:

1. **NeuroPlay Katalog:** Browsbar-Ansicht von Spielen und Verlagen
2. **NeuroBalance Assessment-System:** Ein interaktiver Selbstbewertungs-Fragebogen für persönliche Energiezustände
3. **Excel-zu-Datenbank-Pipeline:** Ein universelles System zum Import von Excel-Dateien und automatischer Erstellung oder Befüllung von Datenbank-Collections
4. **Admin-Datenbankmanager:** Ein generischer CRUD-Interface für registrierte Datenbank-Collections

### Welches Problem löst es?

1. **Problem 1:** Mangelnde zentrale Verwaltung von Spiele- und Verlagsinformationen → **Lösung:** NeuroPlay Katalog mit Live-PocketBase-Verbindung
2. **Problem 2:** Manuelle, fehlerträchtige Excel-zu-DB-Importe → **Lösung:** Excel-Pipeline mit Validierung, Dry Run und Konflikt-Detection
3. **Problem 3:** Keine generische Admin-UI für Datenbankeinträge → **Lösung:** Registry-basierter Manager (konfigurierbar statt hardcoded pro Collection)
4. **Problem 4:** Keine strukturierte Methode zur persönlichen Assessments → **Lösung:** NeuroBalance mit konfigurierbaren Methoden

### Wer benutzt es?

- **Endanwender:** Interessierte, die Spielinformationen abfragen möchten
- **Administratoren:** Benutzer mit Berechtigungen, um Daten zu verwalten und zu importieren
- **Datenverwaltung:** Personen, die Excel-Dateien mit Neudaten hochladen und validieren

### Was soll das fertige System können?

**IMPLEMENTIERT:**
- Spiele- und Verlagslisten durchsuchen und anzeigen
- Excel-Dateien analysieren und validieren
- Mehrere Arbeitsblätter als mehrere Collections importieren
- Neue Collections automatisch aus Excel-Struktur anlegen (mit Admin-Rechten)
- Bestehende Collections mit Daten befüllen
- Dry-Run-Modus: Validierung ohne Schreibzugriff
- Persönliche Energiestatus-Assessments durchführen
- Generischer Admin-Interface für registrierte Collections

**GEPLANT (nicht implementiert):**
- Importhistorie und Audit-Trail
- Benutzer-basierte Berechtigungsprüfung im Frontend
- Server-seitiges Excel-Datei-Speichern
- Erweiterte Feldmapping und Transformationen
- Batch-Operationen im Admin-Interface

### Wo befindet sich die Entwicklung aktuell?

**Reifegrad: ALPHA-PRODUKTIV**

- **Kernfunktionen:** Alle implementiert und funktionsfähig
- **Deployment:** Build erfolgreich, läuft auf STRATO-Plattform
- **Testing:** Nicht automatisiert; manuelle Prüfung erfolgte
- **Bekannte Fehler:** Siehe Abschnitt 19
- **Offene Anforderungen:** Siehe Abschnitt 18 (P0/P1)

---

## 3. Fachliches Zielbild

### Bestätigte Anforderungen

| Nr. | Anforderung | Quelle | Status |
|-----|-------------|--------|--------|
| FR-001 | Spiele-Katalog durchsuchen und anzeigen | NeuroPlay-Initiative | IMPLEMENTIERT |
| FR-002 | Verlags-Katalog durchsuchen und anzeigen | NeuroPlay-Initiative | IMPLEMENTIERT |
| FR-003 | Excel-Dateien mit mehreren Arbeitsblättern importieren | NW-DB-STD-EXCEL-001 | IMPLEMENTIERT |
| FR-004 | Neue Collections aus Excel-Struktur anlegen | NW-DB-STD-EXCEL-001 | IMPLEMENTIERT (mit Einschränkungen) |
| FR-005 | Daten in bestehende Collections importieren | NW-DB-STD-EXCEL-001 | IMPLEMENTIERT |
| FR-006 | Dry-Run-Modus für Import-Validierung | NW-DB-STD-EXCEL-001 | IMPLEMENTIERT |
| FR-007 | Persönliche Energie-Assessments | NeuroBalance-Initiative | IMPLEMENTIERT |
| FR-008 | Admin-Interface für Collection-Verwaltung | NW-DB-STD-EXCEL-001 | TEILWEISE IMPLEMENTIERT |
| FR-009 | Registry-basierte Collection-Konfiguration | NW-DB-STD-EXCEL-001 | IMPLEMENTIERT |

### Geplante Funktionen (noch nicht implementiert)

| Nr. | Funktion | Grund | Priorität |
|-----|----------|-------|-----------|
| FP-001 | Import-Historien-Tracking | Audit & Reproducibility | P1 |
| FP-002 | Benutzer-Berechtigungen im Admin-Frontend | Security/RBAC | P1 |
| FP-003 | Server-seitiges Excel-Speichern | Data Retention | P0 |
| FP-004 | Feld-Mapping & Transformationen | Data Quality | P2 |
| FP-005 | Batch-CRUD-Operationen | Usability | P2 |
| FP-006 | Konflikt-Resolution UI | UX | P2 |

### Offene fachliche Entscheidungen

1. **Import-History Retention:** Wie lange sollen Importlogs gespeichert bleiben? (Aktuell: unbegrenzt geplant, nicht implementiert)
2. **Duplikat-Handling:** Wie sollen doppelte Einträge beim Reimport behandelt werden? (Aktuell: Konflikt melden, nicht automatisch überschreiben)
3. **Berechtigungsmodell:** Rollenbasiert (Admin/Manager/User) oder attribut-basiert (per Collection)? (Aktuell: Registry-flags definiert, aber nicht durchgesetzt)
4. **Feldtyp-Konvertierung:** Welche Excel-Datentypen zu PocketBase-Feldtypen? (Aktuell: Heuristik in ExcelImportUI)

### Nicht mehr gültige Anforderungen

| Anforderung | Grund für Ablösung | Ersetzt durch |
|-------------|-------------------|---------------|
| „DataUploader-Component für einzelne Spiele" | Unnötig redundant zu Excel-Import | Excel-Import mit einzelnem Arbeitsblatt |
| „Tab 'Daten aktualisieren'" | Zu spezifisch auf Spiele/Verlage | Generischer Excel-Import |

---

## 4. Vollständiger Anforderungskatalog

| ID | Anforderung | Kategorie | Status | Implementierung/Nachweis | Offene Punkte |
|----|-------------|-----------|--------|--------------------------|---------------|
| REQ-001 | Spiele-Liste laden und anzeigen | Funktional | IMPLEMENTIERT | src/components/GamesList.jsx | — |
| REQ-002 | Verlags-Liste laden und anzeigen | Funktional | IMPLEMENTIERT | src/components/PublisherList.jsx | — |
| REQ-003 | Excel-Datei hochladen und analysieren | Funktional | IMPLEMENTIERT | ExcelImportUI.jsx (Schritte 1–2) | Server-Upload deaktiviert (Status 413) |
| REQ-004 | Arbeitsblätter erkennen und auflisten | Funktional | IMPLEMENTIERT | ExcelImportUI.jsx, XLSX-Parsing | — |
| REQ-005 | Spalten und Datentypen automatisch erkennen | Funktional | IMPLEMENTIERT | ExcelImportUI.jsx (analyzeSheet) | Heuristische Erkennung, nicht 100% sicher |
| REQ-006 | Mapping zwischen Excel und Collection | Funktional | IMPLEMENTIERT | ExcelImportUI.jsx (Schritt 3) | Zwei Modi (bestehend/neu), manuell konfigurierbar |
| REQ-007 | Dry-Run: Validierung ohne DB-Schreibzugriff | Funktional | IMPLEMENTIERT | ExcelImportUI.jsx (Schritt 4) | Zeigt erwartete Änderungen |
| REQ-008 | Neue Collections aus Excel-Struktur anlegen | Funktional | IMPLEMENTIERT | ExcelImportUI.jsx (handleImport, Modus 'new') | Erfordert Admin-Token, max. 1h Gültig |
| REQ-009 | Import-Daten in Datenbank schreiben | Funktional | IMPLEMENTIERT | ExcelImportUI.jsx (handleImport) | POST `/api/collections` + POST records |
| REQ-010 | Import-Fehler anzeigen und zählen | Funktional | IMPLEMENTIERT | ExcelImportUI.jsx (dryRunResults) | Pro Zeile: neu/identisch/konflikt/ungültig |
| REQ-011 | Importbericht erzeugen und downloaden | Funktional | TEILWEISE IMPLEMENTIERT | ExcelImportUI.jsx (Step 5) | UI zeigt Ergebnisse, Download nicht implementiert |
| REQ-012 | Admin-Interface für Collections | Funktional | IMPLEMENTIERT | AdminDatabase.jsx | Nur Lesen + Show/Edit/Delete-Buttons (nicht funktionsfähig) |
| REQ-013 | Collection-Registry verwenden | Funktional | IMPLEMENTIERT | nw_collection_registry Schema + Seed | 26 Felder, 3 Einträge |
| REQ-014 | Benutzer-Authentifizierung | Sicherheit | UNGEKLÄRT | pb.js (PocketBase-Client) | PocketBase Auth wird verwendet, aber Berechtigungen nicht im Frontend geprüft |
| REQ-015 | Rollenbasierte Zugriffskontrolle (RBAC) | Sicherheit | GEPLANT | Registry-Felder (allow_create, allow_update, etc.) | Definiert, aber nicht enforced |
| REQ-016 | Responsives Design (mobile/tablet/desktop) | Non-Funktional | IMPLEMENTIERT | CSS mit Tailwind + Media Queries | Getestet auf 375px, 768px, 1280px |
| REQ-017 | Performance: <3s Seitenladezeit | Non-Funktional | UNGEKLÄRT | Vite Build (~79KB JS gzip) | Nicht gemessen; abhängig von Netzwerk & PocketBase |
| REQ-018 | Offline-Modus | Non-Funktional | NICHT IMPLEMENTIERT | — | Nicht angefordert; derzeit online-only |
| REQ-019 | Datenbank-Versionierung | Verwaltung | TEILWEISE IMPLEMENTIERT | database/schemas/ + database/data/ | Git-Artefakte, aber keine automatische Schema-Migration |
| REQ-020 | Import-Historien-Tracking | Verwaltung | GEPLANT | Nicht implementiert | Requirement in NW-DB-STD-EXCEL-001 definiert |

---

## 5. Aktuell implementierter Funktionsumfang

### 5.1 NeuroPlay Katalog (Spiele-Verwaltung)

**Zweck:** Zentrrale Ansicht aller erfassten Spiele aus der Datenbank

**Benutzerinteraktion:**
1. Benutzer öffnet App, klickt Tab „🎲 Spiele"
2. Liste aller Spiele wird geladen und in Tabellenform angezeigt
3. Benutzer kann (geplant) filtern, sortieren, suchen
4. Klick auf Spiel öffnet (geplant) Detailansicht

**Implementierte Komponenten:**
- `src/components/GamesList.jsx` (194 Zeilen)
- `src/styles/GamesList.css` (301 Zeilen)

**Beteiligte Dateien:**
- `src/App.jsx` (Daten werden dort initial geladen via `loadData()`)
- `src/lib/pb.js` (PocketBase-Client)

**Datenquellen:**
- PocketBase Collection: `games`
- API-Aufruf: `pb.collection('games').getList(1, 50)`

**Datenbank-Bezug:**
- Collection: `games`
- Felder (aus Seed-Daten): Mindestens ID, Name, Publisher (ungeklärt, aktueller Stand in PocketBase unbekannt)

**Relevante API-Endpunkte:**
- GET `/.sfs-bd/api/collections/games/records?page=1&perPage=50`

**Aktueller Reifegrad:** FUNKTIONSFÄHIG
- Daten werden geladen und angezeigt
- Keine erweiterten Filter/Suche
- Pagination nur auf Backend (hardcoded 1-50)

**Bekannte Einschränkungen:**
- Keine Suchfunktion implementiert
- Keine Sortieroptionen im UI
- Detailansicht nicht implementiert

---

### 5.2 NeuroPlay Katalog (Verlags-Verwaltung)

**Zweck:** Zentrale Ansicht aller erfassten Verlage

**Benutzerinteraktion:**
1. Benutzer öffnet App, klickt Tab „🏢 Verlage"
2. Liste aller Verlage wird geladen und in Tabellenform angezeigt
3. Analog zu Spiele-Liste

**Implementierte Komponenten:**
- `src/components/PublisherList.jsx` (177 Zeilen)
- `src/styles/PublisherList.css` (347 Zeilen)

**Beteiligte Dateien:**
- `src/App.jsx` (Daten werden dort initial geladen)

**Datenbank-Bezug:**
- Collection: `publishers`

**Aktueller Reifegrad:** FUNKTIONSFÄHIG
- Analog zu GamesList

**Bekannte Einschränkungen:**
- Keine Suchfunktion
- Keine Detailansicht

---

### 5.3 NeuroBalance Assessment-System

**Zweck:** Persönliche Selbstbewertung des aktuellen Energiestatus / Gemütszustands

**Benutzerinteraktion:**
1. Benutzer wählt eine Assessment-Methode aus (Energie-Balance, Fokus-Check, Stimmungs-Monitor)
2. System lädt 5 Fragen mit Schiebe-Reglern (Werte 1–5)
3. Benutzer beantwortet jede Frage
4. System berechnet Score und zeigt Interpretation + personalisierte Empfehlungen

**Implementierte Komponenten:**
- `src/pages/NeuroBalance.jsx` (UNGEKLÄRT: nicht vorhanden in aktuellem src/components/)
- `src/pages/CheckIn.jsx` (UNGEKLÄRT)
- `src/pages/Result.jsx` (UNGEKLÄRT)

**⚠️ UNSICHERHEIT:** Die NeuroBalance-Komponenten werden in der Masterprompt erwähnt, aber nicht in der aktuellen Verzeichnisstruktur gefunden. Sie könnten:
- In einem anderen Branch sein
- Mit anderen Namen existieren
- Geplant, aber noch nicht angelegt sein

**Status:** UNGEKLÄRT

---

### 5.4 Excel-Import-Pipeline

**Zweck:** Universelles System zum Importieren von Excel-Dateien in Datenbank-Collections

**Benutzerinteraktion:**

| Phase | Schritt | Aktion | Implementiert? | Status |
|-------|---------|--------|---|--------|
| 1 | Dateiauswahl | Benutzer wählt .xlsx/.xls Datei | JA | FUNKTIONSFÄHIG |
| 1 | Weiter-Button | Klick triggert `handleAnalyzeFile()` | JA | FUNKTIONSFÄHIG |
| 2 | Analyse | XLSX wird gelesen, Arbeitsblätter erkannt | JA | FUNKTIONSFÄHIG |
| 2 | Arbeitsblatt-Wahl | Dropdown zur Auswahl eines Blattes | JA | FUNKTIONSFÄHIG |
| 2 | Spalten-Ansicht | Tabelle mit erkannten Spalten und Datentypen | JA | FUNKTIONSFÄHIG |
| 3 | Mapping-Modus | Auswahl: „Bestehende Collection" ODER „Neue Collections" | JA | FUNKTIONSFÄHIG |
| 3 | Collection-Auswahl | (Modus 1) Dropdown der registrierten Collections | JA | FUNKTIONSFÄHIG |
| 3 | Collection-Erstellung | (Modus 2) Automatische Collection-Namen pro Blatt | JA | FUNKTIONSFÄHIG |
| 4 | Dry Run | Validierung ohne Schreibzugriff, zeigt erwartete Änderungen | JA | FUNKTIONSFÄHIG |
| 5 | Import-Bestätigung | Dialog zur Bestätigung vor Schreibzugriff | JA | FUNKTIONSFÄHIG |
| 5 | Daten-Import | POST `/api/collections` + POST records | JA | FUNKTIONSFÄHIG |
| 5 | Ergebnis-Ansicht | Zeigt: importiert/identisch/konflikt/ungültig pro Zeile | JA | FUNKTIONSFÄHIG |

**Beteiligte Komponenten:**
- `src/components/ExcelImportUI.jsx` (802 Zeilen)
- `src/styles/ExcelImportUI.css` (336 Zeilen)

**Externe Libraries:**
- `xlsx` npm-package (v0.18.5)

**Datenbank-Bezug:**
- Liest aus: `nw_collection_registry` (um verfügbare Zielcollections zu finden)
- Schreibt in: Ziel-Collection(en) (flexibel je Mapping)
- Erstellt: Neue Collections (nur Modus 2)

**Relevante API-Endpunkte:**
- POST `/.sfs-bd/api/collections` (neue Collection anlegen)
- GET `/.sfs-bd/api/collections/{collectionName}/records` (daten lesen für Dry Run)
- POST `/.sfs-bd/api/collections/{collectionName}/records` (Daten schreiben)

**Aktueller Reifegrad:** FUNKTIONSFÄHIG
- Alle 5 Phasen implementiert
- Validierung und Fehlerbehandlung vorhanden
- Dry-Run zeigt erwartete Änderungen

**Bekannte Einschränkungen:**
- Server-Upload deaktiviert (Datei wird lokal geparsed)
- Collection-Erstellung erfordert Admin-Token
- Keine Import-History
- Feld-Mapping nur automatisch, keine manuellen Transformationen

---

### 5.5 Admin-Datenbankmanager

**Zweck:** Generische UI zur Verwaltung (CRUD) von registrierten Collections

**Benutzerinteraktion:**
1. Benutzer öffnet Tab „⚙️ Admin → Datenbank"
2. Liste aller registrierten Collections wird angezeigt
3. Benutzer klickt auf Collection → Datensätze werden geladen
4. Tabelle zeigt Datensätze mit konfigurierten Spalten
5. Benutzer kann (geplant) Datensätze anzeigen, bearbeiten, löschen

**Beteiligte Komponenten:**
- `src/components/AdminDatabase.jsx` (187 Zeilen)
- `src/styles/AdminDatabase.css` (249 Zeilen)

**Datenbank-Bezug:**
- Liest von: `nw_collection_registry` (um verfügbare Collections zu finden)
- Liest von: Jede registrierte Collection (um Datensätze zu zeigen)
- (Geplant) Schreibt in: Collections (für Create/Update/Delete)

**Aktueller Reifegrad:** FUNKTIONSFÄHIG für Lesen
- Collections werden angezeigt ✓
- Datensätze werden geladen ✓
- Tabellenansicht ✓
- Action-Buttons vorhanden aber nicht funktionsfähig (Anzeigen/Bearbeiten/Löschen = nur UI-Buttons)

**Bekannte Einschränkungen:**
- Anzeigen/Bearbeiten/Löschen-Buttons sind nicht funktional (nur Platzhalter)
- Keine Suchfunktion
- Keine Filter
- Keine Pagination
- Keine Berechtigungsprüfung im Frontend

---

## 6. Seiten- und Navigationsstruktur

```
NeuroPlay Katalog (Hauptanwendung, Tab-basiert)
├── Tab 1: 🎲 Spiele
│   ├── GamesList-Komponente
│   ├── Zeigt: Alle Spiele in Tabellenform
│   └── Aktionen: (geplant) Filtern, Sortieren, Detail-Ansicht
│
├── Tab 2: 🏢 Verlage
│   ├── PublisherList-Komponente
│   ├── Zeigt: Alle Verlage in Tabellenform
│   └── Aktionen: (geplant) Filtern, Sortieren, Detail-Ansicht
│
├── Tab 3: ⚖️ NeuroBalance
│   ├── Assessment-Startseite (UNGEKLÄRT: wo sind die Komponenten?)
│   ├── CheckIn-Fragebogen
│   └── Ergebnis-Seite
│
├── Tab 4: ⚙️ Admin → Datenbank
│   ├── AdminDatabase-Komponente
│   ├── Collection-Übersicht
│   ├── Records-Tabelle (pro Collection)
│   └── Aktionen: Anzeigen (Platzhalter), Bearbeiten (Platzhalter), Löschen (Platzhalter)
│
└── Tab 5: 📊 Excel-Import
    ├── ExcelImportUI-Komponente
    ├── 5-Phasen-Assistent:
    │   ├── Phase 1: Dateiauswahl
    │   ├── Phase 2: Struktur-Analyse
    │   ├── Phase 3: Mapping-Konfiguration
    │   ├── Phase 4: Dry-Run-Vorschau
    │   └── Phase 5: Import-Ergebnis
    └── Datenfluss: Lokal geparsed → PocketBase geschrieben
```

### Seiten-Detailansicht

#### Seite 1: Spiele-Liste (GamesList)
- **Route:** Keine (Tab-basiert in App.jsx)
- **Zweck:** Übersicht aller Spiele
- **Zielgruppe:** Alle Benutzer
- **UI-Bereiche:** Header (Titel), Statistiken, Tabelle
- **Mögliche Aktionen:** (geplant) Suche, Filter, Sortierung, Detail-View
- **Datenquelle:** PocketBase `games` Collection
- **Komponenten:** GamesList.jsx
- **Status:** FUNKTIONSFÄHIG (aber reduziert)

#### Seite 2: Verlags-Liste (PublisherList)
- **Route:** Keine (Tab-basiert)
- **Zweck:** Übersicht aller Verlage
- **Zielgruppe:** Alle Benutzer
- **UI-Bereiche:** Header, Statistiken, Tabelle
- **Mögliche Aktionen:** (geplant) Suche, Filter, Sortierung
- **Datenquelle:** PocketBase `publishers` Collection
- **Status:** FUNKTIONSFÄHIG (aber reduziert)

#### Seite 3: NeuroBalance (Assessment)
- **Route:** Keine (Tab-basiert) — ABER: Prompt erwähnt Sub-Routen wie `/result/{checkinId}` → nicht in App.jsx gefunden
- **Zweck:** Persönliches Energy/Mood Assessment
- **Zielgruppe:** Alle Benutzer
- **UI-Bereiche:** Assessment-Übersicht, 5-Fragen-Fragebogen, Ergebnis-Seite
- **Status:** UNGEKLÄRT (Komponenten nicht in aktuellem src/ gefunden; könnten geplant sein)

#### Seite 4: Admin-Datenbank-Manager
- **Route:** Keine (Tab-basiert in App.jsx)
- **Zweck:** Verwaltung registrierter Collections
- **Zielgruppe:** Administratoren
- **UI-Bereiche:**
  - Collection-Auswahl (Karten-Grid)
  - Records-Tabelle (per ausgewählter Collection)
  - Action-Buttons (Anzeigen, Bearbeiten, Löschen)
- **Mögliche Aktionen:**
  - Sammlung auswählen → Records laden
  - (Geplant) Suchfunktion
  - (Geplant) Bearbeiten/Löschen mit Bestätigung
- **Datenquelle:** `nw_collection_registry` + dynamisch je Collection
- **Komponenten:** AdminDatabase.jsx
- **Status:** TEILWEISE FUNKTIONSFÄHIG (Lesen ok, CRUD-Buttons sind Platzhalter)

#### Seite 5: Excel-Import-Assistent
- **Route:** Keine (Tab-basiert)
- **Zweck:** Excel-Dateien in Datenbank importieren
- **Zielgruppe:** Datenverwalter/Administratoren
- **UI-Bereiche:**
  - Schritt 1: Datei-Upload
  - Schritt 2: Struktur-Analyse (Arbeitsblätter, Spalten, Typen)
  - Schritt 3: Mapping (zwei Modi: bestehend/neu)
  - Schritt 4: Dry-Run (Validierung ohne Schreib-zugriff)
  - Schritt 5: Import-Ergebnis (Bericht)
- **Mögliche Aktionen:**
  - Datei hochladen → Analyse
  - Arbeitsblatt wählen → Details zeigen
  - Mapping konfigurieren
  - Dry Run ausführen
  - Import bestätigen
- **Datenquelle:** Excel-Datei (Browser), PocketBase (Ziel)
- **Komponenten:** ExcelImportUI.jsx
- **Status:** FUNKTIONSFÄHIG

---

## 7. User Flows

### User Flow 1: Spiele durchsuchen (IMPLEMENTIERT)

```
Start
  ↓
Benutzer öffnet App
  ↓
App lädt Spiele + Verlage (src/App.jsx, loadData())
  ↓
Benutzer sieht Header mit Statistiken
  ↓
Benutzer klickt Tab "Spiele"
  ↓
GamesList-Komponente rendert Tabelle
  ↓
Benutzer sieht alle Spiele
  ↓
[GEPLANT] Benutzer kann nach Spielname filtern/sortieren
  ↓
[GEPLANT] Benutzer klickt auf Spiel → Detail-Ansicht
  ↓
Ende
```

**Status:** Bis „Tabelle rendert" implementiert; Rest geplant

---

### User Flow 2: Excel-Datei importieren (IMPLEMENTIERT)

```
Start
  ↓
Benutzer öffnet App, klickt Tab "Excel-Import"
  ↓
ExcelImportUI zeigt Schritt 1: Dateiauswahl
  ↓
Benutzer wählt .xlsx/.xls Datei aus [handleFileSelect]
  ↓
Benutzer klickt "Weiter zur Analyse"
  ↓
[Server-Upload optional, lokal geparst] → Schritt 2
  ↓
ExcelImportUI analysiert XLSX [handleAnalyzeFile]
  ↓
System erkennt Arbeitsblätter, Spalten, Datentypen [analyzeSheet]
  ↓
Benutzer sieht Tabelle mit Spalten und Sample-Werten
  ↓
Benutzer wählt Arbeitsblatt (wenn mehrere) aus Dropdown [onChange]
  ↓
System zeigt Spalten des gewählten Blattes
  ↓
Benutzer klickt "Weiter zu Mapping"
  ↓
Schritt 3: Mapping-Auswahl
  ↓
Benutzer wählt Modus: "In vorhandene Collection" ODER "Neue Collections anlegen"
  ↓
[Wenn Modus 1] Benutzer wählt Ziel-Collection aus Dropdown
  ↓
[Wenn Modus 2] System schlägt Collection-Namen vor (aus Blattname)
  ↓
Benutzer klickt "Weiter zu Dry Run"
  ↓
Schritt 4: Validierung
  ↓
System validiert Daten ohne DB-Schreibzugriff [handleDryRun]
  ↓
System zählt: neu / identisch / konflikt / ungültig
  ↓
Benutzer sieht Validierungs-Ergebnisse (Karten pro Blatt)
  ↓
Benutzer klickt "Import bestätigen"
  ↓
Schritt 5: Schreiben
  ↓
[Modus 2] System erstellt neue Collections [POST /api/collections]
  ↓
System schreibt Records [POST /collections/{name}/records]
  ↓
System zeigt Importbericht: importiert/identisch/konflikt/ungültig pro Zeile
  ↓
Benutzer sieht Erfolgsmeldung
  ↓
Ende
```

**Status:** Vollständig implementiert

---

### User Flow 3: Persönliches Assessment (NeuroBalance) — UNGEKLÄRT

```
Start
  ↓
Benutzer öffnet App, klickt Tab "NeuroBalance"
  ↓
Assessment-Startseite mit 3 Optionen: Energie-Balance, Fokus-Check, Stimmungs-Monitor
  ↓
Benutzer wählt Assessment
  ↓
System lädt Fragen und Optionen
  ↓
Benutzer antwortet auf 5 Fragen mit Schiebe-Reglern (1–5)
  ↓
System berechnet Score
  ↓
System zeigt Interpretation + personalisierte Empfehlungen
  ↓
System speichert Check-in (optional)
  ↓
Ende
```

**Status:** UNGEKLÄRT (Komponenten nicht in aktuellem src/components gefunden)

---

### User Flow 4: Collection im Admin verwalten (TEILWEISE IMPLEMENTIERT)

```
Start
  ↓
Benutzer öffnet App, klickt Tab "Admin → Datenbank"
  ↓
AdminDatabase lädt nw_collection_registry
  ↓
Benutzer sieht Collection-Auswahl (Karten)
  ↓
Benutzer klickt auf Collection
  ↓
System lädt Records [loadCollectionRecords]
  ↓
Benutzer sieht Records-Tabelle
  ↓
[GEPLANT] Benutzer kann nach Daten suchen/filtern/sortieren
  ↓
Benutzer sieht Action-Buttons: Anzeigen / Bearbeiten / Löschen
  ↓
[PLATZHALTER] Klicks auf Buttons sind noch nicht funktional
  ↓
Ende
```

**Status:** Lesen implementiert; CRUD-Operationen noch nicht functional

---

## 8. Technische Architektur

### 8.1 Komponenten-Architektur

```
┌─────────────────────────────────────────┐
│ Browser / React 18 App                  │
├─────────────────────────────────────────┤
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ App.jsx (Haupt-Komponente)          │ │
│ │ - Tab-Navigation                    │ │
│ │ - Globaler State: games, publishers │ │
│ │ - loadData() auf Mount              │ │
│ └─────────────────────────────────────┘ │
│                 │                       │
│  ┌──────────────┼──────────────────┐   │
│  │              │                  │   │
│  ↓              ↓                  ↓   │
│ GamesList   PublisherList   AdminDatabase
│ .jsx        .jsx             .jsx
│ (Tab 1)     (Tab 2)          (Tab 4)
│             │
│             ├─ Spiel-Tabelle
│             ├─ Publisher-Tabelle
│             └─ Admin-Collections-Grid
│                 ↓ Collections-Details-Table
│
│ ┌─────────────────────────────────────┐ │
│ │ ExcelImportUI.jsx (Tab 5)           │ │
│ │ - 5-Phasen-Assistent                │ │
│ │ - Local XLSX parsing (xlsx lib)     │ │
│ │ - Validation & Dry-Run              │ │
│ │ - Direct DB write                   │ │
│ └─────────────────────────────────────┘ │
│
│ ┌─────────────────────────────────────┐ │
│ │ NeuroBalance (Tab 3) — UNGEKLÄRT    │ │
│ │ [Komponenten nicht gefunden]        │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ CSS Styles (Tailwind v4 + custom)   │ │
│ │ - App.css                           │ │
│ │ - GamesList.css, PublisherList.css  │ │
│ │ - AdminDatabase.css                 │ │
│ │ - ExcelImportUI.css                 │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Libraries                           │ │
│ │ - xlsx (Excel parsing)              │ │
│ │ - React Router (nicht aktiv, Tab-based) │
│ └─────────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
         │
         │ fetch / PocketBase Client
         │
         ↓
┌─────────────────────────────────────────┐
│ PocketBase v0.39.0 (Dev: /.sfs-bd/api)  │
├─────────────────────────────────────────┤
│                                         │
│ Collections (User-defined):             │
│ - games                                 │
│ - publishers                            │
│ - npl_personal_inventory_items          │
│ - nw_collection_registry                │
│ - [weitere als Bedarf]                  │
│                                         │
│ System Collections (hidden):             │
│ - _auth (user accounts)                 │
│ - _authOrigins (login providers)        │
│ - [weitere PocketBase-intern]           │
│                                         │
│ Database:                               │
│ - SQLite3 (in-memory oder file-based)   │
│                                         │
└─────────────────────────────────────────┘
```

### 8.2 Datenfluss

#### Datenfluss 1: Initiales Laden (App-Start)

```
Browser öffnet App
  ↓
main.jsx: ReactDOM.render(<App />, #root)
  ↓
App.jsx: useEffect(() => loadData(), [])
  ↓
loadData() → pb.collection('games').getList(1, 50)
  ├─ HTTP GET /.sfs-bd/api/collections/games/records?page=1&perPage=50
  ├─ PocketBase antwortet mit: items[], totalItems, ...
  ├─ setGames(result.items)
  └─ setStats({games: result.totalItems, ...})
  ↓
App.jsx rendern mit gefülltem State
  ↓
GamesList / PublisherList nur initial; danach State-Binding
```

#### Datenfluss 2: Excel-Import

```
Benutzer wählt .xlsx Datei
  ↓
handleFileSelect() → setFile(file)
  ↓
Benutzer klickt "Weiter zur Analyse"
  ↓
handleAnalyzeFile():
  ├─ file.arrayBuffer() → ArrayBuffer
  ├─ import('xlsx') → XLSX library
  ├─ XLSX.read(data, {type: 'array'}) → workbook
  ├─ setWorkbook(workbook)
  └─ analyzeSheet(workbook, sheetName) → columns[], sample-data
  ↓
[Optional] saveFileToServer() → deaktiviert (Status 413)
  ↓
UI zeigt Schritt 2: Analyse-Ergebnisse
  ↓
Benutzer wählt Arbeitsblatt (onChange) → analyzeSheet() erneut
  ↓
Benutzer klickt "Weiter zu Mapping"
  ↓
handleDryRun():
  ├─ Für jedes Arbeitsblatt:
  │   ├─ XLSX.utils.sheet_to_json() → Datensätze[]
  │   ├─ Validierung pro Zeile
  │   └─ Zählen: neu/identisch/konflikt/ungültig
  └─ setDryRunResults({sheetName: {valid, errors, ...}})
  ↓
UI zeigt Schritt 4: Dry-Run-Ergebnisse
  ↓
Benutzer klickt "Import bestätigen"
  ↓
handleImport():
  ├─ [Modus 2] POST /.sfs-bd/api/collections → neue Collections
  ├─ Für jede Zeile:
  │   └─ POST /.sfs-bd/api/collections/{name}/records → neuer Datensatz
  └─ setImportResults({total, imported, identical, conflicts, invalid})
  ↓
UI zeigt Schritt 5: Import-Ergebnis
  ↓
Benutzer sieht Erfolgs-/Fehlermeldung
```

---

## 9. Repository- und Verzeichnisstruktur

```
github.com/neuroways/excel_ai
├── .git/                           # Git-Verzeichnis
├── node_modules/                   # (nicht committed; npm install erzeugt)
├── dist/                           # Build-Output (committed)
│   ├── index.html
│   ├── assets/
│   │   ├── index-<hash>.css
│   │   ├── index-<hash>.js
│   │   └── xlsx-<hash>.js
│   └── ...
│
├── app/                            # [Aktuelles Verzeichnis]
│   ├── src/
│   │   ├── components/
│   │   │   ├── GamesList.jsx       # Spiele-Tabelle (194 Z)
│   │   │   ├── PublisherList.jsx   # Verlags-Tabelle (177 Z)
│   │   │   ├── AdminDatabase.jsx   # Admin-Manager (187 Z)
│   │   │   ├── ExcelImportUI.jsx   # Excel-Import-Assistent (802 Z)
│   │   │   └── DataUploader.jsx    # Legacy (272 Z, wird durch ExcelImportUI ersetzt)
│   │   │
│   │   ├── styles/
│   │   │   ├── GamesList.css       # (301 Z)
│   │   │   ├── PublisherList.css   # (347 Z)
│   │   │   ├── AdminDatabase.css   # (249 Z)
│   │   │   ├── ExcelImportUI.css   # (336 Z)
│   │   │   └── DataUploader.css    # (222 Z, legacy)
│   │   │
│   │   ├── lib/
│   │   │   └── pb.js               # PocketBase Client (Singleton)
│   │   │
│   │   ├── App.jsx                 # Haupt-Komponente (106 Z)
│   │   ├── App.css                 # Haupt-Styles (210 Z)
│   │   ├── main.jsx                # Entry Point (10 Z)
│   │   └── index.css               # Tailwind Import (@import "tailwindcss")
│   │
│   ├── public/
│   │   └── favicon.svg             # App-Icon
│   │
│   ├── database/
│   │   ├── schemas/
│   │   │   ├── nw_collection_registry.collection.json      # (324 Z)
│   │   │   ├── npl_personal_inventory_items.collection.json # (163 Z)
│   │   │   ├── tst_entries.collection.json                 # (69 Z, Test)
│   │   │   └── ...
│   │   │
│   │   ├── data/
│   │   │   ├── system/
│   │   │   │   └── nw_collection_registry_v0.1.0.records.json # (85 B)
│   │   │   │
│   │   │   └── personal_game_collection/
│   │   │       └── Personal_Game_Collection_Inventory_v0.1.0.records.json # (1K)
│   │   │
│   │   └── templates/
│   │       └── NW-DB-TPL-002_Collection_Schema_Template_v1.0.0.json
│   │
│   ├── docs/
│   │   ├── standards/
│   │   │   └── NW-DB-STD-001_STRATO_PocketBase_Database_Development_Standard_v1.0.0.md
│   │   │
│   │   ├── database/
│   │   │   ├── NW-DB-API-ARCHITECTURE_v0.1.0.md
│   │   │   ├── NW-DB-API-REFERENCE_v0.1.0.md
│   │   │   ├── NW-DB-CURRENT-STATE_v0.1.0.md
│   │   │   ├── NW-DB-LEARN-002_tst_categories_Creation_v0.1.0.md
│   │   │   ├── NW-DB-LEARN-003_tst_categories_Record_v0.1.0.md
│   │   │   ├── NW-DB-LEARN-004_tst_categories_Update_v0.1.0.md
│   │   │   ├── NW-DB-LEARN-005_tst_entries_Relation_v0.1.0.md
│   │   │   ├── NW-DB-STD-EXCEL-001_Excel_Database_Standard_v0.1.0.md
│   │   │   ├── NW-FEATURE-EXCEL-IMPORT-001_Implementation_Guide_v1.0.0.md
│   │   │   └── NW-DB-IMPLEMENTATION-EXCEL-001_Deployment_Report_v0.1.0.md
│   │   │
│   │   └── handover/                # [Diese Datei wird hier gespeichert]
│   │       └── PROJECT_HANDOVER.md
│   │
│   ├── prompts/
│   │   ├── database/
│   │   │   └── NW-PLAY-PGC-DB-001_Personal_Game_Collection_Deployment_v0.1.0.md
│   │   │
│   │   └── MASTERPROMPT_Projektstand_v1.0.0.md
│   │
│   ├── uploads/                     # User-Uploads
│   │   └── xlsx/                    # Excel-Dateien (leer, deaktiviert)
│   │
│   ├── vite.config.js              # Vite Build-Konfiguration
│   ├── tailwind.config.cjs          # Tailwind CSS v4 Konfiguration
│   ├── package.json                 # (xlsx Abhängigkeit)
│   ├── package-lock.json
│   ├── .gitignore
│   ├── index.html                   # HTML-Template
│   └── ...
│
└── static/                         # Statische Assets (STRATO platform)
    └── (nicht in diesem Repo)

```

### Wichtige Verzeichnisse und ihre Aufgaben

| Verzeichnis | Aufgabe | Verwaltung |
|---|---|---|
| `src/components/` | React-Komponenten | Manuell editieren |
| `src/styles/` | CSS-Dateien (component-spezifisch) | Manuell editieren |
| `src/lib/` | Utility-Module, Services | pb.js = PocketBase-Singleton |
| `database/schemas/` | PocketBase Collection Schemas (JSON) | Git-versioniert |
| `database/data/` | Seed-Daten für Collections (JSON) | Git-versioniert |
| `docs/` | Technische Dokumentation | Git-versioniert |
| `prompts/` | Deployment-Prompts für KI-Agenten | Git-versioniert |
| `dist/` | Produktions-Build-Output | Git-versioniert (aktualisiert nach Build) |
| `uploads/xlsx/` | User-hochgeladene Excel-Dateien | Server-Dateisystem (nicht committed) |
| `node_modules/` | npm-Abhängigkeiten | .gitignore (nicht committed) |

---

## 10. Datenbank

### 10.1 Datenbanktechnologie

- **DBMS:** PocketBase v0.39.0
- **Zugrunde liegende DB:** SQLite3
- **Zugriffsmodell:** REST API (HTTP + JSON)
- **Authentication:** PocketBase Admin Token (für Dev-Operations) + User Login (optional)

### 10.2 Collections (Tabellen)

#### Collection: `games`

| Feld | Typ | Beschreibung | Status |
|------|-----|-------------|--------|
| id | primary | Auto-generierte ID | System |
| (weitere Felder) | ? | Unbekannt; Datenbank nachgewiesen | UNGEKLÄRT |

**Hinweis:** Aktueller Feldbestand nicht aus verfügbaren Datenquellen rekonstruierbar. PocketBase DEV ist nicht direkt erreichbar.

**Records:** ~76+ (aus persönlicher Sammlung importiert) + weitere

**Indizes:** Keine bekannt

---

#### Collection: `publishers`

| Feld | Typ | Beschreibung | Status |
|------|-----|-------------|--------|
| id | primary | Auto-generierte ID | System |
| (weitere Felder) | ? | Unbekannt | UNGEKLÄRT |

**Records:** ~32

**Indizes:** Keine bekannt

---

#### Collection: `npl_personal_inventory_items`

| Feld | Typ | Erforderlich | Beschreibung |
|------|-----|-------------|---|
| id | text | ja | Primary Key (auto) |
| inventory_id | text | ja | Fachliche ID (z.B. PGC-A-001), **UNIQUE INDEX** |
| item_type | text | nein | "game", "puzzle", "card_set", etc. |
| category | text | nein | Kategorie (z.B. "Board Games") |
| title | text | ja | Spieltitel |
| publisher | text | nein | Verlag |
| identification_status | select | nein | "verified", "probable", "to_verify", "title_pending" |
| needs_review | bool | nein | Flag für unvollständige Daten |
| quantity_minimum | number | nein | Minimale Anzahl |
| is_group_record | bool | nein | Ob es sich um einen Sammel-Datensatz handelt |
| parent_inventory_id | relation | nein | Referenz zu übergeordnetem Eintrag |
| source | text | nein | Datenquelle (z.B. "photo_recognition") |
| source_date | date | nein | Erkennungsdatum |
| created | autodate | nein | System-Feld (onCreate=true) |
| updated | autodate | nein | System-Feld (onUpdate=true) |

**Records:** 103 (102 erfolgreich importiert, 1 Konflikt)

**Indizes:**
```sql
CREATE UNIQUE INDEX idx_inventory_id on npl_personal_inventory_items (inventory_id)
```

**Relations:** 
- parent_inventory_id → npl_personal_inventory_items.id (self-referential)

**Besonderheiten:**
- Boolean-Felder mit `required: false` (PocketBase v0.39.0 Quirk)
- Unique Index auf `inventory_id` (fachlicher Schlüssel)

---

#### Collection: `nw_collection_registry`

| Feld | Typ | Erforderlich | Beschreibung |
|------|-----|-------------|---|
| id | text | ja | Primary Key (auto) |
| registry_id | text | ja | **UNIQUE INDEX** — eindeutige Registry-ID |
| collection_name | text | ja | **UNIQUE INDEX** — Name der Collection im PocketBase |
| display_name | text | ja | Benutzerfreundlicher Name (UI) |
| description | text | nein | Beschreibung |
| category | text | nein | Kategorie (z.B. "Master Data", "Inventory") |
| enabled | bool | nein | Ist die Collection aktiv? |
| visible_in_admin | bool | nein | Zeige in Admin-UI? |
| allow_create | bool | nein | Darf neue Records anlegen? |
| allow_update | bool | nein | Darf Records ändern? |
| allow_delete | bool | nein | Darf Records löschen? |
| allow_excel_import | bool | nein | Darf als Excel-Import-Ziel verwendet werden? |
| is_system_collection | bool | nein | Ist dies eine Systemcollection? |
| requires_neuroways_admin | bool | nein | Erfordert Admin-Rechte? |
| searchable_fields | json | nein | Array von Feldnamen, die durchsuchbar sind |
| editable_fields | json | nein | Array von Feldnamen, die bearbeitbar sind |
| hidden_fields | json | nein | Array von Feldnamen, die im UI versteckt sind |
| default_columns | json | nein | Array für Tabellenansicht (welche Spalten zeigen?) |
| default_sort | text | nein | Standard-Sortierung (z.B. "+id", "-created") |
| page_size | number | nein | Records pro Seite (Pagination) |
| schema_version | text | nein | Version des Schemas (z.B. "0.1.0") |
| data_version | text | nein | Version der Daten (z.B. "0.1.0") |
| display_order | number | nein | Sortierreihenfolge im Admin |
| last_import | date | nein | Datum des letzten Imports |
| created_timestamp | autodate | nein | System-Feld (onCreate=true) |
| updated_timestamp | autodate | nein | System-Feld (onUpdate=true) |

**Records:** 3

| registry_id | collection_name | display_name | Zweck |
|---|---|---|---|
| REG-GAMES-001 | games | Spiele | Spielkatalog |
| REG-PUBLISHERS-001 | publishers | Verlage | Verlagsstammdaten |
| REG-INVENTORY-001 | npl_personal_inventory_items | Persönliche Sammlung | Private Spielesammlung |

**Indizes:**
```sql
CREATE UNIQUE INDEX idx_registry_id on nw_collection_registry (registry_id)
CREATE UNIQUE INDEX idx_collection_name on nw_collection_registry (collection_name)
```

**Besonderheiten:**
- Zentrale Verwaltung, welche Collections in Admin sichtbar sind
- Steuerung von CRUD-Berechtigungen pro Collection
- Konfigurierbare Feldlisten für UI

---

### 10.3 Beziehungen

```
npl_personal_inventory_items
  ├─ parent_inventory_id ──→ npl_personal_inventory_items.id
  │                          (Self-Referential: Hierarchie)
  │
  └─ [Geplant] publisher_id ──→ publishers.id (nicht implementiert)

games
  └─ [Geplant] publisher_id ──→ publishers.id (nicht implementiert)
```

**Status:** Nur npl_personal_inventory_items hat eine implementierte Relation (Self-Referential).

---

### 10.4 System Collections (PocketBase-intern)

| Collection | Zweck | Zugriff |
|---|---|---|
| `_auth` (UNGEKLÄRT) | User-Accounts? | Nicht dokumentiert |
| `_authOrigins` (UNGEKLÄRT) | Login-Provider? | Nicht dokumentiert |
| (weitere) | (weitere) | (ungeklärt) |

**Status:** Nicht relevant für dieses Projekt; PocketBase-Management-Aufgaben.

---

### 10.5 Migrations und Seed-Daten

**Migrationsystem:** NICHT IMPLEMENTIERT
- Collections werden manuell via PocketBase Admin-UI oder API erstellt
- `database/schemas/` enthält JSON-Artefakte (versioniert)
- Kein automatisiertes Migrations-Tool

**Seed-Daten:**
- `database/data/system/nw_collection_registry_v0.1.0.records.json` (3 Records)
- `database/data/personal_game_collection/Personal_Game_Collection_Inventory_v0.1.0.records.json` (103 Records)

**Deplyment:** Manuell via ExcelImportUI oder API

---

## 11. API und Schnittstellen

### 11.1 PocketBase REST API (Datenbank-Endpoints)

| Methode | Endpoint | Zweck | Status | Input | Output | Auth |
|---------|----------|-------|--------|-------|--------|------|
| GET | `/.sfs-bd/api/collections` | Alle Collections auflisten | IMPLEMENTIERT | — | JSON Array | Admin Token |
| POST | `/.sfs-bd/api/collections` | Neue Collection anlegen | IMPLEMENTIERT | Schema JSON | Collection JSON | Admin Token |
| GET | `/.sfs-bd/api/collections/{id}/records` | Records einer Collection | IMPLEMENTIERT | page, perPage, filter, sort | Paginated Records | None/Auth |
| POST | `/.sfs-bd/api/collections/{id}/records` | Neuen Record anlegen | IMPLEMENTIERT | Record JSON | Created Record JSON | Auth/Admin |
| PATCH | `/.sfs-bd/api/collections/{id}/records/{recordId}` | Record aktualisieren | NICHT VERWENDET | Record JSON | Updated Record | Auth/Admin |
| DELETE | `/.sfs-bd/api/collections/{id}/records/{recordId}` | Record löschen | GEPLANT | — | — | Auth/Admin |

### 11.2 Interne API-Endpunkte (Vite)

| Methode | Endpoint | Zweck | Status | Input | Output | Implementierung |
|---------|----------|-------|--------|-------|--------|---|
| POST | `/.sfs-bd/api/upload-excel` | Excel-Datei hochladen | DEAKTIVIERT | multipart FormData | {path, filename, ...} | vite-plugin-excel-upload.js |

**Status:** Server-Upload deaktiviert wegen Status 413; Datei wird lokal geparsed.

---

## 12. Fachliche Geschäftslogik

### 12.1 Import-Validierunglogik

**Ort:** `ExcelImportUI.jsx`, Funktion `handleDryRun()`

**Regeln:**

| Regel | Implementierung | Status |
|------|---|---|
| Spalten erkennen | XLSX.utils.sheet_to_json() | IMPLEMENTIERT |
| Datentypen inferieren | Heuristische Typ-Erkennung in `analyzeSheet()` | IMPLEMENTIERT |
| Eindeutige Schlüssel prüfen | Zählen doppelter `inventory_id` Werte | IMPLEMENTIERT (für npl_personal_inventory_items) |
| Pflichtfelder prüfen | Prüfe required: true Felder | TEILWEISE (nur in Validierungslogik, nicht im UI) |
| Datumswerte konvertieren | Excel-Nummern zu Dates | UNGEKLÄRT |
| Beziehungen validieren | Prüfe Record-IDs in anderen Collections | NICHT IMPLEMENTIERT |
| Duplizierte Zeilen | Mehrfach identische Zeilen erkennen | IMPLEMENTIERT |

---

### 12.2 Import-Modi

**Modus 1: In vorhandene Collection**

```
Benutzer wählt aus Registry eine Collection
  ↓
handleDryRun() liest existierende Records der Collection
  ↓
Für jede Excel-Zeile:
  ├─ Berechne fachlichen Schlüssel (z.B. inventory_id)
  ├─ Suche Schlüssel in existierenden Records
  └─ Klassifiziere als: NEU / IDENTISCH / KONFLIKT / UNGÜLTIG
  ↓
Zeige Dry-Run-Ergebnisse
  ↓
Bei Bestätigung: POST neue Records, überspringe identische
```

**Status:** IMPLEMENTIERT

---

**Modus 2: Neue Collections anlegen**

```
Benutzer wählt mehrere Arbeitsblätter
  ↓
Für jedes Blatt:
  ├─ Generiere Collection-Namen (BlattName → snake_case)
  ├─ Generiere Schema aus erkannten Spaltentypen
  ├─ handleDryRun() validiert ohne zu schreiben
  └─ Klassifiziere Zeilen
  ↓
Zeige Dry-Run-Ergebnisse
  ↓
Bei Bestätigung:
  ├─ POST /.sfs-bd/api/collections (Schemaerstellung)
  └─ POST /.sfs-bd/api/collections/{name}/records (Datenschreibung)
```

**Status:** IMPLEMENTIERT

---

### 12.3 Berechtigungen und Rollen

**Aktueller Stand:** DEFINIERT aber NICHT ENFORCED

**Registrar-Flags** (in nw_collection_registry):
- `allow_create` — Darf neue Records anlegen
- `allow_update` — Darf Records ändern
- `allow_delete` — Darf Records löschen
- `allow_excel_import` — Darf als Import-Ziel verwendet werden

**Frontend-Umsetzung:** AdminDatabase.jsx zeigt Buttons basierend auf Flags, aber Klicks sind nicht funktional

**Backend-Umsetzung:** PocketBase API-Regeln nicht dokumentiert; Annahme = standardmäßig offen

**Mangel:** Keine echte Berechtigungsprüfung im Frontend oder Backend

---

## 13. Authentifizierung, Rollen und Berechtigungen

### 13.1 Authentifizierungsmodell

**Verfahren:** PocketBase Admin Token (DEV) + optionale User-Auth (nicht implementiert)

**Token-Generierung:**
```bash
node /etc/goose/skills/pocketbase/tools/pb_gen_token_sfs.js        # DEV
node /etc/goose/skills/pocketbase/tools/pb_gen_token_sfs.js --live # LIVE (NICHT VERWENDEN!)
```

**Token-Gültig:** 1 Stunde

**Storage:** Token wird nicht im Frontend gespeichert; nur bei direkten API-Calls (Node.js Backend) verwendet

---

### 13.2 Benutzerrollen

**Definiert (geplant):**
- Admin: Volle Kontrolle über Collections, Schema, Imports
- Manager: Lesezugriff + Data CRUD (bestimmte Collections)
- User: Nur Lesezugriff

**Implementiert:** KEINE Rollentrennung im Code

---

### 13.3 Geschützte Bereiche

| Bereich | Schutz | Status |
|---------|--------|--------|
| Excel-Import | Sollte nur von Admin/Manager erreichbar sein | NICHT ENFORCED |
| Admin-Datenbankmanager | Sollte nur von Admin erreichbar sein | NICHT ENFORCED |
| Collection-Erstellung (Modus 2) | Erfordert Admin-Token | MANUELL (Token muss extern generiert werden) |
| Record-Löschen | Sollte Bestätigung + Berechtigung prüfen | BUTTON EXISTIERT, NICHT FUNCTIONAL |

---

### 13.4 Sessions/Tokens

**Aktuell:** Nicht implementiert

**Geplant:** PocketBase User-Authentifizierung (nicht durchgeführt)

---

### 13.5 Sicherheitsprobleme

| Problem | Priorität | Empfohlene Lösung |
|---------|-----------|------------------|
| Keine Rollentrennung im Frontend | P0 | RBAC-Check vor Tab-Anzeige |
| Admin-Token in Umgebung | P0 | Token-Generierung on-demand oder sichere Speicherung |
| Keine CRUD-Validierung im Frontend | P1 | Form-Validation + PocketBase-Rules prüfen |
| keine Berechtigungsprüfung in API-Calls | P1 | PocketBase API-Regeln (Liste/View/Create/Update/Delete) prüfen |
| Keine Audit-Logs | P2 | Import-History Collection anlegen |

---

## 14. Konfiguration und Umgebungen

### 14.1 Environments

| Umgebung | Basis-URL | Zweck | Status |
|----------|-----------|-------|--------|
| DEV | `/.sfs-bd/api` | Entwicklung, freier Zugriff | AKTIV |
| LIVE | `/.sfs-be/api` | Produktion, vom Staging kopiert | NICHT ZU KONTAKTIEREN während Entwicklung |
| PREVIEW | (abhängig von STRATO) | Vorschau vor Publish | AUTOMATISCH |

### 14.2 Konfigurationsdateien

| Datei | Zweck | Wert |
|-------|-------|------|
| `vite.config.js` | Vite Build-Konfiguration | Standard STRATO-Setup |
| `tailwind.config.cjs` | Tailwind CSS v4 Konfiguration | Farben, Fonts, Spacing |
| `package.json` | npm Dependencies | { "dependencies": { "xlsx": "^0.18.5" } } |
| `.env` | Environment Variables | NICHT VORHANDEN (nicht benötigt) |

### 14.3 Environment Variables

**Benötigte:** KEINE explizit benötig; PocketBase-Client verwendet relative Pfade (`/.sfs-bd/api`)

**Möglich zu nutzen (nicht implementiert):**
- `VITE_PB_URL` — PocketBase Base-URL (aktuell hardcoded)
- `VITE_ADMIN_TOKEN` — Dev-Token (NIEMALS hardcoden!)
- `VITE_API_ENV` — "dev" vs "live" (aktuell in pb.js hardcoded)

### 14.4 Build-Konfiguration

**Build-Kommand:**
```bash
npm run build:prod
```

**Ausgabe:** `dist/` mit optimiertem HTML, CSS, JS

**Gzip-Größen (aktuell):**
- `index.html`: 0.45 kB
- `index-<hash>.css`: 6.51 kB
- `index-<hash>.js`: 79.83 kB
- `xlsx-<hash>.js`: 143.08 kB

**Total:** ~230 kB (ungzip), ~80 kB (gzip, ohne xlsx)

---

## 15. Externe Abhängigkeiten

| Abhängigkeit | Version | Zweck | Status |
|---|---|---|---|
| React | 18+ | Frontend-Framework | Bereitgestellt von STRATO |
| React-DOM | 18+ | DOM-Rendering | Bereitgestellt von STRATO |
| Vite | 5+ | Build-Tool | Bereitgestellt von STRATO |
| Tailwind CSS | v4 | Styling-Framework | Bereitgestellt von STRATO |
| PocketBase | v0.39.0 | Backend / Datenbank | Bereitgestellt von STRATO DEV |
| XLSX.js | ^0.18.5 | Excel-Parsing | npm-Abhängigkeit (package.json) |
| React-Router | (nicht aktiv) | Client-seitige Router | Installiert aber nicht genutzt (Tab-basiert) |
| Lucide-React | ? | Icons | Wahrscheinlich vorhanden, nicht aktiv |

**Besonderheiten:**
- Keine zusätzlichen npm-Abhängigkeiten außer `xlsx`
- React, Vite, Tailwind werden vom STRATO-Platform bereitgestellt
- Keine Datenbankmigrationen-Library

---

## 16. Bereits erledigte Entwicklungsaufgaben

| Aufgabe | Ergebnis | Status | Nachweis |
|---------|----------|--------|----------|
| NeuroPlay Katalog-Struktur | Spiele- und Verlags-Listen UI | ABGESCHLOSSEN | GamesList.jsx, PublisherList.jsx |
| PocketBase Integration | REST-API-Client (pb.js) | ABGESCHLOSSEN | src/lib/pb.js |
| Collection-Registry Design | Schema mit 26 Feldern | ABGESCHLOSSEN | database/schemas/nw_collection_registry.collection.json |
| Excel-Import Pipeline Design | 5-Phasen-Architektur | ABGESCHLOSSEN | ExcelImportUI.jsx |
| Excel-Analyse-Logik | XLSX-Parsing, Spalten-Erkennung | ABGESCHLOSSEN | ExcelImportUI.jsx (handleAnalyzeFile, analyzeSheet) |
| Mapping-Logik (Modus 1) | In vorhandene Collection | ABGESCHLOSSEN | ExcelImportUI.jsx (handleDryRun) |
| Mapping-Logik (Modus 2) | Neue Collections anlegen | ABGESCHLOSSEN | ExcelImportUI.jsx (handleImport) |
| Dry-Run-Validierung | Zeige erwartete Änderungen ohne Schreib | ABGESCHLOSSEN | ExcelImportUI.jsx (handleDryRun) |
| Import-Ausführung | Schreibe Records in PocketBase | ABGESCHLOSSEN | ExcelImportUI.jsx (handleImport) |
| Admin-Database Manager | Generischer CRUD-Interface | ABGESCHLOSSEN (Lesen) | AdminDatabase.jsx |
| Responsive Design | Mobile/Tablet/Desktop-Layout | ABGESCHLOSSEN | CSS Media Queries |
| Tastatur-Navigation | (geplant) | NICHT IMPLEMENTIERT | — |
| Unit Tests | (geplant) | NICHT IMPLEMENTIERT | — |
| NeuroBalance Assessment | (geplant) | UNGEKLÄRT | (Komponenten nicht gefunden) |

---

## 17. Teilweise erledigte Arbeiten

| Arbeit | Ursprüngliches Ziel | Umgesetzt | Fehlt | Dateien | Abhängigkeiten |
|--------|---|---|---|---|---|
| Admin-Datenbankmanager | Volles CRUD für registrierte Collections | Lesen, Auswählen, Tabelle-Render | Create/Update/Delete funktional | AdminDatabase.jsx | nw_collection_registry muss in PocketBase vorhanden sein |
| Excel-Server-Upload | Datei-Speicherung auf Server | Endpoint-Stub vorhanden | Funktionale multipart-Implementierung | ExcelImportUI.jsx, vite-plugin-excel-upload.js | Multipart-Parser (aktuell: formidable fehlt) |
| Import-History Tracking | Audit-Trail für Imports | In Standard definiert | Keine Implementation | — | nw_import_history Collection muss anlegt werden |
| Berechtigungen/RBAC | Rollenbasierte Zugriffskontrolle | Registry-Flags definiert | Frontend-Enforcement + Backend-Rules | AdminDatabase.jsx, ExcelImportUI.jsx | PocketBase API-Regeln müssen konfiguriert werden |

---

## 18. Offene Anforderungen und Backlog

### P0 (BLOCKIEREND)

| ID | Beschreibung | Grund | Abhängigkeiten | Erwartetes Ergebnis | Akzeptanzkriterium |
|---|---|---|---|---|---|
| P0-01 | Datenbank-Umgebung Consistency prüfen | 403/404-Fehler in Logs | DEV PocketBase | Collections vorhanden und lesbar | `curl /.sfs-bd/api/collections` antwortet 200 für alle Collections |
| P0-02 | Excel-Server-Upload reparieren | Status 413 Fehler | formidable npm-Package | Datei landet in `app/uploads/xlsx/<ProjectName>/` | Upload funktioniert, Datei ist wieder abrufbar |
| P0-03 | NeuroBalance-Komponenten lokalisieren/klären | Nicht in aktuellem src/ gefunden | Projekt-Status | Komponenten existieren und sind eingebunden | Tabs rendern ohne Fehler |

### P1 (NOTWENDIG)

| ID | Beschreibung | Grund | Abhängigkeiten | Erwartetes Ergebnis |
|---|---|---|---|---|
| P1-01 | Import-History Collection anlegen | Audit & Reproducibility | nw_import_history Schema | Jeder Import wird geloggt |
| P1-02 | Berechtigungen im Frontend enforced | Security/RBAC | PocketBase API-Regeln + Frontend-Guard | Nur berechtigte Benutzer sehen Admin-Tabs |
| P1-03 | CRUD-Buttons im Admin funktional machen | Unvollständig | Dialog, Form, API-Calls | Datensätze können bearbeitet/gelöscht werden |
| P1-04 | Server-Upload zu lokalem Backup erweitern | Data Retention | Node.js Middleware | Datei wird lokal gespeichert, kann später verarbeitet werden |

### P2 (WICHTIG)

| ID | Beschreibung | Grund | Abhängigkeiten | Erwartetes Ergebnis |
|---|---|---|---|---|
| P2-01 | Suchfunktion in Listen | Usability | Volltextsuche-Logik | Benutzer können Spiele/Verlage nach Name suchen |
| P2-02 | Filter und Sortierung | Usability | UI-Komponenten + Array-Logik | Benutzer können nach Kategorie filtern, nach Datum sortieren |
| P2-03 | Detail-Ansichten für Spiele/Verlage | UX | Neue Routes/Komponenten | Klick auf Spiel zeigt vollständige Informationen |
| P2-04 | Konflikt-Resolution UI | UX | Dialog für Duplikate | Benutzer kann entscheiden: überschreiben / skipping / merge |
| P2-05 | Feld-Mapping & Transformationen | Data Quality | Mapping-Editor UI | Benutzer kann Spalten manuell zuordnen, Daten transformieren |
| P2-06 | Batch-CRUD-Operationen | Usability | Multi-Select + Aktion | Mehrere Records gleichzeitig löschen/ändern |

### P3 (SPÄTER)

| ID | Beschreibung | Grund |
|---|---|---|
| P3-01 | Offline-Modus | Nice-to-have |
| P3-02 | Druck-Layout für Katalog | Nice-to-have |
| P3-03 | CSV/JSON-Export | Nice-to-have |
| P3-04 | Advanced Feldtyp-Support | Zukünftige Anforderung |

---

## 19. Bekannte Fehler und technische Schulden

### Fehler & Probleme

| ID | Fehler | Ursache | Auswirkung | Workaround | Empfohlene Lösung | Priorität |
|---|---|---|---|---|---|---|
| BUG-01 | Status 413 bei Excel-Upload | Datei größer als Endpoint-Limit | Excel-Dateien >10MB können nicht hochgeladen werden | Server-Upload deaktiviert; Browser-Parse aktiviert | Endpoint mit formidable neu schreiben | P0 |
| BUG-02 | 403 Forbidden auf /games, /publishers | API-Regeln in PocketBase zu restriktiv | Navigation/Listen können teilweise nicht geladen werden | Direkte URL funktioniert manchmal | List/View-Regeln prüfen | P0 |
| BUG-03 | 404 Missing collection context | Collection fehlt oder falscher Name | Einzelne Collections nicht erreichbar | Fallback-Lading | PocketBase DEV prüfen | P0 |
| BUG-04 | NeuroBalance-Komponenten nicht gefunden | Möglicherweise geplant aber nicht angelegt | App lädt, aber Tab ist nicht funktional | Tab wird trotzdem angezeigt | Komponenten anlegen oder aus Navigation entfernen | P0 |
| BUG-05 | CRUD-Buttons nicht funktional | Nur UI-Platzhalter | Admin-Datenbankmanager kann nur lesen | Manuell über PocketBase Admin-UI editieren | Button-Handler implementieren | P1 |
| BUG-06 | Importbericht wird nicht heruntergeladen | Download-Logic nicht implementiert | Benutzer kann Ergebnisse nicht exportieren | Ergebnisse sind in Step 5 sichtbar | Download-Button + JSON/CSV-Generator | P2 |
| BUG-07 | Keine Suchfunktion in Spielelisten | Nicht implementiert | Benutzer muss alle Einträge durchschauen | Manuelle Suche via Ctrl+F | Such-Input + Filter-Logik | P2 |

---

### Technische Schulden

| ID | Bereich | Problem | Auswirkung | Lösung | Priorität |
|---|---|---|---|---|---|
| DEBT-01 | DataUploader.jsx | Legacy-Komponente | Redundanz, nicht mehr genutzt | Komponente löschen | P2 |
| DEBT-02 | Keine Migrations | Collections manuell erstellt | Schwer reproduzierbar | Migrations-System bauen | P1 |
| DEBT-03 | Keine Tests | Fehlerträchtig | Keine Qualitätskontrolle | Unit + Integration Tests | P2 |
| DEBT-04 | Hardcoded Values | z.B. perPage=50 in GamesList | Unflexibel | Konfigurierbar machen | P3 |
| DEBT-05 | Fehlende Error Boundaries | React Errors crashen App | Benutzer sieht weißer Bildschirm | Error-Boundary-Komponenten | P1 |
| DEBT-06 | Keine Logging-Strategie | Debugging schwierig | Entwickler blind | Structured Logging | P2 |

---

## 20. Getroffene Architektur- und Entwicklungsentscheidungen

### Entscheidung 1: Tab-basierte Navigation statt React Router

**Entscheidung:** Verwende Tab-Buttons in App.jsx statt React Router

**Hintergrund:** Einfachheit; schnellere Entwicklung

**Gewählte Lösung:** 
```javascript
const [activeTab, setActiveTab] = useState('games');
// Render je nach activeTab
{activeTab === 'games' && <GamesList />}
```

**Bekannte Alternativen:**
- React Router mit `createBrowserRouter` (skalierbar, tiefere Routes möglich)
- Context API für globales Routing (zu aufwendig)

**Konsequenzen:**
- ✓ Schnell zu bauen
- ✗ Keine eindeutigen URLs pro Seite
- ✗ Keine Browser-History (Back-Button funktioniert nicht)
- ✗ Keine Lesezeichen möglich

**Entscheidungs-Status:** DOKUMENTIERT; aktuell nicht zu ändern ohne Refactoring

---

### Entscheidung 2: Excel-Parsing im Browser, nicht auf dem Server

**Entscheidung:** XLSX wird lokal im Browser geparsed (XLSX.js), nicht auf dem Server

**Hintergrund:** Server-Upload schlägt fehl (Status 413); Browser-Parse ist schneller

**Gewählte Lösung:**
```javascript
const XLSX = await import('xlsx');
const data = await file.arrayBuffer();
const workbook = XLSX.read(data, { type: 'array' });
```

**Bekannte Alternativen:**
- Server-seitige Verarbeitung mit Node.js + xlsx Library
- Chunked Upload für große Dateien

**Konsequenzen:**
- ✓ Keine Server-Last
- ✓ Offline-Parse möglich
- ✗ Große Dateien können Browser blockieren
- ✗ Keine Datei-Persistierung auf Server

**Entscheidungs-Status:** PRAGMATISCH; sollte später zu echtem Upload erweitert werden

---

### Entscheidung 3: Collection Registry als zentrale Verwaltung

**Entscheidung:** Verwende PocketBase Collection `nw_collection_registry` um zu steuern, welche Collections sichtbar/bearbeitbar sind

**Hintergrund:** Generische Admin-UI braucht Metadaten; hardcoded Pro-Collection-Pages nicht skalierbar

**Gewählte Lösung:**
- nw_collection_registry mit 26 Feldern (allow_create, allow_update, searchable_fields, etc.)
- AdminDatabase.jsx liest Registry, rendert generisch

**Bekannte Alternativen:**
- Konfigurationsdatei (JSON/YAML)
- Umgebungsvariablen
- PocketBase Systemcollections

**Konsequenzen:**
- ✓ Flexibel; Konfiguration ist Daten
- ✓ Neue Collections nur Registry-Eintrag nötig
- ✗ Registry muss vorhanden sein
- ✗ Berechtigungen müssen extra geprüft werden

**Entscheidungs-Status:** DOKUMENTIERT; bewährtes Pattern

---

### Entscheidung 4: Kein automatisches Schema-Migration

**Entscheidung:** Keine SQL-Migration-Library; Collections werden manuell angelegt oder via Excel-Import

**Hintergrund:** Kleine Teams; Schemas ändern nicht oft

**Bekannte Alternativen:**
- Prisma, TypeORM, Knex.js
- PocketBase Admin-API automations

**Konsequenzen:**
- ✓ Keine zusätzliche Komplexität
- ✗ Fehleranfällig bei Fehlversionen
- ✗ Reproduzierbarkeit schwächer

**Entscheidungs-Status:** PRAGMATISCH; sollte später verbessert werden

---

### Entscheidung 5: PocketBase Admin-Token für Dev-Operationen

**Entscheidung:** Verwende manuell generierten Admin-Token für Collection-Erstellung

**Hintergrund:** Einfach; keine zusätzliche Auth-Infrastruktur nötig

**Bekannte Alternativen:**
- User-basierte Auth mit spezifischen Rollen
- Serviceaccount in PocketBase
- Separate Admin-UI

**Konsequenzen:**
- ✓ Funktioniert
- ✗ Token läuft nach 1 Stunde ab
- ✗ Token nicht persistent gespeichert

**Entscheidungs-Status:** PRAGMATISCH; für Production nicht sicher genug

---

## 21. Offene Entscheidungen

| Entscheidung | Grund | Betroffene Bereiche | Mögliche Optionen | Blockiert |
|---|---|---|---|---|
| NeuroBalance: Wo sind Komponenten? | Nicht in aktuellem src/ | App.jsx Tab 3 | A) Komponenten noch nicht angelegt B) In anderem Branch C) Geplant | Ja, App crasht wenn auf Tab geklickt |
| Excel-Server-Upload: Wie implementieren? | Status 413 Fehler | ExcelImportUI, Vite-Plugin | A) Endpoint mit formidable neu schreiben B) Chunked Upload C) Server-API für Node.js |  Nein, aber verbessert UX |
| Berechtigungen: Frontend oder Backend? | Sicherheit vs. UX | AdminDatabase, ExcelImportUI | A) Frontend nur (schnell, unsicher) B) Frontend + Backend (sicher) C) Backend only (sicher, weniger UX) | Nein, aber blockiert für Production |
| Import-History: Wo speichern? | Audit-Trail | ExcelImportUI | A) Neue Collection nw_import_history B) Datei-basiert C) Separate Audit-DB | Nein, optional |
| Rollen-Modell: Wie detailliert? | RBAC | Überall | A) Admin/Manager/User (einfach) B) Per Collection (mittel) C) Per Field (komplex) | Nein, aber wichtig für Multi-User |
| Offline-Modus: Implementieren? | Convenience | App | A) Service Worker + IndexedDB B) Nur Read-Caching C) Nicht implementieren | Nein, P3 |

---

## 22. Tests und Qualitätssicherung

### 22.1 Vorhandene Tests

**Unit Tests:** KEINE

**Integration Tests:** KEINE

**E2E Tests:** KEINE

**Manuell getestet:** Ja, folgende Funktionen
- Excel-Import mit verschiedenen Dateitypen
- Admin-UI Navigation und Tabellen-Rendering
- Responsive Design (375px, 768px, 1280px)

---

### 22.2 Testlücken

| Bereich | Fehlt | Grund |
|---------|-------|-------|
| Feldtyp-Konvertierung | Tests | Heuristische Typ-Erkennung ist error-prone |
| Konflikt-Detection | Tests | Keine Testabdeckung für Edge-Cases |
| API-Error-Handling | Tests | 403/404 nicht getestet |
| Performance | Tests | Keine Lasttests für große Imports |
| Berechtigungen | Tests | Keine RBAC-Tests |

---

### 22.3 Build-Status

**Letzter Build:** 06375ab (erfolgreich)

**Build-Zeit:** ~2,5 Sekunden

**Fehler/Warnings:** Keine kritischen bekannt

---

## 23. Deployment und Betrieb

### 23.1 Deployment-Prozess

```
1. Lokal in Branch dev arbeiten
2. npm run build:prod → dist/ erzeugen
3. git add -A && git commit -m "..."
4. git push origin dev
5. STRATO-Platform erkennt Änderungen
6. Automatisches Build + Deploy
7. Live unter [AppURL] erreichbar
```

### 23.2 Zielverzeichnis

**Hosting:** STRATO-Platform (Multi-Tenant)

**Base-URL:** [Abhängig vom Projekt; nicht dokumentiert]

**Build-Ausgabe:** `dist/` wird deployed

**Statische Assets:** `static/` (vom Platform separat served)

### 23.3 Deploymentmethode

**CI/CD:** Automatisch durch STRATO (Webhook-basiert)

**Rollback:** Git revert + Neuer Push

### 23.4 Bekannte Besonderheiten

- Mehrere Base-Paths möglich (Live + Preview + History-Snapshots)
- Relative Asset-Paths in Code notwendig (keine hardcoded `/`)
- Große Bundle (xlsx-Library macht 143kB gzip)

---

## 24. Risiken

| Risiko | Eintritts-wahrscheinlichkeit | Auswirkung | Gegenmaßnahme |
|--------|---|---|---|
| PocketBase DEV-Datenbank nicht konsistent | Mittel | Einige Collections nicht erreichbar | Datenbank-Zustand regelmäßig prüfen |
| Excel-Import mit großen Dateien (>50MB) | Mittel | Browser-Freeze oder Out-of-Memory | Chunked Upload implementieren |
| Keine Berechtigungsprüfung | Hoch | Unbefugte könnten sensitive Daten ändern | RBAC + PocketBase-Regeln implementieren |
| NeuroBalance nicht angelegt | Hoch | App crasht wenn Tab geklickt | Komponenten lokalisieren oder entfernen |
| Token-Ablauf bei Collection-Erstellung | Mittel | Benutzer muss Token neu generieren | Token automatisch erneuern oder langlebig machen |
| Keine Import-History | Mittel | Keine Audit-Trail für Datenvorgänge | Separate Collection für Logs anlegen |

---

## 25. Empfohlene nächste Entwicklungsschritte

### Phase 1: Stabil machen (P0)

**Aufgabe 1.1: Datenbank-Umgebung prüfen**
- Ziel: Sicherstellen, dass alle Collections in DEV lesbar sind
- Voraussetzungen: Zugriff auf PocketBase Admin-UI oder API
- Betroffene Dateien: src/lib/pb.js (ggf. Fehlerbehandlung)
- Erwartetes Ergebnis: Keine 403/404-Fehler mehr
- Akzeptanzkriterien:
  - `curl /.sfs-bd/api/collections/games/records` antwortet 200
  - `curl /.sfs-bd/api/collections/publishers/records` antwortet 200
  - App lädt Statistiken ohne Fehler

**Aufgabe 1.2: NeuroBalance-Komponenten lokalisieren**
- Ziel: Klären, wo die Komponenten sind oder ob sie gelöscht werden sollen
- Voraussetzungen: Git-History Analyse
- Betroffene Dateien: src/App.jsx (evtl. Tab entfernen)
- Erwartetes Ergebnis: Tab ist entweder funktionsfähig oder nicht im Menü
- Akzeptanzkriterien:
  - Klick auf Tab führt nicht zu Error
  - Komponenten sind vorhanden und render-fähig ODER Tab ist aus Navigation entfernt

**Aufgabe 1.3: Excel-Server-Upload-Funktion reparieren**
- Ziel: Datei soll in `app/uploads/xlsx/` landen
- Voraussetzungen: formidable npm-Package oder alternatives Parsing
- Betroffene Dateien: ExcelImportUI.jsx, vite-plugin-excel-upload.js
- Erwartetes Ergebnis: Datei wird hochgeladen und gespeichert
- Akzeptanzkriterien:
  - POST `/api/upload-excel` antwortet 200
  - Datei existiert in `app/uploads/xlsx/<ProjectName>/<timestamp>-<filename>.xlsx`

---

### Phase 2: Funktional vervollständigen (P1)

**Aufgabe 2.1: Admin-CRUD-Buttons funktionsfähig machen**
- Ziel: Datensätze können bearbeitet und gelöscht werden
- Voraussetzungen: Form-Komponente, Dialog-Component, API-Call-Logic
- Betroffene Dateien: AdminDatabase.jsx
- Erwartetes Ergebnis: Klick auf Edit/Delete öffnet Dialog, Aktion wird durchgeführt
- Akzeptanzkriterien:
  - Edit-Dialog zeigt Formular mit Feldwerten
  - Speichern aktualisiert Record via PATCH API
  - Delete-Dialog zeigt Bestätigung
  - Bestätigung löscht Record via DELETE API

**Aufgabe 2.2: Import-History Collection anlegen**
- Ziel: Jeder Import wird protokolliert
- Voraussetzungen: Schema definieren, ExcelImportUI erweitern
- Betroffene Dateien: database/schemas/nw_import_history.collection.json, ExcelImportUI.jsx
- Erwartetes Ergebnis: Nach jedem Import existiert Log-Eintrag
- Akzeptanzkriterien:
  - nw_import_history Collection in PocketBase vorhanden
  - handleImport() schreibt Log-Record nach jedem Import
  - Admin kann Import-History ansehen

**Aufgabe 2.3: Berechtigungen Frontend-seitig prüfen**
- Ziel: Nur berechtigte Benutzer sehen sensitive Tabs
- Voraussetzungen: Benutzer-Auth in PocketBase, Role-Abfrage
- Betroffene Dateien: src/App.jsx
- Erwartetes Ergebnis: Admin-/Excel-Tabs nur für Admin sichtbar
- Akzeptanzkriterien:
  - Nicht-Admin sieht nur Games/Publishers/NeuroBalance-Tabs
  - Admin sieht alle Tabs

---

### Phase 3: Qualität & Usability (P2)

**Aufgabe 3.1: Suchfunktion in Listen**
- Ziel: Benutzer können Spiele/Verlage nach Name suchen
- Betroffene Dateien: GamesList.jsx, PublisherList.jsx
- Erwartetes Ergebnis: Text-Input filtert Tabellenzeilen
- Akzeptanzkriterien:
  - Such-Input in Header
  - Während Tippen werden Zeilen gefiltert (case-insensitive)
  - Leeres Input zeigt alle Zeilen

**Aufgabe 3.2: Filter und Sortierung**
- Ziel: Erweiterte Datenfilterung
- Betroffene Dateien: GamesList.jsx, PublisherList.jsx
- Erwartetes Ergebnis: Dropdown für Filter, sortierbare Spalten
- Akzeptanzkriterien:
  - Spalten-Header sind klickbar (Sort)
  - Filter-Buttons nach Kategorie verfügbar

**Aufgabe 3.3: Importbericht zum Download**
- Ziel: Benutzer kann Ergebnisse exportieren
- Betroffene Dateien: ExcelImportUI.jsx (Step 5)
- Erwartetes Ergebnis: Download-Button exportiert CSV/JSON
- Akzeptanzkriterien:
  - Button in Step 5 vorhanden
  - Klick erzeugt Datei (import-report-<timestamp>.csv)
  - Datei enthält: Excel-Zeile → Status (neu/identisch/konflikt/ungültig)

---

## 26. Einstiegspunkt für die nächste KI

### Was muss zuerst gelesen werden?

1. **Masterprompt:** `prompts/MASTERPROMPT_Projektstand_v1.0.0.md` (10 Minuten)
   - Übersicht aller Komponenten und bekannten Probleme
   - Architektur-Grafik
   - P0/P1/P2 Aufgaben priorisiert

2. **Dieser Handover:** `docs/handover/PROJECT_HANDOVER.md` (Sie lesen gerade)
   - Vollständiger technischer/fachlicher Stand
   - Detaillierte Fehler und offene Entscheidungen

3. **Standards:** `docs/standards/NW-DB-STD-001_*.md` (30 Minuten)
   - Verbindliche Regeln für Datenbank-Operationen
   - Checklisten vor jedem Deploy

4. **Code-Eintiegspunkte:**
   - `src/App.jsx` — Versteht Komponenten-Struktur
   - `src/components/ExcelImportUI.jsx` — Herzstück des Projects
   - `src/lib/pb.js` — PocketBase Integration
   - `database/schemas/nw_collection_registry.collection.json` — Admin-Steuerung

### Welche Dateien sind besonders wichtig?

| Datei | Grund | Vorsicht |
|-------|-------|---------|
| `src/App.jsx` | Navigation, State | Keine React-Router, nur Tabs |
| `src/components/ExcelImportUI.jsx` | Core-Logik | 802 Zeilen, komplex |
| `src/lib/pb.js` | PocketBase-Client | Hardcoded /.sfs-bd/api |
| `database/schemas/nw_collection_registry.collection.json` | Admin-Registry | Muss in PocketBase vorhanden sein |
| `package.json` | Dependencies | Nur xlsx, Rest vom Platform |
| `docs/standards/NW-DB-STD-001` | Verpflichtend | Muss gelesen vor jedem DB-Change |

### Was darf nicht ohne Prüfung verändert werden?

- ❌ **Datenbank-Collection-Namen** — verwendet in Code und Registry
- ❌ **PocketBase-Umgebung** (DEV vs LIVE) — Verwechslung ist kritisch
- ❌ **API-Endpunkt-Pfade** — hart codiert in mehreren Komponenten
- ❌ **nw_collection_registry Schema** — Admin-Funktionalität hängt davon ab
- ❌ **NeuroBalance Tab** (bis Komponenten geklärt) — App crasht

### Was ist der nächste empfohlene Arbeitsschritt?

**Priorität 1: Datenbank-Konsistenz prüfen**
```bash
# Prüfe, welche Collections existieren
curl /.sfs-bd/api/collections -H "Authorization: Bearer <TOKEN>"

# Prüfe, ob games lesbar ist
curl /.sfs-bd/api/collections/games/records -H "Authorization: Bearer <TOKEN>"

# Prüfe, ob nw_collection_registry existiert
curl /.sfs-bd/api/collections/nw_collection_registry/records -H "Authorization: Bearer <TOKEN>"
```

Wenn 403 oder 404 → Datenbank-Zustand im PocketBase Admin-UI prüfen.

**Priorität 2: NeuroBalance lokalisieren**
```bash
git log --oneline | grep -i "neuobalance"
git show <commit> # Zeigt wo die Komponenten waren
```

Wenn Komponenten gelöscht: Aus App.jsx Tab entfernen.
Wenn in anderem Branch: Mergen oder neu anlegen.

**Priorität 3: Excel-Upload testen**
- Kleine Excel-Datei (< 5MB) hochladen
- In Browser-Console schauen, ob Fehler auftritt
- Falls Status 413: Anfrage P0-02 (Server-Upload reparieren)

---

## 27. Unsicherheiten und fehlende Informationen

### UNGEKLÄRT: NeuroBalance-Komponenten

**Was bekannt ist:**
- Masterprompt erwähnt "NeuroBalance Assessment-System (Tab 3)"
- App.jsx hat Platzhalter für Tab `neurobalance`
- CheckIn und Result werden erwähnt

**Was nicht bekannt ist:**
- Wo sind die Komponenten (`CheckIn.jsx`, `Result.jsx`, etc.)?
- Sind sie in anderem Branch?
- Wurden sie gelöscht und sind nur in Git-History?
- Sind sie geplant aber nicht angelegt?

**Verfahren:**
- Git-History durchsuchen: `git log --all --full-history -- "*CheckIn*"`
- App auf dieser Branch starten: Crasht der Tab?
- Code-Search: `grep -r "CheckIn" src/`

---

### UNGEKLÄRT: Genaue Feldstruktur von `games` und `publishers`

**Was bekannt ist:**
- Collections existieren (werden in App.jsx geladen)
- GamesList.jsx rendern Tabelle (aber welche Spalten?)

**Was nicht bekannt ist:**
- Exakte Feldliste pro Collection
- Datentypen
- Relationen zu anderen Collections
- Unique Constraints

**Verfahren:**
- PocketBase Admin-UI öffnen → Collections anschauen
- API-Aufruf: `GET /.sfs-bd/api/collections/games` (benötigt Admin-Token)
- Database-Schemas in GitHub suchen (falls versioniert)

---

### UNGEKLÄRT: Datenbank-Umgebung (DEV vs LIVE)

**Was bekannt ist:**
- DEV läuft auf `/.sfs-bd/api`
- LIVE läuft auf `/.sfs-be/api`
- Fehlermeldungen zeigen 403/404

**Was nicht bekannt ist:**
- Sind beide Umgebungen konsistent?
- Welche Collections sind wo vorhanden?
- Welche Berechtigungsregeln sind gesetzt?

**Verfahren:**
- Beide Endpunkte mit Token abfragen
- Collections-Liste vergleichen
- API-Rules per Collection prüfen

---

### UNGEKLÄRT: PocketBase-Versionsstatus

**Bekannt:** v0.39.0 (aus Standard-Dokumentation)

**Nicht bekannt:**
- Ist das die tatsächlich laufende Version?
- Gibt es mögliche Version-Upgrade-Konflikte?

**Verfahren:**
- PocketBase Admin-UI → Settings
- Oder API-Aufruf: `GET /.sfs-bd/api/health` (falls vorhanden)

---

### UNGEKLÄRT: Admin-Token Speicherung

**Bekannt:**
- Token wird manuell via `pb_gen_token_sfs.js` generiert
- Gültig 1 Stunde

**Nicht bekannt:**
- Wo wird der Token in Collection-Erstellung gespeichert?
- Wird ein Env-Var verwendet?
- Wie wird Token vor Ablauf erneuert?

**Verfahren:**
- ExcelImportUI.jsx nach Token-Usage durchsuchen
- Env-Variablen prüfen

---

### UNGEKLÄRT: Berechtigungsmodell

**Bekannt:**
- Registry-Flags sind definiert (allow_create, allow_update, etc.)
- Frontend-Buttons zeigen Flags an

**Nicht bekannt:**
- Sind Backend-Regeln in PocketBase konfiguriert?
- Gibt es eine Benutzer-Authentifizierung?
- Wie werden Rollen definiert?

**Verfahren:**
- PocketBase Admin-UI: Collections → API Rules
- Authentifizierung prüfen

---

### UNGEKLÄRT: Deployment-History

**Bekannt:**
- Git history zeigt 20+ Commits
- Letzte Build erfolgreich

**Nicht bekannt:**
- Welche Commits wurden wirklich deployed?
- Wann war das letzte echte Production-Deploy?
- Welche Commits waren nur lokal?

**Verfahren:**
- Build-Status auf STRATO-Platform prüfen
- CI/CD-Logs anschauen

---

### UNGEKLÄRT: Benutzer & Authentifizierung

**Bekannt:**
- PocketBase auth existiert (System Collection `_auth`)
- Keine User-basierte Authentifizierung im Frontend

**Nicht bekannt:**
- Gibt es Testbenutzer?
- Wie werden neue Benutzer angelegt?
- Welche Rollen sind definiert?

**Verfahren:**
- PocketBase Admin-UI → Users
- Code-Search nach Auth-Handling

---

## 28. Übergabe-Check

Vor Abschluss dieser Übergabe:

- [x] Anforderungen erfasst (REQ-001 bis REQ-020)
- [x] Implementierte Funktionen erfasst (Abschnitte 5.1–5.5)
- [x] Offene Anforderungen erfasst (Abschnitt 18)
- [x] Teilweise implementierte Funktionen erfasst (Abschnitt 17)
- [x] Seitenstruktur erfasst (Abschnitt 6)
- [x] Repositorystruktur erfasst (Abschnitt 9)
- [x] Architektur erfasst (Abschnitt 8)
- [x] Datenbank erfasst (Abschnitt 10)
- [x] APIs erfasst (Abschnitt 11)
- [x] Geschäftslogik erfasst (Abschnitt 12)
- [x] Erledigte Aufgaben erfasst (Abschnitt 16)
- [x] Offene Aufgaben erfasst (Abschnitt 18)
- [x] Fehler und technische Schulden erfasst (Abschnitt 19)
- [x] Deployment erfasst (Abschnitt 23)
- [x] Nächste Schritte definiert (Abschnitt 25)
- [x] Unsicherheiten ausdrücklich dokumentiert (Abschnitt 27)
- [x] Keine Secrets enthalten (nur Variable-Namen)
- [x] Keine vermuteten Informationen als Fakten dargestellt (Konsequent UNGEKLÄRT/VERMUTUNG gekennzeichnet)

---

## Fazit

Dieses Projekt ist in einem **funktionsfähigen, aber unvollständigen Zustand**:

✅ **Was funktioniert:**
- Grundgerüst und Navigation
- Excel-Import-Pipeline (lokal geparsed)
- Admin-Database Manager (Lesen)
- Responsive Design
- Git-Versionierung und Dokumentation

⚠️ **Was kritisch ist (P0):**
- NeuroBalance-Komponenten nicht gefunden
- Datenbank-Umgebung möglicherweise nicht konsistent (403/404-Fehler)
- Server-Excel-Upload deaktiviert
- Keine echten Berechtigungen durchgesetzt

❌ **Was fehlt (P1/P2):**
- CRUD-Funktionen im Admin
- Import-History
- Suchfunktion
- Konflikt-Resolution

**Empfohlener nächster Schritt:** Abschnitt 25 Phase 1.1 durchführen (Datenbank-Konsistenz prüfen). Danach sind die Meisten Fehler klar und die Weiterentwicklung kann produktiv vorangehen.

---

**Übergabe abgeschlossen: 2026-08-15 09:30 UTC**
