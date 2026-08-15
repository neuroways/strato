# NeuroPlay – Masterprompt für Projektkontext

**Version:** 1.0 | **Stand:** August 2026 | **Sprache:** Deutsch  
**GitHub:** git@github.com:neuroways/NeuroPlay_AI.git (Branch: `dev`)

---

## 🎯 Was ist NeuroPlay?

Eine Web-App, die neurodivergente Menschen hilft, die richtige Aktivität für ihre aktuelle Situation zu finden – **ohne Diagnose, ohne Bewertung, ohne Pathologisierung**. Stattdessen: *Beobachtung → Reflexion → Möglichkeiten*.

**Leitphilosophie:** Menschen sind nicht „schlecht in Fokus" – sie haben nur in bestimmten Situationen herausgefunden, welche Umgebung ihnen hilft. NeuroPlay merkt sich das.

---

## 📊 Aktueller Entwicklungsstand

### ✅ Fertig (Produktion Ready)

#### **Datenbankarchitektur**
- **63 Tabellen** über 7 Domänen (Multi-Tenancy, Aktivitätswissen, Personendaten, Sitzungen, Empfehlungen, System)
- **3 SQL-Varianten:** MySQL (915Z), SQLite (771Z), PostgreSQL-ready
- **Testdaten:** 3 realistische Szenarien mit Beobachtungen & Auswirkungen
- **Dateien:** `neuroplay_v2_schema.sql`, `neuroplay_v2_testdata.sql`, SQLite-Varianten
- **Status:** Vollständig dokumentiert in `README_NEUROPLAY.md`

#### **Frontend-Struktur (React + Vite + Tailwind)**
- **7 Hauptseiten** (je eine Route):
  1. **Heute** – Check-in (Bedarf, Energielevel, Zeit, Sozialkontext) → intelligente Empfehlung + 3 Alternativen → Fokus-Modus
  2. **Entdecken** – Aktivitätskatalog mit Filtern (Zeit, Energie, Personenzahl)
  3. **Aktivitätsdetail** – 6 Reiter (Überblick, Passt zu mir, Lernen, Ablauf, Wirkung, Quellen)
  4. **Coach** – 6 geführte Lernpfade mit 3 Erklärungsebenen (Was–Warum–Möglichkeiten)
  5. **Meine Aktivitäten** – Favoriten, Lernstand, Besitz
  6. **Entwicklung** – Zeitstrahl der Beobachtungen + erkannte Muster (mit Unsicherheitsangabe)
  7. **Mehr** – Haushalt, Gruppen, Freigaben, Datenschutz

- **Navigation:** 6-Element-Navbar (unten auf Mobile, oben auf Desktop), bleibt immer sichtbar
- **Responsive Design:** 375px (Mobile), 768px (Tablet), 1280px (Desktop) – alle Layouts getestet
- **Farbpalette:** Deep Navy (#1a2f4d), Gold (#d4a574), Petrol (#2c5f7f), Violet (#7d5a8f) – NeuroWays-Brand
- **Code:** ~2.082 Zeilen React über 13 Komponenten + 7 Pages

#### **Interface Standard (NW-PLAY-UI-001 v0.1.0)**
- 29-teilige Spezifikation abgedeckt (Sections 1–25 + Definition of Done)
- Philosophie, Info-Architektur, Seitenfluss, Komponenten-Standards, Accessibility (WCAG 2.2 AA Ziel), Datenschutz (Privacy by Default)
- **Status:** Alle Seiten nach Spec gebaut + visuell implementiert

#### **Datenbankanbindung (Hybrid-Ansatz)**
- **PocketBase** (Admin-Panel, Auth): Collections `users` angelegt
- **SQLite lokal:** 6 Aktivitäten + Beobachtungs-/Favoriten-Speicher (`neuroplay_activities.db`)
- **Hooks:** `useActivities`, `useObservations`, `useFavorites` (auf Abruf bereit)

#### **Git-Repository**
- Remote: `github.com/neuroways/NeuroPlay_AI` (Branch `dev`)
- 20 Commits mit aussagekräftigen Messages (von Schema über Dashboards bis Datenbank-Integration)
- Alle SQL-Dateien, Frontend-Code, Dokumentation gesichert

---

### ⏳ In Arbeit / Blockiert

#### **Sammlungen im Admin-Panel**
- **Problem:** PocketBase Admin-Panel erlaubt GUI-Anlegen nicht (nur Datensatz-Hinzufügen sichtbar)
- **Workaround aktiv:** SQLite `neuroplay_activities.db` mit 6 Aktivitäten lokal gebaut
- **Nächster Schritt:** Entweder PocketBase Collections per Script anlegen ODER SQLite dauerhaft nutzen
- **Status:** 🟡 Blockiert (UI-Limitation)

#### **Datenbankverbindung Frontend ↔️ Backend**
- **Heute-Seite:** Mock-Empfehlungen. Needs: Speichern echter Check-ins + Abruf aus DB
- **Entdecken-Seite:** Lädt jetzt lokal aus SQLite, funktioniert ✅
- **Sammlung-Seite:** Favoriten-Toggle greift auf DB zu, aber keine Persistierung
- **Entwicklung-Seite:** Zeigt Mock-Timeline. Needs: Beobachtungen aus DB laden & Muster erkennen
- **Status:** 🟡 Teilweise (Entdecken funktioniert, Rest Mock)

#### **Authentifizierung & Multi-User**
- **Aktuell:** Keine User-Login (anonymes Browsing)
- **Requirements:** Signup/Login per Email, rollenbasierte Zugriffe, Private-by-Default für Personendaten
- **PocketBase:** Hat Auth-System, aber nicht konfiguriert
- **Status:** 🔴 Nicht gestartet

#### **Coach-Seite Funktionalität**
- **Design:** Komplett gebaut (6 Lernpfade mit Expand/Collapse)
- **Daten:** Hardcoded Inhalte. Needs: Aus DB laden, User-Progress tracken
- **Status:** 🟡 UI fertig, Backend offen

#### **Meine Aktivitäten & Gruppenverwaltung**
- **Design:** Seiten vorhanden
- **Funktionalität:** Mock-Daten. Needs: Favoriten-System, Besitz-Track, Gruppenmitgliedschaften aus DB laden
- **Status:** 🟡 UI fertig, Backend offen

---

## 🗂️ Dateistruktur

```
app/
├── src/
│   ├── App.jsx                           (47Z, 7 Routes definiert)
│   ├── main.jsx                          (Entry Point)
│   ├── index.css                         (Tailwind Directives)
│   ├── pages/
│   │   ├── HeutePage.jsx                 (Check-in + Empfehlung)
│   │   ├── EntdeckenPage.jsx             (Aktivitätskatalog mit Filtern)
│   │   ├── ActivityDetailPage.jsx        (6 Reiter für jede Aktivität)
│   │   ├── CoachPage.jsx                 (6 Lernpfade)
│   │   ├── MeineAktivitaetenPage.jsx     (Favoriten & Lernstand)
│   │   ├── EntwicklungPage.jsx           (Beobachtungszeitstrahl)
│   │   └── MehrPage.jsx                  (Haushalt, Gruppen, Datenschutz)
│   └── components/
│       ├── Navigation.jsx                (6-Element-Navbar)
│       ├── ActivityCard.jsx              (Aktivitäten-Kartenelement)
│       ├── RecommendationCard.jsx        (Empfehlungs-Display)
│       └── [weitere Komponenten]
├── neuroplay_v2_schema.sql               (MySQL, 915Z, 63 Tabellen)
├── neuroplay_v2_testdata.sql             (Testdaten)
├── neuroplay_v2_schema_sqlite.sql        (SQLite-Version)
├── neuroplay_activities.db               (SQLite Datenbank, lokal)
├── README_NEUROPLAY.md                   (DB-Setup-Anleitung)
├── SETUP_POCKETBASE.md                   (PocketBase-Integration How-To)
├── NeuroPlay_Datenbankarchitektur.md     (v1.0 Designdokumentation)
├── NeuroPlay_Erweiterte_Architektur_Teil1-3.md (Extended Specs)
├── AGENTS.md                             (Tech-Stack & Patterns)
├── package.json                          (Abhängigkeiten: nur built-ins)
├── tailwind.config.cjs                   (Tailwind-Config mit NeuroWays-Farben)
├── vite.config.js                        (Vite-Konfiguration)
└── dist/                                 (Build-Output, produktiv)
```

**14 .md-Dateien:** Dokumentation für Datenbank, Setup, Architektur, Anleitung

---

## 🔗 Verbindungen & Abhängigkeiten

### Frontend ↔️ Datenbank

**Aktuell:**
- **PocketBase:** Admin-Panel unter `http://localhost/.sfs-bd/_/`
  - Collections: `users` (angelegt)
  - Geplant: `activities`, `observations`, `favorites`, `activity_sessions`
  
- **SQLite:** `neuroplay_activities.db` (lokal)
  - 6 Aktivitäten (Häkeln, Dorfromantik, Café del Gatto, Spaziergang, Puzzle, Lesen)
  - Lese-Zugriff funktioniert, Schreib-Zugriff (Favoriten, Beobachtungen) vorbereitet

**Fehlende Verbindungen:**
- `HeutePage` speichert Check-ins nicht persistent
- `EntwicklungPage` lädt Beobachtungen nicht aus DB
- `MeineAktivitaetenPage` hat keine Favoriten-Persistierung
- Coach-Seite trackt User-Progress nicht

### Design System

- **Farben:** Tailwind Config mit NeuroWays-Palette
- **Typefaces:** Google Fonts (Fraunces, Karla) via `/.sfs/css2`
- **Komponenten:** Wiederverwendbare React-Komponenten für Cards, Navigation, Scale-Selector

### Build & Deployment

- **Dev:** `npm run dev` → Vite Dev-Server mit Hot Reload
- **Build:** `npm run build` → Production Build zu `/dist/`
- **Deploy:** Push zu `dev` Branch → Automatisch auf `ai-builder.strato.de` live

---

## 📋 Was noch zu tun ist (Priorität)

### 🔴 **P0 – Blockierend für MVP**

1. **PocketBase Collections anlegbar machen**
   - Entweder: Admin-UI-Problem lösen (bekommt man hin?)
   - Oder: Komplett auf SQLite umsteigen (einfacher, lokal schneller)
   - **Aufwand:** 1–2h
   - **Entscheidung nötig:** Was ist das zielgerichtete Setup?

2. **Datenbank-Hooks in allen Seiten aktivieren**
   - `HeutePage`: Check-ins speichern (`useCheckins` Hook)
   - `EntwicklungPage`: Beobachtungen laden & Muster erkennen (`useObservations`)
   - `MeineAktivitaetenPage`: Favoriten mit Persistierung (`useFavorites`)
   - **Aufwand:** 3–4h
   - **Tests nötig:** Daten bleiben nach Reload erhalten

3. **Authentifizierung minimal**
   - Email-Signup / einfacher Login (kein Social-Auth für MVP)
   - Private Sammlung: Jeder User sieht nur seine Daten
   - **Aufwand:** 2–3h (wenn PocketBase Auth nutzbar ist)

### 🟡 **P1 – MVP-relevant, nicht blockierend**

4. **Coach-Seite mit echten Daten**
   - 6 Lernpfade aus DB laden
   - User-Progress speichern (welche Section wurde aufgeklappt?)
   - **Aufwand:** 2–3h

5. **Entwicklung-Seite: Musteranalyse**
   - Beobachtungen gruppieren nach Thema (z.B. „In Stresssituationen hilft…")
   - Unsicherheitsangaben berechnen
   - Timeline rendering
   - **Aufwand:** 2–3h

6. **Favoriten-System vollständig**
   - Toggle in Activity-Detail + Entdecken
   - In Meine-Aktivitäten anzeigen
   - Als Basis für Empfehlungen nutzen
   - **Aufwand:** 1–2h

### 🟢 **P2 – Polish & Future**

7. **Mehr Aktivitäten hinzufügen** (User-Content oder Seed-Daten)
   - DB ist auf 1.000+ Aktivitäten ausgelegt
   - Kategorien: Musik, Bewegung, Kreativität, Sozial, Kognitiv
   - **Aufwand:** 1h (Daten) + 1h (Testing)

8. **Admin-Interface**
   - Aktivitäten verwalten (CRUD)
   - User-Stats sehen
   - **Aufwand:** 4–6h (später Phase)

9. **Accessibility Audit**
   - WCAG 2.2 AA Compliance check
   - Screen-Reader Testing
   - Keyboard-Navigation überall
   - **Aufwand:** 2–3h

10. **Mehrsprachigkeit (i18n)**
    - `de_DE`, `en_US`, optional `fr_FR`
    - Übersetzungen aus DB oder JSON
    - **Aufwand:** 2–4h (abhängig von Umfang)

---

## 🛠️ Technologie-Stack (Immutable)

- **React 19** (latest stable) – via Vite Plugin
- **Vite 5** – Dev + Build
- **Tailwind CSS v4** – Styling
- **Lucide React** – Icons (`import Name from "icon:kebab-name"`)
- **React Router v6** – Client-seitige Navigation
- **PocketBase** – Backend (optional, momentan nur Admin-Panel)
- **SQLite** – Lokale Datenbank (aktuell nutzen wir diese)
- **Node.js 24** – Runtime für Build
- **Google Fonts** (Fraunces, Karla) – Typefaces

**Keine neuen Packages:** Alles ist bereits im System oder in `package.json` (derzeit leer, weil Platform-provided).

---

## 💡 Wichtige Patterns & Conventions

### React Component Struktur
```jsx
export default function ComponentName() {
  const [state, setState] = useState(initialValue);
  
  return (
    <div className="...">
      {/* content */}
    </div>
  );
}
```

### Tailwind + Mobile-First
- **375px:** Base styles (Mobile)
- **768px:** `md:` prefix
- **1280px:** `lg:` prefix

### Datenbank-Zugriffe
```jsx
// Hook Pattern (zu implementieren)
const { data, loading, error } = useActivities();
// Automatisch aus DB laden, Cache-ready
```

### Farben (TailwindConfig)
```js
colors: {
  'neuroplay-navy': '#1a2f4d',
  'neuroplay-gold': '#d4a574',
  'neuroplay-petrol': '#2c5f7f',
  'neuroplay-violet': '#7d5a8f',
}
```

---

## 📝 Nutzungs-Anleitung für KI-Context

**Wie nutzt eine KI diesen Prompt?**

1. **Projekt verstehen:** Lesen Sie **"Was ist NeuroPlay?"** + **"Aktueller Entwicklungsstand"**
2. **Code-Basis sehen:** Studieren Sie `src/App.jsx` und eine beispiel-Page (z.B. `HeutePage.jsx`)
3. **Datenbank-Schema:** `README_NEUROPLAY.md` oder `neuroplay_v2_schema_sqlite.sql`
4. **Aufgabe klar?** Siehe **"Was noch zu tun ist"** – P0 vor P1 vor P2
5. **Git-Context:** Branch ist `dev`, Remote ist GitHub `neuroways/NeuroPlay_AI`

**Bei jeder neuen Aufgabe:**
- `git pull origin dev` (aktuell machen)
- Code-Änderung in einer Komponente oder Page
- `npm run dev` lokal testen (if possible)
- `npm run build` vor commit
- `git commit -m "feat: Beschreibung in Deutsch"` (aussagekräftig)
- `git push origin dev`

**Blockierungen melden:**
- „Datenbank-Struktur nicht angebunden" → Siehe P0-1
- „Admin-Panel UI nicht erreichbar" → Siehe P0-1
- „Authentifizierung nötig" → Siehe P0-3

---

## 🎨 Brand & Philosophie

**NeuroWays × NeuroPlay:**
- **Warm, nicht klinisch.** „Du hast beobachtet…" statt „Dein ADHS Profile ist…"
- **Neugierde, nicht Diagnose.** Aktivitäten als Experimente, nicht Therapie
- **Kontrolle beim User.** Vorschläge, keine Vorgaben. Beobachtungen abzulehnen ist OK
- **Minimalistische UI.** Großzügiger Weißraum, keine Überreizung, Focus-Modus für sensitive Nutzer
- **Privacy by Default.** Alle persönlichen Daten privat, explizites Teilen über Gruppen/Haushalte

---

**Dieser Prompt sollte bei jeder neuen KI-Session geladen werden.** Er ersetzt Kontextsammlungen und gibt einer neuen KI sofort alle notwendigen Informationen, um produktiv zu werden.

---

**Letzte Aktualisierung:** 15.08.2026 | **Nächste Überprüfung:** Nach P0-Abschluss
