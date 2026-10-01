# TT-FRONTEND-0002-C001 – Public Tournament View Model API

## Ziel

Erster fachlicher Read Slice für die öffentliche Turnierstartseite.

```text
TT_TOURNAMENT + TT_LOCATION
→ PublicTournamentRepository
→ PublicTournamentService
→ PublicTournamentViewModel
→ /backend/public/api/public/tournament.php
```

React erhält nur das fertige View Model; Status- und Primary-Action-Logik liegen serverseitig.

## Lokaler Test

```bash
php backend/tests/run-frontend-0002-c001.php
```

## STRATO-Test

```text
http://tennis.flowisaurus.de/backend/public/api/public/tournament.php
```

Falls kein Turnierdatensatz vorhanden ist, ist `404 tournament_not_found` korrekt.
