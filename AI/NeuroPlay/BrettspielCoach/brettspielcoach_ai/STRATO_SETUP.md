# STRATO PocketBase Setup

Deine Sammlungen (Spiele, Verlage, Regelquellen) sind bereit für PocketBase. So synchronisierst du sie:

## 1. Admin-Zugang öffnen

Gehe zu deiner Domain:
- **Development**: `https://deine-domain.de/.sfs-bd/`
- **Production**: `https://deine-domain.de/.sfs-be/`

Melde dich mit deinen Admin-Zugangsdaten an.

## 2. Sammlungen erstellen

Im Terminal:

```bash
cd app

# Ersetze deine-domain.de mit deiner echten Domain
PB_URL=https://deine-domain.de/.sfs-bd \
PB_ADMIN_EMAIL=dein-email@example.com \
PB_ADMIN_PASSWORD=dein-passwort \
npm run create-collections
```

Das erstellt folgende leere Sammlungen:
- **publishers** – 32 Verlage
- **games** – 924 Spiele
- **rule_sources** – 924 Regelquellen
- **game_editions** – 100 Spieleditionen
- **source_verification_history** – 924 Prüfeinträge

## 3. Daten hochladen

Sobald die Sammlungen existieren:

```bash
PB_URL=https://deine-domain.de/.sfs-bd \
PB_ADMIN_EMAIL=dein-email@example.com \
PB_ADMIN_PASSWORD=dein-passwort \
npm run sync-data
```

Das füllt alle Sammlungen mit den Daten aus der v0.7.0 Excel.

## 4. Im Admin überprüfen

Gehe zurück zu `/.sfs-bd/` — dort siehst du alle Sammlungen mit echten Daten.

In deiner App-Verwaltung (der Admin-Tab oben) sind sie auch sofort verfügbar zum Durchsuchen und Bearbeiten.

---

## Wenn etwas nicht läuft

**Authentifizierung fehlgeschlagen?**
- Admin-Email und Passwort überprüfen
- Sicherstellen, dass die Domain korrekt ist

**URL-Fehler?**
- Dev nutzt `.sfs-bd/`, Production nutzt `.sfs-be/`
- Deine echte Domain verwenden, nicht `localhost`

**Sammlungen existieren bereits?**
- Das ist OK — das Skript überspringt sie und synchronisiert Daten

---

Brauchst du Hilfe? Schreib — ich helfe gerne weiter.
