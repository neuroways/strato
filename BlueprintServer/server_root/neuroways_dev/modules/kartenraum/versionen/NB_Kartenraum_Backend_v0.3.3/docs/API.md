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
