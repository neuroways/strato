NeuroQuest DB-UI-Integration v0.3.4

Problem:
Die bisherige Oberfläche erwartete von api/story.php eine komplette Geschichte
mit data.days. Die API liefert inzwischen korrekt genau ein Datenbankfragment.
Darum verwarf app.js die erfolgreiche Datenbankantwort und lud immer
default-story.json. Die Anzeige lautete deshalb „Standardgeschichte“.

Ersetzen:
1. htdocs/neuroquest_ai/app/assets/app.js
2. htdocs/neuroquest_ai/app/index.html
3. htdocs/neuroquest_ai/app/service-worker.js

Danach öffnen:
https://flowisaurus.de/neuroquest_ai/app/?v=034

Test:
- Tag 1 auswählen
- Mission 1 absolvieren
- „Geschichte entdecken“
- Unten muss „Datenbankgeschichte“ stehen.
- Der Text muss mit „Caspar legte den Stift ...“ beginnen.

Tagesabschluss:
Beim Tagesabschluss lädt die Anwendung Mission 1–5 aus MariaDB.
Fehlt ein einzelner Teil, wird nur für diesen Teil die lokale Standardgeschichte verwendet.
