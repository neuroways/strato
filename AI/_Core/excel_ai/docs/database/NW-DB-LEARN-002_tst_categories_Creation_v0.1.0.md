# NW-DB-LEARN-002: Test-Collection `tst_categories` in DEV angelegt

**Datum:** 2026-07-24 23:33:48 UTC  
**Umgebung:** DEV (`.sfs-bd/api`)  
**Status:** Erfolgreich angelegt

---

## 1. Zustand VOR der Änderung

**Abfragezeit:** 2026-07-24 23:33:00 UTC  
**Endpunkt:** `http://localhost/.sfs-bd/api/collections`  
**Authentifizierung:** JWT Admin Token (Standard DEV)

**User-Collections vor Anlage:**
- `users`

**Gesamtzahl:** 1 Benutzer-Collection

---

## 2. Request-Nutzlast

**Endpunkt:** `POST http://localhost/.sfs-bd/api/collections`  
**Transport:** Unix-Socket `/run/cm4all/http/tie.socket`  
**Header:** `Authorization: Bearer $TOKEN`, `Content-Type: application/json`

**Payload:**
```json
{
  "name": "tst_categories",
  "type": "base",
  "fields": [
    {
      "name": "name",
      "type": "text",
      "required": true
    },
    {
      "name": "description",
      "type": "text",
      "required": false
    },
    {
      "name": "created",
      "type": "autodate",
      "onCreate": true,
      "onUpdate": false
    },
    {
      "name": "updated",
      "type": "autodate",
      "onCreate": true,
      "onUpdate": true
    }
  ],
  "listRule": null,
  "viewRule": null,
  "createRule": null,
  "updateRule": null,
  "deleteRule": null
}
```

**Design-Entscheidungen:**

1. **Kein explizites `id`-Feld:** Die Skill-Dokumentation zeigt ein manuelles `id`-Feld im Beispiel, aber Tests in dieser Umgebung zeigen, dass PocketBase für Base-Collections automatisch ein `id`-Feld erzeugt.

2. **`created` und `updated` explizit mit `autodate`:** PocketBase v0.39.0 fügt diese Felder nicht automatisch hinzu — sie müssen explizit definiert werden mit dem Typ `autodate`, sonst sind Sortierungen und Filterungen auf diesen Feldern unmöglich.

3. **API-Regeln auf `null`:** Die Collection erlaubt alle Read- und Write-Operationen ohne Beschränkung (`listRule: null`, `viewRule: null`, etc.) — eine offene Testumgebung.

---

## 3. Response der Anlage

**HTTP-Status:** 200 OK  
**Antwortzeit:** Unmittelbar

**Server-erzeugte Collection:**
```json
{
  "id": "pbc_400465203",
  "listRule": null,
  "viewRule": null,
  "createRule": null,
  "updateRule": null,
  "deleteRule": null,
  "name": "tst_categories",
  "type": "base",
  "fields": [
    {
      "autogeneratePattern": "[a-z0-9]{15}",
      "help": "",
      "hidden": false,
      "id": "text3208210256",
      "max": 15,
      "min": 15,
      "name": "id",
      "pattern": "^[a-z0-9]+$",
      "presentable": false,
      "primaryKey": true,
      "required": true,
      "system": true,
      "type": "text"
    },
    {
      "name": "name",
      "type": "text",
      "required": true,
      "system": false
    },
    {
      "name": "description",
      "type": "text",
      "required": false,
      "system": false
    },
    {
      "name": "created",
      "type": "autodate",
      "onCreate": true,
      "onUpdate": false,
      "system": false
    },
    {
      "name": "updated",
      "type": "autodate",
      "onCreate": true,
      "onUpdate": true,
      "system": false
    }
  ],
  "indexes": [],
  "created": "2026-07-24 23:33:48.688Z",
  "updated": "2026-07-24 23:33:48.688Z",
  "system": false
}
```

---

## 4. Vom Server automatisch erzeugte Felder

| Feld | Typ | Eigenschaft | Automatisch erzeugt |
|------|-----|------------|------------|
| `id` | text | `system: true`, `primaryKey: true`, Autogenerierung `[a-z0-9]{15}` | **Ja** — nicht in Request definiert |
| `created` | autodate | `onCreate: true`, `onUpdate: false` | **Nein** — explizit angefordert, aber Server erzeugt interne `id` Feld-Referenz |
| `updated` | autodate | `onCreate: true`, `onUpdate: true` | **Nein** — explizit angefordert |

---

## 5. Zustand NACH der Änderung

**Abfragezeit:** 2026-07-24 23:33:48.688Z (unmittelbar nach Anlage)  
**Endpunkt:** `http://localhost/.sfs-bd/api/collections`

**User-Collections nach Anlage:**
- `users`
- `tst_categories`

**Gesamtzahl:** 2 Benutzer-Collections

---

## 6. Technische Erkenntnisse

### PocketBase v0.39.0 — Base-Collection `id`-Feld

- Das `id`-Feld wird **automatisch erzeugt**, auch wenn nicht explizit in der Request-Nutzlast definiert.
- Es wird mit `system: true` markiert, was bedeutet, es ist ein internes Feld.
- Der Primärschlüssel wird automatisch auf dieses Feld gesetzt.
- Das Autogenerierungsmuster ist `[a-z0-9]{15}` (15 kleine Buchstaben oder Ziffern).

### PocketBase v0.39.0 — `created` und `updated` Felder

- Diese werden **nicht** automatisch erzeugt.
- Sie **müssen explizit** als `autodate`-Typ definiert werden.
- `onCreate: true` bewirkt, dass das Feld beim Erstellen eines Records gefüllt wird.
- `onUpdate: true` bewirkt, dass das Feld bei jeder Aktualisierung neu gesetzt wird.
- Ohne diese Felder können Sortierungen oder Filter auf `-created` / `updated` zu Fehlern führen.

### Request-Struktur für Basis-Collections

- `"fields"` (nicht `"schema"`) verwenden — der alte Name führt zu stillschweigenden Fehler.
- Jedes Feld muss einen eindeutigen Namen haben.
- `required: true` lehnt leere oder Null-Werte ab.
- `required: false` erlaubt leere / Null-Werte.

---

## 7. Reproduzierbarkeit

Die Anlage kann reproduziert werden durch:

1. **REST API POST:**
   ```bash
   curl -X POST http://localhost/.sfs-bd/api/collections \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"name":"tst_categories","type":"base","fields":[...]}'
   ```

2. **JavaScript SDK:**
   ```javascript
   import { pb } from '@/lib/pb';
   
   // Hinweis: SDK hat keine direkte createCollection API — nur REST
   // REST muss verwendet werden für Datenbankschema-Verwaltung
   ```

3. **Verifikation:**
   ```bash
   curl http://localhost/.sfs-bd/api/collections/tst_categories \
     -H "Authorization: Bearer $TOKEN"
   ```

---

## 8. Isolation und Sicherheit

- **Nur DEV verändert:** Kein Request an LIVE-Umgebung (`.sfs-be/`) durchgeführt.
- **Keine bestehenden Daten berührt:** Die `users` Collection wurde nicht verändert.
- **Token nicht persistiert:** JWT wurde für diese Sitzung erzeugt und nicht gespeichert.
- **Umgebung klar gekennzeichnet:** DEV-Datenbankpfad ist `bd/data.db` (separat von LIVE `be/data.db`).

---

## 9. Nächste Schritte

Die Test-Collection kann jetzt:

1. Mit Records gefüllt werden (POST `/tst_categories/records`)
2. Abgefragt werden (GET `/tst_categories/records`)
3. Gelöscht werden (DELETE `/tst_categories` — löscht auch alle Records)

Eine produzierte Version dieser Collection (nach Publish) wird leer sein — die DEV-Records werden nicht nach LIVE kopiert.

