# NeuroPlay v0.5.0 – Datenbank-Schema

Dieses Schema speichert den kompletten Brettspielkatalog mit 844 Spielen und 32 Verlagen.

## Collections

### publishers (Verlage)
Speichert alle Spielverlage und deren Kontaktdaten.

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| original_record_id | Text (unique) | Excel-ID des Verlags |
| name_de | Text | Verlagsname auf Deutsch |
| country | Text | Verlagsland |
| priority | Number | Priorität für Katalogaufbau |
| website | URL | Website des Verlags |
| notes | Text | Besonderheiten, Hinweise |

**Beispiel:** 32 Verlage von „Kosmos" bis „Pegasus"

---

### catalog_games (Katalog)
Speichert alle 844 Spiele mit Links zu Regelquellen und Metadaten.

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| original_record_id | Text (unique) | Excel-ID des Spiels |
| title_de | Text | Spieltitel auf Deutsch |
| publisher | Relation → publishers | Verlag (Link zu publishers.id) |
| category | Text | Hauptkategorie (Familienspiel, Strategie, etc.) |
| category_secondary | Text | Nebenkategorie |
| language | Select | Verfügbare Sprache(n): de, en, fr, mixed |
| link_type | Text | Art des Links: Direkt-PDF, Produktseite, Regelkatalog |
| rule_url | URL | Direktlink zur Regel-PDF oder Produktseite |
| product_url | URL | Link zur Produktseite des Verlags |
| article_number | Text | Artikelnummer oder EAN |
| verification_status | Text | Prüfstatus: offiziell, geprüft, veraltet |
| verified_date | Text | Datum der letzten Prüfung |
| notes | Text | Spezielle Hinweise (Edition, Variante, etc.) |
| bgg_rank | Number | BoardGameGeek-Ranking (falls vorhanden) |
| bgg_id | Text | BoardGameGeek-ID |

**Beispiel:** 844 Spiele von „Kniffel" bis zu modernen Strategiespiele

---

### Import-Tracking

Um zu verfolgen, welche Spielversionen importiert wurden:

| Feld | Beschreibung |
|------|------------|
| original_record_id | Eindeutige Excel-ID — verhindert Duplikate |
| verification_status | Zeigt ob der Link noch aktiv/geprüft ist |
| verified_date | Wann wurde der Link zuletzt überprüft |

---

## Initialisierung

```javascript
// Im Admin-Bereich: Excel-Import
// → checked auf original_record_id → only new games added
// → report: "65 Spiele hinzugefügt, 779 bereits vorhanden"
```

---

## Features für die App

Mit diesem Schema kann die NeuroPlay-App:

1. **Spielsuche** – Filtert nach Titel, Verlag, Kategorie
2. **Regellinks** – Direkter Zugriff auf offizielle Anleitungen
3. **Koexistenz** – v0.4.0 und v0.5.0 parallel (unterschiedliche Collections)
4. **Spieltrennung** – Weiß, welche Spiele die User hochgeladen vs. Katalog
5. **Link-Verwaltung** – Sieht welche Links veraltet sind

---

**Version:** 0.5.0  
**Katalog:** 844 Spiele, 32 Verlage  
**Excel-Export:** NeuroPlay_Brettspielanleitungen_Quellenkatalog_v0.5.0.xlsx
