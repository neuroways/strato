# NB Kartenraum Frontend v0.5.3

Fix gegenüber v0.5.2:

- Login- und Profil-Buttons werden jetzt explizit über `document.getElementById()` gebunden.
- Keine Namenskollision mehr zwischen DOM-IDs und JavaScript-Funktionen.
- Profil erstellen, Login, Zugang kopieren und Bestätigung verwenden getrennte Handlernamen.
- Backend bleibt unverändert v0.5.0.

Der Fehler in v0.5.2 lag ausschließlich im Frontend-Event-Binding.
