# NB Kartenraum Backend v0.6.1

Neu:
- Profil erstellen (`profile-create.php`)
- Login mit Nutzername + Code (`login.php`)
- Session-Token (30 Tage)
- Ziehung serverseitig speichern (`draw-create.php`)
- UPRIGHT / REVERSED
- `drawn_at` automatisch in MariaDB
- Wahrnehmung speichern (`perception-save.php`)
- persönliches Journal lesen (`journal.php`)
- Rate-Limit: 10 fehlgeschlagene Loginversuche / 15 Minuten je Nutzer/IP

Zugangscode:
- wird nur einmal an den Nutzer ausgegeben
- wird in DB ausschließlich gehasht gespeichert
- kann nicht wiederhergestellt werden


## v0.6.1
- persistentes Erfahrungstagebuch pro Ziehung
- `experience-save.php`
- `experience-list.php`
- serverseitige Eigentumsprüfung jeder `draw_id`
- `reflection_question` und `everyday_moment` in Knowledge API
- Health prüft `nb_card_experience`
- Migration unter `database/migrations/060_card_experience.sql`


## v0.6.1
- zentrales Journalmodell `nb_card_journal_entry`
- `journal-entry-save.php`
- `journal-entry-list.php`
- Eintragstypen: Gedanke, Erkenntnis, Frage, Ziel, Erfahrung
- optionale Zuordnung zu einer Vertiefung
- bestehende `nb_card_experience`-Daten werden migriert
- alte Experience-API bleibt vorerst kompatibel
- serverseitige Eigentumsprüfung jeder Ziehung

## v0.6.2
- Journaleinträge bearbeiten
- Journaleinträge löschen
- serverseitiger Logout widerruft das aktuelle Session-Token
- Eigentumsprüfung für Update/Delete
