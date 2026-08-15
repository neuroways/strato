# PROJECT HANDOVER – NeuroQuest

## 1. Dokumentinformationen

| Eigenschaft | Wert |
|------------|------|
| **Projektname** | NeuroQuest – Ein interaktives Kinderbuch |
| **Übergabedatum** | 2026-08-15 |
| **Aktueller Entwicklungsstand** | Schritt 1 abgeschlossen: Komplette Seitenstruktur als Frontend-Prototyp |
| **Primäre Technologien** | Vite 6.4.3, React 19, React Router, Tailwind CSS v4 |
| **Repository** | Git – Branch `dev` (lokal in `/home/www/aibuilder-7dt69/app/`) |
| **Deployment-Umgebung** | IONOS-basierte Platform (SFS Assistant) |
| **Hosting** | `/home/www/aibuilder-7dt69/` mit `app/` als Projekt-Root |
| **Zweck dieser Übergabe** | Vollständige technische Dokumentation für Fortführung ohne ursprünglichen Kontext |

---

## 2. Executive Project Summary

**NeuroQuest** ist ein interaktives Kinderbuch – nicht eine Schulapp, nicht ein Lernmanagement-System. Es richtet sich an Grundschulkinder (Klasse 1–4), besonders solche mit ADHS, Autismus oder erhöhtem Bewegungs-/Strukturbedarf. Die zentrale Idee: Das Kind kommt wegen der Geschichte. Die Aufgabe ist nur der Schlüssel zum nächsten Kapitel.

**Kernlogik (die „5er-Regel"):**
- 5 Tage Reise
- 5 Runden pro Tag  
- 4 Aufschritte pro Runde (Satzende prüfen → Satz schreiben → Kontrollieren → Unterstreichen)
- 1 Geschichte als einzige Belohnung pro Tag
- Zusammen = 1 vollständige Geschichte nach Tag 5

**Aktueller Status:** Schritt 1 der Entwicklung abgeschlossen. Alle 8 Seiten existieren als Frontend-Prototyp mit statischen Inhalten. Keine Backend-Logik, keine Datenbank, keine Authentifizierung – reiner interaktiver Seitenfuss mit React Router und Tailwind CSS.

**Was funktioniert:**
- Vollständige Seiten-Navigation über alle 5 Tage, 5 Runden, 4 Schritte und die Geschichte
- Responsive Design (375px / 768px / 1280px)
- Farbcodierte Schritte (Grün → Gelb → Lila → Orange → Indigo für Story)
- Deutsche Benutzeroberfläche
- Statisch hintergelegte Geschichte für Tag 1 (5 Kapitelteile)

---

## 3. Fachliches Zielbild

### Bestätigte Anforderungen

1. **Kinderbuch-Experience, nicht Schulapp**
   - Fokus auf Erzählung und Motivation durch Geschichte, nicht Gamification
   - Keine Punkte, Sterne, Timer, Ranglisten, Leistungsanzeigen
   - Keine Neonfarben, hektischen Animationen
   - Warme Naturfarben, große Illustrationen, ruhige Übergänge, viel Weißraum

2. **Die „5er-Regel" als zentrales Gestaltprinzip**
   - Exakt 4 Handlungsschritte pro Aufgabe (nicht mehr, nicht weniger)
   - Exakt 5 Runden täglich
   - Exakt 5 Tage für 1 vollständige Geschichte
   - Diese Struktur gibt Kindern mit Neurodiversität klare Halt- und Orientierungspunkte

3. **Die vier Aufgabenschritte (app-seitig)**
   - Schritt 1: Satzende prüfen (Punkt? Fragezeichen? Ausrufezeichen?)
   - Schritt 2: Satz aus Schulbuch/Arbeitsblatt in Heft abschreiben
   - Schritt 3: Abgeschriebenen Satz kontrollieren (Wort für Wort, Buchstabe für Buchstabe)
   - Schritt 4: Fertigen Satz unterstreichen
   - Danach: Geschichte (Schritt 5, die Belohnung)

4. **Die App kennt die Aufgabensätze NICHT**
   - App zeigt nur Anweisungen und Struktur
   - Echte Sätze befinden sich im Schulbuch, Arbeitsblatt oder Heft des Kindes
   - App führt durch den Prozess, wertet nicht aus, speichert nicht

5. **Charaktere und ihre Rolle**
   - **Caspar:** Grundschulkind, freundlich, neugierig, macht Fehler und probiert weiter – spiegelt die Zielgruppe
   - **Lumi:** Kleines Lichtwesen, ruhig, geduldig, ermutigend – Begleiter und innere Stimme der Selbstberuhigung
   - Beide sprechen niemals wertend (kein „Richtig!", „Falsch!", kein Leistungsfeedback)
   - Beide ermutigen zu Dranbleiben, Selbstkontrolle, kleine Schritte, Neugier

6. **UX-Prinzip: „Ein Gedanke pro Bildschirm"**
   - Nie gleichzeitig: Geschichte + Aufgabe + Fortschritt + mehrere Buttons
   - Immer nur: 1 Aufgabe, 1 Button, 1 nächster Schritt
   - Nie scrollen
   - Jede Seite vollständiger Viewport, ruhig, übersichtlich

7. **Leistungsdruck-freie Grundhaltung**
   - Belohnt werden: Dranbleiben, Selbstkontrolle, kleine Schritte, Neugier
   - Nicht belohnt: Richtige Antworten, Geschwindigkeit, Perfektion
   - Die Geschichte ist die einzige „Belohnung" – und die ist bedingungslos

### Geplante Funktionen (Phase 2+, noch nicht implementiert)

- Persistierung des Fortschritts (welcher Tag/Runde aktuell)
- Mehrere Storysets nach Klassenstufe/Thema
- Optionale Lehrkraft-Übersicht
- Optionale Eltern-Ansicht (Fortschrittsupdate)
- Animationen und sanfte Übergänge zwischen Seiten
- Vollständige 5-Kapitel-Geschichten für alle 5 Tage
- Illustrationen für Caspar und Lumi
- WCAG 2.1 AA Accessibility Audit

### Nicht vorgesehen / Bewusst ausgeschlossen

- Backend mit Benutzerverwaltung
- Datenbankzentralisierung
- Email-Benachrichtigungen
- Geplante Aufgaben (Cron-Jobs)
- Admin-Dashboard
- Eltern-/Lehrkraft-Bearbeitungsoberflächen
- Leistungsmessung oder Bewertung
- Social Features (Vergleich, Ranglisten)
- Echtzeit-Synchronisierung über mehrere Geräte

### Offene fachliche Entscheidungen

- **Speicherung des Fortschritts:** Lokal (Browser-Storage)? Oder sollte es ein einfaches Backend geben? (→ Blockiert Fortführung auf anderen Geräten)
- **Story-Variationen:** Sollen es Geschichten für verschiedene Klassenstufen geben oder 1 universelle Geschichte?
- **Illustrationen:** Beauftragte Künstler oder AI-generiert?
- **Offline-Modus:** Sollte die App auch ohne Internetverbindung funktionieren?

---

## 4. Vollständiger Anforderungskatalog

| ID | Anforderung | Kategorie | Status | Implementierung | Offene Punkte |
|----|----|-----------|--------|---|---|
| FR-01 | 8 verschiedene Seitentypen (Home, DayWelcome, RoundStart, Step1-4, Story) | Funktional | IMPLEMENTIERT | 8 JSX-Komponenten in `src/pages/` | – |
| FR-02 | Routing mit URL-Parametern (`:day`, `:round`, `:step`) | Funktional | IMPLEMENTIERT | React Router in `App.jsx` mit 8 Routes | – |
| FR-03 | Navigation zwischen Seiten ohne Neuladen | Funktional | IMPLEMENTIERT | React Router Link-Komponenten | – |
| FR-04 | Dynamische Grußmeldungen je nach Tag | Funktional | TEILWEISE IMPLEMENTIERT | Logik in DayWelcome.jsx, nur 2 Varianten (Tag 1 vs. andere) | Alle 5 Tage mit je eigenen Nachrichten |
| FR-05 | Statische Geschichtskapitel (5 Teile für Tag 1) | Funktional | IMPLEMENTIERT | Hard-coded Object `storyContent` in StoryPart.jsx | Nur Tag 1; Tage 2-5 fehlen |
| FR-06 | Charaktermeldungen (Lumi, Caspar) | Funktional | IMPLEMENTIERT | Text-Boxen mit Emoji + Spruch auf jeder Seite | Nur Text; keine Illustrationen |
| FR-07 | Große, berührungsfreundliche Buttons | UI | IMPLEMENTIERT | py-6, px-8, text-xl, 44px+ Tap-Ziel mit Tailwind | – |
| FR-08 | Große, lesbare Schrift (18–24px Anweisungen) | UI | IMPLEMENTIERT | text-xl, text-2xl, text-3xl je nach Seite | – |
| FR-09 | Responsive Design (375px, 768px, 1280px) | UI | IMPLEMENTIERT | Tailwind Grids, Flexbox, Responsive Utilities | Keine Breakpoint-Tests, nur Prototyp-Qualität |
| FR-10 | Farbcodierung der 4 Schritte | UI | IMPLEMENTIERT | Grün (Step1) → Gelb (Step2) → Lila (Step3) → Orange (Step4) | – |
| FR-11 | Ein Gedanke pro Bildschirm, kein Scrollen | UX | IMPLEMENTIERT | Jede Seite min-h-screen, Inhalte zentriert & gepackt | Nicht getestet mit sehr langem Text |
| FR-12 | Keine Punkte, Sterne, Timer, Ranglisten | UX | IMPLEMENTIERT | Bewusst nicht hinzugefügt | – |
| FR-13 | Charaktere sprechen ermutigend, nicht wertend | UX | IMPLEMENTIERT | Alle Lumi/Caspar-Sprüche nicht-evaluativ | Nicht alle Schritte haben Charakter-Spruch |
| NF-01 | Vite als Build-Tool mit Live Reload | Tech | IMPLEMENTIERT | vite.config.js, npm scripts | – |
| NF-02 | React 19 + React Router v7 | Tech | IMPLEMENTIERT | In App.jsx, main.jsx, Seiten-Komponenten | – |
| NF-03 | Tailwind CSS v4 ohne zusätzliche Abhängigkeiten | Tech | IMPLEMENTIERT | tailwind.config.cjs, src/index.css | – |
| NF-04 | Google Fonts (Lora + Poppins) | Tech | IMPLEMENTIERT | Link in index.html, Theme in tailwind.config.cjs | – |
| NF-05 | Keine npm-Abhängigkeiten (außer Plattform-Provided) | Tech | IMPLEMENTIERT | package.json ist leer | – |
| NF-06 | Statische Daten für Prototyp-Phase | Tech | IMPLEMENTIERT | Hard-coded Objects, keine Datenbank | Backend später notwendig |
| NF-07 | Deutsche Benutzeroberfläche | Localization | IMPLEMENTIERT | Alle Texte in Deutsch | Nur Deutsch, keine i18n-Infrastruktur |

---

## 5. Aktuell implementierter Funktionsumfang

### 1. Startseite (Home)
- **Datei:** `src/pages/Home.jsx`
- **Route:** `/`
- **Zweck:** Einstiegspunkt, Charaktere & 5er-Regel vorstellen
- **Benutzerinteraktion:** Ein großer Button zum Start → `/day/1/welcome`
- **UI:** Amber-Gradient, große Überschrift, Charakterkarten, Erklärkasten
- **Daten:** Statisch, keine Logik
- **Reifegrad:** Production-ready für Prototyp-Phase
- **Einschränkungen:** Keine Animationen, keine Fortschrittspeicherung

### 2. Täglicher Einstieg (DayWelcome)
- **Datei:** `src/pages/DayWelcome.jsx`
- **Route:** `/day/:day/welcome`
- **Zweck:** Tägliches Briefing, Schritt-Erklärung
- **Parameter:** `:day` (1–5)
- **Benutzerinteraktion:** Button → `/day/:day/round/1/start`
- **Besonderheit:** Dynamische Grußmeldung je nach Tag (2 Varianten: Tag 1 vs. andere)
- **UI:** Grün-Gradient, 5-Punkte-Erklärung der Schritte
- **Reifegrad:** Funktional, könnte 5 individuelle Nachrichten pro Tag haben (→ offene Anforderung)

### 3. Runden-Einstieg (RoundStart)
- **Datei:** `src/pages/RoundStart.jsx`
- **Route:** `/day/:day/round/:round/start`
- **Zweck:** Kind macht sich bereit, kleine Motivation vor Aufgaben
- **Parameter:** `:day`, `:round` (1–5)
- **Benutzerinteraktion:** Button → nächster Schritt
- **UI:** Blau-Gradient, Fortschritt-Anzeige (Runde X von 5)
- **Reifegrad:** Funktional

### 4–7. Die vier Aufgabenschritte (Step1–Step4)
- **Dateien:** `src/pages/Step1Check.jsx`, `Step2Write.jsx`, `Step3Control.jsx`, `Step4Underline.jsx`
- **Routes:** `/day/:day/round/:round/step/1|2|3|4`
- **Farben:** Grün (1) → Gelb (2) → Lila (3) → Orange (4)
- **Zweck:** Je Anweisung zum nächsten Aufgabenschritt
- **Parameter:** `:day`, `:round`
- **Benutzerinteraktion:** Button „Ich habe [Schritt X] erledigt" → nächster Schritt
- **Struktur:** Alle 4 folgen identischem Muster (Header + Anweisung + Charakter-Tipp + Button)
- **Reifegrad:** Funktional, statische Inhalte

### 8. Geschichtenkapitel (StoryPart)
- **Datei:** `src/pages/StoryPart.jsx`
- **Route:** `/day/:day/round/:round/story`
- **Zweck:** Belohnung nach 4 Schritten
- **Struktur:** `storyContent[day][round] = { title, text }`
- **Daten:** Tag 1 mit 5 Kapiteln hart-codiert
- **UI:** Indigo-Gradient, große Schrift (font-serif), Ermutigung, großzügig Weißraum
- **Navigation:** 
  - Runden 1–4 → nächste Runde
  - Runde 5 → nächster Tag
- **Reifegrad:** Funktional für Tag 1; Tage 2–5 müssen gefüllt werden

### Nicht-aktuell-genutzte Seiten
- **Landing.jsx:** Alte Variante, wird nicht geroutet, überschattet von Home.jsx
- **StoryView.jsx:** Alte Struktur, wird nicht geroutet

---

## 6. Seiten- und Navigationsstruktur

### Seiten-Übersicht (aktueller Stand)

```
NeuroQuest
├── Home (/)
│   └── Button → /day/1/welcome
├── Day Welcome (/day/:day/welcome)
│   └── Button → /day/:day/round/1/start
├── Round Start (/day/:day/round/:round/start)
│   ├── Button → /day/:day/round/:round/step/1
│   └── Link ← /day/:day/welcome
├── Step 1 – Check (/day/:day/round/:round/step/1)
│   └── Button → /day/:day/round/:round/step/2
├── Step 2 – Write (/day/:day/round/:round/step/2)
│   └── Button → /day/:day/round/:round/step/3
├── Step 3 – Control (/day/:day/round/:round/step/3)
│   └── Button → /day/:day/round/:round/step/4
├── Step 4 – Underline (/day/:day/round/:round/step/4)
│   └── Button → /day/:day/round/:round/story
└── Story Part (/day/:day/round/:round/story)
    └── Button →
        - Wenn round < 5: /day/:day/round/:round+1/start
        - Wenn round = 5: /day/:day+1/welcome
```

### Detaillierte Seiten-Dokumentation

| Seite | Route | Komponente | Status | Komponenten | Datenbedarf |
|-------|-------|-----------|--------|---|---|
| Home | `/` | Home.jsx | IMPLEMENTIERT | – | Statisch |
| Day Welcome | `/day/:day/welcome` | DayWelcomeWrapper → DayWelcome.jsx | IMPLEMENTIERT | – | :day Parameter |
| Round Start | `/day/:day/round/:round/start` | RoundStartWrapper → RoundStart.jsx | IMPLEMENTIERT | – | :day, :round Parameter |
| Step 1 | `/day/:day/round/:round/step/1` | Step1CheckWrapper → Step1Check.jsx | IMPLEMENTIERT | – | :day, :round Parameter |
| Step 2 | `/day/:day/round/:round/step/2` | Step2WriteWrapper → Step2Write.jsx | IMPLEMENTIERT | – | :day, :round Parameter |
| Step 3 | `/day/:day/round/:round/step/3` | Step3ControlWrapper → Step3Control.jsx | IMPLEMENTIERT | – | :day, :round Parameter |
| Step 4 | `/day/:day/round/:round/step/4` | Step4UnderlineWrapper → Step4Underline.jsx | IMPLEMENTIERT | – | :day, :round Parameter |
| Story | `/day/:day/round/:round/story` | StoryPartWrapper → StoryPart.jsx | IMPLEMENTIERT | – | :day, :round Parameter; storyContent[day][round] |

---

## 7. User Flows

### Flow 1: Erstes Treffen mit dem System

```
Kind öffnet App
    ↓
Home-Seite (Willkommen, Charaktere vorstellen, 5er-Regel erklärt)
    ↓
[Button: "Lass die Geschichte beginnen"]
    ↓
/day/1/welcome (Täglicher Einstieg, Schritt-Erklärung)
    ↓
[Button: "Lass uns anfangen!"]
    ↓
/day/1/round/1/start (Runde 1 von 5, Motivation)
    ↓
[Button: "Los geht's!"]
    ↓
/day/1/round/1/step/1 (Schritt 1: Satzende prüfen)
```

### Flow 2: Eine komplette Runde (5 Aufgaben = 1 Tag)

```
/day/1/round/1/start (Bereit?)
    ↓
/day/1/round/1/step/1 → step/2 → step/3 → step/4
    ↓
/day/1/round/1/story (Belohnung: Kapitel 1)
    ↓
[Button: "Nächste Runde"]
    ↓
/day/1/round/2/start (Runde 2 von 5)
    ↓
... (step/1 → 2 → 3 → 4 → story)
    ↓
[Nach Runde 5/story]
    ↓
/day/2/welcome (Nächster Tag)
```

### Flow 3: Über 5 Tage hinweg

```
Day 1
  Round 1: step 1→2→3→4 → story (Kapitel 1)
  Round 2: step 1→2→3→4 → story (Kapitel 2)
  Round 3: step 1→2→3→4 → story (Kapitel 3)
  Round 4: step 1→2→3→4 → story (Kapitel 4)
  Round 5: step 1→2→3→4 → story (Kapitel 5)
    ↓
Day 2/Welcome (neue Geschichte beginnt)
```

**Implementierter Stand:** Alle Flows sind navigationstechnisch vollständig navigierbar. Keine Backend-Blockaden, keine fehlenden Routes. Was fehlt: Persistierung (wo ist das Kind gerade?) und Geschichtskapitel für Tage 2–5.

---

## 8. Technische Architektur

### Architektur-Diagramm (Text)

```
┌─────────────────────────────────────────────────────────────┐
│                      Browser / Client                        │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                  React (StrictMode)                     │  │
│  │                                                          │  │
│  │  ┌─────────────────────────────────────────────────┐   │  │
│  │  │              React Router v7                     │   │  │
│  │  │  (8 Routes, dynamic params :day, :round, :step) │   │  │
│  │  │                                                  │   │  │
│  │  │  ├─ Home                                        │   │  │
│  │  │  ├─ DayWelcome (/:day)                         │   │  │
│  │  │  ├─ RoundStart (/:day/:round)                  │   │  │
│  │  │  ├─ Step1–4 (/:day/:round/:step)              │   │  │
│  │  │  └─ StoryPart (/:day/:round)                   │   │  │
│  │  │                                                  │   │  │
│  │  └─────────────────────────────────────────────────┘   │  │
│  │                                                          │  │
│  │  ┌─────────────────────────────────────────────────┐   │  │
│  │  │           Tailwind CSS v4 (Styling)            │   │  │
│  │  │  – Responsive Grid/Flexbox                      │   │  │
│  │  │  – Color Tokens (Amber, Green, Blue, etc.)     │   │  │
│  │  │  – Google Fonts (Lora, Poppins)                │   │  │
│  │  └─────────────────────────────────────────────────┘   │  │
│  │                                                          │  │
│  │  ┌─────────────────────────────────────────────────┐   │  │
│  │  │        Static Data (In-Memory Objects)          │   │  │
│  │  │  – storyContent[day][round]                    │   │  │
│  │  │  – Character Messages                           │   │  │
│  │  │  – Step Instructions                            │   │  │
│  │  └─────────────────────────────────────────────────┘   │  │
│  │                                                          │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘

        ↕ (No Backend – Client-Side Only)

┌─────────────────────────────────────────────────────────────┐
│                   Vite Dev Server (Dev)                     │
│                                                               │
│  – HMR (Hot Module Replacement)                             │
│  – Live Reload on File Changes                              │
│  – Build to dist/ for Production                            │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Schichten-Übersicht

**Frontend-Only Stack:**
1. **Presentation Layer:** React Components (JSX)
2. **Routing Layer:** React Router (URL ↔ Component)
3. **Styling Layer:** Tailwind CSS v4
4. **Data Layer:** Static Objects (JavaScript)
5. **Build Tool:** Vite
6. **Runtime:** Browser (ES6+, React 19)

**Keine Backend-Logik, keine API, keine Authentifizierung.**

---

## 9. Repository- und Verzeichnisstruktur

### Aktueller Verzeichnisbaum

```
/home/www/aibuilder-7dt69/
├── app/                           # ← PROJEKT-ROOT (Git Repository)
│   ├── src/
│   │   ├── pages/                 # 8+ Page Components
│   │   │   ├── Home.jsx           # Startseite (/), Production-ready
│   │   │   ├── DayWelcome.jsx     # Tag-Einstieg, Dynamisch
│   │   │   ├── RoundStart.jsx     # Runde-Einstieg
│   │   │   ├── Step1Check.jsx     # Schritt 1: Prüfen (Grün)
│   │   │   ├── Step2Write.jsx     # Schritt 2: Schreiben (Gelb)
│   │   │   ├── Step3Control.jsx   # Schritt 3: Kontrollieren (Lila)
│   │   │   ├── Step4Underline.jsx # Schritt 4: Unterstreichen (Orange)
│   │   │   ├── StoryPart.jsx      # Geschichtskapitel (Indigo)
│   │   │   ├── Landing.jsx        # UNGENUTZT (alte Variante)
│   │   │   └── StoryView.jsx      # UNGENUTZT (alte Variante)
│   │   ├── App.jsx                # Router-Setup, 8 Routes
│   │   ├── main.jsx               # Entry Point (React 19 + StrictMode)
│   │   └── index.css              # Tailwind @import + @config
│   ├── public/
│   │   └── favicon.svg            # Placeholder-Icon
│   ├── dist/                      # BUILD OUTPUT (committed)
│   │   ├── index.html             # Built HTML (vite-injected)
│   │   └── assets/
│   │       ├── index-C7D2N7nn.js  # Bundled React Code (~306 KB)
│   │       └── index-BTWAhu49.css # Bundled Tailwind Styles (~26 KB)
│   ├── index.html                 # Source HTML Template
│   ├── tailwind.config.cjs        # Tailwind Config (Lora + Poppins)
│   ├── vite.config.js             # Vite Config (platform-based)
│   ├── package.json               # Empty (no dependencies)
│   ├── package-lock.json          # Lock file (empty deps)
│   ├── AGENTS.md                  # Platform Standards
│   └── NEUROQUEST_ARCHITECTURE.md # Design Documentation
├── static/                        # ← STATIC FILES (empty, for assets)
├── uploads/                       # ← USER UPLOADS (empty, for exchange)
├── logs/
│   ├── vite_build.log            # Build logs
│   ├── vite_console.log          # Browser console logs
│   └── assistant-start.log
└── docs/
    └── handover/
        └── PROJECT_HANDOVER.md    # ← DU LIEST DIES
```

### Verantwortlichkeiten der Verzeichnisse

| Verzeichnis | Verantwortung | Kommentar |
|-------------|---|---|
| `app/src/pages/` | Alle 8+ Seiten-Komponenten | Jede JSX-Datei = 1 Route |
| `app/src/App.jsx` | Router-Konfiguration | Routes, Wrapper, basename setup |
| `app/index.html` | HTML-Template, Meta, Fonts | Lora + Poppins Link, title, lang="de" |
| `app/tailwind.config.cjs` | Farben, Typographie, Theme | Definiert serif (Lora) + sans (Poppins) |
| `app/dist/` | Production Build (committed) | Output von `vite build --mode preview` |
| `static/` | Statische Assets (nur Bilder) | Leer; vorgesehen für zukünftige hero images |
| `uploads/` | User-Upload Exchange | Leer; nicht direkt vom App genutzt |
| `docs/handover/` | Übergabe-Dokumentation | Dieses Dokument |

---

## 10. Datenbank

**Status: NICHT VORHANDEN**

Das System arbeitet aktuell völlig ohne Datenbank oder Backend-Persistierung.

### Was fehlt (für Phase 2+)

Um Fortschritt zu speichern (z. B. „Kind ist aktuell bei Tag 2, Runde 3"), wird eine Speicherung benötigt:

**Option A: Browser-Local Storage (Client-Side)**
- Speichert lokal im Browser
- Keine Backend-Anforderungen
- Funktioniert nicht geräteübergreifend
- Einfach zu implementieren

**Option B: Backend (z. B. PocketBase, Firebase)**
- Zentrale Speicherung
- Funktioniert auf allen Geräten
- Braucht Authentifizierung
- Komplexer

**Aktueller Stand:** Keine Persistierung, d. h. beim Neuladen oder auf neuem Device beginnt es wieder bei Home.

---

## 11. API und Schnittstellen

**Status: KEINE APIs**

Das System macht keine externen oder internen HTTP-Requests.

Alle Daten sind statisch im JavaScript hinterlegt.

| Methode | Endpoint | Status | Begründung |
|---------|----------|--------|-----------|
| – | – | NICHT VORHANDEN | Frontend-Only Prototyp |

### Für Phase 2+ geplant (falls ein Backend nötig wird)

Falls Fortschrittes-Persistierung und Benutzerverwaltung kommen:
- POST `/api/progress` – Update Fortschritt (welcher Tag/Runde)
- GET `/api/stories/:day` – Hole Story-Kapitel nach Tag
- POST `/api/auth/login` – (Optional) Login
- GET `/api/user` – (Optional) Benutzerangaben

---

## 12. Fachliche Geschäftslogik

### Zentrale Logik: Navigationsfluss

**Regel 1: Die 5er-Struktur**
```javascript
// Pseudo-Code für Logik
ForEach day in 1..5:
  ForEach round in 1..5:
    Do step 1, 2, 3, 4
    Then story[day][round]
  End round
End day
```

**Implementierung:** In `StoryPart.jsx`
```javascript
const isLastRound = round === 5;
const nextLink = isLastRound 
  ? `/day/${parseInt(day) + 1}/welcome`  // Wenn Runde 5: nächster Tag
  : `/day/${day}/round/${round + 1}/start`; // Sonst: nächste Runde
```

### Zentrale Logik: Dynamische Meldungen

**In DayWelcome.jsx:**
```javascript
const isFirstDay = day === 1;
const greeting = isFirstDay
  ? "Willkommen zu NeuroQuest!"
  : `Tag ${day} wartet auf dich`;
```

→ **Derzeit nur 2 Varianten.** Offene Anforderung: 5 unterschiedliche Grußmeldungen pro Tag.

### Zentrale Logik: Geschichtskapitel

**In StoryPart.jsx:**
```javascript
const storyContent = {
  1: {
    1: { title: "...", text: "..." },
    2: { title: "...", text: "..." },
    3: { title: "...", text: "..." },
    4: { title: "...", text: "..." },
    5: { title: "...", text: "..." }
  }
  // Tag 2–5 fehlen
};
```

→ **Nur Tag 1 gefüllt.** Offene Anforderung: 20 Geschichtskapitel schreiben (4 pro Tag für Tage 2–5).

### Logik: Parameter-Übergabe

Alle Seiten bekommen `:day` und `:round` via URL-Parametern. Wrapper-Komponenten konvertieren zu parseInt:
```javascript
function Step1CheckWrapper() {
  const { day, round } = useParams();
  return <Step1Check day={parseInt(day) || 1} round={parseInt(round) || 1} />;
}
```

→ Fallback auf 1, falls URL-Parameter undefined.

---

## 13. Authentifizierung, Rollen und Berechtigungen

**Status: NICHT VORHANDEN**

Keine Benutzerkonten, keine Rollen, keine Zugriffskontrolle.

Die App ist öffentlich und erfordert keine Anmeldung.

Alle Kinder sehen dieselbe Oberfläche und dieselben Inhalte.

### Für Phase 2+ überdenkt (optional)

Falls später Lehrkraft-Übersicht oder Eltern-Benachrichtigungen nötig werden:
- Optional: einfache Schüler-IDs (z. B. Namens-Cookie)
- Nicht: zentrale Authentifizierung (der Fokus liegt auf dem Kind, nicht auf Verwaltung)

---

## 14. Konfiguration und Umgebungen

### Development-Umgebung

**Vite Dev Server:**
```bash
cd app
npm run dev
# → läuft auf http://localhost:5173 (typical)
# → HMR enabled
# → Hot Reload bei File Changes
```

**Dateien im Dev-Modus:**
- `src/App.jsx` – live editierbar
- `src/pages/*.jsx` – live editierbar
- `index.html` – live editierbar
- `tailwind.config.cjs` – live-reloadbar
- `src/index.css` – live-reloadbar

### Production/Preview-Build

```bash
cd app
npm run build       # → vite build --mode preview
npm run build:prod  # → vite build (standard)
```

**Ausgabe:** `dist/` Verzeichnis, committed ins Git.

### Environment Variables

**Status: KEINE**

Das System benötigt keine .env Variablen. Alles ist statisch/hart-codiert.

Falls später ein Backend kommt (Phase 2+):
- `VITE_API_URL` – Backend-Base-URL
- Andere Secrets gehören NICHT ins Frontend!

### Build-Konfiguration

**vite.config.js:**
```javascript
import { defineConfig } from "/usr/lib/sfs-assistant-dev/platform-config.js";
export default defineConfig({});
```

→ Platform-basierte Konfiguration. Details in `/usr/lib/sfs-assistant-dev/`.

**tailwind.config.cjs:**
```javascript
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

---

## 15. Externe Abhängigkeiten

| Dependency | Version | Status | Herkunft |
|------------|---------|--------|----------|
| React | 19.x | Platform-Provided | Runtime |
| React DOM | 19.x | Platform-Provided | Runtime |
| React Router | 7.x | Platform-Provided | Runtime |
| Vite | 6.4.3 | Platform-Provided | Build Tool |
| @vitejs/plugin-react | Latest | Platform-Provided | Vite Plugin |
| Tailwind CSS | v4 | Platform-Provided | CSS Engine |
| tailwind-merge | Latest | Platform-Provided | Utility |
| lucide-react | Latest | Platform-Provided | Icon Library (nicht aktuell genutzt) |
| pocketbase | Latest | Platform-Provided | (nicht aktuell genutzt; für Phase 2+) |

**Wichtig:** Keine `npm install` durchführen! Alle Abhängigkeiten sind bereits im System verfügbar.

### Fonts (externe Services)

**Google Fonts via Platform-Link:**
```html
<link vite-ignore rel="stylesheet" href="/.sfs/css2?family=Lora:wght@400;600&family=Poppins:wght@400;600;700&display=swap" />
```

→ Wird von der Platform served (nicht npm).

---

## 16. Bereits erledigte Entwicklungsaufgaben

| Aufgabe | Ergebnis | Status | Nachweis |
|---------|----------|--------|----------|
| Projektstruktur aufsetzen (Vite + React) | app/ mit src/, dist/, config | IMPLEMENTIERT | git init, package.json, vite.config.js |
| 8 Seiten-Komponenten erstellen | Home, DayWelcome, RoundStart, Step1–4, StoryPart | IMPLEMENTIERT | src/pages/*.jsx (9 Dateien, 2 davon ungenutzt) |
| React Router mit 8 Routes aufsetzen | Alle Routes konfiguriert, dynamische Parameter | IMPLEMENTIERT | App.jsx mit routes Array |
| Farbschema definieren | 5 Farben (Amber, Grün, Blau, Lila, Orange, Indigo) | IMPLEMENTIERT | Jede Seite hat eigene bg-gradient |
| Responsive Design (3 Breakpoints) | Tailwind Grid/Flex responsive | IMPLEMENTIERT (Prototyp-Qualität) | Alle Komponenten mit responsive Utilities |
| Typography (Google Fonts) | Lora + Poppins integriert | IMPLEMENTIERT | index.html Link + tailwind.config |
| Große Buttons, große Schrift | Alle Buttons 44px+, Schrift 18–24px | IMPLEMENTIERT | py-6 px-8 text-xl, text-2xl, text-3xl |
| Charaktere-Sprüche (Lumi, Caspar) | Auf jeder Seite 1+ Charakter-Box | IMPLEMENTIERT | Character-Boxen mit Emoji + Text |
| Story für Tag 1 schreiben | 5 Kapitel für Runden 1–5 | IMPLEMENTIERT (nur Tag 1) | storyContent[1][1..5] in StoryPart.jsx |
| Seiten-Struktur-Dokumentation | NEUROQUEST_ARCHITECTURE.md | IMPLEMENTIERT | Detaillierte Design-Doku |
| Git Setup & Initial Commit | 2 Commits (skeleton, arch) | IMPLEMENTIERT | git log zeigt c84df8a und 64f7e90 |

---

## 17. Teilweise erledigte Arbeiten

| Arbeit | Ursprüngliches Ziel | Umgesetzt | Fehlend | Dateien |
|--------|---|---|---|---|
| Geschichtskapitel pro Seite | 25 Kapitel (5 Tage × 5 Runden) | 5 (nur Tag 1) | 20 (Tage 2–5) | StoryPart.jsx / storyContent |
| Tägliche Grußmeldungen | 5 unterschiedliche Meldungen pro Tag | 2 Varianten (Tag 1 vs. andere) | 3 weitere + Individualisierung pro Tag | DayWelcome.jsx |
| Illustrationen | Caspar & Lumi visuelle Darstellung | Nur Emoji (👦, ✨) | Vollständige Illustrationen oder Icons | Keine Dateien (hätte in static/ sein sollen) |

---

## 18. Offene Anforderungen und Backlog

### P0 – Blockierend / Kritisch

Derzeit keine P0-Items; das System ist navigierbar.

### P1 – Notwendig für nächsten funktionsfähigen Stand

| ID | Beschreibung | Grund | Abhängigkeiten | Ergebnis | Akzeptanzkriterien |
|----|----|---|---|---|---|
| P1-01 | Geschichtskapitel für Tage 2–5 schreiben | Nur Tag 1 hat Inhalte; Kind sieht leere Stories | 5 neue Story-Objekte | storyContent[2..5][1..5] gefüllt | 20 Kapitel à 2–3 Absätze, konsistente Erzählung, keine Datenbank-Abhängigkeit |
| P1-02 | Tägliche Grußmeldungen individualisieren | Aktuell nur 2 Varianten; sollten 5 verschiedene Grüße pro Tag sein | DayWelcome.jsx | Logik für alle 5 Tage + individuelle Sprüche | 5 verschiedene Nachrichten, Tag 1–5 korrekt zugeordnet |
| P1-03 | Responsive Design testen & fixen | Design ist Prototyp-Qualität, nicht vollständig getestet | Browser-Testing | Fix für mobile-Probleme (falls vorhanden) | Kein Scrollen / Clipping bei 375px, 768px, 1280px |

### P2 – Wichtig

| ID | Beschreibung | Grund | Ergebnis | Akzeptanzkriterien |
|----|----|---|---|---|
| P2-01 | Sanfte Übergänge / Animationen | Story-Gefühl vermitteln, nicht abrupt wirken | Fade-In, Slide-Transitions | CSS keyframes oder Framer Motion, keine Ruckel |
| P2-02 | Charakter-Illustrationen (Caspar & Lumi) | Nur Emoji sind unpersönlich | SVG oder PNG in static/ | Illustrationen zu den 4 Schritten passen, Kinderbuch-Ästhetik |
| P2-03 | Fortschritt-Persistierung (Browser) | Kind kann wo anders weitermachen | localStorage API | Speichert `currentDay`, `currentRound`; beim Reload wieder dort |
| P2-04 | Fehlerbehandlung & Fallbacks | Robustheit erhöhen | Try-catch / fehlerhafte URLs | Auf 404 zur Home-Seite; auf ungültige :day/:round fallback |

### P3 – Später / Optional

| ID | Beschreibung | Begründung |
|----|----|---|
| P3-01 | Backend für Fortschritts-Speicherung | Nur nötig, wenn Schule mehrere Geräte hat |
| P3-02 | Lehrkraft-Dashboard | Nur nötig, wenn Lehrer Überblick brauchen |
| P3-03 | Mehrsprachigkeit (i18n) | Aktuell nur Deutsch; optional später |
| P3-04 | Dark Mode | Nicht geplant; Hellmodus reicht |
| P3-05 | Offline-Mode | Progressive Web App (PWA) – später |

---

## 19. Bekannte Fehler und technische Schulden

| Fehler | Ursache | Auswirkung | Workaround | Priorität | Lösung |
|--------|--------|-----------|-----------|-----------|---------|
| Alte Komponenten nicht gelöscht | Landing.jsx, StoryView.jsx vorhanden aber ungenutzt | Verwirrt beim Durchschauen; Dead Code | Sie werden ignoriert (nicht in Routes) | P3 | Löschen |
| Keine Error Boundary | React Error Boundary nicht implementiert | Weißer Bildschirm bei Fehler | Aktuell nicht nötig (statische Daten) | P2 | React.lazy + Suspense + Error Boundary |
| Keine Unit Tests | Keine Test-Infrastruktur | Keine QA-Abdeckung | Manual Testing | P2 | Vitest + React Testing Library aufsetzen |
| Browser-History nicht optimiert | Router-Browserhistory funktioniert, aber ohne spezielle Logs | Debugging von User-Flows schwer | User Reports | P3 | Analytics / Sentry |
| Hardcoded URLs in Links | React Router Links sind hart-codiert | Bei URL-Struktur-Änderung Update nötig | Aktuell kein Problem (Struktur stabil) | P3 | Zentrale Route-Konstanten |
| Keine Loading States | Statische Daten, aber kein Ladezustand | Falls später API kommt, wird es Probleme geben | N/A | P1 (für Phase 2) | Skeleton Screens, Loading Spinners |
| Keine Keyboard Navigation | Nur Mouse/Touch | A11y-Problem für Tastaturen | Tab-Focus funktioniert trotzdem (HTML semantisch OK) | P2 | Explicit tabindex, Arrow Keys, Enter-Handling |

### Technische Schulden

| Schuld | Beschreibung | Aufwand | Empfohlener Zeitpunkt |
|--------|---|---|---|
| Farbenkonstanten | Colors sind als Tailwind-Strings verstreut | 2–3h | Mit Phase 2 |
| Story-Daten-Struktur | storyContent als JS-Objekt; sollte später aus DB kommen | 5h | Wenn P2-03 kommt |
| Komponenten-Größe | StoryPart.jsx könnte aufgeteilt werden | 1h | Mit P2-02 (Animationen) |
| Test-Infrastruktur | Null | 4h | Mit Phase 2 |

---

## 20. Getroffene Architektur- und Entwicklungsentscheidungen

### Entscheidung 1: React Router Wrapper-Pattern

**Entscheidung:**
```javascript
function Step1CheckWrapper() {
  const { day, round } = useParams();
  return <Step1Check day={parseInt(day) || 1} round={parseInt(round) || 1} />;
}
```

**Hintergrund:** URL-Parameter als Props an Komponenten übergeben, um sie „kontrollierter" zu machen.

**Gewählte Lösung:** Wrapper-Komponenten für jede parametrisierte Route.

**Alternativen:**
- Komponenten direkt in Routes → müssten selbst `useParams()` aufrufen
- Redux / Context für State → overengineering für statische App

**Konsequenzen:**
- ✅ Komponenten sind wiederverwendbar (TestContainer kann Props direkt geben)
- ⚠️ Ein wenig verbose (8 Wrapper), aber lesbar
- ✅ Clear data flow

### Entscheidung 2: Farbcodierung statt Prozentbalken

**Entscheidung:** Jeden Schritt mit anderer Farbe (Grün → Gelb → Lila → Orange).

**Hintergrund:** Kinder mit ADHS können visuellen Fortschritt besser erfassen als numerische Prozentsätze.

**Gewählte Lösung:** Farbe = Position im Prozess.

**Alternativen:**
- Prozentbalken (Standard, aber emotionslos)
- Sterne (widerspricht „keine Belohnung")
- Kleine Icons (zu klein für schnelle Orientierung)

**Konsequenzen:**
- ✅ Intuitive visuelle Sprache
- ✅ Kinderbuch-Ästhetik
- ⚠️ Nicht optimiert für Farbenblindheit (könnte Icons als Zusatz haben)

### Entscheidung 3: Statische Story statt Backend

**Entscheidung:** Geschichtskapitel als JavaScript-Objekte hart-codiert.

**Hintergrund:** Phase 1 ist ein Prototyp, kein Production System. Backend braucht Authentifizierung, Datenbank-Schema, Hosting.

**Gewählte Lösung:** `storyContent[day][round] = { title, text }` in StoryPart.jsx.

**Alternativen:**
- Backend mit PocketBase / Firebase (zu early, requirements unclear)
- CMS (overkill für 25 Kapitel)
- External JSON (noch immer kein Backend, aber wartbar)

**Konsequenzen:**
- ✅ Schnelle Prototyping
- ✅ Keine externe Abhängigkeiten
- ⚠️ Nicht skalierbar für große Story-Sammlungen
- ⚠️ Müssen später auf Backend migrieren

### Entscheidung 4: Keine Authentifizierung / Benutzerkonten

**Entscheidung:** App ist anonym, kein Login, kein Fortschritts-Speicherung.

**Hintergrund:** Anforderung sagt: „Schritt 1 = Seitenstruktur". Authentifizierung ist Phase 2+.

**Gewählte Lösung:** Nur URL-basierte Navigation (stateless).

**Alternativen:**
- OAuth / Simple Email-Login (Early requirement creep)
- Browser LocalStorage (möglich, aber nicht im Scope)

**Konsequenzen:**
- ✅ Keine Backend-Komplexität
- ✅ Schnelle Entwicklung
- ⚠️ Kein Fortschritt-Speicherung (Reload = Neustart)
- ⚠️ Kind kann nicht „wo anders" weitermachen

### Entscheidung 5: Tailwind v4 (nicht v3)

**Entscheidung:** Platform bietet Tailwind v4; nutzen wir.

**Hintergrund:** v4 ist neuere Syntax, v3 veraltet.

**Gewählte Lösung:** `@import "tailwindcss"` statt `@tailwind` directives.

**Konsequenzen:**
- ✅ Modern, zukunftssicher
- ⚠️ Wenige Utilities renamed (`shadow` → `shadow-sm`)
- ⚠️ Dokumentation noch nicht vollständig

### Entscheidung 6: Deutsch als einzige Sprache

**Entscheidung:** Alle Inhalte in Deutsch; keine i18n-Infrastruktur.

**Hintergrund:** Anforderung: Deutschsprachige Grundschule.

**Konsequenzen:**
- ✅ Einfach, schnell
- ⚠️ Nicht erweiterbar auf andere Sprachen
- ⚠️ Müssten später i18n (z. B. i18next) einbauen

---

## 21. Offene Entscheidungen

| Fragestellung | Warum relevant | Betroffene Bereiche | Mögliche Optionen | Blockiert durch |
|---|---|---|---|---|
| **Persistierung-Strategie** | Wo speichert sich der Fortschritt (Tag/Runde)? | Alle Seiten (Routing, State) | LocalStorage vs. Backend | Anforderung für Phase 2 |
| **Story-Struktur für Tage 2–5** | Ist es 1 Geschichte über 5 Tage oder 5 separate Geschichten? | StoryPart.jsx, Story Content | Fortlaufende Erzählung vs. Episodisch | Inhalts-Design |
| **Illustrationen** | Beauftragte Künstler oder AI-generiert? | static/, Design-Budget | Professional Illustration vs. FLUX/Midjourney | Budget-Entscheidung |
| **Offline-Funktionalität** | Soll App ohne Internet funktionieren? | Vite Build, Service Worker | PWA vs. nur online | Anforderung nach Testing |
| **Klassenstufen-Varianten** | Unterschiedliche Schwierigkeit pro Klasse? | storyContent, UI Text | 1 universelle Version vs. 4 Varianten (Klasse 1–4) | Content-Umfang |
| **Backend-Technologie (Phase 2)** | Wenn Backend kommt: PocketBase vs. Firebase vs. Custom API? | Alle Schichten | PocketBase (simple) vs. Firebase (managed) vs. Node+DB (custom) | Entscheidung mit Client |

---

## 22. Tests und Qualitätssicherung

**Status: KEINE TESTS VORHANDEN**

### Vorhandene Test-Infrastruktur

- `vitest`: Framework auf Platform verfügbar, aber nicht konfiguriert
- `@testing-library/react`: Library verfügbar, aber nicht genutzt
- Keine Test-Files (`*.test.jsx`, `*.spec.jsx`)
- Keine CI/CD Pipeline

### Manuelle Tests (informal durchgeführt)

- ✅ Dev-Server läuft ohne Fehler
- ✅ Alle 8 Routes sind navigierbar
- ✅ React StrictMode double-rendering verursacht keine Error
- ✅ Buttons funktionieren, navigieren zur richtigen Seite
- ⚠️ Responsive Design (3 Breakpoints) nicht systematisch getestet
- ⚠️ Tastaturnav nicht getestet
- ⚠️ Screenreader-Kompatibilität nicht getestet

### Bekannte Test-Lücken

| Lücke | Kritikalität | Lösung |
|------|---|---|
| Keine Unit Tests | P2 | Vitest + RTL für jede Komponente |
| Keine E2E Tests | P2 | Cypress oder Playwright für User Flows |
| Keine A11y Tests | P2 | axe-core oder Pa11y |
| Keine Performance Tests | P3 | Lighthouse CI |
| Keine Visual Regression Tests | P3 | Percy oder Chromatic |

---

## 23. Deployment und Betrieb

### Deployment-Prozess (aktuell)

```
app/ (Git Repo)
  ↓
[Entwickler editiert src/, index.html, tailwind.config]
  ↓
npm run build:prod
  ↓
dist/ wird aktualisiert & committed
  ↓
Platform zieht dist/ in live-Server
  ↓
https://deine-url.ionos.de/ zeigt den Inhalt
```

### Zielverzeichnisse

| Umgebung | Path | Beschreibung |
|---|---|---|
| Dev | `http://localhost:5173` | Lokale Vite Dev Server (HMR) |
| Preview | `https://[subdomain]-preview.ionos.de/` | Build-Preview (aus `dist/`) |
| Live | `https://[subdomain].ionos.de/` | Production (aus `dist/`) |

### Build-Schritte

```bash
cd /home/www/aibuilder-7dt69/app

# Dev-Server (mit HMR)
npm run dev

# Preview-Build (vite build --mode preview)
npm run build

# Production-Build (standard vite build)
npm run build:prod

# Output
→ dist/index.html
→ dist/assets/index-[HASH].js
→ dist/assets/index-[HASH].css
→ dist/favicon.svg
```

### Besonderheiten

1. **vite-ignore Attribut:** In `index.html` hat der Fonts-Link `vite-ignore`, um nicht vom Dev-Server rewritten zu werden.
2. **Base-Href:** `<base href="/">` wird bei Build automatisch eingefügt.
3. **Committed dist/:** Der `dist/`-Ordner ist committet und wird von der Platform direkt served.

### Rollback (falls nötig)

```bash
cd /home/www/aibuilder-7dt69/app
git log --oneline
# Letzten Commit identifizieren
git checkout [COMMIT_ID] -- dist/
git add dist/
git commit -m "Rollback to [COMMIT_ID]"
```

---

## 24. Risiken

| Risiko | Auswirkung | Wahrscheinlichkeit | Gegenmaßnahme | Priorität |
|--------|-----------|---|---|---|
| **Story für Tage 2–5 nicht rechtzeitig geschrieben** | App ist funktional, aber leer | Mittel (content creation overhead) | Schreiben als P1-Task planen | P1 |
| **Responsive Design bricht bei unerwarteten Viewport-Größen** | Ältere Tablets, Foldables | Niedrig (3 Breakpoints getestet) | Durchgängig testen (375, 768, 1280) | P2 |
| **Browser-Kompatibilität (alte Safari, IE)** | Einige Kinder nutzen alte Tablets | Niedrig (Modern React) | Test auf iOS Safari 12+, Android Chrome 70+ | P2 |
| **Tastaturnav für blinde/motorische Kids | Accessibility-Verstoß | Niedrig (war nicht in Phase 1) | WCAG 2.1 AA Audit für Phase 2 | P2 |
| **React StrictMode double-rendering erzeugt unerwartetes Verhalten** | Seiteneffekte, Bug-Reports | Sehr niedrig (statische Komponenten) | Tests mit Effekt-Hooks sobald welche kommen | P3 |
| **Platform-Ausfallzeit (Hosting)** | App nicht erreichbar | Sehr niedrig | Monitoring einrichten, SLA prüfen | P3 |

---

## 25. Empfohlene nächste Entwicklungsschritte

### Phase 1b – Stories & Polish (1–2 Wochen)

**Schritt 1.1: Geschichtskapitel für Tage 2–5 schreiben**
- **Aufgabe:** 20 Kapitel (4 pro Tag für Tage 2–5) schreiben à 2–3 Absätze
- **Ziel:** Kontinuierliche Erzählung über alle 5 Tage, konsistent mit Tag 1
- **Dateien:** `src/pages/StoryPart.jsx` → storyContent-Objekt erweitern
- **Voraussetzung:** Content-Plan (Handlung pro Tag)
- **Akzeptanzkriterium:** storyContent[2..5][1..5] alle gefüllt, keine leeren Stories

**Schritt 1.2: Tägliche Grußmeldungen individualisieren**
- **Aufgabe:** 5 verschiedene Grüße für Tage 1–5 schreiben
- **Ziel:** DayWelcome fühlt sich persönlich an, nicht kopiert
- **Dateien:** `src/pages/DayWelcome.jsx` → Logik für alle 5 Tage
- **Akzeptanzkriterium:** `day === 1|2|3|4|5` → je eigene Meldung

**Schritt 1.3: Responsive Design validieren**
- **Aufgabe:** Auf 375px, 768px, 1280px testen
- **Tool:** Browser DevTools oder physische Geräte
- **Ziel:** Kein Scrollen, kein Clipping auf kleinen Screens
- **Dateien:** Alle JSX + index.html
- **Akzeptanzkriterium:** Alle 8 Seiten auf 3 Breakpoints OK

### Phase 2 – Persistierung & Animationen (2–3 Wochen)

**Schritt 2.1: Fortschritt im LocalStorage speichern**
- **Aufgabe:** `currentDay`, `currentRound` speichern & laden
- **Dateien:** `App.jsx` + neue Hook `useProgress.js`
- **Logik:** Bei Route-Wechsel speichern; beim Mount laden
- **Akzeptanzkriterium:** Reload-Test: App merkt sich Position

**Schritt 2.2: Sanfte Übergänge zwischen Seiten**
- **Aufgabe:** Fade-In / Slide-Transitions hinzufügen
- **Tool:** CSS Transitions oder Framer Motion
- **Dateien:** `src/index.css` + oder Komponenten-Wrappers
- **Akzeptanzkriterium:** 300ms Transition, kein Ruckel

**Schritt 2.3: Charakter-Illustrationen (optional)**
- **Aufgabe:** Caspar & Lumi zeichnen oder generieren
- **Output:** SVG/PNG in `static/`
- **Integration:** In Character-Boxen zeigen
- **Akzeptanzkriterium:** Kinderbuch-Ästhetik, konsistent

### Phase 3 – Backend & Verwaltung (4+ Wochen)

**Schritt 3.1: Backend aufsetzen (falls gewünscht)**
- **Option A:** PocketBase mit Collections für Stories & Progress
- **Option B:** Firebase Realtime DB
- **Dateien:** `src/services/api.js` + neue Backend-Endpunkte
- **Akzeptanzkriterium:** API-Tests bestehen

**Schritt 3.2: Lehrkraft-Dashboard (optional)**
- **Aufgabe:** Übersichtpage für Lehrkräfte (Schüler, Fortschritt)
- **Dateien:** Neue Route `/teacher` + TacherDashboard.jsx
- **Akzeptanzkriterium:** Zeigt alle Schüler + aktuelle Position

---

## 26. Einstiegspunkt für die nächste KI

### Was MUSS zuerst gelesen werden?

1. **Dieses Dokument** (PROJECT_HANDOVER.md)
2. **app/NEUROQUEST_ARCHITECTURE.md** – Design-Philosophie
3. **app/AGENTS.md** – Platform-Constraints
4. **app/src/App.jsx** – Router-Struktur
5. **app/src/pages/Home.jsx** – Beispiel-Komponente

### Welche Dateien sind besonders wichtig?

| Datei | Wichtigkeit | Grund |
|-------|---|---|
| `app/src/App.jsx` | 🔴 Kritisch | Alle Routes konfiguriert hier |
| `app/src/pages/StoryPart.jsx` | 🔴 Kritisch | Geschichtskapitel-Struktur |
| `app/tailwind.config.cjs` | 🟠 Wichtig | Theme + Fonts |
| `app/index.html` | 🟠 Wichtig | Meta, Title, Fonts-Link |
| `app/src/pages/*.jsx` | 🟠 Wichtig | UI-Komponenten |
| `app/NEUROQUEST_ARCHITECTURE.md` | 🟡 Hilfreich | Design-Context |

### Was darf NICHT ohne Prüfung verändert werden?

- ⛔ **App.jsx Routes:** Änderungen hier können ganze Navigation kaputt machen
- ⛔ **Die 5er-Regel:** Das ist die zentrale fachliche Anforderung
- ⛔ **Character-Voice:** Caspar & Lumi dürfen nicht wertend sprechen (kein „Richtig!", kein Leistungs-Feedback)
- ⛔ **Farb-Zuordnung der Schritte:** Grün (1) → Gelb (2) → Lila (3) → Orange (4) sind Teil des Designs
- ⛔ **Responsive-Breakpoints:** Mobile-First bei 375px ist Anforderung für neurodivergente Kinder

### Was ist der nächste empfohlene Arbeitsschritt?

**Sofort (P1):**
1. Geschichtskapitel für Tage 2–5 schreiben (20 Kapitel)
2. DayWelcome mit 5 individuellen Grüßen ausstatten
3. Responsive Design auf 3 Breakpoints testen

**Danach (P2):**
4. LocalStorage-Persistierung für Fortschritt
5. Sanfte Übergänge (Fade-In, Slide)
6. Charakter-Illustrationen (Caspar & Lumi)

### Welche offenen Entscheidungen müssen respektiert werden?

- **Fortschritts-Persistierung:** LocalStorage vs. Backend? (Klärt mit Client)
- **Story-Kontinuität:** 1 Geschichte über 5 Tage oder 5 separate? (Content-Design)
- **Illustrationen:** Professional Artist oder AI-generiert? (Budget)
- **Backend-Phase:** Timing & Technologie für Phase 3 (Roadmap)

### Wie kann die KI prüfen, dass ihre Änderung funktioniert?

1. **Dev-Server starten:**
   ```bash
   cd app
   npm run dev
   ```

2. **Visuelles Testen:**
   - Alle 8 Seiten durchklicken
   - Buttons funktionieren?
   - Navigation korrekt?
   - Responsive (F12 DevTools)

3. **Build-Test:**
   ```bash
   npm run build:prod
   # Prüfen: dist/ ist aktuell, kein Build-Fehler
   ```

4. **Git-Workflow:**
   ```bash
   git status          # Welche Dateien geändert?
   git diff            # Diffs prüfen
   git add .
   git commit -m "feat: [Beschreibung]"
   git log --oneline   # Commit-History prüfen
   ```

5. **Logs prüfen:**
   - `logs/vite_build.log` – Build-Fehler?
   - `logs/vite_console.log` – Runtime-Fehler?

---

## 27. Unsicherheiten und fehlende Informationen

### Was konnte nicht vollständig bestimmt werden?

1. **Exakte Breakpoint-Größen**
   - Dokumentiert: 375px (mobile), 768px (tablet), 1280px (desktop)
   - Ungeklärt: Sind das feste Breakpoints oder „best guess"? Gibt es ein Figma-Design?

2. **Vollständige Story-Handlung**
   - Dokumentiert: Tag 1 hat 5 Kapitel
   - Ungeklärt: Was sind die Kapitel-Titel und -Inhalte für Tage 2–5? Gibt es ein Story-Outline?

3. **Zielgruppen-Klassifizierung**
   - Dokumentiert: Klasse 1–4, besonders für ADHS/Autismus
   - Ungeklärt: Sollen unterschiedliche Versionen pro Klasse existieren oder 1 universelle?

4. **Schulbuch-Integration**
   - Dokumentiert: App kennt die Sätze NICHT; sie sind im Schulbuch
   - Ungeklärt: Welche Schulbücher werden adressiert? Gibt es Integrations-Partner?

5. **Deployment-Details**
   - Dokumentiert: Platform-basierte IONOS, dist/ committed
   - Ungeklärt: Wie wird der Build automatisiert deployed? Gibt es CI/CD oder manuell?

6. **Benutzer-Testing**
   - Dokumentiert: Zielgruppe ist Grundschulkinder mit Neurodiversität
   - Ungeklärt: Wurde mit echten Kindern getestet? Feedback vorhanden?

7. **Browser-Kompatibilität**
   - Dokumentiert: Moderne React 19 (modern browsers)
   - Ungeklärt: IE11? Alte Safari? Android 5? Müssen wir Support garantieren?

8. **Offline-Modus**
   - Dokumentiert: Nicht in Phase 1
   - Ungeklärt: Wird PWA / Service Worker später nötig?

9. **Internationalisierung**
   - Dokumentiert: Aktuell nur Deutsch
   - Ungeklärt: Soll später auf Englisch, Französisch, etc. erweiterbar sein? i18n jetzt aufsetzen?

10. **Analytics / Tracking**
    - Dokumentiert: Nicht vorhanden
    - Ungeklärt: Sollen anonyme Tracking-Daten gesammelt werden (z. B. wie lange pro Seite)?

### Was war nicht verfügbar im Repository?

- Figma-Design oder Mockups (nur Dokumentation, keine Designs)
- Story-Outline oder Content-Plan (nur 1 Tag beispielhaft)
- Anforderungs-Spezifikation oder Lastenheft (nur mündliche Anforderungen)
- Test-Reports oder User-Feedback (keine Testdaten)
- Projektplan oder Roadmap (nur grobe Phase-1/2/3-Aufteilung)
- CI/CD-Konfiguration (manueller Prozess)
- Datenschutz-Dokumentation oder DSGVO-Compliance (nicht vorhanden)

### Kritische Unsicherheiten

| Unsicherheit | Auswirkung | Recommendation |
|---|---|---|
| **Story-Kontinuität unklar** | Content muss geschrieben werden, aber Handlung unklar | Mit Client klären vor Content-Creation |
| **Illustration-Budget unbekannt** | Kosten-/Zeit-Impact sehr hoch | Budget-Klärung jetzt |
| **Backend-Timing unklar** | Architektur-Entscheidungen hängen dran | Entscheidung jetzt treffen |
| **Testing-Requirements unklar** | Wie viel QA ist nötig? | Acceptance Criteria definieren |

---

## 28. Übergabe-Check

- [x] Anforderungen erfasst
- [x] Implementierte Funktionen erfasst
- [x] Offene Anforderungen erfasst
- [x] Teilweise implementierte Funktionen erfasst
- [x] Seitenstruktur erfasst
- [x] Repositorystruktur erfasst
- [x] Architektur erfasst
- [x] Datenbank-Status erfasst (nicht vorhanden)
- [x] APIs erfasst (nicht vorhanden)
- [x] Geschäftslogik erfasst
- [x] Erledigte Aufgaben erfasst
- [x] Offene Aufgaben erfasst
- [x] Fehler und technische Schulden erfasst
- [x] Deployment erfasst
- [x] Risiken dokumentiert
- [x] Nächste Schritte definiert
- [x] Unsicherheiten ausdrücklich dokumentiert
- [x] Keine Secrets enthalten (keine Passwörter, Keys)
- [x] Keine vermuteten Informationen als Fakten dargestellt

---

## Abschluss

**Dieser Übergabe-Bericht ist vollständig und kann als Single Source of Truth für die Fortführung des NeuroQuest-Projekts verwendet werden.**

Für Fragen zur Implementierung: Alle Details sind in den verlinkten Dateien und Dokumentationen nachverfolgbar.

Für Fragen zum Design: Siehe `app/NEUROQUEST_ARCHITECTURE.md`.

Für Platform-Constraints: Siehe `app/AGENTS.md`.

**Nächste KI oder Entwickler:** Beginnt mit Schritt 1.1 (Story-Writing), dann 1.2 (Responsive-Test), dann Phase 2.

---

**Übergabe-Dokumentation abgeschlossen: 2026-08-15**

**Repository-Status:** Clean, alle Änderungen committed.

**Build-Status:** ✅ Production-ready für Phase 1.

**Hinweis:** Dies ist ein lebendiges Dokument. Mit jeder neuen Phase sollte es aktualisiert werden.
