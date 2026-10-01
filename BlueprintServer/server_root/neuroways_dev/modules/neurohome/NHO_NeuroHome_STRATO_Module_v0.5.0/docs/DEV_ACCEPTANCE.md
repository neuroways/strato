# DEV-Abnahme Modul v0.5.0 · Datenbankschema v0.4.1

## A. Vor dem Lauf

- [ ] MariaDB-Version mit `SELECT VERSION()` dokumentiert
- [ ] DEV-Datenbank und Zeichensatz bestätigt
- [ ] Backup erstellt
- [ ] Restore-Ziel und Zugang geprüft
- [ ] Modul liegt unter `/BlueprintServer/server_root/neuroways_dev/modules/neurohome/NHO_NeuroHome_STRATO_Module_v0.5.0/`
- [ ] die öffentliche URL endet mit `/modules/neurohome/NHO_NeuroHome_STRATO_Module_v0.5.0/`
- [ ] `index.html`, `app.css` und `app.js` werden öffentlich geladen
- [ ] `database/`, `backend/`, `docs/` und `registry/` sind per Browser gesperrt
- [ ] zentrale `/config/database.php` ist vorhanden
- [ ] Connection Profile `platform` ist auflösbar
- [ ] `NEUROWAYS_ENV=dev` explizit gesetzt

## B. Migration

- [ ] `php database/bin/migrate.php --dry-run` zeigt fünf ausstehende Migrationen
- [ ] `php database/bin/migrate.php --apply` endet ohne Fehler
- [ ] zweiter `--apply`-Lauf meldet „Schema ist bereits aktuell“
- [ ] Prüfsummen bereits angewendeter Dateien werden nicht verändert

## C. Technische Prüfung

- [ ] `php database/bin/verify.php` meldet vollständig PASS
- [ ] alle 41 `NHO_`-Tabellen verwenden InnoDB und utf8mb4
- [ ] sieben Methoden und sieben veröffentlichte Versionen vorhanden
- [ ] 21 Methodenschritte vorhanden
- [ ] FULLTEXT-Index auf `NHO_SEARCH_DOCUMENTS.search_text` vorhanden

## D. Küchenpilot

- [ ] `sql/smoke_kitchen.sql` läuft vollständig und endet mit ROLLBACK
- [ ] Suche nach „Waage“ liefert Ziel- und Beobachtungspfad getrennt
- [ ] Parkplatz, Chaosschutz und Besucherrolle können demselben Ort zugeordnet werden
- [ ] Session speichert Check-in, Rahmen, Methode, bestätigte Aktion und Abschluss
- [ ] Vorher- und Nachherzustand bleiben getrennte Beobachtungen

## E. PROD-Sperre

- [ ] `NHO` formal registriert
- [ ] Haushaltsrechte serverseitig automatisiert getestet
- [ ] echter Backup-Restore-Test bestanden
- [ ] technische Abnahme dokumentiert

Ohne vollständigen Abschnitt E bleibt der Status **DEV READY · PROD BLOCKED**.
