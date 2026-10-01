# Projekt-Dokumentation – Tennisturnier Neindorf

## Übersicht

Vollständige technische Dokumentation des Tennis-Turnier-Management-Systems.

**Status:** v2.0.0 – Admin UI Complete & Fully Documented

---

## Dokumentations-Struktur

```
docs/
├── database/               # Datenbank-Struktur & Schema
│   ├── database.md        # Detaillierte Collections-Dokumentation
│   └── collections.md     # Collections-Schnellreferenz
│
├── api/                    # API-Integration & REST-Utilities
│   └── api.md             # Alle API-Funktionen dokumentiert
│
├── frontend/               # React-Komponenten & UI
│   └── frontend.md        # Pages, Components, Navigation
│
├── architecture/           # System-Design & Datenfluss
│   └── architecture.md    # Komponenten-Hierarchie, Sicherheit
│
├── decisions/              # Technische Entscheidungen
│   └── decisions.md       # 17 Entscheidungen mit Begründungen
│
├── changelog/              # Versions-Historie
│   └── CHANGELOG.md       # Alle Releases dokumentiert
│
├── testing/                # QA & Test-Dokumentation
│   └── testing.md         # Test-Status, Checklisten
│
└── README.md              # Dieses Dokument
```

---

## Schnell-Navigation

### Für Datenbank-Fragen
→ `docs/database/database.md` – Alle 15 Collections detailliert
→ `docs/database/collections.md` – Schnellreferenz-Tabellen

### Für API-Fragen
→ `docs/api/api.md` – Alle Funktionen mit Beispielen
→ `src/lib/api.ts` – Quellcode

### Für Frontend-Fragen
→ `docs/frontend/frontend.md` – Seiten, Komponenten, Routing
→ `src/pages/admin/` – Management-Seiten
→ `src/components/` – Reusable Komponenten

### Für Architektur-Fragen
→ `docs/architecture/architecture.md` – System-Overview & Datenfluss

### Für "Warum ist es so gebaut?"
→ `docs/decisions/decisions.md` – 17 technische Entscheidungen

### Für Was-ist-neu / Roadmap
→ `docs/changelog/CHANGELOG.md` – Vollständige Versions-Historie

### Für Testing & QA
→ `docs/testing/testing.md` – Test-Status & Checklisten

---

## Dokumente im Detail

### 1. DATABASE.md (440 Zeilen)
**Zweck:** Komplette Datenbank-Dokumentation

**Inhalt:**
- Übersicht aller 15 Collections
- Feld-Definitionen (Typ, Beschreibung, Testdaten)
- Beziehungsdiagramme
- Zugriffsmuster (Admin & Public)
- Performance-Hinweise
- Besonderheiten & Design-Rationale

**Für wen:** Datenbank-Designer, Backend-Developer, Admins

---

### 2. COLLECTIONS.md (189 Zeilen)
**Zweck:** Schnellreferenz für alle Collections

**Inhalt:**
- Tabelle aller 15 Collections (Name, Typ, FK, Record-Count)
- Kategorisierung (Stammdaten, Turnier, Inhalte)
- Zugriffshäufigkeit
- Kardinalität & Constraints
- Test-Daten Mapping
- Migration & Skalierungs-Szenarien

**Für wen:** Schnelle Lookups, Team-Onboarding

---

### 3. API.md (511 Zeilen)
**Zweck:** Vollständige API-Dokumentation

**Inhalt:**
- SDK-Instanz (pb.ts)
- High-Level Funktionen (getRecords, createRecord, etc.)
- Authentication (Login, Logout, isLoggedIn)
- Filter-Syntax (PocketBase-spezifisch)
- Error-Handling
- Performance & Limits
- Häufige Patterns

**Für wen:** Frontend-Developer, API-Konsumenten

---

### 4. FRONTEND.md (509 Zeilen)
**Zweck:** React-Frontend-Dokumentation

**Inhalt:**
- Directory-Struktur
- App.jsx (Root & Routing)
- AdminLayout.jsx (Container)
- AdminLogin.jsx (Auth)
- AdminDashboard.jsx (Stats)
- CRUDTable.jsx (Generic Table)
- EditModal.jsx (Generic Form)
- Alle Management-Pages
- Responsive Design
- State Management
- Navigation
- Styling (Tailwind)

**Für wen:** Frontend-Developer, UI-Designer

---

### 5. ARCHITECTURE.md (429 Zeilen)
**Zweck:** System-Design & Datenfluss

**Inhalt:**
- System-Overview (Browser → React → PocketBase → SQLite)
- Detaillierter Datenfluss (Login, CRUD, Search)
- Komponenten-Hierarchie
- Authentication & Authorization
- State Management
- Error Handling
- Data Consistency
- Performance
- Security (Current & Future)
- Extensibility
- Deployment Flow
- Assumptions & Constraints

**Für wen:** Architekten, Lead-Developer, System-Designer

---

### 6. DECISIONS.md (321 Zeilen)
**Zweck:** Technische Entscheidungen dokumentiert

**Inhalt:**
- 17 Entscheidungen (PocketBase, getrennte Results, etc.)
- Begründung & Alternativen für jede
- Impact-Analyse
- Design Principles (Simplicity, Extensibility, etc.)

**Für wen:** Architekten, Stakeholder, Future-Entwickler

---

### 7. CHANGELOG.md (253 Zeilen)
**Zweck:** Versions-Historia

**Inhalt:**
- v2.0.0 – Admin UI Complete
- v1.1.0 – Dokumentation
- v1.0.0 – Database Complete
- v0.0.0 – Initial Setup
- Versions-Übersicht
- Roadmap (v2.1–v3.0)
- Release-Notes Format
- Commit-Stil

**Für wen:** Project Manager, Deployments, Release-Notes

---

### 8. TESTING.md (378 Zeilen)
**Zweck:** QA & Test-Dokumentation

**Inhalt:**
- Test-Status (Manuell durchgeführt)
- Bekannte Probleme mit Workarounds
- Nicht getestete Szenarien
- Test-Plan für v3.0+
- Browser-Kompatibilität
- Performance Baseline
- Fehler-Szenarien
- Test-Gaps
- Deployment Checklist

**Für wen:** QA, Tester, Deployments

---

## Projekt-Status

### ✓ Abgeschlossen
- Datenbank: 15 Collections, Schema final
- Admin UI: 10 Management-Seiten, CRUD komplett
- API: Alle Utilities implementiert
- Authentication: PocketBase-Integration
- Dokumentation: Vollständig

### ⚠️ Gekannt & Dokumentiert
- KI-Spielplanung: Sammlung vorhanden, Algorithm fehlt
- Match-Players UI: Collection vorhanden, UI fehlt
- Public Site: Noch nicht implementiert
- Email-System: Disabled (PocketBase-Limitation)
- Real-time Updates: Nicht implementiert

### 🚀 Geplant (Roadmap)
- v2.1.0: Public Website
- v2.2.0: KI & Automatisierung
- v3.0.0: Erweiterte Features (Doppel, Multi-Turnier, etc.)

---

## Verwendete Technologien

| Layer | Technologie | Version |
|-------|-------------|---------|
| Database | PocketBase | 0.39.0 |
| Database | SQLite | 3.x |
| Frontend | React | 18 |
| Routing | react-router | 7 |
| Styling | Tailwind CSS | 4 |
| Icons | lucide-react | Latest |
| Build | Vite | 6.4.3 |
| Language | TypeScript | 5.x |
| Package Manager | npm | Latest |

---

## Key Metrics

### Database
- **Collections:** 15
- **Felder:** ~100
- **Testdaten-Records:** ~20
- **Beziehungen:** 12

### Frontend
- **Pages:** 11 (Admin)
- **Components:** 4 (Generic: CRUDTable, EditModal; spezifisch: Login, Dashboard, Layout)
- **Routes:** 10
- **Lines of Code:** ~3000 (JSX)

### Documentation
- **Dokumente:** 8
- **Lines:** ~2800
- **Diagramme:** 5

### API
- **Funktionen:** 12
- **Patterns:** 6 häufige
- **Error-Handling:** Vollständig

---

## Entwicklungs-Workflow

### Neues Feature entwickeln

```
1. Anforderung lesen
2. Entscheidungen treffen
3. → docs/decisions/decisions.md ergänzen
4. Code implementieren
5. Komponente/Collection dokumentieren
6. → docs/*/[relevant].md aktualisieren
7. Tests durchführen
8. → docs/testing/testing.md aktualisieren
9. → docs/changelog/CHANGELOG.md aktualisieren
10. Commit mit Nachricht: "feat: Description"
11. Alle Doku muss committed sein!
```

### Dokumentation ist Pflicht!

Eine Änderung gilt erst dann als abgeschlossen, wenn:
- ✓ Code ist geschrieben
- ✓ Relevante Doku ist aktualisiert
- ✓ CHANGELOG ist aktualisiert
- ✓ Alles ist committed

---

## Onboarding für neue Developer

1. **Projekt-Übersicht**
   → Start mit `docs/README.md` (dieses Dokument)

2. **Datenbank verstehen**
   → Lese `docs/database/database.md`

3. **API nutzen**
   → Lese `docs/api/api.md`
   → Schaue `src/lib/api.ts`

4. **UI-Komponenten**
   → Lese `docs/frontend/frontend.md`
   → Schaue `src/pages/admin/`

5. **System verstehen**
   → Lese `docs/architecture/architecture.md`

6. **Warum wurde was entschieden**
   → Lese `docs/decisions/decisions.md`

7. **Umgebung aufsetzen**
   ```bash
   cd app && npm run dev
   # Access: http://localhost:5173/admin/login
   # Credentials: admin@tennis.local / admin123456
   ```

---

## Häufige Fragen

**Q: Wie speichere ich Daten?**
A: Nutze `createRecord(COLLECTIONS.players, data)` aus `src/lib/api.ts`

**Q: Wie hole ich Daten?**
A: Nutze `getRecords(COLLECTIONS.tournaments)` – siehe Beispiele in `docs/api/api.md`

**Q: Wie füge ich eine neue Management-Seite hinzu?**
A: Siehe Pattern in `src/pages/admin/PlayerManagement.jsx` – es ist sehr einfach!

**Q: Kann ich das Schema ändern?**
A: NEIN – Schema ist final. Dokumentiere gewünschte Änderungen statt umzusetzen.

**Q: Wie teste ich?**
A: Manuelle Tests. Checklist in `docs/testing/testing.md`. Unit-Tests in v3.0.

**Q: Wie deploye ich?**
A: `npm run build:prod` → `git commit` → Platform publish

**Q: Warum kein Redux?**
A: Nicht nötig. PocketBase ist Source-of-Truth. Siehe `docs/decisions/decisions.md` #7

---

## Support & Kontakt

**Fragen zur Datenbank?**
→ `docs/database/database.md`

**Fragen zur API?**
→ `docs/api/api.md` oder `src/lib/api.ts`

**Fehler im Code?**
→ Console öffnen (F12), Error-Message lesen, googeln, docs checken

**Fehler in der Doku?**
→ Pull Request oder Issue erstellen

---

## Lizenz

Dieses Projekt ist internal-only. Keine öffentliche Veröffentlichung.

---

## Versionierung

**Aktuell:** v2.0.0 (2026-07-26)

Siehe `docs/changelog/CHANGELOG.md` für Versions-Historie.

---

Letzte Aktualisierung: 2026-07-26
Nächste Aktualisierung: Nach neuen Features
