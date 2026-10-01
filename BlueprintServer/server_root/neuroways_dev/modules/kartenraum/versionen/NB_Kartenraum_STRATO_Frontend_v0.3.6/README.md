# NeuroBalance Kartenraum · STRATO Frontend v0.3.6

Erster vollständig API-/MariaDB-gestützter Frontend-Pilot.

## Backend
Verwendet:

`../NB_Kartenraum_Backend_v0.3.3/api/`

- `cards.php`
- `text.php`

## Kartenassets
Verwendet weiterhin gemeinsam:

`../cards/`

also öffentlich:

`/modules/kartenraum/cards/`

## Datenfluss

```text
nb_card
  ↓
cards.php
  ↓
Karte + Sheet + Position
  ↓
eigene Wahrnehmung
  ↓
Kartenraum öffnen
  ↓
text.php?audience=ADULT|CHILD&language=de
  ↓
nb_card_text
```

## Zielgruppen
- Erwachsene / Deutsch
- Kinder / Deutsch

## Noch lokal
Die persönliche Erstwahrnehmung bleibt in v0.3.6 noch in Browser-LocalStorage.
Sie wird erst in einer späteren Backend-Stufe als persönlicher Datensatz gespeichert.

## STRATO
Ordner neben Backend und `cards/` ablegen:

```text
modules/kartenraum/
├── cards/
├── NB_Kartenraum_Backend_v0.3.3/
└── NB_Kartenraum_STRATO_Frontend_v0.3.6/
```

Danach `index.html` öffnen.
