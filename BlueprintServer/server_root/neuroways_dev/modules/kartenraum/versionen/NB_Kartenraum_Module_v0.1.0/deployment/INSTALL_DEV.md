# DEV-Installationsplan · nb_kartenraum v0.1.0

## Sicherheitsmodus

Dieses Paket überschreibt keine bestehende NeuroWays-Datei automatisch.

## Stufe A – isolierte Vorschau

1. ZIP auf STRATO hochladen.
2. In einen **neuen Pilotordner** entpacken.
3. Nur `public-assets/preview/` über einen temporären DEV-Pfad erreichbar machen.
4. Keine bestehende `.htaccess`, `config/`, `neuroways_dev/` oder `neuroways/` ersetzen.
5. UI, Mobile, Navigation, Reduced Motion und Kartenaufdeckung prüfen.

## Stufe B – Moduldefinition in Working Tree

Nach Abnahme:
`neuroways_dev/modules/neurobalance/nb_kartenraum/`

Dabei zuerst Reuse-&-Placement-Check:
- globale Tokens → Core
- generische Buttons/Navigation → Core
- Kartenraum-CSS/Komposition → Modul

## Stufe C – Persistence / Identity

Erst nach geklärten Core-Verträgen:
- Scope Provider anbinden
- Core-managed Persistence Adapter implementieren
- DB-Migration nach freigegebenem Naming-Standard erzeugen
- DEV-Migration ausführen
- Integrationstests

## Stufe D – Module Version

Nach Tests:
`_packages/verified/modules/nb_kartenraum/0.1.0/`

Die bloße Ablage dort installiert das Modul noch nicht.

## Stufe E – Installed Module

Expliziter Registry-/Installationseintrag:
- Instance
- Environment
- Version Pin
- Route
- Aktivierungsstatus
- optionale Custom Assets/CSS

## Blocker vor produktiver Freigabe

- endgültige Karten-/Deckquelle
- Asset-/Lizenznachweis
- Identity-/Scope-Vertrag
- DB-/Naming-Standard
- Neuziehungsregel
- produktive Runtime-Integration
