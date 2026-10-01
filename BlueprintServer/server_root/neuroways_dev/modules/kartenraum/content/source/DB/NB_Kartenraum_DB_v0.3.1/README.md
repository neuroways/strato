# NB Kartenraum DB v0.3.1

Vollständiger erster MariaDB-Content-Master.

## Importreihenfolge
1. `001_create_nb_kartenraum.sql`
2. `002_seed_78_cards.sql`
3. `003_seed_major_child_de_22.sql`
4. `004_seed_minor_adult_de_56.sql`
5. `005_seed_minor_child_de_56.sql`
6. `006_seed_major_adult_de_22.sql`
7. `090_validate.sql`

Erwartet: 78 Karten, 156 Texte, davon ADULT/de 78 und CHILD/de 78.
`006` wurde aus dem bereitgestellten Originaldokument strukturiert und nicht neu formuliert.
