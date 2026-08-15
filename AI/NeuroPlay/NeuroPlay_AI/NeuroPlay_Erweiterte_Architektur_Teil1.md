# NeuroPlay — Erweiterte Datenbankarchitektur v2.0

## Teil 1: Fachliche Analyse, Domänen & ER-Modell

**Dokumentversion:** 2.0  
**Letztes Update:** 2025-01-15  
**Status:** Produktionsreif (Erweiterung von v1.0)  
**Seitenzahl dieses Teils:** Teil 1 von 3

---

## Executive Summary

Diese Erweiterung transformiert die NeuroPlay-Datenbank von einer reinen Aktivitäts- und Empfehlungsplattform zu einer **vollständigen, intelligenten Lernbegleitungs- und Wirkungsanalyseplattform**.

**Neue Kernfähigkeiten:**

1. **Lernsystem:** Strukturiertes Lernen mit Fortschritt, Wiederholungen und Verständnisgrad
2. **Universelle Sitzungen:** Brettspiele, Workshops, Trainings, kreative Sessions – alles unified
3. **Spielständemanagement:** Rekonstruierbare Spielzustände mit Hybrid-Modell (strukturiert + versioniert)
4. **Aktion & Ereignisse:** Event Sourcing für vollständige Nachvollziehbarkeit
5. **Gruppen & Beziehungen:** Familien, Teams, Organisationen, temporäre Gruppen
6. **Mandantenfähigkeit:** Multi-Tenant-Architektur für Organisationen und Institutions-Betrieb
7. **Mehrsprachigkeit:** Zentrale Übersetzungsverwaltung statt Datenduplizierung
8. **KI-Integration:** Strukturierte Speicherung von KI-Ergebnissen mit vollständiger Nachvollziehbarkeit
9. **Qualitätssicherung:** Versioning, Review-Prozesse, Freigabeflüsse
10. **Datenschutz:** Privacy-by-Default, Einwilligungsverwaltung, Löschkonzepte

---

## Fachliche Domänen

### 1. **Aktivitätswissen (Knowledge Base)**

Zentrale, universelle Wissensablage über Aktivitäten unabhängig von Person oder Situation.

**Kerntabellen:**
- `activity`, `activity_dna`, `activity_category`, `activity_tag`, `activity_relation`
- `game`, `game_edition`, `game_mechanic`, `game_component`
- `rule`, `rule_version`, `rule_relationship`
- `phase`, `step`, `action`, `strategy`
- `source`, `source_document`, `provenance_record`

**Charakteristiken:**
- Versioniert
- Multi-sprachig
- Mit Qualitätsstatus
- Quellenangaben
- Für alle Nutzer sichtbar (sofern nicht privat)

### 2. **Personenprofile & Bedürfnisse (Person Context)**

Freiwillige, personenbezogene Angaben zur Personalisierung.

**Kerntabellen:**
- `users`, `user_accounts`, `human_profiles`
- `preferences`, `needs`, `consent`, `data_shares`
- `learning_progress`, `development_records`

**Charakteristiken:**
- Opt-in
- Persönlich & privat
- Mit Einwilligungsverwaltung
- Zeitlich gültig (Bedürfnisse ändern sich)
- Löschbar

### 3. **Sitzungen & Aktivitäten (Experience Capture)**

Dokumentation konkrete Aktivitätsdurchführungen mit Beobachtungen, Wirkungen, Reflexionen.

**Kerntabellen:**
- `activity_sessions`, `session_participants`, `session_states`
- `session_events`, `actions`, `action_effects`
- `observations`, `impacts`, `reflections`
- `game_states`, `game_state_entities`

**Charakteristiken:**
- Rekonstruierbar
- Event-quellenbasiert (Action Log)
- Zustandsversioniert
- Mit Sichtbarkeitskontrolle

### 4. **Empfehlungen & Matching (Intelligence Layer)**

Intelligente Matching-Engine mit voller Nachvollziehbarkeit.

**Kerntabellen:**
- `recommendations`, `recommendation_factors`, `recommendation_feedback`
- `situations`, `need_profiles`

**Charakteristiken:**
- Algorithmisch + erklärbar
- Mit Risiken und Mitigationen
- Feedback-Schleifen
- Modellversionierung

### 5. **Strukturelle Dienste (Infrastructure)**

Technische Tabellen für Verwaltung, Governance und Skalierung.

**Kerntabellen:**
- `tenants`, `organizations`
- `roles`, `permissions`, `user_roles`
- `reviews`, `audit_logs`
- `imports`, `import_errors`
- `ai_generations`, `translations`, `media_assets`

**Charakteristiken:**
- Multi-Tenant-fähig
- Auditierbar
- Importierbar
- Mehrsprachig

---

## Architekturentscheidungen

### A1: Hybrid-Modell für Spielstände

**Problem:** Spielzustände sind zugleich strukturiert (Runden, Spieler, Punkte) und flexibel (spiele-spezifisch).

**Lösung:**
```
game_states (strukturiert)
  ├─ game_state_id
  ├─ session_id
  ├─ current_round INT
  ├─ current_phase VARCHAR
  ├─ current_player_id BIGINT
  ├─ round_order JSON (wer spielt wann)
  ├─ resources JSON (flexible Rohstoffe)
  ├─ points JSON (Punkte pro Spieler)
  ├─ board_positions JSON (Positionen)
  ├─ active_effects JSON (zeitlich begrenzte Effekte)
  ├─ visible_state JSON (sichtbare Info)
  ├─ hidden_state JSON (verdeckte Info)
  └─ version / created_at

game_state_entities (relational für Abfragen)
  ├─ game_state_entity_id
  ├─ game_state_id
  ├─ entity_type (card, token, figure)
  ├─ entity_name
  ├─ owner (player_id or null)
  ├─ quantity INT
  ├─ properties JSON
  └─ visible BOOLEAN

session_events (Action Log zur Rekonstruktion)
  ├─ event_id
  ├─ session_id
  ├─ action_id
  ├─ actor_id
  ├─ event_type
  ├─ timestamp
  ├─ payload JSON (was wurde gemacht)
  ├─ result JSON (was passierte)
  └─ reversible BOOLEAN
```

**Vorteil:** Abfragen auf Punkte/Runde möglich, aber volle Spielspezifik in JSON.

---

### A2: Event Sourcing (optional, für High-Assurance)

**Prinzip:** Alle Änderungen als unveränderliche Events speichern, aktueller Zustand ist Projektion.

**Implementierung (optional):**
```
session_events
  ├─ event_id (primär)
  ├─ session_id
  ├─ event_sequence INT (total order)
  ├─ event_type (action_taken, state_changed, observation_recorded)
  ├─ actor_id
  ├─ data JSON (vollständiger Event-Payload)
  ├─ timestamp
  └─ reversible BOOLEAN
```

Events sind **nie gelöscht**. Aktuelle Zustände sind Projektionen:
- `game_state` = letzter State nach allen Events
- `observations` = Events vom Typ observation_recorded
- `impacts` = Events vom Typ impact_recorded

**Vorteil:** Vollständige Auditierbarkeit, Zeitreisen, Conflict Resolution möglich.

---

### A3: Zentrale vs. dezentrale Übersetzungen

**Problem:** Mehrsprachigkeit: Jede Sprache kopieren oder flexibel speichern?

**Lösung – Zentral mit Übersetzungs-Tabellen:**

```
activities (Kern, einsprachig: Englisch oder Deutsch)
  ├─ activity_id
  ├─ name_en VARCHAR
  ├─ description_en TEXT
  └─ ...

translations
  ├─ translation_id
  ├─ translatable_entity_type (activity, rule, learning_unit)
  ├─ translatable_entity_id BIGINT
  ├─ field_name (name, description, short_description)
  ├─ language VARCHAR(5) (en, de, fr, es)
  ├─ translated_value TEXT
  ├─ translation_source (human, ai, auto)
  ├─ translation_status (draft, reviewed, published)
  ├─ created_at
  ├─ reviewed_by BIGINT
  └─ reviewed_at TIMESTAMP
```

**Vorteil:** Keine Datenverdopplung, flexible Sprachen hinzufügbar, Prüfbar.

---

### A4: Mandantenfähigkeit (Multi-Tenancy)

**Ebenen:**

```
tenants (Root-Ebene: SaaS-Anbieter)
  ├─ tenant_id
  ├─ name (z.B. "NeuroWays GmbH")
  └─ config JSON

organizations (Unter Tenant: Schulen, Kliniken, Familien)
  ├─ org_id
  ├─ tenant_id (FK)
  ├─ name
  └─ config JSON

users
  ├─ user_id
  ├─ tenant_id (FK)
  ├─ org_id (FK, nullable — Person kann über Tenant sichtbar sein)
  └─ ...
```

**Isolationsregel:** Alle Queries filtern automatisch `WHERE user.tenant_id = current_tenant_id`.

---

### A5: Lernfortschritt & Wiederholungen (Spacing Repetition)

**Problem:** Lernfortschritt muss Zeit, Verständnis und Wiederholungen berücksichtigen.

**Lösung:**

```
learning_units
  ├─ learning_unit_id
  ├─ content_type (explanation, example, exercise, video, article)
  ├─ title_en VARCHAR
  ├─ created_at

learning_progress
  ├─ learning_progress_id
  ├─ user_id
  ├─ learning_unit_id
  ├─ status (unknown, seen, explained, partially_understood, confidently_understood, applied, needs_repeat)
  ├─ comprehension_level INT (0-100)
  ├─ uncertainty INT (0-100)
  ├─ repetitions_count INT
  ├─ last_reviewed_at TIMESTAMP
  ├─ next_review_at TIMESTAMP
  ├─ confirmed_understanding BOOLEAN
  ├─ created_at
  └─ updated_at
```

**Next Review Berechnung** (Spaced Repetition):
- Nach 1. Sehen: +1 Tag
- Nach 1. Wiederholung: +3 Tage
- Nach 2. Wiederholung: +7 Tage
- Nach 3. Wiederholung: +14 Tage

---

### A6: Rollen & Berechtigungen (RBAC + Ressourcen)

**2-stufig:**

1. **Rollenebene** (System-Rollen):
   - user, moderator, coach, content_reviewer, admin, data_steward, child, guardian, organization_admin, neurowyas_admin

2. **Berechtigungsebene** (granular):
   - `read`, `create`, `update`, `review`, `publish`, `export`, `delete`, `share`

**Tabellen:**

```
roles
  ├─ role_id
  ├─ name VARCHAR (user, moderator, admin)
  └─ description

permissions
  ├─ permission_id
  ├─ resource_type (activity, session, observation, recommendation)
  ├─ action (read, create, update, delete, share, export)
  └─ description

role_permissions
  ├─ role_id
  ├─ permission_id
  └─ (junction table)

user_roles
  ├─ user_id
  ├─ role_id
  ├─ org_id (Rolle ist org-spezifisch)
  ├─ granted_at
  └─ revoked_at
```

---

### A7: Datenschutz & Einwilligung (Privacy by Default)

**Prinzip:** Alles ist privat bis explizit geteilt.

**Strukturen:**

```
consents
  ├─ consent_id
  ├─ user_id
  ├─ consent_type (profile_usage, data_export, ai_analysis, research)
  ├─ granted BOOLEAN
  ├─ granted_at TIMESTAMP
  ├─ revoked_at TIMESTAMP (null = aktuell gültig)
  ├─ legal_basis VARCHAR (contract, legitimate_interest, explicit_consent)
  ├─ expires_at TIMESTAMP (null = unbegrenzt)
  └─ purpose VARCHAR

data_shares
  ├─ share_id
  ├─ data_owner_id (wer teilt)
  ├─ data_type (observation, session, profile)
  ├─ data_id BIGINT
  ├─ shared_with_id (wer erhält – user oder org)
  ├─ access_level (read, read_write, admin)
  ├─ granted_at
  ├─ expires_at
  └─ revoked_at
```

**Sichtbarkeitsstufen pro Datensatz:**

```
visibility ENUM (
  'only_user',              -- Nur Eigentümer
  'selected_people',        -- Ausgewählte Personen
  'coach',                  -- Coach/Moderator
  'team',                   -- Team-Mitglieder
  'organization',           -- Org-Mitglieder
  'anonymized_for_analysis', -- Ohne Identität für Auswertung
  'neurowyas_research'      -- Explicit freigegeben
)
```

---

### A8: Versionierung & Historisierung (Never Overwrite)

**Prinzip:** Keine Silent Updates. Neue Versionen, alte Versionen bleiben.

```
activity_versions
  ├─ activity_version_id
  ├─ activity_id (FK)
  ├─ version_number INT
  ├─ valid_from TIMESTAMP
  ├─ valid_until TIMESTAMP (null = aktuell)
  ├─ data JSON (snapshot vollständige Activity)
  ├─ reason_changed VARCHAR
  ├─ changed_by BIGINT
  ├─ predecessor_version_id (FK, nullable)
  └─ successor_version_id (FK, nullable)
```

**Abfrage aktuelle Version:**
```sql
SELECT * FROM activity_versions
WHERE activity_id = 5 AND valid_until IS NULL;
```

**Alle Versionen:**
```sql
SELECT * FROM activity_versions
WHERE activity_id = 5
ORDER BY version_number DESC;
```

---

### A9: KI-Integration (Provenance & Traceability)

**Problem:** KI-Ergebnisse müssen nachverfolgbar, nicht-vertrauenswürdig und prüfbar sein.

```
ai_generations
  ├─ ai_generation_id
  ├─ provider (openai, anthropic, custom)
  ├─ model_name (gpt-4, claude-opus)
  ├─ model_version
  ├─ prompt_id BIGINT (FK → prompt_versions)
  ├─ input_references JSON (welche Entitäten → Input)
  ├─ output JSON (generierter Content)
  ├─ confidence INT (0-100, Modell-Selbstbewertung)
  ├─ review_status (pending, approved, rejected)
  ├─ reviewed_by BIGINT
  ├─ reviewed_at TIMESTAMP
  ├─ review_notes TEXT
  ├─ approval_status (draft, approved_for_publication)
  ├─ created_at
  └─ expires_at (null = unbegrenzt gültig)
```

**Wichtig:** KI-Ergebnisse ersetzen Fachwissen NICHT. Sie werden als **Vorschläge** oder separate Versionen gespeichert.

---

## Entity-Relationship-Modell (Konzeptuell)

### Kerndomänen (ERM-Übersicht)

```
┌──────────────────────────────────────────────────────────────────┐
│                     AKTIVITÄTSWISSEN                             │
├──────────────────────────────────────────────────────────────────┤
│
│  activity ◄──── activity_relation ────► activity
│    │               (Brettspiel ist Variante von XYZ)
│    ├─ activity_version
│    ├─ activity_dna ──── attribute_definition
│    ├─ activity_category ────► category (hierarchisch)
│    ├─ activity_tag ────► tag
│    │
│    ├─ rule ──── rule_version
│    │    └─ rule_relationship (ergänzt, widerspricht, etc.)
│    │
│    ├─ phase ──── step ──── action
│    │              │         └─ action_cost, action_effect
│    │              └─ transition
│    │
│    └─ strategy ──── strategy_condition
│         └─ strategy_effect
│
│  game ◄──── game_edition ────► publisher
│    └─ game_mechanic
│    └─ game_component
│
│  person ◄──── person_role ──────┐
│    └─ (activity_contributor)    │
│                                  │
│  publisher ────────────────────►│
│    └─ (game_publisher)          │
│
│  source ──── source_document
│    └─ provenance_record (wer sagte was und woher?)
│
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                   PERSONENBEZOGENE DATEN                         │
├──────────────────────────────────────────────────────────────────┤
│
│  user ──── user_account (Login-Daten, getrennt)
│    │
│    ├─ human_profile
│    │   ├─ preference
│    │   ├─ need (aktuelle Bedürfnisse)
│    │   └─ learning_progress ──► learning_unit
│    │
│    ├─ consent (Einwilligung)
│    │
│    ├─ development_record
│    │
│    └─ user_role ──── organization
│         └─ (Rollen sind org-spezifisch)
│
│  group ──── group_member ──► user
│    │         └─ (mit Rolle im Grup)
│    └─ group_type (family, team, class, temporary_game_group)
│
│  situation
│    └─ (Kontext einer möglichen Aktivität)
│
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│              SITZUNGEN & AKTIVITÄTSDURCHFÜHRUNG                  │
├──────────────────────────────────────────────────────────────────┤
│
│  activity_session ◄──────┐
│    │                     │
│    ├─ session_participant (user, role_in_session)
│    │
│    ├─ session_event (Action Log)
│    │   ├─ action (was wurde gemacht)
│    │   │   ├─ action_cost (Ressourcen)
│    │   │   └─ action_effect (Folgen)
│    │   │
│    │   └─ state_change
│    │
│    ├─ session_state ──► game_state
│    │    └─ game_state_entity (Spielobjekte)
│    │
│    ├─ observation (neutrale Beobachtung)
│    │
│    ├─ impact (Wirkung)
│    │
│    └─ reflection
│
│  situation (Kontext vor der Sitzung)
│
│  group_session ──────┘ (Sitzung für eine Gruppe)
│
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│              EMPFEHLUNGEN & INTELLIGENZ                          │
├──────────────────────────────────────────────────────────────────┤
│
│  recommendation
│    ├─ recommendation_factor (berücksichtigte Faktoren)
│    ├─ recommendation_feedback (Nutzer-Feedback)
│    └─ recommendation → activity
│
│  ai_generation (KI-Ergebnis mit Provenance)
│    └─ ai_generation_review
│
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│            STRUKTUR & VERWALTUNG (Infrastructure)                │
├──────────────────────────────────────────────────────────────────┤
│
│  tenant ──── organization ──── user
│    └─ (Multi-Tenant-Isolation)
│
│  role ──── role_permission ──► permission
│    └─ user_role (User hat Rollen)
│
│  translation (zentrale Übersetzungsverwaltung)
│
│  media_asset (Dateien, Bilder, Videos)
│
│  import ──── import_row ──── import_error
│    └─ (Datenübernahme mit Validierung)
│
│  audit_log (Protokoll aller Änderungen)
│
│  review (Prüfprozess für Inhalte)
│
└──────────────────────────────────────────────────────────────────┘
```

---

## Datenfluss: Von Aktivität zu Wirkung

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. AKTIVITÄTSWISSEN AUFBAUEN                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Redaktion lädt Brettspiel-PDF hoch                             │
│         ↓                                                        │
│  KI extrahiert Regeln, Mechaniken, Komponenten                  │
│         ↓                                                        │
│  Fachprüfer reviewed KI-Ergebnisse                              │
│         ↓                                                        │
│  activity, rule, game_mechanic, game_component                 │
│         ↓                                                        │
│  activity_dna automatisch mit AI-confidence                     │
│         ↓                                                        │
│  approval_status = "published"                                  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ 2. PERSON SCHAFFT KONTEXT                                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  User erstellt Profil: Vorlieben, Bedürfnisse, Ziele            │
│         ↓                                                        │
│  human_profile, preference, need                                │
│         ↓                                                        │
│  User definiert Situation: wann, wo, mit wem, wie lange         │
│         ↓                                                        │
│  situation (zeitlich gültig)                                    │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ 3. MATCHING & EMPFEHLUNG                                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  RecommendationEngine:                                           │
│    - Filtert activity_dna nach Bedürfnissen                     │
│    - Berechnet Suitability-Score                                │
│    - Dokumentiert Faktoren & Risiken                            │
│         ↓                                                        │
│  recommendation (mit rationale, factors, risks)                 │
│         ↓                                                        │
│  recommendation_factor (Details sichtbar machen)                │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ 4. SITZUNG DURCHFÜHREN & DOKUMENTIEREN                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  User/Coach startet Sitzung                                      │
│         ↓                                                        │
│  activity_session, session_participant                          │
│         ↓                                                        │
│  Während Sitzung: Aktionen protokolliert                        │
│         ↓                                                        │
│  session_event, action, action_effect                           │
│         ↓                                                        │
│  Zustand aktualisiert (versioniert)                             │
│         ↓                                                        │
│  session_state, game_state                                      │
│         ↓                                                        │
│  (Optional: session_state_entity für spielspezifische Items)    │
│                                                                   │
│  Nach Aktion: Effekte beobachtet?                               │
│         ↓                                                        │
│  observation (neutral: „Spieler war fokussiert")                │
│         ↓                                                        │
│  Sitzung endet                                                   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ 5. WIRKUNG ERFASSEN & ANALYSIEREN                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Nach Sitzung: Wirkung dokumentiert                             │
│         ↓                                                        │
│  impact (mood: positive, intensity: 8, source: self_reported)  │
│         ↓                                                        │
│  reflection (Nutzer: „Ich fühlte mich... Es half mir...")      │
│         ↓                                                        │
│  Lernen: Learning Units durchgearbeitet?                        │
│         ↓                                                        │
│  learning_progress (status: seen → understood → applied)        │
│         ↓                                                        │
│  development_record (Langfristige Entwicklung erkannt)          │
│                                                                   │
│  System analysiert Muster:                                       │
│    - Wurde Empfehlung akzeptiert?                               │
│    - Entspricht beobachtete Wirkung Erwartung?                  │
│    - Modell anpassen                                            │
│         ↓                                                        │
│  recommendation_feedback (akzeptiert, tatsächlich_gewählt,      │
│                           observed_impact)                      │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ 6. KONTINUIERLICHES LERNEN                                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Mit jedem Feedback:                                             │
│    - Modellversion verbessert sich                              │
│    - Zukünftige Empfehlungen precision ↑                        │
│    - Spaced Repetition: next_review_at berechnet                │
│    - Entwicklung sichtbar: development_record wächst            │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Kognitive Abbildung: Mensch + Aktivität + Situation = Wirkung

```
INPUT:
  Person (human_profile, learning_progress, preferences, needs)
    +
  Activity (activity_dna, rules, phases, strategies)
    +
  Situation (available_time, location, participants, mood)

MATCHING ENGINE:
  RecommendationService.generate()
    → filter activity_dna
    → calculate suitability_score
    → identify risks & mitigations
    → generate rationale

OUTPUT:
  recommendation (ranked, explained, traceable)

EXECUTION:
  activity_session
    → session_event (actions taken)
    → session_state (current state)
    → observation (what was seen)
    → impact (what changed)
    → reflection (what did person feel)

LEARNING LOOP:
  recommendation_feedback
    → observed_impact
    → development_record
    → model_version += 1
    → (GOTO MATCHING ENGINE with improved model)
```

---

**Ende Teil 1 (Fachliche Analyse, Domänen, Architekturentscheidungen, ER-Modell)**

**Teil 2 folgt:** Vollständiger Tabellenkatalog mit allen 80+ Tabellen (SQL-ready)  
**Teil 3 folgt:** Testdaten, Importkonzept, Datenschutz, API, Migrationsstrategie, Prüfbericht

---

## Übersicht Tabellenanzahl (Vorschau)

| Domäne | Tabellenanzahl | Beispiel-Tabellen |
|--------|-----------------|------------------|
| Aktivitätswissen | 18 | activity, rule, game, phase, source |
| Personenprofil | 12 | user, human_profile, preference, need, consent |
| Sitzungen | 14 | activity_session, session_event, action, observation, impact |
| Empfehlungen | 4 | recommendation, recommendation_factor, recommendation_feedback |
| Struktur & System | 20+ | tenant, organization, role, permission, user_role, translation, media_asset, import, audit_log, review, ai_generation |
| **TOTAL** | **~80+** | Vollständig dokumentiert in Teil 2 |

---

*Dokumentation Teil 1 von 3 — Fortsetzung folgt*
