# NP-APP-001 – NeuroPlay Brettspielmodul bauen

**Prompt-Version:** v1.0.0  
**Zielplattform:** STRATO KI / React-SPA mit bestehender STRATO-Datenhaltung  
**Eingabedatei:** `NeuroPlay_Brettspielanleitungen_Quellenkatalog_v1.4.0.xlsx`

---

## Rolle

Du bist Softwarearchitekt, Datenbankentwickler, UX-Designer, Import-Spezialist und Qualitätsprüfer.

Du baust eine funktionsfähige, responsive NeuroPlay-Applikation für Brettspiele. Du planst nicht nur und erzeugst keine reine Dokumentation: Du analysierst die beigefügte Excel-Datei, erstellst das Datenmodell, importierst die fachlich relevanten Daten und implementierst die sichtbare Anwendung vollständig.

Arbeite schrittweise, nachvollziehbar und ohne vorhandene Daten oder funktionierende Projektbestandteile zu zerstören.

---

# 1. Ziel

Baue das erste produktiv nutzbare NeuroPlay-Brettspielmodul.

Die Anwendung soll:

1. den vorhandenen Spielekatalog durchsuchbar und filterbar machen,
2. Spiele mit ihren Stammdaten, Verlagen, Editionen und Quellen darstellen,
3. den eigenen Spielebestand separat sichtbar machen,
4. vorhandenes, belegtes Regelwissen als verständlichen Brettspielcoach anbieten,
5. Spielaufbau, Ziel, Kernschleife, Phasen und atomare Regeln strukturiert erklären,
6. klar zwischen belegten Daten, offenen Angaben und späteren Funktionen unterscheiden,
7. als erweiterbare Grundlage für die spätere NeuroPlay-Logik dienen.

Die Leitformel lautet:

**Mensch + Spiel + Situation = Wirkung**

In dieser ersten Version stehen Katalog, Spielwissen und Regelcoach im Mittelpunkt. Personenprofile, Wirkungsbeobachtung und Matching werden architektonisch vorbereitet, aber noch nicht mit erfundener Logik umgesetzt.

---

# 2. Verbindliche NeuroPlay-Grundsätze

NeuroPlay:

- bewertet keine Menschen,
- beobachtet statt zu diagnostizieren,
- beschreibt Bedürfnisse statt Defizite,
- berücksichtigt Kontext statt Schubladen,
- macht Stärken und hilfreiche Bedingungen sichtbar,
- trennt Beobachtung von Interpretation,
- arbeitet nach `Privacy by Default`,
- muss Empfehlungen später nachvollziehbar erklären können,
- darf keine Spielregeln oder Quellenangaben erfinden.

Grundregel:

**Zeige Unsicherheit und fehlende Daten offen. Erzeuge niemals scheinbar vollständiges Regelwissen aus einem bloßen Spieltitel.**

---

# 3. Ausgangslage und Datenquelle

Die beigefügte Excel-Datei `NeuroPlay_Brettspielanleitungen_Quellenkatalog_v1.4.0.xlsx` ist die verbindliche Importquelle.

Sie enthält unter anderem:

- 1.734 Spiel-/Anleitungsdatensätze,
- 32 priorisierte Verlage,
- Spielstammdaten und Editionsinformationen,
- offizielle Produkt-, Katalog- und Regelquellen,
- Prüf-, Metadaten-, Anleitungs- und Qualitätsstatus,
- Grundspiele, Erweiterungen und Varianten,
- Basisspielbeziehungen,
- normalisiertes Spielwissen für bereits ausgewertete Spiele,
- Phasen und Kernschleifen,
- atomare Regeln mit Gültigkeit, Fundstelle und Quelle,
- einen abgeglichenen eigenen Spielebestand,
- Vorschläge für neue Verlage,
- historische Arbeits-, Recherche- und Qualitätsblätter.

Analysiere vor jeder Änderung:

1. alle Tabellenblätter,
2. alle Überschriften,
3. Datentypen und Wertebereiche,
4. interne IDs und Beziehungen,
5. Dubletten- und Konsolidierungsfelder,
6. welche Blätter operative Daten enthalten,
7. welche Blätter nur Verlauf, Statistik oder Dokumentation enthalten.

Die Excel-Datei ist Importquelle und Nachweis, aber nicht das künftige Laufzeit-Backend.

---

# 4. Verbindliche Importquellen

## 4.1 Operative Hauptdaten

Importiere aus:

### `Verlage`

Verwende insbesondere:

- Verlag-ID
- Priorität
- Verlag
- Land
- Startseite
- Spieleübersicht
- Anleitungsquelle
- Relevanz
- Status
- Hinweis

### `Spiele und Anleitungen`

Dieses Blatt ist der kanonische Spielekatalog. Importiere alle 1.734 Datensätze und bilde mindestens diese Felder fachlich korrekt ab:

- Datensatz-ID
- Verlag / Marke
- Spiel
- Kategorie
- Sprache
- Linktyp
- Anleitung / Regelquelle
- Produkt- oder Katalogseite
- Artikelnummer / EAN
- Prüfstatus
- Geprüft am
- Hinweis
- Erscheinungsjahr
- Kurzbeschreibung
- Metadatenquelle
- Metadatenstatus
- Anleitungsstatus
- Spielerzahl min.
- Spielerzahl max.
- Spieldauer min. (Min.)
- Spieldauer max. (Min.)
- Mindestalter
- Komplexität
- Spieltyp
- Mechaniken
- Sprachabhängigkeit
- Originaltitel
- Deutsche Edition
- BGG-ID
- Produkttyp
- Basisspiel-ID
- Basisspiel-Titel
- Deutscher Verlag / Ausgabe
- Verlagsquelle
- Zuordnungsstatus
- Kanonischer Verlag
- Weitere Verlage / Partner
- Konsolidierungsstatus
- Dublettenprüfung

### Normalisiertes Regelwissen

Importiere und konsolidiere:

- `Spielwissen v1.3.8`
- `Phasen v1.3.8`
- `Regeln v1.3.8`
- `Spielwissen v1.3.9`
- `Phasen v1.3.9`
- `Regeln v1.3.9`

Die Blattversionen sind additive Batches. Konsolidiere sie über die Kombination aus Datensatz-ID und jeweiliger fachlicher Unter-ID. Überschreibe keine unterschiedlichen Spiele. Bei echten Konflikten gewinnt nicht automatisch die höhere Version: protokolliere den Konflikt und markiere ihn zur Prüfung.

### Eigener Bestand

Importiere:

- `Eigener Bestand v1.4.0`
- `Neue Verlage v1.4.0`

Behalte die Zustände `VORHANDEN`, `HINZUFÜGEN`, `ZU PRÜFEN` und vergleichbare Werte als nachvollziehbare fachliche Status bei.

## 4.2 Nicht als operative Datensätze importieren

Blätter wie Übersicht, Fortschritt, Marktabgleich, Ausbau-, Konsolidierungs-, Qualitäts- und Batch-Status-Blätter dienen als Herkunfts-, Prüf- oder Verlaufsdokumentation.

Sie dürfen:

- für Importprotokolle,
- zur Bestandsprüfung,
- zur Plausibilitätskontrolle,
- als Import-Metadaten

verwendet werden.

Sie dürfen nicht ungeprüft als zusätzliche Spiele, Regeln oder Verlage importiert werden.

---

# 5. Datenmodell

Erstelle ein normalisiertes, erweiterbares Modell. Verwende bestehende Projektkonventionen, falls vorhanden. Erzeuge keine konkurrierende zweite Core-Struktur.

Mindestens benötigt:

## 5.1 Katalog

- `publishers`
- `games`
- `game_editions`
- `game_publishers`
- `game_mechanics`
- `game_mechanic_assignments`
- `game_sources`
- `game_relationships`

`game_relationships` bildet mindestens ab:

- Grundspiel → Erweiterung
- Grundspiel → Variante
- alternative Edition
- verwandte Ausgabe

## 5.2 Regelwissen

- `game_knowledge`
- `game_phases`
- `game_rules`
- `rule_sources`
- `knowledge_quality_status`

Trenne:

- belegte Regel,
- erklärende Zusammenfassung,
- strategischen Hinweis,
- Interpretation,
- offenen Punkt.

Eine belegte Regel benötigt:

- Spielreferenz,
- stabile Regel-ID,
- Thema,
- Regeltext,
- Gültigkeit,
- Fundstelle,
- Quellreferenz,
- Qualitätsstatus.

## 5.3 Sammlung

- `collections`
- `collection_items`
- `collection_item_status`

Die importierte eigene Sammlung darf zunächst als gemeinsame Standardsammlung „Mein Bestand – Import v1.4.0“ angelegt werden. Bereite das Modell so vor, dass später mehrere Nutzer eigene Sammlungen haben können.

## 5.4 Import und Qualität

- `import_runs`
- `import_records`
- `import_errors`
- `data_quality_issues`

Jeder importierte Datensatz muss nachvollziehbar enthalten:

- Quelldatei,
- Quellblatt,
- Quellzeile oder stabile Quell-ID,
- Importzeitpunkt,
- Importversion,
- Importstatus.

## 5.5 Technische Standards

Nutze:

- stabile interne Primärschlüssel,
- die Excel-IDs zusätzlich als `external_id` oder `source_record_id`,
- Foreign Keys beziehungsweise echte Relationsfelder,
- eindeutige Constraints,
- Indizes für Suche und Filter,
- Erstellungs- und Änderungszeitpunkte,
- Soft Delete nur dort, wo Nachvollziehbarkeit erforderlich ist,
- englische technische Feldnamen in `snake_case`,
- deutsche sichtbare Bezeichnungen in der Oberfläche.

Freitext darf nicht anstelle einer vorhandenen Relation benutzt werden.

---

# 6. Importregeln

Der Import muss wiederholbar und idempotent sein.

Das bedeutet:

- derselbe Import erzeugt keine doppelten Spiele, Verlage, Regeln oder Phasen,
- vorhandene Datensätze werden über stabile IDs erkannt,
- leere Excel-Zellen bleiben `null` und werden nicht erfunden,
- Semikolon-Listen wie Mechaniken werden kontrolliert normalisiert,
- URLs werden als Quellen gespeichert, nicht als Regelinhalt interpretiert,
- Datums-, Zahlen- und Statusfelder werden typgerecht übernommen,
- Grundspielbeziehungen verwenden die stabile Datensatz-ID,
- unbekannte Verlage werden nicht stillschweigend einem ähnlichen Verlag zugeordnet,
- vorgeschlagene Verlag-IDs bleiben als Vorschlag markiert, bis sie bestätigt sind,
- Dublettenhinweise bleiben erhalten,
- unterschiedliche Editionen dürfen nicht wegen ähnlicher Titel verschmolzen werden.

Erzeuge vor dem echten Import eine Validierung und danach ein Importprotokoll mit:

- gelesenen Zeilen je Blatt,
- neu angelegten Datensätzen,
- aktualisierten Datensätzen,
- übersprungenen Datensätzen,
- Konflikten,
- Fehlern,
- Anzahl Spiele,
- Anzahl Verlage,
- Anzahl Spiele mit Regelwissen,
- Anzahl Phasen,
- Anzahl atomarer Regeln,
- Anzahl Sammlungspositionen.

Ein Fehler in einer Zeile darf den gesamten Import nicht unkontrolliert zerstören. Nutze transaktionale oder vergleichbar sichere Importabschnitte.

---

# 7. Seiten und Navigation

Implementiere eine klar sichtbare, funktionierende Navigation. Jede Route muss direkt aufrufbar sein und nach einem Reload funktionieren.

## 7.1 Startseite `/`

Zeige:

- kurze Erklärung von NeuroPlay,
- Suchfeld „Welches Spiel möchtest du spielen?“,
- Karten zu Katalog, eigener Sammlung und Regelcoach,
- reale Kennzahlen aus der Datenbank,
- zuletzt oder exemplarisch verfügbare Spiele mit Regelwissen,
- klaren Hinweis: „Regelcoach verfügbar“ oder „Regelwissen noch nicht verfügbar“.

Keine leere Dashboardseite und keine technischen Platzhaltertexte.

## 7.2 Spielekatalog `/games`

Funktionen:

- Volltextsuche über Spiel, Originaltitel, deutsche Edition und Artikelnummer,
- Filter für Verlag, Kategorie, Spieltyp, Produkttyp, Spielerzahl, Dauer, Mindestalter, Komplexität, Mechanik, Regelwissen vorhanden und eigener Bestand,
- sortierbare Ergebnisliste,
- responsive Karten- oder Tabellenansicht,
- Pagination oder performantes Lazy Loading,
- sichtbare Anzahl der Treffer,
- Filter zurücksetzen,
- URL-basierte Filter, damit Ansichten teilbar und nach Reload stabil sind.

Jede Spielkarte zeigt mindestens:

- Titel,
- Verlag,
- Produkttyp,
- Spielerzahl,
- Dauer,
- Alter,
- Komplexität,
- Status des Regelwissens,
- Status im eigenen Bestand.

Fehlende Werte werden als „Noch nicht erfasst“ dargestellt.

## 7.3 Spieldetail `/games/:id`

Gliedere die Seite in klar erkennbare Bereiche oder Tabs:

1. **Überblick**
2. **So funktioniert es**
3. **Spielablauf**
4. **Regeln**
5. **Ausgaben & Erweiterungen**
6. **Quellen & Datenqualität**

Zeige – soweit vorhanden:

- Titel und alternative Titel,
- Kurzbeschreibung,
- Ziel,
- Denkweise,
- Materialien/Ressourcen,
- Spielerzahl,
- Alter,
- Dauer,
- Komplexität,
- Spieltyp und Mechaniken,
- Verlag und Edition,
- Kernschleife,
- geordnete Phasen,
- Spielende und Wertung,
- atomare Regeln,
- Gültigkeit jeder Regel,
- Fundstelle und offizielle Quelle,
- offene Punkte und Qualitätsstatus,
- Grundspiel, Erweiterungen und Varianten.

Externe Quellen öffnen sicher in einem neuen Tab.

## 7.4 Regelcoach `/coach`

Der Regelcoach ist kein freier Chatbot, der Wissen erfindet.

Er arbeitet ausschließlich mit gespeichertem, belegtem Spielwissen.

Ablauf:

1. Spiel auswählen oder suchen.
2. Verfügbarkeit des Regelwissens prüfen.
3. Bei vorhandenen Daten Auswahl anbieten:
   - „Erkläre mir das Spiel“
   - „Was ist das Ziel?“
   - „Wie baue ich es auf?“
   - „Führe mich durch den Spielablauf“
   - „Zeige alle Regeln“
   - „Zeige Ausnahmen“
   - „Wann endet das Spiel?“
4. Inhalte aus `game_knowledge`, `game_phases` und `game_rules` strukturiert darstellen.
5. Immer Quelle und Qualitätsstatus zugänglich machen.

Wenn kein normalisiertes Regelwissen vorhanden ist:

> Für dieses Spiel ist noch kein geprüftes Regelwissen gespeichert. Du kannst die vorhandene offizielle Anleitung öffnen, sofern eine Quelle hinterlegt ist.

Keine Antwort aus bloßem Allgemeinwissen generieren.

## 7.5 Eigener Bestand `/collection`

Zeige die importierte Sammlung:

- alle Positionen,
- Katalogtreffer,
- hinzuzufügende Spiele,
- zu prüfende Einträge,
- Produkttyp,
- Verlag und Verlag-ID,
- verknüpfte Spiel-ID,
- Hinweise und nächste Aufgabe.

Filter:

- Datenbankstatus,
- Produkttyp,
- Verlag,
- mit/ohne Katalogverknüpfung,
- Regelcoach verfügbar.

## 7.6 Verlage `/publishers`

Zeige:

- alle importierten priorisierten Verlage,
- Anzahl zugeordneter Spiele,
- Status der Anleitungsrecherche,
- Land, Relevanz und offizielle Quellen,
- Detailansicht oder gefilterte Spieleliste je Verlag.

## 7.7 Datenqualität `/data-quality`

Zeige verständlich:

- letzten Importlauf,
- Importkennzahlen,
- offene Konflikte,
- Datensätze ohne Verlag,
- Datensätze ohne Stammdaten,
- Spiele mit Anleitung, aber ohne extrahiertes Regelwissen,
- potenzielle Dubletten,
- vorgeschlagene neue Verlage.

Diese Seite darf nur für berechtigte administrative Rollen sichtbar sein.

---

# 8. Suche und Darstellung

Die Suche muss tolerant sein gegenüber:

- Groß-/Kleinschreibung,
- Umlauten und einfachen Ersatzschreibweisen,
- Bindestrichen,
- typografischen Apostrophen,
- Titelvarianten,
- Original- und deutschen Titeln.

Markiere Suchtreffer nicht irreführend. Die Suche darf Editionen nicht automatisch zusammenführen.

Für lange Regellisten:

- nach Thema gruppieren,
- nach Gültigkeit filtern,
- Regeln einklappbar darstellen,
- Fundstelle und Quelle zugänglich machen.

---

# 9. Design und Barrierearmut

Die Oberfläche folgt der NeuroWays-Designphilosophie:

- minimalistisch,
- ruhig,
- hochwertig,
- menschlich,
- klare visuelle Orientierung statt Reizüberflutung.

Farben:

- Deep Navy `#1F355E`
- Gold `#D4A017`
- Petrol `#2A9D8F`
- Soft Violet `#8D6BC5`
- Warm White `#F8F7F3`
- Anthrazit `#2D2D2D`

Nutze Farbe niemals als einziges Bedeutungssignal.

Verbindlich:

- gut lesbare Schriftgrößen,
- ausreichende Kontraste,
- sichtbarer Tastaturfokus,
- vollständige Tastaturbedienbarkeit,
- semantische HTML-Struktur,
- sinnvolle ARIA-Beschriftungen,
- reduzierte Animation bei `prefers-reduced-motion`,
- Touch-Ziele von mindestens etwa 44 × 44 Pixeln,
- klare Fehlermeldungen direkt am betroffenen Element,
- ruhige Ladezustände und Skeletons,
- responsive Nutzung auf Smartphone, Tablet und Desktop.

Die organische NeuroWays-Linie darf als zurückhaltendes Orientierungselement eingesetzt werden. Sie darf Inhalte nicht überlagern.

---

# 10. Rollen und Datenschutz

Bereite mindestens vor:

- Gast: Katalog und freigegebene Spieldaten lesen,
- Nutzer: eigene Sammlung und Coach verwenden,
- Redakteur: Daten prüfen und Regelwissen pflegen,
- Administrator: Importe, Datenqualität und Stammdaten verwalten.

In Version 1 werden keine sensiblen Human-Profile benötigt.

Falls bereits ein Rollen- und Workspace-System im Projekt existiert:

- integriere dich darin,
- erzeuge kein zweites Authentifizierungs- oder Rollensystem,
- respektiere vorhandene Sichtbarkeitsregeln.

---

# 11. Technische Anforderungen

1. Nutze die vorhandene Projektarchitektur und Datenhaltung.
2. Prüfe vor Änderungen bestehende Routen, Komponenten, Collections/Tabellen, Rollen und Namenskonventionen.
3. Erzeuge keine parallele App-Shell.
4. Verwende wiederverwendbare Komponenten für:
   - Suche,
   - Filter,
   - Spielkarten,
   - Status-Badges,
   - Quellenanzeige,
   - Phasenanzeige,
   - Regelgruppen,
   - Leer- und Fehlerzustände.
5. Verwende serverseitige oder datenbanknahe Filterung/Pagination, wenn die Plattform dies unterstützt.
6. Lade nicht alle 1.734 vollständigen Datensätze samt Regeln ungebremst in den Browser.
7. Behandle Lade-, Netzwerk-, Import- und Berechtigungsfehler sichtbar.
8. Konfigurationswerte und Zugangsdaten dürfen nicht im Quellcode stehen.
9. Links und Dateiquellen sind Nutzdaten und müssen sicher ausgegeben werden.
10. Alle fachlichen Beziehungen müssen in der Datenhaltung vorhanden sein, nicht nur visuell simuliert werden.

---

# 12. Umsetzung in Phasen

Arbeite ohne Zwischenfreigabe weiter, solange kein echter fachlicher Konflikt oder Zugriffsblocker auftritt.

## Phase A – Bestandsanalyse

- Projektstruktur prüfen
- Excel vollständig analysieren
- Mapping- und Konfliktbericht erstellen
- vorhandene Strukturen wiederverwenden
- Sicherungspunkt beziehungsweise Git-Commit anlegen

## Phase B – Datenmodell

- Collections/Tabellen und Relationsfelder erstellen
- Constraints und Indizes anlegen
- Rollenrechte konfigurieren
- Importtabellen und Qualitätsstatus vorbereiten

## Phase C – Import

- wiederholbares Importverfahren implementieren
- Validierung ausführen
- Daten importieren
- Beziehungen und Zählwerte prüfen
- Importbericht speichern

## Phase D – Oberfläche

- App-Shell und Navigation integrieren
- Startseite
- Katalog
- Spieldetail
- Regelcoach
- Eigener Bestand
- Verlage
- Datenqualität

## Phase E – Qualitätssicherung

- Routen direkt testen
- Reload auf Unterseiten testen
- Suche und kombinierte Filter testen
- mobile Darstellung prüfen
- Tastaturbedienung prüfen
- fehlende Daten prüfen
- Rollenrechte prüfen
- Quellenlinks prüfen
- Import erneut ausführen und Dublettenfreiheit bestätigen

---

# 13. Nicht ändern

- Keine funktionierenden bestehenden Module entfernen.
- Keine vorhandenen Daten löschen oder pauschal überschreiben.
- Keine konkurrierende NeuroWays-Core-Struktur erzeugen.
- Keine Excel-IDs verändern.
- Keine Editionen allein aufgrund ähnlicher Titel zusammenführen.
- Keine vorgeschlagenen Verlage ungeprüft als bestätigt markieren.
- Keine Quellen durch KI-Aussagen ersetzen.
- Keine Regeln, Strategien, Spielerzahlen, Altersangaben oder Beschreibungen erfinden.
- Keine Diagnose-, Defizit- oder Bewertungssprache einführen.
- Keine reine Mockup-, Demo- oder Placeholder-Anwendung liefern.
- Keine Admin-Zugangsdaten im Frontend verlangen oder fest einbauen.

---

# 14. Abnahmekriterien

Die Aufgabe ist erst abgeschlossen, wenn:

1. die Navigation sichtbar und funktionsfähig ist,
2. alle Hauptseiten reale Daten aus der Datenhaltung anzeigen,
3. der Katalog alle 1.734 Quelldatensätze verlustfrei abbildet oder jeder abgewiesene Datensatz einzeln protokolliert ist,
4. 32 priorisierte Verlage importiert und zuordenbar sind,
5. Regelwissen, Phasen und Regeln den richtigen Spielen zugeordnet sind,
6. die importierte eigene Sammlung sichtbar ist,
7. Suche, Filter und Sortierung funktionieren,
8. Spieldetailseiten direkt aufrufbar und nach Reload stabil sind,
9. der Coach ausschließlich belegtes Regelwissen verwendet,
10. Spiele ohne Regelwissen einen ehrlichen Leerzustand zeigen,
11. Grundspiel-/Erweiterungsbeziehungen navigierbar sind,
12. Quellen und Qualitätsstatus sichtbar sind,
13. ein erneuter Import keine Dubletten erzeugt,
14. Berechtigungen geprüft sind,
15. Smartphone-, Tablet- und Desktopansicht funktionieren,
16. keine leeren Platzhalterseiten verbleiben,
17. keine Fehler in der Browserkonsole auftreten,
18. ein nachvollziehbarer Abschlussbericht vorliegt.

Prüfe mindestens diese konkreten Beispiele:

- `G0001 – Kniffel`: Spielwissen, Phasen und atomare Regeln sichtbar
- `G0002 – Geistertreppe`: mehrsprachige Quelle korrekt angezeigt
- `G0004 – Mensch ärgere Dich nicht – Jubiläumsausgabe`: Variantenhinweis erhalten
- `G0035 – The Gang`: Coach nutzt das gespeicherte Batch-Regelwissen
- ein Spiel ohne extrahiertes Regelwissen: korrekter Leerzustand
- ein Eintrag aus `Eigener Bestand v1.4.0` mit `VORHANDEN`
- ein Eintrag aus `Eigener Bestand v1.4.0` mit `HINZUFÜGEN`
- eine Erweiterung mit Basisspiel-ID

---

# 15. Verbindlicher Abschlussbericht

Gib nach der Umsetzung keinen allgemeinen Werbetext aus, sondern einen prüfbaren Bericht:

## A. Umgesetzt

- angelegte/geänderte Seiten
- angelegte/geänderte Komponenten
- angelegte/geänderte Tabellen oder Collections
- Rollen und Rechte

## B. Import

- Quelldatei und Version
- gelesene Zeilen je operativem Blatt
- importierte, aktualisierte, übersprungene und fehlerhafte Datensätze
- Gesamtzahlen in der Datenbank
- Konflikte und offene Zuordnungen

## C. Tests

Für jeden Test:

- Testfall
- erwartetes Ergebnis
- tatsächliches Ergebnis
- Status `BESTANDEN` oder `FEHLGESCHLAGEN`

## D. Sichtprüfung

Nenne die aufrufbaren Routen und beschreibe kurz, welche realen Daten dort sichtbar sind.

## E. Änderungen

Liste alle geänderten Dateien und Datenstrukturen auf.

## F. Git

Nenne Branch, Commit-ID und Commit-Nachricht, sofern Git verfügbar ist.

## G. Offen

Nur tatsächlich offene Punkte, Blocker oder bewusst verschobene Funktionen.

Beginne jetzt mit der Bestandsanalyse und führe anschließend die Umsetzung vollständig durch.
