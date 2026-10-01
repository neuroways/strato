# KURSE_AI — Masterprompt für Projektkontinuität

**Projekt:** Kurs- und Anmeldeplattform für NeuroWays gGmbH  
**Repository:** https://github.com/neuroways/kurse_ai  
**Entwicklungsstand:** Oberflächenprototyp, Phase 1 abgeschlossen

---

## 1. PROJEKTKONTEXT & ZIEL

**Was wird gebaut?**  
Eine zentrale, digitale Kurs- und Anmeldeplattform, die Informationsverluste verhindert, Wartelisten intelligent verwaltet und Administration, Kursleitung sowie Familien auf demselben Stand hält.

**Kernproblem gelöst:**
- ✓ Anmeldungen gehen nicht mehr verloren (zentrales System)
- ✓ Bestätigungen und Rückfragen sind nicht in E-Mails vergessen (in der Plattform dokumentiert)
- ✓ Freie Plätze werden sofort erkannt (Live-Dashboards)
- ✓ Wartelisten mit Nachrückverfahren (strukturiert, nicht manuell)
- ✓ Änderungen erreichen alle beteiligten Stellen gleichzeitig

**Vision:**  
Die Plattform ist die verbindliche Informationsquelle. Eine Änderung gilt als erfasst, sobald sie gespeichert wurde. E-Mail/SMS sind nur zusätzliche Benachrichtigungswege, nicht der eigentliche Datensatz.

---

## 2. ARCHITEKTUR & STACK

**Technologie:**
- **Frontend:** React 18 + Vite (Hot Module Reload)
- **Router:** React Router 6+ (client-side routing)
- **Styling:** Tailwind CSS v4
- **Icons:** lucide-react
- **Fonts:** Google Fonts (Fraunces + Karla via /.sfs/css2)
- **Datenspeicherung:** PocketBase (wird im MVP aktiviert)

**Projektstruktur:**
```
app/
  src/
    App.jsx              # Router + Rollensystem + Top-Level Layout
    pages/
      AdminDashboard.jsx      # Admin-Ansicht (244 Zeilen)
      CourseLeaderHome.jsx    # Kursleitung (293 Zeilen)
      FamilyPortal.jsx        # Familie/Teilnehmer (380 Zeilen)
      NotFound.jsx            # 404
    index.css            # Tailwind + Custom CSS
    main.jsx             # React Entrypoint
  index.html             # HTML-Hülle, Titel, Description, Favicon
  public/favicon.svg     # Branding-Favicon
  tailwind.config.cjs    # Tailwind-Theme (fonts, colors)
  vite.config.js         # Vite-Config
  package.json
  .git                   # GitHub-Repository
```

**Git-Status:**
- Remote: `https://github.com/neuroways/kurse_ai` (HTTPS)
- Branch: `main`
- Commits: 
  - `34a9cc6` – feat: Oberflächenprototyp für Kurs- und Anmeldeplattform
  - `99716b6` – Initial project skeleton

---

## 3. ROLLENSYSTEM & FUNKTIONEN (VOLLSTÄNDIG PROTOTYPIERT)

### 3.1 ADMINISTRATION
**Verantwortung:**  
Kurse erstellen, Anmeldungen verwalten, Kapazitäten festlegen, Wartelisten steuern, Absagen bearbeiten, Nachrückverfahren anstoßen.

**Oberfläche (Implementiert):**
- **Task-Dashboard** – Aufgabenliste mit dringenden Vorgängen:
  - Neue unbearbeitete Anmeldungen
  - Absagen & Absageanfragen
  - Frei gewordene Plätze
  - Nachrückrunden in Bearbeitung
  - Kurse unter Mindestteilnehmerzahl
- **Kursverwaltung** – Kurse auflisten mit Live-Belegungsstand:
  - Kapazität (regulär + Warteliste)
  - Freie Plätze
  - Wartelisten-Umfang
  - Status (Entwurf, Geplant, Aktiv, Abgesagt)
- **Anmeldungsübersicht** – Alle Anmeldungen je Kurs
- **Programmplanung** – Halbjahresprogram erstellen & bearbeiten

**Farben:** Blau (#2563EB) für Administratorenbereich

### 3.2 KURSLEITUNG
**Verantwortung:**  
Kursideen über Planungsbogen einreichen, Status überwachen, Live-Belegung sehen, kurzfristige Änderungen erkennen.

**Oberfläche (Implementiert):**
- **Meine Kurse** – Übersicht aller zugeordneten Kurse mit:
  - Bestätigte Teilnehmerzahl (Live)
  - Freie Plätze
  - Wartelisten-Umfang
  - Status der letzten Änderung mit Zeitstempel
  - Drill-Down zu einzelnem Kurs (Teilnehmerliste im zulässigen Umfang)
- **Kursvorschläge einreichen** – Digitaler Planungsbogen mit Feldern:
  - Kurstitel, Zielgruppe, Termine
  - Kapazität, Material- & Zusatzkosten
  - Redaktionelle Beschreibung
- **Genehmigungsstatus** – Workflow-Visualisierung:
  - Entwurf → eingereicht → in Prüfung → Rückfrage → in Redaktion → genehmigt

**Farben:** Grün (#16A34A) für Kursleitungsbereich

### 3.3 FAMILIE / TEILNEHMER
**Verantwortung:**  
Familienkonto führen, Personen verwalten, Anmeldungen einreichen, Status verfolgeren, Absagen innerhalb Frist oder Absageanfrage stellen.

**Oberfläche (Implementiert):**
- **Anmeldungshistorie** – Alle bisherigen Anmeldungen mit Zeitleiste:
  - Status (Bestätigt / Warteliste / Angebot ausstehend / Abgesagt)
  - Anmeldedatum & Uhrzeit
  - Zahlungsstatus
  - Absagefrist (mit Warnung bei Ablauf)
- **Aktionen je Anmeldung:**
  - ✓ Platz annehmen (wenn Angebot ausstehend)
  - ✓ Kostenlos absagen (wenn Frist nicht abgelaufen)
  - ✓ Absageanfrage stellen (nach Fristablauf, erscheint als dringende Admin-Aufgabe)
- **Kalenderansicht** – Anstehende Termine & vergangene Veranstaltungen
- **Zahlungsstatus** – Je Anmeldung sichtbar (unbezahlt, Rechnung, bezahlt)
- **Familien-/Personenverwaltung** – (Struktur vorhanden, Mock-Daten)

**Farben:** Violett (#9333EA) für Familienbereich

---

## 4. ANFORDERUNGEN — WAS IST NOCH OFFEN?

### 4.1 STRATEGISCHE ENTSCHEIDUNGEN (UNGELÖST)
Diese **14 Fragen** müssen vor dem Datenmodell beantwortet werden:

1. **Kapazität:** Zählt jeder Mensch als Platz oder nur eine Familienbuchung?
2. **Vergabereihenfolge:** Nach Buchungseingang oder nach einzelnen Teilnahmeanmeldungen?
3. **Familien trennen:** Müssen zusammen Angemeldete gemeinsam angenommen werden?
4. **Überbuchung:** Schließt das System nach regulären + Wartelistenplätzen oder erfasst weitere?
5. **14-Tage-Regel:** Startet genau 14 Tage vor Kursbeginn oder Administration früher?
6. **Annahmefrist:** Globale Standard (24/48h) oder je Nachrückrunde festgelegt?
7. **Wartelistenende:** Bleiben Personen nach misslungenes Platzangebot weiter gelistet?
8. **Nichtreaktion:** Endet nur diese Runde oder die gesamte Wartelistenanmeldung?
9. **Zahlung:** In Plattform oder nur an bestehende Anwendung übergeben?
10. **Importziel:** Welche Excel-Anwendung liefert Kurse? Welche IDs sind verbindlich?
11. **Kommunikation:** Reichen Plattform + E-Mail für v1 oder sind SMS/Push notwendig?
12. **Datensicht Kursleitung:** Ab wann darf sie Namen sehen? (Nach Anmeldung / Annahme / kurz vor Kurs)
13. **Programmheft:** Strukturierter Export oder druckfertiges automatisiertes PDF?
14. **Kursabsage:** Durch Admin, Kursleitung oder beide?

---

### 4.2 FACHLICHE ANFORDERUNGEN (VOLLSTÄNDIG SPEZIFIZIERT, NOCH NICHT UMGESETZT)

#### Datenspeicherung & Versionierung
- [ ] Alle Änderungen müssen versioniert & nachvollziehbar sein
- [ ] Original und redaktionelle Fassung werden getrennt gespeichert
- [ ] Keine stillen Überschreibungen (Audit Trail)

#### Anmeldung & Regelprüfung
- [ ] Strukturierte Regeln, nicht nur im Text:
  - Mindest- & Höchstalter
  - Altersstichtag (normalerweise 1. Kurstermin)
  - Nur Erwachsene / Nur Kinder / Familienkurs
  - Mindestens ein Erwachsener je Familie
  - Mindestens ein Erwachsener je Kind
  - Höchstens X Kinder je Erwachsenem
  - Mindest- & Höchstzahl je Familienbuchung
- [ ] Ungültige Kombinationen vor Absenden verständlich erklären
- [ ] Admin-Ausnahmen mit Grund & Protokoll möglich

#### Kapazität & Platzvergabe
- [ ] Automatischer Vergabevorschlag nach Eingangsreihenfolge
- [ ] Admin kann Reihenfolge & Vorschlag ändern (mit Grund)
- [ ] Erst nach Admin-Bestätigung sind Ergebnisse sichtbar
- [ ] Anmeldung wird gestoppt, wenn Plätze + Warteliste voll
- [ ] Interessierte sehen klar: aktuell keine Anmeldung möglich

#### Absageverfahren
- [ ] **Durch Teilnehmer:**
  - Selbst-Absage nur bis Frist
  - Nach Frist: Absageanfrage stellen (wird dringende Admin-Aufgabe)
  - Jede Absage speichert: Person, Zeit, Grund, Gebührenfolge, freigewordene Plätze
- [ ] **Durch Admin:**
  - Nur Admin darf komplette Kursdurchführung absagen
  - Alle Termine als abgesagt markiert
  - Alle Teilnahmen aktualisiert
  - Benachrichtigungen an Kursleitung & Betroffene
  - Laufende Nachrückverfahren beendet
  - Grund & Zeitpunkt dokumentiert

#### Nachrückverfahren (Core-Feature)
- [ ] **Reguläres Nachrücken (außerhalb 14-Tage-Fenster):**
  - Nach Wartelistenreihenfolge
  - Befristetes Platzangebot an nächste Person
- [ ] **Kurzfristiges Nachrücken (letzte 14 Tage vor Kurs):**
  1. Absage erzeugt freien Platz
  2. Dashboard informiert Admin sofort
  3. Admin startet Nachrückrunde
  4. Ausgewählte ODER alle Wartenden erhalten Platzangebot gleichzeitig
  5. Angebot mit klarer Annahmefrist
  6. Erste verbindlichen Annahmen erhalten Plätze
  7. System schließt automatisch nach Vergabe aller Plätze
  8. Übrige Wartenden werden informiert
- [ ] Parallele Zugriffe müssen abgesichert sein (keine Doppelvergabe)

#### Admin-Dashboard (Aufgabenliste)
- [ ] Konkrete Aufgaben mit Priorität & Fälligkeit:
  - Neue unbearbeitete Anmeldungen
  - Absagen & Absageanfragen
  - Frei gewordene Plätze
  - Mögliche Nachbesetzungen
  - Laufende Nachrückrunden
  - Bald ablaufende Annahmefristen
  - Fehlende Reaktionen auf Angebote
  - Fehlgeschlagene Zustellungen
  - Kurzfristig veränderte Belegungen
  - Kurse unter Mindestteilnehmerzahl
- [ ] Aufgabe verschwindet erst nach Abschluss / Verwerfung / Zuweisung

#### Status & Zeitleisten
- [ ] Jede Anmeldung mit nachvollziehbarer Zeitleiste
- [ ] Jede Aktion mit Zeitstempel, verantwortlicher Person, Grund
- [ ] Statusübergänge sichtbar (nicht nur Ende-Status)
- [ ] Mindestteilnehmerzahl mit Status-Flagge:
  - findet voraussichtlich statt
  - Mindestzahl noch nicht erreicht
  - Entscheidung ausstehend
  - findet statt
  - abgesagt

#### Halbjahresprogramm
- [ ] Versionierte Programmausgabe (z. B. „Frühjahr/Sommer 2027")
- [ ] Enthält: Fachbereiche, Kapitel, Kursdurchführungen, Reihenfolge
- [ ] Anmeldebeginn & -schluss je Programm
- [ ] Veröffentlichungszeitraum
- [ ] Aus denselben Daten entstehen:
  - Öffentliches Online-Programm
  - Barrierearmes PDF
  - Excel / Redaktions-Export

#### Datenschutz & Datenfreigaben
- [ ] **Notwendige Verarbeitung** (für Anmeldung/Vertragsabwicklung):
  - Keine scheinbar freiwillige Einwilligung
  - Rechtsgrundlage klar dokumentieren
  - Transparent informieren
- [ ] **Optionale Freigaben** (getrennt):
  - Zusätzliche Angaben für Kursleitung
  - Direkte Kommunikation durch Kursleitung
  - Marketing / Folgekommunikation
- [ ] Einwilligungen:
  - Standardmäßig deaktiviert
  - Empfänger, Zweck, Datenumfang nennen
  - Versioniert gespeichert
  - Widerrufbar
  - Bei Kindern: Vertretungsberechtigung beachten

#### Barrierefreie Bedienung (NeuroWays-Standard)
- [ ] Ein klarer Handlungsschritt pro Ansicht
- [ ] Status nicht nur über Farbe vermitteln (auch Icons & Text)
- [ ] Verständliche Fehlermeldungen
- [ ] Fristen in Alltagssprache (z. B. „Noch 2 Tage bis Absagefrist")
- [ ] Keine zeitkritische Interaktion ohne sichtbare Restfrist
- [ ] Änderungen & nächste notwendige Handlung klar anzeigen
- [ ] Responsive Design: 375px (mobil), 768px (Tablet), 1280px (Desktop)

---

### 4.3 NÄCHSTE IMPLEMENTIERUNGS-PHASEN (ROADMAP)

**Phase 2: Datenanbindung & Persistenz**
- [ ] PocketBase-Schema aufbauen (Kurse, Anmeldungen, Personen, Buchungen, Zeitleisten, Datenschutz-Logs)
- [ ] REST-API-Schicht für alle CRUD-Operationen
- [ ] Mock-Daten → echte Anmeldungen

**Phase 3: Regelprüfung & Validierung**
- [ ] Regelmotor für Alters-, Familien-, Kapazitätsregeln
- [ ] Fehlerbehandlung & Einwandsmeldungen
- [ ] Admin-Ausnahmen & deren Dokumentation

**Phase 4: Platzvergabe & Nachrückverfahren**
- [ ] Algorithmus für automatischen Vergabevorschlag
- [ ] Nachrückrunden-Logik (regulär + 14-Tage-Verfahren)
- [ ] Parallele Zugriffs-Absicherung
- [ ] Annahmefrist-Eskalationen

**Phase 5: Halbjahresprogramm & Exporte**
- [ ] Programmausgaben verwalten
- [ ] Online-Publikation
- [ ] PDF-Export (barrierefrei)
- [ ] Excel-Export für Redaktion

**Phase 6: Benachrichtigungen & Eskalationen**
- [ ] E-Mail-Integration
- [ ] SMS / Push (optional für v1)
- [ ] Erinnerungen nach Zeit
- [ ] Eskalationen an weitere Admin-Personen
- [ ] Zustellfehler-Logging

**Phase 7: Datenschutz & Audit**
- [ ] Einwilligungs-Management
- [ ] Datenfreigabe-Steuerung
- [ ] Audit Trail (wer hat was wann geändert)
- [ ] DSGVO-Compliance-Check

---

## 5. DESIGN & ÄSTHETIK

**Farbschema (Implementiert):**
- Admin: Blau (#2563EB)
- Kursleitung: Grün (#16A34A)
- Familie: Violett (#9333EA)
- Neutrale Elemente: Grau-Skala (Slate)

**Typefaces:**
- Display: Fraunces (Headlines, Prominenz)
- Sans: Karla (Body, Lesbarkeit)
- Quelle: Google Fonts (/.sfs/css2-Pfad, vite-ignore attribut)

**Responsive:**
- Mobile-first
- 375px (Handy): 1 Spalte, Touch-freundlich (min. 44px Tap-Target)
- 768px (Tablet): Übergänge
- 1280px (Desktop): Multi-Spaltig

**Designprinzipien (NeuroWays):**
- Status jederzeit sichtbar
- Nächste Handlung klar
- Keine versteckten Informationen
- Farben + Icons + Text (nicht nur Farbe)
- Einfache Bedienung, keine unnötige Komplexität

---

## 6. TECHNISCHE NOTIZEN & CONSTRAINTS

**Vite HMR:**
- `vite.config.js` ist minimal
- Hot Reload funktioniert lokal
- Logs befinden sich in `$PROJECT_DIRECTORY/logs/`

**Routing:**
- React Router 6.x (createBrowserRouter)
- Client-side Navigation (keine Server-Seiten)
- Basename beachten (wenn auf Subpath deployed)

**CSS:**
- Tailwind v4 mit Custom Config
- Kein PostCSS-Setup notwendig
- Icons aus `lucide-react`

**Build & Deployment:**
- `npm run build` erzeugt `/dist/`
- Deployment zu static file host
- Kein SSR, vollständig client-side

**PocketBase Integration (ausstehend):**
- URL: wird noch konfiguriert
- Auth: JWT
- Collections: werden nach Datenmodell aufgebaut
- File Uploads: für Kursmaterialien, Programmhefte, ggf. Profil-Fotos

---

## 7. COMMUNICATION & HANDOFF

**Für nächste KI-Session:**
1. Diesen Prompt laden: `app/MASTERPROMPT.md`
2. Repository clonen: `https://github.com/neuroways/kurse_ai`
3. Status verstanden: Oberflächenprototyp fertig, Anforderungen dokumentiert, 14 strategische Fragen offen
4. Nächster Schritt wählen:
   - Feedback zu Oberfläche sammeln?
   - Strategische Fragen entscheiden?
   - Datenmodell aufbauen?
   - Spezifische Feature implementieren?

**Kommunikation mit dem Team:**
- "Der Prototyp zeigt die Bedienung für alle drei Rollen."
- "Die nächsten Entscheidungen sind zu den 14 Fragen im MASTERPROMPT."
- "Nach Entscheidung können wir mit Phase 2 starten."

---

## 8. WICHTIGE LINKS & RESSOURCEN

- **GitHub:** https://github.com/neuroways/kurse_ai
- **Skill: pocketbase** – REST API, Auth, Collections
- **Skill: multi-page-setup** – Falls weitere Seiten nötig
- **Skill: frontend-design** – Falls UI-Anpassungen nötig
- **Anforderungs-Original:** 14 strategische Fragen + Fachliche Spezifikation (oben)
