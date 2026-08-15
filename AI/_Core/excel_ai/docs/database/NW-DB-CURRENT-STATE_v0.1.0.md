# NW-DB — Aktueller Zustand der DEV-Datenbank

**Zuletzt aktualisiert:** 2026-07-24 23:41:50 UTC  
**Umgebung:** Development (/.sfs-bd/)

---

## Zusammenfassung

In der DEV-Datenbank wurden zwei Test-Collections erfolgreich angelegt und miteinander relationiert:

| Collection | ID | Status | Datensätze | Typ |
|---|---|---|---|---|
| `tst_categories` | `pbc_400465203` | ✓ Aktiv | 1 | base |
| `tst_entries` | `pbc_1496224378` | ✓ Aktiv | 0 | base |

Beide Collections sind **strukturiert, verknüpft und überprüft**.

---

## Detailansicht

### 1. Collection `tst_categories`

**Angelegt in:** NW-DB-LEARN-002 (2026-07-24 23:33)

**Struktur:**

| Feld | Typ | Pflicht | Systemfeld | Beschreibung |
|---|---|---:|---:|---|
| `id` | text | ja | ja | Eindeutige Kennung |
| `name` | text | ja | nein | Kategoriename |
| `description` | text | nein | nein | optionale Beschreibung |
| `created` | autodate | – | nein | Erstellungszeitstempel |
| `updated` | autodate | – | nein | Änderungszeitstempel |

**Datensätze:**

| ID | name | description | created | updated |
|---|---|---|---|---|
| `gi0ymx1yznu4j6n` | Grundlagen | Grundlagen-Kategorie für den nachvollziehbaren PocketBase-Lerntest | 2026-07-24 23:35:27.082Z | 2026-07-24 23:37:21.910Z |

**Dokumentation:**
- `docs/database/NW-DB-LEARN-002_tst_categories_Creation_v0.1.0.md`
- `docs/database/NW-DB-LEARN-003_tst_categories_Record_v0.1.0.md`
- `docs/database/NW-DB-LEARN-004_tst_categories_Update_v0.1.0.md`

---

### 2. Collection `tst_entries`

**Angelegt in:** NW-DB-LEARN-005 (2026-07-24 23:41)

**Struktur:**

| Feld | Typ | Pflicht | Systemfeld | Beschreibung |
|---|---|---:|---:|---|
| `id` | text | ja | ja | Eindeutige Kennung |
| `title` | text | ja | nein | Name des Eintrags |
| `notes` | text | nein | nein | optionale Notizen |
| `category` | relation | ja | nein | **Verweis auf `tst_categories`** |
| `created` | autodate | – | nein | Erstellungszeitstempel |
| `updated` | autodate | – | nein | Änderungszeitstempel |

**Relationsdetails für Feld `category`:**

```
Ziel-Collection:  tst_categories (ID: pbc_400465203)
Maximale Auswahl: 1
Minimalauswahl:   0 (überschrieben durch required: true)
Kaskadenlöschung: nein (cascadeDelete: false)
Pflichtfeld:      ja (required: true)
```

**Datensätze:** 0 (noch keine angelegt)

**Dokumentation:**
- `docs/database/NW-DB-LEARN-005_tst_entries_Relation_v0.1.0.md`

---

## Relationierungslogik

### Technischer Aufbau

```
tst_categories (Collection-ID: pbc_400465203)
├── Datensatz "Grundlagen" (ID: gi0ymx1yznu4j6n)

tst_entries (Collection-ID: pbc_1496224378)
├── Feld "category" → verweist auf Collection pbc_400465203
    └── Zulässige Datensatz-IDs: alle aus tst_categories
        ├── Beispiel: gi0ymx1yznu4j6n (Grundlagen)
        └── (weitere Kategorien möglich)
```

### Semantik

- Ein **Datensatz in `tst_entries`** muss **eine Kategorie** aus `tst_categories` auswählen
- Die Auswahl erfolgt durch Speicherung der **Datensatz-ID** (z.B. `gi0ymx1yznu4j6n`)
- Die Kategorie ist ein **Pflichtfeld** (jeder Eintrag muss eine Kategorie haben)
- Kein **automatisches Löschen**: Wenn eine Kategorie gelöscht wird, bleiben die Einträge erhalten

### Beispiel (wenn ein Datensatz erstellt würde)

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

Bei Abfrage mit `expand=category`:

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
      "description": "...",
      "created": "2026-07-24T23:35:27.082Z",
      "updated": "2026-07-24T23:37:21.910Z"
    }
  }
}
```

---

## Schemaartefakte

Alle geplanten Strukturen sind als JSON dokumentiert:

| Datei | Collection | Zweck |
|---|---|---|
| `database/schemas/tst_categories.collection.json` | tst_categories | Struktur von tst_categories (angelegt in NW-002) |
| `database/schemas/tst_entries.collection.json` | tst_entries | Struktur von tst_entries mit Relationsdefinition |

Beide Artefakte entsprechen exakt dem **aktuellen Zustand** der Collections und können für Migrationen oder Dokumentation verwendet werden.

---

## Zugriffsbeschränkungen

Für beide Test-Collections gelten **identische offene Regeln** (alle Zugriffe erlaubt, da Test):

| Regel | `tst_categories` | `tst_entries` |
|---|---|---|
| `listRule` | `null` | `null` |
| `viewRule` | `null` | `null` |
| `createRule` | `null` | `null` |
| `updateRule` | `null` | `null` |
| `deleteRule` | `null` | `null` |

Dies ist **ausschließlich für Testzwecke** sicher. In Produktion sollten Regeln restriktiv sein.

---

## Nächste Schritte

### NW-DB-LEARN-006 (geplant)

Testdatensatz in `tst_entries` erstellen und Relationierung überprüfen:

1. POST-Anfrage mit `title`, `notes` und `category` (ID: `gi0ymx1yznu4j6n`)
2. Verifikation des erstellten Datensatzes
3. Test der erweiterten Abfrage mit `expand=category`
4. Überprüfung, dass die Kategorie-Daten vollständig zurückgegeben werden

### Folgende Lernschritte

- **NW-DB-LEARN-007:** Weitere Datensätze in `tst_entries` erstellen
- **NW-DB-LEARN-008:** Kategoriedatensatz verändern und `updated`-Feld überprüfen
- **NW-DB-LEARN-009:** Datensätze filtern und sortieren
- **NW-DB-LEARN-010:** Datensätze löschen und Cascading überprüfen

---

## Git-Historie

```
Commit a06d901 (HEAD → dev)
Author: AI App & Site Builder
Date:   2026-07-24 23:41:02 UTC

    NW-DB-LEARN-005: tst_entries collection with relation to tst_categories
    
    - Created tst_entries base collection (ID: pbc_1496224378)
    - Added relation field 'category' pointing to tst_categories
    - maxSelect=1, cascadeDelete=false
    - Fields: title, notes, category
    - System fields: id, created, updated
    - All access rules open (test-safe)
    - Schema artifact + documentation
    - Verification: SUCCESS
```

---

## Integrität

**Letzter Check:** 2026-07-24 23:41:50 UTC

- ✓ Beide Collections vorhanden in DEV
- ✓ Relationsdefinition korrekt
- ✓ Schemaartefakte aktuell
- ✓ Dokumentation vollständig
- ✓ Keine Konflikte mit LIVE (wird nicht berührt)
- ✓ Git committet
- ✓ Bereit für nächsten Lernschritt

---

**Status:** READY FOR NW-DB-LEARN-006

