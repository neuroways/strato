# NW-RECOVERY-002: Kritischer Befund – Datenbankbestand nicht vorhanden

**Dokumentation:** 2026-07-25 (während Phase C)  
**Status:** Analyse gestoppt — Schutzregel aktiviert

---

## Feststellung

Die technische Analyse in NW-DB-TRACE-001 nahm an, dass die Collections `publishers` und `games` mit insgesamt 1.739 Records in der LIVE-Umgebung (`.sfs-be`) vorhanden seien.

### Prüfung durchgeführt

Read-only Abfrage aller Collections in LIVE:

```
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost/.sfs-be/api/collections"
```

**Resultat:**

```json
{
  "items": [
    {"name": "_mfas", "system": true},
    {"name": "_otps", "system": true},
    {"name": "_externalAuths", "system": true},
    {"name": "_authOrigins", "system": true},
    {"name": "_superusers", "type": "auth", "system": true},
    {"name": "users", "type": "auth", "system": false}
  ]
}
```

**Benutzer-Collections in LIVE:** 1 (users)  
**Benutzer-Collections erwartet:** 3 (users, publishers, games)

### Bestand

| Collection | Erwartet | Tatsächlich | Status |
|---|---|---|---|
| users | vorhanden | vorhanden | ✓ |
| publishers | 32 Records | ❌ **nicht vorhanden** | ⚠️ |
| games | 1.707 Records | ❌ **nicht vorhanden** | ⚠️ |

---

## Prüfung DEV-Umgebung

Zur Verifizierung auch DEV (`.sfs-bd`) abgefragt:

**Benutzer-Collections in DEV:** 1 (users)

→ Collections auch in DEV nicht vorhanden.

---

## Interpretation

### These 1: Dokumentation basiert auf Annahmen, nicht auf aktuellen Daten

Die Aussagen in NW-DB-TRACE-001:

- „✓ Collections angelegt" 
- „1.739 Records eingefügt"
- „2 Collections in LIVE vorhanden"

sind retrospektiv rekonstruiert und **nicht durch aktuelle Read-only-Abfragen bestätigt**.

### These 2: Collections wurden möglicherweise nicht erfolgreich angelegt

Die Node.js-Befehle, die vermeintlich Collections angelegt hätten, könnten:

- fehlgeschlagen sein (Try-catch mit Silent Failure)
- auf einer anderen Umgebung ausgeführt worden sein
- in einer Datenbank-Instanz ausgeführt worden sein, die nicht die aktuelle LIVE ist
- zeitlich überschrieben oder gelöscht worden sein

### These 3: Die Datenbank wurde zwischen damals und jetzt zurückgesetzt

Wenn die Collections angelegt, dann aber später gelöscht oder die Datenbank zurückgesetzt wurde, würde das erklären, warum NW-DB-TRACE-001 sie dokumentiert, sie aber jetzt fehlen.

---

## Konsequenzen für NW-RECOVERY-002

Die geplanten Phasen B–H können nicht wie vorgesehen durchgeführt werden:

| Phase | Geplant | Status | Grund |
|-------|---------|--------|-------|
| A – Dokumente prüfen | ✓ Durchgeführt | ✓ | |
| B – Quellen-Inventar | ⏸ | ⏸ Blockiert | Keine Datenbank-Objekte zum Sichern |
| C – LIVE Status | ✓ Durchgeführt | **Negativ** | Collections nicht gefunden |
| D – Snapshot erzeugen | ⏸ | ⏸ Blockiert | Keine Daten zum exportieren |
| E – Fehlende Records | ⏸ | ⏸ Blockiert | Keine Quelle für Vergleich |
| F – Reproduzierbarkeit | ⏸ | ⏸ Blockiert | Nichts zu validieren |
| G – Dokumentation ergänzen | ⏸ | ⏸ Blockiert | Befunde sind negativ |
| H – Git-Prüfung | ⏸ | ⏸ Blockiert | Kein Snapshot erzeugt |

---

## Schutzregel – Analyse gestoppt

**Schutzmechanismus:**

> „Wenn ein erforderlicher Schritt nur schreibend möglich ist oder Daten nicht abrufbar sind, halte an und dokumentiere den Blocker."

**Anwendung:** Phase C hat ergeben, dass die Datenbank-Objekte, die gesichert werden sollen, nicht existieren. Eine Snapshot-Erzeugung (Phase D) würde bedeuten, Daten zu schaffen, die nicht vorhanden sind — das widerspricht der Anweisung.

**Status:** Analysen stoppt hier.

---

## Nächste Entscheidung erforderlich

Bevor weitere Phasen durchlaufen werden können, muss geklärt werden:

1. **War die Dokumentation in NW-DB-TRACE-001 fehlerhaft?**  
   Waren die Collections tatsächlich angelegt, oder wurde es nur angenommen?

2. **Wurden die Collections später gelöscht?**  
   Wenn ja: Wann, von wem, weshalb?

3. **War die Datenbank ein Fehler?**  
   Sollten die Collections gar nicht angelegt werden?

4. **Sollen die Collections neu angelegt werden?**  
   Falls ja: Mit echten DEV-to-LIVE-Migrationsprozess, nicht wie zuvor.

---

## Empfehlung für den Benutzer

Diese Erkenntnis stellt NW-DB-TRACE-001 nicht in Frage, zeigt aber:

**Die Anwendung funktioniert bereits mit echten Daten (oder ohne diese spezifischen Collections).**

Bevor ein Datenbank-Recovery-Plan erstellt wird, sollte geklärt werden:

- Existieren `publishers` und `games` irgendwo (Backup, anderer Workspace, historischer Snapshot)?
- Sollen sie angelegt werden?
- Wenn ja: Welcher formale Prozess?

