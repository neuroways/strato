# TT-DEV-0002-C003-R001 – Repository Path Repair

## Ziel

Dieses Repair-Artefakt integriert TT-DEV-0002-C003 in den neuen führenden DEV-Repository-Pfad:

`neuroways_dev/modules/neuroplay/nlp_tennis_tournament/`

Das ZIP ist **direkt relativ zu diesem Projektroot** aufgebaut. Es darf dort entpackt werden; es
erzeugt keinen zusätzlichen `nlp_tennis_tournament/`-Unterordner.

## Enthalten

- `.gitignore` mit Schutz für `.env`
- `.env.example` ohne Zugangsdaten
- aktualisiertes `backend/composer.json`
- `backend/tests/composer-status.php`
- `backend/tests/Foundation/ComposerReproducibilityTest.php`
- `backend/tests/run-c003.php`
- Build-/Manifestinformationen

## Nicht enthalten

- `.env`
- Zugangsdaten
- `vendor/`
- `composer.lock`

`vendor/` und `composer.lock` dürfen erst als vorhanden gelten, nachdem Composer real ausgeführt wurde.

## Wichtiger Git-Schritt

Im hochgeladenen Ausgangsstand existiert bereits eine `.env`. Dieses Repair-ZIP löscht sie bewusst
nicht, da die Server-/Laufzeitkonfiguration erhalten bleiben soll.

Vor dem Push muss geprüft werden, ob `.env` bereits von Git verfolgt wird. Falls ja, muss sie aus dem
Git-Index entfernt werden, ohne die lokale Datei zu löschen:

`git rm --cached .env`

Danach `.gitignore` committen.

## Verifikation nach Integration

Lokal bzw. auf einer PHP-fähigen Umgebung:

`php backend/tests/run-c003.php`

Auf DEV/STRATO kann zusätzlich aufgerufen werden:

`backend/tests/composer-status.php`

Solange `composer.lock` bzw. `vendor/autoload.php` fehlen, ist dort `status: pending` korrekt.
