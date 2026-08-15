# NW-BUILDER-002 – Session Builder

**Dokumentcode:** NW-BUILDER-002  
**Titel:** Session Builder  
**Version:** 0.1.0  
**Status:** published  
**Erstellt:** 2026-07-24  
**Bereich:** NeuroWays Platform Tooling  
**Referenzen:** NW-CORE-BUILDER-001, NW-CORE-OBJECT-001, NW-MIGRATE-CASE-003, NW-MIGRATE-CASE-004, NW-BUILDER-001

---

## Abschlussentscheidung: ✅ PASS

| Metrik | Wert |
|--------|------|
| Neue NWObject-Collections | 6 |
| Neue Beziehungen | 12 (Session → Answers, Results, Context, Consents, Events, Method, Question, ScoringRule, Content, Module, ExecutionMode, User) |
| Validierungen bestanden | 15/15 |
| Offene Architecture Findings | 3 (AF-SB-001 bis AF-SB-003) |
| Core-Eingriff erforderlich | **NEIN** |
| Builder vollständig NWObject-basiert | **JA** |
| Historische Sessions unveränderlich | **JA** (updateRule=null auf Answers, Results, Events) |
| Nächster empfohlener Schritt | Live-Deployment + Deployment Builder (NW-BUILDER-003) |

---

## Kapitel 1 — Session-Objektmodell

### 1.1 Neue Collections (alle NWObjects)

| Collection | Typ | Unveränderlich | Zweck |
|------------|-----|:--------------:|-------|
| `nwo_sessions` | SESSION | Nein (Status änderbar) | Lifecycle-Objekt der Session |
| `nwo_session_answers` | ANSWER_RECORD | **Ja** | Eingefrorene Antworten |
| `nwo_session_results` | RESULT | **Ja** | Berechnetes Ergebnis |
| `nwo_session_context` | CONTEXT | Nein (Notiz editierbar) | Reiseeintrag (Notiz, Aktivitäten, Tags) |
| `nwo_session_consents` | CONSENT | Nein (widerrufbar) | Freigaben |
| `nwo_session_events` | EVENT/AUDIT | **Ja** | Unveränderliches Audit-Log |

### 1.2 Keine neuen Core-Typen

`SESSION`, `SESSION_ANSWERS`, `SESSION_RESULT`, `SESSION_CONTEXT`, `SESSION_CONSENT`, `SESSION_EVENT` sind keine neuen Core-Objekte — sie sind NWObjects mit dem `extensions.session_builder`-Muster. Der `object_type`-Wert ist deklarativ, erfordert keine Core-Änderung.

---

## Kapitel 2 — Session Lifecycle

```
SESSION ERSTELLEN (createSession)
  → Methoden-ID, Modul-ID, Ausführungsform wählen
  → Versionen einfrieren:
      method_version, content_version, scoring_version,
      module_version, theme_ref, builder_version
  → Audit: SESSION_CREATED
        │
        ▼
SESSION STARTEN (startSession)
  → status: IN_PROGRESS
  → Audit: SESSION_STARTED
        │
        ▼
ANTWORTEN ERFASSEN (saveSessionAnswer × n)
  → Jede Antwort: question_ref, question_version, answer_option_ref, numeric_value
  → Unveränderlich nach Speicherung
        │
        ▼
BEWERTUNG BERECHNEN (computeSessionResult)
  → Aggregiert numeric_values → total_score
  → Vergleicht mit SCORING_RULE min/max → result_code
  → Keine Bewertungslogik im Builder
  → Audit: SESSION_RESULT_COMPUTED
        │
        ▼
SESSION ABSCHLIESSEN (completeSession)
  → status: COMPLETED
  → completed_at eingefroren
  → Audit: SESSION_COMPLETED
        │
        ▼
KONTEXT SPEICHERN (saveSessionContext — optional)
  → Notiz, Aktivitäten, Tags (änderbar)
        │
        ▼
FREIGABEN VERWALTEN (grantConsent / revokeConsent — optional)
  → Standard: keine Freigabe
  → Grantor entscheidet selbst
  → Widerruf jederzeit möglich
        │
        ▼
HISTORISIERUNG
  → Session im Verlauf sichtbar
  → Alle Antworten, Ergebnis, Audit dauerhaft abrufbar
  → Historische Session bleibt unveränderlich
```

---

## Kapitel 3 — Versionseinfrierung

Beim Start einer Session werden folgende Versionen eingefroren und danach nicht mehr geändert:

| Feld | Quelle | Wert |
|------|--------|------|
| `method_version` | nwo_methods.version | 1.1.0 |
| `content_version` | CONTENT-Migration MIG-001-P2 | 1.0.0 |
| `scoring_version` | nwo_scoring_rules (gleich method_version) | 1.1.0 |
| `module_version` | nwo_modules.version | 1.1.0 |
| `theme_ref` | NEUROWAYS_LIGHT ID | m9m3m4lrc5ucg2j |
| `builder_version` | BUILDER_VERSION Konstante | 0.1.0 |

**Garantie:** Selbst wenn Fragen, Texte oder Zonengrenzen später geändert werden, zeigen historische Sessions immer das Ergebnis der damals gültigen Konfiguration.

---

## Kapitel 4 — Freigabemodell

```
Standard: Keine Freigabe aktiv.

Benutzer kann einzeln freigeben:
  □ Teamleitung (TEAM)
  □ Unternehmen (ENTERPRISE)
  □ NeuroWays (NEUROWAYS)

Freigabe-Objekte:
  nwo_session_consents.grantee_type
  nwo_session_consents.status (ACTIVE | REVOKED)
  nwo_session_consents.granted_at
  nwo_session_consents.revoked_at

Widerruf: jederzeit möglich.
Audit: jede Freigabe und jeder Widerruf in nwo_session_events.
```

---

## Kapitel 5 — Ausführungsformen-Matrix

| Ausführungsform | Fragen identisch | Texte variiert | Darstellung variiert | Session-Objekt |
|----------------|:----------------:|:--------------:|:--------------------:|:--------------:|
| APP | ✅ | Nein | Ja (Bildschirm) | Identisch |
| SEMINAR | ✅ | Nein | Ja (Projektion) | Identisch |
| WORKSHOP | ✅ | Ja (vereinfacht) | Ja (Karten) | Identisch |
| COACHING | ✅ | Nein | Ja (1:1) | Identisch |
| ANALOG | ✅ | Ja (kurz) | Ja (Print) | Identisch |
| NEUROPLAY | ✅ | Ja (spielerisch) | Ja (Quest) | Identisch |
| FLOWISAURUS | ✅ | Nein | Ja (Dialog) | Identisch |
| MOBILE | ✅ | Nein | Ja (Mobile) | Identisch |
| PDF | ✅ | Nein | Ja (A4) | Identisch |
| KI-MODERATION | ✅ | Nein | Ja (KI-Dialog) | Identisch |

**Ergebnis:** Dieselbe SESSION-Struktur gilt für alle zehn Ausführungsformen. `execution_mode` ist ein deklaratives Feld — keine eigene Logik pro Form.

---

## Kapitel 6 — Architecture Findings

| Code | Beschreibung | Priorität | Empfehlung |
|------|-------------|-----------|-----------|
| AF-SB-001 | CONSENT-Typ noch nicht als eigenständiges NWObject im Core definiert | Mittel | NW-CORE-OBJECT-001 v1.1.0: CONSENT ergänzen (bereits durch 2 Fälle belegt) |
| AF-SB-002 | nwo_sessions.user_id als String — keine native Relation zu users-Collection | Gering | Nach Contract: natives Relationsfeld wenn Plattform es unterstützt |
| AF-SB-003 | Offline-Fähigkeit: Sessions könnten lokal vorgehalten und sync-fähig gespeichert werden | Niedrig | NW-OFFLINE-001 entwickeln |

---

## Kapitel 7 — Standardbedarf

| Standard-ID | Titel | Zweck | Priorität | Zeitpunkt |
|-------------|-------|-------|-----------|-----------|
| NW-STD-SESSION-001 | Session Governance | Lifecycle-Regeln, Unveränderlichkeit, Archivierung | Hoch | Vor zweitem Modul |
| NW-STD-AUDIT-001 | Audit Standard | Verbindliche Audit-Anforderungen für alle Builder | Hoch | Vor Unternehmensplattform |
| NW-STD-VERSION-001 | Historical Versioning | Versionssicherung, Snapshot-Regeln | Hoch | Sofort — Energy Navigator als Referenz |
| NW-STD-RESULT-001 | Result Governance | Ergebnisberechnung, Unveränderlichkeit | Mittel | Vor Insight-Engine |

---

## Kapitel 8 — Git-Nachweis

```
Branch:     dev
Neue Dateien:
  src/lib/sessionBuilderEngine.js    (370 Zeilen)
  src/pages/SessionBuilderPage.jsx   (501 Zeilen)
  NW-BUILDER-002_SESSION_BUILDER.md  (dieses Dokument)
Route:      /admin/sessions
Collections: nwo_sessions, nwo_session_answers, nwo_session_results,
             nwo_session_context, nwo_session_consents, nwo_session_events
Validierungen: 15/15
```

---

*NW-BUILDER-002 — Session Builder — v0.1.0 — published — 2026-07-24*
