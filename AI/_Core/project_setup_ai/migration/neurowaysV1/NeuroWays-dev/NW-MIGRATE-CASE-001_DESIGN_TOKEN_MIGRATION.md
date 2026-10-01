# NW-MIGRATE-CASE-001 – Design Token Migration Report

**Dokumentcode:** NW-MIGRATE-CASE-001  
**Titel:** Design Token Migration Report  
**Version:** 1.1.0  
**Status:** published  
**Erstellt:** 2026-07-24  
**Migrations-Code:** MIG-001-P1  
**Bereich:** NeuroWays Core / Produktive Migration  
**Referenzen:** NW-MIGRATION-001, NW-CORE-OBJECT-001, NW-DS-001, NW-DS-003, NW-MILESTONE-001

---

## Änderungsverlauf

| Version | Datum | Änderung | Grund |
|---------|-------|----------|-------|
| 1.0.0 | 2026-07-24 | Erstfassung | Erste Migrationsphase abgeschlossen (16 Tokens) |
| 1.1.0 | 2026-07-24 | Vollständig ausgebaut | +29 abgeleitete Tokens, Theme-Objekt, Architekturprüfung |

---

## Kapitel 1 — Übersicht

### 1.1 Migrationskennung

```
Migrations-Code:    MIG-001-P1
Phase:              Phase 1 — Design Tokens
Muster:             Expand → Migrate → Validate → Contract (Contract gesperrt)
Ausgeführt:         2026-07-24
Prüfsumme:          6e821dd9184b4b844b3d6776929bd91d...
Validierungen:      12/12 bestanden
Ergebnis:           PASS
```

### 1.2 Referenz-Implementierung

Diese Migration ist die erste produktive Anwendung von NW-MIGRATION-001 und des Architecture Freeze v1.0. Sie dient als Referenzimplementierung für alle folgenden Migrationsphasen.

---

## Kapitel 2 — Bestandsaufnahme

### 2.1 Ausgangssituation

| Collection | Einträge | Typ |
|------------|----------|-----|
| `design_tokens` | 16 | Farben (Zonen + Neutralfarben) |
| `animation_rules` | 6 | Animationsdauern und Easing |
| `design_rules` | 27 | Textregeln (Illustrationen, Bewegung, Komponenten) |

### 2.2 Kategorisierung

Nach Analyse des gesamten Design-Systems wurden folgende Token-Kategorien identifiziert:

| Kategorie | Vorher | Nach Migration | Quelle |
|-----------|--------|---------------|--------|
| Farbe (Zonen) | 10 direkt | 10 NWObjects | `design_tokens` migriert |
| Farbe (Neutral) | 6 direkt | 6 NWObjects | `design_tokens` migriert |
| Farbe (Brand) | 0 | 5 NWObjects | NW-DS-003 abgeleitet |
| Typografie | 0 | 6 NWObjects | Design-System abgeleitet |
| Abstände | 0 | 5 NWObjects | Design-System abgeleitet |
| Radien | 0 | 4 NWObjects | Design-System abgeleitet |
| Animationsdauer | 0 | 4 NWObjects | `animation_rules` abgeleitet |
| Easing | 0 | 1 NWObject | `animation_rules` abgeleitet |
| Layout | 0 | 4 NWObjects | Design-System abgeleitet |
| **Gesamt** | **16** | **45** | |

---

## Kapitel 3 — Migrationsprotokoll

### Phase 1 — EXPAND

**16 Original-Tokens als NWObjects:**

| Token | NWO-ID | Kategorie | Wert |
|-------|--------|-----------|------|
| nw-sky | o5ymlbydci8sija | color | #f0f4f5 |
| nw-water | ohbvhhp306yarc9 | color | #c8dfe8 |
| nw-ground | 7rexruuy09mel02 | color | #e8e0d5 |
| nw-neutral-bg | ekr1cuja4tluo3n | color | #f9fafb |
| nw-text | 93tbgbnzkg4dvs6 | color | #2d3748 |
| nw-text-muted | c1mnb15y80ywfvs | color | #6b7280 |
| nw-festland | sxxc9wh734w3d7a | color | #2a9d8f |
| nw-wald | m18tqx88ztmg9mu | color | #52b788 |
| nw-kueste | b93txhv9pqte6a5 | color | #4a9abb |
| nw-meer | o2ajrcl8p8if9dr | color | #6b7faa |
| nw-insel | m1q97ux7e9lnjs4 | color | #8b6f9e |
| nw-festland-bg | ueog6v03c3e9l5o | color | #e8f5f3 |
| nw-wald-bg | adb365aizv422bg | color | #edf6f1 |
| nw-kueste-bg | ps1zux44zhwpqzu | color | #eaf4f8 |
| nw-meer-bg | szhjrafwzhjioy7 | color | #eff1f7 |
| nw-insel-bg | o7m1vbgjxk8vpqg | color | #f3eff7 |

**29 abgeleitete Tokens (vollständiges System):**

Typografie: `nw-font-family-primary`, `nw-font-size-base`, `nw-font-size-heading`, `nw-font-weight-bold`, `nw-font-weight-normal`, `nw-line-height-base`

Abstände: `nw-spacing-xs` (4px), `nw-spacing-sm` (8px), `nw-spacing-md` (16px), `nw-spacing-lg` (24px), `nw-spacing-xl` (40px)

Radien: `nw-radius-sm` (8px), `nw-radius-md` (12px), `nw-radius-lg` (20px), `nw-radius-full` (9999px)

Animationen: `nw-duration-fast` (150ms), `nw-duration-normal` (300ms), `nw-duration-slow` (500ms), `nw-duration-loop` (6000ms), `nw-easing-default`

Layout: `nw-breakpoint-mobile` (375px), `nw-breakpoint-tablet` (768px), `nw-breakpoint-desktop` (1280px), `nw-max-width-content` (640px)

Marke: `nw-brand-deep-navy` (#0A1F44), `nw-brand-teal` (#008CA8), `nw-brand-violet` (#7B4BA2), `nw-brand-warm-gold` (#E2A83B), `nw-brand-soft-white` (#F6F4F1)

**Theme-Objekt NEUROWAYS_LIGHT:** 45 Tokens verknüpft, `brand_code: NEUROWAYS`

### Phase 2 — MIGRATE

`design_tokens`-Collection um drei Felder erweitert:
- `nwo_ref` → NWO-ID (Referenz auf NWObject)
- `nwo_version: "1.0.0"`
- `migration_status: "MIGRATED"`

Alle 16 Original-Einträge verknüpft. **Kein Originalwert verändert.**

### Phase 3 — VALIDATE

**12 von 12 Validierungsprüfungen bestanden:**

| # | Prüfung | Ergebnis |
|---|---------|---------|
| V01 | 45 NWO-Tokens vorhanden | ✅ |
| V02 | Alle 45: status=PUBLISHED | ✅ |
| V03 | Alle 45 Codes eindeutig | ✅ |
| V04 | Alle Kategorien vorhanden (7 Typen) | ✅ |
| V05 | THEME NEUROWAYS_LIGHT vorhanden | ✅ |
| V06 | Originalwert nw-festland unverändert (#2a9d8f) | ✅ |
| V07 | Alle 16 Original-Tokens: nwo_ref + MIGRATED | ✅ |
| V08 | App unverändert (result_rules + checkins lesbar) | ✅ |
| V09 | Brand-Token nw-brand-deep-navy: #0A1F44 | ✅ |
| V10 | Rückverfolgbarkeit: alle 45 mit migrated_from | ✅ |
| V11 | Kein Duplikat zwischen migriert und abgeleitet | ✅ |
| V12 | White-Label: brand_code + 45 Tokens verknüpft | ✅ |

---

## Kapitel 4 — Phase 4: CONTRACT (gesperrt)

### 4.1 Altfelder, die später entfernt werden können

| Collection | Altfeld | Entfernen nach |
|------------|---------|---------------|
| `design_tokens` | `value` (direkt) | Wenn App NWO-Refs nutzt |
| `design_tokens` | `token_type` (direkt) | Gemeinsam mit `value` |
| `design_tokens` | `world_version_id` (direkt) | Wenn NWO-Collection kanonisch ist |
| `animation_rules` | Alle direkt-Felder | Nach Ableitung als NWO-Tokens |

### 4.2 Voraussetzungen für Contract

| Bedingung | Status |
|-----------|--------|
| Alle Phasen 1–9 validiert | ⏳ Phase 1 abgeschlossen |
| App-Code liest ausschließlich NWO-Refs | ❌ `engine.js` liest noch direkt |
| Deprecation-Zeitraum (60 Tage) | ❌ Noch nicht gestartet |
| Zweites Review | ❌ Ausstehend |

**Contract bleibt gesperrt** — keine Downtime, keine App-Unterbrechung. Das ist das gewünschte Verhalten.

---

## Kapitel 5 — Architekturprüfung

### 5.1 Reicht das Objektmodell für zukünftige Themes?

**Ja.** Das `THEME`-NWObject mit `brand_code`, `token_refs` und `parent_theme_ref` unterstützt:

- Light/Dark-Theme-Wechsel → neues THEME-Objekt mit denselben Token-Codes, anderen Werten
- Theme-Vererbung → `parent_theme_ref` auf Basis-Theme
- Theme-Versionen → NWObject-Versionierung (v1.0.0 → v1.1.0)

### 5.2 Unterstützt es White-Label-Systeme?

**Ja, vollständig.** Das `brand_code`-Feld im THEME-Objekt identifiziert die Marke. White-Label bedeutet:

```
THEME "PARTNER_A_LIGHT"
  brand_code:   "PARTNER_A"
  parent_theme_ref: → THEME "NEUROWAYS_LIGHT"  (erbt Basis-Tokens)
  token_refs:   [nur die überschriebenen Tokens]
```

Kein Core-Eingriff nötig. ✅

### 5.3 Unterstützt es mehrere Marken?

**Ja.** Jede Marke hat ein eigenes THEME-NWObject mit eigenem `brand_code`. Die Token-Codes bleiben stabil — nur die Werte unterscheiden sich:

```
THEME "NEUROWAYS_LIGHT"    brand_code: NEUROWAYS   nw-brand-deep-navy: #0A1F44
THEME "NEUROPLAY_THEME"    brand_code: NEUROPLAY   nw-brand-deep-navy: #2D1B69 (Beispiel)
```

### 5.4 Unterstützt es Design-System-Versionen?

**Ja.** NWObjects sind semantisch versioniert. Eine neue Design-System-Version bedeutet:

```
nwo_design_tokens "NW_FESTLAND" v1.0.0  → #2a9d8f  (eingefroren)
nwo_design_tokens "NW_FESTLAND" v1.1.0  → #27927a  (neue Version)
THEME "NEUROWAYS_LIGHT" v1.1.0 → referenziert v1.1.0-Tokens
Historische Sessions referenzieren weiterhin v1.0.0-Tokens
```

Vollständige Versionierung. Historische Darstellungen unveränderlich. ✅

### 5.5 Erweiterungsbedarf

| Bedarf | Status | Maßnahme |
|--------|--------|---------|
| Shadow-Tokens (box-shadow) | Nicht vorhanden | Extension-Feld, kein Core-Eingriff |
| Icon-Referenzen als Tokens | Nicht vorhanden | ASSET-Referenz ausreichend |
| Component-spezifische Tokens (z. B. Button.color) | Nicht vorhanden | Extension in COMPONENT-Objekt |

**Kein Core-Eingriff erforderlich.** Alle Erweiterungen via Extension lösbar. ✅

---

## Kapitel 6 — Rollback-Nachweis

```
Phase 1 Rollback:  nwo_design_tokens + nwo_themes Collections löschen
                   → App läuft unverändert weiter (liest design_tokens direkt)
                   → Zeit: < 30 Sekunden

Phase 2 Rollback:  nwo_ref, nwo_version, migration_status in 16 Records leeren
                   → Keine Auswirkung auf App-Verhalten
                   → Originalwerte zu keinem Zeitpunkt verändert
```

**Rollback vollständig möglich.** ✅

---

## Kapitel 7 — Risikobewertung

| Risiko | Schweregrad | Status |
|--------|------------|--------|
| Originalwerte verändert | KRITISCH | ✅ Nicht eingetreten — V06 |
| Referenzen nicht auflösbar | HOCH | ✅ Nicht eingetreten — V07 |
| Redundante Token-Namen | MITTEL | ✅ Nicht eingetreten — V11 |
| App beschädigt | HOCH | ✅ Nicht eingetreten — V08 |
| White-Label-Struktur unvollständig | MITTEL | ✅ Nicht eingetreten — V12 |

---

## Kapitel 8 — Abschlussentscheidung

### ✅ PASS

**Die vollständige Design-Token-Migration ist abgeschlossen.**

- 45 NWObjects angelegt (16 migriert + 29 abgeleitet)
- 7 Token-Kategorien vollständig
- 1 Theme-Objekt (NEUROWAYS_LIGHT) mit 45 Tokens und brand_code
- 12/12 Validierungsprüfungen bestanden
- Nullpunkt-Datenverlust
- Vollständige Rollback-Fähigkeit
- App läuft ohne Unterbrechung weiter
- White-Label, Multi-Brand, Design-System-Versionierung architektonisch unterstützt
- Contract-Phase korrekt gesperrt
- Prüfsumme: `6e821dd9184b4b844b3d6776929bd91d...`

**Referenz-Implementierung erfolgreich.** Alle nachfolgenden Migrationsphasen verwenden denselben Prozess.

---

## Kapitel 9 — Nächste Schritte

| Schritt | Phase | Beschreibung |
|---------|-------|-------------|
| Phase 2a | Content | Methodentexte als CONTENT-NWObjects |
| Phase 2b | Content | Zonentexte, Fragetexte, Antwortlabels |
| Phase 3 | Methoden | METHOD, QUESTION, ANSWER_OPTION, SCORING_RULE |
| Phase 4 | Module | MODULE NWObject Energy Navigator |
| App-Update | — | engine.js auf NWO-Referenzen umstellen |

---

*NW-MIGRATE-CASE-001 — Design Token Migration Report — v1.1.0 — published — MIG-001-P1 — 2026-07-24*
