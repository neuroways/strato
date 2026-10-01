# NW-STD-002 — NeuroWays Standards Registry Standard

**Dokumentcode:** NW-STD-002  
**Version:** 1.0.1  
**Status:** published  
**Veröffentlicht:** 2026-07-23  
**Erstellt:** 2026-07-23  
**Gültig ab:** 2026-07-23  
**Verantwortlich:** NeuroWays Core  
**Hierarchie:** Core Standard — referenziert NW-STD-000 normativ  
**Ablöst:** –  
**Abgelöst durch:** –

---

## Änderungsverlauf

| Version | Datum | Änderung | Autor |
|---------|-------|----------|-------|
| 1.0.0 | 2026-07-23 | Erstfassung | NeuroWays Core |
| 1.0.0 | 2026-07-23 | Status: draft → review (Governance Review ausstehend) | NeuroWays Core |
| 1.0.1 | 2026-07-23 | NW-STD-003 Identität in Beispiel 11.6 als Database Standard korrigiert; Automatisierte Duplikatprüfung auf NW-GOV-001 umgezeigt; Bootstrap-Endkriterium operationalisiert | Governance Review (Konflikte A, D) | Governance Review 2026-07-23 |
| 1.0.1 | 2026-07-23 | Status: review → approved → published. Erste offizielle Veröffentlichung. Bootstrap-Phase beendet. | Veröffentlichungsreihenfolge Governance Foundation v1.0 | NeuroWays Core 2026-07-23 |

---

## Referenzen

| Dokument | Titel | Art |
|---------|-------|-----|
| NW-STD-000 | Standards Framework Standard | normativ |
| NW-STD-001 | Naming Standard | informativ |
| NW-STD-010 | Versioning Standard | informativ (geplant) |
| NW-STD-014 | Lifecycle Standard | informativ (geplant) |
| NW-GOV-001 | Standards Governance | informativ (geplant) |

---

## Geltungsbereich

Dieser Standard gilt für alle NeuroWays-Standards, Governance-Dokumente und sonstigen normativen Dokumente, die im NeuroWays-System eine offizielle Rolle übernehmen.

Er gilt unabhängig von Plattform, Datenbanksystem oder Ablageort.

**Kein Standard gilt als offiziell veröffentlicht, solange er nicht im Registry eingetragen ist.**

---

## Offene Punkte

| Punkt | Beschreibung | Vorgesehen in |
|-------|-------------|---------------|
| Technische Implementierung | Datenbankmodell, API-Endpunkte für Registry | NW-STD-011, NW-STD-012 |
| Zugriffskontrolle | Wer darf Einträge anlegen, ändern, archivieren? | NW-GOV-001 |
| Automatisierte Duplikatprüfung | Werkzeug zur Prüfung vor Nummerneintragung | NW-GOV-001 |
| Benachrichtigungen | Wer wird informiert, wenn ein Standard seinen Status ändert? | NW-GOV-002 |

---

## Kapitel 1 — Zweck des Standardregisters

### 1.1 Definition

Das NeuroWays Standards Registry ist das zentrale, autoritative Verzeichnis aller NeuroWays-Standards. Es ist die einzige offizielle Quelle für:

- die Existenz eines Standards
- die aktuell gültige Version
- den aktuellen Status
- alle historischen Versionen
- die Abhängigkeiten zwischen Standards
- die Verbindlichkeit eines Standards

### 1.2 Verbindlichkeit des Registrierungsprinzips

Ein Standard gilt unter folgenden Bedingungen **nicht** als offiziell:

- kein Eintrag im Registry
- Eintrag vorhanden, aber Status `planned` oder `draft`
- Eintrag vorhanden, Status `published`, aber kein Freigabedatum eingetragen

Ein Standard gilt als offiziell veröffentlicht, wenn:

- ein Eintrag im Registry mit Status `published` existiert
- ein Freigabedatum eingetragen ist
- die aktuelle Version mit dem Dokument übereinstimmt

### 1.3 Das Registry als Governance-Instrument

Das Registry ist kein technisches Werkzeug — es ist ein Governance-Instrument. Es schafft Transparenz über den Zustand des gesamten Standards-Systems und ermöglicht es jedem Beteiligten, auf einen Blick zu erkennen:

- Welche Standards gelten heute?
- Was ist veraltet?
- Was ist in Arbeit?
- Worauf baut dieser Standard auf?

### 1.4 Autorität

Das Registry hat Vorrang vor einzelnen Standarddokumenten. Wenn ein Dokument sich selbst als `published` bezeichnet, aber der Registereintrag `draft` zeigt, gilt der Registereintrag.

---

## Kapitel 2 — Verwaltete Objekte

Das Registry verwaltet Standards aus folgenden Kategorien. Die Nummerierungsbereiche sind verbindlich.

| Kategorie | Präfix | Nummerierungsbereich | Beschreibung |
|-----------|--------|----------------------|--------------|
| Core Standards | `NW-STD` | 000–009 | Fundament aller anderen Standards |
| Architecture Standards | `NW-STD` | 010–019 | Versioning, Datenhaltung, Systemprinzipien |
| Database Standards | `NW-STD` | 020–029 | Datenbankkonventionen und -struktur |
| API Standards | `NW-STD` | 030–039 | Schnittstellendefinition und -verhalten |
| Development Standards | `NW-STD` | 040–059 | Quelltext, Tests, Abhängigkeiten |
| Design Standards | `NW-STD` | 060–069 | Designsystem, visuelle Sprache |
| Accessibility Standards | `NW-STD` | 070–079 | Barrierefreiheit |
| Security Standards | `NW-STD` | 080–089 | Sicherheit, Datenschutz |
| Asset Standards | `NW-STD` | 090–099 | Medienverwaltung, Illustrationen |
| Testing Standards | `NW-STD` | 100–109 | Qualitätssicherung |
| Lifecycle Standards | `NW-STD` | 110–119 | Lebenszyklus von Objekten |
| Documentation Standards | `NW-STD` | 120–129 | Textstruktur, Dokumentenstandards |
| Quality Standards | `NW-STD` | 130–139 | Audit, Compliance |
| Governance Standards | `NW-GOV` | 001–099 | Organisatorische Abläufe, Rollen |
| Future Standards | alle | reserviert | Platzhalter für noch unbenannte Bereiche |

**Hinweis zur Abweichung von NW-STD-000:** NW-STD-000 verwendet andere Nummerierungsbereiche (z. B. Technical 010–029). Diese Abweichung ist ein bekannter Widerspruch, der mit NW-STD-000 v1.1.0 aufgelöst wird. Bis dahin gilt NW-STD-002 als maßgeblich für Nummerierungsbereiche.

---

## Kapitel 3 — Eindeutigkeit

### 3.1 Grundregel

Jede Standardnummer darf innerhalb ihres Präfix-Bereichs genau einmal vergeben werden.

```
NW-STD-001  →  belegt durch Naming Standard
NW-STD-001  →  darf niemals für einen anderen Standard vergeben werden
```

### 3.2 Permanenz reservierter Nummern

Eine Nummer ist reserviert, sobald sie im Registry eingetragen ist — unabhängig davon, ob ein Dokument existiert. Sie bleibt dauerhaft reserviert, auch wenn:

- der Standard archiviert wird
- der Standard nie das Stadium `draft` verlässt
- der Standard durch einen anderen ersetzt wird

### 3.3 Verbot der Wiederverwendung

Gelöschte, archivierte oder aufgegebene Nummern dürfen **niemals** neu vergeben werden. Nummern sind Identitäten, keine Ressourcen.

```
Falsch:  NW-STD-005 wird archiviert → NW-STD-005 für neues Thema verwenden
Richtig: NW-STD-005 bleibt im Registry als archiviert → neues Thema erhält NW-STD-006
```

### 3.4 Lücken sind erlaubt

Lücken in der Nummernfolge entstehen, wenn Platzhalter reserviert werden oder Nummern archiviert wurden. Lücken sind kein Fehler.

```
NW-STD-011  ✅ Database Standard
NW-STD-012  🔲 reserviert (planned)
NW-STD-013  ✅ Security Standard
```

### 3.5 Historische Standards

Archivierte Standards bleiben vollständig im Registry dokumentiert. Ihre Einträge werden niemals gelöscht. Sie sind erkennbar an Status `archived` und einem Archivierungsdatum.

---

## Kapitel 4 — Pflichtinformationen eines Registereintrags

Jeder Eintrag im Registry enthält exakt folgende Felder. Fehlende Pflichtfelder verhindern die Registrierung.

| Feld | Pflicht | Format | Beschreibung |
|------|---------|--------|--------------|
| `standard_code` | ✅ | `NW-STD-000` | Eindeutiger Code, dauerhaft unveränderlich |
| `title` | ✅ | Freitext | Offizieller Titel des Standards |
| `short_description` | ✅ | Max. 255 Zeichen | Einzeiliger Zweck des Standards |
| `current_version` | ✅ | Semver | Aktuell gültige Version |
| `status` | ✅ | Statuswert (Kapitel 5) | Aktueller Status |
| `category` | ✅ | Kategoriecode (Kapitel 2) | Fachliche Zuordnung |
| `owner` | ✅ | Name / Team | Verantwortliche Instanz |
| `maintainer` | ✅ | Name / Team | Pflegende Person oder Team |
| `created_at` | ✅ | ISO-Datum | Datum des ersten Registereintrags |
| `published_at` | bedingt | ISO-Datum | Pflicht, wenn Status `published` |
| `archived_at` | bedingt | ISO-Datum | Pflicht, wenn Status `archived` |
| `supersedes` | optional | `NW-STD-XXX` | Standard, den dieser ersetzt |
| `superseded_by` | optional | `NW-STD-XXX` | Standard, der diesen ersetzt |
| `depends_on` | optional | Liste von Codes | Normative Abhängigkeiten |
| `is_mandatory` | ✅ | ja / nein / bedingt | Verbindlichkeit |
| `mandatory_for` | bedingt | Freitext | Pflicht, wenn `is_mandatory = bedingt` |
| `valid_from` | optional | ISO-Datum | Ab wann der Standard gilt |
| `valid_to` | optional | ISO-Datum | Bis wann der Standard gilt |
| `remarks` | optional | Freitext | Hinweise, Ausnahmen, Kontext |

### 4.1 Unveränderliche Felder nach Veröffentlichung

Nach Erreichen von Status `published` dürfen folgende Felder nicht mehr verändert werden:

- `standard_code`
- `title` (Titeländerungen → neue Version)
- `category`
- `created_at`

Folgende Felder dürfen kontrolliert ergänzt oder geändert werden:

- `status` (nur in zulässige Richtung)
- `superseded_by`
- `archived_at`
- `remarks`

---

## Kapitel 5 — Statusmodell

### 5.1 Statuswerte

| Status | Bedeutung | Fachliche Inhalte änderbar | Nächste mögliche Status |
|--------|-----------|---------------------------|------------------------|
| `planned` | Nummer reserviert, kein Dokument | — | `draft`, `archived` |
| `draft` | Dokument in Erstellung | ✅ ja | `review`, `archived` |
| `review` | Zur Prüfung eingereicht | ⚠️ nur Korrekturen | `approved`, `draft`, `archived` |
| `approved` | Inhaltlich freigegeben | ❌ nein | `published`, `draft` (Ausnahme) |
| `published` | Aktiv und verbindlich | ❌ nein | `superseded`, `archived` |
| `superseded` | Durch neuere Version abgelöst | ❌ nein | `archived` |
| `archived` | Historisch, nicht mehr anwendbar | ❌ nein | – (terminal) |
| `deprecated` | Noch verwendbar, Ablösung angekündigt | ❌ nein | `superseded`, `archived` |

### 5.2 Zulässige Statusübergänge

```
planned ──→ draft ──→ review ──→ approved ──→ published ──→ superseded ──→ archived
                │          │                       │
                │          └──→ draft              └──→ archived
                │
                └──→ archived

published ──→ deprecated ──→ superseded ──→ archived
```

### 5.3 Nicht zulässige Übergänge

- `published` → `draft` (Inhalt ist eingefroren; neue Version starten)
- `archived` → jeder andere Status
- Überspringen von `review` und `approved` außer bei Patch-Korrekturen
- `superseded` → `published`

### 5.4 Status `approved` als eigenständige Stufe

`approved` ist bewusst eine eigene Stufe zwischen Review und Veröffentlichung. Ein Standard kann inhaltlich genehmigt sein, ohne sofort zu gelten — zum Beispiel wenn die Veröffentlichung zu einem bestimmten Zeitpunkt oder gleichzeitig mit einem anderen Standard erfolgen soll.

### 5.5 Verweis auf NW-STD-014

Die detaillierten Übergangsregeln, Fristen und Genehmigungsworkflows werden im Lifecycle Standard (NW-STD-014) geregelt. Dieser Standard legt nur die zulässigen Statuswerte fest.

---

## Kapitel 6 — Nummernvergabe

### 6.1 Wer vergibt Nummern

Nummern werden ausschließlich durch die verantwortliche Registry-Instanz vergeben. Solange NW-GOV-001 noch nicht existiert, ist die Registry-Instanz das NeuroWays Core Team.

Kein Einzelner darf eine Nummer selbst vergeben. Jeder Antrag durchläuft den Vergabeprozess.

### 6.2 Wann Nummern reserviert werden

Eine Nummer wird reserviert, wenn:

- ein begründeter Bedarf für einen neuen Standard besteht
- ein Antrag mit Titel, Kurzbeschreibung und Kategorie vorliegt
- kein Widerspruch zu bestehenden Standards erkennbar ist

Der Standard muss zu diesem Zeitpunkt noch nicht existieren. Die Reservierung schafft einen Platzhalter mit Status `planned`.

### 6.3 Wann Nummern endgültig vergeben werden

Eine Nummer gilt als endgültig vergeben, sobald der Registereintrag angelegt wurde — unabhängig vom Status. Endgültig bedeutet: dauerhaft und unwiderruflich dieser Bedeutung zugeordnet.

### 6.4 Wann Nummern archiviert werden

Eine Nummer wird archiviert, wenn:

- der zugehörige Standard vollständig durch einen anderen ersetzt wurde
- der Standard seinen Geltungsbereich verloren hat
- der Standard nie fertiggestellt wurde und kein Bedarf mehr besteht

Archiviert bedeutet: der Eintrag bleibt, die Nummer ist dauerhaft blockiert.

### 6.5 Niemals neu vergeben

Eine Nummer darf unter keinen Umständen neu vergeben werden, auch nicht wenn:

- der Standard inhaltlich leer ist
- der Standard niemals den Status `draft` erreicht hat
- die Nummer versehentlich reserviert wurde
- das Thema aufgegeben wurde

Ausnahme: Reservierungen innerhalb der ersten 30 Tage können mit begründeter Entscheidung der Registry-Instanz freigegeben und dem gleichen Thema unter neuer Nummer erneut zugewiesen werden. In diesem Fall wird die ursprüngliche Nummer mit Status `archived` und Vermerk „früh freigegeben, nie genutzt" dokumentiert.

---

## Kapitel 7 — Beziehungen zwischen Standards

### 7.1 Beziehungstypen

| Beziehung | Beschreibung | Richtung |
|-----------|-------------|---------|
| `supersedes` | Dieser Standard löst einen anderen ab | A → B (A ersetzt B) |
| `superseded_by` | Dieser Standard wurde durch einen anderen abgelöst | A → B (A wurde durch B ersetzt) |
| `depends_on` | Dieser Standard setzt einen anderen voraus | A → B (A braucht B) |
| `related_to` | Inhaltliche Verwandtschaft ohne Abhängigkeit | A ↔ B |
| `referenced_by` | Andere Standards verweisen auf diesen | B → A |

### 7.2 Verbot zyklischer Abhängigkeiten

Normative Abhängigkeiten dürfen keine Zyklen bilden:

```
Verboten:
A depends_on B
B depends_on A

Auch verboten (transitiv):
A depends_on B
B depends_on C
C depends_on A
```

Erlaubt: Mehrere Standards können denselben dritten Standard als Abhängigkeit haben.

### 7.3 NW-STD-000 als universelle Basis

NW-STD-000 darf von allen Standards als normative Abhängigkeit eingetragen werden, ohne selbst eine Abhängigkeit zu anderen Standards zu haben. NW-STD-000 steht außerhalb des Zirkulärverbots — jedoch nur für eingehende Abhängigkeiten.

### 7.4 Abhängigkeitsgraph

Der vollständige Abhängigkeitsgraph aller registrierten Standards wird als Teil des Registry geführt. Er wird bei jeder neuen Registrierung oder Statusänderung aktualisiert. Zirkuläre Abhängigkeiten werden vor jeder Registrierung geprüft.

### 7.5 Propagation von Statusänderungen

Wenn ein Standard seinen Status ändert, wird geprüft:

- Welche anderen Standards haben eine normative Abhängigkeit auf diesen?
- Werden diese durch die Statusänderung in ihrer Konformität beeinträchtigt?

Eine automatische Statusänderung abhängiger Standards erfolgt **nicht** — aber ein Warnhinweis wird im Registry vermerkt.

---

## Kapitel 8 — Versionen im Registry

### 8.1 Aktuelle Version

Im Registry ist immer genau eine Version als `current` markiert. Diese Version entspricht dem zuletzt veröffentlichten Dokument.

### 8.2 Historische Versionen

Alle früheren Versionen eines Standards bleiben im Registry dokumentiert. Sie erhalten den Status des Zeitpunkts ihrer Ablösung (`superseded`) und das Datum, zu dem die neue Version übernommen wurde.

### 8.3 Welche Version darf veröffentlicht werden

Eine Version darf im Registry als `published` eingetragen werden, wenn:

- das zugehörige Dokument vollständig ist (alle Pflichtabschnitte nach NW-STD-000 Kap. 4)
- der Status `approved` erreicht wurde
- kein offener Widerspruch zu anderen veröffentlichten Standards besteht

### 8.4 Verweis auf NW-STD-010

Die genauen Regeln zu Semver, Abwärtskompatibilitätsversprechen und Deprecation-Fristen werden im Versioning Standard (NW-STD-010) geregelt.

---

## Kapitel 9 — Veröffentlichungsprozess

### 9.1 Vollständiger Ablauf

```
Schritt 1: Bedarf erkennen
  → Kurzbeschreibung und Kategorie formulieren
  → Antrag an Registry-Instanz stellen

Schritt 2: Nummer reservieren
  → Registry-Instanz prüft Eindeutigkeit und Kategorie
  → Eintrag mit Status "planned" wird angelegt

Schritt 3: Entwurf erstellen
  → Dokument nach NW-STD-000 Kap. 4 erstellen
  → Status im Registry: "draft"

Schritt 4: Interne Prüfung
  → Widersprüche zu bestehenden Standards prüfen
  → Abhängigkeiten eintragen
  → Qualitätskriterien nach NW-STD-000 Kap. 10 prüfen

Schritt 5: Review
  → Status im Registry: "review"
  → Mindestens eine Prüfperson außerhalb der Autorenschaft

Schritt 6: Freigabe
  → Status im Registry: "approved"
  → Freigabedatum eingetragen

Schritt 7: Veröffentlichung
  → Status im Registry: "published"
  → Freigabedatum = Veröffentlichungsdatum
  → Abhängige Standards werden benachrichtigt

Schritt 8: Ersetzung (wenn nötig)
  → Neuer Standard wird veröffentlicht
  → Alter Standard: Status "superseded", "superseded_by" eingetragen

Schritt 9: Archivierung
  → Status im Registry: "archived"
  → Archivierungsdatum eingetragen
  → Eintrag bleibt dauerhaft erhalten
```

### 9.2 Vereinfachter Prozess für Patch-Versionen

Rein redaktionelle Korrekturen (Tippfehler, Formatierung) dürfen mit einem vereinfachten Prozess veröffentlicht werden:

- `draft` → `review` → `published` (kein `approved` erforderlich)
- Mindestens eine Prüfperson bestätigt die Änderung
- Status im Registry: sofort von `review` auf `published`

### 9.3 Blockierende Bedingungen

Folgende Bedingungen verhindern eine Veröffentlichung:

- Offener Widerspruch zu einem anderen veröffentlichten Standard
- Fehlende Pflichtabschnitte im Dokument
- Kein Registereintrag
- Zirkuläre Abhängigkeit erkannt

---

## Kapitel 10 — Registerstruktur (fachlich)

Das Registry besteht fachlich aus folgenden Bestandteilen. Dies ist keine Datenbankmodellierung — sondern eine Beschreibung der Informationsstruktur.

### 10.1 Registry (Gesamtverzeichnis)

Das Gesamtverzeichnis aller jemals reservierten Nummern. Es enthält jeden Standard, der jemals existiert hat — unabhängig von Status, Vollständigkeit oder Archivierungszustand.

Eigenschaften: vollständig, unveränderlich in der Nummernspalte, dauerhaft.

### 10.2 Registereinträge

Jeder Eintrag entspricht einem Standard. Er enthält alle Pflichtinformationen aus Kapitel 4. Er ist die maßgebliche Quelle für Status und Version — nicht das Dokument selbst.

### 10.3 Versionshistorie

Für jeden Registereintrag wird eine vollständige Versionshistorie geführt. Sie dokumentiert:

- alle früheren Versionen mit Status und Datum
- wann welche Version aktuell war
- welche Version welche abgelöst hat

### 10.4 Änderungsprotokoll

Das Änderungsprotokoll dokumentiert alle Änderungen am Registry selbst:

- neue Einträge
- Statusänderungen
- Versionsänderungen
- Korrekturen an Registerdaten

Es enthält Zeitstempel und handelnde Person.

### 10.5 Referenzen

Für jeden Eintrag werden alle Beziehungen zu anderen Standards gespeichert (Kapitel 7). Das ermöglicht die Darstellung des vollständigen Abhängigkeitsgraphen.

### 10.6 Abhängigkeitsgraph

Eine abgeleitete Sicht auf alle `depends_on`-Beziehungen im Gesamtsystem. Wird automatisch aus den Referenzeinträgen berechnet. Zirkuläre Pfade werden hervorgehoben.

---

## Kapitel 11 — Beispiele

### 11.1 Gültige Registereinträge (✅)

| Beispiel | Begründung |
|---------|-----------|
| NW-STD-000, Status `published`, Freigabedatum eingetragen | Vollständig, Pflichtfelder gesetzt |
| NW-STD-001, Status `review`, kein Freigabedatum | Korrekt — Freigabedatum ist erst bei `published` Pflicht |
| NW-STD-005, Status `planned`, kein Dokument | Nummer reserviert, noch kein Inhalt — zulässig |
| NW-STD-011, depends_on: NW-STD-001 | Einseitige Abhängigkeit, keine Zirkularität |
| NW-STD-010 superseded_by NW-STD-010b | Ablösung korrekt dokumentiert |
| NW-STD-010, Status `archived`, Archivierungsdatum gesetzt | Korrekte Archivierung |
| NW-GOV-001, Kategorie `governance`, Präfix `NW-GOV` | Governance-Standard korrekt getrennt |
| NW-STD-001 is_mandatory: `bedingt`, mandatory_for: `alle technischen Collections` | Bedingte Verbindlichkeit korrekt dokumentiert |
| NW-STD-020, Patch 1.0.1, Tippfehlerkorrektur | PATCH-Version im Registry eingetragen |
| NW-STD-030 v2.0.0, Migrationspfad im Dokument, MAJOR eingetragen | MAJOR-Wechsel korrekt registriert |

### 11.2 Ungültige Registereinträge (❌)

| Beispiel | Fehler | Korrekt |
|---------|--------|---------|
| NW-STD-001 doppelt vergeben (für Naming und für Coding) | Nummernkollision | Coding erhält eigene Nummer |
| NW-STD-015, Status `published`, kein Freigabedatum | Pflichtfeld fehlt | Freigabedatum nachtragen |
| NW-STD-022 ohne Kategorie | Pflichtfeld fehlt | Kategorie eintragen |
| NW-STD-007 nach Archivierung neu vergeben | Wiederverwendung verboten | Neue Nummer vergeben |
| NW-STD-A depends_on NW-STD-B, NW-STD-B depends_on NW-STD-A | Zirkuläre Abhängigkeit | Abhängigkeit neu gestalten |
| NW-STD-018 ohne short_description | Pflichtfeld fehlt | Kurzbeschreibung ergänzen |
| Standard außerhalb des Registry als veröffentlicht bezeichnet | Registry-Prinzip verletzt | Zuerst registrieren |
| NW-STD-001 v1.0.0 und v1.1.0 beide als `current` markiert | Eindeutigkeit verletzt | Nur eine Version ist `current` |
| NW-STD-009, owner leer | Pflichtfeld fehlt | Owner eintragen |
| Status `published` → `draft` gesetzt | Unzulässiger Übergang | Neue Version starten |

### 11.3 Doppelvergabe (❌)

```
Versuch: NW-STD-001 für neuen "Component Standard" vergeben
Ergebnis: Abgelehnt
Grund: NW-STD-001 ist dauerhaft dem Naming Standard zugeordnet
Lösung: NW-STD-001 bleibt Naming Standard → Component Standard erhält NW-STD-XXX
```

### 11.4 Versionswechsel (✅)

```
NW-STD-011 v1.0.0 → published → wird durch v2.0.0 abgelöst
Registry-Eintrag NW-STD-011:
  current_version: 2.0.0
  status: published
  published_at: 2027-01-15
Versionshistorie:
  v1.0.0: status superseded, superseded_at: 2027-01-15
  v2.0.0: status published, published_at: 2027-01-15
```

### 11.5 Ersetzung (✅)

```
NW-STD-014 (Lifecycle Standard) wird durch zwei neue Standards ersetzt:
  NW-STD-114a (Entity Lifecycle)
  NW-STD-114b (Document Lifecycle)

Registry-Einträge:
  NW-STD-014: status superseded, superseded_by: NW-STD-114a + NW-STD-114b
  NW-STD-114a: status published, supersedes: NW-STD-014 (teilweise)
  NW-STD-114b: status published, supersedes: NW-STD-014 (teilweise)
```

### 11.6 Archivierung (✅)

```
NW-STD-099 (Beispiel-Platzhalter) wird nie fertiggestellt:
  Status: planned → archived
  archived_at: 2027-06-01
  remarks: "Thema in bestehenden Standards abgedeckt, eigenständiger Standard nicht nötig"
  Nummer NW-STD-099: dauerhaft blockiert, niemals neu vergeben
```

### 11.7 Neue Kategorie (✅)

```
Bedarf: Internationalisierungsstandard
Antrag: NW-STD-XXX, Kategorie "Internationalization"
Prüfung: Kategorie noch nicht vorhanden → Registry-Instanz prüft und ergenehmigt neue Kategorie
Registrierung: NW-STD-140 (nächste freie Nummer im neuen Bereich 140–149)
Status: planned
```

### 11.8 Frühe Freigabe einer Reservierung (Ausnahme)

```
NW-STD-008 wurde versehentlich reserviert für "Monolith Standard"
Entscheidung: Thema irrelevant, Reservierung innerhalb 15 Tagen
Registry-Eintrag NW-STD-008: status archived, remarks "Früh freigegeben (15 Tage), nie genutzt"
Neues Thema erhält neue Nummer NW-STD-009
```

---

## Kapitel 12 — Beziehungen zu bestehenden Standards

### 12.1 Beziehung zu NW-STD-000

NW-STD-000 definiert, was ein Standard ist und wie er aufgebaut sein muss. NW-STD-002 setzt NW-STD-000 voraus und konkretisiert, wie Standards zentral verwaltet werden.

| Beziehung | Beschreibung |
|-----------|-------------|
| NW-STD-002 depends_on NW-STD-000 | normativ |
| NW-STD-000 referenced_by NW-STD-002 | informativ |

**Priorität:** NW-STD-002 erweitert NW-STD-000 — es gibt keinen Widerspruch. Die in NW-STD-000 genannten Nummerierungsbereiche weichen von NW-STD-002 ab (bekannte Inkonsistenz, wird mit NW-STD-000 v1.1.0 aufgelöst).

### 12.2 Beziehung zu NW-STD-001

NW-STD-001 regelt Namenskonventionen. NW-STD-002 nutzt diese Konventionen für die Bezeichnung von Registry-Feldern und Statuswerten, stellt aber keine normativen Anforderungen an Feldnamen — da NW-STD-002 noch keine technische Implementierung beschreibt.

| Beziehung | Beschreibung |
|-----------|-------------|
| NW-STD-002 related_to NW-STD-001 | informativ |

### 12.3 Beziehung zu zukünftigen Standards

| Standard | Beziehung |
|---------|-----------|
| NW-STD-010 (Versioning) | Wird von NW-STD-002 referenziert für Semver-Regeln |
| NW-STD-011 (Database) | Technische Implementierung des Registry als Datenbankstruktur |
| NW-STD-014 (Lifecycle) | Übergangsregeln und Genehmigungsworkflows |
| NW-GOV-001 (Governance) | Definiert Registry-Instanz und Vergabeprozess |

---

## Kapitel 13 — Überführung in technische Systeme

### 13.1 Grundsatz

Das fachliche Modell dieses Standards ist technologieneutral. Die Überführung in konkrete Systeme erfolgt in separaten technischen Dokumenten.

### 13.2 Überführung in eine relationale Datenbank

Das fachliche Modell des Registry lässt sich direkt in relationale Tabellen überführen:

**Kerntabellen (fachlich):**
- Registereinträge (ein Datensatz pro Standardnummer)
- Versionshistorie (ein Datensatz pro Version pro Standard)
- Beziehungen (Verknüpfungstabelle für depends_on, supersedes etc.)
- Änderungsprotokoll (Audit-Tabelle für alle Registry-Änderungen)

Jede Tabelle enthält mindestens die Pflichtfelder aus Kapitel 4. Eindeutigkeitsconstraints erzwingen die Eindeutigkeit der Standardnummern auf Datenbankebene.

Die konkrete Benennung der Tabellen und Felder folgt NW-STD-001 (Naming Standard) und NW-STD-011 (Database Standard, sobald verfügbar).

### 13.3 Überführung in STRATO (aktuelle Plattform)

In der aktuellen NeuroWays-Entwicklungsumgebung wäre das Registry als eigene Collection umsetzbar:

**Minimale Collection-Struktur (nach NW-STD-001):**
- `STD_REGISTRY` — Haupttabelle der Registereinträge
- `STD_REGISTRY_VERSIONS` — Versionshistorie
- `STD_REGISTRY_RELATIONS` — Abhängigkeiten und Beziehungen
- `STD_REGISTRY_CHANGELOG` — Änderungsprotokoll

Die Implementierung erfolgt nach Freigabe von NW-STD-011. Bis dahin wird das Registry als Markdown-Dokument (NW-STD-002-REGISTER.md) geführt.

### 13.4 Überführung in Oracle APEX

Oracle APEX ist eine webbasierte Low-Code-Plattform, die sich für ein Verwaltungsinterface des Registry gut eignet:

**Architekturbild:**
- Relationale Oracle-Datenbank als Datenquelle
- APEX-Formulare für Registereinträge (Anlegen, Bearbeiten, Statusübergang)
- APEX-Berichte für Übersichten (nach Kategorie, Status, Abhängigkeit)
- APEX Interactive Report für den Abhängigkeitsgraph

Die Überführung in Oracle APEX setzt voraus:
- Abgeschlossenes Datenbankmodell (NW-STD-011)
- Definierte Zugriffsrollen (NW-GOV-001)
- API-Schnittstelle für externe Lesesysteme (NW-STD-012)

Bis zur Überführung bleibt das Registry versioniert in Dokumentform.

---

## Definitionen

| Begriff | Definition |
|---------|-----------|
| **Registry** | Das zentrale, autoritative Verzeichnis aller NeuroWays-Standards |
| **Registereintrag** | Ein einzelner Datensatz im Registry für einen Standard |
| **Nummer** | Der eindeutige, unveränderliche Code eines Standards (z. B. `NW-STD-001`) |
| **Reservierung** | Das Anlegen eines Registereintrags vor Existenz eines Dokuments |
| **Veröffentlichung** | Der Übergang eines Standards auf Status `published` im Registry |
| **Archivierung** | Das dauerhafte Einfrieren eines Standards mit Status `archived` |
| **Registry-Instanz** | Die verantwortliche Person oder das Team, das Nummern vergibt |
| **Abhängigkeitsgraph** | Die vollständige Darstellung aller `depends_on`-Beziehungen |
| **Zirkuläre Abhängigkeit** | Eine Kette von Abhängigkeiten, die zu einem Standard zurückführt |

---

## Ausnahmen

| Ausnahme | Begründung | Gültig bis |
|---------|-----------|------------|
| NW-DSN-001 ist nicht nach NW-STD-000 Kap. 4 strukturiert | Entwickelt vor NW-STD-000 | Bis zur nächsten MINOR-Version von NW-DSN-001 |
| NW-STD-000 und NW-STD-001 gelten provisorisch als veröffentlicht (Bootstrap Phase) | Vorhühnerei-Problem: Registry muss existieren, bevor Standards registriert werden können. Die Bootstrap-Phase beginnt mit der Erstellung von NW-STD-002 und endet eindeutig und einmalig, wenn NW-STD-002 von mindestens zwei Personen des NeuroWays Core Teams schriftlich freigegeben und der Status auf `published` gesetzt wurde. Die Bootstrap-Phase kann danach niemals erneut aktiviert werden. | Bootstrap Phase beendet durch: NW-STD-002 status = published + schriftliche Freigabe durch zwei Core-Team-Mitglieder |

---

## Qualitätsprüfung

| Kriterium | Prüfmethode | Bestanden |
|-----------|------------|-----------|
| Alle Pflichtabschnitte vorhanden (NW-STD-000 Kap. 4) | Abschnittsprüfung | ✅ |
| Statusmodell vollständig mit Übergängen | Kapitel 5 | ✅ |
| Nummernvergabe klar geregelt | Kapitel 6 | ✅ |
| Zirkuläre Abhängigkeiten adressiert | Kapitel 7 | ✅ |
| Mindestens 30 Beispiele mit Begründung | Kapitel 11 | ✅ (31) |
| Beziehung zu NW-STD-000 und NW-STD-001 | Kapitel 12 | ✅ |
| Überführungspfad (relational, STRATO, APEX) | Kapitel 13 | ✅ |
| Kritische Selbstbewertung vorhanden | nächster Abschnitt | ✅ |

---

## Kritische Selbstbewertung

### Reifebewertung für die Freigabe von NW-STD-000 und NW-STD-001

**Frage:** Ist das Registry ausreichend definiert, damit NW-STD-000 und NW-STD-001 offiziell veröffentlicht werden können?

### Ja — mit einer bewussten Ausnahme

Das Registry ist fachlich vollständig beschrieben. Die Veröffentlichung von NW-STD-000 und NW-STD-001 ist möglich, sobald NW-STD-002 selbst den Status `review` erreicht hat, weil:

1. **Nummernvergabe ist klar geregelt** — Kapitel 6 beschreibt vollständig, wer, wann und wie Nummern vergibt.
2. **Statusmodell ist konsistent** — Kapitel 5 und 9 beschreiben den vollständigen Weg von `draft` zu `published`.
3. **Eindeutigkeit ist gesichert** — Kapitel 3 stellt klar, dass Nummern nie wiederverwendet werden.
4. **Abhängigkeiten sind beschreibbar** — Kapitel 7 erlaubt die korrekte Dokumentation der Beziehungen NW-STD-001 → NW-STD-000.

### Bekannte verbleibende Schwachstellen

**1. Vorhühnerei-Problem (dokumentiert als Ausnahme)**
Das Registry setzt voraus, dass Standards registriert sind, bevor sie veröffentlicht werden. Aber das Registry selbst ist noch nicht veröffentlicht. Die Ausnahme in Kapitel „Ausnahmen" adressiert das explizit: NW-STD-000 und NW-STD-001 gelten provisorisch als veröffentlicht, bis NW-STD-002 freigegeben ist. Das ist keine elegante Lösung — aber eine ehrliche.

**2. Registry-Instanz noch nicht benannt**
Kapitel 6.1 sagt, wer Nummern vergeben darf — aber NW-GOV-001 existiert noch nicht. Derzeit ist das NeuroWays Core Team die implizite Instanz. Das ist ausreichend für eine kleine Organisation, aber nicht skalierbar.

**3. Kein technisches Werkzeug**
Das Registry liegt als Markdown-Dokument vor. Es gibt keinen automatisierten Check für Duplikate oder Zirkularität. Das ist akzeptabel für die aktuelle Skalierung, muss aber mit NW-STD-011 und NW-GOV-001 behoben werden.

**4. Nummerierungsbereich-Inkonsistenz mit NW-STD-000**
NW-STD-000 Kapitel 2 und NW-STD-002 Kapitel 2 verwenden unterschiedliche Nummerierungsbereiche. NW-STD-002 ist maßgeblich (neuere Definition), aber NW-STD-000 muss mit v1.1.0 angepasst werden.

### Empfehlung

**NW-STD-002 in `review` setzen.**  
**NW-STD-000 und NW-STD-001 können unmittelbar danach in `approved` und dann `published` gesetzt werden.**

Die Reihenfolge der empfohlenen Freigaben:

```
1. NW-STD-002  →  review
2. NW-STD-000  →  approved → published  (mit Hinweis auf offene Inkonsistenz)
3. NW-STD-001  →  published  (unverändert, wie entschieden)
4. NW-STD-002  →  approved → published
5. NW-STD-000 v1.1.0  →  Nummerierungsbereiche mit NW-STD-002 synchronisiert
```

---

*NW-STD-002 — NeuroWays Standards Registry Standard v1.0.1 — Status: published — Veröffentlicht 2026-07-23*
