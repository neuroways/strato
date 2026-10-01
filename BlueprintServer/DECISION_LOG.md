# Architecture Decision Log

Dieses Log dokumentiert die in das Scaffold eingeflossenen Entscheidungen. Es ersetzt keine späteren formalen ADRs.

| ID | Entscheidung | Status |
|---|---|---|
| HD-01 | Installed Module ist eigene technische Entität | bestätigt |
| HD-02 | Registry = technische Betriebswahrheit, nicht fachliche Wahrheit | bestätigt |
| HD-03 | Installation und Aktivierung sind getrennt | bestätigt |
| HD-04 | Strato-First = aktuelle Deployment-Referenz eines target-neutralen Contracts | bestätigt |
| HD-05 | NW-ARCH-007 bleibt führende Plattformarchitektur | bestätigt |
| C-ROUTING | Public Route unabhängig von interner Modul-/Package-Struktur | Arbeitsbaseline |
| C-ENV | DEV/PRO getrennte Runtime-Kontexte | Arbeitsbaseline |
| C-VERSION | Available Version ≠ Installed Version | Arbeitsbaseline |
| C-ACCESS | Zugriff ist installation-scoped, Default Deny | Arbeitsbaseline |
| C-LAYER | Frontend, Logik und Persistence hart getrennt | Arbeitsbaseline |
| C-STYLE | Core CSS → Module CSS → Installation CSS | Arbeitsbaseline |
| C-REUSE | Reuse before Specialization / Placement Check | Arbeitsbaseline |
| C-DOC | Architekturentscheidungen/-eingriffe dokumentieren | Arbeitsbaseline |
