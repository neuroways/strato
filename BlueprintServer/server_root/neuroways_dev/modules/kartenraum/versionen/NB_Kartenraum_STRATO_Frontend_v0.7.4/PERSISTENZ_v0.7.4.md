# v0.7.4 – Persistenzhinweis

Die UI des lebenden Erfahrungstagebuchs ist vollständig enthalten.

Da das bereitgestellte Frontend-Paket keinen schreibenden Backend-Endpunkt für spätere
Erfahrungen enthält, speichert v0.7.4 diese neuen Einträge zunächst browserlokal pro
`profile_id + draw_id`. Die ursprüngliche Wahrnehmung kommt weiterhin aus dem Backend.

Für serverseitige, geräteübergreifende Persistenz ist die vorbereitete Tabelle
`nb_card_experience` in `MIGRATION_v0.7.4_nb_card_experience.sql` enthalten.
Danach sollten zwei authentifizierte API-Endpunkte ergänzt werden:
- experience-list.php?draw_id=...
- experience-save.php  { draw_id, experience_text }

Die UI kann anschließend ohne Strukturänderung auf diese Endpunkte umgestellt werden.
