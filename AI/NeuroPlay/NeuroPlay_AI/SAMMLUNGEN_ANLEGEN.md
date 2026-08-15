# Sammlungen im Admin-Panel anlegen

Du hast die `users` Collection. Hier ist wie du weitere Sammlungen hinzufügst.

## Schritt für Schritt

### 1. Admin-Panel öffnen
http://localhost/.sfs-bd/_/

### 2. Neue Collection erstellen
- Klick auf das **„+"** oben rechts
- Wähle **„New collection"**
- Gib einen Namen ein: z.B. `activities`
- Wähle **Typ: „base"** (nicht „auth")
- Klick **„Create collection"**

### 3. Felder hinzufügen
Nach dem Erstellen klickst du in der Collection auf **„+ Add field"** und fügst Felder hinzu:

**Feld-Optionen:**
- **Name:** wie das Feld heißt (z.B. „name", „description")
- **Type:** Datentyp (text, number, date, relation, etc.)
- **Required:** Häkchen setzen, wenn das Feld immer einen Wert braucht
- **ID:** bei einem text-Feld → macht es zur eindeutigen Kennung

## Fertige Strukturen zum Kopieren

### activities (Aktivitäten-Katalog)

| Feldname | Typ | Erforderlich | Notizen |
|----------|-----|-------------|---------|
| id | text | ✓ | markiere als ID |
| name | text | ✓ | z.B. „Häkeln" |
| type | text | ✓ | z.B. „kreativ", „Brettspiel" |
| description | text | | lange Beschreibung |
| duration | text | | z.B. „20–45 Min" |
| minPeople | number | | z.B. 1 |
| maxPeople | number | | z.B. 4 |
| difficulty | text | | z.B. „einfach", „mittel" |
| tags | text | | z.B. „ruhig,kreativ" |
| created | autodate | | onCreate aktivieren |
| updated | autodate | | onUpdate aktivieren |

### observations (persönliche Beobachtungen)

| Feldname | Typ | Erforderlich | Notizen |
|----------|-----|-------------|---------|
| id | text | ✓ | markiere als ID |
| userId | relation | ✓ | verlinke zu users |
| activityId | relation | ✓ | verlinke zu activities |
| observed_at | date | ✓ | wann beobachtet |
| description | text | ✓ | was wurde beobachtet |
| energy | number | | 1–5 |
| context | text | | „allein", „mit Familie", etc. |
| created | autodate | | onCreate aktivieren |

**Zugriffregeln (API Rules Tab):**
- List: `@request.auth.id = userId.id`
- View: `@request.auth.id = userId.id`
- Create: `@request.auth.id != ""`
- Update: `@request.auth.id = userId.id`

### activity_sessions (Aktivitäten-Sitzungen)

| Feldname | Typ | Erforderlich | Notizen |
|----------|-----|-------------|---------|
| id | text | ✓ | markiere als ID |
| userId | relation | ✓ | verlinke zu users |
| activityId | relation | ✓ | verlinke zu activities |
| started_at | date | ✓ | wann gestartet |
| ended_at | date | | wann beendet |
| duration_minutes | number | | wie lange |
| status | text | | „started", „completed" |
| created | autodate | | onCreate aktivieren |

**Zugriffregeln (API Rules Tab):**
- List: `@request.auth.id = userId.id`
- View: `@request.auth.id = userId.id`
- Create: `@request.auth.id != ""`

### favorites (Favoriten)

| Feldname | Typ | Erforderlich | Notizen |
|----------|-----|-------------|---------|
| id | text | ✓ | markiere als ID |
| userId | relation | ✓ | verlinke zu users |
| activityId | relation | ✓ | verlinke zu activities |
| created | autodate | | onCreate aktivieren |

**Zugriffregeln (API Rules Tab):**
- List: `@request.auth.id = userId.id`
- View: `@request.auth.id = userId.id`
- Create: `@request.auth.id != ""`
- Delete: `@request.auth.id = userId.id`

## Daten sind dauerhaft

Alles, was du im Admin-Panel eintragst, bleibt in der Datenbank gespeichert. Wenn du die App neulädst oder später wiederkommst, sind die Daten noch da.

## Beziehungen (Relations) anlegen

Wenn du ein Feld vom Typ „relation" erstellst:
1. Typ: `relation` wählen
2. Im Feld „Collection" die Ziel-Collection auswählen (z.B. „activities")
3. Speichern

Damit kannst du z.B. eine Beobachtung mit einer Aktivität verlinken.

## Nächster Schritt

1. Leg die 4 Sammlungen an (activities, observations, activity_sessions, favorites)
2. Trag ein paar Test-Aktivitäten ein (z.B. die 6 Aktivitäten aus NeuroPlay)
3. Deine App kann dann damit arbeiten

Brauchst du Hilfe bei einer bestimmten Sammlung?
