# TT-DEV-0002-C004-R006 – PDO 2002 Transport Diagnostic

## Ziel

Dieses Diagnose-Artefakt klassifiziert den verbleibenden MariaDB/PDO-Treiberfehler `2002`
auf STRATO genauer, ohne sensible Daten auszugeben.

## Ausgabe

Die Runtime-Diagnose liefert nur:

- SQLSTATE
- MySQL/PDO-Treiberfehlercode
- Transport-Kategorie
- boolesche Flags für typische Ursachen

Geprüfte Kategorien:

- `connection_refused`
- `network_timeout`
- `host_resolution`
- `network_unreachable`
- `socket_or_path`
- `authentication_or_grant`
- `unknown_database`
- `mysql_transport_2002_unclassified`

## Sicherheit

Nicht ausgegeben werden:

- Hostname
- Datenbankname
- Benutzername
- Passwort
- DSN
- rohe Exception-Nachricht

## Integration

ZIP direkt in:

`neuroways_dev/modules/neuroplay/nlp_tennis_tournament/`

integrieren.

## Lokaler Strukturtest

```bash
php backend/tests/run-c004-r006.php
```

## STRATO-Diagnose

```text
http://tennis.flowisaurus.de/backend/tests/pdo-2002-transport-diagnostic.php
```
