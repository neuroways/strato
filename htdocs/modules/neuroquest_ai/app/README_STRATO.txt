NEUROQUEST – DIREKTUPLOAD FÜR STRATO
Version 0.2.0

1. ZIP entpacken.
2. Den INHALT dieses Ordners in dein Zielverzeichnis bei STRATO hochladen,
   zum Beispiel: htdocs/neuroquest/
3. Danach öffnen:
   https://DEINE-DOMAIN.DE/neuroquest/

Die Anwendung funktioniert sofort mit der lokalen Standardgeschichte.
Es ist kein npm, kein Build und kein Terminal notwendig.

DATENBANK OPTIONAL AKTIVIEREN
1. config/config.example.php kopieren und in config/config.php umbenennen.
2. Zugangsdaten eintragen und enabled auf true setzen.
3. database/001_create_nq_stories.sql in phpMyAdmin ausführen.
4. Die Tabelle kann später eine Geschichte als JSON speichern.

TESTS
- API/PHP: /neuroquest/api/health.php
- Geschichte: /neuroquest/api/story.php

FALLBACK
Wenn Konfiguration, Datenbank oder Datensatz fehlen, liefert api/story.php automatisch
die Datei data/default-story.json. Das Kind sieht keine Fehlermeldung.

SICHERHEIT
- config/.htaccess sperrt den direkten Webzugriff auf Zugangsdaten.
- Die echte config.php niemals weitergeben oder in öffentliche Repositories laden.
