-- ============================================================================
-- NeuroPlay v2.0 — Produktionsreife DDL
-- Alle 82 Tabellen + Views
-- ============================================================================

-- DOMAIN 1: Multi-Tenancy (5 Tabellen)

CREATE TABLE tenants (
  tenant_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  domain VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  subscription_level ENUM('free', 'professional', 'enterprise') DEFAULT 'free',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  INDEX idx_slug (slug),
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE organizations (
  org_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  tenant_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  org_type ENUM('school', 'clinic', 'family', 'workshop', 'other') NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  INDEX idx_tenant (tenant_id),
  UNIQUE INDEX idx_unique (slug, tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE users (
  user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  tenant_id BIGINT NOT NULL,
  email VARCHAR(255) NOT NULL,
  display_name VARCHAR(255),
  status ENUM('active', 'inactive', 'suspended', 'deleted') DEFAULT 'active',
  user_type ENUM('regular_user', 'child', 'guardian', 'coach') DEFAULT 'regular_user',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  INDEX idx_tenant (tenant_id),
  INDEX idx_email (email, tenant_id),
  INDEX idx_status (status),
  UNIQUE INDEX idx_email_tenant (email, tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE user_accounts (
  account_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  last_login_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE audit_logs (
  log_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  tenant_id BIGINT NOT NULL,
  entity_type VARCHAR(100) NOT NULL,
  entity_id BIGINT NOT NULL,
  action ENUM('create','read','update','delete') NOT NULL,
  user_id BIGINT,
  old_values JSON,
  new_values JSON,
  ip_address VARCHAR(45),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  INDEX idx_entity (entity_type, entity_id),
  INDEX idx_user (user_id),
  INDEX idx_created (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- DOMAIN 2: Rollen & Berechtigungen (4 Tabellen)

CREATE TABLE roles (
  role_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  is_system_role BOOLEAN DEFAULT TRUE,
  INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE permissions (
  permission_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  resource_type VARCHAR(100) NOT NULL,
  action VARCHAR(100) NOT NULL,
  description TEXT,
  UNIQUE INDEX idx_unique (resource_type, action)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE role_permissions (
  role_permission_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  role_id BIGINT NOT NULL,
  permission_id BIGINT NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(role_id),
  FOREIGN KEY (permission_id) REFERENCES permissions(permission_id),
  UNIQUE INDEX idx_unique (role_id, permission_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE user_roles (
  user_role_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  role_id BIGINT NOT NULL,
  org_id BIGINT,
  granted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  revoked_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(role_id),
  FOREIGN KEY (org_id) REFERENCES organizations(org_id),
  INDEX idx_user (user_id),
  UNIQUE INDEX idx_unique (user_id, role_id, org_id, revoked_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- DOMAIN 3: Aktivitätswissen (18 Tabellen)

CREATE TABLE activities (
  activity_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  tenant_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  activity_type ENUM('board_game','video_game','card_game','sport','music','creative_work','learning','relaxation','movement','workshop','other') NOT NULL,
  short_description VARCHAR(500),
  full_description TEXT,
  objective TEXT,
  typical_duration_minutes INT,
  min_participants INT DEFAULT 1,
  max_participants INT,
  recommended_age_min INT,
  complexity_level ENUM('very_simple','simple','moderate','complex','very_complex'),
  status ENUM('draft','published','archived','deprecated') NOT NULL DEFAULT 'draft',
  quality_status ENUM('unreviewed','in_review','verified','expert_approved') DEFAULT 'unreviewed',
  version INT DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  FOREIGN KEY (created_by) REFERENCES users(user_id),
  INDEX idx_tenant (tenant_id),
  INDEX idx_type (activity_type, status),
  INDEX idx_slug (slug),
  UNIQUE INDEX idx_slug_tenant (slug, tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE activity_versions (
  version_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  activity_id BIGINT NOT NULL,
  version_number INT NOT NULL,
  valid_from TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  valid_until TIMESTAMP NULL,
  data_snapshot JSON NOT NULL,
  reason_changed VARCHAR(500),
  changed_by BIGINT,
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE CASCADE,
  FOREIGN KEY (changed_by) REFERENCES users(user_id),
  INDEX idx_activity (activity_id),
  UNIQUE INDEX idx_current (activity_id, valid_until)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE attribute_definitions (
  definition_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  tenant_id BIGINT,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  attribute_group ENUM('cognitive','emotional','social','physical','sensory','motor','communication','strategy','learning','accessibility','other') NOT NULL,
  description TEXT,
  data_type ENUM('number','text','enum','boolean','date','json') NOT NULL,
  unit_of_measure VARCHAR(50),
  min_value DECIMAL(10,2),
  max_value DECIMAL(10,2),
  allowed_values JSON,
  is_deprecated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_group (attribute_group),
  INDEX idx_deprecated (is_deprecated),
  UNIQUE INDEX idx_unique (slug, tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE activity_dna (
  dna_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  activity_id BIGINT NOT NULL,
  definition_id BIGINT NOT NULL,
  value VARCHAR(500),
  value_numeric DECIMAL(10,2),
  confidence INT CHECK (confidence >= 0 AND confidence <= 100) DEFAULT 100,
  source_type ENUM('redactional','ai_generated','derived_from_observation','user_confirmed') DEFAULT 'redactional',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE CASCADE,
  FOREIGN KEY (definition_id) REFERENCES attribute_definitions(definition_id),
  INDEX idx_activity (activity_id),
  UNIQUE INDEX idx_unique (activity_id, definition_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE categories (
  category_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  tenant_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  UNIQUE INDEX idx_unique (slug, tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE activity_categories (
  activity_category_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  activity_id BIGINT NOT NULL,
  category_id BIGINT NOT NULL,
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE,
  UNIQUE INDEX idx_unique (activity_id, category_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE tags (
  tag_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  tenant_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  tag_category VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  UNIQUE INDEX idx_unique (slug, tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE activity_tags (
  activity_tag_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  activity_id BIGINT NOT NULL,
  tag_id BIGINT NOT NULL,
  confidence INT DEFAULT 100,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE,
  UNIQUE INDEX idx_unique (activity_id, tag_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE rules (
  rule_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  activity_id BIGINT NOT NULL,
  rule_type ENUM('basic_rule','action_rule','phase_rule','scoring_rule','end_condition','exception','variant','errata','optional_rule') NOT NULL,
  title VARCHAR(255) NOT NULL,
  short_description VARCHAR(500),
  full_description TEXT,
  structured_content JSON,
  applies_to_phase VARCHAR(100),
  priority INT DEFAULT 100,
  version INT DEFAULT 1,
  quality_status ENUM('unreviewed','verified','approved') DEFAULT 'unreviewed',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(user_id),
  INDEX idx_activity (activity_id),
  INDEX idx_type (rule_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE rule_relationships (
  relationship_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  source_rule_id BIGINT NOT NULL,
  target_rule_id BIGINT NOT NULL,
  relationship_type ENUM('supplements','overrides','contradicts','is_exception_of','required_for','activates','prevents','clarifies') NOT NULL,
  explanation TEXT,
  FOREIGN KEY (source_rule_id) REFERENCES rules(rule_id) ON DELETE CASCADE,
  FOREIGN KEY (target_rule_id) REFERENCES rules(rule_id) ON DELETE CASCADE,
  UNIQUE INDEX idx_unique (source_rule_id, target_rule_id, relationship_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE phases (
  phase_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  activity_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  phase_order INT NOT NULL,
  is_optional BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE CASCADE,
  INDEX idx_activity (activity_id),
  INDEX idx_order (activity_id, phase_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE steps (
  step_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  phase_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  step_order INT NOT NULL,
  instruction TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (phase_id) REFERENCES phases(phase_id) ON DELETE CASCADE,
  INDEX idx_phase (phase_id),
  INDEX idx_order (phase_id, step_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE actions (
  action_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  activity_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  action_type ENUM('basic_action','optional_action','conditional_action','forced_action') DEFAULT 'basic_action',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE CASCADE,
  INDEX idx_activity (activity_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE strategies (
  strategy_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  activity_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  strategic_goal TEXT,
  difficulty_level ENUM('beginner','intermediate','advanced','expert') DEFAULT 'intermediate',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE CASCADE,
  INDEX idx_activity (activity_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- DOMAIN 4: Personendaten (12 Tabellen)

CREATE TABLE human_profiles (
  profile_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL UNIQUE,
  profile_data JSON NOT NULL,
  consent_given BOOLEAN DEFAULT FALSE,
  visibility ENUM('private','selected_people','coach','organization','public') DEFAULT 'private',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE preferences (
  preference_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  preferred_duration_min INT,
  preferred_duration_max INT,
  preferred_complexity VARCHAR(100),
  disliked_themes JSON,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE needs (
  need_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  need_type ENUM('rest','activation','social_connection','withdrawal','movement','structure','creativity','success','safety','challenge','variety','relaxation','focus','self_efficacy','cooperation','expression','learning','other') NOT NULL,
  intensity INT CHECK (intensity >= 1 AND intensity <= 10) DEFAULT 5,
  valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  valid_until TIMESTAMP NULL,
  source_type ENUM('self_reported','derived','system_suggested','coach_input') DEFAULT 'self_reported',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_user (user_id),
  INDEX idx_type (need_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE consents (
  consent_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  consent_type ENUM('profile_usage','data_export','ai_analysis','research') NOT NULL,
  granted BOOLEAN NOT NULL,
  granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  revoked_at TIMESTAMP NULL,
  legal_basis VARCHAR(100) NOT NULL,
  expires_at TIMESTAMP NULL,
  purpose TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_user (user_id),
  INDEX idx_type (consent_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE data_shares (
  share_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  data_owner_id BIGINT NOT NULL,
  data_type VARCHAR(100) NOT NULL,
  shared_with_user_id BIGINT,
  shared_with_org_id BIGINT,
  access_level ENUM('read','read_write','admin') DEFAULT 'read',
  granted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NULL,
  FOREIGN KEY (data_owner_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (shared_with_user_id) REFERENCES users(user_id),
  FOREIGN KEY (shared_with_org_id) REFERENCES organizations(org_id),
  INDEX idx_owner (data_owner_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE learning_units (
  learning_unit_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  tenant_id BIGINT NOT NULL,
  related_activity_id BIGINT,
  unit_type ENUM('explanation','example','exercise','video','article','quiz','interactive') NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  content_en TEXT,
  difficulty_level ENUM('beginner','intermediate','advanced') DEFAULT 'intermediate',
  estimated_duration_minutes INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  FOREIGN KEY (related_activity_id) REFERENCES activities(activity_id),
  INDEX idx_tenant (tenant_id),
  INDEX idx_type (unit_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE learning_progress (
  progress_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  learning_unit_id BIGINT NOT NULL,
  status ENUM('unknown','seen','explained','partially_understood','confidently_understood','applied','needs_repeat') DEFAULT 'unknown',
  comprehension_level INT CHECK (comprehension_level >= 0 AND comprehension_level <= 100) DEFAULT 0,
  uncertainty_level INT CHECK (uncertainty_level >= 0 AND uncertainty_level <= 100) DEFAULT 100,
  repetitions_count INT DEFAULT 0,
  last_reviewed_at TIMESTAMP NULL,
  next_review_at TIMESTAMP NULL,
  confirmed_understanding BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (learning_unit_id) REFERENCES learning_units(learning_unit_id) ON DELETE CASCADE,
  INDEX idx_user (user_id),
  INDEX idx_next_review (next_review_at),
  UNIQUE INDEX idx_unique (user_id, learning_unit_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE development_records (
  record_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  development_dimension ENUM('self_understanding','clarity_of_needs','strategies','social_skill','confidence','independence','joy','engagement','learning','resilience','agency','creativity','other') NOT NULL,
  change_description TEXT NOT NULL,
  evidence_observations JSON,
  verified BOOLEAN DEFAULT FALSE,
  verified_by BIGINT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (verified_by) REFERENCES users(user_id),
  INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE situations (
  situation_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  situation_data JSON NOT NULL,
  available_time_minutes INT,
  location_type VARCHAR(100),
  group_size INT,
  available_energy ENUM('low','moderate','high'),
  mood VARCHAR(100),
  stress_level INT CHECK (stress_level >= 0 AND stress_level <= 10),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_user (user_id),
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE groups (
  group_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  tenant_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  group_type ENUM('family','team','class','workshop_group','temporary_game_group','organization','other') NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  INDEX idx_tenant (tenant_id),
  INDEX idx_type (group_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  UNIQUE INDEX idx_unique (group_id, user_id, left_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- DOMAIN 5: Sitzungen (14 Tabellen)

CREATE TABLE activity_sessions (
  session_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  user_id BIGINT NOT NULL,
  activity_id BIGINT NOT NULL,
  situation_id BIGINT,
  group_id BIGINT,
  session_status ENUM('planned','in_progress','paused','completed','cancelled','failed') DEFAULT 'planned',
  started_at TIMESTAMP NOT NULL,
  ended_at TIMESTAMP NULL,
  duration_minutes INT,
  location_notes VARCHAR(255),
  visibility ENUM('private','coach','organization','shared') DEFAULT 'private',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id),
  FOREIGN KEY (situation_id) REFERENCES situations(situation_id),
  FOREIGN KEY (group_id) REFERENCES groups(group_id),
  FOREIGN KEY (created_by) REFERENCES users(user_id),
  INDEX idx_user (user_id),
  INDEX idx_activity (activity_id),
  INDEX idx_status (session_status),
  INDEX idx_date (started_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE session_participants (
  participant_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  session_id BIGINT NOT NULL,
  user_id BIGINT,
  external_name VARCHAR(255),
  role_in_session ENUM('player','observer','moderator','facilitator','coach','other') DEFAULT 'player',
  score INT,
  won BOOLEAN DEFAULT NULL,
  FOREIGN KEY (session_id) REFERENCES activity_sessions(session_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  INDEX idx_session (session_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE session_events (
  event_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  session_id BIGINT NOT NULL,
  event_sequence INT NOT NULL,
  event_type ENUM('action_taken','state_changed','observation_recorded','impact_recorded','rule_clarified','phase_entered','phase_exited','game_ended') NOT NULL,
  actor_id BIGINT,
  event_data JSON NOT NULL,
  event_result JSON,
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES activity_sessions(session_id) ON DELETE CASCADE,
  FOREIGN KEY (actor_id) REFERENCES users(user_id),
  INDEX idx_session (session_id),
  INDEX idx_type (event_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE session_states (
  state_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  session_id BIGINT NOT NULL,
  state_version INT NOT NULL,
  game_state_id BIGINT,
  current_round INT,
  current_phase VARCHAR(100),
  round_order JSON,
  resources JSON,
  points JSON,
  snapshot_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES activity_sessions(session_id) ON DELETE CASCADE,
  INDEX idx_session (session_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE game_states (
  game_state_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  session_id BIGINT NOT NULL UNIQUE,
  current_round INT DEFAULT 0,
  current_phase VARCHAR(100),
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
  FOREIGN KEY (game_state_id) REFERENCES game_states(game_state_id) ON DELETE CASCADE,
  INDEX idx_game_state (game_state_id),
  INDEX idx_type (entity_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE observations (
  observation_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  session_id BIGINT NOT NULL,
  observation_type ENUM('behavior','interaction','emotion','performance','environment','rule_clarification','engagement','learning_moment','barrier','adaptation','strategic_decision','other') NOT NULL,
  content TEXT NOT NULL,
  observed_by BIGINT NOT NULL,
  observed_at TIMESTAMP NOT NULL,
  confidence INT DEFAULT 100,
  visibility ENUM('private','coach','organization','shared') DEFAULT 'private',
  consent_given BOOLEAN DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES activity_sessions(session_id) ON DELETE CASCADE,
  FOREIGN KEY (observed_by) REFERENCES users(user_id),
  INDEX idx_session (session_id),
  INDEX idx_type (observation_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE impacts (
  impact_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  session_id BIGINT NOT NULL,
  impact_dimension ENUM('mood','energy','focus','social_connection','self_efficacy','learning','frustration','relaxation','motivation','creativity','physical_sensation','engagement','stress','confidence','other') NOT NULL,
  value VARCHAR(100),
  direction ENUM('positive','negative','neutral','mixed','unknown') NOT NULL,
  intensity INT CHECK (intensity >= 1 AND intensity <= 10) DEFAULT 5,
  source ENUM('observed','self_reported','coach_reported','ai_derived','expert_confirmed') NOT NULL,
  reported_by BIGINT,
  duration_minutes INT,
  confidence INT DEFAULT 75,
  visibility ENUM('private','coach','organization','shared') DEFAULT 'private',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES activity_sessions(session_id) ON DELETE CASCADE,
  FOREIGN KEY (reported_by) REFERENCES users(user_id),
  INDEX idx_session (session_id),
  INDEX idx_dimension (impact_dimension)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE reflections (
  reflection_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  session_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  reflection_data JSON NOT NULL,
  would_repeat BOOLEAN DEFAULT NULL,
  visibility ENUM('private','coach','organization','shared') DEFAULT 'private',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES activity_sessions(session_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  UNIQUE INDEX idx_unique (session_id, user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- DOMAIN 6: Empfehlungen (4 Tabellen)

CREATE TABLE recommendations (
  recommendation_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  user_id BIGINT NOT NULL,
  situation_id BIGINT,
  activity_id BIGINT NOT NULL,
  ranking INT DEFAULT 1,
  suitability_score INT,
  rationale TEXT NOT NULL,
  considered_factors JSON NOT NULL,
  alternative_activities JSON,
  risks_and_mitigations JSON,
  required_adaptations JSON,
  uncertainty_level INT DEFAULT 25,
  model_version VARCHAR(50),
  accepted BOOLEAN DEFAULT NULL,
  actually_chosen_activity_id BIGINT,
  observed_impact_id BIGINT,
  feedback_text TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (situation_id) REFERENCES situations(situation_id),
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id),
  FOREIGN KEY (observed_impact_id) REFERENCES impacts(impact_id),
  INDEX idx_user (user_id),
  INDEX idx_activity (activity_id),
  INDEX idx_accepted (accepted)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE recommendation_factors (
  factor_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  recommendation_id BIGINT NOT NULL,
  factor_type ENUM('need','preference','past_experience','barrier','adaptation','risk','opportunity','conflicting_preference') NOT NULL,
  factor_value VARCHAR(255),
  weight INT,
  description TEXT,
  FOREIGN KEY (recommendation_id) REFERENCES recommendations(recommendation_id) ON DELETE CASCADE,
  INDEX idx_recommendation (recommendation_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE recommendation_feedback (
  feedback_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  recommendation_id BIGINT NOT NULL,
  feedback_type ENUM('acceptance','rejection','experience_report','effectiveness_assessment') NOT NULL,
  rating INT,
  comment TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (recommendation_id) REFERENCES recommendations(recommendation_id) ON DELETE CASCADE,
  INDEX idx_recommendation (recommendation_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- DOMAIN 7: System & Administration (20+ Tabellen)

CREATE TABLE ai_generations (
  generation_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  tenant_id BIGINT NOT NULL,
  provider VARCHAR(100),
  model_name VARCHAR(255),
  model_version VARCHAR(50),
  input_references JSON,
  output_text LONGTEXT,
  confidence INT,
  review_status ENUM('pending','approved','rejected','needs_revision') DEFAULT 'pending',
  reviewed_by BIGINT,
  reviewed_at TIMESTAMP NULL,
  approval_status ENUM('draft','approved_for_publication','declined') DEFAULT 'draft',
  entity_type VARCHAR(100),
  entity_id BIGINT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  FOREIGN KEY (reviewed_by) REFERENCES users(user_id),
  INDEX idx_status (review_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE translations (
  translation_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  tenant_id BIGINT,
  translatable_entity_type VARCHAR(100),
  translatable_entity_id BIGINT,
  field_name VARCHAR(100),
  language VARCHAR(10),
  translated_value LONGTEXT,
  translation_status ENUM('draft','pending_review','reviewed','published') DEFAULT 'draft',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  UNIQUE INDEX idx_unique (translatable_entity_type, translatable_entity_id, field_name, language)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  alt_text VARCHAR(500),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  INDEX idx_tenant (tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE imports (
  import_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  tenant_id BIGINT NOT NULL,
  import_type ENUM('activities','rules','users','sessions','other') NOT NULL,
  source_type ENUM('excel','csv','json','api','manual','other') NOT NULL,
  file_name VARCHAR(255),
  import_status ENUM('pending','validating','importing','completed','failed') DEFAULT 'pending',
  total_rows INT,
  successful_rows INT DEFAULT 0,
  failed_rows INT DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  INDEX idx_status (import_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE import_rows (
  row_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  import_id BIGINT NOT NULL,
  row_number INT NOT NULL,
  source_data JSON,
  mapping_status ENUM('pending','mapped','created','updated','skipped','error') DEFAULT 'pending',
  error_message TEXT,
  FOREIGN KEY (import_id) REFERENCES imports(import_id) ON DELETE CASCADE,
  INDEX idx_import (import_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE reviews (
  review_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  review_type ENUM('activity','rule','game','ai_generation','content','other') NOT NULL,
  entity_type VARCHAR(100),
  entity_id BIGINT,
  review_status ENUM('pending','in_progress','approved','rejected','changes_requested') DEFAULT 'pending',
  assigned_to BIGINT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP NULL,
  FOREIGN KEY (assigned_to) REFERENCES users(user_id),
  INDEX idx_status (review_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE schema_migrations (
  migration_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  version VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('applied','pending','failed') DEFAULT 'applied'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE system_settings (
  setting_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  tenant_id BIGINT,
  setting_key VARCHAR(255) NOT NULL,
  setting_value LONGTEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  UNIQUE INDEX idx_unique (tenant_id, setting_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- VIEWS (12 vordefinierte)
-- ============================================================================

CREATE VIEW v_activity_overview AS
SELECT 
  a.activity_id,
  a.public_id,
  a.name,
  a.activity_type,
  a.status,
  COUNT(DISTINCT ac.category_id) as category_count,
  COUNT(DISTINCT at.tag_id) as tag_count,
  COUNT(DISTINCT s.session_id) as total_sessions,
  MAX(s.started_at) as last_used_at
FROM activities a
LEFT JOIN activity_categories ac ON a.activity_id = ac.activity_id
LEFT JOIN activity_tags at ON a.activity_id = at.activity_id
LEFT JOIN activity_sessions s ON a.activity_id = s.activity_id AND s.session_status = 'completed'
WHERE a.deleted_at IS NULL
GROUP BY a.activity_id;

CREATE VIEW v_user_activity_history AS
SELECT 
  s.user_id,
  a.activity_id,
  a.name as activity_name,
  s.session_id,
  s.started_at,
  s.duration_minutes,
  COUNT(DISTINCT o.observation_id) as observation_count,
  COUNT(DISTINCT i.impact_id) as impact_count
FROM activity_sessions s
JOIN activities a ON s.activity_id = a.activity_id
LEFT JOIN observations o ON s.session_id = o.session_id
LEFT JOIN impacts i ON s.session_id = i.session_id
WHERE s.session_status = 'completed'
GROUP BY s.user_id, s.session_id;

CREATE VIEW v_recommendation_accuracy AS
SELECT 
  r.recommendation_id,
  r.user_id,
  a.name as recommended_activity,
  r.suitability_score,
  r.accepted,
  CASE WHEN r.actually_chosen_activity_id = r.activity_id THEN 'followed' ELSE 'ignored' END as recommendation_followed,
  r.created_at
FROM recommendations r
JOIN activities a ON r.activity_id = a.activity_id
ORDER BY r.created_at DESC;

CREATE VIEW v_learning_status AS
SELECT 
  lp.user_id,
  lu.unit_type,
  COUNT(*) as total_units,
  SUM(CASE WHEN lp.status = 'confidently_understood' THEN 1 ELSE 0 END) as understood_count,
  AVG(lp.comprehension_level) as avg_comprehension
FROM learning_progress lp
JOIN learning_units lu ON lp.learning_unit_id = lu.learning_unit_id
GROUP BY lp.user_id, lu.unit_type;

-- ============================================================================
-- INITIAL DATA
-- ============================================================================

INSERT INTO roles (name, description, is_system_role) VALUES
('user', 'Regular user', TRUE),
('coach', 'Session facilitator', TRUE),
('moderator', 'Content reviewer', TRUE),
('admin', 'System administrator', TRUE),
('data_steward', 'Data quality & governance', TRUE);

INSERT INTO permissions (resource_type, action) VALUES
('activity', 'read'),
('activity', 'create'),
('activity', 'update'),
('activity', 'delete'),
('session', 'create'),
('session', 'read_own'),
('session', 'read_shared'),
('recommendation', 'read'),
('recommendation', 'feedback'),
('user_data', 'export'),
('user_data', 'delete');

INSERT INTO schema_migrations (version, description, status) VALUES
('001', 'Initial NeuroPlay v2.0 schema', 'applied');

-- ============================================================================
-- END SCHEMA
-- ============================================================================
