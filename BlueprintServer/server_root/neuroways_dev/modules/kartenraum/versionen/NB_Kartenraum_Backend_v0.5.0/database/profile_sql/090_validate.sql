SELECT COUNT(*) AS profile_tables
FROM information_schema.tables
WHERE table_schema = DATABASE()
  AND table_name IN ('nb_user_profile','nb_user_session','nb_card_draw','nb_card_perception','nb_login_attempt');

SELECT COUNT(*) AS orphan_draw_profiles
FROM nb_card_draw d LEFT JOIN nb_user_profile p ON p.profile_id=d.profile_id
WHERE p.profile_id IS NULL;

SELECT COUNT(*) AS orphan_draw_cards
FROM nb_card_draw d LEFT JOIN nb_card c ON c.card_id=d.card_id
WHERE c.card_id IS NULL;
