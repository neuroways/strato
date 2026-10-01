# Deploy v0.7.5

Voraussetzungen:
- `NB_Kartenraum_Backend_v0.6.0` ist hochgeladen.
- Healthcheck meldet `"backend_version": "0.6.0"`.
- Healthcheck meldet `"experience_table": true`.

Upload:
`/modules/kartenraum/NB_Kartenraum_STRATO_Frontend_v0.7.5/`

Test:
1. Mit Testprofil anmelden.
2. Karte ziehen.
3. Wahrnehmung speichern.
4. Journal öffnen.
5. Ziehung öffnen.
6. Neue Erkenntnis speichern.
7. Tagebuch schließen und erneut öffnen.
8. Der Eintrag muss weiterhin sichtbar sein.
9. Optional auf einem zweiten Gerät anmelden und dieselbe Ziehung öffnen.
