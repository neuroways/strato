# Alternative: Datenbank lokal mit SQLite aufbauen

Die API-Aufrufe zum Erstellen von Sammlungen funktionieren in diesem Setup nicht.

Stattdessen baue ich dir eine lokale SQLite-Datenbank, die deine App direkt nutzen kann.

## Was wir machen

1. Deine `neuroplay_v2_schema_sqlite.sql` wird in eine echte SQLite-Datei importiert
2. Die App lädt Daten direkt daraus (nicht über das Admin-Panel)
3. Du kannst die Daten mit einem SQLite-Tool (z.B. DB Browser) verwalten oder über die App speichern

## Schritt 1: DB Browser installieren

Lade dir einen kostenlosen SQLite-Editor herunter:
- **DB Browser for SQLite** (https://sqlitebrowser.org/) – einfach, kostenlos, für alle Systeme
- Oder: **DBeaver** (https://dbeaver.io/) – mehr Features

## Schritt 2: Deine Datenbank erstellen

Ich erstelle jetzt eine SQLite-Datenbank aus deinem Schema und lege sie im Projekt ab.

## Schritt 3: App mit der DB verbinden

Die App liest dann direkt aus der SQLite-Datei.

---

**Sollen wir das machen?** Dann hast du eine funktionierende Datenbank, die du sofort nutzen kannst – ohne Admin-Panel-Umwege.
