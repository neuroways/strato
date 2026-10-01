# Status

## Architekturstatus

- Work Package: `NW-ARCH-008 / Repository, Server & Software Package Structure`
- Fassung: `v0.1.0 Draft-Pilot`
- Zielplattform Pilot: STRATO Shared Hosting
- Referenzprojekt: Tennisturnier Neindorf
- Führende Plattformarchitektur: `NW-ARCH-007`

## Bereits als Baseline berücksichtigt

- Installed Module ist First-Class Concept.
- Module Definition, Module Version und Installed Module sind getrennt.
- Installation Registry ist technische Betriebswahrheit, keine fachliche Wahrheit.
- Installation und Aktivierung sind getrennt.
- Strato-First ist Referenz eines target-neutralen Deployment-Contracts.
- Public Route ist unabhängig von interner Modulhierarchie und Package-Pfad.
- DEV und PRO sind getrennte Runtime-Kontexte, dürfen aber auf demselben physischen Server liegen.
- Mehrere Instanzen und mehrere installierte Versionen desselben Moduls müssen parallel möglich sein.
- Core, Module und Installation besitzen getrennte CSS-/Frontend-Verantwortlichkeiten.
- Frontend, Fachlogik und Datenbankzugriffe sind hart getrennt.
- Produktive DB-Zugriffe werden zentral durch den Core vermittelt.
- Jede relevante Architekturentscheidung und jeder Architektureingriff wird dokumentiert.
- Vor modulspezifischer Implementierung erfolgt ein Reuse-&-Placement-Check.

## Noch zu validieren

- endgültige Runtime-Implementierung
- endgültiges Registry-Schema
- konkrete Datenbank-Isolationsstrategie je Hosting-Szenario
- Installer/Updater/Rollback-Automatisierung
- Mapping der STRATO-Domains/Subdomains auf die Public Entry Points
- Migration des bestehenden Tennis-Bestands ohne unnötiges Refactoring
