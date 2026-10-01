# NW-KAS-001 — NeuroWays Knowledge Asset Standard

**Dokumentcode:** NW-KAS-001  
**Version:** 1.0.0  
**Status:** draft  
**Erstellt:** 2026-07-23  
**Gültig ab:** nach Freigabe  
**Verantwortlich:** NeuroWays Core  
**Hierarchie:** Wissensarchitektur-Standard — referenziert NW-STD-000 normativ, NW-STD-001 normativ, NW-STD-003 normativ  
**Ablöst:** –  
**Abgelöst durch:** –

---

## Änderungsverlauf

| Version | Datum | Änderung | Autor |
|---------|-------|----------|-------|
| 1.0.0 | 2026-07-23 | Erstfassung | NeuroWays Core |

---

## Referenzen

| Dokument | Titel | Art |
|---------|-------|-----|
| NW-STD-000 | Standards Framework Standard | normativ |
| NW-STD-001 | Naming Standard | normativ |
| NW-STD-002 | Standards Registry Standard | informativ |
| NW-STD-003 | Database Standard | normativ |
| NW-DSN-001 | World Design Standard | informativ |
| NW-STD-010 | Versioning Standard | informativ (geplant) |

---

## Geltungsbereich

Dieser Standard gilt für alle Wissensobjekte innerhalb des NeuroWays-Systems, die fachliche Bedeutung tragen und aus denen mediale Ausgaben abgeleitet werden.

Er gilt für alle Module, Methoden und Produkte von NeuroWays:
- Energy Navigator und alle weiteren Methoden
- NeuroFlow, NeuroPlay, Flowisaurus
- Website, App, Workshops, Präsentationen
- Dokumentation, Social Media, KI-Anwendungen

Er regelt nicht die konkrete technische Implementierung. Er beschreibt das fachliche Modell und die Ableitungsregeln.

---

## Offene Punkte

| Punkt | Beschreibung | Vorgesehen in |
|-------|-------------|---------------|
| Datenbankmodell für Knowledge Assets | Konkrete Collections und Felder | NW-STD-003 v1.1.0 + Implementierungsdokument |
| KI-Prompt-Regeln | Wie Prompts aus Assets generiert werden | NW-KAS-002 (geplant) |
| Mehrsprachigkeit | Wie Assets in mehreren Sprachen gepflegt werden | NW-KAS-001 v1.1.0 |
| Versionierungsdetails | Semver-Regeln für Knowledge Assets | NW-STD-010 |

---

## Kapitel 1 — Vision

### 1.1 NeuroWays entwickelt kein Bildmaterial — NeuroWays entwickelt Wissen

Jedes Mal, wenn eine Organisation ein Bild erstellt und dabei das Wissen dahinter vergisst, entsteht Inhalt ohne Substanz. Das Bild kann schön sein. Aber es kann nicht erklärt werden. Es kann nicht übersetzt werden. Es kann nicht in einem anderen Format wiederverwendet werden. Es muss irgendwann erneut erstellt werden — für eine andere Plattform, eine andere Zielgruppe, ein anderes Medium.

NeuroWays wählt einen anderen Weg.

Der Ausgangspunkt ist niemals ein Bild, ein Text oder eine Seite. Der Ausgangspunkt ist ein **Knowledge Asset** — eine vollständige fachliche Beschreibung dessen, was ein Konzept bedeutet, wie es wirkt, wen es anspricht und was damit erreicht werden soll.

Aus diesem Wissen werden Bilder abgeleitet. Texte. App-Inhalte. Workshop-Unterlagen. Präsentationen. KI-Ausgaben.

Das Wissen selbst bleibt an einem Ort. Alle Ausgaben entstehen daraus.

### 1.2 Warum Inhalte niemals doppelt gepflegt werden

Ohne eine gemeinsame Wissensquelle entsteht Drift: Die App erklärt das Meer anders als die Website. Der Workshop verwendet andere Metaphern als die Präsentation. Die KI liefert Antworten, die nicht zur App passen.

Jede dieser Abweichungen kostet Vertrauen — beim Nutzenden, der merkt, dass etwas nicht ganz zusammenpasst.

Das Knowledge Asset ist die Antwort auf dieses Problem. Es ist die einzige autoritative Quelle für die fachliche Bedeutung eines Konzepts. Alle Medien werden aus ihm abgeleitet, nie neben ihm entwickelt.

Eine Änderung am Knowledge Asset propagiert sich — kontrolliert, versioniert — in alle Ausgaben. Keine Ausgabe kann sich verselbstständigen.

### 1.3 Was das für NeuroWays bedeutet

NeuroWays ist eine modulare Plattform für Selbstbeobachtung und persönliches Verstehen. Ihre Wirkung entsteht durch Konsistenz: Derselbe Begriff bedeutet in der App dasselbe wie im Workshop. Dasselbe Bild transportiert dieselbe Bedeutung auf der Website wie in der Präsentation.

Diese Konsistenz ist kein Zufall. Sie ist das Ergebnis einer sorgfältigen Wissensarchitektur.

Der Knowledge Asset Standard ist das Fundament dieser Architektur.

---

## Kapitel 2 — Definition

### 2.1 Was ist ein Knowledge Asset?

Ein Knowledge Asset ist die kleinste vollständige, wiederverwendbare Wissenseinheit innerhalb von NeuroWays.

**Vollständig** bedeutet: Es enthält alle Pflichtinformationen, die notwendig sind, um daraus eine Ausgabe in einem beliebigen Medium zu erstellen — ohne zusätzliches Nachfragen.

**Wiederverwendbar** bedeutet: Dasselbe Knowledge Asset kann in zehn verschiedenen Medien und für fünf verschiedene Zielgruppen verwendet werden, ohne dass sein Kern verändert wird.

**Wissenseinheit** bedeutet: Es beschreibt nicht, wie etwas aussieht, sondern was es bedeutet, warum es existiert und wie es wirkt.

Ein Knowledge Asset hat eine eindeutige Identität, eine stabile Version und einen definierten Lebenszyklus. Es gehört zu einem Bereich (z. B. NeuroWays World, Energy Navigator, Flowisaurus) und steht in Beziehung zu anderen Knowledge Assets.

### 2.2 Was ist kein Knowledge Asset?

| Objekt | Abgrenzung |
|--------|-----------|
| **Bild / Illustration** | Eine Ausgabe des Knowledge Assets — nicht das Asset selbst. Das Bild transportiert die Bedeutung, ist aber nicht die Bedeutung. |
| **Dokument** | Ein Dokument ist eine strukturierte Zusammenstellung von Inhalten. Es kann viele Knowledge Assets referenzieren. Ein einzelnes Knowledge Asset ist kein Dokument. |
| **Methode** | Eine Methode (z. B. Energy Navigator) ist ein strukturierter Prozess. Sie kann aus vielen Knowledge Assets bestehen, ist aber selbst keines. |
| **Modul** | Ein Modul (z. B. NeuroFlow) ist eine Produkteinheit. Es verwendet Knowledge Assets, ist aber selbst kein Wissenskonzept. |
| **Datenobjekt** | Ein Datenobjekt (z. B. ein Check-in-Datensatz) ist eine Transaktion. Es speichert Ereignisse, nicht Bedeutung. |
| **Standard** | Ein Standard (wie dieser) beschreibt Regeln, kein fachliches Konzept der NeuroWays-Welt. |

### 2.3 Merkmale eines Knowledge Assets im Überblick

- Es hat eine eindeutige ID und einen stabilen Code
- Es beschreibt ein einzelnes, klar abgegrenztes Konzept
- Es enthält die fachliche Bedeutung — unabhängig von Zielgruppe oder Medium
- Es ist versioniert und unveränderlich nach Veröffentlichung
- Es hat einen definierten Geltungsbereich (Einsatzbereich und Nicht-Einsatzbereich)
- Es steht in dokumentierten Beziehungen zu anderen Knowledge Assets
- Aus ihm werden mediale Ausgaben abgeleitet — niemals ist es selbst eine Ausgabe

---

## Kapitel 3 — Aufbau

Jedes Knowledge Asset enthält mindestens folgende Felder. Fehlende Pflichtfelder verhindern die Freigabe (Status kann nicht auf `published` gesetzt werden).

### 3.1 Pflichtfelder

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `asset_id` | text | Eindeutige, stabile ID — Format: `ENV-001`, `MTH-001` (Bereich + dreistellige Nummer) |
| `name` | text | Offizieller Name des Konzepts — kurz, eindeutig, auf Deutsch |
| `short_description` | text | Max. 160 Zeichen — prägnante Zusammenfassung des Konzepts |
| `full_description` | text | Vollständige fachliche Beschreibung — zielgruppenneutral, präzise |
| `psychological_meaning` | text | Wie wirkt dieses Konzept auf Menschen? Welche inneren Zustände beschreibt es? |
| `purpose` | text | Welches Ziel verfolgt dieses Knowledge Asset? Was soll durch es erreicht werden? |
| `use_cases` | text | In welchen Kontexten ist dieses Konzept anwendbar? |
| `non_use_cases` | text | In welchen Kontexten ist dieses Konzept ausdrücklich nicht anwendbar? |
| `relations` | json | Beziehungen zu anderen Knowledge Assets (siehe Kapitel 7) |
| `version` | text | Semver — z. B. `1.0.0` |
| `status` | text | draft, review, published, superseded, archived |
| `owner` | text | Verantwortlicher Bereich oder Person |

### 3.2 Optionale Felder

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `tags` | json | Thematische Schlagworte |
| `domain` | text | Zugehöriger Bereich (z. B. `world`, `method`, `flowisaurus`) |
| `target_groups` | json | Relevante Zielgruppen |
| `related_standards` | json | Verweise auf NeuroWays-Standards |
| `media_outputs` | json | Verweise auf erzeugte Medien (Illustrationen, Texte etc.) |
| `created_at` | date | Datum der Erstellung |
| `published_at` | date | Datum der Veröffentlichung |

### 3.3 ID-Schema

```
<BEREICH>-<DREISTELLIGE_NUMMER>

ENV    → NeuroWays World (Environment)
MTH    → Methoden
FLW    → Flowisaurus
NPL    → NeuroPlay
NFL    → NeuroFlow
GEN    → Generisch / bereichsübergreifend
```

Beispiele: `ENV-001` (Die Insel), `MTH-001` (Energy Navigator), `FLW-001` (Erster Flowisaurus-Begriff)

---

## Kapitel 4 — Medien

### 4.1 Grundsatz

Medien sind niemals das Knowledge Asset selbst. Sie sind **Ausgaben** des Knowledge Assets — Ableitungen für einen bestimmten Kanal, eine bestimmte Zielgruppe oder ein bestimmtes Format.

Das Knowledge Asset kann unverändert bleiben, während seine Ausgaben sich weiterentwickeln.

### 4.2 Erlaubte Ausgabetypen

| Ausgabetyp | Beschreibung | Beispiel |
|-----------|-------------|---------|
| `illustration` | Bildliche Darstellung des Konzepts | Zonenillustration „Insel" |
| `icon` | Vereinfachtes Symbol | Zonen-Icon für Navigation |
| `animation` | Bewegte Darstellung | Wasseranimation |
| `audio` | Klangliche Entsprechung | Klanglandschaft |
| `video` | Bewegtbild-Erklärung | Erklärvideo für Workshop |
| `website_text` | Beschreibung für Webseite | Landingpage-Absatz |
| `app_text` | Kurzbeschreibung für App | Ergebnistext nach Check-in |
| `workshop_text` | Ausführliche Erklärung für Workshop | Moderationsgrundlage |
| `faq_entry` | Frage-Antwort-Paar | „Was bedeutet die Insel?" |
| `dashboard_text` | Kompakter Hinweistext | Kurztext im Verlauf |
| `presentation_text` | Folientext | Slide-Beschreibung |
| `prompt` | KI-Generierungsauftrag | Bildgenerierungsprompt (nur final, freigegeben) |
| `social_media_text` | Formulierung für soziale Medien | Instagram-Caption |
| `flowisaurus_entry` | Erklärung im Flowisaurus-Stil | Kindgerechte Erklärung |

### 4.3 Ausgaben sind versioniert

Wenn sich das Knowledge Asset ändert, erhalten alle Ausgaben eine neue Version. Bestehende Ausgaben bleiben erhalten und werden nicht automatisch aktualisiert — das erfolgt kontrolliert.

### 4.4 Ausgaben sind zielgruppenadaptiert

Dieselbe fachliche Wahrheit wird für verschiedene Zielgruppen unterschiedlich formuliert. Die Ausgabe verändert Sprache, Tiefe und Ton — niemals die Bedeutung. Bedeutungsänderungen erfordern eine neue Version des Knowledge Assets selbst.

---

## Kapitel 5 — Illustrationen

### 5.1 Wie Illustrationen aus einem Knowledge Asset entstehen

Eine Illustration entsteht nicht aus einem kreativen Impuls heraus. Sie entsteht aus der präzisen Beschreibung dessen, was ein Konzept bedeutet — in der `full_description`, der `psychological_meaning` und einer gesonderten `illustration_description`.

#### Der Ableitungsprozess

```
Knowledge Asset
  ↓ full_description
  ↓ psychological_meaning
  ↓ illustration_description
Illustrationsbriefing
  ↓ Übersetzung in Visualisierungssprache
  ↓ Prüfung gegen NW-DSN-001 (Designstandard)
  ↓ Freigabe
Prompt (gesondert gespeichert, nicht im Asset)
  ↓ Generierung / Erstellung
  ↓ Qualitätsprüfung
Illustration
  ↓ Speicherung als Asset-Datei (AST_ASSET_FILES)
  ↓ Verknüpfung mit Knowledge Asset
```

### 5.2 Illustrationsbeschreibung im Knowledge Asset

Jedes Knowledge Asset, das eine Illustration erhalten soll, enthält eine `illustration_description`:

- Was ist im Bild zu sehen? (Landschaft, Elemente, Stimmung)
- Welche Farben dominieren? (Verweis auf NW-DSN-001 Zonenfarben)
- Welches Gefühl soll das Bild auslösen?
- Was ist ausdrücklich nicht zu sehen? (kein Text, keine Personen etc.)
- Wie verhält sich dieses Bild zu anderen Illustrationen im Panorama?

Diese Beschreibung ist menschenlesbar. Sie ist keine technische Spezifikation.

### 5.3 Trennung von Beschreibung und Prompt

Die `illustration_description` im Knowledge Asset beschreibt, was sichtbar sein soll — in der Sprache der Bedeutung.

Der Prompt (gespeichert in `AST_ASSET_PROMPTS`) übersetzt diese Beschreibung in die technische Sprache eines KI-Systems. Prompts sind separate, versionierte Objekte. Sie gehören nicht in das Knowledge Asset selbst.

### 5.4 Illustrationsregeln aus NW-DSN-001

Alle Illustrationen folgen den Regeln des World Design Standards:
- Keine Personen, keine Tiere, kein Text
- Flache Vektorgrafik mit organischen Formen
- Horizont immer sichtbar
- Diffuses, weiches Licht
- Leichte Papier- oder Leinentextur (max. 8% Deckkraft)

---

## Kapitel 6 — Texte und Zielgruppenadaptation

### 6.1 Grundprinzip

Dieselbe fachliche Wahrheit wird für jede Zielgruppe in einer anderen Sprache ausgedrückt. Die Sprache ändert sich. Die Bedeutung nie.

Das Knowledge Asset enthält die zielgruppenneutrale Fachbeschreibung. Die zielgruppenspezifischen Ausgaben werden als separate Medienobjekte abgeleitet und referenziert.

### 6.2 Zielgruppenprofile

| Zielgruppe | Sprache | Tiefe | Ton |
|-----------|---------|-------|-----|
| **Kind** | Einfach, konkret, bildhaft | Oberflächlich | Warm, einladend |
| **Jugendliche** | Direkt, lebensnah | Mittel | Respektvoll, nicht condescending |
| **Erwachsener Nutzende (App)** | Klar, empathisch, knapp | Mittel | Ruhig, begleitend |
| **Mitarbeiter / Team** | Sachlich, handlungsorientiert | Mittel | Professionell, klar |
| **Führungskraft** | Kompakt, systemisch | Überblick | Respektvoll, direkt |
| **Coach / Therapeutin** | Fachlich, differenziert | Tief | Kollegial, präzise |
| **Workshop-Teilnehmende** | Erfahrungsorientiert, einladend | Mittel | Interaktiv, offen |
| **Website-Besuchende** | Ansprechend, vertrauensbildend | Einsteig | Warm, informierend |
| **KI-System** | Strukturiert, vollständig, kontextreich | Vollständig | Neutral, präzise |

### 6.3 Adaption am Beispiel „Die Insel"

**Fachbeschreibung (zielgruppenneutral, im Knowledge Asset):**
> Die Insel beschreibt einen Zustand tiefer Erschöpfung und vollständigem Rückzugs. Die verfügbare Energie ist auf ein Minimum reduziert. Regeneration steht vollständig im Vordergrund.

**Kind:**
> Manchmal ist die Batterie so leer, dass man sich ganz klein machen und einfach nur ruhen möchte. Das ist die Insel.

**App-Text (Ergebnis nach Check-in):**
> Du bist auf der Insel. Hier darfst du einfach sein — ohne Aufgaben, ohne Erwartungen.

**Coach:**
> Die Insel markiert einen Zustand maximaler Ressourcenreduktion. Intervention sollte ausschließlich stabilisierend und entlastend sein — kein Aktivierungsimpuls.

**KI-System:**
> `[ENV-001 | status: published | level: 5 | score_range: 26–30]` Zone: maximale Erschöpfung. Funktion: Schutz und Regeneration. Empfohlene Ausgabe: ruhig, entlastend, keine Handlungsaufforderung.

### 6.4 Regel: Bedeutungsidentität

Egal welche Zielgruppe, egal welches Medium — die Bedeutung des Knowledge Assets ist identisch. Wenn eine Ausgabe beginnt, die Bedeutung zu verschieben, ist das kein Adaptionsproblem, sondern ein Inhaltsproblem, das am Knowledge Asset selbst gelöst wird.

---

## Kapitel 7 — Beziehungen

Knowledge Assets existieren nicht isoliert. Sie bilden ein semantisches Netzwerk.

### 7.1 Beziehungstypen

| Beziehungstyp | Beschreibung | Beispiel |
|--------------|-------------|---------|
| `parent` | Übergeordnetes Konzept | Die Insel ist Kind von „NeuroWays Welt" |
| `child` | Untergeordnetes Konzept | Die Insel könnte Teilkonzepte wie „stilles Wasser" haben |
| `neighbor` | Benachbartes Konzept auf gleicher Ebene — oft im Übergang | Das Meer ist Nachbar der Insel |
| `reference` | Verweis auf ein anderes Asset ohne Hierarchie | Die Insel referenziert den Begriff „Regeneration" |
| `depends_on` | Dieses Asset setzt Verständnis eines anderen voraus | Die Insel setzt das Verständnis von „Energieniveaus" voraus |
| `contrasts_with` | Konzeptuell gegensätzlich | Die Insel kontrastiert mit dem Festland |
| `thematic` | Thematisch verwandt, aber keine direkte Abhängigkeit | Die Insel hat thematische Verbindung zu „Wald" (beide: schützende Räume) |

### 7.2 Beziehungsregel: keine Zyklen

Ein Knowledge Asset darf nicht sich selbst als Elternteil oder über eine Kette von `parent`-Beziehungen auf sich selbst verweisen. Zirkuläre Hierarchien sind verboten.

### 7.3 Beziehungsdarstellung im Asset

```json
{
  "relations": [
    { "type": "parent", "asset_id": "ENV-000", "label": "NeuroWays Welt" },
    { "type": "neighbor", "asset_id": "ENV-005", "label": "Das Meer" },
    { "type": "contrasts_with", "asset_id": "ENV-001a", "label": "Das Festland" },
    { "type": "thematic", "asset_id": "ENV-002", "label": "Der Wald" }
  ]
}
```

---

## Kapitel 8 — Versionierung

### 8.1 Grundprinzip

Jede Version eines Knowledge Assets ist unveränderlich nach Veröffentlichung. Änderungen an Bedeutung, Beschreibung oder Beziehungen erzeugen eine neue Version.

### 8.2 Wann entsteht eine neue Version?

| Änderungsart | Versionstyp |
|-------------|------------|
| Tippfehler, Formatierung | PATCH (x.x.1) |
| Neue optionale Ausgabe, neue Beziehung | MINOR (x.1.0) |
| Geänderte Bedeutung, geänderter Einsatzbereich | MAJOR (2.0.0) |

### 8.3 Historische Ausgaben

Ausgaben (Illustrationen, Texte), die aus einer früheren Version des Knowledge Assets entstanden sind, bleiben erhalten. Sie tragen die Version des Assets zum Zeitpunkt ihrer Entstehung. Sie werden nicht automatisch aktualisiert.

### 8.4 Verweis auf NW-STD-010

Die detaillierten Semver-Regeln, Rückwärtskompatibilitätsversprechen und Deprecation-Fristen werden im Versioning Standard (NW-STD-010) geregelt. Dieser Standard legt nur die Grundprinzipien fest.

---

## Kapitel 9 — Qualitätskriterien

### 9.1 Ein Knowledge Asset gilt als vollständig, wenn:

- [ ] Alle Pflichtfelder aus Kapitel 3.1 sind ausgefüllt
- [ ] `short_description` ist ≤ 160 Zeichen
- [ ] `full_description` ist zielgruppenneutral formuliert (kein „Sie" oder „Du")
- [ ] `psychological_meaning` beschreibt innere Zustände, nicht Verhaltensempfehlungen
- [ ] `use_cases` und `non_use_cases` sind klar voneinander abgegrenzt
- [ ] Mindestens eine Beziehung ist definiert (kein Asset steht allein)
- [ ] `owner` ist eingetragen
- [ ] Status ist korrekt gesetzt

### 9.2 Ein Knowledge Asset gilt als veröffentlichungsreif, wenn zusätzlich:

- [ ] Alle Qualitätskriterien aus 9.1 erfüllt
- [ ] `illustration_description` ist vorhanden (wenn eine Illustration geplant ist)
- [ ] Mindestens eine zielgruppenspezifische Ausgabe existiert oder ist beschrieben
- [ ] Kein Widerspruch zu anderen veröffentlichten Knowledge Assets besteht

### 9.3 Verbotene Inhalte in Knowledge Assets

- Therapeutische oder medizinische Empfehlungen
- Handlungsanweisungen (Knowledge Assets beschreiben, empfehlen nicht)
- Zielgruppenspezifische Formulierungen im Pflichtbereich `full_description`
- Prompts oder Generierungsaufträge (diese gehören in `AST_ASSET_PROMPTS`)

---

## Kapitel 10 — Referenzobjekt: ENV-001 — Die Insel

### Metadaten

| Feld | Wert |
|------|------|
| **Asset-ID** | ENV-001 |
| **Name** | Die Insel |
| **Version** | 1.0.0 |
| **Status** | draft |
| **Domain** | NeuroWays World (Environment) |
| **Owner** | NeuroWays Core |
| **Erstellt** | 2026-07-23 |

---

### Kurzbeschreibung

> Die Insel ist ein Ort des vollständigen Rückzugs. Hier ruht die Energie. Sie ist kein Ort des Scheiterns, sondern ein notwendiger Schutzraum.

*(148 Zeichen)*

---

### Fachbeschreibung

Die Insel beschreibt einen Zustand, in dem die verfügbare Energie auf ein Minimum reduziert ist. Der Organismus — ob physiologisch oder psychologisch — befindet sich in einem Modus maximalen Schutzes und minimaler Ausgabe. Jede zusätzliche Anforderung übersteigt die aktuell verfügbare Kapazität.

Dieser Zustand ist nicht pathologisch. Er ist eine natürliche, adaptive Reaktion auf anhaltende Belastung oder Erschöpfung. Der Körper und das Nervensystem schützen sich selbst, indem sie alle nicht lebensnotwendigen Aktivitäten reduzieren.

Die Insel ist der fünfte und letzte Bereich der NeuroWays-Energieskala. Sie steht am Ende einer Reise durch das Meer und ist erreichbar — aus ihr gibt es einen Weg zurück.

---

### Psychologische Bedeutung

Die Insel ist eine Metapher für den Rückzug ohne Schuldgefühl.

Für viele Menschen — besonders für neurodivergente Menschen — ist Erschöpfung mit Scham verbunden. Die Insel gibt diesem Zustand einen würdevollen Namen. Sie ist kein Versagen, kein Verlust, kein Ende. Sie ist ein Ort, an dem der Körper das tut, was er tun muss: ruhen.

Psychologisch aktiviert die Insel das parasympathische Nervensystem — den Ruhemodus. Dieser Modus ist nicht passiv. Er ist aktiv regenerativ. Ohne ihn ist keine nachhaltige Leistungsfähigkeit möglich.

Die Insel gibt Menschen, die sich in diesem Zustand befinden, ein Bild, das sie entlastet — kein Ratschlag, keine Anweisung, nur Anerkennung.

---

### Ziel

Das Knowledge Asset ENV-001 verfolgt folgendes Ziel:

Menschen, die sich in einem Zustand tiefer Erschöpfung befinden, einen würdevollen Raum zu geben — ohne Bewertung, ohne Handlungsaufforderung, ohne Optimierungsdruck.

Die Insel soll diesen Zustand sichtbar machen, benennen und normalisieren.

---

### Einsatzbereich

- Ergebnisdarstellung im Energy Navigator (Score-Bereich 26–30)
- Psychoedukative Erklärung in Workshops und Beratungen
- Selbstreflexionsunterstützung in der App
- Begleitmaterial für Coaches und Fachkräfte
- Webseiteninhalte zur Erklärung des NeuroWays-Weltmodells
- Flowisaurus-Erklärungen für breitere Zielgruppen

---

### Nicht-Einsatzbereich

- Nicht geeignet zur Diagnose von Erschöpfungszuständen
- Nicht geeignet als therapeutische Empfehlung
- Nicht geeignet zur Bewertung oder Beurteilung einer Person
- Nicht als Einladung zur dauerhaften Passivität — die Insel ist ein Zustand, kein Lebensstil
- Keine Verwendung in Kontexten, in denen Handlungsdruck erzeugt werden soll

---

### Beziehungen

```json
{
  "relations": [
    { "type": "parent", "asset_id": "ENV-000", "label": "NeuroWays Welt" },
    { "type": "neighbor", "asset_id": "ENV-004", "label": "Das Meer" },
    { "type": "contrasts_with", "asset_id": "ENV-001a", "label": "Das Festland" },
    { "type": "thematic", "asset_id": "ENV-002", "label": "Der Wald (schützender Raum)" },
    { "type": "depends_on", "asset_id": "GEN-001", "label": "Energieniveaus (Basiskonzept)" }
  ]
}
```

---

### Zielgruppenspezifische Ausgaben

#### Websitebeschreibung

> **Die Insel — Rückzug als Schutz**
>
> Es gibt Momente, in denen die Energie auf null gesunken ist. Die Insel ist der Name für diesen Ort. Kein schlechter Ort — ein notwendiger. Wer sich auf der Insel befindet, hat seinen Körper dabei, Kraft zu sammeln. Hier ist kein Handeln gefragt. Nur Sein.
>
> Die Insel ist der fünfte Bereich im NeuroWays Energy Navigator. Sie steht am Ende einer Reise durch wechselnde Energiezustände — und sie hat einen Ausgang.

---

#### App-Beschreibung (Ergebnistext nach Check-in)

> **Du bist auf der Insel.**
>
> Deine Energie ist gerade sehr niedrig. Das ist keine Botschaft, die etwas von dir verlangt. Sie ist eine Einladung, einfach zu sein — ohne Plan, ohne Leistung.
>
> Rückzug ist jetzt sinnvoll. Was auch immer warten kann, darf warten.

---

#### Workshop-Beschreibung (Moderationstext für Fachkräfte)

> **Die Insel — Moderationsgrundlage**
>
> Die Insel beschreibt den Zustand vollständiger Ressourcenreduktion. Im Workshop-Kontext ist es wichtig, diesen Bereich ohne Bewertung einzuführen. Teilnehmende in diesem Zustand befinden sich oft in einer vulnerablen Situation und reagieren sensibel auf Optimierungsimpulse.
>
> Empfohlene Moderationssprache: Anerkennend, nicht aktivierend. „Es ist richtig, dass du das erkennst." Keine Ratschläge, keine Handlungsempfehlungen — außer auf expliziten Wunsch.
>
> Mögliche Reflexionsfrage für die Gruppe: „Was haben Sie in Momenten tiefer Erschöpfung gebraucht, das Sie sich vielleicht nicht erlaubt haben zu nehmen?"

---

#### Flowisaurus-Erklärung

> **Was ist die Insel?**
>
> Stell dir vor, dein Akku ist fast leer — so leer, dass selbst das Laden Energie kostet. Die Insel ist dieser Moment. Du bist auf einer kleinen, ruhigen Insel. Das Wasser um dich herum ist still. Es ist leise.
>
> Auf der Insel muss man nichts tun. Man darf einfach liegen, schauen, atmen. Das Meer hat dich hergebracht, aber irgendwann wird es auch wieder weg tragen — zu neuen Ufern.
>
> Jeder Mensch besucht manchmal die Insel. Das ist ganz normal.

---

#### Dashboard-Text (Kurztext im Verlauf der App)

> Insel · Score 26–30 · Rückzug und Regeneration stehen im Vordergrund.

---

#### Illustrationsbeschreibung

> Eine kleine Insel im ruhigen, stillen Wasser. Ein einzelner Baum in der Mitte der Insel — er ist alt, ruhig, fest verwurzelt. Das Wasser um die Insel spiegelt den Himmel: weich, fast weiß, kaum Farbe. Leichter Morgennebel liegt über dem Wasser — kein Dunkel, aber Stille. Die Farbstimmung ist violett-grau mit warmen Lichttupfern. Kein Horizont im Vordergrund, aber in der Ferne sichtbar. Keine Personen, keine Tiere, kein Text. Das Bild soll Geborgenheit vermitteln — nicht Verlassenheit.
>
> Stilistische Referenz: NW-DSN-001 (Zone Insel, Zonenfarbe #8b6f9e, Hintergrundfläche #f3eff7). Illustrationsstil: flache Vektorgrafik, organische Formen, leichte Papier-Textur.

---

## Kapitel 11 — Roadmap

### 11.1 Wie alle NeuroWays-Systeme auf dieselbe Wissensbasis zugreifen

Das Knowledge Asset System bildet den gemeinsamen Kern aller NeuroWays-Produkte. Alle Systeme lesen Bedeutung aus Knowledge Assets — und erzeugen daraus Ausgaben für ihren eigenen Kontext.

```
Knowledge Assets (zentrale Wissensbasis)
│
├── NeuroWays World (NW-DSN-001)
│     → Illustrationen, Icons, Animationen aus ENV-* Assets
│
├── Methoden (Energy Navigator, zukünftige Methoden)
│     → Fragen, Ergebnistexte, Zonen aus MTH-* und ENV-* Assets
│
├── App (NeuroWays Energy Navigator)
│     → Ergebnistexte, Bereichsbeschreibungen, Check-in-Ausgaben
│
├── Flowisaurus
│     → Erklärungen für breite Zielgruppen aus allen Assets
│     → Flowisaurus-Ausgabetyp: angepasste Sprache, niedrige Komplexität
│
├── NeuroPlay
│     → Interaktive Inhalte aus NPL-* und ENV-* Assets
│     → Spielerische Zielgruppenausgaben
│
├── NeuroFlow
│     → Ablaufbasierte Inhalte aus NFL-* Assets
│     → Schrittweise Adaptionen des Wissens
│
├── Website
│     → Websitebeschreibungen aus allen Assets
│     → SEO-optimierte Ausgaben (zukünftig)
│
├── Workshops und Präsentationen
│     → Workshop-Texte, Folientexte aus allen Assets
│     → Moderationsgrundlagen für Fachkräfte
│
└── KI-Systeme (zukünftig)
      → Vollständige Asset-Daten als strukturierter Kontext
      → Zielgruppenspezifische Ausgabegenerierung
```

### 11.2 Technische Umsetzung (Ausblick)

Die technische Umsetzung folgt dem Database Standard (NW-STD-003). Knowledge Assets werden als Masterdaten-Objekte modelliert: stabiler Business Code, Versionierung, klare Beziehungen.

Die Ausgaben werden als `MTH_ASSET_OUTPUTS` (oder ähnlich nach NW-STD-001) gespeichert und referenzieren das Quell-Knowledge-Asset mit dessen Version.

### 11.3 Erweiterbarkeit

Neue NeuroWays-Produkte (z. B. ein zukünftiges NeuroParent oder NeuroWork) erweitern das Knowledge Asset System durch:
- Neue Bereichspräfixe (z. B. `NPR-` für NeuroParent)
- Neue Ausgabetypen
- Neue Zielgruppenprofile

Der Kern — die Knowledge Assets selbst — bleibt unverändert.

---

## Kapitel 12 — Kritische Selbstbewertung

### Stärken dieses Standards

- Klares, einfaches Grundkonzept: eine Wahrheit, viele Ausgaben
- Vollständiges Referenzobjekt (ENV-001) zeigt das System in der Praxis
- Plattformunabhängig formuliert
- Abgrenzung zu Dokumenten, Bildern, Methoden und Datenobjekten klar
- Beziehungsmodell skaliert zu einem vollständigen Wissensnetzwerk
- Qualitätskriterien sind prüfbar

### Fehlende Bestandteile — NeuroWays kann noch nicht vollständig aus einer einzigen Quelle liefern

**1. Kein Datenbankmodell**
Der Standard beschreibt Knowledge Assets fachlich. Die technische Speicherung (Collections, Felder, Beziehungstabellen) ist noch nicht definiert. Ohne Datenbankmodell sind Knowledge Assets nur Dokumente, keine maschinenlesbaren Wissensquellen. → NW-STD-003 v1.1.0 + Implementierungsdokument.

**2. Kein Ausgabe-Generierungsmodell**
Der Standard beschreibt, welche Ausgaben existieren können. Er beschreibt nicht, wie Ausgaben automatisch aus Assets generiert werden — weder durch KI noch durch Template-Systeme. → NW-KAS-002 (geplant).

**3. Keine API-Spezifikation für Knowledge Assets**
Ein System, das Knowledge Assets maschinell liest (z. B. eine KI, die Ausgaben generiert), braucht eine API. Diese ist noch nicht definiert. → NW-STD-011 (API Standard).

**4. Keine Mehrsprachigkeit**
Der Standard ist auf Deutsch verfasst und beschreibt Assets auf Deutsch. NeuroWays könnte mehrsprachig werden. Wie Knowledge Assets in mehreren Sprachen gepflegt werden, ist nicht beschrieben. → NW-KAS-001 v1.1.0.

**5. Kein Vollständiges Knowledge Asset Network**
ENV-001 (Die Insel) ist ausgearbeitet. Die anderen vier Zonen (Festland, Wald, Küste, Meer) fehlen noch als vollständige Knowledge Assets. Das Netzwerk ist erst tragfähig, wenn alle Primärobjekte ausgearbeitet sind. → Nächster Inhaltschritt: ENV-001 bis ENV-005.

**6. Keine Zugriffsrechte**
Wer darf Knowledge Assets lesen? Erstellen? Freigeben? Das Rechtemodell fehlt. → NW-GOV-001 + NW-STD-012.

### Gesamtbewertung

**Der Standard ist ausreichend, um das Knowledge Asset System zu beginnen und erste Assets zu erstellen.**

Er ist noch nicht ausreichend, um vollautomatisch aus einer Quelle sämtliche Ausgaben zu generieren. Dafür fehlen Datenbankmodell, Generierungsmodell und API. Diese Lücken sind bekannt, dokumentiert und für Folgeschritte eingeplant.

Der Standard reicht bereits jetzt dafür aus:
- Knowledge Assets manuell zu erstellen (als strukturierte Dokumente)
- Ausgaben daraus abzuleiten
- Das Wissen konsistent über mehrere Kanäle zu verteilen
- Neue Knowledge Assets nach demselben Schema zu entwickeln

---

## Definitionen

| Begriff | Definition |
|---------|-----------|
| **Knowledge Asset** | Die kleinste vollständige, wiederverwendbare Wissenseinheit in NeuroWays |
| **Ausgabe** | Ein Medium, das aus einem Knowledge Asset abgeleitet wird (Illustration, Text, Prompt etc.) |
| **Adaptierung** | Die zielgruppenspezifische Formulierung einer Ausgabe — ohne die Bedeutung zu verändern |
| **Bedeutungsidentität** | Das Prinzip, dass alle Ausgaben eines Knowledge Assets dieselbe fachliche Bedeutung transportieren |
| **Wissensnetzwerk** | Die Gesamtheit aller Knowledge Assets und ihrer Beziehungen |
| **Primärobjekt** | Ein Knowledge Asset ohne übergeordnetes Asset — der Ausgangspunkt eines Bereichs |

---

## Ausnahmen

Keine Ausnahmen bei Erstveröffentlichung.

---

## Qualitätsprüfung

| Kriterium | Bestanden |
|-----------|-----------|
| Alle 12 Kapitel vorhanden und ausformuliert | ✅ |
| Referenzobjekt ENV-001 vollständig | ✅ |
| Klare Abgrenzung zu anderen Objekttypen | ✅ |
| Beziehungsmodell beschrieben | ✅ |
| Qualitätskriterien prüfbar | ✅ |
| Plattformunabhängig formuliert | ✅ |
| Kritische Selbstbewertung mit fehlenden Bausteinen | ✅ |
| Noch kein Prompt, kein Bild, keine Implementierung | ✅ |

---

*NW-KAS-001 — NeuroWays Knowledge Asset Standard v1.0.0 — Status: draft — zur Prüfung vorgelegt — 2026-07-23*
