# NeuroQuest – Entwicklungsphilosophie

> **NeuroQuest ist kein Produkt. NeuroQuest ist ein Gefühl.**
> 
> Wenn Kinder freiwillig weiterlesen möchten, ist NeuroQuest erfolgreich.

---

## Die Leitidee

Nicht zuerst programmieren.

Denke zuerst wie ein Kind.

Bevor du einen Bildschirm entwickelst, stelle dir immer diese Fragen:

- Was fühlt das Kind gerade?
- Was möchte das Kind als Nächstes tun?
- Muss das Kind gerade nachdenken?
- Oder soll es einfach weiterlesen?

**Jede Entscheidung muss aus Sicht eines Kindes getroffen werden. Nicht aus Sicht eines Entwicklers.**

---

## Die Goldene Regel

Ein Kind soll niemals überlegen müssen:

- Wo muss ich klicken?
- Was bedeutet dieser Button?
- Habe ich etwas falsch gemacht?
- Muss ich noch scrollen?
- Ist die Geschichte schon vorbei?

**Die Oberfläche beantwortet diese Fragen automatisch.**

---

## Seitendesign

### Jede Seite besitzt genau eine Aufgabe

**Nicht:**
```
Geschichte
  ↓
Regeln
  ↓
Buttons
  ↓
Fortschritt
  ↓
Navigation
  ↓
Illustration
  ↓
Hinweise
```

**Sondern:**
```
Eine Illustration.
Ein kurzer Text.
Ein großer Button.
Fertig.
```

### Jede Seite besitzt genau eine Emotion

Nicht mehrere gleichzeitig.

Zum Beispiel:
- 🌱 Neugier
- 😊 Freude
- 🤔 Nachdenken
- 🌟 Staunen
- 🌳 Ruhe

Die Emotion bestimmt:
- Bild
- Farben
- Text
- Animation
- Button

### Jede Seite besitzt genau eine Entscheidung

Nicht mehrere Buttons. Nicht verschiedene Wege.

Immer:
- Ein großer Hauptbutton
- Optional: Ein kleiner Zurück-Button
- Mehr nicht.

### Kein Bildschirm darf überladen wirken

Falls mehr Inhalte notwendig sind:

**Nicht scrollen. Neue Buchseite.**

---

## Der Rhythmus

### Die Geschichte führt

**Nicht die Aufgabe. Nicht die Technik. Nicht die Navigation.**

Die Geschichte bestimmt den Rhythmus der gesamten Anwendung.

### Die Aufgabe verschwindet

Während das Kind schreibt, verschwindet die Geschichte vollständig.

Während das Kind liest, verschwindet die Aufgabe vollständig.

Beides erscheint niemals gleichzeitig.

**Dadurch muss das Gehirn nicht zwischen Lesen und Arbeiten wechseln.**

### Der Bildschirm atmet

Nutze viel freien Raum.

- Keine kleinen Boxen.
- Keine Tabellen.
- Keine Informationssammlung.

Lieber:
- eine große Illustration
- ein kurzer Satz
- ein großer Button

---

## Bewertung & Belohnung

### NeuroQuest bewertet niemals

Es gibt keine:
- Sterne
- Medaillen
- Highscores
- Punkte
- Prozent
- Zeiten
- Noten

Der Satz **„Du bist fertig."** ist wichtiger als **„Du hast 100 % erreicht."**

### Belohnung

Die Geschichte ist die einzige Belohnung.

**Nicht Animationen. Nicht Feuerwerk. Nicht Konfetti. Nicht Sounds.**

Die größte Belohnung lautet:

**„Ich möchte wissen, wie es weitergeht."**

---

## Figuren & Sprache

### Illustrationen erzählen mit

Jedes Bild muss auch ohne Text verständlich sein.

Ein Kind soll das Bild ansehen und sofort denken:

**„Oh … was passiert denn jetzt?"**

Der Text beantwortet anschließend diese Frage.

### Caspar

Caspar spricht wie ein echtes Kind.

Er sagt zum Beispiel:
- „Was ist das denn?"
- „Das habe ich noch nie gesehen."
- „Ich glaube, da vorne leuchtet etwas."

**Nicht:** „Mission erfolgreich abgeschlossen."

### Lumi

Lumi spricht ruhig. Nie hektisch. Nie belehrend.

Lumi sagt:
- „Wir schauen einfach gemeinsam."
- „Wir haben Zeit."
- „Lass uns den nächsten kleinen Schritt gehen."

### Mino

Mino zeigt, dass Unsicherheit normal ist.

Er darf sagen:
- „Ich weiß gerade nicht weiter."

**Dadurch lernt das Kind: Nicht alles sofort zu wissen, ist völlig normal.**

---

## Übergänge & Bewegung

### Seitenwechsel

Zwischen zwei Seiten:

**Nicht:** harter Schnitt

**Sondern:**
- Illustration blendet weich aus.
- Licht wandert über den Bildschirm.
- Neue Buchseite erscheint.
- Wie beim Umblättern eines Bilderbuchs.

### Sound (falls später ergänzt)

Nur Natur.
- Wind.
- Blätter.
- Vögel.
- Leises Glockenspiel.

**Keine Computerspiel-Sounds.**

---

## Entwicklungsprinzipien

### Du entwickelst keinen fertigen Lernbegleiter

Du entwickelst einen **Concept Prototype**.

Das Ziel ist ausschließlich, die pädagogische Idee mit einem echten Grundschulkind zu testen.

**Deshalb gilt: Jede Funktion muss sofort testbar sein.**

### Weniger ist mehr

Wenn du zwischen zwei Lösungen wählen musst:
- die kleinere Lösung
- die größere Lösung

**Wähle immer die kleinere Lösung.**

NeuroQuest lebt von Klarheit. Nicht von Funktionsumfang.

### Keine Vorbereitungen für später

Baue nichts ein, nur weil es später vielleicht gebraucht wird.

**Nicht:**
- Datenbank vorbereiten
- Benutzerverwaltung vorbereiten
- API vorbereiten
- Mehrsprachigkeit vorbereiten
- Adminbereich vorbereiten

**Heute interessiert ausschließlich: Gefällt Kindern die Idee?**

### Jede Änderung muss sichtbar sein

Nach jeder Änderung muss sofort erkannt werden:
- Was wurde verändert?
- Warum wurde es verändert?
- Wie teste ich es?

Es dürfen niemals viele Dinge gleichzeitig geändert werden.

### Keine technischen Experimente

Verwende nur stabile Standardtechnologien.

- Keine experimentellen Bibliotheken.
- Keine unnötigen Frameworks.
- Keine komplizierten Animationen.

### Seiten statt Komponenten denken

Entwickle zuerst die Buchseiten. Nicht zuerst Komponenten.

Frage dich immer:
- **Welche Seite sieht das Kind gerade?**

**Nicht:** Welche React-Komponente baue ich?

### Test nach jeder Änderung

Nach jeder größeren Änderung frage dich:

**Würde ein achtjähriges Kind ohne Erklärung verstehen, was es jetzt tun soll?**

Falls nein, vereinfache die Oberfläche.

---

## Was der Prototyp bekommt & nicht bekommt

### ✅ Entwickle ausschließlich

- Startseite
- Tag-Auswahl
- Kinderbuchseiten
- Vier Arbeitsschritte
- Geschichtenseiten
- Tagesabschluss
- Dialog beim Tageswechsel
- Dialog beim Neustart

### ❌ Was ausdrücklich nicht entwickelt werden darf

- Login
- Datenbank
- Benutzer
- Speicherung
- Eltern
- Lehrkräfte
- Administration
- Statistiken
- Punkte / Sterne / Highscores / Ranglisten
- Timer
- Belohnungssysteme
- Cloud / Synchronisation

---

## Bilder und Texte

### Bilder werden später geliefert

Die Anwendung muss so entwickelt werden, dass Bilder einfach ersetzt werden können.

Für den ersten Entwurf dürfen Platzhalter verwendet werden.

### Texte werden von dir geliefert

Die Geschichte wird nicht von der Anwendung erzeugt.

Du lieferst:
- Einführung
- Storyteile
- Tagesabschluss
- Dialoge
- Figuren

Die KI entwickelt nur die Darstellung.

---

## Qualitätskriterien

Die Qualität von NeuroQuest wird nicht gemessen an:
- Anzahl der Funktionen
- Technik
- Codeumfang

**Sondern ausschließlich daran, wie sich die Anwendung für ein Kind anfühlt.**

---

## NeuroQuest ist erfolgreich, wenn …

- Ein Kind die Anwendung ohne Erklärung benutzen kann.
- Ein Kind nach dem ersten Tag freiwillig weitermachen möchte.
- Ein Kind neugierig auf den nächsten Geschichtenteil ist.
- Ein Kind nach einer Unterbrechung sofort wieder weiß, was als Nächstes zu tun ist.
- Ein Kind ruhig bleibt.
- Ein Kind sich niemals überfordert fühlt.

---

## Die wichtigste Frage

Bei jeder neuen Funktion stelle dir immer zuerst diese Frage:

**Hilft diese Funktion dem Kind dabei, das Abenteuer ruhiger und einfacher zu erleben?**

Falls die Antwort nicht eindeutig **Ja** lautet,

wird die Funktion nicht eingebaut.

---

## Die Prinzipien

### Das Zwei-Sekunden-Prinzip

Jede Seite muss innerhalb von zwei Sekunden verstanden werden.

Das Kind erkennt sofort:
- Wo bin ich?
- Was passiert gerade?
- Was ist mein nächster Schritt?

**Wenn dafür nachgedacht werden muss, ist die Seite zu kompliziert.**

### Das Drei-Sekunden-Prinzip

Nach spätestens drei Sekunden soll das Kind bereits auf den großen Hauptbutton klicken können.

- Es muss keine weiteren Informationen suchen.
- Es muss nicht scrollen.
- Es muss keine Menüs öffnen.

### Das Ein-Gedanke-Prinzip

Jede Seite besitzt genau einen Zweck.

Zum Beispiel:
- Geschichte lesen.
- Oder: Satz kontrollieren.
- Oder: Geschichte entdecken.

**Nicht mehrere Dinge gleichzeitig.**

### Das Kinderbuch-Prinzip

Nach jeder Aktion fühlt es sich an,

als würde eine neue Buchseite umgeblättert.

**Nicht wie eine neue Webseite.**

### Das Ruhe-Prinzip

Während einer Mission gibt es niemals:
- blinkende Elemente
- Popups
- Werbung
- Hinweise
- Benachrichtigungen
- Statistiken
- Ranglisten
- Ablenkungen

Alles unterstützt ausschließlich die aktuelle Aufgabe.

### Das Sicherheitsgefühl

Das Kind darf niemals Angst haben, etwas kaputt zu machen.

- Es gibt keine falschen Entscheidungen.
- Es gibt keine Strafen.
- Es gibt keine negativen Rückmeldungen.

Falls das Kind etwas verlassen möchte,

fragen Caspar und Lumi freundlich nach. Sie erklären. Sie begleiten. Das Kind entscheidet.

---

## Die Geschichte

### Sie endet immer positiv

Es gibt:
- Hoffnung
- Freundschaft
- Mut
- Neugier
- gemeinsames Lernen

Es gibt niemals:
- Gewalt
- Bosheit
- Bestrafung
- Angst
- Leistungsdruck

### Sprache

Alle Texte sind:
- kurz
- freundlich
- ruhig
- kindgerecht
- einfach

Keine komplizierten Wörter. Keine langen Sätze. Keine Ironie. Keine Sarkasmus.

---

## Abschluss jeder Entwicklung

Nach jedem Entwicklungsschritt prüfe selbst:

- ✓ Fühlt sich die Anwendung wie ein Kinderbuch an?
- ✓ Gibt es während einer Mission Scrollen?
- ✓ Sieht das Kind immer nur einen Gedanken?
- ✓ Ist sofort klar, was als Nächstes zu tun ist?
- ✓ Unterstützt Caspar das Kind?
- ✓ Beruhigt Lumi die Situation?
- ✓ Macht die Geschichte neugierig?
- ✓ Entsteht kein Leistungsdruck?

**Falls eine dieser Fragen mit Nein beantwortet wird, überarbeite die Lösung, bevor du sie abschließt.**

---

## Projektmotto

Die Entwicklung von NeuroQuest folgt immer diesem Satz:

> **„Ein kleiner Schritt. Eine kleine Geschichte. Ein großes Abenteuer."**

---

## Der innere Kompass

Wenn bei einer Entscheidung Unsicherheit entsteht:

Stelle dich selbst in die Rolle des Kindes. Nicht des Entwicklers. Nicht des Designers. Des Kindes.

Was würde es fühlen? Wozu hätte es Lust? Was würde es verwirren?

Das ist der Kompass.

Die Technik folgt, nicht umgekehrt.

---

# Arbeitsweise

## Deine Rolle

Du arbeitest nicht wie ein normaler Codegenerator.

Du arbeitest wie ein Mitglied des NeuroQuest-Teams.

Deine wichtigste Aufgabe besteht nicht darin, möglichst viele Funktionen zu entwickeln.

**Deine wichtigste Aufgabe besteht darin, den ruhigsten und einfachsten Weg für ein Kind zu finden.**

---

## Vor jeder Entwicklung

Bevor du eine neue Funktion entwickelst, frage dich:

**Braucht das Kind diese Funktion heute wirklich?**

Falls nein: Baue sie nicht.

---

## Während der Entwicklung

Halte jede Lösung so einfach wie möglich.

**Nicht:** „Das könnte später hilfreich sein."

**Sondern:** „Brauchen wir das heute?"

---

## Änderungen

Verändere niemals mehrere Bereiche gleichzeitig.

Arbeite in kleinen Schritten.

**Nach jedem Schritt muss der Prototype vollständig funktionieren.**

---

## Bestehendes schützen

Eine funktionierende Seite wird niemals grundlos umgebaut.

Wenn eine Verbesserung notwendig ist, ändere nur den betroffenen Bereich.

**Nicht die gesamte Anwendung.**

---

## Qualität vor Geschwindigkeit

Lieber eine ruhige, einfache, gut funktionierende Seite

als zehn halbfertige Funktionen.

---

## Keine Überraschungen

Das Kind soll jederzeit wissen:

- Wo bin ich?
- Was passiert jetzt?
- Was kommt danach?

---

## Navigation

Während einer Mission gibt es praktisch keine Navigation.

**Das Abenteuer führt das Kind automatisch.**

---

## Wiedererkennbarkeit

Alle Seiten müssen sich gleich anfühlen.

Das Kind soll nach wenigen Minuten die Bedienung verstanden haben.

Neue Geschichten verändern niemals die Bedienung.

**Nur den Inhalt.**

---

## Erweiterbarkeit

Auch wenn Version 0.1 bewusst klein bleibt, entwickle sauber.

Jede Seite soll später leicht gegen eine neue Geschichte austauschbar sein.

**Die Logik bleibt immer gleich. Nur Texte und Bilder ändern sich.**

---

## Fehlerbehandlung

Falls etwas fehlt (Bild, Text, Geschichte),

darf die Anwendung niemals abstürzen.

Stattdessen erscheint ein freundlicher Platzhalter.

Zum Beispiel: „Diese Seite wird gerade vorbereitet."

---

## Testbarkeit

Nach jedem Entwicklungsschritt muss die Anwendung sofort ausprobiert werden können.

- Keine unfertigen Teilbereiche.
- Keine weißen Seiten.
- Keine blockierten Buttons.
- Keine Sackgassen.

---

## Nach jeder Umsetzung

### Was wurde umgesetzt?

Kurz und verständlich.

### Was wurde bewusst nicht umgesetzt?

Erkläre kurz warum.

### Welche Dateien wurden geändert?

Liste alle geänderten Dateien auf.

### Wie teste ich die Änderung?

Schreibe eine kurze Testanleitung.

### Ist der nächste Schritt sinnvoll?

Mache genau einen Vorschlag. Nicht zehn.

---

## Definition von „Fertig"

Eine Funktion gilt erst als fertig, wenn:

- sie vollständig funktioniert,
- sie auf Smartphone getestet werden kann,
- sie ohne Erklärung verständlich ist,
- sie keine anderen Bereiche beschädigt,
- sie zum Kinderbuchgefühl passt.

---

## Die drei wichtigsten Sätze

> Die Geschichte ist wichtiger als die Technik.

> Die Kinder sind wichtiger als der Code.

> Die Erfahrung ist wichtiger als die Funktion.

---

## Das NeuroQuest-Versprechen

Jedes Kind soll NeuroQuest mit dem Gefühl schließen:

**„Heute habe ich wieder ein Stück unseres Abenteuers entdeckt."**

**Nicht:** „Heute habe ich meine Hausaufgaben erledigt."

---

## Die Wahrheit

> Wenn sich NeuroQuest irgendwann wie Software anfühlt, haben wir etwas falsch gemacht.
> 
> Wenn es sich wie das gemeinsame Lesen eines liebevoll illustrierten Kinderbuchs anfühlt, sind wir auf dem richtigen Weg.
