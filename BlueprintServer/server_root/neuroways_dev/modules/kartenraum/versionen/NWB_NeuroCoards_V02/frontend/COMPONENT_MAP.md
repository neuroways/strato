# Component Map – NeuroBalance Kartenraum v0.1.0

## Core verwenden, nicht im Modul duplizieren

| Fähigkeit | Herkunft | Regel |
|---|---|---|
| NeuroWays Design Tokens | CORE | nur referenzieren |
| NeuroWays-Linie | CORE | gemeinsame Komponente |
| Basisnavigation / Zurück | CORE | Modul liefert nur Zielroute |
| Grundbutton / Fokus / Tastaturzustand | CORE | Accessibility zentral |
| Reduced Motion Baseline | CORE | Modulanimation muss darauf reagieren |
| Security-/Session-Kontext | CORE | keine eigene Authentisierung im Modul |

## Modulspezifische Komponenten

| Komponente | Verantwortung | Darf nicht |
|---|---|---|
| `KartenraumHome` | Räume und aktuellen Kartenmoment komponieren | globale Navigation neu implementieren |
| `DeckSelector` | auswählbare Decks darstellen | Ownership direkt aus DB laden |
| `CardBack` | modulbezogene Kartenrückseite darstellen | Ziehungslogik enthalten |
| `CardReveal` | ruhige Aufdeckinteraktion | Zufallsauswahl bestimmen |
| `CardMoment` | gezogene Karte + Moment darstellen | persönliche Deutung generieren |
| `SelfPerceptionPanel` | erste Wahrnehmung erfassen | Nutzerdeutung bewerten |
| `CardContentPanel` | optional Kartentext anzeigen | Inhalte hardcoden |
| `ReviewPanel` | späteren Rückblick erfassen | vorherige Eingaben überschreiben |
| `JournalEntryEditor` | Journaleintrag erfassen | modulübergreifende Persistenz umgehen |
| `ConnectionMap` | wiederkehrende Karten/Motive visualisieren | diagnostische Aussagen ableiten |
| `DeckLibrary` | Decksammlung darstellen | Dateien direkt aus Installation lesen |

## Seitenkomposition

- `room`: ruhiger Einstieg, Morgenkarte als stärkster Primärweg, danach Rückblick/Journal/Verbindungen/Decks.
- `draw`: eine Hauptinteraktion pro Zustand: vorbereiten → ziehen → aufdecken → wahrnehmen → optional Inhalt.
- `review`: vorhandenen Moment wählen bzw. heutigen Moment öffnen → Rückblick erfassen.
- `journal`: zeitlich sortierte persönliche Einträge; kein Leistungs- oder Streak-Modell.
- `connections`: beobachtete Wiederholungen als Hinweise, nicht als objektive Bedeutung.
- `decks`: Decks, Aktivstatus, Herkunft und optionale eigene Inhalte.
