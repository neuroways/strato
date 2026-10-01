# NW-WEB-STYLE-CORE-001

## Zweck

Gemeinsame visuelle Web-Basis für NeuroWays-Weboberflächen.

Der Style Core ist **keine Anwendung** und enthält **keine Fachlogik**. Er stellt wiederverwendbare Design-Tokens und Basiskomponenten bereit, die Portal und Module nutzen können.

## Architektur

```text
NW-WEB-STYLE-CORE-001
│
├── tokens.css
├── base.css
├── components.css
└── utilities.css
        │
        ├── NeuroWays Portal
        ├── Tennisturnier
        └── weitere Module
```

Module ergänzen ihre eigenen fachlichen Styles **nach** dem Style Core.

## Dateien

### `css/tokens.css`
Farben, Typografie, Abstände, Radien, Schatten, Layout- und Motion-Tokens.

### `css/base.css`
Reset, Body, Überschriften, Fokuszustände, Shell, Sektionen und Reduced Motion.

### `css/components.css`
Gemeinsame Basiskomponenten:
- Card
- Button
- Badge
- Panel
- Form Field / Input
- Tabelle
- Grid

### `css/utilities.css`
Kleine wiederverwendbare Layout-Helfer.

### `css/index.css`
Zentraler Import aller Style-Core-Dateien.

## Nutzung

Statisch:

```html
<link rel="stylesheet" href="/assets/neuroways/css/index.css">
```

Oder aus Modul-CSS:

```css
@import "/assets/neuroways/css/index.css";
@import "./tennis.css";
```

## Vererbungsregel

**Core definiert:**
- Markenfarben
- Typografie
- Grundabstände
- Oberflächen
- Cards
- Buttons
- Badges
- Fokuszustände
- Form-Grundelemente
- responsive Baseline
- Reduced Motion

**Module definieren selbst:**
- fachliche Komponenten
- Zustandslogik
- Tabellen-/Match-/Court-Layouts
- fachliche Farben, sofern semantisch notwendig
- modulbezogene Icons
- Speziallayouts

## Tennis-Migration

Empfohlener Ablauf:

1. Style Core unter `/assets/neuroways/` bereitstellen.
2. In der Tennis-App Core zuerst importieren.
3. Bestehende globale Farb-, Radius-, Button- und Card-Werte gegen `--nw-*` Tokens mappen.
4. Tennis-spezifische Regeln in eigener Datei belassen.
5. Visuell prüfen:
   - Startseite
   - Turnierübersicht
   - Spielplan
   - Ergebnisse
   - Formulare
   - Admin
6. Erst nach erfolgreichem DEV-Test bestehende redundante Styles entfernen.

## Version

Package: `NW-WEB-STYLE-CORE-001`
Baseline: `v0.1.0`
Status: Draft / implementierbare Basis
