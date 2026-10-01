# TT-DEV-0002-C004-R003 – Named Shared Database Connection Integration

## Ziel

Die gemeinsame STRATO-Datei `config/database.php` enthält mehrere benannte
Datenbankprofile. Die Tennisturnier-App verwendet standardmäßig das Profil `platform`.

Unterstütztes Zielbild:

```text
STRATO_ROOT/
├── config/
│   └── database.php
├── neuroways_dev/
└── neuroways/
```

Die hochgeladene Beispielstruktur enthält Profile wie `platform`, `knowledge` und `courses`.

## Auswahl der Verbindung

Standard:

`DB_CONNECTION=platform`

Falls `DB_CONNECTION` nicht gesetzt ist, wird automatisch `platform` verwendet.

Andere Module können denselben Loader nutzen und lediglich einen anderen Connection-Key
verwenden.

## Lokale Entwicklung

Falls das gemeinsame STRATO-Config-Profil nicht verfügbar ist, bleibt die bestehende
`.env`-Konfiguration als Fallback erhalten.

## Sicherheit

Die Anwendung gibt keine Zugangsdaten aus. Die echte `config/database.php` bleibt außerhalb
von Git.

## Integration

ZIP direkt in:

`neuroways_dev/modules/neuroplay/nlp_tennis_tournament/`

integrieren.

## Tests

Lokal:

```bash
php backend/tests/run-c004-r003.php
```

STRATO:

```text
http://tennis.flowisaurus.de/backend/tests/named-shared-database-status.php
```

Danach normaler Backend-Test:

```text
http://tennis.flowisaurus.de/backend/public/index.php
```

Ziel: `database.status = ok` und Gesamtstatus `ok`.
