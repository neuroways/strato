# NW-CORE-OBJECT-001 – Universal Object & Relationship Model

**Dokumentcode:** NW-CORE-OBJECT-001  
**Titel:** Universal Object & Relationship Model  
**Version:** 1.0.0  
**Status:** draft  
**Erstellt:** 2026-07-24  
**Bereich:** NeuroWays Core / Plattformarchitektur  
**Referenzen:** NW-CORE-BUILDER-001, NW-STD-001, NW-STD-003, NW-PKG-001, NW-KAS-001

---

## Änderungsverlauf

| Version | Datum | Änderung | Grund |
|---------|-------|----------|-------|
| 1.0.0 | 2026-07-24 | Erstfassung | Objektfundament für alle Builder und Module |

---

## Kapitel 1 — Architekturprinzip

### 1.1 Grundidee

**NeuroWays besteht aus Objekten.**

Alles, was innerhalb der Plattform existiert — Module, Methoden, Fragen, Designfarben, Benutzer, Navigationseinträge, Prompts — ist ein Objekt. Jedes Objekt besitzt dieselbe unveränderliche Kernstruktur, das **NWObject**. Fachliche Unterschiede entstehen ausschließlich durch Spezialisierung, niemals durch Abweichung vom Kern.

```
                    NWObject (Kern)
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
  Spezialisierung A  Spezialisierung B  Spezialisierung C
  (Module)          (Methoden)         (Design)
```

### 1.2 Kritische Designentscheidung: Zusammenführen statt Proliferation

Bei der Entwicklung dieses Objektmodells wurden Typen bewusst zusammengeführt oder aufgeteilt, wenn es die Konsistenz verbessert. Das Ergebnis:

| Entscheidung | Begründung |
|-------------|-----------|
| `Inhalt` statt `Text + Audio + Bild + Video` | Inhalte sind multimodale Container — der Medientyp ist eine Eigenschaft, nicht der Typ selbst |
| `Entität` statt `Benutzer + Team + Unternehmen + Organisation` | Alle besitzen dieselbe Grundstruktur, unterscheiden sich durch `entity_type` |
| `Prompt` ist ein Objekt, kein Metadatum | KI-Prompts werden versioniert, gepflegt und referenziert wie alle anderen Objekte |
| `Aktion` gehört zu `Navigation`, nicht zur Oberfläche | Aktionen definieren Verhalten — Seiten und Widgets definieren Struktur |
| `Modulspezifikation` ist die Brücke zwischen Methode und Modul | Kein Modul enthält Fachlogik — es referenziert eine Methodenspezifikation |

### 1.3 Invariante Regel

> Jedes Objekt existiert genau einmal. Es wird referenziert, niemals kopiert. Jede Änderung erzeugt eine neue Version. Veröffentlichte Versionen sind unveränderlich.

---

## Kapitel 2 — Objektkatalog

### Übersicht nach Domänen

| Domäne | Objekttypen |
|--------|-------------|
| **Plattform** | `MODULE`, `BUILDER`, `RELEASE`, `PACKAGE`, `INSTALLATION` |
| **Methoden** | `METHOD_TYPE`, `METHOD`, `MODULE_SPEC`, `EXECUTION_MODE`, `QUESTION`, `ANSWER_OPTION`, `SCORING_RULE`, `RESULT` |
| **Inhalte** | `CONTENT`, `TRANSLATION` |
| **Design** | `THEME`, `DESIGN_TOKEN`, `COMPONENT`, `ANIMATION` |
| **Entitäten** | `ENTITY` (mit entity_type: USER / TEAM / ENTERPRISE / ORGANIZATION) |
| **Oberfläche** | `PAGE`, `DASHBOARD`, `WIDGET`, `NAVIGATION`, `ACTION` |
| **KI** | `PROMPT`, `AGENT`, `WORKFLOW` |
| **Assets** | `ASSET` (mit asset_type: IMAGE / AUDIO / VIDEO / DOCUMENT / ICON / FONT) |

---

### 2.1 Domäne: Plattform

#### `MODULE`
Das installierbare Erweiterungs-Paket der Plattform. Enthält keine Fachlogik — es referenziert `METHOD_SPEC`, `PAGE`, `NAVIGATION` und `DASHBOARD`-Objekte.

**Kerneigenschaften:**
```
module_code        — stabiler technischer Bezeichner (ENERGY_NAVIGATOR)
category           — fachliche Einordnung
lifecycle_status   — Entwicklung → Installiert → Aktiv → Archiviert
compatible_core_version
nav_refs           → [NAVIGATION]       (referenziert)
dashboard_refs     → [DASHBOARD]        (referenziert)
method_spec_refs   → [MODULE_SPEC]      (referenziert)
page_refs          → [PAGE]             (referenziert)
asset_refs         → [ASSET]            (referenziert)
dependencies       → [MODULE]           (referenziert)
```

#### `BUILDER`
Ein spezialisierter Erstellungsdienst der Plattform. Builder erzeugen NWObjects und NWP-Packages.

**Kerneigenschaften:**
```
builder_type       — MODULE | METHOD | CONTENT | DESIGN | MEDIA | ROLE | RELEASE
extension_schema   — JSON-Schema der eigenen Erweiterungsfelder
supported_actions  — install | activate | generate | export
target_object_types → [object_type strings]
```

#### `RELEASE`
Eine versionierte Sammlung von Änderungen und Packages. Jedes Release ist unveränderlich.

**Kerneigenschaften:**
```
release_version    — semantisch (0.7.0)
release_notes      → [CONTENT]          (referenziert)
packages           → [PACKAGE]          (enthält)
deployed_at
deployment_log
```

#### `PACKAGE` (NWP)
Das transportierbare Installationsformat. Enthält eine Sammlung von NWObjects als JSON-Manifest.

**Kerneigenschaften:**
```
nwp_version        — Format-Version
module_ref         → [MODULE]           (referenziert)
objects            → [NWObject]         (enthält — Snapshot)
checksum
file_size
```

> **Wichtige Unterscheidung:** Das `PACKAGE` enthält einen **Snapshot** der Objekte zum Zeitpunkt der Erstellung. Die Originalobjekte existieren weiterhin in der Plattform als eigenständige versionierte Objekte.

#### `INSTALLATION`
Der Protokolleintrag einer Package-Installation auf einem Zielsystem.

**Kerneigenschaften:**
```
package_ref        → [PACKAGE]          (referenziert)
target_system
installed_by       → [ENTITY]           (referenziert)
installed_at
result_status      — SUCCESS | FAILED | PARTIAL
migration_log
```

---

### 2.2 Domäne: Methoden

Die Methodenarchitektur folgt einem Schichtmodell. Die fachliche Logik ist zentral. Module spezifizieren ausschließlich Kontext, Darstellung und Inhalte.

```
METHOD_TYPE            — Was ist die Kategorie der Methode?
      │
      ▼
METHOD                 — Was ist die konkrete Fachmethode?
      │
      ▼
MODULE_SPEC            — Wie wird sie in einem Modul eingesetzt?
      │
      ▼
EXECUTION_MODE         — In welcher Ausführungsform?
      │
      ▼
CONTENT (Variante)     — Mit welchen konkreten Inhalten?
```

#### `METHOD_TYPE`
Die Kategorie einer Methode. Plattformübergreifend stabil.

```
Beispiele: Selbstbeobachtung, Assessment, Lerneinheit, Spiel, Coaching
```

#### `METHOD`
Die konkrete, plattformunabhängige Fachmethode. Enthält die vollständige Logik.

**Kerneigenschaften:**
```
method_type_ref    → [METHOD_TYPE]      (referenziert)
questions          → [QUESTION]         (enthält)
scoring_rules      → [SCORING_RULE]     (enthält)
result_rules       → [SCORING_RULE]     (enthält)
estimated_duration_minutes
```

#### `MODULE_SPEC`
Die Brücke zwischen Methode und Modul. Kein Modul enthält Fachlogik — es referenziert eine `MODULE_SPEC`, die wiederum auf eine `METHOD` zeigt.

**Kerneigenschaften:**
```
method_ref         → [METHOD]           (referenziert)
module_ref         → [MODULE]           (referenziert)
execution_modes    → [EXECUTION_MODE]   (referenziert)
content_variant_ref → [CONTENT]         (referenziert)
display_config
```

#### `EXECUTION_MODE`
Die Ausführungsform einer Methode. Eine Methode kann in mehreren Modi ausgeführt werden.

```
Beispiele: App, Seminar, Workshop, Coaching, Selbststudium, Gruppe
```

**Kerneigenschaften:**
```
method_ref         → [METHOD]           (referenziert)
mode_type
participant_count  — Einzeln | Gruppe | Unbegrenzt
facilitator_required
duration_variant
content_refs       → [CONTENT]          (referenziert, modusabhängig)
```

#### `QUESTION`
Eine einzelne Frage innerhalb einer Methode.

**Kerneigenschaften:**
```
method_ref         → [METHOD]           (referenziert)
question_text_ref  → [CONTENT]          (referenziert — niemals direkter Text)
help_text_ref      → [CONTENT]          (referenziert)
answer_options     → [ANSWER_OPTION]    (enthält)
dimension_code
sort_order
is_required
```

#### `ANSWER_OPTION`
Eine auswählbare Antwort auf eine Frage.

**Kerneigenschaften:**
```
question_ref       → [QUESTION]         (referenziert)
label_ref          → [CONTENT]          (referenziert)
numeric_value
sort_order
icon_ref           → [ASSET]            (referenziert)
```

#### `SCORING_RULE`
Eine Auswertungsregel für eine Methode.

**Kerneigenschaften:**
```
method_ref         → [METHOD]           (referenziert)
rule_type          — SUM | AVERAGE | WEIGHTED | THRESHOLD | CUSTOM
min_score
max_score
result_code
result_label_ref   → [CONTENT]          (referenziert)
description_ref    → [CONTENT]          (referenziert)
observation_ref    → [CONTENT]          (referenziert)
color_token_ref    → [DESIGN_TOKEN]     (referenziert)
icon_ref           → [ASSET]            (referenziert)
```

#### `RESULT`
Ein konkretes Auswertungsergebnis eines Benutzers (Laufzeitdatum).

> **Wichtig:** `RESULT` ist ein Betriebsdatum, kein Stammdatum. Es wird niemals zwischen Umgebungen migriert.

**Kerneigenschaften:**
```
method_ref         → [METHOD]           (referenziert)
module_spec_ref    → [MODULE_SPEC]      (referenziert)
entity_ref         → [ENTITY]           (referenziert)
scoring_rule_ref   → [SCORING_RULE]     (referenziert)
total_score
answers            → [ANSWER_RECORD]    (enthält — Laufzeit)
created_at
```

---

### 2.3 Domäne: Inhalte

#### `CONTENT`
**Der wichtigste Designentscheid:** Inhalte sind multimodale Container. Es gibt keinen separaten `TEXT`, kein separates `AUDIO`, kein separates `IMAGE` als eigene Objekttypen. Stattdessen referenziert ein `CONTENT`-Objekt eine oder mehrere `ASSET`-Ressourcen und fügt semantische Bedeutung hinzu.

```
CONTENT
  ├── primary_asset_ref   → ASSET (IMAGE | AUDIO | VIDEO | DOCUMENT)
  ├── alt_asset_ref       → ASSET (Barrierefreiheit: Alternativmedium)
  ├── transcript_ref      → CONTENT (Text-Transkript für Audio/Video)
  └── locale_variants     → {locale: ASSET}
```

**Kerneigenschaften:**
```
content_type       — TEXT | RICH_TEXT | AUDIO | VIDEO | IMAGE | DOCUMENT | MIXED
locale             — Primärsprache
primary_text       — Nur für reine Text-Contents (UTF-8, kein HTML)
primary_asset_ref  → [ASSET]            (referenziert, für Medien-Contents)
alt_text_ref       → [CONTENT]          (Accessibility-Alternative)
caption_ref        → [CONTENT]          (Bildunterschrift, Untertitel)
```

#### `TRANSLATION`
Übersetzung eines `CONTENT`-Objekts in eine andere Sprache.

**Kerneigenschaften:**
```
source_content_ref → [CONTENT]          (referenziert)
target_locale
translated_text
translated_asset_ref → [ASSET]          (für lokalisierte Medien)
translation_status — MACHINE | HUMAN | REVIEWED
```

---

### 2.4 Domäne: Assets

#### `ASSET`
Eine physische Ressource. Assets sind die einzigen Objekte, die tatsächlich Binärdaten oder externe URLs referenzieren.

**Kerneigenschaften:**
```
asset_type         — IMAGE | AUDIO | VIDEO | DOCUMENT | ICON | FONT | ANIMATION | DATA
file_url           — Stabile URL oder /static/-Pfad
mime_type
file_size
checksum
width, height      — Für Bildmedien
duration_seconds   — Für Audio/Video
locale             — Sprachbindung (* = universell)
resolution_variant — STANDARD | RETINA | MOBILE | REDUCED_MOTION
license
```

---

### 2.5 Domäne: Design

#### `THEME`
Ein vollständiges Design-System für einen Kontext (App, Dark Mode, Druck).

**Kerneigenschaften:**
```
theme_type         — LIGHT | DARK | HIGH_CONTRAST | PRINT
token_refs         → [DESIGN_TOKEN]     (enthält)
component_refs     → [COMPONENT]        (enthält)
typography_refs    → [DESIGN_TOKEN]     (referenziert)
```

#### `DESIGN_TOKEN`
Ein einzelner, benannter Designwert. Die einzige Quelle der Wahrheit für Farben, Abstände, Schriftgrößen.

**Kerneigenschaften:**
```
token_name         — nw-festland, nw-spacing-md
token_type         — COLOR | SPACING | RADIUS | TYPOGRAPHY | SHADOW | DURATION
value              — #2a9d8f | 16px | 400ms
theme_ref          → [THEME]            (referenziert)
usage_description
```

> **Regel:** Kein anderes Objekt speichert direkte Farbwerte oder Pixelangaben. Alle verweisen auf `DESIGN_TOKEN`.

#### `COMPONENT`
Eine wiederverwendbare UI-Einheit.

**Kerneigenschaften:**
```
component_type     — BUTTON | CARD | FORM | BADGE | CHART | MODAL
token_refs         → [DESIGN_TOKEN]     (referenziert)
variant            — PRIMARY | SECONDARY | GHOST
state              — DEFAULT | HOVER | ACTIVE | DISABLED | ERROR
accessibility_notes
```

#### `ANIMATION`
Eine Bewegungsdefinition.

**Kerneigenschaften:**
```
animation_type     — TRANSITION | LOOP | ENTRANCE | EXIT
duration_ms
easing
element_target
respects_reduced_motion — immer true
asset_ref          → [ASSET]            (für Lottie/Video-Animationen)
```

---

### 2.6 Domäne: Entitäten

#### `ENTITY`
**Zusammengeführtes Modell** für Benutzer, Teams, Unternehmen und Organisationen. Alle teilen dieselbe Struktur — der Typ unterscheidet sie.

**Kerneigenschaften:**
```
entity_type        — USER | TEAM | ENTERPRISE | ORGANIZATION | COMMUNITY
display_name
email              — Nur für USER
parent_entity_ref  → [ENTITY]           (referenziert — Mitgliedschaft)
member_refs        → [ENTITY]           (referenziert — Mitglieder)
role_refs          → [ROLE]             (referenziert)
account_status     — ACTIVE | PENDING | LOCKED | DEACTIVATED | ARCHIVED
```

#### `ROLE`
Eine Berechtigungsrolle. Rollen gehören immer zu einer Mitgliedschaft, niemals direkt zu einer Entität.

**Kerneigenschaften:**
```
role_code          — USER | MANAGER | TEAM_LEAD | ENTERPRISE | ADMIN
permissions        — [permission_codes]
scope              — PLATFORM | MODULE | ORGANIZATION
module_ref         → [MODULE]           (referenziert — modulspezifische Rolle)
```

---

### 2.7 Domäne: Oberfläche

#### `PAGE`
Eine eigenständige Ansicht innerhalb eines Moduls.

**Kerneigenschaften:**
```
module_ref         → [MODULE]           (referenziert)
route_path         — /checkin
layout_type        — SINGLE | TWO_COLUMN | FULL_WIDTH | WIZARD
widget_refs        → [WIDGET]           (enthält)
required_roles     → [ROLE]             (referenziert)
```

#### `DASHBOARD`
Der Personal Workspace oder ein modulspezifisches Dashboard.

**Kerneigenschaften:**
```
dashboard_type     — WORKSPACE | MODULE | ADMIN
widget_slots       — [slot_config]
registered_modules → [MODULE]           (referenziert)
```

#### `WIDGET`
Eine registrierbare Karte oder Komponente für Dashboard oder Seiten.

**Kerneigenschaften:**
```
widget_type        — TODAY_CARD | QUICK_ACTION | STATUS | CHART | REMINDER | PROGRESS
module_ref         → [MODULE]           (referenziert)
component_ref      → [COMPONENT]        (referenziert)
data_source        — Woher kommen die Daten?
required_roles     → [ROLE]             (referenziert)
```

#### `NAVIGATION`
Ein Navigationseintrag, der von einem Modul registriert wird.

**Kerneigenschaften:**
```
module_ref         → [MODULE]           (referenziert)
label_ref          → [CONTENT]          (referenziert)
path               — /energy
icon_ref           → [ASSET]            (referenziert)
sort_order
visibility         — ALWAYS | AUTH_ONLY | ROLE_RESTRICTED
required_roles     → [ROLE]             (referenziert)
```

#### `ACTION`
Eine Benutzeraktion. Aktionen sind deklarativ — die Plattform entscheidet, wie sie ausgeführt werden.

**Kerneigenschaften:**
```
action_type        — NAVIGATE | OPEN_MODULE | TRIGGER_METHOD | EXPORT | SHARE
target_ref         — Zielobjekt je nach action_type
label_ref          → [CONTENT]          (referenziert)
icon_ref           → [ASSET]            (referenziert)
required_roles     → [ROLE]             (referenziert)
```

---

### 2.8 Domäne: KI

#### `PROMPT`
Ein versionierter, genehmigter Prompt für KI-Systeme. Kein Prompt existiert außerhalb der Plattform ohne Versionierung.

**Kerneigenschaften:**
```
prompt_type        — SYSTEM | USER | CHAIN | FEW_SHOT
prompt_text        — Vollständiger, freigegebener Text
target_model       — Welches Modell ist vorgesehen?
approved_at
source_object_ref  → [NWObject]         (referenziert — wofür?)
output_object_type — Welches Objekt erzeugt dieser Prompt?
```

#### `AGENT`
Ein konfigurierter KI-Akteur mit definiertem Scope.

**Kerneigenschaften:**
```
prompt_refs        → [PROMPT]           (enthält)
scope              — Welche Objekte darf der Agent lesen/schreiben?
workflow_ref       → [WORKFLOW]         (referenziert)
access_level       — READ | SUGGEST | WRITE | EXECUTE
```

#### `WORKFLOW`
Eine orchestrierte Abfolge von Aktionen oder KI-Aufrufen.

**Kerneigenschaften:**
```
steps              → [ACTION | PROMPT]  (geordnete Liste)
trigger            — MANUAL | SCHEDULED | EVENT
output_object_type
```

---

## Kapitel 3 — Beziehungstypen

### 3.1 Grundunterschied: Containment vs. Referenz

| Kriterium | Containment (enthält) | Referenz (referenziert) |
|-----------|----------------------|------------------------|
| **Lebenszyklus** | Kinderobjekt gehört zum Elternobjekt | Beide existieren unabhängig |
| **Löschverhalten** | Kinder werden mit dem Elternobjekt archiviert | Referenz wird gelöscht, Ziel bleibt |
| **Versioning** | Kinder versionieren gemeinsam mit dem Elternobjekt | Unabhängige Versionierung |
| **Wiederverwendung** | Kein anderes Objekt kann dasselbe Kind verwenden | Viele Objekte können dasselbe Ziel referenzieren |
| **Beispiel** | `METHOD` enthält `QUESTION` | `SCORING_RULE` referenziert `DESIGN_TOKEN` |

### 3.2 Beziehungskatalog

| Typ | Symbol | Beschreibung | Beispiel |
|-----|--------|-------------|---------|
| **enthält** | `→ [X]` | Kinderobjekt, exklusive Zugehörigkeit | `METHOD → [QUESTION]` |
| **referenziert** | `→ [X]` | Externe Abhängigkeit, nicht exklusiv | `SCORING_RULE → [DESIGN_TOKEN]` |
| **erweitert** | `⊃` | Spezialisierung des Basistyps | `MODULE_SPEC ⊃ NWObject` |
| **verwendet** | `⟶` | Laufzeitbeziehung, keine Ownership | `ENTITY ⟶ MODULE` |
| **erzeugt** | `⊕` | Builder erzeugt Objekte | `BUILDER ⊕ NWObject` |
| **versioniert** | `↗` | Nachfolgeversion | `v1.0.0 ↗ v1.1.0` |
| **übersetzt** | `≈` | TRANSLATION zu CONTENT | `TRANSLATION ≈ CONTENT` |
| **basiert auf** | `⊆` | Ableitung ohne Kopie | `MODULE_SPEC ⊆ METHOD` |

### 3.3 Verbotene Beziehungen

| Verboten | Stattdessen |
|---------|------------|
| `ENTITY` enthält `RESULT` (Ownership) | `RESULT` referenziert `ENTITY` (Datensouveränität) |
| `MODULE` enthält `METHOD` | `MODULE` referenziert `MODULE_SPEC`, die `METHOD` referenziert |
| Direkte Texte in `QUESTION` | `QUESTION` referenziert `CONTENT` |
| `PACKAGE` referenziert live `MODULE` | `PACKAGE` enthält Snapshot zum Zeitpunkt der Erstellung |

---

## Kapitel 4 — Vererbungsmodell

### 4.1 NWObject-Kern (unveränderlich)

Alle Objekte erben folgende Felder direkt vom NWObject-Kern. Diese Felder können nicht überschrieben oder ausgelassen werden:

```
id                 — UUID, plattformweit eindeutig
code               — Stabiler technischer Bezeichner
object_type        — Objekttyp-Konstante
version            — Semantische Versionsnummer
status             — Lifecycle-Status
locale             — Primärsprache
meta               — name, description, tags, category, icon, timestamps
versioning         — changelog, parent_version, superseded_by
lifecycle          — published_at, archived_at, valid_from, valid_until
permissions        — roles, visibility, license_type
relations          — parent_id, children, references, dependencies
i18n               — source_locale, translations
accessibility      — alt_text, aria_label, reduced_motion
media              — thumbnail, hero, assets (alle referenziert)
audit              — validation_result, history
extensions         — Erweiterungsfeld für Builder und Module
```

### 4.2 Builder-Erweiterungen

Builder fügen Felder im `extensions`-Feld hinzu. Niemals außerhalb:

```json
{
  "extensions": {
    "module_builder": {
      "features": [...],
      "nav_refs": [...],
      "dashboard_refs": [...]
    }
  }
}
```

**Regeln für Builder-Erweiterungen:**
- Dürfen keine Core-Felder duplizieren
- Müssen ein registriertes Extension-Schema besitzen
- Versionieren sich unabhängig vom NWObject-Kern
- Sind immer optional — das Objekt ist ohne sie gültig

### 4.3 Modul-Erweiterungen

Module dürfen über `MODULE_SPEC` fachliche Kontexte definieren:

```json
{
  "extensions": {
    "energy_navigator": {
      "zone": "festland",
      "score": 10,
      "method_version": "1.1.0"
    }
  }
}
```

**Regel:** Modul-Erweiterungen sind **Betriebsdaten**, keine Stammdaten. Sie werden nicht zwischen Umgebungen migriert.

---

## Kapitel 5 — Objektlebenszyklus

### 5.1 Universeller Lifecycle

Dieser Lifecycle gilt für **alle** Objekttypen. Ausnahmen sind explizit dokumentiert (siehe 5.3).

```
DRAFT ──────────────────────────────────────────────────────────────────► REJECTED
  │                                                                              │
  │                                                                              ▼
  ▼                                                                         ARCHIVED
IN_REVIEW ──► APPROVED ──► PUBLISHED ──► SUPERSEDED ──► DEPRECATED ──► ARCHIVED
  │                            │
  └──► DRAFT (Revision)       └──► DRAFT (neue Version)
```

### 5.2 Status-Definitionen

| Status | Bedeutung | Veränderbar? |
|--------|-----------|-------------|
| `DRAFT` | In Bearbeitung, nicht sichtbar | Ja, vollständig |
| `IN_REVIEW` | Zur Prüfung übergeben | Nur Metadaten |
| `APPROVED` | Freigegeben, noch nicht live | Nein |
| `PUBLISHED` | Aktiv, sichtbar, unveränderlich | Nur Verwaltungsfelder |
| `SUPERSEDED` | Durch neuere Version ersetzt | Nur `superseded_by` |
| `DEPRECATED` | Wird bald archiviert | Nur Deprecation-Datum |
| `ARCHIVED` | Dauerhaft abgeschlossen | Nein |
| `REJECTED` | Prüfung nicht bestanden | Zurück zu `DRAFT` möglich |

### 5.3 Ausnahmen

| Objekttyp | Abweichung | Begründung |
|-----------|-----------|-----------|
| `RESULT` | Kein Lifecycle — Betriebsdatum | Ergebnisse werden nicht veröffentlicht |
| `INSTALLATION` | Nur `SUCCESS | FAILED | PARTIAL` | Protokoll, kein Objekt |
| `TRANSLATION` | Zusätzlich `MACHINE | HUMAN | REVIEWED` | Qualitätsstufen |
| `ENTITY (USER)` | `ACTIVE | PENDING | LOCKED | DEACTIVATED` | Kontostatus, kein Lifecycle |

---

## Kapitel 6 — Erweiterbarkeit

### 6.1 Neue Objekttypen ohne Core-Anpassung

Neue Objekttypen entstehen durch:

1. **Registrierung** eines neuen `object_type`-Wertes in der Objekttyp-Registry
2. **Definition** eines Extension-Schemas für den neuen Typ
3. **Registrierung** eines (optionalen) Builders für den neuen Typ

Das NWObject-Schema wird **nicht** verändert.

```json
// Neuer Typ: MARKETPLACE_ITEM
{
  "object_type": "MARKETPLACE_ITEM",
  "extensions": {
    "marketplace": {
      "price": 0.00,
      "currency": "EUR",
      "publisher_ref": "<ENTITY_id>",
      "download_count": 0,
      "rating": null
    }
  }
}

// Neuer Typ: SEMINAR
{
  "object_type": "SEMINAR",
  "extensions": {
    "seminar_builder": {
      "method_spec_ref": "<MODULE_SPEC_id>",
      "execution_mode_ref": "<EXECUTION_MODE_id>",
      "max_participants": 20,
      "duration_days": 2,
      "facilitator_required": true
    }
  }
}

// Neuer Typ: QUEST (für NeuroPlay)
{
  "object_type": "QUEST",
  "extensions": {
    "neuroplay_builder": {
      "quest_type": "DAILY | WEEKLY | STORY | CHALLENGE",
      "difficulty": 1,
      "xp_reward": 100,
      "steps": ["<ACTION_id>", "<ACTION_id>"],
      "prerequisite_quest_ref": null
    }
  }
}
```

### 6.2 Erweiterbarkeits-Garantie

Neue Objekttypen dürfen keine bestehenden Typen imitieren oder überlappen. Vor der Registrierung ist zu prüfen:

- Könnte ein bestehender Typ mit einem Extension-Schema denselben Zweck erfüllen?
- Ist der neue Typ wirklich strukturell verschieden, oder nur inhaltlich?

---

## Kapitel 7 — Builder-Ableitung

### 7.1 Grundsatz

**Builder entstehen aus Objekttypen. Nicht umgekehrt.**

Wenn ein Objekttyp definiert ist, entscheidet die Plattform, ob ein spezialisierter Builder für diesen Typ sinnvoll ist. Ein Builder ohne definierten Objekttyp kann nicht existieren.

```
Objekttyp definiert
        │
        ▼
Builder-Bedarf geprüft
        │
        ├──► Einfacher Typ: Core Builder reicht
        │
        └──► Komplexer Typ: Spezialisierter Builder wird definiert
                    │
                    ▼
             Builder-Schema registrieren
                    │
                    ▼
             Builder implementieren
```

### 7.2 Builder-Ableitungsregeln

| Regel | Beschreibung |
|-------|-------------|
| Ein Builder kennt genau einen primären Objekttyp | `MODULE_BUILDER` → `MODULE` |
| Ein Builder darf Hilfsobjekte erzeugen | `MODULE_BUILDER` erzeugt auch `NAVIGATION`, `DASHBOARD` |
| Ein Builder darf andere Builder aufrufen | `MODULE_BUILDER` ruft `CONTENT_BUILDER` für Texte auf |
| Builder-Output ist immer NWObject-konform | Niemals eigene Datenformate |
| Builder sind zustandslos | Kein Builder speichert eigenen Zustand |

### 7.3 Aktuelle Builder-Ableitung

| Objekttyp | Builder | Status |
|-----------|---------|--------|
| `MODULE` | Module Builder (NW-CB-002) | ✅ Implementiert |
| `METHOD` | Method Builder (NW-CB-006) | Geplant |
| `CONTENT` | Content Builder (NW-CB-003) | Geplant |
| `ASSET` | Media Builder (NW-CB-004) | Geplant |
| `DESIGN_TOKEN`, `THEME` | Design Builder (NW-CB-005) | Geplant |
| `NAVIGATION`, `PAGE` | Navigation Builder (NW-CB-007) | Geplant |
| `DASHBOARD`, `WIDGET` | Dashboard Builder (NW-CB-008) | Geplant |
| `ROLE` | Role Builder (NW-CB-009) | Geplant |
| `RELEASE` | Release Builder (NW-CB-010) | Geplant |
| `PROMPT`, `AGENT` | (kein eigener Builder) | Core Builder |

---

## Kapitel 8 — Methodenarchitektur

### 8.1 Vollständiges Schichtmodell

```
┌──────────────────────────────────────────────────────────┐
│  METHOD_TYPE                                             │
│  "Selbstbeobachtung"                                     │
│  (plattformübergreifend stabil)                          │
└────────────────────────┬─────────────────────────────────┘
                         │ referenziert
┌────────────────────────▼─────────────────────────────────┐
│  METHOD                                                  │
│  "Energy Check-in v1.1.0"                                │
│  Fragen, Antworten, Scoring — plattformunabhängig        │
└────────────────────────┬─────────────────────────────────┘
                         │ basiert auf
┌────────────────────────▼─────────────────────────────────┐
│  MODULE_SPEC                                             │
│  "Energy Navigator Spec"                                 │
│  Kontext: App, Ausführungsform, Inhaltvariante           │
└────────────────────────┬─────────────────────────────────┘
                         │ referenziert
┌───────────────┬─────────▼──────────────────┬─────────────┐
│ EXECUTION_MODE│                            │             │
│  "App"        │  EXECUTION_MODE            │EXECUTION_MODE│
│               │  "Seminar"                 │"Coaching"   │
└───────────────┴────────────────────────────┴─────────────┘
                         │ referenziert
┌────────────────────────▼─────────────────────────────────┐
│  CONTENT (Variante)                                      │
│  Lokalisierte Texte, Audioguides, Arbeitsblätter         │
│  je nach Ausführungsform unterschiedlich                 │
└──────────────────────────────────────────────────────────┘
```

### 8.2 Prinzip der Methodenunabhängigkeit

Die `METHOD` ist vollständig unabhängig vom Modul, das sie verwendet. Dasselbe `Energy Check-in`-Verfahren kann genutzt werden:

- Als App-Check-in (Energy Navigator)
- Als Seminar-Einstieg (Workshop-Modul)
- Als Coaching-Instrument (Coaching-Modul)
- Als Forschungsinstrument (Research-Modul)

Die Fragen, Antworten und Scoring-Regeln sind jedes Mal identisch. Die `MODULE_SPEC` und `EXECUTION_MODE` definieren den Kontext.

---

## Kapitel 9 — Mehrsprachigkeit, Medien, Barrierefreiheit

### 9.1 Kein Text in Objekten

Sichtbare Texte werden **niemals direkt in einem Objekt gespeichert**. Ausnahme: `CONTENT`-Objekte, die explizit zur Textspeicherung dienen.

```
✗ question.question_text = "Wie viel Energie steht dir gerade zur Verfügung?"
✓ question.question_text_ref → CONTENT#ENERGY_Q1_TEXT_DE
```

### 9.2 Multimodale Inhalte

Ein `CONTENT`-Objekt kann mehrere Medien desselben semantischen Inhalts halten:

```
CONTENT "Begrüßung"
  ├── primary: ASSET (TEXT)         — Für Screen
  ├── audio:   ASSET (AUDIO)        — Für Screenreader / Audioguide
  ├── video:   ASSET (VIDEO)        — Für Videoplayer
  └── locale_variants:
        ├── "en": ASSET (TEXT)
        └── "fr": ASSET (TEXT)
```

### 9.3 Accessibility-Pflicht

Jedes Objekt trägt Accessibility-Felder. Ab NWObject v2.0 sind sie Pflicht (derzeit Warnung):

```json
{
  "accessibility": {
    "alt_text": "CONTENT#ALT_ENERGY_ICON",
    "aria_label": "CONTENT#ARIA_START_CHECKIN",
    "reduced_motion": false,
    "high_contrast_variant": "ASSET#ICON_WAVES_HC",
    "font_scale_supported": true
  }
}
```

---

## Kapitel 10 — Architekturprinzipien

| Prinzip | Anwendung im Objektmodell |
|---------|--------------------------|
| **Core vor Implementierung** | NWObject ist definiert bevor jede Plattform implementiert |
| **Eine Information existiert genau einmal** | `DESIGN_TOKEN` ist die einzige Farbquelle |
| **Referenzieren statt Kopieren** | Texte, Farben, Assets werden referenziert |
| **Builder erzeugen Daten** | Builder erzeugen NWObjects — niemals direkte DB-Einträge |
| **Anwendungen interpretieren Daten** | Die Rendering-Schicht liest NWObjects und entscheidet über Darstellung |
| **Plattformunabhängigkeit** | Kein Objektfeld enthält Plattformreferenz (kein `pocketbase_collection`) |
| **Erweiterbarkeit ohne Core-Anpassung** | Neue Typen durch `extensions`-Feld und Typ-Registrierung |
| **Vollständige Versionierung** | Jede Änderung → neue Version; veröffentlicht → unveränderlich |
| **Datenbank vor Hardcoding** | Alle Konfigurationen als Objekte — keine Konstanten im Code |

---

## Kapitel 11 — Vollständige Beispiele

### 11.1 Modul „Energy Navigator" — Objektgraph

```
MODULE "ENERGY_NAVIGATOR" v1.1.0
  │
  ├── referenziert → MODULE_SPEC "ENERGY_APP_SPEC"
  │                    │
  │                    ├── basiert auf → METHOD "ENERGY_CHECK_v1.1.0"
  │                    │                    │
  │                    │                    ├── enthält → QUESTION "ENERGY_Q1"
  │                    │                    │               └── referenziert → CONTENT "Q1_TEXT_DE"
  │                    │                    │               └── enthält → ANSWER_OPTION "AO_1_SEHR_VIEL"
  │                    │                    │                               └── referenziert → CONTENT "AO1_LABEL"
  │                    │                    ├── enthält → [... Q2-Q6 analog ...]
  │                    │                    └── enthält → SCORING_RULE "ENERGY_ZONE_FESTLAND"
  │                    │                                     └── referenziert → DESIGN_TOKEN "nw-festland"
  │                    │
  │                    └── referenziert → EXECUTION_MODE "APP"
  │
  ├── referenziert → NAVIGATION "ENERGY_NAV"
  │                    └── referenziert → CONTENT "NAV_LABEL_ENERGY"
  │                    └── referenziert → ASSET "ICON_WAVES"
  │
  ├── referenziert → DASHBOARD "ENERGY_DASHBOARD"
  │                    └── enthält → WIDGET "ENERGY_TODAY_CARD"
  │                    └── enthält → WIDGET "ENERGY_LAST_RESULT"
  │
  └── referenziert → PAGE "CHECKIN_PAGE"
                       └── referenziert → COMPONENT "ANSWER_CARD"
                                            └── referenziert → DESIGN_TOKEN "nw-spacing-md"
```

### 11.2 Modul „NeuroPlay" — Objektgraph

```
MODULE "NEUROPLAY" v0.1.0
  │
  ├── referenziert → MODULE_SPEC "NEUROPLAY_GAME_SPEC"
  │                    │
  │                    ├── basiert auf → METHOD_TYPE "Spiel"
  │                    │
  │                    └── referenziert → EXECUTION_MODE "APP_GAME"
  │
  ├── enthält → QUEST "DAILY_ENERGY_QUEST"
  │               ├── referenziert → METHOD "ENERGY_CHECK"      ← gleiche Methode!
  │               ├── referenziert → CONTENT "QUEST_STORY_TEXT"
  │               └── referenziert → ASSET "FLOWISAURUS_ICON"
  │
  ├── referenziert → NAVIGATION "NEUROPLAY_NAV"
  │                    └── referenziert → CONTENT "NAV_LABEL_NEUROPLAY"
  │                    └── referenziert → ASSET "ICON_GAMEPAD"
  │
  ├── referenziert → DASHBOARD "NEUROPLAY_DASHBOARD"
  │                    └── enthält → WIDGET "EGG_TODAY_CARD"
  │                    └── enthält → WIDGET "STREAK_CARD"
  │
  ├── referenziert → THEME "NEUROPLAY_THEME"
  │                    └── referenziert → [DESIGN_TOKEN "nw-violet", "nw-warm-gold", ...]
  │
  └── referenziert → ASSET "FLOWISAURUS_CHARACTER"
                       (asset_type: IMAGE)
```

> **Wichtig:** NeuroPlay referenziert dieselbe `METHOD "ENERGY_CHECK"` wie der Energy Navigator. Die Fachlogik existiert nur einmal.

---

## Kapitel 12 — Designentscheidungen

### 12.1 Warum `ENTITY` statt `USER`, `TEAM`, `ENTERPRISE`?

Alle vier Typen besitzen identische Core-Eigenschaften. Separate Typen würden zu Code-Duplikation führen. `entity_type` unterscheidet sie. Neue Entitätstypen (z. B. `COMMUNITY`, `SCHOOL`) entstehen ohne Schema-Änderung.

### 12.2 Warum `CONTENT` als Container statt separate Medientypen?

Ein Text und ein Audio-Kommentar zu derselben Frage sind semantisch dasselbe Objekt in verschiedenen Modalitäten. Ein `CONTENT`-Container hält alle Varianten zusammen, statt sie in separaten Tabellen zu verteilen.

### 12.3 Warum ist `RESULT` kein vollständiges NWObject?

Ergebnisse sind Betriebsdaten — sie werden nicht versioniert, veröffentlicht oder zwischen Umgebungen migriert. Ein vollständiger NWObject-Lifecycle würde für Laufzeitdaten zu Overhead führen. `RESULT` ist ein schlanker Datensatz mit Referenzen auf echte NWObjects.

### 12.4 Warum ist `PROMPT` ein vollständiges NWObject?

KI-Prompts müssen versioniert, genehmigt und auditierbar sein. Ein Prompt der Version 1.0 darf nach Freigabe nicht stillschweigend verändert werden. Das NWObject-Lifecycle-Modell passt exakt.

### 12.5 Warum keine direkte Textspeicherung in `QUESTION`?

Ein Fragetext existiert in mehreren Sprachen, mit Audio-Variante, mit Screenreader-Text und möglicherweise mit vereinfachter Sprache für bestimmte Zielgruppen. Direkte Textspeicherung würde Mehrsprachigkeit und Barrierefreiheit nachträglich unmöglich machen.

---

## Kapitel 13 — Akzeptanzkriterien

1. ✅ Alle NeuroWays-Objekte sind mit klarer Struktur definiert
2. ✅ Beziehungstypen (Containment vs. Referenz) sind eindeutig beschrieben
3. ✅ Builder leiten sich aus Objekttypen ab — nicht umgekehrt
4. ✅ Keine redundanten Informationen: `DESIGN_TOKEN` als einzige Farbquelle
5. ✅ Neue Objekttypen entstehen ohne Core-Anpassung (Kapitel 6)
6. ✅ Methoden sind zentral definiert, Module spezifizieren nur den Kontext (Kapitel 8)
7. ✅ Mehrsprachigkeit: kein direkter Text in Objekten außer `CONTENT`
8. ✅ Medien: alle über `ASSET` referenziert, nie eingebettet
9. ✅ Zukünftige Plattformen: kein Objektfeld enthält Plattformreferenz
10. ✅ Betriebsdaten (`RESULT`, `INSTALLATION`) klar von Stammdaten getrennt
11. ✅ Accessibility strukturell in jedem NWObject vorhanden
12. ✅ `ENTITY`-Modell vereint USER / TEAM / ENTERPRISE / ORGANIZATION

---

## Kapitel 14 — Roadmap

### Phase 1 — Dokumentation (aktuell abgeschlossen)
- ✅ NW-CORE-BUILDER-001: Core Builder Architektur
- ✅ NW-CORE-OBJECT-001: Universal Object Model (dieses Dokument)

### Phase 2 — Migration bestehender Objekte
| Aufgabe | Priorität |
|---------|-----------|
| `pkg_modules` → `MODULE`-NWObject migrieren | Hoch |
| `methods` + `questions` + `answer_options` → `METHOD`, `QUESTION`, `ANSWER_OPTION` | Hoch |
| `result_rules` → `SCORING_RULE` mit `DESIGN_TOKEN`-Referenz | Hoch |
| `design_tokens` → `DESIGN_TOKEN` NWObjects | Mittel |
| `dev_prompts` → `PROMPT` NWObjects | Mittel |

### Phase 3 — Builder-Implementierung
| Builder | Zielobjekttyp |
|---------|--------------|
| Method Builder | `METHOD`, `QUESTION`, `ANSWER_OPTION`, `SCORING_RULE` |
| Content Builder | `CONTENT`, `TRANSLATION` |
| Media Builder | `ASSET` |
| Design Builder | `DESIGN_TOKEN`, `THEME`, `COMPONENT` |

### Phase 4 — NeuroPlay als Praxistest
| Aufgabe | Beschreibung |
|---------|-------------|
| `QUEST`-Objekttyp registrieren | Erster neuer Typ nach dem Schema |
| NeuroPlay-MODULE über Module Builder | Erster vollständiger NWObject-Modulgraph |
| Flowisaurus als ASSET + CONTENT | Charakter als referenziertes Objekt |

---

*NW-CORE-OBJECT-001 — Universal Object & Relationship Model — v1.0.0 — draft — 2026-07-24*
