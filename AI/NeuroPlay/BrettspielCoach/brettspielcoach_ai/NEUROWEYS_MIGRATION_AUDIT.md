# NeuroWays-Migrationsbericht: NeuroPlay Brettspielcoach
**NW-EXT-MIGRATE-001**

Audit-Datum: 2026-07-24  
Projekt: NeuroPlay MVP  
Status: Externe Entwicklung → Migrationsvorbereitung  
Codeumfang: 3.109 Zeilen React/JavaScript

---

## 1. Projekteinordnung & Hierarchie

### 1.1 Einstufung: **WORKSPACE** mit Modul-Unterstruktur

Das Projekt ist weder eine reine Feature noch ein isoliertes Modul.

**Komponenten:**
```
NeuroPlay Workspace
├── Basisanwendung (React + Vite)
│   ├── Startbildschirm & Navigation
│   ├── 15 Bildschirme als Screens (modulares State-Routing)
│   └── UI-Komponentensammlung (15 × JSX)
├── Modul: Brettspielcoach
│   ├── Game-Modell (JSON-Schema)
│   ├── Spielanalyse (simuliert)
│   ├── Coach-Dialog (Pattern-Matching)
│   ├── Regelsuche & Kategorisierung
│   ├── Spielmodus-Tracker
│   └── Strategie-Wissensbasis
├── Modul: Spielekatalog
│   ├── Excel-Datenintegration (52 Spiele)
│   ├── Filter & Suche
│   └── Detail-Darstellung
├── Administration
│   ├── Katalog-Import
│   ├── PocketBase-Schema-Management
│   └── Import-Audit
├── Datenschicht
│   ├── PocketBase-Klient (SDK v0.27.0)
│   ├── Konfigurierbare Sammlungen (6 × geplant)
│   └── CSV-Parser
└── Design & Styling
    ├── Tailwind CSS v4 (Dark Theme)
    ├── Lucide-React Icons
    └── Responsive Breakpoints (375/768/1280px)
```

**Begründung für Workspace-Einstufung:**
- Eigenständige Laufzeitumgebung mit Einstiegspunkt (StartScreen)
- Zentrale Navigation & State Management (App.jsx, 174 Zeilen)
- Mehrere fachliche Modularisierungspunkte (Katalog, Coach, Spielmodus)
- Lokale Datenhaltung mit Backend-Platzhalter (PocketBase)
- Administrationsfunktionen
- Eigenständiges Versionsbuild (Vite)

---

## 2. Ist-Analyse: Aktuelle Struktur

### 2.1 Funktionale Bereiche

| Bereich | Komponenten | LOC | Status |
|---------|-------------|-----|--------|
| **Startbildschirm & Navigation** | StartScreen.jsx | 79 | Aktiv |
| **Spielanalyse** | UploadScreen.jsx, AnalysisScreen.jsx | 143 | Simuliert |
| **Spielübersicht & Dashboard** | GameOverview.jsx | 103 | Aktiv |
| **Regelwerk** | RulesScreen.jsx | 146 | Beispieldaten |
| **Coach-Dialog** | CoachScreen.jsx | 134 | Pattern-Matching |
| **Spielmodus** | GameModeScreen.jsx | 175 | Mock-Tracker |
| **Strategien** | StrategyScreen.jsx | 102 | Beispieldaten |
| **Spielfluss** | GameFlowScreen.jsx | 75 | Beispieldaten |
| **Schnellstart** | QuickStart.jsx | 95 | Beispieldaten |
| **Setup** | SetupScreen.jsx | 80 | Beispieldaten |
| **Spielesammlung** | LibraryScreen.jsx | 96 | Client-seitig |
| **Spielekatalog** | GamesCatalog.jsx | 349 | Excel-basiert |
| **Admin** | AdminPanel.jsx, AdminCatalogImport.jsx | 215 | Teilfunktional |
| **Core App-Logik** | App.jsx, gameService.js | 347 | Zentral |
| **Datenzugriff** | catalog-import.js, collection-check.js, pb.js | 415 | Adapter-vorbereitet |
| **Styling & Config** | index.css, tailwind.config.cjs, vite.config.js | 17 | Standard |

**Gesamtumfang:** 3.109 Zeilen Code

### 2.2 Architektur-Schnappschuss

**Datenflussmuster:**
```
StartScreen
  ↓ (navigate)
App.jsx [State: screen, games, currentGame]
  ↓ (render & props)
Einzelner Screen (z.B. GameOverview)
  ↓ (callback: navigate, onSelectGame)
gameService.js [EXAMPLE_GAME, analyzeGameDocument, askGameCoach]
  ↓ (future)
PocketBase SDK (pb.js) [not yet connected to live backend]
```

**State-Management:** Zentral in App.jsx, kein Redux/Context-API

**Routing:** Screen-name basiert, kein React Router

**Datenschicht:**
- Lokal: In-Memory (React State, EXAMPLE_GAME Konstante)
- Geplant: PocketBase via pb.js Singleton
- CSV-Import vorhanden (catalog-import.js)
- PocketBase-Schema definiert (pb_schema_export.json, nicht deployed)

### 2.3 Game-Modell

```javascript
Game {
  id: string,
  title: string,
  description: string,
  basics: { playerCount, duration, complexity, age },
  goal: string,
  material: [{ name, description }],
  setup: { title, steps: [step] },
  roundStructure: { title, phases: [{ name, description }] },
  actions: [{ name, description, cost }],
  specialRules: [{ name, description }],
  winConditions: [reason],
  beginnerMistakes: [{ mistake, why, solution }],
  strategies: [{ name, description }],
  uploadedAt: timestamp
}
```

**Eigenschaften:**
- Flache Struktur mit verschachtelten Arrays
- Keine Versionierung oder Audit-Tracking
- Keine Beziehungen zu anderen Objekten (User, Session, Import)
- Keine Validierung im Code

---

## 3. Abweichungen zu NeuroWays-Prinzipien

### 3.1 Kritische Abweichungen (müssen behandelt werden)

| # | Abweichung | Auswirkung | Migrationsbedarf |
|---|-----------|-----------|------------------|
| **A1** | Keine Modul-Identität definiert | Komponenten sind nicht nach fachlicher Domäne gruppiert, sondern nach Bildschirmen | Refactor: Modul-Ordnerstruktur |
| **A2** | State-Logik in App.jsx konzentriert | Zentrale Komponente mit 174 Zeilen, schwer zu testen, unklar delegierbar | Refactor: State auf Modul-Ebene verteilen |
| **A3** | Game-Modell ist nicht versioniert | Keine Audit-Historie, keine Änderungsverfolgung, nur Zeitstempel | Schema-Erweiterung: Versionierung + Audit-Felder |
| **A4** | Keine Adapter-Schnittstelle zu Backend | PocketBase-Integration ist geplant, aber nicht strukturiert | Design: Adapter-Pattern etablieren |
| **A5** | Geschäftslogik in Components verflochten | gameService.js enthält nur Beispieldaten, echte Regeln sind hardcoded in Screens | Refactor: Service-Layer ausbauen |
| **A6** | Kein fachliches Fehlermodell | Fehler sind nicht differenziert; keine Fehlerbehandlung für Datenvalidierung | Design: ErrorCode-Registry |
| **A7** | Keine Transaktionssemantik für Import | Catalog-Import kann teilweise scheitern, keine Rollback-Mechanik | Schema: import_batch Versionierung + Atomarität |
| **A8** | Keine API-Versionierung | Komponenten rufen Services direkt auf; keine Schnittstellen-Versionierung | Design: Service-Schnittstellen-Versions-Tagging |

### 3.2 Stilistische Abweichungen

- Naming: "Screen" statt "Page" oder "View" (nicht kritisch, aber inkonsistent)
- Naming: `setScreen` statt `navigateToScreen` (State-Leak in UI-Logik)
- Conditional Rendering direkt in App.jsx statt Route-basiert (Wartbarkeit sinkt mit Screens)

### 3.3 Positive Befunde (erhalten)

- ✓ Reaktive Architektur (React)
- ✓ Responsive Design (3 Breakpoints)
- ✓ Klare Komponentengrenzen (JSX-Modularisierung)
- ✓ Service-Layer-Anfänge (gameService.js)
- ✓ Data-Import vorbereitet (CSV-Parser, Catalog-Importer)
- ✓ PocketBase-Integration geplant mit Adapter (pb.js)
- ✓ Admin-Funktionen vorhanden
- ✓ Datenschema dokumentiert

---

## 4. Migrationspriorisierung

### Phase 1: Grundlagen (Woche 1)
1. **Module definieren** – Modul-Ordnerstruktur etablieren
2. **State-Struktur klären** – Modul-State von App-State trennen
3. **Game-Modell versionieren** – Audit-Felder hinzufügen
4. **Adapter-Pattern desinen** – Service-Schnittstelle für PocketBase

### Phase 2: Logik-Refactor (Woche 2–3)
5. **gameService.js erweitern** – Echte Businesslogik für Regeln/Coach
6. **Fehlerbehandlung** – Validierung & Error-Codes
7. **Import-Transaktionen** – Atomic import_batch mit Rollback

### Phase 3: Integration (Woche 4+)
8. **PocketBase live** – Adapter aktivieren
9. **Test-Daten migrieren** – EXAMPLE_GAME in PocketBase
10. **Core-Anbindung vorbereiten** – Schnittstellen definieren

---

## 5. Zielzustand für NeuroWays

Nach Migration:

```
nw-modul-neurorplay/
├── packages/
│   ├── core/
│   │   ├── GameModel.ts
│   │   ├── GameValidator.ts
│   │   ├── GameRepository.ts (Interface)
│   │   └── ErrorCodes.ts
│   ├── ui/
│   │   ├── screens/
│   │   ├── components/
│   │   └── layouts/
│   └── adapters/
│       ├── PocketBaseRepository.ts
│       ├── LocalStorageRepository.ts
│       └── NetworkService.ts
├── src/
│   ├── App.tsx
│   └── main.tsx
├── nw.config.json (Modul-Identität)
└── SCHEMA.md (Versionierte Datenstrukturen)
```

---

## 6. Migration-Roadmap (Verbindlich)

### M1: Modul-Identität (Tag 1–2)
- [ ] `nw.config.json` erstellen (Modul: `neurorplay-coach`, Domain: `game-learning`)
- [ ] Ordnerstruktur nach Modul-Muster umgestalten
- [ ] Dokumentation: fachliche Domäne, Verantwortlichkeiten

### M2: State-Refactor (Tag 3–5)
- [ ] Game-State + Coach-State separieren
- [ ] Service-Schnittstellen versionsieren
- [ ] App.jsx auf Koordination beschränken

### M3: Datenschicht (Tag 6–8)
- [ ] Game-Modell zu Domain Object (mit Version, Audit)
- [ ] Repository-Interface definieren
- [ ] PocketBase-Adapter implementieren
- [ ] CSV-Import als Repository-Transaktion

### M4: Fehlerbehandlung (Tag 9–10)
- [ ] ErrorCode-Registry (Geschäftsfehler vs. Technische Fehler)
- [ ] Validierung in GameModel
- [ ] Import-Fehlerbehandlung + Rollback

### M5: Vorbereitung Core-Anbindung (Tag 11–14)
- [ ] Service-Schnittstellen dokumentieren
- [ ] Adapter für zukünftigen NeuroWays-Core vorbereiten
- [ ] Integrations-Tests schreiben

---

## 7. Migration starten: Nächste Aktion

**Sofort zu tun:**
1. `nw.config.json` erstellen (unten)
2. Ordnerstruktur nach Modul-Muster analysieren
3. State-Refactor-Plan detaillieren

**Keine Daten löschen oder renamenn ohne Mapping-Dokumentation.**

---

## Anhang: nw.config.json (Vorlage)

```json
{
  "module": {
    "id": "neurorplay-coach",
    "name": "NeuroPlay Brettspielcoach",
    "version": "0.1.0",
    "type": "application",
    "domain": "game-learning",
    "description": "Intelligenter Coach für Brettspielverständnis und Anleitung"
  },
  "structure": {
    "coreLayer": "src/core",
    "uiLayer": "src/ui",
    "adapters": "src/adapters"
  },
  "dependencies": {
    "neurorplay-core": "^0.x.x"
  },
  "migrations": {
    "phase": "external-development",
    "targetPhase": "neurorways-integrated"
  }
}
```

---

**Autor:** Migrations-Audit-Agent  
**Status:** Entwurf  
**Nächste Überprüfung:** Nach M1-Abschluss
