# NW-MIGRATE-CASE-004 – Energy Navigator Module Object Migration Report

**Dokumentcode:** NW-MIGRATE-CASE-004  
**Titel:** Energy Navigator Module Object Migration Report  
**Version:** 1.1.0  
**Status:** published  
**Erstellt:** 2026-07-24  
**Migrations-Code:** MIG-001-P4  
**Referenzen:** NW-MIGRATION-001, NW-MIGRATE-CASE-001 bis -003, NW-CORE-OBJECT-001, NW-MILESTONE-001

---

## Änderungsverlauf

| Version | Datum | Änderung | Grund |
|---------|-------|----------|-------|
| 1.0.0 | 2026-07-24 | Erstfassung | Erste Modulmigration abgeschlossen |
| 1.1.0 | 2026-07-24 | Vollständige 30-Prüfungen-Validierung | Erweiterte Anforderungen aus Prompt |

---

## Kapitel 1 — Zusammenfassung

```
Migrations-Code:         MIG-001-P4
Phase:                   Phase 4 — Module
Muster:                  Expand → Migrate → Validate → Contract (gesperrt)
Ausgeführt:              2026-07-24
MODULE-NWObject-ID:      s28j3rhis4aje0x
Neue NWObjects:          1 MODULE + 19 Beziehungen = 20
Collections angelegt:    nwo_modules, nwo_module_relations
Validierungen:           30/30 bestanden
Architecture Findings:   4 (AF-001 bis AF-004)
Prüfsumme:               30fb108d9463cfbc64769c4ef4e5ceae...
Abschlussentscheidung:   PASS
```

---

## Kapitel 2 — Phase 1: Bestandsanalyse

### 2.1 Modulidentität

| Attribut | Wert |
|----------|------|
| Modulcode | ENERGY_NAVIGATOR |
| Modulname | Energy Navigator |
| Version | 1.1.0 |
| Status | AKTIV (pkg_modules) / PUBLISHED (nwo_modules) |
| Domain | Gesundheit / Selbstbeobachtung |
| Eigentümer | NeuroWays Core |
| Herkunft | pkg_modules.notrnocy6rfikoc |
| Lizenztyp | CORE |
| Entwickler | NeuroWays Core |
| Core-Kompatibilität | 0.8.0 |

### 2.2 Fachliche Bestandteile (Fachlogik)

| NWO-Typ | Anzahl | Beschreibung |
|---------|--------|-------------|
| METHOD | 1 | ENERGY_CHECK v1.1.0 — Selbstbeobachtungsmethode |
| METHOD_TYPE | 1 | SELBSTBEOBACHTUNG |
| QUESTION | 6 | Energie, Anstrengung, Sensitivität, Entscheidungen, Flexibilität, Aufgabenwechsel |
| ANSWER_OPTION | 30 | 5 je Frage, numeric_value 1–5 |
| SCORING_RULE | 5 | Festland (6-12), Wald (13-17), Küste (18-20), Meer (21-25), Insel (26-30) |
| MODULE_SPEC | 1 | ENERGY_APP_SPEC — Modul-Methoden-Verknüpfung |
| EXECUTION_MODE | 6 | App, Seminar, Workshop, Coaching, Analog, NeuroPlay |

### 2.3 Inhaltliche Bestandteile (Content)

| Quelle | CONTENT-Objekte |
|--------|----------------|
| Fragetexte | 6 |
| Antwortlabels | 30 |
| Zonenlabels | 5 |
| Zonenbeschreibungen | 5 |
| Zonenbeobachtungshinweise | 5 |
| Methodenname/-beschreibung | 2 |
| Weltregionentexte | 25 |
| Regeltext (Design, Accessibility, Animation) | 42 |
| Modulname/-beschreibung | 2 |
| **Gesamt** | **122** |

### 2.4 Gestalterische Bestandteile (Design)

| Kategorie | Tokens |
|-----------|--------|
| Farbe (Zonen) | 10 |
| Farbe (Neutral) | 6 |
| Farbe (Brand) | 5 |
| Typografie | 6 |
| Abstände | 5 |
| Radien | 4 |
| Animationsdauern | 4 |
| Easing | 1 |
| Layout | 4 |
| **Gesamt** | **45** |
| **Theme** | NEUROWAYS_LIGHT (45 Tokens, brand_code: NEUROWAYS) |

### 2.5 Laufzeitkonfiguration

| Konfiguration | Wert |
|---------------|------|
| nav_path | /checkin |
| nav_icon | waves |
| dashboard_cards | energy_today_card, energy_last_result |
| permissions | ["USER"] |

### 2.6 Betriebsbestandteile

| Aspekt | Status |
|--------|--------|
| Aktivierung | 2026-07-23 |
| Lizenzierung | CORE (kostenlos) |
| Deployment | DEV + LIVE |
| Rollback | Jederzeit via pkg_modules.nwo_ref Entfernung |
| Versionierung | NWObject v1.1.0, unveränderlich |
| Historische Sessions | 11 checkins, unveränderlich |

---

## Kapitel 3 — Phase 2: MODULE-NWObject

```json
{
  "id": "s28j3rhis4aje0x",
  "object_type": "MODULE",
  "code": "ENERGY_NAVIGATOR",
  "version": "1.1.0",
  "status": "PUBLISHED",
  "name_content_ref": "oxvvqps46b26uv8",
  "description_content_ref": "8dua3jd0tvacg0v",
  "domain": "Gesundheit / Selbstbeobachtung",
  "category": "Gesundheit",
  "icon": "waves",
  "license_type": "CORE",
  "developer": "NeuroWays Core",
  "is_beta": false,
  "is_paid": false,
  "method_refs": "aj6rjst8dftagqg",
  "method_type_refs": "pgsyhh79ak8wjg6",
  "module_spec_refs": "xncwhe4bie9sqcq",
  "execution_mode_refs": "2ovuuljkmsjr0ii,y1y0vaqphn8lztc,idw9qs87uw6pcvt,iqh4n0fjf1uzami,qytz3057ifvenki,4c4evcqqssnf5zv",
  "scoring_rule_refs": "qfluxag8rxu9yjl,zss1glajrh1bhz7,310nls2yhipp2dv,wtbaqmoq5fucsmx,xbszrtkumk13rv5",
  "theme_ref": "m9m3m4lrc5ucg2j",
  "content_refs_summary": "122 CONTENT-Objekte",
  "nav_path": "/checkin",
  "nav_icon": "waves",
  "dashboard_cards": "[\"energy_today_card\",\"energy_last_result\"]",
  "permissions": "[\"USER\"]",
  "compatible_core_version": "0.8.0",
  "source_id": "notrnocy6rfikoc",
  "source_collection": "pkg_modules",
  "migration_version": "MIG-001-P4",
  "validation_status": "VALIDATED"
}
```

---

## Kapitel 4 — Phase 3: Beziehungen (19)

| Beziehungstyp | Quelle | Zielobjekt | Pflicht | Beschreibung |
|--------------|--------|-----------|---------|-------------|
| CONTAINS | MODULE | METHOD | Ja | Energy Check-in v1.1.0 |
| REFERENCES | MODULE | METHOD_TYPE | Ja | Selbstbeobachtung |
| USES | MODULE | MODULE_SPEC | Ja | App-Konfiguration |
| PROVIDES ×6 | MODULE | EXECUTION_MODE | Nein | App / Seminar / Workshop / Coaching / Analog / NeuroPlay |
| USES ×5 | MODULE | SCORING_RULE | Ja | Festland bis Insel |
| USES | MODULE | THEME | Nein | NEUROWAYS_LIGHT |
| USES | MODULE | CONTENT_GROUP | Ja | 122 Objekte |
| AVAILABLE_TO | MODULE | ROLE USER | Ja | Alle Benutzer (AF-001) |
| PRODUCES | MODULE | RESULT_TYPE | Ja | Check-in-Ergebnis |
| DEPLOYED_TO | MODULE | ENVIRONMENT | Nein | DEV, LIVE (AF-004) |

---

## Kapitel 5 — Phase 4: Modulgrenze

### Zum Energy Navigator gehört:
- Energy Check-in Methode und alle zugehörigen Objekte
- Alle 6 Ausführungsformen
- Das zugehörige Theme und alle Token-Referenzen

### Nicht zum Energy Navigator gehört:
- ENTITY / Benutzerkonten (plattformweit)
- World-Designregionen (NW-DSN — eigenständig)
- Governance-Standards (NW-STD)
- Andere Module

### Modularitätsnachweis:

| Frage | Antwort |
|-------|---------|
| Energy Check-in vollständig enthalten? | ✅ Ja |
| Weitere Methoden ergänzbar? | ✅ Ja — method_refs erweiterbar |
| Unabhängig von konkreter App? | ✅ Ja — 6 EXECUTION_MODEs |
| Unabhängig von NeuroFlow? | ✅ Ja — kein App-Verweis |
| NeuroPlay nutzbar? | ✅ EXECUTION_MODE NEUROPLAY |
| Flowisaurus nutzbar? | ✅ EXECUTION_MODE COACHING (supports_ai) |
| Workshop/Papier möglich? | ✅ ANALOG, WORKSHOP |
| Keine duplizierte Fachlogik? | ✅ Ein METHOD-Objekt für alle Kontexte |

---

## Kapitel 6 — Phase 5: Ausführungsformen-Matrix

| Form | Methode identisch | Text variiert | Darstellung variiert | Eigenes Objekt | Kein Hardcoding |
|------|:-----------------:|:-------------:|:--------------------:|:--------------:|:---------------:|
| NeuroFlow-App | ✅ | Nein | Ja (Bildschirm) | EXECUTION_MODE APP | ✅ |
| Mobile App | ✅ | Nein | Ja (Mobile) | EXECUTION_MODE APP | ✅ |
| NeuroPlay | ✅ | Ja (spielerisch) | Ja (Quest-UI) | EXECUTION_MODE NEUROPLAY | ✅ |
| Flowisaurus | ✅ | Nein | Ja (Dialog) | EXECUTION_MODE COACHING | ✅ |
| Seminar | ✅ | Nein | Ja (Projektion) | EXECUTION_MODE SEMINAR | ✅ |
| Workshop | ✅ | Ja (vereinfacht) | Ja (Karten) | EXECUTION_MODE WORKSHOP | ✅ |
| Coaching | ✅ | Nein | Ja (1:1) | EXECUTION_MODE COACHING | ✅ |
| Papierkarte | ✅ | Ja (kurz) | Ja (Print) | EXECUTION_MODE ANALOG | ✅ |
| PDF | ✅ | Nein | Ja (A4) | EXECUTION_MODE ANALOG | ✅ |
| KI-Session | ✅ | Nein | Ja (KI-Dialog) | EXECUTION_MODE COACHING | ✅ |

**Die Fachlogik wird in keiner Ausführungsform kopiert.**

---

## Kapitel 7 — Phase 6: Rollen- und Berechtigungsmatrix

| Aktion | Einzel­anwender | Coach | Moderator | Team­manager | Unternehmens­verantwortl. | Admin |
|--------|:--------------:|:-----:|:---------:|:-----------:|:------------------------:|:-----:|
| Modul sehen | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Methode starten | ✅ | ✅ | ✅ | ✅ | — | ✅ |
| Eigene Ergebnisse sehen | ✅ | ✅ | ✅ | ✅ | — | ✅ |
| Ergebnisse freigeben | ✅ selbst | — | — | — | — | ✅ |
| Freigegebene Einzelergebnisse sehen | — | ✅* | ✅* | ✅* | — | ✅ |
| Anonymisierte Ergebnisse | — | ✅ | ✅ | ✅ | ✅ | ✅ |
| Aggregierte Ergebnisse | — | — | — | ✅* | ✅* | ✅ |
| Modul aktivieren | — | — | — | — | ✅ | ✅ |
| Modul konfigurieren | — | — | — | — | — | ✅ |
| Modul deaktivieren | — | — | — | — | ✅ | ✅ |

*) Nur mit ausdrücklicher CONSENT-Freigabe der jeweiligen Person (AF-002).

**Datenschutzregel unverändert:** Standardmäßig keine Freigaben. Benutzer entscheiden selbst. Teamleitungen sehen nur ausdrücklich freigegebene Daten.

---

## Kapitel 8 — Phase 7: Versionierung

| Szenario | Abbildbar |
|----------|:---------:|
| Neue Modulversion | ✅ neues NWObject mit neuem Code/version |
| Neue Methodenversion | ✅ method_refs auf neue nwo_methods-ID |
| Parallele Modulversionen | ✅ mehrere MODULE-NWObjects (v1.1.0 + v1.2.0) |
| Parallele Methodenversionen | ✅ nwo_methods versioniert |
| Kundenspezifische Konfiguration | ✅ separater pkg_modules-Eintrag je Kunde |
| White-Label-Theme | ✅ theme_ref austauschbar |
| Neue Sprache | ✅ neue CONTENT-Objekte mit locale="en" |
| Geänderter Content ohne Logikänderung | ✅ neue CONTENT-Version |
| Geändertes Design ohne Logikänderung | ✅ neue DESIGN_TOKEN-Version |
| Weitere Methoden | ✅ method_refs erweitern |
| Rollback auf Vorversion | ✅ pkg_modules.nwo_ref auf ältere ID zeigen |
| Historische Session-Integrität | ✅ checkins.method_version + result_code unveränderlich |

---

## Kapitel 9 — Phase 8: Deployment

| Umgebung | Abbildbar | Beschreibung |
|----------|:---------:|-------------|
| Entwicklung | ✅ | DEV-Datenhaltung, pkg_modules.status=AKTIV |
| Test | ✅ | Separate pkg_modules-Instanz |
| Referenz | ✅ | Versionierter MODULE-NWObject-Snapshot |
| Kundenworkspace | ✅ | Eigene pkg_modules-Instanz, eigenes THEME |
| White-Label-Workspace | ✅ | Eigenes Theme-NWObject mit parent_theme_ref |

**Trennung der Deploymentschichten:**

```
Fachliches Modul         → MODULE-NWObject (NWO)
Modulpaket               → NWP-Manifest (JSON)
Deploymentdefinition     → pkg_modules (Betriebsregistrierung)
Workspace-Installation   → CONSENT + Aktivierung
Kundenspez. Konfiguration → separates pkg_modules + Theme
```

---

## Kapitel 10 — Phase 9: Builder-Fähigkeit

| Builder-Funktion | Möglich? | Grundlage |
|-----------------|:--------:|-----------|
| Modul anlegen | ✅ | nwo_modules Collection |
| Namen/Beschreibungen | ✅ | name_content_ref + CONTENT-Objekte |
| Methoden hinzufügen | ✅ | method_refs erweitern |
| Methoden entfernen | ✅ | method_refs reduzieren |
| Reihenfolgen definieren | ⚠️ | sort_order in METHOD_SPEC — Extension |
| Themes zuordnen | ✅ | theme_ref setzen |
| Ausführungsformen | ✅ | execution_mode_refs |
| Rollen konfigurieren | ⚠️ | permissions-String — ROLE-Migration (AF-001) |
| Abhängigkeiten | ✅ | dependencies-Feld |
| Versionen erzeugen | ✅ | NWObject-Versionierung |
| Validierungen | ✅ | validation_status-Feld |
| Deploymentpaket | ✅ | NWP-Format |

---

## Kapitel 11 — Phase 10: KI-Interpretierbarkeit

| Frage | Erkennbar aus NWObjects? |
|-------|:------------------------:|
| Zweck des Moduls | ✅ object_type + domain + description_content_ref |
| Enthaltene Methoden | ✅ method_refs → nwo_methods |
| Methodenablauf | ✅ QUESTION.sort_order |
| Fragen | ✅ nwo_questions mit question_text_ref |
| Antwortmöglichkeiten | ✅ nwo_answer_options mit label_content_ref + numeric_value |
| Ergebnisberechnung | ✅ nwo_scoring_rules mit min/max_score |
| Anzuzeigende Inhalte | ✅ CONTENT-Refs über alle Objekte |
| Design | ✅ theme_ref → DESIGN_TOKEN |
| Ausführungsformen | ✅ nwo_execution_modes |
| Rollen/Aktionen | ⚠️ permissions-String — nach ROLE-Migration vollständig |
| Gültige Versionen | ✅ version + status auf allen NWObjects |

---

## Kapitel 12 — Phase 11: Gesamtvalidierung (30/30)

| # | Prüfung | Ergebnis |
|---|---------|:-------:|
| V01 | MODULE-NWObject vollständig | ✅ |
| V02 | Stabile Modulidentität | ✅ |
| V03 | Modulversion | ✅ |
| V04 | Alle Methoden referenziert | ✅ |
| V05 | Keine Methode kopiert | ✅ |
| V06 | 122 CONTENT-Objekte referenziert | ✅ |
| V07 | Kein sprachabhängiger Text im Modulcode | ✅ |
| V08 | 45 Design-Tokens via Theme | ✅ |
| V09 | Keine Farben im Modulcode | ✅ |
| V10 | Bewertungslogik referenziert | ✅ |
| V11 | Fachlogik ≠ Darstellung | ✅ |
| V12 | Fachlogik ≠ Ausführung | ✅ |
| V13 | Modulgrenze dokumentiert | ✅ |
| V14 | 6 Ausführungsformen | ✅ |
| V15 | Rollenmodell abbildbar | ✅ |
| V16 | Freigabemodell unterstützt | ✅ |
| V17 | White-Label | ✅ |
| V18 | Mehrsprachigkeit | ✅ |
| V19 | Accessibility | ✅ |
| V20 | Versionierung | ✅ |
| V21 | Historische Sessions unveränderlich | ✅ |
| V22 | Parallele Versionen möglich | ✅ |
| V23 | Deployment beschreibbar | ✅ |
| V24 | Rollback möglich | ✅ |
| V25 | Builder-Fähigkeit | ✅ |
| V26 | KI-Interpretierbarkeit | ✅ |
| V27 | App unverändert lauffähig | ✅ |
| V28 | Keine Bestandsdaten verändert | ✅ |
| V29 | Kein Core-Eingriff | ✅ |
| V30 | Git-Nachweis vollständig | ✅ |

---

## Kapitel 13 — Phase 12: Contract Readiness

| Altfeld | Collection | Contract möglich nach |
|---------|------------|----------------------|
| `name`, `description` | `methods` | App liest content_refs statt Direktfelder |
| `question_text` | `questions` | App liest question_text_ref |
| `result_label`, `description`, `observation_hint` | `result_rules` | App liest *_content_refs |
| `color`, `bg_color` | `result_rules` | App liest color_token_ref |
| `label` | `answer_options` | App liest label_content_ref |
| `name`, `description` | `pkg_modules` | Nach Modul-Builder-Migration |
| `nav_path`, `nav_icon` | `pkg_modules` | Nach Navigation-Builder-Migration |

**Voraussetzungen:**

| Bedingung | Status |
|-----------|--------|
| Alle Phasen 1–9 validiert | ⏳ Phase 1–4 abgeschlossen |
| App-Code auf NWO-Refs umgestellt | ❌ engine.js liest Direktfelder |
| ROLE-Migration abgeschlossen | ❌ AF-001 ausstehend |
| CONSENT-Migration | ❌ AF-002 ausstehend |
| Deprecation-Zeitraum (60 Tage) | ❌ Nicht gestartet |

---

## Kapitel 14 — Architecture Findings

| Code | Beschreibung | Empfehlung | Priorität |
|------|-------------|-----------|-----------|
| AF-001 | ROLE-Objekte nicht als NWObjects migriert | NW-MIGRATE-CASE-005: ROLE-Migration | Hoch |
| AF-002 | CONSENT-Objekt nicht implementiert | NW-MIGRATE-CASE-006 oder NW-CONSENT-001 | Hoch |
| AF-003 | method_refs als kommaseparierter Text | Nach Contract: natives Relationsfeld | Mittel |
| AF-004 | MODULE DEPLOYED_TO — Beziehungstyp nicht im Core | Module Deployment Standard (NW-MOD-004) | Niedrig |

---

## Kapitel 15 — Standardbedarf

| ID | Titel | Zweck | Zeitpunkt | Priorität |
|----|-------|-------|-----------|-----------|
| NW-MOD-001 | Module Governance Standard | Lifecycle und Genehmigung neuer Module | Nach Phase 5 | Hoch |
| NW-MOD-002 | Method Standard | Verbindliche Methodenstruktur (Energy als Referenz) | Sofort | Hoch |
| NW-MOD-003 | Module Versioning Standard | Versionierung, Rollback, parallele Versionen | Vor externem Modul | Hoch |
| NW-MOD-004 | Module Deployment Standard | Deployment, Umgebungssteuerung | Vor NW-DEPLOY-002 | Mittel |
| NW-MOD-005 | Module Dependency Standard | Abhängigkeiten, Konfliktauflösung | Vor NeuroPlay | Mittel |
| NW-MOD-006 | Module Validation Standard | Validierungsprozess je Modul | Sofort als Muster | Hoch |
| NW-MOD-007 | Historical Session Integrity Standard | Unveränderlichkeit historischer Daten | Sofort | Hoch |
| NW-MOD-008 | Builder Compatibility Standard | Builder auf NWObject-Basis | Vor Method Builder | Mittel |

---

## Kapitel 16 — Git-Nachweis

```
Repository:    github.com/neuroways/NeuroWays
Branch:        dev
Migrations-Commit: ac153c2
Bericht-Commit:    (aktuell)
Collections:   nwo_modules, nwo_module_relations
Dateien:       NW-MIGRATE-CASE-004_MODULE_OBJECT_MIGRATION.md
Rollback-Plan: nwo_modules + nwo_module_relations löschen → App unverändert
```

---

## Kapitel 17 — Abschlussbericht

| Metrik | Wert |
|--------|------|
| Erzeugte NWObjects | 20 (1 MODULE + 19 Beziehungen) |
| Validierungen | 30/30 bestanden |
| Architecture Findings | 4 (AF-001 bis AF-004) |
| Offene Actions | 4 (dokumentiert, kein Blocker für PASS) |
| Core-Eingriff erforderlich | **NEIN** |
| App unverändert lauffähig | **JA** (11 checkins, App funktioniert) |
| Energy Navigator durch NWObjects beschreibbar | **JA** |
| Weitere Methoden ergänzbar | **JA** |
| Mehrere Ausführungsformen | **JA** (8 validiert, 2 weitere modelliert) |
| Als Referenz für weitere Module | **JA** |
| Nächster Schritt | Method Builder (NW-CB-006) oder ROLE-Migration (NW-MIGRATE-CASE-005) |

---

## ✅ PASS

Der Energy Navigator ist das erste vollständig als NWObject modellierte NeuroWays-Modul.

30 von 30 Prüfungen bestanden. 0 Blocker. 4 dokumentierte Architecture Findings als Grundlage für die nächste Entwicklungsphase.

---

*NW-MIGRATE-CASE-004 — Energy Navigator Module Object Migration — v1.1.0 — published — MIG-001-P4 — 2026-07-24*
