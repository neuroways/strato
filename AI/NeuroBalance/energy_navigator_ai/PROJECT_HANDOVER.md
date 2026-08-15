# PROJECT HANDOVER

## 1. Dokumentinformationen

| Feld | Wert |
|---|---|
| Projekt | NeuroWays / Energy Navigator |
| Handover-Datei | `docs/handover/PROJECT_HANDOVER.md` |
| Erstellungsdatum | 2026-08-15 |
| Primäre Quelle | `NeuroWays_Energy_Navigator_COMPLETE.zip` |
| Quellstatus | Rekonstruierter Projektstand aus vorhandenen Originaldateien und Quellcodefragmenten |
| Repository | Nicht Bestandteil dieser Handover-Erstellung; aus der ZIP nicht verifizierbar |
| Branch | Nicht aus der ZIP bestimmbar |
| Entwicklungsstand | Funktionsfähige React-/PocketBase-Anwendung mit Energy Navigator, Identity, Journey, Modulverwaltung und Module Builder; mehrere Plattformabhängigkeiten und fehlender DB-Export verhindern eine vollständige unabhängige Wiederherstellung |
| Haupttechnologien | React, Vite, Tailwind CSS v4, React Router, PocketBase |
| Hosting/Deployment | Entwicklungsplattform-spezifische Vite-/PocketBase-Anbindung vorhanden; Deployment-Standard dokumentiert |
| Zweck | Übergabe des tatsächlich in der ZIP vorhandenen Projektstands an eine andere KI oder Entwicklerin |

### Wahrheitsgrundsatz

Dieses Handover basiert ausschließlich auf dem Inhalt der bereitgestellten ZIP. Anforderungen oder historische Aussagen außerhalb der ZIP wurden nicht als Implementierungsnachweis verwendet.

Statusbegriffe:

- **IMPLEMENTIERT** – im Quellcode oder in den enthaltenen Projektdateien nachweisbar.
- **TEILWEISE IMPLEMENTIERT** – Bestandteile vorhanden, aber erkennbare Lücken/Abhängigkeiten.
- **GEPLANT** – in Dokumentation beschrieben, nicht im aktuellen Anwendungscode nachweisbar.
- **OFFEN** – für Betrieb, Konsolidierung oder Wiederherstellung noch erforderlich.
- **UNGEKLÄRT** – aus der ZIP nicht belastbar bestimmbar.
- **ERSETZT / VERALTET** – eine ältere Variante ist noch vorhanden, wird aber vom aktuellen Routing/Code nicht mehr verwendet.
- **REQUIRES_REVIEW** – widersprüchlicher oder nicht eindeutig rekonstruierbarer Stand.

---

## 2. Executive Summary

NeuroWays Energy Navigator ist eine React-Single-Page-Application zur persönlichen Beobachtung des Energie- und Belastungszustands. Die Fachlogik der Methode wird weitgehend datengetrieben aus PocketBase geladen: Methoden, Fragen, Antwortoptionen und Ergebnisregeln werden nicht als feste Fragebögen im Frontend definiert.

Der vorliegende Projektstand enthält zusätzlich eine produktive Identity-Schicht, einen persönlichen Workspace, den Reise-/Verlaufsbereich, eine Prompt Library, eine Modulverwaltung und einen Module Builder mit `.nwp`-Paketerzeugung.

Der Quellcode ist in der ZIP weitgehend vorhanden. Die Datenbank selbst ist jedoch **nicht** enthalten. `RECONSTRUCTION_STATUS.json` weist ausdrücklich darauf hin, dass kein Live-PocketBase-Schema oder Datenbankbackup verfügbar war. Daher können Collection-Schemata, Regeln, sämtliche Stammdaten und Benutzerdaten nicht vollständig aus dieser Übergabe wiederhergestellt werden.

Die Build-Konfiguration ist noch an die bisherige Entwicklungsplattform gebunden: `vite.config.js` importiert `defineConfig` aus `/usr/lib/sfs-assistant-dev/platform-config.js`; `package.json` enthält keine Dependencies; `pb.js` initialisiert PocketBase ohne explizite URL. Ein unabhängiger Build ist deshalb mit der ZIP allein noch nicht reproduzierbar.

---

## 3. Fachliches Zielbild

Der Energy Navigator dient der niedrigschwelligen, nicht medizinischen Selbstbeobachtung. Nutzer:innen beantworten schrittweise Fragen zum aktuellen Energie- und Belastungszustand. Aus numerischen Antwortwerten wird über datenbankgestützte Ergebnisregeln eine Zone bestimmt. Ergebnisse werden gespeichert und können im persönlichen Verlauf bzw. in „Meine Reise“ betrachtet werden.

Fachliche Grundprinzipien, die im vorhandenen Code erkennbar sind:

1. Fragen, Antwortoptionen und Score-Regeln liegen im Backend.
2. Historische Check-ins speichern eine `method_version`.
3. Ergebniszonen werden über `result_rules` aufgelöst.
4. Text, Icon und Farbe werden in der UI zusammen eingesetzt; Information soll nicht allein über Farbe vermittelt werden.
5. Persönliche Daten werden mit der angemeldeten Benutzer-ID verknüpft.
6. Die App versteht sich ausdrücklich nicht als Diagnose- oder Therapieinstrument.

Zusätzlich entwickelt sich die Anwendung zu einer NeuroWays-Plattform mit:

- Identity und geschützten Bereichen,
- persönlichem Workspace,
- Modulregistrierung,
- Module Builder und `.nwp`-Paketen,
- interner Prompt Library,
- Design-/World-/Asset-Standards.

---

## 4. Anforderungen

| ID | Anforderung | Kategorie | Status | Nachweis | Offene Punkte |
|---|---|---|---|---|---|
| EN-001 | Datengetriebener Energy Check-in | Fachfunktion | IMPLEMENTIERT | `src/pages/CheckIn.jsx`, `src/lib/engine.js` | Backenddaten fehlen in ZIP |
| EN-002 | Ergebnis anhand Score-Regeln bestimmen | Fachlogik | IMPLEMENTIERT | `resolveResultRule()` in `src/lib/engine.js` | Exakte produktive Regeln nur in DB |
| EN-003 | Methodenversion je Check-in speichern | Versionierung | IMPLEMENTIERT | `saveCheckin()` | Historische DB-Daten fehlen |
| EN-004 | Check-in-Verlauf anzeigen | Fachfunktion | IMPLEMENTIERT | `History.jsx`, `Journey.jsx` | Aktuelles Routing nutzt `Journey.jsx` |
| EN-005 | Persönliche Journey / Notizen / Muster | Fachfunktion | IMPLEMENTIERT | `Journey.jsx`, `JourneyEntry.jsx`, `PatternsView.jsx` | Benötigte DB-Felder müssen im Schema bestätigt werden |
| ID-001 | Registrierung/Login/Logout | Identity | IMPLEMENTIERT | `identity.js`, Auth-Seiten | Produktive SMTP-Funktion fehlt |
| ID-002 | Route Guard | Security/UI | IMPLEMENTIERT | `ProtectedRoute.jsx` | Serverseitige Regeln nicht in ZIP |
| ID-003 | LOCKED/DEACTIVATED berücksichtigen | Identity | IMPLEMENTIERT | `identity.js`, `ProtectedRoute.jsx` | Collection-Regeln nicht verifizierbar |
| ID-004 | Passwort-Reset per E-Mail | Identity | TEILWEISE IMPLEMENTIERT | `ForgotPasswordPage.jsx`, `requestPasswordReset()` | Kein produktiver E-Mail-Versand |
| MOD-001 | Module Registry | Plattform | IMPLEMENTIERT | `moduleRegistry.js`, `ModuleManagerPage.jsx` | DB-Schema `pkg_modules` fehlt |
| MOD-002 | Module Builder | Plattform | IMPLEMENTIERT | `builderEngine.js`, `ModuleBuilderPage.jsx` | Package-Installationsruntime nicht enthalten |
| MOD-003 | `.nwp` Package erzeugen/downloaden | Plattform | IMPLEMENTIERT | `generatePackage()`, `downloadPackage()` | Manifestgröße aktuell auf zwei DB-Felder begrenzt |
| DEV-001 | Prompt Library | Entwicklung | IMPLEMENTIERT | `PromptLibraryPage.jsx` | Nur durch DB-Daten nutzbar |
| DEP-001 | DEV→LIVE-Stammdatenmigration | Deployment | TEILWEISE IMPLEMENTIERT | `nw_migrate.js`, `NW-DEPLOY-001...md` | Script ist plattformspezifisch |
| SH-001 | Unabhängiger Build außerhalb Plattform | Betrieb | OFFEN | `vite.config.js`, leere Dependencies | Standard-Vite-Konfiguration + Dependencies fehlen |
| DB-001 | Vollständige DB-Rekonstruktion | Betrieb | OFFEN | `RECONSTRUCTION_STATUS.json` | Schema, Regeln, Datenexport fehlen |

---

## 5. Implementierter Funktionsumfang

### 5.1 Energy Navigator

**Status:** IMPLEMENTIERT

Zentrale Dateien:

- `src/pages/CheckIn.jsx`
- `src/pages/Result.jsx`
- `src/pages/Journey.jsx`
- `src/pages/History.jsx`
- `src/lib/engine.js`
- `src/components/AnswerCard.jsx`
- `src/components/ZoneCard.jsx`
- `src/components/ZoneIcon.jsx`

Funktion:

- aktive Methode laden,
- aktive Fragen laden,
- Antwortoptionen pro Frage laden,
- Methodenbereitschaft prüfen,
- erreichbare Score-Spanne gegen Ergebnisregeln diagnostizieren,
- Check-in speichern,
- Antworten speichern,
- Ergebnisregel ermitteln,
- einzelne und alle Check-ins laden/löschen/exportieren.

Einschränkung: Die zugehörigen PocketBase-Daten und Collection-Definitionen sind nicht Teil der ZIP.

### 5.2 Identity

**Status:** IMPLEMENTIERT / E-Mail-Funktionen TEILWEISE

Dateien:

- `src/lib/identity.js`
- `src/lib/authContext.jsx`
- `src/components/ProtectedRoute.jsx`
- `src/pages/LoginPage.jsx`
- `src/pages/RegisterPage.jsx`
- `src/pages/ForgotPasswordPage.jsx`
- `src/pages/IdentityPoc.jsx`

Unterstützt:

- Registrierung,
- Login,
- Logout,
- Passwortänderung,
- Session-Refresh,
- Kontostatus ACTIVE / LOCKED / DEACTIVATED,
- Audit-Events,
- persönlicher Testwert,
- Route Guard.

Nicht produktiv abgeschlossen:

- tatsächlicher E-Mail-Versand für Passwort-Reset,
- E-Mail-Verifizierung.

### 5.3 Personal Workspace

**Status:** IMPLEMENTIERT

`/dashboard` rendert derzeit **WorkspacePage**, nicht `DashboardPage`.

Datei:

- `src/pages/WorkspacePage.jsx`

Funktion:

- Begrüßung und persönlicher Einstieg,
- letzte Check-ins,
- Quick Actions,
- Link zum Check-in,
- Link zu „Meine Reise“,
- Modulkarte für den Energy Navigator.

`DashboardPage.jsx` ist weiterhin vorhanden, wird durch das aktuelle Routing aber nicht verwendet.

### 5.4 Journey und Pattern View

**Status:** IMPLEMENTIERT

Dateien:

- `src/pages/Journey.jsx`
- `src/components/JourneyEntry.jsx`
- `src/components/PatternsView.jsx`

Die Journey erweitert den reinen Verlauf um ergänzende Informationen und Musterbetrachtung. Die aktuelle Route `/history` verwendet `Journey.jsx`. Die ältere `History.jsx` bleibt im Projekt, ist über die aktuelle `App.jsx` jedoch nicht direkt geroutet.

### 5.5 Module Registry

**Status:** IMPLEMENTIERT

Dateien:

- `src/lib/moduleRegistry.js`
- `src/pages/ModuleManagerPage.jsx`

Collection:

- `pkg_modules`

Unterstützt:

- Modulregistrierung,
- Statusmodell,
- Aktivierung/Deaktivierung,
- Abhängigkeitsprüfung,
- Modulmetadaten.

### 5.6 Module Builder

**Status:** IMPLEMENTIERT

Dateien:

- `src/lib/builderEngine.js`
- `src/pages/ModuleBuilderPage.jsx`

Collections:

- `nwp_drafts`
- `nwp_packages`

Funktion:

- mehrstufige Modulerfassung,
- Entwürfe speichern,
- Abhängigkeiten validieren,
- NWP-Manifest erzeugen,
- SHA-256-Prüfsumme erzeugen,
- Package in PocketBase speichern,
- `.nwp` herunterladen.

### 5.7 Prompt Library

**Status:** IMPLEMENTIERT

Datei:

- `src/pages/PromptLibraryPage.jsx`

Collection:

- `dev_prompts`

Route:

- `/admin/prompts`

### 5.8 Asset Engine Validation

**Status:** TEILWEISE IMPLEMENTIERT / plattformspezifisch

Datei:

- `src/lib/asset_engine_validation.js`

Verwendete Collections:

- `asset_versions`
- `asset_files`
- `asset_assignments`
- `asset_metadata`
- `asset_prompts`
- `world_versions`

Die Datei verwendet Node.js `http`, `process.env.PB_TOKEN`, einen Unix-Socket und `/.sfs-bd/api`. Sie gehört technisch nicht in ein normales Browser-Bundle und ist an die bisherige Plattform gekoppelt.

---

## 6. Seiten- und Navigationsstruktur

Aktuelles Routing aus `src/App.jsx`:

```text
Application
├── /login
│   └── LoginPage
├── /register
│   └── RegisterPage
├── /forgot-password
│   └── ForgotPasswordPage
├── /dashboard                 [Protected]
│   └── WorkspacePage
├── /checkin                   [Protected]
│   └── CheckIn
├── /result/:id                [Protected]
│   └── Result
├── /history                   [Protected]
│   └── Journey
├── /privacy                   [Protected]
│   └── Privacy
├── /identity-poc              [öffentlich / Dev-POC]
│   └── IdentityPoc
├── /admin/prompts             [Protected]
│   └── PromptLibraryPage
├── /admin/modules             [Protected]
│   └── ModuleManagerPage
├── /admin/builder             [Protected]
│   └── ModuleBuilderPage
├── /
│   └── Redirect → /dashboard
└── *
    └── Redirect → /dashboard
```

### Seiten

| Route | Seite | Zweck | Status |
|---|---|---|---|
| `/login` | LoginPage | Anmeldung | IMPLEMENTIERT |
| `/register` | RegisterPage | Kontoerstellung | IMPLEMENTIERT |
| `/forgot-password` | ForgotPasswordPage | Passwort-Reset-Anforderung | TEILWEISE |
| `/dashboard` | WorkspacePage | Persönlicher Workspace | IMPLEMENTIERT |
| `/checkin` | CheckIn | Energy Check-in | IMPLEMENTIERT |
| `/result/:id` | Result | Ergebnisdetail | IMPLEMENTIERT |
| `/history` | Journey | Reise-/Verlaufsansicht | IMPLEMENTIERT |
| `/privacy` | Privacy | Export/Löschen eigener Check-ins | IMPLEMENTIERT |
| `/identity-poc` | IdentityPoc | Identity-Testseite | IMPLEMENTIERT, Dev-Tool |
| `/admin/prompts` | PromptLibraryPage | Promptverwaltung/-anzeige | IMPLEMENTIERT |
| `/admin/modules` | ModuleManagerPage | Modulverwaltung | IMPLEMENTIERT |
| `/admin/builder` | ModuleBuilderPage | Module Builder | IMPLEMENTIERT |

### Nicht aktuell geroutete Seiten

- `DashboardPage.jsx` – ältere/alternative Dashboard-Variante.
- `Home.jsx` – ältere öffentliche/erste Energy-Navigator-Startseite.
- `History.jsx` – älterer reiner Verlauf, aktuell durch `Journey.jsx` ersetzt.

**Status:** ERSETZT / VERALTET bzw. REQUIRES_REVIEW, weil sie im Quellbaum verbleiben.

---

## 7. User Flows

### 7.1 Registrierung

```text
/register
→ Eingaben prüfen
→ users-Record erstellen
→ Audit REGISTRATION
→ automatischer Login
→ /dashboard
```

### 7.2 Login

```text
/login
→ E-Mail + Passwort
→ PocketBase authWithPassword
→ account_status prüfen
→ Audit
→ ursprüngliche geschützte Route oder /dashboard
```

### 7.3 Energy Check-in

```text
/dashboard
→ /checkin
→ aktive Methode laden
→ Fragen + Antwortoptionen + Regeln laden
→ Readiness validieren
→ Fragen schrittweise beantworten
→ Score berechnen
→ Result Rule ermitteln
→ Check-in speichern
→ Antworten speichern
→ /result/:id
```

### 7.4 Persönliche Reise

```text
/dashboard
→ /history
→ Check-ins + Regeln laden
→ Journey darstellen
→ ergänzende Einträge/Muster
→ Ergebnisdetail bei Bedarf
```

### 7.5 Module Builder

```text
/admin/builder
→ Entwurf anlegen/öffnen
→ 9 Builder-Schritte
→ Validierung
→ NWP-Manifest erzeugen
→ nwp_packages speichern
→ .nwp herunterladen
```

---

## 8. Technische Architektur

Die Anwendung ist eine clientseitige React-SPA. Die UI und ein wesentlicher Teil der Geschäftslogik laufen im Browser. Persistenz, Authentifizierung und Collection-Zugriffe erfolgen über PocketBase.

```text
Browser
│
├── React SPA
│   ├── App.jsx / React Router
│   ├── AuthProvider
│   ├── Pages
│   ├── Components
│   └── lib/*
│
├── PocketBase JavaScript SDK
│   └── pb = new PocketBase()
│
▼
PocketBase
├── Auth: users
├── Energy: methods/questions/answer_options/result_rules
├── Check-ins: checkins/checkin_answers
├── Identity: identity_test_values/identity_audit_log
├── Module Registry: pkg_modules
├── Builder: nwp_drafts/nwp_packages
├── Dev: dev_prompts
└── weitere Collections aus Migration/Asset-System
```

Zusätzlich existieren server-/plattformnahe Skripte:

```text
nw_migrate.js
asset_engine_validation.js
        │
        ▼
plattforminterner Unix-Socket
/.sfs-bd/api
/.sfs-be/api
```

Diese Skripte sind nicht plattformunabhängig.

---

## 9. Repository- und Verzeichnisstruktur

```text
app/
├── .gitignore
├── .platform-deps
├── .platform_deps
├── AGENTS.md
├── NEUROWAYS_WORLD.md
├── NW-*.md
├── index.html
├── nw_migrate.js
├── package.json
├── package-lock.json
├── tailwind.config.cjs
├── tailwind.config.js
├── vite.config.js
├── public/
│   ├── favicon*
│   ├── apple-touch-icon.png
│   ├── manifest.webmanifest
│   ├── neuroflow-icon.svg
│   └── icons/
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── index.css
    ├── components/
    ├── data/                  # leer
    ├── lib/
    └── pages/
```

### Auffälligkeiten

- `.platform-deps` und `.platform_deps` existieren parallel.
- `tailwind.config.cjs` und `tailwind.config.js` existieren parallel.
- `index.css` referenziert `tailwind.config.cjs`.
- `package.json` enthält keine Dependencies.
- `vite.config.js` ist plattformspezifisch.
- `src/data/` ist bewusst leer.
- mehrere ältere Seiten/Komponenten liegen parallel zum aktuellen Routing vor.

---

## 10. Datenbank

### Technologie

PocketBase.

### Im Anwendungscode direkt nachweisbare Collections

| Collection | Zweck | Nachweis |
|---|---|---|
| `users` | Authentifizierung/Identity | `identity.js` |
| `identity_audit_log` | Identity-Audit | `identity.js` |
| `identity_test_values` | POC persönlicher Testwert | `identity.js` |
| `methods` | Methoden | `engine.js` |
| `questions` | Fragen | `engine.js` |
| `answer_options` | Antwortoptionen | `engine.js` |
| `result_rules` | Ergebnisregeln/Zonen | `engine.js` |
| `checkins` | Check-in-Session | `engine.js` |
| `checkin_answers` | Antworten | `engine.js` |
| `dev_prompts` | Prompt Library | `PromptLibraryPage.jsx` |
| `pkg_modules` | Modulregistry | `moduleRegistry.js` |
| `nwp_drafts` | Module-Builder-Entwürfe | `builderEngine.js` |
| `nwp_packages` | generierte NWP-Pakete | `builderEngine.js` |

### Zusätzlich aus Migrations-/Assetcode nachweisbar

- `world_versions`
- `world_regions`
- `design_tokens`
- `design_rules`
- `animation_rules`
- `accessibility_rules`
- `asset_versions`
- `asset_files`
- `asset_assignments`
- `asset_metadata`
- `asset_prompts`
- `pkg_bases`
- `pkg_base_versions`
- `pkg_module_versions`

`NW-DEPLOY-001_DEPLOYMENT_STANDARD.md` nennt außerdem betriebsbezogene Package-Collections, die nicht migriert werden sollen.

### Beziehungen, die aus Code ableitbar sind

```text
methods
  └── questions.method_id

questions
  └── answer_options.question_id

methods
  └── result_rules.method_id

checkins
  ├── method_id
  └── user_id

checkin_answers
  ├── checkin_id
  ├── question_id
  ├── answer_option_id
  └── user_id

asset_versions
  ├── world_version_id
  └── superseded_by_id

asset_files / asset_assignments / asset_metadata / asset_prompts
  └── asset_version_id
```

### Nicht rekonstruierbar aus der ZIP

- vollständige Collection-Schemata,
- Collection-IDs,
- exakte Feldtypen,
- alle Indizes,
- alle PocketBase-Regeln,
- produktive Datensätze,
- Benutzerkonten/Hashes,
- Datenbankdatei,
- vollständige Seeds.

**Status: UNGEKLÄRT / OFFEN.**

---

## 11. APIs und Schnittstellen

Es gibt im Frontend keine eigene REST-API-Schicht. Die Anwendung verwendet direkt das PocketBase SDK.

| Methode | Endpoint/Collection | Zweck | Status | Auth |
|---|---|---|---|---|
| SDK `getList/getOne` | PocketBase Collections | Daten laden | IMPLEMENTIERT | je Collection-Regel |
| SDK `create/update/delete` | PocketBase Collections | Daten verändern | IMPLEMENTIERT | je Collection-Regel |
| `authWithPassword` | `users` | Login | IMPLEMENTIERT | öffentliches Auth-Verfahren |
| `authRefresh` | `users` | Session erneuern | IMPLEMENTIERT | bestehender Token |
| HTTP via Unix-Socket | `/.sfs-bd/api` | Assetvalidierung | TEILWEISE / plattformspezifisch | `PB_TOKEN` |
| HTTP via Unix-Socket | `/.sfs-bd/api`, `/.sfs-be/api` | DEV→LIVE Migration | TEILWEISE / plattformspezifisch | `DEV_TOKEN`, `LIVE_TOKEN` |

---

## 12. Geschäftslogik

### Method Engine

`src/lib/engine.js` enthält:

- Auswahl aktiver Methode,
- Laden der Fragen,
- Laden der Antwortoptionen,
- Laden der Ergebnisregeln,
- Score-Regelauflösung,
- Diagnose der Scoreabdeckung,
- Pre-flight-Validierung,
- Partitionierung beantwortbarer/optionaler/blockierender Fragen,
- Check-in-Persistenz,
- Historie,
- Löschen,
- Datenexport.

### Identity

`src/lib/identity.js` enthält:

- Validierung der Registrierung,
- Login und Kontostatusprüfung,
- Logout,
- Passwortänderung,
- Reset-Anforderung,
- Audit Logging,
- Testwert-Isolation,
- Session-Refresh.

### Module Builder

`src/lib/builderEngine.js` enthält:

- NWP-Manifestformat,
- Draft-Validierung,
- Abhängigkeitsprüfung,
- Draft-Persistenz,
- Package-Erzeugung,
- Checksum,
- `.nwp`-Download.

---

## 13. Authentifizierung, Rollen und Berechtigungen

### Authentifizierung

PocketBase Auth Collection `users`.

### Frontend-Schutz

`ProtectedRoute` blockiert nicht angemeldete Benutzer und berücksichtigt:

- `LOCKED`
- `DEACTIVATED`

### Benutzerstatus

Im Code nachweisbar:

- ACTIVE
- LOCKED
- DEACTIVATED

### Modulstatus

In `moduleRegistry.js`:

- ENTWICKLUNG
- TEST
- FREIGEGEBEN
- INSTALLIERT
- AKTIV
- DEAKTIVIERT
- VERALTET
- ARCHIVIERT

### Wichtige Einschränkung

Die tatsächlichen PocketBase Collection Rules sind in der ZIP nicht enthalten. Serverseitige Autorisierung kann deshalb nicht vollständig auditiert werden.

---

## 14. Konfiguration und Umgebungen

### package.json

Skripte:

```text
npm run dev        → vite
npm run build      → vite build --mode preview
npm run build:prod → vite build
npm run preview    → vite preview
```

Dependencies und devDependencies sind leer.

### Vite

`vite.config.js`:

```js
import { defineConfig } from "/usr/lib/sfs-assistant-dev/platform-config.js";
```

Damit ist der aktuelle Build an eine plattforminterne Datei gekoppelt.

### Tailwind

`src/index.css`:

- Google Fonts DM Sans
- `@import "tailwindcss"`
- `@config "../tailwind.config.cjs"`

### PocketBase

`src/lib/pb.js`:

```js
export const pb = new PocketBase();
```

Keine explizite URL oder `.env`-Konfiguration.

### Environment Variablen

Im Server-/Migrationscode nachweisbar:

| Variable | Zweck | Secret |
|---|---|---|
| `PB_TOKEN` | Asset-Engine Admin/API-Zugriff | Ja |
| `DEV_TOKEN` | DEV-Migrationszugriff | Ja |
| `LIVE_TOKEN` | LIVE-Migrationszugriff | Ja |

Keine Werte sind in der ZIP dokumentiert.

---

## 15. Externe Abhängigkeiten

| Abhängigkeit | Funktion | Status |
|---|---|---|
| PocketBase | DB + Auth | erforderlich |
| React | UI | erforderlich |
| React DOM | Rendering | erforderlich |
| React Router | Routing | erforderlich |
| Vite | Build/Dev | erforderlich |
| Tailwind CSS | Styling | erforderlich |
| Icon-Imports (`icon:*`) | UI-Icons | plattform-/buildabhängig, muss für externen Build geklärt werden |
| Google Fonts / DM Sans | Schrift | externe HTTP-Ressource |
| Entwicklungsplattform | Vite-Config, globale Packages, Unix-Socket, PB-Routing | aktuell relevant |
| GitHub | nicht für Laufzeit erforderlich | optional für Versionsverwaltung |

---

## 16. Erledigte Entwicklungsaufgaben

Nachweisbar abgeschlossen:

1. Energy-Navigator Method Engine.
2. Check-in UI.
3. Ergebnisdarstellung.
4. Verlauf/Journey.
5. persönliche Pattern-Ansicht.
6. Identity POC.
7. produktive Login-/Registrierungsseiten.
8. Auth Context und Protected Routes.
9. persönlicher Workspace.
10. Datenschutzseite mit Export/Löschen.
11. Prompt Library.
12. Module Registry.
13. Module Manager.
14. Module Builder.
15. NWP-Package-Erzeugung.
16. Asset-Validierungslogik.
17. DEV→LIVE-Migrationsskript.
18. Design- und Governance-Dokumentation.
19. PWA-Manifest und Icon-Set.

---

## 17. Teilweise erledigte Arbeiten

### Passwort-Reset / E-Mail

UI und fachlicher Flow vorhanden, aber kein produktiver Mailversand.

### Self-Hosting

Quellcode vorhanden, aber Dependency-/Build-/PocketBase-Konfiguration nicht unabhängig.

### Asset Engine

Validierungslogik vorhanden; Script hängt an plattformspezifischen Endpunkten und Unix-Socket.

### Deployment

Standard und Migration existieren; CI/CD-Automatisierung fehlt laut `NW-DEPLOY-001`.

### Module Packages

Package-Erzeugung vorhanden; eine vollständige plattformunabhängige Installationsruntime ist in dieser ZIP nicht nachweisbar.

---

## 18. Offene Anforderungen und Backlog

| Priorität | ID | Aufgabe | Grund | Abhängigkeit | Akzeptanzkriterium |
|---|---|---|---|---|---|
| P0 | DB-EXPORT | PocketBase-Schema und Daten sichern | Ohne DB ist Projekt nicht vollständig rekonstruierbar | Zugriff auf aktuelle PB-Instanz | Schema, Regeln, Stammdaten und sichere Nutzerdatensicherung vorhanden |
| P0 | BUILD-INDEPENDENT | Dependencies und Standard-Vite-Konfiguration herstellen | Build aktuell plattformgebunden | Versionsprüfung | `npm install` und Produktions-Build außerhalb Plattform möglich |
| P0 | PB-CONFIG | PocketBase-URL konfigurierbar machen | `new PocketBase()` nutzt implizite Origin | Build-Unabhängigkeit | URL per sicherer Konfiguration steuerbar |
| P1 | ICON-RESOLUTION | `icon:*`-Imports für unabhängigen Build klären | proprietäre/Plattform-Auflösung möglich | Build-Inventur | Alle Icons mit Standard-Toolchain auflösbar |
| P1 | SMTP | E-Mail-Versand produktiv konfigurieren | Reset/Verifizierung unvollständig | Maildienst | Reset-/Verifizierungsflow funktioniert |
| P1 | DB-RULE-AUDIT | Collection Rules exportieren/prüfen | Sicherheitsmodell nicht in ZIP | DB-Export | alle Rules versioniert und geprüft |
| P1 | README-SETUP | unabhängige Setup-Anleitung | Übergabe aktuell nicht reproduzierbar | Build/DB-Konfiguration | frische Umgebung startbar |
| P2 | CLEANUP | alte Seiten und Doppelkonfigurationen bewerten | Parallelbestand erzeugt Unsicherheit | Tests | eindeutig aktueller Stand ohne unnötige Duplikate |
| P2 | MIGRATION-PORTABILITY | `nw_migrate.js` entkoppeln | Unix-Socket + `/.sfs-*` | Self-Hosting-Ziel | Migration gegen konfigurierbare PB-URLs möglich |
| P3 | CI/CD | Deployment automatisieren | im Deployment-Standard offen | Self-Hosting | reproduzierbare Pipeline |

---

## 19. Bekannte Fehler

Aus der ZIP sind keine aktuellen Laufzeitfehlerprotokolle enthalten.

Nachweisbare technische Blocker:

1. Standard-Build außerhalb der Plattform ist mit dem aktuellen `vite.config.js` nicht reproduzierbar.
2. `package.json` definiert keine Pakete.
3. Die Datenbank fehlt.
4. `asset_engine_validation.js` ist Node-/Plattformcode innerhalb von `src/lib`.
5. Potenzielle Route-/Datei-Divergenz durch parallel vorhandene ältere Seiten.

---

## 20. Technische Schulden

1. Plattforminterne Vite-Konfiguration.
2. Implizite globale npm-Abhängigkeiten.
3. Zwei Tailwind-Konfigurationsdateien.
4. Zwei Platform-Deps-Dateien mit unterschiedlicher Schreibweise.
5. Alte und neue Dashboard-/History-Komponenten parallel.
6. Direkter PocketBase-Zugriff aus vielen Frontend-Modulen statt einer vollständig gekapselten Backend-Abstraktion.
7. Node-Skript im Frontend-Source-Verzeichnis.
8. Keine reproduzierbaren PocketBase-Migrationen/Schemadateien in dieser ZIP.
9. NWP-Manifest wird in `manifest` und `manifest_b` aufgeteilt und damit faktisch auf ca. 9000 Zeichen begrenzt.
10. Keine automatisierten Tests im Quellbaum nachweisbar.

---

## 21. Getroffene Entscheidungen

Aus Quellcode und enthaltenen Standards nachweisbar:

- Generic Method Engine statt hart codiertem Fragebogen.
- PocketBase als Auth-/Datenbackend.
- Historische Check-ins speichern Methodenversion.
- React Context für globalen Auth-State.
- Protected Routes für geschützte Seiten.
- Mobile Bottom Navigation / Desktop Top Navigation.
- DM Sans als App-Schrift.
- NeuroWays Deep Navy/Teal/Violet/Warm Gold als Markenwelt.
- Module Registry als datengetriebener Modulzugang.
- NWP als plattformorientiertes Module-Package-Manifest.
- Stammdaten und Benutzerdaten werden beim Deployment getrennt behandelt.
- Benutzerbezogene Betriebsdaten sollen nicht DEV→LIVE migriert werden.

---

## 22. Offene Entscheidungen

1. Welche PocketBase-Version ist der verbindliche Zielstand?
2. Wie soll PocketBase im unabhängigen Betrieb adressiert werden?
3. Wie werden `icon:*`-Imports außerhalb der bisherigen Plattform umgesetzt?
4. Welche der Doppeldateien ist final:
   - `.platform-deps` vs `.platform_deps`
   - `tailwind.config.js` vs `tailwind.config.cjs`
5. Sollen `Home.jsx`, `DashboardPage.jsx`, `History.jsx`, `Nav.jsx` entfernt oder als Legacy erhalten bleiben?
6. Welche Collection Rules gelten aktuell produktiv?
7. Welche Collections existieren tatsächlich aktuell über die im Code sichtbaren hinaus?
8. Welche Daten aus der Entwicklungsdatenbank müssen in ein zukünftiges System übernommen werden?

---

## 23. Tests und Qualitätssicherung

### Im Code vorhanden

- `validateMethodReadiness()`
- `warnIfScaleOutOfSync()`
- `partitionQuestions()`
- Module-Builder-Draft-Validierung
- Asset-Engine-Validierungen
- Identity-POC-Dokument mit beschriebenen Testfällen
- Deployment-Dokument mit Smoke-Test-Konzept

### Nicht in der ZIP nachweisbar

- automatisiertes Testframework,
- Testdateien,
- CI-Testpipeline,
- aktuelle Testausgaben,
- aktuelle Build-Verifikation außerhalb der Plattform.

---

## 24. Deployment und Betrieb

`NW-DEPLOY-001_DEPLOYMENT_STANDARD.md` definiert eine Trennung zwischen:

- fachlichen Stammdaten,
- Benutzer-/Betriebsdaten.

Das enthaltene `nw_migrate.js` migriert folgende Stammdaten-Collections in definierter Reihenfolge:

```text
methods
questions
answer_options
result_rules
world_versions
world_regions
design_tokens
design_rules
animation_rules
accessibility_rules
asset_versions
asset_files
asset_assignments
asset_metadata
asset_prompts
pkg_bases
pkg_base_versions
pkg_modules
pkg_module_versions
```

Das Script arbeitet idempotent per Record-ID, ist aber an:

- `/run/cm4all/http/tie.socket`
- `/.sfs-bd/api`
- `/.sfs-be/api`

gebunden.

Für einen unabhängigen Betrieb muss dieser Transport entkoppelt werden.

---

## 25. Risiken

| Risiko | Schwere | Beschreibung |
|---|---|---|
| Fehlender DB-Export | Kritisch | Datenmodell und Datenbestand nicht vollständig rekonstruierbar |
| Build-Plattformbindung | Kritisch | Quellcode kann ohne Anpassung nicht sicher neu gebaut werden |
| Leere Dependency-Liste | Kritisch | `npm install` stellt Projektabhängigkeiten nicht her |
| Unbekannte PocketBase Rules | Hoch | Serverseitige Zugriffssicherheit nicht vollständig auditierbar |
| Implizite Icon-Auflösung | Hoch | `icon:*` könnte plattformspezifisch sein |
| Legacy-Duplikate | Mittel | Risiko, falsche Seite/Config weiterzuentwickeln |
| Fehlende Tests | Mittel | Regressionen schwer nachweisbar |
| SMTP fehlt | Mittel | Account-Recovery unvollständig |
| Asset-/Migrationstools plattformgebunden | Mittel | Self-Hosting-Aufwand |

---

## 26. Empfohlene nächste Entwicklungsschritte

### Schritt 1 – Datenbank sichern

**Ziel:** vollständige Wiederherstellbarkeit.

Betroffen:

- PocketBase Schema,
- Rules,
- Stammdaten,
- Benutzer-/Check-in-Daten,
- File-Uploads falls vorhanden.

**Akzeptanzkriterium:** Eine leere PocketBase-Instanz kann aus dokumentierten Exporten oder einem nativen Backup reproduziert werden.

### Schritt 2 – Build unabhängig machen

**Ziel:** Standard-Vite-Projekt ohne Plattformimporte.

Betroffen:

- `package.json`
- `package-lock.json`
- `vite.config.js`
- `src/lib/pb.js`
- Icon-Auflösung.

**Akzeptanzkriterium:** `npm install && npm run build:prod` funktioniert auf einer normalen Node.js-Umgebung.

### Schritt 3 – Security-/Rule-Audit

**Ziel:** tatsächliche serverseitige Regeln sichern und verifizieren.

**Akzeptanzkriterium:** Für jede Collection sind List/View/Create/Update/Delete-Regeln versioniert dokumentiert.

### Schritt 4 – Legacy-Bestand konsolidieren

**Ziel:** klare Source of Truth im Frontend.

Zu prüfen:

- `Home.jsx`
- `DashboardPage.jsx`
- `History.jsx`
- `Nav.jsx`
- doppelte Konfigurationsdateien.

### Schritt 5 – E-Mail-Flows produktivieren

**Ziel:** Reset und Verifizierung produktionsfähig.

---

## 27. Einstiegspunkt für die nächste KI

### Zuerst lesen

1. `PROJECT_HANDOVER.md`
2. `src/App.jsx`
3. `src/lib/engine.js`
4. `src/lib/identity.js`
5. `src/lib/authContext.jsx`
6. `src/pages/WorkspacePage.jsx`
7. `src/pages/CheckIn.jsx`
8. `src/pages/Journey.jsx`
9. `src/lib/moduleRegistry.js`
10. `src/lib/builderEngine.js`
11. `NW-DEPLOY-001_DEPLOYMENT_STANDARD.md`
12. `RECONSTRUCTION_STATUS.json`

### Zentrale Dateien

```text
src/App.jsx
src/lib/pb.js
src/lib/engine.js
src/lib/identity.js
src/lib/authContext.jsx
src/lib/moduleRegistry.js
src/lib/builderEngine.js
src/pages/WorkspacePage.jsx
src/pages/CheckIn.jsx
src/pages/Result.jsx
src/pages/Journey.jsx
vite.config.js
package.json
nw_migrate.js
```

### Nicht ungeprüft verändern

- Methodenscoring und historische Versionierung.
- Identity-/Auth-Flows.
- Collection-Namen und Relation-IDs.
- Deployment-Migrationsreihenfolge.
- Designfarben und Markenlinie.
- vorhandene Datenbankfelder, solange kein Schemaexport vorliegt.

### Nächster Entwicklungsschritt

**Nicht neue Features entwickeln.** Zuerst vollständigen PocketBase-Export sichern und den Build unabhängig reproduzierbar machen.

### Aktuellen Stand testen

In der ursprünglichen Plattform:

1. Registrierung/Login.
2. `/dashboard`.
3. Energy Check-in vollständig durchführen.
4. Ergebnis öffnen.
5. `/history` / Journey öffnen.
6. Privacy-Export.
7. `/admin/modules`.
8. `/admin/builder`.
9. `/admin/prompts`.

Außerhalb der Plattform ist ein belastbarer Test erst nach Build-/Dependency-Entkopplung möglich.

---

## 28. Unsicherheiten

Folgende Informationen sind aus der ZIP nicht zuverlässig bestimmbar:

1. Aktuelles GitHub-Repository und Branch.
2. Letzter produktiver Commit.
3. Exakte PocketBase-Version.
4. Vollständige Collection-Liste.
5. Vollständiges Schema jeder Collection.
6. Collection IDs.
7. Collection Rules.
8. Aktuelle Datenmengen.
9. Produktive Benutzeranzahl.
10. Passwort-Hashes und Auth-Migrationsfähigkeit.
11. Dateiuploads in PocketBase.
12. Exakte Versionen der global bereitgestellten npm-Pakete.
13. Implementierungsmechanismus hinter `icon:*`.
14. Ob alle in den Markdown-Standards beschriebenen Datenbankstrukturen aktuell noch bestehen.
15. Ob der aktuell rekonstruierte Source-Stand exakt dem letzten Stand der ursprünglichen Entwicklungsplattform entspricht.
16. Ob ältere, nicht geroutete Seiten bewusst als Fallback erhalten werden oder nur technischer Altbestand sind.
17. Ob `DashboardPage.jsx` noch anderweitig verwendet wird.
18. Ob `History.jsx` noch anderweitig verwendet wird.
19. Ob `tailwind.config.js` noch benötigt wird.
20. Ob `.platform-deps` oder `.platform_deps` die aktuell wirksame Plattformdatei ist.

---

# Übergabestatus

**Handover-Qualität:** belastbare Quellcodeübergabe auf Basis der bereitgestellten ZIP.

**Vollständige Systemwiederherstellung:** derzeit **nicht möglich**, da PocketBase-Schema und Datenbankinhalt nicht Bestandteil der Quelle sind.

**Empfehlung:** Diese Datei als zentrale Übergabe verwenden und erst nach Vorliegen eines echten PocketBase-Exports um den vollständigen Datenbankteil ergänzen.
