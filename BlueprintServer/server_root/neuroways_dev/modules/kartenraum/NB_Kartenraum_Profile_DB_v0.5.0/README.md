# NB Kartenraum Profile DB v0.5.0

Ergänzt:
- `nb_user_profile`
- `nb_user_session`
- `nb_card_draw`
- `nb_card_perception`
- `nb_login_attempt`

Sicherheitsprinzipien:
- Zugangscode wird nie im Klartext gespeichert.
- DB speichert nur `password_hash()` des Codes.
- Session-Token wird dem Browser einmal gegeben; in DB liegt nur SHA-256.
- Ziehungszeit wird serverseitig gespeichert.
- Orientierung UPRIGHT/REVERSED gehört zur Ziehung.
- Wahrnehmung gehört genau zu dieser Ziehung.

Import:
1. `001_create_profile_journal.sql`
2. `090_validate.sql`

Erwartung bei frischem Import:
- profile_tables = 5
- orphan_draw_profiles = 0
- orphan_draw_cards = 0
