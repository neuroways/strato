# NW-DB-TPL-001: Verbindlicher STRATO-Datenbankauftrag

**Vorlage Versionsnummer:** 1.0.0  
**Basis-Standard:** NW-DB-STD-001_STRATO_PocketBase_Database_Development_Standard_v1.0.0  
**Verwendung:** In jeden Datenbankauftrag kopieren und ausfüllen

---

## Kopierbare Template-Struktur

Verwenden Sie diesen Block als Grundlage für alle Datenbankaufträge:

```markdown
# [AUFTRAG-NAME / NW-DB-STEP-ID]
# [Kurzbeschreibung — max 1 Zeile]

## 1. Zielumgebung

**UMGEBUNG:** DEV (/.sfs-bd/) ← STANDARD
**LIVE kontaktieren:** NEIN ← STANDARD (nur mit separatem Auftrag)
**Begründung:** [Warum DEV? Falls LIVE: Begründung erforderlich]

---

## 2. Ist-Zustand prüfen (lesend)

### 2.1 Git-Status

**Befehl:**
```bash
cd app && git status --short
```

**Erwartung:** Keine unerwarteten lokalen Änderungen
**Ist:** [FILL: git status output]
**Bewertung:** ✓ SAUBER / ⚠️ ÄNDERUNGEN VORHANDEN

### 2.2 Relevante Collections

**Befehl:**
```bash
# List all user collections in DEV
```

**Ist-Zustand vor Änderung:**

| Collection | ID | Records | Typ | Status |
|---|---|---|---|---|
| [NAME] | [pbc_...] | [COUNT] | base/auth | ✓ |

### 2.3 Betroffene Struktur

**Collection-Name zu ändern:** [NAME] oder [NEU]
**Collection-ID:** [pbc_xxxxxxxxxx]
**Aktuelle Felder:** [LISTE oder "keine/erstmalig"]
**Aktuelle Relationen:** [LISTE oder "keine"]
**Aktuelle API-Regeln:** [Alle null oder Bedingungen]

### 2.4 Abhängigkeiten

**Andere Collections, die diese referenzieren:** [LISTE oder "keine"]
**Records, die gelöscht würden:** [COUNT oder "keine"]
**Datenrisiko:** KEINE / NIEDRIG / MITTEL / HOCH / KRITISCH

---

## 3. Änderung planen (vor POST)

### 3.1 Ziel

[Fachlich: Was soll erreicht werden?]

Beispiel:
```
Ziel: Collection zur Speicherung von Kategorien anlegen,
damit Einträge später eine Kategorie zuordnen können.
```

### 3.2 Geplante Schreiboperation(en)

**Anzahl Operationen:** [COUNT]
**HTTP-Methode(n):** POST / PATCH / DELETE
**Endpunkte:**

1. POST `/collections`
   - Collection-Name: [NAME]
   - Typ: base / auth
   - Felder: [Anzahl]
   - Relationen: [Anzahl oder "keine"]

2. [Falls weitere Operationen] POST/PATCH/DELETE [Endpunkt]

### 3.3 Schemaartefakt

**Ort:** `app/database/schemas/[NAME].collection.json`

**Geplante Struktur:**

```json
{
  "name": "REPLACE_COLLECTION_NAME",
  "type": "base",
  "fields": [
    {"name": "id", "type": "text", ...},
    {"name": "title", "type": "text", ...},
    {"name": "created", "type": "autodate", ...},
    {"name": "updated", "type": "autodate", ...}
  ],
  "listRule": null,
  "viewRule": null,
  "createRule": null,
  "updateRule": null,
  "deleteRule": null
}
```

**JSON-Validierung:** ✓ VALID

### 3.4 Sicherheitsfreigabe

**Ist Datenrisiko vorhanden?** NEIN ← Keine Warnung nötig / JA ← Fallback-Strategie erforderlich

**Falls JA — Fallback-Strategie:**
```
Wenn die Operation fehlschlägt:
1. Collection löschen oder
2. Feld zurücksetzen oder
3. [Andere Strategie]
```

**Explizite Freigabe erforderlich?** NEIN ← Standard / JA ← [Grund für Eskalation]

---

## 4. Ausführung (Schreiboperation)

### 4.1 Operation 1: Collection erstellen

**HTTP-Methode:** POST
**Endpunkt:** `http://localhost/.sfs-bd/api/collections`
**Content-Type:** `application/json`
**Authorization:** Bearer $TOKEN (pb_gen_token_sfs.js)

**Nutzlast (geplant, vor Versand):**
```json
{
  "name": "tst_entries",
  "type": "base",
  "fields": [
    ...
  ],
  "listRule": null,
  "viewRule": null,
  "createRule": null,
  "updateRule": null,
  "deleteRule": null
}
```

**Zeitpunkt:** [ISO-Datetime]
**Durchgeführt:** ✓ JA / ⚠️ TEILWEISE / ❌ NEIN

**HTTP-Status:** [200, 400, 401, 422, 500, etc.]

**Ergebnis (Auszug):**
```json
{
  "id": "pbc_1496224378",
  "name": "tst_entries",
  "type": "base",
  "fields": [...],
  "created": "2026-07-25T00:38:00.000Z"
}
```

---

## 5. Verifikation (Ergebnis nachlesen)

### 5.1 Collection-Struktur überprüfen

**Befehl:**
```bash
# GET /collections/tst_entries
```

**Soll-Ist-Vergleich:**

| Merkmal | Soll | Ist | ✓ |
|---|---|---|---|
| Name | tst_entries | [IST-WERT] | ✓/❌ |
| Typ | base | [IST-WERT] | ✓/❌ |
| Feld count | 6 | [IST-WERT] | ✓/❌ |
| Feld "title" | text, required | [IST-WERT] | ✓/❌ |
| Feld "category" | relation, required | [IST-WERT] | ✓/❌ |
| Feld "created" | autodate, onCreate | [IST-WERT] | ✓/❌ |
| Feld "updated" | autodate, onUpdate | [IST-WERT] | ✓/❌ |
| listRule | null | [IST-WERT] | ✓/❌ |

**Gesamtergebnis Verifikation:** ✓ 100% MATCH / ⚠️ TEILMATCH / ❌ FEHLER

### 5.2 Relationen überprüfen (falls vorhanden)

**Relationsziel-Collection:** tst_categories
**Erwartete Collection-ID:** pbc_400465203
**Ist-Collection-ID:** [IST-WERT]
**Match:** ✓ JA / ❌ NEIN

---

## 6. Dokumentation + Git

### 6.1 Erstellte/aktualisierte Dateien

- ✓ `app/database/schemas/tst_entries.collection.json` (Schemaartefakt)
- ✓ `app/docs/database/NW-DB-LEARN-006_[NAME]_v0.1.0.md` (Lernschritt)
- ✓ `app/docs/database/NW-DB-CURRENT-STATE_v0.1.0.md` (Zustandsdokumentation, ggf. aktualisiert)

### 6.2 Git-Vorbereitung

**Befehl:**
```bash
cd app
git status --short
git diff --stat
```

**Status:** [git output]
**Enthält unerwartete Dateien?** NEIN / JA → [Welche?]

### 6.3 Commit

**Commit-Nachricht:**
```
feat: NW-DB-LEARN-006 — create tst_entries collection with relation

- New collection tst_entries (ID: pbc_1496224378)
- Fields: title (text, required), notes (text), category (relation)
- Relation to tst_categories (ID: pbc_400465203)
- maxSelect=1, cascadeDelete=false
- All access rules open (test-safe)
- Schema artifact: database/schemas/tst_entries.collection.json
- Documentation: docs/database/NW-DB-LEARN-006_tst_entries_Creation_v0.1.0.md
```

**Durchgeführt:** ✓ JA / ❌ NEIN
**Commit-ID:** [HASH]

---

## 7. Status

**Eindeutiger Abschlussstatus (wähle einen):**

- ✓ **DATABASE CHANGE VERIFIED**
  - Schreiboperation durchgeführt
  - Verifikation bestanden (100% Soll-Ist)
  - Artefakte aktuell
  - Dokumentation aktuell
  - Git sauber, Commit durchgeführt
  - NÄCHSTER SCHRITT: [z.B. NW-DB-LEARN-007]

- ⚠️ **DATABASE CHANGE PARTIAL**
  - Einige Operationen erfolgreich, andere fehlgeschlagen
  - Dokumentiert, welche fehlgeschlagen sind
  - Fallback nicht nötig (oder bereits durchgeführt)

- ❌ **DATABASE CHANGE FAILED**
  - Keine erfolgreiche Schreiboperation
  - Fehler dokumentiert
  - Fallback durchgeführt (falls geplant)

- 🚫 **DATABASE CHANGE BLOCKED**
  - Sicherheitsfreigabe nicht erfolgt
  - Keine Schreiboperation

- ❓ **DATABASE STATE UNCLEAR**
  - Schreiboperation möglicherweise durchgeführt
  - Verifikation fehlgeschlagen oder nicht möglich

---

## Wichtige Regeln (Checkliste vor Ausführung)

- ✓ DEV ist Ziel (nicht LIVE)
- ✓ Git-Status ist sauber
- ✓ Ist-Zustand wurde GELESEN (nicht vermutet)
- ✓ Schemaartefakt ist gültiges JSON
- ✓ Collection-IDs sind verifiziert (falls Relationen)
- ✓ Nutzlast ist gültiges JSON (kein Token darin)
- ✓ Maximal 1 Schreiboperation pro Datenbankauftrag (oder explizit geplant)
- ✓ Keine automatische Wiederholung bei Fehler
- ✓ Ergebnis wird nach Änderung gelesen
- ✓ Soll-Ist-Vergleich wird durchgeführt
- ✓ Keine Secrets in Logs oder Artefakten
- ✓ Eindeutiger Abschlussstatus wird genannt

---

## Vorlage-Ende

**Dieser Block kann in zukünftige Aufträge kopiert werden.**
**Füllen Sie [FILL: ...] und [...] Platzhalter aus.**
**Entfernen Sie diese Kommentare vor Finalversion.**
```

---

## Verwendungsbeispiel

Hier ist ein **ausgefülltes Beispiel** für einen kompletten Auftrag:

```markdown
# NW-DB-LEARN-006
# Ersten Testdatensatz in tst_entries mit Relation erstellen

## 1. Zielumgebung

**UMGEBUNG:** DEV (/.sfs-bd/) ← STANDARD
**LIVE kontaktieren:** NEIN ← STANDARD
**Begründung:** Test der Relationsfunktionalität vor Produktionsverwendung

---

## 2. Ist-Zustand prüfen

### 2.1 Git-Status

Sauber, keine lokalen Änderungen.

### 2.2 Relevante Collections

| Collection | ID | Records | Typ |
|---|---|---|---|
| tst_categories | pbc_400465203 | 1 | base |
| tst_entries | pbc_1496224378 | 0 | base |

### 2.3 Betroffene Struktur

**Collection:** tst_entries
**ID:** pbc_1496224378
**Aktuelle Records:** 0
**Relation:** category → tst_categories (pbc_400465203)
**Datenrisiko:** KEINE

---

## 3. Änderung planen

### 3.1 Ziel

Ersten Record in tst_entries erstellen, um die Relationsfunktionalität praktiziert zu zeigen.

### 3.2 Geplante Operation

1. POST `/collections/tst_entries/records` mit Datensatz:
   - title: "Erste Testrelation"
   - notes: "Datensatz zur Kategorie 'Grundlagen'"
   - category: "gi0ymx1yznu4j6n" (Record-ID aus tst_categories)

### 3.4 Sicherheitsfreigabe

Datenrisiko: KEINE
Fallback: Record löschen, falls Fehler.

---

## 4. Ausführung

**HTTP-Methode:** POST
**Endpunkt:** `http://localhost/.sfs-bd/api/collections/tst_entries/records`

**Nutzlast:**
```json
{
  "title": "Erste Testrelation",
  "notes": "Datensatz zur Kategorie 'Grundlagen'",
  "category": "gi0ymx1yznu4j6n"
}
```

**HTTP-Status:** 200 OK

**Ergebnis (gekürzt):**
```json
{
  "id": "xy1234abcd5678ef",
  "title": "Erste Testrelation",
  "notes": "Datensatz zur Kategorie 'Grundlagen'",
  "category": "gi0ymx1yznu4j6n",
  "created": "2026-07-25T00:42:00.000Z",
  "updated": "2026-07-25T00:42:00.000Z"
}
```

---

## 5. Verifikation

**GET /collections/tst_entries/records/xy1234abcd5678ef?expand=category**

| Merkmal | Soll | Ist | ✓ |
|---|---|---|---|
| title | "Erste Testrelation" | "Erste Testrelation" | ✓ |
| category | "gi0ymx1yznu4j6n" | "gi0ymx1yznu4j6n" | ✓ |
| expand.category.name | "Grundlagen" | "Grundlagen" | ✓ |

**Gesamtergebnis:** ✓ 100% MATCH

---

## 6. Dokumentation + Git

**Dateien:**
- ✓ docs/database/NW-DB-LEARN-006_tst_entries_Record_v0.1.0.md
- ✓ docs/database/NW-DB-CURRENT-STATE_v0.1.0.md (aktualisiert)

**Commit:**
```
feat: NW-DB-LEARN-006 — create first test record with relation
```

---

## 7. Status

✓ **DATABASE CHANGE VERIFIED**

Datensatz erfolgreich erstellt, Relation funktioniert, expand zeigt Ziel-Kategorie.
NÄCHSTER SCHRITT: NW-DB-LEARN-007 — weitere Records und Batch-Operationen testen.
```

---

## Hinweise zur Verwendung

1. **Kopieren Sie den obersten Block** (ab "# [AUFTRAG-NAME]") für jeden neuen Auftrag
2. **Füllen Sie jeden [FILL: ...]-Platzhalter** aus
3. **Löschen Sie Beispiele** oder passen Sie sie an
4. **Verwenden Sie den "Verwendungsbeispiel"-Block als Referenz** für die Struktur eines ausgefüllten Auftrags
5. **Status-Feld ist bindend** — wählen Sie genau einen Wert
6. **Keine Abkürzungen** bei kritischen Feldern (Umgebung, Commit-Nachricht, Status)

