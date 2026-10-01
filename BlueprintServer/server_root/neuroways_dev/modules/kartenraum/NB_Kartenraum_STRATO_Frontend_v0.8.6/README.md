# NB_Kartenraum_STRATO_Frontend_v0.7.8

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
`../NB_Kartenraum_Backend_v0.6.2/api`

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


## v0.7.2 · Ziehungs-Viewport
- Karte und Zieh-Button passen gemeinsam in den sichtbaren Bildschirm.
- Kartengröße wird aus der verfügbaren `100svh`-Höhe berechnet.
- eigene Regeln für kleine Bildschirmhöhen, Mobile Portrait und sehr kleine Geräte.
- auf kurzen Displays werden unwichtige Begleittexte reduziert, nicht die Karte oder Hauptaktion.
- das 2:3-Kartenformat bleibt erhalten.


## v0.7.3
### Karte direkt ziehen
- Klick/Tap direkt auf die Kartenrückseite startet die Ziehung.
- Pointer-Down erzeugt eine physische Druckreaktion.
- Berührungsstelle erzeugt einen Licht-/Ripple-Effekt.
- Karte hebt sich kurz an und wird anschließend magisch aufgedeckt.
- Tastatur: Enter/Leertaste funktionieren ebenfalls.
- der runde Ziehbutton bleibt als alternative Bedienung erhalten.

### Rückblick ≠ Journal
- Rückblick zeigt ausschließlich die letzte Ziehung.
- sichtbar: Karte, Datum, Orientierung und ursprüngliche Wahrnehmung.
- Aktionen: im vollständigen Journal öffnen oder neue Karte ziehen.
- Journal bleibt die chronologische Sammlung aller gespeicherten Ziehungen.

## v0.7.4 · Lebendes Erfahrungstagebuch
- Journal-Eintrag öffnet ein aufgeschlagenes Tagebuch als Overlay; kein Seitenwechsel.
- links: Karte, Ziehungsdatum, Orientierung, unveränderte erste Wahrnehmung.
- rechts: chronologische spätere Erkenntnisse.
- beliebig viele neue Einträge pro Ziehung.
- Karte kann direkt aus dem Tagebuch groß betrachtet werden.
- Mobile: das Buch wird zu zwei untereinanderliegenden Tagebuchseiten.
- neue Erkenntnisse werden in dieser Frontend-Version browserlokal pro Profil+Ziehung gespeichert.
- SQL-Migration für `nb_card_experience` zur serverseitigen Persistenz liegt bei.


## v0.7.5 · Persistentes Erfahrungstagebuch

- Frontend nutzt jetzt `NB_Kartenraum_Backend_v0.6.0`.
- spätere Erkenntnisse werden über `experience-save.php` in MariaDB gespeichert.
- bestehende Erkenntnisse werden über `experience-list.php` geladen.
- Zugriff bleibt an die aktive Session gebunden.
- eine fremde `draw_id` kann nicht ausgelesen oder beschrieben werden.
- ursprüngliche Wahrnehmung bleibt unverändert.
- neue Erkenntnisse werden chronologisch ergänzt.
- Speicherung ist geräteübergreifend, sofern derselbe Kartenraum geöffnet wird.
- lokale Browser-Speicherung ist für neue Erfahrungseinträge nicht mehr nötig.

### Erwarteter Serveraufbau

Frontend:
`/modules/kartenraum/NB_Kartenraum_STRATO_Frontend_v0.7.5/`

Backend:
`/modules/kartenraum/NB_Kartenraum_Backend_v0.6.0/`

Das Frontend adressiert das Backend relativ über:
`../NB_Kartenraum_Backend_v0.6.2/api`


## v0.7.6 · Startseite bereinigt
- „Karte ziehen“ erscheint im persönlichen Kartenraum nur noch einmal.
- die große Ziehkarte im Hero bleibt die eindeutige Hauptaktion.
- die doppelte Zieh-Kachel im Raum-Raster wurde entfernt.
- darunter folgt jetzt bewusst der Bereich „Weitere Räume“ mit Journal, Rückblick, Verbindungen, Meine Decks und Favoriten.


## v0.7.7 · Reflexion direkt ins Journal
- jede Tiefe kann direkt einen Journal-Eintrag erzeugen
- unterstützt: Gedanke, Erkenntnis, Frage, Ziel
- Zuordnung zur aktuellen Ziehung und zur gewählten Tiefe
- Tiefe: Eine Frage, Ein Moment, Mehr erfahren, Symbolik, Andere Blickrichtung
- Schreiben öffnet ein Tagebuch-Overlay und wechselt nicht die Seite
- Journal zeigt Eintragstyp und zugehörige Tiefe
- spätere allgemeine Erfahrungen werden als `EXPERIENCE` gespeichert
- Backend: `NB_Kartenraum_Backend_v0.6.1`

## v0.7.8 · Datenhoheit
- Journaleinträge können bearbeitet werden
- Journaleinträge können nach Bestätigung gelöscht werden
- Eintragstyp kann beim Bearbeiten geändert werden
- Abmelden-Button ist im privaten Header immer erreichbar
- Logout widerruft die aktuelle Session serverseitig
- lokale Sessiondaten werden beim Logout entfernt
