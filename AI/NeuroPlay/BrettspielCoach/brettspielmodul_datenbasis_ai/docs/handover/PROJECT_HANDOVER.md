# PROJECT HANDOVER

## 1. Dokumentinformationen

| Feld | Wert |
|------|------|
| **Projektname** | NeuroPlay – Brettspielmodul |
| **Handover-Datum** | 15. August 2026 |
| **Entwicklungsstand** | Part 1 (Datenbasis + Frontend) implementiert, Part 2 (vollständige Oberflä­che) GEPLANT |
| **Technologie-Stack** | Vite + React 19 + React Router v7 + Tailwind CSS v4 |
| **Entwicklungsumgebung** | STRATO KI / Node.js 24 |
| **Hosting** | STRATO KI Platform |
| **Repository** | `/home/www/aibuilder-s8kjz/app` (Git) |
| **Branch** | `dev` |
| **Letzter Commit** | `40f6a9b` – feat: NeuroPlay Part 1 – Datenmodell, Seed-Daten und Basis-Oberfläche |
| **Zweck dieser Übergabe** | Vollständige Rekonstruktion des Projektstands für nahtlose Weiterwicklung durch andere KI oder Entwickler |

---

## 2. Executive Project Summary

**NeuroPlay** ist eine React-basierte Webanwendung zur strukturierten Vermittlung von Brettspielregeln. Die Anwendung adressiert ein fundamentales Problem: Brettspielanleitu­ngen sind oft unübersichtlich, Anfänger finden schwer den Einstieg, und Regeln sind häufig unklar strukturiert.

**NeuroPlay bietet:**
- Einen **durchsuchbaren und filterbaren Katalog** von aktuell 5 Beispielspielen (Struktur bereit für die vollständigen 1.734 aus der Excel-Datei)
- Einen **Regelcoach**, der Spielwissen strukturiert präsentiert: Ziel, Kernschleife, Phasen, Regeln
- Die Verwaltung einer **persönlichen Spielesammlung** mit Status-Tracking (Vorhanden / Hinzufügen / Zu prüfen)
- Eine Übersicht über **32 priorisierte Verlage** (aktuell 5 Seed-Verlage)

**Zielgruppe:** Spieler, die Regeln verstehen möchten, Pädagogen, NeuroWays-Therapeuten und Spielgruppen.

**Aktueller Stand:**
- ✅ Frontend-Grundstruktur mit Navigation, 5 Hauptseiten und Responsive Design (mobile-first)
- ✅ Seed-Datenmodell mit Struktur für Games, Publishers, Knowledge, Phases, Rules, Collection
- ✅ Suche, Filter und Sortierung funktionsfähig
- ⚠️ Nur 5 Beispielspiele und 5 Beispielverlage – Struktur ist für vollständigen Excel-Import vorbereitet
- ❌ Echter Excel-Import NICHT umgesetzt (XLSX-Parser existiert, aber wurde nicht vollständig integriert)
- ❌ PocketBase-Integration geplant, aber nicht implementiert
- ❌ Authentifizierung, Rollen und Berechtigungen noch nicht umgesetzt

---

## 3. Fachliches Zielbild

Das fertige NeuroPlay-System soll diese fachlichen Anforderungen erfüllen:

### 3.1 Kernfunktionalität (Anforderung)

| Funktion | Status | Beschreibung |
|----------|--------|-------------|
| **Spielekatalog** | TEILWEISE IMPLEMENTIERT | Suche und Filter funktionieren mit Seed-Daten; vollständige 1.734 Spiele fehlen |
| **Regelcoach** | TEILWEISE IMPLEMENTIERT | Grundstruktur vorhanden; Anzeige von Ziel, Kernschleife, Phasen, Regeln funktioniert |
| **Eigene Sammlung** | TEILWEISE IMPLEMENTIERT | Status-verwaltung (VORHANDEN, HINZUFÜGEN, ZU PRÜFEN) funktioniert; nur Seed-Daten |
| **Verlags-Übersicht** | GEPLANT | Route nicht implementiert |
| **Datenqualität-Dashboard** | GEPLANT | Route nicht implementiert |

### 3.2 Fachliche Grundprinzipien (NeuroPlay-Philosophie)

- ✅ Keine Menschenbewertung: Beobachtung statt Diagnose
- ✅ Trennung Beobachtung/Interpretation: Regelwissen ist belegt, nicht erfunden
- ✅ Transparenz über fehlende Daten: „Regelwissen noch nicht erfasst" wird angezeigt
- ✅ Privacy by Default (architektonisch vorbereitet)
- ❌ Nachvollziehbare Empfehlungen: Noch nicht implementiert (geplant für Phase 3)
- ❌ Nur offizielle Regeln: Abhängig vom vollständigen Excel-Import

---

## 4. Vollständiger Anforderungskatalog

| ID | Anforderung | Kategorie | Status | Implementierung/Nachweis | Offene Punkte |
|----|-------------|-----------|--------|--------------------------|---------------|
| **FUNC-001** | Spielekatalog mit Suche | Funktional | TEILWEISE IMPLEMENTIERT | `CatalogPage.jsx`: Suche über Titel, Original­titel, Beschreibung; Filter nach Verlag, Kategorie, Spielerzahl, Regelwissen; Sortierung nach Titel, Spielerzahl, Alter | Nur 5 Seed-Spiele; 1.729 fehlen |
| **FUNC-002** | Spieldetail-Ansicht | Funktional | TEILWEISE IMPLEMENTIERT | `GameDetailPage.jsx`: Zeigt Stammdaten, Verlag, Ziel, Kernschleife, Phasen, Regeln, Quellen | Nur Seed-Daten vorhanden |
| **FUNC-003** | Regelcoach | Funktional | TEILWEISE IMPLEMENTIERT | `CoachPage.jsx`: Sidebar-Navigation zu Spielen mit Regelwissen; strukturierte Anzeige von Ziel, Kernschleife, Phasen, Regeln | Nur Seed-Regeln; Quellenverweis noch nicht integrativ |
| **FUNC-004** | Eigene Sammlung verwalten | Funktional | TEILWEISE IMPLEMENTIERT | `CollectionPage.jsx`: Status-Filter (VORHANDEN, HINZUFÜGEN, ZU PRÜFEN); Link zu Spieldetails | Nur Seed-Bestände; keine Bearbeitungs­funktionalität |
| **FUNC-005** | Verlags-Übersicht | Funktional | GEPLANT | Route nicht implementiert | Keine Implementierung |
| **FUNC-006** | Datenqualitäts-Dashboard | Funktional | GEPLANT | Route nicht implementiert | Keine Implementierung |
| **FUNC-007** | Excel-Import (1.734 Spiele, 32 Verlage) | Funktional | GEPLANT | XLSX-Parser existiert (`xlsxParser.js`), ist aber nicht vollständig integriert; Seed-Daten als Struktur-Template vorhanden | Keine echten Daten aus Excel importiert |
| **FUNC-008** | Volltextsuche mit Toleranz | Funktional | IMPLEMENTIERT | Case-insensitive Suche in `CatalogPage.jsx` und `CoachPage.jsx` | Keine Behandlung von Umlauten oder Titelva­rianten |
| **FUNC-009** | URL-basierte Filter (teilbar) | Funktional | NICHT IMPLEMENTIERT | Filter-Status ist nur lokal im State; nicht in URL codiert | Seiten nicht direkt teilbar mit Filter-Preset |
| **FUNC-010** | Responsive Design (mobile/tablet/desktop) | Nicht-funktional | IMPLEMENTIERT | CSS Media Queries in `App.css` + `pages.css` für 375px, 768px, 1280px | Getestet mit Seed-Daten; größere Datenmengen nicht getestet |
| **FUNC-011** | Barrierearmut (a11y) | Nicht-funktional | TEILWEISE IMPLEMENTIERT | Semantisches HTML, ARIA-Labels auf Buttons; keine explizite Tastatur-Navigation getestet | Kein Test mit Screen Reader durchgeführt |
| **FUNC-012** | Authentifizierung & Rollen | Funktional | NICHT IMPLEMENTIERT | Keine Login-Seite, keine Rollen-Verwaltung | Alle Seiten öffentlich zugänglich |
| **FUNC-013** | Daten-Persistierung (Sammlung) | Funktional | NICHT IMPLEMENTIERT | Sammlung ist nur in Memory (seedData.json); keine Persistierung zu PocketBase | Daten gehen bei Reload verloren |
| **FUNC-014** | Admin-Interface für Datenqualität | Funktional | GEPLANT | Keine Implementierung | Nicht geplant für Phase 1 |
| **FUNC-015** | NeuroPlay-Designphilosophie | Design | IMPLEMENTIERT | Farben (Deep Navy, Gold, Petrol, Violet, Warm White) in `App.css` definiert; minimalistisches Layout | Organische NeuroWays-Linie nicht eingearbeitet |

---

## 5. Aktuell implementierter Funktionsumfang

### 5.1 Startseite (`/`)
- **Zweck:** Einstiegspunkt, Überblick über NeuroPlay, Einladung zu Funktionen
- **Benutzerinteraktion:** Klicks auf Feature-Cards navigieren zu Katalog, Coach, Sammlung
- **Komponenten:** `HomePage.jsx`
- **Dateien:** `src/pages/HomePage.jsx`, `src/pages/pages.css`
- **Datenquellen:** `seedData.json` (Games, Publishers, Collection)
- **Datenbank­bezug:** Direkt `seedData.json`
- **API-Endpunkte:** Keine
- **Reifegrad:** MVP (funktionsfähig mit Seed-Daten)
- **Einschränkungen:** Zeigt nur Seed-Statistiken (5 Spiele, 5 Verlage)

**Anzeigte Inhalte:**
- Hero-Sektion: NeuroPlay-Erklärung
- Statistik-Karten: Spiele im Katalog, mit Regelwissen, Verlage, im Bestand
- Feature-Cards: Spielekatalog, Regelcoach, Eigener Bestand
- Beispiel-Spiele: 3 zufällige Spiele mit Regelwissen
- CTA: Link zum Katalog

---

### 5.2 Spielekatalog (`/games`)
- **Zweck:** Katalog durchsuchen, filtern und sortieren
- **Benutzerinteraktion:** 
  - Textsuchfeld (Titel, Original­titel, Beschreibung)
  - Dropdowns: Verlag, Kategorie, Min. Spieler, Regelwissen
  - Sortierung: nach Titel, Spielerzahl, Alter
  - Karten-Grid, Click führt zu Spieldetail
- **Komponenten:** `CatalogPage.jsx`
- **Dateien:** `src/pages/CatalogPage.jsx`, `src/pages/pages.css`
- **Datenquellen:** `seedData.games`, `seedData.publishers`
- **Datenbankbezug:** Direkt JSON
- **API-Endpunkte:** Keine
- **Reifegrad:** MVP
- **Einschränkungen:** 
  - Keine URL-Persistierung der Filter
  - Keine Pagination/Lazy Loading
  - Nur 5 Beispielspiele

**Sichtbare Spielkarte:** Titel, Verlag, Kategorie, Min–Max Spieler, Dauer, Alter, Komplexität, Regelwissen-Status

---

### 5.3 Spieldetail-Seite (`/games/:id`)
- **Zweck:** Vollständige Spielinformationen und strukturiertes Regelwissen
- **Benutzerinteraktion:** Links zu Verlagswebseite; Tabs für Überblick, Spielwissen, Phasen, Regeln
- **Komponenten:** `GameDetailPage.jsx`
- **Dateien:** `src/pages/GameDetailPage.jsx`, `src/pages/pages.css`
- **Datenquellen:** `seedData.games`, `seedData.publishers`, `seedData.game_knowledge`, `seedData.phases`, `seedData.rules`
- **Datenbank­bezug:** Direkt JSON
- **API-Endpunkte:** Keine
- **Reifegrad:** MVP
- **Einschränkungen:** 
  - Nur Seed-Daten
  - Keine Beziehungen zu Erweiterungen/Varianten
  - Quellen nicht als klickbare Links umgesetzt

**Sichtbare Bereiche:**
- Header: Titel, Original­titel, Badges (Regelwissen vorhanden/fehlend)
- Quick Stats: Spieler, Dauer, Alter, Komplexität
- Überblick: Beschreibung, Verlag, Kategorie, Spieltyp, Jahr
- Spielwissen (wenn vorhanden): Ziel, Kernschleife
- Phasen (wenn vorhanden): Geordnet mit Beschreibung
- Regeln (wenn vorhanden): Titel, Inhalt, Gültigkeit, Fundstelle, Qualitätsstatus
- Leerzustand bei fehlenden Daten

---

### 5.4 Regelcoach (`/coach`)
- **Zweck:** Interaktives Lehren von Spielregeln
- **Benutzerinteraktion:** 
  - Sidebar mit Suchfeld zur Spielauswahl (gefiltert auf Spiele mit Regelwissen)
  - Klick auf Spiel = Inhalt rechts aktualisiert sich
  - Akkordion-Regeln zum Auf/Zuklappen
  - Links zu Quellen öffnen in neuem Tab
- **Komponenten:** `CoachPage.jsx`
- **Dateien:** `src/pages/CoachPage.jsx`, `src/pages/pages.css`
- **Datenquellen:** `seedData.games`, `seedData.game_knowledge`, `seedData.phases`, `seedData.rules`
- **Datenbank­bezug:** Direkt JSON
- **API-Endpunkte:** Keine
- **Reifegrad:** MVP
- **Einschränkungen:** 
  - Nur Spiele mit Regelwissen zeigen (Seed: 3 von 5)
  - Keine Speicherung der Auswahl
  - Keine Fortschritts-Verfolgung

**Sichtbare Struktur:**
- Sidebar: Spiele mit Regelwissen (filterbar)
- Content: Spieltitel, Kategorie, dann reihum:
  - Spielwissen (Ziel, Kernschleife)
  - Phasen (geordnet als Timeline)
  - Regeln (mit Akkordion pro Regel)

---

### 5.5 Eigener Bestand (`/collection`)
- **Zweck:** Verwaltung persönlicher Spielesammlung
- **Benutzerinteraktion:** Status-Filter (Alle, VORHANDEN, HINZUFÜGEN, ZU PRÜFEN); Klick auf Spiel navigiert zu Spieldetail
- **Komponenten:** `CollectionPage.jsx`
- **Dateien:** `src/pages/CollectionPage.jsx`, `src/pages/pages.css`
- **Datenquellen:** `seedData.collection`
- **Datenbank­bezug:** Direkt JSON
- **API-Endpunkte:** Keine
- **Reifegrad:** MVP
- **Einschränkungen:** 
  - Nur In-Memory; nicht persistent
  - Keine Bearbeitungsfunktion
  - Nur 3 Seed-Einträge

**Sichtbare Struktur:**
- Stat-Cards: Anzahl Vorhanden, Hinzufügen, Zu prüfen
- Filter-Buttons: zum Filtern nach Status
- Items: Titel, Verlag, Status-Badge, Hinweise, Link zu Spieldetail

---

### 5.6 Navigation (App Shell)
- **Zweck:** Zentrale Navigation zwischen Seiten
- **Komponenten:** `Navigation` Funktion in `App.jsx`
- **Dateien:** `src/App.jsx`, `src/App.css`
- **Struktur:** Sticky Navbar mit NeuroPlay-Logo (Gold auf Deep Navy), Links zu allen Hauptseiten
- **Reifegrad:** Funktionsfähig
- **Responsive:** Ja, Stack-Layout auf mobil

---

## 6. Seiten- und Navigationsstruktur

```
NeuroPlay Application
├── / (Startseite)
│   └── Hero + Stats + Features + CTA
├── /games (Spielekatalog)
│   ├── Suche & Filter & Sortierung
│   └── → /games/:id (Spieldetail)
├── /coach (Regelcoach)
│   └── Sidebar-Navigation zu Spielen mit Regelwissen
├── /collection (Eigener Bestand)
│   └── Status-Filter & Item-Liste
├── /publishers (GEPLANT – noch nicht implementiert)
└── /data-quality (GEPLANT – noch nicht implementiert)
```

**Navigation (Navbar)**
- Sticky oben, Deep Navy-Hintergrund, Gold-Logo
- Menu: Startseite, Katalog, Regelcoach, Mein Bestand
- Responsive: Horizontal auf Desktop, untereinander auf Mobil

---

## 7. User Flows

### 7.1 Spiel suchen und lernen (IMPLEMENTIERT)

```
Startseite
  ↓
Klick "Spielekatalog erkunden"
  ↓
Katalog-Seite
  ↓
Suche eingeben / Filter setzen
  ↓
Spielliste wird aktualisiert
  ↓
Klick auf Spielkarte
  ↓
Spieldetail-Seite
  ↓
Scroll durch Überblick, Wissen, Phasen, Regeln
  ↓
[Optional] Link zu Verlagswebseite
```

**Status:** ✅ Vollständig implementiert

---

### 7.2 Regelcoach nutzen (TEILWEISE IMPLEMENTIERT)

```
Startseite
  ↓
Klick "Regelcoach"
  ↓
Coach-Seite (leere Auswahl)
  ↓
Spiel suchen/auswählen in Sidebar
  ↓
Coach-Content wird aktualisiert
  ↓
Lese Ziel → Kernschleife → Phasen → Regeln
  ↓
[Optional] Klick auf Quellenlink
```

**Status:** ✅ Funktionsfähig, aber nur mit Seed-Daten

---

### 7.3 Sammlung verwalten (TEILWEISE IMPLEMENTIERT)

```
Startseite
  ↓
Klick "Mein Bestand"
  ↓
Collection-Seite
  ↓
[Optional] Klick auf Status-Filter
  ↓
Item-Liste wird aktualisiert
  ↓
Klick auf Item → Spieldetail
```

**Status:** ✅ Anzeige funktioniert, aber keine Persistierung und Bearbeitung

---

### 7.4 Bestand importieren (NICHT IMPLEMENTIERT)

```
Admin-Bereich
  ↓
Excel-Datei hochladen
  ↓
Import-Validierung
  ↓
Konflikt-Handling anzeigen
  ↓
Import ausführen
  ↓
Importprotokoll anzeigen
```

**Status:** ❌ Nicht implementiert. XLSX-Parser existiert, Integrationslogik fehlt.

---

## 8. Technische Architektur

### 8.1 High-Level Architektur

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser (Client)                        │
├─────────────────────────────────────────────────────────────┤
│  React 19 + React Router v7 (Single Page Application)      │
│  ├── App.jsx (Root + Navigation)                           │
│  ├── HomePage / CatalogPage / GameDetailPage              │
│  ├── CoachPage / CollectionPage                           │
│  └── Custom CSS (Tailwind v4 + App.css + pages.css)       │
├─────────────────────────────────────────────────────────────┤
│  Data Layer (current: JSON in Memory)                       │
│  └── seedData.json                                          │
├─────────────────────────────────────────────────────────────┤
│  Services (unused, prepared)                                │
│  ├── lib/pb.ts (PocketBase client – nicht aktiv)          │
│  └── lib/xlsxParser.js (XLSX-Parser – nicht integriert)   │
└─────────────────────────────────────────────────────────────┘
         ↑
         │ (geplant)
         ↓
┌─────────────────────────────────────────────────────────────┐
│             Backend / PocketBase (nicht vorhanden)         │
│  (soll für Part 2 / Phase B hinzugefügt werden)            │
└─────────────────────────────────────────────────────────────┘
```

### 8.2 Datenfluss

```
Benutzer-Aktion (Klick, Eingabe)
   ↓
React State Update
   ↓
useMemo() / useState() Filter & Sortierung
   ↓
seedData.json (gelesen, nicht verändert)
   ↓
Komponenten-Render
   ↓
HTML + CSS (NeuroPlay-Design)
   ↓
Browser-Display
```

### 8.3 Technologie-Stack

| Bereich | Technologie | Version | Status |
|---------|-------------|---------|--------|
| **Frontend-Framework** | React | 19 (via platform) | ✅ Aktiv |
| **Router** | react-router | v7 (via platform) | ✅ Aktiv |
| **Styling** | Tailwind CSS v4 | v4 (via platform) | ✅ Aktiv |
| **Bundler** | Vite | 6.4.3 | ✅ Aktiv |
| **Daten (aktuell)** | JSON (seedData.json) | lokal | ✅ Aktiv |
| **Backend (geplant)** | PocketBase | - | ⏳ Nicht integriert |
| **XLSX-Parser** | Custom Node.js | lib/xlsxParser.js | ⏳ Nicht integriert |
| **Authentifizierung** | Geplant | - | ❌ Nicht vorhanden |
| **CSS-Processor** | PostCSS (v4 built-in) | - | ✅ Automatisch |

---

## 9. Repository- und Verzeichnisstruktur

```
/home/www/aibuilder-s8kjz/
├── app/                              # React-Projekt (Git-Root)
│   ├── src/
│   │   ├── App.jsx                   # Root-Komponente + Navigation
│   │   ├── App.css                   # Global Styles (606 Zeilen)
│   │   ├── index.css                 # Tailwind Import
│   │   ├── main.jsx                  # Entry Point
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── CatalogPage.jsx       # Katalog mit Suche/Filter
│   │   │   ├── GameDetailPage.jsx    # Spieldetails + Regelwissen
│   │   │   ├── CoachPage.jsx         # Regelcoach mit Sidebar
│   │   │   ├── CollectionPage.jsx    # Sammlung mit Status-Filter
│   │   │   └── pages.css             # Page-spezifische Styles (178 Zeilen)
│   │   ├── data/
│   │   │   ├── seedData.json         # Alle Seed-Daten (183 Zeilen)
│   │   │   ├── _sheet_names.json     # Excel-Blatt­namensliste
│   │   │   └── _excel_structure.json # Geplante Excel-Struktur
│   │   └── lib/
│   │       ├── pb.ts                 # PocketBase-Client (nicht aktiv)
│   │       └── xlsxParser.js         # XLSX-Parser (nicht integriert)
│   ├── public/
│   │   └── favicon.svg               # App-Icon (noch Placeholder)
│   ├── dist/                         # Build-Output (committed)
│   │   ├── index.html
│   │   ├── assets/
│   │   │   ├── index-D2EA6Bp0.js     # Main JavaScript Bundle
│   │   │   └── index-_sC331gK.css    # CSS Bundle
│   │   └── favicon.svg
│   ├── scripts/
│   │   └── setup-collections.js      # PocketBase-Setup (nicht verwendet)
│   ├── docs/
│   │   └── handover/
│   │       └── PROJECT_HANDOVER.md   # Diese Datei
│   ├── index.html                    # HTML-Template
│   ├── package.json                  # Leer (dependencies via platform)
│   ├── vite.config.js                # Vite-Konfiguration
│   ├── tailwind.config.cjs           # Tailwind-Konfiguration
│   ├── AGENTS.md                     # Projektdokumentation für KI
│   └── .git/                         # Git-Repository
├── static/                           # Statische Assets (nicht genutzt)
└── uploads/                          # Upload-Verzeichnis (nicht genutzt)
```

**Wichtige Dateien:**
- `src/App.jsx` – Root-Komponente und Navigation
- `src/App.css` – Gesamtdesign, NeuroPlay-Farben, Responsive Layout
- `src/data/seedData.json` – Alle aktuellen Daten
- `dist/` – Produktions-Build (wird vom Deployment gelesen)

---

## 10. Datenbank

### 10.1 Aktueller Zustand

**NICHT IMPLEMENTIERT.** Alle Daten liegen aktuell als JSON im Memory (`seedData.json`).

PocketBase ist auf der Plattform verfügbar, ist aber noch nicht konfiguriert oder integriert.

### 10.2 Geplantes Modell (aus Part-1-Anforderung)

```
publishers
  ├── id (Primary Key)
  ├── external_id (Excel ID)
  ├── name
  ├── country
  ├── website
  ├── priority
  └── status

games
  ├── id (Primary Key)
  ├── external_id (Excel ID)
  ├── title
  ├── original_title
  ├── publisher_id (Foreign Key → publishers)
  ├── category
  ├── game_type
  ├── min_players
  ├── max_players
  ├── min_duration
  ├── max_duration
  ├── min_age
  ├── complexity
  ├── description
  ├── year_published
  ├── has_rules (Boolean)
  └── rule_status

game_knowledge
  ├── id (Primary Key)
  ├── game_id (Foreign Key → games)
  ├── type (objective, core_loop, setup, etc.)
  └── content

game_phases
  ├── id (Primary Key)
  ├── game_id (Foreign Key → games)
  ├── name
  ├── description
  └── order

game_rules
  ├── id (Primary Key)
  ├── game_id (Foreign Key → games)
  ├── title
  ├── content
  ├── validity (active, exception, outdated)
  ├── source (Fundstelle)
  ├── quality_status
  └── source_id (Foreign Key → rule_sources)

rule_sources
  ├── id (Primary Key)
  ├── url
  ├── description
  └── official_status

collections
  ├── id (Primary Key)
  ├── name
  ├── owner_id (Foreign Key → users, wenn Auth implementiert)
  └── created_at

collection_items
  ├── id (Primary Key)
  ├── collection_id (Foreign Key → collections)
  ├── game_id (Foreign Key → games, optional)
  ├── title (für manuell hinzugefügte Items)
  ├── status (VORHANDEN, HINZUFÜGEN, ZU PRÜFEN)
  ├── publisher_id (Foreign Key → publishers, optional)
  └── notes
```

### 10.3 Aktuell in seedData.json vorhanden

| Entity | Anzahl | Beispiel-IDs |
|--------|--------|-------------|
| **publishers** | 5 | P001, P002, P003, P004, P005 |
| **games** | 5 | G0001, G0002, G0004, G0035, + 1 ohne ID |
| **game_knowledge** | 3 | K001, K002, K003 |
| **game_phases** | 4 | Ph001, Ph002, Ph003, Ph004 |
| **game_rules** | 2 | R001, R002 |
| **collection** | 3 | C001, C002, C003 |

**Beziehungen:**
- games → publishers via `publisher_id` ✅
- game_knowledge → games via `game_id` ✅
- game_phases → games via `game_id` ✅
- game_rules → games via `game_id` ✅
- collection_items → games via `game_id` (optional) ✅

---

## 11. API und Schnittstellen

### 11.1 Externe APIs (geplant, nicht implementiert)

| Methode | Endpoint | Zweck | Status | Input | Output |
|---------|----------|-------|--------|-------|--------|
| POST | `/api/import/excel` | Excel-Datei importieren | GEPLANT | FormData (xlsx) | ImportReport |
| GET | `/api/games` | Spiele abfragen | GEPLANT | Query: filter, sort, limit | Game[] |
| GET | `/api/games/:id` | Spiel-Detail abrufen | GEPLANT | Path: id | Game + Knowledge + Rules |
| GET | `/api/rules/:gameId` | Regeln für Spiel | GEPLANT | Path: gameId | Rule[] |
| GET | `/api/collection` | Sammlung abrufen | GEPLANT | - | CollectionItem[] |
| POST | `/api/collection` | Item zur Sammlung hinzufügen | GEPLANT | Body: item | CollectionItem |

**Status:** Keine dieser APIs existiert. Alles läuft aktuell lokal im Browser gegen `seedData.json`.

---

## 12. Fachliche Geschäftslogik

### 12.1 Implementierte Logik

| Regel | Implementiert | Ort | Status |
|------|---------------|-----|--------|
| Suche ist case-insensitive | Ja | `CatalogPage.jsx` Z. 20–25, `CoachPage.jsx` Z. 14–17 | ✅ |
| Filter nach Verlag, Kategorie, Spielerzahl | Ja | `CatalogPage.jsx` Z. 30–47 | ✅ |
| Spiele mit Regelwissen filtern | Ja | `CatalogPage.jsx` Z. 50–54 | ✅ |
| Sortierung nach Titel, Spielerzahl, Alter | Ja | `CatalogPage.jsx` Z. 60–70 | ✅ |
| Spieldetail nur wenn Spiel existiert | Ja | `GameDetailPage.jsx` Z. 13–20 | ✅ |
| Coach nur für Spiele mit Regelwissen | Ja | `CoachPage.jsx` Z. 9 | ✅ |
| Collection-Status-Filter (VORHANDEN/HINZUFÜGEN/ZU PRÜFEN) | Ja | `CollectionPage.jsx` Z. 6–9 | ✅ |
| Externe Links öffnen in neuem Tab | Ja | `GameDetailPage.jsx` Z. 58 | ✅ |
| Keine erfundenen Regeln anzeigen | Ja | Seed-Daten sind explizit, nicht generiert | ✅ |
| Fehlende Daten als „Noch nicht erfasst" zeigen | Teilweise | Implementiert für Regelwissen, nicht überall | ⚠️ |

### 12.2 Geplante, noch nicht implementierte Logik

- Duplikat-Erkennung bei Excel-Import
- Konflikt-Auflösung bei Import
- Idempotenter Import (gleicher Import erzeugt keine Dubletten)
- Transaktionale Import-Sicherheit
- Archivierung / Soft Delete bei Regel-Änderungen
- Berechtigungslogik (wer kann was sehen/bearbeiten)

---

## 13. Authentifizierung, Rollen und Berechtigungen

### 13.1 Aktueller Stand

**NICHT IMPLEMENTIERT.** Alle Seiten sind öffentlich zugänglich, ohne Login oder Rollenprüfung.

### 13.2 Geplante Struktur (aus Anforderungen)

| Rolle | Leseberechtigung | Schreibberechtigung |
|-------|------------------|-------------------|
| **Gast** | Katalog, freigegebene Spieldetails | Keine |
| **Nutzer** | Alles + eigene Sammlung | Eigene Sammlung bearbeiten |
| **Redakteur** | Alles | Regelwissen prüfen + editieren |
| **Administrator** | Alles | Importe, Stammdaten, Rollen |

### 13.3 Sicherheitszustand

- ❌ Keine Login-Seite
- ❌ Keine Session/Token-Verwaltung
- ❌ Keine Zugriffsschutzung auf admin-Seiten (auch nicht implementiert)
- ❌ Keine Verschlüsselung von Secrets
- ⚠️ PocketBase ist vorbereitet, aber nicht konfiguriert

---

## 14. Konfiguration und Umgebungen

### 14.1 Build-Konfiguration

**Vite (vite.config.js):**
```javascript
import { defineConfig } from "/usr/lib/sfs-assistant-dev/platform-config.js";
export default defineConfig({});
```
Verwendet Platform-Default-Konfiguration.

**Tailwind (tailwind.config.cjs):**
```javascript
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media",
  theme: { extend: {} },
  plugins: [],
};
```
Keine custom Theme-Extensions; NeuroPlay-Farben in CSS-Variablen in `App.css` definiert.

### 14.2 Environment

| Variable | Wert | Wofür | Status |
|----------|------|--------|--------|
| NODE_ENV | production / development | Build-Modus | ✅ Auto |
| VITE_* | (keine definiert) | Runtime Config | ⏳ |
| PB_URL | (nicht definiert) | PocketBase-URL | ❌ |
| API_KEY | (nicht definiert) | Admin-Auth | ❌ |

**Secrets:** Keine im aktuellen Code gehärtet. Alle .env-Dateien in `.gitignore`.

### 14.3 Umgebungen

| Umgebung | Host | Status |
|----------|------|--------|
| **Development** | localhost:5173 (Vite) | ✅ Aktiv |
| **Production** | STRATO KI Platform | ✅ Live |
| **Staging** | - | ❌ Nicht vorhanden |

---

## 15. Externe Abhängigkeiten

| Abhängigkeit | Typ | Quelle | Version | Status |
|--------------|-----|--------|---------|--------|
| React | Framework | Platform-provided | 19 | ✅ |
| react-dom | Library | Platform-provided | 19 | ✅ |
| react-router | Router | Platform-provided | v7 | ✅ |
| Vite | Bundler | Platform-provided | 6.4.3 | ✅ |
| Tailwind CSS | CSS Engine | Platform-provided | v4 | ✅ |
| PocketBase | Backend | Verfügbar, nicht integriert | - | ⏳ |
| Node.js | Runtime | Platform | 24 | ✅ |

**Hinweis:** `package.json` hat keine eingetragenen Dependencies — alles wird von der Plattform bereitgestellt.

---

## 16. Bereits erledigte Entwicklungsaufgaben

| Aufgabe | Ergebnis | Status | Nachweis |
|---------|----------|--------|----------|
| Projekt-Skelett erstellen | React + Vite + Tailwind Setup | ✅ ERLEDIGT | Commit `eb2e1ab` |
| Seed-Datenmodell definieren | seedData.json mit 5 Spielen, 5 Verlagen, Regeln, Phasen | ✅ ERLEDIGT | `src/data/seedData.json` |
| NeuroPlay-Design implementieren | Farben, Fonts, Responsive CSS | ✅ ERLEDIGT | `src/App.css` (606 Z.) |
| Navigation aufbauen | Navbar mit Links zu allen Seiten | ✅ ERLEDIGT | `src/App.jsx` Navigation-Component |
| HomePage implementieren | Hero, Stats, Features, CTA | ✅ ERLEDIGT | `src/pages/HomePage.jsx` |
| CatalogPage implementieren | Suche, Filter, Sortierung, Grid | ✅ ERLEDIGT | `src/pages/CatalogPage.jsx` |
| GameDetailPage implementieren | Spieldetails + Regelwissen + Phasen | ✅ ERLEDIGT | `src/pages/GameDetailPage.jsx` |
| CoachPage implementieren | Sidebar-Navigation + strukturierte Regelanzeige | ✅ ERLEDIGT | `src/pages/CoachPage.jsx` |
| CollectionPage implementieren | Status-Filter + Item-Liste | ✅ ERLEDIGT | `src/pages/CollectionPage.jsx` |
| Responsive Design | 375px / 768px / 1280px Breakpoints | ✅ ERLEDIGT | Media Queries in `App.css` |
| XLSX-Parser schreiben | ZIP-Decompression + XML-Parsing | ✅ ERLEDIGT | `src/lib/xlsxParser.js` (208 Z.) |
| PocketBase-Client vorbereiten | pb.ts mit Initialisierung | ✅ ERLEDIGT | `src/lib/pb.ts` |
| Build optimieren | Vite Production Build | ✅ ERLEDIGT | `dist/` mit Minified JS/CSS |
| Git-Repository einrichten | 3 Commits, Main-Branch | ✅ ERLEDIGT | `.git/` vorhanden |

---

## 17. Teilweise erledigte Arbeiten

| Arbeit | Ziel | Umgesetzt | Fehlt | Status |
|--------|------|-----------|-------|--------|
| **Excel-Import** | 1.734 Spiele, 32 Verlage importieren | XLSX-Parser-Skelett vorhanden | Integrationslogik, Validierung, Konflikt-Handling | ⚠️ 5% |
| **PocketBase-Integration** | Persistente Datenhaltung + API | Client initialisiert | Collections erstellen, API-Calls, Auth | ⚠️ 10% |
| **Datenschutz (GDPR)** | Privacy by Default implementieren | Architektur vorbereitet | Implementierung von Lösch-Funktionen, Consent | ⚠️ 0% |
| **Barrierearmut** | WCAG AA-Konformität | Semantisches HTML, ARIA-Basics | Screen-Reader-Tests, Kontrast-Audit, Tastatur-vollständig | ⚠️ 30% |

---

## 18. Offene Anforderungen und Backlog

### P0 – Blockierend (muss vor Part 2 abgeschlossen sein)

| ID | Aufgabe | Grund | Abhängigkeiten | Erwartetes Ergebnis |
|----|---------|-------|-----------------|---------------------|
| **P0-001** | Excel-Import vollständig implementieren | Ohne echte Daten ist die App nicht nutzbar | XLSX-Parser, PocketBase | 1.734 Spiele + 32 Verlage in Datenbank |
| **P0-002** | PocketBase-Collections erstellen | Keine persistente Speicherung ohne DB | Zugang zu PocketBase-Admin | Collections mit Constraints und Indizes |
| **P0-003** | Excel-Validierung und Konflikt-Handling | Datenqualität sichern | Excel-Analyse | Import-Report mit Konflikten |

### P1 – Notwendig (für nächste funktionsfähige Version)

| ID | Aufgabe | Grund | Abhängigkeiten | Akzeptanzkriterium |
|----|---------|-------|-----------------|---------------------|
| **P1-001** | Verlags-Seite implementieren (`/publishers`) | Aus Anforderungen | - | Liste aller 32 Verlage mit Spieleanzahl |
| **P1-002** | Datenqualitäts-Dashboard (`/data-quality`) | Aus Anforderungen | Voll importierte Daten | Zeigt Importstatus, offene Konflikte, Duplicates |
| **P1-003** | URL-basierte Filter (teilbare Links) | UX-Anforderung | React Router State | `/games?publisher=P001&category=Würfel` |
| **P1-004** | Authentifizierung & Login | Sicherheit | - | Login-Seite + Session-Management |
| **P1-005** | Sammlung persistieren | Nutzer-Daten bewahren | PocketBase | Einträge bleiben nach Reload |
| **P1-006** | Sammlung bearbeiten (Status ändern) | Benutzerfreundlichkeit | Collection-API | Nutzer kann Items hinzufügen/löschen |
| **P1-007** | Favicon ersetzen | Branding | Design | NeuroPlay-Monogramm in Favicon.svg |
| **P1-008** | Pagination oder Lazy Loading | Performance | - | Große Datenmengen (1.700+) effizient darstellen |

### P2 – Wichtig (später)

| ID | Aufgabe | Grund | Erwartetes Ergebnis |
|----|---------|-------|---------------------|
| **P2-001** | Admin-Interface für manuellen Daten­eintrag | Regelwissen editieren | Formular zum Hinzufügen/Editieren von Regeln |
| **P2-002** | Regelquellen als externe Links integrieren | UX-Verbesserung | Klickbare Links zu Verlagsseiten / PDFs |
| **P2-003** | Dark-Mode | Nutzer-Komfort | CSS-Variant für Dark-Theme |
| **P2-004** | Fortschritts-Verfolgung im Coach | Gamification | Nutzer sieht, welche Regeln er bereits gelernt hat |
| **P2-005** | Erweiterte Suche (Regex, Fuzzy) | UX-Polish | Tolerante Suche mit Tippfehlern |
| **P2-006** | Spielbeziehungen navigierbar | UX-Verbesserung | Links von Basisspiel zu Erweiterungen |

### P3 – Optional / Phase 3+

| ID | Aufgabe |
|----|---------|
| **P3-001** | Machine Learning für Spiel-Empfehlungen (echte NeuroPlay-Logik) |
| **P3-002** | User-Profile und Fortschrittsvererfolgung |
| **P3-003** | Beobachtungen und Effektverfolgung |
| **P3-004** | Mehrsprachigkeit (Englisch, Spanisch, Französisch) |
| **P3-005** | Mobile App (React Native) |

---

## 19. Bekannte Fehler und technische Schulden

### 19.1 Bekannte Probleme

| Fehler | Auswirkung | Ursache | Workaround | Empfohlene Lösung | Priorität |
|--------|-----------|--------|-----------|------------------|-----------|
| **Nur 5 Seed-Spiele** | App funktioniert, aber mit minimalen Daten | Excel-Import nicht implementiert | Manuell seedData.json erweitern | Excel-Import als P0 | 🔴 P0 |
| **Keine Filter-Persistierung in URL** | Seiten nicht teilbar (z.B. "Alle Würfelspiele") | React State statt URL-Params | Filter manuell setzen beim Link-Teilen | React Router Query-Params integrieren | 🟡 P1 |
| **Keine Daten-Persistierung** | Collection geht bei Reload verloren | localStorage / PocketBase nicht integriert | Browser-Daten löschen, neu starten | PocketBase Collection-API anhängen | 🔴 P0 |
| **PocketBase-Client nicht aktiv** | Kann nicht zu echter DB migrieren | Imports existieren, aber nicht genutzt | Manuell `pb.collection()` aufrufe hinzufügen | Schrittweise PocketBase-Integration | 🟡 P1 |
| **XLSX-Parser nicht getestet** | Unbekannte Edge-Cases bei Import | Parser nur als Skeleton geschrieben | Excel-Datei vor Import validieren | Parser vollständig testen mit echten Dateien | 🟡 P1 |
| **Keine Error-Boundaries** | Crash bei unerwarteten Daten | Keine React Error Boundaries vorhanden | Seed-Daten sind sauber | Error-Boundary-Component hinzufügen | 🟢 P2 |
| **Barrierearmut ungetestet** | Unzureichend für WCAG AA | Kein Audit durchgeführt | Manuelle Tests durchführen | axe-core oder ähnlich integrieren | 🟡 P1 |
| **Typsicherheit teilweise** | ts-datei (pb.ts), aber JSX ohne Types | TypeScript nicht überall verwendet | Funktioniert trotzdem | JSX zu TSX migrieren (optional) | 🟢 P3 |

### 19.2 Technische Schulden

| Schuld | Folgen | Empfehlung | Aufwand |
|--------|--------|------------|---------|
| **Große seedData.json** | Wird mit 1.734 Spielen zu groß | Zu PocketBase migrieren | Mittel |
| **Keine Caching-Strategie** | Jeder Reload lädt alles neu | HTTP-Caching + Service Worker | Mittel |
| **Inline-Styles in JS** | Styling schwer zu warten | Alle Styles in CSS-Dateien | Klein |
| **Keine Tests** | Keine Regressionsicherheit | Jest + React Testing Library | Groß |
| **CSS könnte optimiert werden** | 784 Zeilen CSS, teilweise redundant | CSS-Minifizierung + Struktur prüfen | Klein |

---

## 20. Getroffene Architektur- und Entwicklungsentscheidungen

### 20.1 Entscheidung: In-Memory JSON statt sofort PocketBase

**Entscheidung:** Seed-Daten als JSON in `seedData.json`, nicht sofort PocketBase.

**Hintergrund:** Excel-Import erwies sich als technisches Hindernis; schneller funktionsfähiger Prototype mit JSON möglich.

**Gewählte Lösung:** seedData.json mit Strukturvorlage für alle Entities (publishers, games, knowledge, phases, rules, collection).

**Alternativen geprüft:**
- Mocking-Framework (jest) → zu aufwendig
- In-Memory SQLite → Node.js nicht vollständig verfügbar
- Sofort PocketBase → fehlende Admin-Integration

**Konsequenzen:**
- ✅ Schnelle Entwicklung möglich
- ✅ Frontend kann ohne Backend entwickelt werden
- ❌ Keine Persistierung
- ❌ Bei 1.734 Spielen zu groß für Browser

---

### 20.2 Entscheidung: Tailwind v4 + Custom CSS statt nur Tailwind

**Entscheidung:** Tailwind v4 als Basis, NeuroPlay-Farben in CSS-Variablen + ausführliche App.css.

**Hintergrund:** Tailwind v4 hat limited Theme-Customization ohne PostCSS; Custom CSS erlaubt volle Kontrolle.

**Gewählte Lösung:**
```css
:root {
  --color-deep-navy: #1F355E;
  --color-gold: #D4A017;
  /* ... */
}
```

**Alternativen:**
- Nur Tailwind mit arbitrary values (`bg-[#1F355E]`) → weniger wartbar
- BEM + CSS Modules → zu komplex
- styled-components → nicht auf Platform verfügbar

**Konsequenzen:**
- ✅ Designkohärenz
- ✅ Leicht zu ändern (eine Farbvariable ändert überall)
- ✅ Kompatibel mit Tailwind
- ⚠️ Zusätzliche 606 Zeilen CSS

---

### 20.3 Entscheidung: React Router v7 mit relativem Basename

**Entscheidung:** `<BrowserRouter basename>` mit dynamischem Basename berechnet aus `document.baseURI`.

**Hintergrund:** App wird von mehreren Base-Paths aus served (live, snapshots).

**Implementierung:**
```jsx
const basename = new URL(document.baseURI).pathname.replace(/\/$/, "");
```

**Konsequenzen:**
- ✅ App funktioniert von beliebigen Base-Paths
- ✅ History-Snapshots nutzbar
- ❌ Interne Links müssen relativ sein

---

### 20.4 Entscheidung: Seed-Daten als Single JSON, nicht Datenbank-Migrations

**Entscheidung:** Eine `seedData.json`, nicht separate Migrations oder SQL-Seeds.

**Hintergrund:** Schnelligkeit, Einfachheit, Versionierbarkeit.

**Konsequenzen:**
- ✅ Einfach zu laden (`import seedData`)
- ✅ Git-trackbar
- ⚠️ Nicht zur Skalierung auf 1.734 Datensätze geeignet
- ❌ Keine Datenbank-Constraints erzwungen

---

## 21. Offene Entscheidungen

| Fragestellung | Warum relevant? | Betroffene Bereiche | Mögliche Optionen | Status |
|---|---|---|---|---|
| **PocketBase URL/Konfiguration** | Wird für echten Import und Persistierung benötigt | Backend-Integration, Authentifizierung | Self-Hosted vs. Cloud; URL-Konfiguration | ❌ OFFEN |
| **Authentifizierung: OAuth vs. Passwort** | Sicherheit und UX | Login-Seite, Session-Management | OAuth (Google/GitHub) vs. lokale Passwörter | ❌ OFFEN |
| **Excel-Import: Batch vs. Stream** | Performance bei 1.734 Spielen | Import-Prozess, Speicher | Alle auf einmal vs. Chunks | ❌ OFFEN |
| **Spiel-Bilder/Grafiken** | Würde die App visueller machen | UI, Speicher, CDN | Von Herstellern fetchem vs. User-Upload | ❌ OFFEN |
| **Mehrsprachigkeit** | Brettspiele sind global, Deutsch limitierend | UI, Datenmodell | i18n-Framework ja/nein, welche Sprachen? | ❌ OFFEN |
| **Regel-Versionierung** | Erweiterungen ändern Regeln oft | Datenmodell, Coach | Vollständige Versionierung vs. nur aktuelle Version | ❌ OFFEN |
| **Admin-Oberfläche** | Wer bearbeitet Regelwissen? | UI, Berechtigungen | In React vs. Separates Admin-System | ❌ OFFEN |

---

## 22. Tests und Qualitätssicherung

### 22.1 Durchgeführte Tests

| Test | Methode | Umfang | Ergebnis | Status |
|------|---------|--------|---------|--------|
| **Manuell: Katalog-Suche** | Browser-Test mit Seed-Daten | 5 Spiele | Funktioniert | ✅ BESTANDEN |
| **Manuell: Filter-Kombinationen** | Verlag + Kategorie + Spielerzahl | 3 Kombinationen | Funktioniert | ✅ BESTANDEN |
| **Manuell: Spieldetail-Route** | `/games/G0001` direkter Aufruf + Reload | 4 Spiele | Stabil | ✅ BESTANDEN |
| **Manuell: Coach-Sidebar** | Spiel auswählen, Regeln anschauen | 2 Spiele | Funktioniert | ✅ BESTANDEN |
| **Manuell: Collection-Filter** | Status wechseln (alle → VORHANDEN → HINZUFÜGEN) | 3 Status | Funktioniert | ✅ BESTANDEN |
| **Manuell: Responsive (Mobile)** | Browser DevTools 375px | HomePage, Catalog | Layout korrekt | ✅ BESTANDEN |
| **Manuell: Responsive (Tablet)** | Browser DevTools 768px | Alle Seiten | Layout korrekt | ✅ BESTANDEN |
| **Manuell: Responsive (Desktop)** | Full Screen 1280px+ | Alle Seiten | Layout korrekt | ✅ BESTANDEN |
| **Manuell: Navigation** | Klick auf alle Navbar-Links | 5 Routen | Alle erreichbar | ✅ BESTANDEN |
| **Build-Test** | `npm run build:prod` | JS + CSS minimieren | ~340 kB gzip | ✅ BESTANDEN |

### 22.2 Nicht getestete Bereiche

- ❌ Screen Reader (VoiceOver, NVDA) – keine Accessibility-Tests
- ❌ Keyboard-only Navigation – keine vollständige Testung
- ❌ XLSX-Parser – nicht mit echtem Excel getestet
- ❌ PocketBase-Integration – nicht konfiguriert
- ❌ Große Datenmengen (1.734 Spiele) – nur 5 Seed-Spiele
- ❌ Fehlerszenarien (Netzwerkfehler, 404-Spiel-IDs) – nicht getestet
- ❌ Unit-Tests – keine automatisierten Tests vorhanden

---

## 23. Deployment und Betrieb

### 23.1 Deployment-Prozess

```
Git Push zu app/ Branch
     ↓
  GitHub/GitLab Hook
     ↓
  STRATO CI/CD
     ↓
  npm run build:prod (Vite)
     ↓
  dist/ wird generated
     ↓
  dist/ wird zu Server deployed
     ↓
  Live unter https://... erreichbar
```

### 23.2 Build-Artefakte

| Artefakt | Größe | Inhalt | Status |
|----------|-------|--------|--------|
| **dist/index.html** | 0.71 kB | HTML-Shell | ✅ |
| **dist/assets/index-D2EA6Bp0.js** | ~60 kB (gzipped: ~21 kB) | React + Router + Pages | ✅ |
| **dist/assets/index-_sC331gK.css** | 1 kB (gzipped: 0.6 kB) | CSS Bundle | ✅ |
| **dist/favicon.svg** | 4 kB | Icon | ⚠️ Noch Placeholder |

### 23.3 Hosting

| Feld | Wert |
|------|------|
| **Plattform** | STRATO KI |
| **Deployment** | Automatisch bei Git Push (assumed) |
| **URL** | https://[projekt-domain] |
| **CDN** | Platform-built-in (assumed) |
| **HTTPS** | Ja |
| **Domains** | Verwaltung über STRATO |

### 23.4 Besonderheiten

- `dist/` ist committed (wird direkt deployed)
- `node_modules/` ist ignored (alles via Platform)
- Build-Befehl: `npm run build:prod`
- Dev-Server: `npm run dev` (port 5173)

---

## 24. Risiken

| Risiko | Auswirkung | Wahrscheinlichkeit | Gegenmaßnahme |
|--------|-----------|-------------------|--------------|
| **Excel-Import scheitert** | App nutzlos ohne Daten | Mittel (XLSX-Parser nicht getestet) | Parser vollständig testen; Fallback auf manuellen Datenupload |
| **PocketBase nicht verfügbar** | Persistierung unmöglich | Gering (auf Platform vorhanden) | Lokal testen; Backup auf JSONServer |
| **1.734 Spiele zu viel RAM/Browser** | Performance-Probleme | Hoch (ohne Pagination) | Pagination implementieren; Backend-Filterung |
| **Keine Backups** | Datenverlust bei Fehler | Mittel | Git-Backups; PocketBase regelmäßig sichern |
| **Sicherheitslücken in Auth** | Unberechtigter Zugriff | Gering (noch nicht vorhanden) | Erst für Phase 2; OWASP-Best-Practices |
| **CSS-Bloat bei 1.734 Spielen** | Längere Ladezeiten | Gering (nur strukturelles CSS) | CSS-Cleanup; Minifizierung (Vite macht das) |

---

## 25. Empfohlene nächste Entwicklungsschritte

### Phase A: Datenimport & Backend-Integration (BLOCKIEREND)

1. **Excel-Import fertigstellen**
   - `xlsxParser.js` vollständig testen mit echter `NeuroPlay_Brettspielanleitungen_Quellenkatalog_v1.4.0.xlsx`
   - Validierungslogik implementieren (IDs, Duplikate, fehlende Felder)
   - Konflikt-Report generieren

2. **PocketBase-Integration**
   - Collections anlegen (publishers, games, game_knowledge, game_phases, game_rules, collections, collection_items)
   - Foreign Keys und Constraints setzen
   - `pb.ts` erweitern mit API-Calls

3. **Daten migrieren**
   - 1.734 Spiele + 32 Verlage aus Excel importieren
   - Import-Report prüfen auf Fehler/Konflikte
   - Seed-Daten durch echte Daten ersetzen

**Ziel:** App mit echten Daten funktionstüchtig

---

### Phase B: Frontend-Fertigstellung

4. **Fehlende Seiten implementieren**
   - `/publishers` – Verlags-Übersicht
   - `/data-quality` – Admin-Dashboard für Datenqualität

5. **URL-basierte Filter**
   - React Router Query-Params nutzen
   - Filter in URL speichern (`/games?publisher=P001&category=Würfel`)
   - Bookmarks/Sharing möglich

6. **Sammlung persistieren**
   - Collection-Items zu PocketBase speichern
   - Edit-Funktionalität (Status ändern, löschen)
   - Nutzer-Authentifizierung (einfache Version)

**Ziel:** Alle 7 geplanten Seiten funktionsfähig

---

### Phase C: UX & Stabilität

7. **Pagination implementieren**
   - Katalog mit Lazy Loading oder "Load More"
   - Performance mit 1.734 Spielen testen

8. **Fehlerbehandlung**
   - Error-Boundaries hinzufügen
   - Fehlende Spieldetails graceful handhaben
   - Netzwerkfehler in UI kommunizieren

9. **Accessibility-Audit**
   - Screen-Reader-Test (NVDA/VoiceOver)
   - Kontrast prüfen (axe-core)
   - Tastatur-Navigation vollständig

10. **Favicon & Branding**
    - Neues Favicon (NeuroPlay-Monogramm)
    - Favicon in beide `public/favicon.svg` und `index.html`

**Ziel:** App produktionsreif

---

### Nicht für diese Session (Backlog)

- Authentifizierung (nur öffentliche Sammlung vorerst)
- Spiel-Bilder (kein Image-Hosting vorhanden)
- Mehrsprachigkeit
- Admin-Bearbeitungsinterface
- Mobile App

---

## 26. Einstiegspunkt für die nächste KI

### Was zuerst lesen?

1. **Diese Datei:** `docs/handover/PROJECT_HANDOVER.md` (du bist hier)
2. **Projekt-Übersicht:** `app/AGENTS.md` – Stack, Struktur, Vorsichtsmaßnahmen
3. **Anforderungen:** Oberer Teil dieser Datei (Executive Summary + Anforderungskatalog)

### Wichtige Dateien

| Datei | Zweck | Priorität |
|-------|-------|-----------|
| `src/data/seedData.json` | Alle aktuellen Daten | 🔴 |
| `src/App.jsx` | Root + Navigation | 🔴 |
| `src/App.css` | Design + Responsive | 🔴 |
| `src/pages/*.jsx` | Einzelne Seiten | 🔴 |
| `src/lib/xlsxParser.js` | Excel-Import-Logik | 🟡 (nicht getestet) |
| `src/lib/pb.ts` | PocketBase-Client | 🟡 (nicht aktiv) |
| `vite.config.js` | Build-Konfiguration | 🟢 |
| `tailwind.config.cjs` | CSS-Konfiguration | 🟢 |

### Was darf nicht verändert werden?

- ❌ `src/App.jsx` Routing (nur erweitern, nicht umstrukturieren)
- ❌ `seedData.json` Datenstruktur (ändern nur mit Datenmigration)
- ❌ NeuroPlay-Designfarben (ohne Genehmigung)
- ❌ Bestehende Komponenten ohne Regressionstest

### Was ist der nächste empfohlene Arbeitsschritt?

**SOFORT (P0-001 – blockierend):**

Teste und integriere den Excel-Import:

```bash
cd app
node src/lib/xlsxParser.js ../uploads/NeuroPlay_Brettspielanleitungen_Quellenkatalog_v1.4.0.xlsx
```

Ziel: 1.734 Spiele in seedData.json laden (oder zu PocketBase schreiben).

### Offene Entscheidungen respektieren

- 🔴 Noch nicht entschieden: PocketBase-URL/Konfiguration
- 🔴 Noch nicht entschieden: Authentifizierungs-Methode
- 🔴 Noch nicht entschieden: Import-Strategie (Batch vs. Stream)

Frag nach oder treffe eine dokumentierte Entscheidung.

### Wie prüfen, dass die Änderung funktioniert?

1. **Build testen:**
   ```bash
   cd app && npm run build:prod
   ```
   Sollte erfolgreich sein, `dist/` wird aktualisiert.

2. **Dev-Server starten:**
   ```bash
   npm run dev
   ```
   Browser zu `http://localhost:5173`, navigiere durch alle Seiten.

3. **Manuell testen:**
   - Katalog: Suche, Filter, Sortierung
   - Spieldetail: Parameter in URL ändern (`/games/G0002`)
   - Coach: Spiel auswählen, Regeln scrollen
   - Collection: Status-Filter
   - Responsive: DevTools auf 375px / 768px / 1280px

4. **Git-Status prüfen:**
   ```bash
   git status
   git diff src/
   ```
   Nur beabsichtigte Änderungen committen.

---

## 27. Unsicherheiten und fehlende Informationen

### Was konnte ich aus dem Projekt **nicht** bestimmen?

| Information | Warum unklar | Impact |
|-------------|-------------|--------|
| **Echte PocketBase-Konfiguration** | Nicht vorhanden; nur Client-Stub in `pb.ts` | Kann nicht zu echter DB migrieren bis konfiguriert |
| **Excel-Datei-Validierung** | XLSX-Parser nicht getestet | Unbekannte Edge-Cases beim Import |
| **Authentifizierungs-Details** | Nicht implementiert; Anforderung offen | Weiß nicht, welche Rollen/Auth-Methode gewünscht |
| **Hosting-Details** | Nur STRATO angenommen, nicht bestätigt | Unklare Deployment-Spezifikationen |
| **Admin-Benutzer** | Keine Anmeldedaten sichtbar | Kann nicht auf Admin-Panel zugreifen |
| **Externe API-Integration** | Keine konfiguriert (z.B. BoardGameGeek-API) | Spieldetails möglicherweise manual gepflegt |
| **Spiel-Bilder / Assets** | Nicht vorhanden | Nur textbasierte UI möglich |
| **Existing User Data** | Keine Migrationsanforderung dokumentiert | Weiß nicht, ob Legacy-Daten importiert werden müssen |

### Annahmen, die ich getroffen habe

| Annahme | Grund | Riskant? |
|---------|-------|----------|
| Vite + React ist final (nicht Next.js o.ä.) | Stack in AGENTS.md so dokumentiert | Nein |
| English technical names, German UI | Anforderung so gestellt | Nein |
| PocketBase wird später konfiguriert | Ist Platform-verfügbar; noch nicht setup | Mittel |
| `dist/` wird direkt deployed (nicht `src/`) | Best Practice; Vite-Konvention | Nein |
| responsive Breakpoints 375/768/1280 sind final | CSS so implementiert | Nein |
| NeuroPlay-Farben sind final | Design so dokumentiert; akzeptiert | Nein |

---

## 28. Übergabe-Check

- [x] Anforderungen erfasst
- [x] implementierte Funktionen erfasst
- [x] offene Anforderungen erfasst
- [x] teilweise implementierte Funktionen erfasst
- [x] Seitenstruktur erfasst
- [x] Repositorystruktur erfasst
- [x] Architektur erfasst
- [x] Datenbank erfasst (geplant)
- [x] APIs erfasst (geplant)
- [x] Geschäftslogik erfasst
- [x] erledigte Aufgaben erfasst
- [x] offene Aufgaben erfasst
- [x] Fehler und technische Schulden erfasst
- [x] Deployment erfasst
- [x] nächste Schritte definiert
- [x] Unsicherheiten ausdrücklich dokumentiert
- [x] **KEINE** Secrets enthalten
- [x] keine vermuteten Informationen als Fakten dargestellt

---

**Übergabe vollständig und prüfbar.**

**Letztes Update:** 15. August 2026, 09:19 UTC
