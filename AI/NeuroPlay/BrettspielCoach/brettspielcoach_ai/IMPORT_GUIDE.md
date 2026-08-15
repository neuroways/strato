# Neue Excel-Tabelle Importieren & Synchronisieren

Sobald du eine neue Excel-Datei hochgeladen hast, wird sie automatisch verarbeitet und in die Sammlungen synchronisiert.

## Schritt 1: Excel-Datei hochladen

Lade deine aktualisierte Excel-Tabelle ins `uploads/`-Verzeichnis. Das Skript findet automatisch die **neueste Datei**.

## Schritt 2: Import starten

Im App-Verzeichnis:

```bash
cd app

TOKEN=<dein-admin-token> npm run import-sync
```

Das macht:
- ✅ Liest die Excel-Datei
- ✅ Extrahiert Verlage, Spiele, Regelquellen
- ✅ Speichert JSON-Dateien (für Admin-Verwaltung)
- ✅ Lädt alles zu PocketBase hoch (neueste Daten live)

## Schritt 3: Fertig

Die Admin-Verwaltung und der öffentliche Katalog zeigen sofort die neuen Daten — kein Neustart nötig.

### Beispiel

```bash
cd app
TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... npm run import-sync
```

Output:
```
📖 Lese Excel-Datei: NeuroPlay_Brettspielanleitungen_Quellenkatalog_v0.8.0.xlsx

✅ 32 Verlage
✅ 924 Spiele
✅ 924 Regelquellen

============================================================
Synchronisiere zu PocketBase...
============================================================

📤 publishers (32 Datensätze)...
   ✅ 32 hochgeladen

📤 games (924 Datensätze)...
   ✅ 924 hochgeladen

📤 rule_sources (924 Datensätze)...
   ✅ 924 hochgeladen

============================================================
✅ Synchronisierung abgeschlossen!
============================================================
```

## Welche Excel-Struktur wird erwartet?

### Verlage-Blatt
- Verlag-ID
- Verlag (Name)
- Land
- Startseite
- Spieleübersicht
- Anleitungsquelle
- Relevanz
- Status
- Hinweis

### Spiele und Anleitungen-Blatt
- Datensatz-ID
- Verlag / Marke
- Spiel (Titel)
- Kategorie
- Sprache
- Linktyp
- Anleitung / Regelquelle (URL)
- Produkt- oder Katalogseite
- Artikelnummer / EAN
- Prüfstatus
- Geprüft am
- Hinweis
- Metadatenstatus
- Anleitungsstatus
- BGG-ID
- (weitere Felder optional)

---

**Fragen?** Das Skript gibt dir für jede Datei einen Bericht mit Anzahlen und Status.
