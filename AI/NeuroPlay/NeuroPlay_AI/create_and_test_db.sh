#!/bin/bash

# NeuroPlay SQLite Database Setup

DB_FILE="neuroplay.db"

echo "Creating NeuroPlay database..."
rm -f "$DB_FILE"

echo "Loading schema..."
sqlite3 "$DB_FILE" < neuroplay_v2_schema_sqlite.sql

echo "Loading test data..."
sqlite3 "$DB_FILE" < neuroplay_v2_testdata_sqlite.sql

echo ""
echo "✓ Database created successfully!"
echo ""

echo "Database Statistics:"
sqlite3 "$DB_FILE" "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;" | wc -l | xargs echo "Total tables:"
sqlite3 "$DB_FILE" "SELECT COUNT(*) FROM activities WHERE deleted_at IS NULL;" | xargs echo "Activities:"
sqlite3 "$DB_FILE" "SELECT COUNT(*) FROM users;" | xargs echo "Users:"
sqlite3 "$DB_FILE" "SELECT COUNT(*) FROM activity_sessions;" | xargs echo "Sessions:"
sqlite3 "$DB_FILE" "SELECT COUNT(*) FROM observations;" | xargs echo "Observations:"
sqlite3 "$DB_FILE" "SELECT COUNT(*) FROM impacts;" | xargs echo "Impacts:"
sqlite3 "$DB_FILE" "SELECT COUNT(*) FROM recommendations;" | xargs echo "Recommendations:"
sqlite3 "$DB_FILE" "SELECT COUNT(*) FROM learning_progress;" | xargs echo "Learning Progress:"

echo ""
echo "Sample Queries:"
echo ""
echo "1. All Sessions with Activity:"
sqlite3 "$DB_FILE" "SELECT s.session_id, u.display_name, a.name, s.duration_minutes FROM activity_sessions s JOIN users u ON s.user_id = u.user_id JOIN activities a ON s.activity_id = a.activity_id LIMIT 5;" | column -t -s'|'

echo ""
echo "2. Observations from Sessions:"
sqlite3 "$DB_FILE" "SELECT o.observation_id, o.observation_type, SUBSTR(o.content, 1, 40) as content, u.display_name FROM observations o JOIN users u ON o.observed_by = u.user_id LIMIT 5;" | column -t -s'|'

echo ""
echo "3. Impacts by Dimension:"
sqlite3 "$DB_FILE" "SELECT impact_dimension, direction, COUNT(*) as count FROM impacts GROUP BY impact_dimension, direction;" | column -t -s'|'

echo ""
echo "4. Recommendations with Suitability Scores:"
sqlite3 "$DB_FILE" "SELECT r.recommendation_id, u.display_name, a.name, r.suitability_score FROM recommendations r JOIN users u ON r.user_id = u.user_id JOIN activities a ON r.activity_id = a.activity_id;" | column -t -s'|'

echo ""
echo "5. Learning Progress:"
sqlite3 "$DB_FILE" "SELECT u.display_name, COUNT(*) as units, AVG(comprehension_level) as avg_comprehension FROM learning_progress lp JOIN users u ON lp.user_id = u.user_id GROUP BY lp.user_id;" | column -t -s'|'

echo ""
echo "Database file: $DB_FILE"
echo "Ready to use!"
