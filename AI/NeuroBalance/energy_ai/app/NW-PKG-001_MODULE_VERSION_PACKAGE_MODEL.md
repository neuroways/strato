# NW-PKG-001 — NeuroWays Module, Version & Package Model

**Dokumentcode:** NW-PKG-001  
**Version:** v0.1.0  
**Status:** development  
**Erstellt:** 2026-07-23  
**Gültig ab:** nach Freigabe  
**Verantwortlich:** NeuroWays Core  
**Hierarchie:** Plattform-Spezifikation — referenziert NW-STD-003, NW-IDENTITY-001 normativ  
**Ablöst:** –

---

## Änderungsverlauf

| Version | Datum | Änderung | Autor |
|---------|-------|----------|-------|
| v0.1.0 | 2026-07-23 | Erstfassung — vollständiges Grundmodell | NeuroWays Core |

---

## Referenzen

| Dokument | Art |
|---------|-----|
| NW-STD-000 — Standards Framework | normativ |
| NW-STD-001 — Naming Standard | normativ |
| NW-STD-003 — Database Standard | normativ |
| NW-IDENTITY-001 — Identity & Membership Specification | normativ |
| NW-IDENTITY-POC-001 — Proof of Identity (bestanden) | informativ |
| Projektinventur 2026-07-23 (35 Dateien, vollständig) | informativ |

---

## Technologischer Ausgangspunkt

Das beschriebene System besteht aus:

| Dateityp | Beispiele |
|---------|---------|
| JSX | React-Komponenten, Seiten |
| JS (ESM) | Logik-Module, Bibliotheken |
| CSS | Globales Stylesheet |
| HTML | App-Shell |
| JSON | Paketkonfiguration |
| SVG | Favicon, Icons |
| CJS | Tailwind-Konfiguration |
| Markdown | Dokumentation |

Alle Dateien sind Textdateien. Für den ersten POC sind keine Binärdateien erforderlich.

---

## Kapitel 1 — Grundbegriffe

Die folgenden Begriffe sind scharf voneinander getrennt. Sie dürfen innerhalb dieses Standards und aller abgeleiteten Systeme nicht synonym verwendet werden.

### Produkt

Das übergeordnete Softwareprodukt, das ausgeliefert werden kann. NeuroWays ist ein Produkt. Ein Produkt besteht immer aus einer Basis und null oder mehr optionalen Modulen.

### Basis

Die zwingend enthaltene Kernplattform eines Produkts. Die Basis ist nicht optional. Jedes Paket enthält genau eine Basisversion. Die Basis ist kein Modul — sie ist ein eigenständiger Produkttyp mit eigenem Versionierungskreis.

Aktuell: NeuroWays Core Platform

### Modul

Eine in sich geschlossene, optional hinzufügbare Funktionseinheit. Ein Modul kann eine eigene Datenbanklogik, UI-Seiten, Komponenten und Konfigurationen enthalten. Module sind versioniert und können miteinander oder mit der Basis inkompatibel sein.

Aktuell: Energy Navigator

### Modulversion

Ein unveränderlicher, vollständig beschriebener Zustand eines Moduls zu einem bestimmten Zeitpunkt. Eine Modulversion enthält alle Dateien, die für die Installation dieses Moduls erforderlich sind, sowie Metadaten über Abhängigkeiten und Kompatibilität.

Eine Modulversion ist nach Veröffentlichung unveränderlich.

### Datei

Eine einzelne benannte Ressource mit Pfad, Inhalt und Metadaten. Eine Datei gehört zu genau einer Modulversion oder Basisversion. Ihr Inhalt ist vollständig in der Datenbank gespeichert.

### Dateiversion

Eine Datei hat keine eigene Versionsnummer. Änderungen an einer Datei führen zur Erstellung einer neuen Modulversion, die eine neue Datei mit dem geänderten Inhalt enthält. Eine Datei ist immer genau einer Modulversion zugeordnet und teilt deren Unveränderlichkeit.

### Abhängigkeit

Eine Bedingung, die erfüllt sein muss, damit ein Modul korrekt installiert und betrieben werden kann. Abhängigkeiten können auf Basisversionen, andere Module oder Versionsbereiche zeigen.

### Paketdefinition

Die vom Benutzer zusammengestellte Auswahl aus Basisversion und optionalen Modulversionen. Eine Paketdefinition beschreibt *was* ein Paket enthalten soll. Sie ist veränderlich, solange sie den Status DRAFT trägt.

Eine Paketdefinition ist keine ausführbare Datei und kein installiertes System.

### Paket

Umgangssprachlich: die Kombination aus Paketdefinition und mindestens einem erfolgreich abgeschlossenen Build. In diesem Standard wird Paket nicht als eigener technischer Begriff verwendet — stattdessen werden Paketdefinition, Build und Artefakt klar getrennt.

### Paketversion

Nicht verwendet. Eine Paketdefinition kann mehrere Builds produzieren. Die Versionierung findet auf Ebene der Basis und der Module statt, nicht auf Ebene der Paketdefinition.

### Build

Der konkrete technische Vorgang, bei dem eine Paketdefinition in ein Artefakt umgewandelt wird. Ein Build ist ein eigenständiges Objekt: er hat einen Startzeitpunkt, einen Endzeitpunkt, einen Status und ein Protokoll.

Ein Build verändert niemals die Paketdefinition.

### Build-Artefakt

Das Ergebnis eines erfolgreichen Builds. Ein Artefakt ist eine vollständige, installierbare Einheit mit einer Prüfsumme. Es kann mehrere Artefakte zu einer Paketdefinition geben (aus verschiedenen Builds).

Ein Artefakt ist unveränderlich.

### Installation

Der Vorgang, bei dem ein Build-Artefakt in ein Zielsystem übertragen und dort zur Laufzeit bereitgestellt wird. Die Installation ist außerhalb des Build-Systems — sie liegt beim Empfänger des Artefakts.

In diesem POC wird die Installation noch nicht implementiert.

### Upgrade

Der Vorgang, bei dem ein bereits installiertes Paket durch ein neueres Artefakt ersetzt wird, ohne den vollständigen Inhalt neu einzuspielen. Upgrades setzen ein Diff-Modell oder eine Migrationsstrategie voraus.

In diesem POC noch nicht implementiert.

---

## Kapitel 2 — Basisplattform

### 2.1 Was ist die Basis?

Die Basis ist die NeuroWays Core Platform — der nicht abwählbare Kern jedes Pakets. Sie enthält alle Dateien, die für den Betrieb einer funktionsfähigen NeuroWays-Instanz mindestens erforderlich sind.

Aktuelle Bestandteile (aus der Projektinventur):

| Datei | Funktion |
|-------|---------|
| `index.html` | Application Shell |
| `src/main.jsx` | React-Einstiegspunkt |
| `src/App.jsx` | Router (zentrale Routenliste) |
| `src/index.css` | Globales Stylesheet |
| `src/lib/pb.js` | Geteilter Backend-Client |
| `src/lib/identity.js` | Authentifizierungslogik |
| `src/components/Nav.jsx` | Navigation |
| `public/favicon.svg` | Favicon |
| `package.json` | Paketdefinition |
| `vite.config.js` | Build-Konfiguration |
| `tailwind.config.cjs` | CSS-Konfiguration |

**Nicht in der Basis** (gehören zum Modul Energy Navigator):

`engine.js`, `ZoneCard.jsx`, `ZoneIcon.jsx`, alle `pages/*.jsx` außer IdentityPoc

### 2.2 Wie wird die Basis versioniert?

Die Basis wird nach Semver versioniert, unabhängig von Modulversionen.

Aktuelle Basis: `NW-CORE v0.1.0` (development)

Eine neue Basisversion entsteht, wenn:
- eine gemeinsame Komponente (Nav, pb.js, identity.js) geändert wird
- das Build-System geändert wird
- die App-Shell verändert wird

Neue Basisversionen blockieren nicht automatisch bestehende Modulversionen — Kompatibilität wird explizit angegeben.

### 2.3 Ist die Basis ein Modul?

**Nein.** Die Basis ist ein eigenständiger Produkttyp mit eigenem Versionierungskreis. Sie verhält sich nicht wie ein Modul. Gründe:

- Sie kann nicht abgewählt werden
- Sie ist die Installationsgrundlage aller anderen Module
- Sie enthält systemkritische Dateien, die kein Modul überschreiben darf
- Sie hat ihren eigenen Kompatibilitätsgraph

### 2.4 Wie wird verhindert, dass ein Paket ohne Basis entsteht?

Strukturell: Eine Paketdefinition enthält immer genau ein Pflichtfeld `base_version_id`. Dieses Feld ist nicht nullable, nicht default-befüllbar. Ohne gültigen Verweis auf eine veröffentlichte Basisversion kann kein Build gestartet werden.

Logisch: Der Generator prüft als ersten Schritt, ob `base_version_id` auf eine existierende, veröffentlichte Basisversion zeigt. Schlägt diese Prüfung fehl, bricht der Build sofort ab.

---

## Kapitel 3 — Optionale Module

### 3.1 Modulattribute

| Attribut | Typ | Pflicht | Beschreibung |
|---------|-----|---------|--------------|
| `module_id` | UUID | ✅ | Unveränderlicher Primärschlüssel |
| `module_code` | text | ✅ | Stabiler Business-Code (z. B. `ENERGY_NAVIGATOR`) |
| `name` | text | ✅ | Anzeigename |
| `description` | text | ✅ | Beschreibung für den Paketkonfigurator |
| `category` | text | ✅ | `METHOD`, `DASHBOARD`, `TOOL`, `INTEGRATION` etc. |
| `status` | text | ✅ | Modulstatus (siehe 3.2) |
| `current_version` | text | – | Aktuell aktive Version (Verweis) |
| `install_order` | number | ✅ | Reihenfolge relativ zu anderen Modulen |
| `created_at` | datetime | ✅ | – |
| `updated_at` | datetime | ✅ | – |

### 3.2 Versionsstatus eines Moduls

| Status | Bedeutung |
|--------|-----------|
| `DEVELOPMENT` | Wird gerade entwickelt, kann instabil sein |
| `PUBLISHED` | Aktiv und für Paketauswahl verfügbar |
| `DEPRECATED` | Noch verwendbar, Ablösung angekündigt |
| `LOCKED` | Keine neuen Pakete mit dieser Version, bestehende laufen weiter |
| `ARCHIVED` | Nicht mehr verwendbar, historisch erhalten |

### 3.3 Referenzmodul: Energy Navigator

| Attribut | Wert |
|---------|------|
| `module_code` | `ENERGY_NAVIGATOR` |
| `name` | Energy Navigator |
| `category` | `METHOD` |
| `status` | `DEVELOPMENT` (noch nicht formal veröffentlicht) |
| `install_order` | 10 |

Zugehörige Dateien (aktuell verteilt):

```
src/lib/engine.js              → Logik (in Modulordner zu verschieben)
src/components/ZoneCard.jsx    → UI-Komponente
src/components/ZoneIcon.jsx    → UI-Komponente
src/pages/Home.jsx             → Seite
src/pages/CheckIn.jsx          → Seite
src/pages/Result.jsx           → Seite
src/pages/History.jsx          → Seite
src/pages/Privacy.jsx          → Seite
```

---

## Kapitel 4 — Modulversionen

### 4.1 Pflichtattribute einer Modulversion

| Attribut | Typ | Pflicht | Beschreibung |
|---------|-----|---------|--------------|
| `version_id` | UUID | ✅ | Unveränderlicher Primärschlüssel |
| `module_id` | UUID | ✅ | Verweis auf das Modul |
| `version` | text | ✅ | Semver-Versionsnummer |
| `status` | text | ✅ | Versionsstatus |
| `published_at` | datetime | – | Gesetzt bei Veröffentlichung |
| `changelog` | text | ✅ | Beschreibung der Änderungen |
| `compatible_base_versions` | json | ✅ | Semver-Bereiche der Basisversionen |
| `requires_modules` | json | – | Abhängige Module mit Versionsbereichen |
| `install_order` | number | ✅ | Innerhalb der Modulsammlung |
| `created_by` | UUID | ✅ | Ersteller |
| `created_at` | datetime | ✅ | Erstellungszeitpunkt |

### 4.2 Versionsstatus

| Status | Bedeutung | Fachliche Inhalte änderbar? |
|--------|-----------|---------------------------|
| `DRAFT` | In Entwicklung | ✅ ja |
| `REVIEW` | Zur Prüfung | ⚠️ nur Korrekturen |
| `PUBLISHED` | Aktiv, in Paketen verwendbar | ❌ nein |
| `DEPRECATED` | Verwendbar, Ablösung angekündigt | ❌ nein |
| `WITHDRAWN` | Zurückgezogen, nicht mehr verwendbar | ❌ nein |
| `ARCHIVED` | Historisch erhalten | ❌ nein |

### 4.3 Semantische Versionierung

```
MAJOR.MINOR.PATCH

MAJOR: Inkompatible Änderung (andere Basisversion nötig, API geändert)
MINOR: Neue Funktionen, rückwärtskompatibel
PATCH: Fehlerbehebungen, keine neuen Funktionen
```

### 4.4 Lebenszyklusregeln

**Entwurf:** Alle Felder veränderbar, keine Pakete damit erstellt (außer DEVELOPMENT-Paketen).

**Veröffentlichung:** Status → PUBLISHED, `published_at` gesetzt. Danach: Inhalt unveränderlich. Nur Verwaltungsfelder (Status, Nachfolger) änderbar.

**Korrektur:** Erzeugt immer eine neue PATCH-Version. Die korrigierte Version wird WITHDRAWN oder DEPRECATED, nicht überschrieben.

**Neue Version:** Neue Minor- oder Major-Version entsteht durch einen neuen `module_versions`-Eintrag. Alte Version bleibt erhalten.

**Zurückziehen:** Status → WITHDRAWN. Bestehende Pakete mit dieser Version bleiben gültig, können aber nicht neu erstellt werden.

---

## Kapitel 5 — Dateien und Dateiinhalte

### 5.1 Dateiobjekt-Attribute

| Attribut | Typ | Pflicht | Beschreibung |
|---------|-----|---------|--------------|
| `file_id` | UUID | ✅ | Unveränderlicher Primärschlüssel |
| `version_id` | UUID | ✅ | Verweis auf Modulversion oder Basisversion |
| `version_type` | text | ✅ | `BASE` oder `MODULE` |
| `relative_path` | text | ✅ | Pfad im Zielprojekt, z. B. `src/lib/engine.js` |
| `file_name` | text | ✅ | Dateiname ohne Pfad |
| `file_extension` | text | ✅ | Erweiterung ohne Punkt: `jsx`, `js`, `css` |
| `mime_type` | text | ✅ | z. B. `text/javascript`, `text/css` |
| `category` | text | ✅ | Kategorie (siehe 5.2) |
| `is_binary` | bool | ✅ | `false` für alle aktuellen Dateien |
| `content` | text (long) | ✅ | Vollständiger Dateiinhalt (UTF-8) |
| `encoding` | text | ✅ | `utf-8` |
| `file_size` | number | ✅ | Bytes |
| `checksum` | text | ✅ | SHA-256 des Inhalts |
| `install_order` | number | ✅ | Reihenfolge innerhalb der Version |
| `status` | text | ✅ | `active`, `superseded` |
| `created_at` | datetime | ✅ | – |

### 5.2 Dateikategorien

| Kategorie | Beispiele |
|-----------|---------|
| `SOURCE` | `.jsx`, `.js`, `.ts` — Quellcode |
| `CONFIG` | `vite.config.js`, `tailwind.config.cjs`, `package.json` |
| `STYLE` | `.css` |
| `ASSET` | `.svg`, `.png`, `.woff2` |
| `DATA` | `.json` (Datendateien, nicht Konfiguration) |
| `BUILD` | `.gitignore`, `.platform-deps`, `server.js` |
| `DOCUMENTATION` | `.md` |
| `GENERATED` | `dist/`, automatisch erzeugte Dateien |

### 5.3 Textspeicherung

Alle aktuellen Dateien sind Textdateien (UTF-8). Der vollständige Inhalt wird im Feld `content` gespeichert. Kein Encoding, keine Kompression im Datenbankfeld selbst — der Rohinhalt ist direkt lesbar.

### 5.4 Binärdateispeicherung (Vorbereitung)

Wenn später Binärdateien (Bilder, Schriften) in Modulversionen eingebunden werden:
- `is_binary = true`
- `content` enthält Base64-encodierten Inhalt
- `encoding = "base64"`
- Oder: `content` enthält leer, stattdessen `file_reference` auf externen Speicher (z. B. `/static/<filename>`)

Für den POC: nur Textdateien, kein Base64.

### 5.5 Duplikaterkennung

Zwei Dateien gelten als identisch, wenn ihre `checksum` (SHA-256) übereinstimmt. Das System prüft bei der Paketgenerierung nicht auf identischen Inhalt, sondern auf Pfadkonflikte. Inhaltliche Duplikate mit verschiedenen Pfaden sind erlaubt.

### 5.6 Pfadkonflikte

Zwei Dateien mit demselben `relative_path` aus verschiedenen Modulen oder aus Modul und Basis erzeugen einen Pfadkonflikt. Das Verhalten ist konfigurierbar:

| Strategie | Beschreibung |
|-----------|-------------|
| `FAIL` | Build schlägt fehl, Fehler im Protokoll (Standard) |
| `BASE_WINS` | Basisdatei überschreibt Moduldatei |
| `MODULE_WINS` | Moduldatei überschreibt Basisdatei |
| `MERGE_APPEND` | Nur für bestimmte Dateitypen (z. B. Routen-Register) |

Für den POC: `FAIL` — kein Konflikt darf unbemerkt bleiben.

### 5.7 Ausschluss von Geheimnissen

Verboten in Dateiinhalten:
- Passwörter, API-Keys, Tokens
- Private Keys
- `.env`-Dateien mit gesetzten Werten (leere `.env.example` erlaubt)
- Verbindungsstrings mit Credentials

Der Generator prüft vor dem Speichern einer neuen Dateiversionen eine Negativliste von Mustern (z. B. `PASSWORD=`, `SECRET=`, `TOKEN=`, `-----BEGIN`). Treffer blockieren das Speichern mit einem Fehlerbericht.

---

## Kapitel 6 — Abhängigkeiten

### 6.1 Abhängigkeitsobjekt

| Attribut | Typ | Beschreibung |
|---------|-----|--------------|
| `dep_id` | UUID | Primärschlüssel |
| `source_type` | text | `BASE_VERSION` oder `MODULE_VERSION` |
| `source_id` | UUID | Verweis auf die abhängige Version |
| `target_type` | text | `BASE` oder `MODULE` |
| `target_code` | text | Business-Code des Ziels |
| `min_version` | text | Semver-Untergrenze (inklusiv) |
| `max_version` | text | Semver-Obergrenze (exklusiv, optional) |
| `is_required` | bool | `true` = zwingend, `false` = optional |
| `conflict_rule` | text | `NONE`, `INCOMPATIBLE_WITH` |
| `install_order` | number | Reihenfolge der Abhängigkeitsauflösung |

### 6.2 Validierungsregeln bei der Paketerstellung

Der Generator prüft in dieser Reihenfolge:

1. **Basisversion vorhanden?** — Pflicht, Build schlägt ohne Basis fehl
2. **Alle zwingenden Abhängigkeiten erfüllt?** — Fehlende Pflichtmodule → Build-Fehler
3. **Alle Versionen kompatibel?** — Versionsbereiche geprüft
4. **Pfadkonflikte?** — Alle Dateipfade gesammelt, Duplikate gesucht
5. **Verbotene Kombinationen?** — `INCOMPATIBLE_WITH`-Regeln geprüft
6. **Geheimnis-Scan?** — Dateiinhalte auf verbotene Muster geprüft

---

## Kapitel 7 — Paketkonfigurator (UI-Modell)

### 7.1 Benutzerführung

Der Konfigurator ist eine dreistufige Oberfläche:

**Stufe 1 — Basisauswahl:**
- Verfügbare Basisversionen anzeigen (eine zur Zeit: NW-CORE v0.1.0)
- Immer vorausgewählt, nicht abwählbar
- Versionsnummer und Beschreibung sichtbar

**Stufe 2 — Modulauswahl:**
- Alle verfügbaren Module als Karten
- Pro Karte: Name, Beschreibung, Kategorie, verfügbare Versionen, Kompatibilitätsstatus
- Versionsauswahl per Dropdown (Standard: neueste kompatible)
- Abhängigkeiten werden automatisch mitgewählt und als "erforderlich" markiert
- Inkompatible Module werden grau dargestellt mit Begründung

**Stufe 3 — Zusammenfassung und Bestellen:**
- Vollständige Liste aller ausgewählten Versionen
- Bestellen-Button → startet Build
- Paket kann mit Namen versehen werden

### 7.2 Paketdefinitions-Statuswerte

| Status | Bedeutung |
|--------|-----------|
| `DRAFT` | Benutzer konfiguriert noch |
| `VALIDATING` | System prüft Kompatibilität |
| `READY` | Bereit für Build-Auslösung |
| `BUILDING` | Build läuft |
| `COMPLETED` | Build erfolgreich, Artefakt verfügbar |
| `FAILED` | Build fehlgeschlagen |
| `ARCHIVED` | Vom Benutzer archiviert |

### 7.3 Unveränderlichkeit der Bestellung

Sobald ein Build gestartet wird (Status → `BUILDING`), ist die Paketdefinition eingefroren. Korrekturen erfordern eine neue Paketdefinition (Kopie mit angepassten Versionen).

---

## Kapitel 8 — Paketdefinition, Build und Artefakt

### 8.1 Paketdefinition

```
package_definitions
  id              UUID        Primärschlüssel
  user_id         UUID        Eigentümer (aus users)
  name            text        Benutzervergebener Name
  description     text        Optional
  base_version_id UUID        Pflicht — gewählte Basisversion
  status          text        DRAFT | VALIDATING | READY | BUILDING | COMPLETED | FAILED | ARCHIVED
  created_at      datetime
  updated_at      datetime

package_definition_items
  id              UUID
  definition_id   UUID        → package_definitions
  module_code     text        Business-Code des Moduls
  module_version  text        Gewählte Semver-Version
  is_required     bool        true = durch Abhängigkeit erzwungen
  created_at      datetime
```

### 8.2 Build

```
builds
  id              UUID
  definition_id   UUID        → package_definitions
  build_number    number      Fortlaufend pro Paketdefinition (1, 2, 3 …)
  started_at      datetime
  completed_at    datetime
  status          text        QUEUED | RUNNING | COMPLETED | FAILED
  used_versions   json        Snapshot: alle verwendeten Versionen zum Build-Zeitpunkt
  checksum        text        SHA-256 des Artefakts
  error_message   text        Leer bei Erfolg
```

### 8.3 Build-Artefakt

```
build_artifacts
  id              UUID
  build_id        UUID        → builds
  file_name       text        z. B. nw-pkg-energy-nav-20260723-001.json
  format          text        MANIFEST_JSON | ZIP | TAR_GZ
  content         text/blob   Vollständiger Artefaktinhalt (oder Speicherreferenz)
  file_size       number      Bytes
  checksum        text        SHA-256
  created_at      datetime
```

### 8.4 Build-Protokoll

```
build_logs
  id              UUID
  build_id        UUID
  level           text        INFO | WARN | ERROR
  step            text        LOAD_BASE | LOAD_MODULES | CHECK_DEPS | CHECK_PATHS | MERGE | GENERATE | STORE
  message         text
  created_at      datetime
```

---

## Kapitel 9 — Benutzerspeicherung und Datenisolation

### 9.1 Grundsatz

Jede `package_definitions`-Entität trägt eine `user_id`. Die Datenbankzugriffsregel lautet:

```
listRule:   user_id = @request.auth.id
viewRule:   user_id = @request.auth.id
createRule: @request.auth.id != ""
updateRule: user_id = @request.auth.id && status = "DRAFT"
deleteRule: null  (kein Hard-Delete)
```

### 9.2 Was der Benutzer sieht

- Eigene Paketdefinitionen mit Status, Name, ausgewählten Modulen
- Eigene Builds zu jeder Paketdefinition
- Eigene Artefakte pro Build
- Build-Protokolle eigener Builds

### 9.3 Was kein Benutzer sieht

- Paketdefinitionen anderer Benutzer
- Builds anderer Benutzer
- Artefakte anderer Benutzer

Öffentliche Daten (gelesen ohne Benutzerauthentifizierung):
- Modul-Katalog (`modules`, `module_versions`) — lesbar für alle
- Basis-Katalog (`base_versions`) — lesbar für alle
- Dateiinhalte (`version_files`) — lesbar für alle (kein Geheimnis)

### 9.4 Identitätsgrundlage

Datenisolation basiert auf der in NW-IDENTITY-POC-001 (14/14 Tests bestanden) validierten Identitätsschicht: `user_id = @request.auth.id` in Collection-Regeln, JWT aus `pb.authStore`.

---

## Kapitel 10 — Generierungslogik

### 10.1 Fachlicher Ablauf

```
Schritt 1: Basisversion laden
  → base_versions WHERE id = definition.base_version_id
  → Prüfen: status = PUBLISHED

Schritt 2: Basisdateien laden
  → version_files WHERE version_id = base_version.id
  → Sortieren nach install_order

Schritt 3: Modulversionen laden
  → Für jedes package_definition_item:
    module_versions WHERE module_code = item.module_code AND version = item.module_version
  → Prüfen: alle status = PUBLISHED oder DEPRECATED

Schritt 4: Abhängigkeiten prüfen
  → Alle dependencies für jede Modulversion laden
  → Pflichtabhängigkeiten: sind die Zielmodule in der Paketdefinition vorhanden?
  → Versionsbereiche: stimmen die ausgewählten Versionen?
  → Verbotene Kombinationen: keine INCOMPATIBLE_WITH-Paare

Schritt 5: Pfadkonflikte prüfen
  → Alle Dateipfade aller Versionen sammeln
  → Duplikate identifizieren
  → Bei Strategie FAIL: Build-Abbruch mit Fehlerbericht

Schritt 6: Dateien zusammenführen
  → Basisdateien zuerst (in install_order)
  → Dann Moduldateien in Modul-install_order, innerhalb pro Modul in Datei-install_order

Schritt 7: Artefakt erzeugen
  → Für POC: JSON-Manifest (siehe Kapitel 10.2)

Schritt 8: Prüfsumme berechnen
  → SHA-256 über den vollständigen Artefaktinhalt

Schritt 9: Speichern
  → build_artifacts: Inhalt, Prüfsumme, Format
  → build_logs: vollständiges Protokoll
  → builds: status = COMPLETED, completed_at, checksum
  → package_definitions: status = COMPLETED
```

### 10.2 Empfehlung Artefaktformat für den ersten POC

**Empfehlung: Textuelles JSON-Manifest mit vollständigen Dateiinhalten**

```json
{
  "manifest_version": "1.0",
  "generated_at": "2026-07-23T12:00:00Z",
  "package_name": "NeuroWays Energy Navigator",
  "base": {
    "code": "NW_CORE",
    "version": "0.1.0"
  },
  "modules": [
    { "code": "ENERGY_NAVIGATOR", "version": "1.1.0" }
  ],
  "checksum": "sha256:abc123...",
  "files": [
    {
      "path": "index.html",
      "category": "BUILD",
      "content": "<!doctype html>..."
    },
    {
      "path": "src/main.jsx",
      "category": "SOURCE",
      "content": "import { StrictMode }..."
    }
  ]
}
```

**Warum JSON-Manifest, nicht ZIP:**
- Vollständig in der Datenbank speicherbar (Textfeld)
- Direkt lesbar, prüfbar, validierbar
- Kein Binär-Handling erforderlich
- Prüfsumme über das vollständige Dokument trivial
- Kann später in ZIP oder ZIP+HTML umgewandelt werden
- Entspricht dem Prinzip „Klartext vor Kompression" für den POC

**Warum nicht rekonstruiertes Verzeichnis:**
- Setzt Dateisystemzugriff voraus
- Schwieriger zu speichern und zu transportieren

**Warum nicht ZIP bereits jetzt:**
- Binärformat erschwert Datenbankablage
- Braucht zusätzliche Infrastruktur

---

## Kapitel 11 — Aktuelle Architekturprobleme

### 11.1 Bewertungsmatrix

| Problem | Blockiert POC? | Muss vor echter Installation gelöst werden? |
|---------|---------------|---------------------------------------------|
| `App.jsx` — statische Routen | ❌ NEIN | ✅ JA |
| `Nav.jsx` — hartcodierte Links | ❌ NEIN | ✅ JA |
| Energy Navigator — Dateien verteilt | ❌ NEIN (manuell zuordenbar) | ✅ JA (Modulordner) |
| `engine.js` → direkt `pb.js` | ❌ NEIN | ✅ JA (Interface-Abstraktion) |
| `asset_engine_validation.js` in `src/lib/` | ❌ NEIN | ✅ JA (aus Frontend entfernen) |
| Dashboard fehlt | ❌ NEIN | ✅ JA (Basisbestandteil) |
| Check-ins nicht benutzergebunden | ❌ NEIN (POC testet Isolation, nicht Daten) | ✅ JA (vor Produktion) |

**Für den ersten Paket-POC sind alle sieben Probleme akzeptabel.** Der POC beweist das Speicher- und Artefakt-Generierungsmodell, nicht die Produktionsreife der Modulgrenzen.

### 11.2 Handlungsempfehlung nach dem POC

Reihenfolge der Korrekturen vor einer echten Modulinstallation:

1. `asset_engine_validation.js` aus `src/lib/` entfernen (minimaler Aufwand, max. Klarheit)
2. Energy Navigator in eigenen Ordner `src/modules/energy-navigator/` verschieben
3. `App.jsx` auf dynamische Routenregistrierung umstellen
4. `Nav.jsx` auf konfigurierbare Linkliste umstellen
5. `engine.js` von `pb.js` über Interface abstrahieren
6. Dashboard-Grundstruktur anlegen
7. Check-ins an `user_id` binden

---

## Kapitel 12 — Minimaler Proof of Package (POC-Definition)

### 12.1 Abnahmekriterien

| # | Kriterium |
|---|-----------|
| 1 | Eine Basisversion (NW-CORE v0.1.0) ist in der Datenbank gespeichert |
| 2 | Alle Basisdateien sind mit vollständigem Inhalt gespeichert |
| 3 | Eine Energy-Navigator-Modulversion (v1.1.0) ist gespeichert |
| 4 | Alle Moduldateien sind mit vollständigem Inhalt gespeichert |
| 5 | Benutzer A erstellt eine Paketdefinition (Basis + Energy Navigator) |
| 6 | Paketdefinition wird in der Datenbank gespeichert (user_id = A) |
| 7 | Ein Build wird gestartet und durchläuft alle 9 Schritte |
| 8 | Ein JSON-Manifest-Artefakt wird erzeugt und gespeichert |
| 9 | Das Artefakt enthält alle Dateien beider Versionen |
| 10 | Benutzer B kann das Artefakt von Benutzer A nicht sehen |

### 12.2 POC-Umfang (explizit ausgeschlossen)

- Keine echte Installation in ein Zielsystem
- Kein Upgrade-Mechanismus
- Keine Zahlung, Lizenzierung
- Keine Organisationen, Rollen
- Keine ZIP-Erzeugung
- Kein Diff-Mechanismus

---

## Kapitel 13 — Logisches Datenmodell

### bases (Basisplattform-Katalog)

**Zweck:** Alle bekannten NeuroWays-Basisplattformen.

| Attribut | Typ | Regel |
|---------|-----|-------|
| `id` | UUID | Primärschlüssel, unveränderlich |
| `code` | text | `NW_CORE`, stabil |
| `name` | text | Anzeigename |
| `description` | text | – |
| `status` | text | active, archived |
| `created_at` | datetime | – |

**Beziehungen:** Hat viele `base_versions`.
**Eigentümer:** NeuroWays Core (kein Benutzer).
**Löschverhalten:** Niemals löschen — archivieren.

---

### base_versions

**Zweck:** Unveränderliche Snapshots einer Basisversion.

| Attribut | Typ | Regel |
|---------|-----|-------|
| `id` | UUID | Primärschlüssel |
| `base_id` | UUID | → bases |
| `version` | text | Semver |
| `status` | text | DRAFT, PUBLISHED, DEPRECATED, ARCHIVED |
| `changelog` | text | Pflicht |
| `published_at` | datetime | Gesetzt bei Veröffentlichung |
| `created_at` | datetime | – |

**Unveränderlichkeit:** Nach `PUBLISHED`: alle Felder außer Status eingefroren.
**Eigentümer:** NeuroWays Core.
**Löschverhalten:** Niemals löschen.

---

### modules

**Zweck:** Katalog aller verfügbaren optionalen Module.

| Attribut | Typ | Regel |
|---------|-----|-------|
| `id` | UUID | Primärschlüssel |
| `module_code` | text | `ENERGY_NAVIGATOR`, stabil |
| `name` | text | Anzeigename |
| `description` | text | Für Konfigurator |
| `category` | text | METHOD, DASHBOARD, TOOL, INTEGRATION |
| `status` | text | DEVELOPMENT, PUBLISHED, DEPRECATED, ARCHIVED |
| `install_order` | number | Global-Reihenfolge |
| `created_at` | datetime | – |

**Beziehungen:** Hat viele `module_versions`.
**Eigentümer:** NeuroWays Core.
**Löschverhalten:** Archivieren, niemals löschen.

---

### module_versions

**Zweck:** Unveränderliche, vollständig beschriebene Modulzustände.

| Attribut | Typ | Regel |
|---------|-----|-------|
| `id` | UUID | Primärschlüssel |
| `module_id` | UUID | → modules |
| `version` | text | Semver |
| `status` | text | DRAFT, REVIEW, PUBLISHED, DEPRECATED, WITHDRAWN, ARCHIVED |
| `changelog` | text | Pflicht |
| `compatible_base_versions` | json | Semver-Bereiche |
| `published_at` | datetime | – |
| `created_by` | UUID | → users |
| `created_at` | datetime | – |

**Unveränderlichkeit:** Nach `PUBLISHED`: kein Dateiinhalt änderbar.
**Löschverhalten:** Niemals löschen.

---

### version_files

**Zweck:** Vollständige Dateiinhalte einer Basis- oder Modulversion.

| Attribut | Typ | Regel |
|---------|-----|-------|
| `id` | UUID | Primärschlüssel |
| `version_id` | UUID | → base_versions oder module_versions |
| `version_type` | text | `BASE` oder `MODULE` |
| `relative_path` | text | Zielpfad im Projekt |
| `file_name` | text | Dateiname |
| `file_extension` | text | Ohne Punkt |
| `mime_type` | text | – |
| `category` | text | SOURCE, CONFIG, STYLE, ASSET, DATA, BUILD, DOCUMENTATION, GENERATED |
| `is_binary` | bool | Standard: false |
| `content` | text (long) | Vollständiger UTF-8-Inhalt |
| `encoding` | text | `utf-8` |
| `file_size` | number | Bytes |
| `checksum` | text | SHA-256 |
| `install_order` | number | Reihenfolge innerhalb Version |
| `status` | text | `active` |
| `created_at` | datetime | – |

**Unveränderlichkeit:** Nach Veröffentlichung der Elternversion: unveränderlich.
**Löschverhalten:** Niemals löschen.

---

### dependencies

**Zweck:** Beschreibt, was eine Modulversion oder Basisversion voraussetzt.

| Attribut | Typ | Regel |
|---------|-----|-------|
| `id` | UUID | Primärschlüssel |
| `source_id` | UUID | → module_versions oder base_versions |
| `source_type` | text | `BASE_VERSION`, `MODULE_VERSION` |
| `target_code` | text | Business-Code des Ziels |
| `target_type` | text | `BASE`, `MODULE` |
| `min_version` | text | Semver, inklusiv |
| `max_version` | text | Semver, exklusiv, optional |
| `is_required` | bool | Pflicht oder optional |
| `conflict_rule` | text | `NONE`, `INCOMPATIBLE_WITH` |
| `install_order` | number | – |

**Eigentümer:** NeuroWays Core (Systemobjekt).

---

### package_definitions

**Zweck:** Benutzergewählte Zusammenstellung aus Basis + Modulen.

| Attribut | Typ | Regel |
|---------|-----|-------|
| `id` | UUID | Primärschlüssel |
| `user_id` | UUID | → users, Eigentümer |
| `name` | text | Benutzervergeben |
| `description` | text | Optional |
| `base_version_id` | UUID | Pflicht → base_versions |
| `status` | text | DRAFT, VALIDATING, READY, BUILDING, COMPLETED, FAILED, ARCHIVED |
| `created_at` | datetime | – |
| `updated_at` | datetime | – |

**Eigentümer:** Benutzer (`user_id`).
**Zugriff:** Nur durch Eigentümer.
**Unveränderlichkeit:** Nach `BUILDING`: eingefroren.

---

### package_definition_items

**Zweck:** Einzelne Modulauswahlen einer Paketdefinition.

| Attribut | Typ | Regel |
|---------|-----|-------|
| `id` | UUID | Primärschlüssel |
| `definition_id` | UUID | → package_definitions |
| `module_code` | text | Business-Code |
| `module_version` | text | Semver |
| `is_required` | bool | Durch Abhängigkeit erzwungen? |
| `created_at` | datetime | – |

**Eigentümer:** Benutzer (über definition_id).

---

### builds

**Zweck:** Einzelner Build-Vorgang einer Paketdefinition.

| Attribut | Typ | Regel |
|---------|-----|-------|
| `id` | UUID | Primärschlüssel |
| `definition_id` | UUID | → package_definitions |
| `user_id` | UUID | → users (denormalisiert für Isolation) |
| `build_number` | number | Fortlaufend pro Definition |
| `started_at` | datetime | – |
| `completed_at` | datetime | – |
| `status` | text | QUEUED, RUNNING, COMPLETED, FAILED |
| `used_versions` | json | Snapshot aller verwendeten Versionen |
| `checksum` | text | SHA-256 des Artefakts |
| `error_message` | text | Leer bei Erfolg |

**Eigentümer:** Benutzer (`user_id`).
**Unveränderlichkeit:** Nach `COMPLETED` oder `FAILED`: eingefroren.
**Löschverhalten:** Niemals löschen, nur archivieren.

---

### build_artifacts

**Zweck:** Das erzeugte Installationsartefakt eines Builds.

| Attribut | Typ | Regel |
|---------|-----|-------|
| `id` | UUID | Primärschlüssel |
| `build_id` | UUID | → builds |
| `user_id` | UUID | → users |
| `file_name` | text | Menschenlesbarer Name |
| `format` | text | `MANIFEST_JSON`, `ZIP`, `TAR_GZ` |
| `content` | text (long) | Vollständiger Artefaktinhalt |
| `file_size` | number | Bytes |
| `checksum` | text | SHA-256 |
| `created_at` | datetime | – |

**Eigentümer:** Benutzer (`user_id`).
**Zugriff:** Nur durch Eigentümer.
**Unveränderlichkeit:** Vollständig nach Erzeugung.

---

### build_logs

**Zweck:** Schritt-für-Schritt-Protokoll eines Builds.

| Attribut | Typ | Regel |
|---------|-----|-------|
| `id` | UUID | Primärschlüssel |
| `build_id` | UUID | → builds |
| `user_id` | UUID | → users |
| `level` | text | `INFO`, `WARN`, `ERROR` |
| `step` | text | `LOAD_BASE`, `LOAD_MODULES`, `CHECK_DEPS`, `CHECK_PATHS`, `MERGE`, `GENERATE`, `STORE` |
| `message` | text | Kein Geheimnis erlaubt |
| `created_at` | datetime | – |

**Eigentümer:** Benutzer (`user_id`).
**Geheimnisse:** Explizit verboten — Log-Einträge werden vor Speicherung auf verbotene Muster geprüft.

---

## Kapitel 14 — Sicherheitsregeln

| Regel | Umsetzung |
|-------|-----------|
| Benutzer sehen nur eigene Definitionen und Builds | `listRule: user_id = @request.auth.id` auf allen benutzereigenen Collections |
| Veröffentlichte Versionen sind unveränderlich | Status-Prüfung vor jedem Schreibzugriff; kein `updateRule` für veröffentlichte Versionen |
| Geheimnisse nicht in Versionsdateien | Regex-Scan vor dem Speichern jedes Dateiinhalts |
| Dateipfade validiert | Whitelist erlaubter Zeichen: `[a-zA-Z0-9_\-./]`, Länge ≤ 255 |
| Pfad-Traversal verboten | `relative_path` darf `../` nicht enthalten; Prüfung vor Speichern und vor Build |
| Kein Code-Execution während Generation | Generator liest nur gespeicherte Inhalte, führt keinen Code aus, keine `eval()`, keine Shell-Befehle |
| Generator kombiniert nur gespeicherte Inhalte | Kein Netzwerkzugriff, kein Dateisystemzugriff während der Generierung |
| Build-Protokolle ohne Geheimnisse | Regex-Scan vor jedem Log-Eintrag |
| Artefakte mit Prüfsumme | SHA-256 obligatorisch, Prüfsumme in separatem Feld |

---

## Kapitel 15 — Abnahmekriterien

| # | Kriterium | Abgedeckt in |
|---|-----------|-------------|
| 1 | Wie Basis und Module versioniert werden | Kapitel 2, 3, 4 |
| 2 | Wie vollständige Dateien gespeichert werden | Kapitel 5 |
| 3 | Wie ein Benutzer Module auswählt | Kapitel 7 |
| 4 | Wie eine Paketdefinition entsteht | Kapitel 8.1 |
| 5 | Wie ein Build davon getrennt wird | Kapitel 8.2, 1 (Begriffe) |
| 6 | Wie ein Artefakt erzeugt und gespeichert wird | Kapitel 8.3, 10 |
| 7 | Wie Benutzerisolation sichergestellt wird | Kapitel 9, 14 |
| 8 | Wie Abhängigkeiten und Konflikte erkannt werden | Kapitel 6 |
| 9 | Wie der erste Proof of Package umgesetzt werden kann | Kapitel 12 |

**Alle neun Abnahmekriterien sind abgedeckt. ✅**

---

## Offene Fragen

| Frage | Relevanz | Priorität |
|-------|---------|-----------|
| Wie wird der Build angestoßen? (Sofort, asynchron, Queue?) | Hoch — bestimmt UI-Design | Vor POC klären |
| Wie groß werden JSON-Manifeste bei vielen Dateien? | Mittel — Datenbanklimit bei `text`-Feldern | Vor POC messen |
| Soll der Benutzer das Manifest direkt herunterladen können? | Mittel | Nach POC |
| Wie werden zukünftige Basisversionen rückwärtskompatibel zu alten Modulen? | Hoch | Vor v1.0 |
| Welche Semver-Bibliothek wird für Versionsvergleiche verwendet? | Mittel (Node hat native Semver-Unterstützung) | Vor POC |
| Sollen Modulversionen von Dritten hochladbar sein? | Mittel (Zukunft) | Nicht im POC |

---

## Risiken

| Risiko | Wahrscheinlichkeit | Auswirkung | Gegenmaßnahme |
|--------|------------------|------------|----------------|
| JSON-Manifest zu groß für Datenbankfeld | Mittel | Hoch | Feldtyp und Limit prüfen; ggf. externe Speicherreferenz |
| Pfadkonflikt zwischen Basis und Modul (`App.jsx`) | Hoch | Hoch | Bekanntes Problem — FAIL-Strategie erzwingt bewusste Entscheidung |
| Geheimnis-Scan zu restriktiv (false positives) | Mittel | Mittel | Whitelist für bekannte harmlose Muster |
| Build dauert zu lange (synchron) | Mittel | Mittel | Für POC: synchron akzeptabel; Produktion: Queue |
| Versionskonflikt bei Basisupgrade | Hoch (bei Wachstum) | Hoch | Kompatibilitätsmatrix pflegen |

---

## Empfehlung: Artefaktformat für den ersten POC

**JSON-Manifest** (siehe Kapitel 10.2).

Begründung: vollständig textbasiert, in der Datenbank speicherbar, direkt lesbar, keine Binärinfrastruktur, Prüfsumme trivial, erweiterbar.

---

## Konkreter nächster Implementierungsschritt

**Schritt 1 — Collections anlegen** (kein Code, nur Datenbankstruktur):

In dieser Reihenfolge:
1. `bases` + `base_versions`
2. `modules` + `module_versions`
3. `version_files`
4. `dependencies`
5. `package_definitions` + `package_definition_items`
6. `builds` + `build_artifacts` + `build_logs`

**Schritt 2 — Erste Daten einspeisen:**
- NW-CORE v0.1.0 als Basisversion mit allen 11 Basisdateien
- ENERGY_NAVIGATOR v1.1.0 als Modulversion mit allen 8 Moduldateien

**Schritt 3 — POC-Build:**
- Benutzer A erstellt Paketdefinition (Basis + Energy Navigator)
- Generator produziert JSON-Manifest
- Datenisolation: Benutzer B kann Artefakt nicht sehen

---

*NW-PKG-001 — NeuroWays Module, Version & Package Model v0.1.0 — Status: development — 2026-07-23*
