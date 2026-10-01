# Database Migration Plan – Spezifikationsphase

Es werden in v0.1.0 dieser Reconstruction Specification **keine ausführbaren Migrationen** erzeugt.

Grund:
- Die veröffentlichte ChatGPT-Site belegt kein Datenbankschema.
- NW-ARCH-008 verlangt Core-managed Persistence.
- Identity-/Subject-Scope und verbindlicher Tabellenstandard müssen gegen die führende Architektur bzw. DB-Standards geprüft werden.

## Vor einer ersten SQL-Migration erforderlich

1. Tabellen-/Naming-Standard bestätigen.
2. Core Persistence Context bestätigen.
3. Identity Scope bestätigen.
4. Lösch-/Export-/Privacy-Verhalten für Journaltexte entscheiden.
5. Draw-Wiederholungsregel freigeben.
6. Versionierungsregel für Deck/Card/Content freigeben.

Erst dann entsteht `001_create_nb_kartenraum.sql`.
