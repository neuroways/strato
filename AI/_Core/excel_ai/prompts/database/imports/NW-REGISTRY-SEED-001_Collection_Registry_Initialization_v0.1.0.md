# NW-REGISTRY-SEED-001
# Collection Registry Initialisierung

**Dokument-ID:** NW-REGISTRY-SEED-001  
**Titel:** Collection Registry Seed und Initialisierung  
**Version:** 0.1.0  
**Datum:** 2026-07-25 12:55:00 UTC  
**Basierend auf:** NW-DB-ADR-001 (Architekturentscheidungen)  
**Status:** Konfiguration für Admin-Datenbankmanager

---

## Ziel

Initialisiere die Central Collection Registry `nw_collection_registry` mit Einträgen für die drei
aktuell verwalteten fachlichen Collections:

1. `games` (Spiele-Katalog)
2. `publishers` (Verlags-Stammdaten)
3. `npl_personal_inventory_items` (Persönliche Spielesammlung)

Die Registry ist das Quelle-der-Wahrheit für die Admin-Datenbankmanager-Oberfläche.

---

## Artefakte

### Schema

**Datei:** `database/schemas/nw_collection_registry.collection.json`

- Collection-Name: `nw_collection_registry`
- Typ: `base`
- Eindeutige Indizes: `registry_id`, `collection_name`
- 25 Felder (Boolean, Text, Number, JSON, Date, Autodate)

### Seed Records

**Datei:** `database/data/system/nw_collection_registry_v0.1.0.records.json`

3 Einträge:

1. **REG-NPL-GAMES-001** → Collection `games`
   - Display: "Spiele"
   - Kategorie: products
   - Excel-Import: erlaubt
   - Operationen: update (keine create/delete)
   - Searchable: title, publisher, isbn
   - Default columns: id, title, publisher, publication_year

2. **REG-NPL-PUBLISHERS-001** → Collection `publishers`
   - Display: "Verlage"
   - Kategorie: masters
   - Excel-Import: erlaubt
   - Operationen: update (keine create/delete)
   - Searchable: name, country, website
   - Default columns: id, name, country

3. **REG-NPL-INVENTORY-001** → Collection `npl_personal_inventory_items`
   - Display: "Persönliche Spielesammlung"
   - Kategorie: inventory
   - Excel-Import: erlaubt
   - Operationen: create, update, delete
   - Searchable: title, inventory_id, category, publisher
   - Default columns: id, inventory_id, title, item_type, identification_status

---

## Deployment-Schritte

### Phase 1: Schema in DEV erstellen

```bash
POST /.sfs-bd/api/collections

Body: Content aus nw_collection_registry.collection.json
```

**Erwartung:** HTTP 200, Collection angelegt mit ID `pbc_nw_registry`

### Phase 2: Seed-Records einfügen

```bash
POST /.sfs-bd/api/records/nw_collection_registry

Body: Jeder Record einzeln aus nw_collection_registry_v0.1.0.records.json
```

**Erwartung:** HTTP 200 pro Record

---

## Verifikation

Nach dem Deployment:

```bash
GET /.sfs-bd/api/records/nw_collection_registry
```

**Erwartete Antwort:** 3 Records, sortiert nach `display_order`

---

## Integration mit Admin-UI

Die React-Komponenten laden Registry zur Laufzeit:

```jsx
const registries = await pb
  .collection('nw_collection_registry')
  .getFullList({
    filter: 'visible_in_admin = true && enabled = true',
    sort: '+display_order'
  });
```

**Komponenten:**
- `src/components/AdminDatabase.jsx` — Datenbankmanager
- `src/components/ExcelImportUI.jsx` — Excel-Import-Oberfläche

---

## Abhängigkeiten

- PocketBase v0.39.0 läuft auf DEV (`/.sfs-bd/`)
- Collections `games`, `publishers`, `npl_personal_inventory_items` existieren bereits
- Token via `pb_gen_token_sfs.js` vorhanden

---

## Nächste Schritte

1. Schema `nw_collection_registry` in DEV deployed
2. Seed-Records eingefügt
3. Git-Artefakte versioniert
4. Admin-UI testet Registry-Abfragen
5. Weitere Collections können durch neue Einträge registriert werden

