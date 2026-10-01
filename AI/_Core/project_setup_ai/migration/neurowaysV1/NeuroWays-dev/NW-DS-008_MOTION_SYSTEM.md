# NW-DS-008 — NeuroWays Motion System

**Dokumentcode:** NW-DS-008  
**Version:** 1.0.0  
**Status:** draft  
**Veröffentlicht:** –  
**Gültig ab:** nach Freigabe  
**Verantwortlich:** NeuroWays Design Core  
**Verweis:** NW-DSN-001 Kapitel 9 (Animationsrichtlinien)

---

## Kapitel 1 — Bewegungsprinzipien

- **Ruhig:** Keine hektischen, abrupten Bewegungen.
- **Langsam:** Animationen dauern etwas länger als erwartet — das ist gewollt.
- **Bedeutungstragend:** Jede Bewegung kommuniziert etwas. Dekorative Animation ohne Funktion existiert nicht.
- **Zielgruppe respektierend:** `prefers-reduced-motion` wird immer respektiert.

---

## Kapitel 2 — Animationsregeln (aus NW-DSN-001)

| Element | Bewegung | Max. Dauer | Easing | Loop |
|---------|---------|-----------|--------|------|
| Seitenwechsel | Sanfter Überblend | 300 ms | ease-in-out | Nein |
| Fortschrittsbalken | Gleichmäßiges Füllen | 600 ms | linear | Nein |
| Zonenfarbe | Sanfter Farbübergang | 800 ms | ease-in-out | Nein |
| Wasserwellen | Sanfte Bewegung | 8000 ms | ease-in-out | Ja |
| Pflanzenbewegung | Leichtes Schwingen | 6000 ms | ease-in-out | Ja |
| Hover-Effekte | Dezente Aufhellung | 150 ms | ease | Nein |

---

## Kapitel 3 — Was nie animiert wird

- Blinkende Elemente (strikt verboten — Accessibility und Reizschutz)
- Parallax-Effekte
- Automatisch startende Videos ohne Benutzerinteraktion
- Carousels, die sich ohne Auslöser bewegen

---

## Kapitel 4 — Accessibility

Alle Animationen müssen deaktivierbar sein:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Offene Punkte

| Punkt | Beschreibung |
|-------|-------------|
| Ladeanimationen | Stil der Loading-States noch nicht spezifiziert |
| Mikrointeraktionen | Button-Press, Checkbox-Toggle, Form-Feedback |
| Splash Screen | Animierter Einstieg für App-Start |
| Wellen-Animation | Technische Umsetzung der Markenwelle als Loop |

---

*NW-DS-008 — NeuroWays Motion System v1.0.0 — Status: draft*
