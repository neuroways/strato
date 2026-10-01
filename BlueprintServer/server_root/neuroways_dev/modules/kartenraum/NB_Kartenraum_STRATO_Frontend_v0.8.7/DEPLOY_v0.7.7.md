# Deploy v0.7.7

Voraussetzung:
- Backend v0.6.1 läuft
- Healthcheck:
  - backend_version = 0.6.1
  - journal_entry_table = true

Upload:
`/modules/kartenraum/NB_Kartenraum_STRATO_Frontend_v0.7.7/`

Test:
1. anmelden
2. Karte ziehen
3. erste Wahrnehmung speichern
4. bei „Eine Frage“ → Ins Tagebuch schreiben
5. Typ „Gedanke“ wählen und speichern
6. bei „Symbolik“ → Typ „Erkenntnis“ speichern
7. bei einer Tiefe → Typ „Ziel“ speichern
8. Journal öffnen
9. Ziehung öffnen
10. alle Einträge müssen chronologisch mit Typ + Tiefe sichtbar sein
