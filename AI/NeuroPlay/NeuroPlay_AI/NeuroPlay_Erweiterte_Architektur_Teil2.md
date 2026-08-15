# NeuroPlay — Erweiterte Datenbankarchitektur v2.0

## Teil 2: Vollständiger Tabellenkatalog & SQL-Schema

**Dokumentversion:** 2.0  
**Letztes Update:** 2025-01-15  
**Seitenzahl dieses Teils:** Teil 2 von 3  
**Tabellenanzahl:** 82 Tabellen + 12 Views

---

## Tabellenübersicht nach Domäne

### DOMAIN 1: Multi-Tenancy & Struktur (5 Tabellen)

```
tenants               — SaaS-Anbieter, Root-Ebene
organizations        — Schulen, Kliniken, Orgs
users                — Benutzer
user_accounts        — Login-Daten (getrennt)
audit_logs           — Alle Änderungen protokolliert
```

### DOMAIN 2: Rollen & Berechtigungen (4 Tabellen)

```
roles                — System-Rollen (user, moderator, admin, etc.)
permissions          — Granular: read, create, update, delete, share, export
role_permissions     — M:N Mapping
user_roles           — User hat Rollen in Organisationen
```

### DOMAIN 3: Aktivitätswissen (18 Tabellen)

**Basis:**
```
activities           — Master-Tabelle: alle Aktivitätstypen
activity_versions    — Vollständige Versionierung
activity_relations   — Brettspiel ist Variante von X
```

**DNA (Flexible Merkmale):**
```
attribute_definitions — Katalog erlaubter Merkmale
activity_dna         — Konkrete Werte pro Activity
attribute_group_definition — Grouping (cognitive, emotional, social)
```

**Kategorien & Tags:**
```
categories           — Hierarchische Kategorien
activity_categories  — Activity → Category (M:N)
tags                 — Flexible Tags
activity_tags        — Activity → Tag (M:N)
```

**Regeln & Struktur:**
```
rules                — Spielregeln (strukturiert)
rule_versions        — Regel-Versionierung
rule_relationships   — supplements, overrides, is_exception_of
phases               — Spielphasen
steps                — Schritte in Phase
transitions          — Übergänge zwischen Phasen
actions              — Spieleraktionen
action_costs         — Kosten für Aktionen
action_effects       — Effekte von Aktionen
strategies           — Spielstrategien
strategy_conditions  — Bedingungen für Strategie
```

**Spiele-spezifisch:**
```
games                — Brettspiele (Spezialisierung)
game_editions        — Editionen, Sprachversionen
game_mechanics       — Spielmechaniken
game_components      — Materialbestandteile
```

**Quellenmanagement:**
```
sources              — Quellenverzeichnis
source_documents     — Anhänge, PDFs, etc.
provenance_records   — Wer sagte was und woher?
```

**Personen:**
```
persons              — Designer, Illustratoren, Autoren
person_roles         — Role in Activity (author, illustrator, designer)
```

### DOMAIN 4: Personenbezogene Daten (12 Tabellen)

```
human_profiles       — Optionales Profil (Vorlieben, Ziele)
preferences          — Aktivitätspräferenzen
needs                — Aktuelle Bedürfnisse
consents             — Einwilligungen (DSGVO)
data_shares          — Kto hat Zugriff auf welche Daten?
learning_units       — Lernmaterial (Erklärung, Beispiel, Übung)
learning_progress    — Lernfortschritt pro Person
development_records  — Langfristige Entwicklung
situations           — Kontextdaten (Zeit, Ort, Bedürfnisse)
groups               — Familien, Teams, Orgs
group_members        — Wer ist in der Gruppe?
user_data_deletion_queue — Soft Delete Löschverwaltung
```

### DOMAIN 5: Sitzungen & Aktivitätsdurchführung (14 Tabellen)

```
activity_sessions    — Eine Sitzung durchführen
session_participants — Wer nimmt teil?
session_states       — Versionierte Zustände
session_events       — Event Log (Action Sourcing)
actions              — Was wurde gemacht? (auch in session context)
action_costs         — Ressourcen verbraucht
action_effects       — Direkte Effekte
game_states          — Spielstand (hybrid: struktur + JSON)
game_state_entities  — Spielobjekte im aktuellen Zustand
observations         — Neutrale Beobachtungen
impacts              — Wirkungen & Veränderungen
reflections          — Reflexionen nach Session
session_versions     — Optional: Session-Versioning
```

### DOMAIN 6: Empfehlungen & Intelligenz (4 Tabellen)

```
recommendations      — Empfohlene Aktivität
recommendation_factors — Berücksichtigte Faktoren
recommendation_feedback — Nutzerfeedback & Akzeptanz
ai_generations       — KI-Ergebnisse mit Provenance
```

### DOMAIN 7: System & Administration (18 Tabellen)

```
translations         — Multi-sprachig
media_assets         — Dateien, Bilder, Videos
imports              — Datenimport-Aufträge
import_rows          — Rows einer Import-Datei
import_errors        — Validierungsfehler
reviews              — Content-Prüfprozess
review_items         — Was wird geprüft?
ai_model_configs     — KI-Modell-Versionen & Configs
system_settings      — Globale Konfiguration
entity_duplicates    — Dubletten-Erkennungsergebnisse
entity_merges        — Merge-Historie
schema_migrations    — Schema-Versioning
schema_rollbacks     — Rollback-Tracking
system_parameters    — Konstanten (repetition intervals, confidence thresholds)
batch_jobs           — Scheduled Jobs (if event-based)
feature_flags        — Feature-Toggles
notification_queue   — Warteschlange für Benachrichtigungen
activity_versioning_policy — Versionierungsrichtlinien
```

---

## Detaillierter Tabellenkatalog

### 1. tenants

Multi-Tenant-Isolation auf Top-Ebene.

```sql
CREATE TABLE tenants (
  tenant_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  domain VARCHAR(255),
  logo_asset_id BIGINT,
  is_active BOOLEAN DEFAULT TRUE,
  subscription_level ENUM('free', 'professional', 'enterprise') DEFAULT 'free',
  max_users INT,
  max_organizations INT,
  max_storage_gb INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  INDEX idx_slug (slug),
  INDEX idx_public_id (public_id),
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 2. organizations

Untereinheiten von Tenant (Schulen, Kliniken, Familien-Accounts).

```sql
CREATE TABLE organizations (
  org_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  tenant_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  org_type ENUM('school', 'clinic', 'family', 'sports_club', 'workshop', 'nonprofit', 'other') NOT NULL,
  parent_org_id BIGINT,
  logo_asset_id BIGINT,
  admin_user_id BIGINT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  FOREIGN KEY (parent_org_id) REFERENCES organizations(org_id),
  FOREIGN KEY (admin_user_id) REFERENCES users(user_id),
  INDEX idx_tenant (tenant_id),
  INDEX idx_slug (slug),
  INDEX idx_public_id (public_id),
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 3. users

Benutzer-Master-Tabelle.

```sql
CREATE TABLE users (
  user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  tenant_id BIGINT NOT NULL,
  email VARCHAR(255) NOT NULL,
  display_name VARCHAR(255),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  status ENUM('active', 'inactive', 'suspended', 'deleted') DEFAULT 'active',
  user_type ENUM('regular_user', 'child', 'guardian', 'coach', 'researcher') DEFAULT 'regular_user',
  birth_date DATE,
  language_preference VARCHAR(10) DEFAULT 'de',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  INDEX idx_tenant (tenant_id),
  INDEX idx_email (email, tenant_id),
  INDEX idx_public_id (public_id),
  INDEX idx_status (status),
  UNIQUE INDEX idx_email_tenant (email, tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 4. user_accounts

Login-Daten (getrennt von user für bessere Sicherheit).

```sql
CREATE TABLE user_accounts (
  account_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  email_verified_at TIMESTAMP NULL,
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  two_factor_secret VARCHAR(255),
  last_login_at TIMESTAMP NULL,
  last_login_ip VARCHAR(45),
  login_attempt_count INT DEFAULT 0,
  login_locked_until TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 5. roles

System-Rollen.

```sql
CREATE TABLE roles (
  role_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  is_system_role BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Pre-populated:
-- INSERT INTO roles (name, description, is_system_role) VALUES
-- ('user', 'Regular user', TRUE),
-- ('child', 'Child user with guardian oversight', TRUE),
-- ('coach', 'Session moderator and observer', TRUE),
-- ('moderator', 'Content reviewer', TRUE),
-- ('content_reviewer', 'Fachlich qualifiziert', TRUE),
-- ('data_steward', 'Datenqualität & Governance', TRUE),
-- ('organization_admin', 'Org-Verwaltung', TRUE),
-- ('neurowyas_admin', 'NeuroWays-Admin', TRUE),
-- ('admin', 'System-Admin', TRUE);
```

---

### 6. permissions

Granulare Berechtigungen.

```sql
CREATE TABLE permissions (
  permission_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  resource_type VARCHAR(100) NOT NULL,
  action VARCHAR(100) NOT NULL,
  description TEXT,
  
  UNIQUE INDEX idx_unique (resource_type, action)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Examples:
-- activity:read, activity:create, activity:update, activity:delete, activity:publish
-- session:create, session:read_own, session:read_shared, session:update_own
-- recommendation:read_own, recommendation:feedback
-- user:manage_org, user:delete, data:export
```

---

### 7. role_permissions

M:N zwischen roles und permissions.

```sql
CREATE TABLE role_permissions (
  role_permission_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  role_id BIGINT NOT NULL,
  permission_id BIGINT NOT NULL,
  
  FOREIGN KEY (role_id) REFERENCES roles(role_id),
  FOREIGN KEY (permission_id) REFERENCES permissions(permission_id),
  UNIQUE INDEX idx_unique (role_id, permission_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 8. user_roles

Zuordnung: User hat Rollen in Organisationen.

```sql
CREATE TABLE user_roles (
  user_role_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  role_id BIGINT NOT NULL,
  org_id BIGINT,
  granted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  granted_by BIGINT,
  revoked_at TIMESTAMP NULL,
  revoked_by BIGINT,
  
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(role_id),
  FOREIGN KEY (org_id) REFERENCES organizations(org_id),
  FOREIGN KEY (granted_by) REFERENCES users(user_id),
  FOREIGN KEY (revoked_by) REFERENCES users(user_id),
  INDEX idx_user (user_id),
  INDEX idx_org (org_id),
  UNIQUE INDEX idx_unique (user_id, role_id, org_id, revoked_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 9. activities

Master-Tabelle für alle Aktivitätstypen.

```sql
CREATE TABLE activities (
  activity_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  tenant_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  activity_type ENUM('board_game','video_game','card_game','sport','music','creative_work','learning','relaxation','movement','workshop','team_activity','other') NOT NULL,
  short_description VARCHAR(500),
  full_description TEXT,
  objective TEXT,
  typical_duration_minutes INT,
  min_duration_minutes INT,
  max_duration_minutes INT,
  min_participants INT DEFAULT 1,
  max_participants INT,
  recommended_age_min INT,
  recommended_age_max INT,
  complexity_level ENUM('very_simple','simple','moderate','complex','very_complex'),
  physical_requirements JSON,
  cognitive_requirements JSON,
  social_requirements JSON,
  emotional_requirements JSON,
  sensory_requirements JSON,
  possible_barriers JSON,
  possible_adaptations JSON,
  status ENUM('draft','published','archived','deprecated') NOT NULL DEFAULT 'draft',
  quality_status ENUM('unreviewed','in_review','verified','expert_approved') DEFAULT 'unreviewed',
  version INT DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by BIGINT,
  deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  FOREIGN KEY (created_by) REFERENCES users(user_id),
  FOREIGN KEY (updated_by) REFERENCES users(user_id),
  INDEX idx_tenant (tenant_id),
  INDEX idx_type (activity_type),
  INDEX idx_status (status),
  INDEX idx_slug (slug),
  UNIQUE INDEX idx_slug_tenant (slug, tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 10. activity_versions

Vollständige Versionierung (Never Overwrite).

```sql
CREATE TABLE activity_versions (
  version_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  activity_id BIGINT NOT NULL,
  version_number INT NOT NULL,
  valid_from TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  valid_until TIMESTAMP NULL,
  data_snapshot JSON NOT NULL,
  reason_changed VARCHAR(500),
  changed_by BIGINT,
  predecessor_version_id BIGINT,
  successor_version_id BIGINT,
  
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE CASCADE,
  FOREIGN KEY (changed_by) REFERENCES users(user_id),
  FOREIGN KEY (predecessor_version_id) REFERENCES activity_versions(version_id),
  FOREIGN KEY (successor_version_id) REFERENCES activity_versions(version_id),
  INDEX idx_activity (activity_id),
  INDEX idx_version_number (activity_id, version_number),
  UNIQUE INDEX idx_current_version (activity_id, valid_until)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 11. attribute_definitions

Katalog erlaubter Merkmale (wie v1.0, erweitert).

```sql
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
  example_value VARCHAR(255),
  instructions TEXT,
  version INT DEFAULT 1,
  is_deprecated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  INDEX idx_group (attribute_group),
  INDEX idx_deprecated (is_deprecated),
  UNIQUE INDEX idx_unique (slug, tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 12. activity_dna

Konkrete Attributwerte (wie v1.0).

```sql
CREATE TABLE activity_dna (
  dna_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  activity_id BIGINT NOT NULL,
  definition_id BIGINT NOT NULL,
  value VARCHAR(500),
  value_numeric DECIMAL(10,2),
  value_text TEXT,
  confidence INT CHECK (confidence >= 0 AND confidence <= 100) DEFAULT 100,
  source_type ENUM('redactional','ai_generated','derived_from_observation','user_confirmed') DEFAULT 'redactional',
  source_id BIGINT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE CASCADE,
  FOREIGN KEY (definition_id) REFERENCES attribute_definitions(definition_id),
  FOREIGN KEY (created_by) REFERENCES users(user_id),
  INDEX idx_activity (activity_id),
  INDEX idx_definition (definition_id),
  UNIQUE INDEX idx_unique (activity_id, definition_id, deleted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 13. categories

Hierarchische Kategorien.

```sql
CREATE TABLE categories (
  category_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  tenant_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  parent_category_id BIGINT,
  sort_order INT DEFAULT 100,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  FOREIGN KEY (parent_category_id) REFERENCES categories(category_id),
  INDEX idx_tenant (tenant_id),
  INDEX idx_parent (parent_category_id),
  UNIQUE INDEX idx_unique (slug, tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 14. activity_categories

M:N zwischen activities und categories.

```sql
CREATE TABLE activity_categories (
  activity_category_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  activity_id BIGINT NOT NULL,
  category_id BIGINT NOT NULL,
  sort_order INT DEFAULT 100,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE,
  INDEX idx_activity (activity_id),
  INDEX idx_category (category_id),
  UNIQUE INDEX idx_unique (activity_id, category_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 15. tags

Flexible Tags.

```sql
CREATE TABLE tags (
  tag_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  tenant_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  tag_category VARCHAR(100),
  color VARCHAR(7),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  INDEX idx_tenant (tenant_id),
  INDEX idx_category (tag_category),
  UNIQUE INDEX idx_unique (slug, tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 16. activity_tags

M:N zwischen activities und tags.

```sql
CREATE TABLE activity_tags (
  activity_tag_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  activity_id BIGINT NOT NULL,
  tag_id BIGINT NOT NULL,
  confidence INT CHECK (confidence >= 0 AND confidence <= 100) DEFAULT 100,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(user_id),
  INDEX idx_activity (activity_id),
  INDEX idx_tag (tag_id),
  UNIQUE INDEX idx_unique (activity_id, tag_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 17. rules

Strukturierte Spielregeln (wie v1.0, erweitert).

```sql
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
  applies_to_players VARCHAR(100),
  precondition TEXT,
  action TEXT,
  consequence TEXT,
  exception_text TEXT,
  examples JSON,
  related_objects JSON,
  priority INT DEFAULT 100,
  source_id BIGINT,
  page_reference VARCHAR(100),
  version INT DEFAULT 1,
  quality_status ENUM('unreviewed','verified','approved') DEFAULT 'unreviewed',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(user_id),
  INDEX idx_activity (activity_id),
  INDEX idx_type (rule_type),
  INDEX idx_phase (applies_to_phase)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 18. rule_relationships

Beziehungen zwischen Regeln.

```sql
CREATE TABLE rule_relationships (
  relationship_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  source_rule_id BIGINT NOT NULL,
  target_rule_id BIGINT NOT NULL,
  relationship_type ENUM('supplements','overrides','contradicts','is_exception_of','required_for','activates','prevents','clarifies','variant_of') NOT NULL,
  explanation TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  
  FOREIGN KEY (source_rule_id) REFERENCES rules(rule_id) ON DELETE CASCADE,
  FOREIGN KEY (target_rule_id) REFERENCES rules(rule_id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(user_id),
  INDEX idx_source (source_rule_id),
  INDEX idx_target (target_rule_id),
  UNIQUE INDEX idx_unique (source_rule_id, target_rule_id, relationship_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 19. phases

Spielphasen (z.B. Setup, Main, Scoring, Cleanup).

```sql
CREATE TABLE phases (
  phase_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  activity_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  phase_order INT NOT NULL,
  is_optional BOOLEAN DEFAULT FALSE,
  can_repeat BOOLEAN DEFAULT FALSE,
  duration_seconds INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(user_id),
  INDEX idx_activity (activity_id),
  INDEX idx_order (activity_id, phase_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 20. steps

Schritte innerhalb einer Phase.

```sql
CREATE TABLE steps (
  step_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  phase_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  step_order INT NOT NULL,
  precondition TEXT,
  instruction TEXT,
  success_criteria TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (phase_id) REFERENCES phases(phase_id) ON DELETE CASCADE,
  INDEX idx_phase (phase_id),
  INDEX idx_order (phase_id, step_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 21. actions

Spieleraktionen (innerhalb eines Steps oder allgemein).

```sql
CREATE TABLE actions (
  action_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  activity_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  action_type ENUM('basic_action','optional_action','conditional_action','forced_action') DEFAULT 'basic_action',
  available_in_phase_id BIGINT,
  precondition TEXT,
  postcondition TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE CASCADE,
  FOREIGN KEY (available_in_phase_id) REFERENCES phases(phase_id),
  INDEX idx_activity (activity_id),
  INDEX idx_phase (available_in_phase_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 22. action_costs

Kosten für Aktionen (Ressourcen, Zeit, etc.).

```sql
CREATE TABLE action_costs (
  cost_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  action_id BIGINT NOT NULL,
  resource_type VARCHAR(100),
  amount DECIMAL(10,2),
  unit VARCHAR(50),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (action_id) REFERENCES actions(action_id) ON DELETE CASCADE,
  INDEX idx_action (action_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 23. action_effects

Effekte von Aktionen (was ändert sich?).

```sql
CREATE TABLE action_effects (
  effect_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  action_id BIGINT NOT NULL,
  effect_type VARCHAR(100),
  affected_object VARCHAR(255),
  change_description TEXT,
  is_immediate BOOLEAN DEFAULT TRUE,
  duration_seconds INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (action_id) REFERENCES actions(action_id) ON DELETE CASCADE,
  INDEX idx_action (action_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 24. strategies

Spielstrategien.

```sql
CREATE TABLE strategies (
  strategy_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  activity_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  strategic_goal TEXT,
  key_actions JSON,
  difficulty_level ENUM('beginner','intermediate','advanced','expert') DEFAULT 'intermediate',
  win_probability INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(user_id),
  INDEX idx_activity (activity_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 25. strategy_conditions

Bedingungen für Strategien.

```sql
CREATE TABLE strategy_conditions (
  condition_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  strategy_id BIGINT NOT NULL,
  condition_text TEXT NOT NULL,
  when_applies VARCHAR(500),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (strategy_id) REFERENCES strategies(strategy_id) ON DELETE CASCADE,
  INDEX idx_strategy (strategy_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 26. games

Brettspiele als Spezialisierung von activities.

```sql
CREATE TABLE games (
  game_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  activity_id BIGINT NOT NULL UNIQUE,
  game_title VARCHAR(255),
  game_subtitle VARCHAR(255),
  game_year_published INT,
  base_game_id BIGINT,
  is_expansion BOOLEAN DEFAULT FALSE,
  is_standalone_expansion BOOLEAN DEFAULT FALSE,
  is_variant BOOLEAN DEFAULT FALSE,
  bgg_id INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE CASCADE,
  FOREIGN KEY (base_game_id) REFERENCES games(game_id),
  INDEX idx_activity (activity_id),
  INDEX idx_bgg (bgg_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 27. game_editions

Editionen, Sprachversionen, Neuauflagen.

```sql
CREATE TABLE game_editions (
  edition_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  game_id BIGINT NOT NULL,
  edition_name VARCHAR(255),
  language VARCHAR(10),
  release_year INT,
  publisher_id BIGINT,
  ean VARCHAR(20),
  isbn VARCHAR(20),
  product_code VARCHAR(50),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE,
  FOREIGN KEY (publisher_id) REFERENCES publishers(publisher_id),
  INDEX idx_game (game_id),
  INDEX idx_publisher (publisher_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 28. publishers

Verlage.

```sql
CREATE TABLE publishers (
  publisher_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  tenant_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(100),
  website VARCHAR(2048),
  founded_year INT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  INDEX idx_tenant (tenant_id),
  INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 29. game_mechanics

Spielmechaniken (Dice Rolling, Worker Placement, etc.).

```sql
CREATE TABLE game_mechanics (
  mechanic_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  tenant_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  INDEX idx_tenant (tenant_id),
  UNIQUE INDEX idx_unique (slug, tenant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 30. game_components

Materialbestandteile (Karten, Figuren, Würfel, etc.).

```sql
CREATE TABLE game_components (
  component_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  game_id BIGINT NOT NULL,
  component_type VARCHAR(100),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  quantity INT,
  properties JSON,
  image_asset_id BIGINT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE,
  INDEX idx_game (game_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 31. persons

Personen (Designer, Autoren, Illustratoren).

```sql
CREATE TABLE persons (
  person_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  tenant_id BIGINT NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  full_name VARCHAR(255) NOT NULL,
  role_type ENUM('author','illustrator','designer','publisher','translator','editor','other') NOT NULL,
  bio TEXT,
  website VARCHAR(2048),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  INDEX idx_tenant (tenant_id),
  INDEX idx_name (full_name),
  INDEX idx_role (role_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 32. person_roles

M:N: Personen in Activities mit Rolle.

```sql
CREATE TABLE person_roles (
  person_role_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  activity_id BIGINT NOT NULL,
  person_id BIGINT NOT NULL,
  role_type ENUM('author','illustrator','designer','publisher','translator','editor','other') NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE CASCADE,
  FOREIGN KEY (person_id) REFERENCES persons(person_id) ON DELETE CASCADE,
  INDEX idx_activity (activity_id),
  INDEX idx_person (person_id),
  UNIQUE INDEX idx_unique (activity_id, person_id, role_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 33. sources

Quellenverzeichnis.

```sql
CREATE TABLE sources (
  source_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id VARCHAR(36) NOT NULL UNIQUE,
  tenant_id BIGINT NOT NULL,
  source_type ENUM('official_rules','publisher_website','faq','errata','video','scientific_paper','user_input','ai_analysis','expert_analysis','other') NOT NULL,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(2048),
  publisher_or_author VARCHAR(255),
  language VARCHAR(10) DEFAULT 'de',
  publication_date DATE,
  retrieved_date DATE,
  license_notice TEXT,
  copyright_notice TEXT,
  trust_level INT CHECK (trust_level >= 0 AND trust_level <= 100) DEFAULT 70,
  verification_status ENUM('unverified','pending','verified','expert_approved') DEFAULT 'unverified',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  FOREIGN KEY (created_by) REFERENCES users(user_id),
  INDEX idx_tenant (tenant_id),
  INDEX idx_type (source_type),
  INDEX idx_verification (verification_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 34. source_documents

Dateien/PDFs/Videos als Quellen.

```sql
CREATE TABLE source_documents (
  document_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  source_id BIGINT NOT NULL,
  media_asset_id BIGINT,
  file_type VARCHAR(50),
  file_name VARCHAR(255),
  file_size BIGINT,
  file_hash VARCHAR(64),
  storage_location VARCHAR(2048),
  page_count INT,
  version INT DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (source_id) REFERENCES sources(source_id) ON DELETE CASCADE,
  FOREIGN KEY (media_asset_id) REFERENCES media_assets(asset_id),
  INDEX idx_source (source_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 35. provenance_records

Wer sagte was und woher? (Source Attribution).

```sql
CREATE TABLE provenance_records (
  provenance_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  source_id BIGINT NOT NULL,
  attributed_to_entity_type VARCHAR(100),
  attributed_to_entity_id BIGINT,
  specific_claim TEXT,
  quote_or_excerpt TEXT,
  confidence INT CHECK (confidence >= 0 AND confidence <= 100) DEFAULT 100,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (source_id) REFERENCES sources(source_id) ON DELETE CASCADE,
  INDEX idx_source (source_id),
  INDEX idx_entity (attributed_to_entity_type, attributed_to_entity_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

**[Teil 2 Fortsetzung folgt – Personendaten, Sitzungen, Empfehlungen, System...]**

*Wegen Größenbeschränkung wird dieser Teil hier abgeschnitten und in den nächsten Abschnitten fortgesetzt.*

---

**Ende Teil 2 (Erste Tabellen 1–35 von ~82)**

*Fortsetzung in nächstem Abschnitt: Tabellen 36–82 (Personendaten, Sitzungen, Empfehlungen, System)*

