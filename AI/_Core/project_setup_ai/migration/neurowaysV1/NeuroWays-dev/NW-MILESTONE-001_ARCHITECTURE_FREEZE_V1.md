# NW-MILESTONE-001 – Architecture Freeze v1.0

**Dokumentcode:** NW-MILESTONE-001  
**Titel:** Architecture Freeze v1.0  
**Version:** 1.0.0  
**Status:** published  
**Erstellt:** 2026-07-24  
**Bereich:** NeuroWays Core / Governance  
**Referenzen:** NW-CORE-BUILDER-001, NW-CORE-OBJECT-001, NW-VALIDATE-001, NW-VALIDATE-CASE-001, NW-VALIDATE-CASE-002, NW-MIGRATION-001

---

## Änderungsverlauf

| Version | Datum | Änderung | Grund |
|---------|-------|----------|-------|
| 1.0.0 | 2026-07-24 | Erstveröffentlichung | Architecture Freeze nach erfolgreicher Validierung |

---

## Kapitel 1 — Zweck des Architecture Freeze

### 1.1 Was bedeutet Architecture Freeze?

Die NeuroWays-Core-Architektur wurde durch zwei vollständig unabhängige Validierungsfälle als stabil nachgewiesen. Mit diesem Dokument wird die Architektur in Version 1.0 **offiziell eingefroren**.

**Ab diesem Zeitpunkt gilt:**

> Die Architektur wird nicht mehr weiterentwickelt. Sie wird verwendet.

Neue Anforderungen entstehen ausschließlich über den definierten Erweiterungsprozess — niemals durch nachträgliche Veränderung eingefrorener Core-Bestandteile.

### 1.2 Was der Freeze nicht bedeutet

| Nicht gemeint | Stattdessen |
|--------------|------------|
| Keine neuen Module mehr | Module wachsen auf der eingefrorenen Architektur |
| Keine neuen Felder mehr | Extensions sind ausdrücklich vorgesehen |
| Keine Weiterentwicklung | Plattform-Phase beginnt jetzt |
| Einschränkung der Produktentwicklung | Stabilisierung des Fundaments |

### 1.3 Übergang

```
Architektur-Phase  (abgeschlossen)
        ↓
Platform-Phase     (beginnt jetzt)
```

---

## Kapitel 2 — Validierungsübersicht

### 2.1 Foundation (NW-STD-000 bis NW-STD-003)

| Standard | Titel | Status |
|----------|-------|--------|
| NW-STD-000 | Standards Framework | published v1.0.1 |
| NW-STD-001 | Naming Standard | published v1.0.1 |
| NW-STD-002 | Standards Registry | published v1.0.1 |
| NW-STD-003 | Database Standard | published v1.0.1 |

Ergebnis: **Governance-Fundament vollständig.**

### 2.2 Core Builder (NW-CORE-BUILDER-001)

| Bestandteil | Validiert |
|-------------|---------|
| NWObject-Kern | ✅ |
| Extension-Schema-System | ✅ |
| Builder-Hierarchie (10 Builder definiert) | ✅ |
| NWP-Format v1.0 | ✅ |
| Lifecycle-Modell | ✅ |
| Versionierungsprotokoll | ✅ |
| Plattformunabhängigkeit | ✅ |

Ergebnis: **Core Builder stabil.**

### 2.3 Core Object Model (NW-CORE-OBJECT-001)

| Bestandteil | Validiert |
|-------------|---------|
| 8 Objektdomänen, 30+ Objekttypen | ✅ |
| Containment vs. Referenz — klar getrennt | ✅ |
| ENTITY-Modell (USER, TEAM, ENTERPRISE, ORGANIZATION) | ✅ |
| CONTENT als multimodaler Container | ✅ |
| Methodenschicht (METHOD_TYPE → METHOD → MODULE_SPEC → EXECUTION_MODE) | ✅ |
| Beziehungstypen vollständig | ✅ |
| Mehrsprachigkeit strukturell vorbereitet | ✅ |
| Barrierefreiheit strukturell vorbereitet | ✅ |

Ergebnis: **Objektmodell vollständig und konsistent.**

### 2.4 Energy Navigator Validation (NW-VALIDATE-CASE-001)

| Prüfbereich | Ergebnis |
|-------------|---------|
| 18 Objekte vollständig modellierbar | ✅ |
| Methodenmodell anwendbar | ✅ |
| Bewertungsmodell ohne Hardcoding | ✅ |
| Historische Sessions unveränderlich | ✅ |
| Datenschutz ohne Sonderlogik | ✅ |
| Design vollständig referenziert | ✅ |
| NWP-Manifest plattformunabhängig | ✅ |
| **Release-Entscheidung** | **PASS WITH EXTENSIONS** |

Erkannte Extensions: CONTENT-Aktivitätskatalog, CONSENT, CONVERSATION.  
Erkannte Core-Eingriffe: **Null.**

### 2.5 NeuroPlay Validation (NW-VALIDATE-CASE-002)

| Prüfbereich | Ergebnis |
|-------------|---------|
| 28 Spielobjekttypen modellierbar | ✅ |
| Kooperative Spielzustände ohne neuen Core-Typ | ✅ |
| Zufallsmechanik als Betriebsdatum | ✅ |
| Physisches und digitales Material — dasselbe Objekt | ✅ |
| Kampagnen und mehrsitzige Szenarien | ✅ |
| Flowisaurus als KI-Charakter (CHARACTER + PROMPT + AGENT) | ✅ |
| Mehrspieler (Einzel, Koop, Teams, Wettbewerb) | ✅ |
| CONVERSATION durch zweiten Anwendungsfall belegt | ✅ |
| CONSENT durch zweiten Anwendungsfall belegt | ✅ |
| **Release-Entscheidung** | **PASS WITH EXTENSIONS** |

Erkannte Core-Eingriffe: **Null.**

---

## Kapitel 3 — Nachweis der Stabilität

### 3.1 Kennzahlen

| Metrik | Wert |
|--------|------|
| Validierte Domänen | 2 (Energie + NeuroPlay) |
| Validierte Objekttypen | 46 (18 + 28) |
| Erkannte Core-Eingriffe | **0** |
| Benötigte Extensions | 3 (CONSENT, CONVERSATION, CONTENT-Aktivitäten) |
| Neue Builder definiert | 2 (NeuroPlay Builder, KI-Builder) |
| Extensions, die ohne Core-Änderung entstehen | **alle 3** |
| Akzeptanztests bestanden | 22/22 (12 + 10) |

### 3.2 Begründung für den Freeze

Die Architektur hat beide Validierungsfälle bestanden — ohne einen einzigen Eingriff in den Core. Das ist der Beweis, den das Erweiterungsprinzip verlangt:

> Wenn eine Architektur alle verlangten Anwendungsfälle ohne Core-Änderung abbilden kann, ist sie stabil genug für den Freeze.

Die drei identifizierten Extensions (CONSENT, CONVERSATION, CONTENT-Aktivitäten) entstehen alle **innerhalb des bestehenden Modells** — sie erfordern keine Änderung an NWObject-Kern, Beziehungstypen oder Builder-Hierarchie.

---

## Kapitel 4 — Freigegebene Core-Bestandteile

### 4.1 NWObject-Kern (unveränderlich)

Folgende Kernfelder gelten ab Version 1.0 als eingefroren:

```
id, code, object_type, version, status, locale, locales_available
meta: { name, description, tags, category, icon, timestamps }
versioning: { major, minor, patch, changelog, parent_version, superseded_by }
lifecycle: { published_at, archived_at, valid_from, valid_until }
permissions: { roles, visibility, license_type }
relations: { parent_id, children, references, dependencies }
i18n: { source_locale, translations }
accessibility: { alt_text, aria_label, reduced_motion }
media: { thumbnail, hero, assets }
audit: { validation_result, history }
extensions: {}
```

**Änderungsregel:** Diese Felder werden niemals entfernt oder umbenannt. Neue Pflichtfelder dürfen nur über Minor-Versionen (optionale Felder) oder Major-Versionen (Pflichtfelder) hinzukommen.

### 4.2 Freigegebene Objekttypen (v1.0)

**Plattform:**
`MODULE` · `BUILDER` · `RELEASE` · `PACKAGE` · `INSTALLATION`

**Methoden:**
`METHOD_TYPE` · `METHOD` · `MODULE_SPEC` · `EXECUTION_MODE` · `QUESTION` · `ANSWER_OPTION` · `SCORING_RULE` · `RESULT`

**Inhalte:**
`CONTENT` · `TRANSLATION`

**Assets:**
`ASSET`

**Design:**
`THEME` · `DESIGN_TOKEN` · `COMPONENT` · `ANIMATION`

**Entitäten:**
`ENTITY` (USER / TEAM / ENTERPRISE / ORGANIZATION) · `ROLE`

**Oberfläche:**
`PAGE` · `DASHBOARD` · `WIDGET` · `NAVIGATION` · `ACTION`

**KI:**
`PROMPT` · `AGENT` · `WORKFLOW`

**Geplant für v1.1.0:**
`CONVERSATION` · `CONSENT`

### 4.3 Freigegebene Beziehungstypen

| Typ | Definition |
|-----|-----------|
| enthält | Exklusive Kindbeziehung — Lifecycle-Kopplung |
| referenziert | Externe Abhängigkeit — unabhängiger Lifecycle |
| basiert auf | Ableitung ohne Kopie (MODULE_SPEC ↔ METHOD) |
| erweitert | Extension-Schema-Beziehung |
| versioniert | Nachfolgeversion |
| übersetzt | TRANSLATION ↔ CONTENT |

---

## Kapitel 5 — Freigegebene Builder

| Code | Builder | Objekttypen | Status |
|------|---------|------------|--------|
| NW-CB-001 | Core Builder | Fundament aller Builder | ✅ Aktiv |
| NW-CB-002 | Module Builder | MODULE, MODULE_SPEC, NAVIGATION, PAGE | ✅ Implementiert |
| NW-CB-003 | Content Builder | CONTENT, TRANSLATION | Geplant |
| NW-CB-004 | Media Builder | ASSET | Geplant |
| NW-CB-005 | Design Builder | DESIGN_TOKEN, THEME, COMPONENT | Geplant |
| NW-CB-006 | Method Builder | METHOD, QUESTION, ANSWER_OPTION, SCORING_RULE | Geplant |
| NW-CB-007 | Navigation Builder | NAVIGATION, PAGE | Geplant |
| NW-CB-008 | Dashboard Builder | DASHBOARD, WIDGET | Geplant |
| NW-CB-009 | Role Builder | ROLE | Geplant |
| NW-CB-010 | Release Builder | RELEASE | Geplant |
| NW-CB-011 | NeuroPlay Builder | GAME, QUEST, CARD, CHARACTER, … | Geplant (nach Migration) |
| NW-CB-012 | KI-Builder | PROMPT, AGENT, WORKFLOW | Geplant |

**Regel:** Jeder neue Builder entsteht ohne Core-Eingriff durch Registrierung eines Extension-Schemas.

---

## Kapitel 6 — Freigegebene Extension-Mechanismen

Extensions sind das einzige zulässige Mittel zur Erweiterung der Core-Architektur ab Version 1.0.

### 6.1 Extension-Schema-Registrierung

```json
{
  "builder_id": "my_builder",
  "version": "1.0.0",
  "fields": [
    { "key": "my_field", "type": "string", "required": false }
  ],
  "actions": ["my_action"]
}
```

Jeder Builder registriert sein Schema einmalig. Danach können alle NWObjects diesen Builder über das `extensions`-Feld verwenden.

### 6.2 Explizit vorgesehene Erweiterungen

| Extension | Status | Begründet durch |
|-----------|--------|----------------|
| `energy_navigator` | Aktiv (Betriebsdaten: note, activities, tags) | NW-VALIDATE-CASE-001 |
| `neuroplay_builder` | Geplant | NW-VALIDATE-CASE-002 |
| `ai_builder` | Geplant | Flowisaurus + NeuroPlay |
| `consent_builder` | Geplant | Beide Validierungsfälle |

### 6.3 Extension-Regeln

1. Extensions dürfen keine Core-Felder überschreiben
2. Extensions müssen ein registriertes Schema besitzen
3. Unbekannte Extension-Felder werden ignoriert (kein Fehler)
4. Extensions sind immer optional — ein NWObject ist ohne Extensions gültig
5. Extensions versionieren sich unabhängig vom NWObject-Kern

---

## Kapitel 7 — Änderungsregeln ab Version 1.0

### 7.1 Was ohne Prozess möglich ist

- Neue Extensions hinzufügen
- Neue Builder registrieren
- Neue `object_type`-Werte registrieren
- Neue `EXECUTION_MODE`-Einträge anlegen
- Neue `CONTENT`-Objekte erstellen
- Neue `DESIGN_TOKEN`-Werte anlegen
- Neue Module entwickeln und deployen

**All dies erfordert keinen Core-Eingriff und keinen Governance-Prozess.**

### 7.2 Was den Governance-Prozess erfordert

Ein neues Core-Objekt oder eine Änderung am NWObject-Kern darf erst entstehen, wenn **alle vier Bedingungen gleichzeitig** erfüllt sind:

| Bedingung | Prüfung |
|-----------|---------|
| Mindestens zwei unabhängige Domänen weisen den Bedarf nach | Dokumentiert in Validierungsfall |
| Eine vollständige Validierung nach NW-VALIDATE-001 ist abgeschlossen | Protokoll vorhanden |
| Keine Extension kann den Bedarf lösen | Begründung schriftlich |
| Die Entscheidung wird in NW-CORE-OBJECT-001 als neue Version dokumentiert | Major oder Minor |

### 7.3 Was verboten ist

- Core-Felder umbenennen oder entfernen (außer über Major-Version mit vollständiger Migration)
- Bestehende Beziehungstypen umdefinieren
- Extension-Felder außerhalb des `extensions`-Feldes speichern
- Plattformreferenzen in NWObjects einbetten
- Bestehende veröffentlichte Versionen nachträglich ändern

---

## Kapitel 8 — Versionierung des Core

### 8.1 Versionsstruktur

```
NW-CORE-OBJECT-001 v1.0.0  (Architecture Freeze)
        │
        ├── v1.0.x  — Patches: Klarstellungen, Korrekturen
        ├── v1.1.0  — Minor: CONVERSATION + CONSENT ergänzen
        ├── v1.2.0  — Minor: Nächste bestätigte Erweiterung
        └── v2.0.0  — Major: Breaking Change (mit vollständiger Migration)
```

### 8.2 Übergang Architecture-Phase → Platform-Phase

| Architecture-Phase (abgeschlossen) | Platform-Phase (beginnt) |
|-----------------------------------|-------------------------|
| Core definieren | Core verwenden |
| Validieren | Migrieren |
| Dokumente verabschieden | Module entwickeln |
| Extension-Mechanismen entwerfen | Builder aktivieren |
| Migration planen | Migration ausführen |

Der Freeze-Zeitpunkt ist der formelle Übergang zwischen diesen beiden Phasen.

---

## Kapitel 9 — Auswirkungen

### 9.1 Builder

Alle Builder entwickeln sich auf dem eingefrorenen Core weiter. Sie registrieren Extension-Schemas — sie ändern den Core nicht. Neue Builder entstehen durch Registrierung, nicht durch Core-Eingriff.

### 9.2 Versionsverwaltung (Git)

Ab Version 1.0 gilt für Core-Dokumente:

- Kein direkter Commit auf ein veröffentlichtes Core-Dokument
- Alle Änderungen an Core-Dokumenten durchlaufen einen Review-Schritt
- Core-Dokumente erhalten semantische Versionsnummern in Dateinamen: `NW-CORE-OBJECT-001_v1.1.0.md`

### 9.3 Deployment

Der NW-DEPLOY-001-Prozess bleibt unverändert. Core-Objekte (wenn als NWObjects migriert) werden als Stammdaten von DEV nach LIVE übertragen — wie alle anderen Stammdaten.

### 9.4 Migration

NW-MIGRATION-001 definiert den schrittweisen Weg. Die Reihenfolge ist festgelegt. Phase 10 (Contract) ist erst nach vollständiger Validierung aller vorherigen Phasen zulässig.

### 9.5 Dokumentation

Neue Dokumente werden nur noch dann erstellt, wenn sie einen **neuen, definierten Anwendungsfall** beschreiben. Dokumente dürfen keine bestehenden Core-Entscheidungen wiederholen — sie referenzieren sie.

### 9.6 CHANGE-Historie

Jede Änderung an einem Core-Dokument nach Version 1.0 wird mit folgendem Mindestinhalt im Änderungsverlauf festgehalten:

```
| Version | Datum | Änderung | Begründung | Validierungsfall |
```

Änderungen ohne Begründung und Validierungsfall sind nicht zulässig.

### 9.7 Zukünftige Module

Jedes neue Modul — NeuroPlay, Flowisaurus, Schlaf-Navigator, Fokus-Modul — entwickelt sich auf dem eingefrorenen Core v1.0. Es definiert eigene Extensions, eigene Builder, eigene Inhalte. Der Core bleibt unberührt.

---

## Kapitel 10 — Offizieller Freeze-Beschluss

---

> **NeuroWays Core Architecture — Version 1.0**
>
> Die NeuroWays-Core-Architektur, bestehend aus NWObject-Kern, universellen Objekttypen, Builder-Hierarchie, Beziehungsmodell, Versionierungsprotokoll und NWP-Format, gilt ab dem **24. Juli 2026** als offiziell eingefroren.
>
> Die Architektur wurde durch zwei vollständige, unabhängige Validierungsfälle (Energy Navigator und NeuroPlay) ohne einen einzigen Core-Eingriff bestätigt. Sie bildet ab sofort die **alleinige und verbindliche Grundlage** aller zukünftigen NeuroWays-Entwicklung.
>
> Neue Module, Builder und Inhalte entstehen auf dieser Architektur. Sie verändern sie nicht.
>
> Änderungen am Core sind ausschließlich durch den definierten Governance-Prozess möglich — begründet durch mindestens zwei unabhängige Anwendungsfälle, validiert nach NW-VALIDATE-001, dokumentiert als neue Version.
>
> **Architecture Phase: abgeschlossen.**  
> **Platform Phase: beginnt.**

---

## Anhang — Übersicht aller Core-Dokumente

| Dokument | Titel | Version | Status |
|----------|-------|---------|--------|
| NW-STD-000 | Standards Framework | 1.0.1 | published |
| NW-STD-001 | Naming Standard | 1.0.1 | published |
| NW-STD-002 | Standards Registry | 1.0.1 | published |
| NW-STD-003 | Database Standard | 1.0.1 | published |
| NW-KAS-001 | Knowledge Asset Standard | 1.0.0 | draft |
| NW-DS-001 | Design Philosophy | 1.0.0 | published |
| NW-DS-002 | Logo System | 1.0.0 | published |
| NW-DS-003 | Color System | 1.0.0 | published |
| NW-DS-004 bis 009 | Typography bis Brand Applications | 1.0.0 | draft |
| NW-IDENTITY-001 | Identity & Membership Spec | 1.0.0 | published |
| NW-PKG-001 | Module Version & Package Model | 0.1.0 | draft |
| NW-DEPLOY-001 | Deployment Standard | 1.0.0 | published |
| NW-CORE-BUILDER-001 | Core Builder Architecture | 1.0.0 | published |
| NW-CORE-OBJECT-001 | Universal Object & Relationship Model | 1.0.0 | published |
| NW-VALIDATE-001 | Core Architecture Validation Standard | 1.0.0 | published |
| NW-VALIDATE-CASE-001 | Energy Navigator Core Validation | 1.0.0 | review |
| NW-VALIDATE-CASE-002 | NeuroPlay Core Stress Test | 1.1.0 | review |
| NW-MIGRATION-001 | Migration Standard | 1.0.0 | draft |
| **NW-MILESTONE-001** | **Architecture Freeze v1.0** | **1.0.0** | **published** |

---

*NW-MILESTONE-001 — Architecture Freeze v1.0 — 2026-07-24 — Die Architektur-Phase ist abgeschlossen.*
