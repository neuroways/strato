# Korrektur: PocketBase API Rules – Syntax und Semantik

## Das Problem

Ich habe zwei unterschiedliche API-Rule-Syntaxen empfohlen:

**Erste Empfehlung:**
```
@request.auth = null || @request.auth.role = "admin"
```

**Zweite Empfehlung:**
```
@request.auth.id = ""
```

Das ist **technisch falsch und inkonsistent**. Ich muss das klären.

---

## Analyse: Was funktioniert in PocketBase

### PocketBase-Dokumentation und -Syntax

Nach Überprüfung der PocketBase SKILL.md:

**Korrekte Syntax für Auth-Checks:**
- `@request.auth.id != ""` – Benutzer ist authentifiziert
- `@request.auth.id = ""` – **Benutzer ist NICHT authentifiziert** (Fehler: das ist falsch!)
- `@request.auth.collectionId = "admins"` – Benutzer gehört zu `admins`-Collection
- `status = "public"` – Datenfeld-Check (kein Auth)

### Die korrekte Regel für öffentlichen Lesezugriff

**In PocketBase gibt es KEINE `@request.auth = null`-Syntax.**

Das ist **nicht PocketBase-konform**. Es sollte sein:

```
listRule: null
viewRule: null
```

**`null` bedeutet:** "Jeder darf lesen, egal ob authentifiziert oder nicht."

### Warum meine erste Empfehlung falsch war

```
@request.auth = null || @request.auth.role = "admin"
```

- `@request.auth = null` ist **keine gültige PocketBase-Syntax**
- `@request.auth.role` existiert nicht (PocketBase hat kein `role`-Feld)
- Das hätte einen Fehler verursacht

---

## Korrekte Rules für diese Anwendung

### Öffentliche Collections (tournaments, players, rounds, matches, announcements, courts, results, info_sections)

```json
{
  "listRule": null,
  "viewRule": null,
  "createRule": null,
  "updateRule": null,
  "deleteRule": null
}
```

**Bedeutung:**
- `listRule: null` = Jeder darf diese Collection lesen (auch ohne Login)
- `viewRule: null` = Jeder darf einzelne Records sehen
- `createRule: null` = Niemand darf schreiben (außer Admin per Superuser)
- `updateRule: null` = Niemand darf ändern
- `deleteRule: null` = Niemand darf löschen

---

### Admin-geschützte Collections (tournament_settings, registrations, match_players, ai_schedule_runs)

```json
{
  "listRule": "@request.auth.collectionId = \"admins\"",
  "viewRule": "@request.auth.collectionId = \"admins\"",
  "createRule": "@request.auth.collectionId = \"admins\"",
  "updateRule": "@request.auth.collectionId = \"admins\"",
  "deleteRule": "@request.auth.collectionId = \"admins\""
}
```

**Bedeutung:**
- Nur Benutzer aus der `admins`-Collection dürfen zugreifen

---

### Redaktions-Collections (announcements, info_sections – falls beschreibbar)

```json
{
  "listRule": "@request.auth.id != \"\"",
  "viewRule": "@request.auth.id != \"\"",
  "createRule": "@request.auth.id != \"\"",
  "updateRule": "@request.auth.id != \"\"",
  "deleteRule": "@request.auth.id != \"\""
}
```

**Bedeutung:**
- `@request.auth.id != ""` = Jeder authentifizierte Benutzer

---

## Vergleich: `null` vs. `@request.auth.id = ""`

| Rule | Bedeutung | Öffentlicher Zugriff? |
|------|-----------|----------------------|
| `null` | **Keine Beschränkung** – Jeder darf lesen | ✓ JA |
| `@request.auth.id != ""` | Nur authentifizierte Benutzer | ✗ NEIN |
| `@request.auth.id = ""` | **FEHLER – nicht unterstützt** | – |
| `@request.auth.collectionId = "admins"` | Nur Admins | ✗ NEIN |

---

## Warum ich mich korrigieren musste

1. **Erste Empfehlung** basierte auf Annahme, dass `@request.auth` wie ein Objekt prüfbar ist
   - Das ist **nicht korrekt** in PocketBase
   - `@request.auth.role` existiert nicht

2. **Zweite Empfehlung** versuchte zu sagen "nicht authentifiziert"
   - Aber `@request.auth.id = ""` ist **keine echte Syntax**
   - Das hätte auch nicht funktioniert

3. **Korrekte Lösung:** `null` = **keine Regel** = **öffentlicher Zugriff**

---

## Final: API Rules für diese Anwendung

### Im PocketBase Admin Panel (`/.sfs-bd/admin/`) setzen:

#### Öffentliche Collections (8)
**tournaments, players, rounds, matches, announcements, courts, results, info_sections:**
- List Rule: **(leer lassen / null)**
- View Rule: **(leer lassen / null)**
- Create Rule: **(leer lassen / null)**
- Update Rule: **(leer lassen / null)**
- Delete Rule: **(leer lassen / null)**

#### Admin-Collections (4)
**tournament_settings, registrations, match_players, ai_schedule_runs:**
- List Rule: `@request.auth.collectionId = "admins"`
- View Rule: `@request.auth.collectionId = "admins"`
- Create Rule: `@request.auth.collectionId = "admins"`
- Update Rule: `@request.auth.collectionId = "admins"`
- Delete Rule: `@request.auth.collectionId = "admins"`

---

## Status

- ✗ Erste Empfehlung war **falsch** (ungültige Syntax)
- ✗ Zweite Empfehlung war **auch falsch** (falsche Semantik)
- ✓ **Korrekte Lösung:** `null` für öffentlich, `@request.auth.collectionId = "admins"` für Admin

Die öffentliche Website funktioniert erst, wenn die 8 Collections auf `null` (oder leer) gesetzt sind.
