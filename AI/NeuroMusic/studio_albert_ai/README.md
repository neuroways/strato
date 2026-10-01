# ASG Klangwerk – Interactive Studio Discovery & Learning Platform

> Erkunde das Tonstudio der ASG auf völlig neue Weise. Verbinde Instrumente, Synthesizer und Mischpult miteinander und werde Schritt für Schritt zum Studio-Profi.

**Entdecken. Verbinden. Produzieren.**

---

## 🎯 Überblick

ASG Klangwerk ist eine interaktive Lernplattform für Schülerinnen und Schüler ab Klasse 8. Sie ermöglicht es, das Tonstudio der ASG zu erkunden, Geräte zu verstehen, Verbindungen auszuprobieren und durch ein Quiz-System Wissen über Audio, MIDI und Musikproduktion zu vertiefen.

**Zielgruppe:** Schüler/innen ab 8. Klasse

**Stack:** React 18 + React Router v7 + Tailwind CSS v4 (Vite, client-side only)

**Besonderheiten:**
- ✓ Vollständig clientseitig (keine API / offline-tauglich)
- ✓ Quiz mit 40 pädagogisch verifizierten Fragen
- ✓ Interaktive Visualisierungen (Studio, Signalwege)
- ✓ Lokale Lernfortschritts-Verfolgung
- ✓ Responsive Design (375px–1280px+)
- ✓ Keine Abhängigkeiten (React & Tools platform-provided)

---

## 📖 Schnelleinstieg

### Voraussetzungen

- Node.js 24+
- Moderner Browser (Chrome 90+, Firefox 88+, Safari 14+)
- Internet (nur für erste Downloads)

### Installation & Start

```bash
# Im Projekt-Verzeichnis
cd app

# Lokale Entwicklung mit HMR (Hot Module Reloading)
npm run dev
# Browser öffnet sich auf http://localhost:5173/

# Production Build
npm run build:prod
# Output: dist/ (deploy to hosting)

# Vorschau des Builds
npm run preview
```

### Erste Schritte

1. Browser: http://localhost:5173/
2. Klick auf **"Entdecken. Verbinden. Produzieren."**
3. Probiere aus:
   - **Gerätewelten**: Alle 16 Studio-Geräte durchsuchen
   - **Verbindungscheck**: Zwei Geräte auswählen, Kompatibilität prüfen
   - **Klang-Challenges**: Quiz starten (4 Schwierigkeitsstufen)
   - **Mein Fortschritt**: Quiz-Ergebnisse anschauen

---

## 🗂️ Projektstruktur

```
app/
├── src/
│   ├── pages/           # 13 Page-Komponenten (Home, Devices, Quiz, etc.)
│   ├── services/        # Business Logic (Quiz Engine, Data Services)
│   ├── types/           # TypeScript Typdefinitionen
│   ├── data/            # JSON-Dateien (16 Geräte, 40 Fragen, etc.)
│   ├── components/      # Reusable UI Components
│   ├── layouts/         # Global Layout (Nav + Footer)
│   └── App.jsx          # Root Component + Routing
├── public/              # Favicon
├── dist/                # Build Output (prod deployment)
├── index.html           # HTML Template
├── package.json         # Scripts (npm run dev, npm run build, etc.)
├── vite.config.js       # Vite Build Config
├── tailwind.config.cjs  # Tailwind CSS Config
├── AGENTS.md            # ⭐ Detaillierte technische Dokumentation
└── .gitignore           # Git Exclusions

docs/
└── handover/
    └── PROJECT_HANDOVER.md  # ⭐ Vollständige Handover-Dokumentation
```

### Wichtigste Dateien

| Datei | Zweck |
|-------|-------|
| **`AGENTS.md`** | Technische Details, Stack, Architektur |
| **`docs/handover/PROJECT_HANDOVER.md`** | Komplette Projektübergabe & Roadmap |
| **`src/data/quiz-questions-complete.json`** | 40 Quiz-Fragen (Heart of the app) |
| **`src/services/quiz-engine.ts`** | Quiz-Logik & Feedback-Generierung |
| **`src/pages/Quiz.jsx`** | Quiz UI (Start, Fragen, Ergebnisse) |
| **`src/data/initial-studio-data.json`** | 16 Studio-Geräte & Spezifikationen |

---

## 🎨 Navigation & Seiten

| Route | Name | Beschreibung |
|-------|------|-------------|
| `/` | Home | Landing Page mit Feature-Überblick |
| `/devices` | Gerätewelten | 16 Studio-Geräte durchsuchen & filtern |
| `/cabling` | Verbindungscheck | Device-zu-Device Kompatibilität prüfen |
| `/signal-flow` | Signalwege | Visualisierung: Wie Audio durchs Studio fließt |
| `/studio` | Studio-Raum | Interaktive SVG-Visualisierung (Geräte-Positionen) |
| `/learning` | Studio-Missionen | Strukturierte Lernmodule (7 Kategorien) |
| `/quiz` | Klang-Challenges | Quiz-Engine (40 Fragen, 4 Schwierigkeitsstufen) |
| `/knowledge` | Klangwissen | 7 Wissensartikel (Audio, MIDI, Routing, X32, etc.) |
| `/errors` | Studio-Notfall | Fehlerdiagnose-Guide (20+ Szenarien) |
| `/verification` | Mein Fortschritt | Persönliche Statistiken & Beobachtungs-Log |
| `/dashboard` | Dashboard | Studio-Statistiken (optional) |
| `/management` | Admin | Datenverwaltungs-Interface (versteckt) |

---

## 🧠 Kern-Features

### 1. Quiz Engine (40 Fragen)

- **4 Schwierigkeitsstufen**: Entdecken → Anwenden → Verstehen → Studio-Profi
- **10 Fragen pro Stufe**, durchmischt
- **Pädagogisches Feedback**: Jede Antwort (richtig oder falsch) hat 3-5 Sätze Erklärung
- **Lokale Persistenz**: Quiz-Sitzungen werden in localStorage gespeichert
- **Schwache-Bereiche-Übung**: Nach Quiz automatische Fokussierung auf schwache Themen

**Beispiel Frage:**
```
Titel: Audio und MIDI unterscheiden
Frage: Was wird bei einer MIDI-Aufnahme gespeichert?

Antworten:
A) Der fertige Klang
   → Falsch, weil: "Das ist Audio-Aufnahme. MIDI speichert keine Klänge."
   
B) Gespielte Noten und Steuerinformationen
   → RICHTIG! "MIDI = Spielanweisung. Der Klang wird später erzeugt."

... (2-4 weitere Antworten)

Feedback: "MIDI speichert Information (was, wann, wie). Audio speichert Schall."
```

### 2. Gerätekatalog (16 Geräte)

Jedes Gerät dokumentiert mit:
- Name, Hersteller, Modell
- Kategorie (10 mögliche: Keyboards, Synthesizer, Sampler, Mischpult, etc.)
- Anschlüsse (XLR, Klinke, MIDI, USB, etc.)
- Spezifikationen & Status
- Dokumentations-Vollständigkeit

**Beispiel:**
- Behringer X32 (Mixer)
- Kawai ES920 (Keyboard/Input)
- Roland JV-1010 (Synthesizer)
- MacBook Pro M1 (DAW/Recording)
- Neumann KMS 104 (Mikrofon)
- ... und 11 weitere

### 3. Verbindungs-Checker

Benutzer wählt zwei Geräte → System zeigt:
- ✓ Mögliche Verbindungen (welche Kabel, welche Anschlüsse)
- ✗ Unmögliche Verbindungen (warum nicht)
- Signal-Typ-Farben (Audio=Grün, MIDI=Cyan, USB=Orange, etc.)

### 4. Lernmodule (7 Kategorien)

Strukturierte Lernpfade mit:
- Ziele für jedes Modul
- Verknüpfung zu Geräten
- Verknüpfung zu Quiz-Fragen
- Fortschritts-Verfolgung

**Module:**
1. Keyboards & Eingabegeräte
2. Synthesizer & Klangerzeuger
3. Sampler & Loopers
4. Mischpult & Routing (X32)
5. Recording & DAW
6. Mikrofone & Audiointerfaces
7. Steuerung & MIDI

### 5. Interaktive Visualisierungen

- **Studio-Raum**: SVG-Grundriss mit Geräte-Positionen & Leitungen
- **Signalwege**: Schritt-für-Schritt: Keyboard → Mischpult → Lautsprecher
- **Verbindungs-Matrix**: Welche Geräte passen zusammen?

---

## 💾 Datenspeicherung

**Keine Datenbank erforderlich.** Alles ist client-side:

### localStorage (Benutzer-Daten)

```javascript
// Quiz-Sitzungen
localStorage.getItem("studio_albert_quiz_sessions")
// Lernfortschritt
localStorage.getItem("studio_albert_lernfortschritt")
// Beobachtungen/Fotos
localStorage.getItem("studio_albert_observations")
```

### JSON-Dateien (Statische Inhalte)

```
src/data/
├── initial-studio-data.json      # 16 Geräte
├── quiz-questions-complete.json  # 40 Fragen
├── learning-modules.json         # 7 Lernmodule
├── device-roles.json             # 10 Kategorien
├── knowledge.json                # 7 Artikel
├── errors.json                   # 20+ Fehler-Szenarien
├── cables.json                   # Kabel-Definitionen
└── connections.json              # Verbindungs-Matrix
```

**Vorteil:** Einfache Git-Versionierung, offline-tauglich, keine Server-Infra

---

## 🎨 Design & Branding

- **Farbschema**: Dark Gradient (#030712 → Gray-900)
- **Primary Accent**: Orange (#f97316) — ASG Brand
- **Typefaces**: System fonts (Tailwind defaults)
- **Responsive**: Mobile-first (getestet @ 375px, 768px, 1280px)
- **Accessible**: Keyboard-Navigation, Focus-Indikatoren, kein Color-Only-Info

---

## 📋 Anforderungen & Status

| Anforderung | Status | Nachweis |
|-------------|--------|----------|
| 16 Geräte dokumentiert | ✅ DONE | `src/data/initial-studio-data.json` |
| 10 Gerätekategorien | ✅ DONE | `src/data/device-roles.json` |
| 40 Quiz-Fragen (4 Stufen) | ✅ DONE | `src/data/quiz-questions-complete.json` |
| Pädagogisches Feedback | ✅ DONE | Jede Frage hat Feedback-Texte |
| Lokale Lernfortschritts-Verfolgung | ✅ DONE | `quiz-engine.ts` + localStorage |
| Responsive Design | ✅ DONE | Tailwind (sm: md: lg: Breakpoints) |
| Offline-tauglich | ✅ DONE | Keine API-Aufrufe |
| ASG Klangwerk Branding | ✅ DONE | Logo, Orange-Farbe, Title |
| Keyboard-Zugriff | ✅ DONE | Alle Interaktionen mit Tab/Enter |
| X32 Tiefengang (9 Kapitel) | ⏳ PARTIAL | 5/9 Kapitel geschrieben |
| Learning Modules Content | ⏳ PARTIAL | Struktur OK, Inhalte teilweise |
| Synthesizer/Sampler Profile | ⏳ PARTIAL | Basis-Info vorhanden |

---

## 🚀 Deployment

### Lokal Bauen
```bash
cd app
npm run build:prod
# Erzeugt dist/
```

### Zu Produktion Pushen
```bash
git add . && git commit -m "message"
git push origin dev
# Platform deployed automatisch
```

### Hosten
Diese Anwendung läuft auf **IONOS Group (SFS Platform)**.
Keine weitere Konfiguration erforderlich.

---

## 🛠️ Entwicklung

### Tech Stack

- **React 18** + React Router v7 (client-side routing)
- **TypeScript** (for type safety in services & data)
- **Tailwind CSS v4** (utility-first styling)
- **Vite** (build tool, HMR in dev)
- **localStorage** (persistence)
- **lucide-react** (icons)

**Keine externen Dependencies!** Alles Platform-provided.

### Code-Konventionen

- JSX/TSX für Components
- TypeScript für Services & Types
- Tailwind für Styling (kein eigenes CSS)
- Event-Handling mit React Hooks
- No fetch/axios (alles in-memory JSON)

### Git Workflow

```bash
# Feature erstellen
git checkout -b feature/neue-funktion

# Veränderungen committen
git add .
git commit -m "feat: kurze beschreibung"

# Zu main-Branch mergen
git checkout main
git merge feature/neue-funktion
git push origin main

# Feature-Branch löschen
git branch -d feature/neue-funktion
```

---

## 📚 Weitere Dokumentation

Für detaillierte Informationen siehe:

1. **`app/AGENTS.md`** — Technische Tiefengang
   - Stack & Arch Entscheidungen
   - Quiz Engine Spezifikation
   - Device Data Schema
   - Alle Komponenten im Detail

2. **`docs/handover/PROJECT_HANDOVER.md`** — Vollständige Projektübergabe
   - Fachliches Zielbild
   - Alle Features dokumentiert
   - Offene Anforderungen & Backlog
   - Roadmap für nächste Entwicklung
   - Risiken & Schulden

---

## ❓ FAQ

**F: Wo werden Quiz-Ergebnisse gespeichert?**
A: Lokal im Browser (localStorage). Bei Browser-Cache-Clear werden sie gelöscht.

**F: Kann man die Anwendung offline nutzen?**
A: Ja! Alle Daten sind lokal oder im Bundle. Keine API-Aufrufe erforderlich.

**F: Welche Browser werden unterstützt?**
A: Modern browsers mit ES2020+ Support (Chrome 90+, Firefox 88+, Safari 14+).

**F: Wer kann die Daten ändern?**
A: Aktuell nur durch direktes JSON-Bearbeiten + Code-Redeployment. Management.jsx ist nur Read-Only. (Admin-Edit-Funktionen sind geplant.)

**F: Wie viele Schüler können gleichzeitig nutzen?**
A: Unbegrenzt — es ist reine Client-Side JavaScript, keine Server-Ressourcen.

**F: Kann man Quiz-Fragen personalisieren?**
A: Später, wenn Admin-UI implementiert. Aktuell: Direktes Bearbeiten von `quiz-questions-complete.json`.

---

## 📞 Support & Feedback

**Bug melden:** Siehe `PROJECT_HANDOVER.md` Sektion "Bekannte Fehler"

**Feature anfordern:** Siehe `PROJECT_HANDOVER.md` Sektion "Offene Anforderungen & Backlog"

**Technische Fragen:** Siehe `AGENTS.md`

---

## 📄 Lizenz

[Zu definieren — Standard für ASG-Projekte]

---

## 🙋 Credits

Entwickelt als interaktive Lernplattform für das Tonstudio der ASG.

**Version:** 1.0 (Launch)  
**Datum:** Juli 2026  
**Status:** Production-Ready

---

**Für detaillierte technische Informationen, Roadmap & Handover-Dokumentation siehe `docs/handover/PROJECT_HANDOVER.md`.**
