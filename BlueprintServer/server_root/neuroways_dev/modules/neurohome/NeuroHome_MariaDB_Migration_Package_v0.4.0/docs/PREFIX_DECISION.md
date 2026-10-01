# ADR-009 · NeuroHome-Bereichscode und physische Namen

## Status

Entscheidung für DEV in v0.4.0. Formale Registry-Bestätigung offen.

## Ausgangslage

Die Technical Foundation v0.3.0 verwendete vorläufig Tabellen wie `nh_place`. Der veröffentlichte NeuroWays Naming Standard verlangt dagegen:

- dreistelligen offiziellen Bereichscode
- Großbuchstaben
- pluralisierte Objektnamen
- Schema `<AREA_CODE>_<PLURAL_OBJECT_NAME>`
- englische technische Namen

Die Migrationsmatrix fordert außerdem eine eigene Präfixentscheidung und verbietet rückwirkende Umbenennungen ohne Plan.

## Entscheidung

- Kandidat für den Bereichscode: `NHO`
- physische Tabellen: `NHO_<PLURAL_OBJECT_NAME>`
- Felder: englisches `snake_case`
- Business Codes: Großbuchstaben mit Unterstrichen
- Zeitfelder: `created_at`, `updated_at`, `archived_at`; Bedeutung immer UTC
- technische IDs: anwendungsseitige UUIDv7 als `BINARY(16)`

Beispiele:

| v0.3.0 Entwurfsname | v0.4.0 physischer Name |
|---|---|
| `nh_home` | `NHO_HOMES` |
| `nh_place` | `NHO_PLACES` |
| `nh_home_assignment` | `NHO_HOME_ASSIGNMENTS` |
| `nh_session_action` | `NHO_SESSION_ACTIONS` |
| `nh_search_document` | `NHO_SEARCH_DOCUMENTS` |

## Begründung

`NHO` ist lesbar, eindeutig der NeuroHome-Domäne zuzuordnen und strukturell mit bereits vorgesehenen Domänenpräfixen wie `NPL` und `NFL` vereinbar. `NH` ist nur zweistellig und `nh_` verletzt zusätzlich Großschreibung und Pluralregel.

## Folgen

- v0.4.0 ist kein stilles Fortführen der provisorischen Namen, sondern die erste physische DDL-Fassung.
- Es gibt noch keine produktiven NeuroHome-Tabellen, daher ist keine Bestandsdatenmigration nötig.
- Der Bereichscode muss vor PROD über das zuständige Registry-Verfahren in den Naming Standard aufgenommen werden.
- Falls `NHO` abgelehnt wird, wird dieses DEV-Schema verworfen und vor echten Daten mit einem neuen additiven Paket neu erzeugt.

## Nicht entschieden

- globale NeuroWays-Personen- und Authentifizierungstabellen
- gemeinsame Medienablage
- produktive Modulregistrierung
- endgültige Dokumentkennung im Core-Registry
