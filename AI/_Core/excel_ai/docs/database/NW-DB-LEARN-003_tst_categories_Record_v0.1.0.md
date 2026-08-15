# NW-DB-LEARN-003: Testdatensatz in `tst_categories` angelegt

**Datum:** 2026-07-24 23:35:27 UTC  
**Umgebung:** DEV (`.sfs-bd/api`)  
**Collection:** `tst_categories`  
**Status:** Erfolgreich angelegt

---

## 1. Vorher-Prüfung

**Abfragezeit:** 2026-07-24 23:35:00 UTC  
**Endpunkt:** `GET http://localhost/.sfs-bd/api/collections/tst_categories/records?filter=name="Grundlagen"`  
**Authentifizierung:** JWT Admin Token (Standard DEV)

**Ergebnis:** 0 bestehende Records mit `name = "Grundlagen"`

→ Datensatz nicht vorhanden, Anlage fortgesetzt

---

## 2. Request-Nutzlast

**Endpunkt:** `POST http://localhost/.sfs-bd/api/collections/tst_categories/records`  
**Transport:** Unix-Socket `/run/cm4all/http/tie.socket`  
**Header:** `Authorization: Bearer $TOKEN`, `Content-Type: application/json`

**Payload (nur fachliche Felder):**
```json
{
  "name": "Grundlagen",
  "description": "Erste Testkategorie zum Nachvollziehen der Datenspeicherung"
}
```

---

## 3. Server-Response

**HTTP-Status:** 200 OK  
**Antwortzeit:** Unmittelbar

**Vom Server erzeugte Felder:**

```json
{
  "collectionId": "pbc_400465203",
  "collectionName": "tst_categories",
  "id": "gi0ymx1yznu4j6n",
  "name": "Grundlagen",
  "description": "Erste Testkategorie zum Nachvollziehen der Datenspeicherung",
  "created": "2026-07-24 23:35:27.082Z",
  "updated": "2026-07-24 23:35:27.082Z"
}
```

---

## 4. Datensatz-Details

| Eigenschaft | Wert | Quelle |
|---|---|---|
| **ID** | `gi0ymx1yznu4j6n` | Server-erzeugt automatisch |
| **name** | `Grundlagen` | Fachlich übermittelt |
| **description** | `Erste Testkategorie zum Nachvollziehen der Datenspeicherung` | Fachlich übermittelt |
| **created** | `2026-07-24 23:35:27.082Z` | Server erzeugt via `autodate onCreate` |
| **updated** | `2026-07-24 23:35:27.082Z` | Server erzeugt via `autodate onUpdate` |
| **collectionId** | `pbc_400465203` | System-Referenz zur Collection |
| **collectionName** | `tst_categories` | System-Referenz zur Collection |

---

## 5. Technische Erkenntnisse

### Automatisch erzeugte Felder beim Record-Anlage

- **`id`:** Der Server erzeugt ein eindeutiges Kennzeichen nach dem Muster `[a-z0-9]{15}` (hier: `gi0ymx1yznu4j6n`).
- **`created`:** Der Server setzt den Zeitstempel beim Anlegen des Records (Feld ist vom Typ `autodate` mit `onCreate: true`).
- **`updated`:** Der Server setzt den Zeitstempel beim Anlegen des Records und aktualisiert ihn bei jeder Änderung (Feld ist vom Typ `autodate` mit `onCreate: true, onUpdate: true`).
- **`collectionId` und `collectionName`:** Der Server fügt automatisch Metadaten zur zugehörigen Collection hinzu.

### Request-Struktur für Record-Anlage

- Nur **fachliche Felder** übermitteln: `name`, `description`.
- **Nie** die Felder `id`, `created`, `updated`, `collectionId`, `collectionName` in der Request mitgeben — der Server setzt diese automatisch.
- Das Payload ist minimal und fokussiert auf Dateneingabe.

---

## 6. Daten-Persistenz

Der Datensatz ist jetzt in der DEV-Datenbank unter `bd/data.db` dauerhaft gespeichert. Er ist:

- **Sofort abrufbar** via `GET /tst_categories/records/gi0ymx1yznu4j6n`
- **Suchbar** via Filter: `name="Grundlagen"`
- **Veränderbar** via PATCH auf die Record-ID
- **Löschbar** via DELETE auf die Record-ID

Nach einem Publish wird dieser Datensatz **nicht** in die LIVE-Datenbank kopiert — die LIVE-Collection `tst_categories` wird leer sein, weil nur die Collection-Struktur (Schema) migriert wird, nicht die Datensätze.

---

## 7. Verifikation

Der Datensatz kann überprüft werden:

```bash
# Datensatz abrufen nach ID
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost/.sfs-bd/api/collections/tst_categories/records/gi0ymx1yznu4j6n

# Alle Datensätze in der Collection auflisten
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost/.sfs-bd/api/collections/tst_categories/records

# Nach Name filtern
curl -H "Authorization: Bearer $TOKEN" \
  'http://localhost/.sfs-bd/api/collections/tst_categories/records?filter=name="Grundlagen"'
```

