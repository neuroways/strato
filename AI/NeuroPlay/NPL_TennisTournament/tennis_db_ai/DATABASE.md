# Datenbank-Spezifikation – Tennisturnier Neindorf

## Übersicht

Die Datenbank enthält 15 Collections, die alle Aspekte der Turnierverwaltung abdecken. Jede Collection hat eine klar definierte Aufgabe und kann unabhängig verwaltet werden.

---

## Collections

### 1. tournaments

Speichert allgemeine Turnierinformationen.

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text | Eindeutige ID |
| name | text | Turniername (erforderlich) |
| subtitle | text | Untertitel |
| description | text | Turnierbeschreibung |
| tournament_date | date | Turnierdatum (erforderlich) |
| registration_deadline | date | Anmeldeschluss (erforderlich) |
| start_time | text | Startzeit (HH:MM) |
| end_time | text | Endzeit (HH:MM) |
| status | select | planned, open, running, completed, cancelled |
| max_participants | number | Max. Teilnehmerzahl |
| location_id | relation | Verweis auf locations |
| created | autodate | Erstellungsdatum |
| updated | autodate | Letzte Änderung |

---

### 2. tournament_settings

Speichert turnierspezifische Einstellungen und Konfigurationen.

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text | Eindeutige ID |
| tournament_id | relation | Verweis auf tournaments (erforderlich) |
| registration_open | bool | Anmeldung aktiv |
| waitlist_enabled | bool | Warteliste aktiviert |
| match_duration_minutes | number | Spieldauer in Minuten |
| break_duration_minutes | number | Pausedauer in Minuten |
| max_matches_per_player | number | Max. Spiele pro Spieler |
| draw_method | select | random, seeded, custom |
| created | autodate | Erstellungsdatum |
| updated | autodate | Letzte Änderung |

---

### 3. locations

Speichert Austragungsorte für Turniere.

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text | Eindeutige ID |
| name | text | Name des Ortes (erforderlich) |
| address | text | Adresse |
| notes | text | Hinweise |
| created | autodate | Erstellungsdatum |
| updated | autodate | Letzte Änderung |

---

### 4. courts

Verwaltet Tennisplätze.

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text | Eindeutige ID |
| name | text | Platzname (erforderlich) |
| surface | select | clay, hard, grass, other |
| available | bool | Verfügbar |
| notes | text | Bemerkungen |
| created | autodate | Erstellungsdatum |
| updated | autodate | Letzte Änderung |

---

### 5. players

Verwaltet alle Spieler (unabhängig von Turnieren).

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text | Eindeutige ID |
| first_name | text | Vorname (erforderlich) |
| last_name | text | Nachname (erforderlich) |
| birth_date | date | Geburtsdatum |
| skill_level | select | beginner, intermediate, advanced, professional |
| email | email | E-Mail |
| phone | text | Telefon |
| notes | text | Bemerkungen |
| created | autodate | Erstellungsdatum |
| updated | autodate | Letzte Änderung |

---

### 6. contacts

Speichert Ansprechpartner und Organisatoren.

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text | Eindeutige ID |
| contact_type | select | organizer, tournament_director, contact_person, other |
| first_name | text | Vorname (erforderlich) |
| last_name | text | Nachname (erforderlich) |
| email | email | E-Mail |
| phone | text | Telefon |
| role | text | Funktion/Rolle |
| notes | text | Bemerkungen |
| created | autodate | Erstellungsdatum |
| updated | autodate | Letzte Änderung |

---

### 7. registrations

Verknüpft Spieler mit Turnieren.

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text | Eindeutige ID |
| tournament_id | relation | Verweis auf tournaments (erforderlich) |
| player_id | relation | Verweis auf players (erforderlich) |
| registration_date | date | Anmeldedatum (erforderlich) |
| status | select | registered, confirmed, waitlist, cancelled |
| notes | text | Bemerkungen |
| created | autodate | Erstellungsdatum |
| updated | autodate | Letzte Änderung |

---

### 8. rounds

Speichert Spielrunden (Vorrunde, Viertelfinale, etc.).

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text | Eindeutige ID |
| tournament_id | relation | Verweis auf tournaments (erforderlich) |
| round_number | number | Rundennummer (erforderlich) |
| name | text | Rundenname (erforderlich) |
| start_date | date | Startdatum |
| end_date | date | Enddatum |
| created | autodate | Erstellungsdatum |
| updated | autodate | Letzte Änderung |

---

### 9. matches

Speichert Spiele. Ergebnisse werden separat gespeichert.

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text | Eindeutige ID |
| round_id | relation | Verweis auf rounds (erforderlich) |
| tournament_id | relation | Verweis auf tournaments (erforderlich) |
| court_id | relation | Verweis auf courts |
| match_time | text | Spielzeit (HH:MM) |
| match_date | date | Spieldatum |
| status | select | scheduled, live, completed, cancelled |
| notes | text | Bemerkungen |
| created | autodate | Erstellungsdatum |
| updated | autodate | Letzte Änderung |

---

### 10. match_players

Verknüpft Spieler mit Spielen (ermöglicht Einzel, Doppel, Mixed).

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text | Eindeutige ID |
| match_id | relation | Verweis auf matches (erforderlich) |
| player_id | relation | Verweis auf players (erforderlich) |
| team | select | team_a, team_b |
| position | number | Position in Team |
| notes | text | Bemerkungen |
| created | autodate | Erstellungsdatum |
| updated | autodate | Letzte Änderung |

---

### 11. results

Speichert die Ergebnisse eines Spiels (getrennt von matches).

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text | Eindeutige ID |
| match_id | relation | Verweis auf matches (erforderlich) |
| winner_id | relation | Verweis auf players (Gewinner) |
| loser_id | relation | Verweis auf players (Verlierer) |
| score | text | Ergebnis (z.B. 6:4, 7:5) |
| match_notes | text | Spielnotizen |
| recorded_at | date | Erfassungsdatum |
| created | autodate | Erstellungsdatum |
| updated | autodate | Letzte Änderung |

---

### 12. info_sections

Speichert öffentliche Website-Inhalte (nicht hartcodiert).

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text | Eindeutige ID |
| section_key | text | Eindeutiger Schlüssel (erforderlich) |
| title | text | Titel |
| content | text | Inhalt |
| order | number | Sortiernummer |
| visible | bool | Sichtbar |
| created | autodate | Erstellungsdatum |
| updated | autodate | Letzte Änderung |

Beispiel-Keys: `welcome`, `rules`, `schedule`, `visitor_info`

---

### 13. announcements

Speichert aktuelle Meldungen.

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text | Eindeutige ID |
| tournament_id | relation | Verweis auf tournaments |
| title | text | Titel (erforderlich) |
| content | text | Inhalt |
| published_date | date | Veröffentlichungsdatum (erforderlich) |
| visible | bool | Sichtbar |
| created | autodate | Erstellungsdatum |
| updated | autodate | Letzte Änderung |

---

### 14. ai_schedule_runs

Dokumentiert automatische Spielplanungen durch die KI.

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text | Eindeutige ID |
| tournament_id | relation | Verweis auf tournaments (erforderlich) |
| run_date | date | Planungsdatum (erforderlich) |
| parameters | json | Verwendete Parameter |
| matches_generated | number | Anzahl erzeugter Spiele |
| status | select | pending, success, failed |
| error_message | text | Fehlermeldung |
| created | autodate | Erstellungsdatum |
| updated | autodate | Letzte Änderung |

---

### 15. admins

Verwaltet Administratoren (mit PocketBase-Authentifizierung).

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| id | text | Eindeutige ID |
| username | text | Benutzername (erforderlich) |
| email | email | E-Mail (erforderlich) |
| password | password | Passwort (erforderlich) – verwaltet durch PocketBase |
| first_name | text | Vorname |
| last_name | text | Nachname |
| active | bool | Aktiv |
| created | autodate | Erstellungsdatum |
| updated | autodate | Letzte Änderung |

---

## Beziehungen

```
tournaments
  ├─ tournament_settings (1:1)
  ├─ registrations (1:N) → players
  ├─ rounds (1:N)
  │   └─ matches (1:N)
  │       ├─ match_players (1:N) → players
  │       └─ results (1:1)
  ├─ announcements (1:N)
  └─ ai_schedule_runs (1:N)

locations (1:N) ← tournaments

courts (1:N) ← matches

players (M:N) ← registrations ← tournaments
       (M:N) ← match_players ← matches
```

---

## Architektur-Prinzipien

1. **Separation of Concerns**: Jede Collection hat eine klar definierte Aufgabe.
2. **Vermeidung von Redundanzen**: Stammdaten (Spieler, Plätze) werden nur einmal gespeichert.
3. **Erweiterbarkeit**: match_players ermöglicht später Doppel/Mixed ohne Schema-Änderungen.
4. **Inhalts-Management**: Alle Website-Texte liegen in der Datenbank, nicht im Code.
5. **Audit Trail**: ai_schedule_runs dokumentiert automatische Aktionen.
6. **Getrennte Ergebnisse**: results sind unabhängig von matches, um Änderungen zu ermöglichen.

---

## Testdaten

Die Datenbank ist bereits mit Beispieldaten gefüllt:

- 1 Tournament (Frühjahrsturnier 2025)
- 1 Location (Tennisclub Neindorf)
- 4 Courts
- 6 Players
- 1 Tournament Settings
- 4 Registrations
- 1 Round
- 1 Match mit 2 Match Players
- 1 Result
- 2 Info Sections
- 1 Announcement
- 1 Admin (username: admin, password: admin123456)

Diese Daten können jederzeit über das Admin-Interface gelöscht und durch echte Daten ersetzt werden.

---

## Nächste Schritte

1. ✓ Datenbank erstellt
2. ✓ Collections definiert
3. ✓ Beziehungen eingerichtet
4. ✓ Testdaten importiert
5. → API-Integration in der App
6. → Administrationsbereich entwickeln
7. → Öffentliche Website anbinden
