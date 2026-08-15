# Hinter der unsichtbaren Maske – Album-Website

Ein hochwertig gestaltetes digitales Album-Booklet für 7 Songtexte. Die Website präsentiert ein Album als ruhige, responsive Single-Page-Application mit einer klaren visuellen Sprache: 70% Schwarz-Weiß, 30% Pastellfarben.

## Schnellstart

### Voraussetzungen

- Node.js 18+ (platform-bereitgestellt)
- Git (für Versionskontrolle)
- Internetverbindung (für PocketBase Backend)

### Installation & Entwicklung

```bash
# Repository klonen
git clone git@github.com:hinter_der_unsichtbaren_maske_ai.git
cd hinter_der_unsichtbaren_maske_ai/app

# Dev-Server starten
npm run dev
# Öffne http://localhost:5173 im Browser
```

### Build (Produktion)

```bash
# Production Build erzeugen
npm run build

# Lokal testen vor Deploy
npm run preview
# Öffne http://localhost:4173
```

## Projektstruktur

```
app/
├── src/
│   ├── components/          # React-Komponenten
│   │   ├── HomePage.jsx     # Startseite + Trackliste
│   │   ├── SongPage.jsx     # Songdetails + Navigation
│   │   ├── Navigation.jsx   # Header
│   │   └── NotFound.jsx     # 404-Seite
│   ├── lib/
│   │   └── pb.js            # PocketBase-Client
│   ├── App.jsx              # Router-Setup
│   ├── main.jsx             # Entry Point
│   └── index.css            # Tailwind + Design-Tokens
├── public/
│   └── favicon.svg          # Schmetterlings-Logo
├── dist/                    # Build Output (wird deployed)
├── docs/
│   └── handover/
│       └── PROJECT_HANDOVER.md  # Vollständige Projektdokumentation
├── index.html               # HTML-Template
├── tailwind.config.cjs      # Design-Token & Tailwind-Config
├── vite.config.js           # Vite-Konfiguration
├── package.json             # (keine Dependencies, platform-bereitgestellt)
└── AGENTS.md                # Entwicklerdokumentation
```

## Features

- ✓ **Responsive Design** – funktioniert auf Mobile (375px), Tablet (768px) und Desktop (1280px+)
- ✓ **Deep Links** – jeder Song hat eine eigene URL (`/songs/:id`)
- ✓ **Datenbank-Integration** – alle Songtexte laden aus PocketBase
- ✓ **Fehlerbehandlung** – Fallback-Daten bei Verbindungsfehlern
- ✓ **Barrierefreiheit** – semantisches HTML, gute Kontraste, Tastaturnavigation
- ✓ **Modern Design** – Schwarz-Weiß-Struktur mit Pastellfarben und botanischen Akzenten

## Technologien

- **Frontend:** React 18 + React Router v6
- **Build:** Vite
- **Styles:** Tailwind CSS v4
- **Backend:** PocketBase (REST API)
- **Hosting:** IONOS-Plattform

## Datenbank

Alle Inhalte kommen aus PocketBase:

- **albums** – 1 Album-Eintrag
- **songs** – 7 Lieder mit Texten, Tonart, BPM und Stimmung

Die Daten werden zur Laufzeit geladen, nicht im Frontend hardcoded.

## Umgebungsvariablen

Keine erforderlich. PocketBase nutzt automatisches Routing zum Backend.

## Git & Deployment

Das Projekt ist ein Git-Repository. Die `dist/` wird committed und vom Deployment automatisch deployed.

```bash
# Alle Änderungen commiten
git add .
git commit -m "feat: description"
git push origin dev

# Platform deployed automatisch
```

## Nächste Entwicklungsschritte

Siehe **`docs/handover/PROJECT_HANDOVER.md`** für:
- Vollständige Projektübersicht
- Offene Anforderungen & Backlog
- Bekannte Fehler & Technische Schulden
- Empfohlene nächste Steps

**Priorität v1.1:**
- Authentifizierung implementieren (Songtext-Schutz)
- Feedback-Kontaktform hinzufügen

## Support & Fragen

Alle Detailfragen beantwortet: **`docs/handover/PROJECT_HANDOVER.md`**

---

*Hinter der unsichtbaren Maske – v1.0*
*Ein Album über Neurodivergenz, Verwandlung und innere Welten.*
