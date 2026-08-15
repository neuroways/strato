# Migration Quick-Start — 5-Minuten-Übersicht

**Zielgruppe:** KI oder Entwickler, die Migration starten wollen  
**Status:** Roadmap, keine Implementierung  

---

## Die 3 Fakten

### 1️⃣ NeuroWays Core = Fundament (erledigt)

- **4 Core Standards** sind published: Governance, Standards Framework, Naming, Database
- **Identity & Membership** definiert (draft, aber stabil)
- **Module/Package-Modell** definiert (NW-PKG-001)
- **Design System** komplett (NEUROWAYS_WORLD v1.1.0)

→ **Core ist bereit.** Keine Blokker.

### 2️⃣ NeuroBalance = Energy Navigator (produktiv, hybrid)

- **Daten**: 6 Fragen, 5 Zonen, 11 Check-ins — alle im DB
- **Code**: Data-driven (keine hardcodierten Fragen)
- **Skala**: 1–5 pro Frage → 6–30 Gesamt (korrekt seit 2026-07-23)
- **Historische Daten**: Mit `method_version` versioned — sicher

→ **NeuroBalance läuft.** Funktioniert.

### 3️⃣ Migration = Übergang zu NWObjects (geplant, nicht blockierend)

- **Ziel**: Seed-Daten von `methods`, `questions`, `answer_options`, `result_rules` auf NW-CORE-OBJECT-001-Format migrieren
- **Methode**: Expand → Migrate → Validate → Contract (parallel Collections, Fallback)
- **Phasen**: 10 Phasen nach NW-MIGRATION-001, Phase 0–4 kritisch für NeuroBalance
- **Risiko**: Gering (Versionierung schützt Historisches)
- **Downtime**: 0 (Parallel-Collections)

→ **Migration ist verständlich und niedrig-risiko.** Starten wenn bereit.

---

## Die 5 kritischen Schritte

| Schritt | Was | Wann | Impact |
|---------|-----|------|--------|
| **0** | Smoke-Tests + Rollback-Plan | Jetzt | Grüne Baseline setzen |
| **1** | Design-Tokens als NWObjects | 1–2 Tage | Keine Auswirkung (Fallback) |
| **2** | CONTENT-Objekte (Texte) | 2–3 Tage | Keine Auswirkung (Fallback) |
| **3** | METHOD/QUESTION/SCORING migrieren | 3–4 Tage | engine.js Queries neu + Test |
| **4** | MODULE & SPEC | 1 Tag | Spezifizierung nur, kein Code-Change |

**Nach Phase 4:** NeuroBalance läuft komplett auf NW-Objekten, alte Collections sind Fallback.

---

## Die 1 Warnung

**Was NIEMALS ändern:**

❌ Historische Checkins neuberechnen  
❌ Zonen umbenennen oder umfärben  
❌ Skala ändern ohne neue METHOD-Version  
❌ Alte Feldwerte löschen vor Phase 10 (Contract)

Alle Schritte müssen **rückrollbar** sein.

---

## Die 2 Dateien zum Lesen

1. **Diese Datei** → Überblick (5 min)
2. **MIGRATION_BRIEFING_REPORT.md** → Vollständige Analyse (30 min)
3. **NW-MIGRATION-001** → Detaillierte Prozesse (60 min)

---

## Die 1 Checkliste vor Start

```
☐ Phase 0 Vorbereitung abgeschlossen
  ☐ Bestandsinventar erstellt (1 METHOD, 6 QUESTIONS, 5 RULES, 11 CHECKINS)
  ☐ Smoke-Tests bestanden
  ☐ DB-Snapshot vor Phase 1
  ☐ Rollback-Plan dokumentiert
  
☐ Core-Voraussetzungen erfüllt
  ☐ NW-GOVERNANCE-FOUNDATION-v1.0 published
  ☐ NW-CORE-OBJECT-001 v1.0+ ready
  ☐ NW-MIGRATION-001 verstanden
  
☐ Team bereit
  ☐ Dev-Umgebung isoliert
  ☐ Tests geschrieben (Validierung Phase 1–4)
  ☐ Rollback-Prozess trainiert
```

---

## Das Endergebnis

Nach Phase 4:

```
✅ Alle Seed-Daten sind NWObjects
✅ Keine Datenduplikation
✅ Historische Checkins unverändert
✅ engine.js nutzt neue Collections
✅ Fallback funktioniert
✅ 0 Downtime für Benutzer
```

---

**Nächster Schritt:** Lese MIGRATION_BRIEFING_REPORT.md für Details.

