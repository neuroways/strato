# NeuroWays App Structure – Database Schema

**Version:** 1.0  
**Status:** Deployed to STRATO Dev & Prod  
**Last Updated:** 2026-07-25

---

## Collections Deployed

### 1. `app_modules`

Registeriert alle fachlichen Module im System (Platform, NeuroBalance, etc.).

**Fields:**
- `module_key` (text) – Stabiler Schlüssel, z.B. "platform", "neurobalance"
- `name` (text) – Anzeigetitel
- `description` (text) – Beschreibung
- `base_path` (text) – Basisroute, z.B. "/neurobalance"
- `module_status` (select) – draft | active | deprecated | archived
- `is_enabled` (bool) – Sichtbar in Navigation?
- `sort_order` (number) – Sortierposition

**Seed Data:**
```
platform       → Platform Core (active, enabled, sort=1)
neurobalance   → NeuroBalance (active, enabled, sort=2)
neuroplay      → NeuroPlay (draft, disabled, sort=3)
neurowork      → NeuroWork (draft, disabled, sort=4)
neurolearning  → NeuroLearning (draft, disabled, sort=5)
admin          → Administration (active, enabled, sort=100)
```

**Deployment:** ✅ DEV & PROD

---

### 2. `app_pages`

Speichert alle Seiten mit Routing- und Komponenteninformationen.

**Fields:**
- `module_id` (text) – Zugehöriges Modul (Fremdschlüssel-String)
- `page_key` (text) – Stabiler Schlüssel, z.B. "platform.home"
- `title` (text) – Seitentitel
- `route_path` (text) – URL-Route, z.B. "/"
- `page_type` (select) – dashboard | overview | list | detail | form | wizard | check_in | result | timeline | content | settings | admin | external | error | placeholder
- `component_key` (text) – Komponentenschlüssel, z.B. "platform_home"
- `is_enabled` (bool) – Aktiv?
- `lifecycle_status` (select) – draft | active | deprecated | archived

**Seed Data (17 Pages):**

**Platform Core:**
```
auth.login                → /login (form)
auth.invitation           → /invitation/:token (wizard)
platform.onboarding       → /onboarding (wizard)
platform.home             → / (dashboard)
platform.today            → /today (dashboard)
platform.profile          → /profile (form)
```

**NeuroBalance:**
```
neurobalance.overview            → /neurobalance (overview)
neurobalance.energy.overview     → /neurobalance/energy (overview)
neurobalance.energy.check_in     → /neurobalance/energy/check-in (check_in)
neurobalance.energy.history      → /neurobalance/energy/history (list)
neurobalance.regulation.overview → /neurobalance/regulation (overview)
neurobalance.resources.overview  → /neurobalance/resources (overview)
neurobalance.interventions.list  → /neurobalance/interventions (list)
neurobalance.development.timeline → /neurobalance/development (timeline)
```

**System:**
```
system.forbidden  → /forbidden (error)
system.error      → /error (error)
system.not_found  → * (error)
```

**Deployment:** ✅ DEV & PROD

---

### 3. `app_navigation_items`

Speichert Navigationshierarchie und Verweise.

**Fields:**
- `navigation_key` (text) – Stabiler Schlüssel
- `navigation_area` (select) – primary | module | context | mobile | user | footer | admin | quick_access
- `page_id` (text) – Zielseite ID (optional)
- `label` (text) – Anzeigetext
- `icon_key` (text) – Icon-Referenz
- `target_type` (select) – page | external | group | action
- `sort_order` (number) – Sortierposition
- `show_in_desktop` (bool) – Auf Desktop sichtbar?
- `show_in_mobile` (bool) – Auf Mobile sichtbar?
- `is_enabled` (bool) – Aktiv?

**Seed Data:** Vorbereitet für Phase D (Navigation Implementation)

**Deployment:** ✅ DEV & PROD (leer, für Phase D)

---

### 4. `app_navigation_roles`

Bestimmt, welche Rollen Navigationselemente sehen dürfen.

**Fields:**
- `navigation_item_id` (text) – Navigationseintrag ID
- `role_key` (select) – member | team_manager | organization_admin | coach | researcher | neuroways_admin
- `access_level` (text) – view | edit | manage (erweiterbar)

**Seed Data:** Vorbereitet für Phase D

**Deployment:** ✅ DEV & PROD (leer)

---

### 5. `app_page_permissions`

Bestimmt rollenbasierte Aktionen auf Seiten.

**Fields:**
- `page_id` (text) – Seite ID
- `role_key` (select) – Rollentyp
- `can_view` (bool) – Seite sehen?
- `can_create` (bool) – Inhalte erstellen?
- `can_update` (bool) – Inhalte ändern?
- `can_delete` (bool) – Inhalte löschen?

**Seed Data:** Vorbereitet für Phase D (Access Control Implementation)

**Deployment:** ✅ DEV & PROD (leer)

---

## Deployment Status

| Collection | DEV | PROD | Items | Status |
|-----------|-----|------|-------|--------|
| app_modules | ✅ | ✅ | 6 | Seeded |
| app_pages | ✅ | ✅ | 17 | Seeded |
| app_navigation_items | ✅ | ✅ | 0 | Prepared |
| app_navigation_roles | ✅ | ✅ | 0 | Prepared |
| app_page_permissions | ✅ | ✅ | 0 | Prepared |

---

## Data Synchronization

**STRATO Publikationsmodell:**
- Collections (Schemas) werden bei `vite build` in Prod synchronisiert
- **Seeded Data wird nicht kopiert** – Prod erhält leere Collections
- Alle 17 Seiten und 6 Module wurden manuell in beide Umgebungen eingespeichert
- Die Daten sind somit in DEV und PROD identisch

---

## Next Steps

**Phase C:** Router-Integration
- `src/core/routing/router.ts` – Dynamische Routen aus app_pages laden
- Komponentenauflösung über `component_key`
- Authentifizierung & Berechtigungsprüfung

**Phase D:** Navigation
- Navigation aus app_navigation_items laden
- Rollenfilterung mit app_navigation_roles
- Primäre, Modul- und Benutzermenü-Navigation

**Phase E:** Admin
- Seiten- und Navigations-Verwaltung
- Strukturvalidierung

---

## References

- Schema TypeScript Types: `src/core/database/schema.ts`
- Module Registry: `src/core/modules/moduleRegistry.ts`
- Page Registry: `src/core/routing/pageRegistry.ts`
- Navigation Service: `src/core/navigation/navigationService.ts`
- PocketBase Skill: `/etc/goose/skills/pocketbase/`
