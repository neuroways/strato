# Project Setup

Last updated: 2026-07-27

## Stack

A **Vite + React** single-page app (JSX), styled with **Tailwind CSS v4**. The
dev server runs with live reload, so edits appear in the preview immediately —
no build or restart needed to see a change.

The app is rendered inside **React StrictMode** in dev. StrictMode
intentionally double-invokes components, effects, and state updaters (mounting
each component twice on the first render) to surface unsafe side effects. Write
code that tolerates this: effects must clean up after themselves (return a
teardown from `useEffect`), and rendering, reducers, and state updaters must be
pure — no side effects, mutation, or one-off work outside an effect. Don't treat
the double render as a bug or try to suppress it; just write idempotent,
effect-safe code and it behaves correctly in production (where StrictMode adds
no double-invocation).

Provided by the platform (available at runtime — never add these to
`package.json`): React, react-dom, react-router, Vite, @vitejs/plugin-react,
lucide-react, pocketbase, `tailwind-merge`, and the Tailwind v4 engine itself.
This project has **no dependencies of its own** — `package.json` is empty and
there is no `node_modules`. Do not `npm install` anything for styling.

## Tailwind v4 notes

This is Tailwind **v4**, not v3. Almost all utilities are identical, but:

- The stylesheet entry is `@import "tailwindcss";` (not the three `@tailwind`
  directives). Already set up in `src/index.css`.
- **Theme customization goes in `tailwind.config.cjs`** (custom colors, fonts,
  spacing under `theme.extend`). It is wired in via `@config` in `index.css` —
  edit the config file as you would in v3. You may instead define tokens with a
  `@theme { --color-brand: …; }` block in `index.css`.
- **Never add `postcss.config`, `postcss`, or `autoprefixer`** — vendor
  prefixing is built into the v4 engine. Adding them breaks the build.
- A few renamed utilities vs v3: `shadow` → `shadow-sm`, `shadow-sm` →
  `shadow-xs`, `rounded` → `rounded-sm`, `outline-none` → `outline-hidden`,
  `flex-shrink-0` → `shrink-0`, and `bg-opacity-50` → the `bg-black/50` slash
  syntax. The default border color is now `currentColor` (set one explicitly,
  e.g. `border border-gray-200`).
- Arbitrary values (`w-[473px]`, `text-[#1da1f2]`, `grid-cols-[1fr_2fr]`) work
  exactly as in v3.

## Structure

```
src/
  App.jsx           # Root component with routing
  main.jsx          # Entry point — renders <App/> into #root, imports index.css
  index.css         # @import "tailwindcss" + @config bridge
  pages/            # Page components
    Home.jsx        # Landing page with ASG logo
    Dashboard.jsx   # Studio overview and statistics
    Studio.jsx      # Interactive studio visualization
    Devices.jsx     # Device listing grouped by category
    SignalFlow.jsx  # Predefined signal path visualization
    Cabling.jsx     # Cable database documentation
    Knowledge.jsx   # 7 educational articles
    Errors.jsx      # Error database and troubleshooting
    Management.jsx  # Admin interface for data management
    Verification.jsx # Photo/observation tracking
    Learning.jsx    # Learning platform with device categories
    Quiz.jsx        # Complete quiz engine with feedback
  components/       # Reusable components
    DeviceCard.jsx
    ConnectionLine.jsx
    management/     # Admin components
  layouts/
    SiteLayout.jsx  # Global nav, logo, footer
  services/
    studio-data-service.ts      # CRUD for studio data
    verification-service.ts     # Photo/observation management
    quiz-engine.ts              # Quiz session management + feedback
  types/
    index.ts        # Studio data types
    learning.ts     # Learning platform types
    quiz.ts         # Quiz engine types
  data/
    initial-studio-data.json    # 16 devices, 12 manufacturers
    device-roles.json           # 10 device categories
    learning-modules.json       # Learning curriculum
    quiz-questions-complete.json # 40 verified quiz questions
public/
  favicon.svg       # ASG Klangwerk brand mark (orange)
index.html
package.json · vite.config.js · tailwind.config.cjs
```

`dist/` is committed (the deploy reads from it); `node_modules/` is ignored.

## Project Identity

- **Title**: ASG Klangwerk – Entdecken. Verbinden. Produzieren.
- **Description**: Erkunde das Tonstudio des ASG auf völlig neue Weise. Verbinde Instrumente, Synthesizer und Mischpult miteinander und werde Schritt für Schritt zum Studio-Profi.
- **Tagline**: Entdecken. Verbinden. Produzieren.
- **Positioning**: Interaktive Entdeckerwelt und Lernplattform für Schülerinnen und Schüler ab Klasse 8
- **Favicon**: Orange monogram "SK" (Schullogο)
- **Background**: Dark gradient (#030712)
- **Logo**: ASG Klangwerk official school logo (static/asg-klangwerk-logo.png)
- **Tone**: Modern, motivierend, verständlich, neugierig machend, praxisnah

## Key Features

1. **Home** - Landing page with school branding, feature cards, About
2. **Dashboard** - Real-time studio statistics (device count, documentation progress, connections)
3. **Studio View** - Interactive SVG room visualization with device positions and connections
4. **Devices** - Complete equipment database grouped by 10 categories
5. **Signal Flow** - 5 predefined signal paths with step-by-step explanation
6. **Cabling** - Physical cable documentation with filtering
7. **Knowledge** - 7 educational articles covering MIDI, Audio, Routing, X32, Synthesizer, Sampler
8. **Errors** - Troubleshooting guide with symptoms, causes, solutions
9. **Management** - Admin tabs for device/connector/cable/connection/data management
10. **Verification** - Photo and observation tracking with source attribution
11. **Learning** - Learning hub with device categories, learning modules, quiz setup, connection matrix
12. **Quiz** - Complete pedagogical quiz engine with 40 verified questions and adaptive feedback

## Quiz Engine Architecture

### Data Models (`src/types/quiz.ts`)

**Enums:**
- `AufgabenTyp` (10 task types: kategorisierung, verbindung-wählen, ergebnis-bestimmen, audio-midi-unterscheiden, fehler-finden, unmöglich-erkennen, kabel-wählen, signalweg-ordnen, aufnahmeart-wählen, studiosituation)
- `Schwierigkeitsgrad` (4 levels: 1=Entdecken, 2=Anwenden, 3=Verstehen, 4=Studio-Profi)

**Interfaces:**
- `QuizFrage` - Complete question with metadata, answers, feedback
- `QuizAntwort` - Answer option with correctness and explanation
- `QuizSession` - Active quiz session with progress tracking
- `QuizFeedback` - Pedagogical feedback after submission
- `Lernfortschritt` - Learning progress tracking (local only)

### Quiz Engine Service (`src/services/quiz-engine.ts`)

**Session Management:**
- `createSession()` - Start new quiz with filters
- `getSession()` / `saveSession()` - Persistence
- `getCurrentQuestion()` - Get active question
- `getProgress()` - Calculate progress percentage

**Answer Processing:**
- `submitAnswer()` - Check answer, generate feedback, update statistics
- `isAnswerCorrect()` - Support single + multiple answer validation
- `generateFeedback()` - Create pedagogical feedback with:
  - Simple explanation of correct/incorrect answer
  - Why other answers don't fit
  - Technical supplement
  - Signal type identification
  - Links to relevant learning modules
  - Links to device pages

**Learning Progress:**
- `getLernfortschritt()` - Retrieve local progress
- `updateLernfortschritt()` - Save session results
- `recommendLernmodule()` - Suggest modules based on weak areas

**Repetition Mode:**
- `getUnsichereFragenFürWiederholung()` - Get failed questions by theme
- Auto-shuffle same questions with variations

**Quality Control:**
- `validateFragenQualität()` - Check data integrity
- `generateQualitätsbericht()` - Statistics on all questions
- `filterFragenFürVerwaltung()` - Quiz admin filtering

### Quiz Data (`src/data/quiz-questions-complete.json`)

**40 verified questions** across 4 difficulty levels:
- **Stufe 1 (Entdecken)** - 10 questions on device categories, basic Audio/MIDI, simple connections
- **Stufe 2 (Anwenden)** - 10 questions on signal flow, cable selection, recording types, audio/MIDI differences
- **Stufe 3 (Verstehen)** - 10 questions on X32 routing, troubleshooting, synthesizer vs sampler, complex paths
- **Stufe 4 (Studio-Profi)** - 10 questions on multi-track recording, DAW mastering, effects routing, band scenarios

**Coverage:**
- ✓ 10 questions on Audio & MIDI (understanding signal types)
- ✓ 10 questions on Connections (device wiring)
- ✓ 8 questions on X32 (mixing/routing)
- ✓ 5 questions on Sampler & Synthesizer (device specific)
- ✓ 5 questions on Recording Techniques (capture workflows)
- ✓ 8 questions on Troubleshooting (error diagnosis)

### Quiz UI (`src/pages/Quiz.jsx`)

**Three screens:**

1. **Start Screen**
   - Select difficulty level (4 options)
   - Select themes (8 checkboxes, optional)
   - Quiz starts filtered by level + themes

2. **Quiz Screen**
   - Progress bar (current / total)
   - Question with full text
   - Answer buttons (single or multi-select)
   - "Check Answer" button
   - Feedback modal with:
     - ✓/✗ indicator
     - Simple explanation
     - Why other answers fail
     - Technical supplement
     - Link to learning module
   - Next question button after feedback

3. **Results Screen**
   - Percentage correct (large)
   - Motivational text (no "failed" language)
   - Three stat cards: % correct, correct count, incorrect count
   - Strengths (green, ≥80%)
   - Weak areas (orange, <60%)
   - "New Quiz" button
   - "Practice Weak Areas" button (only if weak areas exist)
   - Progress summary (time spent, best result, recommended modules)

### Local Storage Persistence

- `studio_albert_quiz_sessions` - All session data
- `studio_albert_lernfortschritt` - Learning progress

Sessions auto-save after each answer. Progress syncs after quiz completion.

## Device Data

**16 Studio Devices:**
1. Behringer X32 (mixer)
2. Kawai ES920 (keyboard/input)
3. Roland JV-1010 (synthesizer)
4. Yamaha TG500 (synthesizer)
5. MacBook Pro M1 (DAW/recording)
6. PreSonus Eris E5 (speakers)
7. Yamaha SU700 (sampler) — *status: zu-prüfen*
8. Akai S2000 (sampler) — *status: zu-prüfen*
9. Roland Sound Canvas (synthesizer) — *status: zu-prüfen*
10. Kenton MIDI Thru (distributor) — *status: zu-prüfen*
11. Steinberg CC121 (controller) — *status: zu-prüfen*
12. Behringer AMP800 (headphone amp) — *status: zu-prüfen*
13. Novation Launchpad Pro (controller) — *status: zu-prüfen*
14. Neumann KMS 104 (microphone)
15. Audio-Technica AT4035 (microphone)

**10 Device Categories** (all present, no consolidation):
1. Eingabegeräte (keyboards, controllers)
2. Klangerzeuger (synthesizers)
3. Sampler
4. Misch- und Routinggeräte (X32)
5. Aufnahme- und Computersysteme (DAW)
6. Mikrofone
7. Wiedergabegeräte (speakers)
8. Steuergeräte (controllers)
9. Verteiler (MIDI Thru)
10. Hilfsgeräte (amps, adapters)

All 16 devices mapped to appropriate categories. Some devices (Launchpad Pro, CC121) map to multiple roles.

## Data Architecture

All data stored in JSON files (localStorage for quiz/progress):

- **initial-studio-data.json** - Static studio inventory
- **device-roles.json** - 10 categories with explanations
- **learning-modules.json** - 7 learning modules (curriculum)
- **quiz-questions-complete.json** - 40 verified questions with pedagogical feedback

No external database. All persistence is client-side localStorage.

## Navigation Structure

- `/` - Studio (Home/Hub page)
- `/devices` - Gerätewelten (Device explorer)
- `/cabling` - Verbindungscheck (Connection tester)
- `/signal-flow` - Signalwege (Signal paths)
- `/learning` - Studio-Missionen (Learning missions)
- `/quiz` - Klang-Challenges (Challenges/Quizzes)
- `/knowledge` - Klangwissen (Knowledge base)
- `/errors` - Studio-Notfall (Troubleshooting)
- `/verification` - Mein Fortschritt (Progress tracker)

### Admin (not in main nav)
- `/management` - Admin data management

## Design System

- **Dark theme**: Gradient backgrounds (gray-950 to gray-900)
- **Primary accent**: Orange (#f97316)
- **Signal colors**: Green (audio), Cyan (MIDI), Orange (USB), Purple (network)
- **Typography**: System fonts, clear hierarchy
- **Components**: Card-based, expandable details, hover states
- **Responsive**: Mobile-first, tested at 375px / 768px / 1280px
- **Accessibility**: Keyboard navigation, focus states, no color-only information

## Current Status

**Completed:**
- ✓ Data-driven device documentation with CRUD
- ✓ Photo/observation/verification system
- ✓ Learning platform with 7 device categories
- ✓ Complete quiz engine with 40 verified questions
- ✓ Pedagogical feedback (always explains why)
- ✓ Learning progress tracking (local)
- ✓ Professional ASG Klangwerk branding
- ✓ Responsive design (375px+)
- ✓ Complete rebranding as "Entdeckerwelt" (discovery world)
- ✓ Motivating language throughout (no "school/learning" terminology)
- ✓ New navigation: Studio, Gerätewelten, Verbindungscheck, Signalwege, Studio-Missionen, Klang-Challenges, Klangwissen, Studio-Notfall, Mein Fortschritt
- ✓ Redesigned Home page with hero, feature cards, CTAs
- ✓ All technical terminology removed (no "digitaler Zwilling", "Dokumentationssystem")

**Quiz Verification Checklist:**
- ✓ All 4 difficulty levels implemented
- ✓ 40 questions (10 per level)
- ✓ Every answer has explanatory feedback
- ✓ Weak answers explained with "why not"
- ✓ All questions linked to learning modules/devices
- ✓ Only confirmed studio data used
- ✓ Repetition mode for weak areas
- ✓ Local progress storage
- ✓ Multi-answer questions supported
- ✓ Motivational (not punitive) results text
- ✓ Mobile keyboard accessible
- ✓ No time limits

**In Progress / Acknowledged:**
- Learning modules not fully populated (framework present)
- X32 deep-dive only partial (5 of 9 chapters)
- Synthesizer/Sampler profiles not detailed
- Music history sources not populated
- Verbindungsmatrix not connected to logic

**Next Steps (if continuing):**
1. Expand learning modules with 9-chapter X32 course
2. Populate synthesizer/sampler deep-dive profiles
3. Add artist/song database with verified sources
4. Implement quiz question management UI (admin)
5. Build full connection compatibility matrix with rules
6. Add export/import for lesson plans

## Technology Highlights

- **React 18** with Hooks (useState, useEffect)
- **React Router v7** (BrowserRouter, client-side routing)
- **TypeScript** enums & interfaces for type safety
- **Tailwind CSS v4** with custom theme
- **localStorage** for session/progress persistence
- **No build-time server** - pure client-side React
- **Vite** for instant HMR dev experience

## Browser Compatibility

Modern browsers with ES2020+ support (no IE11 support). Tested on:
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Mobile Chrome/Safari (iOS 14+, Android 10+)

## Non-negotiable Rules

- No external database (localStorage only)
- No email sending (PocketBase Email API disabled)
- No scheduled jobs (cron disabled)
- Only confirmed studio data in quiz
- Pedagogical feedback on every answer (never just "wrong")
- Mobile-responsive at 375px minimum
- No time limits in quiz
- All 10 device categories present
- Keyboard fully accessible
- No punitive grading language
