# Integrationsentscheidung v0.4.1

## Verbindlich

NeuroHome ist ein reguläres NeuroWays-Modul auf derselben Ebene wie Kartenraum.

```text
/config/database.php                         zentrale Infrastruktur
/modules/kartenraum/                         bestehendes Geschwistermodul
/modules/neurohome/                          NeuroHome-Modulbereich
  └── NHO_NeuroHome_STRATO_Module_v0.4.1/    immutable Modulversion
```

- Keine eigene Datenbank und keine eigene Zugangskonfiguration.
- Alle `NHO_`-Tabellen liegen in der bereits eingebundenen Plattform-Datenbank.
- Der Zugriff erfolgt ausschließlich über das zentrale Connection Profile `platform`.
- Installation und Aktivierung bleiben getrennte Registry-Vorgänge.
- Die Modulversion ist immutable; Änderungen erhalten eine neue Version.
- Routing, Benutzerkontext und Berechtigungen werden vom Core aufgelöst.

## Korrektur zu v0.4.0

Das frühere Standalone-Setup mit `NEUROHOME_DB_*` und lokaler `database.local.php`
ist verworfen. Die fachliche DDL bleibt erhalten; nur ihr Integrationsvertrag wurde
an die zentrale NeuroWays-Struktur angepasst.
