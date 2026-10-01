# NeuroQuest – Seitenstruktur & Navigationsfluss

**Version:** 1.0 – Frontend-Prototyp mit statischen Inhalten

---

## 📍 Seitenübersicht

### 1. **Home** (`/`)
   - **Zweck:** Einstiegspunkt. Erste Bekanntschaft mit Caspar und Lumi
   - **Inhalte:**
     - Titel & Tagline
     - Vorstellung der Charaktere (visuelle Karten)
     - Erklärung der „5er-Regel" (5 Tage, 5 Runden, 4 Schritte, 1 Geschichte)
     - Wichtige Botschaft: „Es geht um Aufmerksamkeit, nicht Perfektion"
   - **Navigation:** Ein großer Button → `/day/1/welcome`
   - **Bildschirmbreite:** Vollbildschirm, eine Gedanke
   - **Farbe:** Warm-Amber (Willkommensfarbe)

### 2. **Day Welcome** (`/day/:day/welcome`)
   - **Zweck:** Täglicher Einstieg. Briefing für den Tag
   - **Inhalte:**
     - Grußbotschaft (dynamisch je nach Tag)
     - 5er-Regel ausführlich erklärt (4 Schritte + 1 Geschichte)
     - Aufmunterung durch Lumi
   - **Navigation:** Ein Button → `/day/:day/round/1/start`
   - **Farbe:** Grün (Hoffnung, Energie für den Tag)

### 3. **Round Start** (`/day/:day/round/:round/start`)
   - **Zweck:** Runden-Einstieg. Das Kind macht sich bereit
   - **Inhalte:**
     - Anzeige: Tag X, Runde Y von 5
     - „Bereit?" Frage
     - Lumi sagt Hallo
   - **Navigation:** 
     - Vorwärts → `/day/:day/round/:round/step/1`
     - Zurück → `/day/:day/welcome`
   - **Farbe:** Blau (ruhig, fokussiert)

### 4. **Step 1 – Check** (`/day/:day/round/:round/step/1`)
   - **Zweck:** Satzende prüfen (Punkt? Fragezeichen? Ausrufezeichen?)
   - **Inhalte:**
     - Schritt-Anzeige (1 von 4)
     - Klare Anweisung
     - Lumi-Tipp
   - **Navigation:** → `/day/:day/round/:round/step/2`
   - **Farbe:** Grün (aktive Prüfung)

### 5. **Step 2 – Write** (`/day/:day/round/:round/step/2`)
   - **Zweck:** Satz abschreiben
   - **Inhalte:**
     - Schritt-Anzeige (2 von 4)
     - Anweisung: „Schreib den Satz in dein Heft"
     - Caspar-Ermutigung
   - **Navigation:** → `/day/:day/round/:round/step/3`
   - **Farbe:** Gelb (produktive Arbeit)

### 6. **Step 3 – Control** (`/day/:day/round/:round/step/3`)
   - **Zweck:** Kontrollieren (Wort für Wort, Buchstabe für Buchstabe)
   - **Inhalte:**
     - Schritt-Anzeige (3 von 4)
     - Anweisung zum Vergleichen
     - Lumi-Tipp zur Gründlichkeit
   - **Navigation:** → `/day/:day/round/:round/step/4`
   - **Farbe:** Lila (konzentrierte Überprüfung)

### 7. **Step 4 – Underline** (`/day/:day/round/:round/step/4`)
   - **Zweck:** Satz unterstreichen (Abschluss der Aufgabe)
   - **Inhalte:**
     - Schritt-Anzeige (4 von 4)
     - Anweisung zum Unterstreichen
     - Caspar jubelt: „Jetzt kommt das Beste!"
   - **Navigation:** → `/day/:day/round/:round/story`
   - **Farbe:** Orange (Vorfreude auf die Geschichte)

### 8. **Story Part** (`/day/:day/round/:round/story`)
   - **Zweck:** Die Belohnung – Geschichtenkapitel
   - **Inhalte:**
     - Kapitel-Titel
     - Erzähltext (2–3 Absätze, großzügig formatiert)
     - Ermutigung (z. B. ✨ Du machst das großartig)
   - **Navigation:**
     - Runde 1–4 → `/day/:day/round/:round+1/start`
     - Runde 5 → `/day/:day+1/welcome`
   - **Farbe:** Indigo (magisch, geheimnisvoll)

---

## 🔄 Navigationsfluss

```
┌─────────────────┐
│   HOME (/)      │
│                 │
│ Willkommen      │
│ Caspar & Lumi   │
│ Die 5er-Regel   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│ DAY 1 WELCOME           │
│ /day/1/welcome          │
│                         │
│ Grüße                   │
│ Schritt-Erklärung       │
└────────┬────────────────┘
         │
         ▼
┌──────────────────────────┐
│ ROUND 1 START            │
│ /day/1/round/1/start     │
│ Bereit? Los geht's!      │
└────────┬─────────────────┘
         │
      ┌──┴─────────────────────────────────┐
      │  4-Schritt-Loop (Pro Runde)        │
      │                                    │
      ▼                                    │
┌──────────────────────────────┐           │
│ STEP 1: CHECK SENTENCE END   │           │
│ /day/1/round/1/step/1        │           │
│ Punkt/Fragezeichen/Ausrufezeichen?     │
└────────┬─────────────────────┘           │
         │                                 │
         ▼                                 │
┌──────────────────────────────┐           │
│ STEP 2: WRITE                │           │
│ /day/1/round/1/step/2        │           │
│ Schreib den Satz              │           │
└────────┬─────────────────────┘           │
         │                                 │
         ▼                                 │
┌──────────────────────────────┐           │
│ STEP 3: CONTROL              │           │
│ /day/1/round/1/step/3        │           │
│ Kontrolliere alles            │           │
└────────┬─────────────────────┘           │
         │                                 │
         ▼                                 │
┌──────────────────────────────┐           │
│ STEP 4: UNDERLINE            │           │
│ /day/1/round/1/step/4        │           │
│ Unterstreiche den Satz        │           │
└────────┬─────────────────────┘           │
         │                                 │
         ▼                                 │
┌──────────────────────────────┐           │
│ STORY PART                   │           │
│ /day/1/round/1/story         │           │
│                              │           │
│ 📖 Geschichte Kapitel 1      │           │
│                              │           │
│ "Caspar und Lumi"            │           │
└────────┬────────────────────┘           │
         │                                │
      ┌──┴──────────────────────────────┘
      │  [Runde 2-5 Loop]
      │  Wenn Runde < 5: Nächste Runde
      │  Wenn Runde = 5: Nächster Tag
      │
      ▼
┌──────────────────────────┐
│ DAY 2 WELCOME            │
│ /day/2/welcome           │
│ (Gleicher Loop)          │
└──────────────────────────┘
```

---

## 📁 Komponentenstruktur

```
src/
├── pages/
│   ├── Home.jsx              # Startseite
│   ├── DayWelcome.jsx        # Täglicher Einstieg
│   ├── RoundStart.jsx        # Runden-Einstieg
│   ├── Step1Check.jsx        # Schritt 1: Satzende prüfen
│   ├── Step2Write.jsx        # Schritt 2: Abschreiben
│   ├── Step3Control.jsx      # Schritt 3: Kontrollieren
│   ├── Step4Underline.jsx    # Schritt 4: Unterstreichen
│   └── StoryPart.jsx         # Geschichte
├── App.jsx                   # Router-Setup
├── main.jsx                  # Entry Point
└── index.css                 # Tailwind Styles
```

### Komponentenmuster (jede Seite)

Alle Seiten folgen einer konsistenten Struktur:

```jsx
// 1. Header mit Fortschritt (Tag X, Runde Y)
// 2. Hauptinhalt (Titel + Anweisung oder Geschichte)
// 3. Charakterbox (Lumi oder Caspar)
// 4. Ein großer Button (nächster Schritt)
// 5. Optional: Zurück-Link
```

---

## 🎨 Design-Entscheidungen & UX-Begründungen

### 1. **Ein Gedanke pro Seite**
   - **Warum?** Kinder mit ADHS/Autismus können sich leichter fokussieren
   - **Wie?** Keine Scrollable Seiten, jede Seite füllt den Viewport
   - **Effekt:** Klare visuelle Ruhepausen zwischen Aufgaben

### 2. **Farbcodierung pro Schritt**
   - Grün (Check) → Gelb (Write) → Lila (Control) → Orange (Underline) → Indigo (Story)
   - **Warum?** Visueller Fortschritt ohne Prozentbalken
   - **Effekt:** Das Kind sieht den Rhythmus, kennt den Ort in der Reise

### 3. **Riesige Buttons, große Schrift**
   - 44px+ Tap-Zielbereich (Accessibility-Standard)
   - Text: 18–24px für Anweisungen
   - **Warum?** Motorische Kontrolle bei Schulkindern noch nicht perfekt
   - **Effekt:** Frustrationsfrei, auch für zitterige Hände

### 4. **Charaktere sprechen ermutigend, nicht wertend**
   - Nie: „Richtig!" oder „Falsch!" oder Punkte
   - Immer: „Du machst das großartig", „Achte auf…", „Weiter geht's"
   - **Warum?** Leistungsdruck abbau­en, intrinsische Motivation aufbauen
   - **Effekt:** Das Kind tut es für die Geschichte, nicht für Belohnung

### 5. **Keine Fortschrittsbalken, Sterne, Timer, Punkte**
   - **Warum?** Fügt Stressfaktor hinzu, besonders für Kinder mit Angststörungen
   - **Stattdessen:** Einfach „Schritt 1 von 4" – faktisch, nicht emotional

### 6. **Jede Runde ist eine kleine Erfolgsgeschichte**
   - 4 Schritte + 1 Geschichte pro Tag = 5 Mikro-Erfolge täglich
   - **Effekt:** Tägliches Erfolgserlebnis ohne Kumulation/Vergleich

### 7. **Warm-Naturfarben, nie Neon**
   - Palette: Amber, Grün, Blau, Indigo, Lila, Orange
   - Hintergründe: Sanfte Gradienten (z. B. `from-green-50 to-white`)
   - **Warum?** Kinderbuchästhetik, beruhigend für sensible Sinne
   - **Effekt:** Hochwertiges Design ohne Überstimulation

---

## 🔑 Technisches Setup (Vite + React)

- **Router:** React Router mit dynamischen Routen (`:day`, `:round`, `:step`)
- **Styling:** Tailwind CSS v4 (keine zusätzlichen Dependencies)
- **State Management:** Keine – alles über URL-Parameter
- **Daten:** Statische Objekte (später: Backend wenn nötig)
- **Live Reload:** Vite HMR enabled – Änderungen sofort sichtbar

---

## 📊 Geplante Erweiterungen (Phase 2+)

- **Persistierung:** Speicherung des Fortschritts (welcher Tag/Runde aktuell)
- **Multiple Geschichten:** Storysets nach Klassenstufe/Thema
- **Lehrkraft-Dashboard:** Übersicht über Schülergruppen (optional)
- **Eltern-Ansicht:** Fortschritts-Update (optional)
- **Accessibility:** WCAG 2.1 AA Audit & Verbesserungen

---

## ✅ Nächste Schritte nach Freigabe

1. **Design-Verfeinerung:** Farben & Typografie per Skill `frontend-design` abstimmen
2. **Story-Inhalte:** Vollständige 5-Kapitel-Geschichte für Tag 1 schreiben
3. **Animationen:** Sanfte Übergänge (FadeIn, Slide) zwischen Seiten
4. **Mobile-Test:** Vollständiger Test auf 375px, 768px, 1280px Breakpoints
5. **Charaktere:** Illustrationen für Caspar & Lumi (optional für Prototyp)

---

**Status:** ✅ Seitenstruktur komplett. Wartend auf deine Freigabe für Phase 2.
