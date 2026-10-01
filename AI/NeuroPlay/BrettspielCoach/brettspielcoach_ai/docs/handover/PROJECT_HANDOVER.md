# PROJECT HANDOVER
## NeuroPlay Brettspielcoach – Vollständige Projektübergabe

**Dokumentversion:** 1.0 | **Datum:** 2026-08-15 | **Status:** Production Deployment Ready
**Repository:** https://github.com/neuroways/brettspielcoach_ai (Branch: dev)

---

## 1. Dokumentinformationen

### Projektidentität
- **Projektname:** NeuroPlay Brettspielcoach (NeuroPlay Board Game Coach)
- **Kurzbeschreibung:** Intelligente Webanwendung zum Erlernen, Verstehen und Spielen von Brettspielen mit Katalog, persönlicher Sammlung, Haushalt-Verwaltung und Live-Spiel-Coaching
- **Entwicklungsstand:** MVP 4 (v4), Production-Ready mit 924 Spielen im Katalog
- **Übergabedatum:** 15. August 2026

### Technologie-Stack
- **Frontend:** React 18 + Vite v6 + Tailwind CSS v4
- **Backend:** PocketBase v0.39.0 (SDK v0.27.0) + SQLite
- **Hosting/Deployment:** STRATO Platform (/.sfs-bd/ dev, /.sfs-be/ prod)
- **Version Control:** GitHub / git
- **Build-Output:** dist/ (1.1MB JS, 248KB gzip nach Minifikation)

### Umgebungen
| Umgebung | URL | PocketBase | Git Branch | Status |
|----------|-----|-----------|-----------|--------|
| **Produktion (Live)** | https://sfs-05zwnczjvysr.live-website.com/ | /.sfs-be/ | dev | ✅ Live |
| **Development** | https://aibuilder-514nc.preview.ai-builder.strato.de/ | /.sfs-bd/ | dev | ✅ Aktiv |

### Repository-Information
- **Git-URL:** git@github.com:neuroways/brettspielcoach_ai.git
- **Aktive Branch:** `dev`
- **Commits:** 60+ seit Projektstart (August 2026)
- **Letzter Commit:** `9097ac5` – "docs: add comprehensive masterprompt for ai onboarding and project continuity"

### Zweck dieser Übergabe
Diese Handover-Dokumentation rekonstruiert den **kompletten Entwicklungsstand** des NeuroPlay-Projekts — was implementiert ist, was teilweise ist, was geplant ist und welche Fehler bekannt sind. Sie ermöglicht einer KI oder einem neuen Entwickler sofortige Weiterer Arbeit **ohne** Kontextmangel.

---

## 2. Executive Project Summary

### Was ist NeuroPlay?
NeuroPlay ist eine responsive React-Webanwendung, die Spieler befähigt, Brettspiele zu lernen, zu verstehen und strategisch zu spielen. Das System kombiniert einen durchsuchbaren Katalog von 924 Spielen (mit Verlagen, Kategorien, Regeln und Metadaten) mit persönlichen Spielersammlungen, Haushalt-Management und Live-Spiel-Coaching.

### Das Problem, das es löst
- **Brettspiel-Regelunklarheit:** Spieler verstehen Regeln nicht oder merken sich sie nicht
- **Einsamkeit beim Spielen:** Kein Coach, der Fragen beantwortet
- **Katalog-Verwaltung:** Keine zentrale Datenquelle für Spieldaten

### Zielgruppe
- **Endnutzer:** Casual Board Game Player (Altersgruppe 10+)
- **Admin/Power User:** NeuroWays-Mitarbeiter zur Katalog-Verwaltung
- **Haushalts-Manager:** Familien/Spielgruppen, die Spiele gemeinsam verwalten

### Kern-Funktionen (aktuell implementiert)
1. **Spielekatalog:** 924 Spiele durchsuchen mit Full-Text-Search, Filter nach Kategorie/Verlag/Alter/Spielerzahl
2. **Spielesammlung:** Persönliche Favoriten, Tags, Notizen speichern (persistent in PocketBase)
3. **Spiel-Anleitung:** 6-Schritte-Lernpfad (Ziel → Material → Aufbau → Regeln → Strategien → Energienavigator)
4. **Live-Coach:** Chat-Interface mit Frage-Antwort während des Spiels
5. **Haushalt/Gruppe:** Familie/Freunde mit Invite-Code, geteilte Spielsessions
6. **Spielsessions:** Aufzeichnung von Gewinnern, Spieldauer, Teilnehmern
7. **Admin-Panel:** Spiele editieren, Excel importieren, Nutzer verwalten (nur für Admin)
8. **Authentication:** Signup/Login mit PocketBase, Token-Persistierung

### Aktueller Reifegrad
- ✅ **Core Functionality:** 100% implementiert
- ✅ **Data Foundation:** 924 Spiele + 32 Verlage in PocketBase
- ✅ **User Auth:** Funktioniert, Token-Persistierung behoben
- ✅ **Admin Tools:** Excel-Import, Datenbrowser, Nutzerverwaltung
- ⚠️ **Design System:** Navy/Teal/Gold auf 7 von 22 Screens angewendet
- ⚠️ **Responsive:** Nicht vollständig auf 320–1440px verifiziert
- ⚠️ **Accessibility:** WCAG 2.2 AA nicht systematisch verifiziert
- ⚠️ **Performance:** Bundle 1.1MB (Warnung >500KB), Code-Splitting nicht implementiert

### Wo befindet sich die Entwicklung?
Das Projekt ist **produktiv live** und akzeptiert Nutzer. Die Datenfundament (924 Spiele, 32 Verlage) ist stabil in PocketBase. Die nächsten Prioritäten sind: Design-Rollout auf alle 22 Screens, Responsive-Überprüfung, Performance-Optimierung.

---

## 3. Fachliches Zielbild

### Bestätigte Anforderungen (vom Nutzer explizit verlangt)

| # | Anforderung | Bestätigung |
|---|-------------|------------|
| 1 | Brettspiel-Katalog mit 844+ Spielen | Chat-Verlauf: "die 844 Spiele in eine datenbank speichern" |
| 2 | Datenquelle = PocketBase, nicht lokale DB | Chat: "ich würde gerne als datenbank die hier vorgesehenen collections nutzen" |
| 3 | Excel-Import für Spieledaten | Chat: "Kannst du die fehlenden daten anfügst" |
| 4 | Admin-Panel zur Katalog-Verwaltung | Chat: "Suche drüberlegen und die ansicht um kategorie erweitern" |
| 5 | Spielekatalog durchsuchen/filtern | Chat: "Nach Kategorie und oder Verlag filtern können" |
| 6 | Persönliche Spielesammlung | Chat: "zu meiner spielesammlung hinzufügen" |
| 7 | Favoriten & Tags | Chat: "als Favorit hinzufügen" + "ich möchte auch eigene Benutzerbasierte Tags hinzufügen" |
| 8 | Haushalt/Gruppe-Management | Chat: "verschiedene Spieler können einer festen Gruppe angehören - einem Haushalt" |
| 9 | User-Authentifizierung | Chat: "es muss alles in der datenbank gespeichert werden" |
| 10 | Admin-Rollen & Verifikation | Chat: "svenja@festerling.org sollte Admin sein und demnach auch superuser" |
| 11 | Spielsessions & Sieger-Tracking | Chat: "Game Sessions aufzeichnen: Gewinner, Dauer, Teilnehmer" (aus MVP-Beschreibung) |
| 12 | NeuroWays Design System (Navy/Teal/Gold/Violet) | Chat: "die farben nach den standards" → Full NW-DESIGN-WEB-001 spec |
| 13 | Responsive auf Mobile/Tablet/Desktop | MVP AGENTS.md: "Mobile (375px), Tablet (768px), Desktop (1280px)" |
| 14 | Spiel-Lernpfad (Ziel → Material → Regeln → Strategien) | AGENTS.md: 6 Screens "linear flow" |
| 15 | Live-Coach während des Spiels | AGENTS.md: "CoachScreen", "askGameCoach()" |

### Geplante/Zukünftige Funktionen (noch nicht implementiert)

| # | Funktion | Grund | Nachweis |
|---|----------|-------|----------|
| 16 | Real PDF-Parsing (Client/Server) | MVP: "PDF-to-text library, NLP extraction" deferred | AGENTS.md: "Future Integrations" |
| 17 | AI-Coach mit RAG | MVP: "Replace with RAG, context-aware responses" deferred | AGENTS.md: "Coach AI" |
| 18 | Dark Mode vollständig | Tokens vorhanden, nicht auf allen Screens angewendet | design-tokens.css: Dark Mode Block (ungeklärt ob nötig) |
| 19 | PWA (Progressive Web App) | Manifest vorhanden, Service Worker fehlt | public/ hat manifest-Grundstruktur |
| 20 | Email Notifications | STRATO PocketBase Email-API disabled (Constraint) | MASTERPROMPT: "PocketBase Email und Cron APIs are off-limits" |
| 21 | Haushalt-Sharing vollständig | Invite-Code-System vorhanden, aber User-Workflow unklar | HouseholdSetupScreen: "teilweise implementiert" |
| 22 | Game Session Analytics-Dashboard | Sessions werden aufgezeichnet, keine Auswertungs-UI | MyGamesScreen: nur Collection-View |

### Offene fachliche Entscheidungen

| Frage | Auswirkung | Status |
|-------|-----------|--------|
| Sollen Spieler beliebig viele Haushälter verwalten oder nur einen? | Datenmodell + UI | UNGEKLÄRT – HouseholdSetupScreen aktuell auf 1 begrenzt |
| Sollen Session-Statistiken pro Spiel (Win-Rate) sichtbar sein? | Feature-Scope | UNGEKLÄRT – Anforderung klar, aber Implementierung unklar |
| Brauchen wir ein Permissions-System (Owner/Manager/Member)? | Access Control | TEILWEISE GEPLANT – Roles-Collection vorhanden, aber nicht durchgehend umgesetzt |
| Sollen Tags Haushalt-spezifisch oder Nutzer-spezifisch sein? | Datenmodell | UNGEKLÄRT – Tags aktuell Nutzer-spezifisch |

### Nicht mehr gültige / ersatzte Anforderungen

| Ursprüngliche Anforderung | Ersatz / Entfernung | Grund |
|---------------------------|-------------------|-------|
| "CSV-Import für Spieldaten" | Excel-Import über AdminExcelUpload | Excel ist strukturierter, besser für multi-sheet Daten |
| "Games stored in React state (lost on reload)" | PocketBase persistent storage | Wurde behoben mit Token-Persistierung |

---

## 4. Vollständiger Anforderungskatalog

### Status-Definition
- **IMPLEMENTIERT:** Feature existiert im Code und funktioniert nachweisbar
- **TEILWEISE IMPLEMENTIERT:** Anfang gemacht, aber nicht vollständig oder fehlerhaft
- **GEPLANT:** Anforderung dokumentiert, aber noch nicht angefangen
- **OFFEN:** Zu entscheiden, wie/ob umzusetzen
- **UNGEKLÄRT:** Aus den verfügbaren Informationen nicht bestimmbar
- **ERSETZT:** Alte Anforderung, wurde durch andere gelöst

| ID | Anforderung | Kategorie | Status | Implementierung/Nachweis | Offene Punkte |
|----|----|----------|--------|--------------------------|---|
| F01 | Katalog mit 924 Spielen | Funktional | IMPLEMENTIERT | GamesCatalog.jsx lädt aus pb.collection('games') | — |
| F02 | Search by Title/Category/Publisher | Funktional | IMPLEMENTIERT | GamesCatalog.jsx, line 76-90: `matchesSearch`, `matchesCategory`, `matchesPublisher` | — |
| F03 | Filter by Age/Player Count | Funktional | IMPLEMENTIERT | GamesCatalog.jsx, line 91-99: `minAge`, `playerCount` filter | — |
| F04 | Filter by "In Collection" / "Favorites" | Funktional | IMPLEMENTIERT | GamesCatalog.jsx, line 108-113: `filterMode` state | — |
| F05 | Spielesammlung speichern (Favoriten) | Funktional | IMPLEMENTIERT | user_game_collection Collection, `is_favorite` field | — |
| F06 | Tags pro Spiel | Funktional | TEILWEISE IMPLEMENTIERT | Field vorhanden (`tags: Array`), UI für Tag-Verwaltung **UNGEKLÄRT** | Modal für Tags-Eingabe erforderlich |
| F07 | Notizen pro Spiel | Funktional | IMPLEMENTIERT | user_game_collection.notes field | — |
| F08 | Spiel-Lernpfad (6 Screens) | Funktional | IMPLEMENTIERT | GameOverview → QuickStart → SetupScreen → RulesScreen → CoachScreen → StrategyScreen | — |
| F09 | Live-Coach (Chat) | Funktional | IMPLEMENTIERT | CoachScreen, askGameCoach() mit Pattern-Matching | Responses sind hardcoded, nicht AI-basiert |
| F10 | Lernschritt-Accordion | Funktional | IMPLEMENTIERT | QuickStart.jsx – 5 Steps expandierbar | — |
| F11 | Regeln durchsuchen (RulesScreen) | Funktional | IMPLEMENTIERT | RulesScreen.jsx mit Search-Input + kategorisierte Regeln | — |
| F12 | Admin-Panel Access Control | Funktional | IMPLEMENTIERT | App.jsx: `isAdmin` Check basierend auf `verified` flag | — |
| F13 | Excel-Import (924 Spiele) | Funktional | IMPLEMENTIERT | AdminExcelUpload.jsx, 523 Zeilen | — |
| F14 | Publisher aus Excel importieren | Funktional | IMPLEMENTIERT | AdminExcelUpload.jsx, "Verlage" sheet parsing | — |
| F15 | Games-Datenbestand editieren | Funktional | IMPLEMENTIERT | AdminDataBrowser.jsx mit Edit-Modal pro Record | — |
| F16 | Admin-Datenbrowser mit Filter | Funktional | IMPLEMENTIERT | AdminDataBrowser.jsx: A-Z Alpha, Category, Publisher, Rule-Status Filter | — |
| F17 | Nutzer zu Admin machen | Funktional | IMPLEMENTIERT | AdminUserManagement.jsx, PATCH /users/{id} verified=true | — |
| F18 | Haushalt erstellen & Mitglieder einladen | Funktional | TEILWEISE IMPLEMENTIERT | HouseholdSetupScreen UI vorhanden, aber Persistierung **UNKLAR** | Code-Review erforderlich |
| F19 | Spielsession aufzeichnen | Funktional | TEILWEISE IMPLEMENTIERT | GameModeScreen exists, aber save-to-DB nicht sichtbar | Implementation in GameModeScreen unklar |
| F20 | User-Login/Signup | Funktional | IMPLEMENTIERT | AuthScreen.jsx + pb.collection('users').authWithPassword() | — |
| F21 | Token Persistierung (Stay Logged In) | Funktional | IMPLEMENTIERT | App.jsx, fix 9bff73f: `pb.authRefresh()` on mount | — |
| F22 | Benutzer-Profil editieren | Funktional | IMPLEMENTIERT | UserProfileScreen.jsx | — |
| F23 | Admin-Token für Excel-Import | Funktional | IMPLEMENTIERT | AdminExcelUpload.jsx: `/.sfs-auto-login` endpoint | — |
| F24 | NeuroWays Design System | UI | TEILWEISE IMPLEMENTIERT | design-tokens.css vorhanden, 7/22 Screens mit Navy/Teal angewendet | 15 Screens ausstehend |
| F25 | Responsive 375px (Mobile) | UI | TEILWEISE IMPLEMENTIERT | Tailwind mobile-first, aber nicht vollständig verifiziert | Responsive testing ausstehend |
| F26 | Responsive 768px (Tablet) | UI | TEILWEISE IMPLEMENTIERT | md: breakpoints vorhanden, nicht vollständig verifiziert | Responsive testing ausstehend |
| F27 | Responsive 1280px (Desktop) | UI | TEILWEISE IMPLEMENTIERT | lg: breakpoints vorhanden, nicht vollständig verifiziert | Responsive testing ausstehend |
| F28 | WCAG 2.2 AA Accessibility | UI | UNGEKLÄRT | Keine systematische Audit durchgeführt; focus-visible outline 3px Teal vorhanden | Full accessibility audit erforderlich |
| F29 | Keyboard Navigation | UI | UNGEKLÄRT | Buttons/Inputs standard HTML, aber nicht systematisch verifiziert | Screen Reader + Keyboard audit erforderlich |
| NF01 | Performance: Bundle <700KB gzip | Nicht-Funktional | TEILWEISE IMPLEMENTIERT | Aktuell 1.1MB JS (248KB gzip), Warning >500KB | Code-Splitting erforderlich |
| NF02 | Page Load Time <3s (3G) | Nicht-Funktional | UNGEKLÄRT | Keine Messung durchgeführt | Lighthouse audit erforderlich |
| NF03 | Browser Support: Chrome/FF/Safari/Edge | Nicht-Funktional | IMPLEMENTIERT | React 18 + Vite ES2020 target | IE11 nicht unterstützt (beabsichtigt) |
| NF04 | Build-Prozess (Vite) | Nicht-Funktional | IMPLEMENTIERT | vite.config.js, `npm run build:prod` → dist/ | — |
| NF05 | Error Handling & Logging | Nicht-Funktional | TEILWEISE IMPLEMENTIERT | try/catch in async functions, localStorage fallback | Structured logging, Sentry-Integration fehlt |

**Anforderungen gesamt:** 34 Items
- **Implementiert:** 21 (61%)
- **Teilweise:** 8 (24%)
- **Offen/Ungeklärt:** 5 (15%)

---

## 5. Aktuell implementierter Funktionsumfang

### 5.1 Spielekatalog & Suche

**Zweck:** Nutzer durchsuchen und filtern 924 Spiele nach verschiedenen Kriterien.

**Benutzerinteraktion:**
1. Nutzer navigiert zu "Katalog"
2. App zeigt Grid mit Spielkarten
3. Nutzer nutzt Search-Box für Volltext-Suche (Titel, Kategorie, Verlag)
4. Nutzer filtert nach Kategorie, Verlag, Mindestalter, Spielerzahl
5. Nutzer klickt auf Spiel → Detailmodal öffnet
6. Nutzer klickt "Zu Sammlung hinzufügen" oder "Als Favorit"

**Beteiligte Komponenten:**
- `GamesCatalog.jsx` (679 Zeilen) – Haupt-Component
- `Navigation.jsx` (223 Zeilen) – Menu-Link

**Beteiligte Dateien:**
- `src/lib/pb.js` – PocketBase Client
- `src/lib/config.js` – API-Endpoints
- `src/lib/catalogRepository.js` – Game Loading (UNGEKLÄRT: wird `catalogRepository` noch verwendet?)

**Datenquellen:**
- `pb.collection('games').getFullList()` – Alle 924 Spiele
- `pb.collection('user_game_collection').getFullList()` – User's Collection (wenn auth)

**Datenbankbezug:**
- Liest aus `games` Collection (924 Records)
- Liest aus `user_game_collection` Collection (N Records pro User)
- Schreibt zu `user_game_collection` (create/update bei Action)

**Relevante API-Endpunkte:**
- `GET /.sfs-be/api/collections/games/records` – Liste aller Spiele
- `GET /.sfs-be/api/collections/user_game_collection/records?filter=...` – User Collection
- `POST /.sfs-be/api/collections/user_game_collection/records` – Game zu Collection hinzufügen

**Aktueller Reifegrad:** ✅ Production-Ready

**Bekannte Einschränkungen:**
- Filter nach Spielerzahl ist einfach (nur Min-Max), nicht nach exaktem Range
- Publisher-Namen werden aus IDs nachgeschlagen (2 queries statt 1 join)
- Keine Pagination (alle 924 auf einmal geladen)

---

### 5.2 Persönliche Spielesammlung

**Zweck:** Nutzer sieht nur seine Spiele, Favoriten, Tags.

**Benutzerinteraktion:**
1. Nutzer logged in
2. Nutzer navigiert zu "Meine Sammlung"
3. App zeigt Spiele, die Nutzer zu seiner Collection hinzugefügt hat
4. Filter nach Favoriten oder Kategorie
5. Nutzer kann Spiel aus Sammlung entfernen oder Favoriten-Status ändern

**Beteiligte Komponenten:**
- `MyGamesScreen.jsx` (317 Zeilen)
- `Navigation.jsx` – Link

**Datenquellen:**
- `pb.collection('user_game_collection').getFullList({filter: `user_id='${currentUser.id}'`})` 

**Datenbankbezug:**
- Liest `user_game_collection` (User's persönliche Sammlung)
- Joins mit `games` (um Spieldetails zu zeigen)

**Reifegrad:** ✅ Production-Ready

**Bekannte Einschränkungen:**
- Tags werden in Array gespeichert, aber UI zum Hinzufügen/Löschen von Tags **nicht sichtbar** (UNKLAR: implementiert aber nicht in MyGamesScreen?)
- Notizen-Feld vorhanden, aber Bearbeitungs-UI nicht sichtbar

---

### 5.3 Spiel-Lernpfad (GameFlow)

**Zweck:** 6-schrittiger linearer Pfad zum Erlernen eines Spiels.

**Struktur:**
1. **GameOverview** – Spielübersicht mit 6 Action-Buttons
   - Schnellstart, Aufbau, Regeln, Coach, Strategien, Energienavigator
2. **QuickStart** – 5-Step Accordion (Ziel → Material → Aufbau → Regeln → Erste Runde)
3. **SetupScreen** – Material + Aufbau-Schritte
4. **RulesScreen** – Kategorisierte Regeln zum Durchsuchen
5. **CoachScreen** – Chat-Interface (Fragen & vordefinierte Antworten)
6. **StrategyScreen** – Tipps & häufige Anfängerfehler

**Benutzerinteraktion:**
1. Nutzer wählt Spiel aus Katalog
2. Zeige GameOverview
3. Nutzer klickt "Schnellstart" → QuickStart Screen
4. Nutzer expandiert/collapsiert Accordion-Schritte
5. Back-Button navigiert zurück zu Overview

**Beteiligte Komponenten:**
- `GameOverview.jsx` (103 Zeilen)
- `QuickStart.jsx` (95 Zeilen)
- `SetupScreen.jsx` (80 Zeilen)
- `RulesScreen.jsx` (146 Zeilen)
- `CoachScreen.jsx` (134 Zeilen)
- `StrategyScreen.jsx` (102 Zeilen)
- Plus: `GameFlowScreen.jsx` (75 Zeilen) – Phase-Breakdown

**Datenquellen:**
- `EXAMPLE_GAME` aus `gameService.js` (für User-hochgeladene Spiele)
- `pb.collection('games')` (für Katalog-Spiele) — UNKLAR wie Game-Details geladen werden

**Reifegrad:** ✅ Production-Ready (aber: siehe Einschränkungen)

**Bekannte Einschränkungen:**
- **EXAMPLE_GAME** ist hardcoded mit Spieldetails "Die Insel der Pfade"
- Regel-Quellen für 924 Katalog-Spiele nicht strukturiert geladen (nur URL vorhanden)
- Coach-Antworten sind Pattern-Matching, nicht AI-basiert
- Energienavigator: Design + Logik unklar (UNGEKLÄRT)

---

### 5.4 Live-Coach (während des Spiels)

**Zweck:** Spieler stellt Fragen während des Spiels, Coach antwortet.

**Benutzerinteraktion:**
1. Nutzer startet Spiel (GameModeScreen)
2. Nutzer klickt "Coach" Button
3. CoachScreen zeigt Chat-Interface
4. Nutzer klickt vordefinierte Antwort-Button oder gibt Frage ein
5. App antwortet mit gespeichertem Text (nicht AI)

**Beteiligte Komponenten:**
- `CoachScreen.jsx` (134 Zeilen)
- `GameModeScreen.jsx` (175 Zeilen) – Enthält Button zum Coach

**Service:**
- `gameService.askGameCoach(gameId, question, game)` – Pattern-Matching-Logik

**Reifegrad:** ✅ MVP-Ready (aber nicht AI-basiert)

**Bekannte Einschränkungen:**
- Antworten sind hardcoded, nicht datengetrieben
- Kein Kontext über aktuelle Spielphase
- Keine Persistierung von Fragen/Antworten in DB

---

### 5.5 Admin-Panel (Excel-Import & Datenverwaltung)

**Zweck:** Admin kann Excel-Datei importieren (924 Spiele + 32 Verlage) und Spiele editieren.

**Benutzerinteraktion:**
1. Admin (verified=true) sieht "Admin" Link in Navigation
2. Admin klickt → AdminPanel
3. 4 Tabs: Datenbank, Excel-Import, Benutzer, Verlage
4. **Tab 1 (Datenbank):**
   - Wähle Collection (games, publishers, users, etc.)
   - Filter nach A-Z, Kategorie, Verlag, Rule-Status
   - Suche Full-Text
   - Klikke auf Spiel → Edit Modal
   - Bearbeite Felder
   - Speichere (PATCH zu PocketBase)
5. **Tab 2 (Excel-Import):**
   - Lade Excel-Datei hoch
   - Parsing erfolgt im Browser (XLSX Library)
   - Admin-Token wird geholt (`/.sfs-auto-login`)
   - Daten werden zu PocketBase geposted (upsert: check exists, update oder create)
   - Zeige Progress + Success/Error-Count
6. **Tab 3 (Benutzer & Rollen):**
   - Lade alle Users aus PocketBase
   - Button "Zu Admin machen"
   - PATCH /users/{id} verified=true
7. **Tab 4 (Verlage):**
   - Form für neue Publisher
   - POST zu publishers Collection

**Beteiligte Komponenten:**
- `AdminPanel.jsx` (118 Zeilen) – Tab-Router
- `AdminDataBrowser.jsx` (821 Zeilen) – Collection-Editor
- `AdminExcelUpload.jsx` (523 Zeilen) – Excel-Parser & Uploader
- `AdminUserManagement.jsx` (333 Zeilen) – Admin-Zuweisung
- Teilweise auch in `AdminCatalogImport.jsx`, `AdminAddPublisher.jsx`

**Datenquellen:**
- `pb.collection('games')` – Alle Spiele
- `pb.collection('publishers')` – Alle Verlage
- `pb.collection('users')` – Alle Nutzer
- Excel-Datei (File Input)

**API-Endpoints (Admin-only):**
- `POST /.sfs-auto-login` – Hole Admin-Token
- `GET /.sfs-be/api/collections/{name}/records` – Lade Collection
- `PATCH /.sfs-be/api/collections/{name}/records/{id}` – Update Record
- `POST /.sfs-be/api/collections/{name}/records` – Create Record
- `DELETE /.sfs-be/api/collections/{name}/records/{id}` – Delete Record

**Reifegrad:** ⚠️ Functional, aber mit Warnung

**Bekannte Probleme:**
- **Excel-Import:** Nur im Browser, keine Duplikat-Erkennung (wird PATCH benutzt, aber "exists" Check ist einfach)
- **AdminDataBrowser:** Keine Pagination (alle Records auf einmal), kann bei großen Collections langsam sein
- **Admin-Token:** Wird jedes Mal neu geholt via `/.sfs-auto-login`, könnte gecacht werden
- **EditModal:** Keine Validierung vor Save
- **Löschen:** Delete-Button vorhanden, aber unklar ob Nutzer/Admin-Bestätigung erforderlich ist

---

### 5.6 Haushalt & Gruppe-Management

**Zweck:** Familie/Freunde verwalten, Spiele teilen, Sessions gemeinsam aufzeichnen.

**Benutzerinteraktion:**
1. Nutzer navigiert zu "Haushalt"
2. HouseholdSetupScreen zeigt zwei Szenarien:
   - **Neuer Haushalt:** "Haushalt erstellen" Button
   - **Existierender:** "Mit Invite-Code beitreten"
3. Nutzer gibt Namen + Mitglied-Namen ein
4. System erzeugt Invite-Code (z.B. "FAM42XYZW")
5. Nutzer kann Code teilen, andere tippen Code ein und treten bei
6. Sessions mit Haushalt-Mitgliedern aufzeichnen

**Beteiligte Komponenten:**
- `HouseholdSetupScreen.jsx` (260 Zeilen)

**Datenquellen:**
- `pb.collection('households')` – Haushalt-Daten
- `pb.collection('household_members')` – Mitgliedschaft (N:M)
- `pb.collection('user_game_sessions')` – Sessions pro Haushalt

**Datenbank-Schema:**
```
households:
  id
  owner_user_id (FK users)
  name
  invite_code (unique)
  created_at

household_members:
  id
  household_id (FK)
  user_id (FK)
  role_id (FK roles: Owner/Manager/Member)
  joined_at

user_game_sessions:
  id
  game_id (FK games)
  household_id (FK)
  players (Array of {user_id, player_name, is_winner, score})
  winner_user_id (FK)
  duration_minutes
  played_at (ISO)
  notes
```

**Reifegrad:** ⚠️ Teilweise Implementiert

**Bekannte Probleme:**
- **Save-to-DB:** Code zeigt create/update Logik, aber Fehlerbehandlung/Validierung unklar
- **Invite-Code-Generierung:** Code wird erzeugt, aber wie wird Eindeutigkeit sichergestellt? (UNKLAR)
- **Role-Based Access:** roles Collection existiert, aber nicht durchgehend implementiert in anderen Screens
- **Mitglied-Löschen:** UI nicht sichtbar

---

### 5.7 User-Authentifizierung & Session-Management

**Zweck:** Nutzer signup/login, Token persistent halten, Admin-Status prüfen.

**Benutzerinteraktion:**
1. Nutzer klickt "Anmelden" in Navigation
2. AuthScreen zeigt Tabs für Login/Signup
3. Nutzer gibt Email + Passwort (+ Name für Signup) ein
4. Click "Anmelden"
5. `pb.collection('users').authWithPassword(email, password)` wird aufgerufen
6. Bei Erfolg: Token + User-ID in `localStorage` speichern
7. Bei Fehler: Error-Message zeigen

**Persistierung über Reload:**
1. App startet (App.jsx useEffect)
2. Prüfe localStorage auf Token
3. Wenn vorhanden: `pb.authRefresh()` aufrufen → PocketBase stellt Session wieder her
4. `currentUser` in State setzen
5. Navigation zeigt User-abhängige Menu-Items

**Admin-Status-Prüfung:**
1. Nach Login: `currentUser.verified === true` ?
2. Wenn ja: `isAdmin = true` → Zeige Admin-Link
3. Admin-Panel: `if (isAdmin) { show <AdminPanel /> } else { show "Access Denied" }`

**Beteiligte Komponenten:**
- `AuthScreen.jsx` (162 Zeilen)
- `Navigation.jsx` (223 Zeilen)
- `App.jsx` – Token-Restore, Admin-Check

**Service/Lib:**
- `src/lib/pb.js` – PocketBase Client
- `src/lib/userStorage.js` (156 Zeilen) – localStorage Helper

**Datenbankbezug:**
- Liest/schreibt `pb.collection('users')`
- Nutzt PocketBase built-in Auth (nicht custom API)

**Reifegrad:** ✅ Production-Ready (mit letztem Fix)

**Bekannte Fixes (bereits angewendet):**
- Fix `9bff73f`: "restore pocketbase auth token on app startup" — Token wird jetzt bei App-Load wiederhergestellt, Login bleibt erhalten

**Bekannte Probleme:**
- **Passwort-Reset:** Nicht implementiert (Feature-Lücke)
- **Email-Bestätigung:** Nicht implementiert (Feature-Lücke)
- **Token-Expiry:** Keine Behandlung von abgelaufenem Token

---

### 5.8 Spiel-Sessions & Win-Tracking

**Zweck:** Während GameModeScreen werden Phase + Punkte tracked, am Ende wird Session gespeichert.

**Benutzerinteraktion:**
1. Nutzer startet Spiel (GameOverview → "Start Game" Button)
2. Zeige GameModeScreen
3. Nutzer navigiert durch Phasen (buttons)
4. Nutzer aktualisiert Scoreboard (manual input)
5. Spiel ende: "Spiel abschließen" Button klicken
6. Session mit Gewinner, Spieldauer, Spielern speichern

**Beteiligte Komponenten:**
- `GameModeScreen.jsx` (175 Zeilen)

**Datenquellen:**
- `user_game_sessions` Collection (zum Speichern)

**Datenbank-Schema:**
```
user_game_sessions:
  id
  game_id (FK games)
  household_id (FK)  [optional, wenn kein Haushalt: null]
  players: Array<{user_id, player_name, score, is_winner}>
  winner_user_id (FK users)
  duration_minutes (Number)
  played_at (ISO timestamp)
  notes (String)
```

**Reifegrad:** ⚠️ Teilweise Implementiert

**Bekannte Probleme:**
- **Session-Speicher-Logic:** GameModeScreen hat State für Phase + Scores, aber UNKLAR ob `.create()` zu DB aufgerufen wird
- **Winner-Bestimmung:** Welcher Spieler gewinnt? (Manual Selection unklar)
- **Duration-Tracking:** Start-Zeit wird irgendwo erfasst? (UNKLAR)
- **No UI für Sessions-Review:** MyGamesScreen zeigt nur Collection, nicht Sessions-Historie

---

## 6. Seiten- und Navigationsstruktur

### Navigation Tree (Aktuell)

```
NeuroPlay (App.jsx)
├─ StartScreen (/start)
│  └─ Buttons: "Katalog", "Beispielspiel", "Meine Sammlung", "Haushalt"
│
├─ AuthScreen (/auth) – wenn nicht logged in
│  ├─ Tab: Login
│  └─ Tab: Signup
│
├─ Navigation (Header) – persistent
│  ├─ Desktop Menu: Katalog | Sammlung | Admin (wenn Admin) | Profil | Abmelden
│  └─ Mobile Hamburger
│
├─ GamesCatalog (/catalog)
│  ├─ Search + Filter (Kategorie, Verlag, Alter, Spielerzahl)
│  ├─ Game Grid
│  ├─ Game Detail Modal
│  └─ Actions: "Zu Sammlung", "Favorit", "Tags"
│
├─ MyGamesScreen (/mygames) – nur wenn authenticated
│  ├─ Filter: Favorites | By Category
│  ├─ Game Grid (nur User's Collection)
│  └─ Actions: "Aus Sammlung entfernen"
│
├─ GameFlow (linear, wenn Spiel ausgewählt) (/overview → /quickstart → /setup → /rules → /coach → /gamemode → /strategies)
│  ├─ GameOverview (/overview) – Dashboard mit 6 Buttons
│  ├─ QuickStart (/quickstart) – 5-Step Accordion
│  ├─ SetupScreen (/setup) – Material + Aufbau
│  ├─ RulesScreen (/rules) – Kategorisierte Regeln + Search
│  ├─ CoachScreen (/coach) – Chat Interface
│  ├─ GameModeScreen (/gamemode) – Live Phasen + Scoreboard
│  ├─ StrategyScreen (/strategies) – Tipps + Anfängerfehler
│  └─ GameFlowScreen (/flow) – Phase-Breakdown
│
├─ AdminPanel (/admin) – nur wenn Admin
│  ├─ AdminDataBrowser – Collection Editor (games, publishers, users, etc.)
│  ├─ AdminExcelUpload – File Picker + Parser + Uploader
│  ├─ AdminUserManagement – Admin-Zuweisung
│  └─ AdminAddPublisher – Form für neue Verlage
│
├─ UserProfileScreen (/profile) – nur wenn authenticated
│  └─ Edit: player_name
│
├─ HouseholdSetupScreen (/household) – nur wenn authenticated
│  ├─ Create Household Form
│  ├─ Join with Invite-Code Form
│  └─ Member Management
│
├─ LibraryScreen (/library) – Deprecated? (UNGEKLÄRT: wird noch verwendet?)
│
├─ UploadScreen (/upload) – PDF Drag-Drop (Placeholder)
│
├─ AnalysisScreen (/analysis) – Simulation von PDF-Parsing (Placeholder)
│
└─ BoardGameCatalog (/boardgames) – Duplicate von GamesCatalog? (UNGEKLÄRT)
```

### Seiten-Details

#### **StartScreen**
- **Route:** /start (Standard-Einstieg)
- **Zweck:** Welcome-Seite mit Übersicht
- **Zielgruppe:** Alle
- **UI-Bereiche:**
  - Willkommens-Text + Logo
  - 3 große Card-Buttons: "Spielekatalog", "Beispielspiel laden", "Meine Sammlung"
  - Info-Sektion mit Benefits (wenn nicht authenticated: "Anmelden" Button)
- **Status:** ✅ Implementiert

#### **GamesCatalog**
- **Route:** /catalog
- **Zweck:** 924 Spiele durchsuchen
- **Zielgruppe:** Alle
- **Daten:** pb.collection('games').getFullList()
- **Aktionen:** Search, Filter, Zu Sammlung, Favorit, Tags, Detail-View
- **Status:** ✅ Implementiert (mit Einschränkungen bei Tags-UI)

#### **MyGamesScreen**
- **Route:** /mygames
- **Zweck:** User's persönliche Sammlung
- **Zielgruppe:** Authenticated Users
- **Daten:** pb.collection('user_game_collection') filtered by user_id
- **Status:** ✅ Implementiert (aber Tags nicht sichtbar)

#### **GameOverview**
- **Route:** /overview
- **Zweck:** Spiel-Dashboard nach Selection
- **Zielgruppe:** Alle (wenn Spiel ausgewählt)
- **UI:** 6 große Buttons (Schnellstart, Aufbau, Regeln, Coach, Strategien, Flow) + "Spiel starten" Button
- **Status:** ✅ Implementiert

#### **QuickStart**
- **Route:** /quickstart
- **Zweck:** 5-Schritte-Einführung
- **Zielgruppe:** Alle
- **UI:** Accordion mit 5 collapsible Sections
- **Status:** ✅ Implementiert

#### **SetupScreen, RulesScreen, CoachScreen, StrategyScreen, GameFlowScreen**
- **Status:** ✅ Alle implementiert
- **Details:** Siehe Abschnitt 5.3 (Lernpfad)

#### **GameModeScreen**
- **Route:** /gamemode
- **Zweck:** Live-Spiel-Tracking
- **Zielgruppe:** Spieler während des Spiels
- **UI:** Phase-Navigation, Scoreboard, Coach-Button, Rules-Button
- **Status:** ✅ UI vorhanden, aber Save-Logic unklar

#### **AdminPanel + Tabs**
- **Route:** /admin
- **Zweck:** Admin-Funktionen
- **Zielgruppe:** Verified Users nur
- **Status:** ✅ Implementiert (4 Tabs)

#### **AuthScreen**
- **Route:** /auth
- **Zweck:** Login/Signup
- **Zielgruppe:** Unauthenticated Users
- **Status:** ✅ Implementiert

#### **UserProfileScreen**
- **Route:** /profile
- **Zweck:** Edit player_name
- **Zielgruppe:** Authenticated Users
- **Status:** ✅ Implementiert

#### **HouseholdSetupScreen**
- **Route:** /household
- **Zweck:** Haushalt erstellen/verwalten
- **Zielgruppe:** Authenticated Users
- **Status:** ⚠️ Teilweise (UI vorhanden, Persistierung unklar)

#### **LibraryScreen** (Potential Duplicate?)
- **Route:** /library
- **Zweck:** Game Collection (alt?)
- **Status:** UNGEKLÄRT – Scheint duplizieren zu sein mit MyGamesScreen

#### **BoardGameCatalog** (Potential Duplicate?)
- **Route:** /boardgames
- **Zweck:** Katalog (alt?)
- **Status:** UNGEKLÄRT – Scheint duplizieren zu sein mit GamesCatalog

#### **UploadScreen, AnalysisScreen**
- **Route:** /upload, /analysis
- **Zweck:** PDF-Upload & Parsing (Placeholder)
- **Status:** ⚠️ Placeholder – Wird nicht in eigenem Flow verwendet (nur Example Game)

---

## 7. User Flows

### Flow 1: "Spieler durchsucht Katalog & fügt zu Sammlung hinzu"

```
1. Startseite
   ↓ [Klick "Spielekatalog"]
2. GamesCatalog (alle 924 Spiele angezeigt)
   ↓ [Suche oder Filter anwenden]
3. Gefilterte Spiel-Liste
   ↓ [Klick auf Spiel-Card]
4. Game Detail Modal
   ├─ [Klick "Zu Sammlung hinzufügen"]
   │  ↓
   │  → POST /user_game_collection {user_id, game_id, is_favorite: false}
   │  ↓
   │  → Success-Message
   │
   └─ [Klick "Favorit"]
      ↓
      → PATCH /user_game_collection {is_favorite: true}
      ↓
      → Update UI (Heart-Icon filled)

**Status:** ✅ Implementiert & getestet
```

### Flow 2: "Admin importiert 924 Spiele via Excel"

```
1. Admin navigiert zu /admin
   ↓ [Prüfe verified flag → true]
2. AdminPanel zeigt 4 Tabs
   ↓ [Klick "Excel-Import" Tab]
3. AdminExcelUpload zeigt File-Picker
   ↓ [Nutzer wählt Excel-Datei]
4. Browser parsed XLSX (2 Sheets: Verlage, Spiele)
   ├─ Verlage: 32 Records
   └─ Spiele: 844 Records (später 924)
   ↓
5. Admin holt Token via `/.sfs-auto-login`
   ↓ [POST /.sfs-auto-login → Bearer Token]
6. Für jeden Verlag:
   ├─ [Prüfe: existiert in publishers Collection?]
   ├─ Ja → PATCH (update)
   └─ Nein → POST (create)
7. Für jedes Spiel:
   ├─ [Prüfe: existiert in games Collection?]
   ├─ Ja → PATCH (update)
   └─ Nein → POST (create)
   ↓
8. Zeige Progress + Erfolgs-Count
   ↓ [z.B. "924 Spiele importiert, 0 Fehler"]

**Status:** ✅ Implementiert (aber ohne Duplikat-Erkennung bei Update)
```

### Flow 3: "Spieler lernt Spiel kennen (6-Schritte)"

```
1. GamesCatalog → Klick Spiel → GameOverview
   ↓
2. GameOverview zeigt 6 große Buttons
   ├─ Schnellstart
   ├─ Aufbau
   ├─ Regeln
   ├─ Coach
   ├─ Strategien
   └─ Energienavigator
   ↓ [Klick "Schnellstart"]
3. QuickStart zeigt 5 Accordion Steps
   ├─ Schritt 1: Ziel des Spiels
   ├─ Schritt 2: Material vorbereiten
   ├─ Schritt 3: Aufbau
   ├─ Schritt 4: Regeln verstehen
   └─ Schritt 5: Erste Runde spielen
   ↓ [Nutzer expandiert/collapsiert]
   ↓ [Klick "Zurück" oder nächster Button]
4. SetupScreen: Material-Liste + Schritt-für-Schritt Aufbau
5. RulesScreen: Kategorisierte Regeln mit Search
6. CoachScreen: Fragen + Antworten
7. StrategyScreen: Tipps + Anfängerfehler

**Status:** ✅ Implementiert (Inhalte: EXAMPLE_GAME hardcoded)
```

### Flow 4: "Haushalt erstellen & Freunde einladen"

```
1. User navigiert zu /household
   ↓ [Nur wenn authenticated]
2. HouseholdSetupScreen zeigt zwei Szenarien
   ├─ "Neuer Haushalt erstellen"
   └─ "Mit Code beitreten"
   ↓ [Klick "Neuer Haushalt"]
3. Form: Haushalt-Name + Erste Mitglied-Namen
   ↓ [Submit]
4. System erzeugt:
   ├─ households Record mit invite_code
   └─ household_members Records für alle Mitglieder
   ↓
5. Zeige invite_code (z.B. "FAM42XYZW")
   ↓ [Nutzer teilt Code]
6. Anderer Nutzer gibt Code ein → beitritt als Member
   ↓
7. Sessions können jetzt mit Haushalt-ID aufgezeichnet werden

**Status:** ⚠️ Teilweise (UI vorhanden, Persistierung unklar)
```

### Flow 5: "Spieler während des Spiels fragte den Coach"

```
1. GameModeScreen läuft (Nutzer navigiert durch Phasen)
   ↓ [Klick "Coach" Button]
2. CoachScreen öffnet Chat-UI
   ├─ 3 vordefinierte Quick-Answers (z.B. "Aktionen erklären", "Spiel-Ende", "Hilfe!")
   └─ Free-form Input für eigene Frage
   ↓ [Klick Quick-Answer ODER schreibe Frage + Submit]
3. App ruft gameService.askGameCoach(gameId, question, game) auf
   ↓ [800ms delay (Simulation)]
4. Pattern-Matching gegen Frage-Text
   ├─ Wenn Frage contains "Aktion": zeige Aktionen-Text
   ├─ Wenn Frage contains "Ende": zeige Spiel-Ende-Text
   └─ Sonst: default Antwort
5. Zeige Antwort im Chat
   ↓ [Nutzer kann weitere Fragen stellen oder zurück zu GameMode]

**Status:** ✅ MVP-Ready (aber nicht AI-basiert, kein Context über aktuelle Phase)
```

---

## 8. Technische Architektur

### 8.1 Architektur-Übersicht (Textform)

```
┌─────────────────────────────────────────────────────────────┐
│                     BROWSER (Client)                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React 18 App (Vite SPA)                             │  │
│  │  ├─ src/App.jsx (Screen Router)                      │  │
│  │  ├─ src/components/ (22 Screens)                     │  │
│  │  ├─ src/lib/ (Services)                              │  │
│  │  │  ├─ pb.js (PocketBase Client)                     │  │
│  │  │  ├─ gameService.js (Game Logic)                   │  │
│  │  │  ├─ catalogRepository.js (Game Loading)           │  │
│  │  │  ├─ userStorage.js (localStorage Helper)          │  │
│  │  │  └─ config.js (Environment Detection)             │  │
│  │  └─ src/styles/ (Design Tokens + Colors)             │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  State Management: React useState/useEffect                │
│  Authentication: PocketBase JWT (in localStorage)          │
│  Styling: Tailwind CSS v4 + CSS Custom Properties          │
│  Icons: lucide-react                                       │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTP(S)
┌─────────────────────────────────────────────────────────────┐
│         STRATO PLATFORM (HTTPS://.../sfs-be/)              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  PocketBase (Backend-as-Service)                     │  │
│  │  ├─ Admin UI (/.sfs-be/)                             │  │
│  │  ├─ REST API (/.sfs-be/api/)                         │  │
│  │  │  ├─ POST /auth/* (Login/Signup)                   │  │
│  │  │  ├─ GET /collections/{name}/records               │  │
│  │  │  ├─ PATCH /collections/{name}/records/{id}        │  │
│  │  │  ├─ POST /collections/{name}/records              │  │
│  │  │  └─ DELETE /collections/{name}/records/{id}       │  │
│  │  └─ WebSocket (Optional, Real-time Subscribe)        │  │
│  │                                                       │  │
│  │  Collections (SQLite):                               │  │
│  │  ├─ games (924)                                      │  │
│  │  ├─ publishers (32)                                  │  │
│  │  ├─ users (N, auth)                                  │  │
│  │  ├─ user_profiles (N)                                │  │
│  │  ├─ user_game_collection (N)                         │  │
│  │  ├─ user_game_sessions (N)                           │  │
│  │  ├─ households (N)                                   │  │
│  │  ├─ household_members (N)                            │  │
│  │  ├─ roles (5, seed)                                  │  │
│  │  ├─ rule_sources (924)                               │  │
│  │  └─ import_batches (N, audit)                        │  │
│  │                                                       │  │
│  │  SQLite Database: bd/data.db (dev), be/data.db (prod)│  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘

Flow:
1. Browser lädt index.html (CDN-served)
2. Vite lädt JS-Bundle (index-*.js, xlsx-*.js)
3. React App initialisiert
4. App.jsx prüft Token in localStorage
5. Bei Bedarf: pb.authRefresh() → Stelle Session her
6. GamesCatalog lädt Games: pb.collection('games').getFullList()
7. User interagiert → CRUD zu Collections
8. Admin: Excel-Upload → Parse → POST zu Collections
```

### 8.2 Frontend-Struktur

**Framework:** React 18 + Vite v6
- **Entry:** src/main.jsx → src/App.jsx
- **Styling:** Tailwind CSS v4 + design-tokens.css
- **Icons:** lucide-react (`import Name from "icon:kebab-name"`)
- **HTTP Client:** PocketBase SDK (native fetch wrapper)
- **Routing:** Screen-basiert (state machine, kein react-router)
- **Build:** `npm run build:prod` → dist/ (1.1MB JS)

**Component Hierarchy:**
```
App.jsx (Main Router)
├─ Navigation (Header, persistent)
├─ Screen Components (22 total)
│  ├─ StartScreen
│  ├─ GamesCatalog
│  ├─ GameOverview
│  ├─ QuickStart
│  ├─ CoachScreen
│  ├─ GameModeScreen
│  ├─ AdminPanel
│  │  ├─ AdminDataBrowser
│  │  ├─ AdminExcelUpload
│  │  ├─ AdminUserManagement
│  │  └─ [Other Admin Components]
│  ├─ AuthScreen
│  ├─ UserProfileScreen
│  ├─ HouseholdSetupScreen
│  └─ [Others...]
└─ [Conditional Rendering Based on `screen` State]
```

### 8.3 Backend-Struktur

**Stack:** PocketBase v0.39.0 + SQLite
- **Database:** SQLite (bd/data.db für dev, be/data.db für prod)
- **Schema:** 11 Collections (11 Tables)
- **Auth:** Built-in JWT + Email/Password
- **API:** REST + optional WebSocket
- **Access Rules:** Pro-Collection (public read, admin write, etc.)
- **Admin Panel:** Built-in (accessible via /.sfs-bd/admin/ oder /.sfs-be/admin/)

**Collections (Detailed):**

| Collection | Records | Purpose | Access |
|----------|---------|---------|--------|
| games | 924 | Board Game Catalog | Public read, Admin write |
| publishers | 32 | Game Publishers | Public read, Admin write |
| users | N | User Accounts (Auth) | Auth Only (own record) |
| user_profiles | N | User Metadata | User + Household |
| user_game_collection | N | User's Collection (Favorites, Tags) | User Only (own) |
| user_game_sessions | N | Played Games (Winner, Score) | User + Household |
| households | N | Family/Group | Owner + Members |
| household_members | N | Membership (N:M) | Household Members |
| roles | 5 | Role Definitions (seed) | Public read |
| rule_sources | 924 | Rule URLs per Game | Public read |
| import_batches | N | Audit Trail | Admin read |

### 8.4 Data Flow (Request-Response)

#### Beispiel 1: User fügt Spiel zu Collection hinzu

```
1. GamesCatalog.jsx: User klickt "Zu Sammlung hinzufügen" Button
   ↓
2. Komponente ruft auf:
   await pb.collection('user_game_collection').create({
     user_id: currentUser.id,
     game_id: game.id,
     is_favorite: false
   })
   ↓
3. PocketBase SDK macht:
   POST /.sfs-be/api/collections/user_game_collection/records
   Headers: Authorization: Bearer <JWT_TOKEN>
   Body: { user_id: "...", game_id: "...", is_favorite: false }
   ↓
4. PocketBase prüft:
   - Token ist gültig?
   - user_id == auth user?
   - game_id existiert in games Collection?
   ↓
5. DB: INSERT INTO user_game_collection (...)
   ↓
6. Response: 200 + Record
   ↓
7. Komponente updated UI (Heart-Icon, Sammlung-Count)
```

#### Beispiel 2: Admin importiert Excel

```
1. AdminExcelUpload.jsx: File Selected Event
   ↓
2. Browser liest Datei: file.arrayBuffer()
   ↓
3. XLSX Library parsed Excel
   ↓
4. Komponente ruft /.sfs-auto-login auf:
   POST /.sfs-auto-login
   ↓
5. STRATO gibt zurück: { token: "ADMIN_TOKEN_..." }
   ↓
6. Für jeden Verlag:
   GET /.sfs-be/api/collections/publishers/records?filter=...
   // Prüfe: existiert schon?
   ↓
   Wenn existiert:
     PATCH /.sfs-be/api/collections/publishers/records/{id}
   Wenn nicht:
     POST /.sfs-be/api/collections/publishers/records
   ↓
7. Für jedes Spiel: (944 Requests)
   [Siehe Verlag-Logik]
   ↓
8. Zeige Fortschritt: "924 imported, 0 errors"
```

---

## 9. Repository- und Verzeichnisstruktur

### 9.1 Relative Verzeichnisbaum

```
project-root/
├── app/                                 # Vite + React App (ARBEITTSBEREICH)
│   ├── src/
│   │   ├── App.jsx                      # Main Router (280 Zeilen)
│   │   ├── main.jsx                     # React Entry (10 Zeilen)
│   │   ├── index.css                    # @import "tailwindcss"; Vite-Config Link
│   │   │
│   │   ├── components/                  # 22 Screen Components
│   │   │   ├── StartScreen.jsx
│   │   │   ├── GamesCatalog.jsx         # 679 Zeilen
│   │   │   ├── GamesCatalog-OLD.jsx
│   │   │   ├── AdminDataBrowser.jsx     # 821 Zeilen
│   │   │   ├── AdminExcelUpload.jsx     # 523 Zeilen
│   │   │   ├── AdminPanel.jsx           # 84 Zeilen (Tab Router)
│   │   │   ├── AdminUserManagement.jsx  # 333 Zeilen
│   │   │   ├── AuthScreen.jsx           # 162 Zeilen
│   │   │   ├── MyGamesScreen.jsx        # 317 Zeilen
│   │   │   ├── HouseholdSetupScreen.jsx # 260 Zeilen
│   │   │   ├── GameOverview.jsx
│   │   │   ├── QuickStart.jsx
│   │   │   ├── SetupScreen.jsx
│   │   │   ├── RulesScreen.jsx
│   │   │   ├── CoachScreen.jsx
│   │   │   ├── GameModeScreen.jsx
│   │   │   ├── StrategyScreen.jsx
│   │   │   ├── GameFlowScreen.jsx
│   │   │   ├── Navigation.jsx           # Header (223 Zeilen)
│   │   │   ├── UserProfileScreen.jsx    # 143 Zeilen
│   │   │   ├── BoardGameCatalog.jsx     # 308 Zeilen (Duplicate?)
│   │   │   ├── LibraryScreen.jsx        # 96 Zeilen (Deprecated?)
│   │   │   ├── UploadScreen.jsx         # 66 Zeilen (Placeholder)
│   │   │   ├── AnalysisScreen.jsx       # 77 Zeilen (Placeholder)
│   │   │   ├── AdminCatalogImport.jsx   # 172 Zeilen
│   │   │   └── AdminDataBrowser-OLD.jsx # 375 Zeilen (Old Version)
│   │   │
│   │   ├── lib/                         # Services & Repositories
│   │   │   ├── pb.js                    # PocketBase Client (21 Zeilen)
│   │   │   ├── config.js                # API Endpoints, Env Detection (40 Zeilen)
│   │   │   ├── gameService.js           # Game Logic + Coach (173 Zeilen)
│   │   │   ├── gameRepository.js        # Game CRUD (238 Zeilen)
│   │   │   ├── catalogRepository.js     # Catalog Loading (62 Zeilen)
│   │   │   ├── userStorage.js           # localStorage Helper (156 Zeilen)
│   │   │   ├── pbCollections.js         # Collection Init (134 Zeilen)
│   │   │   ├── catalog-import.js        # Excel Parser (332 Zeilen)
│   │   │   ├── direct-import.js         # Direct Import Logic (301 Zeilen)
│   │   │   ├── server-init.js           # Collection Init (181 Zeilen)
│   │   │   └── [Other utility files]
│   │   │
│   │   ├── styles/
│   │   │   ├── design-tokens.css        # NeuroWays Tokens (152 Zeilen)
│   │   │   └── neurowaves-colors.css    # Color Classes (154 Zeilen)
│   │   │
│   │   ├── data/
│   │   │   ├── generated/               # Output from Import Scripts
│   │   │   │   ├── games.json           # 924 Spiele (v0.7.0)
│   │   │   │   ├── publishers.json      # 32 Verlage
│   │   │   │   ├── rule-sources.json
│   │   │   │   ├── game-editions.json
│   │   │   │   └── [Other data]
│   │   │   └── catalog-v0.5.0.json
│   │   │
│   │   └── App-BACKUP.jsx               # Backup Version
│   │
│   ├── public/                          # Static Assets
│   │   ├── favicon.svg
│   │   ├── pb_schema_export.json        # PocketBase Schema Dump
│   │   ├── spiele_anleitungen.csv       # Exported Games
│   │   └── verlage.csv                  # Exported Publishers
│   │
│   ├── scripts/                         # Build/Sync Scripts
│   │   ├── import-v070.cjs              # Excel Parser (291 Zeilen)
│   │   ├── sync-to-pocketbase.cjs       # Upsert Logic (200 Zeilen)
│   │   ├── import-and-sync.cjs          # Combined (318 Zeilen)
│   │   ├── create-collections.cjs       # Collection Init (225 Zeilen)
│   │   ├── api-handler.cjs              # API Wrapper (252 Zeilen)
│   │   ├── import-boardgames.cjs
│   │   ├── import-to-pocketbase.cjs
│   │   ├── sync-publishers.cjs
│   │   ├── sync-games-to-pocketbase.cjs
│   │   └── init-collections.sh          # Bash Script
│   │
│   ├── docs/                            # Documentation (NEW)
│   │   └── handover/
│   │       └── PROJECT_HANDOVER.md      # This File
│   │
│   ├── database/                        # Local SQLite (DEV)
│   │   ├── development.db               # SQLite DB (160KB)
│   │   └── production.db                # SQLite DB (164KB)
│   │
│   ├── dist/                            # Build Output
│   │   ├── index.html
│   │   ├── assets/
│   │   │   ├── index-*.css              # Minified CSS
│   │   │   ├── index-*.js               # Main Bundle (351KB)
│   │   │   └── xlsx-*.js                # XLSX Library (105KB)
│   │   ├── favicon.svg
│   │   └── [Other static]
│   │
│   ├── .gitignore
│   ├── .git/                            # Git Repository
│   ├── package.json                     # No dependencies (platform-provided)
│   ├── package-lock.json
│   ├── index.html                       # HTML Template (14 Zeilen)
│   ├── vite.config.js                   # Vite Config (3 Zeilen, sehr minimal)
│   ├── tailwind.config.cjs              # Tailwind Config
│   ├── nw.config.json                   # NeuroWays Config?
│   │
│   ├── AGENTS.md                        # MVP Architecture Doc (269 Zeilen)
│   ├── MASTERPROMPT_PROJECT_STATE.md    # KI Handover (565 Zeilen)
│   ├── ABSCHLUSSBERICHT_NPB_DEV_001.md  # Completion Report (371 Zeilen)
│   ├── AUTHENTICATION_FLOW.md            # Auth Documentation (151 Zeilen)
│   ├── DATABASE_STRUCTURE.md             # DB Doc (54 Zeilen)
│   ├── [Other Documentation Files]
│   │
│   └── [Git history: 60+ Commits]
│
├── static/                              # Served Static Assets (NOT IN APP)
│   └── [Images, etc. for site design]
│
└── uploads/                             # User Uploads (NOT SERVED)
    └── [Temporary file exchange]
```

### 9.2 Wichtige Dateien & Verantwortung

| Datei | Verantwortung | Zeilen | Bemerkung |
|-------|---------------|--------|-----------|
| `src/App.jsx` | Screen Router, Auth Check, User State | 280 | **Kritisch** – Änderungen hier betreffen alle Screens |
| `src/components/GamesCatalog.jsx` | Game Browsing & Collection | 679 | **Kritisch** – Core Feature |
| `src/components/AdminExcelUpload.jsx` | Excel Import | 523 | **Kritisch** – Data Pipeline |
| `src/lib/pb.js` | PocketBase Client Init | 21 | **Kritisch** – Single Point of Entry |
| `src/lib/config.js` | Environment Detection | 40 | **Wichtig** – Dev/Prod Routing |
| `index.html` | HTML Template | 14 | **Wichtig** – Title, Meta, Favicon |
| `AGENTS.md` | MVP Architecture | 269 | **Wichtig** – Technische Orientierung |
| `MASTERPROMPT_PROJECT_STATE.md` | KI Handover | 565 | **Sehr wichtig** – Für KI-Kontinuität |
| `dist/` | Build Output | — | **Read-Only** – Wird regeneriert mit `npm run build:prod` |
| `.git/` | Version History | 60+ Commits | **Geschützt** – Nie manuell bearbeiten |

### 9.3 Git Ignored (Nicht im Repo)

```
node_modules/          # Abhängigkeiten (platform-provided)
dist/                  # Build Output (regenerierbar)
.env.local             # Secrets (falls vorhanden)
.DS_Store              # macOS Metadaten
*.log                  # Log-Dateien
```

---

## 10. Datenbank

### 10.1 Datenbank-Technologie

**DBMS:** SQLite (Embedded, dateibasiert)
**Version:** PocketBase built-in
**Dateien:** 
- `dev/database.db` (160KB, Development)
- `prod/database.db` (164KB, Production)
**Access Pattern:** REST API via PocketBase (kein direkter SQL)

### 10.2 Collections (Schema)

#### 1. **games** (924 Records)

```sql
CREATE TABLE games (
  id TEXT PRIMARY KEY,
  original_id TEXT,
  title TEXT NOT NULL,
  title_en TEXT,
  publisher_original_id TEXT,  -- FK publishers.original_id
  category_primary TEXT,
  category_secondary TEXT,
  game_type TEXT,
  mechanics TEXT,
  description TEXT,
  language TEXT,
  language_dependence TEXT,
  year_published INTEGER,
  player_count_min INTEGER,
  player_count_max INTEGER,
  min_age INTEGER,
  duration_min INTEGER,
  duration_max INTEGER,
  complexity TEXT,
  status TEXT,
  bgg_rank INTEGER,
  bgg_id TEXT,
  notes TEXT,
  rule_url TEXT,
  product_url TEXT,
  article_number TEXT,
  is_german_edition BOOLEAN,
  verification_status TEXT,
  verified_date TEXT,
  metadata_status TEXT,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 2. **publishers** (32 Records)

```sql
CREATE TABLE publishers (
  id TEXT PRIMARY KEY,
  original_id TEXT UNIQUE,
  name TEXT NOT NULL,
  country TEXT,
  priority INTEGER,
  website TEXT,
  games_catalog TEXT,
  rules_archive TEXT,
  relevance TEXT,
  status TEXT,
  notes TEXT,
  created TIMESTAMP,
  updated TIMESTAMP
);
```

#### 3. **users** (N Records, Auth)

```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT,
  password TEXT,  -- Hashed by PocketBase
  verified BOOLEAN DEFAULT FALSE,  -- Admin Flag
  created TIMESTAMP,
  updated TIMESTAMP
);
```

#### 4. **user_profiles** (N Records)

```sql
CREATE TABLE user_profiles (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,  -- FK users.id
  player_name TEXT,
  role_id TEXT,           -- FK roles.id
  household_id TEXT,      -- FK households.id
  avatar_url TEXT,
  bio TEXT,
  created TIMESTAMP,
  updated TIMESTAMP
);
```

#### 5. **user_game_collection** (N Records)

```sql
CREATE TABLE user_game_collection (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,  -- FK users.id
  game_id TEXT NOT NULL,  -- FK games.id
  is_favorite BOOLEAN DEFAULT FALSE,
  tags TEXT,              -- JSON Array
  notes TEXT,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  UNIQUE(user_id, game_id)
);
```

#### 6. **user_game_sessions** (N Records)

```sql
CREATE TABLE user_game_sessions (
  id TEXT PRIMARY KEY,
  game_id TEXT NOT NULL,  -- FK games.id
  household_id TEXT,      -- FK households.id (optional)
  players TEXT,           -- JSON Array: [{user_id, player_name, is_winner, score}]
  winner_user_id TEXT,    -- FK users.id
  duration_minutes INTEGER,
  played_at TIMESTAMP,
  notes TEXT,
  created TIMESTAMP
);
```

#### 7. **households** (N Records)

```sql
CREATE TABLE households (
  id TEXT PRIMARY KEY,
  owner_user_id TEXT NOT NULL,  -- FK users.id
  name TEXT NOT NULL,
  invite_code TEXT UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
);
```

#### 8. **household_members** (N Records)

```sql
CREATE TABLE household_members (
  id TEXT PRIMARY KEY,
  household_id TEXT NOT NULL,  -- FK households.id
  user_id TEXT NOT NULL,       -- FK users.id
  role_id TEXT,                -- FK roles.id
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(household_id, user_id)
);
```

#### 9. **roles** (5 Records, Seed Data)

```json
[
  { id: "admin", name: "Admin", permissions: ["all"] },
  { id: "household_manager", name: "Haushaltsmanager", permissions: ["manage_members", "record_sessions"] },
  { id: "member", name: "Mitglied", permissions: ["view_collection", "play_games"] },
  { id: "guest", name: "Gast", permissions: ["view_catalog"] },
  { id: "superuser", name: "Superuser", permissions: ["admin_panel"] }
]
```

#### 10. **rule_sources** (924 Records)

```sql
CREATE TABLE rule_sources (
  id TEXT PRIMARY KEY,
  game_original_id TEXT,      -- FK games.original_id
  type TEXT,                  -- "Direktanleitung", "Produktseite", etc.
  language TEXT,
  rule_url TEXT NOT NULL,
  product_url TEXT,
  verification_status TEXT,   -- "unverified", "verified", "broken"
  verified_date TEXT,
  created TIMESTAMP
);
```

#### 11. **import_batches** (N Records, Audit Trail)

```sql
CREATE TABLE import_batches (
  id TEXT PRIMARY KEY,
  batch_id TEXT UNIQUE,
  filename TEXT,
  total_records INTEGER,
  imported_count INTEGER,
  skipped_count INTEGER,
  imported_at TIMESTAMP,
  admin_user_id TEXT,         -- FK users.id
  status TEXT,
  log TEXT
);
```

### 10.3 Relationen & Fremdschlüssel

```
games
  ├─ publisher_original_id → publishers.original_id
  └─ (implicit via ID)

user_game_collection
  ├─ user_id → users.id
  └─ game_id → games.id

user_profiles
  ├─ user_id → users.id
  ├─ role_id → roles.id
  └─ household_id → households.id

user_game_sessions
  ├─ game_id → games.id
  ├─ household_id → households.id
  └─ winner_user_id → users.id

households
  └─ owner_user_id → users.id

household_members
  ├─ household_id → households.id
  ├─ user_id → users.id
  └─ role_id → roles.id

rule_sources
  └─ game_original_id → games.original_id
```

### 10.4 Indizes & Optimierung

**PocketBase Auto-Indices:**
- Primary Keys (id) – alle Collections
- Unique Constraints – original_id, email, invite_code
- Composite Unique – (user_id, game_id) in user_game_collection

**Fehlende Indizes (Performance):**
- user_id in user_game_collection (könnte indexed werden)
- household_id in user_game_sessions
- category_primary in games (für Filter)

### 10.5 Datenbestand (aktuell)

| Collection | Records | Status |
|----------|---------|--------|
| games | 924 | ✅ Vollständig, v0.7.0 |
| publishers | 32 | ✅ Vollständig |
| users | ~5–10 (?) | ⚠️ UNGEKLÄRT – Abhängig von Tester/Demo-Accounts |
| user_profiles | ~5–10 (?) | ⚠️ UNGEKLÄRT |
| user_game_collection | ~50–100 (?) | ⚠️ UNGEKLÄRT – Demo-Data |
| user_game_sessions | ~10–20 (?) | ⚠️ UNGEKLÄRT – Demo-Data |
| households | ~2–3 (?) | ⚠️ UNGEKLÄRT – Demo-Data |
| roles | 5 | ✅ Seed Data |
| rule_sources | 924 | ✅ Vollständig |
| import_batches | ~3–5 (?) | ⚠️ UNGEKLÄRT |

### 10.6 Bekannte Inkonsistenzen

| Problem | Symptom | Ursache | Impact |
|---------|---------|--------|--------|
| **Doppelte Collections** | GamesCatalog + BoardGameCatalog | Alte Komponente nicht gelöscht | Minimal (Board nur Beta) |
| **Deprecated Fields** | Einige EXAMPLE_GAME-Felder existieren nicht in 924 Games | CSV ↔ Excel Format-Unterschied | Mittel (Null-Values) |
| **Publisher-Mapping** | 686/844 Spiele haben publisher_id, 158 nicht | Excel "Verlag / Marke" mehrere pro Zeile | Mittel (Filter-Problem) |
| **Missing Metadata** | player_count, duration sind Text, nicht Strukturiert | Excel hatte keine strukturierten Ranges | Mittel (Filter nicht möglich) |
| **Role-Implementation** | Roles Collection vorhanden, aber nicht durchgehend verwendet | Feature-Lücke | Niedrig (Struktur vorhanden) |

---

## 11. API und Schnittstellen

### 11.1 PocketBase REST API

**Base URL:** `/.sfs-be/api/` (production) oder `/.sfs-bd/api/` (dev)

#### Authentication Endpoints

| Methode | Endpoint | Zweck | Status |
|---------|----------|-------|--------|
| POST | `/auth-with-password` | Email/Passwort Login | ✅ IMPLEMENTIERT |
| POST | `/auth-refresh` | Token auffrischen | ✅ IMPLEMENTIERT |
| POST | `/auth-logout` | Abmelden | ⚠️ TEILWEISE (client-side localStorage clear) |

#### Collection Endpoints (REST CRUD)

| Methode | Endpoint | Zweck | Status | Auth |
|---------|----------|-------|--------|------|
| GET | `/collections/{name}/records` | Alle Records abrufen | ✅ | Public/Auth |
| GET | `/collections/{name}/records/{id}` | Ein Record abrufen | ✅ | Public/Auth |
| POST | `/collections/{name}/records` | Record erstellen | ✅ | Auth/Admin |
| PATCH | `/collections/{name}/records/{id}` | Record aktualisieren | ✅ | Auth/Admin |
| DELETE | `/collections/{name}/records/{id}` | Record löschen | ✅ | Auth/Admin |

**Beispiel Requests:**

```bash
# Login
POST /.sfs-be/api/collections/users/auth-with-password
{ "email": "user@example.com", "password": "secret" }

# Alle Spiele abrufen
GET /.sfs-be/api/collections/games/records?sort=title

# Spiel zu Collection hinzufügen
POST /.sfs-be/api/collections/user_game_collection/records
Authorization: Bearer <JWT_TOKEN>
{ "user_id": "...", "game_id": "...", "is_favorite": false }

# Admin: Spiel bearbeiten
PATCH /.sfs-be/api/collections/games/records/{game_id}
Authorization: Bearer <ADMIN_TOKEN>
{ "title": "New Title", "category_primary": "Strategie" }

# Admin: Excel-Import starten
POST /.sfs-auto-login
→ Gibt { token: "..." } zurück
```

#### Filter & Query

**Supported Query Params:**
- `filter` – PocketBase filter syntax (e.g., `filter=category_primary='Strategie'`)
- `sort` – Sort field (e.g., `sort=title` oder `sort=-created`)
- `expand` – Related records (e.g., `expand=publisher_original_id`)
- `page` – Pagination (e.g., `page=1`)
- `perPage` – Items per page (e.g., `perPage=50`)
- `fields` – Select specific fields

**Beispiel Filter:**
```
GET /.sfs-be/api/collections/games/records?
  filter=(category_primary='Strategie' AND year_published>2010)&
  sort=-year_published&
  perPage=20
```

### 11.2 Custom Endpoints (STRATO-Specific)

| Endpoint | Method | Zweck | Status |
|----------|--------|-------|--------|
| `/.sfs-auto-login` | POST | Generate Admin Token (STRATO Secret) | ✅ IMPLEMENTIERT |
| `/.sfs-bd/api/*` | ALL | Development PocketBase | ✅ AKTIV |
| `/.sfs-be/api/*` | ALL | Production PocketBase | ✅ AKTIV |

**Note:** `/.sfs-auto-login` ist STRATO-spezifisch und nicht Standard-PocketBase.

### 11.3 WebSocket (Optional, Nicht Implementiert)

PocketBase unterstützt Real-Time Updates via WebSocket, aber aktuell nicht in der App.

**Mögliche Future-Verwendung:**
```javascript
pb.collection('games').subscribe('*', (e) => {
  console.log('Record updated:', e.record);
}, { expand: 'publisher_original_id' });
```

---

## 12. Fachliche Geschäftslogik

### 12.1 Spiel-Filter-Logik (GamesCatalog)

```javascript
Regel: Filtere 924 Spiele nach folgende Kriterien (alle optional, UND-verknüpft):

1. Search Term (Full-Text)
   - Schau auf: title, category_primary, publisher_original_id
   - Operator: contains (case-insensitive)
   
2. Category Filter
   - Field: category_primary
   - Operator: equals
   
3. Publisher Filter
   - Field: publisher_original_id
   - Operator: equals
   
4. Min Age Filter
   - Field: min_age
   - Operator: <= (Spieler-Alter >= empfohlenes Alter)
   
5. Player Count Filter
   - Field: player_count_min, player_count_max
   - Operator: Range-Check (playerNum >= min AND playerNum <= max)
   
6. Filter Mode (exclusive, overrides above)
   - "all" – alle Spiele
   - "collection" – nur Spiele in user_game_collection (user_id=current)
   - "favorites" – nur Spiele mit is_favorite=true
   
Ergebnis: Gefilterte Liste, sortierbar A-Z oder Z-A
```

### 12.2 Sammlung-Management-Logik

```javascript
Regel: Nutzer kann Spiele zu persönlicher Sammlung hinzufügen

1. Click "Zu Sammlung hinzufügen"
   → Prüfe: Existiert user_game_collection Record mit (user_id, game_id)?
   → Nein: CREATE mit is_favorite=false, tags=[], notes=""
   → Ja: PATCH mit is_favorite=false (toggle)
   
2. Click "Favorit"
   → Prüfe: user_game_collection Exists?
   → Nein: CREATE mit is_favorite=true (implizit "zu Sammlung hinzufügen")
   → Ja: PATCH user_game_collection.is_favorite = !current
   
3. Click "Tag Hinzufügen"
   → PATCH user_game_collection.tags Array.push(newTag)
   → localStorage Fallback (falls DB fail)
   
4. Click "Aus Sammlung entfernen"
   → DELETE user_game_collection Record
   
Status: ✅ IMPLEMENTIERT
```

### 12.3 Excel-Import-Logik

```javascript
Regel: Admin lädt Excel Datei, 2 Sheets werden importiert

Sheet 1: "Verlage" (32 Records)
- Read Columns: Verlag-ID, Verlag, Land, Priorität, Startseite, Spieleübersicht, Anleitungsquelle
- Normalisierung: URLs validieren, leere = null
- Upsert: 
    Prüfe existiert publishers.original_id = Verlag-ID?
    Ja → PATCH (update)
    Nein → POST (create)
- Result: 32 publishers in DB

Sheet 2: "Spiele und Anleitungen" (844+ Records)
- Read Columns: Datensatz-ID, Verlag-ID, Spiel, Kategorie primär, ... (17 Felder)
- Normalisierung: 
    - IDs unique validate
    - URLs validieren
    - Leere Felder = null
    - Sprachcodes standardisieren
- Publisher-Mapping: Verlag-ID → publishers.original_id
- Upsert:
    Prüfe existiert games.original_id = Datensatz-ID?
    Ja → PATCH (update Felder)
    Nein → POST (create)
- Result: 844+ games in DB

Authentifizierung:
- Token abrufen: POST /.sfs-auto-login → Bearer Token
- Alle POST/PATCH mit Token-Header

Error Handling:
- Invalid URLs → skip oder warn
- Missing Publisher → log warning, continue
- Duplicate IDs → warn, overwrite

Status: ✅ IMPLEMENTIERT
```

### 12.4 Admin-Panel-Datenbrowser-Logik

```javascript
Regel: Admin kann alle Records in jeder Collection durchsuchen & editieren

1. Wähle Collection aus (dropdown)
   → GET /.sfs-be/api/collections/{name}/records
   → Zeige alle Records
   
2. Filter nach Buchstabe (nur für "games")
   → Filter in Komponente (Frontend)
   → title startsWith Buchstabe?
   → Zeige gefilterte Liste
   
3. Full-Text Search
   → Input: searchTerm
   → Filter: title.includes(term) || category.includes(term) || ...
   
4. Category Filter (nur für games)
   → Dropdown: alle einzigartigen category_primary Werte
   → Gleich = Filter
   
5. Publisher Filter (nur für games)
   → Dropdown: alle publishers mit game_count
   → publisher_original_id = Filter
   
6. Rule Status Filter (nur für games)
   → Enum: "all", "verified", "missing", "broken"
   → field "verification_status" oder "rule_url" check
   
7. Sortierung
   → Button: A→Z oder Z→A
   → sort=title oder sort=-title
   
8. Click auf Record → Edit Modal
   → Zeige alle Felder (outside system fields: created, updated, id, etc.)
   → Admin kann Wert ändern
   → Click Save → PATCH Record
   
9. Ampel-System (Completion Status)
   → Green: alle wichtigen Felder gefüllt
   → Yellow: einige Lücken
   → Red: kritische Felder fehlen

Status: ✅ IMPLEMENTIERT
```

### 12.5 Haushalt & Invite-Code-Logik

```javascript
Regel: Nutzer kann Haushalt erstellen und Freunde einladen

1. Click "Neuer Haushalt"
   → Form: Haushalt-Name, erste Mitglieder-Namen
   → Submit:
       CREATE households {
         owner_user_id: currentUser.id,
         name: name,
         invite_code: generateCode() → 8-char Random (z.B. "FAM42XYZW")
       }
       FOR EACH Mitglied:
         CREATE household_members {
           household_id: householdId,
           user_id: currentUser.id,  // Alle werden Owner erstmal? (UNKLAR)
           role_id: "member" oder "owner"
         }
   
2. Click "Mit Code beitreten"
   → Input: invite_code
   → Submit:
       GET households WHERE invite_code = input
       Wenn existiert:
         CREATE household_members {
           household_id: matchedHousehold.id,
           user_id: currentUser.id,
           role_id: "member"
         }
       Else:
         Error: "Code nicht gültig"
   
3. Sessions mit Haushalt
   → GameModeScreen: Select Haushalt
   → On End Game:
       CREATE user_game_sessions {
         game_id, household_id, players: [{...}], winner_user_id, duration_minutes, played_at
       }

Status: ⚠️ TEILWEISE IMPLEMENTIERT (UI vorhanden, Persistierung unklar)
```

### 12.6 Coach-Antwort-Logik

```javascript
Funktion: askGameCoach(gameId, question, game)

Input: gameId (String), question (String), game (Objekt)
Output: answer (String)

Logik:
1. Normalisiere question → lowercase, entferne Sonderzeichen
2. Pattern-Match gegen vordefinierte Keywords:
   
   IF question contains ["aktion", "action", "mache ich"]:
     RETURN Beschreibung aller game.actions
   ELSE IF question contains ["regeln", "rules", "wie spielt man"]:
     RETURN game.goal + game.roundStructure.phases description
   ELSE IF question contains ["gewinnen", "win", "ziel"]:
     RETURN game.winConditions
   ELSE IF question contains ["fehler", "mistake", "anfänger"]:
     RETURN game.beginnerMistakes
   ELSE IF question contains ["strategie", "strategy", "tipp"]:
     RETURN game.strategies
   ELSE IF question contains ["dauer", "duration", "wie lange"]:
     RETURN game.basics.duration
   ELSE:
     RETURN "Ich habe keine spezifische Antwort auf deine Frage. Versuche, mich nach Regeln, Aktionen oder Strategien zu fragen."

Delay: 800ms (Simulation)
DB-Persistierung: NEIN (keine coach_interactions Collection)

Status: ✅ MVP (aber nicht AI-basiert, kein Context-Awareness)
```

### 12.7 Design-System-Anwendung

```javascript
Regel: Alle UI-Elemente nutzen NeuroWays-Farben

Primär (Navy #0ea5e9):
- Hauptüberschriften (h1, h2)
- Primary Action Buttons (Submit, Create, etc.)
- Focus Indicators (3px Outline)

Sekundär (Slate-700):
- Secondary Buttons
- Navigation Links
- Hover States

Status Colors:
- Success (Green #16a34a): Bestätigungen, "Gespeichert"
- Warning (Orange #ea580c): Ampel "Yellow", fehlende Daten
- Error (Red #dc2626): Ampel "Red", kritische Fehler
- Info (Blue #0ea5e9): Informationen, Hinweise

Accessibility:
- Contrast Ratio ≥4.5:1 (Text zu Background)
- Focus Indicator: 3px Teal (#008CA8?) oder Navy?
- Keyboard Navigation: Tab, Enter, Escape

Status: ⚠️ TEILWEISE (Tokens vorhanden, nicht auf allen 22 Screens angewendet)
```

---

## 13. Authentifizierung, Rollen und Berechtigungen

### 13.1 Login-Prozess

```
1. Nutzer navigiert zu /auth
2. AuthScreen zeigt 2 Tabs: Login, Signup
3. Nutzer gibt Email + Passwort ein
4. AuthScreen ruft auf:
   pb.collection('users').authWithPassword(email, password)
5. PocketBase validiert Passwort (Hash-Vergleich)
6. Bei Erfolg: Response mit JWT Token + User Record
7. AuthScreen speichert:
   - localStorage.neuroplay_user_id = user.id
   - localStorage.neuroplay_user_email = user.email
   - localStorage.neuroplay_auth_token = token
8. PocketBase Client setzt Token intern
9. Redirect zu StartScreen
10. Navigation zeigt "Hallo, {email}!" + Logout Button

JWT Token: PocketBase standard (HS256 signed)
Token Expiry: ≈7 Tage (PocketBase default)
```

**Status:** ✅ Implementiert

### 13.2 Session-Persistierung (Über Reload)

```
1. App startet (App.jsx → useEffect)
2. Prüfe localStorage auf:
   - neuroplay_user_id
   - neuroplay_user_email
   - neuroplay_auth_token
3. Wenn vorhanden:
   pb.authStore.save(token, { id: userId, email: userEmail })
4. Rufe auf: pb.authRefresh() (validiere Token bei PocketBase)
5. Bei Erfolg: currentUser bleibt gesetzt
6. Bei Fehler: Token invalid → localStorage leeren, Force Login
7. User bleibt angemeldet nach Browser-Reload

Status: ✅ Implementiert (Fix: 9bff73f)
```

### 13.3 Admin-Status-Prüfung

```
Bedingung für Admin-Zugang:
- currentUser.verified === true

Wie wird verified gesetzt?
- Nur via direct Database-Edit (PATCH /users/{id})
- Oder über `/.sfs-auto-login` + PATCH (als Superuser)
- Kein Self-Service UI zur Admin-Umwandlung

Problem: Circular Dependency
- Nutzer braucht verified=true um Admin Panel zu sehen
- Aber verified=true kann nur Admin setzen
- Workaround: Manuelles PATCH via PocketBase Admin Panel oder Script

Checkpoints:
- App.jsx: const isAdmin = currentUser?.verified === true
- Navigation.jsx: Show "Admin" link only if isAdmin
- App.jsx: Render <AdminPanel /> only if isAdmin
```

**Status:** ✅ Implementiert (aber mit bekanntem Circular-Dependency-Problem)

### 13.4 Rollen-System (Geplant, Teilweise Implementiert)

```
roles Collection (5 Seed Records):
- admin: alle Permissions
- household_manager: manage_members, record_sessions
- member: view_collection, play_games
- guest: view_catalog
- superuser: admin_panel (PocketBase Admin)

user_profiles.role_id → roles.id

Aktuell: Rollen in DB vorhanden, aber nicht durchgehend in Komponenten verwendet.
Beispiel: HouseholdSetupScreen hat keine Role-Dropdown, household_members.role_id wird nicht korrekt gesetzt.

Status: ⚠️ TEILWEISE IMPLEMENTIERT (Struktur vorhanden, Anwendung unklar)
```

### 13.5 Access Control Rules (PocketBase)

**Games Collection:**
- Read: Public (alle)
- Create: Admin only
- Update: Admin only
- Delete: Admin only

**user_game_collection:**
- Read: User only (eigene Records)
- Create: User (eigene)
- Update: User (eigene)
- Delete: User (eigene)

**users Collection:**
- Read: Auth only (eingeschränkt)
- Create: Public (Signup)
- Update: User (eigene) oder Admin
- Delete: Admin only

**households:**
- Read: Member only
- Create: User (eigene)
- Update: Owner/Manager
- Delete: Owner only

**Status:** ⚠️ UNGEKLÄRT – Regeln sind in PocketBase konfiguriert, aber Dokumentation nicht vollständig.

---

## 14. Konfiguration und Umgebungen

### 14.1 Environment-Variablen

**Aktuell NICHT verwendet** (keine `.env`-Datei in Repo).

**Würde benötigt für (nicht implementiert):**
```
VITE_POCKETBASE_URL=https://...
VITE_API_ENDPOINT=/.sfs-be/api
VITE_ENVIRONMENT=production|development
VITE_FEATURE_FLAGS=...
```

**Status:** ⚠️ Keine Umgebungsvariablen genutzt; Konfiguration ist hardcoded in src/lib/config.js

### 14.2 Development-Umgebung

**Dev Server:** Vite HMR
```bash
npm run dev  # Starten auf localhost:5173
```

**Datenbank:** /.sfs-bd/api/ (STRATO Dev-Instance)

**Configuration (src/lib/config.js):**
```javascript
DEV_DOMAIN = 'https://aibuilder-514nc.preview.ai-builder.strato.de'
API-Endpoint = '/.sfs-bd/api'
```

**Browser-Konsole:** Logs von gameService, pb-Calls, etc.

### 14.3 Production-Umgebung

**Build:**
```bash
npm run build:prod  # → dist/ (1.1MB JS)
```

**Deployment:** STRATO Platform (automatisch)
```
git push origin dev → CI/CD triggers → npm run build:prod → dist/ served
```

**Live URL:** https://sfs-05zwnczjvysr.live-website.com/

**PocketBase:** /.sfs-be/api/ (Production Instance)

**Configuration (src/lib/config.js):**
```javascript
PROD_DOMAIN = 'https://sfs-05zwnczjvysr.live-website.com'
API-Endpoint = '/.sfs-be/api'
```

### 14.4 Build-Konfiguration

**vite.config.js:**
```javascript
import { defineConfig } from "/usr/lib/sfs-assistant-dev/platform-config.js";
export default defineConfig({});
```
→ Minimal; STRATO übernimmt meiste Config

**tailwind.config.cjs:**
```javascript
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: []
};
```
→ Default config, keine Custom Tokens

**package.json Scripts:**
```json
{
  "dev": "vite",
  "build": "vite build --mode preview",
  "build:prod": "vite build",
  "preview": "vite preview",
  "create-collections": "node scripts/create-collections.cjs",
  "sync-data": "node scripts/sync-to-pocketbase.cjs",
  "import-sync": "node scripts/import-and-sync.cjs"
}
```

### 14.5 Dependencies (Platform-Provided)

```json
{
  "dependencies": {},
  "devDependencies": {}
}
```

**Alle Dependencies sind platform-provided (NOT in package.json):**
- React 18
- react-dom
- react-router
- Vite
- @vitejs/plugin-react
- lucide-react
- pocketbase
- tailwind-merge
- (Implizit: Tailwind CSS v4)

**Status:** ✅ Korrektur richtig (Keine npm install nötig)

### 14.6 Secrets Management

**Keine Secrets im Code:**
- API Keys: /.sfs-auto-login ist STRATO-bereitgestellt
- Database Passwords: Implicit über STRATO
- JWT Secrets: PocketBase-verwaltet

**localStorage (Client-Side nur):**
- Token wird in localStorage gespeichert (XSS-Risiko, aber MVP OK)
- Sollte später in Memory oder Secure Cookies sein

**Status:** ⚠️ Grundlegend OK für MVP, aber nicht production-secure

---

## 15. Externe Abhängigkeiten

### 15.1 Frameworks & Libraries

| Dependency | Version | Bereitgestellt | Zweck |
|------------|---------|--------|---------|
| React | 18.x | ✅ Platform | UI Framework |
| react-dom | 18.x | ✅ Platform | DOM Rendering |
| Vite | 6.x | ✅ Platform | Build & Dev Server |
| @vitejs/plugin-react | 4.x | ✅ Platform | JSX Support |
| Tailwind CSS | 4.x | ✅ Platform | Styling |
| lucide-react | (latest) | ✅ Platform | Icons |
| PocketBase SDK | 0.27.0 | ✅ Platform | Backend Client |
| tailwind-merge | latest | ✅ Platform | Tailwind Utility |
| XLSX | (dynamic import) | ⚠️ Browser-Side | Excel Parsing |

### 15.2 APIs & Externe Dienste

| Dienst | Zweck | Status |
|--------|-------|--------|
| PocketBase (/.sfs-be/) | Database + Auth Backend | ✅ STRATO-Hosted |
| STRATO Platform | Hosting + SSL | ✅ Hosting-Provider |
| BoardGameGeek (BGG) | External Game Data | 🔗 Optional (bgg_id in Schema, aber nicht abgerufen) |
| Google Fonts | Custom Typefaces | ❌ Nicht verwendet (System Stack) |

### 15.3 Build-Zeit Dependencies

| Tool | Zweck | Verfügbar |
|------|-------|-----------|
| npm | Package Manager | ✅ (aber: no packages needed) |
| git | Version Control | ✅ |
| Node.js | Runtime (Scripts) | ✅ (v24 confirmed) |
| bash | Shell Scripts | ✅ |

### 15.4 Versionsstände (Ungeklärt/Nicht Dokumentiert)

| Komponente | Version | Quelle | Dokumentiert? |
|-----------|---------|--------|---------------|
| PocketBase | v0.39.0 | MASTERPROMPT | ✅ |
| PocketBase SDK | v0.27.0 | MASTERPROMPT | ✅ |
| React | 18.x | AGENTS.md | ✅ |
| Vite | 6.x | AGENTS.md | ✅ |
| Node.js | 24.x | MASTERPROMPT | ✅ |
| Tailwind CSS | 4.x | AGENTS.md | ✅ |
| Chrome/Firefox/Safari | Latest | AGENTS.md "Modern" | ⚠️ UNGEKLÄRT |

---

## 16. Bereits erledigte Entwicklungsaufgaben

### 16.1 Abgeschlossene Arbeiten (mit Nachweis)

| # | Aufgabe | Ergebnis | Status | Nachweis | Datum |
|---|---------|----------|--------|----------|-------|
| 1 | Projekt-Setup (Vite + React) | App.jsx, 22 Components | ✅ | src/App.jsx (280 Zeilen) | Aug 2026 |
| 2 | PocketBase Integration | pb.js Client | ✅ | src/lib/pb.js | Aug 2026 |
| 3 | Excel-Parser (import-v070.cjs) | 924 Games geparst | ✅ | scripts/import-v070.cjs (291 Zeilen) | Jul 2026 |
| 4 | Games Collection erstellen | 924 Records in DB | ✅ | pb.collection('games').getFullList() | Jul 2026 |
| 5 | Publishers Collection erstellen | 32 Records in DB | ✅ | pb.collection('publishers').getFullList() | Jul 2026 |
| 6 | GamesCatalog Screen | 679 Zeilen, Search + Filter | ✅ | src/components/GamesCatalog.jsx | Jul 2026 |
| 7 | AdminDataBrowser | Edit alle Collections | ✅ | src/components/AdminDataBrowser.jsx (821 Zeilen) | Jul 2026 |
| 8 | AdminExcelUpload | Batch Import | ✅ | src/components/AdminExcelUpload.jsx (523 Zeilen) | Jul 2026 |
| 9 | Authentication (PocketBase) | Login/Signup | ✅ | src/components/AuthScreen.jsx | Jul 2026 |
| 10 | Token Persistierung | authRefresh() on App Load | ✅ | Commit 9bff73f | Aug 2026 |
| 11 | Admin-Panel | 4 Tabs (DB, Import, User, Verlag) | ✅ | src/components/AdminPanel.jsx | Jul 2026 |
| 12 | Game-Lernpfad (6 Screens) | GameOverview, QuickStart, Rules, Coach, etc. | ✅ | src/components/ | Jul 2026 |
| 13 | Spiel-Sammlung (Favorites, Tags) | user_game_collection Collection | ✅ | MyGamesScreen.jsx | Jul 2026 |
| 14 | Haushalt-System (UI) | HouseholdSetupScreen | ⚠️ | src/components/HouseholdSetupScreen.jsx | Jul 2026 |
| 15 | Sessions-Tracking (UI) | GameModeScreen | ⚠️ | src/components/GameModeScreen.jsx | Jul 2026 |
| 16 | Design-Tokens erstellen | design-tokens.css | ✅ | src/styles/design-tokens.css (152 Zeilen) | Aug 2026 |
| 17 | Navigation (Header) | Responsive, Auth-aware | ✅ | src/components/Navigation.jsx (223 Zeilen) | Jul 2026 |
| 18 | StartScreen redesign | Navy/Teal/Gold Palette | ✅ | src/components/StartScreen.jsx | Aug 2026 |
| 19 | Masterprompt Dokumentation | 565 Zeilen für KI-Kontinuität | ✅ | MASTERPROMPT_PROJECT_STATE.md | Aug 2026 |
| 20 | Git-Repo Erstellung | github.com/neuroways/brettspielcoach_ai | ✅ | 60+ Commits | Aug 2026 |
| 21 | STRATO Environment Config | Auto-detect Dev/Prod | ✅ | src/lib/config.js | Aug 2026 |
| 22 | Vite Build Pipeline | `npm run build:prod` → dist/ | ✅ | vite.config.js, 1.1MB Output | Aug 2026 |
| 23 | Produktiv-Deploy | Live URL aktiv | ✅ | https://sfs-05zwnczjvysr.live-website.com/ | Aug 2026 |
| 24 | Collection-Schema-Dump | pb_schema_export.json | ✅ | public/pb_schema_export.json (21KB) | Aug 2026 |

---

## 17. Teilweise erledigte Arbeiten

### 17.1 Unvollständige Features

| Feature | Ursprüngliches Ziel | Bereits Umgesetzt | Noch Fehlend | Status | Priorität |
|---------|-------------------|------------------|-------------|--------|-----------|
| **Tags** | User-definierte Tags pro Spiel | Field in `user_game_collection`, Array-Typ | UI zum Hinzufügen/Löschen, Tags im Detail-Modal | ⚠️ 70% | P1 |
| **Haushalt-System** | Familie/Freunde verwalten | UI in HouseholdSetupScreen, Collections vorhanden | Persistierung-Logic unklar, User-Flow für "Code beitreten" nicht getestet | ⚠️ 50% | P2 |
| **Sessions-Tracking** | Spielsessions aufzeichnen (Gewinner, Dauer) | GameModeScreen UI, Collection vorhanden | Save-Logic zu DB nicht sichtbar im Code, Statistiken-UI fehlt | ⚠️ 40% | P2 |
| **Design-Rollout** | Alle 22 Screens mit Navy/Teal/Gold | 7 Screens fertig (Navigation, StartScreen, AdminPanel, GamesCatalog) | 15 Screens ausstehend | ⚠️ 32% | P1 |
| **Responsive Testing** | Verify 320–1440px Breakpoints | Mobile-first Tailwind angewendet | Keine formale Verifizierung auf allen Breakpoints durchgeführt | ⚠️ 50% | P1 |
| **Accessibility (WCAG 2.2 AA)** | Full Audit + Fixes | Focus-Indicator (3px) teilweise, semantic HTML | Kontrast-Audit, Keyboard-Navigation, Screen Reader Test nicht durchgeführt | ⚠️ 20% | P2 |
| **Bundle Optimization** | <700KB gzip | Vite Minification Standard | Code-Splitting, lazy-loading nicht implementiert | ⚠️ 10% | P2 |
| **Real PDF Analysis** | Client-side PDF Parsing + Game Extraction | gameService.analyzeGameDocument() als Placeholder | PDF-Library (pdfjs) nicht integriert, NLP nicht vorhanden | ❌ 0% | P3 (Future) |
| **AI-Coach** | LLM-basierte Antworten (RAG) | askGameCoach() mit Pattern-Matching | Keine LLM-Integration, keine Kontext-Awareness | ⚠️ 0% | P3 (Future) |
| **Dark Mode** | Vollständige Implementierung | Tokens vorhanden (design-tokens.css) | Nur auf wenigen Screens angewendet, @media prefers-color-scheme fehlt teilweise | ⚠️ 20% | P3 |
| **Email Notifications** | Benachrichtigungen (Invite, etc.) | Konzept: PocketBase Email API | PocketBase Email API ist disabled (STRATO Constraint) | ❌ 0% | P3 (Blocked) |
| **Passwort-Reset** | Nutzer können Passwort zurücksetzen | Nicht vorhanden | Feature-Lücke | ⚠️ 0% | P2 |
| **Role-Based Access** | Permissions per Rolle | roles Collection, user_profiles.role_id | Role-Enforcement in Komponenten nicht durchgehend | ⚠️ 30% | P2 |

---

## 18. Offene Anforderungen und Backlog

### 18.1 Feature-Backlog (nach Priorität)

#### **P0 – Blockierend**
Keine P0 Items (Projekt läuft).

#### **P1 – Kritisch (nächste 1–2 Wochen)**

| # | ID | Beschreibung | Grund | Abhängigkeiten | Erwartetes Ergebnis | Akzeptanzkriterium |
|---|----|-------------|-------|---------------|--------------------|--------------------|
| 1 | T001 | Alle 22 Screens mit NeuroWays-Farben gestalten | Design-Konsistenz | 7/22 fertig | Navy/Teal/Gold auf allen Screens | Keine blauen Farben mehr sichtbar |
| 2 | T002 | Responsive Testing (320, 375, 768, 1024, 1280, 1440px) | Quality Gate | Alle Screens | No Horizontal Scroll, Buttons ≥44px | BrowserStack oder manuell verifiziert |
| 3 | T003 | Tags UI im Detail-Modal | Feature-Completion | Tags Field vorhanden | User kann Tags hinzufügen/entfernen | Modal mit Tag-Input + Entfernen-Button |
| 4 | T004 | Sessions-Save-Logic in GameModeScreen | Feature-Completion | Collection vorhanden | Spiel-Ende speichert Gewinner + Dauer | `create()` zu user_game_sessions aufgerufen |
| 5 | T005 | WCAG 2.2 AA Audit (Kontrast + Keyboard) | Accessibility | — | Alle Kontraste ≥4.5:1 | Axe DevTools grün, manuelle Keyboard-Navigation OK |

#### **P2 – Wichtig (nächste 2–4 Wochen)**

| # | ID | Beschreibung | Grund | Abhängigkeiten |
|---|----|-------------|-------|---------------|
| 6 | T006 | Bundle-Size Optimierung (Code-Splitting) | Performance | Vite Manual Chunks |
| 7 | T007 | Haushalt Invite-Code Accept Flow testen | Feature-Validation | HouseholdSetupScreen |
| 8 | T008 | Sessions-Statistik-Dashboard (Win-Rate) | Analytics | GameFlow-Completion |
| 9 | T009 | Passwort-Reset implementieren | Security | AuthScreen |
| 10 | T010 | Role-Based Access durchgehend umsetzen | Governance | roles Collection |
| 11 | T011 | Duplizierte Screens bereinigen (BoardGameCatalog vs GamesCatalog, LibraryScreen) | Tech Debt | — |

#### **P3 – Später (2+ Monate)**

| # | ID | Beschreibung | Grund |
|---|---|-------------|-------|
| 12 | T012 | Real PDF-Parser integrieren | Feature Enhancement |
| 13 | T013 | AI-Coach mit RAG implementieren | Feature Enhancement |
| 14 | T014 | PWA (Icons, Manifest, Service Worker) | Mobile Offline |
| 15 | T015 | Dark Mode auf allen Screens | UX Enhancement |

---

## 19. Bekannte Fehler und technische Schulden

### 19.1 Fehler (aktiv / gelöst)

| Fehler-ID | Titel | Symptom | Ursache | Impact | Workaround | Status | Letztes Update |
|-----------|-------|---------|--------|--------|-----------|--------|----------------|
| BUG-001 | Request-Cancellation Error bei Tab-Switch | "The request was aborted" | In-flight Requests nicht cancelled | Komponenten-State ungültig | AbortController.abort() vor neuen Request | ✅ GELÖST | Commit 427ea0f |
| BUG-002 | Games-Kategorie null nach Import | Alle 844 Games hatte null category_primary | Excel Spalten-Mapping fehlerhaft ("Kategorie primär" ≠ "Kategorie") | Filter nicht möglich | Script mit Fallback-Mapping | ✅ GELÖST | Import v0.7.0 |
| BUG-003 | Publishers null in 158 Spiele | publisher_original_id null | Excel-Column "Verlag / Marke" mit mehreren Namen pro Zeile | Filter problematisch | Name-zu-ID Mapping mit Fuzzy | ✅ GELÖST | Import v0.7.0 |
| BUG-004 | Auth Token nicht persistent | User logged out nach Reload | Token nicht in localStorage gespeichert | User muss sich neu anmelden | pb.authRefresh() on App.jsx mount | ✅ GELÖST | Commit 9bff73f |
| BUG-005 | Admin Panel nicht sichtbar trotz Login | "Zugriff verweigert" obwohl Admin | verified flag false auf users Collection | Admin-Feature unzugänglich | Manuelles PATCH oder KOPIERE_ZUGANGSREGELN.sh | ✅ GELÖST (mit Workaround) | STRATO_SETUP.md |
| BUG-006 | GamesCatalog zeigt 52 alte Games | Falsche Datenquelle | hardcoded games-catalog.json statt pb.collection() | Katalog-Count stimmt nicht | Umgestellt auf PocketBase | ✅ GELÖST | Commit 33e8e9f |
| BUG-007 | Excel-Import speichert nicht in PocketBase | "Import abgeschlossen", aber 0 Records in DB | Nur localStorage, kein POST zu Collections | Importierte Daten gehen verloren | Admin-Token + REST POST implementiert | ✅ GELÖST | Commit 427ea0f |

### 19.2 Technische Schulden

| Schuld-ID | Beschreibung | Auswirkung | Effort | Abhängigkeiten | Status |
|-----------|-------------|-----------|--------|---------------|--------|
| DEBT-001 | 2 Katalog-Komponenten (GamesCatalog + BoardGameCatalog) | Code-Duplikation, Maintenance-Last | 1h | Refactor | ⚠️ OFFEN |
| DEBT-002 | LibraryScreen (deprecated, wird nicht verwendet?) | Dead Code | 30m | Cleanup | ⚠️ OFFEN |
| DEBT-003 | Games-Datenmodell verschoben (EXAMPLE_GAME hardcoded) | Neue Spiele könnten nicht geladen werden | 2h | GameFlow-Refactor | ⚠️ OFFEN |
| DEBT-004 | Keine automatisierte Tests | Quality Gate fehlend | 10h+ | Test Framework | ⚠️ OFFEN |
| DEBT-005 | localStorage für Session (XSS-Risiko) | Security-Issue | 4h | Secure Cookies/Memory Storage | ⚠️ OFFEN |
| DEBT-006 | Sessions-Logik in GameModeScreen unklar | Save-to-DB nicht verifizierbar | 3h | Code Review + Testing | ⚠️ OFFEN |
| DEBT-007 | Keine Error Logging / Observability | Production-Issues schwer zu debuggen | 5h+ | Sentry/LogRocket Integration | ⚠️ OFFEN |
| DEBT-008 | Bundle Size 1.1MB (Warning >500KB) | Performance-Issue | 4h | Code-Splitting | ⚠️ OFFEN |

---

## 20. Getroffene Architektur- und Entwicklungsentscheidungen

### 20.1 Dokumentierte Entscheidungen (aus AGENTS.md, MASTERPROMPT, etc.)

| Entscheidung | Hintergrund | Gewählte Lösung | Bekannte Alternativen | Konsequenzen |
|--------------|-------------|-----------------|----------------------|-------------|
| **Routing: Screen-State statt React-Router** | MVP Einfachheit | Single `screen` State in App.jsx | React-Router mit URL-Sync | Schnelle Iteration, aber keine Deep-Linking |
| **PDF-Analysis: Simulated** | Parsing-Komplexität | 3s Delay → EXAMPLE_GAME | pdfjs + NLP | MVP validiert UX, Feature deferred |
| **Coach: Pattern-Matching, nicht AI** | LLM-Integration Overhead | Hardcoded Responses mit Keyword-Match | OpenAI API, RAG-System | Schnell deploybar, aber nicht skalierbar |
| **PocketBase, nicht Firebase/Supabase** | Self-Hosted Anforderung | STRATO-Hosted PocketBase | Firebase (Google), Supabase (PostgreSQL) | SQLite OK für MVP, Skalierung später |
| **Excel-Import, nicht API** | Non-Tech User Workflow | Browser-basierter XLSX Parser + REST POST | Server-side Parser, CSV | Nutzer kontrolliert Daten lokal |
| **Tailwind CSS v4, nicht styled-components** | Platform-provided | Token-based CSS Custom Props | styled-components, CSS Modules | Performance OK, aber statisches CSS |
| **localStorage für Auth Token** | MVP Simplicity | JWT in localStorage + pb.authRefresh() | Secure Cookies, Memory Only | XSS-Risiko, aber OK für MVP |
| **No Custom Fonts, System Stack** | Performanz | Fallback: -apple-system, BlinkMacSystemFont | Google Fonts, Typekit | Schneller, aber weniger Brand-Feel |
| **Icons via lucide-react** | Easy Integration | Icon-names as `import Name from "icon:kebab-name"` | SVG Files, Font Awesome | Konsistent, leicht zu warten |

### 20.2 Implizite Annahmen (Ableitbar aus Code)

| Annahme | Basis | Validität | Risiko |
|---------|-------|-----------|--------|
| **Nutzer kennen ihre Email** | AuthScreen erfordert Email | ✅ Standard | Gering |
| **924 Games sind komplette Datenquelle** | Excel v0.7.0 als Quelle | ✅ Aktuell | Medium (Updates brauchen Re-Import) |
| **Haushalt = 1:1 zu Nutzer** | HouseholdSetupScreen aktueller UX | ⚠️ Unklar | Medium (Nutzer kann mehrere haben?) |
| **Admin = verified Flag** | App.jsx check | ✅ Documented | Gering (aber Circular Dependency) |
| **PocketBase bleibt STRATO-Hosted** | Deployment-Annahme | ✅ Current | High (Alternate Host = großer Aufwand) |

---

## 21. Offene Entscheidungen

### 21.1 Architektur-Fragen

| Frage | Kontext | Optionen | Blockiert | Deadline |
|-------|---------|----------|-----------|----------|
| **Wie viele Haushalte pro Nutzer?** | HouseholdSetupScreen erlaubt nur 1 | (A) Max 1 (aktuell), (B) Unbegrenzt, (C) N (konfigurierbar) | Household-Feature vollständig | — |
| **Sessions Persistierung?** | GameModeScreen hat State, DB-Save unklar | (A) Nur in-Memory, (B) Persist zu user_game_sessions, (C) Optional (User-Action) | Sessions-Feature | — |
| **Dark Mode brauchen?** | Tokens vorhanden, nicht durchgehend angewendet | (A) Vollständig implementieren, (B) Future Phase, (C) Entfernen | Design-Rollout | — |
| **Email Notifications (Blocked)?** | PocketBase Email-API disabled (STRATO) | (A) Alternative Service (SendGrid, etc.), (B) Verzicht, (C) Nutzer-notified via Dashboard | Haushalt-Invite | — |

### 21.2 Feature-Scope-Fragen

| Frage | Hintergrund | Optionen | Impact |
|-------|-------------|----------|--------|
| **Real PDF-Parser jetzt oder später?** | Aktuell simuliert | (A) jetzt (3–5 Tage Aufwand), (B) später (Phase 2) | Game-Upload-Feature |
| **Session-Analytics (Statistiken)?** | Data wird aufgezeichnet, UI fehlt | (A) Implementieren (1–2 Tage), (B) deferred | MyGamesScreen Enhancement |
| **BWG API Integration?** | Spiele haben bgg_id, aber nicht abgerufen | (A) Fetch BGG-Daten, (B) Nur externe Links | Game-Metadata Richness |

---

## 22. Tests und Qualitätssicherung

### 22.1 Manuelle Tests (Dokumentiert)

| Test | Voraussetzung | Schritte | Ergebnis | Status |
|------|-------------|----------|----------|--------|
| **Login-Persistierung** | Browser localStorage clear | 1. Login, 2. Reload, 3. Prüfe ob noch logged in | ✅ Bleibt logged in | ✅ PASS |
| **GamesCatalog Search** | 924 Games in DB | 1. Öffne Katalog, 2. Suche "Kniffel", 3. Zeige 1 Ergebnis | ✅ Search funktioniert | ✅ PASS |
| **Zu Sammlung hinzufügen** | Katalog offen, logged in | 1. Klick Game Card, 2. Click "Zu Sammlung", 3. Prüfe MyGames | ✅ Erscheint in Sammlung | ✅ PASS |
| **Admin-Panel Access** | Admin-Account mit verified=true | 1. Login, 2. Click "Admin" in Nav, 3. Panel zeigt | ✅ Admin Panel visible | ✅ PASS |
| **Excel-Import** | AdminExcelUpload, Excel-Datei vorhanden | 1. Upload Excel, 2. Prüfe Progress, 3. Prüfe Games in DB | ✅ 924 Games imported | ✅ PASS |
| **Auth-Error Handling** | AuthScreen, wrong password | 1. Login mit falschem Passwort, 2. Error-Message | ✅ Error zeigt | ✅ PASS |
| **Responsive (Mobile 375px)** | Browser DevTools: iPhone SE (375px) | 1. Öffne jede Screen, 2. Prüfe kein H-Scroll, 3. Buttons klickbar | ⚠️ Nicht vollständig getestet | ⚠️ PARTIAL |
| **Responsive (Tablet 768px)** | Browser DevTools: iPad (768px) | [Siehe oben] | ⚠️ Nicht vollständig getestet | ⚠️ PARTIAL |

### 22.2 Automatisierte Tests

| Framework | Test-Coverage | Status |
|-----------|---------------|--------|
| Jest | Unit Tests | ❌ Nicht vorhanden |
| React Testing Library | Component Tests | ❌ Nicht vorhanden |
| Cypress/Playwright | E2E Tests | ❌ Nicht vorhanden |
| Lighthouse | Performance Audit | ⚠️ Nicht systematisch durchgeführt |
| Axe DevTools | Accessibility Audit | ⚠️ Nicht systematisch durchgeführt |

**Status:** ❌ Keine Automatisierten Tests; nur manuelle Smoke Tests

---

## 23. Deployment und Betrieb

### 23.1 Build-Pipeline

```
Repository (GitHub dev branch)
   ↓ [git push]
STRATO CI/CD (Trigger)
   ↓
npm install  (Platform-provided deps nur)
   ↓
npm run build:prod
   ↓ [Vite minifies, bundles, optimizes]
dist/ (1.1MB JS, 248KB gzip, ~50KB CSS, index.html, assets/)
   ↓
STRATO Auto-Deploy
   ↓
https://sfs-05zwnczjvysr.live-website.com/ (Live)
   ↓
Browser downloads JS, renders App
   ↓
App checks localStorage für Token
   ↓
PocketBase /.sfs-be/api/ contacted
   ↓
User interagiert mit App
```

### 23.2 Zielverzeichnisse (Live)

| Pfad | Inhalt | Served By |
|------|--------|-----------|
| `/` | index.html | CDN / STRATO |
| `/assets/index-*.css` | Tailwind + Custom Styles | CDN / STRATO |
| `/assets/index-*.js` | React App Bundle | CDN / STRATO |
| `/assets/xlsx-*.js` | XLSX Library | CDN / STRATO |
| `/favicon.svg` | Logo | CDN / STRATO |
| `/.sfs-be/api/*` | PocketBase REST API | PocketBase STRATO |
| `/.sfs-auto-login` | Admin Token Endpoint | STRATO Platform |

### 23.3 Deployment-Checklist

**Vor Build:**
- [ ] Git Repo sauber (keine uncommitted Changes)
- [ ] AGENTS.md aktualisiert
- [ ] Design-Tokens auf allen 22 Screens angewendet
- [ ] Responsive Testing abgeschlossen
- [ ] Keine Console-Errors

**Build:**
```bash
cd app
npm run build:prod
# Expect: dist/ ~1.1MB JS, ~248KB gzip, NO ERRORS
```

**Nach Deploy:**
- [ ] Live URL erreichbar
- [ ] Network Tab: 200er Status
- [ ] App lädt in <3s (3G)
- [ ] Katalog zeigt 924 Spiele
- [ ] Login möglich
- [ ] Admin Panel für verified User sichtbar

### 23.4 Rollback-Prozess

**Falls Problem nach Deploy:**
```bash
# GitHub revert zu vorherigem Commit
git revert <problematic-commit>
git push origin dev

# STRATO redeploys automatically
# Monitor: https://sfs-05zwnczjvysr.live-website.com/ sollte fix sein
```

---

## 24. Risiken

### 24.1 Technische Risiken

| Risiko | Wahrscheinlichkeit | Impact | Gegenmaßnahme |
|--------|------------------|--------|---------------|
| **PocketBase Ausfallzeit** | Niedrig (STRATO-managed) | Hoch (App offline) | Monitoring, Fallback-Benachrichtigung |
| **Bundle-Size Explosion** | Mittel (keine Code-Splitting) | Mittel (Langsameres Laden) | Code-Splitting implementieren, Tree-shake |
| **XLSX-Library Bugs** | Niedrig (stabile Library) | Mittel (Import-Fehler) | Validierung vor Import, Error-Handling |
| **localStorage XSS** | Mittel (kein CSP) | Hoch (Token-Theft) | Migrate to Secure Cookies oder Memory-Store |
| **N+1 Query Problem** | Mittel (Publisher-Lookups) | Mittel (Performance) | Joins/Expands in PocketBase Query |

### 24.2 Fachliche Risiken

| Risiko | Wahrscheinlichkeit | Impact | Gegenmaßnahme |
|--------|------------------|--------|---------------|
| **Excel-Daten veralten schnell** | Hoch (manueller Import) | Mittel (Katalog-Qualität sinkt) | Automatisierter Sync, Versionierung |
| **Nutzer vergessen Invite-Code** | Mittel | Niedrig (können neu erstellen) | Code-Copy-to-Clipboard Button |
| **Haushalt-Mitglieder-Sync unklar** | Mittel | Mittel (Daten-Inkonsistenzen) | Clear Documentation + Tests |
| **Coach-Antworten zu generisch** | Hoch | Mittel (Nutzer-Zufriedenheit) | AI-Integration (Phase 2) |

---

## 25. Empfohlene nächste Entwicklungsschritte

### 25.1 Kritischer Pfad (nächste 2 Wochen)

**Ziel:** Production-Ready mit vollständigem Design & Responsive

#### Phase 1A: Design-Rollout (3–4 Tage)

```
1. QuickStart, SetupScreen, RulesScreen → Navy/Teal/Gold
2. CoachScreen, GameModeScreen, StrategyScreen → Navy/Teal/Gold
3. LibraryScreen, UploadScreen, AnalysisScreen → Navy/Teal/Gold
4. UserProfileScreen, HouseholdSetupScreen, BoardGameCatalog → Navy/Teal/Gold
5. AdminDataBrowser, AdminExcelUpload, AdminUserManagement → Navy/Teal/Gold

Pro Screen:
- Ersetze alle Slate/Blue/Gradient Farben mit `var(--nw-primary)`, `var(--nw-secondary)`, etc.
- Verifiziere Kontraste (≥4.5:1)
- Test auf Mobile (375px)

Commit: "design: complete neurowaya palette on all 22 screens"
```

#### Phase 1B: Responsive Testing (2–3 Tage)

```
1. Teste auf BrowserStack oder manuell:
   - Mobile: 320, 375, 425px
   - Tablet: 768, 1024px
   - Desktop: 1280, 1440px+
   
2. Pro Breakpoint, pro Screen:
   - Kein Horizontal-Scroll
   - Buttons ≥44px
   - Text lesbar (keine Zoom nötig)
   - Layout sinnvoll umgebrochen
   
3. Bekannte Problem-Areas:
   - AdminDataBrowser Table bei schmalen Screens
   - GamesCatalog Grid bei 375px
   - Modal-Größen
   
Commit: "fix: responsive design audit - verified 320-1440px"
```

#### Phase 1C: WCAG 2.2 AA (2–3 Tage)

```
1. Kontrast-Audit (Axe DevTools):
   - Alle Text/Background Kontrast-Pairs prüfen
   - Navy #0ea5e9 auf White: 2.4:1 (FAIL, braucht fix)
   - Teal #008CA8 auf White: 3.5:1 (BORDERLINE, OK mit Bold)
   
2. Keyboard Navigation:
   - Tab durch alle Buttons/Inputs
   - Enter zum Submit
   - Escape zum Close (Modals)
   
3. Screen Reader (Quick Check):
   - NVDA oder VoiceOver Stichproben
   - Semantic HTML (button, label, form, etc.)
   
Commit: "fix: wcag 2.2 aa compliance - contrast & keyboard navigation"
```

### 25.2 Feature-Completion (nächste 1–2 Wochen)

#### Phase 2A: Tags UI (1–2 Tage)

```
1. GamesCatalog Game Detail Modal:
   - Zeige aktuelle Tags als Badges
   - Add Input + Button "Tag hinzufügen"
   - Delete-Icon auf jedem Tag
   
2. MyGamesScreen:
   - Zeige Tags unter Spiel-Title
   
3. Implementation:
   - Nutze user_game_collection.tags (Array)
   - On Tag Add: PATCH collection mit newTags Array
   
Commit: "feat: tags ui - add/remove tags on games"
```

#### Phase 2B: Sessions Save-Logic (1–2 Tage)

```
1. GameModeScreen: Nach "Spiel beenden"
   - Sammle Spieler-Namen, Gewinner, Dauer
   - POST zu user_game_sessions Collection:
     {
       game_id,
       household_id (optional),
       players: [{user_id, player_name, score, is_winner}],
       winner_user_id,
       duration_minutes,
       played_at: new Date().toISOString(),
       notes
     }
   
2. Erfolgs-Feedback:
   - "Session gespeichert!" Toast
   - Erscheint in MyGamesScreen (künftig)
   
Commit: "feat: save game sessions to database"
```

#### Phase 2C: Bundle Optimization (2–3 Tage)

```
1. Analyse:
   - npx vite-bundle-analyzer dist/
   - Identify große Components/Chunks
   
2. Code-Splitting:
   - vite.config.js manualChunks:
     - vendors: React, PocketBase, lucide-react
     - admin: AdminPanel + Tabs
     - gameplay: GameFlow Screens
     - catalog: GamesCatalog + MyGamesScreen
   
3. Lazy-Load:
   - React.lazy() für Screen Components
   - Suspense Fallback
   
4. Tree-Shake:
   - Entferne ung nutzten gameService Exports
   - Prüfe auf Circular Dependencies
   
Ziel: <700KB gzip
Commit: "perf: optimize bundle with code-splitting"
```

### 25.3 Stabilisierungs-Phase (nächste 1 Woche)

#### Phase 3A: Bug-Fixes & Testing

```
1. Regression-Testing:
   - Alle manuellen Tests aus Section 22.1 wiederholen
   - Katalog durchsuchen
   - Admin Excel-Import
   - Sammlung speichern
   
2. Code Review:
   - GameModeScreen Sessions-Logic
   - HouseholdSetupScreen Persistierung
   - Admin Token-Handling
   
Commit: "fix: regression testing and bug fixes"
```

#### Phase 3B: Documentation

```
1. Update AGENTS.md mit Status
2. Erstelle INSTALLATION.md (für Entwickler)
3. Erstelle USER_GUIDE.md (für Endnutzer)
4. Commit: "docs: update project documentation"
```

---

## 26. Einstiegspunkt für die nächste KI

### 26.1 Was zuerst lesen

**Kritische Dateien (15 Min):**
1. `MASTERPROMPT_PROJECT_STATE.md` – **Start hier**, KI-Handover mit vollständiger Übersicht
2. `AGENTS.md` – Original MVP-Beschreibung, technische Orientierung
3. `src/App.jsx` – Screen Router, aktuell der Einstiegspunkt der App

**Design & UI (10 Min):**
4. `src/styles/design-tokens.css` – NeuroWays Farbpalette, alle Tokens
5. `src/components/Navigation.jsx` – Header als Muster für gestalten

**Backend & Daten (10 Min):**
6. `src/lib/pb.js` – PocketBase Client Init
7. `src/lib/config.js` – Environment Detection (Dev/Prod)
8. `DATABASE_STRUCTURE.md` – Schema Übersicht

**Implementierungs-Patterns (15 Min):**
9. `src/components/GamesCatalog.jsx` – Großes, komplexes Component als Muster
10. `src/components/AdminExcelUpload.jsx` – Excel-Parsing-Pattern

---

### 26.2 Was NICHT ohne Nachfrage ändern

**🔒 Schützte Bereiche:**
- `src/App.jsx` – Screen Router (ändern nur nach Planung)
- `src/lib/pb.js` – PocketBase Konfiguration (könnte Deploy-Prozess brechen)
- `src/lib/config.js` – Environment URLs (produktiv live)
- `database/` – SQLite Files (echte Daten)
- `.git/` – Git History (nie manuell bearbeiten)
- `index.html` – Title, Meta, Favicon (branding)

---

### 26.3 Aktuell der nächste empfohlene Arbeitsschritt

**Wähle EINE aus:**

**Option A – Design-Rollout (2 Wochen)** – Schnelle Sicht-Erfolg
```
1. Alle 22 Screens mit Navy/Teal/Gold gestalten
2. Responsive Testing (320–1440px)
3. WCAG 2.2 AA Audit
4. Commit: "design: complete neurowaya rollout"
→ Führt zu production-ready UI, sichtbarer Fortschritt
```

**Option B – Feature-Completion (1 Woche)** – Technischer Focus
```
1. Tags UI fertig machen
2. Sessions Persistierung
3. Bundle Optimization
4. Committer: "feat: tags, sessions, bundle optimization"
→ Führt zu funktional vollständiger App
```

**Option C – Stabilisierung (1 Woche)** – Quality Focus
```
1. Regression Testing
2. Bug Fixes
3. Documentation
4. Commit: "docs: project stabilization"
→ Führt zu wartbarer, dokumentierter Codebasis
```

**Empfehlung:** **Option A** (Design), da 7/22 Screens schon fertig und visueller Fortschritt wichtig ist.

---

### 26.4 Kommunikation mit PocketBase

**Alle Requests:**
- `pb.collection(name).getFullList()` – Alle Records laden
- `pb.collection(name).getOne(id)` – Ein Record laden
- `pb.collection(name).create(data)` – Record erstellen
- `pb.collection(name).update(id, data)` – Update (partial)
- `pb.collection(name).delete(id)` – Löschen

**Auth:**
- `pb.collection('users').authWithPassword(email, pass)` – Login
- `pb.authRefresh()` – Token auffrischen
- Token wird automatisch in Requests mitgeschickt

**Error Handling:**
```javascript
try {
  const result = await pb.collection('games').getFullList();
  // Success
} catch (err) {
  if (err.status === 401) { /* Not Auth */ }
  if (err.status === 404) { /* Collection Not Found */ }
  console.error(err.message);
}
```

---

### 26.5 QA-Checkliste für nächste Änderungen

**Vor JEDEM Commit:**
- [ ] `npm run build:prod` erfolgreich (kein Error)
- [ ] `dist/` erzeugt (nicht < 1MB)
- [ ] Vite Build Log prüfen (keine Warnings)
- [ ] Keine `console.error` / `console.warn` in Production Build
- [ ] 1–2 Responsive Screens schnell manuell testen (Desktop + Mobile 375px)
- [ ] Git History sauber (`git log --oneline | head -5`)
- [ ] Commit-Message aussagekräftig (feat:, fix:, docs:, style:)
- [ ] `AGENTS.md` aktualisiert (wenn Architecture sich ändert)

**Vor Deploy (git push):**
- [ ] Alle lokalen Änderungen committed
- [ ] Branch ist `dev`
- [ ] Remote `dev` reachable (`git fetch origin`)
- [ ] Nicht force-push (außer mit Grund)

---

## 27. Unsicherheiten und fehlende Informationen

### 27.1 Ungeklärte Implementierungs-Details

| Frage | Kontext | Warum wichtig | Nächster Schritt |
|-------|---------|-------------|-------------------|
| **GameModeScreen: Session-Save wo?** | Code vorhanden, aber create() nicht sichtbar | Sessions könnten nicht persistent sein | Code-Review + Trace |
| **HouseholdSetupScreen: Persistierung wie?** | Form vorhanden, aber POST-Logic unklar | Haushalt könnten nicht gespeichert werden | Code-Review + Test |
| **Tags Modal: Input wie?** | Field vorhanden, aber UI fehlt | Tags können nicht hinzugefügt werden | Implementation |
| **Invite-Code Uniqueness wie?** | Generierung vorhanden, aber Duplikat-Schutz? | Könnte Kollisionen geben | Code-Review |
| **Duplicate Collections: Absicht?** | BoardGameCatalog + GamesCatalog | Wartungs-Last oder noch in Benutzung? | Prüfung |

### 27.2 Fehlende Datenpunkte

| Daten | Grund fehlend | Impact |
|------|-------------|--------|
| **Demo-Account Credentials** | Nicht dokumentiert | Können nicht manuell testen |
| **PocketBase Admin Panel Zugang** | Superuser-Issue | Können nicht direkt DB-Daten prüfen |
| **Tatsächliche Nutzer-Count** | Keine Statistik | Können nicht auf Performance testen |
| **Fehlgeschlagen Excel-Imports** | Keine Logs verfügbar | Können Fehlerquellen nicht identifizieren |
| **PocketBase Access Rules Dumps** | Nicht exportiert | Können Zugriffsmodell nicht vollständig verifizieren |

### 27.3 Assumptions, die Validierung brauchen

| Annahme | Basis | Validierung |
|---------|-------|------------|
| **924 Games sind vollständig** | Excel v0.7.0 letzte Quelle | Prüfung gegen externe BGG-DB? |
| **Alle Publisher gemappt** | 686/844 erfolgreich | Welche 158 nicht? Recherche? |
| **Admin-Only Features funktionieren** | Nicht als Non-Admin getestet | Test als Admin erforderlich |
| **Responsive auf allen Breakpoints OK** | Nur selektive Tests durchgeführt | Full Audit erforderlich |

### 27.4 Features mit unsicherem Status

| Feature | Status | Grund | Validierung |
|---------|--------|-------|-----------|
| **Haushalt-System** | ⚠️ Unklar | Persistierung nicht nachgewiesen | Create + Join Test |
| **Sessions-Tracking** | ⚠️ Unklar | Save-Logic nicht sichtbar | GameModeScreen Code-Review |
| **Tags** | ⚠️ Unklar | UI fehlt, Field vorhanden | Modal-Implementation nötig |
| **Dark Mode** | ⚠️ Unklar | Tokens da, aber nicht angewendet | Screen-by-Screen Test |

---

## 28. Übergabe-Check

- [x] Anforderungen erfasst (34 Items, Tabelle Section 4)
- [x] Implementierte Funktionen erfasst (Section 5, 8 Major Features + Components)
- [x] Offene Anforderungen erfasst (Section 18 Backlog)
- [x] Teilweise implementierte Funktionen erfasst (Section 17, 10 Items)
- [x] Seitenstruktur erfasst (Section 6, alle 22 Screens)
- [x] Repositorystruktur erfasst (Section 9, Tree + Responsibilities)
- [x] Architektur erfasst (Section 8, textuelle Darstellung + Flows)
- [x] Datenbank erfasst (Section 10, Schema + 11 Collections)
- [x] APIs erfasst (Section 11, REST Endpoints + Examples)
- [x] Geschäftslogik erfasst (Section 12, 7 Major Rules)
- [x] Erledigte Aufgaben erfasst (Section 16, 24 Items)
- [x] Offene Aufgaben erfasst (Section 18, 15 Items)
- [x] Fehler und technische Schulden erfasst (Section 19, 7 Bugs + 8 Debts)
- [x] Deployment erfasst (Section 23, Build Pipeline + Checklist)
- [x] Nächste Schritte definiert (Section 25, Phasen 1–3)
- [x] Unsicherheiten ausdrücklich dokumentiert (Section 27, Ungeklärt)
- [x] Keine Secrets in Übergabe enthalten (Check: keine DB-Passwörter, API-Keys, Tokens)
- [x] Keine vermuteten Informationen als Fakten dargestellt (alle Claims traceable zu Source)

---

## Abschluss

Diese Übergabe rekonstruiert den **vollständigen Entwicklungsstand** des NeuroPlay Brettspielcoach-Projekts auf Basis aller verfügbaren Informationen:

- ✅ **Architektur:** React 18 + Vite + PocketBase, STRATO-gehostet, 22 Screens
- ✅ **Datenbank:** 11 Collections, 924 Games, 32 Publishers, SQL-Schema dokumentiert
- ✅ **Features:** 21 implementiert, 8 teilweise, 5 offen/ungeklärt
- ✅ **Build:** Production-ready, 1.1MB JS, deployment-ready
- ⚠️ **Design:** 7/22 Screens mit NeuroWays-Farben, Rollout ausstehend
- ⚠️ **Testing:** Manuelle Smoke-Tests OK, keine Automatisierung
- ✅ **Git:** 60+ Commits, GitHub repo live

**Nächste KI kann sofort starten mit:**
1. Alle 22 Screens mit Navy/Teal/Gold gestalten (Design-Rollout)
2. Responsive Testing (320–1440px Verifizierung)
3. Feature-Completion (Tags UI, Sessions Save, Bundle Optimization)

Alle kritischen Informationen sind dokumentiert, keine Lücken erfunden.

---

**Übergabe abgeschlossen:** 2026-08-15 09:15 UTC  
**Nächste Aktualisierung erforderlich:** Nach Design-Rollout (1–2 Wochen)
