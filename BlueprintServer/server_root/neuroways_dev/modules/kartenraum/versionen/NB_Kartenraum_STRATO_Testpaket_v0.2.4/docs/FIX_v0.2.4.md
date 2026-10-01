# Fix v0.2.4

## Ursache

Der Kartenrenderer in `app.js` verwendete weiterhin:

`assets/cards/<Sheet>.png`

Dadurch suchte die Anwendung die Sheets innerhalb des Versionsordners.

## Korrektur

Der Renderer verwendet jetzt:

`../cards/<Sheet>.png`

Damit greift jede Kartenraum-Version auf den gemeinsamen Ordner zu:

`/modules/kartenraum/cards/`

Betroffen waren:
- Frontseiten-Sheet
- Rückseiten-Sheet
- Image-Probe zur Fehlererkennung

`status.php` verwendete den gemeinsamen Ordner bereits korrekt.
