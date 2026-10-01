# TT-DEV-0001-C003-T001 – Strato MariaDB Integrationstest

## Zweck

Dieses Testartefakt prüft die bereits in TT-DEV-0001-C003 bereitgestellte PDO-/MariaDB-Foundation auf der realen Strato-Zielumgebung.

Der Test liest die vorhandene `.env`, baut über `backend/config/database.php` eine PDO-Verbindung auf und führt den vorhandenen `DatabaseHealthCheck` (`SELECT 1 AS ok`) aus.

## Voraussetzungen

Die folgenden Dateien aus C003 müssen bereits unter `htdocs/TT-DEV/` vorhanden sein:

- `.env` mit echten Strato-DB-Zugangsdaten
- `backend/config/database.php`
- `backend/src/Infrastructure/Config/Env.php`
- `backend/src/Infrastructure/Config/Configuration.php`
- `backend/src/Infrastructure/Persistence/PDO/Connection/DatabaseConnection.php`
- `backend/src/Infrastructure/Health/DatabaseHealthCheck.php`

## Installation

ZIP direkt nach `htdocs/TT-DEV/` entpacken. Danach müssen zusätzlich vorhanden sein:

- `htdocs/TT-DEV/dev/db-health.php`
- `htdocs/TT-DEV/scripts/test-db-connection.php`

## Web-Test

Im Browser aufrufen:

`https://<deine-domain>/TT-DEV/dev/db-health.php`

Erwartetes Ergebnis bei erfolgreicher Verbindung:

```json
{
  "test": "TT-DEV-0001-C003-T001",
  "status": "ok",
  "database": "mariadb",
  "latency_ms": 12.34,
  "message": null,
  "pdo_mysql_loaded": true
}
```

HTTP-Status: `200`.

Bei fehlgeschlagener DB-Verbindung wird HTTP `503` zurückgegeben. Bei einem Bootstrap-/Dateifehler wird HTTP `500` zurückgegeben.

## Sicherheitsregel

Der Test gibt **niemals DB-Benutzername oder DB-Passwort** aus. `APP_DEBUG` sollte auf einer öffentlich erreichbaren Umgebung auf `false` stehen, damit Bootstrap-Details nicht im Browser erscheinen.

Nach erfolgreicher Prüfung kann `dev/db-health.php` bis zur Integration des regulären Development Dashboards bestehen bleiben oder später durch den vorgesehenen Health-Endpunkt ersetzt werden.

## Abnahme

T001 gilt erst als **auf Strato bestanden**, wenn der reale Browser- oder CLI-Aufruf `status: ok` liefert. Die lokale Syntaxprüfung dieses Pakets ersetzt diesen Zielumgebungstest nicht.
