# NW-DS-006 — NeuroWays Component System

**Dokumentcode:** NW-DS-006  
**Version:** 1.0.0  
**Status:** draft  
**Veröffentlicht:** –  
**Gültig ab:** nach Freigabe  
**Verantwortlich:** NeuroWays Design Core

---

## Hinweis

Das Komponenten-System ist aus der bestehenden App-Implementierung und den Designboard-Farbregeln abgeleitet. Es existiert noch kein dediziertes Komponenten-Designboard. Die hier beschriebenen Regeln konsolidieren den aktuellen Stand.

---

## Kapitel 0 — AnswerCard (erste implementierte Komponente)

**Status: implementiert** — `src/components/AnswerCard.jsx`

### Zweck

Wiederverwendbare Antwortkarte für alle NeuroWays-Fragebogen-Methoden. Verwendet in: Energy Navigator Check-in.

### Props

| Prop | Typ | Beschreibung |
|------|-----|-------------|
| `icon` | string | Symbol-Bezeichner: `zap`, `leaf`, `waves`, `battery-low`, `battery-empty` |
| `accentColor` | string | CSS-Farbe für Rahmen, Icon-Strich und Ausgewählt-Zustand |
| `backgroundColor` | string | Pastell-Hintergrund des Icon-Kreises (inaktiv) |
| `label` | string | Anzeigetext der Antwort |
| `selected` | bool | Ob diese Option aktuell gewählt ist |
| `onClick` | fn | Auswahl-Handler |
| `ariaLabel` | string | Optionaler aria-label-Override |

### Energiestufen-Voreinstellungen (ENERGY_ICON_PRESETS)

| Wert (1–5) | Icon | Farbe | Bedeutung |
|-----------|------|-------|-----------|
| 1 | Blitz (zap) | Türkis #008CA8 | Sehr viel Energie |
| 2 | Blatt (leaf) | Grün #4caf7d | Ausreichend Energie |
| 3 | Welle (waves) | Gold #E2A83B | Wenig Energie |
| 4 | Batterie halb (battery-low) | Orange #e07a30 | Kaum Energie |
| 5 | Batterie leer (battery) | Rot #c0392b | Keine Energie |

### Designregeln

- Runder Icon-Hintergrund (40×40 px, 50 % Radius)
- Outline-Icons, Strichstärke 1.8, Größe 18 px
- Übergang: 170 ms ease für Rahmen, Hintergrund, Farbe
- Ausgewählt: Rahmen in Akzentfarbe + Halo (box-shadow 3 px, 12 % Deckkraft) + Häkchen-Indikator
- Kein Springen, keine verspielten Effekte
- Icon + Text + Häkchen: dreifache Unterscheidung ohne Farbe (Accessibility)

### Erweiterungsregel

Neue Methoden können eigene `preset`-Maps bereitstellen und dieselbe `AnswerCard`-Komponente verwenden. Kein neuer Komponenten-Typ erforderlich.

---

## Kapitel 1 — Buttons

### Primär
- Hintergrund: Deep Navy (#0A1F44) oder Teal (#008CA8)
- Text: Weiß (#FFFFFF)
- Radius: 10–12 px
- Padding: 14–16 px vertikal, 24–32 px horizontal
- Mindest-Tap-Target: 44 px

### Sekundär
- Hintergrund: transparent
- Rahmen: 1.5 px Deep Navy
- Text: Deep Navy
- Hover: leichter Navy-Hintergrund (8 % Deckkraft)

### Destruktiv
- Hintergrund: transparent oder Rot-Ton
- Text: Rot (#DC2626 oder ähnlich)
- Nur für unwiderrufliche Aktionen

### Regel
Buttons verwenden niemals den Farbverlauf als Hintergrund. Der Verlauf ist ausschließlich der Markenlinie vorbehalten.

---

## Kapitel 2 — Cards

- Hintergrund: Weiß oder Warm White (#F8F7F3)
- Rahmen: 1 px Light Gray (#E5E5E5)
- Radius: 12–16 px
- Schatten: sehr dezent (max. 0 2px 8px rgba(0,0,0,0.06))
- Padding: 20–24 px innen

### Zonencard (Energy Navigator)
- Hintergrund: Zonenfarbe mit 10–15 % Deckkraft
- Rahmen: Zonenfarbe mit 30 % Deckkraft
- Radius: 24 px (großzügiger, weil Ergebnis-Element)

---

## Kapitel 3 — Formulare

- Rahmen: 1.5 px Light Gray, bei Fokus Teal (#008CA8)
- Radius: 10 px
- Beschriftung: 13 px, SemiBold, Versalien, Gray
- Fehlerzustand: Rahmen Rot, Fehlermeldung darunter

---

## Kapitel 4 — Navigation

### Desktop (Top Bar)
- Hintergrund: Weiß
- Rahmen: 1 px Light Gray unten
- Logo links, Links rechts
- Aktiver Link: Teal-Ton Hintergrund, Teal Text

### Mobil (Bottom Bar)
- Position: fixiert, unten
- Hintergrund: Weiß
- Rahmen: 1 px Light Gray oben
- 4–5 Elemente gleichmäßig verteilt
- Icon + Label, Aktiv: Teal-Farbe

---

## Kapitel 5 — Statusanzeigen / Badges

| Status | Farbe | Hintergrund |
|--------|-------|-------------|
| Aktiv / Bestanden | Grün | Grün 10 % |
| Warnung | Warm Gold | Gold 10 % |
| Fehler | Rot | Rot 10 % |
| Info | Teal | Teal 10 % |
| Neutral | Gray | Gray 10 % |

---

## Offene Punkte

| Punkt | Beschreibung |
|-------|-------------|
| Dediziertes Designboard | Komponentenregeln visuell dokumentieren |
| Dialoge & Modals | Noch nicht spezifiziert |
| Listen-Elemente | Variantenregeln fehlen |
| Tabellen | Tabellengestaltung für Dashboard |
| Dark Mode | Komponentenvarianten für dunkle Oberflächen |

---

*NW-DS-006 — NeuroWays Component System v1.0.0 — Status: draft*
