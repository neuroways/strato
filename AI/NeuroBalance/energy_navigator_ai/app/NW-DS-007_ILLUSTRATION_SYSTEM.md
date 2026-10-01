# NW-DS-007 — NeuroWays Illustration System

**Dokumentcode:** NW-DS-007  
**Version:** 1.0.0  
**Status:** draft  
**Veröffentlicht:** –  
**Gültig ab:** nach Freigabe  
**Verantwortlich:** NeuroWays Design Core

---

## Kapitel 1 — Das zentrale Illustrationselement: Die Linie

Die Wellenlinie ist das Herzstück der NeuroWays-Bildsprache. Sie erscheint im Logo, in Illustrationen, als Trenner, als Animation.

### Eigenschaften der Linie

- Organisch und weich — keine geometrisch perfekten Wellen
- Dünne bis mittlere Stärke (2–4 px bei 300 px Referenzgröße)
- Immer mit dem offiziellen Farbverlauf: Deep Navy → Teal → Violet → Warm Gold
- Endpunkt: goldener Punkt, gefolgt von einem goldenen Strich
- Beginnt links in Deep Navy, endet rechts in Warm Gold

### Verbote

- Einfarbige Wellenlinie (außer Monochrom-Variante für s/w-Druck)
- Gerade Linie als Ersatz
- Geometrisch-mechanische Kurven
- Fehlende Stopp-Elemente (Punkt und Strich am Ende)

---

## Kapitel 2 — NeuroWays World Illustrationen

Fünf Zonenillustrationen für den Energy Navigator (aus NW-DSN-001):

| Zone | Ort | Farbe | Orientierungspunkt |
|------|-----|-------|-------------------|
| Festland | Weites Plateau | Teal #2a9d8f | Großer Baum |
| Wald | Lichter Wald | Grün #52b788 | Lichtung |
| Küste | Steilküste | Blau-Grau #4a9abb | Leuchtturm |
| Meer | Offenes Wasser | Blau-Violett #6b7faa | Boje |
| Insel | Kleine Insel | Violett-Grau #8b6f9e | Einzelner Baum |

**Stil:** Flache Vektorflächen, organische Formen, weiche Übergänge, kein Outline, diffuses Licht, leichte Papier-Textur (max. 8 % Deckkraft).

**Verbote:** Personen, Tiere, Text, harte Schatten, Outlines.

---

## Kapitel 3 — Bildsprache

Für Fotos und begleitende Bilder:

- Ruhige, natürliche Motive
- Keine überladenen Szenen
- Viel Luft im Bild
- Farblich im Einklang mit NeuroWays-Palette
- Menschen nur aus sicherer Distanz oder in Abstraktion
- Keine Stockfoto-Ästhetik

---

## Kapitel 3b — Energie-Icons (implementiert)

**Status: implementiert** — in `src/components/AnswerCard.jsx` via `ENERGY_ICON_PRESETS`

### Zuordnung (numeric_value → Icon → Farbe)

| Wert | Symbol | Icon-Code | Akzentfarbe | Hintergrund |
|------|--------|-----------|-------------|-------------|
| 1 | Blitz | `zap` | `#008CA8` Türkis | `#e0f7fa` |
| 2 | Blatt | `leaf` | `#4caf7d` Grün | `#e8f5e9` |
| 3 | Welle | `waves` | `#E2A83B` Gold | `#fff8e1` |
| 4 | Halbe Batterie | `battery-low` | `#e07a30` Orange | `#fff3e0` |
| 5 | Leere Batterie | `battery` | `#c0392b` Rot | `#fdecea` |

### Verhalten

- Icons ergänzen den Text — sie ersetzen ihn nie
- Keine Information ist ausschließlich durch Farbe kodiert (Icon + Farbe + Text + Häkchen)
- Runde Hintergrundfläche, Pastell-Tönung
- Outline-Stil, keine gefüllten Icons, keine Farbverläufe
- Einheitliche Größe: 18 px Icon im 40 px Kreis

---

## Kapitel 4 — Icons

- Stil: Linien-Icons (Stroke), kein Fill
- Strichstärke: 1.5–2 px bei 24 px
- Ecken: leicht abgerundet (round cap, round join)
- Farbe: Deep Navy oder Teal — niemals der Farbverlauf
- Größen: 16, 20, 24, 32 px (Standard: 20 px)

---

## Offene Punkte

| Punkt | Beschreibung |
|-------|-------------|
| Flowisaurus-Figur | Erscheinungsbild des Maskottchens noch nicht definiert |
| Icon-Bibliothek | Vollständiger Icon-Satz noch nicht spezifiziert |
| Zonenillustrationen | Noch nicht generiert (Basis aus NW-DSN-001 vorhanden) |
| Menschendarstellung | Genaue Regeln für humanoide Darstellungen fehlen |

---

*NW-DS-007 — NeuroWays Illustration System v1.0.0 — Status: draft*
