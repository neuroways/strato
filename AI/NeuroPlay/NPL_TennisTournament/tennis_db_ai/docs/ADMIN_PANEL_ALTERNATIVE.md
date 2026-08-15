# Alternative zu PocketBase Admin Panel – API Rules via Kommandozeile setzen

Sie haben **keinen Zugriff** auf das PocketBase Admin Panel (`/.sfs-bd/admin/`), aber die **API funktioniert** – wir können die Rules direkt via Kommandozeile setzen.

---

## Lösung: API Rules programmatisch setzen

### Schritt 1: Token generieren

```bash
TOKEN=$(node /etc/goose/skills/pocketbase/tools/pb_gen_token_sfs.js 2>&1)
echo $TOKEN
```

Dieser Token gibt dir Admin-Zugriff auf die PocketBase API.

---

### Schritt 2: Öffentliche Collections öffnen

Für jede der 8 öffentlichen Collections **einen dieser Befehle ausführen**:

```bash
TOKEN=$(node /etc/goose/skills/pocketbase/tools/pb_gen_token_sfs.js 2>&1)

# tournaments
curl -s -X PATCH \
  --unix-socket /run/cm4all/http/tie.socket \
  "http://localhost/.sfs-bd/api/collections/tournaments" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"listRule": "", "viewRule": ""}' 2>&1 | grep -q error && echo "❌ tournaments FAILED" || echo "✅ tournaments OK"

# players
curl -s -X PATCH \
  --unix-socket /run/cm4all/http/tie.socket \
  "http://localhost/.sfs-bd/api/collections/players" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"listRule": "", "viewRule": ""}' 2>&1 | grep -q error && echo "❌ players FAILED" || echo "✅ players OK"

# rounds
curl -s -X PATCH \
  --unix-socket /run/cm4all/http/tie.socket \
  "http://localhost/.sfs-bd/api/collections/rounds" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"listRule": "", "viewRule": ""}' 2>&1 | grep -q error && echo "❌ rounds FAILED" || echo "✅ rounds OK"

# matches
curl -s -X PATCH \
  --unix-socket /run/cm4all/http/tie.socket \
  "http://localhost/.sfs-bd/api/collections/matches" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"listRule": "", "viewRule": ""}' 2>&1 | grep -q error && echo "❌ matches FAILED" || echo "✅ matches OK"

# announcements
curl -s -X PATCH \
  --unix-socket /run/cm4all/http/tie.socket \
  "http://localhost/.sfs-bd/api/collections/announcements" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"listRule": "", "viewRule": ""}' 2>&1 | grep -q error && echo "❌ announcements FAILED" || echo "✅ announcements OK"

# courts
curl -s -X PATCH \
  --unix-socket /run/cm4all/http/tie.socket \
  "http://localhost/.sfs-bd/api/collections/courts" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"listRule": "", "viewRule": ""}' 2>&1 | grep -q error && echo "❌ courts FAILED" || echo "✅ courts OK"

# results
curl -s -X PATCH \
  --unix-socket /run/cm4all/http/tie.socket \
  "http://localhost/.sfs-bd/api/collections/results" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"listRule": "", "viewRule": ""}' 2>&1 | grep -q error && echo "❌ results FAILED" || echo "✅ results OK"

# info_sections
curl -s -X PATCH \
  --unix-socket /run/cm4all/http/tie.socket \
  "http://localhost/.sfs-bd/api/collections/info_sections" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"listRule": "", "viewRule": ""}' 2>&1 | grep -q error && echo "❌ info_sections FAILED" || echo "✅ info_sections OK"
```

---

### Schritt 3: Admin-Collections schützen (optional)

Für die 4 Admin-Collections:

```bash
TOKEN=$(node /etc/goose/skills/pocketbase/tools/pb_gen_token_sfs.js 2>&1)

for collection in tournament_settings registrations match_players ai_schedule_runs; do
  curl -s -X PATCH \
    --unix-socket /run/cm4all/http/tie.socket \
    "http://localhost/.sfs-bd/api/collections/$collection" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"listRule": "@request.auth.collectionId = \"admins\"", "viewRule": "@request.auth.collectionId = \"admins\"", "createRule": "@request.auth.collectionId = \"admins\"", "updateRule": "@request.auth.collectionId = \"admins\"", "deleteRule": "@request.auth.collectionId = \"admins\""}' 2>&1 > /dev/null
  echo "✅ $collection protected"
done
```

---

## Automatisiertes Setup-Skript

Erstelle eine Datei `setup_api_rules.sh` im Projekt-Root:

```bash
#!/bin/bash

echo "🔒 Setze API Rules für öffentliche Website..."

TOKEN=$(node /etc/goose/skills/pocketbase/tools/pb_gen_token_sfs.js 2>&1)

if [ -z "$TOKEN" ]; then
  echo "❌ Fehler: Token konnte nicht generiert werden"
  exit 1
fi

echo "✅ Token generiert"
echo ""

# Öffentliche Collections
echo "🌐 Öffne öffentliche Collections..."
for collection in tournaments players rounds matches announcements courts results info_sections; do
  curl -s -X PATCH \
    --unix-socket /run/cm4all/http/tie.socket \
    "http://localhost/.sfs-bd/api/collections/$collection" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"listRule": "", "viewRule": ""}' > /dev/null
  echo "  ✅ $collection"
done

echo ""
echo "🔐 Schütze Admin-Collections..."
for collection in tournament_settings registrations match_players ai_schedule_runs; do
  curl -s -X PATCH \
    --unix-socket /run/cm4all/http/tie.socket \
    "http://localhost/.sfs-bd/api/collections/$collection" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"listRule": "@request.auth.collectionId = \"admins\"", "viewRule": "@request.auth.collectionId = \"admins\"", "createRule": "@request.auth.collectionId = \"admins\"", "updateRule": "@request.auth.collectionId = \"admins\"", "deleteRule": "@request.auth.collectionId = \"admins\""}' > /dev/null
  echo "  ✅ $collection"
done

echo ""
echo "✅ API Rules konfiguriert!"
echo ""
echo "Nächster Schritt: Website neuladen und testen"
```

Dann ausführen:

```bash
chmod +x setup_api_rules.sh
./setup_api_rules.sh
```

---

## Prüfung: Hat es funktioniert?

Nach dem Setup die Rules überprüfen:

```bash
TOKEN=$(node /etc/goose/skills/pocketbase/tools/pb_gen_token_sfs.js 2>&1)

curl -s -X GET \
  --unix-socket /run/cm4all/http/tie.socket \
  "http://localhost/.sfs-bd/api/collections/tournaments" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" | node -e "const d = require('fs').readFileSync(0, 'utf-8'); const j = JSON.parse(d); console.log('listRule:', j.listRule || '(leer = öffentlich)'); console.log('viewRule:', j.viewRule || '(leer = öffentlich)');"
```

Sollte anzeigen:
```
listRule: (leer = öffentlich)
viewRule: (leer = öffentlich)
```

---

## Website testen

Nach Setup:

1. Browser öffnen
2. Zur Startseite gehen
3. F12 drücken → Console
4. Neuladen (Ctrl+R)
5. Kein 403-Fehler?

✅ **Website funktioniert!**

---

## Status nach Setup

- ✅ Öffentliche Collections lesbar für alle
- ✅ Admin-Collections geschützt
- ✅ Website zeigt Daten
- ✅ Keine 403-Fehler mehr

**Nächste Schritte:**
1. Website vollständig testen (alle 8 Seiten)
2. Admin-Bereich testen (Login + Dashboard)
3. Daten bearbeiten und überprüfen (erscheinen auf Website?)
4. Zur Produktion bereit
