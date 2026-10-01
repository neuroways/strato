# ADR-NBK-001 – ChatGPT-Site als Referenz, nicht technische Basis

- Status: Accepted for DEV-Pilot
- Datum: 2026-08-20
- Betroffener Scope: nb_kartenraum

## Problem
Die bestehende `chatgpt.site` soll migriert werden, ohne Plattformcode oder nicht kontrollierte Runtime-Abhängigkeiten zu übernehmen.

## Entscheidung
Die öffentliche Site dient als fachliche und visuelle Referenz. Der technische Aufbau wird neu gemäß NW-ARCH-008 geschnitten.

## Auswirkungen
- kein 1:1-Quellcodeimport
- keine Abhängigkeit von ChatGPT-Sites Runtime
- Funktionen werden in Präsentation, Application, Domain und Infrastructure getrennt
- Assets werden nur übernommen, wenn Quelle/Lizenz/Datei verfügbar und freigegeben sind

## Reuse-&-Placement-Prüfung
- Core geeignet? Generische Navigation, Buttons, Tokens: ja.
- Mehrmodul-Wiederverwendung? Für diese Teile: ja.
- Wirklich modulspezifisch? Kartenlogik, Kartenmoment, Decks: ja.
- Später extrahierbar? Ja, durch klare Verträge.
