# Zentrale Server-Konfiguration

Einziger serverweiter Einstieg für environment- und infrastrukturspezifische Konfiguration. Bestehende `/config/database.php` bleibt geschützt.

## Regeln

- Keine produktiven Secrets in ZIP oder Git.
- Module lesen keine DB-Credentials direkt.
- Core löst Connections anhand von Environment/Instance/Installation auf.

## Status

Teil des `NW-ARCH-008 STRATO Server Blueprint v0.1.0 Draft-Pilot`. Diese Struktur ist ein Architektur-Scaffold, keine produktive Runtime-Freigabe.
