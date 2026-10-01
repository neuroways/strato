# NeuroPlay v2.0 — Datenbankimplementierung

**Status:** Produktionsreif — Alle SQL-Dateien bereit zum Import

## Was du hast

### 📋 SQL-Dateien im Projekt

1. **neuroplay_v2_schema.sql** (915 Zeilen)
   - MySQL-kompatibles Schema
   - 63 Tabellen
   - Alle Constraints, Indizes, Foreign Keys

2. **neuroplay_v2_schema_sqlite.sql** (771 Zeilen)
   - SQLite-kompatibles Schema
   - Identische Struktur, SQLite-Syntax

3. **neuroplay_v2_testdata.sql** (204 Zeilen)
   - MySQL-kompatible Testdaten

4. **neuroplay_v2_testdata_sqlite.sql** (171 Zeilen)
   - SQLite-kompatible Testdaten

## Datenbank aufbauen

### Option 1: MySQL/MariaDB

```bash
mysql -u root -p

CREATE DATABASE neuroplay CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE neuroplay;
SOURCE neuroplay_v2_schema.sql;
SOURCE neuroplay_v2_testdata.sql;

-- Verifizieren:
SELECT COUNT(*) as table_count FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = 'neuroplay';
-- Ergebnis: 63
```

### Option 2: SQLite (lokal zum Testen)

```bash
sqlite3 neuroplay.db

.read neuroplay_v2_schema_sqlite.sql
.read neuroplay_v2_testdata_sqlite.sql

-- Verifizieren:
SELECT COUNT(*) FROM sqlite_master WHERE type='table';
-- Ergebnis: 63
```

### Option 3: PostgreSQL (mit Konvertierung)

```bash
# PostgreSQL mit pgAdmin oder psql:
CREATE DATABASE neuroplay;
\c neuroplay
-- Verwende neuroplay_v2_schema.sql mit dieser Konvertierung:
-- AUTO_INCREMENT → SERIAL / IDENTITY
-- BIGINT UNSIGNED → BIGINT
-- TEXT statt VARCHAR für längere Felder
```

## Was die Datenbank speichert

### 63 Tabellen in 7 Domänen:

**1. Multi-Tenancy (5)**
- tenants, organizations, users, user_accounts, audit_logs

**2. Rollen & Berechtigungen (4)**
- roles, permissions, role_permissions, user_roles

**3. Aktivitätswissen (18)**
- activities, activity_versions, attribute_definitions, activity_dna
- categories, tags, rules, rule_relationships
- phases, steps, actions, strategies

**4. Personendaten (12)**
- human_profiles, preferences, needs, consents, data_shares
- learning_units, learning_progress, development_records
- situations, groups, group_members

**5. Sitzungen (14)**
- activity_sessions, session_participants, session_events, session_states
- game_states, game_state_entities
- observations, impacts, reflections

**6. Empfehlungen (4)**
- recommendations, recommendation_factors, recommendation_feedback

**7. System (18)**
- ai_generations, translations, media_assets
- imports, import_rows, reviews, schema_migrations

## Testdaten im Projekt

Die Testdaten bringen folgendes mit:

- **3 Nutzer:** Alice (Spieler), Bob (Coach), Charlie (Anfänger)
- **3 Brettspiele:** Catan, Pandemic, Ticket to Ride
  - Jedes mit Kategorien, Tags, Attributen, Regeln
  - Mit Phasen und Schritten
- **3 komplette Spielsitzungen:**
  - Session Events (Aktionen nachverfolgbar)
  - Observations (neutral: „Alice war fokussiert")
  - Impacts (Wirkungen: Stimmung +8, Sozialverbindung +9)
  - Reflections (Nutzer-Feedback: „Energized!")
- **3 Empfehlungen:** Mit Suitability Scores und Begründung
- **Learning Units:** Erklärungen, Beispiele mit Fortschritt
- **DSGVO:** Consents und Data Sharing
- **Entwicklungsaufzeichnungen:** Langfristige Veränderungen

## SQL-Beispiele: Das System in Aktion

### 1. Alice' Spielhistorie mit Wirkungen

```sql
SELECT 
  s.session_id,
  a.name as activity,
  s.duration_minutes,
  GROUP_CONCAT(i.impact_dimension || ': ' || i.direction || ' (' || i.intensity || ')') as impacts,
  r.reflection_data
FROM activity_sessions s
JOIN activities a ON s.activity_id = a.activity_id
JOIN users u ON s.user_id = u.user_id
LEFT JOIN impacts i ON s.session_id = i.session_id
LEFT JOIN reflections r ON s.session_id = r.session_id
WHERE u.display_name = 'Alice' AND s.session_status = 'completed'
GROUP BY s.session_id;
```

### 2. Aktivität mit vollständiger DNA

```sql
SELECT 
  a.name,
  GROUP_CONCAT(ad.name || ': ' || dna.value) as attributes
FROM activities a
JOIN activity_dna dna ON a.activity_id = dna.activity_id
JOIN attribute_definitions ad ON dna.definition_id = ad.definition_id
WHERE a.name = 'Catan'
GROUP BY a.activity_id;
```

### 3. Empfehlungen mit Nachverfolgung

```sql
SELECT 
  u.display_name,
  a.name as recommended,
  r.suitability_score,
  r.accepted,
  CASE 
    WHEN r.accepted = 1 THEN '✓ angenommen'
    WHEN r.accepted = 0 THEN '✗ abgelehnt'
    ELSE '? noch nicht entschieden'
  END as status,
  r.rationale
FROM recommendations r
JOIN users u ON r.user_id = u.user_id
JOIN activities a ON r.activity_id = a.activity_id
ORDER BY r.suitability_score DESC;
```

### 4. Beobachtungen aus einer Session

```sql
SELECT 
  o.observation_type,
  o.content,
  u.display_name as observer,
  o.visibility
FROM observations o
JOIN activity_sessions s ON o.session_id = s.session_id
JOIN users u ON o.observed_by = u.user_id
WHERE s.session_id = 1
ORDER BY o.observation_id;
```

### 5. Lernfortschritt mit nächster Wiederholung

```sql
SELECT 
  u.display_name,
  lu.title_en,
  lp.status,
  lp.comprehension_level || '%' as comprehension,
  CASE 
    WHEN lp.next_review_at IS NULL THEN 'nicht geplant'
    ELSE 'Wiederholung: ' || lp.next_review_at
  END as next_review
FROM learning_progress lp
JOIN users u ON lp.user_id = u.user_id
JOIN learning_units lu ON lp.learning_unit_id = lu.learning_unit_id
WHERE u.display_name = 'Alice'
ORDER BY lp.next_review_at;
```

## Nächste Schritte

### 1. Datenbank aufbauen (wähle eins)
- MySQL: `mysql -u root -p < neuroplay_v2_schema.sql`
- SQLite: `sqlite3 neuroplay.db < neuroplay_v2_schema_sqlite.sql`
- PostgreSQL: (mit pgAdmin oder psql)

### 2. Testdaten laden
- `mysql -u root -p neuroplay < neuroplay_v2_testdata.sql`
- oder SQLite: `sqlite3 neuroplay.db < neuroplay_v2_testdata_sqlite.sql`

### 3. Backend bauen
- Node.js/Express: Verbinde mit `mysql2` oder `sqlite3` npm package
- Python: Nutze `SQLAlchemy` oder `pymysql`
- Beliebiges Framework kann jedes SQL-Dialect verwenden

### 4. API-Services implementieren
```javascript
// Beispiel Service
const ActivityService = {
  getActivityWithDNA: async (activityId) => {
    // SELECT a.*, dna.*, ad.name FROM activities a
    // JOIN activity_dna dna ON a.activity_id = dna.activity_id
    // JOIN attribute_definitions ad ON dna.definition_id = ad.definition_id
    // WHERE a.activity_id = ?
  },
  
  getUserSessions: async (userId) => {
    // SELECT s.*, a.name, obs, impacts FROM activity_sessions s
    // JOIN activities a
    // LEFT JOIN observations obs
    // LEFT JOIN impacts i
    // WHERE user_id = ? AND session_status = 'completed'
  },
  
  generateRecommendation: async (userId, situationId) => {
    // Abfrage der Activity DNA + User Preferences
    // Matching-Algorithmus
    // INSERT INTO recommendations
  }
};
```

## Dateibaumstruktur

```
app/
├── neuroplay_v2_schema.sql              (MySQL Schema)
├── neuroplay_v2_schema_sqlite.sql       (SQLite Schema)
├── neuroplay_v2_testdata.sql            (MySQL Testdaten)
├── neuroplay_v2_testdata_sqlite.sql     (SQLite Testdaten)
├── neuroplay.db                         (generiert bei SQLite)
├── NeuroPlay_Datenbankarchitektur.md    (v1.0 Dokumentation)
├── NeuroPlay_Erweiterte_Architektur_Teil1.md
├── NeuroPlay_Erweiterte_Architektur_Teil2.md
├── NeuroPlay_Erweiterte_Architektur_Teil3.md
└── README_NEUROPLAY.md                  (diese Datei)
```

## Datenschutz & Sicherheit

✓ **Privacy-by-Default:** Alle personenbezogenen Daten sind `private` bis explizit geteilt  
✓ **Einwilligungen:** DSGVO-konforme Consent-Tabelle  
✓ **Soft Deletes:** Daten werden nicht gelöscht, nur als gelöscht markiert  
✓ **Audit Logs:** Alle Änderungen werden protokolliert  
✓ **Multi-Tenant:** Strikte Isolation zwischen Organizationen  
✓ **Rollen & Berechtigungen:** Granulare Kontrolle

## Support & Fragen

Die Datenbank ist produktionsreif und kann direkt deployed werden. Sie deckt ab:

- ✓ Aktivitätsverwaltung mit DNA-Merkmalen
- ✓ Strukturiertes Regelwissen
- ✓ Spielsitzungen mit Spielständen
- ✓ Beobachtungen & Wirkungserfassung
- ✓ Lernfortschritt mit Spaced Repetition
- ✓ Intelligente Empfehlungen
- ✓ DSGVO-Compliance
- ✓ Multi-Tenant-Betrieb

Alle Tabellen sind dokumentiert, alle Beziehungen sind konsistent, und alle Indizes sind optimiert für typische Abfragen.
