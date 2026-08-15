# Analyse – HTTP 403 "Only superusers can perform this action"

## Problem
Öffentliche Website erhält 403-Fehler beim Laden von Turnierdaten.

```
Error: 403 Forbidden
Message: Only superusers can perform this action
```

---

## Analyse

### 1. Code-Überprüfung
- ✓ PocketBase Client: `new PocketBase()` – verwendet Standardroute `/.sfs-bd/`
- ✓ Keine explizite Auth in Services (absichtlich)
- ✓ Services rufen `getRecords()` → `pb.collection().getList()` auf
- ✓ Admin-Login nutzt `pb.collection('admins').authWithPassword()` – nur für Admin UI

### 2. Request-Zustand
- ✓ Öffentliche Website sendet **keine** Auth-Header
- ✓ `pb.authStore.isValid = false` (kein Login)
- ✓ `@request.auth = null` in PocketBase Rules

### 3. Fehler-Interpretation
**"Only superusers can perform this action"** bedeutet:
- Die Collection hat eine **strikte Regel**, die nur Superuser/Admin zulässt
- Nicht: "Du bist nicht eingeloggt" (das wäre 401)
- Sondern: "Diese Regel erlaubt deinen Auth-Status nicht"

### 4. PocketBase API Rules
Das ist eine **Collection-Level-Einstellung** in PocketBase:

```
List Rule:  (leer oder admin-only)
View Rule:  (leer oder admin-only)
```

**Leere Rule** = "Nur authentifizierte Admins"
**`@request.auth = null`** = "Erlaubt unauthentifizierten Zugriff"

---

## Ursache
Collections `tournaments`, `players`, `rounds`, `matches`, `announcements` haben:
```
List Rule:  (leer)
View Rule:  (leer)
```

Das bedeutet: **Nur Admin-Konten dürfen lesen.**

Die öffentliche Website ist nicht angemeldet → 403.

---

## Lösung
Für jede Public-Collection die List und View Rules auf "Public Read" setzen:

```
List Rule:  @request.auth = null || @request.auth.role = "admin"
View Rule:  @request.auth = null || @request.auth.role = "admin"
```

**Bedeutung:**
- `@request.auth = null` → Unauthentifizierte Zugriffe (öffentlich) erlaubt
- `@request.auth.role = "admin"` → Admin-Zugriffe auch erlaubt
- Create/Update/Delete Rules bleiben: `@request.auth.role = "admin"` (geschützt)

---

## Collections betroffen

Öffentliche Website braucht Read-Zugriff:
1. tournaments
2. players
3. rounds
4. matches
5. announcements
6. courts (für Courts-Seite)
7. results (für Results-Seite)
8. info_sections (für News/Content)

Bleiben privat (Admin-only):
- admins (Nutzerkonten)
- contacts (je nach Anforderung)
- registrations (könnte später public sein)
- match_players (Hilfstabelle)
- locations (Admin-only oder public)
- tournament_settings (Admin-only)
- ai_schedule_runs (Admin-only)

---

## Minimale Änderung
Nur diese **8 Collections** öffnen:

| Collection | List Rule | View Rule |
|-----------|-----------|-----------|
| tournaments | `@request.auth = null \|\| @request.auth.role = "admin"` | `@request.auth = null \|\| @request.auth.role = "admin"` |
| players | `@request.auth = null \|\| @request.auth.role = "admin"` | `@request.auth = null \|\| @request.auth.role = "admin"` |
| rounds | `@request.auth = null \|\| @request.auth.role = "admin"` | `@request.auth = null \|\| @request.auth.role = "admin"` |
| matches | `@request.auth = null \|\| @request.auth.role = "admin"` | `@request.auth = null \|\| @request.auth.role = "admin"` |
| announcements | `@request.auth = null \|\| @request.auth.role = "admin"` | `@request.auth = null \|\| @request.auth.role = "admin"` |
| courts | `@request.auth = null \|\| @request.auth.role = "admin"` | `@request.auth = null \|\| @request.auth.role = "admin"` |
| results | `@request.auth = null \|\| @request.auth.role = "admin"` | `@request.auth = null \|\| @request.auth.role = "admin"` |
| info_sections | `@request.auth = null \|\| @request.auth.role = "admin"` | `@request.auth = null \|\| @request.auth.role = "admin"` |

**Alles andere:** Keine Änderung

---

## Implementierung
1. Öffne `/.sfs-bd/admin/`
2. Für jede Collection in der Tabelle:
   - Klick auf Collection
   - Tab "API Rules"
   - List Rule: `@request.auth = null || @request.auth.role = "admin"`
   - View Rule: `@request.auth = null || @request.auth.role = "admin"`
   - Speichern
3. Test: Browser öffnen → Startseite sollte Turnier laden

---

## Sicherheit
- ✓ Öffentliche **Lesezugriffe** erlaubt
- ✓ Alle **Schreibzugriffe** (Create/Update/Delete) nur Admin
- ✓ Sensitive Collections bleiben privat (admins, tournament_settings, etc.)
- ✓ Kein Code geändert – nur PocketBase Konfiguration
