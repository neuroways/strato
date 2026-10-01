# API-Referenz für Datenbankzugriffe

**Version:** 0.1.0  
**Umgebung:** Development (/.sfs-bd/)  
**Datum:** 2026-07-24

---

## Überblick

Diese Referenz zeigt alle HTTP-Methoden, um Datensätze in der DEV-Datenbank zu erstellen, auszulesen, zu ändern und zu löschen.

Alle Beispiele verwenden:
- **Collection:** `tst_entries` (Sie können `tst_categories` analog verwenden)
- **Base-URL:** `http://localhost/.sfs-bd/api`

---

## 1. Datensätze AUSLESEN (GET)

### 1.1 Alle Datensätze einer Collection auflisten

**HTTP-Methode:** `GET`

**Endpunkt:**
```
GET /collections/tst_entries/records
```

**Vollständiger Aufruf:**
```bash
curl -s --unix-socket /run/cm4all/http/tie.socket \
  -H "Authorization: Bearer $TOKEN" \
  http://localhost/.sfs-bd/api/collections/tst_entries/records
```

**Beispiel-Antwort:**
```json
{
  "items": [
    {
      "id": "xy1234abcd5678ef",
      "title": "Mein erster Testeintrag",
      "notes": "Notizen dazu",
      "category": "gi0ymx1yznu4j6n",
      "created": "2026-07-24T23:42:00.000Z",
      "updated": "2026-07-24T23:42:00.000Z"
    },
    {
      "id": "ab9876cdef1234xy",
      "title": "Zweiter Eintrag",
      "notes": null,
      "category": "gi0ymx1yznu4j6n",
      "created": "2026-07-24T23:43:00.000Z",
      "updated": "2026-07-24T23:43:00.000Z"
    }
  ],
  "page": 1,
  "perPage": 30,
  "totalItems": 2,
  "totalPages": 1
}
```

---

### 1.2 Einen bestimmten Datensatz abrufen

**HTTP-Methode:** `GET`

**Endpunkt:**
```
GET /collections/tst_entries/records/{RECORD_ID}
```

**Beispiel:**
```bash
curl -s --unix-socket /run/cm4all/http/tie.socket \
  -H "Authorization: Bearer $TOKEN" \
  http://localhost/.sfs-bd/api/collections/tst_entries/records/xy1234abcd5678ef
```

**Beispiel-Antwort:**
```json
{
  "id": "xy1234abcd5678ef",
  "title": "Mein erster Testeintrag",
  "notes": "Notizen dazu",
  "category": "gi0ymx1yznu4j6n",
  "created": "2026-07-24T23:42:00.000Z",
  "updated": "2026-07-24T23:42:00.000Z"
}
```

---

### 1.3 Mit erweiterten Relationen (expand)

Wenn Sie ein Relationsfeld mit vollständigen Daten abrufen möchten:

**HTTP-Methode:** `GET`

**Endpunkt:**
```
GET /collections/tst_entries/records/{RECORD_ID}?expand=category
```

**Beispiel:**
```bash
curl -s --unix-socket /run/cm4all/http/tie.socket \
  -H "Authorization: Bearer $TOKEN" \
  "http://localhost/.sfs-bd/api/collections/tst_entries/records/xy1234abcd5678ef?expand=category"
```

**Beispiel-Antwort:**
```json
{
  "id": "xy1234abcd5678ef",
  "title": "Mein erster Testeintrag",
  "notes": "Notizen dazu",
  "category": "gi0ymx1yznu4j6n",
  "created": "2026-07-24T23:42:00.000Z",
  "updated": "2026-07-24T23:42:00.000Z",
  "expand": {
    "category": {
      "id": "gi0ymx1yznu4j6n",
      "name": "Grundlagen",
      "description": "Grundlagen-Kategorie für den nachvollziehbaren PocketBase-Lerntest",
      "created": "2026-07-24T23:35:27.082Z",
      "updated": "2026-07-24T23:37:21.910Z"
    }
  }
}
```

---

### 1.4 Filtern und Sortieren

**HTTP-Methode:** `GET`

**Endpunkt mit Optionen:**
```
GET /collections/tst_entries/records?sort=-created&filter=title~"Grund"&perPage=10&page=1
```

**Beispiel:**
```bash
curl -s --unix-socket /run/cm4all/http/tie.socket \
  -H "Authorization: Bearer $TOKEN" \
  "http://localhost/.sfs-bd/api/collections/tst_entries/records?sort=-created&filter=title~%22Grund%22&perPage=10&page=1"
```

**Parameter erklären:**

| Parameter | Erklärung | Beispiel |
|---|---|---|
| `sort` | Sortierung (mit `-` absteigend) | `sort=created` oder `sort=-created` |
| `filter` | Bedingung (URL-kodiert) | `filter=title~%22Grund%22` (title enthält "Grund") |
| `perPage` | Datensätze pro Seite | `perPage=10` |
| `page` | Seitennummer | `page=1` |

**Häufige Filter-Operatoren:**

```
=        Exakt gleich:           filter=title="Mein Eintrag"
!=       Nicht gleich:            filter=title!="Mein Eintrag"
>        Größer als:              filter=created>"2026-07-24"
<        Kleiner als:             filter=created<"2026-07-24"
>=       Größer oder gleich:      filter=created>="2026-07-24"
<=       Kleiner oder gleich:     filter=created<="2026-07-24"
~        Enthält (Text):          filter=title~"Grund"
!~       Enthält nicht:           filter=title!~"Grund"
```

---

## 2. Datensätze ERSTELLEN (POST)

### 2.1 Einfacher neuer Datensatz

**HTTP-Methode:** `POST`

**Endpunkt:**
```
POST /collections/tst_entries/records
```

**Anfrage-Body:**
```json
{
  "title": "Mein erster Testeintrag",
  "notes": "optionale Notizen",
  "category": "gi0ymx1yznu4j6n"
}
```

**Vollständiger curl-Aufruf:**
```bash
curl -s --unix-socket /run/cm4all/http/tie.socket \
  -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mein erster Testeintrag",
    "notes": "optionale Notizen",
    "category": "gi0ymx1yznu4j6n"
  }' \
  http://localhost/.sfs-bd/api/collections/tst_entries/records
```

**Beispiel-Antwort (HTTP 200):**
```json
{
  "id": "xy1234abcd5678ef",
  "title": "Mein erster Testeintrag",
  "notes": "optionale Notizen",
  "category": "gi0ymx1yznu4j6n",
  "created": "2026-07-24T23:42:00.000Z",
  "updated": "2026-07-24T23:42:00.000Z"
}
```

**Wichtig:**
- `id`, `created`, `updated` werden **automatisch vom Server** gesetzt — Sie übergeben sie **nicht**
- Pflichtfelder (`title`, `category`) müssen angegeben werden
- Optionale Felder (`notes`) können weggelassen werden (dann wird der Wert `null`)

---

### 2.2 Mit Relation (Kategorien-Beispiel)

Neuen Datensatz in `tst_categories` erstellen:

**HTTP-Methode:** `POST`

**Endpunkt:**
```
POST /collections/tst_categories/records
```

**Anfrage-Body:**
```json
{
  "name": "Fortgeschrittene",
  "description": "Fortgeschrittene Techniken"
}
```

**Vollständiger curl-Aufruf:**
```bash
curl -s --unix-socket /run/cm4all/http/tie.socket \
  -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Fortgeschrittene",
    "description": "Fortgeschrittene Techniken"
  }' \
  http://localhost/.sfs-bd/api/collections/tst_categories/records
```

**Beispiel-Antwort:**
```json
{
  "id": "new_cat_xyz789",
  "name": "Fortgeschrittene",
  "description": "Fortgeschrittene Techniken",
  "created": "2026-07-24T23:45:00.000Z",
  "updated": "2026-07-24T23:45:00.000Z"
}
```

---

## 3. Datensätze ÄNDERN (PATCH)

### 3.1 Einen Datensatz teilweise aktualisieren

**HTTP-Methode:** `PATCH`

**Endpunkt:**
```
PATCH /collections/tst_entries/records/{RECORD_ID}
```

**Anfrage-Body (nur geänderte Felder übergeben):**
```json
{
  "notes": "Neue Notizen"
}
```

**Vollständiger curl-Aufruf:**
```bash
curl -s --unix-socket /run/cm4all/http/tie.socket \
  -X PATCH \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "notes": "Neue Notizen"
  }' \
  http://localhost/.sfs-bd/api/collections/tst_entries/records/xy1234abcd5678ef
```

**Beispiel-Antwort:**
```json
{
  "id": "xy1234abcd5678ef",
  "title": "Mein erster Testeintrag",
  "notes": "Neue Notizen",
  "category": "gi0ymx1yznu4j6n",
  "created": "2026-07-24T23:42:00.000Z",
  "updated": "2026-07-24T23:42:30.000Z"
}
```

**Wichtig:**
- `id` bleibt **unverändert**
- `created` wird **nicht** geändert
- `updated` wird **automatisch** auf die aktuelle Zeit gesetzt
- Sie übergeben **nur die Felder, die sich ändern**

---

### 3.2 Mehrere Felder gleichzeitig ändern

**HTTP-Methode:** `PATCH`

**Anfrage-Body:**
```json
{
  "title": "Verbesserter Titel",
  "notes": "Neue Notizen",
  "category": "new_cat_xyz789"
}
```

**Vollständiger curl-Aufruf:**
```bash
curl -s --unix-socket /run/cm4all/http/tie.socket \
  -X PATCH \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Verbesserter Titel",
    "notes": "Neue Notizen",
    "category": "new_cat_xyz789"
  }' \
  http://localhost/.sfs-bd/api/collections/tst_entries/records/xy1234abcd5678ef
```

---

### 3.3 Kategorie eines Eintrags wechseln

Wenn Sie einen Eintrag einer anderen Kategorie zuordnen wollen:

**HTTP-Methode:** `PATCH`

**Anfrage-Body:**
```json
{
  "category": "new_cat_xyz789"
}
```

**Antwort:** Der Eintrag ist jetzt mit der neuen Kategorie verknüpft.

---

## 4. Datensätze LÖSCHEN (DELETE)

### 4.1 Einen einzelnen Datensatz löschen

**HTTP-Methode:** `DELETE`

**Endpunkt:**
```
DELETE /collections/tst_entries/records/{RECORD_ID}
```

**Vollständiger curl-Aufruf:**
```bash
curl -s --unix-socket /run/cm4all/http/tie.socket \
  -X DELETE \
  -H "Authorization: Bearer $TOKEN" \
  http://localhost/.sfs-bd/api/collections/tst_entries/records/xy1234abcd5678ef
```

**Beispiel-Antwort (HTTP 204 No Content):**
```
[Leere Antwort - nur HTTP-Status 204]
```

Oder bei manchen APIs (HTTP 200):
```json
{}
```

**Wichtig:**
- Der Datensatz wird **sofort gelöscht**
- Wenn `cascadeDelete: false` ist (wie bei unseren Relationen), bleiben abhängige Datensätze erhalten
- Es gibt **kein Undo**

---

### 4.2 Mehrere Datensätze löschen

Es gibt keine Batch-Delete-API. Löschen Sie Datensätze einzeln in einer Schleife:

```bash
# Beispiel: Alle Einträge mit "Grund" im Titel löschen
RECORDS=$(curl -s --unix-socket /run/cm4all/http/tie.socket \
  -H "Authorization: Bearer $TOKEN" \
  "http://localhost/.sfs-bd/api/collections/tst_entries/records?filter=title~%22Grund%22" | \
  node -e "let b='';process.stdin.on('data',c=>b+=c).on('end',()=>JSON.parse(b).items.forEach(r=>console.log(r.id)))")

echo "$RECORDS" | while read ID; do
  curl -s --unix-socket /run/cm4all/http/tie.socket \
    -X DELETE \
    -H "Authorization: Bearer $TOKEN" \
    "http://localhost/.sfs-bd/api/collections/tst_entries/records/$ID"
  echo "Gelöscht: $ID"
done
```

---

## 5. Zusammenfassung — Schnellübersicht

| Operation | HTTP-Methode | Endpunkt | Body erforderlich | Antwort |
|---|---|---|---|---|
| **Alle abrufen** | GET | `/records` | nein | Liste mit allen |
| **Einen abrufen** | GET | `/records/{ID}` | nein | Ein Datensatz |
| **Erstellen** | POST | `/records` | ja (neue Daten) | neuer Datensatz + ID |
| **Ändern** | PATCH | `/records/{ID}` | ja (Änderungen) | geänderter Datensatz |
| **Löschen** | DELETE | `/records/{ID}` | nein | leer oder `{}` |

---

## 6. Token-Generierung

Alle Anfragen brauchen einen gültigen Token im Header:

```bash
TOKEN=$(node /etc/goose/skills/pocketbase/tools/pb_gen_token_sfs.js 2>&1 | tail -1)
SOCKET="--unix-socket /run/cm4all/http/tie.socket"
BASE="http://localhost/.sfs-bd/api"

# Token in jede Anfrage einfügen:
-H "Authorization: Bearer $TOKEN"
```

Token bleibt für **1 Stunde** gültig. Danach müssen Sie einen neuen generieren.

---

## 7. Fehlerbehandlung

### Häufige Fehler

| HTTP-Status | Bedeutung | Beispiel-Antwort |
|---|---|---|
| `200` | Erfolg (GET, PATCH, POST) | `{"id": "...", ...}` |
| `204` | Erfolg, kein Inhalt (DELETE) | (leere Antwort) |
| `400` | Ungültige Anfrage | `{"message": "Invalid data", ...}` |
| `401` | Token fehlt/ungültig | `{"message": "Unauthorized", ...}` |
| `404` | Datensatz nicht gefunden | `{"message": "Record not found", ...}` |
| `422` | Validierungsfehler (Pflichtfeld fehlt) | `{"data": {"title": [{"code": "required", ...}]}}` |

### Beispiel: Pflichtfeld fehlt

```json
{
  "code": 422,
  "message": "Failed to create record due to validation errors",
  "data": {
    "category": [
      {
        "code": "required",
        "message": "Cannot be blank."
      }
    ]
  }
}
```

---

## 8. Praktische Beispiele

### Beispiel 1: Eintrag erstellen und sofort mit Kategorie abrufen

```bash
TOKEN=$(node /etc/goose/skills/pocketbase/tools/pb_gen_token_sfs.js 2>&1 | tail -1)

# 1. Neuen Eintrag erstellen
RECORD=$(curl -s --unix-socket /run/cm4all/http/tie.socket \
  -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","category":"gi0ymx1yznu4j6n"}' \
  http://localhost/.sfs-bd/api/collections/tst_entries/records)

# 2. ID extrahieren
RECORD_ID=$(echo "$RECORD" | node -e "let b='';process.stdin.on('data',c=>b+=c).on('end',()=>console.log(JSON.parse(b).id))")

# 3. Mit erweiterten Daten abrufen
curl -s --unix-socket /run/cm4all/http/tie.socket \
  -H "Authorization: Bearer $TOKEN" \
  "http://localhost/.sfs-bd/api/collections/tst_entries/records/$RECORD_ID?expand=category"
```

---

### Beispiel 2: Alle Einträge der letzten 24 Stunden auflisten

```bash
TOKEN=$(node /etc/goose/skills/pocketbase/tools/pb_gen_token_sfs.js 2>&1 | tail -1)

YESTERDAY=$(date -u -d '24 hours ago' '+%Y-%m-%d %H:%M:%S')

curl -s --unix-socket /run/cm4all/http/tie.socket \
  -H "Authorization: Bearer $TOKEN" \
  "http://localhost/.sfs-bd/api/collections/tst_entries/records?filter=created>%22$YESTERDAY%22&sort=-created"
```

---

### Beispiel 3: Eintrag aktualisieren und neue Notizen hinzufügen

```bash
TOKEN=$(node /etc/goose/skills/pocketbase/tools/pb_gen_token_sfs.js 2>&1 | tail -1)
RECORD_ID="xy1234abcd5678ef"

curl -s --unix-socket /run/cm4all/http/tie.socket \
  -X PATCH \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"notes":"Wichtiger Hinweis: Überprüft werden muss die Struktur"}' \
  http://localhost/.sfs-bd/api/collections/tst_entries/records/$RECORD_ID
```

---

## 9. Nachrichtenformat (Content-Type)

Alle Anfragen mit Body verwenden:

```
Content-Type: application/json
```

Das Body muss gültiges JSON sein:

```json
{
  "field1": "wert",
  "field2": 123,
  "field3": true,
  "field4": null
}
```

---

## 10. Best Practices

1. **Token am Anfang generieren**, nicht für jeden Aufruf neu
2. **Immer Filter und Sortierung nutzen**, um Daten effizient zu laden
3. **`expand` verwenden** für Relationen, um alle Daten auf einmal zu holen
4. **PATCH statt PUT** — Sie müssen nur geänderte Felder übergeben
5. **Fehler prüfen** — HTTP-Status und `message` auslesen
6. **Validierung lokal** — Vor POST/PATCH sollten Pflichtfelder vorhanden sein

---

## 11. Abkürzungstabelle für curl-Aufrufe

```bash
TOKEN=$(node /etc/goose/skills/pocketbase/tools/pb_gen_token_sfs.js 2>&1 | tail -1)
SOCKET="--unix-socket /run/cm4all/http/tie.socket"
BASE="http://localhost/.sfs-bd/api"
COLLECTION="tst_entries"

# GET (Alle)
curl -s $SOCKET -H "Authorization: Bearer $TOKEN" $BASE/collections/$COLLECTION/records

# GET (Einer)
curl -s $SOCKET -H "Authorization: Bearer $TOKEN" $BASE/collections/$COLLECTION/records/{ID}

# POST (Erstellen)
curl -s $SOCKET -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{json}' $BASE/collections/$COLLECTION/records

# PATCH (Ändern)
curl -s $SOCKET -X PATCH -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{json}' $BASE/collections/$COLLECTION/records/{ID}

# DELETE (Löschen)
curl -s $SOCKET -X DELETE -H "Authorization: Bearer $TOKEN" $BASE/collections/$COLLECTION/records/{ID}
```

---

**Status:** Referenzdokumentation abgeschlossen  
**Nächster Schritt:** NW-DB-LEARN-006 — Praktische Umsetzung dieser API-Aufrufe

