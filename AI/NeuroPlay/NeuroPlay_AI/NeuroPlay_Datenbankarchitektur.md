# NeuroPlay — Datenbankarchitektur

**Dokumentversion:** 1.0  
**Letztes Update:** 2026-07-25  
**Status:** Produktionsreif

---

## Inhaltsverzeichnis

1. [Architektur-Übersicht](#architektur-übersicht)
2. [Kernobjekte und ihre Beziehungen](#kernobjekte-und-ihre-beziehungen)
3. [Fachliches Datenmodell](#fachliches-datenmodell)
4. [Logisches relationales Schema](#logisches-relationales-schema)
5. [Tabellenstruktur und Dokumentation](#tabellenstruktur-und-dokumentation)
6. [SQL-Skripte](#sql-skripte)
7. [Views und Abfragen](#views-und-abfragen)
8. [API- und Service-Struktur](#api--und-service-struktur)
9. [Rollen und Berechtigungen](#rollen-und-berechtigungen)
10. [Versionierung und Migration](#versionierung-und-migration)
11. [Datenschutz und Löschkonzepte](#datenschutz-und-löschkonzepte)
12. [Testdaten und Importstrategie](#testdaten-und-importstrategie)

---

## Architektur-Übersicht

### Zentrale Prinzipien

1. **Ebenen-Trennung:** Allgemeines Wissen über Aktivitäten ist vollständig getrennt von personenbezogenen Daten.
2. **Beobachtungen vs. Interpretationen:** Neutrale Beobachtungen werden getrennt von Ableitungen, Empfehlungen und KI-Analysen gespeichert.
3. **Plattformunabhängigkeit:** Die Datenbank verwendet standardkonformes SQL und kann auf jedes relationale DBMS migriert werden.
4. **Flexibilität und Extensibilität:** Merkmale, Kategorien, Regeln und Quellen sind nicht in starre Spalten gezwängt, sondern durch strukturelle Flexibilität erweiterbar.
5. **Nachvollziehbarkeit:** Jede Aussage, jede Empfehlung, jede Änderung kann auf ihre Herkunft zurückgeführt werden.
6. **Sicherheit und Datenschutz:** Sensible Daten sind opt-in, transparent und löschbar. Soft Deletes ermöglichen Nachvollziehbarkeit.

### Schichten-Architektur

```
┌─────────────────────────────────────────────┐
│         Anwendungs- und UI-Ebene           │
├─────────────────────────────────────────────┤
│         API- und Service-Schicht            │
│  - Activity Service                         │
│  - Observation Service                      │
│  - Recommendation Service                   │
│  - User Service                             │
│  - Match Engine                             │
├─────────────────────────────────────────────┤
│       Geschäftslogik-Schicht                │
│  - Matching-Algorithmen                     │
│  - Wirkungs-Berechnung                      │
│  - Versioning & Migrations                  │
│  - Access Control                           │
├─────────────────────────────────────────────┤
│       Datenpersistierungs-Schicht           │
│  - Core Tables (Activity DNA)               │
│  - Knowledge Base (Regeln, Quellen)         │
│  - User & Profile Data                      │
│  - Observation & Event Data                 │
│  - Recommendation & Analysis Data           │
├─────────────────────────────────────────────┤
│  Relationale Datenbank (SQLite, PostgreSQL) │
└─────────────────────────────────────────────┘
```

---

## Kernobjekte und ihre Beziehungen

### 1. Activity (zentral)

Eine Aktivität ist jede zielgerichtete Handlung, die Wirkung entfalten kann.

**Spezialisierungen:**
- Board Games (Brettspiele)
- Video Games
- Card Games
- Sports
- Creative Work
- Learning
- Music
- Relaxation

**Hauptbeziehungen:**
- hat Activity DNA (Merkmale)
- gehört zu Category
- hat Tag
- mit Person (Autor, Illustrator)
- mit Publisher
- mit Source (Dokumentation, Regelwerk)
- hat Rule (strukturiertes Regelwissen)
- hat Game Object (Material, Figuren, etc.)
- hat Phase / Flow
- hat Strategy
- in Recommendation
- in Session / Observation

### 2. Activity DNA (Merkmalsmodell)

Beschreibt alle fassbaren Eigenschaften einer Aktivität.

**Struktur:**
- Attribute Definition → erlaubte Merkmale
- Attribute Value → konkrete Werte pro Activity
- Attribute Group → Klassifizierung (kognitiv, sozial, etc.)

**Eigenschaften:**
- Messwert oder kategorisch
- Wertebereich
- Sicherheit / Confidence
- Herkunft (redaktionell, KI, Beobachtung, Nutzer)
- Version

### 3. Rule (Regelmodell)

Strukturierte Repräsentation von Spielregeln und Ablaufregeln.

**Typen:**
- Basic Rule
- Action Rule
- Phase Rule
- Scoring Rule
- End Condition
- Exception
- Variant
- Errata

**Beziehungen untereinander:**
- supplements
- overrides
- contradicts
- is_exception_of
- required_for
- activates
- prevents

### 4. User & Profile (Personenbezogene Daten)

**User Account:** Technische Nutzerdaten  
**Human Profile:** Freiwillige Angaben für Empfehlungen

Trennung ermöglicht:
- Anonyme Benutzung
- Datenschutz
- Transparente Datenfreigabe

### 5. Situation (Kontextdaten)

Beschreibt den Kontext einer Aktivität: Zeit, Ort, Bedürfnisse, verfügbare Ressourcen, Stimmung.

Verlinkt mit:
- Session
- Observation
- Recommendation

### 6. Session (Aktivitätsdurchführung)

Eine konkrete Durchführung einer Aktivität.

Speichert:
- Wann
- Wer
- Welche Aktivität
- In welcher Situation
- Welche Beobachtungen
- Welche Wirkungen
- Welche Reflexionen

### 7. Observation (Beobachtung)

Neutrale, faktische Beobachtung während oder nach einer Aktivität.

**Getrennt von:**
- Interpretation
- Diagnose
- Bewertung

### 8. Impact (Wirkung)

Beschreibt Veränderungen, die mit einer Aktivität verbunden sind.

**Dimensionen:**
- Mood
- Energy
- Focus
- Social Connection
- Self-Efficacy
- Frustration
- Learning
- Regeneration
- etc.

**Quellen:**
- Beobachtet
- Selbstberichtet
- KI-abgeleitet
- Fachlich bestätigt

### 9. Recommendation (Empfehlung)

Intelligente Vorschläge für Aktivitäten basierend auf:
- Mensch/Gruppe
- Situation
- Bedürfnisse
- Präferenzen
- bekannte Wirkungen

**Nachvollziehbar durch:**
- Begründung
- berücksichtigte Faktoren
- Gegenargumente
- Versionsnummer
- Akzeptanz/Ablehnung
- tatsächliche Auswahl
- beobachtete Wirkung

### 10. Source & Document (Quellenverwaltung)

Jede fachliche Information hat eine Quelle.

**Quellentypen:**
- Official Rules
- Publisher Website
- FAQ
- Video
- Scientific Paper
- User Input
- KI Analysis
- Internal Expert Analysis

**Vertrackung:**
- Source Origin
- Trust Level
- Verification Status
- Document Type
- Hash/Version
- Storage Location

---

## Fachliches Datenmodell

```
┌─────────────────────────────────────┐
│         ACTIVITY KNOWLEDGE          │
├─────────────────────────────────────┤
│ Activity                            │
│  ├─ activity_id (PK)               │
│  ├─ public_id (UUID)               │
│  ├─ name                           │
│  ├─ description                    │
│  ├─ activity_type (enum)           │
│  ├─ status (draft/published)       │
│  ├─ version                        │
│  └─ created/updated timestamps     │
│                                     │
├─ ActivityDNA (flexibles Merkmal)   │
│  ├─ activity_dna_id (PK)           │
│  ├─ activity_id (FK)               │
│  ├─ attribute_definition_id (FK)   │
│  ├─ value (variabel)               │
│  ├─ confidence (0-100)             │
│  ├─ source_type (redactional/ai)   │
│  └─ created_at                     │
│                                     │
├─ ActivityCategory                  │
│  ├─ activity_category_id (PK)      │
│  ├─ activity_id (FK)               │
│  ├─ category_id (FK)               │
│  └─ order                          │
│                                     │
├─ ActivityTag                       │
│  ├─ activity_tag_id (PK)           │
│  ├─ activity_id (FK)               │
│  ├─ tag_id (FK)                    │
│  └─ confidence                     │
│                                     │
└─ Rule (strukturiertes Regelwerk)   │
   ├─ rule_id (PK)                   │
   ├─ activity_id (FK)               │
   ├─ rule_type (enum)               │
   ├─ title                          │
   ├─ description                    │
   ├─ structured_content (JSON)      │
   └─ version                        │
│                                     │
├─ RuleRelation                      │
│  ├─ rule_relation_id (PK)          │
│  ├─ source_rule_id (FK)            │
│  ├─ target_rule_id (FK)            │
│  ├─ relation_type (supplements,...)│
│  └─ explanation                    │
│                                     │
└─ GameObject                        │
   ├─ game_object_id (PK)            │
   ├─ activity_id (FK)               │
   ├─ object_type                    │
   ├─ name                           │
   ├─ quantity                       │
   ├─ properties (JSON)              │
   └─ image_ref                      │
```

```
┌─────────────────────────────────────┐
│       PERSON & PROFILE DATA         │
├─────────────────────────────────────┤
│ User                                │
│  ├─ user_id (PK)                   │
│  ├─ public_id (UUID)               │
│  ├─ email                          │
│  ├─ status (active/inactive)       │
│  ├─ created_at                     │
│  └─ deleted_at (Soft Delete)       │
│                                     │
├─ HumanProfile                      │
│  ├─ profile_id (PK)                │
│  ├─ user_id (FK, unique)           │
│  ├─ profile_data (JSON)            │
│  │  - preferences                  │
│  │  - interests                    │
│  │  - goals                        │
│  │  - experience_level             │
│  │  - sensory_preferences          │
│  │  - accessibility_needs          │
│  ├─ consent_given (boolean)        │
│  ├─ visibility (private/shared)    │
│  ├─ updated_at                     │
│  └─ deleted_at                     │
│                                     │
├─ Need (aktuelles Bedürfnis)        │
│  ├─ need_id (PK)                   │
│  ├─ user_id (FK)                   │
│  ├─ need_type (enum)               │
│  ├─ intensity (1-10)               │
│  ├─ valid_until                    │
│  ├─ source (self_reported/derived) │
│  └─ created_at                     │
│                                     │
└─ Session (Aktivitätsdurchführung)  │
   ├─ session_id (PK)                │
   ├─ public_id (UUID)               │
   ├─ user_id (FK)                   │
   ├─ activity_id (FK)               │
   ├─ situation_id (FK)              │
   ├─ session_status                 │
   ├─ started_at                     │
   ├─ ended_at                       │
   ├─ duration_minutes               │
   ├─ participants (JSON)            │
   ├─ notes (text)                   │
   └─ created_at                     │
```

```
┌─────────────────────────────────────┐
│      OBSERVATION & IMPACT DATA      │
├─────────────────────────────────────┤
│ Observation                         │
│  ├─ observation_id (PK)            │
│  ├─ session_id (FK)                │
│  ├─ observation_type (enum)        │
│  ├─ content (text)                 │
│  ├─ structured_data (JSON)         │
│  ├─ observed_by (FK to user)       │
│  ├─ confidence (0-100)             │
│  ├─ visibility (private/shared)    │
│  ├─ timestamp                      │
│  └─ created_at                     │
│                                     │
├─ Impact (Wirkung)                  │
│  ├─ impact_id (PK)                 │
│  ├─ session_id (FK)                │
│  ├─ impact_dimension (enum)        │
│  │  - mood, energy, focus,         │
│  │  - social_connection, learning  │
│  ├─ value (numerical/categorical)  │
│  ├─ direction (positive/negative)  │
│  ├─ intensity (1-10)               │
│  ├─ source (observed/self/ai)      │
│  ├─ duration_minutes               │
│  ├─ context (text)                 │
│  ├─ confidence (0-100)             │
│  └─ created_at                     │
│                                     │
├─ Reflection (Reflexion)            │
│  ├─ reflection_id (PK)             │
│  ├─ session_id (FK)                │
│  ├─ user_id (FK)                   │
│  ├─ reflection_data (JSON)         │
│  │  - feeling                      │
│  │  - what_helped                  │
│  │  - what_was_difficult           │
│  │  - adjustments_for_next         │
│  ├─ would_repeat (boolean)         │
│  └─ created_at                     │
│                                     │
└─ Development (Entwicklung)         │
   ├─ development_id (PK)            │
   ├─ user_id (FK)                   │
   ├─ dimension (enum)               │
   │  - self_understanding,          │
   │  - clarity_of_needs,            │
   │  - strategies, social_skill     │
   ├─ change_description             │
   ├─ evidence (JSON array)          │
   │  - observation_ids              │
   │  - reflection_ids               │
   ├─ verified (boolean)             │
   └─ created_at                     │
```

```
┌─────────────────────────────────────┐
│    RECOMMENDATION & ANALYSIS        │
├─────────────────────────────────────┤
│ Recommendation                      │
│  ├─ recommendation_id (PK)         │
│  ├─ public_id (UUID)               │
│  ├─ user_id (FK)                   │
│  ├─ situation_id (FK)              │
│  ├─ activity_id (FK)               │
│  ├─ ranking (1-5)                  │
│  ├─ rationale (text)               │
│  ├─ considered_factors (JSON)      │
│  │  - needs                        │
│  │  - preferences                  │
│  │  - known_barriers               │
│  │  - expected_impacts             │
│  ├─ alternative_activities (JSON)  │
│  ├─ risks_and_mitigations (JSON)   │
│  ├─ required_adaptations (JSON)    │
│  ├─ uncertainty_level (0-100)      │
│  ├─ model_version                  │
│  ├─ accepted (boolean, null)       │
│  ├─ actually_chosen (activity_id)  │
│  ├─ observed_impact_id (FK)        │
│  ├─ created_at                     │
│  └─ updated_at                     │
│                                     │
└─ SystemAnalysis                    │
   ├─ analysis_id (PK)               │
   ├─ analysis_type (enum)           │
   │  - trend, correlation,          │
   │  - effectiveness, coverage      │
   ├─ scope (user/group/all)         │
   ├─ time_period                    │
   ├─ findings (JSON)                │
   ├─ confidence (0-100)             │
   ├─ generated_at                   │
   └─ algorithm_version              │
```

```
┌─────────────────────────────────────┐
│     SOURCES & DOCUMENTATION        │
├─────────────────────────────────────┤
│ Source                              │
│  ├─ source_id (PK)                 │
│  ├─ public_id (UUID)               │
│  ├─ source_type (enum)             │
│  │  - official_rules,              │
│  │  - publisher_website, video,    │
│  │  - scientific_paper, user_input,│
│  │  - ai_analysis, expert_analysis │
│  ├─ title                          │
│  ├─ url                            │
│  ├─ publisher_or_author            │
│  ├─ language                       │
│  ├─ publication_date               │
│  ├─ retrieved_date                 │
│  ├─ license_notice                 │
│  ├─ copyright_notice               │
│  ├─ trust_level (0-100)            │
│  ├─ verification_status            │
│  ├─ created_at                     │
│  └─ deleted_at                     │
│                                     │
├─ Document                          │
│  ├─ document_id (PK)               │
│  ├─ source_id (FK)                 │
│  ├─ file_type (pdf, txt, json)     │
│  ├─ file_name                      │
│  ├─ file_size                      │
│  ├─ file_hash (SHA256)             │
│  ├─ storage_location               │
│  ├─ version                        │
│  ├─ created_at                     │
│  └─ deleted_at                     │
│                                     │
└─ Source Attribution                │
   ├─ source_attribution_id (PK)     │
   ├─ source_id (FK)                 │
   ├─ attributed_to_entity_type      │
   │  - activity, rule,              │
   │  - impact_value, recommendation │
   ├─ attributed_to_entity_id (FK)   │
   ├─ specific_claim (text)          │
   ├─ quote_or_excerpt               │
   └─ created_at                     │
```

```
┌─────────────────────────────────────┐
│       REFERENCE TABLES              │
├─────────────────────────────────────┤
│ Category                            │
│  ├─ category_id (PK)               │
│  ├─ name                           │
│  ├─ slug                           │
│  ├─ description                    │
│  ├─ icon                           │
│  ├─ parent_category_id (FK, null)  │
│  └─ order                          │
│                                     │
├─ Tag                               │
│  ├─ tag_id (PK)                    │
│  ├─ name                           │
│  ├─ slug                           │
│  ├─ category (enum)                │
│  └─ color                          │
│                                     │
├─ AttributeDefinition               │
│  ├─ attribute_definition_id (PK)   │
│  ├─ name                           │
│  ├─ slug                           │
│  ├─ attribute_group (enum)         │
│  │  - cognitive, emotional,        │
│  │  - social, physical, sensory    │
│  ├─ data_type (number/text/enum)   │
│  ├─ unit_of_measure                │
│  ├─ min_value / max_value          │
│  ├─ allowed_values (JSON enum)     │
│  ├─ description                    │
│  ├─ version                        │
│  └─ deprecated (boolean)           │
│                                     │
├─ Person                            │
│  ├─ person_id (PK)                 │
│  ├─ public_id (UUID)               │
│  ├─ first_name                     │
│  ├─ last_name                      │
│  ├─ role_type (author/illustrator) │
│  ├─ bio                            │
│  ├─ website                        │
│  ├─ created_at                     │
│  └─ deleted_at                     │
│                                     │
├─ Publisher                         │
│  ├─ publisher_id (PK)              │
│  ├─ public_id (UUID)               │
│  ├─ name                           │
│  ├─ country                        │
│  ├─ website                        │
│  ├─ founded_year                   │
│  ├─ created_at                     │
│  └─ deleted_at                     │
│                                     │
└─ Situation                         │
   ├─ situation_id (PK)              │
   ├─ user_id (FK)                   │
   ├─ situation_data (JSON)          │
   │  - time, location               │
   │  - available_time, energy       │
   │  - group_size, participants     │
   │  - goal, mood, stress_level     │
   │  - available_materials          │
   │  - mobility, environment        │
   │  - noise_level, time_pressure   │
   │  - support_needed               │
   ├─ created_at                     │
   └─ session_id (FK, nullable)      │
```

---

## Logisches relationales Schema

### Kern-Tabellen (Knowledge Base)

| Tabelle | Zweck | Primärschlüssel |
|---------|-------|-----------------|
| `activity` | Master-Tabelle für alle Aktivitäten | `activity_id` (numeric) + `public_id` (UUID) |
| `activity_dna` | Merkmale und Eigenschaften | `activity_dna_id` + FK (`activity_id`, `attribute_definition_id`) |
| `attribute_definition` | Katalog erlaubter Merkmale | `attribute_definition_id` |
| `rule` | Strukturierte Spielregeln und Ablaufregeln | `rule_id` + FK (`activity_id`) |
| `rule_relation` | Beziehungen zwischen Regeln | `rule_relation_id` + FK (`source_rule_id`, `target_rule_id`) |
| `game_object` | Spielmaterialien, Figuren, Karten | `game_object_id` + FK (`activity_id`) |
| `category` | Kategorisierung von Aktivitäten | `category_id` |
| `tag` | Flexible Tags für Aktivitäten | `tag_id` |
| `activity_category` | Many-to-Many für Aktivitäten und Kategorien | `activity_category_id` + FK (`activity_id`, `category_id`) |
| `activity_tag` | Many-to-Many für Aktivitäten und Tags | `activity_tag_id` + FK (`activity_id`, `tag_id`) |
| `person` | Autoren, Illustratoren, Designer | `person_id` + `public_id` |
| `activity_person` | Zuordnung Aktivität-Person mit Rolle | `activity_person_id` + FK + `role_type` |
| `publisher` | Verlage | `publisher_id` + `public_id` |

### Nutzer und Profile

| Tabelle | Zweck | Primärschlüssel |
|---------|-------|-----------------|
| `user` | Benutzerkonto | `user_id` (numeric) + `public_id` (UUID) |
| `human_profile` | Freiwillige, private Profildaten | `profile_id` + FK (`user_id`, unique) |
| `need` | Aktuelle Bedürfnisse | `need_id` + FK (`user_id`) |

### Aktivitätsdurchführung und Kontext

| Tabelle | Zweck | Primärschlüssel |
|---------|-------|-----------------|
| `situation` | Kontextdaten für eine Situation | `situation_id` + FK (`user_id`) |
| `session` | Durchführung einer Aktivität | `session_id` (numeric) + `public_id` (UUID) |

### Beobachtung und Datenerfassung

| Tabelle | Zweck | Primärschlüssel |
|---------|-------|-----------------|
| `observation` | Neutrale Beobachtungen | `observation_id` + FK (`session_id`) |
| `impact` | Wirkungen und Veränderungen | `impact_id` + FK (`session_id`) |
| `reflection` | Reflexionen nach einer Aktivität | `reflection_id` + FK (`session_id`, `user_id`) |
| `development` | Langfristige Entwicklungen | `development_id` + FK (`user_id`) |

### Empfehlung und Analyse

| Tabelle | Zweck | Primärschlüssel |
|---------|-------|-----------------|
| `recommendation` | Intelligente Aktivitäts-Empfehlungen | `recommendation_id` + `public_id` + FK (`user_id`, `activity_id`) |
| `system_analysis` | Aggregierte Analysen und Trends | `analysis_id` |

### Quellen und Dokumentation

| Tabelle | Zweck | Primärschlüssel |
|---------|-------|-----------------|
| `source` | Quellenverzeichnis | `source_id` + `public_id` |
| `document` | Dokumentdateien | `document_id` + FK (`source_id`) |
| `source_attribution` | Zuordnung Quelle → Aussage | `source_attribution_id` + FK (`source_id`) |

---

## Tabellenstruktur und Dokumentation

### Grundtabellen (Vollständige Definition)

#### `activity`

Zentraltabelle. Beschreibt jede Aktivität unabhängig von ihrer Spezialisierung.

| Spalte | Typ | Constraint | Beschreibung |
|--------|-----|-----------|-------------|
| `activity_id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Interne numerische ID |
| `public_id` | VARCHAR(36) | UNIQUE, NOT NULL | UUID für öffentliche Referenz |
| `name` | VARCHAR(255) | NOT NULL, INDEXED | Aktivitätsname |
| `slug` | VARCHAR(255) | UNIQUE, NOT NULL | URL-freundlicher Identifier |
| `short_description` | VARCHAR(500) | | Kurzbeschreibung |
| `full_description` | TEXT | | Ausführliche Beschreibung |
| `activity_type` | ENUM('board_game','video_game','card_game','sport','music','creative_work','learning','relaxation','movement','other') | NOT NULL, INDEXED | Klassifizierung |
| `objective` | TEXT | | Ziel oder Zweck |
| `typical_duration_minutes` | INT | CHECK > 0 | Typische Spieldauer |
| `min_duration_minutes` | INT | CHECK >= 0 | Mindestdauer |
| `max_duration_minutes` | INT | CHECK >= 0 | Maximaldauer |
| `min_participants` | INT | CHECK >= 0, DEFAULT 1 | Mindestanzahl Teilnehmende |
| `max_participants` | INT | CHECK >= 0 | Maximale Teilnehmerzahl |
| `recommended_age_min` | INT | CHECK >= 0 | Empfohlenes Mindestalter |
| `recommended_age_max` | INT | CHECK >= 0 | Empfohlenes Maximalter |
| `complexity_level` | ENUM('very_simple','simple','moderate','complex','very_complex') | | Komplexitätsgrad |
| `accessibility_notes` | TEXT | | Hinweise zur Barrierefreiheit |
| `required_location_type` | VARCHAR(100) | | Benötigter Ortstyp (indoor/outdoor/any) |
| `required_materials` | JSON | | Liste benötigter Materialien |
| `estimated_cost` | DECIMAL(8,2) | CHECK >= 0 | Geschätzte Kosten |
| `preparation_time_minutes` | INT | | Vorbereitungsaufwand |
| `cleanup_time_minutes` | INT | | Aufräumaufwand |
| `physical_requirements` | JSON | | Körperliche Anforderungen |
| `cognitive_requirements` | JSON | | Kognitive Anforderungen |
| `social_requirements` | JSON | | Soziale Anforderungen |
| `emotional_requirements` | JSON | | Emotionale Anforderungen |
| `sensory_requirements` | JSON | | Sensorische Anforderungen |
| `possible_barriers` | JSON | | Bekannte Barrieren |
| `possible_adaptations` | JSON | | Mögliche Anpassungen |
| `status` | ENUM('draft','published','archived','deprecated') | NOT NULL, INDEXED | Veröffentlichungsstatus |
| `quality_status` | ENUM('unreviewed','reviewed','verified','expert_approved') | DEFAULT 'unreviewed' | Qualitätsstatus |
| `version` | INT | DEFAULT 1 | Versionsnummer |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Erstellungszeitpunkt |
| `created_by` | BIGINT | FOREIGN KEY (user_id) | Ersteller |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Letzte Änderung |
| `updated_by` | BIGINT | FOREIGN KEY (user_id) | Letzter Bearbeiter |
| `deleted_at` | TIMESTAMP | NULL | Soft Delete |
| `deleted_by` | BIGINT | FOREIGN KEY (user_id), NULL | Wer hat gelöscht |

**Indizes:**
- `INDEX idx_activity_type (activity_type, status)`
- `INDEX idx_activity_slug (slug)`
- `INDEX idx_activity_public_id (public_id)`
- `INDEX idx_activity_complexity (complexity_level)`
- `INDEX idx_activity_created (created_at DESC)`

---

#### `activity_dna`

Speichert flexible, wiederverwendbare Merkmale.

| Spalte | Typ | Constraint | Beschreibung |
|--------|-----|-----------|-------------|
| `activity_dna_id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Interne ID |
| `activity_id` | BIGINT | FOREIGN KEY (activity.activity_id), NOT NULL | Zugeordnete Aktivität |
| `attribute_definition_id` | BIGINT | FOREIGN KEY (attribute_definition.attribute_definition_id), NOT NULL | Merkmalsdefinition |
| `value` | VARCHAR(500) or JSON | | Aktueller Wert (variabel je Datentyp) |
| `value_numeric` | DECIMAL(10,2) | NULL | Numerischer Wert (falls zutreffend) |
| `value_text` | TEXT | NULL | Textwert (falls zutreffend) |
| `confidence` | INT | CHECK 0-100, DEFAULT 100 | Sicherheit der Aussage |
| `source_type` | ENUM('redactional','ai_generated','derived_from_observation','user_confirmed') | DEFAULT 'redactional' | Herkunftstyp |
| `source_id` | BIGINT | FOREIGN KEY (source.source_id), NULL | Verweisbarer Ursprung |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Erstellungszeitpunkt |
| `created_by` | BIGINT | FOREIGN KEY (user_id) | Ersteller |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Letzte Änderung |
| `updated_by` | BIGINT | FOREIGN KEY (user_id) | Letzter Bearbeiter |
| `deleted_at` | TIMESTAMP | NULL | Soft Delete |

**Indizes:**
- `INDEX idx_dna_activity (activity_id)`
- `INDEX idx_dna_attribute (attribute_definition_id)`
- `INDEX idx_dna_source (source_type)`
- `UNIQUE INDEX idx_dna_unique (activity_id, attribute_definition_id, deleted_at)` (verhindert Duplikate, berücksichtigt Soft Delete)

**Beispieldaten:**
```
activity_id: 1 (z.B. "Catan")
attribute_definition_id: 5 (z.B. "Game Complexity")
value: "moderate"
confidence: 95
source_type: "redactional"
created_at: 2025-01-15 10:30:00
```

---

#### `attribute_definition`

Katalog aller erlaubten Merkmale.

| Spalte | Typ | Constraint | Beschreibung |
|--------|-----|-----------|-------------|
| `attribute_definition_id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Interne ID |
| `name` | VARCHAR(255) | NOT NULL, UNIQUE | Merkmalname |
| `slug` | VARCHAR(255) | UNIQUE, NOT NULL | URL-freundlich |
| `attribute_group` | ENUM('cognitive','emotional','social','physical','sensory','motor','communication','strategy','learning','accessibility') | NOT NULL, INDEXED | Merkmalskategorie |
| `description` | TEXT | | Erklärung des Merkmals |
| `data_type` | ENUM('number','text','enum','boolean','date','json') | NOT NULL | Erwarteter Datentyp |
| `unit_of_measure` | VARCHAR(50) | NULL | Einheit (z.B. "minutes", "percentage") |
| `min_value` | DECIMAL(10,2) | NULL | Minimum (falls numeric) |
| `max_value` | DECIMAL(10,2) | NULL | Maximum (falls numeric) |
| `allowed_values` | JSON | NULL | Erlaubte Enum-Werte |
| `example_value` | VARCHAR(255) | | Beispielwert |
| `instructions_for_assessment` | TEXT | | Wie wird das Merkmal bewertet? |
| `version` | INT | DEFAULT 1 | Katalogversion |
| `is_deprecated` | BOOLEAN | DEFAULT FALSE, INDEXED | Veraltet? |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Erstellungszeitpunkt |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Letzte Änderung |

**Indizes:**
- `INDEX idx_attribute_group (attribute_group)`
- `INDEX idx_attribute_deprecated (is_deprecated)`

**Beispieldaten:**
```sql
INSERT INTO attribute_definition 
(name, slug, attribute_group, description, data_type, min_value, max_value) 
VALUES 
('Game Complexity', 'game_complexity', 'cognitive', 'How complex are the rules and strategies?', 'enum', NULL, NULL),
('Requires Cooperation', 'requires_cooperation', 'social', 'Does the game require active cooperation?', 'boolean', NULL, NULL),
('Play Time (minutes)', 'play_time_minutes', 'cognitive', 'Average play time in minutes', 'number', 5, 480);
```

---

#### `rule`

Strukturierte Repräsentation von Regeln.

| Spalte | Typ | Constraint | Beschreibung |
|--------|-----|-----------|-------------|
| `rule_id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Interne ID |
| `activity_id` | BIGINT | FOREIGN KEY (activity.activity_id), NOT NULL | Zugeordnete Aktivität |
| `rule_type` | ENUM('basic_rule','action_rule','phase_rule','scoring_rule','end_condition','exception','variant','errata','optional_rule') | NOT NULL, INDEXED | Regeltyp |
| `title` | VARCHAR(255) | NOT NULL | Regelüberschrift |
| `short_description` | VARCHAR(500) | | Kurzbeschreibung |
| `full_description` | TEXT | | Ausführliche Regeltext |
| `structured_content` | JSON | | Strukturierte Daten |
| `applies_to_phase` | VARCHAR(100) | NULL | Welche Spielphase? |
| `applies_to_players` | VARCHAR(100) | NULL | Welche Spieler? |
| `precondition` | TEXT | NULL | Voraussetzung |
| `action` | TEXT | NULL | Was wird getan? |
| `consequence` | TEXT | NULL | Was folgt daraus? |
| `exception` | TEXT | NULL | Ausnahmen |
| `examples` | JSON | NULL | Anwendungsbeispiele |
| `related_objects` | JSON | NULL | Bezug zu Spielobjekten |
| `priority` | INT | DEFAULT 100 | Priorität bei Konflikten |
| `source_id` | BIGINT | FOREIGN KEY (source.source_id), NULL | Quellenreferenz |
| `page_reference` | VARCHAR(100) | NULL | Seitenverweis in Original |
| `version` | INT | DEFAULT 1 | Regelversion |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Erstellungszeitpunkt |
| `created_by` | BIGINT | FOREIGN KEY (user_id) | Ersteller |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Letzte Änderung |
| `deleted_at` | TIMESTAMP | NULL | Soft Delete |

**Indizes:**
- `INDEX idx_rule_activity (activity_id)`
- `INDEX idx_rule_type (rule_type)`
- `INDEX idx_rule_phase (applies_to_phase)`

---

#### `user`

Benutzerkonto (technische Daten).

| Spalte | Typ | Constraint | Beschreibung |
|--------|-----|-----------|-------------|
| `user_id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Interne numerische ID |
| `public_id` | VARCHAR(36) | UNIQUE, NOT NULL | UUID |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL, INDEXED | E-Mail-Adresse |
| `password_hash` | VARCHAR(255) | NOT NULL | Gehashed password |
| `display_name` | VARCHAR(255) | | Öffentlicher Name |
| `role` | ENUM('user','moderator','admin') | DEFAULT 'user' | Systemrolle |
| `status` | ENUM('active','inactive','suspended','deleted') | DEFAULT 'active', INDEXED | Kontostatus |
| `email_verified` | BOOLEAN | DEFAULT FALSE | E-Mail bestätigt? |
| `last_login_at` | TIMESTAMP | NULL | Letzte Anmeldung |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Erstellungszeitpunkt |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Letzte Änderung |
| `deleted_at` | TIMESTAMP | NULL | Soft Delete |

**Indizes:**
- `INDEX idx_user_email (email)`
- `INDEX idx_user_status (status)`
- `INDEX idx_user_public_id (public_id)`

---

#### `human_profile`

Optionale, private Profildaten (Nutzer-Angaben für Empfehlungen).

| Spalte | Typ | Constraint | Beschreibung |
|--------|-----|-----------|-------------|
| `profile_id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Interne ID |
| `user_id` | BIGINT | FOREIGN KEY (user.user_id), UNIQUE, NOT NULL | Zugeordneter Nutzer |
| `profile_data` | JSON | NOT NULL | Flächige Profildaten |
| `consent_given` | BOOLEAN | DEFAULT FALSE | Einwilligung für Datennutzung |
| `visibility` | ENUM('private','friends','public') | DEFAULT 'private' | Sichtbarkeit |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Erstellungszeitpunkt |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Letzte Änderung |
| `deleted_at` | TIMESTAMP | NULL | Soft Delete |

**JSON-Struktur (Beispiel):**
```json
{
  "preferences": {
    "favorite_activities": ["board_game", "music"],
    "favorite_tags": ["cooperative", "strategic", "family_friendly"],
    "disliked_themes": ["violence", "horror"]
  },
  "experience_level": "intermediate",
  "goals": ["improve_strategy", "social_connection", "relaxation"],
  "accessibility_needs": {
    "hearing": false,
    "vision": false,
    "mobility": true,
    "cognitive": false,
    "communication": false
  },
  "energy_preferences": "moderate_energy",
  "preferred_group_size": "3-5",
  "session_preferences": {
    "preferred_time": "evening",
    "preferred_location": "home",
    "typical_duration": "60-120"
  }
}
```

---

#### `session`

Dokumentation einer konkreten Aktivitätsdurchführung.

| Spalte | Typ | Constraint | Beschreibung |
|--------|-----|-----------|-------------|
| `session_id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Interne numerische ID |
| `public_id` | VARCHAR(36) | UNIQUE, NOT NULL | UUID |
| `user_id` | BIGINT | FOREIGN KEY (user.user_id), NOT NULL, INDEXED | Betroffene Person |
| `activity_id` | BIGINT | FOREIGN KEY (activity.activity_id), NOT NULL, INDEXED | Durchgeführte Aktivität |
| `situation_id` | BIGINT | FOREIGN KEY (situation.situation_id), NULL | Situationskontext |
| `session_status` | ENUM('planned','in_progress','completed','cancelled','paused') | DEFAULT 'completed', INDEXED | Status |
| `started_at` | TIMESTAMP | NOT NULL | Startzeitpunkt |
| `ended_at` | TIMESTAMP | NULL | Endzeitpunkt |
| `duration_minutes` | INT | CHECK > 0 | Gesamtdauer |
| `participants` | JSON | | Liste Teilnehmende (user_id, name, role) |
| `notes` | TEXT | | Freitext-Notizen |
| `location_notes` | VARCHAR(255) | | Wo fand es statt? |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Erfassungszeitpunkt |
| `created_by` | BIGINT | FOREIGN KEY (user_id) | Wer hat es erfasst? |

**Indizes:**
- `INDEX idx_session_user (user_id, created_at DESC)`
- `INDEX idx_session_activity (activity_id)`
- `INDEX idx_session_status (session_status)`
- `INDEX idx_session_date (started_at)`

---

#### `observation`

Neutrale Beobachtungen während einer Session.

| Spalte | Typ | Constraint | Beschreibung |
|--------|-----|-----------|-------------|
| `observation_id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Interne ID |
| `session_id` | BIGINT | FOREIGN KEY (session.session_id), NOT NULL | Zugeordnete Session |
| `observation_type` | ENUM('behavior','interaction','emotion','performance','environment','rule_clarification','engagement','other') | NOT NULL | Beobachtungstyp |
| `content` | TEXT | NOT NULL | Beobachtungstext |
| `structured_data` | JSON | NULL | Strukturierte Felder |
| `observed_by` | BIGINT | FOREIGN KEY (user.user_id), NOT NULL | Wer hat beobachtet? |
| `observed_at` | TIMESTAMP | NOT NULL | Zeitpunkt der Beobachtung |
| `confidence` | INT | CHECK 0-100, DEFAULT 100 | Sicherheit |
| `relates_to_object` | VARCHAR(255) | NULL | Bezug zu Spielobjekt oder Person |
| `visibility` | ENUM('private','creator_only','shared') | DEFAULT 'private' | Sichtbarkeit |
| `consent_given` | BOOLEAN | DEFAULT NULL | Zustimmung der betroffenen Person |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Erfassungszeitpunkt |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Letzte Änderung |
| `deleted_at` | TIMESTAMP | NULL | Soft Delete |

**Indizes:**
- `INDEX idx_observation_session (session_id)`
- `INDEX idx_observation_observer (observed_by)`
- `INDEX idx_observation_type (observation_type)`
- `INDEX idx_observation_date (observed_at)`

---

#### `impact`

Wirkungen und Veränderungen.

| Spalte | Typ | Constraint | Beschreibung |
|--------|-----|-----------|-------------|
| `impact_id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Interne ID |
| `session_id` | BIGINT | FOREIGN KEY (session.session_id), NOT NULL | Zugeordnete Session |
| `impact_dimension` | ENUM('mood','energy','focus','social_connection','self_efficacy','learning','frustration','relaxation','motivation','creativity','physical_sensation','other') | NOT NULL, INDEXED | Wirkungsbereich |
| `value` | VARCHAR(100) | | Wert (kann numerisch oder kategorisch sein) |
| `value_numeric` | INT | NULL | Falls numerisch: Wert |
| `direction` | ENUM('positive','negative','neutral','mixed') | NOT NULL | Richtung |
| `intensity` | INT | CHECK 1-10, DEFAULT 5 | Intensität |
| `source` | ENUM('observed','self_reported','ai_derived','expert_confirmed') | NOT NULL | Herkunft |
| `reported_by` | BIGINT | FOREIGN KEY (user.user_id), NULL | Wer hat es berichtet? |
| `duration_minutes` | INT | NULL | Wie lange hielt die Wirkung an? |
| `context_before` | TEXT | NULL | Zustand vor |
| `context_after` | TEXT | NULL | Zustand nach |
| `confidence` | INT | CHECK 0-100, DEFAULT 75 | Sicherheit |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Erfassungszeitpunkt |
| `created_by` | BIGINT | FOREIGN KEY (user.user_id) | Ersteller |
| `deleted_at` | TIMESTAMP | NULL | Soft Delete |

**Indizes:**
- `INDEX idx_impact_session (session_id)`
- `INDEX idx_impact_dimension (impact_dimension)`
- `INDEX idx_impact_source (source)`

---

#### `recommendation`

Intelligente Aktivitäts-Empfehlungen basierend auf Matching.

| Spalte | Typ | Constraint | Beschreibung |
|--------|-----|-----------|-------------|
| `recommendation_id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Interne numerische ID |
| `public_id` | VARCHAR(36) | UNIQUE, NOT NULL | UUID |
| `user_id` | BIGINT | FOREIGN KEY (user.user_id), NOT NULL, INDEXED | Für wen? |
| `situation_id` | BIGINT | FOREIGN KEY (situation.situation_id), NULL | In welcher Situation? |
| `activity_id` | BIGINT | FOREIGN KEY (activity.activity_id), NOT NULL | Empfohlene Aktivität |
| `ranking` | INT | CHECK 1-5, NOT NULL | Ranking (1=best, 5=alternative) |
| `suitability_score` | INT | CHECK 0-100 | Eignungswert |
| `rationale` | TEXT | NOT NULL | Begründung für Mensch lesbar |
| `considered_factors` | JSON | NOT NULL | Berücksichtigte Faktoren |
| `alternative_activities` | JSON | | Alternativen |
| `risks_and_mitigations` | JSON | | Mögliche Risiken und Lösungen |
| `required_adaptations` | JSON | | Notwendige Anpassungen |
| `uncertainty_level` | INT | CHECK 0-100, DEFAULT 25 | Unsicherheit (0=sicher, 100=unsicher) |
| `model_version` | VARCHAR(50) | | Algorithmus-Version |
| `accepted` | BOOLEAN | NULL | Akzeptiert? (null=noch nicht entschieden) |
| `actually_chosen` | BIGINT | FOREIGN KEY (activity.activity_id), NULL | Tatsächlich gewählte Aktivität |
| `observed_impact_id` | BIGINT | FOREIGN KEY (impact.impact_id), NULL | Tatsächlich beobachtete Wirkung |
| `feedback` | TEXT | NULL | Feedback des Nutzers |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Erstellungszeitpunkt |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Letzte Änderung |
| `deleted_at` | TIMESTAMP | NULL | Soft Delete |

**Indizes:**
- `INDEX idx_recommendation_user (user_id, created_at DESC)`
- `INDEX idx_recommendation_activity (activity_id)`
- `INDEX idx_recommendation_accepted (accepted)`
- `INDEX idx_recommendation_score (suitability_score DESC)`

---

### Referenztabellen

#### `category`

Hierarchische Kategorisierung.

| Spalte | Typ | Constraint | Beschreibung |
|--------|-----|-----------|-------------|
| `category_id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Interne ID |
| `name` | VARCHAR(255) | NOT NULL, UNIQUE | Kategoriename |
| `slug` | VARCHAR(255) | UNIQUE, NOT NULL | URL-freundlich |
| `description` | TEXT | | Beschreibung |
| `icon` | VARCHAR(50) | | Icon-Referenz |
| `parent_category_id` | BIGINT | FOREIGN KEY (category.category_id), NULL | Obergeordnete Kategorie |
| `order` | INT | DEFAULT 100 | Sortierreihenfolge |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Erstellungszeitpunkt |

**Beispieldaten:**
```sql
INSERT INTO category (name, slug, description, icon, order) VALUES
('Board Games', 'board-games', 'Traditional and modern board games', 'dice', 10),
('Strategy Games', 'strategy-games', 'Games requiring strategic thinking', 'chess', 20),
('Cooperative Games', 'cooperative-games', 'Games where players work together', 'users', 30),
('Party Games', 'party-games', 'Games for groups and social occasions', 'party-popper', 40);
```

---

#### `source`

Quellenverzeichnis und Dokumentenverwaltung.

| Spalte | Typ | Constraint | Beschreibung |
|--------|-----|-----------|-------------|
| `source_id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Interne ID |
| `public_id` | VARCHAR(36) | UNIQUE, NOT NULL | UUID |
| `source_type` | ENUM('official_rules','publisher_website','faq','errata','video','scientific_paper','user_input','ai_analysis','expert_analysis') | NOT NULL, INDEXED | Quellentyp |
| `title` | VARCHAR(255) | NOT NULL | Quellenüberschrift |
| `url` | VARCHAR(2048) | NULL | URL (falls vorhanden) |
| `publisher_or_author` | VARCHAR(255) | | Urheber |
| `language` | VARCHAR(10) | DEFAULT 'de' | Sprache |
| `publication_date` | DATE | NULL | Veröffentlichungsdatum |
| `retrieved_date` | DATE | NULL | Abrufdatum |
| `license_notice` | TEXT | NULL | Lizenz |
| `copyright_notice` | TEXT | NULL | Urheberrechtsvermerk |
| `trust_level` | INT | CHECK 0-100, DEFAULT 70 | Vertrauenswert |
| `verification_status` | ENUM('unverified','pending','verified','expert_approved') | DEFAULT 'unverified' | Prüfstatus |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Erfassungszeitpunkt |
| `created_by` | BIGINT | FOREIGN KEY (user.user_id), NULL | Erfasst von |
| `deleted_at` | TIMESTAMP | NULL | Soft Delete |

**Indizes:**
- `INDEX idx_source_type (source_type)`
- `INDEX idx_source_verification (verification_status)`

---

## SQL-Skripte

### Datenbankinitialisierung

Siehe separates SQL-Skript **`neuroplay_schema.sql`** (wird als nächste Datei erstellt).

---

## Views und Abfragen

### View: `v_activity_overview`

Zeigt Aktivität mit aggregierten Daten.

```sql
CREATE VIEW v_activity_overview AS
SELECT 
  a.activity_id,
  a.public_id,
  a.name,
  a.activity_type,
  a.status,
  COUNT(DISTINCT ac.category_id) as category_count,
  COUNT(DISTINCT s.session_id) as total_sessions,
  ROUND(AVG(CASE WHEN i.direction = 'positive' THEN 1 ELSE 0 END) * 100, 2) as positive_impact_percentage,
  MAX(s.started_at) as last_used_at,
  a.created_at
FROM activity a
LEFT JOIN activity_category ac ON a.activity_id = ac.activity_id AND ac.deleted_at IS NULL
LEFT JOIN session s ON a.activity_id = s.activity_id AND s.session_status = 'completed'
LEFT JOIN impact i ON s.session_id = i.session_id AND i.deleted_at IS NULL
WHERE a.deleted_at IS NULL
GROUP BY a.activity_id;
```

---

### View: `v_user_activity_history`

Zeigt Aktivitätsverlauf eines Nutzers mit Wirkungen.

```sql
CREATE VIEW v_user_activity_history AS
SELECT 
  s.user_id,
  a.activity_id,
  a.name as activity_name,
  s.session_id,
  s.started_at,
  s.duration_minutes,
  GROUP_CONCAT(DISTINCT CONCAT(i.impact_dimension, ':', i.direction) ORDER BY i.impact_dimension SEPARATOR ', ') as impacts,
  COUNT(DISTINCT o.observation_id) as observation_count,
  s.created_at
FROM session s
JOIN activity a ON s.activity_id = a.activity_id AND a.deleted_at IS NULL
LEFT JOIN impact i ON s.session_id = i.session_id AND i.deleted_at IS NULL
LEFT JOIN observation o ON s.session_id = o.session_id AND o.deleted_at IS NULL
WHERE s.session_status = 'completed' AND s.deleted_at IS NULL
GROUP BY s.user_id, s.session_id
ORDER BY s.user_id, s.started_at DESC;
```

---

### View: `v_recommendation_accuracy`

Vergleicht empfohlene mit tatsächlich gewählten Aktivitäten und deren Wirkung.

```sql
CREATE VIEW v_recommendation_accuracy AS
SELECT 
  r.recommendation_id,
  r.user_id,
  a.name as recommended_activity,
  r.suitability_score,
  r.accepted,
  CASE WHEN r.actually_chosen = r.activity_id THEN 'followed' ELSE 'ignored' END as recommendation_followed,
  CASE WHEN r.observed_impact_id IS NOT NULL THEN 'has_feedback' ELSE 'no_feedback' END as feedback_status,
  i.impact_dimension,
  i.direction,
  r.created_at,
  DATEDIFF(i.created_at, r.created_at) as days_to_feedback
FROM recommendation r
JOIN activity a ON r.activity_id = a.activity_id AND a.deleted_at IS NULL
LEFT JOIN impact i ON r.observed_impact_id = i.impact_id AND i.deleted_at IS NULL
WHERE r.deleted_at IS NULL
ORDER BY r.created_at DESC;
```

---

### View: `v_activity_attributes_current`

Zeigt aktuelle Attribute einer Aktivität mit Herkunftsinfo.

```sql
CREATE VIEW v_activity_attributes_current AS
SELECT 
  a.activity_id,
  a.name as activity_name,
  ad.attribute_group,
  ad.name as attribute_name,
  dna.value,
  dna.confidence,
  dna.source_type,
  dna.created_at
FROM activity a
JOIN activity_dna dna ON a.activity_id = dna.activity_id AND dna.deleted_at IS NULL
JOIN attribute_definition ad ON dna.attribute_definition_id = ad.attribute_definition_id AND ad.is_deprecated = FALSE
WHERE a.deleted_at IS NULL
ORDER BY a.activity_id, ad.attribute_group, ad.name;
```

---

## API- und Service-Struktur

### Service Layer Architecture

```
┌─────────────────────────────────────────┐
│       HTTP / REST API Layer             │
│  (Controller / Route Handler)           │
├─────────────────────────────────────────┤
│        Service Layer                    │
│ ├─ ActivityService                      │
│ ├─ ObservationService                   │
│ ├─ RecommendationService                │
│ ├─ UserService                          │
│ ├─ SessionService                       │
│ └─ AnalyticsService                     │
├─────────────────────────────────────────┤
│     Repository / Data Access Layer      │
│ ├─ ActivityRepository                   │
│ ├─ SessionRepository                    │
│ ├─ ObservationRepository                │
│ ├─ ImpactRepository                     │
│ └─ SourceRepository                     │
├─────────────────────────────────────────┤
│    Mapper / Transformer Layer           │
│ ├─ ActivityMapper                       │
│ ├─ SessionMapper                        │
│ └─ RecommendationMapper                 │
├─────────────────────────────────────────┤
│        Database Layer (SQLite/PG)       │
└─────────────────────────────────────────┘
```

### Hauptservices

#### ActivityService

**Verantwortlichkeiten:**
- Aktivitäten erstellen, lesen, aktualisieren, löschen
- Attribute verwalten
- Kategorien und Tags zuordnen
- Regelwerk speichern und abrufen
- Validierung und Qualitätskontrolle

**Wichtige Methoden:**
```javascript
class ActivityService {
  // CRUD
  async getActivity(activityId);
  async listActivities(filters, pagination);
  async createActivity(data);
  async updateActivity(activityId, data);
  async deleteActivity(activityId);  // Soft Delete
  
  // Attribute / DNA
  async setActivityAttribute(activityId, attributeId, value, source);
  async getActivityDNA(activityId);
  async bulkImportAttributes(activityId, data);
  
  // Kategorien
  async assignCategory(activityId, categoryId);
  async removeCategory(activityId, categoryId);
  
  // Regeln
  async addRule(activityId, ruleData);
  async updateRule(ruleId, data);
  async listRules(activityId, filters);
  
  // Validierung
  async validateActivity(activity);
  async calculateQualityScore(activityId);
}
```

---

#### SessionService

**Verantwortlichkeiten:**
- Aktivitätssitzungen dokumentieren
- Beobachtungen erfassen
- Wirkungen festhalten
- Reflexionen speichern
- Datenschutz und Sichtbarkeit handhaben

**Wichtige Methoden:**
```javascript
class SessionService {
  // Session CRUD
  async createSession(userId, activityId, situationData);
  async getSession(sessionId);
  async completeSession(sessionId, durationMinutes, notes);
  
  // Observations
  async addObservation(sessionId, observationType, content);
  async listObservations(sessionId);
  
  // Impact
  async recordImpact(sessionId, dimension, value, source);
  async getSessionImpacts(sessionId);
  
  // Reflection
  async saveReflection(sessionId, userId, reflectionData);
  async getReflection(sessionId);
  
  // Privacy
  async updateObservationVisibility(observationId, visibility);
}
```

---

#### RecommendationService

**Verantwortlichkeiten:**
- Empfehlungen basierend auf Matching generieren
- Nachvollziehbarkeit durch Faktor-Dokumentation
- Feedback und Akzeptanz tracken
- Modellversion verwalten

**Wichtige Methoden:**
```javascript
class RecommendationService {
  // Generation
  async generateRecommendations(userId, situationId, count = 5);
  async getSingleRecommendation(userId, activityId, situationId);
  
  // Matching Engine
  async matchActivityToNeed(activity, needs, preferences);
  async calculateSuitability(activity, situation, userProfile);
  
  // Feedback
  async recordRecommendationAcceptance(recommendationId, accepted);
  async recordActivityChoice(recommendationId, chosenActivityId);
  async recordFeedback(recommendationId, feedbackText);
  
  // Analytics
  async getRecommendationAccuracy(userId);
  async getTrendingRecommendations();
  
  // Model Management
  async updateModelVersion(version);
  async logRecommendationFactors(recommendationId, factors);
}
```

---

#### ObservationService

**Verantwortlichkeiten:**
- Neutrale Beobachtungserfassung
- Trennung von Fakten und Interpretation
- Konsentmanagement (DSGVO)
- Sichtbarkeitskontrolle

**Wichtige Methoden:**
```javascript
class ObservationService {
  // Erfassung
  async recordObservation(sessionId, type, content, confidence);
  async getObservations(sessionId, filters);
  
  // Strukturierung
  async parseUnstructuredObservation(text);
  async extractStructuredData(observation);
  
  // Datenschutz
  async requestConsentForObservation(observationId, userId);
  async setVisibility(observationId, visibility);
  async anonymizeObservation(observationId);
  
  // Analyse
  async getObservationTrends(userId, timespan);
  async correlateObservations(dimension);
}
```

---

#### AnalyticsService

**Verantwortlichkeiten:**
- Aggregieren von Beobachtungen
- Trendanalyse
- Wirkungsauswertung
- Empfehlungsgenauigkeit

**Wichtige Methoden:**
```javascript
class AnalyticsService {
  // User Analytics
  async getUserActivityStats(userId, timespan);
  async getMostEffectiveActivities(userId);
  async getImpactTrends(userId, dimension, timespan);
  
  // System Analytics
  async getGlobalActivityPopularity();
  async getActivityEffectivenessRanking();
  async getRecommendationAccuracyReport();
  
  // Insights
  async identifyIdealActivityForNeeds(needs);
  async detectUnexploredCategories(userId);
  async suggestNewActivities(userId);
}
```

---

### REST API Endpoints (Exemplarisch)

```
GET    /api/v1/activities                    # Liste Aktivitäten
POST   /api/v1/activities                    # Erstelle Aktivität
GET    /api/v1/activities/:id                # Hole Aktivität
PATCH  /api/v1/activities/:id                # Aktualisiere Aktivität
DELETE /api/v1/activities/:id                # Lösche Aktivität

GET    /api/v1/activities/:id/attributes     # Hole Attribute
POST   /api/v1/activities/:id/attributes     # Setze Attribute
POST   /api/v1/activities/:id/import         # Bulk-Import

GET    /api/v1/activities/:id/rules          # Hole Regeln
POST   /api/v1/activities/:id/rules          # Erstelle Regel
PATCH  /api/v1/activities/:id/rules/:ruleId  # Aktualisiere Regel

GET    /api/v1/sessions                      # Liste Sessions
POST   /api/v1/sessions                      # Erstelle Session
GET    /api/v1/sessions/:id                  # Hole Session
PATCH  /api/v1/sessions/:id                  # Aktualisiere Session

POST   /api/v1/sessions/:id/observations     # Beobachtung erfassen
GET    /api/v1/sessions/:id/observations     # Hole Beobachtungen

POST   /api/v1/sessions/:id/impacts          # Wirkung festhalten
GET    /api/v1/sessions/:id/impacts          # Hole Wirkungen

POST   /api/v1/recommendations               # Empfehlungen generieren
GET    /api/v1/recommendations/:id           # Hole Empfehlung
PATCH  /api/v1/recommendations/:id/feedback  # Feedback geben

GET    /api/v1/users/:id/activity-history    # Aktivitätsverlauf
GET    /api/v1/users/:id/recommendations     # Nutzer-Empfehlungen
GET    /api/v1/users/:id/analytics           # Analytics
```

---

## Rollen und Berechtigungen

### Rollenmodell

| Rolle | Beschreibung | Berechtigungen |
|-------|-------------|---|
| **Guest** | Unregistrierter Besucher | Lesen von öffentlichen Aktivitäten und Kategorien |
| **User** | Registrierter Nutzer | Eigene Sessions erstellen, Beobachtungen und Reflexionen speichern, Empfehlungen erhalten, Profil verwalten |
| **Moderator** | Inhaltsverantwortlicher | Activities editieren, Regeln pflegen, Qualitätskontrolle, Community Beobachtungen freigeben |
| **Admin** | Systemadministrator | Alle Operationen, Nutzerverwaltung, Systemkonfiguration, Datenschutz |
| **DataSteward** | Datenverantwortlicher | Quellenverzeichnis verwalten, Datenqualität, Versionierung, Migrationen |

### Granulare Berechtigungen

**Ressourcen-basiert:**
- `activity:read`
- `activity:create`
- `activity:update`
- `activity:delete`
- `activity:publish`
- `observation:create:own` (eigene Beobachtungen)
- `observation:create:others` (Beobachtungen für andere)
- `observation:read:own`
- `observation:read:shared`
- `observation:delete:own`
- `session:create`
- `session:read:own`
- `session:read:others` (wenn shared)
- `session:update:own`
- `recommendation:read:own`
- `recommendation:feedback`
- `profile:read:own`
- `profile:update:own`
- `profile:delete:own`
- `source:manage` (DataSteward)
- `user:manage` (Admin)

---

## Versionierung und Migration

### Versionierungsstrategie

Jede Änderung an Aktivitäts-Inhalten wird versioniert.

**Versionierte Entitäten:**
- `activity` (version column)
- `rule` (version column)
- `attribute_definition` (version column)
- `recommendation` (model_version)

**Migrations-Tabelle:**
```sql
CREATE TABLE schema_migration (
  migration_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  version VARCHAR(50) NOT NULL,
  description TEXT,
  sql_script LONGTEXT,
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  applied_by VARCHAR(255),
  status ENUM('pending', 'applied', 'failed', 'rolled_back'),
  error_message TEXT NULL
);
```

---

### Migrationsbeispiel

```sql
-- Migration: 001_initial_schema.sql
-- Applied: 2025-01-15
-- Description: Initiales NeuroPlay-Schema

BEGIN;

CREATE TABLE activity (
  activity_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  -- ... columns as defined above
);

CREATE TABLE activity_dna (
  activity_dna_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  -- ... columns as defined above
);

-- ... weitere Tabellen ...

INSERT INTO schema_migration (version, description, status, applied_by)
VALUES ('001', 'Initial schema creation', 'applied', 'system');

COMMIT;
```

---

### Daten-Migrationsbeispiel

**Szenario:** Feld-Umbenennung von `duration_minutes` zu `typical_duration_minutes` mit Daten-Migration.

```sql
-- Step 1: Neues Feld hinzufügen
ALTER TABLE activity ADD COLUMN typical_duration_minutes INT DEFAULT NULL;

-- Step 2: Daten kopieren
UPDATE activity SET typical_duration_minutes = duration_minutes WHERE deleted_at IS NULL;

-- Step 3: Validierung
SELECT COUNT(*) as mismatches FROM activity WHERE duration_minutes IS NOT NULL AND typical_duration_minutes IS NULL AND deleted_at IS NULL;

-- Step 4: Altes Feld markieren als deprecated (nicht löschen)
ALTER TABLE activity ADD COLUMN _deprecated_duration_minutes INT AFTER typical_duration_minutes;
UPDATE activity SET _deprecated_duration_minutes = duration_minutes;
ALTER TABLE activity DROP COLUMN duration_minutes;

-- Step 5: Migration loggen
INSERT INTO schema_migration (version, description, status)
VALUES ('002', 'Rename duration_minutes to typical_duration_minutes with data migration', 'applied');
```

---

## Datenschutz und Löschkonzepte

### Soft Delete Strategie

Alle Entitäten, die historische Nachvollziehbarkeit benötigen, verwenden Soft Deletes:
- `activity.deleted_at`, `deleted_by`
- `user.deleted_at`
- `observation.deleted_at`
- `session.deleted_at` (nur bei expliziter Anfrage)
- `human_profile.deleted_at`

**Soft Deletes sind transparent in allen Queries:**
```javascript
// In alle Abfragen WHERE deleted_at IS NULL einbauen
const activities = await db.query(
  'SELECT * FROM activity WHERE status = ? AND deleted_at IS NULL',
  ['published']
);
```

---

### DSGVO-konforme Datenlöschung

**Right to be Forgotten:**

```sql
-- Löschprozess für einen Benutzer
START TRANSACTION;

-- 1. Markiere User als gelöscht (Soft Delete)
UPDATE user SET deleted_at = NOW(), status = 'deleted' WHERE user_id = ?;

-- 2. Anonymisiere Beobachtungen
UPDATE observation SET 
  observed_by = NULL,
  content = '[ANONYMIZED]',
  structured_data = JSON_OBJECT('anonymized', true),
  updated_at = NOW()
WHERE observed_by = ? AND deleted_at IS NULL;

-- 3. Anonymisiere Sessions (später löschen, aber erst nach Aufbewahrungsfrist)
UPDATE session SET 
  user_id = NULL,  -- Brauchen wir nullable, oder separater Anonym-User?
  updated_at = NOW()
WHERE user_id = ? AND started_at < DATE_SUB(NOW(), INTERVAL 2 YEAR);

-- 4. Lösche Empfehlungen (keine historischen Anforderungen)
DELETE FROM recommendation WHERE user_id = ?;

-- 5. Lösche Bedürfnisse
DELETE FROM need WHERE user_id = ?;

-- 6. Lösche Profil-Daten
UPDATE human_profile SET 
  deleted_at = NOW(),
  profile_data = JSON_OBJECT('deleted', true)
WHERE user_id = ?;

COMMIT;
```

---

### Datensicherung und Aufbewahrung

**Aufbewahrungsfristen:**
- Aktivitäts-Metadaten: unbegrenzt
- Session-Daten: mind. 7 Jahre (Auditability)
- Beobachtungen mit Bezug zu Person: max. 3 Jahre (DSGVO)
- Empfehlungen: mind. 1 Jahr (für Modellverbesserung)
- Quellen und Dokumentation: unbegrenzt
- Gelöschte Daten: mind. 30 Tage Recovery-Fenster

---

## Testdaten und Importstrategie

### Testdaten-SQL

Siehe separates SQL-Skript **`neuroplay_testdata.sql`** (wird als nächste Datei erstellt).

---

### Importstrategie

#### Datenquellen

1. **Regelwerk:** PDF-Handbücher → Textextraktion → strukturierte Regeln
2. **Metadaten:** BGG (BoardGameGeek) API → Aktivitätszusammenfassung
3. **Bilder:** Offizielle Grafiken → `/storage/images/`
4. **Community-Input:** Formulareinreichungen → Warteschlange
5. **KI-Analyse:** Generierte Attribute → mit niedrig confidence speichern

#### Import-Pipeline

```
Input (PDF/API/Form)
  ↓
Validation
  ↓
Parsing / Extraction
  ↓
Mapping to Schema
  ↓
Conflict Detection
  ↓
Insert / Update (mit UPSERT)
  ↓
Logging
  ↓
Output (Success / Error Report)
```

#### UPSERT-Logik

```sql
-- Beispiel: Aktivität mit externem Identifier (z.B. BGG ID)
INSERT INTO activity 
(name, slug, activity_type, status, external_id, created_at, created_by)
VALUES (?, ?, ?, 'draft', ?, NOW(), ?)
ON DUPLICATE KEY UPDATE
  updated_at = NOW(),
  updated_by = VALUES(created_by),
  status = 'draft'  -- Nicht auto-publish
;
```

---

## Übergabedokumentation

### Vollständige technische Dokumentation

Diese Datei ist Teil einer 3-teiligen Dokumentation:

1. **Datenbankarchitektur** (diese Datei) → Konzeptuell, logisches und physisches Schema
2. **SQL-Schema-Skripte** (separate Datei) → Produktionsreife DDL
3. **Testdaten** (separate Datei) → Beispieldaten, Integrationsszenarien
4. **API-Dokumentation** (separate Datei) → REST-Endpoints, Request/Response, Error Codes
5. **Datenschutz-Compliance** (separate Datei) → DSGVO, Audit Logs, Consent Management

### Schnellstart

1. Datenbank erstellen: `neuroplay_schema.sql` ausführen
2. Testdaten laden: `neuroplay_testdata.sql` ausführen
3. Services initialisieren (siehe API-Dokumentation)
4. First Admin User erstellen über CLI oder Seeding-Script
5. Test durchführen: curl -basierte Tests

---

**Ende der Dokumentation Version 1.0**
