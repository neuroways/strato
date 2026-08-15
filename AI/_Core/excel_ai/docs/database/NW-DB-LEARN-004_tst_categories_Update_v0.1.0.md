# NW-DB-LEARN-004: Datensatz in `tst_categories` aktualisiert

**Datum:** 2026-07-24 23:37:21 UTC  
**Umgebung:** DEV (`.sfs-bd/api`)  
**Collection:** `tst_categories`  
**Datensatz-ID:** `gi0ymx1yznu4j6n`  
**Status:** SUCCESS

---

## 1. Suche nach dem zu ändernden Datensatz

**HTTP-Methode:** GET  
**Endpunkt:** `/.sfs-bd/api/collections/tst_categories/records`  
**Filter:** `name="Grundlagen"`  
**HTTP-Status:** 200 OK

**Ergebnis:**
- Anzahl gefundener Datensätze: 1
- ID: `gi0ymx1yznu4j6n`
- name: `Grundlagen`
- description (alt): `Erste Testkategorie zum Nachvollziehen der Datenspeicherung`
- created: `2026-07-24 23:35:27.082Z`
- updated: `2026-07-24 23:35:27.082Z`

---

## 2. Änderungsoperation

**HTTP-Methode:** PATCH  
**Endpunkt:** `/.sfs-bd/api/collections/tst_categories/records/gi0ymx1yznu4j6n`  
**HTTP-Status:** 200 OK

**Übermittelte Nutzlast:**
```json
{
  "description": "Grundlagen-Kategorie für den nachvollziehbaren PocketBase-Lerntest"
}
```

**Felder, die NICHT verändert wurden:**
- `id` (nicht in Nutzlast)
- `name` (nicht in Nutzlast)
- `created` (nicht in Nutzlast)
- `updated` (wird automatisch gesetzt)

---

## 3. Verifikation — Vorher / Nachher

| Feld | Vorher | Nachher | Erwartung | Ergebnis |
|---|---|---|---|---|
| `id` | `gi0ymx1yznu4j6n` | `gi0ymx1yznu4j6n` | unverändert | ✓ |
| `name` | `Grundlagen` | `Grundlagen` | unverändert | ✓ |
| `description` | `Erste Testkategorie zum Nachvollziehen der Datenspeicherung` | `Grundlagen-Kategorie für den nachvollziehbaren PocketBase-Lerntest` | neuer Text | ✓ |
| `created` | `2026-07-24 23:35:27.082Z` | `2026-07-24 23:35:27.082Z` | unverändert | ✓ |
| `updated` | `2026-07-24 23:35:27.082Z` | `2026-07-24 23:37:21.910Z` | neuerer Zeitstempel | ✓ |

---

## 4. Erklärungen

### 1. Welche Nutzlast wurde geschickt?

Nur das zu ändernde Feld:
```json
{
  "description": "Grundlagen-Kategorie für den nachvollziehbaren PocketBase-Lerntest"
}
```

Die Nutzlast ist **minimal und fokussiert** — nur `description` wird übermittelt. Alle anderen Felder werden nicht berührt.

### 2. Warum musste die Datensatz-ID im Endpunkt verwendet werden?

PocketBase muss genau wissen, **welcher** Datensatz von möglicherweise vielen Datensätzen in der Collection geändert werden soll. Die ID ist der **eindeutige Schlüssel** für jeden Datensatz:

```
/collections/tst_categories/records/{ID}
```

Ohne die ID im Pfad wüsste der Server nicht, ob alle Datensätze geändert werden sollen, nur einer, oder mehrere mit einem Filter. Die ID macht die Änderung **präzise und sicher**.

### 3. Warum bleibt `created` unverändert?

Das Feld `created` wurde bei der Collection-Definition als `autodate` mit `onCreate: true` und `onUpdate: false` konfiguriert:

- **`onCreate: true`** = Das Feld wird **nur beim Anlegen** des Datensatzes gefüllt.
- **`onUpdate: false`** = Das Feld wird **nicht bei Änderungen** erneut gesetzt.

`created` markiert den **Gründungszeitpunkt** des Datensatzes. Er ändert sich nicht, wenn der Datensatz später verändert wird — das ist eine gängige Praxis in Datenbanken.

### 4. Warum verändert PocketBase `updated` automatisch?

Das Feld `updated` wurde als `autodate` mit `onCreate: true` und `onUpdate: true` konfiguriert:

- **`onCreate: true`** = Das Feld wird beim Anlegen gefüllt.
- **`onUpdate: true`** = Das Feld wird **bei jeder Änderung** neu gesetzt.

Der Server setzt automatisch den **aktuellen Zeitstempel** beim Speichern der Änderung. Sie müssen `updated` nicht selbst berechnen oder übermitteln — PocketBase tut das automatisch auf der Serverseite.

**Zeitstempel-Vergleich:**
- `created` bleibt: `2026-07-24 23:35:27.082Z` (Anlage-Moment)
- `updated` ändert sich: `2026-07-24 23:35:27.082Z` → `2026-07-24 23:37:21.910Z` (+2 Minuten 54 Sekunden später)

### 5. Wie erkennt man, dass derselbe Datensatz geändert wurde?

Der Datensatz ist **nicht gelöscht und neu angelegt worden** — er wurde **in-place geändert**. Das erkennt man an drei Indizien:

1. **Die ID bleibt identisch:** `gi0ymx1yznu4j6n` → `gi0ymx1yznu4j6n`  
   Wenn ein neuer Datensatz angelegt worden wäre, bekäme er eine neue ID.

2. **Der name bleibt unverändert:** `Grundlagen` → `Grundlagen`  
   Er wurde nicht angefasst, weil er nicht in der Nutzlast war.

3. **`created` bleibt unverändert:** `2026-07-24 23:35:27.082Z`  
   Der Gründungszeitpunkt ist noch immer der ursprüngliche.

4. **Nur `description` ändert sich:** Der alte Text wurde durch den neuen Text ersetzt.

5. **Nur `updated` ändert sich:** Der Änderungszeitstempel ist neuerer.

→ **Eindeutig eine Änderung, keine Neuerstellung.**

### 6. Worin unterscheidet sich das technisch von der Erstellung?

**Datensatz-Erstellung (POST):**
- HTTP-Methode: `POST /collections/tst_categories/records`
- Nutzlast: `{name: "Grundlagen", description: "…"}`
- Server-Verhalten:
  - Erzeugt eine neue ID: `gi0ymx1yznu4j6n`
  - Setzt `created`: `2026-07-24 23:35:27.082Z`
  - Setzt `updated`: `2026-07-24 23:35:27.082Z`
- Resultat: Ein neuer Datensatz mit neuer ID und Zeitstempeln.

**Datensatz-Änderung (PATCH):**
- HTTP-Methode: `PATCH /collections/tst_categories/records/gi0ymx1yznu4j6n`
- Nutzlast: `{description: "…neuer Text…"}`
- Server-Verhalten:
  - ID bleibt: `gi0ymx1yznu4j6n` (nicht neu erzeugt)
  - `created` bleibt: `2026-07-24 23:35:27.082Z` (nicht neu gesetzt)
  - `updated` wird neu gesetzt: `2026-07-24 23:37:21.910Z`
  - `description` wird überschrieben mit dem neuen Wert
- Resultat: Derselbe Datensatz mit aktualisiertem Inhalt und neuerer Änderungszeit.

→ **PATCH ändert einen vorhandenen Datensatz. POST würde einen neuen Datensatz anlegen. Die ID ist der Unterschied.**

---

## 5. Sichtprüfung — Was Sie in Ihrer Datenbankansicht sehen

Wenn Sie den Datensatz jetzt abrufen oder die Collection durchsuchen, sollten Sie sehen:

| Eigenschaft | Wert | Was sich verändert hat |
|---|---|---|
| **ID** | `gi0ymx1yznu4j6n` | ✗ Unverändert — selber Datensatz |
| **name** | `Grundlagen` | ✗ Unverändert — Suchschlüssel bleibt gleich |
| **description** | `Grundlagen-Kategorie für den nachvollziehbaren PocketBase-Lerntest` | ✓ **Neu** — der einzige geänderte Wert |
| **created** | `2026-07-24 23:35:27.082Z` | ✗ Unverändert — zeigt Gründungszeitpunkt |
| **updated** | `2026-07-24 23:37:21.910Z` | ✓ **Neu** — zeigt Änderungszeitpunkt |

Die Zeitstempel erlauben es später, eine **Versionsgeschichte** nachzuvollziehen:
- Wann wurde der Datensatz erstmals angelegt? → `created`
- Wann wurde er zuletzt verändert? → `updated`

