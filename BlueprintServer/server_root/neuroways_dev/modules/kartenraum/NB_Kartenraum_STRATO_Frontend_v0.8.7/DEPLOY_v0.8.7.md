# Room of Cards Frontend v0.8.7

Fix:
- Profileinstellungen laufen jetzt innerhalb derselben App-IIFE wie Login, Journal und Karten.
- Sie verwenden die vorhandenen get()/post()-API-Helfer.
- Authorization nutzt dieselbe `state.session_token` wie der restliche Kartenraum.
- Beim Öffnen des Einstellungsdialogs werden Werte vom Backend geladen.
- Beim Umschalten werden sie über `profile-preferences.php` gespeichert.
- Backend bleibt v0.6.3.
- Keine neue Datenbankmigration.

Test:
1. anmelden
2. Einstellungen öffnen
3. Night → Wonder umschalten
4. Meldung „Im Profil gespeichert.“
5. SQL prüfen: visual_mode=WONDER
6. neu anmelden → Wonder muss wieder geladen werden
