# Synchronisiere Daten zu PocketBase

Diese Anleitung erklärt, wie du alle 5 Sammlungen mit den v0.7.0-Daten zu PocketBase synchronisierst.

## Schritt 1: PocketBase Admin öffnen

Gehe zu **`/.sfs-be/`** und melde dich an:
- E-Mail: `admin@test.com`
- Passwort: (dein Admin-Passwort)

## Schritt 2: Sammlungen erstellen

Im App-Verzeichnis:

```bash
cd app
npm run create-collections
```

Das erstellt 6 leere Sammlungen:
- **publishers** (Verlage)
- **games** (Spiele)
- **rule_sources** (Regelquellen)
- **game_editions** (Spieleditionen)
- **source_verification_history** (Prüfhistorie)
- **import_batches** (Import-Batches – optional)

## Schritt 3: Daten synchronisieren

Sobald die Sammlungen existieren:

```bash
npm run sync-data
```

Das lädt automatisch:
- 32 Verlage
- 924 Spiele
- 924 Regelquellen
- 100 Spieleditionen
- 924 Prüfhistorie-Einträge

## Schritt 4: Admin anschauen

Gehe zu **`/.sfs-be/`** und siehst die Sammlungen jetzt mit echten Daten. Im App-Admin oben werden sie auch angezeigt.

## Falls es nicht läuft

1. **PocketBase nicht erreichbar?**
   - Stelle sicher, dass PocketBase unter `http://localhost:8090` läuft
   - Oder setze die URL: `PB_URL=http://deine-url npm run create-collections`

2. **Authentifizierung fehlgeschlagen?**
   - Admin-Passwort überprüfen
   - Oder setzen: `PB_ADMIN_PASSWORD=dein_passwort npm run create-collections`

3. **Sammlungen existieren bereits?**
   - Das ist kein Problem – das Skript überspringt sie und synchronisiert die Daten

## Daten bearbeiten

Nach dem Sync kannst du im Admin alles bearbeiten. Die Änderungen sind sofort sichtbar.

---

**Fragen?** Schreib – ich help gerne weiter.
