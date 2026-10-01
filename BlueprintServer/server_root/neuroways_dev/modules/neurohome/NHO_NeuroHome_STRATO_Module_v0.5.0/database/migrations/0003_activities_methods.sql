-- NeuroHome v0.4.1 · Activities, TEACCH-oriented paths and methods

CREATE TABLE IF NOT EXISTS NHO_ACTIVITIES (
    id BINARY(16) NOT NULL,
    home_id BINARY(16) NULL,
    code VARCHAR(96) NOT NULL,
    name VARCHAR(160) NOT NULL,
    description TEXT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'draft',
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    archived_at DATETIME(6) NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_activities_home_code (home_id, code),
    CONSTRAINT fk_nho_activities_home FOREIGN KEY (home_id) REFERENCES NHO_HOMES (id) ON DELETE RESTRICT,
    CONSTRAINT chk_nho_activities_status CHECK (status IN ('draft','review','approved','published','deprecated','archived'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_ACTIVITY_VERSIONS (
    id BINARY(16) NOT NULL,
    activity_id BINARY(16) NOT NULL,
    version VARCHAR(32) NOT NULL,
    title VARCHAR(160) NOT NULL,
    introduction_text TEXT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'draft',
    valid_from DATETIME(6) NULL,
    valid_to DATETIME(6) NULL,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    published_at DATETIME(6) NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_activity_versions_number (activity_id, version),
    CONSTRAINT fk_nho_activity_versions_activity FOREIGN KEY (activity_id) REFERENCES NHO_ACTIVITIES (id) ON DELETE RESTRICT,
    CONSTRAINT chk_nho_activity_versions_status CHECK (status IN ('draft','review','approved','published','deprecated','archived')),
    CONSTRAINT chk_nho_activity_versions_window CHECK (valid_to IS NULL OR valid_from IS NULL OR valid_to >= valid_from)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_ACTIVITY_PLACE_LINKS (
    id BINARY(16) NOT NULL,
    activity_version_id BINARY(16) NOT NULL,
    place_id BINARY(16) NOT NULL,
    preference_code VARCHAR(64) NOT NULL DEFAULT 'ALLOWED',
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_activity_place_link (activity_version_id, place_id),
    CONSTRAINT fk_nho_activity_place_version FOREIGN KEY (activity_version_id) REFERENCES NHO_ACTIVITY_VERSIONS (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_activity_place_place FOREIGN KEY (place_id) REFERENCES NHO_PLACES (id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_ACTIVITY_NEEDS (
    id BINARY(16) NOT NULL,
    activity_version_id BINARY(16) NOT NULL,
    category_id BINARY(16) NULL,
    item_id BINARY(16) NULL,
    quantity DECIMAL(10,2) NULL,
    unit_code VARCHAR(64) NULL,
    is_required TINYINT(1) NOT NULL DEFAULT 1,
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    KEY idx_nho_activity_needs_version (activity_version_id, sort_order),
    CONSTRAINT fk_nho_activity_needs_version FOREIGN KEY (activity_version_id) REFERENCES NHO_ACTIVITY_VERSIONS (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_activity_needs_category FOREIGN KEY (category_id) REFERENCES NHO_CATEGORIES (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_activity_needs_item FOREIGN KEY (item_id) REFERENCES NHO_ITEMS (id) ON DELETE RESTRICT,
    CONSTRAINT chk_nho_activity_needs_subject CHECK ((category_id IS NOT NULL AND item_id IS NULL) OR (category_id IS NULL AND item_id IS NOT NULL)),
    CONSTRAINT chk_nho_activity_needs_required CHECK (is_required IN (0,1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_ACTIVITY_STEPS (
    id BINARY(16) NOT NULL,
    activity_version_id BINARY(16) NOT NULL,
    sequence_no SMALLINT UNSIGNED NOT NULL,
    title VARCHAR(160) NOT NULL,
    instruction_text TEXT NOT NULL,
    completion_signal VARCHAR(500) NULL,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_activity_steps_sequence (activity_version_id, sequence_no),
    CONSTRAINT fk_nho_activity_steps_version FOREIGN KEY (activity_version_id) REFERENCES NHO_ACTIVITY_VERSIONS (id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_PATH_DEFINITIONS (
    id BINARY(16) NOT NULL,
    activity_version_id BINARY(16) NOT NULL,
    activity_step_id BINARY(16) NULL,
    path_kind_code VARCHAR(64) NOT NULL,
    category_id BINARY(16) NULL,
    item_id BINARY(16) NULL,
    source_place_id BINARY(16) NULL,
    target_place_id BINARY(16) NULL,
    instruction_text VARCHAR(500) NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    KEY idx_nho_path_definitions_version (activity_version_id, sort_order),
    CONSTRAINT fk_nho_paths_version FOREIGN KEY (activity_version_id) REFERENCES NHO_ACTIVITY_VERSIONS (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_paths_step FOREIGN KEY (activity_step_id) REFERENCES NHO_ACTIVITY_STEPS (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_paths_category FOREIGN KEY (category_id) REFERENCES NHO_CATEGORIES (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_paths_item FOREIGN KEY (item_id) REFERENCES NHO_ITEMS (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_paths_source FOREIGN KEY (source_place_id) REFERENCES NHO_PLACES (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_paths_target FOREIGN KEY (target_place_id) REFERENCES NHO_PLACES (id) ON DELETE RESTRICT,
    CONSTRAINT chk_nho_paths_subject CHECK (NOT (category_id IS NOT NULL AND item_id IS NOT NULL))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_METHODS (
    id BINARY(16) NOT NULL,
    code VARCHAR(96) NOT NULL,
    name VARCHAR(160) NOT NULL,
    description TEXT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'draft',
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    archived_at DATETIME(6) NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_methods_code (code),
    CONSTRAINT chk_nho_methods_status CHECK (status IN ('draft','review','approved','published','deprecated','archived'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_METHOD_VERSIONS (
    id BINARY(16) NOT NULL,
    method_id BINARY(16) NOT NULL,
    version VARCHAR(32) NOT NULL,
    title VARCHAR(160) NOT NULL,
    orientation_text TEXT NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'draft',
    suggested_duration_minutes SMALLINT UNSIGNED NULL,
    valid_from DATETIME(6) NULL,
    valid_to DATETIME(6) NULL,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    published_at DATETIME(6) NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_method_versions_number (method_id, version),
    CONSTRAINT fk_nho_method_versions_method FOREIGN KEY (method_id) REFERENCES NHO_METHODS (id) ON DELETE RESTRICT,
    CONSTRAINT chk_nho_method_versions_status CHECK (status IN ('draft','review','approved','published','deprecated','archived')),
    CONSTRAINT chk_nho_method_versions_window CHECK (valid_to IS NULL OR valid_from IS NULL OR valid_to >= valid_from)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_METHOD_STEPS (
    id BINARY(16) NOT NULL,
    method_version_id BINARY(16) NOT NULL,
    sequence_no SMALLINT UNSIGNED NOT NULL,
    title VARCHAR(160) NOT NULL,
    instruction_text TEXT NOT NULL,
    is_repeatable TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_method_steps_sequence (method_version_id, sequence_no),
    CONSTRAINT fk_nho_method_steps_version FOREIGN KEY (method_version_id) REFERENCES NHO_METHOD_VERSIONS (id) ON DELETE RESTRICT,
    CONSTRAINT chk_nho_method_steps_repeat CHECK (is_repeatable IN (0,1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_RECOMMENDATION_RULES (
    id BINARY(16) NOT NULL,
    method_version_id BINARY(16) NOT NULL,
    code VARCHAR(96) NOT NULL,
    condition_json LONGTEXT NOT NULL,
    weight SMALLINT NOT NULL DEFAULT 0,
    priority SMALLINT UNSIGNED NOT NULL DEFAULT 100,
    reason_code VARCHAR(96) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'draft',
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    published_at DATETIME(6) NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_recommendation_rules_code (code),
    KEY idx_nho_recommendation_rules_method (method_version_id, status, priority),
    CONSTRAINT fk_nho_recommendation_rules_version FOREIGN KEY (method_version_id) REFERENCES NHO_METHOD_VERSIONS (id) ON DELETE RESTRICT,
    CONSTRAINT chk_nho_recommendation_rules_json CHECK (JSON_VALID(condition_json)),
    CONSTRAINT chk_nho_recommendation_rules_status CHECK (status IN ('draft','review','approved','published','deprecated','archived'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_STOP_SIGNALS (
    id BINARY(16) NOT NULL,
    method_version_id BINARY(16) NOT NULL,
    signal_code VARCHAR(96) NOT NULL,
    signal_type_code VARCHAR(64) NOT NULL,
    threshold_json LONGTEXT NULL,
    guidance_text VARCHAR(500) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    status VARCHAR(32) NOT NULL DEFAULT 'published',
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_stop_signals_code (method_version_id, signal_code),
    CONSTRAINT fk_nho_stop_signals_version FOREIGN KEY (method_version_id) REFERENCES NHO_METHOD_VERSIONS (id) ON DELETE RESTRICT,
    CONSTRAINT chk_nho_stop_signals_json CHECK (threshold_json IS NULL OR JSON_VALID(threshold_json))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
