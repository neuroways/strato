════════════════════════════════════════════════════════════
NEUROWAYS ENERGY NAVIGATOR — Vollständiger Quellcode-Export
Exportiert: 23.7.2026, 21:31:54
════════════════════════════════════════════════════════════

INHALTSVERZEICHNIS
──────────────────
./.gitignore
./.platform-deps
./AGENTS.md
./NEUROWAYS_WORLD.md
./NW-DEPLOY-001_DEPLOYMENT_STANDARD.md
./NW-DS-001_DESIGN_PHILOSOPHY.md
./NW-DS-002_LOGO_SYSTEM.md
./NW-DS-003_COLOR_SYSTEM.md
./NW-DS-004_TYPOGRAPHY.md
./NW-DS-005_LAYOUT_SYSTEM.md
./NW-DS-006_COMPONENT_SYSTEM.md
./NW-DS-007_ILLUSTRATION_SYSTEM.md
./NW-DS-008_MOTION_SYSTEM.md
./NW-DS-009_BRAND_APPLICATIONS.md
./NW-GOVERNANCE-FOUNDATION-v1.0.md
./NW-IDENTITY-001_IDENTITY_MEMBERSHIP_SPEC.md
./NW-IDENTITY-002_PRODUCTIVE_INTEGRATION.md
./NW-IDENTITY-POC-001_REPORT.md
./NW-KAS-001_KNOWLEDGE_ASSET_STANDARD.md
./NW-PKG-001_MODULE_VERSION_PACKAGE_MODEL.md
./NW-STD-000_STANDARDS_FRAMEWORK.md
./NW-STD-001_NAMING_STANDARD.md
./NW-STD-002-REGISTER.md
./NW-STD-002_STANDARDS_REGISTRY.md
./NW-STD-003_DATABASE_STANDARD.md
./index.html
./nw_migrate.js
./package-lock.json
./package.json
./public/apple-touch-icon.png [Binärdatei]
./public/favicon-16x16.png [Binärdatei]
./public/favicon-32x32.png [Binärdatei]
./public/favicon.svg
./public/icons/icon-128x128.png [Binärdatei]
./public/icons/icon-144x144.png [Binärdatei]
./public/icons/icon-152x152.png [Binärdatei]
./public/icons/icon-167x167.png [Binärdatei]
./public/icons/icon-180x180.png [Binärdatei]
./public/icons/icon-192x192.png [Binärdatei]
./public/icons/icon-256x256.png [Binärdatei]
./public/icons/icon-384x384.png [Binärdatei]
./public/icons/icon-48x48.png [Binärdatei]
./public/icons/icon-512x512.png [Binärdatei]
./public/icons/icon-72x72.png [Binärdatei]
./public/icons/icon-96x96.png [Binärdatei]
./public/icons/icon-maskable-192x192.png [Binärdatei]
./public/icons/icon-maskable-512x512.png [Binärdatei]
./public/manifest.webmanifest
./public/neuroflow-icon.svg
./src/App.jsx
./src/components/AnswerCard.jsx
./src/components/AuthNav.jsx
./src/components/Nav.jsx
./src/components/ProtectedRoute.jsx
./src/components/ZoneCard.jsx
./src/components/ZoneIcon.jsx
./src/index.css
./src/lib/asset_engine_validation.js
./src/lib/authContext.jsx
./src/lib/engine.js
./src/lib/identity.js
./src/lib/pb.js
./src/main.jsx
./src/pages/CheckIn.jsx
./src/pages/DashboardPage.jsx
./src/pages/ForgotPasswordPage.jsx
./src/pages/History.jsx
./src/pages/Home.jsx
./src/pages/IdentityPoc.jsx
./src/pages/LoginPage.jsx
./src/pages/Privacy.jsx
./src/pages/PromptLibraryPage.jsx
./src/pages/RegisterPage.jsx
./src/pages/Result.jsx
./tailwind.config.cjs
./vite.config.js


DATEIINHALTE
════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────
│ ./.gitignore
└─────────────────────────────────────────────────
node_modules/
build.log
vite.log
harrier.log
.node-compile-cache/
server.js
dist-preview/
.built

┌─────────────────────────────────────────────────
│ ./.platform-deps
└─────────────────────────────────────────────────
# Fast Refresh runtime for @vitejs/plugin-react@4 (vite6 externalises it).
# server.js symlinks node_modules/<pkg> -> global at startup (tmpfs-safe).
react-refresh

┌─────────────────────────────────────────────────
│ ./AGENTS.md
└─────────────────────────────────────────────────
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

┌─────────────────────────────────────────────────
│ ./NEUROWAYS_WORLD.md
└─────────────────────────────────────────────────
# NeuroWays World — Design Standard v1.1.0

*Verbindlicher Gestaltungsstandard für alle NeuroWays-Module*
*Zuletzt aktualisiert: 2026-07-23*

---

## 1. Vision

NeuroWays World ist eine visuelle Sprache für innere Zustände.

Sie gibt Menschen Orientierung, ohne sie zu beurteilen. Sie zeigt, wo jemand gerade steht — nicht, wo er oder sie stehen sollte. Sie bewertet nicht. Sie drängt nicht. Sie wartet.

Die Welt entstand aus der Überzeugung, dass Menschen mit unterschiedlichen Denk-, Wahrnehmungs- und Energiemustern klare, ruhige Bilder brauchen — Bilder, die sie wiedererkennen, ohne dass viele Worte nötig sind.

NeuroWays World ist keine Spielwelt. Sie hat kein Ziel, keinen Fortschritt, keine Punkte. Sie ist ein Spiegel.

---

## 2. Leitbild

**Die NeuroWays World ist eine visuelle Orientierungshilfe.**

Sie bildet innere Zustände in einer gemeinsamen Bildsprache ab. Jede Region steht für einen Zustand, der real ist und der seine Berechtigung hat.

**Es gibt keine guten oder schlechten Regionen.**

Das Festland ist nicht besser als die Insel. Das Meer ist keine Gefahr. Die Insel ist kein Scheitern. Jede Region hat ihre eigene Funktion, ihre eigene Ruhe, ihre eigene Bedeutung.

**Jede Region besitzt ihre eigene Funktion:**

| Region | Funktion |
|--------|----------|
| Festland | Gestalten und Bewegen |
| Wald | Fließen und Verbrauchen |
| Küste | Innehalten und Wenden |
| Meer | Schützen und Halten |
| Insel | Ruhen und Regenerieren |

**Ziel ist Orientierung, Selbstbeobachtung und Verständnis — niemals Leistung, Wettbewerb oder Optimierung.**

Die Welt soll Ruhe vermitteln.

---

## 3. Die Welt

NeuroWays World ist eine durchgehende Küstenlandschaft. Alle Regionen sind Ausschnitte derselben Welt.

Ein Panorama, das vom offenen Inland hinaus aufs Meer und schließlich zur stillen Insel führt.

**Das verbindende Element ist Wasser.**

Ein Fluss beginnt auf dem Festland als klarer Bach. Er wird breiter im Wald. Er mündet an der Küste ins Meer. Das Meer trägt ihn weiter bis zur Insel, wo das Wasser wieder still und ruhig liegt.

Das Wasser fließt immer. Es steht nie still aus Erschöpfung. Es ruht aus Tiefe.

**Die Welt ist menschenleer.**

Keine Personen, keine Silhouetten, keine Spuren. Der Betrachtende ist selbst der einzige Mensch darin. Die Welt gehört ihm oder ihr vollständig.

**Die Welt hat kein Ende.**

Jenseits der Insel beginnt eine neue Ruhe. Hinter dem Festland liegt weiteres Land. Die Welt ist offen.

---

## 4. Regionen

### Festland
**Charakter:** Weit, offen, gestaltend
**Landschaft:** Weites Plateau, sanfte Hügel, klarer Bach in der Mitte, offener Himmel
**Licht:** Hell, klar, viel Weite
**Funktion:** Energie ist verfügbar. Gestalten, Bewegen, Entscheiden ist möglich.
**Farbe:** `#2a9d8f`
**Orientierungspunkt:** Markante Flussbiegung mit altem Einzelbaum

### Wald
**Charakter:** Schützend, fließend, spürbar verbrauchend
**Landschaft:** Lichter Mischwald, Bach wird breiter, Sonnenlicht fällt schräg durch Baumkronen
**Licht:** Warm, gebrochen, Streulicht
**Funktion:** Energie wird verbraucht. Der Weg führt weiter, kostet aber.
**Farbe:** `#52b788`
**Orientierungspunkt:** Großer, freistehender Baum mit weit ausladender Krone

### Küste
**Charakter:** Wendepunkt, Übergang, klare Sicht
**Landschaft:** Steilküste, Bach mündet ins Meer, Blick weit über das Wasser
**Licht:** Diffus, leichter Dunst, Horizont sichtbar aber weicher
**Funktion:** Natürlicher Wendepunkt. Belastung reduzieren, bevor die Energie weiter sinkt.
**Farbe:** `#4a9abb`
**Orientierungspunkt:** Leuchtturm auf dem Fels

### Meer
**Charakter:** Still, weit, kraftaufwendig — niemals bedrohlich
**Landschaft:** Offenes, ruhiges Wasser, flache Wellen, kein Land sichtbar, schwerer Himmel
**Licht:** Gedämpft, blau-grau, ruhig
**Funktion:** Hoher Kraftaufwand. Schutz und Entlastung werden wichtig.
**Farbe:** `#6b7faa`
**Orientierungspunkt:** Kleiner Holzsteg oder Boje am Bildrand — ein Zeichen, dass Wege existieren

### Insel
**Charakter:** Geborgen, ruhend, regenerierend
**Landschaft:** Kleine Insel, ein einzelner Baum, stilles Wasser ringsum, leichter Morgennebel
**Licht:** Weiches, warmes Licht, fast still
**Funktion:** Rückzug und Regeneration. Hier darf man einfach sein.
**Farbe:** `#8b6f9e`
**Orientierungspunkt:** Der einzelne Baum auf der Insel — er ist immer da

---

## 5. Bewegungsregeln

Diese Regeln gelten verbindlich für alle NeuroWays-Module, jetzt und in Zukunft.

1. **Alle Regionen sind miteinander verbunden.** Es gibt keine Sackgassen.
2. **Jede Region besitzt sichtbare Übergänge.** Man sieht, wohin der Weg führt.
3. **Bewegung ist immer möglich.** Kein Zustand ist endgültig.
4. **Das Wasser verbindet alle Regionen.** Es ist das navigierbare Element der Welt.
5. **Die Küste ist der natürliche Wendepunkt.** Von hier aus kann man in beide Richtungen.
6. **Die Insel ist ein Ort des Schutzes, nicht der Isolation.** Sie ist erreichbar und verlassbar.
7. **Kein Rückweg ist ein Rückschritt.** Zurück zum Festland ist genauso wertvoll wie vorwärts.
8. **Neue Regionen entstehen am Rand der bestehenden Welt.** Sie verändern bestehende Regionen nicht.

---

## 6. Orientierungspunkte

Natürliche und einfache Landmarken helfen ohne Text zu navigieren. Sie sind keine Spielelemente.

| Orientierungspunkt | Region | Bedeutung |
|--------------------|--------|-----------|
| Alter Einzelbaum an der Flussbiegung | Festland | Stabilität, Verwurzelung |
| Großer Baum mit weiter Krone | Wald | Schutz, Sammlung |
| Leuchtturm auf dem Fels | Küste | Orientierung, Wendepunkt |
| Holzsteg / Boje | Meer | Es gibt Wege, auch hier |
| Einzelner Baum auf der Insel | Insel | Stille Begleitung, Geborgenheit |

**Regeln für Orientierungspunkte:**
- Ausschließlich natürliche oder sehr einfache Strukturen
- Keine Schilder, Beschriftungen, Pfeile oder Symbole innerhalb der Illustration
- Keine Gebäude außer dem Leuchtturm (Küste)
- Ein Orientierungspunkt pro Region — nicht mehr
- Jeder Orientierungspunkt ist in allen Abbildungen derselben Region konstant

---

## 7. Symbolsprache

### Energiestufen-Icons (universell)

Das verbindende Symbol für alle NeuroWays-Methoden ist **fließendes Wasser**.

Fließendes Wasser ist sichtbare Energie. Viel Fluss bedeutet viel Kraft. Stilles Wasser bedeutet: die Kraft ruht.

Die fünf Energiestufen werden als Wellenlinie dargestellt — von lebhaft bis still:

| Stufe | Symbol | Beschreibung | Bedeutung |
|-------|--------|--------------|-----------|
| 1 | Drei gleichmäßige, volle Wellenkurven | Klar fließender Bach | Kraft ist da, fließt von selbst |
| 2 | Zwei Wellenkurven, leicht flacher | Gleichmäßige Strömung | Fließt noch gut, leichter Aufwand |
| 3 | Eine Wellenkurve, neutral | Ruhige Bewegung | Merkliche Anstrengung |
| 4 | Eine sehr flache Kurve | Fast still | Kaum Bewegung, hoher Aufwand |
| 5 | Horizontale Linie | Stilles Wasser | Die Kraft ruht — Schutz nötig |

**Komponente:** `<EnergyWave level={1–5} />` — eine einzelne, skalierbare SVG-Komponente.

**Wichtig:** Stufe 5 bedeutet nicht Scheitern. Stilles Wasser ist tief. Es ist nicht leer.

### Zonenicons (für Navigation und Verlauf)

Jede Region hat ein einfaches geometrisches Icon, das den Charakter der Region auf kleinstem Raum vermittelt:

| Region | Icon | Begründung |
|--------|------|------------|
| Festland | Berg / Horizont | Offene Weite, fester Boden |
| Wald | Baumkrone | Schutz, Sammlung |
| Küste | Welle trifft Fels | Übergang, Wendepunkt |
| Meer | Ruhige Wellenlinie | Weite, Tiefe |
| Insel | Kleiner Kreis mit Baum | Geborgenheit, Eigenraum |

---

## 8. Designsystem

### 8.1 Farbpalette

**Unveränderliche Grundtöne — gelten für alle Module:**

| Token | Wert | Verwendung |
|-------|------|------------|
| `nw-sky` | `#f0f4f5` | Himmel in allen Zonenillustrationen |
| `nw-water` | `#c8dfe8` | Wasser, Fluss, Meer |
| `nw-ground` | `#e8e0d5` | Boden, Fels, Sand |
| `nw-neutral-bg` | `#f9fafb` | App-Hintergrund |
| `nw-text` | `#2d3748` | Fließtext |
| `nw-text-muted` | `#6b7280` | Sekundärtext, Hinweise |

**Zonenfarben — einer pro Region, unveränderlich:**

| Token | Wert | Region |
|-------|------|--------|
| `nw-festland` | `#2a9d8f` | Festland |
| `nw-wald` | `#52b788` | Wald |
| `nw-kueste` | `#4a9abb` | Küste |
| `nw-meer` | `#6b7faa` | Meer |
| `nw-insel` | `#8b6f9e` | Insel |

**Hintergrundflächen (je 10 % Deckkraft der Zonenfarbe):**

| Token | Wert |
|-------|------|
| `nw-festland-bg` | `#e8f5f3` |
| `nw-wald-bg` | `#edf6f1` |
| `nw-kueste-bg` | `#eaf4f8` |
| `nw-meer-bg` | `#eff1f7` |
| `nw-insel-bg` | `#f3eff7` |

### 8.2 Illustration

**Stil:** Flache Vektorgrafik mit organischen Formen. Keine Outlines. Weiche Übergänge zwischen Farbflächen (Soft-blend). Leichte Papier- oder Leinentextur als Overlay (Deckkraft max. 8 %).

**Format Zonenbilder:** 800 × 480 px (Querformat)
**Format Thumbnails / Verlauf:** 400 × 240 px (dieselben Bilder, skaliert)
**Format Icons (Zones):** 48 × 48 px, SVG
**Format Icons (Energiestufen):** 24 × 16 px, SVG

**Perspektive:** Leicht erhöhte Augenhöhe. Horizont immer sichtbar, immer im oberen Drittel.

**Licht:** Diffus, weich, ohne Richtung. Die Welt leuchtet von innen. Keine Schatten mit harten Kanten.

**Personen / Tiere:** Keine. Niemals.

**Text in Illustrationen:** Kein Text. Niemals Beschriftungen, Pfeile oder Symbole innerhalb eines Zonenbildes.

### 8.3 Typografie

**Schriftfamilie:** DM Sans (bereits im Projekt, Google Fonts)

| Einsatz | Gewicht | Größe |
|---------|---------|-------|
| Überschriften | 700 (Bold) | 20–32 px |
| Zonentitel | 600 (SemiBold) | 18–24 px |
| Fließtext | 400 (Regular) | 14–16 px |
| Hinweise / Labels | 500 (Medium) | 11–13 px |

**Zeilenhöhe:** 1.5–1.65 für Fließtext, 1.2–1.3 für Überschriften.

**Buchstabenabstand:** Keine künstliche Sperrung außer bei Versalien-Labels (tracking: 0.05em).

### 8.4 Komponenten

Alle UI-Komponenten folgen denselben Grundregeln:

- **Radius:** 16–24 px (organisch, nie hart)
- **Padding:** Großzügig — lieber zu viel Luft als zu wenig
- **Tap-Targets:** Mindestens 44 × 44 px (mobile)
- **Antwort-Buttons:** Mindestens 60 px Höhe
- **Farbe als ergänzendes Signal:** Immer zusammen mit Form oder Text, nie allein

---

## 9. Animationen

**Grundsatz:** Animationen dienen der Orientierung, nicht der Unterhaltung.

**Erlaubte Bewegungen:**

| Element | Bewegung | Geschwindigkeit | Easing |
|---------|----------|-----------------|--------|
| Seitenwechsel | Sanftes Ein-/Ausblenden | 300 ms | ease-in-out |
| Fortschrittsbalken | Wächst nach rechts | 500 ms | ease-out |
| Zonenfarbe (Übergang) | Farbüberblendung | 400 ms | ease-in-out |
| Wasser in Illustrationen | Minimale Wellenbewegung (Loop) | 4–6 s | linear, loop |
| Pflanzen in Illustrationen | Leichtes Wiegen im Wind | 5–8 s | ease-in-out, loop |
| Hover / Fokus | Leichte Aufhellung oder Skalierung (1.02) | 150 ms | ease-out |

**Verboten:**

- Blinkende oder pulsierende Elemente
- Abrupte Schnitte (< 100 ms ohne Absicht)
- Parallax-Effekte
- Endlosschleifen mit sichtbarem Neustart
- Animationen, die der Nutzende nicht gestoppt oder übersprungen werden kann

**`prefers-reduced-motion`:** Alle Animationen — auch Wasseranimationen — müssen bei aktivierter Systemeinstellung vollständig deaktiviert sein. Dann: keine Bewegung, sofortige Zustandsänderung.

---

## 10. Accessibility

**Verbindliche Regeln für alle NeuroWays-Module:**

**Kontraste:**
- Text auf Hintergrund: mindestens WCAG AA (4.5 : 1 für normalen Text, 3 : 1 für großen Text)
- Zonenfarben werden nie direkt als Textfarbe auf weißem Hintergrund verwendet, wenn der Kontrast unzureichend ist

**Informationsvermittlung:**
- Informationen werden niemals ausschließlich über Farbe transportiert
- Jede Zonenfarbe hat ein begleitendes Icon und einen Textlabel
- Energiestufen-Icons haben immer einen `aria-label` (z. B. „Energiestufe 3 von 5")

**Illustrationen:**
- Zonenbilder erhalten ein beschreibendes `alt`-Attribut (z. B. „Illustration der Zone Küste: Steilküste mit Leuchtturm, ruhiges Meer")
- Rein dekorative Elemente erhalten `alt=""`

**Navigation:**
- Vollständig per Tastatur bedienbar
- Fokusringe sichtbar (niemals `outline: none` ohne vollständigen Ersatz)
- Schriftgrößen relativ (rem / em), keine px-feste Basisschrift

**Animationen:**
- `prefers-reduced-motion: reduce` → alle Animationen deaktiviert (siehe Abschnitt 9)

**Sprache:**
- `lang`-Attribut im HTML immer gesetzt
- Zonennamen in der App immer auf Deutsch, auch in technischen Feldern nach außen hin konsistent übersetzt

---

## 11. Erweiterbarkeit

**Grundregel:** Die bestehende Welt wächst. Sie verändert sich nicht.

**Jede neue NeuroWays-Methode erhält:**

1. Eine eigene Region innerhalb derselben Welt (am Rand der bestehenden Landschaft)
2. Eine eigene Zonenfarbe, die harmonisch in die bestehende Palette passt (kein Neon, kein Schwarz, kein reines Weiß)
3. Einen eigenen Orientierungspunkt (natürlich, einfach, unverwechselbar)
4. Dieselbe Illustrationssprache (Stil, Perspektive, Licht, Textur)
5. Dieselbe Energiestufen-Symbolik (`<EnergyWave level={1–5} />`)
6. Eigene result_rules in der Datenhaltung — keine Änderung am bestehenden Code

**Verboten bei Erweiterungen:**
- Bestehende Regionen umbenennen oder umfärben
- Bestehende Zonenfarben für neue Regionen verwenden
- Den Illustrationsstil ändern (kein Comic, kein Foto-Realismus, kein 3D)
- Personen, Tiere oder Text in Illustrationen einführen
- Gamification-Elemente (Punkte, Abzeichen, Ranglisten, Fortschrittsbalken mit Belohnungscharakter)

**Versionierung:**
- Der Design Standard wird bei jeder strukturellen Änderung versioniert (v1.x.0)
- Kosmetische Anpassungen (Farbnuancen, Schriftgröße) erhöhen nur die Patch-Version (v1.1.x)
- Neue Module oder Regionen erhöhen die Minor-Version (v1.x.0)

---

## 12. Offene Entscheidungen (für spätere Freigabe)

Diese Punkte sind bewusst noch nicht festgelegt:

| Thema | Offen |
|-------|-------|
| Animierte Wassereffekte | Werden in einem separaten Animations-Prototype entschieden |
| Dunkel-Modus (Dark Mode) | Noch nicht definiert — eigenes Kapitel bei Bedarf |
| Weitere Methoden-Regionen | Entstehen mit der jeweiligen Methode |
| Sound / Haptik | Bewusst ausgeklammert |

---

*NeuroWays World Design Standard v1.1.0 — zur Freigabe vorgelegt*

┌─────────────────────────────────────────────────
│ ./NW-DEPLOY-001_DEPLOYMENT_STANDARD.md
└─────────────────────────────────────────────────
# NW-DEPLOY-001 — NeuroWays Deployment Standard

**Dokumentcode:** NW-DEPLOY-001  
**Version:** 1.0.0  
**Status:** published  
**Veröffentlicht:** 2026-07-23  
**Verantwortlich:** NeuroWays Core

---

## Änderungsverlauf

| Version | Datum | Änderung | Autor |
|---------|-------|----------|-------|
| 1.0.0 | 2026-07-23 | Erstfassung — erster produktiver Deployment-Lauf erfolgreich | NeuroWays Core |

---

## Kapitel 1 — Grundprinzip

NeuroWays unterscheidet grundsätzlich zwei Datenkategorien:

### Fachliche Stammdaten (werden migriert)
Konfigurationen, die die fachliche Funktion der Anwendung definieren:
- Methoden, Fragen, Antwortoptionen, Ergebnisregeln
- Designstandards (World Versions, Tokens, Regeln)
- Asset-Definitionen
- Package-Definitionen und Modulversionen

### Betriebsdaten (bleiben in ihrer Umgebung)
Nutzerbezogene Daten, die niemals migriert werden:
- Benutzer, Identitäten, Passwörter, Sessions
- Check-ins, Antworten, Verlaufsdaten
- Audit-Logs, Build-Logs, Testkonten

**Die Live-Umgebung beginnt bezüglich der Benutzer immer leer.**

---

## Kapitel 2 — Deployment-Pipeline

```
Development (DEV)
  │  Entwicklung, Tests, Proof of Concepts
  │
  ▼
Validierung
  │  Pre-flight: Datenmodell, Fremdschlüssel, Pflichtfelder
  │
  ▼
Migration (DEV → LIVE)
  │  Idempotenter Upsert aller Stammdaten
  │  Niemals: Benutzer, Sessions, persönliche Daten
  │
  ▼
Post-Migration-Validierung
  │  Datensatzzählung, Referenzprüfung, Strukturprüfung
  │
  ▼
Smoke Test (auf LIVE)
  │  Registrierung, Login, Methode, Fragen, Check-in, Verlauf
  │
  ▼
Freigabe
     Live-Version gilt als produktionsbereit
```

---

## Kapitel 3 — Zu migrierende Collections

| Collection | Typ | Beschreibung |
|-----------|-----|-------------|
| `methods` | Stammdaten | Aktive Methoden |
| `questions` | Stammdaten | Fragen je Methode |
| `answer_options` | Stammdaten | Antwortoptionen je Frage |
| `result_rules` | Stammdaten | Ergebnis-Zonendefinitionen |
| `world_versions` | Stammdaten | NeuroWays World Design Standard Versionen |
| `world_regions` | Stammdaten | Fünf Regionen der NeuroWays World |
| `design_tokens` | Stammdaten | Farb- und Design-Token |
| `design_rules` | Stammdaten | Gestaltungsregeln |
| `animation_rules` | Stammdaten | Animationsregeln |
| `accessibility_rules` | Stammdaten | Accessibility-Regeln |
| `asset_versions` | Stammdaten | Asset-Versionen |
| `asset_files` | Stammdaten | Asset-Dateireferenzen |
| `asset_assignments` | Stammdaten | Asset-Zuordnungen |
| `asset_metadata` | Stammdaten | Asset-Metadaten |
| `asset_prompts` | Stammdaten | Freigegebene Generierungsprompts |
| `pkg_bases` | Stammdaten | Paket-Basisversionen |
| `pkg_base_versions` | Stammdaten | Versionierte Basisversionen |
| `pkg_modules` | Stammdaten | Modul-Katalog |
| `pkg_module_versions` | Stammdaten | Versionierte Module |

---

## Kapitel 4 — Niemals zu migrierende Collections

| Collection | Grund |
|-----------|-------|
| `users` | Personenbezogene Daten — bleiben in der Umgebung |
| `checkins` | Betriebsdaten — nutzergebunden |
| `checkin_answers` | Betriebsdaten — nutzergebunden |
| `checkin_results` | Betriebsdaten — Legacy |
| `identity_test_values` | Testdaten |
| `identity_audit_log` | Sicherheitslog — umgebungsspezifisch |
| `pkg_package_definitions` | Nutzerbezogen |
| `pkg_builds` | Nutzerbezogen |
| `pkg_build_artifacts` | Nutzerbezogen |
| `pkg_build_logs` | Nutzerbezogen |

---

## Kapitel 5 — Migrationsskript

**Speicherort:** `/tmp/nw_migrate.js` (bei jedem Deployment neu aus Repository laden)

**Idempotenz:** Upsert per Record-ID — bestehende Datensätze werden aktualisiert, fehlende neu angelegt. Duplikate entstehen nie.

**Ausführung:**
```bash
export DEV_TOKEN=$(node pb_gen_token_sfs.js)
export LIVE_TOKEN=$(node pb_gen_token_sfs.js --live)
node nw_migrate.js
```

---

## Kapitel 6 — Versionierung eines Deployment-Laufs

Jeder Migrations-Lauf erzeugt ein Protokoll mit:
- Versionsnummer (Migrationslauf-Timestamp)
- Datum und Uhrzeit
- Quellumgebung: DEV
- Zielumgebung: LIVE
- Anzahl migrierter Datensätze pro Collection
- Gesamt-Datensätze
- Fehleranzahl
- Dauer in Sekunden
- SHA-256-Prüfsumme des Migrationsergebnisses

---

## Kapitel 7 — Smoke Test

Nach jeder Migration automatisch zu prüfen:

| Test | Prüfung |
|------|---------|
| ST1 | Registrierung eines neuen Testkontos |
| ST2 | Anmeldung mit diesem Konto |
| ST3 | Energy Navigator Methode ladbar |
| ST4 | Alle 6 Fragen vorhanden |
| ST5 | Alle 30 Antwortoptionen vorhanden |
| ST6 | Check-in speicherbar |
| ST7 | Verlauf lesbar |
| ST8 | Alle 5 Ergebnisregeln vorhanden |

Testdaten werden nach dem Smoke Test automatisch bereinigt.

---

## Kapitel 8 — Freigabekriterien

Eine Live-Version gilt als freigegeben, wenn:

- ✅ Migration ohne Fehler abgeschlossen
- ✅ Post-Migration-Validierung: alle Datensätze vorhanden
- ✅ Keine Benutzerdaten migriert (alle Benutzer-Collections leer)
- ✅ Alle Smoke Tests bestanden
- ✅ Testdaten bereinigt

---

## Erstes produktives Deployment — Abschlussbericht

**Datum:** 2026-07-23  
**Laufzeit:** 0.3 Sekunden  
**Status: NW-DEPLOY-001 — Deployment erfolgreich**

### Migrierte Datensätze

| Collection | Datensätze |
|-----------|-----------|
| methods | 1 |
| questions | 6 |
| answer_options | 30 |
| result_rules | 5 |
| world_versions | 1 |
| world_regions | 5 |
| design_tokens | 16 |
| design_rules | 27 |
| animation_rules | 6 |
| accessibility_rules | 9 |
| asset_versions | 1 |
| asset_files | 1 |
| asset_assignments | 1 |
| pkg_bases | 2 |
| pkg_base_versions | 2 |
| pkg_modules | 2 |
| pkg_module_versions | 2 |
| **Gesamt** | **117** |

### Idempotenz-Test

Zweiter Lauf direkt danach: 0 neu angelegt, 117 aktualisiert. Prüfsumme identisch. ✅

### Smoke Tests

| Test | Ergebnis |
|------|---------|
| ST1 Registrierung | ✅ |
| ST2 Anmeldung | ✅ |
| ST3 Energy Navigator Methode | ✅ |
| ST4 6 Fragen vorhanden | ✅ |
| ST5 30 Antwortoptionen vorhanden | ✅ |
| ST6 Check-in speicherbar | ✅ |
| ST7 Verlauf lesbar | ✅ |
| ST8 5 Ergebnisregeln vorhanden | ✅ |

### Benutzerdaten

| Collection | Status |
|-----------|--------|
| users | ✅ leer |
| checkins | ✅ leer |
| checkin_answers | ✅ leer |
| identity_audit_log | ✅ leer |

### Offene Punkte

| Punkt | Beschreibung |
|-------|-------------|
| Automatisierung | Migrationsskript noch manuell gestartet — CI/CD-Integration folgt |
| pkg_version_files | Dateiinhalte der Package-Versionen noch nicht migriert (zu groß für direkten Transfer — separater Asset-Transfer-Mechanismus erforderlich) |

---

*NW-DEPLOY-001 — NeuroWays Deployment Standard v1.0.0 — Status: published — 2026-07-23*

┌─────────────────────────────────────────────────
│ ./NW-DS-001_DESIGN_PHILOSOPHY.md
└─────────────────────────────────────────────────
# NW-DS-001 — NeuroWays Design Philosophy

**Dokumentcode:** NW-DS-001  
**Version:** 1.0.0  
**Status:** published  
**Veröffentlicht:** 2026-07-23  
**Gültig ab:** 2026-07-23  
**Verantwortlich:** NeuroWays Design Core  
**Hierarchie:** Design Core — Basisstandard für alle gestalterischen Entscheidungen

---

## Änderungsverlauf

| Version | Datum | Änderung | Autor |
|---------|-------|----------|-------|
| 1.0.0 | 2026-07-23 | Erstfassung aus offiziellen Designboards abgeleitet | NeuroWays Design Core |

---

## Kapitel 1 — Designprinzipien

### 1.1 Klarheit vor Dekor

Jedes gestalterische Element trägt Bedeutung. Ornamentik ohne Funktion existiert nicht. Eine Fläche, die nichts sagt, bleibt leer — bewusst.

### 1.2 Wärme durch Präzision

NeuroWays ist nicht kühl. NeuroWays ist präzise und warm zugleich. Die Farbwelt verbindet kühle Tiefe (Deep Navy) mit warmer Energie (Warm Gold). Diese Spannung ist kein Zufall — sie ist Haltung.

### 1.3 Ruhe ermöglicht Wahrnehmung

Die Gestaltung schafft bewusst ruhige Flächen. Für Menschen mit unterschiedlichen Wahrnehmungsmustern ist Reizarmut kein Kompromiss, sondern Qualität.

### 1.4 Bewegung als Metapher

Die Wellenlinie ist das zentrale visuelle Element von NeuroWays. Sie symbolisiert:
- den Fluss von Energie
- die Vielfalt menschlicher Wege
- Bewegung ohne Druck
- Verbindung ohne Gleichmachung

Die Linie bewegt sich, aber sie hetzt nicht.

### 1.5 Individualität im System

Das Design ist konsistent, aber nicht starr. Innerhalb der definierten Farbwelt, Typografie und Komponentensprache entstehen Gestaltungen, die persönlich und einladend wirken — nicht klinisch.

---

## Kapitel 2 — Markenwerte

| Wert | Farbe | Bedeutung |
|------|-------|-----------|
| Vertrauen | Deep Navy #0A1F44 | Stabilität, Klarheit, Verlässlichkeit |
| Balance | Teal #008CA8 | Kommunikation, Offenheit, Ausgewogenheit |
| Kreativität | Violet #7B4BA2 | Diversität, Perspektive, Entwicklung |
| Energie | Warm Gold #E2A83B | Wärme, Vitalität, Wertschätzung |

### Bedeutung der Kombination

Die vier Farben gemeinsam spiegeln die Balance zwischen Struktur und Individualität. Sie fördern Vertrauen, Kreativität und Verbindung — und laden ein, eigene Wege zu gehen.

---

## Kapitel 3 — Wirkung

NeuroWays-Gestaltung erzeugt folgende Wirkungen:

**Beruhigung:** Viel Weißraum, wenige Elemente, keine Konkurrenz um Aufmerksamkeit.

**Orientierung:** Klare Hierarchie, eindeutige Führung, keine versteckten Aktionen.

**Einladung:** Warme Akzente, runde Formen, keine scharfen Kanten ohne Grund.

**Vertrauen:** Konsistenz über alle Kanäle. Was einmal gelernt wurde, gilt überall.

**Zugänglichkeit:** WCAG AA als Mindeststandard. Reizarme Alternativen, wo sinnvoll.

---

## Kapitel 4 — Gestaltungsphilosophie

### 4.1 Weniger ist mehr — aber nicht leer

Reduktion bedeutet nicht Abwesenheit. Jedes Element, das bleibt, ist bewusst gesetzt und trägt Gewicht.

### 4.2 Die Linie verbindet

Die Wellenlinie ist das einzige Element, das sich durch alle NeuroWays-Produkte zieht. Sie ist erkennbar, reproduzierbar und bedeutungstragend. Sie darf nie fehlen, wo NeuroWays als Marke auftritt.

### 4.3 Farbe als Sprache

Farben werden nicht dekorativ eingesetzt. Jede Farbe in der NeuroWays-Welt hat eine Bedeutung. Die Kombination erzählt eine Geschichte.

### 4.4 System über Einzelentscheidung

Kein Gestaltungselement entsteht in Isolation. Buttons, Cards, Navigationen und Illustrationen gehören zu einem System. Das System hat Vorrang vor der kreativen Einzelentscheidung.

---

## Kapitel 5 — Designentscheidungen (Grundsätze)

| Entscheidung | Regel |
|-------------|-------|
| Hintergrundfarbe Standard | Weiß (#FFFFFF) oder Soft White (#F6F4F1) |
| Schriftfarbe Standard | Deep Navy (#0A1F44) oder Charcoal (#1A1A1A) |
| Primärakzent | Deep Navy #0A1F44 |
| Markenlinie | Immer als Farbverlauf, nie monochrom |
| Weißraum | Großzügig — mindestens 40 % freie Fläche auf jeder Ansicht |
| Rundungen | Vorhanden, aber nicht übertrieben — max. 12 px Radius bei Karten |
| Schatten | Zart, niemals dramatisch — max. 8 % Deckkraft |
| Animation | Ruhig und langsam — niemals hektisch |

---

*NW-DS-001 — NeuroWays Design Philosophy v1.0.0 — Status: published — 2026-07-23*

┌─────────────────────────────────────────────────
│ ./NW-DS-002_LOGO_SYSTEM.md
└─────────────────────────────────────────────────
# NW-DS-002 — NeuroWays Logo System

**Dokumentcode:** NW-DS-002  
**Version:** 1.0.0  
**Status:** published  
**Veröffentlicht:** 2026-07-23  
**Gültig ab:** 2026-07-23  
**Verantwortlich:** NeuroWays Design Core

---

## Kapitel 1 — Die zwei offiziellen Logo-Dateien

Es existieren genau zwei offizielle NeuroWays-Logos. Kein drittes Logo darf entstehen.

### Logo 1 — NeuroWays Master-Logo

**Verwendungszweck:** Corporate Identity, alle inhaltlichen Medien

Bestandteile:
- Wortmarke „NEUROWAYS" in einer geometrisch-humanistischen Schrift
- Charakteristische Wellenlinie mit Farbverlauf von Deep Navy über Teal, Violet bis Warm Gold
- Goldener Punkt am Wellenende
- Goldener Strich nach dem Punkt

**Verwendung für:**
Website · Landingpages · Präsentationen · Dokumente · PDF · Marketing · Social Media · Splash Screen · Videos · Druck · Branding

**Status:** FINAL — unveränderlich

### Logo 2 — NeuroWays App-Symbol (NW-Monogramm)

**Verwendungszweck:** App-Icons, Favicon, digitale Symbole

Bestandteile:
- Handgeschriebenes NW-Monogramm in Deep Navy
- Äußerer Kreis in Deep Navy
- Dieselbe Wellenlinie mit Farbverlauf wie Master-Logo
- Goldener Punkt und goldener Strich
- Unterer Halbkreis als Basisabschluss
- Hintergrund: weiß, quadratisch

**Verwendung für:**
App-Icons · Favicon · Apple Touch Icon · Android Launcher · Desktop App · Progressive Web Apps · Windows Tiles

**Status:** FINAL — unveränderlich

---

## Kapitel 2 — Verbotene Veränderungen

### Für beide Logos gilt:

| Verboten | Begründung |
|---------|-----------|
| Neue Farben | Die Farbwelt ist Teil der Markendefinition |
| Andere Proportionen | Schutzraum und Gewichtung sind kalkuliert |
| Andere Schrift | Die Wortmarke ist als Bild zu behandeln |
| Wellenlinie verändern | Sie ist das Kernelement der Marke |
| Punkt oder Strich entfernen | Bestandteil der Markensymbolik |
| Schatten hinzufügen | Nicht Teil der Markensprache |
| Kreis verändern (Logo 2) | Definierende Form des App-Symbols |
| Neue Elemente ergänzen | Das System ist geschlossen |
| Vereinfachungen | Auch für kleine Größen ist das Original die Grundlage |
| Neuinterpretationen | Es gibt keine offiziellen Varianten außer den hier definierten |

---

## Kapitel 3 — Erlaubte Logo-Varianten

Alle Varianten basieren ausschließlich auf dem Master-Logo (Logo 1).

### Auf hellen Hintergründen — Farbig

| Hintergrund | Hex | Status |
|------------|-----|--------|
| Weiß | #FFFFFF | ✅ erlaubt |
| Warm White | #F8F7F3 | ✅ erlaubt |
| Light Gray | #F0F1F3 | ✅ erlaubt |
| Pale Blue | #F1F6FA | ✅ erlaubt |
| Sand | #F6EFE6 | ✅ erlaubt |

### Auf dunklen Hintergründen — Farbig (Wortmarke weiß)

| Hintergrund | Hex | Status |
|------------|-----|--------|
| Deep Navy | #0A1F44 | ✅ erlaubt |
| Teal Dark | #005F6E | ✅ erlaubt |
| Violet Dark | #4A2E63 | ✅ erlaubt |
| Charcoal Blue | #0F1420 | ✅ erlaubt |
| Dark Gray | #1E1E1E | ✅ erlaubt |

### Monochrome Varianten

| Variante | Einsatz |
|---------|---------|
| Schwarz auf Weiß | Druck s/w, Fax, Kopie |
| Grau auf Weiß | Subtile Anwendungen |
| Weiß auf Schwarz | Dunkle Druck-Kontexte |

---

## Kapitel 4 — Schutzraum

Der Schutzraum entspricht der Höhe des Buchstaben „N" in der Wortmarke. Kein anderes Element darf diesen Bereich berühren.

Bei digitalen Anwendungen: mindestens 16 px Abstand zu allen Seiten.

---

## Kapitel 5 — Mindestgrößen

| Medium | Mindestbreite |
|--------|--------------|
| Digitale Anwendungen | 120 px |
| Druck | 30 mm |
| App-Symbol | 48 px (nur Logo 2) |

---

## Kapitel 6 — App-Icon-Exportregeln (Logo 2)

| Größe | Verwendung |
|-------|-----------|
| 16×16 | Browser-Favicon |
| 32×32 | Browser-Favicon hochauflösend |
| 48×48 | Android-Launcher klein |
| 72×72 | Android-Launcher |
| 96×96 | Android-Launcher HD |
| 128×128 | Chrome Web App |
| 144×144 | Windows Tile, Android |
| 152×152 | iPad (ältere Generation) |
| 167×167 | iPad Pro |
| 180×180 | iPhone (Apple Touch Icon) |
| 192×192 | Android Standard |
| 256×256 | Hochauflösende Displays |
| 384×384 | Android XXL |
| 512×512 | Splash Screen, Store |
| Maskable 192×192 | Android Adaptive Icon |
| Maskable 512×512 | Android Adaptive Icon HD |

**Regel:** Die Abrundung der Icons übernimmt ausschließlich das Betriebssystem. Die Quelldatei bleibt quadratisch mit weißem Hintergrund.

---

*NW-DS-002 — NeuroWays Logo System v1.0.0 — Status: published — 2026-07-23*

┌─────────────────────────────────────────────────
│ ./NW-DS-003_COLOR_SYSTEM.md
└─────────────────────────────────────────────────
# NW-DS-003 — NeuroWays Color System

**Dokumentcode:** NW-DS-003  
**Version:** 1.0.0  
**Status:** published  
**Veröffentlicht:** 2026-07-23  
**Gültig ab:** 2026-07-23  
**Verantwortlich:** NeuroWays Design Core  
**Quelle:** Offizielles Designboard „NeuroWays – Farbwelt"

---

## Kapitel 1 — Primärfarben

Die vier Primärfarben bilden die vollständige NeuroWays-Markenfarbwelt.

| Name | Hex | Bedeutung | Verwendungsanteil |
|------|-----|-----------|------------------|
| **Deep Navy** | `#0A1F44` | Vertrauen, Stabilität, Klarheit | 50 % |
| **Teal** | `#008CA8` | Balance, Kommunikation, Offenheit | 20 % |
| **Violet** | `#7B4BA2` | Kreativität, Diversität, Perspektive | 15 % |
| **Warm Gold** | `#E2A83B` | Wärme, Energie, Wertschätzung | 10 % |

Die Farbverteilung (50/20/15/10/5) ist eine Empfehlung für Layouts und Oberflächen. Deep Navy dominiert, Warm Gold setzt Akzente.

---

## Kapitel 2 — Neutrale Farben

| Name | Hex | Bedeutung |
|------|-----|-----------|
| **Soft White** | `#F6F4F1` | Ruhe, Klarheit, Offenheit |
| **Light Gray** | `#E5E5E5` | Struktur, Ausgleich, Zurückhaltung |
| **Charcoal** | `#1A1A1A` | Kontrast, Lesbarkeit, Verankerung |

Neutralfarben haben keinen Markenwert, bilden aber die Bühne, auf der die Primärfarben wirken.

---

## Kapitel 3 — Hintergrundfarben (Systemfarben)

| Name | Hex | Verwendung |
|------|-----|-----------|
| Weiß | `#FFFFFF` | Standard-Seitenhintergrund |
| Soft White | `#F6F4F1` | Sanfter Alternativhintergrund |
| Warm White | `#F8F7F3` | Karten, Boxen auf weißem Hintergrund |
| Light Gray | `#F0F1F3` | Trenner, dezente Abschnitte |
| Pale Blue | `#F1F6FA` | Informative Bereiche, ruhige Highlights |
| Sand | `#F6EFE6` | Warme Hintergründe, persönliche Zonen |

---

## Kapitel 4 — Der Farbverlauf (Markenlinie)

Der Farbverlauf ist das verbindende Element der gesamten NeuroWays-Markenwelt.

```
#0A1F44 → #008CA8 → #7B4BA2 → #E2A83B
```

**Regeln für den Farbverlauf:**

- Immer alle vier Farben in dieser Reihenfolge
- Immer von links nach rechts (LTR)
- Niemals umgekehrt
- Niemals einzelne Farben herausnehmen
- Niemals durch andere Farben ersetzen
- Nur auf der charakteristischen Wellenlinie

---

## Kapitel 5 — Einsatzregeln

### Primärfarbe als Hintergrund

| Hintergrund | Textfarbe | Status |
|------------|---------|--------|
| Deep Navy #0A1F44 | Weiß #FFFFFF | ✅ erlaubt |
| Teal #008CA8 | Weiß #FFFFFF | ✅ erlaubt |
| Violet #7B4BA2 | Weiß #FFFFFF | ✅ erlaubt |
| Warm Gold #E2A83B | Deep Navy #0A1F44 | ✅ erlaubt |
| Warm Gold #E2A83B | Weiß | ⚠️ nur bei großen Texten prüfen |

### Verboten

- Primärfarben als Fließtexthintergrund auf großen Flächen (ausgenommen Navy)
- Farbige Texte auf farbigen Hintergründen ohne Kontrastprüfung
- Neue Farben außerhalb dieser Palette einführen
- Primärfarben aufhellen oder abdunkeln (Tints/Shades) ohne Design-Core-Freigabe

---

## Kapitel 6 — Kontrast und Accessibility

| Paarung | Kontrastverhältnis (näherungsweise) | WCAG-Status |
|---------|-------------------------------------|-------------|
| Deep Navy auf Weiß | ≥ 13:1 | ✅ AAA |
| Charcoal auf Weiß | ≥ 12:1 | ✅ AAA |
| Weiß auf Deep Navy | ≥ 13:1 | ✅ AAA |
| Weiß auf Teal | ≥ 4.8:1 | ✅ AA |
| Weiß auf Violet | ≥ 5.2:1 | ✅ AA |
| Deep Navy auf Warm Gold | ≥ 5.5:1 | ✅ AA |
| Weiß auf Warm Gold | ≥ 2.8:1 | ⚠️ nur dekorativ, nicht für Fließtext |

**Mindeststandard:** WCAG 2.1 AA für alle Textinhalte.

---

## Offene Punkte

| Punkt | Beschreibung |
|-------|-------------|
| Tints & Shades | Aufgehellte und abgedunkelte Varianten der Primärfarben sind noch nicht definiert |
| Dunkel-Modus | Vollständige Farbpalette für Dark Mode fehlt noch |
| Statusfarben | Rot (Fehler), Grün (Erfolg), Gelb (Warnung) — noch nicht offiziell definiert |
| Gradient-Winkel | Winkel des Farbverlaufs für andere Kontexte als die Wellenlinie noch offen |

---

*NW-DS-003 — NeuroWays Color System v1.0.0 — Status: published — 2026-07-23*

┌─────────────────────────────────────────────────
│ ./NW-DS-004_TYPOGRAPHY.md
└─────────────────────────────────────────────────
# NW-DS-004 — NeuroWays Typography

**Dokumentcode:** NW-DS-004  
**Version:** 1.0.0  
**Status:** draft  
**Veröffentlicht:** –  
**Gültig ab:** nach Freigabe  
**Verantwortlich:** NeuroWays Design Core

---

## Hinweis

Die Typografie ist aus den Designboards der Logogestaltung ableitbar, aber noch nicht als eigenständiges Designboard dokumentiert. Dieses Kapitel beschreibt, was aus den vorliegenden Materialien mit Sicherheit abgeleitet werden kann.

---

## Kapitel 1 — Erkennbare Schrifteigenschaften

Aus dem Master-Logo und den Designboards:

**Wortmarke „NEUROWAYS":**
- Geometrisch-humanistische Serifenlose
- Versalien, gleichmäßig gesperrt
- Runde Bögen (erkennbar an N, R, O, W, A, Y, S)
- Dünn-mittlere Stärke (Regular bis Medium)
- Wirkt technisch-präzise, aber nicht kalt

**Fließtext in Designboards:**
- Klare, gut lesbare Serifenlose
- Linke Ausrichtung
- Ausreichende Zeilenhöhe für Lesbarkeit

---

## Kapitel 2 — Empfohlene Schriftfamilie (abgeleitet)

Die Wortmarke trägt Eigenschaften, die an **Circular**, **Poppins**, **Nunito** oder eine ähnliche geometrisch-humanistische Schrift erinnern. Ohne Quelldatei kann die exakte Schrift nicht bestätigt werden.

**Für alle digitalen Produkte bis zur offiziellen Festlegung:**

| Ebene | Schrift | Gewicht |
|-------|---------|---------|
| Primär (Headings) | Poppins oder DM Sans | SemiBold (600) |
| Sekundär (Body) | Poppins oder DM Sans | Regular (400) |
| Akzent (Labels, Caps) | Poppins oder DM Sans | Medium (500), Versalien |

*Hinweis: DM Sans ist aktuell in der App implementiert und harmoniert mit dem Markenbild.*

---

## Kapitel 3 — Typografische Hierarchie (abgeleitet)

| Ebene | Größe | Gewicht | Farbe |
|-------|-------|---------|-------|
| Display / Hero | 48–64 px | Bold | Deep Navy |
| H1 | 32–40 px | SemiBold | Deep Navy |
| H2 | 24–28 px | SemiBold | Deep Navy |
| H3 | 18–22 px | Medium | Deep Navy |
| Body Large | 17–18 px | Regular | Charcoal |
| Body | 15–16 px | Regular | Charcoal |
| Caption / Label | 12–13 px | Medium | Teal oder Gray |
| Buttons | 14–15 px | SemiBold | je nach Variante |

---

## Offene Punkte

| Punkt | Beschreibung | Priorität |
|-------|-------------|-----------|
| Exakte Schriftfamilie | Quelldatei oder Designbrief mit Schriftname erforderlich | Hoch |
| Schrift-Lizenzen | Welche Schriften sind für alle Kanäle lizenziert? | Hoch |
| Drucktypografie | Schriftregeln für Druck und PDF | Mittel |
| Spezialgrößen | Typografie für sehr kleine Displays (Watch, Tiny) | Niedrig |

---

*NW-DS-004 — NeuroWays Typography v1.0.0 — Status: draft — Freigabe nach Schrift-Klärung*

┌─────────────────────────────────────────────────
│ ./NW-DS-005_LAYOUT_SYSTEM.md
└─────────────────────────────────────────────────
# NW-DS-005 — NeuroWays Layout System

**Dokumentcode:** NW-DS-005  
**Version:** 1.0.0  
**Status:** draft  
**Veröffentlicht:** –  
**Gültig ab:** nach Freigabe  
**Verantwortlich:** NeuroWays Design Core

---

## Kapitel 1 — Grundprinzipien

- Viel Weißraum. Nie vollgestopfte Layouts.
- Zentrierte Maximalbreite für Inhalte, großzügige Ränder.
- Mobile-First: Layouts werden von klein nach groß gedacht.
- Ein Hauptinhalt pro Bildschirmabschnitt.
- Klare vertikale Hierarchie.

---

## Kapitel 2 — Grid und Container

| Breakpoint | Bezeichnung | Container-Breite | Spalten |
|-----------|-------------|-----------------|---------|
| < 375 px | XS | 100 % | 1 |
| 375–767 px | Mobile | 100 % (24 px Rand) | 2–4 |
| 768–1023 px | Tablet | 720 px | 8 |
| 1024–1279 px | Desktop S | 960 px | 12 |
| ≥ 1280 px | Desktop | 1200 px | 12 |

---

## Kapitel 3 — Abstände (Spacing Scale)

| Token | Wert | Verwendung |
|-------|------|-----------|
| space-1 | 4 px | Minimaler Innenabstand |
| space-2 | 8 px | Enge Elemente |
| space-3 | 12 px | Standard-Padding klein |
| space-4 | 16 px | Standard-Padding |
| space-5 | 24 px | Sektionsabstand klein |
| space-6 | 32 px | Sektionsabstand |
| space-7 | 48 px | Großer Sektionsabstand |
| space-8 | 64 px | Hero-Abstände |
| space-9 | 96 px | Seitenränder Desktop |

---

## Kapitel 4 — Weißraum-Regel

Mindestens 40 % jeder sichtbaren Fläche sollen frei von Inhalt sein. Luft ist kein Platzverschwendung — sie ist Designelement.

---

## Offene Punkte

| Punkt | Beschreibung |
|-------|-------------|
| Designboard Layout | Kein dediziertes Layout-Designboard in den vorliegenden Materialien |
| Grid-Definitionen | Exakte Gutter-Breiten und Spaltenabstände noch zu definieren |
| Dashboard-Layout | Spezielle Layoutregeln für das NeuroWays Dashboard |
| Print-Layout | Seitenlayout für Dokumente und Präsentationen |

---

*NW-DS-005 — NeuroWays Layout System v1.0.0 — Status: draft*

┌─────────────────────────────────────────────────
│ ./NW-DS-006_COMPONENT_SYSTEM.md
└─────────────────────────────────────────────────
# NW-DS-006 — NeuroWays Component System

**Dokumentcode:** NW-DS-006  
**Version:** 1.0.0  
**Status:** draft  
**Veröffentlicht:** –  
**Gültig ab:** nach Freigabe  
**Verantwortlich:** NeuroWays Design Core

---

## Hinweis

Das Komponenten-System ist aus der bestehenden App-Implementierung und den Designboard-Farbregeln abgeleitet. Es existiert noch kein dediziertes Komponenten-Designboard. Die hier beschriebenen Regeln konsolidieren den aktuellen Stand.

---

## Kapitel 0 — AnswerCard (erste implementierte Komponente)

**Status: implementiert** — `src/components/AnswerCard.jsx`

### Zweck

Wiederverwendbare Antwortkarte für alle NeuroWays-Fragebogen-Methoden. Verwendet in: Energy Navigator Check-in.

### Props

| Prop | Typ | Beschreibung |
|------|-----|-------------|
| `icon` | string | Symbol-Bezeichner: `zap`, `leaf`, `waves`, `battery-low`, `battery-empty` |
| `accentColor` | string | CSS-Farbe für Rahmen, Icon-Strich und Ausgewählt-Zustand |
| `backgroundColor` | string | Pastell-Hintergrund des Icon-Kreises (inaktiv) |
| `label` | string | Anzeigetext der Antwort |
| `selected` | bool | Ob diese Option aktuell gewählt ist |
| `onClick` | fn | Auswahl-Handler |
| `ariaLabel` | string | Optionaler aria-label-Override |

### Energiestufen-Voreinstellungen (ENERGY_ICON_PRESETS)

| Wert (1–5) | Icon | Farbe | Bedeutung |
|-----------|------|-------|-----------|
| 1 | Blitz (zap) | Türkis #008CA8 | Sehr viel Energie |
| 2 | Blatt (leaf) | Grün #4caf7d | Ausreichend Energie |
| 3 | Welle (waves) | Gold #E2A83B | Wenig Energie |
| 4 | Batterie halb (battery-low) | Orange #e07a30 | Kaum Energie |
| 5 | Batterie leer (battery) | Rot #c0392b | Keine Energie |

### Designregeln

- Runder Icon-Hintergrund (40×40 px, 50 % Radius)
- Outline-Icons, Strichstärke 1.8, Größe 18 px
- Übergang: 170 ms ease für Rahmen, Hintergrund, Farbe
- Ausgewählt: Rahmen in Akzentfarbe + Halo (box-shadow 3 px, 12 % Deckkraft) + Häkchen-Indikator
- Kein Springen, keine verspielten Effekte
- Icon + Text + Häkchen: dreifache Unterscheidung ohne Farbe (Accessibility)

### Erweiterungsregel

Neue Methoden können eigene `preset`-Maps bereitstellen und dieselbe `AnswerCard`-Komponente verwenden. Kein neuer Komponenten-Typ erforderlich.

---

## Kapitel 1 — Buttons

### Primär
- Hintergrund: Deep Navy (#0A1F44) oder Teal (#008CA8)
- Text: Weiß (#FFFFFF)
- Radius: 10–12 px
- Padding: 14–16 px vertikal, 24–32 px horizontal
- Mindest-Tap-Target: 44 px

### Sekundär
- Hintergrund: transparent
- Rahmen: 1.5 px Deep Navy
- Text: Deep Navy
- Hover: leichter Navy-Hintergrund (8 % Deckkraft)

### Destruktiv
- Hintergrund: transparent oder Rot-Ton
- Text: Rot (#DC2626 oder ähnlich)
- Nur für unwiderrufliche Aktionen

### Regel
Buttons verwenden niemals den Farbverlauf als Hintergrund. Der Verlauf ist ausschließlich der Markenlinie vorbehalten.

---

## Kapitel 2 — Cards

- Hintergrund: Weiß oder Warm White (#F8F7F3)
- Rahmen: 1 px Light Gray (#E5E5E5)
- Radius: 12–16 px
- Schatten: sehr dezent (max. 0 2px 8px rgba(0,0,0,0.06))
- Padding: 20–24 px innen

### Zonencard (Energy Navigator)
- Hintergrund: Zonenfarbe mit 10–15 % Deckkraft
- Rahmen: Zonenfarbe mit 30 % Deckkraft
- Radius: 24 px (großzügiger, weil Ergebnis-Element)

---

## Kapitel 3 — Formulare

- Rahmen: 1.5 px Light Gray, bei Fokus Teal (#008CA8)
- Radius: 10 px
- Beschriftung: 13 px, SemiBold, Versalien, Gray
- Fehlerzustand: Rahmen Rot, Fehlermeldung darunter

---

## Kapitel 4 — Navigation

### Desktop (Top Bar)
- Hintergrund: Weiß
- Rahmen: 1 px Light Gray unten
- Logo links, Links rechts
- Aktiver Link: Teal-Ton Hintergrund, Teal Text

### Mobil (Bottom Bar)
- Position: fixiert, unten
- Hintergrund: Weiß
- Rahmen: 1 px Light Gray oben
- 4–5 Elemente gleichmäßig verteilt
- Icon + Label, Aktiv: Teal-Farbe

---

## Kapitel 5 — Statusanzeigen / Badges

| Status | Farbe | Hintergrund |
|--------|-------|-------------|
| Aktiv / Bestanden | Grün | Grün 10 % |
| Warnung | Warm Gold | Gold 10 % |
| Fehler | Rot | Rot 10 % |
| Info | Teal | Teal 10 % |
| Neutral | Gray | Gray 10 % |

---

## Offene Punkte

| Punkt | Beschreibung |
|-------|-------------|
| Dediziertes Designboard | Komponentenregeln visuell dokumentieren |
| Dialoge & Modals | Noch nicht spezifiziert |
| Listen-Elemente | Variantenregeln fehlen |
| Tabellen | Tabellengestaltung für Dashboard |
| Dark Mode | Komponentenvarianten für dunkle Oberflächen |

---

*NW-DS-006 — NeuroWays Component System v1.0.0 — Status: draft*

┌─────────────────────────────────────────────────
│ ./NW-DS-007_ILLUSTRATION_SYSTEM.md
└─────────────────────────────────────────────────
# NW-DS-007 — NeuroWays Illustration System

**Dokumentcode:** NW-DS-007  
**Version:** 1.0.0  
**Status:** draft  
**Veröffentlicht:** –  
**Gültig ab:** nach Freigabe  
**Verantwortlich:** NeuroWays Design Core

---

## Kapitel 1 — Das zentrale Illustrationselement: Die Linie

Die Wellenlinie ist das Herzstück der NeuroWays-Bildsprache. Sie erscheint im Logo, in Illustrationen, als Trenner, als Animation.

### Eigenschaften der Linie

- Organisch und weich — keine geometrisch perfekten Wellen
- Dünne bis mittlere Stärke (2–4 px bei 300 px Referenzgröße)
- Immer mit dem offiziellen Farbverlauf: Deep Navy → Teal → Violet → Warm Gold
- Endpunkt: goldener Punkt, gefolgt von einem goldenen Strich
- Beginnt links in Deep Navy, endet rechts in Warm Gold

### Verbote

- Einfarbige Wellenlinie (außer Monochrom-Variante für s/w-Druck)
- Gerade Linie als Ersatz
- Geometrisch-mechanische Kurven
- Fehlende Stopp-Elemente (Punkt und Strich am Ende)

---

## Kapitel 2 — NeuroWays World Illustrationen

Fünf Zonenillustrationen für den Energy Navigator (aus NW-DSN-001):

| Zone | Ort | Farbe | Orientierungspunkt |
|------|-----|-------|-------------------|
| Festland | Weites Plateau | Teal #2a9d8f | Großer Baum |
| Wald | Lichter Wald | Grün #52b788 | Lichtung |
| Küste | Steilküste | Blau-Grau #4a9abb | Leuchtturm |
| Meer | Offenes Wasser | Blau-Violett #6b7faa | Boje |
| Insel | Kleine Insel | Violett-Grau #8b6f9e | Einzelner Baum |

**Stil:** Flache Vektorflächen, organische Formen, weiche Übergänge, kein Outline, diffuses Licht, leichte Papier-Textur (max. 8 % Deckkraft).

**Verbote:** Personen, Tiere, Text, harte Schatten, Outlines.

---

## Kapitel 3 — Bildsprache

Für Fotos und begleitende Bilder:

- Ruhige, natürliche Motive
- Keine überladenen Szenen
- Viel Luft im Bild
- Farblich im Einklang mit NeuroWays-Palette
- Menschen nur aus sicherer Distanz oder in Abstraktion
- Keine Stockfoto-Ästhetik

---

## Kapitel 3b — Energie-Icons (implementiert)

**Status: implementiert** — in `src/components/AnswerCard.jsx` via `ENERGY_ICON_PRESETS`

### Zuordnung (numeric_value → Icon → Farbe)

| Wert | Symbol | Icon-Code | Akzentfarbe | Hintergrund |
|------|--------|-----------|-------------|-------------|
| 1 | Blitz | `zap` | `#008CA8` Türkis | `#e0f7fa` |
| 2 | Blatt | `leaf` | `#4caf7d` Grün | `#e8f5e9` |
| 3 | Welle | `waves` | `#E2A83B` Gold | `#fff8e1` |
| 4 | Halbe Batterie | `battery-low` | `#e07a30` Orange | `#fff3e0` |
| 5 | Leere Batterie | `battery` | `#c0392b` Rot | `#fdecea` |

### Verhalten

- Icons ergänzen den Text — sie ersetzen ihn nie
- Keine Information ist ausschließlich durch Farbe kodiert (Icon + Farbe + Text + Häkchen)
- Runde Hintergrundfläche, Pastell-Tönung
- Outline-Stil, keine gefüllten Icons, keine Farbverläufe
- Einheitliche Größe: 18 px Icon im 40 px Kreis

---

## Kapitel 4 — Icons

- Stil: Linien-Icons (Stroke), kein Fill
- Strichstärke: 1.5–2 px bei 24 px
- Ecken: leicht abgerundet (round cap, round join)
- Farbe: Deep Navy oder Teal — niemals der Farbverlauf
- Größen: 16, 20, 24, 32 px (Standard: 20 px)

---

## Offene Punkte

| Punkt | Beschreibung |
|-------|-------------|
| Flowisaurus-Figur | Erscheinungsbild des Maskottchens noch nicht definiert |
| Icon-Bibliothek | Vollständiger Icon-Satz noch nicht spezifiziert |
| Zonenillustrationen | Noch nicht generiert (Basis aus NW-DSN-001 vorhanden) |
| Menschendarstellung | Genaue Regeln für humanoide Darstellungen fehlen |

---

*NW-DS-007 — NeuroWays Illustration System v1.0.0 — Status: draft*

┌─────────────────────────────────────────────────
│ ./NW-DS-008_MOTION_SYSTEM.md
└─────────────────────────────────────────────────
# NW-DS-008 — NeuroWays Motion System

**Dokumentcode:** NW-DS-008  
**Version:** 1.0.0  
**Status:** draft  
**Veröffentlicht:** –  
**Gültig ab:** nach Freigabe  
**Verantwortlich:** NeuroWays Design Core  
**Verweis:** NW-DSN-001 Kapitel 9 (Animationsrichtlinien)

---

## Kapitel 1 — Bewegungsprinzipien

- **Ruhig:** Keine hektischen, abrupten Bewegungen.
- **Langsam:** Animationen dauern etwas länger als erwartet — das ist gewollt.
- **Bedeutungstragend:** Jede Bewegung kommuniziert etwas. Dekorative Animation ohne Funktion existiert nicht.
- **Zielgruppe respektierend:** `prefers-reduced-motion` wird immer respektiert.

---

## Kapitel 2 — Animationsregeln (aus NW-DSN-001)

| Element | Bewegung | Max. Dauer | Easing | Loop |
|---------|---------|-----------|--------|------|
| Seitenwechsel | Sanfter Überblend | 300 ms | ease-in-out | Nein |
| Fortschrittsbalken | Gleichmäßiges Füllen | 600 ms | linear | Nein |
| Zonenfarbe | Sanfter Farbübergang | 800 ms | ease-in-out | Nein |
| Wasserwellen | Sanfte Bewegung | 8000 ms | ease-in-out | Ja |
| Pflanzenbewegung | Leichtes Schwingen | 6000 ms | ease-in-out | Ja |
| Hover-Effekte | Dezente Aufhellung | 150 ms | ease | Nein |

---

## Kapitel 3 — Was nie animiert wird

- Blinkende Elemente (strikt verboten — Accessibility und Reizschutz)
- Parallax-Effekte
- Automatisch startende Videos ohne Benutzerinteraktion
- Carousels, die sich ohne Auslöser bewegen

---

## Kapitel 4 — Accessibility

Alle Animationen müssen deaktivierbar sein:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Offene Punkte

| Punkt | Beschreibung |
|-------|-------------|
| Ladeanimationen | Stil der Loading-States noch nicht spezifiziert |
| Mikrointeraktionen | Button-Press, Checkbox-Toggle, Form-Feedback |
| Splash Screen | Animierter Einstieg für App-Start |
| Wellen-Animation | Technische Umsetzung der Markenwelle als Loop |

---

*NW-DS-008 — NeuroWays Motion System v1.0.0 — Status: draft*

┌─────────────────────────────────────────────────
│ ./NW-DS-009_BRAND_APPLICATIONS.md
└─────────────────────────────────────────────────
# NW-DS-009 — NeuroWays Brand Applications

**Dokumentcode:** NW-DS-009  
**Version:** 1.0.0  
**Status:** draft  
**Veröffentlicht:** –  
**Gültig ab:** nach Freigabe  
**Verantwortlich:** NeuroWays Design Core

---

## Kapitel 1 — App (PWA / Mobile)

| Element | Regel |
|---------|-------|
| App-Icon | Ausschließlich NW App-Symbol (Logo 2), quadratisch, weiß |
| Statusleiste | Deep Navy (#0A1F44) als theme-color |
| Splash Screen | Weiß oder Soft White, zentriertes App-Symbol |
| Navigation | Bottom Bar auf Mobile, Top Bar auf Tablet/Desktop |
| Hintergrund | Weiß (#FFFFFF) oder Soft White (#F6F4F1) |
| Primärakzent | Deep Navy oder Teal |

## Kapitel 2 — Website / Landingpage

| Element | Regel |
|---------|-------|
| Logo | Master-Logo (Logo 1), immer in erlaubter Variante |
| Hero | Großes Logo oder Headline, Wellenlinie als grafisches Element |
| Hintergrund | Weiß, Soft White oder Deep Navy |
| Favicon | NW App-Symbol, favicon-32x32.png |

## Kapitel 3 — Dokumente / PDF

| Element | Regel |
|---------|-------|
| Logo | Master-Logo, oben links oder zentriert |
| Deckblatt | Deep Navy Hintergrund, weißes Logo |
| Innenseiten | Weiß, Akzente in Teal oder Deep Navy |
| Fußzeile | Grau oder Deep Navy, klein |

## Kapitel 4 — Präsentationen

| Element | Regel |
|---------|-------|
| Titelfolie | Deep Navy Hintergrund, weißes Logo, weiße Überschrift |
| Inhaltsfolien | Weiß oder Soft White |
| Akzentfolien | Einzelne Primärfarbe als Vollhintergrund |
| Markenlinie | Als Trenner oder dekoratives Element |

## Kapitel 5 — Social Media

| Kanal | Format | Logo-Variante |
|-------|--------|--------------|
| Instagram Post | 1:1 oder 4:5 | Master-Logo auf passendem Hintergrund |
| Instagram Story | 9:16 | App-Symbol oder Master-Logo |
| LinkedIn Post | 1.91:1 | Master-Logo |
| Profilbild | Kreis | App-Symbol |

## Kapitel 6 — Marketing / Druck

- Logo immer auf weißem oder definierten Hintergründen
- Mindestgröße 30 mm Breite
- Schutzraum einhalten
- Monochromvariante für s/w-Druck

## Offene Punkte

| Punkt | Beschreibung |
|-------|-------------|
| Merchandise | T-Shirt, Tassen, Notizbücher — Regeln noch nicht definiert |
| Video-Intro | Animierte Markensequenz für Videos |
| Zertifikate | Layout für NeuroWays-Teilnahmebestätigungen |
| Newsletter | HTML-E-Mail-Template |

---

*NW-DS-009 — NeuroWays Brand Applications v1.0.0 — Status: draft*

┌─────────────────────────────────────────────────
│ ./NW-GOVERNANCE-FOUNDATION-v1.0.md
└─────────────────────────────────────────────────
# NeuroWays Governance Foundation v1.0

**Dokumentcode:** NW-GOVERNANCE-FOUNDATION-v1.0  
**Status:** published  
**Veröffentlicht:** 2026-07-23  
**Verantwortlich:** NeuroWays Core

---

## Zweck

Die NeuroWays Governance Foundation v1.0 ist der erste formale Architektur-Meilenstein der NeuroWays-Plattform.

Sie schafft das verbindliche Regelwerk, auf dessen Basis alle zukünftigen NeuroWays-Module, Methoden, Designsysteme, APIs und Datenmodelle entwickelt werden.

Ohne eine gemeinsame Governance-Grundlage entstehen Systeme, die schwer zu warten, zu erweitern und zu erklären sind. Die Foundation verhindert das — nicht durch Bürokratie, sondern durch klare, einfache Regeln, die konsequent angewendet werden.

---

## Enthaltene Standards

| Code | Titel | Version | Status | Veröffentlicht |
|------|-------|---------|--------|----------------|
| NW-STD-000 | Standards Framework Standard | 1.0.1 | published | 2026-07-23 |
| NW-STD-001 | Naming Standard | 1.0.1 | published | 2026-07-23 |
| NW-STD-002 | Standards Registry Standard | 1.0.1 | published | 2026-07-23 |
| NW-STD-003 | Database Standard | 1.0.1 | published | 2026-07-23 |

Alle vier Standards sind aktiv, verbindlich und unveränderlich in ihrer fachlichen Substanz. Korrekturen und Erweiterungen erfolgen ausschließlich als neue Versionen.

---

## Veröffentlichungsreihenfolge

Die Reihenfolge folgt dem Dependency-Prinzip: Standards, die von anderen abhängig sind, werden zuletzt veröffentlicht.

```
Schritt 1: NW-STD-002 (Registry Standard)
  → Als erstes veröffentlicht, damit Bootstrap-Phase offiziell endet
  → Statusübergang: review → approved → published

Schritt 2: NW-STD-000 (Framework Standard)
  → Grundlage für alle anderen Standards
  → Statusübergang: draft → approved → published

Schritt 3: NW-STD-001 (Naming Standard)
  → Abhängig von NW-STD-000
  → Statusübergang: review → approved → published

Schritt 4: NW-STD-003 (Database Standard)
  → Abhängig von NW-STD-000 und NW-STD-001
  → Statusübergang: draft → approved → published
```

---

## Architektur-Zusammenfassung

### Was die Foundation regelt

**NW-STD-000** definiert den Rahmen: Was ist ein NeuroWays-Standard? Wie ist er aufgebaut? Wie wird er versioniert? Wie entsteht er, und wie wird er außer Kraft gesetzt? Alle anderen Standards folgen diesem Rahmen.

**NW-STD-001** definiert die Sprache: Wie werden Collections, Felder, Business-Codes, Dateien, API-Endpunkte und Dokumente benannt? Konsistente Namen machen ein System wartbar, erklärbar und automatisch prüfbar.

**NW-STD-002** definiert das Verzeichnis: Welche Standards existieren? Welche Nummern sind vergeben? Welcher Status gilt? Das Registry ist die einzige autoritative Quelle. Kein Standard gilt ohne Eintrag.

**NW-STD-003** definiert die Datenarchitektur: Wie werden fachliche Objekte modelliert? Wie werden Beziehungen aufgebaut? Wie wird Datenintegrität sichergestellt — unabhängig von der eingesetzten Plattform?

### Was die Foundation nicht regelt

Die Foundation legt Prinzipien fest, keine Implementierungen. Folgende Themen sind bewusst ausgeklammert und werden in nachfolgenden Standards geregelt:

- Konkrete Versioning-Regeln (NW-STD-010)
- API-Konventionen (NW-STD-011)
- Sicherheit und Datenschutz (NW-STD-012)
- Lebenszyklusübergänge mit Fristen (NW-STD-013)
- Governance-Instanz und Entscheidungsfindung (NW-GOV-001)

---

## Bekannte offene Punkte

Diese Punkte sind bewusst dokumentiert und aufgeschoben — nicht vergessen.

| Thema | Betroffener Standard | Vorgesehen in |
|-------|---------------------|---------------|
| Ausnahmeregel für NeuroWays-Weltbegriffe (z.B. KUESTE) | NW-STD-001 | v1.1.0 |
| Governance-Instanz formal benennen | NW-STD-002 | NW-GOV-001 |
| Feldbenennung created_at / updated_at für bestehende Collections | NW-STD-003 | Nächste MAJOR-Migration |
| Mehrmandantenfähigkeit | NW-STD-003 | v1.1.0 |
| Datenschutz und DSGVO-Felder | NW-STD-003 | NW-STD-012 |
| Maschinenlesbares Regelwerk für Standards | NW-STD-000 | NW-GOV-001 |

---

## Empfehlung für die nächste Entwicklungsphase

Die Governance Foundation ist das Fundament. Was jetzt folgt, sind die ersten Gebäude darauf.

### Empfohlene Reihenfolge — Phase 2

**Sofort (Grundlagen für alle weiteren Standards):**

1. **NW-STD-010 — Versioning Standard**
   Detaillierte Semver-Regeln, Abwärtskompatibilitätsversprechen, Deprecation-Fristen.
   Wird heute bereits von NW-STD-002 und NW-STD-003 referenziert — fehlende Grundlage.

2. **NW-GOV-001 — Standards Governance**
   Registry-Instanz formal benennen, Genehmigungsworkflow definieren.
   Ohne dieses Dokument bleibt die Governance-Instanz implizit.

**Danach (technische Grundlagen):**

3. **NW-STD-011 — API Standard**
   Vor erster externer Integration zwingend erforderlich.

4. **NW-STD-012 — Security Standard**
   Vor erster Produktivnutzung mit Benutzerdaten erforderlich.

**Parallel zur App-Entwicklung:**

5. **NW-STD-050 — Design System Standard**
   Formalisiert die bestehende NeuroWays World als verbindlichen Design-Standard.

6. **Illustrationen und Icons** für den Energy Navigator
   Das NeuroWays World Asset-Management ist vorbereitet (Asset-Collections angelegt, Validierungs-Engine aktiv). Die ersten fünf Zonenillustrationen können jetzt generiert werden.

### Technische Empfehlung für die App

Der Energy Navigator ist funktionsfähig, validiert und versioniert. Der nächste sinnvolle Schritt auf der App-Seite ist die Integration des Illustrations- und Icon-Systems — die Governance-Grundlage dafür steht.

---

*NeuroWays Governance Foundation v1.0 — veröffentlicht 2026-07-23 — NeuroWays Core*

┌─────────────────────────────────────────────────
│ ./NW-IDENTITY-001_IDENTITY_MEMBERSHIP_SPEC.md
└─────────────────────────────────────────────────
# NW-IDENTITY-001 — NeuroWays Identity & Membership Specification

**Dokumentcode:** NW-IDENTITY-001  
**Version:** 1.0.0  
**Status:** draft  
**Erstellt:** 2026-07-23  
**Gültig ab:** nach Freigabe  
**Verantwortlich:** NeuroWays Core  
**Hierarchie:** Plattform-Spezifikation — referenziert NW-STD-000 normativ, NW-STD-001 normativ, NW-STD-003 normativ  
**Ablöst:** –  
**Abgelöst durch:** –

---

## Änderungsverlauf

| Version | Datum | Änderung | Autor |
|---------|-------|----------|-------|
| 1.0.0 | 2026-07-23 | Erstfassung | NeuroWays Core |

---

## Referenzen

| Dokument | Titel | Art |
|---------|-------|-----|
| NW-STD-000 | Standards Framework Standard | normativ |
| NW-STD-001 | Naming Standard | normativ |
| NW-STD-003 | Database Standard | normativ |
| NW-KAS-001 | Knowledge Asset Standard | informativ |
| NW-ROLE-001 | Role & Permission Specification | informativ (geplant) |
| NW-CONSENT-001 | Consent & Privacy Specification | informativ (geplant) |
| NW-DASH-001 | Dashboard Specification | informativ (geplant) |

---

## Geltungsbereich

Diese Spezifikation gilt für alle Bestandteile der NeuroWays-Plattform, die Benutzeridentität, Mitgliedschaft oder organisatorischen Kontext verwenden.

Sie gilt technologieunabhängig — die fachlichen Regeln gelten gleichermaßen für Oracle APEX, React, Flutter, .NET oder jede andere Implementierungstechnologie.

Sie regelt ausschließlich die Identitätsschicht. Berechtigungen, Datenschutzfreigaben, Dashboards und Module folgen in separaten Spezifikationen.

---

## Offene Punkte

| Punkt | Beschreibung | Vorgesehen in |
|-------|-------------|---------------|
| Detailliertes Berechtigungsmodell | Welche Aktionen sind pro Rolle erlaubt? | NW-ROLE-001 |
| Datenschutz und Einwilligung | Welche Daten darf die Plattform über wen speichern? | NW-CONSENT-001 |
| Externer Identity Provider (Konfiguration) | Welche konkreten Provider werden unterstützt? | Implementierungsdokument |
| MFA-Implementierungsdetails | TOTP, SMS, Hardware-Token | Implementierungsdokument |
| Gastnutzung ohne Konto | Anonymer Zugang zu bestimmten Bereichen | NW-IDENTITY-001 v1.1.0 |

---

## Kapitel 1 — Vision

### 1.1 Warum Identität die Grundlage der gesamten Plattform bildet

Jede Interaktion eines Menschen mit NeuroWays beginnt mit einer einzigen Frage: *Wer ist da?*

Ohne eine klare Antwort auf diese Frage ist alles andere unmöglich. Es gibt keine personalisierten Ergebnisse, weil niemand weiß, zu wem sie gehören. Es gibt keinen Datenschutz, weil niemand weiß, wessen Daten gespeichert werden. Es gibt keine Rollen, weil niemand weiß, in welchem Kontext jemand handelt.

Identität ist nicht ein Feature unter vielen. Sie ist der Ausgangspunkt der gesamten Plattformarchitektur. Alles andere — Methoden, Dashboards, Module, Datenschutzregeln — setzt voraus, dass Identität gelöst ist.

### 1.2 Die fünf Kernbegriffe — und warum sie niemals vermischt werden dürfen

Diese fünf Begriffe beschreiben fünf völlig verschiedene Konzepte. Sie klingen verwandt. Sie sind es nicht.

#### Identität

> *Wer ist jemand — unabhängig davon, wo er gerade ist und was er gerade darf.*

Die Identität ist die unveränderliche Grundlage. Ein Mensch hat genau eine Identität in der Plattform. Sie besteht aus seinen persönlichen Attributen (Name, E-Mail, Sprache) und ist nicht von einem organisatorischen Kontext abhängig. Ob jemand in einem Unternehmen tätig ist oder privat die App nutzt — seine Identität bleibt dieselbe.

Identität ist **kontextfrei**. Sie trägt keine Berechtigungen. Sie weiß nicht, was jemand darf.

#### Mitgliedschaft

> *Die Verbindung zwischen einer Identität und einer Organisation — mit Beginn, Ende und Status.*

Eine Mitgliedschaft entsteht, wenn ein Benutzer einer Organisation beitritt. Sie hat einen Lebenszyklus: Sie beginnt, sie kann pausieren, sie endet. Durch die Mitgliedschaft erhält ein Benutzer einen organisatorischen Kontext. Durch die Mitgliedschaft werden Rollen vergeben.

Mitgliedschaft ist **kontextgebunden**. Ohne Organisation gibt es keine Mitgliedschaft.

#### Rolle

> *Die Funktion, die jemand innerhalb einer bestimmten Mitgliedschaft ausübt.*

Eine Rolle beschreibt, was jemand in einer Organisation ist — kein Mitarbeiter im allgemeinen Sinne, sondern: Manager in Organisation A, einfaches Mitglied in Organisation B. Rollen sind immer an eine Mitgliedschaft gebunden, niemals direkt an einen Benutzer.

Rollen sind **funktionsbeschreibend**. Sie tragen noch keine Berechtigungen — das ist Aufgabe von NW-ROLE-001.

#### Berechtigung

> *Was jemand in einem bestimmten Kontext tun darf.*

Berechtigungen entstehen aus der Kombination von Rolle und Kontext. Sie regeln den Zugriff auf Funktionen, Daten und Module. Berechtigungen sind das Ergebnis einer Auswertung — sie werden nicht gespeichert, sondern berechnet.

Berechtigungen sind **aktionsbezogen**. Sie antworten auf die Frage: „Darf ich das?" — nicht auf „Wer bin ich?"

**→ Berechtigungen sind nicht Bestandteil dieser Spezifikation. Sie folgen in NW-ROLE-001.**

#### Datenschutzfreigabe

> *Die explizite Einwilligung eines Benutzers zur Nutzung seiner Daten für einen bestimmten Zweck.*

Datenschutzfreigaben sind unabhängig von Rollen. Ein Benutzer mit Administratorrechten kann bestimmte Datennutzungen abgelehnt haben. Ein Benutzer mit minimalen Rechten kann umfangreiche Freigaben erteilt haben. Beides ist möglich und gleichzeitig gültig.

Datenschutzfreigaben folgen dem Prinzip der expliziten Einwilligung — sie sind niemals implizit aus einer Rolle ableitbar.

**→ Datenschutzfreigaben sind nicht Bestandteil dieser Spezifikation. Sie folgen in NW-CONSENT-001.**

---

## Kapitel 2 — Grundprinzipien

Die folgenden Prinzipien sind verbindlich für alle Bestandteile der NeuroWays-Plattform. Sie dürfen durch keine Implementierungsentscheidung aufgehoben werden.

### 2.1 Ein Benutzer — eine Identität

Jeder Mensch hat in NeuroWays genau eine Identität. Es gibt keine Konten-Duplikate, keine Schatten-Identitäten, keine plattforminternen Mehrfachkonten.

Wenn jemand die Plattform privat und beruflich nutzt, verwendet er dieselbe Identität — in unterschiedlichen Mitgliedschaftskontexten.

### 2.2 Ein Benutzer kann Mitglied mehrerer Organisationen sein

Mitgliedschaft und Identität sind getrennt. Ein Benutzer kann gleichzeitig Mitglied in einem Unternehmen, einem Verein und einer privaten Gruppe sein. Jede Mitgliedschaft hat ihre eigene Rolle, ihren eigenen Status und ihre eigene Gültigkeitsdauer.

### 2.3 Eine Organisation besitzt viele Benutzer

Organisationen sind Sammlungen von Mitgliedschaften. Sie kennen ihre Mitglieder durch die Mitgliedschaftsbeziehung, nicht durch direkte Benutzerzuordnung.

### 2.4 Rollen gehören niemals direkt zum Benutzer

Ein Benutzer trägt keine Rollen als persönliche Eigenschaft. Rollen entstehen ausschließlich durch Mitgliedschaften. Ohne Mitgliedschaft — keine Rolle.

Diese Trennung ermöglicht es, dass derselbe Mensch in Kontext A Manager und in Kontext B normales Mitglied ist — ohne dass seine Identität sich verändert.

### 2.5 Rollen gehören immer zur Mitgliedschaft

Jede Rollenzuweisung ist an eine konkrete Mitgliedschaft gebunden. Wenn eine Mitgliedschaft endet, erlöschen alle damit verbundenen Rollen automatisch.

### 2.6 Datenschutzfreigaben gehören niemals zu Rollen

Eine Rolle gibt keine Rechte über die Daten anderer Personen. Datenschutzfreigaben werden ausschließlich durch explizite, informierte Zustimmung des betroffenen Benutzers erteilt.

Kein organisatorischer Kontext, keine Rolle und keine administrative Funktion kann eine fehlende Einwilligung ersetzen.

---

## Kapitel 3 — Benutzer (User)

### 3.1 Definition

Ein Benutzer ist eine natürliche Person, die eine verifizierte Identität in der NeuroWays-Plattform besitzt.

Juristische Personen, Systeme oder automatisierte Prozesse sind keine Benutzer im Sinne dieser Spezifikation.

### 3.2 Pflichtattribute

| Attribut | Beschreibung | Bedingungen |
|----------|-------------|-------------|
| `user_id` | Unveränderlicher, systemgenerierter Primärschlüssel | Automatisch vergeben |
| `email` | Primäre Kontaktadresse, eindeutig im System | Muss verifiziert werden |
| `display_name` | Anzeigename — frei wählbar | Nicht systemweit eindeutig |
| `status` | Aktueller Kontostatus | Pflicht, aus definiertem Wertebereich |
| `created_at` | Zeitstempel der Kontoerstellung | Automatisch, unveränderlich |
| `email_verified` | Wurde die E-Mail-Adresse bestätigt? | Boolean |
| `preferred_language` | Bevorzugte Sprache für die Oberfläche | ISO 639-1 Code |

### 3.3 Optionale Attribute

| Attribut | Beschreibung |
|----------|-------------|
| `first_name` | Vorname |
| `last_name` | Nachname |
| `avatar_url` | URL zu einem Profilbild |
| `phone` | Telefonnummer (für MFA oder Benachrichtigungen) |
| `timezone` | Bevorzugte Zeitzone |
| `accessibility_preferences` | Nutzereinstellungen für Barrierefreiheit |
| `updated_at` | Zeitstempel der letzten Änderung |
| `last_login_at` | Zeitstempel des letzten erfolgreichen Logins |

### 3.4 Statusmodell

| Status | Bedeutung | Darf sich einloggen? | Daten sichtbar? |
|--------|-----------|---------------------|-----------------|
| `active` | Konto vollständig aktiv | ✅ ja | ✅ ja |
| `inactive` | Konto existiert, wurde lange nicht genutzt | ✅ ja | ✅ ja |
| `suspended` | Konto vorübergehend gesperrt | ❌ nein | für Admins: ✅ |
| `deleted` | Logisch gelöscht — Daten in Aufbewahrungsfrist | ❌ nein | für Admins: eingeschränkt |
| `archived` | Aufbewahrungsfrist abgelaufen, Daten anonymisiert | ❌ nein | ❌ nein |

Übergänge:

```
active ──→ inactive ──→ active (erneuter Login)
active ──→ suspended ──→ active (Sperrung aufgehoben)
active ──→ deleted ──→ archived (nach Aufbewahrungsfrist)
suspended ──→ deleted
inactive ──→ deleted
```

### 3.5 Lebenszyklus

**Aktiv:** Der Benutzer kann sich einloggen, Organisationen beitreten, Methoden durchführen und Daten einsehen. Alle Mitgliedschaften sind wirksam.

**Inaktiv:** Das Konto existiert und ist technisch nutzbar, wurde aber innerhalb eines definierten Zeitraums nicht verwendet. Keine automatischen Folgen — dient der Übersicht.

**Gesperrt:** Das Konto ist temporär oder dauerhaft gesperrt. Alle Sitzungen werden beendet. Mitgliedschaften bleiben erhalten, aber die Rollen sind nicht aktiv. Eine Sperrung hat immer einen dokumentierten Grund.

**Gelöscht:** Der Benutzer hat sein Konto gelöscht oder wurde gelöscht. Die Identität ist logisch entfernt. Transaktionsdaten (z. B. abgeschlossene Check-ins) können in anonymisierter Form erhalten bleiben, soweit gesetzlich erforderlich. Die Aufbewahrungsfrist ist durch NW-CONSENT-001 geregelt.

**Archiviert:** Die Aufbewahrungsfrist ist abgelaufen. Alle personenbezogenen Daten wurden anonymisiert oder gelöscht. Der Datensatz kann noch aus statistischen oder buchhalterischen Gründen in aggregierter Form vorliegen.

---

## Kapitel 4 — Organisation

### 4.1 Definition

Eine Organisation ist jede Form einer sozialen Einheit, die in NeuroWays Mitglieder verwaltet und gemeinsame Kontexte schafft.

NeuroWays unterscheidet bewusst nicht zwischen verschiedenen Organisationstypen auf Datenbankebene. Das Modell ist neutral.

### 4.2 Organisationstypen (informativ, nicht normativ)

| Typ | Beispiel |
|-----|---------|
| Unternehmen | GmbH, AG, Einzelunternehmen |
| Haushalt | Privater Familienverbund |
| Verein | Sportverein, Kulturverein |
| Schule | Schulklasse, Schulzweig |
| Behörde | Abteilung, Projektgruppe |
| Community | Selbsthilfegruppe, Online-Community |
| Projektgruppe | Temporäres Team |

Diese Liste ist nicht abschließend. Neue Typen entstehen ohne Änderung am Datenmodell — der Typ ist ein frei konfigurierbares Attribut.

### 4.3 Pflichtattribute

| Attribut | Beschreibung |
|----------|-------------|
| `org_id` | Unveränderlicher Primärschlüssel |
| `name` | Anzeigename der Organisation |
| `code` | Stabiler, eindeutiger Business-Code (z. B. `ORG-ACME`) |
| `status` | Aktueller Status (active, suspended, archived) |
| `created_at` | Erstellungszeitpunkt |
| `owner_user_id` | Initialer Eigentümer — natürliche Person |

### 4.4 Optionale Attribute

| Attribut | Beschreibung |
|----------|-------------|
| `org_type` | Freitext — Unternehmensart, Verein, Schule etc. |
| `description` | Kurzbeschreibung |
| `logo_url` | Organisationslogo |
| `website` | Webadresse |
| `contact_email` | Allgemeine Kontaktadresse |
| `timezone` | Standardzeitzone der Organisation |
| `preferred_language` | Standardsprache |
| `max_members` | Maximale Mitgliederzahl (für Lizenzierung) |

### 4.5 Organisationsstatusmodell

| Status | Bedeutung |
|--------|-----------|
| `active` | Organisation aktiv, alle Mitgliedschaften wirksam |
| `suspended` | Temporär gesperrt, keine Logins für Mitglieder |
| `archived` | Organisation aufgelöst, historisch erhalten |

Wenn eine Organisation archiviert wird, werden alle aktiven Mitgliedschaften beendet. Historische Daten (Check-ins, Ergebnisse) bleiben gemäß Datenschutzregeln erhalten.

### 4.6 Persönlicher Bereich

Jeder Benutzer besitzt implizit einen persönlichen Bereich — eine virtuelle Organisation, die nur ihn selbst enthält. Dieser Bereich wird bei der Kontoerstellung automatisch angelegt.

Der persönliche Bereich ermöglicht die Nutzung von NeuroWays ohne explizite Organisationsmitgliedschaft — für Privatnutzende, die keine Organisation verbinden möchten.

---

## Kapitel 5 — Mitgliedschaften

### 5.1 Definition

Eine Mitgliedschaft ist die formale Verbindung zwischen einem Benutzer und einer Organisation. Sie entsteht durch explizite Einladung oder Registrierung und hat einen definierten Lebenszyklus.

### 5.2 Pflichtattribute

| Attribut | Beschreibung |
|----------|-------------|
| `membership_id` | Unveränderlicher Primärschlüssel |
| `user_id` | Verweis auf den Benutzer |
| `org_id` | Verweis auf die Organisation |
| `status` | Aktueller Mitgliedschaftsstatus |
| `joined_at` | Zeitpunkt des Beitritts |
| `created_at` | Zeitpunkt der Anlage des Datensatzes |

### 5.3 Optionale Attribute

| Attribut | Beschreibung |
|----------|-------------|
| `valid_from` | Beginn der Mitgliedschaft (wenn in der Zukunft) |
| `valid_to` | Ende der Mitgliedschaft (wenn befristet) |
| `invited_by` | Benutzer-ID, die die Einladung ausgesprochen hat |
| `invitation_code` | Einladungsschlüssel |
| `roles` | Liste der zugewiesenen Rollen innerhalb dieser Mitgliedschaft |
| `is_primary` | Ist dies die primäre Mitgliedschaft des Benutzers? |
| `notes` | Interne Anmerkungen (nur für Manager sichtbar) |

### 5.4 Statusmodell

| Status | Bedeutung |
|--------|-----------|
| `pending` | Einladung ausgesprochen, noch nicht angenommen |
| `active` | Mitgliedschaft aktiv, Rollen wirksam |
| `paused` | Mitgliedschaft temporär pausiert (z. B. Elternzeit) |
| `expired` | `valid_to` ist überschritten — Mitgliedschaft abgelaufen |
| `revoked` | Mitgliedschaft durch Organisation entzogen |
| `left` | Benutzer hat die Organisation selbst verlassen |
| `archived` | Historisch erhalten, keine Wirksamkeit mehr |

Übergänge:

```
pending ──→ active (Einladung angenommen)
pending ──→ revoked (Einladung zurückgezogen)
active ──→ paused ──→ active
active ──→ revoked
active ──→ left
active ──→ expired (bei Fristablauf)
revoked / left / expired ──→ archived
```

### 5.5 Aktiver Kontext

Nach dem Login wählt ein Benutzer mit mehreren aktiven Mitgliedschaften einen aktiven Kontext. Der aktive Kontext bestimmt:

- Welche Organisation gerade aktiv ist
- Welche Rollen gelten
- Welche Module zur Verfügung stehen
- Welche Daten sichtbar sind

Der Wechsel des aktiven Kontexts erfordert keinen erneuten Login. Der persönliche Bereich ist immer verfügbar, unabhängig vom aktiven Kontext.

### 5.6 Eindeutigkeit

Ein Benutzer kann in einer Organisation immer nur eine aktive Mitgliedschaft haben. Historische (archivierte) Mitgliedschaften bleiben erhalten, zählen aber nicht als aktive Mitgliedschaft.

---

## Kapitel 6 — Rollenmodell

### 6.1 Grundprinzip

Rollen beschreiben die Funktion eines Benutzers innerhalb einer Mitgliedschaft. Sie sind immer kontextgebunden — eine Rolle gilt nur innerhalb der Mitgliedschaft, durch die sie vergeben wurde.

Rollen tragen in dieser Spezifikation noch keine konkreten Berechtigungen. Das ist Aufgabe von NW-ROLE-001.

### 6.2 Grundrollen

| Rolle | Code | Beschreibung |
|-------|------|--------------|
| **Mitglied** | `member` | Basisrolle — jeder aktive Teilnehmer einer Organisation |
| **Manager** | `manager` | Kann Mitglieder einladen, Mitgliedschaften verwalten und Rollen innerhalb seiner Zuständigkeit vergeben |
| **Organisationsverantwortlicher** | `org_owner` | Vollständige Kontrolle über die Organisation — kann alle Mitgliedschaften und Rollen verwalten |

### 6.3 Mehrfachrollen

Ein Benutzer kann innerhalb einer Mitgliedschaft mehrere Rollen gleichzeitig tragen. Beispiel: Ein Benutzer ist sowohl `member` (für seine eigene Nutzung) als auch `manager` (für die Verwaltung einer Untergruppe).

Mehrfachrollen werden additiv ausgewertet — die weitreichendste Berechtigung gilt.

### 6.4 Rollenübertragung

- Die Rolle `org_owner` kann von genau einer Person gehalten werden oder bewusst auf mehrere verteilt werden — je nach Konfiguration der Organisation.
- Rollen können innerhalb der Berechtigungsgrenzen delegiert werden.
- Keine Rolle kann über die eigene Rollenstufe hinaus vergeben werden.

### 6.5 Rollenende

Wenn eine Mitgliedschaft endet (status: left, revoked, expired), erlöschen alle damit verbundenen Rollen automatisch und sofort. Keine manuelle Bereinigung erforderlich.

---

## Kapitel 7 — Authentifizierung

### 7.1 Grundsatz

Authentifizierung ist der Prozess, durch den eine Identität technisch bestätigt wird. Er ist getrennt von Autorisierung (Was darf jemand?) und Identitätsverwaltung (Wer ist jemand?).

Diese Spezifikation beschreibt die Authentifizierungsflüsse auf fachlicher Ebene. Konkrete Protokolle (OAuth 2.0, OIDC, SAML) und Bibliotheken folgen in Implementierungsdokumenten.

### 7.2 Login

Der Login-Prozess bestätigt, dass der Benutzer derjenige ist, der er behauptet zu sein.

Mindeststufen:
1. Identifikator (E-Mail-Adresse)
2. Geheimnis (Passwort) oder externer Provider-Token
3. Optional: zweiter Faktor (MFA)

Nach erfolgreichem Login wird eine Sitzung eröffnet. Die Sitzung enthält den Benutzerkontext (Kapitel 8).

### 7.3 Registrierung

Die Registrierung legt eine neue Identität an. Pflichtschritte:

1. E-Mail-Adresse eingeben
2. Passwort wählen (Mindestkomplexität nach Implementierungsrichtlinie)
3. E-Mail-Verifizierung durchführen
4. Anzeigenamen wählen

Nach Abschluss: Status `active`, `email_verified = true`. Persönlicher Bereich wird automatisch angelegt.

### 7.4 Passwort vergessen

1. Benutzer gibt seine E-Mail-Adresse an
2. Wenn die Adresse im System bekannt ist, wird ein zeitlich begrenzter Reset-Link gesendet
3. Der Link ist einmalig verwendbar
4. Neues Passwort muss Mindestkomplexität erfüllen
5. Alle aktiven Sitzungen werden nach Passwortreset beendet

**Sicherheitsprinzip:** Die Plattform gibt niemals zurück, ob eine E-Mail-Adresse registriert ist — die Antwort lautet immer „Wenn die Adresse bekannt ist, erhältst du eine E-Mail." (Schutz vor E-Mail-Enumeration)

### 7.5 E-Mail-Verifizierung

Jede neu registrierte E-Mail-Adresse muss verifiziert werden, bevor vollständige Funktionalität freigeschaltet wird.

- Verifizierungslink ist zeitlich begrenzt (Dauer: Implementierungsrichtlinie)
- Unverifizierte Konten haben eingeschränkten Zugriff
- Neue E-Mail-Adressen (bei Adressänderung) erfordern erneute Verifizierung

### 7.6 MFA-Vorbereitung

Das Modell ist für Multi-Faktor-Authentifizierung vorbereitet. Unterstützte Faktoren (Implementierung folgt):

- TOTP (zeitbasierte Einmalpasswörter, z. B. Authenticator-App)
- E-Mail-OTP (Code per E-Mail)
- SMS-OTP (Code per SMS — optionale Implementierung)
- Hardware-Token (FIDO2/WebAuthn — für zukünftige Phase)

MFA ist optional für Benutzer, kann aber von Organisationen für ihre Mitglieder verpflichtend gesetzt werden.

### 7.7 Externe Identity Provider

Die Plattform unterstützt externe Anbieter für Login ohne eigenes Passwort.

Anforderungen an externe Provider:
- Standardkonformes Protokoll (OAuth 2.0 / OIDC)
- Rückgabe einer verifizierten E-Mail-Adresse
- Keine automatische Kontenanlage bei fehlendem Konto (opt-in erforderlich)

Externe Provider ersetzen das Passwort, nicht die Identität. Wenn ein Benutzer mit einem externen Provider einloggt, wird seine bestehende NeuroWays-Identität verknüpft — keine neue Identität entsteht.

---

## Kapitel 8 — Benutzerkontext

### 8.1 Definition

Der Benutzerkontext ist der vollständige, ausgewertete Zustand, der nach einem erfolgreichen Login und einer Kontextwahl vorliegt. Er beantwortet die vier Grundfragen der Plattform.

### 8.2 Die vier Grundfragen

**Frage 1: Wer bin ich?**

→ Identität des Benutzers: `user_id`, `display_name`, `email`, `preferred_language`, `status`

**Frage 2: Welche Organisation ist aktiv?**

→ Aktive Mitgliedschaft: `org_id`, `org_name`, Mitgliedschaftsstatus

**Frage 3: Welche Rollen gelten?**

→ Rollenliste der aktiven Mitgliedschaft: z. B. `[member, manager]`

**Frage 4: Welche Module stehen zur Verfügung?**

→ Wird berechnet aus: aktiver Organisation + Rollen + Modulkonfiguration der Organisation

Die Antwort auf Frage 4 ist nicht Bestandteil dieser Spezifikation. Sie folgt in NW-MODULE-001.

### 8.3 Kontextwechsel

Wenn ein Benutzer mehrere aktive Mitgliedschaften hat, kann er den aktiven Kontext jederzeit wechseln. Nach dem Wechsel:

- Alle vier Grundfragen werden neu ausgewertet
- Die sichtbaren Daten wechseln in den neuen organisatorischen Kontext
- Persönliche Daten (eigene Check-ins im persönlichen Bereich) bleiben immer zugänglich

### 8.4 Sitzungsmodell

Eine Sitzung beginnt nach erfolgreichem Login und endet durch:

- Aktives Abmelden
- Ablauf der Sitzungsdauer (Implementierungsrichtlinie)
- Passwortreset
- Sperrung des Kontos
- Sperrung der Organisation

Sitzungen sind an Geräte gebunden. Ein Benutzer kann mehrere gleichzeitige Sitzungen auf verschiedenen Geräten haben.

---

## Kapitel 9 — Abgrenzung

Die folgenden Themen sind ausdrücklich nicht Bestandteil dieser Spezifikation. Sie folgen in separaten Dokumenten.

| Thema | Dokument |
|-------|---------|
| **Berechtigungen** — Was darf eine Rolle konkret tun? | NW-ROLE-001 |
| **Datenschutz** — Welche Daten werden wie lange gespeichert? | NW-CONSENT-001 |
| **Freigaben** — Explizite Einwilligungen für Datennutzung | NW-CONSENT-001 |
| **Dashboard** — Welche Inhalte sieht ein Benutzer nach dem Login? | NW-DASH-001 |
| **Module** — Welche Funktionen sind für welche Rollen verfügbar? | NW-MODULE-001 |
| **Knowledge Assets** — Fachliche Wissensobjekte | NW-KAS-001 |
| **Methoden** — Konkrete NeuroWays-Fachmethoden | Methodenspezifikationen |
| **NeuroPlay, NeuroFlow, Flowisaurus** | Modulspezifikationen |
| **Abrechnung und Lizenzen** | Separate Plattformspezifikation |

---

## Kapitel 10 — Beziehungen

### 10.1 Beziehungsmodell (fachlich)

```
USER (Benutzer)
│
├── hat genau eine IDENTITÄT (die USER selbst ist)
│
├── hat genau einen PERSÖNLICHEN BEREICH (automatisch, immer)
│
└── hat 0..n MITGLIEDSCHAFTEN
        │
        ├── jede MITGLIEDSCHAFT gehört zu genau einer ORGANISATION
        │
        ├── jede MITGLIEDSCHAFT hat 0..n ROLLEN
        │        (member, manager, org_owner)
        │
        └── eine MITGLIEDSCHAFT ist zu einem Zeitpunkt der AKTIVE KONTEXT


ORGANISATION
│
├── hat 0..n MITGLIEDSCHAFTEN (ihre Mitglieder)
│
└── hat genau einen ORGANISATIONSVERANTWORTLICHEN
        (mindestens eine aktive Mitgliedschaft mit Rolle org_owner)
```

### 10.2 Kardinalitäten

| Beziehung | Kardinalität | Anmerkung |
|-----------|-------------|-----------|
| User → Mitgliedschaft | 0..n | Benutzer ohne Mitgliedschaft nutzen persönlichen Bereich |
| Mitgliedschaft → User | 1..1 | Jede Mitgliedschaft gehört genau einem Benutzer |
| Mitgliedschaft → Organisation | 1..1 | Jede Mitgliedschaft gehört genau einer Organisation |
| Organisation → Mitgliedschaft | 0..n | Eine Organisation kann keine oder viele Mitglieder haben |
| User → aktiver Kontext | 0..1 | Nach Login: genau einer, davor: keiner |
| Mitgliedschaft → Rollen | 0..n | Auch ohne explizite Rolle: implizit `member` |

### 10.3 Regeln

- Eine Mitgliedschaft ohne Benutzer ist technisch ungültig
- Eine Organisation ohne `org_owner` ist eine Übergangssituation — muss aufgelöst werden
- Ein Benutzer mit Status `deleted` darf keine aktiven Mitgliedschaften mehr haben
- Rollen ohne Mitgliedschaft existieren nicht

---

## Kapitel 11 — Roadmap

Diese Spezifikation bildet die Grundlage für den folgenden Aufbau der NeuroWays-Plattform. Die empfohlene Entwicklungsreihenfolge folgt dem Abhängigkeitsprinzip.

```
NW-IDENTITY-001 (diese Spezifikation) ← ABGESCHLOSSEN (draft)
│
├── NW-ROLE-001 — Rollen & Berechtigungen
│     Was darf wer konkret in welchem Kontext?
│     Abhängig von: NW-IDENTITY-001
│
├── NW-CONSENT-001 — Datenschutz & Einwilligung
│     Welche Daten werden wie lange gespeichert? Welche Freigaben gibt es?
│     Abhängig von: NW-IDENTITY-001
│
├── NW-DASH-001 — Dashboard Specification
│     Welche Inhalte sieht wer nach dem Login?
│     Abhängig von: NW-IDENTITY-001, NW-ROLE-001
│
├── NW-MODULE-001 — Modulverfügbarkeit
│     Welche Module stehen für welche Rollen/Organisationen zur Verfügung?
│     Abhängig von: NW-IDENTITY-001, NW-ROLE-001
│
├── NeuroPlay / NeuroFlow / Flowisaurus
│     Alle Module setzen NW-IDENTITY-001 voraus
│     Abhängig von: NW-IDENTITY-001, NW-MODULE-001
│
└── Knowledge Asset System (NW-KAS-001)
      Wissensobjekte benötigen Owner-Referenzen aus NW-IDENTITY-001
      Für organisationsübergreifende Assets: NW-ROLE-001 erforderlich
```

---

## Kapitel 12 — Kritische Selbstbewertung

### Stärken

- Klare Trennung der fünf Kernbegriffe: Identität, Mitgliedschaft, Rolle, Berechtigung, Datenschutzfreigabe
- Neutrales Organisationsmodell — keine Einschränkung auf Unternehmenstypen
- Persönlicher Bereich als implizite Organisation löst den Privatnutzer-Fall elegant
- Rollenmodell ist erweiterbar, ohne diese Spezifikation zu ändern
- Authentifizierungsflüsse sind vollständig beschrieben ohne Technologiebindung
- Abgrenzung zu Berechtigungen und Datenschutz ist präzise

### Dokumentierte Lücken

**1. Gastnutzung ohne Konto ist nicht definiert**
Die Spezifikation setzt voraus, dass jeder Benutzer eine registrierte Identität hat. Wenn NeuroWays in Zukunft öffentliche Inhalte ohne Login anbietet, fehlt das Modell für anonyme oder Gastzugänge. → NW-IDENTITY-001 v1.1.0.

**2. Einladungsmodell ist beschrieben aber nicht vollständig spezifiziert**
Das Einladungsfeld `invitation_code` ist erwähnt, aber der vollständige Einladungsfluss (Ablaufdaten, mehrfache Nutzung, öffentliche Links) ist nicht definiert. → Implementierungsdokument oder NW-IDENTITY-001 v1.1.0.

**3. Konten-Zusammenführung nicht beschrieben**
Was passiert, wenn jemand zwei Konten angelegt hat (z. B. einmal mit E-Mail, einmal über externen Provider, mit verschiedenen Adressen)? Das Merge-Modell fehlt. → NW-IDENTITY-001 v1.1.0.

**4. Keine Aussage zu Datenhaltung bei Kontoauflösung**
Kapitel 3.4 beschreibt den Status `archived` als „Daten anonymisiert". Die genauen Regeln — was anonymisiert wird, was gelöscht wird, was aggregiert erhalten bleibt — sind nicht definiert. → NW-CONSENT-001.

**5. Sitzungsdauer und Token-Verwaltung offen**
Sitzungsdauer, Refresh-Tokens, simultane Sitzungen pro Gerät — alles Implementierungsdetails, die aber auf fachlicher Ebene Grenzen brauchen (z. B. „maximale Inaktivitätsdauer"). → Sicherheitsrichtlinie oder NW-IDENTITY-001 v1.1.0.

### Gesamtbewertung

**Diese Spezifikation ist ausreichend, damit alle zukünftigen NeuroWays-Komponenten dieselbe Identitätsschicht verwenden können.**

Die fünf Kernbegriffe sind klar definiert und trennscharf. Das Organisationsmodell ist neutral und skaliert. Das Mitgliedschaftsmodell ist vollständig. Das Rollenmodell ist erweiterbar.

Die fünf dokumentierten Lücken betreffen Randfälle und Implementierungsdetails — sie blockieren nicht den Aufbau der nächsten Plattformschicht. NW-ROLE-001 und NW-CONSENT-001 können unmittelbar auf dieser Grundlage entwickelt werden.

---

## Definitionen

| Begriff | Definition |
|---------|-----------|
| **Identität** | Die unveränderliche, kontextfreie Grundlage eines Benutzers in der Plattform |
| **Mitgliedschaft** | Die formale, zeitlich begrenzte Verbindung zwischen einer Identität und einer Organisation |
| **Rolle** | Die Funktion eines Benutzers innerhalb einer Mitgliedschaft — immer kontextgebunden |
| **Berechtigung** | Was jemand in einem bestimmten Kontext tun darf — berechnet, nicht gespeichert |
| **Datenschutzfreigabe** | Die explizite, informierte Einwilligung zur Nutzung personenbezogener Daten |
| **Aktiver Kontext** | Die zum Zeitpunkt einer Sitzung ausgewählte aktive Mitgliedschaft und Organisation |
| **Persönlicher Bereich** | Die implizite Einzelnutzer-Organisation eines jeden Benutzers — immer vorhanden |
| **Sitzung** | Ein authentifizierter, zeitlich begrenzter Zugriffszustand |

---

## Ausnahmen

Keine Ausnahmen bei Erstfassung.

---

## Qualitätsprüfung

| Kriterium | Bestanden |
|-----------|-----------|
| Alle 12 Kapitel vorhanden und vollständig ausformuliert | ✅ |
| Fünf Kernbegriffe klar und trennscharf definiert | ✅ |
| Kein Datenbankschema, keine SQL, keine Implementierung | ✅ |
| Technologieunabhängig formuliert | ✅ |
| Beziehungen fachlich beschrieben (keine Tabellen) | ✅ |
| Abgrenzung zu NW-ROLE-001, NW-CONSENT-001 etc. klar | ✅ |
| Kritische Selbstbewertung mit Lücken | ✅ |
| Roadmap beschreibt Abhängigkeiten | ✅ |

---

*NW-IDENTITY-001 — NeuroWays Identity & Membership Specification v1.0.0 — Status: draft — zur Prüfung vorgelegt — 2026-07-23*

┌─────────────────────────────────────────────────
│ ./NW-IDENTITY-002_PRODUCTIVE_INTEGRATION.md
└─────────────────────────────────────────────────
# NW-IDENTITY-002 — Productive Identity Integration

**Dokumentcode:** NW-IDENTITY-002  
**Version:** 1.0.0  
**Status:** COMPLETED  
**Abgeschlossen:** 2026-07-23  
**Grundlage:** NW-IDENTITY-001 (Identity & Membership Specification) + NW-IDENTITY-POC-001 (bestanden, 14/14 Tests)

---

## Ergebnis

**12/12 Tests bestanden. Status: COMPLETED.**

---

## Neue Seiten

| Datei | Route | Beschreibung |
|-------|-------|-------------|
| `src/pages/LoginPage.jsx` | `/login` | Login mit E-Mail + Passwort, Split-Layout mit Markenfarbe |
| `src/pages/RegisterPage.jsx` | `/register` | Registrierung mit Anzeigename, E-Mail, Passwort |
| `src/pages/ForgotPasswordPage.jsx` | `/forgot-password` | Passwort-Reset UI — vollständig, E-Mail-Versand offen |
| `src/pages/DashboardPage.jsx` | `/dashboard` | Geschützte Startseite mit Navigation zu Modulen |

## Neue Komponenten

| Datei | Beschreibung |
|-------|-------------|
| `src/lib/authContext.jsx` | Globaler Auth-State (React Context), auto-refresh beim Start |
| `src/components/ProtectedRoute.jsx` | Route Guard — redirectet nicht-angemeldete Benutzer zu /login |
| `src/components/AuthNav.jsx` | Auth-aware Navigation — unterschiedlich für Gäste und Angemeldete |

## Geänderte Dateien

| Datei | Änderung |
|-------|---------|
| `src/App.jsx` | Vollständig neu — AuthProvider, Routes für public/protected, Layout-Komponente |

## Routing

```
/ → redirect → /dashboard (ProtectedRoute → /login wenn nicht angemeldet)

PUBLIC:
  /login
  /register
  /forgot-password
  /identity-poc  (Dev-Tool, ohne Schutz)

PROTECTED (ProtectedRoute):
  /dashboard
  /checkin
  /result/:id
  /history
  /privacy
```

## Auth-State

- `AuthProvider` wraps die gesamte App
- Beim Start: `refreshAuthOnStartup()` erneuert das Token, dann `setUser(getCurrentUser())`
- `pb.authStore.onChange` hört auf alle Token-Änderungen
- `useAuth()` Hook gibt `{ user, loading, logout }` zurück
- `loading = true` während der Token-Prüfung → Ladekreis, kein Flash

## Geschützte Routen

`ProtectedRoute` prüft:
1. `loading` → Ladekreis
2. `!user` → Navigate to /login (mit `state.from` für Redirect nach Login)
3. `account_status === "LOCKED"` → /login mit Fehlerstatus
4. `account_status === "DEACTIVATED"` → /login mit Fehlerstatus

## Testergebnisse — 12/12 bestanden

| Test | Ergebnis |
|------|---------|
| T01 Registrierung | ✅ |
| T02 Login | ✅ |
| T03 Logout | ✅ |
| T04 Browser-Reload / Session bleibt | ✅ |
| T05 Token gültig | ✅ |
| T06 Ungültiger Token abgelehnt | ✅ |
| T07 Direkter URL-Aufruf → Redirect | ✅ |
| T08 Falsches Passwort | ✅ |
| T09 LOCKED-Konto | ✅ |
| T10 DEACTIVATED-Konto | ✅ |
| T11 Datenisolation User A / User B | ✅ |
| T12 Mobile Darstellung | ✅ |

## Offene Punkte

| Punkt | Beschreibung |
|-------|-------------|
| E-Mail-Versand | Passwort-Reset per E-Mail noch nicht produktiv — SMTP-Aktivierung erforderlich |
| Dashboard-Ausbau | Platzhalter für "Meine Pakete" und "Meine Builds" — folgt in späteren Iterationen |
| Passwort-Änderung im Profil | Formular vorhanden in IdentityPoc, noch nicht in eigener Profilseite |
| Profil-Seite | Anzeigename und E-Mail ändern — noch kein eigenes Route |

---

*NW-IDENTITY-002 — Productive Identity Integration — Status: COMPLETED — 2026-07-23*

┌─────────────────────────────────────────────────
│ ./NW-IDENTITY-POC-001_REPORT.md
└─────────────────────────────────────────────────
# NW-IDENTITY-POC-001 — Proof of Identity: Abschlussbericht

**Dokumentcode:** NW-IDENTITY-POC-001-REPORT  
**Version:** v0.1.0  
**Status:** BESTANDEN  
**Datum:** 2026-07-23  
**Grundlage:** NW-IDENTITY-001 — NeuroWays Identity & Membership Specification

---

## Zusammenfassung

Der Proof of Identity wurde vollständig implementiert und getestet. Alle 14 Abnahmekriterien sind erfüllt. Die Identitätsschicht ist technisch tragfähig und bildet eine sichere Grundlage für den weiteren Plattformaufbau.

**Gesamturteil:** ✅ BESTANDEN

---

## Implementierte Funktionen

| Funktion | Implementiert | Datei |
|---------|--------------|-------|
| Registrierung (E-Mail, Passwort, Anzeigename) | ✅ | `identity.js` → `register()` |
| Login über E-Mail + Passwort | ✅ | `identity.js` → `login()` |
| Logout (Sitzung vollständig beendet) | ✅ | `identity.js` → `logout()` |
| Passwort ändern (authentifiziert) | ✅ | `identity.js` → `changePassword()` |
| Passwort-Reset Anforderung (flow-bereit) | ✅ | `identity.js` → `requestPasswordReset()` |
| Kontostatus: ACTIVE, LOCKED, DEACTIVATED | ✅ | `users.account_status` + `identity.js` |
| Stabile interne User-ID | ✅ | PocketBase `id` (UUID, unveränderlich) |
| Persönlicher Testwert (pro User isoliert) | ✅ | `identity_test_values` (Row-Level Security) |
| Sicherheits-Audit-Log | ✅ | `identity_audit_log` |
| Sitzungskontext aus Auth-Store (serverseitig) | ✅ | `pb.authStore` (JWT) |
| Auth-Refresh beim Start | ✅ | `refreshAuthOnStartup()` |
| UI-Seite unter `/identity-poc` | ✅ | `IdentityPoc.jsx` |

---

## Ausgeführte Tests und Ergebnisse

| Test | Beschreibung | Ergebnis |
|------|-------------|---------|
| **T1** | User A registrieren | ✅ OK |
| **T2** | User A anmelden, Token erhalten | ✅ OK |
| **T3** | User A speichert persönlichen Testwert | ✅ OK |
| **T4** | User B registrieren | ✅ OK |
| **T5** | User B anmelden | ✅ OK |
| **T6** | User B kann User A's Daten NICHT per Filter lesen | ✅ OK — 0 Records sichtbar |
| **T7** | User B kann User A's Record NICHT per ID lesen | ✅ OK — HTTP 404 |
| **T8** | User B speichert eigenen Testwert | ✅ OK |
| **T9** | User A erneuter Login nach Logout | ✅ OK |
| **T10** | Testwert von A nach erneutem Login verfügbar | ✅ OK — Wert erhalten |
| **T11** | Falsches Passwort → generische Fehlermeldung | ✅ OK — HTTP 400 (keine Enumeration) |
| **T12** | LOCKED-Status → identity.js blockiert Login | ✅ OK |
| **T13** | Audit-Log schreibt via SDK-Pattern | ✅ OK |
| **T14** | User-ID stabil über mehrere Sitzungen | ✅ OK — ID identisch |

**Alle 14 Tests: bestanden.**

---

## Sicherheitsprüfung

| Sicherheitsanforderung | Status | Methode |
|----------------------|--------|---------|
| Passwörter niemals im Klartext gespeichert | ✅ | PocketBase bcrypt-Hashing |
| User-ID ausschließlich aus serverseitigem JWT | ✅ | `pb.authStore.record` (nicht aus URL/Formular) |
| Persönliche Daten automatisch auf auth.id begrenzt | ✅ | `listRule: "user_id = @request.auth.id"` |
| Direkter Record-Zugriff durch fremde User blockiert | ✅ | `viewRule: "user_id = @request.auth.id"` → 404 |
| Fehlermeldungen offenbaren keine E-Mail-Existenz | ✅ | Generische Meldung in `identity.js` |
| Sitzung nach Logout ungültig | ✅ | `pb.authStore.clear()` |
| Sicherheitsereignisse protokolliert (kein Passwort) | ✅ | `identity_audit_log` ohne Passwort-Felder |

---

## Technologietrennung

| Schicht | Technologieabhängig | Datei |
|--------|---------------------|-------|
| Identitätsdaten | ✅ PocketBase `users` | — |
| Authentifizierungslogik | ⚠️ PocketBase SDK (austauschbar) | `identity.js` |
| Sitzungskontext | ⚠️ PocketBase JWT / authStore | `identity.js` → `getCurrentUser()` |
| Persönliche Daten | ✅ PocketBase (Row-Level Security) | `identity_test_values` |
| Benutzeroberfläche | ✅ React (austauschbar) | `IdentityPoc.jsx` |
| Fachliche Logik | ❌ Technologieunabhängig | `identity.js` (Funktionsschnittstelle) |

Die Authentifizierungslogik in `identity.js` ist über eine klare Schnittstelle von der UI getrennt. Ein Wechsel der Auth-Technologie (z. B. auf Oracle APEX, Keycloak) erfordert nur die Anpassung von `identity.js` — `IdentityPoc.jsx` und alle zukünftigen UI-Komponenten bleiben unverändert.

---

## Abweichungen von NW-IDENTITY-001

| Abweichung | Grund | Auswirkung |
|-----------|-------|------------|
| **E-Mail-Verifizierungsfluss nicht implementiert** | PocketBase Email-API ist in dieser Umgebung deaktiviert | Kein produktiver Blocker — `emailVerified`-Feld existiert, Fluss folgt in Produktionsumgebung |
| **Passwort-Reset per E-Mail-Link nicht implementiert** | Gleicher Grund | Funktion gibt informative Rückmeldung, E-Mail-Versand folgt in Produktionsumgebung |
| **Audit-Log über UI nicht sichtbar** | `listRule: null` (Admin-only) korrekt — Browser-SDK hat keinen Admin-Kontext | Sicherheitsprinzip korrekt; Audit-Einsicht nur über Admin-Interface |
| **Externe Identity Provider** | Konfigurationsaufgabe, nicht POC-Scope | Modell ist vorbereitet (`_externalAuths` System-Collection vorhanden) |

---

## Erforderliche Anpassungen an NW-IDENTITY-001

| Punkt | Empfehlung |
|-------|-----------|
| **E-Mail-Verifizierungsfluss** | Im Standard explizit dokumentieren, dass ein SMTP-Relay oder externer Service benötigt wird |
| **Passwort-Reset-Token-Lebensdauer** | Konkrete Lebensdauer (z. B. 15 Minuten) im Standard definieren, nicht dem Implementierer überlassen |
| **Audit-Log-Zugang** | Explizit festhalten: Audit-Log ist ausschließlich für Administratoren lesbar — kein Benutzer darf eigene Log-Einträge sehen |

---

## Empfehlung

**✅ NW-IDENTITY-POC-001 gilt als BESTANDEN.**

Die Identitätsschicht ist sicher, technisch tragfähig und sauber von der UI getrennt. Alle kritischen Sicherheitsanforderungen (Datenisolation, keine Enumeration, Sitzungsintegrität) sind erfüllt und automatisiert getestet.

**Nächste empfohlene Schritte:**

1. **NW-ROLE-001** — Rollen und Berechtigungen auf Basis dieser Identitätsschicht aufbauen
2. **E-Mail-SMTP** konfigurieren, um Verifizierung und Passwort-Reset produktiv zu aktivieren
3. **Persönlicher Bereich** implementieren (implizite Organisation für jeden Benutzer)

---

*NW-IDENTITY-POC-001 — Abschlussbericht v0.1.0 — 2026-07-23 — NeuroWays Core*

┌─────────────────────────────────────────────────
│ ./NW-KAS-001_KNOWLEDGE_ASSET_STANDARD.md
└─────────────────────────────────────────────────
# NW-KAS-001 — NeuroWays Knowledge Asset Standard

**Dokumentcode:** NW-KAS-001  
**Version:** 1.0.0  
**Status:** draft  
**Erstellt:** 2026-07-23  
**Gültig ab:** nach Freigabe  
**Verantwortlich:** NeuroWays Core  
**Hierarchie:** Wissensarchitektur-Standard — referenziert NW-STD-000 normativ, NW-STD-001 normativ, NW-STD-003 normativ  
**Ablöst:** –  
**Abgelöst durch:** –

---

## Änderungsverlauf

| Version | Datum | Änderung | Autor |
|---------|-------|----------|-------|
| 1.0.0 | 2026-07-23 | Erstfassung | NeuroWays Core |

---

## Referenzen

| Dokument | Titel | Art |
|---------|-------|-----|
| NW-STD-000 | Standards Framework Standard | normativ |
| NW-STD-001 | Naming Standard | normativ |
| NW-STD-002 | Standards Registry Standard | informativ |
| NW-STD-003 | Database Standard | normativ |
| NW-DSN-001 | World Design Standard | informativ |
| NW-STD-010 | Versioning Standard | informativ (geplant) |

---

## Geltungsbereich

Dieser Standard gilt für alle Wissensobjekte innerhalb des NeuroWays-Systems, die fachliche Bedeutung tragen und aus denen mediale Ausgaben abgeleitet werden.

Er gilt für alle Module, Methoden und Produkte von NeuroWays:
- Energy Navigator und alle weiteren Methoden
- NeuroFlow, NeuroPlay, Flowisaurus
- Website, App, Workshops, Präsentationen
- Dokumentation, Social Media, KI-Anwendungen

Er regelt nicht die konkrete technische Implementierung. Er beschreibt das fachliche Modell und die Ableitungsregeln.

---

## Offene Punkte

| Punkt | Beschreibung | Vorgesehen in |
|-------|-------------|---------------|
| Datenbankmodell für Knowledge Assets | Konkrete Collections und Felder | NW-STD-003 v1.1.0 + Implementierungsdokument |
| KI-Prompt-Regeln | Wie Prompts aus Assets generiert werden | NW-KAS-002 (geplant) |
| Mehrsprachigkeit | Wie Assets in mehreren Sprachen gepflegt werden | NW-KAS-001 v1.1.0 |
| Versionierungsdetails | Semver-Regeln für Knowledge Assets | NW-STD-010 |

---

## Kapitel 1 — Vision

### 1.1 NeuroWays entwickelt kein Bildmaterial — NeuroWays entwickelt Wissen

Jedes Mal, wenn eine Organisation ein Bild erstellt und dabei das Wissen dahinter vergisst, entsteht Inhalt ohne Substanz. Das Bild kann schön sein. Aber es kann nicht erklärt werden. Es kann nicht übersetzt werden. Es kann nicht in einem anderen Format wiederverwendet werden. Es muss irgendwann erneut erstellt werden — für eine andere Plattform, eine andere Zielgruppe, ein anderes Medium.

NeuroWays wählt einen anderen Weg.

Der Ausgangspunkt ist niemals ein Bild, ein Text oder eine Seite. Der Ausgangspunkt ist ein **Knowledge Asset** — eine vollständige fachliche Beschreibung dessen, was ein Konzept bedeutet, wie es wirkt, wen es anspricht und was damit erreicht werden soll.

Aus diesem Wissen werden Bilder abgeleitet. Texte. App-Inhalte. Workshop-Unterlagen. Präsentationen. KI-Ausgaben.

Das Wissen selbst bleibt an einem Ort. Alle Ausgaben entstehen daraus.

### 1.2 Warum Inhalte niemals doppelt gepflegt werden

Ohne eine gemeinsame Wissensquelle entsteht Drift: Die App erklärt das Meer anders als die Website. Der Workshop verwendet andere Metaphern als die Präsentation. Die KI liefert Antworten, die nicht zur App passen.

Jede dieser Abweichungen kostet Vertrauen — beim Nutzenden, der merkt, dass etwas nicht ganz zusammenpasst.

Das Knowledge Asset ist die Antwort auf dieses Problem. Es ist die einzige autoritative Quelle für die fachliche Bedeutung eines Konzepts. Alle Medien werden aus ihm abgeleitet, nie neben ihm entwickelt.

Eine Änderung am Knowledge Asset propagiert sich — kontrolliert, versioniert — in alle Ausgaben. Keine Ausgabe kann sich verselbstständigen.

### 1.3 Was das für NeuroWays bedeutet

NeuroWays ist eine modulare Plattform für Selbstbeobachtung und persönliches Verstehen. Ihre Wirkung entsteht durch Konsistenz: Derselbe Begriff bedeutet in der App dasselbe wie im Workshop. Dasselbe Bild transportiert dieselbe Bedeutung auf der Website wie in der Präsentation.

Diese Konsistenz ist kein Zufall. Sie ist das Ergebnis einer sorgfältigen Wissensarchitektur.

Der Knowledge Asset Standard ist das Fundament dieser Architektur.

---

## Kapitel 2 — Definition

### 2.1 Was ist ein Knowledge Asset?

Ein Knowledge Asset ist die kleinste vollständige, wiederverwendbare Wissenseinheit innerhalb von NeuroWays.

**Vollständig** bedeutet: Es enthält alle Pflichtinformationen, die notwendig sind, um daraus eine Ausgabe in einem beliebigen Medium zu erstellen — ohne zusätzliches Nachfragen.

**Wiederverwendbar** bedeutet: Dasselbe Knowledge Asset kann in zehn verschiedenen Medien und für fünf verschiedene Zielgruppen verwendet werden, ohne dass sein Kern verändert wird.

**Wissenseinheit** bedeutet: Es beschreibt nicht, wie etwas aussieht, sondern was es bedeutet, warum es existiert und wie es wirkt.

Ein Knowledge Asset hat eine eindeutige Identität, eine stabile Version und einen definierten Lebenszyklus. Es gehört zu einem Bereich (z. B. NeuroWays World, Energy Navigator, Flowisaurus) und steht in Beziehung zu anderen Knowledge Assets.

### 2.2 Was ist kein Knowledge Asset?

| Objekt | Abgrenzung |
|--------|-----------|
| **Bild / Illustration** | Eine Ausgabe des Knowledge Assets — nicht das Asset selbst. Das Bild transportiert die Bedeutung, ist aber nicht die Bedeutung. |
| **Dokument** | Ein Dokument ist eine strukturierte Zusammenstellung von Inhalten. Es kann viele Knowledge Assets referenzieren. Ein einzelnes Knowledge Asset ist kein Dokument. |
| **Methode** | Eine Methode (z. B. Energy Navigator) ist ein strukturierter Prozess. Sie kann aus vielen Knowledge Assets bestehen, ist aber selbst keines. |
| **Modul** | Ein Modul (z. B. NeuroFlow) ist eine Produkteinheit. Es verwendet Knowledge Assets, ist aber selbst kein Wissenskonzept. |
| **Datenobjekt** | Ein Datenobjekt (z. B. ein Check-in-Datensatz) ist eine Transaktion. Es speichert Ereignisse, nicht Bedeutung. |
| **Standard** | Ein Standard (wie dieser) beschreibt Regeln, kein fachliches Konzept der NeuroWays-Welt. |

### 2.3 Merkmale eines Knowledge Assets im Überblick

- Es hat eine eindeutige ID und einen stabilen Code
- Es beschreibt ein einzelnes, klar abgegrenztes Konzept
- Es enthält die fachliche Bedeutung — unabhängig von Zielgruppe oder Medium
- Es ist versioniert und unveränderlich nach Veröffentlichung
- Es hat einen definierten Geltungsbereich (Einsatzbereich und Nicht-Einsatzbereich)
- Es steht in dokumentierten Beziehungen zu anderen Knowledge Assets
- Aus ihm werden mediale Ausgaben abgeleitet — niemals ist es selbst eine Ausgabe

---

## Kapitel 3 — Aufbau

Jedes Knowledge Asset enthält mindestens folgende Felder. Fehlende Pflichtfelder verhindern die Freigabe (Status kann nicht auf `published` gesetzt werden).

### 3.1 Pflichtfelder

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `asset_id` | text | Eindeutige, stabile ID — Format: `ENV-001`, `MTH-001` (Bereich + dreistellige Nummer) |
| `name` | text | Offizieller Name des Konzepts — kurz, eindeutig, auf Deutsch |
| `short_description` | text | Max. 160 Zeichen — prägnante Zusammenfassung des Konzepts |
| `full_description` | text | Vollständige fachliche Beschreibung — zielgruppenneutral, präzise |
| `psychological_meaning` | text | Wie wirkt dieses Konzept auf Menschen? Welche inneren Zustände beschreibt es? |
| `purpose` | text | Welches Ziel verfolgt dieses Knowledge Asset? Was soll durch es erreicht werden? |
| `use_cases` | text | In welchen Kontexten ist dieses Konzept anwendbar? |
| `non_use_cases` | text | In welchen Kontexten ist dieses Konzept ausdrücklich nicht anwendbar? |
| `relations` | json | Beziehungen zu anderen Knowledge Assets (siehe Kapitel 7) |
| `version` | text | Semver — z. B. `1.0.0` |
| `status` | text | draft, review, published, superseded, archived |
| `owner` | text | Verantwortlicher Bereich oder Person |

### 3.2 Optionale Felder

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `tags` | json | Thematische Schlagworte |
| `domain` | text | Zugehöriger Bereich (z. B. `world`, `method`, `flowisaurus`) |
| `target_groups` | json | Relevante Zielgruppen |
| `related_standards` | json | Verweise auf NeuroWays-Standards |
| `media_outputs` | json | Verweise auf erzeugte Medien (Illustrationen, Texte etc.) |
| `created_at` | date | Datum der Erstellung |
| `published_at` | date | Datum der Veröffentlichung |

### 3.3 ID-Schema

```
<BEREICH>-<DREISTELLIGE_NUMMER>

ENV    → NeuroWays World (Environment)
MTH    → Methoden
FLW    → Flowisaurus
NPL    → NeuroPlay
NFL    → NeuroFlow
GEN    → Generisch / bereichsübergreifend
```

Beispiele: `ENV-001` (Die Insel), `MTH-001` (Energy Navigator), `FLW-001` (Erster Flowisaurus-Begriff)

---

## Kapitel 4 — Medien

### 4.1 Grundsatz

Medien sind niemals das Knowledge Asset selbst. Sie sind **Ausgaben** des Knowledge Assets — Ableitungen für einen bestimmten Kanal, eine bestimmte Zielgruppe oder ein bestimmtes Format.

Das Knowledge Asset kann unverändert bleiben, während seine Ausgaben sich weiterentwickeln.

### 4.2 Erlaubte Ausgabetypen

| Ausgabetyp | Beschreibung | Beispiel |
|-----------|-------------|---------|
| `illustration` | Bildliche Darstellung des Konzepts | Zonenillustration „Insel" |
| `icon` | Vereinfachtes Symbol | Zonen-Icon für Navigation |
| `animation` | Bewegte Darstellung | Wasseranimation |
| `audio` | Klangliche Entsprechung | Klanglandschaft |
| `video` | Bewegtbild-Erklärung | Erklärvideo für Workshop |
| `website_text` | Beschreibung für Webseite | Landingpage-Absatz |
| `app_text` | Kurzbeschreibung für App | Ergebnistext nach Check-in |
| `workshop_text` | Ausführliche Erklärung für Workshop | Moderationsgrundlage |
| `faq_entry` | Frage-Antwort-Paar | „Was bedeutet die Insel?" |
| `dashboard_text` | Kompakter Hinweistext | Kurztext im Verlauf |
| `presentation_text` | Folientext | Slide-Beschreibung |
| `prompt` | KI-Generierungsauftrag | Bildgenerierungsprompt (nur final, freigegeben) |
| `social_media_text` | Formulierung für soziale Medien | Instagram-Caption |
| `flowisaurus_entry` | Erklärung im Flowisaurus-Stil | Kindgerechte Erklärung |

### 4.3 Ausgaben sind versioniert

Wenn sich das Knowledge Asset ändert, erhalten alle Ausgaben eine neue Version. Bestehende Ausgaben bleiben erhalten und werden nicht automatisch aktualisiert — das erfolgt kontrolliert.

### 4.4 Ausgaben sind zielgruppenadaptiert

Dieselbe fachliche Wahrheit wird für verschiedene Zielgruppen unterschiedlich formuliert. Die Ausgabe verändert Sprache, Tiefe und Ton — niemals die Bedeutung. Bedeutungsänderungen erfordern eine neue Version des Knowledge Assets selbst.

---

## Kapitel 5 — Illustrationen

### 5.1 Wie Illustrationen aus einem Knowledge Asset entstehen

Eine Illustration entsteht nicht aus einem kreativen Impuls heraus. Sie entsteht aus der präzisen Beschreibung dessen, was ein Konzept bedeutet — in der `full_description`, der `psychological_meaning` und einer gesonderten `illustration_description`.

#### Der Ableitungsprozess

```
Knowledge Asset
  ↓ full_description
  ↓ psychological_meaning
  ↓ illustration_description
Illustrationsbriefing
  ↓ Übersetzung in Visualisierungssprache
  ↓ Prüfung gegen NW-DSN-001 (Designstandard)
  ↓ Freigabe
Prompt (gesondert gespeichert, nicht im Asset)
  ↓ Generierung / Erstellung
  ↓ Qualitätsprüfung
Illustration
  ↓ Speicherung als Asset-Datei (AST_ASSET_FILES)
  ↓ Verknüpfung mit Knowledge Asset
```

### 5.2 Illustrationsbeschreibung im Knowledge Asset

Jedes Knowledge Asset, das eine Illustration erhalten soll, enthält eine `illustration_description`:

- Was ist im Bild zu sehen? (Landschaft, Elemente, Stimmung)
- Welche Farben dominieren? (Verweis auf NW-DSN-001 Zonenfarben)
- Welches Gefühl soll das Bild auslösen?
- Was ist ausdrücklich nicht zu sehen? (kein Text, keine Personen etc.)
- Wie verhält sich dieses Bild zu anderen Illustrationen im Panorama?

Diese Beschreibung ist menschenlesbar. Sie ist keine technische Spezifikation.

### 5.3 Trennung von Beschreibung und Prompt

Die `illustration_description` im Knowledge Asset beschreibt, was sichtbar sein soll — in der Sprache der Bedeutung.

Der Prompt (gespeichert in `AST_ASSET_PROMPTS`) übersetzt diese Beschreibung in die technische Sprache eines KI-Systems. Prompts sind separate, versionierte Objekte. Sie gehören nicht in das Knowledge Asset selbst.

### 5.4 Illustrationsregeln aus NW-DSN-001

Alle Illustrationen folgen den Regeln des World Design Standards:
- Keine Personen, keine Tiere, kein Text
- Flache Vektorgrafik mit organischen Formen
- Horizont immer sichtbar
- Diffuses, weiches Licht
- Leichte Papier- oder Leinentextur (max. 8% Deckkraft)

---

## Kapitel 6 — Texte und Zielgruppenadaptation

### 6.1 Grundprinzip

Dieselbe fachliche Wahrheit wird für jede Zielgruppe in einer anderen Sprache ausgedrückt. Die Sprache ändert sich. Die Bedeutung nie.

Das Knowledge Asset enthält die zielgruppenneutrale Fachbeschreibung. Die zielgruppenspezifischen Ausgaben werden als separate Medienobjekte abgeleitet und referenziert.

### 6.2 Zielgruppenprofile

| Zielgruppe | Sprache | Tiefe | Ton |
|-----------|---------|-------|-----|
| **Kind** | Einfach, konkret, bildhaft | Oberflächlich | Warm, einladend |
| **Jugendliche** | Direkt, lebensnah | Mittel | Respektvoll, nicht condescending |
| **Erwachsener Nutzende (App)** | Klar, empathisch, knapp | Mittel | Ruhig, begleitend |
| **Mitarbeiter / Team** | Sachlich, handlungsorientiert | Mittel | Professionell, klar |
| **Führungskraft** | Kompakt, systemisch | Überblick | Respektvoll, direkt |
| **Coach / Therapeutin** | Fachlich, differenziert | Tief | Kollegial, präzise |
| **Workshop-Teilnehmende** | Erfahrungsorientiert, einladend | Mittel | Interaktiv, offen |
| **Website-Besuchende** | Ansprechend, vertrauensbildend | Einsteig | Warm, informierend |
| **KI-System** | Strukturiert, vollständig, kontextreich | Vollständig | Neutral, präzise |

### 6.3 Adaption am Beispiel „Die Insel"

**Fachbeschreibung (zielgruppenneutral, im Knowledge Asset):**
> Die Insel beschreibt einen Zustand tiefer Erschöpfung und vollständigem Rückzugs. Die verfügbare Energie ist auf ein Minimum reduziert. Regeneration steht vollständig im Vordergrund.

**Kind:**
> Manchmal ist die Batterie so leer, dass man sich ganz klein machen und einfach nur ruhen möchte. Das ist die Insel.

**App-Text (Ergebnis nach Check-in):**
> Du bist auf der Insel. Hier darfst du einfach sein — ohne Aufgaben, ohne Erwartungen.

**Coach:**
> Die Insel markiert einen Zustand maximaler Ressourcenreduktion. Intervention sollte ausschließlich stabilisierend und entlastend sein — kein Aktivierungsimpuls.

**KI-System:**
> `[ENV-001 | status: published | level: 5 | score_range: 26–30]` Zone: maximale Erschöpfung. Funktion: Schutz und Regeneration. Empfohlene Ausgabe: ruhig, entlastend, keine Handlungsaufforderung.

### 6.4 Regel: Bedeutungsidentität

Egal welche Zielgruppe, egal welches Medium — die Bedeutung des Knowledge Assets ist identisch. Wenn eine Ausgabe beginnt, die Bedeutung zu verschieben, ist das kein Adaptionsproblem, sondern ein Inhaltsproblem, das am Knowledge Asset selbst gelöst wird.

---

## Kapitel 7 — Beziehungen

Knowledge Assets existieren nicht isoliert. Sie bilden ein semantisches Netzwerk.

### 7.1 Beziehungstypen

| Beziehungstyp | Beschreibung | Beispiel |
|--------------|-------------|---------|
| `parent` | Übergeordnetes Konzept | Die Insel ist Kind von „NeuroWays Welt" |
| `child` | Untergeordnetes Konzept | Die Insel könnte Teilkonzepte wie „stilles Wasser" haben |
| `neighbor` | Benachbartes Konzept auf gleicher Ebene — oft im Übergang | Das Meer ist Nachbar der Insel |
| `reference` | Verweis auf ein anderes Asset ohne Hierarchie | Die Insel referenziert den Begriff „Regeneration" |
| `depends_on` | Dieses Asset setzt Verständnis eines anderen voraus | Die Insel setzt das Verständnis von „Energieniveaus" voraus |
| `contrasts_with` | Konzeptuell gegensätzlich | Die Insel kontrastiert mit dem Festland |
| `thematic` | Thematisch verwandt, aber keine direkte Abhängigkeit | Die Insel hat thematische Verbindung zu „Wald" (beide: schützende Räume) |

### 7.2 Beziehungsregel: keine Zyklen

Ein Knowledge Asset darf nicht sich selbst als Elternteil oder über eine Kette von `parent`-Beziehungen auf sich selbst verweisen. Zirkuläre Hierarchien sind verboten.

### 7.3 Beziehungsdarstellung im Asset

```json
{
  "relations": [
    { "type": "parent", "asset_id": "ENV-000", "label": "NeuroWays Welt" },
    { "type": "neighbor", "asset_id": "ENV-005", "label": "Das Meer" },
    { "type": "contrasts_with", "asset_id": "ENV-001a", "label": "Das Festland" },
    { "type": "thematic", "asset_id": "ENV-002", "label": "Der Wald" }
  ]
}
```

---

## Kapitel 8 — Versionierung

### 8.1 Grundprinzip

Jede Version eines Knowledge Assets ist unveränderlich nach Veröffentlichung. Änderungen an Bedeutung, Beschreibung oder Beziehungen erzeugen eine neue Version.

### 8.2 Wann entsteht eine neue Version?

| Änderungsart | Versionstyp |
|-------------|------------|
| Tippfehler, Formatierung | PATCH (x.x.1) |
| Neue optionale Ausgabe, neue Beziehung | MINOR (x.1.0) |
| Geänderte Bedeutung, geänderter Einsatzbereich | MAJOR (2.0.0) |

### 8.3 Historische Ausgaben

Ausgaben (Illustrationen, Texte), die aus einer früheren Version des Knowledge Assets entstanden sind, bleiben erhalten. Sie tragen die Version des Assets zum Zeitpunkt ihrer Entstehung. Sie werden nicht automatisch aktualisiert.

### 8.4 Verweis auf NW-STD-010

Die detaillierten Semver-Regeln, Rückwärtskompatibilitätsversprechen und Deprecation-Fristen werden im Versioning Standard (NW-STD-010) geregelt. Dieser Standard legt nur die Grundprinzipien fest.

---

## Kapitel 9 — Qualitätskriterien

### 9.1 Ein Knowledge Asset gilt als vollständig, wenn:

- [ ] Alle Pflichtfelder aus Kapitel 3.1 sind ausgefüllt
- [ ] `short_description` ist ≤ 160 Zeichen
- [ ] `full_description` ist zielgruppenneutral formuliert (kein „Sie" oder „Du")
- [ ] `psychological_meaning` beschreibt innere Zustände, nicht Verhaltensempfehlungen
- [ ] `use_cases` und `non_use_cases` sind klar voneinander abgegrenzt
- [ ] Mindestens eine Beziehung ist definiert (kein Asset steht allein)
- [ ] `owner` ist eingetragen
- [ ] Status ist korrekt gesetzt

### 9.2 Ein Knowledge Asset gilt als veröffentlichungsreif, wenn zusätzlich:

- [ ] Alle Qualitätskriterien aus 9.1 erfüllt
- [ ] `illustration_description` ist vorhanden (wenn eine Illustration geplant ist)
- [ ] Mindestens eine zielgruppenspezifische Ausgabe existiert oder ist beschrieben
- [ ] Kein Widerspruch zu anderen veröffentlichten Knowledge Assets besteht

### 9.3 Verbotene Inhalte in Knowledge Assets

- Therapeutische oder medizinische Empfehlungen
- Handlungsanweisungen (Knowledge Assets beschreiben, empfehlen nicht)
- Zielgruppenspezifische Formulierungen im Pflichtbereich `full_description`
- Prompts oder Generierungsaufträge (diese gehören in `AST_ASSET_PROMPTS`)

---

## Kapitel 10 — Referenzobjekt: ENV-001 — Die Insel

### Metadaten

| Feld | Wert |
|------|------|
| **Asset-ID** | ENV-001 |
| **Name** | Die Insel |
| **Version** | 1.0.0 |
| **Status** | draft |
| **Domain** | NeuroWays World (Environment) |
| **Owner** | NeuroWays Core |
| **Erstellt** | 2026-07-23 |

---

### Kurzbeschreibung

> Die Insel ist ein Ort des vollständigen Rückzugs. Hier ruht die Energie. Sie ist kein Ort des Scheiterns, sondern ein notwendiger Schutzraum.

*(148 Zeichen)*

---

### Fachbeschreibung

Die Insel beschreibt einen Zustand, in dem die verfügbare Energie auf ein Minimum reduziert ist. Der Organismus — ob physiologisch oder psychologisch — befindet sich in einem Modus maximalen Schutzes und minimaler Ausgabe. Jede zusätzliche Anforderung übersteigt die aktuell verfügbare Kapazität.

Dieser Zustand ist nicht pathologisch. Er ist eine natürliche, adaptive Reaktion auf anhaltende Belastung oder Erschöpfung. Der Körper und das Nervensystem schützen sich selbst, indem sie alle nicht lebensnotwendigen Aktivitäten reduzieren.

Die Insel ist der fünfte und letzte Bereich der NeuroWays-Energieskala. Sie steht am Ende einer Reise durch das Meer und ist erreichbar — aus ihr gibt es einen Weg zurück.

---

### Psychologische Bedeutung

Die Insel ist eine Metapher für den Rückzug ohne Schuldgefühl.

Für viele Menschen — besonders für neurodivergente Menschen — ist Erschöpfung mit Scham verbunden. Die Insel gibt diesem Zustand einen würdevollen Namen. Sie ist kein Versagen, kein Verlust, kein Ende. Sie ist ein Ort, an dem der Körper das tut, was er tun muss: ruhen.

Psychologisch aktiviert die Insel das parasympathische Nervensystem — den Ruhemodus. Dieser Modus ist nicht passiv. Er ist aktiv regenerativ. Ohne ihn ist keine nachhaltige Leistungsfähigkeit möglich.

Die Insel gibt Menschen, die sich in diesem Zustand befinden, ein Bild, das sie entlastet — kein Ratschlag, keine Anweisung, nur Anerkennung.

---

### Ziel

Das Knowledge Asset ENV-001 verfolgt folgendes Ziel:

Menschen, die sich in einem Zustand tiefer Erschöpfung befinden, einen würdevollen Raum zu geben — ohne Bewertung, ohne Handlungsaufforderung, ohne Optimierungsdruck.

Die Insel soll diesen Zustand sichtbar machen, benennen und normalisieren.

---

### Einsatzbereich

- Ergebnisdarstellung im Energy Navigator (Score-Bereich 26–30)
- Psychoedukative Erklärung in Workshops und Beratungen
- Selbstreflexionsunterstützung in der App
- Begleitmaterial für Coaches und Fachkräfte
- Webseiteninhalte zur Erklärung des NeuroWays-Weltmodells
- Flowisaurus-Erklärungen für breitere Zielgruppen

---

### Nicht-Einsatzbereich

- Nicht geeignet zur Diagnose von Erschöpfungszuständen
- Nicht geeignet als therapeutische Empfehlung
- Nicht geeignet zur Bewertung oder Beurteilung einer Person
- Nicht als Einladung zur dauerhaften Passivität — die Insel ist ein Zustand, kein Lebensstil
- Keine Verwendung in Kontexten, in denen Handlungsdruck erzeugt werden soll

---

### Beziehungen

```json
{
  "relations": [
    { "type": "parent", "asset_id": "ENV-000", "label": "NeuroWays Welt" },
    { "type": "neighbor", "asset_id": "ENV-004", "label": "Das Meer" },
    { "type": "contrasts_with", "asset_id": "ENV-001a", "label": "Das Festland" },
    { "type": "thematic", "asset_id": "ENV-002", "label": "Der Wald (schützender Raum)" },
    { "type": "depends_on", "asset_id": "GEN-001", "label": "Energieniveaus (Basiskonzept)" }
  ]
}
```

---

### Zielgruppenspezifische Ausgaben

#### Websitebeschreibung

> **Die Insel — Rückzug als Schutz**
>
> Es gibt Momente, in denen die Energie auf null gesunken ist. Die Insel ist der Name für diesen Ort. Kein schlechter Ort — ein notwendiger. Wer sich auf der Insel befindet, hat seinen Körper dabei, Kraft zu sammeln. Hier ist kein Handeln gefragt. Nur Sein.
>
> Die Insel ist der fünfte Bereich im NeuroWays Energy Navigator. Sie steht am Ende einer Reise durch wechselnde Energiezustände — und sie hat einen Ausgang.

---

#### App-Beschreibung (Ergebnistext nach Check-in)

> **Du bist auf der Insel.**
>
> Deine Energie ist gerade sehr niedrig. Das ist keine Botschaft, die etwas von dir verlangt. Sie ist eine Einladung, einfach zu sein — ohne Plan, ohne Leistung.
>
> Rückzug ist jetzt sinnvoll. Was auch immer warten kann, darf warten.

---

#### Workshop-Beschreibung (Moderationstext für Fachkräfte)

> **Die Insel — Moderationsgrundlage**
>
> Die Insel beschreibt den Zustand vollständiger Ressourcenreduktion. Im Workshop-Kontext ist es wichtig, diesen Bereich ohne Bewertung einzuführen. Teilnehmende in diesem Zustand befinden sich oft in einer vulnerablen Situation und reagieren sensibel auf Optimierungsimpulse.
>
> Empfohlene Moderationssprache: Anerkennend, nicht aktivierend. „Es ist richtig, dass du das erkennst." Keine Ratschläge, keine Handlungsempfehlungen — außer auf expliziten Wunsch.
>
> Mögliche Reflexionsfrage für die Gruppe: „Was haben Sie in Momenten tiefer Erschöpfung gebraucht, das Sie sich vielleicht nicht erlaubt haben zu nehmen?"

---

#### Flowisaurus-Erklärung

> **Was ist die Insel?**
>
> Stell dir vor, dein Akku ist fast leer — so leer, dass selbst das Laden Energie kostet. Die Insel ist dieser Moment. Du bist auf einer kleinen, ruhigen Insel. Das Wasser um dich herum ist still. Es ist leise.
>
> Auf der Insel muss man nichts tun. Man darf einfach liegen, schauen, atmen. Das Meer hat dich hergebracht, aber irgendwann wird es auch wieder weg tragen — zu neuen Ufern.
>
> Jeder Mensch besucht manchmal die Insel. Das ist ganz normal.

---

#### Dashboard-Text (Kurztext im Verlauf der App)

> Insel · Score 26–30 · Rückzug und Regeneration stehen im Vordergrund.

---

#### Illustrationsbeschreibung

> Eine kleine Insel im ruhigen, stillen Wasser. Ein einzelner Baum in der Mitte der Insel — er ist alt, ruhig, fest verwurzelt. Das Wasser um die Insel spiegelt den Himmel: weich, fast weiß, kaum Farbe. Leichter Morgennebel liegt über dem Wasser — kein Dunkel, aber Stille. Die Farbstimmung ist violett-grau mit warmen Lichttupfern. Kein Horizont im Vordergrund, aber in der Ferne sichtbar. Keine Personen, keine Tiere, kein Text. Das Bild soll Geborgenheit vermitteln — nicht Verlassenheit.
>
> Stilistische Referenz: NW-DSN-001 (Zone Insel, Zonenfarbe #8b6f9e, Hintergrundfläche #f3eff7). Illustrationsstil: flache Vektorgrafik, organische Formen, leichte Papier-Textur.

---

## Kapitel 11 — Roadmap

### 11.1 Wie alle NeuroWays-Systeme auf dieselbe Wissensbasis zugreifen

Das Knowledge Asset System bildet den gemeinsamen Kern aller NeuroWays-Produkte. Alle Systeme lesen Bedeutung aus Knowledge Assets — und erzeugen daraus Ausgaben für ihren eigenen Kontext.

```
Knowledge Assets (zentrale Wissensbasis)
│
├── NeuroWays World (NW-DSN-001)
│     → Illustrationen, Icons, Animationen aus ENV-* Assets
│
├── Methoden (Energy Navigator, zukünftige Methoden)
│     → Fragen, Ergebnistexte, Zonen aus MTH-* und ENV-* Assets
│
├── App (NeuroWays Energy Navigator)
│     → Ergebnistexte, Bereichsbeschreibungen, Check-in-Ausgaben
│
├── Flowisaurus
│     → Erklärungen für breite Zielgruppen aus allen Assets
│     → Flowisaurus-Ausgabetyp: angepasste Sprache, niedrige Komplexität
│
├── NeuroPlay
│     → Interaktive Inhalte aus NPL-* und ENV-* Assets
│     → Spielerische Zielgruppenausgaben
│
├── NeuroFlow
│     → Ablaufbasierte Inhalte aus NFL-* Assets
│     → Schrittweise Adaptionen des Wissens
│
├── Website
│     → Websitebeschreibungen aus allen Assets
│     → SEO-optimierte Ausgaben (zukünftig)
│
├── Workshops und Präsentationen
│     → Workshop-Texte, Folientexte aus allen Assets
│     → Moderationsgrundlagen für Fachkräfte
│
└── KI-Systeme (zukünftig)
      → Vollständige Asset-Daten als strukturierter Kontext
      → Zielgruppenspezifische Ausgabegenerierung
```

### 11.2 Technische Umsetzung (Ausblick)

Die technische Umsetzung folgt dem Database Standard (NW-STD-003). Knowledge Assets werden als Masterdaten-Objekte modelliert: stabiler Business Code, Versionierung, klare Beziehungen.

Die Ausgaben werden als `MTH_ASSET_OUTPUTS` (oder ähnlich nach NW-STD-001) gespeichert und referenzieren das Quell-Knowledge-Asset mit dessen Version.

### 11.3 Erweiterbarkeit

Neue NeuroWays-Produkte (z. B. ein zukünftiges NeuroParent oder NeuroWork) erweitern das Knowledge Asset System durch:
- Neue Bereichspräfixe (z. B. `NPR-` für NeuroParent)
- Neue Ausgabetypen
- Neue Zielgruppenprofile

Der Kern — die Knowledge Assets selbst — bleibt unverändert.

---

## Kapitel 12 — Kritische Selbstbewertung

### Stärken dieses Standards

- Klares, einfaches Grundkonzept: eine Wahrheit, viele Ausgaben
- Vollständiges Referenzobjekt (ENV-001) zeigt das System in der Praxis
- Plattformunabhängig formuliert
- Abgrenzung zu Dokumenten, Bildern, Methoden und Datenobjekten klar
- Beziehungsmodell skaliert zu einem vollständigen Wissensnetzwerk
- Qualitätskriterien sind prüfbar

### Fehlende Bestandteile — NeuroWays kann noch nicht vollständig aus einer einzigen Quelle liefern

**1. Kein Datenbankmodell**
Der Standard beschreibt Knowledge Assets fachlich. Die technische Speicherung (Collections, Felder, Beziehungstabellen) ist noch nicht definiert. Ohne Datenbankmodell sind Knowledge Assets nur Dokumente, keine maschinenlesbaren Wissensquellen. → NW-STD-003 v1.1.0 + Implementierungsdokument.

**2. Kein Ausgabe-Generierungsmodell**
Der Standard beschreibt, welche Ausgaben existieren können. Er beschreibt nicht, wie Ausgaben automatisch aus Assets generiert werden — weder durch KI noch durch Template-Systeme. → NW-KAS-002 (geplant).

**3. Keine API-Spezifikation für Knowledge Assets**
Ein System, das Knowledge Assets maschinell liest (z. B. eine KI, die Ausgaben generiert), braucht eine API. Diese ist noch nicht definiert. → NW-STD-011 (API Standard).

**4. Keine Mehrsprachigkeit**
Der Standard ist auf Deutsch verfasst und beschreibt Assets auf Deutsch. NeuroWays könnte mehrsprachig werden. Wie Knowledge Assets in mehreren Sprachen gepflegt werden, ist nicht beschrieben. → NW-KAS-001 v1.1.0.

**5. Kein Vollständiges Knowledge Asset Network**
ENV-001 (Die Insel) ist ausgearbeitet. Die anderen vier Zonen (Festland, Wald, Küste, Meer) fehlen noch als vollständige Knowledge Assets. Das Netzwerk ist erst tragfähig, wenn alle Primärobjekte ausgearbeitet sind. → Nächster Inhaltschritt: ENV-001 bis ENV-005.

**6. Keine Zugriffsrechte**
Wer darf Knowledge Assets lesen? Erstellen? Freigeben? Das Rechtemodell fehlt. → NW-GOV-001 + NW-STD-012.

### Gesamtbewertung

**Der Standard ist ausreichend, um das Knowledge Asset System zu beginnen und erste Assets zu erstellen.**

Er ist noch nicht ausreichend, um vollautomatisch aus einer Quelle sämtliche Ausgaben zu generieren. Dafür fehlen Datenbankmodell, Generierungsmodell und API. Diese Lücken sind bekannt, dokumentiert und für Folgeschritte eingeplant.

Der Standard reicht bereits jetzt dafür aus:
- Knowledge Assets manuell zu erstellen (als strukturierte Dokumente)
- Ausgaben daraus abzuleiten
- Das Wissen konsistent über mehrere Kanäle zu verteilen
- Neue Knowledge Assets nach demselben Schema zu entwickeln

---

## Definitionen

| Begriff | Definition |
|---------|-----------|
| **Knowledge Asset** | Die kleinste vollständige, wiederverwendbare Wissenseinheit in NeuroWays |
| **Ausgabe** | Ein Medium, das aus einem Knowledge Asset abgeleitet wird (Illustration, Text, Prompt etc.) |
| **Adaptierung** | Die zielgruppenspezifische Formulierung einer Ausgabe — ohne die Bedeutung zu verändern |
| **Bedeutungsidentität** | Das Prinzip, dass alle Ausgaben eines Knowledge Assets dieselbe fachliche Bedeutung transportieren |
| **Wissensnetzwerk** | Die Gesamtheit aller Knowledge Assets und ihrer Beziehungen |
| **Primärobjekt** | Ein Knowledge Asset ohne übergeordnetes Asset — der Ausgangspunkt eines Bereichs |

---

## Ausnahmen

Keine Ausnahmen bei Erstveröffentlichung.

---

## Qualitätsprüfung

| Kriterium | Bestanden |
|-----------|-----------|
| Alle 12 Kapitel vorhanden und ausformuliert | ✅ |
| Referenzobjekt ENV-001 vollständig | ✅ |
| Klare Abgrenzung zu anderen Objekttypen | ✅ |
| Beziehungsmodell beschrieben | ✅ |
| Qualitätskriterien prüfbar | ✅ |
| Plattformunabhängig formuliert | ✅ |
| Kritische Selbstbewertung mit fehlenden Bausteinen | ✅ |
| Noch kein Prompt, kein Bild, keine Implementierung | ✅ |

---

*NW-KAS-001 — NeuroWays Knowledge Asset Standard v1.0.0 — Status: draft — zur Prüfung vorgelegt — 2026-07-23*

┌─────────────────────────────────────────────────
│ ./NW-PKG-001_MODULE_VERSION_PACKAGE_MODEL.md
└─────────────────────────────────────────────────
# NW-PKG-001 — NeuroWays Module, Version & Package Model

**Dokumentcode:** NW-PKG-001  
**Version:** v0.1.0  
**Status:** development  
**Erstellt:** 2026-07-23  
**Gültig ab:** nach Freigabe  
**Verantwortlich:** NeuroWays Core  
**Hierarchie:** Plattform-Spezifikation — referenziert NW-STD-003, NW-IDENTITY-001 normativ  
**Ablöst:** –

---

## Änderungsverlauf

| Version | Datum | Änderung | Autor |
|---------|-------|----------|-------|
| v0.1.0 | 2026-07-23 | Erstfassung — vollständiges Grundmodell | NeuroWays Core |

---

## Referenzen

| Dokument | Art |
|---------|-----|
| NW-STD-000 — Standards Framework | normativ |
| NW-STD-001 — Naming Standard | normativ |
| NW-STD-003 — Database Standard | normativ |
| NW-IDENTITY-001 — Identity & Membership Specification | normativ |
| NW-IDENTITY-POC-001 — Proof of Identity (bestanden) | informativ |
| Projektinventur 2026-07-23 (35 Dateien, vollständig) | informativ |

---

## Technologischer Ausgangspunkt

Das beschriebene System besteht aus:

| Dateityp | Beispiele |
|---------|---------|
| JSX | React-Komponenten, Seiten |
| JS (ESM) | Logik-Module, Bibliotheken |
| CSS | Globales Stylesheet |
| HTML | App-Shell |
| JSON | Paketkonfiguration |
| SVG | Favicon, Icons |
| CJS | Tailwind-Konfiguration |
| Markdown | Dokumentation |

Alle Dateien sind Textdateien. Für den ersten POC sind keine Binärdateien erforderlich.

---

## Kapitel 1 — Grundbegriffe

Die folgenden Begriffe sind scharf voneinander getrennt. Sie dürfen innerhalb dieses Standards und aller abgeleiteten Systeme nicht synonym verwendet werden.

### Produkt

Das übergeordnete Softwareprodukt, das ausgeliefert werden kann. NeuroWays ist ein Produkt. Ein Produkt besteht immer aus einer Basis und null oder mehr optionalen Modulen.

### Basis

Die zwingend enthaltene Kernplattform eines Produkts. Die Basis ist nicht optional. Jedes Paket enthält genau eine Basisversion. Die Basis ist kein Modul — sie ist ein eigenständiger Produkttyp mit eigenem Versionierungskreis.

Aktuell: NeuroWays Core Platform

### Modul

Eine in sich geschlossene, optional hinzufügbare Funktionseinheit. Ein Modul kann eine eigene Datenbanklogik, UI-Seiten, Komponenten und Konfigurationen enthalten. Module sind versioniert und können miteinander oder mit der Basis inkompatibel sein.

Aktuell: Energy Navigator

### Modulversion

Ein unveränderlicher, vollständig beschriebener Zustand eines Moduls zu einem bestimmten Zeitpunkt. Eine Modulversion enthält alle Dateien, die für die Installation dieses Moduls erforderlich sind, sowie Metadaten über Abhängigkeiten und Kompatibilität.

Eine Modulversion ist nach Veröffentlichung unveränderlich.

### Datei

Eine einzelne benannte Ressource mit Pfad, Inhalt und Metadaten. Eine Datei gehört zu genau einer Modulversion oder Basisversion. Ihr Inhalt ist vollständig in der Datenbank gespeichert.

### Dateiversion

Eine Datei hat keine eigene Versionsnummer. Änderungen an einer Datei führen zur Erstellung einer neuen Modulversion, die eine neue Datei mit dem geänderten Inhalt enthält. Eine Datei ist immer genau einer Modulversion zugeordnet und teilt deren Unveränderlichkeit.

### Abhängigkeit

Eine Bedingung, die erfüllt sein muss, damit ein Modul korrekt installiert und betrieben werden kann. Abhängigkeiten können auf Basisversionen, andere Module oder Versionsbereiche zeigen.

### Paketdefinition

Die vom Benutzer zusammengestellte Auswahl aus Basisversion und optionalen Modulversionen. Eine Paketdefinition beschreibt *was* ein Paket enthalten soll. Sie ist veränderlich, solange sie den Status DRAFT trägt.

Eine Paketdefinition ist keine ausführbare Datei und kein installiertes System.

### Paket

Umgangssprachlich: die Kombination aus Paketdefinition und mindestens einem erfolgreich abgeschlossenen Build. In diesem Standard wird Paket nicht als eigener technischer Begriff verwendet — stattdessen werden Paketdefinition, Build und Artefakt klar getrennt.

### Paketversion

Nicht verwendet. Eine Paketdefinition kann mehrere Builds produzieren. Die Versionierung findet auf Ebene der Basis und der Module statt, nicht auf Ebene der Paketdefinition.

### Build

Der konkrete technische Vorgang, bei dem eine Paketdefinition in ein Artefakt umgewandelt wird. Ein Build ist ein eigenständiges Objekt: er hat einen Startzeitpunkt, einen Endzeitpunkt, einen Status und ein Protokoll.

Ein Build verändert niemals die Paketdefinition.

### Build-Artefakt

Das Ergebnis eines erfolgreichen Builds. Ein Artefakt ist eine vollständige, installierbare Einheit mit einer Prüfsumme. Es kann mehrere Artefakte zu einer Paketdefinition geben (aus verschiedenen Builds).

Ein Artefakt ist unveränderlich.

### Installation

Der Vorgang, bei dem ein Build-Artefakt in ein Zielsystem übertragen und dort zur Laufzeit bereitgestellt wird. Die Installation ist außerhalb des Build-Systems — sie liegt beim Empfänger des Artefakts.

In diesem POC wird die Installation noch nicht implementiert.

### Upgrade

Der Vorgang, bei dem ein bereits installiertes Paket durch ein neueres Artefakt ersetzt wird, ohne den vollständigen Inhalt neu einzuspielen. Upgrades setzen ein Diff-Modell oder eine Migrationsstrategie voraus.

In diesem POC noch nicht implementiert.

---

## Kapitel 2 — Basisplattform

### 2.1 Was ist die Basis?

Die Basis ist die NeuroWays Core Platform — der nicht abwählbare Kern jedes Pakets. Sie enthält alle Dateien, die für den Betrieb einer funktionsfähigen NeuroWays-Instanz mindestens erforderlich sind.

Aktuelle Bestandteile (aus der Projektinventur):

| Datei | Funktion |
|-------|---------|
| `index.html` | Application Shell |
| `src/main.jsx` | React-Einstiegspunkt |
| `src/App.jsx` | Router (zentrale Routenliste) |
| `src/index.css` | Globales Stylesheet |
| `src/lib/pb.js` | Geteilter Backend-Client |
| `src/lib/identity.js` | Authentifizierungslogik |
| `src/components/Nav.jsx` | Navigation |
| `public/favicon.svg` | Favicon |
| `package.json` | Paketdefinition |
| `vite.config.js` | Build-Konfiguration |
| `tailwind.config.cjs` | CSS-Konfiguration |

**Nicht in der Basis** (gehören zum Modul Energy Navigator):

`engine.js`, `ZoneCard.jsx`, `ZoneIcon.jsx`, alle `pages/*.jsx` außer IdentityPoc

### 2.2 Wie wird die Basis versioniert?

Die Basis wird nach Semver versioniert, unabhängig von Modulversionen.

Aktuelle Basis: `NW-CORE v0.1.0` (development)

Eine neue Basisversion entsteht, wenn:
- eine gemeinsame Komponente (Nav, pb.js, identity.js) geändert wird
- das Build-System geändert wird
- die App-Shell verändert wird

Neue Basisversionen blockieren nicht automatisch bestehende Modulversionen — Kompatibilität wird explizit angegeben.

### 2.3 Ist die Basis ein Modul?

**Nein.** Die Basis ist ein eigenständiger Produkttyp mit eigenem Versionierungskreis. Sie verhält sich nicht wie ein Modul. Gründe:

- Sie kann nicht abgewählt werden
- Sie ist die Installationsgrundlage aller anderen Module
- Sie enthält systemkritische Dateien, die kein Modul überschreiben darf
- Sie hat ihren eigenen Kompatibilitätsgraph

### 2.4 Wie wird verhindert, dass ein Paket ohne Basis entsteht?

Strukturell: Eine Paketdefinition enthält immer genau ein Pflichtfeld `base_version_id`. Dieses Feld ist nicht nullable, nicht default-befüllbar. Ohne gültigen Verweis auf eine veröffentlichte Basisversion kann kein Build gestartet werden.

Logisch: Der Generator prüft als ersten Schritt, ob `base_version_id` auf eine existierende, veröffentlichte Basisversion zeigt. Schlägt diese Prüfung fehl, bricht der Build sofort ab.

---

## Kapitel 3 — Optionale Module

### 3.1 Modulattribute

| Attribut | Typ | Pflicht | Beschreibung |
|---------|-----|---------|--------------|
| `module_id` | UUID | ✅ | Unveränderlicher Primärschlüssel |
| `module_code` | text | ✅ | Stabiler Business-Code (z. B. `ENERGY_NAVIGATOR`) |
| `name` | text | ✅ | Anzeigename |
| `description` | text | ✅ | Beschreibung für den Paketkonfigurator |
| `category` | text | ✅ | `METHOD`, `DASHBOARD`, `TOOL`, `INTEGRATION` etc. |
| `status` | text | ✅ | Modulstatus (siehe 3.2) |
| `current_version` | text | – | Aktuell aktive Version (Verweis) |
| `install_order` | number | ✅ | Reihenfolge relativ zu anderen Modulen |
| `created_at` | datetime | ✅ | – |
| `updated_at` | datetime | ✅ | – |

### 3.2 Versionsstatus eines Moduls

| Status | Bedeutung |
|--------|-----------|
| `DEVELOPMENT` | Wird gerade entwickelt, kann instabil sein |
| `PUBLISHED` | Aktiv und für Paketauswahl verfügbar |
| `DEPRECATED` | Noch verwendbar, Ablösung angekündigt |
| `LOCKED` | Keine neuen Pakete mit dieser Version, bestehende laufen weiter |
| `ARCHIVED` | Nicht mehr verwendbar, historisch erhalten |

### 3.3 Referenzmodul: Energy Navigator

| Attribut | Wert |
|---------|------|
| `module_code` | `ENERGY_NAVIGATOR` |
| `name` | Energy Navigator |
| `category` | `METHOD` |
| `status` | `DEVELOPMENT` (noch nicht formal veröffentlicht) |
| `install_order` | 10 |

Zugehörige Dateien (aktuell verteilt):

```
src/lib/engine.js              → Logik (in Modulordner zu verschieben)
src/components/ZoneCard.jsx    → UI-Komponente
src/components/ZoneIcon.jsx    → UI-Komponente
src/pages/Home.jsx             → Seite
src/pages/CheckIn.jsx          → Seite
src/pages/Result.jsx           → Seite
src/pages/History.jsx          → Seite
src/pages/Privacy.jsx          → Seite
```

---

## Kapitel 4 — Modulversionen

### 4.1 Pflichtattribute einer Modulversion

| Attribut | Typ | Pflicht | Beschreibung |
|---------|-----|---------|--------------|
| `version_id` | UUID | ✅ | Unveränderlicher Primärschlüssel |
| `module_id` | UUID | ✅ | Verweis auf das Modul |
| `version` | text | ✅ | Semver-Versionsnummer |
| `status` | text | ✅ | Versionsstatus |
| `published_at` | datetime | – | Gesetzt bei Veröffentlichung |
| `changelog` | text | ✅ | Beschreibung der Änderungen |
| `compatible_base_versions` | json | ✅ | Semver-Bereiche der Basisversionen |
| `requires_modules` | json | – | Abhängige Module mit Versionsbereichen |
| `install_order` | number | ✅ | Innerhalb der Modulsammlung |
| `created_by` | UUID | ✅ | Ersteller |
| `created_at` | datetime | ✅ | Erstellungszeitpunkt |

### 4.2 Versionsstatus

| Status | Bedeutung | Fachliche Inhalte änderbar? |
|--------|-----------|---------------------------|
| `DRAFT` | In Entwicklung | ✅ ja |
| `REVIEW` | Zur Prüfung | ⚠️ nur Korrekturen |
| `PUBLISHED` | Aktiv, in Paketen verwendbar | ❌ nein |
| `DEPRECATED` | Verwendbar, Ablösung angekündigt | ❌ nein |
| `WITHDRAWN` | Zurückgezogen, nicht mehr verwendbar | ❌ nein |
| `ARCHIVED` | Historisch erhalten | ❌ nein |

### 4.3 Semantische Versionierung

```
MAJOR.MINOR.PATCH

MAJOR: Inkompatible Änderung (andere Basisversion nötig, API geändert)
MINOR: Neue Funktionen, rückwärtskompatibel
PATCH: Fehlerbehebungen, keine neuen Funktionen
```

### 4.4 Lebenszyklusregeln

**Entwurf:** Alle Felder veränderbar, keine Pakete damit erstellt (außer DEVELOPMENT-Paketen).

**Veröffentlichung:** Status → PUBLISHED, `published_at` gesetzt. Danach: Inhalt unveränderlich. Nur Verwaltungsfelder (Status, Nachfolger) änderbar.

**Korrektur:** Erzeugt immer eine neue PATCH-Version. Die korrigierte Version wird WITHDRAWN oder DEPRECATED, nicht überschrieben.

**Neue Version:** Neue Minor- oder Major-Version entsteht durch einen neuen `module_versions`-Eintrag. Alte Version bleibt erhalten.

**Zurückziehen:** Status → WITHDRAWN. Bestehende Pakete mit dieser Version bleiben gültig, können aber nicht neu erstellt werden.

---

## Kapitel 5 — Dateien und Dateiinhalte

### 5.1 Dateiobjekt-Attribute

| Attribut | Typ | Pflicht | Beschreibung |
|---------|-----|---------|--------------|
| `file_id` | UUID | ✅ | Unveränderlicher Primärschlüssel |
| `version_id` | UUID | ✅ | Verweis auf Modulversion oder Basisversion |
| `version_type` | text | ✅ | `BASE` oder `MODULE` |
| `relative_path` | text | ✅ | Pfad im Zielprojekt, z. B. `src/lib/engine.js` |
| `file_name` | text | ✅ | Dateiname ohne Pfad |
| `file_extension` | text | ✅ | Erweiterung ohne Punkt: `jsx`, `js`, `css` |
| `mime_type` | text | ✅ | z. B. `text/javascript`, `text/css` |
| `category` | text | ✅ | Kategorie (siehe 5.2) |
| `is_binary` | bool | ✅ | `false` für alle aktuellen Dateien |
| `content` | text (long) | ✅ | Vollständiger Dateiinhalt (UTF-8) |
| `encoding` | text | ✅ | `utf-8` |
| `file_size` | number | ✅ | Bytes |
| `checksum` | text | ✅ | SHA-256 des Inhalts |
| `install_order` | number | ✅ | Reihenfolge innerhalb der Version |
| `status` | text | ✅ | `active`, `superseded` |
| `created_at` | datetime | ✅ | – |

### 5.2 Dateikategorien

| Kategorie | Beispiele |
|-----------|---------|
| `SOURCE` | `.jsx`, `.js`, `.ts` — Quellcode |
| `CONFIG` | `vite.config.js`, `tailwind.config.cjs`, `package.json` |
| `STYLE` | `.css` |
| `ASSET` | `.svg`, `.png`, `.woff2` |
| `DATA` | `.json` (Datendateien, nicht Konfiguration) |
| `BUILD` | `.gitignore`, `.platform-deps`, `server.js` |
| `DOCUMENTATION` | `.md` |
| `GENERATED` | `dist/`, automatisch erzeugte Dateien |

### 5.3 Textspeicherung

Alle aktuellen Dateien sind Textdateien (UTF-8). Der vollständige Inhalt wird im Feld `content` gespeichert. Kein Encoding, keine Kompression im Datenbankfeld selbst — der Rohinhalt ist direkt lesbar.

### 5.4 Binärdateispeicherung (Vorbereitung)

Wenn später Binärdateien (Bilder, Schriften) in Modulversionen eingebunden werden:
- `is_binary = true`
- `content` enthält Base64-encodierten Inhalt
- `encoding = "base64"`
- Oder: `content` enthält leer, stattdessen `file_reference` auf externen Speicher (z. B. `/static/<filename>`)

Für den POC: nur Textdateien, kein Base64.

### 5.5 Duplikaterkennung

Zwei Dateien gelten als identisch, wenn ihre `checksum` (SHA-256) übereinstimmt. Das System prüft bei der Paketgenerierung nicht auf identischen Inhalt, sondern auf Pfadkonflikte. Inhaltliche Duplikate mit verschiedenen Pfaden sind erlaubt.

### 5.6 Pfadkonflikte

Zwei Dateien mit demselben `relative_path` aus verschiedenen Modulen oder aus Modul und Basis erzeugen einen Pfadkonflikt. Das Verhalten ist konfigurierbar:

| Strategie | Beschreibung |
|-----------|-------------|
| `FAIL` | Build schlägt fehl, Fehler im Protokoll (Standard) |
| `BASE_WINS` | Basisdatei überschreibt Moduldatei |
| `MODULE_WINS` | Moduldatei überschreibt Basisdatei |
| `MERGE_APPEND` | Nur für bestimmte Dateitypen (z. B. Routen-Register) |

Für den POC: `FAIL` — kein Konflikt darf unbemerkt bleiben.

### 5.7 Ausschluss von Geheimnissen

Verboten in Dateiinhalten:
- Passwörter, API-Keys, Tokens
- Private Keys
- `.env`-Dateien mit gesetzten Werten (leere `.env.example` erlaubt)
- Verbindungsstrings mit Credentials

Der Generator prüft vor dem Speichern einer neuen Dateiversionen eine Negativliste von Mustern (z. B. `PASSWORD=`, `SECRET=`, `TOKEN=`, `-----BEGIN`). Treffer blockieren das Speichern mit einem Fehlerbericht.

---

## Kapitel 6 — Abhängigkeiten

### 6.1 Abhängigkeitsobjekt

| Attribut | Typ | Beschreibung |
|---------|-----|--------------|
| `dep_id` | UUID | Primärschlüssel |
| `source_type` | text | `BASE_VERSION` oder `MODULE_VERSION` |
| `source_id` | UUID | Verweis auf die abhängige Version |
| `target_type` | text | `BASE` oder `MODULE` |
| `target_code` | text | Business-Code des Ziels |
| `min_version` | text | Semver-Untergrenze (inklusiv) |
| `max_version` | text | Semver-Obergrenze (exklusiv, optional) |
| `is_required` | bool | `true` = zwingend, `false` = optional |
| `conflict_rule` | text | `NONE`, `INCOMPATIBLE_WITH` |
| `install_order` | number | Reihenfolge der Abhängigkeitsauflösung |

### 6.2 Validierungsregeln bei der Paketerstellung

Der Generator prüft in dieser Reihenfolge:

1. **Basisversion vorhanden?** — Pflicht, Build schlägt ohne Basis fehl
2. **Alle zwingenden Abhängigkeiten erfüllt?** — Fehlende Pflichtmodule → Build-Fehler
3. **Alle Versionen kompatibel?** — Versionsbereiche geprüft
4. **Pfadkonflikte?** — Alle Dateipfade gesammelt, Duplikate gesucht
5. **Verbotene Kombinationen?** — `INCOMPATIBLE_WITH`-Regeln geprüft
6. **Geheimnis-Scan?** — Dateiinhalte auf verbotene Muster geprüft

---

## Kapitel 7 — Paketkonfigurator (UI-Modell)

### 7.1 Benutzerführung

Der Konfigurator ist eine dreistufige Oberfläche:

**Stufe 1 — Basisauswahl:**
- Verfügbare Basisversionen anzeigen (eine zur Zeit: NW-CORE v0.1.0)
- Immer vorausgewählt, nicht abwählbar
- Versionsnummer und Beschreibung sichtbar

**Stufe 2 — Modulauswahl:**
- Alle verfügbaren Module als Karten
- Pro Karte: Name, Beschreibung, Kategorie, verfügbare Versionen, Kompatibilitätsstatus
- Versionsauswahl per Dropdown (Standard: neueste kompatible)
- Abhängigkeiten werden automatisch mitgewählt und als "erforderlich" markiert
- Inkompatible Module werden grau dargestellt mit Begründung

**Stufe 3 — Zusammenfassung und Bestellen:**
- Vollständige Liste aller ausgewählten Versionen
- Bestellen-Button → startet Build
- Paket kann mit Namen versehen werden

### 7.2 Paketdefinitions-Statuswerte

| Status | Bedeutung |
|--------|-----------|
| `DRAFT` | Benutzer konfiguriert noch |
| `VALIDATING` | System prüft Kompatibilität |
| `READY` | Bereit für Build-Auslösung |
| `BUILDING` | Build läuft |
| `COMPLETED` | Build erfolgreich, Artefakt verfügbar |
| `FAILED` | Build fehlgeschlagen |
| `ARCHIVED` | Vom Benutzer archiviert |

### 7.3 Unveränderlichkeit der Bestellung

Sobald ein Build gestartet wird (Status → `BUILDING`), ist die Paketdefinition eingefroren. Korrekturen erfordern eine neue Paketdefinition (Kopie mit angepassten Versionen).

---

## Kapitel 8 — Paketdefinition, Build und Artefakt

### 8.1 Paketdefinition

```
package_definitions
  id              UUID        Primärschlüssel
  user_id         UUID        Eigentümer (aus users)
  name            text        Benutzervergebener Name
  description     text        Optional
  base_version_id UUID        Pflicht — gewählte Basisversion
  status          text        DRAFT | VALIDATING | READY | BUILDING | COMPLETED | FAILED | ARCHIVED
  created_at      datetime
  updated_at      datetime

package_definition_items
  id              UUID
  definition_id   UUID        → package_definitions
  module_code     text        Business-Code des Moduls
  module_version  text        Gewählte Semver-Version
  is_required     bool        true = durch Abhängigkeit erzwungen
  created_at      datetime
```

### 8.2 Build

```
builds
  id              UUID
  definition_id   UUID        → package_definitions
  build_number    number      Fortlaufend pro Paketdefinition (1, 2, 3 …)
  started_at      datetime
  completed_at    datetime
  status          text        QUEUED | RUNNING | COMPLETED | FAILED
  used_versions   json        Snapshot: alle verwendeten Versionen zum Build-Zeitpunkt
  checksum        text        SHA-256 des Artefakts
  error_message   text        Leer bei Erfolg
```

### 8.3 Build-Artefakt

```
build_artifacts
  id              UUID
  build_id        UUID        → builds
  file_name       text        z. B. nw-pkg-energy-nav-20260723-001.json
  format          text        MANIFEST_JSON | ZIP | TAR_GZ
  content         text/blob   Vollständiger Artefaktinhalt (oder Speicherreferenz)
  file_size       number      Bytes
  checksum        text        SHA-256
  created_at      datetime
```

### 8.4 Build-Protokoll

```
build_logs
  id              UUID
  build_id        UUID
  level           text        INFO | WARN | ERROR
  step            text        LOAD_BASE | LOAD_MODULES | CHECK_DEPS | CHECK_PATHS | MERGE | GENERATE | STORE
  message         text
  created_at      datetime
```

---

## Kapitel 9 — Benutzerspeicherung und Datenisolation

### 9.1 Grundsatz

Jede `package_definitions`-Entität trägt eine `user_id`. Die Datenbankzugriffsregel lautet:

```
listRule:   user_id = @request.auth.id
viewRule:   user_id = @request.auth.id
createRule: @request.auth.id != ""
updateRule: user_id = @request.auth.id && status = "DRAFT"
deleteRule: null  (kein Hard-Delete)
```

### 9.2 Was der Benutzer sieht

- Eigene Paketdefinitionen mit Status, Name, ausgewählten Modulen
- Eigene Builds zu jeder Paketdefinition
- Eigene Artefakte pro Build
- Build-Protokolle eigener Builds

### 9.3 Was kein Benutzer sieht

- Paketdefinitionen anderer Benutzer
- Builds anderer Benutzer
- Artefakte anderer Benutzer

Öffentliche Daten (gelesen ohne Benutzerauthentifizierung):
- Modul-Katalog (`modules`, `module_versions`) — lesbar für alle
- Basis-Katalog (`base_versions`) — lesbar für alle
- Dateiinhalte (`version_files`) — lesbar für alle (kein Geheimnis)

### 9.4 Identitätsgrundlage

Datenisolation basiert auf der in NW-IDENTITY-POC-001 (14/14 Tests bestanden) validierten Identitätsschicht: `user_id = @request.auth.id` in Collection-Regeln, JWT aus `pb.authStore`.

---

## Kapitel 10 — Generierungslogik

### 10.1 Fachlicher Ablauf

```
Schritt 1: Basisversion laden
  → base_versions WHERE id = definition.base_version_id
  → Prüfen: status = PUBLISHED

Schritt 2: Basisdateien laden
  → version_files WHERE version_id = base_version.id
  → Sortieren nach install_order

Schritt 3: Modulversionen laden
  → Für jedes package_definition_item:
    module_versions WHERE module_code = item.module_code AND version = item.module_version
  → Prüfen: alle status = PUBLISHED oder DEPRECATED

Schritt 4: Abhängigkeiten prüfen
  → Alle dependencies für jede Modulversion laden
  → Pflichtabhängigkeiten: sind die Zielmodule in der Paketdefinition vorhanden?
  → Versionsbereiche: stimmen die ausgewählten Versionen?
  → Verbotene Kombinationen: keine INCOMPATIBLE_WITH-Paare

Schritt 5: Pfadkonflikte prüfen
  → Alle Dateipfade aller Versionen sammeln
  → Duplikate identifizieren
  → Bei Strategie FAIL: Build-Abbruch mit Fehlerbericht

Schritt 6: Dateien zusammenführen
  → Basisdateien zuerst (in install_order)
  → Dann Moduldateien in Modul-install_order, innerhalb pro Modul in Datei-install_order

Schritt 7: Artefakt erzeugen
  → Für POC: JSON-Manifest (siehe Kapitel 10.2)

Schritt 8: Prüfsumme berechnen
  → SHA-256 über den vollständigen Artefaktinhalt

Schritt 9: Speichern
  → build_artifacts: Inhalt, Prüfsumme, Format
  → build_logs: vollständiges Protokoll
  → builds: status = COMPLETED, completed_at, checksum
  → package_definitions: status = COMPLETED
```

### 10.2 Empfehlung Artefaktformat für den ersten POC

**Empfehlung: Textuelles JSON-Manifest mit vollständigen Dateiinhalten**

```json
{
  "manifest_version": "1.0",
  "generated_at": "2026-07-23T12:00:00Z",
  "package_name": "NeuroWays Energy Navigator",
  "base": {
    "code": "NW_CORE",
    "version": "0.1.0"
  },
  "modules": [
    { "code": "ENERGY_NAVIGATOR", "version": "1.1.0" }
  ],
  "checksum": "sha256:abc123...",
  "files": [
    {
      "path": "index.html",
      "category": "BUILD",
      "content": "<!doctype html>..."
    },
    {
      "path": "src/main.jsx",
      "category": "SOURCE",
      "content": "import { StrictMode }..."
    }
  ]
}
```

**Warum JSON-Manifest, nicht ZIP:**
- Vollständig in der Datenbank speicherbar (Textfeld)
- Direkt lesbar, prüfbar, validierbar
- Kein Binär-Handling erforderlich
- Prüfsumme über das vollständige Dokument trivial
- Kann später in ZIP oder ZIP+HTML umgewandelt werden
- Entspricht dem Prinzip „Klartext vor Kompression" für den POC

**Warum nicht rekonstruiertes Verzeichnis:**
- Setzt Dateisystemzugriff voraus
- Schwieriger zu speichern und zu transportieren

**Warum nicht ZIP bereits jetzt:**
- Binärformat erschwert Datenbankablage
- Braucht zusätzliche Infrastruktur

---

## Kapitel 11 — Aktuelle Architekturprobleme

### 11.1 Bewertungsmatrix

| Problem | Blockiert POC? | Muss vor echter Installation gelöst werden? |
|---------|---------------|---------------------------------------------|
| `App.jsx` — statische Routen | ❌ NEIN | ✅ JA |
| `Nav.jsx` — hartcodierte Links | ❌ NEIN | ✅ JA |
| Energy Navigator — Dateien verteilt | ❌ NEIN (manuell zuordenbar) | ✅ JA (Modulordner) |
| `engine.js` → direkt `pb.js` | ❌ NEIN | ✅ JA (Interface-Abstraktion) |
| `asset_engine_validation.js` in `src/lib/` | ❌ NEIN | ✅ JA (aus Frontend entfernen) |
| Dashboard fehlt | ❌ NEIN | ✅ JA (Basisbestandteil) |
| Check-ins nicht benutzergebunden | ❌ NEIN (POC testet Isolation, nicht Daten) | ✅ JA (vor Produktion) |

**Für den ersten Paket-POC sind alle sieben Probleme akzeptabel.** Der POC beweist das Speicher- und Artefakt-Generierungsmodell, nicht die Produktionsreife der Modulgrenzen.

### 11.2 Handlungsempfehlung nach dem POC

Reihenfolge der Korrekturen vor einer echten Modulinstallation:

1. `asset_engine_validation.js` aus `src/lib/` entfernen (minimaler Aufwand, max. Klarheit)
2. Energy Navigator in eigenen Ordner `src/modules/energy-navigator/` verschieben
3. `App.jsx` auf dynamische Routenregistrierung umstellen
4. `Nav.jsx` auf konfigurierbare Linkliste umstellen
5. `engine.js` von `pb.js` über Interface abstrahieren
6. Dashboard-Grundstruktur anlegen
7. Check-ins an `user_id` binden

---

## Kapitel 12 — Minimaler Proof of Package (POC-Definition)

### 12.1 Abnahmekriterien

| # | Kriterium |
|---|-----------|
| 1 | Eine Basisversion (NW-CORE v0.1.0) ist in der Datenbank gespeichert |
| 2 | Alle Basisdateien sind mit vollständigem Inhalt gespeichert |
| 3 | Eine Energy-Navigator-Modulversion (v1.1.0) ist gespeichert |
| 4 | Alle Moduldateien sind mit vollständigem Inhalt gespeichert |
| 5 | Benutzer A erstellt eine Paketdefinition (Basis + Energy Navigator) |
| 6 | Paketdefinition wird in der Datenbank gespeichert (user_id = A) |
| 7 | Ein Build wird gestartet und durchläuft alle 9 Schritte |
| 8 | Ein JSON-Manifest-Artefakt wird erzeugt und gespeichert |
| 9 | Das Artefakt enthält alle Dateien beider Versionen |
| 10 | Benutzer B kann das Artefakt von Benutzer A nicht sehen |

### 12.2 POC-Umfang (explizit ausgeschlossen)

- Keine echte Installation in ein Zielsystem
- Kein Upgrade-Mechanismus
- Keine Zahlung, Lizenzierung
- Keine Organisationen, Rollen
- Keine ZIP-Erzeugung
- Kein Diff-Mechanismus

---

## Kapitel 13 — Logisches Datenmodell

### bases (Basisplattform-Katalog)

**Zweck:** Alle bekannten NeuroWays-Basisplattformen.

| Attribut | Typ | Regel |
|---------|-----|-------|
| `id` | UUID | Primärschlüssel, unveränderlich |
| `code` | text | `NW_CORE`, stabil |
| `name` | text | Anzeigename |
| `description` | text | – |
| `status` | text | active, archived |
| `created_at` | datetime | – |

**Beziehungen:** Hat viele `base_versions`.
**Eigentümer:** NeuroWays Core (kein Benutzer).
**Löschverhalten:** Niemals löschen — archivieren.

---

### base_versions

**Zweck:** Unveränderliche Snapshots einer Basisversion.

| Attribut | Typ | Regel |
|---------|-----|-------|
| `id` | UUID | Primärschlüssel |
| `base_id` | UUID | → bases |
| `version` | text | Semver |
| `status` | text | DRAFT, PUBLISHED, DEPRECATED, ARCHIVED |
| `changelog` | text | Pflicht |
| `published_at` | datetime | Gesetzt bei Veröffentlichung |
| `created_at` | datetime | – |

**Unveränderlichkeit:** Nach `PUBLISHED`: alle Felder außer Status eingefroren.
**Eigentümer:** NeuroWays Core.
**Löschverhalten:** Niemals löschen.

---

### modules

**Zweck:** Katalog aller verfügbaren optionalen Module.

| Attribut | Typ | Regel |
|---------|-----|-------|
| `id` | UUID | Primärschlüssel |
| `module_code` | text | `ENERGY_NAVIGATOR`, stabil |
| `name` | text | Anzeigename |
| `description` | text | Für Konfigurator |
| `category` | text | METHOD, DASHBOARD, TOOL, INTEGRATION |
| `status` | text | DEVELOPMENT, PUBLISHED, DEPRECATED, ARCHIVED |
| `install_order` | number | Global-Reihenfolge |
| `created_at` | datetime | – |

**Beziehungen:** Hat viele `module_versions`.
**Eigentümer:** NeuroWays Core.
**Löschverhalten:** Archivieren, niemals löschen.

---

### module_versions

**Zweck:** Unveränderliche, vollständig beschriebene Modulzustände.

| Attribut | Typ | Regel |
|---------|-----|-------|
| `id` | UUID | Primärschlüssel |
| `module_id` | UUID | → modules |
| `version` | text | Semver |
| `status` | text | DRAFT, REVIEW, PUBLISHED, DEPRECATED, WITHDRAWN, ARCHIVED |
| `changelog` | text | Pflicht |
| `compatible_base_versions` | json | Semver-Bereiche |
| `published_at` | datetime | – |
| `created_by` | UUID | → users |
| `created_at` | datetime | – |

**Unveränderlichkeit:** Nach `PUBLISHED`: kein Dateiinhalt änderbar.
**Löschverhalten:** Niemals löschen.

---

### version_files

**Zweck:** Vollständige Dateiinhalte einer Basis- oder Modulversion.

| Attribut | Typ | Regel |
|---------|-----|-------|
| `id` | UUID | Primärschlüssel |
| `version_id` | UUID | → base_versions oder module_versions |
| `version_type` | text | `BASE` oder `MODULE` |
| `relative_path` | text | Zielpfad im Projekt |
| `file_name` | text | Dateiname |
| `file_extension` | text | Ohne Punkt |
| `mime_type` | text | – |
| `category` | text | SOURCE, CONFIG, STYLE, ASSET, DATA, BUILD, DOCUMENTATION, GENERATED |
| `is_binary` | bool | Standard: false |
| `content` | text (long) | Vollständiger UTF-8-Inhalt |
| `encoding` | text | `utf-8` |
| `file_size` | number | Bytes |
| `checksum` | text | SHA-256 |
| `install_order` | number | Reihenfolge innerhalb Version |
| `status` | text | `active` |
| `created_at` | datetime | – |

**Unveränderlichkeit:** Nach Veröffentlichung der Elternversion: unveränderlich.
**Löschverhalten:** Niemals löschen.

---

### dependencies

**Zweck:** Beschreibt, was eine Modulversion oder Basisversion voraussetzt.

| Attribut | Typ | Regel |
|---------|-----|-------|
| `id` | UUID | Primärschlüssel |
| `source_id` | UUID | → module_versions oder base_versions |
| `source_type` | text | `BASE_VERSION`, `MODULE_VERSION` |
| `target_code` | text | Business-Code des Ziels |
| `target_type` | text | `BASE`, `MODULE` |
| `min_version` | text | Semver, inklusiv |
| `max_version` | text | Semver, exklusiv, optional |
| `is_required` | bool | Pflicht oder optional |
| `conflict_rule` | text | `NONE`, `INCOMPATIBLE_WITH` |
| `install_order` | number | – |

**Eigentümer:** NeuroWays Core (Systemobjekt).

---

### package_definitions

**Zweck:** Benutzergewählte Zusammenstellung aus Basis + Modulen.

| Attribut | Typ | Regel |
|---------|-----|-------|
| `id` | UUID | Primärschlüssel |
| `user_id` | UUID | → users, Eigentümer |
| `name` | text | Benutzervergeben |
| `description` | text | Optional |
| `base_version_id` | UUID | Pflicht → base_versions |
| `status` | text | DRAFT, VALIDATING, READY, BUILDING, COMPLETED, FAILED, ARCHIVED |
| `created_at` | datetime | – |
| `updated_at` | datetime | – |

**Eigentümer:** Benutzer (`user_id`).
**Zugriff:** Nur durch Eigentümer.
**Unveränderlichkeit:** Nach `BUILDING`: eingefroren.

---

### package_definition_items

**Zweck:** Einzelne Modulauswahlen einer Paketdefinition.

| Attribut | Typ | Regel |
|---------|-----|-------|
| `id` | UUID | Primärschlüssel |
| `definition_id` | UUID | → package_definitions |
| `module_code` | text | Business-Code |
| `module_version` | text | Semver |
| `is_required` | bool | Durch Abhängigkeit erzwungen? |
| `created_at` | datetime | – |

**Eigentümer:** Benutzer (über definition_id).

---

### builds

**Zweck:** Einzelner Build-Vorgang einer Paketdefinition.

| Attribut | Typ | Regel |
|---------|-----|-------|
| `id` | UUID | Primärschlüssel |
| `definition_id` | UUID | → package_definitions |
| `user_id` | UUID | → users (denormalisiert für Isolation) |
| `build_number` | number | Fortlaufend pro Definition |
| `started_at` | datetime | – |
| `completed_at` | datetime | – |
| `status` | text | QUEUED, RUNNING, COMPLETED, FAILED |
| `used_versions` | json | Snapshot aller verwendeten Versionen |
| `checksum` | text | SHA-256 des Artefakts |
| `error_message` | text | Leer bei Erfolg |

**Eigentümer:** Benutzer (`user_id`).
**Unveränderlichkeit:** Nach `COMPLETED` oder `FAILED`: eingefroren.
**Löschverhalten:** Niemals löschen, nur archivieren.

---

### build_artifacts

**Zweck:** Das erzeugte Installationsartefakt eines Builds.

| Attribut | Typ | Regel |
|---------|-----|-------|
| `id` | UUID | Primärschlüssel |
| `build_id` | UUID | → builds |
| `user_id` | UUID | → users |
| `file_name` | text | Menschenlesbarer Name |
| `format` | text | `MANIFEST_JSON`, `ZIP`, `TAR_GZ` |
| `content` | text (long) | Vollständiger Artefaktinhalt |
| `file_size` | number | Bytes |
| `checksum` | text | SHA-256 |
| `created_at` | datetime | – |

**Eigentümer:** Benutzer (`user_id`).
**Zugriff:** Nur durch Eigentümer.
**Unveränderlichkeit:** Vollständig nach Erzeugung.

---

### build_logs

**Zweck:** Schritt-für-Schritt-Protokoll eines Builds.

| Attribut | Typ | Regel |
|---------|-----|-------|
| `id` | UUID | Primärschlüssel |
| `build_id` | UUID | → builds |
| `user_id` | UUID | → users |
| `level` | text | `INFO`, `WARN`, `ERROR` |
| `step` | text | `LOAD_BASE`, `LOAD_MODULES`, `CHECK_DEPS`, `CHECK_PATHS`, `MERGE`, `GENERATE`, `STORE` |
| `message` | text | Kein Geheimnis erlaubt |
| `created_at` | datetime | – |

**Eigentümer:** Benutzer (`user_id`).
**Geheimnisse:** Explizit verboten — Log-Einträge werden vor Speicherung auf verbotene Muster geprüft.

---

## Kapitel 14 — Sicherheitsregeln

| Regel | Umsetzung |
|-------|-----------|
| Benutzer sehen nur eigene Definitionen und Builds | `listRule: user_id = @request.auth.id` auf allen benutzereigenen Collections |
| Veröffentlichte Versionen sind unveränderlich | Status-Prüfung vor jedem Schreibzugriff; kein `updateRule` für veröffentlichte Versionen |
| Geheimnisse nicht in Versionsdateien | Regex-Scan vor dem Speichern jedes Dateiinhalts |
| Dateipfade validiert | Whitelist erlaubter Zeichen: `[a-zA-Z0-9_\-./]`, Länge ≤ 255 |
| Pfad-Traversal verboten | `relative_path` darf `../` nicht enthalten; Prüfung vor Speichern und vor Build |
| Kein Code-Execution während Generation | Generator liest nur gespeicherte Inhalte, führt keinen Code aus, keine `eval()`, keine Shell-Befehle |
| Generator kombiniert nur gespeicherte Inhalte | Kein Netzwerkzugriff, kein Dateisystemzugriff während der Generierung |
| Build-Protokolle ohne Geheimnisse | Regex-Scan vor jedem Log-Eintrag |
| Artefakte mit Prüfsumme | SHA-256 obligatorisch, Prüfsumme in separatem Feld |

---

## Kapitel 15 — Abnahmekriterien

| # | Kriterium | Abgedeckt in |
|---|-----------|-------------|
| 1 | Wie Basis und Module versioniert werden | Kapitel 2, 3, 4 |
| 2 | Wie vollständige Dateien gespeichert werden | Kapitel 5 |
| 3 | Wie ein Benutzer Module auswählt | Kapitel 7 |
| 4 | Wie eine Paketdefinition entsteht | Kapitel 8.1 |
| 5 | Wie ein Build davon getrennt wird | Kapitel 8.2, 1 (Begriffe) |
| 6 | Wie ein Artefakt erzeugt und gespeichert wird | Kapitel 8.3, 10 |
| 7 | Wie Benutzerisolation sichergestellt wird | Kapitel 9, 14 |
| 8 | Wie Abhängigkeiten und Konflikte erkannt werden | Kapitel 6 |
| 9 | Wie der erste Proof of Package umgesetzt werden kann | Kapitel 12 |

**Alle neun Abnahmekriterien sind abgedeckt. ✅**

---

## Offene Fragen

| Frage | Relevanz | Priorität |
|-------|---------|-----------|
| Wie wird der Build angestoßen? (Sofort, asynchron, Queue?) | Hoch — bestimmt UI-Design | Vor POC klären |
| Wie groß werden JSON-Manifeste bei vielen Dateien? | Mittel — Datenbanklimit bei `text`-Feldern | Vor POC messen |
| Soll der Benutzer das Manifest direkt herunterladen können? | Mittel | Nach POC |
| Wie werden zukünftige Basisversionen rückwärtskompatibel zu alten Modulen? | Hoch | Vor v1.0 |
| Welche Semver-Bibliothek wird für Versionsvergleiche verwendet? | Mittel (Node hat native Semver-Unterstützung) | Vor POC |
| Sollen Modulversionen von Dritten hochladbar sein? | Mittel (Zukunft) | Nicht im POC |

---

## Risiken

| Risiko | Wahrscheinlichkeit | Auswirkung | Gegenmaßnahme |
|--------|------------------|------------|----------------|
| JSON-Manifest zu groß für Datenbankfeld | Mittel | Hoch | Feldtyp und Limit prüfen; ggf. externe Speicherreferenz |
| Pfadkonflikt zwischen Basis und Modul (`App.jsx`) | Hoch | Hoch | Bekanntes Problem — FAIL-Strategie erzwingt bewusste Entscheidung |
| Geheimnis-Scan zu restriktiv (false positives) | Mittel | Mittel | Whitelist für bekannte harmlose Muster |
| Build dauert zu lange (synchron) | Mittel | Mittel | Für POC: synchron akzeptabel; Produktion: Queue |
| Versionskonflikt bei Basisupgrade | Hoch (bei Wachstum) | Hoch | Kompatibilitätsmatrix pflegen |

---

## Empfehlung: Artefaktformat für den ersten POC

**JSON-Manifest** (siehe Kapitel 10.2).

Begründung: vollständig textbasiert, in der Datenbank speicherbar, direkt lesbar, keine Binärinfrastruktur, Prüfsumme trivial, erweiterbar.

---

## Konkreter nächster Implementierungsschritt

**Schritt 1 — Collections anlegen** (kein Code, nur Datenbankstruktur):

In dieser Reihenfolge:
1. `bases` + `base_versions`
2. `modules` + `module_versions`
3. `version_files`
4. `dependencies`
5. `package_definitions` + `package_definition_items`
6. `builds` + `build_artifacts` + `build_logs`

**Schritt 2 — Erste Daten einspeisen:**
- NW-CORE v0.1.0 als Basisversion mit allen 11 Basisdateien
- ENERGY_NAVIGATOR v1.1.0 als Modulversion mit allen 8 Moduldateien

**Schritt 3 — POC-Build:**
- Benutzer A erstellt Paketdefinition (Basis + Energy Navigator)
- Generator produziert JSON-Manifest
- Datenisolation: Benutzer B kann Artefakt nicht sehen

---

*NW-PKG-001 — NeuroWays Module, Version & Package Model v0.1.0 — Status: development — 2026-07-23*

┌─────────────────────────────────────────────────
│ ./NW-STD-000_STANDARDS_FRAMEWORK.md
└─────────────────────────────────────────────────
# NW-STD-000 — NeuroWays Standards Framework Standard

**Dokumentcode:** NW-STD-000  
**Version:** 1.0.1  
**Status:** published  
**Veröffentlicht:** 2026-07-23  
**Erstellt:** 2026-07-23  
**Gültig ab:** 2026-07-23  
**Verantwortlich:** NeuroWays Core  
**Hierarchie:** Übergeordneter Rahmenstandard — steht über allen anderen NeuroWays-Standards  
**Ablöst:** –  
**Abgelöst durch:** –

---

## Änderungsverlauf

| Version | Datum | Änderung | Grund | Review |
|---------|-------|----------|-------|--------|
| 1.0.0 | 2026-07-23 | Erstfassung | – | – |
| 1.0.1 | 2026-07-23 | NW-STD-003 in Roadmap als Database Standard korrigiert; Statusmodell um `approved` als maßgebliche Quelle bestätigt; Bootstrap-Endkriterium in Selbstbewertung präzisiert | Governance Review (Konflikte A, B, D) | Governance Review 2026-07-23 |
| 1.0.1 | 2026-07-23 | Status: draft → approved → published. Erste offizielle Veröffentlichung als Teil der Governance Foundation v1.0. | Veröffentlichungsreihenfolge Governance Foundation v1.0 | NeuroWays Core 2026-07-23 |

---

## Referenzen

| Dokument | Titel | Beziehung |
|---------|-------|-----------|
| NW-STD-001 | Naming Standard | Referenziert NW-STD-000 als Rahmen |
| NW-DSN-001 | World Design Standard | Referenziert NW-STD-000 als Rahmen |

---

## Geltungsbereich

Dieser Standard gilt für alle NeuroWays-Standards ohne Ausnahme.

Er definiert, wie Standards entstehen, strukturiert sind, gepflegt, versioniert und außer Kraft gesetzt werden. Er gilt unabhängig von Plattform, Technologie oder Modulzugehörigkeit.

NW-STD-000 ist der einzige Standard, der nicht selbst einem übergeordneten Standard unterliegt. Er ist sein eigener Rahmen.

---

## Offene Punkte

| Punkt | Beschreibung | Vorgesehen in |
|-------|-------------|---------------|
| Governance-Instanz | Wer entscheidet final über Standardänderungen? | NW-GOV-001 |
| Automatisierte Compliance-Prüfung | Wie werden Standards maschinell geprüft? | NW-GOV-001 |
| Archivierungsfristen | Wie lange bleiben archivierte Standards erhalten? | NW-STD-014 |

---

## Kapitel 1 — Grundprinzipien

### 1.1 Standards schaffen Orientierung

Ein Standard beschreibt einen verbindlichen Weg durch bekannte Komplexität. Er ersetzt individuelle Entscheidungen dort, wo Konsistenz wichtiger ist als Kreativität. Wer einem Standard folgt, muss dieselbe Frage nicht erneut lösen.

### 1.2 Standards reduzieren Komplexität

Jede Entscheidung, die einmal als Standard festgehalten wurde, muss nicht mehr diskutiert werden. Standards verwandeln wiederkehrende Abwägungen in verlässliche Regeln. Das entlastet alle Beteiligten und beschleunigt die Entwicklung.

### 1.3 Standards ermöglichen Automatisierung

Ein Standard ist erst vollständig, wenn er testbar ist. Regeln, die nicht geprüft werden können, sind Empfehlungen. Standards müssen so formuliert sein, dass Werkzeuge — heute oder in Zukunft — prüfen können, ob sie eingehalten werden.

### 1.4 Standards sind langfristig stabil

Ein Standard, der sich häufig ändert, schafft kein Vertrauen. Einmal veröffentlichte Standards werden nicht leichtfertig geändert. Änderungen werden begründet, versioniert und kommuniziert. Rückwärtskompatibilität hat Vorrang.

### 1.5 Standards sind fachlich begründet

Jede Regel in einem Standard hat eine fachliche Begründung. Regeln ohne Begründung werden nicht aufgenommen. Wenn die Begründung entfällt, entfällt auch die Regel.

### 1.6 Standards dürfen sich nicht widersprechen

Zwei Standards, die denselben Sachverhalt unterschiedlich regeln, schaffen mehr Probleme als sie lösen. Widersprüche zwischen Standards sind Fehler. Sie werden durch Änderungsanträge aufgelöst, nicht durch informelle Auslegung.

### 1.7 Standards sind kein Selbstzweck

Ein Standard existiert, weil er einen konkreten Nutzen schafft. Standards, die keinen nachweisbaren Nutzen mehr haben, werden mit `deprecated` markiert und gegebenenfalls archiviert.

---

## Kapitel 2 — Arten von Standards

NeuroWays-Standards werden in sieben Kategorien unterteilt. Jede Kategorie hat eine eigene Aufgabe und einen eigenen Nummerierungsbereich.

### 2.1 Core Standards (`NW-STD-000` bis `NW-STD-009`)

Regeln das Fundament aller anderen Standards. Definieren Begriffe, Strukturen und Rahmen, auf die alle anderen Standards aufbauen.

| Code | Titel | Status |
|------|-------|--------|
| NW-STD-000 | Standards Framework Standard | draft |
| NW-STD-001 | Naming Standard | draft |

Eigenschaften: verpflichtend für alle Module, keine Abhängigkeit von anderen Standards außer NW-STD-000.

### 2.2 Technical Standards (`NW-STD-010` bis `NW-STD-029`)

Regeln technische Implementierungsdetails: Datenbanken, APIs, Schnittstellen, Datenhaltung.

| Geplanter Code | Vorläufiger Titel |
|---------------|-------------------|
| NW-STD-010 | Versioning Standard |
| NW-STD-011 | API Standard |
| NW-STD-012 | Security Standard |
| NW-STD-013 | Lifecycle Standard |

Eigenschaften: verpflichtend für technische Implementierungen, optional für rein dokumentarische Systeme.

### 2.3 Development Standards (`NW-STD-030` bis `NW-STD-049`)

Regeln Entwicklungsprozesse: Quelltext, Tests, Abhängigkeiten, Deployment.

| Geplanter Code | Vorläufiger Titel |
|---------------|-------------------|
| NW-STD-030 | Coding Standard |
| NW-STD-031 | Testing Standard |
| NW-STD-032 | Dependency Standard |

Eigenschaften: verpflichtend für aktiv entwickelte Module, empfohlen für Drittintegration.

### 2.4 Design Standards (`NW-STD-050` bis `NW-STD-069`)

Regeln gestalterische Qualität: Designsystem, Weltbild, Illustrationen, Typografie.

| Geplanter Code | Vorläufiger Titel |
|---------------|-------------------|
| NW-STD-050 | Design System Standard |
| NW-STD-051 | Accessibility Standard |
| NW-STD-052 | Asset Standard |

Eigenschaften: verpflichtend für alle nutzerorientierten Schnittstellen.

### 2.5 Documentation Standards (`NW-STD-070` bis `NW-STD-089`)

Regeln, wie NeuroWays-Inhalte geschrieben, strukturiert und gepflegt werden.

| Geplanter Code | Vorläufiger Titel |
|---------------|-------------------|
| NW-STD-070 | Document Standard |
| NW-STD-071 | Changelog Standard |
| NW-STD-072 | API Documentation Standard |

Eigenschaften: verpflichtend für alle veröffentlichten Dokumente.

### 2.6 Quality Standards (`NW-STD-090` bis `NW-STD-099`)

Regeln Qualitätssicherung, Audits und Compliance.

| Geplanter Code | Vorläufiger Titel |
|---------------|-------------------|
| NW-STD-090 | Audit Standard |
| NW-STD-091 | Compliance Standard |

Eigenschaften: empfohlen für alle Module, verpflichtend bei externen Partnerschaften.

### 2.7 Governance Standards (`NW-GOV-001` bis `NW-GOV-099`)

Regeln organisatorische Abläufe: Entscheidungsfindung, Rollen, Verantwortlichkeiten. Verwenden ein separates Präfix `GOV`, da sie außerhalb der technischen Standardhierarchie stehen.

| Geplanter Code | Vorläufiger Titel |
|---------------|-------------------|
| NW-GOV-001 | Standards Governance |
| NW-GOV-002 | Change Management |

Eigenschaften: gelten für alle Beteiligten, unabhängig von Rolle oder Modul.

### 2.8 Future Standards (Platzhalter)

Standards, die als notwendig erkannt, aber noch nicht entwickelt wurden, erhalten einen Platzhalter-Eintrag im Standardregister. Sie haben den Status `planned`. Platzhalter reservieren die Nummer, enthalten aber noch keinen inhaltlichen Standard.

---

## Kapitel 3 — Nummerierung

### 3.1 Schema

```
NW-<KATEGORIE>-<NUMMER>
```

| Bestandteil | Format | Bedeutung |
|-------------|--------|-----------|
| `NW` | Fest | NeuroWays-Präfix, immer |
| `KATEGORIE` | `STD`, `GOV`, `COR`, `DSN` | Standardkategorie |
| `NUMMER` | Dreistellig, nullaufgefüllt | Fortlaufend pro Kategorie |

Beispiele: `NW-STD-000`, `NW-STD-001`, `NW-GOV-001`, `NW-DSN-001`

### 3.2 Vergaberegeln

- Nummern werden dauerhaft vergeben. Sie erlöschen nie, auch wenn der Standard archiviert wird.
- Keine Wiederverwendung. Eine archivierte Nummer bleibt archiviert.
- Keine Umnummerierung. Ein einmal vergebener Code ist dauerhaft der Code dieses Standards.
- Lücken sind erlaubt. Zwischen `NW-STD-011` und `NW-STD-013` darf `NW-STD-012` reserviert sein, auch wenn noch kein Inhalt existiert.

### 3.3 Vergabeprozess

Neue Nummern werden im zentralen Standardregister eingetragen, bevor der erste Entwurf eines Standards beginnt. Das Register verhindert doppelte Vergabe.

---

## Kapitel 4 — Aufbau eines Standards

Jeder NeuroWays-Standard enthält genau diese Abschnitte in dieser Reihenfolge:

| Nr. | Abschnitt | Pflicht | Inhalt |
|-----|-----------|---------|--------|
| 1 | Dokumentkopf | ✅ | Code, Titel, Version, Status, Datum, Verantwortlicher |
| 2 | Änderungsverlauf | ✅ | Tabellarische Versionshistorie |
| 3 | Referenzen | ✅ | Andere Standards, auf die verwiesen wird |
| 4 | Geltungsbereich | ✅ | Für wen und was dieser Standard gilt |
| 5 | Offene Punkte | ✅ | Bewusst offengelassene Fragen mit Verweis auf Folgedokument |
| 6–N | Kapitel | ✅ | Fachlicher Inhalt (standardspezifisch) |
| N+1 | Definitionen | ✅ | Begriffe, die dieser Standard einführt oder präzisiert |
| N+2 | Ausnahmen | ✅ | Dokumentierte, begründete Ausnahmen von den Regeln |
| N+3 | Qualitätsprüfung | ✅ | Kriterien, anhand derer Konformität geprüft werden kann |
| N+4 | Kritische Selbstbewertung | ✅ | Bekannte Schwachstellen zum Zeitpunkt der Erstellung |

### 4.1 Dokumentkopf-Pflichtfelder

```
Dokumentcode:    NW-STD-XXX
Version:         1.0.0
Status:          draft | review | approved | published | superseded | archived
Erstellt:        YYYY-MM-DD
Gültig ab:       YYYY-MM-DD oder "nach Freigabe"
Verantwortlich:  [Person oder Team]
Ablöst:          [Vorgängerstandard oder –]
Abgelöst durch:  [Nachfolgestandard oder –]
```

### 4.2 Kapitelbezeichnungen

Kapitelbezeichnungen sind englisch oder deutsch, konsistent innerhalb eines Standards. Kapitel werden nummeriert (1, 2, 3 … oder 1.1, 1.2 …). Anhänge erhalten Buchstaben (A, B, C …).

---

## Kapitel 5 — Lebenszyklus

### 5.1 Statuswerte

| Status | Bedeutung | Fachliche Inhalte änderbar? |
|--------|-----------|----------------------------|
| `draft` | In Erstellung, interne Arbeitsfassung | ✅ Ja |
| `review` | Zur Prüfung eingereicht, kein neuer Inhalt | ⚠️ Nur Korrekturen |
| `approved` | Inhaltlich freigegeben, vor Aktivierung | ❌ Nein |
| `published` | Aktiv und verbindlich | ❌ Nein |
| `superseded` | Durch neuere Version abgelöst | ❌ Nein |
| `archived` | Historisch aufbewahrt, nicht mehr anwendbar | ❌ Nein |

### 5.2 Zulässige Statusübergänge

```
draft ──→ review ──→ approved ──→ published ──→ superseded ──→ archived
  ↑            │
  └────────────┘  (zurück zu draft bei Ablehnung in review)
```

Explizit nicht zulässig:

- `published` → `draft` (Änderungen erzeugen eine neue Version)
- `archived` → jeder andere Status (Archive sind permanent)
- Überspringen von `review` und `approved` (außer bei Patch-Versionen mit vereinfachtem Prozess)

### 5.3 Patch-Ausnahme

Rein redaktionelle Korrekturen (Tippfehler, Formatierung ohne inhaltliche Änderung) dürfen mit Patch-Version direkt von `draft` zu `published` übergehen, sofern ein Reviewer die Änderung bestätigt.

### 5.4 Rückzug eines Standards

Ein Standard kann zurückgezogen werden, wenn:

- sein Geltungsbereich entfällt
- er durch zwei oder mehr andere Standards vollständig ersetzt wird
- seine Weiterführung mehr Schaden als Nutzen bringt

Rückzug folgt dem Weg: `published` → `superseded` → `archived`.

---

## Kapitel 6 — Versionierung

### 6.1 Format

Alle Standards verwenden Semver (`MAJOR.MINOR.PATCH`):

```
1.0.0   Erstveröffentlichung
1.1.0   Rückwärtskompatible Erweiterung
1.1.1   Redaktionelle Korrektur
2.0.0   Inkompatible Änderung
```

### 6.2 Wann welche Version

| Änderungsart | Version | Beispiel |
|-------------|---------|---------|
| Neue Regel ohne Widerspruch zu bestehenden | MINOR | `1.1.0` |
| Neues Kapitel ohne Widerspruch | MINOR | `1.1.0` |
| Geänderter Statuswert oder Übergang | MAJOR | `2.0.0` |
| Entfernte Regel | MAJOR | `2.0.0` |
| Widerspruchsauflösung mit Regeländerung | MAJOR | `2.0.0` |
| Tippfehlerkorrektur | PATCH | `1.0.1` |
| Formatierungsanpassung | PATCH | `1.0.1` |
| Neues Beispiel ohne Regeländerung | PATCH | `1.0.1` |

### 6.3 Versionshistorie

Jede Version wird im Änderungsverlauf eines Standards dokumentiert. Keine Version wird still überschrieben. Die vollständige Versionsgeschichte bleibt im Dokument erhalten.

### 6.4 Verweis auf NW-STD-010

Die detaillierten Regeln zur Versionierung — insbesondere Rückwärtskompatibilitätsversprechen, Deprecation-Fristen und die Kommunikation von MAJOR-Änderungen — werden im Versioning Standard (NW-STD-010) geregelt. Dieser Standard greift diesen Themen nicht vor.

---

## Kapitel 7 — Abhängigkeiten

### 7.1 Referenzierungsregeln

Ein Standard darf andere Standards referenzieren. Referenzierungen werden im Abschnitt „Referenzen" am Dokumentanfang gelistet.

Arten von Referenzen:

| Art | Bedeutung | Beispiel |
|-----|-----------|---------|
| `normativ` | Referenzierter Standard ist zur Konformität erforderlich | NW-STD-001 ist normativ für alle Collections |
| `informativ` | Referenzierter Standard dient als Hintergrundlektüre | NW-STD-010 informiert über Semver |
| `geplant` | Referenzierter Standard existiert noch nicht | NW-STD-014 (Lifecycle) |

### 7.2 Zirkuläre Abhängigkeiten

Zirkuläre Abhängigkeiten zwischen Standards sind unzulässig:

```
Verboten:   NW-STD-A referenziert NW-STD-B  (normativ)
            NW-STD-B referenziert NW-STD-A  (normativ)
```

Erlaubt: Zwei Standards referenzieren denselben dritten Standard unabhängig voneinander.

### 7.3 Sonderstellung von NW-STD-000

NW-STD-000 ist der einzige Standard, der von allen anderen normativ referenziert werden darf, ohne selbst eine Abhängigkeit zu erzeugen. NW-STD-000 referenziert keine anderen Standards normativ.

### 7.4 Abhängigkeitsgraph

Der vollständige Abhängigkeitsgraph aller NeuroWays-Standards wird im Standardregister geführt. Er wird bei jeder neuen Standardversion aktualisiert. Zirkuläre Abhängigkeiten werden vor der Veröffentlichung geprüft.

---

## Kapitel 8 — Geltungsbereich und Verbindlichkeit

### 8.1 Verpflichtende Standards

Ein Standard ist verpflichtend, wenn er:

- im Dokumentkopf als `verpflichtend` markiert ist, oder
- von einem übergeordneten Standard normativ referenziert wird

Verpflichtende Standards gelten ohne Ausnahme, sofern keine dokumentierte Ausnahme vorliegt (Kapitel 8.3).

### 8.2 Optionale Standards

Ein Standard ist optional, wenn er:

- Best Practices beschreibt, aber keine zwingenden Regeln enthält
- für einen Anwendungsbereich gilt, der nicht zwingend für alle Module ist
- im Dokumentkopf als `empfohlen` markiert ist

### 8.3 Ausnahmen

Eine Ausnahme von einem verpflichtenden Standard muss:

1. Schriftlich begründet sein
2. Im Ausnahmen-Abschnitt des betroffenen Standards oder in einem separaten Ausnahmedokument festgehalten sein
3. Einen Gültigkeitszeitraum haben (keine dauerhaften Ausnahmen ohne Überprüfung)
4. Von der verantwortlichen Instanz freigegeben sein

Undokumentierte Abweichungen von verpflichtenden Standards gelten als Konformitätsverstöße.

### 8.4 Neue Module

Jedes neue NeuroWays-Modul muss vor Veröffentlichung prüfen, welche Standards für es gelten. Die Prüfung wird dokumentiert. Core Standards und Technical Standards sind für alle neuen Module verpflichtend.

---

## Kapitel 9 — Erweiterbarkeit

### 9.1 Neuen Standard erstellen

Ein neuer Standard entsteht durch folgenden Prozess:

1. **Bedarf identifizieren** — Welches Problem löst dieser Standard? Ist es durch bestehende Standards nicht bereits geregelt?
2. **Nummer reservieren** — Eintrag im Standardregister, Status `planned`
3. **Entwurf erstellen** — Vollständige Kapitelstruktur nach Kapitel 4 dieses Standards
4. **Interne Prüfung** — Prüfung auf Vollständigkeit, Widersprüche und Abhängigkeiten
5. **Review** — Status `review`
6. **Freigabe** — Status `approved`, dann `published`

### 9.2 Bestehenden Standard erweitern

Erweiterungen eines veröffentlichten Standards:

- MINOR-Erweiterung: Neues Kapitel, neue Regel (kein Widerspruch) → Neue MINOR-Version
- MAJOR-Änderung: Bestehende Regel geändert oder entfernt → Neue MAJOR-Version + Migrationspfad

### 9.3 Veralteten Standard ersetzen

Wenn ein Standard vollständig durch einen oder mehrere neue Standards ersetzt wird:

1. Neuen Standard veröffentlichen (`published`)
2. Alten Standard auf `superseded` setzen, `superseded_by` eintragen
3. Übergangszeit definieren (mindestens eine Major-Version lang parallel gültig)
4. Alten Standard nach Ablauf auf `archived` setzen

### 9.4 Rückwärtskompatibilität

Veröffentlichte Standards geben das Versprechen, dass:

- PATCH-Versionen keine inhaltlichen Änderungen enthalten
- MINOR-Versionen keine bestehenden Regeln entfernen
- MAJOR-Versionen einen Migrationspfad beschreiben

---

## Kapitel 10 — Qualitätsanforderungen

Ein Standard, der zur Veröffentlichung eingereicht wird, muss folgende Kriterien erfüllen:

### 10.1 Eindeutigkeit

Jede Regel erlaubt genau eine Interpretation. Formulierungen wie „sollte", „kann" oder „in der Regel" sind nur erlaubt, wenn bewusst eine Empfehlung ausgedrückt wird. Verpflichtende Regeln verwenden „muss" oder „ist".

### 10.2 Vollständigkeit

Alle Abschnitte aus Kapitel 4 sind vorhanden. Kein Abschnitt ist leer. Offene Punkte sind explizit als solche markiert.

### 10.3 Widerspruchsfreiheit

Der Standard widerspricht sich nicht selbst und widerspricht keinem anderen veröffentlichten Standard. Widersprüche werden vor Freigabe aufgelöst.

### 10.4 Testbarkeit

Jede verpflichtende Regel lässt sich mit einem Beispiel testen: „Wenn Bedingung X gilt, dann ist Y konform und Z nicht konform." Regeln, die keine Beispiele haben, sind nicht testbar und werden nicht aufgenommen.

### 10.5 Nachvollziehbarkeit

Jede Regel hat eine fachliche Begründung. „Weil wir es immer so gemacht haben" ist keine fachliche Begründung.

### 10.6 Versionierbarkeit

Der Standard kann geändert werden, ohne seinen Code oder seine Identität zu verlieren. Alle zukünftigen Versionen bauen auf der ersten auf.

---

## Kapitel 11 — Beziehungen zwischen Standards

### 11.1 Beziehungsdiagramm

```
NW-STD-000 (Framework Standard)
├── NW-STD-001 (Naming Standard)         ← normativ für alle Collections
├── NW-STD-010 (Versioning Standard)     ← normativ für alle Versionierungen
├── NW-STD-003 (Database Standard)       ← normativ für alle Datenbanken
│   └── referenziert NW-STD-001
├── NW-STD-011 (API Standard)            ← normativ für alle Schnittstellen
│   ├── referenziert NW-STD-001
│   └── referenziert NW-STD-010
├── NW-STD-013 (Security Standard)       ← normativ für alle Module
├── NW-STD-014 (Lifecycle Standard)      ← normativ für alle Objekte
│   └── referenziert NW-STD-010
├── NW-STD-050 (Design System Standard)  ← normativ für UI
│   └── referenziert NW-DSN-001
└── NW-STD-051 (Accessibility Standard)  ← normativ für UI
    └── referenziert NW-STD-050
```

### 11.2 Beziehungstypen

| Typ | Bedeutung |
|-----|-----------|
| `normativ referenziert` | Zur Konformität mit Standard A muss Standard B eingehalten werden |
| `informativ referenziert` | Standard B liefert Hintergrundwissen für Standard A |
| `spezialisiert` | Standard B ist eine Vertiefung eines Teilaspekts von Standard A |
| `ersetzt` | Standard B löst Standard A ab |

### 11.3 Sonderfall NW-DSN-001

Der World Design Standard (NW-DSN-001) wurde vor der Einführung von NW-STD-000 entwickelt. Er gilt inhaltlich als konform, verwendet aber eine abweichende Dokumentstruktur. Bei der nächsten MINOR-Überarbeitung wird er an die Struktur aus Kapitel 4 dieses Standards angepasst.

---

## Kapitel 12 — Beispiele

### 12.1 Gültige Standards (✅)

| Beispiel | Begründung |
|---------|-----------|
| NW-STD-000 enthält alle Pflichtabschnitte aus Kapitel 4 | Vollständig nach eigenem Standard |
| NW-STD-001 referenziert NW-STD-000 normativ | Korrekte einseitige Abhängigkeit |
| NW-STD-001 v1.1.0 fügt neues Kapitel hinzu ohne Regeländerung | MINOR-Update korrekt |
| NW-STD-003 v2.0.0 entfernt veraltete Feldkonvention und dokumentiert Migrationspfad | MAJOR-Update korrekt |
| NW-STD-012 hat Status `superseded`, weil NW-STD-012b es ersetzt | Korrekter Statusübergang |
| NW-GOV-001 hat Präfix `GOV`, nicht `STD` | Governance-Standard korrekt getrennt |
| NW-STD-050 ist als `optional` für rein backend-seitige Module markiert | Scope korrekt eingeschränkt |
| Ausnahme von NW-STD-001 ist schriftlich begründet mit Ablaufdatum | Ausnahme korrekt dokumentiert |
| NW-STD-032 hat Status `planned` im Register, aber noch kein Dokument | Nummer reserviert, Prozess korrekt |
| NW-STD-001 v1.0.1 korrigiert Tippfehler ohne Inhalt zu ändern | PATCH korrekt |

### 12.2 Ungültige Standards (❌)

| Beispiel | Fehler | Korrekt |
|---------|--------|---------|
| NW-STD-042 wird ohne Registereintrag erstellt | Nummer nicht reserviert | Register-Eintrag zuerst |
| NW-STD-A referenziert NW-STD-B, NW-STD-B referenziert NW-STD-A (normativ) | Zirkuläre Abhängigkeit | Abhängigkeit neu gestalten |
| NW-STD-015 hat keinen Änderungsverlauf | Pflichtabschnitt fehlt | Abschnitt ergänzen |
| NW-STD-020 ändert eine Regel ohne Versionserhöhung | Stille Änderung | MINOR- oder MAJOR-Version |
| NW-STD-001 v2.0.0 entfernt Regeln ohne Migrationspfad | MAJOR ohne Übergang | Migrationsdokument ergänzen |
| Ausnahme von NW-STD-003 ohne Begründung und ohne Ablaufdatum | Undokumentierte Ausnahme | Ausnahmedokument erstellen |
| NW-STD-001 und NW-STD-003 regeln denselben Sachverhalt widersprüchlich | Konflikt | Einen Standard ändern |
| NW-STD-005 hat Status `published` aber der Geltungsbereich ist leer | Unvollständig | Review erneut starten |
| NW-STD-017 enthält nur Empfehlungen ohne testbare Regeln | Nicht testbar | Regeln mit Beispielen ergänzen |
| NW-STD-001 wird auf Nummer NW-STD-099 umnummeriert | Nummernänderung verboten | Ursprüngliche Nummer behalten |

### 12.3 Typische Erweiterungen (✅)

| Erweiterung | Art | Vorgehen |
|------------|-----|---------|
| NW-STD-001 erhält neuen Abschnitt für Multilingualität | MINOR | Neues Kapitel, Nummer `1.1.0` |
| NW-STD-003 ersetzt Feldtyp-Konvention | MAJOR | Neue Version `2.0.0`, Migrationspfad |
| NW-STD-000 korrigiert Tippfehler in Kapitel 5 | PATCH | Version `1.0.1`, kein Reviewprozess |
| Neues Modul NW-STD-060 für Sound-Assets | Neu | Nummer reservieren, Prozess aus Kapitel 9.1 |
| NW-STD-014 wird durch NW-STD-014a und NW-STD-014b ersetzt | Ablösung | STD-014 → `superseded`, neue Standards `published` |

---

## Kapitel 13 — Standards-Roadmap

### 13.1 Legende

| Symbol | Bedeutung |
|--------|-----------|
| ✅ | Vorhanden (draft oder höher) |
| 🔄 | In aktiver Entwicklung |
| 📋 | Geplant, Bedarf erkannt |
| 💡 | Erwogen, noch nicht entschieden |

### 13.2 Core Standards (höchste Priorität)

| Code | Titel | Status |
|------|-------|--------|
| NW-STD-000 | Standards Framework Standard | ✅ draft |
| NW-STD-001 | Naming Standard | ✅ draft |
| NW-STD-002 | Register der Standards und Nummern | 📋 |
| NW-STD-003 | Database Standard | ✅ draft |

### 13.3 Technical Standards

| Code | Titel | Status | Empfohlen nach |
|------|-------|--------|----------------|
| NW-STD-010 | Versioning Standard | 📋 | NW-STD-000 + NW-STD-001 |
| NW-STD-011 | API Standard | 📋 | NW-STD-001 + NW-STD-010 |
| NW-STD-012 | Security Standard | 📋 | NW-STD-011 |
| NW-STD-013 | Lifecycle Standard | 📋 | NW-STD-010 |
| NW-STD-014 | Lifecycle Standard | 📋 | NW-STD-010 |

### 13.4 Development Standards

| Code | Titel | Status | Empfohlen nach |
|------|-------|--------|----------------|
| NW-STD-030 | Coding Standard | 📋 | NW-STD-001 |
| NW-STD-031 | Testing Standard | 📋 | NW-STD-030 |
| NW-STD-032 | Dependency Standard | 💡 | NW-STD-030 |

### 13.5 Design Standards

| Code | Titel | Status | Empfohlen nach |
|------|-------|--------|----------------|
| NW-DSN-001 | World Design Standard | ✅ published | — |
| NW-STD-050 | Design System Standard | 📋 | NW-DSN-001 + NW-STD-001 |
| NW-STD-051 | Accessibility Standard | 📋 | NW-STD-050 |
| NW-STD-052 | Asset Standard | 📋 | NW-STD-050 + NW-STD-001 |

### 13.6 Documentation Standards

| Code | Titel | Status | Empfohlen nach |
|------|-------|--------|----------------|
| NW-STD-070 | Document Standard | 📋 | NW-STD-000 + NW-STD-001 |
| NW-STD-071 | Changelog Standard | 💡 | NW-STD-070 + NW-STD-010 |

### 13.7 Quality und Governance

| Code | Titel | Status | Empfohlen nach |
|------|-------|--------|----------------|
| NW-STD-090 | Audit Standard | 📋 | NW-STD-000 |
| NW-GOV-001 | Standards Governance | 📋 | NW-STD-000 |
| NW-GOV-002 | Change Management | 💡 | NW-GOV-001 |

### 13.8 Empfohlene Entwicklungsreihenfolge

```
Phase 1 — Fundament (jetzt)
  NW-STD-000  ✅
  NW-STD-001  ✅
  NW-STD-002  → Standardregister (dringend, ohne dieses fehlt Nummerngouvernanz)

Phase 2 — Technische Grundlage
  NW-STD-010  → Versioning (Abhängigkeit für fast alle anderen)
  NW-STD-011  → API (vor erster externer Integration)
  NW-STD-012  → Security

Phase 3 — Qualität und Sicherheit
  NW-STD-013  → Security
  NW-STD-014  → Lifecycle
  NW-STD-090  → Audit

Phase 4 — Gestaltung und Entwicklung
  NW-STD-050  → Design System
  NW-STD-051  → Accessibility
  NW-STD-030  → Coding

Phase 5 — Dokumentation und Governance
  NW-STD-070  → Document Standard
  NW-GOV-001  → Governance
```

---

## Definitionen

| Begriff | Definition |
|---------|-----------|
| **Standard** | Ein verbindliches, versioniertes Dokument, das Regeln für einen bestimmten Bereich des NeuroWays-Systems festlegt |
| **Konformität** | Der Zustand, in dem ein Objekt, Prozess oder Dokument alle verpflichtenden Regeln eines Standards erfüllt |
| **Normative Referenz** | Eine Referenz, die zur Konformität eingehalten werden muss |
| **Informative Referenz** | Eine Referenz, die als Hintergrundlektüre dient, aber nicht eingehalten werden muss |
| **Ausnahme** | Eine dokumentierte, begründete und zeitlich begrenzte Abweichung von einer verpflichtenden Regel |
| **Platzhalter** | Ein reservierter Standardcode ohne Inhalt, Status `planned` |
| **Standardregister** | Zentrales Verzeichnis aller vergebenen Standardnummern |
| **Migrationspfad** | Dokumentierter Weg, wie bestehende Implementierungen von einer MAJOR-Version auf eine neue migriert werden |

---

## Ausnahmen

Keine Ausnahmen bei Erstveröffentlichung.

---

## Qualitätsprüfung

| Kriterium | Prüfmethode | Bestanden |
|-----------|------------|-----------|
| Alle Pflichtabschnitte vorhanden (Kapitel 4) | Abschnittsprüfung | ✅ |
| Keine zirkulären Abhängigkeiten | Abhängigkeitsgraph | ✅ |
| Statusübergänge vollständig definiert | Kapitel 5 | ✅ |
| Versionierungsregeln mit Beispielen | Kapitel 6 | ✅ |
| Mindestens 20 Beispiele mit Begründung | Kapitel 12 | ✅ (25) |
| Roadmap vorhanden | Kapitel 13 | ✅ |
| Kritische Selbstbewertung vorhanden | Nächster Abschnitt | ✅ |

---

## Kritische Selbstbewertung

### Stärken

- Vollständige Abdeckung aller zwölf angeforderten Kapitel
- Klares Governance-Modell mit Statusübergängen und Versionierungsregeln
- Sonderstellung von NW-STD-000 klar begründet
- Roadmap mit priorisierten Phasen
- 25 kommentierte Beispiele

### Dokumentierte Schwachstellen

**1. Keine Governance-Instanz benannt**
Kapitel 8.3 erwähnt „verantwortliche Instanz", ohne diese zu benennen. Wer entscheidet, ob eine Ausnahme genehmigt wird? Wer kann einen Standard von `review` auf `approved` setzen? → Folgedokument: NW-GOV-001.

**2. Standardregister existiert noch nicht**
NW-STD-002 ist `planned`, aber ohne dieses Register gibt es keine Garantie, dass Nummern eindeutig vergeben werden. Das ist die kritischste Lücke im gesamten Standards-System. → Höchste Priorität nach diesem Dokument.

**3. Übergangsregeln für NW-DSN-001**
Der World Design Standard folgt nicht der Struktur aus Kapitel 4 dieses Standards. Kapitel 11.3 erklärt das, aber nennt keinen konkreten Zeitplan für die Anpassung.

**4. Kein automatisierter Compliance-Check**
Standards beschreiben Regeln, aber es gibt kein Werkzeug, das prüft, ob neue Standards diesen Regeln folgen. Dieser Standard selbst könnte gegen NW-STD-000 verstoßen — und niemand würde es automatisch merken.

**5. Englisch vs. Deutsch in Kapitelbezeichnungen**
Kapitel 4.2 erlaubt Englisch oder Deutsch, „konsistent innerhalb eines Standards". NW-STD-000 selbst verwendet Deutsch. NW-STD-001 verwendet ebenfalls Deutsch. Das ist intern konsistent, aber die Regelformulierung lässt Interpretationsspielraum.

### Gesamtbewertung

**NW-STD-000 ist verabschiedungsfähig als Version 1.0.0 mit dem Status `review`.**

Die Bootstrap-Phase endet eindeutig und einmalig, wenn NW-STD-002 von mindestens zwei Personen des NeuroWays Core Teams schriftlich freigegeben wurde und der Status im Dokument auf `published` gesetzt ist — ohne Abhängigkeit von NW-GOV-001. Die Bootstrap-Phase kann danach niemals erneut aktiviert werden. Schwachstelle 1 (Governance-Instanz) muss mittelfristig durch NW-GOV-001 geschlossen werden.

---

*NW-STD-000 — NeuroWays Standards Framework Standard v1.0.1 — Status: published — Veröffentlicht 2026-07-23*

┌─────────────────────────────────────────────────
│ ./NW-STD-001_NAMING_STANDARD.md
└─────────────────────────────────────────────────
# NW-STD-001 — NeuroWays Naming Standard

**Dokumentcode:** NW-STD-001  
**Version:** 1.0.1  
**Status:** published  
**Veröffentlicht:** 2026-07-23  
**Erstellt:** 2026-07-23  
**Gültig ab:** 2026-07-23  
**Verantwortlich:** NeuroWays Core  
**Ablöst:** –  
**Abgelöst durch:** –

---

## Änderungsprotokoll

| Version | Datum | Änderung | Grund | Review |
|---------|-------|----------|-------|--------|
| 1.0.0 | 2026-07-23 | Erstfassung | – | – |
| 1.0.1 | 2026-07-23 | NW-STD-003 als Database Standard korrigiert (war: API Standard); Statusmodell: Verweis auf NW-STD-000 als maßgebliche Quelle ergänzt; Querverweise in Kap. 13 und offenen Punkten korrigiert | Governance Review (Konflikt A, C) | Governance Review 2026-07-23 |
| 1.0.1 | 2026-07-23 | Status: review → approved → published. Erste offizielle Veröffentlichung. | Veröffentlichungsreihenfolge Governance Foundation v1.0 | NeuroWays Core 2026-07-23 |

---

## Geltungsbereich

Dieser Standard gilt verbindlich für alle zukünftigen NeuroWays-Entwicklungen:

- Datenbankobjekte (Collections, Felder, Werte)
- API-Endpunkte, Events, Payloads
- Dateinamen
- Asset-Codes
- Dokumentcodes
- Quelltext-Bezeichner
- Konfigurationsschlüssel
- Moduldefinitionen

Er gilt unabhängig von Plattform, Datenbanksystem oder Hosting-Anbieter.

Bestehende Objekte werden durch diesen Standard nicht automatisch umbenannt. Für laufende Systeme gilt er ab dem nächsten geplanten Migrationszeitpunkt oder bei Neuanlage.

---

## Kapitel 1 — Grundprinzipien

### 1.1 Konsistenz vor Kürze

Ein Name darf länger sein, wenn er dadurch eindeutiger wird. Abkürzungen sind nur erlaubt, wenn sie im Bereichscode-Register (Kapitel 2) gelistet sind.

### 1.2 Fachlichkeit vor Technik

Namen beschreiben, was ein Objekt fachlich bedeutet — nicht, wie es technisch gespeichert wird. `METHOD_VERSION` ist korrekt. `METHOD_V` ist nicht zulässig.

### 1.3 Ein Begriff, eine Bedeutung

Jeder Begriff hat systemweit genau eine Bedeutung. Synonyme sind verboten. Wenn `status` verwendet wird, bedeutet es in allen Collections dasselbe Konzept.

### 1.4 Ein Objekt, ein Name

Jedes fachliche Objekt besitzt genau einen offiziellen Namen. Aliase, Kurzformen oder interne Spitznamen dürfen nicht in Produktionssysteme einfließen.

### 1.5 Keine Unterschiede durch Schreibweise

`method_id`, `Method_Id` und `MethodID` dürfen nicht gleichzeitig existieren. Die zulässige Schreibweise ist für jeden Kontext exakt eine (siehe Kapitel 3–9).

### 1.6 Keine sprachlichen Mehrdeutigkeiten

Namen müssen in ihrem Kontext eindeutig interpretierbar sein. `type` allein ist zu vage. `asset_type` ist korrekt.

### 1.7 Englisch als technische Standardsprache

Alle technischen Namen — Felder, Codes, Dateinamen, API-Pfade — sind in Englisch. Keine Umlaute, keine deutschen Wörter in technischen Bezeichnern.

### 1.8 Deutsch ausschließlich in Fachtexten

`description`, `title`, `label` und `rule_text` dürfen deutschen Inhalt enthalten. Ihr Feldname ist immer Englisch.

### 1.9 Keine Datumsangaben in Namen

Namen dürfen kein Datum enthalten. Versionierung erfolgt über Versionsfelder, nicht über Datumssuffixe.

### 1.10 Keine technischen IDs in fachlichen Namen

Technische Primärschlüssel (UUIDs, autoincrement) erscheinen nicht in fachlichen Bezeichnern. Der fachliche Name ist der `code`, nicht die `id`.

---

## Kapitel 2 — Bereichscodes

Bereichscodes sind dreistellige Großbuchstaben-Kürzel. Sie identifizieren den fachlichen Bereich eines Objekts.

### 2.1 Offizielle Bereichscodes

| Code | Bereich | Beschreibung |
|------|---------|--------------|
| `COR` | Core | Kernfunktionalität, bereichsübergreifende Objekte |
| `STD` | Standards | Normative Dokumente, Regeln, Vorgaben |
| `DSN` | Design | Designsystem, Welten, Regionen, Tokens |
| `AST` | Assets | Illustrationen, Icons, Animationen, Mediendateien |
| `MTH` | Methoden | NeuroWays-Methoden, Fragen, Antwortoptionen |
| `CHK` | Check-ins | Laufende und abgeschlossene Selbstbeobachtungen |
| `USR` | Benutzer | Profile, Einstellungen, Authentifizierung |
| `ORG` | Organisationen | Mandanten, Teams, Lizenzierungen |
| `CFG` | Konfiguration | Systemeinstellungen, Feature Flags |
| `API` | Schnittstellen | Externe Integrationen, Webhooks |
| `DOC` | Dokumente | Texte, Hilfeinhalte, Anleitungen |
| `LOG` | Logging | Technische Protokolldaten |
| `AUD` | Audit | Nachvollziehbarkeit, Änderungshistorie |
| `SYS` | System | Plattforminterne Objekte, Migrationen |

### 2.2 Zukünftige Bereichscodes

Neue Bereichscodes werden ausschließlich durch einen formalen Änderungsantrag an NW-STD-001 eingeführt. Der Antrag muss enthalten:

- Dreistelligen Code (muss neu und eindeutig sein)
- Fachliche Begründung
- Mindestens ein Beispielobjekt
- Verweis auf das zugehörige Modul oder Dokument

### 2.3 Reservierte Codes

Folgende Codes sind reserviert und dürfen nicht für andere Bereiche verwendet werden: `NW`, `WLD`, `GEN`.

---

## Kapitel 3 — Collections und Tabellen

### 3.1 Schema

```
<AREA_CODE>_<PLURAL_OBJECT_NAME>
```

- `AREA_CODE`: Exakt ein offizieller Bereichscode (Kapitel 2)
- `PLURAL_OBJECT_NAME`: Plural, SCREAMING_SNAKE_CASE
- Trennzeichen zwischen Bereich und Objekt: ein einzelner Unterstrich

### 3.2 Regeln

| Regel | Erlaubt | Verboten |
|-------|---------|---------|
| Schreibweise | `MTH_METHODS` | `mth_methods`, `MthMethods` |
| Plural | `MTH_QUESTIONS` | `MTH_QUESTION` |
| Keine Zahlen | `DSN_WORLD_REGIONS` | `DSN_WORLD_REGIONS_2` |
| Keine Datumsangaben | `AST_ASSET_FILES` | `AST_ASSET_FILES_2026` |
| Keine Versionen | `CHK_CHECKINS` | `CHK_CHECKINS_V2` |
| Nur offizielle Codes | `STD_NAMING_RULES` | `NMS_NAMING_RULES` |
| Kein Freitext | `USR_USER_PROFILES` | `USR_PROFILES_NEW` |

### 3.3 Beispiele

| Collection | Bereich | Objekt |
|-----------|---------|--------|
| `MTH_METHODS` | Methoden | Methodendefinitionen |
| `MTH_QUESTIONS` | Methoden | Fragen einer Methode |
| `MTH_ANSWER_OPTIONS` | Methoden | Antwortoptionen |
| `MTH_RESULT_RULES` | Methoden | Auswertungsregeln |
| `CHK_CHECKINS` | Check-ins | Abgeschlossene Sitzungen |
| `CHK_CHECKIN_ANSWERS` | Check-ins | Einzelantworten |
| `DSN_WORLD_VERSIONS` | Design | Weltversionen |
| `DSN_WORLD_REGIONS` | Design | Regionen der Welt |
| `DSN_DESIGN_TOKENS` | Design | Designtokens |
| `DSN_DESIGN_RULES` | Design | Designregeln |
| `DSN_ANIMATION_RULES` | Design | Animationsregeln |
| `DSN_ACCESSIBILITY_RULES` | Design | Barrierefreiheitsregeln |
| `AST_ASSET_VERSIONS` | Assets | Versionierte Assets |
| `AST_ASSET_FILES` | Assets | Dateireferenzen |
| `AST_ASSET_ASSIGNMENTS` | Assets | Zuordnungen |
| `AST_ASSET_METADATA` | Assets | Metadaten |
| `AST_ASSET_PROMPTS` | Assets | Generierungsaufträge |
| `STD_STANDARDS` | Standards | Normative Dokumente |
| `STD_NAMING_RULES` | Standards | Namensregeln |
| `USR_USERS` | Benutzer | Benutzeraccounts |
| `CFG_FEATURE_FLAGS` | Konfiguration | Feature-Schalter |
| `AUD_AUDIT_LOGS` | Audit | Änderungshistorie |

### 3.4 Beziehungstabellen (Junction Tables)

```
<AREA_CODE>_<OBJECT_A>_<OBJECT_B>_LINKS
```

Beispiel: `MTH_METHOD_TAG_LINKS`

---

## Kapitel 4 — Felder

### 4.1 Schreibweise

Alle Feldnamen: `snake_case`, Kleinbuchstaben, Englisch.

### 4.2 Pflichtfelder (Standard-Set)

Alle Collections sollen diese Felder enthalten, sofern fachlich sinnvoll:

| Feldname | Typ | Bedeutung |
|----------|-----|-----------|
| `id` | text/uuid | Technischer Primärschlüssel (automatisch) |
| `code` | text | Stabiler fachlicher Bezeichner (Business Key) |
| `name` | text | Kurzname, maschinenlesbar |
| `title` | text | Anzeigename, für Menschen |
| `description` | text | Freitext, darf Deutsch enthalten |
| `status` | text | Aktueller Zustand (Kapitel 5) |
| `version` | text | Semver-Version (z. B. `1.0.0`) |
| `sort_order` | number | Anzeigereihenfolge |
| `created_at` | datetime | Zeitstempel der Erstellung |
| `updated_at` | datetime | Zeitstempel der letzten Änderung |
| `published_at` | datetime | Zeitstempel der Veröffentlichung |
| `archived_at` | datetime | Zeitstempel der Archivierung |
| `superseded_at` | datetime | Zeitstempel der Ablösung |
| `created_by` | text/id | Benutzer-ID der erstellenden Person |
| `updated_by` | text/id | Benutzer-ID der letzten Änderung |
| `published_by` | text/id | Benutzer-ID der veröffentlichenden Person |
| `archived_by` | text/id | Benutzer-ID der archivierenden Person |
| `owner_id` | text/id | Verantwortliche Benutzer- oder Organisations-ID |
| `parent_id` | text/id | Übergeordnetes Objekt gleichen Typs |

### 4.3 Referenzfelder

Felder, die auf andere Collections zeigen, enden auf `_id`:

```
method_id, question_id, asset_version_id, world_version_id
```

Felder, die auf einen Business-Code zeigen, enden auf `_code`:

```
asset_type_code, status_code, region_code
```

### 4.4 Boolean-Felder

Beginnen mit `is_` oder `has_`:

```
is_active, is_primary, is_required, has_attachment
```

### 4.5 Typ-Felder

Enden auf `_type`:

```
asset_type, target_type, value_type
```

### 4.6 Verbotene Feldnamen

| Verboten | Grund | Korrekt |
|---------|-------|---------|
| `data` | zu generisch | fachlicher Name |
| `info` | zu generisch | fachlicher Name |
| `misc` | undefiniert | entfernen oder spezifizieren |
| `temp` | impliziert Wegwerfcharakter | nicht in Produktion |
| `new_X` | relativ, nicht stabil | versioniertes Objekt anlegen |
| `old_X` | relativ, nicht stabil | über `status` regeln |
| `flag` | zu generisch | `is_X` oder `has_X` |
| `dt` | kryptisches Kürzel | `created_at` |
| `ts` | kryptisches Kürzel | `created_at` |
| `typ` | kryptisches Kürzel | `type` |

### 4.7 Migration von bestehenden Feldnamen

| Aktuell (Bestand) | Ziel (NW-STD-001) | Hinweis |
|------------------|-------------------|---------|
| `created` | `created_at` | Bei nächster Migration |
| `updated` | `updated_at` | Bei nächster Migration |
| `is_active` | unverändert | Bereits konform |
| `sort_order` | unverändert | Bereits konform |
| `result_code` | unverändert | Bereits konform |

---

## Kapitel 5 — Statuswerte

Die maßgebliche Definition aller Statuswerte liegt in NW-STD-000 Kapitel 5. Dieses Kapitel listet die für Datenobjekte anwendbaren Statuswerte und ergänzt objektspezifische Übergänge.

### 5.1 Standard-Statuswerte

| Status | Bedeutung | Übergang zu |
|--------|-----------|-------------|
| `draft` | In Bearbeitung, noch nicht geprüft | `review`, `archived` |
| `review` | Zur Prüfung eingereicht | `approved`, `draft`, `rejected` |
| `approved` | Freigegeben, vor Aktivierung | `published` |
| `published` | Aktiv und gültig | `superseded`, `archived` |
| `superseded` | Abgelöst durch eine neuere Version | `archived` |
| `archived` | Nicht mehr aktiv, historisch erhalten | – |
| `deprecated` | Noch lesbar, aber Nutzung wird eingestellt | `archived` |
| `rejected` | Abgelehnt in der Prüfung | `draft` |
| `planned` | Reserviert, noch kein Inhalt | `draft`, `archived` |

### 5.2 Optionaler Status

| Status | Bedeutung | Hinweis |
|--------|-----------|---------|
| `deleted` | Logisch gelöscht | Nur wenn Hard-Delete nicht möglich |

### 5.3 Regeln

- Statusübergänge sind gerichtet (kein freies Zurücksetzen von `published` auf `draft`)
- `published`-Objekte dürfen fachlich nicht verändert werden
- Verwaltungsmetadaten (`superseded_at`, `archived_at`) dürfen nach Veröffentlichung ergänzt werden
- Statuswerte sind systemweit bedeutungsgleich

### 5.4 Verbotene Statuswerte

| Verboten | Grund | Korrekt |
|---------|-------|---------|
| `active` | Mehrdeutig (aktiv vs. veröffentlicht) | `published` |
| `inactive` | Kein definierter Zustand | `archived` oder `deprecated` |
| `enabled` | Technisch, nicht fachlich | `published` |
| `disabled` | Technisch, nicht fachlich | `archived` |
| `1` / `0` | Nicht lesbar | Textbasierter Status |

---

## Kapitel 6 — Business Codes

### 6.1 Schema

```
<BEREICH>_<FACHLICHER_NAME>
```

- Ausschließlich Großbuchstaben
- Unterstriche als Trennzeichen
- Keine Leerzeichen
- Keine Sonderzeichen
- Keine Umlaute (`AE` statt `Ä`, `OE` statt `Ö`, `UE` statt `Ü`, `SS` statt `ß`)
- Stabil über Versionen — ein Code ändert sich nicht

### 6.2 Bereichspräfix

Der erste Teil des Codes entspricht dem fachlichen Bereich (muss nicht zwingend der Bereichscode sein, wenn der Kontext eindeutig ist):

```
ENERGY_NAVIGATOR
WORLD_FESTLAND
ASSET_ICON_TREE
METHOD_TRANSITIONS
RULE_KUESTE
TOKEN_NW_FESTLAND
```

### 6.3 Stabilitätsregel

Einmal veröffentlichte Codes werden niemals geändert. Eine neue Version eines Objekts erhält denselben Code mit einer neuen Version, nicht einen neuen Code.

```
ENERGY_NAVIGATOR (Code bleibt)
version: 1.0.0 → version: 1.1.0
```

### 6.4 Verbotene Code-Formate

| Verboten | Grund | Korrekt |
|---------|-------|---------|
| `energy-navigator` | Bindestrich nicht zulässig | `ENERGY_NAVIGATOR` |
| `EnergyNavigator` | CamelCase nicht zulässig | `ENERGY_NAVIGATOR` |
| `ZONE_1` | Zahlen vermeiden | `ZONE_FESTLAND` |
| `TMP_TEST` | Temporär-Präfix | nicht in Produktion |
| `WALD2` | Suffix-Zahl | `WALD_V2` nur wenn unbedingt nötig |
| `KÜSTE` | Umlaut | `KUESTE` |

---

## Kapitel 7 — Dateien

### 7.1 Schema

```
<bereich>_<fachlicher_name>_v<version>.<extension>
```

- `snake_case`
- Kein CamelCase
- Kein Datum im Namen
- Kein Leerzeichen
- Kein Sonderzeichen außer Unterstrich und Bindestrich vor der Endung
- Versionssuffix: `_v1`, `_v2`, `_v1.1` (keine Semver-Punkte im Dateinamen)

### 7.2 Beispiele

```
asset_icon_tree_v1.svg
world_festland_illustration_v1.webp
world_festland_illustration_v2.webp
method_energy_navigator_v1.json
method_energy_navigator_v1.1.json
standard_nw_std_001_v1.0.0.md
animation_water_loop_v1.json
texture_ground_subtle_v1.webp
font_dm_sans_regular_v1.woff2
```

### 7.3 Versionierung im Dateinamen

Wenn eine Datei ersetzt wird, erhält die neue Datei eine neue Versionsnummer. Die alte Datei bleibt erhalten (kein Überschreiben).

### 7.4 Verbotene Dateibenennung

| Verboten | Grund | Korrekt |
|---------|-------|---------|
| `Festland Illustration.png` | Leerzeichen, Großbuchstaben | `world_festland_illustration_v1.png` |
| `illustration_FINAL.png` | `FINAL` impliziert Endgültigkeit | `_v2` oder `_v3` |
| `bild_neu.png` | Deutsch, `neu` nicht stabil | Englisch, Versionsnummer |
| `illustration_2026-07-23.png` | Datum statt Version | `_v1` |
| `icon.svg` | Kein beschreibender Name | `asset_icon_mountain_v1.svg` |
| `FESTLAND.PNG` | Großbuchstaben | `world_festland_v1.png` |

---

## Kapitel 8 — Assets

### 8.1 Asset-Identifikation

Jedes Asset wird durch drei Felder eindeutig identifiziert:

| Feld | Format | Beispiel |
|------|--------|---------|
| `asset_type` | Freitext aus erlaubter Liste | `illustration` |
| `asset_code` | Business Code (Kapitel 6) | `WORLD_FESTLAND_ILLUSTRATION` |
| `asset_version` | Semver | `1.0.0` |

### 8.2 Erlaubte Asset-Typen

| Typ-Code | Bedeutung | Dateiformate |
|----------|-----------|-------------|
| `illustration` | Zonenbilder, Hintergründe | `.webp`, `.png`, `.svg` |
| `svg_icon` | Vektoricons | `.svg` |
| `logo` | Markenzeichen | `.svg`, `.png` |
| `animation` | Bewegte Grafik | `.json` (Lottie), `.webm` |
| `audio` | Klangelemente | `.mp3`, `.ogg` |
| `video` | Bewegtbild | `.mp4`, `.webm` |
| `font` | Schriftressourcen | `.woff2`, `.woff` |
| `texture` | Papier, Rauschen, Overlay | `.webp`, `.png` |
| `background` | Vollflächige Hintergründe | `.webp`, `.svg` |
| `component_asset` | UI-Komponenten-Grafiken | `.svg`, `.png` |

### 8.3 Asset-Code-Schema

```
<DOMÄNE>_<REGION_ODER_BEREICH>_<OBJEKTNAME>
```

Beispiele:

```
WORLD_FESTLAND_ILLUSTRATION
WORLD_WALD_ILLUSTRATION
WORLD_KUESTE_ILLUSTRATION
WORLD_MEER_ILLUSTRATION
WORLD_INSEL_ILLUSTRATION
ICON_ENERGY_WAVE_LEVEL_1
ICON_ENERGY_WAVE_LEVEL_2
ICON_ZONE_FESTLAND
ICON_ZONE_WALD
ICON_ZONE_MOUNTAIN
TEXTURE_PAPER_OVERLAY
LOGO_NEUROWAYS_PRIMARY
```

---

## Kapitel 9 — APIs

### 9.1 Endpunkte

```
/<version>/<bereich>/<ressource>
/<version>/<bereich>/<ressource>/<id>
/<version>/<bereich>/<ressource>/<id>/<sub-ressource>
```

- Ausschließlich Kleinbuchstaben
- Bindestriche als Trennzeichen (kebab-case)
- Keine Unterstriche in Pfaden
- Ressourcennamen im Plural
- Versionspräfix: `v1`, `v2`

Beispiele:

```
GET  /v1/methods
GET  /v1/methods/{id}
GET  /v1/methods/{id}/questions
POST /v1/check-ins
GET  /v1/check-ins/{id}/answers
GET  /v1/assets/{id}/files
GET  /v1/design/world-versions/{id}/regions
```

### 9.2 HTTP-Verben

| Verb | Bedeutung |
|------|-----------|
| `GET` | Lesen |
| `POST` | Neu erstellen |
| `PATCH` | Teilweises Aktualisieren |
| `PUT` | Vollständiges Ersetzen |
| `DELETE` | Löschen |

### 9.3 Events und Webhooks

```
<bereich>.<objekt>.<ereignis>
```

- Kleinbuchstaben
- Punkte als Trennzeichen
- Vergangenheitsform für abgeschlossene Ereignisse

Beispiele:

```
checkin.session.completed
method.version.published
asset.file.uploaded
world.region.updated
```

### 9.4 JSON-Felder in API-Payloads

Alle JSON-Felder in API-Antworten und -Anfragen verwenden `camelCase`:

```json
{
  "id": "abc123",
  "methodId": "xyz456",
  "resultCode": "festland",
  "totalScore": 12,
  "sessionDate": "2026-07-23",
  "createdAt": "2026-07-23T12:00:00Z"
}
```

### 9.5 Fehlercodes

```
NW-<BEREICH>-<DREISTELLIGE_NUMMER>
```

Beispiele:

```
NW-MTH-001  Methode nicht gefunden
NW-MTH-002  Methode ist nicht aktiv
NW-CHK-001  Check-in ist unvollständig
NW-CHK-002  Antwort außerhalb gültiger Optionen
NW-AST-001  Asset-Version nicht veröffentlicht
NW-STD-001  Naming-Verstoß erkannt
NW-SYS-001  Interner Systemfehler
```

---

## Kapitel 10 — Dokumente

### 10.1 Dokumentcode-Schema

```
NW-<BEREICHSCODE>-<DREISTELLIGE_NUMMER>
```

- `NW`: NeuroWays-Präfix, immer
- `BEREICHSCODE`: Dreistelliger Code (Kapitel 2)
- `NUMMER`: Dreistellig, nullaufgefüllt, fortlaufend pro Bereich

Beispiele:

```
NW-STD-001  Naming Standard (dieses Dokument)
NW-STD-002  Standards Registry Standard
NW-STD-003  Database Standard
NW-STD-004  Lifecycle Standard
NW-STD-005  Versioning Standard
NW-COR-001  Core Architecture
NW-DSN-001  World Design Standard
NW-DSN-002  Component Library Standard
NW-MTH-001  Method Definition Standard
NW-AUD-001  Audit Trail Standard
```

### 10.2 Versionierung von Dokumenten

Dokumente werden mit Semver versioniert:

- `MAJOR`: Inkompatible Änderung (bestehende Implementierungen müssen angepasst werden)
- `MINOR`: Rückwärtskompatible Erweiterung
- `PATCH`: Redaktionelle Korrekturen ohne inhaltliche Änderung

### 10.3 Dateinamen für Dokumente

```
nw-<bereichscode-lowercase>-<nummer>_<kurztitel>_v<version>.md
```

Beispiele:

```
nw-std-001_naming_standard_v1.0.0.md
nw-dsn-001_world_design_standard_v1.1.0.md
nw-mth-001_method_definition_standard_v1.0.0.md
```

### 10.4 Dokumentstatus

Dokumente verwenden die Standard-Statuswerte aus Kapitel 5.

---

## Kapitel 11 — Erweiterbarkeit

### 11.1 Neue Bereichscodes

Ein neuer Bereichscode entsteht durch:

1. Antrag mit dreistelligem Code-Vorschlag (eindeutig, nicht in Kapitel 2 gelistet)
2. Fachliche Begründung (mindestens ein Absatz)
3. Mindestens ein Beispielobjekt (`<CODE>_<OBJEKT>`)
4. Formale Aufnahme in NW-STD-001 als Minor-Update

### 11.2 Neue Objektarten in Collections

Neue Objektarten werden durch Anlegen einer neuen Collection nach dem Schema aus Kapitel 3 eingeführt. Sie erfordern keine Änderung an NW-STD-001, solange der Bereichscode bereits registriert ist.

### 11.3 Versionierung dieses Standards

| Änderungsart | Versionserhöhung |
|-------------|-----------------|
| Neuer Bereichscode | MINOR (`1.1.0`) |
| Neues Pflichtfeld | MAJOR (`2.0.0`) |
| Entfernen einer Regel | MAJOR (`2.0.0`) |
| Redaktionelle Korrektur | PATCH (`1.0.1`) |
| Neues Kapitel ohne Widersprüche | MINOR (`1.1.0`) |

### 11.4 Abwärtskompatibilität

- Bestehende Collections und Felder werden durch einen neuen Standard nicht automatisch ungültig.
- Neue Felder aus einer MINOR-Version sind optional, sofern nicht explizit als Pflicht markiert.
- MAJOR-Versionen definieren einen Migrationspfad in einem separaten Migrationsdokument.

### 11.5 Register führen

Alle offiziell registrierten Codes, Collections und Dokumentnummern werden in einem separaten Verzeichnis (`NW-COR-001` — noch zu erstellen) geführt.

---

## Kapitel 12 — Beispiele

### 12.1 Collections — positive Beispiele (✅)

| Beispiel | Begründung |
|---------|-----------|
| `MTH_METHODS` | Bereichscode + Plural + SCREAMING_SNAKE_CASE |
| `AST_ASSET_FILES` | Vollständiger Name, kein Kürzel |
| `DSN_WORLD_REGIONS` | Fachlich klar, Bereich eindeutig |
| `CHK_CHECKINS` | Plural, kein Datum |
| `STD_NAMING_RULES` | Verweist auf diesen Standard |
| `USR_USER_PROFILES` | Redundanz erlaubt für Klarheit (`USR_` + `USER_`) |
| `AUD_AUDIT_LOGS` | Bereich stimmt mit Inhalt überein |
| `CFG_FEATURE_FLAGS` | Plural, sprechend |
| `MTH_RESULT_RULES` | Bereich `MTH`, nicht `RUL` (kein eigener Bereich) |
| `DSN_DESIGN_TOKENS` | Bereich Design, Objekt Token im Plural |

### 12.2 Collections — negative Beispiele (❌)

| Beispiel | Fehler | Korrekt |
|---------|--------|---------|
| `methods` | Kein Bereichscode | `MTH_METHODS` |
| `MTH_Method` | CamelCase, Singular | `MTH_METHODS` |
| `MTH_METHODS_V2` | Versionsnummer | `MTH_METHODS` (Version im Feld) |
| `MTH_METHODS_2026` | Datum | `MTH_METHODS` |
| `XYZ_METHODS` | Unregistrierter Code | Registrierung zuerst |
| `METHODS_MTH` | Reihenfolge falsch | `MTH_METHODS` |
| `MTH_METHODEN` | Deutsch | `MTH_METHODS` |
| `TMP_METHODS` | `TMP` nicht registriert | `MTH_METHODS` |
| `MTH_M` | Zu kurz, kryptisch | `MTH_METHODS` |
| `CHK_check_ins` | Kleinbuchstaben | `CHK_CHECKINS` |

### 12.3 Felder — positive Beispiele (✅)

| Feldname | Begründung |
|---------|-----------|
| `asset_version_id` | Endet auf `_id`, klare Referenz |
| `is_primary` | Boolean mit `is_`-Präfix |
| `sort_order` | Standard-Feldname |
| `result_code` | Endet auf `_code`, fachlicher Bezeichner |
| `source_world_version_id` | Vollständiger, selbsterklärender Name |
| `created_at` | Standard, datetime |
| `has_attachment` | Boolean mit `has_`-Präfix |
| `resolution_variant` | Sprechend, kein Kürzel |
| `numeric_value` | Typ im Name, eindeutig |
| `observation_hint` | Fachlich klar, kein Kürzel |

### 12.4 Felder — negative Beispiele (❌)

| Feldname | Fehler | Korrekt |
|---------|--------|---------|
| `dt` | Kryptisch | `created_at` |
| `ts` | Kryptisch | `created_at` |
| `data` | Zu generisch | Fachlicher Name |
| `val` | Abkürzung | `numeric_value` |
| `typ` | Abkürzung, Deutsch | `asset_type` |
| `new_version` | `new` nicht stabil | Versionierung über Feld |
| `old_status` | `old` nicht stabil | `previous_status` oder weglassen |
| `flag` | Zu generisch | `is_active`, `is_primary` |
| `userID` | CamelCase | `user_id` |
| `CREATED` | Großbuchstaben | `created_at` |

### 12.5 Business Codes — positive Beispiele (✅)

| Code | Begründung |
|------|-----------|
| `ENERGY_NAVIGATOR` | Englisch, stabil, eindeutig |
| `WORLD_FESTLAND` | Domäne + fachlicher Begriff |
| `WORLD_KUESTE` | Umlaut korrekt umgeschrieben |
| `ICON_ZONE_MOUNTAIN` | Typ + Kontext + Objekt |
| `TOKEN_NW_WATER` | Vollständiger Bezeichner |
| `RULE_MOV_01` | Kurze Regel mit Kategorie |
| `ASSET_TEXTURE_PAPER` | Typ + Material |
| `METHOD_TRANSITIONS` | Domäne + fachlicher Name |
| `PROMPT_FESTLAND_V1` | Asset-Code mit Version erlaubt in Prompt-Kontext |
| `LOGO_NEUROWAYS_PRIMARY` | Marke + Variante |

### 12.6 Business Codes — negative Beispiele (❌)

| Code | Fehler | Korrekt |
|------|--------|---------|
| `energy-navigator` | Bindestrich | `ENERGY_NAVIGATOR` |
| `EnergyNavigator` | CamelCase | `ENERGY_NAVIGATOR` |
| `KÜSTE` | Umlaut | `KUESTE` |
| `ZONE_1` | Zahl statt Name | `ZONE_FESTLAND` |
| `world festland` | Leerzeichen | `WORLD_FESTLAND` |
| `TMP_ICON` | Temporär-Präfix | nicht in Produktion |
| `ICON!` | Sonderzeichen | `ICON_NAME` |
| `wELT` | Gemischte Schreibweise | `WELT` oder weglassen |
| `NEURO-WAYS` | Bindestrich | `NEUROWAYS` |
| `X1` | Nicht selbsterklärend | vollständiger Name |

### 12.7 Dateien — positive Beispiele (✅)

| Dateiname | Begründung |
|---------|-----------|
| `world_festland_illustration_v1.webp` | snake_case, Version, Endung |
| `icon_zone_mountain_v1.svg` | Kurz, eindeutig, Format |
| `animation_water_loop_v1.json` | Inhalt + Funktion + Version |
| `texture_paper_overlay_v1.webp` | Material + Zweck + Version |
| `nw-std-001_naming_standard_v1.0.0.md` | Dokumentformat, Semver |
| `method_energy_navigator_v1.json` | Bereich + Name + Version |
| `font_dm_sans_regular_v1.woff2` | Schrift + Stil + Version |
| `world_insel_illustration_v2.webp` | Neue Version, alte bleibt |
| `logo_neuroways_primary_v1.svg` | Marke + Variante + Version |
| `icon_energy_wave_level_3_v1.svg` | Vollständig beschreibend |

### 12.8 Dateien — negative Beispiele (❌)

| Dateiname | Fehler | Korrekt |
|---------|--------|---------|
| `Festland.PNG` | Großbuchstaben, kein Version | `world_festland_illustration_v1.png` |
| `illustration final.png` | Leerzeichen, `final` | `world_X_illustration_v2.png` |
| `bild_2026-07-23.jpg` | Datum statt Version | `world_X_v1.jpg` |
| `ICON.SVG` | Großbuchstaben | `icon_name_v1.svg` |
| `illustration_neu.png` | Deutsch | `_v2.png` |
| `tmp_test.svg` | Temporär-Präfix | nicht in Produktion |
| `icon` | Keine Endung | `icon_name_v1.svg` |
| `icon_v` | Unvollständige Version | `icon_name_v1.svg` |
| `world festland v1.png` | Leerzeichen | Unterstriche |
| `FestlandIllustration_v1.png` | CamelCase | `world_festland_illustration_v1.png` |

---

## Kapitel 13 — Offene Punkte und Abgrenzung

Folgende Themen werden in separaten Standards geregelt. Sie dürfen in diesem Standard nicht doppelt definiert werden.

### 13.1 Database Standard (NW-STD-003)

- Indexierungsregeln
- Fremdschlüssel und Integritätsprüfungen
- Migrationsstrategie für bestehende Collections
- Konkrete Felddatentypen (integer, varchar, uuid)
- Normalisierungsgrad
- Partitionierungsregeln

### 13.2 API Standard (NW-STD-011, noch zu erstellen)

- Authentifizierung und Autorisierung
- Rate Limiting
- Pagination-Konventionen
- Fehlerformat im Detail
- Versionierungsstrategie für Endpunkte
- OpenAPI-Spezifikation

### 13.3 Lifecycle Standard (NW-STD-004, noch zu erstellen)

- Übergangsregeln zwischen Statuswerten im Detail
- Genehmigungsworkflows
- Benachrichtigungen bei Statusübergängen
- Aufbewahrungsfristen für archivierte Daten

### 13.4 Versioning Standard (NW-STD-005, noch zu erstellen)

- Semver-Regeln im Detail
- Wie inkompatible Änderungen kommuniziert werden
- Rückwärtskompatibilitätsversprechen
- Deprecation-Prozess und Fristen

### 13.5 Audit Standard (NW-AUD-001, noch zu erstellen)

- Welche Ereignisse protokolliert werden müssen
- Format der Audit-Einträge
- Aufbewahrung und Zugriff

---

## Kritische Bewertung — Ist NW-STD-001 verabschiedungsreif?

### Stärken

- Vollständige Kapitelstruktur für alle genannten Bereiche
- Konsistente Schreibweiseregeln mit Negativbeispielen
- Klare Abgrenzung zu anderen Standards (keine Doppeldefinitionen)
- Erweiterbarkeit durch formales Antragsprinzip
- Migrationspfad für bestehende Felder explizit aufgeführt
- 50+ Beispiele mit Begründungen

### Dokumentierte Schwachstellen

**1. Keine formale Validierungsregel**
Der Standard beschreibt, wie Namen aussehen sollen, aber nicht, wie Verstöße erkannt und gemeldet werden. Ein automatisierbares Regelwerk (Regex, Checker-Tool) fehlt. → Empfehlung: NW-STD-001 Patch-Version mit maschinenlesbaren Validierungsregeln ergänzen.

**2. `name` vs. `title` nicht scharf genug getrennt**
Kapitel 4 definiert `name` als „maschinenlesbar" und `title` als „für Menschen", aber die Grenze ist nicht messbar. Beispiel: Ist `energy_navigator` ein `name` oder ein `code`? → Empfehlung: Beispiele mit Werten, nicht nur Feldnamen.

**3. Kein Register für vergebene Dokumentnummern**
NW-STD-001 ist Nummer 001 im STD-Bereich — aber es gibt noch kein Verzeichnis, das bestätigt, dass diese Nummer nicht bereits anderweitig vergeben wurde. → Empfehlung: Zentrales Nummernregister anlegen (NW-COR-001).

**4. API-Fehlercodes ohne vollständige Nummerierung**
Kapitel 9.5 definiert das Schema, aber keine vollständige Liste aller initialisierten Fehlercodes. → Folge-Dokument: NW-STD-011 (API Standard).

**5. Keine Aussage zu Mehrsprachigkeit in Asset-Codes**
Der Standard sagt, Englisch ist Pflicht — aber Asset-Codes wie `WORLD_KUESTE` sind Deutsch (phonetische Schreibweise eines deutschen Begriffs). Ist das eine Ausnahme oder ein Widerspruch? → Empfehlung: Explizite Ausnahmeregel für NeuroWays-Weltbegriffe ergänzen.

**6. Fehlende Interoperabilitätsregel**
Der Standard ist explizit plattformunabhängig — aber er definiert keine Aussage dazu, wie er mit externen Systemen (Drittsysteme, Exporte, Integrationen) umgeht, die eigene Konventionen haben. → Folge-Dokument: NW-STD-011 (API Standard).

### Gesamtbewertung

**Der Standard ist verabschiedungsfähig als Version 1.0.0 mit dem Status `review`.**

Er erfüllt alle zwölf geforderten Kapitel, enthält mehr als 50 dokumentierte Beispiele, grenzt sich klar von Folgestandards ab und benennt seine eigenen Schwachstellen explizit. Vor der endgültigen Freigabe (`published`) sollten mindestens Schwachstelle 5 (KUESTE-Ausnahme) und Schwachstelle 3 (Nummernregister) adressiert werden.

---

*NW-STD-001 — NeuroWays Naming Standard v1.0.1 — Status: published — Veröffentlicht 2026-07-23*

┌─────────────────────────────────────────────────
│ ./NW-STD-002-REGISTER.md
└─────────────────────────────────────────────────
# NeuroWays Standards Registry — Offizielles Verzeichnis

**Dokumentcode:** NW-STD-002-REGISTER  
**Version:** 1.0.0  
**Status:** published  
**Veröffentlicht:** 2026-07-23  
**Gültig ab:** 2026-07-23  
**Verantwortlich:** NeuroWays Core  
**Grundlage:** NW-STD-002 — Standards Registry Standard v1.0.1

---

## Änderungsverlauf

| Version | Datum | Änderung | Autor |
|---------|-------|----------|-------|
| 1.0.0 | 2026-07-23 | Erstanlage — Governance Foundation v1.0 veröffentlicht | NeuroWays Core |

---

## Registrierte Standards

### NW-STD-000 — Standards Framework Standard

| Feld | Wert |
|------|------|
| **Dokumentcode** | NW-STD-000 |
| **Titel** | NeuroWays Standards Framework Standard |
| **Kurzbeschreibung** | Übergeordneter Rahmen für alle NeuroWays-Standards: Lebenszyklus, Aufbau, Versionierung, Governance-Regeln |
| **Aktuelle Version** | 1.0.1 |
| **Status** | published |
| **Kategorie** | Core Standards |
| **Verantwortlicher** | NeuroWays Core |
| **Erstellt am** | 2026-07-23 |
| **Veröffentlicht am** | 2026-07-23 |
| **Verpflichtend** | ja — für alle Module |
| **Gültig ab** | 2026-07-23 |
| **Abhängigkeiten** | keine (Basisstandard) |
| **Wird referenziert von** | NW-STD-001, NW-STD-002, NW-STD-003 |
| **Supersedes** | – |
| **Superseded by** | – |

---

### NW-STD-001 — Naming Standard

| Feld | Wert |
|------|------|
| **Dokumentcode** | NW-STD-001 |
| **Titel** | NeuroWays Naming Standard |
| **Kurzbeschreibung** | Verbindliche Namenskonventionen für Collections, Felder, Codes, Dateien, APIs und Dokumente im gesamten NeuroWays-System |
| **Aktuelle Version** | 1.0.1 |
| **Status** | published |
| **Kategorie** | Core Standards |
| **Verantwortlicher** | NeuroWays Core |
| **Erstellt am** | 2026-07-23 |
| **Veröffentlicht am** | 2026-07-23 |
| **Verpflichtend** | ja — für alle technischen Bezeichner |
| **Gültig ab** | 2026-07-23 |
| **Abhängigkeiten** | NW-STD-000 (normativ) |
| **Wird referenziert von** | NW-STD-002, NW-STD-003 |
| **Supersedes** | – |
| **Superseded by** | – |
| **Bemerkungen** | Offene Punkte: Ausnahmeregel für NeuroWays-Weltbegriffe (KUESTE etc.) — wird in NW-STD-001 v1.1.0 adressiert |

---

### NW-STD-002 — Standards Registry Standard

| Feld | Wert |
|------|------|
| **Dokumentcode** | NW-STD-002 |
| **Titel** | NeuroWays Standards Registry Standard |
| **Kurzbeschreibung** | Regeln für das zentrale Verzeichnis aller NeuroWays-Standards: Nummernvergabe, Statusmodell, Veröffentlichungsprozess, Historienführung |
| **Aktuelle Version** | 1.0.1 |
| **Status** | published |
| **Kategorie** | Core Standards |
| **Verantwortlicher** | NeuroWays Core |
| **Erstellt am** | 2026-07-23 |
| **Veröffentlicht am** | 2026-07-23 |
| **Verpflichtend** | ja — für alle Standards und deren Verwaltung |
| **Gültig ab** | 2026-07-23 |
| **Abhängigkeiten** | NW-STD-000 (normativ) |
| **Wird referenziert von** | NW-STD-003 (informativ) |
| **Supersedes** | – |
| **Superseded by** | – |
| **Bemerkungen** | Bootstrap-Phase beendet durch diese Veröffentlichung. Schriftliche Freigabe durch NeuroWays Core Team erfolgt. |

---

### NW-STD-003 — Database Standard

| Feld | Wert |
|------|------|
| **Dokumentcode** | NW-STD-003 |
| **Titel** | NeuroWays Database Standard |
| **Kurzbeschreibung** | Plattformunabhängige Architekturregeln für alle NeuroWays-Datenmodelle: Objektidentität, Beziehungen, Integrität, Versionierung, Migration, Validierung |
| **Aktuelle Version** | 1.0.1 |
| **Status** | published |
| **Kategorie** | Core Standards |
| **Verantwortlicher** | NeuroWays Core |
| **Erstellt am** | 2026-07-23 |
| **Veröffentlicht am** | 2026-07-23 |
| **Verpflichtend** | ja — für alle Datenmodelle |
| **Gültig ab** | 2026-07-23 |
| **Abhängigkeiten** | NW-STD-000 (normativ), NW-STD-001 (normativ) |
| **Wird referenziert von** | – |
| **Supersedes** | – |
| **Superseded by** | – |
| **Bemerkungen** | Ausnahme: Bestehende Collections verwenden created/updated statt created_at/updated_at. Wird bei nächster MAJOR-Migration korrigiert. |

---

## Reservierte Nummern (planned / archiviert)

| Code | Titel | Status | Bemerkung |
|------|-------|--------|-----------|
| NW-STD-010 | Versioning Standard | planned | Phase 2 |
| NW-STD-011 | API Standard | planned | Phase 2 |
| NW-STD-012 | Security Standard | planned | Phase 3 |
| NW-STD-013 | Lifecycle Standard | planned | Phase 3 |
| NW-STD-030 | Coding Standard | planned | Phase 4 |
| NW-STD-031 | Testing Standard | planned | Phase 4 |
| NW-STD-050 | Design System Standard | planned | Phase 4 |
| NW-STD-051 | Accessibility Standard | planned | Phase 4 |
| NW-STD-070 | Document Standard | planned | Phase 5 |
| NW-GOV-001 | Standards Governance | planned | Phase 5 |

---

## Abhängigkeitsgraph

```
NW-STD-000 (Framework)
├── NW-STD-001 (Naming)       depends_on: NW-STD-000
├── NW-STD-002 (Registry)     depends_on: NW-STD-000
└── NW-STD-003 (Database)     depends_on: NW-STD-000, NW-STD-001

NW-DSN-001 (World Design)     informativ referenziert NW-STD-000
```

Keine zirkulären Abhängigkeiten. ✅

---

*NW-STD-002-REGISTER — NeuroWays Standards Registry v1.0.0 — Status: published — 2026-07-23*

┌─────────────────────────────────────────────────
│ ./NW-STD-002_STANDARDS_REGISTRY.md
└─────────────────────────────────────────────────
# NW-STD-002 — NeuroWays Standards Registry Standard

**Dokumentcode:** NW-STD-002  
**Version:** 1.0.1  
**Status:** published  
**Veröffentlicht:** 2026-07-23  
**Erstellt:** 2026-07-23  
**Gültig ab:** 2026-07-23  
**Verantwortlich:** NeuroWays Core  
**Hierarchie:** Core Standard — referenziert NW-STD-000 normativ  
**Ablöst:** –  
**Abgelöst durch:** –

---

## Änderungsverlauf

| Version | Datum | Änderung | Autor |
|---------|-------|----------|-------|
| 1.0.0 | 2026-07-23 | Erstfassung | NeuroWays Core |
| 1.0.0 | 2026-07-23 | Status: draft → review (Governance Review ausstehend) | NeuroWays Core |
| 1.0.1 | 2026-07-23 | NW-STD-003 Identität in Beispiel 11.6 als Database Standard korrigiert; Automatisierte Duplikatprüfung auf NW-GOV-001 umgezeigt; Bootstrap-Endkriterium operationalisiert | Governance Review (Konflikte A, D) | Governance Review 2026-07-23 |
| 1.0.1 | 2026-07-23 | Status: review → approved → published. Erste offizielle Veröffentlichung. Bootstrap-Phase beendet. | Veröffentlichungsreihenfolge Governance Foundation v1.0 | NeuroWays Core 2026-07-23 |

---

## Referenzen

| Dokument | Titel | Art |
|---------|-------|-----|
| NW-STD-000 | Standards Framework Standard | normativ |
| NW-STD-001 | Naming Standard | informativ |
| NW-STD-010 | Versioning Standard | informativ (geplant) |
| NW-STD-014 | Lifecycle Standard | informativ (geplant) |
| NW-GOV-001 | Standards Governance | informativ (geplant) |

---

## Geltungsbereich

Dieser Standard gilt für alle NeuroWays-Standards, Governance-Dokumente und sonstigen normativen Dokumente, die im NeuroWays-System eine offizielle Rolle übernehmen.

Er gilt unabhängig von Plattform, Datenbanksystem oder Ablageort.

**Kein Standard gilt als offiziell veröffentlicht, solange er nicht im Registry eingetragen ist.**

---

## Offene Punkte

| Punkt | Beschreibung | Vorgesehen in |
|-------|-------------|---------------|
| Technische Implementierung | Datenbankmodell, API-Endpunkte für Registry | NW-STD-011, NW-STD-012 |
| Zugriffskontrolle | Wer darf Einträge anlegen, ändern, archivieren? | NW-GOV-001 |
| Automatisierte Duplikatprüfung | Werkzeug zur Prüfung vor Nummerneintragung | NW-GOV-001 |
| Benachrichtigungen | Wer wird informiert, wenn ein Standard seinen Status ändert? | NW-GOV-002 |

---

## Kapitel 1 — Zweck des Standardregisters

### 1.1 Definition

Das NeuroWays Standards Registry ist das zentrale, autoritative Verzeichnis aller NeuroWays-Standards. Es ist die einzige offizielle Quelle für:

- die Existenz eines Standards
- die aktuell gültige Version
- den aktuellen Status
- alle historischen Versionen
- die Abhängigkeiten zwischen Standards
- die Verbindlichkeit eines Standards

### 1.2 Verbindlichkeit des Registrierungsprinzips

Ein Standard gilt unter folgenden Bedingungen **nicht** als offiziell:

- kein Eintrag im Registry
- Eintrag vorhanden, aber Status `planned` oder `draft`
- Eintrag vorhanden, Status `published`, aber kein Freigabedatum eingetragen

Ein Standard gilt als offiziell veröffentlicht, wenn:

- ein Eintrag im Registry mit Status `published` existiert
- ein Freigabedatum eingetragen ist
- die aktuelle Version mit dem Dokument übereinstimmt

### 1.3 Das Registry als Governance-Instrument

Das Registry ist kein technisches Werkzeug — es ist ein Governance-Instrument. Es schafft Transparenz über den Zustand des gesamten Standards-Systems und ermöglicht es jedem Beteiligten, auf einen Blick zu erkennen:

- Welche Standards gelten heute?
- Was ist veraltet?
- Was ist in Arbeit?
- Worauf baut dieser Standard auf?

### 1.4 Autorität

Das Registry hat Vorrang vor einzelnen Standarddokumenten. Wenn ein Dokument sich selbst als `published` bezeichnet, aber der Registereintrag `draft` zeigt, gilt der Registereintrag.

---

## Kapitel 2 — Verwaltete Objekte

Das Registry verwaltet Standards aus folgenden Kategorien. Die Nummerierungsbereiche sind verbindlich.

| Kategorie | Präfix | Nummerierungsbereich | Beschreibung |
|-----------|--------|----------------------|--------------|
| Core Standards | `NW-STD` | 000–009 | Fundament aller anderen Standards |
| Architecture Standards | `NW-STD` | 010–019 | Versioning, Datenhaltung, Systemprinzipien |
| Database Standards | `NW-STD` | 020–029 | Datenbankkonventionen und -struktur |
| API Standards | `NW-STD` | 030–039 | Schnittstellendefinition und -verhalten |
| Development Standards | `NW-STD` | 040–059 | Quelltext, Tests, Abhängigkeiten |
| Design Standards | `NW-STD` | 060–069 | Designsystem, visuelle Sprache |
| Accessibility Standards | `NW-STD` | 070–079 | Barrierefreiheit |
| Security Standards | `NW-STD` | 080–089 | Sicherheit, Datenschutz |
| Asset Standards | `NW-STD` | 090–099 | Medienverwaltung, Illustrationen |
| Testing Standards | `NW-STD` | 100–109 | Qualitätssicherung |
| Lifecycle Standards | `NW-STD` | 110–119 | Lebenszyklus von Objekten |
| Documentation Standards | `NW-STD` | 120–129 | Textstruktur, Dokumentenstandards |
| Quality Standards | `NW-STD` | 130–139 | Audit, Compliance |
| Governance Standards | `NW-GOV` | 001–099 | Organisatorische Abläufe, Rollen |
| Future Standards | alle | reserviert | Platzhalter für noch unbenannte Bereiche |

**Hinweis zur Abweichung von NW-STD-000:** NW-STD-000 verwendet andere Nummerierungsbereiche (z. B. Technical 010–029). Diese Abweichung ist ein bekannter Widerspruch, der mit NW-STD-000 v1.1.0 aufgelöst wird. Bis dahin gilt NW-STD-002 als maßgeblich für Nummerierungsbereiche.

---

## Kapitel 3 — Eindeutigkeit

### 3.1 Grundregel

Jede Standardnummer darf innerhalb ihres Präfix-Bereichs genau einmal vergeben werden.

```
NW-STD-001  →  belegt durch Naming Standard
NW-STD-001  →  darf niemals für einen anderen Standard vergeben werden
```

### 3.2 Permanenz reservierter Nummern

Eine Nummer ist reserviert, sobald sie im Registry eingetragen ist — unabhängig davon, ob ein Dokument existiert. Sie bleibt dauerhaft reserviert, auch wenn:

- der Standard archiviert wird
- der Standard nie das Stadium `draft` verlässt
- der Standard durch einen anderen ersetzt wird

### 3.3 Verbot der Wiederverwendung

Gelöschte, archivierte oder aufgegebene Nummern dürfen **niemals** neu vergeben werden. Nummern sind Identitäten, keine Ressourcen.

```
Falsch:  NW-STD-005 wird archiviert → NW-STD-005 für neues Thema verwenden
Richtig: NW-STD-005 bleibt im Registry als archiviert → neues Thema erhält NW-STD-006
```

### 3.4 Lücken sind erlaubt

Lücken in der Nummernfolge entstehen, wenn Platzhalter reserviert werden oder Nummern archiviert wurden. Lücken sind kein Fehler.

```
NW-STD-011  ✅ Database Standard
NW-STD-012  🔲 reserviert (planned)
NW-STD-013  ✅ Security Standard
```

### 3.5 Historische Standards

Archivierte Standards bleiben vollständig im Registry dokumentiert. Ihre Einträge werden niemals gelöscht. Sie sind erkennbar an Status `archived` und einem Archivierungsdatum.

---

## Kapitel 4 — Pflichtinformationen eines Registereintrags

Jeder Eintrag im Registry enthält exakt folgende Felder. Fehlende Pflichtfelder verhindern die Registrierung.

| Feld | Pflicht | Format | Beschreibung |
|------|---------|--------|--------------|
| `standard_code` | ✅ | `NW-STD-000` | Eindeutiger Code, dauerhaft unveränderlich |
| `title` | ✅ | Freitext | Offizieller Titel des Standards |
| `short_description` | ✅ | Max. 255 Zeichen | Einzeiliger Zweck des Standards |
| `current_version` | ✅ | Semver | Aktuell gültige Version |
| `status` | ✅ | Statuswert (Kapitel 5) | Aktueller Status |
| `category` | ✅ | Kategoriecode (Kapitel 2) | Fachliche Zuordnung |
| `owner` | ✅ | Name / Team | Verantwortliche Instanz |
| `maintainer` | ✅ | Name / Team | Pflegende Person oder Team |
| `created_at` | ✅ | ISO-Datum | Datum des ersten Registereintrags |
| `published_at` | bedingt | ISO-Datum | Pflicht, wenn Status `published` |
| `archived_at` | bedingt | ISO-Datum | Pflicht, wenn Status `archived` |
| `supersedes` | optional | `NW-STD-XXX` | Standard, den dieser ersetzt |
| `superseded_by` | optional | `NW-STD-XXX` | Standard, der diesen ersetzt |
| `depends_on` | optional | Liste von Codes | Normative Abhängigkeiten |
| `is_mandatory` | ✅ | ja / nein / bedingt | Verbindlichkeit |
| `mandatory_for` | bedingt | Freitext | Pflicht, wenn `is_mandatory = bedingt` |
| `valid_from` | optional | ISO-Datum | Ab wann der Standard gilt |
| `valid_to` | optional | ISO-Datum | Bis wann der Standard gilt |
| `remarks` | optional | Freitext | Hinweise, Ausnahmen, Kontext |

### 4.1 Unveränderliche Felder nach Veröffentlichung

Nach Erreichen von Status `published` dürfen folgende Felder nicht mehr verändert werden:

- `standard_code`
- `title` (Titeländerungen → neue Version)
- `category`
- `created_at`

Folgende Felder dürfen kontrolliert ergänzt oder geändert werden:

- `status` (nur in zulässige Richtung)
- `superseded_by`
- `archived_at`
- `remarks`

---

## Kapitel 5 — Statusmodell

### 5.1 Statuswerte

| Status | Bedeutung | Fachliche Inhalte änderbar | Nächste mögliche Status |
|--------|-----------|---------------------------|------------------------|
| `planned` | Nummer reserviert, kein Dokument | — | `draft`, `archived` |
| `draft` | Dokument in Erstellung | ✅ ja | `review`, `archived` |
| `review` | Zur Prüfung eingereicht | ⚠️ nur Korrekturen | `approved`, `draft`, `archived` |
| `approved` | Inhaltlich freigegeben | ❌ nein | `published`, `draft` (Ausnahme) |
| `published` | Aktiv und verbindlich | ❌ nein | `superseded`, `archived` |
| `superseded` | Durch neuere Version abgelöst | ❌ nein | `archived` |
| `archived` | Historisch, nicht mehr anwendbar | ❌ nein | – (terminal) |
| `deprecated` | Noch verwendbar, Ablösung angekündigt | ❌ nein | `superseded`, `archived` |

### 5.2 Zulässige Statusübergänge

```
planned ──→ draft ──→ review ──→ approved ──→ published ──→ superseded ──→ archived
                │          │                       │
                │          └──→ draft              └──→ archived
                │
                └──→ archived

published ──→ deprecated ──→ superseded ──→ archived
```

### 5.3 Nicht zulässige Übergänge

- `published` → `draft` (Inhalt ist eingefroren; neue Version starten)
- `archived` → jeder andere Status
- Überspringen von `review` und `approved` außer bei Patch-Korrekturen
- `superseded` → `published`

### 5.4 Status `approved` als eigenständige Stufe

`approved` ist bewusst eine eigene Stufe zwischen Review und Veröffentlichung. Ein Standard kann inhaltlich genehmigt sein, ohne sofort zu gelten — zum Beispiel wenn die Veröffentlichung zu einem bestimmten Zeitpunkt oder gleichzeitig mit einem anderen Standard erfolgen soll.

### 5.5 Verweis auf NW-STD-014

Die detaillierten Übergangsregeln, Fristen und Genehmigungsworkflows werden im Lifecycle Standard (NW-STD-014) geregelt. Dieser Standard legt nur die zulässigen Statuswerte fest.

---

## Kapitel 6 — Nummernvergabe

### 6.1 Wer vergibt Nummern

Nummern werden ausschließlich durch die verantwortliche Registry-Instanz vergeben. Solange NW-GOV-001 noch nicht existiert, ist die Registry-Instanz das NeuroWays Core Team.

Kein Einzelner darf eine Nummer selbst vergeben. Jeder Antrag durchläuft den Vergabeprozess.

### 6.2 Wann Nummern reserviert werden

Eine Nummer wird reserviert, wenn:

- ein begründeter Bedarf für einen neuen Standard besteht
- ein Antrag mit Titel, Kurzbeschreibung und Kategorie vorliegt
- kein Widerspruch zu bestehenden Standards erkennbar ist

Der Standard muss zu diesem Zeitpunkt noch nicht existieren. Die Reservierung schafft einen Platzhalter mit Status `planned`.

### 6.3 Wann Nummern endgültig vergeben werden

Eine Nummer gilt als endgültig vergeben, sobald der Registereintrag angelegt wurde — unabhängig vom Status. Endgültig bedeutet: dauerhaft und unwiderruflich dieser Bedeutung zugeordnet.

### 6.4 Wann Nummern archiviert werden

Eine Nummer wird archiviert, wenn:

- der zugehörige Standard vollständig durch einen anderen ersetzt wurde
- der Standard seinen Geltungsbereich verloren hat
- der Standard nie fertiggestellt wurde und kein Bedarf mehr besteht

Archiviert bedeutet: der Eintrag bleibt, die Nummer ist dauerhaft blockiert.

### 6.5 Niemals neu vergeben

Eine Nummer darf unter keinen Umständen neu vergeben werden, auch nicht wenn:

- der Standard inhaltlich leer ist
- der Standard niemals den Status `draft` erreicht hat
- die Nummer versehentlich reserviert wurde
- das Thema aufgegeben wurde

Ausnahme: Reservierungen innerhalb der ersten 30 Tage können mit begründeter Entscheidung der Registry-Instanz freigegeben und dem gleichen Thema unter neuer Nummer erneut zugewiesen werden. In diesem Fall wird die ursprüngliche Nummer mit Status `archived` und Vermerk „früh freigegeben, nie genutzt" dokumentiert.

---

## Kapitel 7 — Beziehungen zwischen Standards

### 7.1 Beziehungstypen

| Beziehung | Beschreibung | Richtung |
|-----------|-------------|---------|
| `supersedes` | Dieser Standard löst einen anderen ab | A → B (A ersetzt B) |
| `superseded_by` | Dieser Standard wurde durch einen anderen abgelöst | A → B (A wurde durch B ersetzt) |
| `depends_on` | Dieser Standard setzt einen anderen voraus | A → B (A braucht B) |
| `related_to` | Inhaltliche Verwandtschaft ohne Abhängigkeit | A ↔ B |
| `referenced_by` | Andere Standards verweisen auf diesen | B → A |

### 7.2 Verbot zyklischer Abhängigkeiten

Normative Abhängigkeiten dürfen keine Zyklen bilden:

```
Verboten:
A depends_on B
B depends_on A

Auch verboten (transitiv):
A depends_on B
B depends_on C
C depends_on A
```

Erlaubt: Mehrere Standards können denselben dritten Standard als Abhängigkeit haben.

### 7.3 NW-STD-000 als universelle Basis

NW-STD-000 darf von allen Standards als normative Abhängigkeit eingetragen werden, ohne selbst eine Abhängigkeit zu anderen Standards zu haben. NW-STD-000 steht außerhalb des Zirkulärverbots — jedoch nur für eingehende Abhängigkeiten.

### 7.4 Abhängigkeitsgraph

Der vollständige Abhängigkeitsgraph aller registrierten Standards wird als Teil des Registry geführt. Er wird bei jeder neuen Registrierung oder Statusänderung aktualisiert. Zirkuläre Abhängigkeiten werden vor jeder Registrierung geprüft.

### 7.5 Propagation von Statusänderungen

Wenn ein Standard seinen Status ändert, wird geprüft:

- Welche anderen Standards haben eine normative Abhängigkeit auf diesen?
- Werden diese durch die Statusänderung in ihrer Konformität beeinträchtigt?

Eine automatische Statusänderung abhängiger Standards erfolgt **nicht** — aber ein Warnhinweis wird im Registry vermerkt.

---

## Kapitel 8 — Versionen im Registry

### 8.1 Aktuelle Version

Im Registry ist immer genau eine Version als `current` markiert. Diese Version entspricht dem zuletzt veröffentlichten Dokument.

### 8.2 Historische Versionen

Alle früheren Versionen eines Standards bleiben im Registry dokumentiert. Sie erhalten den Status des Zeitpunkts ihrer Ablösung (`superseded`) und das Datum, zu dem die neue Version übernommen wurde.

### 8.3 Welche Version darf veröffentlicht werden

Eine Version darf im Registry als `published` eingetragen werden, wenn:

- das zugehörige Dokument vollständig ist (alle Pflichtabschnitte nach NW-STD-000 Kap. 4)
- der Status `approved` erreicht wurde
- kein offener Widerspruch zu anderen veröffentlichten Standards besteht

### 8.4 Verweis auf NW-STD-010

Die genauen Regeln zu Semver, Abwärtskompatibilitätsversprechen und Deprecation-Fristen werden im Versioning Standard (NW-STD-010) geregelt.

---

## Kapitel 9 — Veröffentlichungsprozess

### 9.1 Vollständiger Ablauf

```
Schritt 1: Bedarf erkennen
  → Kurzbeschreibung und Kategorie formulieren
  → Antrag an Registry-Instanz stellen

Schritt 2: Nummer reservieren
  → Registry-Instanz prüft Eindeutigkeit und Kategorie
  → Eintrag mit Status "planned" wird angelegt

Schritt 3: Entwurf erstellen
  → Dokument nach NW-STD-000 Kap. 4 erstellen
  → Status im Registry: "draft"

Schritt 4: Interne Prüfung
  → Widersprüche zu bestehenden Standards prüfen
  → Abhängigkeiten eintragen
  → Qualitätskriterien nach NW-STD-000 Kap. 10 prüfen

Schritt 5: Review
  → Status im Registry: "review"
  → Mindestens eine Prüfperson außerhalb der Autorenschaft

Schritt 6: Freigabe
  → Status im Registry: "approved"
  → Freigabedatum eingetragen

Schritt 7: Veröffentlichung
  → Status im Registry: "published"
  → Freigabedatum = Veröffentlichungsdatum
  → Abhängige Standards werden benachrichtigt

Schritt 8: Ersetzung (wenn nötig)
  → Neuer Standard wird veröffentlicht
  → Alter Standard: Status "superseded", "superseded_by" eingetragen

Schritt 9: Archivierung
  → Status im Registry: "archived"
  → Archivierungsdatum eingetragen
  → Eintrag bleibt dauerhaft erhalten
```

### 9.2 Vereinfachter Prozess für Patch-Versionen

Rein redaktionelle Korrekturen (Tippfehler, Formatierung) dürfen mit einem vereinfachten Prozess veröffentlicht werden:

- `draft` → `review` → `published` (kein `approved` erforderlich)
- Mindestens eine Prüfperson bestätigt die Änderung
- Status im Registry: sofort von `review` auf `published`

### 9.3 Blockierende Bedingungen

Folgende Bedingungen verhindern eine Veröffentlichung:

- Offener Widerspruch zu einem anderen veröffentlichten Standard
- Fehlende Pflichtabschnitte im Dokument
- Kein Registereintrag
- Zirkuläre Abhängigkeit erkannt

---

## Kapitel 10 — Registerstruktur (fachlich)

Das Registry besteht fachlich aus folgenden Bestandteilen. Dies ist keine Datenbankmodellierung — sondern eine Beschreibung der Informationsstruktur.

### 10.1 Registry (Gesamtverzeichnis)

Das Gesamtverzeichnis aller jemals reservierten Nummern. Es enthält jeden Standard, der jemals existiert hat — unabhängig von Status, Vollständigkeit oder Archivierungszustand.

Eigenschaften: vollständig, unveränderlich in der Nummernspalte, dauerhaft.

### 10.2 Registereinträge

Jeder Eintrag entspricht einem Standard. Er enthält alle Pflichtinformationen aus Kapitel 4. Er ist die maßgebliche Quelle für Status und Version — nicht das Dokument selbst.

### 10.3 Versionshistorie

Für jeden Registereintrag wird eine vollständige Versionshistorie geführt. Sie dokumentiert:

- alle früheren Versionen mit Status und Datum
- wann welche Version aktuell war
- welche Version welche abgelöst hat

### 10.4 Änderungsprotokoll

Das Änderungsprotokoll dokumentiert alle Änderungen am Registry selbst:

- neue Einträge
- Statusänderungen
- Versionsänderungen
- Korrekturen an Registerdaten

Es enthält Zeitstempel und handelnde Person.

### 10.5 Referenzen

Für jeden Eintrag werden alle Beziehungen zu anderen Standards gespeichert (Kapitel 7). Das ermöglicht die Darstellung des vollständigen Abhängigkeitsgraphen.

### 10.6 Abhängigkeitsgraph

Eine abgeleitete Sicht auf alle `depends_on`-Beziehungen im Gesamtsystem. Wird automatisch aus den Referenzeinträgen berechnet. Zirkuläre Pfade werden hervorgehoben.

---

## Kapitel 11 — Beispiele

### 11.1 Gültige Registereinträge (✅)

| Beispiel | Begründung |
|---------|-----------|
| NW-STD-000, Status `published`, Freigabedatum eingetragen | Vollständig, Pflichtfelder gesetzt |
| NW-STD-001, Status `review`, kein Freigabedatum | Korrekt — Freigabedatum ist erst bei `published` Pflicht |
| NW-STD-005, Status `planned`, kein Dokument | Nummer reserviert, noch kein Inhalt — zulässig |
| NW-STD-011, depends_on: NW-STD-001 | Einseitige Abhängigkeit, keine Zirkularität |
| NW-STD-010 superseded_by NW-STD-010b | Ablösung korrekt dokumentiert |
| NW-STD-010, Status `archived`, Archivierungsdatum gesetzt | Korrekte Archivierung |
| NW-GOV-001, Kategorie `governance`, Präfix `NW-GOV` | Governance-Standard korrekt getrennt |
| NW-STD-001 is_mandatory: `bedingt`, mandatory_for: `alle technischen Collections` | Bedingte Verbindlichkeit korrekt dokumentiert |
| NW-STD-020, Patch 1.0.1, Tippfehlerkorrektur | PATCH-Version im Registry eingetragen |
| NW-STD-030 v2.0.0, Migrationspfad im Dokument, MAJOR eingetragen | MAJOR-Wechsel korrekt registriert |

### 11.2 Ungültige Registereinträge (❌)

| Beispiel | Fehler | Korrekt |
|---------|--------|---------|
| NW-STD-001 doppelt vergeben (für Naming und für Coding) | Nummernkollision | Coding erhält eigene Nummer |
| NW-STD-015, Status `published`, kein Freigabedatum | Pflichtfeld fehlt | Freigabedatum nachtragen |
| NW-STD-022 ohne Kategorie | Pflichtfeld fehlt | Kategorie eintragen |
| NW-STD-007 nach Archivierung neu vergeben | Wiederverwendung verboten | Neue Nummer vergeben |
| NW-STD-A depends_on NW-STD-B, NW-STD-B depends_on NW-STD-A | Zirkuläre Abhängigkeit | Abhängigkeit neu gestalten |
| NW-STD-018 ohne short_description | Pflichtfeld fehlt | Kurzbeschreibung ergänzen |
| Standard außerhalb des Registry als veröffentlicht bezeichnet | Registry-Prinzip verletzt | Zuerst registrieren |
| NW-STD-001 v1.0.0 und v1.1.0 beide als `current` markiert | Eindeutigkeit verletzt | Nur eine Version ist `current` |
| NW-STD-009, owner leer | Pflichtfeld fehlt | Owner eintragen |
| Status `published` → `draft` gesetzt | Unzulässiger Übergang | Neue Version starten |

### 11.3 Doppelvergabe (❌)

```
Versuch: NW-STD-001 für neuen "Component Standard" vergeben
Ergebnis: Abgelehnt
Grund: NW-STD-001 ist dauerhaft dem Naming Standard zugeordnet
Lösung: NW-STD-001 bleibt Naming Standard → Component Standard erhält NW-STD-XXX
```

### 11.4 Versionswechsel (✅)

```
NW-STD-011 v1.0.0 → published → wird durch v2.0.0 abgelöst
Registry-Eintrag NW-STD-011:
  current_version: 2.0.0
  status: published
  published_at: 2027-01-15
Versionshistorie:
  v1.0.0: status superseded, superseded_at: 2027-01-15
  v2.0.0: status published, published_at: 2027-01-15
```

### 11.5 Ersetzung (✅)

```
NW-STD-014 (Lifecycle Standard) wird durch zwei neue Standards ersetzt:
  NW-STD-114a (Entity Lifecycle)
  NW-STD-114b (Document Lifecycle)

Registry-Einträge:
  NW-STD-014: status superseded, superseded_by: NW-STD-114a + NW-STD-114b
  NW-STD-114a: status published, supersedes: NW-STD-014 (teilweise)
  NW-STD-114b: status published, supersedes: NW-STD-014 (teilweise)
```

### 11.6 Archivierung (✅)

```
NW-STD-099 (Beispiel-Platzhalter) wird nie fertiggestellt:
  Status: planned → archived
  archived_at: 2027-06-01
  remarks: "Thema in bestehenden Standards abgedeckt, eigenständiger Standard nicht nötig"
  Nummer NW-STD-099: dauerhaft blockiert, niemals neu vergeben
```

### 11.7 Neue Kategorie (✅)

```
Bedarf: Internationalisierungsstandard
Antrag: NW-STD-XXX, Kategorie "Internationalization"
Prüfung: Kategorie noch nicht vorhanden → Registry-Instanz prüft und ergenehmigt neue Kategorie
Registrierung: NW-STD-140 (nächste freie Nummer im neuen Bereich 140–149)
Status: planned
```

### 11.8 Frühe Freigabe einer Reservierung (Ausnahme)

```
NW-STD-008 wurde versehentlich reserviert für "Monolith Standard"
Entscheidung: Thema irrelevant, Reservierung innerhalb 15 Tagen
Registry-Eintrag NW-STD-008: status archived, remarks "Früh freigegeben (15 Tage), nie genutzt"
Neues Thema erhält neue Nummer NW-STD-009
```

---

## Kapitel 12 — Beziehungen zu bestehenden Standards

### 12.1 Beziehung zu NW-STD-000

NW-STD-000 definiert, was ein Standard ist und wie er aufgebaut sein muss. NW-STD-002 setzt NW-STD-000 voraus und konkretisiert, wie Standards zentral verwaltet werden.

| Beziehung | Beschreibung |
|-----------|-------------|
| NW-STD-002 depends_on NW-STD-000 | normativ |
| NW-STD-000 referenced_by NW-STD-002 | informativ |

**Priorität:** NW-STD-002 erweitert NW-STD-000 — es gibt keinen Widerspruch. Die in NW-STD-000 genannten Nummerierungsbereiche weichen von NW-STD-002 ab (bekannte Inkonsistenz, wird mit NW-STD-000 v1.1.0 aufgelöst).

### 12.2 Beziehung zu NW-STD-001

NW-STD-001 regelt Namenskonventionen. NW-STD-002 nutzt diese Konventionen für die Bezeichnung von Registry-Feldern und Statuswerten, stellt aber keine normativen Anforderungen an Feldnamen — da NW-STD-002 noch keine technische Implementierung beschreibt.

| Beziehung | Beschreibung |
|-----------|-------------|
| NW-STD-002 related_to NW-STD-001 | informativ |

### 12.3 Beziehung zu zukünftigen Standards

| Standard | Beziehung |
|---------|-----------|
| NW-STD-010 (Versioning) | Wird von NW-STD-002 referenziert für Semver-Regeln |
| NW-STD-011 (Database) | Technische Implementierung des Registry als Datenbankstruktur |
| NW-STD-014 (Lifecycle) | Übergangsregeln und Genehmigungsworkflows |
| NW-GOV-001 (Governance) | Definiert Registry-Instanz und Vergabeprozess |

---

## Kapitel 13 — Überführung in technische Systeme

### 13.1 Grundsatz

Das fachliche Modell dieses Standards ist technologieneutral. Die Überführung in konkrete Systeme erfolgt in separaten technischen Dokumenten.

### 13.2 Überführung in eine relationale Datenbank

Das fachliche Modell des Registry lässt sich direkt in relationale Tabellen überführen:

**Kerntabellen (fachlich):**
- Registereinträge (ein Datensatz pro Standardnummer)
- Versionshistorie (ein Datensatz pro Version pro Standard)
- Beziehungen (Verknüpfungstabelle für depends_on, supersedes etc.)
- Änderungsprotokoll (Audit-Tabelle für alle Registry-Änderungen)

Jede Tabelle enthält mindestens die Pflichtfelder aus Kapitel 4. Eindeutigkeitsconstraints erzwingen die Eindeutigkeit der Standardnummern auf Datenbankebene.

Die konkrete Benennung der Tabellen und Felder folgt NW-STD-001 (Naming Standard) und NW-STD-011 (Database Standard, sobald verfügbar).

### 13.3 Überführung in STRATO (aktuelle Plattform)

In der aktuellen NeuroWays-Entwicklungsumgebung wäre das Registry als eigene Collection umsetzbar:

**Minimale Collection-Struktur (nach NW-STD-001):**
- `STD_REGISTRY` — Haupttabelle der Registereinträge
- `STD_REGISTRY_VERSIONS` — Versionshistorie
- `STD_REGISTRY_RELATIONS` — Abhängigkeiten und Beziehungen
- `STD_REGISTRY_CHANGELOG` — Änderungsprotokoll

Die Implementierung erfolgt nach Freigabe von NW-STD-011. Bis dahin wird das Registry als Markdown-Dokument (NW-STD-002-REGISTER.md) geführt.

### 13.4 Überführung in Oracle APEX

Oracle APEX ist eine webbasierte Low-Code-Plattform, die sich für ein Verwaltungsinterface des Registry gut eignet:

**Architekturbild:**
- Relationale Oracle-Datenbank als Datenquelle
- APEX-Formulare für Registereinträge (Anlegen, Bearbeiten, Statusübergang)
- APEX-Berichte für Übersichten (nach Kategorie, Status, Abhängigkeit)
- APEX Interactive Report für den Abhängigkeitsgraph

Die Überführung in Oracle APEX setzt voraus:
- Abgeschlossenes Datenbankmodell (NW-STD-011)
- Definierte Zugriffsrollen (NW-GOV-001)
- API-Schnittstelle für externe Lesesysteme (NW-STD-012)

Bis zur Überführung bleibt das Registry versioniert in Dokumentform.

---

## Definitionen

| Begriff | Definition |
|---------|-----------|
| **Registry** | Das zentrale, autoritative Verzeichnis aller NeuroWays-Standards |
| **Registereintrag** | Ein einzelner Datensatz im Registry für einen Standard |
| **Nummer** | Der eindeutige, unveränderliche Code eines Standards (z. B. `NW-STD-001`) |
| **Reservierung** | Das Anlegen eines Registereintrags vor Existenz eines Dokuments |
| **Veröffentlichung** | Der Übergang eines Standards auf Status `published` im Registry |
| **Archivierung** | Das dauerhafte Einfrieren eines Standards mit Status `archived` |
| **Registry-Instanz** | Die verantwortliche Person oder das Team, das Nummern vergibt |
| **Abhängigkeitsgraph** | Die vollständige Darstellung aller `depends_on`-Beziehungen |
| **Zirkuläre Abhängigkeit** | Eine Kette von Abhängigkeiten, die zu einem Standard zurückführt |

---

## Ausnahmen

| Ausnahme | Begründung | Gültig bis |
|---------|-----------|------------|
| NW-DSN-001 ist nicht nach NW-STD-000 Kap. 4 strukturiert | Entwickelt vor NW-STD-000 | Bis zur nächsten MINOR-Version von NW-DSN-001 |
| NW-STD-000 und NW-STD-001 gelten provisorisch als veröffentlicht (Bootstrap Phase) | Vorhühnerei-Problem: Registry muss existieren, bevor Standards registriert werden können. Die Bootstrap-Phase beginnt mit der Erstellung von NW-STD-002 und endet eindeutig und einmalig, wenn NW-STD-002 von mindestens zwei Personen des NeuroWays Core Teams schriftlich freigegeben und der Status auf `published` gesetzt wurde. Die Bootstrap-Phase kann danach niemals erneut aktiviert werden. | Bootstrap Phase beendet durch: NW-STD-002 status = published + schriftliche Freigabe durch zwei Core-Team-Mitglieder |

---

## Qualitätsprüfung

| Kriterium | Prüfmethode | Bestanden |
|-----------|------------|-----------|
| Alle Pflichtabschnitte vorhanden (NW-STD-000 Kap. 4) | Abschnittsprüfung | ✅ |
| Statusmodell vollständig mit Übergängen | Kapitel 5 | ✅ |
| Nummernvergabe klar geregelt | Kapitel 6 | ✅ |
| Zirkuläre Abhängigkeiten adressiert | Kapitel 7 | ✅ |
| Mindestens 30 Beispiele mit Begründung | Kapitel 11 | ✅ (31) |
| Beziehung zu NW-STD-000 und NW-STD-001 | Kapitel 12 | ✅ |
| Überführungspfad (relational, STRATO, APEX) | Kapitel 13 | ✅ |
| Kritische Selbstbewertung vorhanden | nächster Abschnitt | ✅ |

---

## Kritische Selbstbewertung

### Reifebewertung für die Freigabe von NW-STD-000 und NW-STD-001

**Frage:** Ist das Registry ausreichend definiert, damit NW-STD-000 und NW-STD-001 offiziell veröffentlicht werden können?

### Ja — mit einer bewussten Ausnahme

Das Registry ist fachlich vollständig beschrieben. Die Veröffentlichung von NW-STD-000 und NW-STD-001 ist möglich, sobald NW-STD-002 selbst den Status `review` erreicht hat, weil:

1. **Nummernvergabe ist klar geregelt** — Kapitel 6 beschreibt vollständig, wer, wann und wie Nummern vergibt.
2. **Statusmodell ist konsistent** — Kapitel 5 und 9 beschreiben den vollständigen Weg von `draft` zu `published`.
3. **Eindeutigkeit ist gesichert** — Kapitel 3 stellt klar, dass Nummern nie wiederverwendet werden.
4. **Abhängigkeiten sind beschreibbar** — Kapitel 7 erlaubt die korrekte Dokumentation der Beziehungen NW-STD-001 → NW-STD-000.

### Bekannte verbleibende Schwachstellen

**1. Vorhühnerei-Problem (dokumentiert als Ausnahme)**
Das Registry setzt voraus, dass Standards registriert sind, bevor sie veröffentlicht werden. Aber das Registry selbst ist noch nicht veröffentlicht. Die Ausnahme in Kapitel „Ausnahmen" adressiert das explizit: NW-STD-000 und NW-STD-001 gelten provisorisch als veröffentlicht, bis NW-STD-002 freigegeben ist. Das ist keine elegante Lösung — aber eine ehrliche.

**2. Registry-Instanz noch nicht benannt**
Kapitel 6.1 sagt, wer Nummern vergeben darf — aber NW-GOV-001 existiert noch nicht. Derzeit ist das NeuroWays Core Team die implizite Instanz. Das ist ausreichend für eine kleine Organisation, aber nicht skalierbar.

**3. Kein technisches Werkzeug**
Das Registry liegt als Markdown-Dokument vor. Es gibt keinen automatisierten Check für Duplikate oder Zirkularität. Das ist akzeptabel für die aktuelle Skalierung, muss aber mit NW-STD-011 und NW-GOV-001 behoben werden.

**4. Nummerierungsbereich-Inkonsistenz mit NW-STD-000**
NW-STD-000 Kapitel 2 und NW-STD-002 Kapitel 2 verwenden unterschiedliche Nummerierungsbereiche. NW-STD-002 ist maßgeblich (neuere Definition), aber NW-STD-000 muss mit v1.1.0 angepasst werden.

### Empfehlung

**NW-STD-002 in `review` setzen.**  
**NW-STD-000 und NW-STD-001 können unmittelbar danach in `approved` und dann `published` gesetzt werden.**

Die Reihenfolge der empfohlenen Freigaben:

```
1. NW-STD-002  →  review
2. NW-STD-000  →  approved → published  (mit Hinweis auf offene Inkonsistenz)
3. NW-STD-001  →  published  (unverändert, wie entschieden)
4. NW-STD-002  →  approved → published
5. NW-STD-000 v1.1.0  →  Nummerierungsbereiche mit NW-STD-002 synchronisiert
```

---

*NW-STD-002 — NeuroWays Standards Registry Standard v1.0.1 — Status: published — Veröffentlicht 2026-07-23*

┌─────────────────────────────────────────────────
│ ./NW-STD-003_DATABASE_STANDARD.md
└─────────────────────────────────────────────────
# NW-STD-003 — NeuroWays Database Standard

**Dokumentcode:** NW-STD-003
**Version:** 1.0.1
**Status:** published
**Veröffentlicht:** 2026-07-23
**Erstellt:** 2026-07-23
**Gültig ab:** 2026-07-23
**Verantwortlich:** NeuroWays Core
**Hierarchie:** Technical Standard — referenziert NW-STD-000 und NW-STD-001 normativ
**Ablöst:** –
**Abgelöst durch:** –

---

## Änderungsverlauf

| Version | Datum | Änderung | Grund | Review |
|---------|-------|----------|-------|--------|
| 1.0.0 | 2026-07-23 | Erstfassung | – | – |
| 1.0.1 | 2026-07-23 | Projektspezifische Implementierungsreferenz (`asset_engine_validation.js`) aus normativem Kapitel 5.8 und Kapitel 11 entfernt; durch plattformneutrale Formulierung ersetzt | Governance Review (Konflikt D — Plattformneutralität) | Governance Review 2026-07-23 |
| 1.0.1 | 2026-07-23 | Status: draft → approved → published. Erste offizielle Veröffentlichung. | Veröffentlichungsreihenfolge Governance Foundation v1.0 | NeuroWays Core 2026-07-23 |

---

## Referenzen

| Dokument | Titel | Art |
|---------|-------|-----|
| NW-STD-000 | Standards Framework Standard | normativ |
| NW-STD-001 | Naming Standard | normativ |
| NW-STD-002 | Standards Registry Standard | informativ |
| NW-STD-010 | Versioning Standard | informativ (geplant) |
| NW-STD-014 | Lifecycle Standard | informativ (geplant) |

---

## Geltungsbereich

Dieser Standard gilt für alle Datenmodelle, Datenstrukturen und Datenhaltungskonzepte innerhalb des NeuroWays-Ökosystems.

Er gilt plattformunabhängig für:
- STRATO (aktuelle Entwicklungsplattform)
- Oracle APEX
- Relationale Datenbanken (PostgreSQL, Oracle, MySQL, SQLite)
- Dokumentdatenbanken (MongoDB, Firestore)
- JSON-basierte Datenhaltung
- Zukünftige Plattformen

Er regelt Architekturprinzipien, Integritätsregeln, Versionierungskonzepte und Migrationsregeln. Er regelt nicht die konkrete technische Implementierung in einer bestimmten Plattform — das ist Aufgabe plattformspezifischer Implementierungsdokumente.

---

## Offene Punkte

| Punkt | Beschreibung | Vorgesehen in |
|-------|-------------|---------------|
| Konkrete Feldtypen | Typsystem pro Plattform (varchar, uuid, jsonb) | Plattform-Implementierungsdokumente |
| Indexierungsregeln | Welche Felder werden indexiert | Ergänzung NW-STD-003 v1.1.0 |
| Datenschutz und DSGVO | Felder mit personenbezogenen Daten | NW-STD-080 (Security Standard) |
| Mehrmandantenfähigkeit | Datenmodell für Organisationen | NW-STD-003 v1.1.0 |

---

## Kapitel 1 — Grundprinzipien

### 1.1 Daten vor Darstellung

Datenstrukturen werden unabhängig von ihrer späteren Darstellung definiert. Ein Feld existiert, weil es fachlich notwendig ist — nicht weil eine Maske es braucht. Die Darstellung folgt dem Datenmodell, nicht umgekehrt.

### 1.2 Fachmodell vor Implementierung

Bevor eine Tabelle, Collection oder ein Schema angelegt wird, existiert ein fachliches Modell. Das fachliche Modell beschreibt Objekte, ihre Eigenschaften und ihre Beziehungen in der Sprache der Fachdomäne — unabhängig von Datenbanktechnologie. Die technische Implementierung übersetzt dieses Modell in die gewählte Plattform.

### 1.3 Ein Objekt besitzt genau eine Wahrheit

Jedes fachliche Objekt hat genau eine maßgebliche Datenquelle. Wenn dieselbe Information an mehreren Stellen gespeichert wird, entsteht zwangsläufig Inkonsistenz. Redundanz ist nur erlaubt, wenn sie bewusst entschieden, dokumentiert und durch einen Synchronisationsmechanismus kontrolliert wird.

### 1.4 Wiederverwendung vor Duplikation

Gemeinsame Eigenschaften werden in gemeinsamen Basismodellen definiert. Jede neue Entität, die ähnliche Eigenschaften hat wie eine bestehende, prüft zuerst, ob sie spezialisieren, erweitern oder referenzieren kann — bevor sie eigenständige Felder anlegt.

### 1.5 Plattformunabhängigkeit

Fachliche Datenmodelle sind in keiner Sprache einer konkreten Plattform definiert. Sie beschreiben Entitäten, Attribute und Beziehungen in neutraler Form. Die Überführung in SQL, JSON-Schema, PocketBase-Collections oder andere Formate ist eine technische Übersetzungsaufgabe.

### 1.6 Historisierung statt Informationsverlust

Daten werden nicht einfach gelöscht oder überschrieben, wenn sie sich ändern. Stattdessen wird der frühere Zustand aufbewahrt — entweder durch Versionierung, durch Statusübergänge oder durch ein separates Historienmodell. Informationsverlust ist ein Fehler, kein Feature.

### 1.7 Explizitheit über Implizitheit

Jedes Feld, jede Beziehung und jede Regel wird explizit modelliert. Implizite Annahmen — "das weiß jeder" — sind verboten. Was nicht im Modell steht, existiert für das System nicht.

### 1.8 Trennung fachlicher und technischer Felder

Fachliche Felder beschreiben das, was ein Objekt bedeutet. Technische Felder (id, created_at, updated_at) beschreiben, wie es verwaltet wird. Beide existieren, aber sie werden konzeptionell getrennt.

---

## Kapitel 2 — Datenobjekte

NeuroWays unterscheidet sieben Arten von Datenobjekten. Jede Art hat andere Eigenschaften, andere Lebenszyklen und andere Integritätsanforderungen.

### 2.1 Master Data (Stammdaten)

Beschreibung: Kernentitäten des Systems, die langfristig stabil sind und von anderen Objekten referenziert werden.

Eigenschaften:
- Lange Lebensdauer
- Geringe Änderungsfrequenz
- Werden von Transaction Data referenziert
- Haben eindeutige Business Codes
- Sind versionierbar

Beispiele: Methoden, Regionen der Welt, Designtokens, Benutzerprofile

Besondere Regeln:
- Löschen ist nicht erlaubt — stattdessen Archivierung
- Änderungen erzeugen neue Versionen
- Business Codes sind dauerhaft stabil

### 2.2 Reference Data (Referenzdaten)

Beschreibung: Wertelisten und Klassifikationen, die zur Kategorisierung anderer Objekte dienen.

Eigenschaften:
- Sehr geringe Änderungsfrequenz
- Systemweit gültig
- Keine fachliche Verarbeitungslogik
- Oft als Statuswerte, Typen oder Kategorien

Beispiele: Statuswerte (draft, published, archived), Asset-Typen, Zonen-Codes

Besondere Regeln:
- Änderungen haben systemweite Auswirkungen — immer mit Folgenabschätzung
- Neue Werte können ergänzt werden, bestehende Werte werden niemals geändert

### 2.3 Transaction Data (Transaktionsdaten)

Beschreibung: Daten, die durch Aktionen von Benutzern oder Systemen entstehen. Sie dokumentieren, was wann passiert ist.

Eigenschaften:
- Hohe Entstehungsfrequenz
- Historisch und unveränderlich nach Abschluss
- Referenzieren Master Data zum Entstehungszeitpunkt
- Enthalten Zeitstempel

Beispiele: Check-ins, Checkin-Antworten, Audit-Logs

Besondere Regeln:
- Abgeschlossene Transaktionsdaten sind unveränderlich
- Master Data-Werte zum Zeitpunkt der Transaktion werden mitgespeichert (Snapshot), nicht nur referenziert

### 2.4 Configuration Data (Konfigurationsdaten)

Beschreibung: Systemeinstellungen, Feature-Flags und Betriebsparameter.

Eigenschaften:
- Geringe Menge
- Technische, keine fachliche Bedeutung
- Änderbar durch autorisierte Personen
- Wirken systemweit

Beispiele: Feature Flags, Systemparameter, Schwellenwerte

Besondere Regeln:
- Jede Änderung wird protokolliert (Audit)
- Niemals fachliche Daten in Konfiguration speichern

### 2.5 Metadata (Metadaten)

Beschreibung: Daten über Daten. Beschreiben Eigenschaften anderer Objekte ohne deren fachlichen Kern zu sein.

Eigenschaften:
- Erweiterbar durch Schlüssel-Wert-Paare
- Keine eigene fachliche Identität
- Immer abhängig vom beschriebenen Objekt

Beispiele: Asset-Metadaten (Generierungsmodell, Prompt, Seed), Dokumentmetadaten

Besondere Regeln:
- Metadaten ohne Bezugsobjekt sind ungültig
- Schlüssel innerhalb eines Bezugsobjekts sind eindeutig

### 2.6 Audit Data (Protokolldaten)

Beschreibung: Unveränderliche Aufzeichnungen aller relevanten Systemereignisse.

Eigenschaften:
- Ausschließlich anhängend (append-only)
- Niemals änderbar oder löschbar
- Enthalten Zeitstempel, handelnde Person und vorherigen Zustand

Beispiele: Statusänderungen, Löschereignisse, Zugriffsversuche

Besondere Regeln:
- Audit Data darf niemals durch Anwendungslogik gelöscht werden
- Zugriff nur lesend, nie schreibend durch reguläre Anwendung

### 2.7 Temporary Data (Temporäre Daten)

Beschreibung: Kurzlebige Arbeitsdaten, die nicht dauerhaft gespeichert werden sollen.

Eigenschaften:
- Klar definierte Lebensdauer
- Kein fachlicher Wert nach Ablauf
- Niemals als Grundlage für Entscheidungen oder Berechnungen

Beispiele: Sitzungstoken, Zwischenzustände von Formularen (clientseitig), Caches

Besondere Regeln:
- Temporary Data gehört nicht in das fachliche Datenmodell
- Temporäre Daten werden niemals mit dauerhaften Daten vermischt

---

## Kapitel 3 — Objektidentität

Jedes fachliche Objekt im NeuroWays-System hat eine eindeutige, stabile Identität. Diese Identität besteht aus mehreren Schichten.

### 3.1 Interne ID

Die interne ID ist der technische Primärschlüssel. Sie wird vom System automatisch vergeben und ist für Menschen nicht bedeutungstragend.

Eigenschaften:
- Eindeutig innerhalb der Entität
- Unveränderlich nach Erstellung
- Nicht von außen manipulierbar
- Format: UUID oder datenbankspezifischer Typ

Regel: Die interne ID wird niemals in fachlichen Namen, URLs oder Benutzeroberflächen sichtbar, wenn ein Business Code existiert.

### 3.2 Business Code

Der Business Code ist der fachliche Bezeichner eines Objekts. Er ist stabil über alle Versionen und alle Plattformen.

Eigenschaften:
- Von Menschen lesbar
- Eindeutig innerhalb des fachlichen Bereichs
- Ändert sich niemals — auch nicht bei Versionswechsel
- Folgt NW-STD-001

Beispiele: `ENERGY_NAVIGATOR`, `WORLD_FESTLAND`, `ICON_ZONE_MOUNTAIN`

Regel: Wenn ein Objekt archiviert und durch ein neues ersetzt wird, erhält das neue Objekt einen neuen Business Code. Der alte Business Code bleibt dauerhaft dem archivierten Objekt zugeordnet.

### 3.3 Version

Die Version unterscheidet verschiedene Zustände desselben Objekts über die Zeit.

Eigenschaften:
- Format: Semver (MAJOR.MINOR.PATCH)
- Objekte mit gleichen Business Codes aber unterschiedlichen Versionen sind dieselbe fachliche Identität in unterschiedlichen Zuständen
- Neue Versionen erzeugen keine neue fachliche Identität

Wichtige Unterscheidung:
- `ENERGY_NAVIGATOR v1.0.0` und `ENERGY_NAVIGATOR v1.1.0` sind dasselbe Objekt — die Methode Energy Navigator — in unterschiedlichen Zuständen.
- Ein neues Objekt `ENERGY_NAVIGATOR_PLUS` wäre eine neue fachliche Identität.

### 3.4 Status

Der Status beschreibt den aktuellen Lebenszyklusstatus eines Objekts. Er ist kein inhaltliches Merkmal, sondern ein Verwaltungsmerkmal.

Standard-Statuswerte: draft, review, published, superseded, archived (gemäß NW-STD-000)

Regel: Der Status eines Objekts ist ein Metadatum, kein Fachattribut. Er darf nicht in fachliche Berechnungen einfließen.

### 3.5 Owner

Jedes Objekt hat genau einen Eigentümer. Der Eigentümer ist verantwortlich für Korrektheit, Aktualität und Lebenszyklus des Objekts.

Eigenschaften:
- Kann eine Person, ein Team oder eine Organisationseinheit sein
- Kann übertragen werden
- Jede Eigentumsübertragung wird protokolliert

### 3.6 Parent

Objekte können hierarchisch strukturiert sein. Ein Parent-Objekt ist ein übergeordnetes Objekt derselben Entitätsart.

Regeln:
- Zirkuläre Elternbeziehungen sind verboten
- Ein Objekt kann höchstens einen Parent haben
- Das Löschen oder Archivieren eines Parents erfordert eine definierte Behandlung der Kinder (Kaskade, Waise, Blockierung)

### 3.7 Referenzen

Referenzen sind Beziehungen zu anderen Objekten. Sie werden in Kapitel 4 ausführlich behandelt.

Grundregel: Eine Referenz auf ein archiviertes oder nicht existierendes Objekt ist eine Integritätsverletzung.

### 3.8 Identitätsprinzip

Ein Objekt besitzt genau eine Identität. Diese Identität ist:
- die Kombination aus Business Code + fachlichem Bereich
- stabil über alle Versionen
- stabil über alle Plattformen
- stabil über alle Statuswechsel

Was sich ändert: Version, Status, Inhalte.
Was sich niemals ändert: Business Code, interner Typ, fachlicher Bereich.

---

## Kapitel 4 — Beziehungen

### 4.1 1:1 (Eins-zu-Eins)

Genau ein Objekt A gehört zu genau einem Objekt B.

Verwendung: Wenn zwei Entitäten konzeptionell getrennt, aber immer zusammen sind.

Beispiel: Ein Check-in hat genau ein Ergebnis-Objekt.

Regeln:
- Prüfen, ob 1:1-Beziehungen nicht sinnvoller als Felder im selben Objekt modelliert werden
- 1:1 ist oft ein Hinweis auf fehlende Normalisierung

### 4.2 1:n (Eins-zu-Viele)

Ein Objekt A hat viele Objekte B. Jedes B gehört zu genau einem A.

Verwendung: Häufigste Beziehungsart. Beispiel: Eine Methode hat viele Fragen.

Regeln:
- Das "n"-Objekt trägt die Referenz auf das "1"-Objekt
- Das "1"-Objekt kennt seine Kinder nicht direkt (keine eingebetteten ID-Listen)

### 4.3 n:m (Viele-zu-Viele)

Viele Objekte A können mit vielen Objekten B verbunden sein.

Verwendung: Wenn die Beziehung selbst Eigenschaften hat oder wenn A und B unabhängig voneinander existieren.

Regeln:
- Immer über eine Verknüpfungsentität (Junction Entity) modelliert
- Die Verknüpfungsentität kann eigene Felder haben (z.B. Reihenfolge, Gültigkeitszeitraum)
- Beispiel: `AST_ASSET_ASSIGNMENTS` verknüpft Assets mit Regionen

### 4.4 Hierarchien

Objekte derselben Entität in einer Eltern-Kind-Struktur.

Regeln:
- Tiefe begrenzen (maximal 5 Ebenen empfohlen)
- Zirkuläre Strukturen sind verboten und müssen beim Schreiben geprüft werden
- Löschen eines Elternknotens: Verhalten der Kinder muss explizit definiert sein

### 4.5 Abhängigkeiten

Objekt B kann ohne Objekt A nicht existieren oder verliert seine Bedeutung.

Unterschied zu Referenzen: Eine Referenz ist lose — das referenzierte Objekt existiert unabhängig. Eine Abhängigkeit ist existenziell — ohne das übergeordnete Objekt verliert das abhängige seinen Sinn.

Beispiel: Eine Checkin-Antwort ohne zugehörigen Check-in ist bedeutungslos.

Regeln:
- Existenzielle Abhängigkeiten müssen bei Archivierung oder Löschung behandelt werden
- Kaskadierende Operationen müssen explizit dokumentiert sein

### 4.6 Optionale Beziehungen

Eine Beziehung, die vorhanden sein kann, aber nicht muss.

Kennzeichnung im Modell: 0..1 oder 0..n

Regeln:
- Optionale Referenzfelder enthalten null/leer, wenn keine Beziehung besteht
- Die Abwesenheit einer optionalen Beziehung ist kein Fehler

### 4.7 Pflichtbeziehungen

Eine Beziehung, die immer vorhanden sein muss.

Kennzeichnung im Modell: 1..1 oder 1..n

Regeln:
- Das abhängige Objekt kann ohne das übergeordnete nicht angelegt werden
- Löschen des übergeordneten Objekts muss die Pflichtbeziehung auflösen oder kaskadierende Archivierung auslösen

### 4.8 Vererbung

Wenn mehrere Entitäten gemeinsame Attribute haben, werden diese in einer Basisentität zusammengefasst.

Modellierungsansätze:
- Einzeltabelle (alle Typen in einer Tabelle, leere Felder für nicht zutreffende Typen)
- Separate Tabellen mit gemeinsamer Basistabelle
- Einbettung gemeinsamer Felder (ohne formale Vererbung)

Regeln:
- Vererbung ist ein Modellierungsprinzip, kein technisches Konstrukt
- Die gewählte Implementierung wird dokumentiert

### 4.9 Zirkuläre Beziehungen

Objekt A referenziert B, B referenziert C, C referenziert A.

Zirkuläre Beziehungen in normativen Abhängigkeiten sind verboten.

Ausnahme: Selbstreferenzen (ein Objekt referenziert eine frühere Version von sich selbst) sind erlaubt und explizit zu dokumentieren.

Beispiel erlaubt: `asset_versions.superseded_by_id` → anderer Datensatz in `asset_versions`

### 4.10 Regeln für Referenzen

- Eine Referenz zeigt immer auf ein existierendes Objekt
- Referenzen auf archivierte Objekte bleiben gültig (historischer Bezug)
- Referenzen auf gelöschte Objekte sind Integritätsverletzungen
- Alle Referenzen werden vor dem Schreiben geprüft (Kapitel 11)

---

## Kapitel 5 — Datenintegrität

### 5.1 Eindeutigkeit

Objekte, die denselben fachlichen Sachverhalt repräsentieren, dürfen nicht mehrfach existieren.

Eindeutigkeitsprüfungen erfolgen auf zwei Ebenen:

**Technische Eindeutigkeit:** Primärschlüssel (interne ID) sind systemseitig immer eindeutig.

**Fachliche Eindeutigkeit:** Business Codes, Versionskombinationen und andere fachliche Identifikationsmerkmale müssen eindeutig sein. Diese Prüfung erfolgt entweder durch Datenbankconstraints (bevorzugt) oder durch Anwendungslogik (wenn Constraints nicht verfügbar).

### 5.2 Referenzielle Integrität

Eine Referenz auf ein Objekt setzt dessen Existenz voraus.

Regeln:
- Bevor ein Objekt angelegt wird, müssen alle referenzierten Objekte existieren
- Das Löschen eines referenzierten Objekts erfordert eine definierte Behandlung (blockieren, kaskadieren, auf null setzen)
- Soft-Delete (Status-Archivierung) ist bevorzugt gegenüber Hard-Delete

### 5.3 Pflichtfelder

Felder, ohne die ein Objekt keine vollständige fachliche Bedeutung hat, sind Pflichtfelder.

Regeln:
- Pflichtfelder dürfen keine leeren Werte enthalten
- Die Unterscheidung zwischen "nicht gesetzt" (null) und "leer" (Leerstring) muss pro Feld definiert sein
- Pflichtfelder werden im Modell explizit markiert

### 5.4 Wertebereiche

Felder mit eingeschränkten Wertebereichen werden durch explizite Wertelisten definiert.

Regeln:
- Statusfelder akzeptieren nur definierte Statuswerte
- Typfelder akzeptieren nur definierte Typen
- Numerische Felder haben dokumentierte Minimal- und Maximalwerte
- Datumsfelder haben dokumentierte Formate (ISO 8601)

### 5.5 Historisierung

Wenn ein Objekt seinen Zustand ändert, wird der vorherige Zustand aufbewahrt.

Historisierungsstrategien:
- **Versionierung:** Neue Version des Objekts anlegen, alte Version mit Status `superseded` behalten
- **Auditprotokoll:** Änderungen in separater Audit-Tabelle protokollieren
- **Snapshot:** Zum Zeitpunkt einer Transaktion werden relevante Werte kopiert

Regeln:
- Die gewählte Strategie wird pro Entitätstyp dokumentiert
- Historische Daten werden niemals überschrieben

### 5.6 Archivierung

Objekte werden archiviert statt gelöscht.

Regeln:
- Archivierte Objekte erhalten Status `archived`
- Archivierte Objekte sind lesbar, aber nicht mehr änderbar
- Alle Referenzen auf archivierte Objekte bleiben gültig
- Archivierung ist unumkehrbar

### 5.7 Immutabilität

Bestimmte Objekte oder Felder sind nach Veröffentlichung unveränderlich.

Regeln:
- Fachliche Felder veröffentlichter Objekte dürfen nicht überschrieben werden
- Verwaltungsfelder (Status, superseded_at) dürfen kontrolliert geändert werden
- Immutable-Entscheidungen werden im Modell dokumentiert

### 5.8 Plattformabhängige vs. plattformunabhängige Integrität

**Plattformunabhängige Integrität** (immer gültig, unabhängig von Datenbanktechnologie):
- Eindeutigkeit durch Anwendungslogik geprüft
- Referenzprüfungen durch Anwendungslogik
- Validierung vor dem Schreiben

**Plattformabhängige Integrität** (wenn die Plattform es unterstützt):
- Unique Constraints auf Datenbankebene
- Foreign Key Constraints
- Check Constraints für Wertebereiche
- Transaktionssicherheit (ACID)

**Beispiel: Plattform ohne native Constraints**
Wenn eine eingesetzte Plattform keine nativen Foreign Key Constraints oder Unique Constraints auf Kombinationsebene unterstützt, übernimmt die Anwendungslogik alle Referenzprüfungen vor jedem Schreibvorgang. Diese Prüfungen sind in einer plattformspezifischen Validierungs-Engine zu implementieren und zu dokumentieren. Plattformabhängige Integrität wird damit zu einem Anwendungsverantwortungsbereich.

Beim Wechsel auf eine Plattform mit vollem Constraint-Support können diese Prüfungen auf Datenbankebene verlagert werden — die fachliche Regel bleibt dieselbe.

---

## Kapitel 6 — Lebenszyklus

Der Lebenszyklus von Datenobjekten folgt einem definierten Muster. Die Details werden im Lifecycle Standard (NW-STD-014) geregelt. Dieses Kapitel beschreibt die datenbankspezifischen Aspekte.

### 6.1 Erzeugen

Ein Objekt entsteht, wenn alle Pflichtfelder gesetzt sind und alle Referenzen geprüft wurden. Beim Erzeugen werden automatisch gesetzt:
- `created_at` (Zeitstempel)
- `created_by` (handelnde Person, sofern verfügbar)
- Status: `draft` (Standardwert, wenn nicht explizit angegeben)

### 6.2 Ändern

Änderungen an Objekten werden protokolliert. Bei versionierten Objekten entsteht eine neue Version. `updated_at` wird bei jeder Änderung aktualisiert.

Regel: Fachliche Inhalte veröffentlichter Objekte dürfen nicht geändert werden — nur Verwaltungsfelder.

### 6.3 Freigeben

Das Freigeben eines Objekts setzt Status auf `published` und setzt `published_at`. Nach Freigabe sind fachliche Felder immutabel.

### 6.4 Ersetzen

Ein veröffentlichtes Objekt wird durch eine neue Version ersetzt. Das alte Objekt erhält Status `superseded` und das Feld `superseded_by_id`. Das neue Objekt enthält denselben Business Code.

### 6.5 Archivieren

Archivierung ist die dauerhafte Deaktivierung ohne Datenverlust. `archived_at` wird gesetzt. Der Eintrag bleibt lesbar.

### 6.6 Löschen

Hard-Delete (dauerhaftes Entfernen aus der Datenbank) ist nur für Temporary Data erlaubt. Für alle anderen Datenobjekttypen gilt: Archivierung statt Löschen.

Wenn die Plattform Hard-Delete technisch nicht vollständig verhindert, übernimmt die Anwendungslogik diese Kontrolle.

**Verweis:** Vollständige Lebenszyklusregeln → NW-STD-014.

---

## Kapitel 7 — Versionierung

### 7.1 Objektversion

Eine Objektversion unterscheidet Zustände desselben fachlichen Objekts über die Zeit. Jede Version ist ein eigenständiger Datensatz, der auf den Business Code des Objekts verweist.

Felder jeder Objektversion:
- `code` (Business Code — gleich für alle Versionen)
- `version` (Semver — unterscheidet die Versionen)
- `status`
- Fachliche Felder

### 7.2 Dokumentversion

Dokumente (Standards, Beschreibungen) werden nach denselben Semver-Regeln versioniert wie Objekte. Die Dokumentversion ist im Dokumentkopf eingetragen und im Registry registriert.

### 7.3 Assetversion

Assets (Illustrationen, Icons, Animationen) werden über `asset_versions` verwaltet. Jede veröffentlichte Dateiversion ist unveränderlich. Neue Dateiversionen entstehen durch neue Datensätze.

### 7.4 Methodenversion

Methoden (wie der Energy Navigator) tragen eine eigene Versionsnummer. Wenn sich Fragen, Antwortoptionen oder Ergebnisregeln einer Methode ändern, entsteht eine neue Methodenversion. Historische Check-ins speichern die Methodenversion zum Zeitpunkt ihrer Erstellung.

Beispiel: Check-in vom 2026-07-23 wurde mit Methodenversion `1.0.0` erstellt. Nach Erweiterung auf 6 Fragen gilt `1.1.0`. Der historische Check-in bleibt `1.0.0` zugeordnet.

### 7.5 Standardversion

Standards werden nach NW-STD-000 Kapitel 6 und dem späteren NW-STD-010 versioniert.

**Verweis:** Detailregeln zur Semver-Verwendung → NW-STD-010.

---

## Kapitel 8 — Datenmodellierung

### 8.1 Normalisierung

Normalisierung eliminiert Redundanz und Anomalien. NeuroWays-Modelle streben 3. Normalform (3NF) an:

- 1NF: Jede Spalte enthält atomare Werte. Keine Wiederholungsgruppen.
- 2NF: Alle Nicht-Schlüsselfelder hängen vollständig vom Primärschlüssel ab.
- 3NF: Keine transitiven Abhängigkeiten zwischen Nicht-Schlüsselfeldern.

Ausnahmen von 3NF sind erlaubt, wenn sie explizit dokumentiert und fachlich begründet sind (z.B. Performance, Plattformbeschränkungen).

### 8.2 Denormalisierung

Denormalisierung ist das bewusste Einführen von Redundanz aus Performance- oder Praktikabilitätsgründen.

Regeln:
- Denormalisierung ist immer explizit dokumentiert
- Redundante Daten werden durch einen definierten Mechanismus synchronisiert
- Die ursprüngliche normalisierte Quelle der Wahrheit wird immer angegeben

Beispiel: `checkins.result_label` speichert den Zonenbezeichner direkt, obwohl er aus `result_rules` geladen werden könnte. Das ist bewusste Denormalisierung für Unveränderlichkeit der Transaktionsdaten.

### 8.3 Modularisierung

Das Datenmodell ist in fachliche Domänen unterteilt. Jede Domäne hat klare Grenzen.

NeuroWays-Domänen:
- World & Design (`DSN_*`)
- Assets (`AST_*`)
- Methoden & Check-ins (`MTH_*`, `CHK_*`)
- Standards (`STD_*`)
- Benutzer & Organisationen (`USR_*`, `ORG_*`)
- System & Konfiguration (`SYS_*`, `CFG_*`)

### 8.4 Domänengrenzen

Domänen kommunizieren ausschließlich über definierte Schnittstellen — in der Datenbank sind das Referenzfelder.

Regeln:
- Keine Entität aus Domäne A enthält direkte Felder aus Domäne B
- Beziehungen zwischen Domänen verlaufen über IDs und Codes, nicht über eingebettete Objekte
- Jede domänenübergreifende Abhängigkeit wird dokumentiert

### 8.5 Ownership

Jede Entität gehört zu genau einer Domäne. Die Domäne ist Eigentümer der Entität und verantwortet ihr Schema, ihre Validierungsregeln und ihren Lebenszyklus.

### 8.6 Wiederverwendung

Bevor eine neue Entität modelliert wird, wird geprüft:
- Gibt es eine bestehende Entität, die denselben Zweck erfüllt?
- Gibt es eine bestehende Entität, die durch Spezialisierung erweitert werden kann?
- Gibt es ein Basismodell, das gemeinsame Felder bereits definiert?

### 8.7 Gemeinsame Basismodelle

NeuroWays definiert folgende Basismodelle, die von mehreren Entitäten verwendet werden:

**Versioniertes Objekt:** code, version, status, created_at, updated_at, published_at, archived_at, superseded_at, superseded_by_id

**Sortiertes Objekt:** sort_order (immer number, immer optional)

**Benanntes Objekt:** code, title, description, label

**Zuordnungs-Objekt:** source_id, target_id, target_type, usage_type, is_primary, valid_from, valid_to

---

## Kapitel 9 — Plattformen

### 9.1 Relationale Datenbanken (PostgreSQL, Oracle, MySQL, SQLite)

**Stärken:**
- Vollständige ACID-Transaktionen
- Native Unique Constraints und Foreign Keys
- Komplexe Abfragen über SQL
- Starke Normalisierung möglich
- Etablierte Migrations-Tools

**Schwächen:**
- Schema muss vorab definiert werden (Schemarigidität)
- Schemaänderungen erfordern Migrationen
- Horizontale Skalierung aufwändig

**NeuroWays-Eignung:** Sehr hoch. Alle NeuroWays-Integritätsanforderungen werden nativ unterstützt.

### 9.2 Dokumentdatenbanken (MongoDB, Firestore)

**Stärken:**
- Flexible Schemata
- Eingebettete Objekte ohne Joins
- Horizontale Skalierung einfacher
- Gut für hierarchische Daten

**Schwächen:**
- Keine nativen Foreign Keys
- Referenzielle Integrität muss in der Anwendung sichergestellt werden
- n:m-Beziehungen umständlich
- Transaktionssupport eingeschränkt (je nach System)

**NeuroWays-Eignung:** Mittel. Integritätsanforderungen müssen vollständig in der Anwendung übernommen werden.

### 9.3 STRATO (aktuelle Entwicklungsplattform)

**Stärken:**
- Schnelle Einrichtung
- Integrierte API
- Einfache Felddefinition
- Für Prototypen sehr gut geeignet

**Schwächen:**
- Keine nativen Foreign Keys oder Unique Constraints
- Eingeschränkte Abfragesprache
- Hard-Delete API-Verhalten ist plattformspezifisch (bekannte Quirks)
- Keine nativen Transaktionen

**NeuroWays-Eignung:** Ausreichend für MVP und Entwicklung. Alle Integritätsanforderungen werden durch Anwendungslogik (Validierungs-Engine) übernommen. Für Produktion mit hohem Datenvolumen oder strenger Compliance sind relationale Datenbanken zu bevorzugen.

### 9.4 Oracle APEX

**Stärken:**
- Vollständige Oracle-Datenbankunterstützung (alle Constraints, ACID)
- Integriertes Low-Code-UI für Verwaltungsinterfaces
- Starke Reporting-Features
- Geeignet für Registry, Audit und Administration

**Schwächen:**
- Höherer Einrichtungsaufwand
- Oracle-Lizenzierungskosten
- Weniger flexibel für schnelle Iteration

**NeuroWays-Eignung:** Hoch für Verwaltungssysteme (Registry, Standards-Governance, Audit). Weniger geeignet als primäre Anwendungsplattform für das Energy Navigator Frontend.

### 9.5 JSON (als Datenaustauschformat)

JSON ist kein Datenbanksystem, sondern ein Austauschformat. Es ist geeignet für:
- Export und Import von Daten
- Konfigurationsdaten
- API-Payloads
- Schnappschüsse für Historisierung

JSON-Dokumente folgen denselben Namenskonventionen wie Datenbankfelder (camelCase in APIs, snake_case in Datenbanken gemäß NW-STD-001).

---

## Kapitel 10 — Migration

### 10.1 Migration

Eine Migration ist eine geplante, rückwärtskompatible oder bewusst inkompatible Änderung an einem Datenbankschema.

Migrationsarten:
- **Additive Migration:** Neue Felder oder Tabellen werden hinzugefügt. Bestehende Daten bleiben unverändert. Rückwärtskompatibel.
- **Destruktive Migration:** Felder oder Tabellen werden entfernt oder umbenannt. Erfordert vollständige Datenmigration und Versionswechsel.
- **Datenmigration:** Bestehende Daten werden in ein neues Format überführt, ohne das Schema zu ändern.

Regeln:
- Jede Migration wird vor Ausführung dokumentiert
- Migrationen sind testbar auf einem Nicht-Produktionssystem
- Rollback-Plan existiert vor jeder destruktiven Migration

### 10.2 Import

Import ist das Einlesen externer Daten in das NeuroWays-System.

Regeln:
- Importierte Daten durchlaufen dieselben Validierungsregeln wie manuell angelegte Daten
- Business Codes werden beim Import geprüft (Duplikate abgelehnt)
- Importprotokolle werden als Audit Data gespeichert

### 10.3 Export

Export ist das Ausgeben von NeuroWays-Daten in ein externes Format.

Regeln:
- Exports enthalten immer den Zeitstempel des Exports
- Exports enthalten Versionsinformationen der exportierten Objekte
- Sensitive Daten werden beim Export gekennzeichnet oder ausgeschlossen

### 10.4 Synchronisation

Synchronisation ist der Abgleich zwischen zwei Datenhaltungssystemen (z.B. Entwicklung und Produktion).

Regeln:
- Schemas werden vor Daten synchronisiert
- Produktive Daten werden nicht durch Entwicklungsdaten überschrieben
- Historische Daten und Audit Data werden niemals gelöscht bei Synchronisation

### 10.5 Rollback

Ein Rollback setzt eine Schemaänderung oder Datenmigration auf den vorherigen Zustand zurück.

Regeln:
- Rollback-Pläne werden vor jeder MAJOR-Migration erstellt
- Additive Migrationen können durch Entfernen der hinzugefügten Elemente zurückgesetzt werden
- Destruktive Migrationen erfordern ein Backup vor der Ausführung

### 10.6 Schemaänderungen

Schemaänderungen folgen dem MAJOR/MINOR/PATCH-Prinzip:
- **Additiv (MINOR):** Neues Feld, neue Tabelle — rückwärtskompatibel
- **Ändernd (MAJOR):** Feldtyp geändert, Feld umbenannt — erfordert Migration
- **Entfernend (MAJOR):** Feld oder Tabelle entfernt — erfordert Migration und Datenmigration

---

## Kapitel 11 — Validierung

### 11.1 Fachliche Validierung

Prüft, ob die eingegebenen Daten fachlich korrekt sind — unabhängig von technischen Constraints.

Beispiele:
- Ist der eingegebene Status ein gültiger Wert?
- Ist die referenzierte Methoden-ID vorhanden?
- Ist die Versionsnummer im Semver-Format?

Verantwortung: Anwendungslogik (immer, plattformunabhängig).

### 11.2 Technische Validierung

Prüft, ob die Daten technisch korrekt gespeichert werden können.

Beispiele:
- Ist der Wert zu lang für das Feld?
- Ist der Typ korrekt (Zahl statt Text)?
- Ist ein Pflichtfeld leer?

Verantwortung: Datenbankebene (wenn Constraints verfügbar) und Anwendungslogik.

### 11.3 UI-Validierung

Prüfung im Frontend, bevor Daten an den Server gesendet werden.

Regeln:
- UI-Validierung ist eine Benutzerfreundlichkeitsmaßnahme, keine Sicherheitsmaßnahme
- UI-Validierung darf nie die einzige Validierungsebene sein
- Server-seitige Validierung ist immer zusätzlich vorhanden

### 11.4 Servervalidierung

Prüfung auf dem Server, bevor Daten in die Datenbank geschrieben werden.

Regeln:
- Servervalidierung ist obligatorisch
- Alle fachlichen Regeln werden serverseitig geprüft
- Fehler werden mit konkreten, verständlichen Fehlermeldungen zurückgegeben

### 11.5 Integritätsprüfungen

Prüfung der referenziellen Integrität und Eindeutigkeit.

Warum Integrität auf Datenbankebene:
- Datenbankconstraints sind atomar — sie können nicht durch Anwendungsfehler umgangen werden
- Bei parallelen Zugriffen sind datenbankbasierte Constraints die einzige sichere Schicht
- Transaktionssicherheit garantiert Konsistenz auch bei Fehlern

Wann eine Validierungs-Engine notwendig ist:
- Wenn die eingesetzte Plattform keine nativen Datenbankconstraints unterstützt
- Wenn Validierungslogik über mehrere Entitäten hinweg notwendig ist
- Wenn fachliche Regeln zu komplex für einfache Constraints sind

**Beispiel: Plattform ohne native Constraints**
Wenn eine Plattform keine Foreign Key Constraints und keine Unique Constraints auf Kombinationsebene unterstützt, übernimmt eine Validierungs-Engine in der Anwendungslogik folgende Prüfungen:
- Prüfung der Existenz referenzierter Objekte vor jedem Schreibvorgang
- Prüfung der Eindeutigkeit fachlicher Schlüsselkombinationen
- Prüfung der Immutabilität veröffentlichter Objekte
- Prüfung projektspezifischer Zusatzregeln

Diese Prüfungen liegen in der Anwendungslogik und nicht in der Datenbank — das ist eine bekannte Schwachstelle, die beim Wechsel auf eine Plattform mit nativem Constraint-Support behoben werden kann. Konkrete Implementierungsdateien werden in plattformspezifischen Implementierungsdokumenten beschrieben, nicht in diesem Standard.

---

## Kapitel 12 — Beispiele

### 12.1 Gute Datenmodelle (✅)

| Beispiel | Begründung |
|---------|-----------|
| `CHK_CHECKINS` hat `method_version` — speichert die Methodenversion zum Check-in-Zeitpunkt | Korrekte Historisierung — Transaction Data speichert Snapshot |
| `AST_ASSET_VERSIONS.superseded_by_id` referenziert denselben Typ (Selbstreferenz) | Dokumentierte Ausnahme für Ablösebeziehung |
| `DSN_WORLD_REGIONS` speichert keine direkten HEX-Werte, sondern Token-Namen | Single Source of Truth für Farbwerte in `DSN_DESIGN_TOKENS` |
| `CHK_CHECKIN_ANSWERS` speichert `numeric_value` direkt | Snapshot-Denormalisierung — auch wenn Option gelöscht wird, bleibt der Wert erhalten |
| `AST_ASSET_ASSIGNMENTS` als Junction Entity für n:m zwischen Assets und Regionen | Korrekte n:m-Modellierung mit eigenem Payload (is_primary, valid_from) |
| Business Code `ENERGY_NAVIGATOR` bleibt in v1.0.0 und v1.1.0 gleich | Stabile fachliche Identität über Versionen |
| `result_rules` werden pro `method_id` geladen — nicht global | Klare Domänenzugehörigkeit |
| Archivierte Check-ins bleiben mit ursprünglichem `result_code` erhalten | Historisierung statt Überschreiben |
| `asset_metadata` als Key-Value-Erweiterung statt direkter Felder | Erweiterbarkeit ohne Schemaänderung |
| `world_versions.superseded_by_id` als leerer String statt null | Plattformbedingte Abweichung dokumentiert |

### 12.2 Schlechte Datenmodelle (❌)

| Beispiel | Fehler | Korrekt |
|---------|--------|---------|
| `checkins.answer_1`, `checkins.answer_2`, ... `checkins.answer_5` | Nicht normalisiert, nicht skalierbar | Separate `checkin_answers`-Entität mit 1:n |
| `result_rules` enthält direkt den Hex-Farbwert und `world_regions` auch | Redundanz — zwei Quellen der Wahrheit | Farbwert nur in Design Tokens |
| `methods`-Feld `questions_json` mit eingebetteten Fragen als JSON-String | Keine Abfragbarkeit, keine Integrität | Separate `questions`-Entität |
| Statusfeld `active` als boolean | Kein Zustandsmodell, keine Übergänge | Statuswert `published`, `draft` etc. |
| Check-in löschen statt archivieren | Informationsverlust | Status `archived`, Daten bleiben |
| `method_id` in `checkins` zeigt auf gelöschte Methode | Referenzielle Integritätsverletzung | Methoden nur archivieren, nie löschen |
| `user_settings` als JSON-String im Benutzerfeld | Nicht abfragbar, nicht validierbar | Separate `user_settings`-Entität |
| `asset_version` als Zahl (1, 2, 3) | Kein Semver, keine Kompatibilitätsaussage | `1.0.0` im Semver-Format |
| Fragen-Texte direkt im Frontend hardcodiert | Keine Datengetriebene Architektur | Fragen aus `MTH_QUESTIONS` laden |
| `tmp_results`-Tabelle in der Produktionsdatenbank | Temporäre Daten in persistenter Schicht | Clientseitig oder mit TTL |

### 12.3 Integritätsverletzungen (❌)

| Beispiel | Art | Konsequenz |
|---------|-----|------------|
| `checkin_answers.question_id` zeigt auf gelöschte Frage | Referenzielle Integrität | Antwort nicht mehr auflösbar |
| Zwei `asset_versions`-Einträge mit code=`WORLD_FESTLAND_ILL` und version=`1.0.0` | Eindeutigkeitsverletzung | Unklare Quelle der Wahrheit |
| `asset_files` mit leerem `file_url` | Pflichtfeldfehler | Datei nicht abrufbar |
| `asset_version` Status `published` → zurück auf `draft` gesetzt | Unzulässiger Statusübergang | Historische Referenzen betroffen |
| `method_version` in neuem Check-in nicht gesetzt | Fehlende Historisierung | Check-in keiner Methodenversion zuordenbar |
| `is_primary = true` für zwei Assignments mit gleichem target+usage | Primary-Regelverletzung | Unklar welches Asset primär ist |
| `design_tokens`-Farbwert nachträglich geändert ohne neue Version | Stille Änderung einer publizierten Version | Regionen referenzieren falschen Wert |
| `asset_prompts.final_prompt` leer bei status=`approved` | Pflichtfeldfehler im falschen Status | Prompt nicht reproduzierbar |
| `world_regions.world_version_id` zeigt auf nicht existente ID | Referenzielle Integritätsverletzung | Region ohne Weltkontext |
| Checkin mit `total_score = 0` bei 6 Pflichtfragen | Fachliche Validierungslücke | Ergebnis nicht korrekt berechnet |

### 12.4 Versionierungen (✅)

| Beispiel | Vorgehen |
|---------|---------|
| Energy Navigator: 5 Fragen v1.0.0 → 6 Fragen v1.1.0 | Neue Methodenversion, bestehende Check-ins behalten `method_version = 1.0.0` |
| Result Rules: Grenzen angepasst für 6-Fragen-Skala | Neue Datensätze mit korrigierten min_score/max_score, keine alten löschen |
| World Design Standard: neue Animationsregel → v1.2.0 | MINOR-Update, neue `world_version_id`, neue Abhängige referenzieren neue ID |
| Asset `WORLD_FESTLAND_ILLUSTRATION` v1.0.0 → v1.1.0 | Neuer `asset_versions`-Datensatz, alter bekommt `status = superseded` |
| NW-STD-001 v1.0.0 → v1.0.1 (Tippfehler) | PATCH, kein inhaltlicher Unterschied, Registry wird aktualisiert |
| `checkins.method_version` backfill auf `1.0.0` | Bestehende Transaktionsdaten erhalten retrospektiv die Version, ohne Berechnung |

### 12.5 Migrationen (✅/❌)

| Beispiel | Art | Beurteilung |
|---------|-----|-------------|
| Neues Feld `method_version` in `checkins` — optional, Standardwert leer | Additive Migration ✅ | Bestehende Daten unberührt |
| Feld `checkin_results` wird entfernt | Destruktive Migration ⚠️ | Backup erforderlich, Rollback-Plan nötig |
| `created` → `created_at` umbenennen | MAJOR-Schemaänderung ❌ ohne Migrationspfad | Migrationsdokument erforderlich |
| Alle bestehenden `checkins` ohne `method_version` auf `1.0.0` setzen | Datenmigration ✅ | Korrekt dokumentiert und ausgeführt |
| Neue Collection `DSN_WORLD_VERSIONS` anlegen | Additive Migration ✅ | Keine bestehenden Daten betroffen |

### 12.6 Ownership (✅/❌)

| Beispiel | Beurteilung |
|---------|-------------|
| `MTH_METHODS` gehört zur Domäne Methoden — Team Methoden ist Owner ✅ | Klare Verantwortung |
| `AST_ASSET_FILES` enthält `description` einer Region direkt ❌ | Domänenverschmutzung — Description gehört in `DSN_WORLD_REGIONS` |
| `CHK_CHECKINS` referenziert `method_id`, aber kopiert keine Methodendaten ✅ | Korrekte Referenz, Snapshot nur für benötigte Werte |
| Zwei Teams ändern dieselbe `result_rules`-Collection ohne Koordination ❌ | Kein klarer Owner — führt zu Konflikten |

### 12.7 Referenzen (✅/❌)

| Beispiel | Beurteilung |
|---------|-------------|
| `asset_assignments.target_id` zeigt auf `world_regions.id` mit `target_type = world_region` ✅ | Korrekte polymorphe Referenz |
| `design_rules.world_version_id` zeigt auf `world_versions.id` ✅ | Saubere 1:n-Referenz |
| Referenz auf ID aus einer anderen Plattform ohne Überprüfung ❌ | Keine Integritätsprüfung möglich |
| `asset_prompts.source_world_version_id` zeigt auf `world_versions.id` ✅ | Korrekte Zweifachreferenz im Prompt |
| `method_id` in `checkin_answers` fehlt — nur `checkin_id` vorhanden ✅ | Korrekt — Methode über Check-in ermittelbar (Normalisierung) |

---

## Kapitel 13 — Roadmap der Modellanwendung

### 13.1 World & Design

**Aktueller Stand:** `DSN_WORLD_VERSIONS`, `DSN_WORLD_REGIONS`, `DSN_DESIGN_TOKENS`, `DSN_DESIGN_RULES`, `DSN_ANIMATION_RULES`, `DSN_ACCESSIBILITY_RULES` sind vorhanden.

**Nächste Schritte nach Freigabe dieses Standards:**
- Felder `created_at` / `updated_at` (statt `created`/`updated`) bei nächster Migration
- Eindeutigkeitsconstraints für `world_version_id + code` in `world_regions`
- Business Codes für alle Regionen als eigene Felder ergänzen

### 13.2 Assets

**Aktueller Stand:** `AST_ASSET_VERSIONS`, `AST_ASSET_FILES`, `AST_ASSET_ASSIGNMENTS`, `AST_ASSET_METADATA`, `AST_ASSET_PROMPTS` angelegt. Validierungs-Engine aktiv.

**Nächste Schritte:**
- Erste produktive Assets nach Freigabe der Illustrationen
- `asset_versions.code` mit Business Code Konvention befüllen

### 13.3 Standards

**Aktueller Stand:** Standards als Markdown-Dokumente. Registry noch nicht als Datenbank.

**Nächste Schritte:**
- `STD_REGISTRY`-Collection nach NW-STD-002 anlegen
- Alle bestehenden Standards eintragen
- Versionshistorie führen

### 13.4 Methoden

**Aktueller Stand:** `MTH_METHODS`, `MTH_QUESTIONS`, `MTH_ANSWER_OPTIONS`, `MTH_RESULT_RULES` produktiv im Energy Navigator.

**Nächste Schritte:**
- Collections nach NW-STD-001 umbenennen (`methods` → `MTH_METHODS`)
- Eindeutigkeitsconstraints für `method_id + code` in `questions`
- Felder `created_at` statt `created` nach nächster Migration

### 13.5 NeuroPlay

**Aktueller Stand:** Noch nicht begonnen.

**Datenmodell-Anforderungen nach diesem Standard:**
- Eigener Domänenpräfix (z.B. `NPL_`)
- Neue Methoden-Entitäten unter `MTH_*` oder eigenem Präfix
- World-Region für NeuroPlay in `DSN_WORLD_REGIONS`
- Keine Änderung an bestehenden Methoden-Collections

### 13.6 NeuroFlow

**Aktueller Stand:** Noch nicht begonnen.

**Datenmodell-Anforderungen:**
- Eigener Domänenpräfix (z.B. `NFL_`)
- Workflow-Entitäten: Schritte, Übergänge, Zustände
- Integration mit `USR_USERS` für Benutzerzustand
- Eigene Result-Regeln analog zu `MTH_RESULT_RULES`

---

## Definitionen

| Begriff | Definition |
|---------|-----------|
| **Entität** | Ein fachliches Objekt mit eigener Identität, das im Datenmodell repräsentiert wird |
| **Attribut** | Eine Eigenschaft einer Entität |
| **Beziehung** | Eine gerichtete oder ungerichtete Verbindung zwischen zwei Entitäten |
| **Business Code** | Stabiler, fachlicher Bezeichner eines Objekts, unabhängig von technischer ID |
| **Normalisierung** | Strukturierungsprinzip zur Eliminierung von Redundanz und Anomalien |
| **Denormalisierung** | Bewusste Einführung von Redundanz für Performance oder Unveränderlichkeit |
| **Immutabilität** | Eigenschaft eines Objekts oder Felds, nach Veröffentlichung nicht mehr geändert werden zu können |
| **Snapshot** | Kopie relevanter Werte eines referenzierten Objekts zum Zeitpunkt einer Transaktion |
| **Validierungs-Engine** | Anwendungslogik, die Datenbankconstraints in der Anwendungsschicht implementiert |
| **Soft-Delete** | Deaktivierung eines Objekts durch Statusänderung statt physischer Löschung |
| **Hard-Delete** | Physische Entfernung eines Datensatzes aus der Datenbank |
| **Junction Entity** | Verknüpfungsentität für n:m-Beziehungen, die eigene Felder enthalten kann |

---

## Ausnahmen

| Ausnahme | Begründung | Gültig bis |
|---------|-----------|------------|
| Bestehende Collections verwenden `created`/`updated` statt `created_at`/`updated_at` | Entwickelt vor NW-STD-003 | Bis zur nächsten MAJOR-Migration je Collection |
| `world_versions.superseded_by_id` enthält Leerstring statt null | STRATO-Plattformbeschränkung | Bis zu Plattformwechsel |
| Keine nativen Constraints auf STRATO | Plattformbeschränkung | Bis zu Plattformwechsel; Validierungs-Engine als Ersatz |

---

## Qualitätsprüfung

| Kriterium | Prüfmethode | Bestanden |
|-----------|------------|-----------|
| Alle Pflichtabschnitte nach NW-STD-000 Kap. 4 vorhanden | Abschnittsprüfung | ✅ |
| Plattformunabhängig formuliert | Kein plattformspezifischer Code im Normteil | ✅ |
| Mindestens 40 Beispiele mit Begründung | Zählung Kapitel 12 | ✅ (50+) |
| Integritätsmodell vollständig | Kapitel 5 | ✅ |
| Migrationsregeln vorhanden | Kapitel 10 | ✅ |
| Validierungsprinzipien beschrieben | Kapitel 11 | ✅ |
| Roadmap für alle genannten Module | Kapitel 13 | ✅ |
| Kritische Selbstbewertung vorhanden | nächster Abschnitt | ✅ |

---

## Kritische Selbstbewertung

### Stärken

- Vollständige Abdeckung aller 13 Kapitel ohne Platzhalter
- Plattformunabhängige Formulierung mit konkreten Plattformbeispielen in dafür vorgesehenen Abschnitten
- Klare Trennung fachlicher und technischer Validierung
- STRATO-Quirks dokumentiert als bekannte Ausnahmen
- 50+ kommentierte Beispiele über alle Kategorien
- Bestehende NeuroWays-Modelle (World, Assets, Methoden) explizit adressiert

### Dokumentierte Schwachstellen

**1. Kein konkretes Typsystem definiert**
Der Standard beschreibt Feldtypen abstrakt (text, number, datetime). Konkrete Datenbanktypen (varchar(255), uuid, jsonb, timestamp with timezone) sind in Plattform-Implementierungsdokumenten zu definieren. Das ist eine bewusste Entscheidung für Plattformunabhängigkeit — aber es bedeutet, dass Entwickler beim Übergang auf eine neue Plattform Übersetzungsarbeit leisten müssen.

**2. Mehrmandantenfähigkeit nicht geregelt**
Das Modell ist auf eine einzelne NeuroWays-Installation ausgelegt. Wenn NeuroWays mehrere Organisationen (Mandanten) bedienen soll, braucht jede Entität eine `org_id` oder einen Tenant-Isolationsmechanismus. Das wird in NW-STD-003 v1.1.0 adressiert.

**3. Datenschutz/DSGVO ausgeklammert**
Welche Felder personenbezogene Daten enthalten und welche Rechte Nutzer darüber haben, ist bewusst ausgeklammert (NW-STD-080). Solange diese Felder nicht gekennzeichnet sind, ist kein vollständiges DSGVO-Compliance-Modell möglich.

**4. Indexierungsregeln fehlen**
Welche Felder indexiert werden sollten (für Performance), ist nicht beschrieben. Das ist plattformspezifisch, sollte aber zumindest als Prinzip formuliert werden.

**5. Konfliktresolution bei parallelen Schreibzugriffen**
Optimistic Locking, Pessimistic Locking oder andere Konfliktstrategien sind nicht beschrieben. Auf STRATO ohne Transaktionssupport ist das besonders relevant.

### Gesamtbewertung

**NW-STD-003 ist ausreichend vollständig, damit zukünftige Datenmodelle auf seiner Basis entwickelt werden können.**

Die vier Schwachstellen (Typsystem, Mehrmandant, DSGVO, Indexierung) sind alle bekannt, dokumentiert und in Folgestandards oder MINOR-Updates adressierbar. Sie blockieren keine neuen Modellierungsentscheidungen — sie schränken nur die Vollständigkeit der Implementierungsgrundlage ein.

Empfehlung: NW-STD-003 auf Status `review` setzen, sobald die Governance-Reviews für NW-STD-000 und NW-STD-001 abgeschlossen sind.

---

*NW-STD-003 — NeuroWays Database Standard v1.0.1 — Status: published — Veröffentlicht 2026-07-23*

┌─────────────────────────────────────────────────
│ ./index.html
└─────────────────────────────────────────────────
<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Favicon -->
    <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png" />
    <link rel="icon" type="image/svg+xml" href="favicon.svg" />

    <!-- PWA Manifest -->
    <link rel="manifest" href="manifest.webmanifest" />

    <!-- Theme Color — NeuroWays Deep Navy -->
    <meta name="theme-color" content="#0A1F44" />

    <!-- Apple iOS PWA -->
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="NeuroFlow" />
    <link rel="apple-touch-icon" href="apple-touch-icon.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="icons/icon-152x152.png" />
    <link rel="apple-touch-icon" sizes="167x167" href="icons/icon-167x167.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="icons/icon-180x180.png" />

    <!-- Android / Chrome -->
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="application-name" content="NeuroFlow" />

    <!-- Windows -->
    <meta name="msapplication-TileColor" content="#0A1F44" />
    <meta name="msapplication-TileImage" content="icons/icon-144x144.png" />

    <!-- App Title & Description -->
    <title>NeuroWays Energy Navigator</title>
    <meta name="description" content="Beobachte deinen Energie- und Belastungszustand — klar, ruhig und ohne Bewertung. Für Menschen mit unterschiedlichen Denk- und Wahrnehmungsmustern." />

    <!-- Background before CSS loads — white per Design Core -->
    <style>html { background: #ffffff; }</style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

┌─────────────────────────────────────────────────
│ ./nw_migrate.js
└─────────────────────────────────────────────────
/**
 * NW-DEPLOY-001 — NeuroWays Migration Script
 * Migrates all fachliche Stammdaten from DEV to LIVE.
 * Idempotent: upserts by id — safe to run multiple times.
 * NEVER migrates: users, checkins, checkin_answers, checkin_results, identity_test_values, identity_audit_log
 */
const http = require("http");
const crypto = require("crypto");

const DEV_TOKEN  = process.env.DEV_TOKEN;
const LIVE_TOKEN = process.env.LIVE_TOKEN;

const DEV_BASE  = "http://localhost/.sfs-bd/api";
const LIVE_BASE = "http://localhost/.sfs-be/api";

function req(method, baseUrl, path, body, token) {
  return new Promise((resolve, reject) => {
    const opts = {
      socketPath: "/run/cm4all/http/tie.socket",
      hostname: "localhost", method,
      path: baseUrl.replace("http://localhost","") + path,
      headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" }
    };
    const r = http.request(opts, res => {
      let b = ""; res.on("data", c => b += c);
      res.on("end", () => { try { resolve({ s: res.statusCode, b: JSON.parse(b) }); } catch(e) { resolve({ s: res.statusCode, b: {} }); } });
    });
    r.on("error", reject);
    if (body) r.write(JSON.stringify(body));
    r.end();
  });
}

async function getAllRecords(baseUrl, col, token) {
  const all = [];
  let page = 1;
  while (true) {
    const res = await req("GET", baseUrl, `/collections/${col}/records?page=${page}&perPage=200&skipTotal=false`, null, token);
    if (!res.b.items || res.b.items.length === 0) break;
    all.push(...res.b.items);
    if (all.length >= res.b.totalItems) break;
    page++;
  }
  return all;
}

// Strip PocketBase metadata fields that should not be sent on create/update
function stripMeta(record) {
  const { collectionId, collectionName, expand, ...data } = record;
  return data;
}

async function upsertRecord(col, record, liveToken) {
  const data = stripMeta(record);
  // Try to get existing record by id
  const check = await req("GET", LIVE_BASE, `/collections/${col}/records/${record.id}`, null, liveToken);
  if (check.s === 200) {
    // Update
    const upd = await req("PATCH", LIVE_BASE, `/collections/${col}/records/${record.id}`, data, liveToken);
    return { action: "updated", id: record.id, ok: upd.s < 300 };
  } else {
    // Create with explicit id
    const cre = await req("POST", LIVE_BASE, `/collections/${col}/records`, data, liveToken);
    return { action: "created", id: record.id, ok: cre.s < 300, err: cre.s >= 300 ? JSON.stringify(cre.b).slice(0,120) : null };
  }
}

// Migration manifest — ordered by dependency
const MASTER_DATA_COLLECTIONS = [
  "methods",
  "questions",
  "answer_options",
  "result_rules",
  "world_versions",
  "world_regions",
  "design_tokens",
  "design_rules",
  "animation_rules",
  "accessibility_rules",
  "asset_versions",
  "asset_files",
  "asset_assignments",
  "asset_metadata",
  "asset_prompts",
  "pkg_bases",
  "pkg_base_versions",
  "pkg_modules",
  "pkg_module_versions",
];

async function run() {
  const startTime = Date.now();
  const results = {};
  let totalMigrated = 0;
  let totalErrors = 0;

  console.log("══════════════════════════════════════════════════");
  console.log("NW-DEPLOY-001 — Stammdaten-Migration DEV → LIVE");
  console.log("Gestartet:", new Date().toISOString());
  console.log("══════════════════════════════════════════════════\n");

  for (const col of MASTER_DATA_COLLECTIONS) {
    console.log(`[${col}] Lade Quelldaten …`);
    const records = await getAllRecords(DEV_BASE, col, DEV_TOKEN);
    console.log(`[${col}] ${records.length} Datensätze gefunden`);
    
    let created = 0, updated = 0, errors = 0;
    for (const rec of records) {
      const r = await upsertRecord(col, rec, LIVE_TOKEN);
      if (r.ok) {
        if (r.action === "created") created++;
        else updated++;
      } else {
        errors++;
        console.log(`  ⚠️  ${col}/${r.id}: ${r.err}`);
      }
    }
    
    results[col] = { total: records.length, created, updated, errors };
    totalMigrated += records.length;
    totalErrors += errors;
    console.log(`[${col}] ✅ ${created} neu + ${updated} aktualisiert${errors ? ` + ⚠️ ${errors} Fehler` : ""}\n`);
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  
  // Compute checksum over migration results
  const cs = crypto.createHash("sha256").update(JSON.stringify(results)).digest("hex");

  console.log("══════════════════════════════════════════════════");
  console.log("MIGRATIONSERGEBNIS");
  console.log("══════════════════════════════════════════════════");
  console.log(`Dauer:            ${duration}s`);
  console.log(`Gesamt migriert:  ${totalMigrated} Datensätze`);
  console.log(`Fehler:           ${totalErrors}`);
  console.log(`Prüfsumme:        ${cs.slice(0,32)}…`);
  console.log("");

  // Write results to file for deploy report
  const fs = require("fs");
  fs.writeFileSync("/tmp/nw_migration_result.json", JSON.stringify({ results, totalMigrated, totalErrors, duration, checksum: cs, timestamp: new Date().toISOString() }, null, 2));
  
  return totalErrors === 0;
}

run().then(ok => process.exit(ok ? 0 : 1)).catch(e => { console.error(e); process.exit(1); });

┌─────────────────────────────────────────────────
│ ./package-lock.json
└─────────────────────────────────────────────────
{
  "name": "my-site",
  "version": "0.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "my-site",
      "version": "0.0.0",
      "devDependencies": {}
    }
  }
}

┌─────────────────────────────────────────────────
│ ./package.json
└─────────────────────────────────────────────────
{
  "name": "my-site",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build --mode preview",
    "build:prod": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {},
  "devDependencies": {}
}

┌─────────────────────────────────────────────────
│ ./public/apple-touch-icon.png
└─────────────────────────────────────────────────
[Binärdatei – 12077 Bytes – nicht als Text darstellbar]


┌─────────────────────────────────────────────────
│ ./public/favicon-16x16.png
└─────────────────────────────────────────────────
[Binärdatei – 401 Bytes – nicht als Text darstellbar]


┌─────────────────────────────────────────────────
│ ./public/favicon-32x32.png
└─────────────────────────────────────────────────
[Binärdatei – 846 Bytes – nicht als Text darstellbar]


┌─────────────────────────────────────────────────
│ ./public/favicon.svg
└─────────────────────────────────────────────────
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" rx="8" fill="#2a9d8f"/>
  <text x="16" y="22" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="white" text-anchor="middle">N</text>
</svg>

┌─────────────────────────────────────────────────
│ ./public/icons/icon-128x128.png
└─────────────────────────────────────────────────
[Binärdatei – 6826 Bytes – nicht als Text darstellbar]


┌─────────────────────────────────────────────────
│ ./public/icons/icon-144x144.png
└─────────────────────────────────────────────────
[Binärdatei – 8063 Bytes – nicht als Text darstellbar]


┌─────────────────────────────────────────────────
│ ./public/icons/icon-152x152.png
└─────────────────────────────────────────────────
[Binärdatei – 8877 Bytes – nicht als Text darstellbar]


┌─────────────────────────────────────────────────
│ ./public/icons/icon-167x167.png
└─────────────────────────────────────────────────
[Binärdatei – 9971 Bytes – nicht als Text darstellbar]


┌─────────────────────────────────────────────────
│ ./public/icons/icon-180x180.png
└─────────────────────────────────────────────────
[Binärdatei – 12077 Bytes – nicht als Text darstellbar]


┌─────────────────────────────────────────────────
│ ./public/icons/icon-192x192.png
└─────────────────────────────────────────────────
[Binärdatei – 13356 Bytes – nicht als Text darstellbar]


┌─────────────────────────────────────────────────
│ ./public/icons/icon-256x256.png
└─────────────────────────────────────────────────
[Binärdatei – 23036 Bytes – nicht als Text darstellbar]


┌─────────────────────────────────────────────────
│ ./public/icons/icon-384x384.png
└─────────────────────────────────────────────────
[Binärdatei – 48248 Bytes – nicht als Text darstellbar]


┌─────────────────────────────────────────────────
│ ./public/icons/icon-48x48.png
└─────────────────────────────────────────────────
[Binärdatei – 1508 Bytes – nicht als Text darstellbar]


┌─────────────────────────────────────────────────
│ ./public/icons/icon-512x512.png
└─────────────────────────────────────────────────
[Binärdatei – 76627 Bytes – nicht als Text darstellbar]


┌─────────────────────────────────────────────────
│ ./public/icons/icon-72x72.png
└─────────────────────────────────────────────────
[Binärdatei – 2450 Bytes – nicht als Text darstellbar]


┌─────────────────────────────────────────────────
│ ./public/icons/icon-96x96.png
└─────────────────────────────────────────────────
[Binärdatei – 3991 Bytes – nicht als Text darstellbar]


┌─────────────────────────────────────────────────
│ ./public/icons/icon-maskable-192x192.png
└─────────────────────────────────────────────────
[Binärdatei – 17451 Bytes – nicht als Text darstellbar]


┌─────────────────────────────────────────────────
│ ./public/icons/icon-maskable-512x512.png
└─────────────────────────────────────────────────
[Binärdatei – 95299 Bytes – nicht als Text darstellbar]


┌─────────────────────────────────────────────────
│ ./public/manifest.webmanifest
└─────────────────────────────────────────────────
{
  "name": "NeuroFlow",
  "short_name": "NeuroFlow",
  "description": "Beobachte deinen Energie- und Belastungszustand — klar, ruhig und ohne Bewertung.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0A1F44",
  "orientation": "portrait-primary",
  "lang": "de",
  "categories": ["health", "lifestyle"],
  "icons": [
    {
      "src": "/icons/icon-48x48.png",
      "sizes": "48x48",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-167x167.png",
      "sizes": "167x167",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-180x180.png",
      "sizes": "180x180",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-256x256.png",
      "sizes": "256x256",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-maskable-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/icons/icon-maskable-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}

┌─────────────────────────────────────────────────
│ ./public/neuroflow-icon.svg
└─────────────────────────────────────────────────
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <!-- White rounded background -->
  <rect width="512" height="512" rx="115" fill="#ffffff"/>

  <!-- Outer circle -->
  <circle cx="256" cy="240" r="185" fill="none" stroke="#1a2a6c" stroke-width="14"/>

  <!-- NW letterform - N -->
  <path d="M128 145 L128 295 L210 165 L210 295" fill="none" stroke="#1a2a6c" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- NW letterform - w -->
  <path d="M210 165 L240 295 L268 200 L296 295 L340 165" fill="none" stroke="#1a2a6c" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Rainbow wave line -->
  <path d="M96 355 Q130 325 165 355 Q200 385 235 355 Q270 325 305 355 Q330 375 355 360" fill="none" stroke="url(#rainbowGrad)" stroke-width="10" stroke-linecap="round"/>

  <!-- Yellow dot -->
  <circle cx="370" cy="354" r="14" fill="#f5a623"/>

  <!-- Short dash after dot -->
  <line x1="390" y1="354" x2="420" y2="354" stroke="#f5a623" stroke-width="10" stroke-linecap="round"/>

  <!-- Bottom arc (smile) -->
  <path d="M96 380 Q256 445 416 380" fill="none" stroke="#1a2a6c" stroke-width="14" stroke-linecap="round"/>

  <defs>
    <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#2a9d8f"/>
      <stop offset="30%"  stop-color="#4c8fc4"/>
      <stop offset="60%"  stop-color="#9b5fbf"/>
      <stop offset="85%"  stop-color="#e76f51"/>
    </linearGradient>
  </defs>
</svg>

┌─────────────────────────────────────────────────
│ ./src/App.jsx
└─────────────────────────────────────────────────
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "./lib/authContext.jsx";
import AuthNav from "./components/AuthNav.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Auth pages (public)
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";

// Protected pages
import DashboardPage from "./pages/DashboardPage.jsx";
import CheckIn from "./pages/CheckIn.jsx";
import Result from "./pages/Result.jsx";
import History from "./pages/History.jsx";
import Privacy from "./pages/Privacy.jsx";

// Dev/POC (kept but not in main nav)
import IdentityPoc from "./pages/IdentityPoc.jsx";
import PromptLibraryPage from "./pages/PromptLibraryPage.jsx";

const basename = new URL(document.baseURI).pathname.replace(/\/$/, "");

function Layout({ children, showNav = true }) {
  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      {showNav && <AuthNav />}
      <div>{children}</div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <Routes>
          {/* Public auth routes — no nav */}
          <Route path="/login"           element={<LoginPage />} />
          <Route path="/register"        element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Protected routes — with AuthNav */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout><DashboardPage /></Layout>
            </ProtectedRoute>
          } />

          <Route path="/checkin" element={
            <ProtectedRoute>
              <Layout><CheckIn /></Layout>
            </ProtectedRoute>
          } />

          <Route path="/result/:id" element={
            <ProtectedRoute>
              <Layout><Result /></Layout>
            </ProtectedRoute>
          } />

          <Route path="/history" element={
            <ProtectedRoute>
              <Layout><History /></Layout>
            </ProtectedRoute>
          } />

          <Route path="/privacy" element={
            <ProtectedRoute>
              <Layout><Privacy /></Layout>
            </ProtectedRoute>
          } />

          {/* Dev POC — accessible without auth for testing */}
          <Route path="/identity-poc" element={<Layout><IdentityPoc /></Layout>} />

          {/* Admin: Prompt Library — protected, internal only */}
          <Route path="/admin/prompts" element={
            <ProtectedRoute>
              <Layout><PromptLibraryPage /></Layout>
            </ProtectedRoute>
          } />

          {/* Root redirect → login (if not auth'd) or dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

┌─────────────────────────────────────────────────
│ ./src/components/AnswerCard.jsx
└─────────────────────────────────────────────────
/**
 * NW-DS-006 — Component System: AnswerCard
 * NW-DS-007 — Illustration System: Energy Level Icons
 *
 * Reusable answer option card for all NeuroWays questionnaire methods.
 * Icons support text — they never replace it.
 * Accessible without color (icon + text always present).
 *
 * Props:
 *   icon           string  — one of: zap | leaf | waves | battery-low | battery-empty
 *   accentColor    string  — CSS color for border and icon stroke
 *   backgroundColor string — CSS color for icon circle background (pastel)
 *   label          string  — Answer text shown to the user
 *   selected       bool    — Whether this option is currently chosen
 *   onClick        fn      — Selection handler
 *   ariaLabel      string  — Optional aria-label override
 */
import Zap        from "icon:zap";
import Leaf       from "icon:leaf";
import Waves      from "icon:waves";
import BatteryLow from "icon:battery-low";
import BatteryOff from "icon:battery";

// ─── Icon map (outline only, no fill) ────────────────────────────────────────
const ICON_MAP = {
  "zap":           Zap,
  "leaf":          Leaf,
  "waves":         Waves,
  "battery-low":   BatteryLow,
  "battery-empty": BatteryOff,
};

// ─── Energy level presets — mapped from numeric_value 1–5 ────────────────────
export const ENERGY_ICON_PRESETS = {
  1: { icon: "zap",           accentColor: "#008CA8", backgroundColor: "#e0f7fa" },
  2: { icon: "leaf",          accentColor: "#4caf7d", backgroundColor: "#e8f5e9" },
  3: { icon: "waves",         accentColor: "#E2A83B", backgroundColor: "#fff8e1" },
  4: { icon: "battery-low",   accentColor: "#e07a30", backgroundColor: "#fff3e0" },
  5: { icon: "battery-empty", accentColor: "#c0392b", backgroundColor: "#fdecea" },
};

export default function AnswerCard({
  icon,
  accentColor,
  backgroundColor,
  label,
  selected,
  onClick,
  ariaLabel,
}) {
  const IconComponent = ICON_MAP[icon] || Waves;

  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      aria-label={ariaLabel || label}
      style={{
        // Layout
        display: "flex",
        alignItems: "center",
        gap: "14px",
        width: "100%",
        textAlign: "left",
        padding: "14px 18px",
        minHeight: 64,
        // Shape
        borderRadius: 16,
        border: `2px solid ${selected ? accentColor : "#e5e7eb"}`,
        // Color
        background: selected ? accentColor + "12" : "#fff",
        cursor: "pointer",
        // Typography
        fontSize: 15,
        fontWeight: selected ? 600 : 500,
        color: selected ? accentColor : "#374151",
        fontFamily: "'DM Sans', sans-serif",
        // Smooth 150–200ms transitions — no jumpy effects
        transition: "border-color 0.17s ease, background 0.17s ease, color 0.17s ease, box-shadow 0.17s ease",
        boxShadow: selected ? `0 0 0 3px ${accentColor}20` : "none",
      }}
    >
      {/* Icon circle */}
      {icon && (
        <div
          aria-hidden="true"
          style={{
            flexShrink: 0,
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: selected ? accentColor + "22" : backgroundColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.17s ease",
          }}
        >
          <IconComponent
            size={18}
            color={accentColor}
            strokeWidth={1.8}
          />
        </div>
      )}

      {/* Label */}
      <span style={{ flex: 1, lineHeight: 1.45 }}>{label}</span>

      {/* Selected indicator — accessible, not color-only */}
      {selected && (
        <span
          aria-hidden="true"
          style={{
            flexShrink: 0,
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: accentColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.8 7L9 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      )}
    </button>
  );
}

┌─────────────────────────────────────────────────
│ ./src/components/AuthNav.jsx
└─────────────────────────────────────────────────
/**
 * NW-IDENTITY-002 — Auth-aware Navigation
 * Reflects full auth state: public vs. protected nav.
 */
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../lib/authContext.jsx";
import Home from "icon:home";
import ClipboardList from "icon:clipboard-list";
import BarChart2 from "icon:bar-chart-2";
import Package from "icon:package";
import Hammer from "icon:hammer";
import LogOut from "icon:log-out";
import User from "icon:user";

export default function AuthNav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  if (!user) {
    return (
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", height: 60, background: "#fff",
        borderBottom: "1px solid #e5e5e5", position: "sticky", top: 0, zIndex: 40,
      }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 17, color: "#0A1F44", letterSpacing: "0.12em" }}>
          NEUROWAYS
        </span>
        <div style={{ display: "flex", gap: 8 }}>
          <NavLink to="/login"    style={({ isActive }) => pillStyle(isActive)}>Anmelden</NavLink>
          <NavLink to="/register" style={() => pillStyle(false, true)}>Registrieren</NavLink>
        </div>
      </header>
    );
  }

  const mainLinks = [
    { to: "/dashboard", label: "Start",       Icon: Home,          end: true },
    { to: "/checkin",   label: "Check-in",    Icon: ClipboardList, end: false },
    { to: "/history",   label: "Verlauf",     Icon: BarChart2,     end: false },
  ];
  const extraLinks = [
    { to: "/my-packages", label: "Meine Pakete", Icon: Package, end: false, soon: true },
    { to: "/my-builds",   label: "Meine Builds", Icon: Hammer,  end: false, soon: true },
  ];

  return (
    <>
      {/* ── Desktop top nav ── */}
      <header className="hidden md:flex" style={{
        alignItems: "center", justifyContent: "space-between",
        padding: "0 32px", height: 64, background: "#fff",
        borderBottom: "1px solid #e5e5e5", position: "sticky", top: 0, zIndex: 40,
      }}>
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "#0A1F44", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>N</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, color: "#0A1F44", letterSpacing: "0.08em", fontFamily: "'DM Sans', sans-serif" }}>NEUROWAYS</span>
        </div>

        {/* Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {mainLinks.map(({ to, label, Icon, end }) => (
            <NavLink key={to} to={to} end={end} style={({ isActive }) => linkStyle(isActive)}>
              <Icon size={14} />
              {label}
            </NavLink>
          ))}
          <div style={{ width: 1, height: 18, background: "#e5e5e5", margin: "0 6px" }} />
          {extraLinks.map(({ to, label, Icon }) => (
            <span key={to} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 10, fontSize: 13, color: "#b0b8c4", cursor: "default", userSelect: "none" }}>
              <Icon size={13} />
              {label}
              <span style={{ fontSize: 10, background: "#f0f0f0", color: "#b0b8c4", padding: "1px 5px", borderRadius: 5, letterSpacing: "0.04em" }}>Bald</span>
            </span>
          ))}
          <div style={{ width: 1, height: 18, background: "#e5e5e5", margin: "0 6px" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 10, background: "#f6f4f1" }}>
            <User size={13} color="#0A1F44" />
            <span style={{ fontSize: 12, color: "#0A1F44", fontWeight: 600, maxWidth: 130, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user.display_name || user.email?.split("@")[0]}
            </span>
          </div>
          <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 10, fontSize: 13, fontWeight: 500, background: "transparent", border: "none", cursor: "pointer", color: "#6b7280", fontFamily: "'DM Sans', sans-serif" }}>
            <LogOut size={14} />
            Abmelden
          </button>
        </nav>
      </header>

      {/* ── Mobile bottom nav ── */}
      <nav className="md:hidden" style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40,
        background: "#fff", borderTop: "1px solid #e5e5e5",
        display: "flex", alignItems: "center", justifyContent: "space-around",
        padding: "4px 0 calc(4px + env(safe-area-inset-bottom))",
      }}>
        {mainLinks.map(({ to, label, Icon, end }) => (
          <NavLink key={to} to={to} end={end} style={({ isActive }) => mobileTabStyle(isActive)}>
            {({ isActive }) => (
              <>
                <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: isActive ? "#f0f4fa" : "transparent" }}>
                  <Icon size={18} color={isActive ? "#0A1F44" : "#9ca3af"} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 500 }}>{label}</span>
              </>
            )}
          </NavLink>
        ))}
        <button onClick={handleLogout} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "4px 12px", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", minWidth: 56, fontFamily: "'DM Sans', sans-serif" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <LogOut size={18} color="#9ca3af" />
          </div>
          <span style={{ fontSize: 10, fontWeight: 500 }}>Abmelden</span>
        </button>
      </nav>
    </>
  );
}

function pillStyle(isActive, primary = false) {
  if (primary) return { padding: "7px 18px", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none", background: "#0A1F44", color: "#fff" };
  return { padding: "7px 18px", borderRadius: 10, fontSize: 14, fontWeight: 500, textDecoration: "none", color: isActive ? "#0A1F44" : "#6b7280", background: isActive ? "#f0f4fa" : "transparent" };
}

function linkStyle(isActive) {
  return { display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 10, fontSize: 13, fontWeight: 500, textDecoration: "none", color: isActive ? "#0A1F44" : "#6b7280", background: isActive ? "#f0f4fa" : "transparent", transition: "all 0.15s" };
}

function mobileTabStyle(isActive) {
  return { display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "4px 12px", textDecoration: "none", minWidth: 56, color: isActive ? "#0A1F44" : "#9ca3af" };
}

┌─────────────────────────────────────────────────
│ ./src/components/Nav.jsx
└─────────────────────────────────────────────────
import { NavLink } from "react-router";
import Home from "icon:home";
import ClipboardList from "icon:clipboard-list";
import BarChart2 from "icon:bar-chart-2";
import Shield from "icon:shield";

const links = [
  { to: "/", label: "Start", Icon: Home },
  { to: "/checkin", label: "Check-in", Icon: ClipboardList },
  { to: "/history", label: "Verlauf", Icon: BarChart2 },
  { to: "/privacy", label: "Datenschutz", Icon: Shield },
];

export default function Nav() {
  return (
    <>
      {/* Desktop top nav */}
      <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#2a9d8f" }}>
            <span className="text-white text-sm font-bold">N</span>
          </div>
          <span className="font-semibold text-gray-800 text-base tracking-tight">NeuroWays</span>
          <span className="text-gray-300 text-base">|</span>
          <span className="text-gray-500 text-sm">Energy Navigator</span>
        </div>
        <nav className="flex items-center gap-1">
          {links.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "text-teal-700 bg-teal-50"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 px-2 py-2 flex items-center justify-around">
        {links.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors min-w-[60px] ${
                isActive ? "text-teal-600" : "text-gray-400"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                    isActive ? "bg-teal-50" : ""
                  }`}
                >
                  <Icon size={18} color={isActive ? "#0d9488" : "#9ca3af"} />
                </div>
                <span className="text-[10px] font-medium">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </>
  );
}

┌─────────────────────────────────────────────────
│ ./src/components/ProtectedRoute.jsx
└─────────────────────────────────────────────────
/**
 * NW-IDENTITY-002 — Protected Route Guard
 * Redirects unauthenticated users to /login.
 * LOCKED/DEACTIVATED accounts are also redirected.
 */
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../lib/authContext.jsx";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        minHeight: "100vh", background: "#fff"
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          border: "2.5px solid #e5e5e5", borderTopColor: "#0A1F44",
          animation: "spin 0.8s linear infinite"
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.account_status === "LOCKED") {
    return <Navigate to="/login" state={{ error: "locked" }} replace />;
  }

  if (user.account_status === "DEACTIVATED") {
    return <Navigate to="/login" state={{ error: "deactivated" }} replace />;
  }

  return children;
}

┌─────────────────────────────────────────────────
│ ./src/components/ZoneCard.jsx
└─────────────────────────────────────────────────
import ZoneIcon from "./ZoneIcon.jsx";

/**
 * ZoneCard — displays a result_rule record.
 * rule shape: { result_code, result_label, description, observation_hint, icon, color, bg_color }
 */
export default function ZoneCard({ rule, compact = false }) {
  if (!rule) return null;

  const zone = {
    label: rule.result_label,
    description: rule.description,
    hint: rule.observation_hint,
    icon: rule.icon,
    color: rule.color || "#2a9d8f",
    bgColor: rule.bg_color || "#e8f5f3",
  };

  if (compact) {
    return (
      <div
        className="flex items-center gap-3 rounded-2xl px-4 py-3"
        style={{ backgroundColor: zone.bgColor, border: `1.5px solid ${zone.color}20` }}
      >
        <ZoneIcon icon={zone.icon} color={zone.color} size={32} />
        <div>
          <p className="text-xs font-medium" style={{ color: zone.color }}>
            Dein Bereich
          </p>
          <p className="text-base font-semibold text-gray-800">{zone.label}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-3xl p-6"
      style={{ backgroundColor: zone.bgColor, border: `2px solid ${zone.color}30` }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: zone.color + "20" }}
        >
          <ZoneIcon icon={zone.icon} color={zone.color} size={28} />
        </div>
        <div>
          <p className="text-sm font-medium mb-0.5" style={{ color: zone.color }}>
            Dein aktueller Bereich
          </p>
          <h2 className="text-2xl font-bold text-gray-800">{zone.label}</h2>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed mb-4">{zone.description}</p>
      <div
        className="rounded-2xl p-4"
        style={{ backgroundColor: zone.color + "10", border: `1px solid ${zone.color}20` }}
      >
        <p className="text-sm text-gray-600 leading-relaxed">
          <span className="font-semibold" style={{ color: zone.color }}>Beobachtungshinweis: </span>
          {zone.hint}
        </p>
      </div>
      <p className="text-xs text-gray-400 mt-4 leading-relaxed">
        Diese Einschätzung ist kein medizinischer Befund. Sie dient ausschließlich zur persönlichen Selbstbeobachtung.
      </p>
    </div>
  );
}

┌─────────────────────────────────────────────────
│ ./src/components/ZoneIcon.jsx
└─────────────────────────────────────────────────
import Mountain from "icon:mountain";
import Trees from "icon:trees";
import Waves from "icon:waves";
import Anchor from "icon:anchor";
import Umbrella from "icon:umbrella";
import Circle from "icon:circle";

const iconMap = {
  mountain: Mountain,
  trees: Trees,
  waves: Waves,
  anchor: Anchor,
  umbrella: Umbrella,
};

export default function ZoneIcon({ icon, color = "#2a9d8f", size = 24 }) {
  const Icon = iconMap[icon] || Circle;
  return <Icon size={size} color={color} />;
}

┌─────────────────────────────────────────────────
│ ./src/index.css
└─────────────────────────────────────────────────
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
@import "tailwindcss";
@config "../tailwind.config.cjs";

* {
  box-sizing: border-box;
}

body {
  font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Smooth transitions for interactive elements */
button, a {
  transition: opacity 0.15s ease, background-color 0.15s ease, border-color 0.15s ease;
}

/* Remove default button styles */
button {
  cursor: pointer;
}

/* Prevent layout shifts */
html {
  scroll-behavior: smooth;
}

┌─────────────────────────────────────────────────
│ ./src/lib/asset_engine_validation.js
└─────────────────────────────────────────────────
const http = require("http");

const TOKEN = process.env.PB_TOKEN;
const WV_ID = "3hbx5gsy932l77e"; // published world_version 1.1.0

function req(method, path, body) {
  return new Promise((resolve, reject) => {
    const opts = {
      socketPath: "/run/cm4all/http/tie.socket",
      hostname: "localhost",
      method,
      path: "/.sfs-bd/api" + path,
      headers: {
        "Authorization": "Bearer " + TOKEN,
        "Content-Type": "application/json"
      }
    };
    const r = http.request(opts, res => {
      let b = "";
      res.on("data", c => b += c);
      res.on("end", () => resolve(JSON.parse(b)));
    });
    r.on("error", reject);
    if (body) r.write(JSON.stringify(body));
    r.end();
  });
}

// ─── Validation helpers ──────────────────────────────────────────────────────

const VALID_ASSET_TYPES = ["illustration","svg_icon","logo","animation","audio","video","font","texture","background","component_asset"];
const VALID_ASSET_STATUS = ["draft","review","published","rejected","superseded","archived"];
const VALID_TARGET_TYPES = ["world","world_region","component","method","result_rule"];
const VALID_USAGE_TYPES  = ["hero","background","result_image","region_icon","energy_icon","thumbnail","texture"];
const VALID_VALUE_TYPES  = ["string","number","boolean","json","date"];
const VALID_PROMPT_STATUS = ["draft","approved","archived"];
const MUTABLE_AFTER_PUBLISH = ["status","superseded_at","superseded_by_id","updated"];

async function checkRefExists(col, id) {
  if (!id) return true; // optional ref
  const r = await req("GET", `/collections/${col}/records/${id}`);
  return !r.message;
}

async function checkUnique(col, filter) {
  const enc = encodeURIComponent(filter);
  const r = await req("GET", `/collections/${col}/records?filter=${enc}&perPage=1`);
  return (r.totalItems || 0) === 0;
}

async function checkPrimaryUnique(targetType, targetId, usageType, excludeId) {
  const today = new Date().toISOString().split("T")[0];
  const enc = encodeURIComponent(
    `target_type="${targetType}"&&target_id="${targetId}"&&usage_type="${usageType}"&&is_primary=true`
  );
  const r = await req("GET", `/collections/asset_assignments/records?filter=${enc}&perPage=10`);
  const active = (r.items || []).filter(a => {
    if (a.id === excludeId) return false;
    if (a.valid_to && a.valid_to < today) return false;
    if (a.valid_from && a.valid_from > today) return false;
    return true;
  });
  return active.length === 0;
}

async function isPublished(assetVersionId) {
  const r = await req("GET", `/collections/asset_versions/records/${assetVersionId}`);
  return r.status === "published";
}

// ─── Guarded write functions ─────────────────────────────────────────────────

async function createAssetVersion(data) {
  const errors = [];
  if (!VALID_ASSET_TYPES.includes(data.asset_type)) errors.push("Ungültiger asset_type: " + data.asset_type);
  if (!VALID_ASSET_STATUS.includes(data.status)) errors.push("Ungültiger status: " + data.status);
  if (!(await checkRefExists("world_versions", data.world_version_id))) errors.push("world_version_id existiert nicht");
  if (data.superseded_by_id && !(await checkRefExists("asset_versions", data.superseded_by_id))) errors.push("superseded_by_id existiert nicht");
  const unique = await checkUnique("asset_versions", `code="${data.code}"&&version="${data.version}"`);
  if (!unique) errors.push(`Asset ${data.code} v${data.version} existiert bereits`);
  if (errors.length) return { ok: false, errors };
  const r = await req("POST", "/collections/asset_versions/records", data);
  return r.message ? { ok: false, errors: [r.message] } : { ok: true, record: r };
}

async function createAssetFile(data) {
  const errors = [];
  if (!(await checkRefExists("asset_versions", data.asset_version_id))) errors.push("asset_version_id existiert nicht");
  if (await isPublished(data.asset_version_id)) errors.push("Asset ist veröffentlicht — keine neuen Dateien erlaubt");
  data.locale = data.locale || "*";
  data.theme = data.theme || "standard";
  data.resolution_variant = data.resolution_variant || "standard";
  if (!data.locale || !data.theme || !data.resolution_variant) errors.push("locale, theme und resolution_variant sind Pflicht");
  if ((data.file_url || "").startsWith("data:")) errors.push("Data-URI in file_url nicht erlaubt");
  const unique = await checkUnique("asset_files",
    `asset_version_id="${data.asset_version_id}"&&resolution_variant="${data.resolution_variant}"&&locale="${data.locale}"&&theme="${data.theme}"`);
  if (!unique) errors.push("Dateivariante bereits vorhanden (Duplikat)");
  if (errors.length) return { ok: false, errors };
  const r = await req("POST", "/collections/asset_files/records", data);
  return r.message ? { ok: false, errors: [r.message] } : { ok: true, record: r };
}

async function createAssetAssignment(data) {
  const errors = [];
  if (!(await checkRefExists("asset_versions", data.asset_version_id))) errors.push("asset_version_id existiert nicht");
  if (await isPublished(data.asset_version_id)) errors.push("Asset ist veröffentlicht — keine neuen Zuordnungen erlaubt");
  if (!VALID_TARGET_TYPES.includes(data.target_type)) errors.push("Ungültiger target_type: " + data.target_type);
  if (!VALID_USAGE_TYPES.includes(data.usage_type)) errors.push("Ungültiger usage_type: " + data.usage_type);
  const unique = await checkUnique("asset_assignments",
    `asset_version_id="${data.asset_version_id}"&&target_type="${data.target_type}"&&target_id="${data.target_id}"&&usage_type="${data.usage_type}"`);
  if (!unique) errors.push("Zuordnung bereits vorhanden (Duplikat)");
  if (data.is_primary) {
    const primaryFree = await checkPrimaryUnique(data.target_type, data.target_id, data.usage_type, null);
    if (!primaryFree) errors.push("Für diese Kombination existiert bereits eine primäre Zuordnung");
  }
  if (errors.length) return { ok: false, errors };
  const r = await req("POST", "/collections/asset_assignments/records", data);
  return r.message ? { ok: false, errors: [r.message] } : { ok: true, record: r };
}

async function createAssetMetadata(data) {
  const errors = [];
  if (!(await checkRefExists("asset_versions", data.asset_version_id))) errors.push("asset_version_id existiert nicht");
  if (await isPublished(data.asset_version_id)) errors.push("Asset ist veröffentlicht — Metadaten unveränderlich");
  if (!VALID_VALUE_TYPES.includes(data.value_type || "string")) errors.push("Ungültiger value_type");
  data.value_type = data.value_type || "string";
  const unique = await checkUnique("asset_metadata",
    `asset_version_id="${data.asset_version_id}"&&metadata_key="${data.metadata_key}"`);
  if (!unique) errors.push("Metadatenschlüssel bereits vorhanden (Duplikat)");
  if (errors.length) return { ok: false, errors };
  const r = await req("POST", "/collections/asset_metadata/records", data);
  return r.message ? { ok: false, errors: [r.message] } : { ok: true, record: r };
}

async function createAssetPrompt(data) {
  const errors = [];
  if (!(await checkRefExists("asset_versions", data.asset_version_id))) errors.push("asset_version_id existiert nicht");
  if (await isPublished(data.asset_version_id)) errors.push("Asset ist veröffentlicht — Prompts unveränderlich");
  if (!(await checkRefExists("world_versions", data.source_world_version_id))) errors.push("source_world_version_id existiert nicht");
  if (!VALID_PROMPT_STATUS.includes(data.status)) errors.push("Ungültiger Prompt-Status: " + data.status);
  const unique = await checkUnique("asset_prompts",
    `asset_version_id="${data.asset_version_id}"&&prompt_version="${data.prompt_version}"`);
  if (!unique) errors.push("Prompt-Version bereits vorhanden (Duplikat)");
  if (errors.length) return { ok: false, errors };
  const r = await req("POST", "/collections/asset_prompts/records", data);
  return r.message ? { ok: false, errors: [r.message] } : { ok: true, record: r };
}

module.exports = { createAssetVersion, createAssetFile, createAssetAssignment, createAssetMetadata, createAssetPrompt, checkRefExists, isPublished };

┌─────────────────────────────────────────────────
│ ./src/lib/authContext.jsx
└─────────────────────────────────────────────────
/**
 * NW-IDENTITY-002 — Global Auth State
 * Provides auth context to the entire app. Reads exclusively from pb.authStore.
 * Never derives identity from URL or form input.
 */
import { createContext, useContext, useState, useEffect } from "react";
import { pb } from "./pb.js";
import { refreshAuthOnStartup, getCurrentUser, logout as identityLogout } from "./identity.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On mount: refresh token, then sync user state
    refreshAuthOnStartup().then(() => {
      setUser(getCurrentUser());
      setLoading(false);
    });

    // Listen to any auth store changes (login/logout from anywhere)
    const unsub = pb.authStore.onChange(() => {
      setUser(getCurrentUser());
    });

    return unsub;
  }, []);

  async function logout() {
    await identityLogout();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

┌─────────────────────────────────────────────────
│ ./src/lib/engine.js
└─────────────────────────────────────────────────
/**
 * NeuroWays Method Engine
 * All data fetched from the backend — no hardcoded questions, options, or rules.
 */
import { pb } from "./pb.js";

// ─── Methods ─────────────────────────────────────────────────────────────────

export async function getActiveMethod(signal) {
  const res = await pb.collection("methods").getList(1, 1, {
    filter: 'is_active = true && status = "active"',
    sort: "sort_order",
    signal,
  });
  if (res.items.length === 0) throw new Error("Keine aktive Methode gefunden.");
  return res.items[0];
}

// ─── Questions ───────────────────────────────────────────────────────────────

export async function getQuestionsForMethod(methodId, signal) {
  const res = await pb.collection("questions").getList(1, 200, {
    filter: `method_id = "${methodId}" && is_active = true`,
    sort: "sort_order",
    signal,
  });
  return res.items;
}

// ─── Answer options ──────────────────────────────────────────────────────────

export async function getAnswerOptions(questionId, signal) {
  const res = await pb.collection("answer_options").getList(1, 200, {
    filter: `question_id = "${questionId}" && is_active = true`,
    sort: "sort_order",
    signal,
  });
  return res.items;
}

/** Load all options for an array of question IDs in one query. */
export async function getAllAnswerOptionsForQuestions(questionIds, signal) {
  if (!questionIds.length) return [];
  const filter = questionIds.map((id) => `question_id = "${id}"`).join(" || ");
  const res = await pb.collection("answer_options").getList(1, 1000, {
    filter: `(${filter}) && is_active = true`,
    sort: "sort_order",
    signal,
  });
  return res.items;
}

// ─── Result rules ─────────────────────────────────────────────────────────────

export async function getResultRules(methodId, signal) {
  const res = await pb.collection("result_rules").getList(1, 100, {
    filter: `method_id = "${methodId}" && is_active = true`,
    sort: "sort_order",
    signal,
  });
  return res.items;
}

export function resolveResultRule(rules, score) {
  return rules.find((r) => score >= r.min_score && score <= r.max_score) || rules[rules.length - 1];
}

// ─── Scale-range warning ──────────────────────────────────────────────────────

/**
 * Checks whether the active result_rules cover the full achievable score range.
 * Emits console warnings if there are gaps, mismatches, or uncovered values.
 * Never modifies any data — purely diagnostic.
 *
 * @param {object[]} questions  — active questions for the method
 * @param {object[]} allOptions — all active answer_options for those questions
 * @param {object[]} rules      — active result_rules for the method
 */
export function warnIfScaleOutOfSync(questions, allOptions, rules) {
  if (!questions.length || !rules.length) return;

  // Compute achievable score range from options
  const byQuestion = {};
  for (const o of allOptions) {
    if (!byQuestion[o.question_id]) byQuestion[o.question_id] = [];
    byQuestion[o.question_id].push(o.numeric_value);
  }

  const requiredQuestions = questions.filter((q) => q.is_required);
  const allHaveOptions = requiredQuestions.every((q) => (byQuestion[q.id] || []).length > 0);
  if (!allHaveOptions) return; // validateMethodReadiness handles this separately

  const scoreMin = requiredQuestions.reduce(
    (sum, q) => sum + Math.min(...(byQuestion[q.id] || [0])),
    0
  );
  const scoreMax = requiredQuestions.reduce(
    (sum, q) => sum + Math.max(...(byQuestion[q.id] || [0])),
    0
  );

  const ruleMin = Math.min(...rules.map((r) => r.min_score));
  const ruleMax = Math.max(...rules.map((r) => r.max_score));

  const mismatch = ruleMin !== scoreMin || ruleMax !== scoreMax;
  if (mismatch) {
    console.warn(
      `[NeuroWays] Skalendiskrepanz: Erreichbare Gesamtpunktzahl ${scoreMin}–${scoreMax}, ` +
        `aber result_rules decken nur ${ruleMin}–${ruleMax} ab.`
    );
  }

  // Check for gaps in rule coverage
  const sortedRules = [...rules].sort((a, b) => a.min_score - b.min_score);
  let cursor = ruleMin;
  const gaps = [];
  for (const r of sortedRules) {
    if (r.min_score > cursor) gaps.push(`${cursor}–${r.min_score - 1}`);
    cursor = r.max_score + 1;
  }
  if (gaps.length > 0) {
    console.warn(`[NeuroWays] Lücken in result_rules: ${gaps.join(", ")}`);
  }

  // Warn about scores outside any rule
  const uncovered = [];
  for (let v = scoreMin; v <= scoreMax; v++) {
    if (!rules.some((r) => v >= r.min_score && v <= r.max_score)) uncovered.push(v);
  }
  if (uncovered.length > 0) {
    console.warn(
      `[NeuroWays] Nicht abgedeckte Punktwerte: ${uncovered.join(", ")}`
    );
  }

  if (!mismatch && gaps.length === 0 && uncovered.length === 0) {
    console.info(
      `[NeuroWays] Skalierung OK: Erreichbare Punkte ${scoreMin}–${scoreMax}, ` +
        `result_rules lückenlos ${ruleMin}–${ruleMax}.`
    );
  }
}

// ─── Pre-flight validation ────────────────────────────────────────────────────

/**
 * Validates that a method is fully configured before a check-in can start.
 * Returns { valid: true } or { valid: false, reason: string }
 *
 * Rules:
 * - Method must exist and be active
 * - At least one active question must exist
 * - Every required active question must have at least one active answer option
 * - At least one active result rule must exist
 */
export async function validateMethodReadiness(method, questions, optionsByQuestion, rules) {
  if (!method) {
    return { valid: false, reason: "Keine aktive Methode gefunden." };
  }

  if (questions.length === 0) {
    return { valid: false, reason: "Diese Methode enthält noch keine aktiven Fragen." };
  }

  if (rules.length === 0) {
    return { valid: false, reason: "Diese Methode enthält noch keine Ergebnisregeln." };
  }

  const requiredWithoutOptions = questions.filter(
    (q) => q.is_required && (optionsByQuestion[q.id] || []).length === 0
  );

  if (requiredWithoutOptions.length > 0) {
    const codes = requiredWithoutOptions.map((q) => q.code || q.id).join(", ");
    console.warn(
      `[NeuroWays] Validierung: Pflichtfrage(n) ohne aktive Antwortoptionen: ${codes}`
    );
    return {
      valid: false,
      reason:
        "Diese Methode ist derzeit noch nicht vollständig eingerichtet. Bitte versuche es später erneut.",
    };
  }

  return { valid: true };
}

/**
 * During a running check-in, filter questions to only those that can be answered:
 * - Required questions without options → returned in blockers[]
 * - Optional questions without options → silently skipped (returned in skipped[])
 * - Questions with options → returned in answerable[]
 */
export function partitionQuestions(questions, optionsByQuestion) {
  const answerable = [];
  const skipped = [];
  const blockers = [];

  for (const q of questions) {
    const opts = optionsByQuestion[q.id] || [];
    if (opts.length > 0) {
      answerable.push(q);
    } else if (q.is_required) {
      blockers.push(q);
    } else {
      skipped.push(q);
    }
  }

  return { answerable, skipped, blockers };
}

// ─── Check-in save ───────────────────────────────────────────────────────────

/**
 * Save a completed check-in.
 * @param {object} params
 * @param {string} params.methodId
 * @param {string} params.methodVersion
 * @param {Array<{questionId, answerId, dimensionCode, numericValue}>} params.answers
 * @param {object} params.rule  — the resolved result_rule record
 * @returns {string} the new checkin id
 */
export async function saveCheckin({ methodId, methodVersion, answers, rule }) {
  const totalScore = answers.reduce((s, a) => s + (a.numericValue || 0), 0);
  const today = new Date().toISOString().split("T")[0];

  const checkin = await pb.collection("checkins").create({
    method_id: methodId,
    method_version: methodVersion || "",
    session_date: today,
    total_score: totalScore,
    result_code: rule.result_code,
    result_label: rule.result_label,
  });

  // Sequential saves: concurrent requests drop silently in this environment.
  for (const a of answers) {
    await pb.collection("checkin_answers").create({
      checkin_id: checkin.id,
      question_id: a.questionId,
      answer_option_id: a.answerId,
      dimension_code: a.dimensionCode,
      numeric_value: a.numericValue,
    });
  }

  return checkin.id;
}

// ─── History ──────────────────────────────────────────────────────────────────

export async function getCheckinHistory(page = 1, perPage = 100, signal) {
  return pb.collection("checkins").getList(page, perPage, {
    sort: "-created",
    signal,
  });
}

export async function getCheckinById(id, signal) {
  return pb.collection("checkins").getOne(id, { signal });
}

export async function getAnswersForCheckin(checkinId, signal) {
  const res = await pb.collection("checkin_answers").getList(1, 200, {
    filter: `checkin_id = "${checkinId}"`,
    sort: "created",
    signal,
  });
  return res.items;
}

export async function deleteCheckin(id) {
  const answers = await pb.collection("checkin_answers").getList(1, 500, {
    filter: `checkin_id = "${id}"`,
  });
  await Promise.all(answers.items.map((a) => pb.collection("checkin_answers").delete(a.id)));
  await pb.collection("checkins").delete(id);
}

export async function deleteAllCheckins() {
  const res = await pb.collection("checkins").getList(1, 500);
  await Promise.all(res.items.map((c) => deleteCheckin(c.id)));
}

export async function exportAllData() {
  const checkins = await pb.collection("checkins").getList(1, 500, { sort: "-created" });
  const answers = await pb.collection("checkin_answers").getList(1, 5000);
  return { checkins: checkins.items, answers: answers.items };
}

┌─────────────────────────────────────────────────
│ ./src/lib/identity.js
└─────────────────────────────────────────────────
/**
 * NW-IDENTITY-POC-001 — Identity Layer
 * 
 * Technology-independent logic. All auth state comes from pb.authStore (server-side JWT).
 * Never derives user identity from URL params or form fields.
 * 
 * Separation:
 *   - Identity data:      users collection (email, display_name, account_status)
 *   - Auth logic:         this module (register, login, logout, reset)
 *   - Session context:    pb.authStore (SDK-managed, persisted in localStorage)
 *   - Personal data:      identity_test_values (row-level security: user_id = auth.id)
 *   - UI:                 pages/Identity*.jsx
 */

import { pb } from './pb.js';

// ─── Audit logging ────────────────────────────────────────────────────────────
// Logs security events without exposing passwords or plain tokens.
async function auditLog(eventType, { userId = null, success = true, note = null } = {}) {
  try {
    await pb.collection('identity_audit_log').create({
      user_id: userId || '',
      event_type: eventType,
      success,
      note: note || '',
    });
  } catch (_) {
    // Audit log failure is non-blocking — never surfaces to UI
  }
}

// ─── Session context ──────────────────────────────────────────────────────────
export function getCurrentUser() {
  if (!pb.authStore.isValid) return null;
  return pb.authStore.record;
}

export function isAuthenticated() {
  return pb.authStore.isValid;
}

// ─── Registration ─────────────────────────────────────────────────────────────
export async function register({ email, password, passwordConfirm, displayName }) {
  // Validate
  if (!email || !password || !passwordConfirm) {
    throw new Error('Bitte alle Pflichtfelder ausfüllen.');
  }
  if (password !== passwordConfirm) {
    throw new Error('Die Passwörter stimmen nicht überein.');
  }
  if (password.length < 8) {
    throw new Error('Das Passwort muss mindestens 8 Zeichen lang sein.');
  }

  try {
    // Create user — PocketBase handles password hashing
    const user = await pb.collection('users').create({
      email,
      password,
      passwordConfirm,
      display_name: displayName || '',
      account_status: 'ACTIVE',
    });

    await auditLog('REGISTRATION', { userId: user.id, success: true });

    // Auto-login after registration
    await pb.collection('users').authWithPassword(email, password);

    return { success: true, user };
  } catch (err) {
    await auditLog('REGISTRATION', { success: false, note: 'registration_failed' });
    // Generic error — never reveal if email already exists (security: no enumeration)
    if (err?.response?.code === 400) {
      throw new Error('Registrierung fehlgeschlagen. Bitte überprüfe deine Eingaben.');
    }
    throw new Error('Registrierung fehlgeschlagen. Bitte versuche es erneut.');
  }
}

// ─── Login ────────────────────────────────────────────────────────────────────
export async function login({ email, password }) {
  if (!email || !password) {
    throw new Error('Bitte E-Mail-Adresse und Passwort eingeben.');
  }

  try {
    const authData = await pb.collection('users').authWithPassword(email, password);
    const user = authData.record;

    // Check account status
    if (user.account_status === 'LOCKED') {
      pb.authStore.clear();
      await auditLog('LOGIN_BLOCKED', { userId: user.id, success: false, note: 'account_locked' });
      throw new Error('Dieses Konto ist gesperrt. Bitte wende dich an den Support.');
    }
    if (user.account_status === 'DEACTIVATED') {
      pb.authStore.clear();
      await auditLog('LOGIN_BLOCKED', { userId: user.id, success: false, note: 'account_deactivated' });
      throw new Error('Dieses Konto wurde deaktiviert.');
    }

    await auditLog('LOGIN', { userId: user.id, success: true });
    return { success: true, user };
  } catch (err) {
    if (err.message && !err.response) {
      // Re-throw our own business logic errors (LOCKED, DEACTIVATED)
      throw err;
    }
    await auditLog('LOGIN_FAILED', { success: false, note: 'invalid_credentials' });
    // Generic — never reveal whether email exists
    throw new Error('Anmeldung fehlgeschlagen. E-Mail oder Passwort ungültig.');
  }
}

// ─── Logout ───────────────────────────────────────────────────────────────────
export async function logout() {
  const user = getCurrentUser();
  const userId = user?.id || null;
  pb.authStore.clear();
  await auditLog('LOGOUT', { userId, success: true });
}

// ─── Password reset (request) ─────────────────────────────────────────────────
// NOTE: PocketBase email API is disabled in this environment.
// This POC demonstrates the reset flow using a token stored in identity_test_values
// as a stand-in. In production this would be a time-limited email link.
export async function requestPasswordReset(email) {
  if (!email) throw new Error('Bitte E-Mail-Adresse eingeben.');
  // Always respond the same way — never reveal if email exists
  await auditLog('PASSWORD_RESET_REQUESTED', { success: true, note: 'email_not_revealed' });
  return {
    success: true,
    message: 'Falls diese E-Mail-Adresse registriert ist, erhältst du einen Reset-Link.',
  };
}

// ─── Password change (authenticated user) ────────────────────────────────────
export async function changePassword({ currentPassword, newPassword, newPasswordConfirm }) {
  const user = getCurrentUser();
  if (!user) throw new Error('Nicht angemeldet.');
  if (!newPassword || newPassword.length < 8) {
    throw new Error('Das neue Passwort muss mindestens 8 Zeichen lang sein.');
  }
  if (newPassword !== newPasswordConfirm) {
    throw new Error('Die Passwörter stimmen nicht überein.');
  }

  try {
    await pb.collection('users').update(user.id, {
      oldPassword: currentPassword,
      password: newPassword,
      passwordConfirm: newPasswordConfirm,
    });
    await auditLog('PASSWORD_CHANGED', { userId: user.id, success: true });
    return { success: true };
  } catch (_) {
    await auditLog('PASSWORD_CHANGED', { userId: user.id, success: false });
    throw new Error('Passwort konnte nicht geändert werden. Bitte prüfe das aktuelle Passwort.');
  }
}

// ─── Personal test value (isolation proof) ───────────────────────────────────
// All queries automatically scoped to auth.id via collection rules.
// The user_id field is set server-side from the auth context — not from input.

export async function getTestValue() {
  const user = getCurrentUser();
  if (!user) return null;
  try {
    const result = await pb.collection('identity_test_values').getList(1, 1, {
      filter: `user_id = "${user.id}"`,
      sort: '-created',
    });
    return result.items[0] || null;
  } catch (_) {
    return null;
  }
}

export async function saveTestValue(value) {
  const user = getCurrentUser();
  if (!user) throw new Error('Nicht angemeldet.');

  // user_id is set from auth context — never from user input
  const existing = await getTestValue();
  if (existing) {
    return pb.collection('identity_test_values').update(existing.id, {
      test_value: value,
      user_id: user.id,
    });
  } else {
    return pb.collection('identity_test_values').create({
      user_id: user.id,
      test_value: value,
    });
  }
}

// ─── Auth refresh on startup ──────────────────────────────────────────────────
export async function refreshAuthOnStartup() {
  if (!pb.authStore.isValid) return;
  try {
    await pb.collection('users').authRefresh();
  } catch (_) {
    pb.authStore.clear();
  }
}

┌─────────────────────────────────────────────────
│ ./src/lib/pb.js
└─────────────────────────────────────────────────
import PocketBase from 'pocketbase';

export const pb = new PocketBase();

┌─────────────────────────────────────────────────
│ ./src/main.jsx
└─────────────────────────────────────────────────
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

┌─────────────────────────────────────────────────
│ ./src/pages/CheckIn.jsx
└─────────────────────────────────────────────────
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router";
import {
  getActiveMethod,
  getQuestionsForMethod,
  getAllAnswerOptionsForQuestions,
  getResultRules,
  validateMethodReadiness,
  warnIfScaleOutOfSync,
  partitionQuestions,
  resolveResultRule,
  saveCheckin,
} from "../lib/engine.js";
import ChevronLeft from "icon:chevron-left";
import CheckCircle from "icon:check-circle";
import AlertCircle from "icon:alert-circle";
import Home from "icon:home";
import AnswerCard, { ENERGY_ICON_PRESETS } from "../components/AnswerCard.jsx";

export default function CheckIn() {
  const navigate = useNavigate();

  // ─── Loading state ───────────────────────────────────────────────────────
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null); // pre-flight validation failure

  // ─── Method data ─────────────────────────────────────────────────────────
  const [method, setMethod] = useState(null);
  const [questions, setQuestions] = useState([]); // only answerable questions
  const [optionsByQuestion, setOptionsByQuestion] = useState({});
  const [rules, setRules] = useState([]);

  // ─── Check-in progress ───────────────────────────────────────────────────
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]); // [{questionId, answerId, dimensionCode, numericValue}]

  // ─── Runtime question error (options disappeared mid-session) ────────────
  const [runtimeError, setRuntimeError] = useState(null);

  // ─── Saving ──────────────────────────────────────────────────────────────
  const [saving, setSaving] = useState(false);
  const savingRef = useRef(false); // guards against double-fire in StrictMode
  const [saveError, setSaveError] = useState(null); // only shown when the actual write failed

  // ─── Load everything on mount ────────────────────────────────────────────
  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const m = await getActiveMethod(controller.signal);
        const qs = await getQuestionsForMethod(m.id, controller.signal);
        const allOpts = await getAllAnswerOptionsForQuestions(
          qs.map((q) => q.id),
          controller.signal
        );
        const rs = await getResultRules(m.id, controller.signal);

        // Group options by question id
        const grouped = {};
        for (const opt of allOpts) {
          if (!grouped[opt.question_id]) grouped[opt.question_id] = [];
          grouped[opt.question_id].push(opt);
        }

        // Scale-range diagnostic (non-blocking, console only)
        warnIfScaleOutOfSync(qs, allOpts, rs);

        // Pre-flight validation
        const check = await validateMethodReadiness(m, qs, grouped, rs);
        if (!check.valid) {
          setLoadError(check.reason);
          setLoading(false);
          return;
        }

        // Partition: skip optional questions without options, block on required ones
        // (validateMethodReadiness already ensures no required questions are missing options,
        //  but partitionQuestions handles the runtime case gracefully too)
        const { answerable, skipped } = partitionQuestions(qs, grouped);

        if (skipped.length > 0) {
          console.info(
            `[NeuroWays] Optionale Frage(n) ohne Antwortoptionen übersprungen: ${skipped.map((q) => q.code).join(", ")}`
          );
        }

        setMethod(m);
        setQuestions(answerable);
        setOptionsByQuestion(grouped);
        setRules(rs);
        setLoading(false);
      } catch (err) {
        if (!err?.isAbort && err?.name !== "AbortError") {
          setLoadError("Die Fragen konnten nicht geladen werden. Bitte versuche es erneut.");
          setLoading(false);
        }
      }
    }

    load();
    return () => controller.abort();
  }, []);

  // ─── Derived ─────────────────────────────────────────────────────────────
  const question = questions[step];
  const options = question ? (optionsByQuestion[question.id] || []) : [];
  const totalSteps = questions.length;

  // Runtime guard: if current question has no options (data changed after load)
  useEffect(() => {
    if (!loading && !loadError && question && options.length === 0) {
      if (question.is_required) {
        console.warn(
          `[NeuroWays] Laufzeitfehler: Pflichtfrage "${question.code}" hat keine Antwortoptionen.`
        );
        setRuntimeError(
          "Für diese Frage sind derzeit keine Antwortmöglichkeiten verfügbar. Der Check-in kann deshalb nicht abgeschlossen werden."
        );
      } else {
        // Optional — skip silently
        console.info(`[NeuroWays] Optionale Frage "${question.code}" ohne Optionen → übersprungen.`);
        if (step < totalSteps - 1) {
          setStep((s) => s + 1);
        }
      }
    }
  }, [question, options, loading, loadError, step, totalSteps]);

  // ─── Handlers ────────────────────────────────────────────────────────────
  function handleAnswer(opt) {
    const newAnswers = answers.filter((a) => a.questionId !== question.id);
    newAnswers.push({
      questionId: question.id,
      answerId: opt.id,
      dimensionCode: question.dimension_code || question.code,
      numericValue: opt.numeric_value,
    });

    if (step < totalSteps - 1) {
      setAnswers(newAnswers);
      setStep((s) => s + 1);
    } else {
      handleSave(newAnswers);
    }
  }

  function handleBack() {
    if (runtimeError) {
      setRuntimeError(null);
      return;
    }
    if (step > 0) {
      setStep((s) => s - 1);
    } else {
      navigate("/");
    }
  }

  async function handleSave(finalAnswers) {
    // Guard: prevent double-save (StrictMode double-invocation or rapid clicks)
    if (savingRef.current) return;
    savingRef.current = true;
    setSaving(true);
    setSaveError(null);

    let checkinId = null;
    try {
      const totalScore = finalAnswers.reduce((s, a) => s + (a.numericValue || 0), 0);
      const rule = resolveResultRule(rules, totalScore);
      // This is the only step that must succeed — if it throws, nothing was written
      checkinId = await saveCheckin({
        methodId: method.id,
        methodVersion: method.version,
        answers: finalAnswers,
        rule,
      });
    } catch (err) {
      // The write itself failed — show the error, allow retry
      console.error("[NeuroWays] Speichern fehlgeschlagen:", err);
      setSaveError("Das Ergebnis konnte nicht gespeichert werden. Bitte versuche es erneut.");
      setSaving(false);
      savingRef.current = false;
      return;
    }

    // Write succeeded — navigate; any navigation error is separate from the save
    try {
      navigate(`/result/${checkinId}`);
    } catch (err) {
      console.error("[NeuroWays] Navigation fehlgeschlagen:", err);
      // Navigate failed but data is saved — go to history as fallback
      navigate("/history");
    }
  }

  // ─── Render states ────────────────────────────────────────────────────────

  if (loading) {
    return (
      <main className="max-w-xl mx-auto px-5 pt-20 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 rounded-full border-2 border-teal-200 border-t-teal-600 animate-spin mb-4" />
        <p className="text-gray-400 text-sm">Fragen werden geladen …</p>
      </main>
    );
  }

  if (saving) {
    return (
      <main className="max-w-xl mx-auto px-5 pt-20 flex flex-col items-center justify-center min-h-[60vh]">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: "#e8f5f3" }}
        >
          <CheckCircle size={32} color="#2a9d8f" />
        </div>
        <p className="text-gray-600 font-medium">Ergebnis wird berechnet …</p>
      </main>
    );
  }

  // Save-specific error (write failed, user can retry)
  if (saveError) {
    return (
      <main className="max-w-xl mx-auto px-5 pt-20 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <AlertCircle size={28} color="#ef4444" />
        </div>
        <p className="text-gray-700 text-center leading-relaxed mb-2 max-w-sm font-medium">
          {saveError}
        </p>
        <div className="flex flex-col gap-3 mt-6 w-full max-w-xs">
          <button
            onClick={() => {
              setSaveError(null);
              savingRef.current = false;
            }}
            className="flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-white text-sm font-medium"
            style={{ backgroundColor: "#2a9d8f" }}
          >
            Erneut versuchen
          </button>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-2xl px-6 py-3 border-2 border-gray-200 text-gray-600 text-sm font-medium"
          >
            <Home size={16} />
            Zurück zum Start
          </Link>
        </div>
      </main>
    );
  }

  // Pre-flight or config failure
  if (loadError) {
    return (
      <main className="max-w-xl mx-auto px-5 pt-20 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-4">
          <AlertCircle size={28} color="#f59e0b" />
        </div>
        <p className="text-gray-700 text-center leading-relaxed mb-2 max-w-sm font-medium">
          {loadError}
        </p>
        <p className="text-gray-400 text-sm text-center mb-6 max-w-sm">
          Der Check-in kann derzeit nicht gestartet werden.
        </p>
        <Link
          to="/"
          className="flex items-center gap-2 rounded-2xl px-6 py-3 text-white text-sm font-medium"
          style={{ backgroundColor: "#2a9d8f" }}
        >
          <Home size={16} />
          Zurück zum Start
        </Link>
      </main>
    );
  }

  // Runtime error mid-session (required question lost its options)
  if (runtimeError) {
    return (
      <main className="max-w-xl mx-auto px-5 pt-20 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <AlertCircle size={28} color="#ef4444" />
        </div>
        <p className="text-gray-700 text-center leading-relaxed mb-2 max-w-sm font-medium">
          {runtimeError}
        </p>
        <p className="text-gray-400 text-sm text-center mb-6 max-w-sm">
          Dieser Check-in wird nicht gespeichert.
        </p>
        <Link
          to="/"
          className="flex items-center gap-2 rounded-2xl px-6 py-3 text-white text-sm font-medium"
          style={{ backgroundColor: "#2a9d8f" }}
        >
          <Home size={16} />
          Zurück zum Start
        </Link>
      </main>
    );
  }

  if (totalSteps === 0) {
    return (
      <main className="max-w-xl mx-auto px-5 pt-20 text-center">
        <p className="text-gray-500">Keine Fragen vorhanden.</p>
        <Link to="/" className="mt-4 inline-block text-teal-600 underline text-sm">
          Zurück zum Start
        </Link>
      </main>
    );
  }

  // Get previously selected answer for current question (for back-navigation highlight)
  const currentAnswer = answers.find((a) => a.questionId === question.id);

  return (
    <main className="max-w-xl mx-auto px-5 pt-6 pb-28 md:pb-10">
      {/* Header with progress */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={handleBack}
          className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
          aria-label="Zurück"
        >
          <ChevronLeft size={20} color="#374151" />
        </button>
        <div className="flex-1">
          <p className="text-xs text-gray-400 font-medium mb-1">
            Frage {step + 1} von {totalSteps}
          </p>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${((step + 1) / totalSteps) * 100}%`,
                backgroundColor: "#2a9d8f",
              }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 leading-snug mb-2">
          {question.question_text}
        </h2>
        {question.help_text ? (
          <p className="text-sm text-gray-400">{question.help_text}</p>
        ) : (
          <p className="text-sm text-gray-400">Wähle die Antwort, die am besten passt.</p>
        )}
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {options.map((opt) => {
          const selected = currentAnswer?.answerId === opt.id;
          // Map numeric_value (1–5) to icon preset; fall back to a neutral style
          const preset = ENERGY_ICON_PRESETS[opt.numeric_value] || {
            icon: "waves",
            accentColor: "#2a9d8f",
            backgroundColor: "#e8f5f3",
          };
          return (
            <AnswerCard
              key={opt.id}
              icon={preset.icon}
              accentColor={preset.accentColor}
              backgroundColor={preset.backgroundColor}
              label={opt.label}
              selected={selected}
              onClick={() => handleAnswer(opt)}
            />
          );
        })}
      </div>
    </main>
  );
}

┌─────────────────────────────────────────────────
│ ./src/pages/DashboardPage.jsx
└─────────────────────────────────────────────────
/**
 * NW-IDENTITY-002 — Protected Dashboard / Start Page
 * First protected landing after login.
 */
import { Link, useNavigate } from "react-router";
import { useAuth } from "../lib/authContext.jsx";
import ArrowRight from "icon:arrow-right";
import Package from "icon:package";
import Hammer from "icon:hammer";
import ClipboardList from "icon:clipboard-list";
import BarChart2 from "icon:bar-chart-2";
import LogOut from "icon:log-out";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  const displayName = user?.display_name || user?.email?.split("@")[0] || "Benutzer";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Guten Morgen" : hour < 17 ? "Hallo" : "Guten Abend";

  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "36px 20px 120px", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Greeting */}
      <div style={{ marginBottom: 36 }}>
        <p style={{ fontSize: 13, color: "#008CA8", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
          {greeting},
        </p>
        <h1 style={{ fontSize: 30, fontWeight: 800, color: "#0A1F44", marginBottom: 10, lineHeight: 1.2 }}>
          {displayName}
        </h1>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7 }}>
          Schön, dass du da bist. Beobachte deinen Energiezustand oder verwalte deine Bereiche.
        </p>
      </div>

      {/* Brand wave */}
      <div style={{ marginBottom: 36 }}>
        <svg viewBox="0 0 400 28" fill="none" style={{ width: "100%", maxWidth: 320 }}>
          <defs>
            <linearGradient id="dg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0A1F44"/>
              <stop offset="30%" stopColor="#008CA8"/>
              <stop offset="60%" stopColor="#7B4BA2"/>
              <stop offset="85%" stopColor="#E2A83B"/>
            </linearGradient>
          </defs>
          <path d="M4 18 Q40 5 76 18 Q112 31 148 18 Q184 5 220 18 Q256 31 292 16" stroke="url(#dg)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          <circle cx="308" cy="15" r="4.5" fill="#E2A83B"/>
          <line x1="320" y1="15" x2="345" y2="15" stroke="#E2A83B" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Primary CTA */}
      <Link to="/checkin" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "24px 24px", borderRadius: 20, background: "#0A1F44",
        textDecoration: "none", marginBottom: 14,
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <ClipboardList size={16} color="rgba(255,255,255,0.6)" />
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Energy Navigator</span>
          </div>
          <p style={{ color: "#fff", fontWeight: 700, fontSize: 19, marginBottom: 2 }}>Check-in starten</p>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>6 Fragen · ca. 2 Minuten</p>
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <ArrowRight size={20} color="#fff" />
        </div>
      </Link>

      {/* Verlauf quick link */}
      <Link to="/history" style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "16px 20px", borderRadius: 16, background: "#f6f4f1",
        textDecoration: "none", marginBottom: 24, border: "1px solid #eae8e5",
      }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "#e8f5f3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <BarChart2 size={18} color="#2a9d8f" />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 600, fontSize: 15, color: "#0A1F44", marginBottom: 1 }}>Mein Verlauf</p>
          <p style={{ fontSize: 13, color: "#9ca3af" }}>Bisherige Check-ins ansehen</p>
        </div>
        <ArrowRight size={16} color="#b0b8c4" />
      </Link>

      {/* Coming-soon tiles */}
      <p style={{ fontSize: 12, fontWeight: 700, color: "#b0b8c4", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
        Demnächst verfügbar
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 36 }}>
        {[
          { Icon: Package, label: "Meine Pakete",  sub: "Zusammenstellen",      color: "#008CA8", bg: "#f0fafd" },
          { Icon: Hammer,  label: "Meine Builds",  sub: "Installationspakete",  color: "#7B4BA2", bg: "#f8f0fd" },
        ].map(({ Icon, label, sub, color, bg }) => (
          <div key={label} style={{ padding: "16px 16px", borderRadius: 16, background: "#fafafa", border: "1px solid #e5e5e5", opacity: 0.6 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
              <Icon size={18} color={color} />
            </div>
            <p style={{ fontWeight: 600, fontSize: 14, color: "#0A1F44", marginBottom: 2 }}>{label}</p>
            <p style={{ fontSize: 12, color: "#9ca3af" }}>{sub}</p>
            <span style={{ display: "inline-block", marginTop: 8, fontSize: 10, fontWeight: 700, color: "#b0b8c4", background: "#f0f0f0", padding: "2px 7px", borderRadius: 5, letterSpacing: "0.04em" }}>BALD</span>
          </div>
        ))}
      </div>

      {/* Account info + logout */}
      <div style={{ padding: "16px 20px", borderRadius: 16, background: "#f6f4f1", border: "1px solid #eae8e5", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 2 }}>Angemeldet als</p>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#0A1F44", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.email}</p>
        </div>
        <button onClick={handleLogout} style={{
          display: "flex", alignItems: "center", gap: 6, padding: "8px 14px",
          background: "#fff", border: "1px solid #e5e5e5", borderRadius: 10,
          cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#6b7280",
          fontFamily: "'DM Sans', sans-serif", flexShrink: 0,
        }}>
          <LogOut size={14} />
          Abmelden
        </button>
      </div>
    </main>
  );
}

┌─────────────────────────────────────────────────
│ ./src/pages/ForgotPasswordPage.jsx
└─────────────────────────────────────────────────
/**
 * NW-IDENTITY-002 — Forgot Password Page
 * UI fully implemented. Email reset flow prepared.
 * OPEN POINT: SMTP not available in this environment.
 * Uses identity.js requestPasswordReset() which returns a generic message
 * without revealing whether the email is registered (security: no enumeration).
 */
import { useState } from "react";
import { Link } from "react-router";
import { requestPasswordReset } from "../lib/identity.js";

const inputStyle = {
  width: "100%", padding: "12px 14px",
  border: "1.5px solid #e5e5e5", borderRadius: 10,
  fontSize: 15, color: "#0A1F44", background: "#fafafa",
  outline: "none", boxSizing: "border-box", fontFamily: "'DM Sans', sans-serif",
};

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await requestPasswordReset(email);
    } catch (_) {
      // Always show success — never reveal email existence
    } finally {
      setSent(true);
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh", background: "#fff", display: "flex",
      alignItems: "center", justifyContent: "center", padding: "32px 24px",
    }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{ fontWeight: 800, fontSize: 22, color: "#0A1F44", letterSpacing: "0.12em", fontFamily: "'DM Sans', sans-serif" }}>NEUROWAYS</span>
        </div>

        {sent ? (
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%", background: "#f0f9ff",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <span style={{ fontSize: 28 }}>✉️</span>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0A1F44", marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>
              Prüfe dein Postfach
            </h2>
            <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.7, marginBottom: 8 }}>
              Falls diese E-Mail-Adresse bei uns registriert ist, hast du in Kürze eine Nachricht mit einem Reset-Link erhalten.
            </p>
            <p style={{ color: "#9ca3af", fontSize: 13, marginBottom: 32 }}>
              Hinweis: Der E-Mail-Versand ist in dieser Umgebung noch nicht produktiv aktiviert.
            </p>
            <Link to="/login" style={{
              display: "inline-block", padding: "12px 28px", background: "#0A1F44",
              color: "#fff", borderRadius: 12, textDecoration: "none", fontSize: 15, fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              Zurück zur Anmeldung
            </Link>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#0A1F44", marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>
              Passwort zurücksetzen
            </h2>
            <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
              Gib deine E-Mail-Adresse ein. Wenn ein Konto vorhanden ist, erhältst du einen Reset-Link.
            </p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <label>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>E-Mail</span>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="du@beispiel.de" style={inputStyle} autoComplete="email" />
              </label>
              <button type="submit" disabled={loading} style={{
                padding: "14px 24px", background: "#0A1F44", color: "#fff",
                border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {loading ? "Wird gesendet …" : "Reset-Link anfordern"}
              </button>
            </form>
            <p style={{ marginTop: 24, textAlign: "center", fontSize: 14, color: "#6b7280" }}>
              <Link to="/login" style={{ color: "#0A1F44", fontWeight: 500, textDecoration: "none" }}>← Zurück zur Anmeldung</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

┌─────────────────────────────────────────────────
│ ./src/pages/History.jsx
└─────────────────────────────────────────────────
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router";
import {
  getCheckinHistory,
  getResultRules,
  getActiveMethod,
  resolveResultRule,
  deleteCheckin,
} from "../lib/engine.js";
import ZoneIcon from "../components/ZoneIcon.jsx";
import Trash2 from "icon:trash-2";
import ChevronRight from "icon:chevron-right";
import BarChart2 from "icon:bar-chart-2";

export default function History() {
  const [entries, setEntries] = useState([]);
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(() => {
    const controller = new AbortController();

    async function fetch() {
      try {
        const method = await getActiveMethod(controller.signal);
        const [historyRes, rs] = await Promise.all([
          getCheckinHistory(1, 100, controller.signal),
          getResultRules(method.id, controller.signal),
        ]);
        setRules(rs);
        setEntries(
          historyRes.items.map((item) => ({
            ...item,
            rule: resolveResultRule(rs, item.total_score),
          }))
        );
        setLoading(false);
      } catch (err) {
        if (!err?.isAbort && err?.name !== "AbortError") setLoading(false);
      }
    }

    fetch();
    return controller;
  }, []);

  useEffect(() => {
    const ctrl = load();
    return () => ctrl.abort();
  }, [load]);

  async function handleDelete(id) {
    if (!confirm("Diesen Eintrag löschen?")) return;
    setDeletingId(id);
    try {
      await deleteCheckin(id);
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setDeletingId(null);
    }
  }

  // Mini chart — last 10 scores
  const chartEntries = [...entries].reverse().slice(-10);
  const maxScore = Math.max(...(chartEntries.map((e) => e.total_score || 1)), 1);

  return (
    <main className="max-w-xl mx-auto px-5 pt-6 pb-28 md:pb-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <BarChart2 size={20} color="#2a9d8f" />
          <h1 className="text-xl font-bold text-gray-800">Verlauf</h1>
        </div>
        <p className="text-sm text-gray-400">
          {entries.length === 0
            ? "Noch keine Einträge."
            : `${entries.length} Check-in${entries.length !== 1 ? "s" : ""} gespeichert`}
        </p>
      </div>

      {/* Mini chart */}
      {chartEntries.length > 1 && (
        <div className="mb-8 bg-gray-50 rounded-3xl p-5 border border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Verlauf (letzte {chartEntries.length} Einträge)
          </p>
          <div className="flex items-end gap-2 h-20">
            {chartEntries.map((e) => {
              const heightPct = (e.total_score / maxScore) * 100;
              return (
                <div key={e.id} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-lg relative" style={{ height: "64px" }}>
                    <div
                      className="absolute bottom-0 w-full rounded-lg"
                      style={{
                        height: `${heightPct}%`,
                        backgroundColor: e.rule?.color || "#2a9d8f",
                        opacity: 0.7,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          {/* Zone legend */}
          {rules.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {rules.map((r) => (
                <div key={r.id} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: r.color }} />
                  <span className="text-xs text-gray-400">{r.result_label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Entries list */}
      {loading ? (
        <p className="text-gray-400 text-sm text-center py-10">Wird geladen …</p>
      ) : entries.length === 0 ? (
        <div className="rounded-3xl bg-gray-50 border border-gray-100 p-8 text-center">
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Noch keine Einträge vorhanden. Starte deinen ersten Check-in.
          </p>
          <Link
            to="/checkin"
            className="inline-block rounded-2xl px-5 py-3 text-white text-sm font-medium"
            style={{ backgroundColor: "#2a9d8f" }}
          >
            Check-in starten
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {entries.map((entry) => {
            const rule = entry.rule;
            return (
              <div
                key={entry.id}
                className="rounded-2xl bg-white border border-gray-100 px-5 py-4 flex items-center gap-4"
                style={{ borderLeft: `4px solid ${rule?.color || "#2a9d8f"}` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: rule?.bg_color || "#e8f5f3" }}
                >
                  <ZoneIcon icon={rule?.icon} color={rule?.color || "#2a9d8f"} size={20} />
                </div>
                <Link to={`/result/${entry.id}`} className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {rule?.result_label || entry.result_label || "–"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(entry.created).toLocaleDateString("de-DE", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                    {" · "}
                    {new Date(entry.created).toLocaleTimeString("de-DE", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })} Uhr
                  </p>
                </Link>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to={`/result/${entry.id}`}
                    className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <ChevronRight size={16} color="#6b7280" />
                  </Link>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    disabled={deletingId === entry.id}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors disabled:opacity-40"
                    aria-label="Eintrag löschen"
                  >
                    <Trash2 size={15} color="#ef4444" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

┌─────────────────────────────────────────────────
│ ./src/pages/Home.jsx
└─────────────────────────────────────────────────
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getCheckinHistory, getResultRules, getActiveMethod, resolveResultRule } from "../lib/engine.js";
import ZoneCard from "../components/ZoneCard.jsx";
import ArrowRight from "icon:arrow-right";
import History from "icon:history";

export default function Home() {
  const [lastEntry, setLastEntry] = useState(null);
  const [lastRule, setLastRule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const [method, historyRes] = await Promise.all([
          getActiveMethod(controller.signal),
          getCheckinHistory(1, 1, controller.signal),
        ]);

        if (historyRes.items.length > 0) {
          const entry = historyRes.items[0];
          const rules = await getResultRules(method.id, controller.signal);
          const rule = resolveResultRule(rules, entry.total_score);
          setLastEntry(entry);
          setLastRule(rule);
        }
      } catch (err) {
        if (!err?.isAbort && err?.name !== "AbortError") console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  return (
    <main className="max-w-xl mx-auto px-5 pt-8 pb-28 md:pb-10">
      {/* Hero */}
      <div className="mb-10">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
          style={{ backgroundColor: "#e8f5f3" }}
        >
          <span className="text-2xl">🧭</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 leading-tight mb-3">
          NeuroWays<br />
          <span style={{ color: "#2a9d8f" }}>Energy Navigator</span>
        </h1>
        <p className="text-gray-500 leading-relaxed text-base">
          Beobachte deinen aktuellen Energie- und Belastungszustand — klar, ruhig und ohne Bewertung.
        </p>
      </div>

      {/* CTA */}
      <Link
        to="/checkin"
        className="flex items-center justify-between w-full rounded-2xl px-6 py-5 mb-8 group transition-all"
        style={{ backgroundColor: "#2a9d8f" }}
      >
        <div>
          <p className="text-white font-semibold text-lg leading-tight">Check-in starten</p>
          <p className="text-teal-100 text-sm mt-0.5">Kurze Fragen · ca. 2 Minuten</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
          <ArrowRight size={20} color="white" />
        </div>
      </Link>

      {/* Last result */}
      {!loading && lastEntry && lastRule && (
        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Letztes Ergebnis
          </p>
          <Link to={`/result/${lastEntry.id}`} className="block rounded-3xl bg-gray-50 border border-gray-100 p-5 hover:border-gray-200 transition-colors">
            <p className="text-xs text-gray-400 mb-3">
              {new Date(lastEntry.created).toLocaleDateString("de-DE", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
            <ZoneCard rule={lastRule} compact />
          </Link>
        </div>
      )}

      {!loading && !lastEntry && (
        <div className="rounded-3xl bg-gray-50 border border-gray-100 p-6 mb-8 text-center">
          <p className="text-gray-400 text-sm leading-relaxed">
            Noch kein Eintrag vorhanden. Starte deinen ersten Check-in, um deinen aktuellen Bereich zu sehen.
          </p>
        </div>
      )}

      {/* History link */}
      <Link
        to="/history"
        className="flex items-center gap-3 w-full rounded-2xl px-5 py-4 bg-white border border-gray-200 hover:border-gray-300 transition-colors group"
      >
        <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
          <History size={18} color="#6b7280" />
        </div>
        <div className="flex-1">
          <p className="text-gray-700 font-medium text-sm">Bisherigen Verlauf ansehen</p>
        </div>
        <ArrowRight size={16} color="#9ca3af" />
      </Link>

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 text-center leading-relaxed mt-10 px-4">
        Diese App stellt keine medizinische Diagnose und gibt keine therapeutischen Empfehlungen.
        Sie dient ausschließlich der persönlichen Selbstbeobachtung.
      </p>
    </main>
  );
}

┌─────────────────────────────────────────────────
│ ./src/pages/IdentityPoc.jsx
└─────────────────────────────────────────────────
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import {
  register,
  login,
  logout,
  changePassword,
  getTestValue,
  saveTestValue,
  getCurrentUser,
  isAuthenticated,
} from "../lib/identity.js";
import { pb } from "../lib/pb.js";

// ─── Minimal design tokens matching NeuroWays World ──────────────────────────
const teal = "#2a9d8f";
const bg = "#f9fafb";
const textDark = "#2d3748";
const textMuted = "#6b7280";
const borderColor = "#e2e8f0";

// ─── Reusable primitives ──────────────────────────────────────────────────────
function Card({ children, style }) {
  return (
    <div style={{
      background: "#fff",
      border: `1px solid ${borderColor}`,
      borderRadius: 16,
      padding: "2rem",
      marginBottom: "1.5rem",
      ...style,
    }}>
      {children}
    </div>
  );
}

function Input({ label, type = "text", value, onChange, placeholder }) {
  return (
    <label style={{ display: "block", marginBottom: "1rem" }}>
      <span style={{ display: "block", fontSize: 13, fontWeight: 600, color: textMuted, marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "0.75rem 1rem",
          border: `1.5px solid ${borderColor}`,
          borderRadius: 10,
          fontSize: 15,
          color: textDark,
          background: bg,
          outline: "none",
          boxSizing: "border-box",
          fontFamily: "inherit",
        }}
      />
    </label>
  );
}

function Btn({ children, onClick, variant = "primary", disabled, small }) {
  const isPrimary = variant === "primary";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: small ? "0.5rem 1.2rem" : "0.85rem 2rem",
        background: isPrimary ? teal : "transparent",
        color: isPrimary ? "#fff" : teal,
        border: `1.5px solid ${isPrimary ? teal : teal}`,
        borderRadius: 10,
        fontSize: small ? 13 : 15,
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        fontFamily: "inherit",
        marginRight: 8,
        marginTop: 4,
        transition: "opacity 0.15s",
      }}
    >
      {children}
    </button>
  );
}

function Alert({ type, message }) {
  const colors = {
    error: { bg: "#fef2f2", border: "#fca5a5", text: "#b91c1c" },
    success: { bg: "#f0fdf4", border: "#86efac", text: "#166534" },
    info: { bg: "#eff6ff", border: "#93c5fd", text: "#1e40af" },
  };
  const c = colors[type] || colors.info;
  return (
    <div style={{
      background: c.bg,
      border: `1px solid ${c.border}`,
      color: c.text,
      borderRadius: 10,
      padding: "0.75rem 1rem",
      fontSize: 14,
      marginBottom: "1rem",
      lineHeight: 1.5,
    }}>
      {message}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={{ fontSize: 17, fontWeight: 700, color: textDark, marginBottom: "1.25rem", marginTop: 0 }}>
      {children}
    </h2>
  );
}

function EventBadge({ type, success }) {
  const colors = {
    REGISTRATION: "#2a9d8f",
    LOGIN: "#2a9d8f",
    LOGIN_FAILED: "#dc2626",
    LOGIN_BLOCKED: "#d97706",
    LOGOUT: "#6b7280",
    PASSWORD_RESET_REQUESTED: "#6366f1",
    PASSWORD_CHANGED: "#2a9d8f",
  };
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: 6,
      fontSize: 11,
      fontWeight: 700,
      background: (colors[type] || "#6b7280") + "22",
      color: colors[type] || "#6b7280",
      letterSpacing: "0.03em",
    }}>
      {success === false ? "✗" : "✓"} {type}
    </span>
  );
}

// ─── Panel: Register ──────────────────────────────────────────────────────────
function RegisterPanel({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setErr(null);
    setLoading(true);
    try {
      await register({ email, password, passwordConfirm: confirm, displayName });
      onSuccess();
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <SectionTitle>Registrieren</SectionTitle>
      {err && <Alert type="error" message={err} />}
      <Input label="E-Mail" type="email" value={email} onChange={setEmail} placeholder="du@beispiel.de" />
      <Input label="Anzeigename" value={displayName} onChange={setDisplayName} placeholder="Dein Name" />
      <Input label="Passwort" type="password" value={password} onChange={setPassword} placeholder="Mindestens 8 Zeichen" />
      <Input label="Passwort bestätigen" type="password" value={confirm} onChange={setConfirm} placeholder="Wiederholen" />
      <Btn onClick={handleSubmit} disabled={loading}>{loading ? "Wird registriert …" : "Konto erstellen"}</Btn>
    </Card>
  );
}

// ─── Panel: Login ─────────────────────────────────────────────────────────────
function LoginPanel({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setErr(null);
    setLoading(true);
    try {
      await login({ email, password });
      onSuccess();
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <SectionTitle>Anmelden</SectionTitle>
      {err && <Alert type="error" message={err} />}
      <Input label="E-Mail" type="email" value={email} onChange={setEmail} />
      <Input label="Passwort" type="password" value={password} onChange={setPassword} />
      <Btn onClick={handleSubmit} disabled={loading}>{loading ? "Wird angemeldet …" : "Anmelden"}</Btn>
    </Card>
  );
}

// ─── Panel: Logged-in dashboard ───────────────────────────────────────────────
function DashboardPanel({ user, onLogout, auditEntries }) {
  const [testValue, setTestValue] = useState("");
  const [savedValue, setSavedValue] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState(null);

  // Password change
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPwConfirm, setNewPwConfirm] = useState("");
  const [pwErr, setPwErr] = useState(null);
  const [pwMsg, setPwMsg] = useState(null);

  const loadValue = useCallback(async () => {
    const v = await getTestValue();
    setSavedValue(v);
    if (v) setTestValue(v.test_value || "");
  }, []);

  useEffect(() => { loadValue(); }, [loadValue]);

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg(null);
    try {
      await saveTestValue(testValue);
      setSaveMsg({ type: "success", text: "Wert gespeichert." });
      await loadValue();
    } catch (e) {
      setSaveMsg({ type: "error", text: e.message });
    } finally {
      setSaving(false);
    }
  };

  const handlePwChange = async () => {
    setPwErr(null);
    setPwMsg(null);
    try {
      await changePassword({ currentPassword: oldPw, newPassword: newPw, newPasswordConfirm: newPwConfirm });
      setPwMsg("Passwort erfolgreich geändert. Bitte melde dich erneut an.");
      setOldPw(""); setNewPw(""); setNewPwConfirm("");
    } catch (e) {
      setPwErr(e.message);
    }
  };

  return (
    <div>
      {/* Identity context */}
      <Card style={{ borderLeft: `4px solid ${teal}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ margin: 0, fontSize: 13, color: textMuted, textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>Angemeldet als</p>
            <p style={{ margin: "4px 0 0", fontSize: 20, fontWeight: 700, color: textDark }}>{user.display_name || user.email}</p>
            <p style={{ margin: "2px 0 0", fontSize: 13, color: textMuted }}>{user.email}</p>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: textMuted, fontFamily: "monospace" }}>ID: {user.id}</p>
            <span style={{
              display: "inline-block", marginTop: 8,
              padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700,
              background: "#f0fdf4", color: "#166534", border: "1px solid #86efac",
            }}>
              {user.account_status || "ACTIVE"}
            </span>
          </div>
          <Btn variant="secondary" onClick={onLogout} small>Abmelden</Btn>
        </div>
      </Card>

      {/* Personal test value — isolation proof */}
      <Card>
        <SectionTitle>Persönlicher Testwert</SectionTitle>
        <p style={{ fontSize: 14, color: textMuted, marginTop: 0, marginBottom: "1rem" }}>
          Dieser Wert ist ausschließlich mit deiner internen Benutzer-ID ({user.id.slice(0, 8)}…) verknüpft.
          Andere Benutzer können ihn weder lesen noch verändern.
        </p>
        {savedValue && (
          <Alert type="info" message={`Gespeicherter Wert: „${savedValue.test_value}"`} />
        )}
        {saveMsg && <Alert type={saveMsg.type} message={saveMsg.text} />}
        <Input label="Mein NeuroWays-Testwert" value={testValue} onChange={setTestValue} placeholder="z. B. Mein aktueller Testfortschritt" />
        <Btn onClick={handleSave} disabled={saving}>{saving ? "Wird gespeichert …" : "Wert speichern"}</Btn>
      </Card>

      {/* Password change */}
      <Card>
        <SectionTitle>Passwort ändern</SectionTitle>
        {pwErr && <Alert type="error" message={pwErr} />}
        {pwMsg && <Alert type="success" message={pwMsg} />}
        <Input label="Aktuelles Passwort" type="password" value={oldPw} onChange={setOldPw} />
        <Input label="Neues Passwort" type="password" value={newPw} onChange={setNewPw} />
        <Input label="Neues Passwort bestätigen" type="password" value={newPwConfirm} onChange={setNewPwConfirm} />
        <Btn onClick={handlePwChange} variant="secondary">Passwort ändern</Btn>
      </Card>

      {/* Security event log */}
      <Card>
        <SectionTitle>Sicherheitsereignisse</SectionTitle>
        {auditEntries.length === 0 ? (
          <p style={{ color: textMuted, fontSize: 14 }}>Noch keine Ereignisse aufgezeichnet.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {auditEntries.map(e => (
              <div key={e.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "0.5rem 0", borderBottom: `1px solid ${borderColor}` }}>
                <EventBadge type={e.event_type} success={e.success} />
                <span style={{ fontSize: 12, color: textMuted, fontFamily: "monospace" }}>
                  {new Date(e.created).toLocaleString("de-DE")}
                </span>
                {e.note && <span style={{ fontSize: 12, color: textMuted }}>— {e.note}</span>}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function IdentityPoc() {
  const [view, setView] = useState("login"); // login | register | dashboard
  const [user, setUser] = useState(null);
  const [auditEntries, setAuditEntries] = useState([]);
  const TOKEN = node => node; // unused — SDK manages token

  const syncUser = useCallback(() => {
    const u = getCurrentUser();
    setUser(u);
    if (u) setView("dashboard");
    else setView("login");
  }, []);

  const loadAuditLog = useCallback(async () => {
    try {
      const TOKEN_ADMIN = null; // audit log is admin-only; we load it via admin token in shell
      // The audit log is write-open (createRule: ""), but listRule: null = admin only.
      // In the POC UI we show entries from pb with admin context isn't available from browser.
      // Instead we display a placeholder — the real audit verification is done in the test report.
      setAuditEntries([]);
    } catch (_) {
      setAuditEntries([]);
    }
  }, []);

  // Listen to auth changes
  useEffect(() => {
    const unsub = pb.authStore.onChange(() => syncUser());
    syncUser();
    return unsub;
  }, [syncUser]);

  useEffect(() => {
    if (user) loadAuditLog();
  }, [user, loadAuditLog]);

  const handleLogout = async () => {
    await logout();
    syncUser();
  };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'DM Sans', sans-serif", color: textDark }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ background: teal, color: "#fff", borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em" }}>
            POC
          </span>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: textDark }}>
            NW-IDENTITY-POC-001
          </h1>
        </div>
        <p style={{ margin: 0, fontSize: 14, color: textMuted, lineHeight: 1.6 }}>
          Proof of Identity — Identitätsschicht v0.1.0 · Grundlage: NW-IDENTITY-001
        </p>
      </div>

      {/* Tab switcher (only when logged out) */}
      {!user && (
        <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem" }}>
          {["login", "register"].map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: "0.5rem 1.5rem",
                borderRadius: 10,
                border: `1.5px solid ${view === v ? teal : borderColor}`,
                background: view === v ? teal + "11" : "#fff",
                color: view === v ? teal : textMuted,
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {v === "login" ? "Anmelden" : "Registrieren"}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      {!user && view === "login" && (
        <LoginPanel onSuccess={syncUser} />
      )}
      {!user && view === "register" && (
        <RegisterPanel onSuccess={syncUser} />
      )}
      {user && (
        <DashboardPanel user={user} onLogout={handleLogout} auditEntries={auditEntries} />
      )}

      {/* Status bar */}
      <div style={{
        marginTop: "2rem", padding: "0.75rem 1rem",
        background: "#fff", border: `1px solid ${borderColor}`,
        borderRadius: 10, fontSize: 12, color: textMuted,
        display: "flex", gap: 16, flexWrap: "wrap",
      }}>
        <span>Status: <strong style={{ color: user ? "#166534" : "#6b7280" }}>{user ? "Angemeldet" : "Nicht angemeldet"}</strong></span>
        <span>Sitzung: <strong>{isAuthenticated() ? "aktiv" : "keine"}</strong></span>
        {user && <span>UserID: <code style={{ fontFamily: "monospace", fontSize: 11 }}>{user.id}</code></span>}
      </div>
    </div>
  );
}

┌─────────────────────────────────────────────────
│ ./src/pages/LoginPage.jsx
└─────────────────────────────────────────────────
/**
 * NW-IDENTITY-002 — Productive Login Page
 * Uses identity.js login() exclusively — no new auth logic.
 */
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { login } from "../lib/identity.js";
import { useAuth } from "../lib/authContext.jsx";

const inputStyle = {
  width: "100%", padding: "13px 14px", border: "1.5px solid #e5e5e5", borderRadius: 10,
  fontSize: 15, color: "#0A1F44", background: "#fafafa", outline: "none",
  boxSizing: "border-box", fontFamily: "'DM Sans', sans-serif",
};
const labelStyle = {
  fontSize: 12, fontWeight: 700, color: "#6b7280", letterSpacing: "0.07em",
  textTransform: "uppercase", display: "block", marginBottom: 6,
};

function BrandPanel() {
  return (
    <div style={{
      background: "#0A1F44", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: "56px 48px",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: -100, right: -100, width: 360, height: 360, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.07)" }} />
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 280, height: 280, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)" }} />
      <div style={{ position: "relative", textAlign: "center", maxWidth: 340 }}>
        <h1 style={{ fontSize: 38, fontWeight: 900, color: "#fff", letterSpacing: "0.16em", marginBottom: 28, fontFamily: "'DM Sans', sans-serif" }}>
          NEUROWAYS
        </h1>
        <svg viewBox="0 0 320 32" fill="none" style={{ width: "100%", maxWidth: 320, display: "block", margin: "0 auto" }}>
          <defs>
            <linearGradient id="wg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.9"/>
              <stop offset="30%" stopColor="#008CA8"/>
              <stop offset="60%" stopColor="#7B4BA2"/>
              <stop offset="85%" stopColor="#E2A83B"/>
            </linearGradient>
          </defs>
          <path d="M4 20 Q36 6 68 20 Q100 34 132 20 Q164 6 196 20 Q228 34 260 18" stroke="url(#wg)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          <circle cx="274" cy="17" r="5" fill="#E2A83B"/>
          <line x1="285" y1="17" x2="310" y2="17" stroke="#E2A83B" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        <p style={{ marginTop: 36, fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
          Beobachte deinen Energiezustand —<br/>klar, ruhig und ohne Bewertung.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const statusError = location.state?.error;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user]);

  useEffect(() => {
    if (statusError === "locked")      setErr("Dieses Konto ist gesperrt. Bitte wende dich an den Support.");
    if (statusError === "deactivated") setErr("Dieses Konto ist nicht mehr aktiv.");
  }, [statusError]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (ex) {
      setErr(ex.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#fff" }}>
      {/* Brand panel — desktop only */}
      <div className="hidden md:flex" style={{ width: "44%", flexDirection: "column" }}>
        <BrandPanel />
      </div>

      {/* Form panel */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ width: "100%", maxWidth: 400 }}>

          {/* Mobile brand mark */}
          <div className="md:hidden" style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ fontWeight: 900, fontSize: 22, color: "#0A1F44", letterSpacing: "0.14em", fontFamily: "'DM Sans', sans-serif" }}>NEUROWAYS</span>
            <svg viewBox="0 0 280 28" fill="none" style={{ width: "100%", maxWidth: 220, display: "block", margin: "12px auto 0" }}>
              <defs><linearGradient id="wgm" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#0A1F44"/><stop offset="30%" stopColor="#008CA8"/><stop offset="60%" stopColor="#7B4BA2"/><stop offset="85%" stopColor="#E2A83B"/></linearGradient></defs>
              <path d="M4 18 Q34 5 64 18 Q94 31 124 18 Q154 5 184 18 Q214 31 240 16" stroke="url(#wgm)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <circle cx="253" cy="15" r="4" fill="#E2A83B"/>
              <line x1="262" y1="15" x2="278" y2="15" stroke="#E2A83B" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>

          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0A1F44", marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>
            Willkommen zurück
          </h2>
          <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 32 }}>Melde dich an, um fortzufahren.</p>

          {err && (
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "12px 16px", marginBottom: 22, fontSize: 14, color: "#b91c1c", lineHeight: 1.5 }}>
              {err}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <label>
              <span style={labelStyle}>E-Mail</span>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="du@beispiel.de" style={inputStyle} autoComplete="email" />
            </label>
            <label>
              <span style={labelStyle}>Passwort</span>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Dein Passwort" style={inputStyle} autoComplete="current-password" />
            </label>
            <div style={{ textAlign: "right", marginTop: -8 }}>
              <Link to="/forgot-password" style={{ fontSize: 13, color: "#008CA8", textDecoration: "none", fontWeight: 600 }}>
                Passwort vergessen?
              </Link>
            </div>
            <button type="submit" disabled={loading} style={{
              padding: "14px 24px", background: "#0A1F44", color: "#fff",
              border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
              fontFamily: "'DM Sans', sans-serif", marginTop: 4,
            }}>
              {loading ? "Wird angemeldet …" : "Anmelden"}
            </button>
          </form>

          <p style={{ marginTop: 30, textAlign: "center", fontSize: 14, color: "#6b7280" }}>
            Noch kein Konto?{" "}
            <Link to="/register" style={{ color: "#0A1F44", fontWeight: 700, textDecoration: "none" }}>Jetzt registrieren</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

┌─────────────────────────────────────────────────
│ ./src/pages/Privacy.jsx
└─────────────────────────────────────────────────
import { useState } from "react";
import { exportAllData, deleteAllCheckins } from "../lib/engine.js";
import Shield from "icon:shield";
import Download from "icon:download";
import Trash2 from "icon:trash-2";
import CheckCircle from "icon:check-circle";

export default function Privacy() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleExport() {
    setLoading(true);
    setStatus(null);
    try {
      const data = await exportAllData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `neuroways-verlauf-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setStatus("exported");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteAll() {
    if (!confirm("Alle Daten unwiderruflich löschen? Diese Aktion kann nicht rückgängig gemacht werden.")) return;
    setLoading(true);
    setStatus(null);
    try {
      await deleteAllCheckins();
      setStatus("deleted");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-xl mx-auto px-5 pt-6 pb-28 md:pb-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: "#e8f5f3" }}
        >
          <Shield size={20} color="#2a9d8f" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Datenschutz</h1>
          <p className="text-sm text-gray-400">Deine Daten, deine Kontrolle</p>
        </div>
      </div>

      {/* Info blocks */}
      <div className="flex flex-col gap-4 mb-8">
        {[
          {
            title: "Deine Daten gehören dir",
            text: "Alle Einträge werden ausschließlich für dich gespeichert. Es findet keine Weitergabe an Dritte statt.",
          },
          {
            title: "Keine Weitergabe",
            text: "Deine Check-in-Daten werden nicht veröffentlicht und ohne deine ausdrückliche Zustimmung nicht geteilt.",
          },
          {
            title: "Standardmäßig privat",
            text: "Alle Einstellungen sind standardmäßig auf maximale Privatsphäre gesetzt. Es findet keine automatische Freigabe statt.",
          },
          {
            title: "Keine Diagnose",
            text: "Diese App wertet deine Daten nicht medizinisch aus und gibt keine therapeutischen Empfehlungen. Sie dient ausschließlich der persönlichen Selbstbeobachtung.",
          },
        ].map((item, i) => (
          <div key={i} className="rounded-2xl bg-gray-50 border border-gray-100 px-5 py-4">
            <p className="font-semibold text-gray-800 text-sm mb-1">{item.title}</p>
            <p className="text-sm text-gray-500 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Status messages */}
      {status === "exported" && (
        <div className="flex items-center gap-3 rounded-2xl px-5 py-4 mb-5 bg-teal-50 border border-teal-100">
          <CheckCircle size={18} color="#2a9d8f" />
          <p className="text-sm text-teal-700 font-medium">Daten wurden erfolgreich exportiert.</p>
        </div>
      )}
      {status === "deleted" && (
        <div className="flex items-center gap-3 rounded-2xl px-5 py-4 mb-5 bg-green-50 border border-green-100">
          <CheckCircle size={18} color="#059669" />
          <p className="text-sm text-green-700 font-medium">Alle Daten wurden gelöscht.</p>
        </div>
      )}
      {status === "error" && (
        <div className="rounded-2xl px-5 py-4 mb-5 bg-red-50 border border-red-100">
          <p className="text-sm text-red-700 font-medium">Es ist ein Fehler aufgetreten. Bitte versuche es erneut.</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleExport}
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full rounded-2xl px-5 py-4 border-2 border-gray-200 text-gray-700 font-medium hover:border-gray-300 transition-colors text-sm disabled:opacity-50"
        >
          <Download size={16} />
          Alle Daten exportieren
        </button>
        <button
          onClick={handleDeleteAll}
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full rounded-2xl px-5 py-4 bg-red-50 border-2 border-red-100 text-red-600 font-medium hover:bg-red-100 transition-colors text-sm disabled:opacity-50"
        >
          <Trash2 size={16} />
          Alle Daten löschen
        </button>
      </div>
    </main>
  );
}

┌─────────────────────────────────────────────────
│ ./src/pages/PromptLibraryPage.jsx
└─────────────────────────────────────────────────
/**
 * NW-DEV-001 — Prompt Library
 * Internal admin view — not visible to end users.
 */
import { useState, useEffect, useCallback } from "react";
import { pb } from "../lib/pb.js";
import Search from "icon:search";
import FileText from "icon:file-text";
import ChevronRight from "icon:chevron-right";
import ChevronLeft from "icon:chevron-left";
import X from "icon:x";
import GitBranch from "icon:git-branch";
import Clock from "icon:clock";
import Tag from "icon:tag";

// ─── Status badges ────────────────────────────────────────────────────────────
const STATUS_COLORS = {
  COMPLETED:   { bg: "#f0fdf4", text: "#166534", border: "#86efac" },
  PUBLISHED:   { bg: "#f0fdf4", text: "#166534", border: "#86efac" },
  IN_PROGRESS: { bg: "#fffbeb", text: "#92400e", border: "#fcd34d" },
  DRAFT:       { bg: "#f8fafc", text: "#64748b", border: "#cbd5e1" },
  PLANNED:     { bg: "#f0f9ff", text: "#075985", border: "#7dd3fc" },
  REJECTED:    { bg: "#fef2f2", text: "#991b1b", border: "#fca5a5" },
};

const TYPE_COLORS = {
  FEATURE:       { bg: "#eff6ff", text: "#1d4ed8" },
  BUGFIX:        { bg: "#fef2f2", text: "#b91c1c" },
  REFACTORING:   { bg: "#faf5ff", text: "#7e22ce" },
  STANDARD:      { bg: "#f0fdf4", text: "#166534" },
  SPECIFICATION: { bg: "#fff7ed", text: "#c2410c" },
  ARCHITECTURE:  { bg: "#f0f9ff", text: "#0369a1" },
  POC:           { bg: "#fdf4ff", text: "#a21caf" },
  OPERATIONS:    { bg: "#f8fafc", text: "#475569" },
};

function Badge({ label, colors }) {
  if (!colors) colors = { bg: "#f1f5f9", text: "#64748b" };
  return (
    <span style={{
      padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700,
      background: colors.bg, color: colors.text,
      border: `1px solid ${colors.border || colors.bg}`,
      letterSpacing: "0.04em", textTransform: "uppercase",
    }}>{label}</span>
  );
}

// ─── Prompt detail panel ───────────────────────────────────────────────────
function PromptDetail({ prompt, onClose }) {
  const fullText = (prompt.prompt_text || "") + (prompt.prompt_text_b || "") + (prompt.prompt_text_c || "");
  
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(10,31,68,0.55)", display: "flex",
      alignItems: "flex-start", justifyContent: "flex-end",
    }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        width: "min(680px, 100vw)", height: "100vh", overflowY: "auto",
        background: "#fff", borderLeft: "1px solid #e5e7eb",
        padding: "32px 32px 64px",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
              <Badge label={prompt.prompt_code} colors={{ bg: "#0A1F44", text: "#fff", border: "#0A1F44" }} />
              <Badge label={prompt.status} colors={STATUS_COLORS[prompt.status]} />
              <Badge label={prompt.prompt_type} colors={TYPE_COLORS[prompt.prompt_type]} />
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0A1F44", lineHeight: 1.3, margin: 0 }}>{prompt.title}</h2>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#6b7280" }}>
            <X size={20} />
          </button>
        </div>

        {/* Meta */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28, padding: "16px", background: "#f8fafc", borderRadius: 12, border: "1px solid #e5e7eb" }}>
          {[
            ["Bereich", prompt.area],
            ["Modul", prompt.module],
            ["Feature", prompt.feature],
            ["Version", prompt.version],
            ["NeuroWays-Version", prompt.neuroways_version],
            ["Ersteller", prompt.author],
          ].map(([k, v]) => v ? (
            <div key={k}>
              <p style={{ fontSize: 11, color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>{k}</p>
              <p style={{ fontSize: 14, color: "#0A1F44", fontWeight: 500 }}>{v}</p>
            </div>
          ) : null)}
        </div>

        {/* Predecessor / Successor */}
        {(prompt.predecessor_code || prompt.successor_code) && (
          <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
            {prompt.predecessor_code && (
              <div style={{ flex: 1, padding: "10px 14px", background: "#f0f9ff", borderRadius: 10, border: "1px solid #7dd3fc" }}>
                <p style={{ fontSize: 11, color: "#0369a1", fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>Vorgänger</p>
                <p style={{ fontSize: 13, color: "#0369a1", fontWeight: 600 }}>{prompt.predecessor_code}</p>
              </div>
            )}
            {prompt.successor_code && (
              <div style={{ flex: 1, padding: "10px 14px", background: "#f0fdf4", borderRadius: 10, border: "1px solid #86efac" }}>
                <p style={{ fontSize: 11, color: "#166534", fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>Nachfolger</p>
                <p style={{ fontSize: 13, color: "#166534", fontWeight: 600 }}>{prompt.successor_code}</p>
              </div>
            )}
          </div>
        )}

        {/* Prompt text */}
        {fullText && (
          <section style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Prompt</h3>
            <div style={{
              background: "#0A1F44", borderRadius: 12, padding: "20px 20px",
              fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.75,
              whiteSpace: "pre-wrap", fontFamily: "monospace",
            }}>
              {fullText}
            </div>
          </section>
        )}

        {/* Response summary */}
        {prompt.response_summary && (
          <section style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Ergebnis / Umsetzung</h3>
            <div style={{ background: "#f0fdf4", borderRadius: 10, padding: "16px", fontSize: 14, color: "#166534", lineHeight: 1.7, border: "1px solid #86efac" }}>
              {prompt.response_summary}
            </div>
          </section>
        )}

        {/* Implementation notes */}
        {prompt.implementation_notes && (
          <section style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Technische Notizen</h3>
            <div style={{ background: "#fafafa", borderRadius: 10, padding: "16px", fontSize: 13, color: "#374151", lineHeight: 1.7, border: "1px solid #e5e7eb" }}>
              {prompt.implementation_notes}
            </div>
          </section>
        )}

        {/* Timestamps */}
        <div style={{ display: "flex", gap: 16, marginTop: 24, paddingTop: 20, borderTop: "1px solid #f1f5f9" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#9ca3af" }}>
            <Clock size={13} />
            Erstellt: {new Date(prompt.created).toLocaleDateString("de-DE")}
          </div>
          {prompt.updated !== prompt.created && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#9ca3af" }}>
              <Clock size={13} />
              Geändert: {new Date(prompt.updated).toLocaleDateString("de-DE")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Prompt card ──────────────────────────────────────────────────────────────
function PromptCard({ prompt, onClick }) {
  const sc = STATUS_COLORS[prompt.status] || STATUS_COLORS.DRAFT;
  const tc = TYPE_COLORS[prompt.prompt_type] || { bg: "#f1f5f9", text: "#64748b" };
  return (
    <button onClick={onClick} style={{
      display: "flex", flexDirection: "column", gap: 10,
      width: "100%", textAlign: "left", padding: "18px 20px",
      background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14,
      cursor: "pointer", transition: "box-shadow 0.15s, border-color 0.15s",
      fontFamily: "'DM Sans', sans-serif",
    }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(10,31,68,0.08)"; e.currentTarget.style.borderColor = "#c7d2de"; }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#e5e7eb"; }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: "#0A1F44", letterSpacing: "0.04em", fontFamily: "monospace" }}>
              {prompt.prompt_code}
            </span>
            <Badge label={prompt.status} colors={sc} />
            <Badge label={prompt.prompt_type} colors={tc} />
          </div>
          <p style={{ fontSize: 15, fontWeight: 700, color: "#0A1F44", margin: 0, lineHeight: 1.35 }}>{prompt.title}</p>
        </div>
        <ChevronRight size={18} color="#9ca3af" style={{ flexShrink: 0, marginTop: 2 }} />
      </div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {prompt.area && <span style={{ fontSize: 12, color: "#6b7280", display: "flex", alignItems: "center", gap: 4 }}><Tag size={11} />{prompt.area}</span>}
        {prompt.module && <span style={{ fontSize: 12, color: "#6b7280" }}>{prompt.module}</span>}
        {prompt.neuroways_version && <span style={{ fontSize: 12, color: "#9ca3af" }}>v{prompt.neuroways_version}</span>}
        {prompt.predecessor_code && (
          <span style={{ fontSize: 12, color: "#008CA8", display: "flex", alignItems: "center", gap: 4 }}>
            <GitBranch size={11} />{prompt.predecessor_code}
          </span>
        )}
      </div>
    </button>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function PromptLibraryPage() {
  const [prompts, setPrompts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterArea, setFilterArea] = useState("ALL");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const controller = new AbortController();
    try {
      const res = await pb.collection("dev_prompts").getList(1, 200, {
        sort: "-created",
        signal: controller.signal,
      });
      setPrompts(res.items);
      setFiltered(res.items);
    } catch (e) {
      if (!e?.isAbort && e?.name !== "AbortError") console.error(e);
    } finally {
      setLoading(false);
    }
    return () => controller.abort();
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    let out = prompts;
    if (search) out = out.filter(p =>
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.prompt_code?.toLowerCase().includes(search.toLowerCase()) ||
      p.area?.toLowerCase().includes(search.toLowerCase()) ||
      p.module?.toLowerCase().includes(search.toLowerCase())
    );
    if (filterType !== "ALL") out = out.filter(p => p.prompt_type === filterType);
    if (filterStatus !== "ALL") out = out.filter(p => p.status === filterStatus);
    if (filterArea !== "ALL") out = out.filter(p => p.area === filterArea);
    setFiltered(out);
  }, [search, filterType, filterStatus, filterArea, prompts]);

  const areas  = ["ALL", ...new Set(prompts.map(p => p.area).filter(Boolean))];
  const types  = ["ALL", ...new Set(prompts.map(p => p.prompt_type).filter(Boolean))];
  const statuses = ["ALL", ...new Set(prompts.map(p => p.status).filter(Boolean))];

  const selStyle = { padding: "6px 12px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13, color: "#374151", background: "#fff", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" };

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px 100px", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "#0A1F44", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FileText size={18} color="#fff" />
          </div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0A1F44", margin: 0 }}>Prompt Library</h1>
            <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>NW-DEV-001 · Interner Entwicklungsbereich</p>
          </div>
        </div>
        <p style={{ fontSize: 14, color: "#6b7280", marginTop: 12, lineHeight: 1.6 }}>
          Versionierte Wissensbasis aller NeuroWays-Entwicklungsaufträge.
          Jeder Prompt ist unveränderlich gespeichert — neue Versionen erzeugen neue Einträge.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
        {[
          { label: "Prompts gesamt",   value: prompts.length },
          { label: "Abgeschlossen",    value: prompts.filter(p => p.status === "COMPLETED" || p.status === "PUBLISHED").length },
          { label: "In Arbeit",        value: prompts.filter(p => p.status === "IN_PROGRESS").length },
          { label: "Bereiche",         value: new Set(prompts.map(p => p.area).filter(Boolean)).size },
        ].map(({ label, value }) => (
          <div key={label} style={{ padding: "14px 16px", background: "#f8fafc", borderRadius: 12, border: "1px solid #e5e7eb" }}>
            <p style={{ fontSize: 24, fontWeight: 800, color: "#0A1F44", margin: "0 0 4px" }}>{value}</p>
            <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Search + Filters */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
        <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
          <Search size={15} color="#9ca3af" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Suche nach Titel, Code, Bereich …"
            style={{ ...selStyle, width: "100%", boxSizing: "border-box", paddingLeft: 36 }}
          />
        </div>
        <select value={filterArea}   onChange={e => setFilterArea(e.target.value)}   style={selStyle}>
          {areas.map(a => <option key={a} value={a}>{a === "ALL" ? "Alle Bereiche" : a}</option>)}
        </select>
        <select value={filterType}   onChange={e => setFilterType(e.target.value)}   style={selStyle}>
          {types.map(t => <option key={t} value={t}>{t === "ALL" ? "Alle Typen" : t}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={selStyle}>
          {statuses.map(s => <option key={s} value={s}>{s === "ALL" ? "Alle Status" : s}</option>)}
        </select>
      </div>

      {/* Count */}
      <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 16 }}>
        {filtered.length === prompts.length
          ? `${prompts.length} Prompts`
          : `${filtered.length} von ${prompts.length} Prompts`}
      </p>

      {/* List */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af", fontSize: 14 }}>Wird geladen …</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af", fontSize: 14 }}>Keine Prompts gefunden.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map(p => (
            <PromptCard key={p.id} prompt={p} onClick={() => setSelected(p)} />
          ))}
        </div>
      )}

      {/* Detail panel */}
      {selected && <PromptDetail prompt={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}

┌─────────────────────────────────────────────────
│ ./src/pages/RegisterPage.jsx
└─────────────────────────────────────────────────
/**
 * NW-IDENTITY-002 — Registration Page
 * Uses existing identity.js register() — no new auth logic.
 */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { register } from "../lib/identity.js";
import { useAuth } from "../lib/authContext.jsx";

const inputStyle = {
  width: "100%", padding: "12px 14px",
  border: "1.5px solid #e5e5e5", borderRadius: 10,
  fontSize: 15, color: "#0A1F44", background: "#fafafa",
  outline: "none", boxSizing: "border-box", fontFamily: "'DM Sans', sans-serif",
};

export default function RegisterPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(null);
    if (password !== passwordConfirm) {
      setErr("Die Passwörter stimmen nicht überein.");
      return;
    }
    setLoading(true);
    try {
      await register({ email, password, passwordConfirm, displayName });
      navigate("/dashboard", { replace: true });
    } catch (ex) {
      setErr(ex.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh", background: "#fff", display: "flex",
      alignItems: "center", justifyContent: "center", padding: "32px 24px",
    }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Brand */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{ fontWeight: 800, fontSize: 22, color: "#0A1F44", letterSpacing: "0.12em", fontFamily: "'DM Sans', sans-serif" }}>NEUROWAYS</span>
          <svg viewBox="0 0 280 32" fill="none" style={{ width: "100%", maxWidth: 240, display: "block", margin: "12px auto 0" }}>
            <defs>
              <linearGradient id="wg2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0A1F44"/><stop offset="30%" stopColor="#008CA8"/>
                <stop offset="60%" stopColor="#7B4BA2"/><stop offset="85%" stopColor="#E2A83B"/>
              </linearGradient>
            </defs>
            <path d="M4 20 Q30 6 56 20 Q82 34 108 20 Q134 6 160 20 Q186 34 212 18" stroke="url(#wg2)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            <circle cx="224" cy="17" r="4" fill="#E2A83B"/>
            <line x1="233" y1="17" x2="252" y2="17" stroke="#E2A83B" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 700, color: "#0A1F44", marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>
          Konto erstellen
        </h2>
        <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 32 }}>
          Erstelle dein persönliches NeuroWays-Konto.
        </p>

        {err && (
          <div style={{
            background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10,
            padding: "12px 16px", marginBottom: 20, fontSize: 14, color: "#b91c1c",
          }}>{err}</div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <label>
            <span style={labelStyle}>Anzeigename <span style={{ color: "#9ca3af", fontWeight: 400 }}>(optional)</span></span>
            <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)}
              placeholder="Wie sollen wir dich nennen?" style={inputStyle} autoComplete="name" />
          </label>
          <label>
            <span style={labelStyle}>E-Mail</span>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="du@beispiel.de" style={inputStyle} autoComplete="email" />
          </label>
          <label>
            <span style={labelStyle}>Passwort</span>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Mindestens 8 Zeichen" style={inputStyle} autoComplete="new-password" />
          </label>
          <label>
            <span style={labelStyle}>Passwort wiederholen</span>
            <input type="password" required value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)}
              placeholder="Passwort bestätigen" style={inputStyle} autoComplete="new-password" />
          </label>

          <button type="submit" disabled={loading} style={{
            padding: "14px 24px", background: "#0A1F44", color: "#fff",
            border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
            fontFamily: "'DM Sans', sans-serif", marginTop: 4,
          }}>
            {loading ? "Konto wird erstellt …" : "Konto erstellen"}
          </button>
        </form>

        <p style={{ marginTop: 28, textAlign: "center", fontSize: 14, color: "#6b7280" }}>
          Bereits angemeldet?{" "}
          <Link to="/login" style={{ color: "#0A1F44", fontWeight: 600, textDecoration: "none" }}>Anmelden</Link>
        </p>
      </div>
    </div>
  );
}

const labelStyle = {
  fontSize: 12, fontWeight: 600, color: "#6b7280",
  letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 6,
};

┌─────────────────────────────────────────────────
│ ./src/pages/Result.jsx
└─────────────────────────────────────────────────
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import {
  getCheckinById,
  getAnswersForCheckin,
  getResultRules,
  resolveResultRule,
} from "../lib/engine.js";
import { pb } from "../lib/pb.js";
import ZoneCard from "../components/ZoneCard.jsx";
import ChevronLeft from "icon:chevron-left";
import BarChart2 from "icon:bar-chart-2";
import RefreshCw from "icon:refresh-cw";

export default function Result() {
  const { id } = useParams();
  const [checkin, setCheckin] = useState(null);
  const [rule, setRule] = useState(null);
  const [answersDisplay, setAnswersDisplay] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const entry = await getCheckinById(id, controller.signal);

        // Load result rule
        const rules = await getResultRules(entry.method_id, controller.signal);
        const resolved = resolveResultRule(rules, entry.total_score);

        // Load answers with question + option labels
        const answers = await getAnswersForCheckin(id, controller.signal);

        // Fetch question texts and option labels
        const enriched = await Promise.all(
          answers.map(async (a) => {
            try {
              const [q, opt] = await Promise.all([
                pb.collection("questions").getOne(a.question_id, { signal: controller.signal }),
                pb.collection("answer_options").getOne(a.answer_option_id, { signal: controller.signal }),
              ]);
              return { question: q.question_text, answer: opt.label };
            } catch {
              return { question: "–", answer: "–" };
            }
          })
        );

        setCheckin(entry);
        setRule(resolved);
        setAnswersDisplay(enriched);
        setLoading(false);
      } catch (err) {
        if (!err?.isAbort && err?.name !== "AbortError") {
          setError(true);
          setLoading(false);
        }
      }
    }

    load();
    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <main className="max-w-xl mx-auto px-5 pt-20 flex justify-center">
        <p className="text-gray-400">Wird geladen …</p>
      </main>
    );
  }

  if (error || !checkin || !rule) {
    return (
      <main className="max-w-xl mx-auto px-5 pt-20 text-center">
        <p className="text-gray-500 mb-4">Eintrag nicht gefunden.</p>
        <Link to="/" className="text-teal-600 underline">Zur Startseite</Link>
      </main>
    );
  }

  return (
    <main className="max-w-xl mx-auto px-5 pt-6 pb-28 md:pb-10">
      {/* Back */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/history"
          className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={20} color="#374151" />
        </Link>
        <p className="text-sm font-medium text-gray-500">Dein Ergebnis</p>
      </div>

      <p className="text-xs text-gray-400 mb-4">
        {new Date(checkin.created).toLocaleDateString("de-DE", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        {" · "}
        {new Date(checkin.created).toLocaleTimeString("de-DE", {
          hour: "2-digit",
          minute: "2-digit",
        })} Uhr
      </p>

      {/* Zone card */}
      <div className="mb-8">
        <ZoneCard rule={rule} />
      </div>

      {/* Answers */}
      {answersDisplay.length > 0 && (
        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Deine Antworten
          </p>
          <div className="flex flex-col gap-3">
            {answersDisplay.map((a, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl px-5 py-4 border border-gray-100">
                <p className="text-xs text-gray-400 mb-1">{a.question}</p>
                <p className="text-sm font-medium text-gray-700">{a.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Link
          to="/checkin"
          className="flex items-center justify-center gap-2 w-full rounded-2xl px-5 py-4 border-2 border-gray-200 text-gray-700 font-medium hover:border-gray-300 transition-colors text-sm"
        >
          <RefreshCw size={16} />
          Neuer Check-in
        </Link>
        <Link
          to="/history"
          className="flex items-center justify-center gap-2 w-full rounded-2xl px-5 py-4 text-white font-medium text-sm transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#2a9d8f" }}
        >
          <BarChart2 size={16} />
          Zum Verlauf
        </Link>
      </div>
    </main>
  );
}

┌─────────────────────────────────────────────────
│ ./tailwind.config.cjs
└─────────────────────────────────────────────────
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media",
  theme: {
    extend: {},
  },
  plugins: [],
};

┌─────────────────────────────────────────────────
│ ./vite.config.js
└─────────────────────────────────────────────────
import { defineConfig } from "/usr/lib/sfs-assistant-dev/platform-config.js";

export default defineConfig({});

