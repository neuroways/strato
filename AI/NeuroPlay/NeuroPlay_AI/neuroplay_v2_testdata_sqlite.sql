-- ============================================================================
-- NeuroPlay v2.0 — Testdaten (SQLite)
-- ============================================================================

INSERT INTO tenants (tenant_id, public_id, name, slug, subscription_level) VALUES
(1, 'uuid-tenant-1', 'NeuroWays Demo', 'neurowaysdemo', 'professional');

INSERT INTO organizations (org_id, public_id, tenant_id, name, slug, org_type) VALUES
(1, 'uuid-org-1', 1, 'Demo Schule', 'demo-schule', 'school'),
(2, 'uuid-org-2', 1, 'Demo Klinik', 'demo-klinik', 'clinic');

INSERT INTO users (user_id, public_id, tenant_id, email, display_name, status, user_type) VALUES
(1, 'uuid-user-1', 1, 'alice@demo.local', 'Alice', 'active', 'regular_user'),
(2, 'uuid-user-2', 1, 'bob@demo.local', 'Bob', 'active', 'coach'),
(3, 'uuid-user-3', 1, 'charlie@demo.local', 'Charlie', 'active', 'regular_user');

INSERT INTO user_accounts (account_id, user_id, password_hash, email_verified) VALUES
(1, 1, '$2b$12$hash_alice', 1),
(2, 2, '$2b$12$hash_bob', 1),
(3, 3, '$2b$12$hash_charlie', 1);

INSERT INTO user_roles (user_id, role_id, org_id) VALUES
(1, 1, 1),
(2, 3, 1),
(3, 1, 2);

INSERT INTO categories (public_id, tenant_id, name, slug) VALUES
('uuid-cat-1', 1, 'Brettspiele', 'brettspiele'),
('uuid-cat-2', 1, 'Kooperativ', 'kooperativ'),
('uuid-cat-3', 1, 'Familie', 'familie');

INSERT INTO tags (public_id, tenant_id, name, slug, tag_category) VALUES
('uuid-tag-1', 1, 'Strategisch', 'strategisch', 'gameplay'),
('uuid-tag-2', 1, 'Schnell', 'schnell', 'duration'),
('uuid-tag-3', 1, 'Leicht zu lernen', 'leicht-zu-lernen', 'difficulty');

INSERT INTO attribute_definitions (public_id, tenant_id, name, slug, attribute_group, data_type) VALUES
('uuid-attr-1', 1, 'Regelkomplexität', 'regelkomplexitaet', 'cognitive', 'enum'),
('uuid-attr-2', 1, 'Kooperation nötig', 'kooperation_noetig', 'social', 'boolean'),
('uuid-attr-3', 1, 'Spieldauer (Min)', 'spieldauer_min', 'cognitive', 'number');

INSERT INTO activities (public_id, tenant_id, name, slug, activity_type, short_description, status, created_by) VALUES
('uuid-act-1', 1, 'Catan', 'catan', 'board_game', 'Handelsspiel mit Ressourcenmanagement', 'published', 1),
('uuid-act-2', 1, 'Pandemic', 'pandemic', 'board_game', 'Kooperatives Spiel gegen Krankheiten', 'published', 1),
('uuid-act-3', 1, 'Ticket to Ride', 'ticket-to-ride', 'board_game', 'Eisenbahn-Netzwerk-Spiel', 'published', 1);

INSERT INTO activity_dna (activity_id, definition_id, value, confidence, source_type) VALUES
(1, 1, 'mittel', 95, 'redactional'),
(1, 2, '0', 90, 'redactional'),
(1, 3, '60', 85, 'redactional'),
(2, 1, 'mittel', 95, 'redactional'),
(2, 2, '1', 100, 'redactional'),
(2, 3, '45', 90, 'redactional');

INSERT INTO activity_categories (activity_id, category_id) VALUES
(1, 1),
(1, 3),
(2, 1),
(2, 2),
(3, 1);

INSERT INTO activity_tags (activity_id, tag_id) VALUES
(1, 1),
(1, 3),
(2, 2),
(3, 2),
(3, 3);

INSERT INTO rules (public_id, activity_id, rule_type, title, short_description, quality_status, created_by) VALUES
('uuid-rule-1', 1, 'basic_rule', 'Sieg', 'Wer zuerst 10 Punkte hat, gewinnt', 'verified', 1),
('uuid-rule-2', 1, 'action_rule', 'Ressourcen sammeln', 'Sammle Rohstoffe, um zu bauen', 'verified', 1),
('uuid-rule-3', 2, 'basic_rule', 'Kooperation', 'Spieler arbeiten zusammen', 'verified', 1),
('uuid-rule-4', 2, 'end_condition', 'Spielende', 'Spiel endet wenn 3 Krankheiten nicht kuriert', 'verified', 1);

INSERT INTO phases (public_id, activity_id, name, description, phase_order) VALUES
('uuid-phase-1', 1, 'Setup', 'Spielaufbau', 1),
('uuid-phase-2', 1, 'Spielzüge', 'Hauptspiel', 2),
('uuid-phase-3', 1, 'Wertung', 'Endergebnis', 3);

INSERT INTO steps (public_id, phase_id, name, step_order) VALUES
('uuid-step-1', 1, 'Spieler positionieren', 1),
('uuid-step-2', 1, 'Ressourcen verteilen', 2),
('uuid-step-3', 2, 'Aktion ausführen', 1),
('uuid-step-4', 2, 'Würfel werfen', 2);

INSERT INTO learning_units (public_id, tenant_id, related_activity_id, unit_type, title_en) VALUES
('uuid-learn-1', 1, 1, 'explanation', 'Understanding Catan resources'),
('uuid-learn-2', 1, 1, 'example', 'How to trade effectively'),
('uuid-learn-3', 1, 2, 'explanation', 'Pandemic rules overview');

INSERT INTO human_profiles (user_id, profile_data, consent_given, visibility) VALUES
(1, '{"experience_level":"intermediate","goals":["improve_strategy","social_connection"]}', 1, 'friends'),
(3, '{"experience_level":"beginner","goals":["learn","fun"]}', 0, 'private');

INSERT INTO preferences (user_id, preferred_duration_min, preferred_duration_max, preferred_complexity) VALUES
(1, 45, 120, 'moderate'),
(3, 30, 60, 'simple');

INSERT INTO needs (user_id, need_type, intensity, source_type) VALUES
(1, 'social_connection', 8, 'self_reported'),
(1, 'activation', 6, 'self_reported'),
(3, 'relaxation', 7, 'self_reported');

INSERT INTO consents (user_id, consent_type, granted, legal_basis, purpose) VALUES
(1, 'profile_usage', 1, 'explicit_consent', 'Personalisierte Empfehlungen'),
(1, 'ai_analysis', 1, 'explicit_consent', 'KI-Modell-Verbesserung'),
(3, 'profile_usage', 0, 'explicit_consent', 'Nicht gegeben');

INSERT INTO groups (public_id, tenant_id, name, group_type) VALUES
('uuid-group-1', 1, 'Spielgruppe A', 'temporary_game_group'),
('uuid-group-2', 1, 'Familie Schmidt', 'family');

INSERT INTO group_members (group_id, user_id, role_in_group) VALUES
(1, 1, 'member'),
(1, 3, 'member'),
(2, 1, 'organizer'),
(2, 3, 'member');

INSERT INTO situations (user_id, situation_data, available_time_minutes, location_type, group_size, available_energy, mood) VALUES
(1, '{"context":"evening game night"}', 120, 'home', 3, 'high', 'relaxed'),
(3, '{"context":"afternoon workshop"}', 90, 'workshop', 5, 'moderate', 'neutral');

INSERT INTO activity_sessions (public_id, user_id, activity_id, situation_id, session_status, started_at, ended_at, duration_minutes, created_by) VALUES
('uuid-sess-1', 1, 1, 1, 'completed', datetime('now', '-2 days'), datetime('now', '-2 days', '+65 minutes'), 65, 1),
('uuid-sess-2', 3, 2, 2, 'completed', datetime('now', '-1 days'), datetime('now', '-1 days', '+50 minutes'), 50, 3),
('uuid-sess-3', 1, 3, 1, 'completed', datetime('now', '-10 minutes'), datetime('now'), 45, 1);

INSERT INTO session_participants (session_id, user_id, role_in_session, score) VALUES
(1, 1, 'player', 8),
(1, 3, 'player', 5),
(2, 3, 'player', 12),
(3, 1, 'player', 6);

INSERT INTO session_events (session_id, event_sequence, event_type, actor_id, event_data, timestamp) VALUES
(1, 1, 'action_taken', 1, '{"action":"place_settlement","location":"A1"}', datetime('now', '-5 minutes')),
(1, 2, 'action_taken', 3, '{"action":"build_road","location":"B2"}', datetime('now', '-4 minutes')),
(1, 3, 'game_ended', 1, '{"winner":"Alice","final_score":8}', datetime('now'));

INSERT INTO observations (session_id, observation_type, content, observed_by, observed_at, visibility) VALUES
(1, 'engagement', 'Alice war sehr fokussiert und machte schnelle Entscheidungen', 1, datetime('now', '-2 hours'), 'shared'),
(1, 'interaction', 'Positive Zusammenarbeit und Lachen zwischen den Spielern', 1, datetime('now', '-1 hour'), 'shared'),
(2, 'learning_moment', 'Charlie verstand die Regeln schnell nach einer Erklärung', 3, datetime('now', '-30 minutes'), 'coach');

INSERT INTO impacts (session_id, impact_dimension, direction, intensity, source, reported_by) VALUES
(1, 'mood', 'positive', 8, 'self_reported', 1),
(1, 'social_connection', 'positive', 9, 'self_reported', 1),
(2, 'mood', 'positive', 7, 'self_reported', 3),
(2, 'learning', 'positive', 8, 'observed', 3),
(3, 'relaxation', 'positive', 6, 'self_reported', 1);

INSERT INTO reflections (session_id, user_id, reflection_data, would_repeat) VALUES
(1, 1, '{"feeling":"energized","what_helped":"Good friends to play with"}', 1),
(2, 3, '{"feeling":"accomplished","what_was_difficult":"Learning new rules"}', 1),
(3, 1, '{"feeling":"satisfied","next_time":"Try more aggressive strategy"}', 1);

INSERT INTO learning_progress (user_id, learning_unit_id, status, comprehension_level, repetitions_count, confirmed_understanding) VALUES
(1, 1, 'confidently_understood', 95, 2, 1),
(1, 2, 'partially_understood', 65, 1, 0),
(3, 3, 'seen', 30, 0, 0);

INSERT INTO recommendations (public_id, user_id, situation_id, activity_id, ranking, suitability_score, rationale, considered_factors, model_version) VALUES
('uuid-rec-1', 1, 1, 2, 1, 92, 'Pandemic passt perfekt zu deinen Bedürfnissen für Zusammenarbeit', '{"needs":["social_connection"],"group_size":3}', 'v1.0'),
('uuid-rec-2', 3, 2, 1, 1, 75, 'Catan bietet gute Balance zwischen Lernen und Spaß', '{"needs":["learning"],"complexity":"moderate"}', 'v1.0'),
('uuid-rec-3', 1, 1, 3, 2, 85, 'Ticket to Ride als schnellere Alternative', '{"available_time":120}', 'v1.0');

INSERT INTO ai_generations (tenant_id, provider, model_name, output_text, confidence, review_status, entity_type, entity_id) VALUES
(1, 'openai', 'gpt-4', 'Catan ist ein Strategiespiel mit Ressourcenmanagement und Handelselementen', 70, 'approved', 'activity_description', 1);

INSERT INTO development_records (user_id, development_dimension, change_description, verified) VALUES
(1, 'strategies', 'Alice hat gelernt, aggressiver zu verhandeln', 1),
(3, 'self_understanding', 'Charlie erkennt bessere Bedürfniserkennung', 0);
