# NeuroHome STRATO Module v0.4.1

Zentral integrierte Modulgrundlage für NeuroHome. Das Paket gehört auf dieselbe
Ebene wie Kartenraum und verwendet die bereits vorhandene NeuroWays-Runtime und
Plattform-Datenbank.

## Einordnung

```text
/config/database.php
/modules/
  ├── kartenraum/
  └── neurohome/
      └── NHO_NeuroHome_STRATO_Module_v0.4.1/
```

NeuroHome bringt **keine eigene Datenbankkonfiguration** mit. Der Bridge-Code
`backend/bootstrap/database.php` löst ausschließlich die zentrale Connection
`platform` auf. Zugangsdaten bleiben außerhalb des Modulpakets.

## Enthalten

- `module.json`: versionierter Modulvertrag
- `registry/installed-module.example.json`: getrennte Installation/Aktivierung
- `backend/bootstrap/database.php`: Adapter zur zentralen Plattformverbindung
- `database/migrations/`: fünf additive Migrationen mit 41 `NHO_`-Tabellen
- `database/bin/`: CLI-Migration und technische Verifikation
- `database/sql/`: Schema- und Küchen-Smoke-Test
- `docs/`: Entscheidungen, Quellen und DEV-Abnahme

Die Domäne deckt Häuser, Räume, Möbel, Ablagen, Parkplätze, Chaosschutz- und
Besucherzonen, Kategorien, Gegenstände, TEACCH-Wege, Methoden einschließlich
Freiflug sowie dokumentierte Reset-Sessions und Neubewertungen ab.

## Installationsreihenfolge in DEV

1. Unverändertes Paket nach
   `/modules/neurohome/NHO_NeuroHome_STRATO_Module_v0.4.1/` übertragen.
2. `module.json` durch den zentralen Installer prüfen.
3. Installation in der Registry anlegen, zunächst mit `enabled: false`.
4. Im Modulverzeichnis ausführen:

```bash
NEUROWAYS_ENV=dev php database/bin/migrate.php --dry-run
NEUROWAYS_ENV=dev php database/bin/migrate.php --apply
php database/bin/verify.php
```

5. Küchen-Smoke-Test gegen die Plattform-Datenbank ausführen.
6. Health-Status in der Registry aktualisieren.
7. Das Modul erst danach separat aktivieren.

Wenn das Paket außerhalb der Serverstruktur geprüft wird, darf `NEUROWAYS_ROOT`
auf die lokale NeuroWays-Wurzel zeigen. Die Variable enthält nur einen Pfad und
keine Zugangsdaten.

## Freigabestatus

**DEV CANDIDATE · NICHT AKTIVIERT**

Die zentrale Struktur und Datenbankanbindung sind berücksichtigt. Vor PROD
müssen der Bereichscode `NHO`, Rechteprüfung, Backup/Restore, Suchindex-Rebuild
und Küchenpilot bestätigt sein. Eine vorhandene Route allein erteilt keine
Berechtigung.

## Ablösung

v0.4.1 ersetzt den Standalone-Integrationsansatz aus v0.4.0. Die fachliche DDL
bleibt erhalten; lokale `NEUROHOME_DB_*`-Zugangsdaten und eine zweite
Konfigurationsquelle wurden entfernt.
