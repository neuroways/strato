# NeuroQuest Design System

## Vision

NeuroQuest soll sich anfühlen wie ein wunderschön illustriertes Kinderbuch, das Lernen begleitet, ohne sich jemals wie Unterricht anzufühlen. Die gesamte App antwortet immer nur auf eine Frage: **„Was ist mein nächster kleiner Schritt?"**

---

## Kernprinzipien

### 1. Weniger ist mehr
- Jede Seite zeigt genau eine Aufgabe
- Ein Hauptbutton pro Screen
- Alles andere tritt in den Hintergrund
- Keine Ablenkung, keine Überladung

### 2. Der nächste Schritt
- Die App zeigt niemals: „Was muss ich heute alles schaffen?"
- Die App zeigt immer: „Was ist mein nächster kleiner Schritt?"
- Dadurch entsteht kein Leistungsdruck
- Das Kind erlebt nur: Ruhe, Sicherheit, Neugier, Routine

### 3. Sicherheit durch Klarheit
- Das Kind muss immer genau wissen, was zu tun ist
- Keine Mehrdeutigkeiten
- Keine versteckten Funktionen
- Intuitiv sofort verständlich

---

## Farbwelt

### Primärpalette (Natur-inspiriert, warm, beruhigend)

| Element | Farbe | Hex | Bedeutung |
|---------|-------|-----|-----------|
| **Hintergrund** | Warmes Creme | `#faf8f3` | Papierseite eines Buches |
| **Primär** | Waldgrün (ruhig) | `#3d6b54` | Natürlichkeit, Wald |
| **Sekundär** | Salbeigrün | `#7d9b8d` | Sanfte Alternative |
| **Akzent** | Warmes Gold | `#d4a574` | Magie, Licht, Fortschritt |
| **Text** | Dunkles Braun | `#2d2420` | Warme Lesbarkeit |
| **Neutral** | Holzbraun | `#8b7355` | Natürliche Elemente |
| **Dezent** | Helles Grau-Braun | `#e8dcc8` | Trennlinien, Backgrounds |

### Keine Farben verwenden
- ❌ Neon
- ❌ Knalliges Rot
- ❌ Aggressive Kontraste
- ❌ Zu viel Variation
- ❌ Kalt wirkendes Blau oder Purple

### Farb-Verwendung
- **Hintergrund:** Immer das warme Creme `#faf8f3`
- **Headlines:** Waldgrün `#3d6b54`
- **Body-Text:** Dunkles Braun `#2d2420`
- **Buttons (aktiv):** Gold `#d4a574`
- **Buttons (inaktiv):** Salbeigrün `#7d9b8d`
- **Fortschritt:** Gold Akkumulation
- **Trennlinien:** Helles Grau-Braun `#e8dcc8`

---

## Typografie

### Schriftarten
- **Headlines:** Serif (warm, zeitlos) – z.B. Merriweather, Crimson Text, oder Playfair Display in 200–400 weight
- **Body-Text:** Clean Sans (lesbar) – z.B. Inter, Source Sans Pro, oder Open Sans
- **Monospace (falls nötig):** Source Code Pro

### Größen und Abstände

| Bereich | Größe | Zeilenhöhe | Margin |
|---------|-------|-----------|---------|
| **H1 (Seitentitel)** | 3rem (48px) | 1.2 | 2rem unten |
| **H2 (Abschnittstitel)** | 1.75rem (28px) | 1.3 | 1.5rem unten |
| **H3 (Untertitel)** | 1.25rem (20px) | 1.4 | 1rem unten |
| **Body (Standard)** | 1.125rem (18px) | 1.8 | 1.5rem unten |
| **Small (Hinweise)** | 0.95rem (15px) | 1.6 | 0.75rem unten |

### Text-Prinzipien
- ✅ Große, gut lesbare Schrift (mindestens 18px Body)
- ✅ Kurze Absätze (2–4 Sätze max)
- ✅ Viel vertikaler Abstand (1.8er Zeilenhöhe)
- ✅ Breites Margin (padding 2–3rem)
- ✅ Keine dekorative Schrift für Fließtext
- ✅ Text sollte auch von Leseanfängern erkannt werden
- ✅ Keine technischen Begriffe
- ✅ Warme, persönliche Ansprache

---

## Komponenten-Architektur

### Buttons
- **Größe:** Mindestens 50px Höhe (touch-freundlich)
- **Breite:** Full-width auf Mobile, max-width 300px auf Desktop
- **Padding:** 1rem vertikal, 2rem horizontal
- **Font:** 1rem, bold
- **Farbe:** Gold `#d4a574` für primär
- **Hover:** Subtile Aufhellung, slight scale (1.05)
- **Animation:** Sanfte Transition 300ms ease-out
- **Border:** Keine oder sehr subtil (1px, gleiche Farbe)

### Text-Boxen (Story-Container)
- **Background:** Weiß oder transparentes Waldgrün (sehr hell)
- **Border:** 2–3px solid Waldgrün oder Gold
- **Border-Radius:** 1.5rem (warm, nicht tech)
- **Padding:** 2rem–3rem
- **Schatten:** Subtil (0 4px 12px rgba(0,0,0,0.08))
- **Max-Width:** 600px auf Desktop

### Icons
- **Größe:** 40–60px für Haupticons
- **Stil:** Einfache, warme Emojis oder Linienzeichnungen
- **Farbe:** Waldgrün oder Gold
- **Animation:** Langsames Leuchten, nicht blinken

### Fortschritts-Anzeige
- **Nicht:** 20%, 4 von 5, Prozentbalken
- **Stattdessen:** Visuelle Elemente aus der Geschichte
  - Fünf Lichtpunkte
  - Fünf Kartenstücke
  - Fünf Sterne
  - Fünf Blätter
- **Animation:** Ein Element leuchtet nach jeder Runde auf
- **Eindruck:** Das ist Teil der Geschichte, nicht der Leistung

---

## Screen-Layout

### Startseite / Abenteuer
```
┌─────────────────────────────────┐
│    Große Illustration           │
│    (Hero-Image aus Geschichte)  │
├─────────────────────────────────┤
│                                 │
│    Persönliche Begrüßung        │
│    z.B. "Lumi wartet auf dich"  │
│                                 │
│    [Abenteuer beginnen]         │
│                                 │
└─────────────────────────────────┘
```

### Arbeitsschritt-Seite
```
┌─────────────────────────────────┐
│    Navigation (Tag 1-5)         │  ← Klein, oben, optional
├─────────────────────────────────┤
│    Tages-Titel                  │
│    "Das geheimnisvolle Zeichen" │
│                                 │
│    Kleine Illustration          │  ← Bezug zur Story
│    (relevant zu diesem Tag)      │
│                                 │
│    ─────────────────────────    │
│                                 │
│    Aktuelle Regel               │
│    "Prüfe das Satzende"        │
│                                 │
│    Kurze Erklärung              │
│    (2–3 Sätze)                  │
│                                 │
│    [Schritt erledigt]           │  ← Einziger großer Button
│                                 │
├─────────────────────────────────┤
│    Die Magischen 5             │  ← Fortschritt (unten, klein)
│    ● ● ○ ○ ○                    │
└─────────────────────────────────┘
```

### Story-Moment (Nach Schritt 5)
```
┌─────────────────────────────────┐
│                                 │
│    🌟 Moment der Freude        │
│                                 │
│    Große Illustration           │
│    (zur heutigen Story)         │
│                                 │
│    ─────────────────────────    │
│                                 │
│    Geschichtenteil              │
│    (2–4 kurze Sätze)           │
│                                 │
│    [Weiter]                     │  ← Button
│                                 │
└─────────────────────────────────┘
```

### Tagesabschluss
```
┌──────────────┬──────────────┐
│              │              │
│ Illustration │  Geschichte  │
│ des Tages    │  des Tages   │
│              │  (alle Teile)│
│              │              │
├──────────────┼──────────────┤
│  Lumi sagt:  │              │
│  "Heute bist │              │
│   du fünf    │              │
│   Schritte   │              │
│   gegangen." │              │
│              │              │
│  [Bis morgen]               │
│              │              │
└──────────────┴──────────────┘
```

---

## Animationen & Übergänge

### Prinzipien
- ✅ Alle Animationen dienen der Beruhigung
- ✅ Langsam (0,8–1,5 Sekunden)
- ✅ Easing: ease-out, ease-in-out
- ❌ Nichts Hektisches, Springendes, Blinkendes
- ❌ Keine Feuerwerk-, Konfetti-, Explosionseffekte

### Spezifische Animationen

| Effekt | Dauer | Easing | Wann |
|--------|-------|--------|------|
| **Fade In** | 0.8s | ease-out | Beim ersten Laden |
| **Slide Up** | 0.8s | ease-out | Text erscheint |
| **Glow** | 1.2s | ease-in-out | Stern/Licht wird aktiv |
| **Subtle Scale** | 0.3s | ease-out | Button Hover |
| **Sanfter Übergang** | 1.0s | ease-in-out | Zwischen Screens |
| **Leichte Bewegung** | 2.0s | ease-in-out (loop) | Blätter, Sterne atmen |

### Übergang nach Schritt-Abschluss
1. Bildschirm dunkelt leicht ab (0.3s)
2. Ein Licht/Stern leuchtet auf (0.8s)
3. Ein Element der Illustration wird aktiv
4. Nach 1s öffnet sich sanft die nächste Seite (slide-up, fade-in)
5. Geschichte wird sichtbar

---

## Navigation & Struktur

### Haupt-Navigation (Unten, immer sichtbar)
```
🏡 Abenteuer    📖 Geschichte    ⚙️ Einstellungen
```
- Nur 3 Punkte (nicht mehr)
- Klein, unauffällig, unten oder seitlich
- Keine lange Menüs

### Kind-freundliche Navigation
- Keine technischen Begriffe
- Icons + einfache Labels
- Große Touch-Ziele (mindestens 44px)
- Klare aktive/inaktive States

### Tages-Navigation (Optional, oben)
- Tasten 1-5 zum Springen
- Pfeile für vorherig/nächst
- Aber: NICHT ablenkend
- Eher für Pädagogen/Eltern

---

## Responsive Design

### Breakpoints
- **Mobile:** 375px–768px (Portrait)
- **Tablet:** 768px–1024px
- **Desktop:** 1024px+

### Mobile-First Approach
- Alles beginnt mit 375px Breite
- Stack vertikal
- Touch-friendly (große Buttons, große Schrift)
- Kein Horizontal-Scrolling

### Tablet/Desktop
- Max-width: 600–700px für Text-Container
- Zwei-Spalten Layout möglich (z.B. Tagesabschluss)
- Aber immer noch lesbar und ruhig

---

## Barrierefreiheit (für alle, nicht speziell)

### Kontraste
- ✅ WCAG AA Standard (mindestens 4.5:1)
- ✅ Große Schrift (mindestens 18px)
- ✅ Klare Kontraste ohne Aggressivität

### Interaktion
- ✅ Große Buttons (mindestens 50px Höhe)
- ✅ Klare Focus-States (bei Tastaturnavigation)
- ✅ Keine versteckten Funktionen
- ✅ Nur eine Aufgabe gleichzeitig

### Verständlichkeit
- ✅ Einfache, kurze Sätze
- ✅ Keine technischen Begriffe
- ✅ Klare, warme Ansprache
- ✅ Keine Überraschungen oder Tricks

### ADHD / Autismus / Leseanfänger
Die App hilft natürlich durch ihre Struktur:
- Nur eine Aufgabe = weniger Reizüberflutung
- Visuelle Fortschritts-Anzeige = kein Textlesen nötig
- Vorhersehbare Struktur = Sicherheit
- Warme Illustrationen = beruhigender

---

## Charaktere

Die beiden Protagonisten sind zentral für die emotionale Anbindung. Sie erscheinen konsequent im Design und in der Geschichte.

### Caspar
- **Alter:** Grundschul-Alter (~8–10 Jahre)
- **Aussehen:** Neugieriger Junge mit Brille, warmbraune Haare, freundliche Augen
- **Ausstrahlung:** Aufmerksam, manchmal unsicher, aber immer bereit weiterzumachen
- **Kleidung:** Praktisch und gemütlich (blauer Hoodie, Cargohose, feste Schuhe)
- **Emotionen:** Zeigt verschiedene Ausdrücke (neugierig, konzentriert, überrascht, erfreut)
- **Bedeutung:** Andere Kinder sollen sich mit ihm identifizieren – er ist nicht perfekt, stellt Fragen, macht Fehler, lernt

### Lumi (auch August genannt)
- **Wesen:** Kleines, zartes Lichtwesen – ethereal, nicht realistisch
- **Aussehen:** Golden leuchtend, mit sanften Gesichtszügen, warmer Ausstrahlung
- **Größe:** Ungefähr Daumengröße, schwebt statt zu gehen
- **Farben:** Warmes Gold, helles Creme, manchmal grüner Schal
- **Emotionen:** Immer ruhig und geduldig, ermutigend, liebevoll
- **Bedeutung:** Verkörpert Geduld, Sanftheit und die Begleitung ohne Bewertung

### Visuelle Integration der Charaktere
- **Startseite:** Lumi in voller Größe, Caspar mit Lumi im Hintergrund
- **Arbeitsschritt-Seite:** Kleine Caspar-Illustration oben, zeigt den aktuellen Moment
- **Story-Moment:** Caspar und Lumi zusammen, illustrieren die Geschichte
- **Tagesabschluss:** Beide Charaktere in der Illustration des Tages-Abenteuers
- **Weg-Motivationen:** Caspar sitzt neben Lumi, beide schauen in die gleiche Richtung

### Ausdruck-Varianten
Caspar zeigt verschiedene emotionale Zustände:
- Neugierig (Augen groß, aufmerksam)
- Konzentriert (leicht zusammengezogene Augenbrauen, fokussiert)
- Überrascht (erfreut, überraschter Ausdruck)
- Erleichtert (lächelnd nach erfolgtem Schritt)
- Unsicher (nachdenklich, fragend)

Lumi ändert seine Helligkeit und Pose:
- Ruhig (sanftes Leuchten)
- Ermutigend (helles, warmes Glühen)
- Konzentriert (intensiveres Licht)
- Froh (pulsierendes, warmes Glühen)

---

## Illustration & Visuals

### Hauptillustration
- **Größe:** Mindestens 50–60% des Screens oben
- **Stil:** Warm, natürlich, hochwertig – wie ein Kinderbuch-Illustration
- **Emotion:** Wunder, Sicherheit, Neugier (nicht Aufregung)
- **Inhalt:** Wald-Szenen mit Caspar und Lumi als Protagonisten
- **Charaktere:** Beide Charaktere integriert, nicht nebeneinander, sondern Teil der Szenerie

### Illustrationsstile pro Seite
- **Arbeitsschritte:** Caspar im Fokus, zeigt die aktuelle Handlung
- **Story-Momente:** Caspar und Lumi gemeinsam, erleben gerade die Geschichte
- **Übergänge:** Lumi leuchtet heller auf, um den Übergang zu markieren
- **Tagesabschluss:** Volle Illustration beider Charaktere in der Tagesszene

### Fortschritts-Visualisierung
Statt prozentuale Anzeige:
- Fünf leuchtende Punkte (einer wird nach jeder Runde aktiv)
- Oder: Fünf Sterne (wachsen an Helligkeit)
- Oder: Fünf Blätter (färben sich golden)
- Oder: Ein Stern (wird mit jeder Runde heller)

### Icons & Symbole
- Einfache, warme Emojis
- Oder: Linienzeichnungen (2–3px Strich)
- Farbe: Waldgrün oder Gold
- Nie: Aggressiv, laut, blinkend

---

## Ton & Stimme

### Sprache
- ✅ Warm, persönlich, liebevoll
- ✅ Kurze Sätze
- ✅ Keine technischen Begriffe
- ✅ Keine Bewertungen
- ✅ Lob der Anstrengung, nicht des Ergebnisses

### Beispiel-Texte
- ❌ "Super gemacht!" → ✅ "Schön, dass du hingeschaut hast."
- ❌ "100% richtig!" → ✅ "Manchmal entdeckt man etwas erst später."
- ❌ "Du schaffst es!" → ✅ "Jeder kleine Schritt bringt uns weiter."
- ❌ "Fehler!" → ✅ "Das gehört zum Lernen dazu."

---

## Zukunfts-Features (nicht jetzt, aber im Designkonzept)

### Später möglich
- **Sounds:** Nur ruhige Natur-Geräusche (Wind, Vögel, Blätter, leises Glockenspiel)
- **Mehrsprachigkeit:** Alle UI-Texte stringifizieren
- **Dark Mode:** Optional (aber nicht Standard)
- **Eltern-Übersicht:** Separat, nicht in der Kind-View

---

## Charakter-Integrationsbeispiele

### Startseite
```
┌─────────────────────────────────┐
│    Lumi allein, leuchtend       │
│    (groß, in der Mitte)         │
│                                 │
│    Im Hintergrund leicht:       │
│    Caspar sitzt und schaut zu   │
│                                 │
│    "Lumi wartet auf dich"       │
│                                 │
│    [Abenteuer beginnen]         │
└─────────────────────────────────┘
```

### Arbeitsschritt
```
┌─────────────────────────────────┐
│    Caspar konzentriert,         │
│    Lumi schwebt neben ihm       │
│    beide in Mini-Form oben      │
│                                 │
│    "Prüfe das Satzende"         │
│    [Schritt erledigt]           │
└─────────────────────────────────┘
```

### Story-Moment (nach Schritt 5)
```
┌─────────────────────────────────┐
│    Caspar und Lumi              │
│    erleben gemeinsam die        │
│    Geschichte – in Illustration │
│    eingebettet (z.B. im Wald)   │
│                                 │
│    "Ein kleines Licht flackerte │
│     in der Nacht auf..."        │
│                                 │
│    [Weiter]                     │
└─────────────────────────────────┘
```

### Tagesabschluss
```
┌──────────────┬──────────────┐
│              │              │
│  Caspar und  │  Geschichte  │
│  Lumi sitzen │  des Tages   │
│  zusammen im │  (alle Teile)│
│  Wald        │              │
│              │              │
│  Lumi sagt:  │              │
│  "Heute bist │              │
│   du fünf    │              │
│   Schritte   │              │
│   gegangen." │              │
│              │              │
│  [Bis morgen]               │
└──────────────┴──────────────┘
```

---

## Implementation Checklist

- [ ] Farbvariablen in Tailwind Config setzen ✓
- [ ] Typografie-Scale definieren ✓
- [ ] Button-Komponenten styles
- [ ] Story-Container-Styles
- [ ] Animationen als CSS-Keyframes oder Transitions ✓
- [ ] Illustrations in `/static/` platzieren ✓
- [ ] Charakter-Illustrationen bereit (Caspar & Lumi)
- [ ] Responsive Breakpoints testen (375/768/1024)
- [ ] Kontraste überprüfen (WCAG)
- [ ] Touch-Ziele messen (mindestens 44–50px)
- [ ] Ladezeiten optimieren
- [ ] Alle Seiten im Hellmodus testen
- [ ] Mobile-first Approach durchgehend
- [ ] Caspar- und Lumi-Ausdrücke konsistent einsetzen
