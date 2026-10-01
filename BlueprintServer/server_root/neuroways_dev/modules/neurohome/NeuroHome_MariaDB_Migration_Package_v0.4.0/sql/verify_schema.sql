-- Read-only verification for NeuroHome v0.4.0

SELECT 'MIGRATIONS' AS check_name, COUNT(*) AS actual_count, 5 AS minimum_count,
       IF(COUNT(*) >= 5, 'PASS', 'FAIL') AS result
FROM NHO_SCHEMA_MIGRATIONS
UNION ALL
SELECT 'PUBLISHED_METHODS', COUNT(*), 7, IF(COUNT(*) >= 7, 'PASS', 'FAIL')
FROM NHO_METHODS WHERE status = 'published'
UNION ALL
SELECT 'METHOD_STEPS', COUNT(*), 21, IF(COUNT(*) >= 21, 'PASS', 'FAIL')
FROM NHO_METHOD_STEPS
UNION ALL
SELECT 'RECOMMENDATION_RULES', COUNT(*), 7, IF(COUNT(*) >= 7, 'PASS', 'FAIL')
FROM NHO_RECOMMENDATION_RULES WHERE status = 'published'
UNION ALL
SELECT 'STOP_SIGNALS', COUNT(*), 7, IF(COUNT(*) >= 7, 'PASS', 'FAIL')
FROM NHO_STOP_SIGNALS WHERE status = 'published';

SELECT table_name, engine, table_collation
FROM information_schema.tables
WHERE table_schema = DATABASE()
  AND LEFT(table_name, 4) = 'NHO_'
ORDER BY table_name;

SELECT table_name, index_name, index_type
FROM information_schema.statistics
WHERE table_schema = DATABASE()
  AND table_name = 'NHO_SEARCH_DOCUMENTS'
ORDER BY index_name;
