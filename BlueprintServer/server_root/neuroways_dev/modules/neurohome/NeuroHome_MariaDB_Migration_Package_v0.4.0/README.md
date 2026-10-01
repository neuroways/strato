# NeuroHome MariaDB Migration Package v0.4.0

Ausführbares DEV-Migrationspaket für NeuroHome auf PHP 8.4 und MariaDB.

## Freigabestatus

**DEV READY · PROD BLOCKED**

Der technische Bereichscode `NHO` erfüllt das veröffentlichte dreistellige NeuroWays-Namensschema. Er ist jedoch noch nicht als neuer Bereichscode im zentralen Registry-Verfahren bestätigt. Das Paket darf deshalb in DEV installiert und getestet, aber noch nicht produktiv eingesetzt werden.

## Ergebnis

Das Paket legt eine getrennte NeuroHome-Domäne an für:

- Haushalte und Berechtigungszuordnungen
- Ortsnetz von Zuhause bis Lagerort
- Möbel, Ablagen, Zonen und Raumfunktionen
- Kategorien, Gegenstände und Zielorte
- TEACCH-orientierte Hol-, Nutzungs- und Rückwege
- Methoden einschließlich Freiflug
- Check-in, Rahmen, Begleitung und Abschluss
- zeitbezogene Beobachtungen und sichtbaren Fortschritt
- erneuerbare Suche und Projektionsqueue

## Voraussetzungen

- PHP 8.4 mit `pdo_mysql`
- MariaDB mit InnoDB und `utf8mb4`
- ein leerer oder vorhandener DEV-Datenbankkontext
- Datenbankkonto mit `CREATE`, `ALTER`, `INDEX`, `INSERT`, `SELECT`, `UPDATE` und `DELETE`
- Backup und Restore-Test vor jedem späteren PROD-Lauf

## Konfiguration

Umgebungsvariablen setzen:

```bash
export NEUROHOME_DB_DSN='mysql:host=localhost;dbname=neuroways_dev;charset=utf8mb4'
export NEUROHOME_DB_USER='...'
export NEUROHOME_DB_PASSWORD='...'
```

Alternativ `config/database.example.php` nach `config/database.local.php` kopieren und nur lokal befüllen. `database.local.php` darf nicht versioniert oder ausgeliefert werden.

## Ausführen

Status anzeigen:

```bash
php bin/migrate.php --status
```

Ausstehende Migrationen nur anzeigen:

```bash
php bin/migrate.php --dry-run
```

Migrationen anwenden:

```bash
php bin/migrate.php --apply
```

Schema und Seeds prüfen:

```bash
php bin/verify.php
```

Zusätzliche SQL-Prüfung:

```bash
mysql --default-character-set=utf8mb4 -u USER -p DATABASE < sql/verify_schema.sql
```

## Reihenfolge

1. `0001_foundation.sql`
2. `0002_places_inventory.sql`
3. `0003_activities_methods.sql`
4. `0004_sessions_history_search.sql`
5. `0005_seed_catalogs_methods.sql`

Der Runner sortiert numerisch, sperrt parallele Läufe, protokolliert SHA-256-Prüfsummen und verweigert veränderte bereits angewendete Migrationen.

## Wichtige Grenzen

- MariaDB führt DDL mit impliziten Commits aus. Das Paket behauptet deshalb keinen atomaren Rollback für Schemaänderungen.
- Migrationen sind vorwärtsgerichtet und additiv. Korrekturen erhalten eine neue Migrationsdatei.
- UUIDv7 werden in der Anwendung erzeugt und als `BINARY(16)` gespeichert. Seed-Identitäten sind feste UUIDv7-Werte.
- Zeitstempel werden in UTC geschrieben; der Runner setzt die Verbindung auf `+00:00`.
- Zielort, letzte Beobachtung und offene Rückbewegung bleiben getrennte Wahrheiten.
- Energie, Befinden und persönliche Wirkung sind standardmäßig privat zu behandeln.
- Keine Fotos in v0.4.0. Dafür ist eine eigene Medien- und Löschspezifikation erforderlich.

## PROD-Freigabegrenzen

Vor PROD müssen alle Punkte erfüllt sein:

1. `NHO` ist formal als NeuroHome-Bereichscode registriert.
2. Berechtigungsprüfungen sind automatisiert getestet.
3. Küchenpilot und vollständiger Suchindex-Rebuild sind bestanden.
4. Backup und Restore wurden in DEV praktisch ausgeführt.
5. Das Hosting bestätigt die eingesetzte MariaDB-Version und FULLTEXT-Unterstützung für InnoDB.

## Nächste Aufgabe

`NH-T03`: Authentifizierungskontext und serverseitige Haushaltsberechtigungen anbinden. Erst danach dürfen echte Haushaltsdaten verwendet werden.
