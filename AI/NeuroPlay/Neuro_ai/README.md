# NeuroQuest – Ein interaktives Schreib-Lern-Abenteuer für Grundschulkinder

**NeuroQuest** ist eine Webapplikation, die Kindern hilft, strukturiert schreiben zu lernen — durch 5 Tage à 5 Runden à 5 Übungsschritte, bei denen jeder Schritt ein Segment einer wachsenden Geschichte freischaltet.

Statt Gamification und Punkten gibt es eine beruhigende Geschichte mit zwei Charakteren: **Caspar** (ein mutiger Junge) und **Lumi** (ein Waldgeist mit Licht), die gemeinsam einen geheimnisvollen Wald erkunden.

## 🎯 Funktionsweise

1. **Kind startet Tag 1** → sieht Tagesbild + Intro-Text
2. **Für jeden der 5 Schritte:**
   - Schritt erklären (z.B. "Prüfe das Satzende")
   - Kind arbeitet (Button "Fertig")
   - Geschichte-Segment als Belohnung freischalten
3. **Nach 5 Runden** → Tagesgeschichte komplett sichtbar
4. **Nach Tag 5** → Alle 25 Segmente gelesen, neue Story-Auswahl (zukünftig)

## 🚀 Installation & Start

### Entwicklung
```bash
cd app
npm run dev
```
App öffnet sich unter `http://localhost:5173` mit Live-Reload bei Datei-Änderungen.

### Production Build
```bash
cd app
npm run build:prod
```
Output in `dist/` — deployment-ready.

### Preview (nach Build)
```bash
npm run preview
```

## 📁 Projektstruktur

```
app/
├── src/
│   ├── App.jsx                    # Hauptkomponente & State-Management
│   ├── screens.js                 # Navigation-Logik (ZENTRAL!)
│   ├── story.js                   # 25 Geschichten-Segmente
│   ├── screens/                   # 6 Bildschirm-Komponenten
│   │   ├── DayTitleScreen.jsx
│   │   ├── StepExplainScreen.jsx
│   │   ├── StepWorkScreen.jsx
│   │   ├── StepStoryScreen.jsx
│   │   ├── DayCompleteScreen.jsx
│   │   └── AllCompleteScreen.jsx
│   └── ...weitere Komponenten
├── dist/                          # Production Build (nach npm run build:prod)
├── index.html                     # HTML Template
├── tailwind.config.cjs            # Design-Token (Farben, Typografie)
├── vite.config.js                 # Build-Konfiguration
└── package.json                   # (Dependencies: alle platform-provided)
```

## 🎨 Design

- **Farben:** Warm, beruhigend (Creme-Waldinspiriert)
- **Typografie:** Groß und kinderfreundlich
- **Responsive:** Funktioniert perfekt auf Handy, Tablet, Desktop (375px–1280px)
- **Keine Gamification:** Fokus auf Geschichte, nicht auf Punkte/Sterne

Siehe `tailwind.config.cjs` für alle Custom Colors (`nq-cream`, `nq-forest`, usw.).

## 📚 Tech Stack

- **React 19** — Komponenten & State-Management
- **Vite 6.4** — Build & Dev Server
- **Tailwind CSS v4** — Styling
- **Vanilla JavaScript ES6+** — Logik

**Keine externen npm-Dependencies** — alles Platform-Provided für schnelle Deployments.

## 🔄 Navigation & State

Zentrale Zustandsmaschine in `src/screens.js`:

```
DAY_TITLE → STEP_EXPLAIN → STEP_WORK → STEP_STORY
                                          ↓
                                     (nach Schritt 4)
                                          ↓
                                    nächste Runde oder
                                    DAY_COMPLETE (nach 5 Runden)
                                          ↓
                                    nächster Tag oder
                                    ALL_DAYS_COMPLETE (nach Tag 5)
```

## 📖 Story-Inhalt

25 Geschichten-Segmente über 5 Tage in `src/story.js`:

| Tag | Titel | Thema |
|---|---|---|
| 1 | Der Waldpfad | Caspar trifft Lumi |
| 2 | Die Lichtspur | Lumi zeigt ihren Weg |
| 3 | Der weiße Hirsch | Gemeinsame Suche |
| 4 | Die Waldlichtung | Vertrauenserlebnis |
| 5 | Der Neubeginn | Rückkehr mit Zuversicht |

Jeder Tag: 5 Runden × 5 Schritte = 25 Story-Segmente total.

## ⚠️ Bekannte Einschränkungen

1. **Keine Persistierung** — Fortschritt wird nicht gespeichert (zukünftig: localStorage/PocketBase)
2. **SVG-Platzhalter** — Echte Illustrationen müssen noch erstellt werden
3. **Keine Tests** — Manuelles Testing nur

## 🎯 Nächste Schritte

1. **User-Testing** mit echten Grundschulkindern
2. **Echte Illustrationen** erstellen
3. **Persistierung** implementieren (localStorage/Cloud)
4. **Weitere Geschichten** hinzufügen (Story-Packs)

## 📖 Weitere Dokumentation

Siehe [docs/handover/PROJECT_HANDOVER.md](docs/handover/PROJECT_HANDOVER.md) für **vollständige Projektübergabe**, Architektur, Entscheidungen, offene Fragen.

## 📄 Lizenz

Internes Projekt. Nicht öffentlich freigegeben.

---

**Letzte Aktualisierung:** 15. August 2026  
**Status:** Beta – Funktionsfähig, produktionsreif nach User-Testing  
**Repository:** https://github.com/neuroways/Neuro_ai
