-- NeuroHome v0.4.1 · Places, zones and inventory

CREATE TABLE IF NOT EXISTS NHO_PLACES (
    id BINARY(16) NOT NULL,
    home_id BINARY(16) NOT NULL,
    parent_place_id BINARY(16) NULL,
    place_type_code VARCHAR(64) NOT NULL,
    code VARCHAR(96) NOT NULL,
    name VARCHAR(160) NOT NULL,
    normalized_name VARCHAR(160) NOT NULL,
    position_hint VARCHAR(500) NULL,
    sort_order INT NOT NULL DEFAULT 0,
    status VARCHAR(32) NOT NULL DEFAULT 'published',
    row_version BIGINT UNSIGNED NOT NULL DEFAULT 1,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    archived_at DATETIME(6) NULL,
    active_marker TINYINT UNSIGNED NULL DEFAULT 1,
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_places_code_active (home_id, code, active_marker),
    UNIQUE KEY uq_nho_places_name_active (home_id, parent_place_id, normalized_name, active_marker),
    KEY idx_nho_places_tree (home_id, parent_place_id, archived_at, sort_order),
    CONSTRAINT fk_nho_places_home FOREIGN KEY (home_id) REFERENCES NHO_HOMES (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_places_parent FOREIGN KEY (parent_place_id) REFERENCES NHO_PLACES (id) ON DELETE RESTRICT,
    CONSTRAINT chk_nho_places_marker CHECK (active_marker IS NULL OR active_marker = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_PLACE_ALIASES (
    id BINARY(16) NOT NULL,
    home_id BINARY(16) NOT NULL,
    place_id BINARY(16) NOT NULL,
    alias VARCHAR(160) NOT NULL,
    normalized_alias VARCHAR(160) NOT NULL,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    archived_at DATETIME(6) NULL,
    active_marker TINYINT UNSIGNED NULL DEFAULT 1,
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_place_aliases_active (home_id, normalized_alias, active_marker),
    CONSTRAINT fk_nho_place_aliases_home FOREIGN KEY (home_id) REFERENCES NHO_HOMES (id) ON DELETE CASCADE,
    CONSTRAINT fk_nho_place_aliases_place FOREIGN KEY (place_id) REFERENCES NHO_PLACES (id) ON DELETE CASCADE,
    CONSTRAINT chk_nho_place_aliases_marker CHECK (active_marker IS NULL OR active_marker = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_PLACE_FUNCTIONS (
    id BINARY(16) NOT NULL,
    place_id BINARY(16) NOT NULL,
    function_code VARCHAR(64) NOT NULL,
    title VARCHAR(160) NOT NULL,
    description TEXT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'published',
    row_version BIGINT UNSIGNED NOT NULL DEFAULT 1,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    archived_at DATETIME(6) NULL,
    active_marker TINYINT UNSIGNED NULL DEFAULT 1,
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_place_functions_active (place_id, function_code, active_marker),
    CONSTRAINT fk_nho_place_functions_place FOREIGN KEY (place_id) REFERENCES NHO_PLACES (id) ON DELETE RESTRICT,
    CONSTRAINT chk_nho_place_functions_marker CHECK (active_marker IS NULL OR active_marker = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_FUNCTION_MINIMUM_STATES (
    id BINARY(16) NOT NULL,
    place_function_id BINARY(16) NOT NULL,
    state_code VARCHAR(64) NOT NULL,
    description VARCHAR(500) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    archived_at DATETIME(6) NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_function_minimum_state (place_function_id, state_code),
    CONSTRAINT fk_nho_function_minimum_place_function FOREIGN KEY (place_function_id) REFERENCES NHO_PLACE_FUNCTIONS (id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_ZONES (
    id BINARY(16) NOT NULL,
    home_id BINARY(16) NOT NULL,
    place_id BINARY(16) NOT NULL,
    code VARCHAR(96) NOT NULL,
    name VARCHAR(160) NOT NULL,
    description TEXT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'published',
    row_version BIGINT UNSIGNED NOT NULL DEFAULT 1,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    archived_at DATETIME(6) NULL,
    active_marker TINYINT UNSIGNED NULL DEFAULT 1,
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_zones_code_active (home_id, code, active_marker),
    KEY idx_nho_zones_place (place_id, archived_at),
    CONSTRAINT fk_nho_zones_home FOREIGN KEY (home_id) REFERENCES NHO_HOMES (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_zones_place FOREIGN KEY (place_id) REFERENCES NHO_PLACES (id) ON DELETE RESTRICT,
    CONSTRAINT chk_nho_zones_marker CHECK (active_marker IS NULL OR active_marker = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_ZONE_ROLES (
    id BINARY(16) NOT NULL,
    zone_id BINARY(16) NOT NULL,
    role_code VARCHAR(64) NOT NULL,
    context_json LONGTEXT NULL,
    valid_from DATETIME(6) NULL,
    valid_to DATETIME(6) NULL,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    archived_at DATETIME(6) NULL,
    active_marker TINYINT UNSIGNED NULL DEFAULT 1,
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_zone_roles_active (zone_id, role_code, active_marker),
    CONSTRAINT fk_nho_zone_roles_zone FOREIGN KEY (zone_id) REFERENCES NHO_ZONES (id) ON DELETE RESTRICT,
    CONSTRAINT chk_nho_zone_roles_context CHECK (context_json IS NULL OR JSON_VALID(context_json)),
    CONSTRAINT chk_nho_zone_roles_marker CHECK (active_marker IS NULL OR active_marker = 1),
    CONSTRAINT chk_nho_zone_roles_window CHECK (valid_to IS NULL OR valid_from IS NULL OR valid_to >= valid_from)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_ZONE_MINIMUM_STATES (
    id BINARY(16) NOT NULL,
    zone_id BINARY(16) NOT NULL,
    state_code VARCHAR(64) NOT NULL,
    description VARCHAR(500) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    archived_at DATETIME(6) NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_zone_minimum_state (zone_id, state_code),
    CONSTRAINT fk_nho_zone_minimum_zone FOREIGN KEY (zone_id) REFERENCES NHO_ZONES (id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_CATEGORIES (
    id BINARY(16) NOT NULL,
    home_id BINARY(16) NOT NULL,
    parent_category_id BINARY(16) NULL,
    code VARCHAR(96) NOT NULL,
    name VARCHAR(160) NOT NULL,
    normalized_name VARCHAR(160) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'published',
    row_version BIGINT UNSIGNED NOT NULL DEFAULT 1,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    archived_at DATETIME(6) NULL,
    active_marker TINYINT UNSIGNED NULL DEFAULT 1,
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_categories_code_active (home_id, code, active_marker),
    KEY idx_nho_categories_parent (home_id, parent_category_id, archived_at),
    CONSTRAINT fk_nho_categories_home FOREIGN KEY (home_id) REFERENCES NHO_HOMES (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_categories_parent FOREIGN KEY (parent_category_id) REFERENCES NHO_CATEGORIES (id) ON DELETE RESTRICT,
    CONSTRAINT chk_nho_categories_marker CHECK (active_marker IS NULL OR active_marker = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_CATEGORY_ALIASES (
    id BINARY(16) NOT NULL,
    home_id BINARY(16) NOT NULL,
    category_id BINARY(16) NOT NULL,
    alias VARCHAR(160) NOT NULL,
    normalized_alias VARCHAR(160) NOT NULL,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    archived_at DATETIME(6) NULL,
    active_marker TINYINT UNSIGNED NULL DEFAULT 1,
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_category_aliases_active (home_id, normalized_alias, active_marker),
    CONSTRAINT fk_nho_category_aliases_home FOREIGN KEY (home_id) REFERENCES NHO_HOMES (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_category_aliases_category FOREIGN KEY (category_id) REFERENCES NHO_CATEGORIES (id) ON DELETE RESTRICT,
    CONSTRAINT chk_nho_category_aliases_marker CHECK (active_marker IS NULL OR active_marker = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_ITEMS (
    id BINARY(16) NOT NULL,
    home_id BINARY(16) NOT NULL,
    primary_category_id BINARY(16) NULL,
    code VARCHAR(96) NOT NULL,
    name VARCHAR(160) NOT NULL,
    normalized_name VARCHAR(160) NOT NULL,
    description TEXT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'published',
    row_version BIGINT UNSIGNED NOT NULL DEFAULT 1,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    archived_at DATETIME(6) NULL,
    active_marker TINYINT UNSIGNED NULL DEFAULT 1,
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_items_code_active (home_id, code, active_marker),
    KEY idx_nho_items_name (home_id, normalized_name, archived_at),
    CONSTRAINT fk_nho_items_home FOREIGN KEY (home_id) REFERENCES NHO_HOMES (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_items_primary_category FOREIGN KEY (primary_category_id) REFERENCES NHO_CATEGORIES (id) ON DELETE RESTRICT,
    CONSTRAINT chk_nho_items_marker CHECK (active_marker IS NULL OR active_marker = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_ITEM_CATEGORY_LINKS (
    item_id BINARY(16) NOT NULL,
    category_id BINARY(16) NOT NULL,
    is_primary TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (item_id, category_id),
    CONSTRAINT fk_nho_item_category_links_item FOREIGN KEY (item_id) REFERENCES NHO_ITEMS (id) ON DELETE CASCADE,
    CONSTRAINT fk_nho_item_category_links_category FOREIGN KEY (category_id) REFERENCES NHO_CATEGORIES (id) ON DELETE RESTRICT,
    CONSTRAINT chk_nho_item_category_primary CHECK (is_primary IN (0,1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_HOME_ASSIGNMENTS (
    id BINARY(16) NOT NULL,
    home_id BINARY(16) NOT NULL,
    subject_kind VARCHAR(32) NOT NULL,
    category_id BINARY(16) NULL,
    item_id BINARY(16) NULL,
    subject_id BINARY(16) AS (COALESCE(category_id, item_id)) PERSISTENT,
    place_id BINARY(16) NOT NULL,
    purpose_code VARCHAR(64) NOT NULL DEFAULT 'PRIMARY_HOME',
    priority SMALLINT UNSIGNED NOT NULL DEFAULT 100,
    condition_json LONGTEXT NULL,
    is_primary TINYINT(1) NOT NULL DEFAULT 0,
    row_version BIGINT UNSIGNED NOT NULL DEFAULT 1,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    archived_at DATETIME(6) NULL,
    active_marker TINYINT UNSIGNED NULL DEFAULT 1,
    primary_active_marker TINYINT UNSIGNED AS (IF(is_primary = 1 AND active_marker = 1, 1, NULL)) PERSISTENT,
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_home_assignments_priority (home_id, subject_kind, subject_id, purpose_code, priority, active_marker),
    UNIQUE KEY uq_nho_home_assignments_primary (home_id, subject_kind, subject_id, purpose_code, primary_active_marker),
    KEY idx_nho_home_assignments_place (home_id, place_id, archived_at),
    CONSTRAINT fk_nho_home_assignments_home FOREIGN KEY (home_id) REFERENCES NHO_HOMES (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_home_assignments_category FOREIGN KEY (category_id) REFERENCES NHO_CATEGORIES (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_home_assignments_item FOREIGN KEY (item_id) REFERENCES NHO_ITEMS (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_home_assignments_place FOREIGN KEY (place_id) REFERENCES NHO_PLACES (id) ON DELETE RESTRICT,
    CONSTRAINT chk_nho_home_assignments_subject CHECK ((subject_kind = 'CATEGORY' AND category_id IS NOT NULL AND item_id IS NULL) OR (subject_kind = 'ITEM' AND item_id IS NOT NULL AND category_id IS NULL)),
    CONSTRAINT chk_nho_home_assignments_json CHECK (condition_json IS NULL OR JSON_VALID(condition_json)),
    CONSTRAINT chk_nho_home_assignments_primary CHECK (is_primary IN (0,1)),
    CONSTRAINT chk_nho_home_assignments_marker CHECK (active_marker IS NULL OR active_marker = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_ZONE_ALLOWED_CATEGORY_LINKS (
    id BINARY(16) NOT NULL,
    zone_id BINARY(16) NOT NULL,
    category_id BINARY(16) NOT NULL,
    context_json LONGTEXT NULL,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    archived_at DATETIME(6) NULL,
    active_marker TINYINT UNSIGNED NULL DEFAULT 1,
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_zone_allowed_category (zone_id, category_id, active_marker),
    CONSTRAINT fk_nho_zone_allowed_zone FOREIGN KEY (zone_id) REFERENCES NHO_ZONES (id) ON DELETE RESTRICT,
    CONSTRAINT fk_nho_zone_allowed_category FOREIGN KEY (category_id) REFERENCES NHO_CATEGORIES (id) ON DELETE RESTRICT,
    CONSTRAINT chk_nho_zone_allowed_context CHECK (context_json IS NULL OR JSON_VALID(context_json)),
    CONSTRAINT chk_nho_zone_allowed_marker CHECK (active_marker IS NULL OR active_marker = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
