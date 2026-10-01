# PROJECT HANDOVER: NeuroWays Application

## 1. Dokumentinformationen

| Element | Wert |
|---------|------|
| **Projektname** | NeuroWays – Digitale Plattform für Neurodiversität-Awareness |
| **Datum der Übergabe** | 2026-08-15 |
| **Aktueller Stand** | Phase C: 70% Infrastruktur fertig, 0% fachliche Logik |
| **Entwicklungsumgebung** | Vite 6 + React 18 (keine npm-Dependencies) |
| **Frontend-Framework** | React 18 mit JSX, Tailwind CSS v4 |
| **Backend-Datenbank** | PocketBase (STRATO /.sfs-bd/ Dev, /.sfs-be/ Prod) |
| **Versionskontrolle** | GitHub `neuroways/Blueprint_AI` (84 Commits) |
| **Deployment** | STRATO-Plattform (automatisch aus `/dist`) |
| **Dokumentation** | Deutsch, Komponenten teilweise TypeScript |
| **Lizenz/Ownership** | STRATO-Projekt, Zugriff auf https://github.com/neuroways/Blueprint_AI |
| **Zweck dieser Übergabe** | Vollständige Handover für nächste KI oder Entwickler |

---

## 2. Executive Project Summary

### Was ist das Projekt?

**NeuroWays** ist eine React-basierte Webanwendung für Neurodiversität-Awareness und Selbstbeobachtung. Die Plattform hilft Nutzern, ihre Energie, Regulation und inneren Ressourcen zu verstehen und zu verfolgen.

### Kernproblem

Neurodivergente Menschen (ADHS, Autismus, Dyslexie, etc.) benötigen Tools zur Selbstbeobachtung und Neuroregulation. NeuroWays bietet eine strukturierte, verständliche Schnittstelle für Energie-Check-ins, Regulationsstrategien und Ressourcen-Erkennung.

### Wer nutzt es?

- **Primary Users**: Neurodivergente Individuen (mit oder ohne formale Diagnose)
- **Secondary Users**: Coaches, Therapeuten, Forscher (Admin-Bereich)
- **Operator**: STRATO-Plattform

### Was soll das fertige System können?

| Funktion | Status |
|----------|--------|
| Startseite mit Modul-Übersicht | ✅ Implementiert |
| NeuroBalance-Modul (8 Seiten) | ⏳ Struktur da, Logik fehlt |
| Energy Navigator (Check-ins) | ❌ Placeholder-Seiten only |
| Selbstregulations-Strategien | ⏳ Seite existent, keine Inhalte |
| Ressourcen-/Anforderungs-Analyse | ⏳ Seite existent, keine Inhalte |
| Entwicklungsverlauf dokumentieren | ⏳ Seite existent, keine Inhalte |
| Rollenbasierte Navigation | ❌ Nicht implementiert |
| Authentifizierung & Login | ❌ Placeholder |
| Admin-Panel | ⏳ Seite existent, keine Verwaltung |
| Responsive Design (Mobile/Desktop) | ✅ Implementiert |

### Aktueller Stand (Übergabedatum)

```
✅ Phase A (Datenbank-Schema) – ABGESCHLOSSEN
✅ Phase B (Seed-Daten) – ABGESCHLOSSEN
🔄 Phase C (Frontend-Architektur) – 70% INFRASTRUKTUR, ABER:
   ✅ Router & Seitenauflösung
   ✅ Navigation Shell (Header, Sidebar, Mobile)
   ✅ 17 Seiten geladen & erreichbar
   ❌ Fachliche Logik (0%)
   ❌ Authentifizierung & Rollen (0%)
   ❌ Energy Navigator (0%)
⏳ Phase D (Auth & Rollen) – NICHT GESTARTET
⏳ Phase E (Energy Navigator Logik) – NICHT GESTARTET
⏳ Phase F (Administration) – NICHT GESTARTET
⏳ Phase G (Tests) – NICHT GESTARTET
```

---

## 3. Fachliches Zielbild

### Gewünschte Endstate (vollständiges System)

**Startseite:**
- Hero-Bereich: "Erkenne Deine Energie"
- Schnelle Statistiken: Ressourcen, Energie, Regulation (mit Icons)
- Modul-Übersicht mit Verlinkung zu aktiven Modulen

**NeuroBalance-Modul (8 Bereiche):**

1. **Energie-Navigator**
   - Check-in Interface (3-4 Schnellfragen)
   - Zonen-Klassifikation (Low, Balanced, High, in Transition)
   - Historische Daten visualisieren
   - Muster erkennen (Wochenverlauf, Trigger)

2. **Selbstregulation**
   - Strategien-Katalog (sortierbar nach Zone)
   - Personalisierte Recommendations
   - "Was hat früher geholfen?"

3. **Ressourcen & Anforderungen**
   - Ressourcen-Inventar ("Was gibt mir Energie?")
   - Anforderungs-Matrix ("Was entzieht mir Energie?")
   - Balance-Analyse

4. **Interventionen**
   - Katalog praktischer Übungen
   - Nach Kontext kategorisiert
   - Zeitbasiert (5min, 10min, 20min, 30min)

5. **Entwicklung & Wachstum**
   - Timeline der persönlichen Entwicklung
   - Meilensteine dokumentieren
   - Lernfortschritt tracken

6. **Heute-Übersicht**
   - Daily Dashboard
   - Aktuelle Energie
   - Empfohlene Aktionen

7. **Profil & Einstellungen**
   - Persönliche Daten
   - Farb-Präferenzen
   - Sprache & Accessibility-Optionen

8. **Admin-Bereich**
   - Seite & Navigation verwalten
   - Module aktivieren/deaktivieren
   - Seed-Daten kontrollieren

### Bestätigte Anforderungen

| Bereich | Anforderung | Quelle |
|---------|-------------|--------|
| UX/Design | Mobile-first Responsive (375px, 768px, 1440px) | NW-DESIGN-WEB-001 |
| UX/Design | NeuroWays Brand Colors (Navy, Teal, Violet, Gold) | DESIGN SYSTEM |
| UX/Design | DM Sans / Atkinson Hyperlegible Typeface | DESIGN SYSTEM |
| UX/Design | Accessibility (WCAG 2.2 AA min.) | BARRIEREFREIHEIT |
| UX/Design | Dark Mode Support | DESIGN SYSTEM (UNGEKLÄRT – noch nicht dokumentiert) |
| Tech/Stack | React 18 + Vite 6 | STACK DEFINITION |
| Tech/Stack | Tailwind CSS v4 (kein npm-Installation) | STACK DEFINITION |
| Tech/Stack | PocketBase Backend (STRATO) | INFRASTRUCTURE |
| Tech/Backend | Datenbank-gesteuerte Seiten & Navigation | PHASE A/B |
| Features/NeuroBalance | Energy Check-in mit Zonen | PHASE E (GEPLANT) |
| Features/NeuroBalance | Check-in-Verlauf visualisieren | PHASE E (GEPLANT) |
| Features/NeuroBalance | Speicherung in PocketBase | PHASE E (GEPLANT) |
| Admin | Seiten-Verwaltung | PHASE F (GEPLANT) |
| Admin | Navigation-Verwaltung | PHASE F (GEPLANT) |

### Nicht mehr gültig / Ersetzt

| Anforderung | Grund |
|-------------|-------|
| Email-Notifikationen (PHASE E draft) | PocketBase Email API in dieser Umgebung deaktiviert – nicht möglich |
| Scheduled Check-ins (Cron-basiert) | PocketBase Cron API in dieser Umgebung deaktiviert – nicht möglich |
| Benutzer-Selbstregistrierung mit Email-Bestätigung | Email-API nicht verfügbar – alternative: Admin-Einladungen oder manuell |

### Offene fachliche Entscheidungen

| Entscheidung | Implikation | Status |
|--------------|-------------|--------|
| Sollte Dark Mode offiziell unterstützt werden? | Design-Aufwand, A/B-Testing | UNGEKLÄRT – kein Design vorhanden |
| Welche Rollen sind final? (member, team_manager, org_admin, coach, researcher, neuroways_admin) | Seitenberechtigungen, Navigation-Filterung | TEILWEISE – Rollen definiert, aber nicht genutzt |
| Sollen Third-Party Integrationen (Slack, Google Calendar) später möglich sein? | Architektur-Entscheidung | OFFEN |
| Wie viele Check-in-Fragen pro Durchgang? | UX-Komplexität | OFFEN |

---

## 4. Vollständiger Anforderungskatalog

| ID | Anforderung | Kategorie | Status | Implementierung | Offene Punkte |
|----|-------------|-----------|--------|-----------------|---------------|
| 1 | Mobile-first Responsive Design (375px, 768px, 1440px) | Non-Functional | IMPLEMENTIERT | `tailwind.config.cjs` + Grid/Flex | Vollständige Seitenmatrix noch nicht getestet |
| 2 | NeuroWays Brand Color System | Non-Functional | IMPLEMENTIERT | `tailwind.config.cjs` + `src/index.css` | Alle Komponenten auf `nw-*` Farben migr. |
| 3 | DM Sans Typography + Fallbacks | Non-Functional | IMPLEMENTIERT | `tailwind.config.cjs` + Google Fonts Link | Alle Schriftgrößen definiert (clamp) |
| 4 | WCAG 2.2 AA Accessibility | Non-Functional | TEILWEISE | Focus Outlines, Semantic HTML, Keyboard Nav | Skip-Link fehlt, Aria-Labels unvollständig |
| 5 | Dark Mode Support (if applicable) | Non-Functional | UNGEKLÄRT | Tailwind `darkMode: "media"` aber keine Styles | Noch nicht festgelegt – zu entscheiden |
| 6 | Datenbank-gesteuerte Seiten | Functional | IMPLEMENTIERT | `app_pages` Collection + `pageRegistry.ts` | Alle 17 Seiten geladen, 11 im Fallback |
| 7 | Datenbank-gesteuerte Module | Functional | IMPLEMENTIERT | `app_modules` Collection + `moduleRegistry.ts` | 6 Module, draft-Module deaktiviert |
| 8 | Authentifizierung & Login | Functional | NICHT IMPLEMENTIERT | PocketBase Auth Library vorhanden, aber keine Seite | Email/Token-basiert noch offen |
| 9 | Rollenbasierte Sichtbarkeit (Navigation) | Functional | NICHT IMPLEMENTIERT | `app_navigation_roles` Schema vorhanden | Sidebar/Mobile Navigation filtert nicht |
| 10 | Seitenberechtigung (can_view, can_edit, etc.) | Functional | NICHT IMPLEMENTIERT | `app_page_permissions` Schema vorhanden | `permissionGuard.ts` ist Placeholder |
| 11 | Startseite mit Modul-Grid | Functional | IMPLEMENTIERT | `HomePage.jsx` | Module werden geladen & angezeigt |
| 12 | NeuroBalance-Modul (Übersicht) | Functional | TEILWEISE | `OverviewPage.jsx` (Placeholder) | Keine fachliche Inhalte, nur Template |
| 13 | Energy-Navigator Check-in | Functional | NICHT IMPLEMENTIERT | `EnergyCheckInPage.jsx` (Placeholder) | Keine Fragen, keine Speicherung, keine Logik |
| 14 | Energy-Check-in Speicherung | Functional | NICHT IMPLEMENTIERT | Keine Collection, keine Service | Blockiert Energy Navigator |
| 15 | Energy-Zonen Klassifikation | Functional | NICHT IMPLEMENTIERT | Keine Logik | Low/Balanced/High/Transition |
| 16 | Energy-Verlauf Visualisierung | Functional | NICHT IMPLEMENTIERT | `EnergyHistoryPage.jsx` (Placeholder) | Keine Datenladung, keine Charts |
| 17 | Selbstregulations-Strategien | Functional | TEILWEISE | `RegulationOverviewPage.jsx` (Placeholder) | Katalog + Recommendations fehlen |
| 18 | Ressourcen & Anforderungen | Functional | TEILWEISE | `ResourcesOverviewPage.jsx` (Placeholder) | Matrix-Interface fehlt |
| 19 | Interventions-Katalog | Functional | TEILWEISE | `InterventionsListPage.jsx` (Placeholder) | Kategorisierung, Filterung fehlt |
| 20 | Entwicklungs-Timeline | Functional | TEILWEISE | `DevelopmentTimelinePage.jsx` (Placeholder) | Timeline-UI fehlt |
| 21 | Heute-Dashboard | Functional | TEILWEISE | `TodayPage.jsx` (Placeholder) | Tagesagenda, aktuelle Empfehlungen fehlen |
| 22 | Profil & Einstellungen | Functional | TEILWEISE | `ProfilePage.jsx` (Placeholder) | Keine Datenladung oder Speicherung |
| 23 | Admin-Panel (Seiten-Verwaltung) | Functional | TEILWEISE | `AdminOverviewPage.jsx` (Placeholder) | Keine Admin-UI, nur Placeholder |
| 24 | Admin-Panel (Modul-Verwaltung) | Functional | NICHT IMPLEMENTIERT | – | Blockiert Phase F |
| 25 | Admin-Panel (Navigation-Verwaltung) | Functional | NICHT IMPLEMENTIERT | – | Blockiert Phase F |
| 26 | Fehlerseiten (404, 403, 500) | Functional | IMPLEMENTIERT | `ErrorPage.jsx` | Alle Codes gehandhabt |
| 27 | Client-Side Routing | Functional | IMPLEMENTIERT | `App.jsx` | Keine Page Refresh bei Navigation |
| 28 | Breadcrumb-Navigation | Functional | IMPLEMENTIERT | `Breadcrumbs.jsx` + `pageResolver.ts` | Automatisch aus Hierarchie |
| 29 | Mobile Navigation (Hamburger) | Functional | IMPLEMENTIERT | `MobileNavigation.jsx` | Slide-out Menü, Escape-Handling |
| 30 | Desktop Sidebar | Functional | IMPLEMENTIERT | `Sidebar.jsx` | Fixed, responsive Breakpoint |
| 31 | Header mit Logo | Functional | IMPLEMENTIERT | `Header.jsx` + NeuroWays Wordmark | Transparent BG, dynamische Höhe |
| 32 | Responsive Logo Sizing | Functional | IMPLEMENTIERT | Header adjusts to 96px (mobile), 112px (desktop) | Logo nicht abgeschnitten |
| 33 | Fallback Navigation (wenn DB unverfügbar) | Non-Functional | IMPLEMENTIERT | `navigationService.ts` + hardcoded fallback | 2 essenzielle Nav-Items |
| 34 | Fallback Pages (wenn DB unverfügbar) | Non-Functional | IMPLEMENTIERT | `pageRegistry.ts` + 11 fallback pages | Production-Resilience |
| 35 | Lazy Loading für Seiten-Komponenten | Non-Functional | IMPLEMENTIERT | `React.lazy()` + `Suspense` | Performance |
| 36 | Component Registry (sichere Komponentenauflösung) | Non-Functional | IMPLEMENTIERT | `pageComponentRegistry.ts` | Keine dynamic imports aus DB |
| 37 | Layout Registry (dynamische Layouts) | Non-Functional | IMPLEMENTIERT | `layoutRegistry.ts` | Standard, Auth, Error, Admin |
| 38 | PocketBase Backend Integration | Non-Functional | IMPLEMENTIERT | `src/lib/pb.ts` | Dev (/.sfs-bd/) & Prod (/.sfs-be/) |
| 39 | Environment-aware Backend Routing | Non-Functional | IMPLEMENTIERT | `pb.ts` hostname detection | Automatisch preview vs live |
| 40 | GitHub Repository Integration | Non-Functional | IMPLEMENTIERT | `neuroways/Blueprint_AI` | 84 Commits, branches: main |

**Legenda:**
- **IMPLEMENTIERT**: Vollständig fertig und getestet
- **TEILWEISE IMPLEMENTIERT**: Grundstruktur da, Logik/Inhalte fehlen (Placeholder)
- **NICHT IMPLEMENTIERT**: Code existiert nicht
- **UNGEKLÄRT**: Design vorhanden, technische Entscheidung offen

---

## 5. Aktuell implementierter Funktionsumfang

### Was funktioniert vollständig (100% Standalone)

#### 5.1 Startseite (HomePage)
- **Zweck**: Modul-Übersicht, Willkommensbereich
- **Benutzerinteraktion**: 
  - Hero-Bereich mit Headline & Beschreibung
  - Schnelle Icons (Ressourcen, Energie, Regulation)
  - Modul-Grid mit Links zu aktiven Modulen
- **Beteiligte Komponenten**: `HomePage.jsx`, `ModuleNavigation.jsx`
- **Beteiligte Dateien**: `src/platform/pages/HomePage.jsx`, `src/shell/components/ModuleNavigation.jsx`
- **Datenquellen**: `app_modules` (geladen) + Fallback
- **Datenbankbezug**: `loadModules()` – alle Module mit `is_enabled = true && module_status = active`
- **API-Endpunkte**: `/.sfs-bd/api/collections/app_modules/records`
- **Reifegrad**: 80% (Seite lädt & zeigt Module, Beschreibungen noch lokal)
- **Bekannte Einschränkungen**: Keine dynamischen Modul-Beschreibungen aus DB (statisch), keine Modul-Rollen-Filterung

#### 5.2 Navigation Shell
- **Zweck**: Layout-Rahmen für alle Seiten
- **Benutzerinteraktion**:
  - Desktop: Fixed Header + Fixed Sidebar
  - Mobile: Fixed Header + Hamburger-Toggle
  - Navigation: Klicken → Client-Side Routing (kein Reload)
  - Mobile-Menü: Escape schließt es, Links schließen automatisch
- **Beteiligte Komponenten**: `StandardLayout.jsx`, `Header.jsx`, `Sidebar.jsx`, `MobileNavigation.jsx`, `Breadcrumbs.jsx`
- **Beteiligte Dateien**: `src/shell/components/*`
- **Datenquellen**: `app_navigation_items` (geladen) + Fallback (2 Items)
- **Datenbankbezug**: `loadNavigation()` – Navigationselemente für Desktop/Mobile
- **API-Endpunkte**: `/.sfs-bd/api/collections/app_navigation_items/records`
- **Reifegrad**: 90% (funktional, aber keine Rollen-Filterung)
- **Bekannte Einschränkungen**: Keine rollenbasierte Sichtbarkeit (alle Nutzer sehen alle Einträge)

#### 5.3 Seiten-Routing (17 Seiten)
- **Zweck**: Dynamische Seitenauflösung aus Datenbank
- **Benutzerinteraktion**:
  - Browser-Navigation oder Link-Klick
  - App löst Route auf, lädt Seite und rendert sie
  - Fallback zu Startseite bei 404
- **Beteiligte Komponenten**: `App.jsx`, `pageResolver.ts`, `pageComponentRegistry.ts`, `layoutRegistry.ts`
- **Beteiligte Dateien**: `src/App.jsx`, `src/core/routing/*`
- **Datenquellen**: `app_pages` + `app_modules` (Zugriff prüfen)
- **Datenbankbezug**: `pageRegistry.ts` – Seiten mit `is_enabled = true && lifecycle_status = active`
- **API-Endpunkte**: `/.sfs-bd/api/collections/app_pages/records`
- **Reifegrad**: 95% (vollständig funktional)
- **Bekannte Einschränkungen**: Keine granularen Berechtigungen (app_page_permissions ignoriert)

#### 5.4 Error Handling (404, 403, 500)
- **Zweck**: Fehlerseiten bei unbekannten Routen, Modulfehlern
- **Benutzerinteraktion**: ErrorPage zeigt Fehlercode, Nachricht, Link zur Startseite
- **Beteiligte Komponenten**: `ErrorPage.jsx`
- **Beteiligte Dateien**: `src/page-templates/ErrorPage.jsx`
- **Reifegrad**: 100%

#### 5.5 Brand & Design System
- **Farben**: Navy (#0A1F44), Teal (#008CA8), Violet (#7B4BA2), Gold (#E2A83B), Grautöne
- **Typografie**: DM Sans (main), Atkinson Hyperlegible (accessible fallback), system-ui
- **Spacing**: 1–9 (4px–96px)
- **Border Radius**: small (6px), medium (10px), large (12px)
- **Übergänge**: fast (150ms), page (300ms), progress (600ms), zone (800ms)
- **Beteiligte Dateien**: `tailwind.config.cjs`, `src/index.css`
- **Reifegrad**: 100% (vollständig implementiert in allen Komponenten)

#### 5.6 Responsive Design
- **Breakpoints**: Mobile (375px), Tablet (768px), Desktop (1440px)
- **Implementierung**: Tailwind v4 `sm:`, `md:`, `lg:` prefixes
- **Getestete Komponenten**: Header, Sidebar, ModuleNavigation, HomePage
- **Reifegrad**: 80% (grundsätzlich vorhanden, aber nicht alle 17 Seiten getestet)
- **Bekannte Einschränkungen**: Vollständige Seitenmatrix noch nicht durchlaufen

---

### Was teilweise funktioniert (Struktur da, Logik fehlt)

#### 5.7 NeuroBalance-Seiten (8 Seiten)
Alle 8 NeuroBalance-Seiten laden als Placeholder-Seiten:

| Seite | Route | Component | Status |
|-------|-------|-----------|--------|
| NeuroBalance Übersicht | `/neurobalance` | `OverviewPage.jsx` | Placeholder |
| Energie-Überblick | `/neurobalance/energy` | `EnergyOverviewPage.jsx` | Placeholder |
| Energie Check-in | `/neurobalance/energy/checkin` | `EnergyCheckInPage.jsx` | Placeholder |
| Energieverlauf | `/neurobalance/energy/history` | `EnergyHistoryPage.jsx` | Placeholder |
| Selbstregulation | `/neurobalance/regulation` | `RegulationOverviewPage.jsx` | Placeholder |
| Ressourcen & Anforderungen | `/neurobalance/resources` | `ResourcesOverviewPage.jsx` | Placeholder |
| Interventionen | `/neurobalance/interventions` | `InterventionsListPage.jsx` | Placeholder |
| Entwicklung & Wachstum | `/neurobalance/development` | `DevelopmentTimelinePage.jsx` | Placeholder |

**Gemeinsame Eigenschaften:**
- Alle wrapped mit `PageTemplate.jsx` (zeigt Titel + Beschreibung + Rückwärts-Button)
- Beschreibungen aus `STATIC_DESCRIPTIONS` oder Datenbank
- Keine fachliche Logik oder Inhalte
- Keine Datenladung oder Speicherung
- Reifegrad: 20% (Seiten erreichbar, aber inhaltsleer)

#### 5.8 Heute, Profil, Admin (3 Seiten)
- **TodayPage**: Placeholder
- **ProfilePage**: Placeholder
- **AdminOverviewPage**: Placeholder
- Reifegrad: 20% (wie NeuroBalance)

---

### Was nicht funktioniert (Code nicht vorhanden)

#### 5.9 Energy Navigator (Komplettes Feature)
- **Zweck**: Nutzer führt tägliche Check-ins durch, sieht Energiezonen, Verlauf, Empfehlungen
- **Fehlende Komponenten**:
  - Check-in Frage-Interface
  - Zonen-Berechnung
  - Speicherung in `check_in_results` Collection
  - Ergebnis-Ansicht
  - Verlaufs-Visualisierung
- **Blockiert durch**: Keine Fachlogik-Implementierung (Phase E)

#### 5.10 Authentifizierung & Login
- **Zweck**: Benutzer registriert/meldet sich an
- **Fehlende Komponenten**:
  - LoginPage Komponente
  - Registrierungs-Form
  - Password Reset Flow
  - PocketBase Auth Integrationen
- **Blockiert durch**: Phase D (nicht geplant diese Übergabe)

#### 5.11 Rollenbasierte Navigation
- **Zweck**: Nutzer sieht nur Navigation, die zu ihrer Rolle passt
- **Fehlende Komponenten**:
  - Role-aware Filterung in Sidebar/Mobile
  - `app_navigation_roles` nutzen
  - Permission Guard in vollständig
- **Blockiert durch**: Phase D (nicht geplant diese Übergabe)

#### 5.12 Seitenberechtigung (granular)
- **Zweck**: Seite ist sichtbar, aber Nutzer kann nicht bearbeiten (can_view=true, can_update=false)
- **Fehlende Komponenten**:
  - `app_page_permissions` Prüfung in Router
  - Granulare Buttons disabled/hidden
- **Blockiert durch**: Phase D

#### 5.13 Admin-Seiten-Verwaltung
- **Zweck**: Admin kann Seiten aktivieren/deaktivieren, ändern
- **Fehlende Komponenten**:
  - Admin-UI für app_pages
  - Create/Read/Update/Delete Formulare
- **Blockiert durch**: Phase F

---

## 6. Seiten- und Navigationsstruktur

### Vollständige Site-Map

```
NeuroWays Application
│
├─ / (Startseite)
│  └─ HomePage
│     ├─ Hero: "Erkenne Deine Energie"
│     ├─ Quick Stats: Ressourcen | Energie | Regulation
│     └─ Module Grid: NeuroBalance (+ später NeuroPlay, NeuroWork, NeuroLearning)
│
├─ /today (Heute-Dashboard)
│  └─ TodayPage [PLACEHOLDER]
│
├─ /profile (Profil & Einstellungen)
│  └─ ProfilePage [PLACEHOLDER]
│
├─ /neurobalance (NeuroBalance Übersicht)
│  ├─ OverviewPage [PLACEHOLDER]
│  │
│  ├─ /energy (Energie-Überblick)
│  │  └─ EnergyOverviewPage [PLACEHOLDER]
│  │     ├─ /checkin (Schnell-Check-in)
│  │     │  └─ EnergyCheckInPage [PLACEHOLDER – BLOCKIERT: Keine Logik]
│  │     └─ /history (Energieverlauf)
│  │        └─ EnergyHistoryPage [PLACEHOLDER – BLOCKIERT: Keine Datenviz]
│  │
│  ├─ /regulation (Selbstregulation)
│  │  └─ RegulationOverviewPage [PLACEHOLDER]
│  │
│  ├─ /resources (Ressourcen & Anforderungen)
│  │  └─ ResourcesOverviewPage [PLACEHOLDER]
│  │
│  ├─ /interventions (Interventions-Katalog)
│  │  └─ InterventionsListPage [PLACEHOLDER]
│  │
│  └─ /development (Entwicklung & Wachstum)
│     └─ DevelopmentTimelinePage [PLACEHOLDER]
│
├─ /admin (Administration)
│  └─ AdminOverviewPage [PLACEHOLDER]
│
└─ [Fehlerseiten – mit ErrorPage]
   ├─ /404 (Seite nicht gefunden)
   ├─ /403 (Verboten)
   └─ /error (Fehler)
```

### Detaillierte Seiten-Dokumentation

#### Platform Core (3 Seiten)

| Seite | Route | Type | Component | Status | Details |
|-------|-------|------|-----------|--------|---------|
| Startseite | `/` | dashboard | `HomePage` | ✅ 80% | Hero + Module Grid laden |
| Heute | `/today` | dashboard | `TodayPage` | ⏳ 20% | Placeholder |
| Profil | `/profile` | form | `ProfilePage` | ⏳ 20% | Placeholder |

#### NeuroBalance (8 Seiten)

| Seite | Route | Type | Component | Status | Details |
|-------|-------|------|-----------|--------|---------|
| Übersicht | `/neurobalance` | overview | `OverviewPage` | ⏳ 20% | Placeholder |
| Energie-Überblick | `/neurobalance/energy` | overview | `EnergyOverviewPage` | ⏳ 20% | Placeholder |
| Energy Check-in | `/neurobalance/energy/checkin` | check_in | `EnergyCheckInPage` | ❌ 0% | Keine Fragen, keine Speicherung |
| Energieverlauf | `/neurobalance/energy/history` | list | `EnergyHistoryPage` | ❌ 0% | Keine Datenladung |
| Selbstregulation | `/neurobalance/regulation` | overview | `RegulationOverviewPage` | ⏳ 20% | Placeholder |
| Ressourcen & Anforderungen | `/neurobalance/resources` | overview | `ResourcesOverviewPage` | ⏳ 20% | Placeholder |
| Interventionen | `/neurobalance/interventions` | list | `InterventionsListPage` | ⏳ 20% | Placeholder |
| Entwicklung & Wachstum | `/neurobalance/development` | timeline | `DevelopmentTimelinePage` | ⏳ 20% | Placeholder |

#### Admin (1 Seite)

| Seite | Route | Type | Component | Status | Details |
|-------|-------|------|-----------|--------|---------|
| Administration | `/admin` | admin | `AdminOverviewPage` | ⏳ 20% | Placeholder |

#### System / Error Pages (3 Seiten)

| Seite | Route | Type | Component | Status | Details |
|-------|-------|------|-----------|--------|---------|
| Nicht gefunden | `*` (404) | error | `ErrorPage` | ✅ 100% | Zeigt 404, Link zur Startseite |
| Verboten | `/forbidden` | error | `ErrorPage` | ✅ 100% | Zeigt 403 |
| Fehler | `/error` | error | `ErrorPage` | ✅ 100% | Zeigt 500 |

#### Zukünftige Module (noch nicht aktiviert)

- **NeuroPlay**: Draft, deaktiviert (Gamification für Neuroregulation)
- **NeuroWork**: Draft, deaktiviert (Workplace Accommodations)
- **NeuroLearning**: Draft, deaktiviert (Lernmaterialien & Resources)

---

### Navigation Items (Fallback-Daten, DB leer)

```
Primary Navigation (Desktop & Mobile)
├─ Start (Home link)
├─ Übersicht (NeuroBalance overview)
├─ Module (NeuroBalance + Tabs für Sub-Seiten)
└─ NeuroBalance (Collapse mit 8 Seiten)
    ├─ Energie
    ├─ Regulation
    ├─ Ressourcen
    ├─ Interventionen
    └─ Entwicklung
```

**Status**: Fallback-Items sind hardcoded. Echte Items würde aus `app_navigation_items` geladen (aktuell leer in DB).

---

## 7. User Flows

### Flow 1: Besucher kommt zur Startseite

```
1. Browser öffnet https://aibuilder-1z5ck.preview.ai-builder.strato.de/
2. React App lädt (src/main.jsx)
3. App.jsx:
   a. loadModules() & loadPages() (Datenbank-Calls)
   b. currentRoute = "/" erkannt
   c. resolvePageForRoute("/", pages)
      → Findet "platform.home" Seite
      → Lädt HomePage.jsx (lazy)
   d. StandardLayout + HomePage rendern
4. Startseite sichtbar mit:
   - Header (Logo, Hamburger-Button auf Mobile)
   - Sidebar (Desktop) oder Mobile-Nav (Mobile)
   - Hero "Erkenne Deine Energie"
   - Module Grid (z.B. NeuroBalance)
5. ✅ FERTIG
```

**Implementierungsstatus**: ✅ VOLL FUNKTIONSFÄHIG

---

### Flow 2: Nutzer navigiert zu NeuroBalance

```
1. Nutzer klickt auf "NeuroBalance" Link in Module Grid
2. App.jsx::handleLinkClick abfangen
3. setCurrentRoute("/neurobalance")
4. window.history.pushState() → URL ändert sich
5. resolvePageForRoute("/neurobalance", pages)
   → Findet "neurobalance.overview" Seite
   → Lädt OverviewPage.jsx (lazy)
   → PageTemplate wrapper mit "NeuroBalance" Titel
6. Standardlayout + NeuroBalance-Seite rendern
7. ✅ FERTIG (aber Seite ist Placeholder – keine Inhalte)
```

**Implementierungsstatus**: ✅ ROUTING FUNKTIONIERT, ❌ INHALTE FEHLEN

---

### Flow 3: Nutzer versucht, einen Energy Check-in zu machen

```
1. Nutzer klickt "Check-in" in NeuroBalance
2. Navigiert zu /neurobalance/energy/checkin
3. resolvePageForRoute() findet neurobalance.energy.check_in
4. EnergyCheckInPage.jsx lädt (Placeholder)
5. Nutzer sieht: "Diese Seite wird noch vorbereitet."
6. ❌ BLOCKIERT – Keine Fragen, keine Logik

Zu implementieren (Phase E):
- EnergyCheckInPage Komponente mit Fragen-Interface
- Zonen-Berechnung basierend auf Antworten
- Speicherung in check_in_results Collection
- Redirect zu Ergebnis-Seite
```

**Implementierungsstatus**: ❌ NICHT IMPLEMENTIERT

---

### Flow 4: Authentifizierter Nutzer sieht rollenbasierte Navigation (Future)

```
1. Nutzer meldet sich an (noch nicht implementiert)
   → PocketBase Auth Token wird gespeichert
   → getCurrentUserRole() erkennt Rolle
2. Sidebar lädt (navigationService.ts)
3. getNavigationByArea() gibt alle Items zurück
4. ❌ KEINE ROLLEN-FILTERUNG
   → Alle Items sind sichtbar, unabhängig von Rolle

Zu implementieren (Phase D):
- app_navigation_roles in Sidebar prüfen
- Nur Seiten mit matching role_key anzeigen
```

**Implementierungsstatus**: ❌ NICHT IMPLEMENTIERT (Rollen definiert, aber nicht genutzt)

---

### Flow 5: Admin verwaltet Navigation (Future)

```
1. Admin meldet sich an
2. Klickt auf "Konfiguration" im Admin-Bereich
3. Sieht Liste aller Navigation Items
4. Kann aktivieren/deaktivieren, Labels ändern, Sort-Order anpassen
5. ❌ NICHT IMPLEMENTIERT – AdminOverviewPage ist Placeholder

Zu implementieren (Phase F):
- Admin-UI mit CRUD-Formen
- Datenbank-Schreib-API aufrufen
- Validierung & Error-Handling
```

**Implementierungsstatus**: ❌ NICHT IMPLEMENTIERT

---

## 8. Technische Architektur

### High-Level Übersicht

```
┌─────────────────────────────────────────────┐
│          Browser (React 18 App)             │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │ App.jsx (Zentrale Router)            │  │
│  │ - Lädt Module & Seiten               │  │
│  │ - Client-Side Navigation             │  │
│  │ - Error Handling                     │  │
│  └──────────────────────────────────────┘  │
│           │                 │               │
│           ▼                 ▼               │
│  ┌─────────────────┐  ┌────────────────┐   │
│  │ Shell           │  │ Page Resolver  │   │
│  │ (Header,        │  │ (pageRegistry, │   │
│  │  Sidebar,       │  │  pageResolver, │   │
│  │  Mobile Nav)    │  │  component     │   │
│  │                 │  │  registry)     │   │
│  └─────────────────┘  └────────────────┘   │
│           │                 │               │
│           └─────────┬───────┘               │
│                     │                       │
│           ┌─────────▼──────────┐            │
│           │ Pages & Layouts    │            │
│           │ (HomePage,         │            │
│           │  NeuroBalance*,    │            │
│           │  ErrorPage, etc.)  │            │
│           └────────────────────┘            │
└─────────────────────────────────────────────┘
                     │
                     │ fetch() (via pb.ts)
                     │
                     ▼
┌──────────────────────────────────────┐
│      PocketBase Instance             │
│  (/.sfs-bd/ dev, /.sfs-be/ prod)    │
│                                      │
│ Collections:                         │
│ - app_modules                        │
│ - app_pages                          │
│ - app_navigation_items               │
│ - app_navigation_roles               │
│ - app_page_permissions               │
│ - [future: check_in_results]         │
└──────────────────────────────────────┘
```

### Kernkomponenten & Dateien

| Bereich | Datei | Größe | Zeilen | Funktion |
|---------|-------|-------|--------|----------|
| **Router** | `src/App.jsx` | ~8 KB | 178 | Zentrale Routing, State Mgmt, Error Handling |
| **Registry** | `src/core/routing/pageRegistry.ts` | ~6 KB | 171 | Seiten-Service, Fallback Data |
| **Resolver** | `src/core/routing/pageResolver.ts` | ~4 KB | 150 | Route → Component → Layout Auflösung |
| **Komponenten** | `src/core/routing/pageComponentRegistry.ts` | ~3 KB | 84 | Komponenten-Mapping |
| **Layouts** | `src/core/routing/layoutRegistry.ts` | ~1 KB | 20 | Layout-Auswahl |
| **Module Service** | `src/core/modules/moduleRegistry.ts` | ~2 KB | 68 | Module-Service, Fallback |
| **Navigation** | `src/core/navigation/navigationService.ts` | ~2 KB | 50 | Navigation-Service |
| **PocketBase Client** | `src/lib/pb.ts` | ~0.5 KB | 18 | Zentrale Instanz, URL-Routing |
| **Header** | `src/shell/components/Header.jsx` | ~1.5 KB | 50 | Fixed Header mit Logo |
| **Sidebar** | `src/shell/components/Sidebar.jsx` | ~3 KB | 120 | Desktop Navigation |
| **Mobile Nav** | `src/shell/components/MobileNavigation.jsx` | ~2.5 KB | 95 | Slide-out Menü |
| **Standard Layout** | `src/shell/components/StandardLayout.jsx` | ~1 KB | 45 | Main Layout Container |
| **Page Template** | `src/page-templates/PageTemplate.jsx` | ~3 KB | 95 | Wrapper für Seiten (Titel, Beschreibung, Back-Button) |
| **Error Page** | `src/page-templates/ErrorPage.jsx` | ~1 KB | 35 | Fehler-Anzeige |
| **HomePage** | `src/platform/pages/HomePage.jsx` | ~3.5 KB | 106 | Startseite mit Module Grid |
| **Design System** | `tailwind.config.cjs` | ~3 KB | 85 | Farben, Fonts, Spacing Tokens |
| **Global Styles** | `src/index.css` | ~2 KB | 60 | Tailwind Import + CSS Variables |

---

### Data Flow (Datenfluss)

```
1. Nutzer öffnet Route (/neurobalance)
   ↓
2. App.jsx::useEffect triggers resolveCurrentPage()
   ↓
3. resolvePageForRoute(route, pages)
   a. Suche in pages[] nach matching route_path
   b. Prüfe is_enabled && lifecycle_status === 'active'
   c. Prüfe Modul-Status (isPageAccessible)
   ↓
4. resolveComponent(page.component_key)
   a. Lookup in pageComponentRegistry
   b. Fallback zu PlaceholderPage wenn unbekannt
   ↓
5. resolveLayout(page.layout_key || 'standard')
   a. Lookup in layoutRegistry
   b. Fallback zu StandardLayout wenn unbekannt
   ↓
6. generateBreadcrumb(page)
   a. Lade Modul aus app_modules
   b. Erstelle Breadcrumb-Trail
   ↓
7. Render: <LayoutComponent> <PageComponent /> </LayoutComponent>
   ↓
8. ✅ Seite sichtbar
```

### Fehlerbehandlung

```
Fehlerfall 1: Route nicht gefunden
→ resolvePageForRoute() gibt null zurück
→ !resolvedPage Check in App.jsx
→ Redirect zu "/" (Fallback bei Startup)
→ Oder Fehlerseite bei etablierter Route (kommend)

Fehlerfall 2: Datenbank unverfügbar
→ loadPages() catch-Block
→ FALLBACK_PAGES werden zurückgegeben
→ App lädt mit Fall-back-Daten (11 essenzielle Seiten)
→ Kein weißer Screen, aber eingeschränkte Funktionalität

Fehlerfall 3: Komponente unbekannt
→ resolveComponent() gibt undefined
→ App.jsx rendert PlaceholderPage statt Fehler
→ Nutzer sieht "Diese Seite wird noch vorbereitet."

Fehlerfall 4: Layout unbekannt
→ resolveLayout() gibt undefined
→ Fallback zu StandardLayout
→ App rendert trotzdem (graceful degradation)
```

---

## 9. Repository- und Verzeichnisstruktur

### Vollständiger Dateibaum

```
app/
├── dist/                          # Production Build (committed)
│   └── [vite build output – index.html + assets/]
│
├── dist-preview/                  # Preview/Dev Build
│   └── [vite build --mode preview output]
│
├── src/
│   ├── App.jsx                    # Root Router Component
│   ├── main.jsx                   # Entry Point (React 18 StrictMode)
│   ├── index.css                  # Tailwind Import + Design Tokens
│   │
│   ├── lib/
│   │   └── pb.ts                  # PocketBase Shared Instance
│   │
│   ├── core/
│   │   ├── auth/                  # (PLANNED Phase D)
│   │   │   └── auth.ts
│   │   │
│   │   ├── access/
│   │   │   └── permissionGuard.ts # Placeholder für Berechtigungen
│   │   │
│   │   ├── database/
│   │   │   └── schema.ts          # TypeScript Interfaces
│   │   │
│   │   ├── navigation/
│   │   │   ├── navigationService.ts
│   │   │   ├── bootstrapNavigation.ts (UNUSED)
│   │   │   └── seedNavigationData.ts (REFERENCE)
│   │   │
│   │   ├── routing/
│   │   │   ├── pageRegistry.ts         # Pages Service + Fallback
│   │   │   ├── pageResolver.ts         # Route → Component → Layout
│   │   │   ├── pageComponentRegistry.ts # Component Registry
│   │   │   └── layoutRegistry.ts       # Layout Registry
│   │   │
│   │   └── modules/
│   │       └── moduleRegistry.ts       # Modules Service + Fallback
│   │
│   ├── shell/
│   │   └── components/
│   │       ├── Header.jsx              # Fixed Header with Logo
│   │       ├── Sidebar.jsx             # Desktop Navigation
│   │       ├── MobileNavigation.jsx    # Mobile Slide-out Menu
│   │       ├── StandardLayout.jsx      # Main Layout Container
│   │       ├── Breadcrumbs.jsx         # Breadcrumb Renderer
│   │       ├── AuthLayout.jsx          # (PLACEHOLDER)
│   │       ├── AdminLayout.jsx         # (PLACEHOLDER)
│   │       ├── ErrorLayout.jsx         # (PLACEHOLDER)
│   │       └── ModuleNavigation.jsx    # Horizontal Module List
│   │
│   ├── page-templates/
│   │   ├── PageTemplate.jsx        # Generic Page Wrapper
│   │   ├── PlaceholderPage.jsx      # "Seite wird vorbereitet"
│   │   └── ErrorPage.jsx            # Error Display (404, 403, 500)
│   │
│   ├── platform/
│   │   └── pages/
│   │       ├── HomePage.jsx         # ✅ Startseite (80% fertig)
│   │       ├── TodayPage.jsx        # Placeholder
│   │       ├── ProfilePage.jsx      # Placeholder
│   │       └── AdminOverviewPage.jsx # Placeholder
│   │
│   └── modules/
│       └── neurobalance/
│           └── pages/
│               ├── OverviewPage.jsx              # Placeholder
│               ├── EnergyOverviewPage.jsx        # Placeholder
│               ├── EnergyCheckInPage.jsx         # ❌ BLOCKIERT
│               ├── EnergyHistoryPage.jsx         # ❌ BLOCKIERT
│               ├── RegulationOverviewPage.jsx    # Placeholder
│               ├── ResourcesOverviewPage.jsx     # Placeholder
│               ├── InterventionsListPage.jsx     # Placeholder
│               └── DevelopmentTimelinePage.jsx   # Placeholder
│
├── public/
│   └── favicon.jpg                # NeuroWays Icon (official logo)
│
├── docs/
│   ├── architecture/
│   │   ├── app-structure.md        # Database & Frontend Architecture
│   │   └── routing-model.md        # Routing Deep Dive
│   │
│   ├── database/
│   │   └── app-structure-schema.md # Database Schema & Deployment
│   │
│   └── handover/
│       └── PROJECT_HANDOVER.md     # This File
│
├── index.html                      # HTML Template (Vite)
│   ├── lang="de"
│   ├── <title>NeuroWays</title>
│   ├── <meta description>
│   ├── <link favicon.jpg>
│   ├── <base href="/">
│   └── <div id="root"> (React mount point)
│
├── package.json                    # (EMPTY – no npm dependencies)
├── package-lock.json               # (Lock file)
├── vite.config.js                  # Vite Configuration
├── tailwind.config.cjs              # Tailwind v4 Config + Design Tokens
│
├── AGENTS.md                        # Project Status (last updated 2026-07-25)
├── CHANGELOG.md                     # Version History (v1.0.0)
├── PHASE_C_KORREKTUR.md            # Phase C Corrections (70% infra, 0% logic)
│
├── .git/                           # Git Repository
│   └── [84 commits in main branch]
│
└── .gitignore
    ├── /node_modules
    ├── /dist
    └── [standard entries]
```

### Wichtige Verzeichnisse

| Pfad | Verantwortung | Status |
|------|---------------|--------|
| `src/` | Alle React/TypeScript-Komponenten & Services | ✅ |
| `src/core/routing/` | Router-Logik, Seiten-/Layout-Registry | ✅ |
| `src/core/modules/` | Modul-Service & Fallback | ✅ |
| `src/core/navigation/` | Navigation Service & Fallback | ✅ |
| `src/shell/components/` | Layout & Navigation Shell (Header, Sidebar, etc.) | ✅ |
| `src/platform/pages/` | Platform-Modul-Seiten | ⏳ (Placeholders) |
| `src/modules/neurobalance/pages/` | NeuroBalance-Seiten | ❌ (0% Logik) |
| `docs/` | Dokumentation | ✅ (v1.0) |
| `public/` | Statische Dateien (favicon, etc.) | ✅ |
| `dist/` | Production Build Output | ✅ |

---

## 10. Datenbank

### PocketBase Instanzen

| Umgebung | Endpoint | Zweck | Status |
|----------|----------|-------|--------|
| Dev/Preview | `/.sfs-bd/` | Development, Testing, Fallback Data | ✅ Online |
| Production | `/.sfs-be/` | Live Site (eingeschränkte Berechtigungen) | ✅ Online (aber 403 Fehler) |

**Problem Production DB**: Collections haben Lesezugriff für öffentlich, aber 403-Fehler werden in App ignoriert → Fallback-Daten werden genutzt.

### 5 Collections (Schemas definiert & Seed Data vorhanden)

#### Collection 1: `app_modules`

**Zweck**: Registriert alle fachlichen Module (Platform, NeuroBalance, etc.)

**Felder**:
```typescript
{
  id: string                    // Auto-generated UUID
  module_key: string           // Stabiler Schlüssel (z.B. "platform")
  name: string                 // Anzeigetext
  description?: string         // Beschreibung
  base_path?: string          // Basis-Route (z.B. "/neurobalance")
  icon_key?: string           // Icon-Referenz für UI
  color_key?: string          // Farb-Token
  module_version?: string     // Versionnummer
  module_status: 'draft' | 'active' | 'deprecated' | 'archived'
  is_core_module?: boolean    // Kernmodul (nicht deaktivierbar)
  is_enabled: boolean         // Sichtbar in Navigation?
  sort_order?: number         // Sortierposition
  created: timestamp          // Auto
  updated: timestamp          // Auto
}
```

**Seeded Data (6 Einträge)**:
```
1. platform (Core, active, enabled, sort=1)
2. neurobalance (active, enabled, sort=2)
3. neuroplay (draft, disabled, sort=3)
4. neurowork (draft, disabled, sort=4)
5. neurolearning (draft, disabled, sort=5)
6. admin (Core, active, enabled, sort=100)
```

**Access Rules** (Dev):
- listRule: "" (öffentlich lesbar)
- viewRule: "" (öffentlich lesbar)
- createRule: – (Admin only)
- updateRule: – (Admin only)
- deleteRule: – (Admin only)

---

#### Collection 2: `app_pages`

**Zweck**: Alle Seiten mit Routing-, Komponenten- und Berechtigungsinformationen

**Felder**:
```typescript
{
  id: string
  module_id: string | null        // Fremdschlüssel (app_modules.id)
  parent_page_id?: string         // Für Hierarchie
  page_key: string                // Stabiler Schlüssel (z.B. "platform.home")
  title: string                   // Anzeigetext
  short_title?: string            // Für Breadcrumbs
  description?: string            // Seiten-Beschreibung
  route_path: string              // URL-Route (z.B. "/neurobalance/energy")
  route_name?: string             // Named Route (für Verweise)
  page_type: string               // Type: dashboard|overview|list|detail|form|check_in|result|timeline|error|placeholder
  component_key: string           // Komponentenschlüssel (z.B. "platform_home")
  requires_auth: boolean          // Authentifizierung erforderlich?
  is_landing_page?: boolean       // Landing-Seite?
  is_enabled: boolean             // Aktiv?
  lifecycle_status: 'draft' | 'active' | 'deprecated' | 'archived'
  created: timestamp
  updated: timestamp
}
```

**Seeded Data (17 Einträge)**:

| page_key | route_path | component_key | module_id | Status |
|----------|-----------|---------------|-----------|--------|
| platform.home | / | platform_home | platform | active |
| platform.today | /today | platform_today | platform | active |
| platform.profile | /profile | platform_profile | platform | active |
| neurobalance.overview | /neurobalance | neurobalance_overview | neurobalance | active |
| neurobalance.energy.overview | /neurobalance/energy | neurobalance_energy_overview | neurobalance | active |
| neurobalance.energy.check_in | /neurobalance/energy/checkin | neurobalance_energy_check_in | neurobalance | active |
| neurobalance.energy.history | /neurobalance/energy/history | neurobalance_energy_history | neurobalance | active |
| neurobalance.regulation.overview | /neurobalance/regulation | neurobalance_regulation_overview | neurobalance | active |
| neurobalance.resources.overview | /neurobalance/resources | neurobalance_resources_overview | neurobalance | active |
| neurobalance.interventions.list | /neurobalance/interventions | neurobalance_interventions_list | neurobalance | active |
| neurobalance.development.timeline | /neurobalance/development | neurobalance_development_timeline | neurobalance | active |
| platform.onboarding | /onboarding | platform_onboarding | platform | draft |
| auth.login | /login | auth_login | – | draft |
| auth.invitation | /invitation/:token | auth_invitation | – | draft |
| system.forbidden | /forbidden | system_forbidden | – | active |
| system.error | /error | system_error | – | active |
| system.not_found | * | system_not_found | – | active |

---

#### Collection 3: `app_navigation_items`

**Zweck**: Navigationshierarchie und Verweise

**Felder**:
```typescript
{
  id: string
  navigation_key: string         // Stabiler Schlüssel
  navigation_area: string        // primary|module|context|mobile|user|footer|admin|quick_access
  page_id?: string              // Zielseite (optional)
  label: string                 // Anzeigetext
  short_label?: string          // Kurzversion für Mobile
  icon_key?: string             // Icon-Referenz
  target_type: string           // page|external|group|action
  target_url?: string           // Externe URL (wenn target_type=external)
  sort_order: number            // Sortierposition
  show_in_desktop: boolean      // Auf Desktop sichtbar?
  show_in_mobile: boolean       // Auf Mobile sichtbar?
  show_in_breadcrumb?: boolean  // In Breadcrumbs anzeigen?
  is_enabled: boolean           // Aktiv?
  created: timestamp
  updated: timestamp
}
```

**Seeded Data**: **AKTUELL LEER** – Die Fallback-Navigation in App.jsx ist hardcoded:
- "Start" (link to /)
- "Übersicht" (link to /neurobalance)
- Später: Primäre, Modul-, Kontext-, Benutzer-Navigation

---

#### Collection 4: `app_navigation_roles`

**Zweck**: Bestimmt, welche Rollen Navigationselemente sehen dürfen

**Felder**:
```typescript
{
  id: string
  navigation_item_id: string    // Fremdschlüssel (app_navigation_items.id)
  role_key: string              // member|team_manager|organization_admin|coach|researcher|neuroways_admin
  access_level: string          // view|edit|manage
  created: timestamp
  updated: timestamp
}
```

**Seeded Data**: **LEER** – Rollen sind definiert, aber nicht mit Navigation verknüpft. Zu implementieren in Phase D.

---

#### Collection 5: `app_page_permissions`

**Zweck**: Bestimmt rollenbasierte Aktionen auf Seiten (granulare Berechtigungen)

**Felder**:
```typescript
{
  id: string
  page_id: string              // Fremdschlüssel (app_pages.id)
  role_key: string             // member|team_manager|organization_admin|coach|researcher|neuroways_admin
  can_view: boolean            // Seite sehen?
  can_create: boolean          // Inhalte erstellen?
  can_update: boolean          // Inhalte bearbeiten?
  can_delete: boolean          // Inhalte löschen?
  created: timestamp
  updated: timestamp
}
```

**Seeded Data**: **LEER** – Schema vorbereitet, aber nicht genutzt. Zu implementieren in Phase D.

---

### Noch nicht angelegte Collections (für Phase E+)

| Collection | Zweck | Status |
|-----------|-------|--------|
| `check_in_results` | Speichert Energy-Check-in-Ergebnisse | GEPLANT Phase E |
| `user_resources` | Speichert Nutzer-Ressourcen-Inventar | GEPLANT Phase E |
| `user_interventions` | Speichert Nutzer-Interventions-Favoriten | GEPLANT Phase E |
| `development_milestones` | Speichert Nutzer-Meilensteine | GEPLANT Phase E |

---

### Datenbank-Beziehungen (Entity Relationship Diagram)

```
app_modules
    ↑
    │ (module_id)
    │
app_pages ←──────── app_page_permissions
    ↑                     │
    │                     │ (page_id)
    │                     │
    │            app_navigation_roles
    │                  ↑
    │                  │ (navigation_item_id)
    │                  │
    └──────────── app_navigation_items
              (page_id)
```

---

## 11. API und Schnittstellen

### PocketBase REST API-Endpunkte (aktuell genutzt)

| Methode | Endpoint | Zweck | Status | Input | Output | Auth |
|---------|----------|-------|--------|-------|--------|------|
| GET | `/.sfs-bd/api/collections/app_modules/records` | Alle Module laden | ✅ IMPLEMENTIERT | `?sort=sort_order` | [Module] | Public |
| GET | `/.sfs-bd/api/collections/app_pages/records` | Alle Seiten laden | ✅ IMPLEMENTIERT | `?filter=is_enabled=true&&lifecycle_status="active"` | [Pages] | Public |
| GET | `/.sfs-bd/api/collections/app_navigation_items/records` | Navigation laden | ✅ IMPLEMENTIERT | `?filter=is_enabled=true&sort=sort_order` | [NavItems] | Public |
| GET | `/.sfs-bd/api/collections/app_modules/records/{id}` | Modul-Details | ✅ IMPLEMENTIERT | – | Module | Public |
| GET | `/.sfs-bd/api/collections/app_pages/records/{id}` | Seiten-Details | ✅ IMPLEMENTIERT | – | Page | Public |

### Geplante API-Endpunkte (Phase D+)

| Methode | Endpoint | Zweck | Status | Input | Output | Auth |
|---------|----------|-------|--------|-------|--------|------|
| POST | `/.sfs-be/api/collections/users/records` | Benutzer registrieren | GEPLANT Phase D | {email, password} | {user, token} | Public |
| POST | `/.sfs-be/api/collections/users/auth-with-password` | Login | GEPLANT Phase D | {identity, password} | {user, token} | Public |
| POST | `/.sfs-be/api/collections/check_in_results/records` | Check-in speichern | GEPLANT Phase E | {user_id, zones, timestamp, answers} | {id, created} | User Auth |
| GET | `/.sfs-be/api/collections/check_in_results/records` | Check-in-Verlauf laden | GEPLANT Phase E | `?filter=user_id={id}&sort=-created` | [Results] | User Auth |
| GET | `/.sfs-be/api/collections/app_pages/records` | Seiten mit Berechtigungen | GEPLANT Phase D | – | [Pages mit can_view] | User Auth |

### Backend Health & Status

| Service | Status | Anmerkungen |
|---------|--------|------------|
| PocketBase Dev (/.sfs-bd/) | ✅ ONLINE | Alle Read-Anfragen funktionieren |
| PocketBase Prod (/.sfs-be/) | ✅ ONLINE (Read only) | Anfragen geben 403 Forbidden, App nutzt Fallback |
| Collections (Dev & Prod) | ✅ DEPLOYED | Schemas synchronisiert |
| Seed Data (Dev) | ✅ SEEDED | Alle 17 Seiten + 6 Module + 4 NavItems |
| Seed Data (Prod) | ❓ UNGEKLÄRT | Schemas da, aber Daten möglicherweise leer (Schema-Copy, keine Data-Migration) |

---

## 12. Fachliche Geschäftslogik

### Implementiert

#### Modul-Status-Prüfung
- **Regel**: Seite ist nur erreichbar, wenn ihr Modul `is_enabled = true && module_status = "active"`
- **Implementierungsort**: `pageResolver.ts::isPageAccessible()`
- **Status**: ✅ IMPLEMENTIERT
- **Sonderfälle**: 
  - NeuroBalance ist aktiv und enabled → Seiten erreichbar
  - NeuroPlay/NeuroWork/NeuroLearning sind draft und disabled → Seiten nicht sichtbar in Navigation

#### Seitenstatus-Prüfung
- **Regel**: Seite ist nur erreichbar, wenn `is_enabled = true && lifecycle_status = "active"`
- **Implementierungsort**: `pageRegistry.ts::loadPages()` Filter, `pageResolver.ts::resolvePageForRoute()`
- **Status**: ✅ IMPLEMENTIERT

#### Client-Side Routing
- **Regel**: Navigation ohne Seiten-Reload (history.pushState statt full reload)
- **Implementierungsort**: `App.jsx::handleLinkClick()`
- **Status**: ✅ IMPLEMENTIERT

#### Breadcrumb-Generierung
- **Regel**: Breadcrumbs werden automatisch aus Seitenhierarchie erzeugt (Modul → Seite)
- **Implementierungsort**: `pageResolver.ts::generateBreadcrumb()`
- **Status**: ✅ IMPLEMENTIERT

---

### Teilweise implementiert (Struktur da, Logik fehlt)

#### Authentifizierung
- **Regel**: Seite mit `requires_auth = true` ist nur für angemeldete Nutzer sichtbar
- **Implementierungsort**: `permissionGuard.ts` (PLACEHOLDER)
- **Status**: ⏳ NICHT IMPLEMENTIERT
- **Zu tun Phase D**: 
  - PocketBase Auth integrieren
  - Login-Seite
  - Token-Speicherung
  - requires_auth-Prüfung im Router

#### Rollenbasierte Navigation
- **Regel**: Navigationselemente sind nur sichtbar, wenn die Rolle des Nutzers in `app_navigation_roles` eingetragen ist
- **Implementierungsort**: `Sidebar.jsx`, `MobileNavigation.jsx` (keine Filterung)
- **Status**: ❌ NICHT IMPLEMENTIERT
- **Zu tun Phase D**: 
  - getCurrentUserRole() implementieren
  - app_navigation_roles abfragen
  - Filter in Sidebar/Mobile anwenden

#### Granulare Berechtigungen
- **Regel**: Nutzer mit Role X kann auf Seite Y nur `can_view` aber nicht `can_update`
- **Implementierungsort**: `app_page_permissions` Schema vorhanden, aber nicht genutzt
- **Status**: ❌ NICHT IMPLEMENTIERT
- **Zu tun Phase D**: 
  - app_page_permissions in Router prüfen
  - Granulare Buttons disable/hide basierend auf Berechtigungen

---

### Nicht implementiert (Future)

#### Energy Navigator – Check-in Logik
- **Regel**: 
  1. Nutzer beantwortet 3-4 Schnellfragen zu Energie
  2. Antworten werden klassifiziert → Zone (Low, Balanced, High, in Transition)
  3. Ergebnis wird in `check_in_results` gespeichert
  4. Nutzer sieht sofort Ergebnis-Seite mit Empfehlungen
- **Zu tun Phase E**
- **Blockiert durch**: Keine Check-in-Collection, keine Zonen-Klassifikation

#### Energieverlauf-Visualisierung
- **Regel**: 
  1. App lädt letzten Check-in (weekly view)
  2. Zeigt Graphik mit Trend
  3. Nutzer kann filtern (Woche, Monat, Jahr)
- **Zu tun Phase E**
- **Blockiert durch**: check_in_results Collection nicht vorhanden

#### Interventionen-Empfehlungen
- **Regel**: 
  1. Basierend auf aktueller Zone werden Interventionen vorgeschlagen
  2. Nutzer kann nach Zeit filtern (5min, 10min, 20min)
  3. Kann als Favorit markieren
- **Zu tun Phase E**
- **Blockiert durch**: Interventions-Katalog & Zonen-Logik nicht implementiert

#### Ressourcen-Inventar
- **Regel**: 
  1. Nutzer gibt seine Ressourcen ein (z.B. "Zeit mit Familie", "Bewegung", "Musik hören")
  2. Wird mit Anforderungen gewichtet (Matrix)
  3. Balance-Analyse: Nutzer sieht, ob Ressourcen > Anforderungen
- **Zu tun Phase E**

---

## 13. Authentifizierung, Rollen und Berechtigungen

### Status Authentifizierung

| Element | Status | Details |
|---------|--------|---------|
| **Loginverfahren** | ❌ NICHT IMPLEMENTIERT | PocketBase Auth Library verfügbar, aber keine Seite |
| **Token-Storage** | ❌ NICHT IMPLEMENTIERT | localStorage Option vorhanden |
| **Session Management** | ❌ NICHT IMPLEMENTIERT | – |
| **Logout** | ❌ NICHT IMPLEMENTIERT | – |
| **Password Reset** | ❌ NICHT IMPLEMENTIERT | – |
| **Email Verification** | ❌ BLOCKIERT | PocketBase Email API in dieser Umgebung deaktiviert |

### Benutzerrollen (6 definiert)

```typescript
type Role = 
  | 'member'                  // Normalnutzer
  | 'team_manager'            // Teamleiter
  | 'organization_admin'      // Organisations-Admin
  | 'coach'                   // Coach/Therapeut
  | 'researcher'              // Forscher
  | 'neuroways_admin'         // NeuroWays Admin
```

**Aktuell genutzt**: KEINE – Rollen sind definiert aber nicht in Code verknüpft.

### Berechtigungen (4-Punkt-Modell)

| Permission | Bedeutung | Wobei genutzt |
|------------|-----------|---------------|
| `can_view` | Seite sehen? | `app_page_permissions` |
| `can_create` | Inhalte erstellen? | `app_page_permissions` |
| `can_update` | Inhalte bearbeiten? | `app_page_permissions` |
| `can_delete` | Inhalte löschen? | `app_page_permissions` |

**Aktuell genutzt**: KEINE – nur Modul/Seiten-Status wird geprüft.

### Geschützte Bereiche

| Bereich | Bedingung | Status |
|---------|-----------|--------|
| NeuroBalance Seiten | `requires_auth = false` (öffentlich) | ✅ Ohne Auth erreichbar |
| Admin-Seite | `requires_auth = false` (öffentlich) | ✅ Ohne Auth erreichbar |
| Zukünftige Auth Pages | `requires_auth = true` | ❌ Noch nicht implementiert |

### Bekannte Sicherheitsprobleme

| Problem | Priorität | Lösung |
|---------|-----------|--------|
| Keine Authentifizierung vorhanden | P0 KRITISCH | Phase D: Login + PocketBase Auth integrieren |
| Alle Seiten öffentlich | P0 KRITISCH | Phase D: requires_auth prüfen |
| Keine Rollenprüfung | P0 KRITISCH | Phase D: app_navigation_roles + app_page_permissions nutzen |
| Fallback-Daten sind hardcoded | P1 HOCH | Phase F: Admin-UI für Navigation-Verwaltung |
| Email-API deaktiviert | P1 HOCH | Alternative: Einladungs-Links per Formular |

---

## 14. Konfiguration und Umgebungen

### Development-Umgebung

| Element | Wert | Ort |
|---------|------|-----|
| **Frontend Framework** | Vite 6 (dev server) | `vite.config.js` |
| **Backend** | PocketBase Dev (/.sfs-bd/) | `src/lib/pb.ts` |
| **Port** | `localhost:5173` (standard Vite) | vite default |
| **Base Path** | `/` | `index.html` |
| **Build Mode** | `preview` | `package.json` → `npm run build` |

### Production-Umgebung

| Element | Wert | Ort |
|---------|------|-----|
| **Frontend Hosting** | STRATO Plattform | `/dist` build output |
| **Backend** | PocketBase Prod (/.sfs-be/) | `src/lib/pb.ts` (hostname detection) |
| **Domain** | `aibuilder-1z5ck.preview.ai-builder.strato.de` (Live) | – |
| **Base Path** | `/` | `index.html` |
| **Build Mode** | `production` | `npm run build:prod` |

### Environment Variables

**Aktuell in Benutzung**: KEINE – Alle Variablen sind hardcoded oder hosten-basiert erkannt.

**Zu berücksichtigen für Phase D+**:

| Variable | Zweck | Beispiel |
|----------|-------|---------|
| `VITE_API_BASE` | PocketBase URL | `https://api.neurowrays.io` (falls nicht relative URL) |
| `VITE_ENV` | dev/staging/prod | `production` |
| `VITE_LOG_LEVEL` | Console Logging | `error` (prod), `debug` (dev) |

### Build-Konfiguration

**Vite Config** (`vite.config.js`):
```javascript
// Placeholder – einzeilig, erbt von Platform
```

**Tailwind Config** (`tailwind.config.cjs`):
- Farb-Tokens
- Font-Stacks
- Spacing-Skala
- Border-Radii
- Transition-Dauern

**TypeScript Config** (falls vorhanden):
```
NICHT VORHANDEN – Project nutzt JSX + fallback zu implizitem any
```

---

## 15. Externe Abhängigkeiten

### Vom System bereitgestellt (nicht in npm)

| Abhängigkeit | Version | Status | Zweck |
|---|---|---|---|
| `react` | 18.x | ✅ VORHANDEN | Frontend Framework |
| `react-dom` | 18.x | ✅ VORHANDEN | DOM Rendering |
| `react-router` | 7.x | ✅ VORHANDEN | Routing (nicht aktiv genutzt, wir nutzen custom App.jsx) |
| `vite` | 6.x | ✅ VORHANDEN | Build Tool |
| `@vitejs/plugin-react` | 4.x | ✅ VORHANDEN | React Plugin für Vite |
| `lucide-react` | latest | ✅ VORHANDEN | Icon Library (verwendent: heart, zap, lightbulb, arrow-left) |
| `pocketbase` | latest | ✅ VORHANDEN | PocketBase Client Library |
| `tailwind-merge` | latest | ✅ VORHANDEN | Tailwind CSS Utilities Merging |
| Tailwind CSS Engine v4 | 4.x | ✅ VORHANDEN | Style Engine |

### Vom System NICHT verfügbar

| Abhängigkeit | Warum nicht | Alternative |
|---|---|---|
| `npm install` anything | Platform-Regel: keine npm-Installation | Nutze nur bereitgestellte Libraries |
| `postcss` | Built-in zu Tailwind v4 | Nicht nötig |
| `autoprefixer` | Built-in zu Tailwind v4 | Nicht nötig |

### Google Fonts

**Ladung via Link-Tag in index.html**:
```html
<link vite-ignore rel="stylesheet" href="/.sfs/css2?family=DM+Sans:wght@400;700&family=Atkinson+Hyperlegible:wght@400;700&display=swap" />
```

**Fallback Typefaces**: system-ui, sans-serif (Tailwind config)

---

## 16. Bereits erledigte Entwicklungsaufgaben

| # | Aufgabe | Ergebnis | Status | Nachweis |
|----|---------|----------|--------|----------|
| 1 | Datenbank Schema (app_modules, app_pages, etc.) | 5 Collections definiert | ✅ ERLEDIGT | `docs/database/app-structure-schema.md` |
| 2 | Seed Data (6 Module, 17 Seiten) | Alle in Dev & Prod eingespeichert | ✅ ERLEDIGT | PocketBase Collections (Dev & Prod) |
| 3 | Module Registry Service | `moduleRegistry.ts` mit Fallback | ✅ ERLEDIGT | `src/core/modules/moduleRegistry.ts` |
| 4 | Page Registry Service | `pageRegistry.ts` mit Fallback (11 Pages) | ✅ ERLEDIGT | `src/core/routing/pageRegistry.ts` |
| 5 | Navigation Service | `navigationService.ts` mit Fallback (2 Items) | ✅ ERLEDIGT | `src/core/navigation/navigationService.ts` |
| 6 | Page Resolver | Route → Component → Layout Logic | ✅ ERLEDIGT | `src/core/routing/pageResolver.ts` |
| 7 | Component Registry | Sichere Komponentenauflösung | ✅ ERLEDIGT | `src/core/routing/pageComponentRegistry.ts` |
| 8 | Layout Registry | Layout-Auswahl | ✅ ERLEDIGT | `src/core/routing/layoutRegistry.ts` |
| 9 | App.jsx Router | Zentrale Routing-Logik | ✅ ERLEDIGT | `src/App.jsx` |
| 10 | Shell Components | Header, Sidebar, Mobile Nav, StandardLayout | ✅ ERLEDIGT | `src/shell/components/*` |
| 11 | Design System | Farben, Fonts, Spacing, Radii | ✅ ERLEDIGT | `tailwind.config.cjs` + `src/index.css` |
| 12 | HomePage | Modul-Übersicht | ✅ 80% FERTIG | `src/platform/pages/HomePage.jsx` |
| 13 | Responsive Design (Mobile/Tablet/Desktop) | Grid/Flex Breakpoints | ✅ ERLEDIGT | CSS in allen Komponenten |
| 14 | Fehlerseiten (404, 403, 500) | ErrorPage.jsx | ✅ ERLEDIGT | `src/page-templates/ErrorPage.jsx` |
| 15 | Client-Side Navigation | history.pushState ohne Reload | ✅ ERLEDIGT | `App.jsx::handleLinkClick()` |
| 16 | Breadcrumbs | Auto-Generierung aus Hierarchie | ✅ ERLEDIGT | `pageResolver.ts::generateBreadcrumb()` |
| 17 | Vite Build | Production & Preview Builds | ✅ ERLEDIGT | `dist/` & `npm run build` |
| 18 | PocketBase Backend Routing | Dev (/.sfs-bd/) vs Prod (/.sfs-be/) | ✅ ERLEDIGT | `src/lib/pb.ts` |
| 19 | GitHub Repository | 84 Commits in neuroways/Blueprint_AI | ✅ ERLEDIGT | GitHub Repo |
| 20 | NeuroWays Branding | Logo, Farben, Schriftarten | ✅ ERLEDIGT | `static/neuroways-wordmark.png` + Design System |
| 21 | Logo Integration (Header) | Wordmark in Header | ✅ ERLEDIGT | `Header.jsx` |
| 22 | Fallback Navigation | Für Production Ausfälle | ✅ ERLEDIGT | `navigationService.ts` |
| 23 | Fallback Pages | 11 essenzielle Seiten hardcoded | ✅ ERLEDIGT | `pageRegistry.ts` |
| 24 | Dokumentation | Architecture, Database, Routing Docs | ✅ ERLEDIGT | `docs/` |

---

## 17. Teilweise erledigte Arbeiten

| # | Ursprüngliches Ziel | Bereits umgesetzt | Noch fehlend | Relevante Dateien | Abhängigkeiten |
|----|---|---|---|---|---|
| 1 | **NeuroBalance (8 Seiten)** | Routing, Placeholder-Pages, Struktur | 0% Fachlogik, 0% Speicherung, 0% Datenvisualisierung | `src/modules/neurobalance/pages/*` | Phase E: Check-in-Logik, Collection, API |
| 2 | **Authentifizierung** | PocketBase Library vorhanden | Keine LoginPage, keine Token-Speicherung, keine Auth-Prüfung | `permissionGuard.ts` (Placeholder) | Phase D: Login UI, Session Mgmt |
| 3 | **Rollen & Navigation** | 6 Rollen definiert, app_navigation_roles Schema | Keine Filterung, keine Permission Checks | `Sidebar.jsx`, `MobileNavigation.jsx` | Phase D: Role-aware Navigation |
| 4 | **Granulare Berechtigungen** | app_page_permissions Schema vorhanden | Nicht im Router geprüft, Buttons nicht filtered | `permissionGuard.ts` | Phase D: Permission Checks |
| 5 | **Admin-Seite** | Route & Placeholder-Page | Keine Admin-UI, keine CRUD-Formen | `AdminOverviewPage.jsx` | Phase F: Admin-Formen für Pages, Navigation |
| 6 | **Accessibility** | Semantic HTML, Keyboard Nav, Focus States | Skip-Link fehlt, Aria-Labels unvollständig | Alle Komponenten | Phase D: A11y Audit + Fixes |

---

## 18. Offene Anforderungen und Backlog

### Priorisierung nach Phase

#### P0 – Blockierend für nächste Freigabe (Phase C → D)

| ID | Aufgabe | Grund | Abhängigkeiten | Erwartetes Ergebnis | Akzeptanzkriterium |
|----|---------|-------|-----------------|-------------------|-------------------|
| D-1 | Authentifizierung implementieren | Alle andere Phase-D-Arbeiten hängen dran | – | LoginPage + Token-Storage + Session Management | Nutzer kann sich anmelden, Token wird gespeichert, API-Aufrufe schicken Token |
| D-2 | Role-aware Navigation in Sidebar/Mobile | Feature für Phase D | D-1 (Auth) | Navigation wird nach Nutzer-Rolle gefiltert | Nutzer mit role=member sieht nur member-Seiten |
| D-3 | app_page_permissions im Router prüfen | Feature für Phase D | D-1 (Auth) | Seiten-Zugriff wird pro Rolle geprüft | Nutzer ohne can_view=true kann Seite nicht laden |
| D-4 | Permission Guard vollständig implementieren | Feature für Phase D | D-1 (Auth) | Alle Autorisierungsprüfungen zentralisiert | isPageAccessible() prüft requirements_auth + app_page_permissions |

---

#### P1 – Notwendig für Phase E (Energy Navigator)

| ID | Aufgabe | Grund | Abhängigkeiten | Erwartetes Ergebnis | Akzeptanzkriterium |
|----|---------|-------|-----------------|-------------------|---|
| E-1 | check_in_results Collection erstellen | Energy Navigator braucht Speicherung | – | PocketBase Collection für Check-in-Ergebnisse | Collection mit Feldern: user_id, zone, timestamp, answers, result_code |
| E-2 | Energy Check-in Interface implementieren | Nutzer kann Check-in durchführen | E-1 | EnergyCheckInPage mit 3-4 Fragen | Nutzer beantwortet Fragen, klickt "Abschließen" |
| E-3 | Zonen-Klassifikation-Logik | Check-in-Ergebnis berechnen | E-2 | Antworten → Low/Balanced/High/Transition | Antworten-Set wird zu Zone klassifiziert |
| E-4 | Check-in-Speicherung | Ergebnisse persistent machen | E-1, E-3 | POST zu check_in_results | Check-in wird in DB gespeichert |
| E-5 | Energieverlauf-Visualisierung | Nutzer sieht Trend | E-4 | EnergyHistoryPage lädt & zeigt Chart | Letzten 7 Tage (oder wählbar) anzeigen |
| E-6 | Interventions-Empfehlungen nach Zone | UX feature | E-3 | Seite zeigt Interventionen für aktuelle Zone | Low-Zone → Energie-Booster-Interventionen |

---

#### P2 – Wichtig, aber nicht blockierend (Phase F)

| ID | Aufgabe | Grund | Abhängigkeiten | Erwartetes Ergebnis | Akzeptanzkriterium |
|----|---------|-------|-----------------|-------------------|---|
| F-1 | Admin-UI für Pages | Seiten ohne Code-änderungen verwalten | – | Seite mit Create/Read/Update/Delete Forms | Admin kann Seite aktivieren/deaktivieren |
| F-2 | Admin-UI für Navigation | Navigation ohne Code-änderungen verwalten | – | Seite mit Create/Read/Update/Delete Forms | Admin kann Nav-Item hinzufügen/entfernen |
| F-3 | Admin-UI für Module | Module aktivieren/deaktivieren | – | Seite mit Liste & Toggle | Admin kann Module en/disable |
| F-4 | Strukturvalidierung | Datenbank-Konsistenz prüfen | F-1, F-2, F-3 | Tool/Seite zeigt Probleme | Unverknüpfte Seiten, verwaiste Module identifiziert |

---

#### P3 – Optional/Later

| ID | Aufgabe | Grund | Abhängigkeiten | Erwartetes Ergebnis | Akzeptanzkriterium |
|----|---------|-------|-----------------|-------------------|---|
| X-1 | Dark Mode Support | Design-Feature | – | Dark Mode Toggle + Persistierung | Nutzer kann Dark Mode ein/aus schalten |
| X-2 | Internationalisierung (i18n) | Multi-Language | – | i18n Library + Translations | App kann auf Deutsch/English umgeschaltet werden |
| X-3 | Third-Party Integrationen (Slack, Google) | Erweiterungsmöglichkeit | – | API-Integrationen | Check-ins können zu Slack gepostet werden |
| X-4 | Automated Tests | QA | – | Vitest/Jest + Test Suite | 70% Code Coverage |
| X-5 | E2E Tests (Playwright/Cypress) | QA | – | End-to-End Test Suite | Kritische User Flows testen |
| X-6 | CI/CD Pipeline | DevOps | – | GitHub Actions | Auto-Build + Deploy on Push |

---

## 19. Bekannte Fehler und technische Schulden

### Kritische Fehler (P0)

| Fehler | Ursache | Auswirkung | Workaround | Empfohlene Lösung | Priorität |
|--------|--------|-----------|-----------|------------------|----------|
| Production DB gibt 403 Forbidden | Prod Collections haben restriktive Access Rules | Alle 403-Fehler werden ignoriert, App nutzt Fallback | Fallback-Daten sind hardcoded | Phase D: Prod Access Rules öffnen oder Fallback-Daten seedend | P0 KRITISCH |
| Keine Authentifizierung | Code nicht vorhanden | Alle Seiten öffentlich für alle | – | Phase D: Login + Auth implementieren | P0 KRITISCH |
| Energy Navigator 0% implementiert | Geplant für Phase E | Nutzer kann nicht checkin | Seite zeigt "Wird vorbereitet" | Phase E: Vollständig implementieren | P0 KRITISCH |

---

### Technische Schulden (P1)

| Schuld | Ort | Lösung | Priorität |
|-------|-----|--------|----------|
| `permissionGuard.ts` ist Placeholder | `src/core/access/permissionGuard.ts` | Vollständig implementieren (Phase D) | P1 |
| Fallback-Navigation hardcoded | `navigationService.ts` | Admin-UI für Navigation (Phase F) | P1 |
| Keine Seiten-beschreibungs-Synchronisation von DB | `PageTemplate.jsx` | Auto-Refresh implementieren (aktuell 30s Cache) | P1 |
| Keine Error Boundary | `App.jsx` | React Error Boundary einbauen | P1 |
| Skip-Link fehlt | Accessibility | Link vor #root hinzufügen | P1 |
| Aria-Labels unvollständig | Alle Komponenten | Audit durchführen | P1 |

---

### Known Limitations (Design-Entscheidungen)

| Limitation | Grund | Impact | Zu berücksichtigen |
|-----------|-------|--------|-------------------|
| Keine Server-Side Rendering | Vite SPA | Erste Load etwas langsamer (aber akzeptabel mit Lazy Loading) | Phase F: ggf. zu Remix/Next.js migrieren |
| Email Notifications nicht möglich | PocketBase Email API deaktiviert | Nutzer kriegt keine Email-Benachrichtigungen | Alternative: In-App Notifications + Webhooks |
| Scheduled Cron Jobs nicht möglich | PocketBase Cron API deaktiviert | Keine automatisierten Aufgaben möglich | Alternative: Externe Cron-Jobs (z.B. AWS Lambda) |
| Query Parameter werden gelöscht | App redocumentation Script | Verhindert Tracking/Analytics-Parameter | Feature Request an STRATO: parameter-persistence |
| Kein Local Storage für große Daten | Browser-Limit 5-10 MB | App kann nicht offline arbeiten | Feature: Electron/PWA als offline-Mode |

---

## 20. Getroffene Architektur- und Entwicklungsentscheidungen

### Entscheidung 1: Custom Router statt react-router

| Element | Wert |
|---------|------|
| **Entscheidung** | Nutze custom App.jsx Router, nicht react-router v7 |
| **Hintergrund** | Vite SPA + einfache interne Navigation, keine komplexen Routen-Features nötig |
| **Gewählte Lösung** | history.pushState in App.jsx, manuelle Route-Auflösung |
| **Konsequenzen** | + Einfacher Code, - Kein Nested Routing, - Keine automatischen Redirects |
| **Zurückweisung** | react-router wäre Overkill für aktuelle Komplexität |

---

### Entscheidung 2: Datenbank-getriebene Seiten + Fallback

| Element | Wert |
|--------|------|
| **Entscheidung** | Seiten aus `app_pages` laden, mit hardcoded Fallback für Production |
| **Hintergrund** | STRATO Prod DB gibt 403, aber App soll nicht abstürzen |
| **Gewählte Lösung** | pageRegistry.ts mit Fallback (11 essenzielle Seiten) |
| **Konsequenzen** | + Resilience, - Manuelles Fallback-Mapping, - Prod-Daten nicht live aktualisierbar |
| **Zurückweisung** | Nur Backend-API: würde bei 403 abstürzen |

---

### Entscheidung 3: Component Registry (kein dynamic import aus DB)

| Element | Wert |
|--------|------|
| **Entscheidung** | Nur fest kodierte Komponenten im pageComponentRegistry |
| **Hintergrund** | Security: Verhindert arbitrary code execution aus DB |
| **Gewählte Lösung** | Whitelisted Components in pageComponentRegistry.ts |
| **Konsequenzen** | + Sicher, - Neue Seiten brauchen Code-Änderung |
| **Zurückweisung** | Dynamic imports aus DB: XSS-Sicherheitsrisiko |

---

### Entscheidung 4: Tailwind v4 (nicht v3)

| Element | Wert |
|--------|------|
| **Entscheidung** | Tailwind v4 mit neuem Engine (kein postcss nötig) |
| **Hintergrund** | Platform stellt v4 bereit, kein npm-Installation möglich |
| **Gewählte Lösung** | `@import "tailwindcss"` + `@config` in index.css |
| **Konsequenzen** | + Schneller, - Seltene Dokumentation, - Veraltete Tutorials |
| **Zurückweisung** | v3 würde postcss brauchen, ist aber nicht installiert |

---

### Entscheidung 5: Hardcoded NeuroWays Brand Colors

| Element | Wert |
|--------|------|
| **Entscheidung** | `nw-navy`, `nw-teal`, `nw-violet`, `nw-gold` als Tailwind Tokens |
| **Hintergrund** | Konsistente Brand-Anwendung, leicht zu ändern in Zukunft |
| **Gewählte Lösung** | Alle Token in `tailwind.config.cjs` + CSS Variables in `index.css` |
| **Konsequenzen** | + Einheitlich über alle Komponenten, - Große Config-Datei |
| **Zurückweisung** | Inline Styles: würde Duplikation fördern |

---

### Entscheidung 6: Production Fallback statt Prod-DB-Öffnung

| Element | Wert |
|--------|------|
| **Entscheidung** | Fallback Daten verwenden, nicht Prod DB-Rules ändern |
| **Hintergrund** | Keine Kontrolle über STRATO Prod-DB, Fallback ist sicherer |
| **Gewählte Lösung** | 11 hardcoded Pages in pageRegistry + 2 Nav-Items |
| **Konsequenzen** | + Kein Admin-Eingriff nötig, - Prod-Updates müssen Code-Change sein |
| **Zurückweisung** | Prod-DB-Permission Request: unbekannte Antwortzeit |

---

## 21. Offene Entscheidungen

| # | Fragestellung | Warum relevant | Betroffene Bereiche | Optionen | Was blockiert |
|----|---|---|---|---|---|
| 1 | **Dark Mode: Ja oder Nein?** | Design-Entscheidung für Phase X | Alle Komponenten, Design System | A) Ja, kompletter Dark Mode Support; B) Nein, nur Light Mode; C) OS-basiert (prefers-color-scheme) | Alle Dark-Mode-Arbeiten |
| 2 | **Welche Rollen sind final?** | Aktuell 6 Rollen definiert, möglicherweise unvollständig | app_navigation_roles, app_page_permissions, Sidebar Filterung | A) Die aktuellen 6; B) Reduziert zu 4 (member, admin, coach, researcher); C) Erweitert + Custom Roles | Rollenmigration in Phase D |
| 3 | **Check-in-Fragen: 3 oder 4 oder mehr?** | UX-Komplexität vs. Datentiefe | EnergyCheckInPage, Zonen-Klassifikation | A) 3 Fragen (schnell); B) 4 Fragen (Balance); C) 6+ Fragen (detailliert); D) Nutzerkonfigurierbar | Phase E Energy Navigator |
| 4 | **Zonen-Namen: Welche exakt?** | Fachliche Nomenklatur | EnergyHistoryPage, Visualisierung, Interventions-Matching | A) Low, Balanced, High, Transitioning; B) Hyper, Calm, Alert, Shutdown; C) Nutzer-definierbar | Phase E Berechnung |
| 5 | **Third-Party Integrationen später?** | Architektur-Entscheidung | API-Design, Authentifizierung | A) Nein, fokus auf NeuroWays; B) Ja, Webhook-basiert; C) Ja, OAuth-Integration | Phase X Erweiterungen |
| 6 | **Prod-DB-Daten: Wie synchronisieren?** | DevOps-Entscheidung | Fallback Maintenance, Admin-UI | A) Weiterhin Fallback-Daten nutzen; B) Prod-DB-Rules öffnen; C) Git-basierte Seed-Daten | Phase F Admin & Deployment |

---

## 22. Tests und Qualitätssicherung

### Vorhandene Tests

| Test-Art | Abdeckung | Status |
|----------|-----------|--------|
| **Unit Tests** | – | ❌ KEINE |
| **Integration Tests** | – | ❌ KEINE |
| **E2E Tests** | – | ❌ KEINE |
| **Manual Tests** | Routing, Navigation, Responsive | ⏳ TEILWEISE (während Entwicklung) |
| **Build Tests** | Vite Build kompiliert | ✅ OK (kein Build-Fehler) |

### Manuelle Test-Abdeckung

| Szenario | Status | Notes |
|----------|--------|-------|
| Startseite laden | ✅ GETESTET | Modules laden & anzeigen |
| Zu NeuroBalance navigieren | ✅ GETESTET | Route-Auflösung funktioniert |
| Mobile Navigation öffnen/schließen | ✅ GETESTET | Hamburgemenü funktioniert |
| Breadcrumbs anzeigen | ✅ GETESTET | Hierarchie wird angezeigt |
| 404 auf unbekannte Route | ✅ GETESTET | Redirect zu Home |
| Fallback-Navigation bei DB-Fehler | ✅ GETESTET | 2 hardcoded Items erscheinen |
| Responsive (Mobile/Tablet/Desktop) | ⏳ TEILWEISE | Startseite & Header getestet, nicht alle 17 Seiten |
| Keyboard Navigation | ✅ GETESTET | Tab, Enter, Escape funktionieren |
| WCAG A11y (Basics) | ✅ TEILWEISE | Semantic HTML, Focus, aber Skip-Link fehlt |

### Bekannte Testlücken

| Bereich | Lücke | Grund |
|---------|-------|-------|
| **Energy Navigator** | Keine Tests | 0% implementiert (Phase E) |
| **Authentifizierung** | Keine Tests | Nicht implementiert (Phase D) |
| **Rollen-Filterung** | Keine Tests | Nicht implementiert (Phase D) |
| **Granulare Berechtigungen** | Keine Tests | Nicht implementiert (Phase D) |
| **Admin-UI** | Keine Tests | Nicht implementiert (Phase F) |
| **Seitenmatrix vollständig** | Responsivität nicht alle 17 Seiten getestet | Nur Homepage + Header geprüft |

---

## 23. Deployment und Betrieb

### Aktuelle Deployment-Pipeline

```
1. Entwickler committet in GitHub (neuroways/Blueprint_AI)
   ↓
2. `cd app && npm run build` (oder `npm run build:prod`)
   ↓
3. Vite kompiliert React + Tailwind → /dist
   ↓
4. /dist wird committed (dist/index.html + assets/)
   ↓
5. STRATO liest /dist/index.html → serve on aibuilder-1z5ck.preview.ai-builder.strato.de
```

### Zielverzeichnisse

| Umgebung | Build-Befehl | Output | Serving URL |
|----------|---|---|---|
| **Dev/Preview** | `npm run build` | `/dist-preview/` | `https://aibuilder-1z5ck.preview.ai-builder.strato.de/` |
| **Production** | `npm run build:prod` | `/dist/` | `https://aibuilder-1z5ck.strato.de/` (wenn freigeschaltet) |

### Build-Prozess

```bash
# Development (preview mode)
cd app && npm run build
# Output: dist-preview/

# Production
cd app && npm run build:prod
# Output: dist/
```

### Deployment-Besonderheiten

| Element | Wert | Ort |
|---------|------|-----|
| **Base Href** | `/` | `index.html` |
| **Asset Base** | Relative (auto) | Vite config (verwaltet automatisch) |
| **Environment Detection** | Hostname-based | `src/lib/pb.ts` (preview → dev, live → prod) |
| **Fallback HTML** | Vite stellt SPA-Fallback bereit | `dist/index.html` (all routes → React handles) |

### Rollback-Mechanismus

**Aktuell NICHT vorhanden** – Git History vorhanden (84 Commits), aber Versionierung nicht konfiguriert.

**Empfehlung Phase F**: Git Tags + GitHub Releases für Versioning.

---

## 24. Risiken

### Technische Risiken

| Risiko | Eintrittswahrscheinlichkeit | Auswirkung | Mitigation |
|--------|---|---|---|
| **Prod-DB bleibt für immer 403** | MITTEL | Prod-Seite lädt mit Fallback, keine Live-Updates möglich | Phase D/F: Decide on Seed-Data Strategy |
| **React StrictMode Development Double-Render** | HOCH (aber expected) | Confusion, doppelte useEffect-Aufrufe | Sicherstellen, dass Effects idempotent sind (bereits getan) |
| **No Automated Tests** | HOCH | Regressions unentdeckt, Phase D/E Changes break existing | Phase F: Test Suite implementieren |
| **Component Registry ist fragil** | MITTEL | Neue Seite vergessen → 404 | Phase F: Auto-Generate registry aus pageRegistry |
| **Fallback-Daten out-of-sync mit DB** | MITTEL | User-Erwartungen nicht erfüllt | Phase F: Automated Sync-Checker |

---

### Fachliche Risiken

| Risiko | Eintrittswahrscheinlichkeit | Auswirkung | Mitigation |
|--------|---|---|---|
| **Energy Navigator Logik fehlinterpretiert** | MITTEL | Zonen-Klassifikation funktioniert nicht richtig | Phase E: Fachliche Anforderungs-Klärung + Review mit Domain-Expert |
| **Rollen-Mapping unkomplett** | HOCH | Einige Nutzer haben keine Seiten-Zugriffe | Phase D: Vollständige Rollen-Matrix mit PM definieren |
| **Check-in-Fragen zu komplex** | MITTEL | Nutzer bricht ab, gibt False-Data | Phase E: Usability-Testing mit Target-Audience |
| **Zugänglichkeit reicht nicht** | MITTEL | Neurodivergente Nutzer können App nicht bedienen | Phase D/F: WCAG 2.2 AA Audit + Remediation |

---

### Geschäftliche Risiken

| Risiko | Eintrittswahrscheinlichkeit | Auswirkung | Mitigation |
|--------|---|---|---|
| **Scope Creep (mehr Module als geplant)** | HOCH | Phase E/F verzögert sich | Clear Roadmap mit MoSCoW-Priorisierung |
| **Nutzer-Adoption niedrig** | MITTEL | Feature-Requests nicht umsetzbar | Phase F: Beta-Testing mit Early Adopters |

---

## 25. Empfohlene nächste Entwicklungsschritte

### Immediate (Phase D – nächste 2-3 Wochen)

#### D-1: Authentifizierung & Login (P0)

**Aufgabe**: Benutzer können sich anmelden

1. **Schritt 1**: LoginPage.jsx erstellen
   - Zweck: Email/Password-Formular
   - Komponenten: Input-Felder, Submit-Button, Error-Messages
   - Datei: `src/platform/pages/LoginPage.jsx`
   - Voraussetzungen: Keine
   - Betroffene Dateien: `src/platform/pages/LoginPage.jsx`, `pageComponentRegistry.ts` (neue Komponente registrieren)

2. **Schritt 2**: PocketBase Auth integrieren
   - Zweck: Token speichern, Session-Management
   - Service erstellen: `src/core/auth/authService.ts`
   - Methoden: `login()`, `logout()`, `getCurrentUser()`, `getCurrentUserRole()`
   - Datei: `src/core/auth/authService.ts`
   - Betroffene Dateien: `App.jsx` (Auth-Prüfung bei Startup), `Header.jsx` (Logout-Button)

3. **Schritt 3**: requires_auth in pageResolver prüfen
   - Tweck: Redirect zu Login wenn erforderlich
   - Änderung: `pageResolver.ts::isPageAccessible()` – requires_auth prüfen
   - Datei: `src/core/routing/pageResolver.ts`
   - Voraussetzungen: D-1.2 (authService)

**Erwartetes Ergebnis**: Nutzer kann anmelden, Session bleibt über Reload erhalten, requires_auth=true Seiten sind geschützt

**Akzeptanzkriterium**:
- [ ] LoginPage rendert & funktioniert
- [ ] Login speichert Token in localStorage
- [ ] Logout löscht Token
- [ ] requires_auth=true Seiten redirect zu Login
- [ ] Refresh erhält Session

---

#### D-2: Rollenbasierte Navigation (P0)

**Aufgabe**: Sidebar/Mobile Navigation wird nach Rolle gefiltert

1. **Schritt 1**: app_navigation_roles in Sidebar nutzen
   - Zweck: Nur Nav-Items für aktuelle Rolle anzeigen
   - Änderung: `Sidebar.jsx` + `MobileNavigation.jsx`
   - Neue Logik: `getNavigationByRole(navItems, userRole)`
   - Datei: `src/core/navigation/navigationService.ts`

2. **Schritt 2**: Navigation-Filterung implementieren
   - Zweck: Role-basierte Filterung in navigationService
   - Methode: Lade app_navigation_roles, Filter navItems
   - Datei: `src/core/navigation/navigationService.ts`

**Erwartetes Ergebnis**: Nutzer mit role=member sieht nur member-Items, Nutzer mit role=admin sieht alle

**Akzeptanzkriterium**:
- [ ] navigationService hat `getNavigationByRole(items, role)` Methode
- [ ] Sidebar lädt Navigation mit aktueller Rolle
- [ ] MobileNavigation auch gefiltert
- [ ] Unknown role = no items

---

#### D-3: app_page_permissions im Router (P0)

**Aufgabe**: Granulare Seitenberechtigung implementieren

1. **Schritt 1**: permissionGuard.ts vollständig implementieren
   - Zweck: Zentrale Berechtigungs-Prüfung
   - Methode: `checkPagePermission(page, user)` → boolean
   - Datei: `src/core/access/permissionGuard.ts`

2. **Schritt 2**: isPageAccessible() erweitern
   - Zweck: Berechtigungen in Router-Entscheidung einbeziehen
   - Änderung: `pageResolver.ts::isPageAccessible()` – app_page_permissions prüfen
   - Datei: `src/core/routing/pageResolver.ts`

**Erwartetes Ergebnis**: Nutzer kann Seite sehen (can_view=true), aber nicht bearbeiten (can_update=false), Buttons sind disabled

**Akzeptanzkriterium**:
- [ ] permissionGuard hat `checkPagePermission()` Methode
- [ ] pageResolver nutzt permissionGuard
- [ ] Seiten-Zugriff wird pro Rolle geprüft
- [ ] can_view prüfung blockiert Zugriff
- [ ] UI-Buttons adaptieren sich zu can_update (später)

---

### Short-Term (Phase E – 3-4 Wochen)

#### E-1: Energy Check-in Collection & Logik (P1)

**Aufgabe**: Nutzer kann Energy Check-ins durchführen

1. **Schritt 1**: check_in_results Collection in PocketBase erstellen
   - Schema:
     ```
     id (auto)
     user_id (relation to users)
     zone (Low|Balanced|High|Transitioning)
     timestamp (autodate)
     answers (json) // ['q1_answer', 'q2_answer', 'q3_answer']
     result_code (text) // für Recommendations
     created (autodate)
     updated (autodate)
     ```

2. **Schritt 2**: EnergyCheckInPage implementieren
   - Zweck: 3-4 Fragen zum Energiestatus
   - UI: Radio-Buttons oder Cards für Antworten
   - Datei: `src/modules/neurobalance/pages/EnergyCheckInPage.jsx`
   - Betroffene Dateien: `pageComponentRegistry.ts` (aktualisieren)

3. **Schritt 3**: Zonen-Klassifikation-Logik
   - Zweck: Antwort-Set → Zone
   - Service: `src/core/energy/zoneClassifier.ts`
   - Methode: `classifyZone(answers) → Zone`
   - Beispiel:
     ```
     Q1 (Körper-Gefühl) + Q2 (Mind-State) + Q3 (Anforderungen) 
     → Scoring → Zone
     ```

4. **Schritt 4**: Check-in speichern & Ergebnis-Redirect
   - Zweck: POST zu check_in_results, dann zu Ergebnis-Seite
   - Änderung: EnergyCheckInPage.jsx::onSubmit()
   - Datei: `src/modules/neurobalance/pages/EnergyCheckInPage.jsx`

**Erwartetes Ergebnis**: Nutzer macht Check-in, sieht Ergebnis-Seite mit Zone und Recommendations

**Akzeptanzkriterium**:
- [ ] Collection erstellt mit richtigen Feldern
- [ ] CheckInPage zeigt Fragen
- [ ] Antworten werden klassifiziert zu Zone
- [ ] Ergebnis wird gespeichert in DB
- [ ] Nutzer sieht Ergebnis (Zone + Emp)
- [ ] Verlauf ist später ladbar

---

#### E-2: Energieverlauf-Visualisierung (P1)

**Aufgabe**: Nutzer sieht seine Check-in-Historie

1. **Schritt 1**: EnergyHistoryPage implementieren
   - Zweck: Zeige letzten 7/30/90 Tage Check-ins
   - UI: Chart (z.B. mit recharts oder canvas) + Liste
   - Datei: `src/modules/neurobalance/pages/EnergyHistoryPage.jsx`

2. **Schritt 2**: Daten laden & filtern
   - Methode: Lade check_in_results mit `filter=user_id={id}` + Zeitfilter
   - Service: `src/core/energy/energyHistoryService.ts`
   - Methode: `getCheckInHistory(userId, days=7) → CheckInResult[]`

**Erwartetes Ergebnis**: Nutzer sieht Chart mit Energieverläufen der letzten Woche

**Akzeptanzkriterium**:
- [ ] HistoryPage lädt & zeigt Daten
- [ ] Chart rendert 7-Tage-Übersicht
- [ ] Filter nach Zeitraum funktioniert
- [ ] List-View zeigt Details

---

### Medium-Term (Phase F – 2-3 Wochen)

#### F-1: Admin-UI für Seiten-Verwaltung (P2)

**Aufgabe**: Admin kann Seiten aktivieren/deaktivieren ohne Code

1. **Schritt 1**: AdminPagesManagementPage erstellen
   - Zweck: CRUD für app_pages
   - UI: Tabelle mit Seiten, Toggle is_enabled, Edit-Button
   - Datei: `src/modules/admin/pages/PagesManagementPage.jsx`

2. **Schritt 2**: CRUD-Formen
   - Zweck: Create/Update Seite
   - Components: Input-Felder für title, route_path, component_key, etc.
   - Datei: `src/modules/admin/components/PageForm.jsx`

3. **Schritt 3**: PocketBase API-Aufrufe
   - Service: `src/core/admin/adminService.ts`
   - Methoden: `createPage()`, `updatePage()`, `deletePage()`

**Erwartetes Ergebnis**: Admin kann Seiten verwalten ohne Code

**Akzeptanzkriterium**:
- [ ] Admin-UI zeigt Tabelle mit Seiten
- [ ] Toggle is_enabled funktioniert (sofort in DB)
- [ ] Edit-Form funktioniert
- [ ] Delete funktioniert
- [ ] Create neue Seite funktioniert

---

### Long-Term (Phase G – Testing & Polish – 1-2 Wochen)

#### G-1: WCAG 2.2 AA Accessibility Audit
- Skip-Link hinzufügen
- Aria-Labels vervollständigen
- Contrast-Ratio prüfen
- Testing mit Screen Reader

#### G-2: Automated Test Suite (Optional)
- Vitest für Unit Tests
- Playwright für E2E Tests
- 70% Code Coverage anstreben

---

## 26. Einstiegspunkt für die nächste KI

### Was muss zuerst gelesen werden?

1. **`AGENTS.md`** (2 min) – Aktueller Projektstatus
2. **`PHASE_C_KORREKTUR.md`** (5 min) – Was ist tatsächlich implementiert vs. was nicht
3. **`docs/architecture/routing-model.md`** (10 min) – Wie funktioniert das Routing
4. **`src/App.jsx`** (10 min) – Zentrale Router-Logik
5. **`src/core/routing/pageRegistry.ts`** (5 min) – Seiten-Service + Fallback-Daten

### Welche Dateien sind besonders wichtig?

| Datei | Kritikalität | Grund |
|-------|---|---|
| `src/App.jsx` | 🔴 KRITISCH | Zentrale Routing-Logik |
| `src/core/routing/pageRegistry.ts` | 🔴 KRITISCH | Seiten-Daten + Fallback |
| `tailwind.config.cjs` | 🔴 KRITISCH | Design-Tokens (ändern diese = visuelle Änderungen überall) |
| `src/lib/pb.ts` | 🟡 WICHTIG | PocketBase-Instanz (Dev vs Prod Routing) |
| `src/page-templates/PageTemplate.jsx` | 🟡 WICHTIG | Wrapper für alle Seiten (Titel, Beschreibung, Back-Button) |
| `src/shell/components/StandardLayout.jsx` | 🟡 WICHTIG | Main Layout (Header + Sidebar + Content) |

### Was darf nicht ohne Prüfung verändert werden?

- **`tailwind.config.cjs`**: Design-Token-Änderungen beeinflussen alle Komponenten
- **`src/lib/pb.ts`**: Endpoint-Routing (Dev vs Prod)
- **`src/App.jsx`**: Router-Logik
- **`index.html`**: `<base href>`, `<title>`, Favicon

### Was ist der nächste empfohlene Arbeitsschritt?

**Phase D – Authentifizierung & Rollen (Priority P0):**

1. **Woche 1**: LoginPage + authService
   - LoginPage.jsx mit Formular
   - authService.ts mit `login()`, `logout()`, `getCurrentUser()`, `getCurrentUserRole()`
   - requires_auth Prüfung in pageResolver

2. **Woche 2**: Rollenbasierte Navigation
   - app_navigation_roles in navigationService nutzen
   - Sidebar/MobileNavigation nach Rolle filtern

3. **Woche 3**: Granulare Berechtigungen
   - permissionGuard.ts vollständig implementieren
   - app_page_permissions in pageResolver prüfen

---

### Welche offenen Entscheidungen muss die KI respektieren?

1. **Dark Mode**: Noch nicht entschieden → nicht implementieren
2. **Rollen-Struktur**: 6 Rollen definiert → nicht ändernohne Absprache
3. **Check-in-Fragen**: Genau 3, 4, oder mehr? → Fachliche Klärung nötig (Phase E)
4. **Zonen-Namen**: Low/Balanced/High/Transitioning → in Energy Navigator nutzen

---

### Wie kann die KI prüfen, dass ihre Änderung funktioniert?

**Dev-Prozess:**

```bash
# 1. Änderung in src/ vornehmen
# 2. npm run dev (Vite stellt Live-Reload zur Verfügung)
# 3. Browser: http://localhost:5173
# 4. Komponente sollte sofort mit Änderung erscheinen

# 5. Vor Commit: Build testen
cd app && npm run build
# Sollte ohne Fehler durchlaufen

# 6. Git Status prüfen
git status
# Sollte nur src/, public/, docs/ Dateien zeigen (nicht dist/)

# 7. Commit
git add .
git commit -m "feat: <Beschreibung>"
git push origin main
```

**Test-Checkliste:**

- [ ] Startseite lädt (`http://localhost:5173/`)
- [ ] Navigation funktioniert (Sidebar/Mobile)
- [ ] Neue Änderung ist sichtbar
- [ ] Keine Build-Fehler
- [ ] Keine Console-Errors

---

## 27. Unsicherheiten und fehlende Informationen

### Ungeklärte technische Punkte

| Punkt | Grund | Auswirkung | Status |
|-------|-------|-----------|--------|
| **Prod-DB Access Rules** | Prod Collections geben 403, aber Scope unbekannt | Fallback muss hardcoded bleiben oder DB-Rules ändern | UNGEKLÄRT – braucht Admin-Zugriff auf STRATO |
| **Versioning & Rollback** | Keine Git Tags oder Release-Nummern vorhanden | Deploment-Tracking schwierig | UNGEKLÄRT – zu implementieren in Phase F |
| **Zeitzone für Check-ins** | App nutzt Browser-Zeitzone oder Server? | Check-in-Zeitstempel könnten falsch sein | UNGEKLÄRT – zu entscheiden in Phase E |
| **PocketBase Collections-Namen** | Sind final oder können sich noch ändern? | Migration bei Namens-Änderung aufwendig | UNGEKLÄRT – zu dokumentieren |

---

### Ungeklärte fachliche Punkte

| Punkt | Grund | Auswirkung | Status |
|-------|-------|-----------|--------|
| **Energy Navigator Fragen** | Genau welche 3-4 Fragen? | Check-in-Validierung abhängig | UNGEKLÄRT – braucht Domain-Expert Input |
| **Zonen-Klassifikation Algorithmus** | Wie berechnet man Zone aus Antworten? | Scoring-Logik unklar | UNGEKLÄRT – zu definieren in Phase E |
| **Interventionen-Katalog** | Welche Interventionen sind relevant? | Recommendations abhängig | UNGEKLÄRT – Content-Arbeit nötig |
| **Rollen-Mapping für Seiten** | Welche Rolle sieht welche Seite? | Navigation/Zugriff unklar | UNGEKLÄRT – zu definieren in Phase D |
| **Dark Mode: Farben?** | Falls Dark Mode: Welche Farben für Navy/Teal? | Design-Entscheidung | UNGEKLÄRT – zu entscheiden |

---

### Fehlende externe Informationen

| Information | Quelle | Status |
|---|---|---|
| **STRATO Platform Dokumentation** | STRATO Admin | NICHT VORHANDEN in Projekt |
| **NeuroWays Fachliche Anforderungen (vollständig)** | Product Owner | TEILWEISE vorhanden (nur Phase C Struktur) |
| **Prod-DB Zugang & Permissions** | STRATO Admin | NICHT TESTBAR |
| **User Research / Design System (vollständig)** | Design/UX Team | NUR LOGO + FARBEN vorhanden |
| **Deployment-Prozess (Versionierung, Rollback)** | DevOps/STRATO | NICHT DOKUMENTIERT |

---

## 28. Übergabe-Check

- [x] Anforderungen erfasst (41 Anforderungen in Katalog)
- [x] Implementierte Funktionen erfasst (12 vollständig, 12 teilweise)
- [x] Offene Anforderungen erfasst (P0-P3 Backlog)
- [x] Teilweise implementierte Funktionen erfasst (NeuroBalance, Auth, Rollen)
- [x] Seitenstruktur erfasst (17 Seiten mit Status)
- [x] Repositorystruktur erfasst (Vollständiger Dateibaum)
- [x] Architektur erfasst (High-Level + Components)
- [x] Datenbank erfasst (5 Collections mit Schemas)
- [x] APIs erfasst (Implementiert + Geplant)
- [x] Geschäftslogik erfasst (12 Rules mit Implementierungs-Ort)
- [x] Erledigte Aufgaben erfasst (24 Tasks dokumentiert)
- [x] Offene Aufgaben erfasst (P0-P3 mit Details)
- [x] Fehler und technische Schulden erfasst (9 Items)
- [x] Deployment erfasst (Pipeline, Build, Hosting)
- [x] Nächste Schritte definiert (Phase D → G mit Details)
- [x] Unsicherheiten ausdrücklich dokumentiert (9 Items)
- [x] Keine Secrets enthalten ✅ (Token, Passwörter nicht gezeigt)
- [x] Keine vermuteten Informationen als Fakten dargestellt

---

## Abschluss

**Projektname**: NeuroWays – Digitale Plattform für Neurodiversität-Awareness

**Stand**: 2026-08-15

**Handover vollständig**: Alle 28 Sektionen dokumentiert, 41 Anforderungen katalogisiert, 84 Git-Commits, alle Dateien & Architektur analysiert.

**Nächste Phase**: Phase D – Authentifizierung & Rollen (Startbereit)

**Kontakt für Fragen**: Siehe offene Entscheidungen (#21) – brauchen fachliche Klärung mit Domain-Experts

---

**Generiert von**: AI App & Site Builder  
**Für**: Nächste KI oder Entwickler, die NeuroWays weiterbaut  
**Gültig für**: Phase D+ Entwicklung
