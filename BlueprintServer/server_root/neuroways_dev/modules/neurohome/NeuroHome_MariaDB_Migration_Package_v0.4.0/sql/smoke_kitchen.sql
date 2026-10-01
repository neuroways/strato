-- NeuroHome v0.4.0 · Reversibler Küchenpilot
-- Nach erfolgreicher Ausführung werden alle Testdaten per ROLLBACK entfernt.

SET time_zone = '+00:00';
START TRANSACTION;

SET @home = UNHEX(REPLACE('0199b001-0000-7000-8000-000000000001','-',''));
SET @person = UNHEX(REPLACE('0199b001-0000-7000-8000-000000000002','-',''));
SET @member = UNHEX(REPLACE('0199b001-0000-7000-8000-000000000003','-',''));
SET @place_home = UNHEX(REPLACE('0199b002-0000-7000-8000-000000000001','-',''));
SET @floor = UNHEX(REPLACE('0199b002-0000-7000-8000-000000000002','-',''));
SET @kitchen = UNHEX(REPLACE('0199b002-0000-7000-8000-000000000003','-',''));
SET @cabinet = UNHEX(REPLACE('0199b002-0000-7000-8000-000000000004','-',''));
SET @shelf = UNHEX(REPLACE('0199b002-0000-7000-8000-000000000005','-',''));
SET @category = UNHEX(REPLACE('0199b003-0000-7000-8000-000000000001','-',''));
SET @item = UNHEX(REPLACE('0199b003-0000-7000-8000-000000000002','-',''));
SET @assignment = UNHEX(REPLACE('0199b003-0000-7000-8000-000000000003','-',''));
SET @zone = UNHEX(REPLACE('0199b004-0000-7000-8000-000000000001','-',''));
SET @session = UNHEX(REPLACE('0199b005-0000-7000-8000-000000000001','-',''));

INSERT INTO NHO_HOMES (id, code, title, status) VALUES (@home, 'SMOKE_HOME', 'Testhaushalt Küche', 'published');
INSERT INTO NHO_HOME_MEMBERS (id, home_id, person_id, role_code) VALUES (@member, @home, @person, 'HOME_OWNER');

INSERT INTO NHO_PLACES (id, home_id, parent_place_id, place_type_code, code, name, normalized_name, sort_order) VALUES
(@place_home,@home,NULL,'HOME','SMOKE_HOME_ROOT','Zuhause','zuhause',10),
(@floor,@home,@place_home,'FLOOR','SMOKE_GROUND_FLOOR','Untergeschoss','untergeschoss',20),
(@kitchen,@home,@floor,'ROOM','SMOKE_KITCHEN','Küche','kueche',30),
(@cabinet,@home,@kitchen,'FURNITURE','SMOKE_HIGH_CABINET','Hochschrank','hochschrank',40),
(@shelf,@home,@cabinet,'STORAGE_LOCATION','SMOKE_SHELF','Fach','fach',50);

INSERT INTO NHO_CATEGORIES (id, home_id, code, name, normalized_name) VALUES
(@category,@home,'SMOKE_BAKING_TOOLS','Backzubehör','backzubehoer');
INSERT INTO NHO_ITEMS (id, home_id, primary_category_id, code, name, normalized_name) VALUES
(@item,@home,@category,'SMOKE_KITCHEN_SCALE','Küchenwaage','kuechenwaage');
INSERT INTO NHO_ITEM_CATEGORY_LINKS (item_id, category_id, is_primary) VALUES (@item,@category,1);
INSERT INTO NHO_HOME_ASSIGNMENTS (id, home_id, subject_kind, item_id, place_id, purpose_code, priority, is_primary)
VALUES (@assignment,@home,'ITEM',@item,@shelf,'PRIMARY_HOME',10,1);

INSERT INTO NHO_ZONES (id, home_id, place_id, code, name) VALUES (@zone,@home,@kitchen,'SMOKE_KITCHEN_ENTRY','Kücheneingang');
INSERT INTO NHO_ZONE_ROLES (id, zone_id, role_code) VALUES
(UNHEX(REPLACE('0199b004-0000-7000-8000-000000000011','-','')),@zone,'PARKING'),
(UNHEX(REPLACE('0199b004-0000-7000-8000-000000000012','-','')),@zone,'CHAOS_PROTECTION'),
(UNHEX(REPLACE('0199b004-0000-7000-8000-000000000013','-','')),@zone,'VISITOR');

INSERT INTO NHO_OBSERVATIONS (id, home_id, observation_type_code, item_id, state_code, value_text, visibility_code, observed_at)
VALUES (UNHEX(REPLACE('0199b006-0000-7000-8000-000000000001','-','')),@home,'ITEM_POSITION',@item,'SEEN','Küchenarbeitsfläche','HOME_SHARED',CURRENT_TIMESTAMP(6));
INSERT INTO NHO_OBSERVATIONS (id, home_id, observation_type_code, place_id, state_code, value_text, visibility_code, observed_at) VALUES
(UNHEX(REPLACE('0199b006-0000-7000-8000-000000000002','-','')),@home,'PLACE_STATE',@kitchen,'BEFORE','Arbeitsfläche blockiert','HOME_SHARED',CURRENT_TIMESTAMP(6)),
(UNHEX(REPLACE('0199b006-0000-7000-8000-000000000003','-','')),@home,'PLACE_STATE',@kitchen,'AFTER','Arbeitsfläche wieder benutzbar','HOME_SHARED',CURRENT_TIMESTAMP(6));

INSERT INTO NHO_SEARCH_DOCUMENTS (home_id, subject_kind, subject_id, display_name, search_text, home_path_text, observed_path_text, status_phrase_code, source_updated_at)
VALUES (@home,'ITEM',@item,'Küchenwaage','Küchenwaage Waage Backzubehör','Zuhause → Untergeschoss → Küche → Hochschrank → Fach','Zuhause → Untergeschoss → Küche → Arbeitsfläche','LAST_SEEN_AT',CURRENT_TIMESTAMP(6));

INSERT INTO NHO_SESSIONS (id, home_id, person_id, status, timezone_name) VALUES (@session,@home,@person,'ACTIVE','Europe/Berlin');
INSERT INTO NHO_SESSION_CHECKINS (id, session_id, phase_code, available_minutes, energy_code, feeling_code, home_feeling_code, main_problem_code)
VALUES (UNHEX(REPLACE('0199b005-0000-7000-8000-000000000011','-','')),@session,'START',15,'LOW','BLOCKED','ONE_ROOM_TIPPING','FULL_SURFACES');
INSERT INTO NHO_SESSION_SCOPES (id, session_id, revision_no, scope_type_code, title)
VALUES (UNHEX(REPLACE('0199b005-0000-7000-8000-000000000012','-','')),@session,1,'PLACES','Heute nur die Küche');
INSERT INTO NHO_SESSION_SCOPE_TARGETS (id, session_scope_id, target_kind, place_id, sequence_no)
VALUES (UNHEX(REPLACE('0199b005-0000-7000-8000-000000000013','-','')),UNHEX(REPLACE('0199b005-0000-7000-8000-000000000012','-','')),'PLACE',@kitchen,1);
INSERT INTO NHO_SESSION_METHODS (id, session_id, method_version_id, reason_code, reason_text)
VALUES (UNHEX(REPLACE('0199b005-0000-7000-8000-000000000014','-','')),@session,UNHEX(REPLACE('0199a002-0000-7000-8000-000000000005','-','')),'RESTORE_ROOM_FUNCTION','Die Küche soll wieder benutzbar werden.');
INSERT INTO NHO_SESSION_ACTIONS (id, session_id, action_no, action_type_code, place_id, result_code)
VALUES (UNHEX(REPLACE('0199b005-0000-7000-8000-000000000015','-','')),@session,1,'STEP_CONFIRMED',@kitchen,'WORK_SURFACE_USABLE');
INSERT INTO NHO_SESSION_CLOSES (id, session_id, completion_code, effect_code, energy_after_code, what_worked_text)
VALUES (UNHEX(REPLACE('0199b005-0000-7000-8000-000000000016','-','')),@session,'FINISHED','MORE_USABLE','LOW','Der begrenzte Raumrahmen hat funktioniert.');
UPDATE NHO_SESSIONS SET status = 'CLOSED', ended_at = CURRENT_TIMESTAMP(6), row_version = row_version + 1 WHERE id = @session;

SELECT display_name, home_path_text, observed_path_text, status_phrase_code
FROM NHO_SEARCH_DOCUMENTS
WHERE home_id = @home AND MATCH(search_text) AGAINST('+waage*' IN BOOLEAN MODE);

SELECT s.status, c.available_minutes, sc.scope_type_code, m.code AS method_code,
       COUNT(a.id) AS confirmed_actions, cl.effect_code
FROM NHO_SESSIONS s
JOIN NHO_SESSION_CHECKINS c ON c.session_id = s.id AND c.phase_code = 'START'
JOIN NHO_SESSION_SCOPES sc ON sc.session_id = s.id AND sc.revision_no = 1
JOIN NHO_SESSION_METHODS sm ON sm.session_id = s.id
JOIN NHO_METHOD_VERSIONS mv ON mv.id = sm.method_version_id
JOIN NHO_METHODS m ON m.id = mv.method_id
LEFT JOIN NHO_SESSION_ACTIONS a ON a.session_id = s.id
JOIN NHO_SESSION_CLOSES cl ON cl.session_id = s.id
WHERE s.id = @session
GROUP BY s.status, c.available_minutes, sc.scope_type_code, m.code, cl.effect_code;

SELECT role_code FROM NHO_ZONE_ROLES WHERE zone_id = @zone ORDER BY role_code;

ROLLBACK;
