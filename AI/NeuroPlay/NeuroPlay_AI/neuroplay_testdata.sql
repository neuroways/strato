-- ============================================================================
-- NeuroPlay Testdaten
-- Version 1.0
-- Vollständiges Szenario mit echten Beispielen
-- ============================================================================
-- Dieses Skript lädt realistische Testdaten, um das Schema zu demonstrieren.
-- ============================================================================

-- ============================================================================
-- REFERENCE DATA: Kategorien
-- ============================================================================

INSERT INTO category (name, slug, description, icon, sort_order) VALUES
('Strategy Games', 'strategy-games', 'Games requiring strategic thinking and planning', 'chess', 10),
('Cooperative Games', 'cooperative-games', 'Games where players work together toward a common goal', 'users', 20),
('Party Games', 'party-games', 'Games designed for groups and social occasions', 'party-popper', 30),
('Family Games', 'family-games', 'Games suitable for family play with children', 'heart', 40),
('Dice Games', 'dice-games', 'Games featuring dice as primary mechanic', 'dice', 50),
('Worker Placement', 'worker-placement', 'Games where players place tokens to take actions', 'cube', 60),
('Tile Laying', 'tile-laying', 'Games featuring tile placement and network building', 'grid', 70),
('Trading', 'trading', 'Games emphasizing negotiation and trade', 'scale', 80);

-- ============================================================================
-- REFERENCE DATA: Attribute Definitions
-- ============================================================================

INSERT INTO attribute_definition 
(name, slug, attribute_group, description, data_type, min_value, max_value, example_value) VALUES

-- Cognitive Attributes
('Rules Complexity', 'rules_complexity', 'cognitive', 'How difficult are the rules to learn?', 'enum', NULL, NULL, 'moderate'),
('Strategic Depth', 'strategic_depth', 'cognitive', 'How much strategic thinking is involved?', 'enum', NULL, NULL, 'high'),
('Memory Requirements', 'memory_requirements', 'cognitive', 'How much memory/recall is needed?', 'enum', NULL, NULL, 'low'),
('Math Skills', 'math_skills', 'cognitive', 'How much math is involved?', 'number', 0, 10, '3'),
('Puzzle Solving', 'puzzle_solving', 'cognitive', 'Does the game involve puzzle solving?', 'boolean', NULL, NULL, 'true'),
('Attention Span', 'attention_span_minutes', 'cognitive', 'How long must players focus continuously?', 'number', 5, 480, '45'),

-- Social Attributes
('Requires Cooperation', 'requires_cooperation', 'social', 'Do players need to work together?', 'boolean', NULL, NULL, 'true'),
('Requires Negotiation', 'requires_negotiation', 'social', 'Does the game involve negotiation/trading?', 'boolean', NULL, NULL, 'true'),
('Conflict Level', 'conflict_level', 'social', 'How much direct conflict/competition?', 'enum', NULL, NULL, 'moderate'),
('Player Elimination', 'player_elimination', 'social', 'Can players be eliminated and wait?', 'boolean', NULL, NULL, 'false'),

-- Emotional Attributes
('Stress Level', 'stress_level', 'emotional', 'How stressful is the game?', 'enum', NULL, NULL, 'low'),
('Frustration Risk', 'frustration_risk', 'emotional', 'How likely to cause frustration?', 'enum', NULL, NULL, 'moderate'),
('Success Feeling', 'success_feeling', 'emotional', 'How much feeling of accomplishment?', 'enum', NULL, NULL, 'high'),

-- Physical Attributes
('Physical Activity', 'physical_activity', 'physical', 'How much movement/physical activity?', 'enum', NULL, NULL, 'minimal'),
('Manual Dexterity', 'manual_dexterity', 'physical', 'How much fine motor control needed?', 'enum', NULL, NULL, 'low'),

-- Sensory Attributes
('Audio Elements', 'audio_elements', 'sensory', 'Does the game use sound/music?', 'boolean', NULL, NULL, 'false'),
('Visual Elements', 'visual_elements', 'sensory', 'How visually rich is the game?', 'enum', NULL, NULL, 'medium'),
('Tactile Elements', 'tactile_elements', 'sensory', 'How much touching/handling of pieces?', 'enum', NULL, NULL, 'high'),

-- Accessibility
('Suitable for Colourblind', 'suitable_colourblind', 'accessibility', 'Is the game playable for colourblind players?', 'boolean', NULL, NULL, 'true'),
('Wheelchair Accessible', 'wheelchair_accessible', 'accessibility', 'Can a wheelchair user play comfortably?', 'boolean', NULL, NULL, 'true'),
('Language Independent', 'language_independent', 'accessibility', 'Can be played without reading?', 'boolean', NULL, NULL, 'false');

-- ============================================================================
-- REFERENCE DATA: Tags
-- ============================================================================

INSERT INTO tag (name, slug, category) VALUES
('Cooperative', 'cooperative', 'gameplay'),
('Competitive', 'competitive', 'gameplay'),
('Asymmetric', 'asymmetric', 'gameplay'),
('No Player Elimination', 'no-elimination', 'gameplay'),
('Simultaneous Actions', 'simultaneous-actions', 'gameplay'),
('Turn-Based', 'turn-based', 'gameplay'),

('Fantasy', 'fantasy', 'theme'),
('Science Fiction', 'sci-fi', 'theme'),
('History', 'history', 'theme'),
('Animals', 'animals', 'theme'),
('Abstract', 'abstract', 'theme'),
('Urban', 'urban', 'theme'),

('Quick to Learn', 'quick-to-learn', 'difficulty'),
('Easy to Teach', 'easy-to-teach', 'difficulty'),
('Advanced Strategy', 'advanced-strategy', 'difficulty'),

('Solo Play', 'solo-play', 'mode'),
('2 Players', 'two-players', 'mode'),
('Large Groups', 'large-groups', 'mode'),

('Under 30 Minutes', 'under-30min', 'duration'),
('30-60 Minutes', '30-60min', 'duration'),
('Over 2 Hours', 'over-2h', 'duration'),

('Family Friendly', 'family-friendly', 'audience'),
('Adults', 'adults', 'audience'),
('Children', 'children', 'audience');

-- ============================================================================
-- REFERENCE DATA: Publishers
-- ============================================================================

INSERT INTO publisher (public_id, name, country, website, founded_year) VALUES
(UUID(), 'Catan Studio', 'Germany', 'https://www.catan.com/', 1995),
(UUID(), 'Asmodee', 'France', 'https://www.asmodee.com/', 2002),
(UUID(), 'Z-Man Games', 'USA', 'https://www.zmangames.com/', 2000),
(UUID(), 'Lookout Games', 'Germany', 'https://www.lookout-games.de/', 2000),
(UUID(), 'Portal Games', 'Poland', 'https://www.portalgames.pl/', 2000),
(UUID(), 'Stonemaier Games', 'USA', 'https://www.stonemaiergames.com/', 2012),
(UUID(), 'Iello', 'France', 'https://www.iello.fr/', 2008);

-- ============================================================================
-- REFERENCE DATA: Persons (Game Designers, Illustrators, etc.)
-- ============================================================================

INSERT INTO person (public_id, first_name, last_name, full_name, role_type, bio) VALUES
(UUID(), 'Klaus', 'Teuber', 'Klaus Teuber', 'author', 'German board game designer, creator of Catan'),
(UUID(), 'Vital', 'Lacerda', 'Vital Lacerda', 'author', 'Portuguese board game designer known for heavy strategy games'),
(UUID(), 'Reiner', 'Knizia', 'Reiner Knizia', 'author', 'Prolific German board game designer with over 600 published designs'),
(UUID(), 'Bruno', 'Cathala', 'Bruno Cathala', 'author', 'French board game designer'),
(UUID(), 'Ludovic', 'Roudy', 'Ludovic Roudy', 'author', 'French board game designer'),
(UUID(), 'Jamey', 'Stegmaier', 'Jamey Stegmaier', 'author', 'American board game designer and publisher'),
(UUID(), 'Michael', 'Schacht', 'Michael Schacht', 'author', 'German board game designer'),
(UUID(), 'Dominik', 'Mayer', 'Dominik Mayer', 'illustrator', 'German illustrator for board games');

-- ============================================================================
-- SOURCES
-- ============================================================================

INSERT INTO source (public_id, source_type, title, url, trust_level, verification_status) VALUES
(UUID(), 'official_rules', 'Catan Official Rules (5th Edition)', 'https://www.catan.com/rules', 100, 'expert_approved'),
(UUID(), 'publisher_website', 'BoardGameGeek - Catan', 'https://boardgamegeek.com/boardgame/13/catan', 85, 'verified'),
(UUID(), 'scientific_paper', 'The Psychology of Board Games', 'https://example.com/research', 70, 'verified'),
(UUID(), 'ai_analysis', 'NeuroPlay AI Analysis - Catan Cognitive Load', NULL, 40, 'unverified'),
(UUID(), 'user_input', 'Community feedback on Catan', NULL, 60, 'pending');

-- ============================================================================
-- USERS
-- ============================================================================

INSERT INTO user (public_id, email, password_hash, display_name, role, status, email_verified) VALUES
(UUID(), 'alice@example.com', '$2b$12$abcdefghijklmnopqrstuvwxyz1234567890abcdefg', 'Alice', 'user', 'active', TRUE),
(UUID(), 'bob@example.com', '$2b$12$abcdefghijklmnopqrstuvwxyz1234567890abcdefg', 'Bob', 'user', 'active', TRUE),
(UUID(), 'charlie@example.com', '$2b$12$abcdefghijklmnopqrstuvwxyz1234567890abcdefg', 'Charlie', 'user', 'active', TRUE),
(UUID(), 'diana@example.com', '$2b$12$abcdefghijklmnopqrstuvwxyz1234567890abcdefg', 'Diana', 'moderator', 'active', TRUE),
(UUID(), 'admin@example.com', '$2b$12$abcdefghijklmnopqrstuvwxyz1234567890abcdefg', 'Admin User', 'admin', 'active', TRUE);

-- ============================================================================
-- HUMAN PROFILES
-- ============================================================================

INSERT INTO human_profile (user_id, profile_data, consent_given, visibility) 
SELECT 
  user_id,
  JSON_OBJECT(
    'preferences', JSON_OBJECT(
      'favorite_activities', JSON_ARRAY('board_game', 'card_game'),
      'favorite_tags', JSON_ARRAY('cooperative', 'strategy', 'family-friendly'),
      'disliked_themes', JSON_ARRAY('violence')
    ),
    'experience_level', 'intermediate',
    'goals', JSON_ARRAY('improve_strategy', 'social_connection', 'relaxation'),
    'accessibility_needs', JSON_OBJECT(
      'hearing', FALSE,
      'vision', FALSE,
      'mobility', FALSE,
      'cognitive', FALSE
    ),
    'energy_preferences', 'moderate_energy',
    'preferred_group_size', '3-5',
    'session_preferences', JSON_OBJECT(
      'preferred_time', 'evening',
      'preferred_location', 'home',
      'typical_duration', '60-120'
    )
  ),
  TRUE,
  'friends'
FROM user 
WHERE email IN ('alice@example.com', 'bob@example.com', 'charlie@example.com');

-- ============================================================================
-- ACTIVITIES (Board Games)
-- ============================================================================

INSERT INTO activity (
  public_id, name, slug, activity_type, status, quality_status, version,
  short_description, full_description, objective,
  typical_duration_minutes, min_duration_minutes, max_duration_minutes,
  min_participants, max_participants, recommended_age_min, recommended_age_max,
  complexity_level, created_at, created_by
) VALUES

-- Catan
(UUID(), 'Catan', 'catan', 'board_game', 'published', 'expert_approved', 1,
 'Trade, build, and settle your way to victory on the island of Catan.',
 'Catan is a game for 2-4 players (up to 6 with expansions) where players use resources to build settlements and roads. The game involves strategy, negotiation, and luck.',
 'Accumulate 10 victory points before other players',
 60, 45, 90, 2, 4, 10, 99,
 'moderate', NOW(), (SELECT user_id FROM user WHERE email = 'admin@example.com')),

-- Pandemic
(UUID(), 'Pandemic', 'pandemic', 'board_game', 'published', 'expert_approved', 1,
 'Work together to save the world from disease outbreaks.',
 'Pandemic is a cooperative game where players take on roles as disease-fighting specialists trying to treat infections and find cures for diseases.',
 'Prevent pandemics and find cures for 4 diseases before running out of resources',
 45, 30, 60, 2, 4, 10, 99,
 'moderate', NOW(), (SELECT user_id FROM user WHERE email = 'admin@example.com')),

-- Ticket to Ride
(UUID(), 'Ticket to Ride', 'ticket-to-ride', 'board_game', 'published', 'expert_approved', 1,
 'Build train routes across the USA and complete ticket objectives.',
 'Ticket to Ride is a game of rails where players claim routes and build connections to link cities together.',
 'Complete journey tickets and build the longest continuous train route',
 45, 30, 60, 2, 5, 8, 99,
 'simple', NOW(), (SELECT user_id FROM user WHERE email = 'admin@example.com')),

-- 7 Wonders
(UUID(), '7 Wonders', '7-wonders', 'board_game', 'published', 'expert_approved', 1,
 'Build your civilization through the ages with simultaneous card selection.',
 '7 Wonders is a civilization building game using card drafting where players develop their civilizations simultaneously.',
 'Score the most points by developing your civilization through science, commerce, and wonder building',
 45, 30, 60, 2, 7, 10, 99,
 'moderate', NOW(), (SELECT user_id FROM user WHERE email = 'admin@example.com')),

-- Splendor
(UUID(), 'Splendor', 'splendor', 'board_game', 'published', 'expert_approved', 1,
 'Become a Renaissance merchant collecting gems and patronage.',
 'Splendor is a quick-playing card game about gem trading where players buy gems and use them to purchase noble cards.',
 'Gain 15 prestige points to win the game',
 30, 20, 45, 2, 4, 10, 99,
 'simple', NOW(), (SELECT user_id FROM user WHERE email = 'admin@example.com'));

-- ============================================================================
-- ACTIVITY CATEGORIES (Associations)
-- ============================================================================

INSERT INTO activity_category (activity_id, category_id, sort_order) 
SELECT a.activity_id, c.category_id, 1 FROM activity a, category c
WHERE (a.name = 'Catan' AND c.slug IN ('strategy-games', 'family-games'))
   OR (a.name = 'Pandemic' AND c.slug IN ('cooperative-games', 'family-games'))
   OR (a.name = 'Ticket to Ride' AND c.slug IN ('strategy-games', 'family-games'))
   OR (a.name = '7 Wonders' AND c.slug IN ('strategy-games'))
   OR (a.name = 'Splendor' AND c.slug IN ('strategy-games', 'family-games'));

-- ============================================================================
-- ACTIVITY TAGS
-- ============================================================================

INSERT INTO activity_tag (activity_id, tag_id, confidence)
SELECT a.activity_id, t.tag_id, 90 FROM activity a, tag t
WHERE (a.name = 'Catan' AND t.slug IN ('competitive', 'turn-based', 'quick-to-learn', '30-60min', 'family-friendly'))
   OR (a.name = 'Pandemic' AND t.slug IN ('cooperative', 'simultaneous-actions', 'advanced-strategy', '30-60min', 'family-friendly'))
   OR (a.name = 'Ticket to Ride' AND t.slug IN ('competitive', 'turn-based', 'quick-to-learn', '30-60min', 'family-friendly'))
   OR (a.name = '7 Wonders' AND t.slug IN ('competitive', 'simultaneous-actions', 'advanced-strategy', '30-60min'))
   OR (a.name = 'Splendor' AND t.slug IN ('competitive', 'turn-based', 'quick-to-learn', 'under-30min', 'family-friendly'));

-- ============================================================================
-- ACTIVITY DNA (Attributes)
-- ============================================================================

-- Catan Attributes
INSERT INTO activity_dna (activity_id, attribute_definition_id, value, confidence, source_type, created_by)
SELECT (SELECT activity_id FROM activity WHERE slug = 'catan'), ad.attribute_definition_id, 
  CASE ad.slug
    WHEN 'rules_complexity' THEN 'moderate'
    WHEN 'strategic_depth' THEN 'high'
    WHEN 'memory_requirements' THEN 'low'
    WHEN 'requires_cooperation' THEN 'false'
    WHEN 'conflict_level' THEN 'moderate'
    WHEN 'stress_level' THEN 'moderate'
    WHEN 'success_feeling' THEN 'high'
    WHEN 'player_elimination' THEN 'false'
  END, 95, 'redactional',
  (SELECT user_id FROM user WHERE email = 'admin@example.com')
FROM attribute_definition ad
WHERE ad.slug IN ('rules_complexity','strategic_depth','memory_requirements','requires_cooperation','conflict_level','stress_level','success_feeling','player_elimination');

-- Pandemic Attributes
INSERT INTO activity_dna (activity_id, attribute_definition_id, value, confidence, source_type, created_by)
SELECT (SELECT activity_id FROM activity WHERE slug = 'pandemic'), ad.attribute_definition_id,
  CASE ad.slug
    WHEN 'rules_complexity' THEN 'moderate'
    WHEN 'strategic_depth' THEN 'high'
    WHEN 'memory_requirements' THEN 'medium'
    WHEN 'requires_cooperation' THEN 'true'
    WHEN 'conflict_level' THEN 'none'
    WHEN 'stress_level' THEN 'high'
    WHEN 'success_feeling' THEN 'very_high'
    WHEN 'player_elimination' THEN 'false'
  END, 95, 'redactional',
  (SELECT user_id FROM user WHERE email = 'admin@example.com')
FROM attribute_definition ad
WHERE ad.slug IN ('rules_complexity','strategic_depth','memory_requirements','requires_cooperation','conflict_level','stress_level','success_feeling','player_elimination');

-- ============================================================================
-- PERSONS & ACTIVITY RELATIONSHIPS
-- ============================================================================

INSERT INTO activity_person (activity_id, person_id, role_type)
SELECT a.activity_id, p.person_id, 'author' FROM activity a, person p
WHERE (a.slug = 'catan' AND p.full_name = 'Klaus Teuber')
   OR (a.slug = 'pandemic' AND p.full_name = 'Matt Leacock')
   OR (a.slug = 'ticket-to-ride' AND p.full_name = 'Alan R. Moon')
UNION ALL
SELECT a.activity_id, p.person_id, 'author' FROM activity a, person p
WHERE a.slug = '7-wonders' AND p.full_name = 'Antoine Bauza'
UNION ALL
SELECT a.activity_id, p.person_id, 'author' FROM activity a, person p
WHERE a.slug = 'splendor' AND p.full_name = 'Marc André';

-- ============================================================================
-- SITUATIONS
-- ============================================================================

INSERT INTO situation (user_id, situation_data, created_at)
SELECT 
  u.user_id,
  JSON_OBJECT(
    'date', CURDATE(),
    'time', 'evening',
    'location_type', 'home',
    'available_time_minutes', 120,
    'available_energy', 'moderate',
    'group_size', 3,
    'participants', JSON_ARRAY(
      JSON_OBJECT('user_id', u.user_id, 'name', u.display_name),
      JSON_OBJECT('user_id', NULL, 'name', 'Friend 1'),
      JSON_OBJECT('user_id', NULL, 'name', 'Friend 2')
    ),
    'goal', 'social_connection_and_fun',
    'mood', 'relaxed',
    'stress_level', 1,
    'noise_tolerance', 'high',
    'previous_activities', JSON_ARRAY('catan', 'ticket-to-ride')
  ),
  NOW()
FROM user u
WHERE u.email IN ('alice@example.com', 'bob@example.com');

-- ============================================================================
-- SESSIONS (Game Play Experiences)
-- ============================================================================

INSERT INTO session (public_id, user_id, activity_id, situation_id, session_status, started_at, ended_at, duration_minutes, notes, created_by)
VALUES
(UUID(), (SELECT user_id FROM user WHERE email = 'alice@example.com'), 
         (SELECT activity_id FROM activity WHERE slug = 'catan'),
         (SELECT situation_id FROM situation WHERE user_id = (SELECT user_id FROM user WHERE email = 'alice@example.com') LIMIT 1),
         'completed', NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY + INTERVAL 65 MINUTE, 65,
         'Great game night with friends! Alice built settlements quickly and won.',
         (SELECT user_id FROM user WHERE email = 'alice@example.com')),

(UUID(), (SELECT user_id FROM user WHERE email = 'bob@example.com'),
         (SELECT activity_id FROM activity WHERE slug = 'pandemic'),
         (SELECT situation_id FROM situation WHERE user_id = (SELECT user_id FROM user WHERE email = 'bob@example.com') LIMIT 1),
         'completed', NOW() - INTERVAL 2 DAY, NOW() - INTERVAL 2 DAY + INTERVAL 50 MINUTE, 50,
         'Intense cooperative game. We managed to cure 3 diseases but lost on the 4th.',
         (SELECT user_id FROM user WHERE email = 'bob@example.com')),

(UUID(), (SELECT user_id FROM user WHERE email = 'charlie@example.com'),
         (SELECT activity_id FROM activity WHERE slug = 'splendor'),
         NULL,
         'completed', NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 DAY + INTERVAL 35 MINUTE, 35,
         'Quick game. Charlie enjoyed the gem trading mechanic.',
         (SELECT user_id FROM user WHERE email = 'charlie@example.com'));

-- ============================================================================
-- OBSERVATIONS (Neutral, Factual Observations)
-- ============================================================================

INSERT INTO observation (session_id, observation_type, content, observed_by, observed_at, confidence, visibility, created_at)
SELECT 
  s.session_id,
  'engagement',
  'Player made strategic decisions without hesitation.',
  s.created_by,
  s.started_at + INTERVAL 15 MINUTE,
  95,
  'shared',
  NOW()
FROM session s
LIMIT 3;

-- ============================================================================
-- IMPACTS (Effects and Changes)
-- ============================================================================

INSERT INTO impact (session_id, impact_dimension, direction, intensity, source, reported_by, created_by, created_at)
SELECT
  s.session_id,
  'mood',
  'positive',
  8,
  'self_reported',
  s.user_id,
  s.user_id,
  NOW()
FROM session s
WHERE s.session_status = 'completed';

INSERT INTO impact (session_id, impact_dimension, direction, intensity, source, reported_by, created_by, created_at)
SELECT
  s.session_id,
  'social_connection',
  'positive',
  9,
  'self_reported',
  s.user_id,
  s.user_id,
  NOW()
FROM session s
WHERE s.session_status = 'completed';

-- ============================================================================
-- REFLECTIONS
-- ============================================================================

INSERT INTO reflection (session_id, user_id, reflection_data, would_repeat, created_at)
SELECT
  s.session_id,
  s.user_id,
  JSON_OBJECT(
    'feeling', 'happy_and_engaged',
    'what_helped', 'Clear rules explanation before we started',
    'what_was_difficult', 'Deciding on optimal card strategy',
    'adjustments_for_next', 'Play with more aggressive trading strategy',
    'most_memorable', 'Winning the final round with a close call'
  ),
  TRUE,
  NOW()
FROM session s
WHERE s.session_status = 'completed';

-- ============================================================================
-- NEEDS
-- ============================================================================

INSERT INTO need (user_id, need_type, intensity, source_type, created_at)
SELECT 
  u.user_id,
  'social_connection',
  8,
  'self_reported',
  NOW()
FROM user u
WHERE u.email IN ('alice@example.com', 'bob@example.com');

INSERT INTO need (user_id, need_type, intensity, source_type, created_at)
SELECT 
  u.user_id,
  'relaxation',
  5,
  'self_reported',
  NOW()
FROM user u
WHERE u.email = 'charlie@example.com';

-- ============================================================================
-- RECOMMENDATIONS
-- ============================================================================

INSERT INTO recommendation (public_id, user_id, situation_id, activity_id, ranking, suitability_score, rationale, considered_factors, model_version, created_by, created_at)
SELECT
  UUID(),
  u.user_id,
  (SELECT situation_id FROM situation WHERE user_id = u.user_id LIMIT 1),
  (SELECT activity_id FROM activity WHERE slug = 'pandemic'),
  1,
  92,
  'Pandemic strongly matches your need for social connection and cooperative gameplay. Your group size and available time are perfect.',
  JSON_OBJECT(
    'needs', JSON_ARRAY('social_connection'),
    'preferences', JSON_ARRAY('cooperative'),
    'group_size', 3,
    'available_time', 120,
    'mood', 'relaxed'
  ),
  'v1.0',
  u.user_id,
  NOW()
FROM user u
WHERE u.email = 'alice@example.com';

INSERT INTO recommendation (public_id, user_id, situation_id, activity_id, ranking, suitability_score, rationale, considered_factors, model_version, created_by, created_at)
SELECT
  UUID(),
  u.user_id,
  NULL,
  (SELECT activity_id FROM activity WHERE slug = 'splendor'),
  2,
  78,
  'Splendor offers quick, engaging gameplay for when you have limited time. Still provides strategic satisfaction.',
  JSON_OBJECT(
    'available_time', 120,
    'preferred_complexity', 'moderate',
    'quick_to_learn', TRUE
  ),
  'v1.0',
  u.user_id,
  NOW()
FROM user u
WHERE u.email = 'bob@example.com';

-- ============================================================================
-- SOURCE ATTRIBUTION
-- ============================================================================

INSERT INTO source_attribution (source_id, attributed_to_entity_type, attributed_to_entity_id, specific_claim, quote_or_excerpt)
SELECT
  s.source_id,
  'activity',
  a.activity_id,
  'Catan is designed for 2-4 players (up to 6 with expansion)',
  'Players gather resources, build settlements, and expand their territory.'
FROM source s
JOIN activity a ON a.slug = 'catan'
WHERE s.source_type = 'official_rules'
LIMIT 1;

-- ============================================================================
-- SUMMARY: Record Counts
-- ============================================================================

-- Optional: Run these SELECT statements to verify data was inserted

-- SELECT 'Categories' as entity, COUNT(*) as count FROM category WHERE deleted_at IS NULL
-- UNION ALL
-- SELECT 'Attributes', COUNT(*) FROM attribute_definition WHERE is_deprecated = FALSE
-- UNION ALL
-- SELECT 'Activities', COUNT(*) FROM activity WHERE deleted_at IS NULL
-- UNION ALL
-- SELECT 'Users', COUNT(*) FROM user WHERE deleted_at IS NULL
-- UNION ALL
-- SELECT 'Sessions', COUNT(*) FROM session WHERE deleted_at IS NULL
-- UNION ALL
-- SELECT 'Observations', COUNT(*) FROM observation WHERE deleted_at IS NULL
-- UNION ALL
-- SELECT 'Impacts', COUNT(*) FROM impact WHERE deleted_at IS NULL
-- UNION ALL
-- SELECT 'Recommendations', COUNT(*) FROM recommendation WHERE deleted_at IS NULL
-- ORDER BY entity;

-- ============================================================================
-- END OF TEST DATA
-- ============================================================================
