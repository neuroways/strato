# Tennis Tournament Management System – Tennisturnier Neindorf

Ein vollständig integriertes Tennis-Turnierverwaltungssystem mit öffentlicher Website und Admin-Dashboard.

**Status:** Phase 3 – Public Website Live (mit kritischen Mängeln)  
**Entwicklungsstand:** 80% – [Siehe Projekthandover](docs/handover/PROJECT_HANDOVER.md)

---

## Schnelleinstieg

```bash
# Installation
cd app
npm install  # (derzeit keine Abhängigkeiten)

# Entwicklung starten
npm run dev
# Browser: http://localhost:5173

# Für Production bauen
npm run build
npm run preview
```

**Hinweis:** Die öffentliche Website ist live, aber **Admin-Login funktioniert nicht**. Siehe [Kritische Fehler](#kritische-fehler).

---

## Was ist das Projekt?

Ein Verwaltungssystem für Tennisturniere mit zwei Interfaces:

### 🌐 Öffentliche Website
- Startseite mit aktuellem Turnier
- Turnierübersicht
- Spielplan nach Runden
- Ergebnisse mit Gewinner-Hervorhebung
- Teilnehmerverzeichnis
- News & Ankündigungen
- Platz-Übersicht
- Kontaktformular

**Live:** https://sfs-mspag4s8bxkf.live-website.com/

### 👨‍💼 Admin-Dashboard
- Turnier-Verwaltung (CRUD)
- Spieler-Verwaltung
- Anmeldungs-Management
- Spielplan-Erstellung
- Ergebnisse-Erfassung
- News-Verwaltung
- Platz-Verwaltung
- Statistiken & Übersicht

**[STATUS: NICHT FUNKTIONSFÄHIG – Login broken]**

---

## Technologie

| Bereich | Technologie |
|---------|------------|
| **Frontend Framework** | React 18 + Vite |
| **Styling** | Tailwind CSS v4 |
| **Routing** | react-router v7 |
| **Sprache** | TypeScript + JSX |
| **Backend / Datenbank** | PocketBase (SQLite) |
| **Icons** | lucide-react |
| **Deployment** | STRATO AI Builder |

**Besonderheit:** Keine custom npm-Dependencies – alles platform-provided.

---

## Projektstruktur

```
app/
├── src/
│   ├── components/        # UI-Komponenten (CRUDTable, EditModal)
│   ├── lib/               # API Utilities, Types, Hooks
│   ├── pages/
│   │   ├── admin/         # 12 Management-Seiten
│   │   └── public/        # 10 öffentliche Seiten
│   ├── services/          # 12 Business Logic Services
│   ├── App.jsx            # Routing
│   └── main.jsx           # Entry Point
│
├── dist/                  # Built Assets (committed)
├── docs/
│   └── handover/
│       └── PROJECT_HANDOVER.md  # [← Detaillierte Dokumentation lesen]
└── vite.config.js         # Build-Konfiguration
```

**Für Dokumentation:** → [docs/README.md](docs/README.md)

---

## Kritische Fehler

### ❌ Admin-Login funktioniert nicht

**Symptom:** `404 Missing or invalid auth collection context`

**Grund:** `admins` Collection wurde versehentlich gelöscht

**Impact:**
- Kein Admin-Login möglich
- Admin-Panel nicht erreichbar
- Keine CRUD-Operationen möglich

**Nächste Schritte:**
1. Lies [docs/INCIDENT_REPORT_ADMINS_COLLECTION.md](docs/INCIDENT_REPORT_ADMINS_COLLECTION.md)
2. Folge dem Restore-Prozess
3. Teste Admin-Login erneut

---

## Architekturdatenfluss

```
User (Browser)
    ↓
React Component (Seite)
    ↓
Service Layer (Business Logic)
    ↓
API Utilities (REST)
    ↓
PocketBase SDK
    ↓
SQLite Datenbank
    ↓
(Daten zurück zum User)
```

**Wichtig:** Diese Architektur ist unveränderlich. Direktaufrufe zu PocketBase sind verboten.

---

## Development

### Lokale Entwicklung starten

```bash
cd app
npm run dev
```

Dev-Server läuft mit Hot Module Replacement – Änderungen erscheinen sofort.

### Debugging

**Browser Console:**
- Öffne DevTools (F12)
- Network Tab zeigt API-Aufrufe
- Console zeigt Fehler

**Log-Dateien:**
```bash
tail -f ../logs/vite_console.log
tail -f ../logs/vite_build.log
```

### Services debuggen

Alle Services in `src/services/` verwenden einheitliches Format:

```typescript
const result = await TournamentService.getAllTournaments();
if (!result.success) {
  console.error(result.error); // Fehlermeldung
} else {
  console.log(result.data);    // Daten
}
```

---

## Build & Deploy

### Production-Build

```bash
npm run build:prod
```

Generiert optimierte Assets in `dist/`.

### Deploy-Prozess

```bash
# Änderungen committen
git add .
git commit -m "feat: neue Feature"

# Push triggert Auto-Deploy
git push
```

Die Website wird automatisch neu gebaut und deployed.

---

## Datenbank-Konfiguration

### PocketBase Admin Panel

**Development:** `/.sfs-bd/admin/`  
**Production:** `/.sfs-be/admin/`

Aktuell nicht erreichbar (Admin-Authentifizierung broken).

### Collections

15 Collections mit vollständigem Schema – siehe [docs/database/database.md](docs/database/database.md)

**Wichtig:** API Rules manuell gesetzt, nicht in Code. Siehe [docs/TECHNICAL_CHANGELOG.md](docs/TECHNICAL_CHANGELOG.md#api-rules)

---

## Testing

### Manuelles Testen

Öffne die Website im Browser:
- Development: http://localhost:5173
- Production: https://sfs-mspag4s8bxkf.live-website.com/

**Test-Checklist:** [docs/testing/testing.md](docs/testing/testing.md)

### Automatisierte Tests

Nicht vorhanden. Geplant für Phase 4+.

---

## Dokumentation

| Dokument | Inhalt |
|----------|--------|
| **[PROJECT_HANDOVER.md](docs/handover/PROJECT_HANDOVER.md)** | Komplette Projektübergabe – alles erforderlich für Weiterentwicklung |
| [docs/database/database.md](docs/database/database.md) | Datenbank-Schema, Collections, Relationen |
| [docs/api/api.md](docs/api/api.md) | REST API, PocketBase SDK, Utility-Funktionen |
| [docs/architecture/architecture.md](docs/architecture/architecture.md) | System-Übersicht, Datenfluss |
| [docs/frontend/frontend.md](docs/frontend/frontend.md) | React-Komponenten, Routing, Pages |
| [docs/backend/backend.md](docs/backend/backend.md) | Service Layer, alle 12 Services |
| [docs/decisions/decisions.md](docs/decisions/decisions.md) | 17 technische Entscheidungen |
| [docs/CRITICAL_INFRASTRUCTURE_PROTECTION_MANDATE.md](docs/CRITICAL_INFRASTRUCTURE_PROTECTION_MANDATE.md) | Schutzrichtlinien für kritische Komponenten |
| [docs/INCIDENT_REPORT_ADMINS_COLLECTION.md](docs/INCIDENT_REPORT_ADMINS_COLLECTION.md) | Incident-Analyse & Restore-Prozess |

---

## Offene Anforderungen

**P0 (Blockierend):**
- [ ] admins Collection wiederherstellen
- [ ] API Rules konsistent setzen

**P1 (Nächste Woche):**
- [ ] Testdaten eintragen
- [ ] Admin-Panel + Public Website testen
- [ ] Contact-Formular funktionsfähig machen

**P2+ (Später):**
- [ ] Rollenmodell vollständig implementieren
- [ ] Unit Tests
- [ ] Search & Filter
- [ ] AI-Schedule-Generation

Für alle offenen Anforderungen: Siehe [PROJECT_HANDOVER.md § 18-26](docs/handover/PROJECT_HANDOVER.md#18-offene-anforderungen-und-backlog).

---

## Sicherheit

### Critical Infrastructure Protection Mandate

Alle kritischen Komponenten (Auth, API Rules, Datenbank-Schema) sind geschützt. Siehe [docs/CRITICAL_INFRASTRUCTURE_PROTECTION_MANDATE.md](docs/CRITICAL_INFRASTRUCTURE_PROTECTION_MANDATE.md) für Richtlinien vor Änderungen.

### Keine Secrets im Repository

- `.env.example` nur mit Platzhaltern
- Echte Passwörter nur im PocketBase Admin Panel
- Tokens gehören nicht ins Git

---

## Kontakt & Support

Für Fragen zum Projekt:

1. **Projekthandover lesen** → [docs/handover/PROJECT_HANDOVER.md](docs/handover/PROJECT_HANDOVER.md)
2. **Spezifische Dokumentation** → [docs/README.md](docs/README.md)
3. **Technische Schulden & Fehler** → [PROJECT_HANDOVER.md § 19-20](docs/handover/PROJECT_HANDOVER.md#19-bekannte-fehler)

---

**Zuletzt aktualisiert:** 15.08.2026  
**Nächster kritischer Schritt:** Admins Collection restore (P0-1)
