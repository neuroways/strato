# Architektur-Analyse – Status vor Service-Layer Konsolidierung

## Zusammenfassung

Das Projekt hat 12 Admin-Management-Seiten + 2 generische Komponenten.
**Status:** Komponenten greifen teilweise direkt auf API zu, ohne Service-Layer.

---

## API-Zugriffe in React

### Direkte API-Importe

| Datei | Zugriffe | Typ |
|-------|----------|-----|
| CRUDTable.jsx | getRecords, deleteRecord | Generisch |
| EditModal.jsx | createRecord, updateRecord | Generisch |
| AdminDashboard.jsx | getRecords, countRecords | Spezifisch |
| AdminLogin.jsx | — | Auth (OK) |
| TournamentManagement.jsx | — | Generisch (nutzt CRUDTable) |
| PlayerManagement.jsx | — | Generisch (nutzt CRUDTable) |
| CourtManagement.jsx | — | Generisch (nutzt CRUDTable) |
| RegistrationManagement.jsx | getRecords | Dropdown-Daten |
| MatchManagement.jsx | getRecords | Dropdown-Daten |
| RoundManagement.jsx | getRecords | Dropdown-Daten |
| ResultManagement.jsx | getRecords | Dropdown-Daten |
| TournamentSettings.jsx | getRecords, updateRecord | Spezifisch |

### Analyse

**Zentrale API-Zugriffe (2 Komponenten):**
- CRUDTable.jsx – generisch, zentral (alle Management-Seiten nutzen es)
- EditModal.jsx – generisch, zentral (alle Management-Seiten nutzen es)

**Spezifische API-Zugriffe (4 Management-Seiten):**
- AdminDashboard.jsx – Statistiken laden
- TournamentSettings.jsx – Einstellungen laden/speichern
- RegistrationManagement.jsx – Tournaments & Players als Dropdown-Quellen
- Match/Round/Result Management – ähnlich (Dropdown-Daten)

**Vorteil der Struktur:**
- Wenig Redundanz durch CRUDTable & EditModal
- Aber Dropdown-Daten werden mehrfach geladen

---

## Validierungen & Geschäftslogik in React

### AdminLogin.jsx
- ✓ Basic Error-Display
- ✓ No validation (relies on PocketBase)

### CRUDTable.jsx
- ✓ Search-Filterung (Client-seitig)
- ✓ Delete mit Bestätigung
- ✓ No validation (relies on components)

### EditModal.jsx
- ✓ Required-Field Prüfung (HTML5)
- ✓ No business validation

### Management-Seiten
- ✓ Keine Geschäftslogik
- ✓ Datendefinition (columns, fields)

### TournamentSettings.jsx
- ✓ Einstellung-Laden Logic
- ✗ Keine Validierung (z.B. Spieldauer > 0?)

---

## Fehlerbehandlung

| Komponente | Fehlerbehandlung | Level |
|-----------|-----------------|-------|
| CRUDTable | Error-Banner | Oberflächlich |
| EditModal | Error-Message | Oberflächlich |
| AdminDashboard | Try/Catch Log | Oberflächlich |
| TournamentSettings | Try/Catch → State | Oberflächlich |
| Management-Seiten | Über CRUDTable | Keine direkte |

**Problem:** Keine konsistente Fehlerbehandlung, keine aussagekräftigen Meldungen.

---

## Geschäftsregeln (fehlend)

**Sollten aber sein:**

| Regel | Ort | Status |
|-------|-----|--------|
| Spieler darf sich nicht 2x anmelden | Nirgends | ✗ Nicht implementiert |
| Turnier mit Anmeldungen kann nicht gelöscht werden | Nirgends | ✗ Nicht implementiert |
| Spiel mit Ergebnis kann nicht gelöscht werden | Nirgends | ✗ Nicht implementiert |
| Anmeldeschluss muss VOR Turnierdatum liegen | Nirgends | ✗ Nicht implementiert |
| Score-Format "6:4, 7:5" validieren | Nirgends | ✗ Nicht implementiert |

---

## Datenaufbereitung (verteilt)

| Aufgabe | Ort | Status |
|---------|-----|--------|
| Spieler-Name formatieren | Keine | ✗ Jedes Mal manuell |
| Status übersetzen | CRUDTable (inline) | ⚠️ Repetitiv |
| Belag-Labels | Keine | ✗ Jedes Mal manuell |
| Skill-Level übersetzen | Keine | ✗ Jedes Mal manuell |

---

## Herausforderungen

1. **Keine Service-Abstraction**
   - React spricht direkt mit API
   - Kein zentraler Ort für Validierungen

2. **Dropdown-Daten Redundanz**
   - RegistrationManagement lädt Tournaments & Players
   - MatchManagement lädt Rounds & Courts
   - Keine Deduplication

3. **Keine Geschäftsregeln**
   - Kritische Validierungen fehlen
   - Datenschutz-Logik (Abhängigkeits-Prüfung) fehlt

4. **Fehlerbehandlung nicht konsistent**
   - Jede Komponente macht es anders
   - Keine einheitlichen Meldungen

---

## Empfehlung

**Service-Layer einführen mit:**
1. ✓ 10 spezialisierte Services
2. ✓ Einheitliches `{ success, data, error }` Format
3. ✓ Alle Validierungen kapseln
4. ✓ Alle Geschäftsregeln implementieren
5. ✓ CRUDTable & EditModal anpassen (nutzen Services)
6. ✓ Dropdown-Daten in Services laden
7. ✓ Fehlerbehandlung zentralisieren

**Resultat:** Saubere Schichtenarchitektur, wiederverwendbar, testbar.

---

## Impact

### Jetzt
- 12 Management-Seiten
- 2 generische Komponenten
- 1 Dashboard
- 1 Login
- = 1392 LOC in Pages, davon ~150 LOC API-Zugriffe

### Nach Service-Layer
- Pages/Components nutzen nur Services
- Services nutzen nur API-Utilities
- Alle Geschäftslogik zentral
- Wiederverwendung für Public Site
- Test-fähig ohne React

---

## Umfang der Arbeit

- **10 Services zu schreiben** (~150 LOC pro Service = 1500 LOC)
- **2 generische Komponenten anpassen** (CRUDTable, EditModal)
- **Keine Management-Seiten-Anpassung nötig** (nutzen bereits CRUDTable/EditModal)
- **Dokumentation aktualisieren**

**Geschätzter Effort:** 2–3 Stunden
