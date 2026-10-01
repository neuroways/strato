/* NeuroBalance Kartenraum Backend v0.6.0
   Persistente spätere Erkenntnisse pro eigener Ziehung. */

CREATE TABLE IF NOT EXISTS nb_card_experience (
    experience_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    profile_id BIGINT UNSIGNED NOT NULL,
    draw_id BIGINT UNSIGNED NOT NULL,
    experience_text TEXT NOT NULL,
    experienced_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (experience_id),
    KEY ix_nb_card_experience_profile_draw (profile_id, draw_id),
    KEY ix_nb_card_experience_draw_date (draw_id, experienced_at),

    CONSTRAINT fk_nb_card_experience_profile
        FOREIGN KEY (profile_id) REFERENCES nb_user_profile(profile_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_nb_card_experience_draw
        FOREIGN KEY (draw_id) REFERENCES nb_card_draw(draw_id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
