# PocketBase Rules – Berechtigungen für öffentliche Website

## Problem

HTTP 403 beim Abrufen von Daten:
```
Only superusers can perform this action.
```

**Ursache:** Collections haben keine Public Read Rules, nur Admin-Zugriff

**Lösung:** List und View Rules für Public Read öffnen

---

## Collections mit fehlenden Public Rules

### 1. tournaments

**Vorher:**
```
List Rule:  (leer / gesperrt)
View Rule:  (leer / gesperrt)
```

**Nachher:**
```
List Rule:  @request.auth = null || @request.auth.role = "admin"
View Rule:  @request.auth = null || @request.auth.role = "admin"
```

**Bedeutung:**
- Anonyme Nutzer (null) dürfen Turniere lesen
- Admins dürfen weiterhin Turniere lesen + ändern
- Schreibrechte bleiben geschützt

---

### 2. players

**Vorher:**
```
List Rule:  (leer / gesperrt)
View Rule:  (leer / gesperrt)
```

**Nachher:**
```
List Rule:  @request.auth = null || @request.auth.role = "admin"
View Rule:  @request.auth = null || @request.auth.role = "admin"
```

---

### 3. rounds

**Vorher:**
```
List Rule:  (leer / gesperrt)
View Rule:  (leer / gesperrt)
```

**Nachher:**
```
List Rule:  @request.auth = null || @request.auth.role = "admin"
View Rule:  @request.auth = null || @request.auth.role = "admin"
```

---

### 4. matches

**Vorher:**
```
List Rule:  (leer / gesperrt)
View Rule:  (leer / gesperrt)
```

**Nachher:**
```
List Rule:  @request.auth = null || @request.auth.role = "admin"
View Rule:  @request.auth = null || @request.auth.role = "admin"
```

---

### 5. announcements

**Vorher:**
```
List Rule:  (leer / gesperrt)
View Rule:  (leer / gesperrt)
```

**Nachher:**
```
List Rule:  @request.auth = null || @request.auth.role = "admin"
View Rule:  @request.auth = null || @request.auth.role = "admin"
```

Zusätzlich in UI: `visible = true` Filter in AnnouncementService

---

## Weitere Collections (für Vollständigkeit)

### courts, results, info_sections, contacts

Gleiche Regel:
```
List Rule:  @request.auth = null || @request.auth.role = "admin"
View Rule:  @request.auth = null || @request.auth.role = "admin"
```

---

## Create/Update/Delete Rules (Schutz)

Alle Collections:
```
Create Rule: @request.auth.role = "admin"
Update Rule: @request.auth.role = "admin"
Delete Rule: @request.auth.role = "admin"
```

**Keine Änderung.** Öffentliche Website hat keinen Auth, kann also nicht schreiben.

---

## Datenfluss

```
Public Website (kein Auth)
    ↓
getRecords(tournaments)
    ↓
pb.collection('tournaments').getList()
    ↓
List Rule prüft: @request.auth = null?
    ↓
JA → Daten zurückgeben ✓
NEIN (nur Admin) → 403 ✗
```

---

## Implementation in PocketBase Admin UI

1. Öffne PocketBase Admin Panel (`/.sfs-bd/admin`)
2. Für jede Collection:
   - Klick auf Collection
   - "API Rules" Tab
   - **List Rule:** `@request.auth = null || @request.auth.role = "admin"`
   - **View Rule:** `@request.auth = null || @request.auth.role = "admin"`
   - Speichern

3. Test:
   ```bash
   curl "/.sfs-bd/api/collections/tournaments/records"
   # Sollte Daten zurückgeben, nicht 403
   ```

---

## Sicherheit

- ✓ Nur Lesen (öffentlich)
- ✓ Schreiben nur für Admins (geschützt)
- ✓ Sensitive Daten (admins Collection) bleiben privat
- ✓ Öffentliche Website kann navigieren
- ✓ Adminbereich bleibt funktional

---

## Status

Nach Implementierung:
- ✓ Öffentliche Website lädt alle Daten
- ✓ Turniere sichtbar
- ✓ Spielplan funktioniert
- ✓ News angezeigt
- ✓ Admin-Zugriff bleibt geschützt
