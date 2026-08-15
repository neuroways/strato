# PocketBase Schema-Einrichtung für NeuroPlay

## Problem

Der Quellenkatalog-Import benötigt sechs Datensammlungen (Collections) in PocketBase:
- publishers
- games
- game_editions
- rule_sources
- import_batches
- source_verification_history

Diese Sammlungen existieren noch nicht und müssen einmalig angelegt werden.

## Lösung

Die Datei `public/pb_schema_export.json` enthält das komplette Schema für alle sechs Sammlungen mit allen Feldern, Datentypen und Relationen.

### Schritt 1: Schema-Export-Datei vorbereiten

Die Datei befindet sich unter:
```
/public/pb_schema_export_json
```

Sie ist öffentlich zugänglich unter:
```
https://<deine-domain>/public/pb_schema_export.json
```

### Schritt 2: In PocketBase Admin-UI importieren

1. **PocketBase Admin-UI öffnen**
   - Produktiv: `https://<deine-domain>/.sfs-be/`
   - Entwicklung: `https://<deine-domain>/.sfs-bd/`

2. **Mit Admin-Credentials anmelden**
   - E-Mail und Passwort eingeben
   - Anmelden klicken

3. **Einstellungen öffnen**
   - Zahnradsymbol unten links anklicken
   - "Settings" / "Einstellungen" wählen

4. **Sammlungen importieren**
   - Im Einstellungsmenü nach "Import/Export" oder "Collections" suchen
   - Option "Import collections from JSON" wählen
   - Die Datei `pb_schema_export.json` auswählen oder den JSON-Inhalt einfügen

5. **Import bestätigen**
   - "Import" oder "Confirm" klicken
   - Warten, bis der Import abgeschlossen ist

### Schritt 3: Erstellung überprüfen

Nach dem erfolgreichen Import sollten in der PocketBase Admin-UI diese Sammlungen sichtbar sein:

```
✓ publishers             (7 Felder)
✓ games                  (12 Felder, Relation zu publishers)
✓ game_editions          (8 Felder, Relation zu games)
✓ rule_sources           (9 Felder, Relationen zu games und game_editions)
✓ import_batches         (17 Felder)
✓ source_verification_history  (5 Felder, Relation zu rule_sources)
```

### Schritt 4: Quellenkatalog-Import durchführen

Sobald alle Sammlungen existieren:

1. Veröffentlichte App öffnen
2. Admin-Bereich > Catalog Import
3. "Start Import" klicken
4. Auf Fertigstellung warten

**Erwartet wird:**
- 12 Verlage (publishers)
- 52 Spiele (games)
- 52 Editionen (game_editions)
- 52 Regelquellen (rule_sources)
- 1 Import-Batch (import_batches)

## Fehlerbehandlung

### "Schema-Setup erforderlich"

Die Sammlungen wurden nicht korrekt angelegt.

**Lösung:**
1. PocketBase Admin-UI öffnen
2. Collections prüfen (sollten in der linken Navigationsleiste sichtbar sein)
3. Falls fehlend: Import erneut durchführen
4. Falls vorhanden: Netzwerk-Cache leeren (Strg+Shift+R) und Importversuch wiederholen

### Einzelne Felder fehlen

Der Import war unvollständig.

**Lösung:**
1. Fehlerhafte Collection löschen
2. Schema erneut importieren
3. Import wiederholen

## Technische Details

Das Schema enthält:
- **Eindeutige Felder** für Duplikat-Erkennung (`publisher_code`, `original_record_id`)
- **Relationsziele** für referenzielle Integrität
- **Feldtyp-Validierung** (E-Mail, URL, Nummernbereiche)
- **Indizes** für Abfrage-Performance
- **Cascading-Optionen** für Löschverhalten (deaktiviert = sichere Löschung)

## Sicherheit

- Keine Admin-Credentials werden im Frontend gespeichert
- Schema-Import erfolgt ausschließlich in der PocketBase Admin-UI
- Alle Secrets bleiben auf der Administratorin-Seite
- Der Quellenkatalog-Import ist administrativ geschützt

## Support

Falls der Import fehlschlägt:
1. Vollständige Browser-Konsole prüfen (F12 > Console)
2. PocketBase Logs überprüfen (in Admin-UI: Logs-Sektion)
3. Sicherstellen, dass Admin-Anmeldung funktioniert (mit anderen Operationen testen)
4. Schema-Datei erneut hochladen
