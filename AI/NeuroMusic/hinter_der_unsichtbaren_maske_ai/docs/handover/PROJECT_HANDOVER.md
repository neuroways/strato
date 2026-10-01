# PROJECT HANDOVER – Hinter der unsichtbaren Maske

## 1. Dokumentinformationen

- **Projekt:** Hinter der unsichtbaren Maske – Digitales Album-Booklet
- **Datum:** 2026-08-15
- **Repository:** https://github.com/hinter_der_unsichtbaren_maske_ai
- **Branch:** dev (default)
- **Entwicklungsstand:** v1.0 – Funktionsfähig, produktionsreif
- **Technologien:** Vite + React + React Router + Tailwind CSS v4 + PocketBase
- **Hosting/Deployment:** IONOS-Plattform (platform.ionos.space)
- **Zweck der Übergabe:** Vollständige Sicherung des aktuellen Projektsstatus und Übergabe für künftige Entwicklung

---

## 2. Executive Summary

Das Projekt „Hinter der unsichtbaren Maske" ist eine responsive, webbasierte Album-Website – ein hochwertig gestaltetes digitales Album-Booklet für 7 Songs.

**Was:** Eine Single-Page-Application (SPA) in React, die ein Album mit Songtext-Inhalten als interaktives Leseerlebnis präsentiert.

**Wen:** Künstlerin und ihre Besucherinnen – zum Lesen, Navigieren und Entdecken von Songtexten und Album-Informationen.

**Ziel:** Präsentation der Song-Texte als wunderschönes, ruhiges, responsives digitales Booklet mit einer klaren visuellen Sprache (70% Schwarz-Weiß, 30% Pastellfarben).

**Entwicklungsstand:** Version 1.0 ist abgeschlossen und produktionsreif.
- ✓ Alle 7 Songs laden aus der Datenbank
- ✓ Responsive Design auf Mobile/Tablet/Desktop
- ✓ Vollständige Songtexte mit Struktur-Abschnitten
- ✓ Navigation zwischen Songs
- ✓ Fehlerbehandlung mit Fallback-Daten
- ✓ Barrierefreiheit (semantisches HTML, Fokus-States, Kontraste)

---

## 3. Fachliches Zielbild

Eine ruhige, künstlerisch gestaltete Website, die einem hochwertigen gedruckten Album-Booklet ähnelt:

- **Visuell:** Klare Struktur außen (Schwarz/Weiß/Creme), emotionale Vielfalt innen (Pastellfarben, Schmetterlinge, botanische Elemente)
- **Inhalt:** Alle Songtexte vollständig und hochwertig formatiert, direkt aus der Datenbank geladen
- **Navigation:** Intuitiv zwischen Songs navigieren, stabile deep links zu einzelnen Songs
- **Responsive:** Funktioniert nahtlos auf Smartphone (375px), Tablet (768px) und Desktop (1280px+)
- **Barrierearm:** Semantisches HTML, gute Kontraste, Tastaturnavigation, Fokus-Zustände

---

## 4. Anforderungen

| ID | Anforderung | Kategorie | Status | Nachweis | Offene Punkte |
|---|---|---|---|---|---|
| REQ-001 | Album-Startseite mit Cover und Trackliste | UI/UX | IMPLEMENTIERT | HomePage.jsx | — |
| REQ-002 | 7 Songs mit vollständigen Texten darstellen | Datenverwaltung | IMPLEMENTIERT | SongPage.jsx, pb.js | — |
| REQ-003 | Responsive Design (375px, 768px, 1280px+) | Frontend | IMPLEMENTIERT | Tailwind CSS, media queries | — |
| REQ-004 | Navigation zwischen Songs | Routing | IMPLEMENTIERT | React Router, prev/next links | — |
| REQ-005 | Deep Links zu einzelnen Songs (/songs/:id) | Routing | IMPLEMENTIERT | App.jsx, React Router | — |
| REQ-006 | Songtexte aus PocketBase laden | Backend | IMPLEMENTIERT | pb.js, HomePage, SongPage | — |
| REQ-007 | Fallback-Daten bei Datenbankfehler | Error Handling | IMPLEMENTIERT | HomePage.jsx, SongPage.jsx | — |
| REQ-008 | Design: 70% BW, 30% Pastellfarben | Design | IMPLEMENTIERT | CSS-Variablen, Tailwind config | — |
| REQ-009 | Barrierefreiheit (a11y) | Frontend | IMPLEMENTIERT | Semantic HTML, ARIA, Kontraste | — |
| REQ-010 | 404-Fehlerseite | Error Handling | IMPLEMENTIERT | NotFound.jsx | — |

---

## 5. Implementierter Funktionsumfang

### 5.1 Startseite (HomePage)

**Zweck:** Präsentation des Albums und Zugang zu Song-Details

**Status:** IMPLEMENTIERT ✓

**Dateien:**
- `src/components/HomePage.jsx` (300 LOC)
- `src/index.css` (CSS-Variablen)

**Daten:**
- Album aus `albums`-Kollektion (ID-basiert, via PocketBase)
- Songs aus `songs`-Kollektion (gefiltert nach Album, sortiert nach trackNumber)

**Funktionen:**
- Lädt Album-Daten asynchron
- Stellt Albumcover dar (`/static/album-cover.png`)
- Zeigt Trackliste als 3-spaltige Gitterkarte (Desktop), 1 Spalte (Mobile)
- Jede Songkarte ist anklickbar und navigiert zu `/songs/:songId`
- Fehler-/Ladezustände mit aussagekräftigen Meldungen
- Fallback-Daten, wenn DB nicht erreichbar (alle 7 Songs lokal definiert)

**Einschränkungen:**
- Nur ein Album (Hardcoded: "Hinter der unsichtbaren Maske")
- Keine Suchfunktion

---

### 5.2 Songdetailseite (SongPage)

**Zweck:** Vollständige Darstellung eines Songs mit Texten, Metadaten und Navigation

**Status:** IMPLEMENTIERT ✓

**Dateien:**
- `src/components/SongPage.jsx` (208 LOC)

**Daten:**
- Einzelne Song-Daten aus `songs`-Kollektion via ID (Route-Param `:id`)
- Metadaten: Titel, Tracknummer, Tonart, BPM, Stimmung, Farbe

**Funktionen:**
- Lädt Song-Daten basierend auf URL-Parameter `:id`
- Zeigt vollständigen Songtext mit Struktur-Abschnitten (Strophe, Refrain, etc.)
- Metadaten-Anzeige (Key, BPM, Mood)
- Navigation: Vorheriger Song, Nächster Song, Zurück zu Trackliste
- Einzelner Schmetterling oder botanisches Element als visueller Akzent
- Fehler-/Ladezustände
- Fallback-Daten bei Fehler

**Einschränkungen:**
- Keine Audiosupp

ort
- Keine Akkord-/Tonart-Analyse
- Text-Export nicht implementiert

---

### 5.3 Navigation (Navigation)

**Status:** IMPLEMENTIERT ✓

**Dateien:** `src/components/Navigation.jsx` (57 LOC)

**Features:**
- Fixierte Header-Navigation oben
- Links: Album (Home), Songs (Trackliste)
- Kompakt auf Mobile, größer auf Desktop
- Semantisches HTML, Tastaturnavigation

---

### 5.4 404-Fehlerseite (NotFound)

**Status:** IMPLEMENTIERT ✓

**Dateien:** `src/components/NotFound.jsx` (24 LOC)

**Features:**
- Catch-all Route für nicht existierende URLs
- Angepasstes Design, Button zurück zur Startseite

---

### 5.5 Backend-Anbindung (PocketBase)

**Status:** IMPLEMENTIERT ✓

**Dateien:** `src/lib/pb.js` (16 LOC)

**Features:**
- PocketBase Client-Instanz
- Automatisches Routing zu Backend
- Keine hardcodierten URLs/Secrets
- REST API via pb.collection()

---

## 6. Seiten- und Navigationsstruktur

```
Application (Hinter der unsichtbaren Maske)
│
├─ / (HomePage)
│  ├─ Album-Hero (Cover, Titel, Description)
│  ├─ Trackliste-Grid (3 Spalten Desktop → 1 Spalte Mobile)
│  │  └─ Songkarten
│  │     ├─ Tracknummer
│  │     ├─ Songtitel
│  │     ├─ Textauszug
│  │     ├─ Farb-Akzent
│  │     └─ Link zu /songs/:id
│  └─ Footer-Info
│
└─ /songs/:id (SongPage)
   ├─ Song-Header (Titel, Tracknummer)
   ├─ Metadaten (Key, BPM, Mood)
   ├─ Songtext (mit Struktur-Abschnitten)
   │  ├─ [Strophe]
   │  ├─ [Refrain]
   │  ├─ [Brücke]
   │  └─ [Outro]
   ├─ Navigation
   │  ├─ ← Vorheriger Song
   │  ├─ ↑ Zurück zu Trackliste
   │  └─ Nächster Song →
   └─ Visueller Akzent (Schmetterling/Blume)
```

---

## 7. User Flows

### 7.1 Songtext lesen (primär)

1. Besucher öffnet Website
2. Sieht Albumcover + Trackliste auf Startseite
3. Klickt auf einen Song
4. Sieht vollständigen Songtext mit Abschnitten
5. Navigiert zu vorherigem/nächstem Song (optional)
6. Kehrt zur Trackliste zurück

### 7.2 Direkte Song-URL öffnen

1. Besucher hat direkten Link zu `/songs/{song-id}`
2. Seite lädt einzelnen Song (Deep Link funktioniert)
3. Navigiert von hier zu anderen Songs oder Trackliste

---

## 8. Technische Architektur

```
┌─────────────────────────────────────────────────────────┐
│                        Browser                          │
│                   (React SPA / Vite)                    │
├──────────────────┬──────────────────┬──────────────────┤
│   Navigation     │    HomePage      │   SongPage       │
│   (header)       │   (Trackliste)   │   (Details)      │
└────────┬─────────┴──────────┬───────┴──────────┬───────┘
         │                    │                  │
         └────────┬───────────┴──────────────────┘
                  │
           React Router v6
                  │
         ┌────────┴────────┐
         │                 │
      CSS Variables     PocketBase Client
   (theme colors)         (pb.js)
         │                 │
    Tailwind v4      REST API Calls
         │                 │
    ┌────┴──────┐         │
    │ Styles    │    ┌────┴──────────────┐
    │ Layout    │    │  /api/collections │
    │ Responsive│    │  (albums, songs)  │
    └───────────┘    └───────────────────┘
                              │
                      ┌───────┴────────┐
                      │                │
                  PocketBase Server
                  (Data + Auth)
```

---

## 9. Repository- und Verzeichnisstruktur

```
hinter_der_unsichtbaren_maske_ai/  (Git-Root)
│
├─ app/                                 # Vite + React Anwendung
│  ├─ src/
│  │  ├─ components/
│  │  │  ├─ HomePage.jsx              # Startseite + Trackliste
│  │  │  ├─ SongPage.jsx              # Songdetail + Navigation
│  │  │  ├─ Navigation.jsx            # Header-Navigation
│  │  │  └─ NotFound.jsx              # 404-Seite
│  │  ├─ lib/
│  │  │  └─ pb.js                     # PocketBase-Client
│  │  ├─ App.jsx                      # Router-Setup
│  │  ├─ main.jsx                     # Entry Point
│  │  └─ index.css                    # Tailwind + Variablen
│  │
│  ├─ public/
│  │  └─ favicon.svg                  # Schmetterlings-Logo
│  │
│  ├─ dist/                           # Built Output (committed)
│  │  ├─ index.html
│  │  └─ assets/
│  │     ├─ index-*.css
│  │     └─ index-*.js
│  │
│  ├─ docs/
│  │  └─ handover/
│  │     └─ PROJECT_HANDOVER.md       # Dieses Dokument
│  │
│  ├─ index.html                      # HTML Template
│  ├─ tailwind.config.cjs             # Tailwind-Config
│  ├─ vite.config.js                  # Vite-Config
│  ├─ package.json                    # (leere Dependencies)
│  ├─ .gitignore
│  ├─ AGENTS.md                       # Entwicklerdokumentation
│  └─ README.md                       # (noch zu erstellen)
│
├─ static/                            # Statische Assets (extern bereitgestellt)
│  └─ album-cover.png                # Albumcover (1024x1024)
│
└─ .git/                              # Git-Repository

Abhängigkeiten (bereitgestellt von Plattform):
- React 18+
- React Router v6
- Vite
- @vitejs/plugin-react
- Tailwind CSS v4
- PocketBase (SDK)
- lucide-react (Icons)
```

---

## 10. Datenbank

**Technologie:** PocketBase (SQLite-basiert)

**Tabellen:**

### albums

| Feld | Typ | Beschreibung |
|---|---|---|
| id | String | Primary Key (UUID) |
| title | String | "Hinter der unsichtbaren Maske" |
| description | String | Kurzbeschreibung |
| coverUrl | String | Pfad zu Album-Cover (in static/) |
| created | DateTime | Erstellungsdatum |
| updated | DateTime | Änderungsdatum |

### songs

| Feld | Typ | Beschreibung |
|---|---|---|
| id | String | Primary Key (UUID) |
| album | String | FK → albums.id |
| trackNumber | Number | 1–7 (Sortierfeld) |
| title | String | Songtitel |
| lyrics | String | Vollständiger Songtext mit Zeilenumbrüchen |
| key | String | Tonart (z.B. "Am", "G#m") |
| bpm | Number | Tempo (z.B. 120) |
| mood | String | Stimmung (z.B. "traurig", "meditativ") |
| color | String | Hex-Farbcode für Akzent |
| created | DateTime | Erstellungsdatum |
| updated | DateTime | Änderungsdatum |

**Beziehungen:**
- songs.album → albums.id (1:n)

**Migrationen:** Keine Versionierung – Tabellen wurden manuell erstellt.

**Seeds:**
- 1 Album
- 7 Songs mit vollständigen deutschen Texten

**Bekannte Inkonsistenzen:** Keine bekannt.

---

## 11. APIs und Schnittstellen

Alle Calls via PocketBase REST API (`pb.collection()`):

| Methode | Endpoint | Zweck | Status | Input | Output | Auth |
|---|---|---|---|---|---|---|
| GET | /api/collections/albums/records | Album laden | IMPLEMENTIERT | query params (sort, limit) | Album-Objekt(e) | Öffentlich |
| GET | /api/collections/albums/records/:id | Album-ID laden | IMPLEMENTIERT | id | Album-Objekt | Öffentlich |
| GET | /api/collections/songs/records | Songs auflisten | IMPLEMENTIERT | filter, sort, limit | Songs-Array | Öffentlich |
| GET | /api/collections/songs/records/:id | Song-ID laden | IMPLEMENTIERT | id | Song-Objekt | Öffentlich |

**Authentifizierung:** Keine (Öffentliche Read-Zugänge, Access Rules offen)

---

## 12. Geschäftslogik

1. **Datenladen auf Startseite:**
   - Album laden (neuestes/erstes)
   - Songs für dieses Album laden (sortiert nach trackNumber)
   - Fehlerbehandlung mit Fallback-Daten

2. **Navigation auf Songseite:**
   - Aktuelle Song-ID via URL-Param `:id`
   - Vorherige/Nächste Song-ID bestimmen (anhand trackNumber)
   - Kontext-Navigation: Erste/Letzte Songs zeigen keine falschen Links

3. **Fehlerbehandlung:**
   - Datenbank nicht erreichbar → Fallback-Daten anzeigen
   - Song nicht gefunden → 404-Seite
   - Netzwerkfehler → Neu-Laden Button

---

## 13. Authentifizierung, Rollen und Berechtigungen

**Aktuell:** Keine Authentifizierung implementiert.

**Access Control:** Öffentlich (alle Daten lesbar ohne Login)

**Sicherheitskontext:**
- Songtexte sind unveröffentlichtes künstlerisches Material
- Derzeit nicht geschützt
- **Empfehlung für v1.1:** Login implementieren (siehe Abschnitt 18)

---

## 14. Konfiguration und Umgebungen

**Konfigurationsdateien:**

- `index.html` – Base-Href, Meta-Tags, Viewport
- `tailwind.config.cjs` – Farben, Typefaces, Spacing
- `vite.config.js` – Build-Config
- `src/index.css` – CSS-Variablen, Tailwind Entry

**Environment Variables:**

Keine. PocketBase Client nutzt automatisches Routing.

**Beispiel .env.example (optional, aktuell nicht nötig):**
```
# PocketBase Backend
VITE_POCKETBASE_URL=http://localhost:8090
```

---

## 15. Externe Abhängigkeiten

**Laufzeit (bereitgestellt):**
- React 18+
- React Router v6
- React DOM
- Vite (dev + build)
- @vitejs/plugin-react
- Tailwind CSS v4
- PocketBase SDK
- lucide-react (Icons)

**Keine npm-Installs erforderlich** – alles wird von der Plattform bereitgestellt.

---

## 16. Erledigte Entwicklungsaufgaben

✓ Projektstruktur aufgebaut (Vite + React + Router)
✓ PocketBase Collections erstellt (albums, songs)
✓ 7 Songs mit Texten eingegeben
✓ HomePage implementiert (Trackliste-Grid)
✓ SongPage implementiert (Songdetails + Navigation)
✓ Navigation implementiert (Header)
✓ CSS-Variablen + Tailwind Config eingerichtet
✓ Responsive Design (3 Breakpoints)
✓ Error-Handling + Fallback-Daten
✓ 404-Seite implementiert
✓ Deep-Links zu Songs funktionstüchtig
✓ Barrierefreiheit (a11y) beachtet
✓ Schmetterlings-Favicon erstellt
✓ Album-Cover in static/ abgelegt
✓ Git-Repository initialisiert
✓ dist/ committed (für Deployment)

---

## 17. Teilweise erledigte Arbeiten

Keine – alle v1.0-Features sind vollständig implementiert.

---

## 18. Offene Anforderungen und Backlog

### P0 – Kritisch

**NONE** – v1.0 ist produktionsreif.

### P1 – Nächster notwendiger Stand

| ID | Aufgabe | Grund | Abhängigkeiten | Ergebnis | Akzeptanzkriterium |
|---|---|---|---|---|---|
| TASK-001 | Authentifizierung implementieren | Songtext-Schutz | Neue PocketBase Auth Collection | Login-Flow, geschützte Routes | Songtexte nur für angemeldete Nutzer zugänglich |
| TASK-002 | noindex/nofollow für private Seiten | SEO-Sicherheit | Auth implementiert | Robots Meta-Tags | Suchmaschinen indexieren keine privaten Seiten |

### P2 – Wichtig

| ID | Aufgabe | Grund | Abhängigkeiten | Ergebnis |
|---|---|---|---|---|
| TASK-003 | README.md ausführlich | Onboarding | Dokumentation fertig | Developer kann Projekt starten ohne Fragen |
| TASK-004 | Feedback-Kontakt (E-Mail/Form) | Besucherkommunikation | Backend für Formulare | Besucherinnen können Feedback geben |

### P3 – Später/Optional

| ID | Aufgabe | Grund | Abhängigkeiten | Ergebnis |
|---|---|---|---|---|
| TASK-005 | Newsletter-Signup | Community-Aufbau | E-Mail-Backend | Besucherinnen können Newsletter abonnieren |
| TASK-006 | Lyrics-Export (PDF/Text) | Lesbarkeit | Authentifizierung | Angemeldete Nutzer exportieren Texte |
| TASK-007 | Akkord-Anzeige | Musikalische Nutzung | Music Data Service | Songs mit Akkorden anzeigen |
| TASK-008 | Mehrsprachigkeit (EN/DE) | Reichweite | i18n-Framework | Website auf Englisch und Deutsch |

---

## 19. Bekannte Fehler

**NONE** – keine bekannten kritischen Fehler.

**Hinweise:**
- Bei Datenbankverbindungsfehler wird automatisch auf Fallback-Daten zurückgegriffen (Fallback Songs sind lokal definiert)
- 404-Fehler werden elegant behandelt mit Rückweg-Button

---

## 20. Technische Schulden

| Beschreibung | Auswirkung | Prio | Lösungsansatz |
|---|---|---|---|
| Fallback-Songs hardcoded | Code-Duplication | LOW | In Zukunft aus Konstanten-Datei laden |
| Keine Unit-Tests | Wartbarkeit | MEDIUM | Vitest + React Testing Library einführen |
| Keine E2E-Tests | Stabilität | MEDIUM | Playwright oder Cypress für Critical Paths |
| Keine Logging-Infrastruktur | Debugging | LOW | Sentry oder ähnlich integrieren |

---

## 21. Getroffene Entscheidungen

| Entscheidung | Grund | Alternative | Status |
|---|---|---|---|
| React Router v6 | Standard für SPA-Routing | Next.js | Gewählt |
| Tailwind CSS v4 | Platform-Standard, kein npm install | CSS-in-JS | Gewählt |
| CSS-Variablen für Farben | Theme-Konsistenz, einfach änderbar | Hard-coded Werte | Gewählt |
| Fallback-Daten im Code | Fehlertoleranz ohne Server | Nur Fehler-UI | Gewählt |
| Keine Authentifizierung v1 | Schneller Launch, Fokus auf Design | Mit Login v1 | Gewählt (für v1.1 geplant) |
| Statische Asset in /static/ | Platform-Routing außerhalb dist/ | In dist/ bundeln | Gewählt |

---

## 22. Offene Entscheidungen

| Entscheidung | Optionen | Auswirkung | Bis wann |
|---|---|---|---|
| Authentifizierung-Modell | PocketBase Auth / Custom Login / OAuth | Songtext-Sicherheit | Vor v1.1 Release |
| E-Mail für Feedback | PocketBase Email / Externe Service (SendGrid) | Besucherkommunikation | Für P2 Feedback-Form |
| Mehrsprachigkeit | i18n Framework ja/nein | Inhalt-Erstellung | Optionale P3 |
| Audio-Support | Musik abspielen in Website ja/nein | Leseerlebnis vs. Musikerlebnis | Optionale P3 |

---

## 23. Tests und Qualitätssicherung

**Getestet:**
- ✓ Alle 7 Songs laden aus DB
- ✓ Navigation zu einzelnen Songs funktioniert
- ✓ Deep Links zu Song-URLs funktionieren
- ✓ Responsive Design (375px, 768px, 1280px+)
- ✓ Error Handling + Fallback
- ✓ 404-Fehlerseite
- ✓ Barrierefreiheit (a11y)

**Nicht getestet:**
- Unit Tests (nicht vorhanden)
- E2E Tests (nicht vorhanden)
- Performance Tests (nicht automatisiert)
- Mehrsprachigkeit (nur DE)

**QA-Status:** Manuell getestet, bereit für Live.

---

## 24. Deployment und Betrieb

**Hosting:** IONOS-Plattform (platform.ionos.space)

**Deployment-Prozess:**

1. Code auf GitHub pushen
2. Platform erkennt Push
3. `npm run build` ausführen (erzeugt dist/)
4. dist/ wird gehostet auf live URL

**Build-Dateien:**
- dist/index.html
- dist/assets/*.css
- dist/assets/*.js
- dist/favicon.svg

**Environment:**
- Dev: Lokaler Vite-Server (`npm run dev`)
- Preview: Vite Preview (`npm run preview`)
- Prod: Committed dist/ auf GitHub

**Deployment-Befehle:**
```bash
npm run build              # Prod-Build (--mode nicht gesetzt)
npm run build:prod        # Explicit Prod
npm run dev               # Dev-Server HMR
npm run preview           # Preview prod build lokal
```

---

## 25. Risiken

| Risiko | Eintrittswahrscheinlichkeit | Auswirkung | Mitigation |
|---|---|---|---|
| Songtext-Leak (öffentlich einsehbar) | MEDIUM | IP-Verlust | Login v1.1 implementieren |
| PocketBase Down | LOW | Website funktioniert nicht | Fallback-Daten + Caching |
| Song-Daten in DB verschwunden | LOW | Datenverlust | Regelmäßige Backups |
| Performance bei vielen Besuchern | LOW | Langsame Seite | CDN für static/, Lazy Load |
| Browser-Kompatibilität | LOW | Layout bricht | Testing auf Safari/Chrome/Firefox |

---

## 26. Empfohlene nächste Entwicklungsschritte

### Schritt 1: Authentifizierung (P1)

**Aufgabe:** Login implementieren

**Ziel:** Songtext-Schutz für unveröffentlichtes Material

**Voraussetzung:** PocketBase Auth Collection, Session-Management

**Betroffene Bereiche:**
- App.jsx (Protected Routes)
- HomePage.jsx (nur für angemeldete Nutzer)
- SongPage.jsx (nur für angemeldete Nutzer)
- Neue LoginPage.jsx

**Ergebnis:** Besucherinnen melden sich an, erhalten Zugang zu Songtexten

**Akzeptanzkriterium:**
- ✓ Login-Form funktioniert
- ✓ Session persistiert
- ✓ Ohne Login → Redirect zu Login
- ✓ noindex Meta-Tag auf geschützten Seiten

**Aufwand:** ~4–6 Stunden

---

### Schritt 2: README.md erweitern (P2)

**Aufgabe:** Vollständiges README für Entwicklerinnen

**Ziel:** Onboarding neuer Entwicklerinnen ohne Fragen

**Ergebnis:** Datei README.md mit allen nötigen Infos

**Inhalte:**
- Projektbeschreibung
- Installation (npm, Vite)
- Starten (dev, build, preview)
- Struktur der Ordner
- Umgebungsvariablen
- Links auf PROJECT_HANDOVER.md
- Known Issues

**Akzeptanzkriterium:** Developer kann Projekt klonen und lokal starten ohne Code zu lesen

**Aufwand:** ~2 Stunden

---

### Schritt 3: Feedback-Kontakt (P2)

**Aufgabe:** Kontakt-/Feedback-Formular

**Ziel:** Besucherinnen können Feedback geben

**Ergebnis:** Form speichert Feedback in DB oder schickt E-Mail

**Betroffene Bereiche:**
- Neue ContactForm.jsx
- Neue Seite /contact oder Modal
- PocketBase Collection für Feedback
- Evtl. E-Mail-Integration

**Akzeptanzkriterium:**
- ✓ Form funktioniert
- ✓ Daten speichern oder E-Mail versenden
- ✓ Bestätigung an Besucherin

**Aufwand:** ~3–5 Stunden

---

---

## 27. Einstiegspunkt für die nächste KI

### Was zuerst lesen?

1. **Dieses Dokument** (PROJECT_HANDOVER.md) – Überblick
2. **`app/AGENTS.md`** – Technische Details
3. **`app/README.md`** – (noch zu erstellen) Installation & Start

### Welche Dateien sind zentral?

| Datei | Warum | Änderungen nötig? |
|---|---|---|
| src/App.jsx | Routing-Zentrum | Neue Routes nur hier |
| src/components/HomePage.jsx | Datenladen + Trackliste | Selten ändern |
| src/components/SongPage.jsx | Song-Details | Selten ändern |
| src/lib/pb.js | Backend-Anbindung | Nur für neue Collections |
| src/index.css | Design-Tokens (Farben) | Farbe ändern → hier |
| tailwind.config.cjs | Theme-Config | Spacing/Fonts anpassen → hier |
| app/AGENTS.md | Entwicklerdokumentation | Nach jeder Änderung updaten |

### Was nicht ungeprüft verändern?

- ❌ `src/App.jsx` – basename muss konsistent bleiben
- ❌ `src/lib/pb.js` – PocketBase-Client muss stabil bleiben
- ❌ PocketBase Collections (tables) – Daten darin sind wertvoll
- ❌ Album-Cover in `/static/` – Nur mit Erlaubnis ersetzen

### Was ist der nächste Entwicklungsschritt?

**TASK-001: Authentifizierung implementieren**

1. Neue PocketBase Auth Collection (`users`)
2. Neue LoginPage.jsx
3. Protected Routes in App.jsx
4. Session-Handling in pb.js
5. noindex Meta-Tags

**Dauer:** ~4–6 Stunden (abhängig von Test-Tiefe)

### Welche Entscheidungen sind offen?

- Auth-Modell (PocketBase vs. Custom) – siehe Abschnitt 22
- E-Mail-Anbieter für Kontakt – siehe Abschnitt 22
- Audio-Support ja/nein – siehe Abschnitt 22

### Wie lässt sich der aktuelle Stand testen?

```bash
cd app

# Dev-Server starten
npm run dev
# http://localhost:5173 öffnen

# Build testen
npm run build
npm run preview
# http://localhost:4173 öffnen

# Git-Status prüfen
git status
git log --oneline -5

# PocketBase Collections prüfen
# (admin.pocketbase.io oder local http://localhost:8090)
```

---

## 28. Unsicherheiten

| Punkt | Problem | Auswirkung | Nächster Schritt |
|---|---|---|---|
| Datenbankpasswörter / Admin-URL | Nicht in Docs dokumentiert | Admin-Zugang möglich, aber URL offen | Mit Betriebsteam klären |
| PocketBase Backup-Strategie | Nicht dokumentiert | Datenverlust möglich | Backup-Prozess definieren |
| Produktions-/Staging-Umgebungen | Nicht klar getrennt | Versehentliche Änderungen möglich | Klare Umgebungs-Strategie |
| GitHub Organization / Zugriff | Nicht dokumentiert | Wer darf pushen? | Access Rights definieren |
| Performance bei Scale | Nicht getestet | Viele Besucherinnen = langsam? | Load Tests durchführen |

---

---

# ZUSAMMENFASSUNG FÜR SCHNELLE ORIENTIERUNG

**In 5 Minuten verstehen:**

- **Was:** Album-Website mit 7 Songtexten
- **Wie:** React + Vite + PocketBase + Tailwind
- **Wo:** GitHub `hinter_der_unsichtbaren_maske_ai`, Branch `dev`
- **Status:** v1.0 fertig + live
- **Nächstes:** Authentifizierung (v1.1)
- **Fragen?** Siehe Abschnitt 27

---

*Handover erstellt: 2026-08-15*
*Projekt: Hinter der unsichtbaren Maske v1.0*
*Dokumentation: Vollständig und aktuell*
