# STRATO AI Builder – Verbesserungsvorschlag

## Problem

Projekte mit öffentlichen Websites zeigen nach dem Build standardmäßig 403-Fehler, ohne dass der Entwickler weiß, warum oder was zu tun ist.

Die Ursache ist das Sicherheitskonzept (Collections starten privat), aber der Workflow ist unklar.

---

## Vorschlag: Automatisierter Setup-Hinweis

### Wann sollte der Hinweis angezeigt werden?

Wenn **beide** zutreffen:
1. Das Projekt enthält öffentliche Pages (z.B. `src/pages/public/`)
2. Es wurden Collections angelegt, die öffentlich gelesen werden sollen

### Was sollte der Hinweis enthalten?

```
🔒 Sicherheitsschritt erforderlich

Dieses Projekt hat eine öffentliche Website mit Datenbankanbindung.

Die Collections wurden aus Sicherheitsgründen standardmäßig privat angelegt.

Bevor die öffentliche Website Daten anzeigen kann, müssen die API Rules angepasst werden:

PUBLIC (Lesezugriff für alle):
  • tournaments
  • players
  • rounds
  • matches
  • announcements
  • courts
  • results
  • info_sections

ADMIN (Nur für Administratoren):
  • tournament_settings
  • registrations
  • match_players
  • ai_schedule_runs

Wie: Öffne PocketBase Admin (/.sfs-bd/admin/) und setze die Rules.
Dauer: ca. 10 Minuten.

Dokumentation: siehe app/docs/STRATO_ARCHITECTURE_ANALYSIS.md
```

### Wo sollte der Hinweis angezeigt werden?

1. **Build-Output** (nach erfolgreichem Build)
2. **Dashboard/Overview** (persistent, bis bestätigt)
3. **Automated Email** (an Projekt-Owner)
4. **README im Projekt** (automatisch generiert)

---

## Implementierungsskizze (für STRATO-Team)

### 1. Detection Logic

```javascript
// Nach Collection-Erstellung
function detectPublicWebsiteNeeds() {
  const hasPublicPages = fs.existsSync('src/pages/public/');
  const collections = getCreatedCollections();
  
  const needsPublicRead = [
    'tournaments', 'players', 'rounds', 'matches',
    'announcements', 'courts', 'results', 'info_sections'
  ];
  
  const missingRules = collections
    .filter(c => needsPublicRead.includes(c.name))
    .filter(c => c.listRule === null);
  
  return hasPublicPages && missingRules.length > 0;
}
```

### 2. Setup-Checklist im UI

```json
{
  "setupChecklist": {
    "title": "Öffentliche Website – Sicherheitsschritte",
    "items": [
      {
        "id": "api-rules-public",
        "title": "API Rules für öffentliche Collections setzen",
        "collections": ["tournaments", "players", ...],
        "status": "pending",
        "instruction": "Öffne PocketBase Admin und setze List/View Rules auf leer",
        "link": "/.sfs-bd/admin/"
      },
      {
        "id": "api-rules-admin",
        "title": "API Rules für Admin-Collections schützen",
        "collections": ["tournament_settings", ...],
        "status": "pending",
        "instruction": "Setze Rules auf @request.auth.collectionId = 'admins'"
      },
      {
        "id": "test-website",
        "title": "Öffentliche Website testen",
        "status": "pending",
        "instruction": "Nach Rule-Änderung: Website neu laden (kein 403 mehr?)"
      }
    ]
  }
}
```

### 3. Automatische README

```markdown
# Sicherheit: API Rules konfigurieren

Dieses Projekt hat eine öffentliche Website. 

**Bevor du startest:** Collections sind standardmäßig privat.
Setze die API Rules im [PocketBase Admin](/.sfs-bd/admin/):

**Öffentliche Collections (List/View Rule: leer lassen):**
- tournaments
- players
- rounds
- matches
- announcements
- courts
- results
- info_sections

**Admin-Collections (Rule: @request.auth.collectionId = "admins"):**
- tournament_settings
- registrations
- match_players
- ai_schedule_runs

Danach sollte deine Website funktionieren.
```

---

## Vorteile dieser Lösung

✓ **Transparenz** – Entwickler wissen, was zu tun ist, bevor sie 403-Fehler sehen

✓ **Selbsterklärend** – Welche Collections? Welche Rules? Wo anpassen?

✓ **Zeitersparnis** – Keine Fehlersuche nötig

✓ **Best-Practice** – Sicherheit bleibt Default-Deny, wird aber erklärt

✓ **Skalierbar** – Funktioniert für alle öffentlichen Websites

---

## Status

**Dieses Projekt**: Dokumentation in `STRATO_ARCHITECTURE_ANALYSIS.md` + praktische Checkliste

**Für STRATO-Team**: Diese Verbesserung würde allen zukünftigen Projekten helfen

---

## Nächster Schritt

Nach Implementierung dieser Verbesserung in STRATO:

1. Build → "Öffentliche Website erkannt"
2. Automatischer Hinweis → Collections und Rules aufgelistet
3. Link zu Docs → STRATO-eigene Anleitung
4. Checklist im UI → Abhaken nach jedem Schritt
5. Website funktioniert ohne Überraschungen

Das wäre eine **massive Verbesserung der Developer Experience**.
