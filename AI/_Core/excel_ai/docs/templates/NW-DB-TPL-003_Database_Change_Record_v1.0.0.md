# NW-DB-TPL-003: Datenbankänderungs-Protokoll (Change Record)

**Vorlage Versionsnummer:** 1.0.0  
**Dokumenttyp:** Change Record (Einzelne kontrollierte Datenbankänderung)  
**Basis-Standard:** NW-DB-STD-001

---

## Verwendung

Dieses Template dokumentiert **eine einzelne Datenbankänderung** (z.B. eine Collection erstellen, einen Record importieren, eine Relation hinzufügen).

Verwenden Sie dieses Template, um:
- Vor einer Operation: Geplante Änderung zu zeigen
- Nach einer Operation: Durchgeführte Änderung zu dokumentieren
- Später: Zu verstehen, warum und wie die Änderung gemacht wurde

---

## Kopierbare Struktur

```markdown
# NW-DB-CHANGE-[IDENTIFIER]_[AUFTRAG]_v0.1.0

**Änderungs-ID:** NW-DB-CHANGE-001  
**Auftrag:** NW-DB-LEARN-006 (oder Fachauftrag)  
**Umgebung:** DEV (/.sfs-bd/)  
**Änderungstyp:** Collection erstellen / Schema ändern / Record importieren / Relation hinzufügen  
**Durchführungsdatum:** [ISO-Datum]  
**Status:** VERIFIED / FAILED / PARTIAL  

---

## 1. Zusammenfassung

[1-2 Sätze: Was wurde geändert?]

Beispiel: "Collection tst_entries erstellt mit Relationsfeld category zu tst_categories. 
1 Datensatz zum Testen erstellt. Relationsfunktionalität mit expand verifiziert."

---

## 2. Geplante Änderung (vor Ausführung)

### 2.1 Zielumgebung

- **Umgebung:** DEV / LIVE
- **Datenbankdatei:** bd/data.db / be/data.db
- **API-Endpunkt:** /.sfs-bd/api / /.sfs-be/api

### 2.2 Betroffene Struktur

- **Collection-Name:** [NAME oder "NEU"]
- **Collection-ID:** [pbc_... oder "wird generiert"]
- **Operation-Typ:** POST (erstellen) / PATCH (ändern) / DELETE (löschen)
- **Anzahl Operationen:** [COUNT]

### 2.3 Vorprüfung (Ist-Zustand)

| Prüfung | Ergebnis | Bemerkung |
|---|---|---|
| Collection existiert bereits? | JA / NEIN / TEILWEISE | [Details] |
| Abhängigkeiten prüfen? | ✓ / ⚠️ / ❌ | [Details] |
| Datenrisiko? | KEINE / NIEDRIG / MITTEL / HOCH | [Details] |
| Fallback nötig? | JA / NEIN | [Strategie] |

### 2.4 Geplante Nutzlast

**Endpunkt:** POST/PATCH/DELETE [url]

**Body (JSON, gekürzt):**
```json
{
  "field1": "value1",
  "field2": "value2"
}
```

**Header:**
- Authorization: Bearer $TOKEN
- Content-Type: application/json

---

## 3. Durchführung

### 3.1 Ausführung

**Zeitpunkt:** [ISO-Datetime, z.B. 2026-07-25 00:42:15 UTC]  
**HTTP-Methode:** POST / PATCH / DELETE  
**Endpunkt:** [full URL]  
**Token:** [nicht anzeigen, nur: "Admin-Token injiziert"]  
**Durchgeführt:** ✓ JA / ⚠️ TEILWEISE / ❌ NEIN  

### 3.2 Server-Response

**HTTP-Status:** [200, 400, 422, 500, etc.]

**Response-Body (gekürzt, Secrets entfernt):**
```json
{
  "id": "pbc_1496224378",
  "name": "tst_entries",
  "type": "base",
  "fields": [...]
}
```

**Fehler (falls vorhanden):**
```json
{
  "code": 422,
  "message": "Failed to create record due to validation errors",
  "data": {
    "fieldName": [{"code": "required", "message": "Cannot be blank."}]
  }
}
```

---

## 4. Verifikation (nach Ausführung)

### 4.1 Nachgelesene Realität

**GET-Befehl:** GET [endpunkt-nach-aenderung]

**Response (relevant fields):**
```json
{
  "id": "[ergebnis-id]",
  "name": "[ergebnis-name]",
  ...
}
```

### 4.2 Soll-Ist-Abgleich

| Merkmal | Geplant (Soll) | Tatsächlich (Ist) | Übereinstimmung |
|---|---|---|---|
| Collection-Name | tst_entries | [IST] | ✓ / ❌ |
| Feld count | 6 | [IST] | ✓ / ❌ |
| Feld "title" existiert | Ja | [IST] | ✓ / ❌ |
| Relationsfeld "category" | collectionId pbc_400465203 | [IST] | ✓ / ❌ |
| System-Feld "created" | autodate | [IST] | ✓ / ❌ |
| System-Feld "updated" | autodate | [IST] | ✓ / ❌ |

**Gesamtergebnis Verifikation:** 
- ✓ 100% MATCH (alle Felder korrekt)
- ⚠️ PARTIAL (einige Felder abweichend)
- ❌ FEHLER (kritische Abweichungen)

### 4.3 Abweichungen (falls vorhanden)

[Beschreiben Sie, falls Soll ≠ Ist]

Beispiel: "Das Relationsfeld zeigt auf die falsche Collection-ID. Fallback durchgeführt: Feld gelöscht und neu erstellt."

---

## 5. Artefakte und Dokumentation

### 5.1 Erstellte/aktualisierte Dateien

- ✓ `app/database/schemas/[name].collection.json` — Schemaartefakt
- ✓ `app/docs/database/NW-DB-LEARN-[ID]_[NAME]_v0.1.0.md` — Lernschritt
- ✓ `app/docs/database/NW-DB-CURRENT-STATE_v0.1.0.md` — Zustandsdokumentation
- [ ] Weitere Dateien: [Liste]

### 5.2 Git-Zustand vor Commit

**git status --short:**
```
M  docs/database/NW-DB-CURRENT-STATE_v0.1.0.md
?? database/schemas/tst_entries.collection.json
?? docs/database/NW-DB-LEARN-006_tst_entries_Record_v0.1.0.md
```

**Erwartung:** Nur die geplanten Dateien, keine unerwarteten Änderungen  
**Ist-Zustand:** ✓ SAUBER / ⚠️ ZUSÄTZLICHE DATEIEN / ❌ UNERWARTETE ÄNDERUNGEN

### 5.3 Commit

**Commit durchgeführt:** ✓ JA / ❌ NEIN

**Commit-Nachricht:**
```
feat: NW-DB-LEARN-006 — create tst_entries record with relation to category

- Record ID: xy1234abcd5678ef
- Collection: tst_entries (pbc_1496224378)
- Relation: category → tst_categories (pbc_400465203)
- Record-ID (category): gi0ymx1yznu4j6n (Grundlagen)
- Verification: GET with expand=category shows full category data
- Documentation: NW-DB-LEARN-006_tst_entries_Record_v0.1.0.md
```

**Commit-ID:** [HASH, z.B. ae606ce]

---

## 6. Lessons Learned

### 6.1 Was funktionierte gut?

- [Punkt 1]
- [Punkt 2]
- Beispiel: "Schema-Vorlage war schnell zu verstehen; Relation-Setup war klar dokumentiert."

### 6.2 Was war schwierig?

- [Punkt 1]
- [Punkt 2]
- Beispiel: "Collection-ID vs. Record-ID wurde kurz verwechselt; klare Dokumentation half."

### 6.3 Zukünftige Verbesserungen

- [Punkt 1]
- [Punkt 2]
- Beispiel: "Feldtyp-Referenztabelle wäre hilfreich; expand-Verhalten war sofort klar."

---

## 7. Abhängigkeiten und Nächste Schritte

### 7.1 Diese Änderung abhängig von

- [ ] NW-DB-LEARN-005 (tst_entries Collection anlegen)
- [ ] [Andere Änderung]

### 7.2 Nächste geplante Änderung

- [ ] NW-DB-LEARN-007 (weitere Records testen)
- [ ] [Andere Änderung]

**Wartet auf diese Änderung:**
- [z.B. Projektcode-Integration]
- [z.B. weitere API-Regeln]

---

## 8. Status und Abschluss

**Eindeutiger Abschlussstatus:**

- ✓ **CHANGE VERIFIED** — Durchgeführt, Verifikation erfolgreich, Artefakte aktuell
- ⚠️ **CHANGE PARTIAL** — Teilweise erfolgreich, dokumentiert welche Teile fehlgeschlagen sind
- ❌ **CHANGE FAILED** — Nicht durchgeführt oder Verifikation fehlgeschlagen
- 🚫 **CHANGE BLOCKED** — Nicht durchgeführt (Sicherheit, Abhängigkeit, etc.)

**Status:** [Einer der obigen]

**Begründung:** [Warum dieser Status? Falls nicht VERIFIED: was wurde gemacht, um zu fallback?]

---

## Anhang: Referenzen

- **Standard:** NW-DB-STD-001_STRATO_PocketBase_Database_Development_Standard_v1.0.0.md
- **API-Referenz:** NW-DB-API-REFERENCE_v0.1.0.md
- **Vorhergehende Change:** NW-DB-CHANGE-005_[NAME]
- **Zugehöriger Lernschritt:** NW-DB-LEARN-006_[NAME]_v0.1.0.md

---

## Ausgefülltes Beispiel

```markdown
# NW-DB-CHANGE-001_create_tst_entries_v0.1.0

**Änderungs-ID:** NW-DB-CHANGE-001
**Auftrag:** NW-DB-LEARN-005
**Umgebung:** DEV (/.sfs-bd/)
**Änderungstyp:** Collection erstellen mit Relation
**Durchführungsdatum:** 2026-07-24 23:41:02 UTC
**Status:** VERIFIED

---

## 1. Zusammenfassung

Collection tst_entries (ID pbc_1496224378) erstellt mit Relationsfeld category zu 
tst_categories (ID pbc_400465203). Schema mit 6 Feldern (title, notes, category + system fields). 
Verifikation bestanden: Relation zeigt auf korrekte Collection-ID.

---

[Restliche Abschnitte wie oben ausgefüllt...]

**Status:** ✓ CHANGE VERIFIED
```

---

## Hinweise

1. Verwenden Sie dieses Template für **jede Datenbankänderung**, egal wie klein
2. **Vor Ausführung** füllen Sie Abschnitte 1-3
3. **Nach Ausführung** füllen Sie Abschnitte 4-7
4. **Status ist bindend** — wählen Sie genau einen Wert
5. Keine Secrets (Tokens, Passwörter) speichern
6. Alle Dateien im Git speichern und committen

