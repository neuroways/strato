# Domain Model – NeuroBalance Kartenraum v0.1

**Status:** fachlicher Rekonstruktionsentwurf; noch kein freigegebenes DB-Schema.

## Leitprinzip

Der Kartenraum unterstützt Reflexion. Er sagt nicht voraus, was passieren wird, und ersetzt nicht die persönliche Deutung.

Zentraler Ablauf:

`Deck → Draw → CardMoment → SelfPerception → optional CardContent → Review → Journal → Connections`

## Aggregate

### Deck
Eigene Kartensammlung mit Identität und Version.

Kernfelder:
- `deck_id`
- `deck_code`
- `title`
- `deck_type`
- `version`
- `status`
- `source_reference`

Regel: Eine Ziehung muss rekonstruierbar auf die verwendete Deck-/Kartenfassung zeigen.

### Card
Eine Karte innerhalb genau einer Deckversion.

Kernfelder:
- `card_id`
- `deck_id`
- `card_code`
- `title`
- `image_asset_ref`
- `back_asset_ref` optional, wenn deckweit nicht gleich
- `sort_order`
- `status`

### CardContent
Optionaler begleitender Inhalt einer Karte.

Kernfelder:
- `card_content_id`
- `card_id`
- `content_type`
- `content_text`
- `version`
- `status`

Regel: Karteninhalt und persönliche Wahrnehmung bleiben getrennte Datenobjekte.

### Draw
Fachlicher Ziehungsvorgang.

Kernfelder:
- `draw_id`
- `deck_id`
- `card_id`
- `draw_type` (`daily`, später weitere nur nach Entscheidung)
- `drawn_at`
- `selection_strategy_version`
- `context_date`

Regeln:
- Eine Tagesziehung darf nicht unbemerkt durch erneutes Laden ersetzt werden.
- Wiederholungs-/Neuziehungsregeln sind noch offen und müssen vor Implementierung entschieden werden.
- Auswahlstrategie wird versioniert, falls historische Reproduzierbarkeit benötigt wird.

### CardMoment
Verbindet die Karte mit dem persönlichen Nutzungsmoment.

Kernfelder:
- `card_moment_id`
- `draw_id`
- `created_at`
- `revealed_at`
- `state`

Zustände:
`DRAWN → REVEALED → PERCEIVED → CONTENT_OPTIONAL → REVIEWABLE`

### SelfPerception
Erste eigene Wahrnehmung vor systemseitigem Begleittext.

Kernfelder:
- `self_perception_id`
- `card_moment_id`
- `text`
- `created_at`

Regel: wird niemals durch spätere Reflexion überschrieben.

### Reflection
Späterer Rückblick auf denselben Kartenmoment.

Kernfelder:
- `reflection_id`
- `card_moment_id`
- `text`
- `created_at`
- `reflection_type`

### JournalEntry
Eigenständiger persönlicher Journaleintrag, optional mit Kartenmoment verknüpft.

### Motif
Benutzer- oder contentseitig beschreibbares Motiv. Keine diagnostische Kategorie.

### ConnectionObservation
Beobachtbare Verbindung zwischen Kartenmomenten, Karten oder Motiven.

Regel: Ein erkanntes Muster wird als Beobachtung formuliert, nicht als Wahrheit über die Person.

## Noch offene Domain-Entscheidungen

1. Darf pro Kalendertag nur eine Morgenkarte existieren?
2. Darf eine Karte bewusst neu gezogen werden und wie wird dies protokolliert?
3. Werden automatische Muster nur statistisch erzeugt oder ausschließlich von der Nutzerin bestätigt?
4. Gehören eigene Deck-Uploads in v0.1.0 oder erst in eine Folgeversion?
5. Wie werden KI-Begleittexte fachlich getrennt, versioniert und transparent gekennzeichnet?
