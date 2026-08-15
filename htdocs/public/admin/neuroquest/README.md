# NeuroQuest Admin Dashboard v0.1.0

Dieses Paket wird in die bestehende langfristige NeuroWays-Struktur kopiert.

## Zielstruktur

```text
NeuroWays_Langfristige_Backend_Struktur/
├── config/
│   └── config.php
├── public/
│   └── admin/
├── api/
│   ├── index.php
│   ├── bootstrap/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   └── domain/
└── docs/
```

## Einfügen

Den Inhalt dieses ZIP-Pakets direkt in den Ordner

```text
NeuroWays_Langfristige_Backend_Struktur/
```

kopieren. Vorhandene Ordner werden ergänzt.

Die vorhandene Datei

```text
config/config.php
```

wird nicht ersetzt.

## Aufruf

Wenn das Projekt direkt unter `htdocs` liegt:

```text
https://DEINE-DOMAIN/public/admin/
```

Wenn der Projektordner unter `htdocs/neuroways` liegt:

```text
https://DEINE-DOMAIN/neuroways/public/admin/
```

## Sicherheit der ersten Version

Das Dashboard ist nur aktiv, wenn in `config/config.php` gilt:

```php
'application' => [
    'environment' => 'development',
    'debug' => true,
],
```

In `production` verweigert die API den Zugriff, bis eine echte Admin-Anmeldung ergänzt wurde.

## Funktionsumfang

- echte MariaDB-Verbindungsprüfung
- Antwortzeit
- MariaDB-Version
- Datenbankgröße
- Anzahl der Tabellen
- Datensatzanzahl je Tabelle
- automatische Erkennung möglicher Story-/Quest-Tabellen
- Summe möglicher Geschichten
- freundliche Fehleranzeige
- ausschließlich lesende SQL-Abfragen
- keine Anzeige von Benutzername oder Passwort
