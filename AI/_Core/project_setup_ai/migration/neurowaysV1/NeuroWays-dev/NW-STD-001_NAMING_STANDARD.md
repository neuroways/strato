# NW-STD-001 — NeuroWays Naming Standard

**Dokumentcode:** NW-STD-001  
**Version:** 1.0.1  
**Status:** published  
**Veröffentlicht:** 2026-07-23  
**Erstellt:** 2026-07-23  
**Gültig ab:** 2026-07-23  
**Verantwortlich:** NeuroWays Core  
**Ablöst:** –  
**Abgelöst durch:** –

---

## Änderungsprotokoll

| Version | Datum | Änderung | Grund | Review |
|---------|-------|----------|-------|--------|
| 1.0.0 | 2026-07-23 | Erstfassung | – | – |
| 1.0.1 | 2026-07-23 | NW-STD-003 als Database Standard korrigiert (war: API Standard); Statusmodell: Verweis auf NW-STD-000 als maßgebliche Quelle ergänzt; Querverweise in Kap. 13 und offenen Punkten korrigiert | Governance Review (Konflikt A, C) | Governance Review 2026-07-23 |
| 1.0.1 | 2026-07-23 | Status: review → approved → published. Erste offizielle Veröffentlichung. | Veröffentlichungsreihenfolge Governance Foundation v1.0 | NeuroWays Core 2026-07-23 |

---

## Geltungsbereich

Dieser Standard gilt verbindlich für alle zukünftigen NeuroWays-Entwicklungen:

- Datenbankobjekte (Collections, Felder, Werte)
- API-Endpunkte, Events, Payloads
- Dateinamen
- Asset-Codes
- Dokumentcodes
- Quelltext-Bezeichner
- Konfigurationsschlüssel
- Moduldefinitionen

Er gilt unabhängig von Plattform, Datenbanksystem oder Hosting-Anbieter.

Bestehende Objekte werden durch diesen Standard nicht automatisch umbenannt. Für laufende Systeme gilt er ab dem nächsten geplanten Migrationszeitpunkt oder bei Neuanlage.

---

## Kapitel 1 — Grundprinzipien

### 1.1 Konsistenz vor Kürze

Ein Name darf länger sein, wenn er dadurch eindeutiger wird. Abkürzungen sind nur erlaubt, wenn sie im Bereichscode-Register (Kapitel 2) gelistet sind.

### 1.2 Fachlichkeit vor Technik

Namen beschreiben, was ein Objekt fachlich bedeutet — nicht, wie es technisch gespeichert wird. `METHOD_VERSION` ist korrekt. `METHOD_V` ist nicht zulässig.

### 1.3 Ein Begriff, eine Bedeutung

Jeder Begriff hat systemweit genau eine Bedeutung. Synonyme sind verboten. Wenn `status` verwendet wird, bedeutet es in allen Collections dasselbe Konzept.

### 1.4 Ein Objekt, ein Name

Jedes fachliche Objekt besitzt genau einen offiziellen Namen. Aliase, Kurzformen oder interne Spitznamen dürfen nicht in Produktionssysteme einfließen.

### 1.5 Keine Unterschiede durch Schreibweise

`method_id`, `Method_Id` und `MethodID` dürfen nicht gleichzeitig existieren. Die zulässige Schreibweise ist für jeden Kontext exakt eine (siehe Kapitel 3–9).

### 1.6 Keine sprachlichen Mehrdeutigkeiten

Namen müssen in ihrem Kontext eindeutig interpretierbar sein. `type` allein ist zu vage. `asset_type` ist korrekt.

### 1.7 Englisch als technische Standardsprache

Alle technischen Namen — Felder, Codes, Dateinamen, API-Pfade — sind in Englisch. Keine Umlaute, keine deutschen Wörter in technischen Bezeichnern.

### 1.8 Deutsch ausschließlich in Fachtexten

`description`, `title`, `label` und `rule_text` dürfen deutschen Inhalt enthalten. Ihr Feldname ist immer Englisch.

### 1.9 Keine Datumsangaben in Namen

Namen dürfen kein Datum enthalten. Versionierung erfolgt über Versionsfelder, nicht über Datumssuffixe.

### 1.10 Keine technischen IDs in fachlichen Namen

Technische Primärschlüssel (UUIDs, autoincrement) erscheinen nicht in fachlichen Bezeichnern. Der fachliche Name ist der `code`, nicht die `id`.

---

## Kapitel 2 — Bereichscodes

Bereichscodes sind dreistellige Großbuchstaben-Kürzel. Sie identifizieren den fachlichen Bereich eines Objekts.

### 2.1 Offizielle Bereichscodes

| Code | Bereich | Beschreibung |
|------|---------|--------------|
| `COR` | Core | Kernfunktionalität, bereichsübergreifende Objekte |
| `STD` | Standards | Normative Dokumente, Regeln, Vorgaben |
| `DSN` | Design | Designsystem, Welten, Regionen, Tokens |
| `AST` | Assets | Illustrationen, Icons, Animationen, Mediendateien |
| `MTH` | Methoden | NeuroWays-Methoden, Fragen, Antwortoptionen |
| `CHK` | Check-ins | Laufende und abgeschlossene Selbstbeobachtungen |
| `USR` | Benutzer | Profile, Einstellungen, Authentifizierung |
| `ORG` | Organisationen | Mandanten, Teams, Lizenzierungen |
| `CFG` | Konfiguration | Systemeinstellungen, Feature Flags |
| `API` | Schnittstellen | Externe Integrationen, Webhooks |
| `DOC` | Dokumente | Texte, Hilfeinhalte, Anleitungen |
| `LOG` | Logging | Technische Protokolldaten |
| `AUD` | Audit | Nachvollziehbarkeit, Änderungshistorie |
| `SYS` | System | Plattforminterne Objekte, Migrationen |

### 2.2 Zukünftige Bereichscodes

Neue Bereichscodes werden ausschließlich durch einen formalen Änderungsantrag an NW-STD-001 eingeführt. Der Antrag muss enthalten:

- Dreistelligen Code (muss neu und eindeutig sein)
- Fachliche Begründung
- Mindestens ein Beispielobjekt
- Verweis auf das zugehörige Modul oder Dokument

### 2.3 Reservierte Codes

Folgende Codes sind reserviert und dürfen nicht für andere Bereiche verwendet werden: `NW`, `WLD`, `GEN`.

---

## Kapitel 3 — Collections und Tabellen

### 3.1 Schema

```
<AREA_CODE>_<PLURAL_OBJECT_NAME>
```

- `AREA_CODE`: Exakt ein offizieller Bereichscode (Kapitel 2)
- `PLURAL_OBJECT_NAME`: Plural, SCREAMING_SNAKE_CASE
- Trennzeichen zwischen Bereich und Objekt: ein einzelner Unterstrich

### 3.2 Regeln

| Regel | Erlaubt | Verboten |
|-------|---------|---------|
| Schreibweise | `MTH_METHODS` | `mth_methods`, `MthMethods` |
| Plural | `MTH_QUESTIONS` | `MTH_QUESTION` |
| Keine Zahlen | `DSN_WORLD_REGIONS` | `DSN_WORLD_REGIONS_2` |
| Keine Datumsangaben | `AST_ASSET_FILES` | `AST_ASSET_FILES_2026` |
| Keine Versionen | `CHK_CHECKINS` | `CHK_CHECKINS_V2` |
| Nur offizielle Codes | `STD_NAMING_RULES` | `NMS_NAMING_RULES` |
| Kein Freitext | `USR_USER_PROFILES` | `USR_PROFILES_NEW` |

### 3.3 Beispiele

| Collection | Bereich | Objekt |
|-----------|---------|--------|
| `MTH_METHODS` | Methoden | Methodendefinitionen |
| `MTH_QUESTIONS` | Methoden | Fragen einer Methode |
| `MTH_ANSWER_OPTIONS` | Methoden | Antwortoptionen |
| `MTH_RESULT_RULES` | Methoden | Auswertungsregeln |
| `CHK_CHECKINS` | Check-ins | Abgeschlossene Sitzungen |
| `CHK_CHECKIN_ANSWERS` | Check-ins | Einzelantworten |
| `DSN_WORLD_VERSIONS` | Design | Weltversionen |
| `DSN_WORLD_REGIONS` | Design | Regionen der Welt |
| `DSN_DESIGN_TOKENS` | Design | Designtokens |
| `DSN_DESIGN_RULES` | Design | Designregeln |
| `DSN_ANIMATION_RULES` | Design | Animationsregeln |
| `DSN_ACCESSIBILITY_RULES` | Design | Barrierefreiheitsregeln |
| `AST_ASSET_VERSIONS` | Assets | Versionierte Assets |
| `AST_ASSET_FILES` | Assets | Dateireferenzen |
| `AST_ASSET_ASSIGNMENTS` | Assets | Zuordnungen |
| `AST_ASSET_METADATA` | Assets | Metadaten |
| `AST_ASSET_PROMPTS` | Assets | Generierungsaufträge |
| `STD_STANDARDS` | Standards | Normative Dokumente |
| `STD_NAMING_RULES` | Standards | Namensregeln |
| `USR_USERS` | Benutzer | Benutzeraccounts |
| `CFG_FEATURE_FLAGS` | Konfiguration | Feature-Schalter |
| `AUD_AUDIT_LOGS` | Audit | Änderungshistorie |

### 3.4 Beziehungstabellen (Junction Tables)

```
<AREA_CODE>_<OBJECT_A>_<OBJECT_B>_LINKS
```

Beispiel: `MTH_METHOD_TAG_LINKS`

---

## Kapitel 4 — Felder

### 4.1 Schreibweise

Alle Feldnamen: `snake_case`, Kleinbuchstaben, Englisch.

### 4.2 Pflichtfelder (Standard-Set)

Alle Collections sollen diese Felder enthalten, sofern fachlich sinnvoll:

| Feldname | Typ | Bedeutung |
|----------|-----|-----------|
| `id` | text/uuid | Technischer Primärschlüssel (automatisch) |
| `code` | text | Stabiler fachlicher Bezeichner (Business Key) |
| `name` | text | Kurzname, maschinenlesbar |
| `title` | text | Anzeigename, für Menschen |
| `description` | text | Freitext, darf Deutsch enthalten |
| `status` | text | Aktueller Zustand (Kapitel 5) |
| `version` | text | Semver-Version (z. B. `1.0.0`) |
| `sort_order` | number | Anzeigereihenfolge |
| `created_at` | datetime | Zeitstempel der Erstellung |
| `updated_at` | datetime | Zeitstempel der letzten Änderung |
| `published_at` | datetime | Zeitstempel der Veröffentlichung |
| `archived_at` | datetime | Zeitstempel der Archivierung |
| `superseded_at` | datetime | Zeitstempel der Ablösung |
| `created_by` | text/id | Benutzer-ID der erstellenden Person |
| `updated_by` | text/id | Benutzer-ID der letzten Änderung |
| `published_by` | text/id | Benutzer-ID der veröffentlichenden Person |
| `archived_by` | text/id | Benutzer-ID der archivierenden Person |
| `owner_id` | text/id | Verantwortliche Benutzer- oder Organisations-ID |
| `parent_id` | text/id | Übergeordnetes Objekt gleichen Typs |

### 4.3 Referenzfelder

Felder, die auf andere Collections zeigen, enden auf `_id`:

```
method_id, question_id, asset_version_id, world_version_id
```

Felder, die auf einen Business-Code zeigen, enden auf `_code`:

```
asset_type_code, status_code, region_code
```

### 4.4 Boolean-Felder

Beginnen mit `is_` oder `has_`:

```
is_active, is_primary, is_required, has_attachment
```

### 4.5 Typ-Felder

Enden auf `_type`:

```
asset_type, target_type, value_type
```

### 4.6 Verbotene Feldnamen

| Verboten | Grund | Korrekt |
|---------|-------|---------|
| `data` | zu generisch | fachlicher Name |
| `info` | zu generisch | fachlicher Name |
| `misc` | undefiniert | entfernen oder spezifizieren |
| `temp` | impliziert Wegwerfcharakter | nicht in Produktion |
| `new_X` | relativ, nicht stabil | versioniertes Objekt anlegen |
| `old_X` | relativ, nicht stabil | über `status` regeln |
| `flag` | zu generisch | `is_X` oder `has_X` |
| `dt` | kryptisches Kürzel | `created_at` |
| `ts` | kryptisches Kürzel | `created_at` |
| `typ` | kryptisches Kürzel | `type` |

### 4.7 Migration von bestehenden Feldnamen

| Aktuell (Bestand) | Ziel (NW-STD-001) | Hinweis |
|------------------|-------------------|---------|
| `created` | `created_at` | Bei nächster Migration |
| `updated` | `updated_at` | Bei nächster Migration |
| `is_active` | unverändert | Bereits konform |
| `sort_order` | unverändert | Bereits konform |
| `result_code` | unverändert | Bereits konform |

---

## Kapitel 5 — Statuswerte

Die maßgebliche Definition aller Statuswerte liegt in NW-STD-000 Kapitel 5. Dieses Kapitel listet die für Datenobjekte anwendbaren Statuswerte und ergänzt objektspezifische Übergänge.

### 5.1 Standard-Statuswerte

| Status | Bedeutung | Übergang zu |
|--------|-----------|-------------|
| `draft` | In Bearbeitung, noch nicht geprüft | `review`, `archived` |
| `review` | Zur Prüfung eingereicht | `approved`, `draft`, `rejected` |
| `approved` | Freigegeben, vor Aktivierung | `published` |
| `published` | Aktiv und gültig | `superseded`, `archived` |
| `superseded` | Abgelöst durch eine neuere Version | `archived` |
| `archived` | Nicht mehr aktiv, historisch erhalten | – |
| `deprecated` | Noch lesbar, aber Nutzung wird eingestellt | `archived` |
| `rejected` | Abgelehnt in der Prüfung | `draft` |
| `planned` | Reserviert, noch kein Inhalt | `draft`, `archived` |

### 5.2 Optionaler Status

| Status | Bedeutung | Hinweis |
|--------|-----------|---------|
| `deleted` | Logisch gelöscht | Nur wenn Hard-Delete nicht möglich |

### 5.3 Regeln

- Statusübergänge sind gerichtet (kein freies Zurücksetzen von `published` auf `draft`)
- `published`-Objekte dürfen fachlich nicht verändert werden
- Verwaltungsmetadaten (`superseded_at`, `archived_at`) dürfen nach Veröffentlichung ergänzt werden
- Statuswerte sind systemweit bedeutungsgleich

### 5.4 Verbotene Statuswerte

| Verboten | Grund | Korrekt |
|---------|-------|---------|
| `active` | Mehrdeutig (aktiv vs. veröffentlicht) | `published` |
| `inactive` | Kein definierter Zustand | `archived` oder `deprecated` |
| `enabled` | Technisch, nicht fachlich | `published` |
| `disabled` | Technisch, nicht fachlich | `archived` |
| `1` / `0` | Nicht lesbar | Textbasierter Status |

---

## Kapitel 6 — Business Codes

### 6.1 Schema

```
<BEREICH>_<FACHLICHER_NAME>
```

- Ausschließlich Großbuchstaben
- Unterstriche als Trennzeichen
- Keine Leerzeichen
- Keine Sonderzeichen
- Keine Umlaute (`AE` statt `Ä`, `OE` statt `Ö`, `UE` statt `Ü`, `SS` statt `ß`)
- Stabil über Versionen — ein Code ändert sich nicht

### 6.2 Bereichspräfix

Der erste Teil des Codes entspricht dem fachlichen Bereich (muss nicht zwingend der Bereichscode sein, wenn der Kontext eindeutig ist):

```
ENERGY_NAVIGATOR
WORLD_FESTLAND
ASSET_ICON_TREE
METHOD_TRANSITIONS
RULE_KUESTE
TOKEN_NW_FESTLAND
```

### 6.3 Stabilitätsregel

Einmal veröffentlichte Codes werden niemals geändert. Eine neue Version eines Objekts erhält denselben Code mit einer neuen Version, nicht einen neuen Code.

```
ENERGY_NAVIGATOR (Code bleibt)
version: 1.0.0 → version: 1.1.0
```

### 6.4 Verbotene Code-Formate

| Verboten | Grund | Korrekt |
|---------|-------|---------|
| `energy-navigator` | Bindestrich nicht zulässig | `ENERGY_NAVIGATOR` |
| `EnergyNavigator` | CamelCase nicht zulässig | `ENERGY_NAVIGATOR` |
| `ZONE_1` | Zahlen vermeiden | `ZONE_FESTLAND` |
| `TMP_TEST` | Temporär-Präfix | nicht in Produktion |
| `WALD2` | Suffix-Zahl | `WALD_V2` nur wenn unbedingt nötig |
| `KÜSTE` | Umlaut | `KUESTE` |

---

## Kapitel 7 — Dateien

### 7.1 Schema

```
<bereich>_<fachlicher_name>_v<version>.<extension>
```

- `snake_case`
- Kein CamelCase
- Kein Datum im Namen
- Kein Leerzeichen
- Kein Sonderzeichen außer Unterstrich und Bindestrich vor der Endung
- Versionssuffix: `_v1`, `_v2`, `_v1.1` (keine Semver-Punkte im Dateinamen)

### 7.2 Beispiele

```
asset_icon_tree_v1.svg
world_festland_illustration_v1.webp
world_festland_illustration_v2.webp
method_energy_navigator_v1.json
method_energy_navigator_v1.1.json
standard_nw_std_001_v1.0.0.md
animation_water_loop_v1.json
texture_ground_subtle_v1.webp
font_dm_sans_regular_v1.woff2
```

### 7.3 Versionierung im Dateinamen

Wenn eine Datei ersetzt wird, erhält die neue Datei eine neue Versionsnummer. Die alte Datei bleibt erhalten (kein Überschreiben).

### 7.4 Verbotene Dateibenennung

| Verboten | Grund | Korrekt |
|---------|-------|---------|
| `Festland Illustration.png` | Leerzeichen, Großbuchstaben | `world_festland_illustration_v1.png` |
| `illustration_FINAL.png` | `FINAL` impliziert Endgültigkeit | `_v2` oder `_v3` |
| `bild_neu.png` | Deutsch, `neu` nicht stabil | Englisch, Versionsnummer |
| `illustration_2026-07-23.png` | Datum statt Version | `_v1` |
| `icon.svg` | Kein beschreibender Name | `asset_icon_mountain_v1.svg` |
| `FESTLAND.PNG` | Großbuchstaben | `world_festland_v1.png` |

---

## Kapitel 8 — Assets

### 8.1 Asset-Identifikation

Jedes Asset wird durch drei Felder eindeutig identifiziert:

| Feld | Format | Beispiel |
|------|--------|---------|
| `asset_type` | Freitext aus erlaubter Liste | `illustration` |
| `asset_code` | Business Code (Kapitel 6) | `WORLD_FESTLAND_ILLUSTRATION` |
| `asset_version` | Semver | `1.0.0` |

### 8.2 Erlaubte Asset-Typen

| Typ-Code | Bedeutung | Dateiformate |
|----------|-----------|-------------|
| `illustration` | Zonenbilder, Hintergründe | `.webp`, `.png`, `.svg` |
| `svg_icon` | Vektoricons | `.svg` |
| `logo` | Markenzeichen | `.svg`, `.png` |
| `animation` | Bewegte Grafik | `.json` (Lottie), `.webm` |
| `audio` | Klangelemente | `.mp3`, `.ogg` |
| `video` | Bewegtbild | `.mp4`, `.webm` |
| `font` | Schriftressourcen | `.woff2`, `.woff` |
| `texture` | Papier, Rauschen, Overlay | `.webp`, `.png` |
| `background` | Vollflächige Hintergründe | `.webp`, `.svg` |
| `component_asset` | UI-Komponenten-Grafiken | `.svg`, `.png` |

### 8.3 Asset-Code-Schema

```
<DOMÄNE>_<REGION_ODER_BEREICH>_<OBJEKTNAME>
```

Beispiele:

```
WORLD_FESTLAND_ILLUSTRATION
WORLD_WALD_ILLUSTRATION
WORLD_KUESTE_ILLUSTRATION
WORLD_MEER_ILLUSTRATION
WORLD_INSEL_ILLUSTRATION
ICON_ENERGY_WAVE_LEVEL_1
ICON_ENERGY_WAVE_LEVEL_2
ICON_ZONE_FESTLAND
ICON_ZONE_WALD
ICON_ZONE_MOUNTAIN
TEXTURE_PAPER_OVERLAY
LOGO_NEUROWAYS_PRIMARY
```

---

## Kapitel 9 — APIs

### 9.1 Endpunkte

```
/<version>/<bereich>/<ressource>
/<version>/<bereich>/<ressource>/<id>
/<version>/<bereich>/<ressource>/<id>/<sub-ressource>
```

- Ausschließlich Kleinbuchstaben
- Bindestriche als Trennzeichen (kebab-case)
- Keine Unterstriche in Pfaden
- Ressourcennamen im Plural
- Versionspräfix: `v1`, `v2`

Beispiele:

```
GET  /v1/methods
GET  /v1/methods/{id}
GET  /v1/methods/{id}/questions
POST /v1/check-ins
GET  /v1/check-ins/{id}/answers
GET  /v1/assets/{id}/files
GET  /v1/design/world-versions/{id}/regions
```

### 9.2 HTTP-Verben

| Verb | Bedeutung |
|------|-----------|
| `GET` | Lesen |
| `POST` | Neu erstellen |
| `PATCH` | Teilweises Aktualisieren |
| `PUT` | Vollständiges Ersetzen |
| `DELETE` | Löschen |

### 9.3 Events und Webhooks

```
<bereich>.<objekt>.<ereignis>
```

- Kleinbuchstaben
- Punkte als Trennzeichen
- Vergangenheitsform für abgeschlossene Ereignisse

Beispiele:

```
checkin.session.completed
method.version.published
asset.file.uploaded
world.region.updated
```

### 9.4 JSON-Felder in API-Payloads

Alle JSON-Felder in API-Antworten und -Anfragen verwenden `camelCase`:

```json
{
  "id": "abc123",
  "methodId": "xyz456",
  "resultCode": "festland",
  "totalScore": 12,
  "sessionDate": "2026-07-23",
  "createdAt": "2026-07-23T12:00:00Z"
}
```

### 9.5 Fehlercodes

```
NW-<BEREICH>-<DREISTELLIGE_NUMMER>
```

Beispiele:

```
NW-MTH-001  Methode nicht gefunden
NW-MTH-002  Methode ist nicht aktiv
NW-CHK-001  Check-in ist unvollständig
NW-CHK-002  Antwort außerhalb gültiger Optionen
NW-AST-001  Asset-Version nicht veröffentlicht
NW-STD-001  Naming-Verstoß erkannt
NW-SYS-001  Interner Systemfehler
```

---

## Kapitel 10 — Dokumente

### 10.1 Dokumentcode-Schema

```
NW-<BEREICHSCODE>-<DREISTELLIGE_NUMMER>
```

- `NW`: NeuroWays-Präfix, immer
- `BEREICHSCODE`: Dreistelliger Code (Kapitel 2)
- `NUMMER`: Dreistellig, nullaufgefüllt, fortlaufend pro Bereich

Beispiele:

```
NW-STD-001  Naming Standard (dieses Dokument)
NW-STD-002  Standards Registry Standard
NW-STD-003  Database Standard
NW-STD-004  Lifecycle Standard
NW-STD-005  Versioning Standard
NW-COR-001  Core Architecture
NW-DSN-001  World Design Standard
NW-DSN-002  Component Library Standard
NW-MTH-001  Method Definition Standard
NW-AUD-001  Audit Trail Standard
```

### 10.2 Versionierung von Dokumenten

Dokumente werden mit Semver versioniert:

- `MAJOR`: Inkompatible Änderung (bestehende Implementierungen müssen angepasst werden)
- `MINOR`: Rückwärtskompatible Erweiterung
- `PATCH`: Redaktionelle Korrekturen ohne inhaltliche Änderung

### 10.3 Dateinamen für Dokumente

```
nw-<bereichscode-lowercase>-<nummer>_<kurztitel>_v<version>.md
```

Beispiele:

```
nw-std-001_naming_standard_v1.0.0.md
nw-dsn-001_world_design_standard_v1.1.0.md
nw-mth-001_method_definition_standard_v1.0.0.md
```

### 10.4 Dokumentstatus

Dokumente verwenden die Standard-Statuswerte aus Kapitel 5.

---

## Kapitel 11 — Erweiterbarkeit

### 11.1 Neue Bereichscodes

Ein neuer Bereichscode entsteht durch:

1. Antrag mit dreistelligem Code-Vorschlag (eindeutig, nicht in Kapitel 2 gelistet)
2. Fachliche Begründung (mindestens ein Absatz)
3. Mindestens ein Beispielobjekt (`<CODE>_<OBJEKT>`)
4. Formale Aufnahme in NW-STD-001 als Minor-Update

### 11.2 Neue Objektarten in Collections

Neue Objektarten werden durch Anlegen einer neuen Collection nach dem Schema aus Kapitel 3 eingeführt. Sie erfordern keine Änderung an NW-STD-001, solange der Bereichscode bereits registriert ist.

### 11.3 Versionierung dieses Standards

| Änderungsart | Versionserhöhung |
|-------------|-----------------|
| Neuer Bereichscode | MINOR (`1.1.0`) |
| Neues Pflichtfeld | MAJOR (`2.0.0`) |
| Entfernen einer Regel | MAJOR (`2.0.0`) |
| Redaktionelle Korrektur | PATCH (`1.0.1`) |
| Neues Kapitel ohne Widersprüche | MINOR (`1.1.0`) |

### 11.4 Abwärtskompatibilität

- Bestehende Collections und Felder werden durch einen neuen Standard nicht automatisch ungültig.
- Neue Felder aus einer MINOR-Version sind optional, sofern nicht explizit als Pflicht markiert.
- MAJOR-Versionen definieren einen Migrationspfad in einem separaten Migrationsdokument.

### 11.5 Register führen

Alle offiziell registrierten Codes, Collections und Dokumentnummern werden in einem separaten Verzeichnis (`NW-COR-001` — noch zu erstellen) geführt.

---

## Kapitel 12 — Beispiele

### 12.1 Collections — positive Beispiele (✅)

| Beispiel | Begründung |
|---------|-----------|
| `MTH_METHODS` | Bereichscode + Plural + SCREAMING_SNAKE_CASE |
| `AST_ASSET_FILES` | Vollständiger Name, kein Kürzel |
| `DSN_WORLD_REGIONS` | Fachlich klar, Bereich eindeutig |
| `CHK_CHECKINS` | Plural, kein Datum |
| `STD_NAMING_RULES` | Verweist auf diesen Standard |
| `USR_USER_PROFILES` | Redundanz erlaubt für Klarheit (`USR_` + `USER_`) |
| `AUD_AUDIT_LOGS` | Bereich stimmt mit Inhalt überein |
| `CFG_FEATURE_FLAGS` | Plural, sprechend |
| `MTH_RESULT_RULES` | Bereich `MTH`, nicht `RUL` (kein eigener Bereich) |
| `DSN_DESIGN_TOKENS` | Bereich Design, Objekt Token im Plural |

### 12.2 Collections — negative Beispiele (❌)

| Beispiel | Fehler | Korrekt |
|---------|--------|---------|
| `methods` | Kein Bereichscode | `MTH_METHODS` |
| `MTH_Method` | CamelCase, Singular | `MTH_METHODS` |
| `MTH_METHODS_V2` | Versionsnummer | `MTH_METHODS` (Version im Feld) |
| `MTH_METHODS_2026` | Datum | `MTH_METHODS` |
| `XYZ_METHODS` | Unregistrierter Code | Registrierung zuerst |
| `METHODS_MTH` | Reihenfolge falsch | `MTH_METHODS` |
| `MTH_METHODEN` | Deutsch | `MTH_METHODS` |
| `TMP_METHODS` | `TMP` nicht registriert | `MTH_METHODS` |
| `MTH_M` | Zu kurz, kryptisch | `MTH_METHODS` |
| `CHK_check_ins` | Kleinbuchstaben | `CHK_CHECKINS` |

### 12.3 Felder — positive Beispiele (✅)

| Feldname | Begründung |
|---------|-----------|
| `asset_version_id` | Endet auf `_id`, klare Referenz |
| `is_primary` | Boolean mit `is_`-Präfix |
| `sort_order` | Standard-Feldname |
| `result_code` | Endet auf `_code`, fachlicher Bezeichner |
| `source_world_version_id` | Vollständiger, selbsterklärender Name |
| `created_at` | Standard, datetime |
| `has_attachment` | Boolean mit `has_`-Präfix |
| `resolution_variant` | Sprechend, kein Kürzel |
| `numeric_value` | Typ im Name, eindeutig |
| `observation_hint` | Fachlich klar, kein Kürzel |

### 12.4 Felder — negative Beispiele (❌)

| Feldname | Fehler | Korrekt |
|---------|--------|---------|
| `dt` | Kryptisch | `created_at` |
| `ts` | Kryptisch | `created_at` |
| `data` | Zu generisch | Fachlicher Name |
| `val` | Abkürzung | `numeric_value` |
| `typ` | Abkürzung, Deutsch | `asset_type` |
| `new_version` | `new` nicht stabil | Versionierung über Feld |
| `old_status` | `old` nicht stabil | `previous_status` oder weglassen |
| `flag` | Zu generisch | `is_active`, `is_primary` |
| `userID` | CamelCase | `user_id` |
| `CREATED` | Großbuchstaben | `created_at` |

### 12.5 Business Codes — positive Beispiele (✅)

| Code | Begründung |
|------|-----------|
| `ENERGY_NAVIGATOR` | Englisch, stabil, eindeutig |
| `WORLD_FESTLAND` | Domäne + fachlicher Begriff |
| `WORLD_KUESTE` | Umlaut korrekt umgeschrieben |
| `ICON_ZONE_MOUNTAIN` | Typ + Kontext + Objekt |
| `TOKEN_NW_WATER` | Vollständiger Bezeichner |
| `RULE_MOV_01` | Kurze Regel mit Kategorie |
| `ASSET_TEXTURE_PAPER` | Typ + Material |
| `METHOD_TRANSITIONS` | Domäne + fachlicher Name |
| `PROMPT_FESTLAND_V1` | Asset-Code mit Version erlaubt in Prompt-Kontext |
| `LOGO_NEUROWAYS_PRIMARY` | Marke + Variante |

### 12.6 Business Codes — negative Beispiele (❌)

| Code | Fehler | Korrekt |
|------|--------|---------|
| `energy-navigator` | Bindestrich | `ENERGY_NAVIGATOR` |
| `EnergyNavigator` | CamelCase | `ENERGY_NAVIGATOR` |
| `KÜSTE` | Umlaut | `KUESTE` |
| `ZONE_1` | Zahl statt Name | `ZONE_FESTLAND` |
| `world festland` | Leerzeichen | `WORLD_FESTLAND` |
| `TMP_ICON` | Temporär-Präfix | nicht in Produktion |
| `ICON!` | Sonderzeichen | `ICON_NAME` |
| `wELT` | Gemischte Schreibweise | `WELT` oder weglassen |
| `NEURO-WAYS` | Bindestrich | `NEUROWAYS` |
| `X1` | Nicht selbsterklärend | vollständiger Name |

### 12.7 Dateien — positive Beispiele (✅)

| Dateiname | Begründung |
|---------|-----------|
| `world_festland_illustration_v1.webp` | snake_case, Version, Endung |
| `icon_zone_mountain_v1.svg` | Kurz, eindeutig, Format |
| `animation_water_loop_v1.json` | Inhalt + Funktion + Version |
| `texture_paper_overlay_v1.webp` | Material + Zweck + Version |
| `nw-std-001_naming_standard_v1.0.0.md` | Dokumentformat, Semver |
| `method_energy_navigator_v1.json` | Bereich + Name + Version |
| `font_dm_sans_regular_v1.woff2` | Schrift + Stil + Version |
| `world_insel_illustration_v2.webp` | Neue Version, alte bleibt |
| `logo_neuroways_primary_v1.svg` | Marke + Variante + Version |
| `icon_energy_wave_level_3_v1.svg` | Vollständig beschreibend |

### 12.8 Dateien — negative Beispiele (❌)

| Dateiname | Fehler | Korrekt |
|---------|--------|---------|
| `Festland.PNG` | Großbuchstaben, kein Version | `world_festland_illustration_v1.png` |
| `illustration final.png` | Leerzeichen, `final` | `world_X_illustration_v2.png` |
| `bild_2026-07-23.jpg` | Datum statt Version | `world_X_v1.jpg` |
| `ICON.SVG` | Großbuchstaben | `icon_name_v1.svg` |
| `illustration_neu.png` | Deutsch | `_v2.png` |
| `tmp_test.svg` | Temporär-Präfix | nicht in Produktion |
| `icon` | Keine Endung | `icon_name_v1.svg` |
| `icon_v` | Unvollständige Version | `icon_name_v1.svg` |
| `world festland v1.png` | Leerzeichen | Unterstriche |
| `FestlandIllustration_v1.png` | CamelCase | `world_festland_illustration_v1.png` |

---

## Kapitel 13 — Offene Punkte und Abgrenzung

Folgende Themen werden in separaten Standards geregelt. Sie dürfen in diesem Standard nicht doppelt definiert werden.

### 13.1 Database Standard (NW-STD-003)

- Indexierungsregeln
- Fremdschlüssel und Integritätsprüfungen
- Migrationsstrategie für bestehende Collections
- Konkrete Felddatentypen (integer, varchar, uuid)
- Normalisierungsgrad
- Partitionierungsregeln

### 13.2 API Standard (NW-STD-011, noch zu erstellen)

- Authentifizierung und Autorisierung
- Rate Limiting
- Pagination-Konventionen
- Fehlerformat im Detail
- Versionierungsstrategie für Endpunkte
- OpenAPI-Spezifikation

### 13.3 Lifecycle Standard (NW-STD-004, noch zu erstellen)

- Übergangsregeln zwischen Statuswerten im Detail
- Genehmigungsworkflows
- Benachrichtigungen bei Statusübergängen
- Aufbewahrungsfristen für archivierte Daten

### 13.4 Versioning Standard (NW-STD-005, noch zu erstellen)

- Semver-Regeln im Detail
- Wie inkompatible Änderungen kommuniziert werden
- Rückwärtskompatibilitätsversprechen
- Deprecation-Prozess und Fristen

### 13.5 Audit Standard (NW-AUD-001, noch zu erstellen)

- Welche Ereignisse protokolliert werden müssen
- Format der Audit-Einträge
- Aufbewahrung und Zugriff

---

## Kritische Bewertung — Ist NW-STD-001 verabschiedungsreif?

### Stärken

- Vollständige Kapitelstruktur für alle genannten Bereiche
- Konsistente Schreibweiseregeln mit Negativbeispielen
- Klare Abgrenzung zu anderen Standards (keine Doppeldefinitionen)
- Erweiterbarkeit durch formales Antragsprinzip
- Migrationspfad für bestehende Felder explizit aufgeführt
- 50+ Beispiele mit Begründungen

### Dokumentierte Schwachstellen

**1. Keine formale Validierungsregel**
Der Standard beschreibt, wie Namen aussehen sollen, aber nicht, wie Verstöße erkannt und gemeldet werden. Ein automatisierbares Regelwerk (Regex, Checker-Tool) fehlt. → Empfehlung: NW-STD-001 Patch-Version mit maschinenlesbaren Validierungsregeln ergänzen.

**2. `name` vs. `title` nicht scharf genug getrennt**
Kapitel 4 definiert `name` als „maschinenlesbar" und `title` als „für Menschen", aber die Grenze ist nicht messbar. Beispiel: Ist `energy_navigator` ein `name` oder ein `code`? → Empfehlung: Beispiele mit Werten, nicht nur Feldnamen.

**3. Kein Register für vergebene Dokumentnummern**
NW-STD-001 ist Nummer 001 im STD-Bereich — aber es gibt noch kein Verzeichnis, das bestätigt, dass diese Nummer nicht bereits anderweitig vergeben wurde. → Empfehlung: Zentrales Nummernregister anlegen (NW-COR-001).

**4. API-Fehlercodes ohne vollständige Nummerierung**
Kapitel 9.5 definiert das Schema, aber keine vollständige Liste aller initialisierten Fehlercodes. → Folge-Dokument: NW-STD-011 (API Standard).

**5. Keine Aussage zu Mehrsprachigkeit in Asset-Codes**
Der Standard sagt, Englisch ist Pflicht — aber Asset-Codes wie `WORLD_KUESTE` sind Deutsch (phonetische Schreibweise eines deutschen Begriffs). Ist das eine Ausnahme oder ein Widerspruch? → Empfehlung: Explizite Ausnahmeregel für NeuroWays-Weltbegriffe ergänzen.

**6. Fehlende Interoperabilitätsregel**
Der Standard ist explizit plattformunabhängig — aber er definiert keine Aussage dazu, wie er mit externen Systemen (Drittsysteme, Exporte, Integrationen) umgeht, die eigene Konventionen haben. → Folge-Dokument: NW-STD-011 (API Standard).

### Gesamtbewertung

**Der Standard ist verabschiedungsfähig als Version 1.0.0 mit dem Status `review`.**

Er erfüllt alle zwölf geforderten Kapitel, enthält mehr als 50 dokumentierte Beispiele, grenzt sich klar von Folgestandards ab und benennt seine eigenen Schwachstellen explizit. Vor der endgültigen Freigabe (`published`) sollten mindestens Schwachstelle 5 (KUESTE-Ausnahme) und Schwachstelle 3 (Nummernregister) adressiert werden.

---

*NW-STD-001 — NeuroWays Naming Standard v1.0.1 — Status: published — Veröffentlicht 2026-07-23*
