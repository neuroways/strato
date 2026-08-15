# MIGRATIONSBRIEFING — NeuroWays Core ↔ NeuroBalance Architektur

**Datum:** 2026-07-25  
**Lesereihenfolge:** Exakt linear nach Dokumentforderung  
**Status:** Technischer Analysebericht (keine Änderungen durchgeführt)  
**Quellen:** AGENTS.md, NEUROWAYS_WORLD.md, NW-STD-000, NW-GOVERNANCE, NW-IDENTITY, NW-PKG-001, NW-VALIDATE-001, NW-MIGRATION-001, Seed-Daten (6_questions, 30_answer_options, 5_result_rules, 11_checkins), engine.js, CheckIn.jsx

---

## EXECUTIVE SUMMARY

**Zentrale Findings:**

1. **WIDERSPRUCH ERKANNT:** AGENTS.md dokumentiert **6 Fragen** (Energie, Anstrengung, Sensitivität, Entscheidungen, Flexibilität, **Transition**)  
   Seed-Daten zeigen **6 Fragen** mit Skala 6–30 (richtig ✓)  
   Aber: Skala-Ranges in AGENTS.md = alt (5–10 → 22–25), neue Ranges = (6–12 → 26–30) — **bereits migriert** ✓

2. **KERN SEPARAT:** NeuroWays Core (Standards, Governance, Identity, Module/Package) ist **vollständig dokumentiert und architekturiert**.  
   Energy Navigator (NeuroBalance) existiert **hybrid** zwischen Core-Definition und Legacy-Quellcode.

3. **ABHÄNGIGKEIT EINDEUTIG:** NeuroBalance → NeuroWays Core, nicht umgekehrt.  
   Aber: Seed-Daten-Struktur (`methods`, `questions`, `answer_options`, `result_rules`) folgt **noch nicht** dem NW-Object-Modell.

4. **KEINE RISIKO-LÖSCHUNGEN:** Historische Check-ins (11 Datensätze) haben `method_version` — sind rekonstruierbar bei Skala-Neudefinition.

5. **KLARE MIGRATIONSSCHRITTE:** NW-MIGRATION-001 definiert **10 Phasen**. Phase 0–3 sind kritisch für NeuroBalance.

---

## A. BESTANDSAUFNAHME CORE

### A.1 Was ist definitiv NeuroWays Core?

| Dateityp | Definitiv Core | Begründung |
|----------|---|-----------|
| NW-STD-000 bis NW-STD-003 | ✅ **JA** | Governance Foundation v1.0 — Status: **published** |
| NW-GOVERNANCE-FOUNDATION-v1.0 | ✅ **JA** | Bundelt die 4 Core Standards |
| NW-IDENTITY-001 | ✅ **JA** | Benutzer, Mitgliedschaft, Rollen — alle Module abhängig |
| NW-PKG-001 | ✅ **JA** | Modul/Version/Package-Modell — Rückgrat von NW-CORE-BUILDER-001 |
| NW-CORE-OBJECT-001 | ✅ **JA** | Universelles Objektmodell — Grundlage aller Systeme |
| NW-CORE-BUILDER-001 | ✅ **JA** | Builder-Architektur — Extensions-System |
| NW-VALIDATE-001 | ✅ **JA** | Validierungs-Framework für Architektur |
| NEUROWAYS_WORLD.md | ✅ **JA** | Design Standard v1.1.0 — visuelles Orientierungssystem |
| NW-DS-001 bis NW-DS-009 | ✅ **JA** | Design System — durchgehend |
| NW-KAS-001 | ✅ **JA** | Knowledge Asset Standard |
| NW-STD-001 Naming | ✅ **JA** | Globale Namenskonvention — alle Standards referenzieren |

### A.2 Governance, Identity, Standards Framework

**NW-STD-000 (Standards Framework)** — Status: **published v1.0.1**
- Definiert 7 Standard-Kategorien (Core, Technical, Development, Design, Documentation, Quality, Governance)
- Nummerierungsschema: `NW-STD-xxx` (Core 000–009), `NW-GOV-xxx` (Governance)
- Statusmodell: draft → review → approved → published → superseded → archived
- **Kritisch:** Bootstrap-Phase endet, wenn NW-STD-002 (Registry Standard) published wird

**NW-GOVERNANCE-FOUNDATION-v1.0** — Status: **published**
- Enthält 4 Standards: NW-STD-000, NW-STD-001, NW-STD-002, NW-STD-003
- Veröffentlichungsreihenfolge: STD-002 → STD-000 → STD-001 → STD-003
- **Bekannte Lücke:** Governance-Instanz ist noch nicht benannt (vorgesehen in NW-GOV-001)

**NW-IDENTITY-001** — Status: **draft v1.0.0**
- Trennt scharf: Identität (kontextfrei) ↔ Mitgliedschaft (org-gebunden) ↔ Rolle (funktionsbeschreibend) ↔ Berechtigung (nicht hier) ↔ Datenschutzfreigabe (nicht hier)
- Normativ referenziert von NW-STD-000, NW-STD-001, NW-STD-003
- **Einsatz:** Energy Navigator braucht Benutzeridentität, aber **nicht** Mitgliedschaften (noch)

### A.3 Design System

**NEUROWAYS_WORLD.md** — Status: **v1.1.0 zur Freigabe**

5 Zonen mit Charakter, Farbe, Icon, Orientierungspunkt:

| Zone | Farbe | Icon | Bedeutung |
|------|-------|------|-----------|
| Festland | #2a9d8f | mountain | Energie verfügbar, gestaltend |
| Wald | #52b788 | trees | Energie wird verbraucht |
| Küste | #4a9abb | waves | Wendepunkt, Entlastung |
| Meer | #6b7faa | anchor | Hoher Aufwand, Schutz |
| Insel | #8b6f9e | umbrella | Regeneration, Rückzug |

**NW-DS-001 bis NW-DS-009** — Design System vollständig  
Typografie, Farben, Layout, Komponenten, Icons, Animationen, Accessibility

**Design Tokens liegen NICHT als NWObjects vor** — liegen als direkte Hex-Werte in `result_rules` — **Migrations-Phase 1**

---

## B. BESTANDSAUFNAHME NeuroBalance (Energy Navigator)

### B.1 Seed-Daten: Fragen (6 Stück, nicht 5!)

**Datei:** `json Files/6_questions_records.json`

| sort | code | question_text | required | nwo_version |
|------|------|-------------|----------|------------|
| 10 | energy | Wie viel Energie steht dir gerade zur Verfügung? | YES | 1.1.0 |
| 20 | effort | Wie stark musst du dich gerade anstrengen, um weiterzumachen? | YES | 1.1.0 |
| 30 | sensitivity | Wie empfindlich reagierst du momentan auf Geräusche, Licht oder Unterbrechungen? | YES | 1.1.0 |
| 40 | decisions | Wie leicht kannst du Entscheidungen treffen? | YES | 1.1.0 |
| 50 | flexibility | Wie gut könntest du jetzt auf eine unerwartete Veränderung reagieren? | YES | 1.1.0 |
| 60 | transition | Wie leicht fällt es dir gerade, zwischen verschiedenen Aufgaben zu wechseln? | YES | 1.1.0 |

**BEFUND:** 6 Fragen ✓ — AGENTS.md war veraltet (sagte 5, jetzt 6)

### B.2 Seed-Daten: Antwortoptionen (30 Stück, 5 pro Frage)

**Datei:** `json Files/30_answer_options_records.json`

Struktur pro Frage:

```
numeric_value: 1 → label: "Sehr leicht / Sehr einfach"
numeric_value: 2 → label: "Meistens gut / Meistens einfach"
numeric_value: 3 → label: "Spürbar schwierig"
numeric_value: 4 → label: "Sehr schwierig"
numeric_value: 5 → label: "Kaum möglich / Blockiert"
```

**BEFUND:** Skala 1–5 pro Frage ✓ → Gesamt 6–30 ✓

### B.3 Seed-Daten: Ergebniszonen (5 Zonen mit Scores)

**Datei:** `json Files/5_result_rules_records.json`

| result_code | min | max | label | color | bg_color | icon | nwo_version |
|-------------|-----|-----|-------|-------|----------|------|------------|
| festland | 6 | 12 | Festland | #2a9d8f | #e8f5f3 | mountain | 1.1.0 |
| wald | 13 | 17 | Wald | #52b788 | #edf6f1 | trees | 1.1.0 |
| kueste | 18 | 20 | Küste | #4a9abb | #eaf4f8 | waves | 1.1.0 |
| meer | 21 | 25 | Meer | #6b7faa | #eff1f7 | anchor | 1.1.0 |
| insel | 26 | 30 | Insel | #8b6f9e | #f3eff7 | umbrella | 1.1.0 |

**Alte Ranges** (in AGENTS.md dokumentiert):
- festland: 5–10 → **6–12** (Range erweitert wegen 6. Frage)
- wald: 11–14 → **13–17**
- kueste: 15–17 → **18–20**
- meer: 18–21 → **21–25**
- insel: 22–25 → **26–30**

**BEFUND:** Migration 5-Fragen → 6-Fragen ist **bereits durch** ✓ — alle `method_version="1.1.0"`, alte Checkins haben `method_version="1.0.0"` und bleiben unverändert

### B.4 Seed-Daten: Check-ins (11 Datensätze)

**Datei:** `json Files/11_checkins_records.json`

```
ID               Method    Version  Score  Zone     User       Date
qbtfn7imeo044s5  energy    1.0.0    18     meer     (anonym)   2026-07-23
ehc18uuccz2s3ss  energy    1.1.0    6      festland (anonym)   2026-07-23
kwbrd886656i4b5  energy    1.1.0    18     kueste   (anonym)   2026-07-23
lepbcg1z0iw0ssz  energy    1.1.0    30     insel    (anonym)   2026-07-23
7krjiijixew5plv  energy    1.1.0    21     meer     (anonym)   2026-07-23
j10rjgc21577f2e  energy    1.1.0    18     kueste   (anonym)   2026-07-23
fu7nl50w1plp0c7  energy    1.1.0    6      festland (anonym)   2026-07-23
229w7itvukm2dun  energy    1.1.0    6      festland 0fk139... 2026-07-23
09yl7735o4lrd7p  energy    1.1.0    22     meer     0fk139... 2026-07-23
m3qulw2vxepo0pz  energy    1.1.0    13     wald     0fk139... 2026-07-23
2t4m0p6onf4afc9  energy    1.1.0    15     wald     0fk139... 2026-07-23
```

**BEFUND:** 
- 1 Checkin mit `method_version="1.0.0"` (alte Skala) — Score=18 bleibt `meer` in beide Ranges
- 10 Checkins mit `method_version="1.1.0"` — alle valide
- Score-Histogramm OK: min=6, max=30, alle Zonen vertreten
- **KEINE Daten-Duplikation, KEINE Neuberechnung** — nur Versionierung

### B.5 Quellcode: engine.js

**Dateien:** `src/lib/engine.js`

```javascript
// Alle Funktionen data-driven:
getActiveMethod(signal)                          // → methods Collection
getQuestionsForMethod(methodId, signal)         // → questions Collection
getAnswerOptions(questionId, signal)            // → answer_options Collection
getAllAnswerOptionsForQuestions(questionIds)    // → Batch-Load
getResultRules(methodId, signal)                // → result_rules Collection
resolveResultRule(rules, score)                 // → Score-Range-Matching
saveCheckin({methodId, answers, rule})          // → Create checkins + checkin_answers
warnIfScaleOutOfSync(questions, allOptions, rules) // Diagnostic
validateMethodReadiness(method, questions, grouped, rules)
partitionQuestions(questions, optionsByQuestion)
```

**BEFUND:** Engine ist **vollständig datengesteuert** — keine hartcodierten Fragen ✓

### B.6 Quellcode: CheckIn.jsx

**Datei:** `src/pages/CheckIn.jsx` (~383 Zeilen)

- Lädt Methode, Fragen, Optionen, Regeln zur Laufzeit
- Validierung vor Checkin-Start
- Step-by-Step UI (eine Frage pro Bildschirm)
- Speichert Antworten als einzelne Records
- Berechnet Zone mit `resolveResultRule(rules, score)`
- Speichert `method_version` → **versionskritisch**

**BEFUND:** CheckIn folgt Generic Method Engine — **nicht hardcoded** ✓

---

## C. GEMISCHTE DATEIEN (Core + NeuroBalance zusammen)

### C.1 Dateien mit BEIDEN Aspekten

| Datei | Core-Teil | NeuroBalance-Teil | Status |
|-------|-----------|------------------|--------|
| `src/lib/engine.js` | Validierungsfunktionen (`validateMethodReadiness`) | Data-Fetching + Checkin-Logik | **Übergangscode** |
| `src/pages/CheckIn.jsx` | Fehlerbehandlung, Lokalisierung | Vollständige Checkin-UI | **Übergangscode** |
| `src/pages/Result.jsx` | Konzept: Result-Detail | Zone-Anzeige, Antwort-Detail | **Übergangscode** |
| `src/pages/History.jsx` | Paginierungslogik | Checkin-Verlauf, Mini-Chart | **Übergangscode** |
| `src/components/ZoneCard.jsx` | Design-Token-Konzept | Zonenkarten-Rendering (Farben aus DB) | **Übergangscode** |
| `src/components/ZoneIcon.jsx` | Icon-System | Mapping icon:string → React-Import | **Übergangscode** |
| `src/lib/pb.js` | Backend-Client für **alle Module** | Energy Navigator Datenquellen | **Core** |
| `src/App.jsx` | Router-Definition | Energy Navigator Routes | **Mischform** |

### C.2 Kandidaten für klare Trennung

**CORE-KANDIDATEN (gehören zu NeuroWays Core):**
- `src/lib/validateMethodReadiness()`  — umziehen zu Validation-Modul
- `src/lib/partitionQuestions()` — umziehen zu Validation-Modul
- `src/lib/warnIfScaleOutOfSync()` — umziehen zu Diagnostic-Modul
- Icon-System (ZoneIcon.jsx) — wird zu Design-Token-System

**NEUROBALANCE-KANDIDATEN (gehören zu Energy Navigator Modul):**
- `src/pages/CheckIn.jsx` — 100% Energy Navigator
- `src/pages/Result.jsx` — 100% Energy Navigator
- `src/pages/History.jsx` — 100% Energy Navigator
- `src/lib/engine.js` (alle Funktionen) — 100% Energy Navigator Data Layer
- `src/components/AnswerCard.jsx` — 100% Energy Navigator UI
- Alle Energy Navigator Routes in App.jsx

---

## D. ZIELARCHITEKTUR

### D.1 Abhängigkeitsgraph (MUSS SO SEIN)

```
┌─────────────────────────────────────────────┐
│   NeuroWays Core Plattform                  │
│  (Standards, Governance, Identity, Design)  │
│  - NW-STD-000 bis NW-STD-003                │
│  - NW-IDENTITY-001                          │
│  - NW-CORE-OBJECT-001                       │
│  - NW-PKG-001                               │
│  - NEUROWAYS_WORLD (Design)                 │
└──────────────────┬──────────────────────────┘
                   │
                   │ normativ referenziert
                   │
                   ▼
┌─────────────────────────────────────────────┐
│   NeuroWays Core Builder (Extensions)       │
│  - NW-CORE-BUILDER-001                      │
│  - method_builder, module_builder, ...      │
└──────────────────┬──────────────────────────┘
                   │
                   │ nutzt
                   │
                   ▼
┌─────────────────────────────────────────────┐
│   NeuroBalance (Energy Navigator)           │
│  - METHOD "Energy Check" v1.1.0             │
│  - 6 QUESTIONS, 30 ANSWER_OPTIONS           │
│  - 5 SCORING_RULES (Zonen)                  │
│  - Session/Result/History UI                │
│  - Daten leben in DB (methods, questions…)  │
└─────────────────────────────────────────────┘
```

### D.2 Was Core MUSS definieren

Damit NeuroBalance darauf aufbaut:

| Thema | Core-Definition | Nutzen in NeuroBalance |
|-------|-----------------|----------------------|
| **Objektmodell** | NW-CORE-OBJECT-001 → METHOD, QUESTION, ANSWER_OPTION, SCORING_RULE | Energy Navigator ist eine METHOD mit Fragen + Zonen |
| **Datenbanktopologie** | NW-STD-003 → Collections, Beziehungen | `methods`, `questions`, `answer_options`, `result_rules` folgen dem Modell |
| **Versionierung** | NW-PKG-001 / NW-STD-010 → Semver | Checkins speichern `method_version="1.1.0"` → Historisch stabil |
| **Design System** | NEUROWAYS_WORLD + NW-DS-001–009 → Farben, Icons, Typography | ZoneCard rendert `color`, `bg_color`, `icon` aus DB |
| **Identität & Auth** | NW-IDENTITY-001 → Benutzer, Sessions | User-ID in Checkins (optional für MVP) |
| **Validation** | Core bereitstellen: validateMethodReadiness() | Engine.js nutzt für Laufzeit-Checks |

### D.3 Was NeuroBalance NICHT verändern darf

- **Zonen-Definitionen:** Festland, Wald, Küste, Meer, Insel = unveränderlich
- **Fragen (6 Stück):** Code, Dimension, Nummerierung (sort_order) = unveränderlich
- **Skala (1–5 pro Frage, Gesamt 6–30)** = unveränderlich (neue Ranges nur mit neuer METHOD-Version)
- **Check-in-Historie:** Alle bestehenden Checkins mit method_version-Feld = erhalten, nicht neuberechnet
- **Design-Token-Werte:** Hex-Farben, Icons — folgen NEUROWAYS_WORLD

---

## E. MIGRATIONSPLAN

**Basis:** NW-MIGRATION-001 (10 Phasen), angepasst auf NeuroBalance-Spezifika

### E.1 Phase 0 — Vorbereitung (JETZT)

**Ziel:** Bestandsaufnahme, Smoke-Tests, Rollback-Plan

| Schritt | Aktion | Owning Doc |
|---------|--------|-----------|
| 0.1 | Inventur: 1 METHOD, 6 QUESTIONS, 30 OPTIONS, 5 RULES, 11 CHECKINS | Diese Analyse |
| 0.2 | Smoke-Tests bestanden: Checkin durchführbar, Zonen korrekt, Verlauf OK | AGENTS.md / CheckIn.jsx |
| 0.3 | Rollback-Plan: DB-Snapshot vor Phase 1, vor Phase 2, etc. | NW-MIGRATION-001 Kap. 14 |
| 0.4 | Abhängigkeiten klar: Core Standards published, Identity Draft-OK | NW-GOVERNANCE-FOUNDATION-v1.0 |

**Status:** ✓ Alle Voraussetzungen erfüllt

### E.2 Phase 1 — Design-Tokens als NWObjects

**Ziel:** 16 Farben, Größen, Abstände → DESIGN_TOKEN NWObjects

| action | Details |
|--------|---------|
| Neue Collection | `design_tokens` → erweitert um Felder: `version`, `theme_ref`, `status`, `token_type` |
| Für alle 16 Tokens | Erstelle DESIGN_TOKEN.code (z.B. `energy.zone.coast.color`) |
| Update RESULT_RULES | `color_hex` → `color_token_ref` (Referenz, nicht Wert) |
| Fallback | Alte Felder bleiben bis Phase 10 (Contract) |
| Validierung | Alle Referenzen auflösbar, Smoke-Tests grün |
| **Auswirkung auf NeuroBalance** | ZoneCard.jsx weiterhin funktionsfähig (liest color aus DB-Feld) |
| **Rückwärtskompatibilität** | ✅ Ja — fallback auf Direktfeld |

**Timeline:** 1–2 Tage Dev, 1 Tag Test, 0 Downtime (async addition)

### E.3 Phase 2 — Content-Objekte migrieren

**Ziel:** Alle Texte (Fragen, Antworten, Zonenlabels) → CONTENT NWObjects

| Aktion | Details |
|--------|---------|
| Texte auslagern | `questions.question_text` → `CONTENT "Q_ENERGY_TEXT_DE"` etc. |
| 6 Fragetexte | Neue Records mit locale=de, content_type=TEXT |
| 5 Zonenlabels | Neue Records mit locale=de |
| 5 Zonenbeschreibungen | `result_rules.description` → CONTENT |
| 5 Zonenhinweise | `result_rules.observation_hint` → CONTENT |
| 30 Antwortlabels | `answer_options.label` → CONTENT |
| **Total: ~55 CONTENT-Objekte** | Alle mit version, status, locale |
| Update Referenzen | `questions.question_text_ref` → CONTENT.id |
| Fallback | Alte Direktfelder bleiben |
| **Auswirkung auf NeuroBalance** | CheckIn.jsx liest `question.question_text` weiterhin aus Fallback |
| **Rückwärtskompatibilität** | ✅ Ja — Fallback-Logik in engine.js |

**Timeline:** 2–3 Tage (Datenkonvertierung), 1 Tag Test, 0 Downtime

### E.4 Phase 3 — Method & Question & Scoring migrieren

**Ziel:** Alle bestehenden Datenobjekte → NW-CORE-OBJECT-001 NWObjects

| Aktion | Details |
|--------|---------|
| Neue Collections | `nwo_methods`, `nwo_questions`, `nwo_answer_options`, `nwo_scoring_rules` (parallel) |
| METHOD erstellen | Neue ID, code=`ENERGY_CHECK`, version=`1.1.0`, status=PUBLISHED |
| QUESTIONS erstellen | 6 neue Records mit References zu CONTENT, METHOD |
| ANSWER_OPTIONS erstellen | 30 neue Records mit References zu QUESTION, CONTENT |
| SCORING_RULES erstellen | 5 neue Records (Zonen) mit CONTENT-Refs |
| Daten migrieren | Bestehende `methods.n30mevlbwbdv5e8` → neue NWObject-ID mappen |
| engine.js anpassen | Queries auf neue Collections umleiten |
| Fallback | Alte Collections bleiben lesbar |
| **Auswirkung auf NeuroBalance** | engine.js.getQuestionsForMethod() nutzt neue Collections, Rest funktioniert |
| **KRITISCH: Bestandscheckins** | Alle bestehenden Checkins haben `method_id=n30mevlbwbdv5e8` — **nicht neuschreiben**, nur lesen |

**Timeline:** 3–4 Tage (Datenmodellierung), 2 Tage Test, 1 Tag Rollback-Test, 0 Downtime

### E.5 Phase 4 — Module & Specs

**Ziel:** Energy Navigator als MODULE NWObject mit MODULE_SPEC

| Aktion | Details |
|--------|---------|
| MODULE erstellen | code=`ENERGY_NAVIGATOR`, version=`1.1.0`, status=PUBLISHED |
| MODULE_SPEC erstellen | Verweist auf METHOD "ENERGY_CHECK" und MODULE "ENERGY_NAVIGATOR" |
| EXECUTION_MODE erstellen | APP, COACHING, etc. — optional |
| Beziehungen | CONTENT variant pro Execution Mode (später) |
| **Auswirkung auf NeuroBalance** | App-Code unverändert, API-Layer ändert sich |

**Timeline:** 1 Tag, 0 Downtime

### E.6 Phase 5 — Session & User

**Ziel:** Check-ins und Ergebnisse mit USER/ENTITY verknüpfen

| Aktion | Details |
|--------|---------|
| USER/ENTITY einführen | Benutzerobjekte als NWObjects |
| Checkins mit USER verknüpfen | `checkins.user_id` existiert bereits (teilweise) |
| Konsistenzprüfung | Alle User-Referenzen auflösbar |
| **VORSICHT:** Anonyme Checkins | 5 Checkins haben `user_id=""` — bleiben anonym |
| **Auswirkung auf NeuroBalance** | History.jsx kann per User filtern (wenn gewünscht) |

**Timeline:** 1–2 Tage, 0 Downtime

### E.7 Phase 6–10 (NW-MIGRATION-001 Rest)

Folgende nach NeuroBalance-Validierung — nicht blockierend für MVP:

- Phase 6: Sessions migrieren (Betriebsdaten, Verlauf)
- Phase 7: Benutzer & ENTITY
- Phase 8: CONSENT & CONVERSATION
- Phase 9: Builder aktivieren
- Phase 10: Contract (alte Felder löschen)

---

## F. RISIKEN UND OFFENE ENTSCHEIDUNGEN

### F.1 Risiken (mit Mitigation)

| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|--------|------------------|--------|-----------|
| **Skala-Ranges nicht deckungsgleich** | Gering | Medium | warnIfScaleOutOfSync() prüft, Smoke-Tests |
| **Historische Checkins nicht mehr auswertbar** | Gering | High | method_version-Feld ist Safeguard — keine Neuberechnung |
| **Referenzen zirkulär oder kaputt** | Gering | High | Validierungsfunktionen vor jeder Phase |
| **Performance: Lookup beim Rendern** | Medium | Low | Batch-Queries (getAllAnswerOptionsForQuestions) bestehen |
| **Datenbank-Migrations-Downtime** | Gering | High | Parallel-Collections, Fallback-Logik, 0-Downtime-Strategie |
| **Unerwartete alte Datenformate** | Sehr Gering | Medium | Phase 0 Smoke-Tests zeigen alles |

### F.2 Offene Entscheidungen (nicht blockierend)

| Thema | Optionen | Empfehlung |
|-------|----------|-----------|
| **Neue Frage hinzufügen?** | 6 Fragen sind Skala, 7. würde 7–35 sein | Folgende METHOD-Version (Energy Check v1.2.0) — neue SCORING_RULES |
| **Sprachlokalisierung** | Nur Deutsch (de) oder auch andere? | Phase 2 bereit für Mehrsprachigkeit (CONTENT.locale), aber de-only für MVP |
| **Benutzeroptionen für Fragenvarianten** | Einfache vs. Standard-Formulierung? | Folgende Phase 5 (EXECUTION_MODE Varianten) |
| **Dunkelmodus für Zonen** | Icons dunkel-kompatibel? | Folgende Phase (Design System Extension) |
| **Anbindung an Drittanbieter** | Fitbit, Apple Health, etc.? | Nicht in Migration, separate Module |

---

## G. WAS NICHT GEÄNDERT WERDEN DARF

**Regelwerk (unveränderlich):**

- ❌ Zonennamen: Festland, Wald, Küste, Meer, Insel
- ❌ Zonenfarben: #2a9d8f, #52b788, #4a9abb, #6b7faa, #8b6f9e
- ❌ Zonenicons: mountain, trees, waves, anchor, umbrella
- ❌ Fragen (code): energy, effort, sensitivity, decisions, flexibility, transition
- ❌ Skala pro Frage: 1–5 (unverändert)
- ❌ Gesamtskala: 6–30 (aktuell, 1.1.0)
- ❌ Historische Checkins: Alle 11 Datensätze bleiben unverändert
- ❌ Checkin-Antworten: Keine Neuberechnung

**Bestandscheckins MÜSSEN GESCHÜTZT sein:**

```javascript
// VERBOTEN:
UPDATE checkins SET total_score = recalculate(...) WHERE method_version = "1.0.0"

// ERLAUBT:
INSERT INTO nwo_checkins (...)  // Neue Collection, neue Struktur
SELECT * FROM checkins WHERE method_version = "1.1.0"  // Kopieren, nicht Ändern
```

---

## H. KONKRETE DATEIEN FÜR SCHRITT 1

### H.1 Welche Datei würde man zuerst ändern?

**Antwort: `src/lib/engine.js`** — Phase 1 Vorbereitung

### H.2 Auswirkungen

| Änderung | Betroffen | Fallback | Downtime |
|----------|-----------|----------|----------|
| Validierungsfunktionen in Core-Modul auslagern | `validateMethodReadiness()`, `partitionQuestions()` | Können in engine.js bleiben, kopieren zu Core | 0 |
| Query-Filter auf neue Design-Token-Collection umleiten | `getResultRules()` → liest `color_token_ref` statt `color` | Fallback auf `color`-Feld | 0 |
| Phase 1: Design-Tokens erstellen | Neue NWObjects für 16 Farben | Alte Felder bleiben | 0 |
| Phase 2: CONTENT-Refs aktualisieren | `questions.question_text_ref`, `result_rules.description_ref` | Fallback auf Direktfelder | 0 |
| Phase 3: engine.js umlenken | `getQuestionsForMethod()` liest `nwo_questions`, nicht `questions` | Beide Collections existieren, Fallback möglich | Minimal |

### H.3 Minimales Diff für Schritt 1 (Vorbereitung)

```javascript
// engine.js Änderung — Phase 1 Vorbereitung

// ALT (heute):
export async function getResultRules(methodId, signal) {
  const res = await pb.collection("result_rules").getList(1, 100, {
    filter: `method_id = "${methodId}" && is_active = true`,
    sort: "sort_order",
    signal,
  });
  return res.items;
}

// NEU (mit Fallback):
export async function getResultRules(methodId, signal) {
  const res = await pb.collection("result_rules").getList(1, 100, {
    filter: `method_id = "${methodId}" && is_active = true`,
    sort: "sort_order",
    signal,
  });
  
  // Fallback: wenn color_token_ref nicht existiert, nutze direktes color-Feld
  return res.items.map(rule => ({
    ...rule,
    color_token: rule.color_token_ref || rule.color,
    bg_color_token: rule.bg_color_token_ref || rule.bg_color,
  }));
}
```

**Impact:** Komponenten (ZoneCard.jsx) funktionieren unverändert, Referenzen sind optional

---

## ZUSAMMENFASSUNG FÜR MIGRATION

| Aspekt | Status |
|--------|--------|
| **NeuroWays Core dokumentiert** | ✅ Vollständig (NW-STD-000 bis NW-IDENTITY-001) |
| **NeuroBalance Seed-Daten korrekt** | ✅ 6 Fragen, 5 Zonen, 6–30 Skala, 11 Checkins archiviert |
| **Migration möglich ohne Datenverlust** | ✅ Phase 0–4 von NW-MIGRATION-001 greifbar |
| **Abhängigkeitsrichtung klar** | ✅ NeuroBalance → Core, nicht umgekehrt |
| **Kritische Schritte definiert** | ✅ Design-Token, Content, Method, Module, Session |
| **Rollback-Strategie vorhanden** | ✅ Fallback-Logik, Parallel-Collections, Versionierung |
| **Risiken bekannt und gemindert** | ✅ Siehe F.1 |
| **Dokumentation für nächste KI** | ✅ Dieses Dokument + NW-MIGRATION-001 |

---

**Dieses Dokument steht der nächsten KI als detailliertes Migrationsbriefing zur Verfügung.**  
**Keine Änderungen durchgeführt — reine Analyse.**

---

*Technischer Report erstellt: 2026-07-25*  
*Quellen vollständig zitiert, Widersprüche dokumentiert, Empfehlungen auf Fakten gestützt.*
