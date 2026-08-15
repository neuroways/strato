# Technische Entscheidungen

## 1. PocketBase als Backend

**Entscheidung:** PocketBase v0.39.0 statt eigen entwickelter Backend

**Begründung:**
- ✓ Zero-Config SQLite (keine Infra-Komplexität)
- ✓ Automatische REST API
- ✓ Built-in Authentication
- ✓ Web Admin UI for Management
- ✓ Für Medium-Größe Projekte optimal
- ✗ Nicht für >1000 concurrent users geeignet

**Alternativen betrachtet:**
- Supabase (PostgreSQL, zu komplex)
- Firebase (Vendor Lock-in)
- Eigener Node Backend (zu viel Overhead)

**Impact:** Entwicklung 10x schneller, Deployment einfacher

---

## 2. Getrennte Results Collection

**Entscheidung:** results ist separate Collection von matches

**Begründung:**
- ✓ Spiele können ohne Ergebnisse geplant werden
- ✓ Mehrere Results pro Match möglich (Korrektionen)
- ✓ Audit Trail für Änderungen
- ✓ Saubere Separation of Concerns

**Alternativen:**
- Results inline in matches (weniger flexibel)
- Result als Nested Object (schwer zu erweitern)

**Impact:** Ermöglicht komplexe Turnier-Szenarien ohne Schema-Änderung

---

## 3. Match-Players Collection

**Entscheidung:** match_players ist separate Tabelle, nicht inline in matches

**Begründung:**
- ✓ Selbe Struktur für Einzel, Doppel, Mixed, Team
- ✓ Kein Code-Rewrite bei Format-Wechsel
- ✓ Flexible Spieler-Zuweisung
- ✓ Keine Array-Felder in matches nötig

**Alternativen:**
- Inline Players im Match (weniger flexibel)
- Separate Singles/Doubles Collections (Redundanz)

**Impact:** Zukünftige Expansion (Doppel, etc.) kostet keine Änderungen

---

## 4. React + Vite Architektur

**Entscheidung:** React 18 SPA mit Vite, nicht Next.js oder SSR

**Begründung:**
- ✓ Admin-UI braucht keine Server-Rendering
- ✓ Vite ultraschnell für Development
- ✓ Client-seitige Navigation sofort
- ✓ Kleine Bundle Size
- ✗ Nicht SEO-optimiert (nicht relevant für Admin-UI)

**Alternativen:**
- Next.js (overkill für Admin-UI)
- Vue (weniger Community)
- Svelte (weniger Job-Chancen)

**Impact:** Dev-Server startet in <1s, HMR funktioniert perfekt

---

## 5. Tailwind CSS statt BEM/Styled-Components

**Entscheidung:** Tailwind v4 für all styling

**Begründung:**
- ✓ Utility-first, schneller zu schreiben
- ✓ Keine Naming-Konflikte
- ✓ Konsistente Design Tokens
- ✓ v4 ist super schnell

**Alternativen:**
- Material-UI (zu viel Overhead)
- CSS Modules (weniger flexibel)
- Styled-Components (Runtime-Overhead)

**Impact:** Schnellere UI-Entwicklung, konsistentes Design

---

## 6. Client-seitige Authentication

**Entscheidung:** JWT Token in localStorage, kein Session/Cookie

**Begründung:**
- ✓ Einfach mit PocketBase
- ✓ Funktioniert mit SPA
- ✗ LocalStorage ist nicht 100% sicher
- ✓ Ausreichend für Internal Admin-Tool

**Alternativen:**
- HttpOnly Cookies (komplexer zu konfigurieren)
- Session-basiert (braucht Backend-State)

**Impact:** Einfacherer Code, aber begrenzte Sicherheit (akzeptabel für Admin-UI)

---

## 7. Keine Redux / Context API

**Entscheidung:** Minimal state management, nur local useState

**Begründung:**
- ✓ PocketBase ist Source-of-Truth
- ✓ Keine komplexen State-Übergänge
- ✓ Einfacher zu debuggen
- ✓ Weniger Code

**Alternativen:**
- Redux (overkill)
- Zustand (könnte später dazukommen)
- Context (Prop-Drilling)

**Impact:** Frontend ist einfach zu verstehen, keine Boilerplate

---

## 8. Generische CRUD-Komponenten

**Entscheidung:** CRUDTable + EditModal sind generisch und wiederverwendbar

**Begründung:**
- ✓ Alle Management-Seiten ähneln sich
- ✓ Weniger Code-Duplizierung
- ✓ Einfacher neue Collections zu verwalten
- ✓ Konsistentes UX

**Alternativen:**
- Spezifische Komponenten pro Collection (mehr Code)
- Generierter Code (komplexer)

**Impact:** 9 Management-Pages mit minimal Code

---

## 9. TypeScript Types

**Entscheidung:** Manuelle TypeScript Types in `src/lib/types.ts`

**Begründung:**
- ✓ Type-Safety für Collections
- ✓ IDE Autocomplete
- ✓ Dokumentiert die Schema
- ✓ Manuell = einfacher anzupassen

**Alternativen:**
- Automatisch generiert (würde komplexes Tooling brauchen)
- Keine Types (weniger sicher)

**Impact:** Bessere DX (Developer Experience)

---

## 10. Kein Caching

**Entscheidung:** Jeder Request geht direkt zu PocketBase, kein Client-Cache

**Begründung:**
- ✓ Garantiert frische Daten
- ✓ Keine Sync-Probleme bei mehreren Tabs
- ✓ Einfach zu verstehen
- ✗ Etwas langsamer bei großen Listen

**Alternativen:**
- React Query (möglich später)
- LocalStorage Cache (komplexer)

**Impact:** Zuverlässig, aber könnte später optimiert werden

---

## 11. Kein Server-Side Rendering

**Entscheidung:** Pure Client-Side SPA, kein SSR/SSG

**Begründung:**
- ✓ Keine Server-Komplexität
- ✓ Einfaches Deployment
- ✓ Skaliert automatisch
- ✗ Erste Seite braucht bisschen länger

**Alternativen:**
- Static Generation (nicht flexibel für dynamische Daten)
- SSR mit Node (mehr Infra)

**Impact:** Deployment ist trivial

---

## 12. Alle Admin-Links zur Turnierverwaltung

**Entscheidung:** `/admin/tournaments/:id/settings` statt `/admin/settings`

**Begründung:**
- ✓ Multi-Turnier fähig (auch wenn nicht genutzt)
- ✓ Settings sind turnierspezifisch
- ✓ URL zeigt Kontext

**Alternativen:**
- Globale Settings (weniger flexibel)

**Impact:** Saubere URL-Struktur

---

## 13. Kein Email-System

**Entscheidung:** Keine Email-Benachrichtigungen für Anmeldungen/Ergebnisse

**Begründung:**
- ✓ PocketBase Email-API ist disabled
- ✓ Komplexität nicht wert für v1
- ✓ Admin kann manuell informieren
- ✗ Spieler müssen selbst Website checken

**Alternativen:**
- Externe Email-Service (Sendgrid, etc.)
- Custom Backend (zu komplex)

**Impact:** Weniger Features, aber einfacher zu pflegen

---

## 14. Deutsch als Standard-Sprache

**Entscheidung:** Alle UI-Texte sind auf Deutsch

**Begründung:**
- ✓ Zielgruppe ist deutschsprachig
- ✓ Einfacher zu pflegen
- ✗ Nicht international

**Alternativen:**
- i18n/Internationalisierung (overkill für Lokal-Turnier)

**Impact:** Schnellere Entwicklung, lokalisierter

---

## 15. Keine KI-Spielplanung (v1)

**Entscheidung:** ai_schedule_runs Collection vorbereitet, aber kein Algorithmus implementiert

**Begründung:**
- ✓ Datenbank-Struktur ist bereit
- ✓ Komplex, braucht Testing
- ✓ v1 kann manuell spielen planen
- ✗ Automatisierung fehlt

**Alternativen:**
- Einfacher Random-Algorithmus (in v2)
- Komplexer Seeding-Algorithmus (später)

**Impact:** Funktional, aber nicht automatisiert

---

## 16. Kein Leaderboard (v1)

**Entscheidung:** Keine öffentliche Spieler-Rangliste implementiert

**Begründung:**
- ✓ Komplexe Queries (Win/Loss berechnen)
- ✓ Multiple Formats (Swiss, Knockout, etc.)
- ✓ Can be added in v2
- ✗ Spieler können nicht live sehen wie sie stehen

**Alternativen:**
- Einfache Win-Counter (zu simpel)
- ELO-System (zu komplex für v1)

**Impact:** Feature-Cut für schnelleres MVP

---

## 17. Public Site (noch nicht implementiert)

**Entscheidung:** Public Website wird nach Admin-UI entwickelt

**Begründung:**
- ✓ Admin-UI ist Priorität
- ✓ Erst Daten in DB, dann Anzeige
- ✓ Weniger zeitdruck

**Alternativen:**
- Gleichzeitig (chaos)
- Admin später (Blockade)

**Impact:** Klare Prioritäten

---

## Summary: Design Principles

Die Architektur folgt diesen Prinzipien:

1. **Simplicity** – Einfach über Perfekt
2. **Extensibility** – Vorbereitet auf Doppel, Multi-Turnier, etc.
3. **PocketBase-first** – Nutze die Plattform, nicht gegen sie
4. **Type-safe** – TypeScript überall möglich
5. **DRY** – Generische Komponenten, keine Duplizierung
6. **Data-driven** – Alles aus DB, nichts hardcodiert
7. **User-centric** – Fokus auf Admin & Spieler Erlebnis
