ALTER TABLE nb_user_profile
 ADD COLUMN card_audience_code VARCHAR(10) NULL,
 ADD COLUMN ui_language_mode VARCHAR(12) NULL,
 ADD COLUMN visual_mode VARCHAR(12) NULL;
UPDATE nb_user_profile SET
 card_audience_code=COALESCE(card_audience_code,audience_code),
 ui_language_mode=COALESCE(ui_language_mode,CASE WHEN audience_code='CHILD' THEN 'CLEAR' ELSE 'DETAILED' END),
 visual_mode=COALESCE(visual_mode,CASE WHEN audience_code='CHILD' THEN 'WONDER' ELSE 'NIGHT' END);
ALTER TABLE nb_user_profile
 MODIFY card_audience_code VARCHAR(10) NOT NULL,
 MODIFY ui_language_mode VARCHAR(12) NOT NULL,
 MODIFY visual_mode VARCHAR(12) NOT NULL;
