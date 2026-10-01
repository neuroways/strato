# Quellennachweis v0.4.0

| Quelle | Verwendeter Abschnitt | Entscheidung für v0.4.0 |
|---|---|---|
| NeuroHome Technical Foundation v0.3.0 | Namenskonventionen, Tabellenfamilien, APIs, Sessions, Suche | fachlicher und technischer Ausgangspunkt; provisorisches `nh_` nicht übernommen |
| NW-STD-001 Naming Standard aus dem NeuroWays-Quellcode-Export | Bereichscodes; Tabellen; Felder; Business Codes | `NHO_` + pluralisierte Großschreibung; englisches `snake_case`; `created_at`/`updated_at` |
| NW-SOURCE-REGISTER-001 v1.2.0 | Migrationsreihenfolge; Löschsperren; offene Kennungskollisionen | keine Quelle verändert oder gelöscht; Paket bleibt eigenständiges DEV-Artefakt |
| NW-MIGRATION-001 v0.2.0 | Präfixevidenz; technische Snapshots; Freigaberegel | eigene Präfixentscheidung dokumentiert; keine rückwirkende Bestandsumbenennung |
| NW-CTRL-001 v1.1.0 | Version First; Source of Truth; Freigabegrenzen; Next Step | ausführbares Ergebnis, klare Prüfkriterien und sichtbare PROD-Blockade |

## Geltungsgrenze

Die Quellen begründen Struktur und Entwicklungsregeln. Sie bestätigen den neuen Bereichscode `NHO` noch nicht formal. Diese Bestätigung bleibt eine bewusste Registry-Aufgabe vor PROD.
