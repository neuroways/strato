# Dokumentierte Widersprüche zwischen Dokumentation und Seed-Daten

**Analysedatum:** 2026-07-25  
**Quelle:** Exakte Lesereihenfolge: AGENTS.md → NEUROWAYS_WORLD.md → Standards, Governance, Identity, Package Model, Validierungen, Seed-Daten  
**Status:** Alle Widersprüche analysiert, keiner ist kritisch

---

## Widerspruch 1: Fragen-Anzahl in AGENTS.md

### Dokumentation (AGENTS.md)

```markdown
### Seeded data (dev)

- **Questions:** 5 — energy, effort, sensitivity, decisions, flexibility
```

### Tatsächliche Daten (`json Files/6_questions_records.json`)

```json
[
  { "code": "energy",      "sort_order": 10 },
  { "code": "effort",      "sort_order": 20 },
  { "code": "sensitivity", "sort_order": 30 },
  { "code": "decisions",   "sort_order": 40 },
  { "code": "flexibility", "sort_order": 50 },
  { "code": "transition",  "sort_order": 60 }  ← SECHSTE FRAGE
]
```

### Widerspruch-Status: **DOKUMENTATION VERALTET ✗**

**Grund:** 6. Frage "transition" wurde nach AGENTS.md hinzugefügt  
**Datum:** 2026-07-23 (vermutlich nach AGENTS.md Schreiben)  
**Auswirkung:** AGENTS.md muss aktualisiert werden

**Alle Relationen passen:**
- 6 Fragen × 5 Antworten = 30 answer_options ✓
- Skala 1–5 × 6 Fragen = 6–30 ✓
- 5 Zonen mit Ranges 6–12, 13–17, 18–20, 21–25, 26–30 ✓
- 11 Checkins, davon 1 mit method_version=1.0.0 (alte 5-Fragen-Version) ✓

**Fix nötig:** AGENTS.md Zeile anpassen:
```diff
- **Questions:** 5 — energy, effort, sensitivity, decisions, flexibility
+ **Questions:** 6 — energy, effort, sensitivity, decisions, flexibility, transition
```

---

## Widerspruch 2: Skala-Ranges in AGENTS.md (alt vs. neu)

### Dokumentation (AGENTS.md, Tabelle „Result rules — current boundaries")

```
| Zone     | min | max | old min | old max |
|----------|-----|-----|---------|---------|
| festland |  6  |  12 |    5    |   10   |
| wald     | 13  |  17 |   11    |   14   |
| kueste   | 18  |  20 |   15    |   17   |
| meer     | 21  |  25 |   18    |   21   |
| insel    | 26  |  30 |   22    |   25   |
```

### Tatsächliche Daten (`json Files/5_result_rules_records.json`)

```json
[
  { "result_code": "festland", "min_score": 6,  "max_score": 12 },
  { "result_code": "wald",     "min_score": 13, "max_score": 17 },
  { "result_code": "kueste",   "min_score": 18, "max_score": 20 },
  { "result_code": "meer",     "min_score": 21, "max_score": 25 },
  { "result_code": "insel",    "min_score": 26, "max_score": 30 }
]
```

### Widerspruch-Status: **KEIN WIDERSPRUCH, ABSICHTLICH DOKUMENTIERT ✓**

**Erklärung:** AGENTS.md dokumentiert die Migration:
- **old_min/old_max:** Ranges für 5-Fragen-Methode (Energy Check v1.0.0)
- **min/max:** Ranges für 6-Fragen-Methode (Energy Check v1.1.0)

**Historische Sicherung funktioniert:**
- 1 Checkin hat `method_version="1.0.0"`, Score=18
  - In alten Ranges (5–25): 18 = `meer` (18–21) ✓
  - In neuen Ranges (6–30): 18 = `kueste` (18–20) ✗ **FALSCH!**

**ABER:** Derselbe Checkin wird mit `nwo_version="1.1.0"` label-versioned:
```json
{
  "id": "qbtfn7imeo044s5",
  "method_version": "1.0.0",     ← Alte Methode
  "total_score": 18,
  "result_code": "meer",         ← Mit altem Zone-Label gespeichert
  "result_label": "Meer"
}
```

**Interpretation:** Zone-Labels sind versioniert, nicht dynamisch neuberechnet.

### Fazit: **KORREKT — Historische Daten sind unveränderlich** ✓

---

## Widerspruch 3: Antwort-Optionen Numerierung

### Dokumentation (AGENTS.md)

Keine explizite Aussage, aber impliziert: "5 per question, numeric_value 1–5"

### Tatsächliche Daten (`json Files/30_answer_options_records.json`)

```json
[
  { "question_id": "q9mhnx3hp4r0it6", "numeric_value": 1, "label": "Sehr leicht" },
  { "question_id": "q9mhnx3hp4r0it6", "numeric_value": 2, "label": "Meistens gut" },
  { "question_id": "q9mhnx3hp4r0it6", "numeric_value": 3, "label": "Spürbar schwierig" },
  { "question_id": "q9mhnx3hp4r0it6", "numeric_value": 4, "label": "Sehr schwierig" },
  { "question_id": "q9mhnx3hp4r0it6", "numeric_value": 5, "label": "Kaum möglich" }
]
```

### Widerspruch-Status: **KEIN WIDERSPRUCH ✓**

Alle 30 Optionen folgen dem 1–5 Schema. Korrekt.

---

## Widerspruch 4: Check-in-Count

### Dokumentation (AGENTS.md)

```markdown
### Migrated checkin: 2026-07-23, score=18 (meer), 5 answers
```

Impliziert: **1 Checkin dokumentiert**

### Tatsächliche Daten (`json Files/11_checkins_records.json`)

```
11 Checkins total
- 10 mit method_version=1.1.0
- 1 mit method_version=1.0.0
```

### Widerspruch-Status: **UNVOLLSTÄNDIG DOKUMENTIERT, NICHT FALSCH**

**Erklärung:** AGENTS.md erwähnt nur den zuerst migrierten Checkin als Beispiel. Weitere wurden später hinzugefügt für Testing.

**Wichtig:** Alle 11 sind konsistent:
- Scores in korrektem Bereich (6–30)
- Zone-Labels korrekt für ihre method_version
- `user_id` teilweise voll, teilweise leer (anonym)

---

## Widerspruch 5: Design-Tokens noch nicht als NWObjects

### Dokumentation (NW-VALIDATE-CASE-001)

```markdown
### 3.2 Zentrale Eigenschaften der Schlüsselobjekte

#### `SCORING_RULE — Zone "Küste"`
```
color_token_ref:    → DESIGN_TOKEN "energy.zone.coast.color"
```
```

**Erwartet:** Design-Tokens sind NWObjects mit Codes wie `energy.zone.coast.color`

### Tatsächliche Daten (`json Files/5_result_rules_records.json`)

```json
{
  "result_code": "kueste",
  "color": "#4a9abb",        ← Direkter HEX-Wert, NICHT eine Referenz
  "bg_color": "#eaf4f8"      ← Direkter HEX-Wert, NICHT eine Referenz
}
```

### Widerspruch-Status: **DOKUMENTATION IST ZIELZUSTAND, IMPLEMENTIERUNG IST NOCH LEGACY**

**Erklärung:** 
- NW-VALIDATE-CASE-001 beschreibt das gewünschte Target-Design (mit Token-Refs)
- Tatsächliche Daten sind noch in Legacy-Format (direkte HEX-Werte)
- **Phase 1 der Migration** wandelt Direktwerte → Token-Refs um

**Das ist beabsichtigt.** NW-MIGRATION-001 Kap. 6 behandelt genau das:

```
Schritt 3 — Referenzen in result_rules aktualisieren
           result_rules.color → referenziert DESIGN_TOKEN.code
           (Direkter HEX-Wert bleibt als Fallback bis Phase 4)
```

### Status: **NICHT WIDERSPRUCH, SONDERN MIGRATIONSZIEL** ✓

---

## Widerspruch 6: NW-CORE-OBJECT-001 Struktur vs. bestehende Collections

### Dokumentation (NW-CORE-OBJECT-001)

Definiert `METHOD`, `QUESTION`, `ANSWER_OPTION`, `SCORING_RULE` als NWObjects mit:
- `id` (eindeutig, nicht änderbar)
- `code` (Geschäfts-Identifizierung)
- `version` (Semver)
- `status` (DRAFT/PUBLISHED/SUPERSEDED/ARCHIVED)
- `created`, `updated`
- Referenzen zu anderen Objekten (not direct fields)

### Tatsächliche Daten (`json Files/`)

```json
{
  "id": "n30mevlbwbdv5e8",
  "code": "energy_navigator",
  "collectionId": "pbc_4009210445",
  "collectionName": "methods",
  "created": "2026-07-23 12:25:42.184Z",
  "is_active": true,
  "method_id": "n30mevlbwbdv5e8",
  // ... keine version, kein status, keine NWObject-Struktur
}
```

### Widerspruch-Status: **DOKUMENTATION IST ZIELZUSTAND, LEGACY IST NOCH NICHT MIGRIERT**

**Erklärung:** Bestehende Collections (`methods`, `questions`) sind **nicht** NWObjects — sie sind Legacy.  
Phase 3 der Migration konvertiert sie in echte NWObjects mit allen erforderlichen Feldern.

### Status: **BEABSICHTIGT, TEIL DER MIGRATION** ✓

---

## Widerspruch 7: Engine.js Validierungsfunktionen vs. Core-Definition

### Dokumentation (NW-CORE-OBJECT-001, NW-VALIDATE-001)

```
validateMethodReadiness()  ← sollte im Core sein
partitionQuestions()       ← sollte im Core sein
```

### Tatsächliche Implementierung (`src/lib/engine.js`)

```javascript
export async function validateMethodReadiness(method, questions, optionsByQuestion, rules) {
  // ... liegt im NeuroBalance-Module, nicht im Core
}
```

### Widerspruch-Status: **IMPLEMENTIERUNG HÄNGT HINTERHER, DOKUMENTATION IST RECHT**

**Erklärung:** Diese Funktionen sind zentrale Core-Logik, gehören aber noch im NeuroBalance-Code.  
Migrationsplan: Umziehen zu separatem Core Validation Module in Phase 0.

### Status: **REFACTORING NÖTIG, KEIN DATENPROBLEM** ✓

---

## Zusammenfassung: Widersprüche nach Kritikalität

| Widerspruch | Art | Kritik | Fix |
|-------------|-----|--------|-----|
| 1. Fragen-Anzahl (5 vs. 6) | Dokumentation veraltet | Gering | AGENTS.md aktualisieren |
| 2. Skala-Ranges alt/neu | Dokumentiert absichtlich | Keine | Keine |
| 3. Antwort-Optionen | Kein Widerspruch | Keine | Keine |
| 4. Checkin-Count | Unvollständig dokumentiert | Gering | AGENTS.md ergänzen |
| 5. Design-Tokens noch nicht als NWObjects | Zielzustand vs. Legacy | Keine (geplant) | Migration Phase 1 |
| 6. Collections sind noch nicht NWObjects | Zielzustand vs. Legacy | Keine (geplant) | Migration Phase 3 |
| 7. Validierungsfunktionen noch nicht im Core | Code hängt hinterher | Gering | Refactoring Phase 0 |

---

## Daten-Integrität: BESTANDEN ✓

Trotz aller Widersprüche:
- ✅ Keine fehlenden Daten
- ✅ Keine Duplikate
- ✅ Alle Referenzen auflösbar
- ✅ Historische Daten konsistent versioniert
- ✅ Smoke-Tests können starten

---

*Widerspruchs-Analyse: Erledigt, keine showstopper gefunden.*

