# Project Architecture Overview

## Directory Layout

```
project-root/
├── app/                    # Vite + React Application (separate git repo)
│   ├── src/                # React source code
│   ├── dist/               # Build output (deployed)
│   ├── AGENTS.md           # Detailed technical documentation
│   ├── package.json        # Empty (platform-provided dependencies)
│   ├── vite.config.js      # Build configuration
│   └── ... (React project structure)
│
├── docs/
│   └── handover/
│       └── PROJECT_HANDOVER.md     # Complete project handover (1400 lines)
│
├── static/                 # Assets served at /static/
│   ├── asg-klangwerk-logo.png
│   └── school-logo.png
│
├── README.md               # Quick start guide (392 lines)
├── BACKUP_STATUS.md        # Backup & handover status report
└── ARCHITECTURE.md         # This file
```

## Project Structure

### Frontend Application (app/)

**React 18 + React Router v7 + Tailwind CSS v4 (Vite)**

- **13 Page Components** (pages/): Home, Devices, Cabling, SignalFlow, Studio, Learning, Quiz, Knowledge, Errors, Verification, Dashboard, Management, Documentation
- **4 Service Modules** (services/): quiz-engine, quiz-service, studio-data-service, verification-service
- **3 Type Definitions** (types/): index.ts (Device types), learning.ts (Learning types), quiz.ts (Quiz types)
- **8 Data JSON Files** (data/): initial-studio-data, quiz-questions-complete, learning-modules, device-roles, knowledge, errors, cables, connections
- **2 Reusable Components** (components/): DeviceCard, ConnectionLine
- **1 Global Layout** (layouts/): SiteLayout with Navigation & Footer

**Total Code:** 5,336 lines (React components, TypeScript, business logic)

### Build & Configuration

- **Vite**: Modern build tool with instant HMR (hot module reload)
- **Tailwind CSS v4**: Utility-first styling, dark mode enabled
- **No external dependencies**: All platform-provided (React, Router, Tailwind, lucide-react)

### Data Storage

**Client-side only:**
- localStorage for quiz sessions & learning progress
- JSON files (static, version-controlled)
- No database required, no API calls

### Deployment

- **Platform**: IONOS Group (SFS)
- **Static Files**: Served from dist/ after build
- **Assets**: /static/ path (mapped outside app bundle)
- **Dev Server**: Vite with HMR for live reload

---

## Navigation Structure

```
/                     Home (Landing Page)
├── /devices          Gerätewelten (Device Explorer)
├── /cabling          Verbindungscheck (Connection Tester)
├── /signal-flow      Signalwege (Signal Path Visualization)
├── /studio           Studio-Raum (Interactive SVG)
├── /learning         Studio-Missionen (Learning Hub)
├── /quiz             Klang-Challenges (Quiz Engine)
├── /knowledge        Klangwissen (Knowledge Base)
├── /errors           Studio-Notfall (Troubleshooting)
├── /verification     Mein Fortschritt (Progress Tracker)
├── /dashboard        Dashboard (Statistics)
└── /management       Admin (Data Management - not in main nav)
```

---

## Key Features

### 1. Quiz Engine
- 40 pedagogically verified questions
- 4 difficulty levels (Entdecken → Studio-Profi)
- Adaptive feedback (why correct, why others fail, technical explanation)
- Local session persistence
- Learning progress tracking

### 2. Device Catalog
- 16 studio devices with full specifications
- 10 device categories
- Search & filter functionality
- Interactive details & expandable specs

### 3. Connection Tester
- Select any two devices
- Check compatibility
- Show available cables & signal types
- Explain why connections don't work

### 4. Learning Modules
- 7 structured learning paths
- Links to devices & quiz questions
- Progress tracking
- Module-based organization

### 5. Interactive Visualizations
- SVG-based studio room layout
- Signal flow paths (5 predefined)
- Connection matrix
- Real-time updates

### 6. Error Troubleshooting
- 20+ common studio problems
- Symptom-based diagnosis
- Solution steps
- Search functionality

---

## Technology Decisions

| Decision | Reason | Trade-off |
|----------|--------|-----------|
| **Client-side only** | Offline-tauglich, schnell, einfach | Keine Benutzer-Konten, Daten lokal |
| **JSON + localStorage** | Git-versionierbar, einfach | Skalierung auf 1000+ Geräte schwierig |
| **React Router v7** | Client-side Navigation, schnell | Jede Route muss in App.jsx definiert sein |
| **Tailwind CSS v4** | Modernes Setup, kleine Bundle | Keine strikten Type-Definitions |
| **4 Quiz-Stufen** | Klare Progression | Anfänger könnten zu anspruchsvoll sein |
| **Deutsch lokalisiert** | ASG Zielgruppe (Deutschland) | Übersetzung für Internationalisierung nötig |
| **Orange Branding** | ASG Identity | Orange auf Dunkel schwer zu lesen |
| **Pädagogisches Feedback** | Schulkontext erfordert Support | Größere Daten-Dateien, komplexere Logik |

---

## Data Models

### Gerät (Device)
```typescript
- id, name, kategorie, beschreibung
- hersteller, modell
- anschlüsse: Anschluss[]
- status, dokumentationsvollständigkeit
```

### QuizFrage
```typescript
- id, titel, frage, aufgabentyp, schwierigkeitsstufe
- antworten: QuizAntwort[]
- feedback, lösungserklärung, hinweis
- bestätigungsstatus, aktiv
```

### QuizSession
```typescript
- id, startAm, schwierigkeitsstufe, gewählteThemen
- fragen: QuizFrage[]
- antworten: QuizAntwortBenutzer[]
- statistik: QuizSessionStatistik
```

### Lernmodul
```typescript
- id, titel, beschreibung
- ziele: string[]
- verknüpfteGeräte: string[]
- verknüpfteQuizFragen: string[]
```

---

## Responsive Design

**Breakpoints (Tailwind):**
- Mobile: 375px (sm)
- Tablet: 768px (md)
- Desktop: 1280px (lg)

**Mobile-First Approach:**
- Base styles for 375px
- sm: overrides for 640px
- md: overrides for 768px
- lg: overrides for 1024px+

**Tested Scenarios:**
- ✅ Portrait mobile (375px)
- ✅ Landscape mobile / tablet (768px)
- ✅ Desktop (1280px+)
- ✅ Touch targets (≥44px)
- ✅ Text readable without zoom
- ✅ No horizontal scrolling

---

## Browser Support

**Minimum Requirements:**
- ES2020+ JavaScript support
- CSS Grid & Flexbox
- localStorage API

**Tested On:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Mobile Chrome / Safari (iOS 14+, Android 10+)

**Not Supported:**
- Internet Explorer 11
- Very old mobile browsers (< 2020)

---

## Performance Characteristics

**Bundle Size:**
- React + Router: ~180 KB
- Tailwind CSS: ~50 KB
- App Code: ~100 KB
- **Total**: ~330 KB (gzipped ~90 KB)

**Load Time:**
- Initial Load: ~1-2 seconds (depends on connection)
- Quiz Navigation: <100ms (client-side)
- Device Filter: <50ms

**Optimization Opportunities:**
- Code-splitting (Quiz, Learning as lazy routes)
- Image optimization (logos)
- Service Worker (offline mode)
- Bundle analysis (vite-plugin-visualizer)

---

## Deployment Pipeline

```
Local Development
  ↓ (npm run dev)
Vite Server with HMR
  ↓ (Code changes reload instantly)
Build
  ↓ (npm run build:prod)
dist/ folder
  ↓ (git push)
GitHub Repository
  ↓ (Platform detected)
IONOS SFS Platform
  ↓
Production Website (LIVE)
```

---

## File Organization Principles

- **Colocation**: Components live near where they're used
- **Single Responsibility**: Each service does one thing
- **Type Safety**: TypeScript types define contracts
- **Data-Driven**: JSON files are single source of truth
- **No Magic**: Explicit imports, no hidden dependencies

---

## Next Steps After Handover

**Phase 1: Validation (1-2 weeks)**
- Verify physical studio mapping
- Update device status fields
- Check quiz data accuracy

**Phase 2: Content (2-3 weeks)**
- Complete X32 chapters 6-9
- Fill learning module content
- Build quiz admin UI

**Phase 3: Features (3-4 weeks)**
- Add music history section
- Implement admin authentication
- Complete photo upload feature

**Phase 4: Quality (2-3 weeks)**
- Add unit tests
- Performance optimization
- Accessibility audit

See `docs/handover/PROJECT_HANDOVER.md` section 26 for detailed roadmap.

---

**For complete technical details, see `app/AGENTS.md`**  
**For full project handover, see `docs/handover/PROJECT_HANDOVER.md`**
