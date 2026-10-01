# NeuroPlay — REST API Dokumentation

**Version:** 1.0  
**Letztes Update:** 2025-01-15  
**Basis-URL:** `https://api.neuroplay.local/api/v1` (Entwicklung) / `/api/v1` (Production)

---

## Übersicht

Die NeuroPlay API ist ein vollständig REST-konformes System zur Verwaltung von Aktivitätsdaten, Beobachtungen, Empfehlungen und Nutzerprofilen.

### Authentifizierung

Alle Requests außer `POST /auth/register` und `POST /auth/login` benötigen einen Bearer Token im `Authorization`-Header.

```
Authorization: Bearer <jwt_token>
```

---

## Authentication Endpoints

### POST /auth/register

Registriert einen neuen Benutzer.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "display_name": "John Doe"
}
```

**Response (201 Created):**
```json
{
  "user_id": 1,
  "public_id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "display_name": "John Doe",
  "role": "user",
  "created_at": "2025-01-15T10:30:00Z"
}
```

---

### POST /auth/login

Authentifiziert einen Benutzer und gibt einen JWT Token zurück.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "user_id": 1,
    "public_id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "role": "user"
  },
  "expires_in": 86400
}
```

---

### POST /auth/refresh

Erneuert einen abgelaufenen Token.

**Request:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 86400
}
```

---

## Activity Endpoints

### GET /activities

Listet alle veröffentlichten Aktivitäten auf.

**Query Parameters:**
- `activity_type`: Filter nach Typ (`board_game`, `video_game`, etc.)
- `complexity`: Filter nach Komplexität (`simple`, `moderate`, `complex`)
- `min_duration`: Minimale Dauer in Minuten
- `max_duration`: Maximale Dauer in Minuten
- `category`: Filter nach Kategorie-Slug
- `tag`: Filter nach Tag-Slug
- `page`: Seitennummer (default: 1)
- `per_page`: Einträge pro Seite (default: 20, max: 100)
- `sort`: Sortierung (`name`, `-created_at`, `popularity`)

**Example Request:**
```
GET /activities?activity_type=board_game&complexity=moderate&page=1&per_page=20
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "activity_id": 1,
      "public_id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Catan",
      "slug": "catan",
      "activity_type": "board_game",
      "short_description": "Trade, build, and settle your way to victory...",
      "status": "published",
      "complexity_level": "moderate",
      "typical_duration_minutes": 60,
      "min_participants": 2,
      "max_participants": 4,
      "recommended_age_min": 10,
      "recommended_age_max": null,
      "categories": ["strategy-games", "family-games"],
      "tags": ["competitive", "turn-based", "quick-to-learn"],
      "quality_status": "expert_approved",
      "created_at": "2025-01-15T10:30:00Z",
      "updated_at": "2025-01-15T10:30:00Z"
    },
    {
      "activity_id": 2,
      "public_id": "660e8400-e29b-41d4-a716-446655440001",
      "name": "Pandemic",
      "slug": "pandemic",
      "activity_type": "board_game",
      "short_description": "Work together to save the world...",
      "status": "published",
      "complexity_level": "moderate",
      "typical_duration_minutes": 45,
      "min_participants": 2,
      "max_participants": 4,
      "recommended_age_min": 10,
      "recommended_age_max": null,
      "categories": ["cooperative-games", "family-games"],
      "tags": ["cooperative", "simultaneous-actions"],
      "quality_status": "expert_approved",
      "created_at": "2025-01-15T10:30:00Z",
      "updated_at": "2025-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 47,
    "total_pages": 3
  }
}
```

---

### GET /activities/:id

Ruft eine einzelne Aktivität mit vollständigen Metadaten ab.

**Response (200 OK):**
```json
{
  "activity_id": 1,
  "public_id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Catan",
  "slug": "catan",
  "activity_type": "board_game",
  "short_description": "Trade, build, and settle your way to victory on the island of Catan.",
  "full_description": "Catan is a game for 2-4 players...",
  "objective": "Accumulate 10 victory points before other players",
  "status": "published",
  "quality_status": "expert_approved",
  "version": 1,
  "typical_duration_minutes": 60,
  "min_duration_minutes": 45,
  "max_duration_minutes": 90,
  "min_participants": 2,
  "max_participants": 4,
  "recommended_age_min": 10,
  "recommended_age_max": null,
  "complexity_level": "moderate",
  "accessibility_notes": "...",
  "required_location_type": "indoor",
  "estimated_cost": 45.00,
  "preparation_time_minutes": 5,
  "cleanup_time_minutes": 5,
  "categories": [
    {
      "category_id": 1,
      "name": "Strategy Games",
      "slug": "strategy-games"
    },
    {
      "category_id": 4,
      "name": "Family Games",
      "slug": "family-games"
    }
  ],
  "tags": [
    { "tag_id": 2, "name": "Competitive", "slug": "competitive" },
    { "tag_id": 5, "name": "Turn-Based", "slug": "turn-based" }
  ],
  "attributes": [
    {
      "attribute_id": 5,
      "attribute_name": "Rules Complexity",
      "attribute_slug": "rules_complexity",
      "value": "moderate",
      "confidence": 95,
      "source_type": "redactional"
    },
    {
      "attribute_id": 8,
      "attribute_name": "Strategic Depth",
      "attribute_slug": "strategic_depth",
      "value": "high",
      "confidence": 95,
      "source_type": "redactional"
    }
  ],
  "rules": [
    {
      "rule_id": 15,
      "rule_type": "basic_rule",
      "title": "Victory Points",
      "short_description": "First to 10 victory points wins.",
      "applies_to_phase": "end_of_turn"
    }
  ],
  "game_objects": [
    {
      "object_id": 1,
      "object_type": "token",
      "name": "Settlement",
      "quantity": 5,
      "description": "Player-owned settlement worth 1 victory point"
    }
  ],
  "persons": [
    {
      "person_id": 1,
      "public_id": "550e8400-e29b-41d4-a716-446655440000",
      "full_name": "Klaus Teuber",
      "role_type": "author"
    }
  ],
  "publishers": [
    {
      "publisher_id": 1,
      "public_id": "660e8400-e29b-41d4-a716-446655440001",
      "name": "Catan Studio",
      "country": "Germany"
    }
  ],
  "sources": [
    {
      "source_id": 1,
      "public_id": "770e8400-e29b-41d4-a716-446655440002",
      "source_type": "official_rules",
      "title": "Catan Official Rules (5th Edition)",
      "trust_level": 100,
      "verification_status": "expert_approved"
    }
  ],
  "stats": {
    "total_sessions": 234,
    "average_session_duration": 62,
    "positive_impact_percentage": 89,
    "last_used_at": "2025-01-15T18:30:00Z"
  },
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

---

### POST /activities (Moderator+)

Erstellt eine neue Aktivität.

**Request:**
```json
{
  "name": "New Game",
  "slug": "new-game",
  "activity_type": "board_game",
  "short_description": "A new board game experience",
  "typical_duration_minutes": 45,
  "min_participants": 2,
  "max_participants": 4,
  "recommended_age_min": 10,
  "complexity_level": "moderate",
  "status": "draft"
}
```

**Response (201 Created):**
```json
{
  "activity_id": 48,
  "public_id": "880e8400-e29b-41d4-a716-446655440003",
  "name": "New Game",
  "slug": "new-game",
  "activity_type": "board_game",
  "status": "draft",
  "version": 1,
  "created_at": "2025-01-15T12:00:00Z"
}
```

---

### PATCH /activities/:id (Moderator+)

Aktualisiert eine Aktivität.

**Request:**
```json
{
  "short_description": "Updated description",
  "complexity_level": "complex",
  "status": "published"
}
```

**Response (200 OK):**
```json
{
  "activity_id": 1,
  "public_id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Catan",
  "updated_at": "2025-01-15T12:05:00Z",
  "version": 2
}
```

---

### DELETE /activities/:id (Admin+)

Löscht eine Aktivität (Soft Delete).

**Response (204 No Content)**

---

## Activity Attributes Endpoints

### GET /activities/:id/attributes

Ruft alle Attribute einer Aktivität ab.

**Response (200 OK):**
```json
{
  "activity_id": 1,
  "activity_name": "Catan",
  "attributes": [
    {
      "attribute_definition_id": 1,
      "attribute_name": "Rules Complexity",
      "attribute_slug": "rules_complexity",
      "attribute_group": "cognitive",
      "value": "moderate",
      "confidence": 95,
      "source_type": "redactional",
      "created_at": "2025-01-15T10:30:00Z"
    },
    {
      "attribute_definition_id": 3,
      "attribute_name": "Strategic Depth",
      "attribute_slug": "strategic_depth",
      "attribute_group": "cognitive",
      "value": "high",
      "confidence": 95,
      "source_type": "redactional",
      "created_at": "2025-01-15T10:30:00Z"
    }
  ]
}
```

---

### POST /activities/:id/attributes (Moderator+)

Setzt oder aktualisiert ein Attribut.

**Request:**
```json
{
  "attribute_definition_id": 5,
  "value": "high",
  "confidence": 85,
  "source_type": "ai_generated"
}
```

**Response (201 Created / 200 OK):**
```json
{
  "activity_dna_id": 145,
  "activity_id": 1,
  "attribute_definition_id": 5,
  "value": "high",
  "confidence": 85,
  "source_type": "ai_generated",
  "created_at": "2025-01-15T12:00:00Z"
}
```

---

### POST /activities/:id/attributes/bulk-import (DataSteward+)

Importiert mehrere Attribute auf einmal (z.B. aus AI-Analyse).

**Request:**
```json
{
  "attributes": [
    {
      "attribute_definition_id": 1,
      "value": "complex",
      "confidence": 70,
      "source_type": "ai_generated"
    },
    {
      "attribute_definition_id": 3,
      "value": "high",
      "confidence": 75,
      "source_type": "ai_generated"
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "imported_count": 2,
  "activity_id": 1,
  "created_at": "2025-01-15T12:00:00Z"
}
```

---

## Rules Endpoints

### GET /activities/:id/rules

Listet alle Regeln einer Aktivität auf.

**Query Parameters:**
- `rule_type`: Filter nach Regeltyp
- `sort`: Sortierung (default: `priority`)

**Response (200 OK):**
```json
{
  "activity_id": 1,
  "activity_name": "Catan",
  "rules": [
    {
      "rule_id": 1,
      "rule_type": "basic_rule",
      "title": "Player Order",
      "short_description": "Players take turns in clockwise order",
      "applies_to_phase": "entire_game",
      "priority": 100
    },
    {
      "rule_id": 2,
      "rule_type": "action_rule",
      "title": "Place Settlement",
      "short_description": "Place a settlement on an intersection",
      "applies_to_phase": "main_phase",
      "priority": 90
    }
  ]
}
```

---

### POST /activities/:id/rules (Moderator+)

Erstellt eine neue Regel.

**Request:**
```json
{
  "rule_type": "basic_rule",
  "title": "New Rule",
  "short_description": "Short description",
  "full_description": "Full rule explanation...",
  "applies_to_phase": "main_phase",
  "priority": 100
}
```

**Response (201 Created):**
```json
{
  "rule_id": 125,
  "activity_id": 1,
  "rule_type": "basic_rule",
  "title": "New Rule",
  "created_at": "2025-01-15T12:00:00Z"
}
```

---

## Session Endpoints

### POST /sessions

Erstellt eine neue Spielsession.

**Request:**
```json
{
  "activity_id": 1,
  "situation_id": 10,
  "started_at": "2025-01-15T19:00:00Z",
  "notes": "Game night with friends"
}
```

**Response (201 Created):**
```json
{
  "session_id": 42,
  "public_id": "880e8400-e29b-41d4-a716-446655440004",
  "user_id": 1,
  "activity_id": 1,
  "session_status": "in_progress",
  "started_at": "2025-01-15T19:00:00Z",
  "created_at": "2025-01-15T12:00:00Z"
}
```

---

### GET /sessions/:id

Ruft eine Session mit allen Beobachtungen und Auswirkungen ab.

**Response (200 OK):**
```json
{
  "session_id": 42,
  "public_id": "880e8400-e29b-41d4-a716-446655440004",
  "user_id": 1,
  "activity_id": 1,
  "activity_name": "Catan",
  "situation_id": 10,
  "session_status": "completed",
  "started_at": "2025-01-15T19:00:00Z",
  "ended_at": "2025-01-15T20:05:00Z",
  "duration_minutes": 65,
  "notes": "Great game night! Alice won with good strategy.",
  "participants": [
    { "user_id": 1, "name": "Alice" },
    { "user_id": null, "name": "Bob" },
    { "user_id": null, "name": "Charlie" }
  ],
  "observations": [
    {
      "observation_id": 101,
      "observation_type": "engagement",
      "content": "All players stayed focused throughout the game.",
      "observed_by": 1,
      "confidence": 95,
      "created_at": "2025-01-15T19:30:00Z"
    }
  ],
  "impacts": [
    {
      "impact_id": 50,
      "impact_dimension": "mood",
      "direction": "positive",
      "intensity": 8,
      "source": "self_reported",
      "created_at": "2025-01-15T20:10:00Z"
    },
    {
      "impact_id": 51,
      "impact_dimension": "social_connection",
      "direction": "positive",
      "intensity": 9,
      "source": "self_reported",
      "created_at": "2025-01-15T20:10:00Z"
    }
  ],
  "reflection": {
    "reflection_id": 15,
    "reflection_data": {
      "feeling": "happy_and_engaged",
      "what_helped": "Clear rules explanation",
      "what_was_difficult": "Deciding strategy",
      "would_repeat": true
    },
    "would_repeat": true,
    "created_at": "2025-01-15T20:15:00Z"
  },
  "created_at": "2025-01-15T12:00:00Z"
}
```

---

### PATCH /sessions/:id

Aktualisiert eine Session (beenden, Notizen hinzufügen, etc.).

**Request:**
```json
{
  "session_status": "completed",
  "ended_at": "2025-01-15T20:05:00Z",
  "duration_minutes": 65,
  "notes": "Updated notes after game"
}
```

**Response (200 OK):**
```json
{
  "session_id": 42,
  "session_status": "completed",
  "updated_at": "2025-01-15T12:05:00Z"
}
```

---

### GET /users/:user_id/sessions

Listet alle Sessions eines Nutzers auf.

**Query Parameters:**
- `activity_id`: Filter nach Aktivität
- `session_status`: Filter nach Status
- `from_date`: Von Datum
- `to_date`: Bis Datum
- `sort`: Sortierung (default: `-started_at`)
- `page`, `per_page`: Pagination

**Response (200 OK):**
```json
{
  "user_id": 1,
  "sessions": [
    {
      "session_id": 42,
      "public_id": "880e8400-e29b-41d4-a716-446655440004",
      "activity_id": 1,
      "activity_name": "Catan",
      "started_at": "2025-01-15T19:00:00Z",
      "duration_minutes": 65,
      "session_status": "completed",
      "impacts": [
        { "dimension": "mood", "direction": "positive", "intensity": 8 },
        { "dimension": "social_connection", "direction": "positive", "intensity": 9 }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 15,
    "total_pages": 1
  }
}
```

---

## Observation Endpoints

### POST /sessions/:session_id/observations

Erfasst eine Beobachtung während/nach einer Session.

**Request:**
```json
{
  "observation_type": "engagement",
  "content": "Player was highly engaged and made strategic decisions without hesitation.",
  "confidence": 95,
  "visibility": "shared"
}
```

**Response (201 Created):**
```json
{
  "observation_id": 102,
  "session_id": 42,
  "observation_type": "engagement",
  "content": "Player was highly engaged...",
  "confidence": 95,
  "visibility": "shared",
  "created_at": "2025-01-15T12:00:00Z"
}
```

---

### GET /sessions/:session_id/observations

Listet alle Beobachtungen einer Session auf.

**Response (200 OK):**
```json
{
  "session_id": 42,
  "observations": [
    {
      "observation_id": 101,
      "observation_type": "engagement",
      "content": "All players stayed focused throughout the game.",
      "observed_by": 1,
      "confidence": 95,
      "visibility": "shared",
      "created_at": "2025-01-15T19:30:00Z"
    },
    {
      "observation_id": 102,
      "observation_type": "interaction",
      "content": "Positive collaboration between players.",
      "observed_by": 1,
      "confidence": 90,
      "visibility": "shared",
      "created_at": "2025-01-15T20:00:00Z"
    }
  ]
}
```

---

## Impact Endpoints

### POST /sessions/:session_id/impacts

Erfasst eine Wirkung/ein Impact.

**Request:**
```json
{
  "impact_dimension": "mood",
  "direction": "positive",
  "intensity": 8,
  "source": "self_reported",
  "duration_minutes": 120,
  "context_after": "Feeling happy and relaxed after the game"
}
```

**Response (201 Created):**
```json
{
  "impact_id": 52,
  "session_id": 42,
  "impact_dimension": "mood",
  "direction": "positive",
  "intensity": 8,
  "source": "self_reported",
  "confidence": 75,
  "created_at": "2025-01-15T12:00:00Z"
}
```

---

### GET /sessions/:session_id/impacts

Listet alle Impacts einer Session auf.

**Response (200 OK):**
```json
{
  "session_id": 42,
  "impacts": [
    {
      "impact_id": 50,
      "impact_dimension": "mood",
      "direction": "positive",
      "intensity": 8,
      "source": "self_reported",
      "confidence": 75
    },
    {
      "impact_id": 51,
      "impact_dimension": "social_connection",
      "direction": "positive",
      "intensity": 9,
      "source": "self_reported",
      "confidence": 75
    }
  ]
}
```

---

## Recommendation Endpoints

### POST /recommendations

Generiert Empfehlungen basierend auf Nutzer und Situation.

**Request:**
```json
{
  "user_id": 1,
  "situation_id": 10,
  "count": 5
}
```

**Response (201 Created):**
```json
{
  "recommendations": [
    {
      "recommendation_id": 1001,
      "public_id": "990e8400-e29b-41d4-a716-446655440005",
      "activity_id": 2,
      "activity_name": "Pandemic",
      "ranking": 1,
      "suitability_score": 92,
      "rationale": "Pandemic strongly matches your need for social connection and cooperative gameplay.",
      "considered_factors": {
        "needs": ["social_connection"],
        "preferences": ["cooperative"],
        "group_size": 3,
        "available_time": 120
      },
      "alternative_activities": [3, 4],
      "uncertainty_level": 8,
      "model_version": "v1.0"
    },
    {
      "recommendation_id": 1002,
      "public_id": "aa0e8400-e29b-41d4-a716-446655440006",
      "activity_id": 3,
      "activity_name": "Ticket to Ride",
      "ranking": 2,
      "suitability_score": 85,
      "rationale": "Good alternative with similar social benefits and moderate strategic depth."
    }
  ],
  "created_at": "2025-01-15T12:00:00Z"
}
```

---

### GET /recommendations/:id

Ruft eine einzelne Empfehlung mit Details ab.

**Response (200 OK):**
```json
{
  "recommendation_id": 1001,
  "public_id": "990e8400-e29b-41d4-a716-446655440005",
  "user_id": 1,
  "activity_id": 2,
  "activity_name": "Pandemic",
  "ranking": 1,
  "suitability_score": 92,
  "rationale": "...",
  "considered_factors": { ... },
  "risks_and_mitigations": [
    {
      "risk": "Game might be too stressful",
      "mitigation": "Consider playing in casual mode without time pressure"
    }
  ],
  "required_adaptations": [
    "Clear rules explanation before starting"
  ],
  "accepted": null,
  "actually_chosen": null,
  "feedback": null,
  "created_at": "2025-01-15T12:00:00Z"
}
```

---

### PATCH /recommendations/:id/feedback

Gibt Feedback zu einer Empfehlung.

**Request:**
```json
{
  "accepted": true,
  "actually_chosen": 2,
  "feedback": "Followed your recommendation and loved it!"
}
```

**Response (200 OK):**
```json
{
  "recommendation_id": 1001,
  "accepted": true,
  "actually_chosen": 2,
  "feedback": "Followed your recommendation and loved it!",
  "updated_at": "2025-01-15T12:05:00Z"
}
```

---

## User Profile Endpoints

### GET /users/me

Ruft das Profil des aktuellen Benutzers ab.

**Response (200 OK):**
```json
{
  "user_id": 1,
  "public_id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "display_name": "Alice",
  "role": "user",
  "status": "active",
  "profile": {
    "profile_id": 1,
    "preferences": {
      "favorite_activities": ["board_game", "card_game"],
      "favorite_tags": ["cooperative", "strategy"],
      "disliked_themes": ["violence"]
    },
    "experience_level": "intermediate",
    "goals": ["improve_strategy", "social_connection"],
    "accessibility_needs": {
      "mobility": false,
      "hearing": false
    },
    "energy_preferences": "moderate_energy",
    "visibility": "friends"
  },
  "created_at": "2025-01-15T10:30:00Z"
}
```

---

### PATCH /users/me

Aktualisiert das Profil des aktuellen Benutzers.

**Request:**
```json
{
  "display_name": "Alice Smith",
  "profile": {
    "experience_level": "advanced",
    "goals": ["competitive_play", "tournament"],
    "visibility": "public"
  }
}
```

**Response (200 OK):**
```json
{
  "user_id": 1,
  "display_name": "Alice Smith",
  "profile": { ... },
  "updated_at": "2025-01-15T12:05:00Z"
}
```

---

### DELETE /users/me

Löscht den Benutzer und seine Daten (Right to be Forgotten).

**Query Parameters:**
- `reason`: Grund für Löschung (optional)
- `immediately`: Sofort löschen oder nach 30 Tagen? (default: false)

**Response (204 No Content)**

---

## Analytics Endpoints

### GET /users/:user_id/analytics

Ruft Analytik-Daten für einen Benutzer ab.

**Query Parameters:**
- `timespan`: Zeitspanne (`week`, `month`, `year`, `all`)
- `metrics`: Komma-getrennte Metriken (z.B. `activity_count,avg_mood,trends`)

**Response (200 OK):**
```json
{
  "user_id": 1,
  "timespan": "month",
  "metrics": {
    "activity_count": 8,
    "total_session_duration_minutes": 520,
    "favorite_activities": [
      { "activity_id": 1, "activity_name": "Catan", "count": 4 },
      { "activity_id": 2, "activity_name": "Pandemic", "count": 2 }
    ],
    "avg_mood_before": 5.2,
    "avg_mood_after": 7.8,
    "mood_trend": "positive",
    "avg_social_connection_impact": 8.1,
    "most_impactful_activity": "Pandemic",
    "activity_variety": 5,
    "engagement_trend": "improving"
  }
}
```

---

### GET /activities/:id/analytics

Ruft Analytik-Daten für eine Aktivität ab.

**Response (200 OK):**
```json
{
  "activity_id": 1,
  "activity_name": "Catan",
  "analytics": {
    "total_sessions": 234,
    "total_users": 67,
    "avg_session_duration": 62,
    "avg_group_size": 3.4,
    "popularity_rank": 1,
    "impact_metrics": {
      "mood": { "positive": 85, "neutral": 10, "negative": 5 },
      "social_connection": { "positive": 89, "neutral": 8, "negative": 3 },
      "learning": { "positive": 72, "neutral": 20, "negative": 8 }
    },
    "recommendation_accuracy": 87,
    "completion_rate": 95,
    "repeat_play_rate": 78
  }
}
```

---

## Category Endpoints

### GET /categories

Listet alle Kategorien auf.

**Response (200 OK):**
```json
{
  "categories": [
    {
      "category_id": 1,
      "name": "Strategy Games",
      "slug": "strategy-games",
      "description": "Games requiring strategic thinking and planning",
      "icon": "chess",
      "activity_count": 24
    },
    {
      "category_id": 2,
      "name": "Cooperative Games",
      "slug": "cooperative-games",
      "description": "Games where players work together",
      "icon": "users",
      "activity_count": 18
    }
  ]
}
```

---

## Error Responses

### Standard Error Format

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Validation error",
    "details": [
      {
        "field": "email",
        "issue": "Invalid email format"
      }
    ]
  }
}
```

---

### Common Error Codes

| Code | Status | Beschreibung |
|------|--------|-------------|
| `INVALID_REQUEST` | 400 | Validation-Fehler in Request |
| `UNAUTHORIZED` | 401 | Keine Authentifizierung |
| `FORBIDDEN` | 403 | Keine Berechtigung für diese Ressource |
| `NOT_FOUND` | 404 | Ressource nicht gefunden |
| `CONFLICT` | 409 | Konflikt (z.B. Duplikat) |
| `RATE_LIMIT_EXCEEDED` | 429 | Zu viele Requests |
| `INTERNAL_ERROR` | 500 | Interner Fehler |

---

## Rate Limiting

- **Free Tier:** 100 Requests/Stunde
- **Pro Tier:** 1000 Requests/Stunde
- **Enterprise:** Unbegrenzt

Rate-Limit-Header:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 876
X-RateLimit-Reset: 1705334400
```

---

**Ende der API-Dokumentation**
