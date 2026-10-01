# DEV Installation Plan – nb_kartenraum 0.1.0

**Noch nicht ausführen.** Dieser Plan beschreibt die Zielschritte nach Implementierung und Verifikation.

## 1. Working Tree

Ziel:
`neuroways_dev/modules/neurobalance/nb_kartenraum/`

Die Module Definition entsteht dort mit Source, Tests und Dokumentation.

## 2. Package Build

Aus freigegebenem Stand wird genau ein versioniertes Artefakt `nb_kartenraum/0.1.0` erzeugt.

## 3. Package Pipeline

`Source → Module Version → Build → _packages/incoming → Verify → _packages/verified/modules/nb_kartenraum/0.1.0`

Verified Packages sind immutable.

## 4. DEV Installation

Registry-Zuordnung, Beispiel (noch nicht aktiv):

```json
{
  "installation_id": "nb-kartenraum-dev",
  "instance_id": "neuroways-default",
  "environment": "dev",
  "module_code": "nb_kartenraum",
  "module_version": "0.1.0",
  "enabled": true,
  "public_route": "/kartenraum",
  "health": "unknown"
}
```

Die tatsächliche Instance-ID wird nicht erfunden und muss vor Installation bestätigt werden.

## 5. Installation Sequence

1. Package-Checksum verifizieren.
2. Core-Kompatibilität prüfen.
3. DB-Migrationsplan Dry Run.
4. Installation Registry schreiben.
5. Route im DEV-Kontext registrieren.
6. Smoke Test.
7. Integration Tests.
8. E2E: Kartenraum → Ziehung → Aufdeckung → Wahrnehmung → Rückkehr.
9. Health auf `healthy` setzen nur nach bestandener Prüfung.

## 6. PRO Promotion

Dasselbe verified 0.1.0-Artefakt verwenden. Kein separater PRO-Build.

Environment-spezifisch bleiben Config, Secrets, Daten, Registry State, Routing und Customization.
