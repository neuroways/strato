# NW-PLAY-PGC-DB-001
# Persönliche Spielesammlung als versionierte Datentabelle implementieren

**Dokument-ID:** NW-PLAY-PGC-DB-001  
**Titel:** Personal Game Collection Inventory Database Deployment  
**Version:** 0.1.0  
**Datum:** 2026-07-25  
**Status:** Auftrag für vollständige Datenbankimplementierung

---

## Ziel

Führe alle folgenden Schritte vollständig aus:

1. Speichere diesen vollständigen Auftrag dauerhaft als Promptdatei im Projekt.
2. Analysiere das vorhandene Markdown-Inventar vollständig.
3. Erzeuge ein versioniertes Collection-Schema als JSON.
4. Erzeuge ein versioniertes JSON-Datenartefakt mit allen Inventarpositionen.
5. Lege die fachliche Collection in der eindeutig verifizierten STRATO-DEV-Datenbank an.
6. Importiere jede Inventarposition als eigenen Record.
7. Lies die importierten Daten wieder aus.
8. Vergleiche Git-Artefakt und DEV-Datenbank.
9. Committe ausschließlich die zu diesem Auftrag gehörenden Dateien.

Das Inventar darf nicht als ein einzelner großer Textdatensatz gespeichert werden.

Jeder Gegenstand muss eine eigene Tabellenzeile beziehungsweise einen eigenen
PocketBase-Record erhalten.

Die Testcollection `tst_entries` darf nicht als fachliche Inventartabelle
verwendet und nicht verändert werden.

---

## Verbindliche Regeln

### Zielumgebung eindeutig verifizieren

Bevor du irgendeinen Datenbank-Schreibzugriff ausführst:

1. Ermittle anhand der tatsächlich vorhandenen STRATO-Konfiguration,
   welcher interne Pfad die DEV-Datenbank bezeichnet.
2. Prüfe ausdrücklich:
   - `/.sfs-bd/`
   - `/.sfs-be/`
3. Dokumentiere für beide Pfade, ob sie DEV, LIVE oder nicht nachweisbar sind.
4. Verwende ausschließlich den eindeutig nachgewiesenen DEV-Pfad.

Wenn die DEV-Zuordnung nicht eindeutig nachgewiesen werden kann:

`DEPLOYMENT BLOCKED – DEV ENVIRONMENT NOT VERIFIED`

Eine nachgewiesene LIVE-Datenbank darf weder gelesen noch verändert werden.

### Collection `npl_personal_inventory_items`

- Typ: `base`
- Prüfe vor der Anlage, ob die Collection bereits existiert.
- Bei `ABWEICHUNG` oder `KONFLIKT` nicht automatisch verändern.

### Collection-Felder

| Feld | Typ | Pflicht | Zweck |
|---|---|---:|---|
| inventory_id | text | ja | stabile fachliche Inventar-ID |
| sequence_number | number | nein | Reihenfolge innerhalb der Quellgruppe |
| item_type | text | ja | game, puzzle, card_set oder creative_set |
| category | text | ja | genauere fachliche Kategorie |
| title | text | ja | erkannter Titel |
| publisher | text | nein | Verlag oder Hersteller |
| alternative_publisher | text | nein | alternative oder editionsabhängige Angabe |
| identification_status | text | ja | verified, probable, unverified oder title_pending |
| original_status | text | nein | ursprüngliche Statusangabe |
| notes | text | nein | offene oder ergänzende Hinweise |
| edition_status | text | nein | bekannte oder offene Editionsangabe |
| needs_review | bool | ja | weitere Prüfung erforderlich |
| quantity_minimum | number | ja | bekannte Mindestanzahl |
| is_group_record | bool | ja | Sammelposition statt einzeln identifiziert |
| parent_inventory_id | text | nein | Bezug zu Grundspiel oder übergeordnetem Objekt |
| source_file | text | ja | Pfad des Quelldokuments |
| source_method | text | ja | photographic_inventory |
| inventory_version | text | ja | 0.1.0 |
| recorded_at | date | nein | 2026-07-25 |

### Eindeutige Inventar-IDs

- Spiele: `PGC-A-001` bis `PGC-A-076`
- Puzzle und Puzzlegruppen: `PGC-B-001` fortlaufend
- Selbstregulations-, Reflexions- und Kartensets: `PGC-C-001` bis `PGC-C-010`
- Kreativ- und Experimentiersets: `PGC-D-001` bis `PGC-D-004`

### Statuszuordnung

| Quellenangabe | identification_status | needs_review |
|---|---|---:|
| ✓ | verified | false |
| wahrscheinlich | probable | true |
| ? | unverified | true |
| Titel offen | title_pending | true |
| Motiv offen | unverified | true |
| genauer Titel offen | title_pending | true |
| Ausgabe prüfen | unverified | true |

### Besondere Modellierungsregeln

1. Jede benannte Position erhält einen eigenen Record.
2. Die Puzzleposition `11+ Weitere Puzzle ...` bleibt ein Gruppenrecord.
3. Für diese Position gilt: `is_group_record: true`, `quantity_minimum: mindestens 1`.
4. Für normale Einzelpositionen gilt: `quantity_minimum: 1`, `is_group_record: false`.
5. `noch prüfen` ist kein Verlag.
6. Unbekannte Werte werden als `null` gespeichert.
7. Keine Titel, Verlage, Editionen oder Produktinformationen hinzuerfinden.

### Schemaartefakt im Git

Erzeuge: `app/database/schemas/npl_personal_inventory_items.collection.json`

### Datenartefakt im Git

Erzeuge: `app/database/data/personal_game_collection/Personal_Game_Collection_Inventory_v0.1.0.records.json`

### JSON-Validierung

Prüfe vor dem Datenbankzugriff:
- beide JSON-Dateien syntaktisch gültig
- genau 76 Spielrecords
- genau 10 Kartensetrecords
- genau 4 Kreativ-/Experimentierrecords
- mindestens 11 Puzzle beziehungsweise Puzzlegruppen
- mindestens 101 repräsentierte Gegenstände
- alle `inventory_id` eindeutig
- keine leeren Pflichttitel
- keine verlorenen Statusangaben
- keine erfundenen Verlage

### Records importieren

Importiere nach erfolgreicher Schema-Prüfung jeden Eintrag als eigenen Record.

Regeln:
- `NEU`: anlegen
- `BEREITS IDENTISCH`: überspringen
- `INHALT ABWEICHEND`: nicht überschreiben
- `DOPPELTE INVENTAR-ID`: anhalten

Keine vorhandenen Records löschen oder verändern.

### Git-Commit

Committe ausschließlich:

1. `app/prompts/database/NW-PLAY-PGC-DB-001_Personal_Game_Collection_Deployment_v0.1.0.md`
2. `app/database/schemas/npl_personal_inventory_items.collection.json`
3. `app/database/data/personal_game_collection/Personal_Game_Collection_Inventory_v0.1.0.records.json`

Commit-Nachricht:

`NW-PLAY: implement personal game collection inventory v0.1.0`

---

## Erwartete Artefakte nach Abschluss

1. Promptdatei (dieses Dokument) versioniert im Git
2. Schemaartefakt als JSON versioniert im Git
3. Datenartefakt mit 101+ Records als JSON versioniert im Git
4. Collection `npl_personal_inventory_items` in DEV angelegt und gefüllt
5. Commit mit eindeutiger ID
6. Vollständiger Soll-Ist-Abgleich

---

## Erwarteter Abschlussstatus

`INVENTORY DATABASE DEPLOYMENT COMPLETE`

oder einer der Blockierungsstatus, wenn Entscheidungen erforderlich sind.

---

Dieses Dokument bildet die Grundlage für den reproduzierbaren Import der persönlichen
Spielesammlung in das STRATO-DEV-System.
