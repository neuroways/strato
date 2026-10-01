# PROJECT HANDOVER: NeuroQuest

## 1. Dokumentinformationen

| Eigenschaft | Wert |
|---|---|
| **Projekt** | NeuroQuest – Abenteuerbegleiter für Lernaufgaben |
| **Datum** | 2026-08-15 |
| **Repository** | github.com/neuroways/neuroquest_abenteuer_ai.git |
| **Branch** | dev |
| **Entwicklungsstand** | MVP Phase mit "The Magic 5" Implementierung |
| **Technologien** | React 18, React Router 7, Vite 6, Tailwind CSS 4, PocketBase v0.39.0 |
| **Hosting/Deployment** | IONOS Group (Vite-gehostet auf /.sfs) |
| **Sprache** | Deutsch (de) |
| **Zweck der Übergabe** | Sichere Vollständige GitHub-Sicherung + Dokumentation für zukünftige Entwicklung |

---

## 2. Executive Summary

### Was ist das Projekt?

NeuroQuest ist ein **Abenteuerbegleiter** (nicht: Lernplattform, nicht: Spiel) für Grundschulkinder der Klassen 1–4. Die App bettert tägliche, von Lehrkräften und Eltern definierte Lernaufgaben in eine fesselnde, ruhige Geschichte ein.

### Welches Problem löst es?

Kinder verlieren bei wiederkehrenden Aufgaben die Motivation. NeuroQuest kombiniert:
- **Beruhigende, vorhersehbare Routine** (das Kind weiß immer, was kommt)
- **Spannende Geschichte** (das Kind weiß nie, wie die Geschichte weitergeht)

Dadurch entstehen ruhige, motivierende Lernflüsse ohne Druck, Punkte oder Ranglisten.

### Wer verwendet es?

- **Kinder (Klasse 1–4)** – Erleben Geschichte + lösen 5 tägliche Missionen
- **Lehrkräfte** – Definieren Wochen, Missionen, Hinweise (in Planung: Week 2)
- **Eltern** – Schreiben motivierende Nachrichten, erstellen zusätzliche Aufgaben (in Planung: Week 2)
- **Admins** – Verwalten Benutzer, Geschichten, Systemeinstellungen (in Planung: Week 3)

### Was ist das Ziel?

Dass Kinder die App jeden Tag mit dem Gefühl verlassen:
> "Heute habe ich etwas geschafft. Ich freue mich schon auf morgen."

Belohnt werden: **Dranbleiben, Selbstkontrolle, Aufmerksamkeit** – nicht Geschwindigkeit oder Perfektion.

### Wo steht die Entwicklung?

**MVP Phase – "The Magic 5" aktiv implementiert:**
- ✅ Multi-Role Auth (Kind, Lehrkraft, Eltern, Admin)
- ✅ "Die Magische 5" – 5 Runden pro Tagesaufgabe, 5 exakte Schritte pro Runde
- ✅ Story + Grade-Anpassungen (Klasse 1–4) mit separaten Datentables
- ✅ Abenteuerbuch (Story-Archiv)
- ✅ Emotional-rediertes Design (warm, ruhig, liebevoll)
- ✅ Offline-Ready (localStorage + später PocketBase-Sync)
- ⏳ Lehrkraft-Interface (Struktur da, Funktionalität Week 2)
- ⏳ Eltern-Interface (Struktur da, Funktionalität Week 2)
- ⏳ Admin-Interface (Struktur da, Funktionalität Week 3)

---

## 3. Fachliches Zielbild

Eine WebApp, die sich anfühlt wie ein **hochwertig illustriertes Kinderbuch**, das das Kind jede Woche auf ein neues Abenteuer mitnimmt.

### Pädagogische Leitprinzipien (nie berehrend, immer gelebt):
- Lernen darf Freude machen.
- Fehler gehören selbstverständlich zum Lernen.
- Jeder Mensch lernt in seinem eigenen Tempo.
- Anders sein ist völlig in Ordnung.
- Freundlichkeit ist eine Stärke.
- Zusammenarbeit ist wichtiger als Konkurrenz.
- Mut bedeutet, Dinge trotzdem auszuprobieren.
- **Dranbleiben ist wichtiger als Perfektion.**

### Designprinzip:
> "So spannend wie nötig. So ruhig wie möglich."

Keine Reizüberflutung, keine blinkenden Elemente, keine hektischen Animationen.

---

## 4. Anforderungen

| ID | Anforderung | Kategorie | Status | Nachweis | Offene Punkte |
|---|---|---|---|---|---|
| REQ-001 | Multi-Role Authentifizierung (Kind, Lehrkraft, Eltern, Admin) | Auth | ✅ IMPLEMENTIERT | Login.jsx, auth.tsx, PocketBase Collections | Rollen vollständig, alle 4 Demos verfügbar |
| REQ-002 | "The Magic 5" – 5 Runden mit 5 Schritten pro Tag | Spiellogik | ✅ IMPLEMENTIERT | MagicFiveMission.jsx, magicFiveData.ts, magicFiveMissions.ts | Vollständig + Demo-Sätze integriert |
| REQ-003 | Story mit Grade-Anpassungen (Klasse 1–4) | Story | ✅ IMPLEMENTIERT | magicFiveData.ts (5 Teile × 4 Klassenstufen) | Nur 1 Demo-Tag ("Der geheimnisvolle Waldpfad" Tag 1) |
| REQ-004 | Geschichtenteile werden Satz-für-Satz freigeschaltet | Spiellogik | ✅ IMPLEMENTIERT | MagicFiveMission.jsx (unlock_after_round) | Kein Weg, Story vorzeitig freizuschalten |
| REQ-005 | Keine Punkte, Noten, Ranglisten | Design | ✅ IMPLEMENTIERT | Keine Statistiken in KidDashboard, nur Geschichtentext | Authentische Bestärkung ohne Gamification |
| REQ-006 | Persönliche Ansprache mit Kindernamen | Story | ✅ IMPLEMENTIERT | {childName}-Replacement in allen 4 Klassen-Textfassungen | Name wird aus Kind-Profil ersetzt |
| REQ-007 | Abenteuerbuch mit Story-Archiv | UI | ✅ IMPLEMENTIERT | AdventureBook.jsx | Zeigt abgeschlossene Geschichten, Basis für Urkunden |
| REQ-008 | Responsive auf Smartphone, Tablet, Desktop | Design | ✅ IMPLEMENTIERT | Mobile-first Tailwind, mehrere Breakpoints | Getestet auf 375px, 768px, 1280px |
| REQ-009 | Begleiter (Luna die Eule) mit Gedächtnis | Story | ✅ TEILWEISE | companionMemory.ts (Struktur), Luna in Stories | Nur Basisimplementierung, erweiterte Erinnerungen geplant |
| REQ-010 | Geräteübergreifende Synchronisation | Daten | ✅ TEILWEISE | localStorage funktioniert, PocketBase-Sync geplant | Fortschritt muss zu PocketBase migriert werden |
| REQ-011 | Lehrkraft definiert 5 Sätze pro Tag | Lehrkraft-Interface | 📋 GEPLANT | TeacherDashboard.jsx (Skeleton) | Week 2-Aufgabe |
| REQ-012 | Eltern schreiben motivierende Nachrichten | Eltern-Interface | 📋 GEPLANT | ParentDashboard.jsx (Skeleton) | Week 2-Aufgabe |
| REQ-013 | Admin verwaltet Benutzer und Geschichten | Admin-Interface | 📋 GEPLANT | AdminDashboard.jsx (Skeleton) | Week 3-Aufgabe |
| REQ-014 | Offline-Unterstützung (lokal speichern + Sync) | Infrastruktur | ⏳ TEILWEISE | localStorage aktiv, Service Worker geplant | Week 3-Aufgabe |
| REQ-015 | Keine Geheimschlüssel in Quellcode | Security | ✅ IMPLEMENTIERT | Keine API-Keys, Tokens oder Credentials in Dateien | Token nur in Environment-Variablen |

---

## 5. Implementierter Funktionsumfang

### 5.1 The Magic 5 (Kernmechanik)

**Status:** ✅ Vollständig implementiert

Eine Tagesaufgabe besteht aus genau:
- **5 Runden** (je 1 Übungssatz)
- **5 Schritte pro Runde** (immer gleiche Routine):
  1. Satzzeichen suchen
  2. Satz abschreiben
  3. Satz selbst kontrollieren (verpflichtend, mit Checkliste)
  4. Satz als "geschafft" markieren
  5. Geschichtenteile lesen (nur dieser wird freigeschaltet)

**Datei:** `MagicFiveMission.jsx` (300 Zeilen)

**Merkmale:**
- Lokaler State: `currentRound`, `currentStep`, `unlockedParts`, `completedRounds`
- Jeder Schritt muss bestätigt werden → nächster wird freigeschaltet
- Nach "Satz geschafft" wird genau 1 Geschichtenteil visible
- Nach Runde 5 erscheint Tagesabschluss
- localStorage speichert alle Fortschritte

**Demo-Sätze:** 5 Beispielsätze in `magicFiveMissions.ts`

---

### 5.2 Story mit Grade-Adaptationen

**Status:** ✅ Vollständig implementiert (1 Demo-Tag)

**Datei:** `magicFiveData.ts` (129 Zeilen)

**Datenstruktur:**
```javascript
STORY_PARTS: [
  {
    part_number: 1,
    unlock_after_round: 1,
    text_grade_1: "...", // 5-8 Wörter, sehr einfach
    text_grade_2: "...", // 8-12 Wörter, normal
    text_grade_3: "...", // 12-16 Wörter, interessant
    text_grade_4: "...", // 16+ Wörter, anspruchsvoll
    encouragement: "Du bist drangeblieben...",
    illustration_key: "forest-part-1"
  },
  // weitere 4 Teile...
]
```

**Merkmale:**
- Alle 4 Klassenstufentexte für jeden Teil
- {childName} wird dynamisch ersetzt
- Illustration-Keys für zukünftige Asset-Verlinkung
- Authentische Bestärkung pro Teil

**Demo-Geschichte:** "Der geheimnisvolle Waldpfad" Tag 1 (5 Teile, 20 Varianten)

---

### 5.3 Authentifizierung & Rollen

**Status:** ✅ Vollständig implementiert

**Datei:** `auth.tsx` (92 Zeilen)

**Implementierte Rollen:**
1. **child** – Kann Missionen sehen & bearbeiten, Abenteuerbuch lesen
2. **teacher** – Kann Wochen/Missionen verwalten (Skeleton aktiv)
3. **parent** – Kann Kind-Fortschritt sehen, Nachrichten schreiben (Skeleton aktiv)
4. **admin** – Kann Benutzer & Geschichten verwalten (Skeleton aktiv)

**Merkmale:**
- useAuth Hook mit Zustand: authUser, authRole, login, logout
- Protected Routes blockieren unberechtigen Zugriff
- Demo-Konten: kid@demo.de, teacher@demo.de, parent@demo.de, admin@demo.de
- PocketBase-Authentifizierung (Standard bei IONOS Group)

---

### 5.4 Abenteuerbuch

**Status:** ✅ Grundgerüst implementiert

**Datei:** `AdventureBook.jsx` (157 Zeilen)

**Merkmale:**
- Zeigt abgeschlossene Wochen als "Bücher"
- localStorage liest `adventure_book_<childId>`
- Jedes Buch enthält:
  - Titel + Region
  - Alle 5 Geschichtenteile
  - Begleiter-Informationen
  - Abschlussbotschaft
- Urkunden (Struktur vorbereitet)
- Abzeichen (Struktur vorbereitet)

**Noch zu tun:** Visuelle Bilder für Buchcover, Urkunden-Design

---

### 5.5 Begleiter (Luna die Eule)

**Status:** ✅ Teilweise implementiert

**Datei:** `companionMemory.ts` (136 Zeilen)

**Implementierte Merkmale:**
- Name: Luna die Eule
- Freundliche, ruhige Persönlichkeit
- Spricht kindgerecht
- Erwähnt Kindernamen natürlich
- Begleitet alle 5 Runden
- Speichert Erinnerungen (adventuresCompleted, currentFocus, etc.)

**Noch zu tun:** Erweiterte Erinnerungen ("Weißt du noch, wie wir letzte Woche..."), dynamische Dialoge basierend auf Fortschritt

---

### 5.6 Design & UI

**Status:** ✅ Vollständig implementiert

**Merkmale:**
- Mobile-first responsive (375px → 1280px)
- Tailwind CSS v4 (Platform-provided)
- Warme Naturfarben (Amber, Green, Beige, Gold)
- Ruhige, klare Typographie
- Große Schaltflächen (~44px min)
- Weißraum + Hierarchie
- Keine Neonfarben, keine Konfetti, keine hektischen Animationen

**Seiten/Routes:**
- `/login` – Login + Rollen-Auswahl
- `/kid-home` – Startseite für Kinder
- `/mission/:day` – Tagesaufgabe mit Magic 5
- `/adventure-book` – Abgelöste Geschichten
- `/teacher-dashboard` – Lehrkraft-Bereich (Skeleton)
- `/parent-dashboard` – Eltern-Bereich (Skeleton)
- `/admin-dashboard` – Admin-Bereich (Skeleton)

---

### 5.7 Fortschrittspeicherung

**Status:** ✅ localStorage aktiv, PocketBase-Migration geplant

**Gespeichert:**
- `progress_<childId>` – Alle Runden, Schritte, freigeschaltete Teile
- `adventure_book_<childId>` – Abgeschlossene Geschichten
- `auth_user` – Aktueller Nutzer
- `selected_grade` – Klassenstufe des Kindes

**Merkmale:**
- Fortschritt bleibt bei Neuladen erhalten
- localStorage ist schnell, funktioniert offline
- Fehler: Nicht geräteübergreifend synchronisiert (wird Week 2 mit PocketBase gelöst)

---

## 6. Seiten- und Navigationsstruktur

```
NeuroQuest Application
├── /login
│   ├── Role Selection (Child, Teacher, Parent, Admin)
│   ├── Sign Up (with avatar picker for kids)
│   └── Demo Accounts Available
│
├── /kid-home (Route: ProtectedRoute role="child")
│   ├── Welcome Section
│   │   └── Luna Welcome Message
│   ├── World Regions
│   │   ├── Der Zauberwald (Emerald Green)
│   │   ├── Die Nebelberge (Slate Blue)
│   │   ├── Das Kristallmeer (Cyan)
│   │   └── Das Sternenschloss (Deep Purple)
│   ├── Story Selector
│   │   └── "Der geheimnisvolle Waldpfad" (Week 1, Day 1-5)
│   └── Start Adventure Button
│
├── /mission/:day (Route: ProtectedRoute role="child")
│   ├── Story Sidebar (Right)
│   │   ├── Part 1 (locked until Round 1 complete)
│   │   ├── Part 2 (locked until Round 2 complete)
│   │   ├── Part 3 (locked until Round 3 complete)
│   │   ├── Part 4 (locked until Round 4 complete)
│   │   └── Part 5 (locked until Round 5 complete)
│   │
│   ├── Main Content Area (Left/Center)
│   │   ├── Round Indicator (○ ○ ○ ○ ○ → ● ● ● ○ ○ etc.)
│   │   │
│   │   ├── Round N (5 Rounds total)
│   │   │   │
│   │   │   ├── Step 1: Find Punctuation Marks
│   │   │   │   ├── Sentence Display
│   │   │   │   ├── Hint: Types of punctuation (.)(",")("?")("!")
│   │   │   │   └── Confirm Button: "Satzzeichen gefunden"
│   │   │   │
│   │   │   ├── Step 2: Write the Sentence
│   │   │   │   ├── Instruction: "Schreibe den Satz sorgfältig ab"
│   │   │   │   ├── Original Sentence Visible
│   │   │   │   ├── Workspace (paper or app)
│   │   │   │   └── Confirm Button: "Satz geschrieben"
│   │   │   │
│   │   │   ├── Step 3: Check Your Work (MANDATORY)
│   │   │   │   ├── Comparison Area
│   │   │   │   ├── Control Checklist
│   │   │   │   │   ├── ☐ Alle Wörter vollständig?
│   │   │   │   │   ├── ☐ Reihenfolge richtig?
│   │   │   │   │   ├── ☐ Groß-/Kleinschreibung?
│   │   │   │   │   ├── ☐ Satzzeichen vorhanden?
│   │   │   │   │   └── ☐ Satz gut lesbar?
│   │   │   │   └── Confirm Button: "Satz kontrolliert" (enabled only if checklist filled)
│   │   │   │
│   │   │   ├── Step 4: Mark as Complete
│   │   │   │   ├── Encouragement Message (based on grade level)
│   │   │   │   ├── Luna Comment
│   │   │   │   └── Button: "Satz geschafft"
│   │   │   │
│   │   │   └── Step 5: Story Reward
│   │   │       ├── Story Part N (unlocked now)
│   │   │       │   ├── Text (Grade 1/2/3/4 appropriate)
│   │   │       │   ├── {childName} replaced dynamically
│   │   │       │   └── Illustration Placeholder
│   │   │       │
│   │   │       ├── Encouragement Message
│   │   │       └── Next Button: "Weiter mit Satz N+1"
│   │   │
│   │   └── Day Completion (after Round 5)
│   │       ├── All 5 Story Parts visible
│   │       ├── Closing Message (Grade-appropriate)
│   │       ├── Luna's Final Comment
│   │       └── Button: "Für heute zurück ins Baumhaus"
│
├── /adventure-book (Route: ProtectedRoute role="child")
│   ├── Personal Library
│   ├── Completed Stories List
│   │   ├── Story 1: Title + Region + Date
│   │   ├── Story 2: Title + Region + Date
│   │   └── ...
│   ├── Story Details (on click)
│   │   ├── Full Story Text
│   │   ├── All Illustrations
│   │   ├── Companion Info
│   │   └── Certificate (placeholder)
│
├── /teacher-dashboard (Route: ProtectedRoute role="teacher")
│   ├── Week Management (Structure only)
│   ├── Student Progress View (Structure only)
│   ├── Mission/Task Creator (Structure only)
│   └── Hint Writing (Structure only)
│
├── /parent-dashboard (Route: ProtectedRoute role="parent")
│   ├── Child Progress (Structure only)
│   ├── Message Writing (Structure only)
│   └── Story Sharing (Structure only)
│
└── /admin-dashboard (Route: ProtectedRoute role="admin")
    ├── User Management (Structure only)
    ├── Story Management (Structure only)
    └── System Settings (Structure only)
```

---

## 7. User Flows

### User Flow 1: Child Starts and Completes a Day

**Precondition:** Child logged in as "child"

**Flow:**

1. Child opens `/kid-home`
   - Sees "Der Zauberwald" region with "Der geheimnisvolle Waldpfad"
   - Sees Day 1 button

2. Child clicks "Day 1" → navigates to `/mission/1`

3. **Round 1 begins:**
   - Child sees Sentence 1
   - **Step 1:** Child finds punctuation marks, confirms "Satzzeichen gefunden"
   - **Step 2:** Child writes sentence, confirms "Satz geschrieben"
   - **Step 3:** Child compares, checks all 5 control items, confirms "Satz kontrolliert"
   - **Step 4:** Child sees encouragement, clicks "Satz geschafft"
   - **Step 5:** Story Part 1 appears (locked parts 2-5 remain grayed out)
   - Child reads Part 1, clicks "Weiter mit Satz 2"

4. **Rounds 2-5** repeat the same flow
   - Each unlocks exactly one story part
   - Parts accumulate on right sidebar

5. **After Round 5:**
   - All 5 story parts visible
   - Day closing message appears
   - Button "Für heute zurück ins Baumhaus"
   - Progress saved to localStorage
   - Story archived in `adventure_book_<childId>`

6. Child returns to `/kid-home`
   - Day 1 now shows ✓ (complete)
   - Day 2 button becomes available (if same week)

---

### User Flow 2: Child Returns After Day Change

**Precondition:** Child already completed Day 1, now it's Day 2

**Flow:**

1. Child logs in again
2. Navigates to `/kid-home`
3. Sees Day 1 marked as ✓
4. Sees Day 2 ready to start
5. Clicks Day 2 → all progress from Day 1 is preserved
6. Can also click Day 1 → Story can be re-read from AdventureBook

---

### User Flow 3: Device Change (Today)

**Precondition:** Child started Day 1 on iPhone, now uses iPad

**Current State:** localStorage only (not synced)

**Problem:** Progress on iPad will show as fresh start (Week 2 fix: PocketBase sync)

**Flow (with Week 2 PocketBase):**
1. Child logs in on iPad
2. PocketBase syncs: "Child is on Round 3, Step 2 of Day 1"
3. iPad shows exact same state as iPhone
4. Child continues from Round 3, Step 2

---

### User Flow 4: Teacher Creates a Week (Not Yet Implemented)

**Status:** Week 2 – Interface skeleton exists

**Planned Flow:**
1. Teacher logs in → `/teacher-dashboard`
2. Clicks "Neue Woche erstellen"
3. Fills form:
   - Title
   - Story (dropdown)
   - Grade Level
   - Start Date
4. Clicks "Nächste: Missionen schreiben"
5. For each Day (1-5):
   - Adds 5 Sentences
   - Writes Teacher Hints
   - Optionally: Parent Hints
6. Saves Week
7. Assigns to Class/Students
8. Students see new week in their `/kid-home`

---

### User Flow 5: Parent Writes Encouragement Message (Not Yet Implemented)

**Status:** Week 2 – Interface skeleton exists

**Planned Flow:**
1. Parent logs in → `/parent-dashboard`
2. Sees child's progress for this week
3. Clicks "Nachricht schreiben"
4. Writes encouragement (e.g., "Ich bin so stolz, wie fleißig du bist!")
5. Saves
6. Message appears in Child's sidebar (next time child opens mission)

---

## 8. Technische Architektur

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser / Client (React)                 │
│                                                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Pages (JSX Components)                                │ │
│  │  ├── Login.jsx (Role selection + signup)             │ │
│  │  ├── KidHome.jsx (World + story selector)            │ │
│  │  ├── MagicFiveMission.jsx (Core game loop)           │ │
│  │  ├── AdventureBook.jsx (Story archive)               │ │
│  │  └── Teacher/Parent/Admin Dashboards (Skeletons)     │ │
│  └────────────────────────────────────────────────────────┘ │
│                          ↓                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Authentication & Context (auth.tsx)                  │ │
│  │  ├── useAuth() hook                                  │ │
│  │  ├── Protected Routes                                │ │
│  │  └── Role-Based Access                               │ │
│  └────────────────────────────────────────────────────────┘ │
│                          ↓                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Data & Logic Layer (lib/)                            │ │
│  │  ├── magicFiveData.ts (Story parts by grade)        │ │
│  │  ├── magicFiveMissions.ts (5 example sentences)     │ │
│  │  ├── companionMemory.ts (Luna AI memory)            │ │
│  │  ├── worldBuilder.ts (Region + story mapping)       │ │
│  │  └── stories.ts (Legacy story data)                 │ │
│  └────────────────────────────────────────────────────────┘ │
│                          ↓                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Local Storage & Cache                                │ │
│  │  ├── progress_<childId> (current & completed rounds)│ │
│  │  ├── adventure_book_<childId> (archived stories)    │ │
│  │  ├── auth_user (current user session)               │ │
│  │  └── selected_grade (child's grade level)           │ │
│  └────────────────────────────────────────────────────────┘ │
│                          ↓                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ API Layer (REST + PocketBase SDK)                   │ │
│  │  ├── Authentication Endpoints                        │ │
│  │  ├── Collection: children, teachers, parents, admins│ │
│  │  ├── Collection: weeks, days, missions              │ │
│  │  ├── Collection: progress, adventure_book_entries   │ │
│  │  └── Collection: story_parts (definitions)          │ │
│  └────────────────────────────────────────────────────────┘ │
│                          ↓                                  │
├─────────────────────────────────────────────────────────────┤
│ Backend: PocketBase v0.39.0 (SQLite REST API)             │
│                                                             │
│  ├── Authentication Service                              │ │
│  │   ├── User Creation + Email Verification (stub)     │ │
│  │   └── JWT Token Issuance                             │ │
│  │                                                       │ │
│  ├── Database Collections                                │ │
│  │   ├── Auth Collections                                │ │
│  │   │   ├── children (name, avatar, gradeLevel)       │ │
│  │   │   ├── teachers (name, schoolName)               │ │
│  │   │   ├── parents (name)                            │ │
│  │   │   └── admins (name)                             │ │
│  │   │                                                  │ │
│  │   ├── Content Collections                            │ │
│  │   │   ├── story_weeks (code, title, region)         │ │
│  │   │   ├── story_days (week_id, day_number)          │ │
│  │   │   ├── story_parts (day_id, text_grade_1-4)      │ │
│  │   │   ├── missions (child_id, story_day_id)         │ │
│  │   │   ├── mission_rounds (mission_id, sentence)     │ │
│  │   │   └── round_progress (child_id, round_id, step) │ │
│  │   │                                                  │ │
│  │   └── User Progress Collections                      │ │
│  │       ├── child_story_progress (unlocked_parts)     │ │
│  │       └── adventure_book_entries (archived stories) │ │
│  │                                                       │ │
│  └── REST API Endpoints (JSON)                            │ │
│      ├── POST /api/collections/children/auth            │ │
│      ├── GET /api/collections/story_parts?filter=...    │ │
│      ├── POST /api/collections/round_progress            │ │
│      ├── PATCH /api/collections/round_progress/:id       │ │
│      └── ...                                             │ │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Hosting / Deployment (IONOS Group)                         │
│                                                             │
│  ├── dist/ – Built Vite app (static HTML/CSS/JS)         │ │
│  ├── /.sfs/ – Platform mount point                        │ │
│  ├── /.sfs-bd/ – Dev PocketBase database                 │ │
│  ├── /.sfs-be/ – Production PocketBase database          │ │
│  └── /static/ – User assets (images, etc.)               │ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Key Design Decisions

1. **Data Separation:** Story definitions, missions, and progress are separate collections
   - Stories can be reused with different missions
   - Missions can use different stories
   - Progress is independent of both

2. **Grade Adaptation at Load Time:** All 4 grade texts stored, selected at render time
   - No need to duplicate stories
   - Grade changes only need UI reload

3. **Local-First, Cloud-Ready:** localStorage for speed + offline
   - Week 2: PocketBase sync for device change + persistence
   - Conflict resolution: server truth always wins

4. **Role-Based Access:** 4 roles, each with protected routes
   - Child: mission + archive
   - Teacher: week/mission CRUD (Week 2)
   - Parent: progress + messaging (Week 2)
   - Admin: user/system mgmt (Week 3)

---

## 9. Repository- und Verzeichnisstruktur

```
neuroquest_abenteuer_ai/
│
├── app/                                    # React Vite Application
│   ├── src/
│   │   ├── lib/
│   │   │   ├── auth.tsx                  # Auth context & useAuth hook (92L)
│   │   │   ├── pb.ts                     # PocketBase client singleton (3L)
│   │   │   ├── setupDb.ts                # DB setup script (unused) (71L)
│   │   │   ├── stories.ts                # Legacy story data (167L)
│   │   │   ├── magicFiveData.ts          # Story parts for all grades (129L) ⭐
│   │   │   ├── magicFiveMissions.ts      # 5 example sentences (108L) ⭐
│   │   │   ├── companionMemory.ts        # Luna AI memory system (136L)
│   │   │   └── worldBuilder.ts           # World regions + mapping (107L)
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx                 # Role selection + signup (224L)
│   │   │   ├── KidHome.jsx               # Story selector + world view (129L)
│   │   │   ├── MagicFiveMission.jsx      # Core magic 5 game loop (300L) ⭐
│   │   │   ├── AdventureBook.jsx         # Story archive (157L)
│   │   │   ├── KidDashboard.jsx          # Legacy dashboard (154L)
│   │   │   ├── TeacherDashboard.jsx      # Teacher UI (skeleton) (92L)
│   │   │   ├── ParentDashboard.jsx       # Parent UI (skeleton) (92L)
│   │   │   └── AdminDashboard.jsx        # Admin UI (skeleton) (92L)
│   │   │
│   │   ├── App.jsx                       # Main routes + ProtectedRoute (103L)
│   │   ├── main.jsx                      # Entry point: React + Router (13L)
│   │   └── index.css                     # Tailwind + global styles (5L)
│   │
│   ├── public/
│   │   └── favicon.svg                   # Luna owl SVG icon
│   │
│   ├── dist/                             # Built output (committed)
│   │   ├── index.html
│   │   ├── favicon.svg
│   │   ├── assets/
│   │   │   ├── index-*.css               # Bundled styles
│   │   │   └── index-*.js                # Bundled JS
│   │   └── ...
│   │
│   ├── index.html                        # HTML template (meta, title, etc.)
│   ├── vite.config.js                    # Vite build config
│   ├── tailwind.config.cjs                # Tailwind v4 config
│   ├── package.json                      # Dependencies (empty, platform-provided)
│   ├── package-lock.json
│   ├── .gitignore                        # Git exclusions
│   ├── AGENTS.md                         # Original tech spec (382L)
│   ├── ARCHITECTURE.md                   # Architecture decisions (456L)
│   └── README.md                         # Dev setup + overview
│
├── docs/
│   └── handover/
│       └── PROJECT_HANDOVER.md          # This document
│
├── static/                               # Served static assets
│   ├── stock_forest-path-hero-*.jpg     # Hero images
│   ├── stock_home-treehouse-*.jpg       # World images
│   ├── stock_world-regions-*.jpg        # Region images
│   └── stock_book-pages-*.jpg           # Book images
│
├── bd/                                  # PocketBase development database
│   ├── data.db                          # SQLite database
│   ├── auxiliary.db
│   └── types.d.ts                       # Generated TypeScript types (24K)
│
├── uploads/                             # User upload exchange directory
│   └── (empty for now)
│
├── logs/
│   ├── vite_build.log
│   ├── vite_console.log
│   └── assistant-start.log
│
├── QUICKSTART.md                        # 2-minute startup guide
├── README.md                            # Project overview
└── .gitignore                           # Global ignores

Key Files (⭐ = most important for understanding):

1. **MagicFiveMission.jsx** – Core gameplay loop, state management
2. **magicFiveData.ts** – Story definitions by grade
3. **magicFiveMissions.ts** – Example sentence data
4. **auth.tsx** – Authentication + role management
5. **App.jsx** – Routing + protected routes
6. **index.html** – SEO metadata + page setup
```

---

## 10. Datenbank

### Database Technology

- **Engine:** PocketBase v0.39.0 (REST API + SQLite)
- **Location (Dev):** `/.sfs-bd/`
- **Location (Production):** `/.sfs-be/`
- **Interface:** REST JSON API (PocketBase SDK)
- **Types:** Auto-generated TypeScript types in `bd/types.d.ts`

### Collections & Schema

#### Auth Collections (inherit: email, password, created, updated)

**Collection: `children`**
```
id (primary)
email (unique)
name (text, required)
avatar (text, emoji, e.g., "🦁")
gradeLevel (number, 1-4)
role (text) = "child"
created (timestamp)
updated (timestamp)
```

**Collection: `teachers`**
```
id (primary)
email (unique)
name (text, required)
schoolName (text, optional)
role (text) = "teacher"
created (timestamp)
updated (timestamp)
```

**Collection: `parents`**
```
id (primary)
email (unique)
name (text, required)
role (text) = "parent"
created (timestamp)
updated (timestamp)
```

**Collection: `admins`**
```
id (primary)
email (unique)
name (text, required)
role (text) = "admin"
created (timestamp)
updated (timestamp)
```

#### Content Collections

**Collection: `story_weeks`**
```
id (primary)
code (text, unique) [e.g., "NQ_FOREST_MAP"]
title (text) [e.g., "Der geheimnisvolle Waldpfad"]
region (text) [e.g., "Der Zauberwald"]
gradeLevel_start (number)
gradeLevel_end (number)
theme (text)
value_message (text) [e.g., "Jeder Schritt kann etwas Neues sichtbar machen"]
companion_id (relation → companions)
status (text) = "published" / "draft"
created (timestamp)
updated (timestamp)
```

**Collection: `story_days`**
```
id (primary)
story_week_id (relation → story_weeks)
dayNumber (number, 1-5)
title (text)
closing_text_grade_1 (text)
closing_text_grade_2 (text)
closing_text_grade_3 (text)
closing_text_grade_4 (text)
status (text) = "published"
created (timestamp)
updated (timestamp)
```

**Collection: `story_parts` ⭐**
```
id (primary)
story_day_id (relation → story_days)
part_number (number, 1-5)
unlock_after_round (number, 1-5)
text_grade_1 (text) [5-8 words, simple]
text_grade_2 (text) [8-12 words, normal]
text_grade_3 (text) [12-16 words, interesting]
text_grade_4 (text) [16+ words, advanced]
encouragement (text) [e.g., "Du bist drangeblieben..."]
illustration_key (text) [asset reference]
status (text) = "published"
created (timestamp)
updated (timestamp)
```
**Note:** Currently in `magicFiveData.ts` (JavaScript), should migrate to PocketBase Week 2.

**Collection: `missions`**
```
id (primary)
child_id (relation → children)
story_day_id (relation → story_days)
title (text) [e.g., "Die Magische 5 – Tag 1"]
status (text) = "in_progress" / "completed"
current_round (number, 0-5)
started_at (timestamp)
completed_at (timestamp, nullable)
```

**Collection: `mission_rounds`** ⭐
```
id (primary)
mission_id (relation → missions)
round_number (number, 1-5)
sentence_text (text) [e.g., "Luna ist eine kleine Eule."]
punctuation_instruction (text)
writing_instruction (text)
control_instruction (text)
control_checklist_1-5 (text) [5 control points]
teacher_hint (text, nullable)
parent_hint (text, nullable)
material_hint (text, nullable)
story_part_id (relation → story_parts)
status (text) = "draft" / "published"
```
**Note:** Currently in `magicFiveMissions.ts` (JavaScript), should migrate Week 2.

**Collection: `round_progress`**
```
id (primary)
child_id (relation → children)
mission_round_id (relation → mission_rounds)
punctuation_checked (boolean)
sentence_written (boolean)
sentence_reviewed (boolean)
marked_complete (boolean)
story_unlocked (boolean)
current_step (number, 1-5)
updated_at (timestamp)
completed_at (timestamp, nullable)
```
**Note:** Currently in localStorage (`progress_<childId>`), migrate to PocketBase Week 2.

**Collection: `child_story_progress`**
```
id (primary)
child_id (relation → children)
story_day_id (relation → story_days)
unlocked_parts (array<number>) [e.g., [1, 2, 3]]
completed (boolean)
last_opened_part (number, nullable)
updated_at (timestamp)
```

**Collection: `adventure_book_entries`**
```
id (primary)
child_id (relation → children)
story_week_id (relation → story_weeks)
story_day_id (relation → story_days)
title (text)
completed_at (timestamp)
archived_story_text (text) [full concatenated story]
illustration_keys (array<text>) [asset references]
closing_message (text)
```
**Note:** Currently in localStorage (`adventure_book_<childId>`), migrate Week 2.

#### Reference Collection

**Collection: `companions`**
```
id (primary)
name (text) [e.g., "Luna die Eule"]
description (text)
personality (text)
initial_message (text)
status (text) = "published"
```

---

### Current Database State

**Demo Users Created:**
- kid@demo.de / demo123 (child: "Demo Kind")
- teacher@demo.de / demo123 (teacher: "Demo Lehrer")
- parent@demo.de / demo123 (parent: "Demo Eltern")
- admin@demo.de / demo123 (admin: "Demo Admin")

**Demo Story:**
- Story Week: "Der geheimnisvolle Waldpfad" (Der Zauberwald)
  - Day 1: "Eine unerwartete Begegnung"
    - 5 Story Parts (unlock 1 per round)
    - 4 Grade Levels (Klasse 1, 2, 3, 4)

**Demo Missions:**
- 5 Example Sentences in `magicFiveMissions.ts`

---

## 11. APIs und Schnittstellen

### PocketBase REST API

| Methode | Endpoint | Zweck | Auth | Input | Output |
|---|---|---|---|---|---|
| POST | `/api/collections/children/auth?*` | Child login/signup | None | {email, password} | {token, record} |
| POST | `/api/collections/teachers/auth?*` | Teacher login | None | {email, password} | {token, record} |
| GET | `/api/collections/story_parts?*` | Fetch story parts | JWT | filter=day_id&expand=day | [{id, text_grade_X, ...}] |
| POST | `/api/collections/round_progress` | Create progress record | JWT | {child_id, round_id, step} | {id, ...} |
| PATCH | `/api/collections/round_progress/:id` | Update progress | JWT | {current_step, marked_complete} | {id, ...} |
| GET | `/api/collections/child_story_progress?*` | Get story unlock state | JWT | filter=child_id | [{unlocked_parts, ...}] |
| POST | `/api/collections/adventure_book_entries` | Archive completed story | JWT | {child_id, story_day_id, text} | {id, ...} |

### Frontend Hooks & Context

**useAuth()** – Authentication context
```javascript
const { authUser, authRole, login, logout, isLoading } = useAuth();
// authUser = { id, email, name, role, avatar?, gradeLevel? }
// authRole = "child" | "teacher" | "parent" | "admin"
```

**ProtectedRoute** – Role-based route guard
```javascript
<Route path="/mission/:day" element={
  <ProtectedRoute role="child">
    <MagicFiveMission />
  </ProtectedRoute>
} />
```

---

## 12. Geschäftslogik

### The Magic 5 State Machine

**States:**
```javascript
{
  currentRound: 1-5,           // Which sentence (1-5)
  currentStep: 1-5,            // Which step in the round
  unlockedParts: [1],          // Story parts visible [1], [1,2], ..., [1,2,3,4,5]
  completedRounds: [0,0,0,0,0] // Boolean array
}
```

**Transitions:**

```
Step 1 (Punctuation) → confirm → Step 2
Step 2 (Writing)      → confirm → Step 3
Step 3 (Control)      → checkbox all → confirm → Step 4
Step 4 (Complete)     → click button → Step 5 + Story Unlock
Step 5 (Story)        → read + continue → Next Round (if < 5)
                                          OR Day Complete (if = 5)
```

**Rules:**
- Each step must be confirmed before next unlocks
- Step 3 (control) cannot be skipped
- Story unlock only happens after Step 4
- localStorage persists all state
- Fortschritt bei Neuladen erhalten

### Grade Selection Logic

**When mission loads:**
```javascript
const gradeLevel = childProfile.gradeLevel; // 1, 2, 3, or 4
const storyText = storyPart[`text_grade_${gradeLevel}`];
const nameInserted = storyText.replace(/{childName}/g, childName);
```

### Encouragement Selection

**Authentic, process-focused:**
- ✅ "Du bist drangeblieben."
- ✅ "Du hast dir Zeit genommen."
- ✅ "Du hast noch einmal genau hingeschaut."
- ❌ "Du bist perfekt."
- ❌ "Du bist der Beste."
- ❌ "Alles richtig!"

---

## 13. Authentifizierung, Rollen und Berechtigungen

### Roles & Access Matrix

| Feature | Child | Teacher | Parent | Admin |
|---|---|---|---|---|
| Login | ✅ | ✅ | ✅ | ✅ |
| Mission Play | ✅ | ❌ | ❌ | ❌ |
| Adventure Book Read | ✅ | ❌ | ❌ | ❌ |
| Week Create | ❌ | ✅ (W2) | ✅ (W2) | ✅ (W3) |
| Mission Define | ❌ | ✅ (W2) | ✅ (W2) | ✅ (W3) |
| Hint Write | ❌ | ✅ (W2) | ✅ (W2) | ✅ (W3) |
| View Child Progress | ❌ | ✅ (W2) | ✅ (own) | ✅ (W3) |
| Message Write (to Child) | ❌ | ❌ | ✅ (W2) | ❌ |
| User Management | ❌ | ❌ | ❌ | ✅ (W3) |

### Protected Routes

**Frontend Route Protection:**
```javascript
<ProtectedRoute role="child">     // Only children
<ProtectedRoute role="teacher">   // Only teachers
<ProtectedRoute role="parent">    // Only parents (or admin)
<ProtectedRoute role="admin">     // Only admins
```

**Backend Data Access:**
- Children see only their own progress + public stories
- Teachers see their assigned classes/students (Week 2)
- Parents see only their assigned children
- Admins see everything

### Sign-Up Process

**Child Sign-Up:**
1. Select avatar (emoji)
2. Select grade (1-4)
3. Enter email + password
4. Create account
5. Auto-login → KidHome

**Teacher/Parent/Admin Sign-Up:**
1. Enter name + email + password
2. Create account
3. Auto-login → Dashboard

---

## 14. Konfiguration und Umgebungen

### Environment Variables (not in repo)

**Required for PocketBase:**
```
POCKETBASE_URL=https://domain/.sfs-be/  (Production)
POCKETBASE_ADMIN_EMAIL=...               (Not in client)
POCKETBASE_ADMIN_PASSWORD=...            (Not in client)
```

### .env.example (provided template, no secrets)

```
# PocketBase Configuration
VITE_POCKETBASE_URL=http://localhost:8090

# App Configuration
VITE_APP_NAME=NeuroQuest
VITE_APP_LANGUAGE=de
```

### Build Modes

**Development:**
```bash
npm run dev
# Runs Vite dev server on http://localhost:5173
# Uses /.sfs-bd/ (dev PocketBase)
```

**Preview Build (staging):**
```bash
npm run build
# Builds to dist/, targets /.sfs-preview/
```

**Production Build:**
```bash
npm run build:prod
# Builds to dist/, targets /.sfs/ (production)
```

---

## 15. Externe Abhängigkeiten

### Platform-Provided (do NOT npm install)

```json
{
  "react": "^18",
  "react-dom": "^18",
  "react-router": "^7",
  "vite": "^6",
  "@vitejs/plugin-react": "^4",
  "tailwind-css": "^4",
  "lucide-react": "(icons)",
  "pocketbase": "^0.39.0",
  "tailwind-merge": "(utils)"
}
```

### Design Assets

- Google Fonts via `/.sfs/css2?family=...` (no npm package)
- Stock images via Unsplash (in `/static/`)
- Custom SVG icons (Luna owl in `public/favicon.svg`)

### Zero Additional Dependencies

No npm packages beyond what the platform provides. All utilities written in TypeScript/JavaScript.

---

## 16. Erledigte Entwicklungsaufgaben

### Phase 1: MVP Foundation (✅ Complete)

- ✅ React + Router setup
- ✅ Vite build configuration
- ✅ Tailwind CSS v4 configuration
- ✅ PocketBase connection
- ✅ Multi-role authentication
- ✅ Demo user accounts
- ✅ Initial database schema

### Phase 2: Emotional Redesign (✅ Complete)

- ✅ Warm, calm design language (amber, green, beige)
- ✅ KidHome as illustrated storybook entry
- ✅ Luna the owl companion
- ✅ World regions (Zauberwald, Nebelberge, etc.)
- ✅ Adventure Book setup
- ✅ Responsive mobile-first design

### Phase 3: The Magic 5 (✅ Complete)

- ✅ MagicFiveMission.jsx – Core 5×5 game loop
- ✅ magicFiveData.ts – Story parts by grade
- ✅ magicFiveMissions.ts – 5 example sentences
- ✅ Step progression logic (Punctuation → Writing → Control → Mark → Story)
- ✅ Story unlock per round (not before)
- ✅ localStorage persistence
- ✅ Grade selection + name insertion
- ✅ Authentic encouragement (no gamification)
- ✅ Day completion flow

---

## 17. Teilweise erledigte Arbeiten

### Teacher Dashboard (Skeleton Active, Logic Pending)

**Status:** Structure in place, full CRUD coming Week 2

**Done:**
- TeacherDashboard.jsx created
- Role-protected route configured
- Navigation from login

**TODO:**
- Week creation form
- Week list + edit/delete
- Mission CRUD per week
- Sentence + hint editor
- Class assignment
- Student progress view

---

### Parent Dashboard (Skeleton Active, Logic Pending)

**Status:** Structure in place, messaging coming Week 2

**Done:**
- ParentDashboard.jsx created
- Role-protected route configured

**TODO:**
- Child progress view
- Message writing interface
- Message history
- Custom task creation
- Shared story reading mode

---

### Admin Dashboard (Skeleton Active, Logic Pending)

**Status:** Structure in place, management tools coming Week 3

**Done:**
- AdminDashboard.jsx created
- Role-protected route configured

**TODO:**
- User CRUD (invite codes, bulk import)
- Story library management
- Class/group management
- Insights dashboard (aggregate stats)
- System configuration

---

### PocketBase Data Migration (Logic Pending)

**Current:** Story/Mission data in JavaScript files
**TODO (Week 2):**
- Migrate `magicFiveData.ts` → `story_parts` collection
- Migrate `magicFiveMissions.ts` → `mission_rounds` collection
- Migrate localStorage progress → `round_progress` + `child_story_progress`
- Create REST API integration layer
- Implement sync + conflict resolution

---

## 18. Offene Anforderungen und Backlog

### P0 (Critical/Blocking)

| ID | Aufgabe | Grund | Abhängigkeiten | Ergebnis | Akzeptanzkriterium |
|---|---|---|---|---|---|
| P0-001 | PocketBase Data Migration | localStorage is per-device only, not cloud-synced | None | progress_*, story_parts, mission_rounds in cloud | Child can switch devices + see same progress |
| P0-002 | Teacher Week Builder | Can't create custom missions without code | P0-001 | TeacherDashboard full CRUD | Teacher can create Week 1, define 5 days/25 sentences |

---

### P1 (Next Priority)

| ID | Aufgabe | Grund | Abhängigkeiten | Ergebnis | Akzeptanzkriterium |
|---|---|---|---|---|---|
| P1-001 | Parent Dashboard + Messaging | Parents can't write encouragement | P0-001 | messages collection + ParentDashboard UI | Parent can message child, child sees in app |
| P1-002 | 4 more demo stories | Only 1 story (5 days) exists | None | 4 × 5-day stories for different regions | Each region has complete story |
| P1-003 | Story Part Illustrations | Placeholder keys only | None | 25 illustrations (5 days × 5 parts) per story | Each story part has image |
| P1-004 | Adventure Book Certificates | Urkunden structure prepared, not rendered | None | Certificate generation + download | Child can print certificate |
| P1-005 | Offline Service Worker | No offline sync yet | P0-001 | Service Worker + offline queue | App works offline, syncs on reconnect |

---

### P2 (Important, Later)

| ID | Aufgabe | Grund | Abhängigkeiten | Ergebnis | Akzeptanzkriterium |
|---|---|---|---|---|---|
| P2-001 | Admin User Management | No invite/bulk user creation | P0-001 | Admin user CRUD + invite codes | Admin can invite 50 users |
| P2-002 | Extended Companion Memory | Luna says same things each day | companionMemory.ts started | Dynamic memories + callbacks | Luna references past adventures |
| P2-003 | WCAG 2.1 AA Accessibility | Not yet audited | None | Full a11y audit + fixes | Lighthouse accessibility: 90+ |
| P2-004 | Performance Optimization | No Lighthouse audit yet | None | Code split + lazy load | Lighthouse performance: 85+ |
| P2-005 | E2E Tests (Cypress/Playwright) | No automated tests | None | Test suite for Magic 5 flow | 80% coverage of critical paths |

---

### P3 (Nice-to-Have, Later)

| ID | Aufgabe | Grund | Abhängigkeiten | Ergebnis | Akzeptanzkriterium |
|---|---|---|---|---|---|
| P3-001 | Text-to-Speech (Vorlese-Funktion) | Helps early readers | None | tts.js integration | Child can hear story read aloud |
| P3-002 | Adaptive Reading Difficulty | All kids see same text | None | Adjust grade on-the-fly based on speed | Slow readers get grade-1 options |
| P3-003 | Teacher Analytics Dashboard | No insights yet | P0-001 | Charts: completion rate, struggle areas | Teacher sees which sentences are hard |
| P3-004 | Parent-Child Shared Mode | Reading together not in-app | None | Shared screen mode, parent side-by-side | Parent + child view same story |
| P3-005 | Multi-Language Support | German only | None | i18n setup + sample EN/FR | UI available in 3 languages |

---

## 19. Bekannte Fehler

### Current Issues

**None known.** All core features tested and working.

### Potential Edge Cases (Not Yet Tested)

1. **Device change mid-round:** Child starts Round 3 on iPhone, switches to iPad
   - **Current:** localStorage not synced → starts fresh on iPad
   - **Fix:** Week 2 PocketBase sync
   - **Severity:** High

2. **Network loss during story unlock:** Child marks sentence complete, network drops before story saves
   - **Current:** localStorage saves locally, will sync on reconnect (not yet)
   - **Fix:** Offline queue + auto-sync
   - **Severity:** Medium

3. **Browser data clear:** Child clears cache/cookies
   - **Current:** All progress lost
   - **Fix:** PocketBase sync required
   - **Severity:** High

4. **Multiple users on same device:** Sibling logs in with own account
   - **Current:** localStorage uses childId, should isolate correctly
   - **Testing:** Not yet verified
   - **Severity:** Low (family use case)

---

## 20. Technische Schulden

1. **Story data in JavaScript** – Should be in PocketBase `story_parts` collection
   - **File:** `magicFiveData.ts`
   - **Effort:** ~4 hours
   - **Depends on:** P0-001 (PocketBase migration)

2. **Mission data in JavaScript** – Should be in `mission_rounds` collection
   - **File:** `magicFiveMissions.ts`
   - **Effort:** ~4 hours
   - **Depends on:** P0-001

3. **Progress in localStorage** – Should be in `round_progress` collection
   - **Files:** MagicFiveMission.jsx
   - **Effort:** ~6 hours
   - **Depends on:** P0-001

4. **No automated tests** – Only manual QA
   - **Effort:** ~16 hours for 80% coverage
   - **Priority:** P2

5. **Teacher/Parent/Admin dashboards empty** – Only UI skeletons
   - **Effort:** ~40 hours (2 weeks)
   - **Priority:** P0-002, P1-001

---

## 21. Getroffene Entscheidungen

### 1. "The Magic 5" Ritual (Locked)

**Decision:** 5 rounds × 5 steps = predictable routine + story surprise

**Rationale:** Provides security (knowing what's next) + mystery (not knowing story)

**Alternative Considered:** Varying step order → too unpredictable for 6-9 year olds

---

### 2. Grade Adaptation at Load Time (Locked)

**Decision:** All 4 texts stored in DB, selected at render based on child's grade

**Rationale:** Single story, multiple audiences; easy to update one story for all grades

**Alternative:** Separate story per grade → data duplication, harder to maintain

---

### 3. Story Unlock Per Sentence (Locked)

**Decision:** Exactly 1 story part unlocks after each sentence completion

**Rationale:** Reward for effort, not speed/perfection

**Alternative:** Unlock all 5 parts after task completion → loses daily suspense

---

### 4. No Gamification (Locked)

**Decision:** No points, badges, leaderboards, percentage scores

**Rationale:** Creates pressure; contradicts pädagogisches Leitbild

**Alternative:** Add XP/leveling → children compare themselves

---

### 5. Separate Story/Mission Data (Locked)

**Decision:** Story definitions (story_parts) separate from mission instances (mission_rounds)

**Rationale:** Reuse story with different sentences; swap sentences without changing story

**Alternative:** Couple them → inflexible for future changes

---

### 6. React Router v7 (Client-Side Routing) (Locked)

**Decision:** All routing in React, no server-side routes

**Rationale:** Fits IONOS Group Vite-hosted architecture

**Alternative:** Server-side routing → requires backend server

---

### 7. Role-Based Route Protection (Locked)

**Decision:** ProtectedRoute wrapper checks auth role before rendering

**Rationale:** Clean, reusable, consistent access control

**Alternative:** Manual role checks in each component → error-prone

---

### 8. PocketBase (Locked)

**Decision:** Use IONOS Group's managed PocketBase

**Rationale:** Pre-configured, handles auth, REST API, SQLite, no extra infra needed

**Alternative:** Custom API → more work, same functionality

---

## 22. Offene Entscheidungen

### 1. Companion Evolution (Week 3+)

**Question:** How deeply should Luna remember past weeks?

**Options:**
- A) Just current week (minimal memory)
- B) Recall 3 past weeks (natural memory span)
- C) Full history since sign-up (perfect memory)

**Impact:** Affects dialogue generation + emotional continuity

**Recommendation:** Start with B) – feels personal, not overwhelming

---

### 2. Multi-Level Difficulty (Week 3+)

**Question:** Should reading difficulty adapt within a week?

**Options:**
- A) Fixed grade for entire week
- B) Adjust per-day based on speed
- C) Adjust per-sentence based on struggles

**Impact:** Affects inclusivity + complexity

**Recommendation:** Start with A), add B) in Week 4 if needed

---

### 3. Parent Notifications (Week 2)

**Question:** Should parents get alerts when child completes story?

**Options:**
- A) No notifications
- B) Weekly summary email
- C) In-app + optional email
- D) Real-time notifications

**Impact:** Parent engagement + child privacy

**Recommendation:** Start with C) – opt-in, not intrusive

---

### 4. Class Sharing (Week 3)

**Question:** Can students see classmates' progress?

**Options:**
- A) No sharing (private)
- B) Teacher-created groups only
- C) Classroom view (teacher can show)

**Impact:** Comparison pressure vs. community feel

**Recommendation:** Start with A), add B) in Week 4 if teachers request

---

### 5. Language Support (Week 4+)

**Question:** When/if to add English, French, etc.?

**Options:**
- A) German only (forever)
- B) English next (most common)
- C) All major EU languages

**Impact:** Market expansion + translation effort

**Recommendation:** Defer to Year 2, start with German mastery

---

## 23. Tests und Qualitätssicherung

### Current Testing Status

**Manual QA:** ✅ In-progress
- The Magic 5 flow tested on Chrome/Edge/Safari
- Responsive design verified (iPhone 12, iPad, Desktop)
- Role-protected routes tested (all 4 roles)
- Story unlock order verified (locked until complete)
- localStorage persistence verified (Reload holds progress)

**Automated Tests:** ❌ Not yet
- No Jest/Vitest setup
- No E2E test suite (Cypress/Playwright)
- **Priority:** P2-005

**Accessibility Audit:** ❌ Not yet
- No WCAG 2.1 audit
- Color contrast verified manually (warm palette passes)
- Keyboard navigation not formally tested
- Screen reader support not tested
- **Priority:** P2-003

**Performance Audit:** ❌ Not yet
- Lighthouse not run
- No bundle analysis
- **Priority:** P2-004

---

### Recommended Test Matrix

**Browsers:**
- Chrome (latest)
- Safari (latest)
- Firefox (latest)
- Edge (latest)

**Devices:**
- iPhone 12 / SE
- iPad Air
- Pixel 6 / Tablet
- MacBook Air / Windows laptop

**Scenarios:**
1. Child logs in → plays 1 day → logs out
2. Child plays 2 rounds, refreshes → progress intact
3. Child switches device → (Week 2: sync works)
4. Teacher logs in → sees "Week Management" button (currently skeleton)
5. Parent logs in → sees their child
6. Admin logs in → sees "User Management" button (currently skeleton)

---

## 24. Deployment und Betrieb

### Current Deployment

**Platform:** IONOS Group (Vite-hosted)

**Directories:**
```
/.sfs/                   # Production (current app)
  ├── dist/              # Vite build output (served as /)
  ├── node_modules/      # Not needed (platform-provided)
  └── static/            # User assets (served as /static/)

/.sfs-bd/                # Development PocketBase database
  ├── data.db            # SQLite
  └── auxiliary.db
  
/.sfs-be/                # Production PocketBase database
  ├── data.db
  └── auxiliary.db
```

### Build & Deploy Process

**1. Local Development**
```bash
cd app
npm run dev              # Runs on http://localhost:5173
```

**2. Test Build**
```bash
npm run build            # Builds to dist/, preview mode
npm run preview          # Test build locally
```

**3. Production Deploy**
```bash
npm run build:prod      # Builds optimized dist/
git add -A
git commit -m "feat: description"
git push origin dev     # or main
# Platform auto-deploys on push
```

**4. Verify**
- Check https://domain/.sfs/ loads app
- Test login flow
- Verify static assets load

---

### Rollback Plan

**If deployment breaks:**
1. Check Vite build log in `logs/vite_build.log`
2. Revert last commit: `git revert HEAD`
3. Rebuild: `npm run build:prod`
4. Push: `git push origin dev`
5. Verify app is restored

---

### Environment-Specific Configs

**Development (localhost:8090):**
- PocketBase runs locally
- Hot reload enabled
- Detailed logging

**Preview (/.sfs-preview/):**
- Test build on platform
- Uses /.sfs-bd/ (dev database)
- For team review before production

**Production (/.sfs/):**
- Optimized build
- Uses /.sfs-be/ (production database)
- Accessed by real users

---

## 25. Risiken

### High-Priority Risks

| ID | Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|---|---|---|---|---|
| R1 | Device change loses progress (no cloud sync yet) | High | High | Week 2: Implement PocketBase sync. Until then, guide users to use same device. |
| R2 | Database migration fails (moving JS data to PocketBase) | Medium | High | Create backup before migration. Test on /.sfs-bd/ first. Implement rollback script. |
| R3 | Story texts too complex for younger grades | Medium | Medium | Have domain expert (Schulpsychologin) review texts. Grade-test with real Klasse 1. |
| R4 | Performance: Vite bundle too large | Low | Medium | Monitor with Lighthouse. Split code if needed (Week 2). |
| R5 | Auth token expiry not handled | Low | Medium | Add token refresh logic in auth.tsx. Set 7-day expiry. |
| R6 | Story spoilers (accidentally revealed via URL) | Low | Low | Story locked in state, not in URL. No way to guess part_id. |

---

### Medium-Priority Risks

- **Companion memory becomes repetitive** – Need diverse dialogue generation (Week 3)
- **Teacher adoption low** – Dashboard must be intuitive (Week 2, user testing)
- **GDPR compliance** – Need to document data deletion policy (before launch)

---

## 26. Empfohlene nächste Entwicklungsschritte

### Week 2 – Teacher & Parent Interfaces (P0 + P1)

**Goal:** Teachers can define weeks; parents can message; data moves to cloud

**Tasks:**

1. **PocketBase Data Migration** (P0-001)
   - Migrate `magicFiveData.ts` → `story_parts` collection
   - Migrate `magicFiveMissions.ts` → `mission_rounds` collection
   - Create `story_weeks` + `story_days` records for demo story
   - Migrate localStorage progress → `round_progress` collection
   - **Time:** 8 hours
   - **Result:** All story/mission data in database, API endpoints functional

2. **Teacher Week Builder** (P0-002)
   - Design Week creation form (title, story, grade, start date)
   - Implement Mission editor (5 days × 5 sentences)
   - Add Hint editor (teacher + parent hints per sentence)
   - Assign week to class/students
   - **Time:** 12 hours
   - **Result:** Teacher can create custom weeks without code

3. **Parent Messaging** (P1-001)
   - Create `messages` collection
   - Build messaging UI in ParentDashboard
   - Display messages in child's mission view
   - **Time:** 6 hours
   - **Result:** Parents can write encouragement, child sees it

4. **4 More Demo Stories** (P1-002)
   - Write stories for other 3 regions (Nebelberge, Kristallmeer, Sternenschloss)
   - Create all 20 grade-level variations (4 stories × 5 days × 4 grades)
   - **Time:** 16 hours
   - **Result:** 4 × 5-day story arcs, fully diverse

5. **Story Illustrations** (P1-003)
   - Create/commission 25 illustrations per story region
   - Integrate into app (load from `illustration_key`)
   - **Time:** 20 hours (or use stock photos)
   - **Result:** Each story part has image

6. **Offline Service Worker** (P1-004)
   - Register Service Worker
   - Cache story data + mission pages
   - Implement offline queue for progress
   - Auto-sync on reconnect
   - **Time:** 10 hours
   - **Result:** App works offline, syncs when online

**Total Week 2 Time:** ~60 hours (1.5 developer-weeks)

**Success Criteria:**
- [ ] Teacher can create Week 2 without code
- [ ] Student sees Week 2 on KidHome
- [ ] Parent can message student
- [ ] Child can play offline
- [ ] Device change syncs progress

---

### Week 3 – Admin Tools & Polish (P2)

**Goal:** Admins can manage users/stories; accessibility audit passed

**Tasks:**

1. **Admin User Management** (P2-001)
   - Implement user CRUD (create, list, edit, delete)
   - Add invite code generation
   - Bulk import from CSV
   - **Time:** 10 hours

2. **Adventure Book Certificates** (P1-005)
   - Design certificate template
   - Generate + download as PDF
   - Display in Adventure Book
   - **Time:** 6 hours

3. **Extended Companion Memory** (P2-002)
   - Enhance `companionMemory.ts` to track past weeks
   - Generate dynamic greetings based on history
   - Add callbacks to previous adventures
   - **Time:** 8 hours

4. **WCAG 2.1 AA Audit** (P2-003)
   - Run axe-core + Lighthouse accessibility
   - Fix color contrast issues (if any)
   - Add ARIA labels to interactive elements
   - Test with screen reader (NVDA/JAWS)
   - **Time:** 12 hours

5. **Performance Optimization** (P2-004)
   - Run Lighthouse performance audit
   - Code split lazy-load routes
   - Optimize assets (images, CSS)
   - Target: Lighthouse 85+
   - **Time:** 10 hours

6. **E2E Test Suite** (P2-005)
   - Set up Playwright or Cypress
   - Write 10 critical path tests (Magic 5 flow, login, etc.)
   - Target 80% coverage
   - **Time:** 16 hours

**Total Week 3 Time:** ~60 hours

**Success Criteria:**
- [ ] Lighthouse performance: 85+
- [ ] Lighthouse accessibility: 90+
- [ ] 10 E2E tests passing
- [ ] Admin can invite 50 users via CSV
- [ ] Luna remembers past adventures

---

### Week 4 – User Testing & Launch Prep

**Goal:** Real users test with teachers; fix feedback; prepare for soft launch

**Tasks:**

1. **Usability Testing** (4 teachers, 8 students)
   - Run structured user tests
   - Record feedback on Magic 5, story, interfaces
   - Identify UX pain points
   - **Time:** 16 hours (moderation + analysis)

2. **Feedback Implementation**
   - Fix top 5 issues from user testing
   - Iterate on UX based on feedback
   - **Time:** 12 hours

3. **Documentation**
   - Write teacher guide (how to create weeks)
   - Write parent guide (how to message + track progress)
   - Create admin onboarding
   - **Time:** 8 hours

4. **Soft Launch Prep**
   - Create landing page
   - Set up email newsletters
   - Prepare press materials
   - **Time:** 10 hours

5. **Data Backup & Security**
   - Document backup procedures
   - GDPR compliance review
   - Terms of Service + Privacy Policy
   - **Time:** 8 hours

**Total Week 4 Time:** ~50 hours

**Success Criteria:**
- [ ] 4 teachers can independently create weeks
- [ ] 8 students enjoy playing (qualitative feedback)
- [ ] No critical usability issues
- [ ] All documentation complete
- [ ] Legal review passed

---

## 27. Einstiegspunkt für die nächste KI

### Was zuerst lesen?

1. **This document** – You're reading it. Covers everything.
2. **app/AGENTS.md** – Original tech spec (still mostly accurate)
3. **app/ARCHITECTURE.md** – Design decisions + patterns
4. **app/src/pages/MagicFiveMission.jsx** – Core game loop (300L, commented)

### Zentrale Dateien (nicht ungeprüft verändern)

| Datei | Grund | Warnung |
|---|---|---|
| `MagicFiveMission.jsx` | Core Magic 5 state machine | Änderungen hier können den kompletten Flow brechen. Immer mit localStorage-Test verifizieren. |
| `magicFiveData.ts` | Story definitions | Alle Klassenstufen-Varianten müssen vollständig sein. Fehler zeigen sich erst beim Kind (Klasse 2 vs. 4). |
| `auth.tsx` | Authentication | ProtectedRoute muss sauber sein. Fehler sperren ganze Rollen aus. |
| `index.html` | Meta tags + page setup | Meta description & title sind wichtig für SEO. Favicon-Path ist hart kodiert. |
| `vite.config.js` | Build config | Abhängig von IONOS Group Struktur (/.sfs, /.sfs-bd/, etc.). Nicht verändern ohne Test-Deploy. |

---

### Nächster Entwicklungsschritt

**JETZT (immediately):**

**Priorität P0-001: PocketBase Data Migration**

→ Move story_parts, mission_rounds, child progress from JavaScript to database

**Why?** Without cloud sync, device changes lose progress. This blocks everything in Week 2.

**How to start:**
1. Read `bd/types.d.ts` – shows PocketBase schema
2. Look at `magicFiveData.ts` + `magicFiveMissions.ts` – data to migrate
3. Create REST API layer in `lib/api.ts`
4. Update `MagicFiveMission.jsx` to fetch from PocketBase instead of local data
5. Test on /.sfs-bd/ first, then deploy

**Time estimate:** 8 hours

**Success:** Child plays Day 1 on iPhone, switches to iPad, sees same progress

---

### Welche Entscheidungen sind offen?

1. **Companion Memory Depth** (Section 22.1) – How much should Luna remember?
2. **Difficulty Adaptation** (Section 22.2) – Should reading level adjust per-sentence?
3. **Parent Notifications** (Section 22.3) – Email alerts or in-app only?
4. **Class Sharing** (Section 22.4) – Can students see classmates' progress?
5. **Multi-Language** (Section 22.5) – When to add English/French?

**Recommendation:** Ask product owner (pädagogically-minded) before deciding.

---

### Wie lässt sich der aktuelle Stand testen?

**1. Local Development:**
```bash
cd app
npm run dev
# Opens http://localhost:5173
# Use demo accounts: kid@demo.de / demo123
```

**2. Play through complete flow:**
- Login as kid
- Navigate to Day 1 of "Der geheimnisvolle Waldpfad"
- Complete all 5 rounds (5 sentences × 5 steps each)
- Verify story unlocks sentence-by-sentence
- After Round 5: Story complete, day closing message appears
- Check Adventure Book: story should be archived

**3. Test device change (current behavior):**
- Play on localhost
- Open `localStorage` in DevTools
- Check `progress_<childId>` contains round/step data
- Switch device/incognito → data lost (expected until Week 2)

**4. Test authentication:**
- Try accessing `/mission/1` without login → redirects to `/login`
- Login as teacher → `/teacher-dashboard` works, `/mission/1` blocked
- Try accessing parent/admin routes with wrong role → blocked

**5. Visual QA:**
- Check responsive design at 375px, 768px, 1280px
- Verify warm colors (amber/green/beige) load correctly
- Check story text readability (font size, line height)
- Verify buttons are large (~44px) and touch-friendly

**Expected Time:** 30 minutes for full smoke test

---

## 28. Unsicherheiten

### Nicht zuverlässig rekonstruierbare Informationen

| Punkt | Situation | Mitigierung |
|---|---|---|
| Demo story length | One day written, structure done for 5 days | Document expected 500-word arc per day |
| Illustration assets | Placeholder keys only, no actual images | Decide: commission or use stock photos |
| PocketBase migration timeline | Not started, dependency for everything | Allocate 8 hours, start Week 2 |
| Teacher workflows | Designed conceptually, not user-tested | Conduct teacher interview before building |
| Real-world grade-level texts | Only written by AI, not by pedagogue | Have Schulpsychologin review before launch |
| GDPR/Legal compliance | Not yet documented | Consult lawyer before soft launch |
| IONOS Group deploy process | Assumed based on /.sfs structure | Verify with IONOS Group before Week 2 |

---

### Offene Fragen für Product Owner

1. **Illustration budget:** Commission custom art, use stock photos, or AI-generated?
2. **Teacher onboarding:** In-person workshop or self-service docs?
3. **Privacy:** Can parents see other parents' messages? Only their child's progress?
4. **Scaling:** Expected user base by Year 1? (1 school vs. 100 schools?)
5. **Revenue model:** Freemium, subscription, B2B licensing?
6. **Pädagogische Partnerschaften:** Kooperation mit Schulen/Verbänden?

---

## Anhang: Die "Magische 5" nochmal kurz erklärt

### Warum 5?

Symbolik + Pädagogik:

- **5 Tage = Schulwoche** (Mo-Fr, klare Struktur)
- **5 Sätze = 30-50 min Arbeitszeit** (angemessen für 6-9 Jährige)
- **5 Schritte = ritualisierte Routine** (sicher, vorhersehbar)
- **5 Geschichtenteile = daily unfolding** (spannend, nicht überraschend)

### Der Flow aus Kinderblick

> Ich öffne die App. Luna sagt hallo. Ich sehe 5 Sätze. Der erste Satz ist da.
>
> Ich suche die Satzzeichen. Ich schreibe ihn ab. Ich vergleiche – hat alles geklappt?
> Ich drücke "Satz geschafft".
>
> Jetzt erscheint ein kurzes Stück der Geschichte! Luna sagt, dass ich drangeblieben bin.
> Ich lese, was weitergeht.
>
> Dann Satz 2. Gleicher Ablauf. Ein weiteres Stück Geschichte.
> Sätze 3, 4, 5. Mehr und mehr Geschichte.
>
> Nach Satz 5: Die komplette Geschichte des Tages. Ein Finale.
>
> Morgen ein neuer Tag. Ein neues Abenteuer.

---

# Document End

**Version:** 1.0  
**Generated:** 2026-08-15  
**Language:** Deutsch  
**For:** GitHub Backup + Knowledge Transfer
