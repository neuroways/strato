# Datenbank-Struktur – Wo deine Spiele landen

## Deine Umgebung bei STRATO

Du hast **eine Datenbank-Instanz**, die sich je nach Kontext unterscheidet:

### Entwicklung (während du arbeitest)
- **Adresse:** `https://aibuilder-514nc.preview.ai-builder.strato.de/.sfs-bd`
- **Authentifizierung:** über dein Admin-Passwort
- **Zweck:** Zum Testen und Entwickeln
- **Daten hier:** Spielen Sie herum, testen Sie neue Features

### Live-Betrieb (für deine Besucher)
- **Adresse:** `https://sfs-05zwnczjvysr.live-website.com/.sfs-be/`
- **Authentifizierung:** deine Benutzer melden sich an
- **Zweck:** Das, was deine Nutzer sehen und nutzen
- **Daten hier:** Die echten Spiele, Benutzer, Sammlungen

## Was beim Excel-Import passiert

1. **Du lädst eine Datei hoch** → Der Browser verarbeitet sie lokal
2. **Code schreibt die Daten** → Sie gehen an **beide Datenbanken gleichzeitig**:
   - `/.sfs-bd/api/collections/games/records` (Entwicklung)
   - `/.sfs-be/api/collections/games/records` (Live)
3. **Beide Datenbanken kriegen alles** → So ist Entwicklung und Live-Seite immer synchron

## Die einzelnen Tabellen/Sammlungen

In jeder Datenbank findest du:

| Tabelle | Wofür | Beispiel |
|---------|-------|---------|
| **games** | Die 1.612 Spiele | Carcassonne, Kniffel, etc. |
| **publishers** | Die Verlage | KOSMOS, Ravensburger, etc. |
| **users** | Registrierte Benutzer | svenja@festerling.org, andere E-Mails |
| **roles** | Admin / Manager / Member | Wer darf was? |
| **user_game_collection** | Deine Sammlung | „Spiel X ist in meiner Sammlung, Favorit: ja/nein" |
| **rule_sources** | Links zu Regelquellen | Welches Spiel hat welchen PDF-Link? |
| **game_editions** | Verschiedene Auflagen | z.B. deutsche vs. englische Edition |
| **source_verification_history** | Änderungshistorie | Wann wurde was überprüft? |

## Wo deine App liest

Deine App liest **immer von derselben Datenbank**, die du gerade erreichst:
- Wenn du über `/.sfs-bd/` arbeitest → Liest aus der **Entwicklungs-DB**
- Wenn deine Besucher die Seite öffnen → Lesen aus der **Live-DB** (`/.sfs-be/`)

Das ist automatisch — die App fragt deinen Browser: „Auf welcher Domain läufst du?" und nutzt dann die richtige Datenbank.

## Sicherheit

- **Deine Spiele sind sicher** — Sie liegen physisch bei STRATO, nicht irgendwo im Internet
- **Unterschiedliche Zugriffe** — Ein normaler Besucher kann nicht all deine Spiele löschen
- **Backup-System** — Wenn die Datenbank mal ausfällt, haben deine Spiele auch noch eine Kopie lokal im Browser (die localStorage)
