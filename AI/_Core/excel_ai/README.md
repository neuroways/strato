# NeuroPlay Katalog + Excel-zu-Datenbank-System

Ein multifunktionales Web-Anwendungssystem zur Verwaltung von Spiel-Katalogen, persönlichen Assessments und intelligenten Excel-Importen mit generischem Datenbankmanager.

## 📋 Projektübersicht

- **Spiele-Katalog:** Zentrale Verwaltung und Anzeige von Brettspiel-Informationen
- **Verlags-Verwaltung:** Stammdaten für Spiel-Herausgeber
- **Excel-Import-Pipeline:** Universelles System zum Importieren von Daten aus Excel-Dateien mit Validierung und Konflikt-Detection
- **Admin-Datenbankmanager:** Generische CRUD-Oberfläche für registrierte Collections
- **NeuroBalance Assessment:** Persönliche Selbstbewertungs-Module (in Entwicklung)

## 🚀 Technologie-Stack

| Bereich | Technologie | Version |
|---------|------------|---------|
| Frontend | React | 18+ |
| Build | Vite | 5+ |
| Styling | Tailwind CSS | v4 |
| Datenbank | PocketBase | v0.39.0 |
| Hosting | STRATO-Platform | (Multi-Tenant) |
| Excel-Parsing | XLSX.js | ^0.18.5 |

## 🛠️ Installation und Start

### Voraussetzungen

- Node.js 18+ (für lokale Entwicklung)
- npm oder yarn
- Zugriff auf PocketBase DEV-Instanz (`/.sfs-bd/api`)

### Installation

```bash
cd app
npm install
npm run build:prod  # Build für Produktion
```

### Lokale Entwicklung

```bash
npm run dev
```

Die Anwendung wird im Browser unter `http://localhost:5173` oder ähnlich verfügbar (abhängig vom Vite-Setup).

### Build

```bash
npm run build:prod
```

Output: `dist/` (versioniert in Git)

## 📁 Projektstruktur

```
app/
├── src/
│   ├── components/           # React-Komponenten
│   │   ├── GamesList.jsx
│   │   ├── PublisherList.jsx
│   │   ├── AdminDatabase.jsx
│   │   ├── ExcelImportUI.jsx
│   │   └── AnswerCard.jsx    # NeuroBalance-Komponente
│   │
│   ├── styles/              # CSS-Dateien
│   ├── lib/
│   │   └── pb.js            # PocketBase-Client (Singleton)
│   │
│   ├── App.jsx              # Haupt-Komponente (Tab-Navigation)
│   ├── main.jsx             # Entry Point
│   └── index.css
│
├── database/
│   ├── schemas/             # PocketBase Collection Schemas (JSON)
│   │   ├── nw_collection_registry.collection.json
│   │   ├── npl_personal_inventory_items.collection.json
│   │   └── ...
│   │
│   ├── data/                # Seed-Daten (JSON)
│   └── templates/           # Schema-Templates
│
├── docs/
│   ├── standards/           # Binding Database Standards
│   ├── database/            # Database Documentation
│   ├── collections/         # Collection Inventory
│   └── handover/
│       └── PROJECT_HANDOVER.md    # ⭐ VOLLSTÄNDIGE ÜBERGABE
│
├── prompts/                 # KI-Deployment-Prompts
│
├── dist/                    # Production Build (committed)
├── vite.config.js
├── tailwind.config.cjs
├── package.json
└── index.html
```

## 📊 Datenbank-Struktur

Das Projekt verwendet PocketBase Collections:

- **games:** Brettspiel-Katalog
- **publishers:** Verlagsstammdaten
- **npl_personal_inventory_items:** Persönliche Spiele-Sammlung (103 Records)
- **nw_collection_registry:** Admin-Steuerung (26 Felder, 3 Einträge)

Siehe `database/schemas/` für vollständige Spezifikationen.

## 🔄 Haupt-Workflows

### 1. Spiele/Verlage durchsuchen
- Öffne die App → Tabs „Spiele" oder „Verlage"
- Daten werden aus PocketBase geladen
- Tabelle zeigt alle Einträge

### 2. Excel-Datei importieren
- Tab „Excel-Import" → Datei hochladen
- 5-Phasen-Assistent: Analyse → Mapping → Dry-Run → Bestätigung → Resultat
- Neue Collections können automatisch angelegt werden
- Bestehende Collections können befüllt werden

### 3. Datenbank verwalten (Admin)
- Tab „Admin → Datenbank" → Collection auswählen
- Tabellenansicht der Records
- (Geplant) Bearbeiten/Löschen-Funktionen

## ⚙️ Konfiguration

Keine speziellen Environment Variables erforderlich.

Die App verwendet relative Pfade zu PocketBase:
- **DEV:** `/.sfs-bd/api`
- **LIVE:** `/.sfs-be/api`

Diese Pfade sind hardcoded in `src/lib/pb.js` und hängen vom STRATO-Platform-Setup ab.

## ✅ Vollständige Übergabe und Dokumentation

### 📖 Für die nächste KI oder Entwicklerin

**Starten Sie hier:**
1. Lesen Sie `docs/handover/PROJECT_HANDOVER.md` (28 Abschnitte, 1945 Zeilen)
   - Kompletter Projektstand
   - Alle Anforderungen und deren Status
   - Bekannte Fehler und offene Entscheidungen
   - Nächste Entwicklungsschritte
   - Einstiegspunkt für Weiterentwicklung

2. Lesen Sie `docs/standards/NW-DB-STD-001_*.md`
   - Verpflichtende Regeln für Datenbank-Operationen

3. Erkunden Sie den Code:
   - `src/App.jsx` → Komponenten-Struktur verstehen
   - `src/components/ExcelImportUI.jsx` → Kern-Logik

### 🔒 Sicherheit

- ✅ Keine Secrets in Git
- ✅ `src/lib/pb.js` verwendet relative API-Pfade
- ✅ Admin-Token wird manuell generiert (nicht persistent gespeichert)
- ⚠️ Berechtigungen noch nicht durchgesetzt (siehe Handover P0/P1)

## 🐛 Bekannte Probleme (siehe Handover Abschnitt 19)

- **P0:** NeuroBalance-Komponenten nicht lokalisiert
- **P0:** Datenbank-Umgebung möglicherweise nicht konsistent (403/404-Fehler)
- **P0:** Excel-Server-Upload deaktiviert (Status 413)
- **P1:** Admin-CRUD-Buttons sind noch Platzhalter
- **P1:** Keine Import-History

## 📦 Abhängigkeiten

Siehe `package.json`. Die meisten Frameworks (React, Vite, Tailwind) werden von der STRATO-Platform bereitgestellt. Die einzige externe npm-Abhängigkeit ist:

```json
"xlsx": "^0.18.5"   // Excel-Parsing im Browser
```

## 🚢 Deployment

Deploymentz erfolgt automatisch durch die STRATO-Platform:
1. Code wird in `github.com/neuroways/excel_ai` gepusht
2. STRATO erkennt Änderungen (Webhook)
3. `npm run build:prod` wird ausgeführt
4. `dist/` wird deployed

## 📝 Tests

**Aktuell:** Keine automatisierten Tests.

Manuelle Tests durchgeführt für:
- Excel-Import mit verschiedenen Dateitypen
- Responsive Design (375px, 768px, 1280px)
- Admin-UI Navigation

## 🤝 Beitragen

Für Änderungen:
1. Sehen Sie `docs/handover/PROJECT_HANDOVER.md` Abschnitt 25+ für Entwicklungsschritte
2. Folgen Sie `docs/standards/NW-DB-STD-001` für Datenbank-Operationen
3. Committen Sie in Branch `dev`
4. Push zu `github.com/neuroways/excel_ai`

## 📞 Kontakt / Support

Siehe **PROJECT_HANDOVER.md** für:
- Technische Architektur
- Offene Entscheidungen
- Nächste Schritte
- Einstiegspunkte für neue Entwickler

---

**Letzte Aktualisierung:** 2026-08-15  
**Repository:** [github.com/neuroways/excel_ai](https://github.com/neuroways/excel_ai)  
**Vollständige Handover:** [docs/handover/PROJECT_HANDOVER.md](docs/handover/PROJECT_HANDOVER.md)
