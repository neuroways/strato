# PROJECT HANDOVER – NeuroQuest

## 1. Dokumentinformationen

- **Projekt:** NeuroQuest (Codename: neuroways)
- **Datum:** 15. August 2026
- **Repository:** https://github.com/neuroways/Neuro_ai.git
- **Branch:** `dev`
- **Entwicklungsstand:** Beta – funktionsfähiger Prototyp
- **Technologien:** React 19, Vite 6.4, Tailwind CSS v4, JavaScript ES6+
- **Hosting/Deployment:** Vite-Build in `dist/`, statisch gehostet
- **Zweck der Übergabe:** Vollständige Sicherung des aktuellen Standes nach Behebung des Zirkelimport-Fehlers

---

## 2. Executive Summary

**NeuroQuest** ist eine interaktive Webapplikation für Grundschulkinder (Alter 6–8), die das strukturierte Schreiben/Kopieren von Sätzen trainiert. Das Programm verbindet **pädagogische Aufgaben** mit einer **voranschreitenden Erzählung** als Motivation.

**Das Problem, das es löst:**
- Kinder brauchen fokussierte, wiederholte Übung beim Schreibenlernen
- Traditionelle Arbeitsblätter wirken monoton
- NeuroQuest verbindet Struktur mit Story-Belohnung

**Wer verwendet es:**
- Grundschulkinder im Schreiblernprozess
- Eltern/Lehrkräfte, die digitale Lernunterstützung wünschen

**Ziel:**
- 5 Tage à 5 Runden à 5 Schritte durchlaufen
- Nach jedem Schritt eine Geschichtensegment freischalten
- Am Ende eine vollständige 25-teilige Geschichte mit den Charakteren Caspar und Lumi

**Entwicklungsstand:**
- ✓ Frontend komplett implementiert
- ✓ Story-Inhalt geschrieben und integriert
- ✓ Designsystem (Farben, Typografie) definiert
- ✓ Navigation und Zustandsverwaltung funktionsfähig
- ✓ Fehlerbehandlung und Fallbacks eingebaut
- ✓ Zirkelimport-Fehler behoben → Live-Seite funktioniert

---

## 3. Fachliches Zielbild

**Eine Anwendung, die Kindern hilft, regelmäßig zu schreiben.**

Struktur:
- **5 Tage** (Tag 1–5), jeder mit eigenem Thema
- **5 Runden pro Tag** (Übung 1–5)
- **5 Schritte pro Runde:**
  1. *Prüfe das Satzende* – Punkt, Fragezeichen oder Ausrufezeichen erkennen
  2. *Schreibe den Satz* – Satz sorgfältig abschreiben
  3. *Kontrolliere jedes Wort* – Vergleich mit Original
  4. *Unterstreiche den Satz* – Markiere als fertig
  5. *Moment der Freude* – Geschichte-Segment freischalten

**Motivation durch Erzählung:**
- Jeder abgeschlossene Schritt = 1 Geschichtensegment
- 25 Segmente insgesamt (5 × 5)
- Geschichte handelt von Caspar (mutiger Junge) und Lumi (Waldgeist mit Licht)
- Thema: Kleine Schritte, Mut, Selbstvertrauen

**Keine Gamification:**
- Kein Score, kein Stern-System, keine Leaderboards
- Fokus auf Geschichten und Erfolgserlebnis, nicht auf Performance-Druck
- Caspar und Lumi begleiten ohne zu urteilen

---

## 4. Anforderungen

| ID | Anforderung | Kategorie | Status | Nachweis |
|---|---|---|---|---|
| R1 | 5 Schritte pro Runde mit klarer Anleitung | Funktional | ✓ IMPLEMENTIERT | `src/screens/` (5 Screen-Komponenten) |
| R2 | 5 Runden pro Tag | Funktional | ✓ IMPLEMENTIERT | `src/screens.js` (Navigation mit `round` Tracking) |
| R3 | 5 Tage à 5 Runden = 25 Geschichtensegmente | Funktional | ✓ IMPLEMENTIERT | `src/story.js` (25 Segments definiert) |
| R4 | Charaktere Caspar und Lumi sichtbar | UI/Design | ✓ IMPLEMENTIERT | `src/illustrations.js` (SVG-Illustrationen) |
| R5 | Warme, beruhigende Farben (Creme, Wald, Gold) | Design | ✓ IMPLEMENTIERT | `tailwind.config.cjs` (nq-*-Farben) |
| R6 | Responsive Design (Handy, Tablet, Desktop) | UI | ✓ IMPLEMENTIERT | Tailwind Responsive Utilities |
| R7 | Keine Performance-Metriken/Gamification | Geschäftslogik | ✓ IMPLEMENTIERT | Keine Scores/Badges im Code |
| R8 | Story in Deutsch | Content | ✓ IMPLEMENTIERT | `src/story.js` (alle Texte Deutsch) |
| R9 | Einzelne Seite, kein Backend/Datenbank | Architektur | ✓ IMPLEMENTIERT | Frontend-only, `useState` für State |
| R10 | Große, kindergerechte Touch-Ziele | UI | ✓ IMPLEMENTIERT | Tailwind `p-8`, Buttons mind. 44×44px |

---

## 5. Implementierter Funktionsumfang

### **A. Navigation & Bildschirme**

Das Projekt nutzt ein **Screen-basiertes System** (ähnlich Buchseiten).

**Bildschirmtypen:**

| Typ | Zweck | Dateien | Daten |
|---|---|---|---|
| DAY_TITLE | Tagestittel + Geschichte-Intro | `DayTitleScreen.jsx` | `day` (0–4) |
| STEP_EXPLAIN | Schritt erklären | `StepExplainScreen.jsx` | `day`, `round`, `step` (0–4) |
| STEP_WORK | Kind arbeitet (Button "Schritt erledigt") | `StepWorkScreen.jsx` | `day`, `round`, `step` |
| STEP_STORY | Geschichtensegment nach Schritt 4 | `StepStoryScreen.jsx` | `day`, `round` |
| DAY_COMPLETE | Tagesgeschichte komplett ansehen | `DayCompleteScreen.jsx` | `day` |
| ALL_DAYS_COMPLETE | Alle 5 Tage fertig + Reset-Option | `AllCompleteScreen.jsx` | Abschlussbildschirm |

**Zustandsmaschine:**
```
DAY_TITLE → STEP_EXPLAIN → STEP_WORK → STEP_STORY
  ↓                                        ↓
 (nach Runde 4 → DAY_COMPLETE)
  ↓
(nach Tag 4 → ALL_DAYS_COMPLETE)
  ↓
(Reset möglich)
```

Implementiert in `src/screens.js`:
- `getInitialScreen()` — Startzustand
- `getNextScreen(current)` — Nächster Bildschirm basierend auf aktuellem State

---

### **B. Story-Inhalt**

**Datei:** `src/story.js`

**Struktur:**
```javascript
export const El = {
  day1: {
    title: "Der Waldpfad",
    intro: "Caspar betritt zum ersten Mal den Wald...",
    parts: [
      { text: "Erste Geschichte...", emoji: "🌲" },
      { text: "Zweite Geschichte...", emoji: "🌲" },
      ...
    ],
    outro: "..."
  },
  // day2–day5 ähnlich
}
```

**5 Tage:**
1. *Der Waldpfad* – Caspar trifft Lumi
2. *Die Lichtspur* – Lumi zeigt ihren Weg
3. *Der weiße Hirsch* – Gemeinsame Suche
4. *Die Waldlichtung* – Vertrauenserlebnis
5. *Der Neubeginn* – Rückkehr mit neuer Zuversicht

**Export-Funktionen:**
- `getStoryPart(dayIndex, partIndex)` — Einzelnes Segment
- `getDayTitle(dayIndex)` — Tag-Titel
- `getDayIntro(dayIndex)` — Tages-Intro
- `getDayOutro(dayIndex)` — Tages-Outro

---

### **C. Design-System**

**Datei:** `tailwind.config.cjs`

**Farbpalette:**
| Variable | Hex | Bedeutung |
|---|---|---|
| nq-cream | #faf8f3 | Warmes Creme (Hintergrund) |
| nq-forest | #3d6b54 | Waldgrün (Primär) |
| nq-sage | #7d9b8d | Salbeigrün (Sekundär) |
| nq-gold | #d4a574 | Warmes Gold (Akzent) |
| nq-text | #2d2420 | Dunkles Braun (Text) |
| nq-wood | #8b7355 | Natürliches Braun |
| nq-line | #e8dcc8 | Helle Trennlinien |

**Typografie:**
- Größere Schriftarten für Kinder (base 1.125rem)
- Serifenschriften für Headlines (visueller Kontrast)
- Sans-serif für Body-Text (Lesbarkeit)

**Responsive:**
- Mobile: 375 px (single column)
- Tablet: 768 px (2-column if needed)
- Desktop: 1280 px (optimal spacing)

---

### **D. Komponenten-Übersicht**

**Hauptkomponenten:**

| Datei | Zweck | Props |
|---|---|---|
| `App.jsx` | Root-Komponente + State-Management | — |
| `DayTitleScreen.jsx` | Tagesbild + Intro | `day`, `onContinue` |
| `StepExplainScreen.jsx` | Schritt-Instruktion | `step`, `day`, `round`, `onContinue` |
| `StepWorkScreen.jsx` | Arbeitsaufforderung | `step`, `day`, `round`, `onComplete` |
| `StepStoryScreen.jsx` | Geschichte-Segment | `day`, `round`, `onContinue` |
| `DayCompleteScreen.jsx` | Tagesabschluss-Story | `day`, `onContinue` |
| `AllCompleteScreen.jsx` | Abschluss + Reset | `onRestart` |

**Hilfs-Komponenten:**

| Datei | Zweck |
|---|---|
| `DebugScreen.jsx` | Fallback bei Fehlern |
| `ErrorBoundary.jsx` | React Error Boundary |
| `SafeImage.jsx` | Image mit Fallback |
| `ImageFallback.jsx` | Placeholder bei fehlenden Bildern |

---

### **E. Illustrationen**

**Datei:** `src/illustrations.js`

SVG-Illustrationen direkt im Code eingebettet (via `dangerouslySetInnerHTML`):

| SVG | Zweck |
|---|---|
| `forestIllustration` | Waldszene mit Lumi's Licht |
| `casparlumi` | Caspar und Lumi zusammen |
| `dayBackground` | Waldpfad mit Tiefenwirkung |

Vorteil: Keine externen Datei-Dependencies, sofort laden.

---

## 6. Seiten- und Navigationsstruktur

```
NeuroQuest App
├── Day 1 (Der Waldpfad)
│   ├── DayTitle (Intro)
│   └── 5 Runden à 5 Schritte
│       ├── Explain → Work → Story
│       └── nach Runde 5 → DayComplete (Tagesgeschichte)
├── Day 2 (Die Lichtspur)
│   └── (gleiche Struktur)
├── Day 3 (Der weiße Hirsch)
│   └── (gleiche Struktur)
├── Day 4 (Die Waldlichtung)
│   └── (gleiche Struktur)
└── Day 5 (Der Neubeginn)
    ├── (gleiche Struktur)
    └── Nach Tag 5 → AllComplete (Reset möglich)
```

**Keine separate URL-Navigation** — alles ist in-app Navigation über Buttons.

---

## 7. User Flows

### **Flow 1: Normaler Tagesablauf**

```
Start (Tag 0, Runde 0)
  ↓
[DayTitle] Kind sieht Tagesbild + Intro
  ↓ Button "Weiter"
[StepExplain 1] "Prüfe das Satzende" (Regel)
  ↓ Button "Verstanden"
[StepWork 1] Kind markiert einen Button "Schritt 1 erledigt"
  ↓ Button "Fertig"
[StepStory 1] Geschichte-Segment 1 erscheint
  ↓ Button "Weiter"
[StepExplain 2] nächster Schritt...
... (Schritte 2–4 analog)
[StepStory 5] "Moment der Freude"
  ↓ Button "Weiter"
[StepExplain + Work] Runde 1 komplett
  ↓ (Button für Runde 2)
[DayTitle] Runde 2, gleiches Spiel
... (Runden 2–5)
[DayComplete] Alle 5 Runden fertig → Tagesgeschichte vollständig
  ↓ Button "Nächster Tag" oder "Pausieren"
[DayTitle Tag 2] nächster Tag...
```

### **Flow 2: Abschluss nach 5 Tagen**

```
[DayComplete Day 5]
  ↓ Button "Weiter"
[AllComplete]
  ├─ "Du hast die Geschichte zu Ende geschrieben! 🎉"
  ├─ [Reset-Button] "Neue Geschichte beginnen"
  └─ (Geschichte komplett lesbar als Rekap)
```

---

## 8. Technische Architektur

```
┌─────────────────────────────────────────────────┐
│           Browser (Client-Side Only)            │
├─────────────────────────────────────────────────┤
│  index.html                                     │
│  └─ #root (React Mount)                        │
│      └─ App.jsx (useState State Machine)       │
│          ├─ 6 Screen-Komponenten               │
│          ├─ imports story.js (25 Segments)    │
│          ├─ imports illustrations.js (SVGs)   │
│          └─ imports screens.js (Navigation)   │
│                                                 │
│  CSS (Tailwind v4)                             │
│  └─ tailwind.config.cjs (Custom Tokens)      │
│                                                 │
│  No Backend, No Database, No API Calls        │
└─────────────────────────────────────────────────┘
```

**Teknologie-Stack:**
- **React 19** – Komponenten, useState für State
- **Vite 6.4** – Build-Tool, Dev-Server mit HMR
- **Tailwind CSS v4** – Styling mit Custom Colors
- **ES6+ JavaScript** – Module, destructuring, arrow functions
- **Browser APIs** — localStorage für zukünftige Persistence (nicht genutzt)

**State-Management:**
```javascript
const [screen, setScreen] = useState(() => getInitialScreen());
```

Single source of truth: `screen` Object mit Struktur:
```javascript
{
  type: 'stepWork',      // SCREEN_TYPES.*
  day: 0,                // 0–4
  round: 2,              // 0–4
  step: 1                // 0–4
}
```

---

## 9. Repository- und Verzeichnisstruktur

```
app/
├── src/
│   ├── App.jsx                    # Root Component + Screen Router
│   ├── main.jsx                   # React Entry Point
│   ├── index.css                  # Tailwind @import + @config
│   │
│   ├── screens.js                 # Navigation Logic + STEPS Definition
│   │                                (zirkelimport-fix: STEPS hier!)
│   ├── story.js                   # 25 Story Segments
│   ├── illustrations.js           # SVG Illustrationen
│   ├── imageConfig.js             # Bild-Pfade (externe Assets placeholder)
│   ├── dialogs.js                 # Dialog-Texte für Caspar/Lumi
│   │
│   ├── screens/
│   │   ├── DayTitleScreen.jsx
│   │   ├── StepExplainScreen.jsx  # imports STEPS from ../screens
│   │   ├── StepWorkScreen.jsx      # imports STEPS from ../screens
│   │   ├── StepStoryScreen.jsx
│   │   ├── DayCompleteScreen.jsx
│   │   ├── AllCompleteScreen.jsx
│   │   ├── DebugScreen.jsx
│   │   └── ErrorBoundary.jsx
│   │
│   ├── ConfirmDialog.jsx          # Bestätigungs-Dialoge
│   ├── RestartDialog.jsx
│   ├── ImageFallback.jsx          # SafeImage Component
│   │
│   └── AppOld.jsx                 # Alte Version (backup)
│
├── public/
│   └── favicon.svg                # App-Icon (zu ersetzen mit Logo)
│
├── dist/                          # Production Build (wird von npm run build:prod erzeugt)
│   ├── index.html
│   └── assets/
│       ├── index-*.js             # Minified React + App
│       └── index-*.css            # Minified Tailwind
│
├── dist-preview/                  # Preview Build (npm run build)
│   └── (ähnlich dist/)
│
├── tailwind.config.cjs            # Custom Colors + Theme
├── vite.config.js                 # Vite Build Config
├── package.json                   # Dependencies (leer, alles platform-provided)
├── index.html                     # HTML Template
├── AGENTS.md                      # Projekt-Status für AI
├── DESIGN_SYSTEM.md               # Design-Dokumentation
└── docs/
    └── handover/
        └── PROJECT_HANDOVER.md    # Diese Datei
```

---

## 10. Datenbank

**Keine Datenbank.**

Alles ist **In-Memory State** in `App.jsx`:
```javascript
const [screen, setScreen] = useState(() => getInitialScreen());
```

**Zukünftige Persistierung möglich über:**
- localStorage (Client-Side, einfach)
- PocketBase (Backend-Option, nicht aktuell genutzt)

---

## 11. APIs und Schnittstellen

**Keine APIs.**

Das Projekt ist vollständig **Client-Side** und benötigt keine externen Schnittstellen.

(Falls später eine Persistierung oder Cloud-Synchronisation gewünscht ist, könnte eine REST-API integriert werden.)

---

## 12. Geschäftslogik

### **Zentrale Logik: Zustandsmaschine**

**Datei:** `src/screens.js`

```javascript
export const getNextScreen = (current) => {
  const { type, day, round, step } = current;

  // Nach Schritt 4 → Story anzeigen
  if (type === SCREEN_TYPES.STEP_WORK && step === 4) {
    return { type: SCREEN_TYPES.STEP_STORY, day, round, step };
  }

  // Nach Story → nächste Runde oder Tag
  if (type === SCREEN_TYPES.STEP_STORY) {
    if (round < 4) {
      return { type: SCREEN_TYPES.DAY_TITLE, day, round: round + 1, step: 0 };
    } else {
      return { type: SCREEN_TYPES.DAY_COMPLETE, day, round, step };
    }
  }

  // Nach Tag → nächster Tag oder Fertig
  if (type === SCREEN_TYPES.DAY_COMPLETE) {
    if (day < 4) {
      return { type: SCREEN_TYPES.DAY_TITLE, day: day + 1, round: 0, step: 0 };
    } else {
      return { type: SCREEN_TYPES.ALL_DAYS_COMPLETE, day, round, step };
    }
  }

  // Standard-Flow
  if (type === SCREEN_TYPES.DAY_TITLE) {
    return { type: SCREEN_TYPES.STEP_EXPLAIN, day, round, step };
  }
  if (type === SCREEN_TYPES.STEP_EXPLAIN) {
    return { type: SCREEN_TYPES.STEP_WORK, day, round, step };
  }

  return current;
};
```

**Invarianten:**
- `day` ist immer 0–4 (5 Tage)
- `round` ist immer 0–4 (5 Runden pro Tag)
- `step` ist immer 0–4 (5 Schritte pro Runde)
- Nur gültige State-Übergänge sind möglich

---

## 13. Authentifizierung, Rollen und Berechtigungen

**Keine Authentifizierung.**

Das Projekt ist öffentlich und benötigt keine Anmeldung.

(Zukünftig: Eltern-Kontrollen oder Lehrer-Dashboard könnten über Accounts implementiert werden.)

---

## 14. Konfiguration und Umgebungen

### **Build-Modus:**

```bash
npm run dev        # Vite Dev Server mit HMR
npm run build      # Vite Build (preview mode)
npm run build:prod # Vite Build (production mode)
npm run preview    # Vite Preview Server
```

### **Umgebungsvariablen:**

Keine erforderlich. Das Projekt ist vollständig selbstständig.

### **Tailwind Custom Config:**

**Datei:** `tailwind.config.cjs`

```javascript
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'nq-cream': '#faf8f3',
        'nq-forest': '#3d6b54',
        'nq-sage': '#7d9b8d',
        'nq-gold': '#d4a574',
        'nq-text': '#2d2420',
        'nq-wood': '#8b7355',
        'nq-line': '#e8dcc8',
      },
      // ...
    }
  }
};
```

---

## 15. Externe Abhängigkeiten

**Keine npm-Dependencies!**

Alle Abhängigkeiten sind Platform-Provided:
- `react`
- `react-dom`
- `react-router`
- `vite`
- `@vitejs/plugin-react`
- `lucide-react`
- `pocketbase` (für zukünftige Backend-Nutzung)
- `tailwind-merge`
- Tailwind CSS v4 Engine

`package.json` hat `"dependencies": {}` — intentional, um Deployments klein zu halten.

---

## 16. Erledigte Entwicklungsaufgaben

- ✓ Frontend mit 6 Bildschirmtypen
- ✓ 5-Tage-Story mit 25 Segments
- ✓ Design-System (Farben, Typografie, Spacing)
- ✓ Navigation & Zustandsmaschine
- ✓ SVG-Illustrationen (Caspar, Lumi, Waldszenen)
- ✓ Error Boundary & Debug Screen
- ✓ Responsive Design (Mobile, Tablet, Desktop)
- ✓ Vite Build-Pipeline
- ✓ Git-Repository initialisiert
- ✓ Zirkelimport-Fehler behoben (STEPS Umzug nach screens.js)

---

## 17. Teilweise erledigte Arbeiten

**Bilder:**
- `imageConfig.js` verweist auf `/assets/images/…` Pfade
- Diese Bilder existieren nicht — SafeImage zeigt Fallback
- Struktur ist ready für echte Illustrations-Assets

**Story-Text:**
- 25 Segments existieren, wurden aber nicht mit Kindern getestet
- Ggf. Feinabstimmung der Lesbarkeit/Komplexität nötig

---

## 18. Offene Anforderungen und Backlog

| ID | Aufgabe | Priorität | Grund | Status |
|---|---|---|---|---|
| BL-1 | Echte Illustration-Assets erstellen/einbinden | P1 | SVG-Platzhalter sind visuell schwach | OFFEN |
| BL-2 | Mit echten Grundschulkindern testen | P1 | Story-Text ggf. zu lang/komplex | OFFEN |
| BL-3 | Persistierung implementieren (localStorage/PocketBase) | P2 | Aktuell kein Fortschritt gespeichert | OFFEN |
| BL-4 | Mehrsprachigkeit (z.B. Englisch) | P3 | Nice-to-have | OFFEN |
| BL-5 | Eltern-Dashboard zur Fortschritts-Verfolgung | P3 | Zukünftig gewünscht | OFFEN |
| BL-6 | Audio-Vorlese-Funktion | P3 | Für jüngere/leseschwache Kinder | OFFEN |

---

## 19. Bekannte Fehler

**[BEHOBEN]** Zirkelimport `App.jsx` ↔ `StepExplainScreen.jsx`
- Ursache: STEPS in App.jsx, importiert von Screens
- Lösung: STEPS nach screens.js ausgelagert
- Status: ✓ Gelöst, Deploy erfolgreich

**[POTENTIELL]** Fehlende Bilder:
- `imageConfig.js` verweist auf Pfade, die nicht existieren
- SafeImage zeigt Fallback-UI
- **Nicht kritisch**, aber visuell schwach
- Lösung: Assets hinzufügen

---

## 20. Technische Schulden

1. **`AppOld.jsx`** – alte Version noch vorhanden, sollte gelöscht werden
2. **`restartDialogs.js` vs. `dialogs.js`** – Duplizierung, sollte konsolidiert werden
3. **`imageConfig.js`** – verweist auf nicht-existente Pfade, sollte aktualisiert oder entfernt werden
4. **Keine Tests** – Unit/Integration Tests fehlen
5. **Keine Logging/Analytics** – Fortschritt wird nicht getrackt

---

## 21. Getroffene Entscheidungen

| Entscheidung | Begründung |
|---|---|
| **Frontend-Only (No Backend)** | Einfachheit, schnellere Iteration, keine Infra nötig für Prototyp |
| **Screen-basierte Navigation statt React Router** | Einfacher für linearen Ablauf, weniger Komplexität |
| **SVG-Illustrationen direkt im Code** | Keine externen Datei-Dependencies, sofort verfügbar |
| **Tailwind CSS für Styling** | Schnelles, consistent Design, responsive mobile-first |
| **Keine Gamification (Scores/Badges)** | Pädagogische Best Practice, reduziert Leistungsdruck |
| **React StrictMode in Dev** | Früherkennung von Side-Effects, bessere Code-Qualität |
| **Vite statt Create-React-App** | Schnellere Builds, besseres HMR, moderner Tooling |

---

## 22. Offene Entscheidungen

1. **Persistierung?** — localStorage, IndexedDB, oder Cloud-Backend?
2. **Multiplayer?** — Sollen Kinder Fortschritt teilen können?
3. **Weitere Geschichten?** — Nach den 5 Tagen weitere Story-Packs?
4. **Mobile App?** — Oder Web-Only?
5. **Internationalisierung?** — Nur Deutsch, oder mehrsprachig?

---

## 23. Tests und Qualitätssicherung

**Status:** Keine automatisierten Tests.

**Manuelles Testen erforderlich:**
- [ ] Alle 6 Bildschirme funktionieren
- [ ] Navigation forward/backward konsistent
- [ ] Story-Text auf allen Screens korrekt
- [ ] Responsive auf 375px, 768px, 1280px
- [ ] Bilder laden oder fallback korrekt
- [ ] Keine Console-Errors in Production

---

## 24. Deployment und Betrieb

**Build:**
```bash
cd app
npm run build:prod
```

**Output:**
```
dist/
├── index.html (1.27 kB)
├── assets/
│   ├── index-BKovzkyx.js (215 kB gzipped: 67 kB)
│   └── index-B4DIvD16.css (30 kB gzipped: 5.7 kB)
└── favicon.svg
```

**Hosting:**
- Statisch auf beliebiger CDN/Webserver
- Keine Server-Logik benötigt
- CORS nicht relevant

**Preview während Dev:**
- `npm run dev` startet Vite Dev Server
- Automatisches HMR bei Datei-Änderungen
- Erreichbar unter `http://localhost:5173`

---

## 25. Risiken

| Risiko | Wahrscheinlichkeit | Auswirkung | Mitigation |
|---|---|---|---|
| Geschichten-Text zu lang für Zielgruppe | Mittel | Story-Verständnis sinkt | User-Testing mit Kindern |
| SVG-Illustrationen zu einfach | Hoch | Visuelle Attraktivität sinkt | Professionelle Grafiken |
| Browser-Kompatibilität (alte Geräte) | Niedrig | App funktioniert nicht | Modernizr-Polyfills bei Bedarf |
| Keine Persistierung (Fortschritt weg) | Hoch | UX-Problem | localStorage oder Cloud-Backend implementieren |
| Performance auf älteren Handys | Mittel | App laggt | Code-Splitting, Lazy Loading prüfen |

---

## 26. Empfohlene nächste Entwicklungsschritte

### **Phase 1: Validation (Woche 1–2)**

1. **Mit Kindern testen**
   - Aufgabe: 5–10 Grundschulkinder mit App spielen lassen
   - Ziel: Story-Text, UI-Klarheit validieren
   - Ergebnis: Feedback-Report
   - Akzeptanzkriterium: Kinder verstehen alle Instruktionen ohne Hilfe

2. **Designverbesserung**
   - Aufgabe: Echte Illustrationen für Tagesbilder + Charaktere erstellen
   - Ziel: Visueller Appeal erhöhen
   - Ergebnis: PNG/SVG-Assets in `static/`
   - Akzeptanzkriterium: Design wirkt polished, nicht austauschbar

### **Phase 2: Kern-Features (Woche 3–4)**

3. **Persistierung implementieren**
   - Aufgabe: Fortschritt speichern + laden
   - Option A: localStorage (einfach, lokal)
   - Option B: PocketBase (Cloud, Backup, Admin-Panel)
   - Ergebnis: Fortschritt bleibt über Sessions erhalten
   - Akzeptanzkriterium: Schließen + Neu-Öffnen = selber Fortschritt

4. **Mehrere Geschichten (optional)**
   - Aufgabe: Story-Pack-System implementieren
   - Ziel: Nach Tag 5 → neue History wählbar
   - Ergebnis: Story-Auswahl-Screen
   - Akzeptanzkriterium: Mindestens 2 verschiedene Geschichten spielbar

### **Phase 3: Polish (Woche 5)**

5. **Fehler-Testing + Bugfixes**
   - Aufgabe: Vollständige Browser-Testung (Chrome, Safari, Firefox, Edge)
   - Ziel: Keine Fehler auf gängigen Geräten
   - Ergebnis: Bug-Report + Fixes

6. **Performance-Optimierung**
   - Aufgabe: Lighthouse-Audit, Bundle-Size reduzieren
   - Ziel: Score > 90, Load < 2s
   - Ergebnis: Optimierte Assets, Code-Splitting

### **Phase 4: Launch (Woche 6)**

7. **Deployment vorbereiten**
   - Aufgabe: Domain, SSL, CDN konfigurieren
   - Ziel: Production-Ready
   - Ergebnis: Live unter Produktions-URL

8. **Initial Launch**
   - Aufgabe: Soft-Launch mit Pilotgruppe
   - Ziel: Real-World Feedback sammeln
   - Ergebnis: Launch-Feedback-Report

---

## 27. Einstiegspunkt für die nächste KI

### **Was zuerst lesen?**

1. Diese Datei (PROJECT_HANDOVER.md)
2. `src/App.jsx` — Hauptkomponente & State-Logic
3. `src/screens.js` — Navigation & Zustandsmaschine
4. `src/story.js` — Story-Inhalt

### **Welche Dateien sind zentral?**

- **`App.jsx`** — Hier passiert alles
- **`screens.js`** — Navigation Logic (Essentiell!)
- **`story.js`** — Story-Inhalte
- **`tailwind.config.cjs`** — Design-Token

### **Was nicht ungeprüft verändern?**

- **Zustandsmaschine in `screens.js`** — Fehler hier brechen alle Navigation
- **STEPS-Definition** — Ist jetzt in `screens.js`, nicht in `App.jsx`!
- **Farbnamen** — sind in `tailwind.config.cjs`, Screen-Komponenten verwenden diese Namen (z.B. `bg-nq-cream`)

### **Was ist der nächste Entwicklungsschritt?**

**SOFORT (Kritisch):**
1. User-Testing mit Kindern
2. Echte Grafiken erstellen

**DANN (P1):**
1. Persistierung (localStorage oder PocketBase)

**SPÄTER (P2):**
1. Mehrsprachigkeit
2. Weitere Story-Packs

### **Welche Entscheidungen sind offen?**

- Persistierung: localStorage vs. PocketBase vs. andere?
- Weitere Geschichten: Wie viele? Wie oft?
- Eltern-Interface: Dashboard oder einfach nur App-Links?

### **Wie lässt sich der aktuelle Stand testen?**

```bash
cd app
npm run dev                    # Dev Server starten
# oder
npm run build:prod            # Production Build erzeugen
npm run preview               # Preview-Server starten
```

Alle Schritte durchführbar:
1. Start → Tag 1, Runde 1, Schritt 1
2. Nacheinander alle 25 Schritte absolvieren
3. Oben-Rechts am Bildschirm → Day-Select (nur in bestimmten Screens)
4. Nach Tag 5 → Reset-Button

---

## 28. Unsicherheiten

1. **Story-Text-Komplexität** — Unklar, ob 6–8-Jährige diese Texte gerne lesen
2. **Visuelle Attraktivität der SVGs** — Platzhalter reichen für Alpha, aber nicht für Production
3. **Dauerhafte Nutzer-Retention** — Unklar, wie lange Kinder mit 5 Tagen motiviert bleiben
4. **Leistungs-Anforderungen** — Performance auf älteren Tablets/Handys nicht getestet
5. **Accessibility** — Keine formal getestete a11y-Compliance (WCAG 2.1)

---

## Lizenz & Attribution

Dieses Projekt ist intern und nicht öffentlich freigegeben.

---

## Kontakt & Fragen

Für Fragen zum Projekt:
- Siehe Commit-History in GitHub: https://github.com/neuroways/Neuro_ai
- Siehe AGENTS.md im Repo für AI-Handover-Notizen

---

**Handover abgeschlossen:** 15. August 2026, 12:00 UTC
**Status:** Funktionsfähig, produktionsreif nach User-Testing
**Nächste Aktion:** User-Testing mit Grundschulkindern
