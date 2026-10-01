# Excel-Import – Genauer Ablauf

## 1. Was passiert beim Upload

Wenn du eine Excel-Datei hochlädst:

**Schritt 1: Lesen im Browser**
- Deine Datei wird **direkt in deinem Browser** gelesen (nicht zum Server hochgeladen)
- Der Browser liest die Datei als `arrayBuffer` (binäre Daten)
- Die XLSX-Bibliothek verarbeitet die Daten
- Das passiert **lokal auf deinem Gerät** — die Datei verlässt deinen Computer nicht

**Schritt 2: Extrahieren der Daten**
- Der Browser sucht nach zwei Blättern:
  - **„Verlage"** → Verlags-Informationen (Verlag-ID, Name, Website, etc.)
  - **„Spiele und Anleitungen"** → Spiele-Daten (Titel, Kategorie, Links, etc.)
- Alle Zeilen werden in JSON-Objekte umgewandelt
- Beispiel: Eine Spiel-Zeile wird zu:
  ```json
  {
    "original_id": "s_001",
    "title": "Carcassonne",
    "publisher_original_id": "P_02",
    "category_primary": "Strategie",
    "rule_url": "https://...",
    ...
  }
  ```

## 2. Wo landen die Daten zwischendrin?

Nach dem Lesen und Verarbeiten:

**Temporär im Browser-Speicher (RAM)**
- Die verarbeiteten Daten liegen nur kurzzeitig im Speicher
- Du siehst die Erfolgsmeldung: „✅ Import abgeschlossen"

**Dann: Speicherung auf deinem Gerät (localStorage)**
- Die Daten werden in deinem Browser-Speicher unter drei Keys gespeichert:
  - `neuroplay_games_import` → alle Spiele
  - `neuroplay_publishers_import` → alle Verlage
  - `neuroplay_rulesources_import` → alle Regelquellen
- Diese sind **nur auf deinem Computer** und **nur in diesem Browser**
- Wenn du den Browser-Cache leerst, sind sie weg

## 3. Warum landen sie nicht automatisch in der Datenbank?

Das ist das Problem: Der Code sagt zwar „synchronisiert automatisch", aber das stimmt nicht.

**Was passiert wirklich:**
1. ✅ Datei wird gelesen
2. ✅ Daten werden verarbeitet
3. ✅ Daten werden im Browser gespeichert (localStorage)
4. ❌ Daten werden **NICHT** zur Datenbank synchronisiert

Die Synchronisation zur Datenbank ist **nicht implementiert**.

## 4. Wie könnten die Daten in die Datenbank kommen?

Es bräuchte einen zusätzlichen Schritt nach dem Import:

**Option A: Auto-Sync nach Import** (das ist das Ziel)
```
Excel hochladen 
→ Datei lesen & verarbeiten 
→ Im Browser speichern 
→ ZUR DATENBANK HOCHLADEN (fehlt noch)
→ Dort für alle Seiten sichtbar
```

**Option B: Manueller Sync-Button**
```
Excel hochladen 
→ Daten im Browser speichern 
→ Du klickst „Jetzt synchronisieren" 
→ Daten gehen zur Datenbank
```

## 5. Aktuelle Situation

- **Lokal (im Browser auf deinem PC):** 1.612 Spiele gespeichert
- **In der Datenbank (für alle sichtbar):** 924 Spiele (die ursprünglichen)

Wenn du die Admin-Verwaltung öffnest, siehst du **immer** die neuesten Daten aus dem lokalen Speicher (dank `AdminDataBrowser` greift auf `localStorage` zu). Aber wenn du dich **abmeldest** oder einen **anderen Browser** nutzt, sind deine gerade importierten Spiele **weg** — weil sie nur lokal gespeichert waren.

## 6. Was wir machen müssen

Nach dem erfolgreichen Import (wenn die Erfolgsmeldung erscheint) müssen die Daten **auch in die Datenbank geschrieben werden**.

Das bedeutet für jedes Spiel und jeden Verlag einen API-Aufruf wie:
```
POST /collections/games/records
{
  "id": "s_001",
  "title": "Carcassonne",
  ...
}
```

Das wird dann automatisch für alle Seiten verfügbar und bleibt erhalten.
