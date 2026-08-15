# NW-DEPLOY-001 — NeuroWays Deployment Standard

**Dokumentcode:** NW-DEPLOY-001  
**Version:** 1.0.0  
**Status:** published  
**Veröffentlicht:** 2026-07-23  
**Verantwortlich:** NeuroWays Core

---

## Änderungsverlauf

| Version | Datum | Änderung | Autor |
|---------|-------|----------|-------|
| 1.0.0 | 2026-07-23 | Erstfassung — erster produktiver Deployment-Lauf erfolgreich | NeuroWays Core |

---

## Kapitel 1 — Grundprinzip

NeuroWays unterscheidet grundsätzlich zwei Datenkategorien:

### Fachliche Stammdaten (werden migriert)
Konfigurationen, die die fachliche Funktion der Anwendung definieren:
- Methoden, Fragen, Antwortoptionen, Ergebnisregeln
- Designstandards (World Versions, Tokens, Regeln)
- Asset-Definitionen
- Package-Definitionen und Modulversionen

### Betriebsdaten (bleiben in ihrer Umgebung)
Nutzerbezogene Daten, die niemals migriert werden:
- Benutzer, Identitäten, Passwörter, Sessions
- Check-ins, Antworten, Verlaufsdaten
- Audit-Logs, Build-Logs, Testkonten

**Die Live-Umgebung beginnt bezüglich der Benutzer immer leer.**

---

## Kapitel 2 — Deployment-Pipeline

```
Development (DEV)
  │  Entwicklung, Tests, Proof of Concepts
  │
  ▼
Validierung
  │  Pre-flight: Datenmodell, Fremdschlüssel, Pflichtfelder
  │
  ▼
Migration (DEV → LIVE)
  │  Idempotenter Upsert aller Stammdaten
  │  Niemals: Benutzer, Sessions, persönliche Daten
  │
  ▼
Post-Migration-Validierung
  │  Datensatzzählung, Referenzprüfung, Strukturprüfung
  │
  ▼
Smoke Test (auf LIVE)
  │  Registrierung, Login, Methode, Fragen, Check-in, Verlauf
  │
  ▼
Freigabe
     Live-Version gilt als produktionsbereit
```

---

## Kapitel 3 — Zu migrierende Collections

| Collection | Typ | Beschreibung |
|-----------|-----|-------------|
| `methods` | Stammdaten | Aktive Methoden |
| `questions` | Stammdaten | Fragen je Methode |
| `answer_options` | Stammdaten | Antwortoptionen je Frage |
| `result_rules` | Stammdaten | Ergebnis-Zonendefinitionen |
| `world_versions` | Stammdaten | NeuroWays World Design Standard Versionen |
| `world_regions` | Stammdaten | Fünf Regionen der NeuroWays World |
| `design_tokens` | Stammdaten | Farb- und Design-Token |
| `design_rules` | Stammdaten | Gestaltungsregeln |
| `animation_rules` | Stammdaten | Animationsregeln |
| `accessibility_rules` | Stammdaten | Accessibility-Regeln |
| `asset_versions` | Stammdaten | Asset-Versionen |
| `asset_files` | Stammdaten | Asset-Dateireferenzen |
| `asset_assignments` | Stammdaten | Asset-Zuordnungen |
| `asset_metadata` | Stammdaten | Asset-Metadaten |
| `asset_prompts` | Stammdaten | Freigegebene Generierungsprompts |
| `pkg_bases` | Stammdaten | Paket-Basisversionen |
| `pkg_base_versions` | Stammdaten | Versionierte Basisversionen |
| `pkg_modules` | Stammdaten | Modul-Katalog |
| `pkg_module_versions` | Stammdaten | Versionierte Module |

---

## Kapitel 4 — Niemals zu migrierende Collections

| Collection | Grund |
|-----------|-------|
| `users` | Personenbezogene Daten — bleiben in der Umgebung |
| `checkins` | Betriebsdaten — nutzergebunden |
| `checkin_answers` | Betriebsdaten — nutzergebunden |
| `checkin_results` | Betriebsdaten — Legacy |
| `identity_test_values` | Testdaten |
| `identity_audit_log` | Sicherheitslog — umgebungsspezifisch |
| `pkg_package_definitions` | Nutzerbezogen |
| `pkg_builds` | Nutzerbezogen |
| `pkg_build_artifacts` | Nutzerbezogen |
| `pkg_build_logs` | Nutzerbezogen |

---

## Kapitel 5 — Migrationsskript

**Speicherort:** `/tmp/nw_migrate.js` (bei jedem Deployment neu aus Repository laden)

**Idempotenz:** Upsert per Record-ID — bestehende Datensätze werden aktualisiert, fehlende neu angelegt. Duplikate entstehen nie.

**Ausführung:**
```bash
export DEV_TOKEN=$(node pb_gen_token_sfs.js)
export LIVE_TOKEN=$(node pb_gen_token_sfs.js --live)
node nw_migrate.js
```

---

## Kapitel 6 — Versionierung eines Deployment-Laufs

Jeder Migrations-Lauf erzeugt ein Protokoll mit:
- Versionsnummer (Migrationslauf-Timestamp)
- Datum und Uhrzeit
- Quellumgebung: DEV
- Zielumgebung: LIVE
- Anzahl migrierter Datensätze pro Collection
- Gesamt-Datensätze
- Fehleranzahl
- Dauer in Sekunden
- SHA-256-Prüfsumme des Migrationsergebnisses

---

## Kapitel 7 — Smoke Test

Nach jeder Migration automatisch zu prüfen:

| Test | Prüfung |
|------|---------|
| ST1 | Registrierung eines neuen Testkontos |
| ST2 | Anmeldung mit diesem Konto |
| ST3 | Energy Navigator Methode ladbar |
| ST4 | Alle 6 Fragen vorhanden |
| ST5 | Alle 30 Antwortoptionen vorhanden |
| ST6 | Check-in speicherbar |
| ST7 | Verlauf lesbar |
| ST8 | Alle 5 Ergebnisregeln vorhanden |

Testdaten werden nach dem Smoke Test automatisch bereinigt.

---

## Kapitel 8 — Freigabekriterien

Eine Live-Version gilt als freigegeben, wenn:

- ✅ Migration ohne Fehler abgeschlossen
- ✅ Post-Migration-Validierung: alle Datensätze vorhanden
- ✅ Keine Benutzerdaten migriert (alle Benutzer-Collections leer)
- ✅ Alle Smoke Tests bestanden
- ✅ Testdaten bereinigt

---

## Erstes produktives Deployment — Abschlussbericht

**Datum:** 2026-07-23  
**Laufzeit:** 0.3 Sekunden  
**Status: NW-DEPLOY-001 — Deployment erfolgreich**

### Migrierte Datensätze

| Collection | Datensätze |
|-----------|-----------|
| methods | 1 |
| questions | 6 |
| answer_options | 30 |
| result_rules | 5 |
| world_versions | 1 |
| world_regions | 5 |
| design_tokens | 16 |
| design_rules | 27 |
| animation_rules | 6 |
| accessibility_rules | 9 |
| asset_versions | 1 |
| asset_files | 1 |
| asset_assignments | 1 |
| pkg_bases | 2 |
| pkg_base_versions | 2 |
| pkg_modules | 2 |
| pkg_module_versions | 2 |
| **Gesamt** | **117** |

### Idempotenz-Test

Zweiter Lauf direkt danach: 0 neu angelegt, 117 aktualisiert. Prüfsumme identisch. ✅

### Smoke Tests

| Test | Ergebnis |
|------|---------|
| ST1 Registrierung | ✅ |
| ST2 Anmeldung | ✅ |
| ST3 Energy Navigator Methode | ✅ |
| ST4 6 Fragen vorhanden | ✅ |
| ST5 30 Antwortoptionen vorhanden | ✅ |
| ST6 Check-in speicherbar | ✅ |
| ST7 Verlauf lesbar | ✅ |
| ST8 5 Ergebnisregeln vorhanden | ✅ |

### Benutzerdaten

| Collection | Status |
|-----------|--------|
| users | ✅ leer |
| checkins | ✅ leer |
| checkin_answers | ✅ leer |
| identity_audit_log | ✅ leer |

### Offene Punkte

| Punkt | Beschreibung |
|-------|-------------|
| Automatisierung | Migrationsskript noch manuell gestartet — CI/CD-Integration folgt |
| pkg_version_files | Dateiinhalte der Package-Versionen noch nicht migriert (zu groß für direkten Transfer — separater Asset-Transfer-Mechanismus erforderlich) |

---

*NW-DEPLOY-001 — NeuroWays Deployment Standard v1.0.0 — Status: published — 2026-07-23*
