# NW-STD-003 — NeuroWays Database Standard

**Dokumentcode:** NW-STD-003
**Version:** 1.0.1
**Status:** published
**Veröffentlicht:** 2026-07-23
**Erstellt:** 2026-07-23
**Gültig ab:** 2026-07-23
**Verantwortlich:** NeuroWays Core
**Hierarchie:** Technical Standard — referenziert NW-STD-000 und NW-STD-001 normativ
**Ablöst:** –
**Abgelöst durch:** –

---

## Änderungsverlauf

| Version | Datum | Änderung | Grund | Review |
|---------|-------|----------|-------|--------|
| 1.0.0 | 2026-07-23 | Erstfassung | – | – |
| 1.0.1 | 2026-07-23 | Projektspezifische Implementierungsreferenz (`asset_engine_validation.js`) aus normativem Kapitel 5.8 und Kapitel 11 entfernt; durch plattformneutrale Formulierung ersetzt | Governance Review (Konflikt D — Plattformneutralität) | Governance Review 2026-07-23 |
| 1.0.1 | 2026-07-23 | Status: draft → approved → published. Erste offizielle Veröffentlichung. | Veröffentlichungsreihenfolge Governance Foundation v1.0 | NeuroWays Core 2026-07-23 |

---

## Referenzen

| Dokument | Titel | Art |
|---------|-------|-----|
| NW-STD-000 | Standards Framework Standard | normativ |
| NW-STD-001 | Naming Standard | normativ |
| NW-STD-002 | Standards Registry Standard | informativ |
| NW-STD-010 | Versioning Standard | informativ (geplant) |
| NW-STD-014 | Lifecycle Standard | informativ (geplant) |

---

## Geltungsbereich

Dieser Standard gilt für alle Datenmodelle, Datenstrukturen und Datenhaltungskonzepte innerhalb des NeuroWays-Ökosystems.

Er gilt plattformunabhängig für:
- STRATO (aktuelle Entwicklungsplattform)
- Oracle APEX
- Relationale Datenbanken (PostgreSQL, Oracle, MySQL, SQLite)
- Dokumentdatenbanken (MongoDB, Firestore)
- JSON-basierte Datenhaltung
- Zukünftige Plattformen

Er regelt Architekturprinzipien, Integritätsregeln, Versionierungskonzepte und Migrationsregeln. Er regelt nicht die konkrete technische Implementierung in einer bestimmten Plattform — das ist Aufgabe plattformspezifischer Implementierungsdokumente.

---

## Offene Punkte

| Punkt | Beschreibung | Vorgesehen in |
|-------|-------------|---------------|
| Konkrete Feldtypen | Typsystem pro Plattform (varchar, uuid, jsonb) | Plattform-Implementierungsdokumente |
| Indexierungsregeln | Welche Felder werden indexiert | Ergänzung NW-STD-003 v1.1.0 |
| Datenschutz und DSGVO | Felder mit personenbezogenen Daten | NW-STD-080 (Security Standard) |
| Mehrmandantenfähigkeit | Datenmodell für Organisationen | NW-STD-003 v1.1.0 |

---

## Kapitel 1 — Grundprinzipien

### 1.1 Daten vor Darstellung

Datenstrukturen werden unabhängig von ihrer späteren Darstellung definiert. Ein Feld existiert, weil es fachlich notwendig ist — nicht weil eine Maske es braucht. Die Darstellung folgt dem Datenmodell, nicht umgekehrt.

### 1.2 Fachmodell vor Implementierung

Bevor eine Tabelle, Collection oder ein Schema angelegt wird, existiert ein fachliches Modell. Das fachliche Modell beschreibt Objekte, ihre Eigenschaften und ihre Beziehungen in der Sprache der Fachdomäne — unabhängig von Datenbanktechnologie. Die technische Implementierung übersetzt dieses Modell in die gewählte Plattform.

### 1.3 Ein Objekt besitzt genau eine Wahrheit

Jedes fachliche Objekt hat genau eine maßgebliche Datenquelle. Wenn dieselbe Information an mehreren Stellen gespeichert wird, entsteht zwangsläufig Inkonsistenz. Redundanz ist nur erlaubt, wenn sie bewusst entschieden, dokumentiert und durch einen Synchronisationsmechanismus kontrolliert wird.

### 1.4 Wiederverwendung vor Duplikation

Gemeinsame Eigenschaften werden in gemeinsamen Basismodellen definiert. Jede neue Entität, die ähnliche Eigenschaften hat wie eine bestehende, prüft zuerst, ob sie spezialisieren, erweitern oder referenzieren kann — bevor sie eigenständige Felder anlegt.

### 1.5 Plattformunabhängigkeit

Fachliche Datenmodelle sind in keiner Sprache einer konkreten Plattform definiert. Sie beschreiben Entitäten, Attribute und Beziehungen in neutraler Form. Die Überführung in SQL, JSON-Schema, PocketBase-Collections oder andere Formate ist eine technische Übersetzungsaufgabe.

### 1.6 Historisierung statt Informationsverlust

Daten werden nicht einfach gelöscht oder überschrieben, wenn sie sich ändern. Stattdessen wird der frühere Zustand aufbewahrt — entweder durch Versionierung, durch Statusübergänge oder durch ein separates Historienmodell. Informationsverlust ist ein Fehler, kein Feature.

### 1.7 Explizitheit über Implizitheit

Jedes Feld, jede Beziehung und jede Regel wird explizit modelliert. Implizite Annahmen — "das weiß jeder" — sind verboten. Was nicht im Modell steht, existiert für das System nicht.

### 1.8 Trennung fachlicher und technischer Felder

Fachliche Felder beschreiben das, was ein Objekt bedeutet. Technische Felder (id, created_at, updated_at) beschreiben, wie es verwaltet wird. Beide existieren, aber sie werden konzeptionell getrennt.

---

## Kapitel 2 — Datenobjekte

NeuroWays unterscheidet sieben Arten von Datenobjekten. Jede Art hat andere Eigenschaften, andere Lebenszyklen und andere Integritätsanforderungen.

### 2.1 Master Data (Stammdaten)

Beschreibung: Kernentitäten des Systems, die langfristig stabil sind und von anderen Objekten referenziert werden.

Eigenschaften:
- Lange Lebensdauer
- Geringe Änderungsfrequenz
- Werden von Transaction Data referenziert
- Haben eindeutige Business Codes
- Sind versionierbar

Beispiele: Methoden, Regionen der Welt, Designtokens, Benutzerprofile

Besondere Regeln:
- Löschen ist nicht erlaubt — stattdessen Archivierung
- Änderungen erzeugen neue Versionen
- Business Codes sind dauerhaft stabil

### 2.2 Reference Data (Referenzdaten)

Beschreibung: Wertelisten und Klassifikationen, die zur Kategorisierung anderer Objekte dienen.

Eigenschaften:
- Sehr geringe Änderungsfrequenz
- Systemweit gültig
- Keine fachliche Verarbeitungslogik
- Oft als Statuswerte, Typen oder Kategorien

Beispiele: Statuswerte (draft, published, archived), Asset-Typen, Zonen-Codes

Besondere Regeln:
- Änderungen haben systemweite Auswirkungen — immer mit Folgenabschätzung
- Neue Werte können ergänzt werden, bestehende Werte werden niemals geändert

### 2.3 Transaction Data (Transaktionsdaten)

Beschreibung: Daten, die durch Aktionen von Benutzern oder Systemen entstehen. Sie dokumentieren, was wann passiert ist.

Eigenschaften:
- Hohe Entstehungsfrequenz
- Historisch und unveränderlich nach Abschluss
- Referenzieren Master Data zum Entstehungszeitpunkt
- Enthalten Zeitstempel

Beispiele: Check-ins, Checkin-Antworten, Audit-Logs

Besondere Regeln:
- Abgeschlossene Transaktionsdaten sind unveränderlich
- Master Data-Werte zum Zeitpunkt der Transaktion werden mitgespeichert (Snapshot), nicht nur referenziert

### 2.4 Configuration Data (Konfigurationsdaten)

Beschreibung: Systemeinstellungen, Feature-Flags und Betriebsparameter.

Eigenschaften:
- Geringe Menge
- Technische, keine fachliche Bedeutung
- Änderbar durch autorisierte Personen
- Wirken systemweit

Beispiele: Feature Flags, Systemparameter, Schwellenwerte

Besondere Regeln:
- Jede Änderung wird protokolliert (Audit)
- Niemals fachliche Daten in Konfiguration speichern

### 2.5 Metadata (Metadaten)

Beschreibung: Daten über Daten. Beschreiben Eigenschaften anderer Objekte ohne deren fachlichen Kern zu sein.

Eigenschaften:
- Erweiterbar durch Schlüssel-Wert-Paare
- Keine eigene fachliche Identität
- Immer abhängig vom beschriebenen Objekt

Beispiele: Asset-Metadaten (Generierungsmodell, Prompt, Seed), Dokumentmetadaten

Besondere Regeln:
- Metadaten ohne Bezugsobjekt sind ungültig
- Schlüssel innerhalb eines Bezugsobjekts sind eindeutig

### 2.6 Audit Data (Protokolldaten)

Beschreibung: Unveränderliche Aufzeichnungen aller relevanten Systemereignisse.

Eigenschaften:
- Ausschließlich anhängend (append-only)
- Niemals änderbar oder löschbar
- Enthalten Zeitstempel, handelnde Person und vorherigen Zustand

Beispiele: Statusänderungen, Löschereignisse, Zugriffsversuche

Besondere Regeln:
- Audit Data darf niemals durch Anwendungslogik gelöscht werden
- Zugriff nur lesend, nie schreibend durch reguläre Anwendung

### 2.7 Temporary Data (Temporäre Daten)

Beschreibung: Kurzlebige Arbeitsdaten, die nicht dauerhaft gespeichert werden sollen.

Eigenschaften:
- Klar definierte Lebensdauer
- Kein fachlicher Wert nach Ablauf
- Niemals als Grundlage für Entscheidungen oder Berechnungen

Beispiele: Sitzungstoken, Zwischenzustände von Formularen (clientseitig), Caches

Besondere Regeln:
- Temporary Data gehört nicht in das fachliche Datenmodell
- Temporäre Daten werden niemals mit dauerhaften Daten vermischt

---

## Kapitel 3 — Objektidentität

Jedes fachliche Objekt im NeuroWays-System hat eine eindeutige, stabile Identität. Diese Identität besteht aus mehreren Schichten.

### 3.1 Interne ID

Die interne ID ist der technische Primärschlüssel. Sie wird vom System automatisch vergeben und ist für Menschen nicht bedeutungstragend.

Eigenschaften:
- Eindeutig innerhalb der Entität
- Unveränderlich nach Erstellung
- Nicht von außen manipulierbar
- Format: UUID oder datenbankspezifischer Typ

Regel: Die interne ID wird niemals in fachlichen Namen, URLs oder Benutzeroberflächen sichtbar, wenn ein Business Code existiert.

### 3.2 Business Code

Der Business Code ist der fachliche Bezeichner eines Objekts. Er ist stabil über alle Versionen und alle Plattformen.

Eigenschaften:
- Von Menschen lesbar
- Eindeutig innerhalb des fachlichen Bereichs
- Ändert sich niemals — auch nicht bei Versionswechsel
- Folgt NW-STD-001

Beispiele: `ENERGY_NAVIGATOR`, `WORLD_FESTLAND`, `ICON_ZONE_MOUNTAIN`

Regel: Wenn ein Objekt archiviert und durch ein neues ersetzt wird, erhält das neue Objekt einen neuen Business Code. Der alte Business Code bleibt dauerhaft dem archivierten Objekt zugeordnet.

### 3.3 Version

Die Version unterscheidet verschiedene Zustände desselben Objekts über die Zeit.

Eigenschaften:
- Format: Semver (MAJOR.MINOR.PATCH)
- Objekte mit gleichen Business Codes aber unterschiedlichen Versionen sind dieselbe fachliche Identität in unterschiedlichen Zuständen
- Neue Versionen erzeugen keine neue fachliche Identität

Wichtige Unterscheidung:
- `ENERGY_NAVIGATOR v1.0.0` und `ENERGY_NAVIGATOR v1.1.0` sind dasselbe Objekt — die Methode Energy Navigator — in unterschiedlichen Zuständen.
- Ein neues Objekt `ENERGY_NAVIGATOR_PLUS` wäre eine neue fachliche Identität.

### 3.4 Status

Der Status beschreibt den aktuellen Lebenszyklusstatus eines Objekts. Er ist kein inhaltliches Merkmal, sondern ein Verwaltungsmerkmal.

Standard-Statuswerte: draft, review, published, superseded, archived (gemäß NW-STD-000)

Regel: Der Status eines Objekts ist ein Metadatum, kein Fachattribut. Er darf nicht in fachliche Berechnungen einfließen.

### 3.5 Owner

Jedes Objekt hat genau einen Eigentümer. Der Eigentümer ist verantwortlich für Korrektheit, Aktualität und Lebenszyklus des Objekts.

Eigenschaften:
- Kann eine Person, ein Team oder eine Organisationseinheit sein
- Kann übertragen werden
- Jede Eigentumsübertragung wird protokolliert

### 3.6 Parent

Objekte können hierarchisch strukturiert sein. Ein Parent-Objekt ist ein übergeordnetes Objekt derselben Entitätsart.

Regeln:
- Zirkuläre Elternbeziehungen sind verboten
- Ein Objekt kann höchstens einen Parent haben
- Das Löschen oder Archivieren eines Parents erfordert eine definierte Behandlung der Kinder (Kaskade, Waise, Blockierung)

### 3.7 Referenzen

Referenzen sind Beziehungen zu anderen Objekten. Sie werden in Kapitel 4 ausführlich behandelt.

Grundregel: Eine Referenz auf ein archiviertes oder nicht existierendes Objekt ist eine Integritätsverletzung.

### 3.8 Identitätsprinzip

Ein Objekt besitzt genau eine Identität. Diese Identität ist:
- die Kombination aus Business Code + fachlichem Bereich
- stabil über alle Versionen
- stabil über alle Plattformen
- stabil über alle Statuswechsel

Was sich ändert: Version, Status, Inhalte.
Was sich niemals ändert: Business Code, interner Typ, fachlicher Bereich.

---

## Kapitel 4 — Beziehungen

### 4.1 1:1 (Eins-zu-Eins)

Genau ein Objekt A gehört zu genau einem Objekt B.

Verwendung: Wenn zwei Entitäten konzeptionell getrennt, aber immer zusammen sind.

Beispiel: Ein Check-in hat genau ein Ergebnis-Objekt.

Regeln:
- Prüfen, ob 1:1-Beziehungen nicht sinnvoller als Felder im selben Objekt modelliert werden
- 1:1 ist oft ein Hinweis auf fehlende Normalisierung

### 4.2 1:n (Eins-zu-Viele)

Ein Objekt A hat viele Objekte B. Jedes B gehört zu genau einem A.

Verwendung: Häufigste Beziehungsart. Beispiel: Eine Methode hat viele Fragen.

Regeln:
- Das "n"-Objekt trägt die Referenz auf das "1"-Objekt
- Das "1"-Objekt kennt seine Kinder nicht direkt (keine eingebetteten ID-Listen)

### 4.3 n:m (Viele-zu-Viele)

Viele Objekte A können mit vielen Objekten B verbunden sein.

Verwendung: Wenn die Beziehung selbst Eigenschaften hat oder wenn A und B unabhängig voneinander existieren.

Regeln:
- Immer über eine Verknüpfungsentität (Junction Entity) modelliert
- Die Verknüpfungsentität kann eigene Felder haben (z.B. Reihenfolge, Gültigkeitszeitraum)
- Beispiel: `AST_ASSET_ASSIGNMENTS` verknüpft Assets mit Regionen

### 4.4 Hierarchien

Objekte derselben Entität in einer Eltern-Kind-Struktur.

Regeln:
- Tiefe begrenzen (maximal 5 Ebenen empfohlen)
- Zirkuläre Strukturen sind verboten und müssen beim Schreiben geprüft werden
- Löschen eines Elternknotens: Verhalten der Kinder muss explizit definiert sein

### 4.5 Abhängigkeiten

Objekt B kann ohne Objekt A nicht existieren oder verliert seine Bedeutung.

Unterschied zu Referenzen: Eine Referenz ist lose — das referenzierte Objekt existiert unabhängig. Eine Abhängigkeit ist existenziell — ohne das übergeordnete Objekt verliert das abhängige seinen Sinn.

Beispiel: Eine Checkin-Antwort ohne zugehörigen Check-in ist bedeutungslos.

Regeln:
- Existenzielle Abhängigkeiten müssen bei Archivierung oder Löschung behandelt werden
- Kaskadierende Operationen müssen explizit dokumentiert sein

### 4.6 Optionale Beziehungen

Eine Beziehung, die vorhanden sein kann, aber nicht muss.

Kennzeichnung im Modell: 0..1 oder 0..n

Regeln:
- Optionale Referenzfelder enthalten null/leer, wenn keine Beziehung besteht
- Die Abwesenheit einer optionalen Beziehung ist kein Fehler

### 4.7 Pflichtbeziehungen

Eine Beziehung, die immer vorhanden sein muss.

Kennzeichnung im Modell: 1..1 oder 1..n

Regeln:
- Das abhängige Objekt kann ohne das übergeordnete nicht angelegt werden
- Löschen des übergeordneten Objekts muss die Pflichtbeziehung auflösen oder kaskadierende Archivierung auslösen

### 4.8 Vererbung

Wenn mehrere Entitäten gemeinsame Attribute haben, werden diese in einer Basisentität zusammengefasst.

Modellierungsansätze:
- Einzeltabelle (alle Typen in einer Tabelle, leere Felder für nicht zutreffende Typen)
- Separate Tabellen mit gemeinsamer Basistabelle
- Einbettung gemeinsamer Felder (ohne formale Vererbung)

Regeln:
- Vererbung ist ein Modellierungsprinzip, kein technisches Konstrukt
- Die gewählte Implementierung wird dokumentiert

### 4.9 Zirkuläre Beziehungen

Objekt A referenziert B, B referenziert C, C referenziert A.

Zirkuläre Beziehungen in normativen Abhängigkeiten sind verboten.

Ausnahme: Selbstreferenzen (ein Objekt referenziert eine frühere Version von sich selbst) sind erlaubt und explizit zu dokumentieren.

Beispiel erlaubt: `asset_versions.superseded_by_id` → anderer Datensatz in `asset_versions`

### 4.10 Regeln für Referenzen

- Eine Referenz zeigt immer auf ein existierendes Objekt
- Referenzen auf archivierte Objekte bleiben gültig (historischer Bezug)
- Referenzen auf gelöschte Objekte sind Integritätsverletzungen
- Alle Referenzen werden vor dem Schreiben geprüft (Kapitel 11)

---

## Kapitel 5 — Datenintegrität

### 5.1 Eindeutigkeit

Objekte, die denselben fachlichen Sachverhalt repräsentieren, dürfen nicht mehrfach existieren.

Eindeutigkeitsprüfungen erfolgen auf zwei Ebenen:

**Technische Eindeutigkeit:** Primärschlüssel (interne ID) sind systemseitig immer eindeutig.

**Fachliche Eindeutigkeit:** Business Codes, Versionskombinationen und andere fachliche Identifikationsmerkmale müssen eindeutig sein. Diese Prüfung erfolgt entweder durch Datenbankconstraints (bevorzugt) oder durch Anwendungslogik (wenn Constraints nicht verfügbar).

### 5.2 Referenzielle Integrität

Eine Referenz auf ein Objekt setzt dessen Existenz voraus.

Regeln:
- Bevor ein Objekt angelegt wird, müssen alle referenzierten Objekte existieren
- Das Löschen eines referenzierten Objekts erfordert eine definierte Behandlung (blockieren, kaskadieren, auf null setzen)
- Soft-Delete (Status-Archivierung) ist bevorzugt gegenüber Hard-Delete

### 5.3 Pflichtfelder

Felder, ohne die ein Objekt keine vollständige fachliche Bedeutung hat, sind Pflichtfelder.

Regeln:
- Pflichtfelder dürfen keine leeren Werte enthalten
- Die Unterscheidung zwischen "nicht gesetzt" (null) und "leer" (Leerstring) muss pro Feld definiert sein
- Pflichtfelder werden im Modell explizit markiert

### 5.4 Wertebereiche

Felder mit eingeschränkten Wertebereichen werden durch explizite Wertelisten definiert.

Regeln:
- Statusfelder akzeptieren nur definierte Statuswerte
- Typfelder akzeptieren nur definierte Typen
- Numerische Felder haben dokumentierte Minimal- und Maximalwerte
- Datumsfelder haben dokumentierte Formate (ISO 8601)

### 5.5 Historisierung

Wenn ein Objekt seinen Zustand ändert, wird der vorherige Zustand aufbewahrt.

Historisierungsstrategien:
- **Versionierung:** Neue Version des Objekts anlegen, alte Version mit Status `superseded` behalten
- **Auditprotokoll:** Änderungen in separater Audit-Tabelle protokollieren
- **Snapshot:** Zum Zeitpunkt einer Transaktion werden relevante Werte kopiert

Regeln:
- Die gewählte Strategie wird pro Entitätstyp dokumentiert
- Historische Daten werden niemals überschrieben

### 5.6 Archivierung

Objekte werden archiviert statt gelöscht.

Regeln:
- Archivierte Objekte erhalten Status `archived`
- Archivierte Objekte sind lesbar, aber nicht mehr änderbar
- Alle Referenzen auf archivierte Objekte bleiben gültig
- Archivierung ist unumkehrbar

### 5.7 Immutabilität

Bestimmte Objekte oder Felder sind nach Veröffentlichung unveränderlich.

Regeln:
- Fachliche Felder veröffentlichter Objekte dürfen nicht überschrieben werden
- Verwaltungsfelder (Status, superseded_at) dürfen kontrolliert geändert werden
- Immutable-Entscheidungen werden im Modell dokumentiert

### 5.8 Plattformabhängige vs. plattformunabhängige Integrität

**Plattformunabhängige Integrität** (immer gültig, unabhängig von Datenbanktechnologie):
- Eindeutigkeit durch Anwendungslogik geprüft
- Referenzprüfungen durch Anwendungslogik
- Validierung vor dem Schreiben

**Plattformabhängige Integrität** (wenn die Plattform es unterstützt):
- Unique Constraints auf Datenbankebene
- Foreign Key Constraints
- Check Constraints für Wertebereiche
- Transaktionssicherheit (ACID)

**Beispiel: Plattform ohne native Constraints**
Wenn eine eingesetzte Plattform keine nativen Foreign Key Constraints oder Unique Constraints auf Kombinationsebene unterstützt, übernimmt die Anwendungslogik alle Referenzprüfungen vor jedem Schreibvorgang. Diese Prüfungen sind in einer plattformspezifischen Validierungs-Engine zu implementieren und zu dokumentieren. Plattformabhängige Integrität wird damit zu einem Anwendungsverantwortungsbereich.

Beim Wechsel auf eine Plattform mit vollem Constraint-Support können diese Prüfungen auf Datenbankebene verlagert werden — die fachliche Regel bleibt dieselbe.

---

## Kapitel 6 — Lebenszyklus

Der Lebenszyklus von Datenobjekten folgt einem definierten Muster. Die Details werden im Lifecycle Standard (NW-STD-014) geregelt. Dieses Kapitel beschreibt die datenbankspezifischen Aspekte.

### 6.1 Erzeugen

Ein Objekt entsteht, wenn alle Pflichtfelder gesetzt sind und alle Referenzen geprüft wurden. Beim Erzeugen werden automatisch gesetzt:
- `created_at` (Zeitstempel)
- `created_by` (handelnde Person, sofern verfügbar)
- Status: `draft` (Standardwert, wenn nicht explizit angegeben)

### 6.2 Ändern

Änderungen an Objekten werden protokolliert. Bei versionierten Objekten entsteht eine neue Version. `updated_at` wird bei jeder Änderung aktualisiert.

Regel: Fachliche Inhalte veröffentlichter Objekte dürfen nicht geändert werden — nur Verwaltungsfelder.

### 6.3 Freigeben

Das Freigeben eines Objekts setzt Status auf `published` und setzt `published_at`. Nach Freigabe sind fachliche Felder immutabel.

### 6.4 Ersetzen

Ein veröffentlichtes Objekt wird durch eine neue Version ersetzt. Das alte Objekt erhält Status `superseded` und das Feld `superseded_by_id`. Das neue Objekt enthält denselben Business Code.

### 6.5 Archivieren

Archivierung ist die dauerhafte Deaktivierung ohne Datenverlust. `archived_at` wird gesetzt. Der Eintrag bleibt lesbar.

### 6.6 Löschen

Hard-Delete (dauerhaftes Entfernen aus der Datenbank) ist nur für Temporary Data erlaubt. Für alle anderen Datenobjekttypen gilt: Archivierung statt Löschen.

Wenn die Plattform Hard-Delete technisch nicht vollständig verhindert, übernimmt die Anwendungslogik diese Kontrolle.

**Verweis:** Vollständige Lebenszyklusregeln → NW-STD-014.

---

## Kapitel 7 — Versionierung

### 7.1 Objektversion

Eine Objektversion unterscheidet Zustände desselben fachlichen Objekts über die Zeit. Jede Version ist ein eigenständiger Datensatz, der auf den Business Code des Objekts verweist.

Felder jeder Objektversion:
- `code` (Business Code — gleich für alle Versionen)
- `version` (Semver — unterscheidet die Versionen)
- `status`
- Fachliche Felder

### 7.2 Dokumentversion

Dokumente (Standards, Beschreibungen) werden nach denselben Semver-Regeln versioniert wie Objekte. Die Dokumentversion ist im Dokumentkopf eingetragen und im Registry registriert.

### 7.3 Assetversion

Assets (Illustrationen, Icons, Animationen) werden über `asset_versions` verwaltet. Jede veröffentlichte Dateiversion ist unveränderlich. Neue Dateiversionen entstehen durch neue Datensätze.

### 7.4 Methodenversion

Methoden (wie der Energy Navigator) tragen eine eigene Versionsnummer. Wenn sich Fragen, Antwortoptionen oder Ergebnisregeln einer Methode ändern, entsteht eine neue Methodenversion. Historische Check-ins speichern die Methodenversion zum Zeitpunkt ihrer Erstellung.

Beispiel: Check-in vom 2026-07-23 wurde mit Methodenversion `1.0.0` erstellt. Nach Erweiterung auf 6 Fragen gilt `1.1.0`. Der historische Check-in bleibt `1.0.0` zugeordnet.

### 7.5 Standardversion

Standards werden nach NW-STD-000 Kapitel 6 und dem späteren NW-STD-010 versioniert.

**Verweis:** Detailregeln zur Semver-Verwendung → NW-STD-010.

---

## Kapitel 8 — Datenmodellierung

### 8.1 Normalisierung

Normalisierung eliminiert Redundanz und Anomalien. NeuroWays-Modelle streben 3. Normalform (3NF) an:

- 1NF: Jede Spalte enthält atomare Werte. Keine Wiederholungsgruppen.
- 2NF: Alle Nicht-Schlüsselfelder hängen vollständig vom Primärschlüssel ab.
- 3NF: Keine transitiven Abhängigkeiten zwischen Nicht-Schlüsselfeldern.

Ausnahmen von 3NF sind erlaubt, wenn sie explizit dokumentiert und fachlich begründet sind (z.B. Performance, Plattformbeschränkungen).

### 8.2 Denormalisierung

Denormalisierung ist das bewusste Einführen von Redundanz aus Performance- oder Praktikabilitätsgründen.

Regeln:
- Denormalisierung ist immer explizit dokumentiert
- Redundante Daten werden durch einen definierten Mechanismus synchronisiert
- Die ursprüngliche normalisierte Quelle der Wahrheit wird immer angegeben

Beispiel: `checkins.result_label` speichert den Zonenbezeichner direkt, obwohl er aus `result_rules` geladen werden könnte. Das ist bewusste Denormalisierung für Unveränderlichkeit der Transaktionsdaten.

### 8.3 Modularisierung

Das Datenmodell ist in fachliche Domänen unterteilt. Jede Domäne hat klare Grenzen.

NeuroWays-Domänen:
- World & Design (`DSN_*`)
- Assets (`AST_*`)
- Methoden & Check-ins (`MTH_*`, `CHK_*`)
- Standards (`STD_*`)
- Benutzer & Organisationen (`USR_*`, `ORG_*`)
- System & Konfiguration (`SYS_*`, `CFG_*`)

### 8.4 Domänengrenzen

Domänen kommunizieren ausschließlich über definierte Schnittstellen — in der Datenbank sind das Referenzfelder.

Regeln:
- Keine Entität aus Domäne A enthält direkte Felder aus Domäne B
- Beziehungen zwischen Domänen verlaufen über IDs und Codes, nicht über eingebettete Objekte
- Jede domänenübergreifende Abhängigkeit wird dokumentiert

### 8.5 Ownership

Jede Entität gehört zu genau einer Domäne. Die Domäne ist Eigentümer der Entität und verantwortet ihr Schema, ihre Validierungsregeln und ihren Lebenszyklus.

### 8.6 Wiederverwendung

Bevor eine neue Entität modelliert wird, wird geprüft:
- Gibt es eine bestehende Entität, die denselben Zweck erfüllt?
- Gibt es eine bestehende Entität, die durch Spezialisierung erweitert werden kann?
- Gibt es ein Basismodell, das gemeinsame Felder bereits definiert?

### 8.7 Gemeinsame Basismodelle

NeuroWays definiert folgende Basismodelle, die von mehreren Entitäten verwendet werden:

**Versioniertes Objekt:** code, version, status, created_at, updated_at, published_at, archived_at, superseded_at, superseded_by_id

**Sortiertes Objekt:** sort_order (immer number, immer optional)

**Benanntes Objekt:** code, title, description, label

**Zuordnungs-Objekt:** source_id, target_id, target_type, usage_type, is_primary, valid_from, valid_to

---

## Kapitel 9 — Plattformen

### 9.1 Relationale Datenbanken (PostgreSQL, Oracle, MySQL, SQLite)

**Stärken:**
- Vollständige ACID-Transaktionen
- Native Unique Constraints und Foreign Keys
- Komplexe Abfragen über SQL
- Starke Normalisierung möglich
- Etablierte Migrations-Tools

**Schwächen:**
- Schema muss vorab definiert werden (Schemarigidität)
- Schemaänderungen erfordern Migrationen
- Horizontale Skalierung aufwändig

**NeuroWays-Eignung:** Sehr hoch. Alle NeuroWays-Integritätsanforderungen werden nativ unterstützt.

### 9.2 Dokumentdatenbanken (MongoDB, Firestore)

**Stärken:**
- Flexible Schemata
- Eingebettete Objekte ohne Joins
- Horizontale Skalierung einfacher
- Gut für hierarchische Daten

**Schwächen:**
- Keine nativen Foreign Keys
- Referenzielle Integrität muss in der Anwendung sichergestellt werden
- n:m-Beziehungen umständlich
- Transaktionssupport eingeschränkt (je nach System)

**NeuroWays-Eignung:** Mittel. Integritätsanforderungen müssen vollständig in der Anwendung übernommen werden.

### 9.3 STRATO (aktuelle Entwicklungsplattform)

**Stärken:**
- Schnelle Einrichtung
- Integrierte API
- Einfache Felddefinition
- Für Prototypen sehr gut geeignet

**Schwächen:**
- Keine nativen Foreign Keys oder Unique Constraints
- Eingeschränkte Abfragesprache
- Hard-Delete API-Verhalten ist plattformspezifisch (bekannte Quirks)
- Keine nativen Transaktionen

**NeuroWays-Eignung:** Ausreichend für MVP und Entwicklung. Alle Integritätsanforderungen werden durch Anwendungslogik (Validierungs-Engine) übernommen. Für Produktion mit hohem Datenvolumen oder strenger Compliance sind relationale Datenbanken zu bevorzugen.

### 9.4 Oracle APEX

**Stärken:**
- Vollständige Oracle-Datenbankunterstützung (alle Constraints, ACID)
- Integriertes Low-Code-UI für Verwaltungsinterfaces
- Starke Reporting-Features
- Geeignet für Registry, Audit und Administration

**Schwächen:**
- Höherer Einrichtungsaufwand
- Oracle-Lizenzierungskosten
- Weniger flexibel für schnelle Iteration

**NeuroWays-Eignung:** Hoch für Verwaltungssysteme (Registry, Standards-Governance, Audit). Weniger geeignet als primäre Anwendungsplattform für das Energy Navigator Frontend.

### 9.5 JSON (als Datenaustauschformat)

JSON ist kein Datenbanksystem, sondern ein Austauschformat. Es ist geeignet für:
- Export und Import von Daten
- Konfigurationsdaten
- API-Payloads
- Schnappschüsse für Historisierung

JSON-Dokumente folgen denselben Namenskonventionen wie Datenbankfelder (camelCase in APIs, snake_case in Datenbanken gemäß NW-STD-001).

---

## Kapitel 10 — Migration

### 10.1 Migration

Eine Migration ist eine geplante, rückwärtskompatible oder bewusst inkompatible Änderung an einem Datenbankschema.

Migrationsarten:
- **Additive Migration:** Neue Felder oder Tabellen werden hinzugefügt. Bestehende Daten bleiben unverändert. Rückwärtskompatibel.
- **Destruktive Migration:** Felder oder Tabellen werden entfernt oder umbenannt. Erfordert vollständige Datenmigration und Versionswechsel.
- **Datenmigration:** Bestehende Daten werden in ein neues Format überführt, ohne das Schema zu ändern.

Regeln:
- Jede Migration wird vor Ausführung dokumentiert
- Migrationen sind testbar auf einem Nicht-Produktionssystem
- Rollback-Plan existiert vor jeder destruktiven Migration

### 10.2 Import

Import ist das Einlesen externer Daten in das NeuroWays-System.

Regeln:
- Importierte Daten durchlaufen dieselben Validierungsregeln wie manuell angelegte Daten
- Business Codes werden beim Import geprüft (Duplikate abgelehnt)
- Importprotokolle werden als Audit Data gespeichert

### 10.3 Export

Export ist das Ausgeben von NeuroWays-Daten in ein externes Format.

Regeln:
- Exports enthalten immer den Zeitstempel des Exports
- Exports enthalten Versionsinformationen der exportierten Objekte
- Sensitive Daten werden beim Export gekennzeichnet oder ausgeschlossen

### 10.4 Synchronisation

Synchronisation ist der Abgleich zwischen zwei Datenhaltungssystemen (z.B. Entwicklung und Produktion).

Regeln:
- Schemas werden vor Daten synchronisiert
- Produktive Daten werden nicht durch Entwicklungsdaten überschrieben
- Historische Daten und Audit Data werden niemals gelöscht bei Synchronisation

### 10.5 Rollback

Ein Rollback setzt eine Schemaänderung oder Datenmigration auf den vorherigen Zustand zurück.

Regeln:
- Rollback-Pläne werden vor jeder MAJOR-Migration erstellt
- Additive Migrationen können durch Entfernen der hinzugefügten Elemente zurückgesetzt werden
- Destruktive Migrationen erfordern ein Backup vor der Ausführung

### 10.6 Schemaänderungen

Schemaänderungen folgen dem MAJOR/MINOR/PATCH-Prinzip:
- **Additiv (MINOR):** Neues Feld, neue Tabelle — rückwärtskompatibel
- **Ändernd (MAJOR):** Feldtyp geändert, Feld umbenannt — erfordert Migration
- **Entfernend (MAJOR):** Feld oder Tabelle entfernt — erfordert Migration und Datenmigration

---

## Kapitel 11 — Validierung

### 11.1 Fachliche Validierung

Prüft, ob die eingegebenen Daten fachlich korrekt sind — unabhängig von technischen Constraints.

Beispiele:
- Ist der eingegebene Status ein gültiger Wert?
- Ist die referenzierte Methoden-ID vorhanden?
- Ist die Versionsnummer im Semver-Format?

Verantwortung: Anwendungslogik (immer, plattformunabhängig).

### 11.2 Technische Validierung

Prüft, ob die Daten technisch korrekt gespeichert werden können.

Beispiele:
- Ist der Wert zu lang für das Feld?
- Ist der Typ korrekt (Zahl statt Text)?
- Ist ein Pflichtfeld leer?

Verantwortung: Datenbankebene (wenn Constraints verfügbar) und Anwendungslogik.

### 11.3 UI-Validierung

Prüfung im Frontend, bevor Daten an den Server gesendet werden.

Regeln:
- UI-Validierung ist eine Benutzerfreundlichkeitsmaßnahme, keine Sicherheitsmaßnahme
- UI-Validierung darf nie die einzige Validierungsebene sein
- Server-seitige Validierung ist immer zusätzlich vorhanden

### 11.4 Servervalidierung

Prüfung auf dem Server, bevor Daten in die Datenbank geschrieben werden.

Regeln:
- Servervalidierung ist obligatorisch
- Alle fachlichen Regeln werden serverseitig geprüft
- Fehler werden mit konkreten, verständlichen Fehlermeldungen zurückgegeben

### 11.5 Integritätsprüfungen

Prüfung der referenziellen Integrität und Eindeutigkeit.

Warum Integrität auf Datenbankebene:
- Datenbankconstraints sind atomar — sie können nicht durch Anwendungsfehler umgangen werden
- Bei parallelen Zugriffen sind datenbankbasierte Constraints die einzige sichere Schicht
- Transaktionssicherheit garantiert Konsistenz auch bei Fehlern

Wann eine Validierungs-Engine notwendig ist:
- Wenn die eingesetzte Plattform keine nativen Datenbankconstraints unterstützt
- Wenn Validierungslogik über mehrere Entitäten hinweg notwendig ist
- Wenn fachliche Regeln zu komplex für einfache Constraints sind

**Beispiel: Plattform ohne native Constraints**
Wenn eine Plattform keine Foreign Key Constraints und keine Unique Constraints auf Kombinationsebene unterstützt, übernimmt eine Validierungs-Engine in der Anwendungslogik folgende Prüfungen:
- Prüfung der Existenz referenzierter Objekte vor jedem Schreibvorgang
- Prüfung der Eindeutigkeit fachlicher Schlüsselkombinationen
- Prüfung der Immutabilität veröffentlichter Objekte
- Prüfung projektspezifischer Zusatzregeln

Diese Prüfungen liegen in der Anwendungslogik und nicht in der Datenbank — das ist eine bekannte Schwachstelle, die beim Wechsel auf eine Plattform mit nativem Constraint-Support behoben werden kann. Konkrete Implementierungsdateien werden in plattformspezifischen Implementierungsdokumenten beschrieben, nicht in diesem Standard.

---

## Kapitel 12 — Beispiele

### 12.1 Gute Datenmodelle (✅)

| Beispiel | Begründung |
|---------|-----------|
| `CHK_CHECKINS` hat `method_version` — speichert die Methodenversion zum Check-in-Zeitpunkt | Korrekte Historisierung — Transaction Data speichert Snapshot |
| `AST_ASSET_VERSIONS.superseded_by_id` referenziert denselben Typ (Selbstreferenz) | Dokumentierte Ausnahme für Ablösebeziehung |
| `DSN_WORLD_REGIONS` speichert keine direkten HEX-Werte, sondern Token-Namen | Single Source of Truth für Farbwerte in `DSN_DESIGN_TOKENS` |
| `CHK_CHECKIN_ANSWERS` speichert `numeric_value` direkt | Snapshot-Denormalisierung — auch wenn Option gelöscht wird, bleibt der Wert erhalten |
| `AST_ASSET_ASSIGNMENTS` als Junction Entity für n:m zwischen Assets und Regionen | Korrekte n:m-Modellierung mit eigenem Payload (is_primary, valid_from) |
| Business Code `ENERGY_NAVIGATOR` bleibt in v1.0.0 und v1.1.0 gleich | Stabile fachliche Identität über Versionen |
| `result_rules` werden pro `method_id` geladen — nicht global | Klare Domänenzugehörigkeit |
| Archivierte Check-ins bleiben mit ursprünglichem `result_code` erhalten | Historisierung statt Überschreiben |
| `asset_metadata` als Key-Value-Erweiterung statt direkter Felder | Erweiterbarkeit ohne Schemaänderung |
| `world_versions.superseded_by_id` als leerer String statt null | Plattformbedingte Abweichung dokumentiert |

### 12.2 Schlechte Datenmodelle (❌)

| Beispiel | Fehler | Korrekt |
|---------|--------|---------|
| `checkins.answer_1`, `checkins.answer_2`, ... `checkins.answer_5` | Nicht normalisiert, nicht skalierbar | Separate `checkin_answers`-Entität mit 1:n |
| `result_rules` enthält direkt den Hex-Farbwert und `world_regions` auch | Redundanz — zwei Quellen der Wahrheit | Farbwert nur in Design Tokens |
| `methods`-Feld `questions_json` mit eingebetteten Fragen als JSON-String | Keine Abfragbarkeit, keine Integrität | Separate `questions`-Entität |
| Statusfeld `active` als boolean | Kein Zustandsmodell, keine Übergänge | Statuswert `published`, `draft` etc. |
| Check-in löschen statt archivieren | Informationsverlust | Status `archived`, Daten bleiben |
| `method_id` in `checkins` zeigt auf gelöschte Methode | Referenzielle Integritätsverletzung | Methoden nur archivieren, nie löschen |
| `user_settings` als JSON-String im Benutzerfeld | Nicht abfragbar, nicht validierbar | Separate `user_settings`-Entität |
| `asset_version` als Zahl (1, 2, 3) | Kein Semver, keine Kompatibilitätsaussage | `1.0.0` im Semver-Format |
| Fragen-Texte direkt im Frontend hardcodiert | Keine Datengetriebene Architektur | Fragen aus `MTH_QUESTIONS` laden |
| `tmp_results`-Tabelle in der Produktionsdatenbank | Temporäre Daten in persistenter Schicht | Clientseitig oder mit TTL |

### 12.3 Integritätsverletzungen (❌)

| Beispiel | Art | Konsequenz |
|---------|-----|------------|
| `checkin_answers.question_id` zeigt auf gelöschte Frage | Referenzielle Integrität | Antwort nicht mehr auflösbar |
| Zwei `asset_versions`-Einträge mit code=`WORLD_FESTLAND_ILL` und version=`1.0.0` | Eindeutigkeitsverletzung | Unklare Quelle der Wahrheit |
| `asset_files` mit leerem `file_url` | Pflichtfeldfehler | Datei nicht abrufbar |
| `asset_version` Status `published` → zurück auf `draft` gesetzt | Unzulässiger Statusübergang | Historische Referenzen betroffen |
| `method_version` in neuem Check-in nicht gesetzt | Fehlende Historisierung | Check-in keiner Methodenversion zuordenbar |
| `is_primary = true` für zwei Assignments mit gleichem target+usage | Primary-Regelverletzung | Unklar welches Asset primär ist |
| `design_tokens`-Farbwert nachträglich geändert ohne neue Version | Stille Änderung einer publizierten Version | Regionen referenzieren falschen Wert |
| `asset_prompts.final_prompt` leer bei status=`approved` | Pflichtfeldfehler im falschen Status | Prompt nicht reproduzierbar |
| `world_regions.world_version_id` zeigt auf nicht existente ID | Referenzielle Integritätsverletzung | Region ohne Weltkontext |
| Checkin mit `total_score = 0` bei 6 Pflichtfragen | Fachliche Validierungslücke | Ergebnis nicht korrekt berechnet |

### 12.4 Versionierungen (✅)

| Beispiel | Vorgehen |
|---------|---------|
| Energy Navigator: 5 Fragen v1.0.0 → 6 Fragen v1.1.0 | Neue Methodenversion, bestehende Check-ins behalten `method_version = 1.0.0` |
| Result Rules: Grenzen angepasst für 6-Fragen-Skala | Neue Datensätze mit korrigierten min_score/max_score, keine alten löschen |
| World Design Standard: neue Animationsregel → v1.2.0 | MINOR-Update, neue `world_version_id`, neue Abhängige referenzieren neue ID |
| Asset `WORLD_FESTLAND_ILLUSTRATION` v1.0.0 → v1.1.0 | Neuer `asset_versions`-Datensatz, alter bekommt `status = superseded` |
| NW-STD-001 v1.0.0 → v1.0.1 (Tippfehler) | PATCH, kein inhaltlicher Unterschied, Registry wird aktualisiert |
| `checkins.method_version` backfill auf `1.0.0` | Bestehende Transaktionsdaten erhalten retrospektiv die Version, ohne Berechnung |

### 12.5 Migrationen (✅/❌)

| Beispiel | Art | Beurteilung |
|---------|-----|-------------|
| Neues Feld `method_version` in `checkins` — optional, Standardwert leer | Additive Migration ✅ | Bestehende Daten unberührt |
| Feld `checkin_results` wird entfernt | Destruktive Migration ⚠️ | Backup erforderlich, Rollback-Plan nötig |
| `created` → `created_at` umbenennen | MAJOR-Schemaänderung ❌ ohne Migrationspfad | Migrationsdokument erforderlich |
| Alle bestehenden `checkins` ohne `method_version` auf `1.0.0` setzen | Datenmigration ✅ | Korrekt dokumentiert und ausgeführt |
| Neue Collection `DSN_WORLD_VERSIONS` anlegen | Additive Migration ✅ | Keine bestehenden Daten betroffen |

### 12.6 Ownership (✅/❌)

| Beispiel | Beurteilung |
|---------|-------------|
| `MTH_METHODS` gehört zur Domäne Methoden — Team Methoden ist Owner ✅ | Klare Verantwortung |
| `AST_ASSET_FILES` enthält `description` einer Region direkt ❌ | Domänenverschmutzung — Description gehört in `DSN_WORLD_REGIONS` |
| `CHK_CHECKINS` referenziert `method_id`, aber kopiert keine Methodendaten ✅ | Korrekte Referenz, Snapshot nur für benötigte Werte |
| Zwei Teams ändern dieselbe `result_rules`-Collection ohne Koordination ❌ | Kein klarer Owner — führt zu Konflikten |

### 12.7 Referenzen (✅/❌)

| Beispiel | Beurteilung |
|---------|-------------|
| `asset_assignments.target_id` zeigt auf `world_regions.id` mit `target_type = world_region` ✅ | Korrekte polymorphe Referenz |
| `design_rules.world_version_id` zeigt auf `world_versions.id` ✅ | Saubere 1:n-Referenz |
| Referenz auf ID aus einer anderen Plattform ohne Überprüfung ❌ | Keine Integritätsprüfung möglich |
| `asset_prompts.source_world_version_id` zeigt auf `world_versions.id` ✅ | Korrekte Zweifachreferenz im Prompt |
| `method_id` in `checkin_answers` fehlt — nur `checkin_id` vorhanden ✅ | Korrekt — Methode über Check-in ermittelbar (Normalisierung) |

---

## Kapitel 13 — Roadmap der Modellanwendung

### 13.1 World & Design

**Aktueller Stand:** `DSN_WORLD_VERSIONS`, `DSN_WORLD_REGIONS`, `DSN_DESIGN_TOKENS`, `DSN_DESIGN_RULES`, `DSN_ANIMATION_RULES`, `DSN_ACCESSIBILITY_RULES` sind vorhanden.

**Nächste Schritte nach Freigabe dieses Standards:**
- Felder `created_at` / `updated_at` (statt `created`/`updated`) bei nächster Migration
- Eindeutigkeitsconstraints für `world_version_id + code` in `world_regions`
- Business Codes für alle Regionen als eigene Felder ergänzen

### 13.2 Assets

**Aktueller Stand:** `AST_ASSET_VERSIONS`, `AST_ASSET_FILES`, `AST_ASSET_ASSIGNMENTS`, `AST_ASSET_METADATA`, `AST_ASSET_PROMPTS` angelegt. Validierungs-Engine aktiv.

**Nächste Schritte:**
- Erste produktive Assets nach Freigabe der Illustrationen
- `asset_versions.code` mit Business Code Konvention befüllen

### 13.3 Standards

**Aktueller Stand:** Standards als Markdown-Dokumente. Registry noch nicht als Datenbank.

**Nächste Schritte:**
- `STD_REGISTRY`-Collection nach NW-STD-002 anlegen
- Alle bestehenden Standards eintragen
- Versionshistorie führen

### 13.4 Methoden

**Aktueller Stand:** `MTH_METHODS`, `MTH_QUESTIONS`, `MTH_ANSWER_OPTIONS`, `MTH_RESULT_RULES` produktiv im Energy Navigator.

**Nächste Schritte:**
- Collections nach NW-STD-001 umbenennen (`methods` → `MTH_METHODS`)
- Eindeutigkeitsconstraints für `method_id + code` in `questions`
- Felder `created_at` statt `created` nach nächster Migration

### 13.5 NeuroPlay

**Aktueller Stand:** Noch nicht begonnen.

**Datenmodell-Anforderungen nach diesem Standard:**
- Eigener Domänenpräfix (z.B. `NPL_`)
- Neue Methoden-Entitäten unter `MTH_*` oder eigenem Präfix
- World-Region für NeuroPlay in `DSN_WORLD_REGIONS`
- Keine Änderung an bestehenden Methoden-Collections

### 13.6 NeuroFlow

**Aktueller Stand:** Noch nicht begonnen.

**Datenmodell-Anforderungen:**
- Eigener Domänenpräfix (z.B. `NFL_`)
- Workflow-Entitäten: Schritte, Übergänge, Zustände
- Integration mit `USR_USERS` für Benutzerzustand
- Eigene Result-Regeln analog zu `MTH_RESULT_RULES`

---

## Definitionen

| Begriff | Definition |
|---------|-----------|
| **Entität** | Ein fachliches Objekt mit eigener Identität, das im Datenmodell repräsentiert wird |
| **Attribut** | Eine Eigenschaft einer Entität |
| **Beziehung** | Eine gerichtete oder ungerichtete Verbindung zwischen zwei Entitäten |
| **Business Code** | Stabiler, fachlicher Bezeichner eines Objekts, unabhängig von technischer ID |
| **Normalisierung** | Strukturierungsprinzip zur Eliminierung von Redundanz und Anomalien |
| **Denormalisierung** | Bewusste Einführung von Redundanz für Performance oder Unveränderlichkeit |
| **Immutabilität** | Eigenschaft eines Objekts oder Felds, nach Veröffentlichung nicht mehr geändert werden zu können |
| **Snapshot** | Kopie relevanter Werte eines referenzierten Objekts zum Zeitpunkt einer Transaktion |
| **Validierungs-Engine** | Anwendungslogik, die Datenbankconstraints in der Anwendungsschicht implementiert |
| **Soft-Delete** | Deaktivierung eines Objekts durch Statusänderung statt physischer Löschung |
| **Hard-Delete** | Physische Entfernung eines Datensatzes aus der Datenbank |
| **Junction Entity** | Verknüpfungsentität für n:m-Beziehungen, die eigene Felder enthalten kann |

---

## Ausnahmen

| Ausnahme | Begründung | Gültig bis |
|---------|-----------|------------|
| Bestehende Collections verwenden `created`/`updated` statt `created_at`/`updated_at` | Entwickelt vor NW-STD-003 | Bis zur nächsten MAJOR-Migration je Collection |
| `world_versions.superseded_by_id` enthält Leerstring statt null | STRATO-Plattformbeschränkung | Bis zu Plattformwechsel |
| Keine nativen Constraints auf STRATO | Plattformbeschränkung | Bis zu Plattformwechsel; Validierungs-Engine als Ersatz |

---

## Qualitätsprüfung

| Kriterium | Prüfmethode | Bestanden |
|-----------|------------|-----------|
| Alle Pflichtabschnitte nach NW-STD-000 Kap. 4 vorhanden | Abschnittsprüfung | ✅ |
| Plattformunabhängig formuliert | Kein plattformspezifischer Code im Normteil | ✅ |
| Mindestens 40 Beispiele mit Begründung | Zählung Kapitel 12 | ✅ (50+) |
| Integritätsmodell vollständig | Kapitel 5 | ✅ |
| Migrationsregeln vorhanden | Kapitel 10 | ✅ |
| Validierungsprinzipien beschrieben | Kapitel 11 | ✅ |
| Roadmap für alle genannten Module | Kapitel 13 | ✅ |
| Kritische Selbstbewertung vorhanden | nächster Abschnitt | ✅ |

---

## Kritische Selbstbewertung

### Stärken

- Vollständige Abdeckung aller 13 Kapitel ohne Platzhalter
- Plattformunabhängige Formulierung mit konkreten Plattformbeispielen in dafür vorgesehenen Abschnitten
- Klare Trennung fachlicher und technischer Validierung
- STRATO-Quirks dokumentiert als bekannte Ausnahmen
- 50+ kommentierte Beispiele über alle Kategorien
- Bestehende NeuroWays-Modelle (World, Assets, Methoden) explizit adressiert

### Dokumentierte Schwachstellen

**1. Kein konkretes Typsystem definiert**
Der Standard beschreibt Feldtypen abstrakt (text, number, datetime). Konkrete Datenbanktypen (varchar(255), uuid, jsonb, timestamp with timezone) sind in Plattform-Implementierungsdokumenten zu definieren. Das ist eine bewusste Entscheidung für Plattformunabhängigkeit — aber es bedeutet, dass Entwickler beim Übergang auf eine neue Plattform Übersetzungsarbeit leisten müssen.

**2. Mehrmandantenfähigkeit nicht geregelt**
Das Modell ist auf eine einzelne NeuroWays-Installation ausgelegt. Wenn NeuroWays mehrere Organisationen (Mandanten) bedienen soll, braucht jede Entität eine `org_id` oder einen Tenant-Isolationsmechanismus. Das wird in NW-STD-003 v1.1.0 adressiert.

**3. Datenschutz/DSGVO ausgeklammert**
Welche Felder personenbezogene Daten enthalten und welche Rechte Nutzer darüber haben, ist bewusst ausgeklammert (NW-STD-080). Solange diese Felder nicht gekennzeichnet sind, ist kein vollständiges DSGVO-Compliance-Modell möglich.

**4. Indexierungsregeln fehlen**
Welche Felder indexiert werden sollten (für Performance), ist nicht beschrieben. Das ist plattformspezifisch, sollte aber zumindest als Prinzip formuliert werden.

**5. Konfliktresolution bei parallelen Schreibzugriffen**
Optimistic Locking, Pessimistic Locking oder andere Konfliktstrategien sind nicht beschrieben. Auf STRATO ohne Transaktionssupport ist das besonders relevant.

### Gesamtbewertung

**NW-STD-003 ist ausreichend vollständig, damit zukünftige Datenmodelle auf seiner Basis entwickelt werden können.**

Die vier Schwachstellen (Typsystem, Mehrmandant, DSGVO, Indexierung) sind alle bekannt, dokumentiert und in Folgestandards oder MINOR-Updates adressierbar. Sie blockieren keine neuen Modellierungsentscheidungen — sie schränken nur die Vollständigkeit der Implementierungsgrundlage ein.

Empfehlung: NW-STD-003 auf Status `review` setzen, sobald die Governance-Reviews für NW-STD-000 und NW-STD-001 abgeschlossen sind.

---

*NW-STD-003 — NeuroWays Database Standard v1.0.1 — Status: published — Veröffentlicht 2026-07-23*
