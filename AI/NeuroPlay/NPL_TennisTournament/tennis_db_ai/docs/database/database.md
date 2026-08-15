# Datenbank – Tennisturnier Neindorf

## Übersicht

Die Datenbank basiert auf **PocketBase v0.39.0** und speichert alle Turnierdaten in 15 Collections. Die Struktur ermöglicht Einzelturniere, ist aber erweiterbar für Doppel, Mixed und mehrere gleichzeitige Turniere.

**Umgebungen:**
- **Entwicklung**: `/.sfs-bd/api` – SQLite `bd/data.db`
- **Production**: `/.sfs-be/api` – SQLite `be/data.db`

---

## Collections – Vollständige Übersicht

### 1. tournaments
**Zweck:** Speichert Turnier-Metadaten und allgemeine Informationen.

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text (PK) | Eindeutige ID |
| name | text | Turniername (erforderlich) |
| subtitle | text | Untertitel |
| description | text | Ausführliche Beschreibung |
| tournament_date | date | Turnierdatum (erforderlich) |
| registration_deadline | date | Anmeldeschluss (erforderlich) |
| start_time | text | Startzeit HH:MM |
| end_time | text | Endzeit HH:MM |
| status | select | planned, open, running, completed, cancelled |
| max_participants | number | Maximale Teilnehmerzahl |
| location_id | relation | FK zu locations |
| created | autodate | Server-generiert |
| updated | autodate | Server-generiert |

**Testdaten:** 1 Turnier "Tennisturnier Neindorf 2025"

---

### 2. tournament_settings
**Zweck:** Turnierspezifische Konfigurationen und Regelwerk.

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text (PK) | Eindeutige ID |
| tournament_id | relation | FK zu tournaments (erforderlich) |
| registration_open | bool | Anmeldung aktiv |
| waitlist_enabled | bool | Warteliste aktiviert |
| match_duration_minutes | number | Spieldauer in Minuten |
| break_duration_minutes | number | Pausedauer in Minuten |
| max_matches_per_player | number | Max. Spiele pro Spieler |
| draw_method | select | random, seeded, custom |
| created | autodate | Server-generiert |
| updated | autodate | Server-generiert |

**Testdaten:** 1 Eintrag für das Test-Turnier

**Besonderheit:** 1:1 Beziehung zu tournaments. Zentral für Regelwerk-Änderungen ohne Code-Änderung.

---

### 3. locations
**Zweck:** Speichert Austragungsorte. Ermöglicht mehrere Venues pro Turnier.

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text (PK) | Eindeutige ID |
| name | text | Name des Ortes (erforderlich) |
| address | text | Adresse |
| notes | text | Hinweise (Zufahrt, Parking, etc.) |
| created | autodate | Server-generiert |
| updated | autodate | Server-generiert |

**Testdaten:** 1 Location "Tennisclub Neindorf"

---

### 4. courts
**Zweck:** Verwaltung von Tennisplätzen.

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text (PK) | Eindeutige ID |
| name | text | Platzname (erforderlich) |
| surface | select | clay, hard, grass, other |
| available | bool | Verfügbar für Spiele |
| notes | text | Bemerkungen (Mängel, Wartung, etc.) |
| created | autodate | Server-generiert |
| updated | autodate | Server-generiert |

**Testdaten:** 4 Plätze (Asche, Hard, Asche, Hard)

**Besonderheit:** Keine Bindung an tournaments. Plätze können turnierübergreifend genutzt werden.

---

### 5. players
**Zweck:** Verwaltung aller Spieler unabhängig von Turnieren.

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text (PK) | Eindeutige ID |
| first_name | text | Vorname (erforderlich) |
| last_name | text | Nachname (erforderlich) |
| birth_date | date | Geburtsdatum |
| skill_level | select | beginner, intermediate, advanced, professional |
| email | email | E-Mail-Adresse |
| phone | text | Telefonnummer |
| notes | text | Bemerkungen |
| created | autodate | Server-generiert |
| updated | autodate | Server-generiert |

**Testdaten:** 6 Spieler (Max Müller, Anna Schmidt, Peter Weber, Lisa Meyer, Andreas Bauer, Sarah Fischer)

**Besonderheit:** Spieler existieren unabhängig von Turnieren. Ein Spieler kann sich bei mehreren Turnieren anmelden.

---

### 6. contacts
**Zweck:** Ansprechpartner und Organisatoren.

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text (PK) | Eindeutige ID |
| contact_type | select | organizer, tournament_director, contact_person, other |
| first_name | text | Vorname (erforderlich) |
| last_name | text | Nachname (erforderlich) |
| email | email | E-Mail |
| phone | text | Telefon |
| role | text | Funktion (Turnierleitung, etc.) |
| notes | text | Bemerkungen |
| created | autodate | Server-generiert |
| updated | autodate | Server-generiert |

**Testdaten:** 1 Kontakt "Klaus Schmidt" (Turnierleitung)

**Besonderheit:** Zentrale Verwaltung für Website und Admin-Bereich.

---

### 7. registrations
**Zweck:** Verknüpfung Spieler ↔ Turniere (mit Status).

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text (PK) | Eindeutige ID |
| tournament_id | relation | FK zu tournaments (erforderlich) |
| player_id | relation | FK zu players (erforderlich) |
| registration_date | date | Anmeldedatum (erforderlich) |
| status | select | registered, confirmed, waitlist, cancelled |
| notes | text | Bemerkungen |
| created | autodate | Server-generiert |
| updated | autodate | Server-generiert |

**Testdaten:** 4 Registrierungen (Status: confirmed)

**Besonderheit:** Ermöglicht Warteliste-Verwaltung. Status kann ohne Spieler-Löschung geändert werden.

---

### 8. rounds
**Zweck:** Spielrunden innerhalb eines Turniers (Vorrunde, KO-Phase).

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text (PK) | Eindeutige ID |
| tournament_id | relation | FK zu tournaments (erforderlich) |
| round_number | number | Rundennummer (1, 2, 3, ...) |
| name | text | Rundenname (erforderlich) |
| start_date | date | Startdatum der Runde |
| end_date | date | Enddatum der Runde |
| created | autodate | Server-generiert |
| updated | autodate | Server-generiert |

**Testdaten:** 1 Runde "Vorrunde"

**Besonderheit:** Reihenfolge durch round_number definiert, nicht durch Datum.

---

### 9. matches
**Zweck:** Einzelne Spiele. Ergebnisse sind GETRENNT gespeichert (results).

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text (PK) | Eindeutige ID |
| round_id | relation | FK zu rounds (erforderlich) |
| tournament_id | relation | FK zu tournaments (erforderlich) |
| court_id | relation | FK zu courts (optional) |
| match_time | text | Spielzeit HH:MM |
| match_date | date | Spieldatum |
| status | select | scheduled, live, completed, cancelled |
| notes | text | Anmerkungen |
| created | autodate | Server-generiert |
| updated | autodate | Server-generiert |

**Testdaten:** 1 Match (Vorrunde, Platz 1, 09:00)

**Besonderheit:** Spiel und Ergebnis sind absichtlich getrennt. Spiele können ohne Ergebnis geplant werden.

---

### 10. match_players
**Zweck:** Verknüpfung Spieler ↔ Spiel. Ermöglicht flexible Spielformate.

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text (PK) | Eindeutige ID |
| match_id | relation | FK zu matches (erforderlich) |
| player_id | relation | FK zu players (erforderlich) |
| team | select | team_a, team_b |
| position | number | Position in Team (Spieler 1, 2, etc.) |
| notes | text | Bemerkungen |
| created | autodate | Server-generiert |
| updated | autodate | Server-generiert |

**Testdaten:** 2 Einträge (Max Müller vs. Anna Schmidt)

**Besonderheit:** 
- Für Einzel: 2 Spieler (team_a, team_b)
- Für Doppel: 4 Spieler (2×team_a, 2×team_b)
- Für Mannschaft: N Spieler pro Team
- Schema bleibt gleich – hochflexibel!

---

### 11. results
**Zweck:** Spielergebnisse und Satz-Infos. GETRENNT von matches.

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text (PK) | Eindeutige ID |
| match_id | relation | FK zu matches (erforderlich) |
| winner_id | relation | FK zu players (optional) |
| loser_id | relation | FK zu players (optional) |
| score | text | Ergebnis (z.B. "6:4, 7:5") |
| match_notes | text | Spielnotizen |
| recorded_at | date | Erfassungsdatum |
| created | autodate | Server-generiert |
| updated | autodate | Server-generiert |

**Testdaten:** 1 Ergebnis (Max Müller gewinnt 6:4, 7:5)

**Besonderheit:** 
- Ein match kann mehrere results haben (bei Fehlern, Korrekturen)
- Matches existieren ohne results (geplante Spiele)
- Ermöglicht Audit-Trail für Änderungen

---

### 12. info_sections
**Zweck:** Website-Inhalte. Nicht hartcodiert – alles aus der DB.

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text (PK) | Eindeutige ID |
| section_key | text | Eindeutiger Schlüssel (erforderlich) |
| title | text | Anzeigetitel |
| content | text | HTML oder Markdown-Inhalt |
| order | number | Sortiernummer |
| visible | bool | Sichtbar auf Website |
| created | autodate | Server-generiert |
| updated | autodate | Server-generiert |

**Testdaten:** 2 Sections ("welcome", "rules")

**Mögliche Keys:** welcome, rules, schedule, visitor_info, faq, sponsors, history

**Besonderheit:** Zentrale Content-Verwaltung für öffentliche Website.

---

### 13. announcements
**Zweck:** News und kurzfristige Mitteilungen.

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text (PK) | Eindeutige ID |
| tournament_id | relation | FK zu tournaments (optional) |
| title | text | Ankündigung-Titel (erforderlich) |
| content | text | Detaillierter Text |
| published_date | date | Veröffentlichungsdatum (erforderlich) |
| visible | bool | Sichtbar |
| created | autodate | Server-generiert |
| updated | autodate | Server-generiert |

**Testdaten:** 1 Ankündigung "Anmeldung geöffnet"

**Besonderheit:** Optional an tournament_id gebunden. Kann auch globale News enthalten.

---

### 14. ai_schedule_runs
**Zweck:** Audit-Trail für automatische Spielplanung.

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text (PK) | Eindeutige ID |
| tournament_id | relation | FK zu tournaments (erforderlich) |
| run_date | date | Planungsdatum (erforderlich) |
| parameters | json | Verwendete Algorithmus-Parameter |
| matches_generated | number | Anzahl erzeugter Spiele |
| status | select | pending, success, failed |
| error_message | text | Fehlermeldung bei Fehler |
| created | autodate | Server-generiert |
| updated | autodate | Server-generiert |

**Testdaten:** 1 Run (Status: success, 8 Matches generiert)

**Besonderheit:** Dokumentiert AI-Ausführungen. Ermöglicht Zurückspulen und Audit.

---

### 15. admins
**Zweck:** Administratoren mit PocketBase-Auth.

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text (PK) | Eindeutige ID |
| username | text | Benutzername (erforderlich) |
| email | email | E-Mail (erforderlich) |
| password | password | Hash (PocketBase-verwaltet) |
| first_name | text | Vorname |
| last_name | text | Nachname |
| active | bool | Aktiv |
| created | autodate | Server-generiert |
| updated | autodate | Server-generiert |

**Testdaten:** 1 Admin "admin" / admin@tennis.local

**Besonderheit:** 
- Integierte PocketBase-Auth
- Passwort wird Hash-komprimiert
- Token-basierte Authentifizierung im Frontend

---

## Beziehungsdiagramm

```
tournaments (1) ──→ (M) tournament_settings
tournaments (1) ──→ (M) registrations ←──────────────→ (M) players
tournaments (1) ──→ (M) rounds ─────────→ (M) matches
tournaments (1) ──→ (M) announcements
tournaments (1) ──→ (M) ai_schedule_runs
tournaments (1) ──→ (1) locations
matches (1) ──→ (M) match_players ←──────────────→ (M) players
matches (1) ──→ (1) courts
matches (1) ──→ (M) results ←──────────────→ (M) players
```

---

## Zugriffsmuster

### Admin-Seite
```
GET tournaments → TournamentManagement
GET tournaments/:id/settings → TournamentSettings
GET players → PlayerManagement
GET registrations (filter tournament) → RegistrationManagement
GET courts → CourtManagement
GET rounds (filter tournament) → RoundManagement
GET matches (filter round) → MatchManagement
GET results (filter match) → ResultManagement
GET info_sections → ContentManagement
GET announcements → ContentManagement
```

### Public Website (später)
```
GET tournaments (status=open)
GET info_sections (visible=true, order ASC)
GET announcements (visible=true, published_date DESC)
GET rounds (tournament_id)
GET matches (tournament_id, status=scheduled/live/completed)
GET match_players (match_id)
GET results (match_id)
GET players (for leaderboard)
GET contacts (for footer)
```

---

## Datenmigration & Backup

**Entwicklung → Production:**
- Collections werden per `pb_migrate_sfs.js` kopiert (nur Schema!)
- Daten werden **nicht** migriert
- Production-DB startet leer
- Testdaten müssen manuell oder über Admin-UI seeded werden

**Backup-Strategie:**
- SQLite-DBs in `bd/` und `be/` sind direkt backupbar
- Empfehlung: Nightly Export über REST API

---

## Performance-Hinweise

- **Indizes:** PocketBase erzeugt automatisch Indizes auf Relations & Text
- **Pagination:** Max 100 Datensätze per Request im Admin-Panel
- **Filter:** `tournament_id = "X"` ist optimiert
- **N+1 Problem:** Für Leaderboards sollte Match-Player in 1 Query geladen werden

---

## Besonderheiten

1. **Match & Result sind getrennt**
   - Ein Match kann ohne Result existieren
   - Ein Match kann mehrere Results haben (Korrekturen)
   - Ermöglicht Fehlerbehandlung

2. **Match-Players ist flexible**
   - Selbe Struktur für Einzel, Doppel, Mixed, Team
   - Team-Feld bestimmt Seite
   - Position-Feld erlaubt Reihenfolge innerhalb Team

3. **Players sind unabhängig**
   - Spieler existiert ohne Registration
   - Ermöglicht Spielerdatenbank vor Turnier-Eröffnung
   - Keine Redundanzen

4. **Tournament-Settings als 1:1**
   - Settings existieren nur wenn Tournament existiert
   - Aber getrennt für flexible Verwaltung
   - Keine Redundanzen

5. **Info-Sections & Announcements**
   - Nicht hartcodiert
   - Änderungen im Admin sofort live
   - Keine Code-Redeploy nötig

---

## Summe

- **15 Collections**
- **98 Felder** (mit system fields)
- **8 Testdaten-Grundsets**
- **0 Schema-Änderungen geplant**
