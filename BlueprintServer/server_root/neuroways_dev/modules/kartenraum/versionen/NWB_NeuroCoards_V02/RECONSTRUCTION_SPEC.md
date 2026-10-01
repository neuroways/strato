# NeuroBalance Kartenraum – Reconstruction Specification v0.1.0

## Status

Spezifikationspaket; **keine produktive Implementierung und keine STRATO-Änderung**.

## Ziel

Die bestehende Kartenraum-Referenz wird so vorbereitet, dass die nächste Phase ein echtes NeuroWays-Modul implementieren kann, ohne Core-, Module-, Instance- und Environment-Verantwortungen zu vermischen.

## Architekturgrundlage

NW-ARCH-008 definiert das Request-Modell:

`Public Entry Point → Environment → Instance → AuthN/AuthZ → Installation → Module Version → Application/Domain → Core-managed Persistence`

Daraus folgen für `nb_kartenraum`:

- keine Route als Berechtigung
- keine Credentials im Modul
- keine direkte DB aus dem Frontend
- keine Installation durch bloßes Vorhandensein eines Packages
- versioniertes Modul und explizite Installation
- Default Deny bei nicht auflösbarem Kontext

## Rekonstruktionsschnitt

### Präsentation
Seiten und modulspezifische Komponenten; Core-Komponenten werden nur verwendet.

### Application
Use Cases koordinieren Ziehung, Aufdeckung, Reflexion, Journal und Muster.

### Domain
Deck, Karte, Ziehung und persönlicher Kartenmoment sind framework- und DB-unabhängig.

### Infrastructure
Repository-Adapter implementieren später Core Persistence Contracts.

### Database
Nur modulspezifische Migrationen/Seeds; Ausführung und Connection bleiben Core/Deployment-Verantwortung.

## Wichtigste fachliche Regel

Die persönliche Erstwahrnehmung bleibt ein eigenständiger Wert. Ein Karteninhalt oder späterer Begleittext darf sie weder überschreiben noch als falsch/richtig bewerten.

## Implementierungsfreigabe – noch offen

Vor Codephase müssen insbesondere geklärt werden:

1. Quelle der vollständigen Karten-/Deckdaten.
2. Originalassets und Lizenz-/Source-Metadaten.
3. Tagesziehungs- und Neuziehungsregel.
4. Identity-/Scope-Vertrag.
5. konkreter DB-/Naming-Standard.
6. gewünschte Zieltechnik innerhalb der führenden Plattformarchitektur.

Danach kann v0.1.0 als erstes DEV-fähiges Modul implementiert werden.
