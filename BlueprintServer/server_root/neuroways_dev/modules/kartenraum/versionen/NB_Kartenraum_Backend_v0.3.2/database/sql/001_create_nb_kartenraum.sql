-- NB Kartenraum DB v0.3.0
-- MariaDB / utf8mb4
SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS nb_card (
  card_id           VARCHAR(32)  NOT NULL,
  arcana_code       VARCHAR(16)  NOT NULL,
  suit_code         VARCHAR(16)  NULL,
  rank_code         VARCHAR(16)  NULL,
  major_number      TINYINT UNSIGNED NULL,
  title_de          VARCHAR(128) NOT NULL,
  sheet_name        VARCHAR(64)  NOT NULL,
  sheet_position    TINYINT UNSIGNED NOT NULL,
  status_code       VARCHAR(16)  NOT NULL DEFAULT 'active',
  created_at        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (card_id),
  CONSTRAINT chk_nb_card_sheet_position CHECK (sheet_position BETWEEN 1 AND 6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS nb_card_text (
  card_text_id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  card_id                   VARCHAR(32)  NOT NULL,
  audience_code             VARCHAR(16)  NOT NULL,
  language_code             VARCHAR(8)   NOT NULL,
  content_version           VARCHAR(16)  NOT NULL DEFAULT '0.1.0',
  title                     VARCHAR(128) NOT NULL,
  subtitle                  VARCHAR(255) NULL,
  reflection_keywords       VARCHAR(512) NULL,
  what_do_you_see           TEXT NOT NULL,
  card_room                 TEXT NOT NULL,
  helpful_side              TEXT NOT NULL,
  difficult_side            TEXT NOT NULL,
  context_questions_json    LONGTEXT NOT NULL,
  own_card_language         TEXT NOT NULL,
  possible_next_step        TEXT NOT NULL,
  status_code               VARCHAR(24) NOT NULL DEFAULT 'draft-review',
  created_at                TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at                TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (card_text_id),
  UNIQUE KEY uq_nb_card_text_identity (card_id, audience_code, language_code, content_version),
  KEY ix_nb_card_text_lookup (card_id, audience_code, language_code, status_code),
  CONSTRAINT fk_nb_card_text_card FOREIGN KEY (card_id) REFERENCES nb_card(card_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
