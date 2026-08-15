# Sammlungen anlegen – Manuell im Admin-Panel

Da die automatische Erstellung nicht funktioniert, musst du die Sammlungen selbst im Admin-Panel erstellen. Es sind nur 5 Minuten Arbeit.

## Öffne das Admin-Panel

http://localhost/.sfs-bd/_/

Stelle sicher, dass du auf **Test-Datenbank** bist (blauer Button oben).

---

## 1. ACTIVITIES Sammlung

Oben rechts: Klick auf **Users** → wechsle zu **Collections/Sammlungen**

Dort sollte es einen Button **+ New Collection** oder ähnlich geben.

### Erstelle: activities

**Name:** activities  
**Typ:** base

**Felder hinzufügen (+ Add Field):**
- id (text) → markiere als ID
- name (text, erforderlich ✓)
- type (text, erforderlich ✓)
- description (text)
- duration (text)
- minPeople (number)
- maxPeople (number)
- created (autodate, onCreate ✓)

**Speichern**

---

## 2. OBSERVATIONS Sammlung

**Name:** observations  
**Typ:** base

**Felder:**
- id (text) → ID
- userId (relation) → users, erforderlich ✓
- activityId (relation) → activities, erforderlich ✓
- observed_at (date, erforderlich ✓)
- description (text, erforderlich ✓)
- energy_level (number)
- context (text)
- created (autodate, onCreate ✓)

**Dann: API Rules Tab**
- List: `@request.auth.id = userId.id`
- View: `@request.auth.id = userId.id`
- Create: `@request.auth.id != ""`

**Speichern**

---

## 3. ACTIVITY_SESSIONS Sammlung

**Name:** activity_sessions  
**Typ:** base

**Felder:**
- id (text) → ID
- userId (relation) → users, erforderlich ✓
- activityId (relation) → activities, erforderlich ✓
- started_at (date, erforderlich ✓)
- ended_at (date)
- duration_minutes (number)
- status (text)
- created (autodate, onCreate ✓)

**API Rules:**
- List: `@request.auth.id = userId.id`
- View: `@request.auth.id = userId.id`
- Create: `@request.auth.id != ""`

**Speichern**

---

## 4. FAVORITES Sammlung

**Name:** favorites  
**Typ:** base

**Felder:**
- id (text) → ID
- userId (relation) → users, erforderlich ✓
- activityId (relation) → activities, erforderlich ✓
- created (autodate, onCreate ✓)

**API Rules:**
- List: `@request.auth.id = userId.id`
- View: `@request.auth.id = userId.id`
- Create: `@request.auth.id != ""`
- Delete: `@request.auth.id = userId.id`

**Speichern**

---

## 5. Daten eintragen

Nach dem Anlegen: In der **activities**-Sammlung **+ New Record** klicken und folgende 6 eintragen:

1. **Häkeln**
   - id: haekeln
   - name: Häkeln
   - type: kreativ
   - description: Rhythmische, beruhigende Aktivität
   - duration: 30
   - minPeople: 1
   - maxPeople: 1

2. **Dorfromantik**
   - id: dorfromantik
   - name: Dorfromantik
   - type: Brettspiel
   - duration: 40
   - minPeople: 1
   - maxPeople: 4

3. **Café del Gatto**
   - id: cafe-del-gatto
   - name: Café del Gatto
   - type: Brettspiel
   - duration: 40
   - minPeople: 2
   - maxPeople: 4

4. **Spaziergang**
   - id: spaziergang
   - name: Spaziergang
   - type: Bewegung
   - duration: 45
   - minPeople: 1
   - maxPeople: 10

5. **Puzzle**
   - id: puzzle
   - name: Puzzle
   - type: kreativ
   - duration: 60
   - minPeople: 1
   - maxPeople: 4

6. **Lesen**
   - id: lesen
   - name: Lesen
   - type: Ruhe
   - duration: 45
   - minPeople: 1
   - maxPeople: 1

---

## Fertig!

Sobald die 4 Sammlungen + 6 Aktivitäten da sind, funktioniert deine App vollständig mit echten, dauerhaft gespeicherten Daten.

**Sag mir Bescheid, wenn du fertig bist** – dann können wir Beobachtungen und Favoriten speichern aktivieren.
