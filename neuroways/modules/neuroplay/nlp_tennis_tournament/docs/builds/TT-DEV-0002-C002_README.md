# TT-DEV-0002-C002 – Composer Autoload Integration

## Zweck

Integriert den in C001 definierten Composer-/PSR-4-Autoloader in den Backend-Bootstrap, ohne den auf STRATO bereits bestätigten lauffähigen Stand zu unterbrechen.

## Verhalten

`backend/bootstrap.php` verwendet `backend/vendor/autoload.php`, sobald dieser durch `composer install` vorhanden ist. Solange Composer auf der Zielumgebung noch nicht ausgeführt wurde, bleibt ein klar markierter PSR-4-kompatibler Fallback aktiv.

Damit ist C002 migrationssicher: Der bestehende HTTP-/PHP-/MariaDB-Pfad bleibt lauffähig, während Composer schrittweise produktiv eingeführt wird.

## Deployment

ZIP direkt in `htdocs/TT-DEV/` entpacken. Danach den bestehenden Backend-Endpunkt erneut aufrufen:

`http://tennis.flowisaurus.de/backend/public/index.php`

Erwartung: Gesamtstatus und Datenbankstatus bleiben `ok`.
