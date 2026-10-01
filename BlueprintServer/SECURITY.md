# Security Baseline

## Harte Regeln

1. Verfügbare Package-Version erzeugt kein Zugriffsrecht.
2. Installed Module erzeugt nur innerhalb seines Instance-/Environment-Kontexts eine Runtime-Zuordnung.
3. Public Route erzeugt kein Zugriffsrecht.
4. Unklarer Instance-/Installation-/Authorization-Kontext → **DENY**.
5. Secrets werden nicht in Module Packages, Git oder öffentliche Ordner geschrieben.
6. DEV und PRO dürfen keine gemeinsamen produktiven Secrets verwenden.
7. Instanzbezogene Uploads, Customizations, Cache und Logs bleiben voneinander getrennt.
8. Module greifen nicht direkt auf fremde Modultabellen zu.
9. Datenbankzugriffe werden über Core Contracts und den aufgelösten Kontext vermittelt.
10. Package-Versionen im verified Store sind immutable.

## Defense in Depth

- Webserver-Grenze
- Runtime-/Instance-Auflösung
- Authentication
- Authorization
- Installation Registry
- Persistence Scope
- Filesystem Scope
- Audit/Logging

Die enthaltenen `.htaccess.example`-Dateien sind absichtlich nicht aktiv. Sie werden erst nach STRATO-Review aktiviert.
