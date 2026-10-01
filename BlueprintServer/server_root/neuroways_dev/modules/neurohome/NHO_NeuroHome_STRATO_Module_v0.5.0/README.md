# NeuroHome STRATO Module v0.5.0

Erste öffentlich aufrufbare Modulversion von NeuroHome Reset. Sie verbindet den
mobilen Prototyp mit der zentralen NeuroWays-Modulstruktur. Das enthaltene
Datenbankschema bleibt auf Stand v0.4.1.

## DEV-Ablage

```text
/BlueprintServer/server_root/
├── config/database.php
└── neuroways_dev/modules/neurohome/
    └── NHO_NeuroHome_STRATO_Module_v0.5.0/
        ├── index.html
        ├── app.css
        ├── app.js
        ├── backend/
        ├── database/
        ├── docs/
        └── registry/
```

Öffentliche URL:

```text
https://flowisaurus.com/modules/neurohome/NHO_NeuroHome_STRATO_Module_v0.5.0/
```

Der abschließende Schrägstrich ist empfohlen. Alle Frontend-Dateien verwenden
relative Pfade und funktionieren deshalb direkt im Modulunterordner.

## Bereits nutzbar

- Startseite und vierteiliger Check-in
- genau eine Methodenempfehlung
- Rapid Reset, Insel-Methode, Jagd-Modus, Parkplatz-Methode, Raum-Reset und Sichtbarer Erfolg
- Begleitung mit jeweils nur einem sichtbaren Schritt
- Fertig, Noch eine Runde und Pause
- Abschluss mit Methode, Schrittzahl und Wirkung
- lokale Speicherung des letzten Abschlusses im Browser

## Zentrale Datenbank

NeuroHome enthält keine Zugangsdaten und keine zweite Datenbankkonfiguration.
`backend/bootstrap/database.php` sucht die zentrale
`/BlueprintServer/server_root/config/database.php` und verwendet dort die
Connection `platform`.

Die Migrationen werden nicht automatisch beim Seitenaufruf ausgeführt. Das
Frontend kann daher zunächst gefahrlos ohne DB-Migration getestet werden.

## Schutz

Öffentlich erreichbar sind nur `index.html`, `app.css` und `app.js`. Die
Unterordner `backend`, `database`, `docs` und `registry` werden durch eigene
`.htaccess`-Dateien vor direktem Browserzugriff geschützt.

## Installation

1. v0.5.0 im DEV-Modulbereich entpacken.
2. Prüfen, dass `index.html` direkt im Versionsordner liegt.
3. Die URL mit abschließendem `/` öffnen.
4. Erst danach Registrierung und kontrollierte Datenbankmigration durchführen.

v0.5.0 wird parallel zu v0.4.1 abgelegt. Die ältere immutable Version wird
nicht überschrieben.
