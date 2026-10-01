# NB Kartenraum Backend v0.3.3

Read-only Kartenraum-Backend für die NeuroWays-Architektur.

- zentrale Konfiguration ausschließlich über `/config/database.php`
- keine lokale `config/` im Modul
- keine Zugangsdaten im Modul
- Connection-Key derzeit: `platform`
- 78 Karten / 156 Texte
- ADULT/de 78 / CHILD/de 78

Falls die beiden `nb_*` Tabellen nicht in der zentralen Verbindung `platform` liegen,
wird nur der Connection-Key in `api/bootstrap.php` angepasst.
