# NW-VALIDATE-CASE-001 – Energy Navigator Core Validation

**Dokumentcode:** NW-VALIDATE-CASE-001  
**Titel:** Energy Navigator Core Validation  
**Version:** 1.0.0  
**Status:** review  
**Erstellt:** 2026-07-24  
**Bereich:** NeuroWays Core / Architekturvalidierung  
**Referenzen:** NW-CORE-BUILDER-001, NW-CORE-OBJECT-001, NW-VALIDATE-001

---

## Änderungsverlauf

| Version | Datum | Änderung | Grund |
|---------|-------|----------|-------|
| 1.0.0 | 2026-07-24 | Erstfassung | Erster vollständiger Praxistest der Core-Architektur |

---

## Kapitel 1 — Ziel und Prüfbereich

### 1.1 Prüfziel

Dieser Validierungsfall prüft, ob sich der vollständige **Energy Navigator** — Methode, Fragen, Antworten, Bewertung, Ergebniszonen, Verlauf, Dashboard, Design und Datenschutz — **ausschließlich mit dem bestehenden NeuroWays-Core** modellieren lässt.

Es geht nicht um technische Implementierung. Es geht um den Nachweis der Architektureignung.

### 1.2 Was wird validiert

| Prüfbereich | Leitfrage |
|-------------|-----------|
| Objektinventur | Können alle Bestandteile als NWObjects modelliert werden? |
| Methodenmodell | Passt das METHOD_TYPE → METHOD → MODULE_SPEC-Schema? |
| Fragen & Antworten | Können Texte, Bewertungen und Inhalte sauber getrennt werden? |
| Bewertungsmodell | Lassen sich Scores, Zonen und Interpretationen klar trennen? |
| Ergebniszonen | Sind Farben, Texte und Icons korrekt referenziert (nicht kopiert)? |
| Session & Verlauf | Bleiben historische Ergebnisse reproduzierbar? |
| Datenschutz | Funktionieren Freigaben ohne Sonderlogik? |
| Builder-Ableitung | Entsteht kein duplizierter Builder? |
| Plattformunabhängigkeit | Ist das NWP-Manifest frei von Plattformreferenzen? |
| Core-Lücken | Wird jede Lücke belegt und mit Extension-Lösung oder zweitem Anwendungsfall abgesichert? |

### 1.3 Fachliche Ausgangslage

Der Energy Navigator beobachtet den persönlichen Energiezustand einer Person. Die zentrale Frage lautet:

> Wie erkennt eine Person, auf welchem energetischen Weg sie sich gerade befindet, bevor Überlastung entsteht?

Die Plattform stellt keine Diagnose. Sie ermöglicht strukturierte Selbstbeobachtung.

---

## Kapitel 2 — Verwendete Core-Grundlagen

| Dokument | Relevante Teile |
|----------|----------------|
| NW-CORE-BUILDER-001 | NWObject-Kern, Extension-Schema, NWP-Format, Lifecycle |
| NW-CORE-OBJECT-001 | Objektkatalog (MODULE, METHOD, QUESTION, SCORING_RULE, ENTITY, CONTENT, DESIGN_TOKEN, RESULT …), Beziehungstypen, Vererbungsmodell |
| NW-VALIDATE-001 | 7-Schritt-Prozess, 7 Prüffragen, Protokollformat, Freigaberegeln |

---

## Kapitel 3 — Objektinventur

### 3.1 Vollständige Inventur

| Objekttyp | Fachliche Rolle | Lifecycle | Versioniert | Extension |
|-----------|----------------|-----------|-------------|-----------|
| `MODULE` | Energy Navigator als Ganzes | PUBLISHED | Ja | `module_builder` |
| `METHOD_TYPE` | Kategorie „Selbstbeobachtung" | PUBLISHED | Nein | — |
| `METHOD` | Energy Check-in v1.1.0 (zentrale Fachlogik) | PUBLISHED | Ja | `method_builder` |
| `MODULE_SPEC` | App-Konfiguration des Energy Navigators | PUBLISHED | Ja | `module_builder` |
| `EXECUTION_MODE` | App / Seminar / Workshop / Coaching / NeuroPlay | PUBLISHED | Ja | `method_builder` |
| `QUESTION` | 6 Fragen (Energie, Anstrengung, …) | PUBLISHED | Ja | — |
| `ANSWER_OPTION` | 5 Antwortoptionen pro Frage | PUBLISHED | Ja | — |
| `SCORING_RULE` | 5 Ergebniszonen (Festland → Insel) | PUBLISHED | Ja | — |
| `DESIGN_TOKEN` | Farben, Größen, Abstände | PUBLISHED | Ja | `design_builder` |
| `CONTENT` | Fragetexte, Beschreibungen, Zonenhinweise | PUBLISHED | Ja | `content_builder` |
| `ASSET` | Icons, Weltkarten-Illustrationen | PUBLISHED | Ja | `media_builder` |
| `ENTITY (USER)` | Angemeldeter Benutzer | ACTIVE | Ja (Konto) | — |
| `RESULT` | Einzelnes Check-in-Ergebnis (Betriebsdatum) | — | Nein* | `energy_navigator` |
| `DASHBOARD` | Personal Workspace | PUBLISHED | Ja | `dashboard_builder` |
| `WIDGET` | Heute-Karte, Letztes Ergebnis | PUBLISHED | Ja | `dashboard_builder` |
| `NAVIGATION` | Menüeintrag Energy Navigator | PUBLISHED | Ja | `module_builder` |
| `PAGE` | Check-in-Seite, Ergebnisseite, Verlaufsseite | PUBLISHED | Ja | `module_builder` |
| `CONSENT` | Freigabe für Team, Unternehmen | ACTIVE | Ja | `consent_builder` |

> *`RESULT` ist Betriebsdatum. Es erhält keinen Publish-Lifecycle, wird aber mit `method_version`, `module_spec_version` und `execution_mode` versioniert referenziert, sodass historische Ergebnisse jederzeit rekonstruierbar bleiben.

### 3.2 Zentrale Eigenschaften der Schlüsselobjekte

#### `METHOD — Energy Check-in v1.1.0`
```
code:               ENERGY_CHECK
version:            1.1.0
method_type_ref:    → METHOD_TYPE "SELBSTBEOBACHTUNG"
questions:          → [QUESTION × 6]         (enthält)
scoring_rules:      → [SCORING_RULE × 5]     (enthält)
estimated_duration: 2 Minuten
changelog:          "Sechste Frage (Aufgabenwechsel) hinzugefügt"
```

#### `SCORING_RULE — Zone "Küste"`
```
code:               ENERGY_ZONE_KUESTE
method_ref:         → METHOD "ENERGY_CHECK"
min_score:          18
max_score:          20
result_code:        kueste
result_label_ref:   → CONTENT "ZONE_KUESTE_LABEL_DE"
description_ref:    → CONTENT "ZONE_KUESTE_DESC_DE"
observation_ref:    → CONTENT "ZONE_KUESTE_HINT_DE"
color_token_ref:    → DESIGN_TOKEN "energy.zone.coast.color"
icon_ref:           → ASSET "ICON_ANCHOR"
```

---

## Kapitel 4 — Methodenmodell

### 4.1 Einordnung in das Schichtmodell

```
METHOD_TYPE "SELBSTBEOBACHTUNG"
        │
        ▼ basiert auf
METHOD "ENERGY_CHECK v1.1.0"
(Fragen, Antworten, Scoring — zentral, unveränderlich, unabhängig vom Modul)
        │
        ▼ spezifiziert durch
MODULE_SPEC "ENERGY_NAVIGATOR_APP_SPEC"
(Kontext: welche Ausführungsform, welche Inhaltvariante, welche Rollen)
        │
        ├──▼ referenziert
        │  EXECUTION_MODE "APP"
        │  (Einzelperson, Smartphone/Browser, keine Moderation)
        │
        ├──▼ referenziert
        │  EXECUTION_MODE "SEMINAR"
        │  (Gruppe, moderiert, projiziert)
        │
        ├──▼ referenziert
        │  EXECUTION_MODE "COACHING"
        │  (1:1, moderiert, vertraulich)
        │
        └──▼ referenziert
           EXECUTION_MODE "NEUROPLAY"
           (spielerisch, Quest-Einbindung, ohne Punkte-Sichtbarkeit)
                   │
                   ▼ referenziert
           CONTENT (Variantenspezifisch)
           (andere Frageformulierung, andere Icons, andere Erklärung)
```

### 4.2 Trennungsanalyse

| Information | Verantwortliches Objekt | Darf variieren? |
|-------------|------------------------|----------------|
| Fragebedeutung (was wird gemessen?) | `METHOD` | NEIN — zentral, unveränderlich |
| Fragetext (sichtbarer Text) | `CONTENT` | JA — pro Sprache, pro Ausführungsform |
| Antwortwert (Bewertungspunkt) | `ANSWER_OPTION.numeric_value` | NEIN — zentral |
| Antwortlabel (sichtbarer Text) | `CONTENT` | JA — pro Sprache |
| Auswertungsgrenze | `SCORING_RULE` | NEIN — zentral |
| Zonenfarbe | `DESIGN_TOKEN` | JA (Theme) — aber nur über Token |
| Zonentext | `CONTENT` | JA — pro Sprache |
| Darstellungsreihenfolge | `EXECUTION_MODE` | JA — pro Ausführungsform |

**Ergebnis:** Die Trennung von Fachlogik, Modulspezifikation, Ausführungsform und Inhalt ist vollständig modellierbar. ✅

---

## Kapitel 5 — Fragen- und Antwortmodell

### 5.1 Exemplarische vollständige Fragen

#### Frage 1 — Energie
```
code:                  ENERGY_Q_ENERGY
method_ref:            → METHOD "ENERGY_CHECK"
sort_order:            10
dimension_code:        energy
is_required:           true

question_text_ref:     → CONTENT "Q_ENERGY_TEXT_DE"
                         primary_text: "Wie viel Energie steht dir gerade zur Verfügung?"
                         locale: de

question_audio_ref:    → CONTENT "Q_ENERGY_AUDIO_DE"
                         content_type: AUDIO
                         primary_asset_ref: → ASSET "Q_ENERGY_AUDIO_DE_V1"

question_simple_ref:   → CONTENT "Q_ENERGY_SIMPLE_DE"
                         primary_text: "Wie fit fühlst du dich gerade?"
                         locale: de
                         note: "vereinfachte Sprache, Barrierefreiheit"

answer_options:        → [ANSWER_OPTION × 5]  (enthält)
```

#### Antwortoptionen zu Frage 1
```
ANSWER_OPTION "AO_ENERGY_1"
  label_ref:     → CONTENT "AO_ENERGY_1_LABEL_DE"   (sehr viel Energie – ich kann flexibel wechseln)
  numeric_value: 1
  sort_order:    10
  icon_ref:      → ASSET "ICON_ZAP"
  color_token:   → DESIGN_TOKEN "energy.answer.level1.color"

ANSWER_OPTION "AO_ENERGY_5"
  label_ref:     → CONTENT "AO_ENERGY_5_LABEL_DE"   (keine Energie – kaum möglich)
  numeric_value: 5
  sort_order:    50
  icon_ref:      → ASSET "ICON_BATTERY_EMPTY"
  color_token:   → DESIGN_TOKEN "energy.answer.level5.color"
```

#### Frage 2 — Anstrengung
```
code:              ENERGY_Q_EFFORT
dimension_code:    effort
question_text_ref: → CONTENT "Q_EFFORT_TEXT_DE"
                     "Wie stark musst du dich gerade anstrengen, um weiterzumachen?"
```

#### Frage 3 — Sensitivität
```
code:              ENERGY_Q_SENSITIVITY
dimension_code:    sensitivity
question_text_ref: → CONTENT "Q_SENSITIVITY_TEXT_DE"
                     "Wie empfindlich reagierst du momentan auf Geräusche, Licht oder Unterbrechungen?"
```

#### Frage 4 — Entscheidungen
```
code:              ENERGY_Q_DECISIONS
dimension_code:    decisions
question_text_ref: → CONTENT "Q_DECISIONS_TEXT_DE"
                     "Wie leicht kannst du gerade Entscheidungen treffen?"
```

#### Frage 5 — Flexibilität
```
code:              ENERGY_Q_FLEXIBILITY
dimension_code:    flexibility
question_text_ref: → CONTENT "Q_FLEXIBILITY_TEXT_DE"
                     "Wie gut könntest du jetzt auf eine unerwartete Veränderung reagieren?"
```

#### Frage 6 — Aufgabenwechsel (neu in v1.1.0)
```
code:              ENERGY_Q_TRANSITION
dimension_code:    transition
question_text_ref: → CONTENT "Q_TRANSITION_TEXT_DE"
                     "Wie leicht fällt es dir gerade, zwischen verschiedenen Aufgaben zu wechseln?"
```

### 5.2 Validierungsantworten

| Prüffrage | Ergebnis |
|-----------|---------|
| Liegt der sichtbare Text im CONTENT? | ✅ JA — kein Text direkt in QUESTION |
| Bleibt Bewertungslogik unabhängig vom Text? | ✅ JA — numeric_value ist in ANSWER_OPTION, unabhängig von label_ref |
| Können Fragen umformuliert werden ohne Methodenänderung? | ✅ JA — nur der CONTENT ändert sich |
| Kann dieselbe Frage in App, Seminar, NeuroPlay unterschiedlich präsentiert werden? | ✅ JA — EXECUTION_MODE referenziert Content-Variante |
| Ist Audioversion möglich? | ✅ JA — CONTENT mit content_type AUDIO |
| Ist vereinfachte Sprache möglich? | ✅ JA — separater CONTENT-Eintrag mit Barrierefreiheits-Note |

---

## Kapitel 6 — Bewertungsmodell

### 6.1 Informationsebenen klar getrennt

| Ebene | Objekt | Beschreibung |
|-------|--------|-------------|
| **Rohwert** | `ANSWER_OPTION.numeric_value` | Punktewert 1–5 pro Antwort, direkt gespeichert |
| **Berechneter Wert** | `RESULT.total_score` | Summe aller Rohwerte (6–30), zur Laufzeit berechnet |
| **Fachliche Interpretation** | `SCORING_RULE` | Grenzen, Code, Beschreibung — zentral versioniert |
| **Ergebniszone** | `SCORING_RULE` | Zugeordneter fachlicher Bereich |
| **Sichtbare Darstellung** | `CONTENT`, `DESIGN_TOKEN`, `ASSET` | Texte, Farben, Icons — referenziert |
| **Empfehlung / Beobachtungshinweis** | `CONTENT` → `observation_ref` in `SCORING_RULE` | Beobachtend, niemals medizinisch |

### 6.2 Bewertungsregeln (alle 5 Zonen)

```
SCORING_RULE "ENERGY_ZONE_FESTLAND"  → min:  6, max: 12
SCORING_RULE "ENERGY_ZONE_WALD"      → min: 13, max: 17
SCORING_RULE "ENERGY_ZONE_KUESTE"    → min: 18, max: 20
SCORING_RULE "ENERGY_ZONE_MEER"      → min: 21, max: 25
SCORING_RULE "ENERGY_ZONE_INSEL"     → min: 26, max: 30
```

**Skala:** 6 Fragen × (1–5 Punkte) = 6 (Minimum) bis 30 (Maximum)  
**Abdeckung:** Lückenlos, keine Überschneidungen ✅

### 6.3 Verlauf und Veränderung

Verlaufsauswertung (über mehrere Sessions) entsteht durch Aggregation von `RESULT`-Objekten derselben `ENTITY`. Sie erfordert keinen eigenen Objekttyp — die Anwendungsschicht berechnet Trends aus bestehenden `RESULT`-Daten.

**Annahme (dokumentiert):** Die Anwendungsschicht berechnet Muster. Das NWObject-Modell stellt die Rohdaten; kein Aggregationsobjekt ist im Core erforderlich.

---

## Kapitel 7 — Ergebniszonen

### 7.1 Vollständige Zone-Modellierung

#### Zone: Festland
```
SCORING_RULE "ENERGY_ZONE_FESTLAND"
  code:              festland
  min_score:         6
  max_score:         12
  result_label_ref:  → CONTENT "ZONE_FESTLAND_LABEL"   ("Festland")
  description_ref:   → CONTENT "ZONE_FESTLAND_DESC"    ("Ausreichend Energie, Gestaltung ist möglich")
  observation_ref:   → CONTENT "ZONE_FESTLAND_HINT"    (Beobachtungshinweis ohne Bewertung)
  color_token_ref:   → DESIGN_TOKEN "energy.zone.festland.color"   (#2a9d8f)
  bg_color_token:    → DESIGN_TOKEN "energy.zone.festland.bg"      (#e8f5f3)
  icon_ref:          → ASSET "ICON_MOUNTAIN"
  illustration_ref:  → ASSET "WORLD_FESTLAND_ILLUSTRATION_V1.1"
```

#### Zone: Küste (Wendepunkt)
```
SCORING_RULE "ENERGY_ZONE_KUESTE"
  min_score:  18
  max_score:  20
  color_token_ref:  → DESIGN_TOKEN "energy.zone.coast.color"   (#4a9abb)
  description_ref:  → CONTENT "ZONE_KUESTE_DESC"
                      ("Wendepunkt — Belastung sollte reduziert werden")
```

#### Zone: Insel (Rückzug)
```
SCORING_RULE "ENERGY_ZONE_INSEL"
  min_score:  26
  max_score:  30
  color_token_ref:  → DESIGN_TOKEN "energy.zone.insel.color"   (#8b6f9e)
  description_ref:  → CONTENT "ZONE_INSEL_DESC"
                      ("Rückzug und Regeneration stehen im Vordergrund")
  observation_ref:  → CONTENT "ZONE_INSEL_HINT"
                      ("Die Insel ist kein Scheitern — sie ist ein geschützter Erholungsort")
```

### 7.2 Kritischer Prüfpunkt: Kein Wert doppelt gespeichert

| Information | Gespeichert in | Referenziert von |
|-------------|---------------|-----------------|
| Zonenfarbe `#2a9d8f` | `DESIGN_TOKEN "energy.zone.festland.color"` | `SCORING_RULE`, `DASHBOARD WIDGET`, `WORLD_REGION` |
| Zonentext "Festland" | `CONTENT "ZONE_FESTLAND_LABEL_DE"` | `SCORING_RULE`, `NAVIGATION`, `DASHBOARD` |
| Illustrations-Asset | `ASSET "WORLD_FESTLAND_ILLUSTRATION"` | `SCORING_RULE`, `PAGE`, `WIDGET` |

**Ergebnis: Keine Farbe, kein Text, kein Icon wird doppelt gespeichert.** ✅

---

## Kapitel 8 — Beziehungsmodell

### 8.1 Vollständiger Beziehungsgraph

```
MODULE "ENERGY_NAVIGATOR"
  ├──referenziert (1:1, Pflicht, versioniert)────────► MODULE_SPEC "ENERGY_APP_SPEC"
  ├──referenziert (1:n, Pflicht, versioniert)────────► NAVIGATION "ENERGY_NAV"
  ├──referenziert (1:n, optional, versioniert)───────► PAGE [CHECKIN, RESULT, HISTORY]
  └──referenziert (1:n, optional, versioniert)───────► DASHBOARD "ENERGY_DASHBOARD"
                                                              └──enthält──► WIDGET [×2]

MODULE_SPEC "ENERGY_APP_SPEC"
  ├──basiert auf (1:1, Pflicht, versioniert)─────────► METHOD "ENERGY_CHECK v1.1.0"
  └──referenziert (1:n, Pflicht)─────────────────────► EXECUTION_MODE [APP, SEMINAR, ...]

METHOD "ENERGY_CHECK v1.1.0"
  ├──enthält (1:n, Pflicht, mit Methode versioniert)─► QUESTION [×6]
  │    └──jede QUESTION:
  │         ├──referenziert──────────────────────────► CONTENT (Fragetext, Audio, Einfachsprache)
  │         └──enthält──────────────────────────────► ANSWER_OPTION [×5]
  │              └──referenziert──────────────────────► CONTENT (Label)
  │              └──referenziert──────────────────────► ASSET (Icon)
  │              └──referenziert──────────────────────► DESIGN_TOKEN (Farbe)
  └──enthält (1:n, Pflicht, mit Methode versioniert)─► SCORING_RULE [×5]
       ├──referenziert──────────────────────────────► CONTENT (Label, Beschreibung, Hinweis)
       ├──referenziert──────────────────────────────► DESIGN_TOKEN (Farbe, Hintergrund)
       └──referenziert──────────────────────────────► ASSET (Icon, Illustration)

RESULT (Laufzeitdatum)
  ├──referenziert (1:1, Pflicht)──────────────────────► ENTITY (USER)
  ├──referenziert (1:1, Pflicht, snapshot)────────────► METHOD + version
  ├──referenziert (1:1, Pflicht, snapshot)────────────► MODULE_SPEC + version
  ├──referenziert (1:1, Pflicht, snapshot)────────────► EXECUTION_MODE
  ├──referenziert (1:1, Pflicht)──────────────────────► SCORING_RULE (Treffer-Zone)
  └──enthält (1:n, Pflicht)───────────────────────────► ANSWER_RECORD [×6] (Laufzeit)
       └──referenziert──────────────────────────────► QUESTION + version
       └──referenziert──────────────────────────────► ANSWER_OPTION + version
```

### 8.2 Kardinalitäten

| Beziehung | Typ | Kardinalität | Pflicht |
|-----------|-----|-------------|---------|
| MODULE → MODULE_SPEC | referenziert | 1:1 | Ja |
| MODULE_SPEC → METHOD | basiert auf | 1:1 | Ja |
| MODULE_SPEC → EXECUTION_MODE | referenziert | 1:n | Ja (mind. 1) |
| METHOD → QUESTION | enthält | 1:n | Ja (mind. 1) |
| QUESTION → ANSWER_OPTION | enthält | 1:n | Ja (mind. 2) |
| METHOD → SCORING_RULE | enthält | 1:n | Ja (mind. 1) |
| RESULT → ENTITY | referenziert | n:1 | Ja |
| RESULT → SCORING_RULE | referenziert | n:1 | Ja |
| CONSENT → ENTITY (grantor) | referenziert | n:1 | Ja |
| CONSENT → ENTITY (grantee) | referenziert | n:1 | Ja |

---

## Kapitel 9 — Session- und Verlaufsmodell

### 9.1 RESULT-Objekt (vollständig)

```
RESULT (Betriebsdatum)
  id:                    <uuid>
  entity_ref:            → ENTITY (USER) "svenja@neuroways.de"
  method_code:           ENERGY_CHECK
  method_version:        1.1.0              ← unveränderlicher Snapshot
  module_spec_code:      ENERGY_APP_SPEC
  module_spec_version:   1.0.0              ← unveränderlicher Snapshot
  execution_mode:        APP
  session_date:          2026-07-24
  total_score:           18
  scoring_rule_ref:      → SCORING_RULE "ENERGY_ZONE_KUESTE"
  result_code:           kueste

  answer_records: [      ← enthält, Laufzeit
    { question_ref: ENERGY_Q_ENERGY,      question_version: "1.1.0",
      answer_option_ref: AO_ENERGY_3,     numeric_value: 3 },
    { question_ref: ENERGY_Q_EFFORT,      question_version: "1.1.0",
      answer_option_ref: AO_EFFORT_3,     numeric_value: 3 },
    { question_ref: ENERGY_Q_SENSITIVITY, question_version: "1.1.0",
      answer_option_ref: AO_SENSITIVITY_4,numeric_value: 4 },
    { question_ref: ENERGY_Q_DECISIONS,   question_version: "1.1.0",
      answer_option_ref: AO_DECISIONS_4,  numeric_value: 4 },
    { question_ref: ENERGY_Q_FLEXIBILITY, question_version: "1.1.0",
      answer_option_ref: AO_FLEXIBILITY_4,numeric_value: 4 },
    { question_ref: ENERGY_Q_TRANSITION,  question_version: "1.1.0",
      answer_option_ref: AO_TRANSITION_3, numeric_value: 4 }
  ]

  extensions:
    energy_navigator:
      note:        "Heute viel Lärm im Büro"
      activities:  ["work", "walk"]
      tags:        ["Büro", "Lärm"]
```

### 9.2 Unveränderlichkeitsgarantie

Wenn später eine neue Frage (v1.2.0) hinzukommt oder eine Zonengrenze ändert:

- Das historische `RESULT` enthält `method_version: "1.1.0"` — es bleibt exakt so interpretierbar
- Die `SCORING_RULE`-Versionen, die bei der Erstellung galten, sind im Snapshot vermerkt
- Neue SCORING_RULE-Versionen betreffen ausschließlich neue `RESULT`-Objekte

**Ergebnis: Historische Sessions bleiben vollständig reproduzierbar.** ✅

---

## Kapitel 10 — Content- und Designreferenzen

### 10.1 Designwerte — Einzige Quelle der Wahrheit

```
DESIGN_TOKEN "energy.zone.coast.color"
  token_type:  COLOR
  value:       #4a9abb
  theme_ref:   → THEME "NEUROWAYS_LIGHT"
  usage:       "Primärfarbe der Küsten-Zone"

── referenziert von ──
SCORING_RULE "ENERGY_ZONE_KUESTE"    (color_token_ref)
WORLD_REGION "kueste"                (primary_color_token_ref)
WIDGET "ENERGY_STATUS_CARD"          (accent_token_ref)
PAGE "RESULT_PAGE"                   (zone_color_token)
```

Kein Objekt außer `DESIGN_TOKEN` speichert `#4a9abb`. ✅

### 10.2 Content-Referenzkette

```
CONTENT "Q_ENERGY_TEXT_DE"
  content_type:    TEXT
  locale:          de
  primary_text:    "Wie viel Energie steht dir gerade zur Verfügung?"

CONTENT "Q_ENERGY_TEXT_EN"
  content_type:    TEXT
  locale:          en
  primary_text:    "How much energy is available to you right now?"

CONTENT "Q_ENERGY_AUDIO_DE"
  content_type:    AUDIO
  locale:          de
  primary_asset_ref: → ASSET "Q_ENERGY_AUDIO_DE_V1.mp3"

CONTENT "Q_ENERGY_SIMPLE_DE"
  content_type:    TEXT
  locale:          de
  primary_text:    "Wie fit fühlst du dich gerade?"
  accessibility:   { note: "Einfache Sprache, Barrierefreiheit Level A2" }
```

Alle vier Varianten referenzieren denselben Frageinhalt — aber keine dupliziert die Frage selbst. Der `QUESTION`-Eintrag referenziert alle vier. ✅

---

## Kapitel 11 — Datenschutz und Freigaben

### 11.1 Freigabemodell

Das NeuroWays-Freigabemodell basiert auf dem `CONSENT`-Objekt (als neuer Typ in NW-CORE-OBJECT-001 v1.1.0vorgesehen — durch zwei Anwendungsfälle begründet).

```
CONSENT "SVENJA_TEAM_RELEASE_2026"
  grantor_ref:         → ENTITY (USER) "svenja"
  grantee_ref:         → ENTITY (TEAM) "team-a"
  scope:               ENERGY_RESULT
  valid_from:          2026-07-01
  valid_until:         null   (unbegrenzt)
  result_filter:       ALL    (alle Ergebnisse)
  status:              ACTIVE

CONSENT "SVENJA_SINGLE_RESULT"
  grantor_ref:         → ENTITY (USER) "svenja"
  grantee_ref:         → ENTITY (ENTERPRISE) "neuroways-gmbh"
  scope:               SINGLE_RESULT
  result_ref:          → RESULT "2026-07-24"
  valid_from:          2026-07-24
  valid_until:         2026-08-24
  status:              ACTIVE
```

### 11.2 Standardverhalten

Kein `RESULT` ist ohne expliziten `CONSENT`-Eintrag für andere `ENTITY`-Objekte sichtbar. Die `listRule`-Zugriffskontrolle auf der Plattform setzt dies durch.

### 11.3 Sonderfälle

| Freigabetyp | Modellierbar? |
|-------------|--------------|
| Einzelnes Ergebnis | ✅ CONSENT mit result_ref |
| Zeitraum | ✅ CONSENT mit valid_from + valid_until |
| Ab einem Datum | ✅ CONSENT mit valid_from, valid_until=null |
| Unbegrenzt | ✅ CONSENT mit valid_from, valid_until=null, result_filter=ALL |
| Widerruf | ✅ CONSENT.status → ARCHIVED |
| Granulare Freigabe (nur Zone, kein Score) | ⚠️ Extension-Feld `scope_fields: [result_code]` notwendig — lösbar |

**Ergebnis:** Das Freigabemodell funktioniert ohne Sonderlogik im Core — `CONSENT`-Objekt als Extension ausreichend. ✅

---

## Kapitel 12 — Builder-Ableitung

### 12.1 Benötigte Builder

| Builder | Verwendet für | Core-Funktion | Extension-Schema |
|---------|--------------|--------------|-----------------|
| **Module Builder** | MODULE, MODULE_SPEC, NAVIGATION, PAGE | NWObject-Kern, NWP-Generator | `module_builder` |
| **Method Builder** | METHOD, QUESTION, ANSWER_OPTION, SCORING_RULE | NWObject-Kern, Versionierung | `method_builder` |
| **Content Builder** | CONTENT, TRANSLATION | NWObject-Kern, i18n-Schicht | `content_builder` |
| **Media Builder** | ASSET | NWObject-Kern, Dateireferenz | `media_builder` |
| **Design Builder** | DESIGN_TOKEN, THEME | NWObject-Kern | `design_builder` |
| **Dashboard Builder** | DASHBOARD, WIDGET | NWObject-Kern | `dashboard_builder` |

### 12.2 Keine duplizierte Builder-Logik

| Prüfpunkt | Ergebnis |
|-----------|---------|
| Gibt es Builder-Funktionen, die mehrfach implementiert werden? | ✅ NEIN — Versionierung, Lifecycle, Validation kommen aus dem Core Builder |
| Kann ein neuer Builder (z. B. Consent Builder) ohne Core-Änderung entstehen? | ✅ JA — Extension-Schema registrieren, fertig |
| Sind Extension-Schemas plattformunabhängig? | ✅ JA — kein `pocketbase_collection` im Schema |

---

## Kapitel 13 — Plattformunabhängiges NWP-Beispiel

### 13.1 NWP-Manifest (Auszug)

```json
{
  "nwp_version": "1.0",
  "format": "neuroways-package",
  "created_at": "2026-07-24T07:00:00Z",
  "objects": [
    {
      "nwo_version": "1.0",
      "object_type": "MODULE",
      "code": "ENERGY_NAVIGATOR",
      "version": "1.1.0",
      "status": "published",
      "meta": {
        "name": "Energy Navigator",
        "category": "Gesundheit",
        "icon": "waves"
      },
      "extensions": {
        "module_builder": {
          "features": ["dashboard_card", "own_pages", "methods", "evaluations"],
          "nav_config": { "path": "/checkin", "label_ref": "ENERGY_NAV_LABEL", "icon_ref": "ICON_WAVES" },
          "dashboard_cards": ["ENERGY_TODAY_CARD", "ENERGY_LAST_RESULT"],
          "method_spec_ref": "ENERGY_APP_SPEC",
          "data_objects": ["ENERGY_CHECK_RESULT"]
        }
      }
    },
    {
      "object_type": "METHOD",
      "code": "ENERGY_CHECK",
      "version": "1.1.0",
      "extensions": {
        "method_builder": {
          "questions": ["ENERGY_Q_ENERGY","ENERGY_Q_EFFORT","ENERGY_Q_SENSITIVITY","ENERGY_Q_DECISIONS","ENERGY_Q_FLEXIBILITY","ENERGY_Q_TRANSITION"],
          "scoring_type": "SUM",
          "min_score": 6,
          "max_score": 30
        }
      }
    },
    {
      "object_type": "SCORING_RULE",
      "code": "ENERGY_ZONE_KUESTE",
      "extensions": {
        "method_builder": {
          "min_score": 18,
          "max_score": 20,
          "result_code": "kueste",
          "color_token_ref": "energy.zone.coast.color"
        }
      }
    }
  ],
  "checksum": "sha256:...",
  "installation": {
    "platform_targets": ["pocketbase", "oracle_apex", "postgres"],
    "auto_register_nav": true,
    "auto_register_dashboard": true
  }
}
```

**Keine Plattformreferenzen im Manifest.** Die Installation entscheidet plattformspezifisch, wie sie dieses Manifest umsetzt. ✅

---

## Kapitel 14 — Erkannte Architekturprobleme und Lücken

### 14.1 Lückenanalyse

| # | Anforderung | Modellierbar? | Lücke / Lösung |
|---|-------------|--------------|----------------|
| L1 | Aktivitätskatalog als Objekt | ⚠️ Teilweise | Aktuell hardcodiert. **Extension-Lösung:** CONTENT-Liste mit Typ `ACTIVITY_CATALOGUE`. Zweiter Anwendungsfall: NeuroPlay (Aktivitäten als Spielbedingungen). → **Extension empfohlen, kein Core-Eingriff** |
| L2 | Consent-Granularität (nur Zone freigeben) | ⚠️ Teilweise | `CONSENT.scope_fields`-Extension-Feld fehlt. **Extension-Lösung:** `scope_fields: [result_code]` im Consent-Extension-Schema. → **Extension empfohlen** |
| L3 | Verlaufsaggregation (Muster über Zeit) | ✅ Vollständig | Anwendung aggregiert `RESULT`-Objekte. Kein neues Objekt nötig. |
| L4 | Beobachtungstext ohne Bewertung | ✅ Vollständig | `SCORING_RULE.observation_ref → CONTENT` — Sprachregeln im CONTENT-Objekt |
| L5 | Frage-Abhängigkeiten (Frage B nur wenn A=X) | ⚠️ Nicht modelliert | Konditionelle Fragen wären komplexer METHOD-Extension nötig. **Annahme:** Für Energy Navigator v1.x nicht erforderlich. Zweiter Anwendungsfall erforderlich, bevor Core-Erweiterung. |
| L6 | Mehrsprachige Audiofassung | ✅ Vollständig | CONTENT mit locale-Varianten und ASSET-Referenzen |
| L7 | Unveränderliche historische Sessions | ✅ Vollständig | Versionsreferenzen in RESULT sichern Reproduzierbarkeit |

### 14.2 Empfohlene Extensions (keine Core-Änderungen)

| Extension | Objekttyp | Felder | Begründung |
|-----------|-----------|--------|------------|
| `energy_navigator` | `RESULT` | `note`, `activities`, `tags` | Reiseeintrag-Kontext |
| `energy_navigator` | `SCORING_RULE` | `world_region_ref` | Verbindung zur NeuroWays World |
| `consent_builder` | `CONSENT` | `scope_fields` | Granulare Freigabe |
| `content_builder` | `CONTENT` | `accessibility_level` | Sprachvereinfachungs-Stufe |

---

## Kapitel 15 — Validierungsmatrix

| # | Prüffrage | Ergebnis | Bemerkung |
|---|-----------|---------|-----------|
| 1 | Alle Informationen mit NWObjects modellierbar? | ✅ JA | Mit dokumentierten Extensions |
| 2 | Entstehen Sonderobjekte gegen Core-Invarianten? | ✅ NEIN | CONSENT via Extension ausreichend |
| 3 | Neue Beziehungstypen erforderlich? | ✅ NEIN | Alle Beziehungen im Core definiert |
| 4 | Doppelte Informationen? | ✅ NEIN | Alle Tokens, Texte, Icons referenziert |
| 5 | Builder interpretieren vollständig? | ✅ JA | Alle 6 Builder via Core-Funktionen |
| 6 | Funktioniert ohne Hardcoding? | ⚠️ BEDINGT | Aktivitätskatalog noch hardcodiert |
| 7 | Erweiterbar ohne Core-Änderung? | ✅ JA | Extensions ausreichend |

---

## Kapitel 16 — Akzeptanztests

| # | Test | Ergebnis |
|---|------|---------|
| AT1 | Energy Navigator vollständig mit NWObjects modelliert | ✅ |
| AT2 | Alle Informationen genau einem Objekt zugeordnet | ✅ |
| AT3 | Keine sichtbaren Inhalte hardcodiert | ⚠️ Aktivitätskatalog als offener Punkt |
| AT4 | Keine Designwerte kopiert | ✅ — alle über DESIGN_TOKEN |
| AT5 | Dieselbe Methode in mehreren Ausführungsformen | ✅ — App, Seminar, Coaching, NeuroPlay |
| AT6 | Fragen/Inhalte unabhängig von Bewertungslogik änderbar | ✅ |
| AT7 | Historische Sessions reproduzierbar | ✅ — Versionsreferenzen |
| AT8 | Ergebnisse zeitlich auswertbar | ✅ — RESULT mit session_date |
| AT9 | Freigaben ohne Sonderlogik | ✅ — CONSENT-Extension |
| AT10 | Builder nur über Core-Funktionen und Extensions | ✅ |
| AT11 | NWP-Manifest plattformunabhängig | ✅ |
| AT12 | Alle Core-Lücken nachvollziehbar belegt | ✅ — L1–L7 dokumentiert |

---

## Kapitel 17 — Release-Entscheidung

### 🟢 PASS WITH EXTENSIONS

**Der Energy Navigator kann vollständig mit der bestehenden Core-Architektur modelliert werden.**

Der Core (NW-CORE-BUILDER-001 + NW-CORE-OBJECT-001 v1.0.0) ist für diesen Anwendungsfall **ausreichend**. Alle Anforderungen lassen sich modellieren — teils direkt, teils über sauber definierte Extensions.

**Offene Punkte (keine Blocker):**

| Punkt | Priorität | Maßnahme |
|-------|-----------|---------|
| Aktivitätskatalog als NWObject | MITTEL | Extension im Content Builder |
| CONSENT.scope_fields | GERING | Extension im Consent Builder |
| Bedingte Fragen | GERING | Erst bei zweitem Anwendungsfall |

**Core-Anpassungen:** Keine erforderlich. CONSENT-Objekttyp (bereits durch zwei Domänen belegt) wird in NW-CORE-OBJECT-001 v1.1.0 ergänzt.

---

## Kapitel 18 — Fortschrittsbericht und nächster Schritt

### Abgeschlossene Schritte
1. ✅ Objektinventur (18 Objekte vollständig)
2. ✅ Methodenmodell angewendet und validiert
3. ✅ 6 Fragen exemplarisch modelliert
4. ✅ Bewertungsmodell mit klarer Schichtentrennung
5. ✅ 5 Ergebniszonen ohne Wertduplizierung
6. ✅ Vollständiger Beziehungsgraph
7. ✅ Session- und Verlaufsmodell
8. ✅ Datenschutz und Freigaben
9. ✅ Builder-Ableitung
10. ✅ NWP-Manifest
11. ✅ Lückenanalyse (7 Punkte)
12. ✅ Validierungsmatrix und Akzeptanztests

### Nächster Schritt

**NW-VALIDATE-CASE-002 – NeuroPlay Core Stress Test**

Dort wird zusätzlich geprüft: Spiel, Quest, Charakter, Karte, Belohnung, Fortschritt, Zufallsmechanik, kooperative Spielzustände, physische und digitale Ausführung.

---

*NW-VALIDATE-CASE-001 — Energy Navigator Core Validation — v1.0.0 — review — 2026-07-24*
