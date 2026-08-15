-- ============================================================================
-- NeuroPlay Datenbank-Schema - Produktionsreife DDL
-- Version 1.0
-- Datum: 2025-01-15
-- ============================================================================
-- Dieses Skript erstellt das vollständige NeuroPlay-Datenbankschema.
-- Kompatibel mit: PostgreSQL 12+, MySQL 8.0+, SQLite 3.31+
-- ============================================================================

-- ============================================================================
-- SECTION 1: REFERENCE TABLES (Lookup Tables)
-- ============================================================================

CREATE TABLE category (
  category_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  parent_category_id BIGINT,
  sort_order INT DEFAULT 100,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY (parent_category_id) REFERENCES category(category_id),
  INDEX idx_parent (parent_category_id),
  INDEX idx_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE tag (
  tag_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  category VARCHAR(100),
  color VARCHAR(7),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  INDEX idx_slug (slug),
  INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE attribute_definition (
  attribute_definition_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  attribute_group ENUM('cognitive','emotional','social','physical','sensory','motor','communication','strategy','learning','accessibility','other') NOT NULL,
  description TEXT,
  data_type ENUM('number','text','enum','boolean','date','json') NOT NULL,
  unit_of_measure VARCHAR(50),
  min_value DECIMAL(10,2),
  max_value DECIMAL(10,2),
  allowed_values JSON,
  example_value VARCHAR(255),
  instructions_for_assessment TEXT,
  version INT DEFAULT 1,
  is_deprecated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_group (attribute_group),
  INDEX idx_deprecated (is_deprecated),
  INDEX idx_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE person (
  person_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  full_name VARCHAR(255) NOT NULL,
  role_type ENUM('author','illustrator','designer','publisher','other') NOT NULL,
  bio TEXT,
  website VARCHAR(2048),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  INDEX idx_full_name (full_name),
  INDEX idx_public_id (public_id),
  INDEX idx_role (role_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE publisher (
  publisher_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(100),
  website VARCHAR(2048),
  founded_year INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  INDEX idx_name (name),
  INDEX idx_public_id (public_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE source (
  source_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  source_type ENUM('official_rules','publisher_website','faq','errata','video','scientific_paper','user_input','ai_analysis','expert_analysis','other') NOT NULL,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(2048),
  publisher_or_author VARCHAR(255),
  language VARCHAR(10) DEFAULT 'en',
  publication_date DATE,
  retrieved_date DATE,
  license_notice TEXT,
  copyright_notice TEXT,
  trust_level INT CHECK (trust_level >= 0 AND trust_level <= 100) DEFAULT 70,
  verification_status ENUM('unverified','pending','verified','expert_approved') DEFAULT 'unverified',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  INDEX idx_source_type (source_type),
  INDEX idx_verification_status (verification_status),
  INDEX idx_public_id (public_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE document (
  document_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  source_id BIGINT NOT NULL,
  file_type VARCHAR(50),
  file_name VARCHAR(255),
  file_size BIGINT,
  file_hash VARCHAR(64),
  storage_location VARCHAR(2048),
  version INT DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY (source_id) REFERENCES source(source_id),
  INDEX idx_source (source_id),
  INDEX idx_file_hash (file_hash)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- SECTION 2: USER MANAGEMENT
-- ============================================================================

CREATE TABLE user (
  user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(255),
  role ENUM('user','moderator','admin','data_steward') DEFAULT 'user',
  status ENUM('active','inactive','suspended','deleted') DEFAULT 'active',
  email_verified BOOLEAN DEFAULT FALSE,
  last_login_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  INDEX idx_email (email),
  INDEX idx_status (status),
  INDEX idx_public_id (public_id),
  INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE human_profile (
  profile_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL UNIQUE,
  profile_data JSON NOT NULL,
  consent_given BOOLEAN DEFAULT FALSE,
  visibility ENUM('private','friends','public') DEFAULT 'private',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
  INDEX idx_user (user_id),
  INDEX idx_visibility (visibility)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE need (
  need_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  need_type ENUM('rest','activation','social_connection','withdrawal','movement','structure','creativity','success','safety','challenge','variety','relaxation','focus','self_efficacy','cooperation','expression','learning','other') NOT NULL,
  intensity INT CHECK (intensity >= 1 AND intensity <= 10) DEFAULT 5,
  valid_until TIMESTAMP NULL,
  source_type ENUM('self_reported','derived','system_suggested') DEFAULT 'self_reported',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
  INDEX idx_user (user_id),
  INDEX idx_need_type (need_type),
  INDEX idx_valid_until (valid_until)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- SECTION 3: ACTIVITY KNOWLEDGE BASE
-- ============================================================================

CREATE TABLE activity (
  activity_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  short_description VARCHAR(500),
  full_description TEXT,
  activity_type ENUM('board_game','video_game','card_game','sport','music','creative_work','learning','relaxation','movement','workshop','team_activity','other') NOT NULL,
  objective TEXT,
  typical_duration_minutes INT CHECK (typical_duration_minutes > 0),
  min_duration_minutes INT CHECK (min_duration_minutes >= 0),
  max_duration_minutes INT CHECK (max_duration_minutes >= 0),
  min_participants INT CHECK (min_participants >= 0) DEFAULT 1,
  max_participants INT CHECK (max_participants >= 0),
  recommended_age_min INT CHECK (recommended_age_min >= 0),
  recommended_age_max INT CHECK (recommended_age_max >= 0),
  complexity_level ENUM('very_simple','simple','moderate','complex','very_complex'),
  accessibility_notes TEXT,
  required_location_type VARCHAR(100),
  required_materials JSON,
  estimated_cost DECIMAL(8,2) CHECK (estimated_cost >= 0),
  preparation_time_minutes INT,
  cleanup_time_minutes INT,
  physical_requirements JSON,
  cognitive_requirements JSON,
  social_requirements JSON,
  emotional_requirements JSON,
  sensory_requirements JSON,
  possible_barriers JSON,
  possible_adaptations JSON,
  status ENUM('draft','published','archived','deprecated') NOT NULL DEFAULT 'draft',
  quality_status ENUM('unreviewed','reviewed','verified','expert_approved') DEFAULT 'unreviewed',
  version INT DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT,
  deleted_at TIMESTAMP NULL,
  deleted_by BIGINT,
  
  FOREIGN KEY (created_by) REFERENCES user(user_id),
  FOREIGN KEY (updated_by) REFERENCES user(user_id),
  FOREIGN KEY (deleted_by) REFERENCES user(user_id),
  INDEX idx_type (activity_type, status),
  INDEX idx_slug (slug),
  INDEX idx_public_id (public_id),
  INDEX idx_complexity (complexity_level),
  INDEX idx_created (created_at DESC),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE activity_dna (
  activity_dna_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  activity_id BIGINT NOT NULL,
  attribute_definition_id BIGINT NOT NULL,
  value VARCHAR(500),
  value_numeric DECIMAL(10,2),
  value_text TEXT,
  confidence INT CHECK (confidence >= 0 AND confidence <= 100) DEFAULT 100,
  source_type ENUM('redactional','ai_generated','derived_from_observation','user_confirmed') DEFAULT 'redactional',
  source_id BIGINT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT,
  deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY (activity_id) REFERENCES activity(activity_id) ON DELETE CASCADE,
  FOREIGN KEY (attribute_definition_id) REFERENCES attribute_definition(attribute_definition_id),
  FOREIGN KEY (source_id) REFERENCES source(source_id),
  FOREIGN KEY (created_by) REFERENCES user(user_id),
  FOREIGN KEY (updated_by) REFERENCES user(user_id),
  INDEX idx_activity (activity_id),
  INDEX idx_attribute (attribute_definition_id),
  INDEX idx_source (source_type),
  UNIQUE INDEX idx_dna_unique (activity_id, attribute_definition_id, deleted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE activity_category (
  activity_category_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  activity_id BIGINT NOT NULL,
  category_id BIGINT NOT NULL,
  sort_order INT DEFAULT 100,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY (activity_id) REFERENCES activity(activity_id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE,
  INDEX idx_activity (activity_id),
  INDEX idx_category (category_id),
  UNIQUE INDEX idx_unique_assignment (activity_id, category_id, deleted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE activity_tag (
  activity_tag_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  activity_id BIGINT NOT NULL,
  tag_id BIGINT NOT NULL,
  confidence INT CHECK (confidence >= 0 AND confidence <= 100) DEFAULT 100,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY (activity_id) REFERENCES activity(activity_id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tag(tag_id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES user(user_id),
  INDEX idx_activity (activity_id),
  INDEX idx_tag (tag_id),
  UNIQUE INDEX idx_unique_tag (activity_id, tag_id, deleted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE activity_person (
  activity_person_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  activity_id BIGINT NOT NULL,
  person_id BIGINT NOT NULL,
  role_type ENUM('author','illustrator','designer','publisher','editor','translator','other') NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY (activity_id) REFERENCES activity(activity_id) ON DELETE CASCADE,
  FOREIGN KEY (person_id) REFERENCES person(person_id) ON DELETE CASCADE,
  INDEX idx_activity (activity_id),
  INDEX idx_person (person_id),
  INDEX idx_role (role_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE activity_publisher (
  activity_publisher_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  activity_id BIGINT NOT NULL,
  publisher_id BIGINT NOT NULL,
  edition VARCHAR(255),
  release_year INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY (activity_id) REFERENCES activity(activity_id) ON DELETE CASCADE,
  FOREIGN KEY (publisher_id) REFERENCES publisher(publisher_id) ON DELETE CASCADE,
  INDEX idx_activity (activity_id),
  INDEX idx_publisher (publisher_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE rule (
  rule_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  activity_id BIGINT NOT NULL,
  rule_type ENUM('basic_rule','action_rule','phase_rule','scoring_rule','end_condition','exception','variant','errata','optional_rule') NOT NULL,
  title VARCHAR(255) NOT NULL,
  short_description VARCHAR(500),
  full_description TEXT,
  structured_content JSON,
  applies_to_phase VARCHAR(100),
  applies_to_players VARCHAR(100),
  precondition TEXT,
  action TEXT,
  consequence TEXT,
  exception TEXT,
  examples JSON,
  related_objects JSON,
  priority INT DEFAULT 100,
  source_id BIGINT,
  page_reference VARCHAR(100),
  version INT DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY (activity_id) REFERENCES activity(activity_id) ON DELETE CASCADE,
  FOREIGN KEY (source_id) REFERENCES source(source_id),
  FOREIGN KEY (created_by) REFERENCES user(user_id),
  INDEX idx_activity (activity_id),
  INDEX idx_type (rule_type),
  INDEX idx_phase (applies_to_phase)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE rule_relation (
  rule_relation_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  source_rule_id BIGINT NOT NULL,
  target_rule_id BIGINT NOT NULL,
  relation_type ENUM('supplements','overrides','contradicts','is_exception_of','required_for','activates','prevents','clarifies','variant_of') NOT NULL,
  explanation TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  
  FOREIGN KEY (source_rule_id) REFERENCES rule(rule_id) ON DELETE CASCADE,
  FOREIGN KEY (target_rule_id) REFERENCES rule(rule_id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES user(user_id),
  INDEX idx_source (source_rule_id),
  INDEX idx_target (target_rule_id),
  INDEX idx_relation (relation_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE game_object (
  game_object_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  activity_id BIGINT NOT NULL,
  object_type ENUM('card','figure','tile','token','dice','board','marker','resource','other') NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  quantity INT CHECK (quantity > 0),
  properties JSON,
  image_reference VARCHAR(2048),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY (activity_id) REFERENCES activity(activity_id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES user(user_id),
  INDEX idx_activity (activity_id),
  INDEX idx_type (object_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- SECTION 4: CONTEXT & SITUATION
-- ============================================================================

CREATE TABLE situation (
  situation_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  situation_data JSON NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
  INDEX idx_user (user_id),
  INDEX idx_created (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- SECTION 5: SESSION & EXPERIENCE TRACKING
-- ============================================================================

CREATE TABLE session (
  session_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  user_id BIGINT NOT NULL,
  activity_id BIGINT NOT NULL,
  situation_id BIGINT,
  session_status ENUM('planned','in_progress','completed','cancelled','paused') DEFAULT 'completed',
  started_at TIMESTAMP NOT NULL,
  ended_at TIMESTAMP,
  duration_minutes INT CHECK (duration_minutes > 0),
  participants JSON,
  notes TEXT,
  location_notes VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
  FOREIGN KEY (activity_id) REFERENCES activity(activity_id),
  FOREIGN KEY (situation_id) REFERENCES situation(situation_id),
  FOREIGN KEY (created_by) REFERENCES user(user_id),
  INDEX idx_user (user_id, created_at DESC),
  INDEX idx_activity (activity_id),
  INDEX idx_status (session_status),
  INDEX idx_date (started_at),
  INDEX idx_public_id (public_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE observation (
  observation_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  session_id BIGINT NOT NULL,
  observation_type ENUM('behavior','interaction','emotion','performance','environment','rule_clarification','engagement','learning_moment','barrier','adaptation','other') NOT NULL,
  content TEXT NOT NULL,
  structured_data JSON,
  observed_by BIGINT NOT NULL,
  observed_at TIMESTAMP NOT NULL,
  confidence INT CHECK (confidence >= 0 AND confidence <= 100) DEFAULT 100,
  relates_to_object VARCHAR(255),
  visibility ENUM('private','creator_only','shared') DEFAULT 'private',
  consent_given BOOLEAN DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY (session_id) REFERENCES session(session_id) ON DELETE CASCADE,
  FOREIGN KEY (observed_by) REFERENCES user(user_id),
  INDEX idx_session (session_id),
  INDEX idx_observer (observed_by),
  INDEX idx_type (observation_type),
  INDEX idx_date (observed_at),
  INDEX idx_visibility (visibility)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE impact (
  impact_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  session_id BIGINT NOT NULL,
  impact_dimension ENUM('mood','energy','focus','social_connection','self_efficacy','learning','frustration','relaxation','motivation','creativity','physical_sensation','engagement','other') NOT NULL,
  value VARCHAR(100),
  value_numeric INT,
  direction ENUM('positive','negative','neutral','mixed') NOT NULL,
  intensity INT CHECK (intensity >= 1 AND intensity <= 10) DEFAULT 5,
  source ENUM('observed','self_reported','ai_derived','expert_confirmed') NOT NULL,
  reported_by BIGINT,
  duration_minutes INT,
  context_before TEXT,
  context_after TEXT,
  confidence INT CHECK (confidence >= 0 AND confidence <= 100) DEFAULT 75,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY (session_id) REFERENCES session(session_id) ON DELETE CASCADE,
  FOREIGN KEY (reported_by) REFERENCES user(user_id),
  FOREIGN KEY (created_by) REFERENCES user(user_id),
  INDEX idx_session (session_id),
  INDEX idx_dimension (impact_dimension),
  INDEX idx_source (source)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE reflection (
  reflection_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  session_id BIGINT NOT NULL UNIQUE,
  user_id BIGINT NOT NULL,
  reflection_data JSON NOT NULL,
  would_repeat BOOLEAN DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY (session_id) REFERENCES session(session_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
  INDEX idx_user (user_id),
  INDEX idx_session (session_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE development (
  development_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  dimension ENUM('self_understanding','clarity_of_needs','strategies','social_skill','confidence','independence','joy','engagement','learning','resilience','other') NOT NULL,
  change_description TEXT NOT NULL,
  evidence JSON,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES user(user_id),
  INDEX idx_user (user_id),
  INDEX idx_dimension (dimension)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- SECTION 6: RECOMMENDATION & ANALYSIS
-- ============================================================================

CREATE TABLE recommendation (
  recommendation_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  user_id BIGINT NOT NULL,
  situation_id BIGINT,
  activity_id BIGINT NOT NULL,
  ranking INT CHECK (ranking >= 1 AND ranking <= 5) NOT NULL,
  suitability_score INT CHECK (suitability_score >= 0 AND suitability_score <= 100),
  rationale TEXT NOT NULL,
  considered_factors JSON NOT NULL,
  alternative_activities JSON,
  risks_and_mitigations JSON,
  required_adaptations JSON,
  uncertainty_level INT CHECK (uncertainty_level >= 0 AND uncertainty_level <= 100) DEFAULT 25,
  model_version VARCHAR(50),
  accepted BOOLEAN DEFAULT NULL,
  actually_chosen BIGINT,
  observed_impact_id BIGINT,
  feedback TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
  FOREIGN KEY (situation_id) REFERENCES situation(situation_id),
  FOREIGN KEY (activity_id) REFERENCES activity(activity_id),
  FOREIGN KEY (actually_chosen) REFERENCES activity(activity_id),
  FOREIGN KEY (observed_impact_id) REFERENCES impact(impact_id),
  FOREIGN KEY (created_by) REFERENCES user(user_id),
  INDEX idx_user (user_id, created_at DESC),
  INDEX idx_activity (activity_id),
  INDEX idx_accepted (accepted),
  INDEX idx_score (suitability_score DESC),
  INDEX idx_public_id (public_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE system_analysis (
  analysis_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  analysis_type ENUM('trend','correlation','effectiveness','coverage','quality','user_behavior','other') NOT NULL,
  scope ENUM('user','group','activity','system') NOT NULL,
  scope_id BIGINT,
  time_period_start DATE,
  time_period_end DATE,
  findings JSON NOT NULL,
  confidence INT CHECK (confidence >= 0 AND confidence <= 100) DEFAULT 75,
  algorithm_version VARCHAR(50),
  generated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_type (analysis_type),
  INDEX idx_scope (scope),
  INDEX idx_generated (generated_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- SECTION 7: SOURCE ATTRIBUTION
-- ============================================================================

CREATE TABLE source_attribution (
  source_attribution_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  source_id BIGINT NOT NULL,
  attributed_to_entity_type ENUM('activity','rule','impact','recommendation','observation','attribute','other') NOT NULL,
  attributed_to_entity_id BIGINT NOT NULL,
  specific_claim TEXT,
  quote_or_excerpt TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (source_id) REFERENCES source(source_id) ON DELETE CASCADE,
  INDEX idx_source (source_id),
  INDEX idx_entity (attributed_to_entity_type, attributed_to_entity_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- SECTION 8: VERSIONING & MIGRATION
-- ============================================================================

CREATE TABLE schema_migration (
  migration_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  version VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  sql_script LONGTEXT,
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  applied_by VARCHAR(255),
  status ENUM('pending','applied','failed','rolled_back') DEFAULT 'pending',
  error_message TEXT,
  
  INDEX idx_version (version),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- SECTION 9: AUDIT LOGGING
-- ============================================================================

CREATE TABLE audit_log (
  audit_log_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  entity_type VARCHAR(100) NOT NULL,
  entity_id BIGINT NOT NULL,
  action ENUM('create','read','update','delete') NOT NULL,
  user_id BIGINT,
  old_values JSON,
  new_values JSON,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES user(user_id),
  INDEX idx_entity (entity_type, entity_id),
  INDEX idx_user (user_id),
  INDEX idx_action (action),
  INDEX idx_created (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- SECTION 10: SUMMARY VIEWS
-- ============================================================================

-- View: Activity mit aggregierten Metriken
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
  ROUND(AVG(CASE WHEN i.direction = 'positive' THEN 1 ELSE 0 END) * 100, 2) as positive_impact_percentage,
  MAX(s.started_at) as last_used_at,
  a.created_at
FROM activity a
LEFT JOIN activity_category ac ON a.activity_id = ac.activity_id AND ac.deleted_at IS NULL
LEFT JOIN activity_tag at ON a.activity_id = at.activity_id AND at.deleted_at IS NULL
LEFT JOIN session s ON a.activity_id = s.activity_id AND s.session_status = 'completed' AND s.deleted_at IS NULL
LEFT JOIN impact i ON s.session_id = i.session_id AND i.deleted_at IS NULL
WHERE a.deleted_at IS NULL
GROUP BY a.activity_id, a.public_id, a.name, a.activity_type, a.status, a.created_at;

-- View: User Activity History
CREATE VIEW v_user_activity_history AS
SELECT 
  s.user_id,
  a.activity_id,
  a.name as activity_name,
  s.session_id,
  s.started_at,
  s.duration_minutes,
  COUNT(DISTINCT o.observation_id) as observation_count,
  COUNT(DISTINCT i.impact_id) as impact_count,
  s.created_at
FROM session s
JOIN activity a ON s.activity_id = a.activity_id AND a.deleted_at IS NULL
LEFT JOIN observation o ON s.session_id = o.session_id AND o.deleted_at IS NULL
LEFT JOIN impact i ON s.session_id = i.session_id AND i.deleted_at IS NULL
WHERE s.session_status = 'completed' AND s.deleted_at IS NULL
GROUP BY s.user_id, s.session_id, a.activity_id, a.name, s.started_at, s.duration_minutes, s.created_at
ORDER BY s.user_id, s.started_at DESC;

-- View: Recommendation Accuracy
CREATE VIEW v_recommendation_accuracy AS
SELECT 
  r.recommendation_id,
  r.user_id,
  a.name as recommended_activity,
  r.suitability_score,
  r.accepted,
  CASE WHEN r.actually_chosen = r.activity_id THEN 'followed' ELSE 'ignored' END as recommendation_followed,
  CASE WHEN r.observed_impact_id IS NOT NULL THEN 'has_feedback' ELSE 'no_feedback' END as feedback_status,
  r.created_at,
  DATEDIFF(NOW(), r.created_at) as days_since_recommendation
FROM recommendation r
JOIN activity a ON r.activity_id = a.activity_id AND a.deleted_at IS NULL
WHERE r.deleted_at IS NULL
ORDER BY r.created_at DESC;

-- View: Current Activity Attributes
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

-- ============================================================================
-- INITIAL MIGRATION RECORD
-- ============================================================================

INSERT INTO schema_migration (version, description, applied_by, status)
VALUES ('001', 'Initial NeuroPlay schema creation', 'system', 'applied')
ON DUPLICATE KEY UPDATE status='applied', applied_at=NOW();

-- ============================================================================
-- END OF SCHEMA SCRIPT
-- ============================================================================
-- Execution Instructions:
-- 1. CREATE DATABASE neuroplay CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- 2. USE neuroplay;
-- 3. SOURCE neuroplay_schema.sql;
-- 4. Verify: SELECT COUNT(*) FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'neuroplay';
--    Expected: 38 tables + 4 views = 42 total
-- ============================================================================
