# Gemeinsame Karten-Assets

Verbindliche Struktur:

```text
modules/
└── kartenraum/
    ├── cards/
    │   ├── SheetA-2.png
    │   ├── SheetB.png
    │   ├── SheetC.png
    │   ├── SheetD.png
    │   ├── SheetE.png
    │   ├── SheetF.png
    │   ├── SheetG.png
    │   ├── SheetH.png
    │   ├── SheetI.png
    │   ├── SheetJ.png
    │   ├── SheetK.png
    │   ├── SheetL.png
    │   ├── SheetM.png
    │   ├── SheetN.png
    │   ├── SheetO.png
    │   ├── SheetP.png
    │   ├── SheetR.png
    │   └── archive/
    │       └── SheetA-1.png
    └── NB_Kartenraum_STRATO_Testpaket_v0.2.3/
```

Die Versionsanwendung greift relativ über `../cards/` auf diese Assets zu.

Öffentliche Asset-Basis:
`https://flowisaurus.com/modules/kartenraum/cards/`

Regeln:
- keine Sheet-Kopien in Versionsordnern
- SheetA-2 ist kanonisch für 0–V
- SheetA-1 liegt nur im Archiv
- SheetR ist gemeinsame Rückseitenquelle
- Platzhalterpositionen werden nicht registriert
