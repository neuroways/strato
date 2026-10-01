# STRATO Update – Backend v0.6.0

1. Datenbank sichern.
2. In phpMyAdmin die Datei `database/migrations/060_card_experience.sql` ausführen.
3. Den Backend-Ordner v0.6.0 hochladen.
4. `/api/health.php` öffnen.
5. Prüfen:
   - `backend_version`: `0.6.0`
   - `experience_table`: `true`
   - Karten/Text/Knowledge-Zähler weiterhin vollständig.
6. Mit einem angemeldeten Testprofil eine vorhandene eigene `draw_id` verwenden:
   - POST `experience-save.php`
   - GET `experience-list.php?draw_id=<ID>`
7. Erst danach das Frontend von localStorage auf diese API umstellen.

Keine Zugangsdaten sind im Paket enthalten. Die zentrale `/config/database.php` bleibt unverändert.
