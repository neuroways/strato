# TT-DEV-0002-C001 – Composer Foundation

Deployment-Ziel: `htdocs/TT-DEV/`.

Dieses inkrementelle Artefakt ergänzt die bestehende Backend-Basis um die Composer-Paketdefinition und PSR-4-Autoload-Konfiguration. Es installiert bewusst noch keine Drittanbieter-Pakete und enthält keinen `vendor/`-Ordner.

## Dateien
- `backend/composer.json`
- `backend/tests/Foundation/ComposerConfigurationTest.php`
- `backend/tests/run-c001.php`

## Zielprüfung auf STRATO
Nach dem Entpacken muss der bereits verifizierte Entry-Point weiterhin funktionieren:
`http://tennis.flowisaurus.de/backend/public/index.php`

Composer selbst muss für C001 auf STRATO noch nicht ausgeführt werden. Die bestehende Bootstrap-Autoloading-Logik bleibt unverändert, damit der laufende Stand nicht gebrochen wird.
