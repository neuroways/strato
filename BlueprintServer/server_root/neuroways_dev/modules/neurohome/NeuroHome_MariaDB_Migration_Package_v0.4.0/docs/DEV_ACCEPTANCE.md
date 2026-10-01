# DEV-Abnahme v0.4.0

## A. Vor dem Lauf

- [ ] MariaDB-Version mit `SELECT VERSION()` dokumentiert
- [ ] DEV-Datenbank und Zeichensatz bestätigt
- [ ] Backup erstellt
- [ ] Restore-Ziel und Zugang geprüft
- [ ] `NEUROHOME_ENV=dev` gesetzt

## B. Migration

- [ ] `php bin/migrate.php --dry-run` zeigt fünf ausstehende Migrationen
- [ ] `php bin/migrate.php --apply` endet ohne Fehler
- [ ] zweiter `--apply`-Lauf meldet „Schema ist bereits aktuell“
- [ ] Prüfsummen bereits angewendeter Dateien werden nicht verändert

## C. Technische Prüfung

- [ ] `php bin/verify.php` meldet vollständig PASS
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
