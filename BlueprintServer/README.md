# NW-ARCH-008 · STRATO Server Blueprint

**Version:** 0.1.0 Draft-Pilot  
**Zweck:** Uploadbares, nicht-destruktives Architekturpaket zur Festlegung der künftigen NeuroWays-Serverstruktur auf STRATO.

## Was dieses ZIP ist

Dieses Paket enthält die vollständige vorgeschlagene **Server-, Environment-, Package-, Instance-, Core- und Module-Grundstruktur** als Ordnerbaum. Jeder Ordner besitzt eine README mit Zweck und Regeln. Es enthält **keine produktiven Zugangsdaten** und überschreibt keine bestehende NeuroWays-Installation, solange der enthaltene Ordner `server_root/` nicht aktiv in den STRATO-Webspace übernommen wird.

## Was dieses ZIP noch nicht ist

- kein fertiger NeuroWays-Installer
- keine produktive Routing-Runtime
- keine Datenbankmigration
- keine Freigabe, bestehende Tennis-Dateien zu verschieben
- keine zweite Plattform-Source-of-Truth neben `NW-ARCH-007`

## Kernmodell

`Module Definition ≠ Module Version ≠ Installed Module`

Zusätzlich sind getrennt:

- Physical Server
- Environment (DEV / PRO; später TEST/STAGE möglich)
- Platform Instance
- Installed Module
- verfügbare Module Version
- Public Route
- Installation Path / Package Path
- Installation Customization

## Wichtigster Grundsatz

**Gemeinsames wird einmal im Core geregelt. Fachspezifisches bleibt im Modul. Installationsspezifisches bleibt in der Installation. Environment- und Secret-Konfiguration bleibt zentral.**

## Einstieg

1. `STRATO_UPLOAD.md` lesen.
2. `TREE.md` ansehen.
3. `server_root/` gegen den realen STRATO-Bestand prüfen.
4. Erst nach Review eine direkte Root-Deployment-Fassung erzeugen.

## Quelleneinordnung

Dieses Work Package vertieft `NW-ARCH-007` und bereitet die dort vorgesehene Repository-/Software-Package-Struktur vor. Es ist bewusst als **Draft-Pilot** gekennzeichnet.
