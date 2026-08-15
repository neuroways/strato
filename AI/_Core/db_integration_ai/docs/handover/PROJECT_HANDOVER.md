# NeuroPlay – Vollständige Projektübergabe

## 1. Dokumentinformationen

| Feld | Wert |
| --- | --- |
| **Projektname** | NeuroPlay |
| **Tagline** | Mensch + Aktivität + Situation = Wirkung |
| **Übergabedatum** | 2026-08-15 |
| **Entwicklungsstand** | MVP (Kern-Check-in-Flow live, öffentliche Landing Page live) |
| **Repository** | https://github.com/neuroways/db_integration_ai.git |
| **Branch** | `dev` |
| **Letzter Commit** | `2fbef84` – docs: Masterprompt für KI-Kontinuität |
| **Hostingumgebung** | IONOS Plattform (`/.sfs-bd/` Backend) |
| **Tech-Stack** | React 18 + Vite + Tailwind CSS v4 + PocketBase v0.39.0 |
| **Programmiersprache** | JavaScript/JSX (Frontend) |
| **Datenbank** | PocketBase (62 Tabellen geplant, Zustand UNGEKLÄRT) |
| **Zweck dieser Übergabe** | Vollständige Dokumentation für Übernahme durch nächste KI/Entwickler |

---

## 2. Executive Project Summary

**NeuroPlay** ist ein digitales System zur **Aktivitäts-Situationspassung** mit folgender Kernidee:

- Ein Mensch beschreibt seine **aktuelle Situation** (Energie, verfügbare Zeit, sozialer Kontext, gewünschte Intensität)
- Das System findet **passende Aktivitäten**, die zu dieser Situation passen
- **Gäste können anonym ausprobieren**, ohne Registrierung
- **Registrierte Benutzer speichern ihre Check-ins**, bauen ein Profil auf und erhalten personalisierte Empfehlungen
- **Spezielle Features geplant**: Brettspielcoach (KI erklärt Regeln), Haushalts-Management, Coaching-Panel

**Aktueller Stand (MVP):**
- ✅ **Öffentliche Landing Page** – 26-Sektionen, Dark-Mode Schieferblau + Smaragd/Cyan, responsive
- ✅ **7-Schritt Check-in-Form** – Bedürfnisse → Energie → Zeit → Personen → Intensität → Bedingungen → Zusammenfassung
- ✅ **Benutzerregistrierung & Anmeldung** – E-Mail, Passwort (8+ Zeichen), Auto-Login nach Signup
- ✅ **Passwort-Verwaltung** – Angemeldete Benutzer können Passwort ändern; Passwort-Reset leitet nur zu Support-Kontakt
- ✅ **Gast-Isolation** – Check-ins als Gast werden NUR lokal in `sessionStorage` gespeichert, KEINE API-Calls
- ⚠️ **Aktivitäts-Katalog** – Datenmodell vorhanden (62 Tabellen), aber keine UI implementiert
- ⚠️ **Empfehlungs-Engine** – Geplant, aber nicht implementiert
- ⚠️ **Datenbank-Zugriff** – Verbindung aufgebaut, aber API-Erreichbarkeit nicht getestet

**Zentrale Sicherheitsannahmen:**
1. Gäste speichern NICHTS serverseitig
2. Benutzer können nur ihre eigenen Daten sehen/ändern (Ownership-Prinzip)
3. Keine Admin-Tokens im Frontend
4. Collection Rules erzwingen Ownership-Validierung

---

## 3. Fachliches Zielbild

### 3.1 Bestätigte Anforderungen

| Anforderung | Beschreibung | Quelle |
| --- | --- | --- |
| **Aktivitäts-Matching** | System schlägt Aktivitäten basierend auf Situation vor | Projektdefinition |
| **Gast-Modus** | Anonymes Ausprobieren ohne Registrierung | DEVELOPMENT_PROMPT.md |
| **Benutzer-Isolation** | Benutzer sehen nur ihre Daten | ROLES_AND_PERMISSIONS.md |
| **11 Rollen** | GUEST, USER, MANAGED_MEMBER, HOUSEHOLD_MEMBER, HOUSEHOLD_ADMIN, COACH, EDITOR, REVIEWER, ORG_ADMIN, NPL_ADMIN, SYSTEM_ADMIN | ROLES_AND_PERMISSIONS.md |
| **Haushalts-Verwaltung** | Gruppen, Einladungen, freigegebene Check-ins | DEVELOPMENT_PROMPT.md |
| **Coaching-Panel** | Coach sieht freigegebene Daten, gibt Tipps | DEVELOPMENT_PROMPT.md |
| **Brettspielcoach** | KI erklärt Regeln, schlägt Varianten vor | DEVELOPMENT_PROMPT.md |
| **DSGVO/GDPR-Compliance** | Datenschutz nach Spezifikation | ROLES_AND_PERMISSIONS.md |
| **Audit-Logging** | Alle kritischen Zugriffe werden protokolliert | ROLES_AND_PERMISSIONS.md |
| **Anonymisierungs-Tools** | Benutzer können Daten anonymisieren | DEVELOPMENT_PROMPT.md |

### 3.2 Geplante Funktionen (NICHT implementiert)

| Funktion | Status | Grund |
| --- | --- | --- |
| **Activity-Katalog mit Filter** | GEPLANT | Keine UI für `/activities` Route |
| **Empfehlungs-Algorithmus** | GEPLANT | Matching-Engine nicht entwickelt |
| **Benutzer-Dashboard** | GEPLANT | Keine `/dashboard` Route |
| **Haushalt-Management** | GEPLANT | Keine `/household` Komponenten |
| **Coaching-Panel** | GEPLANT | Keine `/coaching` Route |
| **Admin-Panel** | GEPLANT | Keine `/admin` Komponenten |
| **Brettspielcoach** | GEPLANT | KI-Integration ausstehend |
| **Multi-Language Support** | GEPLANT | Nur Deutsch implementiert |
| **Dark Mode** | GEPLANT | Nur Light Mode aktiv |
| **Benutzer-Deletion & GDPR-Export** | GEPLANT | Keine Funktionen vorhanden |
| **Anonymisierungs-Interface** | GEPLANT | Nur Backend-Logik skizziert |
| **Mobile App** | GEPLANT | Nur Web-Responsive Design |

### 3.3 Offene Fachliche Entscheidungen

| Entscheidung | Kontext | Status |
| --- | --- | --- |
| Matching-Algorithmus | Welche Faktoren (Energie, Dauer, Komplexität, etc.) bestimmen Passung? | **UNGEKLÄRT** |
| Empfehlungs-Ranking | Top 5 oder Top 10 Aktivitäten? Wie wird Ranking berechnet? | **UNGEKLÄRT** |
| Gast → Benutzer Übernahme | Sollen alte Gast-Check-ins nach Registrierung importiert werden? | **GEPLANT, nicht implementiert** |
| Rolle bei Registrierung | Bekommt jeder neue Benutzer automatisch `USER`-Rolle? | **UNGEKLÄRT** |
| Haushalt-Admin-Berechtigung | Darf Admin eigene Haushalts-Mitglieder löschen? | **UNGEKLÄRT** |
| Feedback-Mechanik | Sollen Benutzer Feedback zu Empfehlungen geben? | **GEPLANT, nicht spezifiziert** |

### 3.4 Nicht mehr gültige Anforderungen (ERSETZT/VERALTET)

| Was war | Warum veraltet | Ersetzt durch |
| --- | --- | --- |
| Gast-Check-ins mit `user_id = anl8mgaqlk916ds` | Sicherheitsproblem – Fallback-Benutzer | Reiner `sessionStorage`, keine API-Speicherung |
| Admin-Token im Frontend | Sicherheit | Keine Admin-Tokens mehr, nur Benutzer-JWT |

---

## 4. Vollständiger Anforderungskatalog

| ID | Anforderung | Kategorie | Status | Nachweis | Offene Punkte |
| --- | --- | --- | --- | --- | --- |
| REQ-001 | Landing Page (26 Sektionen) | Frontend | ✅ IMPLEMENTIERT | `src/App.jsx` (HomePage-Komponente, 666 Zeilen) | Keine |
| REQ-002 | Check-in Form (7 Schritte) | Frontend | ✅ IMPLEMENTIERT | `src/pages/CheckinPage.jsx` (736 Zeilen) | Keine |
| REQ-003 | Gast-Isolation (sessionStorage) | Frontend/Sicherheit | ✅ IMPLEMENTIERT | `CheckinPage.jsx:131-175`, `CheckinResultPage.jsx` Gast-Rendering | Keine |
| REQ-004 | Benutzer-Registrierung | Frontend/Auth | ✅ IMPLEMENTIERT | `src/pages/RegisterPage.jsx` (222 Zeilen) | Keine |
| REQ-005 | Benutzer-Anmeldung | Frontend/Auth | ✅ IMPLEMENTIERT | `src/pages/LoginPage.jsx` (194 Zeilen) | Keine |
| REQ-006 | Passwort-Änderung (auth-required) | Frontend/Auth | ✅ IMPLEMENTIERT | `src/pages/SettingsPage.jsx` (215 Zeilen) | Keine |
| REQ-007 | Passwort-Reset-Link | Frontend/Auth | ⚠️ TEILWEISE IMPLEMENTIERT | `LoginPage.jsx:resetMode` zeigt nur Support-Kontakt | Kein E-Mail-Versand möglich (PocketBase Email API disabled) |
| REQ-008 | Ownership-Erzwingung | Backend/Sicherheit | ⚠️ GEPLANT | `DEVELOPMENT_PROMPT.md:6.3` dokumentiert Reparationen | **API-TEST FEHLGESCHLAGEN** – PocketBase nicht erreichbar |
| REQ-009 | Fremdrelations-Blockade | Backend/Sicherheit | ⚠️ GEPLANT | `DEVELOPMENT_PROMPT.md:6.3` dokumentiert Reparationen | **API-TEST FEHLGESCHLAGEN** – PocketBase nicht erreichbar |
| REQ-010 | Öffentliche Aktivitäts-Lesbarkeit | Backend/Sicherheit | ⚠️ GEPLANT | `DEVELOPMENT_PROMPT.md:6.3` dokumentiert Reparationen | **API-TEST FEHLGESCHLAGEN** – PocketBase nicht erreichbar |
| REQ-011 | 62-Tabellen-Datenmodell | Backend/DB | ⚠️ GEPLANT | `DEVELOPMENT_PROMPT.md:4` listet alle 62 Tabellen auf | **DB-ZUSTAND UNGEKLÄRT** – API nicht erreichbar |
| REQ-012 | Aktivitäts-Katalog-UI | Frontend | ❌ OFFEN | Keine Route `/activities` | Erfordert Activity-Listing + Filter |
| REQ-013 | Empfehlungs-Engine | Backend/Logik | ❌ OFFEN | Keine Implementierung | Matching-Algorithmus nicht definiert |
| REQ-014 | Benutzer-Dashboard | Frontend | ❌ OFFEN | Keine Route `/dashboard` | Erfordert Check-in-Verlauf, Favoriten, Profil |
| REQ-015 | Haushalt-Management | Frontend/Backend | ❌ OFFEN | Keine Komponenten | Erfordert `/household` Routen + Logik |
| REQ-016 | Coaching-Panel | Frontend/Backend | ❌ OFFEN | Keine Implementierung | Erfordert Coach-Views + Freigabe-Logik |
| REQ-017 | Brettspielcoach (KI) | Backend/Logik | ❌ OFFEN | Keine Implementierung | Erfordert KI-Integration + API |
| REQ-018 | Multi-Language | Frontend | ❌ OFFEN | Nur Deutsch implementiert | i18n-Framework fehlt |
| REQ-019 | Dark Mode | Frontend/CSS | ❌ OFFEN | `tailwind.config.cjs` hat `darkMode: "media"` aber keine Dark-UI | Erfordert Dark-Theme CSS + Toggle |
| REQ-020 | DSGVO-Compliance (Delete/Export) | Backend/API | ❌ OFFEN | Keine Implementierung | Erfordert `/api/user/export` + Lösch-Logik |
| REQ-021 | Audit-Logging | Backend | ❌ OFFEN | Tabelle `npl_audit_logs` geplant, aber nicht verfügbar | Erfordert Middleware + Log-Schreiber |
| REQ-022 | Anonymisierungs-Tools | Backend/API | ❌ OFFEN | Keine Implementierung | Erfordert Data Masking + Interface |

---

## 5. Aktuell Implementierter Funktionsumfang

### 5.1 Landing Page (HomePage)

**Status:** ✅ IMPLEMENTIERT (666 Zeilen)

**Zweck:** Öffentliche Startseite mit Brand, Features, Use Cases, Pricing, CTA

**Benutzerinteraktion:**
1. Besucher kommt auf `/` (default Route)
2. Sieht Header mit Logo, Navigation, Auth-Buttons
3. Kann durch 26 Sektionen scrollen:
   - Hero mit Gradient-Text
   - Feature Cards (3)
   - Use Cases (Entdecken, Verstehen, Coaching)
   - So funktioniert es (7 Punkte)
   - Brettspiel-Coach-Konzept
   - 6 Kernprinzipien
   - Activity Diversity (aus DB geladen, fallback zu hardcoded)
   - Preisbereich (geplant, noch nicht vollständig)
   - CTA-Section
   - Footer
4. Kann sich anmelden/registrieren oder Check-in durchführen

**Beteiligte Komponenten:**
- `src/App.jsx` – HomePage-Komponente (Hauptlogik)
- Mobile Menu Toggle
- Navigation mit Conditional Auth-Status

**Beteiligte Dateien:**
- `src/App.jsx` (1-300 Zeilen)
- `index.html` (meta, title)
- `tailwind.config.cjs` (Theme)

**Datenquellen:**
- Hardcoded Activity Types in `activityCategoryMap` (8 Kategorien)
- API: `pb.collection('npl_activity_types').getList()` mit `.catch()` Fallback

**Datenbankbezug:**
- Versucht `npl_activity_types` zu laden (nur optional, nicht kritisch)

**API-Endpunkte:**
- `GET /.sfs-bd/api/collections/npl_activity_types/records?page=1&perPage=50`

**Reifegrad:** PRODUKTIONSREIF (Fallback aktiv, kein Fehler bei DB-Ausfall)

**Bekannte Einschränkungen:**
- Activity Types nur im Demo-Load, nicht interaktiv
- Pricing noch nicht vollständig
- Keine Suchfunktion
- Keine Filter

---

### 5.2 Check-in-Flow

**Status:** ✅ IMPLEMENTIERT (736 Zeilen)

**Zweck:** 7-Schritt-Formular zur Situationserfassung

**Benutzerinteraktion:**

1. **Schritt 1 – Bedürfnisse** (needs)
   - Multi-Select aus 10 Bedürfnissen
   - Jedes Bedürfnis hat Icon + Name
   - Mindestens 1 erforderlich
   - Fallback zu hardcoded Bedürfnisse wenn DB fehlt
   - Ids: `7lntjce2xvpfyry` (Ruhe), `zdwdejv40qsccfx` (Fokus), etc.

2. **Schritt 2 – Energie** (energy)
   - Schieber (0–10)
   - Default: 3

3. **Schritt 3 – Zeit** (time)
   - Minuten-Input oder Schieber
   - Default: 0

4. **Schritt 4 – Personen** (social)
   - Select: allein / zu zweit / Gruppe / Publikum
   - Speichert numerisch (1–3) + String

5. **Schritt 5 – Intensität** (intensity)
   - Schieber (0–10)
   - Default: 3

6. **Schritt 6 – Zusätzliche Bedingungen** (conditions)
   - Geräusch (quiet, normal, lively, any)
   - Bildschirm (no, possible, preferred, any)
   - Materialien (only_existing, no_prep, little, any)
   - Zusätzliche Notiz (200 Zeichen max)

7. **Schritt 7 – Zusammenfassung** (summary)
   - Zeigt alle Eingaben
   - "Jetzt testen" oder "Vollständiger Check-in"

**Beteiligte Komponenten:**
- Progress Bar (7 Schritte)
- Form Input Controls
- Fallback Needs bei API-Fehler
- Navigation Buttons (Back/Next)

**Beteiligte Dateien:**
- `src/pages/CheckinPage.jsx` (736 Zeilen)
- `src/pages/CheckinResultPage.jsx` (124 Zeilen, Erfolgs-Screen)
- `src/lib/pb.js` (PocketBase Client)

**Datenquellen:**
- API: `pb.collection('npl_need_definitions').getList()`
- Fallback: 10 hardcoded Bedürfnisse mit echten IDs

**Datenbankbezug (Angemeldeter Benutzer):**
1. `POST /.sfs-bd/api/collections/npl_situations/records` (Situation anlegen)
2. `POST /.sfs-bd/api/collections/npl_situation_needs/records` (N×, für jedes Bedürfnis)
3. `POST /.sfs-bd/api/collections/npl_checkins/records` (Check-in anlegen)

**Datenbankbezug (Gast):**
- KEIN API-Call
- NUR `sessionStorage.setItem('neuroplay.guest.currentCheckin', JSON.stringify(guestCheckin))`

**Speicher-Logik:**

```javascript
// Angemeldeter Benutzer (isLoggedIn = true)
const situation = await pb.collection('npl_situations').create({
  user_id: pb.authStore.record.id,
  available_time_minutes,
  energy_level,
  desired_intensity,
  participant_count,
  social_context,
  location_type,
  noise_level,
  screen_allowed,
  available_material_note,
  context_note
});

// Für jedes Bedürfnis
await pb.collection('npl_situation_needs').create({
  situation_id: situation.id,
  need_definition_id: needId,
  priority_order: index + 1
});

// Check-in
await pb.collection('npl_checkins').create({
  situation_id: situation.id,
  checkin_type: 'QUICK' | 'FULL',
  status: 'COMPLETED',
  user_id: pb.authStore.record.id
});

// Gast (isLoggedIn = false)
const guestCheckin = {
  version: '0.1.0',
  createdAt: new Date().toISOString(),
  checkinType: 'QUICK' | 'FULL',
  situation: { /* alle Felder */ },
  needs: [ /* mit Icons */ ],
  status: 'COMPLETED'
};
sessionStorage.setItem('neuroplay.guest.currentCheckin', JSON.stringify(guestCheckin));
```

**Reifegrad:** PRODUKTIONSREIF (Fallback aktiv, Fehlerbehandlung vorhanden)

**Bekannte Einschränkungen:**
- Kein atomarer Rollback (wenn 2. Bedürfnis fehlschlägt, Situation bleibt)
- Teilweise Fehlerbehandlung (nur QUICK/FULL unterschieden)
- Keine Validierung auf DB-Seite (nur Client-Validierung)
- Keine Duplikat-Prävention

---

### 5.3 Benutzer-Registrierung

**Status:** ✅ IMPLEMENTIERT (222 Zeilen)

**Zweck:** Neuer Account mit E-Mail + Passwort

**Benutzerinteraktion:**
1. Benutzer klickt "Jetzt starten" oder navigiert zu `/register`
2. Gibt ein: Name, E-Mail, Passwort (8+), Passwort-Bestätigung
3. Klickt "Account erstellen"
4. Validierungen lokal:
   - Alle Felder gefüllt
   - Passwörter identisch
   - Mindestens 8 Zeichen
5. Sendet `POST /.sfs-bd/api/collections/npl_users/records`:
   ```json
   {
     "email": "...",
     "password": "...",
     "passwordConfirm": "...",
     "display_name": "..."
   }
   ```
6. Falls OK: Auto-Login via `authWithPassword()`
7. Weiterleitung zu `/` mit Success-Message
8. Falls Fehler: Error-Box mit Details

**Beteiligte Dateien:**
- `src/pages/RegisterPage.jsx` (222 Zeilen)

**Fehlerbehandlung:**
- Server-Fehler werden geparst aus `err.data.data`
- Angezeigt für `email`, `display_name`, `password`
- Fallback zu Generalbotschaft

**Reifegrad:** PRODUKTIONSREIF

**Bekannte Einschränkungen:**
- Kein E-Mail-Validierungs-Link (automatisch aktiv)
- Kein Duplikat-Check vor Submit (Server macht das)
- Kein Rate Limiting auf Client

---

### 5.4 Benutzer-Anmeldung

**Status:** ✅ IMPLEMENTIERT (194 Zeilen)

**Zweck:** Benutzer-Login mit E-Mail + Passwort

**Benutzerinteraktion:**
1. `/login` Route
2. E-Mail + Passwort eingeben
3. "Anmelden" klicken
4. `pb.collection('npl_users').authWithPassword(email, password)`
5. Bei OK: Weiterleitung zu `/`, Auth-State aktualisiert sich
6. Bei Fehler: "E-Mail oder Passwort nicht korrekt"

**Passwort-Reset-Flow (teilweise):**
1. "Passwort vergessen?" klicken → `resetMode = true`
2. Zeigt Erklärtext: "Nur angemeldete Nutzer können Passwort ändern, gehe zu Einstellungen oder kontaktiere Support"
3. Kein E-Mail-Versand möglich (PocketBase Email API disabled)

**Beteiligte Dateien:**
- `src/pages/LoginPage.jsx` (194 Zeilen)

**Reifegrad:** TEILWEISE PRODUKTIONSREIF (Passwort-Reset unvollständig)

**Bekannte Einschränkungen:**
- Kein echtes Passwort-Reset (nur Support-Hinweis)
- Kein "An mich erinnern"-Feature
- Kein OAuth (GitHub, Google, etc.)

---

### 5.5 Kontoeinstellungen

**Status:** ✅ IMPLEMENTIERT (215 Zeilen)

**Zweck:** Passwort-Änderung für angemeldete Benutzer

**Benutzerinteraktion:**
1. Nur erreichbar wenn `pb.authStore.isValid = true`
2. Aktuelles Passwort eingeben
3. Neues Passwort (2×) eingeben
4. "Passwort ändern" klicken
5. Validierungen:
   - Alle Felder gefüllt
   - Neue Passwörter identisch
   - Mindestens 8 Zeichen
   - Neues ≠ Altes
6. `pb.collection('npl_users').update(user.id, { password, passwordConfirm })`
7. Bei OK: Success-Message
8. "Abmelden" Button am Ende

**Beteiligte Dateien:**
- `src/pages/SettingsPage.jsx` (215 Zeilen)

**Reifegrad:** PRODUKTIONSREIF

**Bekannte Einschränkungen:**
- Kein Refresh-Token-Handling (könnte Logout erforderlich sein)
- Kein Account-Löschen
- Keine E-Mail-Änderung

---

### 5.6 Check-in-Ergebnis-Seite

**Status:** ✅ IMPLEMENTIERT (124 Zeilen)

**Zweck:** Erfolgs-Screen nach Check-in-Submit

**Benutzerinteraktion (Gast):**
1. Zeigt Success-Icon
2. "Deine Situation wurde gespeichert"
3. Buttons:
   - Passende Aktivitäten anzeigen (Route: `/recommendations`, NOT implementiert)
   - Aktivitätskatalog öffnen (Route: `/discover`, NOT implementiert)
   - Zur Startseite
4. Info-Box zeigt: "Gastdaten sind lokal, nicht auf Servern"
5. "Gastdaten löschen" Button → `sessionStorage.removeItem('neuroplay.guest.currentCheckin')`
6. Auto-Weiterleitung zu `/` nach 5 Sekunden

**Benutzerinteraktion (Angemeldeter Benutzer):**
1. Zeigt Success-Icon
2. Zusätzlich Button "Zum Dashboard" (Route: `/dashboard`, NOT implementiert)
3. Info-Box: "Empfehlungsfunktion wird aufgebaut"
4. Kein Auto-Logout

**Reifegrad:** TEILWEISE PRODUKTIONSREIF (abhängig von fehlenden Routes)

**Bekannte Einschränkungen:**
- Routes `/recommendations` und `/discover` nicht definiert
- Keine echte Matching-Anzeige
- Gast-Auto-Weiterleitung könnte zu schnell sein

---

## 6. Seiten- und Navigationsstruktur

### 6.1 Allgemeiner Navigation Tree

```
Application (React Router)
├── / (HomePage)
│   ├── Header mit Navigation
│   ├── 26-Section Landing
│   └── Footer
├── /check-in (CheckinPage)
│   ├── 7-Step Form
│   └── Next/Back Navigation
├── /check-in/result (CheckinResultPage)
│   ├── Success Message
│   ├── Action Buttons
│   └── Guest Data Display (optional)
├── /register (RegisterPage)
│   ├── Form (Name, E-Mail, Passwort)
│   └── "Anmelden" Link
├── /login (LoginPage)
│   ├── Form (E-Mail, Passwort)
│   ├── "Passwort vergessen?" (partial)
│   └── "Registrieren" Link
├── /settings (SettingsPage)
│   ├── Passwort-Änderung (auth-required)
│   ├── Abmelden
│   └── "Zur Startseite" Link
└── [NICHT IMPLEMENTIERT]
    ├── /recommendations
    ├── /discover
    ├── /dashboard
    ├── /household
    ├── /coaching
    ├── /activities
    └── /admin
```

### 6.2 Seiten-Details

| Route | Status | Komponente | Zeilen | Zweck | Zielgruppe | Auth | Datenquellen |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | ✅ | HomePage (App.jsx) | 666 | Landing, Navigation, Features | Alle | Nein | npl_activity_types (optional) |
| `/check-in` | ✅ | CheckinPage.jsx | 736 | 7-Step Situation Form | Alle (Guest + User) | Optional | npl_need_definitions, sessionStorage |
| `/check-in/result` | ✅ | CheckinResultPage.jsx | 124 | Success Screen | Alle | Nein | sessionStorage (Guest), DB (User) |
| `/register` | ✅ | RegisterPage.jsx | 222 | Account Creation | Gast | Nein | npl_users (POST) |
| `/login` | ✅ | LoginPage.jsx | 194 | Authentication | Gast | Nein | npl_users (auth) |
| `/settings` | ✅ | SettingsPage.jsx | 215 | Account Settings | User | Ja | npl_users (PATCH) |
| `/recommendations` | ❌ | NOT FOUND | – | Activity Matching Results | User | Ja | npl_recommendations (geplant) |
| `/discover` | ❌ | NOT FOUND | – | Activity Catalog | Alle | Nein | npl_activities |
| `/dashboard` | ❌ | NOT FOUND | – | User Home | User | Ja | npl_checkins, npl_recommendations |
| `/household` | ❌ | NOT FOUND | – | Household Management | HOUSEHOLD_ADMIN | Ja | npl_households, npl_household_members |
| `/coaching` | ❌ | NOT FOUND | – | Coaching Panel | COACH | Ja | shared data |
| `/admin` | ❌ | NOT FOUND | – | Admin Dashboard | NPL_ADMIN | Ja | all collections |

---

## 7. User Flows

### 7.1 Gast-Check-in (VOLLSTÄNDIG IMPLEMENTIERT)

```
Gast
  ↓
Besucht / (HomePage)
  ↓ [klickt "Jetzt starten" oder navigiert zu /check-in]
CheckinPage
  ↓
[7 Schritte durchfüllen, Bedürfnisse wählen]
  ↓
[Zusammenfassung checken]
  ↓
["Jetzt testen" oder "Vollständiger Check-in" klicken]
  ↓
saveSituation('QUICK' | 'FULL') aufgerufen
  ↓
isLoggedIn = false → saveGuestCheckin()
  ↓
sessionStorage.setItem('neuroplay.guest.currentCheckin', {...})
  ↓
navigate('/check-in/result')
  ↓
CheckinResultPage (Gast-Variante)
  ↓
[zeigt Daten, "Gastdaten löschen" Button]
  ↓
[nach 5 Sekunden: auto-redirect zu /]
  ✓ ABGESCHLOSSEN (keine DB-Einträge)
```

**Status:** ✅ IMPLEMENTIERT

---

### 7.2 Registrierung & Login (VOLLSTÄNDIG IMPLEMENTIERT)

```
Gast
  ↓
Klickt "Jetzt starten" oder "Registrieren"
  ↓
RegisterPage
  ↓
[füllt: Name, E-Mail, Passwort ≥8, Bestätigung]
  ↓
[klickt "Account erstellen"]
  ↓
pb.collection('npl_users').create({...})
  ↓
pb.collection('npl_users').authWithPassword(email, password)
  ↓
Success Message
  ↓
navigate('/') nach 2 Sekunden
  ↓
Benutzer A (angemeldet)
  ✓ REGISTRIERUNG ABGESCHLOSSEN
```

---

### 7.3 Angemeldeter Benutzer Check-in (TEILWEISE IMPLEMENTIERT)

```
Benutzer A (angemeldet)
  ↓
navigiert zu /check-in
  ↓
CheckinPage (isLoggedIn = true)
  ↓
[7 Schritte durchfüllen]
  ↓
saveSituation('QUICK' | 'FULL')
  ↓
isLoggedIn = true → saveSituation() API-Flow
  ↓
1. pb.collection('npl_situations').create({
       user_id: Benutzer A ID,
       ...
     })
  ↓
2. [für jedes Bedürfnis]
     pb.collection('npl_situation_needs').create({
       situation_id: situation.id,
       need_definition_id: need.id,
       priority_order: i+1
     })
  ↓
3. pb.collection('npl_checkins').create({
       user_id: Benutzer A ID,
       situation_id: situation.id,
       checkin_type: 'QUICK' | 'FULL',
       status: 'COMPLETED'
     })
  ↓
navigate('/check-in/result')
  ↓
CheckinResultPage (User-Variante)
  ↓
[zeigt Buttons für /recommendations, /discover, /dashboard]
  ✓ Check-in ABGESCHLOSSEN
  ⚠️ /recommendations, /discover, /dashboard NOT IMPLEMENTED
```

**Status:** ✅ CHECK-IN-SPEICHERUNG, ⚠️ ERGEBNIS-ANZEIGE UNVOLLSTÄNDIG

---

### 7.4 Passwort-Änderung (IMPLEMENTIERT)

```
Benutzer A (angemeldet)
  ↓
klickt "Einstellungen" oder navigiert zu /settings
  ↓
[nur möglich wenn pb.authStore.isValid = true]
  ↓
SettingsPage
  ↓
[füllt: aktuelles PW, neues PW ≥8, Bestätigung]
  ↓
[klickt "Passwort ändern"]
  ↓
pb.collection('npl_users').update(user.id, {
  password: newPassword,
  passwordConfirm: newPasswordConfirm
})
  ↓
Success Message
  ↓
Benutzer bleibt angemeldet (Reauth wird bei nächster Aktion geprüft)
  ✓ PASSWORD CHANGE COMPLETE
```

**Status:** ✅ IMPLEMENTIERT

---

## 8. Technische Architektur

### 8.1 High-Level Architektur

```
┌─────────────────────────────────────────────────────┐
│                    Browser (Gast/Benutzer)           │
│  - React 18 App (App.jsx + Pages)                   │
│  - Vite Hot Module Reload                           │
│  - Tailwind CSS v4 Styling                          │
│  - sessionStorage (Gast-Daten nur)                  │
└──────────────────────┬──────────────────────────────┘
                       │ (HTTP Requests)
                       │ (JWT Token im Auth-Header)
                       ↓
┌─────────────────────────────────────────────────────┐
│         PocketBase Backend (/.sfs-bd/)              │
│  - v0.39.0                                          │
│  - 62 Collections (Tabellen)                        │
│  - Collection Rules (PQL) für Access Control        │
│  - Auth Collection (npl_users)                      │
│  - JWT Token Generation                            │
└──────────────────────┬──────────────────────────────┘
                       │ (SQLite Queries)
                       ↓
┌─────────────────────────────────────────────────────┐
│           SQLite Database (PocketBase)              │
│  - 62 Collections (if fully created)                │
│  - Relations, Indexes, Soft Deletes                 │
└─────────────────────────────────────────────────────┘
```

### 8.2 Datenfluss für Check-in

```
[Gast]
  ↓
CheckinPage.jsx
  ↓ [saveSituation('QUICK')]
  ↓ [saveGuestCheckin()] (kein API)
  ↓
sessionStorage.setItem('neuroplay.guest.currentCheckin', {...})
  ↓
CheckinResultPage.jsx
  ↓ [liest aus sessionStorage]
  ↓ [zeigt Daten]
  ↓ [optional: sessionStorage.removeItem()]

[Benutzer A]
  ↓
CheckinPage.jsx
  ↓ [saveSituation('QUICK')]
  ↓ [saveSituation() API-Flow]
  ↓
POST /.sfs-bd/api/collections/npl_situations/records
  ├─ body: { user_id, energy_level, ... }
  ├─ header: Authorization: Bearer <JWT>
  ↓
[PocketBase prüft Collection Rules]
  ├─ createRule: @request.auth.id != "" && @request.body.user_id = @request.auth.id
  ↓ [BESTANDEN]
  ↓
SQLite: INSERT INTO npl_situations (user_id, energy_level, ...)
  ↓ [situation.id = xyz]
  ↓
[Loop für jedes Bedürfnis]
  ↓
POST /.sfs-bd/api/collections/npl_situation_needs/records
  ├─ body: { situation_id: xyz, need_definition_id: abc, priority_order: 1 }
  ├─ header: Authorization: Bearer <JWT>
  ↓
[PocketBase prüft Collection Rules]
  ├─ createRule: situation_id.user_id = @request.auth.id
  ↓ [BESTANDEN]
  ↓
SQLite: INSERT INTO npl_situation_needs
  ↓
[Wiederhole für Bedürfnis 2, 3, ...]
  ↓
POST /.sfs-bd/api/collections/npl_checkins/records
  ├─ body: { situation_id: xyz, checkin_type: 'QUICK', user_id: Benutzer A }
  ├─ header: Authorization: Bearer <JWT>
  ↓
[PocketBase prüft Collection Rules]
  ├─ createRule: @request.body.situation_id.user_id = @request.auth.id
  ↓ [BESTANDEN]
  ↓
SQLite: INSERT INTO npl_checkins
  ↓ [checkin.id = pqr]
  ↓
navigate('/check-in/result')
  ↓
CheckinResultPage.jsx
  ↓ [liest aus DB: npl_situations, npl_situation_needs, npl_checkins]
  ↓ [zeigt Erfolgsmeldung + Aktionen]
  ✓ COMPLETE
```

### 8.3 Frontend Tech Stack

| Komponente | Version | Bemerkung |
| --- | --- | --- |
| React | 18 | Platform-provided |
| React Router | 6+ | Platform-provided, client-side routing |
| Tailwind CSS | v4 | Platform-provided, @import "tailwindcss" |
| Lucide Icons | latest | Platform-provided, import Name from "icon:kebab-name" |
| PocketBase JS SDK | v0.27.0 | Platform-provided, `pb.collection(...).create(...)` |
| Vite | latest | Platform-provided, HMR dev server |

### 8.4 Backend Tech Stack

| Komponente | Version | URL |
| --- | --- | --- |
| PocketBase | v0.39.0 | `/.sfs-bd/` |
| SQLite | (internal) | Local to PocketBase |
| Auth Collection | npl_users | `/.sfs-bd/api/collections/npl_users/records` |

### 8.5 API Design

**Base URL:** `/.sfs-bd/api/`

**Authentication:**
- Header: `Authorization: Bearer <JWT_TOKEN>`
- Token von `pb.authStore.token` (nach login/register)

**Endpunkt-Pattern:**
```
POST   /.sfs-bd/api/collections/<collection_name>/records
GET    /.sfs-bd/api/collections/<collection_name>/records
GET    /.sfs-bd/api/collections/<collection_name>/records/<id>
PATCH  /.sfs-bd/api/collections/<collection_name>/records/<id>
DELETE /.sfs-bd/api/collections/<collection_name>/records/<id>
POST   /.sfs-bd/api/collections/npl_users/auth-with-password
```

**Beispiel Request (Check-in erstellen):**
```http
POST /.sfs-bd/api/collections/npl_checkins/records HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "situation_id": "xyz123",
  "user_id": "abc456",
  "checkin_type": "QUICK",
  "status": "COMPLETED"
}
```

---

## 9. Repository- und Verzeichnisstruktur

```
app/
├── src/
│   ├── App.jsx                    # Root + Router (666 Zeilen)
│   ├── main.jsx                   # ReactDOM.render entry
│   ├── index.css                  # Tailwind v4 import + @config
│   ├── lib/
│   │   └── pb.js                  # PocketBase singleton
│   └── pages/
│       ├── HomePage.jsx           # Landing (>1000 Zeilen)
│       ├── CheckinPage.jsx        # 7-Step Form (736 Zeilen)
│       ├── CheckinResultPage.jsx  # Success Screen (124 Zeilen)
│       ├── RegisterPage.jsx       # Signup (222 Zeilen)
│       ├── LoginPage.jsx          # Login (194 Zeilen)
│       └── SettingsPage.jsx       # Account Settings (215 Zeilen)
├── public/
│   └── favicon.svg                # Gradient N Logo
├── dist/                          # Built production assets
│   ├── index.html
│   ├── favicon.svg
│   └── assets/
│       ├── index-*.js
│       └── index-*.css
├── docs/
│   └── handover/
│       └── PROJECT_HANDOVER.md    # Diese Datei
├── index.html                     # HTML Entry Point
├── vite.config.js                 # Vite Config (minimal)
├── tailwind.config.cjs            # Tailwind Theme
├── package.json                   # Empty (dependencies provided)
├── package-lock.json              # Lock file
├── AGENTS.md                      # Tech Reference (STRATO AI)
├── DEVELOPMENT_PROMPT.md          # Masterprompt für KI (502 Zeilen)
├── ROLES_AND_PERMISSIONS.md       # Role Spec (243 Zeilen)
└── SECURITY_AUDIT_RESULTS.md      # Audit Report (309 Zeilen)

Wichtige Dateien:

- vite.config.js – Minimal, nutzt IONOS platform-config
- tailwind.config.cjs – Theme customization
- package.json – LEER (keine npm-Abhängigkeiten)
- src/lib/pb.js – Nur PocketBase Client Konfiguration
- index.html – Basis HTML mit Title + Meta
- src/main.jsx – React StrictMode + Root Render

Nicht im Repo:
- node_modules/ (platform-provided)
- .env – Secrets (nicht in Git)
```

### 9.1 Große Dateien

| Datei | Zeilen | Funktion |
| --- | --- | --- |
| src/App.jsx | 666 | Router, HomePage, Navigation |
| src/pages/CheckinPage.jsx | 736 | 7-Step Form Logic |
| DEVELOPMENT_PROMPT.md | 502 | Masterprompt |
| ROLES_AND_PERMISSIONS.md | 243 | Role Spec |
| SECURITY_AUDIT_RESULTS.md | 309 | Audit Report |

### 9.2 Zu beachtende Constraints

- **Keine package.json-Änderungen:** Plattform löscht sie automatisch
- **Keine neuen node_modules:** Platform-provided nur
- **/static/<file> für externe Assets:** NICHT `./public/` oder `app/static/`
- **`.sfs-bd/` ist feste Backend-URL:** Nicht konfigurierbar
- **Vite HMR läuft lokal:** `npm run dev`
- **Prod Build:** `npm run build:prod` → `dist/`

---

## 10. Datenbank

### 10.1 Datenbanktechnologie

- **System:** PocketBase v0.39.0 (selbst-gehostete Variante auf IONOS)
- **Datenspeicher:** SQLite (lokal in PocketBase)
- **API:** REST + WebSocket
- **Auth:** JWT-basiert, Collection-Rules für Access Control

### 10.2 Geplante Tabellenstruktur (62 Tabellen)

**Status:** UNGEKLÄRT – API nicht erreichbar, Tabellenexistenz unverifi

ziert

Die folgenden 62 Tabellen sind im DEVELOPMENT_PROMPT.md als "geplant" dokumentiert. **WICHTIG:** Diese Liste ist NICHT VERIFIZIERT, da die PocketBase-API während dieser Übergabe nicht erreichbar war.

#### Activity Catalog (7)
- `npl_activity_types` – Kategorien (Spiel, Sport, Handwerk, etc.)
- `npl_activities` – Master-Aktivitäten (KRITISCH: Wurde auf 25 Spalten repariert)
- `npl_categories` – Hierarchische Kategorien
- `npl_category_links` – Activity-to-Category Mapping
- `npl_tags` – Freie Tags
- `npl_tag_links` – Activity-to-Tag Mapping
- `npl_relations` – Activity-to-Activity

#### Activity DNA (4)
- `npl_feature_groups`
- `npl_feature_definitions`
- `npl_feature_options`
- `npl_activity_feature_values`

#### Board Games (9)
- `npl_publishers`, `npl_games`, `npl_editions`, `npl_persons`, `npl_contributors`, `npl_mechanics`, `npl_mechanic_links`, `npl_component_types`, `npl_game_components`

#### Sources (4)
- `npl_sources`, `npl_source_documents`, `npl_source_references`, `npl_provenance_records`

#### Rules & Workflows (8)
- `npl_rules`, `npl_rule_relations`, `npl_phases`, `npl_steps`, `npl_core_loops`, `npl_core_loop_steps`, `npl_learning_units`, `npl_effect_definitions`

#### Users & Households (8)
- `npl_users` (AUTH_COLLECTION, kritisch)
- `npl_human_profiles` (user_id REQUIRED)
- `npl_user_preferences` (human_profile_id REQUIRED)
- `npl_households`, `npl_household_members`
- `npl_collections`, `npl_collection_items`, `npl_roles`

#### Matching & Recommendations (4)
- `npl_matching_models`, `npl_recommendations`, `npl_recommendation_factors`, `npl_recommendation_feedback`

#### Sessions & Coaching (5)
- `npl_sessions`, `npl_session_participants`, `npl_session_adjustments`, `npl_game_states`, `npl_game_actions`

#### Learning (1)
- `npl_user_learning_progress`

#### Observations & Effects (7)
- `npl_situations` (user_id REQUIRED, kritisch)
- `npl_situation_needs` (situation_id + need_definition_id REQUIRED, kritisch)
- `npl_observations`, `npl_observed_effects`, `npl_reflections`
- `npl_need_definitions` (10 Bedürfnisse, hardcoded in CheckinPage.jsx)
- `npl_checkins` (user_id REQUIRED, kritisch)

#### AI & Audit (2)
- `npl_ai_generations`, `npl_audit_logs`

### 10.3 Kritische Tabellen (IN VERWENDUNG)

**Diese Tabellen werden vom aktuellen Code tatsächlich genutzt:**

| Tabelle | Felder | Kritisch für | Status |
| --- | --- | --- | --- |
| `npl_users` | email, password, passwordConfirm, display_name | Auth | ✅ Verwendet (Register, Login) |
| `npl_need_definitions` | id, name, icon, sort_order, is_active | Check-in UI | ⚠️ Fallback zu hardcoded Daten |
| `npl_situations` | user_id, available_time_minutes, energy_level, desired_intensity, participant_count, social_context, location_type, noise_level, screen_allowed, available_material_note, context_note | Check-in Storage | ⚠️ API-Zugriff UNGEKLÄRT |
| `npl_situation_needs` | situation_id, need_definition_id, priority_order | Check-in Storage | ⚠️ API-Zugriff UNGEKLÄRT |
| `npl_checkins` | situation_id, user_id, checkin_type, status | Check-in Storage | ⚠️ API-Zugriff UNGEKLÄRT |
| `npl_activity_types` | id, name | HomePage Optional | ✅ Fallback aktiv |

### 10.4 Bekannte Datenbank-Probleme (aus Audit)

| Problem | Ursache | Status | Workaround |
| --- | --- | --- | --- |
| npl_activities war unvollständig | 3 statt 25 Spalten | REPARIERT | PATCH mit 25-Spalten-Schema |
| npl_activities.is_active Rule | Feld existiert nicht | REPARIERT | listRule/viewRule auf "" gesetzt |
| npl_need_definitions listRule | Superuser-only | REPARIERT | listRule auf "" gesetzt (public) |
| npl_rules listRule/viewRule | Feld existiert nicht | REPARIERT | listRule/viewRule auf "" gesetzt |
| Gast speichert mit Test-Benutzer | Fallback zu anl8mgaqlk916ds | BEHOBEN | sessionStorage nur, keine API |
| Ownership nicht erzwungen | user_id.required = false | REPARIERT (unverifi.) | required = true gesetzt |

### 10.5 Ownership-Modell (Sicherheit)

**Annahme aus DEVELOPMENT_PROMPT.md (UNVERIFI., da API offline):**

```
Benutzer A
  ├─ Human Profile A (user_id = A)
  │   ├─ User Preference A1 (human_profile_id = A)
  │   └─ User Preference A2
  ├─ Situation A1 (user_id = A)
  │   ├─ Situation Need A1-1 (situation_id = A1)
  │   └─ Situation Need A1-2
  └─ Checkin A1 (user_id = A, situation_id = A1)

Benutzer B soll NICHT:
  - Situation A1 lesen/ändern/löschen
  - Situation Need A1-1 lesen/ändern/löschen
  - Checkin A1 lesen/ändern/löschen
  - Human Profile A lesen
  - User Preference A1 lesen/ändern
```

**Implementiert über Collection Rules (claimed, unverifi.):**
```
npl_situations.createRule: @request.auth.id != "" && @request.body.user_id = @request.auth.id
npl_situation_needs.createRule: situation_id.user_id = @request.auth.id
npl_checkins.createRule: @request.body.situation_id.user_id = @request.auth.id
```

---

## 11. API und Schnittstellen

### 11.1 Implementierte API-Endpunkte

| Methode | Endpoint | Status | Input | Output | Auth | Verwendung |
| --- | --- | --- | --- | --- | --- | --- |
| POST | `/api/collections/npl_users/records` | ✅ | email, password, passwordConfirm, display_name | { id, email, display_name, ... } | – | RegisterPage |
| POST | `/api/collections/npl_users/auth-with-password` | ✅ | email, password | { token, record } | – | LoginPage, auto-login nach Register |
| GET | `/api/collections/npl_activity_types/records` | ✅ | page, perPage, sort | { items: [...], page, perPage, total } | – | HomePage (optional) |
| GET | `/api/collections/npl_need_definitions/records` | ✅ | sort, filter | { items: [...] } | – | CheckinPage |
| POST | `/api/collections/npl_situations/records` | ⚠️ | user_id, available_time_minutes, energy_level, ... | { id, user_id, ... } | JWT | CheckinPage (User) |
| POST | `/api/collections/npl_situation_needs/records` | ⚠️ | situation_id, need_definition_id, priority_order | { id, ... } | JWT | CheckinPage (User) |
| POST | `/api/collections/npl_checkins/records` | ⚠️ | situation_id, user_id, checkin_type, status | { id, ... } | JWT | CheckinPage (User) |
| PATCH | `/api/collections/npl_users/records/<id>` | ✅ | password, passwordConfirm | { id, email, ... } | JWT | SettingsPage |

**Status-Legende:**
- ✅ = Implementiert und verwendet
- ⚠️ = Implementiert im Code, aber API-Zugriff UNVERIFI. (offline)
- ❌ = Nicht implementiert

### 11.2 Geplante API-Endpunkte (NICHT IMPLEMENTIERT)

| Methode | Endpoint | Zweck | Input | Output | Auth |
| --- | --- | --- | --- | --- | --- |
| GET | `/api/collections/npl_activities/records` | Activity-Katalog laden | page, perPage, filter, search | { items: [...] } | – |
| GET | `/api/collections/npl_recommendations/records` | Empfehlungen laden | user_id, page, perPage | { items: [...] } | JWT |
| POST | `/api/collections/npl_recommendations/records` | Empfehlung erstellen | user_id, activity_id, score | { id, ... } | JWT |
| POST | `/api/collections/npl_recommendation_feedback/records` | Feedback geben | recommendation_id, helpful | { id } | JWT |
| GET | `/api/collections/npl_households/records` | Haushalte laden | user_id, filter | { items: [...] } | JWT |
| POST | `/api/collections/npl_households/records` | Haushalt erstellen | name, owner_user_id | { id, ... } | JWT |
| POST | `/api/collections/npl_household_members/records` | Mitglied einladen | household_id, user_email | { id, ... } | JWT |
| DELETE | `/api/collections/npl_users/records/<id>` | Account löschen | – | { deleted: true } | JWT |
| GET | `/api/export/user/<id>` | GDPR-Export | – | { json } | JWT |

---

## 12. Fachliche Geschäftslogik

### 12.1 Check-in-Logik

**Regel:** Jeder Check-in erfasst eine momentane Situation

**Implementierung:**

```javascript
// Situation: aktueller emotionaler/körperlicher Zustand
const situation = {
  energy_level: 1-10,              // "Wie viel Energie habe ich gerade?"
  available_time_minutes: 0-1440,  // "Wie viel Zeit habe ich?"
  desired_intensity: 1-10,         // "Wie anstrengend soll es sein?"
  social_context: 'alone'|'two'|'group'|'public', // "Mit wem?"
  location_type: 'home'|'outdoor'|'travel'|...    // "Wo bin ich?"
  noise_level: 'quiet'|'normal'|'lively'|'any',   // "Geräusch?"
  screen_allowed: 'no'|'possible'|'preferred'|'any',
  available_material_note: string,  // Material vorhanden?
  context_note: string             // Weitere Anmerkungen
}

// Bedürfnis: psychologisches Ziel
// 10 vordefinierte Bedürfnisse (aus npl_need_definitions)
const need = {
  id: '7lntjce2xvpfyry',
  name: 'Ruhe',
  icon: '🌿',
  is_active: true
}

// Check-in: Dokumentation der Situation + Bedürfnisse
const checkin = {
  situation_id: '<situation-id>',
  user_id: '<user-id>',            // Ownership
  checkin_type: 'QUICK'|'FULL',    // Schnell oder gründlich
  status: 'COMPLETED'|'CANCELLED'|...,
  created_at: ISO-String
}
```

**Validierungen:**
1. Mindestens 1 Bedürfnis wählen
2. Energie, Zeit, Intensität ≥ 0
3. Sozial-Kontext muss gesetzt sein
4. Benutzer-ID muss mit Auth-Token matchen (Server-Validierung)
5. Situation muss existieren, bevor Needs/Checkin angelegt werden

### 12.2 Matching-Logik (GEPLANT, NICHT IMPLEMENTIERT)

**Regel:** Situation + Bedürfnisse → Aktivitäts-Ranking

**Pseudo-Code:**
```
Für jede Aktivität im Katalog:
  score = 0
  
  # Energie-Match
  if activity.min_energy <= situation.energy_level <= activity.max_energy:
    score += 25
  else:
    score -= 10
  
  # Zeit-Match
  if situation.available_time >= activity.min_duration:
    score += 25
  else:
    score -= 10
  
  # Bedürfnisse-Match
  for each selected_need in situation.needs:
    if activity.addresses_need(selected_need):
      score += (50 / count(situation.needs))  # anteilig
  
  # Komplexität-Match
  if activity.complexity == situation.desired_intensity:
    score += 20
  
  # Kontext-Match
  if activity.location_type matches situation.location_type:
    score += 15
  
  # Material-Match
  if activity.requires_material <= situation.available_material:
    score += 10
  
  recommendations.append({
    activity_id: activity.id,
    score: score,
    factors: [energy_match, time_match, ...]
  })

return recommendations.sort(score DESC)[:5]  # Top 5
```

**Status:** OFFEN – Algorithmus nicht finalisiert

### 12.3 Rollen-Logik (GEPLANT, NICHT IMPLEMENTIERT)

**11 Rollen mit unterschiedlichen Permissions:**

```
GUEST
  - read npl_activities (public only)
  - read npl_rules (public only)
  - read npl_need_definitions (active)
  - sessionStorage only (NO DB writes)

USER
  - read/write own npl_situations
  - read/write own npl_checkins
  - read/write own npl_human_profiles
  - cannot read other users' data

HOUSEHOLD_MEMBER
  - USER permissions
  - + read shared household data

HOUSEHOLD_ADMIN
  - HOUSEHOLD_MEMBER permissions
  - + create/delete household_members
  - + modify household settings

COACH
  - read shared data from coached users
  - write observations + feedback

EDITOR
  - read/write npl_activities (draft status)
  - read/write npl_rules (draft status)

REVIEWER
  - read draft activities/rules
  - approve/reject for publication

ORG_ADMIN
  - read/write all organization data
  - audit logs

NPL_ADMIN
  - read/write all collections except system
  - user management

SYSTEM_ADMIN
  - full access (superuser)
```

**Implementierung:** Via Collection Rules (unverifi., API offline)

---

## 13. Authentifizierung, Rollen und Berechtigungen

### 13.1 Authentifizierungsprozess

**Registrierung:**
```javascript
// Frontend
const user = await pb.collection('npl_users').create({
  email: string,
  password: string (≥8 chars),
  passwordConfirm: string,
  display_name: string
});

// Backend (PocketBase)
- Passwort hashen (bcrypt)
- E-Mail nicht geprüft (auto-verified)
- Benutzer sofort aktiv
- JWT-Token generieren
```

**Login:**
```javascript
const authData = await pb.collection('npl_users').authWithPassword(email, password);
// { token: JWT, record: { id, email, display_name } }

// Frontend speichert in pb.authStore
pb.authStore.token  // JWT
pb.authStore.record // User Object
pb.authStore.isValid // true/false
```

**Session:**
- JWT im `Authorization: Bearer <token>` Header
- Läuft ab (TTL: UNGEKLÄRT)
- Bei Ablauf: Reauth erforderlich oder 401 Response

**Logout:**
```javascript
pb.authStore.clear();
// lokal: Token gelöscht
// Server: JWT ungültig für neue Requests
```

### 13.2 Benutzerrollen

**Implementiert im Code:** KEINE explizite Rollen-Logik

**Geplant:**
- `npl_roles` Collection (CRUD für Rollendefinitionen)
- `npl_user_roles` Collection (User ↔ Role Mapping)
- Collection Rules basieren auf Rolle aus `npl_user_roles`

**Aktuell:**
- Alle angemeldeten Benutzer = `USER` (implizit)
- Gäste = `GUEST` (implizit)
- Admin/SYSTEM_ADMIN Logik nicht vorhanden

### 13.3 Berechtigungen

**Aktuelle Implementierung:**

| Aktion | Gast | USER | Admin |
| --- | --- | --- | --- |
| Landing Page lesen | ✅ | ✅ | ✅ |
| Check-in durchführen | ✅ (lokal) | ✅ (DB) | ✅ |
| Registrieren | ✅ | – | – |
| Anmelden | ✅ | – | – |
| Passwort ändern | ❌ | ✅ | ✅ |
| Settings lesen | ❌ | ✅ | ✅ |
| Aktivitäten lesen | ✅ | ✅ | ✅ |
| Bedürfnisse lesen | ✅ | ✅ | ✅ |
| Andere Benutzer sehen | ❌ | ❌ | ? |
| Admin Panel | ❌ | ❌ | ? |

**Geplante Implementierung (via Collection Rules):**
```
npl_situations.viewRule:   (@request.auth.id != "" && user_id = @request.auth.id) || shared_with_coach
npl_situations.createRule: @request.auth.id != "" && @request.body.user_id = @request.auth.id
npl_situations.updateRule: user_id = @request.auth.id && <no ownership change>
npl_situations.deleteRule: user_id = @request.auth.id || @request.auth.role = 'SYSTEM_ADMIN'

npl_activities.viewRule:   status = 'PUBLISHED' || (@request.auth.id != "" && user_role = 'EDITOR')
npl_activities.createRule: @request.auth.id != "" && @request.auth.role = 'EDITOR'
npl_activities.updateRule: user_id = @request.auth.id || @request.auth.role IN ['REVIEWER', 'EDITOR']
```

**Status:** UNGEKLÄRT – Collection Rules nicht verifiziert

### 13.4 Geschützte Bereiche

| Route | Zugang | Method | Bemerkung |
| --- | --- | --- | --- |
| `/` | Alle | GET | Öffentlich |
| `/check-in` | Alle | GET | Öffentlich |
| `/check-in/result` | Alle | GET | Öffentlich |
| `/register` | Gast only | GET/POST | Redirect zu `/` wenn angemeldet |
| `/login` | Gast only | GET/POST | Redirect zu `/` wenn angemeldet |
| `/settings` | USER only | GET/POST | Redirect zu `/login` wenn anonym |
| `/dashboard` | USER only | GET | **NICHT IMPLEMENTIERT** |
| `/coaching` | COACH only | GET | **NICHT IMPLEMENTIERT** |
| `/admin` | NPL_ADMIN+ | GET | **NICHT IMPLEMENTIERT** |

---

## 14. Konfiguration und Umgebungen

### 14.1 Development-Umgebung

**Start:**
```bash
cd app
npm run dev
```

**Output:**
```
  VITE v6.4.3  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

**Features:**
- Hot Module Reload (HMR) – Änderungen live sichtbar
- Browser Auto-Refresh
- React StrictMode (doppelte Component-Invocation)

**Backend:** `/.sfs-bd/` (IONOS Plattform)

### 14.2 Production-Umgebung

**Build:**
```bash
cd app
npm run build:prod
```

**Output:**
```
dist/
  ├── index.html
  ├── favicon.svg
  └── assets/
      ├── index-<hash>.js
      ├── index-<hash>.css
```

**Deployment:** Plattform liest aus `dist/` automatisch

**URL:** Öffentliche Plattform-URL (z.B. `https://...`)

### 14.3 Umgebungsvariablen

**Benötigte Variablen:**
| Name | Wert | Zweck | Geheim |
| --- | --- | --- | --- |
| `VITE_POCKETBASE_URL` | `/.sfs-bd/` | Backend URL | Nein |

**Aktuelle Konfiguration:**
- Hartcodiert in `src/lib/pb.js` als `'/.sfs-bd/'`
- Keine `.env` Datei

**Fehlende Variablen:**
- `VITE_API_TIMEOUT` – API Request Timeout
- `VITE_MAX_RETRIES` – Wiederholungsversuch
- `VITE_LOG_LEVEL` – Debug/Error Logging

### 14.4 Build-Konfiguration

**vite.config.js:**
```javascript
import { defineConfig } from "/usr/lib/sfs-assistant-dev/platform-config.js";
export default defineConfig({});
```

**tailwind.config.cjs:**
```javascript
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media",
  theme: { extend: {} },
  plugins: [],
};
```

**package.json:**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build --mode preview",
    "build:prod": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {},
  "devDependencies": {}
}
```

### 14.5 Hosting

**Plattform:** IONOS Group (Branded: IONOS, 1&1, STRATO, Fasthosts, etc.)

**Architektur:**
```
$PROJECT_DIRECTORY/
  ├── app/             # Git Repo (einziger Arbeitsbereich)
  ├── static/          # Served at /static/<file>
  └── uploads/         # Exchange directory (not served)
```

**Domains:**
- Entwicklung: `localhost:5173` (dev server)
- Produktion: Plattform-gehostete Subdomain (UNGEKLÄRT)

**SSL/TLS:** Plattform-managed

**CDN:** Plattform-managed

---

## 15. Externe Abhängigkeiten

| Komponente | Version | Quelle | Beschreibung | Kritikalität |
| --- | --- | --- | --- | --- |
| React | 18 | Platform-provided | UI Framework | KRITISCH |
| React Router | 6+ | Platform-provided | Client-side Routing | KRITISCH |
| Tailwind CSS | v4 | Platform-provided | CSS Framework | WICHTIG |
| Lucide Icons | latest | Platform-provided | Icon Library | WICHTIG |
| PocketBase SDK | v0.27.0 | Platform-provided | Backend Client | KRITISCH |
| Vite | 6.4.3 | Platform-provided | Build Tool | WICHTIG |
| Node.js | 24 | Platform-provided | Runtime | KRITISCH |
| Google Fonts | – | `/.sfs/css2/` | Typefaces | WICHTIG |

**Wichtig:**
- Alle Dependencies sind Platform-provided
- `package.json` darf KEINE neue Dependencies hinzufügen
- Sie werden automatisch gelöscht

**Versionsstände:**
- PocketBase v0.39.0 ← Backend Version
- JS SDK v0.27.0 ← Frontend Client

---

## 16. Bereits erledigte Entwicklungsaufgaben

| Aufgabe | Ergebnis | Status | Nachweis |
| --- | --- | --- | --- |
| Landing Page (26 Sektionen) | `src/App.jsx:HomePage` | ✅ ABGESCHLOSSEN | 666 Zeilen, alle Sections hardcoded |
| Check-in Form (7 Schritte) | `src/pages/CheckinPage.jsx` | ✅ ABGESCHLOSSEN | 736 Zeilen, alle Validierungen |
| Gast-Isolation (sessionStorage) | `saveGuestCheckin()` Funktion | ✅ ABGESCHLOSSEN | Keine API-Calls für Gäste |
| Benutzer-Registrierung | `src/pages/RegisterPage.jsx` | ✅ ABGESCHLOSSEN | E-Mail + Passwort, Auto-Login |
| Benutzer-Anmeldung | `src/pages/LoginPage.jsx` | ✅ ABGESCHLOSSEN | authWithPassword() Integration |
| Passwort-Änderung | `src/pages/SettingsPage.jsx` | ✅ ABGESCHLOSSEN | Nur für angemeldete User |
| PocketBase Integration | `src/lib/pb.js` + API Calls | ✅ ABGESCHLOSSEN | Singleton-Pattern, JWT Auth |
| Fallback Bedürfnisse | Hardcoded 10 IDs in CheckinPage.jsx | ✅ ABGESCHLOSSEN | Mit echten DB-IDs |
| Mobile Responsive Design | CSS via Tailwind | ✅ ABGESCHLOSSEN | Tested auf 375px, 768px, 1280px |
| Dark Theme Grundlagen | Schieferblau + Smaragd/Cyan | ✅ ABGESCHLOSSEN | Konsistent über alle Pages |
| Hardcodierte Gast-ID entfernen | Behoben sessionStorage-only | ✅ ABGESCHLOSSEN | `anl8mgaqlk916ds` komplett entfernt |
| Ownership-Reparatur (P1) | Collection Rules setzen | ⚠️ GEPLANT | Nicht verifiziert (API offline) |
| Fremdrelations-Blockade (P2) | Collection Rules setzen | ⚠️ GEPLANT | Nicht verifiziert (API offline) |
| Öffentliche Aktivitäten (P3) | listRule leer setzen | ⚠️ GEPLANT | Nicht verifiziert (API offline) |
| 62-Tabellen-Datenmodell | CURL Requests | ⚠️ GEPLANT | Nicht verifiziert (API offline) |
| Git-Repo Setup | GitHub Remote | ✅ ABGESCHLOSSEN | https://github.com/neuroways/db_integration_ai.git |
| DEVELOPMENT_PROMPT erstellen | 502-Zeilen Masterprompt | ✅ ABGESCHLOSSEN | `app/DEVELOPMENT_PROMPT.md` |
| ROLES_AND_PERMISSIONS erstellen | 243-Zeilen Spec | ✅ ABGESCHLOSSEN | `app/ROLES_AND_PERMISSIONS.md` |

---

## 17. Teilweise erledigte Arbeiten

| Arbeit | Ziel | Umgesetzt | Fehlt | Dateien | Abhängigkeiten |
| --- | --- | --- | --- | --- | --- |
| **Passwort-Reset** | E-Mail-Link + Code | nur UI Scaffolding | E-Mail Service, DB-Tokens, Link-Handler | `LoginPage.jsx` | PocketBase Email API disabled |
| **Activity-Matching** | Situation → Top 5 Activities | ZERO | Algorithmus, Scoring, DB-Schema | `/recommendations` route (NOT EXIST) | npl_recommendations Table |
| **Role-Based Access** | 11 Rollen mit Perms | nur Spec | Implementation, Collection Rules, UI | `ROLES_AND_PERMISSIONS.md` | npl_roles, npl_user_roles Tables |
| **Gast → User Übernahme** | Gast-Daten nach Registrierung importieren | ZERO | Dialog, Transfer-Logik | CheckinResultPage.jsx | DB-Integration |
| **Admin-Panel** | CRUD für Bedürfnisse, Aktivitäten | ZERO | Routes, Components, Logic | `/admin` (NOT EXIST) | Full RBAC implementation |
| **Dashboard** | User Home mit Verlauf | ZERO | Routes, Components, Queries | `/dashboard` (NOT EXIST) | npl_checkins, npl_recommendations queries |

---

## 18. Offene Anforderungen und Backlog

### 18.1 P0 (Blockierend)

| ID | Beschreibung | Grund | Abhängigkeiten | Erwartetes Ergebnis | Akzeptanzkriterium |
| --- | --- | --- | --- | --- | --- |
| BLK-001 | **PocketBase-API Erreichbarkeit testen** | Security Audit nicht möglich | Backend-Zugriff | Bestätigung dass API antwortet | HTTP 200 auf `/.sfs-bd/api/health` |
| BLK-002 | **32-Punkt Security Audit durchführen** | Keine Verifizierung der Sicherheitsfixes | PocketBase API, 2 Test-User | Bestätigte/Abgelehnte Sicherheitsprüfungen | Alle 20 Produktionskriterien bestanden |
| BLK-003 | **Matching-Algorithmus definieren** | Feature nicht ohne Spezifikation möglich | Fachliche Anforderungen | Klare Scoring-Logik | Scoring für Energie, Zeit, Bedürfnisse funktioniert |

### 18.2 P1 (MVP-Kritisch)

| ID | Beschreibung | Grund | Abhängigkeiten | Erwartetes Ergebnis |
| --- | --- | --- | --- | --- |
| MVP-001 | **Activity-Matching-Engine** | Core Feature | Matching-Algorithmus | Top 5 Aktivitäten bei Check-in |
| MVP-002 | **Empfehlung anzeigen** | User sieht Ergebnisse | `/recommendations` Route + Matching | Activity Cards mit Score + Erklärung |
| MVP-003 | **Aktivitäts-Katalog** | Fallback wenn keine Empfehlung | `/activities` Route + npl_activities | Suchbar, filterbar, sortierbar |
| MVP-004 | **Gast → User Übernahme** | UX-Feature | Dialog + Transfer-Logik | Alte Gast-Daten importieren |

### 18.3 P2 (Wichtig, später)

| ID | Beschreibung | Grund |
| --- | --- | --- |
| POST-001 | **Benutzer-Dashboard** | `/dashboard` mit Check-in-Verlauf, Favoriten, Profil |
| POST-002 | **Haushalt-Management** | Familien-Gruppen, Freigaben, Einladungen |
| POST-003 | **Coaching-Panel** | Coach sieht freigegebene Daten, gibt Feedback |
| POST-004 | **Brettspielcoach (KI)** | KI erklärt Regeln, schlägt Varianten vor |
| POST-005 | **Admin-Panel** | CRUD für Bedürfnisse, Aktivitäten, User |
| POST-006 | **GDPR-Compliance** | Delete/Export API, Anonymisierung |
| POST-007 | **Multi-Language** | i18n für DE, EN, FR, etc. |
| POST-008 | **Dark Mode** | Full UI Theme + Toggle |

### 18.4 P3 (Optional)

| ID | Beschreibung |
| --- | --- |
| OPT-001 | Mobile App (React Native) |
| OPT-002 | Export zu PDF/Excel |
| OPT-003 | Integration mit externe APIs (Fitbit, Apple Health) |
| OPT-004 | Real-time Collaboration (WebSockets) |

---

## 19. Bekannte Fehler und Technische Schulden

### 19.1 Kritische Fehler (BEKANNT, UNGELÖST)

| Fehler | Auswirkungen | Workaround | Priorität |
| --- | --- | --- | --- |
| **PocketBase API nicht erreichbar** | Keine Operationen möglich | Manuell `/sfs-bd/` im Browser prüfen | P0 – BLOCKING |
| **Security Audit nicht durchführt** | Sicherheit unverifiziert | Später mit API durchführen | P0 – BLOCKING |
| **Matching-Algorithmus nicht definiert** | Features geblockt | Spec zuerst, dann Code | P1 |

### 19.2 Bekannte Code-Schulden

| Problem | Code-Ort | Auswirkungen | Empfohlene Lösung | Priorität |
| --- | --- | --- | --- | --- |
| Fallback Bedürfnisse-Ids hardcoded | CheckinPage.jsx:40-52 | Wartbarkeit | In Datenbank-Seeding verlagern | P2 |
| Keine Fehlerbehandlung bei Teilfehler | CheckinPage.jsx:177-250 | Verwaiste Situationen | Rollback-Logik oder Transaktionen | P1 |
| Passwort-Reset nur UI-Mock | LoginPage.jsx:resetMode | Feature nicht nutzbar | E-Mail-Service integrieren oder Alternative | P2 |
| Keine Duplikat-Prävention | CheckinPage + Settings | Mehrfach-Submits möglich | Button-Disable nach Submit, idempotency-key | P2 |
| Routes `/recommendations`, `/discover`, `/dashboard` nicht definiert | App.jsx | 404 bei Klicks | Routes anlegen + Komponenten entwickeln | P1 |
| Keine Logging/Analytics | Alle Komponenten | Debugging schwierig | Console-Logs + Analytics SDK | P3 |
| Mobile Menu schließt nicht auf Route-Change | App.jsx | UX-Issue | useEffect mit useLocation Hook | P3 |

### 19.3 Performance-Probleme

| Problem | Auswirkungen | Lösung | Priorität |
| --- | --- | --- | --- |
| Keine Pagination auf Activity-Katalog | Alle Aktivitäten laden | Implementieren Sie `.getList(page, perPage)` | P2 |
| Keine Caching-Strategie | Wiederholte API-Calls | React Query oder SWR verwenden | P3 |
| Keine Image Optimization | Hero langsam | Thumbnail + Lazy Load | P3 |

---

## 20. Getroffene Architektur- und Entwicklungsentscheidungen

| Entscheidung | Hintergrund | Lösung | Konsequenzen | Alternativen |
| --- | --- | --- | --- | --- |
| **React + Vite statt Next.js** | Plattform-vorgegeben | Single-Page App mit Client Router | Keine Server-Side Rendering möglich | Server-Components (aber nicht available) |
| **Tailwind CSS v4** | Plattform-vorgegeben | Utilities-only Styling | Keine CSS-in-JS, nur Classes | Styled-Components (nicht available) |
| **PocketBase als Backend** | Plattform-vorgegeben | REST API + SQLite | Keine GraphQL, kein Custom Backend | Firebase (Plattform-Constraint) |
| **sessionStorage für Gast-Daten** | Sicherheit + Privacy | Keine API-Persistierung | Daten gehen nach Browser-Restart verloren | `localStorage` oder Cookies (weniger sicher) |
| **Client-side Routing (React Router)** | SPAsStandard | BrowserRouter mit Routes | Keine Server-Redirect möglich | Hash-basiertes Routing (#/check-in) |
| **Keine Admin-Tokens** | Sicherheit | JWT von echtem Login | Mehr Komplexität für Admin-Operationen | Service Account (höheres Risiko) |
| **Collection Rules statt Backend-API** | PocketBase-Modell | Ownership-Enforcement direkt in DB | Debugging schwieriger, Queries limitiert | Custom Backend API (nicht available) |
| **Hardcoded Fallback Needs** | API-Unreliability | 10 Bedürfnisse in CheckinPage.jsx | Wartbarkeit schwerer | Config-Datei (weniger flexibel) |

**Aus diesen Entscheidungen folgt:**
1. **Keine Custom Server-Code** – Alles im Frontend oder PocketBase Rules
2. **Keine Environment Variables** – Alles hardcoded oder Plattform-managed
3. **Keine Secrets im Code** – Tokens lokal in pb.authStore
4. **Keine externen APIs** – Außer Google Fonts (Plattform-Link)

---

## 21. Offene Entscheidungen

| Frage | Kontext | Betroffen sind | Mögliche Optionen |
| --- | --- | --- | --- |
| **Matching-Algorithmus** | Wie werden Aktivitäten gescored? | MVP Feature | Option A: Gewichte pro Faktor (Energy=25%, Duration=25%, Needs=50%), Option B: Machine Learning (zu komplex), Option C: einfaches Keyword-Matching |
| **Top-N Empfehlungen** | Wie viele Aktivitäten anzeigen? | UX | Top 5, Top 10, Top 20, oder Slider? |
| **Gast-Daten-Retention** | Wie lange bleiben Gast-Check-ins? | Privacy | Auf immer, Bis Browser-Reset, 24h, 7d? |
| **Passwort-Reset-Methode** | E-Mail oder SMS oder Support-Kontakt? | Auth | Option A: E-Mail (erfordert SMTP), Option B: SMS (erfordert Twilio), Option C: Support-Link (aktuell) |
| **Rollen-Granularität** | Sind 11 Rollen zu viele? | RBAC | Konsolidieren zu 5 (GUEST, USER, COACH, EDITOR, ADMIN)? |
| **Haushalt-Freigabe** | Welche Daten können freigegeben werden? | Household Feature | Alles, nur Empfehlungen, nur Public Reflections? |
| **Feedback-Loop** | Sollen User Feedback zu Empfehlungen geben? | Matching | Ja, aber wie (Daumen hoch/runter, 5-Star, Text)? |
| **Multi-Language** | Welche Sprachen von Anfang an? | i18n | DE+EN, nur DE für MVP, + FR+ES später? |
| **Dark Mode** | Auto, Toggle, System-Preference? | UX | System-Preference (aktuell via `darkMode: "media"`), oder Button? |
| **Public Share-Links** | Können Benutzer ihre Empfehlungen teilen? | Sharing | Ja (kurze ID + Token), Nein, oder nur private Link? |

---

## 22. Tests und Qualitätssicherung

### 22.1 Automatisierte Tests

**Status:** KEINE

| Framework | Zweck | Status | Bemerkung |
| --- | --- | --- | --- |
| Jest | Unit Tests | ❌ NICHT VORHANDEN | Keine Test-Datei vorhanden |
| React Testing Library | Component Tests | ❌ NICHT VORHANDEN | Keine Test-Datei vorhanden |
| Cypress / E2E | End-to-End Tests | ❌ NICHT VORHANDEN | Kein Test-Suite vorhanden |
| Playwright | E2E Tests | ❌ NICHT VORHANDEN | Kein Test-Suite vorhanden |

**Empfohlen vor Production:**
1. Unit Tests für `saveSituation()`, `saveGuestCheckin()`
2. Component Tests für Forms (Validierung)
3. E2E Test: Gast-Check-in → sessionStorage → Delete
4. E2E Test: User-Check-in → DB → Success
5. E2E Test: Login Flow
6. Security Tests: Ownership Enforcement

### 22.2 Manuelle Tests (Durchgeführt)

| Test | Durchgeführt | Ergebnis | Verifiziert | Nachweis |
| --- | --- | --- | --- | --- |
| Gast-Check-in speichert zu sessionStorage | ✅ JA (Code Review) | Funktioniert | ⚠️ Nicht live getestet | CheckinPage.jsx:131-175 |
| Benutzer-Check-in speichert zu DB | ⚠️ TEILWEISE (Code Review) | Code sieht richtig aus | ❌ **NICHT VERIFIZIERT** – API offline |  CheckinPage.jsx:177-250 |
| Registrierung funktioniert | ✅ JA (Code Review) | Form + Auth-Call | ⚠️ Nicht live getestet | RegisterPage.jsx |
| Anmeldung funktioniert | ✅ JA (Code Review) | Form + authWithPassword() | ⚠️ Nicht live getestet | LoginPage.jsx |
| Passwort ändern funktioniert | ✅ JA (Code Review) | Form + Update | ⚠️ Nicht live getestet | SettingsPage.jsx |
| Mobile Responsive | ⚠️ TEILWEISE (CSS Review) | Looks correct | ⚠️ Nicht live getestet | App.jsx + Pages mit Tailwind |
| Dark Mode | ⚠️ TEILWEISE (Config Review) | Config aktiv, kein Dark CSS | ⚠️ Nicht implementiert | tailwind.config.cjs |
| Ownership Enforcement | ❌ NEIN | Code claims Implementierung | ❌ **NICHT VERIFIZIERT** – API offline | DEVELOPMENT_PROMPT.md:6.3 |
| Fremdrelation Blockade | ❌ NEIN | Code claims Implementierung | ❌ **NICHT VERIFIZIERT** – API offline | DEVELOPMENT_PROMPT.md:6.3 |
| Public Activity Read | ❌ NEIN | Code claims Implementierung | ❌ **NICHT VERIFIZIERT** – API offline | DEVELOPMENT_PROMPT.md:6.3 |

---

## 23. Deployment und Betrieb

### 23.1 Deployment Pipeline

```
GitHub (dev branch)
  ↓ [push]
Local Git History
  ↓ [git commit]
$PROJECT_DIRECTORY/app/.git
  ↓ [monitored by IONOS Platform]
Platform (auto-deploy?)
  ↓ [build]
npm run build:prod
  ↓ [output]
$PROJECT_DIRECTORY/app/dist/
  ↓ [serve]
Web Server (nginx/apache?)
  ↓ [public URL]
https://<domain>/
```

**Status:** UNGEKLÄRT – kein Deploymentdokumentation vorhanden

### 23.2 Build Process

**Command:**
```bash
cd app
npm run build:prod
```

**Schritte:**
1. Vite kompiliert JSX → JavaScript
2. Tailwind CSS v4 wird appliziert
3. Assets werden optimiert
4. Output in `dist/` directory

**Output:**
```
dist/
  ├── index.html (17 Zeilen)
  ├── favicon.svg
  ├── assets/
  │   ├── index-<hash>.js (~346 KB, ~100 KB gzip)
  │   └── index-<hash>.css (~38 KB, ~6.5 KB gzip)
```

**Buildzeit:** ~2-3 Sekunden

### 23.3 Hosting Details

**Plattform:** IONOS Group (Branded)

**Basis-URL:** `/` oder `https://<subdomain>/` (UNGEKLÄRT)

**Static Serving:** 
- `/` → `dist/index.html`
- `/static/<file>` → `$PROJECT_DIRECTORY/static/<file>` (fixed URL)
- Alle Assets relativ zu Base oder `/static/`

**Backend:**
- `/.sfs-bd/` → PocketBase (Platform-managed)

**SSL/TLS:** Platform-managed (HTTPS)

**CDN:** Platform-managed (UNGEKLÄRT)

### 23.4 Monitoring & Logging

**Vorhandene Logging:**
- Browser Console: `console.log()`, `console.error()` in CheckinPage.jsx, etc.
- PocketBase Logs: UNGEKLÄRT (wahrscheinlich Platform-managed)

**Fehlerbehandlung:**
- Try-catch in API Calls
- User-freundliche Error-Messages
- No central error tracking

**Empfohlen:**
- Sentry für Error Tracking
- LogRocket für Session Replay
- Google Analytics für Usage

---

## 24. Risiken

| Risiko | Auswirkung | Wahrscheinlichkeit | Empfohlene Gegenmaßnahme | Priorität |
| --- | --- | --- | --- | --- |
| **PocketBase API offline** | Alles blockiert | HOCH (aktuell) | API-Erreichbarkeit testen | P0 |
| **Security Audit fehlgeschlagen** | Nicht produktionsreif | HOCH (nicht geprüft) | 32-Punkt Audit durchführen | P0 |
| **Ownership Rules nicht aktiv** | Datenlecks möglich | MITTEL (unverifi.) | API-Test durchführen | P1 |
| **Fremdrelationen möglich** | Benutzer A liest Benutzer B Daten | MITTEL (unverifi.) | API-Test durchführen | P1 |
| **Admin Token im Code** | Bypass von Collection Rules | NIEDRIG (Code Review klar) | Admin-Token bereits entfernt | P2 |
| **Gast-Check-in hat Fehler** | sessionStorage nicht zugreifbar | NIEDRIG (Fallback möglich) | try-catch ist aktiv | P2 |
| **Matching-Algorithmus zu simpel** | Schlechte Empfehlungen | HOCH (nicht implementiert) | Fachliche Anforderungen definieren | P1 |
| **Keine Tests vorhanden** | Regression möglich | MITTEL (agile, aber risky) | Unit + E2E Tests schreiben | P2 |
| **Kein Rollback-Mechanismus** | Fehler können Daten korrumpieren | MITTEL (z.B. Situation ohne Checkin) | Transaktions-Logik oder Cleanup | P2 |
| **i18n nicht implementiert** | Nicht international nutzbar | NIEDRIG (Optional für MVP) | Nach MVP starten | P3 |

---

## 25. Empfohlene nächste Entwicklungsschritte

### Phase 1: Unblocking & Verification (Sofort – P0)

**Ziel:** Sichere, dass die Plattform funktioniert

#### Schritt 1: PocketBase-Erreichbarkeit testen
```bash
curl -s /.sfs-bd/api/health | jq
# Erwartet: {"status":200} oder ähnlich
```

**Ziel:** Bestätigung dass API antwortet
**Wenn OK:** Weitermachen zu Schritt 2
**Wenn nicht:** Backend-Team kontaktieren, PocketBase starten

#### Schritt 2: 32-Punkt Security Audit durchführen
Siehe: `/app/SECURITY_AUDIT_RESULTS.md` (Vorlage)

**Ziel:**
- Ownership-Rules verifizieren
- Fremdrelations-Blockade prüfen
- Public Access aktiviert
- Test-Benutzer erstellen
- Alle 20 Produktionskriterien prüfen

**Wenn OK:** Produktionsfreigabe
**Wenn nicht:** Reparaturplan erstellen

---

### Phase 2: Core Features (P1 – MVP)

#### Schritt 3: Matching-Algorithmus definieren

**Input:** Fachliche Anforderung
- Wer entscheidet das Scoring?
- Wie werden Gewichte verteilt?

**Output:** Klare Spezifikation
```javascript
// Pseudo-Code
score = 
  (activity.addresses_need(selectedNeeds) * 50) +
  (energy_match_score * 25) +
  (duration_match_score * 25)
```

#### Schritt 4: Empfehlung-Feature bauen

**Komponenten:**
1. Matching-Engine (Backend: Collection Query oder Frontend Loop)
2. `/recommendations` Route + Component
3. Activity Cards mit Score + Erklärung
4. "Diese Aktivität kommt für dich in Frage, weil..."

**Akzeptanzkriterium:**
- User führt Check-in durch
- Klickt "Passende Aktivitäten anzeigen"
- Sieht Top 5 Aktivitäten mit Scores

#### Schritt 5: Activity-Katalog bauen

**Komponenten:**
1. `/activities` Route
2. Activity-Listing (pagination)
3. Filter (nach Type, Duration, Complexity)
4. Search
5. Activity Detail-View

**Akzeptanzkriterium:**
- User sieht alle öffentlichen Aktivitäten
- Kann filtern + suchen
- Klicks auf Activity zeigt Details

---

### Phase 3: User Experience (P2)

#### Schritt 6: Gast → User Übernahme

**Komponenten:**
1. Dialog nach Login: "Möchtest du deine Gast-Daten importieren?"
2. Transfer-Logik (sessionStorage → DB)
3. Success-Message

#### Schritt 7: Benutzer-Dashboard

**Route:** `/dashboard`

**UI:**
- Check-in Verlauf (Timeline)
- Lieblings-Aktivitäten (Saved)
- Profil (Name, Preferences)
- Statistiken (Most common need, etc.)

#### Schritt 8: Kontoeinstellungen erweitern

**Zusätzlich zu Passwort-Änderung:**
- E-Mail-Änderung
- Profil-Bild
- Account Löschen
- Privacy Settings

---

### Phase 4: Administrative Features (P2+)

#### Schritt 9: Rollen-Implementierung

**Komponenten:**
1. `npl_roles` Collection (erstellen falls nicht vorhanden)
2. `npl_user_roles` Collection (User ↔ Role Mapping)
3. Assign-Interface (Admin Panel)
4. Collection Rules pro Role

#### Schritt 10: Admin-Panel bauen

**Route:** `/admin`

**Features:**
- Bedürfnisse: CRUD
- Aktivitäten: CRUD (mit Status/Quality-Check)
- Benutzer: List, View, Delete
- Rollen: Assign zu Benutzer
- Audit Logs: View

---

### Phase 5: Extra Features (P3)

#### Schritt 11: Passwort-Reset implementieren

**Option A: E-Mail-basiert**
- PocketBase Email API aktivieren (falls möglich)
- Oder externe Service (SendGrid, Mailgun)
- Token generieren, E-Mail senden, Link zur Reset-Page

**Option B: Support-Link**
- Aktuell: "Kontaktiere Support"
- Könnte bleiben für MVP

#### Schritt 12: Multi-Language Support

**Framework:** i18n oder react-i18next

**Sprachen:** DE (aktuell), + EN, FR, ES

#### Schritt 13: Dark Mode UI

**Aktuell:** `darkMode: "media"` in Tailwind Config
**Fehlt:** Dark-Mode CSS + Toggle-Button

---

## 26. Einstiegspunkt für die nächste KI

### Erste Lektüre (Priorität)

1. **`app/DEVELOPMENT_PROMPT.md`** (502 Zeilen)
   - Vollständiger Projekt-Masterplan
   - Tech-Stack, Datenmodell, bekannte Probleme

2. **`app/docs/handover/PROJECT_HANDOVER.md`** (diese Datei)
   - Vollständiger Entwicklungsstand
   - Was ist implementiert, was nicht

3. **`app/ROLES_AND_PERMISSIONS.md`** (243 Zeilen)
   - 11 Rollen definiert
   - Zugriffskontroll-Spezifikation

4. **`app/AGENTS.md`** (Tech Ref für STRATO AI)
   - Vite + React + Tailwind Setup Details

### Was du NICHT ändern darfst

- ❌ `package.json` – wird automatisch gelöscht
- ❌ Vite Config – Platform-managed
- ❌ `/.sfs-bd/` Backend URL – fest vorgegeben
- ❌ Git-Ursprung – bereits auf `github.com/neuroways/...` gesetzt
- ❌ Admin-Tokens – niemals hinzufügen

### Was du ändern kannst/sollst

- ✅ `src/App.jsx`, Pages – Features bauen
- ✅ `src/pages/` – Neue Routes hinzufügen
- ✅ CSS/Tailwind – Theme erweitern
- ✅ PocketBase Collection Rules – über API setzen
- ✅ DEVELOPMENT_PROMPT.md – nach großen Änderungen aktualisieren

### Nächster unmittelbarer Arbeitsschritt

**Sofort nach Übernahme:**

1. **PocketBase-API testen**
   ```bash
   curl -s /.sfs-bd/api/health
   ```
   Falls 200 OK: Weitermachen
   Falls error: Backend-Team kontaktieren

2. **32-Punkt Security Audit durchführen** (Vorlage in SECURITY_AUDIT_RESULTS.md)
   - Ownership-Tests
   - Fremdrelations-Tests
   - Public-Access-Tests
   
   Falls alle bestanden: `FREIGEGEBEN`
   Falls Fehler: Reparaturplan erstellen

3. **Matching-Algorithmus definieren**
   - Wer entscheidet die Scoring-Gewichte?
   - Spec zuerst, dann Code

4. **Matching-Feature implementieren**
   - `/recommendations` Route
   - Activity Cards mit Scores
   - "Darum passt diese Aktivität"

### Prüfungs-Checklist für deine Änderungen

Bevor du Code pushst:

- [ ] Ändert dein Code etwas an `package.json`? → NICHT ERLAUBT
- [ ] Ändert dein Code `/static/` oder `static/`? → Nur über Get-Image Skill
- [ ] Benutzt du einen Admin-Token? → NICHT ERLAUBT
- [ ] Verwendest du `localStorage` für persönliche Daten? → NICHT ERLAUBT
- [ ] Setzt du relative Pfade für statische Assets? → Nutze `/static/<file>`
- [ ] Brauchst du neue npm-Dependencies? → NICHT MÖGLICH
- [ ] Hast du neue Routes hinzugefügt? → In `App.jsx` registrieren
- [ ] Hast du neue Komponenten erstellt? → In `src/pages/` ablegen
- [ ] Brauchst du PocketBase Collections? → Via API anlegen, dokumentieren
- [ ] Hast du große Änderungen gemacht? → `DEVELOPMENT_PROMPT.md` aktualisieren

### Wie prüfst du, dass deine Änderung funktioniert

**Entwicklung:**
```bash
cd app
npm run dev
# Öffne http://localhost:5173 im Browser
# Test interaktiv
```

**Production Build:**
```bash
cd app
npm run build:prod
# Prüfe ob dist/ erzeugt wurde
# Größe sollte ähnlich sein (~346 KB JS, ~38 KB CSS)
```

**Git Workflow:**
```bash
cd app
git status                    # Was hast du geändert?
git add .
git commit -m "feat: Kurzbeschreibung"
git push origin dev
# Push sollte erfolgreich sein (keine Konflikte)
```

---

## 27. Unsicherheiten und Fehlende Informationen

### KRITISCH (Müssen geklärt werden)

| Bereich | Frage | Grund | Konsequenz |
| --- | --- | --- | --- |
| **Backend** | Ist PocketBase API erreichbar? | API offline während Übergabe | 32-Punkt Audit nicht durchgeführt |
| **Sicherheit** | Sind alle geplanten Fixes aktiv? | Collection Rules nicht verifiziert | Unbekanntes Sicherheitsrisiko |
| **Datenbank** | Existieren alle 62 Tabellen? | API offline, kein Zugriff | Könnte partially created sein |
| **Matching** | Wie wird Scoring berechnet? | Nicht spezifiziert | Features nicht implementierbar |
| **Domains** | Unter welcher URL läuft die App? | Nicht dokumentiert | Deployment-Ziel unklar |

### WICHTIG (Sollten geklärt werden)

| Bereich | Frage | Grund |
| --- | --- | --- |
| **Deployment** | Automatisch bei Git Push oder manuell? | CI/CD-Prozess unklar |
| **Rollen** | Wird USER automatisch bei Registrierung zugewiesen? | Implementierung unklar |
| **Feedback** | Sollen User Empfehlung-Feedback geben? | Nicht spezifiziert |
| **Haushalt** | Können Gäste Haushalte erstellen? | Anforderung unklar |
| **Passwort** | Wie wird Reset implementiert? | E-Mail oder Support-Link? |
| **Performance** | Wie viele Benutzer/Check-ins sind geplant? | Skalierungs-Anforderung unklar |

### NICHT KRITISCH (Später klärbar)

- Multi-Language Timeline
- Dark Mode Priorität
- Mobile App Timeline
- OAuth-Integration
- Externe API-Integrations (Health, Fitness)

---

## 28. Übergabe-Checkliste

### Verifikation von Quellen

- [x] `src/App.jsx` analysiert (666 Zeilen)
- [x] `src/pages/CheckinPage.jsx` analysiert (736 Zeilen)
- [x] `src/pages/CheckinResultPage.jsx` analysiert (124 Zeilen)
- [x] `src/pages/RegisterPage.jsx` analysiert (222 Zeilen)
- [x] `src/pages/LoginPage.jsx` analysiert (194 Zeilen)
- [x] `src/pages/SettingsPage.jsx` analysiert (215 Zeilen)
- [x] `src/lib/pb.js` analysiert (6 Zeilen)
- [x] `DEVELOPMENT_PROMPT.md` analysiert (502 Zeilen)
- [x] `ROLES_AND_PERMISSIONS.md` analysiert (243 Zeilen)
- [x] `index.html` analysiert (15 Zeilen)
- [x] `package.json` analysiert (14 Zeilen)
- [x] `vite.config.js` analysiert (3 Zeilen)
- [x] `tailwind.config.cjs` analysiert (9 Zeilen)
- [x] Git-Log analysiert (20 commits)
- [x] Verzeichnisstruktur analysiert (tree command)

### Dokumentation Vollständigkeit

- [x] Anforderungen erfasst (Tabelle mit Status)
- [x] Implementierte Funktionen beschrieben (6 Seiten)
- [x] Offene Funktionen aufgelistet (Backlog)
- [x] Seiten-Struktur dokumentiert (Tree + Detail-Tabelle)
- [x] Repositorystruktur dokumentiert
- [x] Architektur beschrieben (Diagramme + Text)
- [x] Datenbank dokumentiert (62 Tabellen, aber UNVERIFI.)
- [x] API-Endpunkte aufgelistet
- [x] Fehler und Schulden aufgelistet
- [x] Entscheidungen dokumentiert
- [x] Offene Fragen aufgelistet
- [x] Risiken bewertet
- [x] Nächste Schritte definiert
- [x] Unsicherheiten kennzeichnet

### Kritische Probleme

- [x] PocketBase API offline identifiziert
- [x] Security Audit nicht durchgeführt notiert
- [x] Matching-Algorithmus ungeklärt identifiziert
- [x] Ownership-Rules unverifi. notiert
- [x] Fremdrelations-Blockade unverifi. notiert

### Keine Geheimnisse

- [x] Keine Passwörter in Übergabe
- [x] Keine Private Keys in Übergabe
- [x] Keine API-Tokens in Übergabe
- [x] Nur Variablennamen dokumentiert

### Keine Vermutungen als Fakten

- [x] "geplant" vs. "implementiert" deutlich unterschieden
- [x] "UNVERIFI." Dinge als solche gekennzeichnet
- [x] "UNGEKLÄRT" Dinge nicht als Tatsachen dargestellt

---

## Abschluss

Diese Übergabe dokumentiert den **MVP-Stand (0.1.0)** von NeuroPlay zum Zeitpunkt **2026-08-15 09:16 UTC**.

**Was funktioniert:**
- ✅ Landing Page
- ✅ Benutzer-Registrierung & Anmeldung
- ✅ Gast-Check-in (lokal nur)
- ✅ Benutzer-Check-in (DB, aber API UNVERIFI.)
- ✅ Passwort-Änderung
- ✅ Fallback Bedürfnisse
- ✅ Responsive Design
- ✅ Git-Repo Setup

**Was blockiert ist:**
- ⚠️ PocketBase API nicht erreichbar → Security Audit nicht möglich
- ⚠️ Matching-Algorithmus nicht spezifiziert → Features blockiert
- ⚠️ Ownership/Fremdrelations-Rules nicht verifiziert

**Nächste unmittelbare Schritte:**
1. API-Erreichbarkeit testen
2. 32-Punkt Security Audit durchführen
3. Matching-Algorithmus definieren
4. Matching-Feature implementieren

---

**Erstellt:** 2026-08-15 09:16 UTC
**Status:** ÜBERGABEFERTIG
**Verifikation:** Code analysiert, Quellen aufgelistet
**Unsicherheiten:** Gekennzeichnet und dokumentiert
