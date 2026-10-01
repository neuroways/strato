# NeuroBalance Kartenraum · Kartenwissen DB v0.4.0

Neue, von `nb_card_text` getrennte Wissensschicht.

## Inhalt
- `nb_card_knowledge`
- 78 ADULT/de
- 78 CHILD/de
- insgesamt 156 Datensätze
- Leitthema
- Schlüsselbegriffe
- Kartenbedeutung
- andere Blickrichtung
- `symbolism_text` ist bewusst noch NULL: Die konkrete Bildsymbolik soll im nächsten Schritt gegen die tatsächlich produzierten NeuroBalance-Illustrationen gepflegt werden.

## Quellenstatus
Fachliche Referenz: vom Nutzer bereitgestellte Datei `Mystische Katzen(2).xlsx`.
Die importierten Inhalte sind als `draft-review` markiert. OCR-bedingt unvollständige Karten wurden mit einer NeuroWays-strukturierten Arbeitsfassung ergänzt und über `provenance_code` kenntlich gemacht.

## Importreihenfolge
1. `001_create_nb_card_knowledge.sql`
2. `002_seed_156_knowledge_de.sql`
3. `090_validate.sql`

Erwartung:
- knowledge_rows = 156
- ADULT/de = 78
- CHILD/de = 78
- Karten mit != 2 Varianten = 0
- missing_card_refs = 0

## Nächster technischer Schritt
Backend-Endpunkt `knowledge.php` und anschließend Integration in die optische Migration:
`Mehr über diese Karte erfahren`.
