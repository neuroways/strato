# NB Kartenraum Backend v0.5.0

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
