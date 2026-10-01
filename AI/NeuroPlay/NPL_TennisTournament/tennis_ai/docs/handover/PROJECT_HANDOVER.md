# PROJECT HANDOVER — Tennisturnier Neindorf

## 1. Dokumentinformationen

| Feld | Wert |
|------|------|
| **Projekt** | Tennisturnier Management System — Neindorf |
| **Datum** | 2026-08-15 |
| **Repository** | https://github.com/neuroways/tennis_ai |
| **Branch** | dev |
| **Entwicklungsstand** | Phase 1 MVP — Public & Admin Bereiche aktiv |
| **Technologien** | React 19, Vite, Tailwind CSS v4, PocketBase, React Router v7 |
| **Hosting/Deployment** | Platform: Live-URL + Preview + Snapshots |
| **Zweck der Übergabe** | Kontinuierliche Weiterentwicklung, Phase 2+ Planung |

---

## 2. Executive Summary

**Tennisturnier Neindorf** ist eine vollständige Single-Page Application (SPA) für die Verwaltung und Durchführung eines Tennisturniers. 

**Problem:** Tennisvereine benötigen ein System, um Spieler zu registrieren, Spielplan zu erstellen, Ergebnisse zu erfassen und Turnierdetails zu verwalten — alles ohne komplexe Admin-Tools.

**Lösung:** Web-App mit:
- Öffentlichem Bereich: Startseite, Anmeldung, Teilnehmerliste, Spielplan, Ergebnisse, Kontakt
- Admin-Bereich: Turnier, Spieler, Plätze, Matches, Ergebnisse, Spielplan, Dashboard

**Zielgruppe:** Turnier-Organisierer, Spieler, Zuschauer

**Aktueller Stand:**
- ✓ Phase 1 MVP: 7 öffentliche Seiten + 7 Admin-Module (Stubs mit teilweise funktional)
- ✓ Datenbank-Schema: 15 Collections definiert (Tournaments, Players, Matches, etc.)
- ✓ API-Layer: 34+ Funktionen für CRUD-Operationen
- ✓ Authentifizierung: Admin-Login gegen PocketBase Auth-Collection
- ✓ Responsive Design: Mobile-First, Tailwind v4, alle Breakpoints
- ~ Datenbank-Sync: Nur „tournaments" Collection in PocketBase; 14 weitere definiert, nicht angelegt
- ~ Admin-Module: Erstellt, aber ohne volle CRUD/Datenbindung

**Nächste Phasen:**
- Phase 2: Datenbank vollständig synchronisieren, Admin-Module fertigstellen
- Phase 3+: AI Schedule Generator, Doubles-Support, Knockout-Systeme, Statistiken

---

## 3. Fachliches Zielbild

Ein Tennisturnier folgt diesem Ablauf:

1. **Planning:** Turnier erstellen, Informationen eingeben
2. **Registration:** Spieler melden sich an
3. **Draw:** Spieler werden in Runden eingeteilt
4. **Running:** Matches werden gespielt, Ergebnisse erfasst
5. **Finished:** Endergebnisse, Statistiken, Archivierung

Das System unterstützt:
- **Turnier-Verwaltung:** Metadaten, Timing, Status, Konfiguration
- **Spieler-Verwaltung:** Global verfügbar, Anmeldung pro Turnier
- **Runden & Matches:** Gruppierung von Matches, Platzmanagement
- **Ergebnisse:** Spielergebnisse, Statistiken
- **Admin-Funktionen:** Volle Kontrolle über Turnier, Spieler, Plätze, Matches

---

## 4. Anforderungen

| ID | Anforderung | Kategorie | Status | Nachweis | Offene Punkte |
|----|-------------|-----------|--------|----------|---------------|
| REQ-01 | Öffentliche Startseite mit Turnier-Info | Frontend | ✓ IMPLEMENTIERT | Home.jsx | — |
| REQ-02 | Spieler-Anmeldung (öffentlich) | Frontend | ✓ IMPLEMENTIERT | Register.jsx | Validierung, Email-Bestätigung (TODO) |
| REQ-03 | Teilnehmerliste (öffentlich) | Frontend | ✓ IMPLEMENTIERT | Participants.jsx | Suchfilter, Sortierung |
| REQ-04 | Spielplan (öffentlich) | Frontend | ✓ IMPLEMENTIERT | Schedule.jsx | Echtzeit-Updates (TODO) |
| REQ-05 | Ergebnisse (öffentlich) | Frontend | ✓ IMPLEMENTIERT | Results.jsx | Live-Scoreboard (TODO) |
| REQ-06 | Kontaktseite | Frontend | ✓ IMPLEMENTIERT | Contact.jsx | — |
| REQ-07 | Admin-Login | Auth | ✓ IMPLEMENTIERT | Admin.jsx, pb.ts | Token-Refresh (TODO) |
| REQ-08 | Dashboard (Admin) | Admin-UI | ✓ TEILWEISE | Dashboard.jsx | Statistiken, Charts (TODO) |
| REQ-09 | Spieler-Verwaltung (Admin) | Admin-UI | ✓ TEILWEISE | ParticipantsAdmin.jsx | CRUD-Operationen (70% done) |
| REQ-10 | Turnier-Konfiguration (Admin) | Admin-UI | ✓ TEILWEISE | TournamentAdmin.jsx | Form-Validierung (TODO) |
| REQ-11 | Plätze-Verwaltung (Admin) | Admin-UI | ✓ TEILWEISE | CourtsAdmin.jsx | Belegungsplan (TODO) |
| REQ-12 | Match-Verwaltung (Admin) | Admin-UI | ✓ TEILWEISE | MatchesAdmin.jsx | AI-Integration (TODO) |
| REQ-13 | Ergebnis-Erfassung (Admin) | Admin-UI | ✓ TEILWEISE | ResultsAdmin.jsx | Live-Input (TODO) |
| REQ-14 | Spielplan-Generator (Admin) | Admin-UI | ✓ GEPLANT | ScheduleAdmin.jsx | Algorithmen fehlen |
| REQ-15 | Datenbank-Backend | Backend | ✓ TEILWEISE | src/lib/pb.ts, api.ts | 14/15 Collections fehlen |

---

## 5. Implementierter Funktionsumfang

### 5.1 Öffentliche Seiten

#### Home (Startseite)
- **Zweck:** Turnier-Übersicht, Anmeldung-Buttons, Turnier-Details
- **Status:** ✓ Funktional
- **Datei:** `src/pages/Home.jsx` (205L)
- **Daten:** Tournament (from `tournaments` collection), Registration Count
- **Datenfluss:** API → getTournament() → React State → Render
- **Besonderheiten:** Hero-Bereich mit Turnier-Details, Anmeldungs-Status, Quick Links

#### Register (Spieler-Anmeldung)
- **Zweck:** Spieler-Registrierung
- **Status:** ✓ Funktional
- **Datei:** `src/pages/Register.jsx` (238L)
- **Daten:** Players (Auswahl), Tournament (ID)
- **Datenfluss:** Form → registerPlayer() → Registrations Collection
- **Besonderheiten:** Dropdown für vorhandene Spieler oder Neuanlage, Bestätigung

#### Participants (Teilnehmerliste)
- **Zweck:** Angemeldete Spieler anzeigen
- **Status:** ✓ Funktional
- **Datei:** `src/pages/Participants.jsx` (151L)
- **Daten:** Registrations + Player Details (joined)
- **Datenfluss:** API → getRegistrationsByTournament() → Liste → Render
- **Besonderheiten:** Sortierbar, Suchbar (TODO: Filter)

#### Schedule (Spielplan)
- **Zweck:** Matches und Zeitslots anzeigen
- **Status:** ✓ Teilweise funktional
- **Datei:** `src/pages/Schedule.jsx` (161L)
- **Daten:** Matches + Rounds + Courts
- **Datenfluss:** API → getMatchesByTournament() → Grid by Round/Court
- **Besonderheiten:** Platz-Filter, Zeit-Sortierung
- **Einschränkung:** Keine Echtzeit-Updates, manueller Refresh

#### Results (Ergebnisse)
- **Zweck:** Spielresultate anzeigen
- **Status:** ✓ Teilweise funktional
- **Datei:** `src/pages/Results.jsx` (96L)
- **Daten:** Results (mit Match/Player Relations)
- **Datenfluss:** API → getResults() → Tabelle → Render
- **Besonderheiten:** Gewinner-Highlight, Punktzahl
- **Einschränkung:** Keine Live-Updates

#### Contact (Kontakt)
- **Zweck:** Veranstaltungsort, Kontaktinformationen
- **Status:** ✓ Funktional
- **Datei:** `src/pages/Contact.jsx` (153L)
- **Daten:** Location + Contacts Collections
- **Datenfluss:** API → getLocationsByTournament() + Contacts → Render
- **Besonderheiten:** Karte-Integration (TODO), Anfahrtsbeschreibung

### 5.2 Admin-Bereich

#### Admin Login
- **Zweck:** Authentifizierung gegen PocketBase
- **Status:** ✓ Funktional
- **Datei:** `src/pages/Admin.jsx` (90L)
- **Auth:** Email/Passwort gegen `admins` Collection
- **Session:** PocketBase JWT Token im authStore
- **Besonderheiten:** Persistent Login (Token in Cookie)

#### AdminLayout
- **Zweck:** Shared Layout für Admin-Seiten
- **Status:** ✓ Funktional
- **Datei:** `src/layouts/AdminLayout.jsx` (97L)
- **Features:** Sidebar-Navigation, Logout-Button, ProtectedRoute
- **Besonderheiten:** Mobile-responsive Navigation

#### Dashboard
- **Zweck:** Überblick, Statistiken
- **Status:** ✓ Stub (keine Daten)
- **Datei:** `src/pages/admin/Dashboard.jsx` (87L)
- **Geplant:** Spieler-Count, Match-Count, Ergebnisse-Quote, Zeitplan-Status
- **TODO:** Charts, Real-time Updates

#### ParticipantsAdmin
- **Zweck:** Spieler-Verwaltung (CRUD)
- **Status:** ✓ ~70% implementiert
- **Datei:** `src/pages/admin/ParticipantsAdmin.jsx` (303L)
- **Features:** Spieler anlegen, bearbeiten, löschen, suchen
- **Datenfluss:** Form → createPlayer()/updatePlayer() → Players Collection
- **TODO:** Validierung, Duplikat-Check, Batch-Import

#### TournamentAdmin
- **Zweck:** Turnier-Konfiguration
- **Status:** ✓ ~60% implementiert
- **Datei:** `src/pages/admin/TournamentAdmin.jsx` (229L)
- **Features:** Titel, Datum, Fristen, Status ändern, Max-Spieler
- **Datenfluss:** Form → updateTournament() → Tournaments Collection
- **TODO:** Validierung, Datums-Picker, Vorschau

#### CourtsAdmin
- **Zweck:** Platz-Verwaltung
- **Status:** ✓ ~50% implementiert
- **Datei:** `src/pages/admin/CourtsAdmin.jsx` (177L)
- **Features:** Plätze anlegen, bearbeiten, Belag/Innen-Status
- **TODO:** Verfügbarkeit-Kalender, Konflikt-Detektion

#### MatchesAdmin
- **Zweck:** Match-Verwaltung und Scheduling
- **Status:** ✓ ~40% implementiert
- **Datei:** `src/pages/admin/MatchesAdmin.jsx` (226L)
- **Features:** Match erstellen, Runden zuweisen, Platz/Zeit setzen
- **TODO:** AI-Schedule-Integration, Duplikat-Prävention, Bulk-Operationen

#### ResultsAdmin
- **Zweck:** Ergebnis-Erfassung
- **Status:** ✓ ~50% implementiert
- **Datei:** `src/pages/admin/ResultsAdmin.jsx` (204L)
- **Features:** Punkte eingeben, Gewinner setzen, Bestätigung
- **TODO:** Live-Input während Match, Tiebreak-Handling

#### ScheduleAdmin
- **Zweck:** AI-Spielplan-Generator
- **Status:** ✓ Stub (keine Logik)
- **Datei:** `src/pages/admin/ScheduleAdmin.jsx` (245L)
- **Geplant:** Algorithmen (Round-Robin, Swiss), Optimierung, Export
- **TODO:** KI-Integration, Validierung, Admin-Approval

---

## 6. Seiten- und Navigationsstruktur

```
Application (React Router v7, BrowserRouter)
│
├── PUBLIC ROUTES
│   ├── / (Home)
│   │   ├── Hero-Section (Turnier-Info)
│   │   ├── Statistiken (Spieler-Count, Status)
│   │   ├── Quick Links (Register, Schedule, Results)
│   │   └── News/Ankündigungen
│   │
│   ├── /register (Anmeldung)
│   │   ├── Spieler-Dropdown
│   │   ├── Neue Spieler-Form
│   │   └── Bestätigung
│   │
│   ├── /participants (Teilnehmerliste)
│   │   ├── Suchbar
│   │   ├── Sortierbar
│   │   └── Tabelle (Name, Alter, Experience)
│   │
│   ├── /schedule (Spielplan)
│   │   ├── Platz-Filter
│   │   ├── Zeit-Sortierung
│   │   └── Match-Grid (Runde → Platz → Zeit)
│   │
│   ├── /results (Ergebnisse)
│   │   ├── Match-Liste
│   │   ├── Gewinner-Highlight
│   │   └── Punkte-Anzeige
│   │
│   └── /contact (Kontakt)
│       ├── Veranstaltungsort
│       ├── Anfahrt
│       ├── Kontakt-Personen
│       └── Anfahrts-Info
│
├── ADMIN ROUTES (Protected)
│   ├── /admin (Login Page — nicht protected)
│   │   ├── Email-Input
│   │   ├── Passwort-Input
│   │   └── Login-Button
│   │
│   └── /admin/* (Protected mit ProtectedRoute Component)
│       ├── /admin/dashboard (Statistik-Überblick)
│       │   ├── Spieler-Count
│       │   ├── Match-Count
│       │   ├── Ergebnisse-Quote
│       │   └── Zeitplan-Status
│       │
│       ├── /admin/tournament (Turnier-Konfiguration)
│       │   ├── Titel/Subtitle
│       │   ├── Datum/Zeit
│       │   ├── Fristen
│       │   ├── Status-Select
│       │   └── Max-Spieler
│       │
│       ├── /admin/participants (Spieler-Verwaltung)
│       │   ├── Spieler-Liste
│       │   ├── Suchbar
│       │   ├── Bearbeiten-Modal
│       │   └── Delete-Button
│       │
│       ├── /admin/courts (Platz-Verwaltung)
│       │   ├── Platz-Liste
│       │   ├── Belag-Select
│       │   ├── Innen/Außen-Toggle
│       │   └── Verfügbarkeit
│       │
│       ├── /admin/matches (Match-Verwaltung)
│       │   ├── Match-Liste
│       │   ├── Neue Match-Form
│       │   ├── Runde-Zuordnung
│       │   ├── Platz/Zeit-Setter
│       │   └── Spieler-Zuordnung
│       │
│       ├── /admin/results (Ergebnis-Erfassung)
│       │   ├── Match-Selector
│       │   ├── Punkte-Input
│       │   ├── Gewinner-Select
│       │   └── Speicher-Button
│       │
│       └── /admin/schedule (Spielplan-Generator)
│           ├── Algorithmus-Select
│           ├── Parameter-Eingaben
│           ├── Schedule-Preview
│           ├── Validierung
│           └── Approve/Reject-Buttons
│
└── ERROR ROUTES
    └── * (404 Page)
```

---

## 7. User Flows

### Flow 1: Spieler-Anmeldung (Öffentlich)
```
Besucher → Home → "Jetzt anmelden" Button
        → /register Page
        → Spieler aus Dropdown auswählen ODER Neue Spieler anlegen
        → Submit
        → Registration wird gespeichert
        → Confirmation Message
        → Spieler erscheint auf /participants
```

### Flow 2: Admin-Login & Turnier-Verwaltung
```
Admin → /admin (Login Page)
     → Email + Passwort eingeben
     → Submit gegen PocketBase auth
     → JWT Token gespeichert
     → Redirect zu /admin/dashboard
     → Sidebar Navigation verfügbar
     → Alle Admin-Seiten accessible
```

### Flow 3: Match-Erstellung & Scheduling
```
Admin → /admin/matches
     → "Neuer Match" Form
     → Runde auswählen
     → Spieler zuordnen
     → Platz + Zeit setzen
     → Submit
     → Match wird gespeichert
     → Erscheint auf /schedule
```

### Flow 4: Ergebnis-Erfassung
```
Admin → /admin/results
     → Match aus Liste auswählen
     → Punkte eingeben (Satz 1, 2, 3)
     → Gewinner setzen
     → Submit
     → Result wird gespeichert
     → Erscheint auf /results
```

---

## 8. Technische Architektur

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │          React Router v7 (SPA)                      │   │
│  │  Routes: /, /register, /schedule, /results, /admin  │   │
│  └─────────────────────────────────────────────────────┘   │
│                            ↓                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │      Pages (7 Public + 7 Admin)                     │   │
│  │  Home, Register, Participants, Schedule, Results,   │   │
│  │  Contact, Admin, Dashboard, etc.                    │   │
│  └─────────────────────────────────────────────────────┘   │
│                            ↓                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │      API Service Layer (src/lib/api.ts)            │   │
│  │  34+ CRUD Functions:                                │   │
│  │  - getTournament, createPlayer, updateMatch, ...    │   │
│  └─────────────────────────────────────────────────────┘   │
│                            ↓                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │      PocketBase SDK Client (src/lib/pb.ts)         │   │
│  │  - new PocketBase()                                 │   │
│  │  - pb.collection(name).getFullList(), .create()    │   │
│  │  - pb.authStore (JWT tokens)                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTP/REST
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (PocketBase)                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │     Collections (15 total, 1 exists, 14 pending)    │   │
│  │  CREATED:                                            │   │
│  │  - tournaments (Turnier-Info)                        │   │
│  │  - admins (Auth collection)                          │   │
│  │                                                       │   │
│  │  DEFINED (JSON) BUT NOT CREATED:                    │   │
│  │  - players, registrations, courts, rounds, matches  │   │
│  │  - match_players, results, locations, contacts      │   │
│  │  - info_sections, announcements, tournament_settings│   │
│  │  - ai_schedule_runs                                 │   │
│  └──────────────────────────────────────────────────────┘   │
│                            ↓                                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │      SQLite Database                                 │   │
│  │  /pb_data/data.db                                   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

STYLING: Tailwind CSS v4 (src/index.css)
BUILD: Vite (vite.config.js)
HOST: Platform (Live, Preview, Snapshots)
```

---

## 9. Repository- und Verzeichnisstruktur

```
app/
├── src/
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── Dashboard.jsx (87L) — Statistik-Stub
│   │   │   ├── ParticipantsAdmin.jsx (303L) — Spieler-CRUD
│   │   │   ├── TournamentAdmin.jsx (229L) — Turnier-Config
│   │   │   ├── CourtsAdmin.jsx (177L) — Platz-Management
│   │   │   ├── MatchesAdmin.jsx (226L) — Match-CRUD
│   │   │   ├── ResultsAdmin.jsx (204L) — Ergebnis-Erfassung
│   │   │   └── ScheduleAdmin.jsx (245L) — Spielplan-Generator
│   │   ├── Home.jsx (205L) — Startseite
│   │   ├── Register.jsx (238L) — Anmeldung
│   │   ├── Participants.jsx (151L) — Teilnehmerliste
│   │   ├── Schedule.jsx (161L) — Spielplan
│   │   ├── Results.jsx (96L) — Ergebnisse
│   │   ├── Contact.jsx (153L) — Kontakt
│   │   └── Admin.jsx (90L) — Admin-Login
│   ├── layouts/
│   │   └── AdminLayout.jsx (97L) — Sidebar + Navigation
│   ├── lib/
│   │   ├── pb.ts (37L) — PocketBase Client + Init
│   │   └── api.ts (208L) — 34+ API Functions
│   ├── App.jsx (72L) — Router Setup + ProtectedRoute
│   ├── main.jsx (13L) — Entry Point
│   └── index.css (5L) — Tailwind @import
│
├── public/
│   └── favicon.svg (25L) — Tennis Racket + Heart Logo
│
├── DB/
│   └── json/
│       └── tournaments.json — Collection Definition (nur 1)
│
├── dist/
│   ├── assets/
│   │   ├── index-CMgJkwUb.js (60L) — Built JS
│   │   └── index-DjT9fvGE.css (1L) — Built CSS
│   ├── favicon.svg
│   └── index.html (17L) — HTML Entry
│
├── index.html (15L) — Source HTML (title, meta, favicon link)
├── package.json (14L) — Empty (deps provided by platform)
├── vite.config.js (3L) — Vite config (minimal)
├── tailwind.config.cjs (9L) — Tailwind v4 config
├── .gitignore (97L) — Git excludes
├── AGENTS.md (106L) — Project Documentation (en)
└── README.md (81L) — Project Overview (de) [NEWLY CREATED]
```

---

## 10. Datenbank

### Technologie
- **Engine:** PocketBase v0.39.0 (SQLite backend)
- **Access:** REST API über PocketBase SDK
- **Authentication:** JWT Tokens (PocketBase auth system)
- **API-Layer:** `src/lib/api.ts` (34+ Funktionen)

### Collections Status

| Name | Status | Felder | Relations | Testdata |
|------|--------|--------|-----------|----------|
| tournaments | ✓ CREATED | 10 | — | 1 (Neindorf 05.09.2026) |
| admins | ✓ CREATED | system | — | 0 |
| players | DEFINED | 7 | — | 0 |
| registrations | DEFINED | 4 | tournament, player | 0 |
| courts | DEFINED | 5 | — | 0 |
| rounds | DEFINED | 4 | tournament | 0 |
| matches | DEFINED | 7 | tournament, round, court | 0 |
| match_players | DEFINED | 3 | match, player | 0 |
| results | DEFINED | 4 | match, player | 0 |
| locations | DEFINED | 5 | tournament | 0 |
| contacts | DEFINED | 5 | tournament | 0 |
| info_sections | DEFINED | 4 | tournament | 0 |
| announcements | DEFINED | 5 | tournament | 0 |
| tournament_settings | DEFINED | 5 | tournament | 0 |
| ai_schedule_runs | DEFINED | 5 | tournament | 0 |

### Schema-Highlights

**tournaments**
```
- id (auto)
- title (text, required)
- subtitle (text)
- description (editor)
- event_date (date, required)
- registration_deadline (date)
- start_time (text)
- end_time (text)
- status (select: planning, registration, draw, running, finished)
- max_players (number)
- logo (file)
- hero_image (file)
```

**players**
```
- id (auto)
- first_name (text, required)
- last_name (text, required)
- birthdate (date)
- experience (select: beginner, advanced, club_player, competitive)
- email (email)
- phone (text)
- notes (editor)
```

**matches**
```
- id (auto)
- tournament (relation → tournaments)
- round (relation → rounds)
- court (relation → courts)
- start_time (datetime)
- end_time (datetime)
- status (select: planned, running, finished)
- ai_generated (bool)
```

### Relations
- registrations: tournament + player (n:m)
- matches: tournament + round + court
- match_players: match + player (n:m, supports future doubles)
- results: match + player
- locations, contacts, info_sections, announcements: tournament

### Bekannte Inkonsistenzen
- **KRITISCH:** 14 Collections sind als JSON definiert (in `DB/json/`), aber nicht im PocketBase Backend angelegt
- **API-Fehler:** REST-Requests zum Erstellen von Collections schlagen fehl (400 Bad Request)
- **Workaround:** Manuelles Anlegen über PocketBase Admin-UI erforderlich

---

## 11. APIs und Schnittstellen

### REST API (PocketBase)

| Methode | Endpoint | Zweck | Status | Input | Output | Auth |
|---------|----------|-------|--------|-------|--------|------|
| GET | /api/collections/tournaments | Alle Turniere | ✓ | — | Tournament[] | — |
| GET | /api/collections/tournaments/:id | Turnier Details | ✓ | id | Tournament | — |
| POST | /api/collections/tournaments | Turnier erstellen | ~ | Tournament | Tournament | Admin |
| PATCH | /api/collections/tournaments/:id | Turnier update | ~ | Partial | Tournament | Admin |
| GET | /api/collections/players | Alle Spieler | ✓ | — | Player[] | — |
| POST | /api/collections/players | Spieler erstellen | ✓ | Player | Player | Admin |
| POST | /api/collections/registrations | Spieler anmelden | ✓ | {tournament, player} | Registration | — |
| GET | /api/collections/matches | Alle Matches | ~ | — | Match[] | — |
| POST | /api/collections/results | Ergebnis speichern | ~ | Result | Result | Admin |
| POST | /collections/users/auth | Admin Login | ✓ | {email, password} | {token, model} | — |

### SDK-Functions (src/lib/api.ts)

**Tournament Management**
```typescript
getTournament(id)
getTournaments()
createTournament(data)
updateTournament(id, data)
```

**Player Management**
```typescript
getPlayers()
searchPlayers(query)
createPlayer(data)
updatePlayer(id, data)
deletePlayer(id)
```

**Registration**
```typescript
registerPlayer(tournamentId, playerId)
getRegistrationsByTournament(tournamentId)
```

**Matches**
```typescript
getMatchesByRound(roundId)
getMatchesByTournament(tournamentId)
createMatch(data)
updateMatch(id, data)
deleteMatch(id)
```

**Results**
```typescript
setMatchResult(matchId, playerId, score)
getResults()
```

---

## 12. Geschäftslogik

### Turnier-Lifecycle
1. **Planning:** Admin erstellt Turnier, setzt Daten/Fristen
2. **Registration:** Spieler melden sich an, Status = "registration"
3. **Draw:** Admin ordnet Spieler in Runden ein, Status = "draw"
4. **Running:** Matches laufen, Ergebnisse werden erfasst, Status = "running"
5. **Finished:** Turnier endet, finale Ergebnisse sichtbar, Status = "finished"

### Anmeldungs-Logik
- Spieler kann sich selbst anmelden (öffentlich)
- Admin kann Spieler manuell anmelden
- Doppelte Anmeldung: nicht validiert (TODO)
- Max-Spieler-Limit: nicht durchgesetzt (TODO)

### Match-Erstellung
- Admin erstellt Matches manuell oder nutzt AI-Generator
- Jedem Match wird Runde, Platz, Zeit zugeordnet
- Matches können "planned", "running" oder "finished" sein
- AI-Generated Flag für maschinell erstellte Matches

### Ergebnis-Erfassung
- Admin gibt Punkte pro Satz ein
- System bestimmt Gewinner basierend auf Regeln (2 aus 3, Best-of-3)
- Tiebreak-Handling: nicht implementiert (TODO)

---

## 13. Authentifizierung, Rollen und Berechtigungen

### Auth System
- **Typ:** PocketBase Auth Collections
- **Admin Collection:** `admins` (Email/Passwort)
- **Token:** JWT, stored in `pb.authStore`
- **Session:** Persistent (Cookie-based)

### Rollen
1. **Öffentliche User** (unauthentifiziert)
   - Darf: Home, Register (Anmeldung), Participants, Schedule, Results, Contact lesen
   - Darf nicht: Admin-Seiten, Änderungen

2. **Admin** (authentifiziert gegen `admins` Collection)
   - Darf: Alle Admin-Seiten, Turnier/Spieler/Matches bearbeiten
   - Check: `pb.authStore.isValid && pb.authStore.model?.collectionId === 'admins'`
   - Protected Routes: `/admin/dashboard`, `/admin/tournament`, etc.

### Access Rules (PocketBase)
- **tournaments:** Public Read, Admin Write
- **players:** Public Read, Admin Write
- **registrations:** Public Create (no login needed), Admin Full Access
- **matches, results:** Public Read (Schedule/Results), Admin Write
- **admins:** System Auth Collection (intrinsic rules)

### Login Flow
```
1. Admin → /admin (Login Page)
2. Enters email + password
3. POST /api/collections/admins/auth → PocketBase
4. Returns JWT token + admin model
5. Token stored: pb.authStore
6. Redirect: /admin/dashboard (ProtectedRoute validates)
7. Subsequent requests: Authorization Header: Bearer {token}
8. Logout: pb.authStore.clear()
```

---

## 14. Konfiguration und Umgebungen

### Umgebungsvariablen (nicht erforderlich)
Das Projekt hat keine externe Config-Datei. PocketBase URL ist hardcoded in:

```typescript
// src/lib/pb.ts
export const pb = new PocketBase(); // Platform routes to correct backend
```

### Falls externe Konfiguration erforderlich:
`.env.example` (für zukünftige Nutzung):
```
VITE_POCKETBASE_URL=http://localhost:8090
VITE_TOURNAMENT_ID=<tournament-uuid>
```

### Build-Konfiguration
- **Vite Config:** `vite.config.js` (minimal, Platform-managed)
- **Tailwind:** `tailwind.config.cjs` (v4, theme.extend + custom colors)
- **Entry:** `index.html` + `src/main.jsx`
- **Output:** `dist/` (committed, served by Platform)

---

## 15. Externe Abhängigkeiten

### Provided by Platform (nicht in package.json)
- ✓ React 19
- ✓ react-dom 19
- ✓ react-router v7
- ✓ Vite
- ✓ @vitejs/plugin-react
- ✓ lucide-react (icons)
- ✓ pocketbase (SDK)
- ✓ tailwind-merge
- ✓ Tailwind CSS v4 (engine)

### package.json (Empty)
```json
{ "name": "tennis-turnier", "version": "1.0.0" }
```

### Keine weiteren Dependencies
Alle Funktionen sind mit Platform-bereitgestellten Libraries implementiert.

---

## 16. Erledigte Entwicklungsaufgaben

- ✓ Project Setup (Vite + React + Tailwind)
- ✓ Router Setup (React Router v7, 7 public + 8 admin routes)
- ✓ PocketBase Client (src/lib/pb.ts)
- ✓ API Service Layer (src/lib/api.ts, 34+ functions)
- ✓ 7 Public Pages (Home, Register, Participants, Schedule, Results, Contact, Admin-Login)
- ✓ 7 Admin Module Stubs (Dashboard, ParticipantsAdmin, TournamentAdmin, CourtsAdmin, MatchesAdmin, ResultsAdmin, ScheduleAdmin)
- ✓ AdminLayout + Protected Routes
- ✓ Database Schema Definition (15 Collections als JSON)
- ✓ Responsive Design (Mobile-first, Tailwind v4)
- ✓ Brand Identity (Title, Meta, Favicon, Colors)
- ✓ Home Page Styling + Data Binding
- ✓ Register Form + Data Submission
- ✓ Participants List with Search
- ✓ Schedule Display
- ✓ Results Display
- ✓ Contact Page with Info
- ✓ Admin Login Form + Auth Flow

---

## 17. Teilweise erledigte Arbeiten

- ~ Admin Modules: Created, but CRUD operations incomplete
  - ParticipantsAdmin: List + Create working, Edit/Delete forms need binding
  - TournamentAdmin: Form fields present, validation missing
  - CourtsAdmin: Form UI present, no backend integration
  - MatchesAdmin: Form fields present, relationship handling incomplete
  - ResultsAdmin: UI present, score calculation logic missing
  - ScheduleAdmin: UI skeleton only, algorithm not implemented
  
- ~ Dashboard: Stub created, no data/statistics rendered

- ~ Database Sync: Only `tournaments` collection created in PocketBase; 14 others defined in JSON but not synced

- ~ Public Pages: Basic rendering works, but no live-update capability (static data only)

---

## 18. Offene Anforderungen und Backlog

### P0 (Kritisch/Blockierend)

| ID | Beschreibung | Grund | Abhängigkeiten | Ergebnis | Akzeptanzkriterium |
|----|-------------|-------|----------------|---------|-------------------|
| P0-01 | Sync alle 14 Collections zu PocketBase | Ohne DB können Admin-Module nicht funktionieren | — | Alle 15 Collections aktiv im Backend | `pb.collection('players').getFullList()` erfolgreich |
| P0-02 | Admin CRUD Complete (ParticipantsAdmin) | Spieler-Management muss funktionieren | P0-01 | Full CRUD für Spieler | Create, Edit, Delete, Search alle funktional |
| P0-03 | Match-Admin integrieren | Matches sind zentral für Turnier-Flow | P0-01 | Matches können erstellt/bearbeitet werden | Neue Matches erscheinen auf /schedule |

### P1 (Nächster notwendiger Stand)

| ID | Beschreibung | Grund | Abhängigkeiten | Ergebnis | Akzeptanzkriterium |
|----|-------------|-------|----------------|---------|-------------------|
| P1-01 | Dashboard Stats (Spieler, Matches, Status) | Admin braucht Überblick | P0-01 | Cards mit aktuellen Zahlen | Zahlen aktualisieren bei Datenänderung |
| P1-02 | CourtsAdmin Vollendung | Plätze müssen verwaltbar sein | P0-01 | Courts CRUD | Create/Edit/Delete/List funktional |
| P1-03 | ResultsAdmin Vollendung | Ergebnis-Erfassung muss funktionieren | P0-01, P0-02 | Results können eingegeben werden | Neue Results erscheinen auf /results |
| P1-04 | ScheduleAdmin Stub → Algorithmus | Spielplan muss maschinell erstellt können | P0-01, P0-02 | Round-Robin oder Swiss-System | AI generiert gültige Matches ohne Konflikte |
| P1-05 | Email-Benachrichtigungen | Spieler brauchen Bestätigung | P0-01 | Email bei Anmeldung + Status-Changes | Emails werden versendet (oder Stub für Demo) |

### P2 (Wichtig)

| ID | Beschreibung | Grund | Abhängigkeiten | Ergebnis | Akzeptanzkriterium |
|----|-------------|-------|----------------|---------|-------------------|
| P2-01 | Live-Updates auf /schedule, /results | User sehen Änderungen ohne Refresh | P1-02, P1-03 | WebSocket oder Polling | Neue Matches/Results erscheinen live |
| P2-02 | Doubles-Support | Manche Turniere benötigen Doppel | P0-01 | match_players erweitert (A/B pairs) | Doubles können gespielt werden |
| P2-03 | Knockout-System | Für Finals benötigt | P1-04 | Rounds.type supports "quarterfinal", etc. | Knockout-Matches können erstellt werden |
| P2-04 | Form-Validierung überall | Nutzer-Fehler vermeiden | P0-02, P1-02, P1-03 | Input-Validierung auf allen Forms | Falsche Daten werden abgelehnt |
| P2-05 | Duplikat-Prävention | Spieler sollten nicht 2x anmelden können | P0-01 | Check bei Anmeldung | Doppelte Anmeldung wird verhindert |

### P3 (Später/Optional)

| ID | Beschreibung | Grund | Abhängigkeiten | Ergebnis | Akzeptanzkriterium |
|----|-------------|-------|----------------|---------|-------------------|
| P3-01 | PDF-Export (Spielplan, Ergebnisse) | Ausdruck für Zuschauer | P1-04, P1-03 | PDF-Dateien generierbar | Spielplan als PDF herunterladbar |
| P3-02 | QR-Codes für Match-Infos | Zuschauer können Infos scannen | P0-02 | QR-Gen + Anzeige | Match-QR zeigt Spieler/Zeit |
| P3-03 | Statistiken & Rankings | Nach Turnier-Ende | P1-03 | Spieler-Rankings nach Gewinn-Quote | Top 3 Spieler angezeigt |
| P3-04 | Multi-Language (en, de, fr) | International Appeal | P0-01 | i18n Integration | UI switches language |
| P3-05 | Dark Mode | Modern UX | — | CSS Toggle | Dark/Light Theme wählbar |

---

## 19. Bekannte Fehler

### KRITISCH

**E001: Collections nicht im Backend**
- **Problem:** 14/15 Collections sind in `DB/json/` definiert, aber nicht in PocketBase angelegt
- **Ursache:** REST-API weist POST-Requests mit `400 Bad Request` ab; Node.js Setup.js Skript fehlgeschlagen
- **Impact:** Admin-Module können keine Daten speichern/laden
- **Workaround:** Manuelle Anlage über PocketBase Admin-UI
- **Priorität:** P0 (blockierend)

### WICHTIG

**E002: Admin-Module ohne Datenbindung**
- **Problem:** ParticipantsAdmin, CourtsAdmin, etc. haben Formen, aber keine echte CRUD
- **Ursache:** Collections nicht im Backend → API-Calls würden fehlschlagen
- **Mögliches Symptom:** Forms können Daten nicht speichern
- **Fix:** Nach Collection-Sync implementieren
- **Priorität:** P1

**E003: Dashboard zeigt keine Statistiken**
- **Problem:** Dashboard.jsx ist Stub, keine Daten werden geladen
- **Ursache:** Unvollständige Implementierung
- **Fix:** Queries schreiben für Spieler/Match/Ergebnis-Counts
- **Priorität:** P1

### MODERAT

**E004: Keine Validierung auf Forms**
- **Problem:** Benutzer können ungültige Daten eingeben
- **Ursache:** Form-Validierung nicht implementiert
- **Impact:** Inkonsistente Datenbank
- **Fix:** React-Form Library oder Custom Validators
- **Priorität:** P2

**E005: Keine Duplikat-Prävention**
- **Problem:** Spieler können sich mehrfach anmelden
- **Ursache:** Prüfung nicht implementiert
- **Fix:** SQL Unique Constraint + Frontend Check
- **Priorität:** P2

---

## 20. Technische Schulden

1. **Datenbank-Sync-Automation fehlgeschlagen**
   - Node.js Skript (`DB/setup.js`) funktioniert nicht
   - Alternativ: Batch-Import oder manuelle UI-Anlage erforderlich
   - **Lösung:** Setup.js reparieren oder durch andere Methode ersetzen

2. **Keine Tests**
   - Kein Unit/Integration/E2E Tests vorhanden
   - **Impact:** Refactoring riskant
   - **Lösung:** Vitest + React Testing Library setup

3. **Code-Duplikation in Admin-Modulen**
   - Jedes Modul hat ähnliche CRUD-Patterns
   - **Lösung:** Generische CRUD-Komponente erstellen

4. **Keine Fehlerbehandlung in API-Calls**
   - try-catch vorhanden, aber Nutzer sieht keine Fehler-Messages
   - **Lösung:** Global Error Handler + Toast Notifications

5. **Inline-Styling in einigen Komponenten**
   - Tailwind wird überall verwendet, aber könnte konsistenter sein
   - **Lösung:** Design-Tokens definieren, Komponenten-Library aufbauen

6. **Keine TypeScript durchgängig**
   - `api.ts` ist TypeScript, aber JSX Dateien nicht
   - **Lösung:** Schrittweise JSX → TSX konvertieren

---

## 21. Getroffene Entscheidungen

1. **Single-Page Application (SPA)**
   - ✓ Grund: Schnelle Navigation, bessere UX, moderne Architektur
   - Alternativ: Server-Side Rendering wäre langsamer und komplexer

2. **PocketBase statt eigenem Backend**
   - ✓ Grund: Schnelle Entwicklung, keine Server-Code nötig, Built-in Auth
   - Alternativ: Firebase, Supabase, eigenem Node/Python Server

3. **Tailwind CSS v4**
   - ✓ Grund: Kein Build-Setup, Platform-bereitgestellt, responsive utilities
   - Alternativ: Material-UI, Bootstrap (zu heavy)

4. **React Router v7**
   - ✓ Grund: Modern, hooks-based, nested routing
   - Alternativ: Next.js, Remix (zu komplex für SPA)

5. **Flache Admin-Module (nicht nested)**
   - ✓ Grund: Einfache Navigation, klare Routes
   - Alternativ: Nested Routes (komplexer)

6. **Public Read, Admin Write auf Collections**
   - ✓ Grund: Spieler sehen Turnierinfo, nur Admins ändern
   - Alternativ: Komplett privat (User könnte nichts sehen)

7. **JWT Token für Admin-Auth**
   - ✓ Grund: Standard, Stateless, Skalierbar
   - Alternativ: Session-Cookies (älter, komplexer)

---

## 22. Offene Entscheidungen

1. **Doubles-Support: Jetzt oder später?**
   - Option A: Jetzt implementieren (match_players hat A/B fields) → mehr Arbeit, aber zukunftssicher
   - Option B: Später (P2) → schneller MVP, aber Schema-Migration später
   - **Empfehlung:** Später (P2), nach Kern-Funktionen

2. **AI-Schedule-Algorithmen: Round-Robin, Swiss, oder beide?**
   - Option A: Nur Round-Robin (einfach, fair)
   - Option B: Nur Swiss (komplexer, dynamisch)
   - Option C: Beide (Benutzer wählt)
   - **Empfehlung:** Round-Robin zuerst (P1), Swiss später (P3)

3. **Live-Updates: WebSocket, Polling, oder Static?**
   - Option A: WebSocket (schnell, komplex)
   - Option B: Polling (einfach, kann langsam sein)
   - Option C: Static + Manual Refresh (einfachst)
   - **Empfehlung:** Polling zuerst (P2), WebSocket später

4. **Mobile App: Web-only oder React Native?**
   - Option A: Web-only (diese App)
   - Option B: React Native (iOS/Android)
   - **Empfehlung:** Web-only für MVP, Native später

5. **Email-Benachrichtigungen: PocketBase Email API oder Twilio/SendGrid?**
   - PocketBase Email API ist disabled auf Platform
   - **Empfehlung:** SendGrid / Twilio Integration (P1)

---

## 23. Tests und Qualitätssicherung

### Aktueller Stand
- ❌ Keine Unit Tests
- ❌ Keine Integration Tests
- ❌ Keine E2E Tests
- ✓ Manuelle Testing (ad-hoc)

### Empfehlungen für Phase 2

**Unit Tests**
- Test API-Funktionen (`src/lib/api.ts`)
- Test Komponenten (Home, Register, etc.)
- Framework: Vitest + React Testing Library

**Integration Tests**
- Test Admin-Module mit Mock-PocketBase
- Test User Flows (Register → Schedule → Results)

**E2E Tests**
- Test komplette Flows mit echtem Backend
- Tool: Cypress oder Playwright

### Manual Testing Checklist (für nächste Phase)
- [ ] Alle 15 Collections erstellen & Testdaten einfügen
- [ ] Home-Page laden → Turnier-Info sichtbar
- [ ] Spieler anmelden → Erscheint auf Participants
- [ ] Admin login → Dashboard öffnet sich
- [ ] Spieler anlegen → Erscheint in ParticipantsAdmin
- [ ] Match erstellen → Erscheint auf Schedule
- [ ] Ergebnis eingeben → Erscheint auf Results
- [ ] Mobile Breakpoints testen (375px, 768px, 1280px)

---

## 24. Deployment und Betrieb

### Aktuelles Deployment

**Platform: IONOS/Neuroways**
- Live-Site: `https://[platform-url]/`
- Preview: `https://[platform-url]/preview`
- Snapshots: `https://[platform-url]/snapshots/[commit-hash]`
- Build: Automatisch bei Git Push
- Serving: Static `dist/` from built Vite Output

### dist/ Commit-Policy
- ✓ `dist/` ist committed (nicht in .gitignore)
- ✓ Platform liest direkt aus `dist/`
- Kein separater Build-Step auf Production nötig

### PocketBase Backend
- Läuft auf separatem Server (nicht bundled)
- App macht HTTP Requests gegen PocketBase API
- Platform-routing: Requests zu `http://localhost:8090` (Unix Socket)

### Backup-Strategie
- ✓ Code: Git + GitHub (`https://github.com/neuroways/tennis_ai`)
- ✓ Database: PocketBase's native backup (if available)
- TODO: Automated DB backup process

---

## 25. Risiken

| Risiko | Impact | Wahrscheinlichkeit | Mitigierung |
|--------|--------|-------------------|-------------|
| Collections nicht synchron | **HOCH** — App funktioniert nicht | **MITTEL** | P0 Aufgabe, manuell anlegen wenn needed |
| PocketBase URL-Änderung | **MITTEL** — Requests fehlgeschlagen | **GERING** | Platform-managed, sollte nicht ändern |
| Admin-Token Expiration | **MITTEL** — Admin-User logged out | **GERING** | PocketBase auto-refresh, aber nicht implementiert |
| Datenbank-Schemamigration | **MITTEL** — Alte Daten incompatible | **GERING** | JSON Definitions als Source of Truth |
| Performance bei vielen Matches | **MITTEL** — Slow /schedule page | **GERING** | Pagination/Caching nicht implementiert |
| Keine Input-Validierung | **MITTEL** — Bad data in DB | **HOCH** | P2 Priority |
| Browser-Kompatibilität | **GERING** — Alte Browser nicht supported | **GERING** | Tailwind v4 + Modern React |

---

## 26. Empfohlene nächste Entwicklungsschritte

### Phase 2A (Datenbank & Admin CRUD) — 2-3 Wochen

**Schritt 1: Sync alle Collections zu PocketBase**
- Ziel: Alle 15 Collections im Backend aktiv mit Testdaten
- Voraussetzung: Zugang zu PocketBase Admin-UI oder repariertes Setup.js Skript
- Betroffene Bereiche: Backend
- Ergebnis: `pb.collection('players').getFullList()` funktioniert
- Akzeptanzkriterium: Alle 15 Collections sichtbar in PocketBase Admin, mit Testdaten gefüllt

**Schritt 2: ParticipantsAdmin Complete (CRUD)**
- Ziel: Spieler vollständig verwaltbar
- Voraussetzung: Schritt 1 erledigt, Players Collection aktiv
- Betroffene Bereiche: `src/pages/admin/ParticipantsAdmin.jsx`, API
- Ergebnis: Create, Read, Update, Delete, Search alles funktional
- Akzeptanzkriterium: Neuer Spieler → Speichern → Erscheint auf Liste → Edit → Delete → verschwunden

**Schritt 3: Admin Module Complete (CourtsAdmin, MatchesAdmin, ResultsAdmin)**
- Ziel: Kern-Admin-Funktionen werkzeugbereit
- Voraussetzung: Schritt 1 & 2
- Betroffene Bereiche: 3 Module
- Ergebnis: Courts, Matches, Results verwaltbar
- Akzeptanzkriterium: Siehe E002-Fix

**Schritt 4: Dashboard Stats**
- Ziel: Admin sieht Überblick
- Voraussetzung: Schritt 1 & 2
- Betroffene Bereiche: Dashboard.jsx
- Ergebnis: Statistik-Cards mit aktuellen Zahlen
- Akzeptanzkriterium: Spieler-Count, Match-Count, Status-Anzeige aktualisiert sich live

### Phase 2B (Features & Validierung) — 1-2 Wochen

**Schritt 5: Form-Validierung überall**
- Ziel: User-Fehler reduzieren
- Betroffene Bereiche: Alle Forms (Register, TournamentAdmin, etc.)
- Ergebnis: Input-Prüfung, Error-Messages
- Akzeptanzkriterium: Leere Felder werden abgelehnt, Error angezeigt

**Schritt 6: Duplikat-Prävention**
- Ziel: Spieler können sich nicht doppelt anmelden
- Betroffene Bereiche: Register.jsx, API
- Ergebnis: Check beim Submit
- Akzeptanzkriterium: Zweite Anmeldung wird verhindert + Meldung

**Schritt 7: Email-Benachrichtigungen**
- Ziel: Spieler erhalten Bestätigung & Updates
- Betroffene Bereiche: Backend, API
- Ergebnis: Email bei Anmeldung, Status-Changes
- Akzeptanzkriterium: Mails werden versendet (oder Stub für Demo)

### Phase 2C (Spielplan-Generator) — 2-3 Wochen

**Schritt 8: ScheduleAdmin Algorithmus (Round-Robin)**
- Ziel: Spielplan maschinell erstellen
- Betroffene Bereiche: ScheduleAdmin.jsx, neue Utility-Funktionen
- Ergebnis: Algorithmus generiert gültige Matches
- Akzeptanzkriterium: 8 Spieler → 7 Matches ohne Konflikte generiert

**Schritt 9: AI Schedule Approval & Override**
- Ziel: Admin kann Schedule akzeptieren/ablehnen/ändern
- Betroffene Bereiche: ScheduleAdmin.jsx
- Ergebnis: UI für Genehmigung & Batch-Edits
- Akzeptanzkriterium: Admin sieht Vorschlag, kann akzeptieren oder bearbeiten

### Phase 3+ (Advanced Features)

- Live-Updates (WebSocket/Polling)
- Doubles-Support
- Knockout-System
- Statistiken & Rankings
- PDF-Export
- QR-Codes
- Dark Mode
- Mobile App

---

## 27. Einstiegspunkt für die nächste KI

### Was zuerst lesen?
1. **Dieses Dokument** (PROJECT_HANDOVER.md) — vollständiger Überblick
2. **app/README.md** — Schnelle Übersicht + Start-Anweisungen
3. **app/AGENTS.md** — Projekt-Technologie & Stack (English)
4. **app/src/App.jsx** — Router & Route-Struktur
5. **app/src/lib/pb.ts** — PocketBase Client
6. **app/src/lib/api.ts** — API-Funktionen

### Welche Dateien sind zentral?
- `src/App.jsx` — Router (änderungen hier brechen Navigation)
- `src/lib/pb.ts` — Backend-Verbindung (kritisch)
- `src/lib/api.ts` — Business Logic (zentrale Abstraction)
- `DB/json/tournaments.json` — Schema-Template
- `index.html` — Title, Meta, CSS-Link (Brand)
- `tailwind.config.cjs` — Design-Tokens (Farben, Fonts)

### Was nicht ungeprüft verändern?
- `src/lib/pb.ts` — Falscher Code → Backend-Verbindung kaputt
- `index.html` title/meta — SEO/Brand
- `tailwind.config.cjs` Farben — Design wird zerstört
- `.gitignore` — Secrets könnten in Git landen
- `dist/` — Nur bei New Build editieren

### Was ist der nächste Entwicklungsschritt?
**P0: Sync alle 14 Collections zu PocketBase** (siehe Schritt 1 unter "Empfohlene nächste Entwicklungsschritte")

Danach: ParticipantsAdmin Complete (Schritt 2)

### Welche Entscheidungen sind offen?
- Doubles-Support: Jetzt oder P2? (Empfehlung: P2)
- AI-Algorithmen: Round-Robin vs Swiss? (Empfehlung: RR zuerst)
- Live-Updates: WebSocket vs Polling? (Empfehlung: Polling zuerst)
- Email-Provider: SendGrid, Twilio, oder andre? (Nicht PocketBase, API disabled)

### Wie lässt sich der aktuelle Stand testen?
1. **Lokal:**
   ```bash
   cd app
   npm run dev
   # http://localhost:5173
   ```

2. **Funktionen:**
   - Home: Sollte Turnier-Info zeigen (Testdata in PocketBase)
   - Register: Spieler-Anmeldung (funktioniert nach P0)
   - Participants: Anmeldungen anzeigen (funktioniert nach P0)
   - /admin: Admin-Login (Test mit admin@example.com / admin)
   - /admin/dashboard: Dashboard (funktioniert nach Schritt 4)

3. **Manuell testen:**
   - Erstelle Spieler via /admin/participants
   - Melde Spieler an via /register
   - Prüfe auf /participants
   - Erstelle Match via /admin/matches
   - Prüfe auf /schedule

---

## 28. Unsicherheiten

| Unsicherheit | Grund | Impact | Mitigierung |
|--------------|-------|--------|------------|
| PocketBase-Instanz Lokalisierung | API-Setup unklar, ob lokal oder Remote | Hoch | Zugriff prüfen: `curl http://localhost:8090` oder `ls -la /pb_data/` |
| Collections wirklich im Backend? | Nur `tournaments` bestätigt, andere möglicherweise ja aber unverified | Hoch | Mit PocketBase Admin-UI alle 15 prüfen |
| Admin-User existiert? | `admins` Collection erstellt, aber Testdaten unklar | Mittel | Mit Passwort reset versuchen oder neuen Admin anlegen |
| Testdaten in tournaments vollständig? | Nur 1 Testdatensatz bekannt (05.09.2026) | Gering | Prüfen: `curl http://localhost:8090/api/collections/tournaments/records` |
| API-Fehler 400 reparierbar? | Node.js Setup.js fehlt, Grund unklar | Mittel | Neue Methode probieren (manuell oder anderes Skript) |
| Vite Build funktioniert? | `dist/` ist committed, aber letzter Build-Status unklar | Gering | `npm run build` testen, Fehler prüfen |
| PocketBase JWT Expiration | Token-Refresh nicht implementiert | Mittel | Nach Timeout manuell neu-login; oder Auto-Refresh hinzufügen |
| Email-Funktionalität machbar? | PocketBase Email API disabled auf Platform | Mittel | Externale Service (SendGrid) nutzen oder Demo-Mode |

---

## Zusammenfassung für schnellen Überblick

**Tennisturnier Neindorf** ist eine React-SPA für Turnier-Management mit:
- ✓ 7 öffentliche Seiten (Home, Register, Participants, Schedule, Results, Contact)
- ✓ 7 Admin-Module (Dashboard, Spieler, Turnier, Plätze, Matches, Ergebnisse, Spielplan)
- ~ 15 Collections definiert (nur 1 im Backend aktiv)
- ✓ Responsive Design (Mobile, Tablet, Desktop)
- ✓ PocketBase Auth + REST API
- ✓ Tailwind v4 Styling
- ✓ React Router v7 SPA

**Kritischer Blocker:** 14/15 Collections müssen zu PocketBase synchronisiert werden.

**Nächste Schritte:** P0 (Collection-Sync) → P1 (Admin-CRUD) → P2 (Features) → P3+ (Advanced)

**Geschätzte Entwicklungszeit für Phase 2:**
- Phase 2A (DB + CRUD): 2-3 Wochen
- Phase 2B (Validierung): 1-2 Wochen
- Phase 2C (Spielplan): 2-3 Wochen
- **Total: 5-8 Wochen für volle Funktionalität**

