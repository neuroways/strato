# Changelog

## 0.5.0 · 2026-08-24

- öffentliche mobile Startseite `index.html` ergänzt
- vollständigen NeuroHome-Reset-Check-in und Begleitmodus integriert
- relative CSS- und JavaScript-Pfade für den STRATO-Unterordner verwendet
- Root-Sperre durch gezielten Schutz technischer Unterordner ersetzt
- lokales Speichern des letzten Abschlusses im Browser aktiviert
- physische DEV-Ablage und öffentliche Modulroute dokumentiert

## 0.4.1 · 2026-08-24

- NeuroHome als Geschwistermodul von Kartenraum eingeordnet
- eigene Datenbankkonfiguration vollständig entfernt
- zentrale `/config/database.php` und Connection `platform` angebunden
- Paketstruktur auf versioniertes NeuroWays-Modul umgestellt
- `module.json` und Registry-Beispiel ergänzt
- Datenbankartefakte in den Modulbereich `database/` verschoben
- v0.4.0 als Standalone-Integrationsansatz abgelöst

## 0.4.0 · 2026-08-24

- erste ausführbare MariaDB-DDL für NeuroHome
- provisorisches `nh_` durch DEV-Bereichscode `NHO_` ersetzt
- Schema-Migrationsledger mit SHA-256-Prüfung ergänzt
- Kataloge, Methoden und Freiflug als idempotente Seeds ergänzt
- PHP-CLI-Runner und technische Verifikation ergänzt
- PROD-Sperre bis zur formalen Präfixregistrierung dokumentiert
