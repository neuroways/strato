# TT-DEV-0001-C003-T002 – PHP/PDO Strato Diagnose

## Zweck

T002 diagnostiziert die weiße Ausgabe des vorherigen Datenbank-Healthchecks auf der STRATO-Zielumgebung. Der Test ist bewusst selbstständig aufgebaut, damit er auch dann JSON ausgeben kann, wenn der bestehende Projekt-Bootstrap fehlschlägt.

## Installation

Den Inhalt des ZIPs direkt nach `htdocs/TT-DEV/` entpacken. Es darf kein zusätzliches Verzeichnis `TT-DEV-0001-C003-T002/` auf dem Webspace entstehen.

Danach im Browser aufrufen:

`https://tennis.flowisaurus.de/dev/php-pdo-diagnostic.php`

## Prüfreihenfolge

Der Test prüft nacheinander:

1. PHP-Ausführung und PHP-Version
2. PDO-Erweiterung
3. `pdo_mysql`
4. Vorhandensein und Lesbarkeit der C003-Projektdateien
5. Vorhandensein der `.env`
6. Anwesenheit der erforderlichen DB-Konfigurationsschlüssel, ohne deren Werte auszugeben
7. Laden der C003-PHP-Klassen
8. Laden der Datenbankkonfiguration
9. Aufbau einer realen PDO-Verbindung zur MariaDB

## Sicherheit

Der Browser-Test gibt weder DB-Passwort noch DB-Benutzername aus. Auch Exception-Texte werden absichtlich nicht ausgegeben, weil diese Serverpfade oder weitere interne Informationen enthalten können.

## Erwartete Auswertung

- `status: "ok"`: PHP, PDO, Projekt-Bootstrap und DB-Verbindung funktionieren.
- `pdo_mysql_extension: error`: STRATO-PHP besitzt für diesen Aufruf kein `pdo_mysql`.
- `env_file: error`: `.env` fehlt oder ist nicht lesbar.
- `file_...: error`: C003 wurde nicht vollständig in denselben Repository-Root integriert.
- `database_config_required_values: error`: mindestens eine notwendige DB-Angabe fehlt.
- `database_connection: error`: Bootstrap funktioniert, aber die reale DB-Verbindung scheitert.
- `fatal_error`: PHP bricht auf Serverebene ab; T002 versucht trotzdem eine reduzierte JSON-Diagnose zu liefern.

Nach erfolgreicher Diagnose sollte die Datei aus dem öffentlich erreichbaren `/dev`-Bereich entfernt oder der Dev-Bereich geschützt werden.
