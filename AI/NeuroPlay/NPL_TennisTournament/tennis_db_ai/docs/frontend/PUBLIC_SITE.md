# Öffentliche Website – Frontend-Dokumentation

**Phase 3 – Public Website Development**

---

## Überblick

Die öffentliche Website ist eine **read-only Präsentation** aller Turnierdaten.

Alle Inhalte stammen direkt aus der Datenbank via Services.

**Kein Hardcoding von Inhalten.**

---

## Seitenstruktur

### 1. Layout (`PublicLayout.jsx`)
Shared Header, Navigation, Footer für alle öffentlichen Seiten.

**Navigation (Desktop & Mobile):**
- Startseite
- Turniere
- Spielplan
- Ergebnisse
- Teilnehmer
- News
- Plätze
- Kontakt

---

### 2. Startseite (`Home.jsx`)
**Inhalte:**
- Hero-Section mit Turniername
- CTA-Buttons (Turniere, Spielplan)
- Aktuelles Turnier-Snapshot
  - Datum
  - Anmeldeschluss
  - Status
  - Ort
  - Beschreibung
- Quick Links

**Services:**
- `TournamentService.getAllTournaments()` – erstes/neuestes Turnier

---

### 3. Turniere (`Tournaments.jsx`)
**Inhalte:**
- Liste aller Turniere (Grid)
- Pro Turnier:
  - Name
  - Beschreibung
  - Turnierdatum
  - Anmeldeschluss
  - Status (Offen, Laufend, Abgeschlossen)
  - "Details" Button (placeholder)

**Services:**
- `TournamentService.getAllTournaments()`

---

### 4. Spielplan (`Schedule.jsx`)
**Inhalte:**
- Runden-Navigation (Sidebar/Tabs)
- Spiele pro Runde:
  - Runde
  - Uhrzeit
  - Platz
  - Spieler (count)
  - Status (Geplant, Läuft, Abgeschlossen)

**Services:**
- `RoundService.getAllRounds()`
- `MatchService.getAllMatches()`
- Filter: Matches pro Runde

---

### 5. Ergebnisse (`Results.jsx`)
**Inhalte:**
- Alle abgeschlossenen Spiele (chronologisch)
- Pro Ergebnis:
  - Runde
  - Spieler A vs. Spieler B
  - Spielstand (Score)
  - Gewinner (prominent)

**Services:**
- `MatchService.getAllMatches('status = "completed"')`
- `ResultService.getMatchResult(matchId)`

---

### 6. Teilnehmer (`Players.jsx`)
**Inhalte:**
- Liste aller angemeldeten Spieler (Grid)
- Search-Funktion (Name)
- Pro Spieler:
  - Name
  - Spielstärke (Badge)
  - Geburtsdatum
  - E-Mail
  - Telefon

**Services:**
- `PlayerService.getAllPlayers()`
- Client-seitige Filterung (Search)

---

### 7. News (`News.jsx`)
**Inhalte:**
- Alle veröffentlichten Ankündigungen (chronologisch absteigend)
- Pro Ankündigung:
  - Titel
  - Veröffentlichungsdatum
  - Content
  - Turnier-Badge (falls tournament_id)

**Services:**
- `AnnouncementService.getVisibleAnnouncements()`

---

### 8. Plätze (`Courts.jsx`)
**Inhalte:**
- Liste aller Plätze (Grid)
- Pro Platz:
  - Name
  - Belag (Asche, Hart, Rasen, Kunststoff)
  - Art (Indoor/Outdoor)
  - Verfügbarkeit (Grün/Rot Badge)
  - Notizen

**Services:**
- `CourtService.getAllCourts()`
- Label Helper: `CourtService.getSurfaceLabel()`

---

### 9. Kontakt (`Contact.jsx`)
**Inhalte:**
- Kontaktformular
  - Name (required)
  - E-Mail (required)
  - Telefon
  - Nachricht (required)
  - Submit Button
  - Success Message
- Kontaktinformationen (statisch):
  - Adresse
  - Telefon
  - E-Mail
  - Öffnungszeiten

**Hinweis:** Formular zeigt Success, speichert aber nicht (read-only Seite).

---

### 10. 404 (`NotFound.jsx`)
Catch-all für nicht gefundene Routes.

Link zurück zur Startseite.

---

## Routing

```javascript
<Route element={<PublicLayout />}>
  <Route path="/" element={<Home />} />
  <Route path="/tournaments" element={<Tournaments />} />
  <Route path="/schedule" element={<Schedule />} />
  <Route path="/results" element={<Results />} />
  <Route path="/players" element={<Players />} />
  <Route path="/news" element={<News />} />
  <Route path="/courts" element={<Courts />} />
  <Route path="/contact" element={<Contact />} />
</Route>
<Route path="*" element={<NotFound />} />
```

---

## Architektur-Compliance

### Datenfluss

```
Public Component (z.B. Players.jsx)
         ↓
Service Layer (PlayerService.getAllPlayers())
         ↓
API Utilities (getRecords)
         ↓
PocketBase SDK
         ↓
SQLite Database
```

**Regeln:**
- ✓ Alle Komponenten verwenden Services
- ✓ Keine direkten API-Aufrufe in Komponenten
- ✓ Keine direkten PocketBase-Aufrufe
- ✓ Alle Services bleiben unverändert
- ✓ Alle Admin-Funktionen bleiben intakt

---

## Service-Nutzung

### TournamentService
```typescript
// Home, Tournaments Pages
TournamentService.getAllTournaments()
TournamentService.getAllTournaments('status = "open"')
```

### PlayerService
```typescript
// Players Page
PlayerService.getAllPlayers()
PlayerService.getPlayerFullName(player) // Helper
PlayerService.getSkillLevelLabel(level) // Helper
```

### MatchService
```typescript
// Schedule, Results Pages
MatchService.getAllMatches()
MatchService.getAllMatches('status = "completed"')
```

### ResultService
```typescript
// Results Page
ResultService.getMatchResult(matchId)
```

### RoundService
```typescript
// Schedule Page
RoundService.getAllRounds()
```

### CourtService
```typescript
// Courts Page
CourtService.getAllCourts()
CourtService.getSurfaceLabel(surface) // Helper
```

### AnnouncementService
```typescript
// News Page
AnnouncementService.getVisibleAnnouncements()
```

---

## Error Handling

Alle Pages folgen dem gleichen Pattern:

```typescript
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

useEffect(() => {
  async function load() {
    const result = await Service.getData();
    if (result.success) {
      setData(result.data);
    } else {
      setError(result.error || 'Fehler beim Laden');
    }
    setLoading(false);
  }
  load();
}, []);

// Render
if (loading) return <Spinner />;
if (error) return <ErrorBanner />;
if (data.length === 0) return <EmptyState />;
return <Content />;
```

---

## Styling

**Framework:** Tailwind CSS v4

**Ansatz:** Utility-first, responsive

**Breakpoints:**
- Mobile: 375px
- Tablet: 768px (md)
- Desktop: 1280px (lg)

**Beispiel:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* 1 Spalte auf Mobile, 2 auf Tablet, 3 auf Desktop */}
</div>
```

---

## Performance

**Lazy Loading:**
- useEffect für alle Datenladevorgänge
- AbortSignal für Request-Cancellation bei Unmount
- Kein Double-Fetching

**Optimierungen:**
- Images: `max-width: 100%` für Responsiveness
- Search: Client-seitig (keine neuen API-Calls)
- Filter: Client-seitig (localStorage optional)

---

## Mobile-First Design

**Gültig für alle Seiten:**
- ✓ Keine horizontalen Scrollbars bei 375px
- ✓ Touch-Targets ≥ 44px
- ✓ Lesbar ohne Zoom
- ✓ Hamburger-Menü auf Mobile
- ✓ Responsive Grid/Stack Layout
- ✓ Flexible Typen und Spacing

---

## Komponenten-Reuse

### Shared Patterns

**Loading Spinner:**
```jsx
<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
```

**Error Banner:**
```jsx
<div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
  {error}
</div>
```

**Empty State:**
```jsx
<div className="text-center py-12">
  <p className="text-gray-600">Keine Daten gefunden</p>
</div>
```

**Status Badge:**
```jsx
<span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[status]}`}>
  {labels[status]}
</span>
```

---

## Zukunft

### Geplante Erweiterungen (nicht Phase 3)

1. **Registrierung**
   - Spieler können sich anmelden
   - Save to Registrations Collection

2. **Live Updates**
   - WebSocket für Live-Spielplan
   - Real-time Score Updates

3. **Benutzer-Accounts**
   - Spieler-Login
   - Persönliches Dashboard
   - Match-History

4. **Details Pages**
   - /tournaments/:id
   - /players/:id
   - /matches/:id

5. **Leaderboard**
   - Rankings
   - Statistics
   - Achievements

---

## Deployment

Build: `npm run build`

Output: `dist/` (für Production)

Preview: `dist-preview/` (mit Source-Maps)

---

## Summary

✓ 8 Public Pages
✓ 7 Services integriert
✓ Responsive Design
✓ Read-only Access
✓ Error Handling
✓ Performance optimiert
✓ Admin-Bereich erhalten
✓ Architektur-Compliance 100%

**Status:** Phase 3 bereit für Deployment
