# NeuroWays Governance Foundation v1.0

**Dokumentcode:** NW-GOVERNANCE-FOUNDATION-v1.0  
**Status:** published  
**Veröffentlicht:** 2026-07-23  
**Verantwortlich:** NeuroWays Core

---

## Zweck

Die NeuroWays Governance Foundation v1.0 ist der erste formale Architektur-Meilenstein der NeuroWays-Plattform.

Sie schafft das verbindliche Regelwerk, auf dessen Basis alle zukünftigen NeuroWays-Module, Methoden, Designsysteme, APIs und Datenmodelle entwickelt werden.

Ohne eine gemeinsame Governance-Grundlage entstehen Systeme, die schwer zu warten, zu erweitern und zu erklären sind. Die Foundation verhindert das — nicht durch Bürokratie, sondern durch klare, einfache Regeln, die konsequent angewendet werden.

---

## Enthaltene Standards

| Code | Titel | Version | Status | Veröffentlicht |
|------|-------|---------|--------|----------------|
| NW-STD-000 | Standards Framework Standard | 1.0.1 | published | 2026-07-23 |
| NW-STD-001 | Naming Standard | 1.0.1 | published | 2026-07-23 |
| NW-STD-002 | Standards Registry Standard | 1.0.1 | published | 2026-07-23 |
| NW-STD-003 | Database Standard | 1.0.1 | published | 2026-07-23 |

Alle vier Standards sind aktiv, verbindlich und unveränderlich in ihrer fachlichen Substanz. Korrekturen und Erweiterungen erfolgen ausschließlich als neue Versionen.

---

## Veröffentlichungsreihenfolge

Die Reihenfolge folgt dem Dependency-Prinzip: Standards, die von anderen abhängig sind, werden zuletzt veröffentlicht.

```
Schritt 1: NW-STD-002 (Registry Standard)
  → Als erstes veröffentlicht, damit Bootstrap-Phase offiziell endet
  → Statusübergang: review → approved → published

Schritt 2: NW-STD-000 (Framework Standard)
  → Grundlage für alle anderen Standards
  → Statusübergang: draft → approved → published

Schritt 3: NW-STD-001 (Naming Standard)
  → Abhängig von NW-STD-000
  → Statusübergang: review → approved → published

Schritt 4: NW-STD-003 (Database Standard)
  → Abhängig von NW-STD-000 und NW-STD-001
  → Statusübergang: draft → approved → published
```

---

## Architektur-Zusammenfassung

### Was die Foundation regelt

**NW-STD-000** definiert den Rahmen: Was ist ein NeuroWays-Standard? Wie ist er aufgebaut? Wie wird er versioniert? Wie entsteht er, und wie wird er außer Kraft gesetzt? Alle anderen Standards folgen diesem Rahmen.

**NW-STD-001** definiert die Sprache: Wie werden Collections, Felder, Business-Codes, Dateien, API-Endpunkte und Dokumente benannt? Konsistente Namen machen ein System wartbar, erklärbar und automatisch prüfbar.

**NW-STD-002** definiert das Verzeichnis: Welche Standards existieren? Welche Nummern sind vergeben? Welcher Status gilt? Das Registry ist die einzige autoritative Quelle. Kein Standard gilt ohne Eintrag.

**NW-STD-003** definiert die Datenarchitektur: Wie werden fachliche Objekte modelliert? Wie werden Beziehungen aufgebaut? Wie wird Datenintegrität sichergestellt — unabhängig von der eingesetzten Plattform?

### Was die Foundation nicht regelt

Die Foundation legt Prinzipien fest, keine Implementierungen. Folgende Themen sind bewusst ausgeklammert und werden in nachfolgenden Standards geregelt:

- Konkrete Versioning-Regeln (NW-STD-010)
- API-Konventionen (NW-STD-011)
- Sicherheit und Datenschutz (NW-STD-012)
- Lebenszyklusübergänge mit Fristen (NW-STD-013)
- Governance-Instanz und Entscheidungsfindung (NW-GOV-001)

---

## Bekannte offene Punkte

Diese Punkte sind bewusst dokumentiert und aufgeschoben — nicht vergessen.

| Thema | Betroffener Standard | Vorgesehen in |
|-------|---------------------|---------------|
| Ausnahmeregel für NeuroWays-Weltbegriffe (z.B. KUESTE) | NW-STD-001 | v1.1.0 |
| Governance-Instanz formal benennen | NW-STD-002 | NW-GOV-001 |
| Feldbenennung created_at / updated_at für bestehende Collections | NW-STD-003 | Nächste MAJOR-Migration |
| Mehrmandantenfähigkeit | NW-STD-003 | v1.1.0 |
| Datenschutz und DSGVO-Felder | NW-STD-003 | NW-STD-012 |
| Maschinenlesbares Regelwerk für Standards | NW-STD-000 | NW-GOV-001 |

---

## Empfehlung für die nächste Entwicklungsphase

Die Governance Foundation ist das Fundament. Was jetzt folgt, sind die ersten Gebäude darauf.

### Empfohlene Reihenfolge — Phase 2

**Sofort (Grundlagen für alle weiteren Standards):**

1. **NW-STD-010 — Versioning Standard**
   Detaillierte Semver-Regeln, Abwärtskompatibilitätsversprechen, Deprecation-Fristen.
   Wird heute bereits von NW-STD-002 und NW-STD-003 referenziert — fehlende Grundlage.

2. **NW-GOV-001 — Standards Governance**
   Registry-Instanz formal benennen, Genehmigungsworkflow definieren.
   Ohne dieses Dokument bleibt die Governance-Instanz implizit.

**Danach (technische Grundlagen):**

3. **NW-STD-011 — API Standard**
   Vor erster externer Integration zwingend erforderlich.

4. **NW-STD-012 — Security Standard**
   Vor erster Produktivnutzung mit Benutzerdaten erforderlich.

**Parallel zur App-Entwicklung:**

5. **NW-STD-050 — Design System Standard**
   Formalisiert die bestehende NeuroWays World als verbindlichen Design-Standard.

6. **Illustrationen und Icons** für den Energy Navigator
   Das NeuroWays World Asset-Management ist vorbereitet (Asset-Collections angelegt, Validierungs-Engine aktiv). Die ersten fünf Zonenillustrationen können jetzt generiert werden.

### Technische Empfehlung für die App

Der Energy Navigator ist funktionsfähig, validiert und versioniert. Der nächste sinnvolle Schritt auf der App-Seite ist die Integration des Illustrations- und Icon-Systems — die Governance-Grundlage dafür steht.

---

*NeuroWays Governance Foundation v1.0 — veröffentlicht 2026-07-23 — NeuroWays Core*
