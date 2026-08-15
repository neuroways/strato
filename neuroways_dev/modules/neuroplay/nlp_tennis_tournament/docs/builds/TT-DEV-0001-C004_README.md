# TT-DEV-0001-C004 – Backend Application Bootstrap

Zweck: Der bestehende Backend-Skeleton-Entry-Point wird durch einen echten Application Bootstrap ersetzt.

Das Artefakt wird direkt relativ zu `htdocs/TT-DEV/` entpackt. Es erzeugt keinen zusätzlichen Projektordner.

## Enthalten

- zentraler Backend-Bootstrap mit PSR-4-artigem TT-Autoloader
- Laden der `.env`
- Einbindung der C003-Datenbankkonfiguration
- Erzeugung von DatabaseConnection und DatabaseHealthCheck
- Application-Kernel für Laufzeit-/DB-Status
- JSON-Response-Helfer
- produktionsnaher `backend/public/index.php`
- C004-Testset

## Zieltest auf STRATO

Nach dem Entpacken aufrufen:

`http://tennis.flowisaurus.de/backend/public/index.php`

Erwartung: JSON mit `status: "ok"` und `database.status: "ok"`.

Optional ohne Datenbankabfrage:

`http://tennis.flowisaurus.de/backend/public/index.php?db=0`
