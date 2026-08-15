# NW-DS-003 — NeuroWays Color System

**Dokumentcode:** NW-DS-003  
**Version:** 1.0.0  
**Status:** published  
**Veröffentlicht:** 2026-07-23  
**Gültig ab:** 2026-07-23  
**Verantwortlich:** NeuroWays Design Core  
**Quelle:** Offizielles Designboard „NeuroWays – Farbwelt"

---

## Kapitel 1 — Primärfarben

Die vier Primärfarben bilden die vollständige NeuroWays-Markenfarbwelt.

| Name | Hex | Bedeutung | Verwendungsanteil |
|------|-----|-----------|------------------|
| **Deep Navy** | `#0A1F44` | Vertrauen, Stabilität, Klarheit | 50 % |
| **Teal** | `#008CA8` | Balance, Kommunikation, Offenheit | 20 % |
| **Violet** | `#7B4BA2` | Kreativität, Diversität, Perspektive | 15 % |
| **Warm Gold** | `#E2A83B` | Wärme, Energie, Wertschätzung | 10 % |

Die Farbverteilung (50/20/15/10/5) ist eine Empfehlung für Layouts und Oberflächen. Deep Navy dominiert, Warm Gold setzt Akzente.

---

## Kapitel 2 — Neutrale Farben

| Name | Hex | Bedeutung |
|------|-----|-----------|
| **Soft White** | `#F6F4F1` | Ruhe, Klarheit, Offenheit |
| **Light Gray** | `#E5E5E5` | Struktur, Ausgleich, Zurückhaltung |
| **Charcoal** | `#1A1A1A` | Kontrast, Lesbarkeit, Verankerung |

Neutralfarben haben keinen Markenwert, bilden aber die Bühne, auf der die Primärfarben wirken.

---

## Kapitel 3 — Hintergrundfarben (Systemfarben)

| Name | Hex | Verwendung |
|------|-----|-----------|
| Weiß | `#FFFFFF` | Standard-Seitenhintergrund |
| Soft White | `#F6F4F1` | Sanfter Alternativhintergrund |
| Warm White | `#F8F7F3` | Karten, Boxen auf weißem Hintergrund |
| Light Gray | `#F0F1F3` | Trenner, dezente Abschnitte |
| Pale Blue | `#F1F6FA` | Informative Bereiche, ruhige Highlights |
| Sand | `#F6EFE6` | Warme Hintergründe, persönliche Zonen |

---

## Kapitel 4 — Der Farbverlauf (Markenlinie)

Der Farbverlauf ist das verbindende Element der gesamten NeuroWays-Markenwelt.

```
#0A1F44 → #008CA8 → #7B4BA2 → #E2A83B
```

**Regeln für den Farbverlauf:**

- Immer alle vier Farben in dieser Reihenfolge
- Immer von links nach rechts (LTR)
- Niemals umgekehrt
- Niemals einzelne Farben herausnehmen
- Niemals durch andere Farben ersetzen
- Nur auf der charakteristischen Wellenlinie

---

## Kapitel 5 — Einsatzregeln

### Primärfarbe als Hintergrund

| Hintergrund | Textfarbe | Status |
|------------|---------|--------|
| Deep Navy #0A1F44 | Weiß #FFFFFF | ✅ erlaubt |
| Teal #008CA8 | Weiß #FFFFFF | ✅ erlaubt |
| Violet #7B4BA2 | Weiß #FFFFFF | ✅ erlaubt |
| Warm Gold #E2A83B | Deep Navy #0A1F44 | ✅ erlaubt |
| Warm Gold #E2A83B | Weiß | ⚠️ nur bei großen Texten prüfen |

### Verboten

- Primärfarben als Fließtexthintergrund auf großen Flächen (ausgenommen Navy)
- Farbige Texte auf farbigen Hintergründen ohne Kontrastprüfung
- Neue Farben außerhalb dieser Palette einführen
- Primärfarben aufhellen oder abdunkeln (Tints/Shades) ohne Design-Core-Freigabe

---

## Kapitel 6 — Kontrast und Accessibility

| Paarung | Kontrastverhältnis (näherungsweise) | WCAG-Status |
|---------|-------------------------------------|-------------|
| Deep Navy auf Weiß | ≥ 13:1 | ✅ AAA |
| Charcoal auf Weiß | ≥ 12:1 | ✅ AAA |
| Weiß auf Deep Navy | ≥ 13:1 | ✅ AAA |
| Weiß auf Teal | ≥ 4.8:1 | ✅ AA |
| Weiß auf Violet | ≥ 5.2:1 | ✅ AA |
| Deep Navy auf Warm Gold | ≥ 5.5:1 | ✅ AA |
| Weiß auf Warm Gold | ≥ 2.8:1 | ⚠️ nur dekorativ, nicht für Fließtext |

**Mindeststandard:** WCAG 2.1 AA für alle Textinhalte.

---

## Offene Punkte

| Punkt | Beschreibung |
|-------|-------------|
| Tints & Shades | Aufgehellte und abgedunkelte Varianten der Primärfarben sind noch nicht definiert |
| Dunkel-Modus | Vollständige Farbpalette für Dark Mode fehlt noch |
| Statusfarben | Rot (Fehler), Grün (Erfolg), Gelb (Warnung) — noch nicht offiziell definiert |
| Gradient-Winkel | Winkel des Farbverlaufs für andere Kontexte als die Wellenlinie noch offen |

---

*NW-DS-003 — NeuroWays Color System v1.0.0 — Status: published — 2026-07-23*
