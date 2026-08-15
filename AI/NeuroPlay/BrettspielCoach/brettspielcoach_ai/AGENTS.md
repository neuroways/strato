# NeuroPlay – MVP Architecture & Implementation

**Status:** Live | **Build:** `npm run build:prod` | **Preview:** `npm run build`

## Project Overview

NeuroPlay is a responsive web app that acts as an intelligent coach for board games. Users upload game rule PDFs, the app analyzes them (simulated in MVP), and guides players through learning, understanding, and playing the game.

**Live URL:** `/` (production) | **Dev:** `npm run dev` (Vite + HMR)

---

## Stack

- **Frontend:** React 18 + Vite v6
- **Styling:** Tailwind CSS v4 (no `postcss` or `autoprefixer`)
- **Icons:** lucide-react (imported as `import Name from "icon:kebab-name"`)
- **Backend:** PocketBase (for future game storage; SDK at `src/lib/pb.js`)
- **Routing:** Single-page app with screen-based state management (no react-router yet)

**Platform-provided (never `npm install`):** React, react-dom, react-router, Vite, @vitejs/plugin-react, lucide-react, pocketbase, tailwind-merge.

---

## App Architecture

### Core Components (12 Screens)

All in `src/components/`:

1. **StartScreen** – Welcome entry; 3 actions: upload, example, library
2. **UploadScreen** – PDF file picker with drag-drop aesthetic
3. **AnalysisScreen** – Simulated analysis progress (6 steps, ~3s total)
4. **GameOverview** – Main dashboard; 6 action buttons + "Start Game"
5. **QuickStart** – 5-step guided intro (accordion UX)
6. **SetupScreen** – Material list + assembly steps
7. **RulesScreen** – Searchable rules database (4 categories, collapsible)
8. **CoachScreen** – Chat UI; 3 quick buttons + free-form questions
9. **GameModeScreen** – Live play tracker (rounds, phases, scoreboard, side buttons)
10. **LibraryScreen** – Game collection (empty state + card grid)
11. **StrategyScreen** – Tab-based (strategies + beginner mistakes)
12. **GameFlowScreen** – Phase breakdown (accordion)

### State Management (App.jsx)

```jsx
const [screen, setScreen] = useState('start');
const [games, setGames] = useState([]);
const [currentGame, setCurrentGame] = useState(null);
const [uploadingFile, setUploadingFile] = useState(null);
```

All navigation via `navigate(screenName)`. Game context passed as props.

### Service Layer (src/lib/)

**`gameService.js`** – All game data logic:
- `EXAMPLE_GAME` – Complete game model for "Die Insel der Pfade"
- `analyzeGameDocument(file)` – Simulates PDF parsing (3s delay → EXAMPLE_GAME)
- `askGameCoach(gameId, question, game)` – Pattern-matches questions → pre-written answers (800ms delay)

**`pb.js`** – PocketBase client singleton (imported by any component needing storage)

### Game Model Structure

```javascript
{
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
  uploadedAt: ISO timestamp,
}
```

---

## Design & UX

### Visual Language

- **Dark theme** – Slate-900/800 base, blue/green/purple/red accents
- **Gradients** – `from-X-600 to-X-700` for primary actions; `from-X-900/30 to-X-800/30` for info boxes
- **Spacing** – Generous (6–8 unit gaps between sections); generous padding inside cards
- **Typography** – No custom fonts; system stack with Tailwind emphasis (bold titles, light text)
- **Icons** – lucide-react, sized consistently (w-4/5/6 for inline, w-8/12/16 for headers)
- **Interactions** – Hover scale (+5%), active scale (–5%), smooth color transitions

### Responsive Breakpoints

- **Mobile (375px)** – Single column, full-width buttons, stacked navigation
- **Tablet (768px)** – 2-column grids where appropriate, side-by-side layouts begin
- **Desktop (1280px)** – Full multi-column layouts, Game Mode uses lg:flex-row for sidebar

All buttons ≥44px tall; all tap targets padded adequately.

### Dark Accent Palette

| Use | Tailwind |
|-----|----------|
| Primary action | `bg-blue-600 hover:bg-blue-700` |
| Success | `bg-green-600 hover:bg-green-700` |
| Info/explanatory | `from-blue-900/30 to-blue-800/30 border-blue-700` |
| Secondary | `bg-slate-700 hover:bg-slate-600` |
| Highlight | `text-yellow-400` (scores, badges) |
| Error/warning | `from-red-900/30 to-red-800/30` or `text-red-400` |

---

## Future Integrations (Deferred)

### Real PDF Analysis

Replace `analyzeGameDocument()` with:
- PDF-to-text library (e.g., pdfjs) or server-side PDF parser
- NLP/keyword extraction to auto-detect game structure
- Confidence scoring for uncertain fields; UI prompts user to verify

**Placeholder interface:** Service returns same game model structure → no UI changes needed.

### Coach AI

Replace `askGameCoach()` with:
- RAG (Retrieval-Augmented Generation) over game's parsed rules
- Context-aware responses based on game state (phase, round, player position)
- Learn from user interactions (feedback loop)

**Placeholder interface:** Same input (question + game context), same output (answer string).

### PocketBase Storage

- Create `games` collection: `{ title, description, gameModel (JSON), uploadedAt }`
- Create `coach_interactions` collection: `{ gameId, question, answer, userRating }`
- Modify LibraryScreen to fetch from `pb.collection('games')`
- Save new analyses to `pb.collection('games').create()`

**Current state:** Games stored in React state (lost on page reload). Add PocketBase to persist.

### Game Session Tracking

- `sessions` collection: `{ gameId, players, finalScores, duration, date }`
- GameModeScreen saves end-of-game snapshot
- Analytics dashboard (future) tracks win rates, common mistakes, strategy effectiveness

---

## File Tree

```
src/
  App.jsx                 # Main state + navigation router
  main.jsx                # React entry; imports index.css
  index.css               # @import "tailwindcss"; @config "./tailwind.config.cjs"
  
  components/
    StartScreen.jsx       # 3 action buttons
    UploadScreen.jsx      # File picker
    AnalysisScreen.jsx    # Progress animation
    GameOverview.jsx      # Main dashboard
    QuickStart.jsx        # 5-step accordion
    SetupScreen.jsx       # Material + assembly
    RulesScreen.jsx       # Rules search + categories
    CoachScreen.jsx       # Chat interface
    GameModeScreen.jsx    # Live play tracking
    LibraryScreen.jsx     # Game collection
    StrategyScreen.jsx    # Strategies + mistakes (tabbed)
    GameFlowScreen.jsx    # Phase breakdown
  
  lib/
    pb.js                 # PocketBase singleton
    gameService.js        # Game model + analysis simulation + coach responses

public/
  favicon.svg             # Blue "N" monogram

vite.config.js
tailwind.config.cjs
index.html                # @lang=de, meta description, title "NeuroPlay"
package.json              # Empty deps; scripts: dev, build, build:prod, preview
```

---

## Key Decisions & Constraints

### Why Screen-Based Navigation (Not React Router)?

- MVP simplicity: single `screen` state prop
- Fast iteration on layout/UX
- No URL routing needed in first version
- Future: upgrade to react-router with basename logic if multi-page needed

### Why Simulate PDF Analysis?

- PDF parsing (client-side `pdfjs` or server-side Python/Node) requires external dependency or API
- Game extraction (NLP, regex, heuristics) is non-trivial
- MVP goal: validate UX, not solve PDF parsing
- Service layer (`analyzeGameDocument`) is clear seam for future replacement

### Why No PocketBase Yet?

- MVP runs entirely client-side (React state)
- Games lost on page reload (acceptable for first version)
- Seam in place: `src/lib/pb.js` is ready; update LibraryScreen + App to persist

### Why Dark Theme?

- Board games are often played in dim/evening settings; matches context
- Reduces visual fatigue during long play sessions
- Modern aesthetic (feels contemporary, not dated)
- Gradient accents keep UI playful, not flat

---

## Testing Checklist

- [ ] Mobile (375px): no horizontal scroll, all buttons reachable
- [ ] Tablet (768px): layout reflows sensibly
- [ ] Desktop (1280px): full experience works
- [ ] Example game flow: Start → Upload (use browser file picker) → Analysis → Overview → all 6 buttons
- [ ] Quick Start: all 5 steps expand/collapse
- [ ] Rules: search by keyword; categories expand
- [ ] Coach: quick buttons + free-form input work
- [ ] Game Mode: phases advance, scoreboard updates (mock)
- [ ] Library: loads empty; after example game, card appears
- [ ] Back buttons: all screens return to correct parent

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- React 18 SSR not needed (SPA only)
- Vite target: ES2020 (no IE11)

---

## Performance Notes

- Lazy loading: not needed yet (single ~250KB JS bundle)
- Images: none in MVP (all icons via lucide-react)
- Animations: CSS-only (no JS animation libraries)
- Network: one simulated 3-second delay (analyzeGameDocument); otherwise instant

Future: Code-split screens if app grows large.

---

## Commands

```bash
npm run dev          # Vite dev server (HMR enabled)
npm run build        # Build for preview (dist-preview/)
npm run build:prod   # Build for production (dist/)
npm run preview      # Serve dist/ locally for testing
```

---

Last updated: 2025-01-23 (initial MVP commit)
