# Changelog

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
