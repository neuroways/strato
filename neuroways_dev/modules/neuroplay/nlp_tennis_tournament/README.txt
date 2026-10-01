TT-KP-APP-FE-LIVE-001

Zweck
-----
Erste echte Frontend-Anbindung an die laufende TT API.

API
---
https://api.tennis.flowisaurus.de/api/v1/tournaments/

Upload
------
ZIP in folgenden Projektordner hochladen:
neuroways_dev/modules/neuroplay/nlp_tennis_tournament/

Dort entpacken.

Enthalten:
frontend/dist/index.html
frontend/dist/app.js
frontend/dist/styles.css

Die Domain tennis.flowisaurus.de zeigt bereits direkt auf frontend/dist/.

Test
----
Nach dem Entpacken öffnen:
https://tennis.flowisaurus.de/

Erwartet:
- "Tennisturnier Neindorf — Ein Tag für alle!"
- Datum 05.09.2026
- Ort Neindorf
- Status "In Vorbereitung"
- API: online

Hinweis
-------
Dies ist die erste serverfertige Live-Ansicht. Sie ist absichtlich klein und ersetzt noch nicht die vollständige React/PWA-Anwendung.
