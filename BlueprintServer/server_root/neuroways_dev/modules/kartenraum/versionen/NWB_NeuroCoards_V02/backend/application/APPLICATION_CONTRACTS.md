# Application Contracts v0.1

Application Services koordinieren Domain und Core-Verträge. Sie enthalten keine UI- und keine konkrete DB-Technik.

## Geplante Services

- `OpenKartenraum`
- `ListAvailableDecks`
- `StartDailyDraw`
- `RevealCard`
- `SaveSelfPerception`
- `LoadOptionalCardContent`
- `SaveReflection`
- `CreateJournalEntry`
- `ListJournalEntries`
- `BuildConnectionObservations`
- `ListOwnedDecks`

## Reihenfolgeregel für die Ziehung

1. Installations-/Security-Kontext durch Core auflösen.
2. verfügbares/aktives Deck bestimmen.
3. bestehende Tagesziehung prüfen.
4. falls zulässig: Draw über Domain Service erzeugen.
5. CardMoment persistieren.
6. Aufdeckung in separatem Befehl durchführen.
7. erste Wahrnehmung speichern.
8. Kartentext nur auf explizite Nutzeraktion laden/anzeigen.

## Nicht erlaubt

- direkte DB-Verbindung aus Frontend
- zufällige Karte ausschließlich im Browser ohne server-/domainseitigen Nachweis
- Hardcoding von Kartentexten in React/PHP-Seiten
- Ableitung von Authentisierung aus Route
- stilles Überschreiben bestehender Tagesziehungen
