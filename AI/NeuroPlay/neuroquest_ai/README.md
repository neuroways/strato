# NeuroQuest

**Ein kleiner Schritt. Eine kleine Geschichte. Ein großes Abenteuer.**

NeuroQuest ist ein interaktives digitales Kinderbuch für Schüler der Klassen 1–4, speziell entwickelt für Kinder mit ADHS und Autismus. Die Anwendung verbindet Schreib- und Lesaufgaben mit einer Fantasiegeschichte, in der Caspar zusammen mit dem Lichtwesen Lumi durch einen Zauberwald reist.

## Projekt-Status

**Concept Prototype v1.0** – Funktionsfähig mit vollständiger Basis-Funktionalität:
- ✅ 5 Tage × 5 Missionen pro Tag (25 spielbare Szenarien)
- ✅ Die "Magischen 5" – täglicher Rhythmus der Aufgaben
- ✅ Story-Freischaltung nach jeder Mission
- ✅ PWA-Installation (iOS, Android, Desktop)
- ✅ Offline-Funktionalität
- ✅ Responsive Design (Mobile, Tablet, Desktop)

## Technologie-Stack

- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS v4 + Custom CSS
- **Fonts:** Google Fonts (Borel, Crimson Text, Lora)
- **PWA:** Service Worker, Manifest, Icons
- **Hosting:** IONOS SFS Platform

## Schnelleinstieg

```bash
# Installation
npm install
# (Es gibt keine Dependencies – alles ist platform-provided)

# Development Server (Hot-Reload)
npm run dev
# Öffne http://localhost:5173

# Production Build
npm run build:prod
# Output: ./dist/
```

## Wichtige Dateien

| Datei | Zweck |
|-------|-------|
| `src/App.jsx` | Zentrale State-Verwaltung und Routing |
| `src/App.css` | Globale Styles, Farben, Animationen |
| `src/pages/` | 11 Page-Komponenten |
| `src/components/PageStructure.jsx` | Unified Layout für Task/Story-Seiten |
| `public/manifest.json` | PWA-Metadaten |
| `index.html` | HTML-Einstiegspunkt |
| `NEUROQUEST_PHILOSOPHY.md` | Pädagogische Vision und Design-Prinzipien |
| `NEUROQUEST_STRUCTURE.md` | Seitenstruktur, Komponenten, User-Flows |
| `docs/handover/PROJECT_HANDOVER.md` | **Vollständige technische Übergabe** ← START HERE |

## Für neue Entwickler

**Bitte beginne hier:**

1. Lese [NEUROQUEST_PHILOSOPHY.md](./NEUROQUEST_PHILOSOPHY.md) (10 Min)
2. Lese [NEUROQUEST_STRUCTURE.md](./NEUROQUEST_STRUCTURE.md) (15 Min)
3. Lese [docs/handover/PROJECT_HANDOVER.md](./docs/handover/PROJECT_HANDOVER.md) (30 Min)
4. Öffne `src/App.jsx` und `src/App.css`

Das Handover-Dokument enthält alles, was du über den aktuellen Projektstand wissen musst:
- Implementierte Funktionen
- Offene Anforderungen
- Bekannte Fehler
- Empfohlene nächste Schritte
- Unsicherheiten und offene Fragen

## Architektur

```
Browser (Desktop, Mobile, Tablet)
    ↓
NeuroQuest PWA (React + Vite)
    ├─ Page Components (11 Seiten)
    ├─ State Management (App.jsx)
    ├─ Styling (CSS + Tailwind v4)
    └─ Service Worker (Offline-Support)
    ↓
Static Assets (/static/)
    ├─ Illustrationen (JPG/PNG)
    └─ Icons (PNG/SVG)
```

## Die "Magischen 5"

Jeder Tag folgt dem gleichen Rhythmus:

```
Für jede der 5 Missionen:
  1. 👀 Prüfe das Satzende
  2. ✏️ Schreibe den Satz ab
  3. 🔍 Kontrolliere jedes Wort
  4. 📏 Unterstreiche den fertigen Satz
  5. 📖 Lies den Geschichtenteil
```

Das Kind arbeitet im Heft; die App zeigt die Anleitung und freizuschaltet die Geschichte.

## Charaktere

**Caspar** – Ein neugieriger Junge (7 Jahre). Er entdeckt, staunt, probiert, irrt sich, lernt.

**Lumi** – Ein ruhiges Lichtwesen. Freundlich, ermutigend, bewertungsfrei. Spricht Caspar (und das Kind) an.

## Pädagogische Werte

- Jeder kleine Schritt zählt
- Fehler gehören zum Lernen
- Anderssein ist gut
- Langsam ist in Ordnung
- Kontrolle ist wichtiger als Geschwindigkeit
- Lernen darf Freude machen

(Diese Werte werden erlebt, nicht explizit gelehrt.)

## Deployment

Das Projekt wird auf der IONOS SFS-Plattform deployed:

```
Local → Build (dist/) → Git Push → IONOS SFS → Live Website
```

Statische Assets liegen unter `/static/` und sind nicht Teil des App-Bundles.

## Bekannte Limitationen

- **Keine Datenspeicherung (V1):** State wird bei Reload gelöscht. Geplant für V2.
- **Keine echten URLs:** State-basiertes Routing statt React Router. Geplant für V2.
- **Day 3 Story:** Nutzt aktuell Day 2 Bild (Platzhalter).
- **Browser-Cache:** Hard-Refresh (Strg+Shift+R) ggf. nötig nach Updates.

## Geplante Erweiterungen (V2+)

- Datenspeicherung (localStorage/Cloud)
- Login-System
- Eltern/Lehrkraft-Dashboard
- Anpassbare Aufgaben
- Erweiterte Story (mehr Tage)
- Audio/Voice-Over
- Mehrsprachigkeit

## Support & Fragen

Alle technischen Details, offene Anforderungen und nächste Entwicklungsschritte sind dokumentiert in:

→ **[docs/handover/PROJECT_HANDOVER.md](./docs/handover/PROJECT_HANDOVER.md)**

## Lizenz

[Zu definieren]

---

**Letzte Aktualisierung:** 15. August 2026  
**Repository:** https://github.com/neuroways/neuroquest_ai.git  
**Live-Demo:** [IONOS SFS URL]
