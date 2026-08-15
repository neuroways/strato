SET NAMES utf8mb4;

INSERT INTO nq_children (id, display_name, grade_level)
VALUES (1, 'Mia', 2)
ON DUPLICATE KEY UPDATE
    display_name = VALUES(display_name),
    grade_level = VALUES(grade_level);

INSERT INTO nq_companions (code, name, description, active_flag)
VALUES (
    'LUNA',
    'Luna',
    'Eine ruhige, neugierige Füchsin, die Kinder durch die Geschichte begleitet.',
    1
)
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    description = VALUES(description),
    active_flag = VALUES(active_flag);

INSERT INTO nq_stories (code, title, description, status)
VALUES (
    'WALDKARTE',
    'Die geheimnisvolle Waldkarte',
    'Luna findet am Waldrand eine Karte, die nur Stück für Stück sichtbar wird.',
    'active'
)
ON DUPLICATE KEY UPDATE
    title = VALUES(title),
    description = VALUES(description),
    status = VALUES(status);

INSERT INTO nq_story_days (
    story_id,
    day_number,
    title,
    location_name,
    arrival_headline,
    arrival_text,
    completion_text
)
SELECT
    s.id,
    1,
    'Eine unerwartete Begegnung',
    'Am Waldrand',
    'Ein neuer Weg beginnt.',
    'Zwischen den Bäumen wartet Luna neben einem alten Baumstumpf. Auf dem Holz liegt eine Karte, von der bisher nur eine goldene Linie zu sehen ist.',
    'Die fünf Kartenstücke leuchten zusammen. Luna erkennt einen schmalen Weg, der tiefer in den Wald führt.'
FROM nq_stories s
WHERE s.code = 'WALDKARTE'
ON DUPLICATE KEY UPDATE
    title = VALUES(title),
    location_name = VALUES(location_name),
    arrival_headline = VALUES(arrival_headline),
    arrival_text = VALUES(arrival_text),
    completion_text = VALUES(completion_text);

INSERT IGNORE INTO nq_story_day_companions (story_day_id, companion_id)
SELECT d.id, c.id
FROM nq_story_days d
JOIN nq_stories s ON s.id = d.story_id
JOIN nq_companions c ON c.code = 'LUNA'
WHERE s.code = 'WALDKARTE'
  AND d.day_number = 1;

INSERT INTO nq_day_rounds (
    story_day_id,
    round_number,
    instruction_symbol,
    sentence_text,
    search_instruction
)
SELECT d.id, 1, 'L', 'Luna wartet leise am alten Baumstumpf.', 'Suche alle Buchstaben L und l.'
FROM nq_story_days d
JOIN nq_stories s ON s.id = d.story_id
WHERE s.code = 'WALDKARTE' AND d.day_number = 1
UNION ALL
SELECT d.id, 2, 'K', 'Auf dem Holz liegt eine kleine Karte.', 'Suche alle Buchstaben K und k.'
FROM nq_story_days d
JOIN nq_stories s ON s.id = d.story_id
WHERE s.code = 'WALDKARTE' AND d.day_number = 1
UNION ALL
SELECT d.id, 3, 'G', 'Eine goldene Linie führt in den Wald.', 'Suche alle Buchstaben G und g.'
FROM nq_story_days d
JOIN nq_stories s ON s.id = d.story_id
WHERE s.code = 'WALDKARTE' AND d.day_number = 1
UNION ALL
SELECT d.id, 4, 'S', 'Im Farn raschelt etwas ganz leise.', 'Suche alle Buchstaben S und s.'
FROM nq_story_days d
JOIN nq_stories s ON s.id = d.story_id
WHERE s.code = 'WALDKARTE' AND d.day_number = 1
UNION ALL
SELECT d.id, 5, 'W', 'Luna entdeckt einen schmalen Weg.', 'Suche alle Buchstaben W und w.'
FROM nq_story_days d
JOIN nq_stories s ON s.id = d.story_id
WHERE s.code = 'WALDKARTE' AND d.day_number = 1
ON DUPLICATE KEY UPDATE
    instruction_symbol = VALUES(instruction_symbol),
    sentence_text = VALUES(sentence_text),
    search_instruction = VALUES(search_instruction);

INSERT INTO nq_story_parts (
    story_day_id,
    round_number,
    part_number,
    text_content
)
SELECT d.id, 1, 1, 'Luna hebt vorsichtig eine Pfote. „Diese Karte war gestern noch nicht hier“, flüstert sie.'
FROM nq_story_days d
JOIN nq_stories s ON s.id = d.story_id
WHERE s.code = 'WALDKARTE' AND d.day_number = 1
UNION ALL
SELECT d.id, 2, 2, 'Als Luna die Karte berührt, erscheint darauf ein kleines goldenes Blatt.'
FROM nq_story_days d
JOIN nq_stories s ON s.id = d.story_id
WHERE s.code = 'WALDKARTE' AND d.day_number = 1
UNION ALL
SELECT d.id, 3, 3, 'Vom Blatt wächst eine leuchtende Linie über das Papier bis zum Rand der Karte.'
FROM nq_story_days d
JOIN nq_stories s ON s.id = d.story_id
WHERE s.code = 'WALDKARTE' AND d.day_number = 1
UNION ALL
SELECT d.id, 4, 4, 'Im Farn bewegt sich etwas. Ein winziger silberner Vogel schaut neugierig hervor.'
FROM nq_story_days d
JOIN nq_stories s ON s.id = d.story_id
WHERE s.code = 'WALDKARTE' AND d.day_number = 1
UNION ALL
SELECT d.id, 5, 5, 'Der Vogel fliegt zur goldenen Linie. Luna lächelt: „Ich glaube, er zeigt uns morgen den Weg.“'
FROM nq_story_days d
JOIN nq_stories s ON s.id = d.story_id
WHERE s.code = 'WALDKARTE' AND d.day_number = 1
ON DUPLICATE KEY UPDATE
    round_number = VALUES(round_number),
    text_content = VALUES(text_content);
