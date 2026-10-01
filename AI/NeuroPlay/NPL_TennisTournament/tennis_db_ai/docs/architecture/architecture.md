# Architektur-Dokumentation

## System-Übersicht

```
┌─────────────────────────────────────────────────────────────┐
│ Browser – React Frontend (Admin UI + Public Site)          │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ React Router (Client-Side Navigation)               │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓↑                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ PocketBase SDK (API Client)                         │  │
│  │ - HTTP Requests                                     │  │
│  │ - Token Management                                  │  │
│  │ - Auth State                                        │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          ↓↑
┌─────────────────────────────────────────────────────────────┐
│ PocketBase Server (/.sfs-bd/ dev, /.sfs-be/ prod)         │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ REST API                                            │  │
│  │ - GET /collections/:name/records                    │  │
│  │ - POST /collections/:name/records                   │  │
│  │ - PATCH /collections/:name/records/:id              │  │
│  │ - DELETE /collections/:name/records/:id             │  │
│  │ - POST /collections/admins/auth-with-password       │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ SQLite Database                                     │  │
│  │ - 15 Collections                                    │  │
│  │ - All Tournament Data                               │  │
│  │ - Admin Accounts                                    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Datenfluss

### Admin Login

```
1. User trägt Credentials in <AdminLogin /> ein
2. handleLogin() ruft adminLogin(email, password) auf
3. apiLogin() → pb.collection('admins').authWithPassword()
4. PocketBase generiert JWT Token
5. SDK speichert Token in localStorage
6. Redirect zu /admin/dashboard
7. ProtectedRoute prüft isAdminLoggedIn()
```

### CRUD-Operation (Create)

```
1. Admin klickt "Hinzufügen" in <CRUDTable />
2. handleAdd() öffnet <EditModal /> mit record=null
3. Admin füllt Formular aus und klickt "Speichern"
4. EditModal.handleSubmit() ruft createRecord() auf
5. api.createRecord() → pb.collection(name).create(data)
6. PocketBase speichert Datensatz
7. onSuccess() Callback
8. CRUDTable wird via refreshKey neu geladen
9. Neue Zeile erscheint in Tabelle
```

### Search

```
1. User trägt Suchterm in CRUDTable-Search ein
2. searchTerm State wird aktualisiert
3. useEffect mit searchTerm Dependency lädt Daten neu
4. Daten werden gefiltert (Client-seitig)
5. Tabelle wird mit gefilterten Ergebnissen aktualisiert
```

### Data Sync Admin → Public

```
1. Admin ändert Tournament-Status auf "open"
2. updateRecord() speichert in DB
3. Public Homepage lädt Turniere mit filter: status = "open"
4. Geänderte Turniere erscheinen sofort auf Homepage
```

---

## Komponenten-Hierarchie

```
<App />
├── <Route path="/admin/login">
│   └── <AdminLogin />
│
└── <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
    ├── <Route path="/admin/dashboard" element={<AdminDashboard />} />
    │
    ├── <Route path="/admin/tournaments" element={<TournamentManagement />} />
    │   ├── <CRUDTable />
    │   └── <EditModal />
    │
    ├── <Route path="/admin/players" element={<PlayerManagement />} />
    │   ├── <CRUDTable />
    │   └── <EditModal />
    │
    └── ... weitere Management Pages ...
```

---

## Authentication & Authorization

### Authentifizierung (AuthN)

**Ablauf:**
1. PocketBase `admins` Collection speichert Benutzer
2. Login setzt JWT Token in localStorage
3. SDK sendet Token automatisch in jedem Request

**Token Lifecycle:**
- Generiert bei Login
- Automatisch bei App-Start refreshed (useAuthRefresh)
- Gelöscht bei Logout

### Autorisierung (AuthZ)

**Aktuell: Einfaches Modell**
- Angemeldet = Admin mit vollen Rechten
- Nicht angemeldet = Kein Zugriff auf /admin

**Möglich in Zukunft:**
- Role-basierte Kontrolle (Tournier-Manager, Ergebnis-Eingabe, etc.)
- Collection-Level Permissions in PocketBase

---

## State Management

### Global State (PocketBase)

```javascript
pb.authStore // Token, Record, isValid
```

Wird automatisch persistiert und auf Login/Logout aktualisiert.

### Local Component State

Jede Management-Page verwaltet:
- `editingRecord` – gerade bearbeiteter Datensatz
- `showModal` – Modal-Sichtbarkeit
- `refreshKey` – Trigger für Tabellen-Reload

Keine Redux, keine Context-API → einfacher, keine Prop-Drilling.

---

## Error Handling Strategy

```
Frontend Error Handler
├── Network Error (Connection)
│   └── "Keine Verbindung zum Server"
├── Auth Error (401)
│   └── Logout, Redirect zu /admin/login
├── Validation Error (400)
│   └── Form-spezifische Fehler anzeigen
├── Not Found (404)
│   └── "Datensatz nicht gefunden"
├── Abort Error (Request cancelled)
│   └── Stille ignorieren (erwartete Cleanup)
└── Other Error
    └── Generic "Fehler" Message + Console Log
```

---

## Data Consistency

**Keine Cached Data:**
- Jeder Seitenload = Fresh Data von DB
- Keine Stale Data
- Keine Sync-Probleme zwischen Tabs

**Datensatz-Locks:**
- Nicht implementiert
- Wenn mehrere Admins gleichzeitig editieren → Last-Write-Wins
- Möglich: Optimistic Locking mit Version-Feldern

**Validation:**
- Client-seitig: Required-Checks
- Server-seitig: PocketBase validiert gegen Schema

---

## Performance

### Current State

**Positiv:**
- HTTP/2 ✓
- Client-side Rendering (schnelle Navigation)
- Small Bundle Size (~300KB gzipped)
- Lazy-loaded Routes

**Suboptimal:**
- Alle Collections werden pro Page neu geladen (kein Caching)
- Alle Einträge in Dropdowns werden auf einmal geladen
- Pagination hardcoded auf 100 Items

### Future Optimizations

```
1. React Query → Request Deduplication
2. useMemo → Component Memoization
3. Pagination UI → Cursor-based
4. Dropdown Caching → Limit to 20, Searchable
5. Lazy Components → Code Splitting
```

---

## Security

### Current Measures

✓ PocketBase JWT Authentication
✓ ProtectedRoute auf Admin-Pages
✓ Passwort-Hashing durch PocketBase
✓ No Secrets in Frontend Code
✓ HTTP-Only Token (localStorage, aber nur httpOnly in API)

### Not Implemented

✗ CSRF Protection (PocketBase handles)
✗ Rate Limiting (PocketBase handles)
✗ Input Sanitization (Validate, but no XSS protection)
✗ 2FA / MFA
✗ Audit Logging (except ai_schedule_runs)

---

## Database Schema → Code Mapping

### Collections in Code

```typescript
// Defined in src/lib/pb.ts
COLLECTIONS.tournaments
COLLECTIONS.players
COLLECTIONS.matches
// ... etc
```

### API Methods per Collection

```typescript
// Generic (can be used for any collection):
getRecords(COLLECTIONS.tournaments)
createRecord(COLLECTIONS.tournaments, data)
updateRecord(COLLECTIONS.tournaments, id, data)
deleteRecord(COLLECTIONS.tournaments, id)

// Authentication (admins only):
adminLogin(email, password)
adminLogout()
isAdminLoggedIn()
```

### Type Safety

```typescript
import { Tournament, Player, Match } from '@/lib/types';

const tournament: Tournament = await getRecord(...);
tournament.name // TypeScript knows this field
tournament.foo // Error: Property 'foo' does not exist
```

---

## Extensibility

### Adding a New Management Page

```
1. Create src/pages/admin/NewManagement.jsx
2. Define columns[] for CRUDTable
3. Define fields[] for EditModal
4. Use CRUDTable + EditModal components
5. Add route in App.jsx
6. Add NavLink in AdminLayout.jsx
7. Data syncs automatically from DB
```

### Adding a New Collection

```
1. Create in PocketBase Admin UI
2. Add to COLLECTIONS constant in pb.ts
3. Add TypeScript interface in types.ts
4. Update DATABASE.md
5. Create Management page (or REST endpoint)
6. Update CHANGELOG.md
```

### Adding a New Public Page

```
1. Create src/pages/public/NewPage.jsx
2. Define layout (no sidebar needed)
3. Use getRecords() to fetch data
4. Add route in App.jsx (outside ProtectedRoute)
5. Add to public navbar
6. Deploy
```

---

## Deployment Flow

```
Development (localStorage)
    ↓
npm run build:prod
    ↓
dist/ Folder Generated
    ↓
git commit + git push
    ↓
Platform Builds + Publishes
    ↓
Schema copied to Production DB (pb_migrate_sfs.js)
    ↓
App serves from /.sfs-be/
    ↓
Users access /admin/login in production
```

**Important:** Test data in dev is NOT migrated to prod. Production DB starts empty.

---

## Monitoring & Logging

### Frontend Logs

```javascript
// Currently: Only console.error() for debugging
console.error('Error fetching data:', error);

// Future: Proper logging framework
logger.error('matches:list', { filter, error });
```

### Database Logs

Available via PocketBase Admin UI:
- Request logs
- Auth logs
- Collection changes

### Performance Metrics

Not currently tracked. Could add:
- Page load times
- API response times
- User interaction tracking

---

## Development Workflow

```
1. Edit component in src/
2. Vite detects change
3. HMR (Hot Module Reload) updates browser
4. Testdaten zeigen Änderung
5. Make edits to docs/
6. git commit with CHANGELOG update
7. All done!

Note: No build step needed during development.
Only on deploy: npm run build:prod
```

---

## Assumptions & Constraints

### Assumed

- Single admin user (or small team)
- Tournaments are sequential (not concurrent)
- All users have reliable internet
- Admin understands German UI

### Constrained

- No external APIs (no email, SMS, webhooks)
- No real-time collaboration (no WebSocket)
- No offline mode
- No third-party auth (Google, OAuth)

---

## Future Architecture Decisions

**Questions to Answer:**

1. **Public API?** Should external apps fetch tournament data?
   → Current: No REST public endpoint

2. **Real-time Updates?** Should admin page auto-refresh when data changes?
   → Current: Manual refresh via button

3. **Mobile App?** Native apps for players & admins?
   → Current: Responsive web only

4. **Analytics?** Track user behavior, peak usage times?
   → Current: None

5. **Backup Strategy?** How to handle DB disasters?
   → Current: Manual via PocketBase export
