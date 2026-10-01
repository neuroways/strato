-- NeuroHome v0.4.1 · Foundation
-- Additive DEV migration. All timestamps are UTC by connection contract.

CREATE TABLE IF NOT EXISTS NHO_SCHEMA_MIGRATIONS (
    migration_code VARCHAR(128) NOT NULL,
    checksum_sha256 CHAR(64) NOT NULL,
    applied_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    execution_ms INT UNSIGNED NOT NULL,
    PRIMARY KEY (migration_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_CATALOG_ENTRIES (
    catalog_type VARCHAR(64) NOT NULL,
    code VARCHAR(64) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'published',
    sort_order INT NOT NULL DEFAULT 0,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY (catalog_type, code),
    CONSTRAINT chk_nho_catalog_status CHECK (status IN ('draft','review','approved','published','deprecated','archived'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_CATALOG_TRANSLATIONS (
    catalog_type VARCHAR(64) NOT NULL,
    code VARCHAR(64) NOT NULL,
    locale VARCHAR(16) NOT NULL,
    label VARCHAR(160) NOT NULL,
    description TEXT NULL,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY (catalog_type, code, locale),
    CONSTRAINT fk_nho_catalog_translations_entry
        FOREIGN KEY (catalog_type, code)
        REFERENCES NHO_CATALOG_ENTRIES (catalog_type, code)
        ON UPDATE RESTRICT ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_HOMES (
    id BINARY(16) NOT NULL,
    code VARCHAR(96) NOT NULL,
    title VARCHAR(160) NOT NULL,
    timezone_name VARCHAR(64) NOT NULL DEFAULT 'Europe/Berlin',
    status VARCHAR(32) NOT NULL DEFAULT 'draft',
    row_version BIGINT UNSIGNED NOT NULL DEFAULT 1,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    archived_at DATETIME(6) NULL,
    active_marker TINYINT UNSIGNED NULL DEFAULT 1,
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_homes_code_active (code, active_marker),
    CONSTRAINT chk_nho_homes_status CHECK (status IN ('draft','review','approved','published','deprecated','archived')),
    CONSTRAINT chk_nho_homes_active_marker CHECK (active_marker IS NULL OR active_marker = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_HOME_MEMBERS (
    id BINARY(16) NOT NULL,
    home_id BINARY(16) NOT NULL,
    person_id BINARY(16) NOT NULL,
    role_code VARCHAR(64) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'published',
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    archived_at DATETIME(6) NULL,
    active_marker TINYINT UNSIGNED NULL DEFAULT 1,
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_home_members_active (home_id, person_id, active_marker),
    KEY idx_nho_home_members_person (person_id, status),
    CONSTRAINT fk_nho_home_members_home FOREIGN KEY (home_id) REFERENCES NHO_HOMES (id) ON DELETE RESTRICT,
    CONSTRAINT chk_nho_home_members_role CHECK (role_code IN ('HOME_OWNER','HOME_EDITOR','HOME_MEMBER','HOME_VIEWER')),
    CONSTRAINT chk_nho_home_members_marker CHECK (active_marker IS NULL OR active_marker = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS NHO_IDEMPOTENCY_KEYS (
    id BINARY(16) NOT NULL,
    home_id BINARY(16) NOT NULL,
    person_id BINARY(16) NOT NULL,
    idempotency_key VARCHAR(128) NOT NULL,
    request_hash CHAR(64) NOT NULL,
    response_status SMALLINT UNSIGNED NOT NULL,
    response_body LONGTEXT NOT NULL,
    created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    expires_at DATETIME(6) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_nho_idempotency_scope (home_id, person_id, idempotency_key),
    KEY idx_nho_idempotency_expiry (expires_at),
    CONSTRAINT fk_nho_idempotency_home FOREIGN KEY (home_id) REFERENCES NHO_HOMES (id) ON DELETE CASCADE,
    CONSTRAINT chk_nho_idempotency_response_json CHECK (JSON_VALID(response_body))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
