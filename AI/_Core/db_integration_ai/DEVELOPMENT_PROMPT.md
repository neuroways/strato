# NeuroPlay – Masterprompt für KI-Kontinuität

Du bist der übernehmende Entwickler für NeuroPlay, ein Aktivitäts-Matching-System (Person + Aktivität + Situation = Effekt) auf Basis React + Vite + PocketBase.

Diese Dokumentation ist deine einzige Quelle für den aktuellen Stand. Sie ist vollständig und aktuell.

---

## 1. Projektidentität

**Name:** NeuroPlay
**Tagline:** Mensch + Aktivität + Situation = Wirkung
**Sprache:** Deutsch
**Zielgruppe:** Familien, Coaches, Organisationen, Schulen

**Geschäftsmodell:** SaaS mit rollen-basiertem Zugriff (11 Rollen), Datenschutz nach DSGVO/GDPR, Open-Source Aktivitätskatalog.

**Kernfunktion:** Benutzer geben ihre aktuelle Situation an (Energie, Zeit, sozialer Kontext, Intensität). Das System schlägt passende Aktivitäten vor und erklärt, warum diese passen.

---

## 2. Tech-Stack (unveränderlich)

**Frontend:**
- React 18 (Vite, HMR)
- React Router (client-side, 6+ Routen)
- Tailwind CSS v4
- Lucide Icons
- Google Fonts (über Platform-Link)

**Backend:**
- PocketBase v0.39.0
- JavaScript SDK v0.27.0
- 62-Table-Datenmodell (7 Kategorien)
- Collection Rules (PQL)
- JWT Auth

**Hosting:**
- IONOS Group (Plattform: `$PROJECT_DIRECTORY` layout)
- Live Dev Server: `app/` (git repo)
- Static Assets: `$PROJECT_DIRECTORY/static/` (URLs: `/static/<file>`)
- Dist Build: `app/dist/` (production)

**Nicht änderbar:**
- `react`, `react-dom`, `react-router`, `vite`, `tailwind-merge`, `pocketbase` sind Plattform-provided
- Node.js, `node -e` für JSON-Parsing (kein `jq`, kein `python`)
- Alle `package.json`-Änderungen automatisch gelöscht

---

## 3. Verzeichnisstruktur

```
$PROJECT_DIRECTORY/
  app/                          # Git-Repo (einziger Arbeitsbereich)
    src/
      App.jsx                   # Root + Router (630 Zeilen)
      main.jsx                  # Entry
      index.css                 # Tailwind v4 + Fonts
      lib/pb.js                 # PocketBase Singleton
      pages/
        HomePage.jsx            # 26-Section Landing (1000+ Zeilen)
        CheckinPage.jsx         # 7-Step Form (667 Zeilen)
        CheckinResultPage.jsx   # Post-Success
        RegisterPage.jsx        # Signup + Validation
        LoginPage.jsx           # Login + Reset
        SettingsPage.jsx        # Password Change
    public/
      favicon.svg               # Gradient N (Brand)
    dist/                       # Production Build
    vite.config.js              # Minimal Vite
    tailwind.config.cjs         # Tailwind Theme
    package.json                # Leeres Manifest
    ROLES_AND_PERMISSIONS.md    # 11 Rollen, Access Matrix
    DEVELOPMENT_PROMPT.md       # Diese Datei
    AGENTS.md                   # Tech Reference
  static/                       # Served at /static/<file>
    (Logo, Hero, Design Assets)
  uploads/                      # User-Upload-Austausch (nicht served)

git branch: dev
git remote: https://github.com/neuroways/db_integration_ai.git
```

---

## 4. Datenmodell (62 Tabellen in 7 Kategorien)

### 4.1 Activity Catalog (7)
- `npl_activity_types` – Kategorien (Spiel, Sport, Handwerk, etc.)
- `npl_activities` – Master-Aktivitäten (Titel, Beschreibung, Dauer, Komplexität, Status)
- `npl_categories` – Hierarchische Kategorien
- `npl_category_links` – Activity-to-Category Mapping
- `npl_tags` – Freie Tags (ruhig, aktiv, kreativ, etc.)
- `npl_tag_links` – Activity-to-Tag Mapping
- `npl_relations` – Activity-to-Activity (ähnlich, gegensätzlich, abwechselnd)

### 4.2 Activity DNA (4)
- `npl_feature_groups` – Merkmal-Gruppen (motorisch, kognitiv, emotional, etc.)
- `npl_feature_definitions` – Merkmale (Kraft, Konzentration, etc.)
- `npl_feature_options` – Merkmalwerte (hoch, mittel, niedrig)
- `npl_activity_feature_values` – Activity + Merkmal + Wert

### 4.3 Board Games (9)
- `npl_publishers` – Verlage
- `npl_games` – Board-Game-Master
- `npl_editions` – Ausgaben
- `npl_persons` – Designer, Autoren
- `npl_contributors` – Zuordnung
- `npl_mechanics` – Spielmechaniken
- `npl_mechanic_links` – Game-to-Mechanic
- `npl_component_types` – Spielmaterial-Typen
- `npl_game_components` – Game-to-Component

### 4.4 Sources (4)
- `npl_sources` – Literaturquellen (Autor, ISBN, URL)
- `npl_source_documents` – PDFs, Artikel
- `npl_source_references` – Zitate in Aktivitäten
- `npl_provenance_records` – Nachverfolgung Datenursprung

### 4.5 Rules & Workflows (8)
- `npl_rules` – Spielregeln (Titel, Beschreibung, Status, Freigabe)
- `npl_rule_relations` – Rule-to-Rule (voraussetzung, variante, etc.)
- `npl_phases` – Spielphasen (Setup, Spielschleife, Ende)
- `npl_steps` – Handlungen in Phase
- `npl_core_loops` – Kern-Spielschleifen
- `npl_core_loop_steps` – Loops + Schritte
- `npl_learning_units` – Lernmodule
- `npl_effect_definitions` – Lerneffekte definieren

### 4.6 Users & Households (8)
- `npl_users` – Auth-Collection (E-Mail, Passwort, Status, Sprache, Timezone)
- `npl_human_profiles` – Benutzer-Profil (Name, Alter, Vorlieben, Avatar)
- `npl_user_preferences` – Individuelle Einstellungen
- `npl_households` – Gruppen, Familien
- `npl_household_members` – Zugehörigkeit + Rolle
- `npl_collections` – Benutzer-Listen (z.B. Favoriten)
- `npl_collection_items` – Collection + Activity Mapping
- `npl_roles` – Rollendefiniton (USER, COACH, EDITOR, etc.)

### 4.7 Matching & Recommendations (4)
- `npl_matching_models` – Algorithmus-Config (Gewichte, Schwellwerte)
- `npl_recommendations` – Vorschläge (Situation + Activity + Score)
- `npl_recommendation_factors` – Faktoren pro Rec (Energiematch, Dauer, etc.)
- `npl_recommendation_feedback` – Benutzer-Feedback ("hilf war" / "hilf nicht")

### 4.8 Sessions & Coaching (5)
- `npl_sessions` – Coaching-Sitzung (Datum, Teilnehmer, Typ)
- `npl_session_participants` – Session-Mitglied
- `npl_session_adjustments` – Regel-Anpassungen in Session
- `npl_game_states` – Snapshot während Spiel
- `npl_game_actions` – Aktion im Spiel (log)

### 4.9 Learning (1)
- `npl_user_learning_progress` – Fortschritt pro Benutzer + Unit

### 4.10 Observations & Effects (7)
- `npl_situations` – Benutzer-Situation (Energie, Zeit, Kontext) — **CRITICAL OWNERSHIP**
- `npl_situation_needs` – Situation + Bedürfnis — **CRITICAL FREMDRELATION**
- `npl_observations` – Beobachtung einer Aktivität (qualitativ)
- `npl_observed_effects` – Beobachtung + Effekt
- `npl_reflections` – Nachdenken, Tagebuch
- `npl_need_definitions` – 10 Kernbedürfnisse (Ruhe, Fokus, etc.)
- `npl_checkins` – Session-Datensatz (Typ, Status, Zeit) — **CRITICAL OWNERSHIP**

### 4.11 AI & Audit (2)
- `npl_ai_generations` – KI-Output (Prompt, Completion, Model)
- `npl_audit_logs` – Änderungshistorie (Wer, Was, Wann, Diff)

**Kritische Tabellen für Check-in-Flow:**
```
Situation (user_id REQUIRED, owned, soft-delete via deleted_at)
├─ Situation Needs (situation_id REQUIRED, need_definition_id REQUIRED)
└─ Checkins (situation_id REQUIRED, user_id REQUIRED, owned)
```

---

## 5. Aktuelle Seiten & Routen

| Route | Component | Status | Beschreibung |
| --- | --- | --- | --- |
| `/` | HomePage.jsx | ✅ LIVE | 26-Section Landing Page (Hero, Features, Use Cases, Pricing, CTA, Footer) |
| `/check-in` | CheckinPage.jsx | ✅ LIVE | 7-Step Form: Bedürfnisse → Energie → Zeit → Personen → Intensität → Zusätzliche Bedingungen → Zusammenfassung |
| `/check-in-result` | CheckinResultPage.jsx | ✅ LIVE | Ergebnisanzeige + Aktivitätsempfehlungen |
| `/register` | RegisterPage.jsx | ✅ LIVE | Signup (Name, E-Mail, Passwort 8+, Bestätigung) |
| `/login` | LoginPage.jsx | ✅ LIVE | Anmelden + Passwort-Reset (kein E-Mail-Versand, nur Kontakthinweis) |
| `/settings` | SettingsPage.jsx | ✅ LIVE | Passwort-Änderung (auth-required) |

**Geplante Routen (nicht implementiert):**
- `/dashboard` – Benutzer-Übersicht (Check-in-Verlauf, Empfehlungen, Einstellungen)
- `/activities` – Activity-Katalog (Suche, Filter, Details)
- `/household` – Haushalts-Management
- `/coaching` – Coach-Panel
- `/admin` – Admin-Dashboard

---

## 6. Sicherheit & Zugriffskontrolle

### 6.1 Rollen (11)

| Rolle | Scope | Auth | Use Case |
| --- | --- | --- | --- |
| GUEST | PUBLIC_FACTA | Nein | Aktivitäten/Regeln lesen |
| USER | PERSONAL | Ja | Eigene Situationen, Check-ins |
| MANAGED_MEMBER | HOUSEHOLD | Ja | Kind in Haushalt |
| HOUSEHOLD_MEMBER | HOUSEHOLD | Ja | Erwachsener in Haushalt |
| HOUSEHOLD_ADMIN | HOUSEHOLD | Ja | Haushalt verwalten |
| COACH | COACHING | Ja | Sieht freigegebene Daten |
| EDITOR | EDITORIAL | Ja | Aktivitäten/Regeln bearbeiten |
| REVIEWER | EDITORIAL | Ja | Aktivitäten prüfen |
| ORG_ADMIN | ORGANIZATION | Ja | Org-Daten + Audit |
| NPL_ADMIN | ADMIN | Ja | Alle Daten außer System |
| SYSTEM_ADMIN | SYSTEM | Ja | Alles (Super) |

### 6.2 Datenschutz

**Öffentlich lesbar:**
- `npl_activities` (Status = öffentlich)
- `npl_rules` (Status = öffentlich)
- `npl_need_definitions` (aktive)
- `npl_tags`, `npl_categories`, `npl_relations`

**Persönlich (Eigentümer nur):**
- `npl_situations` (user_id REQUIRED)
- `npl_situation_needs` (nur wenn situation_id Benutzer gehört)
- `npl_checkins` (user_id REQUIRED)
- `npl_reflections`, `npl_observations`
- `npl_human_profiles` (user_id REQUIRED)
- `npl_user_preferences` (nur für eigenes Profile)

**Haushalt (Members sichtbar):**
- `npl_collections` (household_id)
- `npl_game_states` (session → session_participants)

### 6.3 Kritische Sicherheitsreparationen (abgeschlossen)

**P1 – Eigentümerzwang:**
- `npl_situations.user_id` = REQUIRED
- `npl_checkins.user_id` = REQUIRED
- createRule: `@request.auth.id != "" && @request.body.user_id = @request.auth.id`
- updateRule: Eigentümer nicht manipulierbar

**P2 – Fremdrelationen blockiert:**
- `npl_situation_needs` createRule: `situation_id.user_id = @request.auth.id`
- `npl_checkins` createRule: `@request.body.situation_id.user_id = @request.auth.id`
- `npl_user_preferences` createRule: `human_profile_id.user_id = @request.auth.id`

**P3 – Öffentliche Fachdaten:**
- `npl_activities.listRule` = `""` (öffentlich)
- `npl_rules.listRule` = `""` (öffentlich)
- `npl_need_definitions.listRule` = `""` (öffentlich)

### 6.4 Gast-Isolation (aktuelle Implementierung)

**Gastmodus (CheckinPage.jsx):**
```javascript
if (isLoggedIn && pb.authStore.record?.id) {
  // Benutzer A: Speichert mit echter ID in PocketBase
} else {
  // Gast: Speichert LOKAL in sessionStorage nur
  sessionStorage.setItem('neuroplay.guest.currentCheckin', JSON.stringify(guestCheckin));
}
```

**Gast-Storage-Struktur:**
```javascript
{
  version: '0.1.0',
  createdAt: ISO-String,
  checkinType: 'QUICK' | 'FULL' | 'GROUP',
  situation: { energy, time, intensity, participants, context, location, noise, screen, materials, notes },
  needs: [ { id, name, code, priority } ],
  status: 'COMPLETED'
}
```

**Gast darf NICHT:**
- Benutzer-ID erzeugen
- Datensätze in PocketBase speichern
- Longterm-Daten persistieren
- Geräteübergreifend synchen

**Gast darf:**
- Bedürfnisse laden (öffentlich)
- Aktivitäten/Regeln lesen (öffentlich)
- Lokal passende Aktivitäten sehen
- sich anmelden (Übernahme-Dialog kommt)

---

## 7. Implementierter Check-in-Flow

### 7.1 Schritte (7)

1. **Bedürfnisse:** Multi-Select aus `npl_need_definitions` (Fallback: 10 hardcoded)
2. **Energie:** Schieber (0–10)
3. **Zeit:** Minuten (Schieber oder Input)
4. **Personen:** Solo / Duo / Gruppe / Publikum
5. **Intensität:** Schieber (0–10)
6. **Zusätzliche Bedingungen:** Material, Lärm, Screen, Notizen
7. **Zusammenfassung:** Review + Submit

### 7.2 Speicherlogik (Benutzer)

**saveSituation() in CheckinPage.jsx:**

```javascript
// 1. Situation erstellen
const situationData = {
  user_id: userId,
  available_time_minutes,
  energy_level,
  desired_intensity,
  participant_count,
  social_context,
  location_type,
  noise_level,
  screen_allowed,
  available_material_note,
  context_note
};
const situation = await pb.collection('npl_situations').create(situationData);

// 2. Situation Needs verknüpfen
for (const need of selectedNeeds) {
  await pb.collection('npl_situation_needs').create({
    situation_id: situation.id,
    need_definition_id: need.id,
    intensity_level: need.intensityLevel ?? null,
    priority_order: index + 1
  });
}

// 3. Check-in erstellen
await pb.collection('npl_checkins').create({
  user_id: userId,
  situation_id: situation.id,
  checkin_type: selectedMode,
  status: 'COMPLETED',
  completed_at: new Date().toISOString()
});
```

**Gast-Logik:** Keine API-Calls, nur sessionStorage.

---

## 8. Frontend-Design

**Farbschema:** Schieferblau (#2c3e50) + Smaragd/Cyan (#1abc9c) + Weiß
**Typografie:** Google Fonts (via `/.sfs/css2/`)
**Responsive:** Mobile-first (375px, 768px, 1280px)
**Icons:** Lucide Icons (Import: `import X from "icon:kebab-name"`)
**CSS:** Tailwind v4 (kein `@apply`, nur Utilities)

**Dark Mode:** Nicht implementiert (Default: Hell)
**Animations:** Minimal (Hover, Übergänge)
**Barrierefreiheit:** WCAG 2.1 Level AA (geplant, nicht vollständig geprüft)

---

## 9. Known Issues & TODOs

### 9.1 BLOCKING (vor Produktionsfreigabe)

- [ ] **PocketBase-API nicht erreichbar** – Backend ist extern gehostet, lokale Tests benötigen Zugang
- [ ] **32-Punkt Security Audit nicht durchgeführt** – Wartet auf API-Zugang
- [ ] **Benutzer-Check-in Fehlerbehandlung** – Teilfehler können verwaiste Situationen hinterlassen (kein atomarer Rollback)
- [ ] **Gast → Benutzer Übernahme** – Check-in nach Registrierung nicht implementiert
- [ ] **Aktivitätsempfehlungs-Algorithmus** – Matching-Engine nicht implementiert
- [ ] **Admin-Panel** – `npl_need_definitions` braucht UI
- [ ] **Brettspielcoach** – KI-Integration ausstehend

### 9.2 DEFERRED (nach MVP)

- [ ] Dashboard (`/dashboard`)
- [ ] Activity-Katalog mit Filter (`/activities`)
- [ ] Haushalt-Management (`/household`)
- [ ] Coaching-Panel (`/coaching`)
- [ ] Benutzer-Deletion & GDPR-Export
- [ ] Audit-Logging für kritische Zugriffe
- [ ] Anonymisierungs-Tools
- [ ] Multi-Language (nur DE implementiert)
- [ ] Dark Mode
- [ ] Mobile App (später)

### 9.3 TEST FAILURES

**P1 – Ownership Tests:** Nicht ausgeführt (API-Zugang)
**P2 – Fremdrelations Tests:** Nicht ausgeführt (API-Zugang)
**P3 – Public Access Tests:** Nicht ausgeführt (API-Zugang)

---

## 10. Abhängigkeiten & Constraints

**Unveränderlich:**
- React 18 + Router (Plattform-provided)
- PocketBase v0.39.0 JS SDK (Plattform-provided)
- Tailwind v4 (Plattform-provided)
- Node.js 24 (Plattform, kein `jq` oder `python`)

**Code-Qualität:**
- Keine Admin-Tokens im Browser
- Keine Fallback-Benutzer-IDs
- Keine `localStorage` für persönliche Daten
- Alle Auth über PocketBase JWT
- Alle Schreibvorgänge über Collection Rules

**Design:**
- Alle UI muss mobile-responsive sein (375px–1280px)
- Alle externe Bilder in `$PROJECT_DIRECTORY/static/`
- Alle Fonts via Google Fonts Link (1 `<link>` in `index.html`)
- Favicon als `public/favicon.svg`

---

## 11. Next Steps für übernehmende KI

### Phase 1: Umgebung & Tests

1. **PocketBase starten** – API muss auf Port 8090 oder äquivalent erreichbar sein
2. **32-Punkt Security Audit durchführen** – Alle Ownership-, Fremdrelations-, Public-Access-Tests
3. **Testbenutzer A & B erstellen** – Je eine `npl_users` Registrierung
4. **Gast-Check-in testen** – Browser-Storage kontrollieren, keine API-Calls
5. **Benutzer-Check-in E2E testen** – Alle 3 Datensätze (Situation, Needs, Checkin) prüfen

### Phase 2: Fehlerbehebung (falls nötig)

- Ownership-Fehler → Collection Rules verschärfen
- Fremdrelations-Fehler → Parent-Relations in Rules prüfen
- Public-Access-Fehler → Status-Felder in Rules korrigieren
- Teilfehler-Rollback → Transaktions-Logik (falls vorhanden) debuggen

### Phase 3: Feature-Entwicklung (nach Audit-OK)

1. **Matching-Engine** – Situation + Bedürfnisse → Activity-Score berechnen
2. **Empfehlung anzeigen** – Top 5 Aktivitäten auf `/check-in-result`
3. **Dashboard** – Benutzer sieht Verlauf, Favoriten, Profile
4. **Activity-Katalog** – Suche + Filter nach Tag, Dauer, Typ
5. **Admin-Panel** – Bedürfnisse, Regeln verwalten
6. **Haushalt** – Gruppen, Einladungen, freigegebene Check-ins
7. **Coaching** – Coach sieht freigegebene Daten + Tipps
8. **Brettspielcoach** – KI erklärt Regeln, schlägt Varianten vor

---

## 12. Deployment & Publishing

**Entwicklung:** `npm run dev` (Vite HMR auf `localhost:5173`)
**Produktion:** `npm run build` → `app/dist/` (statische Dateien)
**Veröffentlichung:** User klickt "Publish" auf Plattform-UI

**Git-Workflow:**
```bash
cd app
git status                    # Änderungen prüfen
git add .                     # Alle Dateien stagen
git commit -m "feat: Beschreibung"
git push origin dev           # Zu GitHub pushen
```

**Commits müssen:**
- Konventionelle Nachrichten nutzen (`feat:`, `fix:`, `refactor:`, `docs:`)
- Nur Inhalte in `app/` ändern (nie `$PROJECT_DIRECTORY` root)
- `AGENTS.md` und `DEVELOPMENT_PROMPT.md` nach größeren Änderungen aktualisieren

---

## 13. Kontakt & Eskalation

**Bei Fragen zu:**
- **Anforderungen:** Zurück zu `DEVELOPMENT_PROMPT.md` (diese Datei)
- **Datenmodell:** `ROLES_AND_PERMISSIONS.md` + `AGENTS.md` konsultieren
- **API-Details:** `app/src/lib/pb.js` inspizieren
- **Frontend-Patterns:** Bestehende Pages (HomePage, CheckinPage) als Referenz nutzen
- **Sicherheit:** Security Audit (32-Punkt) als Wahrheitskriterium verwenden

**Niemals annehmen:**
- Code funktioniert, weil er *aussieht* korrekt
- Eine Änderung ist sicher, ohne Tests
- Eigentümerzuordnung ist gültig ohne API-Nachweis
- Gäste speichern nicht serverseitig (immer prüfen)

---

## 14. Version & Letzte Aktualisierung

**Stand:** 2026-08-15 09:05 UTC
**Letzte Änderung:** Gast-Persistierungsfehler behoben, sessionStorage-only Logik, Masterprompt erstellt
**Nächste Aktualisierung:** Nach erfolgreichem Security Audit oder großer Feature-Zuführung

**Authoren:**
- Anfängliche Spezifikation: Nutzer (2026-08-XX)
- Gastmodus-Korrektur: AI Builder
- Security Audit: Ausstehend (wartet auf API-Zugang)

---

**Zum Übernehmen:** Lade diese Datei + `ROLES_AND_PERMISSIONS.md` + `AGENTS.md` + Git-Log als Kontext. Du hast dann alles, was du brauchst.
