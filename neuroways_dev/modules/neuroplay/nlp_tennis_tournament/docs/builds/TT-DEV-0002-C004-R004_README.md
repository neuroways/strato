# TT-DEV-0002-C004-R004 – Shared Config Compatibility Adapter

## Ziel

Die benannte Shared-Config-Verbindung wird an die bereits bestehende interne
Konfigurationsstruktur der Backend-Foundation angepasst.

Die bestehende `DatabaseConnection` erwartet Werte unter:

```text
database.host
database.port
database.name
database.username
database.password
database.charset
```

R004 verändert deshalb **nicht** die `DatabaseConnection`, sondern passt ausschließlich
`backend/config/database.php` an.

## Zielstruktur

Die zentrale STRATO-Datei bleibt:

```text
<STRATO_ROOT>/config/database.php
```

mit benannten Profilen wie `platform`, `knowledge` und `courses`.

Das gewählte Profil wird intern auf folgende Struktur abgebildet:

```php
[
    'database' => [
        'host' => ...,
        'name' => ...,
        'username' => ...,
        'password' => ...,
        'charset' => ...,
        'connection' => 'platform',
        'source' => 'shared_config',
    ],
]
```

## Standardverbindung

`platform`

## Integration

ZIP direkt in:

`neuroways_dev/modules/neuroplay/nlp_tennis_tournament/`

integrieren.

## Lokaler Test

```bash
php backend/tests/run-c004-r004.php
```

## STRATO-Test

```text
http://tennis.flowisaurus.de/backend/tests/shared-config-compatibility-status.php
```

Danach:

```text
http://tennis.flowisaurus.de/backend/public/index.php
```

Ziel: `database.status = ok` und Gesamtstatus `ok`.
