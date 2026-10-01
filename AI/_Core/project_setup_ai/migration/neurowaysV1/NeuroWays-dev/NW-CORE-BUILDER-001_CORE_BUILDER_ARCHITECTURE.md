# NW-CORE-BUILDER-001 – NeuroWays Core Builder Architektur

**Dokumentcode:** NW-CORE-BUILDER-001  
**Titel:** NeuroWays Core Builder Architecture  
**Version:** 1.0.0  
**Status:** draft  
**Erstellt:** 2026-07-24  
**Bereich:** NeuroWays Core / Plattformarchitektur  
**Referenzen:** NW-STD-000, NW-STD-001, NW-STD-003, NW-PKG-001, NW-MODULE-001, NW-BUILDER-001, NW-KAS-001

---

## Änderungsverlauf

| Version | Datum | Änderung | Grund |
|---------|-------|----------|-------|
| 1.0.0 | 2026-07-24 | Erstfassung | Architektur-Fundament für alle zukünftigen Builder |

---

## Kapitel 1 — Ziel

### 1.1 Vision

Der NeuroWays Core Builder ist das Fundament aller zukünftigen Builders innerhalb der Plattform. Er stellt die universellen Mechanismen bereit, auf denen jeder spezialisierte Builder aufbaut.

Der Core Builder enthält **keine fachliche Logik einzelner Module**. Er definiert ausschließlich:

- das gemeinsame Objektmodell
- den universellen Lebenszyklus
- die gemeinsamen Funktionen
- das Erweiterungssystem
- die Datenprotokolle zwischen Buildern und der Plattform

### 1.2 Leitprinzip

> **Builder erzeugen Daten. Anwendungen interpretieren Daten. Der Core definiert das Protokoll.**

Ein Builder beschreibt, *was* ein Objekt ist. Die Plattform entscheidet, *wie* es technisch installiert, gespeichert und ausgeführt wird. Dadurch bleibt jedes erzeugte Dokument dauerhaft plattformunabhängig.

### 1.3 Abgrenzung

| Gehört zum Core Builder | Gehört NICHT zum Core Builder |
|------------------------|-------------------------------|
| Universelles Objektmodell | Fachliche Felder einzelner Module |
| Lebenszyklus und Status | Inhalte von Modulen |
| Versionierungsprotokoll | Spezifische Datenmodelle |
| Erweiterungssystem | Rendering-Logik |
| Validierungs-Engine | Plattformspezifische Implementierung |
| Export-/Import-Format | Benutzeroberflächen einzelner Builder |

---

## Kapitel 2 — Builder-Hierarchie

### 2.1 Schichtenmodell

```
┌─────────────────────────────────────────────────────────────┐
│                    NeuroWays Plattform                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │               NW-CORE-BUILDER-001                    │   │
│  │          Universeller Core Builder                   │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │  Gemeinsames Objektmodell (NWObject)         │    │   │
│  │  │  Lebenszyklus · Versionierung · Beziehungen │    │   │
│  │  │  Validierung · Export · Import · Suche      │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  └──────────────────────────────────────────────────────┘   │
│                           │                                  │
│     ┌─────────────────────┼─────────────────────┐           │
│     ▼                     ▼                     ▼           │
│  ┌────────┐          ┌─────────┐          ┌──────────┐      │
│  │Module  │          │Content  │          │Design    │      │
│  │Builder │          │Builder  │          │Builder   │      │
│  │(001)   │          │(002)    │          │(003)     │      │
│  └────────┘          └─────────┘          └──────────┘      │
│     │                     │                     │           │
│  ┌──────┐            ┌───────┐           ┌────────────┐     │
│  │Metho-│            │Media  │           │Token       │     │
│  │den-  │            │Build. │           │Builder     │     │
│  │Build.│            │(004)  │           │(005)       │     │
│  │(002a)│            └───────┘           └────────────┘     │
│  └──────┘                                                   │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Builder-Typen

| Code | Builder | Zuständigkeit | Status |
|------|---------|--------------|--------|
| NW-CB-001 | Core Builder | Fundament aller Builder | Dieses Dokument |
| NW-CB-002 | Module Builder | Modulstruktur und NWP-Packages | Implementiert (NW-BUILDER-001) |
| NW-CB-003 | Content Builder | Inhalte, Texte, Lerneinheiten | Geplant |
| NW-CB-004 | Media Builder | Bilder, Icons, Assets, Audio, Video | Geplant |
| NW-CB-005 | Design Builder | Tokens, Themes, Komponenten | Geplant |
| NW-CB-006 | Method Builder | Fragebogen, Check-ins, Assessments | Geplant |
| NW-CB-007 | Navigation Builder | Menüs, Routing, Sichtbarkeit | Geplant |
| NW-CB-008 | Dashboard Builder | Workspace-Karten, Layouts | Geplant |
| NW-CB-009 | Role Builder | Rollen, Berechtigungen, Zugriffsregeln | Geplant |
| NW-CB-010 | Release Builder | Releases, Deployments, Changelogs | Geplant |

### 2.3 Erweiterungsregel

Neue Builder entstehen **ausschließlich durch Erweiterung** des Core Builders. Der Core Builder wird dabei **nicht verändert**. Jeder Builder:

- erbt das universelle NWObject-Modell
- registriert eigene Felder über das Extension-Schema
- definiert eigene Aktionen über das Action-Protokoll
- exportiert im NWP-Standardformat

---

## Kapitel 3 — Universelles Objektmodell (NWObject)

### 3.1 Grundstruktur

Jedes Objekt in NeuroWays — unabhängig von Typ und Builder — basiert auf dieser unveränderlichen Kernstruktur:

```json
{
  "nwo_version": "1.0",
  "object_type": "MODULE | METHOD | CONTENT | MEDIA | DESIGN | ...",
  "id": "<uuid>",
  "code": "ENERGY_NAVIGATOR",
  "version": "1.1.0",
  "status": "draft | review | published | superseded | archived",
  "locale": "de",
  "locales_available": ["de", "en"],

  "meta": {
    "name": "Energy Navigator",
    "description": "...",
    "tags": ["energie", "selbstbeobachtung"],
    "category": "Gesundheit",
    "icon": "waves",
    "created_at": "2026-07-23T00:00:00Z",
    "updated_at": "2026-07-24T00:00:00Z",
    "created_by": "<user_id>",
    "updated_by": "<user_id>",
    "owner_id": "<user_id>"
  },

  "versioning": {
    "major": 1,
    "minor": 1,
    "patch": 0,
    "changelog": "Sechste Frage hinzugefügt.",
    "superseded_by": null,
    "parent_version": "1.0.0"
  },

  "lifecycle": {
    "status": "published",
    "published_at": "2026-07-23T00:00:00Z",
    "archived_at": null,
    "valid_from": "2026-07-01",
    "valid_until": null
  },

  "permissions": {
    "roles": ["USER", "ADMIN"],
    "visibility": "public | private | restricted",
    "license_type": "CORE | OPEN_SOURCE | ENTERPRISE | PAID"
  },

  "relations": {
    "parent_id": null,
    "children": [],
    "references": [],
    "dependencies": [],
    "supersedes": null
  },

  "i18n": {
    "source_locale": "de",
    "translations": {}
  },

  "accessibility": {
    "alt_text": null,
    "aria_label": null,
    "reduced_motion": false,
    "high_contrast": false
  },

  "media": {
    "thumbnail": null,
    "hero": null,
    "assets": []
  },

  "audit": {
    "history": [],
    "validation_result": null,
    "last_validated_at": null
  },

  "extensions": {}
}
```

### 3.2 Objekttypen

| Typ | Beschreibung | Erweiterung durch |
|-----|-------------|------------------|
| `MODULE` | Eigenständige Plattform-Erweiterung | Module Builder |
| `METHOD` | Strukturierter Ablauf (Fragen, Antworten, Auswertung) | Method Builder |
| `CONTENT` | Texte, Lerneinheiten, Beschreibungen | Content Builder |
| `MEDIA` | Bilder, Icons, Audio, Video, Animationen | Media Builder |
| `DESIGN` | Tokens, Themes, Komponenten, Illustrationen | Design Builder |
| `NAVIGATION` | Menüs, Routen, Sichtbarkeitsregeln | Navigation Builder |
| `DASHBOARD` | Workspace-Karten, Layouts, Schnellaktionen | Dashboard Builder |
| `ROLE` | Rollen, Berechtigungen, Zugriffsregeln | Role Builder |
| `RELEASE` | Releases, Deployments, Changelogs | Release Builder |
| `PACKAGE` | Installierbare NWP-Einheit | Core (direkt) |

### 3.3 Unveränderlichkeitsregel

Das NWObject-Schema ist versioniert. Eine veröffentlichte Version darf niemals rückwirkend verändert werden. Jede Erweiterung erzeugt eine neue NWObject-Version. Bestehende Objekte behalten ihre ursprüngliche Struktur.

---

## Kapitel 4 — Gemeinsame Core-Funktionen

### 4.1 Versionierung

Alle Objekte folgen semantischer Versionierung (MAJOR.MINOR.PATCH):

| Änderung | Version |
|----------|---------|
| Neue Pflichtfelder, Breaking Changes | MAJOR |
| Neue optionale Felder, neue Funktionen | MINOR |
| Korrekturen, Textkorrekturen | PATCH |

**Regeln:**
- Veröffentlichte Objekte sind unveränderlich
- Jede Änderung erzeugt eine neue Version
- Vorherige Versionen bleiben dauerhaft abrufbar
- `superseded_by` verweist auf die Nachfolgerversion

### 4.2 Lebenszyklus

```
draft ──► review ──► published ──► superseded ──► archived
  │                      │
  └──► rejected       deprecated
```

| Status | Bedeutung |
|--------|-----------|
| `draft` | In Bearbeitung, nicht veröffentlicht |
| `review` | Zur Prüfung freigegeben |
| `published` | Aktiv und sichtbar |
| `superseded` | Durch neuere Version ersetzt |
| `deprecated` | Wird bald entfernt, noch funktionsfähig |
| `archived` | Abgeschlossen, nicht mehr aktiv |
| `rejected` | Prüfung nicht bestanden |

### 4.3 Berechtigungen

Jedes Objekt trägt seine eigenen Zugriffsregeln. Die Plattform wertet diese aus, ohne dass der Builder die Zugriffslogik kennen muss.

```json
{
  "permissions": {
    "roles": ["USER", "ADMIN"],
    "visibility": "public",
    "license_type": "CORE",
    "org_restricted": false,
    "require_auth": true
  }
}
```

### 4.4 Beziehungen

Objekte referenzieren einander über stabile IDs und Codes — niemals durch Datenkopie:

| Beziehungstyp | Beschreibung |
|---------------|-------------|
| `parent_id` | Übergeordnetes Objekt |
| `children` | Untergeordnete Objekte |
| `references` | Externe Querverweise |
| `dependencies` | Erforderliche Objekte |
| `supersedes` | Ersetzte Vorgängerversion |

### 4.5 Mehrsprachigkeit (i18n)

Alle Texte in NWObjects sind strukturell mehrsprachig vorbereitet. Die Standardsprache wird in `source_locale` definiert. Übersetzungen werden als flache Schlüssel-Wert-Struktur gespeichert:

```json
{
  "i18n": {
    "source_locale": "de",
    "translations": {
      "en": {
        "meta.name": "Energy Navigator",
        "meta.description": "Observe your energy and stress level."
      },
      "fr": {
        "meta.name": "Navigateur d'énergie"
      }
    }
  }
}
```

Kein Text im Core Builder ist hardcodiert. Alle sichtbaren Texte durchlaufen die i18n-Schicht.

### 4.6 Barrierefreiheit

Jedes Objekt trägt strukturierte Accessibility-Metadaten. Diese werden von der Rendering-Schicht ausgewertet:

```json
{
  "accessibility": {
    "alt_text": "Kreisförmige Wellenlinie mit NW-Monogramm",
    "aria_label": "NeuroWays App-Symbol",
    "reduced_motion": false,
    "high_contrast": false,
    "font_scale": 1.0
  }
}
```

### 4.7 Medienreferenzen

Medien werden niemals direkt in ein NWObject eingebettet — sie werden referenziert:

```json
{
  "media": {
    "thumbnail": { "asset_code": "ENERGY_THUMBNAIL", "version": "1.0.0" },
    "hero":      { "asset_code": "FESTLAND_HERO",    "version": "1.1.0" },
    "assets":    ["ICON_WAVES", "AUDIO_INTRO"]
  }
}
```

### 4.8 Validierungs-Engine

Vor jeder Veröffentlichung führt der Core Builder eine strukturierte Prüfung durch:

```
Validierungsebenen:
  1. Schema-Validierung       — Pflichtfelder, Typen, Formate
  2. Beziehungs-Validierung   — Referenzen auflösbar?
  3. Versions-Validierung     — Kein Konflikt mit bestehenden Versionen?
  4. Berechtigungs-Validierung — Rollen vorhanden?
  5. i18n-Validierung         — Mindestens eine Übersetzung vollständig?
  6. Medien-Validierung       — Alle referenzierten Assets vorhanden?
  7. Abhängigkeits-Prüfung    — Alle Abhängigkeiten aktiv?
```

Ergebnis:
```json
{
  "valid": true | false,
  "errors": [],
  "warnings": [],
  "validated_at": "2026-07-24T06:00:00Z"
}
```

### 4.9 Export / Import (NWP-Format)

Das NeuroWays Package Format (.nwp) ist das einzige offizielle Austauschformat. Es enthält:

```json
{
  "nwp_version": "1.0",
  "format": "neuroways-package",
  "created_at": "...",
  "objects": [
    { ...NWObject... },
    { ...NWObject... }
  ],
  "checksum": "sha256:...",
  "manifest_version": "1.0"
}
```

**Import-Regeln:**
- Bestehende Objekte werden durch Upsert (Code + Version) aktualisiert
- Neuere Versionen überschreiben ältere nie rückwirkend
- Konflikte werden gemeldet, niemals still gelöst
- Benutzer- und Laufzeitdaten werden niemals importiert

### 4.10 Suche und Filterung

Der Core Builder stellt eine universelle Suchschnittstelle bereit, die von allen spezialisierten Buildern genutzt wird:

```
Suchparameter:
  object_type    — Objekttyp filtern
  status         — Nur bestimmte Status
  version        — Exakte oder neueste Version
  locale         — Sprachfilter
  tags           — Tag-Suche (UND / ODER)
  category       — Kategorie
  full_text      — Volltextsuche in name, description
  created_after  — Zeitraum
  created_before
  owner_id       — Eigentümerfilter
```

---

## Kapitel 5 — Erweiterungssystem

### 5.1 Grundprinzip

Spezialisierte Builder erweitern das NWObject **niemals durch Modifikation**, sondern durch **Deklaration** im `extensions`-Feld:

```json
{
  "extensions": {
    "module_builder": {
      "features": ["dashboard_card", "own_pages"],
      "nav_config": { "path": "/energy", "label": "Energie", "icon": "waves" },
      "dashboard_cards": ["today_card", "quick_action"],
      "data_objects": ["CHECK_IN", "RESULT_RULE", "JOURNEY_ENTRY"]
    }
  }
}
```

### 5.2 Extension-Schema

Jeder Builder registriert sein Extension-Schema einmalig beim Core:

```json
{
  "extension_schema": {
    "builder_id": "module_builder",
    "version": "1.0.0",
    "fields": [
      { "key": "features",       "type": "array<string>", "required": false },
      { "key": "nav_config",     "type": "object",        "required": false },
      { "key": "dashboard_cards","type": "array<string>", "required": false },
      { "key": "data_objects",   "type": "array<string>", "required": false }
    ],
    "actions": ["install", "activate", "deactivate", "generate_package"],
    "preview_component": "ModulePreview"
  }
}
```

### 5.3 Aktions-Protokoll

Builder-spezifische Aktionen werden über ein universelles Aktions-Protokoll ausgelöst:

```json
{
  "action": "install",
  "actor": "<user_id>",
  "target_object_id": "<id>",
  "target_version": "1.1.0",
  "parameters": {},
  "timestamp": "2026-07-24T06:00:00Z"
}
```

Antwort:
```json
{
  "success": true,
  "action": "install",
  "result": {},
  "errors": [],
  "audit_id": "<log_id>"
}
```

### 5.4 Vorschau-System

Jeder Builder kann eine Vorschau-Komponente registrieren. Der Core Builder stellt den Rahmen bereit; der Builder definiert den Inhalt:

```
Core Builder         Spezialisierter Builder
     │                        │
     │ ◄── PreviewRequest ────┤
     │                        │
     │ ──── ObjectData ──────►│
     │                        │
     │ ◄── RenderedPreview ───┤
     │                        │
     │ ──── Preview-Frame ───► Benutzer
```

### 5.5 Erweiterungsregeln

1. Extensions dürfen Core-Felder nicht überschreiben
2. Extensions müssen ein gültiges Schema registrieren
3. Unbekannte Extension-Felder werden ignoriert (keine Fehler)
4. Extensions sind optional — ein NWObject ist ohne Extensions valide
5. Extensions versionieren sich unabhängig vom Core

---

## Kapitel 6 — Architekturprinzipien

### 6.1 Core vor Implementierung

Der Core Builder definiert das Protokoll, bevor die Plattform implementiert. Kein Builder darf plattformspezifische Annahmen in sein Schema einbetten.

**Erlaubt:**
```json
{ "storage": "persistent", "scope": "per_user" }
```

**Nicht erlaubt:**
```json
{ "pocketbase_collection": "checkins", "sqlite_table": "checkins" }
```

### 6.2 Daten statt Hardcoding

Kein Wert, der sich ändern kann, darf im Code feststehen. Alle Konfigurationen werden als Datenobjekte gespeichert und können ohne Code-Änderung aktualisiert werden.

| Hardcoded (verboten) | Datengetrieben (korrekt) |
|---------------------|--------------------------|
| `if (zone === "festland")` | `resolveResultRule(rules, score)` |
| `questions = [...]` | `getQuestionsForMethod(methodId)` |
| `MIN_SCORE = 6` | `rules.find(r => r.min_score)` |

### 6.3 Eine Information existiert nur einmal

Jede Information hat genau einen autoritativen Speicherort. Alle anderen Stellen referenzieren diesen.

```
✗ result_rules.color = "#2a9d8f"
  world_regions.color = "#2a9d8f"    ← Duplikat

✓ design_tokens.nw-festland = "#2a9d8f"
  result_rules.primary_color_token = "nw-festland"
  world_regions.primary_color_token = "nw-festland"
```

### 6.4 Referenzieren statt Kopieren

Objekte verweisen aufeinander über stabile Codes. Niemals werden Inhalte eines Objekts in ein anderes kopiert.

### 6.5 Builder erzeugen Daten, Anwendungen interpretieren Daten

Der Module Builder erzeugt ein JSON-Manifest. NeuroWays (oder eine andere Plattform) interpretiert dieses Manifest und installiert das Modul entsprechend der Zielplattform. Das Manifest enthält keine plattformspezifischen Anweisungen.

### 6.6 Mehrsprachigkeit von Anfang an

Jedes NWObject ist mehrsprachig vorbereitet. Kein Text ist direkt in die Objekt-ID eingebettet. Alle sichtbaren Bezeichnungen durchlaufen die i18n-Schicht.

### 6.7 Barrierefreiheit als Pflicht

Jedes NWObject trägt Accessibility-Metadaten. Fehlende Felder erzeugen eine Warnung bei der Validierung (kein Fehler in v1.0, Pflicht ab v2.0).

### 6.8 Erweiterbarkeit ohne Core-Anpassung

Neue Objekte, neue Builder, neue Plattformen entstehen durch:
- Neue Einträge in der Builder-Registry
- Neue Extension-Schemas
- Neue NWP-Aktionen

Der Core Builder wird dabei nicht verändert.

---

## Kapitel 7 — Designentscheidungen

### 7.1 Warum NWObject und nicht direkte Tabellen?

Ein gemeinsames Basismodell ermöglicht:
- Universelle Such- und Filterlogik
- Einheitliche Versionierung
- Plattformunabhängige Portabilität
- Generische Builder-Infrastruktur

Nachteil: Höhere initiale Komplexität.  
Entscheidung: Langfristige Wartbarkeit überwiegt.

### 7.2 Warum JSON statt Binärformat für NWP?

- Menschenlesbar und prüfbar
- Plattformunabhängig
- Versionskontrolle möglich (diff-fähig)
- Keine spezielle Toolchain erforderlich

Nachteil: Größer als Binärformat bei großen Assets.  
Entscheidung: Für v1.0 akzeptabel. Assets werden separat referenziert.

### 7.3 Warum Erweiterung statt Vererbung?

Klassenvererbung erzeugt enge Kopplung. Das Extension-Schema erlaubt:
- Unabhängige Versionierung
- Optionale Nutzung
- Rückwärtskompatibilität
- Mehrere simultane Erweiterungen

### 7.4 Warum keine direkte Plattformkopplung?

NeuroWays kann auf PocketBase, Oracle APEX, PostgreSQL oder anderen Plattformen laufen. Das NWObject-Modell und das NWP-Format müssen auf allen Plattformen identisch interpretierbar sein.

---

## Kapitel 8 — Akzeptanzkriterien

Ein Core Builder gilt als vollständig implementiert, wenn:

1. ✅ Jedes NWObject besitzt die vollständige Kernstruktur (Kapitel 3.1)
2. ✅ Alle spezialisierten Builder erweitern NWObject über das Extensions-Feld
3. ✅ Der Lebenszyklus (Kapitel 4.2) wird für alle Objekttypen durchgesetzt
4. ✅ Semantische Versionierung (Kapitel 4.1) ist für alle Objekte aktiv
5. ✅ Das NWP-Format (Kapitel 4.9) ist das einzige Exportformat
6. ✅ Die Validierungs-Engine (Kapitel 4.8) wird vor jeder Veröffentlichung ausgeführt
7. ✅ Alle sichtbaren Texte durchlaufen die i18n-Schicht (Kapitel 4.5)
8. ✅ Accessibility-Felder sind strukturell vorhanden (Kapitel 4.6)
9. ✅ Keine Plattformreferenzen im NWObject-Schema (Kapitel 6.1)
10. ✅ Neue Builder entstehen ohne Core-Modifikation (Kapitel 5)
11. ✅ Alle Informationen existieren genau einmal (Kapitel 6.3)
12. ✅ Import und Export erzeugen identische Ergebnisse (Idempotenz)

---

## Kapitel 9 — Beispiele

### 9.1 NWObject: Module (vollständig)

```json
{
  "nwo_version": "1.0",
  "object_type": "MODULE",
  "id": "notrnocy6rfikoc",
  "code": "ENERGY_NAVIGATOR",
  "version": "1.1.0",
  "status": "published",
  "locale": "de",
  "locales_available": ["de"],
  "meta": {
    "name": "Energy Navigator",
    "description": "Persönlicher Energie- und Belastungszustand beobachten.",
    "tags": ["energie", "selbstbeobachtung", "neurodivergenz"],
    "category": "Gesundheit",
    "icon": "waves",
    "created_at": "2026-07-23T00:00:00Z",
    "updated_at": "2026-07-24T00:00:00Z",
    "owner_id": "neuroways-core"
  },
  "versioning": {
    "major": 1, "minor": 1, "patch": 0,
    "changelog": "Sechste Frage (Aufgabenwechsel) hinzugefügt. Ergebnisskala auf 6–30 angepasst.",
    "parent_version": "1.0.0"
  },
  "lifecycle": {
    "status": "published",
    "published_at": "2026-07-23T00:00:00Z"
  },
  "permissions": {
    "roles": ["USER"],
    "visibility": "public",
    "license_type": "CORE"
  },
  "relations": {
    "dependencies": ["NW-CORE"]
  },
  "extensions": {
    "module_builder": {
      "features": ["dashboard_card", "own_pages", "methods", "evaluations"],
      "nav_config": { "path": "/checkin", "label": "Energy Navigator", "icon": "waves", "order": 10 },
      "dashboard_cards": ["today_checkin", "last_result"],
      "data_objects": ["CHECK_IN", "CHECK_IN_ANSWER", "RESULT_RULE", "JOURNEY_ENTRY"]
    }
  }
}
```

### 9.2 NWObject: Method (Methoden-Objekt)

```json
{
  "nwo_version": "1.0",
  "object_type": "METHOD",
  "code": "ENERGY_CHECK",
  "version": "1.1.0",
  "meta": { "name": "Energy Check-in", "category": "Selbstbeobachtung" },
  "extensions": {
    "method_builder": {
      "execution_modes": ["app", "seminar", "workshop", "coaching"],
      "questions": ["ENERGY_Q1", "ENERGY_Q2", "ENERGY_Q3", "ENERGY_Q4", "ENERGY_Q5", "ENERGY_Q6"],
      "scoring": { "type": "sum", "result_rules_code": "ENERGY_RESULT_RULES" },
      "estimated_duration_minutes": 2
    }
  }
}
```

### 9.3 Ungültige Erweiterung (verboten)

```json
{
  "extensions": {
    "module_builder": {
      "pocketbase_collection": "checkins",    ← VERBOTEN: Plattformreferenz
      "sqlite_path": "/data/energy.db",       ← VERBOTEN: Implementierungsdetail
      "react_component": "CheckIn.jsx"        ← VERBOTEN: Framework-Referenz
    }
  }
}
```

### 9.4 Builder-Registrierung (neuer spezialisierter Builder)

```json
{
  "builder_registration": {
    "builder_id": "sleep_builder",
    "name": "Schlaf-Builder",
    "version": "0.1.0",
    "extends": "module_builder",
    "extension_schema": {
      "fields": [
        { "key": "sleep_phases",    "type": "array<string>" },
        { "key": "wearable_sync",   "type": "boolean" },
        { "key": "dream_journal",   "type": "boolean" }
      ],
      "actions": ["sync_wearable", "export_sleep_report"]
    }
  }
}
```

---

## Kapitel 10 — Roadmap zur Umsetzung

### Phase 1 — Foundation (aktuell)

| Aufgabe | Status |
|---------|--------|
| Core Builder Architektur definieren | ✅ Dieses Dokument |
| Module Builder (NW-BUILDER-001) | ✅ Implementiert |
| NWP-Format v1.0 | ✅ Implementiert |
| Validierungs-Engine (Basis) | ✅ Implementiert |
| Builder-Hierarchie definiert | ✅ Dieses Dokument |

### Phase 2 — NWObject-Migration

| Aufgabe | Priorität |
|---------|-----------|
| Bestehende Module auf NWObject-Format migrieren | Hoch |
| pkg_modules → NWObject-Schema erweitern | Hoch |
| nwp_packages → NWP-Format v1.0 vollständig | Hoch |
| i18n-Schicht für alle Objekte | Mittel |
| Accessibility-Validierung (Warnung) | Mittel |

### Phase 3 — Spezialisierte Builder

| Builder | Abhängigkeiten | Priorität |
|---------|---------------|-----------|
| Method Builder (NW-CB-006) | Core, Module Builder | Hoch (NeuroPlay) |
| Content Builder (NW-CB-003) | Core | Mittel |
| Media Builder (NW-CB-004) | Core, Asset Management | Mittel |
| Design Builder (NW-CB-005) | Core, Design Standard | Mittel |
| Navigation Builder (NW-CB-007) | Core, Module Builder | Niedrig |

### Phase 4 — NeuroPlay als erstes Vollmodul

| Aufgabe | Beschreibung |
|---------|-------------|
| NeuroPlay-Modul über Module Builder erstellen | Erster vollständiger Praxistest |
| Method Builder für NeuroPlay-Methoden | Spielmethoden als NWObjects |
| Dashboard-Karte für NeuroPlay | Integration in Personal Workspace |
| NWP-Export für NeuroPlay v0.1.0 | Erstes vollständiges Community-Package |

### Phase 5 — Marketplace-Vorbereitung

| Aufgabe | Beschreibung |
|---------|-------------|
| Builder-Registry (zentral) | Alle Builder registriert und abrufbar |
| NWP-Signierung | Packages kryptografisch signieren |
| Community-Builder | Externe Builder-Registrierung |
| Marketplace-Protokoll | Sicherer Package-Austausch |

---

## Kapitel 11 — Offene Entscheidungen

| Punkt | Beschreibung | Ausstehend bis |
|-------|-------------|----------------|
| NWObject Binary Format | Für große Asset-Packages sinnvoll? | Phase 3 |
| Builder-Authentifizierung | Wie werden externe Builder verifiziert? | Phase 5 |
| Offline-Modus für Builder | NWP lokal ohne Verbindung erzeugen? | Phase 3 |
| Echtzeit-Kollaboration | Mehrere Benutzer arbeiten gleichzeitig? | Phase 5 |
| KI-Assisted Builder | KI schlägt Felder und Regeln vor? | Phase 4+ |
| Multimodal-Content | Audio, Video, AR direkt in NWObjects? | Phase 4 |

---

## Kapitel 12 — Referenzen

| Dokument | Beziehung |
|----------|-----------|
| NW-STD-000 Standards Framework | Governance-Grundlage |
| NW-STD-001 Naming Standard | Codes und Bezeichner |
| NW-STD-003 Database Standard | Datenmodell-Prinzipien |
| NW-PKG-001 Package Model | NWP-Format-Grundlage |
| NW-MODULE-001 Modulverwaltung | Builder-Registrierung |
| NW-BUILDER-001 Module Builder | Erster spezialisierter Builder |
| NW-KAS-001 Knowledge Asset Standard | Inhaltsobjekte |
| NW-DS-003 Color System | Design-Token-Referenz |
| NW-DEPLOY-001 Deployment Standard | Package-Deployment |

---

*NW-CORE-BUILDER-001 — NeuroWays Core Builder Architektur — v1.0.0 — draft — 2026-07-24*
