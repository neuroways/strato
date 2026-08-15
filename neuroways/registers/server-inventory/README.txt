NW-CONFIG-P2.4.1 – SERVER-DATEIINVENTAR
Version 0.1.0 Draft

ZWECK
Dieses Paket erzeugt ein technisches Inventar der Serverbereiche:

- neuroways  = dauerhaftes NeuroWays Repository
- htdocs     = aktuell produktiv verwendete Version

Das Skript liest Dateien und Ordner, berechnet SHA-256-Prüfsummen und erzeugt:
- CSV-Inventar
- JSON-Inventar
- TXT-Kurzbericht

QUELLDATEN WERDEN NICHT VERÄNDERT.

INSTALLATION
1. ZIP lokal entpacken.
2. Den Ordner „server-inventory“ nach:
   neuroways/repository-manifest/tools/
   hochladen.
3. Prüfen, dass die Datei nw_server_inventory.php auf dem Server liegt.

AUSFÜHRUNG ÜBER BROWSER
Rufe die PHP-Datei einmal im Browser auf, sofern der Ordner über eine geschützte URL
erreichbar ist.

WICHTIG:
- Das Skript zeigt absolute Serverpfade an.
- Die URL darf nicht öffentlich weitergegeben werden.
- Nach erfolgreicher Ausführung die PHP-Datei löschen, umbenennen oder per Serverregel sperren.

AUSFÜHRUNG ÜBER SSH / KONSOLE
php nw_server_inventory.php

AUSGABE
Die Ergebnisse werden automatisch gespeichert unter:

neuroways/registers/inventory/

Dateinamen:
NW-REPOSITORY-INVENTORY-001_YYYYMMDD_HHMMSS.csv
NW-REPOSITORY-INVENTORY-001_YYYYMMDD_HHMMSS.json
NW-REPOSITORY-INVENTORY-001_REPORT_YYYYMMDD_HHMMSS.txt

AUTOMATISCHE PFADERKENNUNG
Das Skript sucht vom eigenen Speicherort aus nach einem gemeinsamen übergeordneten
Ordner, der die beiden Verzeichnisse „neuroways“ und „htdocs“ enthält.

Falls diese Verzeichnisse nicht denselben direkten oder indirekten übergeordneten
Serverordner besitzen, meldet das Skript einen Fehler und verändert nichts.

ERFASSTE FELDER
- Inventar-ID
- Serverbereich
- Objekttyp
- absoluter Pfad
- relativer Serverpfad
- relativer Bereichspfad
- Dateiname
- Dateiendung
- Größe in Bytes
- Änderungszeit
- Erstellungs-/Metadatenzeit
- SHA-256
- Hashstatus
- Lesbarkeit
- Schreibbarkeit
- Symlinkstatus
- Scanstatus

SICHERHEIT
Das Skript:
- löscht nichts,
- verschiebt nichts,
- benennt nichts um,
- überschreibt keine Quelldatei,
- schreibt nur neue Inventardateien in neuroways/registers/inventory/.

NÄCHSTER SCHRITT
Nach der Ausführung die erzeugte CSV- oder JSON-Datei herunterladen und in den
zuständigen NeuroWays-Chat hochladen. Daraus wird anschließend die fachliche
Klassifikation und Migrationsmatrix erstellt.
