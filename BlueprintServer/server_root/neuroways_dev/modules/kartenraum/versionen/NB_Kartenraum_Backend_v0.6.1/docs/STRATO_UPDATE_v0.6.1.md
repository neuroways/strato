# STRATO Update – Backend v0.6.1

## 1. Datenbank sichern

Vor der Migration ein Backup der Datenbank anlegen.

## 2. Migration ausführen

In phpMyAdmin:

`database/migrations/061_card_journal_entry.sql`

Die Migration:
- legt `nb_card_journal_entry` an
- übernimmt vorhandene `nb_card_experience`-Einträge als `EXPERIENCE`
- löscht die alte Tabelle nicht

## 3. Backend hochladen

Zielordner:

`/modules/kartenraum/NB_Kartenraum_Backend_v0.6.1/`

## 4. Healthcheck

Aufrufen:

`/modules/kartenraum/NB_Kartenraum_Backend_v0.6.1/api/health.php`

Erwartet:

```json
"backend_version": "0.6.1",
"experience_table": true,
"journal_entry_table": true
```

## 5. APIs testen

Mit gültiger Session:
- `journal-entry-save.php`
- `journal-entry-list.php?draw_id=<eigene draw_id>`

## 6. Sicherheit

Eine `draw_id`, die nicht zum angemeldeten Profil gehört,
muss `DRAW_NOT_FOUND` liefern.
