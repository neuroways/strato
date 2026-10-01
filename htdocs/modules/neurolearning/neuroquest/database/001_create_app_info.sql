CREATE TABLE IF NOT EXISTS app_info (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    version VARCHAR(20) NOT NULL,
    status VARCHAR(100) NOT NULL,
    build_date DATE NOT NULL,
    is_current TINYINT(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT chk_app_info_is_current CHECK (is_current IN (0, 1)),
    INDEX idx_app_info_current (is_current, id)
) ENGINE=InnoDB
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

UPDATE app_info SET is_current = 0 WHERE is_current = 1;

INSERT INTO app_info (version, status, build_date, is_current)
VALUES ('0.0.1', 'Development Preview', '2026-07-27', 1);
