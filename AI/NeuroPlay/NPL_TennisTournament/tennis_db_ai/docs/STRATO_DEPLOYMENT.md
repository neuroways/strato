# STRATO Deployment – Tennis-Turnier-Management-System

## Umgebungen

| Umgebung | URL | Zweck |
|----------|-----|-------|
| Development | `/.sfs-bd/` | Entwicklung + lokale Tests |
| Production | `/.sfs-be/` | Live-System |

---

## Prädeployment-Checklist (Development)

Vor der Freigabe für Production muss **alles auf Dev funktionieren**:

- [ ] **Code kompiliert**
  ```bash
  npm run build
  # Muss ohne Fehler durchlaufen
  ```

- [ ] **SETUP_CHECKLIST.md abgearbeitet**
  - [ ] 8 öffentliche Collections: API Rules leer
  - [ ] 4 Admin-Collections: API Rules auf `@request.auth.collectionId = "admins"`
  - [ ] Alle öffentlichen Seiten getestet (kein 403)
  - [ ] Admin-Bereich getestet (Login + Dashboard funktioniert)

- [ ] **Öffentliche Website funktioniert**
  - [ ] Startseite lädt Turnierdaten
  - [ ] Spielplan zeigt Runden + Spiele
  - [ ] Ergebnisse angezeigt
  - [ ] Teilnehmer-Liste funktioniert
  - [ ] News + Ankündigungen sichtbar
  - [ ] Kontaktformular funktioniert

- [ ] **Admin-Bereich funktioniert**
  - [ ] Admin-Login erfolgreich
  - [ ] Dashboard lädt
  - [ ] Alle Management-Seiten erreichbar
  - [ ] Daten können bearbeitet werden
  - [ ] Neue Daten erscheinen auf öffentlichen Seiten (nach Refresh)

- [ ] **Datenbank intakt**
  - [ ] 15 Collections vorhanden
  - [ ] Test-Daten geladen
  - [ ] Keine Duplikate oder Fehler
  - [ ] Relationen funktionieren

- [ ] **Dokumentation vollständig**
  - [ ] SETUP_CHECKLIST.md existiert
  - [ ] STRATO_DEPLOYMENT.md existiert
  - [ ] STRATO_ARCHITECTURE_ANALYSIS.md existiert
  - [ ] docs/database/DATABASE.md existiert

---

## Schema-Migration zu Production

### Automatisch durch STRATO

```bash
pb_migrate_sfs.js --live
```

**Was passiert:**
- Alle Collections von `/.sfs-bd/` zu `/.sfs-be/` kopiert
- Schema wird migriert (Felder, Typen, Relationen)
- **NICHT migriert:** API Rules, Testdaten, bestehende Produktions-Daten

**Dauer:** ~1-2 Minuten

**Manuell vorher prüfen:**
```bash
# Check ob Schema auf Dev korrekt ist
curl -s --unix-socket /run/cm4all/http/tie.socket \
  http://localhost/.sfs-bd/api/collections?perPage=500 \
  -H "Authorization: Bearer $(node /etc/goose/skills/pocketbase/tools/pb_gen_token_sfs.js)"
```

---

## Postdeployment-Schritte (Production)

### Schritt 1: API Rules auf Production setzen

**WICHTIG:** Rules werden **nicht** migriert! Sie müssen manuell gesetzt werden.

**URL:** `/.sfs-be/admin/`

**Öffentliche Collections (8) – API Rules leer lassen:**

Für jede Collection:
1. Klick auf Collection
2. Tab "API Rules"
3. Alle 5 Felder **leer lassen** (null/default)
4. Speichern

Collections:
- tournaments
- players
- rounds
- matches
- announcements
- courts
- results
- info_sections

**Admin-Collections (4) – API Rules schützen:**

Für jede Collection:
1. Klick auf Collection
2. Tab "API Rules"
3. Alle 5 Felder mit diesem Text ausfüllen: `@request.auth.collectionId = "admins"`
4. Speichern

Collections:
- tournament_settings
- registrations
- match_players
- ai_schedule_runs

**Dauer:** ~10 Minuten

### Schritt 2: Production-Website testen

**URLs:**

- **Öffentliche Website:** `/.sfs-be/` (oder deine Custom-Domain)
- **Admin-Panel:** `/.sfs-be/admin/`

**Öffentliche Seiten testen (sollten alle Daten zeigen):**

- [ ] Startseite → "Tennis Turnier 2026" angezeigt?
- [ ] Turniere → Liste angezeigt?
- [ ] Spielplan → Runden + Spiele angezeigt?
- [ ] Ergebnisse → Resultate angezeigt?
- [ ] Teilnehmer → Spieler-Liste angezeigt?
- [ ] News → Ankündigungen angezeigt?
- [ ] Plätze → Courts angezeigt?
- [ ] Kontakt → Kontaktformular angezeigt?

**Keine 403-Fehler?** ✅ Öffentliche Seite funktioniert

**Admin-Bereich testen:**

- [ ] Login mit Admin-Credentials erfolgreich?
- [ ] Dashboard lädt?
- [ ] Alle Management-Seiten erreichbar?
- [ ] Neue Daten können eingegeben werden?
- [ ] Neue Daten erscheinen auf öffentlicher Website (nach Refresh)?

**Alles grün?** ✅ Production ist bereit

### Schritt 3: Go Live

Wenn alle Tests bestanden:

```
✅ Production Website ist live
✅ Admin-Panel funktioniert
✅ Öffentliche Inhalte sichtbar
✅ Admin-Daten geschützt
```

---

## Monitoring & Wartung

### Fehlerbehandlung

**Problem:** Nach Deployment zeigen öffentliche Seiten 403-Fehler

**Lösung:**
1. Hast du Schritt 2 (API Rules auf Production) gemacht?
2. Waren alle 8 Collections auf "leer"?
3. Prüfe in `/.sfs-be/admin/` noch mal alle Rules

**Problem:** Admin-Login funktioniert nicht auf Production

**Ursache:** Auth-Token ist lokal. Login neu erforderlich.

**Lösung:**
1. Öffne `/.sfs-be/admin/`
2. Melde dich mit Admin-Credentials an
3. Neuer Token wird generiert

**Problem:** Neue Daten erscheinen nicht auf öffentlicher Website

**Ursache:** Vermutlich Cache oder Datenbankverbindung

**Lösung:**
1. Öffentliche Website: Browser-Cache leeren (Ctrl+Shift+Delete)
2. Prüfe, ob Daten in DB gespeichert wurden (Admin-Panel)
3. Prüfe Network-Tab: API-Response 403 oder 200?

### Sicherheit überprüfen

Regelmäßig prüfen (z.B. monatlich):

- [ ] Sind alle Admin-Collections wirklich geschützt?
- [ ] Hat jeder Admin-Account aktiv werden sollen?
- [ ] Gibt es unauthorisierte Zugriffe? (Logs prüfen)
- [ ] Wurden neue Collections korrekt gesichert?

---

## Rollback-Plan

Falls ein großes Problem auf Production:

### Szenario 1: Falsche API Rules gesetzt

**Symptom:** Öffentliche Website zeigt 403 oder Admin-Seite zeigt keine Daten

**Rollback:**
1. PocketBase Admin öffnen (`.sfs-be/admin/`)
2. Collections auf vorherige Rules zurücksetzen
3. Website testen
4. Root Cause analysieren
5. Rules korrekt setzen + erneut testen

**Dauer:** ~5 Minuten

### Szenario 2: Schema-Migration fehlgeschlagen

**Symptom:** Collections fehlen oder sind beschädigt

**Rollback:**
1. Production Database Backup laden (falls vorhanden)
2. Oder: Erneute Migration von Dev
3. API Rules neu setzen
4. Tests

**Dauer:** ~15 Minuten

### Szenario 3: Notfall-Downtime

**Schnellste Notlösung:**
1. Öffentliche Website offline stellen (unter Wartung)
2. Dev-System als temporärer Fallback
3. Probleme analysieren
4. Fix durchführen
5. Testing
6. Wiederherstellen

**Kommunikation:** Admin über Status informieren

---

## Häufig gestellte Fragen

**F: Warum bekomme ich nach dem Deployment 403-Fehler auf der öffentlichen Website?**

A: API Rules wurden nicht gesetzt oder falsch. Öffne `/.sfs-be/admin/` und gehe zur Collection. Die Rules sollten leer sein (null) für öffentliche Collections.

---

**F: Können Daten von Dev zu Production kopiert werden?**

A: Die Migration kopiert nur das Schema (Struktur), nicht die Daten. Testdaten müssen manuell neu angelegt werden oder via SQL-Export/Import.

---

**F: Admin-Login funktioniert auf Dev, aber nicht auf Production?**

A: Auth-Token ist umgebungsspezifisch. Du musst dich auf Production neu anmelden (`.sfs-be/admin/`). Dann funktioniert es.

---

**F: Wie oft sollte ich auf Production testen?**

A: Mindestens:
- Nach jeder Änderung am Code
- Nach jeder neuen Collection
- Nach Updates der API Rules
- Wöchentlich zur Routine-Überprüfung

---

**F: Was passiert, wenn ich versehentlich eine Collection lösche?**

A: Gelöschte Collections sind in der Datenbank weg. Du müsstest das Backup zurückfahren oder die Collection neu erstellen + Daten reimportieren. Deshalb: Vorsicht und Backups!

---

## Checkliste für Live-Start

Wenn alles funktioniert, abhaken:

- [ ] Alle öffentlichen Seiten zeigen Daten (kein 403)
- [ ] Admin-Bereich funktioniert (Login + Datenbearbeitung)
- [ ] API Rules korrekt gesetzt
- [ ] Test-Daten sind aktuell
- [ ] Dokumentation ist aktuell
- [ ] Team ist informiert
- [ ] Backups sind eingerichtet
- [ ] Monitoring läuft

**Status: ✅ LIVE**

---

## Support & Kontakt

Bei Fragen zum Deployment:

1. Dokumentation prüfen: siehe `docs/`
2. SETUP_CHECKLIST.md nochmal durchlesen
3. STRATO_ARCHITECTURE_ANALYSIS.md für Hintergrund
4. Tech-Team kontaktieren mit: Fehlermeldung + Screenshot + Environment (Dev/Prod)
