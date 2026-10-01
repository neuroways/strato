# Kartenraum API v0.3.2

## GET `/api/cards.php`
Alle aktiven Karten inklusive Sheet und Position.

## GET `/api/card.php?id=major-00`
Technische Daten einer Karte.

## GET `/api/text.php?id=major-00&audience=ADULT&language=de`
Inhalt für Zielgruppe und Sprache.

Zulässige Zielgruppen:
- `ADULT`
- `CHILD`

Zulässige Sprache v0.3.2:
- `de`

## GET `/api/health.php`
Prüft Datenbankzugriff und Vollständigkeit:
- 78 Karten
- 78 ADULT/de
- 78 CHILD/de


## v0.6.0 – persönliches Erfahrungstagebuch

Alle folgenden Endpunkte benötigen `Authorization: Bearer <session_token>`.

### GET `/api/experience-list.php?draw_id=123`
Liefert ausschließlich Erfahrungseinträge zu einer Ziehung, die dem angemeldeten Profil gehört.

### POST `/api/experience-save.php`
JSON:
```json
{
  "draw_id": 123,
  "experience_text": "Heute sehe ich die Karte anders."
}
```

Optional kann `experienced_at` im Format `YYYY-MM-DD HH:MM:SS` mitgegeben werden.

Sicherheitsregel: `draw_id` wird serverseitig gegen `profile_id` der Session geprüft.
Fremde Ziehungen liefern `DRAW_NOT_FOUND`.

### GET `/api/knowledge.php`
Enthält ab v0.6.0 zusätzlich:
- `reflection_question`
- `everyday_moment`


## v0.6.1 – Journal-Einträge pro Ziehung

Alle Endpunkte benötigen:

`Authorization: Bearer <session_token>`

### GET `/api/journal-entry-list.php?draw_id=123`

Liefert alle persönlichen Journal-Einträge zu einer eigenen Ziehung.

Antwortfelder:
- `journal_entry_id`
- `draw_id`
- `entry_type`
- `depth_code`
- `entry_text`
- `created_at`
- `updated_at`

### POST `/api/journal-entry-save.php`

```json
{
  "draw_id": 123,
  "entry_type": "INSIGHT",
  "depth_code": "SYMBOLISM",
  "entry_text": "Heute sehe ich dieses Detail anders."
}
```

`depth_code` darf `null` sein, wenn sich der Eintrag auf die gesamte Ziehung bezieht.

Erlaubte `entry_type`:
- `THOUGHT`
- `INSIGHT`
- `QUESTION`
- `GOAL`
- `EXPERIENCE`

Erlaubte `depth_code`:
- `QUESTION`
- `MOMENT`
- `MEANING`
- `SYMBOLISM`
- `OTHER_DIRECTION`
- `null`

Sicherheitsregel:
Die `draw_id` wird immer gegen das eingeloggte Profil geprüft.
