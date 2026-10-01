# Persistence Contracts v0.1

NW-ARCH-008 verlangt Core-managed Persistence. Das Modul beschreibt daher Repository-Verträge; Connection, Credentials, Environment- und Instance-Scope kommen aus dem Core.

## Repositories

### DeckRepository
- `listAvailable(context)`
- `getDeck(deckId, context)`
- `getCards(deckId, context)`

### DrawRepository
- `findDailyDraw(subjectScope, localDate, context)`
- `create(draw, context)`
- `get(drawId, context)`

### CardMomentRepository
- `create(moment, context)`
- `get(momentId, context)`
- `transition(momentId, expectedState, newState, context)`

### ReflectionRepository
- `createSelfPerception(perception, context)`
- `createReflection(reflection, context)`
- `listForMoment(momentId, context)`

### JournalRepository
- `create(entry, context)`
- `list(scope, pagination, context)`
- `get(entryId, context)`

### ConnectionRepository
- `saveObservation(observation, context)`
- `listObservations(scope, context)`

### DeckOwnershipRepository
- `listOwned(scope, context)`
- `assign(deckId, scope, context)`
- `revoke(deckId, scope, context)`

## Scope-Regeln

- Jeder Zugriff erhält den bereits autorisierten Core-Kontext.
- Kein Repository darf Instance-/Environment-Scope aus URL-Parametern selbst ableiten.
- Keine Modultabelle wird von einem anderen Modul direkt gelesen.
- Historische Draws referenzieren die verwendete Deck-/Card-Version bzw. unveränderliche Identität.

## Transaktionsgrenzen

`StartDailyDraw` muss Ziehung + CardMoment atomar sichern oder vollständig fehlschlagen.

## Noch nicht festgelegt

- konkrete Tabellenpräfixe
- MariaDB-DDL
- konkrete Identity-/Subject-ID
- Verschlüsselung einzelner Textfelder

Diese Punkte benötigen den führenden Core-/DB-Vertrag und werden nicht aus der ChatGPT-Site erfunden.
