# NeuroWays

Eine React-basierte Webanwendung für Neurodiversität-Awareness und Selbstbeobachtung.

## Projektübersicht

**NeuroWays** hilft neurodivergenten Menschen, ihre Energie, Regulation und inneren Ressourcen zu verstehen und zu verfolgen. Die Plattform bietet strukturierte Check-ins, Strategien und Ressourcen-Management.

### Stack

- **Frontend**: React 18 + Vite 6
- **Styling**: Tailwind CSS v4
- **Backend**: PocketBase (STRATO)
- **Hosting**: STRATO-Plattform
- **Versionierung**: GitHub (neuroways/Blueprint_AI)

### Entwicklungsstand

```
✅ Phase A – Datenbankschema definiert
✅ Phase B – Seed-Daten eingespielt
✅ Phase C – Frontend-Architektur & 17 Seiten
⏳ Phase D – Authentifizierung & Rollen (nächster Schritt)
⏳ Phase E – Energy Navigator Logik
⏳ Phase F – Administration
⏳ Phase G – Tests & QA
```

## Getting Started

### Installation

```bash
cd app
npm install  # (optional – keine Dependencies definiert)
```

### Entwicklung starten

```bash
npm run dev
```

Die App lädt auf `http://localhost:5173`.

### Build für Production

```bash
npm run build
```

Output geht in `dist/`.

## Wichtigste Dateien

Für die weitere Entwicklung zentral:

- **`src/App.jsx`** – Hauptrouter & Seitenauflösung
- **`src/core/routing/*`** – PageRegistry, PageResolver, Component-Registry
- **`src/lib/pb.ts`** – PocketBase Client (Dev/Prod URL-Routing)
- **`tailwind.config.cjs`** – Design-Tokens (Farben, Spacing, Typen)
- **`src/index.css`** – Global Styles & CSS Variables
- **`docs/handover/PROJECT_HANDOVER.md`** – Vollständige Projektdokumentation

## Architektur (Kurz)

```
Browser
  ↓
React Router (client-side)
  ↓
PageResolver (DB oder Fallback)
  ↓
Layout Shell (Header, Sidebar, Main)
  ↓
Page Components (lazy-loaded)
  ↓
PocketBase API (/.sfs-bd/ Dev, /.sfs-be/ Prod)
```

## Bekannte Anforderungen

Für eine neue Entwicklerin: Siehe **`docs/handover/PROJECT_HANDOVER.md`**

Kurz:

- [ ] Phase D: Authentifizierung (LoginPage, AuthService)
- [ ] Rollen & Berechtigungen in Navigation reflektieren
- [ ] Energy Navigator Logik (Check-in → Zonen-Klassifikation)
- [ ] Regulationstrategien, Ressourcen-Matrix, Interventionen (Inhalte)
- [ ] Admin-Panel (CRUD für Seiten, Module, Rollen)
- [ ] Tests & vollständige Barrierefreiheit-Prüfung

## Datenbank (PocketBase)

5 Collections:

- `app_modules` – Module (Platform, NeuroBalance, NeuroPlay, etc.)
- `app_pages` – Seiten & Meta (Routen, Beschreibungen)
- `app_navigation_items` – Nav-Einträge (Start, Übersicht, etc.)
- `app_navigation_roles` – Rollen-Mapping
- `app_page_permissions` – Zugriffskontrolle

Vollständiges Schema: siehe `docs/handover/PROJECT_HANDOVER.md` Sektion 10.

## Support & Fragen

Siehe **Offene Entscheidungen** in der Handover-Dokumentation:

1. Dark Mode – noch nicht geklärt
2. Energy Navigator Farben – braucht fachliche Spec
3. Rollen-Strategie – 6 Rollen definiert, aber noch nicht implementiert
4. Email-Benachrichtigungen – PocketBase Email API deaktiviert

## Nächste Schritte

**Phase D Startbereit:**

1. LoginPage implementieren
2. AuthService (PocketBase JWT)
3. ProtectedRoute Guard
4. Rollen in Navigation reflektieren

Detaillierter Plan in `docs/handover/PROJECT_HANDOVER.md` Sektion 25 & 26.

---

**Repository**: https://github.com/neuroways/Blueprint_AI

**Letzte Aktualisierung**: 2026-08-15
