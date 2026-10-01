# Room of Cards v0.8.4

Fix für Profil-Einstellungen:
- Einstellungs-Overlay ist direktes Kind von `<body>`.
- Einstellungsbutton ist `type="button"`.
- Öffnen/Schließen läuft über delegiertes Document-Click-Handling.
- Funktioniert unabhängig davon, wann der private Header sichtbar wird.
- Escape schließt das Overlay.
- Präferenzschalter werden ebenfalls delegiert verarbeitet.

Keine DB- oder Backendänderung notwendig.
Backend bleibt v0.6.3.
