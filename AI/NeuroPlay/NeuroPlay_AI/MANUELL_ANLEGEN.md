# Sammlungen manuell anlegen – Schritt für Schritt

Das Admin-Panel zeigt dir nur die Verwaltung von Daten in bestehenden Sammlungen. Um neue Sammlungen anzulegen, musst du ins **Einstellungs-Menu**.

## Schritt 1: Settings öffnen

Im Admin-Panel oben links: Klick auf das **Zahnrad-Icon** (⚙️) oder suche nach **„Settings"**.

## Schritt 2: Collections Menü

Dort solltest du ein Menü haben mit:
- Collections
- Backups
- Logs
- Webhooks
- etc.

Klick auf **„Collections"**.

## Schritt 3: Neue Collection erstellen

Oben rechts solltest du einen Button **„+ Create"** oder **„New Collection"** sehen.

Klick drauf, und trag den Namen ein:
- `activities`

Bestätige mit Enter oder dem Speichern-Button.

## Schritt 4: Felder hinzufügen

Sobald die Collection erstellt ist, klickst du auf sie und siehst **„+ Add Field"**.

Für `activities` fügst du diese Felder hinzu:

| Feld | Typ | Erforderlich |
|------|-----|-------------|
| id | text | ✓ (als ID markieren) |
| name | text | ✓ |
| type | text | ✓ |
| description | text | |
| duration | text | |
| minPeople | number | |
| maxPeople | number | |
| difficulty | text | |
| tags | text | |
| created | autodate | (onCreate) |
| updated | autodate | (onUpdate) |

## Die anderen Sammlungen

Wiederhole das für:

### observations
- id (text, ID)
- userId (relation → users)
- activityId (relation → activities)
- observed_at (date)
- description (text)
- energy (number)
- context (text)
- created (autodate)

### activity_sessions
- id (text, ID)
- userId (relation → users)
- activityId (relation → activities)
- started_at (date)
- ended_at (date)
- duration_minutes (number)
- status (text)
- created (autodate)

### favorites
- id (text, ID)
- userId (relation → users)
- activityId (relation → activities)
- created (autodate)

## Für private Sammlungen: API Rules setzen

Nach dem Erstellen von `observations`, `activity_sessions` und `favorites`:

1. Klick auf die Collection
2. Geh auf den Tab **„API Rules"**
3. Setz diese Regeln:
   - **List:** `@request.auth.id = userId.id`
   - **View:** `@request.auth.id = userId.id`
   - **Create:** `@request.auth.id != ""`
   - **Update:** `@request.auth.id = userId.id`

Speichern.

## Wenn du die Collections nicht findest

Manche Admin-Panels haben ein anderes Layout. Schau nach:
- **Links im Menü:** Collections, Datenbank, Tabellen
- **Oben:** Tabs wie Admin, Collections, Settings
- **Ikon:** Datenbank-Symbol (oft unten links)

Sag mir, was du siehst, dann kann ich dir genauer helfen!
