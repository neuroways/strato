-- NeuroBalance Kartenraum · Kartenwissen v0.4.0
CREATE TABLE IF NOT EXISTS nb_card_knowledge (
  card_knowledge_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  card_id VARCHAR(64) NOT NULL,
  audience_code VARCHAR(16) NOT NULL,
  language_code VARCHAR(8) NOT NULL,
  content_version VARCHAR(20) NOT NULL,
  theme VARCHAR(255) NULL,
  keywords_json LONGTEXT NULL,
  meaning_text LONGTEXT NOT NULL,
  symbolism_text LONGTEXT NULL,
  other_direction_text LONGTEXT NULL,
  status_code VARCHAR(32) NOT NULL DEFAULT 'draft-review',
  provenance_code VARCHAR(64) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (card_knowledge_id),
  UNIQUE KEY uq_nb_card_knowledge (card_id,audience_code,language_code,content_version),
  KEY ix_nb_card_knowledge_card (card_id),
  CONSTRAINT fk_nb_card_knowledge_card
    FOREIGN KEY (card_id) REFERENCES nb_card(card_id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
