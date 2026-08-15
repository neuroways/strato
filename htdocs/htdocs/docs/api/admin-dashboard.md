# Admin Dashboard API

## Route

```text
GET api/index.php?route=admin/dashboard
```

## Zweck

Liefert ausschließlich lesende technische und fachliche Kennzahlen:

- Verbindungsstatus
- MariaDB-Version
- Zeichensatz
- Antwortzeit
- Tabellenzahl
- Datenbankgröße
- Datensatzanzahl je Tabelle
- namensbasierte Erkennung von NeuroQuest-Inhalten

## Sicherheit

Version 0.1.0 ist nur aktiv, wenn:

```php
'application' => [
    'environment' => 'development',
    'debug' => true,
],
```

Für den Produktivbetrieb ist eine echte Admin-Authentifizierung erforderlich.
