# Project Setup

Last updated: 2026-07-23 (method versioning; Energy Navigator bumped to 1.1.0)

Factual state of this project, for the assistant's reference. Record project
state here only — structure, installed packages, active patterns. Keep it brief.

## App

**NeuroWays Energy Navigator** — a self-observation tool for tracking personal energy and stress states. No medical diagnosis or therapeutic recommendations. Designed for neurodivergent users: calm, low-stimulation UI, large tap targets, one question at a time.

**Architecture: Generic Method Engine.** All questions, answer options, result rules, and zone definitions live in the backend. No questions, option labels, or score thresholds are hardcoded in the frontend. New methods can be added purely through data, without code changes.

## Stack

A **Vite + React** single-page app (JSX), styled with **Tailwind CSS v4**. The dev server runs with live reload.

Provided by the platform (available at runtime — never add to `package.json`): React, react-dom, react-router, Vite, @vitejs/plugin-react, lucide-react, pocketbase, `tailwind-merge`, Tailwind v4 engine.

## Tailwind v4 notes

- Stylesheet entry: Google Fonts @import first, then `@import "tailwindcss"`.
- Never add `postcss.config`, `postcss`, or `autoprefixer`.

## Structure

```
src/
  App.jsx               # Root — BrowserRouter + Routes (5 pages)
  main.jsx              # Entry — renders <App/> in StrictMode
  index.css             # Google Fonts import → @import "tailwindcss"
  lib/
    pb.js               # Shared PocketBase client: export const pb = new PocketBase()
    engine.js           # All data-access logic (methods, questions, options, rules, checkins)
  components/
    Nav.jsx             # Top nav (desktop) + bottom nav (mobile)
    ZoneCard.jsx        # Renders a result_rule record (full + compact variants)
    ZoneIcon.jsx        # Icon switcher using icon: imports, keyed by rule.icon string
  pages/
    Home.jsx            # Start page — loads last checkin + rule from DB
    CheckIn.jsx         # Step-by-step — all questions + options loaded from DB
    Result.jsx          # Result detail — loads checkin, rule, and enriched answers from DB
    History.jsx         # Timeline + mini chart — loads all checkins + rules from DB
    Privacy.jsx         # Export + delete all (via engine.js helpers)
public/
  favicon.svg           # Teal rounded "N" mark
index.html              # lang=de, NeuroWays title, meta description
```

## Backend collections (PocketBase — dev instance)

### Result rules — current boundaries (6-question scale, range 6–30)

| Zone     | min | max | old min | old max |
|----------|-----|-----|---------|---------|
| festland |  6  |  12 |    5    |   10   |
| wald     | 13  |  17 |   11    |   14   |
| kueste   | 18  |  20 |   15    |   17   |
| meer     | 21  |  25 |   18    |   21   |
| insel    | 26  |  30 |   22    |   25   |

`warnIfScaleOutOfSync(questions, allOptions, rules)` — non-blocking diagnostic called on check-in load. Logs to console if result_rules range doesn't match achievable score range, or if there are gaps/uncovered values.

### Collections
|-------------------|---------|
| `methods`         | One record per method (e.g. energy_navigator) |
| `questions`       | Questions per method, sorted by sort_order |
| `answer_options`  | Options per question, sorted by sort_order |
| `result_rules`    | Score-range → zone mapping per method |
| `checkins`        | One record per completed check-in session |
| `checkin_answers` | One record per answered question per check-in |
| `checkin_results` | Legacy — kept but no longer written to |
| `users`           | PocketBase default auth collection |

All collections have open rules (`""`) — no auth required for MVP.

### Method versioning

- `checkins` has a `method_version` (text) field.
- `saveCheckin()` always writes `method.version` into this field.
- Existing checkins without a version were backfilled to `"1.0.0"`.
- Energy Navigator is now at version `1.1.0` (6 questions, 6–30 scale).
- Historical checkins keep their original version and result — never recalculated.

### Seeded data (dev)

- **Method:** `energy_navigator` (id: `n30mevlbwbdv5e8`)
- **Questions:** 5 — energy, effort, sensitivity, decisions, flexibility
- **Answer options:** 25 total (5 per question, numeric_value 1–5)
- **Result rules:** festland (5–10), wald (11–14), kueste (15–17), meer (18–21), insel (22–25)
- **Migrated checkin:** 2026-07-23, score=18 (meer), 5 answers

### Validation

`validateMethodReadiness(method, questions, optionsByQuestion, rules)` — called before check-in starts:
- Returns `{ valid: true }` or `{ valid: false, reason: string }`
- Checks: method exists, ≥1 question, ≥1 result rule, every required question has ≥1 option
- Logs missing question codes to console

`partitionQuestions(questions, optionsByQuestion)` — splits questions into:
- `answerable` — have at least one option
- `skipped` — optional, no options (silently skipped)
- `blockers` — required, no options (used by runtime guard)

Runtime guard in `CheckIn.jsx`: if a required question has no options mid-session → show error + "Back to Start", do not save. Optional question with no options → auto-skip.

### Questions (6 total, as of 2026-07-23)

| sort | code | required |
|------|------|----------|
| 10 | energy | yes |
| 20 | effort | yes |
| 30 | sensitivity | yes |
| 40 | decisions | yes |
| 50 | flexibility | yes |
| 60 | transition | yes |

### engine.js exports

- `getActiveMethod(signal)` — first active method by sort_order
- `getQuestionsForMethod(methodId, signal)` — active questions sorted by sort_order
- `getAnswerOptions(questionId, signal)` — options for one question
- `getAllAnswerOptionsForQuestions(questionIds, signal)` — batch load for all questions
- `getResultRules(methodId, signal)` — all result rules for a method
- `resolveResultRule(rules, score)` — find matching rule by score range
- `saveCheckin({methodId, answers, rule})` — create checkin + all answers
- `getCheckinHistory(page, perPage, signal)` — paginated history
- `getCheckinById(id, signal)` — single checkin record
- `getAnswersForCheckin(checkinId, signal)` — all answers for a checkin
- `deleteCheckin(id)` — delete answers first, then checkin
- `deleteAllCheckins()` — delete all checkins and their answers
- `exportAllData()` — returns {checkins, answers} for JSON download

## Design

- Typeface: DM Sans (Google Fonts)
- Accent: teal #2a9d8f
- Background: gray-50 (#f9fafb)
- Mobile-first; bottom tab nav on mobile, top nav on desktop ≥768px
- Large touch targets (min 60px for answer buttons)
- ZoneCard and ZoneIcon read color, bg_color, icon from result_rules records

## Routing

BrowserRouter basename from `new URL(document.baseURI).pathname.replace(/\/$/, "")`.
Routes: `/`, `/checkin`, `/result/:id`, `/history`, `/privacy`.
