# NW-VALIDATE-CASE-002 – NeuroPlay Core Stress Test

**Dokumentcode:** NW-VALIDATE-CASE-002  
**Titel:** NeuroPlay Core Stress Test  
**Version:** 1.1.0  
**Status:** review  
**Erstellt:** 2026-07-24  
**Bereich:** NeuroWays Core / Architekturvalidierung  
**Referenzen:** NW-CORE-BUILDER-001, NW-CORE-OBJECT-001, NW-VALIDATE-001, NW-VALIDATE-CASE-001

---

## Änderungsverlauf

| Version | Datum | Änderung | Grund |
|---------|-------|----------|-------|
| 1.0.0 | 2026-07-24 | Erstfassung | Stresstest der Core-Architektur mit hochkomplexem Spielmodul |
| 1.1.0 | 2026-07-24 | Vollständig ausgebaut | Spielmaterial, Szenarien, Kampagnen, Analog/Digital, Mehrspieler vollständig |

---

## Ausgangslage

Der Energy Navigator wurde in NW-VALIDATE-CASE-001 erfolgreich validiert.

**Ergebnis: PASS WITH EXTENSIONS**

Bereits akzeptierte Extensions — gelten als gelöst, werden nicht erneut als Lücken bewertet:

- CONTENT-basierter Aktivitätskatalog
- CONSENT-Objekt für granulare Freigaben
- CONVERSATION-Objekttyp (durch beide Fälle belegt)

---

## Kapitel 1 — Ziel und Prüfbereich

### 1.1 Warum NeuroPlay als maximaler Stresstest?

NeuroPlay stellt den komplexesten Anwendungsfall innerhalb von NeuroWays dar. Im Gegensatz zum Energy Navigator kommen hinzu:

- **Spielsysteme** mit verzweigten, nicht-linearen Zuständen
- **Zufall** als nicht-deterministisches Strukturelement
- **Mehrspieler** — Einzel, Koop, Teams, Wettbewerb
- **Physisches Spielmaterial** — Karten, Marker, Figuren, Spielbrett
- **Digitale und analoge Durchführung** für dieselbe Methode
- **Kampagnen** — mehrsitzige, narrative Spielverläufe
- **Flowisaurus** als persistenter KI-Charakter
- **Fortschritt** — kumulativ, zeitabhängig, domänenübergreifend

Wenn das Modell hier trägt, trägt es für alle zukünftigen NeuroWays-Module.

### 1.2 Was wird NICHT erneut geprüft

Bereits in NW-VALIDATE-CASE-001 bestätigt:
- Fragetext-Trennung (QUESTION → CONTENT)
- Design-Token-Referenzierung
- RESULT-Unveränderlichkeit
- Lifecycle und Versionierung

---

## Kapitel 2 — Vollständige Objektinventur

### 2.1 Plattform-Objekte

| Objekttyp | Code | Fachliche Rolle | Lifecycle | Extension |
|-----------|------|----------------|-----------|-----------|
| `MODULE` | NEUROPLAY | Das gesamte Spielmodul | PUBLISHED | `module_builder` |
| `MODULE_SPEC` | NEUROPLAY_QUEST_SPEC | Verknüpfung Methode ↔ Spiel-Kontext | PUBLISHED | `module_builder` |
| `EXECUTION_MODE` | NEUROPLAY_APP / WORKSHOP / ANALOG / COOP | Wie wird gespielt? | PUBLISHED | `method_builder` |
| `NAVIGATION` | NEUROPLAY_NAV | Menüeintrag | PUBLISHED | `module_builder` |
| `PAGE` | PLAY, QUEST, COLLECTION, LEADERBOARD | Ansichten | PUBLISHED | `module_builder` |
| `DASHBOARD` | NEUROPLAY_DASHBOARD | Spieler-Workspace-Bereich | PUBLISHED | `dashboard_builder` |
| `WIDGET` | EGG_TODAY, STREAK, LEVEL_BADGE | Dashboard-Karten | PUBLISHED | `dashboard_builder` |

### 2.2 Spiel-Objekte (alle via `neuroplay_builder`-Extension)

| Objekttyp | Fachliche Rolle | Versioniert | Betriebsdatum? |
|-----------|----------------|-------------|----------------|
| `GAME` | Konkretes Spiel mit Regeln und Material | Ja | Nein |
| `GAME_TYPE` | Kategorie (Kartenspiel, Rollenspiel, Brettspiel) | Nein | Nein |
| `GAME_RULE` | Einzelne Spielregel | Ja | Nein |
| `SCENARIO` | Einmalige Spielkonfiguration (Szenario-Beschreibung) | Ja | Nein |
| `CAMPAIGN` | Mehrsitzige Erzählung aus mehreren Szenarien | Ja | Nein |
| `QUEST` | Missionsauftrag mit Bedingungen und Belohnungen | Ja | Nein |
| `MISSION` | Teilaufgabe in einer Quest | Ja | Nein |
| `TASK` | Kleinstaufgabe in einer Mission | Ja | Nein |
| `CHARACTER` | Spielfigur (Flowisaurus, Archetypen) | Ja | Nein |
| `AVATAR` | Visuelles Spieler-Abbild | Ja | Nein |
| `CARD` | Einzelne Spielkarte | Ja | Nein |
| `CARD_DECK` | Kartenstapel aus mehreren Karten | Ja | Nein |
| `DICE_CONFIG` | Würfelkonfiguration | Ja | Nein |
| `BOARD` | Spielbrett (physisch + digital) | Ja | Nein |
| `MARKER` | Spielmarker (physisch + digital) | Ja | Nein |
| `TOKEN` | Ressourcentoken | Ja | Nein |
| `REWARD` | Belohnungsobjekt (XP, Badge, Karte) | Ja | Nein |
| `ACHIEVEMENT` | Dauerhafter Meilenstein | Ja | Nein |
| `INVENTORY` | Sammlung von Karten/Items (Benutzer) | Nein | Ja (Betriebsdatum) |
| `GAME_SESSION` | Einzelne Spielsitzung | Nein | Ja (Betriebsdatum) |
| `CAMPAIGN_SESSION` | Mehrsitzige Kampagnen-Sitzungsreihe | Nein | Ja (Betriebsdatum) |
| `PLAYER_STATE` | Persistenter Spielerfortschritt | Nein | Ja (Betriebsdatum) |
| `GAME_EVENT` | Ereignis innerhalb einer Session | Nein | Ja (Betriebsdatum) |

### 2.3 Prüfung: Alle als NWObject modellierbar?

| Typ | NWObject-Kern | Extension ausreichend? |
|-----|--------------|----------------------|
| Alle Stammdaten-Objekte (GAME bis ACHIEVEMENT) | ✅ Ja | ✅ `neuroplay_builder` |
| Alle Betriebsdaten (GAME_SESSION bis PLAYER_STATE) | ✅ Ja (als Betriebsdatum) | ✅ |
| CAMPAIGN (mehrsitzig, narrativ) | ✅ Ja — wie MODULE_SPEC mit Schritten | ✅ |
| BOARD (physisch + digital) | ✅ Ja — ASSET-Referenzen | ✅ |
| MARKER / TOKEN (physisch) | ✅ Ja — CONTENT + ASSET | ✅ |

**Ergebnis: Alle 28 Objekttypen lassen sich als NWObjects mit Extensions modellieren.** ✅

---

## Kapitel 3 — Methodenmodell

### 3.1 Schichtmodell für NeuroPlay

```
METHOD_TYPE "SELBSTBEOBACHTUNG"      METHOD_TYPE "SPIEL"
        │                                    │
        ▼                                    ▼
METHOD "ENERGY_CHECK v1.1.0"         METHOD "NEUROPLAY_FLOW v1.0"
(identisch mit Energy Navigator)     (Spielabfolge als Methode)
        │                                    │
        ├────────────────────────────────────┤
        ▼                                    ▼
MODULE_SPEC "NEUROPLAY_QUEST_SPEC"
  (Kontext: Quest-Einbindung, Flowisaurus, XP-Vergabe)
        │
        ├── EXECUTION_MODE "NEUROPLAY_APP"        (digital, einzeln)
        ├── EXECUTION_MODE "NEUROPLAY_COOP"       (digital, Gruppe)
        ├── EXECUTION_MODE "NEUROPLAY_WORKSHOP"   (physisch, Karten, moderiert)
        ├── EXECUTION_MODE "NEUROPLAY_ANALOG"     (Brettspiel, kein Gerät)
        └── EXECUTION_MODE "NEUROPLAY_COACHING"   (1:1, Flowisaurus als Coach)
                │
                └── CONTENT (Ausführungsform-spezifisch)
                    z. B. andere Kartenformulierungen für Workshop
```

### 3.2 Spielunabhängige Methoden

Diese Methoden existieren im Core — NeuroPlay referenziert sie, ohne sie zu duplizieren:

| Methode | Nutzung in NeuroPlay |
|---------|---------------------|
| `METHOD "ENERGY_CHECK"` | Quest-Pflichtschritt, tägliche Mission |
| (zukünftig) `METHOD "FOCUS_CHECK"` | Missionsvoraussetzung |
| (zukünftig) `METHOD "STRESS_SCAN"` | Kampagnen-Checkpoint |

### 3.3 Spielspezifische Methoden

Methoden, die ausschließlich in NeuroPlay Sinn ergeben:

```
METHOD "NEUROPLAY_FLOW"
  method_type_ref:  → METHOD_TYPE "SPIEL"
  extensions:
    neuroplay_builder:
      game_ref:       → GAME "NEUROPLAY_CORE"
      involves_dice:  true
      involves_cards: true
      team_play:      optional
```

---

## Kapitel 4 — Spielmodell

### 4.1 Hierarchie der Spielobjekte

```
GAME "NEUROPLAY_CORE"
  │
  ├──enthält──► GAME_RULE [×n]          (Spielregeln, unveränderlich)
  ├──enthält──► CARD_DECK "ENERGY_DECK" (Kartenstapel-Definition)
  │               └──enthält──► CARD [×60]
  ├──enthält──► DICE_CONFIG "D6_STANDARD"
  ├──enthält──► BOARD "NEUROWAYS_MAP"
  ├──enthält──► MARKER [×n]
  ├──enthält──► TOKEN [×n]
  ├──enthält──► CHARACTER "FLOWISAURUS"
  ├──enthält──► ACHIEVEMENT [×20]
  │
  ├──referenziert──► CAMPAIGN "INTRO_CAMPAIGN"
  │                    └──enthält──► SCENARIO [×5]
  │                                    └──enthält──► QUEST [×n]
  │                                                    └──enthält──► MISSION [×n]
  │                                                                    └──enthält──► TASK [×n]
  └──referenziert──► REWARD [×n]
```

### 4.2 Szenarien und Kampagnen

```
CAMPAIGN "INTRO_CAMPAIGN"
  code:             NEUROPLAY_INTRO
  version:          1.0.0
  name_ref:         → CONTENT "CAMPAIGN_INTRO_NAME"   ("Deine erste Reise")
  description_ref:  → CONTENT "CAMPAIGN_INTRO_DESC"
  prerequisites:    []                                  (Einstieg für alle)
  scenario_refs:    → [SCENARIO × 5]                  (referenziert)
  unlock_ref:       → ACHIEVEMENT "CAMPAIGN_INTRO_COMPLETE"

SCENARIO "ENERGY_AWAKENING"
  campaign_ref:     → CAMPAIGN "NEUROPLAY_INTRO"
  sort_order:       1
  name_ref:         → CONTENT "SCENARIO_ENERGY_AWK_NAME"
  quest_refs:       → [QUEST × 3]
  prerequisite_ref: null                               (Erstes Szenario)
  unlock_condition: { type: "SCENARIO_COMPLETE", scenario_ref: "ENERGY_AWAKENING" }
```

### 4.3 Spielzustände

**Kritische Frage:** Sind Spielzustände eigenständige Objekte, Zustände oder Inhalte?

**Antwort:** Spielzustände (GAME_STATE) sind **Betriebsdaten** innerhalb von `GAME_SESSION`. Sie sind kein eigener Objekttyp — sondern ein Extension-Feld:

```
GAME_SESSION.extensions.neuroplay_builder:
  current_phase:      "QUEST"           (SETUP | QUEST | RESOLUTION | END)
  current_round:      3
  active_quest_ref:   → QUEST "DAILY_ENERGY"
  board_state:        { player_positions: {...}, resource_counts: {...} }
  deck_state:         { cards_remaining: 42, discard_pile: [...] }
  dice_results:       [4, 6, 2]
```

Spielzustände sind flüchtig — sie existieren nur innerhalb einer Session und werden nicht separat versioniert. ✅

---

## Kapitel 5 — Zufallsmechanik

### 5.1 Modellierungsprinzip

Zufallsmechaniken haben zwei Teile:
- **Konfiguration** (Stammdatum, unveränderlich): `DICE_CONFIG`, `CARD_DECK`
- **Ergebnis** (Betriebsdatum): Extension-Feld in `GAME_SESSION`

```
DICE_CONFIG "D6_ENERGY"
  sides:           6
  count:           1
  modifier:        0
  purpose_ref:     → CONTENT "DICE_ENERGY_PURPOSE"
  result_mapping:
    1:   → CARD_TYPE "CHALLENGE"
    2-3: → CARD_TYPE "OPPORTUNITY"
    4-5: → CARD_TYPE "RESOURCE"
    6:   → CARD_TYPE "WILDCARD"

GAME_SESSION.dice_results: [4, 6, 2, 5]   ← Betriebsdatum, nicht im Stamm
```

### 5.2 Karten ziehen

```
CARD_DECK "ENERGY_DECK"
  code:         NEUROPLAY_ENERGY_DECK
  version:      1.0.0
  card_refs:    → [CARD × 60]          (referenziert, nicht enthält)
  shuffle_seed: null                   (Server-generiert zur Laufzeit)

GAME_SESSION.deck_state:
  remaining_cards: [CARD_CODE_1, CARD_CODE_7, ...]   ← Betriebsdatum
  drawn_cards:     [...]
  discarded_cards: [...]
```

**Prüfpunkt:** Der `shuffle_seed` ist ein Laufzeitwert — er gehört nicht in das Stammdatum-Objekt. ✅

### 5.3 Wahrscheinlichkeiten

Wahrscheinlichkeitsverteilungen sind in `GAME_RULE`-Objekten definiert — als deklarative Regeln, nicht als Implementierungslogik:

```
GAME_RULE "CARD_DRAW_PROBABILITY"
  rule_text_ref:  → CONTENT "RULE_DRAW_DESC"
  rule_config:    { type: "WEIGHTED_DRAW", weights: { CHALLENGE: 0.3, OPPORTUNITY: 0.4, WILDCARD: 0.3 } }
```

Die Plattform interpretiert diese Konfiguration. Das Manifest enthält keine Zufallsalgorithmen. ✅

---

## Kapitel 6 — Spielmaterial

### 6.1 Physisches und digitales Material — dieselben Objekte

**Designprinzip:** `CARD`, `BOARD`, `MARKER`, `TOKEN` sind NWObjects. Sie beschreiben das Spielmaterial fachlich. Die physische oder digitale Ausprägung ist eine `ASSET`-Referenz.

```
CARD "ENERGY_BOOST_CARD_001"
  card_type:           RESOURCE
  rarity:              UNCOMMON
  sort_order:          42

  name_ref:            → CONTENT "CARD_ENERGY_BOOST_NAME_DE"
  description_ref:     → CONTENT "CARD_ENERGY_BOOST_DESC_DE"
  flavor_text_ref:     → CONTENT "CARD_ENERGY_BOOST_FLAVOR_DE"  (Spielwelt-Zitat)
  audio_ref:           → CONTENT "CARD_ENERGY_BOOST_AUDIO_DE"

  image_digital_ref:   → ASSET "CARD_ENERGY_BOOST_DIGITAL.png"  (800×1120, RGB)
  image_print_ref:     → ASSET "CARD_ENERGY_BOOST_PRINT.pdf"    (63×88mm, CMYK, Schnittmarken)
  image_thumb_ref:     → ASSET "CARD_ENERGY_BOOST_THUMB.png"    (64×90px)
  back_image_ref:      → ASSET "NEUROPLAY_CARD_BACK"

  color_token_ref:     → DESIGN_TOKEN "neuroplay.card.resource.color"
  effect:              { type: "SCORE_MODIFIER", dimension: "energy", value: +3 }
  related_method_ref:  → METHOD "ENERGY_CHECK"

BOARD "NEUROWAYS_MAP"
  image_digital_ref:   → ASSET "BOARD_NEUROWAYS_MAP_DIGITAL.png"   (3840×2160)
  image_print_ref:     → ASSET "BOARD_NEUROWAYS_MAP_PRINT.pdf"     (A2, CMYK)
  image_tablet_ref:    → ASSET "BOARD_NEUROWAYS_MAP_TABLET.png"    (2048×1536)

MARKER "PLAYER_MARKER_A"
  image_digital_ref:   → ASSET "MARKER_A_DIGITAL.png"
  image_3d_ref:        → ASSET "MARKER_A_3D.stl"                   (3D-Druckdatei)
```

**Prüfpunkt:** Dasselbe Spielmaterial-Objekt beschreibt analog und digital. Der Unterschied ist ausschließlich welches `ASSET` im jeweiligen `EXECUTION_MODE` verwendet wird. Keine Duplikation. ✅

### 6.2 Physisch vs. digital — Abgrenzung

| Material | Eigenes Objekt? | Warum |
|----------|----------------|-------|
| Karte | ✅ CARD | Hat Spieleffekte, Rarity, Deck-Zugehörigkeit |
| Kartenstapel | ✅ CARD_DECK | Hat Regeln über Zusammensetzung |
| Spielbrett | ✅ BOARD | Ist eigenständige Spielkomponente |
| Marker | ✅ MARKER | Kann eigene Eigenschaften haben |
| Ressourcentoken | ✅ TOKEN | Zählbare Spielressource |
| Würfel | ✅ DICE_CONFIG | Hat Konfiguration und Verteilung |
| Spielanleitung | ❌ CONTENT | Ist reiner Textinhalt, kein Spielobjekt |
| Spielthema/Hintergrundillustration | ❌ ASSET | Ist nur visuelle Dekoration |

---

## Kapitel 7 — Mehrspieler

### 7.1 Einzelspieler

Standard-Fall. `GAME_SESSION` enthält eine `entity_ref`.

### 7.2 Kooperation (Koop)

```
GAME_SESSION "COOP_2026_07_24"
  entity_refs:     [→ ENTITY "svenja", → ENTITY "lena"]
  team_ref:        null   (kein formelles Team notwendig)
  session_type:    COOP

  shared_state:    { shared_xp: 450, shared_quest_ref: "QUEST_FESTLAND" }

  player_records: [
    { entity_ref: → ENTITY "svenja", role: "EXPLORER",
      individual_score: 12, cards_played: ["ENERGY_BOOST"] },
    { entity_ref: → ENTITY "lena",   role: "HEALER",
      individual_score: 9,  cards_played: ["RECOVERY_CARD"] }
  ]
```

**Kooperation erfordert keinen neuen Core-Typ.** `GAME_SESSION` trägt mehrere `entity_refs` und ein `shared_state`-Extension-Feld. ✅

### 7.3 Teams

```
GAME_SESSION "TEAM_SESSION_2026"
  team_refs:       [→ ENTITY (TEAM) "team-a", → ENTITY (TEAM) "team-b"]
  session_type:    TEAM_VS_TEAM

  team_states: [
    { team_ref: → ENTITY "team-a", team_score: 180, quest_progress: 0.6 },
    { team_ref: → ENTITY "team-b", team_score: 145, quest_progress: 0.4 }
  ]
```

**Prüfpunkt:** `ENTITY (TEAM)` ist bereits im Core definiert. Kein neuer Typ erforderlich. ✅

### 7.4 Rollen im Mehrspieler

Spielerrollen (EXPLORER, HEALER, TACTICIAN) sind **keine Plattform-Rollen** — sie sind Spielmechanik. Sie werden als Extension-Konfiguration in `GAME_RULE` oder direkt als Feld in `PLAYER_RECORD` gespeichert:

```
GAME_RULE "PLAYER_ROLES"
  rule_config:
    roles: [
      { code: "EXPLORER", bonus_dimension: "energy",    bonus_value: 2 },
      { code: "HEALER",   bonus_dimension: "recovery",  ability: "share_xp" },
      { code: "TACTICIAN",bonus_dimension: "decisions", ability: "reroll" }
    ]
```

Spielerrollen werden **nicht** mit `ROLE`-Plattformobjekten vermischt. ✅

### 7.5 Sichtbarkeit im Mehrspieler

| Information | Sichtbar für | Modellierung |
|-------------|-------------|-------------|
| Eigener Spielstand | Nur eigene ENTITY | Standard-Datenisolation |
| Team-Fortschritt | Alle Teammitglieder | CONSENT mit scope: TEAM_SESSION |
| Gegner-Score (Wettbewerb) | Alle Spieler | GAME_SESSION.visibility = PUBLIC_SCORE |
| Persönliche Methoden-Ergebnisse | Nur mit CONSENT | CONSENT-Objekt |

---

## Kapitel 8 — Fortschrittsmodell

### 8.1 Persistenter Spielerfortschritt

```
PLAYER_STATE (Betriebsdatum)
  entity_ref:           → ENTITY "svenja"
  game_ref:             → GAME "NEUROPLAY_CORE"
  game_version:         1.0.0                   ← Versionssnapshot

  xp_total:             1250
  level:                5
  level_title_ref:      → CONTENT "LEVEL_5_TITLE"  ("Energie-Entdecker")
  streak_current:       3
  streak_max:           7

  campaign_progress:    { "INTRO_CAMPAIGN": { current_scenario: 3, completed: false } }
  completed_quests:     ["DAILY_ENERGY_Q1", "INTRO_Q1", "INTRO_Q2"]
  completed_missions:   ["MISSION_CHECK_ENERGY_001", ...]
  completed_scenarios:  ["ENERGY_AWAKENING", "FOREST_PASSAGE"]

  inventory:
    cards_owned:        ["ENERGY_BOOST_CARD_001", "FLOWISAURUS_CARD_001"]
    markers_owned:      ["MARKER_A", "MARKER_SPECIAL_001"]
    achievements:       [
      { code: "FIRST_QUEST_COMPLETE", earned_at: "2026-07-01" },
      { code: "ENERGY_EXPLORER_10",   earned_at: "2026-07-20" }
    ]

  avatar_ref:           → AVATAR "AVATAR_EXPLORER_V2"
```

### 8.2 Unveränderlichkeit historischer Spielstände

```
GAME_SESSION "SESSION_2026_07_24"
  game_version:     1.0.0          ← Snapshot — bleibt auch bei Game v1.1.0 unveränderlich
  quest_version:    1.0.0          ← Snapshot
  method_version:   1.1.0          ← Snapshot

Wenn GAME auf v1.1.0 aktualisiert wird:
  → Bestehende SESSION referenziert weiterhin v1.0.0
  → Auswertung bleibt korrekt und reproduzierbar
```

✅ Identisches Muster wie NW-VALIDATE-CASE-001 bestätigt.

### 8.3 XP und Level

XP-Berechnung ist Konfiguration — nicht Hardcode:

```
GAME_RULE "XP_CALCULATION"
  rule_config:
    quest_complete:    50
    mission_complete:  15
    method_played:     10
    streak_bonus:      { multiplier: 1.2, requires_streak: 3 }
    level_thresholds:  [0, 100, 300, 600, 1000, 1500, 2200, 3200]
```

Die Plattform interpretiert diese Regel. Das XP-System ist vollständig datengetrieben. ✅

---

## Kapitel 9 — Analoge und digitale Durchführung

### 9.1 Dieselbe Methode, verschiedene Ausführungsformen

| Ausführungsform | Gerät | Moderation | Kartenformat | Zufallsmechanik |
|----------------|-------|------------|-------------|----------------|
| NEUROPLAY_APP | Smartphone/Browser | Nein | Digital | Digitaler RNG |
| NEUROPLAY_COOP | Mehrere Geräte | Nein | Digital | Digitaler RNG |
| NEUROPLAY_WORKSHOP | Projektor + Karten | Ja (Moderator) | Physisch (Print) | Würfel, Kartenstapel |
| NEUROPLAY_ANALOG | Kein Gerät | Nein | Physisch | Würfel, Kartenstapel |
| NEUROPLAY_COACHING | Tablet | Ja (Coach) | Digital oder Physisch | Wahl des Coaches |

**Prüfpunkt:** Die `METHOD "ENERGY_CHECK"` ist in allen Ausführungsformen identisch. Die Fragen, Antworten und Scoring-Regeln ändern sich nicht. Was sich ändert:

- `EXECUTION_MODE` wählt andere `CONTENT`-Varianten (z. B. vereinfachter Kartentext für Analogspiel)
- `ASSET`-Referenzen zeigen auf andere Dateiformate (Print-PDF vs. Digital-PNG)
- `DICE_CONFIG` wird im digitalen Modus durch Software-RNG ersetzt (konfiguriert, nicht hardcodiert)

✅ Keine Methodenduplizierung.

### 9.2 Brettspiel als NWP-Package

Das Brettspiel-Package enthält:

```json
{
  "object_type": "PACKAGE",
  "code": "NEUROPLAY_ANALOG_V1",
  "objects": [
    { "object_type": "GAME", "code": "NEUROPLAY_CORE" },
    { "object_type": "EXECUTION_MODE", "code": "NEUROPLAY_ANALOG" },
    { "object_type": "CARD", "code": "ENERGY_BOOST_CARD_001",
      "asset_selection": "image_print_ref" },
    { "object_type": "BOARD", "code": "NEUROWAYS_MAP",
      "asset_selection": "image_print_ref" }
  ],
  "installation": {
    "platform_targets": ["print_on_demand", "digital_preview"],
    "output_format": "PDF_PRINT_READY"
  }
}
```

**Dasselbe NWP-Format — für physischen Druck wie für digitale Installation.** ✅

---

## Kapitel 10 — Vollständiges Beziehungsmodell

### 10.1 Beziehungsgraph

```
MODULE "NEUROPLAY"
  ├──referenziert──► GAME "NEUROPLAY_CORE"
  │                    ├──enthält──► GAME_RULE [×n]
  │                    │               └──referenziert──► CONTENT (Regeltext)
  │                    ├──enthält──► CARD_DECK "ENERGY_DECK"
  │                    │               └──referenziert──► CARD [×60]  ← referenziert, nicht enthält
  │                    │                                   ├──referenziert──► CONTENT (Texte)
  │                    │                                   ├──referenziert──► ASSET (Bild, Print)
  │                    │                                   └──referenziert──► DESIGN_TOKEN (Farbe)
  │                    ├──enthält──► DICE_CONFIG
  │                    ├──enthält──► BOARD
  │                    │               └──referenziert──► ASSET [digital + print]
  │                    ├──enthält──► MARKER [×n]
  │                    ├──enthält──► TOKEN [×n]
  │                    ├──referenziert──► CHARACTER "FLOWISAURUS"
  │                    │                    ├──referenziert──► ASSET (Bild, Animation)
  │                    │                    ├──referenziert──► CONTENT (Persönlichkeit)
  │                    │                    └──referenziert──► PROMPT (KI-System-Prompt)
  │                    ├──referenziert──► CAMPAIGN [×n]
  │                    │                    └──enthält──► SCENARIO [×n]
  │                    │                                    └──enthält──► QUEST [×n]
  │                    │                                                    └──enthält──► MISSION [×n]
  │                    │                                                                    └──enthält──► TASK [×n]
  │                    └──referenziert──► REWARD [×n]
  │                                        └──referenziert──► ASSET (Badge)
  │
  ├──referenziert──► MODULE_SPEC "NEUROPLAY_QUEST_SPEC"
  │                    └──basiert auf──► METHOD "ENERGY_CHECK"
  │                    └──referenziert──► EXECUTION_MODE [×5]
  │
  ├──referenziert──► NAVIGATION
  ├──referenziert──► DASHBOARD
  └──referenziert──► PAGE [×4]

GAME_SESSION (Betriebsdatum)
  ├──referenziert──► ENTITY (USER) [×1..n]
  ├──referenziert──► ENTITY (TEAM) [×0..n]
  ├──referenziert──► GAME + version (Snapshot)
  ├──referenziert──► QUEST (aktiv)
  ├──referenziert──► EXECUTION_MODE
  ├──enthält──► PLAYER_RECORD [×n]
  ├──enthält──► GAME_EVENT [×n]
  └──enthält──► REWARD_RECORD [×n]

PLAYER_STATE (Betriebsdatum, persistent)
  ├──referenziert──► ENTITY (USER)
  ├──referenziert──► GAME + version
  ├──enthält──► INVENTORY (inline)
  ├──enthält──► ACHIEVEMENT_RECORDS
  └──enthält──► CAMPAIGN_PROGRESS
```

### 10.2 Kardinalitäten

| Beziehung | Typ | Kardinalität | Pflicht |
|-----------|-----|-------------|---------|
| GAME → GAME_RULE | enthält | 1:n | Ja (mind. 1) |
| CARD_DECK → CARD | referenziert | 1:n | Ja |
| CAMPAIGN → SCENARIO | enthält | 1:n | Ja |
| SCENARIO → QUEST | enthält | 1:n | Ja |
| QUEST → MISSION | enthält | 1:n | Ja (mind. 1) |
| GAME_SESSION → ENTITY | referenziert | 1..n:1 | Ja |
| GAME_SESSION → TEAM | referenziert | 0..n:1 | Nein |
| PLAYER_STATE → ENTITY | referenziert | n:1 | Ja |

---

## Kapitel 11 — Content- und Designreferenzen

### 11.1 Mehrspr. Karten

```
CARD "ENERGY_BOOST"
  name_ref:         → CONTENT "CARD_EB_NAME_DE" / "CARD_EB_NAME_EN"
  description_ref:  → CONTENT "CARD_EB_DESC_DE" / "CARD_EB_DESC_EN"
  audio_ref:        → CONTENT "CARD_EB_AUDIO_DE"
  simple_ref:       → CONTENT "CARD_EB_SIMPLE_DE"   (A2-Sprachniveau)
  child_ref:        → CONTENT "CARD_EB_CHILD_DE"    (Kinderfassung)
```

Jede Variante ist ein eigenes `CONTENT`-Objekt — dieselbe Karte referenziert alle. ✅

### 11.2 Animationen

```
ANIMATION "CARD_PLAY_ANIM"
  animation_type:             ENTRANCE
  duration_ms:                350
  easing:                     ease-out
  respects_reduced_motion:    true
  reduced_motion_fallback:    FADE_IN_150MS
  asset_ref:                  → ASSET "CARD_PLAY_LOTTIE.json"
```

`ANIMATION`-Objekte sind NWObjects — versioniert, mit Barrierefreiheits-Flag. ✅

### 11.3 NeuroPlay-spezifische Design-Token

```
DESIGN_TOKEN "neuroplay.card.resource.color"    → #52b788
DESIGN_TOKEN "neuroplay.card.challenge.color"   → #E2A83B
DESIGN_TOKEN "neuroplay.card.wildcard.color"    → #7B4BA2
DESIGN_TOKEN "neuroplay.xp.bar.fill.color"      → #008CA8
DESIGN_TOKEN "neuroplay.level.5.badge.color"    → #0A1F44
DESIGN_TOKEN "neuroplay.board.background"       → #f6f4f1
```

Alle Farben sind eigene Token — überschreiben keine Energy-Navigator-Token. ✅

---

## Kapitel 12 — Builder-Ableitung

### 12.1 Benötigte Builder

| Builder | Zuständigkeit | Neu? | Extension-Schema |
|---------|--------------|------|-----------------|
| Module Builder | MODULE, MODULE_SPEC, NAVIGATION, PAGE | Nein | `module_builder` |
| **NeuroPlay Builder** | GAME, GAME_RULE, CARD, CARD_DECK, QUEST, MISSION, TASK, SCENARIO, CAMPAIGN, CHARACTER, AVATAR, BOARD, MARKER, TOKEN, REWARD, ACHIEVEMENT, DICE_CONFIG | **Ja (NW-CB-011)** | `neuroplay_builder` |
| Method Builder | METHOD (Energy Check, wiederverwendet) | Nein | `method_builder` |
| Content Builder | CONTENT (Karten, Quests, Charaktere) | Nein | `content_builder` |
| Media Builder | ASSET (Kartenbilder, Board, Audio, Print-PDFs) | Nein | `media_builder` |
| Design Builder | DESIGN_TOKEN, THEME, ANIMATION | Nein | `design_builder` |
| Dashboard Builder | DASHBOARD, WIDGET | Nein | `dashboard_builder` |
| **KI-Builder** | PROMPT, AGENT (Flowisaurus) | **Ja (NW-CB-012)** | `ai_builder` |

### 12.2 NeuroPlay Extension-Schema

```json
{
  "extension_schema": {
    "builder_id":   "neuroplay_builder",
    "version":      "0.1.0",
    "extends":      "module_builder",
    "fields": [
      { "key": "game_type",          "type": "string",        "required": true },
      { "key": "card_deck_refs",     "type": "array<ref>",    "required": false },
      { "key": "quest_refs",         "type": "array<ref>",    "required": false },
      { "key": "campaign_refs",      "type": "array<ref>",    "required": false },
      { "key": "character_refs",     "type": "array<ref>",    "required": false },
      { "key": "dice_configs",       "type": "array<ref>",    "required": false },
      { "key": "achievement_refs",   "type": "array<ref>",    "required": false },
      { "key": "xp_rule_ref",        "type": "ref",           "required": false },
      { "key": "execution_modes",    "type": "array<string>", "required": true },
      { "key": "supports_analog",    "type": "boolean",       "required": false },
      { "key": "supports_coop",      "type": "boolean",       "required": false },
      { "key": "max_players",        "type": "number",        "required": false }
    ],
    "actions": [
      "start_session", "complete_quest", "complete_mission",
      "award_xp", "award_achievement", "draw_card",
      "roll_dice", "sync_player_state"
    ]
  }
}
```

### 12.3 Kein duplizierter Builder

| Prüfpunkt | Ergebnis |
|-----------|---------|
| Lifecycle, Versionierung, Validation aus Core | ✅ |
| Neuer NeuroPlay Builder ohne Core-Änderung | ✅ |
| KI-Builder ohne Core-Änderung | ✅ |
| Keine Builder-Funktionen doppelt implementiert | ✅ |

---

## Kapitel 13 — Plattformunabhängiges NWP-Manifest

```json
{
  "nwp_version": "1.0",
  "format": "neuroways-package",
  "created_at": "2026-07-24T08:00:00Z",
  "objects": [
    {
      "object_type": "MODULE",
      "code": "NEUROPLAY",
      "version": "0.1.0",
      "meta": { "name": "NeuroPlay", "category": "Spiel" },
      "extensions": {
        "module_builder": {
          "features": ["dashboard_card", "own_pages", "game_elements", "methods", "assets"]
        },
        "neuroplay_builder": {
          "game_type": "QUEST_CARD_CAMPAIGN",
          "supports_analog": true,
          "supports_coop": true,
          "max_players": 6,
          "execution_modes": ["NEUROPLAY_APP","NEUROPLAY_COOP","NEUROPLAY_WORKSHOP","NEUROPLAY_ANALOG"]
        }
      }
    },
    {
      "object_type": "CAMPAIGN",
      "code": "INTRO_CAMPAIGN",
      "version": "1.0.0",
      "extensions": {
        "neuroplay_builder": {
          "scenarios": ["ENERGY_AWAKENING","FOREST_PASSAGE","COAST_CROSSING","SEA_JOURNEY","ISLAND_REST"],
          "prerequisite": null,
          "unlock_achievement": "CAMPAIGN_INTRO_COMPLETE"
        }
      }
    },
    {
      "object_type": "CHARACTER",
      "code": "FLOWISAURUS",
      "version": "2.0.0",
      "extensions": {
        "neuroplay_builder": {
          "personality_ref": "FLOWISAURUS_PERSONA_DE",
          "response_style": "ENCOURAGING_OBSERVING"
        },
        "ai_builder": {
          "prompt_ref": "FLOWISAURUS_SYSTEM_PROMPT_V2",
          "agent_scope": ["PLAYER_STATE", "GAME_SESSION", "RESULT"],
          "consent_required": true
        }
      }
    }
  ],
  "installation": {
    "platform_targets": ["pocketbase", "oracle_apex", "postgres", "mobile_native", "print_on_demand"],
    "requires_ai_service": true,
    "requires_asset_service": true,
    "auto_register_nav": true,
    "auto_register_dashboard": true
  },
  "checksum": "sha256:..."
}
```

**Keine Plattformreferenz im Manifest.** `platform_targets` ist eine Deklaration von Interpretationsmöglichkeiten — keine Implementierungsanweisung. ✅

---

## Kapitel 14 — Core-Lücken (nur neue)

Bereits akzeptiert (nicht erneut bewertet): CONSENT, CONVERSATION, CONTENT-Aktivitätskatalog.

### 14.1 Neue Lückenanalyse

| # | Anforderung | Modellierbar? | Bewertung |
|---|-------------|--------------|-----------|
| L1 | Spielerrollen (EXPLORER, HEALER) — Unterschied zu Plattformrollen | ✅ Extension-Feld | Kein Core-Eingriff |
| L2 | Karteneffekte (SCORE_MODIFIER, ABILITY) als deklarative Regeln | ✅ Extension-Feld | Kein Core-Eingriff |
| L3 | Kampagnen-Fortschritt (partial, multi-session) | ✅ PLAYER_STATE Extension | Kein Core-Eingriff |
| L4 | Physische Assets (3D-Druckdatei, Print-PDF) als ASSET-Varianten | ✅ ASSET mit resolution_variant | Kein Core-Eingriff |
| L5 | Wettbewerbs-Sichtbarkeit (Score für alle sichtbar) | ✅ GAME_SESSION.visibility Extension | Kein Core-Eingriff |
| L6 | Offline-Spielen ohne Netzwerk | ⚠️ NWP lokal interpretierbar, aber Sync-Protokoll fehlt | Eigenes Dokument NW-OFFLINE-001 — kein Core-Eingriff |
| L7 | Push-Benachrichtigungen (Erinnerung an tägliche Quest) | ⚠️ Plattformspezifisch — außerhalb des NWP-Formats | Kein Core-Eingriff — Plattform-Feature |

**Keine neuen Core-Eingriffe erforderlich.** Alle Lücken sind entweder via Extension lösbar oder betreffen Infrastruktur-Features außerhalb des Objektmodells. ✅

---

## Kapitel 15 — Validierungsmatrix

| # | Prüffrage | Ergebnis | Bemerkung |
|---|-----------|---------|-----------|
| 1 | Alle Informationen mit NWObjects modellierbar? | ✅ JA | 28 Typen via Extension |
| 2 | Sonderobjekte gegen Core-Invarianten? | ✅ NEIN | |
| 3 | Neue Beziehungstypen erforderlich? | ✅ NEIN | |
| 4 | Doppelte Informationen? | ✅ NEIN | Methoden, Farben, Karten referenziert |
| 5 | Builder vollständig via Core? | ✅ JA | 2 neue Builder, kein Core-Eingriff |
| 6 | Funktioniert ohne Hardcoding? | ✅ JA | XP, Level, Regeln als Objekte |
| 7 | Erweiterbar ohne Core-Änderung? | ✅ JA | |

---

## Kapitel 16 — Akzeptanztests

| # | Test | Ergebnis |
|---|------|---------|
| AT1 | NeuroPlay vollständig mit NWObjects modelliert | ✅ |
| AT2 | Keine Core-Sonderlogik erforderlich | ✅ |
| AT3 | Alle Spielmechaniken über Extensions oder bestehende Objekte | ✅ |
| AT4 | Analoge und digitale Durchführung nutzen dieselbe Methode | ✅ |
| AT5 | Mehrspieler-Szenarien (Einzel, Koop, Teams, Wettbewerb) unterstützt | ✅ |
| AT6 | Historische Spielstände reproduzierbar (Versionssnapshots) | ✅ |
| AT7 | CONTENT und ENTITY konsequent verwendet | ✅ |
| AT8 | Design vollständig referenziert (DESIGN_TOKEN) | ✅ |
| AT9 | Builder ausschließlich aus Core abgeleitet | ✅ |
| AT10 | NWP-Manifest plattformunabhängig (print_on_demand eingeschlossen) | ✅ |

---

## Kapitel 17 — Notwendige Extensions

| Extension-Schema | Builder | Status |
|-----------------|---------|--------|
| `neuroplay_builder` | NeuroPlay Builder (NW-CB-011) | Zu erstellen |
| `ai_builder` | KI-Builder (NW-CB-012) | Zu erstellen |
| `consent_builder` | Consent Builder | Bestätigt aus CASE-001 |

---

## Kapitel 18 — Empfehlungen

1. **NW-CORE-OBJECT-001 v1.1.0** — `CONVERSATION` und `CONSENT` ergänzen (durch 2 Fälle belegt)
2. **NW-OFFLINE-001** — Sync-Protokoll für Offline-Spielen (NeuroPlay + zukünftige mobile Nutzung)
3. **NW-MIGRATION-001** — Jetzt möglich: Architektur ist durch zwei unabhängige Fälle validiert
4. **NeuroPlay Builder (NW-CB-011)** — Nächster Builder nach Migration

---

## Kapitel 19 — Release-Entscheidung

### 🟢 PASS WITH EXTENSIONS

**NeuroPlay kann vollständig mit der bestehenden Core-Architektur modelliert werden.**

Der Stresstest mit maximaler Komplexität — 28 Spielobjekttypen, physische und digitale Durchführung, Mehrspieler, Zufallsmechanik, Kampagnen, Flowisaurus als KI-Charakter — hat keinen einzigen Core-Eingriff erfordert.

Das Objektmodell trägt. Die Architektur ist bereit für NW-MIGRATION-001.

---

*NW-VALIDATE-CASE-002 — NeuroPlay Core Stress Test — v1.1.0 — review — 2026-07-24*
