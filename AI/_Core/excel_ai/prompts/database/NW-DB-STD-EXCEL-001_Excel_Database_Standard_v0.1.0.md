# NW-DB-STD-EXCEL-001
# Universeller Excel-zu-Datenbank-Standard und Admin-Datenbankmanager

## 1. Rolle

Du bist Softwarearchitekt, Datenbankarchitekt, Importentwickler,
PocketBase-Entwickler, UI-Entwickler, Qualitätsprüfer und Git-Verantwortlicher
für NeuroWays.

Du entwickelst die bereits erfolgreich erprobte Übernahme strukturierter Daten
jetzt zu einem verbindlichen und wiederverwendbaren Projektstandard weiter.

## 2. Ausgangslage

Ein vollständiger Datenbankprozess wurde bereits erfolgreich durchgeführt.

Dabei wurden:

- ein Entwicklungsauftrag dauerhaft gespeichert;
- ein Collection-Schema als JSON erzeugt;
- Datensätze als JSON versioniert;
- eine Collection in STRATO DEV implementiert;
- einzelne Records importiert;
- Datenbank und Git miteinander verglichen;
- die Änderungen kontrolliert versioniert.

Dieses Vorgehen soll nicht auf die persönliche Spielesammlung beschränkt bleiben.

Künftig soll eine vorhandene Excel-Datei als Ausgangspunkt verwendet werden können.
Aus dieser Datei soll kontrolliert und reproduzierbar eine Datenbankimplementierung
entstehen.

Zusätzlich sollen fachliche Collections in einer einheitlichen Oberfläche unter:

Admin → Datenbank

angezeigt und verwaltet werden können.

## 3. Verbindliches Gesamtziel

Implementiere einen universellen NeuroWays-Standard mit zwei getrennten Bereichen:

### Bereich A – Excel-zu-Datenbank-Pipeline

Eine Excel-Datei kann:

1. eingelesen;
2. strukturell analysiert;
3. fachlich zugeordnet;
4. validiert;
5. in versionierte JSON-Artefakte überführt;
6. in STRATO DEV importiert;
7. erneut eingelesen und abgeglichen;
8. revisionssicher protokolliert werden.

### Bereich B – Admin-Datenbankmanager

Unter:

Admin → Datenbank

entsteht eine generische Datenbankansicht, über die freigegebene fachliche
Collections:

- ausgewählt;
- durchsucht;
- gefiltert;
- sortiert;
- angezeigt;
- ergänzt;
- geändert;
- und kontrolliert gelöscht werden können.

Die Oberfläche darf keine Collection-Strukturen selbstständig erfinden oder
unkontrolliert verändern.

## 4. Zuerst Bestandsaufnahme

Nimm vor jeder Änderung eine vollständige Bestandsaufnahme vor.

Prüfe:

- Repository und aktuellen Branch;
- vorhandene Git-Änderungen;
- verwendetes Frontend;
- verwendete PocketBase-Version;
- tatsächlich nachgewiesenen STRATO-DEV-Pfad;
- vorhandene Collections;
- vorhandene Datenbank-Schemaartefakte;
- vorhandene Importdateien;
- vorhandene Admin-Routen;
- vorhandene Navigationsstruktur;
- vorhandene Rollen und Berechtigungen;
- bereits implementierte Importfunktionen;
- den zuletzt erfolgreichen Excel-/Datenbankprozess;
- bestehende Namenskonventionen;
- vorhandene UI- und Designstandards.

Verwende den tatsächlichen Projektstand als technische Wahrheit.

Keine vorhandene Architektur ohne Prüfung ersetzen.

Keine zweite konkurrierende Adminstruktur anlegen.

## 5. Standard dauerhaft dokumentieren

Speichere diesen vollständigen Entwicklungsauftrag unter:

app/prompts/database/NW-DB-STD-EXCEL-001_Excel_Database_Standard_v0.1.0.md

Erzeuge außerdem eine technische Standardbeschreibung:

app/docs/database/NW-DB-STD-EXCEL-001_Excel_Database_Standard_v0.1.0.md

Die Standardbeschreibung muss enthalten:

- Ziel;
- Geltungsbereich;
- Prozessschritte;
- Ordnerstruktur;
- Artefakttypen;
- Namenskonventionen;
- Validierungsregeln;
- Konfliktregeln;
- Deploymentregeln;
- Adminoberfläche;
- Rollen und Rechte;
- Importhistorie;
- Wiederholbarkeit;
- Fehlerbehandlung;
- Git-Verhalten.

## 6. Verbindliche Artefaktstruktur

Jeder Excel-Import erzeugt grundsätzlich folgende Artefakte:

### 6.1 Gespeicherter Importauftrag

app/prompts/database/imports/<IMPORT-ID>_<NAME>_v<VERSION>.md

### 6.2 Excel-zu-Datenbank-Mapping

app/database/mappings/<IMPORT-ID>_<NAME>_mapping_v<VERSION>.json

### 6.3 Collection-Schema

app/database/schemas/<collection_name>.collection.json

### 6.4 Versionierte Datensätze

app/database/data/<fachbereich>/<name>_v<VERSION>.records.json

### 6.5 Importmanifest

app/database/imports/<IMPORT-ID>_<NAME>_manifest_v<VERSION>.json

### 6.6 Importbericht

app/database/imports/<IMPORT-ID>_<NAME>_report_v<VERSION>.json

Vorhandene passende Verzeichnisse wiederverwenden.

Keine parallele Ordnerstruktur erzeugen.

## 7. Importmanifest

Jeder Import erhält ein maschinenlesbares Manifest.

Beispielstruktur:

```json
{
  "import_id": "NW-IMPORT-001",
  "name": "personal_game_collection",
  "version": "0.1.0",
  "source_type": "xlsx",
  "source_file": "<relativer Dateipfad>",
  "target_environment": "DEV",
  "target_collections": [],
  "mapping_file": "<relativer Pfad>",
  "schema_files": [],
  "records_files": [],
  "unique_keys": [],
  "import_mode": "insert_identical_skip_conflict_stop",
  "created_at": "<ISO-Datum>",
  "status": "prepared"
}
```

Keine Zugangsdaten, Tokens oder Cookies speichern.

## 8. Excel-Analyse

Die Pipeline muss mindestens `.xlsx` unterstützen.

Wenn im Projekt bereits Unterstützung für `.xls` vorhanden ist, darf sie
weiterverwendet werden. Anderenfalls `.xls` nicht stillschweigend als unterstützt
ausgeben.

Analysiere je Arbeitsblatt:

- Blattname;
- Tabellenbereich;
- Überschriften;
- Anzahl Datenzeilen;
- leere Zeilen;
- leere Spalten;
- Datentypen;
- Formeln;
- sichtbare Ergebniswerte;
- Datumswerte;
- Wahrheitswerte;
- IDs;
- mögliche Eindeutigkeitsfelder;
- doppelte Datensätze;
- Pflichtfeldkandidaten;
- Relationenkandidaten;
- Auswahllisten;
- inkonsistente Schreibweisen;
- zusammengeführte Zellen;
- mehrere Tabellen auf einem Blatt;
- Hinweise und Legenden;
- fachliche Unsicherheiten.

Formeln dürfen nicht ungeprüft als Datenbanklogik übernommen werden.

Dokumentiere jeweils:

- Formel;
- berechneten Wert;
- mögliche fachliche Bedeutung;
- Entscheidung über die Übernahme.

## 9. Keine blinde Schemaerzeugung

Eine Excel-Tabelle ist eine Eingabequelle, aber nicht automatisch ein korrektes
Datenmodell.

Prüfe vor der Schemaerzeugung:

- ob ein Blatt einer Collection entspricht;
- ob mehrere Blätter zusammengehören;
- ob wiederkehrende Werte eigene Stammdatentabellen benötigen;
- ob Relationen erforderlich sind;
- ob Spalten mehrere Informationen vermischen;
- ob IDs stabil sind;
- ob fachliche Eindeutigkeit vorhanden ist;
- ob bestehende Collections wiederverwendet werden müssen;
- ob eine neue Collection wirklich erforderlich ist.

Erzeuge keinen konkurrierenden Core.

Erzeuge keine doppelte Collection für bereits vorhandene fachliche Daten.

## 10. Umgang mit Unsicherheit

Teile Entscheidungen ein in:

- `EINDEUTIG`
- `TECHNISCH ABLEITBAR`
- `FACHLICH ZU BESTÄTIGEN`
- `BLOCKIEREND`

Automatisch umgesetzt werden dürfen nur:

- `EINDEUTIG`
- `TECHNISCH ABLEITBAR`

Bei `FACHLICH ZU BESTÄTIGEN` muss vor dem Datenbank-Deployment ein
Mappingvorschlag angezeigt werden.

Bei `BLOCKIEREND` darf kein Deployment erfolgen.

Status:

`IMPORT BLOCKED – MAPPING DECISION REQUIRED`

## 11. Mappingdatei

Die Mappingdatei muss mindestens enthalten:

```json
{
  "source": {
    "file": "",
    "sheet": "",
    "header_row": 1,
    "data_start_row": 2
  },
  "target": {
    "collection": "",
    "collection_type": "base",
    "schema_version": ""
  },
  "fields": [
    {
      "source_column": "",
      "target_field": "",
      "source_type": "",
      "target_type": "",
      "required": false,
      "unique": false,
      "transformation": null,
      "default": null,
      "null_handling": "preserve_null"
    }
  ],
  "unique_key": [],
  "relations": [],
  "validation_rules": [],
  "ignored_columns": [],
  "decisions": []
}
```

Jede ignorierte Spalte benötigt eine dokumentierte Begründung.

## 12. Importmodi

Unterstütze mindestens:

- `ANALYSE_ONLY`
- `DRY_RUN`
- `IMPORT_NEW`
- `REIMPORT_SAFE`

### ANALYSE_ONLY

Nur Excel analysieren. Keine Dateien außer Analyseartefakten und keine
Datenbankänderungen.

### DRY_RUN

Schema, Mapping, Datensätze und erwartete Änderungen erzeugen, aber nicht in
PocketBase schreiben.

### IMPORT_NEW

Nur eindeutig neue Datensätze importieren.

### REIMPORT_SAFE

Vorhandene Records anhand stabiler Schlüssel vergleichen:

- neu → anlegen;
- vollständig identisch → überspringen;
- abweichend → Konflikt melden;
- doppelt → Import stoppen.

Bestehende Records nicht automatisch überschreiben.

## 13. Datenvalidierung

Prüfe vor jedem Deployment:

- gültige JSON-Syntax;
- UTF-8;
- eindeutige fachliche Schlüssel;
- Pflichtfelder;
- Datentypen;
- Relationsziele;
- erlaubte Auswahlwerte;
- Datumsformate;
- leere Titel beziehungsweise Bezeichnungen;
- Duplikate;
- Anzahl der Excel-Datenzeilen;
- Anzahl erzeugter JSON-Records;
- verworfene Zeilen;
- transformierte Werte;
- unbekannte oder mehrdeutige Werte.

Jede Excel-Datenzeile muss im Importbericht einem Ergebnis zugeordnet werden:

- `IMPORTIERT`
- `IDENTISCH_VORHANDEN`
- `KONFLIKT`
- `UNGÜLTIG`
- `BEWUSST_IGNORIERT`

Keine Zeile darf unbemerkt verschwinden.

## 14. DEV-Sicherheit

Vor jedem Datenbankzugriff muss die tatsächliche DEV-Umgebung technisch
nachgewiesen werden.

Prüfe die vorhandene STRATO-Konfiguration und dokumentiere:

- DEV-Pfad;
- Collection-Endpunkt;
- PocketBase-Version;
- verwendete Authentifizierung;
- Abgrenzung zu LIVE.

Verwende ausschließlich die eindeutig nachgewiesene DEV-Datenbank.

Wenn die Umgebung nicht eindeutig ist:

`DEPLOYMENT BLOCKED – DEV ENVIRONMENT NOT VERIFIED`

Eine nachgewiesene LIVE-Umgebung darf nicht kontaktiert werden.

## 15. Schema-Deployment

Für jede Zielcollection:

1. Existenz prüfen.
2. Ist-Schema auslesen.
3. Mit dem Git-Schema vergleichen.
4. Status bestimmen:
   - `NEU`
   - `IDENTISCH`
   - `ABWEICHEND`
   - `KONFLIKT`
5. Neue Collection nur einmal anlegen.
6. Identische Collection wiederverwenden.
7. Abweichende Collection nicht automatisch verändern.
8. Collection nach der Anlage erneut auslesen.
9. Tatsächliches Schema mit dem Git-Artefakt vergleichen.

Bei Abweichungen:

`DEPLOYMENT BLOCKED – SCHEMA DECISION REQUIRED`

## 16. Kontrollierter Recordimport

Vor dem Schreiben:

1. Alle vorhandenen Records vollständig und paginiert lesen.
2. Für jeden JSON-Record den stabilen fachlichen Schlüssel bestimmen.
3. Records klassifizieren:
   - `NEU`
   - `IDENTISCH`
   - `ABWEICHEND`
   - `DOPPELT`
4. Importplan anzeigen.
5. Erst danach neue Records schreiben.

Regeln:

- pro neuem Record höchstens ein POST;
- keine automatische POST-Wiederholung;
- nach jedem POST Record wieder auslesen;
- bei unklarem Netzwerkstatus zuerst anhand des fachlichen Schlüssels nachlesen;
- bestehende Records nicht automatisch überschreiben;
- keine fremden Records löschen;
- beim ersten ungeklärten Fehler anhalten.

## 17. Importhistorie

Prüfe, ob bereits eine geeignete Importhistorie existiert.

Wenn nicht, implementiere eine fachlich passende Collection nach bestehender
NeuroWays-Namenskonvention.

Sie muss mindestens erfassen:

- import_id;
- Importversion;
- Quelldateiname;
- Prüfsumme der Quelldatei;
- Mappingversion;
- Schema-Version;
- Zielcollections;
- Importmodus;
- Startzeit;
- Abschlusszeit;
- Status;
- Anzahl gelesener Zeilen;
- Anzahl neuer Records;
- Anzahl identischer Records;
- Anzahl Konflikte;
- Anzahl ungültiger Zeilen;
- Git-Commit;
- ausführende Rolle;
- Fehlerzusammenfassung.

Keine Tokens oder personenbezogenen Authentifizierungsdaten protokollieren.

## 18. Admin-Navigation

Integriere die Oberfläche in die vorhandene Navigation.

Verbindlicher Pfad:

Admin → Datenbank

Verwende eine zur bestehenden Anwendung passende Route.

Bevorzugte logische Route:

`/admin/database`

Wenn bereits eine konsistente deutsche Routenstruktur existiert, darf entsprechend:

`/admin/datenbank`

verwendet werden.

Keine zweite Adminnavigation anlegen.

Der sichtbare Menütext lautet:

`Datenbank`

## 19. Generischer Datenbankmanager

Implementiere einen generischen Datenbankmanager.

Er darf nicht für jede Collection eine eigene fest codierte CRUD-Seite benötigen.

Die Oberfläche wird aus einer kontrollierten Collection-Registrierung und den
zulässigen Feldmetadaten generiert.

Mindestens erforderlich:

### Übersicht

- registrierte fachliche Collections;
- Anzeigename;
- Beschreibung;
- Anzahl Records;
- letzter Import;
- Schema-Version;
- Datenversion;
- Status.

### Tabellenansicht

- Volltextsuche in freigegebenen Feldern;
- Filter;
- Sortierung;
- Pagination;
- Spaltenauswahl;
- verständliche Feldnamen;
- Ladezustand;
- Leerezustand;
- Fehlerzustand.

### Datensatzansicht

- vollständige Detailansicht;
- technische ID getrennt von fachlicher ID;
- Erstellungs- und Änderungszeit;
- Relationswerte verständlich anzeigen;
- lange Texte lesbar darstellen.

### Bearbeiten

- geeignete Eingabefelder entsprechend dem Feldtyp;
- Pflichtfeldprüfung;
- Selectwerte;
- Boolean;
- Datum;
- Zahl;
- Relation;
- längere Texte;
- Speichern;
- Abbrechen;
- verständliche Fehlermeldungen.

### Neuanlage

- nur für ausdrücklich erlaubte Collections;
- dieselben Validierungen wie bei Bearbeitung;
- keine Umgehung eindeutiger Schlüssel.

### Löschen

- nur bei ausdrücklicher Berechtigung;
- Bestätigungsdialog;
- Anzeige des konkreten Datensatzes;
- Relationsprüfung;
- kein unkontrolliertes Cascade-Löschen;
- Löschvorgang protokollieren.

## 20. Collection-Registrierung

Nicht jede PocketBase-Collection darf automatisch in der Adminoberfläche
bearbeitbar sein.

Implementiere oder verwende eine kontrollierte Registrierung mit mindestens:

- collection_name;
- display_name;
- description;
- enabled;
- visible_in_admin;
- allow_create;
- allow_update;
- allow_delete;
- searchable_fields;
- default_columns;
- default_sort;
- page_size;
- schema_version;
- data_version;
- category;
- display_order.

Systemcollections, Auth-Collections und technische Protokollcollections sind
standardmäßig nicht bearbeitbar.

Neue fachliche Collections werden erst sichtbar, wenn sie ausdrücklich registriert
wurden.

## 21. Excel-Import in der Oberfläche

Ergänze unter:

Admin → Datenbank → Excel-Import

eine kontrollierte Importoberfläche.

Sie muss mindestens ermöglichen:

1. Excel-Datei auswählen.
2. Arbeitsblätter erkennen.
3. Strukturanalyse anzeigen.
4. vorgeschlagenes Mapping anzeigen.
5. Zielcollection anzeigen.
6. Validierungsfehler anzeigen.
7. Dry Run ausführen.
8. Importplan anzeigen.
9. Import ausdrücklich bestätigen.
10. Importergebnis anzeigen.
11. Importbericht öffnen.

Wichtig:

Die Browseroberfläche darf keine administrativen PocketBase-Zugangsdaten enthalten.

Wenn Collection-Anlage oder Schemaänderungen nicht sicher über die Anwendung
durchgeführt werden können, bleibt dieser Teil ein kontrollierter
Entwicklungs-/Deploymentprozess.

Die UI darf dann nur bereits vorhandene und registrierte Collections mit Daten
befüllen.

## 22. Rollen und Rechte

Prüfe die vorhandenen Rollen.

Mindestens zu unterscheiden:

- NeuroWays-Admin;
- Unternehmensverantwortliche;
- Manager;
- Mitarbeitende.

Standard:

- NeuroWays-Admin: technische und fachliche Datenbankverwaltung entsprechend
  expliziter Freigabe;
- Unternehmensverantwortliche: nur freigegebene unternehmensbezogene Fachdaten;
- Manager: keine allgemeine Datenbankadministration;
- Mitarbeitende: keine Datenbankadministration.

Berechtigungen müssen serverseitig beziehungsweise über sichere PocketBase-Regeln
durchgesetzt werden.

Das bloße Ausblenden eines Menüpunktes ist keine Zugriffskontrolle.

## 23. Änderungsprotokoll

Änderungen aus der Adminoberfläche müssen nachvollziehbar sein.

Pro Änderung mindestens:

- Collection;
- Record-ID;
- fachlicher Schlüssel;
- Aktion;
- Zeitpunkt;
- ausführende Benutzer-ID;
- vorheriger Wert;
- neuer Wert;
- Änderungsgrund, sofern vorgesehen.

Sensible Werte dürfen nicht unkontrolliert im Klartext protokolliert werden.

## 24. Design und Bedienbarkeit

Nutze das bestehende NeuroWays-Designsystem.

Die Oberfläche soll:

- ruhig;
- übersichtlich;
- reizarm;
- tastaturbedienbar;
- responsiv;
- verständlich beschriftet;
- und fehlertolerant sein.

Verwende keine technisch kryptischen PocketBase-Feldnamen als einzige
Benutzerbeschriftung.

Gefährliche Aktionen müssen visuell klar von normalen Aktionen getrennt sein.

## 25. Technische Grenzen

- Keine Collection aus dem Frontend heraus unkontrolliert erzeugen.
- Keine Admin-Tokens im Browser speichern.
- Keine LIVE-Datenbank kontaktieren.
- Keine bestehenden Daten automatisch überschreiben.
- Keine Tabellenlogik ausschließlich in UI-Komponenten verstecken.
- Keine hart codierten Beispieldatensätze.
- Keine zweite Datenbankabstraktion neben der vorhandenen Architektur.
- Keine unbeteiligten Dateien verändern.
- Keine bestehende Migration nachträglich umschreiben.
- Keine Git-Zugangsdaten speichern.

## 26. Tests

Teste mindestens:

### Import

- gültige Excel-Datei;
- leere Excel-Datei;
- fehlende Überschriften;
- doppelte fachliche IDs;
- ungültige Datentypen;
- mehrere Arbeitsblätter;
- identischer Wiederholungsimport;
- abweichender Wiederholungsimport;
- unterbrochener Import;
- Dry Run;
- Import mit Konflikt.

### Datenbankansicht

- Collection-Auswahl;
- Suche;
- Filter;
- Sortierung;
- Pagination;
- Detailanzeige;
- Neuanlage;
- Bearbeitung;
- Pflichtfeldfehler;
- Eindeutigkeitskonflikt;
- Relation;
- nicht erlaubtes Löschen;
- Berechtigungsverstoß;
- direkte URL ohne Berechtigung.

## 27. Git und Versionierung

Führe aus:

- `git status --short`
- Prüfung aller Diffs;
- `git diff --check`;
- JSON-Syntaxprüfung;
- Tests;
- Produktions-Build.

Committe ausschließlich auftragsbezogene Dateien.

Verwende eine zum tatsächlichen Inhalt passende Commit-Nachricht, beispielsweise:

`NW-DB: add reusable Excel import and admin database manager`

Push nur auf den bereits eindeutig konfigurierten Entwicklungsbranch.

Keinen Branch und kein Remote erfinden.

## 28. Abschlussbericht

Berichte:

- gespeicherte Promptdatei;
- gespeicherte Standardbeschreibung;
- implementierte Pipeline;
- erzeugte oder wiederverwendete Collections;
- neue Schemaartefakte;
- neue Mappingartefakte;
- implementierte Adminroute;
- registrierte fachliche Collections;
- verfügbare CRUD-Funktionen;
- Rollen und Rechte;
- Importhistorie;
- Tests;
- Build-Ergebnis;
- geänderte Dateien;
- Commit-ID;
- Branch;
- Push-Status;
- nachgewiesener DEV-Pfad;
- Bestätigung, dass LIVE nicht kontaktiert wurde;
- bekannte Grenzen;
- genau einen empfohlenen nächsten Entwicklungsschritt.

## 29. Abschlussstatus

Verwende genau einen Status:

- `EXCEL DATABASE STANDARD COMPLETE`
- `EXCEL DATABASE STANDARD ALREADY CURRENT`
- `IMPLEMENTATION BLOCKED – DEV ENVIRONMENT NOT VERIFIED`
- `IMPLEMENTATION BLOCKED – ARCHITECTURE DECISION REQUIRED`
- `IMPLEMENTATION BLOCKED – ACCESS MODEL REQUIRED`
- `IMPLEMENTATION PARTIAL`

Danach anhalten.
