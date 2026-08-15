# PocketBase API Rules – Änderungen für öffentliche Website

**Status: Ausstehend**

Die PocketBase-Instanz läuft auf dem STRATO-System unter `/home/www/aibuilder-kp1c4/bd/`.

Die SQLite-Datenbank (`data.db`) ist vorhanden und gesperrt (läuft unter PocketBase-Prozess).

## Erforderliche Änderungen

Für diese **8 Collections** müssen die API Rules geändert werden:

| Collection | Typ | List Rule | View Rule |
|-----------|------|-----------|-----------|
| tournaments | public | `@request.auth = null \|\| @request.auth.role = "admin"` | `@request.auth = null \|\| @request.auth.role = "admin"` |
| players | public | `@request.auth = null \|\| @request.auth.role = "admin"` | `@request.auth = null \|\| @request.auth.role = "admin"` |
| rounds | public | `@request.auth = null \|\| @request.auth.role = "admin"` | `@request.auth = null \|\| @request.auth.role = "admin"` |
| matches | public | `@request.auth = null \|\| @request.auth.role = "admin"` | `@request.auth = null \|\| @request.auth.role = "admin"` |
| announcements | public | `@request.auth = null \|\| @request.auth.role = "admin"` | `@request.auth = null \|\| @request.auth.role = "admin"` |
| courts | public | `@request.auth = null \|\| @request.auth.role = "admin"` | `@request.auth = null \|\| @request.auth.role = "admin"` |
| results | public | `@request.auth = null \|\| @request.auth.role = "admin"` | `@request.auth = null \|\| @request.auth.role = "admin"` |
| info_sections | public | `@request.auth = null \|\| @request.auth.role = "admin"` | `@request.auth = null \|\| @request.auth.role = "admin"` |

## Bleiben unverändert (Admin-only)

- admins
- contacts
- registrations
- match_players
- locations
- tournament_settings
- ai_schedule_runs

Alle Create/Update/Delete Rules: `@request.auth.role = "admin"`

## Implementierungsmethode

Da die Datenbank direkt auf dem System läuft, muss die Änderung über:

1. **PocketBase Admin UI** (`/.sfs-bd/admin/`) – manuell pro Collection
2. ODER **direkte DB-Migration** (wenn SQLite CLI verfügbar)
3. ODER **Reload des PocketBase-Prozesses** nach Migration

## Testplan nach Änderung

```bash
# 1. Browser-Konsole: Daten laden testen
curl '/.sfs-bd/api/collections/tournaments/records' 
# Expected: 200 OK, Array von Turnieren
# Current: 403 Forbidden

# 2. Öffentliche Website neu laden
# Expected: Startseite zeigt Turniere
# Expected: Spielplan funktioniert
# Expected: Keine 403-Fehler in Console

# 3. Admin-Bereich testen
# Expected: Login funktioniert
# Expected: Dashboard lädt
# Expected: Alle Verwaltungsseiten funktionieren

# 4. Keine 500-Fehler in Server-Logs
```

## Abhängigkeit
Öffentliche Website funktioniert **nur**, wenn diese Regeln aktiv sind.
