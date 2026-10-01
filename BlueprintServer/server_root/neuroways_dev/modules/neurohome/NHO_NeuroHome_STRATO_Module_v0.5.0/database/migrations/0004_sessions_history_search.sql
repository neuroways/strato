-- NeuroHome v0.4.1 · Sessions, observations, history and renewable search

CREATE TABLE IF NOT EXISTS NHO_SESSIONS (
    id BINARY(16) NOT NULL,
    home_id BINARY(16) NOT NULL,
    person_id BINARY(16) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'CHECK_IN',
    timezone_name VARCHAR(64) NOT NULL DEFAULT 'Europe/Berlin',
    started_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    ended_at DATETIME(6) NULL,
    row_version BIGINT UNSIGNED NOT NULL DEFAULT 1,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    KEY idx_nho_sessions_home_time (home_id, started_at),
    KEY idx_nho_sessions_person_status (person_id, status, started_at),
    CONSTRAINT fk_nho_sessions_home FOREIGN KEY (home_id) REFERENCES NHO_HOMES (id) ON DELETE RESTRICT,
    CONSTRAINT chk_nho_sessions_status CHECK (status IN ('CHECK_IN','SCOPED','RECOMMENDED','ACTIVE','PAUSED','CLOSED','ABANDONED')),
    CONSTRAINT chk_nho_sessions_window CHECK (ended_at IS NULL OR ended_at >= started_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_SESSION_CHECKINS (
    id BINARY(16) NOT NULL,
    session_id BINARY(16) NOT NULL,
    phase_code VARCHAR(64) NOT NULL,
    available_minutes SMALLINT UNSIGNED NULL,
    energy_code VARCHAR(64) NULL,
    feeling_code VARCHAR(64) NULL,
    home_feeling_code VARCHAR(64) NULL,
    main_problem_code VARCHAR(64) NULL,
    note_text VARCHAR(500) NULL,
    recorded_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_session_checkins_phase (session_id, phase_code),
    CONSTRAINT fk_nho_session_checkins_session FOREIGN KEY (session_id) REFERENCES NHO_SESSIONS (id) ON DELETE RESTRICT,
    CONSTRAINT chk_nho_session_checkins_phase CHECK (phase_code IN ('START','RECHECK'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_SESSION_SCOPES (
    id BINARY(16) NOT NULL,
    session_id BINARY(16) NOT NULL,
    revision_no SMALLINT UNSIGNED NOT NULL,
    scope_type_code VARCHAR(64) NOT NULL,
    title VARCHAR(160) NULL,
    minutes_per_place SMALLINT UNSIGNED NULL,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_session_scopes_revision (session_id, revision_no),
    CONSTRAINT fk_nho_session_scopes_session FOREIGN KEY (session_id) REFERENCES NHO_SESSIONS (id) ON DELETE RESTRICT,
    CONSTRAINT chk_nho_session_scopes_minutes CHECK (minutes_per_place IS NULL OR minutes_per_place BETWEEN 1 AND 240)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_SESSION_SCOPE_TARGETS (
    id BINARY(16) NOT NULL,
    session_scope_id BINARY(16) NOT NULL,
    target_kind VARCHAR(32) NOT NULL,
    place_id BINARY(16) NULL,
    zone_id BINARY(16) NULL,
    category_id BINARY(16) NULL,
    sequence_no SMALLINT UNSIGNED NOT NULL DEFAULT 1,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_session_scope_targets_sequence (session_scope_id, sequence_no),
    CONSTRAINT fk_nho_session_scope_target_scope FOREIGN KEY (session_scope_id) REFERENCES NHO_SESSION_SCOPES (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_session_scope_target_place FOREIGN KEY (place_id) REFERENCES NHO_PLACES (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_session_scope_target_zone FOREIGN KEY (zone_id) REFERENCES NHO_ZONES (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_session_scope_target_category FOREIGN KEY (category_id) REFERENCES NHO_CATEGORIES (id) ON DELETE RESTRICT,
    CONSTRAINT chk_nho_session_scope_target CHECK ((target_kind = 'PLACE' AND place_id IS NOT NULL AND zone_id IS NULL AND category_id IS NULL) OR (target_kind = 'ZONE' AND zone_id IS NOT NULL AND place_id IS NULL AND category_id IS NULL) OR (target_kind = 'CATEGORY' AND category_id IS NOT NULL AND place_id IS NULL AND zone_id IS NULL))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_SESSION_METHODS (
    id BINARY(16) NOT NULL,
    session_id BINARY(16) NOT NULL,
    method_version_id BINARY(16) NOT NULL,
    reason_code VARCHAR(96) NOT NULL,
    reason_text VARCHAR(500) NOT NULL,
    accepted_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_session_methods_session (session_id),
    CONSTRAINT fk_nho_session_methods_session FOREIGN KEY (session_id) REFERENCES NHO_SESSIONS (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_session_methods_version FOREIGN KEY (method_version_id) REFERENCES NHO_METHOD_VERSIONS (id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_SESSION_ACTIONS (
    id BINARY(16) NOT NULL,
    session_id BINARY(16) NOT NULL,
    action_no INT UNSIGNED NOT NULL,
    action_type_code VARCHAR(64) NOT NULL,
    method_step_id BINARY(16) NULL,
    path_definition_id BINARY(16) NULL,
    place_id BINARY(16) NULL,
    zone_id BINARY(16) NULL,
    category_id BINARY(16) NULL,
    item_id BINARY(16) NULL,
    result_code VARCHAR(64) NULL,
    note_text VARCHAR(500) NULL,
    confirmed_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_session_actions_number (session_id, action_no),
    KEY idx_nho_session_actions_place (place_id, confirmed_at),
    CONSTRAINT fk_nho_session_actions_session FOREIGN KEY (session_id) REFERENCES NHO_SESSIONS (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_session_actions_step FOREIGN KEY (method_step_id) REFERENCES NHO_METHOD_STEPS (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_session_actions_path FOREIGN KEY (path_definition_id) REFERENCES NHO_PATH_DEFINITIONS (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_session_actions_place FOREIGN KEY (place_id) REFERENCES NHO_PLACES (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_session_actions_zone FOREIGN KEY (zone_id) REFERENCES NHO_ZONES (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_session_actions_category FOREIGN KEY (category_id) REFERENCES NHO_CATEGORIES (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_session_actions_item FOREIGN KEY (item_id) REFERENCES NHO_ITEMS (id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_SESSION_INTERVALS (
    id BINARY(16) NOT NULL,
    session_id BINARY(16) NOT NULL,
    interval_no INT UNSIGNED NOT NULL,
    interval_type_code VARCHAR(64) NOT NULL,
    place_id BINARY(16) NULL,
    planned_seconds INT UNSIGNED NULL,
    started_at DATETIME(6) NOT NULL,
    ended_at DATETIME(6) NULL,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_session_intervals_number (session_id, interval_no),
    CONSTRAINT fk_nho_session_intervals_session FOREIGN KEY (session_id) REFERENCES NHO_SESSIONS (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_session_intervals_place FOREIGN KEY (place_id) REFERENCES NHO_PLACES (id) ON DELETE RESTRICT,
    CONSTRAINT chk_nho_session_intervals_window CHECK (ended_at IS NULL OR ended_at >= started_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_SESSION_CLOSES (
    id BINARY(16) NOT NULL,
    session_id BINARY(16) NOT NULL,
    completion_code VARCHAR(64) NOT NULL,
    effect_code VARCHAR(64) NULL,
    energy_after_code VARCHAR(64) NULL,
    what_worked_text TEXT NULL,
    learning_note_text TEXT NULL,
    closed_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_session_closes_session (session_id),
    CONSTRAINT fk_nho_session_closes_session FOREIGN KEY (session_id) REFERENCES NHO_SESSIONS (id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_OBSERVATIONS (
    id BINARY(16) NOT NULL,
    home_id BINARY(16) NOT NULL,
    observation_type_code VARCHAR(64) NOT NULL,
    person_id BINARY(16) NULL,
    place_id BINARY(16) NULL,
    place_function_id BINARY(16) NULL,
    zone_id BINARY(16) NULL,
    item_id BINARY(16) NULL,
    session_id BINARY(16) NULL,
    state_code VARCHAR(64) NULL,
    value_text VARCHAR(500) NULL,
    visibility_code VARCHAR(64) NOT NULL DEFAULT 'PRIVATE_PERSON',
    observed_at DATETIME(6) NOT NULL,
    recorded_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    supersedes_observation_id BINARY(16) NULL,
    PRIMARY KEY (id),
    KEY idx_nho_observations_history (home_id, observation_type_code, observed_at),
    KEY idx_nho_observations_place (place_id, observed_at),
    KEY idx_nho_observations_item (item_id, observed_at),
    CONSTRAINT fk_nho_observations_home FOREIGN KEY (home_id) REFERENCES NHO_HOMES (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_observations_place FOREIGN KEY (place_id) REFERENCES NHO_PLACES (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_observations_function FOREIGN KEY (place_function_id) REFERENCES NHO_PLACE_FUNCTIONS (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_observations_zone FOREIGN KEY (zone_id) REFERENCES NHO_ZONES (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_observations_item FOREIGN KEY (item_id) REFERENCES NHO_ITEMS (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_observations_session FOREIGN KEY (session_id) REFERENCES NHO_SESSIONS (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_observations_supersedes FOREIGN KEY (supersedes_observation_id) REFERENCES NHO_OBSERVATIONS (id) ON DELETE RESTRICT,
    CONSTRAINT chk_nho_observations_visibility CHECK (visibility_code IN ('PRIVATE_PERSON','HOME_SHARED')),
    CONSTRAINT chk_nho_observations_target CHECK ((person_id IS NOT NULL) + (place_id IS NOT NULL) + (place_function_id IS NOT NULL) + (zone_id IS NOT NULL) + (item_id IS NOT NULL) + (session_id IS NOT NULL) = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_SEARCH_DOCUMENTS (
    home_id BINARY(16) NOT NULL,
    subject_kind VARCHAR(32) NOT NULL,
    subject_id BINARY(16) NOT NULL,
    display_name VARCHAR(160) NOT NULL,
    search_text LONGTEXT NOT NULL,
    home_path_text VARCHAR(1000) NULL,
    observed_path_text VARCHAR(1000) NULL,
    status_phrase_code VARCHAR(64) NOT NULL DEFAULT 'UNKNOWN',
    source_updated_at DATETIME(6) NOT NULL,
    projected_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (home_id, subject_kind, subject_id),
    FULLTEXT KEY ftx_nho_search_documents_text (search_text),
    CONSTRAINT fk_nho_search_documents_home FOREIGN KEY (home_id) REFERENCES NHO_HOMES (id) ON DELETE CASCADE,
    CONSTRAINT chk_nho_search_documents_subject CHECK (subject_kind IN ('CATEGORY','ITEM')),
    CONSTRAINT chk_nho_search_documents_phrase CHECK (status_phrase_code IN ('BELONGS_TO','LAST_SEEN_AT','RETURN_IN_PROGRESS','UNKNOWN'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_PROJECTION_QUEUE_ENTRIES (
    id BINARY(16) NOT NULL,
    home_id BINARY(16) NOT NULL,
    subject_kind VARCHAR(32) NOT NULL,
    subject_id BINARY(16) NOT NULL,
    requested_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    attempts SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    locked_at DATETIME(6) NULL,
    completed_at DATETIME(6) NULL,
    last_error_text VARCHAR(1000) NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_projection_queue_subject (home_id, subject_kind, subject_id),
    KEY idx_nho_projection_queue_pending (completed_at, locked_at, requested_at),
    CONSTRAINT fk_nho_projection_queue_home FOREIGN KEY (home_id) REFERENCES NHO_HOMES (id) ON DELETE CASCADE,
    CONSTRAINT chk_nho_projection_queue_subject CHECK (subject_kind IN ('CATEGORY','ITEM'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
