# NeuroWays App — Changelog

## Version 1.0.0 — 2026-07-25

### Neu (Phase C: Frontend-Architektur)

- ✅ Datenbankgesteuerte Seitenauflösung aus `app_pages` Collection
- ✅ Modul-Registry mit aktiven/inaktiven Modulen (6 Module: Platform, NeuroBalance, Admin, NeuroPlay, NeuroWork, NeuroLearning)
- ✅ Seiten-Registry mit 17 registrierten Seiten
- ✅ Navigation Service lädt Navigationselemente aus Datenbank
- ✅ Responsive App Shell mit Header, Sidebar (Desktop) und Mobile Navigation
- ✅ Breadcrumb-Generierung aus Seitenhierarchie
- ✅ Komponentenregister für sichere React-Komponenten-Auflösung
- ✅ Layout-Register (standard, auth, error, admin, focused, fullscreen)
- ✅ Client-seitige Navigation ohne Seiten-Reload
- ✅ Fehlerseiten (404, 403, 500)
- ✅ Placeholder-Seiten für noch-nicht-implementierte Features
- ✅ Beschreibungen auf allen Seiten (aus Datenbank geladen)
- ✅ Sidebar-Navigation mit korrekten Route-Paths
- ✅ Homepage mit Module-Übersicht und aktiven Seiten
- ✅ NeuroBalance mit 8 Bereichen: Übersicht, Energie, Regulation, Ressourcen, Interventionen, Entwicklung
- ✅ Admin-Bereich
- ✅ Tastaturbedienung und Accessibility-Grundlagen

### Behoben

- ✅ PocketBase-Endpunkt auf korrekte Dev-URL (/.sfs-bd/) gesetzt
- ✅ Admin-Seite lädt jetzt korrekt
- ✅ NeuroBalance-Seiten mit korrektem Lazy-Loading
- ✅ Navigation-Links verwenden jetzt route_path statt page_id
- ✅ Duplicate Navigation Items entfernt
- ✅ Bootstrap-Konflikt behoben

### Datenbank

**Seeded Collections:**
- `app_modules` (6 Module)
- `app_pages` (17 Seiten)
- `app_navigation_items` (4 navigierbare Einträge)
- `app_navigation_roles` (6 Rollen: member, team_manager, organization_admin, coach, researcher, neuroways_admin)
- `app_page_permissions` (Struktur vorbereitet)

**Öffentliche Lesezugriffe:**
- `app_modules`: listRule/viewRule = "" (öffentlich)
- `app_pages`: listRule/viewRule = "" (öffentlich)
- `app_navigation_items`: listRule/viewRule = "" (öffentlich)

### Dokumentation

- ✅ `docs/architecture/app-structure.md` (Zielarchitektur)
- ✅ `docs/architecture/navigation-model.md` (Navigation)
- ✅ `docs/architecture/routing-model.md` (Routing)
- ✅ `docs/database/app-structure-schema.md` (Database Schema)
- ✅ `AGENTS.md` (Projektstatus)

### Noch nicht implementiert (Phase D/E)

- ⏳ Authentifizierung und Rollen-basierte Navigation
- ⏳ Energy Navigator Check-in-Logik
- ⏳ Speicherung von Check-in-Ergebnissen
- ⏳ Verlaufs-/History-Funktionalität
- ⏳ Permission Guards in vollen Umfang
- ⏳ NeuroPlay, NeuroWork, NeuroLearning Implementierung

### Build & Status

- ✅ Vite Build erfolgreich (254 KB Bundle, 77 KB gzip)
- ✅ TypeScript Kompilierung ohne Fehler
- ✅ Keine ausstehenden Änderungen im Working Tree
- ✅ 35 Commits in dev Branch

### Bekannte Limitationen

- Navigation Items noch manuell in Datenbank verwaltet (später Admin-UI)
- Check-in noch Placeholder
- Keine automatisierten Tests (später)
- Keine CI/CD Pipeline (später)
