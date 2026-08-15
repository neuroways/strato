# NeuroPlay – Brettspielcoach

Ein intelligenter Coach für Brettspiele. Verstehe dein Lieblingsspiel, lerne strategisch zu spielen und gewinne mit Spaß.

## Features

- **Spielanleitung hochladen** – PDF-Dateien hochladen und automatisch analysieren lassen
- **Intelligente Coaches** – Interaktiver Coach beantwortet Fragen zum Spiel
- **Schnellstart** – 5-Minuten-Einführung für schnelle Spieler
- **Regelbuch** – Durchsuchbares Regelwerk mit Kategorien
- **Spielmodus** – Begleitung während einer laufenden Partie
- **Strategietipps** – Tipps zum Gewinnen und häufige Anfängerfehler
- **Spielbibliothek** – Speichere und verwalte deine Spiele

## Tech Stack

- **Frontend:** React 18 + Vite 6
- **Styling:** Tailwind CSS v4
- **Storage:** PocketBase (vorbereitet)
- **Responsiv:** Mobile-first (375px–1280px)

## Installation & Entwicklung

```bash
# Abhängigkeiten installieren
npm install

# Dev-Server starten (mit HMR)
npm run dev

# Produktion bauen
npm run build:prod

# Preview bauen
npm run build
```

## Architektur

Siehe `AGENTS.md` für:
- Detaillierte Projektstruktur
- Service-Layer-Beschreibung
- Spielmodell und Datenstruktur
- Responsive-Design-Breakpoints
- Zukünftige Integrationspunkte (PDF-Analyse, KI-Coach, PocketBase)

## Repository-Status

- **Branch:** `dev` (Hauptentwicklung)
- **Status:** MVP – vollständiger funktionierender Prototyp
- **Nächste Schritte:** Echte PDF-Analyse, AI-Coach-Integration, PocketBase-Storage

---

**NeuroPlay** – Brettspiele verstehen, nicht auswendig lernen.
