# NeuroPlay – Brettspielmodul

**NeuroPlay** ist eine React-basierte Webanwendung zur strukturierten Vermittlung von Brettspielregeln. Die Anwendung macht Spielregeln verständlich, bereitet Spiele vor und unterstützt Pädagogen und Spielgruppen.

## Was macht NeuroPlay?

- 📚 **Spielekatalog:** Durchsuche und filtere über 1.700+ Brettspiele
- 🎓 **Regelcoach:** Strukturierte Regelerklärung mit Ziel, Kernschleife, Phasen und atomaren Regeln
- 📦 **Sammlung:** Verwalte deinen Spielebestand (Vorhanden / Hinzufügen / Zu prüfen)
- 🏢 **Verlags-Übersicht:** Entdecke offizielle Quellen und Anleitungen

## Quick Start

### Installation

```bash
cd app
npm install   # Abhängigkeiten (werden von der Plattform bereitgestellt)
npm run dev   # Dev-Server starten → http://localhost:5173
npm run build:prod  # Production Build
```

### Technologie-Stack

- **Frontend:** React 19 + React Router v7
- **Styling:** Tailwind CSS v4 + Custom CSS (NeuroPlay-Design)
- **Bundler:** Vite 6.4.3
- **Deployment:** STRATO KI Platform
- **Backend (geplant):** PocketBase

## Dokumentation

→ **[Vollständiges Handover](docs/handover/PROJECT_HANDOVER.md)**

Das Handover enthält:
- Fachliche Anforderungen und Zielbild
- Vollständige Implementierungsübersicht
- Datenmodell und API-Struktur
- Roadmap und offene Aufgaben
- Einstiegspunkt für neue Entwickler

## Projektstand

| Bereich | Status |
|---------|--------|
| **Frontend (5 Hauptseiten)** | ✅ Implementiert |
| **Seed-Datenmodell** | ✅ Vorbereitet |
| **Suche & Filter** | ✅ Funktionsfähig |
| **Responsive Design** | ✅ Mobile/Tablet/Desktop |
| **Excel-Import (1.734 Spiele)** | ⏳ In Vorbereitung |
| **PocketBase-Integration** | ⏳ Geplant |
| **Authentifizierung** | ❌ Noch nicht implementiert |

## Nächste Schritte

1. **Excel-Import aktivieren** – XLSX-Parser testen und integrieren
2. **PocketBase-Collections erstellen** – Persistente Datenhaltung einrichten
3. **Echte Daten laden** – 1.734 Spiele aus Excel importieren
4. **Fehlende Seiten fertigstellen** – Verlags-Übersicht, Datenqualitäts-Dashboard
5. **Authentifizierung implementieren** – Login und Berechtigungen

## Repository

- **GitHub:** https://github.com/neuroways/brettspielmodul_datenbasis_ai
- **Branch:** `dev` (aktuelle Entwicklung)
- **Commits:** Git-Verlauf mit vollständiger Rekonstruktion

## Wer arbeitet daran?

NeuroPlay wird für **NeuroWays** entwickelt – ein Konzept für spielbasierte Unterstützung im therapeutischen und pädagogischen Kontext.

**Kontakt:** NeuroWays-Team

---

**Zuletzt aktualisiert:** 15. August 2026
