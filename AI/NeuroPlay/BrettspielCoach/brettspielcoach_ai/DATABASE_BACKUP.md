# Datenbank-Sicherung

Diese Dateien enthalten deine Spiele und Katalogdaten.

## Dateien

- **`database/development.db`** – Daten aus deiner Entwicklungsumgebung
- **`database/production.db`** – Daten aus deiner Live-Website

## Inhalt

Jede Datenbank speichert:

- **games** – Alle Spiele, die du hochgeladen oder analysiert hast
- **game_models** – Vollständige Spielstrukturen (Regeln, Strategien, Material)
- **catalog_games** – Die 52 Spiele aus dem Excel-Katalog
- **game_sessions** – Laufende Spielsitzungen
- **analysis_jobs** – Status von PDF-Uploads und Analysen
- **import_batches** – Katalog-Import-Historie

## Wiederherstellung

Falls nötig:

```bash
# Entwicklung
cp database/development.db ../bd/data.db

# Live
cp database/production.db ../be/data.db
```

Danach die App neu starten — die Daten sind wieder da.

## Versionskontrolle

Diese Dateien sind im Git-Repository enthalten. Bei jedem Commit werden sie automatisch versioniert. Du kannst jederzeit zu einer früheren Version wechseln:

```bash
git log --oneline -- database/
git checkout <commit-hash> -- database/development.db
```

Jede Änderung an deinen Spielen oder dem Katalog wird damit dokumentiert.

---

Zuletzt aktualisiert: `git log -1 --format=%ai database/`
