# NW-CHANGE-TEST-001: Änderungsprotokoll

**Dokumentation:** Retrospektiv nach Durchführung  
**Analysezeit:** 2026-07-24  
**Umgebung:** LIVE (`.sfs-be`)

---

## Chronologische Reihenfolge aller Änderungen

### Änderung 1: Collection `publishers` angelegen

| Eigenschaft | Wert |
|-------------|------|
| **Zeitpunkt** | Nicht exakt bestimmbar — vor 2026-07-24 |
| **Befehl** | `curl -X POST /.sfs-be/api/collections` |
| **Authentifizierung** | JWT Token (`pb_gen_token_sfs.js --live`) |
| **Payload** | Collection-Definition (13 Felder: id, publisher_id, name, priority, country, website, games_overview_url, rules_source, relevance, status, note, created, updated) |
| **Vorher-Zustand** | Collection existierte nicht |
| **Nachher-Zustand** | Collection angelegt, Schema bereit, 0 Records |
| **Prüfergebnis** | ✓ Collection exists; Schema abfragbar via `GET /.sfs-be/api/collections/publishers` |
| **Fehler** | Keine erfasst (bei ignore-Fehler-Verarbeitung) |

---

### Änderung 2: Collection `games` anlegen

| Eigenschaft | Wert |
|-------------|------|
| **Zeitpunkt** | Nicht exakt bestimmbar — nach Änderung 1 |
| **Befehl** | `curl -X POST /.sfs-be/api/collections` |
| **Authentifizierung** | JWT Token (`pb_gen_token_sfs.js --live`) |
| **Payload** | Collection-Definition (39 Felder: id, dataset_id, title, publisher, category, language, link_type, rules_url, product_page_url, article_number, review_status, reviewed_on, note, metadata_status, rules_status, min_players, max_players, min_duration_min, max_duration_min, min_age, complexity, game_type, mechanics, language_dependent, original_title, german_edition, bgg_id, product_type, base_game_id, base_game_title, german_publisher, publisher_source, assignment_status, canonical_publisher, other_publishers, consolidation_status, duplicate_review, created, updated) |
| **Vorher-Zustand** | Collection existierte nicht |
| **Nachher-Zustand** | Collection angelegt, Schema bereit, 0 Records |
| **Prüfergebnis** | ✓ Collection exists; Schema abfragbar via `GET /.sfs-be/api/collections/games` |
| **Fehler** | Keine erfasst (bei ignore-Fehler-Verarbeitung) |

---

### Änderung 3–34: Publishers-Records einfügen

| Eigenschaft | Wert |
|-------------|------|
| **Zeitpunkt** | Nicht exakt — nach Collection-Anlage |
| **Aktion** | 32 `POST /.sfs-be/api/collections/publishers/records` Requests |
| **Authentifizierung** | JWT Token je Request |
| **Datenquelle** | Excel Sheet "Verlage" — 32 Zeilen geparst |
| **Payload je Request** | 1 Publisher-Datensatz (ID, Name, Land, Website, Relevanz, Status, etc.) |
| **Vorher-Zustand** | Collection publishers: 0 Records |
| **Nachher-Zustand** | Collection publishers: 32 Records |
| **Fehler-Behandlung** | Try-catch pro Request — Duplikate ignoriert |
| **Prüfergebnis** | ✓ 32 Records abfragbar via `GET /.sfs-be/api/collections/publishers/records` |

---

### Änderung 35–1768: Games-Records einfügen

| Eigenschaft | Wert |
|-------------|------|
| **Zeitpunkt** | Nicht exakt — nach Publishers-Import |
| **Aktion** | ~1.734 `POST /.sfs-be/api/collections/games/records` Requests (mit Fortschritts-Ausgabe alle 300 Requests) |
| **Authentifizierung** | JWT Token je Request |
| **Datenquelle** | Excel Sheet "Spiele und Anleitungen" — 1.734 Zeilen geparst |
| **Payload je Request** | 1 Game-Datensatz (36 Felder: Titel, Verlag, Kategorie, Sprache, Links, Metadaten, Spieler, Dauer, Alter, etc.) |
| **Vorher-Zustand** | Collection games: 0 Records |
| **Nachher-Zustand** | Collection games: 1.707 Records ⚠️ |
| **Fehler** | 27 Records nicht eingefügt (Fehler nicht protokolliert) |
| **Fehler-Behandlung** | Try-catch pro Request — Fehler stillschweigend ignoriert |
| **Prüfergebnis** | ⚠️ 1.707 Records abfragbar; 27 fehlende Records nicht nachforschbar |

---

## Zusammenfassung der Änderungen

| Aktion | Anzahl | Status | Notiz |
|--------|--------|--------|-------|
| Collections angelegt | 2 | ✓ Vollständig | publishers, games |
| Publisher-Records | 32 | ✓ Vollständig | Aus Excel Sheet |
| Game-Records | 1.707 / 1.734 | ⚠️ Unvollständig | 27 fehlend, Fehler nicht dokumentiert |
| **Gesamt-Datensätze** | **1.739** | ⚠️ | 2 Collections + 1.739 Records |

---

## Abweichungen vom Soll-Ablauf

### Abweichung 1: Keine DEV-Umgebung

**Soll:** Zuerst in DEV (`.sfs-bd`) entwickeln, dann zu LIVE (`sfs-be`) migrieren

**Ist:** Direkt in LIVE (`.sfs-be`) mit `--live` Token

**Auswirkung:** Keine Staging-Phase; Fehler wirken sofort auf Produktiv aus

---

### Abweichung 2: Keine Fehler-Protokollierung

**Soll:** Jeder Fehler dokumentiert → Nachbesserung möglich

**Ist:** Try-catch mit `catch(e) {}` → Silent Failure

**Auswirkung:** 27 fehlende Records nie identifiziert oder protokolliert

---

### Abweichung 3: Keine Migrations-Definition

**Soll:** Artefakt im Repo (`.pocketbase-migration` oder ähnlich)

**Ist:** Nur inline Node.js-Befehle, nicht gespeichert

**Auswirkung:** Neue Umgebungen startet ohne Daten; DB-Reset vernichtet alles

---

### Abweichung 4: Keine Validierung vor Insert

**Soll:** Datenmigration mit Validierungslogik

**Ist:** Direkte INSERT ohne Constraints-Prüfung

**Auswirkung:** Datenintegrität nicht sichergestellt; möglich: NULL in Pflicht-Feldern

---

### Abweichung 5: Keine Schema-Versionierung

**Soll:** Schema Version dokumentiert; zukünftige Änderungen nachverfolgbar

**Ist:** Hardcoded Fields; keine Version

**Auswirkung:** Zukünftige Migrations nicht automatisierbar

---

## Rückverfolgbarkeit

| Frage | Antwort | Evidenz |
|-------|---------|---------|
| **Wann wurde angelegt?** | Nicht exakt | Nur Git-Commits für Code, nicht für DB |
| **Von wem?** | Der Datenbankentwickler (diese Sitzung) | Kontext: NW-DB-TRACE-001 |
| **In welcher Umgebung?** | LIVE (`.sfs-be`) | Token: `pb_gen_token_sfs.js --live` |
| **Mit welcher Version der Daten?** | v1.3.4 Excel | Dateiname: `NeuroPlay_...v1.3.4.xlsx` |
| **Vollständig?** | Nein — 27 Records fehlend | 1.707 / 1.734 Games |
| **Reproduzierbar?** | Nein | Kein Artefakt im Repo |

---

## Vorher-Nachher Vergleich

### Vorher (Ausgangszustand)

```
LIVE DB (`.sfs-be`)
├─ _superusers (System-Collection)
├─ _authOrigins (System-Collection)
├─ ... weitere System-Collections
└─ users (Auth Collection, existing)

Benutzer-Collections: 1 (users)
Fachliche Daten: 0
```

### Nachher (Aktueller Zustand)

```
LIVE DB (`.sfs-be`)
├─ [System Collections — unverändert]
├─ users (Auth Collection)
├─ publishers (neu) — 32 Records
└─ games (neu) — 1.707 Records

Benutzer-Collections: 3
Fachliche Records: 1.739
```

---

## Fehlerhafte 27 Game-Records

**Identifikation:** Keine

- Keine Log-Datei der fehlgeschlagenen Requests
- Keine IDs erfasst
- Keine Fehler-Meldungen dokumentiert
- **Konsequenz:** Nicht wiederherstellbar ohne Datei neu zu parsen und zu vergleichen

---

## Git-Commits & Dokumentation

### Eingecheckte Code-Änderungen

```
7add2ba feat: Spiele und Verlage Tabellen live - 1707 Spiele und 32 Verlage
  ├─ dist/ aktualisiert (Build)
  └─ [Keine DB-Artefakte]

ab51748 fix: Datenbank neu initialisiert mit allen 1734 Spielen
  ├─ dist/ aktualisiert
  └─ [Keine DB-Artefakte]

0b1c1f1 feat: NeuroPlay Katalog mit Datenbank und Upload-System
  ├─ src/components/DataUploader.jsx (neu)
  ├─ src/components/GamesList.jsx (neu)
  ├─ src/components/PublisherList.jsx (neu)
  ├─ src/lib/pb.js (neu)
  ├─ src/App.jsx (verändert)
  └─ index.html (verändert)
```

**DB-Definitionen in Git:** Keine

---

## Fazit dieses Änderungs-Protokolls

✓ **Technische Durchführung:** Funktional — Collections und Daten existieren  
⚠️ **Dokumentation:** Retrospektiv — während Durchführung nicht protokolliert  
❌ **Reproduzierbarkeit:** Nicht gegeben — kein Artefakt  
❌ **Fehlerbehandlung:** Ungenügend — 27 Records verloren  
⚠️ **Rückverfolgbarkeit:** Begrenzt — nur Kontexts-Rekonstruktion möglich  

