# Schutzmandat für kritische Infrastrukturkomponenten

**Gültig ab:** 26.07.2026 21:50 UTC  
**Geltungsbereich:** Alle STRATO-Projekte mit Datenpersistenz  
**Verbindlichkeit:** NICHT VERHANDELBAR  
**Status:** AKTIV

---

## 1. SCHUTZUMFANG

Die folgenden Komponenten sind als **KRITISCH** klassifiziert und dürfen niemals ohne strengste Sicherheitsvorkehrungen gelöscht, ersetzt oder wesentlich geändert werden:

### 1.1 Authentifizierung & Autorisierung
- Auth-Collections (z.B. `admins`, `users`, `_superusers`)
- Benutzerkontotypen
- Passwort-Hashes und Sicherheits-Token
- Session-Management-Infrastruktur
- Mehrstufige Authentifizierung (falls implementiert)

### 1.2 Zugriffskontrolle
- Rollen-Definitionen (`roles` Collection)
- Rollenzuweisungen (`role_assignments` Collection)
- Berechtigungsmatrix
- Admin-Markierungen

### 1.3 API-Sicherheit
- API Rules (listRule, viewRule, createRule, updateRule, deleteRule)
- Auth-Tokens und Signing-Schlüssel
- Rate-Limiting-Konfiguration
- CORS-Richtlinien

### 1.4 Datenbankschema
- Collection-Definitionen
- Feldtypen und Validierungen
- Indizes und Constraints
- Relationen zwischen Collections

### 1.5 Kritische Benutzerkonten
- Admin-Konten
- Service-Konten
- System-Konten

---

## 2. VOR JEDER DESTRUKTIVEN ÄNDERUNG – PFLICHT-CHECKLISTE

Eine destruktive Änderung ist jede Operation, die:
- Daten löscht (DELETE)
- Struktur ändert (ALTER TYPE, RENAME, DROP COLLECTION)
- Berechtigungen reduziert (RESTRICT ACCESS)
- Auth-Funktionalität beeinträchtigt

**Vor jeder solchen Änderung ist VERPFLICHTEND:**

### 2.1 Schritt 1: Ursachen-Analyse (dokumentieren)
```markdown
**Problem:**
[Was ist das Problem?]

**Root Cause:**
[Warum existiert das Problem?]

**Alternative Lösungen:**
1. [Option 1 - nicht-destruktiv?]
2. [Option 2 - nicht-destruktiv?]
3. [Geplante Lösung - destruktiv]
```

### 2.2 Schritt 2: Plan dokumentieren (vor Ausführung)
```markdown
**Geplante Änderung:**
[Was genau wird gelöscht/geändert?]

**Betroffene Records:**
[Wie viele? Beispiele?]

**Auswirkungen:**
[Wer/Was ist betroffen?]

**Rollback-Strategie:**
[Wie kann es rückgängig gemacht werden?]
```

### 2.3 Schritt 3: Backup/Export (VOR Änderung)
```bash
# Alle betroffenen Daten EXPORTIEREN:
curl -X GET /.sfs-bd/api/collections/{name}/records?perPage=1000 \
  > backup_{name}_{timestamp}.json

# Schema EXPORTIEREN:
curl -X GET /.sfs-bd/api/collections/{name} \
  > schema_{name}_{timestamp}.json

# In Versionskontrolle COMMITTEN:
git add backups/
git commit -m "backup: {name} before {operation} - DESTRUCTIVE CHANGE"
```

### 2.4 Schritt 4: Wiederherstellung TESTEN (vor Änderung)
```bash
# Sicherstellen, dass Restore-Prozess funktioniert:

1. Test-Environment starten (Kopie)
2. Daten importieren
3. Schema prüfen
4. Login testen
5. Bestätigen: Wiederherstellung möglich ✓
```

### 2.5 Schritt 5: Änderung ausführen (mit Warnung)
```bash
# ERST DANN:
echo "⚠️  DESTRUCTIVE CHANGE: Deleting {name}"
curl -X DELETE /.sfs-bd/api/collections/{name}

# Mit Beweis dokumentieren:
git commit -m "fix: delete {name} - DESTRUCTIVE OPERATION
[Incident report mit Root Cause]
[Restore procedure documented in docs/RESTORE_{name}.md]"
```

---

## 3. KLASSIFIZIERUNG VON ÄNDERUNGEN

### Level 1: SICHER (kein Genehmigung nötig)
- Neue Collections hinzufügen
- Neue Felder hinzufügen (optional)
- Neue Records erstellen
- Update-Operationen auf Daten
- Lesezugriff erweitern (öffentlich machen)

### Level 2: WARNUNG (Backup erforderlich)
- Records löschen (< 10 pro Batch)
- Felder hinzufügen (optional → required)
- API Rules ändern (restriktiver machen)
- Rollen ändern (neue Berechtigung)

### Level 3: KRITISCH (volle Checkliste)
- Collection löschen
- Auth-Konfiguration ändern
- Admin-Benutzer löschen
- Passwort-Hashes ändern
- API Rules öffnen (mehr Zugriff)
- Schema-Migration (Breaking Change)

---

## 4. ESKALATION BEI NOTFALL

**Falls eine destruktive Änderung ungeplant durchgeführt wurde:**

### Sofort:
1. Änderung dokumentieren (was, wann, warum)
2. Backup-Dateien prüfen (sind sie noch vorhanden?)
3. Incident Report erstellen
4. Wiederherstellungs-Plan einleiten

### Beispiel-Report:
```markdown
# Incident: Unbeabsichtigte Löschung

**Was:** admins Collection gelöscht  
**Wann:** 2026-07-26 20:25 UTC  
**Root Cause:** Fehlgeschlagener Fix-Versuch  
**Daten-Verlust:** 2 Benutzer, 0 Backups  
**Status:** KRITISCH  
**Wiederherstellung:** Möglich (Restore-Plan in docs/)
```

### Notfall-Hotline:
- Sofortige Dokumentation
- Parallele Wiederherstellung
- Post-Mortem nach Stabilisierung

---

## 5. WERKZEUGE & AUTOMATION

### 5.1 Backup-Skript (automatisch vor Änderung)

```bash
#!/bin/bash
# File: scripts/pre-change-backup.sh

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="docs/backups/${TIMESTAMP}"

mkdir -p "$BACKUP_DIR"

echo "Creating backups..."
for collection in admins roles role_assignments tournaments players; do
  TOKEN=$(node tools/pb_gen_token.js)
  curl -X GET /.sfs-bd/api/collections/$collection/records?perPage=1000 \
    -H "Authorization: Bearer $TOKEN" \
    > "$BACKUP_DIR/$collection.json"
  
  curl -X GET /.sfs-bd/api/collections/$collection \
    -H "Authorization: Bearer $TOKEN" \
    > "$BACKUP_DIR/${collection}_schema.json"
done

git add "$BACKUP_DIR"
git commit -m "backup: pre-change snapshot - ${TIMESTAMP}"
echo "✓ Backup complete: $BACKUP_DIR"
```

### 5.2 Destructive-Change Blocking

```javascript
// Before any DELETE/PATCH on critical collections:

const CRITICAL_COLLECTIONS = [
  'admins', '_superusers', 'roles', 'role_assignments',
  'users', 'tournament_settings'
];

function assertNotDestructive(operation, collection, severity) {
  if (CRITICAL_COLLECTIONS.includes(collection)) {
    if (operation === 'DELETE') {
      throw new Error(`BLOCKED: Cannot delete ${collection} without approval`);
    }
    if (severity > 2) {
      console.warn(`⚠️  CRITICAL: Changing ${collection}`);
      console.warn(`   Action: ${operation}`);
      console.warn(`   Required: Backup + Restore-Test + Git-Commit`);
    }
  }
}
```

### 5.3 Pre-Change Checklist

```markdown
## Pre-Change Safety Check

- [ ] Root cause documented
- [ ] Alternative solutions considered
- [ ] Backup created and verified
- [ ] Restore procedure tested
- [ ] Incident classification assigned
- [ ] Team notified (if shared project)
- [ ] Git commit prepared with recovery info
- [ ] Approval obtained (if Level 3)

Only proceed if ALL boxes checked.
```

---

## 6. DOKUMENTATION – INCIDENT REPORTS

Jede destruktive Änderung muss dokumentiert werden:

**Format: `docs/INCIDENT_REPORT_{COMPONENT}_{DATE}.md`**

```markdown
# Incident Report: {Component} Change

**Date:** ISO-8601 timestamp
**Severity:** CRITICAL / HIGH / MEDIUM
**Type:** Planned / Unplanned

## Root Cause
[What was the problem?]

## Change Executed
[What was changed?]

## Data Loss
[Records/fields affected]

## Recovery
[How to restore?]

## Prevention
[How to prevent in future?]
```

**Archivierung:** Alle Reports in `docs/incidents/` speichern (für Audit-Trail)

---

## 7. GELTUNG ÜBER ALLE PROJEKTE

Dieser Standard gilt **automatisch und ohne Ausnahme** für:

- ✓ Alle neuen STRATO-Projekte ab 26.07.2026
- ✓ Alle bestehenden Projekte mit Datenpersistenz
- ✓ Alle Umgebungen (Dev, Staging, Production)
- ✓ Alle Team-Mitglieder (Administrator, Developer, Manager)

**Nicht verhandelbar für:**
- Zeitdruck
- "schnelle Fixes"
- "lokale Tests"
- Entwicklungs-Umgebungen (auch diese!)

**Einzige Ausnahme:** Technische Unmöglichkeit (z.B. wenn Backup-Tool nicht funktioniert → wird dokumentiert als "Exception - [Grund]")

---

## 8. VERPFLICHTUNG & UNTERSCHRIFT

Diese Checkliste ist **rechtsverbindlich** für alle zukünftigen Arbeiten an kritischen Komponenten.

**Akzeptiert am:** 26.07.2026 21:50 UTC  
**Grund:** Incident der admins Collection Löschung  
**Lerneffekt:** Präventiv statt reaktiv

---

## 9. INCIDENT LESSONS APPLIED

### Was hätte verhindert werden können:

| Hätte geholfen | Status | Wann eingeführt |
|----------------|--------|-----------------|
| Pre-delete Backup | NEU | SOFORT |
| Restore-Test vor Änderung | NEU | SOFORT |
| Approval-Gate für Level 3 | NEU | NÄCHSTE WOCHE |
| Automation für kritische Ops | NEU | NÄCHSTER MONAT |
| Incident-Report-Template | NEU | SOFORT |

---

## 10. KONTAKT FÜR FRAGEN

Bei Fragen zu diesem Mandat:

1. Dokumentation in `docs/CRITICAL_INFRASTRUCTURE_PROTECTION_MANDATE.md` lesen
2. Incident Report von 26.07.2026 studieren
3. Pre-Change-Checklist befolgen
4. Im Zweifelsfall: Backup erstellen, Restore testen, dann handeln

---

**DIESER STANDARD IST JETZT AKTIV.**

Jede zukünftige destruktive Änderung ohne Befolgung dieser Checkliste ist ein **Projektrisiko** und wird dokumentiert als **Compliance-Verletzung**.

**Ziel:** Datenverlust vermeiden, Vertrauen bewahren, Systeme schützen.

