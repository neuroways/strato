# NeuroWays Standards Registry — Offizielles Verzeichnis

**Dokumentcode:** NW-STD-002-REGISTER  
**Version:** 1.0.0  
**Status:** published  
**Veröffentlicht:** 2026-07-23  
**Gültig ab:** 2026-07-23  
**Verantwortlich:** NeuroWays Core  
**Grundlage:** NW-STD-002 — Standards Registry Standard v1.0.1

---

## Änderungsverlauf

| Version | Datum | Änderung | Autor |
|---------|-------|----------|-------|
| 1.0.0 | 2026-07-23 | Erstanlage — Governance Foundation v1.0 veröffentlicht | NeuroWays Core |

---

## Registrierte Standards

### NW-STD-000 — Standards Framework Standard

| Feld | Wert |
|------|------|
| **Dokumentcode** | NW-STD-000 |
| **Titel** | NeuroWays Standards Framework Standard |
| **Kurzbeschreibung** | Übergeordneter Rahmen für alle NeuroWays-Standards: Lebenszyklus, Aufbau, Versionierung, Governance-Regeln |
| **Aktuelle Version** | 1.0.1 |
| **Status** | published |
| **Kategorie** | Core Standards |
| **Verantwortlicher** | NeuroWays Core |
| **Erstellt am** | 2026-07-23 |
| **Veröffentlicht am** | 2026-07-23 |
| **Verpflichtend** | ja — für alle Module |
| **Gültig ab** | 2026-07-23 |
| **Abhängigkeiten** | keine (Basisstandard) |
| **Wird referenziert von** | NW-STD-001, NW-STD-002, NW-STD-003 |
| **Supersedes** | – |
| **Superseded by** | – |

---

### NW-STD-001 — Naming Standard

| Feld | Wert |
|------|------|
| **Dokumentcode** | NW-STD-001 |
| **Titel** | NeuroWays Naming Standard |
| **Kurzbeschreibung** | Verbindliche Namenskonventionen für Collections, Felder, Codes, Dateien, APIs und Dokumente im gesamten NeuroWays-System |
| **Aktuelle Version** | 1.0.1 |
| **Status** | published |
| **Kategorie** | Core Standards |
| **Verantwortlicher** | NeuroWays Core |
| **Erstellt am** | 2026-07-23 |
| **Veröffentlicht am** | 2026-07-23 |
| **Verpflichtend** | ja — für alle technischen Bezeichner |
| **Gültig ab** | 2026-07-23 |
| **Abhängigkeiten** | NW-STD-000 (normativ) |
| **Wird referenziert von** | NW-STD-002, NW-STD-003 |
| **Supersedes** | – |
| **Superseded by** | – |
| **Bemerkungen** | Offene Punkte: Ausnahmeregel für NeuroWays-Weltbegriffe (KUESTE etc.) — wird in NW-STD-001 v1.1.0 adressiert |

---

### NW-STD-002 — Standards Registry Standard

| Feld | Wert |
|------|------|
| **Dokumentcode** | NW-STD-002 |
| **Titel** | NeuroWays Standards Registry Standard |
| **Kurzbeschreibung** | Regeln für das zentrale Verzeichnis aller NeuroWays-Standards: Nummernvergabe, Statusmodell, Veröffentlichungsprozess, Historienführung |
| **Aktuelle Version** | 1.0.1 |
| **Status** | published |
| **Kategorie** | Core Standards |
| **Verantwortlicher** | NeuroWays Core |
| **Erstellt am** | 2026-07-23 |
| **Veröffentlicht am** | 2026-07-23 |
| **Verpflichtend** | ja — für alle Standards und deren Verwaltung |
| **Gültig ab** | 2026-07-23 |
| **Abhängigkeiten** | NW-STD-000 (normativ) |
| **Wird referenziert von** | NW-STD-003 (informativ) |
| **Supersedes** | – |
| **Superseded by** | – |
| **Bemerkungen** | Bootstrap-Phase beendet durch diese Veröffentlichung. Schriftliche Freigabe durch NeuroWays Core Team erfolgt. |

---

### NW-STD-003 — Database Standard

| Feld | Wert |
|------|------|
| **Dokumentcode** | NW-STD-003 |
| **Titel** | NeuroWays Database Standard |
| **Kurzbeschreibung** | Plattformunabhängige Architekturregeln für alle NeuroWays-Datenmodelle: Objektidentität, Beziehungen, Integrität, Versionierung, Migration, Validierung |
| **Aktuelle Version** | 1.0.1 |
| **Status** | published |
| **Kategorie** | Core Standards |
| **Verantwortlicher** | NeuroWays Core |
| **Erstellt am** | 2026-07-23 |
| **Veröffentlicht am** | 2026-07-23 |
| **Verpflichtend** | ja — für alle Datenmodelle |
| **Gültig ab** | 2026-07-23 |
| **Abhängigkeiten** | NW-STD-000 (normativ), NW-STD-001 (normativ) |
| **Wird referenziert von** | – |
| **Supersedes** | – |
| **Superseded by** | – |
| **Bemerkungen** | Ausnahme: Bestehende Collections verwenden created/updated statt created_at/updated_at. Wird bei nächster MAJOR-Migration korrigiert. |

---

## Reservierte Nummern (planned / archiviert)

| Code | Titel | Status | Bemerkung |
|------|-------|--------|-----------|
| NW-STD-010 | Versioning Standard | planned | Phase 2 |
| NW-STD-011 | API Standard | planned | Phase 2 |
| NW-STD-012 | Security Standard | planned | Phase 3 |
| NW-STD-013 | Lifecycle Standard | planned | Phase 3 |
| NW-STD-030 | Coding Standard | planned | Phase 4 |
| NW-STD-031 | Testing Standard | planned | Phase 4 |
| NW-STD-050 | Design System Standard | planned | Phase 4 |
| NW-STD-051 | Accessibility Standard | planned | Phase 4 |
| NW-STD-070 | Document Standard | planned | Phase 5 |
| NW-GOV-001 | Standards Governance | planned | Phase 5 |

---

## Abhängigkeitsgraph

```
NW-STD-000 (Framework)
├── NW-STD-001 (Naming)       depends_on: NW-STD-000
├── NW-STD-002 (Registry)     depends_on: NW-STD-000
└── NW-STD-003 (Database)     depends_on: NW-STD-000, NW-STD-001

NW-DSN-001 (World Design)     informativ referenziert NW-STD-000
```

Keine zirkulären Abhängigkeiten. ✅

---

*NW-STD-002-REGISTER — NeuroWays Standards Registry v1.0.0 — Status: published — 2026-07-23*
