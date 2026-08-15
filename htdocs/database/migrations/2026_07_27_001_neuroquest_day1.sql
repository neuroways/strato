SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS nq_children (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    display_name VARCHAR(100) NOT NULL,
    grade_level TINYINT UNSIGNED NOT NULL DEFAULT 2,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS nq_companions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT NULL,
    active_flag TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS nq_stories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    description TEXT NULL,
    status ENUM('draft','active','archived') NOT NULL DEFAULT 'draft',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS nq_story_days (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    story_id BIGINT UNSIGNED NOT NULL,
    day_number TINYINT UNSIGNED NOT NULL,
    title VARCHAR(200) NOT NULL,
    location_name VARCHAR(160) NOT NULL,
    arrival_headline VARCHAR(255) NOT NULL,
    arrival_text TEXT NOT NULL,
    completion_text TEXT NOT NULL,
    UNIQUE KEY uq_nq_story_day (story_id, day_number),
    CONSTRAINT fk_nq_story_days_story
        FOREIGN KEY (story_id) REFERENCES nq_stories(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS nq_day_rounds (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    story_day_id BIGINT UNSIGNED NOT NULL,
    round_number TINYINT UNSIGNED NOT NULL,
    instruction_symbol VARCHAR(20) NOT NULL DEFAULT '★',
    sentence_text VARCHAR(500) NOT NULL,
    search_instruction VARCHAR(255) NOT NULL,
    UNIQUE KEY uq_nq_day_round (story_day_id, round_number),
    CONSTRAINT fk_nq_day_rounds_day
        FOREIGN KEY (story_day_id) REFERENCES nq_story_days(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS nq_story_parts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    story_day_id BIGINT UNSIGNED NOT NULL,
    round_number TINYINT UNSIGNED NOT NULL,
    part_number TINYINT UNSIGNED NOT NULL,
    text_content TEXT NOT NULL,
    UNIQUE KEY uq_nq_story_part (story_day_id, part_number),
    CONSTRAINT fk_nq_story_parts_day
        FOREIGN KEY (story_day_id) REFERENCES nq_story_days(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS nq_story_day_companions (
    story_day_id BIGINT UNSIGNED NOT NULL,
    companion_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (story_day_id, companion_id),
    CONSTRAINT fk_nq_sdc_day
        FOREIGN KEY (story_day_id) REFERENCES nq_story_days(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_nq_sdc_companion
        FOREIGN KEY (companion_id) REFERENCES nq_companions(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS nq_day_runs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    child_id BIGINT UNSIGNED NOT NULL,
    story_day_id BIGINT UNSIGNED NOT NULL,
    run_number INT UNSIGNED NOT NULL,
    current_round TINYINT UNSIGNED NOT NULL DEFAULT 1,
    current_step TINYINT UNSIGNED NOT NULL DEFAULT 1,
    status ENUM('active','completed','abandoned') NOT NULL DEFAULT 'active',
    started_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME NULL,
    UNIQUE KEY uq_nq_day_run_number (child_id, story_day_id, run_number),
    KEY idx_nq_day_runs_active (child_id, story_day_id, status),
    CONSTRAINT fk_nq_day_runs_child
        FOREIGN KEY (child_id) REFERENCES nq_children(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_nq_day_runs_day
        FOREIGN KEY (story_day_id) REFERENCES nq_story_days(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS nq_run_round_progress (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    day_run_id BIGINT UNSIGNED NOT NULL,
    round_number TINYINT UNSIGNED NOT NULL,
    current_step TINYINT UNSIGNED NOT NULL DEFAULT 1,
    completed_flag TINYINT(1) NOT NULL DEFAULT 0,
    completed_at DATETIME NULL,
    UNIQUE KEY uq_nq_run_round_progress (day_run_id, round_number),
    CONSTRAINT fk_nq_rrp_run
        FOREIGN KEY (day_run_id) REFERENCES nq_day_runs(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS nq_story_unlocks (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    child_id BIGINT UNSIGNED NOT NULL,
    story_part_id BIGINT UNSIGNED NOT NULL,
    first_unlocked_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_read_at DATETIME NULL,
    read_count INT UNSIGNED NOT NULL DEFAULT 0,
    UNIQUE KEY uq_nq_story_unlock (child_id, story_part_id),
    CONSTRAINT fk_nq_story_unlock_child
        FOREIGN KEY (child_id) REFERENCES nq_children(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_nq_story_unlock_part
        FOREIGN KEY (story_part_id) REFERENCES nq_story_parts(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
