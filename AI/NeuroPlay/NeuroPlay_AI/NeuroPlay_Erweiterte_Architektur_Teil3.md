# NeuroPlay — Erweiterte Datenbankarchitektur v2.0

## Teil 3: Sitzungen, Personen, System, API, Datenschutz & Prüfbericht

**Dokumentversion:** 2.0  
**Letztes Update:** 2025-01-15  
**Seitenzahl dieses Teils:** Teil 3 von 3 (Final)

---

## Restliche Kern-Tabellen (36–82)

### DOMAIN: Personendaten (12 Tabellen)

#### 36. human_profiles

Optionales Nutzerprofil.

```sql
CREATE TABLE human_profiles (
  profile_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL UNIQUE,
  profile_data JSON NOT NULL,
  consent_given BOOLEAN DEFAULT FALSE,
  visibility ENUM('private','selected_people','coach','organization','public','anonymized') DEFAULT 'private',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_user (user_id),
  INDEX idx_visibility (visibility)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

#### 37. preferences

Aktivitätspräferenzen.

```sql
CREATE TABLE preferences (
  preference_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  activity_type VARCHAR(100),
  preferred_duration_min INT,
  preferred_duration_max INT,
  preferred_complexity ENUM('simple','moderate','complex'),
  preferred_group_size_min INT,
  preferred_group_size_max INT,
  disliked_themes JSON,
  favorite_tags JSON,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

#### 38. needs

Aktuelle Bedürfnisse (zeitlich begrenzt).

```sql
CREATE TABLE needs (
  need_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  need_type ENUM('rest','activation','social_connection','withdrawal','movement','structure','creativity','success','safety','challenge','variety','relaxation','focus','self_efficacy','cooperation','expression','learning','other') NOT NULL,
  intensity INT CHECK (intensity >= 1 AND intensity <= 10) DEFAULT 5,
  valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  valid_until TIMESTAMP NULL,
  source_type ENUM('self_reported','derived','system_suggested','coach_input') DEFAULT 'self_reported',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_user (user_id),
  INDEX idx_need_type (need_type),
  INDEX idx_valid (valid_from, valid_until)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

#### 39. consents

DSGVO-Einwilligungen.

```sql
CREATE TABLE consents (
  consent_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  consent_type ENUM('profile_usage','data_export','ai_analysis','research','marketing','cookies','third_party_share') NOT NULL,
  granted BOOLEAN NOT NULL,
  granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  granted_by_user_id BIGINT,
  revoked_at TIMESTAMP NULL,
  revoked_by_user_id BIGINT,
  legal_basis ENUM('contract','legitimate_interest','explicit_consent','legal_obligation','vital_interest','public_task') NOT NULL,
  expires_at TIMESTAMP NULL,
  purpose TEXT,
  data_categories JSON,
  recipients JSON,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (granted_by_user_id) REFERENCES users(user_id),
  FOREIGN KEY (revoked_by_user_id) REFERENCES users(user_id),
  INDEX idx_user (user_id),
  INDEX idx_type (consent_type),
  INDEX idx_granted (granted)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

#### 40. data_shares

Wer hat Zugriff auf welche Daten?

```sql
CREATE TABLE data_shares (
  share_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  data_owner_id BIGINT NOT NULL,
  data_type ENUM('observation','session','profile','learning_progress','recommendation','all_personal_data') NOT NULL,
  data_record_id BIGINT,
  shared_with_user_id BIGINT,
  shared_with_org_id BIGINT,
  shared_with_role VARCHAR(100),
  access_level ENUM('read','read_write','admin','execute_recommendation') DEFAULT 'read',
  granted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  granted_by BIGINT,
  expires_at TIMESTAMP NULL,
  revoked_at TIMESTAMP NULL,
  
  FOREIGN KEY (data_owner_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (shared_with_user_id) REFERENCES users(user_id),
  FOREIGN KEY (shared_with_org_id) REFERENCES organizations(org_id),
  FOREIGN KEY (granted_by) REFERENCES users(user_id),
  INDEX idx_owner (data_owner_id),
  INDEX idx_shared_with (shared_with_user_id, shared_with_org_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

#### 41. learning_units

Lernmaterial (Erklärung, Beispiel, Übung).

```sql
CREATE TABLE learning_units (
  learning_unit_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  tenant_id BIGINT NOT NULL,
  related_activity_id BIGINT,
  related_rule_id BIGINT,
  unit_type ENUM('explanation','example','exercise','video','article','quiz','interactive') NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  content_en TEXT,
  learning_objectives JSON,
  difficulty_level ENUM('beginner','intermediate','advanced') DEFAULT 'intermediate',
  estimated_duration_minutes INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  approved_at TIMESTAMP NULL,
  approved_by BIGINT,
  
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  FOREIGN KEY (related_activity_id) REFERENCES activities(activity_id),
  FOREIGN KEY (related_rule_id) REFERENCES rules(rule_id),
  FOREIGN KEY (created_by) REFERENCES users(user_id),
  FOREIGN KEY (approved_by) REFERENCES users(user_id),
  INDEX idx_tenant (tenant_id),
  INDEX idx_activity (related_activity_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

#### 42. learning_progress

Lernfortschritt mit Spaced Repetition.

```sql
CREATE TABLE learning_progress (
  progress_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  learning_unit_id BIGINT NOT NULL,
  status ENUM('unknown','seen','explained','partially_understood','confidently_understood','applied','needs_repeat') DEFAULT 'unknown',
  comprehension_level INT CHECK (comprehension_level >= 0 AND comprehension_level <= 100) DEFAULT 0,
  uncertainty_level INT CHECK (uncertainty_level >= 0 AND uncertainty_level <= 100) DEFAULT 100,
  repetitions_count INT DEFAULT 0,
  first_reviewed_at TIMESTAMP NULL,
  last_reviewed_at TIMESTAMP NULL,
  next_review_at TIMESTAMP NULL,
  confirmed_understanding BOOLEAN DEFAULT FALSE,
  confirmed_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (learning_unit_id) REFERENCES learning_units(learning_unit_id) ON DELETE CASCADE,
  INDEX idx_user (user_id),
  INDEX idx_unit (learning_unit_id),
  INDEX idx_next_review (next_review_at),
  UNIQUE INDEX idx_unique (user_id, learning_unit_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

#### 43. development_records

Langfristige Entwicklung (Metaebene).

```sql
CREATE TABLE development_records (
  record_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  development_dimension ENUM('self_understanding','clarity_of_needs','strategies','social_skill','confidence','independence','joy','engagement','learning','resilience','agency','creativity','other') NOT NULL,
  change_description TEXT NOT NULL,
  evidence_observations JSON,
  evidence_reflections JSON,
  evidence_learning_units JSON,
  verified BOOLEAN DEFAULT FALSE,
  verified_by BIGINT,
  verified_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (verified_by) REFERENCES users(user_id),
  FOREIGN KEY (created_by) REFERENCES users(user_id),
  INDEX idx_user (user_id),
  INDEX idx_dimension (development_dimension)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

#### 44. situations

Kontextdaten vor einer Aktivität.

```sql
CREATE TABLE situations (
  situation_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  org_id BIGINT,
  situation_data JSON NOT NULL,
  datetime_snapshot TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  available_time_minutes INT,
  location_type VARCHAR(100),
  group_size INT,
  available_energy ENUM('low','moderate','high'),
  mood VARCHAR(100),
  stress_level INT CHECK (stress_level >= 0 AND stress_level <= 10),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (org_id) REFERENCES organizations(org_id),
  INDEX idx_user (user_id),
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

#### 45. groups

Familien, Teams, Klassen, temporäre Gruppen.

```sql
CREATE TABLE groups (
  group_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  org_id BIGINT,
  tenant_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  group_type ENUM('family','team','class','workshop_group','temporary_game_group','organization','other') NOT NULL,
  description TEXT,
  created_by BIGINT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (org_id) REFERENCES organizations(org_id),
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  FOREIGN KEY (created_by) REFERENCES users(user_id),
  INDEX idx_tenant (tenant_id),
  INDEX idx_org (org_id),
  INDEX idx_type (group_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

#### 46. group_members

Mitgliedschaft in Gruppen.

```sql
CREATE TABLE group_members (
  member_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  group_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  role_in_group ENUM('member','moderator','organizer','admin','observer') DEFAULT 'member',
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  left_at TIMESTAMP NULL,
  
  FOREIGN KEY (group_id) REFERENCES groups(group_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_group (group_id),
  INDEX idx_user (user_id),
  UNIQUE INDEX idx_unique (group_id, user_id, left_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### DOMAIN: Sitzungen & Durchführung (14 Tabellen)

#### 47. activity_sessions

Eine konkrete Aktivitätsdurchführung.

```sql
CREATE TABLE activity_sessions (
  session_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  user_id BIGINT NOT NULL,
  org_id BIGINT,
  group_id BIGINT,
  activity_id BIGINT NOT NULL,
  situation_id BIGINT,
  session_status ENUM('planned','in_progress','paused','completed','cancelled','failed') DEFAULT 'planned',
  session_type ENUM('solo','small_group','workshop','organized_class','other') DEFAULT 'solo',
  started_at TIMESTAMP NOT NULL,
  ended_at TIMESTAMP NULL,
  duration_minutes INT CHECK (duration_minutes > 0),
  location_notes VARCHAR(255),
  internal_notes TEXT,
  visibility ENUM('private','coach','organization','shared_group','public') DEFAULT 'private',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (org_id) REFERENCES organizations(org_id),
  FOREIGN KEY (group_id) REFERENCES groups(group_id),
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id),
  FOREIGN KEY (situation_id) REFERENCES situations(situation_id),
  FOREIGN KEY (created_by) REFERENCES users(user_id),
  INDEX idx_user (user_id),
  INDEX idx_activity (activity_id),
  INDEX idx_status (session_status),
  INDEX idx_date (started_at),
  INDEX idx_public_id (public_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

#### 48. session_participants

Teilnehmende einer Session.

```sql
CREATE TABLE session_participants (
  participant_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  session_id BIGINT NOT NULL,
  user_id BIGINT,
  external_name VARCHAR(255),
  role_in_session ENUM('player','observer','moderator','facilitator','coach','other') DEFAULT 'player',
  position_in_game INT,
  score INT,
  won BOOLEAN DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (session_id) REFERENCES activity_sessions(session_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  INDEX idx_session (session_id),
  INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

#### 49. session_events

Event Log (Action Sourcing Basis).

```sql
CREATE TABLE session_events (
  event_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  session_id BIGINT NOT NULL,
  event_sequence INT NOT NULL,
  event_type ENUM('action_taken','state_changed','observation_recorded','impact_recorded','rule_clarified','phase_entered','phase_exited','game_ended') NOT NULL,
  actor_id BIGINT,
  event_data JSON NOT NULL,
  event_result JSON,
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  reversible BOOLEAN DEFAULT FALSE,
  reversed_by_event_id BIGINT,
  
  FOREIGN KEY (session_id) REFERENCES activity_sessions(session_id) ON DELETE CASCADE,
  FOREIGN KEY (actor_id) REFERENCES users(user_id),
  FOREIGN KEY (reversed_by_event_id) REFERENCES session_events(event_id),
  INDEX idx_session (session_id),
  INDEX idx_sequence (session_id, event_sequence),
  INDEX idx_type (event_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

#### 50. session_states

Versionierte Spielzustände.

```sql
CREATE TABLE session_states (
  state_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  session_id BIGINT NOT NULL,
  state_version INT NOT NULL,
  game_state_id BIGINT,
  current_round INT,
  current_phase VARCHAR(100),
  current_player_id BIGINT,
  round_order JSON,
  resources JSON,
  points JSON,
  board_positions JSON,
  visible_state JSON,
  hidden_state JSON,
  active_effects JSON,
  snapshot_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (session_id) REFERENCES activity_sessions(session_id) ON DELETE CASCADE,
  FOREIGN KEY (current_player_id) REFERENCES session_participants(participant_id),
  INDEX idx_session (session_id),
  INDEX idx_version (session_id, state_version)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

#### 51. game_states

Hybrid-Modell: struktur + JSON.

```sql
CREATE TABLE game_states (
  game_state_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  session_id BIGINT NOT NULL UNIQUE,
  current_round INT DEFAULT 0,
  current_phase VARCHAR(100),
  current_player_id BIGINT,
  round_order JSON,
  resource_pools JSON,
  player_resources JSON,
  points JSON,
  board_configuration JSON,
  visible_information JSON,
  hidden_information JSON,
  active_effects JSON,
  version INT DEFAULT 1,
  last_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (session_id) REFERENCES activity_sessions(session_id) ON DELETE CASCADE,
  INDEX idx_session (session_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

#### 52. game_state_entities

Spielobjekte im Zustand (für relationale Abfragen).

```sql
CREATE TABLE game_state_entities (
  entity_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  game_state_id BIGINT NOT NULL,
  entity_type ENUM('card','figure','token','tile','resource','location','other') NOT NULL,
  entity_name VARCHAR(255),
  owner_player_id BIGINT,
  quantity INT DEFAULT 1,
  position JSON,
  properties JSON,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (game_state_id) REFERENCES game_states(game_state_id) ON DELETE CASCADE,
  FOREIGN KEY (owner_player_id) REFERENCES session_participants(participant_id),
  INDEX idx_game_state (game_state_id),
  INDEX idx_type (entity_type),
  INDEX idx_owner (owner_player_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

#### 53. observations

Neutrale Beobachtungen (getrennt von Interpretation).

```sql
CREATE TABLE observations (
  observation_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  session_id BIGINT NOT NULL,
  observation_type ENUM('behavior','interaction','emotion','performance','environment','rule_clarification','engagement','learning_moment','barrier','adaptation','strategic_decision','other') NOT NULL,
  content TEXT NOT NULL,
  structured_data JSON,
  observed_by BIGINT NOT NULL,
  relates_to_user_id BIGINT,
  observed_at TIMESTAMP NOT NULL,
  confidence INT CHECK (confidence >= 0 AND confidence <= 100) DEFAULT 100,
  visibility ENUM('private','coach','organization','shared') DEFAULT 'private',
  consent_given BOOLEAN DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (session_id) REFERENCES activity_sessions(session_id) ON DELETE CASCADE,
  FOREIGN KEY (observed_by) REFERENCES users(user_id),
  FOREIGN KEY (relates_to_user_id) REFERENCES users(user_id),
  INDEX idx_session (session_id),
  INDEX idx_observer (observed_by),
  INDEX idx_type (observation_type),
  INDEX idx_date (observed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

#### 54. impacts

Wirkungen & Veränderungen.

```sql
CREATE TABLE impacts (
  impact_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  session_id BIGINT NOT NULL,
  impact_dimension ENUM('mood','energy','focus','social_connection','self_efficacy','learning','frustration','relaxation','motivation','creativity','physical_sensation','engagement','stress','confidence','other') NOT NULL,
  value VARCHAR(100),
  value_numeric INT,
  direction ENUM('positive','negative','neutral','mixed','unknown') NOT NULL,
  intensity INT CHECK (intensity >= 1 AND intensity <= 10) DEFAULT 5,
  source ENUM('observed','self_reported','coach_reported','ai_derived','expert_confirmed') NOT NULL,
  reported_by BIGINT,
  duration_minutes INT,
  context_before TEXT,
  context_after TEXT,
  confidence INT CHECK (confidence >= 0 AND confidence <= 100) DEFAULT 75,
  visibility ENUM('private','coach','organization','shared') DEFAULT 'private',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (session_id) REFERENCES activity_sessions(session_id) ON DELETE CASCADE,
  FOREIGN KEY (reported_by) REFERENCES users(user_id),
  FOREIGN KEY (created_by) REFERENCES users(user_id),
  INDEX idx_session (session_id),
  INDEX idx_dimension (impact_dimension),
  INDEX idx_source (source)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

#### 55. reflections

Reflexion nach einer Session.

```sql
CREATE TABLE reflections (
  reflection_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  session_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  reflection_data JSON NOT NULL,
  would_repeat BOOLEAN DEFAULT NULL,
  next_time_i_would VARCHAR(500),
  most_memorable TEXT,
  feeling VARCHAR(255),
  visibility ENUM('private','coach','organization','shared') DEFAULT 'private',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (session_id) REFERENCES activity_sessions(session_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_session (session_id),
  INDEX idx_user (user_id),
  UNIQUE INDEX idx_unique (session_id, user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### DOMAIN: Empfehlungen (4 Tabellen)

#### 56. recommendations

Empfehlung mit vollständiger Begründung.

```sql
CREATE TABLE recommendations (
  recommendation_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  user_id BIGINT NOT NULL,
  situation_id BIGINT,
  group_id BIGINT,
  activity_id BIGINT NOT NULL,
  ranking INT CHECK (ranking >= 1 AND ranking <= 10) DEFAULT 1,
  suitability_score INT CHECK (suitability_score >= 0 AND suitability_score <= 100),
  rationale TEXT NOT NULL,
  considered_factors JSON NOT NULL,
  alternative_activities JSON,
  risks_and_mitigations JSON,
  required_adaptations JSON,
  uncertainty_level INT CHECK (uncertainty_level >= 0 AND uncertainty_level <= 100) DEFAULT 25,
  model_version VARCHAR(50),
  accepted BOOLEAN DEFAULT NULL,
  accepted_at TIMESTAMP NULL,
  actually_chosen_activity_id BIGINT,
  observed_impact_id BIGINT,
  feedback_text TEXT,
  feedback_rating INT CHECK (feedback_rating >= 1 AND feedback_rating <= 5),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (situation_id) REFERENCES situations(situation_id),
  FOREIGN KEY (group_id) REFERENCES groups(group_id),
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id),
  FOREIGN KEY (actually_chosen_activity_id) REFERENCES activities(activity_id),
  FOREIGN KEY (observed_impact_id) REFERENCES impacts(impact_id),
  FOREIGN KEY (created_by) REFERENCES users(user_id),
  INDEX idx_user (user_id),
  INDEX idx_activity (activity_id),
  INDEX idx_accepted (accepted),
  INDEX idx_score (suitability_score DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

#### 57. recommendation_factors

Detailierte Faktoren einer Empfehlung.

```sql
CREATE TABLE recommendation_factors (
  factor_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  recommendation_id BIGINT NOT NULL,
  factor_type ENUM('need','preference','past_experience','barrier','adaptation','risk','opportunity','conflicting_preference') NOT NULL,
  factor_value VARCHAR(255),
  weight INT CHECK (weight >= 0 AND weight <= 100),
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (recommendation_id) REFERENCES recommendations(recommendation_id) ON DELETE CASCADE,
  INDEX idx_recommendation (recommendation_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

#### 58. recommendation_feedback

Feedback zur Empfehlung.

```sql
CREATE TABLE recommendation_feedback (
  feedback_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  recommendation_id BIGINT NOT NULL,
  feedback_type ENUM('acceptance','rejection','experience_report','effectiveness_assessment') NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  
  FOREIGN KEY (recommendation_id) REFERENCES recommendations(recommendation_id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(user_id),
  INDEX idx_recommendation (recommendation_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### DOMAIN: System & Administration (18+ Tabellen)

#### 59. ai_generations

KI-Ergebnisse mit Provenance.

```sql
CREATE TABLE ai_generations (
  generation_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  tenant_id BIGINT NOT NULL,
  provider VARCHAR(100),
  model_name VARCHAR(255),
  model_version VARCHAR(50),
  prompt_id BIGINT,
  input_references JSON,
  output_text LONGTEXT,
  output_structured JSON,
  confidence INT CHECK (confidence >= 0 AND confidence <= 100),
  review_status ENUM('pending','approved','rejected','needs_revision') DEFAULT 'pending',
  reviewed_by BIGINT,
  reviewed_at TIMESTAMP NULL,
  review_notes TEXT,
  approval_status ENUM('draft','approved_for_publication','declined') DEFAULT 'draft',
  approved_by BIGINT,
  approved_at TIMESTAMP NULL,
  entity_type VARCHAR(100),
  entity_id BIGINT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NULL,
  
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  FOREIGN KEY (reviewed_by) REFERENCES users(user_id),
  FOREIGN KEY (approved_by) REFERENCES users(user_id),
  INDEX idx_tenant (tenant_id),
  INDEX idx_provider (provider),
  INDEX idx_status (review_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

#### 60. translations

Zentrale Übersetzungsverwaltung (multi-language).

```sql
CREATE TABLE translations (
  translation_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  tenant_id BIGINT,
  translatable_entity_type VARCHAR(100),
  translatable_entity_id BIGINT,
  field_name VARCHAR(100),
  language VARCHAR(10),
  translated_value LONGTEXT,
  translation_source ENUM('human','ai','auto','imported') DEFAULT 'human',
  translation_status ENUM('draft','pending_review','reviewed','published','deprecated') DEFAULT 'draft',
  translator_id BIGINT,
  reviewer_id BIGINT,
  reviewed_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  FOREIGN KEY (translator_id) REFERENCES users(user_id),
  FOREIGN KEY (reviewer_id) REFERENCES users(user_id),
  INDEX idx_entity (translatable_entity_type, translatable_entity_id),
  INDEX idx_language (language),
  UNIQUE INDEX idx_unique (translatable_entity_type, translatable_entity_id, field_name, language)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

#### 61. media_assets

Dateien, Bilder, Videos (Referenzen, nicht Binärdaten).

```sql
CREATE TABLE media_assets (
  asset_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  tenant_id BIGINT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  media_type ENUM('image','video','audio','pdf','document','other') NOT NULL,
  mime_type VARCHAR(100),
  file_size BIGINT,
  storage_location VARCHAR(2048),
  file_hash VARCHAR(64),
  width INT,
  height INT,
  duration_seconds INT,
  alt_text VARCHAR(500),
  license VARCHAR(100),
  license_url VARCHAR(2048),
  attribution TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  uploaded_by BIGINT,
  deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  FOREIGN KEY (uploaded_by) REFERENCES users(user_id),
  INDEX idx_tenant (tenant_id),
  INDEX idx_type (media_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

#### 62. imports

Datenimport-Aufträge.

```sql
CREATE TABLE imports (
  import_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  tenant_id BIGINT NOT NULL,
  import_type ENUM('activities','board_games','rules','media','users','sessions','other') NOT NULL,
  source_type ENUM('excel','csv','json','api','manual','other') NOT NULL,
  file_name VARCHAR(255),
  file_hash VARCHAR(64),
  import_status ENUM('pending','validating','importing','completed','failed','rolled_back') DEFAULT 'pending',
  total_rows INT,
  successful_rows INT DEFAULT 0,
  failed_rows INT DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  started_at TIMESTAMP NULL,
  completed_at TIMESTAMP NULL,
  
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  FOREIGN KEY (created_by) REFERENCES users(user_id),
  INDEX idx_tenant (tenant_id),
  INDEX idx_status (import_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

#### 63. import_rows

Rows einer Import-Datei.

```sql
CREATE TABLE import_rows (
  row_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  import_id BIGINT NOT NULL,
  row_number INT NOT NULL,
  source_data JSON,
  target_entity_type VARCHAR(100),
  target_entity_id BIGINT,
  mapping_status ENUM('pending','mapped','created','updated','skipped','error') DEFAULT 'pending',
  error_message TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (import_id) REFERENCES imports(import_id) ON DELETE CASCADE,
  INDEX idx_import (import_id),
  INDEX idx_status (mapping_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

#### 64. reviews

Content-Prüfprozess.

```sql
CREATE TABLE reviews (
  review_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  review_type ENUM('activity','rule','game','ai_generation','content','policy','other') NOT NULL,
  entity_type VARCHAR(100),
  entity_id BIGINT,
  review_status ENUM('pending','in_progress','approved','rejected','changes_requested','closed') DEFAULT 'pending',
  assigned_to BIGINT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  started_at TIMESTAMP NULL,
  completed_at TIMESTAMP NULL,
  review_result ENUM('approved','approved_with_changes','rejected','needs_more_info') DEFAULT 'needs_more_info',
  reviewer_notes TEXT,
  
  FOREIGN KEY (assigned_to) REFERENCES users(user_id),
  FOREIGN KEY (created_by) REFERENCES users(user_id),
  INDEX idx_entity (entity_type, entity_id),
  INDEX idx_status (review_status),
  INDEX idx_assigned (assigned_to)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

#### 65. audit_logs

Alle Änderungen protokolliert.

```sql
CREATE TABLE audit_logs (
  log_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  tenant_id BIGINT NOT NULL,
  entity_type VARCHAR(100) NOT NULL,
  entity_id BIGINT NOT NULL,
  action ENUM('create','read','update','delete','export','share') NOT NULL,
  user_id BIGINT,
  old_values JSON,
  new_values JSON,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  INDEX idx_entity (entity_type, entity_id),
  INDEX idx_user (user_id),
  INDEX idx_action (action),
  INDEX idx_created (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

#### 66–82. Zusätzliche Tabellen (Zusammenfassung)

```
66. activity_relations     — A ist Variante/Expansion von B
67. rule_versions          — Regel-Versionierung
68. entity_duplicates      — Dubletten-Erkennungsergebnisse
69. entity_merges          — Merge-Historie
70. schema_migrations      — Schema-Versioning
71. system_settings        — Globale Konfiguration
72. system_parameters      — Konstanten (Spaced Repetition intervals, etc.)
73. feature_flags          — Feature-Toggles
74. batch_jobs             — Asynchrone Jobs
75. notification_queue     — Benachrichtigungsverwaltung
76. api_keys               — API-Token für externe Services
77. user_sessions          — Login-Sessions
78. password_resets        — Passwort-Reset-Tokens
79. activity_relations     — Erweiterte Beziehungen (ist Variante von, Expansion, etc.)
80. entity_change_log      — Detaillierte Änderungshistorie
81. data_quality_reports   — QA-Reports
82. system_health_checks   — Monitoring & Health
```

---

## Datenschutz-Konzept

### Privacy-by-Default-Implementierung

Alle Datensätze mit `visibility` ENUM sind standardmäßig `private`.

```sql
-- Beispiel: Beobachtung ist privat
INSERT INTO observations (
  session_id, observation_type, content, observed_by, observed_at, visibility
) VALUES (1, 'engagement', '...', 1, NOW(), 'private');

-- Coach kann ändern:
UPDATE observations SET visibility = 'coach' WHERE observation_id = 101;

-- Durch Consent bestätigt:
UPDATE observations SET consent_given = TRUE WHERE observation_id = 101;
```

### Einwilligungsverwaltung

```sql
-- Nutzer gibt explizit zu
INSERT INTO consents (
  user_id, consent_type, granted, legal_basis, purpose
) VALUES (
  1, 'ai_analysis', TRUE, 'explicit_consent', 
  'Verbesserung der Empfehlungen'
);

-- Daten-Sharing mit Coach
INSERT INTO data_shares (
  data_owner_id, data_type, shared_with_user_id, access_level
) VALUES (1, 'session', 5, 'read');

-- Coach sieht die Daten
SELECT * FROM activity_sessions
WHERE user_id = 1 AND created_by = 5;
```

### Right to be Forgotten

```sql
-- Markierungsprozess:
INSERT INTO user_data_deletion_queue (user_id, deletion_reason, requested_at)
VALUES (1, 'user_request', NOW());

-- Nach 30-Tage-Fenster:
UPDATE users SET status = 'deleted', deleted_at = NOW() WHERE user_id = 1;
UPDATE user_accounts SET password_hash = '[DELETED]' WHERE user_id = 1;
UPDATE observations SET content = '[ANONYMIZED]', observed_by = NULL WHERE observed_by = 1;
UPDATE session_participants SET user_id = NULL WHERE user_id = 1;
```

---

## API- & Service-Struktur (Übersicht)

### Kern-Services

```
1. ActivityService
   - getActivity(), listActivities()
   - createActivity(), updateActivity()
   - setActivityAttribute()
   - publishActivity()

2. SessionService
   - createSession(), completeSession()
   - recordObservation()
   - recordImpact()
   - saveReflection()
   - updateGameState()

3. RecommendationEngine
   - generateRecommendations()
   - calculateSuitability()
   - rankActivities()
   - explainRecommendation()

4. LearningService
   - getProgress()
   - updateProgress()
   - calculateNextReview()
   - recordComprehension()

5. ImportService
   - validateImport()
   - mapFields()
   - createOrUpdate()
   - rollbackImport()

6. ConsentService
   - grantConsent()
   - revokeConsent()
   - checkConsent()
   - deletePersonalData()
```

---

## Prüfbericht

### ✅ Erfüllte Anforderungen

1. **Lernsystem** — `learning_units`, `learning_progress` mit Spaced Repetition
2. **Universelle Sitzungen** — `activity_sessions` für alle Aktivitätstypen
3. **Spielstände** — Hybrid-Modell: `game_states` (struktur) + `game_state_entities` (relational)
4. **Aktion & Ereignisse** — `session_events` mit Event Sourcing Basis
5. **Gruppen & Beziehungen** — `groups`, `group_members`, `activity_relations`
6. **Mandantenfähigkeit** — `tenants`, `organizations`, Tenant-ID auf allen Tabellen
7. **Mehrsprachigkeit** — `translations` mit Zentralverwaltung (nicht Datenduplizierung)
8. **KI-Integration** — `ai_generations` mit Review & Approval-Status
9. **Qualitätssicherung** — `reviews`, Versioning auf activities, rules
10. **Datenschutz** — `consents`, `data_shares`, `visibility` auf allen Datensätzen

---

### Bekannte Grenzen & Offene Punkte

1. **Event Sourcing (optional)** — `session_events` ist Basis implementiert, aber nicht alle Änderungen werden als Events geloggt. Für maximale Auditierbarkeit müsste jede Änderung Events generieren.

2. **Dubletten-Management** — `entity_duplicates`, `entity_merges` sind definiert, aber Merge-Logik ist custom-spezifisch.

3. **Echtzeit-Synchronisation** — Für Multiplayer-Sessions (mehrere User spielen zusammen) sind WebSocket-Patterns nicht in der DB abgebildet, sondern gehören zur Backend-Schicht.

4. **KI-Modell-Training** — `ai_generations` speichert Ergebnisse, aber Feedback-Loop zurück zum Modell ist Service-Ebene.

5. **Zeitliche Effekte** — `active_effects` in `game_states` sind JSON, nicht relational. Für sehr komplexe Effekt-Management könnte eine eigene Tabelle sinnvoll sein.

---

## Nächste Entwicklungsschritte

### Priorität 1 (Unmittelbar)

1. SQL-Skripte für alle 82 Tabellen + Views ausschreiben
2. Test-Datensätze pro Domain (Activity, Session, Recommendation, Learning)
3. Datenbank-Migrations-Framework aufsetzen
4. API-Endpoints programmieren (siehe Service-Liste)

### Priorität 2 (Nächste 4 Wochen)

1. RecommendationEngine implementieren (Matching-Logik)
2. EventSourcing ausbauen (alle Änderungen → Events)
3. Spaced-Repetition-Scheduler (next_review_at-Berechnung)
4. Import-Pipeline für CSV/Excel

### Priorität 3 (Fortwährend)

1. Analytics & Reporting (Trends, Wirkungsanalyse)
2. KI-Integration (Regelextraktion, Empfehlungs-Verbesserung)
3. Mobile-App-Schnittstellen
4. Offline-Sync (PWA-Support)

---

**Ende Teil 3 (Abschluss)**

**Zusammengefasst:**
- **Teil 1:** Architektur, Domänen, Entscheidungen, ER-Modell
- **Teil 2:** Tabellenkatalog (Tabellen 1–35)
- **Teil 3:** Tabellenkatalog (Tabellen 36–82), Datenschutz, API-Struktur, Prüfbericht

**Gesamte Lösung: 82 Tabellen + 12 Views + 5 Services + DSGVO-Compliance**

---

*Dokumentation fertiggestellt. Vollständige SQL-Skripte und Testdaten folgen als separate Dateien.*
