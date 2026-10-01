-- NeuroBalance Kartenraum · Profil & Journal v0.5.0
SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS nb_user_profile (
  profile_id           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  username             VARCHAR(64) NOT NULL,
  username_normalized  VARCHAR(64) NOT NULL,
  access_code_hash     VARCHAR(255) NOT NULL,
  audience_code        VARCHAR(16) NOT NULL,
  language_code        VARCHAR(8) NOT NULL DEFAULT 'de',
  created_at           TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_access_at       TIMESTAMP NULL DEFAULT NULL,
  status_code          VARCHAR(24) NOT NULL DEFAULT 'active',
  PRIMARY KEY (profile_id),
  UNIQUE KEY uq_nb_user_profile_username_norm (username_normalized),
  KEY ix_nb_user_profile_status (status_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS nb_user_session (
  session_id           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  profile_id           BIGINT UNSIGNED NOT NULL,
  token_hash           CHAR(64) NOT NULL,
  created_at           TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at           DATETIME NOT NULL,
  last_seen_at         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  revoked_at           DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (session_id),
  UNIQUE KEY uq_nb_user_session_token_hash (token_hash),
  KEY ix_nb_user_session_profile (profile_id),
  KEY ix_nb_user_session_expiry (expires_at),
  CONSTRAINT fk_nb_user_session_profile
    FOREIGN KEY (profile_id) REFERENCES nb_user_profile(profile_id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS nb_card_draw (
  draw_id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  profile_id           BIGINT UNSIGNED NOT NULL,
  card_id              VARCHAR(32) NOT NULL,
  orientation_code     VARCHAR(16) NOT NULL,
  audience_code        VARCHAR(16) NOT NULL,
  language_code        VARCHAR(8) NOT NULL DEFAULT 'de',
  drawn_at              TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status_code           VARCHAR(24) NOT NULL DEFAULT 'active',
  PRIMARY KEY (draw_id),
  KEY ix_nb_card_draw_profile_date (profile_id, drawn_at),
  KEY ix_nb_card_draw_card (card_id),
  CONSTRAINT fk_nb_card_draw_profile
    FOREIGN KEY (profile_id) REFERENCES nb_user_profile(profile_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_nb_card_draw_card
    FOREIGN KEY (card_id) REFERENCES nb_card(card_id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT chk_nb_card_draw_orientation
    CHECK (orientation_code IN ('UPRIGHT','REVERSED'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS nb_card_perception (
  perception_id        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  draw_id              BIGINT UNSIGNED NOT NULL,
  profile_id           BIGINT UNSIGNED NOT NULL,
  perception_text      TEXT NOT NULL,
  created_at            TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at            TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (perception_id),
  UNIQUE KEY uq_nb_card_perception_draw (draw_id),
  KEY ix_nb_card_perception_profile (profile_id),
  CONSTRAINT fk_nb_card_perception_draw
    FOREIGN KEY (draw_id) REFERENCES nb_card_draw(draw_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_nb_card_perception_profile
    FOREIGN KEY (profile_id) REFERENCES nb_user_profile(profile_id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS nb_login_attempt (
  attempt_id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  username_normalized   VARCHAR(64) NOT NULL,
  ip_hash               CHAR(64) NOT NULL,
  attempted_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  success_flag          TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (attempt_id),
  KEY ix_nb_login_attempt_user_time (username_normalized, attempted_at),
  KEY ix_nb_login_attempt_ip_time (ip_hash, attempted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
