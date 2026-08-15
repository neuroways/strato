# Project Setup – Tennisturnier Management

Last updated: 2026-07-26

## Stack

**Vite + React** single-page app (JSX), styled with **Tailwind CSS v4**. React Router v7 for client-side routing.

The app is rendered inside **React StrictMode** in dev. StrictMode intentionally double-invokes components, effects, and state updaters (mounting each component twice on the first render) to surface unsafe side effects. Write code that tolerates this: effects must clean up after themselves (return a teardown from `useEffect`), and rendering, reducers, and state updaters must be pure — no side effects, mutation, or one-off work outside an effect.

Provided by the platform (available at runtime — never add these to `package.json`): React, react-dom, react-router, Vite, @vitejs/plugin-react, lucide-react, pocketbase, `tailwind-merge`, and the Tailwind v4 engine itself. This project has **no dependencies of its own** — `package.json` is empty and there is no `node_modules`. Do not `npm install` anything for styling.

## Tailwind v4 notes

This is Tailwind **v4**, not v3. Almost all utilities are identical, but:

- The stylesheet entry is `@import "tailwindcss";` (not the three `@tailwind` directives). Already set up in `src/index.css`.
- **Theme customization goes in `tailwind.config.cjs`** (custom colors, fonts, spacing under `theme.extend`). It is wired in via `@config` in `index.css` — edit the config file as you would in v3. You may instead define tokens with a `@theme { --color-brand: …; }` block in `index.css`.
- **Never add `postcss.config`, `postcss`, or `autoprefixer`** — vendor prefixing is built into the v4 engine. Adding them breaks the build.
- A few renamed utilities vs v3: `shadow` → `shadow-sm`, `shadow-sm` → `shadow-xs`, `rounded` → `rounded-sm`, `outline-none` → `outline-hidden`, `flex-shrink-0` → `shrink-0`, and `bg-opacity-50` → the `bg-black/50` slash syntax. The default border color is now `currentColor` (set one explicitly, e.g. `border border-gray-200`).
- Arbitrary values (`w-[473px]`, `text-[#1da1f2]`, `grid-cols-[1fr_2fr]`) work exactly as in v3.

## Structure

```
src/
  App.jsx               # Root component with routing
  main.jsx              # Entry point — renders <App /> into #root
  index.css             # @import "tailwindcss" + @config bridge
  lib/
    pb.ts              # PocketBase client instance
    api.ts             # API service functions for collections
  pages/
    Home.jsx            # Homepage with hero and tournament info
    Register.jsx        # Player registration form
    Participants.jsx    # Public participant list
    Schedule.jsx        # Match schedule
    Results.jsx         # Match results
    Contact.jsx         # Contact & venue information
    Admin.jsx           # Admin login & dashboard
public/
  favicon.svg           # Brand mark (tennis racket + heart)
index.html              # HTML with title & meta tags
package.json · vite.config.js · tailwind.config.cjs
```

`dist/` is committed (the deploy reads from it); `node_modules/` is ignored.

## Database Integration

The app uses PocketBase for data persistence. Collections are created on demand via REST API calls in `src/lib/api.ts`. The following collections are supported:

- **tournaments** — tournament info (title, date, time, status, location)
- **locations** — venue details (address, parking, arrival info)
- **contacts** — contact persons
- **info_sections** — editable information blocks
- **courts** — tennis courts
- **players** — player profiles (name, age, experience level)
- **registrations** — player tournament registrations
- **rounds** — tournament rounds
- **matches** — match schedule
- **match_players** — players in each match
- **results** — match results
- **ai_schedule_runs** — AI-generated schedule history

All collection operations use the PocketBase SDK (`new PocketBase()` with no arguments — the platform routes to the correct backend automatically).

## Routing

The published `dist/` is served from more than one base path (the live site at `/`, and read-only history snapshots under a longer prefix). The build uses a relative asset base plus a `<base href>` in `index.html` so the same output works from any of them — so two rules keep links and assets from breaking:

- **Never hardcode root-absolute URLs** (a leading `/`) for in-app assets or links — `/logo.png`, `/about`, `fetch("/data.json")`. Import assets (`import logo from "./logo.png"`) or reference them relatively; they then resolve against the base automatically.
  - **Exception — `/static/…`.** Files in the project's `static/` directory are served by the platform at the fixed absolute URL `/static/<filename>`, which resolves the same on every base path (live, preview, snapshots) because it's mapped outside the app, not bundled into `dist/`. Reference these **exactly** as `/static/<file>` (e.g. `<img src="/static/photo.jpg">`) — leading slash and all. This is the one allowed root-absolute path. Never copy a `static/` asset into the app (`public/`, `src/`) and never reach it with a relative `../` path.
- **Router is already set up with BrowserRouter.** Pages are mounted via `Routes` and `Route` from `react-router`. Use `Link` and `NavLink` for internal navigation (never `<a href>` for in-app links). Route paths are root-relative, e.g. `"/about"`, `"/schedule"`.

## Current State

Phase 1 MVP is complete:

✓ Database schema designed (13 collections)
✓ Public pages: Home, Register, Participants, Schedule, Results, Contact
✓ Admin interface: Login, Dashboard (placeholder)
✓ Player registration (public, no admin approval required)
✓ Tournament data management via PocketBase
✓ Responsive design (mobile-first, Tailwind v4)
✓ Brand colors: green (#16A34A) + accents

### Remaining for Phase 2+

- Full admin dashboard with statistics
- Match creation and scheduling UI
- Result entry interface
- AI schedule generator integration
- Support for doubles (extended match_players schema)
- Knockout stage support
- Live updates / polling
- PDF export
- QR codes for matches

## Identity

- **Title:** "Tennisturnier Neindorf — Ein Tag für alle!"
- **Description:** "Vereinstennisturnier in Neindorf mit Fokus auf Spaß, Geselligkeit und Verpflegung für alle Erfahrungsstufen."
- **Colors:** Green (#16A34A primary), yellow (#F3EB38 accents), white backgrounds
- **Favicon:** Tennis racket + heart SVG mark
- **Tone:** Friendly, inclusive, family-oriented
