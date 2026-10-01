# NW-PLAY-UI-001 – NeuroPlay Interface Standard

**Version:** 0.1.0  
**Status:** Draft zur fachlichen Validierung  
**Dokumenttyp:** Domain Interface Standard  
**Domäne:** NW-PLAY  
**Geltungsbereich:** NeuroPlay Web-App, mobile Webansicht und spätere native Anwendungen  
**Primärquellen:** NeuroWays Foundation, NeuroWays Design Philosophy, NW-PLAY Foundation Pack, NW-CORE Entwicklungsprinzip, NW-METHOD-001, NW-DOC-000/001 und NW-CORE-001  

---

## Kern des Dokuments

NeuroPlay ist kein Verwaltungsfrontend für eine Datenbank und kein System zur Bewertung von Menschen. Die Oberfläche bildet einen ruhigen, verständlichen Aktivitätsraum. Sie unterstützt Menschen dabei, passende Aktivitäten zu entdecken, durchzuführen und ihre eigenen Erfahrungen zu reflektieren.

Der zentrale Ablauf lautet:

> Bedürfnis → Situation → passende Aktivität → Begleitung → Beobachtung → Reflexion → Entwicklung

Die Anwendung zeigt Möglichkeiten und Zusammenhänge. Der Mensch entscheidet selbst.

---

# 1. Zweck

Dieser Standard definiert:

- die Informationsarchitektur von NeuroPlay,
- die sichtbare Hauptnavigation,
- die Aufgaben der zentralen Seiten,
- die Übersetzung der NeuroPlay-Engines in verständliche Oberflächen,
- verbindliche Regeln für Sprache, Interaktion, Datenschutz und Nachvollziehbarkeit,
- visuelle und barrierearme Grundanforderungen,
- Rollen- und Sichtbarkeitsgrenzen,
- sowie die Mindestanforderungen für eine erste nutzbare Version.

Er beschreibt die fachliche und gestalterische Struktur. Konkrete Frameworks, Datenbanktabellen, APIs und Implementierungsdetails werden in technischen Spezifikationen geregelt.

---

# 2. Normative Sprache

Die Begriffe werden in diesem Dokument verbindlich verwendet:

- **MUSS / DARF NICHT:** verbindliche Anforderung.
- **SOLL / SOLL NICHT:** begründete Standardempfehlung; Abweichungen müssen dokumentiert werden.
- **KANN:** optionale Ausgestaltung.

---

# 3. Einordnung in die NeuroWays-Architektur

## 3.1 Verbindliche Grundlagen

NeuroPlay übernimmt die NeuroWays-Foundation und die domänenübergreifenden Standards unverändert. Dieser Standard ergänzt sie ausschließlich für die Oberfläche der Domäne NW-PLAY.

Die fachliche Reihenfolge lautet:

1. **Foundation:** Warum NeuroWays existiert und welches Menschenbild gilt.
2. **Standards:** Wie entwickelt, dokumentiert, versioniert und geprüft wird.
3. **Domain NW-PLAY:** Was NeuroPlay fachlich beschreibt.
4. **Interface Standard:** Wie Menschen diese Fachlogik in der Anwendung erleben.
5. **Technische Spezifikationen:** Wie Daten, Services und Komponenten umgesetzt werden.

## 3.2 Core vor Oberfläche

Die Oberfläche DARF keine eigenständige fachliche Wahrheit erzeugen. Begriffe, Bewertungen, Zustände und Empfehlungen müssen aus versionierten Core-Modellen stammen.

Vor der Umsetzung einer Funktion müssen mindestens feststehen:

- Ziel,
- Eingaben,
- fachliche Logik,
- Datenstruktur,
- Ergebnisstruktur,
- Sichtbarkeit und Freigabe,
- sowie die geplante Erklärung für den Menschen.

Fragen, Beispiele, Texte und Hilfen DÜRFEN später als Daten wachsen, ohne dafür parallele Komponenten oder neue Fachlogik zu erzeugen.

## 3.3 Maßgebliche NeuroPlay-Architektur

Die Oberfläche greift auf neun fachliche Kernkomponenten zurück:

- Human Engine,
- Need Engine,
- Situation Engine,
- Activity Engine,
- Matching Engine,
- Recommendation Engine,
- Observation Engine,
- Reflection Engine,
- Development Engine.

Diese Engine-Namen sind interne Architekturbegriffe. Sie SOLLEN in der normalen Benutzeroberfläche nicht als Navigation oder technische Fachsprache erscheinen.

---

# 4. Menschenbild und fachliche Schutzregeln

## 4.1 Human First

Der Mensch ist größer als jedes Profil, Modell und jede Empfehlung. Modelle geben Orientierung; sie definieren keine Person.

Die Oberfläche MUSS:

- Wahlmöglichkeiten anbieten,
- Entscheidungen beim Menschen belassen,
- Unsicherheit sichtbar machen,
- Veränderbarkeit berücksichtigen,
- und jederzeit eine Korrektur oder Ablehnung ermöglichen.

## 4.2 Keine Diagnose

NeuroPlay DARF:

- Situationen beschreiben,
- Beobachtungen dokumentieren,
- Wirkungen sichtbar machen,
- wiederkehrende Muster anbieten,
- Passung zwischen Mensch, Aktivität und Situation erklären.

NeuroPlay DARF NICHT:

- Diagnosen stellen oder suggerieren,
- Menschen als Persönlichkeitstyp festschreiben,
- aus einzelnen Beobachtungen stabile Eigenschaften behaupten,
- medizinische oder therapeutische Wirksamkeit versprechen,
- Unterstützungsbedarf aus sichtbarer Leistung ableiten.

## 4.3 Entwicklung statt Bewertung

Die Entwicklungsansicht DARF NICHT als Leistungsdashboard, Ranking, medizinische Auswertung oder Optimierungsdruck gestaltet werden.

Unzulässige Formulierungen sind beispielsweise:

- „Du bist schlecht in …“
- „Dein Sozialwert ist gesunken.“
- „Du solltest produktiver spielen.“
- „Dieses Spiel verbessert garantiert …“

Zulässige Formulierungen sind beispielsweise:

- „Du hast in mehreren Situationen beobachtet …“
- „Unter diesen Bedingungen wurde die Aktivität häufiger als anstrengend beschrieben.“
- „Möglicherweise passt gerade eine Aktivität mit weniger Zeitdruck.“
- „Trifft diese Beobachtung für dich zu?“

## 4.4 Beobachtung vor Interpretation

Jede Interpretation MUSS auf sichtbaren Beobachtungen oder ausdrücklich benannten Daten beruhen.

Die Anwendung MUSS unterscheiden zwischen:

- **Beobachtung:** Was wurde erfasst?
- **Muster:** Was wiederholt sich möglicherweise?
- **Interpretation:** Welche Bedeutung könnte das haben?
- **Entscheidung:** Was möchte der Mensch daraus ableiten?

Interpretationen MÜSSEN als vorläufig erkennbar und durch die Person bestätigbar, korrigierbar oder ablehnbar sein.

---

# 5. Grundidee der Oberfläche

NeuroPlay verbindet fünf verständliche Räume:

1. persönlicher Einstieg,
2. Aktivitätsbibliothek,
3. Coach und Lernbegleitung,
4. persönliche Sammlung,
5. Reflexions- und Entwicklungsraum.

Die Datenbank bleibt im Hintergrund. Die sichtbare Oberfläche zeigt nur Informationen und Handlungen, die in der aktuellen Situation relevant sind.

Die Anwendung SOLL sich wie eine Mischung aus persönlichem Dashboard, Bibliothek, Coach, Lernbegleitung und Reflexionsraum anfühlen – nicht wie ein Datenbank-Backend.

---

# 6. Informationsarchitektur und Navigation

## 6.1 Hauptnavigation

Die angemeldete Anwendung verwendet maximal sechs sichtbare Hauptpunkte:

| Hauptpunkt | Aufgabe |
| --- | --- |
| **Heute** | Situation erfassen, passende Aktivität finden, zuletzt Begonnenes fortsetzen |
| **Entdecken** | Aktivitäten suchen, filtern und vergleichen |
| **Coach** | Aktivität verstehen, vorbereiten, durchführen und nachschlagen |
| **Meine Aktivitäten** | Besitz, Favoriten, Verlauf und individueller Lernstand |
| **Entwicklung** | eigene Beobachtungen, Wirkungen und mögliche Muster reflektieren |
| **Mehr** | Gruppen, Freigaben, persönliche Daten, Einstellungen und Hilfe |

Auf kleinen Bildschirmen SOLLEN höchstens fünf primäre Ziele direkt sichtbar sein:

`Heute · Entdecken · Coach · Sammlung · Entwicklung`

„Mehr“ KANN über Profil, Menü oder zusätzlichen Navigationseintrag erreichbar sein.

## 6.2 Navigationsebenen

Die sichtbare Navigation DARF maximal vier Ebenen besitzen:

1. Hauptbereich,
2. Teilbereich,
3. konkretes Objekt,
4. Funktion innerhalb des Objekts.

Beispiel:

`Meine Aktivitäten → Besitz → Café del Gatto → Lernen`

Tiefere Datenbeziehungen gehören in den Seiteninhalt und NICHT in verschachtelte Menüs.

## 6.3 Orientierung

Jede Seite MUSS:

- einen eindeutigen Seitentitel besitzen,
- den aktuellen Kontext sichtbar machen,
- eine klare primäre Handlung anbieten oder bewusst ohne Handlungsdruck auskommen,
- einen verständlichen Rückweg ermöglichen,
- Lade-, Leer-, Fehler- und Erfolgszustände enthalten.

Auf Desktop SOLLEN Breadcrumbs ab Ebene 3 verwendet werden. Auf Mobilgeräten MUSS mindestens eine eindeutige Zurück-Navigation vorhanden sein.

## 6.4 Trennung der Oberflächen

Die normale Benutzeroberfläche DARF NICHT die Datenbank- oder Administrationsstruktur spiegeln.

Fachverwaltung, Redaktion, Import, Quellenprüfung und Systemverwaltung MÜSSEN rollenbasiert getrennt sein.

---

# 7. Öffentlicher Bereich

Der öffentliche Bereich KANN folgende Seiten enthalten:

- Start,
- Entdecken mit begrenztem Funktionsumfang,
- Über NeuroPlay,
- So funktioniert es,
- Datenschutz,
- Barrierefreiheit,
- Impressum,
- Anmelden.

Öffentliche Inhalte DÜRFEN keine personenbezogenen Empfehlungen oder privaten Bestandsdaten offenlegen.

---

# 8. Seite „Heute“

## 8.1 Aufgabe

„Heute“ ist der persönliche Einstieg. Die Seite beantwortet:

> Was könnte in meiner aktuellen Situation passen?

Sie beantwortet NICHT:

> Was ist alles im System gespeichert?

## 8.2 Mindestinhalte

Die Seite SOLL anbieten:

- kurzen, freiwilligen Check-in,
- verfügbare Zeit,
- aktuell nutzbare Energie,
- allein oder gemeinsam,
- gewünschte Wirkung oder aktuelles Bedürfnis,
- passende Aktivität mit verständlicher Begründung,
- Alternative zur Empfehlung,
- Fortsetzung einer zuletzt begonnenen Aktivität.

## 8.3 Energieabfrage

Energie MUSS als aktuelle, veränderliche Situation dargestellt werden – nicht als persönliche Leistungsfähigkeit.

Eine Person MUSS den Check-in:

- überspringen,
- nachträglich ändern,
- mit wenigen Angaben durchführen,
- oder detaillierter ausfüllen können.

## 8.4 Empfehlungen

Ein Passungswert DARF nie allein stehen. Jede Empfehlung MUSS eine verständliche Begründung erhalten.

Beispiel:

> „Diese Aktivität könnte passen, weil du wenig Energie und 30 Minuten angegeben hast, sie wenig Zeitdruck enthält und du ähnliche Aktivitäten zuletzt als angenehm beschrieben hast.“

Zusätzlich MUSS erkennbar sein:

- welche Angaben verwendet wurden,
- welche Angaben fehlen,
- ob es sich um eine Vermutung handelt,
- wie die Person Feedback geben kann.

Eine Empfehlung MUSS ablehnbar sein. Die Ablehnung DARF nicht als Fehler oder negative Bewertung gespeichert werden.

---

# 9. Seite „Entdecken“

## 9.1 Aufgabe

„Entdecken“ macht die Aktivitätsbibliothek zugänglich. Die Struktur MUSS auf weitere Aktivitätstypen wie Musik, Kreativität, Bewegung oder Lernen erweiterbar bleiben.

## 9.2 Menschenverständliche Filter

Primäre Filter SOLLEN als konkrete Fragen oder Alltagssprache erscheinen:

- Wie viel Zeit hast du?
- Wie viel Energie ist verfügbar?
- Allein oder gemeinsam?
- Ruhig oder aktiv?
- Bekannt oder neu?
- Einfach oder anspruchsvoll?
- Kooperativ oder kompetitiv?
- Viel oder wenig Kommunikation?
- Wie intensiv dürfen Reize sein?

Technische Merkmale wie Mechanismen, interne Scores und Datenklassifikationen KÖNNEN unter „Erweiterte Filter“ angeboten werden.

## 9.3 Ergebnisdarstellung

Jede Ergebnis-Karte SOLL mindestens zeigen:

- Titel,
- Aktivitätstyp,
- typische Dauer,
- Personenzahl,
- zwei oder drei relevante Merkmale,
- Status der Datenqualität, falls Informationen unsicher sind,
- primäre Handlung.

Vergleiche SOLLEN Unterschiede erklären und nicht nur numerische Gesamtwerte nebeneinanderstellen.

---

# 10. Aktivitätsdetailseite

## 10.1 Standardstruktur

Die Detailseite SOLL folgende Bereiche besitzen:

`Überblick | Passt zu mir | Lernen | Ablauf | Wirkung | Quellen`

Je nach Aktivitätstyp DÜRFEN Bereiche ausgeblendet werden, wenn keine fachlichen Inhalte vorliegen. Leere Reiter SOLLEN nicht angezeigt werden.

## 10.2 Überblick

Mindestinformationen:

- Titel und Bild oder Illustration,
- verständliche Kurzbeschreibung,
- Dauer,
- Personenzahl,
- Altersbereich, sofern fachlich relevant,
- Schwierigkeits- oder Lernaufwand in verständlicher Sprache,
- benötigtes Material,
- Aktivitätstyp,
- Starten- oder Fortsetzen-Handlung.

## 10.3 „Passt zu mir“

Die Activity DNA wird als Anforderungsprofil der Aktivität dargestellt, zum Beispiel:

- Konzentration,
- Kommunikation,
- Planung,
- Zeitdruck,
- Reizintensität,
- Bewegung.

Die Darstellung MUSS verdeutlichen, dass diese Werte die Aktivität und nicht den Wert oder die Fähigkeit eines Menschen beschreiben.

Die persönliche Passung MUSS kontextbezogen formuliert werden:

- „Für deine aktuelle Situation hilfreich“
- „Dabei könnte heute Folgendes anstrengend sein“
- „Diese Einschätzung basiert auf …“

## 10.4 Lernen

Der Lernbereich KANN enthalten:

- aktuelles Regelverständnis,
- offene Themen,
- Lernpfad,
- nächste sinnvolle Erklärung,
- Übungen,
- Symbolübersicht,
- Beispiele,
- persönliche Notizen.

Lernstand ist personenbezogen. Er DARF NICHT aus dem Haushaltsbestand oder dem Lernstand anderer Personen abgeleitet werden.

## 10.5 Ablauf

Der Ablauf SOLL nach Möglichkeit strukturieren:

- Vorbereitung oder Aufbau,
- Start,
- Kernschleife,
- Phasen,
- Ende,
- Sonderfälle.

## 10.6 Wirkung

Wirkungen MÜSSEN als Möglichkeiten oder persönliche Beobachtungen dargestellt werden, nicht als Versprechen.

Die Oberfläche MUSS unterscheiden zwischen:

- fachlich beschriebener möglicher Wirkung,
- eigener beobachteter Wirkung,
- Beobachtung anderer Personen,
- und noch ungeprüfter Annahme.

## 10.7 Quellen

Der Quellenbereich SOLL zeigen:

- Anleitung,
- FAQ,
- Errata,
- Verlags- oder Urheberquelle,
- Abruf- oder Versionsstand,
- Prüfstatus,
- bekannte Widersprüche oder Unsicherheiten.

Fachliche Aussagen MÜSSEN auf ihre Herkunft zurückführbar sein. Quellen werden referenziert und nicht unnötig dupliziert.

---

# 11. Seite „Coach“

## 11.1 Rolle

Der Coach ist ein geführter Arbeitsraum und kein beliebiger Chatbot. Er unterstützt:

- Kennenlernen,
- Vorbereitung,
- Start und Durchführung,
- Regelklärung,
- Lernfortschritt,
- Strategie-Verständnis,
- Fortsetzung.

## 11.2 Einstieg

Der Coach SOLL zunächst nach dem Ziel fragen:

- Aktivität kennenlernen,
- vorbereiten,
- starten,
- Regel nachschlagen,
- fortsetzen,
- Strategie verstehen.

Freitext KANN zusätzlich angeboten werden, darf aber nicht der einzige Zugang sein.

## 11.3 Drei Erklärungsebenen

Coach-Antworten MÜSSEN fachlich trennen:

1. **Was passiert jetzt?**
2. **Warum passiert das?**
3. **Welche Möglichkeit könnte sinnvoll sein?**

Regelwissen, Erklärung und Strategie DÜRFEN NICHT unmarkiert vermischt werden.

## 11.4 Grenzen

Der Coach MUSS:

- Unsicherheit benennen,
- Quellen oder Grundlage auf Anfrage zeigen,
- zwischen offizieller Regel und Interpretation unterscheiden,
- Korrektur ermöglichen,
- keine autonome Entscheidung für den Menschen treffen.

Bei widersprüchlichen Quellen MUSS der Widerspruch sichtbar bleiben, bis er fachlich geklärt ist.

---

# 12. Seite „Meine Aktivitäten“

## 12.1 Aufgabe

Die Seite ist die persönliche Bibliothek und kann enthalten:

- Besitz,
- Favoriten,
- Möchte ich ausprobieren,
- zuletzt genutzt,
- angefangen,
- sicher gelernt,
- Verlauf.

## 12.2 Brettspielspezifische Bereiche

Für Brettspiele KÖNNEN zusätzlich geführt werden:

- Grundspiele,
- Erweiterungen,
- Editionen,
- ausgeliehen,
- Haushaltsbestand,
- Familien- oder Gruppenzuordnung.

## 12.3 Haushaltsbestand und persönliche Daten

Ein Haushalt KANN eine gemeinsame Sammlung besitzen. Jede Person behält jedoch:

- eigenen Lernstand,
- eigene Präferenzen,
- eigene Beobachtungen,
- eigene Freigaben,
- eigene Entwicklungsdaten.

Gemeinsamer Besitz DARF NICHT automatisch zur Freigabe persönlicher Daten führen.

---

# 13. Seite „Entwicklung“

## 13.1 Aufgabe

„Entwicklung“ ist eine Beobachtungs- und Reflexionslandkarte. Sie macht Erfahrungen im Zeitverlauf sichtbar, ohne Menschen zu bewerten.

## 13.2 Mögliche Ansichten

- Kalender,
- Zeitstrahl,
- Wirkungsbereiche,
- wiederkehrende Beobachtungen,
- hilfreiche Anpassungen,
- Lernfortschritt,
- eigene Reflexionen.

## 13.3 Muster

Ein vorgeschlagenes Muster MUSS:

- die Datengrundlage nennen,
- den betrachteten Zeitraum zeigen,
- die Zahl der Beobachtungen nennen,
- Unsicherheit ausdrücken,
- und bestätigbar oder ablehnbar sein.

Beispiel:

> „Aktivitäten mit hohem Zeitdruck wurden in vier von fünf dokumentierten Situationen mit wenig Energie als anstrengend beschrieben.“

Zulässige Handlungen:

- Grundlage anzeigen,
- trifft zu,
- trifft teilweise zu,
- trifft nicht zu,
- später prüfen.

Ein abgelehntes Muster DARF NICHT unverändert erneut als gesicherte Erkenntnis erscheinen.

---

# 14. Gruppen und Haushalte

Gruppen und Haushalte werden unter „Mehr“ verwaltet, solange sie nicht die zentrale aktuelle Aufgabe darstellen.

Mögliche Struktur:

- Mein Haushalt
  - gemeinsame Sammlung,
  - Familienaktivitäten,
  - Personen,
  - Freigaben,
  - gemeinsame Sitzungen.
- Meine Gruppen
  - Spieleabend,
  - Arbeitsteam,
  - Workshopgruppe.

Jede Person entscheidet selbst, welche Profildaten, Beobachtungen und Reflexionen sie teilt.

Bei Kindern oder betreuten Personen müssen Sorge-, Einwilligungs- und Schutzkonzepte in einer eigenen Spezifikation geregelt werden. Bis dahin DÜRFEN keine weitreichenden automatischen Freigaben umgesetzt werden.

---

# 15. Rollen, Rechte und Sichtbarkeit

## 15.1 Grundsatz

Privacy by Default ist verbindlich. Persönliche Daten sind standardmäßig privat.

## 15.2 Mindestrollen

Die technische Spezifikation SOLL mindestens unterscheiden:

- Gast,
- angemeldete Person,
- Haushalts- oder Gruppenmitglied,
- freiwillig benannte verwaltende Person,
- Redaktion/Datenpflege,
- Systemadministration.

Rollen DÜRFEN nicht automatisch Zugriff auf fachlich nicht erforderliche persönliche Reflexionsdaten erhalten.

## 15.3 Freigaben

Freigaben MÜSSEN:

- freiwillig,
- zweckgebunden,
- verständlich,
- widerrufbar,
- zeitlich begrenzbar,
- und vor dem Speichern überprüfbar sein.

Die Oberfläche MUSS klar zeigen:

- was geteilt wird,
- mit wem,
- für welchen Zweck,
- ab wann,
- bis wann,
- und was ein Widerruf bewirkt.

## 15.4 Eigene Daten

Unter „Mehr → Meine Daten“ MUSS die Person ihre wesentlichen Daten:

- ansehen,
- berichtigen,
- exportieren,
- und im Rahmen der rechtlichen und fachlichen Regeln löschen oder Löschung anfordern können.

---

# 16. Sprache und Benennung

## 16.1 Sprachprinzipien

Die Oberfläche MUSS:

- konkret,
- respektvoll,
- erwachsen,
- verständlich,
- nicht klinisch,
- nicht moralisierend,
- und nicht unnötig technisch formuliert sein.

Sie SOLL kurze Sätze, klare Verben und sichtbare Konsequenzen verwenden.

## 16.2 NeuroWays-Sprache

Metaphern und Begriffe dienen als Landkarte. Sie DÜRFEN Orientierung geben, aber keine feste Identität zuweisen.

Bevorzugte Prinzipien:

- Möglichkeiten statt Vorgaben,
- Passung statt Eignung,
- Bedingungen statt Defizite,
- Beobachtung statt Diagnose,
- Entwicklung statt Optimierung,
- Energie und Wirkung statt reiner Zeit- und Leistungsmessung.

## 16.3 Bezeichnungen

Technische Tabellen-, Feld- und Engine-Namen DÜRFEN in der normalen Oberfläche nicht sichtbar sein.

Symbole MÜSSEN mit Text oder zugänglicher Beschriftung kombiniert werden. Information DARF NICHT allein durch Farbe, Form oder Animation vermittelt werden.

---

# 17. Visuelles System

## 17.1 Wirkung

NeuroPlay SOLL wirken:

- freundlich,
- klar,
- erwachsen,
- spielerisch, aber nicht kindlich,
- ruhig,
- menschlich,
- hochwertig,
- nicht klinisch,
- nicht überladen.

## 17.2 Verbindliche NeuroWays-Farbwelt

Ausgangspunkt ist die NeuroWays Design Philosophy:

| Rolle | Farbe | Hex |
| --- | --- | --- |
| Orientierung und Vertrauen | Deep Navy | `#1F355E` |
| Potenzial und Wertschätzung | Gold | `#D4A017` |
| Verbindung und Zusammenarbeit | Petrol | `#2A9D8F` |
| Vielfalt und neue Perspektiven | Soft Violet | `#8D6BC5` |
| ruhiger Hintergrund | Warm White | `#F8F7F3` |
| Fließtext | Anthrazit | `#2D2D2D` |

Für die digitale Oberfläche müssen daraus semantische Design-Tokens abgeleitet werden, zum Beispiel `color-background`, `color-text`, `color-primary`, `color-focus`, `color-success`, `color-warning` und `color-error`.

Die Markenfarben DÜRFEN NICHT ungeprüft als Statusfarben verwendet werden. Alle Kombinationen müssen ausreichenden Kontrast besitzen.

## 17.3 NeuroWays-Linie

Die organische Linie mit goldenem Punkt KANN als ruhiges, wiederkehrendes Markenelement eingesetzt werden.

Sie DARF NICHT:

- wichtige Inhalte verdecken,
- als Fortschrittsanzeige missverstanden werden,
- unruhig animiert sein,
- oder notwendige Orientierung ersetzen.

## 17.4 Layout

Die Oberfläche SOLL verwenden:

- großzügigen Weißraum,
- klare Karten und Abschnitte,
- wenige gleichzeitige Reize,
- stabile visuelle Hierarchie,
- eine erkennbare Primäraktion,
- verständliche Illustrationen oder Outline-Icons,
- konsistente Abstände und Komponenten.

Große Datenmengen SOLLEN schrittweise offengelegt werden. Details KÖNNEN über „Mehr anzeigen“, Reiter oder aufklappbare Abschnitte erreichbar sein.

---

# 18. Barrierearmut und neuroinklusive Interaktion

## 18.1 Mindeststandard

Die Anwendung MUSS mindestens WCAG 2.2 auf Konformitätsstufe AA anstreben. Abweichungen müssen dokumentiert und priorisiert behoben werden.

## 18.2 Wahrnehmbarkeit

Die Anwendung MUSS:

- ausreichende Farbkontraste bieten,
- bei 200 % Textvergrößerung nutzbar bleiben,
- Inhalte ohne Informationsverlust umbrechen,
- Alternativtexte für informative Bilder bereitstellen,
- Untertitel oder Transkripte für relevante Medien ermöglichen,
- Information nie ausschließlich über Farbe vermitteln.

## 18.3 Bedienbarkeit

Alle Kernfunktionen MÜSSEN:

- per Tastatur bedienbar,
- mit sichtbarem Fokus versehen,
- ohne präzise Zeigerbewegung erreichbar,
- und ohne zwingende Drag-and-drop-Interaktion nutzbar sein.

Zeitbegrenzungen SOLLEN vermieden werden. Wenn sie fachlich nötig sind, MÜSSEN sie angekündigt, verlängerbar oder deaktivierbar sein.

## 18.4 Kognitive und sensorische Entlastung

Die Anwendung SOLL anbieten:

- Fokusmodus,
- reduzierte Bewegung,
- reduzierte visuelle Dichte,
- klare Schritt-für-Schritt-Abläufe,
- verständliche Zusammenfassungen,
- Speichern und späteres Fortsetzen,
- fehlertolerante Eingaben,
- ruhige Standarddarstellung.

Animationen MÜSSEN sparsam, langsam und funktional sein. Automatische Bewegung, Flackern und unnötige Übergänge sind zu vermeiden.

## 18.5 Vorhersehbarkeit

Gleiche Handlungen MÜSSEN gleich benannt und an konsistenten Stellen angeboten werden. Unerwartete Kontextwechsel, automatische Weiterleitungen oder ungefragte Pop-ups SOLLEN vermieden werden.

---

# 19. Zustände und Fehlertoleranz

Für jede zentrale Seite und Komponente MÜSSEN definiert sein:

- Initialzustand,
- Ladezustand,
- leerer Zustand,
- teilweise vorhandene Daten,
- Erfolg,
- validierbarer Eingabefehler,
- technischer Fehler,
- fehlende Berechtigung,
- Offline- oder Verbindungsunterbrechung, soweit relevant.

Fehlermeldungen MÜSSEN:

- in Alltagssprache erklären, was passiert ist,
- sagen, ob Daten gespeichert wurden,
- einen sicheren nächsten Schritt anbieten,
- technische Details nur optional anzeigen,
- keine Schuldzuweisung enthalten.

Bei Reflexionen, Check-ins und Sitzungen SOLL ein Zwischenstand erhalten bleiben, damit Übergänge und Verbindungsfehler nicht zu Datenverlust führen.

---

# 20. Nachvollziehbarkeit und Datenqualität

## 20.1 Herkunft

Jede fachlich relevante Aussage SOLL auf ihre Wissensquelle oder Berechnungsgrundlage zurückführbar sein.

Das System MUSS unterscheiden zwischen:

- offizieller Primärquelle,
- geprüfter Sekundärquelle,
- redaktioneller Zusammenfassung,
- KI-generierter Ableitung,
- persönlicher Beobachtung,
- ungeprüfter Angabe.

## 20.2 Versionen

Fachmodelle, Matchinglogik, Fragen und Auswertungsmodelle MÜSSEN versioniert werden. Bestehende Auswertungen müssen erkennen lassen, mit welcher Version sie entstanden sind.

Änderungen dürfen frühere Ergebnisse nicht still und rückwirkend umdeuten.

## 20.3 Datenqualität

Unsichere, fehlende oder widersprüchliche Informationen MÜSSEN sichtbar gekennzeichnet werden. Ein scheinbar präziser Score DARF keine höhere Sicherheit vortäuschen, als die Daten erlauben.

---

# 21. Verwaltungsoberfläche

Die Verwaltung ist von der normalen Benutzeroberfläche getrennt.

Mögliche Bereiche:

- Aktivitäten,
- Brettspiele,
  - Spiele,
  - Editionen,
  - Erweiterungen,
  - Verlage,
  - beteiligte Personen,
- Activity DNA,
  - Merkmale,
  - Gruppen,
  - Skalen,
- Wissen,
  - Regeln,
  - Phasen,
  - Aktionen,
  - Strategien,
  - Objekte,
- Quellen,
  - Dokumente,
  - Prüfungen,
  - Widersprüche,
- Import,
- KI-Prüfung,
- Übersetzungen,
- Datenqualität,
- System.

Administrative Funktionen MÜSSEN:

- rollenbasiert geschützt,
- nachvollziehbar protokolliert,
- validierbar,
- und bei kritischen Änderungen mit Bestätigung versehen sein.

KI-generierte Fachinhalte DÜRFEN nicht ungeprüft als offizielle Wahrheit veröffentlicht werden.

---

# 22. Komponentenstandard

Wiederkehrende Funktionen MÜSSEN als konsistente, wiederverwendbare Komponenten umgesetzt werden.

Mindestens zu standardisieren sind:

- App-Shell,
- Hauptnavigation,
- Breadcrumb/Zurück-Navigation,
- Aktivitätskarte,
- Passungsbegründung,
- Quellenstatus,
- Check-in,
- Skala,
- Beobachtungskarte,
- Mustervorschlag,
- Freigabedialog,
- Coach-Schritt,
- Leerzustand,
- Fehlermeldung,
- Bestätigungsdialog.

Jede Komponente benötigt:

- fachlichen Zweck,
- Eingaben und Ausgaben,
- Varianten,
- Zustände,
- Rollen- und Sichtbarkeitsregeln,
- Tastaturverhalten,
- zugängliche Beschriftung,
- responsive Verhalten,
- Akzeptanzkriterien.

Einmal definierte Komponenten SOLLEN erweitert und NICHT als konkurrierende Varianten neu gebaut werden.

---

# 23. Responsive Standard

Die Kernfunktionen MÜSSEN auf Smartphone, Tablet und Desktop nutzbar sein.

Mobile Ansichten sind keine verkleinerten Desktopseiten. Prioritäten und Reihenfolge müssen an den Nutzungskontext angepasst werden.

Verbindliche Grundsätze:

- keine horizontale Seitennavigation für Kerninhalte,
- ausreichend große Interaktionsflächen,
- stabile Navigation,
- Formulare in verständlichen Abschnitten,
- wichtige Handlung ohne unnötiges Scrollen auffindbar,
- Tabellen auf kleinen Bildschirmen als Karten, gestapelte Datensätze oder gezielt scrollbare Vergleichsfläche.

---

# 24. Datenschutz und Sicherheit im Interaktionsdesign

Datenschutz ist kein nachgelagerter Rechtstext, sondern Teil der Oberfläche.

Die Anwendung MUSS:

- nur notwendige Daten abfragen,
- Zweck und Nutzen vor der Eingabe verständlich erklären,
- sensible Angaben als freiwillig kennzeichnen,
- keine manipulativen Zustimmungsmuster verwenden,
- private Inhalte vor Schulterblick und Fehlfreigaben schützen,
- Sitzungen und Freigaben sicher beenden lassen.

Vor produktiver Nutzung ist eine eigene Datenschutz-, Lösch-, Aufbewahrungs- und Einwilligungsspezifikation erforderlich.

---

# 25. MVP und Ausbaureihenfolge

## 25.1 Erste nutzbare Version

Die erste Version konzentriert sich auf:

1. Heute-Dashboard,
2. Aktivitätskatalog,
3. Aktivitätsdetailseite,
4. Coach-Arbeitsraum,
5. Meine Aktivitäten / Sammlung.

## 25.2 Zweite Ausbaustufe

- Entwicklung und Reflexion,
- Haushalte und Gruppen,
- differenzierte Freigaben,
- erweiterte Quellen- und Datenqualitätsansicht.

## 25.3 Dritte Ausbaustufe

- erweiterte Administration,
- redaktionelle Workflows,
- KI-Prüfung,
- Übersetzungen,
- zusätzliche Aktivitätstypen,
- domänenübergreifende Wiederverwendung.

Jede Stufe MUSS bereits verständlich und nutzbar sein. Unfertige Funktionsattrappen DÜRFEN nicht als abgeschlossene Funktion erscheinen.

---

# 26. Definition of Done

Eine Seite oder Funktion gilt erst als abgeschlossen, wenn:

- der fachliche Zweck dokumentiert ist,
- das zugrunde liegende Core-Modell benannt ist,
- reale Daten statt fest eingebauter Beispieldaten unterstützt werden,
- Rollen und Sichtbarkeit geprüft sind,
- alle relevanten Zustände umgesetzt sind,
- mobile und Desktopdarstellung geprüft sind,
- Tastaturbedienung und Fokusführung funktionieren,
- Kontrast und zugängliche Namen geprüft sind,
- Sprache den NeuroWays-Schutzregeln entspricht,
- Empfehlungen und Muster ihre Grundlage erklären,
- Fehler ohne Datenverlust behandelt werden,
- Tests und Akzeptanzkriterien vorhanden sind,
- Dokumentation und Versionsstand aktualisiert sind.

## 26.1 Zusätzliche Abnahmefragen

Vor Freigabe ist zu prüfen:

1. Bewertet die Oberfläche unbeabsichtigt einen Menschen?
2. Wird eine Beobachtung als Tatsache über die Person dargestellt?
3. Ist die aktuelle Situation von langfristigen Beobachtungen getrennt?
4. Kann die Person eine Empfehlung oder Interpretation ablehnen?
5. Ist erkennbar, welche Daten eine Aussage begründen?
6. Bleiben persönliche Daten standardmäßig privat?
7. Ist die primäre Handlung auch ohne Farbe, Maus und Animation verständlich?
8. Kann eine unterbrochene Aufgabe später fortgesetzt werden?
9. Entsteht eine parallele Fachlogik außerhalb des Core?
10. Ist die Funktion mit wenig Energie und unter hoher Reizbelastung noch verständlich?

---

# 27. Nicht im Scope dieser Version

Noch nicht abschließend definiert sind:

- konkrete Datenbanktabellen und API-Verträge,
- vollständiges Berechtigungsmodell für Kinder und betreute Personen,
- rechtsverbindliche Datenschutz- und Aufbewahrungsfristen,
- endgültige digitalen Typografie- und Spacing-Tokens,
- vollständiges Motion-System für die Anwendung,
- validierte Matching- und Empfehlungsalgorithmen,
- Schwellenwerte für statistische Mustervorschläge,
- vollständige Lokalisierungs- und Übersetzungsregeln.

Diese Punkte benötigen eigene, referenzierte Spezifikationen. Sie DÜRFEN nicht durch implizite Implementierungsentscheidungen als endgültig festgelegt werden.

---

# 28. Wissensherkunft und Abgrenzung

| Inhalt | Fachliche Heimat |
| --- | --- |
| Menschenbild, Individualität, Entwicklung, Landkarte statt Vorgabe | NeuroWays Foundation und Gründungsmanifest |
| Farben, Linie, Markenwirkung | NeuroWays Design Philosophy |
| NeuroPlay-Leitformel, Core Language, Engines und Lernkreislauf | NW-PLAY Foundation Pack |
| Core vor Detaildokumentation und strukturgetriebene Entwicklung | NW-CORE Entwicklungsprinzip |
| frühe, nachvollziehbare Versionen | NW-METHOD-001 |
| Dokumenthierarchie und Vermeidung von Duplikaten | NW-CORE-001 und NW-DOC-000/001 |
| Navigation, Seitenstruktur und UI-Anforderungen | dieses Dokument |

Dieses Dokument wiederholt Grundlagen nur so weit, wie es für die verbindliche Ausgestaltung der Oberfläche nötig ist. Bei Widersprüchen haben freigegebene Foundation- und Core-Dokumente Vorrang.

---

# 29. Versionshistorie

| Version | Status | Änderung |
| --- | --- | --- |
| 0.1.0 | Draft | Bestehenden Oberflächenentwurf in einen versionierten NeuroPlay Interface Standard überführt; NeuroWays Foundation, Design Philosophy, NeuroPlay-Architektur, Privacy by Default, Explainability, Barrierearmut, Rollen, Datenqualität und Definition of Done ergänzt. |

---

## Leitsatz

> NeuroPlay zeigt keine richtige Route. Es macht Wege, Bedingungen und mögliche Wirkungen sichtbar, damit Menschen selbst entscheiden können, was gerade zu ihnen passt.
