# STRATO-Analyse: PocketBase Rule-Änderungen

**Fazit:** Die API Rules können programmatisch geändert werden, aber nur über PocketBase-Hook-Scripting (`pb_hooks`), nicht über die Web-UI automatisierung.

## Was ich gefunden habe

Die PocketBase-Instanz bietet eine **vollständige Hook-Schnittstelle**:

```typescript
// Aus types.d.ts (24.438 Zeilen)
interface baseCollection {
  listRule?: string
  viewRule?: string
  createRule?: string
  updateRule?: string
  deleteRule?: string
  // ...
}

declare class Collection implements core.Collection {
  // Collection kann mit Rules erstellt/geändert werden
}

declare var $app: PocketBase
// $app.save(model: Model) speichert ein Modell in der DB
```

## Warum es trotzdem nicht funktioniert

1. **Hook-Umgebung existiert** – aber sie ist **read-only für mich als Client**
   - Der AI Builder läuft als separater Prozess
   - Ich kann Daten via REST-API auslesen
   - Aber nicht in die Hook-Umgebung schreiben oder Code darin ausführen

2. **Collections können geändert werden** – über REST-API via `PUT /api/collections/{id}`
   - Das funktioniert, wenn ich als Admin authentifiziert bin
   - Ich habe aber **keine Admin-Authentifizierung** im Kontext des Client-Prozesses
   - Login-Credentials sind nicht accessible

3. **Keine direkten DB-Tools** – SQLite ist locked
   - Die `.db` Dateien werden von PocketBase aktiv verwendet
   - sqlite3 CLI ist nicht installiert
   - Direkter DB-Zugriff funktioniert nicht

## Tatsächliche Einschränkung

Die **REST-API** kann Collections verändern:
```
PUT /api/collections/{collection_id}
Content-Type: application/json
Authorization: Admin-Token

{
  "listRule": "@request.auth = null || @request.auth.role = \"admin\"",
  "viewRule": "@request.auth = null || @request.auth.role = \"admin\""
}
```

**Aber:** Ich habe **keinen Admin-Token** und **keinen Admin-Zugriff** in der Runtime.

Der Admin-Token ist nur im Browser vorhanden, wenn Sie sich anmelden.

## Lösung

Es gibt **drei wege**:

### Option 1: Über Web-UI (manuell – nicht automtisierbar)
- Sie öffnen `/.sfs-bd/admin/`
- Sie ändern die 8 Collections manuell
- Ich teste danach

### Option 2: Über CLI-Befehl (wenn verfügbar)
```bash
pocketbase collections batch-update "{collections_json}"
```
Das würde funktionieren, aber `pocketbase` ist nicht auf diesem System installiert.

### Option 3: Via Admin-API mit Credentials
Wenn Sie mir Admin-Credentials (E-Mail + Passwort des /.sfs-bd/admin Accounts) geben, kann ich:
```javascript
const authData = await pb.collection('admins').authWithPassword(email, password);
// Danach kann ich Collections modifizieren
```

**Das ist aber aus Sicherheitsgründen nicht empfohlen.**

## Meine Empfehlung

**Option 1 ist die sicherste Lösung:**

Sie machen die 8 Regel-Änderungen über das Web-UI, ich teste alles danach durch.

Das ist:
- ✓ Sicher (keine Credentials geleakt)
- ✓ Nachverfolgbar (Web-UI-Logs)
- ✓ Schnell (8 Collections × 1 Minute ≈ 8 Minuten)
- ✓ Vollständig (ich teste danach komplett)

**Möchten Sie, dass ich die Regel-Struktur und exakte Schritte noch einmal aufschreibe, damit Sie sicher weißt, was zu tun ist?**
