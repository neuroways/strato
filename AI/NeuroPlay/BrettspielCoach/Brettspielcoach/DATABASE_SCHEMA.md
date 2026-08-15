# NeuroPlay Wissensdatenbank – Schema & Architektur

## Überblick

Eine universelle, domänenunabhängige Wissensdatenbank für alle NeuroPlay-Module (Brettspiele, Musik, Sport, Kochen, etc.). Keine Brettspiel-Spezifika – nur generalisierte Konzepte.

---

## Datenbankdiagramm (ER-Modell)

```
┌─────────────────────────────────────────────────────────┐
│                    KERN-TABELLEN                         │
├─────────────────────────────────────────────────────────┤

┌──────────────────────┐
│   activities         │  Alle Lernaktivitäten
│  (Brettspiele, Musik │  
│   Sport, Kochen)     │
└──────────────────────┘
         │
         ├──→ ┌──────────────────┐
         │    │ sources          │  PDFs, Bücher, Videos
         │    │ (Datenquellen)   │
         │    └──────────────────┘
         │
         ├──→ ┌──────────────────┐
         │    │ knowledge_       │  Spielfigur, Note,
         │    │ entities         │  Bewegung, Zutat
         │    └──────────────────┘
         │         │
         │         └──→ ┌──────────────────┐
         │              │ entity_          │  Eigenschaften
         │              │ attributes       │  (Name-Wert-Paare)
         │              └──────────────────┘
         │
         ├──→ ┌──────────────────┐
         │    │ relationships    │  Spieler→Figur
         │    │                  │  Note→Akkord
         │    └──────────────────┘
         │
         ├──→ ┌──────────────────┐
         │    │ rules            │  Regeln, Constraints
         │    │                  │  Sonderregeln
         │    └──────────────────┘
         │
         ├──→ ┌──────────────────┐
         │    │ phases           │  Rundenstruktur
         │    │                  │  Lernschritte
         │    └──────────────────┘
         │
         ├──→ ┌──────────────────┐
         │    │ actions          │  Mögliche Aktionen
         │    │                  │  Mit Kosten & Effekten
         │    └──────────────────┘
         │
         ├──→ ┌──────────────────┐
         │    │ resources        │  Punkte, Marker,
         │    │                  │  Zeit, Energie
         │    └──────────────────┘
         │
         ├──→ ┌──────────────────┐
         │    │ learning_paths   │  Großes Bild,
         │    │                  │  Kernschleife,
         │    └──────────────────┘  Lernschritte
         │
         ├──→ ┌──────────────────┐
         │    │ strategies       │  Tipps zum Gewinnen
         │    │                  │  Kombinationen
         │    └──────────────────┘
         │
         ├──→ ┌──────────────────┐
         │    │ coach_outputs    │  Q&A, Tipps,
         │    │                  │  Hinweise
         │    └──────────────────┘
         │
         └──→ ┌──────────────────┐
              │ user_progress    │  Fortschritt pro
              │                  │  Benutzer & Aktivität
              └──────────────────┘
```

---

## Tabellenübersicht

### 1. `activities` – Zentrale Lernaktivitäten

| Spalte | Typ | Beschreibung |
|--------|-----|-------------|
| `id` | UUID | Primärschlüssel |
| `name` | TEXT | "Die Insel der Pfade", "Anfänger-Gitarre" |
| `activity_type` | ENUM | "boardgame", "music", "sport", "cooking", "workshop", "book" |
| `description` | TEXT | Kurzbeschreibung |
| `goal` | TEXT | Ziel oder großes Bild |
| `complexity_level` | ENUM | "beginner", "intermediate", "advanced", "expert" |
| `min_participants` | INT | Minimum (z.B. 1 für Solo) |
| `max_participants` | INT | Maximum (NULL = unbegrenzt) |
| `duration_minutes` | INT | Typische Dauer |
| `target_age_min` | INT | Empfohlenes Alter |
| `target_age_max` | INT | (NULL = keine Obergrenze) |
| `language` | VARCHAR(5) | "de", "en", "fr" |
| `is_published` | BOOLEAN | Öffentlich sichtbar? |
| `created_at` | TIMESTAMP | Auto |
| `updated_at` | TIMESTAMP | Auto |

---

### 2. `sources` – Datenquellen

| Spalte | Typ | Beschreibung |
|--------|-----|-------------|
| `id` | UUID | Primärschlüssel |
| `activity_id` | UUID | FK → activities |
| `source_type` | ENUM | "pdf", "book", "video", "website", "manual", "other" |
| `file_name` | VARCHAR(255) | "anleitung.pdf" |
| `file_path` | VARCHAR(500) | Speicherort (nicht öffentlich) |
| `file_size_bytes` | INT | Größe |
| `import_date` | TIMESTAMP | Auto |
| `title_in_source` | TEXT | Titel aus PDF/Buch |
| `publisher` | VARCHAR(255) | "Verlag XYZ" |
| `publication_year` | INT | 2024 |
| `license` | VARCHAR(100) | "CC-BY", "proprietary", etc. |
| `language` | VARCHAR(5) | "de", "en" |
| `extraction_confidence` | FLOAT | 0.0–1.0 (Qualitätsmaß) |
| `notes` | TEXT | Besonderheiten |
| `created_at` | TIMESTAMP | Auto |

---

### 3. `knowledge_entities` – Wissensobjekte

| Spalte | Typ | Beschreibung |
|--------|-----|-------------|
| `id` | UUID | Primärschlüssel |
| `activity_id` | UUID | FK → activities |
| `entity_type` | VARCHAR(50) | "component", "material", "concept", "term" |
| `category` | VARCHAR(100) | "game_piece", "card", "resource", "position", "note", "technique" |
| `name` | VARCHAR(255) | "Spielfigur", "D-Note", "Lunge" |
| `description` | TEXT | Ausführliche Beschreibung |
| `is_concrete` | BOOLEAN | TRUE = greifbar (Karte), FALSE = abstrakt (Punkt) |
| `quantity` | INT | Anzahl im Standard-Setup (NULL = variable) |
| `created_at` | TIMESTAMP | Auto |

---

### 4. `entity_attributes` – Eigenschaften der Wissensobjekte

| Spalte | Typ | Beschreibung |
|--------|-----|-------------|
| `id` | UUID | Primärschlüssel |
| `entity_id` | UUID | FK → knowledge_entities |
| `attribute_name` | VARCHAR(100) | "farbe", "material", "schwierigkeit" |
| `attribute_value` | TEXT | "blau", "holz", "einfach" |
| `data_type` | ENUM | "string", "number", "boolean", "enum" |
| `is_searchable` | BOOLEAN | Soll indexiert werden? |

---

### 5. `relationships` – Beziehungen zwischen Objekten

| Spalte | Typ | Beschreibung |
|--------|-----|-------------|
| `id` | UUID | Primärschlüssel |
| `activity_id` | UUID | FK → activities |
| `entity_from_id` | UUID | FK → knowledge_entities (Quelle) |
| `relation_type` | VARCHAR(50) | "has_part", "affects", "requires", "enables", "conflicts" |
| `entity_to_id` | UUID | FK → knowledge_entities (Ziel) |
| `description` | TEXT | "Spieler besitzt Figur" |
| `bidirectional` | BOOLEAN | TRUE = gegenseitig |

---

### 6. `rules` – Regeln & Constraints

| Spalte | Typ | Beschreibung |
|--------|-----|-------------|
| `id` | UUID | Primärschlüssel |
| `activity_id` | UUID | FK → activities |
| `rule_name` | VARCHAR(255) | "Leuchtturmfeld", "Timeout nach 2h" |
| `rule_text` | TEXT | Vollständiger Regeltext |
| `rule_purpose` | TEXT | Warum gibt es diese Regel? |
| `category` | ENUM | "core", "special", "exception", "advanced" |
| `priority` | INT | 1 (höchste) – 999 (niedrigste) |
| `condition_text` | TEXT | "IF Position = Leuchtturm" |
| `consequence_text` | TEXT | "THEN +5 Points, Draw Card" |
| `applies_to_entity_id` | UUID | FK → knowledge_entities (optional, wenn regel spezifisch) |
| `is_optional` | BOOLEAN | Kann ignoriert werden? |
| `source_id` | UUID | FK → sources (woher kommt diese Regel?) |
| `created_at` | TIMESTAMP | Auto |

---

### 7. `phases` – Phasen / Struktur

| Spalte | Typ | Beschreibung |
|--------|-----|-------------|
| `id` | UUID | Primärschlüssel |
| `activity_id` | UUID | FK → activities |
| `phase_type` | ENUM | "game_round", "learning_step", "training_session", "episode" |
| `phase_name` | VARCHAR(255) | "Phase 1: Bewegung" |
| `phase_number` | INT | Reihenfolge (1, 2, 3, ...) |
| `description` | TEXT | Was passiert? |
| `duration_minutes` | INT | Typische Dauer |
| `is_mandatory` | BOOLEAN | Muss durchgeführt werden? |
| `can_repeat` | BOOLEAN | Kann wiederholt werden? |
| `max_iterations` | INT | Max. Wiederholungen (NULL = unbegrenzt) |
| `created_at` | TIMESTAMP | Auto |

---

### 8. `actions` – Aktionen / Optionen

| Spalte | Typ | Beschreibung |
|--------|-----|-------------|
| `id` | UUID | Primärschlüssel |
| `activity_id` | UUID | FK → activities |
| `action_name` | VARCHAR(255) | "Wissenskarte ziehen" |
| `description` | TEXT | Was passiert genau? |
| `available_in_phase_id` | UUID | FK → phases (optional) |
| `requires_entity_id` | UUID | FK → knowledge_entities (z.B. "braucht Wissenskarten-Stapel") |
| `cost_type` | VARCHAR(50) | "resource", "none", "time", "energy" |
| `cost_amount` | FLOAT | Wie viel? |
| `cost_resource_id` | UUID | FK → resources (welche Ressource?) |
| `effect_type` | ENUM | "gain_resource", "consume_resource", "modify_state", "unlock_rule" |
| `effect_target_id` | UUID | FK → resources oder entities (was wird beeinflusst?) |
| `effect_amount` | FLOAT | Um wie viel? |
| `can_be_refused` | BOOLEAN | Kann man ablehnen? |
| `triggers_rule_id` | UUID | FK → rules (löst eine Regel aus?) |
| `created_at` | TIMESTAMP | Auto |

---

### 9. `resources` – Ressourcen / Währungen

| Spalte | Typ | Beschreibung |
|--------|-----|-------------|
| `id` | UUID | Primärschlüssel |
| `activity_id` | UUID | FK → activities |
| `resource_name` | VARCHAR(100) | "Punkte", "Ressourcenmarker" |
| `resource_type` | ENUM | "point", "currency", "counter", "time", "energy" |
| `description` | TEXT | Wofür sind diese Ressourcen? |
| `is_visible_to_player` | BOOLEAN | Sieht der Spieler es? |
| `starting_amount` | FLOAT | Initialwert |
| `min_amount` | FLOAT | Minimum |
| `max_amount` | FLOAT | Maximum (NULL = unbegrenzt) |
| `can_be_negative` | BOOLEAN | Schulden möglich? |
| `regenerates` | BOOLEAN | Wird automatisch regeneriert? |
| `regeneration_rate` | FLOAT | Wieviel pro Runde? |
| `created_at` | TIMESTAMP | Auto |

---

### 10. `learning_paths` – Lernstrukturen

| Spalte | Typ | Beschreibung |
|--------|-----|-------------|
| `id` | UUID | Primärschlüssel |
| `activity_id` | UUID | FK → activities |
| `path_name` | VARCHAR(255) | "Großes Bild", "Kernschleife", "Strategien" |
| `path_type` | ENUM | "big_picture", "core_loop", "details", "advanced", "reflection" |
| `order` | INT | Reihenfolge (1 = zuerst) |
| `description` | TEXT | Was wird vermittelt? |
| `estimated_duration_minutes` | INT | Zeitbudget |
| `content_text` | TEXT | Der eigentliche Lerntext |
| `includes_example` | BOOLEAN | Gibt es ein Beispiel? |
| `example_text` | TEXT | Das Beispiel |
| `created_at` | TIMESTAMP | Auto |

---

### 11. `strategies` – Strategien & Tipps

| Spalte | Typ | Beschreibung |
|--------|-----|-------------|
| `id` | UUID | Primärschlüssel |
| `activity_id` | UUID | FK → activities |
| `strategy_name` | VARCHAR(255) | "Wissens-Strategie", "Aggressive Offense" |
| `strategy_type` | ENUM | "winning", "defensive", "balanced", "cooperative", "solo" |
| `description` | TEXT | Wie funktioniert diese Strategie? |
| `difficulty_level` | ENUM | "beginner", "intermediate", "advanced" |
| `target_goal` | TEXT | Was ist das Ziel dieser Strategie? |
| `actions_involved` | TEXT | Welche Aktionen? (JSON Array oder komma-separiert) |
| `synergies` | TEXT | Mit welchen anderen Elementen kombinieren? |
| `counters` | TEXT | Wie verteidigt man sich gegen diese Strategie? |
| `common_mistakes` | TEXT | Typische Fehler bei dieser Strategie |
| `example_sequence` | TEXT | Schritt-für-Schritt-Beispiel |
| `win_rate_notes` | TEXT | "Erfolgreich in 60% der Fälle wenn X" |
| `created_at` | TIMESTAMP | Auto |

---

### 12. `coach_outputs` – Coaching-Inhalte

| Spalte | Typ | Beschreibung |
|--------|-----|-------------|
| `id` | UUID | Primärschlüssel |
| `activity_id` | UUID | FK → activities |
| `output_type` | ENUM | "quick_answer", "explanation", "hint", "warning", "encouragement" |
| `trigger_pattern` | TEXT | Regex oder Stichwort für Frage-Matching |
| `question_examples` | TEXT | "Was darf ich? / Welche Optionen?" (JSON oder ; getrennt) |
| `answer_text` | TEXT | Die Coach-Antwort |
| `is_contextual` | BOOLEAN | Hängt von Spielstatus ab? |
| `context_requirements` | TEXT | "phase=action_phase AND player_has_resource" |
| `related_learning_path_id` | UUID | FK → learning_paths |
| `related_rule_ids` | TEXT | IDs von Regeln, die relevant sind (JSON Array) |
| `is_beginner_content` | BOOLEAN | Für Anfänger? |
| `is_advanced_content` | BOOLEAN | Für Fortgeschrittene? |
| `created_at` | TIMESTAMP | Auto |

---

### 13. `user_progress` – Benutzerfortschritt

| Spalte | Typ | Beschreibung |
|--------|-----|-------------|
| `id` | UUID | Primärschlüssel |
| `user_id` | UUID | Benutzer (externes System) |
| `activity_id` | UUID | FK → activities |
| `first_visit` | TIMESTAMP | Erste Interaktion |
| `last_visit` | TIMESTAMP | Letzte Interaktion |
| `learning_paths_completed` | TEXT | IDs abgeschlossener Lernpfade (JSON Array) |
| `screens_visited` | TEXT | Welche Bildschirme? (JSON Array) |
| `sessions_played` | INT | Anzahl Partien |
| `total_playtime_minutes` | INT | Summe Spielzeit |
| `is_completed` | BOOLEAN | Alles gelernt? |
| `user_notes` | TEXT | Benutzer-Notizen |
| `created_at` | TIMESTAMP | Auto |
| `updated_at` | TIMESTAMP | Auto |

---

## SQL CREATE TABLE Statements

```sql
-- 1. Activities
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  activity_type VARCHAR(50) NOT NULL CHECK (activity_type IN ('boardgame', 'music', 'sport', 'cooking', 'workshop', 'book', 'videogame', 'other')),
  description TEXT,
  goal TEXT,
  complexity_level VARCHAR(50) DEFAULT 'intermediate' CHECK (complexity_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  min_participants INT DEFAULT 1,
  max_participants INT,
  duration_minutes INT,
  target_age_min INT DEFAULT 0,
  target_age_max INT,
  language VARCHAR(5) DEFAULT 'de',
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_activities_type ON activities(activity_type);
CREATE INDEX idx_activities_published ON activities(is_published);

-- 2. Sources
CREATE TABLE sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  source_type VARCHAR(50) NOT NULL,
  file_name VARCHAR(255),
  file_path VARCHAR(500),
  file_size_bytes INT,
  import_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  title_in_source TEXT,
  publisher VARCHAR(255),
  publication_year INT,
  license VARCHAR(100),
  language VARCHAR(5),
  extraction_confidence FLOAT CHECK (extraction_confidence >= 0 AND extraction_confidence <= 1),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_sources_activity ON sources(activity_id);

-- 3. Knowledge Entities
CREATE TABLE knowledge_entities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  entity_type VARCHAR(50) NOT NULL,
  category VARCHAR(100),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  is_concrete BOOLEAN DEFAULT TRUE,
  quantity INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_entities_activity ON knowledge_entities(activity_id);
CREATE INDEX idx_entities_name ON knowledge_entities(name);

-- 4. Entity Attributes
CREATE TABLE entity_attributes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id UUID NOT NULL REFERENCES knowledge_entities(id) ON DELETE CASCADE,
  attribute_name VARCHAR(100) NOT NULL,
  attribute_value TEXT NOT NULL,
  data_type VARCHAR(50) DEFAULT 'string',
  is_searchable BOOLEAN DEFAULT FALSE
);
CREATE INDEX idx_attributes_entity ON entity_attributes(entity_id);
CREATE INDEX idx_attributes_name ON entity_attributes(attribute_name);

-- 5. Relationships
CREATE TABLE relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  entity_from_id UUID NOT NULL REFERENCES knowledge_entities(id) ON DELETE CASCADE,
  relation_type VARCHAR(50) NOT NULL,
  entity_to_id UUID NOT NULL REFERENCES knowledge_entities(id) ON DELETE CASCADE,
  description TEXT,
  bidirectional BOOLEAN DEFAULT FALSE
);
CREATE INDEX idx_relationships_from ON relationships(entity_from_id);
CREATE INDEX idx_relationships_to ON relationships(entity_to_id);
CREATE UNIQUE INDEX idx_relationships_unique ON relationships(entity_from_id, relation_type, entity_to_id) 
  WHERE NOT bidirectional;

-- 6. Rules
CREATE TABLE rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  rule_name VARCHAR(255) NOT NULL,
  rule_text TEXT NOT NULL,
  rule_purpose TEXT,
  category VARCHAR(50) DEFAULT 'core',
  priority INT DEFAULT 100,
  condition_text TEXT,
  consequence_text TEXT,
  applies_to_entity_id UUID REFERENCES knowledge_entities(id) ON DELETE SET NULL,
  is_optional BOOLEAN DEFAULT FALSE,
  source_id UUID REFERENCES sources(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_rules_activity ON rules(activity_id);
CREATE INDEX idx_rules_priority ON rules(priority);

-- 7. Phases
CREATE TABLE phases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  phase_type VARCHAR(50) NOT NULL,
  phase_name VARCHAR(255) NOT NULL,
  phase_number INT NOT NULL,
  description TEXT,
  duration_minutes INT,
  is_mandatory BOOLEAN DEFAULT TRUE,
  can_repeat BOOLEAN DEFAULT TRUE,
  max_iterations INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_phases_activity ON phases(activity_id);
CREATE INDEX idx_phases_number ON phases(activity_id, phase_number);

-- 8. Actions
CREATE TABLE actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  action_name VARCHAR(255) NOT NULL,
  description TEXT,
  available_in_phase_id UUID REFERENCES phases(id) ON DELETE SET NULL,
  requires_entity_id UUID REFERENCES knowledge_entities(id) ON DELETE SET NULL,
  cost_type VARCHAR(50) DEFAULT 'none',
  cost_amount FLOAT DEFAULT 0,
  cost_resource_id UUID REFERENCES resources(id) ON DELETE SET NULL,
  effect_type VARCHAR(50),
  effect_target_id UUID,
  effect_amount FLOAT,
  can_be_refused BOOLEAN DEFAULT FALSE,
  triggers_rule_id UUID REFERENCES rules(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_actions_activity ON actions(activity_id);
CREATE INDEX idx_actions_phase ON actions(available_in_phase_id);

-- 9. Resources
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  resource_name VARCHAR(100) NOT NULL,
  resource_type VARCHAR(50) NOT NULL,
  description TEXT,
  is_visible_to_player BOOLEAN DEFAULT TRUE,
  starting_amount FLOAT DEFAULT 0,
  min_amount FLOAT DEFAULT 0,
  max_amount FLOAT,
  can_be_negative BOOLEAN DEFAULT FALSE,
  regenerates BOOLEAN DEFAULT FALSE,
  regeneration_rate FLOAT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_resources_activity ON resources(activity_id);

-- 10. Learning Paths
CREATE TABLE learning_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  path_name VARCHAR(255) NOT NULL,
  path_type VARCHAR(50) NOT NULL,
  order_number INT NOT NULL,
  description TEXT,
  estimated_duration_minutes INT,
  content_text TEXT,
  includes_example BOOLEAN DEFAULT FALSE,
  example_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_learning_paths_activity ON learning_paths(activity_id);
CREATE INDEX idx_learning_paths_order ON learning_paths(activity_id, order_number);

-- 11. Strategies
CREATE TABLE strategies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  strategy_name VARCHAR(255) NOT NULL,
  strategy_type VARCHAR(50) NOT NULL,
  description TEXT,
  difficulty_level VARCHAR(50),
  target_goal TEXT,
  actions_involved TEXT,
  synergies TEXT,
  counters TEXT,
  common_mistakes TEXT,
  example_sequence TEXT,
  win_rate_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_strategies_activity ON strategies(activity_id);

-- 12. Coach Outputs
CREATE TABLE coach_outputs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  output_type VARCHAR(50) NOT NULL,
  trigger_pattern TEXT,
  question_examples TEXT,
  answer_text TEXT NOT NULL,
  is_contextual BOOLEAN DEFAULT FALSE,
  context_requirements TEXT,
  related_learning_path_id UUID REFERENCES learning_paths(id) ON DELETE SET NULL,
  related_rule_ids TEXT,
  is_beginner_content BOOLEAN DEFAULT FALSE,
  is_advanced_content BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_coach_activity ON coach_outputs(activity_id);

-- 13. User Progress
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  first_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  learning_paths_completed TEXT,
  screens_visited TEXT,
  sessions_played INT DEFAULT 0,
  total_playtime_minutes INT DEFAULT 0,
  is_completed BOOLEAN DEFAULT FALSE,
  user_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, activity_id)
);
CREATE INDEX idx_progress_user ON user_progress(user_id);
CREATE INDEX idx_progress_activity ON user_progress(activity_id);
```

---

## Beziehungen und Fremdschlüssel

| Von | Nach | Typ | Beschreibung |
|-----|------|-----|-------------|
| sources | activities | N:1 | Mehrere Quellen pro Aktivität |
| knowledge_entities | activities | N:1 | Mehrere Objekte pro Aktivität |
| entity_attributes | knowledge_entities | N:1 | Mehrere Attribute pro Objekt |
| relationships | activities | N:1 | Beziehungen gehören zu Aktivität |
| relationships | knowledge_entities (2x) | N:1 | Beziehung zwischen Objekten |
| rules | activities | N:1 | Mehrere Regeln pro Aktivität |
| rules | knowledge_entities | N:1 | Regel kann zu Objekt gehören |
| rules | sources | N:1 | Regel kommt aus Quelle |
| phases | activities | N:1 | Mehrere Phasen pro Aktivität |
| actions | activities | N:1 | Mehrere Aktionen pro Aktivität |
| actions | phases | N:1 | Aktion verfügbar in Phase |
| actions | knowledge_entities | N:1 | Aktion braucht Objekt |
| actions | resources | N:1 | Aktion kostet Ressource |
| actions | rules | N:1 | Aktion kann Regel triggern |
| resources | activities | N:1 | Mehrere Ressourcen pro Aktivität |
| learning_paths | activities | N:1 | Mehrere Lernpfade pro Aktivität |
| strategies | activities | N:1 | Mehrere Strategien pro Aktivität |
| coach_outputs | activities | N:1 | Mehrere Coach-Ausgaben pro Aktivität |
| coach_outputs | learning_paths | N:1 | Coach kann auf Lernpfad referenzieren |
| coach_outputs | rules | M:N (Text-Format) | Coach kann Regeln erwähnen |
| user_progress | activities | N:1 | Ein Benutzer pro Aktivität |

---

## Beispiel-Datensätze für "Die Insel der Pfade"

```sql
-- Activity
INSERT INTO activities (id, name, activity_type, description, goal, complexity_level, min_participants, max_participants, duration_minutes, target_age_min, language, is_published)
VALUES (
  'act-001',
  'Die Insel der Pfade',
  'boardgame',
  'Die Spieler erkunden gemeinsam eine Insel, sammeln Wissen und erreichen vor Ablauf der letzten Runde den Leuchtturm.',
  'Erreiche den Leuchtturm und sammle die meisten Wissenspunkte.',
  'intermediate',
  2, 4, 60, 10, 'de', TRUE
);

-- Source (Spielanleitung als PDF)
INSERT INTO sources (id, activity_id, source_type, file_name, title_in_source, publisher, language, extraction_confidence, created_at)
VALUES (
  'src-001',
  'act-001',
  'pdf',
  'insel-der-pfade-anleitung.pdf',
  'Die Insel der Pfade – Spielanleitung',
  'Verlag XYZ',
  'de',
  0.95,
  CURRENT_TIMESTAMP
);

-- Knowledge Entities (Material)
INSERT INTO knowledge_entities (id, activity_id, entity_type, category, name, description, is_concrete, quantity)
VALUES
  ('ent-001', 'act-001', 'component', 'game_piece', 'Spielfigur', 'Eine Figur pro Spieler', TRUE, 4),
  ('ent-002', 'act-001', 'component', 'board', 'Spielplan', 'Die Insel mit verschiedenen Regionen', TRUE, 1),
  ('ent-003', 'act-001', 'component', 'card', 'Wissenskarte', 'Karten mit Kategorien', TRUE, 24),
  ('ent-004', 'act-001', 'component', 'token', 'Ressourcenmarker', 'Marker für Ressourcen', TRUE, 8),
  ('ent-005', 'act-001', 'component', 'counter', 'Rundenzähler', 'Zähler für 6 Runden', TRUE, 1),
  ('ent-006', 'act-001', 'component', 'other', 'Würfel', 'Zwei sechsseitige Würfel', TRUE, 2);

-- Relationships (Beziehungen)
INSERT INTO relationships (id, activity_id, entity_from_id, relation_type, entity_to_id, description, bidirectional)
VALUES
  ('rel-001', 'act-001', 'ent-001', 'placed_on', 'ent-002', 'Spielfigur steht auf Spielplan', FALSE),
  ('rel-002', 'act-001', 'ent-003', 'belongs_to', 'ent-002', 'Wissenskarten gehören zum Spiel', FALSE),
  ('rel-003', 'act-001', 'ent-004', 'belong_to', 'ent-002', 'Ressourcenmarker gehören zum Spiel', FALSE);

-- Resources
INSERT INTO resources (id, activity_id, resource_name, resource_type, description, is_visible_to_player, starting_amount, min_amount, max_amount)
VALUES
  ('res-001', 'act-001', 'Wissenspunkte', 'point', 'Punkte für gesammelte Karten', TRUE, 0, 0, NULL),
  ('res-002', 'act-001', 'Ressourcenmarker', 'currency', 'Marker für Spezialaktionen', TRUE, 2, 0, 8);

-- Phases
INSERT INTO phases (id, activity_id, phase_type, phase_name, phase_number, description, duration_minutes, is_mandatory, can_repeat, max_iterations)
VALUES
  ('ph-001', 'act-001', 'game_round', 'Phase 1: Bewegung', 1, 'Würfle und bewege deine Figur', 5, TRUE, TRUE, NULL),
  ('ph-002', 'act-001', 'game_round', 'Phase 2: Aktion', 2, 'Wähle eine Aktion', 10, TRUE, TRUE, NULL),
  ('ph-003', 'act-001', 'game_round', 'Phase 3: Beendigung', 3, 'Nächster Spieler', 2, TRUE, TRUE, NULL);

-- Actions
INSERT INTO actions (id, activity_id, action_name, description, available_in_phase_id, cost_type, effect_type, effect_amount)
VALUES
  ('act-001', 'act-001', 'Wissenskarte ziehen', 'Ziehe oberste Karte, erhalte Punkte', 'ph-002', 'none', 'gain_resource', 1),
  ('act-002', 'act-001', 'Ressource nutzen', 'Gib Marker aus für +2 Bewegung oder +1 Karte', 'ph-002', 'resource', 'consume_resource', 1),
  ('act-003', 'act-001', 'Andere Spieler unterstützen', 'Hilf mit Bewegung oder Marker', 'ph-002', 'none', 'gain_resource', 1);

-- Rules
INSERT INTO rules (id, activity_id, rule_name, rule_text, rule_purpose, category, priority, condition_text, consequence_text, applies_to_entity_id)
VALUES
  ('rule-001', 'act-001', 'Leuchtturmfeld', 'Wer das Leuchtturmfeld erreicht, erhält 5 Bonuspunkte und darf eine Wissenskarte extra ziehen.', 'Besonderer Ort mit Bonus', 'special', 1, 'Position = Leuchtturm', '+5 Punkte, +1 Karte', 'ent-002'),
  ('rule-002', 'act-001', 'Inselfähre', 'Auf diesem Feld kannst du direkt zu jedem anderen Inselfeld springen. Danach darfst du keine weitere Aktion durchführen.', 'Schnelle Reise, aber Einschränkung', 'special', 2, 'Position = Inselfähre', 'Teleportation, aber keine weitere Aktion', 'ent-002'),
  ('rule-003', 'act-001', 'Wissenssammel-Bonus', 'Wenn du 5 Wissenskarten der gleichen Kategorie hast, erhältst du 10 Bonuspunkte und musst 3 Karten zurückgeben.', 'Strategischer Anreiz', 'special', 3, 'Karten_gleicher_Kategorie >= 5', '+10 Punkte, -3 Karten', 'ent-003');

-- Learning Paths
INSERT INTO learning_paths (id, activity_id, path_name, path_type, order_number, description, estimated_duration_minutes, content_text, includes_example)
VALUES
  ('lp-001', 'act-001', 'Großes Bild', 'big_picture', 1, 'Worum geht es?', 5, 'Erkunde eine Insel, sammle Wissenspunkte, erreiche den Leuchtturm bevor es zu spät ist.', FALSE),
  ('lp-002', 'act-001', 'Kernschleife', 'core_loop', 2, 'Die wichtigste Schleife', 10, 'Würfel → Bewege → Wähle Aktion → Erhalte Punkte/Ressource → Nächster Spieler', TRUE),
  ('lp-003', 'act-001', 'Strategien', 'advanced', 3, 'Tipps zum Gewinnen', 15, 'Es gibt mehrere Strategien. Welche passt zu dir?', TRUE);

-- Strategies
INSERT INTO strategies (id, activity_id, strategy_name, strategy_type, description, difficulty_level, target_goal, actions_involved, synergies, common_mistakes)
VALUES
  ('str-001', 'act-001', 'Wissens-Strategie', 'winning', 'Sammle Karten einer Kategorie um Bonus zu erhalten', 'beginner', 'Maximal Punkte durch Boni', 'Wissenskarte ziehen', 'Mit Ressourcen + Kateg-Bonus = Extra Punkte', 'Zu lange Kartensammlung'),
  ('str-002', 'act-001', 'Schnell-Strategie', 'winning', 'Gehe schnell zum Leuchtturm mit Ressourcen-Bonus', 'intermediate', 'Erste zum Leuchtturm', 'Ressource nutzen, Bewegung', 'Mit Kooperativ-Tipps = Verbündete', 'Zu wenig Punkte');

-- Coach Outputs
INSERT INTO coach_outputs (id, activity_id, output_type, trigger_pattern, question_examples, answer_text, is_beginner_content)
VALUES
  ('co-001', 'act-001', 'quick_answer', 'darf|kann|option', 'Was darf ich? / Welche Optionen?', 'In Phase 2 kannst du: (1) Wissenskarte ziehen (2) Ressourcenmarker nutzen (3) Andere unterstützen', TRUE),
  ('co-002', 'act-001', 'explanation', 'gewin|punkt|sieg', 'Wie gewinne ich? / Was sind Punkte?', 'Du gewinnst mit den meisten Wissenspunkten. Karten geben 1 Punkt. Der Leuchtturm gibt 5. Boni geben bis zu 10.', TRUE);

-- User Progress
INSERT INTO user_progress (id, user_id, activity_id, learning_paths_completed, screens_visited, sessions_played, is_completed)
VALUES (
  'up-001',
  'user-123',
  'act-001',
  '["lp-001", "lp-002"]',
  '["start", "quickstart", "rules", "coach"]',
  2,
  FALSE
);
```

---

## Migrationsplan (MVP → Production)

### Phase 1: Datenstruktur in PocketBase

1. Alle 13 Tabellen als PocketBase-Collections erstellen
2. Indizes durch PocketBase-Queries abdecken
3. Access-Rules definieren (wer darf was sehen/ändern?)

### Phase 2: Beispieldaten importieren

1. "Die Insel der Pfade" komplett in DB laden
2. Validierung: Alle Referenzen intakt?
3. Test-Queries für häufige Zugriffe

### Phase 3: API-Integration

1. React-App (`src/lib/gameService.js`) gegen PocketBase umleiten
2. Queries für:
   - `getActivity(id)` → Komplette Aktivität + Beziehungen laden
   - `getPhaseActions(phaseId)` → Verfügbare Aktionen
   - `getCoachAnswer(question, context)` → Relevante Coach-Ausgabe
   - `getUserProgress(userId, activityId)` → Fortschritt laden/speichern

### Phase 4: Import-Pipeline (PDF → Datenbank)

1. PDF-Parser schreibt strukturierte Daten
2. Daten in entsprechende Tabellen einfügen
3. User-Review vor Veröffentlichung

---

## Erweiterbarkeit für zukünftige Module

### Neue Domäne: Musik

```sql
-- Neue Entities hinzufügen
INSERT INTO knowledge_entities (activity_id, entity_type, category, name)
VALUES
  ('music-101', 'concept', 'note', 'D-Note'),
  ('music-101', 'concept', 'chord', 'D-Moll'),
  ('music-101', 'technique', 'finger_technique', 'Barre-Griff');

-- Neue Aktionen
INSERT INTO actions (activity_id, action_name, description)
VALUES
  ('music-101', 'Akkord spielen', 'Spiele den angezeigten Akkord auf dem Instrument'),
  ('music-101', 'Übung durchführen', 'Führe eine Finger-Übung durch');

-- Neue Ressourcen
INSERT INTO resources (activity_id, resource_name, resource_type)
VALUES
  ('music-101', 'Übungszeit (Minuten)', 'time'),
  ('music-101', 'Fingerausdauer', 'energy');

-- Neue Strategien
INSERT INTO strategies (activity_id, strategy_name)
VALUES
  ('music-101', 'Tägliche Routine: 30 Min Grundlagen, 30 Min Technik');
```

### Neue Domäne: Sport

```sql
-- Entities für Bewegungen
INSERT INTO knowledge_entities (activity_id, entity_type, category, name)
VALUES
  ('sport-001', 'movement', 'exercise', 'Liegestütz'),
  ('sport-001', 'movement', 'technique', 'Richtige Körperspannung');

-- Ressourcen für Energie
INSERT INTO resources (activity_id, resource_name, resource_type)
VALUES
  ('sport-001', 'Energie', 'energy'),
  ('sport-001', 'Wiederholungen', 'counter');
```

**Zusammengefasst:** Alle Domänen nutzen die gleiche Tabellenstruktur. Nur die `entity_type`, `category`, `action_name`, und `resource_type` Werte unterscheiden sich.

---

## Begründung jeder Tabelle

| Tabelle | Grund |
|---------|-------|
| `activities` | Zentrale Entität – jeder Lernprozess ist eine Aktivität |
| `sources` | Tracking der Datenherkunft (PDF, Buch, etc.) für Transparenz |
| `knowledge_entities` | Generalisierung aller Lern-Objekte (Karte, Note, Bewegung) |
| `entity_attributes` | Flexible Eigenschaften ohne Schema-Änderungen |
| `relationships` | Beziehungen zwischen Objekten (ist Teil von, aktiviert, etc.) |
| `rules` | Explizite, durchsuchbare Regelsammlung |
| `phases` | Strukturierte Schritte in einer Aktivität |
| `actions` | Was kann der Benutzer tun + Kosten/Effekte |
| `resources` | Währungen, Punkte, Energie – alles in einer Tabelle |
| `learning_paths` | Didaktische Struktur (Großes Bild → Details) |
| `strategies` | Kombinationen von Aktionen + Meta-Tipps |
| `coach_outputs` | Chatbot-Training mit kontextuellen Antworten |
| `user_progress` | Benutzer-Tracking ohne Abhängigkeit von externem System |

---

## Datebankversionierung

Speichere diese Migration in deinem Repository:

```
repo/migrations/
  001-initial-schema.sql
  002-add-indexes.sql
  003-seed-isola-della-strade.sql
```

Bei jeder Schema-Änderung:
- Neue `.sql` datei erstellen
- Nummernfolge einhalten
- In `CHANGELOG.md` dokumentieren

Dies ermöglicht:
- Reproduzierbare Datenbank-Setups
- Einfache Rollbacks
- Klare Dokumentation der Struktur-Evolution
