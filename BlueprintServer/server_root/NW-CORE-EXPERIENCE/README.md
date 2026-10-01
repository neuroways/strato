# NeuroWays Core Experience · STRATO Pilot

Version: `0.1.0-pilot`  
Status: `MIGRATION_PILOT / NOT APPROVED FOR PRODUCTION`

Dieses Paket überführt die NeuroWays Core Experience aus dem ChatGPT-Sites-Prototyp in einen ohne Node-Laufzeit ausführbaren PHP-/HTML-/CSS-/JavaScript-Piloten.

## Was der Pilot beweist

- Das Erlebnis kann ohne React-, Next-, Cloudflare- oder D1-Laufzeit dargestellt werden.
- globale Core-Tokens, Wirkmodi und wiederverwendbare UI-Regeln sind von der Experience-Komposition getrennt.
- der Check-in bleibt lokal und speichert keine Antworten.
- das Paket kann separat geprüft werden, ohne bestehende STRATO-Dateien zu überschreiben.

## Sicher testen

Den Ordner nicht über bestehende `neuroways_dev/`- oder `neuroways/`-Pfade kopieren. Für einen isolierten Test nur den Inhalt von `public/` in einen neuen, leeren DEV-Unterordner legen.

Lokal kann die Seite mit PHP gestartet werden:

```bash
php -S 127.0.0.1:8080 -t public
```

## Noch offen

Die endgültige fachliche Platzierung von Check-in, Verortung und „Mein Weg“ ist nicht entschieden. Siehe `docs/PLACEMENT-DECISION-PENDING.md`.

