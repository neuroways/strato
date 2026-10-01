# NB_Kartenraum_STRATO_Frontend_v0.7.1

## Ziel
Visuelle Migration der ChatGPT-Kartenraum-Referenz in die Strato-Anwendung.

## Neu
- klare Hierarchie: NeuroWays → NeuroBalance → Persönlicher Kartenraum
- neue öffentliche Startseite mit eigenständigem Kartenraum-Logo/Portal
- tageszeitabhängige Begrüßung
- Tarot-Kurzinfo vor Anmeldung
- persönliches Dashboard nach Login
- Karte ziehen als eindeutig wichtigste Aktion
- bestehende Ziehungslogik: Rückseite → Magie → automatische Aufdeckung
- umgekehrt gezogene Karten bleiben markiert
- große physische Kartenansicht bleibt erhalten
- Wahrnehmung bleibt vor jeder Bedeutung
- Kartenwissen: Kurz → Mehr erfahren → Tiefer eintauchen
- bestehendes Journal (`journal.php`) als eigener Raum eingebunden
- Rückblick öffnet das Journal mit Fokus auf die jüngste Ziehung
- responsive Mobile/Desktop
- alte ChatGPT/svenja-schriever-Verlinkungen wurden nicht übernommen

## API
Frontend nutzt weiterhin:
`../NB_Kartenraum_Backend_v0.5.0/api`

### Wichtig für die neuen Kurzfelder
Die DB-Felder `reflection_question` und `everyday_moment` existieren bereits.
Das Backend v0.5.0 liefert sie in `knowledge.php` jedoch noch nicht aus.

Das Frontend funktioniert trotzdem:
- Fallback Frage: `nb_card_text.own_card_language`
- Fallback Moment: `nb_card_text.possible_next_step`

Damit die neuen v0.2.x-Kartenwissen-Felder direkt erscheinen, passe im bestehenden
`MariaDbCardRepository::findKnowledge()` die SELECT-Liste an.

Die benötigte Feldliste liegt in:
`backend_patch_knowledge_v0.7.0.sql-select.txt`

## Noch nicht aktiv
Die Räume `Verbindungen`, `Meine Decks` und `Favoriten` sind visuell vorbereitet,
aber bewusst als „später“ markiert, weil das aktuell vorhandene Backend dafür
noch keine belastbare API bereitstellt.

## Upload
Ordner vollständig nach:
`/modules/kartenraum/NB_Kartenraum_STRATO_Frontend_v0.7.0/`

Test:
`https://flowisaurus.com/modules/kartenraum/NB_Kartenraum_STRATO_Frontend_v0.7.0/`


## v0.7.1
- sichtbarer Testzugang auf der Login-Seite
- Testprofil: ADULT
- Button „Testzugang eintragen“ füllt Nutzername und Code automatisch aus
- produktive Login-Logik bleibt unverändert
