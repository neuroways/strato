# STRATO Upload – sichere Verwendung dieses Pakets

## Jetzt empfohlen: Pilotmodus

1. ZIP auf den STRATO-Webspace hochladen.
2. ZIP in einen eigenen Ordner entpacken.
3. **Nicht** sofort bestehende `config/`, `neuroways_dev/` oder `neuroways/` überschreiben.
4. Im entpackten Paket `server_root/` öffnen.
5. Den Baum mit dem realen Serverbestand vergleichen.
6. Erst nach Abnahme wird eine direkte Root-Scaffold-/Migrationsfassung erzeugt.

## Warum so?

Der bestehende Tennis-/NeuroWays-Stand soll weiterlaufen. Dieses Paket definiert zunächst die Zielstruktur und dokumentiert jeden Ordner. Es enthält bewusst nur `.example`-Dateien für Webserver-/Config-Bausteine und keine Secrets.

## Ziel nach Abnahme

Nach dem Review kann eine Root-Deployment-ZIP erzeugt werden, deren Inhalt direkt im STRATO-Webspace entpackt wird. Die Migrationsfassung muss vorher prüfen:

- bestehende Dateien
- Pfadkonflikte
- aktive Domains/Subdomains
- bestehende `.htaccess`
- zentrale `/config/database.php`
- DEV-/PRO-Datenbanken
- aktuelle Tennis-Pfade

**Keine bestehende Datei wird ohne explizite Migrationsentscheidung überschrieben.**
