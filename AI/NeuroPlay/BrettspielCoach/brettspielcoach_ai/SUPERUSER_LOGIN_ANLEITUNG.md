# Superuser-Anmeldung bei STRATO – Anleitung

Du bist in der **STRATO-Verwaltungsoberfläche** (/.sfs-be/ oder /.sfs-bd/ Admin-Interface) und sollst dich mit deinem Superuser-Konto anmelden.

---

## 1. Wo befindest du dich?

**Erkennungszeichen der STRATO-Admin-Oberfläche:**
- URL sieht so aus: `https://[domain]/.sfs-be/admin` oder `/.sfs-bd/admin`
- Seite zeigt **PocketBase Admin-Interface** (nicht die NeuroPlay App)
- Du siehst eine "Login"-Form mit E-Mail und Passwort

---

## 2. Anmeldedaten eingeben

Gib **deine STRATO Superuser-Anmeldedaten** ein:

| Feld | Eingabe |
|------|---------|
| **E-Mail** | `svenja@festerling.org` (dein Superuser-Account) |
| **Passwort** | Dein STRATO Superuser-Passwort (nicht das NeuroPlay-Passwort!) |

---

## 3. Das macht diese Anmeldung

Nach erfolgreicher Anmeldung:
- ✅ Du kannst **Collections** verwalten (Spielekatalog, Haushalt, Sessions, etc.)
- ✅ Du kannst **Benutzer** sehen und `verified`-Flags setzen (Admin-Rechte vergeben)
- ✅ Du kannst **Zugangsregeln** bearbeiten (Access Control Rules)
- ✅ Du siehst **alle Daten** in der Datenbank (Spiele, Sammlungen, Sessions)

---

## 4. Was ist NICHT diese Anmeldung?

Diese Anmeldung beim STRATO PocketBase Admin ist **NICHT**:
- ❌ Die NeuroPlay-App-Anmeldung (dafür gibt es den Login im App-Screen)
- ❌ Notwendig zum Spielekatalog zu nutzen
- ❌ Notwendig um deine Spiele-Sammlung zu verwalten

---

## 5. Nach erfolgreicher Anmeldung

Du siehst im PocketBase Admin-Interface:
- **Collections** (linke Seite): games, publishers, user_game_collection, game_sessions, households, etc.
- **Einstellungen**: Datenbanktools, API-Keys, Authentifizierung
- **Benutzer**: Liste aller registrierten NeuroPlay-Nutzer mit `verified`-Status

---

## 6. Häufige Probleme

### Problem: "Falsches Passwort"
- Das Superuser-Passwort unterscheidet sich vom NeuroPlay-App-Passwort
- Kontaktiere deinen STRATO-Administrator oder nutze den "Passwort vergessen"-Link

### Problem: "Superuser-Account existiert nicht"
- Der Superuser-Account wurde möglicherweise nicht initialisiert
- Das ist ein STRATO-System-Setup-Problem (außerhalb von NeuroPlay)

### Problem: "Ich sehe Collections aber kann nichts ändern"
- Die Access Control Rules (Zugangsregeln) könnten zu restriktiv sein
- Oder du siehst nur Read-only Modus

---

## 7. Was zu tun ist (übliche Aufgaben)

Nach dem Login kannst du z. B.:

**User-Verwaltung:**
1. → Collections → `users`
2. → Nutzer anklicken (z.B. ein Spieler)
3. → Feld `verified` auf `true` setzen → Admin-Rechte vergeben

**Spielekatalog prüfen:**
1. → Collections → `games`
2. → Alle 924 Spiele durchsuchen/filtern
3. → Bei Bedarf Einträge bearbeiten

**Haushalt-Daten sehen:**
1. → Collections → `households`
2. → Alle Haushalte, Mitglieder, Einladungscodes

**Spielhistorie einsehen:**
1. → Collections → `game_sessions`
2. → Alle Spielpartien mit Gewinnern, Spielern, Scores

---

## 8. Wenn es nicht funktioniert

Falls die Anmeldung beim STRATO PocketBase Admin nicht klappt:

1. **Überprüf die URL:** Bist du wirklich bei `/.sfs-be/` oder `/.sfs-bd/`?
2. **Überprüf E-Mail & Passwort:** Achte auf Leerzeichen, Großbuchstaben
3. **Browser Cache leeren:** Seite neu laden (Ctrl+F5 oder Cmd+Shift+R)
4. **Kontaktiere STRATO-Support:** Wenn der Superuser-Account nicht existiert oder gesperrt ist

---

## 9. Zurück zur NeuroPlay App

Um zur **NeuroPlay-Spieleapp** zurückzukehren:
- Klick auf die Startseite-URL (z. B. `https://sfs-05zwnczjvysr.live-website.com/`)
- Melde dich dort mit **deinem NeuroPlay-Konto** an (E-Mail + Passwort)
- Admin-Features sichtbar → Zugriff auf Admin-Panel (Datenbank-Browser, Excel-Import, Benutzer-Verwaltung)

---

**Status:** ✅ Du brauchst dich nur **beim STRATO PocketBase Admin** anzumelden — nicht in der App.  
**Nächster Schritt:** Nach dem Login siehst du alle Datenbank-Collections und kannst sie verwalten.
