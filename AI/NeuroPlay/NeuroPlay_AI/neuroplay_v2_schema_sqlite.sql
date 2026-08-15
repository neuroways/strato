-- ============================================================================
-- NeuroPlay v2.0 — SQLite Schema
-- Konvertiert von MySQL
-- ============================================================================

-- DOMAIN 1: Multi-Tenancy

CREATE TABLE IF NOT EXISTS tenants (
  tenant_id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  domain TEXT,
  is_active INTEGER DEFAULT 1,
  subscription_level TEXT DEFAULT 'free',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME
);

CREATE TABLE IF NOT EXISTS organizations (
  org_id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT NOT NULL UNIQUE,
  tenant_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  org_type TEXT NOT NULL,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id)
);

CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT NOT NULL UNIQUE,
  tenant_id INTEGER NOT NULL,
  email TEXT NOT NULL,
  display_name TEXT,
  status TEXT DEFAULT 'active',
  user_type TEXT DEFAULT 'regular_user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  UNIQUE(email, tenant_id)
);

CREATE TABLE IF NOT EXISTS user_accounts (
  account_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  email_verified INTEGER DEFAULT 0,
  last_login_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS audit_logs (
  log_id INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id INTEGER NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id INTEGER NOT NULL,
  action TEXT NOT NULL,
  user_id INTEGER,
  old_values TEXT,
  new_values TEXT,
  ip_address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- DOMAIN 2: Rollen & Berechtigungen

CREATE TABLE IF NOT EXISTS roles (
  role_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  is_system_role INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS permissions (
  permission_id INTEGER PRIMARY KEY AUTOINCREMENT,
  resource_type TEXT NOT NULL,
  action TEXT NOT NULL,
  description TEXT,
  UNIQUE(resource_type, action)
);

CREATE TABLE IF NOT EXISTS role_permissions (
  role_permission_id INTEGER PRIMARY KEY AUTOINCREMENT,
  role_id INTEGER NOT NULL,
  permission_id INTEGER NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(role_id),
  FOREIGN KEY (permission_id) REFERENCES permissions(permission_id),
  UNIQUE(role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS user_roles (
  user_role_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  role_id INTEGER NOT NULL,
  org_id INTEGER,
  granted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  revoked_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(role_id),
  FOREIGN KEY (org_id) REFERENCES organizations(org_id)
);

-- DOMAIN 3: Aktivitätswissen

CREATE TABLE IF NOT EXISTS activities (
  activity_id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT NOT NULL UNIQUE,
  tenant_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  activity_type TEXT NOT NULL,
  short_description TEXT,
  full_description TEXT,
  objective TEXT,
  typical_duration_minutes INTEGER,
  min_participants INTEGER DEFAULT 1,
  max_participants INTEGER,
  recommended_age_min INTEGER,
  complexity_level TEXT,
  status TEXT DEFAULT 'draft',
  quality_status TEXT DEFAULT 'unreviewed',
  version INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  FOREIGN KEY (created_by) REFERENCES users(user_id),
  UNIQUE(slug, tenant_id)
);

CREATE TABLE IF NOT EXISTS activity_versions (
  version_id INTEGER PRIMARY KEY AUTOINCREMENT,
  activity_id INTEGER NOT NULL,
  version_number INTEGER NOT NULL,
  valid_from DATETIME DEFAULT CURRENT_TIMESTAMP,
  valid_until DATETIME,
  data_snapshot TEXT NOT NULL,
  reason_changed TEXT,
  changed_by INTEGER,
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE CASCADE,
  FOREIGN KEY (changed_by) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS attribute_definitions (
  definition_id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT NOT NULL UNIQUE,
  tenant_id INTEGER,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  attribute_group TEXT NOT NULL,
  description TEXT,
  data_type TEXT NOT NULL,
  unit_of_measure TEXT,
  min_value REAL,
  max_value REAL,
  allowed_values TEXT,
  is_deprecated INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  UNIQUE(slug, tenant_id)
);

CREATE TABLE IF NOT EXISTS activity_dna (
  dna_id INTEGER PRIMARY KEY AUTOINCREMENT,
  activity_id INTEGER NOT NULL,
  definition_id INTEGER NOT NULL,
  value TEXT,
  value_numeric REAL,
  confidence INTEGER DEFAULT 100,
  source_type TEXT DEFAULT 'redactional',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE CASCADE,
  FOREIGN KEY (definition_id) REFERENCES attribute_definitions(definition_id),
  UNIQUE(activity_id, definition_id)
);

CREATE TABLE IF NOT EXISTS categories (
  category_id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT NOT NULL UNIQUE,
  tenant_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  UNIQUE(slug, tenant_id)
);

CREATE TABLE IF NOT EXISTS activity_categories (
  activity_category_id INTEGER PRIMARY KEY AUTOINCREMENT,
  activity_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE,
  UNIQUE(activity_id, category_id)
);

CREATE TABLE IF NOT EXISTS tags (
  tag_id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT NOT NULL UNIQUE,
  tenant_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  tag_category TEXT,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  UNIQUE(slug, tenant_id)
);

CREATE TABLE IF NOT EXISTS activity_tags (
  activity_tag_id INTEGER PRIMARY KEY AUTOINCREMENT,
  activity_id INTEGER NOT NULL,
  tag_id INTEGER NOT NULL,
  confidence INTEGER DEFAULT 100,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE,
  UNIQUE(activity_id, tag_id)
);

CREATE TABLE IF NOT EXISTS rules (
  rule_id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT NOT NULL UNIQUE,
  activity_id INTEGER NOT NULL,
  rule_type TEXT NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT,
  full_description TEXT,
  structured_content TEXT,
  applies_to_phase TEXT,
  priority INTEGER DEFAULT 100,
  version INTEGER DEFAULT 1,
  quality_status TEXT DEFAULT 'unreviewed',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS rule_relationships (
  relationship_id INTEGER PRIMARY KEY AUTOINCREMENT,
  source_rule_id INTEGER NOT NULL,
  target_rule_id INTEGER NOT NULL,
  relationship_type TEXT NOT NULL,
  explanation TEXT,
  FOREIGN KEY (source_rule_id) REFERENCES rules(rule_id) ON DELETE CASCADE,
  FOREIGN KEY (target_rule_id) REFERENCES rules(rule_id) ON DELETE CASCADE,
  UNIQUE(source_rule_id, target_rule_id, relationship_type)
);

CREATE TABLE IF NOT EXISTS phases (
  phase_id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT NOT NULL UNIQUE,
  activity_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  phase_order INTEGER NOT NULL,
  is_optional INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS steps (
  step_id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT NOT NULL UNIQUE,
  phase_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  step_order INTEGER NOT NULL,
  instruction TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (phase_id) REFERENCES phases(phase_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS actions (
  action_id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT NOT NULL UNIQUE,
  activity_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  action_type TEXT DEFAULT 'basic_action',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS strategies (
  strategy_id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT NOT NULL UNIQUE,
  activity_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  strategic_goal TEXT,
  difficulty_level TEXT DEFAULT 'intermediate',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE CASCADE
);

-- DOMAIN 4: Personendaten

CREATE TABLE IF NOT EXISTS human_profiles (
  profile_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL UNIQUE,
  profile_data TEXT NOT NULL,
  consent_given INTEGER DEFAULT 0,
  visibility TEXT DEFAULT 'private',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS preferences (
  preference_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  preferred_duration_min INTEGER,
  preferred_duration_max INTEGER,
  preferred_complexity TEXT,
  disliked_themes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS needs (
  need_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  need_type TEXT NOT NULL,
  intensity INTEGER DEFAULT 5,
  valid_from DATETIME DEFAULT CURRENT_TIMESTAMP,
  valid_until DATETIME,
  source_type TEXT DEFAULT 'self_reported',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS consents (
  consent_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  consent_type TEXT NOT NULL,
  granted INTEGER NOT NULL,
  granted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  revoked_at DATETIME,
  legal_basis TEXT NOT NULL,
  expires_at DATETIME,
  purpose TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS data_shares (
  share_id INTEGER PRIMARY KEY AUTOINCREMENT,
  data_owner_id INTEGER NOT NULL,
  data_type TEXT NOT NULL,
  shared_with_user_id INTEGER,
  shared_with_org_id INTEGER,
  access_level TEXT DEFAULT 'read',
  granted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME,
  FOREIGN KEY (data_owner_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (shared_with_user_id) REFERENCES users(user_id),
  FOREIGN KEY (shared_with_org_id) REFERENCES organizations(org_id)
);

CREATE TABLE IF NOT EXISTS learning_units (
  learning_unit_id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT NOT NULL UNIQUE,
  tenant_id INTEGER NOT NULL,
  related_activity_id INTEGER,
  unit_type TEXT NOT NULL,
  title_en TEXT NOT NULL,
  content_en TEXT,
  difficulty_level TEXT DEFAULT 'intermediate',
  estimated_duration_minutes INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  FOREIGN KEY (related_activity_id) REFERENCES activities(activity_id)
);

CREATE TABLE IF NOT EXISTS learning_progress (
  progress_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  learning_unit_id INTEGER NOT NULL,
  status TEXT DEFAULT 'unknown',
  comprehension_level INTEGER DEFAULT 0,
  uncertainty_level INTEGER DEFAULT 100,
  repetitions_count INTEGER DEFAULT 0,
  last_reviewed_at DATETIME,
  next_review_at DATETIME,
  confirmed_understanding INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (learning_unit_id) REFERENCES learning_units(learning_unit_id) ON DELETE CASCADE,
  UNIQUE(user_id, learning_unit_id)
);

CREATE TABLE IF NOT EXISTS development_records (
  record_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  development_dimension TEXT NOT NULL,
  change_description TEXT NOT NULL,
  evidence_observations TEXT,
  verified INTEGER DEFAULT 0,
  verified_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (verified_by) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS situations (
  situation_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  situation_data TEXT NOT NULL,
  available_time_minutes INTEGER,
  location_type TEXT,
  group_size INTEGER,
  available_energy TEXT,
  mood TEXT,
  stress_level INTEGER,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS groups (
  group_id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT NOT NULL UNIQUE,
  tenant_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  group_type TEXT NOT NULL,
  description TEXT,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id)
);

CREATE TABLE IF NOT EXISTS group_members (
  member_id INTEGER PRIMARY KEY AUTOINCREMENT,
  group_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  role_in_group TEXT DEFAULT 'member',
  joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  left_at DATETIME,
  FOREIGN KEY (group_id) REFERENCES groups(group_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  UNIQUE(group_id, user_id, left_at)
);

-- DOMAIN 5: Sitzungen

CREATE TABLE IF NOT EXISTS activity_sessions (
  session_id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT NOT NULL UNIQUE,
  user_id INTEGER NOT NULL,
  activity_id INTEGER NOT NULL,
  situation_id INTEGER,
  group_id INTEGER,
  session_status TEXT DEFAULT 'planned',
  started_at DATETIME NOT NULL,
  ended_at DATETIME,
  duration_minutes INTEGER,
  location_notes TEXT,
  visibility TEXT DEFAULT 'private',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id),
  FOREIGN KEY (situation_id) REFERENCES situations(situation_id),
  FOREIGN KEY (group_id) REFERENCES groups(group_id),
  FOREIGN KEY (created_by) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS session_participants (
  participant_id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id INTEGER NOT NULL,
  user_id INTEGER,
  external_name TEXT,
  role_in_session TEXT DEFAULT 'player',
  score INTEGER,
  won INTEGER,
  FOREIGN KEY (session_id) REFERENCES activity_sessions(session_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS session_events (
  event_id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id INTEGER NOT NULL,
  event_sequence INTEGER NOT NULL,
  event_type TEXT NOT NULL,
  actor_id INTEGER,
  event_data TEXT NOT NULL,
  event_result TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES activity_sessions(session_id) ON DELETE CASCADE,
  FOREIGN KEY (actor_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS session_states (
  state_id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id INTEGER NOT NULL,
  state_version INTEGER NOT NULL,
  game_state_id INTEGER,
  current_round INTEGER,
  current_phase TEXT,
  round_order TEXT,
  resources TEXT,
  points TEXT,
  snapshot_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES activity_sessions(session_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS game_states (
  game_state_id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id INTEGER NOT NULL UNIQUE,
  current_round INTEGER DEFAULT 0,
  current_phase TEXT,
  round_order TEXT,
  resource_pools TEXT,
  player_resources TEXT,
  points TEXT,
  board_configuration TEXT,
  visible_information TEXT,
  hidden_information TEXT,
  active_effects TEXT,
  version INTEGER DEFAULT 1,
  last_updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES activity_sessions(session_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS game_state_entities (
  entity_id INTEGER PRIMARY KEY AUTOINCREMENT,
  game_state_id INTEGER NOT NULL,
  entity_type TEXT NOT NULL,
  entity_name TEXT,
  owner_player_id INTEGER,
  quantity INTEGER DEFAULT 1,
  position TEXT,
  properties TEXT,
  is_visible INTEGER DEFAULT 1,
  FOREIGN KEY (game_state_id) REFERENCES game_states(game_state_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS observations (
  observation_id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id INTEGER NOT NULL,
  observation_type TEXT NOT NULL,
  content TEXT NOT NULL,
  observed_by INTEGER NOT NULL,
  observed_at DATETIME NOT NULL,
  confidence INTEGER DEFAULT 100,
  visibility TEXT DEFAULT 'private',
  consent_given INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES activity_sessions(session_id) ON DELETE CASCADE,
  FOREIGN KEY (observed_by) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS impacts (
  impact_id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id INTEGER NOT NULL,
  impact_dimension TEXT NOT NULL,
  value TEXT,
  direction TEXT NOT NULL,
  intensity INTEGER DEFAULT 5,
  source TEXT NOT NULL,
  reported_by INTEGER,
  duration_minutes INTEGER,
  confidence INTEGER DEFAULT 75,
  visibility TEXT DEFAULT 'private',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES activity_sessions(session_id) ON DELETE CASCADE,
  FOREIGN KEY (reported_by) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS reflections (
  reflection_id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  reflection_data TEXT NOT NULL,
  would_repeat INTEGER,
  visibility TEXT DEFAULT 'private',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES activity_sessions(session_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  UNIQUE(session_id, user_id)
);

-- DOMAIN 6: Empfehlungen

CREATE TABLE IF NOT EXISTS recommendations (
  recommendation_id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT NOT NULL UNIQUE,
  user_id INTEGER NOT NULL,
  situation_id INTEGER,
  activity_id INTEGER NOT NULL,
  ranking INTEGER DEFAULT 1,
  suitability_score INTEGER,
  rationale TEXT NOT NULL,
  considered_factors TEXT NOT NULL,
  alternative_activities TEXT,
  risks_and_mitigations TEXT,
  required_adaptations TEXT,
  uncertainty_level INTEGER DEFAULT 25,
  model_version TEXT,
  accepted INTEGER,
  actually_chosen_activity_id INTEGER,
  observed_impact_id INTEGER,
  feedback_text TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (situation_id) REFERENCES situations(situation_id),
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id),
  FOREIGN KEY (observed_impact_id) REFERENCES impacts(impact_id)
);

CREATE TABLE IF NOT EXISTS recommendation_factors (
  factor_id INTEGER PRIMARY KEY AUTOINCREMENT,
  recommendation_id INTEGER NOT NULL,
  factor_type TEXT NOT NULL,
  factor_value TEXT,
  weight INTEGER,
  description TEXT,
  FOREIGN KEY (recommendation_id) REFERENCES recommendations(recommendation_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS recommendation_feedback (
  feedback_id INTEGER PRIMARY KEY AUTOINCREMENT,
  recommendation_id INTEGER NOT NULL,
  feedback_type TEXT NOT NULL,
  rating INTEGER,
  comment TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (recommendation_id) REFERENCES recommendations(recommendation_id) ON DELETE CASCADE
);

-- DOMAIN 7: System

CREATE TABLE IF NOT EXISTS ai_generations (
  generation_id INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id INTEGER NOT NULL,
  provider TEXT,
  model_name TEXT,
  model_version TEXT,
  input_references TEXT,
  output_text TEXT,
  confidence INTEGER,
  review_status TEXT DEFAULT 'pending',
  reviewed_by INTEGER,
  reviewed_at DATETIME,
  approval_status TEXT DEFAULT 'draft',
  entity_type TEXT,
  entity_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  FOREIGN KEY (reviewed_by) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS translations (
  translation_id INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id INTEGER,
  translatable_entity_type TEXT,
  translatable_entity_id INTEGER,
  field_name TEXT,
  language TEXT,
  translated_value TEXT,
  translation_status TEXT DEFAULT 'draft',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  UNIQUE(translatable_entity_type, translatable_entity_id, field_name, language)
);

CREATE TABLE IF NOT EXISTS media_assets (
  asset_id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT NOT NULL UNIQUE,
  tenant_id INTEGER NOT NULL,
  file_name TEXT NOT NULL,
  media_type TEXT NOT NULL,
  mime_type TEXT,
  file_size INTEGER,
  storage_location TEXT,
  file_hash TEXT,
  alt_text TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id)
);

CREATE TABLE IF NOT EXISTS imports (
  import_id INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id INTEGER NOT NULL,
  import_type TEXT NOT NULL,
  source_type TEXT NOT NULL,
  file_name TEXT,
  import_status TEXT DEFAULT 'pending',
  total_rows INTEGER,
  successful_rows INTEGER DEFAULT 0,
  failed_rows INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id)
);

CREATE TABLE IF NOT EXISTS import_rows (
  row_id INTEGER PRIMARY KEY AUTOINCREMENT,
  import_id INTEGER NOT NULL,
  row_number INTEGER NOT NULL,
  source_data TEXT,
  mapping_status TEXT DEFAULT 'pending',
  error_message TEXT,
  FOREIGN KEY (import_id) REFERENCES imports(import_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reviews (
  review_id INTEGER PRIMARY KEY AUTOINCREMENT,
  review_type TEXT NOT NULL,
  entity_type TEXT,
  entity_id INTEGER,
  review_status TEXT DEFAULT 'pending',
  assigned_to INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME,
  FOREIGN KEY (assigned_to) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS schema_migrations (
  migration_id INTEGER PRIMARY KEY AUTOINCREMENT,
  version TEXT NOT NULL UNIQUE,
  description TEXT,
  applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'applied'
);

-- ============================================================================
-- INITIAL DATA
-- ============================================================================

INSERT OR IGNORE INTO roles (role_id, name, description, is_system_role) VALUES
(1, 'user', 'Regular user', 1),
(2, 'coach', 'Session facilitator', 1),
(3, 'moderator', 'Content reviewer', 1),
(4, 'admin', 'System administrator', 1),
(5, 'data_steward', 'Data quality & governance', 1);

INSERT OR IGNORE INTO permissions (resource_type, action) VALUES
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

INSERT OR IGNORE INTO schema_migrations (version, description, status) VALUES
('001', 'Initial NeuroPlay v2.0 schema', 'applied');

-- ============================================================================
-- END SCHEMA
-- ============================================================================
