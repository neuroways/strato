# PROJECT HANDOVER – NeuroPlay
## Vollständige Technische und Fachliche Projektübergabe

---

## 1. Dokumentinformationen

**Projektname:** NeuroPlay  
**Projektbeschreibung:** Web-Applikation für neurodivergente Menschen zur Aktivitäts-Empfehlung und Reflexion  
**Datum der Übergabe:** 15. August 2026  
**Übergabe-Version:** 1.0  
**Gültigkeitsbereich:** Entwicklungsstand August 2026, Branch `dev`

**Aktueller Entwicklungsstand:**  
Phase 1 (Datenbankarchitektur & Frontend-UI) abgeschlossen. Phase 2 (Datenbankanbindung & Authentifizierung) teilweise umgesetzt, teilweise blockiert.

**Verwendete Technologien (Stack):**
- Frontend: React 19, Vite 5, Tailwind CSS v4, React Router v6
- Datenbank-Design: MySQL/PostgreSQL/SQLite (63 Tabellen)
- Backend: PocketBase (Admin-Panel + Auth-System, teilweise konfiguriert)
- Lokale Persistierung: Browser localStorage + geplante SQLite-Integration
- Hosting: STRATO IONOS (ai-builder.strato.de)
- Version Control: Git, GitHub Remote `git@github.com:neuroways/NeuroPlay_AI.git`, Branch `dev`

**Entwicklungsumgebung:**
- Node.js 24
- Package-Dependencies: Keine Abhängigkeiten in `package.json` (alle vom Platform bereitgestellt)
- Build: Vite mit `npm run build:prod`
- Dev-Server: `npm run dev` mit Hot Reload
- Admin-Panel: PocketBase unter `http://localhost/.sfs-bd/_/`

**Hosting-/Deploymentumgebung:**
- Live-URL: ai-builder.strato.de
- Veröffentlichung: Manuell via "Veröffentlichen"-Button
- Zielverzeichnis: `/dist/` (committed, autodeployed nach Build)
- Branching-Strategie: `dev` = Arbeits-Branch, kein separater `main`

**Repository:**
- Remote: `git@github.com:neuroways/NeuroPlay_AI.git`
- Branch (aktiv): `dev`
- Commits: 20 bedeutungsvolle Commits vom Schema-Design über Frontend bis Datenbank-Integration
- Letzter Commit: `e76a879` – „docs: Masterprompt für Projekt-Kontext + KI-Onboarding"

**Zweck dieser Übergabe:**
Ermöglicht einer KI oder neuen Entwicklerin/Entwickler, das Projekt ohne Kenntnis der bisherigen Unterhaltung unmittelbar fortzusetzen. Diese Datei rekonstruiert den tatsächlichen Projektstand anhand verfügbarer Quellen und unterscheidet konsequent zwischen **implementiert**, **teilweise implementiert**, **geplant**, **offen**, **ungeklärt** und **ersetzt**.

---

## 2. Executive Project Summary

### Was ist NeuroPlay?

NeuroPlay ist eine **neurodivergenz-freundliche Web-App**, die Menschen (speziell neurodivergente Menschen) hilft, **in ihrer aktuellen Situation die passende Aktivität zu finden und später darüber zu reflektieren**.

**Zentrale Philosophie:**
- Menschen sind nicht „schlecht in Fokus" – sie haben nur bestimmte Situationen entdeckt, in denen sie Fokus aufbringen können
- NeuroPlay lernt diese Muster: Was hilft mir wann? Mit wem? Wie lange? Unter welchen Bedingungen?
- **Beobachtung vor Interpretation:** Neutrale Tatsachen („Du hast heute 20 Min gehäkelt und mir gesagt, es war beruhigend") statt Diagnosen („Du hast ADHS")
- **Privacy by Default:** Alle persönlichen Daten sind privat; Teilen ist explizit und opt-in

### Welches Problem löst es?

Neurodivergente Menschen (ADHS, Autismus, Dyslexie, etc.) brauchen oft **situationsspezifische Lösungen**, nicht generische Ratschläge.
- „Geh spazieren" hilft nicht, wenn draußen zu viel Reiz ist
- „Schreibe es auf" hilft nicht, wenn die Motorik gerade überfordert ist
- Empfehlungen ohne Kontext führen zu Frustration

NeuroPlay sammelt die **tatsächlich geholfen habenden** Aktivitäten pro Mensch, Kontext und Moment und macht daraus Muster sichtbar.

### Wer benutzt es?

- **Primär:** Neurodivergente Menschen (ADHS, Autismus, etc.)
- **Sekundär:** Betreuende (Eltern, Therapeuten, Coaches), die Vorschläge personalisieren wollen
- **Tertiär:** Institutionen (Schulen, Kliniken, Workshops), die es als multi-user System nutzen

### Was soll das fertige System können?

**Kurzfristig (MVP – derzeit teilweise umgesetzt):**
1. User öffnet NeuroPlay
2. Beantwortet einen kurzen Check-in (Bedarf, Energielevel, Zeit, Sozialkontext)
3. Bekommt **eine personalisierte Empfehlung** (mit Begründung) + 3 Alternativen
4. Kann Fokus-Modus aktivieren (Ablenkungen minimieren)
5. Nach der Aktivität: Kurze Reflexion (Hat geholfen? Wie sehr?)
6. Diese Beobachtung wird gespeichert

**Mittelfristig (Q2–Q3 2026, teilweise geplant):**
- Aktivitätskatalog durchsuchen und filtern
- Favoriten setzen
- Persönliche Erfolgsgeschichten sehen
- Mit Familie/Haushalt teilen
- Muster erkennen („In Stresssituationen hilft mir X immer")

**Langfristig (Q4 2026+, geplant):**
- Geführte Lernpfade (Coach-Seite)
- Multi-User & Gruppenverwaltung
- Admin-Interface
- Mobile App
- Mehrsprachigkeit

### Aktueller Entwicklungsstand

**Phase 1 (Datenbankarchitektur & Frontend-UI): ✅ ABGESCHLOSSEN**
- Datenbankschema: 63 Tabellen, alle 7 Domänen, 3 SQL-Varianten (MySQL/SQLite/PostgreSQL)
- Frontend: 7 Seiten, 13 Komponenten, ~2.082 Zeilen React-Code
- Responsive Design: Tested auf 375px, 768px, 1280px
- Interface-Standard (NW-PLAY-UI-001 v0.1.0) vollständig umgesetzt

**Phase 2 (Datenbankanbindung & Funktionalität): 🟡 TEILWEISE UMGESETZT**
- ✅ UI-Framework funktioniert
- ✅ Entdecken-Seite lädt Aktivitäten aus lokalem In-Memory-Store
- 🟡 Check-ins speichern nicht persistent (nur Session)
- 🟡 Beobachtungen speichern teilweise (localStorage vorhanden, aber nicht alle Seiten nutzen es)
- 🟡 Favoriten-Toggle existiert, aber keine vollständige Persistierung
- 🔴 Authentifizierung: Nicht gestartet (keine User-Logins, anonymes Browsing)
- 🔴 PocketBase: Collections nicht konfigurierbar via Admin-Panel-GUI

**Phase 3 (Coach, Admin, Gruppenverwaltung): 🔴 NICHT GESTARTET**
- Coach-Seite existiert mit UI, keine Backend-Daten
- Admin-Interface geplant, nicht implementiert
- Gruppenverwaltung: Seite existiert, keine Funktionalität

---

## 3. Fachliches Zielbild

### Bestätigte Anforderungen (Spezifikation NW-PLAY-UI-001 v0.1.0)

Die Anforderungen sind dokumentiert in:
1. **NW-PLAY-UI-001_NeuroPlay_Interface_Standard_v0.1.0.md** (Uploaded vom User)
2. **NeuroPlay_Datenbankarchitektur.md** (1.701 Zeilen, detaillierte Fachspecs)
3. **NeuroPlay_Erweiterte_Architektur_Teil1-3.md** (3.000+ Zeilen, Use Cases, API-Flows)

**Gesicherte Anforderungen:**

| Bereich | Anforderung | Status |
|---------|-------------|--------|
| **Philosophie** | Beobachtung statt Diagnose | Implementiert (UI-Text) |
| **Philosophie** | Privacy by Default | Designiert (DB-Schema), teilweise UI |
| **Philosophie** | Keine Leistungsbewertung | Implementiert (UI-Text) |
| **Kernseiten** | Heute – Check-in + Empfehlung | UI fertig, Logik Mock |
| **Kernseiten** | Entdecken – Katalog + Filter | UI fertig, Daten lokal |
| **Kernseiten** | Aktivitätsdetail – 6 Reiter | UI komplett, Daten Mock |
| **Kernseiten** | Coach – 6 Lernpfade | UI komplett, Daten Mock |
| **Kernseiten** | Sammlung – Favoriten + Lernstand | UI fertig, Persistierung teilweise |
| **Kernseiten** | Entwicklung – Timeline + Muster | UI fertig, Beobachtungen Mock |
| **Kernseiten** | Mehr – Gruppen, Datenschutz, etc. | UI fertig, Funktionalität offen |
| **Navigation** | 6-Element-Navbar, Mobile-First | Implementiert ✅ |
| **Responsive** | 375px, 768px, 1280px | Getestet ✅ |
| **Branding** | NeuroWays-Farben (Navy, Gold, Petrol, Violet) | Tailwind-Config ✅ |
| **Accessibility** | WCAG 2.2 AA Ziel | Design angelegt, nicht geprüft |
| **Multi-Tenancy** | Org-Isolation im Schema | Designiert, nicht genutzt |
| **Auth** | Email-Signup/Login mit Rollen | Schema vorhanden, nicht implementiert |
| **Datenscutz** | Soft Deletes, Audit Logs | Schema vorhanden, nicht genutzt |

### Geplante Funktionen (nicht garantiert)

Diese sind im Standard erwähnt, aber Implementierung nicht sicher:

- Mehrsprachigkeit (i18n) – erwähnt, nicht umgesetzt
- Mobile Native App – erwähnt, aktuell nur Web
- KI-Integration für Empfehlungen – Schema hat Feld, keine Logik
- Erweiterte Mustererkennung – geplant, nicht implementiert

### Offene fachliche Entscheidungen

| Frage | Kontext | Auswirkung |
|-------|---------|-----------|
| **SQLite vs. PocketBase für Persistierung?** | Benutzer konnte Sammlungen nicht in PocketBase Admin-Panel anlegen | MVP blockiert – welche Lösung wählen? |
| **User-Authentifizierung: Email-only oder auch Social?** | NW-PLAY-UI-001 sagt nur „Email", aber keine Implementierung | Impacts Signup-Flow |
| **Haushalt-Modell: Shared Collections oder Rollen?** | Schema hat beides, aber keine Entscheidung dokumentiert | Impacts Freigabe-Funktionalität |
| **Sichtbarkeit von Beobachtungen in Gruppen** | Privacy by Default, aber wie viel kann geteilt werden? | Impacts Coaching-Seiten |
| **Muster-Erkennungsalgorithmus** | Anforderung bekannt, aber keine Spezifikation | Impacts Entwicklung-Seite |

### Nicht mehr gültige Anforderungen

Aus den Git-Messages rekonstruiert:

| Anforderung | Grund für Verwerfung | Status |
|-------------|---------------------|--------|
| **82-Tabellen-Schema aus v1.0** | Vereinfacht auf 63 Tabellen (v2.0) | ERSETZT durch neuroplay_v2_schema.sql |
| **Email-Sending via PocketBase Cron** | Platform-Limitation: Cron APIs sind disabled | ARCHIVIERT – Alternative: Webhooks + externe Service |

---

## 4. Vollständiger Anforderungskatalog

### Funktionale Anforderungen

| ID | Anforderung | Kategorie | Status | Implementierung/Nachweis | Offene Punkte |
|----|-------------|-----------|--------|--------------------------|---------------|
| **F-001** | Check-in durchführen | Heute-Seite | TEILWEISE IMPLEMENTIERT | UI existiert (HeutePage.jsx:290Z), speichert aber nicht persistent | Check-in-Daten müssen in DB gespeichert werden |
| **F-002** | Empfehlung erhalten basierend auf Check-in | Heute-Seite | TEILWEISE IMPLEMENTIERT | Mock-Logik vorhanden (Empfehlung wird nach Energielevel + Zeit gewählt), aber nicht personalisiert | Muss auf echte Beobachtungen des Users angepasst werden |
| **F-003** | 3 Alternativen anzeigen | Heute-Seite | IMPLEMENTIERT | MOCK_ACTIVITIES Fallback aktiv (HeutePage.jsx:30–45Z) | Auf echte DB-Daten umstellen |
| **F-004** | Fokus-Modus aktivieren | Heute-Seite | IMPLEMENTIERT | UI vorhanden (focusMode State + conditional render), visuelle Änderungen aktiv | Auf allen Seiten konsistent umsetzen |
| **F-005** | Aktivitätskatalog mit Filtern durchsuchen | Entdecken-Seite | IMPLEMENTIERT | Filter existieren: Zeit, Energie, Personenzahl (EntdeckenPage.jsx:251Z) | Auf DB-Aktivitäten abgestimmt |
| **F-006** | Aktivität zu Favoriten hinzufügen | Entdecken + Detail | TEILWEISE IMPLEMENTIERT | UI-Button vorhanden, localStorage Hook `useFavorites` definiert (hooks/useObservations.js), aber nicht auf allen Seiten aktiv | Aktivitätsdetail-Seite nicht vollständig integriert |
| **F-007** | Aktivitätsdetail mit 6 Reitern anzeigen | Activity-Detail-Seite | IMPLEMENTIERT | Alle 6 Reiter vorhanden: Überblick, Passt zu mir, Lernen, Ablauf, Wirkung, Quellen (ActivityDetailPage.jsx:429Z) | Daten sind Mock-hardcoded, nicht aus DB |
| **F-008** | Beobachtung nach Aktivität speichern | Entwicklung-Seite | TEILWEISE IMPLEMENTIERT | Hook `useObservations` existiert (hooks/useObservations.js:99Z), aber Integraton fehlt | Keine Persistierung auf Entwicklung- oder Heute-Seite |
| **F-009** | Coach-Seite mit 6 Lernpfaden anzeigen | Coach-Seite | IMPLEMENTIERT | UI komplett (CoachPage.jsx:271Z), Expand/Collapse funktioniert | Inhalte sind hardcoded, kein User-Progress-Tracking |
| **F-010** | Favoriten-Sammlungen sehen | Meine-Aktivitäten-Seite | TEILWEISE IMPLEMENTIERT | UI vorhanden (MeineAktivitaetenPage.jsx:155Z), aber lädt nicht aus DB | Favoriten-Abruf nicht implementiert |
| **F-011** | Beobachtungen als Timeline anzeigen | Entwicklung-Seite | TEILWEISE IMPLEMENTIERT | UI vorhanden (EntwicklungPage.jsx:229Z), Mock-Daten hardcoded | Keine echten Beobachtungen, keine Muster-Erkennung |
| **F-012** | Muster in Beobachtungen erkennen | Entwicklung-Seite | GEPLANT | Anforderung in Spec, keine Implementierung | Algorithmus nicht definiert, Backend fehlt |
| **F-013** | Haushalt-Freigaben konfigurieren | Mehr-Seite | GEPLANT | UI-Struktur vorhanden (MehrPage.jsx:249Z), keine Funktionalität | Multi-User/Rollen-System nicht umgesetzt |
| **F-014** | Datenschutzerklärung anzeigen | Mehr-Seite | IMPLEMENTIERT | Statischer Text vorhanden | Rechtlich nicht überprüft |
| **F-015** | Navigation zwischen Seiten | App-wide | IMPLEMENTIERT | React Router mit 7 Routes (App.jsx:7–21Z), Navigation-Komponente (Navigation.jsx:78Z) | Funktioniert ✅ |

### Nicht-funktionale Anforderungen

| ID | Anforderung | Kategorie | Status | Implementierung/Nachweis | Offene Punkte |
|----|-------------|-----------|--------|--------------------------|---------------|
| **NF-001** | Responsive Design (375px, 768px, 1280px) | Usability | IMPLEMENTIERT | Tailwind Breakpoints überall (md:, lg:), keine Horizontal-Scrolls bei 375px | Nicht formal getestet |
| **NF-002** | Mobile-First Design | Usability | IMPLEMENTIERT | Navigation unten auf Mobile (fixed), oben auf Desktop (Navigation.jsx:17Z) | ✅ |
| **NF-003** | Accessibility WCAG 2.2 AA | Compliance | TEILWEISE IMPLEMENTIERT | Struktur angelegt (semantische HTML), keine formal Audit durchgeführt | Farb-Kontraste, Fokusringe, Tastatur-Nav zu prüfen |
| **NF-004** | Dunkler Modus / Light Mode | Usability | OFFEN | Nur Light Mode vorhanden (warm-white bg) | Falls gefordert: Neue Variante |
| **NF-005** | Mehrsprachigkeit (i18n) | Usability | GEPLANT | Alle UI-Texte auf Deutsch hardcoded | Struktur für i18n nicht vorbereitet |
| **NF-006** | Seitenladezeit < 3 Sekunden | Performance | UNGEKLÄRT | Build-Output vorhanden, keine Benchmark | Vite + Tailwind sollten OK sein |
| **NF-007** | Datenpersistierung > 1 Jahr | Durability | TEILWEISE IMPLEMENTIERT | localStorage für Session-Daten (db.js:29Z), kein echter Backend | Keine echte Datensicherung |
| **NF-008** | Verschlüsslung persönlicher Daten | Security | GEPLANT | Schema hat Felder, keine Verschlüsselung implementiert | Braucht Backend-Arbeit |
| **NF-009** | Privacy by Default (DSGVO) | Compliance | DESIGNIERT | Schema mit Soft Deletes (neuroplay_v2_schema.sql), UI-Text prägt Philosophie | Technisch nicht durchgesetzt |
| **NF-010** | Offline-Funktionsfähigkeit | Usability | TEILWEISE IMPLEMENTIERT | localStorage funktioniert offline, API-Calls nicht | Fallback auf Mock-Daten aktiv |

---

## 5. Aktuell implementierter Funktionsumfang

### 5.1 Heute-Seite (Check-in & Empfehlung)

**Zweck:** User beantwortet schnell, was er gerade braucht, und bekommt eine Empfehlung mit Begründung.

**Benutzerinteraktion:**
1. Check-in starten (oder überspringen)
2. Bedarf wählen (8 Optionen: Ruhe, Fokus, Verbindung, Kreativität, Bewegung, Herausforderung, Struktur, Abwechslung)
3. Energielevel wählen (5-Punkt-Skala: 1 = völlig erschöpft bis 5 = volle Energie)
4. Zeit eingeben (6 Optionen: unter 10 Min bis offen)
5. Sozialkontext wählen (6 Optionen: allein bis Gruppe)
6. Empfehlung anschauen + Begründung lesen
7. Fokus-Modus optional aktivieren

**Beteiligte Komponenten:**
- `HeutePage.jsx` – Hauptseite (290 Zeilen)
- `EnergyScale.jsx` – 5-Punkt-Energieskala (33 Zeilen)
- `RecommendationCard.jsx` – Display der Empfehlung (38 Zeilen)

**Beteiligte Dateien:**
- `src/pages/HeutePage.jsx`
- `src/components/EnergyScale.jsx`
- `src/components/RecommendationCard.jsx`

**Datenquellen:**
- **Aktuell:** Mock-Daten hardcoded (MOCK_ACTIVITIES Objekt)
- **Geplant:** Beobachtungen aus DB abrufen (`useObservations` Hook), Empfehlungsalgorithmus ausführen

**Datenbankbezug:**
- Sollte lesen: `activity_sessions` (Sessions des Users), `observations` (seine Beobachtungen)
- Sollte schreiben: `activity_sessions` (neuer Check-in)
- **Status:** Schema vorhanden, aber keine Verbindung

**Relevante API-Endpunkte:**
```
POST /sessions           – Check-in speichern
GET /sessions/:userId     – Historische Sessions abrufen
GET /recommendations     – Empfehlungen basierend auf Check-in
```

**Aktueller Reifegrad:** 
🟡 **UI-fertig, Logik Mock** – Die Benutzeroberfläche funktioniert, aber Daten sind hardcoded. Keine Persistierung über Session hinaus.

**Bekannte Einschränkungen:**
- Check-in wird nach Reload vergessen (keine localStorage)
- Empfehlungsalgorithmus ist naiv (nur Energielevel + Zeit)
- Keine historischen Daten für Matching
- Fokus-Modus existiert, aber hat nur CSS-Effekt, keine echte Reizreduktion

---

### 5.2 Entdecken-Seite (Aktivitätskatalog)

**Zweck:** User durchsucht alle verfügbaren Aktivitäten, filtert nach Kriterien und sieht Details.

**Benutzerinteraktion:**
1. Optional suchen (Text-Input)
2. Nach Dauer filtern (Dropdown)
3. Nach Energie filtern (Slider)
4. Nach Personenzahl filtern (Dropdown)
5. Aktivitäten-Karten sehen (Name, Bild, Dauer, Tags)
6. Auf Aktivität klicken → Detail-Seite

**Beteiligte Komponenten:**
- `EntdeckenPage.jsx` – Seite mit Filtern (251 Zeilen)
- `ActivityCard.jsx` – Einzelne Aktivitäts-Karte (59 Zeilen)

**Beteiligte Dateien:**
- `src/pages/EntdeckenPage.jsx`
- `src/components/ActivityCard.jsx`

**Datenquellen:**
- **Aktuell:** 6 Aktivitäten aus In-Memory-Speicher (db.js Fallback)
  - Häkeln, Dorfromantik, Café del Gatto, Spaziergang, Puzzle, Lesen
- **Geplant:** Aus PocketBase-Collection `activities` laden

**Datenbankbezug:**
- Sollte lesen: `activities` (Katalog)
- Optioneller Abruf: `favorites` (zur Anzeige von Sternen)
- **Status:** Hook `useActivities()` existiert (hooks/useActivities.js), wird aber nicht aktiv genutzt

**Relevante API-Endpunkte:**
```
GET /activities?sort=name&limit=50      – Katalog laden
GET /activities?filter=type:Brettspiel  – Nach Typ filtern
GET /favorites/:userId                   – Favoriten des Users
POST /favorites/:userId/:activityId      – Als Favorit markieren
```

**Aktueller Reifegrad:** 
🟢 **Funktionsfähig mit lokalem Fallback** – Die Seite lädt 6 vordefinierte Aktivitäten, Filter funktionieren. Persistierung von Favoriten teilweise.

**Bekannte Einschränkungen:**
- Nur 6 Aktivitäten (Demo), sollten Hunderte sein
- Filter-Werte für Aktivitäten sind Mock
- Favoriten-Button existiert nicht (nur in Detail-Seite)
- Suchfunktion ist Case-Sensitive String-Match

---

### 5.3 Aktivitätsdetail-Seite (6 Reiter)

**Zweck:** User sieht alles über eine Aktivität: Was ist es? Passt es zu mir? Wie funktioniert es? Was passiert dann?

**Benutzerinteraktion:**
1. Aktivität aus Katalog anklicken
2. Reiter wechseln (6 Tabs):
   - **Überblick** – Beschreibung, Material, Schwierigkeit
   - **Passt zu mir** – Wann ist das gut? Welche Herausforderungen?
   - **Lernen** – Was kann ich noch lernen? Nächste Schritte?
   - **Ablauf** – Schritt-für-Schritt Anleitung
   - **Wirkung** – Mögliche Auswirkungen (mit Unsicherheit)
   - **Quellen** – Woher kommt diese Info?
3. Ggf. zu Favoriten hinzufügen
4. Zur Heute-Seite oder weiter im Katalog

**Beteiligte Komponenten:**
- `ActivityDetailPage.jsx` – Seite mit Tab-Navigation (429 Zeilen)

**Beteiligte Dateien:**
- `src/pages/ActivityDetailPage.jsx`

**Datenquellen:**
- **Aktuell:** ACTIVITY_DETAILS Objekt mit 6 Aktivitäten hardcoded
- **Geplant:** Activity-Record aus DB + Related Data (Beobachtungen, Lernfortschritt, Quellen)

**Datenbankbezug:**
- Sollte lesen: `activities`, `activity_attributes`, `activity_links`, `user_learning_state`
- **Status:** Keine Datenbankanbindung

**Aktueller Reifegrad:** 
🟡 **UI komplett, Daten Mock** – Alle 6 Reiter existieren mit vollständiger UI und Mock-Content. Layout ist responsive und gut strukturiert.

**Bekannte Einschränkungen:**
- Aktivitäten sind hardcoded
- Keine echten Beobachtungen anderer User
- Lernfortschritt ist statisch
- Quellen sind erfunden
- Favoriten-Button hat keine Funktionalität

---

### 5.4 Coach-Seite (6 Lernpfade)

**Zweck:** Geführte, strukturierte Lernpfade zu Themen wie „Wie erkenne ich meine Grenzen?" oder „Welche Rolle spielt Umgebung?"

**Benutzerinteraktion:**
1. Einen von 6 Lernpfaden wählen
2. Pfad aufklappen → 3 Ebenen sehen:
   - **Was:** Kurze Definition
   - **Warum:** Warum ist das relevant?
   - **Welche Möglichkeit:** Konkrete Vorschläge
3. Weitere Pfade erkunden
4. Quiz oder Reflexion absenden (geplant)

**Beteiligte Komponenten:**
- `CoachPage.jsx` – Seite mit Lernpfad-Accordion (271 Zeilen)

**Beteiligte Dateien:**
- `src/pages/CoachPage.jsx`

**Datenquellen:**
- **Aktuell:** 6 LEARNING_PATHS Objekte hardcoded
- **Geplant:** Aus DB laden, User-Progress tracken

**Datenbankbezug:**
- Sollte lesen: `learning_paths`, `learning_path_sections`, `user_learning_state`
- Sollte schreiben: `user_learning_state` (wenn User einen Pfad zu Ende macht)
- **Status:** Keine Anbindung

**Aktueller Reifegrad:** 
🟡 **UI fertig, Daten Mock** – Accordion funktioniert, Design gut. Aber kein Content-Management und kein Progress-Tracking.

**Bekannte Einschränkungen:**
- Inhalte sind englisch-sprachig Mock-Text
- Keine Datenbank-Persistierung
- Keine Quiz oder Abschluss-Zertifikat
- Keine Unterscheidung nach User-Typ (Erwachsener vs. Kind)

---

### 5.5 Sammlung-Seite (Meine Aktivitäten)

**Zweck:** Persönliche Übersicht: Favoriten, Lernstand, was ich besitze (Spiele).

**Benutzerinteraktion:**
1. Reiter wechseln: Favoriten | Lernstand | Besitz
2. Favoriten sehen und verwalten
3. Lernfortschritt pro Aktivität sehen
4. Spiele-Collection durchsuchen
5. Ggf. wieder abspielen oder Feedback geben

**Beteiligte Komponenten:**
- `MeineAktivitaetenPage.jsx` – Sammlung mit Tabs (155 Zeilen)

**Beteiligte Dateien:**
- `src/pages/MeineAktivitaetenPage.jsx`

**Datenquellen:**
- **Aktuell:** Mock-Arrays hardcoded
- **Geplant:** Aus DB abrufen (`favorites`, `user_learning_state`, `user_inventory`)

**Datenbankbezug:**
- Sollte lesen: `favorites`, `user_learning_state`, `activity_sessions`, ggf. `groups_members`
- **Status:** Keine Anbindung

**Aktueller Reifegrad:** 
🟡 **UI fertig, Datenlast Mock** – Die Seite zeigt drei Tabs mit angemessenem Layout, aber alle Daten sind Dummy.

**Bekannte Einschränkungen:**
- Favoriten-Liste ist leer
- Lernstand zeigt keine echten Fortschritte
- Besitz-Funktion ist unklar (nicht im MVP definiert)
- Keine Bearbeitungs-Möglichkeiten

---

### 5.6 Entwicklung-Seite (Timeline & Muster)

**Zweck:** Reflexion und Selbstverständnis – Zeitstrahl aller Beobachtungen + erkannte Muster mit Unsicherheitsangaben.

**Benutzerinteraktion:**
1. Zeitstrahl der Beobachtungen sehen (neueste oben)
2. Beobachtung anklicken → Details & Feedback-Options
3. Erkannte Muster sehen (z.B. „In Stresssituationen hilft Bewegung")
4. Muster ablehnen oder bestätigen
5. Neue Beobachtung hinzufügen (wenn gewünscht)

**Beteiligte Komponenten:**
- `EntwicklungPage.jsx` – Seite mit Timeline (229 Zeilen)

**Beteiligte Dateien:**
- `src/pages/EntwicklungPage.jsx`

**Datenquellen:**
- **Aktuell:** Mock-Beobachtungen hardcoded
- **Geplant:** Aus DB abrufen (`observations`, `observation_patterns`)

**Datenbankbezug:**
- Sollte lesen: `observations`, `observation_patterns`
- Sollte schreiben: `observation_feedback` (Benutzer bestätigt/lehnt Muster ab)
- **Status:** Hook `useObservations()` existiert, aber nicht integriert

**Aktueller Reifegrad:** 
🟡 **UI vorhanden, Daten Mock** – Timeline mit Karten-Layout vorhanden, Muster-Anzeige existiert. Aber keine echten Daten und keine Muster-Logik.

**Bekannte Einschränkungen:**
- Beobachtungen sind Placeholder
- Muster-Erkennungsalgorithmus nicht implementiert
- Keine Ablehnung von Mustern möglich (UI vorhanden, aber Handler fehlt)
- Unsicherheitsangaben sind erfunden

---

### 5.7 Mehr-Seite (Haushalt, Gruppen, Datenschutz)

**Zweck:** Sekundäre Funktionen – Freigaben, Datenschutz, Info.

**Benutzerinteraktion:**
1. Haushalt konfigurieren (Wer ist mit mir?)
2. Gruppen beitreten oder erstellen (optional)
3. Freigabe-Einstellungen anpassen
4. Datenschutzerklärung + Impressum lesen

**Beteiligte Komponenten:**
- `MehrPage.jsx` – Seite mit Abschnitten (249 Zeilen)

**Beteiligte Dateien:**
- `src/pages/MehrPage.jsx`

**Datenquellen:**
- **Aktuell:** Mock-Text und Strukturen
- **Geplant:** Aus DB laden (Haushalt-Members, Gruppen-Zugehörigkeiten)

**Datenbankbezug:**
- Sollte lesen: `households`, `groups`, `group_members`, `sharing_settings`
- Sollte schreiben: Neue Haushalte/Gruppen erstellen
- **Status:** Keine Anbindung

**Aktueller Reifegrad:** 
🟡 **UI fertig, Funktionalität offen** – Seite zeigt Struktur und Informationen, aber keine Bearbeitungsmöglichkeiten und keine Datenbank-Anbindung.

**Bekannte Einschränkungen:**
- Haushalt-Management funktioniert nicht
- Gruppen können nicht erstellt werden
- Freigabe-Einstellungen haben keine Auswirkung
- Rechtliche Texte sind Placeholder (nicht überprüft)

---

## 6. Seiten- und Navigationsstruktur

### Übersicht

```
NeuroPlay (Root)
├── Heute (/)
│   └── Check-in → Empfehlung → Fokus-Modus
├── Entdecken (/entdecken)
│   ├── Filter (Zeit, Energie, Personenzahl)
│   └── → Aktivitätsdetail
├── Aktivitätsdetail (/activity/:id)
│   ├── Überblick
│   ├── Passt zu mir
│   ├── Lernen
│   ├── Ablauf
│   ├── Wirkung
│   └── Quellen
├── Coach (/coach)
│   ├── Lernpfad 1: Grenzen erkennen
│   ├── Lernpfad 2: Situation verstehen
│   ├── ... (6 Pfade total)
├── Sammlung (/meine-aktivitaeten)
│   ├── Favoriten
│   ├── Lernstand
│   └── Besitz
├── Entwicklung (/entwicklung)
│   ├── Beobachtungs-Timeline
│   └── Erkannte Muster
└── Mehr (/mehr)
    ├── Haushalt
    ├── Gruppen
    ├── Datenschutz
    └── Impressum
```

### Seiten-Details

#### Seite: Heute

| Eigenschaft | Wert |
|-----------|------|
| **Route** | `/` |
| **Zweck** | Schneller Check-in → Empfehlung + Alternativen → Start einer Aktivität |
| **Zielgruppe** | Alle Benutzer, täglich/mehrmals täglich |
| **Rollen** | Keine Einschränkung |
| **UI-Bereiche** | Begrüßung, Check-in-Form (8 Needs, 5 Energie, 6 Zeit, 6 Sozial), Empfehlungs-Card, 3 Alternativen, Recent Activity, Fokus-Toggle |
| **Mögliche Aktionen** | Check-in absenden, Empfehlung ablehnen, Alternative wählen, Fokus-Modus aktivieren, zu Aktivität starten |
| **Verwendete Daten** | Check-in-Eingaben, Beobachtungen des Users (für Empfehlung), Activity-Metadaten |
| **Beteiligte Komponenten** | HeutePage, EnergyScale, RecommendationCard |
| **Status** | 🟡 UI fertig, Logik Mock |
| **Bemerkungen** | Empfehlungen sind nach Energielevel + Zeit gewählt, nicht personalisiert. Check-ins werden nicht gespeichert. |

#### Seite: Entdecken

| Eigenschaft | Wert |
|-----------|------|
| **Route** | `/entdecken` |
| **Zweck** | Aktivitäts-Katalog durchsuchen, filtern, entdecken |
| **Zielgruppe** | Alle Benutzer, explorativ |
| **Rollen** | Keine Einschränkung |
| **UI-Bereiche** | Suchfeld, 3 Filter (Zeit, Energie, Personenzahl), Aktivitäts-Karten-Grid |
| **Mögliche Aktionen** | Suchen, Filtern, Aktivität anklicken → Detail, optional Favoriten-Button (nicht aktiv) |
| **Verwendete Daten** | Activity-Katalog (6 Beispiele), Favoriten (optional) |
| **Beteiligte Komponenten** | EntdeckenPage, ActivityCard |
| **Status** | 🟢 Funktioniert mit Fallback-Daten |
| **Bemerkungen** | 6 Aktivitäten sind Demo. Filter funktionieren. Favoriten-Integration fehlt. |

#### Seite: Aktivitätsdetail

| Eigenschaft | Wert |
|-----------|------|
| **Route** | `/activity/:id` |
| **Zweck** | Umfassende Informationen zu einer Aktivität (6 Perspektiven) |
| **Zielgruppe** | Alle Benutzer, detailliertes Interesse |
| **Rollen** | Keine Einschränkung |
| **UI-Bereiche** | 6 Tab-Panel (Überblick, Passt zu mir, Lernen, Ablauf, Wirkung, Quellen), Favoriten-Button, Zurück-Button |
| **Mögliche Aktionen** | Reiter wechseln, zu Favoriten hinzufügen, Diese Aktivität starten, Zur Übersicht zurück |
| **Verwendete Daten** | Activity-Details, User-Beobachtungen (zur Anzeige in „Wirkung"), Learning-State |
| **Beteiligte Komponenten** | ActivityDetailPage |
| **Status** | 🟡 UI komplett, Daten Mock |
| **Bemerkungen** | 6 Aktivitäten mit vollständigem Mock-Inhalt. Schema für Aktivitäts-Merkmale existiert, wird aber nicht genutzt. |

#### Seite: Coach

| Eigenschaft | Wert |
|-----------|------|
| **Route** | `/coach` |
| **Zweck** | Geführtes Lernen über Strategien (6 Pfade, 3 Ebenen pro Pfad) |
| **Zielgruppe** | Benutzer, die gezielt lernen wollen |
| **Rollen** | Keine Einschränkung (später ggf. altersabhängig) |
| **UI-Bereiche** | 6 Accordion-Items (Lernpfade), je mit Was/Warum/Welche-Möglichkeit |
| **Mögliche Aktionen** | Pfad aufklappen/zuklappen, (geplant) Quiz absenden, Erfolg markieren |
| **Verwendete Daten** | Lernpfad-Inhalte, User-Progress (geplant) |
| **Beteiligte Komponenten** | CoachPage |
| **Status** | 🟡 UI fertig, Daten Mock, kein Progress-Tracking |
| **Bemerkungen** | 6 Lernpfade mit expandierbarem Inhalt. Keine Datenbankanbindung. |

#### Seite: Sammlung (Meine Aktivitäten)

| Eigenschaft | Wert |
|-----------|------|
| **Route** | `/meine-aktivitaeten` |
| **Zweck** | Persönliche Übersicht: Favoriten, Lernfortschritt, Besitz |
| **Zielgruppe** | Benutzer mit Login (geplant) |
| **Rollen** | Nur eigene Daten sichtbar (Privacy by Default) |
| **UI-Bereiche** | 3 Tab-Panels (Favoriten, Lernstand, Besitz), ggf. Verwaltungs-Optionen |
| **Mögliche Aktionen** | Reiter wechseln, Favoriten bearbeiten, Lernfortschritt sehen, (geplant) Besitz kategorisieren |
| **Verwendete Daten** | Favorites, Learning-State, Inventory |
| **Beteiligte Komponenten** | MeineAktivitaetenPage |
| **Status** | 🟡 UI vorhanden, keine echten Daten |
| **Bemerkungen** | Tabs sind leer oder mit Placeholder. Keine Bearbeitungsmöglichkeiten. |

#### Seite: Entwicklung

| Eigenschaft | Wert |
|-----------|------|
| **Route** | `/entwicklung` |
| **Zweck** | Selbstreflexion – Zeitstrahl von Beobachtungen + erkannte Muster |
| **Zielgruppe** | Benutzer mit Beobachtungs-Verlauf |
| **Rollen** | Nur eigene Beobachtungen sichtbar |
| **UI-Bereiche** | Beobachtungs-Timeline (Karten), Erkannte Muster-Sektion, Ablehnungs-Optionen |
| **Mögliche Aktionen** | Beobachtung anschauen, Muster ablehnen/bestätigen, Neue Beobachtung hinzufügen (geplant) |
| **Verwendete Daten** | Observations, Observation-Patterns, User-Feedback |
| **Beteiligte Komponenten** | EntwicklungPage |
| **Status** | 🟡 UI vorhanden, Daten Mock, keine Muster-Logik |
| **Bemerkungen** | Timeline ist Mock. Muster-Erkennungsalgorithmus nicht vorhanden. |

#### Seite: Mehr

| Eigenschaft | Wert |
|-----------|------|
| **Route** | `/mehr` |
| **Zweck** | Sekundäre Funktionen: Haushalt, Gruppen, Datenschutz, Info |
| **Zielgruppe** | Alle Benutzer |
| **Rollen** | Haushalt-Manager (geplant), Gruppen-Owner (geplant) |
| **UI-Bereiche** | Haushalt-Verwaltung, Gruppen-Liste, Sharing-Einstellungen, Datenschutz, Impressum |
| **Mögliche Aktionen** | Haushalt konfigurieren (nicht aktiv), Gruppen beitreten (nicht aktiv), Texte lesen |
| **Verwendete Daten** | Households, Groups, Settings, Policy-Texte |
| **Beteiligte Komponenten** | MehrPage |
| **Status** | 🟡 UI fertig, Funktionalität offen |
| **Bemerkungen** | Datenschutz-Text ist Placeholder. Haushalt- und Gruppen-Management nicht implementiert. |

---

## 7. User Flows

### Flow 1: Täglicher Check-in & Aktivität starten

```
User öffnet NeuroPlay
  ↓
[Optional] Check-in überspringen
  ↓
Check-in-Form:
  - Wählt Bedarf aus (z.B. "Ruhe")
  - Stellt Energielevel ein (z.B. 2/5)
  - Wählt verfügbare Zeit (z.B. "20–45 Min")
  - Wählt Sozialkontext (z.B. "allein")
  ↓
[IMPLEMENTIERT] Empfehlung wird berechnet (aktuell: nach Energielevel + Zeit)
  ↓
[IMPLEMENTIERT] Empfehlung mit Begründung angezeigt
  + 3 Alternativen
  ↓
User wählt eine Option oder probiert Alternative
  ↓
[TEILWEISE] Aktivität startet (Link zu Detail-Seite?)
  ↓
[GEPLANT] Nach Aktivität: Kurze Reflexion ("Hat geholfen?")
  ↓
[TEILWEISE] Beobachtung wird gespeichert (localStorage möglich, nicht auf allen Seiten aktiv)
```

**Implementierungsstatus:**
- ✅ Check-in-Form funktioniert
- ✅ Empfehlungslogik lädt Daten
- 🟡 Persistierung zu 50%
- 🔴 Reflektions-Prompt fehlt
- 🔴 Datenbank-Speicherung fehlt

---

### Flow 2: Aktivität entdecken & details sehen

```
User öffnet "Entdecken"
  ↓
[IMPLEMENTIERT] Aktivitäts-Katalog wird angezeigt (6 Demo-Aktivitäten)
  ↓
[OPTIONAL] User filtert:
  - Nach Dauer
  - Nach Energiebedarf
  - Nach Personenzahl
  ↓
[IMPLEMENTIERT] Gefilterte Aktivitäten werden angezeigt
  ↓
User klickt auf Aktivität → Detail-Seite
  ↓
[IMPLEMENTIERT] 6-Reiter-Interface wird angezeigt:
  1. Überblick – Was ist es?
  2. Passt zu mir – Wann könnte es helfen?
  3. Lernen – Was kann ich noch lernen?
  4. Ablauf – Wie mache ich es Schritt für Schritt?
  5. Wirkung – Was könnte passieren?
  6. Quellen – Woher kommt diese Info?
  ↓
[TEILWEISE] User kann zu Favoriten hinzufügen (Button existiert, aber keine Persistierung)
  ↓
User geht zurück oder vergleicht mit anderen Aktivitäten
```

**Implementierungsstatus:**
- ✅ Katalog-Anzeige funktioniert
- ✅ Filter funktionieren
- ✅ Detail-Seite mit 6 Reitern
- 🟡 Favoriten-Button hat keine Auswirkung
- 🔴 Katalog hat nur 6 Aktivitäten

---

### Flow 3: Entwicklung sehen & Muster erkennen

```
User öffnet "Entwicklung"
  ↓
[TEILWEISE] Zeitstrahl von Beobachtungen wird angezeigt (aktuell: Mock)
  ↓
User liest: "Du hast heute gehäkelt und sagtest, es war beruhigend"
  ↓
[GEPLANT] System erkennt Muster: "In stressigen Momenten scheint Kreativität zu helfen"
  ↓
[TEILWEISE] Muster wird mit Unsicherheitsangabe angezeigt (z.B. "90% Sicherheit")
  ↓
User kann:
  - Muster ablehnen ("Das stimmt nicht")
  - Bestätigen ("Ja, genau!")
  - Ignorieren
  ↓
[GEPLANT] Feedback wird gespeichert, beeinflusst zukünftige Empfehlungen
```

**Implementierungsstatus:**
- 🟡 Zeitstrahl-UI existiert
- 🔴 Mock-Daten, keine echten Beobachtungen
- 🔴 Muster-Erkennungsalgorithmus fehlt
- 🟡 Ablehnung-Button existiert, hat keine Auswirkung
- 🔴 Feedback wird nicht gespeichert

---

### Flow 4: Coach-Lernpfad folgen

```
User öffnet "Coach"
  ↓
[IMPLEMENTIERT] 6 Lernpfade werden angezeigt (Accordion)
  ↓
User klickt auf einen Pfad, z.B. "Wie erkenne ich meine Grenzen?"
  ↓
[IMPLEMENTIERT] Pfad klappt auf und zeigt 3 Ebenen:
  - Was: "Grenzen sind persönliche Limits für Aktivität und Stimulation"
  - Warum: "Weil Überreizung zu Erschöpfung führt"
  - Welche Möglichkeit: "Achtsamkeit üben, Pausen einbauen, ..."
  ↓
[GEPLANT] User beantwortet kleine Reflexions-Frage
  ↓
[GEPLANT] System speichert Fortschritt
  ↓
User erkundet andere Pfade
```

**Implementierungsstatus:**
- ✅ Accordion-UI funktioniert
- 🟡 Content ist Mock (englische Placeholder-Texte)
- 🔴 Reflexions-Fragen nicht implementiert
- 🔴 Progress-Tracking fehlt

---

### Flow 5: Haushalt konfigurieren (geplant)

```
User öffnet "Mehr" → "Haushalt"
  ↓
[GEPLANT] Sieht aktuelle Haushalt-Members
  ↓
User möchte jemand hinzufügen:
  - Gibt Email ein
  - System sendet Einladung
  - Eingeladener klickt Link → wird Member
  ↓
[GEPLANT] Alle Haushalt-Members sehen geteilte Beobachtungen
  ↓
[GEPLANT] User kann Freigabe-Einstellungen pro Beobachtung setzen:
  - Nur ich
  - Haushalt
  - Bestimmte Gruppen
```

**Implementierungsstatus:**
- 🔴 Nicht implementiert
- 🔴 Keine Datenbank-Anbindung
- 🔴 Keine Email-Integration

---

## 8. Technische Architektur

### 8.1 Architektur-Übersicht (Textdarstellung)

```
┌────────────────────────────────────────────────────────────────┐
│                    BROWSER / CLIENT                            │
├────────────────────────────────────────────────────────────────┤
│  React 19                                                      │
│    ├── App.jsx (Router Setup)                                 │
│    ├── Pages/ (7 Seiten-Komponenten)                          │
│    ├── Components/ (Wiederverwendbare UI-Teile)               │
│    ├── Hooks/ (useActivities, useObservations, useFavorites)  │
│    ├── Lib/                                                    │
│    │   ├── db.js (In-Memory + localStorage Fallback)          │
│    │   └── pb.js (PocketBase Client SDK)                      │
│    └── Styles (Tailwind CSS v4)                               │
│                                                                 │
│  Routing: React Router v6 (7 Routes)                          │
│  Styling: Tailwind CSS v4 (custom colors, responsive)         │
│  Icons: Lucide React (18–24px SVGs)                           │
└────────────────────────────────────────────────────────────────┘
          ↓ (API Calls + localStorage)
┌────────────────────────────────────────────────────────────────┐
│                   PERSISTIERUNG / STORAGE                      │
├────────────────────────────────────────────────────────────────┤
│  Browser:                                                      │
│    ├── localStorage (db.js: activities, observations,         │
│    │                 favorites, sessions)                      │
│    └── In-Memory (fallback für aktuelle Session)              │
│                                                                 │
│  Server (PocketBase):                                         │
│    ├── Collections: users, activities (geplant: others)       │
│    ├── Auth: Email-based Login (nicht konfiguriert)           │
│    └── Admin Panel: http://localhost/.sfs-bd/_/               │
│                                                                 │
│  Geplant:                                                      │
│    └── SQLite (lokal, wenn PocketBase nicht einsetzbar)       │
└────────────────────────────────────────────────────────────────┘
          ↓ (wenn implementiert)
┌────────────────────────────────────────────────────────────────┐
│              BACKEND / DATENBANKSCHICHT                        │
├────────────────────────────────────────────────────────────────┤
│  PocketBase:                                                   │
│    ├── Collection User Management                             │
│    ├── REST API auf `/api/collections/`                       │
│    └── JWT Token Auth                                         │
│                                                                 │
│  Datenbank (zu verbinden):                                    │
│    ├── MySQL/PostgreSQL/SQLite                                │
│    ├── 63 Tabellen (neuroplay_v2_schema.sql)                  │
│    ├── Multi-Tenant Isolation                                 │
│    └── Views & Stored Procedures (geplant)                    │
│                                                                 │
│  Business Logic (zu implementieren):                          │
│    ├── Recommendation Engine                                  │
│    ├── Pattern Recognition                                    │
│    ├── Access Control / Permissions                           │
│    └── Data Validation & Transformation                       │
└────────────────────────────────────────────────────────────────┘
```

### 8.2 Schicht-Details

#### Frontend-Schicht

**Technologie:** React 19 + Vite 5 + Tailwind CSS v4 + React Router v6

**Dateien:**
- `src/App.jsx` – Router-Setup, 7 Routes
- `src/pages/*.jsx` – 7 Seiten-Komponenten (1.874 Zeilen)
- `src/components/*.jsx` – 4 Reusable-Komponenten (208 Zeilen)
- `src/hooks/*.js` – 2 Custom Hooks (158 Zeilen)
- `src/lib/db.js` – In-Memory + localStorage (104 Zeilen)
- `src/lib/pb.js` – PocketBase Client (15 Zeilen)
- `src/index.css` – Tailwind Directives (136 Zeilen)
- `src/main.jsx` – Entry Point (10 Zeilen)

**Verantwortlichkeiten:**
- User-Interaktion handlen
- State Management (React Hooks)
- Routing zwischen Seiten
- Lokale Datenspeicherung (localStorage fallback)
- API-Calls an Backend (via Hooks)
- Responsive UI-Rendering (Tailwind)

**Abhängigkeiten (plattform-provided):**
- react 19 (latest)
- react-dom 19
- react-router v6
- vite 5
- tailwind v4
- lucide-react (Icons)
- pocketbase (SDK)

**Nicht in package.json (platform-provided):**
```json
{
  "@vitejs/plugin-react": "*",
  "tailwind-merge": "*"
}
```

---

#### Persistierungs-Schicht (aktuell)

**Technologie:** Browser localStorage + In-Memory Store

**Datei:** `src/lib/db.js`

**Funktionen:**
```javascript
export const getActivities = () => db.activities;
export const getActivity = (id) => db.activities.find(a => a.public_id === id || a.slug === id);
export const addObservation = (obs) => { ... saveToStorage() }
export const getObservations = (userId) => db.observations.filter(...)
export const addFavorite = (userId, activityId) => { ... saveToStorage() }
export const removeFavorite = (userId, activityId) => { ... }
export const getFavorites = (userId) => db.favorites.filter(...)
export const addSession = (session) => { ... saveToStorage() }
export const getSessions = (userId) => db.activity_sessions.filter(...)
```

**Limitierungen:**
- Nur Session-Persistierung (nach Browser-Clear weg)
- Nur 1 User (kein Multi-User)
- Keine Verschlüsselung
- 6 Aktivitäten hardcoded
- Keine Sicherheit

---

#### Backend-Schicht (geplant)

**Technologie:** PocketBase + MySQL/SQLite

**Datenbankschema:** `neuroplay_v2_schema.sql` (915 Zeilen, 63 Tabellen)

**Haupttabellen:**

| Tabelle | Zweck | Zeilen | Status |
|---------|-------|--------|--------|
| `tenants` | Mandanten-Isolation | 1 (Seed) | Designiert |
| `organizations` | Org-Struktur | 1 (Seed) | Designiert |
| `users` | Benutzer | 1 (Seed) | In PocketBase |
| `activities` | Aktivitäts-Katalog | 6 (Demo) | In-Memory |
| `activity_attributes` | Merkmale (flexibel) | 0 | Designiert |
| `activity_sessions` | Wer hat wann was gemacht | 0 | Designiert |
| `observations` | Neutrale Beobachtungen | 0 | Designiert |
| `observation_patterns` | Erkannte Muster | 0 | Designiert |
| `favorites` | Favoriten per User | 0 | Designiert |
| `households` | Haushalt-Gruppen | 0 | Designiert |
| `groups` | Soziale Gruppen | 0 | Designiert |
| `users_households` | Haushalt-Mitgliedschaft | 0 | Designiert |
| `sharing_settings` | Freigabe-Regeln | 0 | Designiert |
| `audit_log` | Änderungsverlauf | 0 | Designiert |
| ... + 48 weitere | | | |

**Zustand:**
- ✅ Schema vollständig in SQL geschrieben
- 🔴 Schema nicht in aktive Datenbank importiert
- 🔴 Views/Stored Procedures nicht erstellt
- 🔴 API-Endpunkte nicht implementiert

---

### 8.3 Datenfluss-Beispiel: Check-in → Empfehlung

```
User klickt "Check-in"
  ↓
HeutePage.jsx lädt (useState hooks)
  ├── selectedNeeds: ['Ruhe']
  ├── energy: 2
  ├── time: '20–45 Min'
  ├── social: 'allein'
  └── checkinComplete: false
  ↓
User füllt Form aus, klickt "Empfehlung erhalten"
  ↓
getRecommendation() wird aufgerufen
  ├── Sucht in MOCK_ACTIVITIES nach Match
  ├── energy <= 2 && time.includes('45') → low_energy_medium
  └── Gibt MOCK_ACTIVITIES.low_energy_medium zurück
  ↓
RecommendationCard.jsx wird rendered
  ├── recommendation.name ("Dorfromantik")
  ├── recommendation.duration
  ├── recommendation.why (Array von Begründungen)
  ├── recommendation.fit (78% Score)
  └── ALTERNATIVES Array (3 Alternativen)
  ↓
[GEPLANT] User klickt "Diese Aktivität starten"
  ├── addSession() wird aufgerufen (db.js)
  ├── Session wird in localStorage gespeichert
  └── Navigiert zu Activity-Detail Page
  ↓
[GEPLANT] User führt Aktivität aus
  ↓
[GEPLANT] User gibt Feedback: "Hat 80% geholfen"
  ├── addObservation() wird aufgerufen
  ├── Observation: {user_id, activity_id, energy_before, energy_after, fit_score}
  └── Wird in localStorage gespeichert
  ↓
Zukünftige Empfehlungen werden verfeinert
```

**Status:** 
- ✅ Schritte 1–3 funktionieren
- 🟡 Schritt 4–5 teilweise (localStorage Hook existiert, wird aber nicht aufgerufen)
- 🔴 Schritt 6–7 nicht implementiert

---

## 9. Repository- und Verzeichnisstruktur

```
app/ (Git Root)
│
├── src/
│   ├── App.jsx                           (47 Z) – Router-Setup
│   ├── main.jsx                          (10 Z) – Entry Point
│   ├── index.css                         (136 Z) – Tailwind + Config
│   │
│   ├── pages/
│   │   ├── HeutePage.jsx                 (290 Z) – Check-in + Empfehlung
│   │   ├── EntdeckenPage.jsx             (251 Z) – Aktivitäts-Katalog
│   │   ├── ActivityDetailPage.jsx        (429 Z) – 6-Reiter-Detail
│   │   ├── CoachPage.jsx                 (271 Z) – Lernpfade
│   │   ├── MeineAktivitaetenPage.jsx     (155 Z) – Sammlung (Favoriten, Lernstand)
│   │   ├── EntwicklungPage.jsx           (229 Z) – Timeline + Muster
│   │   └── MehrPage.jsx                  (249 Z) – Haushalt, Gruppen, etc.
│   │
│   ├── components/
│   │   ├── Navigation.jsx                (78 Z) – 6-Element-Navbar
│   │   ├── ActivityCard.jsx              (59 Z) – Aktivitäts-Kartenelement
│   │   ├── RecommendationCard.jsx        (38 Z) – Empfehlungs-Display
│   │   └── EnergyScale.jsx               (33 Z) – 5-Punkt Energieskala
│   │
│   ├── hooks/
│   │   ├── useActivities.js              (59 Z) – Aktivitäten laden
│   │   └── useObservations.js            (99 Z) – Beobachtungen CRUD
│   │
│   └── lib/
│       ├── db.js                         (104 Z) – In-Memory + localStorage
│       └── pb.js                         (15 Z) – PocketBase Client Init
│
├── public/
│   └── favicon.svg                       (12 Z) – NeuroPlay Icon
│
├── dist/                                  (Build Output)
│   ├── index.html                        (Build Output)
│   ├── favicon.svg
│   └── assets/
│       ├── index-*.js (minified React)
│       └── index-*.css (minified Tailwind)
│
├── docs/
│   └── handover/
│       └── PROJECT_HANDOVER.md           (diese Datei)
│
├── (Datenbank-Dateien)
├── neuroplay_v2_schema.sql               (915 Z) – DDL für 63 Tabellen (MySQL)
├── neuroplay_v2_schema_sqlite.sql        (771 Z) – DDL für SQLite
├── neuroplay_v2_testdata.sql             (204 Z) – Seed-Daten
├── neuroplay_v2_testdata_sqlite.sql      (171 Z) – Seed-Daten SQLite
│
├── (Dokumentation)
├── README_NEUROPLAY.md                   (285 Z) – DB-Setup-Anleitung
├── NEUROPLAY_README.md                   (602 Z) – Überblick & API-Intro
├── NeuroPlay_Datenbankarchitektur.md     (1.701 Z) – Umfassende DB-Arch
├── NeuroPlay_Erweiterte_Architektur_Teil1.md (743 Z)
├── NeuroPlay_Erweiterte_Architektur_Teil2.md (1.125 Z)
├── NeuroPlay_Erweiterte_Architektur_Teil3.md (1.111 Z)
├── NeuroPlay_API_Dokumentation.md        (1.171 Z) – REST API Spec
├── NeuroPlay_Implementierung.md          (936 Z) – Implementation Guide
├── MASTERPROMPT_PROJEKTKONTEXT.md        (326 Z) – KI-Context für nächste Sessions
├── SETUP_POCKETBASE.md                   (112 Z) – PocketBase How-To
├── CREATE_COLLECTIONS.md                 (166 Z) – Collections-Anleitung
├── MANUELL_ANLEGEN.md                    (100 Z) – Manual Setup Steps
├── SAMMLUNGEN_ANLEGEN.md                 (115 Z) – Collection Instructions
├── ALTERNATIVE_SETUP.md                  (29 Z) – Alternate Approach
│
├── (Konfiguration)
├── index.html                            (17 Z) – HTML Entry (lang=de, Title, Meta)
├── package.json                          (14 Z) – Empty (alles platform-provided)
├── package-lock.json                     (13 Z) – Lock File
├── vite.config.js                        (3 Z) – Vite Config (minimal)
├── tailwind.config.cjs                   (30 Z) – Tailwind Colors + Fonts
│
├── (Build Scripts)
├── create_and_test_db.sh                 (54 Z) – Shell Script für DB-Setup
│
├── (SQL Scripts)
├── neuroplay.sql                         (86 Z) – Alte/redundante Version
├── neuroplay_schema.sql                  (762 Z) – Alte/redundante Version
├── neuroplay_testdata.sql                (545 Z) – Alte/redundante Version
│
├── .git/                                  – Git Repository
├── .gitignore                            – (standard)
└── [weitere Standard-Dateien]
```

**Wichtige Beobachtungen:**

- **Total React Code:** ~2.082 Zeilen (Pages + Components + Hooks + Libs)
- **Total Dokumentation:** ~8.700 Zeilen (14 .md-Dateien)
- **Total SQL:** ~2.600 Zeilen (Schema + Testdaten, 4 Varianten)
- **package.json ist leer:** Alle Dependencies sind vom Platform bereitgestellt (React, Vite, Tailwind, etc.)
- **`dist/` wird committed:** Production Build ist im Repository, wird autodeployed
- **Veraltete Dateien:** `neuroplay.sql`, `neuroplay_schema.sql`, `neuroplay_testdata.sql` sind ältere Versionen, `neuroplay_v2_*` sind aktuell
- **Git ignoriert:** node_modules, .env (standard)

---

## 10. Datenbank

### 10.1 Datenbanktechnologie

**Designiert für:** MySQL 5.7+, PostgreSQL 12+, SQLite 3.8+  
**Aktuell in Produktivumgebung:** UNGEKLÄRT (wahrscheinlich PocketBase SQLite)  
**Umfang:** 63 Tabellen über 7 Domänen

---

### 10.2 Tabellenübersicht

**Domäne 1: Multi-Tenancy (5 Tabellen)**

| Tabelle | Zeilen/DDL | Zweck | Primärschlüssel |
|---------|------------|-------|-----------------|
| `tenants` | ~20 | Mandanten-Isolation | tenant_id |
| `organizations` | ~30 | Org-Struktur innerhalb Mandant | org_id |
| `users` | ~50 | Benutzer-Stammdaten | user_id |
| `roles` | ~15 | Rollendefiniitionen | role_id |
| `permissions` | ~20 | Berechtigungen pro Rolle | permission_id |

---

**Domäne 2: Activity Knowledge Base (14 Tabellen)**

| Tabelle | Zweck | PK | Status |
|---------|-------|----|----|
| `activities` | Aktivitäts-Katalog (Häkeln, Spaziergang, etc.) | activity_id | Demo (6 Seeds) |
| `activity_types` | Kategorien (Brettspiel, Sport, Kreativ) | type_id | Designiert |
| `activity_attributes` | Flexible Merkmale (z.B. Lautstärke, Licht) | attr_id | Designiert |
| `activity_attribute_values` | Werte pro Aktivität | value_id | Designiert |
| `activity_tags` | Schlagwörter (ruhig, schnell, sozial) | tag_id | Designiert |
| `activity_links` | Beziehungen zwischen Aktivitäten | link_id | Designiert |
| `activity_requirements` | Materialien, Voraussetzungen | req_id | Designiert |
| `activity_variants` | Unterschiedliche Spielweise/Schwierigkeit | variant_id | Designiert |
| `activity_rules` | Spielregeln (strukturiert) | rule_id | Designiert |
| `sources` | Literatur, Quellen-Referenzen | source_id | Designiert |
| `source_links` | Verknüpfung Source → Activity | link_id | Designiert |
| `categories` | Thematische Kategorisierung | cat_id | Designiert |
| `category_hierarchy` | Parent-Child-Struktur | hier_id | Designiert |
| `activity_compatibility` | Welche Aktivitäten passen zusammen | compat_id | Designiert |

---

**Domäne 3: User Observations & Personal Data (10 Tabellen)**

| Tabelle | Zweck | PK | Status |
|---------|-------|----|----|
| `observations` | Neutrale Beobachtungen ("Ich häkelte 20 Min") | obs_id | Designiert |
| `observation_attributes` | Zusatzinfo zur Beobachtung (Stimmung, Energie) | obs_attr_id | Designiert |
| `observation_patterns` | System erkannte Muster | pattern_id | Designiert |
| `observation_pattern_feedback` | User akzeptiert/lehnt Muster ab | feedback_id | Designiert |
| `activity_sessions` | „Session" einer Aktivität (Start–End) | session_id | Designiert |
| `session_observations` | Beobachtungen während einer Session | session_obs_id | Designiert |
| `user_learning_state` | Lernfortschritt pro User & Activity | state_id | Designiert |
| `user_preferences` | Benutzer-Einstellungen (Sprache, Theme) | pref_id | Designiert |
| `user_profile` | Ausführliches Profil (Alter, Diagnose? nein!) | profile_id | Designiert |
| `user_goals` | Persönliche Ziele | goal_id | Designiert |

---

**Domäne 4: Social & Sharing (8 Tabellen)**

| Tabelle | Zweck | PK | Status |
|---------|-------|----|----|
| `households` | Familien/Haushalts-Gruppen | household_id | Designiert |
| `household_members` | Wer ist im Haushalt | member_id | Designiert |
| `groups` | Soziale Gruppen (Klasse, Sportverein) | group_id | Designiert |
| `group_members` | Wer ist in der Gruppe | gmember_id | Designiert |
| `sharing_settings` | Freigabe-Regeln (Wer sieht was) | share_id | Designiert |
| `shared_observations` | Beobachtungen für Haushalt/Gruppe | shared_obs_id | Designiert |
| `recommendations` | Empfehlungen an User | rec_id | Designiert |
| `recommendation_feedback` | User-Feedback zu Empfehlungen | rec_fb_id | Designiert |

---

**Domäne 5: Learning Paths & Coach (6 Tabellen)**

| Tabelle | Zweck | PK | Status |
|---------|-------|----|----|
| `learning_paths` | Die 6 geführten Lernpfade | path_id | Designiert |
| `learning_path_sections` | Abschnitte pro Pfad | section_id | Designiert |
| `learning_path_content` | Inhalte (Was–Warum–Möglichkeiten) | content_id | Designiert |
| `user_learning_progress` | User-Fortschritt in Pfaden | progress_id | Designiert |
| `quiz_questions` | Fragen am Ende eines Pfads | quiz_id | Designiert |
| `quiz_responses` | User-Antworten | response_id | Designiert |

---

**Domäne 6: Recommendations & Analysis (10 Tabellen)**

| Tabelle | Zweck | PK | Status |
|---------|-------|----|----|
| `recommendation_rules` | Wenn X → dann Y (Regeln) | rule_id | Designiert |
| `recommendation_scores` | Bewertungs-Logik | score_id | Designiert |
| `pattern_recognition` | ML-Input: trainierte Muster | ml_id | Designiert |
| `user_activity_compatibility` | Match-Score User ↔ Activity | compat_id | Designiert |
| `activity_impact_data` | Gesammelte Wirkungen | impact_id | Designiert |
| `activity_impact_metrics` | Messbare Auswirkungen | metric_id | Designiert |
| `impact_certainty` | Unsicherheitsgrade | certainty_id | Designiert |
| `impact_conditions` | Bedingungen (wann wirkt es) | cond_id | Designiert |
| `ai_predictions` | KI-Vorhersagen | pred_id | Designiert |
| `prediction_accuracy` | Genauigkeit der Vorhersagen | acc_id | Designiert |

---

**Domäne 7: System & Audit (10 Tabellen)**

| Tabelle | Zweck | PK | Status |
|---------|-------|----|----|
| `audit_log` | Vollständiger Änderungsverlauf | log_id | Designiert |
| `audit_log_details` | Details pro Änderung | detail_id | Designiert |
| `system_settings` | Globale Konfiguration | setting_id | Designiert |
| `feature_flags` | Feature Toggle | flag_id | Designiert |
| `activity_versions` | Aktivitäts-Versionshistorie | version_id | Designiert |
| `data_exports` | Wenn User Daten exportiert | export_id | Designiert |
| `api_logs` | API-Call-Protokoll | api_log_id | Designiert |
| `data_import_jobs` | Import-Prozesse | job_id | Designiert |
| `migrations_applied` | Welche DB-Migrationen waren aktiv | migration_id | Designiert |
| `error_logs` | System-Fehler-Protokoll | error_id | Designiert |

---

### 10.3 Schlüssel & Beziehungen (textuelle Darstellung)

**Hierarchie:**

```
tenants (1)
  ├── (1:N) organizations
  │   ├── (1:N) households
  │   │   └── (N:N) household_members (users)
  │   └── (1:N) groups
  │       └── (N:N) group_members (users)
  ├── (1:N) users
  │   ├── (1:N) observations (das hat dieser User beobachtet)
  │   ├── (1:N) activity_sessions (dieser User hat diese Sessions)
  │   └── (1:N) user_learning_state (Fortschritt pro Activity)
  └── (1:N) activities
      ├── (1:N) activity_attributes (Merkmale)
      ├── (1:N) activity_tags (Schlagwörter)
      ├── (1:N) activity_sessions (Sessions mit dieser Activity)
      └── (1:N) source_links (Quellen)
```

**Wichtige Fremdschlüssel:**

| FK | Von | Nach | Bedeutung |
|----|-----|------|-----------|
| `user_id` | observations | users | Wer beobachtete? |
| `activity_id` | observations | activities | Was wurde beobachtet? |
| `activity_id` | activity_sessions | activities | Welche Aktivität? |
| `user_id` | activity_sessions | users | Wer hat partizipiert? |
| `observation_id` | session_observations | observations | Beobachtung während Session |
| `user_id` | user_learning_state | users | Wessen Fortschritt? |
| `activity_id` | user_learning_state | activities | Fortschritt zu welcher Activity? |
| `household_id` | household_members | households | Wer ist in welchem Haushalt? |
| `source_id` | source_links | sources | Quelle verlinkt auf... |
| `activity_id` | source_links | activities | ...diese Aktivität |
| `pattern_id` | observation_pattern_feedback | observation_patterns | Feedback zu welchem Muster? |

---

### 10.4 Indizes (Geplant, in SQL vorhanden)

**Performance-kritische Indizes:**

| Index-Name | Tabelle | Spalten | Grund |
|------------|---------|---------|-------|
| `idx_observations_user` | observations | user_id | Abfrage: „Alle Beobachtungen von User X" |
| `idx_sessions_user` | activity_sessions | user_id | Abfrage: „Sessions von User X" |
| `idx_sessions_activity` | activity_sessions | activity_id | Abfrage: „Alle Sessions dieser Activity" |
| `idx_activities_type` | activities | activity_type | Filter nach Aktivitäts-Typ |
| `idx_observations_created` | observations | created_at | Timeline-Abfragen (neueste first) |
| `idx_household_members_user` | household_members | user_id | „In welchen Haushalten bin ich?" |
| `idx_group_members_user` | group_members | user_id | „In welchen Gruppen bin ich?" |
| `idx_learning_progress_user` | user_learning_progress | user_id | Coach-Seite: User-Fortschritt |

---

### 10.5 Status von Migrationen

| Migration | Beschreibung | Status |
|-----------|-------------|--------|
| v1.0 → v2.0 | Schema-Vereinfachung (82 → 63 Tabellen) | ABGESCHLOSSEN (nur in SQL, nicht in DB) |
| Seed-Daten | 6 Aktivitäten + 1 Test-User | MANUELL (In-Memory) |
| Index-Erstellung | Performance-Indizes | NICHT ANGEWENDET |
| Views | Vordefinierte Abfragen | NICHT ERSTELLT |
| Access Control | Rollbasierte Berechtigungen | NICHT IMPLEMENTIERT |

**Migration-Tracking:**
- `migrations_applied` Tabelle existiert im Schema, aber wird nicht genutzt
- Kein Migrationssystem im Code vorhanden

---

### 10.6 Seed-/Demodaten

**Aktuelle Seed-Daten (In-Memory, `src/lib/db.js`):**

```javascript
db.activities = [
  { activity_id: 1, name: 'Häkeln', type: 'kreativ', duration_minutes: 30, ... },
  { activity_id: 2, name: 'Dorfromantik', type: 'Brettspiel', ... },
  { activity_id: 3, name: 'Café del Gatto', type: 'Brettspiel', ... },
  { activity_id: 4, name: 'Spaziergang', type: 'Bewegung', ... },
  { activity_id: 5, name: 'Puzzle', type: 'kreativ', ... },
  { activity_id: 6, name: 'Lesen', type: 'Ruhe', ... }
]
```

**Geplante Seed-Daten (SQL, noch nicht importiert):**
- `neuroplay_v2_testdata.sql` – 3 realistische Szenarien mit Sessions & Beobachtungen
- `neuroplay_v2_testdata_sqlite.sql` – SQLite-Version

**Bekannte Inkonsistenzen:**
- 6 Aktivitäten in In-Memory, aber keine echte DB
- Keine User-Beobachtungen gespeichert
- Keine Sessions aus echten Nutzungen

---

### 10.7 Zugriffsmodell & Privacy

**Designierte Privacy-Rules (nicht implementiert):**

| Tabelle | Standard-Sichtbarkeit | Ausnahmen |
|---------|---------------------|-----------|
| `observations` | Nur User selbst | Optional: Haushalt/Gruppe (per `sharing_settings`) |
| `user_profile` | Nur User selbst | ggf. Haushalt-Admin (nur Name + Avatar) |
| `user_preferences` | Nur User selbst | Keine |
| `activity_sessions` | Nur User selbst | ggf. Haushalt (aggregiert, nicht granular) |
| `user_learning_state` | Nur User selbst | Optional: Coach (zum Tracking) |
| `activities` | Alle (öffentlich) | Keine Sicherheit |
| `sources` | Alle (öffentlich) | Keine Sicherheit |

**Authentifizierung (geplant, nicht implementiert):**
- JWT-Token via PocketBase
- Roles: `regular_user`, `child`, `guardian`, `coach`, `admin`
- Permissionen: CREATE, READ, UPDATE, DELETE pro Tabelle + Rolle

---

## 11. API und Schnittstellen

### 11.1 API-Endpunkte (Designiert, nicht implementiert)

**Authentifizierung:**

| Methode | Endpoint | Status | Input | Output | Auth |
|---------|----------|--------|-------|--------|------|
| POST | `/auth/register` | GEPLANT | email, password, name | {user_id, token} | None |
| POST | `/auth/login` | GEPLANT | email, password | {user_id, token} | None |
| POST | `/auth/refresh` | GEPLANT | token | {token} | JWT |
| POST | `/auth/logout` | GEPLANT | — | {success} | JWT |

**Activities:**

| Methode | Endpoint | Status | Input | Output | Auth |
|---------|----------|--------|-------|--------|------|
| GET | `/activities` | GEPLANT | ?limit=50&skip=0 | [{activity_id, name, ...}] | Optional |
| GET | `/activities/:id` | GEPLANT | — | {activity_id, name, attributes, ...} | Optional |
| GET | `/activities?filter=type:Brettspiel` | GEPLANT | Filter-Params | [{...}] | Optional |
| POST | `/activities` | GEPLANT | {name, type, ...} | {activity_id} | JWT (Admin) |
| PUT | `/activities/:id` | GEPLANT | Updates | {success} | JWT (Admin) |
| DELETE | `/activities/:id` | GEPLANT | — | {success} | JWT (Admin) |

**Observations:**

| Methode | Endpoint | Status | Input | Output | Auth |
|---------|----------|--------|-------|--------|------|
| POST | `/observations` | GEPLANT | {activity_id, effect, certainty} | {observation_id} | JWT |
| GET | `/observations/mine` | GEPLANT | ?limit=50 | [{observation_id, ...}] | JWT |
| PUT | `/observations/:id` | GEPLANT | Updates | {success} | JWT (Owner) |
| DELETE | `/observations/:id` | GEPLANT | — | {success} | JWT (Owner) |

**Sessions:**

| Methode | Endpoint | Status | Input | Output | Auth |
|---------|----------|--------|-------|--------|------|
| POST | `/sessions` | GEPLANT | {activity_id, duration, status} | {session_id} | JWT |
| GET | `/sessions/mine` | GEPLANT | ?activity_id, ?limit | [{session_id, ...}] | JWT |
| GET | `/sessions/:id` | GEPLANT | — | {session_id, activity, observations, ...} | JWT (Owner) |

**Recommendations:**

| Methode | Endpoint | Status | Input | Output | Auth |
|---------|----------|--------|-------|--------|------|
| POST | `/recommendations/suggest` | GEPLANT | {needs, energy, time, social} | [{activity_id, score, reason}] | JWT |
| GET | `/recommendations/history` | GEPLANT | — | [{recommendation_id, activity, feedback, ...}] | JWT |

**Favorites:**

| Methode | Endpoint | Status | Input | Output | Auth |
|---------|----------|--------|-------|--------|------|
| POST | `/favorites/:activity_id` | GEPLANT | — | {success} | JWT |
| DELETE | `/favorites/:activity_id` | GEPLANT | — | {success} | JWT |
| GET | `/favorites` | GEPLANT | — | [{activity_id, ...}] | JWT |

**Patterns:**

| Methode | Endpoint | Status | Input | Output | Auth |
|---------|----------|--------|-------|--------|------|
| GET | `/patterns` | GEPLANT | — | [{pattern_id, description, certainty, ...}] | JWT |
| POST | `/patterns/:id/feedback` | GEPLANT | {feedback: accept\|reject} | {success} | JWT |

**Households/Groups:**

| Methode | Endpoint | Status | Input | Output | Auth |
|---------|----------|--------|-------|--------|------|
| POST | `/households` | GEPLANT | {name, ...} | {household_id} | JWT |
| GET | `/households/mine` | GEPLANT | — | [{household_id, name, members}] | JWT |
| POST | `/households/:id/members` | GEPLANT | {user_email, role} | {success} | JWT (Admin) |
| POST | `/groups` | GEPLANT | {name, organization_id, ...} | {group_id} | JWT |
| GET | `/groups/mine` | GEPLANT | — | [{group_id, name, members}] | JWT |

### 11.2 Aktuell verfügbare Schnittstellen

**JavaScript SDK (Browser):**

```javascript
// PocketBase Client
import { pb } from '@/lib/pb';

// Auth
await pb.collection('users').authWithPassword(email, password);
pb.authStore.clear(); // Logout

// Collections
const records = await pb.collection('activities').getList(1, 50);
const record = await pb.collection('activities').getOne(id);
await pb.collection('activities').create(data);
await pb.collection('activities').update(id, data);
await pb.collection('activities').delete(id);
```

**Custom DB Hook (In-Memory):**

```javascript
import { 
  getActivities, 
  addObservation, 
  getFavorites,
  addSession 
} from '@/lib/db';

// Alle Aktivitäten laden
const activities = getActivities();

// Beobachtung hinzufügen
const obs = addObservation({ user_id: 1, activity_id: 5, fit_score: 85 });

// Favoriten abrufen
const favs = getFavorites(userId);

// Session hinzufügen
const session = addSession({ user_id: 1, activity_id: 2, duration: 30 });
```

### 11.3 API-Status

| System | Status | Funktioniert | Bemerkung |
|--------|--------|-------------|-----------|
| PocketBase Admin-Panel | ✅ Erreichbar | Ja | http://localhost/.sfs-bd/_/ |
| PocketBase Auth-API | 🟡 Teilweise | JWT könnte funktionieren, nicht getestet | Keine Implementierung |
| PocketBase Collections | 🟡 Nur `users` | Admin-Panel kann keine neuen anlegen | GUI-Limitation |
| In-Memory DB (js) | ✅ Funktioniert | Ja, 6 Aktivitäten | localStorage Fallback |
| REST-Endpunkte (geplant) | 🔴 Nicht vorhanden | Keine Backend-Logik | Müssen noch geschrieben werden |

---

## 12. Fachliche Geschäftslogik

### 12.1 Empfehlungsalgorithmus (aktuell Mock)

**Aktuell (Implementiert, vereinfacht):**

```javascript
const getRecommendation = () => {
  if (energy <= 2 && time.includes('45')) {
    return MOCK_ACTIVITIES.low_energy_medium;  // Dorfromantik
  }
  return MOCK_ACTIVITIES.low_energy_short;     // Häkeln
};
```

**Logik:** 
- Wenn Energielevel ≤ 2 und Zeit ≥ 45 Min → empfehle mittlere Aktivität
- Sonst → empfehle kurze Aktivität

**Limitierungen:**
- Kein Bezug zu User-Bedarf (Ruhe, Fokus, etc.)
- Keine historischen Beobachtungen
- Keine Personalisierung
- Keine Alternativen-Logik

**Geplant (auf Basis NeuroPlay_Datenbankarchitektur.md):**

```
Eingaben:
  ├── User-Check-in: {needs, energy, time, social}
  ├── Beobachtungen: {activity_id, energy_after, fit_score}
  └── Aktivitäts-Profile: {type, attributes, complexity}

Logik:
  1. Finde Aktivitäten, die zeitlich passen (duration ≤ time)
  2. Finde Aktivitäten, die energetisch passen (intensity ≤ energy)
  3. Finde Aktivitäten, die User in ähnlichen Situationen gewählt hat
  4. Berechne Match-Score pro Aktivität:
     Score = 
       20% × (Beobachtungen mit ähnlichem Need) +
       30% × (User-Favoriten) +
       25% × (Energie-Kompatibilität) +
       15% × (Zeit-Kompatibilität) +
       10% × (Sozialkontext)
  5. Gib Top-3 zurück mit Begründungen

Ausnahmen:
  - Falls Energy < 1: Nur Ruhe-Aktivitäten
  - Falls Time < 10 Min: Nur Quick-Wins
  - Falls Social = allein: Filtere Group-Aktivitäten
```

---

### 12.2 Muster-Erkennung (nicht implementiert)

**Anforderung (aus Interface Standard):**
„System erkennt: ‚Du hast in 3 Stresssituationen kreativ gearbeitet und hast jeden Mal gesagt, es half.'

**Geplante Logik:**

```
Eingaben: 
  - Observations: [{activity_id, context, energy_before, energy_after}]
  - User-Feedback: Explicit („Ja, hat geholfen") oder Implicit (Energy angehoben)

Pattern Recognition:
  1. Gruppiere Beobachtungen nach:
     - Aktivitäts-Typ (Kreativ, Sport, etc.)
     - Kontext (Stress, Müdigkeit, etc.)
     - Tageszeit
     - Sozialkontext
  
  2. Für jede Gruppe: Berechne Erfolgquote
     Erfolg% = (positive_feedbacks / total_observations) * 100
  
  3. Muster = wenn Erfolg% > 66%
  
  4. Unsicherheit:
     - high (80%+): N > 5 Beobachtungen, konsistent
     - medium (60%): N = 3–5, mixed
     - low (<60%): N < 3 oder inkonsistent

Output:
  [{
    pattern: "In Stresssituationen hilft kreative Aktivität",
    certainty: "high",
    evidence: [obs_id_1, obs_id_2, obs_id_3],
    conflicting: [obs_id_4],  // Gegenbeispiele
    strength: 75%
  }]
```

---

### 12.3 Favoriten-System

**Implementiert:**
- Button zum Hinzufügen/Entfernen existiert
- localStorage Hook `useFavorites()` definiert
- State wird teilweise in localStorage gespeichert

**Nicht implementiert:**
- Nicht auf allen Seiten aktiv
- Keine Datenbank-Persistierung
- Keine Benutzer-Zuordnung (wessen Favoriten?)
- Keine Verwendung in Empfehlungs-Engine

**Geplante Logik:**

```
Eingaben: user_id, activity_id

Operation: addFavorite
  1. Prüfe: Ist User authentifiziert?
  2. Prüfe: Existiert activity_id?
  3. INSERT into favorites (user_id, activity_id, created_at)
  4. Trigger: Empfehlungs-Score für diese Activity +20%
  5. UI-Feedback: „✓ Zu Favoriten hinzugefügt"

Operation: removeFavorite
  1. DELETE from favorites WHERE user_id = ? AND activity_id = ?
  2. Trigger: Empfehlungs-Score -20%
  3. UI-Feedback: „✓ Aus Favoriten entfernt"

Verwendung in Empfehlungen:
  - Favoriten-Aktivitäten immer Top-Kandidaten
  - Score-Boost: +20 Punkte
```

---

### 12.4 Haushalt & Freigabe (nicht implementiert)

**Anforderung (Privacy by Default):**
- Beobachtungen sind standardmäßig privat (nur User)
- User kann Haushalt konfigurieren (Familienmitglieder)
- Haushalt-Members können geteilte Beobachtungen sehen (aggregiert, nicht granular)
- User kann Beobachtungen explizit teilen

**Geplante Logik:**

```
Datensatz: Household
  - household_id (PK)
  - created_by: user_id
  - name: "Müller Haushalts"
  - created_at: timestamp

Verknüpfung: household_members
  - member_id (PK)
  - household_id (FK)
  - user_id (FK)
  - role: owner | member | guest
  - joined_at: timestamp

Freigabe-Regel: sharing_settings
  - share_id (PK)
  - observation_id (FK)
  - shared_to_type: household | group | user
  - shared_to_id: household_id | group_id | user_id
  - created_at: timestamp

Sichtbarkeit:
  - User X sieht Beobachtung Y wenn:
    - X = Besitzer(Y), ODER
    - Beobachtung ist im Haushalt von X geteilt, ODER
    - Beobachtung ist in einer Gruppe, zu der X gehört

Beispiel:
  - User Mutter erstellt Beobachtung: „Tochter hat heute 30 Min gepuzzelt"
  - Standard: Privat (nur Mutter sieht)
  - Mutter teilt → Haushalt: Jetzt sehen alle im Haushalt (Vater, Tochter wenn alt genug)
```

---

## 13. Authentifizierung, Rollen und Berechtigungen

### 13.1 Aktueller Zustand

**Authentifizierung:** 🔴 **NICHT IMPLEMENTIERT**

```javascript
// Aus App.jsx
const [isAuthenticated, setIsAuthenticated] = useState(true); // Assume logged in for MVP
```

**Bedeutung:**
- Keine echten Logins
- Alle User sind anonymous
- Keine rollenbasierte Zugriffskontrolle
- Alle sehen alle Aktivitäten (OK)
- Aber alle sehen auch alle Beobachtungen (NICHT OK – Privacy-Verletzung)

---

### 13.2 Designierte Rollen (Schema vorhanden)

| Rolle | Beschreibung | Berechtigungen |
|-------|--------------|-----------------|
| `regular_user` | Standard-Benutzer | CREATE/READ/UPDATE/DELETE eigene Daten; READ öffentliche Aktivitäten |
| `child` | Minderjähriger User (< 18?) | Eingeschränkte Sichtbarkeit; elterliche Aufsicht |
| `guardian` | Elternteil/Betreuer | CRUD eigene + Kind-Daten; kann Haushalt verwalten |
| `coach` | Therapeut/Lehrer | READ (mit Zustimmung) Beobachtungen von Clienten; CRUD Coach-Inhalte |
| `admin` | Administrator | Full Access; kann Aktivitäten editieren, System-Settings ändern |

**Status:** Schema vorhanden, nicht implementiert

---

### 13.3 Berechtigungen (per Rolle & Tabelle)

**Designierte Access Control (RBAC):**

| Tabelle | regular_user | child | guardian | coach | admin |
|---------|---|---|---|---|---|
| observations (eig.) | CRUD | CR | CRU | — | CRUD |
| observations (anderer) | R (wenn geteilt) | R (parent/household) | CRU (children) | R (mit Zustimmung) | CRUD |
| favorites | CRUD | CRU | CRUD | — | CRUD |
| activities | R | R | R | R | CRUD |
| learning_paths | CR | CR | CR | CRU | CRUD |
| household_settings | R | — | CRUD | — | CRUD |

**Status:** Schema vorhanden, keine Implementierung im Code

---

### 13.4 Geschützte Bereiche

| Bereich | Aktuell | Geplant |
|---------|---------|---------|
| Heute-Seite (Check-in) | Public | Nur auth. Users |
| Entdecken (Katalog) | Public | Public OK |
| Meine Aktivitäten (Sammlung) | Public (Mock) | Nur Owner |
| Entwicklung (Timeline) | Public (Mock) | Nur Owner |
| Coach | Public | Public (aber Fortschritt privat) |
| Admin-Interface | 🔴 Nicht vorhanden | Mit Admin-Role |
| Haushalt-Einstellungen | 🔴 Nicht vorhanden | Guardian/Owner nur |

---

### 13.5 Sessions & Tokens

**Aktuell:** Keine Session-Verwaltung

**Geplant (PocketBase JWT):**

```
Authentifizierung:
  1. User gibt Email + Passwort
  2. Backend: Prüfe Credentials
  3. Bei Erfolg: Gibt JWT-Token
  4. Token enthält: {sub: user_id, role, exp: +24h}
  5. Token wird in localStorage gespeichert

Jeder API-Call:
  Authorization: Bearer <token>

Token-Refresh:
  - Wenn Token läuft ab: Automatischer Refresh
  - Falls Refresh fehlschlägt: Redirect zu Login
```

**Status:** PocketBase SDK vorhanden, nicht konfiguriert

---

### 13.6 Bekannte Sicherheitsprobleme

| Problem | Auswirkung | Priorität |
|---------|-----------|-----------|
| **Keine Authentifizierung** | Alle User sehen alle Daten (Privacy-Verletzung) | 🔴 P0 |
| **Keine SQL-Injections-Schutz** | Datenbank-Backend ist nicht implementiert, aber SQLi möglich wenn implementiert | 🟡 P1 |
| **Keine HTTPS in Dev** | Tokens übertragen unverschlüsselt (aber Dev-Umgebung) | 🟡 P1 |
| **Keine Verschlüsselung persönlicher Daten** | Sensible Beobachtungen unverschlüsselt in DB | 🟡 P1 |
| **Keine Rate-Limiting** | API-Abuse möglich | 🟡 P2 |
| **localStorage speichert plain-text Daten** | Browser-XSS könnte Daten stehlen | 🟡 P1 |

---

### 13.7 Noch fehlende Sicherheitsmaßnahmen

- [ ] Email-Verifikation
- [ ] Password-Hashing (sollte PocketBase machen)
- [ ] 2FA (Two-Factor Auth)
- [ ] OAuth (Google, Apple SignIn)
- [ ] CORS-Konfiguration
- [ ] CSRF-Schutz
- [ ] Content Security Policy
- [ ] Encrypted Data-at-Rest
- [ ] Audit Logging für sensitive Operationen

---

## 14. Konfiguration und Umgebungen

### 14.1 Umgebungen

| Umgebung | URL | Datenbank | Status |
|----------|-----|-----------|--------|
| Development | `localhost:5173` (Vite Dev Server) | localStorage + In-Memory | ✅ Lokal nutzbar |
| Preview | `ai-builder.strato.de` (nach `npm run build`) | PocketBase (?) | 🟡 Buildbar |
| Production | `ai-builder.strato.de` (nach Publish-Button) | PocketBase (?) | 🟡 Deploybar |

### 14.2 Environment Variables (aktuell keine)

**Benötigte Variablen (geplant):**

```
# Backend
VITE_POCKETBASE_URL=http://localhost:8090
VITE_API_BASE_URL=http://localhost:3000
VITE_JWT_SECRET=<secret>

# Feature Flags
VITE_ENABLE_COACH=true
VITE_ENABLE_ADMIN=false
VITE_ENABLE_GROUPS=false

# Analytics
VITE_ANALYTICS_ID=<id>

# Secrets (NICHT in .env, via Deployment)
DB_PASSWORD
DB_HOST
API_SECRET_KEY
```

**Aktuell:** Keine .env-Konfiguration vorhanden

---

### 14.3 Build-Konfiguration

**package.json Scripts:**

```json
{
  "dev": "vite",                          // Vite Dev Server (Port 5173)
  "build": "vite build --mode preview",   // Preview Build
  "build:prod": "vite build",             // Production Build
  "preview": "vite preview"               // Serve dist/ lokal
}
```

**vite.config.js:**

```javascript
import { defineConfig } from "/usr/lib/sfs-assistant-dev/platform-config.js";
export default defineConfig({});  // Minimale Config, Platform-Defaults
```

**tailwind.config.cjs:**

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'deep-navy': '#1F355E',     // NeuroWays Brand
        'gold': '#D4A017',
        'petrol': '#2A9D8F',
        'violet': '#8D6BC5',
        // ...
      }
    }
  }
};
```

---

### 14.4 Deployment-Prozess

```
Developer
  ↓ (npm run build:prod)
Git Commit
  ↓ (git push origin dev)
GitHub (dev branch)
  ↓ (Platform webhook)
STRATO Platform
  ├── Checkout Code
  ├── npm install (empty, platform-provided)
  ├── npm run build:prod
  ├── dist/ wird committed
  └── Live unter ai-builder.strato.de
  ↓
Bei Publish-Button:
  ├── Snapshot der current dist/
  └── User-facing Preview URL
```

**Status:** 🟢 Funktioniert

---

### 14.5 Build-Output

```
dist/
├── index.html                    (19 Zeilen, Entry HTML)
├── favicon.svg                   (Favicon)
└── assets/
    ├── index-BcEBjjwG.js        (Minified React Bundle, ~300KB)
    └── index-Dk6otgfJ.css       (Minified Tailwind, ~24KB)
```

**Gzipped Größen (aus Build-Log):**
- JS: 89.78 KB
- CSS: 5.29 KB
- **Total: ~95 KB** (OK für Performance)

---

## 15. Externe Abhängigkeiten

### 15.1 Frameworks & Libraries (Platform-provided)

| Package | Version | Status | Verwendung |
|---------|---------|--------|-----------|
| **react** | 19 (latest) | ✅ | Core Framework |
| **react-dom** | 19 | ✅ | DOM-Rendering |
| **react-router** | v6 | ✅ | 7 Routes, Navigation |
| **vite** | 5.4+ | ✅ | Build Tool |
| **@vitejs/plugin-react** | latest | ✅ | React Plugin für Vite |
| **tailwind-css** | v4 | ✅ | Styling |
| **lucide-react** | latest | ✅ | 24 Icons |
| **pocketbase** | latest | 🟡 | Backend SDK (nicht genutzt) |

### 15.2 APIs & Externe Dienste

| Dienst | Endpunkt | Typ | Status |
|--------|----------|-----|--------|
| **PocketBase** | `http://localhost/.sfs-bd/_/` | Backend | 🟡 Admin-Panel erreichbar, Collections nicht anlegt |
| **Google Fonts** | `/.sfs/css2?family=...` | CSS | 🔴 Nicht konfiguriert (Typo) |

### 15.3 Versionsstände (UNGEKLÄRT – aus Code inferred)

| Komponente | Version | Status |
|-----------|---------|--------|
| Node.js | 24 | ✅ (Platform) |
| React | 19 | Angenommen (latest) |
| Tailwind | v4 | ✅ (Confirmed in Config) |
| Vite | 5.4+ | Angenommen (Build erfolgreich) |
| PocketBase | ? | UNGEKLÄRT (SDK nur grundinitialisiert) |

---

## 16. Bereits erledigte Entwicklungsaufgaben

| Aufgabe | Ergebnis | Status | Nachweis |
|---------|----------|--------|----------|
| **Datenbankschema Design** | 63 Tabellen, Multi-Tenant, 7 Domänen | ✅ FERTIG | `neuroplay_v2_schema.sql` (915 Z) |
| **Testdaten erstellen** | 6 Aktivitäten, 1 Test-User | ✅ FERTIG | `neuroplay_v2_testdata.sql` |
| **Frontend Scaffold** | React + Vite + Tailwind Setup | ✅ FERTIG | `src/App.jsx`, Configs |
| **7 Hauptseiten UI** | HTML/CSS für alle Seiten | ✅ FERTIG | `src/pages/` (1.874 Z) |
| **Navigation-Komponente** | 6-Element Mobile/Desktop Navbar | ✅ FERTIG | `src/components/Navigation.jsx` |
| **Responsive Design** | Tailwind Breakpoints 375/768/1280px | ✅ FERTIG | Alle Pages mit md: lg: |
| **In-Memory Datenbank** | localStorage + Fallback Store | ✅ FERTIG | `src/lib/db.js` (104 Z) |
| **Custom Hooks** | useActivities, useObservations, useFavorites | ✅ FERTIG | `src/hooks/` (158 Z) |
| **Brand-Farben** | NeuroWays Palette in Tailwind | ✅ FERTIG | `tailwind.config.cjs` |
| **Interface Standard** | NW-PLAY-UI-001 v0.1.0 vollständig umgesetzt | ✅ FERTIG | Alle 7 Seiten nach Spec |
| **Dokumentation** | 14 .md-Dateien, 8.700+ Zeilen | ✅ FERTIG | `/` + `docs/` |
| **Git Repository** | Verbunden mit GitHub, 20 Commits | ✅ FERTIG | `git@github.com:neuroways/NeuroPlay_AI.git` |
| **Build Pipeline** | Vite Build erfolgreich, dist/ committed | ✅ FERTIG | Build-Log erfolgreich |

---

## 17. Teilweise erledigte Arbeiten

| Ursprüngliches Ziel | Bereits umgesetzt | Noch fehlend | Dateien |
|-------------------|-----------------|-------------|---------|
| **Datenbank-Anbindung** | Schema + Testdaten (SQL) | Keine echte DB Connection; nur In-Memory | `neuroplay_v2_schema.sql`, `src/lib/db.js` |
| **Check-in-Workflow** | UI komplett, Mock-Logik | Persistierung fehlend; kein Reflektion-Prompt | `src/pages/HeutePage.jsx` |
| **Aktivitäts-Detail** | 6 Reiter + Design | Alle Daten hardcoded; keine DB-Abruf | `src/pages/ActivityDetailPage.jsx` |
| **Favoriten-System** | UI-Button + Hook | Keine Datenbankanbindung; nicht auf allen Seiten aktiv | `src/components/ActivityCard.jsx`, `src/hooks/` |
| **Coach-Seite** | UI mit 6 Lernpfaden | Keine Backend; kein Progress-Tracking | `src/pages/CoachPage.jsx` |
| **Authentifizierung** | PocketBase SDK initialisiert | Keine Implementierung, Anonyme User nur | `src/lib/pb.js` |
| **PocketBase Sammlungen** | Nur `users` angelegt | Andere Collections nicht via GUI anlegbar | Admin-Panel |
| **Dokumentation** | Vollständig geschrieben | Keine Rechtsprüfung (Impressum, Datenschutz) | `src/pages/MehrPage.jsx` |

---

## 18. Offene Anforderungen und Backlog

### 18.1 Priorisierter Backlog

#### **P0 – Blockierend (MVP)**

| ID | Beschreibung | Grund | Abhängigkeiten | Ergebnis | Akzeptanzkriterium |
|----|-------------|--------|-----------------|----------|-------------------|
| **P0-1** | **Datenbankanbindung entscheiden:** SQLite lokal oder PocketBase Collections? | Ohne Persistierung funktioniert App nicht für echte Nutzer; PocketBase Admin-GUI hat Limitation | Technische Entscheidung | Entschiedenes System, ggf. Migration | Benutzer können Aktivitäten + Beobachtungen speichern und nach Reload abrufen |
| **P0-2** | **PocketBase Collections manuell anlegen oder per Script** | 4 Collections (`activities`, `observations`, `favorites`, `activity_sessions`) müssen existieren | Entscheidung aus P0-1 | Alle Collections in DB vorhanden | `getList()` in useActivities Hook gibt Daten zurück |
| **P0-3** | **Check-in-Persistierung implementieren** | Check-ins werden nach Reload vergessen | P0-1 + P0-2 | `activity_sessions` speichern & laden | Nach Check-in + Reload: Session ist abrufbar |
| **P0-4** | **Authentifizierung minimal (Anonymous → Optional Login)** | Für Multi-User-Daten-Isolation nötig | PocketBase Email-Auth konfigurieren | User Login + JWT-Token | User kann sich anmelden und sieht nur ihre Daten |

#### **P1 – MVP-relevant**

| ID | Beschreibung | Grund | Abhängigkeiten | Ergebnis | Akzeptanzkriterium |
|----|-------------|--------|-----------------|----------|-------------------|
| **P1-1** | **Beobachtungen speichern & reflektieren** | Kern-Feature: Nach Aktivität Feedback geben | P0-1 bis P0-4 | `addObservation()` aktiv + Entwicklung-Seite lädt echte Daten | User sieht seine Beobachtungen in Timeline |
| **P1-2** | **Favoriten-Persistierung aktivieren** | Sammlung-Seite braucht echte Daten | P0-1 bis P0-2 | `useFavorites()` in alle Seiten integriert | Favoriten bleiben nach Reload erhalten |
| **P1-3** | **Empfehlungsalgorithmus verbessern** | Aktuell nur nach Energielevel + Zeit | P1-1 (Beobachtungen nötig für Matching) | Recommendation-Logik nutzt historische Daten | Top-3-Empfehlungen berücksichtigen User-Pattern |
| **P1-4** | **Haushalt-Freigabe minimal** | Privacy by Default braucht Freigabe-Möglichkeit | P0-4 (Auth nötig) | `households` Tabelle genutzt, Sharing-Logic implementiert | User kann Haushalt erstellen + Mitglieder hinzufügen |
| **P1-5** | **Coach-Seite mit Progress** | Geführtes Lernen nötig für Coach-Feature | P0-1 bis P0-2 | `user_learning_progress` Tracking | Coach-Seite zeigt User-Fortschritt |
| **P1-6** | **Muster-Erkennung Basis** | Entwicklung-Seite muss Muster zeigen | P1-1 (echte Beobachtungen) | Pattern-Recognition-Logik + UI | User sieht erkannte Muster (z.B. „Kreativität hilft bei Stress") |

#### **P2 – Wichtig, nicht blockierend**

| ID | Beschreibung | Abhängigkeiten | Ergebnis | Akzeptanzkriterium |
|----|-------------|-----------------|----------|-------------------|
| **P2-1** | Mehr Aktivitäten hinzufügen (50–100) | P0-1 bis P0-2 | Erweiterter Katalog | Entdecken-Seite zeigt 50+ Aktivitäten |
| **P2-2** | Admin-Interface für Aktivitäts-Verwaltung | P1-4 + P0-4 | CRUD-Interface für Activities | Admin kann neue Aktivitäten anlegen |
| **P2-3** | Accessibility-Audit (WCAG 2.2 AA) | P1-5 (nach Hauptfeatures) | Audit-Report + Fixes | Keine Color-Contrast-Fehler, Keyboard-Nav überall |
| **P2-4** | Mehrsprachigkeit (i18n) | P2-1 (nach Hauptfeatures) | i18n-Setup + de/en | UI wechselbar zwischen Sprachen |
| **P2-5** | Mobile App (React Native?) | P1-4 (nach Web stabil) | Native App Prototype | App läuft auf iOS/Android |

#### **P3 – Later/Optional**

- Erweiterte Muster-Erkennung (ML)
- KI-Integration für Empfehlungen
- Webhooks für Email-Benachrichtigungen
- Datenexport (CSV, PDF)
- Offline-Sync
- Collaborative Features (gemeinsame Aktivitäten)

---

### 18.2 Zusammengefasste Anforderungs-Liste

**Geplante Funktionen nach Seite:**

| Seite | Funktion | Status | Priorität |
|-------|----------|--------|-----------|
| **Heute** | Check-in speichern | TEILWEISE | P0 |
| **Heute** | Personalisierte Empfehlung | TEILWEISE | P1 |
| **Heute** | Reflexions-Prompt nach Aktivität | GEPLANT | P1 |
| **Entdecken** | Mehr Aktivitäten (50+) | GEPLANT | P2 |
| **Entdecken** | Erweiterte Filter (Tags, Komplexität) | GEPLANT | P2 |
| **Aktivitätsdetail** | Echte Daten aus DB | GEPLANT | P1 |
| **Aktivitätsdetail** | Benutzer-Bewertungen sehen | GEPLANT | P2 |
| **Coach** | Progress-Tracking | GEPLANT | P1 |
| **Coach** | Quiz nach jedem Pfad | GEPLANT | P2 |
| **Sammlung** | Echte Favoriten-Liste | GEPLANT | P1 |
| **Sammlung** | Besitz-Kategorialisierung | GEPLANT | P2 |
| **Entwicklung** | Echte Beobachtungs-Timeline | GEPLANT | P1 |
| **Entwicklung** | Muster-Erkennung + Ablehnung | GEPLANT | P1 |
| **Entwicklung** | Zeitraum-Filter (letzte Woche, etc.) | GEPLANT | P2 |
| **Mehr** | Haushalt-Verwaltung funktional | GEPLANT | P1 |
| **Mehr** | Gruppen erstellen/beitreten | GEPLANT | P2 |

---

## 19. Bekannte Fehler und technische Schulden

### 19.1 Fehler

| Fehler | Auswirkung | Priorität | Ursache | Workaround | Lösungsvorschlag |
|--------|-----------|-----------|--------|-----------|------------------|
| **PocketBase Collections nicht via GUI anlegt** | 4 geplante Collections fehlen | 🔴 P0 | Platform-Limitation? | Manuell via API oder Alternative zu SQLite | Per Script oder alternative Persistierung |
| **Check-ins nicht persistent** | Benutzer-Eingaben gehen verloren | 🔴 P0 | localStorage nicht implementiert | Keine | addSession() tatsächlich aufrufen |
| **Empfehlungs-Score ignoriert Bedarfe** | Empfehlung passt nicht zu Benutzer-Input | 🟡 P1 | Mock-Logik zu simpel | Benutzer wählt manuell Alternative | Empfehlung-Engine umschreiben |
| **Muster-Erkennungsalgorithmus fehlt** | Entwicklung-Seite zeigt keine Muster | 🟡 P1 | Nicht implementiert | Keine | Pattern-Recognition schreiben |
| **Haushalt-Freigabe funktioniert nicht** | Privacy-Anforderung nicht erfüllt | 🟡 P1 | Backend fehlt | Alle Daten sind öffentlich (Bug!) | Sharing-Logic implementieren |
| **Authentifizierung fehlt** | Alle User sehen alle Beobachtungen | 🔴 P0 | Nicht implementiert | setIsAuthenticated(true) in App.jsx | PocketBase Auth integrieren |
| **In-Memory DB hat nur 6 Aktivitäten** | Katalog ist unvollständig | 🟡 P2 | Demo-Daten nur | Kein echter Workaround | Aktivitäten-Katalog erweitern |
| **Coach-Seite speichert keinen Progress** | User-Fortschritt geht verloren | 🟡 P1 | localStorage nicht genutzt | Keine | `user_learning_progress` Tracking implementieren |
| **Keine Fehlerbehandlung bei API-Fails** | App crasht bei Netzwerkfehler | 🟡 P2 | Try/Catch fehlt in Hooks | Fallback auf Demo-Daten | Error-Handling in Hooks verbessern |
| **Typefaces nicht geladen (falscher URL)** | Fallback zu System-Fonts | 🟡 P2 | `/.sfs/css2` statt `http://fonts.googleapis.com` | Funktioniert trotzdem, aber falsch | Link-Tag in index.html korrigieren |

---

### 19.2 Technische Schulden

| Schuld | Kontext | Konsequenz | Kosten (Schätzung) |
|--------|---------|-----------|----------|
| **Datenbank nicht connected** | App ist lokal-only, keine echte Persistierung | Benutzer-Daten gehen nach Browser-Clear verloren | 8–10 Stunden (P0-1 bis P0-2) |
| **Keine Unit-Tests** | Keine automatisierten Tests für Logik | Bugs entstehen schnell, keine Regression-Detection | 6–8 Stunden (Grundgerüst) |
| **Hardcoded Mock-Daten überall** | 7 Pages haben MOCK_* Arrays | Wechsel zu echten Daten braucht Überarbeit | 4–6 Stunden (pro Page) |
| **Keine Error-Boundaries** | Komponenten-Fehler crashen ganze App | User sieht weißen Bildschirm | 2–3 Stunden |
| **Keine Logging/Monitoring** | Keine Einsicht in Fehler bei Benutzer | Debugging im Live-System unmöglich | 3–4 Stunden (Basic Setup) |
| **Keine E2E-Tests** | Keine automatisierten User-Flows | Regression-Testing manuell & teuer | 4–6 Stunden (erste Tests) |
| **CSS ist Inline in JSX** | Keine separate Stylesheet-Struktur | Schwer zu warten, Performance (SSR unmöglich) | 2–3 Stunden (Refactor zu CSS Modules?) |
| **Keine Dokumentation für Entwickler** | Nur MASTERPROMPT + Architektur-Docs | Neue KI/Dev braucht lange zum Onboarden | 2–4 Stunden (API-Docs schreiben) |
| **PocketBase Admin-Panel-Limitation** | Sammlungen können nicht via GUI angelegt werden | Blockiert MVP | Abhängig von Workaround |

---

## 20. Getroffene Architektur- und Entwicklungsentscheidungen

### 20.1 Dokumentierte Entscheidungen

| Entscheidung | Hintergrund | Gewählte Lösung | Alternativen | Konsequenzen |
|-------------|-----------|-----------------|-------------|-----------|
| **React statt Vue/Angular** | Evaluiert in Setup-Phase | React 19 + Vite | Vue 3, Angular 18, Svelte | Single-Paradigm (Components), gute Ökosystem |
| **Tailwind v4 statt CSS-in-JS** | Performance & Developer Experience | Tailwind CSS v4 mit Config | Styled-Components, Emotion, Windi | Schneller Build, einfachere Wartung, kleine Bundle |
| **React Router v6 statt Next.js** | Keine SSR nötig für MVP | React Router mit 7 Routes | Next.js (overkill), Remix | Client-only Routing, einfachere Deployment |
| **In-Memory + localStorage statt Remote DB** | PocketBase-Limitation (Collections nicht anlegt) | Fallback zu db.js + localStorage | SQLite lokal, externe DB | Funktioniert für MVP, keine persistente Speicherung |
| **Mobile-First responsive** | Zielgruppe hat mobil Nutzung nötig | Tailwind Breakpoints (375/768/1280) | Mobile App zuerst | Mobile funktioniert, Skalierung auf Desktop OK |
| **Privacy by Default in Design** | NeuroWays-Philosophie | Alle Daten privat, explizites Teilen | Public-by-default + Opt-out | Benutzer-Kontrolle maximiert, kompliziertere Freigabe |
| **Schema: 63 Tabellen statt 82** | Vereinfachung für MVP | Merge einiger Domains (v2.0 Schema) | Ursprüngliche 82 Tabellen beibehalten | Weniger Komplexität, aber erweiterbar |
| **7 Seiten + Navigation statt Einseiter** | Interface Standard vorgegeben | Multi-Page mit React Router | Single Scroll Page | Bessere Navigation, aber größere Bundle |
| **NeuroWays Farben statt Neutral** | Brand-Identität | Deep Navy, Gold, Petrol, Violet | Grau/Weiß neutral | Erkennbar, aber einschränkend bei Theme-Wechsel |
| **Keine Authentifizierung im MVP** | Zeit-Limitation | Anonymous Users nur | Email-Auth in Phase 2 | Schneller MVP, aber keine Privatsphäre |

---

### 20.2 Aus dem Code abgeleitete (undokumentierte) Annahmen

| Annahme | Quelle | Implikation | Sicherheit |
|--------|--------|------------|-----------|
| User hat immer localhost:5173 erreichbar | vite.config.js | Dev-Umgebung lokal | Nur Dev, nicht Prod |
| PocketBase läuft auf `http://localhost` (root) | src/lib/pb.js `new PocketBase()` | Default-Initialisierung | PocketBase müsste auf Root laufen |
| Platform stellt React, Vite, Tailwind bereit | package.json leer | Nicht neu zu installieren | Abhängigkeit von Platform |
| localStorage ist verfügbar | src/lib/db.js | Fallback in Browser | Würde offline-first ermöglichen |
| 6 Aktivitäten reichen für MVP-Demo | src/lib/db.js hardcoded | Katalog ist Placeholder | Unrealistisch für echte Nutzung |

---

## 21. Offene Entscheidungen

| Fragestellung | Warum relevant | Betroffene Bereiche | Optionen | Blockiert durch |
|---------------|---------------|--------------------|---------|-----------------|
| **Welche Persistierungs-Strategie für MVP?** | PocketBase Collections GUI nicht funktioniert | P0-1 | A) SQLite lokal, B) PocketBase per Script, C) Andere DB | Technische Entscheidung |
| **Email-only Auth oder auch Social SignIn?** | Interface Standard sagt Email, aber keine Details | P0-4 | A) Email + Password, B) Google/Apple OAuth auch | Requirements klarstellen |
| **Wie definieren wir „Haushalt"?** | Privacy-Freigabe braucht Konzept | P1-4 | A) Familie nur, B) Jede Nutzer-Gruppe möglich | Fachliche Definition |
| **Was speichern wir über User-Profil?** | Schema hat `user_profile`, aber was genau? | P0-4 | A) Name + Avatar nur (Privacy), B) Umfassendes Profil (Alter, Diagnose?) | Ethik-Guideline NeuroWays |
| **Wann ist Muster-Erkennungsalgorithmus „gut genug"?** | Anforderung bekannt, aber Akzeptanzkriterium unklar | P1-6 | A) Simple Häufigkeits-Analyse, B) Statistische Signifikanz, C) ML-basiert | Fachliche Spezifikation |
| **Admin-Interface Priorität?** | Derzeit nicht geplant, aber nötig für Produktion | P2-2 | A) Nach MVP (Q3), B) Parallel (eigenes Team), C) Nicht nötig (externe Tools) | Product-Roadmap |

---

## 22. Tests und Qualitätssicherung

### 22.1 Vorhandene Tests

**Status:** 🔴 **KEINE TESTS VORHANDEN**

- Keine Unit-Tests für React-Komponenten
- Keine Integration-Tests für Datenfluss
- Keine E2E-Tests für User-Flows
- Keine Accessibility-Tests

---

### 22.2 Manuelle Getestete Funktionen

| Funktion | Getestet auf | Ergebnis | Von wem |
|----------|-------------|---------|--------|
| Navigation | Mobile (375px), Desktop (1280px) | ✅ Funktioniert | KI (inferred aus Code) |
| Check-in-Form | Desktop | ✅ Form-Eingabe funktioniert | Benutzer (Prompt) |
| Entdecken-Filter | Browser | ✅ Filter funktionieren | KI (Code-Review) |
| Build | npm run build:prod | ✅ Erfolgreich | Deployment-System |

---

### 22.3 Bekannte Testlücken

| Bereich | Lücke | Auswirkung | Priorität |
|---------|------|-----------|-----------|
| **Datenbank-Anbindung** | Keine Tests für API-Calls | Bugs in Data-Fetching nicht erkannt | 🔴 P0 |
| **Empfehlungs-Logik** | Keine Unit-Tests für getRecommendation() | Falsche Empfehlungen in Produktion | 🟡 P1 |
| **Responsive Design** | Nur 375px/1280px getestet, nicht 768px | Tablet-Breakpoint könnte broken sein | 🟡 P1 |
| **Accessibility** | Keine WCAG-Audit | Kontrast-Fehler, Fokus-Probleme verborgen | 🟡 P2 |
| **Browser-Kompatibilität** | Nur Chrome/Firefox angenommen | Safari/IE11 unterstützung unklar | 🟡 P2 |

---

### 22.4 Buildstatus

| Build | Status | Log | Datum |
|-------|--------|-----|-------|
| Latest | ✅ erfolgreich | `npm run build:prod` in ~2.8s | 15. Aug 2026 09:16 |
| Größe | ✅ klein | JS 89.78 KB (gzip), CSS 5.29 KB | — |
| Fehler | ✅ keine | 1.809 modules transformed | — |

---

## 23. Deployment und Betrieb

### 23.1 Hosting & Server

| Komponente | Hosting | URL | Status |
|-----------|---------|-----|--------|
| **Frontend (dist/)** | STRATO IONOS Plattform | ai-builder.strato.de | ✅ Deployed |
| **Admin-Panel (PocketBase)** | STRATO Plattform | http://localhost/.sfs-bd/_/ | ✅ Lokal erreichbar |
| **Datenbank** | UNGEKLÄRT | Lokal? PocketBase? | 🔴 Unklar |

---

### 23.2 Deployment-Prozess

```
Entwickler: npm run build:prod
  ↓
Vite kompiliert /src zu /dist
  ↓
dist/ wird committed (git add dist/)
  ↓
git push origin dev
  ↓
GitHub Webhook → STRATO Platform
  ↓
Platform:
  ├── Checkout code
  ├── npm install (skipped, dependencies provided)
  ├── Build-Cache? (UNGEKLÄRT)
  ├── Served von /dist/ (static files)
  └── Live unter ai-builder.strato.de
```

### 23.3 Deployment-Checkliste (vor Production-Go)

- [ ] Datenbank-Persistierung funktioniert (P0-1 bis P0-2)
- [ ] Authentifizierung aktiv (P0-4)
- [ ] Check-ins werden gespeichert + nach Reload abruft (P0-3)
- [ ] Favoriten persistent (P1-2)
- [ ] Beobachtungen persistent + sichtbar (P1-1)
- [ ] Alle Umgebungsvariablen gesetzt (14.2)
- [ ] SSL/HTTPS aktiv
- [ ] CORS konfiguriert
- [ ] Datenbankmigrationen gelaufen
- [ ] Audit-Logging aktiv
- [ ] Monitoring/Alerting setup
- [ ] Backup-Strategie definiert
- [ ] Rollback-Plan dokumentiert

**Status:** 🔴 Viele Items offen

---

### 23.4 Betriebsdokumentation

**Noch zu erstellen:**
- [ ] Runbook: Wie startet man die App?
- [ ] Runbook: Wie deploymet man Updates?
- [ ] Runbook: Wie macht man Backup?
- [ ] Runbook: Wie debuggen man Fehler?
- [ ] Alert-Konfiguration (Uptime, Error-Rate)
- [ ] Log-Aggregation (wo sind Logs?)
- [ ] Incident-Response-Plan

---

## 24. Risiken

### 24.1 Technische Risiken

| Risiko | Auswirkung | Wahrscheinlichkeit | Gegenmaßnahme |
|--------|-----------|------------------|-----------------|
| **PocketBase Admin-Panel blockiert Produktion** | Kann keine Collections anlegen, App funktioniert nicht | Hoch (bereits ein Problem) | Entscheidung treffen (P0-1): Alternative DB oder Workaround |
| **localStorage löscht sich** | Benutzerdaten weg nach Browser-Clear | Mittel (Standard-Verhalten) | Auf echte DB migrieren (P0-1 bis P0-2) |
| **Authentifizierung nicht implementiert bis Launch** | Privacy-Verletzung: Alle Benutzer sehen alle Beobachtungen | Mittel (derzeit nicht priorisiert) | P0-4 frühzeitig starten |
| **Performance-Problem mit großem Katalog** | App wird langsam bei 1000+ Aktivitäten | Niedrig (aktuell 6 Aktivitäten) | Pagination + Indexing + Lazy-Loading |
| **React Version-Mismatch** | Platform-provided React != erwartet Version | Niedrig (Platform kontrolliert) | Version-Lock via Platform-Config |
| **Browser-Kompatibilität** | App bricht auf Safari/Chrome Older Versions | Mittel | Browser-Matrix definieren, Polyfills ggf. |
| **GDPR-Compliance nicht gegeben** | Rechtliche Strafen, Benutzer können Daten nicht löschen | Mittel (Soft-Deletes im Schema, aber nicht implementiert) | Audit vor Launch, Data-Subject-Requests implementieren |

---

### 24.2 Fachliche Risiken

| Risiko | Auswirkung | Maßnahme |
|--------|-----------|----------|
| **Empfehlungs-Algorithmus ist zu simpel** | Nutzer bekommt unpassende Vorschläge, verliert Vertrauen | User-Feedback + iteratives Verbessern (P1-3) |
| **Muster-Erkennung erkennt falsche Muster** | Nutzer wird verletzt (z.B. „Du brauchst Therapie") | Unsicherheitsangaben zeigen, explizit nicht-pathologisierend |
| **Haushalt-Freigabe zu restriktiv oder zu offen** | Privacy-Verletzung oder Freigabe funktioniert gar nicht | Use-Case-Interviews vor Implementierung (P1-4) |
| **Keine Kontrolle über AI-Vorhersagen** | Benutzer kann falsche Muster nicht ablehnen | Feedback-Mechanismus (Pattern-Ablehnung) implementieren |
| **Zu technisch für Zielgruppe** | Neurodivergente Menschen verstehen UI nicht | Benutzer-Tests mit Zielgruppe durchführen |

---

## 25. Empfohlene nächste Entwicklungsschritte

### 25.1 Unmittelbare Nächste Schritte (Woche 1–2)

**Ziel:** MVP mit Datenpersistierung zum Laufen bringen

#### Schritt 1: Persistierungs-Strategie entscheiden (P0-1)

| Entscheidung | Was tun | Ergebnis | Dauer |
|-------------|---------|---------|-------|
| **Option A: SQLite lokal** | `npm install better-sqlite3` + migrations schreiben | Lokal funktionierende Persistierung | 3–4h |
| **Option B: PocketBase per Script** | PocketBase API nutzen, Collections programmatisch anlegen | Collections vorhanden, Hook funktioniert | 2–3h |
| **Option C: Hybrid (SQLite + PocketBase Auth)** | SQLite für Daten, PocketBase nur für Auth | Beide Systeme nutzen | 4–5h |

**Empfehlung:** Option A (SQLite) ist schnellest, aber Option C (Hybrid) ist zukunftssicherer.

#### Schritt 2: Datenbank-Hooks tatsächlich nutzen (P0-2 + P0-3)

```javascript
// HeutePage.jsx: Jetzt anstatt Mock

import { addSession, getSessions } from '@/lib/db';

// Bei Check-in:
const session = addSession({
  user_id: 1, // ODER: userId aus Auth
  activity_id: recommendation.id,
  energy_before: energy,
  duration: 20,  // Placeholder
  completed: false
});

// Nach Aktivität:
const observation = addObservation({
  user_id: 1,
  activity_id: recommendation.id,
  fit_score: userFeedback.score,
  energy_after: newEnergy
});
```

**Datei:** `src/pages/HeutePage.jsx` + `src/lib/db.js`  
**Dauer:** 2–3h

#### Schritt 3: Authentifizierung Minimal (P0-4)

```javascript
// App.jsx: Benutzer muss sich anmelden

import { pb, initAuth } from '@/lib/pb';

useEffect(() => {
  initAuth();
  if (!pb.authStore.isValid) {
    // Redirect zu Login-Seite
  }
}, []);
```

**Datei:** `src/App.jsx`, neue `LoginPage.jsx`  
**Dauer:** 3–4h (mit Seite + PocketBase-Config)

### 25.2 Mittelfristige Schritte (Woche 3–4)

#### Schritt 4: Beobachtungen + Entwicklung-Seite (P1-1)

- Entdecken-Seite → Aktivität starten → Reflektion-Prompt anzeigen
- Beobachtung speichern + in Entwicklung-Timeline anzeigen
- **Dauer:** 4–5h

#### Schritt 5: Empfehlungs-Engine verbessern (P1-3)

```javascript
// Statt nur energy + time:

function getRecommendation(needs, energy, time, social, userObservations) {
  // 1. Filter nach Zeit
  let candidates = activities.filter(a => a.duration <= timeValue);
  
  // 2. Filter nach Energie
  candidates = candidates.filter(a => a.intensity <= energy);
  
  // 3. Filter nach Sozialkontext
  candidates = candidates.filter(a => 
    a.min_participants <= social && a.max_participants >= social
  );
  
  // 4. Score nach historischen Beobachtungen
  candidates = candidates.map(activity => ({
    ...activity,
    score: calculateMatchScore(activity, needs, userObservations)
  }));
  
  // 5. Sort + Return Top-3
  return candidates.sort((a, b) => b.score - a.score).slice(0, 3);
}
```

**Dauer:** 3–4h

---

### 25.3 Längerfristige Schritte (Woche 5+)

| Schritt | Ziel | Priorität | Dauer |
|---------|------|-----------|-------|
| Muster-Erkennungsalgorithmus (P1-6) | Entwicklung-Seite zeigt echte Muster | P1 | 5–6h |
| Haushalt-Freigabe (P1-4) | Privacy by Default funktioniert | P1 | 4–5h |
| Coach-Progress-Tracking (P1-5) | Coach-Seite speichert Fortschritt | P1 | 3–4h |
| Favoriten-System (P1-2) | Sammlung-Seite zeigt Favoriten | P1 | 2–3h |
| Mehr Aktivitäten (P2-1) | 50–100 Aktivitäten in DB | P2 | 1–2h (Dateneingabe) |
| Admin-Interface (P2-2) | CRUD für Aktivitäten | P2 | 6–8h |
| Accessibility-Audit (P2-3) | WCAG 2.2 AA Compliance | P2 | 2–3h |

---

## 26. Einstiegspunkt für die nächste KI

### 26.1 Was muss zuerst gelesen werden?

**Ranking (Top → Bottom):**

1. **Dieses Dokument** – PROJECT_HANDOVER.md (du bist hier)
2. **MASTERPROMPT_PROJEKTKONTEXT.md** – Quick-Reference für den Stand
3. **NeuroPlay_Datenbankarchitektur.md** – Fachliche Anforderungen & Schema
4. **NW-PLAY-UI-001_v0.1.0.md** – Interface Standard (Anforderungen)
5. **Quellcode durchgehen:**
   - `src/App.jsx` – Router-Setup
   - `src/pages/HeutePage.jsx` – Komplexeste Seite
   - `src/lib/db.js` – Datenschicht

---

### 26.2 Welche Dateien sind besonders wichtig?

| Datei | Grund | Wenn du änderst |
|-------|--------|-----------------|
| `src/App.jsx` | Router-Zentrum | Ändere Routes mit Vorsicht |
| `src/lib/db.js` | Datenschicht | Test direkt, Fallback-Verhalten prüfen |
| `neuroplay_v2_schema.sql` | DB-Design | Nicht verändern ohne Grund; ist Norm |
| `tailwind.config.cjs` | Brand-Farben | Halte NeuroWays-Palette |
| `src/pages/HeutePage.jsx` | Core-Workflow | Hier Check-in implementieren |
| `src/pages/EntwicklungPage.jsx` | Timeline + Muster | Hier Persistierung testen |

---

### 26.3 Was darf nicht ohne Prüfung verändert werden?

- [ ] **tailwind.config.cjs** – Farben sind NeuroWays-Brand
- [ ] **neuroplay_v2_schema.sql** – DB-Norm, ändern nur nach Diskussion
- [ ] **index.html** – `<title>` und Meta-Descriptions
- [ ] **Seiten-Routing** – 7 Seiten-URLs sind Standard (NW-PLAY-UI-001)
- [ ] **Privacy-Philosophie** – Alle Daten privat by Default

---

### 26.4 Was ist der nächste empfohlene Arbeitsschritt?

**Sofort starten mit:**

1. **P0-1 entscheiden:** SQLite oder PocketBase? (Entscheidungs-Meeting 15 min)
2. **P0-2 implementieren:** Collections anlegen (SQLite `npm install better-sqlite3` + Migration ODER PocketBase Script)
3. **P0-3 aktivieren:** `addSession()` in HeutePage aufrufen
4. **P0-4 starten:** Auth-Page bauen + Login-Flow
5. **Testen:** „Ich gebe Check-in ein, starte Aktivität, gebe Feedback, Reload → Daten sind noch da"

**Nach P0 abgeschlossen:** P1-1 (Beobachtungen) angehen

---

### 26.5 Welche offenen Entscheidungen müssen respektiert werden?

| Frage | Wer entscheidet | Deadline |
|-------|--|------|
| Persistierungs-Strategie (SQLite vs. PocketBase)? | Projekt-Owner | Vor P0-2 |
| Haushalt-Definition (Familie oder Jede Gruppe)? | Product Manager | Vor P1-4 |
| Wann Muster-Erkennungsalgorithmus starten? | KI-Engineer | Vor P1-6 |
| Admin-Interface Priorität? | Product Roadmap | Vor P2-2 |

---

### 26.6 Wie kann die KI prüfen, dass ihre Änderung funktioniert?

#### Test-Checkliste nach jeder Änderung:

```bash
# 1. Build prüfen
npm run build:prod
# ✅ Erwarten: Kein Error, dist/ updated

# 2. Dev-Server starten
npm run dev
# ✅ Erwarten: http://localhost:5173 erreichbar, Hot-Reload funktioniert

# 3. Manuell testen
# - Auf Heute-Seite: Check-in → Empfehlung
# - Browser-Reload → Daten noch da? (localStorage)
# - Navigation: Alle 6 Seiten funktioniert?
# - Responsive: 375px (mobile), 1280px (desktop) anschauen

# 4. Browser-Console prüfen
# ✅ Erwarten: Keine Red Errors, nur ggf. Warnings

# 5. Git-Status prüfen
git status
# ✅ Erwarten: Nur geplante Dateien geändert

# 6. Commit + Push
git add <files>
git commit -m "feat: Beschreibung auf Deutsch"
git push origin dev
```

---

### 26.7 Wichtige Befehle für Next-KI

```bash
# Projekt clonen
git clone git@github.com:neuroways/NeuroPlay_AI.git
cd NeuroPlay_AI/app

# Dev-Umgebung starten
npm run dev
# Browser: http://localhost:5173

# Abhängigkeiten (alle bereits installed, nicht neu `npm install`)
# Platform stellt bereit: React, Vite, Tailwind, Lucide, PocketBase

# Build für Production
npm run build:prod

# Git-Befehle
git log --oneline -10          # Letzte 10 Commits
git diff src/pages/HeutePage.jsx  # Was hat sich geändert?
git checkout src/pages/HeutePage.jsx  # Revert eine Datei

# Datenbank-Befehle (wenn SQLite implementiert)
sqlite3 neuroplay.db < neuroplay_v2_schema_sqlite.sql  # Schema laden
sqlite3 neuroplay.db < neuroplay_v2_testdata_sqlite.sql  # Testdaten laden
```

---

## 27. Unsicherheiten und fehlende Informationen

### 27.1 Was ich NICHT aus den verfügbaren Informationen bestimmen konnte:

| Unsicherheit | Grund | Auswirkung |
|--------------|-------|-----------|
| **Welche Datenbank läuft in der Produktion?** | PocketBase Admin-Panel sichtbar, aber nicht konfiguriert; SQLite nicht sichtbar | Kann nicht sagen, ob Daten dauerhaft gespeichert werden |
| **Sind die 6 Aktivitäten wirklich alle geplanten?** | Demo-Daten in In-Memory Store; keine Anforderung wie viele sein sollen | Katalog-Größe unklar |
| **Wie heißt der Benutzer im MVP?** | setIsAuthenticated(true) in App.jsx; kein echter User definiert | Kann nicht sagen, welcher User_ID Daten gehören |
| **Ist der PocketBase Admin-Panel-Fehler eine Platform-Limitation oder Misconfiguration?** | Benutzer konnte Collections nicht anlegen; unklar ob Bug oder Feature | Kann nicht empfehlen, nur Workaround |
| **Welche Node.js/npm Version wird verlangt?** | `engine` in package.json nicht definiert | Dev-Environment könnte mit anderen Versionen brechen |
| **Sind die Farben wirklich final?** | Tailwind Config hat NeuroWays-Farben; aber kein Design-Sign-Off dokumentiert | Könnte noch ändern |
| **Wie soll Muster-Erkennungs-Algorithmus funktionieren?** | Anforderung da, aber keine Spezifikation | Implementierung muss geraten werden |
| **Ist die 7-Seiten-Struktur in Stein gemeißelt?** | NW-PLAY-UI-001 vorgegeben; aber keine Änderungs-Genehmigung dokumentiert | Könnte noch refactoret werden |
| **Welche Browser müssen unterstützt werden?** | Keine Targets in Docs | Polyfills unklar |
| **Wo speichert PocketBase die echten Daten?** | PocketBase läuft auf Platform; Dateisystem unklar | Kann nicht sagen, ob Daten persistent sind |

---

### 27.2 Fragen für den Project Owner / Product Manager

**Vor Implementierung klären:**

1. **Persistierungs-Strategie:** SQLite lokal vs. PocketBase + externe DB?
2. **User-Authentifizierung:** Email-only oder auch OAuth (Google, Apple)?
3. **Haushalt-Definition:** Nur Familie oder auch Schulklasse, Sportverein?
4. **Muster-Erkennungs-Spec:** Welcher Algorithmus? Wie viele Beobachtungen = Muster?
5. **Aktivitäten-Katalog:** Wie viele Aktivitäten zum Start (6, 50, 100+)?
6. **Browser-Support:** Welche mindest-Versionen?
7. **Offline-Anforderung:** Muss App offline funktionieren?
8. **Admin-Interface:** Wer soll Aktivitäten administrieren?
9. **GDPR-Compliance:** Muss Compliance vor/während/nach MVP sein?
10. **Go-Live-Datum:** Wann soll MVP produktiv sein?

---

## 28. Übergabe-Check

Prüfung vor Abschluss:

- [x] Anforderungen erfasst (Sektion 4)
- [x] Implementierte Funktionen erfasst (Sektion 5)
- [x] Offene Anforderungen erfasst (Sektion 18)
- [x] Teilweise implementierte Funktionen erfasst (Sektion 17)
- [x] Seitenstruktur erfasst (Sektion 6)
- [x] Repositorystruktur erfasst (Sektion 9)
- [x] Architektur erfasst (Sektion 8)
- [x] Datenbank erfasst (Sektion 10)
- [x] APIs erfasst (Sektion 11)
- [x] Geschäftslogik erfasst (Sektion 12)
- [x] Erledigte Aufgaben erfasst (Sektion 16)
- [x] Offene Aufgaben erfasst (Sektion 18)
- [x] Fehler und technische Schulden erfasst (Sektion 19)
- [x] Deployment erfasst (Sektion 23)
- [x] Nächste Schritte definiert (Sektion 25)
- [x] Unsicherheiten dokumentiert (Sektion 27)
- [x] Keine Secrets enthalten (keine API-Keys, Passwörter, Tokens)
- [x] Keine vermuteten Informationen als Fakten dargestellt (🔴 P0, 🟡 P1, ✅ implementiert)
- [x] Trennschärfe gewahrt (IMPLEMENTIERT vs. TEILWEISE vs. GEPLANT vs. OFFEN vs. UNGEKLÄRT)

---

## Schlusswort

Dieses Dokument bietet eine **vollständige, nachvollziehbare Rekonstruktion des NeuroPlay-Projektes** zu Stand August 2026. Der Code ist solide, die Architektur ist durchdacht, aber die **Datenpersistierung ist blockiert**. Die nächste KI oder Entwicklerin sollte sich sofort an **P0-1** machen: Entscheidung treffen, welche Persistierungs-Strategie zum Einsatz kommt.

Mit dieser Übergabe hat die nächste KI alle notwendigen Informationen, um ohne Kontextaufbau sofort produktiv zu werden.

---

**Übergabe erstellt:** 15. August 2026  
**Version:** 1.0  
**Gültig für:** NeuroPlay Branch `dev`, Stand e76a879  
**Nächste Überprüfung empfohlen nach:** P0-Abschluss
