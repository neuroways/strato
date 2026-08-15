# Sicherheitsgrenze Admin Dashboard v0.1.0

- ausschließlich SELECT-Abfragen
- keine Anzeige von Datenbankpasswort oder Datenbankbenutzer
- keine Anzeige vollständiger PDO-Fehler im Browser
- technische Fehler werden nur per `error_log` protokolliert
- API ist außerhalb des Entwicklungsmodus gesperrt
- Tabelleninhalte werden nicht angezeigt
- lediglich Tabellenname, Anzahl und Größe werden ausgegeben

## Noch nicht enthalten

- Admin-Login
- Rollenprüfung
- Session-Ablauf
- CSRF-Schutz für spätere Schreibaktionen
- Audit Log

Vor dem Produktivbetrieb muss mindestens eine Admin-Authentifizierung ergänzt werden.
