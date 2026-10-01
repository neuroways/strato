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
