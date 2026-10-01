# GitHub Setup – Hinter der unsichtbaren Maske

## Status

Das lokale Git-Repository ist konfiguriert, aber noch **nicht mit GitHub verbunden**.

Grund: Das GitHub-Repository `hinter_der_unsichtbaren_maske_ai` existiert nicht oder ist nicht öffentlich erreichbar.

## Manuelle Konfiguration erforderlich

Um das Projekt in GitHub zu sichern, folge diesen Schritten:

### 1. GitHub-Repository erstellen

- Gehe zu https://github.com
- Klicke „New Repository"
- **Repository-Name:** `hinter_der_unsichtbaren_maske_ai`
- **Visibility:** Private (für unveröffentlichte Songtexte)
- **Initialisierung:** Leer (don't initialize with README – wir haben eins)
- Klicke „Create Repository"

### 2. Remote URL hinzufügen

```bash
cd app
git remote add origin https://github.com/YOUR-USERNAME/hinter_der_unsichtbaren_maske_ai.git
```

Oder mit SSH (wenn SSH-Keys konfiguriert):

```bash
git remote add origin git@github.com:YOUR-USERNAME/hinter_der_unsichtbaren_maske_ai.git
```

### 3. Push zum Repository

```bash
git branch -M main     # Benenne dev zu main um (optional)
git push -u origin dev  # Oder 'main' nach Schritt 2
```

### 4. Verifikation

Gehe zu https://github.com/YOUR-USERNAME/hinter_der_unsichtbaren_maske_ai

Du solltest sehen:
- ✓ Alle Source-Code-Dateien
- ✓ dist/ (Build-Output)
- ✓ docs/handover/PROJECT_HANDOVER.md
- ✓ README.md
- ✓ Git-Log mit allen Commits

## Sicherheitshinweise

⚠️ **Das Repository enthält unveröffentlichte Songtexte!**

- Stelle sicher, dass das Repository auf **PRIVATE** gesetzt ist
- Teile den Link nur mit berechtigten Personen
- Vor zukünftigen Veröffentlichungen: `noindex` Meta-Tags hinzufügen

## Authentifizierung

Falls GitHub ein Token/Passwort verlangt:

- **HTTPS:** Personal Access Token erforderlich (siehe GitHub Settings → Developer Settings → Personal Access Tokens)
- **SSH:** SSH-Schlüssel muss konfiguriert sein (siehe GitHub Settings → SSH and GPG Keys)

## Alternativer Weg (schnell für Backup)

Falls die GitHub-Integration fehlschlägt, ist das lokale Git-Repository bereits eine sichere Versionskontrolle.

Der Projektstand kann auch manuell archiviert werden:

```bash
cd ..
tar -czf hinter_der_unsichtbaren_maske_backup.tar.gz app/
# Speichere die Datei sicher
```

---

**Status:** 🟡 BACKUP_INCOMPLETE – Repository lokal gesichert, GitHub-Synchronisation erforderlich

Folge den obigen Schritten, um die Sicherung zu vervollständigen.
