# NeuroQuest – Datenbankkonfiguration und Verbindungstest

## Zielstruktur

```text
neuroquest/
├── bootstrap/
│   └── app.php
├── config/
│   └── database.php
├── src/
│   └── Infrastructure/
│       └── Database/
│           └── Connection.php
└── public/
    ├── .htaccess
    ├── index.php
    └── system/
        └── database-test.php
```

Der Webroot der Domain beziehungsweise Subdomain muss auf `public/` zeigen.

## 1. Zugangsdaten eintragen

Öffne:

```text
config/database.php
```

Ersetze:

```php
'username' => 'YOUR_DATABASE_USERNAME',
'password' => 'YOUR_DATABASE_PASSWORD',
```

Setze außerdem einen langen zufälligen Zugriffsschlüssel:

```php
'access_key' => 'CHANGE_THIS_TO_A_LONG_RANDOM_SECRET',
```

## 2. Dateien hochladen

Lade den gesamten Projektinhalt hoch. Nicht nur den Inhalt von `public/`.

Wichtig:

- `config/` liegt außerhalb des öffentlich erreichbaren Webroots.
- `src/` liegt außerhalb des öffentlich erreichbaren Webroots.
- Nur `public/` wird über die Domain ausgeliefert.

## 3. Verbindung testen

Rufe folgende Adresse auf:

```text
https://DEINE-DOMAIN/system/database-test.php?key=DEIN_GEHEIMER_SCHLUESSEL
```

Die Seite zeigt:

- Verbindungsstatus
- Datenbankname
- Datenbankserver-Version
- Antwortzeit

Sie zeigt niemals das Passwort oder den Datenbankbenutzernamen.

## 4. Testseite wieder deaktivieren

Nach erfolgreichem Test:

```php
'connection_test' => [
    'enabled' => false,
    'access_key' => '...',
],
```

Alternativ kann `public/system/database-test.php` gelöscht werden.

## Fehlerdiagnose

Die öffentliche Seite zeigt absichtlich keine technischen Zugangsdaten oder vollständigen
Fehlermeldungen. Technische Fehler werden über `error_log()` in das PHP-Fehlerprotokoll
des Hostings geschrieben.

Häufige Ursachen:

- falscher Benutzername
- falsches Passwort
- Datenbankname verwechselt
- Datenbankbenutzer besitzt keine Rechte
- PDO-MySQL-Erweiterung fehlt
- Hostname oder Port falsch
