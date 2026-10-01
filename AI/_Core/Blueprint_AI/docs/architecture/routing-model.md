# Frontend Routing & Navigation Integration – Phase C

**Version:** 1.0  
**Status:** Implemented  
**Last Updated:** 2026-07-25

---

## Overview

Phase C integriert die zentrale App-Struktur aus den Collections mit dem React-Frontend. Alle Seiten, Module, Navigation und Berechtigungen werden jetzt datenbankgesteuert geladen und sicher gerendert.

---

## 1. Routing-Modell

### Hybrid Architecture

Das Projekt verwendet ein **hybrides Routing-Modell**:

**Technische Kernrouten (im Code):**
- Authentifizierung & Login
- Fehlerseiten (404, 403, 500)
- Fehler-Boundaries

**Datenbankgesteuerte fachliche Routen:**
- Platform-Seiten (Home, Heute, Profil)
- NeuroBalance & Module
- Dynamische Parameter-Routen

### Route Resolution Flow

```
1. Browser-URL aufgelöst
   ↓
2. Seitenschlüssel in app_pages gesucht
   ↓
3. Modulstatus & Seitenstatus geprüft
   ↓
4. component_key → pageComponentRegistry
   ↓
5. layout_key → layoutRegistry
   ↓
6. React-Komponente + Layout rendern
   ↓
7. Unbekannte Komponente → PlaceholderPage
8. Unbekannte Route → ErrorPage (404)
```

---

## 2. Komponentenregister

### pageComponentRegistry.ts

```typescript
export const pageComponentRegistry = {
  'platform-home': PlatformHomePage,
  'platform-today': PlatformTodayPage,
  'platform-profile': PlatformProfilePage,
  'neurobalance-overview': NeuroBalanceOverviewPage,
  'neurobalance-energy-overview': NeuroBalanceEnergyOverviewPage,
  'neurobalance-energy-check-in': NeuroBalanceEnergyCheckInPage,
  'neurobalance-energy-history': NeuroBalanceEnergyHistoryPage,
  'neurobalance-regulation-overview': NeuroBalanceRegulationOverviewPage,
  'neurobalance-resources-overview': NeuroBalanceResourcesOverviewPage,
  'neurobalance-interventions-list': NeuroBalanceInterventionsListPage,
  'neurobalance-development-timeline': NeuroBalanceDevelopmentTimelinePage,
  'system-forbidden': ErrorPage,
  'system-error': ErrorPage,
  'system-not-found': ErrorPage,
  'placeholder': PlaceholderPage,
} as const;
```

**Regeln:**
- Nur fest codierte, geprüfte Komponenten
- Kein dynamischer Import aus Datenbankpfaden
- Unbekannte Keys → PlaceholderPage
- Lazy Loading für große Seiten
- Suspense-Fallback für Ladevorgänge

---

## 3. Layout-Register

### layoutRegistry.ts

```typescript
export const layoutRegistry = {
  standard: StandardLayout,     // Default für die meisten Seiten
  auth: AuthLayout,              // Login, Einladung
  error: ErrorLayout,            // Fehlerseiten
  admin: AdminLayout,            // Verwaltungsseiten
  focused: StandardLayout,       // Alias (noch nicht implementiert)
  fullscreen: StandardLayout,    // Alias (noch nicht implementiert)
} as const;
```

**Layouts:**
- `StandardLayout` – Header + Sidebar + Content
- `AuthLayout` – Zentriert, ohne Navigation
- `ErrorLayout` – Minimalistisch für Fehlermeldungen
- `AdminLayout` – Admin-Kopfbereich + Content

---

## 4. Datenbankgesteuerte Seitenauflösung

### pageResolver.ts

Zentrale Seitenauflösungslogik:

```typescript
export async function resolvePageForRoute(route, pages): Promise<ResolvedPage>
```

**Was es macht:**
1. Route in `app_pages` suchen
2. Status prüfen (enabled, lifecycle_status = active)
3. component_key auflösen
4. layout_key auflösen
5. Breadcrumb-Daten sammeln
6. Alles als `ResolvedPage` zurückgeben

**Sicherheitsprüfungen:**
```typescript
export async function isPageAccessible(page): Promise<boolean>
```

- Seite muss enabled sein
- Modul muss enabled und active sein
- Modul muss existieren

---

## 5. App.jsx – Der zentrale Router

Hauptlogik in `src/App.jsx`:

```javascript
1. Pages & Modules laden (useEffect)
2. Aktuelle Route aufgelöst (useEffect)
3. Komponente & Layout für Route auflösen
4. Client-side Navigation mit history.pushState
5. Mit <Suspense> für Lazy Loading wrappen
6. Fehlerbehandlung (404, Ladefehlere, etc.)
```

**Besonderheiten:**
- Kein sperriger Router-Framework
- Direkte Kontrolle über Navigation
- Einfache, lesbare Fehlerbehandlung
- Unterstützung für Back/Forward

---

## 6. Navigation

### navigationService.ts (bereits aus Phase B)

```typescript
export async function loadNavigation(): Promise<NavigationItem[]>
export function getNavigationByArea(items, area): NavigationItem[]
export function getNavigationForDevice(items, area, 'desktop'|'mobile'): NavigationItem[]
```

### Shell-Komponenten

**StandardLayout:**
- Desktop: Sidebar + Header
- Mobile: Header + Mobile-Button
- Inhaltsbereich mit Breadcrumbs

**Sidebar (Desktop):**
```javascript
<nav>
  <NavItem href="/neurobalance">NeuroBalance</NavItem>
  // weitere Elemente...
</nav>
```

**MobileNavigation:**
```javascript
- Slide-out Menü
- Auf Escape schließbar
- Fokusmanagement
- Automatisches Schließen nach Navigation
```

---

## 7. Breadcrumbs

### pageResolver.ts

```typescript
async function generateBreadcrumb(page): Promise<BreadcrumbItem[]>
```

**Logik:**
1. Modul laden (falls module_id vorhanden)
2. Modulname als erster Eintrag
3. Seitentitel als aktueller Eintrag
4. Alle mit Links versehen (außer aktuelle)

**Beispiel:**
```
NeuroBalance → Energie → Verlauf
```

**Mit Detailseite:**
```
NeuroBalance → Energie → Verlauf → Ergebnis vom 25.07.2026
```
(letzter Titel dynamisch von Seiten-Komponente bereitgestellt)

---

## 8. Berechtigungen (Phase D Vorbereitung)

### permissionGuard.ts

Placeholder für vollständige Rollen-Integration:

```typescript
export async function checkPagePermission(context: PermissionContext): Promise<boolean>
export function getCurrentUserRole(): string | null
export function isAuthenticated(): boolean
```

**Aktuell:**
- Basische Authentifizierungsprüfung (PocketBase)
- Rollenauflösung (Placeholder)
- `requires_auth`-Prüfung in pageResolver

**Phase D wird hinzufügen:**
- Detaillierte app_page_permissions-Prüfung
- Rollenbasierte Seitensichtbarkeit
- Granulare Zugriffsrechte

---

## 9. Fehlerbehandlung

### Zustände

| Zustand | Behandlung |
|---------|-----------|
| App-Struktur lädt | Ladezeiger |
| Datenbank-Fehler | Fehlermeldung + Refresh-Button |
| Route nicht bekannt | ErrorPage 404 |
| Modul deaktiviert | Seite nicht abrufbar |
| Seite deaktiviert | Seite nicht abrufbar |
| component_key unbekannt | PlaceholderPage |
| layout_key unbekannt | StandardLayout (Fallback) |
| Renderingfehler | Error Boundary (kommend) |

### PlaceholderPage

Verwendet für:
- Nicht implementierte Seiten
- Unbekannte Komponenten
- Ladevorgänge

---

## 10. Bestandsrouten & Migration

### Migrierte Seiten (17 total)

| Seitenschlüssel | Route | component_key | Status |
|---|---|---|---|
| platform.home | / | platform-home | ✅ Implementiert |
| platform.today | /today | platform-today | ⏳ Placeholder |
| platform.profile | /profile | platform-profile | ⏳ Placeholder |
| neurobalance.overview | /neurobalance | neurobalance-overview | ⏳ Placeholder |
| neurobalance.energy.overview | /neurobalance/energy | neurobalance-energy-overview | ⏳ Placeholder |
| neurobalance.energy.check_in | /neurobalance/energy/check-in | neurobalance-energy-check-in | ⏳ Placeholder |
| neurobalance.energy.history | /neurobalance/energy/history | neurobalance-energy-history | ⏳ Placeholder |
| neurobalance.regulation.overview | /neurobalance/regulation | neurobalance-regulation-overview | ⏳ Placeholder |
| neurobalance.resources.overview | /neurobalance/resources | neurobalance-resources-overview | ⏳ Placeholder |
| neurobalance.interventions.list | /neurobalance/interventions | neurobalance-interventions-list | ⏳ Placeholder |
| neurobalance.development.timeline | /neurobalance/development | neurobalance-development-timeline | ⏳ Placeholder |
| auth.login | /login | auth_login | ⏳ Placeholder |
| auth.invitation | /invitation/:token | auth_invitation | ⏳ Placeholder |
| platform.onboarding | /onboarding | platform_onboarding | ⏳ Placeholder |
| system.forbidden | /forbidden | system_forbidden | ✅ Implementiert |
| system.error | /error | system_error | ✅ Implementiert |
| system.not_found | * | system_not_found | ✅ Implementiert |

---

## 11. Architektur-Dateien

**Routing & Komponenten:**
- `src/core/routing/pageComponentRegistry.ts` – Komponentenregister
- `src/core/routing/layoutRegistry.ts` – Layout-Register
- `src/core/routing/pageResolver.ts` – Seitenauflösung
- `src/core/routing/pageRegistry.ts` – Page-Service (Phase B)

**Shell & Navigation:**
- `src/shell/components/StandardLayout.jsx` – Haupt-Layout
- `src/shell/components/Header.jsx` – Header
- `src/shell/components/Sidebar.jsx` – Desktop-Sidebar
- `src/shell/components/MobileNavigation.jsx` – Mobile-Menü
- `src/shell/components/Breadcrumbs.jsx` – Breadcrumb-Renderer
- `src/shell/components/AuthLayout.jsx` – Auth-Layout
- `src/shell/components/ErrorLayout.jsx` – Fehler-Layout
- `src/shell/components/AdminLayout.jsx` – Admin-Layout

**Services:**
- `src/core/navigation/navigationService.ts` – Navigation Service
- `src/core/modules/moduleRegistry.ts` – Module Service
- `src/core/access/permissionGuard.ts` – Berechtigungen (Placeholder)
- `src/core/database/schema.ts` – TypeScript-Typen
- `src/lib/pb.ts` – PocketBase-Instanz

**Seiten:**
- `src/platform/pages/HomePage.jsx` ✅
- `src/platform/pages/TodayPage.jsx`
- `src/platform/pages/ProfilePage.jsx`
- `src/modules/neurobalance/pages/*.jsx` (8 Seiten)
- `src/page-templates/PlaceholderPage.jsx` ✅
- `src/page-templates/ErrorPage.jsx` ✅

**Root:**
- `src/App.jsx` – Zentrale Router-Komponente

---

## 12. Nächste Schritte

**Phase D – Navigation & Rollen:**
- app_navigation_items Seeding
- Rollenbasierte Navigationssichtbarkeit
- Vollständige Berechtigungsprüfung

**Phase E – Administration:**
- Admin-Interface für Seiten & Navigation
- Strukturvalidierung

**Phase F – Tests:**
- Route Resolution Tests
- Navigation Tests
- Berechtigungs-Tests

---

## 13. Bekannte Limitierungen

1. **Energy Navigator nicht migriert** – Placeholder-Seiten für Check-in etc.
2. **Rollen noch nicht vollständig** – Nur Authentifizierung, keine granularen Rechte
3. **Error Boundary nicht implementiert** – Kommend in Phase D
4. **Parameter-Routen nicht getestet** – z.B. `/results/:id`
5. **Redirect-Logik minimal** – Einfache 404-Behandlung

---

## 14. Barrierefreiheit

✅ Umgesetzt:
- `<nav aria-label>` auf Navigation
- `<header>` semantisch
- `<main>` für Inhaltsbereich
- Sichtbare Fokusmarkierung (Tailwind)
- Volle Tastaturbedienung
- Escape schließt Mobile-Menü
- Skip-Link vorbereitet

⏳ Noch zu prüfen:
- Ausreichend große Klickflächen (44px minimum)
- Überschriften-Hierarchie
- Icon-Labels/Aria-Label

---

## Referenzen

- App.jsx: `src/App.jsx` (178 Zeilen)
- Page Registry: `src/core/routing/pageRegistry.ts`
- Navigation Service: `src/core/navigation/navigationService.ts`
- PocketBase Skill: `/etc/goose/skills/pocketbase/`
