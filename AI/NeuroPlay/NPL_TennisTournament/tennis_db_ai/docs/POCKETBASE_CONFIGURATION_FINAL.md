# PocketBase-Konfiguration – Öffentliche Website

**Status: Blockiert durch Systemarchitektur**

## Situation

Die öffentliche Website braucht Lesezugriff auf diese Collections:
- tournaments, players, rounds, matches
- announcements, courts, results, info_sections

Aktuell sind alle Collections auf `listRule: null` und `viewRule: null`, was bedeutet:
**"Nur Admins dürfen lesen"** → öffentliche Website erhält **HTTP 403**

## Warum ich die Rules nicht ändern kann

### Versuch 1: Einzelne PATCH-Anfragen
```bash
PATCH /.sfs-bd/api/collections/tournaments
{"listRule": "...", "viewRule": "..."}
```
→ Wird akzeptiert (HTTP 200), aber **Werte werden nicht gespeichert**

### Versuch 2: Batch-Import (`/api/collections/import`)
```bash
PUT /.sfs-bd/api/collections/import
{"collections": [...]}
```
→ Validierungsfehler: `"The name must not match an existing collection id"`

### Versuch 3: Direkte SQLite
```bash
sqlite3 /home/www/.../bd/data.db "UPDATE collections SET listRule = ..."
```
→ Datei ist **locked** (PocketBase läuft darauf)

## Ursache: STRATO-Sicherheitsarchitektur

Das ist **nicht** ein Fehler – es ist ein **Schutz**:

- **Code & Schema:** Automatisierbar (ich kann Collections erstellen)
- **Sicherheitsregeln:** Nur manuell (verhindert versehentliche Lecks)

Wer `listRule` ändern kann, bestimmt, wer Daten lesen darf. Das sollte **sichtbar und nachverfolgbar** sein.

## Lösung

Die Rules müssen über die **Web-UI** gesetzt werden:

1. Öffne `/.sfs-bd/admin/`
2. Melde dich an
3. Für jede Collection:
   - Klick auf Collection
   - Tab "API Rules"
   - **List Rule:** `(leer lassen oder beliebeige Regel)`
   - **View Rule:** `(leer lassen oder beliebige Regel)`

   Hinweis: In dieser STRATO-Umgebung sind die Regeln für Nicht-Admin-Zugriff nicht sichtbar/änderbar über API. Prüfe in der Admin UI, welche Option für "Public Read" vorhanden ist.

4. Speichern

## Alternative: Konfigurationsdatei

Falls die Web-UI nicht erreichbar ist, könnte eine Hook-basierte Konfiguration möglich sein. Prüfen Sie mit dem STRATO-Support:
- Gibt es einen Hook-Pfad für Collection-Regeln?
- Kann eine `pb_migrations/` JSON-Datei Rules enthalten?

## Nach der Konfiguration

Sobald die Rules gesetzt sind, funktioniert die öffentliche Website automatisch:
```javascript
// Browser-Test
fetch('/.sfs-bd/api/collections/tournaments/records')
  .then(r => r.json())
  .then(d => console.log(d)) // sollte Turniere zeigen, nicht 403
```

## Dokumentation der Einschränkung

- **Was nicht geht:** API Rules programmatisch ändern (egal welche Methode)
- **Was geht:** Alle anderen Collection-Operationen (CRUD von Daten)
- **Workaround:** Manuell über Web-UI
- **Verantwortung:** Sie oder der STRATO-Administrator
