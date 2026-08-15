# NeuroQuest – Abenteuerbegleiter für Lernaufgaben

**Vollständige Projektübergabe – 15. August 2026**

## 🚀 Was ist NeuroQuest?

NeuroQuest ist ein **Abenteuerbegleiter** (nicht: Lernplattform, nicht: Spiel) für Grundschulkinder der Klassen 1–4.

Die App verbettet tägliche Lernaufgaben in eine fesselnde, ruhige Geschichte. Das Kind weiß immer, was kommt (sichere Routine). Das Kind weiß nie, wie die Geschichte weitergeht (Spannung).

### Pädagogisches Leitprinzip

> "So spannend wie nötig. So ruhig wie möglich."

Belohnt werden: **Dranbleiben, Selbstkontrolle, Aufmerksamkeit** – nicht Geschwindigkeit oder Perfektion.

---

## 📖 Status: MVP Phase (The Magic 5)

✅ **Live:**
- Multi-role authentication (Kind, Lehrkraft, Eltern, Admin)
- "Die Magische 5" – 5 Runden pro Tag, 5 exakte Schritte pro Runde
- Story mit Grade-Anpassungen (Klasse 1–4)
- Abenteuerbuch (Story-Archiv)
- Emotional-rediertes Design (warm, ruhig, liebevoll)
- Responsive Mobildesign

⏳ **In Planung (Week 2+):**
- PocketBase Cloud-Sync (für Geräteübergreifung)
- Lehrkraft-Week-Builder (Missionen definieren)
- Eltern-Messaging (motivierende Nachrichten)
- Admin-Tools (Benutzerverwaltung)

---

## 🛠 Tech Stack

- **Frontend:** React 18 + React Router 7
- **Styling:** Tailwind CSS 4
- **Backend:** PocketBase 0.39.0 (SQLite, REST API)
- **Build:** Vite 6
- **Sprache:** Deutsch (de)

**Alle Dependencies sind Platform-provided. Nicht npm install verwenden!**

---

## 📚 Dokumentation

1. **[PROJECT_HANDOVER.md](docs/handover/PROJECT_HANDOVER.md)** ← **START HERE** (28 sections, vollständig)
2. **[app/AGENTS.md](app/AGENTS.md)** – Technische Spezifikation (original)
3. **[app/ARCHITECTURE.md](app/ARCHITECTURE.md)** – Architektur-Entscheidungen
4. **[QUICKSTART.md](QUICKSTART.md)** – 2-Minuten Einstieg

---

## ⚡ Quick Start

### Development

```bash
cd app
npm run dev
# Opens http://localhost:5173
```

Demo-Konten:
- Kind: kid@demo.de / demo123
- Lehrkraft: teacher@demo.de / demo123
- Eltern: parent@demo.de / demo123
- Admin: admin@demo.de / demo123

### Production Build

```bash
cd app
npm run build:prod
git add -A
git commit -m "feat: description"
git push origin dev
# Platform auto-deploys to /.sfs/
```

### Test Build Locally

```bash
npm run build
npm run preview
```

---

## 🎯 Nächste Aufgaben (P0)

### Week 2: PocketBase Data Migration + Teacher/Parent Interfaces

1. **P0-001: PocketBase Migration** (8h)
   - `magicFiveData.ts` → `story_parts` collection
   - `magicFiveMissions.ts` → `mission_rounds` collection
   - localStorage progress → `round_progress` collection
   - Result: Device change syncs progress

2. **P0-002: Teacher Week Builder** (12h)
   - Week creation form
   - Mission editor (5 days × 5 sentences)
   - Hint writing UI
   - Class assignment
   - Result: Teachers can create weeks without code

3. **P1-001: Parent Messaging** (6h)
   - `messages` collection
   - Parent dashboard messaging UI
   - Child sees messages in mission
   - Result: Parents can write encouragement

4. **P1-002 to P1-004: Content + Infrastructure** (40h)
   - 4 more demo stories
   - Story illustrations
   - Offline Service Worker

---

## 🏗 Zentrale Dateien

| Datei | Zweck | Wichtigkeit |
|---|---|---|
| `src/pages/MagicFiveMission.jsx` | Core Game Loop (Magic 5) | ⭐⭐⭐ |
| `src/lib/magicFiveData.ts` | Story Definitions (all grades) | ⭐⭐⭐ |
| `src/lib/auth.tsx` | Authentication + ProtectedRoutes | ⭐⭐⭐ |
| `src/App.jsx` | Routing + Layout | ⭐⭐ |
| `index.html` | Meta Tags + Page Setup | ⭐⭐ |

---

## 🔐 Sicherheit

✅ **Kein Secrets in Repo:**
- Keine API-Keys in Quellcode
- .env.example bereitgestellt (ohne echte Werte)
- Token nur via Environment-Variablen
- .gitignore konfiguriert

⚠ **Vor Launch:**
- GDPR Compliance Review
- Terms of Service + Privacy Policy
- Data Deletion Procedures

---

## 📊 Metriken

- **Codebase:** 18 TypeScript/React-Dateien, ~2100 Zeilen
- **Build:** Vite (optimiert, < 400KB gzipped)
- **Database:** 10 PocketBase collections (SQLite)
- **Routes:** 7 main routes (auth-protected where needed)
- **Responsive:** 375px → 1280px (mobile-first)

---

## ⚠️ Bekannte Einschränkungen (wird Week 2 gelöst)

1. **Keine Cloud-Sync:** Fortschritt nur lokal (localStorage)
   - → Fix Week 2: PocketBase migration

2. **Keine Teacher/Parent Funktionen:** Nur Skeletons
   - → Fix Week 2: Full CRUD interfaces

3. **Nur 1 Demo-Story:** 5 Tage im Zauberwald
   - → Fix Week 2: 4 weitere Geschichten (Nebelberge, Kristallmeer, Sternenschloss)

---

## 🚨 Kritische Nächste Schritte

**Sofort (nächste 8 Stunden):**
1. Read `docs/handover/PROJECT_HANDOVER.md` (Sections 1-10)
2. Understand The Magic 5 flow in `MagicFiveMission.jsx`
3. Plan PocketBase data migration

**Diese Woche:**
1. Migrate data to PocketBase
2. Build Teacher Week Builder
3. Test device sync

**Nicht verhandeln:**
- Keine Secrets in Git
- Die Magic 5 Logik nicht ändern ohne Test
- Alle 4 Klassenstufenvarianten für jede Geschichte
- Kein Gamification/Punkte/Noten

---

## 📞 Kontakt & Fragen

Siehe `docs/handover/PROJECT_HANDOVER.md` Section 27 – "Einstiegspunkt für die nächste KI"

---

**NeuroQuest ist live und bereit für die nächste Entwicklungsphase.**

*Für vollständige Dokumentation: [PROJECT_HANDOVER.md](docs/handover/PROJECT_HANDOVER.md)*
