# STRATO Installation v0.3.2

## Empfohlene Struktur

```text
modules/kartenraum/
├── cards/
├── NB_Kartenraum_Backend_v0.3.2/
└── NB_Kartenraum_STRATO_Testpaket_v0.2.4/
```

## 1. Datenbank

In phpMyAdmin in dieser Reihenfolge importieren:

1. `database/sql/001_create_nb_kartenraum.sql`
2. `database/sql/002_seed_78_cards.sql`
3. `database/sql/003_seed_major_child_de_22.sql`
4. `database/sql/004_seed_minor_adult_de_56.sql`
5. `database/sql/005_seed_minor_child_de_56.sql`
6. `database/sql/006_seed_major_adult_de_22.sql`
7. `database/sql/090_validate.sql`

Erwartet:
- 78 Karten
- 156 Texte
- ADULT/de 78
- CHILD/de 78

## 2. DB-Konfiguration

`config/config.example.php` kopieren nach:

`config/config.local.php`

und dort ausschließlich auf STRATO die echten DB-Zugangsdaten einsetzen.

## 3. Prüfen

Aufrufen:

- `/api/health.php`
- `/api/cards.php`
- `/api/card.php?id=major-00`
- `/api/text.php?id=major-00&audience=ADULT&language=de`
- `/api/text.php?id=major-00&audience=CHILD&language=de`

## Sicherheitsstand

v0.3.2 ist read-only:
- keine persönlichen Ziehungen
- keine Wahrnehmungen
- kein Journal
- keine Schreibendpunkte
- keine Benutzer-/Identity-Anbindung

Das reduziert den ersten produktiven Integrationsschritt auf die reine Content-Auslieferung.
