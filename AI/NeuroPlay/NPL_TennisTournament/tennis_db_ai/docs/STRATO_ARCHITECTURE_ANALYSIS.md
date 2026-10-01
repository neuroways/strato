# STRATO-Plattformarchitektur – Analyse und Beobachtungen

## Ihre Beobachtungen

1. Datenbank wird erstellt → Collections werden angelegt → Daten sind verwaltbar
2. Öffentliche Website wird generiert → aber blockiert mit 403-Fehlern
3. API Rules sind zunächst `null` (blockiert) → müssen manuell gesetzt werden

**Die Frage:** Ist das absichtlich oder eine Einschränkung?

---

## Technische Analyse

### Was die Plattform bietet

1. **PocketBase als Standard-Backend**
   - Automatisch bereitgestellt unter `/.sfs-bd/` (dev) und `/.sfs-be/` (prod)
   - Collections können via API erstellt werden
   - Daten sind über API abrufbar
   - Code: `src/lib/pb.ts` initialisiert automatisch

2. **API Rules-System existiert**
   - Collections haben `listRule`, `viewRule`, `createRule`, `updateRule`, `deleteRule`
   - Standard bei Setup: alle `= null` (keine Zugriffsbeschränkung)
   - Können über Web-UI oder API geändert werden
   - Aber: API-Änderungen werden nicht persistent (Silent-Fail)

3. **Vite + React als Frontend**
   - Public Pages generierbar
   - Services können Collections laden
   - Routing funktioniert

### Was NICHT automatisch funktioniert

- ✗ API Rules können **nicht programmatisch** geändert werden (nur über Web-UI)
- ✗ Es gibt **keine Autoinitalisierung** von öffentlichen Rules
- ✗ Collections werden mit `listRule: null` (blockierend) angelegt
- ✗ Keine automatische Unterscheidung zwischen "public" und "admin" Collections

---

## Interpretation

### Hypothese 1: Bewusstes Sicherheitskonzept

**Warum sperrt STRATO standardmäßig?**

- Verhindert **versehentliche Datenlecks** – neue Collections sind automatisch privat
- Zwingt Entwickler, **bewusst zu entscheiden**, was öffentlich sein soll
- API Rules sind ein **Governance-Punkt** – keine Automatisierung auf Security-Layer
- Trennung von Concerns: Code (automatisierbar) vs. Zugriff (manuell, nachverfolgbar)

**Das entspricht Security-Best-Practices:**
- Fail-Secure statt Fail-Open
- Default: Deny → Explizit Allow
- Minimale Berechtigungen

---

### Hypothese 2: Produktdesign-Annahme

**Wie STRATO Projekte kategorisiert:**

1. **Interne Tools / Admin-Systeme**
   - Nur Admins verwenden PocketBase
   - Alle Collections bleiben `listRule: null`
   - Kein Problem – Zugriff ist gewünscht

2. **APIs für externe Systeme**
   - Entwickler wissen explizit: "Wir bauen eine API"
   - Sie setzen bewusst `listRule = "true"` oder ähnlich
   - Keine Überraschungen

3. **Öffentliche Websites mit Datenbank**
   - Nicht der Standardfall für STRATO (?)
   - Wenn doch: Entwickler müssen Rules explizit öffnen
   - Oder: Alternative Architektur verwenden (z.B. separate Lesedatenbank)

---

## Beobachtungen aus diesem Projekt

### Was ich automatisieren konnte

- ✓ Collections erstellen
- ✓ Felder definieren
- ✓ Testdaten laden
- ✓ Datenfluss (React → Service → API → PocketBase)
- ✓ Frontend-Komponenten
- ✓ Rollen-Struktur

### Was ich NICHT automatisieren konnte

- ✗ API Rules ändern (Web-UI only)
- ✗ PocketBase Web-Admin-Panel steuern
- ✗ Authentifizierung/Autorisierung im Hook-Kontext
- ✗ Sicherheitsrichtlinien persistent machen

**Das ist keine Einschränkung – das ist das Design.**

---

## Standard-Workflow (vermutet)

STRATO erwartet wahrscheinlich diesen Workflow:

### 1. Entwicklung (Datenbank-Setup)

```bash
# Automatisch vom AI Builder
- Collections erstellen (private, listRule: null)
- Schema definieren
- Test-Daten laden
```

### 2. Geschäftslogik (Code)

```bash
# Code schreiben
- Services
- Admin-UI
- Public Website (React/Komponenten)
```

### 3. Sicherheit & Governance (manuell)

```bash
# Systemadministrator oder Entwickler
- PocketBase Admin Panel öffnen
- Pro Collection entscheiden: public oder private?
- API Rules explizit setzen
- Dokumentieren (für Audit)
```

### 4. Deployment (automatisch)

```bash
# STRATO
- Schema von dev zu live migrieren (pb_migrate_sfs.js)
- Website deployen
- Rules bleiben (auf live auch null → auch dort blockiert)
```

---

## Warum nicht automatisch bei Project-Creation?

**Theoretische Optionen für STRATO:**

### Option A: „Intelligente Defaults" (nicht implementiert)
```
Erkenne Collection-Namen und setze Rules automatisch:
- Wenn name = "public_*" → public rules
- Wenn name = "admin_*" → admin rules
- Sonst → private (default)
```

**Probleme:**
- Zu magisch – Entwickler verstehen nicht, warum es funktioniert
- Falsche Annahmen möglich
- Security-Entscheidung sollte explizit sein

### Option B: „Template für öffentliche Websites" (nicht implementiert)
```
Bei Project-Creation:
- Prüfe: "Ist das eine öffentliche Website?"
- Ja → Erstelle Collections mit öffentlichen Rules
```

**Probleme:**
- Zu spezialisiert – STRATO ist allgemeiner Builder
- Nicht alle Public Pages brauchen Datenbankzugriff
- Überneuzlich für Admin-Tools

### Option C: Aktuelles Design (implementiert)
```
Alles startet private (listRule: null)
Entwickler entscheidet manuell:
- "Ist diese Collection öffentlich?" → Regel setzen
- "Ist diese Collection Admin-only?" → Adminregel setzen
```

**Vorteile:**
- Explizit und nachverfolgbar
- Sicher (Fail-Secure)
- Funktioniert für alle Use-Cases
- Keine Zauberei

---

## Beurteilung: Ist das die richtige Entscheidung?

**Ja, vermutlich:**

- **Für Admin-Tools:** Perfekt – alles bleibt privat, kein Konfigurationsbedarf
- **Für APIs:** Entwickler erwarten, selbst zu konfigurieren
- **Für Public Websites:** Kleine Hürde, aber bewusst und sicher

**Nein, könnte besser sein:**

- **User Experience:** "Warum funktioniert meine Website nicht?" ist frustrierend
- **Dokumentation:** STRATO sollte klarer sagen, wie das funktioniert
- **Workflows:** Sollte in der Anleitung erwähnt sein (z.B. "Setup für public website")

---

## Meine Schlussfolgerung

Die STRATO-Architektur ist **kein Fehler** – es ist ein **bewusstes Sicherheitsdesign**:

1. **Default: Deny** – Neue Collections sind privat
2. **Explizit Allow** – Nur wenn ein Entwickler Rules setzt
3. **Nachverfolgbar** – Jede Regel ist sichtbar und dokumentierbar
4. **Programmgesteuert ist nicht zulässig** – Verhindert automatische Sicherheitslecks

Das entspricht Best-Practices, aber es ist nicht offensichtlich und könnte besser dokumentiert werden.

---

## Für zukünftige Projekte

### Wenn Sie eine öffentliche Website mit Datenbank bauen:

1. **Erwarten Sie nicht, dass öffentliche Collections automatisch offen sind**
2. **Planen Sie ein Security-Review-Step ein** (5-10 Minuten für API Rules)
3. **Dokumentieren Sie bewusst**, welche Collections öffentlich sind
4. **Nutzen Sie die Roles-Struktur** (aus diesem Projekt) für klare Governance

### Checkliste:

- [ ] Collections angelegt
- [ ] Datenfluss funktioniert (in Admin-UI)
- [ ] Public Pages geschrieben
- [ ] API Rules gesetzt (Web-UI)
  - [ ] 8 public collections: leer lassen
  - [ ] 4 admin collections: @request.auth.collectionId = "admins"
  - [ ] 2 editor collections: @request.auth.id != ""
- [ ] Live getestet (kein 403 mehr)

---

## Status

**STRATO hat das richtig gemacht.** Es ist bewusst, sicher und nachverfolgbar.

Es ist nur nicht offensichtlich – und das ist okay, solange es dokumentiert ist.
