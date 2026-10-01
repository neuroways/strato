# NB Kartenraum Backend v0.3.2

Erster STRATO-fähiger read-only PHP-/MariaDB-Backendstand.

## Enthalten
- vollständiges DB-Paket v0.3.1
- PDO-Verbindung
- Repository-Schicht
- Application Service
- Karten-API
- Content-API mit `audience × language`
- Backend-Healthcheck

## Noch bewusst nicht enthalten
- persönliche Ziehungen
- Erstwahrnehmungen
- Rückblicke
- Journal
- Identity/Auth
- Schreib-API

Damit kann das bestehende Kartenraum-Frontend als nächstes von lokalen JSON-Testdaten auf die MariaDB-API umgestellt werden.
