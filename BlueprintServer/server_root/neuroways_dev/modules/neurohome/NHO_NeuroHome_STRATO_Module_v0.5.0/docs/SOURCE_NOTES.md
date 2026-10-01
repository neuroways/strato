# Quellennachweis v0.4.1

| Quelle | Verwendeter Abschnitt | Entscheidung für v0.4.1 |
|---|---|---|
| NeuroHome Technical Foundation v0.3.0 | Namenskonventionen, Tabellenfamilien, APIs, Sessions, Suche | fachlicher und technischer Ausgangspunkt; provisorisches `nh_` nicht übernommen |
| NW-STD-001 Naming Standard aus dem NeuroWays-Quellcode-Export | Bereichscodes; Tabellen; Felder; Business Codes | `NHO_` + pluralisierte Großschreibung; englisches `snake_case`; `created_at`/`updated_at` |
| NW-SOURCE-REGISTER-001 v1.2.0 | Migrationsreihenfolge; Löschsperren; offene Kennungskollisionen | keine Quelle verändert oder gelöscht; Modul bleibt DEV-Kandidat |
| NW-MIGRATION-001 v0.2.0 | Präfixevidenz; technische Snapshots; Freigaberegel | eigene Präfixentscheidung dokumentiert; keine rückwirkende Bestandsumbenennung |
| NW-CTRL-001 v1.1.0 | Version First; Source of Truth; Freigabegrenzen; Next Step | ausführbares Ergebnis, klare Prüfkriterien und sichtbare PROD-Blockade |
| NW-ARCH-008 STRATO Server Blueprint v0.1.0 | zentrale Config, immutable Module Version, Registry, Installationsstatus | NeuroHome als Geschwistermodul von Kartenraum; zentrale Connection `platform`; keine zweite Config |
| NB Kartenraum STRATO Frontend v0.8.9 | reale Ablage unter `/modules/kartenraum/` | Zielablage `/modules/neurohome/` auf derselben Ebene |

## Geltungsgrenze

Die Quellen begründen Struktur und Entwicklungsregeln. Sie bestätigen den neuen Bereichscode `NHO` noch nicht formal. Diese Bestätigung bleibt eine bewusste Registry-Aufgabe vor PROD.
