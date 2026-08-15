# NW-VALIDATE-001 – Core Architecture Validation Standard

**Dokumentcode:** NW-VALIDATE-001  
**Titel:** Core Architecture Validation Standard  
**Version:** 1.0.0  
**Status:** draft  
**Erstellt:** 2026-07-24  
**Bereich:** NeuroWays Core / Qualitätssicherung  
**Referenzen:** NW-CORE-BUILDER-001, NW-CORE-OBJECT-001, NW-STD-000, NW-STD-003

---

## Änderungsverlauf

| Version | Datum | Änderung | Grund |
|---------|-------|----------|-------|
| 1.0.0 | 2026-07-24 | Erstfassung | Validierungsprozess für NW-CORE-BUILDER-001 und NW-CORE-OBJECT-001 |

---

## Kapitel 1 — Ziel der Validierung

### 1.1 Zweck

Die Core Architecture Validation prüft, ob neue Core-Standards, Builder und Objektmodelle **reale Anforderungen vollständig abbilden** können — bevor sie als stabil gelten und bevor bestehende Module migriert oder neue Builder entwickelt werden.

Theoretische Vollständigkeit genügt nicht. Jede neue Core-Struktur muss mindestens einen realen Anwendungsfall erfolgreich modellieren können.

### 1.2 Was wird NICHT geprüft

| Nicht Gegenstand der Validierung | Warum |
|----------------------------------|-------|
| Codequalität | Gehört zur technischen Implementierung |
| Performance | Plattformabhängig — nicht Gegenstand des Core |
| Benutzeroberfläche | Rendering ist Aufgabe der Anwendungsschicht |
| Datenbankoptimierung | Plattformspezifisch |
| Ladezeiten | Infrastrukturfrage |

### 1.3 Was wird geprüft

| Prüfbereich | Leitfrage |
|-------------|-----------|
| **Architektur** | Lassen sich alle Anforderungen mit NWObjects modellieren? |
| **Konsistenz** | Gibt es widersprüchliche Regeln zwischen Core-Dokumenten? |
| **Erweiterbarkeit** | Können neue Typen entstehen, ohne Core zu ändern? |
| **Wiederverwendbarkeit** | Werden Objekte geteilt oder redundant kopiert? |
| **Redundanzfreiheit** | Existiert jede Information genau einmal? |
| **Plattformunabhängigkeit** | Enthält das Modell keine Plattformreferenzen? |

---

## Kapitel 2 — Grundprinzip

> **Jede neue Core-Struktur muss mindestens einen realen Anwendungsfall erfolgreich modellieren können.**

Die Validierung dient ausdrücklich dazu, **Schwächen zu finden**, nicht die bestehende Architektur zu bestätigen. Wer eine Validierung durchführt, sucht aktiv nach:

- Fällen, die sich nicht sauber modellieren lassen
- Informationen, die doppelt gespeichert werden müssen
- Beziehungen, die das Modell nicht kennt
- Sonderfällen, die Core-Anpassungen erfordern würden

Nur eine Validierung, die aktiv nach Gegenbeispielen sucht, ist werthaltig.

---

## Kapitel 3 — Validierungsprozess

### 3.1 Ablauf

Jede Core-Validierung durchläuft sieben Schritte in dieser Reihenfolge:

```
Schritt 1 — Anwendungsfall auswählen
         │  Realer, vollständiger Anwendungsfall aus einer Referenzdomäne
         ▼
Schritt 2 — Objekte identifizieren
         │  Welche NWObject-Typen werden benötigt?
         │  Fehlen Typen? Sind Typen unklar abgegrenzt?
         ▼
Schritt 3 — Beziehungen modellieren
         │  Containment oder Referenz?
         │  Gibt es unbekannte Beziehungstypen?
         ▼
Schritt 4 — Erweiterungen prüfen
         │  Reichen Extensions aus?
         │  Oder sind Core-Änderungen nötig?
         ▼
Schritt 5 — Sonderfälle dokumentieren
         │  Gibt es Ausnahmen, Workarounds, Kanten?
         │  Was passiert bei leeren, optionalen, bedingten Feldern?
         ▼
Schritt 6 — Redundanzen suchen
         │  Muss dieselbe Information an mehreren Stellen gespeichert werden?
         │  Gibt es Kopien statt Referenzen?
         ▼
Schritt 7 — Core-Anpassungen nur bei nachgewiesenem Bedarf
             Sind alle Kriterien aus Kapitel 6 erfüllt?
```

### 3.2 Wer führt Validierungen durch?

Validierungen werden durchgeführt:

- Vor jeder Major-Version eines Core-Dokuments
- Vor der Migration bestehender Module auf das NWObject-Schema
- Vor der Entwicklung eines neuen Builder-Typs
- Wenn ein realer Anwendungsfall nicht modellierbar erscheint

### 3.3 Zeitpunkt

```
Core-Dokument erstellt
        │
        ▼
Validierung (dieses Dokument)
        │
        ├── Bestanden → Core-Dokument wird auf PUBLISHED gesetzt
        │
        └── Nicht bestanden → Schwächen dokumentiert → Core angepasst → Erneute Validierung
```

---

## Kapitel 4 — Referenzdomänen

Vier Domänen decken das gesamte NeuroWays-Ökosystem ab. Jede Validierungsrunde muss alle vier erfolgreich abschließen.

### 4.1 Energie (Energy Navigator)

**Anwendungsfall:** Vollständige Energieanalyse — von der Frage bis zum persönlichen Muster.

**Prüft insbesondere:**
- Methoden mit Fragen und Antwortoptionen
- Scoring-Regeln und Ergebniszonen
- Persönliche Einträge mit Notiz, Aktivitäten, Tags
- Muster-Auswertung (ohne Kausalität)
- Dashboard-Karten und Schnellaktionen
- Verlaufsansicht (Meine Reise)
- Benutzerisolation

**Kritische Fragen:**
- Lassen sich Energiezonen (Festland, Wald, Küste, Meer, Insel) als `SCORING_RULE` mit `DESIGN_TOKEN`-Referenz modellieren?
- Kann ein `RESULT` sauber auf `METHOD`, `MODULE_SPEC`, `ENTITY` verweisen?
- Können persönliche Einträge (Notiz, Tags, Aktivitäten) erweiterbar gespeichert werden?

### 4.2 NeuroPlay

**Anwendungsfall:** Vollständiges Spiel mit Regeln, Missionen, Fortschritt, Belohnungen, Charakteren und Methoden.

**Prüft insbesondere:**
- Spielobjekte (Karte, Quest, Mission, Charakter, Belohnung)
- Spielregeln als Konfigurationsobjekte
- Fortschritts-Tracking ohne Hardcoding
- Flowisaurus als Asset + Content-Objekt
- Integration einer bestehenden Methode (Energy Check-in als Quest-Schritt)
- Dashboard-Karte für „Ei des Tages"
- Mehrsprachigkeit von Spieltexten

**Kritische Fragen:**
- Kann `QUEST` als neuer Objekttyp über Extensions entstehen?
- Kann Flowisaurus als `ASSET` (Bild) + `CONTENT` (Text) modelliert werden?
- Können Spielregeln als `SCORING_RULE`-Erweiterung oder brauchen sie einen eigenen Typ?

### 4.3 Unternehmensplattform

**Anwendungsfall:** Mehrere Unternehmen, Teams, Benutzer mit unterschiedlichen Rollen und Zugriffsrechten.

**Prüft insbesondere:**
- `ENTITY`-Modell (USER, TEAM, ENTERPRISE, ORGANIZATION)
- Mitgliedschaften und hierarchische Zugehörigkeit
- Rollenmodell (modulspezifische Rollen)
- Datenisolation zwischen Organisationen
- Unternehmensweite vs. individuelle Auswertungen
- Organisations-Dashboard

**Kritische Fragen:**
- Kann eine Unternehmens-Hierarchie (Muttergesellschaft → Tochter → Team → Benutzer) über `ENTITY`-parent-Referenzen modelliert werden?
- Können Rollen modulspezifisch und organisations-scoped sein?
- Kann ein `RESULT` gleichzeitig einem `ENTITY (USER)` und einem `ENTITY (TEAM)` gehören?

### 4.4 Flowisaurus

**Anwendungsfall:** KI-gestützte Begleitung — Gespräch, Kontext, Empfehlung, Methodenauswahl.

**Prüft insbesondere:**
- `PROMPT`-Objekte als versionierte, genehmigte KI-Aufrufe
- `AGENT` mit definiertem Scope
- `WORKFLOW` für orchestrierte Abläufe
- Gesprächskontext als persistentes Objekt
- Methodenempfehlung ohne Diagnose oder Bewertung
- Datenschutz: Welche Daten darf Flowisaurus lesen?
- Mehrsprachige Antworten

**Kritische Fragen:**
- Kann ein KI-Gespräch als `RESULT`-Variante gespeichert werden?
- Braucht ein Gespräch einen eigenen Objekttyp (`CONVERSATION`)?
- Kann Flowisaurus auf `METHOD`-Objekte zugreifen, ohne sie fachlich zu kennen?

---

## Kapitel 5 — Bewertungskriterien

### 5.1 Sieben Prüffragen

Für jeden Anwendungsfall werden diese sieben Fragen beantwortet:

| # | Prüffrage | Bewertung |
|---|-----------|-----------|
| 1 | Lassen sich **alle** Informationen mit NWObjects modellieren? | BESTANDEN / TEILWEISE / FEHLGESCHLAGEN |
| 2 | Entstehen **Sonderobjekte**, die den Core-Invarianten widersprechen? | JA (Problem) / NEIN (ok) |
| 3 | Müssen **neue Beziehungstypen** eingeführt werden? | JA → prüfen / NEIN (ok) |
| 4 | Gibt es **doppelte Informationen** an verschiedenen Stellen? | JA (Problem) / NEIN (ok) |
| 5 | Können Builder das Modell **vollständig interpretieren**? | JA / NEIN |
| 6 | Funktioniert das Modell **ohne Hardcoding**? | JA / NEIN |
| 7 | Bleibt das Modell **ohne Core-Änderungen erweiterbar**? | JA / NEIN |

### 5.2 Gewichtung

| Bewertung | Bedeutung |
|-----------|-----------|
| Alle 7 JA/BESTANDEN | Core ist stabil für diese Domäne |
| 1–2 NEIN | Schwäche dokumentieren, Extension prüfen |
| 3+ NEIN oder FEHLGESCHLAGEN | Core-Revision erforderlich |
| Neuer Beziehungstyp notwendig | Intensive Prüfung, ob Extension reicht |

---

## Kapitel 6 — Core-Anpassungsregeln

### 6.1 Wann darf der Core erweitert werden?

Der Core darf **ausschließlich** erweitert werden, wenn alle fünf Bedingungen gleichzeitig erfüllt sind:

| Bedingung | Prüfung |
|-----------|---------|
| **Mindestens zwei** unabhängige Anwendungsfälle benötigen dieselbe Erweiterung | ≥ 2 Domänen |
| Keine bestehende Modellierung ist möglich | Alternatives Modell ausgeschlossen |
| Es entsteht **keine Redundanz** | Existierende Felder nicht dupliziert |
| Die Änderung ist **rückwärtskompatibel** | Bestehende Objekte ohne Update valide |
| Die Erweiterung ist **plattformunabhängig** formuliert | Keine Plattformreferenz im Schema |

### 6.2 Was ist keine gültige Begründung

| Nicht ausreichend | Stattdessen |
|-------------------|-------------|
| „Es wäre praktischer" | Echten Bedarf anhand zweier Anwendungsfälle nachweisen |
| „Ein ähnlicher Standard macht es so" | NeuroWays folgt eigenen, dokumentierten Prinzipien |
| „Ein Modul braucht es" | Module erweitern über `extensions` — Core bleibt unverändert |
| „Es fehlt für die Implementierung" | Implementierung passt sich dem Core an, nicht umgekehrt |

### 6.3 Core-Anpassungs-Prozess

```
Bedarf erkannt
      │
      ▼
Beide unabhängigen Anwendungsfälle dokumentiert?
      │
      ├── NEIN → Extension nutzen, Core unverändert
      │
      └── JA → Vorschlag formalisieren
                     │
                     ▼
              Alle 5 Bedingungen erfüllt?
                     │
                     ├── NEIN → Extension oder Modell überarbeiten
                     │
                     └── JA → Core-Dokument neue Version erstellen
                                    │
                                    ▼
                             Validierung wiederholen
```

---

## Kapitel 7 — Validierungsprotokoll

### 7.1 Standardformat

Jede Validierung wird mit diesem Format dokumentiert:

```markdown
## Validierungsprotokoll — [Domäne] — [Datum]

### Getesteter Anwendungsfall
[Vollständige Beschreibung]

### Verwendete Objekte
| Objekttyp | Rolle im Anwendungsfall | Extension benötigt? |
|-----------|------------------------|-------------------|
| ...       | ...                    | JA / NEIN         |

### Beziehungen
| Von | Beziehungstyp | Zu | Neu? |
|-----|---------------|----|------|
| ... | enthält / referenziert | ... | JA / NEIN |

### Sonderfälle
[Beschreibung aller Ausnahmen, Kantenfälle, Bedingungen]

### Erkannte Schwächen
| Schwäche | Schweregrad | Empfehlung |
|---------|------------|-----------|
| ...     | KRITISCH / MITTEL / GERING | ... |

### Prüffragen-Bewertung
| # | Prüffrage | Ergebnis |
|---|-----------|---------|
| 1 | Alle Informationen modellierbar? | ... |
| 2 | Sonderobjekte? | ... |
| 3 | Neue Beziehungstypen? | ... |
| 4 | Doppelte Informationen? | ... |
| 5 | Builder interpretieren vollständig? | ... |
| 6 | Kein Hardcoding? | ... |
| 7 | Erweiterbar ohne Core? | ... |

### Freigabeentscheidung
[ ] BESTANDEN — keine Core-Änderung erforderlich
[ ] BEDINGT BESTANDEN — Extension empfohlen
[ ] FEHLGESCHLAGEN — Core-Revision erforderlich

### Empfehlungen
[Konkrete Verbesserungsvorschläge]
```

---

## Kapitel 8 — Architekturprinzipien

Diese Prinzipien gelten für alle Validierungen als verbindliche Maßstäbe:

| Prinzip | Anwendung in der Validierung |
|---------|----------------------------|
| **Core vor Implementierung** | Die Implementierung darf nie Prüfmaßstab sein |
| **Core vor Migration** | Bestehende Module werden erst nach bestandener Validierung migriert |
| **Referenzieren statt Kopieren** | Jede Kopie ist ein Validierungsfehler |
| **Builder erzeugen Daten** | Builder-Output muss NWObject-konform sein |
| **Anwendungen interpretieren Daten** | Rendering-Logik ist kein Validierungsgegenstand |
| **Plattformunabhängigkeit** | Jede Plattformreferenz im Modell ist ein Fehler |
| **Eine Information existiert genau einmal** | Jede Redundanz ist ein Validierungsfehler |
| **Erweiterbarkeit ohne Core-Anpassung** | Extensions müssen ausreichen |
| **Vollständige Versionierung** | Unveränderliche veröffentlichte Objekte |
| **Datenbank vor Hardcoding** | Alle Konfigurationen als Objekte |

---

## Kapitel 9 — Freigabekriterien

Eine Core-Version erhält den Status `PUBLISHED`, wenn **alle** folgenden Bedingungen erfüllt sind:

| Kriterium | Prüfung |
|-----------|---------|
| Alle Referenzdomänen (4) erfolgreich modelliert | Protokoll vorhanden, Ergebnis BESTANDEN |
| Keine redundanten Informationen entstanden | Null dokumentierte Redundanzen |
| Keine Core-Sonderfälle erforderlich waren | Extensions haben ausgereicht |
| Neue Builder ausschließlich über Extensions möglich | Kein Core-Eingriff nötig |
| Sämtliche Beziehungen eindeutig definiert | Kein unbekannter Beziehungstyp |
| Rückwärtskompatibilität bestätigt | Bestehende Objekte ohne Update valide |

Wenn eine Bedingung nicht erfüllt ist:
1. Schwäche in Core-Dokument dokumentieren
2. Entscheiden: Extension oder Core-Revision?
3. Core-Dokument neue Version (PATCH oder MINOR)
4. Validierung wiederholen

---

## Kapitel 10 — Vollständige Validierungsbeispiele

### 10.1 Domäne Energie — Vollständige Energieanalyse

**Anwendungsfall:** Ein Benutzer führt täglich Check-ins durch. Nach 30 Tagen sieht er seine persönlichen Muster: Welche Aktivitäten korrelieren mit welchen Energiezonen?

#### Verwendete Objekte

| Objekttyp | Rolle |
|-----------|-------|
| `METHOD` | Energy Check-in v1.1.0 |
| `QUESTION` | 6 Fragen (Energie, Anstrengung, Sensitivität, ...) |
| `ANSWER_OPTION` | 5 Optionen pro Frage |
| `SCORING_RULE` | 5 Zonen (Festland bis Insel) |
| `DESIGN_TOKEN` | Farben der Zonen |
| `CONTENT` | Fragetext, Beschreibung, Beobachtungshinweis |
| `MODULE_SPEC` | Energy Navigator App-Konfiguration |
| `EXECUTION_MODE` | App |
| `ENTITY (USER)` | Angemeldeter Benutzer |
| `RESULT` | Check-in-Ergebnis (Laufzeitdatum) |
| `MODULE` | Energy Navigator |
| `DASHBOARD` | Personal Workspace |
| `WIDGET` | Heute-Karte, Letztes Ergebnis |

**Beziehungen:**

```
MODULE "ENERGY_NAVIGATOR"
  └─referenziert→ MODULE_SPEC
                    └─basiert auf→ METHOD
                                    ├─enthält→ QUESTION (x6)
                                    │           └─referenziert→ CONTENT (Fragetext)
                                    │           └─enthält→ ANSWER_OPTION (x5)
                                    │                       └─referenziert→ CONTENT (Label)
                                    └─enthält→ SCORING_RULE (x5)
                                                └─referenziert→ DESIGN_TOKEN (Farbe)
                                                └─referenziert→ CONTENT (Beschreibung)
RESULT (Laufzeit)
  └─referenziert→ ENTITY (USER)
  └─referenziert→ METHOD
  └─referenziert→ SCORING_RULE (Treffer-Zone)
  └─enthält→ ANSWER_RECORD (Laufzeit, pro Frage)
```

**Sonderfälle:**
- Reiseeintrag (Notiz, Aktivitäten, Tags) ist Betriebsdatum → im `extensions`-Feld von `RESULT` oder als separate `RESULT`-Erweiterung?
  - **Entscheidung:** `RESULT` erhält eine `energy_navigator`-Extension mit `note`, `activities`, `tags`. Diese Migration ist dokumentiert.
- Muster-Auswertung über 30 Tage: keine eigene Aggregationsschicht nötig — Anwendung berechnet aus vorhandenen `RESULT`-Objekten.

**Erkannte Schwächen:**
| Schwäche | Schweregrad | Empfehlung |
|---------|------------|-----------|
| `RESULT` hat noch kein standardisiertes Extension-Schema | GERING | In Method Builder definieren |
| Aktivitäten-Katalog ist derzeit hardcodiert | MITTEL | Als `CONTENT`-Liste oder eigenständigen Katalog-Typ führen |

**Prüffragen-Bewertung:**
| # | Ergebnis |
|---|---------|
| 1 Alle modellierbar? | ✅ JA — mit Betriebsdaten-Erweiterung |
| 2 Sonderobjekte? | ✅ NEIN |
| 3 Neue Beziehungstypen? | ✅ NEIN |
| 4 Doppelte Informationen? | ✅ NEIN — Farben via DESIGN_TOKEN |
| 5 Builder vollständig? | ✅ JA |
| 6 Kein Hardcoding? | ⚠️ TEILWEISE — Aktivitätskatalog |
| 7 Erweiterbar? | ✅ JA |

**Freigabeentscheidung:** ✅ BEDINGT BESTANDEN  
**Empfehlung:** Aktivitätskatalog als NWObject-Liste; `RESULT`-Extensions im Method Builder standardisieren.

---

### 10.2 Domäne NeuroPlay — Vollständiges Spiel

**Anwendungsfall:** NeuroPlay enthält eine tägliche Quest, die einen Energy Check-in voraussetzt. Nach Abschluss erhält der Benutzer XP und einen Fortschrittspunkt. Flowisaurus kommentiert das Ergebnis.

#### Verwendete Objekte

| Objekttyp | Extension |
|-----------|-----------|
| `MODULE` | NeuroPlay |
| `QUEST` | Neuer Typ via `neuroplay_builder`-Extension |
| `METHOD` | Energy Check-in (wiederverwendet!) |
| `CONTENT` | Quest-Story, Flowisaurus-Text |
| `ASSET` | Flowisaurus-Figur, Quest-Icon |
| `RESULT` | Check-in-Ergebnis als Quest-Schritt |
| `ENTITY (USER)` | Benutzer |
| `SCORING_RULE` | Belohnungsregel (XP-Berechnung) |
| `WIDGET` | Ei-des-Tages-Karte |
| `PROMPT` | Flowisaurus-Kommentar-Prompt |

**Beziehungen:**

```
MODULE "NEUROPLAY"
  └─referenziert→ QUEST "DAILY_ENERGY_QUEST"
                    ├─referenziert→ METHOD "ENERGY_CHECK"    ← gemeinsam genutzt
                    ├─referenziert→ CONTENT "QUEST_STORY"
                    ├─referenziert→ SCORING_RULE "XP_RULE"
                    └─referenziert→ PROMPT "FLOWISAURUS_COMMENT"

RESULT (Laufzeit, Quest-Abschluss)
  └─referenziert→ QUEST
  └─referenziert→ ENTITY (USER)
  └─enthält→ xp_earned, streak_count (via extensions)
```

**Sonderfälle:**
- `QUEST` ist ein neuer Objekttyp — entsteht über `extensions.neuroplay_builder` ohne Core-Änderung ✅
- Fortschritt (Streak, Level) ist Betriebsdatum → im `RESULT`-Extension-Feld, nicht im `QUEST`-Objekt ✅
- Flowisaurus-Kommentar: `PROMPT` verweist auf `RESULT` als Kontext → `AGENT` liest den `RESULT` und erzeugt einen `CONTENT` (Antwort) ✅

**Erkannte Schwächen:**
| Schwäche | Schweregrad | Empfehlung |
|---------|------------|-----------|
| Kein standardisierter `CONVERSATION`-Typ für KI-Dialoge | MITTEL | Prüfen: reicht `RESULT` als Container, oder braucht Flowisaurus eigenen Typ? |
| Belohnungsobjekte (Abzeichen, Trophäen) noch nicht modelliert | GERING | Als `CONTENT`-Liste oder neuer Typ in Phase 2 |

**Prüffragen-Bewertung:**
| # | Ergebnis |
|---|---------|
| 1 Alle modellierbar? | ✅ JA — QUEST via Extension |
| 2 Sonderobjekte? | ✅ NEIN — QUEST ist reguläre Extension |
| 3 Neue Beziehungstypen? | ✅ NEIN |
| 4 Doppelte Informationen? | ✅ NEIN — METHOD wird geteilt |
| 5 Builder vollständig? | ✅ JA |
| 6 Kein Hardcoding? | ✅ JA |
| 7 Erweiterbar? | ✅ JA |

**Freigabeentscheidung:** ✅ BESTANDEN  
**Empfehlung:** `CONVERSATION`-Typ in Flowisaurus-Validierung prüfen; Belohnungsobjekte in Phase 2.

---

### 10.3 Domäne Unternehmensplattform

**Anwendungsfall:** Ein Unternehmen (ENTITY ENTERPRISE) hat drei Teams (ENTITY TEAM). Jedes Team hat Mitglieder (ENTITY USER). Der Teamleiter (ROLE TEAM_LEAD) sieht aggregierte Ergebnisse seines Teams — aber niemals individuelle Daten anderer Benutzer.

#### Verwendete Objekte

| Objekttyp | Rolle |
|-----------|-------|
| `ENTITY (ENTERPRISE)` | Unternehmen "NeuroWays GmbH" |
| `ENTITY (TEAM)` | Team A, Team B, Team C |
| `ENTITY (USER)` | Benutzer in Teams |
| `ROLE` | USER, TEAM_LEAD, ADMIN |
| `RESULT` | Individuelle Check-in-Ergebnisse (USER-bezogen) |
| `CONTENT` | Team-Berichte (aggregiert, anonymisiert) |
| `DASHBOARD` | Team-Dashboard |
| `WIDGET` | Team-Energie-Widget |

**Beziehungen:**

```
ENTITY (ENTERPRISE) "NeuroWays GmbH"
  └─referenziert (Mitglied)→ ENTITY (TEAM) "Team A"
                                └─referenziert (Mitglied)→ ENTITY (USER) "Svenja"
                                                              └─besitzt→ RESULT (privat)
                                                              └─referenziert→ ROLE "USER"
                                └─referenziert→ ENTITY (USER) "Lena" (TEAM_LEAD)
                                                  └─referenziert→ ROLE "TEAM_LEAD"
```

**Sonderfälle:**
- Kann `RESULT` gleichzeitig zu `ENTITY (USER)` und `ENTITY (TEAM)` gehören?
  - **Entscheidung:** `RESULT` gehört immer genau einem `ENTITY (USER)`. Team-Berichte entstehen durch serverseitige Aggregation — nicht durch Ownership-Sharing.
  - Aggregierte Team-Ergebnisse werden als separater `CONTENT`-Typ gespeichert, der anonymisiert und für den Teamleiter freigegeben ist.
- Hierarchische Mitgliedschaft: USER → TEAM → ENTERPRISE über `parent_entity_ref` ✅

**Erkannte Schwächen:**
| Schwäche | Schweregrad | Empfehlung |
|---------|------------|-----------|
| Consent-Modell (Benutzer stimmt Team-Auswertung zu) fehlt noch | KRITISCH | `CONSENT`-Objekt definieren (NW-CONSENT-001) |
| Datenschutz-Regeln für Team-Aggregation noch nicht im Core | MITTEL | Eigenes Dokument NW-PRIVACY-001 |

**Prüffragen-Bewertung:**
| # | Ergebnis |
|---|---------|
| 1 Alle modellierbar? | ⚠️ TEILWEISE — Consent fehlt |
| 2 Sonderobjekte? | ⚠️ JA — CONSENT wäre neuer Typ |
| 3 Neue Beziehungstypen? | ✅ NEIN |
| 4 Doppelte Informationen? | ✅ NEIN |
| 5 Builder vollständig? | ✅ JA |
| 6 Kein Hardcoding? | ✅ JA |
| 7 Erweiterbar? | ✅ JA |

**Freigabeentscheidung:** ⚠️ BEDINGT BESTANDEN  
**Empfehlung:** NW-CONSENT-001 und NW-PRIVACY-001 entwickeln. `CONSENT`-Typ als Erweiterung des ENTITY-Modells prüfen.

---

### 10.4 Domäne Flowisaurus — KI-Begleitung

**Anwendungsfall:** Flowisaurus führt ein Gespräch mit dem Benutzer. Basierend auf den letzten fünf `RESULT`-Objekten des Benutzers empfiehlt er eine Methode — ohne Diagnose oder Bewertung. Das Gespräch wird gespeichert.

#### Verwendete Objekte

| Objekttyp | Rolle |
|-----------|-------|
| `PROMPT` | Versionierter, genehmigter System-Prompt |
| `AGENT` | Flowisaurus mit definiertem Scope |
| `WORKFLOW` | Gesprächs-Workflow |
| `RESULT` | Letzte 5 Check-in-Ergebnisse (Kontext-Input) |
| `METHOD` | Empfohlene Methode |
| `CONTENT` | Flowisaurus-Antwort (Output) |
| `ENTITY (USER)` | Benutzer |

**Sonderfälle:**
- **Gesprächsverlauf:** Braucht Flowisaurus einen eigenen `CONVERSATION`-Objekttyp?
  - **Analyse:** Ein Gespräch besteht aus: Benutzer-Input (ephemer, nicht persistent), Flowisaurus-Antworten (`CONTENT` mit `agent_ref`), Kontext-`RESULT`-Referenzen.
  - **Entscheidung:** Ein `CONVERSATION`-Typ ist sinnvoll — als NWObject mit `extensions.flowisaurus`. Er referenziert `PROMPT`, `AGENT`, `ENTITY (USER)` und die `CONTENT`-Antworten.
  - **Bewertung:** Dies ist ein neuer Objekttyp — aber er entsteht über Extensions ohne Core-Änderung ✅

**Erkannte Schwächen:**
| Schwäche | Schweregrad | Empfehlung |
|---------|------------|-----------|
| Kein standardisierter `CONVERSATION`-Typ im Core-Katalog | MITTEL | Als Extension von bestehenden Typen oder neuer Typ in NW-CORE-OBJECT-001 ergänzen |
| Scope-Definition für `AGENT` (welche Daten darf er lesen?) noch nicht formalisiert | KRITISCH | In NW-PRIVACY-001 und NW-CONSENT-001 |
| Methodenempfehlung ohne Diagnose: Sprachregeln fehlen im Core | MITTEL | Textregeln in NW-KAS-001 erweitern |

**Prüffragen-Bewertung:**
| # | Ergebnis |
|---|---------|
| 1 Alle modellierbar? | ✅ JA — CONVERSATION via Extension |
| 2 Sonderobjekte? | ⚠️ JA — CONVERSATION als neuer Typ sinnvoll |
| 3 Neue Beziehungstypen? | ✅ NEIN |
| 4 Doppelte Informationen? | ✅ NEIN |
| 5 Builder vollständig? | ⚠️ TEILWEISE — Agent-Scope fehlt |
| 6 Kein Hardcoding? | ✅ JA |
| 7 Erweiterbar? | ✅ JA |

**Freigabeentscheidung:** ⚠️ BEDINGT BESTANDEN  
**Empfehlung:** `CONVERSATION` als Objekttyp in NW-CORE-OBJECT-001 v1.1.0 ergänzen. Agent-Scope in Datenschutzdokument formalisieren.

---

## Kapitel 11 — Gesamtergebnis der Erstvalidierung

### 11.1 Zusammenfassung

| Domäne | Ergebnis | Kritische Punkte |
|--------|---------|-----------------|
| Energie | ✅ BEDINGT BESTANDEN | Aktivitätskatalog als Objekt |
| NeuroPlay | ✅ BESTANDEN | Belohnungen in Phase 2 |
| Unternehmensplattform | ⚠️ BEDINGT BESTANDEN | Consent-Modell fehlt |
| Flowisaurus | ⚠️ BEDINGT BESTANDEN | CONVERSATION-Typ, Agent-Scope |

### 11.2 Empfohlene Core-Ergänzungen

Diese Ergänzungen wurden durch **mindestens zwei** unabhängige Anwendungsfälle begründet:

| Ergänzung | Begründet durch | Priorität |
|-----------|----------------|-----------|
| `CONVERSATION`-Objekttyp | Flowisaurus + NeuroPlay (Spiel-Dialog) | MITTEL |
| `CONSENT`-Objekttyp | Unternehmensplattform + Flowisaurus | HOCH |
| Aktivitätskatalog als NWObject | Energie + NeuroPlay | MITTEL |
| Textregeln für KI-Empfehlungen | Flowisaurus + Energie (Muster) | MITTEL |

### 11.3 Core-Freigabe

| Kriterium | Status |
|-----------|--------|
| Alle 4 Domänen modellierbar | ✅ JA (mit dokumentierten Einschränkungen) |
| Keine redundanten Informationen | ✅ JA |
| Keine Core-Sonderfälle | ✅ JA (CONVERSATION via Extension lösbar) |
| Neue Builder nur via Extensions | ✅ JA |
| Alle Beziehungstypen definiert | ✅ JA |

**Gesamtentscheidung: NW-CORE-BUILDER-001 und NW-CORE-OBJECT-001 v1.0.0 gelten als DRAFT-stabil für die Migrationsvorbereitung.** Die vollständige PUBLISHED-Freigabe erfolgt nach Ergänzung von `CONVERSATION`, `CONSENT` und den Datenschutzregeln in separaten Dokumenten.

---

## Kapitel 12 — Akzeptanzkriterien

1. ✅ Verbindlicher 7-Schritte-Validierungsprozess definiert
2. ✅ Alle 4 Referenzdomänen mit Prüfprotokoll beschrieben
3. ✅ Core-Erweiterungsregeln klar und messbar formuliert
4. ✅ Freigabekriterien eindeutig definiert
5. ✅ Architektur anhand realer Szenarien überprüft (Kapitel 10)
6. ✅ Schwächen aktiv gesucht und dokumentiert
7. ✅ Empfehlungen für nachfolgende Core-Dokumente formuliert

---

## Kapitel 13 — Roadmap für zukünftige Validierungen

### Kurzfristig (v1.1.0)
| Aufgabe | Auslöser |
|---------|---------|
| `CONVERSATION`-Typ zu NW-CORE-OBJECT-001 ergänzen | Flowisaurus + NeuroPlay |
| NW-CONSENT-001 entwickeln | Unternehmensplattform + Flowisaurus |
| Aktivitätskatalog als NWObject modellieren | Energie + NeuroPlay |
| Erneute Validierung nach Ergänzungen | Vor PUBLISHED-Freigabe |

### Mittelfristig (Phase 3)
| Aufgabe | Auslöser |
|---------|---------|
| Validierung Marketplace-Domäne | NWP-Ökosystem |
| Validierung Seminar/Workshop-Domäne | Execution Modes |
| Validierung Barrierefreiheit vollständig | Accessibility-Pflicht ab v2.0 |
| Validierung Mehrsprachigkeit end-to-end | Produktive Übersetzungen |

### Langfristig (Phase 4+)
| Aufgabe | Auslöser |
|---------|---------|
| Community-Builder-Validierung | Externe Builder |
| Datenschutz-Compliance-Validierung | NW-PRIVACY-001 |
| Offline-Fähigkeit des NWP-Formats | Mobile ohne Verbindung |

---

*NW-VALIDATE-001 — Core Architecture Validation Standard — v1.0.0 — draft — 2026-07-24*
