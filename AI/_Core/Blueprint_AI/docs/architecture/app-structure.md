# NeuroWays App Structure Architecture

**Version:** 1.0  
**Last Updated:** 2026-07-25  
**Status:** Phase A-B Complete (Database & Seed Data), Phase C In Progress

---

## Overview

Die NeuroWays App-Struktur basiert auf einer datenbankgestützten Architektur, in der Module, Seiten, Navigation und Berechtigungen zentral in PocketBase verwaltet werden. Dies ermöglicht:

- Konsistente Hierarchie zwischen Dateisystem, URLs und Navigation
- Rollenbasierte Sichtbarkeit ohne hartcodierte Logik
- Einfache Erweiterung neuer Module ohne Code-Änderungen
- Zentrale Verwaltung aller strukturellen Entscheidungen

---

## 1. Database Schema

### Collections

#### `app_modules` (Modulregister)

Speichert alle verfügbaren Module im System.

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| `id` | text | Eindeutige ID (autogeneriert) |
| `module_key` | text | Stabiler Schlüssel (z.B. "platform", "neurobalance") |
| `name` | text | Anzeigetitel |
| `description` | text | Beschreibung |
| `base_path` | text | Basisroute (z.B. "/neurobalance") |
| `icon_key` | text | Icon-Referenz |
| `color_key` | text | Farb-Token |
| `module_version` | text | Versionsnummer |
| `module_status` | select | draft, active, deprecated, archived |
| `is_core_module` | bool | Kernmodul? |
| `is_enabled` | bool | Sichtbar in Navigation? |
| `sort_order` | number | Sortierung |
| `created` | autodate | Erstellungsdatum |
| `updated` | autodate | Änderungsdatum |

**Seed-Daten:**
```
- platform (active, enabled)
- neurobalance (active, enabled)
- neuroplay (draft, disabled)
- neurowork (draft, disabled)
- neurolearning (draft, disabled)
- admin (active, enabled)
```

#### `app_pages` (Seitenregister)

Speichert alle Seiten mit Routing- und Komponenteninformationen.

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| `id` | text | Eindeutige ID |
| `module_id` | relation | Zugehöriges Modul |
| `parent_page_id` | relation | Hierarchische Seite (optional) |
| `page_key` | text | Stabiler Schlüssel (z.B. "platform.home") |
| `title` | text | Seitentitel |
| `short_title` | text | Kurztitel für Breadcrumbs |
| `route_path` | text | URL-Route (z.B. "/", "/neurobalance") |
| `route_name` | text | Routenname für Verweise |
| `page_type` | select | dashboard, overview, list, detail, form, wizard, check_in, result, timeline, content, settings, admin, error, placeholder |
| `component_key` | text | Komponentenschlüssel (z.B. "platform_home") |
| `requires_auth` | bool | Authentifizierung erforderlich? |
| `is_landing_page` | bool | Landing-Seite? |
| `is_enabled` | bool | Aktiv? |
| `lifecycle_status` | select | draft, active, deprecated, archived |
| `created` | autodate | Erstellungsdatum |
| `updated` | autodate | Änderungsdatum |

#### `app_navigation_items` (Navigation)

Speichert Navigationshierarchie und Verweise.

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| `id` | text | Eindeutige ID |
| `navigation_key` | text | Stabiler Schlüssel |
| `navigation_area` | select | primary, module, context, mobile, user, footer, admin, quick_access |
| `page_id` | relation | Zielseite (optional) |
| `label` | text | Anzeigetext |
| `short_label` | text | Kurzetitel |
| `icon_key` | text | Icon-Referenz |
| `target_type` | select | page, external, group, action |
| `target_url` | text | Externe URL (bei target_type=external) |
| `sort_order` | number | Sortierposition |
| `show_in_desktop` | bool | Auf Desktop sichtbar? |
| `show_in_mobile` | bool | Auf Mobile sichtbar? |
| `show_in_breadcrumb` | bool | In Breadcrumbs anzeigen? |
| `is_enabled` | bool | Aktiv? |
| `created` | autodate | Erstellungsdatum |
| `updated` | autodate | Änderungsdatum |

#### `app_navigation_roles` (Rollenfreigaben)

Bestimmt, welche Rollen Navigationselemente sehen dürfen.

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| `navigation_item_id` | relation | Navigationseintrag |
| `role_key` | select | member, team_manager, organization_admin, coach, researcher, neuroways_admin |
| `access_level` | text | view, edit, manage (erweiterbar) |

#### `app_page_permissions` (Seitenberechtigung)

Bestimmt rollenbasierte Aktionen auf Seiten.

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| `page_id` | relation | Seite |
| `role_key` | select | Rollentyp |
| `can_view` | bool | Seite sehen? |
| `can_create` | bool | Inhalte erstellen? |
| `can_update` | bool | Inhalte ändern? |
| `can_delete` | bool | Inhalte löschen? |

---

## 2. Seed-Daten Status

### Module (6 Einträge)
- ✅ `platform` – Kern, aktiv
- ✅ `neurobalance` – Aktiv
- ⏳ `neuroplay` – Draft, deaktiviert
- ⏳ `neurowork` – Draft, deaktiviert
- ⏳ `neurolearning` – Draft, deaktiviert
- ✅ `admin` – Kern, aktiv

### Seiten (17 Einträge)

**Platform Core:**
- ✅ `auth.login` → `/login`
- ✅ `auth.invitation` → `/invitation/:token`
- ✅ `platform.onboarding` → `/onboarding`
- ✅ `platform.home` → `/`
- ✅ `platform.today` → `/today`
- ✅ `platform.profile` → `/profile`

**NeuroBalance:**
- ✅ `neurobalance.overview` → `/neurobalance`
- ✅ `neurobalance.energy.overview` → `/neurobalance/energy`
- ✅ `neurobalance.energy.check_in` → `/neurobalance/energy/check-in`
- ✅ `neurobalance.energy.history` → `/neurobalance/energy/history`
- ✅ `neurobalance.regulation.overview` → `/neurobalance/regulation`
- ✅ `neurobalance.resources.overview` → `/neurobalance/resources`
- ✅ `neurobalance.interventions.list` → `/neurobalance/interventions`
- ✅ `neurobalance.development.timeline` → `/neurobalance/development`

**System:**
- ✅ `system.forbidden` → `/forbidden`
- ✅ `system.error` → `/error`
- ✅ `system.not_found` → `*`

---

## 3. Frontend Architecture

### Directory Structure

```
src/
├── app/
│   ├── App.jsx                  # Root component
│   ├── router/                  # Routing logic
│   └── providers/               # Context providers
│
├── core/
│   ├── auth/                    # Authentication
│   ├── access/                  # Access control
│   ├── database/                # Schema definitions
│   ├── navigation/              # Navigation service
│   ├── routing/                 # Page registry
│   ├── modules/                 # Module registry
│   ├── errors/                  # Error handling
│   └── visibility/              # Visibility rules
│
├── shell/
│   ├── components/              # Layout components
│   ├── Header/
│   ├── Sidebar/
│   └── MobileNavigation/
│
├── design-system/               # Design tokens
├── shared/
│   ├── components/
│   └── utils/
│
├── page-templates/              # Generic page templates
│   ├── PlaceholderPage.jsx      # ✅ Placeholder für unfertige Seiten
│   ├── ErrorPage.jsx            # ✅ Fehlerseite
│   ├── DashboardPage.jsx        # ⏳ Dashboard-Vorlage
│   └── ListPage.jsx             # ⏳ Listen-Vorlage
│
├── platform/
│   └── pages/                   # Platform-Module
│
├── modules/
│   ├── neurobalance/            # NeuroBalance
│   │   └── pages/
│   ├── neuroplay/               # NeuroPlay (vorbereitet)
│   ├── neurowork/               # NeuroWork (vorbereitet)
│   └── neurolearning/           # NeuroLearning (vorbereitet)
│
└── administration/              # Admin-Panel
    └── pages/
```

### Kernkomponenten

#### `moduleRegistry.ts`
Lädt und cacht Module aus der Datenbank.
```ts
export async function loadModules(): Promise<Module[]>
export function getEnabledModules(modules: Module[]): Module[]
export function getModuleByKey(modules: Module[], key: string): Module
```

#### `pageRegistry.ts`
Lädt aktive Seiten und bietet Komponentenauflösung.
```ts
export async function loadPages(): Promise<PageRecord[]>
export function getPageByKey(pages: PageRecord[], key: string): PageRecord
export function getPageByRoute(pages: PageRecord[], route: string): PageRecord
export const pageComponentRegistry = { ... }
```

#### `navigationService.ts`
Gibt Navigation nach Bereich und Gerät aus.
```ts
export async function loadNavigation(): Promise<NavigationItem[]>
export function getNavigationByArea(nav: NavigationItem[], area: string): NavigationItem[]
export function getNavigationForDevice(nav: NavigationItem[], area: string, device: 'desktop' | 'mobile'): NavigationItem[]
```

#### `pb.ts` (Shared PocketBase Client)
Zentrale Instanz für alle Datenbank-Zugriffe.
```ts
import { pb } from '@/lib/pb'
// Wird von allen Services importiert
```

---

## 4. Noch nicht implementiert (Roadmap)

### Phase C (Frontend-Integration)
- [ ] Router mit dynamischen Routen aus `app_pages`
- [ ] Layout-Shell (Header, Sidebar, MobileNav)
- [ ] Breadcrumb-Generator
- [ ] Rollenprüfung auf Seitenebene

### Phase D (Navigation)
- [ ] Primäre Navigation (Start, Mein Weg, Module, etc.)
- [ ] Benutzermenü
- [ ] Admin-Navigation

### Phase E (Administration)
- [ ] Modul-Übersichtsseite
- [ ] Seiten-Verwaltungsseite
- [ ] Navigations-Verwaltungsseite
- [ ] Strukturvalidierung & Prüfungen

### Phase F (Tests & Validierung)
- [ ] Eindeutigkeitsprüfungen
- [ ] Rollenfilter-Tests
- [ ] Mobilitäts-Tests
- [ ] Seitenberechtigung-Tests

---

## 5. Bekannte Limitierungen

1. **Email & Cron deaktiviert** – Die PocketBase Email API und Cron sind in dieser Umgebung nicht verfügbar. Alternative: Formulare speichern direkt in Sammlungen.

2. **Dev → Prod: Nur Schema, keine Daten** – Beim Publishing werden nur Collection-Definitionen kopiert, nicht die Daten. Seed-Daten müssen manuell in Production eingepflegt werden oder get-or-create Logik verwenden.

3. **Navigation ohne Rollen derzeit hart codiert** – Bis zur vollständigen Rollen-Integration können ausgewählte Navigationselemente auch im Frontend-Code definiert werden.

---

## 6. Nächste Schritte

1. **Phase C**: Router mit dynamischen Routen implementieren
2. **Phase D**: Primäre Navigation aus Datenbank laden und rendern
3. **Phase E**: Admin-Panel für Modulverwaltung
4. **Migration**: Bestehende NeuroBalance-Seiten registrieren

---

## 7. Referenzen

- PocketBase Schema-Dokumentation: `src/core/database/schema.ts`
- Module Registry: `src/core/modules/moduleRegistry.ts`
- Page Registry: `src/core/routing/pageRegistry.ts`
- Navigation Service: `src/core/navigation/navigationService.ts`
