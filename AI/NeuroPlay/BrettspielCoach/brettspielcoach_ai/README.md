# NeuroPlay Brettspielcoach

Eine intelligente Webanwendung zum Erlernen, Verstehen und Spielen von Brettspielen mit Katalog, persönlicher Sammlung, Haushalt-Verwaltung und Live-Spiel-Coaching.

## 🎯 Projekt-Übersicht

**NeuroPlay** unterstützt Spieler bei:
- 📚 **Spielkatalog** – Durchsuchbar, mit 924 Spielen, Regeln und Metadaten
- 🎮 **Persönliche Sammlung** – Spiele speichern, favorisieren, Haushalte gründen
- 👥 **Haushalt-Management** – Spielergruppen mit Rollen und Gast-Codes
- 🧠 **Spiel-Coaching** – Fragen zu Regeln, Strategien und Fehlerprävention
- 📊 **Session-Tracking** – Wer mit wem gespielt hat, Sieger, Dauer

## 🛠️ Tech-Stack

- **Frontend:** React 18 + Vite v6 + Tailwind CSS v4
- **Backend:** PocketBase v0.39.0 + SQLite
- **Hosting:** STRATO Platform (/.sfs-bd/ dev, /.sfs-be/ prod)
- **Version Control:** GitHub (neuroways/brettspielcoach_ai)

## 🚀 Schnellstart

### Installation

```bash
cd app
npm install
```

### Entwicklung

```bash
npm run dev
```

Dev-Server startet auf http://localhost:5173 mit Hot-Module-Reload.

### Produktion bauen

```bash
npm run build:prod    # Für Live-Deployment
npm run build         # Für Preview-Build
npm run preview       # Lokal testen
```

## 📖 Dokumentation

**Für neue Entwicklerinnen und KIs:**

Lesen Sie die **vollständige Projektübergabe** unter:

👉 **[docs/handover/PROJECT_HANDOVER.md](docs/handover/PROJECT_HANDOVER.md)**

Sie enthält:
- Alle Anforderungen (erfüllt + offen)
- Technische Architektur
- Datenbankstruktur (11 Collections)
- Alle 22 Screens & User Flows
- Bekannte Fehler und technische Schulden
- Empfohlene nächste Schritte

Weitere Dokumentation:
- `MASTERPROMPT_PROJECT_STATE.md` – Projekt-Zusammenfassung
- `AGENTS.md` – App-Architektur (React, Vite, Routing)
- `DATABASE_STRUCTURE.md` – PocketBase Collections
- `AUTHENTICATION_FLOW.md` – Login, Rollen, Berechtigungen
- `EXCEL_IMPORT_FLOW.md` – Spiele-Import aus Excel

## 📊 Projekt-Status

| Bereich | Status |
|---------|--------|
| Datenbankfundament | ✅ Live (924 Spiele, 32 Verlage, 11 Collections) |
| Admin-Panel | ✅ Live (Daten-Browser, Excel-Import, Benutzer) |
| Spielekatalog | ✅ Live (Suche, Filter, Detail-Modal) |
| Authentifizierung | ✅ Live (PocketBase, Rollen, Haushalt) |
| Design System | 🟡 Teilweise (Navy/Teal/Gold auf 4 von 22 Screens) |
| Responsive (320–1440px) | 🟡 Teilweise (Tailwind vorhanden, nicht getestet) |
| Accessibility (WCAG AA) | 🟡 Geplant |

## 🔐 Umgebungsvariablen

Nicht erforderlich — die App erkennt Dev/Prod automatisch anhand der URL.

Falls lokal getestet wird, siehe `.env.example` (enthält nur Platzhalter, keine Secrets).

## 🗄️ Datenbank

PocketBase läuft auf STRATO:
- **Dev:** `/.sfs-bd/` (https://aibuilder-514nc.preview.ai-builder.strato.de/)
- **Prod:** `/.sfs-be/` (https://sfs-05zwnczjvysr.live-website.com/)

Schema und Collections sind in `dist/pb_schema_export.json` dokumentiert.

## 📋 Offene Aufgaben (Backlog)

**P0 (Kritisch):**
- Design-System auf restlichen 18 Screens
- Responsive Testing 320–1440px
- Accessibility Audit (WCAG 2.2 AA)

**P1 (Nächste Version):**
- Bundle-Size Optimierung (<700 KB)
- Haushalt-Einladungs-Code funktioniert
- Sessions vollständig persistent

**P2 (Später):**
- PDF-Upload & automatische Regel-Extraktion
- AI-Coaching (RAG über Spielregeln)
- Dark Mode
- PWA-Support

Siehe [docs/handover/PROJECT_HANDOVER.md](docs/handover/PROJECT_HANDOVER.md) Kapitel 18 für vollständiges Backlog.

## 🐛 Bekannte Fehler

1. **Bundle-Size Warnung** – 1.1MB (>500KB Limit)
   - Lösung: Code-Splitting für große Components
2. **Haushalt-Persistierung unklar** – Code existiert, nicht getestet
3. **15 Screens noch nicht mit NeuroWays-Farben** – Tailwind vorhanden, Styling ausstehend

Siehe [docs/handover/PROJECT_HANDOVER.md](docs/handover/PROJECT_HANDOVER.md) Kapitel 19 für alle bekannten Fehler.

## 🤝 Mitwirkende

Entwickelt mit NeuroWays NeuroPlayWorks.

## 📝 Lizenz

Nicht öffentlich spezifiziert. Siehe Repository-Einstellungen.

---

**Letzte Aktualisierung:** 15. August 2026
**Repository:** https://github.com/neuroways/brettspielcoach_ai (Branch: dev)
