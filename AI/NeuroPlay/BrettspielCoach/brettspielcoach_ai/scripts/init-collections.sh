#!/bin/bash
# Initialize PocketBase collections for NeuroPlay catalog

# This script must be run with admin credentials
# Usage: bash scripts/init-collections.sh <pb_url> <admin_email> <admin_password>

PB_URL="${1:-http://localhost:8090}"
ADMIN_EMAIL="${2:-admin@example.com}"
ADMIN_PASSWORD="${3:-admin123456}"

echo "========================================="
echo "PocketBase Collection Initialization"
echo "========================================="
echo "URL: $PB_URL"
echo "Admin: $ADMIN_EMAIL"
echo ""

# Get admin token
echo "Getting admin token..."
TOKEN_RESPONSE=$(curl -s -X POST "$PB_URL/api/admins/auth-with-password" \
  -H "Content-Type: application/json" \
  -d "{\"identity\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}")

TOKEN=$(echo "$TOKEN_RESPONSE" | node -e "try { console.log(JSON.parse(require('fs').readFileSync(0, 'utf-8')).token) } catch(e) { console.log('') }")

if [ -z "$TOKEN" ]; then
  echo "✗ Failed to authenticate"
  echo "Response: $TOKEN_RESPONSE"
  exit 1
fi

echo "✓ Admin token acquired"

# Helper function to create a collection
create_collection() {
  local COLL_NAME=$1
  local SCHEMA_JSON=$2
  
  echo "Creating collection: $COLL_NAME..."
  
  curl -s -X POST "$PB_URL/api/collections" \
    -H "Content-Type: application/json" \
    -H "Authorization: $TOKEN" \
    -d "{\"name\":\"$COLL_NAME\",\"type\":\"base\",\"schema\":$SCHEMA_JSON,\"system\":false}" \
    > /tmp/pb_response.json
  
  if grep -q "\"name\":\"$COLL_NAME\"" /tmp/pb_response.json; then
    echo "✓ $COLL_NAME created"
    return 0
  else
    ERROR=$(cat /tmp/pb_response.json | node -e "try { console.log(JSON.parse(require('fs').readFileSync(0, 'utf-8')).message) } catch(e) { console.log('Unknown error') }")
    if [[ "$ERROR" == *"duplicate collection name"* ]]; then
      echo "✓ $COLL_NAME already exists"
      return 0
    fi
    echo "✗ Failed: $ERROR"
    return 1
  fi
}

# Create collections
echo ""
echo "Creating collections..."

create_collection "publishers" '[
  {"id":"text_p1","name":"publisher_code","type":"text","required":true,"unique":true},
  {"id":"text_p2","name":"name_de","type":"text","required":true},
  {"id":"number_p1","name":"priority","type":"number","required":false},
  {"id":"text_p3","name":"country","type":"text","required":false},
  {"id":"url_p1","name":"website","type":"url","required":false},
  {"id":"text_p4","name":"notes","type":"text","required":false},
  {"id":"text_p5","name":"original_record_id","type":"text","required":false,"unique":true}
]'

create_collection "games" '[
  {"id":"text_g1","name":"title_de","type":"text","required":true},
  {"id":"text_g2","name":"title_normalized","type":"text","required":false},
  {"id":"relation_g1","name":"publisher","type":"relation","required":true,"collectionId":"publishers"},
  {"id":"text_g3","name":"category_primary","type":"text","required":false},
  {"id":"text_g4","name":"category_secondary","type":"text","required":false},
  {"id":"select_g1","name":"language","type":"select","required":false,"values":["de","en","fr","mixed"]},
  {"id":"number_g1","name":"year_published","type":"number","required":false},
  {"id":"number_g2","name":"players_min","type":"number","required":false},
  {"id":"number_g3","name":"players_max","type":"number","required":false},
  {"id":"number_g4","name":"duration_minutes","type":"number","required":false},
  {"id":"number_g5","name":"age_min","type":"number","required":false},
  {"id":"text_g5","name":"original_record_id","type":"text","required":false,"unique":true}
]'

create_collection "game_editions" '[
  {"id":"relation_e1","name":"game","type":"relation","required":true,"collectionId":"games"},
  {"id":"text_e1","name":"edition_name","type":"text","required":false},
  {"id":"number_e1","name":"edition_year","type":"number","required":false},
  {"id":"text_e2","name":"ean_13","type":"text","required":false},
  {"id":"text_e3","name":"article_number","type":"text","required":false},
  {"id":"select_e1","name":"identification_status","type":"select","required":false,"values":["complete","incomplete","needs_review"]},
  {"id":"text_e4","name":"notes","type":"text","required":false},
  {"id":"text_e5","name":"original_record_id","type":"text","required":false,"unique":true}
]'

create_collection "rule_sources" '[
  {"id":"relation_r1","name":"game","type":"relation","required":true,"collectionId":"games"},
  {"id":"relation_r2","name":"edition","type":"relation","required":false,"collectionId":"game_editions"},
  {"id":"select_r1","name":"source_type","type":"select","required":true,"values":["official_rule_pdf","official_product_page","official_rule_archive","unknown"]},
  {"id":"select_r2","name":"language","type":"select","required":true,"values":["de","en","fr","mixed"]},
  {"id":"url_r1","name":"url","type":"url","required":true},
  {"id":"text_r1","name":"link_label","type":"text","required":false},
  {"id":"select_r3","name":"verification_status","type":"select","required":false,"values":["verified","unverified","broken"]},
  {"id":"date_r1","name":"verified_at","type":"date","required":false},
  {"id":"text_r2","name":"original_record_id","type":"text","required":false,"unique":true}
]'

create_collection "import_batches" '[
  {"id":"text_ib1","name":"import_name","type":"text","required":true},
  {"id":"text_ib2","name":"source_file_name","type":"text","required":true},
  {"id":"text_ib3","name":"source_version","type":"text","required":false},
  {"id":"date_ib1","name":"started_at","type":"date","required":true},
  {"id":"date_ib2","name":"completed_at","type":"date","required":false},
  {"id":"select_ib1","name":"status","type":"select","required":true,"values":["running","completed","failed"]},
  {"id":"number_ib1","name":"publisher_rows_found","type":"number","required":false},
  {"id":"number_ib2","name":"publisher_rows_created","type":"number","required":false},
  {"id":"number_ib3","name":"game_source_rows_found","type":"number","required":false},
  {"id":"number_ib4","name":"games_created","type":"number","required":false},
  {"id":"number_ib5","name":"editions_created","type":"number","required":false},
  {"id":"number_ib6","name":"rule_sources_created","type":"number","required":false},
  {"id":"number_ib7","name":"records_skipped","type":"number","required":false},
  {"id":"number_ib8","name":"records_with_warnings","type":"number","required":false},
  {"id":"number_ib9","name":"records_with_errors","type":"number","required":false},
  {"id":"json_ib1","name":"error_log","type":"json","required":false},
  {"id":"json_ib2","name":"warning_log","type":"json","required":false}
]'

create_collection "source_verification_history" '[
  {"id":"relation_sv1","name":"rule_source","type":"relation","required":true,"collectionId":"rule_sources"},
  {"id":"date_sv1","name":"verified_at","type":"date","required":true},
  {"id":"number_sv1","name":"http_status","type":"number","required":false},
  {"id":"select_sv1","name":"verification_status","type":"select","required":true,"values":["verified","broken","redirected"]},
  {"id":"text_sv1","name":"notes","type":"text","required":false}
]'

echo ""
echo "========================================="
echo "✓ Initialization complete"
echo "========================================="
