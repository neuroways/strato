# Master-Prompt: Sichere Projekt-Migration zu NeuroWays

*Für: Datenmigration aus existierenden Projekten in eine neue NeuroWays-Instanz*  
*Status: Template für wiederkehrende Migrationen*  
*Letzte Aktualisierung: 2026-07-25*

---

## Vorbedingungen

Bevor du diesen Prompt startest, stelle sicher:

### 1. Das Quellprojekt liegt als ZIP vor

**Der ZIP-Ordner muss EXAKT diese Struktur haben:**

```
/AltesProjekt-dev.zip
  └── /AltesProjekt-dev/          (root aus dem GitHub-Download)
      ├── /app/                   ← KRITISCH: Der gesamte /app-Ordner
      │   ├── src/
      │   ├── public/
      │   ├── dist/
      │   ├── index.html
      │   ├── package.json
      │   ├── vite.config.js
      │   ├── tailwind.config.cjs
      │   └── AGENTS.md            ← Projektdokumentation
      ├── /static/                 ← Falls vorhanden: Design-Assets
      ├── /uploads/                ← Falls vorhanden: User-Uploads
      ├── Dokumentation/ oder *.md ← Alle Markdown-Dateien
      └── json Files/ oder *.json  ← Alle Seed/Export-Daten
```

**Was NICHT mitgenommen wird:**
- `node_modules/` (wird ignoriert)
- `.git/` (wird ignoriert)
- `dist/` (wird neu gebaut)

**Wenn dein Projekt anders strukturiert ist:**
- ZIP immer mit dem gesamten `/app`-Ordner
- Dokumentation und JSON separat mitziehen
- Keine Beschneidung — lieber zu viel als zu wenig

---

### 2. Das Zielproject (wo du bist)

Du bist **in dieser Instanz bereits online**. Das neue NeuroWays-Projekt lädt unter `/` im Browser.

Deine aktuelle Struktur:
```
/app/                   ← Aktuelles Projekt
/static/                ← Designassets (werden hier bedient)
/migration/             ← Hier landet der alte /app-Export
```

---

### 3. Das ZIP-File hochladen

Lade die ZIP-Datei über den File-Manager hoch. Sie landet dann in:
```
/uploads/<dateiname>.zip
```

---

## Das Vorgehen in 3 Phasen

### Phase 1: Analyse (kein Code-Change)

**Was passiert:**
1. ZIP wird entpackt nach `/app/migration/<ProjektName>/<Version>/`
2. Ein separater KI-Agent liest **ohne etwas zu verändern**:
   - AGENTS.md und Core-Dokumentation
   - Alle Standards und Design-Definitionen
   - Alle Datenmodelle (JSON-Seeds)
   - Alle React-Komponenten und Pages
   - Abhängigkeiten und Architektur

3. **Ergebnis: 4 Analyseberichte**
   - **QUICK_START.md** — 5 Min, die wichtigsten Fakten
   - **BRIEFING_REPORT.md** — 30 Min, vollständige technische Analyse
   - **DOCUMENTED_DISCREPANCIES.md** — Alle Widersprüche & Lösungen
   - **ANALYSIS_INDEX.md** — Navigation: was lese ich in welcher Reihenfolge?

**Deine Aufgabe:**
- Berichte lesen
- Go/No-Go entscheiden
- Risiken prüfen
- Migrationsschritte akzeptieren

**Keine Änderungen am Code, keine Datenverluste.**

---

### Phase 2: Planung (mit dir zusammen)

**Nach der Analyse fragst du:**

Beispiele von Fragen, die du stellen kannst:

- *„Welche Pages des alten Projekts brauche ich wirklich?"*
- *„Kann ich nur die Seed-Daten (Fragen, Zonen) mitnehmen, nicht die alten Check-ins?"*
- *„Welche Komponenten sind wiederverwendbar, welche musste ich neu schreiben?"*
- *„Was ist ein Core-Kandidat — was kann ich später noch ändern?"*
- *„Wo sind die Risiken für Datenverlust?"*

**Ich antworte mit:**
- Klare Risiko-Einordnung pro Element
- Reversible Migrationsschritte
- Rollback-Plan für jeden Schritt
- Konkrete Datei-Listen: was ändert sich, in welcher Reihenfolge

---

### Phase 3: Migration (mit Checkpoints)

**Migrationsschritte sind klein und rückrollbar.**

Beispiel-Ablauf:
1. **Schritt 1:** Seed-Daten (Fragen, Zonen) in neue DB migrieren → Test
2. **Schritt 2:** Komponenten von alt zu neu kopieren → Tests bestätigen
3. **Schritt 3:** Design-Tokens und Illustrationen → Visual Check
4. **Schritt 4:** Check-ins importieren (optional) → Daten-Validierung
5. **Schritt 5:** Alte Collections archivieren (erst nach grüner Baseline)

**Nach jedem Schritt:**
- ✓ Feature läuft live
- ✓ Tests bestanden
- ✓ Rollback-Plan liegt vor

---

## Was ist VERBOTEN

Diese Dinge passieren **niemals** — auch nicht unter Druck:

```
❌ Historische Daten löschen vor Phase-End
❌ Datenmodelle „schnell mal" umbenennen
❌ Seed-Daten neuberechnen (z.B. Zonen-Scores)
❌ IDs oder Versionen neu vergeben
❌ Code-Änderungen ohne Test-Plan
❌ Duplizierter Core Code in mehreren Modulen
❌ Stille Änderungen (alle Modifikationen sind dokumentiert)
```

---

## Prompt für die KI-Analyse (Copy-Paste ready)

Wenn deine ZIP-Datei hochgeladen ist, kopiere diesen Prompt und füge ihn rein:

---

### 📋 MIGRATION-AUFTRAG AN KI

**Status:** Analyse, kein Code-Change  
**Quelle:** `uploads/<dateiname>.zip`  
**Ziel:** `/app/migration/<ProjektName>/<Version>/`  

**Arbeitsschritte:**

1. **Entpacke** die ZIP-Datei
2. **Lese nacheinander** (in dieser Reihenfolge):
   - AGENTS.md (Was ist das Projekt?)
   - NEUROWAYS_WORLD.md oder äquivalent (Design/Standards)
   - Alle Core-Dokumentation (wenn vorhanden)
   - Alle Module-Dokumentation (wenn vorhanden)
   - Alle JSON-Dateien (Seed-Daten, Exports, Records)
   - Alle React-Komponenten (oberflächlich)
   - Abhängigkeiten und Konfiguration

3. **Erstelle 4 Berichte** (in `/migration/<ProjektName>/`):
   - **QUICK_START.md** — 5 Min Überblick, Top-3-Fakten, 1 Go/No-Go
   - **BRIEFING_REPORT.md** — Technische Vollanalyse (30–40 min Lesedauer)
   - **DOCUMENTED_DISCREPANCIES.md** — Alle Widersprüche, geklärt
   - **ANALYSIS_INDEX.md** — Navigation

4. **Identifiziere** (für jeden Bericht):
   - Modularität: Was gehört zusammen?
   - Core-Kandidaten: Was ist Plattform, was ist fachlich?
   - Abhängigkeiten: Was muss zuerst gehen?
   - Risiken: Wo könnte Datenverlust passieren?
   - Migrationsreihenfolge: Kleine, rückrollbare Schritte

5. **Keine Änderungen:**
   - Nicht speichern, nicht löschen, nicht kopieren
   - Nur Analyse

---

---

## Checkliste: Bin ich bereit?

Bevor du den Prompt sendest:

```
☐ Das ZIP-File ist im Original-GitHub-Download enthalten
☐ Der /app-Ordner ist VOLLSTÄNDIG drin (nicht beschnitten)
☐ Alle Markdown-Dateien sind drin (Dokumentation)
☐ Alle JSON-Dateien sind drin (Seed-Daten, Exports)
☐ Keine großen Binärdateien mitgenommen (Bilder okay, Videos nicht)
☐ Das ZIP ist < 10 MB (wenn größer, prüf auf node_modules)
☐ Du hast die 4 Berichte gelesen und verstanden
☐ Du kennst die Risiken (siehe „Was ist VERBOTEN")
☐ Du hast einen Rollback-Plan im Kopf
```

---

## Support während Migration

**Wenn etwas unklar ist:**

- *„Welche Collections muss ich mitnehmen?"* → Schau in BRIEFING_REPORT.md, Sektion „Collections"
- *„Kann ich nur die Komponenten nehmen, nicht die Daten?"* → Ja, wenn BRIEFING_REPORT.md sagt, dass sie unabhängig sind
- *„Was passiert mit alten Check-ins?"* → DOCUMENTED_DISCREPANCIES.md sagt dir, wie sie versioned sind
- *„Wann ist ein Rollback zu spät?"* → Nach jedem Schritt steht die Deadline im Plan

---

## Nach erfolgter Migration

Speichern:
- Alle 4 Analyseberichte (für nächste Migration)
- Dein Migrationsplan (als Referenz)
- Das ursprüngliche ZIP-File (als Archiv)

Löschen:
- Alte Collections (erst nach 4-Wochen-Stabilität)
- Temporäre Dateien

---

*Dieses Vorgehen ist standardisiert und reversibel. Jeder Schritt kann rückgängig gemacht werden, solange du nach dem Plan vorgehst.*

*Fragen? Starte mit Phase 1 (Analyse). Alles andere folgt danach.*
