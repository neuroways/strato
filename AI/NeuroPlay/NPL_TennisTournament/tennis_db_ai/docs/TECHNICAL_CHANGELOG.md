# Technisches Änderungsprotokoll – Phase 3 bis Live

Dokumentation aller Änderungen vom 26.07.2026 bis zur funktionsfähigen öffentlichen Website.

---

## 1. DATEIÄNDERUNGEN

### 1.1 React / Frontend

#### `src/App.jsx`
**Änderung:** Routing-Struktur hinzugefügt
- Import: `Routes` zu React Router Imports hinzugefügt
- Zeile 50: Fragment `<>` durch `<Routes>` ersetzt (öffnendes Tag)
- Zeile 87: Fragment `</>` durch `</Routes>` ersetzt (schließendes Tag)
- **Grund:** React Router v7 erfordert, dass `<Route>` Elemente in `<Routes>` Container eingebunden sind. Fehlendes `<Routes>` Wrapper verursachte "useRoutes() may be used only in the context of a <Router>" Fehler.
- **Auswirkung:** Admin-Login und Public Pages funktionieren jetzt über richtige Routing.

#### `src/main.jsx`
**Änderung:** BrowserRouter-Wrapper hinzugefügt
- Import: `BrowserRouter` zu React Router Imports hinzugefügt
- Zeile 9-11: `<BrowserRouter>` um `<App />` Komponente gewickelt
- **Grund:** `<Routes>` in App.jsx braucht Routing-Context, den nur `<BrowserRouter>` bereitstellt. Ohne den Wrapper: "useRoutes() may be used only in the context of a <Router>" Fehler.
- **Auswirkung:** Routing funktioniert auf allen Seiten.

#### `src/pages/public/Schedule.jsx`
**Änderung:** Error-Handling für Service-Calls verbessert
- Zeile 21-28: Fehlerbehandlung für RoundService und MatchService hinzugefügt
- Error-Propagation statt Silent-Fail
- **Grund:** Services gaben Fehler zurück, aber Komponente zeigte generische Fehlermeldung statt echter Error-Informationen.
- **Auswirkung:** Fehler werden transparent an User kommuniziert.

---

## 2. DATENBANKÄNDERUNGEN

### 2.1 Collections – Strukturelle Änderungen

#### `admins` Collection
**DEV Zustand:** Nicht vorhanden (wurde gelöscht/neu angelegt)
**PROD Zustand:** Nicht vorhanden

**Was passiert ist:**
1. Initial: `admins` war als Base-Collection (Typ: base) mit Passwort-Feld angelegt
2. Problem: Base-Collections unterstützen keine `authWithPassword()` Login-Funktion
3. Fehler: Browser-Login zeigte "Missing or invalid auth collection context" (HTTP 404)
4. Lösung: `admins` sollte als Auth-Collection (Typ: auth) recreated werden
5. Ergebnis: Beide Dev und Prod haben keine `admins` Collection mehr

**Grund für Fehler:** PocketBase Auth-Collections haben automatisierte Login/Password-Verwaltung. Base-Collections tun das nicht.

**Folge:** Admin-Login funktioniert nicht auf beiden Umgebungen, weil die Collection nicht als Auth-Type existiert.

---

### 2.2 Collections – API Rules-Änderungen

#### Öffentliche Collections (8)

**Collections:**
- tournaments
- players  
- rounds
- matches
- announcements
- courts
- results
- info_sections

**DEV Environment:**
```
tournaments:
  listRule: null (PRIVAT)
  viewRule: null (PRIVAT)

players:
  listRule: "" (ÖFFENTLICH – wurde gesetzt)
  viewRule: "" (ÖFFENTLICH – wurde gesetzt)

rounds, matches, announcements, results:
  listRule: null (PRIVAT)
  viewRule: null (PRIVAT)

courts:
  listRule: "" (ÖFFENTLICH – wurde gesetzt)
  viewRule: "" (ÖFFENTLICH – wurde gesetzt)

info_sections:
  listRule: "" (ÖFFENTLICH – wurde gesetzt)
  viewRule: "" (ÖFFENTLICH – wurde gesetzt)
```

**PROD Environment:**
```
Alle 8 Collections:
  listRule: "" (ÖFFENTLICH – wurden alle gesetzt)
  viewRule: "" (ÖFFENTLICH – wurden alle gesetzt)
```

**Bedeutung der Rules:**
- `null`: Standard-Regel = **nur Admins dürfen lesen** (403 Forbidden für andere)
- `""` (leer): **Jeder darf lesen** (auch ohne Login)

**Grund für die Änderung:**
- Die öffentliche Website zeigte "keine Daten" (HTTP 403) weil collections privat waren
- Besucherseite brauchte Lesezugriff auf die 8 Collections
- Schreibzugriffe (createRule, updateRule, deleteRule) bleiben `null` = nur Admins

**Wie die Änderung durchgeführt wurde:**
```bash
# Dev (Teilweise):
curl -X PATCH http://localhost/.sfs-bd/api/collections/{name} \
  -d '{"listRule": "", "viewRule": ""}'

# Prod (Alle 8):
curl -X PATCH http://localhost/.sfs-be/api/collections/{name} \
  -d '{"listRule": "", "viewRule": ""}'
```

**Status nach Änderungen:**
- Dev: 3 Collections öffentlich (players, courts, info_sections), 5 noch privat
- Prod: Alle 8 Collections öffentlich

---

### 2.3 Datenmigrationen

#### tournaments Record
**Dev → Prod Kopie**

**Record-ID:** 844212950d7f7605
**Name:** "Tennisturnier Neindorf 2025"
**Aktion:** Manuell von Dev zu Prod kopiert (REST API POST)

**Grund:**
- Dev hatte 1 Turnier, Prod hatte 0 Turniere
- Website zeigte "keine Turniere" obwohl Dev-Daten existierten
- Prod war leer nach Migration

**Wie:**
```bash
1. GET /sfs-bd/api/collections/tournaments/records/844212950d7f7605
2. POST /sfs-be/api/collections/tournaments/records
   (gleiche Daten)
```

**Ergebnis:** Prod hat jetzt 1 Turnier, beide Sites zeigen es an

---

## 3. AUTHENTIFIZIERUNGS-ÄNDERUNGEN

### 3.1 Admin-Login Fehler und Status

**Initial-Problem:**
```
HTTP 404 POST /.sfs-bd/api/collections/admins/auth-with-password
Error: "Missing or invalid auth collection context"
```

**Root Cause:**
- `admins` Collection war Typ `base` (normale Datensammlung)
- Base-Collections unterstützen keine `authWithPassword()` Funktion
- Diese Funktion existiert nur in Auth-Collections (wie `_superusers`, `users`)

**Versuch der Lösung:**
- Recreate `admins` als Auth-Collection (Typ: auth)
- Beide Dev und Prod

**Aktueller Status:**
- Dev: `admins` Collection existiert NICHT (wurde gelöscht)
- Prod: `admins` Collection existiert NICHT (wurde gelöscht)
- Beide Umgebungen haben keine Admin-Authentifizierung

**Grund für Fehler bei Recreation:**
- Auth-Collections erfordern komplexere Konfiguration
- Es gibt ein `authRule` und `manageRule` Feld
- Migration oder Recreation ist fehlgeschlagen

**Folge:**
- Admin-Panel ist nicht erreichbar
- Nur `_superusers` (PocketBase System) kann sich anmelden

---

## 4. WARUM FUNKTIONIERT DIE ÖFFENTLICHE WEBSITE JETZT?

### Zwei Faktoren:

#### Faktor 1: API Rules auf Public
**Zustand:** Prod hat alle 8 Collections mit `listRule: ""` und `viewRule: ""`
**Effekt:** Browser-Requests ohne Admin-Login bekommen Antwort statt 403

```javascript
// Browser macht:
fetch('/.sfs-be/api/collections/tournaments/records')

// Früher: HTTP 403 (listRule: null = privat)
// Jetzt: HTTP 200 + Daten (listRule: "" = öffentlich)
```

#### Faktor 2: Testdaten vorhanden
**Zustand:** Prod hat 1 Turnier-Record
**Effekt:** Die JS App kann Daten anzeigen statt "keine Daten"

```javascript
// JS App macht:
const result = await TournamentService.getAllTournaments()

// Früher: [] (leer)
// Jetzt: [{ id: "844...", name: "Tennisturnier...", ... }]
```

### Technischer Datenfluss (jetzt funktionierend):

```
User klickt Startseite
  ↓
React <Home/> Component mount
  ↓
useEffect() → TournamentService.getAllTournaments()
  ↓
TournamentService → getRecords('tournaments')
  ↓
getRecords → pb.collection('tournaments').getList()
  ↓
PocketBase REST API: GET /.sfs-be/api/collections/tournaments/records
  ↓
Server prüft: listRule = "" ? JA → Lesezugriff erlaubt
  ↓
Server gibt: [{ Tennisturnier... }] zurück (HTTP 200)
  ↓
Component rendert: <div>Tennisturnier Neindorf 2025</div>
  ↓
User sieht: Turnier auf Website
```

---

## 5. API RULES – EXAKTE KONFIGURATION

### Dev Environment

| Collection | listRule | viewRule | Grund |
|-----------|----------|----------|-------|
| tournaments | null | null | Nicht geändert |
| players | "" | "" | Öffentlich gemacht |
| rounds | null | null | Nicht geändert |
| matches | null | null | Nicht geändert |
| announcements | null | null | Nicht geändert |
| courts | "" | "" | Öffentlich gemacht |
| results | null | null | Nicht geändert |
| info_sections | "" | "" | Öffentlich gemacht |

**Folge für Dev:** Nur 3/8 Collections sind lesbar → `tournaments` zeigt "keine Daten"

### Prod Environment

| Collection | listRule | viewRule | Grund |
|-----------|----------|----------|-------|
| tournaments | "" | "" | Öffentlich gemacht |
| players | "" | "" | Öffentlich gemacht |
| rounds | "" | "" | Öffentlich gemacht |
| matches | "" | "" | Öffentlich gemacht |
| announcements | "" | "" | Öffentlich gemacht |
| courts | "" | "" | Öffentlich gemacht |
| results | "" | "" | Öffentlich gemacht |
| info_sections | "" | "" | Öffentlich gemacht |

**Folge für Prod:** Alle 8 Collections sind lesbar → Website funktioniert

---

## 6. DOKUMENTATIONS-DATEIEN (neue/geänderte)

Folgende Dokumentation wurde erstellt (Code-Änderung, nur Doku):

- `SETUP_CHECKLIST.md` – Anleitung für API Rules Setup
- `ADMIN_CREDENTIALS.md` – Admin Login-Informationen
- `docs/ADMIN_PANEL_ALTERNATIVE.md` – CLI-Alternative für Rules-Änderung
- `docs/PROJECT_STANDARDS.md` – Projekt-Standards für zukünftige Websites
- `docs/STRATO_DEPLOYMENT.md` – Deployment-Anleitung
- `docs/ROLES_AND_PERMISSIONS.md` – Rollen-Konzept
- `docs/POCKETBASE_RULES_CORRECTION.md` – Fehler-Analyse
- `docs/STRATO_ARCHITECTURE_ANALYSIS.md` – Architektur-Analyse
- Weitere Analyse-Dokumentationen

**Auswirkung:** Keine Code/Daten-Auswirkung, nur Dokumentation

---

## 7. INFRASTRUKTUR-ÄNDERUNGEN

### 7.1 Collections-Migration
- Dev → Prod: Schema für 8 Collections kopiert
- Dev → Prod: 1 Turnier-Record (Testdaten) kopiert

### 7.2 API Rules
- Dev: 3 Collections öffentlich, 5 privat
- Prod: 8 Collections öffentlich

### 7.3 Authentifizierung
- Dev: `admins` Collection gelöscht/nicht vorhanden
- Prod: `admins` Collection gelöscht/nicht vorhanden
- Admin-Login funktioniert nicht auf beiden

---

## 8. PROBLEME & BEKANNTE ISSUES

### 8.1 Admin-Login nicht funktionsfähig
**Status:** KRITISCH
**Ursache:** `admins` Collection existiert nicht als Auth-Type
**Auswirkung:** Admin-Panel nicht erreichbar
**Lösung erforderlich:** `admins` neu als Auth-Collection anlegen

### 8.2 Dev hat unvollständige Public Rules
**Status:** WARNUNG
**Ursache:** Nur 3/8 Collections sind öffentlich
**Auswirkung:** Dev zeigt "keine Turniere" obwohl sie existieren
**Empfehlung:** Alle 8 Collections auf Dev auch öffentlich machen (wie Prod)

### 8.3 Testdaten nur auf Prod
**Status:** WARNUNG
**Ursache:** Manuelle Kopie eines Records, andere sind nicht migriert
**Auswirkung:** Dev ist leer, nur Prod hat Daten
**Empfehlung:** Alle Testdaten migrieren oder Prozess dokumentieren

---

## 9. ZUSAMMENFASSUNG DER ÄNDERUNGEN

### Code-Änderungen (3 Dateien)
1. `src/App.jsx` – Routes Wrapper hinzugefügt
2. `src/main.jsx` – BrowserRouter Wrapper hinzugefügt
3. `src/pages/public/Schedule.jsx` – Error Handling verbessert

### Datenbank-Änderungen (9 Actions)
1. `admins` Collection gelöscht (Dev)
2. `admins` Collection gelöscht (Prod)
3. 8 Collections von Dev zu Prod migriert (Schema)
4. 1 Turnier-Record von Dev zu Prod kopiert (Daten)
5-12. API Rules auf 8 Collections geändert (Prod)

### Ergebnis
- ✅ Website zeigt Daten (API Rules öffentlich)
- ✅ Website hat Testdaten (Turnier kopiert)
- ✅ Routing funktioniert (React Router konfiguriert)
- ❌ Admin-Login funktioniert nicht (admins Collection fehlt)

---

## 10. DIFF-ÜBERSICHT

**Dateien-Änderungen (von Phase 3 bis jetzt):**
```
22 neue/geänderte Dateien
- 15 Dokumentations-Dateien (neue)
- 3 Quellcode-Dateien (geändert)
- 4 Build-Output-Dateien (automatisch regeneriert)
```

**Git Commits:** 16 Commits seit Phase 3 Abschluss

---

## 11. NICHT GEÄNDERT

- Collections-Schema (Felder, Typen) → unverändert
- Create/Update/Delete Rules → bleiben `null` (Admin-only)
- Andere Collections (contacts, registrations, etc.) → unverändert
- Source-Code Logik (Services, Components, API Calls) → unverändert
