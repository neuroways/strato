# Architekturübersicht

## Ebenen

```text
PHYSICAL SERVER
│
├── zentrale private Konfiguration
├── immutable Package Repository
├── Instance State
│
├── DEV Environment
└── PRO Environment
```

## Request-Modell

```text
Request
  ↓
Public Entry Point
  ↓
Environment Resolution
  ↓
Instance Resolution
  ↓
Authentication / Authorization
  ↓
Installation Resolution
  ↓
Installed Module + konkrete Module Version
  ↓
Application / Domain Logic
  ↓
Core-managed Persistence
```

**Eine Route ist niemals eine Berechtigung.** Kann der Kontext nicht eindeutig und autorisiert aufgelöst werden, gilt Default Deny.

## Code-Modell

```text
CORE
├── gemeinsame Runtime
├── Security Context
├── Persistence / DB Access
├── Config Resolution
├── gemeinsame Frontend-Komponenten
└── globales CSS / Design Tokens

MODULE
├── eigene Fachlogik
├── eigene Seitenkomposition
├── modulespezifische Komponenten
└── modulespezifisches CSS

INSTALLATION
├── Version Pin
├── Route
├── Aktivierungsstatus
├── Custom CSS / Assets
└── installationsbezogene Daten / Zustände
```

## Änderungsregel

- global → Core
- wiederverwendbar → zuerst Core-/Shared-Eignung prüfen
- fachlich spezifisch → Module
- installationsspezifisch → Instance/Installation
- environment-spezifisch → Environment Config
- Secret → zentrale Secret-/Config-Schicht
