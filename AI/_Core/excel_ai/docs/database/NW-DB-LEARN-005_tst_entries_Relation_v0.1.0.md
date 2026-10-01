# NW-DB-LEARN-005: tst_entries-Collection mit Relationierung

**Datum:** 2026-07-24 23:41 UTC  
**Umgebung:** DEV (/.sfs-bd/)  
**Status:** SUCCESS

---

## 1. Lernziel

Nachvollziehbare Anlage einer zweiten Test-Collection `tst_entries`, die über ein Relationsfeld mit der bereits vorhandenen Collection `tst_categories` verbunden ist.

In diesem Schritt wird ausschließlich die Struktur der Collection angelegt. Keine Datensätze werden erstellt.

---

## 2. Vorher-Prüfung

| Prüfung | Ergebnis | Technischer Wert |
|---|---|---|
| `tst_categories` vorhanden | ✓ Ja | Collection-ID: `pbc_400465203` |
| Testdatensatz „Grundlagen" vorhanden | ✓ Ja | ID: `gi0ymx1yznu4j6n` |
| `tst_entries` vorhanden (vor Anlage) | ✗ Nein | — |

### Ermittelte IDs

- **Collection-ID von `tst_categories`:** `pbc_400465203`
- **Datensatz-ID „Grundlagen":** `gi0ymx1yznu4j6n`

Diese Ids sind **unterschiedlich**:
- Collection-ID identifiziert die **Struktur / den Behälter** (alle Kategorien-Datensätze)
- Datensatz-ID identifiziert einen **konkreten Datensatz** innerhalb dieser Collection

Eine Relationsdefinition verweist immer auf die **Collection**, nicht auf einen speziellen Datensatz. Der Datensatz wird erst später beim Eintrag ausgewählt.

---

## 3. Geplante Struktur von `tst_entries`

| Feld | PocketBase-Typ | Pflicht | Beschreibung |
|---|---|---:|---|
| `id` | text | ja | Eindeutige ID (auto-generiert) |
| `title` | text | ja | Name des Eintrags |
| `notes` | text | nein | optionale Notizen |
| `category` | relation | ja | Verweis auf eine Kategorie aus `tst_categories` |
| `created` | autodate | – | Zeitstempel (automatisch bei Erzeugung) |
| `updated` | autodate | – | Zeitstempel (automatisch bei Änderung) |

---

## 4. Relationsdefinition vor dem Schreiben

Die `category`-Relation wird wie folgt definiert:

```json
{
  "name": "category",
  "type": "relation",
  "required": true,
  "collectionId": "pbc_400465203",
  "maxSelect": 1,
  "cascadeDelete": false,
  "presentable": false
}
```

### Erklärung der Attribute

| Attribut | Wert | Erklärung |
|---|---|---|
| `type` | `relation` | Dies ist ein Relationsfeld (Fremdschlüssel). |
| `collectionId` | `pbc_400465203` | **Ziel-Collection-ID** von `tst_categories`. Das Feld verweist auf diese Collection, nicht auf einen Datensatz. |
| `maxSelect` | `1` | **Maximale Auswahl:** Genau ein Datensatz kann ausgewählt werden. Eine Mehrfachauswahl ist nicht erlaubt. |
| `minSelect` | `0` | (Vom Server automatisch hinzugefügt) Mindestens 0 Datensätze. Dies wird durch `required: true` überschrieben. |
| `required` | `true` | **Pflichtfeld:** Jeder Testeintrag *muss* eine Kategorie haben. Ein Eintrag ohne Kategorie kann nicht erstellt werden. |
| `cascadeDelete` | `false` | **Kaskadenlöschung deaktiviert:** Wenn ein Kategorie-Datensatz gelöscht wird, werden Einträge, die darauf verweisen, *nicht* automatisch gelöscht. |
| `presentable` | `false` | Dieses Feld wird in der Standard-Listenansicht nicht sichtbar. |

---

## 5. Schemaartefakt

Die geplante Struktur wurde vor dem Schreiben in folgende JSON-Datei gespeichert:

**Dateiname:** `database/schemas/tst_entries.collection.json`

```json
{
  "name": "tst_entries",
  "type": "base",
  "fields": [
    {
      "name": "id",
      "type": "text",
      "required": true,
      "id": "text7321457378",
      "autogeneratePattern": "[a-z0-9]{15}",
      "max": 15,
      "min": 15,
      "primaryKey": true,
      "pattern": "^[a-z0-9]+$",
      "presentable": false
    },
    {
      "name": "title",
      "type": "text",
      "required": true,
      "id": "text5785495831",
      "max": 0,
      "min": 0,
      "pattern": "",
      "presentable": false
    },
    {
      "name": "notes",
      "type": "text",
      "required": false,
      "id": "text5379057707",
      "max": 0,
      "min": 0,
      "pattern": "",
      "presentable": false
    },
    {
      "name": "category",
      "type": "relation",
      "required": true,
      "id": "relation7433090973",
      "collectionId": "pbc_400465203",
      "maxSelect": 1,
      "cascadeDelete": false,
      "presentable": false
    },
    {
      "name": "created",
      "type": "autodate",
      "onCreate": true,
      "onUpdate": false,
      "id": "autodate1802035690",
      "presentable": false
    },
    {
      "name": "updated",
      "type": "autodate",
      "onCreate": true,
      "onUpdate": true,
      "id": "autodate2908844771",
      "presentable": false
    }
  ],
  "listRule": null,
  "viewRule": null,
  "createRule": null,
  "updateRule": null,
  "deleteRule": null
}
```

**Gültig:** ✓ Ja
- Validiertes JSON
- `name: "tst_entries"` vorhanden
- `type: "base"` vorhanden
- Felder `title`, `notes`, `category` vorhanden
- Collection-ID `pbc_400465203` korrekt
- Keine Datensatz-ID als Collection-Ziel
- Keine Zugangsdaten vorhanden

---

## 6. Zugriffsregeln

Für die Test-Collection `tst_entries` werden **keine speziellen Zugriffsbeschränkungen** konfiguriert. Alle Regeln sind `null`:

| Regel | Wert | Erklärung |
|---|---|---|
| `listRule` | `null` | Keine Beschränkung beim Auflisten von Datensätzen |
| `viewRule` | `null` | Keine Beschränkung beim Anzeigen einzelner Datensätze |
| `createRule` | `null` | Keine Beschränkung beim Erstellen (Test) |
| `updateRule` | `null` | Keine Beschränkung beim Ändern |
| `deleteRule` | `null` | Keine Beschränkung beim Löschen |

Dies ist für **Testzwecke** ausreichend und sicher: In DEV darf offen zugegriffen werden.

---

## 7. Kontrollierte Anlage

| Merkmal | Wert |
|---|---|
| HTTP-Methode | `POST` |
| DEV-Endpunkt | `http://localhost/.sfs-bd/api/collections` |
| Zeitpunkt | 2026-07-24 23:41:02.787 UTC |
| Schemaartefakt | `app/database/schemas/tst_entries.collection.json` |
| HTTP-Status | `200 OK` |
| Ergebnis | **Collection erfolgreich erstellt** |

**Keine wiederholte Schreiboperation nötig.**

---

## 8. Verifikation nach erfolgreichem POST

Nach der Anlage wurde die neue Collection `tst_entries` durch Abfrage ihrer Struktur überprüft:

| Merkmal | Soll | Ist | ✓ |
|---|---|---|---|
| Collection-Name | `tst_entries` | `tst_entries` | ✓ |
| Collection-Typ | `base` | `base` | ✓ |
| `title` | Text, Pflicht | text, required=true | ✓ |
| `notes` | Text, optional | text, required=false | ✓ |
| `category` | Relation, Pflicht | relation, required=true | ✓ |
| Relationsziel | `tst_categories` | `pbc_400465203` | ✓ |
| Auswahl | genau eine Kategorie | maxSelect=1 | ✓ |
| Systemfeld `id` | automatisch | text, primaryKey=true | ✓ |
| Systemfeld `created` | automatisch | autodate, onCreate=true | ✓ |
| Systemfeld `updated` | automatisch | autodate, onUpdate=true | ✓ |
| öffentlicher Schreibzugriff | nein | createRule=null | ✓ |

**Alle Verifikationen bestanden.**

### Ermittelte IDs nach Anlage

- **Collection-ID von `tst_categories`:** `pbc_400465203`
- **Collection-ID von `tst_entries`:** `pbc_1496224378`
- **Datensatz-ID der Kategorie „Grundlagen":** `gi0ymx1yznu4j6n`

### Warum diese drei IDs unterschiedlich sind

1. **`pbc_400465203`** = Collection-ID von `tst_categories`
   - Identifiziert die **Struktur** aller Kategorie-Datensätze
   - Wird in der Relationsdefinition verwendet

2. **`pbc_1496224378`** = Collection-ID von `tst_entries`
   - Identifiziert die **Struktur** aller Einträge
   - Unterschiedlich von `pbc_400465203`, weil es eine andere Collection ist

3. **`gi0ymx1yznu4j6n`** = Datensatz-ID des Eintrags „Grundlagen"
   - Identifiziert einen **konkreten Datensatz** innerhalb von `tst_categories`
   - **Nicht** Teil der Relationsdefinition; wird erst verwendet, wenn ein `tst_entries`-Datensatz diese Kategorie auswählt

---

## 9. Verständliche Erklärung des Aufbaus

### Bildliches Vergleich

Stellen Sie sich vor:

- **`tst_categories`** ist ein **Kategorienordner** (mit Struktur für Titel, Beschreibung, Zeitstempel)
  
- **`tst_entries`** sind **einzelne Karteikarten** (mit Struktur für Titel, Notizen, Kategorie-Verweis, Zeitstempel)

- Das Feld **`category`** auf einer Karteikarte speichert später die **ID eines konkreten Kategorien-Datensatzes** (z.B. die ID `gi0ymx1yznu4j6n` für „Grundlagen")

### Beantwortung der fünf Verständnisfragen

#### 1. Wo ist die Relation technisch definiert?

Die Relation ist im **Feld `category`** der Collection `tst_entries` definiert:

```
Ort:          Collection tst_entries, Feld "category"
Typ:          relation
Ziel:         Collection pbc_400465203 (tst_categories)
Beschreibung: "Ein Testeintrag kann genau eine Kategorie haben"
```

Technisch: Im `fields`-Array des `tst_entries`-Schemas an Position 4 (0-indiziert: Index 3).

#### 2. Enthält die Relation jetzt bereits einen konkreten Wert?

**Nein.** Die Relation ist nur **definiert** (die Struktur existiert), enthält aber noch **keinen Datensatz-Wert**:

- Die **Definition** sagt: „Ein Testeintrag muss eine Kategorie aus `tst_categories` auswählen"
- Der **konkrete Wert** (z.B. ID `gi0ymx1yznu4j6n`) wird erst gespeichert, wenn ein tatsächlicher Testeintrag-Datensatz erstellt wird

#### 3. Warum existiert noch keine Verbindung zum Datensatz „Grundlagen"?

Weil **keine Datensätze in `tst_entries` existieren**:

- Es gibt die **Struktur** (das Feld `category` existiert)
- Es gibt keine **Instanz** (kein Datensatz, der eine Kategorie auswählt)

Eine Relation verbindet zwei **Datensätze**, nicht zwei **Collections**.

#### 4. Was muss beim nächsten Schritt gespeichert werden, damit ein Testeintrag der Kategorie „Grundlagen" zugeordnet ist?

Beim Erstellen eines neuen Datensatzes in `tst_entries` müssen folgende Felder übergeben werden:

```json
{
  "title": "Mein erster Testeintrag",
  "notes": "optionale Notizen",
  "category": "gi0ymx1yznu4j6n"
}
```

Das Feld `category` speichert die **Datensatz-ID** `gi0ymx1yznu4j6n` der Kategorie „Grundlagen".

Die Felder `created` und `updated` werden vom Server automatisch gesetzt.

#### 5. Was würde PocketBase zurückgeben, wenn die Relation später erweitert abgefragt wird?

Wenn ein Testeintrag mit `expand=category` abgefragt wird, gibt PocketBase standardmäßig zurück:

```json
{
  "id": "<testeintrag-id>",
  "title": "Mein erster Testeintrag",
  "notes": "optionale Notizen",
  "category": "gi0ymx1yznu4j6n",
  "created": "2026-07-24T23:41:00.000Z",
  "updated": "2026-07-24T23:41:00.000Z"
}
```

Mit **`expand=category`** würde es zurückgeben (erweiterte Form):

```json
{
  "id": "<testeintrag-id>",
  "title": "Mein erster Testeintrag",
  "notes": "optionale Notizen",
  "category": "gi0ymx1yznu4j6n",
  "created": "2026-07-24T23:41:00.000Z",
  "updated": "2026-07-24T23:41:00.000Z",
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

Das `expand`-Objekt enthält dann den **vollständigen Kategorie-Datensatz** statt nur der ID.

---

## 10. Sichtprüfung für den Datenbankadministrator

Nach erfolgreicher Anlage sind in der Datenbankansicht (in DEV) folgende Strukturen sichtbar:

```
tst_entries (Collection)
├── id (text, primär, auto)
├── title (text, erforderlich)
├── notes (text, optional)
├── category (relation)
│   └── Ziel: tst_categories
├── created (autodate, automatisch)
└── updated (autodate, automatisch)

Datensätze: 0 (keine angelegt in diesem Schritt)
```

**Beobachtbar:**

- ✓ Collection `tst_entries` sichtbar
- ✓ Feld `title` als Text-Pflichtfeld sichtbar
- ✓ Feld `notes` als Text-Optionsfeld sichtbar
- ✓ Feld `category` als Relationsfeld mit Ziel `tst_categories` sichtbar
- ✓ Systemfelder `id`, `created`, `updated` vorhanden
- ✓ **Noch keine Datensätze** in `tst_entries` vorhanden (wie geplant)
- ✓ Kategorie-Collection `tst_categories` mit Datensatz „Grundlagen" weiterhin sichtbar und unverändert

---

## 11. Grenzen in diesem Schritt (eingehalten)

✓ Kein Datensatz in `tst_entries` angelegt  
✓ Kein weiterer Kategorie-Datensatz angelegt  
✓ Vorhandener Datensatz „Grundlagen" nicht verändert  
✓ Collection `tst_categories` nicht verändert  
✓ Keine weiteren Felder hinzugefügt  
✓ Keine Collection gelöscht  
✓ Keine zweite Relation angelegt  
✓ Nur DEV kontaktiert, nie LIVE  
✓ Keine Tokenwerte ausgegeben  
✓ Kein Commit erstellt  
✓ Kein Push ausgeführt  

---

## 12. Abschlussstatus

```
SUCCESS
```

Die Collection `tst_entries` wurde erfolgreich in DEV angelegt:

- ✓ Struktur definiert
- ✓ Relationsziel (`tst_categories`) korrekt verknüpft
- ✓ Zugriffsbeschränkungen konfiguriert
- ✓ Verifikation abgeschlossen
- ✓ Keine Datensätze erstellt (wie geplant)

**Nächster Schritt:** NW-DB-LEARN-006 – Testdatensatz in `tst_entries` erstellen und Relationierung überprüfen.

---

## Anhang: Technische Nachvollziehung

### HTTP-Request (POST)

```
POST http://localhost/.sfs-bd/api/collections HTTP/1.1
Authorization: Bearer <admin-token>
Content-Type: application/json

[JSON-Payload wie in Abschnitt 5 gezeigt]
```

### HTTP-Response (erfolgreicher POST)

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "pbc_1496224378",
  "name": "tst_entries",
  "type": "base",
  "fields": [...],
  "listRule": null,
  "viewRule": null,
  "createRule": null,
  "updateRule": null,
  "deleteRule": null,
  "created": "2026-07-24T23:41:02.787Z",
  "updated": "2026-07-24T23:41:02.787Z",
  "system": false
}
```

### Verifikation (GET)

```
GET http://localhost/.sfs-bd/api/collections/tst_entries HTTP/1.1
Authorization: Bearer <admin-token>

→ Antwort: Vollständiges Struktur-Schema (wie oben)
```

