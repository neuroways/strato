# PROJECT HANDOVER — NeuroWays

## 1. Dokumentinformationen

- **Projektname:** NeuroWays
- **Datum der Übergabe:** 15. August 2026
- **Aktueller Entwicklungsstand:** Multi-Page Frontend-Anwendung mit 4 Seiten (Home, NeuroBalance, NeuroPlay, Info)
- **Verwendete Technologien:** React, React Router, Tailwind CSS v4, Vite, JavaScript ES6+
- **Entwicklungsumgebung:** Node.js (lokal), Platform: STRATO-AI mit Live-Reload Dev Server
- **Hosting/Deployment:** STRATO-Plattform mit Vite Build + dist/ Deployment
- **Repository/Branch:** /app/ (Git-Repo), Branch unknown (letzte commits von heute)
- **Zweck dieser Übergabe:** Dokumentation des aktuellen Projektstands vor Implementierung von NeuroPlay-Datenbankmodul und weiteren NeuroBalance-Features

---

## 2. Executive Project Summary

NeuroWays ist ein neuroscience-basiertes Web-Anwendungssystem mit zwei geplanten Modulen:

1. **NeuroBalance** — Energy Navigator für Energie- und Belastungszustände (Auftrag vorhanden, nicht implementiert)
2. **NeuroPlay** — Brettspiel-Katalog mit relationale Datenbank für 75+ Spiele, Haushalte und Spieler (Auftrag + XLSX-Daten vorhanden, nicht implementiert)

**Aktueller Stand:** 
- Frontend-Grundgerüst ist fertig: 4-seitige React+Router Anwendung mit einheitlichem Navigation + Footer
- Alle 4 Seiten existieren, aber nur als Placeholder-UIs ohne echte Datenanbindung oder Geschäftslogik
- Keine Datenbank integriert, keine Authentifizierung implementiert
- NeuroWays v1 Dokumentation + Architektur-Standards liegen vor (Migration-Export)
- NeuroPlay XLSX mit vollständigem Spielekatalog + Verlags-Daten vorhanden

**Wer nutzt es:** Noch nicht im Einsatz. Zielgruppe (laut NeuroWays-Doku): Personen zur Selbstbeobachtung ihrer Energie- und Belastungszustände + Spieler von Brettspielen.

**Was soll das System können (Endzustand):**
- Check-ins für Energie-/Stress-Zustände mit fünf Zonen (NeuroBalance)
- Historische Auswertung von Check-ins (NeuroBalance)
- Spielekatalog durchsuchen und filtern (NeuroPlay)
- Persönliche + Haushaltsverwaltete Spielesammlungen (NeuroPlay)
- Spielpartien und Ergebnisse speichern (NeuroPlay)
- Benutzerkonten und rollenbasierte Zugriffe

---

## 3. Fachliches Zielbild

### NeuroWays Core (Dachsystem)

**GEPLANT** — definiert übergreifende Standards und Infrastruktur:
- Governance und Membership-Modell
- Design System (9 Standards: Philosophie, Logos, Farben, Typografie, Layout, Komponenten, Illustrationen, Motion, Brand-Anwendungen)
- Naming Standard, Registries, Datenbank-Standard
- Knowledge Asset Standard
- Module/Version/Package Model
- Deployment Standard
- Migrations-Tools

**Status:** Dokumentation existiert (siehe `/app/migration/neurowaysV1/`), nicht in aktuellem Projekt implementiert.

### NeuroBalance Modul

**GEPLANT** — Energy Navigator für Selbstregulation:
- 6 Energie-/Stress-Fragen mit skaliertem Scoring
- 5 Zones (Hyperarousal, Flight, Overwhelm, Shutdown, Window of Tolerance)
- Check-in System mit Timestamps und Versionierung
- Historische Ansicht und Trends
- Privacy/Datenschutz für personenbezogene Check-in-Daten

**Anforderung kommt aus:** `/app/migration/neurowaysV1/NeuroWays-dev/` (NeuroBalance-Auftrag + bekannte Widersprüche in AGENTS.md dokumentiert)

**Status:** Seite existiert als Placeholder-UI ohne Datenanbindung. Echte NeuroBalance-Komponente (`/app/migration/NeuroBalance.jsx`) ist großer Text-Export ohne funktionierende Implementierung.

### NeuroPlay Modul

**GEPLANT** — Brettspiel-Katalog und -Verwaltung:
- Relationaler Spielekatalog (75+ Spiele + Verlage aus XLSX)
- Spiel-Ausgaben trennen von allgemeinen Spielen
- Haushalte + Spielerprofile + Haushaltsmitgliedschaften
- Persönliche und Haushalt-Sammlungen
- Spielpartien und Ergebnisse
- Regel- und Informationsquellen
- Keine medizinische Diagnostik

**Daten:** NeuroPlay_Brettspielanleitungen_Quellenkatalog_v1.4.1.xlsx (470 KB, hochgeladen, noch nicht analysiert)

**Status:** Seite existiert als Placeholder-UI. Datenmodell + Datenbank nicht implementiert.

---

## 4. Vollständiger Anforderungskatalog

| ID | Anforderung | Kategorie | Status | Implementierung/Nachweis | Offene Punkte |
|----|-------------|-----------|--------|--------------------------|---------------|
| NW-UI-001 | Multi-Page Navigation (Home, NeuroBalance, NeuroPlay, Info) | Funktional | **IMPLEMENTIERT** | /app/src/App.jsx, SiteLayout.jsx, 4 Page-Komponenten vorhanden | Seiten sind nur Placeholder |
| NW-UI-002 | Sticky Navigation mit aktiven Links | Funktional | **IMPLEMENTIERT** | NavLink in SiteLayout.jsx mit isActive-Styling | Responsive mobil: UNGEKLÄRT |
| NW-UI-003 | Footer mit Copyright | Funktional | **IMPLEMENTIERT** | Footer in SiteLayout.jsx | Statisch, keine Links |
| NW-STYLE-001 | Tailwind CSS v4 Setup | Technisch | **IMPLEMENTIERT** | tailwind.config.cjs, @import tailwindcss in index.css | Keine Custom Fonts/Tokens bisher |
| NW-STYLE-002 | Responsive Design (mobile 375px, tablet 768px, desktop 1280px) | Funktional | **TEILWEISE IMPLEMENTIERT** | Tailwind breakpoints vorhanden, aber Placeholder-Seiten nicht getestet auf 375px | Kein Test-Report |
| NW-BUILD-001 | Vite Build (development und production) | Technisch | **IMPLEMENTIERT** | vite.config.js, package.json scripts vorhanden | Preview-Build: vite build --mode preview |
| NW-DEPLOY-001 | dist/ Build-Output für Deployment | Technisch | **IMPLEMENTIERT** | dist/ mit index.html + assets vorhanden, committed | Wurde mit vite build erzeugt |
| NW-ROUTING-001 | Client-side Routing mit React Router | Technisch | **IMPLEMENTIERT** | BrowserRouter in main.jsx, Routes in App.jsx | Keine Nested Routes, einfache Flachstruktur |
| NW-BRAND-001 | Title und Meta-Description | Funktional | **IMPLEMENTIERT** | `<title>` und `<meta name="description">` in index.html | Vollständig, deutsch |
| NW-BRAND-002 | Favicon | Funktional | **IMPLEMENTIERT** | public/favicon.svg vorhanden | Ist Placeholder (grau), sollte später NeuroWays-Mark sein |
| NB-REQ-001 | Energy Navigator mit 6 Fragen | Funktional | **GEPLANT** | Nicht implementiert | Auftrag: 6 Fragen, Scoring 6–30 (oder 5 Fragen 5–25: Widerspruch dokumentiert) |
| NB-REQ-002 | 5 Zones (Hyperarousal, Flight, Overwhelm, Shutdown, Window) | Funktional | **GEPLANT** | Nicht implementiert | ZoneCard, ZoneIcon Komponenten existieren nur im Export |
| NB-REQ-003 | Check-in Speicherung mit Versionierung | Funktional | **GEPLANT** | Nicht implementiert | Benötigt: Datenbank, Auth, API |
| NB-REQ-004 | Historische Check-in Ansicht | Funktional | **GEPLANT** | Nicht implementiert | Abhängig von Check-in-Speicherung |
| NB-REQ-005 | Privacy/Datenschutz (geschlossene Zugriffsregeln) | Nichtfunktional | **GEPLANT** | Nicht implementiert | Benötigt: Rollensystem |
| NB-REQ-006 | NeuroBalance Seite live | Funktional | **TEILWEISE IMPLEMENTIERT** | Seite existiert (/neurobalance), aber nur Placeholder-Text + Cards | Keine Funktionalität |
| NP-REQ-001 | Spielekatalog mit 75+ Spielen | Funktional | **GEPLANT** | Daten in XLSX vorhanden, noch nicht analysiert | Benötigt: Datenbank-Schema |
| NP-REQ-002 | Spiel + Edition Trennung | Funktional | **GEPLANT** | Schema dokumentiert, nicht implementiert | Collections nicht angelegt |
| NP-REQ-003 | Haushalte + Spielerprofile | Funktional | **GEPLANT** | Schema dokumentiert, nicht implementiert | Membership-Model vorhanden, Code nicht |
| NP-REQ-004 | Persönliche + Haushalt-Sammlungen | Funktional | **GEPLANT** | Schema dokumentiert, nicht implementiert | owner_type: HOUSEHOLD oder PLAYER |
| NP-REQ-005 | Spielpartien und Ergebnisse | Funktional | **GEPLANT** | Schema dokumentiert, nicht implementiert | game_sessions + game_session_players |
| NP-REQ-006 | Regel- und Informationsquellen | Funktional | **GEPLANT** | Schema dokumentiert, nicht implementiert | rule_sources Collection geplant |
| NP-REQ-007 | Spieler-Präferenzen (ohne medizinische Diagnostik) | Funktional | **GEPLANT** | Schema dokumentiert, nicht implementiert | Nur Basis-Präferenzen (FAVORITE, LIKES, etc.) |
| NP-REQ-008 | Import + Qualitätsprüfung (XLSX → DB) | Funktional | **OFFEN** | XLSX vorhanden, Import-Tool nicht vorhanden | import_batches, import_items, review_issues geplant |
| NP-REQ-009 | NeuroPlay Seite live | Funktional | **TEILWEISE IMPLEMENTIERT** | Seite existiert (/neuroplay), aber nur Placeholder | Keine Funktionalität |
| NW-AUTH-001 | Authentifizierung (Login/Logout) | Funktional | **OFFEN** | Nicht implementiert | Auftrag beschreibt Benutzerkonten + Spielerprofile Trennung |
| NW-AUTH-002 | Rollen + Berechtigungen | Funktional | **OFFEN** | Nicht implementiert | Rollen geplant: OWNER, ADMIN, ADULT_MEMBER, CHILD_MEMBER, GUEST, MEMBER |
| NW-DB-001 | Datenbank (Technologie wählen und initialisieren) | Technisch | **OFFEN** | Nicht implementiert | NeuroWays-Doku erwähnt PocketBase, nicht bestätigt |
| NW-DB-002 | Schema-Migrationen | Technisch | **OFFEN** | Nicht implementiert | Migration-Tools in NeuroWays-Doku beschrieben |
| NW-TEST-001 | Automatisierte Tests | Nichtfunktional | **NICHT VORHANDEN** | Keine Tests im Projekt | Kein Test-Framework konfiguriert |

**Widerspruch dokumentiert:**
- NeuroBalance-Auftrag nennt "6 Fragen, Skala 6–30" in AGENTS.md, führt aber an anderer Stelle "5 Fragen, Skala 5–25" mit Seed-Daten auf. DOCUMENTED_DISCREPANCIES.md klärt: 5 Fragen sind aktuell implementiert in v1.

---

## 5. Aktuell implementierter Funktionsumfang

### Navigation und Layout (IMPLEMENTIERT)

**Komponente:** `SiteLayout.jsx`
- Sticky Top-Navigation mit NeuroWays-Logo (Gradient blau-indigo)
- 4 Haupt-Navigation Links: Home, NeuroBalance, NeuroPlay, Info
- Active-Link Hervorhebung mit Unterstrich (border-b-2)
- Responsive Layout: `max-w-6xl mx-auto px-4`
- Footer mit Copyright-Text
- Outlet für Page-Content

**Beteiligte Dateien:**
- `src/layouts/SiteLayout.jsx`
- `src/App.jsx` (Routes Definition)
- `src/main.jsx` (BrowserRouter Wrapper)

**Status:** Funktioniert, Navigation ist responsive. Tested nur visuell im Dev-Server, nicht auf 375px Mobile getestet.

---

### Home-Seite (IMPLEMENTIERT als Placeholder)

**Route:** `/`

**Komponente:** `src/pages/Home.jsx`
- Großer Hero mit Gradient-Headline ("NeuroWays")
- Unterline "Entdecke innovative Wege für dein Wohlbefinden"
- CTA-Button ("Erfahre mehr"), nicht verlinkt
- Vollbild-Layout mit min-h-screen

**Status:** Visuell fertig, keine Funktionalität.

---

### NeuroBalance-Seite (IMPLEMENTIERT als Placeholder)

**Route:** `/neurobalance`

**Komponente:** `src/pages/NeuroBalance.jsx`
- Headline mit Gradient (emerald-teal)
- Beschreibungstext "Finde deine innere Harmonie…"
- 2-spaltig Grid (Neuronale Balance + Ganzheitliches Wohlbefinden)
- Weiße Karten mit Schatten

**Status:** UI existiert, keine Funktionalität. Der echte Energy Navigator ist nicht integriert.

---

### NeuroPlay-Seite (IMPLEMENTIERT als Placeholder)

**Route:** `/neuroplay`

**Komponente:** `src/pages/NeuroPlay.jsx`
- Headline mit Gradient (purple-pink)
- Beschreibungstext "Aktiviere dein Gehirn durch spielerische Herausforderungen…"
- 2-spaltig Grid (Neurogames + Kreatives Training)
- Weiße Karten mit Schatten

**Status:** UI existiert, keine Funktionalität. Keine Spielekatalog-Integration.

---

### Info-Seite (IMPLEMENTIERT als Placeholder)

**Route:** `/info`

**Komponente:** `src/pages/Info.jsx`
- Headline mit Gradient (amber-orange)
- "Über NeuroWays" Section mit Missionstext
- 2-spaltig Grid (Kontakt, Community)
- Statische Text-Inhalte

**Status:** UI existiert, keine Funktionalität.

---

### Styling (IMPLEMENTIERT)

**Setup:**
- Tailwind CSS v4
- `@import "tailwindcss"` in `src/index.css`
- `@config "../tailwind.config.cjs"` für Theme-Brücke
- Keine Custom Fonts verlinkt (Placeholder)
- Keine Custom Colors definiert (Standard Tailwind Palette)

**Responsive Design:**
- `md:` Breakpoint für Tablet/Desktop wird verwendet
- Grid mit `md:grid-cols-2` auf Seiten
- Text Skalierung mit `md:text-6xl`
- Keine Tests auf 375px durchgeführt

**Status:** Framework konfiguriert, aber keine Custom Design-Tokens gesetzt.

---

## 6. Seiten- und Navigationsstruktur

```
NeuroWays Application
├── SiteLayout (Sticky Nav + Footer)
│   ├── Home (/)
│   │   └── Hero mit CTA
│   ├── NeuroBalance (/neurobalance)
│   │   └── Info-Cards
│   ├── NeuroPlay (/neuroplay)
│   │   └── Info-Cards
│   └── Info (/info)
│       └── About + Kontakt-Cards
└── Footer
    └── Copyright
```

### Seite 1: Home
- **Route:** `/`
- **Zweck:** Landing Page / Projekt-Einstieg
- **Zielgruppe:** Allgemein
- **UI-Bereiche:** Hero-Section mit Headline, Subheadline, CTA
- **Mögliche Aktionen:** Button ("Erfahre mehr") nicht verlinkt
- **Verwendete Daten:** Statisch (keine Datenanbindung)
- **Beteiligte Komponenten:** `Home.jsx`
- **Status:** Vollständig implementiert, nur Placeholder

---

### Seite 2: NeuroBalance
- **Route:** `/neurobalance`
- **Zweck:** Energy Navigator Info + spätere Check-in-Eingabe
- **Zielgruppe:** Personen zur Selbstbeobachtung
- **UI-Bereiche:** Headline, Info-Grid mit 2 Karten
- **Mögliche Aktionen:** Später: Check-in starten, Verlauf anzeigen
- **Verwendete Daten:** Placeholder-Text
- **Beteiligte Komponenten:** `NeuroBalance.jsx`
- **Status:** Nur Placeholder, keine echte Komponente

---

### Seite 3: NeuroPlay
- **Route:** `/neuroplay`
- **Zweck:** Spielekatalog + Haushaltsverwaltung
- **Zielgruppe:** Spieler / Haushalte
- **UI-Bereiche:** Headline, Info-Grid mit 2 Karten
- **Mögliche Aktionen:** Später: Katalog suchen, Sammlungen verwalten, Partien eingeben
- **Verwendete Daten:** Placeholder-Text
- **Beteiligte Komponenten:** `NeuroPlay.jsx`
- **Status:** Nur Placeholder, keine echte Komponente

---

### Seite 4: Info
- **Route:** `/info`
- **Zweck:** Projekt-Info, Kontakt, Community
- **Zielgruppe:** Alle
- **UI-Bereiche:** About-Section, Kontakt-Card, Community-Card
- **Mögliche Aktionen:** Link zu info@neuroways.de (nicht implementiert)
- **Verwendete Daten:** Statisch
- **Beteiligte Komponenten:** `Info.jsx`
- **Status:** Vollständig implementiert als Placeholder

---

## 7. User Flows

### Flow 1: Website-Navigation (IMPLEMENTIERT)

```
Benutzer öffnet NeuroWays.de
  ↓
SiteLayout rendert (Navigation + Footer)
  ↓
Home-Seite ist Standardroute
  ↓
Benutzer klickt NavLink (z. B. "NeuroBalance")
  ↓
React Router rendert NeuroBalance-Seite
  ↓
Seite mit Info-Cards angezeigt
  ↓
Benutzer kann zu anderer Seite navigieren
```

**Status:** IMPLEMENTIERT, funktioniert ohne Fehler im Dev-Server.

---

### Flow 2: Energy Check-in (GEPLANT, NICHT IMPLEMENTIERT)

```
Benutzer öffnet NeuroBalance
  ↓
Klick auf "Check-in starten" (Button noch nicht vorhanden)
  ↓
Modal/Seite mit 6 Fragen (oder 5? Widerspruch)
  ↓
Benutzer wählt pro Frage 1 Antwort (1–6 Skala?)
  ↓
System berechnet Zone basierend auf Scoring
  ↓
Ergebnis wird angezeigt (Zone-Icon, Zone-Name, Empfehlung)
  ↓
Check-in wird in DB gespeichert mit Timestamp + Methoden-Version
  ↓
Benutzer kann zu Verlauf navigieren
```

**Status:** NICHT IMPLEMENTIERT. Auftrag vorhanden, keine Komponenten.

---

### Flow 3: Spielekatalog Durchsuchen (GEPLANT, NICHT IMPLEMENTIERT)

```
Benutzer öffnet NeuroPlay
  ↓
Sieht Katalog-Suche (noch nicht vorhanden)
  ↓
Klick auf Spiel oder Filter (z. B. Kategorie, Spieler-Anzahl)
  ↓
DB wird abgefragt (game + edition)
  ↓
Spiele-Liste wird angezeigt
  ↓
Benutzer klickt Spiel an
  ↓
Detail-Seite mit Infos, Regeln, Sammlungs-Button
  ↓
"Zu Sammlung hinzufügen" → Haushaltsverwaltung
```

**Status:** NICHT IMPLEMENTIERT.

---

### Flow 4: Spielpartie Eintragen (GEPLANT, NICHT IMPLEMENTIERT)

```
Benutzer im Haushalt-Bereich
  ↓
Klick "Neue Partie"
  ↓
Modal mit:
  - Spiel-Wahl (Dropdown/Search)
  - Spieler aus Haushalt (Checkboxes)
  - Gäste eingeben (optional)
  - Spieldauer, Ort, Notizen
  ↓
Form speichern
  ↓
Partie in DB geschrieben (game_session + game_session_players)
  ↓
Bestätigung: "Partie gespeichert"
  ↓
Benutzer kann Partie in Historie anzeigen oder bearbeiten
```

**Status:** NICHT IMPLEMENTIERT.

---

## 8. Technische Architektur

### Schichten-Übersicht

```
Browser
    ↓
React App (SPA)
    ├── React Router (Client-Side Routing)
    ├── 4 Pages (Home, NeuroBalance, NeuroPlay, Info)
    ├── SiteLayout (Nav + Footer)
    └── Tailwind CSS (Styling)
    ↓
[NO BACKEND CONNECTION YET]
    ↓
[Database NOT Connected] ← To be implemented
```

### Komponenten-Struktur

```
src/
├── App.jsx
│   └── Routes (React Router)
├── main.jsx
│   └── BrowserRouter
├── layouts/
│   └── SiteLayout.jsx
│       ├── NavLink × 4
│       ├── Outlet (Page Rendering)
│       └── Footer
├── pages/
│   ├── Home.jsx
│   ├── NeuroBalance.jsx
│   ├── NeuroPlay.jsx
│   └── Info.jsx
└── index.css
    └── @import tailwindcss
```

### Tech Stack Details

| Komponente | Technologie | Version | Status |
|-----------|------------|---------|--------|
| Frontend-Framework | React | Platform-provided | IMPLEMENTIERT |
| Routing | React Router | Platform-provided | IMPLEMENTIERT |
| Styling | Tailwind CSS v4 | Platform-provided | IMPLEMENTIERT |
| Build Tool | Vite | Platform-provided | IMPLEMENTIERT |
| JavaScript | ES6+ (JSX) | Modern | IMPLEMENTIERT |
| Backend | — | — | NICHT VORHANDEN |
| Database | — | — | NICHT VORHANDEN |
| Auth | — | — | NICHT VORHANDEN |

### Keine externe Dependencies

`package.json` ist leer:
```json
{
  "dependencies": {},
  "devDependencies": {}
}
```

Alle Pakete sind **Platform-provided**:
- react, react-dom
- react-router
- lucide-react (für Icons, nicht benutzt)
- pocketbase (verfügbar, nicht benutzt)
- tailwind-merge
- vite, @vitejs/plugin-react

---

## 9. Repository- und Verzeichnisstruktur

```
app/
├── src/
│   ├── App.jsx                    # Root Routes
│   ├── main.jsx                   # Entry point
│   ├── index.css                  # Tailwind import
│   ├── layouts/
│   │   └── SiteLayout.jsx         # Sticky Nav + Footer
│   └── pages/
│       ├── Home.jsx
│       ├── NeuroBalance.jsx
│       ├── NeuroPlay.jsx
│       └── Info.jsx
│
├── public/
│   └── favicon.svg                # Placeholder icon
│
├── dist/                          # Built output (committed)
│   ├── index.html
│   ├── favicon.svg
│   └── assets/
│       ├── index-D9nfZHeb.js     # Bundled JS
│       └── index-UTDTiRN6.css    # Bundled CSS
│
├── index.html                     # HTML entry point
├── package.json                   # Empty (no deps)
├── package-lock.json
├── tailwind.config.cjs            # Theme config (empty extend)
├── vite.config.js                 # Vite config (platform-config)
│
├── AGENTS.md                      # Project metadata
├── MIGRATION_MASTER_PROMPT.md     # Migration instructions (not this project)
├── NEW_PROJECT_SETUP_PROMPT.md    # Setup instructions (not this project)
│
├── migration/
│   ├── NeuroBalance.jsx           # 12K text export (not functional code)
│   └── neurowaysV1/
│       └── NeuroWays-dev/         # Full NeuroWays v1 export
│           ├── AGENTS.md
│           ├── NEUROWAYS_WORLD.md
│           ├── NW-DEPLOY-001_DEPLOYMENT_STANDARD.md
│           ├── NW-DS-001 bis NW-DS-009 (Design System)
│           ├── NW-GOVERNANCE-FOUNDATION-v1.0.md
│           ├── NW-IDENTITY-*.md
│           ├── NW-KAS-001_KNOWLEDGE_ASSET_STANDARD.md
│           ├── NW-PKG-001_MODULE_VERSION_PACKAGE_MODEL.md
│           ├── NW-STD-000 bis NW-STD-003 (Standards)
│           ├── NW-MIGRATE-*.md
│           ├── NW-VALIDATE-*.md
│           └── [37 weitere Dokumente]
│
├── docs/
│   └── handover/                  # ← You are here
│       └── PROJECT_HANDOVER.md    # This file
│
└── .git/                          # Git repository
    └── [10+ commits visible]
```

### Wichtige Dateien erklärt

| Datei | Zweck | Status |
|-------|-------|--------|
| `src/App.jsx` | Routes Definition (React Router) | IMPLEMENTIERT |
| `src/main.jsx` | React Entry Point | IMPLEMENTIERT |
| `src/layouts/SiteLayout.jsx` | Global Navigation + Footer | IMPLEMENTIERT |
| `src/pages/*.jsx` | 4 Seiten als Placeholder | IMPLEMENTIERT (als Placeholder) |
| `src/index.css` | Tailwind Import + Config Bridge | IMPLEMENTIERT |
| `index.html` | HTML Entry Point (mit Title + Meta) | IMPLEMENTIERT |
| `tailwind.config.cjs` | Tailwind Config (leer) | IMPLEMENTIERT (minimal) |
| `vite.config.js` | Vite Config (Platform-provided) | IMPLEMENTIERT |
| `public/favicon.svg` | Favicon (Placeholder) | IMPLEMENTIERT (Placeholder) |
| `dist/` | Build Output | IMPLEMENTIERT (Built) |
| `migration/neurowaysV1/` | NeuroWays v1 Dokumentation | ARCHIV (für Referenz) |

---

## 10. Datenbank

**Status: NICHT IMPLEMENTIERT**

### Analyse

- Keine lokale Datenbank-Instanz im Projekt sichtbar
- Keine `.env` Datei mit Datenbankverbindung vorhanden
- Keine SQL-Migration oder DDL-Dateien vorhanden
- Keine PocketBase Collections konfiguriert

### Geplante Datenbank (aus Anforderungen)

**Technologie:** UNGEKLÄRT
- NeuroWays-Doku erwähnt PocketBase mehrfach
- Nicht bestätigt, ob PocketBase verfügbar/initialisiert ist
- STRATO-Plattform erwähnt Oracle APEX (aber in NeuroPlay-Auftrag explizit ausgeschlossen)

**Geplante Collections/Tabellen für NeuroBalance:**

- `users` (Auth, Benutzerkonto)
- `player_profiles` (Spieler-Profil, kann ohne Benutzerkonto existieren)
- (weitere nur im NeuroPlay-Auftrag spezifiziert)

**Geplante Collections/Tabellen für NeuroPlay:** (aus Auftrag Sektion 5)

| Collection | Zweck | Status |
|-----------|-------|--------|
| `users` | Authentifizierung | GEPLANT |
| `player_profiles` | Spieler-Profile (unabhängig von Benutzerkonto) | GEPLANT |
| `households` | Soziale Gruppen | GEPLANT |
| `household_memberships` | Zuordnung Spieler → Haushalt | GEPLANT |
| `publishers` | Verlage (P33–P47, mit P47 = "Verlag unklar") | GEPLANT |
| `games` | Allgemeine Spiele-Katalog | GEPLANT |
| `game_editions` | Konkrete Verlagseditionen | GEPLANT |
| `edition_publishers` | Mehrere Verlage pro Edition | GEPLANT |
| `product_types` | Spiel-Typ (BOARD_GAME, CARD_GAME, etc.) | GEPLANT |
| `categories` | Spiel-Kategorien | GEPLANT |
| `game_categories` | Zuordnung Spiel → Kategorien | GEPLANT |
| `mechanics` | Spiel-Mechaniken | GEPLANT |
| `game_mechanics` | Zuordnung Spiel → Mechaniken | GEPLANT |
| `game_relations` | Spiel-Beziehungen (Expansion, Variant, etc.) | GEPLANT |
| `collections` | Persönliche + Haushalt-Sammlungen | GEPLANT |
| `collection_items` | Spiele in Sammlungen | GEPLANT |
| `rule_sources` | Regel-PDFs, FAQs, Errata | GEPLANT |
| `source_locations` | Seitenangaben in Regelquellen | GEPLANT |
| `game_sessions` | Gespielte Partien | GEPLANT |
| `game_session_players` | Spieler in einer Partie | GEPLANT |
| `player_game_preferences` | Spieler-Präferenzen (ohne Diagnostik) | GEPLANT |
| `import_batches` | Import-Tracking | GEPLANT |
| `import_items` | Einzelne Import-Ergebnisse | GEPLANT |
| `review_issues` | Qualitätsprüfungs-Probleme | GEPLANT |

**Migrationsdaten vorhanden:**
- NeuroPlay XLSX mit 75+ Spielen (hochgeladen, noch nicht analysiert)
- Verlags-Daten (P33–P47 teils in Auftrag dokumentiert)

**Migrationsplan:** OFFEN (Schritt 1 der nächsten Entwicklung)

---

## 11. API und Schnittstellen

**Status: NICHT IMPLEMENTIERT**

### Geplante REST-API Endpunkte (aus NeuroWays-Doku)

Keine konkreten Endpunkte in aktuellem Projekt implementiert.

NeuroWays-Auftrag erwähnt REST-API, keine Details in aktuellem Code sichtbar.

**Erwartete Endpunkte (später):**

| Methode | Endpoint | Zweck | Status |
|---------|----------|-------|--------|
| GET | /api/users/me | Aktueller Benutzer | GEPLANT |
| POST | /api/checkins | Check-in speichern | GEPLANT |
| GET | /api/checkins/history | Check-in-Verlauf | GEPLANT |
| GET | /api/games | Spielekatalog | GEPLANT |
| GET | /api/games/:id | Spiel-Details | GEPLANT |
| POST | /api/collections | Sammlung erstellen | GEPLANT |
| POST | /api/sessions | Spielpartie speichern | GEPLANT |

**Frontend-API-Calls:**
- Keine Fetch/Axios Calls im aktuellen Code
- Import von `pocketbase` in AGENTS.md dokumentiert, nicht benutzt
- `/app/migration/neurowaysV1/` erwähnt PocketBase SDK (`pb.js`), nicht im aktuellen Projekt

---

## 12. Fachliche Geschäftslogik

**Status: MINIMAL IMPLEMENTIERT (nur Placeholders)**

### Implementierte Logik

1. **Navigation-Routing** (IMPLEMENTIERT)
   - Seiten basierend auf URL rendern
   - Active-Link Styling in Navigation
   - React Router handheld alles

2. **Responsive UI** (TEILWEISE IMPLEMENTIERT)
   - Tailwind Breakpoints (`md:`) vorhanden
   - Text-Skalierung
   - Nicht getestet auf 375px

### Geplante Logik (nicht implementiert)

#### NeuroBalance Logik

1. **Frage-Answering und Scoring**
   - 5 oder 6 Fragen? (Widerspruch dokumentiert)
   - Skalierung: 5–25 oder 6–30?
   - Benutzer antwortet pro Frage mit 1 Wert
   - System summiert Punkte

2. **Zone-Bestimmung**
   - Basierend auf Gesamtpunktzahl:
     - Hyperarousal (oben)
     - Flight (hoch)
     - Window of Tolerance (grün/Ziel)
     - Overwhelm (tief)
     - Shutdown (unten)
   - Zuordnung: Welche Punkte → welche Zone?

3. **Check-in Speicherung**
   - Timestamp
   - Methoden-Version (historische Konsistenz)
   - Benutzer/Spieler-ID
   - Datenschutz: nur eigene Check-ins sichtbar

#### NeuroPlay Logik

1. **Spielekatalog-Suche**
   - Filter: Kategorie, Mechanik, Spieler-Anzahl, Dauer, etc.
   - Ranking: Favoriten zuerst?
   - Pagination?

2. **Sammlungs-Management**
   - Spiel zu Haushalt-Sammlung hinzufügen
   - Spiel zu persönlicher Sammlung hinzufügen
   - Duplikate vermeiden (gleicher Spiel, gleiche Edition, gleiche Sammlung)
   - Mengen verwalten (z. B. 2× Zauberberg)

3. **Partie-Speicherung**
   - Alle Spieler aus Haushalt können Gäste laden
   - Reihenfolge optional
   - Team-Bildung optional
   - Punkte optional (nicht jedes Spiel nutzt Scoring)
   - Gewinner: 0, 1 oder n Gewinner möglich

4. **Zugriffskontrolle**
   - Haushalt-Admin darf Mitglieder verwalten
   - Kinder/Gäste: keine Admin-Rechte
   - Fremde Haushalte: nicht lesbar/änderbar

---

## 13. Authentifizierung, Rollen und Berechtigungen

**Status: NICHT IMPLEMENTIERT**

### Geplantes Modell (aus NeuroPlay-Auftrag)

#### Benutzerkonten vs. Spielerprofile

**Trennung ist verbindlich:**

- **Benutzerkonto** = technischer Zugang
- **Spielerprofil** = reale Person in Spielkontext

**Szenarien:**
- Svenja: Benutzerkonto + Spielerprofil (sich selbst verwalten)
- Svenjas Kind: nur Spielerprofil (kein Login)
- Gast: nur Spielerprofil (kann an Partie teilnehmen)
- Benutzerkonto mit abhängigen Profilen: Eltern verwalten Kinder-Profile

#### Geplante Rollen

| Rolle | Kontext | Rechte |
|-------|---------|--------|
| ACCOUNT_OWNER | Spielerprofil | Hat Benutzerkonto |
| DEPENDENT | Spielerprofil | Kind/Betreuter |
| CHILD | Spielerprofil | unter 18 |
| GUEST | Spielerprofil | Einmalig-Teilnehmer |
| OWNER | Haushalt | Vollzugriff |
| ADMIN | Haushalt | Verwaltet Mitglieder |
| ADULT_MEMBER | Haushalt | Volles Mitglied |
| CHILD_MEMBER | Haushalt | Beschränktes Mitglied |
| MEMBER | Haushalt | Generisches Mitglied |
| GUEST | Haushalt | Temporär |

#### Geplante Zugriffsregeln

1. Benutzer sieht nur eigene Spielerprofile und abhängige Profile
2. Haushaltsmitglieder sehen nur Haushalte, in denen sie Mitglied sind
3. Kinder/Gäste erhalten nicht automatisch Admin-Rechte
4. Gemeinsame Sammlungen: lesbar für Haushaltsmitglieder
5. Persönliche Sammlungen: privat (es sei denn freigegeben)
6. Fremde Haushalte: nicht abrufbar allein durch ID-Kenntnis

#### Implementierungsstatus

- Keine Login-Seite vorhanden
- Keine Auth-Komponenten im aktuellen Projekt
- `/app/migration/neurowaysV1/` enthält `src/lib/authContext.jsx` und `src/lib/identity.js` aus v1 (nicht aktuell integriert)

---

## 14. Konfiguration und Umgebungen

### Produktions-Umgebung

**Hosting:** STRATO-Plattform (spezifisches Setup unknown)

**Build Output:** `/app/dist/`

**Entry:** `dist/index.html`

**Base URL:** `/` (muss relative Assets verwenden)

### Development-Umgebung

**Dev Server:** Vite HMR (Hot Module Reload)

**Port:** Nicht spezifiziert (default 5173?)

**Command:** `npm run dev` → `vite`

### Build-Scripts (package.json)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build --mode preview",
    "build:prod": "vite build",
    "preview": "vite preview"
  }
}
```

**Unterschied:**
- `build`: Mit `--mode preview` (vermutlich reduzierte Optimierungen?)
- `build:prod`: Standard Vite Production Build

### Environment Variables

**Status:** KEINE `.env` Datei vorhanden

**Benötigte Variablen (später):**
- Datenbank-Host/URL
- Datenbank-Name
- API-Base-URL
- Auth-Token/Secret (nicht in Code!)

**Sicherheit:** Keine Secrets sind hardcoded.

### Vite-Konfiguration

```javascript
// vite.config.js
import { defineConfig } from "/usr/lib/sfs-assistant-dev/platform-config.js";
export default defineConfig({});
```

**Status:** Minimal, nutzt Platform-Config.

### Tailwind-Konfiguration

```javascript
// tailwind.config.cjs
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media",
  theme: {
    extend: {},
  },
  plugins: [],
};
```

**Status:** Standard, keine Custom Theme-Tokens.

### Browser-Support

**Annahme:** Moderne Browser (keine Legacy-Unterstützung in Code sichtbar)

---

## 15. Externe Abhängigkeiten

### Platform-provided Packages (nicht in package.json)

| Package | Zweck | Benutzt |
|---------|-------|---------|
| react | UI-Framework | JA (Import in main.jsx) |
| react-dom | React DOM-Rendering | JA (createRoot) |
| react-router | Client-Side Routing | JA (BrowserRouter, Routes, NavLink) |
| vite | Build Tool | JA (npm run dev/build) |
| @vitejs/plugin-react | Vite React Plugin | Implizit (JSX-Support) |
| lucide-react | Icon Library | VERFÜGBAR (nicht benutzt) |
| pocketbase | Backend SDK | VERFÜGBAR (nicht benutzt) |
| tailwind-merge | Utility Merging | VERFÜGBAR (nicht benutzt) |
| Tailwind CSS v4 | Styling Engine | JA (@import tailwindcss) |

### Externe APIs/Services

**Status:** KEINE INTEGRATION

- Keine API-Calls in aktuellem Code
- Keine externe Services (Google Fonts, Analytics, etc.)
- Keine Drittanbieter-Authentifizierung

---

## 16. Bereits erledigte Entwicklungsaufgaben

Rekonstruiert aus Git-History:

| Aufgabe | Ergebnis | Status | Commit |
|---------|----------|--------|--------|
| Projekt-Initialisierung | Project skeleton mit Vite | ✓ | aae6e9a |
| NeuroWays Multi-Page Site Setup | 4 Seiten + Navigation + Footer | ✓ | d1b9325 |
| NeuroBalance.jsx Placeholder 1 | Erste Version der Seite | ✓ | 2138522 |
| NeuroBalance.jsx Placeholder 2 | Überarbeitete Version | ✓ | 246ff98 |
| NeuroBalance.jsx Placeholder 3 | Finale Placeholder-Version | ✓ | e2c1a3d |
| .gitignore Update | Dateiausschlüsse | ✓ | 65714e4 |
| ANALYSIS_INDEX.md | Index-Dokumentation | ✓ | 1033501 |
| Migration Master Prompt | Migrations-Anleitung | ✓ | 6ec1f39 |
| New Project Setup Prompt | Setup-Anleitung | ✓ | 58a3e45 |

**Gesamt:** 9 Commits, alle dokumentiert

**Was wurde **nicht** erledigt:**
- Keine Datenbank-Integration
- Keine echten Komponenten (nur Placeholders)
- Keine Tests
- Keine Authentifizierung
- Keine API-Integration

---

## 17. Teilweise erledigte Arbeiten

### 1. NeuroBalance-Modul

**Ursprüngliches Ziel:** Energy Navigator mit Check-in-Speicherung

**Bereits umgesetzt:**
- Seite mit Route `/neurobalance` erstellt
- Placeholder-UI mit Headline + Info-Cards

**Noch fehlend:**
- Energy Navigator Komponente (6 oder 5 Fragen?)
- Check-in Form und Logic
- Zone-Berechnung
- Verlaufs-Ansicht
- Datenbank-Speicherung
- Authentifizierung

**Relevante Dateien:**
- `src/pages/NeuroBalance.jsx` (Placeholder)
- `/app/migration/NeuroBalance.jsx` (großer Text-Export, keine funktionierenden Komponenten)

**Abhängigkeiten:**
- Datenbank-Schema
- Auth-System
- API-Endpunkte

---

### 2. NeuroPlay-Modul

**Ursprüngliches Ziel:** Brettspiel-Katalog mit Haushalts-Verwaltung

**Bereits umgesetzt:**
- Seite mit Route `/neuroplay` erstellt
- Placeholder-UI mit Headline + Info-Cards
- XLSX mit 75+ Spielen hochgeladen

**Noch fehlend:**
- Datenbank-Schema (17 Collections geplant)
- XLSX-Daten-Import und Validierung
- Spielekatalog-UI (Suche, Filter, Detail-Seite)
- Haushalts-Verwaltung (Mitglieder, Rollen)
- Sammlungs-Management (persönlich + Haushalt)
- Partien-Eingabe
- Regel-Quellen-Management
- Zugriffsregeln

**Relevante Dateien:**
- `src/pages/NeuroPlay.jsx` (Placeholder)
- `uploads/NeuroPlay_Brettspielanleitungen_Quellenkatalog_v1.4.1.xlsx` (Daten)
- `/app/migration/neurowaysV1/NW-VALIDATE-CASE-002_NEUROPLAY_CORE_STRESS_TEST.md` (850L Validierungs-Anforderungen)

**Abhängigkeiten:**
- Datenbank initialisieren
- Schema für 17+ Collections
- XLSX-Analyse + Datenbereinigung
- Import-Logik + Error-Handling

---

### 3. Migration der NeuroWays v1 Dokumentation

**Ursprüngliches Ziel:** Architektur-Standards dokumentieren

**Bereits umgesetzt:**
- Vollständiger Export von NeuroWays v1 unter `/app/migration/neurowaysV1/`
- 40+ Dokumente mit Core-Standards, Design-System, Governance
- Analyse-Reports: MIGRATION_QUICK_START.md, MIGRATION_BRIEFING_REPORT.md, DOCUMENTED_DISCREPANCIES.md
- 7 dokumentierte Widersprüche zwischen Dokumentation und Daten

**Noch fehlend:**
- Integration dieser Standards in aktuelles Projekt (wenn gewünscht)
- Entscheidung: Welche NeuroWays-Standards befolgen wir?

**Status:** REFERENZMATERIAL für weitere Entwicklung, nicht in aktuellem Projekt integriert

---

## 18. Offene Anforderungen und Backlog

### Priorisierung

**P0 (Blockierend/Kritisch für MVP)**

1. **Datenbank initialisieren**
   - Entscheidung: PocketBase oder andere?
   - Collections für NeuroBalance: users, player_profiles
   - Collections für NeuroPlay: publishers, games, game_editions, etc.
   - Abhängigkeiten: Keine
   - Ergebnis: Funktionsfähige Datenbank mit Schema
   - Akzeptanz: Collections vorhanden, Schema getestet

2. **NeuroPlay XLSX analysieren und validieren**
   - Lese XLSX-Datei aus
   - Verstehe Struktur (75+ Spiele, Verlage, Regeln)
   - Identifiziere fehlende/fehlerhafte Daten
   - Dokumentiere Datenqualitäts-Probleme
   - Abhängigkeiten: Keine
   - Ergebnis: Daten-Analyse-Report
   - Akzeptanz: Bericht mit Struktur, Fehlern, Migration-Plan

3. **NeuroBalance Check-in Form implementieren**
   - 6 Fragen (oder 5? Klären!)
   - Antwort-Optionen (1–6 oder 1–5 Skala)
   - Form-Komponente mit Validierung
   - Abhängigkeiten: Datenbank (P0-#1), Fragen-Klärung (offene Entscheidung)
   - Ergebnis: Check-in Form, Save-Button
   - Akzeptanz: Form rendert, speichert in DB

---

**P1 (Notwendig für nächsten funktionsfähigen Stand)**

4. **NeuroBalance Zone-Berechnung**
   - Mapping: Punkte → Zones
   - Zone-Icons + Beschreibungen
   - Ergebnis-Anzeige
   - Abhängigkeiten: P0-#3, Zone-Definition klären
   - Ergebnis: Zone-Cards mit Icons
   - Akzeptanz: Check-in → Zone berechnet + angezeigt

5. **NeuroPlay XLSX → DB Import**
   - Lese Spieldaten aus XLSX
   - Validiere gegen Schema
   - Speichere in collections
   - Error-Handling für unvollständige Daten
   - Abhängigkeiten: P0-#1, P0-#2
   - Ergebnis: 75+ Spiele in DB
   - Akzeptanz: Spiele in DB vorhanden, abfragbar

6. **Authentifizierung (Login/Logout)**
   - Login-Seite erstellen
   - Auth-Context etablieren
   - Session/Token-Management
   - Protected Routes
   - Abhängigkeiten: Datenbank (P0-#1)
   - Ergebnis: Login funktioniert
   - Akzeptanz: Anmeldung + Weiterleitung möglich

7. **Spielekatalog-UI (Suche, Filter, Detail-Seite)**
   - Katalog-Seite mit Grid/List
   - Suche (Text)
   - Filter: Kategorie, Spieler-Anzahl, Dauer, etc.
   - Seiten-Navigation (Pagination oder Scroll)
   - Detail-Seite: Infos, Regeln, "Zur Sammlung"-Button
   - Abhängigkeiten: P1-#5 (Spiele in DB)
   - Ergebnis: Benutzer kann Spiele durchsuchen
   - Akzeptanz: Katalog-UI funktioniert, Filter wirken

---

**P2 (Wichtig)**

8. **Haushalts-Verwaltung**
   - Neuer Haushalt erstellen
   - Mitglieder hinzufügen
   - Rollen vergeben (OWNER, ADMIN, MEMBER, etc.)
   - Mitgliedschaft entfernen
   - Abhängigkeiten: P1-#6 (Auth)
   - Ergebnis: Haushalts-CRUD funktioniert
   - Akzeptanz: Admin kann Haushalt verwalten

9. **Sammlungs-Management**
   - Sammlung erstellen (persönlich oder Haushalt)
   - Spiel zur Sammlung hinzufügen
   - Menge verwalten
   - Sammlungen auflisten
   - Abhängigkeiten: P2-#8, P0-#1
   - Ergebnis: Benutzer kann Sammlungen pflegen
   - Akzeptanz: Spiele in Sammlung speicherbar

10. **Spielpartien-Management**
    - Neue Partie erstellen
    - Spieler/Gäste auswählen
    - Ergebnis eintragen (optional: Punkte, Gewinner, Platzierung)
    - Partien-Liste anzeigen
    - Abhängigkeiten: P2-#8 (Haushalt), P0-#1
    - Ergebnis: Partien speicherbar
    - Akzeptanz: Partie erstellt und abfragbar

11. **NeuroBalance Check-in Verlauf**
    - History-Seite mit Check-ins chronologisch
    - Trends visualisieren (Grafik?)
    - Filter nach Datum
    - Abhängigkeiten: P0-#3, P1-#4
    - Ergebnis: Benutzer sieht eigene Check-ins
    - Akzeptanz: Verlauf wird angezeigt

---

**P3 (Später/Optional)**

12. Tests (Unit, Integration, E2E)
13. Regel-Quellen-Management (PDF-Upload, etc.)
14. Spieler-Präferenzen (Favoriten, Bewertungen)
15. Community-Features (Teilen, Statistiken)
16. Mobile App (React Native?)
17. Design System vollständig implementieren
18. Dokumentation + API-Spezifikation

---

### Blockierungen und Abhängigkeiten

- **Datenbank-Entscheidung** blockiert alle P0/P1 Aufgaben
- **Fragen-Klärung** (5 vs 6, Skala) blockiert NeuroBalance
- **Zone-Definition** (Punkte → Zone Mapping) blockiert Zone-Berechnung
- **XLSX-Analyse** blockiert Import
- **Auth-System** blockiert rollenbasierte Zugriffe

---

## 19. Bekannte Fehler und technische Schulden

### Fehler (blockierend oder kritisch)

**Keine aktiven Fehler dokumentiert** (Projekt ist zu früh für kritische Bugs)

---

### Technische Schulden

| Schuld | Auswirkung | Empfohlene Lösung | Priorität |
|--------|-----------|-------------------|-----------|
| Datenbank-Wahl offen | Kann nicht implementieren ohne DB | Entscheidung treffen: PocketBase? | P0 |
| 5 vs 6 Fragen (Widerspruch) | NeuroBalance kann nicht implementiert werden | Fragen klären + Seed-Daten synchronisieren | P0 |
| NeuroBalance.jsx Datei (12K Text-Export) | Nicht lauffähig, verwirrt Entwicklung | Löschen oder in /docs/ verschieben | P1 |
| Keine Tests | Qualität fragwürdig ab >5 Komponenten | Test-Framework etablieren (Vitest?) | P1 |
| Keine Authentifizierung | Keine Zugriffsschutz | Implementieren vor Datenschutz-Features | P0 |
| Tailwind: Nur Standard-Theme | Branding mangelhaft | Custom Colors + Fonts definieren | P2 |
| favicon.svg Placeholder | Unprofessionell | Echtes Logo erstellen | P2 |
| AGENTS.md veraltet nach Änderungen | Dokumentation divergiert | Nach jeder Änderung updaten | P2 |

---

### Unsicherheiten im Code

1. **Responsive Design nicht validiert** — Placeholder-Seiten nicht auf 375px getestet
2. **React StrictMode Double-Invocation** — Könnte Later Probleme mit Effects bereiten (gut dokumentiert in AGENTS.md)
3. **Keine Error-Handling** — Fehler-Grenzen nicht implementiert

---

## 20. Getroffene Architektur- und Entwicklungsentscheidungen

| Entscheidung | Hintergrund | Gewählte Lösung | Alternativen | Konsequenzen |
|---|---|---|---|---|
| **React + React Router für SPA** | Standard für interaktive Web-Apps | BrowserRouter + Routes | Next.js, Vue, Svelte | Client-side Routing, kein Server-Rendering |
| **Tailwind CSS v4** | Platform-provided, modern | v4 mit @import | v3, CSS Modules, styled-components | Kein npm install nötig, schnelle Entwicklung |
| **Vite als Build-Tool** | Platform-provided, schnell | vite build | Webpack, Parcel | Blitzschnelle Dev-Server, modernes Build |
| **Keine Node Packages** | Platform-Zwang (alles provided) | Empty package.json | npm install möglich | Weniger Dependencies, aber auch weniger Flexibilität |
| **Flache Seiten-Struktur** | Einfachheit für MVP | 4 Top-Level Routes | Nested Routes, Subcategories | Einfach zu verstehen, aber weniger modular |
| **Statische Placeholder-Seiten** | Schnelle UI-Gerüst ohne Logik | JSX mit Tailwind Styling | Datenanbindung von Tag 1 | UI schnell sichtbar, aber keine Funktionalität |
| **Migration-Docs in /app/migration/** | Referenzmaterial für NeuroWays v1 | Separate /app/migration/ Struktur | In /docs/ verschieben | Leicht zu finden, aber könnte verwirren |
| **Git commits für jede Seite** | Nachvollziehbar | Ein commit pro Seite/Feature | Squash commits | Geschichte ist detailliert |

**Alle Entscheidungen scheinen bewusst gewählt und dokumentiert.**

---

## 21. Offene Entscheidungen

### Kritisch (blockieren Implementierung)

1. **Datenbanktechnologie**
   - **Fragestellung:** PocketBase vs. SQL-Datenbank vs. andere?
   - **Warum relevant:** Bestimmt Schema, API, Auth-Integration
   - **Betroffene Bereiche:** Alle P0/P1 Aufgaben
   - **Optionen:**
     - PocketBase (erwähnt in NeuroWays-Doku, real-time möglich)
     - PostgreSQL/MySQL (traditionell, robust)
     - SQLite (einfach, aber Single-Connection)
   - **Was blockiert:** NeuroBalance + NeuroPlay Implementierung

2. **NeuroBalance Fragen-Zahl und Scoring**
   - **Fragestellung:** 5 oder 6 Fragen? Skala 5–25 oder 6–30?
   - **Warum relevant:** Bestimmt Zone-Berechnung und Datenformat
   - **Betroffene Bereiche:** NeuroBalance Check-in, Zone-Mapping
   - **Optionen:**
     - 5 Fragen, Skala 5–25 (laut DOCUMENTED_DISCREPANCIES.md v1-Realität)
     - 6 Fragen, Skala 6–30 (laut AGENTS.md ursprünglicher Plan)
   - **Was blockiert:** NeuroBalance Form implementieren

3. **Zone-Punkt-Mapping**
   - **Fragestellung:** Welche Punkte gehören zu welcher Zone?
   - **Beispiel:** 5–8 Punkte = Shutdown? 20–25 = Hyperarousal?
   - **Warum relevant:** Check-in berechnet Zone basierend darauf
   - **Optionen:** Auftrag dokumentiert nur Zone-Namen, nicht Grenzen
   - **Was blockiert:** Zone-Berechnung implementieren

4. **NeuroWays v1 Standards nutzen oder nicht?**
   - **Fragestellung:** Folgen wir den 40+ Design/Development Standards aus NeuroWays v1?
   - **Optionen:**
     - Vollständig integrieren (viel Aufwand, aber kohärent)
     - Selektiv nutzen (nur Design System, z. B.)
     - Ignorieren und eigene Wege gehen (schneller, aber möglich divergent)
   - **Was blockiert:** Architektur-Kohärenz, Skalierbarkeit zu Modul 3+

### Wichtig (beeinflussen Design)

5. **NeuroWays Core vs. aktuelles Projekt**
   - **Fragestellung:** Implementieren wir Core-Komponenten in diesem Projekt oder separat?
   - **Warum relevant:** NeuroBalance und NeuroPlay brauchen gleiche Auth/Identity
   - **Optionen:**
     - Core zuerst (AGENTS.md, auth, identity)
     - Minimale Core embedded (Was wirklich nötig?)
     - Später separieren (schneller MVP)
   - **Was blockiert:** Modularität, Wiederverwendung

6. **XLSX-Datenqualität**
   - **Fragestellung:** Wie gehen wir mit fehlenden/falschen Daten um?
   - **Beispiel:** "Zauberberg" AMIGO-Edition: Ist EAN korrekt?
   - **Optionen:**
     - Strict: Nur komplette Daten importieren (small dataset)
     - Lenient: Mit Platzhaltern/Prüfflags importieren (full dataset)
   - **Was blockiert:** Datenbereinigung, manuelles Fixing

---

## 22. Tests und Qualitätssicherung

**Status: NICHT VORHANDEN**

### Nicht implementiert

- Keine Unit Tests
- Keine Integration Tests
- Keine E2E Tests
- Kein Test-Framework (Jest, Vitest, Playwright, etc.)
- Kein CI/CD Pipeline sichtbar

### Getestet (manuell, visuell)

- Navigation funktioniert (testet lokal im Dev-Server)
- Seiten rendern ohne JS-Fehler
- Responsive Design: Nicht getestet auf 375px, 768px, 1280px (Annahme, aber nicht validiert)

### Test-Lücken

- Komponenten-Rendering
- Routing
- Tailwind CSS Output
- Performance
- Accessibility (a11y)
- Browser-Kompatibilität

### Empfohlene Test-Strategie

| Level | Tool | Wann | Abdeckung |
|-------|------|------|-----------|
| Unit | Vitest | Komponenten-Logik | 80%+ |
| Integration | Testing Library (React) | Component Interaction | 60%+ |
| E2E | Playwright oder Cypress | User Flows | 40%+ (kritische Paths) |
| Accessibility | axe-core | Design-Komponenten | 100% |
| Performance | Lighthouse | Seiten-Laden | <3s LCP |

---

## 23. Deployment und Betrieb

### Deployment-Pipeline

```
Git Repo (/app/)
    ↓ (push to main/dev?)
Build Process
    ↓ (npm run build:prod)
    vite build
    ↓
dist/ Verzeichnis
    ├── index.html (mit <base href="/">)
    ├── favicon.svg
    └── assets/
        ├── index-[hash].js
        └── index-[hash].css
    ↓
STRATO-Plattform (spezifisches Deployment)
    ↓
Live Site unter https://neuroways.XXX
```

### Build-Kommandos

| Befehl | Ziel | Optimizer | Output |
|--------|------|-----------|--------|
| `npm run dev` | Development | None (HMR) | Dev-Server :5173 |
| `npm run build` | Preview/Staging? | Minimal | `dist/` (--mode preview) |
| `npm run build:prod` | Production | Full | `dist/` (prod build) |
| `npm run preview` | Local Preview | Prod-Simulation | Preview-Server |

### Deployment-Hosting

- **Plattform:** STRATO (spezifische Infos: Unknown)
- **Domain:** neuroways.de (angenommen, nicht bestätigt)
- **SSL:** Vermutlich ja (moderne Plattform)
- **CDN:** Möglich (static Assets über /static/?)
- **Regions:** Single Region? Unknown

### Build-Status

- **Letzter erfolgreicher Build:** dist/ vorhanden und committed (Stand: 25.7.2026, 14:33)
- **Build-Artefakte:** dist/ mit 2 JS + 1 CSS Asset
- **Größe:** JS ~60KB, CSS ~1KB (komprimiert?)

### Rollback-Plan

- **Git-basiert:** Älterer Commit auschecken, neu bauen
- **Datei-basiert:** dist/ aus Backup wiederherstellen
- **Spezifisches Rollback-Verfahren:** Unknown (STRATO-spezifisch)

---

## 24. Risiken

| Risiko | Eintritts-Wahrscheinlichkeit | Auswirkung | Gegenmaßnahme |
|--------|-------|-----------|----------|
| **Datenbank-Entscheidung führt zu Rewrite** | Mittel | Kritisch | Klärung vor NeuroBalance-Implementierung |
| **XLSX-Daten sind inkonsistent** | Hoch | Kritisch | Datenqualitäts-Analyse (P0-#2) durchführen |
| **NeuroWays v1 Standards divergieren von aktuellen Anforderungen** | Mittel | Hoch | Standards-Review durchführen |
| **Responsive Design ist broken bei 375px** | Mittel | Mittel | Testen vor Production Deploy |
| **React StrictMode führt zu unerwarteten Effekten** | Niedrig | Mittel | Code-Review für Effects + Memos |
| **Performance bei 75+ Spielen (DB ohne Indizes)** | Mittel | Mittel | Pagination + Indexing von Start an |
| **Authentifizierung später hinzugefügt = Refactor** | Hoch | Hoch | Auth von Tag 1 planen |
| **Keine Tests = Bug-Häufung bei >100 Komponenten** | Hoch | Hoch | Test-Strategie früh etablieren |
| **Datenschutz-Anforderungen unerfüllt** | Mittel | Kritisch | Compliance-Check vor Feature-Release |
| **Zone-Definition ist medizinisch fragwürdig** | Niedrig | Kritisch | Fachliche Validierung einholen (NeuroScientist?) |

---

## 25. Empfohlene nächste Entwicklungsschritte

### Phase 1: Foundation (Wochen 1–2)

**Ziel:** Datenbank + Auth bereit, MVP-Struktur

#### Step 1.1: Datenbank-Entscheidung und Setup

- **Aufgabe:** Klären: PocketBase, PostgreSQL oder andere?
- **Ziel:** Funktionierende Datenbank mit Schema
- **Voraussetzungen:** Keine
- **Betroffene Dateien:** Neu: `.env`, `db/schema.js` o.ä.
- **Erwartetes Ergebnis:** Datenbank antwortet auf Abfragen
- **Akzeptanzkriterium:**
  - Collections/Tabellen für NeuroBalance + NeuroPlay existieren
  - Testabfrage funktioniert
  - Dokumentation: DB-Setup-Guide

#### Step 1.2: NeuroBalance Fragen-Klärung

- **Aufgabe:** 5 oder 6 Fragen definieren? Mapping: Punkte → Zonen?
- **Ziel:** Unambiguous Spec für Check-in-Logik
- **Voraussetzungen:** Keine (paralleles Projekt)
- **Betroffene Dateien:** `docs/NEUROBALANCE_SPEC.md` (neu)
- **Erwartetes Ergebnis:** Spec-Dokument mit Fragen, Skala, Zone-Mapping
- **Akzeptanzkriterium:**
  - 5 oder 6 Fragen definiert
  - Antwort-Optionen dokumentiert
  - Zone-Grenzen (z. B. 5–8 Punkte = Shutdown)

#### Step 1.3: NeuroPlay XLSX Analyse

- **Aufgabe:** XLSX einlesen, Struktur verstehen, Fehler identifizieren
- **Ziel:** Daten-Analyse-Report
- **Voraussetzungen:** Keine
- **Betroffene Dateien:** Neue Analyse-Datei (z. B. `docs/NEUROPLAY_XLSX_ANALYSIS.md`)
- **Erwartetes Ergebnis:** Report mit 75 Spielen + Verlags-Daten + Quality-Issues
- **Akzeptanzkriterium:**
  - Alle 75 Spiele gelistet
  - Fehlende/fehlerhafte Felder dokumentiert
  - Migrationsplan: Welche Daten wohin?

---

### Phase 2: Core Features (Wochen 3–4)

#### Step 2.1: NeuroBalance Check-in Form

- **Aufgabe:** Komponente mit 5–6 Fragen + Speicherung
- **Ziel:** Benutzer kann Check-in eingeben und speichern
- **Voraussetzungen:** 1.1 (DB), 1.2 (Spec)
- **Betroffene Dateien:**
  - `src/pages/NeuroBalance.jsx` (überarbeiten, nicht nur Placeholder)
  - `src/components/CheckInForm.jsx` (neu)
  - Möglich: `src/lib/scoring.js` (Punkt-Berechnung)
- **Erwartetes Ergebnis:** Check-in-Form rendert, speichert in DB
- **Akzeptanzkriterium:**
  - Form mit allen 5–6 Fragen
  - Validierung: Keine leeren Antworten
  - Speicherung: DB enthält Check-in mit Timestamp + Methoden-Version

#### Step 2.2: NeuroBalance Zone-Berechnung

- **Aufgabe:** Punkte → Zone, Zone-UI-Card zeigen
- **Ziel:** Check-in zeigt resultierende Zone
- **Voraussetzungen:** 2.1, 1.2 (Spec mit Zone-Mapping)
- **Betroffene Dateien:**
  - `src/components/ZoneCard.jsx` (neu oder overhaul)
  - `src/components/ZoneIcon.jsx` (neu)
  - `src/lib/scoring.js` (erweitern)
- **Erwartetes Ergebnis:** Nach Check-in-Speicherung: Zone-Card mit Icon + Name + Beschreibung
- **Akzeptanzkriterium:**
  - Zone korrekt berechnet (Testwerte)
  - Icon + Farbe sichtbar
  - Beschreibung für Zone angezeigt

#### Step 2.3: NeuroPlay XLSX Import

- **Aufgabe:** 75 Spiele + Verlags-Daten aus XLSX in DB speichern
- **Ziel:** Spielekatalog in Datenbank verfügbar
- **Voraussetzungen:** 1.1 (DB), 1.3 (XLSX-Analyse)
- **Betroffene Dateien:**
  - Neue: `src/lib/import.js` (XLSX-Parser + Validierung)
  - Neue: `src/pages/ImportPage.jsx` (Import-UI, nur Admin)
  - Neue: `docs/NEUROPLAY_IMPORT_LOG.md` (Ergebnisse)
- **Erwartetes Ergebnis:** 75 Spiele in DB, durchsuchbar
- **Akzeptanzkriterium:**
  - Alle 75 Spiele importiert
  - Keine Doppelten (eindeutige game_code)
  - Error-Log für fehlende/fehlerhafte Daten

---

### Phase 3: User Features (Wochen 5–6)

#### Step 3.1: Authentifizierung

- **Aufgabe:** Login + Logout + Session
- **Ziel:** Benutzer kann sich anmelden, Seiten geschützt
- **Voraussetzungen:** 1.1 (DB mit users)
- **Betroffene Dateien:**
  - `src/pages/LoginPage.jsx` (neu)
  - `src/lib/authContext.jsx` (neu oder aus v1 anpassen)
  - `src/components/ProtectedRoute.jsx` (neu)
  - `src/App.jsx` (anpassen für Protected Routes)
- **Erwartetes Ergebnis:** Login-Seite, Auth-Context, Token-Management
- **Akzeptanzkriterium:**
  - Benutzer kann Login-Form ausfüllen
  - Token wird gespeichert
  - Seiten können geschützt werden (@ProtectedRoute)
  - Logout möglich

#### Step 3.2: Spielekatalog-UI

- **Aufgabe:** Seite mit Spielen, Suche, Filter, Detail-Seite
- **Ziel:** Benutzer kann Spiele durchsuchen
- **Voraussetzungen:** 2.3 (Spiele in DB), 3.1 (Auth optional)
- **Betroffene Dateien:**
  - `src/pages/CatalogPage.jsx` (neu, ersetzte NeuroPlay-Placeholder)
  - `src/components/GameCard.jsx` (neu)
  - `src/components/GameDetail.jsx` (neu)
  - `src/lib/queries.js` (Datenbank-Abfragen)
- **Erwartetes Ergebnis:** Katalog mit 75 Spielen, suchbar/filterbar
- **Akzeptanzkriterium:**
  - Grid/List mit Spielen
  - Suche funktioniert (Name)
  - Filter: Kategorie, Spieler-Anzahl, Dauer
  - Detail-Seite für Spiel

---

### Phase 4: Haushalt + Sammlungen (Wochen 7–8)

#### Step 4.1: Haushalts-Management

#### Step 4.2: Sammlungs-Management

#### Step 4.3: Spielpartien-Eintrag

---

### Phase 5: Polish + Tests (Wochen 9–10)

#### Step 5.1: NeuroBalance History/Trends

#### Step 5.2: Test-Suite

#### Step 5.3: Responsive Design Validierung

---

**Annahmen:**
- Team von 1–2 Entwicklern
- Full-time Commitment
- Keine zusätzliche Komplexität (z. B. Mobile App, Analytics, etc.)

---

## 26. Einstiegspunkt für die nächste KI

### Was muss zuerst gelesen werden?

1. **Diese Datei (PROJECT_HANDOVER.md)** — Gesamtübersicht
2. **AGENTS.md** — Projekt-Metadaten (Stack, Struktur, Leitlinien)
3. **`/app/migration/neurowaysV1/`** — Nur wenn NeuroWays-Standards integriert werden sollen
4. **Spezifische Aufträge:**
   - NeuroBalance: `/app/migration/neurowaysV1/NeuroWays-dev/[NeuroBalance-Auftrag]`
   - NeuroPlay: Original-Auftrag dieses Prompts (in Session-History)

### Welche Dateien sind besonders wichtig?

| Datei | Grund | Ändern? |
|-------|-------|---------|
| `src/App.jsx` | Router-Kern | Nur wenn neue Routes nötig |
| `src/layouts/SiteLayout.jsx` | Global Navigation | Vorsicht: Ändert alles sichtbar |
| `tailwind.config.cjs` | Design-Tokens | Branding + Custom Colors hier |
| `index.html` | Title, Meta, Favicon | Identity, nicht Logik |
| `AGENTS.md` | Projekt-Metadaten | Updaten nach größeren Änderungen |
| `vite.config.js` | Build-Config | Normalerweise nicht anfassen |

### Was darf nicht ohne Prüfung verändert werden?

- `/app/migration/neurowaysV1/` — Archiv, nicht ändern
- `dist/` — Auto-generiert, nicht per Hand ändern
- `.git/` — Git-History
- `package.json` — Keine neuen Dependencies hinzufügen (Platform-provided nutzen)

### Was ist aktuell der nächste empfohlene Arbeitsschritt?

**Phase 1, Step 1.1 (siehe Sektion 25):** Datenbank-Entscheidung und Setup
- Klären: PocketBase, PostgreSQL oder andere?
- Collections für NeuroBalance + NeuroPlay anlegen
- Testabfrage durchführen
- Dokumentation schreiben

### Welche offenen Entscheidungen müssen respektiert werden?

1. **Datenbanktechnologie** — Blockiert alles, zuerst klären
2. **NeuroBalance Fragen-Zahl** (5 vs 6) — Blockiert Form-Implementierung
3. **Zone-Punkt-Mapping** — Blockiert Zone-Berechnung
4. **NeuroWays v1 Standards** — Architektur-Kohärenz wichtig

**Wenn unklar:** Diese Entscheidungen in Backlog öffnen, nicht selbst treffen.

### Wie kann die KI prüfen, dass ihre Änderung funktioniert?

1. **Dev Server starten:** `npm run dev`
2. **In Browser öffnen:** http://localhost:5173 (oder Platform-URL)
3. **Visuell testen:** Navigation, Responsive (DevTools 375px)
4. **Build testen:** `npm run build:prod` → `dist/` muss gültig sein
5. **Git:** Commits mit aussagekräftigen Messages (`feat:`, `fix:`, `docs:`)
6. **Vite-Logs prüfen:** (siehe AGENTS.md, Logs unter `$PROJECT_DIRECTORY/logs/`)

**Wenn Build fehlschlägt:** Fehler fixen, nie mit fehler-haft Builds commiten.

---

## 27. Unsicherheiten und fehlende Informationen

### Nicht analysierbar aus verfügbaren Daten

1. **NeuroPlay XLSX Struktur**
   - Datei nicht gelesen (zu groß, oder Lesefunktion fehlte)
   - Struktur: Wie sind Spiele organisiert? Welche Spalten?
   - Datenqualität: Sind alle 75 Spiele komplett?
   - **Blockiert:** XLSX-Analyse (P0-#2)

2. **Datenbank-Setup im STRATO**
   - Ist PocketBase bereits initialisiert?
   - Wie wird Authentifizierung gehandhabt?
   - API-Endpunkte verfügbar?
   - **Blockiert:** Phase 1 aller Implementierung

3. **NeuroWays v1 Implementierung**
   - Laufen NeuroBalance + NeuroPlay irgendwo?
   - Sind die Komponenten (ZoneCard, AnswerCard, etc.) funktionsfähig?
   - `/app/migration/NeuroBalance.jsx` 12K-Datei: Ist sie Code oder Export?
   - **Blockiert:** Wiederverwendungs-Entscheidungen

4. **Design System Vollständigkeit**
   - Sind die 9 NeuroWays-DS-Dokumente bindend?
   - Custom Fonts/Farben/Spacing nach NW-Standard oder eigenes Design?
   - **Blockiert:** Styling-Entscheidungen

5. **Deployment-Pipeline**
   - Wie wird aktuell deployed? (Git Hook, Manual, CI/CD?)
   - Wo landen Build-Artefakte?
   - Wie schnell ist Propagation live?
   - **Blockiert:** Release-Planung

6. **Mobile-Anforderungen**
   - Ist Mobile-First bindend oder Desktop-First OK?
   - Responsive Design: 375px Minimum?
   - Native App irgendwann?
   - **Blockiert:** UI-Entscheidungen

7. **Fachliche Zone-Definition**
   - Wer definiert die 5 Zonen (Hyperarousal, Flight, etc.)?
   - Sind diese basierend auf Polyvagal-Theorie, Yerkes-Dodson, oder anderes?
   - Punkt-zu-Zone-Mapping: Wissenschaftlich oder empirisch?
   - **Blockiert:** NeuroBalance-Korrektheit

8. **Privacy/Compliance**
   - Welche Datenschutz-Anforderungen gelten? (GDPR?)
   - Sind Pseudonyms/Anonymisierung erforderlich?
   - Wie lange werden Check-ins gespeichert?
   - **Blockiert:** Datenschutz-Features

9. **NeuroWays Core Modulextraktion**
   - Soll der Core irgendwann separat sein?
   - Gibt es Abhängigkeiten zwischen Modulen, die Core sein müssen?
   - **Blockiert:** Langfristige Architektur

10. **Seed-Daten für NeuroBalance**
    - Gibt es Test-Fragen/Antworten für Entwicklung?
    - Sollen Beispiel-Check-ins geladen werden?
    - **Blockiert:** Entwicklung + Testing

---

### Was wurde nicht analysiert (weil nicht verfügbar)

- **NeuroPlay XLSX Inhalt** — Datei nicht gelesen, würde Spezial-Tool brauchen
- **PocketBase Konfiguration** — Falls vorhanden, nicht im Repo
- **Deployment/Hosting-Spezifika** — STRATO-intern
- **CI/CD Pipeline** — Falls vorhanden, nicht in /app/
- **Performance-Baselines** — Keine Metrics dokumentiert
- **Sicherheits-Audit** — Nicht durchgeführt

---

## 28. Übergabe-Checkliste

Vor Abschluss dieser Übergabe:

- [x] Anforderungen erfasst (4.1 Anforderungskatalog)
- [x] Implementierte Funktionen dokumentiert (5. Funktionsumfang)
- [x] Offene Anforderungen erfasst (18. Backlog)
- [x] Teilweise implementierte Funktionen dokumentiert (17. Teilweise erledigt)
- [x] Seitenstruktur dokumentiert (6. Seiten + Navigation)
- [x] Repositorystruktur dokumentiert (9. Verzeichnisse)
- [x] Architektur dokumentiert (8. Technische Architektur)
- [x] Datenbank dokumentiert (10. Datenbank: NICHT VORHANDEN)
- [x] APIs dokumentiert (11. API: NICHT VORHANDEN)
- [x] Geschäftslogik dokumentiert (12. Fachliche Logik: Minimal)
- [x] Auth dokumentiert (13. Auth: NICHT IMPLEMENTIERT)
- [x] Erledigte Aufgaben erfasst (16. Erledigte Tasks)
- [x] Offene Aufgaben erfasst (18. Backlog mit Priorisierung)
- [x] Fehler und Schulden dokumentiert (19. Fehler & Schulden)
- [x] Entscheidungen dokumentiert (20. Getroffene Entscheidungen)
- [x] Offene Entscheidungen dokumentiert (21. Offene Entscheidungen)
- [x] Tests dokumentiert (22. Tests: NICHT VORHANDEN)
- [x] Deployment dokumentiert (23. Deployment)
- [x] Risiken dokumentiert (24. Risiken)
- [x] Nächste Schritte definiert (25. Empfohlene Steps)
- [x] Einstiegspunkt klar (26. Für nächste KI)
- [x] Unsicherheiten dokumentiert (27. Unsicherheiten)
- [x] Keine Secrets in Handover (✓ Keine .env, API Keys, Passwörter erwähnt)
- [x] Keine Lücken durch Annahmen gefüllt (Alle Unsicherheiten explizit in 27. dokumentiert)

**Übergabe ist vollständig und kann freigegeben werden.**

---

## Fazit

Das NeuroWays-Projekt ist in **früher Phase mit solidem UI-Fundament**. Die vier Seiten existieren als funktionsfähige Placeholder mit guter Navigation und Styling-Setup. Alle kritischen Aufgaben (Datenbank, Auth, NeuroBalance-Logik, NeuroPlay-Import) sind noch offen.

**Die nächste KI sollte mit Phase 1 beginnen: Datenbank-Setup + Klärung kritischer Entscheidungen.**

