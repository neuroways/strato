# NW-MIGRATE-CASE-003 – Method Object Migration Report

**Dokumentcode:** NW-MIGRATE-CASE-003  
**Titel:** Method Object Migration Report  
**Version:** 1.0.0  
**Status:** published  
**Erstellt:** 2026-07-24  
**Migrations-Code:** MIG-001-P3  
**Referenzen:** NW-MIGRATION-001, NW-MIGRATE-CASE-001, NW-MIGRATE-CASE-002, NW-CORE-OBJECT-001

---

## Kapitel 1 — Übersicht

```
Migrations-Code:      MIG-001-P3
Phase:                Phase 3 — Methoden
Muster:               Expand → Migrate → Validate → Contract (gesperrt)
Ausgeführt:           2026-07-24
NWO-Objekte gesamt:   50
Collections angelegt: 7
Validierungen:        24/24 bestanden
Prüfsumme:            257aa03c5b67b1781407db5baad27621...
Ergebnis:             PASS
```

---

## Kapitel 2 — Phase 1: Analyse

### 2.1 Bestandsaufnahme

| Quelle | Einträge | NWO-Typ | NWO-Objekte |
|--------|----------|---------|-------------|
| `methods` | 1 | METHOD + METHOD_TYPE | 2 |
| `questions` | 6 | QUESTION | 6 |
| `answer_options` | 30 | ANSWER_OPTION | 30 |
| `result_rules` | 5 | SCORING_RULE | 5 |
| Neu definiert | — | EXECUTION_MODE | 6 |
| Neu definiert | — | MODULE_SPEC | 1 |
| **Gesamt** | **42** | **7 Typen** | **50** |

### 2.2 Methodenmodell Energy Navigator

```
METHOD_TYPE "SELBSTBEOBACHTUNG"
        │
        ▼
METHOD "ENERGY_CHECK v1.1.0"
  (scoring: SUM | min: 6 | max: 30 | duration: 2min)
        │
        ├──enthält──► QUESTION × 6         → question_text_ref → CONTENT
        │               └──enthält──► ANSWER_OPTION × 5  → label_content_ref → CONTENT
        │
        └──enthält──► SCORING_RULE × 5     → label/desc/hint → CONTENT
                                            → color_token_ref → DESIGN_TOKEN
        │
        ▼
MODULE_SPEC "ENERGY_APP_SPEC"
  → method_ref → METHOD "ENERGY_CHECK"
  → module_ref → "ENERGY_NAVIGATOR"
  → execution_mode_refs → [APP, SEMINAR, WORKSHOP, COACHING, ANALOG, NEUROPLAY]
```

---

## Kapitel 3 — Phase 2: Expand

**7 neue NWO-Collections angelegt:**

| Collection | NWO-Typ | Einträge |
|------------|---------|---------|
| `nwo_method_types` | METHOD_TYPE | 1 |
| `nwo_methods` | METHOD | 1 |
| `nwo_questions` | QUESTION | 6 |
| `nwo_answer_options` | ANSWER_OPTION | 30 |
| `nwo_scoring_rules` | SCORING_RULE | 5 |
| `nwo_execution_modes` | EXECUTION_MODE | 6 |
| `nwo_module_specs` | MODULE_SPEC | 1 |

**Jedes Objekt trägt:**
- `version: "1.1.0"` (Methode) / `"1.0.0"` (neue Objekte)
- `status: "PUBLISHED"`
- `source_id` + `source_collection` → Rückverfolgbarkeit
- Alle CONTENT-Referenzen → kein direkter Text
- Alle Token-Referenzen → kein direkter Farbwert

---

## Kapitel 4 — Phase 3: Migrate

Quelltabellen mit `nwo_ref` + `nwo_version` erweitert:

| Collection | Feld | Einträge |
|------------|------|---------|
| `methods` | nwo_ref, nwo_version, migration_status | 1 |
| `questions` | nwo_ref, nwo_version | 6 |
| `result_rules` | nwo_ref, nwo_version | 5 |
| `answer_options` | nwo_ref, nwo_version | 30 |

**Originaldaten: unverändert.**

---

## Kapitel 5 — Phase 4: Validierung (24/24)

| # | Prüfung | Ergebnis |
|---|---------|---------|
| V01 | NWO-Methodenstruktur vollständig (7 Typen) | ✅ |
| V02 | METHOD ENERGY_CHECK v1.1.0 korrekt | ✅ |
| V03 | Alle 6 QUESTION → method_ref + content_ref | ✅ |
| V04 | 30 ANSWER_OPTION — 5 pro Frage | ✅ |
| V05 | 5 SCORING_RULE — lückenlos 6–30 | ✅ |
| V06 | 6 EXECUTION_MODE vorhanden | ✅ |
| V07 | MODULE_SPEC ENERGY_APP_SPEC verknüpft | ✅ |
| V08 | questions.nwo_ref gesetzt | ✅ |
| V09 | result_rules.nwo_ref gesetzt | ✅ |
| V10 | NeuroFlow-Verwendung möglich | ✅ |
| V11 | NeuroPlay-EXECUTION_MODE registriert | ✅ |
| V12 | Flowisaurus (supports_ai) vorbereitet | ✅ |
| V13 | PDF/Papier (supports_analog) registriert | ✅ |
| V14 | Web/Mobile — kein Plattformverweis | ✅ |
| V15 | Keine Zonengrenzen hardcodiert | ✅ |
| V16 | Keine Fragetexte hardcodiert | ✅ |
| V17 | Keine Antwortlabels hardcodiert | ✅ |
| V18 | Versionierung METHOD möglich | ✅ |
| V19 | Varianten via EXECUTION_MODE | ✅ |
| V20 | Extensions (NeuroPlay, KI-Builder) möglich | ✅ |
| V21 | Multiple Ausführungsformen (6) | ✅ |
| V22 | Multiple Module via MODULE_SPEC | ✅ |
| V23 | KI-Ausführung (supports_ai) | ✅ |
| V24 | App-Smoke: checkins lesbar | ✅ |

---

## Kapitel 6 — Phase 5: Energy Navigator Vollständigkeitsprüfung

### 6.1 Kann die Methode vollständig über NWObjects beschrieben werden?

**Ja.** Die gesamte fachliche Logik des Energy Navigators liegt in NWObjects:

| Aspekt | NWO-Objekt |
|--------|-----------|
| Was wird gemessen? | METHOD_TYPE "SELBSTBEOBACHTUNG" |
| Wie wird bewertet? | METHOD "ENERGY_CHECK" (SUM, 6–30) |
| Welche Fragen? | QUESTION × 6 |
| Welche Antworten? | ANSWER_OPTION × 5 pro Frage |
| Wie werden Zonen ermittelt? | SCORING_RULE × 5 (lückenlos) |
| Welche Texte? | CONTENT (alle referenziert) |
| Welche Farben? | DESIGN_TOKEN (alle referenziert) |
| Wie wird ausgeführt? | EXECUTION_MODE × 6 |
| Für welches Modul? | MODULE_SPEC |

### 6.2 Ist keinerlei Hardcoding mehr erforderlich?

**Ja** — für die NWObject-Schicht. Der bestehende App-Code (engine.js) liest noch direkte Felder. Das ist der Expand–Migrate–Contract-Standard: Die NWO-Schicht ist vollständig, der App-Code wird in der Contract-Phase nachgeführt.

### 6.3 Kann dieselbe Methode in mehreren Kontexten verwendet werden?

| Kontext | Status |
|---------|--------|
| NeuroFlow (App) | ✅ EXECUTION_MODE APP |
| NeuroPlay (Quest) | ✅ EXECUTION_MODE NEUROPLAY |
| Flowisaurus (KI) | ✅ EXECUTION_MODE COACHING, supports_ai=true |
| Papier | ✅ EXECUTION_MODE ANALOG, supports_analog=true |
| PDF | ✅ EXECUTION_MODE ANALOG (Print-Variante) |
| Web | ✅ EXECUTION_MODE APP |
| Mobile | ✅ EXECUTION_MODE APP |

---

## Kapitel 7 — Architekturprüfung METHOD

| Eigenschaft | Unterstützt | Beschreibung |
|-------------|-------------|-------------|
| **Versionierung** | ✅ | NWObject-Versionen — v1.1.0 eingefroren |
| **Varianten** | ✅ | EXECUTION_MODE je Kontext |
| **Erweiterungen** | ✅ | Extension-Schema neuroplay_builder / ai_builder |
| **Builder** | ✅ | Method Builder (NW-CB-006) auf dieser Struktur |
| **Mehrere Ausführungsformen** | ✅ | 6 EXECUTION_MODEs registriert |
| **Mehrere Module** | ✅ | MODULE_SPEC-Muster für beliebig viele Module |
| **KI-Ausführung** | ✅ | supports_ai + AGENT-Integration via Extension |

**Kein Core-Eingriff erforderlich.** Alle Erweiterungen via Extension-Schema.

---

## Kapitel 8 — Contract (gesperrt)

### Altfelder, die später entfernt werden können

| Collection | Altfeld | Bedingung |
|------------|---------|-----------|
| `questions` | `question_text` | App liest question_text_ref |
| `result_rules` | `result_label`, `description`, `observation_hint` | App liest *_content_refs |
| `result_rules` | `color`, `bg_color` | App liest color_token_ref |
| `answer_options` | `label` | App liest label_content_ref |
| `methods` | `name`, `description` | Nach App-Umbau auf content_refs |

### Voraussetzungen

| Bedingung | Status |
|-----------|--------|
| Alle Phasen 1–9 validiert | ⏳ Phase 1–3 abgeschlossen |
| App liest NWO-Refs | ❌ engine.js noch auf Direktfelder |
| Deprecation 60 Tage | ❌ Noch nicht gestartet |

---

## Kapitel 9 — Rollback

```
Phase 2 Rollback: nwo_method_types / nwo_methods / nwo_questions /
                  nwo_answer_options / nwo_scoring_rules /
                  nwo_execution_modes / nwo_module_specs löschen
                  → App läuft unverändert weiter
                  → Zeit: < 60 Sekunden

Phase 3 Rollback: nwo_ref / nwo_version in Quelltabellen leeren
                  → Kein Datenverlust
```

---

## Kapitel 10 — Abschlussentscheidung

### ✅ PASS

**Die vollständige Methodenmigration ist abgeschlossen.**

- **50 NWO-Methodenobjekte** in 7 Typen — vollständige fachliche Domäne
- **24/24 Validierungen** bestanden
- **Nullpunkt-Datenverlust**
- **6 Ausführungsformen** (NeuroFlow, NeuroPlay, Flowisaurus, Coaching, Analog, Web)
- **Kein Hardcoding** in der NWO-Schicht
- **Rollback vollständig möglich**
- **Prüfsumme:** `257aa03c5b67b1781407db5baad27621...`

Der Energy Navigator ist jetzt die erste vollständig in NWObjects modellierte NeuroWays-Methode.

**Nächster Schritt:** Phase 4 — Module (MODULE NWObject für Energy Navigator)

---

*NW-MIGRATE-CASE-003 — Method Object Migration — v1.0.0 — published — MIG-001-P3 — 2026-07-24*
