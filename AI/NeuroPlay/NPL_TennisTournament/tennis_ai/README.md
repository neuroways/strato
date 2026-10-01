# Tennisturnier Neindorf — Ein Tag für alle!

Vereinstennisturnier in Neindorf mit Fokus auf Spaß, Geselligkeit und Verpflegung für alle Erfahrungsstufen.

## Überblick

Eine vollständige Webanwendung für die Verwaltung und Durchführung eines Tennisturniers:

- **Öffentliche Bereiche:** Anmeldung, Teilnehmerliste, Spielplan, Ergebnisse, Kontakt
- **Admin-Bereich:** Turnierverwaltung, Spielerverwaltung, Platzmanagement, Spielverwaltung, Ergebniseingabe
- **Datenbank:** PocketBase mit 15 Collections für Turniere, Spieler, Matches, Ergebnisse und mehr

## Technologien

- **Frontend:** React 19 + Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **Backend:** PocketBase
- **Datenbank:** SQLite

## Installation

### Voraussetzungen
- Node.js 18+
- PocketBase (Backend)

### Schritt 1: Abhängigkeiten installieren
```bash
cd app
npm install
```

### Schritt 2: PocketBase starten
Starte den PocketBase-Server separat (Details siehe `/docs/handover/PROJECT_HANDOVER.md`).

### Schritt 3: Entwicklungsserver starten
```bash
npm run dev
```

Die Anwendung lädt unter `http://localhost:5173`.

## Projektstruktur

```
app/
├── src/
│   ├── pages/           # Public & Admin pages
│   ├── layouts/         # Shared layouts (AdminLayout)
│   ├── lib/             # PocketBase client & API functions
│   ├── App.jsx          # Router setup
│   └── index.css        # Tailwind styles
├── DB/json/             # Database schema definitions (JSON)
├── dist/                # Built production app
├── public/              # Static assets
├── index.html           # HTML entry point
└── package.json         # Dependencies & scripts
```

## Datenbank

Alle 15 Collections sind in `DB/json/` als JSON definiert:

- tournaments, tournament_settings
- players, registrations
- locations, contacts
- info_sections, announcements
- courts, rounds, matches, match_players
- results, ai_schedule_runs
- admins

Siehe `docs/handover/PROJECT_HANDOVER.md` für vollständige Dokumentation.

## Nächste Schritte

Siehe `/docs/handover/PROJECT_HANDOVER.md` für:
- Offene Anforderungen
- Bekannte Fehler
- Technische Schulden
- Empfohlene nächste Entwicklungsschritte
- Einstiegspunkt für Entwicklung
