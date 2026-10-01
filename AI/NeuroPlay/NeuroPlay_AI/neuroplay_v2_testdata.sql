-- ============================================================================
-- NeuroPlay v2.0 — Testdaten
-- ============================================================================

-- Tenants & Orgs
INSERT INTO tenants (public_id, name, slug, subscription_level) VALUES
(UUID(), 'NeuroWays Demo', 'neurowaysdemo', 'professional');

INSERT INTO organizations (public_id, tenant_id, name, slug, org_type) VALUES
(UUID(), 1, 'Demo Schule', 'demo-schule', 'school'),
(UUID(), 1, 'Demo Klinik', 'demo-klinik', 'clinic');

-- Users
INSERT INTO users (public_id, tenant_id, email, display_name, status, user_type) VALUES
(UUID(), 1, 'alice@demo.local', 'Alice', 'active', 'regular_user'),
(UUID(), 1, 'bob@demo.local', 'Bob', 'active', 'coach'),
(UUID(), 1, 'charlie@demo.local', 'Charlie', 'active', 'regular_user');

INSERT INTO user_accounts (user_id, password_hash, email_verified) VALUES
(1, '$2b$12$hash_alice', TRUE),
(2, '$2b$12$hash_bob', TRUE),
(3, '$2b$12$hash_charlie', TRUE);

INSERT INTO user_roles (user_id, role_id, org_id) VALUES
(1, 1, 1),  -- Alice = user in org 1
(2, 3, 1),  -- Bob = moderator in org 1
(3, 1, 2);  -- Charlie = user in org 2

-- Categories & Tags
INSERT INTO categories (public_id, tenant_id, name, slug) VALUES
(UUID(), 1, 'Brettspiele', 'brettspiele'),
(UUID(), 1, 'Kooperativ', 'kooperativ'),
(UUID(), 1, 'Familie', 'familie');

INSERT INTO tags (public_id, tenant_id, name, slug, tag_category) VALUES
(UUID(), 1, 'Strategisch', 'strategisch', 'gameplay'),
(UUID(), 1, 'Schnell', 'schnell', 'duration'),
(UUID(), 1, 'Leicht zu lernen', 'leicht-zu-lernen', 'difficulty');

-- Attribute Definitions
INSERT INTO attribute_definitions (public_id, tenant_id, name, slug, attribute_group, data_type) VALUES
(UUID(), 1, 'Regelkomplexität', 'regelkomplexitaet', 'cognitive', 'enum'),
(UUID(), 1, 'Kooperation nötig', 'kooperation_noetig', 'social', 'boolean'),
(UUID(), 1, 'Spieldauer (Min)', 'spieldauer_min', 'cognitive', 'number');

-- Activities
INSERT INTO activities (public_id, tenant_id, name, slug, activity_type, short_description, status, created_by) VALUES
(UUID(), 1, 'Catan', 'catan', 'board_game', 'Handelsspiel mit Ressourcenmanagement', 'published', 1),
(UUID(), 1, 'Pandemic', 'pandemic', 'board_game', 'Kooperatives Spiel gegen Krankheiten', 'published', 1),
(UUID(), 1, 'Ticket to Ride', 'ticket-to-ride', 'board_game', 'Eisenbahn-Netzwerk-Spiel', 'published', 1);

-- Activity DNA
INSERT INTO activity_dna (activity_id, definition_id, value, confidence, source_type) VALUES
(1, 1, 'mittel', 95, 'redactional'),
(1, 2, '0', 90, 'redactional'),
(1, 3, '60', 85, 'redactional'),
(2, 1, 'mittel', 95, 'redactional'),
(2, 2, '1', 100, 'redactional'),
(2, 3, '45', 90, 'redactional');

-- Activity-Category Links
INSERT INTO activity_categories (activity_id, category_id) VALUES
(1, 1),  -- Catan in Brettspiele
(1, 3),  -- Catan in Familie
(2, 1),  -- Pandemic in Brettspiele
(2, 2),  -- Pandemic in Kooperativ
(3, 1);  -- Ticket in Brettspiele

-- Activity-Tag Links
INSERT INTO activity_tags (activity_id, tag_id) VALUES
(1, 1),  -- Catan = Strategisch
(1, 3),  -- Catan = Leicht zu lernen
(2, 2),  -- Pandemic = Schnell
(3, 2),  -- Ticket = Schnell
(3, 3);  -- Ticket = Leicht zu lernen

-- Rules
INSERT INTO rules (public_id, activity_id, rule_type, title, short_description, quality_status, created_by) VALUES
(UUID(), 1, 'basic_rule', 'Sieg', 'Wer zuerst 10 Punkte hat, gewinnt', 'verified', 1),
(UUID(), 1, 'action_rule', 'Ressourcen sammeln', 'Sammle Rohstoffe, um zu bauen', 'verified', 1),
(UUID(), 2, 'basic_rule', 'Kooperation', 'Spieler arbeiten zusammen', 'verified', 1),
(UUID(), 2, 'end_condition', 'Spielende', 'Spiel endet wenn 3 Krankheiten nicht kuriert', 'verified', 1);

-- Phases
INSERT INTO phases (public_id, activity_id, name, slug, phase_order) VALUES
(UUID(), 1, 'Setup', 'setup', 1),
(UUID(), 1, 'Spielzüge', 'spielzuege', 2),
(UUID(), 1, 'Wertung', 'wertung', 3);

-- Steps
INSERT INTO steps (public_id, phase_id, name, step_order) VALUES
(UUID(), 1, 'Spieler positionieren', 1),
(UUID(), 1, 'Ressourcen verteilen', 2),
(UUID(), 2, 'Aktion ausführen', 1),
(UUID(), 2, 'Würfel werfen', 2);

-- Learning Units
INSERT INTO learning_units (public_id, tenant_id, related_activity_id, unit_type, title_en) VALUES
(UUID(), 1, 1, 'explanation', 'Understanding Catan resources'),
(UUID(), 1, 1, 'example', 'How to trade effectively'),
(UUID(), 1, 2, 'explanation', 'Pandemic rules overview');

-- Human Profiles
INSERT INTO human_profiles (user_id, profile_data, consent_given, visibility) VALUES
(1, JSON_OBJECT('experience_level', 'intermediate', 'goals', JSON_ARRAY('improve_strategy', 'social_connection')), TRUE, 'friends'),
(3, JSON_OBJECT('experience_level', 'beginner', 'goals', JSON_ARRAY('learn', 'fun')), FALSE, 'private');

-- Preferences
INSERT INTO preferences (user_id, preferred_duration_min, preferred_duration_max, preferred_complexity) VALUES
(1, 45, 120, 'moderate'),
(3, 30, 60, 'simple');

-- Needs
INSERT INTO needs (user_id, need_type, intensity, source_type) VALUES
(1, 'social_connection', 8, 'self_reported'),
(1, 'activation', 6, 'self_reported'),
(3, 'relaxation', 7, 'self_reported');

-- Consents
INSERT INTO consents (user_id, consent_type, granted, legal_basis, purpose) VALUES
(1, 'profile_usage', TRUE, 'explicit_consent', 'Personalisierte Empfehlungen'),
(1, 'ai_analysis', TRUE, 'explicit_consent', 'KI-Modell-Verbesserung'),
(3, 'profile_usage', FALSE, 'explicit_consent', 'Nicht gegeben');

-- Groups
INSERT INTO groups (public_id, tenant_id, name, group_type) VALUES
(UUID(), 1, 'Spielgruppe A', 'temporary_game_group'),
(UUID(), 1, 'Familie Schmidt', 'family');

-- Group Members
INSERT INTO group_members (group_id, user_id, role_in_group) VALUES
(1, 1, 'member'),
(1, 3, 'member'),
(2, 1, 'organizer'),
(2, 3, 'member');

-- Situations
INSERT INTO situations (user_id, situation_data, available_time_minutes, location_type, group_size, available_energy, mood) VALUES
(1, JSON_OBJECT('context', 'evening game night'), 120, 'home', 3, 'high', 'relaxed'),
(3, JSON_OBJECT('context', 'afternoon workshop'), 90, 'workshop', 5, 'moderate', 'neutral');

-- Sessions
INSERT INTO activity_sessions (public_id, user_id, activity_id, situation_id, session_status, started_at, ended_at, duration_minutes, created_by) VALUES
(UUID(), 1, 1, 1, 'completed', DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY) + INTERVAL 65 MINUTE, 65, 1),
(UUID(), 3, 2, 2, 'completed', DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY) + INTERVAL 50 MINUTE, 50, 3),
(UUID(), 1, 3, 1, 'completed', NOW() - INTERVAL 10 MINUTE, NOW(), 45, 1);

-- Session Participants
INSERT INTO session_participants (session_id, user_id, role_in_session, score) VALUES
(1, 1, 'player', 8),
(1, 3, 'player', 5),
(2, 3, 'player', 12),
(3, 1, 'player', 6);

-- Session Events
INSERT INTO session_events (session_id, event_sequence, event_type, actor_id, event_data, timestamp) VALUES
(1, 1, 'action_taken', 1, JSON_OBJECT('action', 'place_settlement', 'location', 'A1'), NOW() - INTERVAL 5 MINUTE),
(1, 2, 'action_taken', 3, JSON_OBJECT('action', 'build_road', 'location', 'B2'), NOW() - INTERVAL 4 MINUTE),
(1, 3, 'game_ended', 1, JSON_OBJECT('winner', 'Alice', 'final_score', 8), NOW());

-- Observations
INSERT INTO observations (session_id, observation_type, content, observed_by, observed_at, visibility) VALUES
(1, 'engagement', 'Alice war sehr fokussiert und machte schnelle Entscheidungen', 1, NOW() - INTERVAL 2 HOUR, 'shared'),
(1, 'interaction', 'Positive Zusammenarbeit und Lachen zwischen den Spielern', 1, NOW() - INTERVAL 1 HOUR, 'shared'),
(2, 'learning_moment', 'Charlie verstand die Regeln schnell nach einer Erklärung', 3, NOW() - INTERVAL 30 MINUTE, 'coach');

-- Impacts
INSERT INTO impacts (session_id, impact_dimension, direction, intensity, source, reported_by) VALUES
(1, 'mood', 'positive', 8, 'self_reported', 1),
(1, 'social_connection', 'positive', 9, 'self_reported', 1),
(2, 'mood', 'positive', 7, 'self_reported', 3),
(2, 'learning', 'positive', 8, 'observed', 3),
(3, 'relaxation', 'positive', 6, 'self_reported', 1);

-- Reflections
INSERT INTO reflections (session_id, user_id, reflection_data, would_repeat) VALUES
(1, 1, JSON_OBJECT('feeling', 'energized', 'what_helped', 'Good friends to play with'), TRUE),
(2, 3, JSON_OBJECT('feeling', 'accomplished', 'what_was_difficult', 'Learning new rules'), TRUE),
(3, 1, JSON_OBJECT('feeling', 'satisfied', 'next_time', 'Try more aggressive strategy'), TRUE);

-- Learning Progress
INSERT INTO learning_progress (user_id, learning_unit_id, status, comprehension_level, repetitions_count, confirmed_understanding) VALUES
(1, 1, 'confidently_understood', 95, 2, TRUE),
(1, 2, 'partially_understood', 65, 1, FALSE),
(3, 3, 'seen', 30, 0, FALSE);

-- Recommendations
INSERT INTO recommendations (public_id, user_id, situation_id, activity_id, ranking, suitability_score, rationale, considered_factors, model_version) VALUES
(UUID(), 1, 1, 2, 1, 92, 'Pandemic passt perfekt zu deinen Bedürfnissen für Zusammenarbeit', JSON_OBJECT('needs', JSON_ARRAY('social_connection'), 'group_size', 3), 'v1.0'),
(UUID(), 3, 2, 1, 1, 75, 'Catan bietet gute Balance zwischen Lernen und Spaß', JSON_OBJECT('needs', JSON_ARRAY('learning'), 'complexity', 'moderate'), 'v1.0'),
(UUID(), 1, 1, 3, 2, 85, 'Ticket to Ride als schnellere Alternative', JSON_OBJECT('available_time', 120), 'v1.0');

-- AI Generations
INSERT INTO ai_generations (tenant_id, provider, model_name, output_text, confidence, review_status, entity_type, entity_id) VALUES
(1, 'openai', 'gpt-4', 'Catan ist ein Strategiespiel mit Ressourcenmanagement und Handelselementen', 70, 'approved', 'activity_description', 1);

-- Development Records
INSERT INTO development_records (user_id, development_dimension, change_description, verified) VALUES
(1, 'strategies', 'Alice hat gelernt, aggressiver zu verhandeln', TRUE),
(3, 'self_understanding', 'Charlie erkennt bessere Bedürfniserkennung', FALSE);

-- ============================================================================
-- END TEST DATA
-- ============================================================================
