# NeuroPlay Brettspielcoach – Masterprompt für KI-Dokumentation

**Zweck:** Dieser Masterprompt dokumentiert den **vollständigen Entwicklungsstand** des Projekts. Eine KI kann damit sofort verstehen: Was wurde gebaut? Was funktioniert? Welche Anforderungen sind offen? Wie geht es weiter?

**Zielgruppe:** KI-Assistenten (Claude, ChatGPT, etc.), neue Entwickler, Projektmanagement.

**Aktualisiert:** 2026-08-15 | **Status:** Production Live | **v4 Deployed**

---

## 1. PROJEKTÜBERBLICK

### Was ist NeuroPlay?
Ein intelligenter Spiele-Coach als Webanwendung. Nutzer können:
- Ein Brettspiel aus dem **Katalog (924 Spiele)** auswählen oder eigene PDF-Regeln hochladen
- Den **Lernpfad** durchlaufen: Spielziel → Material → Aufbau → Regeln → Strategien
- **Live während des Spiels** den Coach nutzen: Phasen-Navigation, Fragen stellen, Regeln nachschlagen
- Ihre **Spielesammlung** verwalten: Favoriten, Tags, Haushalt mit Familie/Freunden
- **Spielsessions** aufzeichnen: Gewinner, Dauer, Teilnehmer (Analytics)

### Stack (Non-Negotiable)
```
Frontend:  React 18 + Vite v6 + Tailwind CSS v4
Backend:   PocketBase v0.39.0 + SQLite
Hosting:   STRATO Platform (/.sfs-bd/ dev, /.sfs-be/ prod)
Git:       github.com/neuroways/brettspielcoach_ai (dev branch)
```

### Produktivumgebung
- **Live URL:** https://sfs-05zwnczjvysr.live-website.com/
- **Dev URL:** https://aibuilder-514nc.preview.ai-builder.strato.de/
- **Build:** `npm run build:prod` → dist/ (1.1MB JS, 248KB gzip)
- **Dev Server:** `npm run dev` (Vite HMR auf Port 5173)

---

## 2. DATENBANKARCHITEKTUR

### PocketBase Collections (11 Total)

#### 1. `games` (924 Records)
**Zweck:** Catalog aller Brettspiele mit Metadaten.
**Felder:**
- `title` (String, required) – Spielname
- `description` (String) – Kurzbeschreibung
- `category_primary` (String) – Hauptkategorie (Strategie, Würfel, Kinder, etc.)
- `publisher_original_id` (String) – Link zu `publishers.id`
- `player_count_min`, `player_count_max` (Number)
- `duration_min`, `duration_max` (Number) – Spieldauer in Minuten
- `complexity_rating` (Number) – 1–5
- `recommended_age` (Number)
- `bgg_id` (String) – BoardGameGeek Link
- `rule_url` (String) – Link zu Anleitungs-PDF
- `rules_complete` (Boolean) – Hat komplette Regeln?
- `rules_verified` (Boolean) – Regeln verifiziert?
- `notes` (String) – Admin-Notizen
- `created` (ISO) – Import-Datum
- **Zugangsregeln:** Alle können read (public), only admins write/delete

#### 2. `publishers` (32 Records)
**Zweck:** Verlags-Metadaten.
**Felder:**
- `original_id` (String, unique) – Publisher ID aus Excel
- `name` (String) – Name
- `website` (String) – URL
- `rules_archive_url` (String) – Wo sind die Anleitungen?
- `game_count` (Number) – Wie viele Spiele in Katalog?
- **Zugangsregeln:** Alle read, admins write

#### 3. `users` (Auth Collection)
**Zweck:** Spieler-Anmeldung.
**Felder:**
- `email` (String, unique) – Anmelde-E-Mail
- `password` (String, hashed) – PocketBase verwaltet das
- `verified` (Boolean) – Admin-Markierung (true = Superuser für PocketBase Admin UI)
- **Zugangsregeln:** `auth.id == @request.auth.id` (Nutzer sehen nur sich selbst)

#### 4. `user_profiles` (N Records)
**Zweck:** Profil-Daten pro Spieler.
**Felder:**
- `user_id` (String, required) – FK zu users.id
- `player_name` (String) – Anzeigename in der App
- `role_id` (String) – FK zu roles.id (Admin, Haushaltsmanager, Mitglied)
- `household_id` (String) – FK zu households.id
- `avatar_url` (String, optional) – Profil-Bild
- **Zugangsregeln:** Auth-User sieht sein Profil + Haushalts-Mitglieder

#### 5. `user_game_collection` (N Records)
**Zweck:** Persönliche Spielesammlung (Favoriten, Tags, Notizen).
**Felder:**
- `user_id` (String, required) – FK zu users.id
- `game_id` (String, required) – FK zu games.id
- `is_favorite` (Boolean) – Markiert als Favorit?
- `tags` (Array of Strings) – Z.B. ["Lieblingsspiel", "Zu komplex", "Familienspieltag"]
- `notes` (String) – Persönliche Notizen zum Spiel
- `added_at` (ISO) – Wann hinzugefügt?
- **Zugangsregeln:** `user_id == @request.auth.id` (nur eigene Sammlung sehen)

#### 6. `user_game_sessions` (N Records)
**Zweck:** Spielsessions (Wer hat wann gewonnen?).
**Felder:**
- `game_id` (String, required) – FK zu games.id
- `household_id` (String) – FK zu households.id
- `players` (Array of Objects) – [{user_id, player_name, is_winner, score}]
- `winner_user_id` (String) – FK zu users.id (Gewinner)
- `duration_minutes` (Number) – Spieldauer
- `played_at` (ISO) – Wann gespielt?
- `notes` (String) – Z.B. Haus-Regeln
- **Zugangsregeln:** Haushalts-Mitglieder lesen/schreiben ihre Sessions

#### 7. `households` (N Records)
**Zweck:** Familien-/Freundesgruppen mit Rollenverwaltung.
**Felder:**
- `owner_user_id` (String, required) – Wer hat das Haushalt erstellt?
- `name` (String) – Z.B. "Familie Müller"
- `invite_code` (String, unique) – Code zum Beitreten (z.B. "FAM42XYZW")
- `created_at` (ISO)
- **Zugangsregeln:** Owner und Mitglieder read/write

#### 8. `household_members` (N Records)
**Zweck:** Mitgliedschaften (N:M zu users).
**Felder:**
- `household_id` (String, required) – FK zu households.id
- `user_id` (String, required) – FK zu users.id
- `role_id` (String) – FK zu roles.id (Owner, Manager, Member)
- `joined_at` (ISO)
- **Zugangsregeln:** Nur Haushalts-Mitglieder

#### 9. `roles` (5 Records – Seed Data)
**Zweck:** Rollen-Definitionen.
**Records:**
```json
[
  { id: "admin", name: "Admin", permissions: ["all"] },
  { id: "household_manager", name: "Haushaltsmanager", permissions: ["manage_members", "record_sessions"] },
  { id: "member", name: "Mitglied", permissions: ["view_collection", "play_games"] },
  { id: "guest", name: "Gast", permissions: ["view_catalog"] },
  { id: "superuser", name: "Superuser (PocketBase Admin)", permissions: ["admin_panel"] }
]
```

#### 10. `rule_sources` (924 Records)
**Zweck:** Verfolgung von Regel-URLs pro Spiel.
**Felder:**
- `game_id` (String, required) – FK zu games.id
- `source_url` (String) – Direkt-Link zur Anleitung
- `verification_status` (String) – "verified", "broken", "pending"
- **Zugangsregeln:** Admins write, alle read

#### 11. `import_batches` (N Records)
**Zweck:** Audit-Trail für Excel-Importe.
**Felder:**
- `batch_id` (String, unique) – Z.B. "excel_2026_08_15_v070"
- `filename` (String) – "Spielekatalog_v0.7.0.xlsx"
- `total_records` (Number) – 924
- `imported_count` (Number) – Erfolgreiche Imports
- `skipped_count` (Number) – Duplikate/Fehler
- `imported_at` (ISO)
- `admin_user_id` (String) – Wer importiert?
- **Zugangsregeln:** Admins only

---

## 3. FRONTEND-ARCHITEKTUR

### Screen-Routing (22 Screens)

```
App.jsx (Hauptrouter)
├─ StartScreen
│  ├─ [Upload Game] → UploadScreen
│  ├─ [Example Game] → AnalysisScreen
│  └─ [Browse Catalog] → GamesCatalog
│
├─ AuthScreen (Login/Signup)
│
├─ GamesCatalog (924 Spiele durchsuchen)
│  ├─ Filter: Category, Publisher, Min Age, Player Count
│  ├─ Search: Title, Publisher
│  └─ [Select Game] → GameOverview
│
├─ MyGamesScreen (Persönliche Sammlung)
│  ├─ Filter: Favorites, By Category
│  └─ [Select Game] → GameOverview
│
├─ AdminPanel (nur verified users)
│  ├─ AdminDataBrowser (Spiele editieren)
│  ├─ AdminExcelUpload (Excel importieren)
│  ├─ AdminUserManagement (Nutzer zu Admin machen)
│  └─ AdminAddPublisher (Verlage hinzufügen)
│
├─ Game Flow (6 Screens, linear)
│  ├─ GameOverview (Übersicht + Action-Buttons)
│  ├─ QuickStart (5 Schritte zum Lernen)
│  ├─ SetupScreen (Material + Aufbau)
│  ├─ RulesScreen (Suchbar, kategorisiert)
│  ├─ CoachScreen (Chat: Fragen stellen)
│  ├─ GameModeScreen (Live: Phasen, Punkte, Regeln)
│  └─ StrategyScreen (Tipps + Anfängerfehler)
│
├─ UserProfileScreen (Spieler-Daten)
│
└─ HouseholdSetupScreen (Familie/Freunde verwalten)
```

### Service Layer (src/lib/)

| Datei | Zweck | Exports |
|-------|-------|---------|
| `pb.js` | PocketBase Client Singleton | `pb` (initialisiert, auto-detects /.sfs-bd/ vs /.sfs-be/) |
| `config.js` | API-Endpoints, Domains | `getApiEndpoint()`, `getEnvironmentDomain()` |
| `catalogRepository.js` | Spiele laden | `loadCatalogGames()`, `getCatalogCategories()` |
| `gameRepository.js` | Game-Logik (Beispiel) | `getExampleGame()` |
| `gameService.js` | Coach-Antworten, Energie | `askGameCoach()`, `analyzeGameDocument()` |
| `userStorage.js` | Nutzer-Persistierung | `saveUser()`, `loadUser()`, `logout()` |
| `pbCollections.js` | Collection-Initialisierung | `createCollections()`, `checkCollections()` |

### Design System (NeuroWays)

**Primitive Markenfarben:**
- Navy: `#0A1F44` (Primary, Headings, Buttons)
- Teal: `#008CA8` (Secondary, Accents, Links)
- Violet: `#7B4BA2` (Highlight, Special)
- Gold: `#E2A83B` (Calls-to-action, Badges)

**Semantische Rollen:**
- `.bg-nw-primary` – Navy (Submit-Button, Headings)
- `.bg-nw-secondary` – Teal (Filter, Links, Secondary Actions)
- `.bg-nw-accent` – Violet (Highlights)
- `.bg-nw-highlight` – Gold (Badges, Success)

**Tokens (design-tokens.css):**
- **Spacing:** `--nw-space-1` (4px) bis `--nw-space-9` (96px)
- **Typography:** `--nw-font-h1`, `--nw-font-body`, `--nw-line-height-normal`
- **Motion:** `--nw-motion-fast` (150ms), `--nw-motion-page` (300ms)
- **Focus:** 3px Teal outline + 3px offset (WCAG 2.2 AA)
- **Radius:** 6px (small), 10px (medium), 12px (large)

**Responsive:**
- Mobile: 320–375px (Single Column)
- Tablet: 768px (2-Column)
- Desktop: 1024px+ (Multi-Column, Sidebar)
- All buttons ≥44px tap target

---

## 4. DATENFLUSS

### Import-Pipeline (Excel → PocketBase)

```
1. Nutzer lädt Excel hoch (AdminExcelUpload)
   ↓
2. Browser parsed XLSX (XLSX library)
   ├─ Sheet "Verlage" (32 Verlage)
   └─ Sheet "Spiele und Anleitungen" (924 Spiele)
   ↓
3. Validierung & Normalisierung
   ├─ URLs checken
   ├─ Empty Fields als null
   ├─ Dates normalisieren (ISO)
   └─ Publisher-IDs matching (Name → ID Lookup)
   ↓
4. Admin Token abrufen
   └─ POST /.sfs-auto-login → Bearer Token
   ↓
5. Upsert zu PocketBase Collections
   ├─ Check: Exists (game_id)?
   ├─ Ja → PATCH (Update)
   └─ Nein → POST (Create)
   ↓
6. Audit Log (import_batches)
   └─ Batch ID, Timestamp, Counts, Admin User
   ↓
7. Response: "924 Spiele importiert, 0 Fehler"
```

### Spieler-Sammlung Persistierung

```
User Logs In (AuthScreen)
   ↓
PocketBase authWithPassword(email, password)
   ├─ Success → JWT Token in localStorage
   └─ Fail → "Ungültige Anmeldedaten"
   ↓
pb.authRefresh() on App Load
   └─ Restore user session from token
   ↓
User navigiert zu GamesCatalog
   ↓
[Select Game] → Speichern zu user_game_collection
   ├─ POST /user_game_collection {user_id, game_id, is_favorite: false}
   └─ localStorage Backup (falls offline)
   ↓
[Mark as Favorite / Add Tags]
   ├─ PATCH /user_game_collection/{id} {is_favorite: true, tags: [...]}
   └─ Real-time UI Update
   ↓
MyGamesScreen lädt
   └─ GET /user_game_collection?filter=`user_id='${userId}'`
   └─ Zeige Favorites zuerst, dann alphabetisch
```

---

## 5. ENTWICKLUNGSSTAND

### ✅ COMPLETE (Ready for Production)

- **Datenbankarchitektur:** 11 Collections, Zugangsregeln, Seed Data
- **Spielekatalog:** 924 Spiele aus Excel, mit Verlagen & Kategorien
- **Excel Import:** Batch-verarbeitung, Validierung, Upsert-Logik
- **User Authentication:** Signup/Login, PocketBase JWT, Session-Restore
- **Admin Panel:** 
  - Spiele editieren (mit A–Z Filter, Full-Text Search, Ampel-Status)
  - Nutzer zu Admins machen
  - Verlage hinzufügen
  - Excel hochladen
- **Spielesammlung:** Favoriten, Tags, Notizen (PocketBase-persistent)
- **Haushalt-System:** Invite-Code, Mitglieder, Rollen (Struktur + UI)
- **Game Sessions:** Spieler, Gewinner, Dauer aufzeichnen
- **Design System (NeuroWays):** Navy/Teal/Gold Palette auf 7 Screens angewendet
  - Navigation
  - StartScreen
  - AdminPanel
  - GamesCatalog (partial)
  - Styles/design-tokens.css
- **Vite Build:** Production-optimiert (1.1MB JS)
- **Git:** GitHub repo mit 60+ Commits

### ⚠️ IN PROGRESS (Needs Attention)

- **Responsive Testing:** Mobile (375px), Tablet (768px), Desktop (1280px) noch nicht vollständig verifiziert
- **Accessibility (WCAG 2.2 AA):** Kontrast, Keyboard-Navigation, Screen Reader auf allen 22 Screens prüfen
- **Bundle Size Optimization:** 1.1MB JS → Ziel <700KB mit Code-Splitting
- **Design Rollout:** 15 Screens noch nicht mit Navy/Teal/Gold gestylt
  - QuickStart, SetupScreen, RulesScreen, CoachScreen, GameModeScreen
  - LibraryScreen, StrategyScreen, GameFlowScreen, AnalysisScreen
  - BoardGameCatalog, UploadScreen, UserProfileScreen, HouseholdSetupScreen, AuthScreen
- **Modal Consistency:** Game Detail Modal Link Styling (partial)
- **Form Inputs:** AuthScreen, UserProfileScreen, AddPublisherForm brauchen Token-basierte Styles

### ❌ NOT STARTED (Future)

- **Dark Mode:** Tokens vorhanden, aber nicht auf allen Screens implementiert
- **Real PDF Analysis:** Platzhalter-Logik, wartet auf PDF-Parser-Service
- **AI Coach:** Momentan Pattern-Matching, wartet auf RAG-System
- **PWA:** Web App Manifest vorhanden, Service Worker fehlt
- **Email Notifications:** PocketBase Email API disabled (STRATO Constraint)
- **Haushalt-Teilen:** Sessions zwischen Haushalts-Mitgliedern synchronisieren
- **Analytics Dashboard:** Gewinn-Rate, Lieblins-Spiele, Sessions-Analyse

---

## 6. BEKANNTE FEHLER & LÖSUNGEN

| Fehler | Root Cause | Status |
|--------|-----------|--------|
| "Collection 'games' nicht gefunden" | Collections fehlten in dev | ✅ Erstellt via REST API |
| Auth Token nicht persistent | Token nicht bei App-Load wiederhergestellt | ✅ `pb.authRefresh()` hinzugefügt |
| "Only superusers can perform this action" | User `verified` Flag false | ✅ Dokumentiert in STRATO_SETUP.md |
| Admin Panel nicht sichtbar trotz Anmeldung | `verified` Flag nicht gesetzt | ✅ Manual PATCH oder script |
| GamesCatalog zeigt 52 alte Spiele | Hardcoded JSON statt PocketBase Collection | ✅ Umgestellt auf `pb.collection('games')` |
| Excel Import speichert nicht in PocketBase | Nur localStorage, kein POST | ✅ Admin Token + Upsert-Logik hinzugefügt |
| Request Cancellation bei Tab-Switch | In-flight Requests nicht abgebrochen | ✅ AbortController implementiert |

---

## 7. ANFORDERUNGEN NACH PRIORITÄT

### 🔴 CRITICAL (Must Have für v1)

1. **Alle 22 Screens mit NeuroWays-Palette** (Navy/Teal/Gold)
   - Checklist: Navigation, StartScreen, AdminPanel, GamesCatalog fertig (4/22)
   - Remaining: 18 Screens
   - Criteria: Alle Headings Navy, Buttons Teal/Gold, Accents Violet

2. **Responsive auf Alle Breakpoints** (320, 375, 768, 1024, 1280, 1440px)
   - Testen: Mobile (kein horizontales Scrollen, ≥44px Buttons)
   - Tablet (2-Column Layouts)
   - Desktop (Full Experience)

3. **WCAG 2.2 AA Accessibility**
   - Contrast-Ratio ≥4.5:1 für Text
   - Keyboard Navigation (Tab, Enter, Escape) auf allen Screens
   - Screen Reader Labels (semantic HTML, ARIA)
   - Focus Indicators (3px Teal)

4. **PocketBase Auth Stable** (Keine Token-Fehler)
   - Login → Sammlung speichern → Logout → Re-Login → Sammlung wiederhergestellt
   - Admin Flag korrekt geladen
   - Session Persistence über Reload

### 🟡 HIGH (Should Have vor Production Release)

5. **Bundle Size Optimization** (<700KB gzip)
   - Current: 1.1MB JS, 248KB gzip
   - Strategy: Code-Splitting pro Screen, Tree-Shaking

6. **Game Sessions Analytics**
   - Sessions-Table in MyGamesScreen
   - Win-Rate Statistik pro Spiel
   - Leaderboard (wer gewinnt am meisten?)

7. **Haushalt-Feature vollständig**
   - Invite-Code teilen (Copy-to-Clipboard)
   - Accept Invite Flow
   - Haushalt wechseln

8. **Dokumentation aktuell**
   - Database Schema
   - API Endpoints
   - Setup Guide für neue Entwickler
   - Deployment Checklist

### 🟢 MEDIUM (Nice to Have)

9. Real PDF Analysis (wartet auf PDF-Parser Service)
10. AI Coach mit RAG (wartet auf LLM Integration)
11. Dark Mode vollständig
12. PWA Installation (icons, manifest)
13. Email Notifications (blocked by STRATO)

---

## 8. NÄCHSTE SCHRITTE (ROADMAP)

### Woche 1: Design-Rollout abschließen
```
[ ] QuickStart Screen → Navy/Teal/Gold
[ ] SetupScreen → Navy/Teal/Gold
[ ] RulesScreen → Navy/Teal/Gold
[ ] CoachScreen → Navy/Teal/Gold
[ ] GameModeScreen → Navy/Teal/Gold
[ ] Alle 18 Screens durchgehen
[ ] commit: "design: complete neurowaya palette on all 22 screens"
```

### Woche 2: Responsive & Accessibility
```
[ ] Mobile 320/375 durchgehen (kein H-Scroll)
[ ] Tablet 768 durchgehen (Layouts umbrechen?)
[ ] Desktop 1280/1440 durchgehen
[ ] WCAG Contrast Check (navy #0A1F44 auf white, etc.)
[ ] Keyboard Navigation (Tab, Enter, Escape)
[ ] Screen Reader (NVDA/VoiceOver) Spot-Check
[ ] commit: "fix: responsive and accessibility audit - wcag 2.2 aa compliance"
```

### Woche 3: Bundle & Performance
```
[ ] vite-bundle-analyzer installieren
[ ] Identify große Components/Libraries
[ ] Code-Splitting per-Screen implementieren
[ ] Tree-Shake unused gameService exports
[ ] Target: <700KB gzip
[ ] commit: "perf: optimize bundle size via code-splitting"
```

### Woche 4: Stabilität & Dokumentation
```
[ ] Session Persistence Stress-Test
[ ] Admin Panel End-to-End (Login → Edit → Logout)
[ ] Excel Import mit 924 Spielen re-test
[ ] All 11 Collections dokumentieren (Zugangsregeln, Fields)
[ ] README aktualisieren
[ ] Deployment Checklist erstellen
[ ] commit: "docs: complete project documentation and deployment guide"
```

---

## 9. DEPLOYMENT CHECKLIST

Vor `npm run build:prod`:

- [ ] `AGENTS.md` aktualisiert
- [ ] Alle Secrets nicht in `src/` (nur `.env.local` git-ignored)
- [ ] PocketBase API-URLs korrekt (/.sfs-be/)
- [ ] Admin Token generiert (falls Import geplant)
- [ ] Favicon aktualisiert (NeuroWays Logo)
- [ ] Meta-Tags in index.html (title, description)
- [ ] Vite Build fehlerfrei
- [ ] Keine Console Errors im Browser
- [ ] Responsive Spot-Check (Mobile, Tablet, Desktop)
- [ ] Git Tag erstellen: `git tag v1.0` (Release Marker)

Nach Build:
```bash
cd app
npm run build:prod
# → dist/ erzeugt
# → STRATO deployed automatisch
# → Verify: https://sfs-05zwnczjvysr.live-website.com/
```

---

## 10. ARCHITEKTUR-ENTSCHEIDUNGEN

### Warum Screen-basiertes Routing (kein React-Router)?
- MVP Einfachheit: Single `screen` state in App.jsx
- Schnelle Iteration auf Layouts
- Future-ready: Upgrade zu react-router möglich

### Warum PocketBase?
- Real-time Synchronization (WebSockets, optional)
- Built-in Authentication (JWT, Roles)
- Admin Dashboard (Standard)
- Einfache Skalierung (SQLite → PostgreSQL)

### Warum NeuroWays Design System?
- Brand Consistency über alle NeuroWays Produkte
- Navy/Teal/Gold psychologisch gewählt für Spielerlebnis
- WCAG 2.2 AA konform (Kontraste, Focus)

### Warum Excel für Game Import?
- Non-Technical Workflow (Stakeholder füllt Sheet)
- Batch-verarbeitung (924 Spiele auf einmal)
- Audit Trail (import_batches Collection)
- Offline-editing (Excel lokal, dann Upload)

---

## 11. KONTAKT & SUPPORT

**GitHub:** https://github.com/neuroways/brettspielcoach_ai
**Branch:** `dev` (Main Development)
**Commits:** 60+ seit Anfang August 2026

**Dokumentation im Repo:**
- `AGENTS.md` – MVP Architecture
- `DATABASE_STRUCTURE.md` – Collections & Zugangsregeln
- `STRATO_SETUP.md` – PocketBase Admin Setup
- `SYNC_TO_POCKETBASE.md` – Import Flow
- `ABSCHLUSSBERICHT_NPB_DEV_001.md` – Detaillierter Status

---

## 12. MASTERPROMPT-TEMPLATE (Für nächste Iteration)

Nutze **diesen Prompt**, um eine KI zu briefen:

```
Du bist ein Entwickler für NeuroPlay (Brettspiel-Coach-App).
Lese bitte MASTERPROMPT_PROJECT_STATE.md (oder diese Nachricht).
Deine Aufgaben:

1. [SPEZIFISCHE AUFGABE, z.B. "Implementiere Tags auf MyGamesScreen"]
2. [CONSTRAINTS, z.B. "Nutze nur Navy/Teal/Gold, keine neuen Farben"]
3. [TESTEN, z.B. "Teste auf Mobile 375px, kein H-Scroll"]
4. [COMMIT, z.B. "git commit -m 'feat: tags on mygames screen'"]

Fragen?
- Collections & Schema: Siehe Abschnitt 2
- Design System: Siehe Abschnitt 3
- API: Siehe src/lib/pb.js + config.js
- Status: Siehe Abschnitt 5
- Fehler: Siehe Abschnitt 6
```

---

**Dieser Prompt ist die Quelle der Wahrheit. Aktualisiere ihn nach jedem Release.**
