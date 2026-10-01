# API-Dokumentation – PocketBase Integration

## Übersicht

Die gesamte Datenbank-Kommunikation läuft über PocketBase REST API, abstrahiert durch zwei Utility-Module:

- **`src/lib/pb.ts`** – SDK-Instanz & Collection-Namen
- **`src/lib/api.ts`** – High-level API-Funktionen

---

## pb.ts – SDK & Collection-Registry

### PocketBase-Instanz

```typescript
import PocketBase from 'pocketbase';

export const pb = new PocketBase();
```

**Konfiguration:**
- Automatische Platform-Routing (dev: `/.sfs-bd/`, prod: `/.sfs-be/`)
- Keine manuelle URL-Angabe erforderlich
- Token-Persistierung in localStorage

### Collection-Namen Registry

```typescript
export const COLLECTIONS = {
  tournaments: 'tournaments',
  tournament_settings: 'tournament_settings',
  locations: 'locations',
  courts: 'courts',
  players: 'players',
  contacts: 'contacts',
  registrations: 'registrations',
  rounds: 'rounds',
  matches: 'matches',
  match_players: 'match_players',
  results: 'results',
  info_sections: 'info_sections',
  announcements: 'announcements',
  ai_schedule_runs: 'ai_schedule_runs',
  admins: 'admins'
} as const;
```

**Verwendung:** `COLLECTIONS.players` statt Strings → Type-Safety

---

## api.ts – High-Level Funktionen

### getRecords()

Fetch mit optionalen Filter/Sort/Pagination.

```typescript
async function getRecords(
  collectionName: string,
  options: QueryOptions = {}
): Promise<any[]>

interface QueryOptions {
  filter?: string;        // PocketBase filter expression
  sort?: string;          // "-created" für DESC
  page?: number;          // Default 1
  perPage?: number;       // Default 50
  signal?: AbortSignal;   // Für Request-Cancellation
}
```

**Beispiele:**

```typescript
// Alle Spieler
const players = await getRecords(COLLECTIONS.players);

// Gefiltert und sortiert
const matches = await getRecords(COLLECTIONS.matches, {
  filter: 'status = "scheduled"',
  sort: 'match_date',
  perPage: 100
});

// Mit AbortSignal (für useEffect Cleanup)
const controller = new AbortController();
const data = await getRecords(COLLECTIONS.players, {
  signal: controller.signal
});
return () => controller.abort();
```

**Error Handling:**
- AbortError wird stille ignoriert (erwartete Cancellation)
- Andere Fehler werden geworfen und geloggt

---

### getRecord()

Fetch eines einzelnen Datensatzes.

```typescript
async function getRecord(
  collectionName: string,
  recordId: string,
  signal?: AbortSignal
): Promise<any>
```

**Beispiel:**

```typescript
const tournament = await getRecord(
  COLLECTIONS.tournaments,
  'abc123def456'
);
```

---

### createRecord()

Neuer Datensatz (Create in CRUD).

```typescript
async function createRecord(
  collectionName: string,
  data: any,
  signal?: AbortSignal
): Promise<any>
```

**Beispiel:**

```typescript
const newPlayer = await createRecord(COLLECTIONS.players, {
  first_name: 'Max',
  last_name: 'Müller',
  email: 'max@tennis.local',
  skill_level: 'advanced'
});
// Returns: { id: 'auto-generated-id', ...data, created, updated }
```

---

### updateRecord()

Datensatz ändern (Update in CRUD).

```typescript
async function updateRecord(
  collectionName: string,
  recordId: string,
  data: any,
  signal?: AbortSignal
): Promise<any>
```

**Beispiel:**

```typescript
await updateRecord(
  COLLECTIONS.players,
  'abc123',
  { skill_level: 'professional' }
);
// Only updated fields need to be in data
```

---

### deleteRecord()

Datensatz löschen (Delete in CRUD).

```typescript
async function deleteRecord(
  collectionName: string,
  recordId: string,
  signal?: AbortSignal
): Promise<void>
```

**Beispiel:**

```typescript
await deleteRecord(COLLECTIONS.players, 'abc123');
```

---

### getFirstRecord()

Fetch eines Records mit Filter (für Singletons).

```typescript
async function getFirstRecord(
  collectionName: string,
  filter: string,
  signal?: AbortSignal
): Promise<any>
```

**Beispiel:**

```typescript
const settings = await getFirstRecord(
  COLLECTIONS.tournament_settings,
  'tournament_id = "xyz789"'
);
```

**Besonderheit:** Gibt null zurück wenn nicht gefunden (404 wird abgefangen).

---

### countRecords()

Zähle Datensätze (optional gefiltert).

```typescript
async function countRecords(
  collectionName: string,
  filter?: string
): Promise<number>
```

**Beispiele:**

```typescript
const totalPlayers = await countRecords(COLLECTIONS.players);

const confirmedRegs = await countRecords(
  COLLECTIONS.registrations,
  'status = "confirmed"'
);
```

---

## Authentication API

### adminLogin()

PocketBase-Auth mit Email/Passwort.

```typescript
async function adminLogin(
  email: string,
  password: string
): Promise<any>
```

**Beispiel:**

```typescript
try {
  const authData = await adminLogin('admin@tennis.local', 'password123');
  // Token wird automatisch in pb.authStore gespeichert
  // Redirect zu /admin/dashboard
} catch (err) {
  // "Anmeldung fehlgeschlagen"
}
```

---

### adminLogout()

Löscht Token und Auth-State.

```typescript
function adminLogout(): void
```

**Beispiel:**

```typescript
adminLogout();
navigate('/admin/login');
```

---

### isAdminLoggedIn()

Prüf aktuellen Auth-Status.

```typescript
function isAdminLoggedIn(): boolean
```

**Beispiel:**

```typescript
if (isAdminLoggedIn()) {
  // Show admin panel
}
```

---

### getCurrentAdmin()

Fetch aktuell angemeldeten Admin.

```typescript
function getCurrentAdmin(): any
```

**Beispiel:**

```typescript
const admin = getCurrentAdmin();
console.log(admin.email); // admin@tennis.local
```

---

## useAuthRefresh Hook

Token auf App-Startup refreshen.

```typescript
function useAuthRefresh(): void
```

**Verwendung in App.jsx:**

```typescript
export default function App() {
  useAuthRefresh(); // Call once at root level
  // ...
}
```

**Logik:**
- Nur ausführen wenn Token existiert
- Token-Expiration-Handling
- Logout bei Fehler

---

## Filter-Syntax (PocketBase)

Alle Filter folgen PocketBase-Regeln:

```
// Simple
status = "scheduled"

// Vergleiche
score > 50
tournament_date >= "2025-06-15"

// Kombinationen
(status = "scheduled" && tournament_id = "xyz") || status = "live"

// Relation-Filter (wichtig!)
tournament_id = "xyz"                    // ✓ Correct
tournament_id.name = "Neindorf"          // ✓ Nested

// NICHT:
tournament_id = tournament_id.name       // ✗ Invalid
```

---

## Abort-Signal Handling

Alle Funktionen unterstützen AbortSignal für Cleanup:

```typescript
export function SomeComponent() {
  useEffect(() => {
    const controller = new AbortController();

    getRecords(COLLECTIONS.players, { signal: controller.signal })
      .then(data => setState(data))
      .catch(err => {
        if (err?.isAbort || err?.name === 'AbortError') {
          return; // Silently ignore (expected cleanup)
        }
        // Handle real errors
      });

    return () => controller.abort(); // Cleanup on unmount
  }, []);
}
```

---

## Error Handling Strategy

```typescript
try {
  const data = await getRecords(collectionName);
} catch (err) {
  // PocketBase errors have structure:
  // err.status, err.message, err.data.errors

  if (err?.status === 404) {
    setError('Nicht gefunden');
  } else if (err?.status === 403) {
    setError('Keine Berechtigung');
  } else if (err?.isAbort) {
    // Request cancelled (expected)
    return;
  } else {
    setError(err?.message || 'Fehler');
  }
}
```

---

## Performance & Limits

| Limit | Wert | Grund |
|-------|------|-------|
| Max Records per Request | 100 | Admin-UI Default |
| Max Filter Depth | ∞ | PocketBase unlimited |
| Max Request Size | 1MB | Platform default |
| Rate Limit | None | Development |

---

## Development vs Production

| Aspekt | Dev | Prod |
|--------|-----|------|
| API Base | `/.sfs-bd/api` | `/.sfs-be/api` |
| Database | `bd/data.db` | `be/data.db` |
| Data | Testdaten | Leer beim Publish |
| Auth Token | Dev Token | Live Token |

**Wichtig:** Tokens von dev funktionieren nicht in prod!

---

## Häufige Patterns

### Get + Filter
```typescript
const matches = await getRecords(COLLECTIONS.matches, {
  filter: `tournament_id = "${tournamentId}"`,
  sort: 'match_date'
});
```

### Create + Redirect
```typescript
const newRecord = await createRecord(COLLECTIONS.players, formData);
navigate(`/admin/players/${newRecord.id}`);
```

### Update + Refresh
```typescript
await updateRecord(COLLECTIONS.tournament_settings, id, newSettings);
setRefreshKey(k => k + 1); // Trigger table reload
```

### Delete + Confirm
```typescript
if (window.confirm('Wirklich löschen?')) {
  await deleteRecord(COLLECTIONS.players, id);
  setRecords(records.filter(r => r.id !== id));
}
```

### Login Flow
```typescript
await adminLogin(email, password);
// Token now in pb.authStore
navigate('/admin/dashboard');
```

---

## TypeScript Types

Siehe `src/lib/types.ts` für vollständige Typisiung:

```typescript
import {
  Tournament,
  Player,
  Registration,
  Match,
  Result,
  // ... alle 15 Collections
} from '@/lib/types';

const tournament: Tournament = await getRecord(...);
```

---

## Caching & Optimization

**Aktuell:** Keine Caching-Ebene (jeder Request geht direkt zur DB)

**Mögliche Verbesserungen:**
- React Query für Request-Deduplicating
- LocalStorage-Cache für häufig abgerufene Collections
- Pagination mit Cursor statt Offset
