# Rollen- und Berechtigungskonzept

## Analyse der STRATO-Plattform

### Aktuelle Authentifizierungsstruktur

PocketBase auf dieser Plattform bietet:

1. **`_superusers` Collection** (System)
   - Nur intern verwendbar
   - Keine Rollen-Felder
   - Vollzugriff auf alles

2. **`users` Collection** (Auth)
   - Für öffentliche Nutzer
   - Felder: id, password, tokenKey, email, name, avatar, ...
   - Keine Rollen-Felder

3. **`admins` Collection** (Base)
   - Custom Collection für Admin-Nutzer
   - Felder: id, username, email, password, first_name, last_name, active, ...
   - Keine Rollen-Felder

### Einschränkung

Die STRATO-/PocketBase-Umgebung hat **keine nativen Rollen-Felder** in den Auth-Collections. Das bedeutet:

- Rollen müssen manuell hinzugefügt werden
- Oder über eine separate `roles` / `user_roles` Collection implementiert werden
- API Rules können nicht automatisch Rollen auswerten (nicht im Hook-Kontext)

---

## Implementierung: Rollen-Modell

### Strategie

Da die Plattform eingeschränkt ist, verwenden wir ein **flexibles Modell**:

1. **Rollen als separate Collection** (`roles`)
2. **Rollen-Zuweisungen** (`role_assignments`)
3. **Berechtigungen abgeleitet von Collection-Namen**

### Neue Collections

#### 1. `roles`

```json
{
  "name": "roles",
  "type": "base",
  "fields": [
    {"name": "id", "type": "text", "primaryKey": true},
    {"name": "code", "type": "text", "required": true, "unique": true},
    {"name": "name_de", "type": "text", "required": true},
    {"name": "description", "type": "text"},
    {"name": "priority", "type": "number"},
    {"name": "created", "type": "autodate", "onCreate": true},
    {"name": "updated", "type": "autodate", "onUpdate": true}
  ],
  "listRule": null,
  "viewRule": null,
  "createRule": "@request.auth.collectionId = \"admins\"",
  "updateRule": "@request.auth.collectionId = \"admins\"",
  "deleteRule": "@request.auth.collectionId = \"admins\""
}
```

**Rollen-Datensätze:**
- `superadmin` – Vollzugriff
- `admin` – Verwaltung aller fachlichen Daten
- `editor` – News und Content
- `public` – Nur Lesezugriff (öffentliche Seite)

#### 2. `role_assignments`

```json
{
  "name": "role_assignments",
  "type": "base",
  "fields": [
    {"name": "id", "type": "text", "primaryKey": true},
    {"name": "user_id", "type": "text", "required": true},
    {"name": "collection", "type": "text", "required": true},
    {"name": "role_id", "type": "relation", "required": true, "relationOptions": {"collectionId": "roles"}},
    {"name": "valid_from", "type": "date"},
    {"name": "valid_until", "type": "date"},
    {"name": "created", "type": "autodate", "onCreate": true},
    {"name": "updated", "type": "autodate", "onUpdate": true}
  ],
  "listRule": "@request.auth.id != \"\"",
  "viewRule": "@request.auth.id != \"\" && user_id = @request.auth.id",
  "createRule": "@request.auth.collectionId = \"admins\"",
  "updateRule": "@request.auth.collectionId = \"admins\"",
  "deleteRule": "@request.auth.collectionId = \"admins\""
}
```

---

## Rollen-Definition

### 1. Superadmin

**Zielgruppe:** STRATO-Administrator (selten)

**Berechtigungen:**
- ✓ Alle API Rules ändern
- ✓ Collections erstellen/löschen
- ✓ Benutzerverwaltung
- ✓ Deployment
- ✓ Systemkonfiguration

**Umsetzung:** Über `_superusers` oder manuell im Admin Panel

---

### 2. Administrator

**Zielgruppe:** Turnierleiter, Verwaltung

**Schreibrechte:**
- tournaments, players, registrations, courts, rounds, matches, results, announcements, info_sections

**Leserechte:**
- Alle fachlichen Collections

**API Rules für Admin-Collections:**
```
listRule: "@request.auth.collectionId = \"admins\""
viewRule: "@request.auth.collectionId = \"admins\""
createRule: "@request.auth.collectionId = \"admins\""
updateRule: "@request.auth.collectionId = \"admins\""
deleteRule: "@request.auth.collectionId = \"admins\""
```

---

### 3. Redakteur (Editor)

**Zielgruppe:** Content-Manager, News-Pflege

**Schreibrechte:**
- announcements
- info_sections

**Leserechte:**
- Alle öffentlichen Collections

**API Rules:**
```
announcements:
  listRule: "@request.auth.id != \"\""
  viewRule: "@request.auth.id != \"\""
  createRule: "@request.auth.id != \"\""
  updateRule: "author_id = @request.auth.id"
  deleteRule: "author_id = @request.auth.id"

info_sections:
  listRule: "@request.auth.id != \"\""
  viewRule: "@request.auth.id != \"\""
  createRule: "@request.auth.id != \"\""
  updateRule: "author_id = @request.auth.id"
  deleteRule: "author_id = @request.auth.id"
```

---

### 4. Öffentlicher Besucher

**Zielgruppe:** Website-Besucher (unauthentifiziert)

**Leserechte:**
- tournaments, players, rounds, matches, announcements, courts, results, info_sections

**Keine Schreibrechte**

**API Rules für öffentliche Collections:**
```
tournaments:
  listRule: "@request.auth.id = \"\""
  viewRule: "@request.auth.id = \"\""
  createRule: null
  updateRule: null
  deleteRule: null

# (gleiches Muster für alle 8 öffentlichen Collections)
```

---

## Workflow für zukünftige Erweiterungen

### Neue Collection hinzufügen

1. Collection in PocketBase erstellen
2. In `roles` definieren, welche Rolle Zugriff hat
3. API Rules entsprechend setzen:
   ```
   listRule: "@request.auth.collectionId = \"admins\""  (Admins)
   ODER
   listRule: "@request.auth.id != \"\""  (Autentifizierte Nutzer)
   ODER
   listRule: "@request.auth.id = \"\""  (Öffentlich)
   ```
4. Dokumentieren in diesem File

### Neue Rolle hinzufügen

1. In `roles` Collection eintragen
2. Berechtigungen definieren
3. `role_assignments` für Nutzer erstellen
4. API Rules aktualisieren (wenn nötig)

---

## Einschränkungen dieser Umgebung

1. **Keine Rollen-Felder in Auth-Collections**
   - Rollen müssen extern verwaltet werden
   - Keine automatische Rollen-Auswertung in PocketBase-Rules

2. **API Rules sind statisch**
   - Können nicht zur Laufzeit basierend auf `role_assignments` geändert werden
   - Müssen manuell pro Collection gesetzt werden

3. **Keine Hook-Zugriffe**
   - Rollen-Logik kann nicht in PocketBase-Hooks implementiert werden

### Workaround

Die App selbst (React-Code) kann Rollen-Zuweisungen prüfen:
```javascript
// Im Frontend
const userRole = await checkUserRole(userId);
if(userRole === 'admin') {
  // Zeige Admin-UI
} else if(userRole === 'editor') {
  // Zeige Editor-UI
}
```

---

## API Rules – Final Implementation

### Öffentliche Collections (für Besucher)

```
tournaments, players, rounds, matches, announcements, courts, results, info_sections:

listRule: "@request.auth.id = \"\""
viewRule: "@request.auth.id = \"\""
createRule: null
updateRule: null
deleteRule: null
```

### Admin-Collections (für Admins)

```
tournaments, players, courts, rounds, matches, results:

listRule: "@request.auth.collectionId = \"admins\""
viewRule: "@request.auth.collectionId = \"admins\""
createRule: "@request.auth.collectionId = \"admins\""
updateRule: "@request.auth.collectionId = \"admins\""
deleteRule: "@request.auth.collectionId = \"admins\""
```

### Redaktions-Collections (für Editoren + Admins)

```
announcements, info_sections:

listRule: "@request.auth.id != \"\" || @request.auth.id = \"\""
viewRule: "@request.auth.id != \"\" || @request.auth.id = \"\""
createRule: "@request.auth.id != \"\""
updateRule: "@request.auth.id != \"\""
deleteRule: "@request.auth.id != \"\""
```

---

## Status

- [ ] Collections erstellen: `roles`, `role_assignments`
- [ ] API Rules setzen
- [ ] Test-Rollen eintragen
- [ ] Admin-UI für Rollen-Verwaltung
- [ ] Frontend-Authentifizierung mit Rollen-Check

---

## Nächste Schritte

1. Rollen-Collections in PocketBase anlegen
2. API Rules konfigurieren
3. Test-Admin mit Superadmin-Rolle erstellen
4. Öffentliche Seite mit `@request.auth.id = ""` Rules testen
5. Rollenverwaltungs-Interface bauen
