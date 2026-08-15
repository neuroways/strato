# NW-MIGRATION-001 – NeuroWays Migration Standard

**Dokumentcode:** NW-MIGRATION-001  
**Titel:** NeuroWays Migration Standard  
**Version:** 1.0.0  
**Status:** draft  
**Erstellt:** 2026-07-24  
**Bereich:** NeuroWays Core / Produktive Entwicklung  
**Referenzen:** NW-CORE-BUILDER-001, NW-CORE-OBJECT-001, NW-VALIDATE-001, NW-VALIDATE-CASE-001, NW-VALIDATE-CASE-002, NW-STD-003, NW-DEPLOY-001

---

## Änderungsverlauf

| Version | Datum | Änderung | Grund |
|---------|-------|----------|-------|
| 1.0.0 | 2026-07-24 | Erstfassung | Architektur validiert — Übergang in produktive Entwicklung |

---

## Kapitel 1 — Ziele der Migration

### 1.1 Wozu dieser Standard?

Die NeuroWays-Core-Architektur ist durch zwei unabhängige Validierungsfälle als stabil bestätigt. Bestehende Module, Daten und Konfigurationen müssen nun **schrittweise und verlustfrei** auf das neue Objektmodell überführt werden.

Dieser Standard definiert:
- **Wann** migriert wird
- **Was** in welcher Reihenfolge migriert wird
- **Wie** jede Migration durchgeführt und nachgewiesen wird
- **Wie** Rückwärtskompatibilität gewahrt bleibt
- **Wie** ein Rollback möglich bleibt

### 1.2 Was Migration nicht ist

| Nicht Gegenstand der Migration | Stattdessen |
|-------------------------------|-------------|
| Neuentwicklung von Modulen | NW-BUILDER-001 (Module Builder) |
| Neue Fachlogik | Neue Methoden, neue MODULE_SPEC |
| Plattformwechsel | Eigenes Migrationsprojekt |
| Benutzerdaten übertragen | Zwischen Umgebungen niemals — NW-DEPLOY-001 |
| Architekturänderungen | NW-VALIDATE-001 zuerst |

### 1.3 Migrationsziele

1. Alle bestehenden Stammdaten existieren als vollständige NWObjects
2. Alle Beziehungen sind über Referenzen modelliert — keine Datenkopien
3. Jede Information existiert genau einmal
4. Historische Sessions sind unverändert und weiterhin auswertbar
5. Module bleiben während der Migration für Benutzer funktionsfähig
6. Jede Migrationsphase ist einzeln rückrollbar

---

## Kapitel 2 — Migrationsprinzipien

### 2.1 Verbindliche Grundsätze

| Prinzip | Beschreibung |
|---------|-------------|
| **Kein Informationsverlust** | Jeder bestehende Datenpunkt muss nach der Migration abrufbar sein |
| **Keine Duplikation** | Informationen werden referenziert, niemals kopiert |
| **Schrittweise** | Jede Phase ist unabhängig durchführbar und validierbar |
| **Nachvollziehbar** | Jede Migration wird als Migrations-Protokoll gespeichert |
| **Rückwärtskompatibel** | Bestehende Schnittstellen funktionieren weiter |
| **Historisch unveränderlich** | Sessions, Ergebnisse und Verlaufsdaten werden niemals nachträglich verändert |
| **Funktionsfähig während Migration** | Kein Wartungsfenster für Benutzer |
| **Ohne Core-Anpassung** | Die Migration nutzt ausschließlich die validierte Architektur |
| **Versioniert** | Jede Migration hat eine Versionsnummer, einen Zeitstempel und ein Ergebnis |

### 2.2 Migrationsmuster: Expand → Migrate → Contract

Die einzig zulässige Migrationsstrategie ist das **Expand–Migrate–Contract-Muster**:

```
Phase 1 EXPAND    — Neue Felder/Strukturen hinzufügen (alte bleiben erhalten)
Phase 2 MIGRATE   — Daten in neue Struktur überführen
Phase 3 VALIDATE  — Vollständigkeit und Korrektheit prüfen
Phase 4 CONTRACT  — Alte Felder entfernen (erst nach Validierung)
```

**Wichtig:** Phase 4 (Contract) darf erst beginnen, wenn Phase 3 vollständig bestanden ist.

---

## Kapitel 3 — Voraussetzungen

Bevor eine Migration beginnt, müssen alle folgenden Bedingungen erfüllt sein:

| Voraussetzung | Nachweis |
|--------------|---------|
| NW-CORE-OBJECT-001 v1.0+ veröffentlicht | Dokument im Status PUBLISHED |
| NW-VALIDATE-CASE-001 bestanden | Ergebnis PASS oder PASS WITH EXTENSIONS |
| NW-VALIDATE-CASE-002 bestanden | Ergebnis PASS oder PASS WITH EXTENSIONS |
| Migrations-Testumgebung vorhanden | DEV-Umgebung isoliert von LIVE |
| Rollback-Plan dokumentiert | Für jede Phase (Kapitel 14) |
| Bestandsdaten gesichert | Vollständiges Backup vor jeder Phase |
| Bestandsfunktionalität getestet | Smoke-Tests vor Migration (Ausgangszustand) |

---

## Kapitel 4 — Migrationsphasen

### Übersicht

```
Phase 0 — Vorbereitung und Bestandsaufnahme
        ↓
Phase 1 — Design-Tokens migrieren
        ↓
Phase 2 — Content-Objekte migrieren
        ↓
Phase 3 — Methoden migrieren
        ↓
Phase 4 — Module migrieren
        ↓
Phase 5 — Navigation und Dashboard migrieren
        ↓
Phase 6 — Sessions und historische Daten migrieren
        ↓
Phase 7 — Benutzer und ENTITY migrieren
        ↓
Phase 8 — CONSENT und CONVERSATION einführen
        ↓
Phase 9 — Builder aktivieren
        ↓
Phase 10 — Abschluss, Validierung, Contract
```

**Jede Phase wird in DEV vollständig durchgeführt und validiert, bevor sie nach LIVE übertragen wird.**

---

## Kapitel 5 — Phase 0: Vorbereitung und Bestandsaufnahme

### 5.1 Inventar der bestehenden Objekte

Vor Beginn wird ein vollständiges Inventar der bestehenden Objekte erstellt:

| Bestandsobjekt | Anzahl | Migrationsziel |
|----------------|--------|---------------|
| methods | 1 (Energy Navigator) | → METHOD NWObject |
| questions | 6 | → QUESTION NWObjects |
| answer_options | 30 | → ANSWER_OPTION NWObjects |
| result_rules | 5 | → SCORING_RULE NWObjects |
| design_tokens | 16 | → DESIGN_TOKEN NWObjects |
| design_rules | 27 | → CONTENT (Regeltext) |
| world_regions | 5 | → WORLD_REGION (SCORING_RULE-Referenz) |
| pkg_modules | 2 | → MODULE NWObjects |
| dev_prompts | 19 | → PROMPT NWObjects |
| checkins | n | Historisches Betriebsdatum — UNVERÄNDERLICH |
| checkin_answers | n | Historisches Betriebsdatum — UNVERÄNDERLICH |

### 5.2 Smoke-Tests vor der Migration (Ausgangszustand)

```
ST0-1  ✓ Check-in vollständig durchführbar
ST0-2  ✓ Ergebniszonen korrekt berechnet
ST0-3  ✓ Verlauf anzeigbar
ST0-4  ✓ Datenisolation zwischen Benutzern aktiv
ST0-5  ✓ Alle Designfarben korrekt referenziert
```

Wenn ein Smoke-Test fehlschlägt: **Migration nicht starten.**

---

## Kapitel 6 — Phase 1: Design-Tokens migrieren

### 6.1 Warum zuerst?

Design-Tokens sind die Basis aller anderen Objekte. Solange sie nicht als NWObjects mit stabilen Codes existieren, können keine anderen Objekte sauber referenzieren.

### 6.2 Migrationsprozess

```
Schritt 1 — Bestehende design_tokens auslesen
Schritt 2 — Für jeden Token ein DESIGN_TOKEN NWObject erstellen
           code:        "energy.zone.coast.color"
           token_type:  COLOR
           value:       "#4a9abb"
           theme_ref:   → THEME "NEUROWAYS_LIGHT"
           version:     "1.0.0"
           status:      PUBLISHED

Schritt 3 — Referenzen in result_rules aktualisieren
           result_rules.color → referenziert DESIGN_TOKEN.code
           (Direkter HEX-Wert bleibt als Fallback bis Phase 4)

Schritt 4 — Validierung
           Alle 16 Tokens als NWObjects vorhanden?
           Alle Referenzen auflösbar?

Schritt 5 — Direktfelder erst in Phase 10 (Contract) entfernen
```

### 6.3 Validierungskriterien Phase 1

| Kriterium | Prüfung |
|-----------|---------|
| Alle 16 Tokens als NWObjects | Zählung |
| Codes stabil und eindeutig | Kein Duplikat |
| Referenzen von SCORING_RULE auflösbar | Query-Test |
| Smoke-Test ST0-1 bis ST0-5 weiterhin bestanden | Muss grün bleiben |

---

## Kapitel 7 — Phase 2: Content-Objekte migrieren

### 7.1 Was wird migriert?

Alle sichtbaren Texte, die derzeit direkt in Feldern stehen, werden als CONTENT-NWObjects ausgelagert:

| Bestandsfeld | Neues CONTENT-Objekt |
|-------------|---------------------|
| `questions.question_text` | `CONTENT "Q_[CODE]_TEXT_DE"` |
| `answer_options.label` | `CONTENT "AO_[CODE]_LABEL_DE"` |
| `result_rules.result_label` | `CONTENT "ZONE_[CODE]_LABEL_DE"` |
| `result_rules.description` | `CONTENT "ZONE_[CODE]_DESC_DE"` |
| `result_rules.observation_hint` | `CONTENT "ZONE_[CODE]_HINT_DE"` |
| `methods.name` | `CONTENT "METHOD_[CODE]_NAME_DE"` |
| `methods.description` | `CONTENT "METHOD_[CODE]_DESC_DE"` |

### 7.2 Migrationsprozess

```
Schritt 1 — Für jedes Textfeld ein CONTENT NWObject erstellen
           locale:         de
           content_type:   TEXT
           primary_text:   [bestehender Text]
           status:         PUBLISHED

Schritt 2 — Referenz-Feld in Elternobjekt hinzufügen
           questions.question_text_ref → CONTENT.id

Schritt 3 — Altes Direktfeld bleibt als Fallback (bis Phase 10)

Schritt 4 — Validierung (Texte abrufbar über Referenz)
```

### 7.3 Reihenfolge innerhalb Phase 2

```
2a — Methodentexte
2b — Zonentexte (Labels, Beschreibungen, Hinweise)
2c — Fragetexte
2d — Antwortlabels
```

---

## Kapitel 8 — Phase 3: Methoden migrieren

### 8.1 Migrationsprozess

```
Schritt 1 — METHOD_TYPE "SELBSTBEOBACHTUNG" erstellen
           code: SELBSTBEOBACHTUNG
           version: 1.0.0
           status: PUBLISHED

Schritt 2 — METHOD NWObject für Energy Check-in erstellen
           code:              ENERGY_CHECK
           version:           1.1.0
           method_type_ref:   → METHOD_TYPE "SELBSTBEOBACHTUNG"
           status:            PUBLISHED

Schritt 3 — Bestehende questions als QUESTION NWObjects migrieren
           code:              ENERGY_Q_ENERGY
           method_ref:        → METHOD "ENERGY_CHECK"
           question_text_ref: → CONTENT "Q_ENERGY_TEXT_DE"
           sort_order:        10
           dimension_code:    energy
           is_required:       true

Schritt 4 — Bestehende answer_options als ANSWER_OPTION NWObjects
           code:          AO_ENERGY_1
           question_ref:  → QUESTION "ENERGY_Q_ENERGY"
           label_ref:     → CONTENT "AO_ENERGY_1_LABEL_DE"
           numeric_value: 1
           sort_order:    10

Schritt 5 — Bestehende result_rules als SCORING_RULE NWObjects
           code:              ENERGY_ZONE_FESTLAND
           method_ref:        → METHOD "ENERGY_CHECK"
           min_score:         6
           max_score:         12
           result_code:       festland
           result_label_ref:  → CONTENT "ZONE_FESTLAND_LABEL_DE"
           color_token_ref:   → DESIGN_TOKEN "energy.zone.festland.color"

Schritt 6 — MODULE_SPEC erstellen
           code:             ENERGY_APP_SPEC
           method_ref:       → METHOD "ENERGY_CHECK"
           module_ref:       → MODULE "ENERGY_NAVIGATOR"
           execution_modes:  [APP]
```

### 8.2 Unveränderlichkeit historischer Daten

**Bestehende checkins und checkin_answers werden NICHT verändert.**

Sie erhalten rückwirkend eine `method_version`-Referenz als Extension-Feld — ausschließlich als Lesehilfe, ohne die bestehenden Werte zu überschreiben.

```
Bestehende checkins.method_version = "1.1.0"  ← bereits vorhanden, bleibt
Neues Feld: checkins.method_nwo_ref = "ENERGY_CHECK" (optional, Phase 6)
```

---

## Kapitel 9 — Phase 4: Module migrieren

### 9.1 Migrationsprozess

```
Schritt 1 — MODULE NWObject für Energy Navigator erstellen
           code:         ENERGY_NAVIGATOR
           version:      1.1.0
           status:       PUBLISHED
           meta:
             name:       "Energy Navigator"
             category:   "Gesundheit"
             icon:       "waves"
           extensions:
             module_builder:
               features:    ["dashboard_card","own_pages","methods","evaluations"]
               nav_config:  { path: "/checkin", label_ref: "ENERGY_NAV_LABEL" }
               method_spec: "ENERGY_APP_SPEC"

Schritt 2 — Bestehenden pkg_modules-Eintrag mit NWObject verknüpfen
           pkg_modules.nwo_ref = MODULE "ENERGY_NAVIGATOR"
           (bestehender Eintrag bleibt funktionsfähig)
```

---

## Kapitel 10 — Phase 5: Navigation und Dashboard migrieren

### 10.1 Navigation

```
NAVIGATION NWObject
  code:      ENERGY_NAV
  module_ref:→ MODULE "ENERGY_NAVIGATOR"
  label_ref: → CONTENT "ENERGY_NAV_LABEL_DE"
  path:      /checkin
  icon_ref:  → ASSET "ICON_WAVES"
  sort_order: 10
  visibility: AUTH_ONLY
```

### 10.2 Dashboard-Widgets

```
WIDGET NWObject "ENERGY_TODAY_CARD"
  widget_type:  TODAY_CARD
  module_ref:   → MODULE "ENERGY_NAVIGATOR"
  label_ref:    → CONTENT "WIDGET_TODAY_LABEL_DE"

WIDGET NWObject "ENERGY_LAST_RESULT"
  widget_type:  STATUS
  module_ref:   → MODULE "ENERGY_NAVIGATOR"
```

Die bestehende Anwendungslogik lädt weiterhin über die bisherigen Felder — Widgets werden parallel registriert, bis Phase 10 (Contract).

---

## Kapitel 11 — Phase 6: Sessions und historische Daten

### 11.1 Grundprinzip

**Historische Sessions werden niemals verändert.**

Sie erhalten ausschließlich neue Referenzfelder, die auf die migrierten NWObjects zeigen. Bestehende Felder bleiben exakt erhalten.

### 11.2 Migrationsprozess

```
Bestehende checkins-Felder bleiben:
  method_id, method_version, session_date,
  total_score, result_code, result_label

Neu hinzugefügte Referenzfelder (optional, additive):
  method_nwo_ref:         ENERGY_CHECK
  method_nwo_version:     1.1.0
  scoring_rule_nwo_ref:   ENERGY_ZONE_KUESTE
```

**Keine bestehenden Werte werden überschrieben.** Neue Felder ermöglichen die Auswertung nach NWObject-Standard.

### 11.3 Migrationsregel für historische Einträge ohne NWO-Referenz

Alle checkins ohne `method_nwo_ref` erhalten als Backfill:

```
method_nwo_ref = "ENERGY_CHECK"        (eindeutig, da nur eine Methode)
method_nwo_version = checkins.method_version
```

---

## Kapitel 12 — Phase 7: Benutzer und ENTITY

### 12.1 Bestehende users-Collection

Die bestehende `users`-Collection bleibt vollständig erhalten. Sie wird als `ENTITY (USER)` interpretiert — ohne Umbenennung oder Schemaänderung.

```
ENTITY (USER) entspricht users:
  id           = users.id
  entity_type  = USER
  display_name = users.display_name
  email        = users.email
  status       = users.account_status
```

Kein Datenbankschema-Eingriff. Die Anwendungsschicht interpretiert `users`-Einträge als `ENTITY (USER)`-NWObjects.

### 12.2 Zukünftige ENTITY-Typen

Wenn TEAM, ENTERPRISE, ORGANIZATION benötigt werden, entstehen sie als neue Einträge in einer `entities`-Collection — ohne Eingriff in `users`.

---

## Kapitel 13 — Phase 8: CONSENT und CONVERSATION

### 13.1 CONSENT

```
CONSENT-Collection erstellen:
  grantor_ref:   → ENTITY (USER)
  grantee_ref:   → ENTITY (USER | TEAM | ENTERPRISE)
  scope:         [ENERGY_RESULT | GAME_SESSION | PLAYER_STATE | ALL]
  valid_from:    ISO-Datum
  valid_until:   ISO-Datum | null
  status:        ACTIVE | ARCHIVED
  listRule:      user_id = @request.auth.id   (grantor sieht nur eigene Freigaben)
```

Standardwert für alle bestehenden Benutzer: Keine CONSENT-Einträge — d. h. keine Freigabe aktiv. Datenschutz-Standard ist restrictiv. ✅

### 13.2 CONVERSATION

```
CONVERSATION-Collection erstellen:
  entity_ref:      → ENTITY (USER)
  agent_ref:       → AGENT "FLOWISAURUS"
  context_refs:    → [RESULT | GAME_SESSION]
  messages:        [ { role: user|agent, content_ref: → CONTENT, created_at } ]
  status:          ACTIVE | ARCHIVED
  listRule:        user_id = @request.auth.id
```

---

## Kapitel 14 — Phase 9: Builder aktivieren

Builder werden nach abgeschlossener Datenmigration aktiviert:

```
Reihenfolge:
  9a — Content Builder (Textverwaltung über NWObjects)
  9b — Design Builder (Token-Verwaltung über NWObjects)
  9c — Method Builder (Fragenverwaltung über NWObjects)
  9d — Module Builder (Modulregistrierung über NWObjects)
  9e — Dashboard Builder (Widget-Registrierung)
  9f — NeuroPlay Builder (nach erfolgreicher CASE-002-Migration)
```

Jeder Builder wird nach Aktivierung gegen seinen Anwendungsfall validiert (Smoke-Test).

---

## Kapitel 15 — Phase 10: Abschluss und Contract

### 15.1 Contract-Phase

Erst nach vollständiger Validierung aller Phasen werden die alten Direktfelder entfernt:

| Altes Feld | Entfernt nach Phase |
|-----------|-------------------|
| `questions.question_text` (direkt) | Phase 2 vollständig validiert |
| `result_rules.color` (direkt HEX) | Phase 1 vollständig validiert |
| `result_rules.description` (direkt) | Phase 2 vollständig validiert |
| `methods.name` (direkt) | Phase 2 vollständig validiert |

**Regel:** Ein direktes Feld wird erst entfernt, wenn alle Referenzen auf das entsprechende NWObject zeigen und keine Anwendungsschicht mehr das Direktfeld liest.

---

## Kapitel 16 — Versionierungsstrategie

### 16.1 Migrationsversionen

Jede Phase erhält eine Migrationsversionsnummer:

```
MIG-001-P1  — Phase 1: Design-Tokens
MIG-001-P2  — Phase 2: Content
MIG-001-P3  — Phase 3: Methoden
...
MIG-001-P10 — Phase 10: Contract
```

### 16.2 Objektversionen während der Migration

Wenn ein bestehendes Objekt auf NWObject migriert wird:
- Es erhält `version: "1.0.0"` und `status: PUBLISHED`
- Das ursprüngliche Objekt erhält das Tag `migrated_to: [NWObject-Code]`
- Historische Referenzen bleiben auf das Originalobjekt zeigend (unveränderlich)
- Neue Referenzen zeigen auf das NWObject

### 16.3 Kompatibilitätsgarantie

Während der gesamten Migration (Phasen 1–10) gelten gleichzeitig:
- **Alte Felder** werden von bestehenden Clients gelesen
- **Neue NWObject-Referenzen** werden von neuen Builder-Schnittstellen gelesen

Keine Downtime. Kein Breaking Change für bestehende Clients.

---

## Kapitel 17 — Rückwärtskompatibilität

### 17.1 Kompatibilitätsmatrix

| Client | Verhält sich nach Migration wie |
|--------|---------------------------------|
| Bestehende App (engine.js) | Unverändert — liest weiterhin direkte Felder |
| Method Builder (neu) | Liest NWObject-Referenzen |
| Module Builder (neu) | Liest NWObject-Struktur |
| Legacy Queries (direkte Felder) | Weiterhin gültig bis Phase 10 |

### 17.2 Deprecation-Regel

Ein direktes Feld wird als `deprecated` markiert, sobald das entsprechende NWObject-Referenzfeld befüllt ist. Deprecation-Datum: 60 Tage nach Markierung.

---

## Kapitel 18 — Rollback-Strategie

### 18.1 Rollback-Prinzip

Jede Phase ist einzeln rückrollbar. Das Expand–Migrate–Contract-Muster garantiert: Neue Felder können entfernt werden, ohne alte Daten zu beschädigen.

### 18.2 Rollback-Schritte pro Phase

| Phase | Rollback-Aktion |
|-------|----------------|
| Phase 1 | DESIGN_TOKEN NWObjects löschen — bestehende Direktfelder weiterhin gültig |
| Phase 2 | CONTENT NWObjects löschen — Direkttexte weiterhin in Elternobjekten |
| Phase 3 | METHOD/QUESTION/ANSWER_OPTION/SCORING_RULE NWObjects löschen |
| Phase 4 | MODULE NWObjects löschen — pkg_modules unverändert |
| Phase 6 | Neue Referenzfelder in checkins entfernen — checkins selbst unverändert |
| Phase 8 | CONSENT/CONVERSATION Collections löschen — kein Datenverlust für Stammdaten |
| Phase 10 | Nicht rollbar — Contract ist final. Deshalb: Phase 10 erst nach Vollvalidierung. |

### 18.3 Rollback-Auslöser

Ein Rollback wird ausgelöst, wenn:
- Ein Smoke-Test nach einer Phase fehlschlägt
- Ein bestehender Client nicht mehr korrekt funktioniert
- Datenverlust festgestellt wird (Zero-Tolerance)

---

## Kapitel 19 — Validierung nach der Migration

### 19.1 Validierungsschema pro Phase

Nach jeder Phase wird geprüft:

```
V1 — Vollständigkeit: Alle Objekte migriert?
V2 — Referenzen: Alle Referenzen auflösbar?
V3 — Integrität: Keine Informationen verloren?
V4 — Funktionalität: Smoke-Tests weiterhin grün?
V5 — Redundanzfreiheit: Keine Information doppelt?
```

### 19.2 Vollständige Smoke-Tests nach jeder Phase

```
ST-PHASE-1  Check-in vollständig durchführbar     → MUSS GRÜN
ST-PHASE-2  Ergebniszone korrekt berechnet        → MUSS GRÜN
ST-PHASE-3  Verlauf anzeigbar                     → MUSS GRÜN
ST-PHASE-4  Datenisolation aktiv                  → MUSS GRÜN
ST-PHASE-5  Historische Sessions unverändert      → MUSS GRÜN
ST-PHASE-6  Design korrekt referenziert           → MUSS GRÜN
ST-PHASE-7  Builder erzeugt valides NWObject      → MUSS GRÜN (ab Phase 9)
```

---

## Kapitel 20 — Risiken

| Risiko | Wahrscheinlichkeit | Auswirkung | Gegenmaßnahme |
|--------|-------------------|-----------|--------------|
| Referenz nicht auflösbar | MITTEL | Check-in defekt | Direktfeld als Fallback bis Phase 10 |
| Performance-Einbruch durch mehr Referenzen | GERING | Langsame Ladezeit | Abfragen optimieren, Caching |
| Historische Session zeigt falschen Wert | GERING | Vertrauensverlust | NIEMALS bestehende Werte überschreiben |
| Builder überschreibt migrierten Wert | MITTEL | Datenverlust | Write-Lock auf migrierten Stammdaten |
| Phase 10 zu früh ausgeführt | HOCH | Breaking Change | Checkliste zwingend, Review-Schritt |

---

## Kapitel 21 — Checklisten

### 21.1 Checkliste vor jeder Phase

```
□ Backup der Zieldatenbank erstellt
□ Smoke-Tests für Ausgangszustand bestanden
□ Rollback-Plan dokumentiert
□ Migrations-Protokoll-Eintrag vorbereitet
□ Testumgebung (DEV) isoliert von LIVE
```

### 21.2 Checkliste nach jeder Phase

```
□ V1 Vollständigkeit geprüft
□ V2 Referenzen geprüft
□ V3 Integrität geprüft
□ V4 Smoke-Tests bestanden
□ V5 Redundanzfreiheit bestätigt
□ Migrations-Protokoll abgeschlossen
□ Ergebnis: BESTANDEN / ROLLBACK
```

### 21.3 Checkliste vor Phase 10 (Contract)

```
□ ALLE Phasen 1–9 vollständig validiert
□ ALLE Smoke-Tests grün
□ KEIN Client liest noch direkte Felder
□ Deprecation-Zeitraum abgelaufen
□ Schriftliche Freigabe für Phase 10
□ Zweites unabhängiges Review durchgeführt
```

---

## Kapitel 22 — Migrationsprotokolle

Jede abgeschlossene Migrationsphase wird als Protokoll-Eintrag gespeichert:

```json
{
  "migration_code": "MIG-001-P1",
  "phase": 1,
  "description": "Design-Tokens als NWObjects migriert",
  "executed_at": "2026-07-24T10:00:00Z",
  "objects_migrated": 16,
  "objects_referenced": 5,
  "smoke_tests": { "passed": 5, "total": 5 },
  "result": "BESTANDEN",
  "rollback_available": true,
  "executed_by": "NeuroWays Core Team"
}
```

---

## Kapitel 23 — Akzeptanzkriterien

Dieser Migrationsstandard gilt als abgeschlossen, wenn:

1. ✅ Alle 10 Migrationsphasen definiert und mit Checklisten versehen sind
2. ✅ Rückwärtskompatibilität für alle Phasen garantiert ist
3. ✅ Rollback-Strategie für jede Phase vorhanden ist
4. ✅ Historische Betriebsdaten explizit als unveränderlich geschützt sind
5. ✅ Validierungsschema (V1–V5) für jede Phase definiert ist
6. ✅ Smoke-Tests für jede Phase beschrieben sind
7. ✅ Risiken und Gegenmaßnahmen dokumentiert sind
8. ✅ Contract-Phase nur nach vollständiger Validierung möglich ist
9. ✅ Migrations-Protokollformat definiert ist
10. ✅ Kein Core-Eingriff erforderlich ist

---

## Kapitel 24 — Roadmap

### Unmittelbar (v0.8.0)
| Schritt | Ziel |
|---------|------|
| Phase 0 — Bestandsaufnahme | Abgeschlossen (NW-VALIDATE-CASE-001/002) |
| Phase 1 — Design-Tokens | Nächster Schritt |
| Phase 2 — Content | Parallel zu Phase 1 vorbereitbar |

### Kurzfristig (v0.9.0)
| Schritt | Ziel |
|---------|------|
| Phasen 3–5 | Methoden, Module, Navigation als NWObjects |
| Phase 8 | CONSENT und CONVERSATION einführen |
| NeuroPlay Builder (NW-CB-011) | Nach Phasen 3–5 |

### Mittelfristig (v1.0.0)
| Schritt | Ziel |
|---------|------|
| Phasen 6–7 | Sessions mit NWObject-Referenzen |
| Phase 9 | Alle Builder aktiv |
| Phase 10 | Contract — direkte Felder entfernt |
| NW-CORE-OBJECT-001 v1.1.0 | CONVERSATION + CONSENT offiziell |

---

*NW-MIGRATION-001 — NeuroWays Migration Standard — v1.0.0 — draft — 2026-07-24*
