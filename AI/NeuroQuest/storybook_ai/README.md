# NeuroQuest – Ein interaktives Kinderbuch

**NeuroQuest** ist eine interaktive Anwendung für Grundschulkinder (Klasse 1–4), besonders für Kinder mit ADHS, Autismus oder erhöhtem Bewegungs-/Strukturbedarf.

Das System ist **kein Dashboard, kein Lernmanagementsystem, keine Gamification** – es ist ein Kinderbuch. Die Geschichte ist die Belohnung. Die Aufgabe ist nur der Schlüssel zum nächsten Kapitel.

## Kernidee: Die 5er-Regel

- **5 Tage** Reise
- **5 Runden** pro Tag
- **4 Aufgabenschritte** pro Runde (Prüfen → Schreiben → Kontrollieren → Unterstreichen)
- **1 Geschichte** als einzige Belohnung pro Runde
- **1 vollständige Geschichte** nach Tag 5

## Stack

- **Frontend:** React 19 + React Router v7
- **Styling:** Tailwind CSS v4 (kein npm install erforderlich)
- **Build:** Vite 6.4.3
- **Fonts:** Google Fonts (Lora, Poppins)
- **Storage:** Aktuell statisch (Phase 1 Prototyp)
- **Backend:** Keine (geplant für Phase 2+)

## Installation & Start

```bash
cd app
npm run dev
# → http://localhost:5173
```

## Build für Production

```bash
cd app
npm run build:prod
# → Ausgabe in dist/
```

## Projektstruktur

```
app/
├── src/
│   ├── pages/           # 8+ Seiten-Komponenten
│   │   ├── Home.jsx
│   │   ├── DayWelcome.jsx
│   │   ├── RoundStart.jsx
│   │   ├── Step1Check.jsx → Step4Underline.jsx
│   │   └── StoryPart.jsx
│   ├── App.jsx          # Router (8 Routes)
│   ├── main.jsx         # Entry Point
│   └── index.css        # Tailwind
├── public/
│   └── favicon.svg
├── dist/                # Build Output (committed)
├── index.html           # Template
├── tailwind.config.cjs  # Theme
├── vite.config.js       # Build Config
└── package.json         # Dependencies (empty)
```

## Dokumentation

**Vollständige technische Übergabe:**
→ [`docs/handover/PROJECT_HANDOVER.md`](../docs/handover/PROJECT_HANDOVER.md)

Sie enthält:
- Anforderungen & Implementation-Status
- Seiten- & Routing-Struktur
- Technische Architektur
- Offene Anforderungen & Backlog
- Nächste Entwicklungsschritte
- Einstiegspunkt für neue Entwickler

## Status: Phase 1 ✅

**Abgeschlossen:**
- ✅ Vollständige Seitenstruktur (8 Seiten)
- ✅ Responsive Design (375px, 768px, 1280px)
- ✅ Farbcodierte Aufgabenschritte
- ✅ Charaktere (Caspar & Lumi) auf jeder Seite
- ✅ Statische Geschichte für Tag 1

**Offene P1-Anforderungen:**
- ⏳ Geschichtskapitel für Tage 2–5 schreiben (20 Kapitel)
- ⏳ Tägliche Grußmeldungen individualisieren (5 Varianten)
- ⏳ Responsive Design vollständig testen

**Geplant für Phase 2+:**
- Fortschritt-Persistierung (LocalStorage)
- Sanfte Animationen
- Charakter-Illustrationen
- Optionales Backend

## Design-Prinzipien

- 🎨 **Bilderbuch-Ästhetik:** Warme Naturfarben, große Illustrationen, ruhig
- 🧘 **Druck-frei:** Keine Punkte, Sterne, Timer, Ranglisten
- 🎯 **Ein Gedanke pro Seite:** Nie scrollbar, nie mehrere Buttons gleichzeitig
- 💪 **Neuroinklusive:** Für Kinder mit Neurodiversität optimiert
- 🗣️ **Ermutigend:** Caspar & Lumi sprechen nie wertend

## Entwicklung beitreten

1. Lies [`docs/handover/PROJECT_HANDOVER.md`](../docs/handover/PROJECT_HANDOVER.md)
2. Starte den Dev-Server: `npm run dev`
3. Bearbeite `src/pages/*.jsx` oder `index.html`
4. Sieh Live-Reload im Browser
5. Commit & Push

## Lizenz

[Lizenz TBD]

## Kontakt

**Projekt:** NeuroQuest (neuroways)  
**Repository:** github.com/neuroways/storybook.ai

---

Vollständige Dokumentation → [`docs/handover/PROJECT_HANDOVER.md`](../docs/handover/PROJECT_HANDOVER.md)
