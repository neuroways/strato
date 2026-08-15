# Build Report – TT-DEV-0001-C003-R001

## Zweck

Deployment-Repair für TT-DEV-0001-C003. Ursache war die ursprüngliche Verpackung unter einem zusätzlichen Top-Level-Verzeichnis `TT-DEV-0001-C003/`. R001 liefert die C003-Dateien nun relativ zur bestehenden Repository-Wurzel `htdocs/TT-DEV/`.

## Lokale Prüfungen

- PHP Runtime: 8.4.23 CLI
- PHP Syntaxprüfung: erfolgreich für alle enthaltenen PHP-Dateien
- Backend-Testlauf: 3 bestanden, 0 fehlgeschlagen
- Reale STRATO-MariaDB-Verbindung: nicht Bestandteil dieses lokalen Build-Tests

## Sicherheitsentscheidung

- `.env` wird nicht ausgeliefert.
- Nur `.env.example` ist enthalten.
- Zugangsdaten müssen auf dem Zielsystem gepflegt werden.

## Deployment-Ziel

Direkt nach `htdocs/TT-DEV/` entpacken. Kein weiterer Unterordner ist vorgesehen.
