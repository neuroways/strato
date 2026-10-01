# Frontend-Dokumentation

## Architektur-Übersicht

Die Frontend-Architektur teilt sich in:

1. **Admin-UI** (`/admin/*`) – Private Verwaltungsoberfläche
2. **Public Site** (später) – Öffentliche Website für Besucher

**Stack:**
- React 18 (JSX)
- react-router v7 (Client-side Navigation)
- Tailwind CSS v4 (Styling)
- PocketBase SDK (API)
- lucide-react (Icons)

---

## Directory-Struktur

```
src/
├── App.jsx                    # Root routing & auth protection
├── index.css                  # Global styles + Tailwind
├── main.jsx                   # Entry point
│
├── lib/                       # Utilities & Services
│   ├── pb.ts                  # PocketBase SDK instance
│   ├── api.ts                 # High-level API functions
│   ├── types.ts               # TypeScript types for all Collections
│   └── useAuthRefresh.ts      # Auth hook
│
├── components/                # Shared Components
│   ├── CRUDTable.jsx          # Generic table with search/edit/delete
│   └── EditModal.jsx          # Generic form modal
│
└── pages/
    └── admin/                 # Admin Interface
        ├── AdminLayout.jsx         # Main layout + sidebar nav
        ├── AdminLogin.jsx          # Login page
        ├── AdminDashboard.jsx      # Dashboard with stats
        ├── TournamentManagement.jsx
        ├── TournamentSettings.jsx
        ├── PlayerManagement.jsx
        ├── RegistrationManagement.jsx
        ├── CourtManagement.jsx
        ├── RoundManagement.jsx
        ├── MatchManagement.jsx
        ├── ResultManagement.jsx
        └── ContentManagement.jsx
```

---

## App.jsx – Root & Routing

**Zweck:** Zentrale Route-Konfiguration und Auth-Protection.

```jsx
export default function App() {
  useAuthRefresh();
  
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/tournaments" element={<TournamentManagement />} />
        {/* ... weitere Routes */}
      </Route>
      <Route path="*" element={<Navigate to="/admin/dashboard" />} />
    </Routes>
  );
}
```

**Features:**
- ProtectedRoute-Wrapper für Auth
- Fallback auf `/admin/dashboard`
- Catch-all `*` Route für 404

---

## AdminLayout.jsx – Main Container

**Zweck:** Layout mit Sidebar-Navigation und Top-Bar.

**Props:** Keine (Outlet für Seiten-Rendering)

**State:**
- `menuOpen` – Mobile-Menu Toggle

**Features:**
- Fixed Sidebar (Desktop)
- Toggle-Menü (Mobile)
- Navigation Links
- User Info + Logout-Button

**Struktur:**
```
┌─ Sidebar ─────────────────┐
│ - Logo                     │
│ - Nav Links               │
│ - User Info + Logout      │
└────────────────────────────┘
┌─────────────────────────────────────────┐
│ Top Bar (Menu Toggle, Title)            │
├─────────────────────────────────────────┤
│ <Outlet />  (Page Content)              │
└─────────────────────────────────────────┘
```

**Responsive:**
- 375px: Sidebar hidden, toggle visible
- 1024px+: Sidebar always visible

---

## AdminLogin.jsx – Authentication

**Zweck:** Email/Passwort-Login zu Admin-Panel.

**Props:** Keine

**State:**
- `email`, `password` – Form inputs
- `loading` – Request in progress
- `error` – Error message

**Features:**
- Email + Passwort-Felder
- Error-Display
- PocketBase Authentication
- Redirect zu Dashboard nach erfolgreichem Login

**Test-Credentials:**
```
Email: admin@tennis.local
Passwort: admin123456
```

---

## AdminDashboard.jsx – Statistik-Übersicht

**Zweck:** High-Level Overview des aktuellen Turniers.

**Props:** Keine

**State:**
- `stats` – Statistik-Objekt (Spieler, Anmeldungen, Spiele, etc.)
- `loading` – Data loading
- `currentTournament` – Aktuelles Turnier

**Datenquellen:**
- `countRecords()` für Statistiken
- `getRecords()` für Turnier-Details

**Angezeigt:**
- Turnier-Highlight (Name, Datum, Status)
- 6 Statistik-Cards
- Quick-Links zu häufigen Verwaltungsaufgaben

---

## CRUDTable.jsx – Generische Tabelle

**Zweck:** Wiederverwendbare Tabelle mit Suche, Edit, Delete.

**Props:**
```typescript
{
  collectionName: string;        // z.B. "players"
  columns: ColumnDef[];          // Spalten-Definition
  title: string;                 // Tabellen-Titel
  onEdit: (record) => void;      // Callback beim Edit-Klick
  onAdd: () => void;             // Callback beim Add-Button
  refreshKey: number;            // Trigger zum Reload
}
```

**ColumnDef:**
```typescript
{
  key: string;                   // Feld-Name
  label: string;                 // Spalten-Header
  render?: (value, record) => ReactNode;  // Custom rendering
}
```

**Features:**
- Search-Input (über alle Spalten)
- Edit-Button (Icon)
- Delete-Button (Icon)
- Loading-State
- Empty-State
- Fehler-Display

**Verhalten:**
- Delete zeigt Bestätigungs-Dialog
- Nach Delete: Datensatz verschwindet sofort aus Tabelle
- Nach Edit/Add: Tabelle wird via `refreshKey` neu geladen

---

## EditModal.jsx – Generisches Bearbeitungs-Modal

**Zweck:** Wiederverwendbares Modal für Create/Update.

**Props:**
```typescript
{
  isOpen: boolean;
  onClose: () => void;
  collectionName: string;        // z.B. "players"
  record: any | null;            // null = Create, record = Update
  fields: FieldDef[];            // Form-Felder
  onSuccess: () => void;         // Callback nach erfolgreichem Save
  title: string;                 // Modal-Titel
}
```

**FieldDef:**
```typescript
{
  name: string;                  // Feld-Name
  label: string;                 // Label
  type: 'text' | 'email' | 'select' | 'checkbox' | 'textarea';
  required?: boolean;
  placeholder?: string;
  options?: { value, label }[];  // Für select
  rows?: number;                 // Für textarea
}
```

**Features:**
- Auto-Filling bei Edit
- Verschiedene Input-Typen
- Error-Display
- Loading-State
- Cancel + Save Buttons

**Logik:**
- `record?.id` → Update: `PATCH /api/collections/X/records/ID`
- `!record?.id` → Create: `POST /api/collections/X/records`

---

## Management Pages

Alle Management-Seiten folgen gleichem Pattern:

```jsx
export default function PlayerManagement() {
  const [editingRecord, setEditingRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Column definitions für CRUDTable
  const columns = [ /* ... */ ];
  
  // Field definitions für EditModal
  const fields = [ /* ... */ ];

  function handleEdit(record) { /* ... */ }
  function handleAdd() { /* ... */ }
  function handleSuccess() { setRefreshKey(k => k + 1); }

  return (
    <>
      <CRUDTable
        collectionName={COLLECTIONS.players}
        columns={columns}
        title="Spielerverwaltung"
        onEdit={handleEdit}
        onAdd={handleAdd}
        refreshKey={refreshKey}
      />

      <EditModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        collectionName={COLLECTIONS.players}
        record={editingRecord}
        fields={fields}
        onSuccess={handleSuccess}
        title={editingRecord ? 'Spieler bearbeiten' : 'Spieler hinzufügen'}
      />
    </>
  );
}
```

### Management Pages (Implementiert)

| Page | File | Collections | CRUD |
|------|------|-------------|------|
| Tournaments | TournamentManagement.jsx | tournaments | ✓ CRUD |
| Players | PlayerManagement.jsx | players | ✓ CRUD |
| Registrations | RegistrationManagement.jsx | registrations, tournaments, players | ✓ CRUD |
| Courts | CourtManagement.jsx | courts | ✓ CRUD |
| Rounds | RoundManagement.jsx | rounds, tournaments | ✓ CRUD |
| Matches | MatchManagement.jsx | matches, rounds, courts | ✓ CRUD |
| Results | ResultManagement.jsx | results, matches, players | ✓ CRUD |
| Content | ContentManagement.jsx | info_sections, announcements | ✓ CRUD |
| Tournament Settings | TournamentSettings.jsx | tournament_settings | ✓ Update only |

---

## Responsive Design

### Mobile (375px)
- Sidebar: Hidden, toggle-accessible
- Tables: Scrollable horizontally
- Fonts: Reduced
- Spacing: Compact

### Tablet (768px)
- Sidebar: Hidden, toggle-accessible
- Tables: Full width
- Grid: 2 columns where applicable
- Spacing: Medium

### Desktop (1280px+)
- Sidebar: Always visible (fixed)
- Tables: Full width
- Grid: 3 columns
- Spacing: Generous

---

## Search & Filter

### Global Search (CRUDTable)
```jsx
<input
  type="text"
  placeholder="Suchen..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
```

**Logik:**
```typescript
const filtered = records.filter(r =>
  Object.values(r).some(val =>
    String(val).toLowerCase().includes(searchTerm.toLowerCase())
  )
);
```

**Verhalten:**
- Case-insensitive
- Sucht über alle Spalten
- Real-time (keine Debounce)

### Backend Filter (getRecords)
```typescript
await getRecords(COLLECTIONS.matches, {
  filter: `status = "scheduled"`
})
```

---

## State Management

**Philosophy:** Minimal, keine Redux/Context-API.

**Pattern:**
- Local state mit `useState` pro Komponente
- Props-Drilling für einfache Übergaben
- PocketBase als Source-of-Truth

**Beispiel:**
```jsx
const [records, setRecords] = useState([]); // local
const [refreshKey, setRefreshKey] = useState(0); // trigger reload

useEffect(() => {
  loadRecords();
}, [refreshKey]); // dependency trigger reload
```

---

## Error Handling

**Strategie:**

1. **Form-Fehler:** Modal zeigt Error-Message
2. **Load-Fehler:** CRUDTable zeigt Error-Banner
3. **Network:** Aborted requests werden ignoriert
4. **Validation:** Nur Required-Checks

**Beispiel:**
```jsx
try {
  await createRecord(COLLECTIONS.players, data);
  onSuccess();
} catch (err) {
  if (!err?.isAbort) {
    setError(err?.message || 'Fehler beim Speichern');
  }
}
```

---

## Navigation

**react-router Usage:**

```jsx
import { Link, NavLink, useNavigate } from 'react-router';

// Internal links
<NavLink to="/admin/players" className={({ isActive }) => ...} />

// Programmatische Navigation
const navigate = useNavigate();
navigate('/admin/dashboard');

// Nie verwenden:
<a href="/admin/players" />  // ✗ Verursacht Page-Reload
```

---

## Icons

**Quelle:** lucide-react

```jsx
import MenuIcon from 'icon:menu';
import XIcon from 'icon:x';
import EditIcon from 'icon:edit-2';
import TrashIcon from 'icon:trash-2';
import PlusIcon from 'icon:plus';
// Weitere: ChevronDown, LogOut, Search, ...
```

**Verwendung:**
```jsx
<MenuIcon className="w-6 h-6" />
```

---

## Styling

**Framework:** Tailwind CSS v4

**Color Scheme:**
- Primary: `blue-600` (Links, CTAs)
- Danger: `red-600` (Delete, Errors)
- Success: `green-600` (Confirmations)
- Neutral: `gray-*` (Text, Borders)

**Utility Classes:**
```
flex items-center justify-between gap-4
bg-white rounded-lg shadow p-6
border border-gray-300 rounded-lg
px-4 py-2 hover:bg-gray-50 transition
```

---

## Performance Hints

**Aktuell gut:**
- Lazy-loaded Pages via routing
- AbortSignal auf API-Calls
- useEffect cleanup

**Mögliche Verbesserungen:**
- React.memo für häufig re-rendered Components
- useMemo für expensive calculations
- Pagination statt alle Records laden

---

## Testing

**Aktuell:** Keine Unit-Tests, nur manuelle Tests.

**Test-Checklist:**
- [ ] Login funktioniert
- [ ] CRUD-Operationen funktionieren
- [ ] Search filtert korrekt
- [ ] Delete fragt nach Bestätigung
- [ ] Modal validiert required fields
- [ ] Responsive auf Mobile/Tablet/Desktop

---

## Future Pages

**Noch zu implementieren:**

- Public Homepage
- Turnier-Übersicht
- Spielplan (Live)
- Ergebnisse (Live)
- Kontaktformular
- Leaderboard
- Spieler-Profile
