/* NeuroBalance Kartenraum Backend v0.6.1
   Zentrales Journalmodell pro Ziehung.

   entry_type:
     THOUGHT     persönlicher Gedanke
     INSIGHT     Erkenntnis
     QUESTION    offene Frage
     GOAL        Ziel / Vorhaben
     EXPERIENCE  spätere Erfahrung

   depth_code:
     QUESTION
     MOMENT
     MEANING
     SYMBOLISM
     OTHER_DIRECTION
     NULL = bezieht sich auf die gesamte Ziehung
*/

CREATE TABLE IF NOT EXISTS nb_card_journal_entry (
    journal_entry_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    profile_id BIGINT UNSIGNED NOT NULL,
    draw_id BIGINT UNSIGNED NOT NULL,

    entry_type VARCHAR(30) NOT NULL,
    depth_code VARCHAR(40) NULL,
    entry_text TEXT NOT NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (journal_entry_id),

    KEY ix_nb_card_journal_profile_created (
        profile_id,
        created_at
    ),

    KEY ix_nb_card_journal_draw_created (
        draw_id,
        created_at
    ),

    KEY ix_nb_card_journal_draw_depth (
        draw_id,
        depth_code
    ),

    CONSTRAINT fk_nb_card_journal_profile
        FOREIGN KEY (profile_id)
        REFERENCES nb_user_profile(profile_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_nb_card_journal_draw
        FOREIGN KEY (draw_id)
        REFERENCES nb_card_draw(draw_id)
        ON DELETE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;


/* Bestehende v0.6.0-Erfahrungen übernehmen.
   Die Tabelle nb_card_experience bleibt bestehen, damit ältere Frontends
   weiter funktionieren. Neue Frontends sollen nb_card_journal_entry nutzen. */

INSERT INTO nb_card_journal_entry
    (profile_id, draw_id, entry_type, depth_code, entry_text, created_at, updated_at)
SELECT
    e.profile_id,
    e.draw_id,
    'EXPERIENCE',
    NULL,
    e.experience_text,
    COALESCE(e.experienced_at, e.created_at),
    COALESCE(e.updated_at, e.created_at)
FROM nb_card_experience e
WHERE NOT EXISTS (
    SELECT 1
    FROM nb_card_journal_entry j
    WHERE j.profile_id = e.profile_id
      AND j.draw_id = e.draw_id
      AND j.entry_type = 'EXPERIENCE'
      AND j.depth_code IS NULL
      AND j.entry_text = e.experience_text
      AND j.created_at = COALESCE(e.experienced_at, e.created_at)
);
