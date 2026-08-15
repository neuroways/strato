# NeuroWays PWA – Version 0.0.1

Erstes vollständig abgegrenztes Release: Eine installierbare Development-Preview-
Startseite liest Version, Status und Builddatum über `GET /api/app-info` aus MariaDB.

## Voraussetzungen

- STRATO Hosting mit Apache, PHP 8.2 oder neuer und MariaDB
- Eine leere oder bestehende STRATO-Datenbank
- Lokales Node.js nur zum Erzeugen des statischen Frontend-Builds; auf dem Server
  läuft kein Node.js-Prozess

## Installation bei STRATO

1. `database/001_create_app_info.sql` in phpMyAdmin für die gewünschte Datenbank
   importieren.
2. `backend/config/database.example.php` als `backend/config/database.php`
   kopieren und die STRATO-Zugangsdaten eintragen.
3. Im fertigen Deployment-Paket den Inhalt von `public_html/` in das
   Web-Stammverzeichnis hochladen. Alternativ lokal `npm install`, `npm test`
   und `npm run build` ausführen und den Inhalt von `dist/` sowie `api/`,
   `backend/` und die `.htaccess` hochladen.
4. Im hochgeladenen Ordner `backend/config/` die Datei
   `database.example.php` als `database.php` speichern und die
   STRATO-Zugangsdaten eintragen.
5. `https://DEINE-DOMAIN/api/app-info` öffnen. Erwartet wird:

```json
{
  "version": "0.0.1",
  "status": "Development Preview",
  "buildDate": "2026-07-27"
}
```

6. Die Startseite öffnen und kontrollieren, ob dieselben Daten sichtbar sind.

## Schichten

- `src/presentation`: React-Oberfläche
- `src/application`: Anwendungsfall
- `src/domain`: fachliches Datenobjekt
- `src/repository`: REST-Zugriff des Frontends
- `backend/src/Application`: serverseitiger Anwendungsfall
- `backend/src/Domain`: serverseitiges Datenobjekt und Repository-Vertrag
- `backend/src/Repository`: MariaDB-Repository
- `backend/src/Infrastructure`: PDO-Verbindung
- `api`: HTTP-Einstiegspunkt
- `database`: versionierte SQL-Migration

## Sicherheitsnotizen

- Datenbankzugangsdaten werden nicht mitgeliefert und liegen ausschließlich in
  `backend/config/database.php`.
- PDO verwendet echte vorbereitete Statements und deaktiviert emulierte
  Präparation.
- Interne Fehlermeldungen werden protokolliert, aber nicht an den Browser
  ausgegeben.
- Für den produktiven Betrieb sollte der Ordner `backend` nach Möglichkeit
  außerhalb des Document Roots liegen. Die enthaltene `.htaccess` blockiert
  direkten Zugriff als kompatiblen Basisschutz.

## Abnahme Version 0.0.1

- [ ] SQL-Skript wurde in der echten STRATO-MariaDB ausgeführt.
- [ ] API antwortet mit HTTP 200 und den drei Datenbankwerten.
- [ ] Startseite zeigt Version, Status und Builddatum.
- [ ] Bei absichtlich falschen DB-Zugangsdaten zeigt die Seite eine verständliche
      Fehlermeldung und die API keine Interna.
- [ ] Darstellung wurde auf Smartphone, Tablet und Desktop geprüft.
- [ ] Browser bietet die Installation der PWA an.

Version 0.0.1 ist erst freigegeben, wenn alle Punkte auf STRATO bestätigt sind.
