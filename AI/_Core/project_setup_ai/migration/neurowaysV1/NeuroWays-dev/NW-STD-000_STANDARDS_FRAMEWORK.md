# NW-STD-000 — NeuroWays Standards Framework Standard

**Dokumentcode:** NW-STD-000  
**Version:** 1.0.1  
**Status:** published  
**Veröffentlicht:** 2026-07-23  
**Erstellt:** 2026-07-23  
**Gültig ab:** 2026-07-23  
**Verantwortlich:** NeuroWays Core  
**Hierarchie:** Übergeordneter Rahmenstandard — steht über allen anderen NeuroWays-Standards  
**Ablöst:** –  
**Abgelöst durch:** –

---

## Änderungsverlauf

| Version | Datum | Änderung | Grund | Review |
|---------|-------|----------|-------|--------|
| 1.0.0 | 2026-07-23 | Erstfassung | – | – |
| 1.0.1 | 2026-07-23 | NW-STD-003 in Roadmap als Database Standard korrigiert; Statusmodell um `approved` als maßgebliche Quelle bestätigt; Bootstrap-Endkriterium in Selbstbewertung präzisiert | Governance Review (Konflikte A, B, D) | Governance Review 2026-07-23 |
| 1.0.1 | 2026-07-23 | Status: draft → approved → published. Erste offizielle Veröffentlichung als Teil der Governance Foundation v1.0. | Veröffentlichungsreihenfolge Governance Foundation v1.0 | NeuroWays Core 2026-07-23 |

---

## Referenzen

| Dokument | Titel | Beziehung |
|---------|-------|-----------|
| NW-STD-001 | Naming Standard | Referenziert NW-STD-000 als Rahmen |
| NW-DSN-001 | World Design Standard | Referenziert NW-STD-000 als Rahmen |

---

## Geltungsbereich

Dieser Standard gilt für alle NeuroWays-Standards ohne Ausnahme.

Er definiert, wie Standards entstehen, strukturiert sind, gepflegt, versioniert und außer Kraft gesetzt werden. Er gilt unabhängig von Plattform, Technologie oder Modulzugehörigkeit.

NW-STD-000 ist der einzige Standard, der nicht selbst einem übergeordneten Standard unterliegt. Er ist sein eigener Rahmen.

---

## Offene Punkte

| Punkt | Beschreibung | Vorgesehen in |
|-------|-------------|---------------|
| Governance-Instanz | Wer entscheidet final über Standardänderungen? | NW-GOV-001 |
| Automatisierte Compliance-Prüfung | Wie werden Standards maschinell geprüft? | NW-GOV-001 |
| Archivierungsfristen | Wie lange bleiben archivierte Standards erhalten? | NW-STD-014 |

---

## Kapitel 1 — Grundprinzipien

### 1.1 Standards schaffen Orientierung

Ein Standard beschreibt einen verbindlichen Weg durch bekannte Komplexität. Er ersetzt individuelle Entscheidungen dort, wo Konsistenz wichtiger ist als Kreativität. Wer einem Standard folgt, muss dieselbe Frage nicht erneut lösen.

### 1.2 Standards reduzieren Komplexität

Jede Entscheidung, die einmal als Standard festgehalten wurde, muss nicht mehr diskutiert werden. Standards verwandeln wiederkehrende Abwägungen in verlässliche Regeln. Das entlastet alle Beteiligten und beschleunigt die Entwicklung.

### 1.3 Standards ermöglichen Automatisierung

Ein Standard ist erst vollständig, wenn er testbar ist. Regeln, die nicht geprüft werden können, sind Empfehlungen. Standards müssen so formuliert sein, dass Werkzeuge — heute oder in Zukunft — prüfen können, ob sie eingehalten werden.

### 1.4 Standards sind langfristig stabil

Ein Standard, der sich häufig ändert, schafft kein Vertrauen. Einmal veröffentlichte Standards werden nicht leichtfertig geändert. Änderungen werden begründet, versioniert und kommuniziert. Rückwärtskompatibilität hat Vorrang.

### 1.5 Standards sind fachlich begründet

Jede Regel in einem Standard hat eine fachliche Begründung. Regeln ohne Begründung werden nicht aufgenommen. Wenn die Begründung entfällt, entfällt auch die Regel.

### 1.6 Standards dürfen sich nicht widersprechen

Zwei Standards, die denselben Sachverhalt unterschiedlich regeln, schaffen mehr Probleme als sie lösen. Widersprüche zwischen Standards sind Fehler. Sie werden durch Änderungsanträge aufgelöst, nicht durch informelle Auslegung.

### 1.7 Standards sind kein Selbstzweck

Ein Standard existiert, weil er einen konkreten Nutzen schafft. Standards, die keinen nachweisbaren Nutzen mehr haben, werden mit `deprecated` markiert und gegebenenfalls archiviert.

---

## Kapitel 2 — Arten von Standards

NeuroWays-Standards werden in sieben Kategorien unterteilt. Jede Kategorie hat eine eigene Aufgabe und einen eigenen Nummerierungsbereich.

### 2.1 Core Standards (`NW-STD-000` bis `NW-STD-009`)

Regeln das Fundament aller anderen Standards. Definieren Begriffe, Strukturen und Rahmen, auf die alle anderen Standards aufbauen.

| Code | Titel | Status |
|------|-------|--------|
| NW-STD-000 | Standards Framework Standard | draft |
| NW-STD-001 | Naming Standard | draft |

Eigenschaften: verpflichtend für alle Module, keine Abhängigkeit von anderen Standards außer NW-STD-000.

### 2.2 Technical Standards (`NW-STD-010` bis `NW-STD-029`)

Regeln technische Implementierungsdetails: Datenbanken, APIs, Schnittstellen, Datenhaltung.

| Geplanter Code | Vorläufiger Titel |
|---------------|-------------------|
| NW-STD-010 | Versioning Standard |
| NW-STD-011 | API Standard |
| NW-STD-012 | Security Standard |
| NW-STD-013 | Lifecycle Standard |

Eigenschaften: verpflichtend für technische Implementierungen, optional für rein dokumentarische Systeme.

### 2.3 Development Standards (`NW-STD-030` bis `NW-STD-049`)

Regeln Entwicklungsprozesse: Quelltext, Tests, Abhängigkeiten, Deployment.

| Geplanter Code | Vorläufiger Titel |
|---------------|-------------------|
| NW-STD-030 | Coding Standard |
| NW-STD-031 | Testing Standard |
| NW-STD-032 | Dependency Standard |

Eigenschaften: verpflichtend für aktiv entwickelte Module, empfohlen für Drittintegration.

### 2.4 Design Standards (`NW-STD-050` bis `NW-STD-069`)

Regeln gestalterische Qualität: Designsystem, Weltbild, Illustrationen, Typografie.

| Geplanter Code | Vorläufiger Titel |
|---------------|-------------------|
| NW-STD-050 | Design System Standard |
| NW-STD-051 | Accessibility Standard |
| NW-STD-052 | Asset Standard |

Eigenschaften: verpflichtend für alle nutzerorientierten Schnittstellen.

### 2.5 Documentation Standards (`NW-STD-070` bis `NW-STD-089`)

Regeln, wie NeuroWays-Inhalte geschrieben, strukturiert und gepflegt werden.

| Geplanter Code | Vorläufiger Titel |
|---------------|-------------------|
| NW-STD-070 | Document Standard |
| NW-STD-071 | Changelog Standard |
| NW-STD-072 | API Documentation Standard |

Eigenschaften: verpflichtend für alle veröffentlichten Dokumente.

### 2.6 Quality Standards (`NW-STD-090` bis `NW-STD-099`)

Regeln Qualitätssicherung, Audits und Compliance.

| Geplanter Code | Vorläufiger Titel |
|---------------|-------------------|
| NW-STD-090 | Audit Standard |
| NW-STD-091 | Compliance Standard |

Eigenschaften: empfohlen für alle Module, verpflichtend bei externen Partnerschaften.

### 2.7 Governance Standards (`NW-GOV-001` bis `NW-GOV-099`)

Regeln organisatorische Abläufe: Entscheidungsfindung, Rollen, Verantwortlichkeiten. Verwenden ein separates Präfix `GOV`, da sie außerhalb der technischen Standardhierarchie stehen.

| Geplanter Code | Vorläufiger Titel |
|---------------|-------------------|
| NW-GOV-001 | Standards Governance |
| NW-GOV-002 | Change Management |

Eigenschaften: gelten für alle Beteiligten, unabhängig von Rolle oder Modul.

### 2.8 Future Standards (Platzhalter)

Standards, die als notwendig erkannt, aber noch nicht entwickelt wurden, erhalten einen Platzhalter-Eintrag im Standardregister. Sie haben den Status `planned`. Platzhalter reservieren die Nummer, enthalten aber noch keinen inhaltlichen Standard.

---

## Kapitel 3 — Nummerierung

### 3.1 Schema

```
NW-<KATEGORIE>-<NUMMER>
```

| Bestandteil | Format | Bedeutung |
|-------------|--------|-----------|
| `NW` | Fest | NeuroWays-Präfix, immer |
| `KATEGORIE` | `STD`, `GOV`, `COR`, `DSN` | Standardkategorie |
| `NUMMER` | Dreistellig, nullaufgefüllt | Fortlaufend pro Kategorie |

Beispiele: `NW-STD-000`, `NW-STD-001`, `NW-GOV-001`, `NW-DSN-001`

### 3.2 Vergaberegeln

- Nummern werden dauerhaft vergeben. Sie erlöschen nie, auch wenn der Standard archiviert wird.
- Keine Wiederverwendung. Eine archivierte Nummer bleibt archiviert.
- Keine Umnummerierung. Ein einmal vergebener Code ist dauerhaft der Code dieses Standards.
- Lücken sind erlaubt. Zwischen `NW-STD-011` und `NW-STD-013` darf `NW-STD-012` reserviert sein, auch wenn noch kein Inhalt existiert.

### 3.3 Vergabeprozess

Neue Nummern werden im zentralen Standardregister eingetragen, bevor der erste Entwurf eines Standards beginnt. Das Register verhindert doppelte Vergabe.

---

## Kapitel 4 — Aufbau eines Standards

Jeder NeuroWays-Standard enthält genau diese Abschnitte in dieser Reihenfolge:

| Nr. | Abschnitt | Pflicht | Inhalt |
|-----|-----------|---------|--------|
| 1 | Dokumentkopf | ✅ | Code, Titel, Version, Status, Datum, Verantwortlicher |
| 2 | Änderungsverlauf | ✅ | Tabellarische Versionshistorie |
| 3 | Referenzen | ✅ | Andere Standards, auf die verwiesen wird |
| 4 | Geltungsbereich | ✅ | Für wen und was dieser Standard gilt |
| 5 | Offene Punkte | ✅ | Bewusst offengelassene Fragen mit Verweis auf Folgedokument |
| 6–N | Kapitel | ✅ | Fachlicher Inhalt (standardspezifisch) |
| N+1 | Definitionen | ✅ | Begriffe, die dieser Standard einführt oder präzisiert |
| N+2 | Ausnahmen | ✅ | Dokumentierte, begründete Ausnahmen von den Regeln |
| N+3 | Qualitätsprüfung | ✅ | Kriterien, anhand derer Konformität geprüft werden kann |
| N+4 | Kritische Selbstbewertung | ✅ | Bekannte Schwachstellen zum Zeitpunkt der Erstellung |

### 4.1 Dokumentkopf-Pflichtfelder

```
Dokumentcode:    NW-STD-XXX
Version:         1.0.0
Status:          draft | review | approved | published | superseded | archived
Erstellt:        YYYY-MM-DD
Gültig ab:       YYYY-MM-DD oder "nach Freigabe"
Verantwortlich:  [Person oder Team]
Ablöst:          [Vorgängerstandard oder –]
Abgelöst durch:  [Nachfolgestandard oder –]
```

### 4.2 Kapitelbezeichnungen

Kapitelbezeichnungen sind englisch oder deutsch, konsistent innerhalb eines Standards. Kapitel werden nummeriert (1, 2, 3 … oder 1.1, 1.2 …). Anhänge erhalten Buchstaben (A, B, C …).

---

## Kapitel 5 — Lebenszyklus

### 5.1 Statuswerte

| Status | Bedeutung | Fachliche Inhalte änderbar? |
|--------|-----------|----------------------------|
| `draft` | In Erstellung, interne Arbeitsfassung | ✅ Ja |
| `review` | Zur Prüfung eingereicht, kein neuer Inhalt | ⚠️ Nur Korrekturen |
| `approved` | Inhaltlich freigegeben, vor Aktivierung | ❌ Nein |
| `published` | Aktiv und verbindlich | ❌ Nein |
| `superseded` | Durch neuere Version abgelöst | ❌ Nein |
| `archived` | Historisch aufbewahrt, nicht mehr anwendbar | ❌ Nein |

### 5.2 Zulässige Statusübergänge

```
draft ──→ review ──→ approved ──→ published ──→ superseded ──→ archived
  ↑            │
  └────────────┘  (zurück zu draft bei Ablehnung in review)
```

Explizit nicht zulässig:

- `published` → `draft` (Änderungen erzeugen eine neue Version)
- `archived` → jeder andere Status (Archive sind permanent)
- Überspringen von `review` und `approved` (außer bei Patch-Versionen mit vereinfachtem Prozess)

### 5.3 Patch-Ausnahme

Rein redaktionelle Korrekturen (Tippfehler, Formatierung ohne inhaltliche Änderung) dürfen mit Patch-Version direkt von `draft` zu `published` übergehen, sofern ein Reviewer die Änderung bestätigt.

### 5.4 Rückzug eines Standards

Ein Standard kann zurückgezogen werden, wenn:

- sein Geltungsbereich entfällt
- er durch zwei oder mehr andere Standards vollständig ersetzt wird
- seine Weiterführung mehr Schaden als Nutzen bringt

Rückzug folgt dem Weg: `published` → `superseded` → `archived`.

---

## Kapitel 6 — Versionierung

### 6.1 Format

Alle Standards verwenden Semver (`MAJOR.MINOR.PATCH`):

```
1.0.0   Erstveröffentlichung
1.1.0   Rückwärtskompatible Erweiterung
1.1.1   Redaktionelle Korrektur
2.0.0   Inkompatible Änderung
```

### 6.2 Wann welche Version

| Änderungsart | Version | Beispiel |
|-------------|---------|---------|
| Neue Regel ohne Widerspruch zu bestehenden | MINOR | `1.1.0` |
| Neues Kapitel ohne Widerspruch | MINOR | `1.1.0` |
| Geänderter Statuswert oder Übergang | MAJOR | `2.0.0` |
| Entfernte Regel | MAJOR | `2.0.0` |
| Widerspruchsauflösung mit Regeländerung | MAJOR | `2.0.0` |
| Tippfehlerkorrektur | PATCH | `1.0.1` |
| Formatierungsanpassung | PATCH | `1.0.1` |
| Neues Beispiel ohne Regeländerung | PATCH | `1.0.1` |

### 6.3 Versionshistorie

Jede Version wird im Änderungsverlauf eines Standards dokumentiert. Keine Version wird still überschrieben. Die vollständige Versionsgeschichte bleibt im Dokument erhalten.

### 6.4 Verweis auf NW-STD-010

Die detaillierten Regeln zur Versionierung — insbesondere Rückwärtskompatibilitätsversprechen, Deprecation-Fristen und die Kommunikation von MAJOR-Änderungen — werden im Versioning Standard (NW-STD-010) geregelt. Dieser Standard greift diesen Themen nicht vor.

---

## Kapitel 7 — Abhängigkeiten

### 7.1 Referenzierungsregeln

Ein Standard darf andere Standards referenzieren. Referenzierungen werden im Abschnitt „Referenzen" am Dokumentanfang gelistet.

Arten von Referenzen:

| Art | Bedeutung | Beispiel |
|-----|-----------|---------|
| `normativ` | Referenzierter Standard ist zur Konformität erforderlich | NW-STD-001 ist normativ für alle Collections |
| `informativ` | Referenzierter Standard dient als Hintergrundlektüre | NW-STD-010 informiert über Semver |
| `geplant` | Referenzierter Standard existiert noch nicht | NW-STD-014 (Lifecycle) |

### 7.2 Zirkuläre Abhängigkeiten

Zirkuläre Abhängigkeiten zwischen Standards sind unzulässig:

```
Verboten:   NW-STD-A referenziert NW-STD-B  (normativ)
            NW-STD-B referenziert NW-STD-A  (normativ)
```

Erlaubt: Zwei Standards referenzieren denselben dritten Standard unabhängig voneinander.

### 7.3 Sonderstellung von NW-STD-000

NW-STD-000 ist der einzige Standard, der von allen anderen normativ referenziert werden darf, ohne selbst eine Abhängigkeit zu erzeugen. NW-STD-000 referenziert keine anderen Standards normativ.

### 7.4 Abhängigkeitsgraph

Der vollständige Abhängigkeitsgraph aller NeuroWays-Standards wird im Standardregister geführt. Er wird bei jeder neuen Standardversion aktualisiert. Zirkuläre Abhängigkeiten werden vor der Veröffentlichung geprüft.

---

## Kapitel 8 — Geltungsbereich und Verbindlichkeit

### 8.1 Verpflichtende Standards

Ein Standard ist verpflichtend, wenn er:

- im Dokumentkopf als `verpflichtend` markiert ist, oder
- von einem übergeordneten Standard normativ referenziert wird

Verpflichtende Standards gelten ohne Ausnahme, sofern keine dokumentierte Ausnahme vorliegt (Kapitel 8.3).

### 8.2 Optionale Standards

Ein Standard ist optional, wenn er:

- Best Practices beschreibt, aber keine zwingenden Regeln enthält
- für einen Anwendungsbereich gilt, der nicht zwingend für alle Module ist
- im Dokumentkopf als `empfohlen` markiert ist

### 8.3 Ausnahmen

Eine Ausnahme von einem verpflichtenden Standard muss:

1. Schriftlich begründet sein
2. Im Ausnahmen-Abschnitt des betroffenen Standards oder in einem separaten Ausnahmedokument festgehalten sein
3. Einen Gültigkeitszeitraum haben (keine dauerhaften Ausnahmen ohne Überprüfung)
4. Von der verantwortlichen Instanz freigegeben sein

Undokumentierte Abweichungen von verpflichtenden Standards gelten als Konformitätsverstöße.

### 8.4 Neue Module

Jedes neue NeuroWays-Modul muss vor Veröffentlichung prüfen, welche Standards für es gelten. Die Prüfung wird dokumentiert. Core Standards und Technical Standards sind für alle neuen Module verpflichtend.

---

## Kapitel 9 — Erweiterbarkeit

### 9.1 Neuen Standard erstellen

Ein neuer Standard entsteht durch folgenden Prozess:

1. **Bedarf identifizieren** — Welches Problem löst dieser Standard? Ist es durch bestehende Standards nicht bereits geregelt?
2. **Nummer reservieren** — Eintrag im Standardregister, Status `planned`
3. **Entwurf erstellen** — Vollständige Kapitelstruktur nach Kapitel 4 dieses Standards
4. **Interne Prüfung** — Prüfung auf Vollständigkeit, Widersprüche und Abhängigkeiten
5. **Review** — Status `review`
6. **Freigabe** — Status `approved`, dann `published`

### 9.2 Bestehenden Standard erweitern

Erweiterungen eines veröffentlichten Standards:

- MINOR-Erweiterung: Neues Kapitel, neue Regel (kein Widerspruch) → Neue MINOR-Version
- MAJOR-Änderung: Bestehende Regel geändert oder entfernt → Neue MAJOR-Version + Migrationspfad

### 9.3 Veralteten Standard ersetzen

Wenn ein Standard vollständig durch einen oder mehrere neue Standards ersetzt wird:

1. Neuen Standard veröffentlichen (`published`)
2. Alten Standard auf `superseded` setzen, `superseded_by` eintragen
3. Übergangszeit definieren (mindestens eine Major-Version lang parallel gültig)
4. Alten Standard nach Ablauf auf `archived` setzen

### 9.4 Rückwärtskompatibilität

Veröffentlichte Standards geben das Versprechen, dass:

- PATCH-Versionen keine inhaltlichen Änderungen enthalten
- MINOR-Versionen keine bestehenden Regeln entfernen
- MAJOR-Versionen einen Migrationspfad beschreiben

---

## Kapitel 10 — Qualitätsanforderungen

Ein Standard, der zur Veröffentlichung eingereicht wird, muss folgende Kriterien erfüllen:

### 10.1 Eindeutigkeit

Jede Regel erlaubt genau eine Interpretation. Formulierungen wie „sollte", „kann" oder „in der Regel" sind nur erlaubt, wenn bewusst eine Empfehlung ausgedrückt wird. Verpflichtende Regeln verwenden „muss" oder „ist".

### 10.2 Vollständigkeit

Alle Abschnitte aus Kapitel 4 sind vorhanden. Kein Abschnitt ist leer. Offene Punkte sind explizit als solche markiert.

### 10.3 Widerspruchsfreiheit

Der Standard widerspricht sich nicht selbst und widerspricht keinem anderen veröffentlichten Standard. Widersprüche werden vor Freigabe aufgelöst.

### 10.4 Testbarkeit

Jede verpflichtende Regel lässt sich mit einem Beispiel testen: „Wenn Bedingung X gilt, dann ist Y konform und Z nicht konform." Regeln, die keine Beispiele haben, sind nicht testbar und werden nicht aufgenommen.

### 10.5 Nachvollziehbarkeit

Jede Regel hat eine fachliche Begründung. „Weil wir es immer so gemacht haben" ist keine fachliche Begründung.

### 10.6 Versionierbarkeit

Der Standard kann geändert werden, ohne seinen Code oder seine Identität zu verlieren. Alle zukünftigen Versionen bauen auf der ersten auf.

---

## Kapitel 11 — Beziehungen zwischen Standards

### 11.1 Beziehungsdiagramm

```
NW-STD-000 (Framework Standard)
├── NW-STD-001 (Naming Standard)         ← normativ für alle Collections
├── NW-STD-010 (Versioning Standard)     ← normativ für alle Versionierungen
├── NW-STD-003 (Database Standard)       ← normativ für alle Datenbanken
│   └── referenziert NW-STD-001
├── NW-STD-011 (API Standard)            ← normativ für alle Schnittstellen
│   ├── referenziert NW-STD-001
│   └── referenziert NW-STD-010
├── NW-STD-013 (Security Standard)       ← normativ für alle Module
├── NW-STD-014 (Lifecycle Standard)      ← normativ für alle Objekte
│   └── referenziert NW-STD-010
├── NW-STD-050 (Design System Standard)  ← normativ für UI
│   └── referenziert NW-DSN-001
└── NW-STD-051 (Accessibility Standard)  ← normativ für UI
    └── referenziert NW-STD-050
```

### 11.2 Beziehungstypen

| Typ | Bedeutung |
|-----|-----------|
| `normativ referenziert` | Zur Konformität mit Standard A muss Standard B eingehalten werden |
| `informativ referenziert` | Standard B liefert Hintergrundwissen für Standard A |
| `spezialisiert` | Standard B ist eine Vertiefung eines Teilaspekts von Standard A |
| `ersetzt` | Standard B löst Standard A ab |

### 11.3 Sonderfall NW-DSN-001

Der World Design Standard (NW-DSN-001) wurde vor der Einführung von NW-STD-000 entwickelt. Er gilt inhaltlich als konform, verwendet aber eine abweichende Dokumentstruktur. Bei der nächsten MINOR-Überarbeitung wird er an die Struktur aus Kapitel 4 dieses Standards angepasst.

---

## Kapitel 12 — Beispiele

### 12.1 Gültige Standards (✅)

| Beispiel | Begründung |
|---------|-----------|
| NW-STD-000 enthält alle Pflichtabschnitte aus Kapitel 4 | Vollständig nach eigenem Standard |
| NW-STD-001 referenziert NW-STD-000 normativ | Korrekte einseitige Abhängigkeit |
| NW-STD-001 v1.1.0 fügt neues Kapitel hinzu ohne Regeländerung | MINOR-Update korrekt |
| NW-STD-003 v2.0.0 entfernt veraltete Feldkonvention und dokumentiert Migrationspfad | MAJOR-Update korrekt |
| NW-STD-012 hat Status `superseded`, weil NW-STD-012b es ersetzt | Korrekter Statusübergang |
| NW-GOV-001 hat Präfix `GOV`, nicht `STD` | Governance-Standard korrekt getrennt |
| NW-STD-050 ist als `optional` für rein backend-seitige Module markiert | Scope korrekt eingeschränkt |
| Ausnahme von NW-STD-001 ist schriftlich begründet mit Ablaufdatum | Ausnahme korrekt dokumentiert |
| NW-STD-032 hat Status `planned` im Register, aber noch kein Dokument | Nummer reserviert, Prozess korrekt |
| NW-STD-001 v1.0.1 korrigiert Tippfehler ohne Inhalt zu ändern | PATCH korrekt |

### 12.2 Ungültige Standards (❌)

| Beispiel | Fehler | Korrekt |
|---------|--------|---------|
| NW-STD-042 wird ohne Registereintrag erstellt | Nummer nicht reserviert | Register-Eintrag zuerst |
| NW-STD-A referenziert NW-STD-B, NW-STD-B referenziert NW-STD-A (normativ) | Zirkuläre Abhängigkeit | Abhängigkeit neu gestalten |
| NW-STD-015 hat keinen Änderungsverlauf | Pflichtabschnitt fehlt | Abschnitt ergänzen |
| NW-STD-020 ändert eine Regel ohne Versionserhöhung | Stille Änderung | MINOR- oder MAJOR-Version |
| NW-STD-001 v2.0.0 entfernt Regeln ohne Migrationspfad | MAJOR ohne Übergang | Migrationsdokument ergänzen |
| Ausnahme von NW-STD-003 ohne Begründung und ohne Ablaufdatum | Undokumentierte Ausnahme | Ausnahmedokument erstellen |
| NW-STD-001 und NW-STD-003 regeln denselben Sachverhalt widersprüchlich | Konflikt | Einen Standard ändern |
| NW-STD-005 hat Status `published` aber der Geltungsbereich ist leer | Unvollständig | Review erneut starten |
| NW-STD-017 enthält nur Empfehlungen ohne testbare Regeln | Nicht testbar | Regeln mit Beispielen ergänzen |
| NW-STD-001 wird auf Nummer NW-STD-099 umnummeriert | Nummernänderung verboten | Ursprüngliche Nummer behalten |

### 12.3 Typische Erweiterungen (✅)

| Erweiterung | Art | Vorgehen |
|------------|-----|---------|
| NW-STD-001 erhält neuen Abschnitt für Multilingualität | MINOR | Neues Kapitel, Nummer `1.1.0` |
| NW-STD-003 ersetzt Feldtyp-Konvention | MAJOR | Neue Version `2.0.0`, Migrationspfad |
| NW-STD-000 korrigiert Tippfehler in Kapitel 5 | PATCH | Version `1.0.1`, kein Reviewprozess |
| Neues Modul NW-STD-060 für Sound-Assets | Neu | Nummer reservieren, Prozess aus Kapitel 9.1 |
| NW-STD-014 wird durch NW-STD-014a und NW-STD-014b ersetzt | Ablösung | STD-014 → `superseded`, neue Standards `published` |

---

## Kapitel 13 — Standards-Roadmap

### 13.1 Legende

| Symbol | Bedeutung |
|--------|-----------|
| ✅ | Vorhanden (draft oder höher) |
| 🔄 | In aktiver Entwicklung |
| 📋 | Geplant, Bedarf erkannt |
| 💡 | Erwogen, noch nicht entschieden |

### 13.2 Core Standards (höchste Priorität)

| Code | Titel | Status |
|------|-------|--------|
| NW-STD-000 | Standards Framework Standard | ✅ draft |
| NW-STD-001 | Naming Standard | ✅ draft |
| NW-STD-002 | Register der Standards und Nummern | 📋 |
| NW-STD-003 | Database Standard | ✅ draft |

### 13.3 Technical Standards

| Code | Titel | Status | Empfohlen nach |
|------|-------|--------|----------------|
| NW-STD-010 | Versioning Standard | 📋 | NW-STD-000 + NW-STD-001 |
| NW-STD-011 | API Standard | 📋 | NW-STD-001 + NW-STD-010 |
| NW-STD-012 | Security Standard | 📋 | NW-STD-011 |
| NW-STD-013 | Lifecycle Standard | 📋 | NW-STD-010 |
| NW-STD-014 | Lifecycle Standard | 📋 | NW-STD-010 |

### 13.4 Development Standards

| Code | Titel | Status | Empfohlen nach |
|------|-------|--------|----------------|
| NW-STD-030 | Coding Standard | 📋 | NW-STD-001 |
| NW-STD-031 | Testing Standard | 📋 | NW-STD-030 |
| NW-STD-032 | Dependency Standard | 💡 | NW-STD-030 |

### 13.5 Design Standards

| Code | Titel | Status | Empfohlen nach |
|------|-------|--------|----------------|
| NW-DSN-001 | World Design Standard | ✅ published | — |
| NW-STD-050 | Design System Standard | 📋 | NW-DSN-001 + NW-STD-001 |
| NW-STD-051 | Accessibility Standard | 📋 | NW-STD-050 |
| NW-STD-052 | Asset Standard | 📋 | NW-STD-050 + NW-STD-001 |

### 13.6 Documentation Standards

| Code | Titel | Status | Empfohlen nach |
|------|-------|--------|----------------|
| NW-STD-070 | Document Standard | 📋 | NW-STD-000 + NW-STD-001 |
| NW-STD-071 | Changelog Standard | 💡 | NW-STD-070 + NW-STD-010 |

### 13.7 Quality und Governance

| Code | Titel | Status | Empfohlen nach |
|------|-------|--------|----------------|
| NW-STD-090 | Audit Standard | 📋 | NW-STD-000 |
| NW-GOV-001 | Standards Governance | 📋 | NW-STD-000 |
| NW-GOV-002 | Change Management | 💡 | NW-GOV-001 |

### 13.8 Empfohlene Entwicklungsreihenfolge

```
Phase 1 — Fundament (jetzt)
  NW-STD-000  ✅
  NW-STD-001  ✅
  NW-STD-002  → Standardregister (dringend, ohne dieses fehlt Nummerngouvernanz)

Phase 2 — Technische Grundlage
  NW-STD-010  → Versioning (Abhängigkeit für fast alle anderen)
  NW-STD-011  → API (vor erster externer Integration)
  NW-STD-012  → Security

Phase 3 — Qualität und Sicherheit
  NW-STD-013  → Security
  NW-STD-014  → Lifecycle
  NW-STD-090  → Audit

Phase 4 — Gestaltung und Entwicklung
  NW-STD-050  → Design System
  NW-STD-051  → Accessibility
  NW-STD-030  → Coding

Phase 5 — Dokumentation und Governance
  NW-STD-070  → Document Standard
  NW-GOV-001  → Governance
```

---

## Definitionen

| Begriff | Definition |
|---------|-----------|
| **Standard** | Ein verbindliches, versioniertes Dokument, das Regeln für einen bestimmten Bereich des NeuroWays-Systems festlegt |
| **Konformität** | Der Zustand, in dem ein Objekt, Prozess oder Dokument alle verpflichtenden Regeln eines Standards erfüllt |
| **Normative Referenz** | Eine Referenz, die zur Konformität eingehalten werden muss |
| **Informative Referenz** | Eine Referenz, die als Hintergrundlektüre dient, aber nicht eingehalten werden muss |
| **Ausnahme** | Eine dokumentierte, begründete und zeitlich begrenzte Abweichung von einer verpflichtenden Regel |
| **Platzhalter** | Ein reservierter Standardcode ohne Inhalt, Status `planned` |
| **Standardregister** | Zentrales Verzeichnis aller vergebenen Standardnummern |
| **Migrationspfad** | Dokumentierter Weg, wie bestehende Implementierungen von einer MAJOR-Version auf eine neue migriert werden |

---

## Ausnahmen

Keine Ausnahmen bei Erstveröffentlichung.

---

## Qualitätsprüfung

| Kriterium | Prüfmethode | Bestanden |
|-----------|------------|-----------|
| Alle Pflichtabschnitte vorhanden (Kapitel 4) | Abschnittsprüfung | ✅ |
| Keine zirkulären Abhängigkeiten | Abhängigkeitsgraph | ✅ |
| Statusübergänge vollständig definiert | Kapitel 5 | ✅ |
| Versionierungsregeln mit Beispielen | Kapitel 6 | ✅ |
| Mindestens 20 Beispiele mit Begründung | Kapitel 12 | ✅ (25) |
| Roadmap vorhanden | Kapitel 13 | ✅ |
| Kritische Selbstbewertung vorhanden | Nächster Abschnitt | ✅ |

---

## Kritische Selbstbewertung

### Stärken

- Vollständige Abdeckung aller zwölf angeforderten Kapitel
- Klares Governance-Modell mit Statusübergängen und Versionierungsregeln
- Sonderstellung von NW-STD-000 klar begründet
- Roadmap mit priorisierten Phasen
- 25 kommentierte Beispiele

### Dokumentierte Schwachstellen

**1. Keine Governance-Instanz benannt**
Kapitel 8.3 erwähnt „verantwortliche Instanz", ohne diese zu benennen. Wer entscheidet, ob eine Ausnahme genehmigt wird? Wer kann einen Standard von `review` auf `approved` setzen? → Folgedokument: NW-GOV-001.

**2. Standardregister existiert noch nicht**
NW-STD-002 ist `planned`, aber ohne dieses Register gibt es keine Garantie, dass Nummern eindeutig vergeben werden. Das ist die kritischste Lücke im gesamten Standards-System. → Höchste Priorität nach diesem Dokument.

**3. Übergangsregeln für NW-DSN-001**
Der World Design Standard folgt nicht der Struktur aus Kapitel 4 dieses Standards. Kapitel 11.3 erklärt das, aber nennt keinen konkreten Zeitplan für die Anpassung.

**4. Kein automatisierter Compliance-Check**
Standards beschreiben Regeln, aber es gibt kein Werkzeug, das prüft, ob neue Standards diesen Regeln folgen. Dieser Standard selbst könnte gegen NW-STD-000 verstoßen — und niemand würde es automatisch merken.

**5. Englisch vs. Deutsch in Kapitelbezeichnungen**
Kapitel 4.2 erlaubt Englisch oder Deutsch, „konsistent innerhalb eines Standards". NW-STD-000 selbst verwendet Deutsch. NW-STD-001 verwendet ebenfalls Deutsch. Das ist intern konsistent, aber die Regelformulierung lässt Interpretationsspielraum.

### Gesamtbewertung

**NW-STD-000 ist verabschiedungsfähig als Version 1.0.0 mit dem Status `review`.**

Die Bootstrap-Phase endet eindeutig und einmalig, wenn NW-STD-002 von mindestens zwei Personen des NeuroWays Core Teams schriftlich freigegeben wurde und der Status im Dokument auf `published` gesetzt ist — ohne Abhängigkeit von NW-GOV-001. Die Bootstrap-Phase kann danach niemals erneut aktiviert werden. Schwachstelle 1 (Governance-Instanz) muss mittelfristig durch NW-GOV-001 geschlossen werden.

---

*NW-STD-000 — NeuroWays Standards Framework Standard v1.0.1 — Status: published — Veröffentlicht 2026-07-23*
