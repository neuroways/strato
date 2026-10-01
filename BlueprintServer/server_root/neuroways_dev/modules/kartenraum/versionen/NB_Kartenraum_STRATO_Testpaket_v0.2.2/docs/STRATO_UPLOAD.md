# STRATO Upload – v0.2.2

## Empfohlener Testpfad

Nutze einen neuen, isolierten DEV-Ordner, z. B.:

`/neuroways-dev/kartenraum-preview/`

Der Inhalt dieses ZIPs kommt direkt in diesen Ordner.

## Danach prüfen

1. `index.html` aufrufen.
2. `health.php` aufrufen.
3. `status.php` aufrufen.
4. Die Original-Sheets in `../cards/` hochladen.
5. `status.php` neu laden.
6. Sobald alle Pflicht-Sheets „bereit“ zeigen, im Kartenraum mehrere Karten aus jeder Gruppe testen.

## Erwartetes Verhalten

- Das komplette 1:1-Sheet darf nie sichtbar sein.
- Jede Illustration bleibt 2:3.
- Positionen 1–6 müssen korrekt dem 3×2-Raster folgen.
- Keine Platzhalterkarte darf im 78er-Register auftauchen.
- SheetA-2 ist für Große Arkana 0–V aktiv.
- SheetA-1 ist optional und wird nicht produktiv verwendet.
- SheetR liefert nur die Rückseite.
- Rahmen liegt separat über der Illustration.

## Keine produktiven Änderungen

Dieses Paket besitzt:
- keine DB-Schreiblogik,
- keine Credentials,
- keine produktive Benutzerverwaltung,
- keine automatische Änderung anderer NeuroWays-Dateien.
