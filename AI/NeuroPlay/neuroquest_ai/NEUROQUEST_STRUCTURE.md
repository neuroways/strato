# NeuroQuest — Grundgerüst und Struktur

## Überblick

NeuroQuest ist ein interaktives digitales Kinderbuch, das Lernaufgaben mit einer erzählten Geschichte verwebt. Die Anwendung folgt einem klaren, konsistenten Rhythmus basierend auf dem Konzept der „Magischen 5".

---

## Seitenstruktur

Die gesamte Anwendung besteht aus **9 Bildschirmtypen**, die jeweils als eigenständige „Buchseite" fungieren:

| Seite | Rolle | Mobile-fit |
|---|---|---|
| **CoverPage** | Titelseite – visuelle Einladung zum Abenteuer | ✓ |
| **WelcomePage** | Einführung Caspar & Lumi | ✓ |
| **DayStartPage** | Tagesanfang mit Fortschritt (Tag/Aufgabe) | ✓ |
| **TaskStep1–4Page** | Die 4 Arbeitsschritte der Magischen 5 | ✓ |
| **StoryRevealPage** | Geschichte-Belohnung nach jeder Aufgabe | ✓ |
| **DayCompletePage** | Tagesabschluss mit Optionen | ✓ |

**Beachte:** Jede Seite passt vollständig auf ein Smartphone (375 px). Kein Scrollen während einer Mission.

---

## Die Magischen 5 — Der tägliche Rhythmus

Jeden Tag wiederholt sich derselbe Rhythmus 5-mal:

```
1. Schritt 1: "Prüfe das Satzende"     → Geschichte-Fragment
2. Schritt 2: "Schreibe den Satz ab"   → Geschichte-Fragment
3. Schritt 3: "Kontrolliere jedes Wort" → Geschichte-Fragment
4. Schritt 4: "Unterstreiche fertigen Satz" → Geschichte-Fragment
```

Nach 5 Runden → Tag abgeschlossen.

**Wichtig:** Die Anwendung kennt die Übungssätze NICHT. Sie stehen im Heft, Arbeitsblatt oder Buch. Die App zeigt nur die Arbeitsschritte und freizuschaltendes Geschichte-Material.

---

## Komponentenstruktur

```
src/
├── App.jsx                          # Zentrale State-Verwaltung und Routing
├── App.css                          # Globale Stile (Farben, Typografie, Layout)
└── pages/
    ├── CoverPage.jsx                # Titelseite
    ├── WelcomePage.jsx              # Einführung
    ├── DayStartPage.jsx             # Tag-Start
    ├── TaskStep1Page.jsx            # Schritt 1
    ├── TaskStep2Page.jsx            # Schritt 2
    ├── TaskStep3Page.jsx            # Schritt 3
    ├── TaskStep4Page.jsx            # Schritt 4
    ├── StoryRevealPage.jsx          # Geschichte freischalten
    └── DayCompletePage.jsx          # Tag-Ende
```

---

## Benutzerfluss

```
Cover
  ↓
Welcome (Caspar & Lumi vorstellen)
  ↓
Day Start (Tag 1, Aufgabe 1)
  ↓
Task Steps 1–4 (nacheinander)
  ↓
Story Reveal (Geschichte-Fragment)
  ↓
[Wenn Round < 5: zurück zu Day Start mit Round + 1]
  ↓
[Wenn Round = 5: Day Complete]
  ↓
[Wenn Next Day: zurück zu Day Start mit Day + 1, Round = 1]
  ↓
[Wenn Fertig für heute: zurück zu Cover]
```

---

## State-Verwaltung

Die `App.jsx` verwaltet minimal:

```javascript
const [currentPage, setCurrentPage] = useState("cover");
const [currentDay, setCurrentDay] = useState(1);
const [currentRound, setCurrentRound] = useState(1);
```

- **currentPage:** Welche Seite wird gerade angezeigt?
- **currentDay:** Welcher Tag ist aktiv? (1–∞)
- **currentRound:** Welche Aufgabe am heutigen Tag? (1–5)

Keine Datenbank, keine Persistierung in V1. State wird beim Neuladen zurückgesetzt.

---

## Design-Entscheidungen

### Farben (warme, natürliche Palette)
- **Creme** (#faf8f3): Hintergrund – beruhigend, papierähnlich
- **Waldgrün** (#3d5a47): Primär-Button – ruhig, natürlich
- **Moosgrün** (#5a8565): Sekundär-Button – Variation, nicht Alarm
- **Gold** (#c9a875): Akzente, Lumi, Sternchen – Wärme, Belohnung
- **Holzbraun** (#8b7355): Lumi-Dialog-Text – organisch

### Typografie
- **Borel** (Display-Font): Überschriften – verspielt, herzlich, kindlich
- **Lora** (Serif-Body): Alle Texte – leserlich, beruhigend, zeitlos

### Layout-Prinzipien
- **Mobile-first:** Alle Seiten funktionieren perfekt auf 375 px
- **Vollständige Sicht:** Keine Seite erfordert Scrollen
- **Klare Hierarchie:** Ein Gedanke pro Seite
- **Touch-Ziele:** Buttons sind mindestens 48 px hoch

### Keine Überforderung
Das Kind sieht niemals gleichzeitig:
- Mehrere Aufgaben
- Fortschrittsbalken und Text
- Navigation und Inhalt

Immer nur **einen Gedanken**, ein **Button**.

---

## Lumi & Caspar

**Caspar:** Das Kind mit der Kamera. Er entdeckt, staunt, probiert, irrt sich, lernt.

**Lumi:** Ein ruhiger Begleiter (dargestellt als ✨). Er:
- bewertet niemals
- erklärt
- beruhigt
- macht Mut

Beide kommunizieren durch einfache, warme Dialoge. Keine Warnfenster, nur Dialog.

---

## Geschichte-Struktur

Die Geschichte wird in **5 Fragmenten pro Tag** freigeschaltet:

- Tag 1, Aufgabe 1–5: Caspar trifft Lumi, erste Abenteuer
- Tag 2, Aufgabe 1–5: Das Abenteuer vertieft sich
- (Mehr Tage später...)

Jedes Fragment ist **kurz, atmosphärisch, illustrativ**. Es erzählt mit einfachen Worten und lädt zur Vorstellung ein.

**Nicht:** Zu viel Text, Verben im Imperativ, Aufzählungen.
**Ja:** Storytelling, Sinnlichkeit, Staunen.

---

## Geplante Erweiterungen (V2+)

Diese sind absichtlich **nicht** in V1 enthalten:

- [ ] Datenbank (um Fortschritt zu speichern)
- [ ] Login / Benutzer-Management
- [ ] Eltern-/Lehrkraft-Bereich
- [ ] API / Backend
- [ ] Offline-Speicherung
- [ ] Animationen (bewusst minimal in V1)
- [ ] Audio / Sprachausgabe
- [ ] Anpassbare Schwierigkeitsstufen

---

## Designentscheidungen für Klarheit (2-Sekunden-Test)

Jede Seite folgt diesem Muster:

```
[Illustration oder Leeraum oben]
      ↓
[Überschrift + Text (1–2 Sätze)]
      ↓
[Lumi spricht (Kontext/Ermutigung)]
      ↓
[Ein großer, klarer Button]
```

Ein Kind, das 2 Sekunden auf den Bildschirm schaut, weiß sofort: Was ist das? Was mache ich jetzt?

**Beispiel:** Wenn es eine lange Erklärung gab, würde das Kind verwirrt sein. Stattdessen kurz, klar, Lumi spricht.

---

## Nächste Schritte (auf Freigabe wartend)

Nach deiner Genehmigung sind die logischen Erweiterungen:

1. **Persönliche Anpassung:** Sätze aus dem Heft hochladen / eingeben
2. **Fortschritt speichern:** Datenbank + einfaches Login
3. **Eltern-Einsicht:** Optionaler Parent-View (ohne Druck / Gamification)
4. **Erweiterte Geschichte:** Mehr Tage, verzweigte Wege basierend auf Lernpfad
5. **Feintuning:** Voice-Over, Animationen, Accessibility-Verbesserungen

---

## Technische Anmerkungen

- **Framework:** React (Vite)
- **Routing:** Einfacher State-basiertes System (kein React Router in V1)
- **Styling:** Tailwind CSS v4 + benutzerdefinierte CSS (App.css)
- **Bilder:** Statische Assets aus `/static/`
- **Datenbank:** Keine in V1
- **Build:** `npm run build` erzeugt optimierten Output in `dist/`

---

## Vision (Keep reading before every edit)

**Große Abenteuer entstehen aus vielen kleinen Schritten.**

Diese Seite ist nicht das Ende — sie ist der Anfang. Alles, was folgt, muss diese eine Maxime unterstützen.
