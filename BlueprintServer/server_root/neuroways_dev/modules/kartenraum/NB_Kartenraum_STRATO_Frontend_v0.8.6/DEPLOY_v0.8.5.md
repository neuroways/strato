# Room of Cards Frontend v0.8.5

Fix:
- eigener, robuster Preference-Controller
- jeder Klick aktualisiert sofort sichtbar den aktiven Schalter
- danach POST an Backend v0.6.3 / profile-preferences.php
- Serverantwort wird zurück in die UI übernommen
- beim Öffnen der Einstellungen werden Präferenzen neu vom Server geladen
- sichtbarer Haken bei aktiver Auswahl
- klare Fehlermeldung falls Backend/DB nicht bereit ist

Backend: v0.6.3
DB-Migration 063_profile_preferences.sql muss ausgeführt sein.
