# NeuroBalance Kartenraum · Module v0.1.0

**Status:** DEV-PILOT  
**Architekturgrundlage:** NW-ARCH-008 STRATO Server Blueprint v0.1.0 Draft-Pilot  
**Führende Plattformarchitektur:** laut NW-ARCH-008 weiterhin NW-ARCH-007.

Dieses Paket ist das erste tatsächlich lauffähige DEV-Modulgerüst für den NeuroBalance Kartenraum.

## Was bereits funktioniert

Die statische DEV-Vorschau unter `public-assets/preview/index.html` enthält:

- Kartenraum-Startseite
- separate Ziehungsansicht
- ruhige Kartenaufdeckung
- Speicherung der eigenen Erstwahrnehmung
- Rückblick
- Journal
- Verbindungen
- Deckübersicht
- Reduced-Motion-Unterstützung
- responsive Darstellung

Die Vorschau verwendet ausschließlich **DEV-Fixtures** und Browser-LocalStorage.
Das ist keine produktive Persistenz.

## Was bewusst noch NICHT produktiv verdrahtet ist

- Identity / User Scope
- Core-managed Persistence
- MariaDB-Schema
- endgültige Karten-/Deckdaten
- Originalillustrationen
- Lizenz-/Asset-Metadaten
- verbindliche Tagesziehungs-/Neuziehungsregel
- produktives Runtime-Routing

## Architekturgrenze

Frontend → Application Contract → Domain → Persistence Contract

Das Frontend enthält keine direkte Datenbankverbindung und keine Credentials.

## DEV-Vorschau starten

Einfach `public-assets/preview/index.html` im Browser öffnen.

Für STRATO kann der Ordner `public-assets/preview/` in einen separaten, nicht-produktiven
Pilotpfad kopiert werden. Bestehende NeuroWays-Dateien werden durch dieses Paket nicht überschrieben.

## Validierung

- `php tools/validate_module.php`
- `php tests/unit/DailyDrawServiceTest.php`

Siehe außerdem `deployment/INSTALL_DEV.md`.
