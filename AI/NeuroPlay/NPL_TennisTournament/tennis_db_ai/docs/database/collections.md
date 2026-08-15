# Collections-Übersicht – Schnellreferenz

## Alle 15 Collections

| # | Collection | Typ | Zweck | FK zu | Records |
|---|-----------|-----|-------|--------|---------|
| 1 | tournaments | base | Turnier-Metadaten | locations | 1 |
| 2 | tournament_settings | base | Turnier-Regelwerk | tournaments | 1 |
| 3 | locations | base | Austragungsorte | — | 1 |
| 4 | courts | base | Tennisplätze | — | 4 |
| 5 | players | base | Spieler-Stammdaten | — | 6 |
| 6 | contacts | base | Ansprechpartner | — | 1 |
| 7 | registrations | base | Spieler→Turnier Bindung | tournaments, players | 4 |
| 8 | rounds | base | Spielrunden | tournaments | 1 |
| 9 | matches | base | Einzelne Spiele | tournaments, rounds, courts | 1 |
| 10 | match_players | base | Spieler→Spiel Bindung | matches, players | 2 |
| 11 | results | base | Spielergebnisse | matches, players | 1 |
| 12 | info_sections | base | Website-Inhalte | — | 2 |
| 13 | announcements | base | Ankündigungen | tournaments | 1 |
| 14 | ai_schedule_runs | base | Audit für KI-Planung | tournaments | 1 |
| 15 | admins | auth | Administrator-Accounts | — | 1 |

---

## Collections nach Kategorie

### Stammdaten (keine Turnierabhängigkeit)
- **players** – alle verfügbaren Spieler
- **courts** – Tennisplätze
- **locations** – Veranstaltungsorte
- **contacts** – Ansprechpartner
- **admins** – Administratoren

### Turnier-Konfiguration
- **tournaments** – Turnier-Grunddaten
- **tournament_settings** – Regelwerk & Einstellungen

### Turnier-Ablauf
- **registrations** – Anmeldungen (Spieler→Turnier)
- **rounds** – Spielrunden
- **matches** – Spiele
- **match_players** – Spieler↔Spiel Zuordnung
- **results** – Spielergebnisse

### Inhalte & Dokumentation
- **info_sections** – Website-Content
- **announcements** – News
- **ai_schedule_runs** – Audit-Log

---

## Zugriffshäufigkeit (erwartet)

| Collection | Read | Write | Grund |
|-----------|------|-------|-------|
| tournaments | 10+ | 1 | Dashboard, Listen, Filter |
| players | 100+ | 5 | Überall, Dropdowns, Filter |
| matches | 50+ | 10 | Spielplan, Verwaltung |
| results | 30+ | 15 | Ergebniseingabe, Anzeige |
| registrations | 20+ | 20 | Anmeldungsverwaltung |
| courts | 10+ | 2 | Match-Zuweisung, Verwaltung |
| rounds | 5+ | 2 | Match-Struktur |
| match_players | 20+ | 10 | Spieler-Zuordnung zu Matches |
| info_sections | 50+ | 1 | Website-Rendering |
| announcements | 30+ | 5 | Website-Feed, Admin |
| tournament_settings | 5+ | 1 | Einstellungen |
| contacts | 5+ | 1 | Footer, Admin |
| locations | 2+ | 1 | Tournament-Setup |
| ai_schedule_runs | 1+ | 1 | Spielplanung |
| admins | 5+ | 2 | Login, Verwaltung |

---

## Kardinalität

```
Matches pro Tournament:  1 — M (N)
Players pro Match:      1 — M (2-4 typisch)
Results pro Match:      1 — M (1-3 Korrektionen möglich)
Registrations pro Trn:  1 — M (N)
Rounds pro Tournament:  1 — M (4-8 typisch)
```

---

## Indexes (von PocketBase automatisch erzeugt)

```
tournaments:
  - id (primary)
  - tournament_date
  - status
  
players:
  - id (primary)
  - last_name
  - first_name
  
registrations:
  - id (primary)
  - tournament_id + player_id (composite für Uniqueness)
  - status
  
matches:
  - id (primary)
  - tournament_id
  - round_id
  - status
  
results:
  - id (primary)
  - match_id
  - winner_id
  
match_players:
  - id (primary)
  - match_id + player_id (composite)
  
info_sections:
  - id (primary)
  - section_key (unique)
  - visible
```

---

## Constraint-Regeln

| Collection | Constraint | Grund |
|-----------|-----------|-------|
| registrations | tournament_id + player_id unique | Keine Doppel-Anmeldung |
| matches | round_id required | Spiel muss einer Runde angehören |
| match_players | match_id + player_id unique | Spieler 2x im Match ausschließen |
| tournament_settings | tournament_id unique | 1:1 Beziehung |
| info_sections | section_key unique | Eindeutiger Identifier für Frontend |
| admins | email unique | Login-Eindeutigkeit |

---

## Test-Daten Mapping

```
Tournament #1
├── ID: (random hex)
├── Name: "Tennisturnier Neindorf 2025"
├── Date: 2025-06-15
└── Players: [Max, Anna, Peter, Lisa]
    ├── Registrations: 4x confirmed
    ├── Round: Vorrunde (round_number=1)
    ├── Match #1: Max vs Anna
    │   ├── Court: Platz 1
    │   ├── Time: 09:00
    │   └── Result: Max wins 6:4, 7:5
    └── Settings: registration_open=true

Info Sections
├── "welcome" → Willkommen
└── "rules" → Regelwerk

Announcement
└── "Anmeldung geöffnet" (published 2025-05-10)

Admin Account
└── admin@tennis.local / admin123456
```

---

## Migration & Skalierung

| Szenario | Aktion |
|----------|--------|
| 100 Spieler | Pagination implementieren |
| 1.000 Matches | Indexes auf match_date |
| 10.000 Results | Archiv-Collection erstellen |
| Multi-Turnier | Filter auf tournament_id erweitern |
| Doppel-Turniere | match_players bereits vorbereitet |

---

## Fehlerszenarien

| Fehler | Ursache | Lösung |
|--------|--------|--------|
| "Match ohne Result" | Normal | ✓ Intendiert |
| "Player ohne Registration" | Normal | ✓ Stammdaten |
| "Match ohne Spieler" | Bug | ✗ Validierung fehlt |
| "Result mit falscher match_id" | Eingabefehler | Korrektur durch Admin |
| "Doppel-Registrierung" | Unique-Constraint | ✓ DB verhindert |
