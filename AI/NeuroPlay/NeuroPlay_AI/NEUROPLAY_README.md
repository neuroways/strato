# NeuroPlay — Vollständige Datenbankarchitektur & Implementierung

## Übersicht

Dies ist eine **produktionsreife, vollständige Datenbankarchitektur und Implementierungsanleitung** für das NeuroPlay-Modul der NeuroWays-Plattform.

NeuroPlay macht sichtbar, welche Wirkung eine Aktivität bei einem Menschen in einer bestimmten Situation entfalten kann.

**Grundmodell:**
```
Mensch + Aktivität + Situation = Wirkung
```

---

## 📦 Lieferumfang

Diese Lösung besteht aus **5 vollständigen Dokumenten**:

### 1. **NeuroPlay_Datenbankarchitektur.md** (1701 Zeilen)

Die **konzeptionelle und technische Blaupause**.

**Inhalte:**
- Architektur-Übersicht (Schichten-Modell)
- Fachliches Datenmodell (9 Kernobjekte)
- Logisches relationales Schema (38 Tabellen)
- Vollständige Tabellenstruktur mit Dokumentation
- Views für häufige Abfragen
- Service-Schicht-Architektur
- Rollen- und Berechtigungskonzept
- Versionierungs- und Migrationsstrategie
- Datenschutz (DSGVO) & Löschkonzepte

**Wer sollte das lesen:**
- Datenbankarchitekten
- Backend-Entwickler
- Projektmanager
- Compliance-Officer

---

### 2. **neuroplay_schema.sql** (762 Zeilen)

Das **produktionsreife DDL-Skript**.

**Inhalte:**
- 38 Produktions-Tabellen (MySQL/PostgreSQL/SQLite)
- Vollständige Constraints, Indizes, Foreign Keys
- 4 vordefinierte Views
- Inline-Kommentare und Dokumentation
- Migration Tracking
- Audit Logging-Infrastruktur

**Verwendung:**
```bash
mysql -u user -p database < neuroplay_schema.sql
```

---

### 3. **neuroplay_testdata.sql** (545 Zeilen)

**Realistische Testdaten** mit echten Brettspiel-Beispielen.

**Inhalte:**
- 8 Kategorien
- 22 Attribut-Definitionen
- 28 Tags
- 7 Publisher & 8 Personen
- 5 Beispiel-Aktivitäten (Catan, Pandemic, Ticket to Ride, 7 Wonders, Splendor)
- 5 Test-Benutzer mit Profilen
- 3 Sessions mit Beobachtungen und Wirkungen
- 2 Situationen
- 2 Empfehlungen

**Verwendung:**
```bash
mysql -u user -p database < neuroplay_testdata.sql
```

Nach dem Import sind Sie sofort bereit, die API zu testen.

---

### 4. **NeuroPlay_API_Dokumentation.md** (1171 Zeilen)

Die **vollständige REST API-Spezifikation**.

**Inhalte:**
- Authentication (Login, Register, Token Refresh)
- 50+ dokumentierte Endpoints
- Request/Response-Beispiele (JSON)
- Query Parameter und Pagination
- Error Handling & Status Codes
- Rate Limiting
- 10+ integrale Beispiele (curl/fetch)

**API-Kategorien:**
- Activities (CRUD, Attribute, Rules)
- Sessions (Erstellung, Dokumentation)
- Observations & Impacts (Datenerfassung)
- Recommendations (Matching Engine)
- User Profiles (Personalisierung)
- Analytics (Dashboard-Daten)
- Categories & Tags (Klassifizierung)

---

### 5. **NeuroPlay_Implementierung.md** (936 Zeilen)

Das **technische Implementierungs- und Deployment-Handbuch**.

**Inhalte:**
- Schnellstart (5 Schritte)
- Datenbankeinrichtung (MySQL/PostgreSQL)
- Node.js/Express Beispielcode
- Service Layer Pattern
- Frontend Integration (React)
- Docker & Kubernetes Deployment
- Testing (Unit, Integration, E2E)
- Monitoring & Logging
- Health Checks

**Fertige Code-Beispiele:**
- Express Server Setup
- ActivityService mit CRUD
- Authentication Middleware
- React API Client
- Jest Unit Tests
- Integration Tests
- Docker Compose
- Kubernetes YAML

---

## 🗂️ Datenbankstruktur (Übersicht)

### 9 Kernentitäten

```
1. ACTIVITY (Zentral)
   ├─ ActivityDNA (Merkmale/Attribute)
   ├─ Rule (Spielregeln, strukturiert)
   ├─ GameObject (Materialien, Figuren)
   ├─ ActivityCategory (Klassifizierung)
   └─ ActivityTag (Flexible Markierung)

2. USER (Authentifizierung & Identität)
   ├─ HumanProfile (Optionale Präferenzen)
   └─ Need (Aktuelle Bedürfnisse)

3. SITUATION (Kontext & Umgebung)

4. SESSION (Aktivitätsdurchführung)
   ├─ Observation (Neutrale Beobachtung)
   ├─ Impact (Wirkungen & Veränderungen)
   └─ Reflection (Nachgedanken)

5. RECOMMENDATION (Empfehlung)

6. DEVELOPMENT (Langfristige Entwicklung)

7. SOURCE (Quellenverzeichnis)
   └─ Document (Dokumentenverwaltung)

8. REFERENCE TABLES
   ├─ Category, Tag
   ├─ AttributeDefinition
   ├─ Person, Publisher
   └─ Source Attribution

9. SYSTEM TABLES
   ├─ SchemaMigration
   └─ AuditLog
```

---

## 🎯 Kernfeatures

### ✅ Flexible Merkmalsmodellierung

Nicht in starre Spalten gezwungen:
- 22+ vordefinierte Attribute (erweiterbar)
- Unterschiedliche Datentypen (number, text, enum, JSON, boolean)
- Confidence-Level (0-100) für jedes Merkmal
- Herkunftsangabe (redaktionell, KI, Beobachtung, Nutzer)
- Versionierung

### ✅ Strukturiertes Regelwerk

Regeln sind nicht nur Freitext:
- 9 Regeltypen (Basic, Action, Phase, Scoring, Exception, Variant, Errata, etc.)
- Strukturierte Felder (Phase, Akteure, Voraussetzung, Aktion, Folge)
- Beziehungen zwischen Regeln (ergänzt, überschreibt, widerspricht, Ausnahme)
- Priorität & Konflikt-Auflösung
- Quellenreferenz & Seitenangebenveränderung

### ✅ Neutrale Beobachtungserfassung

Trennung: Fakten vs. Interpretation:
- Observation: Was wurde gesehen? (neutral)
- Impact: Welche Wirkung entstand? (abgeleitet)
- Development: Langfristige Veränderung (verifiziert)

### ✅ Nachvollziehbare Empfehlungen

Nicht Black-Box:
- Empfehlung speichert: Begründung, berücksichtigte Faktoren, Gegenargumente, Risiken
- Modellversion für Reproduzierbarkeit
- Feedback-Schleifen (akzeptiert? tatsächlich gewählt? Wirkung beobachtet?)
- Accuracy Tracking

### ✅ Vollständige Quellenverwaltung

Wissen ist nachverfolgbar:
- 10 Quellentypen (offizielle Regeln, Publisher-Seite, Video, Wissenschaft, KI, Nutzer, etc.)
- Vertrauensstufe pro Quelle
- Verifikationsstatus
- Source Attribution (welche Aussage kommt woher?)

### ✅ Datenschutz & DSGVO

Privacy by Design:
- Soft Deletes überall (Nachvollziehbarkeit)
- Anonymisierungs-Prozesse
- Explizite Consent-Verwaltung
- Auditlog für alle Änderungen
- Right to be Forgotten
- Rollenbasierte Sichtbarkeit

### ✅ Mehrsprachig & Plattformunabhängig

- Standard SQL (MySQL, PostgreSQL, SQLite)
- Unicode/UTF-8 überall
- Keine proprietären Features
- Migrierbar zu jeder DB

---

## 🚀 Schnellstart

### 1. Datenbankschema laden

```bash
# MySQL
mysql -u root -p -e "CREATE DATABASE neuroplay CHARACTER SET utf8mb4;"
mysql -u root -p neuroplay < neuroplay_schema.sql
mysql -u root -p neuroplay < neuroplay_testdata.sql

# Verifizierung
mysql -u root -p neuroplay -e "SELECT COUNT(*) FROM information_schema.TABLES WHERE TABLE_SCHEMA='neuroplay';"
# Erwartet: 38 Tabellen + 4 Views
```

### 2. Backend starten (Node.js)

```bash
npm install
npm run dev
```

### 3. Erste API-Anfrage

```bash
# Aktivitäten auflisten
curl http://localhost:3000/api/v1/activities

# Authentifizieren
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"password"}'

# Token verwenden
curl -H "Authorization: Bearer <token>" \
  http://localhost:3000/api/v1/users/me
```

### 4. Daten erkunden

Alle Testdaten sind geladen:
- 5 Brettspiele (Catan, Pandemic, etc.)
- 5 Testbenutzer
- 3 abgeschlossene Sessions mit Observations & Impacts
- 2 Empfehlungen

---

## 📐 Architektur-Highlights

### Ebenen-Trennung

```
┌─────────────────────────────────────┐
│     REST API Layer                  │
├─────────────────────────────────────┤
│     Service Layer                   │
│  - ActivityService                  │
│  - SessionService                   │
│  - RecommendationEngine             │
│  - AnalyticsService                 │
├─────────────────────────────────────┤
│     Data Access Layer (Repository)  │
│  - ActivityRepository               │
│  - SessionRepository                │
│  - ObservationRepository            │
├─────────────────────────────────────┤
│     Database Layer                  │
│  - MySQL / PostgreSQL / SQLite      │
└─────────────────────────────────────┘
```

### Datenfluss: Session erfassen

```
Frontend: "Session beendet"
  ↓
POST /sessions/:id/observations
  ↓
SessionService.recordObservation()
  ↓
INSERT INTO observation (...)
  ↓
POST /sessions/:id/impacts
  ↓
SessionService.recordImpact()
  ↓
INSERT INTO impact (...)
  ↓
Frontend: "Daten gespeichert"
```

### Empfehlungs-Pipeline

```
User + Situation + Bedürfnisse
  ↓
RecommendationEngine.generate()
  ↓
1. Alle Aktivitäten laden
2. Nach Merkmalen filtern
3. Suitability-Score berechnen
4. Risiken & Mitigationen identifizieren
5. Begründung generieren
  ↓
INSERT INTO recommendation (...) mit allen Faktoren
  ↓
API gibt Empfehlungen zurück
```

---

## 📊 Datenbeispiele

### Aktivität mit vollem Kontext

```json
{
  "activity_id": 1,
  "name": "Catan",
  "activity_type": "board_game",
  "attributes": [
    {
      "attribute_name": "Rules Complexity",
      "value": "moderate",
      "confidence": 95,
      "source_type": "redactional"
    },
    {
      "attribute_name": "Strategic Depth",
      "value": "high",
      "confidence": 95,
      "source_type": "redactional"
    }
  ],
  "rules": [
    {
      "rule_type": "basic_rule",
      "title": "Victory Points",
      "short_description": "First to 10 victory points wins",
      "applies_to_phase": "end_of_turn"
    }
  ],
  "sources": [
    {
      "source_type": "official_rules",
      "title": "Catan Official Rules (5th Edition)",
      "trust_level": 100,
      "verification_status": "expert_approved"
    }
  ],
  "stats": {
    "total_sessions": 234,
    "positive_impact_percentage": 89,
    "last_used_at": "2025-01-15T18:30:00Z"
  }
}
```

### Session mit Beobachtung & Impact

```json
{
  "session_id": 42,
  "activity_id": 1,
  "user_id": 1,
  "started_at": "2025-01-15T19:00:00Z",
  "ended_at": "2025-01-15T20:05:00Z",
  "duration_minutes": 65,
  
  "observations": [
    {
      "observation_type": "engagement",
      "content": "All players stayed focused throughout the game",
      "confidence": 95,
      "visibility": "shared"
    }
  ],
  
  "impacts": [
    {
      "impact_dimension": "mood",
      "direction": "positive",
      "intensity": 8,
      "source": "self_reported"
    },
    {
      "impact_dimension": "social_connection",
      "direction": "positive",
      "intensity": 9,
      "source": "self_reported"
    }
  ],
  
  "reflection": {
    "feeling": "happy_and_engaged",
    "what_helped": "Clear rules explanation",
    "would_repeat": true
  }
}
```

### Empfehlung mit Begründung

```json
{
  "recommendation_id": 1001,
  "activity_id": 2,
  "activity_name": "Pandemic",
  "ranking": 1,
  "suitability_score": 92,
  
  "rationale": "Pandemic strongly matches your need for social connection and cooperative gameplay. Your group size and available time are perfect.",
  
  "considered_factors": {
    "needs": ["social_connection"],
    "preferences": ["cooperative"],
    "group_size": 3,
    "available_time": 120,
    "mood": "relaxed"
  },
  
  "risks_and_mitigations": [
    {
      "risk": "Game might be too stressful",
      "mitigation": "Consider playing in casual mode without time pressure"
    }
  ],
  
  "required_adaptations": [
    "Clear rules explanation before starting"
  ],
  
  "uncertainty_level": 8,
  "model_version": "v1.0",
  
  "accepted": null,
  "feedback": null
}
```

---

## 🔒 Berechtigungsmodell

| Rolle | Beschreibung | Kann |
|-------|-------------|------|
| **Guest** | Unregistriert | Aktivitäten lesen |
| **User** | Registriert | Sessions erstellen, Beobachtungen speichern, Empfehlungen erhalten |
| **Moderator** | Content-Verantwortliche | Aktivitäten editieren, Regeln pflegen, Community-Inhalte freigeben |
| **DataSteward** | Daten-Qualität | Quellen verwalten, Migrationen, Versionierung |
| **Admin** | Systemadministration | Alles, Nutzerverwaltung, Konfiguration |

---

## 🛠️ Tech Stack (Empfohlen)

### Backend
- **Node.js + Express** oder **Python + Flask/FastAPI** oder **Go**
- **MySQL 8.0+** oder **PostgreSQL 12+**
- **JWT** für Authentication
- **Docker** für Deployment

### Frontend
- **React 18** oder **Vue 3**
- **TypeScript**
- **TailwindCSS** oder **Material-UI**

### DevOps
- **Docker & Docker Compose**
- **Kubernetes** (für Scale)
- **GitHub Actions** (für CI/CD)
- **Prometheus + Grafana** (für Monitoring)

---

## 📋 Verwendungs-Szenarien

### Szenario 1: Aktivitäts-Katalog

```
1. Admin lädt Brettspielregeln hoch
2. System extrahiert & strukturiert Regeln
3. Moderator bewertet Qualität
4. Aktivität wird veröffentlicht
5. Nutzer sehen strukturierte Anleitung
```

### Szenario 2: Persönliches Matching

```
1. Nutzer erstellt Profil (Vorlieben, Bedürfnisse)
2. Nutzer lädt Session-Daten hoch
3. RecommendationEngine analysiert
4. System schlägt passende Aktivitäten vor
5. Nutzer probiert Vorschlag aus
6. System speichert tatsächliche Wirkung
7. Modell wird mit echtem Feedback trainiert
```

### Szenario 3: Bedarfs-Optimierung

```
1. Therapeut erkennt: "Client braucht mehr Aktivierung"
2. System filtra nach Aktivitäten mit hohem Aktivierungspotenzial
3. System schlägt Top 3 vor
4. Therapeut führt Aktivität durch
5. Beobachtung wird dokumentiert
6. Impact wird gemessen
7. System passt zukünftige Empfehlungen an
```

---

## 📚 Weitere Ressourcen in dieser Lösung

1. **Datenbankarchitektur-Dokument:** Design-Entscheidungen, Normalisierung, Views
2. **SQL-Skripte:** Production-ready DDL + Testdaten
3. **API-Spec:** 50+ Endpoints mit vollständigen Beispielen
4. **Implementation Guide:** Code-Snippets, Deployment, Testing

---

## ✨ Was macht diese Lösung besonders?

1. **Vollständig:** Von Konzept bis Deployment
2. **Produktionsreif:** Kein "Spielzeug-Code"
3. **Extensibel:** Neue Aktivitätstypen, Attribute, Quellen hinzufügbar
4. **Nachvollziehbar:** Jede Aussage hat eine Quelle, jede Empfehlung eine Begründung
5. **Privatsphäre-first:** Soft Deletes, Anonymisierung, explizite Consent
6. **Datenbankunabhängig:** Standard SQL, auf jedes DBMS migrierbar
7. **Real-World:** Basierend auf echten Anforderungen, nicht Theorie

---

## 🎓 Learning Path

**Tag 1:** Lesen Sie `NeuroPlay_Datenbankarchitektur.md` (Konzepte verstehen)  
**Tag 2:** Laden Sie `neuroplay_schema.sql` (Praktisch aufbauen)  
**Tag 3:** Durchgehen Sie `NeuroPlay_API_Dokumentation.md` (Endpoints testen)  
**Tag 4:** Folgen Sie `NeuroPlay_Implementierung.md` (Code schreiben)  
**Tag 5:** Bauen Sie Ihr erstes Feature (z.B. neue Aktivität erstellen)

---

## 📞 Support & Feedback

Diese Lösung wurde mit Sorgfalt gestaltet, um echte Anforderungen zu lösen. Bei Fragen oder Erweiterungen:

1. Lesen Sie die relevant Dokumentation
2. Überprüfen Sie die Testdaten (real use cases)
3. Testen Sie mit den bereitgestellten API-Beispielen
4. Passen Sie nach Bedarf an

---

**NeuroPlay v1.0 — Produktionsreife Datenbank für Aktivitäts- und Wirkungsanalyse**

*Erstellt: 2025-01-15*  
*Status: Produktionsreif*  
*Lizenz: Proprietär*
