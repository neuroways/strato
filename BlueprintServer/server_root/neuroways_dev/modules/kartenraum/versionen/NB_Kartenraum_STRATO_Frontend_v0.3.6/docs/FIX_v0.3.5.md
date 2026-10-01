# Fix v0.3.5

## Ursache
v0.3.4 verwendete im neuen HTML/JS die Klassen:
- `.card-shell`
- `.card-flip`
- `.sheet-crop`
- `.back-face`
- `.revealed`

Das mitgeführte CSS enthielt teilweise noch die alten Klassen:
- `.card`
- `.flip`
- `.crop`
- `.back`
- `.rev`

Dadurch fehlten Größe und Transformationslogik des Kartenrenderers.

## Korrektur
v0.3.5 definiert den Kartenrenderer wieder vollständig und konsistent.
Backend, MariaDB, Sheet-Mapping und zentrale Kartenassets wurden nicht verändert.
