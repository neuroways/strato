# NW-PORTAL-0001 – Public Portal Static Slice v0.2

## Integration

Diese Fassung integriert `NW-WEB-STYLE-CORE-001 v0.1.0`.

Deployment-Ziel:

```text
neuroways_dev/frontend/
├── index.html
├── styles.css
├── app.js
├── .htaccess
└── assets/
    └── neuroways/
        └── css/
            ├── index.css
            ├── tokens.css
            ├── base.css
            ├── components.css
            └── utilities.css
```

## CSS-Reihenfolge

`index.html` lädt:

```html
<link rel="stylesheet" href="/assets/neuroways/css/index.css">
<link rel="stylesheet" href="styles.css">
```

Damit gilt:

1. gemeinsamer NeuroWays Web Style Core
2. portalspezifische CSS-Schicht

## Wichtig

Das Paket verändert `/tennis/` nicht.

Die Tennis-App kann den Style Core später ebenfalls über:

```css
@import "/assets/neuroways/css/index.css";
```

bzw. als `<link>` verwenden.

## Änderungen gegenüber v0.1

- `NW-WEB-STYLE-CORE-001` direkt integriert
- doppelte globale Tokens/Basisregeln aus `styles.css` entfernt
- Portal verwendet gemeinsame Core-Klassen für:
  - Shell
  - Skip Link
  - Eyebrow
  - Button
  - Card
  - Badge
- Portal-spezifische Regeln bleiben separat
- Deploymentstruktur auf `assets/neuroways/css/` vorbereitet

## Strato-First Deployment

Den **Inhalt dieses ZIP-Pakets** in:

`neuroways_dev/frontend/`

entpacken.

Bestehende Portal-v0.1-Dateien dürfen dabei durch die v0.2-Dateien ersetzt werden.

Das Verzeichnis `/tennis/` nicht löschen oder überschreiben.

## Smoke Test

1. `https://flowisaurus.de/` öffnen.
2. Prüfen, ob Layout und Karten korrekt dargestellt werden.
3. DevTools → Network: `/assets/neuroways/css/index.css` muss HTTP 200 liefern.
4. NeuroPlay/Tennis öffnen.
5. `/tennis/` muss weiterhin erreichbar sein.
6. Mobilansicht prüfen.
7. Tastaturfokus und Reduced Motion prüfen.
