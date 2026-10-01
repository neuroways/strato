# PROJECT HANDOVER – Kurse_AI

## 1. Dokumentinformationen

| Feld | Wert |
|------|------|
| **Projektname** | kurse_ai – Kurs- und Anmeldeplattform |
| **Datum dieser Übergabe** | 15. August 2026 |
| **Aktueller Entwicklungsstand** | Phase 1 abgeschlossen: Oberflächenprototyp mit Mock-Daten |
| **Hauptverantwortung** | NeuroWays gGmbH |
| **Repository** | https://github.com/neuroways/kurse_ai (HTTPS) |
| **Repository Branch** | main |
| **Verwendete Technologien** | React 18 + Vite + Tailwind CSS v4 + React Router 6 + lucide-react |
| **Entwicklungsumgebung** | IONOS STRATO AI Platform (Node 24) |
| **Hosting/Deployment** | IONOS STRATO static file hosting (`/dist/` wird served) |
| **Zweck dieser Übergabe** | Vollständige Rekonstruktion des aktuellen Standes für Projektkontinuität und Handoff an weitere KI oder Entwickler |

---

## 2. Executive Project Summary

### Was ist das Projekt?

Eine zentrale, digitale **Kurs- und Anmeldeplattform** für NeuroWays gGmbH, die Informationsverluste bei Kursbuchungen verhindert, Wartelisten intelligent verwaltet und Verwaltung, Kursleitungen sowie Familien auf einem einheitlichen, aktuellen Informationsstand hält.

### Problem, das gelöst wird

**Ausgangssituation:**
- Anmeldungen gehen nicht an oder verspäten sich
- Bestätigungen und Rückfragen verlieren sich in E-Mail-Fluten
- Absagen werden übersehen oder nicht mitgeteilt
- Freie Plätze werden zu spät erkannt
- Personen auf Wartelisten rücken nicht nach, obwohl Plätze frei werden
- Kurzfristige Änderungen erreichen Kursleitungen nicht oder verzögert
- Teilnehmerlisten zwischen verschiedenen Stellen unterscheiden sich

### Lösung

Die Plattform wird zur **verbindlichen Informationsquelle**:
- Eine Änderung gilt als erfasst, sobald sie in der Plattform gespeichert ist
- E-Mail/SMS sind nur Benachrichtigungswege, nicht der Datensatz
- Jeder relevante Vorgang bekommt Zeitstempel, Statushistorie und verantwortliche Person
- Alle Rollen (Admin, Kursleitung, Familien) sehen die gleichen aktuellen Daten

### Wer benutzt es?

**Drei Hauptrollen mit je eigener Oberfläche:**

1. **Administration** – Kurse erstellen, Anmeldungen verwalten, Kapazitäten steuern, Wartelisten & Nachrückverfahren anstoßen, Kurse absagen
2. **Kursleitung** – Kursideen einreichen, Live-Teilnehmerzahlen sehen, kurzfristige Änderungen erkennen, zulässige Teilnehmerdaten einsehen
3. **Familie/Teilnehmer** – Personen anmelden, Status verfolgen, abmelden, Zahlungen verwalten, Kalender & Zeitleisten einsehen

### Wo befindet sich die Entwicklung aktuell?

**Phase 1: Oberflächenprototyp — ABGESCHLOSSEN**
- Alle drei Rollen sind in der Benutzeroberfläche prototypisiert
- Mock-Daten für realistische Demo vorhanden
- Responsive Design für Mobile (375px), Tablet (768px), Desktop (1280px)
- Keine echte Datenspeicherung, keine Authentifizierung
- Fokus: Bedienung, Statusdarstellung, Workflows verstanden

**Nächste Phasen (noch zu implementieren):**
- Phase 2: Datenanbindung & PocketBase-Schema
- Phase 3: Regelprüfung & Validierung
- Phase 4: Platzvergabe & Nachrückverfahren
- Phase 5: Halbjahresprogramm & Exporte
- Phase 6: Benachrichtigungen & Eskalationen
- Phase 7: Datenschutz & Audit

---

## 3. Fachliches Zielbild

### Bestätigte Anforderungen (aus Spezifikation)

Das System soll folgende Objekttypen verwalten:

1. **Kursvorschlag** – Ursprüngliche Idee der Kursleitung mit Planungsbogen
2. **Kurs** – Wiederverwendbares fachliches Angebot (z. B. „Aquarellmalen für Anfänger")
3. **Kursdurchführung** – Konkrete Durchführung in einem Halbjahr (Frühjahr/Sommer 2027)
4. **Termin** – Einzelner Veranstaltungstermin (z. B. Montag 15:00-16:30)
5. **Programmausgabe** – Halbjährliches Programmheft (versioniert)
6. **Kundenkonto** – Familie, Einzelperson, Firma oder Institution
7. **Person** – Tatsächlicher Teilnehmer (Kind oder Erwachsener)
8. **Buchung** – Gemeinsamer Anmeldevorgang (z. B. eine Familie meldet sich zu einem Kurs an)
9. **Teilnahmeanmeldung** – Status einer einzelnen Person in einer Buchung (Bestätigt/Warteliste/Angebot)
10. **Platzposition** – Belegter regulärer oder Wartelistenplatz

**Zentrale Anforderung:** Diese Trennung ist besonders wichtig bei Familienkursen, bei denen mehrere Personen gemeinsam angemeldet werden, aber individuelle Status haben können.

### Fachliche Funktionsbereiche (geplant, nicht alle implementiert)

#### A. Kursentstehung & Programmplanung

**Kursvorschlagsquellen:**
- Excel-Import (aus bestehendem System)
- Administrationsformular
- Übernahme aus früherem Halbjahr
- Kursleitung-Vorschlag über Planungsbogen

**Digitaler Planungsbogen (Anforderung):**
- Kursleitung, Kontaktdaten
- Arbeits- + Veröffentlichungstitel (getrennt)
- Originalbeschreibung + redaktionelle Beschreibung (getrennt versioniert)
- Zielgruppe, Alter, Voraussetzungen
- Gewünschte Termine, Uhrzeiten
- Anzahl Termine, Unterrichtseinheiten
- Standort, Raum, Ausstattung
- Mindest- & Höchstteilnehmerzahl
- Material- & Zusatzkosten
- Hinweise & mitgebrachte Dinge

**Vorschlagsstatus:**
- Entwurf → eingereicht → in Prüfung → Rückfrage → in Redaktion → genehmigt → vorgemerkt → abgelehnt → in Kurs überführt

#### B. Anmeldung & Regelprüfung

**Unterstützte Regeln (Anforderung):**
- Mindest- & Höchstalter (mit Altersstichtag, normalerweise erster Kurstermin)
- Nur Erwachsene / Nur Kinder / Familienkurs
- Mindestens ein Erwachsener je Familie
- Mindestens ein Erwachsener je Kind
- Höchstens X Kinder je Erwachsenem
- Mindest- & Höchstzahl je Familienbuchung
- Weitere Voraussetzungen / Nachweise

**Ungültige Kombinationen** müssen vor Absenden verständlich erklärt werden. Admin-Ausnahmen sind möglich, müssen aber begründet & protokolliert werden.

#### C. Kapazität & erste Vergabe

**Für jede Kursdurchführung definiert die Admin:**
- Reguläre Plätze
- Wartelistenplätze
- Mindestteilnehmerzahl
- Anmeldezeitraum (Beginn & Ende)
- Absagefrist
- Vergabeverfahren (Eingangsreihenfolge, Losverfahren, etc.)

**Automatischer Vergabevorschlag:**
- Anmeldungen sortieren (z. B. nach Eingang)
- Erste N Anmeldungen → regulärer Platz
- Nächste M Anmeldungen → Warteliste
- Rest → kein Platz verfügbar (Anmeldung gestoppt)

**Admin kann:**
- Reihenfolge und Vorschlag bearbeiten
- Jede Abweichung mit Grund protokollieren

**Erst nach Admin-Bestätigung:**
- Werden endgültige Ergebnisse sichtbar
- Benachrichtigungen ausgelöst

#### D. Absagen

**Absage durch Teilnehmer (Anforderung):**
- Bis Frist: direkte Stornierung möglich
- Nach Frist: keine direkte Absage mehr möglich, nur Absageanfrage möglich
- Absageanfrage erscheint als dringende Aufgabe im Admin-Dashboard

**Jede Absage protokolliert:**
- Betroffene Person & Teilnahme
- Zeitpunkt
- Ausführende Person
- Fristeinhaltung (Ja/Nein)
- Optionaler Grund
- Mögliche Gebührenfolge
- Zahl der frei gewordenen Plätze

**Absage durch Admin:**
- Nur Admin kann komplette Kursdurchführung absagen
- Alle Termine werden markiert, alle Teilnahmen aktualisiert
- Kursleitung & Betroffene werden benachrichtigt
- Laufende Nachrückverfahren werden beendet
- Grund & Zeitpunkt dokumentiert
- Kurs & Anmeldungen bleiben in Historie erhalten

#### E. Nachrückverfahren (Kernfeature)

**Reguläres Nachrücken (außerhalb letzter 14 Tage):**
- Nach Wartelistenreihenfolge arbeiten
- Nächste geeignete Person erhält befristetes Platzangebot

**Kurzfristiges Nachrücken (letzte 14 Tage vor Kursbeginn) — beschleunigtes Verfahren:**
1. Absage erzeugt freien Platz
2. Dashboard informiert Admin sofort
3. Admin startet Nachrückrunde
4. Ausgewählte ODER alle Wartenden erhalten Platzangebot gleichzeitig
5. Angebot mit klarer Annahmefrist
6. Erste verbindliche Annahmen erhalten die verfügbaren Plätze
7. Sobald alle Plätze vergeben sind, schließt System automatisch
8. Übrige Wartenden werden informiert

**Kritisch:**
- Parallele Zugriffe müssen abgesichert sein (keine Doppelvergabe von Plätzen)

#### F. Halbjahresprogramm

**Versionierte Programmausgabe** (z. B. „Frühjahr/Sommer 2027") enthält:
- Fachbereiche & Kapitel
- Ausgewählte Kursdurchführungen
- Reihenfolge
- Anmeldebeginn & -schluss
- Veröffentlichungszeitraum
- Redaktionelle Fassung
- Freigabe- & Veröffentlichungsstatus

**Aus denselben Daten sollen entstehen:**
- Öffentliches Online-Programm
- Barrierefreies PDF
- Excel / Redaktions-Export

#### G. Datenschutz & Datenfreigaben (Anforderung — nicht vollständig geklärt)

**Wichtige Unterscheidung:**
1. **Notwendige Verarbeitung** für Anmeldung/Vertragsabwicklung
   - Braucht Rechtsgrundlage (nicht scheinbar freiwillige Einwilligung)
   - Transparent dokumentieren
2. **Optionale Datenfreigaben** (getrennt):
   - Zusätzliche Angaben für Kursleitung
   - Direkte Kommunikation durch Kursleitung
   - Marketing / Folgekommunikation
3. **Einwilligungen müssen:**
   - Standardmäßig deaktiviert sein
   - Empfänger, Zweck, Datenumfang nennen
   - Versioniert gespeichert werden
   - Widerrufbar sein
   - Bei Kindern: Vertretungsberechtigung beachten

**Status:** Datenschutzrechtlich noch nicht geprüft; sollte vor Implementierung klärt werden, insbesondere bei Kindern.

#### H. Barrierefreie Bedienung (NeuroWays-Standard)

Nach NeuroWays-Grundlagen:
- Ein klarer Handlungsschritt pro Ansicht
- Status nicht nur über Farbe vermittelt (Icons & Text hinzufügen)
- Verständliche Fehlermeldungen
- Fristen in Alltagssprache erklären (z. B. „Noch 2 Tage")
- Keine zeitkritische Interaktion ohne sichtbare Restfrist
- Änderungen & nächste Handlung klar anzeigen

---

## 4. Vollständiger Anforderungskatalog

| ID | Anforderung | Kategorie | Status | Implementierung/Nachweis | Offene Punkte |
|---|---|---|---|---|---|
| A1 | Oberflächenprototyp: Administration | UI | IMPLEMENTIERT | `src/pages/AdminDashboard.jsx` (244 Z.) | — |
| A2 | Oberflächenprototyp: Kursleitung | UI | IMPLEMENTIERT | `src/pages/CourseLeaderHome.jsx` (293 Z.) | — |
| A3 | Oberflächenprototyp: Familie/Teilnehmer | UI | IMPLEMENTIERT | `src/pages/FamilyPortal.jsx` (380 Z.) | — |
| A4 | Rollensystem mit Navigation | ARCH | IMPLEMENTIERT | `src/App.jsx` (Router, RoleLayout) | — |
| A5 | Responsive Design (375/768/1280 px) | UI | IMPLEMENTIERT | Tailwind CSS mit Breakpoints | Noch nicht umfassend getestet |
| A6 | Mock-Daten für Demo | DATA | IMPLEMENTIERT | In den 3 Page-Komponenten | — |
| B1 | Kursvorschlag-Objekt (Datenmodell) | DATA | GEPLANT | Nicht implementiert | Datenmodell Phase 2 |
| B2 | Kurs-Objekt (Datenmodell) | DATA | GEPLANT | Nicht implementiert | Datenmodell Phase 2 |
| B3 | Kursdurchführung-Objekt (Datenmodell) | DATA | GEPLANT | Nicht implementiert | Datenmodell Phase 2 |
| B4 | Kundenkonto-Objekt (Familie/Einzelperson) | DATA | GEPLANT | Nicht implementiert | Datenmodell Phase 2 |
| B5 | Person-Objekt (Teilnehmer) | DATA | GEPLANT | Nicht implementiert | Datenmodell Phase 2 |
| B6 | Buchung-Objekt (Anmeldevorgang) | DATA | GEPLANT | Nicht implementiert | Datenmodell Phase 2 |
| B7 | Teilnahmeanmeldung-Objekt (Status pro Person) | DATA | GEPLANT | Nicht implementiert | Datenmodell Phase 2 |
| C1 | Planungsbogen für Kursvorschlag | FUNC | GEPLANT | Nicht implementiert | Form-Komponente nötig |
| C2 | Planungsbogen-Genehmigungsstatus | UI | TEILWEISE IMPLEMENTIERT | Admin-Notizen in `CourseLeaderHome` sichtbar | Logik nicht implementiert |
| D1 | Regelmotor: Altersregeln | LOGIC | GEPLANT | Nicht implementiert | Phase 3: Regelprüfung |
| D2 | Regelmotor: Familienregeln | LOGIC | GEPLANT | Nicht implementiert | Phase 3: Regelprüfung |
| D3 | Regelmotor: Kapazitätsregeln | LOGIC | GEPLANT | Nicht implementiert | Phase 3: Regelprüfung |
| E1 | Automatischer Vergabevorschlag | LOGIC | GEPLANT | Nicht implementiert | Phase 4: Platzvergabe |
| E2 | Admin-Genehmigung von Vergabeergebnissen | FUNC | GEPLANT | Nicht implementiert | Phase 4 |
| F1 | Nachrückverfahren: Reguläres Nachrücken | LOGIC | GEPLANT | Nicht implementiert | Phase 4: Nachrückverfahren |
| F2 | Nachrückverfahren: Kurzfristiges 14-Tage-Verfahren | LOGIC | GEPLANT | Nicht implementiert | Phase 4: Nachrückverfahren |
| F3 | Parallele Zugriffs-Absicherung (keine Doppelvergabe) | FUNC | GEPLANT | Nicht implementiert | Phase 4: Kritisch |
| G1 | Absage durch Teilnehmer (vor Frist) | FUNC | GEPLANT | Nicht implementiert | Phase 2-4 |
| G2 | Absageanfrage (nach Frist) | FUNC | GEPLANT | Nicht implementiert | Phase 2-4 |
| G3 | Absage durch Admin (kompletter Kurs) | FUNC | GEPLANT | Nicht implementiert | Phase 2-4 |
| H1 | Programmausgabe erstellen & verwalten | FUNC | GEPLANT | Nicht implementiert | Phase 5: Programmplanung |
| H2 | Halbjahresprogramm: Online-Publikation | FUNC | GEPLANT | Nicht implementiert | Phase 5 |
| H3 | Halbjahresprogramm: PDF-Export (barrierefrei) | FUNC | GEPLANT | Nicht implementiert | Phase 5 |
| H4 | Halbjahresprogramm: Excel-Export | FUNC | GEPLANT | Nicht implementiert | Phase 5 |
| I1 | Zeitleiste mit Zeitstempeln & Verantwortung | UI/LOGIC | TEILWEISE IMPLEMENTIERT | `FamilyPortal.jsx` zeigt Timeline-Mock | Echte Daten Phase 2 |
| I2 | Eingangsnachweis mit Anmeldenummer | FUNC | TEILWEISE IMPLEMENTIERT | ANM-IDs in Mock-Daten | Nicht echte Vergabe |
| I3 | Statusübergänge dokumentieren | LOGIC | TEILWEISE IMPLEMENTIERT | Mock-Timeline zeigt Übergänge | Echte Implementierung Phase 2 |
| J1 | Benachrichtigungen: E-Mail | FUNC | GEPLANT | Nicht implementiert | Phase 6 (PocketBase Email API möglicherweise deaktiviert) |
| J2 | Benachrichtigungen: SMS/Push | FUNC | GEPLANT | Nicht implementiert | Phase 6 (optional für v1) |
| J3 | Eskalationen: Erinnerungen nach Zeit | FUNC | GEPLANT | Nicht implementiert | Phase 6 |
| J4 | Eskalationen: Weitere Administratoren | FUNC | GEPLANT | Nicht implementiert | Phase 6 |
| K1 | Einwilligungs-Management | FUNC | GEPLANT | Nicht implementiert | Phase 7: Datenschutz |
| K2 | Datenfreigabe-Steuerung | FUNC | GEPLANT | Nicht implementiert | Phase 7: Datenschutz |
| K3 | Audit Trail (wer/was/wann/von wem) | FUNC | GEPLANT | Nicht implementiert | Phase 7: Audit |
| L1 | Admin-Dashboard mit Aufgabenliste | UI | IMPLEMENTIERT | `AdminDashboard.jsx` mit Mock-Tasks | Echte Daten Phase 2 |
| L2 | Kursleitungs-Live-Dashboard | UI | IMPLEMENTIERT | `CourseLeaderHome.jsx` mit Live-Status | Mock-Daten |
| L3 | Familien-Portal mit Zeitleiste | UI | IMPLEMENTIERT | `FamilyPortal.jsx` mit Timeline & Zahlungsstatus | Mock-Daten |
| M1 | Authentifizierung / Rollensystem | AUTH | GEPLANT | Nur Mock-Auswahl auf Startseite | Phase 2: PocketBase Auth |
| M2 | Berechtigungssystem | AUTH | GEPLANT | Nicht implementiert | Phase 2-3 |
| N1 | PocketBase-Integration | INFRA | GEPLANT | Nicht implementiert | Phase 2: Backend-Setup |
| N2 | REST-API-Schicht | INFRA | GEPLANT | Nicht implementiert | Phase 2: API-Entwurf |
| O1 | Barrierearme Bedienung (NeuroWays) | UX | TEILWEISE IMPLEMENTIERT | Farbcodierung mit Icons, klare Hierarchie | Vollständiger Audit ausstehend |
| O2 | Mindestteilnehmerzahl-Status | UI/LOGIC | GEPLANT | Nicht implementiert | Phase 4: Status-Management |
| O3 | Änderungsvergleich (Alt → Neu) | FUNC | GEPLANT | Nicht implementiert | Phase 2-3: Versionierung |

**Zusammenfassung Anforderungskatalog:**
- **IMPLEMENTIERT:** 11 (alle UI-Prototypen, Routing, Mock-Daten, Responsiv)
- **TEILWEISE IMPLEMENTIERT:** 5 (Timeline-Mock, Zeitleiste, Admin-Notizen, Barrierefreiheit)
- **GEPLANT:** 42 (Alle Datenbankfunktionen, Geschäftslogik, Benachrichtigungen)
- **OFFEN / UNGEKLÄRT:** 0 (alles ist klassifiziert)
- **GESAMT:** 58 Anforderungen

---

## 5. Aktuell implementierter Funktionsumfang

### 5.1 Oberflächenprototyp — Vollständig, keine Datenspeicherung

Die gesamte Bedienung ist in React-Komponenten prototypisiert. **Es gibt keine Datenspeicherung, keine echte Authentifizierung, nur Mock-Daten zur Demo.**

#### Admin-Dashboard (`src/pages/AdminDashboard.jsx`, 244 Zeilen)

**Zweck:** Zentrale Aufgabenverwaltung für Administratoren.

**Benutzerinteraktion:**
1. Admin wählt auf Startseite „Administration"
2. Kommt zur Aufgabenliste (Dashboard)
3. Kann Tabs zwischen „Aufgaben" und „Kursverwaltung" wechseln
4. Sieht 4 unterschiedliche Mock-Aufgaben mit Prioritäten (kritisch/wichtig/normal)
5. Sieht 4 Mock-Kurse mit Belegungsbalken, Wartelistenanzahl, Status

**Beteiligte Komponenten:**
- `TaskCard` — Einzelne Aufgabe mit Typ-Icon, Priorität, Zeit
- `CourseCard` — Kurs mit Kapazitätsbalken, Wartelisten-Info

**Beteiligte Dateien:**
- `AdminDashboard.jsx` (Komponente)
- `App.jsx` (Router-Integration)
- `index.css` (Tailwind-Styling)

**Datenquellen (aktuell):**
- `mockTasks` — Array mit 4 Mock-Aufgaben (neue Anmeldung, Absageanfrage, freier Platz, Warteliste)
- `mockCourses` — Array mit 4 Mock-Kursen (Aquarellmalen, Gitarre, Yoga, Töpfern)

**Datenbankbezug (geplant):**
- Wird Phase 2 angebunden (PocketBase Collections: tasks, courses, enrollments)

**Relevante API-Endpunkte (geplant):**
- `GET /api/admin/tasks` — Aufgabenliste für Admin
- `GET /api/admin/courses` — Kurse mit Belegungsstand
- `PATCH /api/admin/tasks/:id` — Aufgabe abschließen

**Aktueller Reifegrad:** Prototyp (UI-Struktur klar, keine echten Daten)

**Bekannte Einschränkungen:**
- Keine Filterung oder Suche
- Keine Pagination
- Klick auf „Prüfen"-Button hat keine Auswirkung
- Alle Daten sind Hard-coded

---

#### Kursleitung-Dashboard (`src/pages/CourseLeaderHome.jsx`, 293 Zeilen)

**Zweck:** Live-Übersicht über zugeordnete Kurse mit Teilnehmerzahlen, Genehmigungsstatus, Änderungsmeldungen.

**Benutzerinteraktion:**
1. Kursleitung wählt auf Startseite „Kursleitung"
2. Kommt zur Kursübersicht mit 3 Tabs: Meine Kurse / Kursvorschläge / Programmplanung
3. Tab „Meine Kurse" zeigt 3 Mock-Kurse:
   - Aquarellmalen (bestätigt, 9/10 Plätze, 2 auf Warteliste)
   - Gitarre Grundlagen (noch nicht genehmigt)
   - Yoga (bestätigt, 10/12 Plätze)
4. Jeder Kurs zeigt Zeitstempel der letzten Änderung
5. Für bestätigte Kurse: Timeline mit Änderungsmeldungen
6. Tab „Kursvorschläge" zeigt 1 Mock-Vorschlag in Bearbeitung mit Admin-Notizen & Timeline

**Beteiligte Komponenten:**
- `CourseCard` — Kurs mit Status-Badge, Belegungsbalken, Änderungsliste
- `ProposalCard` — Kursvorschlag mit Timeline & Admin-Notizen

**Beteiligte Dateien:**
- `CourseLeaderHome.jsx` (Komponente)
- `App.jsx` (Router-Integration)

**Datenquellen (aktuell):**
- `mockCourses` — Array mit 3 Mock-Kursen (status, startDate, enrolled, capacity, waitlist, lastUpdate, changes)
- `mockProposal` — 1 Mock-Kursvorschlag (Keramik Fortgeschrittene, in-review)

**Datenbankbezug (geplant):**
- `GET /api/courses/by-instructor/:id` — Kurse dieser Kursleitung
- `GET /api/proposals/:id` — Kursvorschlag-Status

**Aktueller Reifegrad:** Prototyp (UI-Struktur klar)

**Bekannte Einschränkungen:**
- Keine Edit-Funktion für Kursvorschläge
- Keine Drill-Down in einzelne Kurs-Details
- Keine Wartelisten-Verwaltung
- Alle Daten sind Mock

---

#### Familien-Portal (`src/pages/FamilyPortal.jsx`, 380 Zeilen)

**Zweck:** Anmeldungsübersicht für Familien/Teilnehmer, Statusverfolgung, Zahlungen, Abmeldung.

**Benutzerinteraktion:**
1. Familie wählt auf Startseite „Familie/Teilnehmer"
2. Kommt zu Anmeldungsübersicht mit mehreren Tabs
3. Tab „Meine Anmeldungen" zeigt 3 Mock-Anmeldungen:
   - Aquarellmalen (bestätigt, kann noch absagen bis 08.09.2026)
   - Yoga (auf Warteliste)
   - Gitarre (Platzangebot ausstehend)
4. Jede Anmeldung zeigt:
   - Eindeutige Anmeldenummer (ANM-2026-XXXX)
   - Status mit Farbcodierung
   - Betroffene Personen
   - Zeitstempel Anmeldung
   - Gebühr & Zahlungsstatus
   - Absagefrist (mit Warnung, wenn bald abgelaufen)
   - Zeitleiste mit Ereignissen & Zeitstempeln
5. Auf jeder Anmeldung: Aktionen je nach Status
   - Bestätigt: „Absagen" (vor Frist) oder „Absageanfrage" (nach Frist)
   - Warteliste: nichts (warten auf Platzangebot)
   - Angebot ausstehend: „Annehmen" / „Ablehnen"
6. Kann kostenlos absagen vor Frist, danach nur noch Absageanfrage
7. Tab „Verfügbare Kurse" zeigt 3 Mock-Kurse zum Anmelden

**Beteiligte Komponenten:**
- `EnrollmentCard` — Anmeldung mit Status, Zeitleiste, Aktionen
- `AvailableCourseCard` — Kurs zum Anmelden (mit Verfügbarkeitsstatus)
- `FamilyHeader` — Info zur Familie (Konto-ID, Mitglieder)

**Beteiligte Dateien:**
- `FamilyPortal.jsx` (Komponente)
- `App.jsx` (Router-Integration)

**Datenquellen (aktuell):**
- `mockFamily` — Kundenkonto mit 4 Personen (2 Erwachsene, 2 Kinder)
- `mockEnrollments` — Array mit 3 Mock-Anmeldungen (confirmed, waitlist, pending)
- `mockAvailableCourses` — Array mit 3 Mock-Kursen

**Datenbankbezug (geplant):**
- `GET /api/family/:id` — Kundenkonto & Personen
- `GET /api/enrollments/by-family/:id` — Alle Anmeldungen dieser Familie
- `POST /api/enrollments` — Neue Anmeldung erstellen
- `PATCH /api/enrollments/:id/cancel` — Absage
- `PATCH /api/enrollments/:id/cancellation-request` — Absageanfrage

**Aktueller Reifegrad:** Prototyp (UI-Struktur umfangreich, Zeitleisten sichtbar)

**Bekannte Einschränkungen:**
- Klick auf „Annehmen", „Absagen", „Anmeldung" hat keine Auswirkung
- Keine echte Datenvalidierung
- Keine Regelprüfung (Alter, Familie, Kapazität)
- Alle Daten sind Mock

---

### 5.2 Routing & Navigation

**Implementiert:**
- React Router 6 mit `createBrowserRouter` (im App.jsx)
- Top-Level Routes:
  - `/` — Rolle auswählen (RoleSelection)
  - `/admin/*` — Admin-Bereich (AdminDashboard)
  - `/instructor/*` — Kursleitung (CourseLeaderHome)
  - `/family/*` — Familie (FamilyPortal)
  - `*` — 404 (NotFound)

**Layout:**
- `RoleSelection` — Startseite mit 3 Rollenkarten
- `RoleLayout` — Gemeinsamer Header mit Rollenname, Icon, Abmelden-Button

**Datei:** `src/App.jsx` (157 Zeilen)

**Bekannte Einschränkungen:**
- Kein Basename-Setup für Sub-Paths (wird relevant wenn auf Subpath deployed)
- Keine Authentication/Authorization (alle Rollen frei zugänglich)

---

### 5.3 Styling & Design

**Implementiert:**
- Tailwind CSS v4 (via `@import "tailwindcss"` in `src/index.css`)
- Config in `tailwind.config.cjs` (noch minimal)
- Responsive Breakpoints: `md` (768px), `lg` (1280px)

**Farbschema:**
- Admin: Blau (#2563EB)
- Kursleitung: Grün (#16A34A)
- Familie: Violett (#9333EA)
- Neutrale Elemente: Grau-Skala (Slate)

**Icons:**
- lucide-react (z. B. `BarChart3`, `BookOpen`, `Users`, `AlertCircle`, `CheckCircle`, etc.)

**Typefaces:**
- Geplant: Fraunces (Display) + Karla (Sans)
- Aktuell: Google Fonts Link noch nicht in `index.html` (TODO)

**Responsive Design:**
- Mobile-first Prinzip angewendet
- Layout mit `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Padding/Spacing responsive
- Touch-friendly Buttons (min. 44px)

**Bekannte Einschränkungen:**
- Typefaces sind noch nicht geladen (Link fehlt in `index.html`)
- Tailwind Config noch minimal (keine Custom Colors/Spacing)
- Keine Dark-Mode Implementierung

---

### 5.4 Responsive Design — Teststand

| Breakpoint | Getestet | Status | Notizen |
|---|---|---|---|
| **375px (Mobile)** | Nein, nur visuell | ANGENOMMEN | Komponenten passen sich an, aber kein echtes Mobile-Test |
| **768px (Tablet)** | Nein, nur visuell | ANGENOMMEN | Grids sollten zu 2 Spalten wechseln |
| **1280px (Desktop)** | Ja (aktuell im Dev) | GETESTET | Layout passt, aber nicht alle Edge Cases geprüft |

**Bekannte Probleme:**
- Keine automatisierten Tests für Responsive-Design
- Horizontal-Scrolling auf sehr kleinen Bildschirmen nicht ausgeschlossen

---

## 6. Seiten- und Navigationsstruktur

```
Kursplattform
├── / (Startseite — Rolle auswählen)
│   ├── Administration (Button → /admin)
│   ├── Kursleitung (Button → /instructor)
│   └── Familie/Teilnehmer (Button → /family)
│
├── /admin (RoleLayout + AdminDashboard)
│   ├── Aufgaben (Tab)
│   │   ├── Neue Anmeldung (Task-Card)
│   │   ├── Absageanfrage (Task-Card)
│   │   ├── Freier Platz (Task-Card)
│   │   └── Warteliste voll (Task-Card)
│   ├── Kursverwaltung (Tab)
│   │   ├── Aquarellmalen (Course-Card mit Belegungsbalken)
│   │   ├── Gitarre (Course-Card)
│   │   ├── Yoga (Course-Card)
│   │   └── Töpfern (Course-Card)
│   └── [Header: „Administration" + Abmelden]
│
├── /instructor (RoleLayout + CourseLeaderHome)
│   ├── Meine Kurse (Tab)
│   │   ├── Aquarellmalen (Course-Card + Timeline)
│   │   ├── Gitarre Grundlagen (Course-Card, pending-approval)
│   │   └── Yoga am Morgen (Course-Card + Timeline)
│   ├── Kursvorschläge (Tab)
│   │   └── Keramik Fortgeschrittene (Proposal-Card mit Status & Admin-Notizen)
│   ├── Programmplanung (Tab — noch nicht gefüllt)
│   └── [Header: „Kursleitung" + Abmelden]
│
├── /family (RoleLayout + FamilyPortal)
│   ├── Meine Anmeldungen (Tab)
│   │   ├── Aquarellmalen (Enrollment-Card, confirmed, mit Zeitleiste)
│   │   ├── Yoga am Morgen (Enrollment-Card, waitlist)
│   │   └── Gitarre Grundlagen (Enrollment-Card, pending-offer)
│   ├── Verfügbare Kurse (Tab)
│   │   ├── Keramik für Anfänger (Course-Card)
│   │   ├── Englisch Konversation (Course-Card)
│   │   └── Familien-Workshop Kochen (Course-Card)
│   ├── Mein Konto (Tab — noch nicht gefüllt)
│   └── [Header: „Familie & Teilnehmer" + Abmelden]
│
└── * (404 — NotFound)
```

### Jede Seite im Detail

#### Seite: Startseite (/)

| Feld | Wert |
|------|------|
| **Name** | Rolle auswählen |
| **Route** | `/` |
| **Zweck** | Benutzer wählt seine Rolle |
| **Zielgruppe** | Alle (Administrator, Kursleitung, Familie) |
| **Hauptkomponenten** | `RoleSelection` (3 Buttons), Info-Box mit Prototyp-Hinweis |
| **Mögliche Aktionen** | Klick auf „Administration", „Kursleitung" oder „Familie" |
| **Datenquellen** | Keine |
| **Status** | IMPLEMENTIERT, Prototype |

#### Seite: Admin-Dashboard (/admin)

| Feld | Wert |
|------|------|
| **Name** | Administration |
| **Route** | `/admin` |
| **Zweck** | Zentrale Aufgabenverwaltung für Administrator |
| **Zielgruppe** | Administrator |
| **Hauptkomponenten** | `AdminDashboard` (mit Tabs: Aufgaben, Kursverwaltung) |
| **Mögliche Aktionen** | Task-Details anzeigen, Kurse inspizieren, Filter setzen (Mock) |
| **Datenquellen** | `mockTasks`, `mockCourses` |
| **Status** | IMPLEMENTIERT, Prototype |

#### Seite: Kursleitung-Dashboard (/instructor)

| Feld | Wert |
|------|------|
| **Name** | Kursleitung |
| **Route** | `/instructor` |
| **Zweck** | Übersicht eigener Kurse, Genehmigungsstatus, Zeitleiste |
| **Zielgruppe** | Kursleitung |
| **Hauptkomponenten** | `CourseLeaderHome` (mit Tabs: Meine Kurse, Kursvorschläge, Programmplanung) |
| **Mögliche Aktionen** | Kurs-Details sehen, Zeitleiste checken, Kursvorschlag-Status sehen |
| **Datenquellen** | `mockCourses`, `mockProposal` |
| **Status** | IMPLEMENTIERT, Prototype |

#### Seite: Familien-Portal (/family)

| Feld | Wert |
|------|------|
| **Name** | Familie & Teilnehmer |
| **Route** | `/family` |
| **Zweck** | Anmeldungsübersicht, Statusverfolgung, Zahlungen, Abmeldung |
| **Zielgruppe** | Familie, Einzelperson, Instituition (als Kundenkonto) |
| **Hauptkomponenten** | `FamilyPortal` (mit Tabs: Meine Anmeldungen, Verfügbare Kurse, Mein Konto) |
| **Mögliche Aktionen** | Anmeldung sehen, Zeitleiste, Absage/Absageanfrage, Neu anmelden, Zahlungsstatus checken |
| **Datenquellen** | `mockFamily`, `mockEnrollments`, `mockAvailableCourses` |
| **Status** | IMPLEMENTIERT, Prototype |

#### Seite: 404

| Feld | Wert |
|------|------|
| **Name** | Nicht gefunden |
| **Route** | `*` (alle anderen) |
| **Zweck** | Fehlerseite |
| **Komponente** | `NotFound` (18 Zeilen) |
| **Status** | IMPLEMENTIERT, Minimal |

---

## 7. User Flows

### Flow 1: Administrator verwaltet Aufgaben

```
1. Admin öffnet die Plattform
   → Wählt "Administration" auf Startseite

2. Admin sieht Aufgabenliste (Dashboard)
   → 4 Mock-Aufgaben mit unterschiedlichen Typen

3. Admin kann Aufgabe inspizieren (Klick „Prüfen")
   → (Aktuell keine Aktion, nur visuell)

4. Admin sieht Live-Kursbelegung (Tab „Kursverwaltung")
   → 4 Kurse mit Kapazitätsbalken, Warteliste, Status

5. Admin könnte (Phase 2+):
   → Kurse bearbeiten
   → Anmeldungen akzeptieren/ablehnen
   → Nachrückverfahren anstoßen
   → Kurse absagen
```

**Status:** Flow 1-4 prototypisiert (Mock-Daten), Punkt 5 noch nicht implementiert.

---

### Flow 2: Kursleitung reicht Vorschlag ein & überwacht Kurs

```
1. Kursleitung öffnet die Plattform
   → Wählt "Kursleitung" auf Startseite

2. Kursleitung sieht ihre Kurse (Tab „Meine Kurse")
   → 3 Mock-Kurse mit Status, Belegung, Zeitleiste

3. Kursleitung sieht Kursvorschlag (Tab „Kursvorschläge")
   → 1 Mock-Vorschlag „Keramik Fortgeschrittene"
   → Status: in Prüfung
   → Admin-Notiz: „Kapazität angepasst"
   → Timeline zeigt: Eingereicht → In Prüfung → (pending)

4. Kursleitung wartet auf Genehmigung
   → (Phase 2+) Bekommt E-Mail/Benachrichtigung bei Status-Änderung

5. Nach Genehmigung (Phase 2+)
   → Kurs erscheint unter „Meine Kurse"
   → Sieht Live-Belegung
   → Wird benachrichtigt bei neuen Anmeldungen
   → Kann Änderungen einsehen (Timeline)
```

**Status:** Flow 1-3 prototypisiert (Mock), Flow 4-5 noch nicht implementiert.

---

### Flow 3: Familie meldet sich an, wird Warteliste, nimmt Platz an

```
1. Familie öffnet die Plattform
   → Wählt "Familie/Teilnehmer" auf Startseite

2. Familie sieht verfügbare Kurse (Tab „Verfügbare Kurse")
   → Klick auf Kurs „Yoga am Morgen"
   → (Phase 2+) Wird zur Anmeldung weitergeleitet

3. Familie füllt Anmeldung aus (Phase 2+)
   → Wählt Teilnehmer (Kind/Erwachsener)
   → Validierung: Altersregeln, Familienregeln, etc.
   → Bestätigt Anmeldung

4. Anmeldung wird akzeptiert oder → Warteliste
   → Familie bekommt Anmeldenummer (ANM-2026-0925)
   → Zeitleiste: „Anmeldung erfolgreich" + Zeitstempel
   → Status: Warteliste (Platz 1)

5. Admin: Jemand sagt ab → Freier Platz
   → (Phase 4: Nachrückverfahren)
   → Familie bekommt Platzangebot (mit Annahmefrist)

6. Familie akzeptiert Platzangebot
   → Zeitleiste: „Platzangebot angenommen" + Zeitstempel
   → Status wechselt zu „Bestätigt"

7. Familie zahlt Gebühr (Phase 2+)
   → Zahlungsstatus: „Bezahlt"
   → Bekommt Rechnung/Bestätigung (als Download oder E-Mail)

8. Familie kann noch absagen (vor Frist)
   → Zeitleiste: „Absage erfolgreich" + Zeitstempel + Grund (optional)
   → Nach Frist: Nur noch „Absageanfrage"
```

**Status:** Flow 1-2 prototypisiert (Mock), Flow 3-8 noch nicht implementiert (Datenanbindung Phase 2+).

---

## 8. Technische Architektur

### 8.1 Architektur-Übersicht

```
┌─────────────────────────────────────────────────────────┐
│              Browser / Client-Seite                      │
│                                                           │
│  React 18 + Vite (Dev Server mit HMR)                   │
│  ├─ App.jsx (Router)                                    │
│  ├─ Pages:                                              │
│  │  ├─ AdminDashboard.jsx                              │
│  │  ├─ CourseLeaderHome.jsx                            │
│  │  ├─ FamilyPortal.jsx                                │
│  │  └─ NotFound.jsx                                    │
│  ├─ CSS: Tailwind v4                                   │
│  └─ Icons: lucide-react                                │
│                                                           │
│  État (State):                                          │
│  └─ useState() Hooks (lokal in Komponenten)            │
│                                                           │
└─────────────────────────────────────────────────────────┘
           ↓ (Aktuell: Keine echte API)
           ↓ (Phase 2+: HTTPS zu PocketBase)
┌─────────────────────────────────────────────────────────┐
│         Backend / Server-Seite (Phase 2+)               │
│                                                           │
│  PocketBase (SQLite + REST API)                         │
│  ├─ Collections (Datenmodell):                          │
│  │  ├─ Customers (Konten)                              │
│  │  ├─ Persons (Teilnehmer)                            │
│  │  ├─ Courses (Kursdefinitionen)                      │
│  │  ├─ CourseRuns (Durchführungen)                     │
│  │  ├─ Enrollments (Anmeldungen)                       │
│  │  ├─ Participants (Person in Anmeldung)              │
│  │  ├─ PlacementPositions (Plätze)                     │
│  │  └─ [weitere Collections]                           │
│  ├─ Authentifizierung: JWT                             │
│  ├─ Regeln: Öffentliche/private API-Rules              │
│  └─ File-Upload: Für Kursmaterialien, Fotos, etc.      │
│                                                           │
└─────────────────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────────────────┐
│         Persistenter Speicher                           │
│                                                           │
│  SQLite-Datenbank (in PocketBase)                       │
│  └─ Alle Daten: Kurse, Anmeldungen, Personen, etc.     │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### 8.2 Deployment-Architektur

```
┌─────────────────────────────────────────────┐
│     Entwicklung (lokaler Rechner)            │
│                                              │
│  npm run dev                                │
│  → Vite Dev Server (localhost:5173)        │
│  → HMR für Live-Reload                     │
│  → Logs: /logs/vite_*.log                  │
│                                              │
└────────────────────┬────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────┐
│     Build                                    │
│                                              │
│  npm run build                              │
│  → Vite bundelt React + CSS + JS           │
│  → Ausgabe: /dist/                          │
│  └─ dist/index.html                        │
│  └─ dist/assets/index-XXX.js (bundled)     │
│  └─ dist/assets/index-XXX.css (bundled)    │
│  └─ dist/favicon.svg                       │
│                                              │
└────────────────────┬────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────┐
│     Repository                              │
│                                              │
│  git commit & git push                      │
│  → GitHub: https://github.com/neuroways/   │
│            kurse_ai                        │
│  → Branch: main                            │
│  → Includes: /dist/, /src/, /public/       │
│                                              │
└────────────────────┬────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────┐
│     Production (IONOS STRATO)              │
│                                              │
│  Static file hosting                       │
│  → Serves /dist/ at https://kursplattform  │
│  → Browser requests HTML                   │
│  → React hydrates & routing begins         │
│                                              │
└─────────────────────────────────────────────┘
```

### 8.3 Data Flow (aktuell — Mock)

```
Browser (React Component)
   │
   ├─ mockTasks = [ ... ]        (Hard-coded in AdminDashboard.jsx)
   ├─ mockCourses = [ ... ]      (Hard-coded)
   ├─ mockFamily = { ... }       (Hard-coded in FamilyPortal.jsx)
   └─ mockEnrollments = [ ... ]  (Hard-coded)
   
Jede Komponente hat lokal:
   └─ useState() für interaktive Elemente (z. B. aktive Tabs)

Keine API-Calls, keine Persistenz.
```

### 8.4 Data Flow (Phase 2+ — mit Backend)

```
Browser (React Component)
   │
   ├─ useEffect() → fetch("/api/admin/tasks")
   ├─ useEffect() → fetch("/api/courses/by-instructor/:id")
   ├─ fetch("/api/family/:id") → Kundenkonto laden
   └─ fetch("/api/enrollments/by-family/:id") → Anmeldungen laden
   │
   ├─ POST /api/enrollments (neue Anmeldung)
   ├─ PATCH /api/enrollments/:id/cancel (absagen)
   ├─ PATCH /api/enrollments/:id/accept-offer (Platzangebot annehmen)
   │
   └─ JWT Token (lokal gespeichert oder Cookie)
   
   ↓ (HTTPS)
   
Backend (PocketBase)
   │
   ├─ REST-API-Schicht
   ├─ Collections (Customers, Persons, Enrollments, etc.)
   ├─ Geschäftslogik (Regelprüfung, Vergabeverfahren)
   ├─ Authentication (JWT)
   └─ SQLite-Datenbank
```

---

## 9. Repository- und Verzeichnisstruktur

```
kurse_ai/
├── .git/                      # Git-Repository (GitHub: neuroways/kurse_ai)
│
├── app/                       # ← DER PROJEKT-ROOT
│   │
│   ├── src/
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx         # 244 Z. – Admin-Aufgabenübersicht
│   │   │   ├── CourseLeaderHome.jsx       # 293 Z. – Kursleitung-Dashboard
│   │   │   ├── FamilyPortal.jsx           # 380 Z. – Familien-Anmeldungen
│   │   │   └── NotFound.jsx               # 19 Z. – 404-Seite
│   │   ├── App.jsx                        # 157 Z. – Router + RoleLayout
│   │   ├── main.jsx                       # 10 Z. – React Entry Point
│   │   └── index.css                      # 5 Z. – Tailwind + Config
│   │
│   ├── public/
│   │   └── favicon.svg                    # 931 B – Branding-Icon (Buch + Punkte)
│   │
│   ├── dist/                              # ← Build-Output (committed)
│   │   ├── index.html                     # 769 B – Prodkuktions-HTML
│   │   ├── favicon.svg
│   │   └── assets/
│   │       ├── index-DdfXoMcc.js          # ~190 KB – React + App JS (minified)
│   │       └── index-Bg07ESoT.css         # ~1 KB – Tailwind CSS (minified)
│   │
│   ├── index.html                         # 15 Z. – HTML-Hülle (Quelle)
│   ├── package.json                       # Build-Scripts, keine Dependencies
│   ├── package-lock.json                  # Lock-Datei
│   ├── vite.config.js                     # 3 Z. – Vite-Konfiguration (minimal)
│   ├── tailwind.config.cjs                # 9 Z. – Tailwind-Theme (minimal)
│   │
│   ├── AGENTS.md                          # 103 Z. – Projekt-Setup für KI
│   ├── MASTERPROMPT.md                    # 390 Z. – Projektübergabe-Prompt
│   │
│   └── .git/                              # Git-Repo
│
├── static/                                # ← Static Files (served at /static/)
│   └── [optional: Bilder, Assets]
│
├── uploads/                               # ← User-Upload Exchange
│   └── [temporäre hochgeladene Dateien]
│
├── docs/
│   └── handover/
│       └── PROJECT_HANDOVER.md            # ← Diese Datei
│
└── logs/                                  # ← Development Logs
    ├── vite_build.log                     # Vite Build-Log
    ├── vite_console.log                   # Browser Console Output
    └── assistant-start.log                # Start-Log
```

### Wichtigste Verzeichnisse erklärt:

| Verzeichnis | Zweck | Wer ändert es | Hinweise |
|---|---|---|---|
| `app/src/` | React-Komponenten-Source | Developer | Hier wird gearbeitet |
| `app/public/` | Static-Assets (favicon) | Designer | favicon.svg ersetzen |
| `app/dist/` | Build-Output (production) | Build-Script | Committed; wird von Platform served |
| `app/` | Git-Repo Root | Git | `.git/` ist hier |
| `static/` | Served unter `/static/<file>` | get-image skill, Manual | Für Design-Assets (Fotos, etc.) |
| `uploads/` | User-Uploads temporär | Frontend (später) | Nicht served; nur Austausch |
| `docs/handover/` | Übergabe-Dokumentation | KI-Handoff | Diese Datei hier |
| `logs/` | Development Logs | Vite Dev Server | Für Debugging |

---

## 10. Datenbank

### AKTUELLER STATUS: NICHT IMPLEMENTIERT (Phase 2 ausstehend)

**Technologie (geplant):** PocketBase (SQLite + REST API)

**Collections (geplant — aus Anforderungen):**

| Collection | Zweck | Felder (Entwurf) | Status |
|---|---|---|---|
| **customers** | Konten (Familie, Einzelperson, Firma) | id, name, customerNumber, type, email, phone, contactPerson, | GEPLANT |
| **persons** | Teilnehmer (Kind oder Erwachsener) | id, customerId, firstName, lastName, birthDate, role (adult/child), | GEPLANT |
| **courses** | Kursdefinitionen (wiederverwendbar) | id, title, description, targetGroup, ageMin, ageMax, durationMinutes, | GEPLANT |
| **course_runs** | Durchführungen (ein Kurs im Halbjahr) | id, courseId, halftermId, capacity, waitlistCapacity, minParticipants, | GEPLANT |
| **enrollments** | Anmeldungen (Buchung) | id, courseRunId, customerId, enrollmentDate, status, total_people, | GEPLANT |
| **participants** | Personen in Anmeldung | id, enrollmentId, personId, status (confirmed/waitlist/offered), | GEPLANT |
| **placement_positions** | Platzpositionen (wer sitzt wo) | id, enrollmentId, participantId, position, list_type (regular/waitlist), | GEPLANT |
| **course_proposals** | Eingereichte Kursideen | id, instructorId, title, description, status, submittedDate, notes, | GEPLANT |
| **cancellations** | Absagen & Absageanfragen | id, participantId, enrollmentId, cancellationType, requestDate, | GEPLANT |
| **program_editions** | Halbjahresprogramme | id, title, halfterm, publicationStart, publicationEnd, status, | GEPLANT |
| **audit_logs** | Änderungshistorie (Audit Trail) | id, entityType, entityId, changeType, oldValue, newValue, changedBy, | GEPLANT |
| **consent_records** | Einwilligungen (Datenschutz) | id, personId, consentType, accepted, consentDate, version, | GEPLANT |

### Beziehungen (Relational Model — geplant):

```
customers (1) ──→ (N) persons
customers (1) ──→ (N) enrollments
persons (1) ──→ (N) participants
courses (1) ──→ (N) course_runs
course_runs (1) ──→ (N) enrollments
enrollments (1) ──→ (N) participants
enrollments (1) ──→ (N) placement_positions
participants (1) ──→ (N) placement_positions
participants (1) ──→ (N) cancellations
course_runs (1) ──→ (N) program_editions
course_proposals (1) ← → (?) courses [nach Genehmigung]
```

### Indizes & Performance (geplant):

```
Indexierung nach:
- enrollments(courseRunId, status)  → Schnelle Abfrage: Wer sitzt in Kurs?
- participants(enrollmentId, status) → Wer in dieser Anmeldung?
- customers(email)                  → Login
- persons(customerId)               → Alle Personen einer Familie
- audit_logs(entityId, changedBy)   → Änderungshistorie
- consent_records(personId)         → Einwilligungen laden
```

### Status von Migrationen:

- **Schema-Design:** GEPLANT (Phase 2)
- **SQL-Migrationen:** KEINE (PocketBase verwendet JSON-Schema, automatische Verwaltung)
- **Seed-Daten:** GEPLANT (Test-Kurse, Test-Familien)
- **Datenmigration (Alt-System → Neu):** Nicht geklärt (offene Frage #10)

### Bekannte Inkonsistenzen:

- **Keine aktuellen Daten** – Alles ist Mock
- **Datenmodell nicht validiert** – Wird in Phase 2 gegen echte Anforderungen geprüft
- **Beziehungen noch unklar** – Z. B. wie werden Familienkurse modelliert (Ein Platz oder N Plätze pro Person?)

---

## 11. API und Schnittstellen

### AKTUELLER STATUS: NICHT IMPLEMENTIERT (Phase 2 ausstehend)

**Technologie (geplant):** PocketBase REST API

**Base URL (geplant):** `https://pb.kursplattform.example.com/api/collections/` (wird noch konfiguriert)

### Geplante Endpunkte:

#### Authentication

| Methode | Endpoint | Zweck | Input | Output | Auth |
|---|---|---|---|---|---|
| POST | `/auth/login` | Benutzer anmelden | email, password | token, user | — |
| POST | `/auth/refresh` | Token erneuern | refresh_token | token | Bearer |
| POST | `/auth/logout` | Abmelden | — | — | Bearer |

#### Admin-Schnittstellen

| Methode | Endpoint | Zweck | Input | Output | Auth |
|---|---|---|---|---|---|
| GET | `/admin/tasks` | Aufgabenliste | filter, sort, limit | Task[] | Bearer (Admin) |
| GET | `/admin/courses` | Alle Kurse | — | Course[] | Bearer (Admin) |
| GET | `/admin/enrollments/:courseId` | Anmeldungen je Kurs | courseId | Enrollment[] | Bearer (Admin) |
| PATCH | `/admin/enrollments/:id/approve` | Anmeldung genehmigen | enrollmentId | Enrollment | Bearer (Admin) |
| PATCH | `/admin/enrollments/:id/waitlist` | Auf Warteliste setzen | enrollmentId | Enrollment | Bearer (Admin) |
| POST | `/admin/placements/propose` | Vergabevorschlag erzeugen | courseRunId, algorithm | Proposal | Bearer (Admin) |
| PATCH | `/admin/placements/confirm` | Vergabe bestätigen | proposalId | Placements[] | Bearer (Admin) |
| POST | `/admin/recalls/start` | Nachrückrunde starten | courseRunId, candidates | Offers[] | Bearer (Admin) |
| PATCH | `/admin/courses/:id/cancel` | Kurs absagen | courseId, reason | Course | Bearer (Admin) |

#### Instructor-Schnittstellen

| Methode | Endpoint | Zweck | Input | Output | Auth |
|---|---|---|---|---|---|
| GET | `/instructor/courses` | Meine Kurse | — | CourseRun[] | Bearer (Instructor) |
| GET | `/instructor/courses/:id` | Kurs-Details | courseId | CourseRunDetail | Bearer (Instructor) |
| GET | `/instructor/proposals` | Meine Vorschläge | — | Proposal[] | Bearer (Instructor) |
| POST | `/instructor/proposals` | Kursvorschlag einreichen | [Planungsbogen-Felder] | Proposal | Bearer (Instructor) |
| PATCH | `/instructor/proposals/:id` | Vorschlag bearbeiten | proposalId, [...] | Proposal | Bearer (Instructor) |

#### Family-Schnittstellen

| Methode | Endpoint | Zweck | Input | Output | Auth |
|---|---|---|---|---|---|
| GET | `/family/me` | Mein Konto | — | Customer | Bearer (Family) |
| GET | `/family/enrollments` | Meine Anmeldungen | — | Enrollment[] | Bearer (Family) |
| GET | `/family/enrollments/:id/timeline` | Zeitleiste einer Anmeldung | enrollmentId | Timeline[] | Bearer (Family) |
| POST | `/family/enrollments` | Neu anmelden | [...Anmeldung-Felder] | Enrollment | Bearer (Family) |
| PATCH | `/family/enrollments/:id/accept-offer` | Platzangebot annehmen | enrollmentId | Enrollment | Bearer (Family) |
| PATCH | `/family/enrollments/:id/cancel` | Kostenlos absagen | enrollmentId, reason | Enrollment | Bearer (Family) |
| POST | `/family/enrollments/:id/cancellation-request` | Absageanfrage (nach Frist) | enrollmentId, reason | CancellationRequest | Bearer (Family) |
| GET | `/family/courses` | Verfügbare Kurse | filter (date, ageMin) | CourseRun[] | Bearer (Family) |

### Notizen zu API-Design (Phase 2):

- **Authentifizierung:** JWT Bearer Token (PocketBase-Standard)
- **Fehlerbehandlung:** Standard HTTP Status (400, 401, 403, 404, 500) + Fehlermeldung in JSON
- **Validierung:** Server-seitig (nicht nur Client)
- **Rate-Limiting:** Noch nicht geklärt
- **Versioning:** Noch nicht geklärt (v1, v2, …)

**Status:** Alle Endpunkte sind geplant, aber NICHT IMPLEMENTIERT.

---

## 12. Fachliche Geschäftslogik

### AKTUELLER STATUS: PROTOTYP (ohne Implementierung)

Die meiste Geschäftslogik ist noch zu implementieren. Hier die wichtigsten geplanten Regeln:

### 12.1 Anmeldungs-Regelprüfung

**Regel R1: Mindestalter**
- **Beschreibung:** Teilnehmer muss älter als X Jahre sein
- **Implementierung:** Phase 3
- **Pseudo-Code:**
  ```
  IF person.birthDate > TODAY - minAge.years
    THEN reject("Zu jung")
  ```

**Regel R2: Höchstalter**
- **Beschreibung:** Teilnehmer muss jünger als X Jahre sein
- **Implementierung:** Phase 3
- **Pseudo-Code:**
  ```
  IF person.birthDate < TODAY - maxAge.years
    THEN reject("Zu alt")
  ```

**Regel R3: Nur Erwachsene**
- **Beschreibung:** Kurs nur für Erwachsene (18+)
- **Implementierung:** Phase 3
- **Pseudo-Code:**
  ```
  IF enrollment.persons.any(p -> p.role == "child")
    THEN reject("Kurs nur für Erwachsene")
  ```

**Regel R4: Nur Kinder**
- **Beschreibung:** Kurs nur für Kinder (< 18)
- **Implementierung:** Phase 3

**Regel R5: Mindestens ein Erwachsener je Familie**
- **Beschreibung:** Wenn Kinder teilnehmen, muss min. 1 Erwachsener angemeldet sein
- **Implementierung:** Phase 3
- **Pseudo-Code:**
  ```
  IF enrollment.persons.any(p -> p.role == "child")
    AND enrollment.persons.none(p -> p.role == "adult")
    THEN reject("Min. 1 Erwachsener erforderlich")
  ```

**Regel R6: Betreuer-Verhältnis**
- **Beschreibung:** Max. X Kinder pro Erwachsenem
- **Implementierung:** Phase 3
- **Beispiel:** 1 Erwachsener kann max. 3 Kinder anmelden

**Weitere Regeln:**
- Altersstichtag: 1. Kurstermin (oder konfigurierbar)
- Voraussetzungen: Dokumented, aber vor Anmeldung zu prüfen (Phase 3)

### 12.2 Platzvergabe & Nachrückverfahren

**Algorithmus: Automatische Vergabe (Phase 4)**

```
INPUT: courseRunId, list of enrollments sorted by time
OUTPUT: placement proposals (list of EnrollmentStatus changes)

STEP 1: Count reguläre Plätze & Warteliste
  regulaereCapacity = 10
  wartelistenCapacity = 3
  totalSlots = 13

STEP 2: Sort enrollments by receivedTime (ascending)

STEP 3: Iterate enrollments
  FOR EACH enrollment IN enrollments (sorted by time):
    IF regularSlots_used < regulaereCapacity:
      Propose CONFIRM status
      regularSlots_used += 1
    ELIF wartelistenSlots_used < wartelistenCapacity:
      Propose WAITLIST status
      wartelistenSlots_used += 1
    ELSE:
      Propose NO_PLACEMENT status
      (stop accepting)

STEP 4: Return proposal (admin reviews before confirming)
```

### 12.3 Nachrückverfahren — Kurzfristiges 14-Tage-Verfahren (Phase 4)

```
TRIGGER: Someone cancels < 14 days before course start

ACTION:
  1. Free up slot
  2. Alert Admin in Dashboard
  3. Admin clicks "Start recall"
  4. System sends offer to:
     - Top N waitlisted, OR
     - All waitlisted (configurable)
  5. Offer includes acceptance deadline (24-48 hours, TBD)
  6. First N acceptances → get the free slots
  7. System auto-closes when all slots filled
  8. Send rejection to remaining

CRITICAL: Parallel access protection
  → Database-level lock or optimistic concurrency check
  → Never double-assign same slot
```

### 12.4 Absage-Logik

**Absage vor Frist (Kostenloss):**
```
ACTION: Family calls PATCH /family/enrollments/:id/cancel

IF NOW < cancellationDeadline:
  1. Set enrollment.status = CANCELLED
  2. Free up placement_positions
  3. Log: CancellationRecord {type: SELF, time: NOW, reason: optional}
  4. Trigger: Nachrückrunde falls < 14 days
  5. Send confirmation email
ELSE:
  Reject: "Frist abgelaufen"
```

**Absageanfrage (nach Frist):**
```
ACTION: Family calls POST /family/enrollments/:id/cancellation-request

IF NOW >= cancellationDeadline:
  1. Create CancellationRequest {status: PENDING}
  2. Alert Admin: "Absageanfrage eingegangen"
  3. Family sieht: "Anfrage gestellt, Admin prüft"
ELSE:
  Redirect to direct cancel
```

**Absage durch Admin (kompletter Kurs):**
```
ACTION: Admin calls PATCH /admin/courses/:id/cancel

  1. Set courseRun.status = CANCELLED
  2. Set ALL enrollments.status = CANCELLED
  3. Free ALL placement_positions
  4. Stop active recall rounds
  5. Log: CancellationRecord {type: ADMIN, reason: required, ...}
  6. Send emails to ALL enrolled
  7. Send email to instructor
```

### 12.5 Mindestteilnehmerzahl

**Status-Maschine:**
```
States:
  LIKELY_TO_PROCEED   — Genug Anmeldungen
  BELOW_MINIMUM       — Noch nicht erreicht, noch Zeit
  DECISION_PENDING    — Entscheidungsfrist nahe
  CONFIRMED           — Findet statt
  CANCELLED           — Abgesagt wegen zu wenig

TRIGGER: 1 Woche vor Kursbeginn
  IF enrolled < minParticipants:
    → DECISION_PENDING
    → Admin muss entscheiden
    → Kann mit Admin-Grund überschreiben
```

### 12.6 Berechtigungen & Datenzugriff

| Aktion | Admin | Instructor | Family |
|---|---|---|---|
| Alle Tasks sehen | ✓ | — | — |
| Kurs erstellen/bearbeiten | ✓ | — | — |
| Kurs absagen | ✓ | — | — |
| Kursvorschlag einreichen | — | ✓ | — |
| Kursvorschlag genehmigen | ✓ | — | — |
| Anmeldungen sehen (alle) | ✓ | Nur eigene Kurse | Nur eigene |
| Teilnehmernamen sehen | ✓ | Nach Genehmigung | Nur eige Familie |
| Zeitleisten sehen | ✓ | Nur eigene Kurse | Nur eigene |
| Programmhefte exportieren | ✓ | — | ✓ (öffentlich) |
| Datenschutz-Konsent prüfen | ✓ | Limited | Limited |

---

## 13. Authentifizierung, Rollen und Berechtigungen

### AKTUELLER STATUS: NICHT IMPLEMENTIERT (Phase 2 ausstehend)

### 13.1 Loginverfahren (geplant)

```
1. Benutzer öffnet kursplattform.de
2. Wird zu Login-Seite weitergeleitet (Phase 2: Auth)
3. Eingabe: E-Mail + Passwort
4. Server prüft gegen customers/users Collection
5. Bei Erfolg: JWT Token wird issued
6. Token wird lokal gespeichert (localStorage oder httpOnly Cookie)
7. Token wird bei jedem API-Request im Header mitgesendet
8. Frontend prüft role und zeigt entsprechende Seite
```

**Aktueller Stand:** Nur Mock-Rollenwahl auf Startseite (ohne Login).

### 13.2 Benutzerrollen

| Rolle | Beschreibung | Berechtigungen |
|---|---|---|
| **administrator** | Verwaltet Kurse, Anmeldungen, Wartelisten | Admin-Dashboard volle Zugriff |
| **instructor** | Unterrichtet Kurse, reicht Vorschläge ein | Nur eigene Kurse + Kursvorschläge |
| **family** | Meldet sich selbst an, verwaltet Familie | Nur eigenes Konto + Anmeldungen |
| **(anonym)** | Besucher ohne Login | Nur öffentliches Programm sehen (Phase 5) |

### 13.3 Berechtigungssystem (geplant)

**Implementierung:** PocketBase API-Rules (per Collection)

```
Collection: enrollments
Read Rule:
  @request.auth.role == "admin" ||
  @request.auth.id == enrollments.customerId

Write Rule:
  @request.auth.role == "admin" ||
  (@request.auth.id == enrollments.customerId && status != "confirmed")
```

### 13.4 Geschützte Bereiche

| Bereich | Zugriff | Beschreibung |
|---|---|---|
| `/admin/*` | Admin nur | Admin-Dashboard, Kursverwaltung, Aufgaben |
| `/instructor/*` | Instructor nur | Kursleitung-Ansicht, Vorschlagsformular |
| `/family/*` | Family nur | Familien-Portal, Anmeldungen |
| `/public/programs` | Anonym | Öffentliches Programmheft (Phase 5) |

### 13.5 Sessions / Tokens

**Technologie:** JWT (von PocketBase)

```
Token-Format:
{
  "id": "user-id",
  "email": "user@example.com",
  "role": "administrator" | "instructor" | "family",
  "iat": 1692201600,
  "exp": 1692288000  (8 Stunden)
}

Storage:
- Option 1: localStorage (Standard, aber XSS-anfällig)
- Option 2: httpOnly Cookie (sicherer, aber CSRF-anfällig)
- Noch zu entscheiden

Refresh-Mechanismus:
- Automatisch vor Ablauf
- Oder: Manuell mit refresh-token
```

### 13.6 Bekannte Sicherheitsprobleme (Phase 2+)

- [ ] CSRF-Token für POST/PATCH
- [ ] Rate-Limiting (Brute-Force-Schutz)
- [ ] Audit-Logging für sensible Operationen (Absage, Genehmigung)
- [ ] Datenschutz: Logs sollten keine Finanz-Daten enthalten
- [ ] API-Injection-Schutz (wird von PocketBase bereitgestellt)

### 13.7 Noch fehlende Sicherheitsmaßnahmen

- [ ] 2-Faktor-Authentifizierung (noch nicht geplant, aber sinnvoll)
- [ ] Datenkenn-Maskierung (z. B. Kinder-Namen bei Admin-Interfaces)
- [ ] Audit Trail mit Volltext-Suche
- [ ] Sitzungs-Timeout
- [ ] Passwort-Reset-Workflow
- [ ] Account-Lockout nach fehlgeschlagenen Logins

---

## 14. Konfiguration und Umgebungen

### 14.1 Development-Umgebung

**Wie starten:**
```bash
cd app
npm run dev
```

**Was passiert:**
- Vite Dev Server startet auf `http://localhost:5173`
- HMR (Hot Module Reload) aktiviert
- Logs schreiben in `/logs/vite_console.log` und `/logs/vite_build.log`
- Änderungen an Dateien lösen sofort Neuladen aus

**Besonderheiten:**
- React StrictMode ist aktiv (double-invokes components)
- Mock-Daten statt echter Datenbank
- Keine Authentifizierung (alle Rollen frei zugänglich)

### 14.2 Production-Umgebung (IONOS STRATO)

**URL:** `https://kurse-ai.neuroways.de/` (Beispiel; noch zu konfigurieren)

**Wie wird deployed:**
```bash
cd app
npm run build
# ↓
# /dist/ wird erstellt
```

```bash
git add dist/
git commit "build: production bundle"
git push origin main
```

**Was wird served:**
- `dist/index.html` + Assets
- Statische Single-Page-App
- Keine Server-Side Rendering

**Domain & DNS:**
- Noch zu konfigurieren bei IONOS (Subdomain oder neue Domain)
- Möglich: `kurse.neuroways.de` oder `anmeldung.neuroways.de`

**Umgebungsvariablen (geplant):**

```bash
# .env (nicht in Git!)
VITE_API_BASE_URL=https://pb.kursplattform.ionos.de
VITE_APP_NAME=Kursplattform
VITE_APP_VERSION=1.0.0
```

**Aktueller Stand:** Noch nicht konfiguriert.

### 14.3 Test-Umgebung

**Status:** Nicht vorhanden. Phase 2+?

**Geplant:**
- Staging-Umgebung mit echten Daten (aber nicht Production-Live)
- Separate PocketBase-Instanz
- Separate Domain (z. B. `staging.kurse.neuroways.de`)

---

## 15. Externe Abhängigkeiten

| Dependency | Version | Zweck | Status |
|---|---|---|---|
| **React** | 18.x | UI-Framework | Platform-provided (npm nicht nötig) |
| **React DOM** | 18.x | React rendering | Platform-provided |
| **React Router** | 6.x | Client-side routing | Platform-provided |
| **Vite** | Latest | Build tool | Platform-provided |
| **Tailwind CSS** | 4.x | Styling | Platform-provided + `@import` |
| **lucide-react** | Latest | Icons | Platform-provided |
| **PocketBase** | (JS SDK) | Backend Integration | Platform-provided (Phase 2) |
| **Google Fonts** | — | Typefaces (Fraunces, Karla) | Via `/.sfs/css2?family=…` link |

**Hinweis:** `package.json` hat keine Dependencies, weil alles vom Platform bereitgestellt wird.

---

## 16. Bereits erledigte Entwicklungsaufgaben

| Task | Ergebnis | Status | Nachweis | Commit |
|---|---|---|---|---|
| **Projektstruktur** | Vite + React Setup | ✓ ERLEDIGT | `src/` + `public/` Struktur | `99716b6` |
| **Oberflächenprototyp: Admin** | AdminDashboard.jsx mit Mock-Daten | ✓ ERLEDIGT | 244 Zeilen, Aufgabenübersicht | `34a9cc6` |
| **Oberflächenprototyp: Instructor** | CourseLeaderHome.jsx mit Live-Status | ✓ ERLEDIGT | 293 Zeilen, 3 Tabs | `34a9cc6` |
| **Oberflächenprototyp: Family** | FamilyPortal.jsx mit Anmeldungshistorie | ✓ ERLEDIGT | 380 Zeilen, Zeitleisten | `34a9cc6` |
| **Routing-System** | React Router mit 3 Rollen + 404 | ✓ ERLEDIGT | App.jsx mit Routes | `34a9cc6` |
| **Styling: Tailwind v4** | CSS-Setup mit Config | ✓ ERLEDIGT | tailwind.config.cjs + index.css | `34a9cc6` |
| **Icons: lucide-react** | Icons in allen Komponenten | ✓ ERLEDIGT | 15+ Icons in Verwendung | `34a9cc6` |
| **Responsive Design** | Mobile-first mit Breakpoints | ✓ ERLEDIGT | Tailwind Breakpoints angewendet | `34a9cc6` |
| **Favicon & Branding** | SVG-Icon (Buch + Punkte) | ✓ ERLEDIGT | `public/favicon.svg` 931B | `34a9cc6` |
| **Projektübergabe-Dokumentation** | MASTERPROMPT.md | ✓ ERLEDIGT | 390 Zeilen | `0720ef1` |
| **Handover-Dokumentation** | PROJECT_HANDOVER.md | ✓ ERLEDIGT | Dieses Dokument (Phase 2+) | (aktuell) |

**Zusammenfassung:**
- Alle UI-Komponenten prototypisiert ✓
- Routing & Navigation ✓
- Styling & Icons ✓
- Mock-Daten für Demo ✓
- **Nicht erledigt:** Backend, Authentifizierung, Datenspeicherung, Regelprüfung, Geschäftslogik

---

## 17. Teilweise erledigte Arbeiten

| Arbeit | Bereits umgesetzt | Noch fehlend | Dateien | Abhängigkeiten |
|---|---|---|---|---|
| **Zeitleisten** | Mock-Timeline in FamilyPortal angezeigt | Echo Datenspeicherung, echte Ereignisse | `FamilyPortal.jsx` | Phase 2: Datenanbindung |
| **Status-Badges** | UI mit Farben + Icons implementiert | Echte Status-Übergänge, Validierung | Alle 3 Pages | Phase 3: Regelprüfung |
| **Kapazitätsbalken** | Visuelle Anzeige mit Prozent | Echte Berechnung aus Datenbank | `AdminDashboard.jsx` | Phase 2: Datenanbindung |
| **Admin-Notizen** | In CourseLeaderHome sichtbar | Speichern, Änderungsverlauf | `CourseLeaderHome.jsx` | Phase 2: Backend |
| **Planungsbogen** | Erwähnt in Anforderungen, noch nicht implementiert | Formular-Komponente, Validierung, Speichern | — | Phase 2-3 |

---

## 18. Offene Anforderungen und Backlog

### Priorisierung:

```
P0 = Blockiert nächste Implementierungsphase, kritisch
P1 = Notwendig für funktionsfähiges MVP
P2 = Wichtig, aber kann warten
P3 = Später, optional
```

### Backlog-Liste:

| ID | Beschreibung | Grund | Abhängigkeiten | Erwartetes Ergebnis | Akzeptanzkriterium | Priorität |
|---|---|---|---|---|---|---|
| **PHASE2-1** | PocketBase-Schema aufbauen | Datenmodell ist Grundlage für alles | — | 12+ Collections definiert | SQL-Schema lädt ohne Fehler | P0 |
| **PHASE2-2** | REST-API-Schicht implementieren | Daten vom Frontend zum Backend | PHASE2-1 | Fetch-Wrapper für alle CRUD-Ops | API-Calls testen (Manual oder Unit-Tests) | P0 |
| **PHASE2-3** | Mock-Daten → echte Anmeldungen | Live-System statt Demo | PHASE2-1, PHASE2-2 | AdminDashboard zeigt echte Tasks | Neue Anmeldung wird im Dashboard angezeigt | P1 |
| **PHASE3-1** | Regelmotor: Altersregeln | Anmeldungen validieren | PHASE2-2 | Alterscheck bei Anmeldung | Zu junger Teilnehmer wird abgelehnt | P1 |
| **PHASE3-2** | Regelmotor: Familienregeln | Mindestens 1 Erwachsener pro Kinder-Anmeldung | PHASE2-2 | Validation vor Submit | Kind ohne Erwachsener → Error | P1 |
| **PHASE3-3** | Regelmotor: Kapazitätsregeln | Nicht mehr Anmeldungen als Plätze | PHASE2-2 | Stop accepting wenn voll | Anmeldung gestoppt nach voll | P1 |
| **PHASE3-4** | Ungültige Kombinationen erklären | UX: Verständliche Fehlermeldungen | PHASE3-1 bis 3 | Error Messages in Deutsch | Benutzer versteht, warum Anmeldung abgelehnt | P1 |
| **PHASE3-5** | Admin-Ausnahmen & Dokumentation | Admin kann Regeln überschreiben | PHASE3-1 bis 3 | UI für "Ausnahme mit Grund" | Admin kann begründete Ausnahme erstellen | P2 |
| **PHASE4-1** | Automatischer Vergabevorschlag | Sortierung nach Eingang, Platzverteilung | PHASE2-1, PHASE2-2 | Algorithmus erzeugt Proposal | Admin sieht Vorschlag mit Reihenfolge | P1 |
| **PHASE4-2** | Admin-Genehmigung von Vorschlag | Admin bestätigt oder ändert Vergabe | PHASE4-1 | UI zum Bearbeiten der Reihenfolge | Admin kann Reihenfolge ändern + speichern | P1 |
| **PHASE4-3** | Nachrückverfahren: Regulär (außerhalb 14d) | Nach Wartelistenanfrage: Befristetes Angebot | PHASE2-1, PHASE4-1 | Nächste Person auf Warteliste erhält Offer | Angebotsfrist abgelaufen = Auto-Reject | P2 |
| **PHASE4-4** | Nachrückverfahren: Kurzfristig (14d-Fenster) | Schnelleres Verfahren vor Kursbeginn | PHASE4-3 | Sofortiges Platzangebot an Multi-Wartende | Parallele Zugriffe keine Doppelvergabe | P1 |
| **PHASE4-5** | Parallele Zugriffs-Absicherung | Keine Doppelvergabe von Plätzen | PHASE4-4 | Database-level Lock oder Optimistic Concurrency | 2 gleichzeitige Annahmen → nur 1 erfolgreich | P1 |
| **PHASE4-6** | Absage-Logik | Familie kann vor Frist absagen | PHASE2-1, PHASE2-2 | Cancel-Button funktional | Freie Plätze → Nachrückverfahren startet | P1 |
| **PHASE4-7** | Absageanfrage (nach Frist) | Nach Fristablauf: Admin-Anfrage statt direkte Absage | PHASE4-6 | Absageanfrage-UI | Task im Admin-Dashboard | P1 |
| **PHASE4-8** | Admin-Absage (kompletter Kurs) | Admin kann gesamten Kurs absagen | PHASE2-1, PHASE2-2 | Cancel-Kurs-Button in Admin | Alle Teilnehmer bekommen Benachrichtigung | P2 |
| **PHASE5-1** | Programmausgaben verwalten | Halbjahresprogramme erstellen & versionieren | PHASE2-1 | Programmausgabe-Collection + UI | Admin kann neues Halbjahr-Programm anlegen | P2 |
| **PHASE5-2** | Online-Publikation des Programms | Öffentliche Ansicht der Kurse | PHASE5-1 | Public `/programs` Route | Besucher können Programm durchsuchen | P2 |
| **PHASE5-3** | PDF-Export (barrierefrei) | Programmheft als Download | PHASE5-1 | PDF wird generiert mit a11y-Features | PDF lädt ohne Fehler, ist lesbar | P2 |
| **PHASE5-4** | Excel-Export für Redaktion | Redakteure können Programmheft editieren | PHASE5-1 | Excel-Download mit allen Kurs-Daten | Redakteur kann Excel öffnen & bearbeiten | P2 |
| **PHASE6-1** | E-Mail-Integration | Benachrichtigungen versenden | — | E-Mail-Template für Bestätigung, Absage, etc. | Email wird versendet nach Aktion | P1 |
| **PHASE6-2** | SMS / Push (optional v1) | Alternative Benachrichtigungskanäle | — | SMS-Template | SMS wird versendet (wenn freigeschaltet) | P3 |
| **PHASE6-3** | Erinnerungen nach Zeit | Automatische Reminder (z. B. „Frist morgen") | PHASE6-1 | Cron-Job für Erinnerungen | Email wird am richtigen Zeitpunkt versendet | P2 |
| **PHASE6-4** | Eskalationen | Weitere Admin benachrichtigen bei kritischen Tasks | PHASE6-1 | Escalation-Regeln pro Task-Typ | Admin2 bekommt Email nach 24h Nicht-Bearbeitung | P2 |
| **PHASE6-5** | Zustellfehler-Logging | Fallende Emails werden geloggt | PHASE6-1 | Audit-Log für fehlgeschlagene E-Mails | Admin sieht fehlgeschlagene Zustellungen | P2 |
| **PHASE7-1** | Einwilligungs-Management | Datenschutz: Opt-in für optionale Datenfreigaben | — | Consent-Checkbox-UI, Versionierung | Benutzer kann Opt-in/Opt-out | P1 |
| **PHASE7-2** | Datenfreigabe-Steuerung | Kursleitung sieht nur freigegebene Daten | PHASE7-1 | Datenfilter nach Konsent | Kursleitung sieht nur Namen nach Opt-in | P1 |
| **PHASE7-3** | Audit Trail (Änderungshistorie) | Wer hat was wann geändert | PHASE2-1 | audit_logs Collection mit vollständigem Log | Admin kann Änderungshistorie prüfen | P2 |
| **PHASE7-4** | DSGVO-Compliance-Check | Datenschutzkontrolle vor Live-Gehen | PHASE7-1 bis 3 | Externe Prüfung | Keine Datenschutz-Beanstandungen | P1 |
| **PHASE7-5** | Barrierefreier Audit | WCAG 2.1 AA Compliance | — | Automated + Manual Testing | Alle Seiten sind a11y-konform | P2 |
| **DECI-1** | 14 strategische Fragen klären | Datenmodell-Entscheidungen | — | Entscheidungsprotokoll | Team hat Klarheit, dev kann starten | P0 |

---

## 19. Bekannte Fehler und technische Schulden

### Fehler (Bugs):

| Fehler | Auswirkung | Ursache | Workaround | Priorität |
|---|---|---|---|---|
| Keine Echo-Fehler bekannt | — | Prototyp nur mit Mock-Daten | — | — |
| Typefaces nicht geladen | Design-Bruch | Link zu Google Fonts noch nicht in index.html | Fallback zu System-Fonts | P2 |
| Responsive-Design nicht vollständig getestet | Edge Cases möglich | Nur visuelles Testing, kein Unit-Test | Manuelles Testing auf 3 Breakpoints | P2 |

### Technische Schulden:

| Schuld | Grund | Lösung | Priorität |
|---|---|---|---|
| **Mock-Daten statt Datenbank** | Prototyp ohne Backend | Phase 2: PocketBase-Integration | P0 |
| **Keine Authentifizierung** | Alle Rollen frei zugänglich | Phase 2: JWT + PocketBase Auth | P0 |
| **Keine Geschäftslogik** | Nur UI-Prototyp | Phase 3-4: Regelmotor, Vergabeverfahren | P1 |
| **Keine Tests** | Quality-Sicherung fehlend | Unit-Tests (Phase 2+), E2E-Tests (Phase 5+) | P2 |
| **Tailwind Config minimal** | Kein Custom-Branding | tailwind.config.cjs erweitern (fonts, colors) | P2 |
| **Keine Error Boundaries** | Fehler können App crashen | React Error Boundaries hinzufügen | P2 |
| **Hardcoded Mock-Daten** | Nicht wartbar | In Phase 2 durch API-Calls ersetzen | P1 |

---

## 20. Getroffene Architektur- und Entwicklungsentscheidungen

| Entscheidung | Hintergrund | Gewählte Lösung | Bekannte Alternativen | Konsequenzen |
|---|---|---|---|---|
| **Frontend-Framework** | Single-Page-App für schnelle Bedienung | React 18 + Vite | Vue, Svelte, Angular | Steile Lernkurve für Anfänger, aber Standard-Stack |
| **Styling** | Rapid UI Development | Tailwind CSS v4 | CSS-in-JS, BEM, etc. | Großes CSS-Bundle, aber sehr schnell zu hacken |
| **Router** | Client-side Navigation für SPA | React Router 6 | Next.js, Remix | Kein SSR möglich, aber vollständige Client-Kontrolle |
| **Icons** | Schneller Prototyp | lucide-react | SVG-Import, Font Awesome | Kleines Bundle, gut für grisende Icons |
| **Backend (Phase 2)** | Schnelle MVP, keine DevOps-Komplexität | PocketBase | Firebase, Supabase, Node.js+Express | SQLite gut für klein-mittel, aber später Scaling-Fragen |
| **Datenspeicherung (Phase 2)** | Real-Time, keine Komplexität | SQLite (via PocketBase) | PostgreSQL, MongoDB | Keine großen analytischen Queries, aber einfach |
| **Authentifizierung (Phase 2)** | Standard-Sicherheit | JWT Tokens | OAuth2, Session-Cookies | Stateless, gut für SPA, aber XSS-Risiko bei localStorage |
| **Deployment** | Keine Infrastruktur-Komplexität | IONOS STRATO static hosting | Vercel, Netlify, Heroku | Platform vendor lock-in, aber sehr einfach |
| **Rollen-Basierung (Phase 1)** | Einfaches Demo-Rollensystem | Hardcoded 3 Rollen (Admin, Instructor, Family) | Dynamic role system | Skaliert nur bis ~10 Rollen, dann refactor nötig |
| **Mock-Daten (Phase 1)** | Schneller Prototyp | Hardcoded in Komponenten | Separate Mock-Service | Schwer zu ändern, müssen Phase 2 raus |
| **Fehlermanagement** | Aktuell nicht implementiert | Try-Catch wird Phase 2 hinzugefügt | Global Error Boundary | Keine Fehler-Recovery aktuell |

---

## 21. Offene Entscheidungen

Diese Entscheidungen müssen **vor Phase 2** mit dem NeuroWays-Team geklärt werden:

| # | Fragestellung | Warum relevant | Betroffene Bereiche | Mögliche Optionen | Was blockiert es |
|---|---|---|---|---|---|
| **1** | **Platzdefinition: Zählt jeder Mensch als Platz oder eine Familienbuchung nur als 1 Platz?** | Unterschiedliche Kapazitätslogik | Vergabeverfahren, Wartelisten | A) Pro Person, B) Pro Buchung | Datenmodell (placement_positions) |
| **2** | **Vergabereihenfolge: Nach Buchungseingang oder nach einzelnen Teilnahmeanmeldungen?** | Beeinflusst Fairness bei Mehrpersonen-Buchungen | Algorithmus Phase 4 | A) Buchungszeit, B) Person-Reihenfolge | Geschäftslogik |
| **3** | **Familien nicht trennen: Müssen zusammen angemeldete Familienmitglieder gemeinsam angenommen/abgelehnt werden?** | Familienlogik | Vergabe, Nachrücken | A) Gemeinsam, B) Individual | Regel-Engine, Nutzer-Erwartung |
| **4** | **Überbuchung: Nach Erreichen von regulär+Warteliste, wirklich schließen oder unverbindliche Nachrückinteressenten erfassen?** | Informationsbeschaffung | Kursverwaltung Phase 5 | A) Strikt schließen, B) Unverbindliche 3. Liste | Datenmodell |
| **5** | **14-Tage-Regel: Genau 14 Tage vor 1. Termin oder flexibel konfigurierbar?** | Geschwindigkeit Nachrückverfahren | Zeitpunkte Phase 4 | A) Hard 14 Tage, B) Pro Kurs konfigurierbar | Regelkonfiguration |
| **6** | **Annahmefrist: Allgemeine Standard (24/48h) oder je Nachrückrunde?** | Teilnehmer-UX | Angebots-Timing Phase 4 | A) Global 24h, B) Pro Runde 24/48/72h | Konfiguration |
| **7** | **Wartelistenende: Bleiben Personen nach fehlgeschlagenem Platzangebot auf der Warteliste oder endet die Anmeldung?** | Chance auf späteren Platz | Nachrück-Logik Phase 4 | A) Bleiben drauf, B) Endet | Datenmodell status-flow |
| **8** | **Nichtreaktion: Ungültig für diese Runde oder endet gesamte Wartelistenanmeldung?** | Re-Engagement | Phase 4 Follow-up | A) Nur diese Runde, B) Komplett endet | Benutzer-Reputations-System |
| **9** | **Zahlung: Verarbeitet die Plattform Gebühren oder delegiert an externe App (z. B. Stripe)?** | PCI-Compliance, Komplexität | Zahlungs-Integration Phase 2+ | A) Nur Tracking (Checkbox), B) Integration (Stripe/Mollie) | Sicherheits- & Compliance-Anforderungen |
| **10** | **Importziel: Welche bestehendesystem liefert Excel & welche Felder sind verbindlich?** | Daten-Migration | Phase 2: Import-Feature | A) Nein, Neustart, B) Ja, aus System X | Datenmodell-Abbildung |
| **11** | **Kommunikationskanäle: Nur Plattform + E-Mail oder auch SMS/Push für MVP?** | Reichweite, UX | Phase 6: Benachrichtigungen | A) E-Mail only, B) E-Mail + SMS | Nutzer-Expectations |
| **12** | **Kursleitung-Sichtbarkeit: Ab wann darf Kursleitung Namen sehen?** | Datenschutz | Berechtigungssystem Phase 2 | A) Nach Anmeldung, B) Nach Annahme, C) 1 Woche vor Start | DSGVO-Compliance |
| **13** | **Programmheft: Nur Export (strukturiert) oder druckfertiges PDF mit automatischem Satz?** | Zeit & Budget | Phase 5: Export-Feature | A) Nur Export, B) Auto-PDF | Design-Workload |
| **14** | **Statistiken & Reporting: Soll Admin-Dashboard Auswertungen haben (z. B. Anmeldequoten)?** | Management-Infos | Analytics Phase 5+ | A) Nein, Fokus auf Tasks, B) Ja, Dashboard | Datenmodell + Queries |

**Nächster Schritt:** Team-Klärung dieser 14 Fragen vor Datenbankdesign (Phase 2).

---

## 22. Tests und Qualitätssicherung

### Aktueller Status: KEINE TESTS

| Test-Typ | Status | Hinweise |
|---|---|---|
| **Unit-Tests** | Keine | React Components nicht getestet |
| **Integration-Tests** | Keine | API-Calls (Phase 2) nicht getestet |
| **E2E-Tests** | Keine | Workflows nicht automatisiert getestet |
| **Visual Regression** | Manuelle (Ad-hoc) | Responsive Design nur visuell geprüft |
| **Accessibility-Audit** | Geplant (Phase 7) | WCAG 2.1 AA noch nicht geprüft |
| **Performance-Testing** | Geplant | LCP, FID, CLS noch nicht gemessen |

### Testlücken:

- ❌ Regelprüfung nicht getestet
- ❌ Vergabeverfahren nicht getestet
- ❌ Nachrücklogik nicht getestet
- ❌ Fehlerhafte Eingaben nicht getestet
- ❌ Parallele Zugriffe nicht getestet
- ❌ Authentifizierung nicht getestet

### Buildstatus:

**Lokaler Build (npm run build):**
```bash
✓ No errors
✓ dist/ created successfully
✓ JavaScript bundled: ~190 KB (index-DdfXoMcc.js)
✓ CSS bundled: ~1 KB (index-Bg07ESoT.css)
```

**Vite HMR (npm run dev):**
```bash
✓ Running on http://localhost:5173
✓ Hot Module Reload: OK
✓ Logs written to logs/vite_*.log
```

---

## 23. Deployment und Betrieb

### Deployment-Prozess (aktuell)

```
1. Entwicklung lokal
   npm run dev
   → Änderungen testen

2. Build für Production
   npm run build
   → dist/ wird erstellt

3. Git-Commit
   git add dist/
   git commit "build: [message]"
   git push origin main

4. IONOS STRATO Platform
   → Erkennt neuen dist/
   → Deployed automatisch
   → Verfügbar unter https://kurse-ai.ionos.de/ (URL TBD)
```

### Hosting (geplant)

| Aspekt | Wert |
|---|---|
| **Platform** | IONOS STRATO AI |
| **Deployment-Methode** | Static File Hosting (aus `dist/`) |
| **Domain** | Noch zu konfigurieren (z. B. `kurse.neuroways.de`) |
| **SSL/TLS** | Ja, automatisch durch IONOS |
| **CDN** | Ja, über IONOS STRATO |
| **Rollback** | Git-History ermöglicht Rollback |

### PocketBase Backend (Phase 2+)

**Hosting (noch zu klären):**
- Option 1: IONOS VM für PocketBase
- Option 2: PocketBase Cloud (wenn vorhanden)
- Option 3: Docker-Container bei IONOS

**URL:** Zu konfigurieren (z. B. `pb.kurse.neuroways.de`)

### Monitoring (aktuell: Keine)

**Geplant (Phase 2+):**
- Error Logging (Sentry oder ähnlich)
- Uptime Monitoring
- Performance Metrics
- Audit Logs

---

## 24. Risiken

### Technische Risiken

| Risiko | Auswirkung | Wahrscheinlichkeit | Empfohlene Gegenmaßnahme |
|---|---|---|---|
| **PocketBase Skalierungslimit** | Zu viele Anmeldungen = Datenbank überlastet | Mittel (später) | Frühzeitig Lasten-Tests durchführen; evtl. zu PostgreSQL migrieren |
| **Parallele Zugriffs-Wettlauf** | Doppelvergabe von Plätzen bei Nachrücken | Hoch (kritisch) | Database-level Locks/Transactions implementieren; umfangreich testen |
| **Fehlgeschlagene E-Mail** | Teilnehmer bekommt Bestätigung nicht | Mittel | Retry-Logik, Audit-Log für fehlgeschlagene E-Mails, Admin-Dashboard zeigt Fehler |
| **Unerwartete Regelkombinationen** | Anmeldung wird fälschlicherweise abgelehnt | Mittel | Extensive Test-Matrix (Altersgruppen, Familie, Kapazität); Admin-Override-Funktion |
| **UI-Responsiveness auf alten Geräten** | Schlechte Nutzererfahrung | Niedrig (modernes Tailwind) | Browser-Kompatibilität testen (IE 11 nicht unterstützen) |

### Fachliche/Organisatorische Risiken

| Risiko | Auswirkung | Wahrscheinlichkeit | Empfohlene Gegenmaßnahme |
|---|---|---|---|
| **Datenschutz-Compliance-Verletzung** | Bußgeld, Vertrauensverlust | Hoch (DSGVO-kritisch) | Phase 7: Externe DSGVO-Prüfung VOR Live-Gehen; Datenschutz-Folgenabschätzung |
| **Benutzer-Workflow unklar** | Hohe Supportlast, Frustration | Mittel | Beta-Test mit echten Nutzern (Kursleitung, Familien); Feedback-Loop vor MVP |
| **14 Strategiefragen unbeantwortet** | Design-Fehler, Umarbeiten Phase 2 | Hoch | Diese Fragen SOFORT mit Team klären, bevor DB-Design beginnt |
| **Falsches Datenmodell** | Große Refactoring nötig | Hoch (bei unklar Q.) | Datenmodell-Review mit Fachexperte (NeuroWays) vor Implementierung |
| **Zu viele Features für MVP** | Projekt verpasst Deadline | Mittel | Strikte Priorisierung: MVP = Admin-Aufgabenmanagement + Familie-Anmeldung. Rest = Phase 2+ |
| **Admin-Schulung fehlend** | System wird falsch verwendet | Mittel | Vor Launch: Admin-Training, Dokumentation, Video-Tutorials |

---

## 25. Empfohlene nächste Entwicklungsschritte

Basierend auf dem aktuellen Prototypen-Stand:

### Schritt 1: Strategische Entscheidungen klären (Woche 1)

**Aufgabe:** Die 14 offenen Fragen mit dem NeuroWays-Team abstimmen.

**Wie:** 
- Team-Meeting (2-3 Stunden)
- Durchgehen der Fragen (#1-14 aus Kapitel 21)
- Dokumentieren der Entscheidungen
- Entscheidungsprotokoll in Repository committen

**Output:**
- Entscheidungsprotokoll (Markdown)
- Klarheit über Datenmodell-Anforderungen
- Roadmap bestätigt

**Akzeptanzkriterium:** Alle 14 Fragen beantwortet, Team hat Unterschriften gegeben.

---

### Schritt 2: Datenmodell-Design (Woche 2)

**Aufgabe:** Relationales Datenmodell entwerfen (SQL-Schema).

**Was zu tun:**
1. Collections definieren (customers, persons, enrollments, placements, etc.)
2. Felder pro Collection dokumentieren
3. Beziehungen zeichnen (Entity-Relationship-Diagramm)
4. Indizes planen
5. PocketBase Collections anlegen (Testumgebung)

**Betroffene Dateien/Komponenten:**
- Kein Code in `app/src/` noch geändert
- Datenmodell-Dokument anlegen: `docs/DATABASE_SCHEMA.md`

**Abhängigkeiten:** Schritt 1 (Entscheidungen)

**Akzeptanzkriterium:**
- SQL-Schema lädt ohne Fehler
- Beispieldaten können eingefügt werden
- Queries getestet (z. B. „Alle Anmeldungen für Kurs X")

---

### Schritt 3: REST-API-Schicht aufbauen (Woche 3)

**Aufgabe:** REST-API für alle CRUD-Operationen implementieren (PocketBase Routes + Validierung).

**Was zu tun:**
1. PocketBase API-Rules pro Collection schreiben
2. Authentifizierung (JWT) aktivieren
3. Validierungs-Regeln (min/max Länge, Enum, etc.)
4. Dokumentation: API-Endpoints auflisten
5. Postman/Insomnia Collections erstellen (Testing)

**Betroffene Dateien:**
- PocketBase Admin-Interface (Collections konfigurieren)
- Neuer Ordner: `docs/API.md` (Endpunkt-Dokumentation)

**Abhängigkeiten:** Schritt 2 (Datenmodell)

**Akzeptanzkriterium:**
- GET /api/courses → Returns Kurse
- POST /api/enrollments → Neue Anmeldung erstellen (mit Validierung)
- Alle Operationen im Postman testbar

---

### Schritt 4: Frontend → Backend Anbindung (Woche 4-5)

**Aufgabe:** Mock-Daten in `AdminDashboard`, `CourseLeaderHome`, `FamilyPortal` durch echte API-Calls ersetzen.

**Was zu tun:**
1. Fetch-Wrapper schreiben (API Service)
2. useEffect Hooks in Pages hinzufügen (Daten laden)
3. Error-Handling + Loading States
4. Mock-Komponenten entfernen
5. Testdaten in PocketBase einfügen

**Betroffene Dateien:**
```
src/
  api/
    enrollments.js        (NEW)
    courses.js            (NEW)
    tasks.js              (NEW)
  pages/
    AdminDashboard.jsx    (MODIFY)
    CourseLeaderHome.jsx  (MODIFY)
    FamilyPortal.jsx      (MODIFY)
```

**Abhängigkeiten:** Schritt 3 (API-Schicht)

**Akzeptanzkriterium:**
- AdminDashboard zeigt echte Tasks
- CourseLeaderHome zeigt echte Kurse mit Live-Belegung
- FamilyPortal zeigt echte Anmeldungen

---

### Schritt 5: Regelprüfung implementieren (Woche 6-7)

**Aufgabe:** Regel-Engine für Validierung (Alter, Familie, Kapazität).

**Was zu tun:**
1. Rule-Engine-Klasse schreiben (`src/rules/RuleEngine.js`)
2. Pro Regel eine Validate-Funktion
3. In Frontend integrieren: Fehlerbehandlung bei Anmeldung
4. In Backend integrieren: Server-seitige Validierung
5. Test-Suite schreiben (Unit-Tests für Regeln)

**Betroffene Komponenten:**
- Neue Komponente: Enrollment-Form (mit Fehlerbehandlung)
- `RuleEngine.js` (Geschäftslogik)
- `enrollments.js` API-Wrapper

**Abhängigkeiten:** Schritt 4 (Frontend-Backend Anbindung)

**Akzeptanzkriterium:**
- Kind < 18 Jahren → Error: „Zu jung"
- Kinder ohne Erwachsener → Error
- Anmeldungen über Kapazität → Error: „Voll"

---

### Schritt 6: Platzvergabe-Algorithmus (Woche 8)

**Aufgabe:** Automatischer Vergabe-Vorschlag (nach Eingangsreihenfolge).

**Was zu tun:**
1. Vergabealgorithmus implementieren (Phase 4 aus Masterprompt)
2. Vorschlag in Admin-UI anzeigen
3. Admin kann Reihenfolge ändern & bestätigen
4. Nach Bestätigung: Benachrichtigungen auslösen (E-Mail, Phase 6)

**Betroffene Komponenten:**
- `src/logic/PlacementEngine.js` (NEW)
- Admin-Interface erweitern: „Platzvergabe"-Seite (NEW)
- Bestätigungs-Dialog

**Abhängigkeiten:** Schritt 5 (Regel-Engine)

**Akzeptanzkriterium:**
- 15 Anmeldungen, 10 Plätze, 3 Warteliste
- Algorithm: 1-10 → Platz, 11-13 → Warteliste, 14-15 → Kein Platz
- Admin kann Reihenfolge ändern, dann speichern

---

### Schritt 7: Nachrückverfahren & Absagen (Woche 9-10)

**Aufgabe:** Nachrückverfahren (regulär + 14-Tage-Fenster) + Absage-Logik.

**Was zu tun:**
1. Recall-Engine implementieren (wer bekommt Platzangebot)
2. Parallele Zugriffs-Absicherung (Database-Locks)
3. Absage-Dialog für Family (vor/nach Frist)
4. Admin-Task für Absagen anzeigen

**Betroffene Komponenten:**
- `src/logic/RecallEngine.js` (NEW)
- `FamilyPortal` erweitern: Absage-Dialog
- `AdminDashboard` erweitern: Absagen-Task

**Abhängigkeiten:** Schritt 6 (Platzvergabe)

**Akzeptanzkriterium:**
- Jemand sagt ab → Freier Platz
- Admin startet Nachrückrunde → Nächste Warteliste-Person erhält Angebot
- 2 parallele Annahmen bei 1 Platz → Nur 1 erfolgreich

---

### Schritt 8: Benachrichtigungen & Eskalationen (Woche 11)

**Aufgabe:** E-Mail-Integration (Bestätigung, Absage, Platzangebot, Erinnerungen).

**Was zu tun:**
1. E-Mail-Provider konfigurieren (SendGrid, Mailgun, etc. — ODER PocketBase-Feature prüfen)
2. E-Mail-Templates schreiben (Bestätigung, Angebot, Absage, Erinnerung)
3. Trigger definieren (wann wird E-Mail versendet)
4. Zustellfehler-Logging im Audit-Trail

**Achtung:** PocketBase Email API möglicherweise deaktiviert in dieser Umgebung (siehe Rule 7).

**Betroffene Komponenten:**
- Backend: E-Mail-Service
- Admin-Dashboard: Zeige fehlgeschlagene E-Mails

**Abhängigkeiten:** Schritt 7 (Absagen-Logik)

**Akzeptanzkriterium:**
- Anmeldung erfolgreich → E-Mail mit Bestätigung
- Platzangebot erhalten → E-Mail mit Annahme-Frist
- E-Mail-Versand-Fehler → Wird im Admin-Dashboard angezeigt

---

### Schritt 9: Programmhefte & Exporte (Woche 12)

**Aufgabe:** Halbjahresprogramm erstellen, veröffentlichen, exportieren (PDF, Excel).

**Was zu tun:**
1. Programmausgabe-Collection + UI
2. Kurse zu Programm hinzufügen
3. PDF-Export (HTML → PDF, z. B. puppeteer oder PDFKit)
4. Excel-Export (via XLSX-Library)
5. Öffentliche Ansicht: `/programs` Route

**Betroffene Komponenten:**
- Admin-Seite: Programmverwaltung (NEW)
- Export-Service (NEW)
- Public-Seite: Programm-Ansicht (NEW)

**Abhängigkeiten:** Schritt 3+ (Datenanbindung)

**Akzeptanzkriterium:**
- Admin kann neues Programm anlegen
- Kurse können zum Programm hinzugefügt werden
- PDF wird generiert & ist lesbar
- Excel kann von Redakteuren bearbeitet werden

---

### Schritt 10: Datenschutz & Compliance (Woche 13)

**Aufgabe:** DSGVO-Compliance, Einwilligungen, Audit Trail.

**Was zu tun:**
1. Externe DSGVO-Prüfung durchführen
2. Einwilligungs-UI implementieren (Opt-in-Checkboxes)
3. Audit-Trail-Logs in Admin-Ansicht
4. Datenfreigabe-Steuerung (wer sieht welche Daten)
5. Datenschutz-Erklärung verfassen

**Betroffene Komponenten:**
- consent_records Collection
- Enrollment-Form: Consent-Section
- Admin-Seite: Audit-Logs
- Öffentliche Seite: Datenschutzerklärung

**Abhängigkeiten:** Schritt 4+ (Datenanbindung)

**Akzeptanzkriterium:**
- Externe Prüfer: „DSGVO-konform" ✓
- Familie kann Einwilligungen widerrufen
- Admin sieht Audit-Log „Wer hat Eva Müller gelesen?"

---

### Schritt 11: Testing & Qualitätssicherung (parallel zu Schritt 2-10)

**Aufgabe:** Unit-Tests, E2E-Tests, Accessibility-Audit.

**Was zu tun:**
1. Vitest Setup + Unit-Tests für Regel-Engine
2. Cypress Setup + E2E-Tests für Benutzer-Flows
3. WCAG 2.1 AA Audit (axe-DevTools oder extern)
4. Performance-Testing (Lighthouse)
5. User-Testing mit echten Nutzern (Beta)

**Betroffene Dateien:**
- `src/__tests__/` (NEW)
- `e2e/` (NEW)
- Ci/CD-Pipeline (GitHub Actions)

**Abhängigkeiten:** Alle vorherigen Schritte

**Akzeptanzkriterium:**
- ≥ 80% Code-Coverage für Geschäftslogik
- Alle Haupt-Flows mit E2E-Tests abgedeckt
- WCAG AA-konform
- Lighthouse Score ≥ 90

---

### Schritt 12: Pre-Launch & Deployment (Woche 14)

**Aufgabe:** Finalcheck, Dokumentation, Go-Live.

**Was zu tun:**
1. Admin-Training durchführen
2. Dokumentation finalisieren (User-Handbuch, API-Docs)
3. Deployment-Checkliste durchgehen
4. Pre-Production-Test mit echten Kursdaten
5. Go-Live: Live-Umgebung aktivieren

**Betroffene Komponenten:**
- Dokumentation: `docs/` erweitern
- Trainings-Videos erstellen
- Deployment-Skripte prüfen

**Abhängigkeiten:** Alle vorherigen Schritte

**Akzeptanzkriterium:**
- Admin kann System eigenständig nutzen
- Handbuch ist vollständig
- Pre-Prod-Tests bestanden
- Live-URL funktioniert

---

### Schritt 13: Post-Launch Optimierung & Monitoring (laufend)

**Aufgabe:** Fehler beheben, Performance optimieren, Nutzer-Feedback integrieren.

**Was zu tun:**
1. Error-Logging aktivieren (Sentry)
2. Uptime-Monitoring
3. Nutzer-Feedback sammeln (Interviews, Analytics)
4. Bugs priorisieren & beheben
5. Performance-Optimierungen

**Abhängigkeiten:** Go-Live

**Akzeptanzkriterium:**
- <0,1% Error-Rate
- Nutzer-Zufriedenheit ≥ 4/5
- Load-Time < 2s

---

## 26. Einstiegspunkt für die nächste KI

### Schritt-für-Schritt Anleitung

**1. Projekt verstehen:**
```
Lade diese Datei: docs/handover/PROJECT_HANDOVER.md
Lese Kapitel 1-5 für Kontext.
→ Du weißt jetzt: Was wird gebaut, aktueller Stand, was ist offen.
```

**2. Code erkunden:**
```
Erkunde das Repository:
  app/src/pages/AdminDashboard.jsx     → Admin-UI (244 Z.)
  app/src/pages/CourseLeaderHome.jsx   → Instructor-UI (293 Z.)
  app/src/pages/FamilyPortal.jsx       → Family-UI (380 Z.)
  app/src/App.jsx                      → Router + Layout

Starte dev-server:
  cd app && npm run dev
  → Öffne http://localhost:5173 im Browser
  → Teste alle 3 Rollen
```

**3. Architektur verstehen:**
```
Kapitel 8: Technische Architektur
Kapitel 9: Repository-Struktur
Kapitel 11: API-Design (noch nicht implementiert)
→ Weiß jetzt: Wie ist Code organisiert, wie soll Backend aussehen.
```

**4. Bekannte Entscheidungen respektieren:**
```
Kapitel 20: Getroffene Entscheidungen (warum React, Tailwind, etc.)
Kapitel 21: Offene Entscheidungen (14 Fragen zum Team klären)
→ Nicht widersprechen, sondern diese Entscheidungen fortführen.
```

**5. Blockaden identifizieren:**
```
Kapitel 21: Offene Entscheidungen
Sind alle 14 Fragen geklärt? NEIN → STOP
→ Team muss diese klären, bevor Datenmodell entworfen wird.
```

**6. Nächste Arbeitsschritte:**
```
Kapitel 25: Empfohlene nächste Entwicklungsschritte
Folge der Reihenfolge: 
  Schritt 1 (Decisions) → Schritt 2 (Datenmodell) → ... → Schritt 12 (Launch)
Nicht durcheinander machen.
```

**7. Test & Verifizierung:**
```
Bevor Du Code änderst:
  npm run dev     → Dev-Server startet ohne Fehler?
  npm run build   → Build ist erfolgreich?
  git status      → Working tree clean?
  
Nach Änderungen:
  Prüfe Logs: /logs/vite_*.log
  Teste alle 3 Rollen im Browser
```

**8. Commit & Push:**
```
git add [geänderte Dateien]
git commit -m "feat: [Beschreibung]"
git push origin main

Halte git History sauber. Ein Commit = Ein Feature/Fix.
```

---

## 27. Unsicherheiten und fehlende Informationen

Diese Punkte **konnten aus den verfügbaren Informationen NICHT zuverlässig bestimmt werden:**

### Ungeklärt — Fachlich:

| Punkt | Grund | Folge |
|---|---|---|
| **Datenmodell für Familienkurse** | Die 14 Entscheidungsfragen sind nicht beantwortet | Wird Phase 2 blockieren — Team muss vorab klären |
| **Zahlungs-Integration** | Frage #9 nicht beantwortet (Stripe vs. nur Tracking) | Backend-Anforderung unklar |
| **Import-Anforderungen** | Frage #10 nicht beantwortet (welches Alt-System?) | Datenmodell-Design unklar |
| **Nachrück-Timing** | Frage #5 nicht beantwortet (hart 14d vs. flexibel) | Geschäftslogik unklar |
| **Wartelisten-Persistence** | Frage #7 nicht beantwortet (bleiben auf Liste oder Ende?) | Prozess-Design unklar |

### Ungeklärt — Technisch:

| Punkt | Grund | Folge |
|---|---|---|
| **PocketBase-URL** | Noch nicht konfiguriert | Phase 2: Wird zur Laufzeit gesetzt |
| **E-Mail-Provider** | Noch nicht gewählt | Phase 6: Blockiert Benachrichtigungen |
| **Database Migration (Alt → Neu)** | Frage #10 nicht beantwortet | Datenimport-Prozess ungeklärt |
| **Rate-Limiting** | Nicht geplant | Phase 2+: Zu definieren |
| **Typefaces** | Erwähnt (Fraunces, Karla) aber noch nicht geladen | Ästhetisches Branding nicht abgeschlossen |

### Ungeklärt — Betrieb:

| Punkt | Grund | Folge |
|---|---|---|
| **Monitoring-Strategie** | Nicht definiert | Phase 2+: Uptime, Errors, Performance unklar |
| **Disaster Recovery** | Nicht geplant | Backup-Strategie unklar |
| **Support-Prozess** | Nicht definiert | Wer beantwortet Nutzer-Fragen? |
| **Admin-Training** | Nicht geplant | Go-Live-Risiko hoch |

### Problematische Annahmen:

| Annahme | Basis | Risiko |
|---|---|---|
| **Mock-Daten sind repräsentativ** | Schnelle Demo | Real-World-Datenmengen könnten Skalierungs-Issues offenbaren |
| **Responsive Design funktioniert bei <375px** | Nur visuell geprüft | Kleine Devices (alte Handys) können nicht berücksichtigt sein |
| **Alle Rollen sind mit 3 Tabs genug** | Prototyp | Mit wachsenden Funktionen möglicherweise zu flach |
| **PocketBase passt für immer** | Schnelles MVP | Später Datenmigration zu PostgreSQL möglich nötig |

---

## 28. Übergabe-Check

Vor Abschluss dieser Übergabe-Dokumentation:

| Punkt | Status | Nachweis |
|---|---|---|
| ✓ Anforderungen erfasst | JA | Kapitel 3-4: 58 Anforderungen kategorisiert |
| ✓ Implementierte Funktionen erfasst | JA | Kapitel 5: UI-Prototyp, Routing, Styling dokumentiert |
| ✓ Offene Anforderungen erfasst | JA | Kapitel 18: Backlog mit Prioritäten |
| ✓ Teilweise implementierte Funktionen erfasst | JA | Kapitel 17: Zeitleisten, Status-Badges, etc. |
| ✓ Seitenstruktur erfasst | JA | Kapitel 6: Navigation, Routes dokumentiert |
| ✓ Repositorystruktur erfasst | JA | Kapitel 9: Verzeichnisse + Dateien dokumentiert |
| ✓ Architektur erfasst | JA | Kapitel 8: Frontend → Backend → Datenbank |
| ✓ Datenbank erfasst | TEILWEISE | Kapitel 10: Schema geplant, nicht implementiert |
| ✓ APIs erfasst | TEILWEISE | Kapitel 11: Endpunkte geplant, nicht implementiert |
| ✓ Geschäftslogik erfasst | TEILWEISE | Kapitel 12: Regeln + Algorithmen beschrieben, nicht implementiert |
| ✓ Erledigte Aufgaben erfasst | JA | Kapitel 16: Oberflächenprototyp, Routing, Styling |
| ✓ Offene Aufgaben erfasst | JA | Kapitel 25: 13 Entwicklungsphasen mit Aufgaben |
| ✓ Fehler & Schulden erfasst | JA | Kapitel 19: Bugs, Schulden dokumentiert |
| ✓ Deployment erfasst | JA | Kapitel 23: Build, Hosting, PocketBase-Setup |
| ✓ Nächste Schritte definiert | JA | Kapitel 25: 13 konkrete Phasen mit Akzeptanzkriterien |
| ✓ Unsicherheiten ausdrücklich dokumentiert | JA | Kapitel 27: Alle Lücken aufgelistet |
| ✓ Keine Secrets enthalten | JA | Keine API-Keys, Passwörter oder Tokens in dieser Datei |
| ✓ Keine vermuteten Informationen als Fakten | JA | Alles ist gekennzeichnet als IMPLEMENTIERT / GEPLANT / UNGEKLÄRT |

**Gesamt-Check:** ✓ BESTANDEN

---

## ABSCHLUSS

Diese Übergabe-Dokumentation wurde erstellt am **15. August 2026** auf Basis des Repository-Standes `0720ef1` (MASTERPROMPT commit).

**Zweck:** Vollständige Rekonstruktion des Projektstandes für KI-Handoff und Teamkontinuität.

**Nächster Handoff-Befehl:**
```
Lade docs/handover/PROJECT_HANDOVER.md und fahre fort mit:
[Deine spezifische Aufgabe]
```

**Fragen zur Übergabe?** → Diese Datei ist Quelle der Wahrheit; bei Widersprüchen: Repository ist aktuell.

---

**Datei:** `/docs/handover/PROJECT_HANDOVER.md`  
**Größe:** ~25 KB  
**Format:** Markdown  
**Erstellungswahrheit:** 15. August 2026, 09:16 UTC
