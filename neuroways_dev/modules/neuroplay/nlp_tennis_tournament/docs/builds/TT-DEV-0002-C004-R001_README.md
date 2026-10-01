# TT-DEV-0002-C004-R001 – Shared Config Integration

## Ziel

Die Datenbank-Konfiguration wird für STRATO aus einem gemeinsamen `config/`-Verzeichnis
geladen, das auf derselben Ebene wie `neuroways_dev/` und `neuroways/` liegt.

Zielbild:

```text
STRATO_ROOT/
├── config/
│   └── database.php
├── neuroways_dev/
└── neuroways/
```

Für lokale Entwicklung bleibt `.env` als Fallback erhalten.

## Priorität

1. `NW_SHARED_CONFIG_DIR` (optional, expliziter Pfad)
2. automatisch erkanntes `<STRATO_ROOT>/config`
3. lokale `.env`

## Erwartete STRATO-Datei

`<STRATO_ROOT>/config/database.php`

Sie muss ein PHP-Array zurückgeben. Ein Beispiel liegt unter:

`docs/builds/database.php.example`

Die echte Datei mit Zugangsdaten gehört **nicht** in Git.

## Integration

Dieses ZIP ist relativ zu:

`neuroways_dev/modules/neuroplay/nlp_tennis_tournament/`

aufgebaut.

## Lokale Prüfung

```bash
php backend/tests/run-c004-r001.php
```

## STRATO-Prüfung

```text
http://tennis.flowisaurus.de/backend/tests/shared-config-status.php
```

Danach erneut:

```text
http://tennis.flowisaurus.de/backend/public/index.php
```

Erwartet: DB `status: ok`.
