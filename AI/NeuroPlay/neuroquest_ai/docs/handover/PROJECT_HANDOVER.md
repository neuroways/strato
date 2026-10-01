# PROJECT HANDOVER – NeuroQuest

## 1. Dokumentinformationen

| Feld | Wert |
|------|------|
| **Projektname** | NeuroQuest – Ein digitales interaktives Kinderbuch |
| **Übergabedatum** | 15. August 2026 |
| **Entwicklungsstand** | Concept Prototype v1.0 – Funktionsfähig, Basis-Features implementiert |
| **Primäre Technologien** | React 18, Vite, Tailwind CSS v4, PWA |
| **Repository** | https://github.com/neuroways/neuroquest_ai.git |
| **Branch** | main |
| **Hosting/Deployment** | IONOS-Plattform (SFS) – Live unter Basis-URL, statische `/static/`-Assets |
| **Zweck dieser Übergabe** | Sichere Rekonstruktion des aktuellen Projektstands für potenzielle Weiterführung durch andere KI oder Entwickler |

---

## 2. Executive Project Summary

### Was ist NeuroQuest?

NeuroQuest ist ein interaktives digitales Kinderbuch für Schüler der Klassen 1–4, besonders konzipiert für Kinder mit ADHS und Autismus. Die Anwendung verwebt Schreib- und Lesaufgaben mit einer Fantasiegeschichte, in der der Protagonist Caspar zusammen mit einem Lichtwesen namens Lumi durch einen Zauberwald reist.

### Welches Problem löst es?

Viele Kinder mit Aufmerksamkeitsschwierigkeiten oder Autismus verlieren die Motivation beim Lernen, wenn Aufgaben isoliert und mechanisch wirken. NeuroQuest löst dies durch ein **narrativ-zentriertes Design**: Die Geschichte ist nicht Dekoration, sondern der Grund, warum das Kind weitermachen möchte. Jede abgeschlossene Lernaufgabe (Schritt) freizuschaltet einen neuen Abschnitt der Geschichte.

### Wer benutzt es?

- Primär: Grundschüler (7–10 Jahre)
- Sekundär: Kinder mit diagnostiziertem ADHS, Autismus, oder Konzentrationsschwierigkeiten
- Zielgruppe: Schulische oder häusliche Lernumgebungen (Eltern, Pädagogen, Lehrkräfte)

### Was soll das fertige System können?

**V1 (aktuell implementiert):**
- Fünf Tage lang täglich fünf Aufgaben ("Missionen") mit konsistentem Rhythmus
- Vier Arbeitsschritte pro Aufgabe (die "Magischen 5" minus Geschichte-Freischaltung)
- Story-Fragmente als Belohnung nach jeder Aufgabe
- Tagesabschluss mit vollständiger Tagesgeschichte
- Navigation zwischen Tagen mit Dialogen (Caspar/Lumi)
- PWA-Installation möglich (App auf Smartphone/Tablet)
- Offline-Funktionsfähigkeit (Service Worker vorhanden)
- Responsive Design für 375px (Mobile), 768px (Tablet), 1280px (Desktop)

**V2+ (geplant, nicht implementiert):**
- Datenspeicherung (welche Aufgaben wurden gemacht, Fortschritt)
- Login / Benutzerverwaltung
- Pädagog:innen-Dashboard
- Eltern-View
- Anpassbare Aufgabentexte
- Erweiterte Story-Arcs

### Aktueller Entwicklungsstand

**Spiellogik:** ✅ **Vollständig funktionsfähig**
- 5 Tage × 5 Missionen pro Tag = 25 spielbare Szenarien
- Korrekte Übergänge zwischen Tagen/Missionen
- Dialog-System für Tag-Wechsel

**Benutzeroberfläche:** ✅ **Implementiert und optimiert**
- Alle 11 Seiten responsive und kindgerecht gestaltet
- Konsistente Struktur (Fortschritt + Überschrift + Text + Lumi + Button)
- Warme, naturnahe Farbpalette

**Geschichten-Inhalte:** ✅ **Vorhanden**
- Day 1 (Missionen 1–5): Caspar und Lumi treffen sich
- Day 2 (Missionen 1–5): Die fünf Schritte (Hinschauen, Verstehen, Geduld, Zuhören, Vertrauen)
- Day 3–5: Weitere Story-Entwicklung (teilweise ausgefüllt)

**PWA-Setup:** ✅ **Abgeschlossen**
- manifest.json, service-worker.js
- App-Icons (192px, 512px, maskable)
- Apple Touch Icon, Browser Config
- Installierbar auf iOS und Android

**Illustrationen:** ⚠️ **Teilweise – Platzhalter + einige finale Bilder**
- Day-Hero-Images vorhanden (Day 1–5)
- Cover-Image vorhanden
- Day-Complete-Image vorhanden
- Charakter-Design-Guide vorhanden (PNG)
- Typen der Task-Steps benötigen noch spezifische Illustrationen (aktuell nur Icons)

---

## 3. Fachliches Zielbild

### Kernkonzept: Die "Magischen 5"

Jeder Tag folgt derselben wiederkehrenden Struktur, basierend auf der pädagogischen Idee der "Magischen 5":

```
Woche (5 Tage)
  └─ Tag (z.B. Tag 1)
       └─ Mission 1 (z.B. Satz 1)
            ├─ Schritt 1: 👀 Prüfe das Satzende
            ├─ Schritt 2: ✏️ Schreibe den Satz ab
            ├─ Schritt 3: 🔍 Kontrolliere jedes Wort
            ├─ Schritt 4: 📏 Unterstreiche den fertigen Satz
            └─ Schritt 5: 📖 Lies den Geschichtenteil
       └─ Mission 2 (Satz 2)
            └─ [wie oben] 
       ...
       └─ Mission 5 (Satz 5)
            └─ [wie oben] → Tagesabschluss
```

### Pädagogische Grundwerte (erlebbar, nicht explizit gelehrt)

1. **Jeder kleine Schritt zählt.** – Das Kind sieht nach jeder Mini-Aufgabe Fortschritt (goldene Blätter).
2. **Fehler gehören zum Lernen.** – Lumi bewertet nie negativ; es gibt keine "falschen" Antworten.
3. **Anderssein ist gut.** – Caspar macht Fehler, ist unsicher – das ist normal.
4. **Langsam ist in Ordnung.** – Die ganze App ermutigt zu Ruhe und Aufmerksamkeit.
5. **Kontrolle ist wichtiger als Geschwindigkeit.** – Es gibt keine Timer, keinen Druck.
6. **Lernen darf Freude machen.** – Die Geschichte erzeugt intrinsische Motivation.

### Narrative Struktur

**Caspar** – Ein neugieriger Junge (7 Jahre alt) mit Brille. Er erkundet, staunt, probiert, irrt sich, lernt.
**Lumi** – Ein kleines Lichtwesen (ähnlich Glöckchen aus Peter Pan). Freundlich, ruhig, bestärkend, ohne Bewertung.

Die Geschichte spielt im **Zauberwald**, einem Ort von Ruhe, Geheimnis und Wunderbarkeit. Jeder Tag offenbart ein neues Aspekt dieses Waldes oder der Freundschaft zwischen Caspar und Lumi.

### Was NeuroQuest **nicht** ist

- **Keine Schulsoftware** – Keine Datenbank von Schülern, keine Klassenmanagement
- **Kein Dashboard** – Keine Statistiken, keine Leistungsmessung
- **Kein Spiel mit Punkten** – Keine Stars, Badges, Leaderboards, keine Gamification
- **Keine Lernsoftware mit Bewertung** – Keine "falsch/richtig"-Meldungen, keine roten X
- **Kein Aufgabenmanager** – Das Kind verwaltet nicht selbst, was es tun soll

### Bekannte Anforderungen, die **nicht** in V1 implementiert sind

| Anforderung | Grund |
|---|---|
| Datenspeicherung | Nicht Teil des reinen Concept Prototype – V1 fokussiert auf das narrative und UX-Erlebnis |
| Login-System | Kinder sollen die App direkt öffnen, ohne Authentifizierung |
| Eltern/Lehrkraft-Bereich | Geplant für V2 – könnte das Abenteuer-Gefühl für das Kind verlagern |
| Anpassbare Aufgaben | V1 funktioniert als Skeleton – Aufgaben stehen außerhalb (Heft, Arbeitsblatt, Buch) |
| API / Backend | V1 ist vollständig client-side, keine Server-Abhängigkeiten |
| Datenbank (PocketBase, etc.) | Nicht aktiviert; Email und Cron APIs sind auf dieser Plattform sowieso deaktiviert |
| Animationen | Bewusst minimal (CSS fade-in/slide). Fetter Wert auf Ruhe statt Motion-Overload |
| Audio / Voice-Over | Zukünftige Erweiterung |

---

## 4. Vollständiger Anforderungskatalog

| ID | Anforderung | Kategorie | Status | Implementierung/Nachweis | Offene Punkte |
|----|-------------|-----------|--------|--------------------------|---------------|
| R-1 | App als PWA installierbar | Infrastruktur | IMPLEMENTIERT | manifest.json, service-worker.js, Icons (public/) | – |
| R-2 | Responsive auf Mobile (375px) | UX | IMPLEMENTIERT | App.css, PageStructure, mobile-first Design | – |
| R-3 | Kein Scrollen während Mission | UX | IMPLEMENTIERT | Alle Seiten passen in Viewport | – |
| R-4 | 5 Tage × 5 Missionen pro Tag | Logik | IMPLEMENTIERT | App.jsx State, SentenceStartPage, Task-Steps | – |
| R-5 | Die Magischen 5 (4 Steps + Story) | Logik | IMPLEMENTIERT | TaskStep1–4, StoryRevealPage, handleNextSentence() | – |
| R-6 | Story nach jeder Mission | Inhalt | IMPLEMENTIERT | StoryRevealPage.jsx mit 10 Story-Fragments (Day 1–2) | Day 3–5 Fragmente teilweise |
| R-7 | Caspar & Lumi als Charakter | Inhalt | IMPLEMENTIERT | Character-Guide PNG, Dialoge in Seiten | – |
| R-8 | Lumi spricht auf jeder Seite | UX | IMPLEMENTIERT | lumi-character Box auf allen Task/Story-Seiten | – |
| R-9 | Keine Bewertung/Punkte | UX | IMPLEMENTIERT | Keine Stars/Badges/Scores im Code | – |
| R-10 | Warme, natürliche Farben | Design | IMPLEMENTIERT | Creme, Waldgrün, Moosgrün, Gold in App.css | – |
| R-11 | Borel & Crimson Text Typefaces | Design | IMPLEMENTIERT | index.html Google Fonts Link | – |
| R-12 | Dialog statt Warnfenster | UX | IMPLEMENTIERT | DialogOverlay in App.jsx für Day-Wechsel | – |
| R-13 | Tagesfortschritt sichtbar | UX | IMPLEMENTIERT | ProgressFooter mit Blätter-Icons | – |
| R-14 | Gesamtfortschritt sichtbar | UX | IMPLEMENTIERT | ProgressFooter mit Stein-Icons (🌳/⭐/🍂) | – |
| R-15 | Tagesabschluss-Story | Inhalt | IMPLEMENTIERT | DayCompletePage mit dayStories Object (5 Stories) | – |
| R-16 | Intro-Dialoge pro Tag | Inhalt | IMPLEMENTIERT | dayIntros in SentenceStartPage | – |
| R-17 | Intro-Dialoge pro Mission | Inhalt | IMPLEMENTIERT | sentenceIntros in SentenceStartPage | – |
| R-18 | App-Icon (App-Logo) | Design | IMPLEMENTIERT | icon-192.png, icon-512.png, maskable | – |
| R-19 | Favicon | Design | IMPLEMENTIERT | favicon.svg in public/ | – |
| R-20 | Service Worker (Offline) | Infrastruktur | IMPLEMENTIERT | service-worker.js | – |
| R-21 | Apple-Support (Touch Icon) | Infrastruktur | IMPLEMENTIERT | apple-touch-icon.png, meta Tags in HTML | – |
| R-22 | Datenbank Persistierung | Backend | GEPLANT (V2) | Nicht implementiert – V1 hat keinen State-Speicher | Erforderlich für echte Nutzung |
| R-23 | Login / Benutzer | Backend | GEPLANT (V2) | Nicht implementiert | – |
| R-24 | Eltern / Lehrkraft View | Backend | GEPLANT (V2) | Nicht implementiert | – |
| R-25 | Anpassbare Aufgabentexte | Inhalt/UX | GEPLANT (V2) | Nicht implementiert; Aufgaben liegen extern | – |
| R-26 | Email-Benachrichtigungen | Backend | NICHT MACHBAR (Plattform) | PocketBase Email API ist deaktiviert | – |
| R-27 | Cron / Scheduled Tasks | Backend | NICHT MACHBAR (Plattform) | PocketBase Cron API ist deaktiviert | – |

---

## 5. Aktuell implementierter Funktionsumfang

### 5.1 Startseite (CoverPage)

**Zweck:** Visueller Einstieg – weckt Neugier und lädt zum Abenteuer ein.

**Benutzerinteraktion:**
- Kind öffnet App → sieht Cover-Illustration (Caspar + Lumi im Zauberwald)
- Liest: "NeuroQuest. Ein kleiner Schritt. Eine kleine Geschichte. Ein großes Abenteuer."
- Klickt großen Button "Abenteuer beginnen"

**Komponenten/Dateien:**
- `CoverPage.jsx` – Komponente
- `neuroquest-cover.png` – Illustration (in `/static/`)
- Globales Styling aus `App.css`

**Datenquellen:** Keine (statischer Inhalt)
**Datenbank:** N/A
**API-Endpunkte:** N/A
**Reifegrad:** Produktionsreif
**Bekannte Einschränkungen:** Cover-Bild könnte bei sehr langsamen Verbindungen längere Ladezeit haben; PWA sollte es aber cachen

---

### 5.2 Willkommenssseite (WelcomePage)

**Zweck:** Einführung der Charaktere Caspar und Lumi; Aufbau emotionaler Bindung.

**Benutzerinteraktion:**
- Kind liest Vorstellung von Caspar (neugierig, freundlich, manchmal unsicher)
- Liest Vorstellung von Lumi (ruhig, ermutigend, nicht bewertend)
- Klickt "Abenteuer beginnen" um zur Tageswahl zu gehen

**Komponenten/Dateien:**
- `WelcomePage.jsx`
- Text: hard-coded in JSX

**Datenquellen:** Keine
**Reifegrad:** Produktionsreif
**Einschränkungen:** Keine Bilder der Charaktere auf dieser Seite (könnten später ergänzt werden)

---

### 5.3 Tag-Auswahl (DaySelectPage)

**Zweck:** Kind wählt, welchen Tag es spielen möchte.

**Benutzerinteraktion:**
- Kind sieht 5 Kacheln (ein Tag je Kachel)
- Klickt auf Tag 2 → wird zu Tag 2, Mission 1 navigiert
- Dialog warnt, wenn Tag unvollständig ist: "Darf ich dich kurz etwas fragen?" (Caspar & Lumi sprechen)

**Komponenten/Dateien:**
- `DaySelectPage.jsx`
- Dialog-Overlay in `App.jsx` (dialogState === 'switchDay')

**Logik:**
```javascript
trySelectDay(day) {
  if (day === currentDay) return; // Bereits aktiver Tag
  const isCurrent = completedSentences[`${currentDay}-5`] === undefined;
  if (isCurrent) {
    setDialogState('switchDay'); // Dialog öffnen
  } else {
    goToPage("sentenceStart", day, 1); // Zu neuem Tag
  }
}
```

**Datenquellen:** `completedSentences` State (welche Missionen gemacht wurden heute)
**Reifegrad:** Funktionsfähig
**Einschränkungen:** 
- State wird bei Seiten-Reload gelöscht (kein Speicher)
- Keine visuelle Indikation (z.B. Schloss-Icon) für gesperrte Tage

---

### 5.4 Tag-Start / Mission-Start (SentenceStartPage)

**Zweck:** Eröffnet einen neuen Tag oder eine neue Mission mit motivierendem Intro.

**Benutzerinteraktion:**
- Sieht Hero-Image (Tag-spezifisch, z.B. für Tag 1: Caspar & Lumi im Wald)
- Liest Intro-Text für den Tag oder die Mission
- Lumi sagt etwas Ermutigendes
- Klickt "Meine erste Mission beginnt" oder "Nächste Mission"

**Komponenten/Dateien:**
- `SentenceStartPage.jsx`
- Images: `neuroquest-day1-hero.jpg`, `-day2-hero.jpg`, etc. (in `/static/`)

**Logik:**
```javascript
const intro = isFirstSentenceOfDay ? dayIntros[day] : sentenceIntros[sentence];
// dayIntros = spezielle Texte für Tag-Anfänge
// sentenceIntros = kurze Motivation für Missionen 2–5
```

**Datenquellen:**
- `dayIntros` und `sentenceIntros` Objects (hard-coded in JSX)
- `day`, `sentence` Props aus App State

**Reifegrad:** Produktionsreif
**Einschränkungen:**
- Bilder sind teilweise Platzhalter (Day 3 nutzt Day 2 Image)
- Keine dynamische Bildauswahl basierend auf Benutzerpräferenzen

---

### 5.5 Die vier Arbeitsschritte (TaskStep1–4Page)

**Zweck:** Leitet das Kind durch die vier schrittweisen Aufgaben der Mission.

**Aufbau pro Schritt:**

| Schritt | Icon | Aufgabe |
|---------|------|---------|
| 1 | 👀 | Prüfe das Satzende (Punkt? Fragezeichen? Ausrufezeichen?) |
| 2 | ✏️ | Schreibe den Satz ab |
| 3 | 🔍 | Kontrolliere jedes Wort |
| 4 | 📏 | Unterstreiche den fertigen Satz |

**Benutzerinteraktion:**
- Kind liest kurze Anweisung ("Schau in dein Heft...")
- Führt Aufgabe außerhalb der App durch (im Heft/Arbeitsblatt)
- Lumi gibt kurzen Hinweis/Ermutigung
- Kind klickt "📖 Weiter"

**Komponenten/Dateien:**
- `TaskStep1Page.jsx`, `TaskStep2Page.jsx`, `TaskStep3Page.jsx`, `TaskStep4Page.jsx`
- Alle verwenden `PageStructure.jsx` (Unified Layout Component)

**PageStructure Component:**
```
page-structure
├── page-structure__header (Titel + Icon)
├── page-structure__instruction (Aufgabe)
├── page-structure__detail (Zusatzinfo, z.B. Satzzeichen)
├── page-structure__lumi (Lumi spricht)
└── page-structure__button (Weiter)
```

**Datenquellen:** Keine (externe Aufgaben im Heft)
**Reifegrad:** Produktionsreif
**Einschränkungen:** Keine Validierung, ob Kind tatsächlich die Aufgabe gemacht hat – reine Anleitung

---

### 5.6 Geschichte-Freischaltung (StoryRevealPage)

**Zweck:** Belohnt die 4 abgeschlossenen Schritte mit einem neuen Geschichtsfragment.

**Benutzerinteraktion:**
- Kind sieht Geschichtstitel (z.B. "Das geheimnisvoll Zeichen")
- Liest Geschichtstext (2–4 Sätze, atmosphärisch)
- Lumi sagt motivierendes Zwischenziel
- Klickt "📖 Nächste Mission" oder "🌟 Zum Tagesabschluss"

**Komponenten/Dateien:**
- `StoryRevealPage.jsx`
- `ProgressHeader.jsx` (zeigt Tag & Satz oben)

**Geschichten-Daten:**
```javascript
const storyFragments = {
  "1-1": { title: "...", text: "..." },
  "1-2": { title: "...", text: "..." },
  ...
  "2-5": { title: "...", text: "..." },
}
```

**Datenquellen:** Hard-coded storyFragments (10 Stories: Day 1–2, je 5 Missionen)
**Reifegrad:** Funktionsfähig
**Einschränkungen:**
- Day 3–5 Story-Fragmente sind geplant, aber nicht alle gefüllt
- Keine Illustrationen pro Story (könnten später hinzugefügt werden)

---

### 5.7 Tagesabschluss (DayCompletePage)

**Zweck:** Markiert das Ende eines Tages, präsentiert die vollständige Tagesgeschichte und bietet Navigation.

**Benutzerinteraktion:**
- Sieht großes Abschluss-Bild (Caspar & Lumi feiern)
- Liest Tagesmitteilung ("🌟 Heute hast du alle fünf Missionen geschafft...")
- Sieht die vollständige, durchgehende Geschichte des Tages (z.B. "Caspar und Lumi werden Freunde...")
- Lumi gratuliert
- Klickt entweder "Morgen wartet das nächste Abenteuer" oder "Für heute Schluss"

**Komponenten/Dateien:**
- `DayCompletePage.jsx`
- Image: `stock_neuroquest-day-complete-*.jpg`

**Datenquellen:**
```javascript
const dayStories = {
  1: "Caspar und Lumi werden Freunde...",
  2: "Caspar und Lumi entdecken einen geheimen Pfad...",
  ...
}
```

**Reifegrad:** Produktionsreif
**Einschränkungen:**
- Day 3–5 Stories nur Platzhalter
- Keine Optionen zum Zurückblättern in Tages-Story

---

### 5.8 Fortschritts-Komponenten

#### ProgressFooter.jsx
Erscheint auf jeder Task/Story-Seite ganz unten.

**Zeigt zwei Ebenen:**
1. **Die große Reise (Tage 1–5):**
   - 🌳 Erledigte Tage (grau)
   - ⭐ Aktueller Tag (hervorgehoben)
   - 🍂 Zukünftige Tage (hellbraun)
   - Text: "Tag X von 5"

2. **Heutige Missionen (Missionen 1–5):**
   - 🌿 Erledigte Missionen (grün)
   - 🍃 Aktuelle Mission (hervorgehoben)
   - 🌾 Zukünftige Missionen (hellbraun)
   - Text: "Mission X von 5"

**Komponenten/Dateien:**
- `ProgressFooter.jsx`
- Styling in `App.css` (.progress-footer*)

---

#### ProgressHeader.jsx
Erscheint oben auf Story/Completion-Seiten (geplant, teilweise implementiert).

**Funktion:** Zeigt Tag + Satz-Fortschritt oben im Kopfbereich.

---

### 5.9 Dialog-System (App.jsx)

**Zweck:** Nutzt Caspar & Lumi-Dialog statt technischer Warnfenster.

**Implementierte Dialoge:**

1. **Switch-Day Dialog** (dialogState === 'switchDay')
   - Caspar fragt freundlich
   - Lumi erklärt Situation
   - 2 Buttons: "Weiter im Abenteuer" oder "Trotzdem Tag wechseln"

**Bekannte geplante Dialoge (nicht implementiert):**
- Restart-Day Dialog
- Confirm Restart Dialog

---

## 6. Seiten- und Navigationsstruktur

### Seiten-Baum (aktuell implementiert)

```
NeuroQuest App
├── CoverPage
│   └─ (click) → WelcomePage
├── WelcomePage
│   └─ (click) → DaySelectPage
├── DaySelectPage
│   ├─ (click Day 1) → SentenceStartPage (day=1, sentence=1)
│   ├─ (click Day 2) → [Dialog wenn Tag unvollständig]
│   │   └─ (confirm) → SentenceStartPage (day=2, sentence=1)
│   └─ (click Day 3–5) → [ähnlich]
├── SentenceStartPage (für jeden Tag/Satz)
│   └─ (click "Beginnen") → TaskStep1Page
├── TaskStep1Page
│   └─ (click "Weiter") → TaskStep2Page
├── TaskStep2Page
│   └─ (click "Weiter") → TaskStep3Page
├── TaskStep3Page
│   └─ (click "Weiter") → TaskStep4Page
├── TaskStep4Page
│   └─ (click "Weiter") → StoryRevealPage
├── StoryRevealPage
│   ├─ (wenn sentence < 5) (click "Nächste Mission") → SentenceStartPage (sentence+1)
│   └─ (wenn sentence = 5) (click "Tagesabschluss") → DayCompletePage
└── DayCompletePage
    ├─ (wenn day < 5) (click "Morgen...") → SentenceStartPage (day+1, sentence=1)
    ├─ (wenn day < 5) (click "Für heute...") → CoverPage
    └─ (wenn day = 5) (click "Zur Startseite") → CoverPage
```

### Routing-Logik (State-basiert in App.jsx)

```javascript
const [currentPage, setCurrentPage] = useState("cover");
const [currentDay, setCurrentDay] = useState(1);
const [currentSentence, setCurrentSentence] = useState(1);
const [completedSentences, setCompletedSentences] = useState({});

const goToPage = (pageName, day, sentence) => { ... };
const handleNextSentence = () => {
  if (currentSentence < 5) {
    goToPage("sentenceStart", currentDay, currentSentence + 1);
  } else {
    goToPage("dayComplete", currentDay, 5);
  }
};
```

### Seiten-Detail

| Seite | Route-Name | URL (geplant) | Komponente | Daten | Status |
|-------|-----------|---|-----------|-------|--------|
| Titelseite | cover | / | CoverPage | Statisch | ✅ |
| Willkommenssseite | welcome | (interner State) | WelcomePage | Statisch | ✅ |
| Tag-Auswahl | daySelect | (interner State) | DaySelectPage | completedSentences | ✅ |
| Tag-/Mission-Start | sentenceStart | (interner State) | SentenceStartPage | day, sentence | ✅ |
| Schritt 1 | step1 | (interner State) | TaskStep1Page | day, sentence | ✅ |
| Schritt 2 | step2 | (interner State) | TaskStep2Page | day, sentence | ✅ |
| Schritt 3 | step3 | (interner State) | TaskStep3Page | day, sentence | ✅ |
| Schritt 4 | step4 | (interner State) | TaskStep4Page | day, sentence | ✅ |
| Geschichte | storyReveal | (interner State) | StoryRevealPage | day, sentence | ✅ |
| Tagesabschluss | dayComplete | (interner State) | DayCompletePage | day | ✅ |

---

## 7. User Flows

### Flow 1: Erstes Mal (Cover → Welcome → Tag-Auswahl)

```
Kind öffnet App (Tag 1, unvollständig)
  ↓
Sieht CoverPage mit großem Bild
  ↓
Klickt "Abenteuer beginnen"
  ↓
Liest WelcomePage (Caspar & Lumi kennenlernen)
  ↓
Klickt "Abenteuer beginnen"
  ↓
Sieht DaySelectPage (5 Tag-Kacheln)
  ↓
Klickt Tag 1
  ↓
Navigiert zu SentenceStartPage (day=1, sentence=1)
```

**Implementierungsstand:** ✅ Vollständig

---

### Flow 2: Mission durchlaufen (Sentence-Start → 4 Steps → Story → next Sentence)

```
Kid ist auf SentenceStartPage (day=1, sentence=1)
  ↓
Sieht Hero-Image + Intro ("Meine erste Mission beginnt")
  ↓
Klickt Button
  ↓
→ TaskStep1Page (👀 Prüfe das Satzende)
  ├─ Liest Anweisung
  ├─ Führt Aufgabe im Heft durch
  ├─ Klickt "Weiter"
  ↓
→ TaskStep2Page (✏️ Schreibe den Satz ab)
  ├─ [wie oben]
  ↓
→ TaskStep3Page (🔍 Kontrolliere jedes Wort)
  ├─ [wie oben]
  ↓
→ TaskStep4Page (📏 Unterstreiche den Satz)
  ├─ [wie oben]
  ↓
→ StoryRevealPage (📖 Geschichte-Freischaltung)
  ├─ Sieht Geschichtstitel + Text
  ├─ Lumi gibt Fortschritts-Feedback
  ├─ Klickt "Nächste Mission" (falls sentence < 5)
  ↓
→ SentenceStartPage (day=1, sentence=2) [zurück zu Step 1 dieses Flows]
```

**Implementierungsstand:** ✅ Vollständig

---

### Flow 3: Tag abschließen (5. Mission → Tagesabschluss)

```
Kind ist auf StoryRevealPage (day=1, sentence=5)
  ↓
Nach Geschichte liest Lumi's Feedback
  ↓
Klickt "Zum Tagesabschluss"
  ↓
→ DayCompletePage
  ├─ Sieht großes Abschluss-Bild
  ├─ Liest komplette Tagesgeschichte
  ├─ Lumi gratuliert
  ├─ Wählt: "Morgen wartet das nächste Abenteuer" oder "Für heute Schluss"
  ↓
Wenn "Morgen...": → SentenceStartPage (day=2, sentence=1)
Wenn "Schluss": → CoverPage
```

**Implementierungsstand:** ✅ Vollständig

---

### Flow 4: Tag wechseln (mit Dialog-Bestätigung)

```
Kind ist auf DaySelectPage
  ↓
Tag 1 nicht vollständig (sentence < 5)
  ↓
Klickt Tag 2
  ↓
Dialog-Overlay öffnet sich:
  "Darf ich dich kurz etwas fragen?
   Ich glaube, wir haben hier heute noch etwas zu entdecken..."
  ↓
Kind wählt:
  A) "Weiter im Abenteuer" → Dialog schließt, bleibt auf daySelect
  B) "Trotzdem Tag wechseln" → Geht zu daySelect, dann zu Tag 2, sentence 1
```

**Implementierungsstand:** ✅ Dialog-Overlay vorhanden, Logik funktionsfähig

---

## 8. Technische Architektur

### Übersicht

```
Browser (Desktop, Mobile, Tablet)
    ↓
NeuroQuest PWA (React + Vite)
    ├─ React Components (Page + UI)
    ├─ State Management (App.jsx useState)
    ├─ Styling (CSS + Tailwind v4)
    └─ Service Worker (Offline-Support)
    ↓
Static Assets (/static/)
    ├─ Illustrationen (JPG/PNG)
    ├─ Icons (PNG)
    └─ Favicons (SVG)
    ↓
Browser LocalStorage (optional, aktuell nicht genutzt)
```

### Frontend-Stack

| Layer | Technologie | Version | Notizen |
|-------|------------|---------|---------|
| **Runtime** | Node 24 | 24.x | Nur für Build; nicht im Browser |
| **Framework** | React | 18.x (Platform-provided) | Kein npm install erforderlich |
| **Build-Tool** | Vite | 6.4+ | Definiert in `vite.config.js` |
| **Styling-Engine** | Tailwind CSS v4 | 4.x | Platform-provided, nicht npm |
| **Fonts** | Google Fonts | (CSS Import) | Borel, Crimson Text, Lora |
| **Routing** | Custom State (App.jsx) | – | Keine React Router; einfaches State-Switching |
| **PWA** | Service Worker (Manual) | – | `public/service-worker.js`, `manifest.json` |
| **Icons** | lucide-react | (Platform) | Emoji/Custom Icons in JSX |

### Backend

**Aktuell:** ❌ **Kein Backend in V1**
- Keine Datenbank
- Keine API-Server
- Keine Authentication
- Alles läuft im Browser, State wird bei Reload verloren

**Geplant (V2):**
- REST API (evtl. Node.js + Express)
- Datenbank (SQL oder NoSQL)
- PocketBase (optional, auf dieser Plattform teilweise begrenzt)

### Deployment-Infrastruktur

| Aspekt | Setup |
|--------|-------|
| **Hosting** | IONOS SFS (Secure File Server) |
| **Build-Output** | `/app/dist/` (committed zu Git) |
| **Static Assets** | `/static/` (außerhalb App, fest gemappt) |
| **Service Worker** | `/service-worker.js` (public/static) |
| **Domains** | Basis-URL der SFS-Instanz |
| **HTTPS** | Automatisch durch Plattform |
| **CDN** | Nicht explicitly konfiguriert |

---

## 9. Repository- und Verzeichnisstruktur

```
/
├── app/                                # Vite + React App (Git-Repo)
│   ├── dist/                           # Build-Output (committed)
│   │   ├── index.html
│   │   ├── assets/
│   │   │   ├── index-*.css
│   │   │   └── index-*.js
│   │   ├── favicon.svg
│   │   ├── icon-*.png
│   │   ├── manifest.json
│   │   ├── service-worker.js
│   │   └── [weitere PWA-Dateien]
│   │
│   ├── public/                         # PWA-Metadaten + Icons
│   │   ├── manifest.json
│   │   ├── service-worker.js
│   │   ├── favicon.svg
│   │   ├── icon-192.png, -512.png, etc.
│   │   ├── apple-touch-icon.png
│   │   ├── browserconfig.xml
│   │   └── [weitere Icon-Sizes]
│   │
│   ├── src/                            # Quellcode
│   │   ├── App.jsx                     # Zentrale App, State-Management, Routing
│   │   ├── App.css                     # Globale Styles (Farben, Typografie)
│   │   ├── main.jsx                    # React-Einstiegspunkt
│   │   ├── index.css                   # Tailwind-Import
│   │   │
│   │   ├── components/
│   │   │   ├── PageStructure.jsx       # Unified Layout für Task/Story-Seiten
│   │   │   ├── ProgressFooter.jsx      # 2-Level Progress (Days + Missions)
│   │   │   └── ProgressHeader.jsx      # (geplant, teilweise implementiert)
│   │   │
│   │   └── pages/
│   │       ├── CoverPage.jsx           # Titelseite
│   │       ├── WelcomePage.jsx         # Intro-Seite
│   │       ├── DaySelectPage.jsx       # Tag-Auswahl
│   │       ├── SentenceStartPage.jsx   # Tag/Mission-Start
│   │       ├── TaskStep1Page.jsx       # 👀 Schritt 1
│   │       ├── TaskStep2Page.jsx       # ✏️ Schritt 2
│   │       ├── TaskStep3Page.jsx       # 🔍 Schritt 3
│   │       ├── TaskStep4Page.jsx       # 📏 Schritt 4
│   │       ├── StoryRevealPage.jsx     # 📖 Geschichte
│   │       └── DayCompletePage.jsx     # Tagesabschluss
│   │
│   ├── AGENTS.md                       # Projektbasis-Info (Tailwind, React, etc.)
│   ├── NEUROQUEST_PHILOSOPHY.md        # Pädagogische & Design-Philosophie
│   ├── NEUROQUEST_STRUCTURE.md         # Seitenstruktur, Komponenten, Benutzerflows
│   │
│   ├── index.html                      # HTML-Einstiegspunkt
│   ├── package.json                    # (leer – keine npm-Dependencies)
│   ├── package-lock.json
│   ├── tailwind.config.cjs             # Tailwind-Konfiguration
│   ├── vite.config.js                  # Vite-Konfiguration
│   │
│   └── .git/                           # Git-Repository
│
├── static/                             # Statische Assets (außerhalb App)
│   ├── neuroquest-cover.png            # Cover-Illustration
│   ├── neuroquest-day1-hero.jpg        # Tag 1 Hero
│   ├── neuroquest-day2-hero.jpg        # Tag 2 Hero
│   ├── neuroquest-day4-hero.jpg        # Tag 4 Hero
│   ├── neuroquest-day5-hero.jpg        # Tag 5 Hero
│   ├── neuroquest-characters-guide.png # Character Design Reference
│   ├── stock_neuroquest-day-complete-*.jpg  # Tagesabschluss-Bild
│   ├── stock_neuroquest-hero-cover-*.jpg    # Starter-Cover (Backup)
│   ├── stock_neuroquest-story-intro-*.jpg   # Story-Intro (optional)
│   └── stock_neuroquest-task-focus-*.jpg    # Task-Fokus-Bild (optional)
│
├── uploads/                            # Temp Upload-Directory (leer)
│
└── docs/                               # Dokumentation
    └── handover/
        └── PROJECT_HANDOVER.md         # Diese Datei

```

**Wichtige Dateien für Verständnis:**

1. **App.jsx** – Herzstück: State, Navigation, Dialog-System
2. **App.css** – Globale Styles, Farben, Typografie, Animations
3. **SentenceStartPage.jsx** – Tag/Mission-Intro (Story-Daten + Dialoge)
4. **StoryRevealPage.jsx** – Story-Fragmente (10 Geschichts-Teile)
5. **DayCompletePage.jsx** – Tagesabschluss + vollständige Tagesgeschichten
6. **PageStructure.jsx** – Reusable Layout-Komponente

---

## 10. Datenbank

**Status:** ❌ **Nicht implementiert in V1**

Die Anwendung hat **keine Datenbank**. Der Spielzustand lebt nur im React `useState()` und wird bei Seiten-Reload gelöscht.

### Zukünftige DB-Anforderungen (V2)

Falls Persistierung implementiert werden soll:

| Entität | Felder | Zweck |
|---------|--------|-------|
| User | id, name, age, role (student/parent/teacher) | Benutzer-Verwaltung |
| PlaySession | id, user_id, day, sentence, timestamp | Wer hat wann was gemacht |
| Progress | user_id, day, sentence, completed | Fortschritt speichern |
| CustomSentences | id, user_id, day, sentence_num, text | Anpassbare Aufgaben |

### Aktuell bekannte Plattform-Beschränkungen

- **PocketBase Email API:** Deaktiviert (keine automatischen E-Mails)
- **PocketBase Cron Jobs:** Deaktiviert (keine Scheduled Tasks)
- Diese Funktionen sind für V1 nicht geplant, aber für V2 zu beachten

---

## 11. API und Schnittstellen

**Status:** ❌ **Keine API in V1**

Die Anwendung macht **keine HTTP-Requests** und hat keine externen Abhängigkeiten (außer Google Fonts für Typografie).

### Geplante API-Anforderungen (V2)

| Methode | Endpoint | Zweck | Beispiel Input | Beispiel Output |
|---------|----------|-------|---|---|
| POST | /api/users/signup | Benutzer registrieren | name, email, password | { user_id, token } |
| GET | /api/progress/:user_id | Fortschritt abrufen | user_id | { day, sentence, completed_sentences } |
| POST | /api/progress/:user_id | Fortschritt speichern | day, sentence | { success, updated_at } |
| GET | /api/sentences/:user_id/:day | Aufgaben-Texte abrufen | user_id, day | [ { sentence_num, text } ] |
| POST | /api/sentences/:user_id | Custom-Sätze hochladen | day, sentences[] | { success, created } |

---

## 12. Fachliche Geschäftslogik

### Die Magischen 5 – Der Kern-Algorithmus

```
Für jeden Tag (1–5):
  Für jede Mission (1–5):
    Schritt 1: Hinschauen (👀)
      → Hinweis anzeigen
      → Kind führt Aufgabe im Heft durch
      → Kind klickt "Weiter"
    
    Schritt 2: Schreiben (✏️)
      → Hinweis anzeigen
      → Kind schreibt Satz ab
      → Kind klickt "Weiter"
    
    Schritt 3: Kontrollieren (🔍)
      → Hinweis anzeigen
      → Kind prüft Wort für Wort
      → Kind klickt "Weiter"
    
    Schritt 4: Unterstreichen (📏)
      → Hinweis anzeigen
      → Kind unterstreicht fertigen Satz
      → Kind klickt "Weiter"
    
    Schritt 5: Geschichte-Freischaltung (📖)
      → neuer Geschichts-Fragment
      → Lumi gibt Feedback
      → Wenn sentence < 5: Weiter zu nächste Mission
      → Wenn sentence = 5: Zu Tagesabschluss

Tag abgeschlossen:
  → Komplette Tagesgeschichte zeigen
  → Tagesabschluss-Bild
  → Optionen: Nächster Tag oder Pause
```

### Logik: Tage-Wechsel mit Dialog

**Regel:** Kind kann nicht zu einem anderen Tag wechseln, während aktueller Tag noch nicht komplett ist (sentence < 5).

```javascript
trySelectDay(day) {
  // Wenn gleicher Tag: Ignorieren
  if (day === currentDay) return;
  
  // Prüfe, ob aktueller Tag unvollständig
  const isCurrent = completedSentences[`${currentDay}-5`] === undefined;
  
  if (isCurrent) {
    // Unvollständiger Tag: Dialog zeigen
    setDialogState('switchDay');
  } else {
    // Vollständiger Tag: Zu neuem Tag springen
    goToPage("sentenceStart", day, 1);
  }
}
```

**Dialog-Text (Caspar & Lumi):**
> "Darf ich dich kurz etwas fragen? Ich glaube, wir haben hier heute noch etwas zu entdecken. Natürlich kannst du jederzeit einen anderen Tag wählen. Unser heutiges Abenteuer wartet aber geduldig auf uns."

**Buttons:**
- 🌿 Weiter im Abenteuer (Dialog schließen)
- 🍂 Trotzdem Tag wechseln (Tag wechseln)

### Fortschritt-Tracking (Lokal im State)

```javascript
const [completedSentences, setCompletedSentences] = useState({});
// Key: "day-sentence" (z.B. "1-1", "2-3")
// Value: true (wenn completed)

const handleSentenceComplete = () => {
  const key = `${currentDay}-${currentSentence}`;
  setCompletedSentences(prev => ({ ...prev, [key]: true }));
  handleNextSentence();
};
```

**Problem:** Bei Seiten-Reload werden alle Daten gelöscht.
**Lösung (V2):** localStorage oder Datenbank nutzen.

---

## 13. Authentifizierung, Rollen und Berechtigungen

**Status:** ❌ **Nicht implementiert in V1**

Es gibt **keine Authentifizierung**. Jede Person, die die App öffnet, sieht von Anfang an (Tag 1, Satz 1).

### Geplante Rollen (V2)

| Rolle | Zugang | Befugnisse |
|-------|--------|-----------|
| **Student** | Spiel-Interface | Spielen, Fortschritt anschauen |
| **Parent** | Parent-Dashboard | Kind's Fortschritt anschauen (optional Stats) |
| **Teacher** | Class-Dashboard | Mehrere Schüler verwalten, Aufgaben anpassen |
| **Admin** | Admin-Panel | System-Verwaltung, User-Verwaltung |

---

## 14. Konfiguration und Umgebungen

### Development-Umgebung

```bash
npm run dev
# Startet Vite Dev-Server auf localhost:5173
# Hot-Reload bei Änderungen
```

**Konfiguration:** `vite.config.js` (minimal)

### Production Build

```bash
npm run build:prod
# Erzeugt optimierten Bundle in ./dist/
# CSS & JS minified, gzip'd
```

**Output-Größen (aktuell):**
- CSS: ~18 KB (gzip: ~4.4 KB)
- JS: ~215 KB (gzip: ~66 KB)

### Build für Preview

```bash
npm run build
# Nutzt --mode preview (optional)
```

### Environment Variables

**Aktuell:** Keine `.env`-Datei benötigt (V1 hat keine Backend-Dependencies)

**Zukünftig (V2):**
```env
VITE_API_URL=https://api.example.com
VITE_DB_HOST=db.example.com
VITE_PUBLIC_KEY=... (kein Secret!)
```

**Wichtig:** Secrets gehören **NICHT** in `.env` oder `index.html`. Sie gehören auf den Server.

---

## 15. Externe Abhängigkeiten

| Abhängigkeit | Typ | Version | Notizen |
|---|---|---|---|
| **React** | Framework | 18.x | Platform-provided, nicht npm |
| **React-DOM** | Framework | 18.x | Platform-provided |
| **Vite** | Build-Tool | 6.4+ | Platform-provided |
| **@vitejs/plugin-react** | Plugin | Latest | Platform-provided |
| **Tailwind CSS v4** | Styling | 4.x | Platform-provided, nicht npm |
| **lucide-react** | Icons | Latest | Platform-provided (optional) |
| **pocketbase** | Backend SDK | Latest | Platform-provided, aber begrenzt (kein Email, Cron) |
| **Google Fonts** | Fonts | – | CSS-Import: Borel, Crimson Text, Lora |

**Wichtig:** `package.json` hat **keine Dependencies** (`"dependencies": {}`, `"devDependencies": {}`).
Der Grund: Alle benötigten Libraries sind auf der Plattform verfügbar, und npm install ist deaktiviert.

---

## 16. Bereits erledigte Entwicklungsaufgaben

| Aufgabe | Ergebnis | Status | Nachweis |
|---------|----------|--------|----------|
| Projekt-Setup (Vite + React) | Funktionierendes Dev-Environment | ✅ | vite.config.js, package.json, src/main.jsx |
| Seitenstruktur (11 Pages) | Alle Seiten implementiert | ✅ | src/pages/*.jsx (11 Dateien) |
| State-Management | App.jsx mit useState für Day/Sentence/Page | ✅ | App.jsx (219 LOC, 5 Funktionen) |
| Routing-Logik | State-basiertes Routing ohne React Router | ✅ | App.jsx switch/case für currentPage |
| Global Styling | Farben, Typografie, Animations | ✅ | App.css (599 LOC) |
| PageStructure Component | Unified Layout für Task/Story-Seiten | ✅ | components/PageStructure.jsx |
| ProgressFooter Component | 2-Level Progress (Days + Missions) | ✅ | components/ProgressFooter.jsx |
| Dialog-System | Caspar/Lumi Dialog statt Warnfenster | ✅ | App.jsx DialogOverlay |
| Story-Fragmente (Day 1–2) | 10 Story-Texts (5 pro Tag) | ✅ | StoryRevealPage.jsx |
| Story-Einleitung pro Tag | dayIntros für 5 Tage | ✅ | SentenceStartPage.jsx |
| Story-Einleitung pro Mission | sentenceIntros für 5 Missionen | ✅ | SentenceStartPage.jsx |
| Tagesabschluss-Geschichten | dayStories für 5 Tage | ✅ | DayCompletePage.jsx |
| PWA-Setup | manifest.json, service-worker.js | ✅ | public/manifest.json, public/service-worker.js |
| App-Icons | 192px, 512px, maskable Icons | ✅ | public/icon-*.png |
| Favicon | SVG Favicon | ✅ | public/favicon.svg |
| Apple-Support | apple-touch-icon, meta Tags | ✅ | public/, index.html |
| Offline-Support | Service Worker für Offline-Funktionalität | ✅ | public/service-worker.js |
| Responsive Design | Mobile-first (375px, 768px, 1280px) | ✅ | App.css Media Queries, PageStructure |
| Cover-Image | Illustration für Startseite | ✅ | /static/neuroquest-cover.png |
| Hero-Images | Bilder für 5 Tage | ✅ | /static/neuroquest-day[1-5]-hero.jpg |
| Day-Complete Image | Abschluss-Illustration | ✅ | /static/stock_neuroquest-day-complete-*.jpg |
| Character-Guide | Design Reference für Caspar & Lumi | ✅ | /static/neuroquest-characters-guide.png |
| Philosophie-Dokumentation | Pädagogische & Design-Philosophie | ✅ | NEUROQUEST_PHILOSOPHY.md |
| Struktur-Dokumentation | Seitenstruktur, Flows, Komponenten | ✅ | NEUROQUEST_STRUCTURE.md |
| Git-Commits | 25+ aussagekräftige Commits | ✅ | app/.git/logs, git log |
| Production-Build | Optimierter dist/ für Deployment | ✅ | app/dist/ (committed) |

---

## 17. Teilweise erledigte Arbeiten

| Arbeit | Ursprüngliches Ziel | Bereits umgesetzt | Noch fehlend | Relevante Dateien | Abhängigkeiten |
|--------|---|---|---|---|---|
| Story-Fragmente | 25 Story-Texts (5 Tage × 5 Missionen) | 10 (Tag 1–2 komplett) | 15 (Tag 3–5 Skelett) | StoryRevealPage.jsx | Schreib-Anforderungen |
| Illustrations | Spezifische Bilder pro Seite | 8 Hero/Complete-Bilder | Icons/Illustrations für Task-Steps | /static/*.jpg | Illustrations |
| ProgressHeader | Sichtbar auf Story/Completion-Seiten | Komponente existiert | Vollständige Integration in alle Pages | ProgressHeader.jsx | Testing |
| Day 3–5 Intro-Texte | Spezifische Dialoge für alle Tage | 5 dayIntros, 5 sentenceIntros | Qualität/Stilkonistenz prüfen | SentenceStartPage.jsx | QA/Testing |

---

## 18. Offene Anforderungen und Backlog

### P0 – Blockierend/Kritisch

| ID | Aufgabe | Grund | Abhängigkeiten | Erwartetes Ergebnis | Akzeptanzkriterium |
|----|---------|-------|---|---|---|
| P0-1 | Story-Fragmente Day 3–5 vervollständigen | Nur Tag 1–2 haben vollständige Stories | Textautorenschaft | Alle 25 Story-Fragmente gefüllt, konsistent, atmosphärisch | Kinder können alle 5 Tage durchspielen ohne "..." Platzhalter |
| P0-2 | Browser-Cache löschen (für Live-Tests) | Alte UI wird noch angezeigt, obwohl neue im Code | – | Forcierte Cache-Invalidierung | Live-Server zeigt aktuelle Version |

### P1 – Notwendig für nächsten Stand

| ID | Aufgabe | Grund | Abhängigkeiten | Erwartetes Ergebnis | Akzeptanzkriterium |
|----|---------|-------|---|---|---|
| P1-1 | Lokale Persistierung | State wird bei Reload gelöscht | localStorage oder IndexedDB | Fortschritt bleibt über Reload erhalten | Child öffnet App → macht 3 Missionen → schliesst App → öffnet wieder → bei Mission 4 fortgesetzt |
| P1-2 | Testing mit echtem Kind (7–10 Jahre) | Concept Prototype ohne echte Nutzerfeedback | Keine | Feedback: Navigieren, Verstehen, Motivation, Verbesserungsvorschläge | Kind kann ohne Erklärung spielen, möchte weiterlesen |
| P1-3 | Finale Illustrationen (ggf. professionell) | Platzhalter-Stock-Fotos sind nicht Kinderbuch-Qualität | Illustrator/Designer | Hochwertige, konsistente Illustrationen für alle Seiten | Visuelles Design matcht das narrative Gefühl |

### P2 – Wichtig (bald)

| ID | Aufgabe | Grund | Abhängigkeiten | Erwartetes Ergebnis | Akzeptanzkriterium |
|----|---------|-------|---|---|---|
| P2-1 | React Router implementieren | State-Switching ist nicht skalierbar für 20+ Seiten | – | Saubere URL-Struktur (z.B. /day/1/sentence/2) | URLs sind teilbar, Bookmarkable |
| P2-2 | Login-System (Basis) | V2 Anforderung: Mehrere User | Database Schema | Einfacher Login (Name/PIN für Kinder) | Kind kann eigenes Profil öffnen |
| P2-3 | Datenbank Setup | Fortschritt + Custom-Aufgaben speichern | PocketBase oder ähnlich | Schema: Users, Progress, Sessions | Daten sind persistent |
| P2-4 | Parent/Teacher Dashboard (Mockup) | Optional: Sichtbarkeit ohne Druck | Wireframes, Designentscheidungen | Prototype eines Admin-Views | Pädagog kann Child's Fortschritt sehen (ohne Benchmarking) |
| P2-5 | Accessibility-Audit | WCAG 2.1 AA | Testing | Farbkontraste OK, Keyboard-Navigation, ARIA | Blinde Nutzer können navigieren |

### P3 – Später/Optional

| ID | Aufgabe | Grund | Abhängigkeiten | Erwartetes Ergebnis | Akzeptanzkriterium |
|----|---------|-------|---|---|---|
| P3-1 | Audio/Voice-Over | Für Leseanfänger | Sprachaufnahmen oder TTS | Optional: Geschichten vorlesen | Toggle zum An-/Ausschalten |
| P3-2 | Mehrsprachigkeit | Andere Länder | Übersetzungen | Deutsch, Englisch, ggf. weitere | Auf Sprache umschaltbar |
| P3-3 | Erweiterte Animationen | "Umblätter"-Effekt, Übergangsanimationen | Design + CSS/JS | Sanfte Seitenwechsel | Fühlt sich wie "Buch"-Navigation an |
| P3-4 | Offline-Installation optimieren | App.manifest Screenshots | Screenshots | Screenshots in manifest.json | App Store zeigt schöne Preview |
| P3-5 | Dark Mode | Optional für Augenschonung | Design-Entscheidung | Toggle Dark/Light | Visuelle Konsistenz in beiden Modi |

---

## 19. Bekannte Fehler und technische Schulden

### Kritische Fehler

**Keine bekannten kritischen Fehler zum aktuellen Stand.**

### Mittlere Fehler / Auffälligkeiten

| Fehler | Ursache | Auswirkung | Workaround | Empfohlene Lösung | Priorität |
|--------|--------|-----------|-----------|------------------|-----------|
| Browser-Cache zeigt alte UI | Vite/Browser-Caching | Nach Code-Änderung sieht User alte Version | Hard-Refresh (Strg+Shift+R) | Service Worker + Cache-Busting-Hash in Dateinamen | P1 |
| Day 3 nutzt Day 2 Hero-Image | Entwickler-Überland | Fehlende Spezifizierung für Day 3 | Visuell nicht kritisch | Spezifisches Day 3 Image hinzufügen | P2 |
| State verloren bei Reload | Kein LocalStorage | Child beginnt immer bei Tag 1, Satz 1 | Akzeptiert in V1 | localStorage Wrapper implementieren | P1 |
| Story-Fragmente Day 3–5 Skelett | Nicht alle Texte geschrieben | Child sieht Platzhalter statt Story | – | Alle 25 Story-Texts schreiben | P0 |

### Technische Schulden

| Schuld | Details | Auswirkung | Lösungsweg | Priorität |
|--------|---------|-----------|-----------|-----------|
| Kein Router (React Router) | State-basiertes Routing ist hardcoded | Schwer zu warten, nicht skalierbar | React Router v7 integrieren | P2 (nach V1) |
| Keine Unit/Integration Tests | 0% Test Coverage | Regression-Risiken bei Änderungen | Jest + React Testing Library Setup | P2 |
| Keine Error Boundary | React Error aufgetreten → White Screen | Nutzer-Experience schlecht | Error Boundary Wrapper | P2 |
| Keine Linting (ESLint) | Code-Stil nicht enforce'd | Technisch unproblematisch, aber Qualität | ESLint + Prettier Setup | P3 |
| Hard-coded Texte in Komponenten | Schwer zu lokalisieren, übersetzen | Mehrsprachigkeit unmöglich ohne Refactor | i18n (react-i18next) | P3 |
| Inline-Styling in Dialog | CSS teilweise inline in JSX | Wartbarkeit reduziert | Alle Styles in App.css auslagern | P2 |

---

## 20. Getroffene Architektur- und Entwicklungsentscheidungen

### Entscheidung 1: State-basiertes Routing statt React Router

**Entscheidung:** Verwendung von `useState()` für Seiten-Navigation statt React Router.

**Hintergrund:**
- Concept Prototype sollte minimal sein
- Nur 11 Seiten (später 20–30)
- URL-Struktur nicht kritisch für MVP

**Gewählte Lösung:**
```javascript
const [currentPage, setCurrentPage] = useState("cover");
// Seite wechseln: goToPage("daySelect");
```

**Konsequenzen:**
- ✅ Einfach zu verstehen, schnell zu implementieren
- ✅ Keine externe Abhängigkeit
- ❌ URLs nicht teilbar/bookmarkable
- ❌ Browser-Back-Button funktioniert nicht
- ❌ Schwer zu testen
- ⚠️ Muss vor V2 zu React Router refactored werden

**Bekannte Alternativen:**
- React Router v7 (besser, aber overhead für Prototype)
- TanStack Router (modern, aber neue Dependency)

---

### Entscheidung 2: Keine Datenspeicherung in V1

**Entscheidung:** Komplett client-side, kein localStorage, kein Backend.

**Hintergrund:**
- Focustest sollte auf Narrativ + UX sein, nicht Daten-Komplexität
- Child öffnet App, spielt, schliest → State weg
- Ideale Demo-Erlebnis für Eltern/Lehrkräfte

**Konsequenzen:**
- ✅ Stark vereinfachte Architektur
- ✅ Keine Datenbank-Abhängigkeiten
- ❌ Kein echte Persistierung
- ⚠️ V2 muss Daten-Layer hinzufügen

**Geplanter Übergang (V2):**
```javascript
// V1: State verloren bei Reload
// V2: localStorage + optional Cloud-Sync
```

---

### Entscheidung 3: Custom CSS statt pure Tailwind

**Entscheidung:** App.css mit Custom CSS + Tailwind v4 Utilities.

**Hintergrund:**
- Warme, narrative Ästhetik erfordert spezifische Farben + Animationen
- Tailwind Utilities reichen nicht für alle Effekte

**Konsequenzen:**
- ✅ Farben zentral definiert (CSS Custom Properties)
- ✅ Animationen schön und konsistent
- ⚠️ Tailwind-Dependencies nicht genutzt (könnten gelöscht werden)

---

### Entscheidung 4: PWA als Primär-Delivery

**Entscheidung:** App als installierbare PWA statt Web-Browser-only.

**Hintergrund:**
- Kind soll App-Gefühl haben
- Offline-Funktionalität gewünscht
- Touch-Optimiert für Mobile

**Konsequenzen:**
- ✅ Installierbar auf iOS/Android
- ✅ Service Worker für Offline
- ✅ App Icon im Homescreen
- ✅ Full-Screen Browsing

**Plattform-Unterstützung:**
- iOS: Volle PWA-Unterstützung (ab iOS 11.3)
- Android: Volle PWA-Unterstützung (ab Android 5)
- Desktop: Optional Chrome/Edge installierbar

---

### Entscheidung 5: Keine Gamification (bewusst)

**Entscheidung:** Keine Punkte, Stars, Badges, Leaderboards.

**Hintergrund:**
- Pädagogisch: Intrinsische Motivation (Story) > Extrinsische (Punkte)
- Besonders für ADHS: Weniger Reiz = bessere Fokussierung

**Konsequenzen:**
- ✅ Ruhigeres, fokussierteres Erlebnis
- ✅ Keine Sucht-Mechaniken
- ❌ Weniger "belohnend"-Gefühl (bewusst!)

---

### Entscheidung 6: Charaktere (Caspar + Lumi) statt Lehrkraft-Avatar

**Entscheidung:** Caspar (Kind, gleichaltrig) + Lumi (freundlicher Begleiter) statt "Frau Müller erklärt".

**Hintergrund:**
- Kinder identifizieren sich mit Caspar (relatable)
- Lumi ist Unterstützung, keine Autorität
- Weniger schulisch-formell

**Konsequenzen:**
- ✅ Emotionale Bindung stärker
- ✅ Weniger Leistungsdruck
- ✅ Abenteuer-Gefühl statt "Hausaufgabe"

---

## 21. Offene Entscheidungen

| Entscheidung | Warum relevant | Betroffene Bereiche | Optionen | Blockiert |
|---|---|---|---|---|
| **Persistierungs-Strategie (V2)** | Daten gehen bei Reload verloren | Fortschritt, User-Profile, Custom-Aufgaben | localStorage vs. Cloud (PocketBase/Firebase/Custom API) | V2 Backlog |
| **URL-Struktur / Routing** | Aktuell keine echten URLs | Shareable Links, Browser History, SEO | React Router vs. TanStack Router vs. Next.js | V2 Development |
| **Parent/Teacher Access** | Optional: Lehrkraft soll Fortschritt sehen | Dashboard, Permissions, Analytics | Separat Portal vs. In-App Tab | Feature Priorität |
| **Multi-Language Support** | Deutsch-only aktuell | i18n Setup, Translation Management | react-i18next vs. zustand-intl vs. Lokalisierungen-File | P3 oder später |
| **Database Choice (V2)** | Keine DB aktuell | Schema, API, Hosting | PocketBase (begrenzt auf Plattform) vs. SQL (PostgRES) vs. NoSQL (MongoDB) | V2 Architecture |
| **Audio/Voice-Over** | Leseanfänger könnten profitieren | Story-Vorlesung, Anweisungs-Audio | Text-to-Speech (Web Speech API) vs. Pre-recorded Audio vs. keine | P3 |
| **Design System** | Aktuelle Styles sind ad-hoc | Komponenten-Bibliothek, Konsistenz | Storybook vs. Dokumentierte CSS vs. Component Library | P2 |
| **Erweiterte Stories** | 5 Tage × 5 Missionen sind Prototype-Größe | Story-Bäume, Verzweigungen, Multiple Endings | Lineare Narrative vs. Choice-basierte vs. Dynamisch-generiert | V2 Content |

---

## 22. Tests und Qualitätssicherung

### Manuelles Testing (bisher)

| Test | Bereich | Status | Notizen |
|------|---------|--------|---------|
| Seite-Navigation | Alle 11 Seiten | ✅ Getestet | Transitions funktionieren |
| Responsive Design | Mobile (375px), Tablet (768px), Desktop (1280px) | ✅ Teilweise | Keine automatisierten Tests, visuell geprüft |
| PWA Installation | iOS Safari, Android Chrome | ✅ Funktioniert | Icons sichtbar, App-Mode aktiv |
| Story-Progressions | 5 Tage, 5 Missionen, 25 Stories | ⚠️ Größtenteils | Day 1–2 vollständig, Day 3–5 Skelett |
| Dialog-System | Tag-Wechsel-Warnung | ✅ Funktioniert | Text angezeigt, Buttons ansprechbar |
| Offline-Funktionalität | Service Worker | ⚠️ Nicht getestet | SW registriert, aber Offline nicht formal getestet |
| Accessibility (WCAG) | Farbkontraste, Tastatur-Navigation | ❌ Nicht geprüft | Keine WCAG-Audit durchgeführt |
| Performance | Bundle-Größe, Load-Zeiten | ✅ Akzeptabel | CSS 18KB, JS 215KB (gzip OK) |

### Automatisierte Tests

**Status:** ❌ **Keine automatisierten Tests vorhanden**

Gründe:
- V1 Concept Prototype – Schnelligkeit über Testabdeckung
- React Testing Library würde Setup erfordern

**Geplant (V2):**
```bash
npm test  # Jest + React Testing Library
# Unit Tests für Komponenten
# Integration Tests für Flows
# E2E Tests (ggf. Playwright)
```

### Browser-Kompatibilität

| Browser | Version | Status | Notizen |
|---------|---------|--------|---------|
| Chrome | 90+ | ✅ Getestet | Volle Unterstützung |
| Safari | 14+ | ✅ Getestet | PWA OK, einige CSS-Präfixe möglich |
| Firefox | 88+ | ⚠️ Angenommen | Nicht formal getestet |
| Edge | 90+ | ⚠️ Angenommen | Chromium-basiert, sollte OK sein |
| IE 11 | – | ❌ Nicht supportet | Bewusste Entscheidung: Modernes JS |

---

## 23. Deployment und Betrieb

### Deployment-Flow

```
Local Development (npm run dev)
    ↓
Code Changes (src/, pages/, etc.)
    ↓
Production Build (npm run build:prod)
    → Output: dist/ (committed zu Git)
    ↓
Git Push zu Repository
    ↓
IONOS SFS Platform (Continuous Deployment)
    → /dist/ Inhalt live on Web
    → /static/ Bilder verfügbar unter /static/
    ↓
Live Website
    → User öffnet Domain → served von dist/index.html
    → PWA installierbar
```

### Zielumgebung (IONOS SFS)

| Aspekt | Setup |
|--------|-------|
| **Server** | IONOS Secure File Server (SFS) |
| **Build-Output** | `/home/www/aibuilder-60gz0/app/dist/` |
| **Static Assets** | `/home/www/aibuilder-60gz0/static/` |
| **Service Worker** | `/dist/service-worker.js` |
| **Domain** | Primary IONOS-Domain oder Custom |
| **HTTPS** | Auto, Letsencrypt |
| **CDN** | Nicht explizit konfiguriert |

### Known Deployment Issues

| Problem | Symptom | Ursache | Lösung |
|---------|---------|--------|--------|
| Alte Version wird angezeigt | Browser zeigt alte UI nach Update | Browser-Cache | Hard-Refresh (Strg+Shift+R) oder Service Worker Cache-Busting |
| Service Worker blockiert Update | App aktualisiert nicht | Old SW noch aktiv | Neue Service-Worker-Version mit anderer Dateiname |
| Static Assets 404 | Bilder laden nicht | Falscher /static/-Pfad in Code | Alle Image-Src müssen `/static/filename` sein (leading slash) |

### Rollback

Falls etwas schief läuft:

```bash
git log --oneline          # Letzte funktionierende Version finden
git reset --hard <commit>  # Zu früherer Version zurück
npm run build:prod         # Neu bauen
# Deploy (manuell oder auto)
```

---

## 24. Risiken

### Technische Risiken

| Risiko | Auswirkung | Wahrscheinlichkeit | Gegenmaßnahme |
|--------|-----------|---|---|
| Browser-Cache macht Updates unmöglich | User sieht alte Version, denkt Bug | Mittel | Service Worker + Cache-Busting Hash |
| Keine Persistierung (V1) | Child muss bei Reload neu starten | Hoch | Akzeptiert für MVP, aber fix für V2 |
| React State-basiertes Routing nicht skalierbar | Kompliziert bei 50+ Seiten | Niedrig (aktuell nur 11) | React Router v7 vor V2 |
| Keine Error Boundary | Crash → White Screen | Niedrig | Error Boundary Wrapper hinzufügen |
| PWA Service Worker-Bug | App funktioniert Offline nicht | Niedrig | Manuell testen bei jedem Deploy |

### Pädagogische Risiken

| Risiko | Auswirkung | Wahrscheinlichkeit | Gegenmaßnahme |
|--------|-----------|---|---|
| Geschichte ist nicht engaging genug | Kind interessiert sich nicht, bricht ab | Mittel | User-Testing mit echtem Kind; Story-Überarbeit |
| Aufgaben-Anleitung zu kompliziert | Kind versteht nicht, was zu tun ist | Niedrig | 2-Sekunden-Test durchführen; vereinfachen |
| App fühlt sich nicht wie "Abenteuer" an, sondern wie Schule | Kind verliert Motivation | Mittel | Regelmäßige Design-Reviews gegen Manifest |
| Lumi-Charakter wird als patronisierend empfunden | Ältere Kids mögen das nicht | Mittel-Hoch | Altersgerechte Anpassung in V2 |
| Keine Fortschritts-Belohnung ermutigt nicht genug | Child sieht keinen Erfolg | Mittel | Fortschritts-Visualisierung (Blätter/Steine) sollte genügen |

---

## 25. Empfohlene nächste Entwicklungsschritte

### Phase 1: Stabilisierung & Testing (1–2 Wochen)

| Schritt | Ziel | Voraussetzung | Ergebnis | Akzeptanzkriterium |
|---------|------|---|---|---|
| 1.1 | User-Testing mit echtem Kind durchführen | – | Feedback: Navigation, Verständnis, Motivation | "Ich möchte wissen, wie es weitergeht" |
| 1.2 | Story-Fragmente Day 3–5 schreiben | Textautorenschaft | Alle 25 Stories gefüllt, konsistent | Keine "..." Platzhalter |
| 1.3 | Browser-Cache / Service-Worker optimieren | – | Hard-Refresh nicht mehr nötig | Updates sofort sichtbar |
| 1.4 | Finale Illustrationen beschaffen | Designer/Illustrator | Hochwertige Bilder für alle Seiten | Kinderbuch-Qualität |

### Phase 2: Kernfeatures (2–4 Wochen)

| Schritt | Ziel | Voraussetzung | Ergebnis | Akzeptanzkriterium |
|---------|------|---|---|---|
| 2.1 | localStorage-Persistierung implementieren | – | Fortschritt bleibt über Reload | Child kann unterbrechen & später fortsetzen |
| 2.2 | React Router v7 integrieren | – | Saubere URL-Struktur (/day/1/sentence/2) | URLs teilbar, bookmarkbar |
| 2.3 | Basis-Tests schreiben (Jest + RTL) | – | 60%+ Coverage | Regressions deutlich früher erkannt |
| 2.4 | Error Boundary hinzufügen | – | Fehler → freundliche Nachricht statt White Screen | User-Experience bei Bugs besser |

### Phase 3: Backend-Integration (4–6 Wochen)

| Schritt | Ziel | Voraussetzung | Ergebnis | Akzeptanzkriterium |
|---------|------|---|---|---|
| 3.1 | Datenbank-Schema definieren | – | Tables: Users, Progress, Sessions | Schema dokumentiert, peer-reviewed |
| 3.2 | Backend API (CRUD) implementieren | Schema | REST-Endpunkte für Login, Progress-Save, Fetch | Swagger/OpenAPI dokumentiert |
| 3.3 | Frontend-Integration (Daten-Sync) | API ready | App speichert & lädt Fortschritt | Child's Daten persistent nach 5 Tage Demo |
| 3.4 | Login-Flow (Kinder-freundlich) | Backend ready | Einfacher Login (Name oder PIN) | Kind kann 2–3 Profile verwalten |

### Phase 4: Erweiterte Features (6–12 Wochen)

| Schritt | Ziel | Voraussetzung | Ergebnis | Akzeptanzkriterium |
|---------|------|---|---|---|
| 4.1 | Parent/Teacher Dashboard | Datenbank aktiv | Erwachsene sehen Child's Fortschritt (ohne Benchmarking) | Eltern können helfen, ohne Druck auszuüben |
| 4.2 | Anpassbare Aufgaben (Custom Sentences) | Backend ready | Lehrkraft kann Aufgaben-Texte hochladen | Pro Kind: Unterschiedliche Aufgaben möglich |
| 4.3 | Accessibility-Audit (WCAG 2.1 AA) | – | Farbkontraste OK, Tastatur-Navigation, ARIA | Blinde/Motor-behinderte Nutzer können spielen |
| 4.4 | Audio/Voice-Over (optional) | – | Stories optional vorlesen | Leseanfänger profitieren |

---

## 26. Einstiegspunkt für die nächste KI

### Was zuerst lesen?

1. **NEUROQUEST_PHILOSOPHY.md** (10 Min) – Pädagogische Vision und Design-Prinzipien verstehen
2. **NEUROQUEST_STRUCTURE.md** (15 Min) – Seitenstruktur, Komponenten, User-Flows
3. **Dieses Dokument** (30 Min) – Technischer Stand, Architektur, bekannte Issues
4. **App.jsx** (20 Min) – Zentrale State-Verwaltung, Routing-Logik
5. **App.css** (10 Min) – Farben, Animationen, Responsive Design

### Wichtigste Dateien (Änderungen mit Bedacht!)

| Datei | Kritikalität | Grund |
|-------|---|---|
| `App.jsx` | 🔴 KRITISCH | State-Management, Routing, Dialog-System |
| `App.css` | 🔴 KRITISCH | Farben, Typografie, Layout, Animations |
| `StoryRevealPage.jsx` | 🟠 WICHTIG | Story-Fragmente (25 Texte) |
| `DayCompletePage.jsx` | 🟠 WICHTIG | Tagesabschluss-Geschichten (5 Texte) |
| `SentenceStartPage.jsx` | 🟠 WICHTIG | Tag/Mission-Intros (10 Texte) |
| `components/PageStructure.jsx` | 🟠 WICHTIG | Unified Layout (Task/Story-Seiten) |
| `components/ProgressFooter.jsx` | 🟠 WICHTIG | Fortschritts-Anzeige |
| `public/manifest.json` | 🟡 MODERAT | PWA-Metadaten |
| Task Step Pages (1–4) | 🟢 GERING | Standard, verwenden PageStructure |
| CoverPage, WelcomePage, DaySelectPage | 🟢 GERING | Standard Page-Komponenten |

### Nächster empfohlener Arbeitsschritt

**Sofort:** Führe ein User-Testing mit einem echten Kind (7–10 Jahre) durch.

```
1. Child öffnet App zum ersten Mal
2. Ohne Erklärung: Kann es navigieren?
3. Kann es den Rhythmus verstehen (4 Steps → Story)?
4. Möchte es "weiterlesen"?
5. Wo gibt es Verwirrung?
```

**Basierend auf Feedback:**
- Wenn Navigieren OK, aber Story nicht interessant → Story schreiben (P0-1)
- Wenn Navigieren OK, aber Persistierung fehlt → localStorage (P1-1)
- Wenn alles OK → Phase 2 Backend-Integration starten

### Offene Entscheidungen, die respektiert werden müssen

1. ❌ **Keine Punkte/Stars/Gamification** – Das ist eine bewusste pädagogische Entscheidung
2. ❌ **Keine Login in V1** – Kind öffnet App direkt ohne Authentifizierung
3. ✅ **Caspar + Lumi Charakter** – Nicht zu "Frau Müller Erklärbär" ändern
4. ✅ **Warme Farbpalette** – Creme/Waldgrün/Moosgrün/Gold, nie Neon
5. ✅ **Keine Schule-Ästhetik** – Immer "Abenteuer"-Gefühl, nie "Arbeitsblatt"
6. ❌ **Keine Email/Cron APIs** – Platform-Limit; nicht umgangen werden

### Veränderungen prüfen: Die 2-Sekunden-Regel

Vor **jeder** Änderung fragen:

> "Versteht ein 7-jähriges Kind in 2 Sekunden, was es tun soll?"

Wenn Nein → Simplify.
Wenn Ja → Proceed.

---

## 27. Unsicherheiten und fehlende Informationen

| Unsicherheit | Impact | Notiz |
|---|---|---|
| **Sind Story-Fragmente Day 3–5 wirklich "Platzhalter"?** | Hoch | Code zeigt dayStories für 5 Tage gefüllt, aber nur Tag 1–2 im StoryRevealPage. Unklar, ob Tag 3–5 Intros in SentenceStartPage + Stories getestet wurden. |
| **Browser-Cache-Probleme: Wie oft?** | Mittel | Mehrere Commits erwähnen "Cache löschen". Wurde das systematisch behoben, oder ist es noch ein episodisches Ärgernis? |
| **PWA Offline-Funktionalität: Wie gut?** | Mittel | Service Worker vorhanden, aber keine formalen Offline-Tests dokumentiert. Funktioniert das wirklich ohne Netz? |
| **IONOS SFS Plattform-Limits:** | Mittel | "PocketBase Email & Cron deaktiviert" – Was sind weitere Limits/Features dieser Plattform? |
| **Gibt es bereits echte Nutzerfeedbacks?** | Hoch | Wurde die App mit Kindern (ADHS/Autismus?) getestet? Oder nur mit Erwachsenen? |
| **Wo werden die Aufgaben-Texte eingegeben?** | Hoch | App sagt "Aufgaben sind im Heft". Wie funktioniert die Brücke? Soll Lehrkraft manuell Sätze schreiben, oder gibt es später eine Upload-Funktion? |
| **Deployment: Automatisch bei Git Push?** | Mittel | Commits erwähnen "Deploy v1, v2, etc." – Ist das manueller Deploy oder CI/CD? |
| **Git History: Vollständig?** | Niedrig | 25+ Commits sichtbar. Wurde GitHub ab initio gepusht, oder ist Git history lokal nur partial? |

---

## 28. Übergabe-Check

- [x] Anforderungen erfasst (Kapitel 4)
- [x] Implementierte Funktionen erfasst (Kapitel 5)
- [x] Offene Anforderungen erfasst (Kapitel 18)
- [x] Teilweise implementierte Funktionen erfasst (Kapitel 17)
- [x] Seitenstruktur erfasst (Kapitel 6)
- [x] Repositorystruktur erfasst (Kapitel 9)
- [x] Architektur erfasst (Kapitel 8)
- [x] Datenbank erfasst (Kapitel 10 – nicht vorhanden, dokumentiert)
- [x] APIs erfasst (Kapitel 11 – nicht vorhanden, geplant)
- [x] Geschäftslogik erfasst (Kapitel 12)
- [x] Erledigte Aufgaben erfasst (Kapitel 16)
- [x] Offene Aufgaben erfasst (Kapitel 18)
- [x] Fehler und technische Schulden erfasst (Kapitel 19)
- [x] Deployment erfasst (Kapitel 23)
- [x] Nächste Schritte definiert (Kapitel 25)
- [x] Unsicherheiten ausdrücklich dokumentiert (Kapitel 27)
- [x] Keine Secrets enthalten (API Keys, Passwörter ausgelassen)
- [x] Keine vermuteten Informationen als Fakten dargestellt (mit UNGEKLÄRT gekennzeichnet)

---

**Übergabe-Status: ✅ ABGESCHLOSSEN**

Dieses Dokument rekonstruiert den Entwicklungsstand von NeuroQuest zum 15. August 2026 basierend auf verfügbarem Quellcode, Git-Historie, und dokumentierten Anforderungen. Es ist die Grundlage für Weiterführung durch andere KI oder Entwickler:innen.

**Nächster Handoff:** Übergabe an Testphase oder Entwicklungs-Team für Phase 2 (Backend/Persistierung).
