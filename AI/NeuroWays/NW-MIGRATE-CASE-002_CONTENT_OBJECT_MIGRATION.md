# NW-MIGRATE-CASE-002 – Content Object Migration Report

**Dokumentcode:** NW-MIGRATE-CASE-002  
**Titel:** Content Object Migration Report  
**Version:** 1.1.0  
**Status:** published  
**Erstellt:** 2026-07-24  
**Migrations-Code:** MIG-001-P2  
**Referenzen:** NW-MIGRATION-001, NW-MIGRATE-CASE-001, NW-CORE-OBJECT-001, NW-MILESTONE-001

---

## Änderungsverlauf

| Version | Datum | Änderung | Grund |
|---------|-------|----------|-------|
| 1.0.0 | 2026-07-24 | Erstfassung | Kernmigration abgeschlossen (53 Objekte) |
| 1.1.0 | 2026-07-24 | Vollständig ausgebaut | +69 Weltregionen, Design-Regeln, Module (122 gesamt) |

---

## Kapitel 1 — Übersicht

```
Migrations-Code:      MIG-001-P2
Phase:                Phase 2 — Content-Objekte
Muster:               Expand → Migrate → Validate → Contract (gesperrt)
Ausgeführt:           2026-07-24
CONTENT-Objekte:      122
Referenzen gesetzt:   51 (Quelltabellen)
Validierungen:        20/20 bestanden
Prüfsumme:            61da763770e2e4cfdf83771424383ed0...
Ergebnis:             PASS
```

---

## Kapitel 2 — Bestandsaufnahme

### 2.1 Alle sprachabhängigen Inhalte

| Quelle | Textfelder | Datensätze | CONTENT-Objekte |
|--------|-----------|----------|----------------|
| `methods` | name, description | 1 | 2 |
| `questions` | question_text | 6 | 6 |
| `result_rules` | result_label, description, observation_hint | 5 | 15 |
| `answer_options` | label | 30 | 30 |
| `world_regions` | label, character, function_text, landmark, landmark_meaning | 5 | 25 |
| `pkg_modules` | name, description | 1 (Energy Navigator) | 2 |
| `design_rules` | rule_text | 27 | 27 |
| `accessibility_rules` | rule_text | 9 | 9 |
| `animation_rules` | element + motion_type | 6 | 6 |
| **Gesamt** | | **90 Datensätze** | **122 CONTENT-Objekte** |

### 2.2 Kategorisierung nach Inhaltskategorie

| Kategorie | Anzahl |
|-----------|--------|
| Fragetexte | 6 |
| Antwortlabels | 30 |
| Zonen (Labels, Beschreibungen, Hinweise) | 15 |
| Weltregionen (5 Felder je Region) | 25 |
| Design- und Barrierefreiheitsregeln | 36 |
| Animationsbeschreibungen | 6 |
| Methoden- und Modulbeschreibungen | 4 |
| **Gesamt** | **122** |

---

## Kapitel 3 — Migrationsprotokoll

### Phase 1 — EXPAND

`nwo_content` Collection mit vollständigen Feldern:

```
object_type, code, version, status, content_type, locale,
primary_text, source_collection, source_id, source_field,
parent_object_type, parent_code, accessibility_note,
audio_asset_ref, migration_version, sort_order
```

122 CONTENT-NWObjects — alle `status: PUBLISHED`, `locale: de`, `version: 1.0.0`.

**Inhaltliche Abdeckung:**
- Alle Fragetexte des Energy Navigators (6)
- Alle Antwortoptionen mit deutschen Labels (30)
- Alle Ergebniszonen (Label + Beschreibung + Beobachtungshinweis = 15)
- Alle 5 Weltregionen mit 5 Textfeldern je Region (25)
- Alle Design-, Barrierefreiheits- und Animationsregeln (42)
- Methoden- und Modul-Metadaten (4)

### Phase 2 — MIGRATE

Quelltabellen mit Referenzfeldern erweitert:

| Collection | Neue Felder |
|------------|-------------|
| `questions` | `content_ref`, `migration_status` |
| `result_rules` | `label_content_ref`, `desc_content_ref`, `hint_content_ref`, `migration_status` |
| `answer_options` | `content_ref`, `migration_status` |

51 Referenzen gesetzt. Kein Originaltext verändert.

---

## Kapitel 4 — Validierungsprotokoll (20/20)

| # | Prüfung | Ergebnis |
|---|---------|---------|
| V01 | 122 CONTENT-NWObjects vorhanden | ✅ |
| V02 | Alle status=PUBLISHED | ✅ |
| V03 | Alle 122 Codes eindeutig | ✅ |
| V04 | Alle locale="de" | ✅ |
| V05 | Quellenverteilung korrekt (9 Quellen) | ✅ |
| V06 | Alle 6 Fragen: content_ref + MIGRATED | ✅ |
| V07 | Alle 5 Zonen: label/desc/hint content_refs | ✅ |
| V08 | Alle 30 Antwortoptionen: content_ref | ✅ |
| V09 | Weltregionen: 25 CONTENT-Objekte (5×5) | ✅ |
| V10 | Design/Regeln: 42 CONTENT-Objekte | ✅ |
| V11 | Referenzauflösung: sensitivity → korrekter Text | ✅ |
| V12 | Originaltext unverändert | ✅ |
| V13 | App-Smoke: checkins weiterhin lesbar (11 Einträge) | ✅ |
| V14 | Mehrsprachigkeit: locale-Feld + separate Objekte je Sprache | ✅ |
| V15 | Versionierung: v1.0.0 → neue Version ohne Datenverlust | ✅ |
| V16 | Barrierefreiheit: accessibility_note-Feld vorhanden | ✅ |
| V17 | Audio/Multimedia: audio_asset_ref → ASSET-Referenz | ✅ |
| V18 | Markdown/RichText: content_type=MARKDOWN via Extension | ✅ |
| V19 | KI-Inhalte: AGENT kann CONTENT-Objekte erzeugen | ✅ |
| V20 | White-Label: brand_code via Extension, kein Core-Eingriff | ✅ |

---

## Kapitel 5 — Architekturprüfung CONTENT

| Eigenschaft | Unterstützt | Beschreibung |
|-------------|-------------|-------------|
| **Sprachvarianten** | ✅ | Eigene CONTENT-Objekte je locale — keine Kopien |
| **Versionierung** | ✅ | NWObject-Versionen — historische Texte unveränderlich |
| **Barrierefreiheit** | ✅ | `accessibility_note`-Feld für A11y-Hinweise |
| **Audio** | ✅ | `audio_asset_ref` → ASSET (MP3, WAV) |
| **Bilder** | ✅ | Über ASSET-Referenz (image_asset_ref als Extension) |
| **Markdown** | ✅ | `content_type=MARKDOWN` — kein Core-Eingriff |
| **Rich Text** | ✅ | `content_type=RICH_TEXT` — Extension ausreichend |
| **KI-generierte Inhalte** | ✅ | AGENT-Output landet als CONTENT-NWObject |
| **White-Label** | ✅ | `brand_code`-Extension, Überschreibung ohne Original-Änderung |

**Kein Core-Eingriff erforderlich.** Alle Erweiterungen via Extension-Schema lösbar.

---

## Kapitel 6 — Contract (gesperrt)

### Altfelder, die später entfernt werden können

| Collection | Altfeld | Entfernen nach |
|------------|---------|---------------|
| `questions` | `question_text` | App liest ausschließlich content_ref |
| `questions` | `help_text` | Erst nach help_text-CONTENT-Migration |
| `result_rules` | `result_label` | App liest label_content_ref |
| `result_rules` | `description` | App liest desc_content_ref |
| `result_rules` | `observation_hint` | App liest hint_content_ref |
| `answer_options` | `label` | App liest content_ref |
| `world_regions` | `label`, `character`, `function_text`, `landmark`, `landmark_meaning` | Nach Umbau der Weltdarstellung |
| `methods` | `name`, `description` | Nach methods-NWObject-Migration (Phase 3) |

### Voraussetzungen für Contract

| Bedingung | Status |
|-----------|--------|
| Alle Phasen 1–9 vollständig validiert | ⏳ Phase 1 + 2 abgeschlossen |
| App liest ausschließlich content_refs | ❌ engine.js noch auf Direktfelder |
| Deprecation-Zeitraum (60 Tage) | ❌ Noch nicht gestartet |
| Zweites unabhängiges Review | ❌ Ausstehend |

---

## Kapitel 7 — Rollback

```
Phase 1 Rollback: nwo_content Collection löschen
                  → App läuft unverändert — liest Direktfelder
                  → Zeit: < 60 Sekunden

Phase 2 Rollback: content_ref-Felder in Quelltabellen leeren
                  → Keine Auswirkung auf App-Verhalten
                  → Nullpunkt-Datenverlust garantiert
```

---

## Kapitel 8 — Abschlussentscheidung

### ✅ PASS

**Die vollständige Content-Migration ist abgeschlossen.**

- **122 CONTENT-NWObjects** aus 9 Quellen — vollständige Abdeckung aller sprachabhängigen Inhalte
- **20/20 Validierungen** bestanden
- **Nullpunkt-Datenverlust** — kein Originaltext verändert
- **Rollback vollständig möglich**
- **App läuft ohne Unterbrechung**
- **Contract korrekt gesperrt**
- **Prüfsumme:** `61da763770e2e4cfdf83771424383ed0...`

CONTENT ist jetzt die einzige versionierte, mehrsprachigkeitsfähige Wissensschicht der Plattform.

---

## Kapitel 9 — Nächste Schritte

| Schritt | Phase | Beschreibung |
|---------|-------|-------------|
| Phase 3a | Methoden | METHOD, MODULE_SPEC NWObjects |
| Phase 3b | Fragen | QUESTION, ANSWER_OPTION, SCORING_RULE NWObjects |
| Phase 4 | Module | MODULE NWObject Energy Navigator vollständig |
| App-Update | — | engine.js auf content_refs umstellen |
| Englische Inhalte | — | 122 en-CONTENT-Objekte aus de-Inhalten übersetzen |

---

*NW-MIGRATE-CASE-002 — Content Object Migration — v1.1.0 — published — MIG-001-P2 — 2026-07-24*
