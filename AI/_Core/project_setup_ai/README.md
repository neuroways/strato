# NeuroWays

Ein neuroscience-basiertes Web-Anwendungssystem mit zwei geplanten Modulen für Selbstbeobachtung und Spielverwaltung.

## Projektübersicht

**NeuroWays** besteht aus zwei integrierten Modulen:

1. **NeuroBalance** — Energy Navigator für Energie- und Belastungszustände
2. **NeuroPlay** — Brettspiel-Katalog mit Haushalts- und Spielerverwaltung

## Technologie

- **Frontend:** React + React Router
- **Styling:** Tailwind CSS v4
- **Build Tool:** Vite
- **JavaScript:** ES6+ (JSX)

## Installation und Start

```bash
cd app
npm install
npm run dev
```

Der Development-Server läuft anschließend unter `http://localhost:5173` (oder lokal konfigurierte URL).

## Build für Production

```bash
npm run build:prod
```

Die produktive Build wird unter `dist/` erzeugt.

## Projektstruktur

```
src/
├── pages/              # Seiten (Home, NeuroBalance, NeuroPlay, Info)
├── layouts/            # Layout-Komponenten (Globale Navigation)
├── App.jsx             # Root Routes
├── main.jsx            # Entry Point
└── index.css           # Tailwind Import

docs/
└── handover/
    └── PROJECT_HANDOVER.md    # Vollständige Projektdokumentation

migration/
├── NeuroBalance.jsx           # NeuroBalance Export (Referenz)
└── neurowaysV1/               # NeuroWays v1 Architektur-Standards
```

## Dokumentation

Für vollständige Projektinformationen siehe:
**[`docs/handover/PROJECT_HANDOVER.md`](./docs/handover/PROJECT_HANDOVER.md)**

Diese Datei enthält:
- Anforderungskatalog
- Implementierter Funktionsumfang
- Technische Architektur
- Datenmodell (geplant)
- Offene Anforderungen und Backlog
- Empfohlene nächste Entwicklungsschritte

## Aktueller Entwicklungsstand

- ✅ **Frontend-Grundgerüst:** 4-seitige React+Router Anwendung mit Navigation
- ✅ **Tailwind CSS:** Responsive Design-Framework konfiguriert
- ✅ **Placeholder-Seiten:** Alle 4 Seiten mit UI vorhanden
- ⏳ **Datenbank:** Nicht implementiert
- ⏳ **Authentifizierung:** Nicht implementiert
- ⏳ **NeuroBalance Check-in:** Nicht implementiert
- ⏳ **NeuroPlay Katalog:** Nicht implementiert

## Nächste Entwicklungsschritte

1. **Datenbank wählen und initialisieren** (BlockierT alle weiteren Aufgaben)
2. **NeuroBalance Fragen-Spezifikation klären** (5 vs 6 Fragen, Scoring)
3. **NeuroPlay XLSX analysieren** (75+ Spiele in Datenbank importieren)
4. **Authentifizierung implementieren**
5. **NeuroBalance Check-in Form**
6. **NeuroPlay Spielekatalog-UI**

Siehe `docs/handover/PROJECT_HANDOVER.md` Sektion 25 für Details.

## Lizenz

Nicht spezifiziert.

## Repository

- **GitHub:** https://github.com/project_setup_ai/neuroways.git
- **Branch:** `dev`

---

Letzte Aktualisierung: 15. August 2026
