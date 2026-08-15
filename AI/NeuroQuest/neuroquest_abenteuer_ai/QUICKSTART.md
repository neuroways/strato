# NeuroQuest – Schnelleinstieg

## 🚀 Starten Sie die App

Die App lädt automatisch unter Ihrer Projekt-URL. Sie sehen die Login-Seite.

### Demo-Konten zum Ausprobieren:

| Rolle | E-Mail | Passwort |
|---|---|---|
| **Kind** | kid@demo.de | demo123 |
| **Lehrkraft** | teacher@demo.de | demo123 |

**Klicken Sie auf eine Rolle**, geben Sie die Daten ein, und Sie gelangen zum Dashboard.

---

## 👧 Kind-Bereich ausprobieren

1. Melden Sie sich mit `kid@demo.de` an
2. Sie sehen eine Übersicht der 5-Tages-Geschichte
3. Wählen Sie einen Tag (z.B. Montag)
4. Klicken Sie auf "Mission starten" für eine der 5 täglichen Aufgaben
5. Folgen Sie dem Ablauf: Aufgabe → Hinweise → Bearbeitung → Selbstkontrolle
6. Die App speichert Ihren Fortschritt automatisch (lokal)

**Was Sie sehen:**
- Geschichte: "Der geheimnisvolle Waldpfad" mit Luna, der Eule
- 5 Missionen pro Tag: Schreiben, Mathe, Lesen, Rechtschreibung, Kreativ
- Jede Mission endet mit einem motivierenden Hinweis
- Ein "Abenteuerbuch" zum Archivieren abgeschlossener Geschichten

---

## 👩‍🏫 Lehrkraft-Bereich ausprobieren

1. Melden Sie sich mit `teacher@demo.de` an
2. Sie sehen einen Platzhalter-Bereich mit Platzhalter-Buttons
3. **Hinweis:** Dieser Bereich wird in Woche 2 vollständig ausgebaut

**Kommend (Woche 2):**
- Neue Woche erstellen (Geschichte + Klassenstufe + 5 Tage × 5 Missionen)
- Eigene Aufgaben und Hinweise schreiben
- Fortschritt aller Schüler überwachen
- Geschichten für Klassenstufen 1–4 anpassen

---

## 📊 Datenspeicherung

**Aktuell:**
- Kindlicher Fortschritt wird **lokal** gespeichert (localStorage)
- Für echte Nutzung: aktivieren Sie Datensicherung in Woche 2

**Datenbank (PocketBase):**
- 7 Sammlungen sind einsatzbereit: children, teachers, parents, admins, weeks, missions, progress
- Demo-Konten sind bereits erstellt
- Neue Konten durch Registrierung hinzufügen

---

## 🛠️ Entwicklung & Anpassungen

### Neue Aufgaben hinzufügen

Bearbeiten Sie `src/lib/missions.ts`:

```javascript
{
  missionNumber: 1,
  title: 'Meine neue Aufgabe',
  description: 'Kurzbeschreibung',
  instructions: 'Detaillierte Anleitung für das Kind',
  type: 'writing', // oder: math, reading, spelling, creative
  hints: [
    'Erster Hinweis',
    'Zweiter Hinweis',
  ],
}
```

### Neue Klassenstufe hinzufügen

Bearbeiten Sie `src/lib/stories.ts` und erweitern Sie `gradeAdaptations`:

```javascript
gradeAdaptations: {
  1: { /* ... */ },
  2: { /* ... */ },
  3: { /* ... */ },
  4: { /* ... */ },
  5: { /* neue Klasse */ }
}
```

### Neue Geschichte hinzufügen

1. Fügen Sie zu `STORIES` in `src/lib/stories.ts` hinzu
2. Erstellen Sie ein `companionName` (Begleiter-Figur)
3. Definieren Sie 5 Tage mit `title`, `opening`, `cliffhanger`

---

## 🎨 Design & Styling

**Farben (Tailwind):**
- `amber` – warm, primär
- `green` – ruhig, erfolg
- `blue` – vertrauenswürdig
- `purple`, `pink` – besondere Momente

**Typen:**
- Überschriften: Georgia serif
- Text: System sans-serif
- Kinderfreundliche Größen (kein kleiner Text)

**Richtlinie:**
> "So spannend wie nötig. So ruhig wie möglich."

Keine blinkenden Effekte, keine Zeitlimits, keine Ranglisten!

---

## 📱 Responsiv testen

- **Handy:** 375 px breit
- **Tablet:** 768 px breit
- **Desktop:** 1280+ px breit

Alle Seiten funktionieren auf Handy, Tablet und Desktop.

---

## 🐛 Häufige Fehler

**„Ich kann mich nicht anmelden"**
- Verwenden Sie die Demo-Konten: `kid@demo.de` / `demo123`
- Neues Konto? Registrieren Sie sich mit **Rolle "Kind"** und Avatar

**„Mein Fortschritt ist weg"**
- Der Fortschritt wird **lokal** gespeichert
- Browser-Cache löschen speichert alles zurück
- In Woche 2: Speicherung in der Datenbank

**„Ich will eine neue Aufgabe hinzufügen"**
- Bearbeiten Sie `src/lib/missions.ts`
- Neuer Zustand wird in Echtzeit geladen (Vite HMR)

---

## 📋 Nächste Schritte (Priorität)

### Woche 2: Teacher & Parent Features
- [ ] Lehrkraft kann Wochen erstellen und verwalten
- [ ] Lehrkraft kann Missionen pro Tag definieren
- [ ] Lehrkraft kann Hinweise schreiben
- [ ] Eltern können Fortschritt sehen
- [ ] Eltern können Nachrichten schreiben

### Woche 3: Data Sync
- [ ] Fortschritt zu PocketBase migrieren
- [ ] Offline-Unterstützung (Service Worker)
- [ ] Automatisches Synchronisieren

### Woche 4: Polish
- [ ] Accessibility (WCAG AA)
- [ ] Mobile Testing auf echten Geräten
- [ ] Performance Audit (Lighthouse)

---

## 💬 Support & Erweiterungen

Diese MVP zeigt die **komplette Architektur**. Jedes Element ist erweiterbar:

- Neue Geschichten hinzufügen
- Neue Begleiter-Figuren
- Weitere Klassenstufen
- Audiovorhersage
- Adaptive Schwierigkeit
- Eltern-Kind-Abenteuer gemeinsam

Alles ist modular aufgebaut. Fragt jederzeit nach Anpassungen!

---

**Version:** 1.0 MVP  
**Built:** 2026-07-27  
**Language:** Deutsch (de)
