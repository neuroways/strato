# TT-DEV-0001-C003-R001 – C003 Deployment Repair

Zweck: Korrigiert die Deployment-Struktur von TT-DEV-0001-C003 für die bestehende Installation unter `htdocs/TT-DEV/`.

## Wichtig

Dieses ZIP besitzt **keinen zusätzlichen Projekt-Ordner**. Beim Entpacken direkt in `htdocs/TT-DEV/` entstehen bzw. werden ergänzt:

- `.env.example`
- `backend/config/database.php`
- `backend/src/Infrastructure/Config/Env.php`
- `backend/src/Infrastructure/Config/Configuration.php`
- `backend/src/Infrastructure/Persistence/PDO/Connection/DatabaseConnection.php`
- `backend/src/Infrastructure/Health/DatabaseHealthCheck.php`
- die zugehörigen Backend-Tests

Eine echte `.env` wird bewusst **nicht** mitgeliefert, damit keine Zugangsdaten in Build-Artefakten landen.

## Nach Deployment

1. ZIP direkt in `htdocs/TT-DEV/` entpacken.
2. Prüfen, ob die oben genannten Dateien vorhanden sind.
3. Falls noch nicht vorhanden: `.env.example` nach `.env` kopieren und die echten STRATO-DB-Daten ausschließlich serverseitig eintragen.
4. Danach erneut aufrufen: `https://tennis.flowisaurus.de/dev/php-pdo-diagnostic.php`

Erwartung: Die Dateichecks wechseln auf `ok`. Danach kann T002 bis zum echten MariaDB-Verbindungstest fortfahren.
