# Projektstandards – STRATO Public Websites mit PocketBase

## Geltungsbereich

Diese Standards gelten für **alle zukünftigen STRATO-Projekte**, die:
- Eine öffentliche Website mit React/Frontend haben
- PocketBase als Datenspeicher verwenden
- Daten zwischen Admin-Bereich und Public Site teilen

---

## Pflicht-Checkliste vor Abnahme

Ein Projekt gilt erst als **bereit zur Inbetriebnahme**, wenn **beide** erfüllt sind:

### A. Code ist vollständig
- ✅ Alle Komponenten funktionieren
- ✅ Services sind implementiert
- ✅ Build ist fehlerfrei
- ✅ Tests sind bestanden

### B. Infrastruktur ist dokumentiert
- ✅ `SETUP_CHECKLIST.md` existiert
- ✅ `STRATO_DEPLOYMENT.md` existiert
- ✅ Alle manuellen Schritte sind aufgelistet
- ✅ Keine überraschenden 403-Fehler nach dem Build

---

## Automatische Prüfung nach dem Build

Nach jedem erfolgreichen Build soll geprüft werden:

```javascript
function validatePublicWebsiteSetup() {
  const hasPublicPages = fs.existsSync('src/pages/public/');
  const hasPocketBase = fs.existsSync('src/lib/pb.ts');
  const hasSetupChecklist = fs.existsSync('SETUP_CHECKLIST.md');
  const hasDeploymentGuide = fs.existsSync('docs/STRATO_DEPLOYMENT.md');
  
  if (hasPublicPages && hasPocketBase) {
    if (!hasSetupChecklist || !hasDeploymentGuide) {
      return {
        status: 'INCOMPLETE',
        message: 'Public website setup documentation missing',
        missing: [
          !hasSetupChecklist && 'SETUP_CHECKLIST.md',
          !hasDeploymentGuide && 'docs/STRATO_DEPLOYMENT.md'
        ].filter(Boolean)
      };
    }
  }
  
  return { status: 'READY' };
}
```

---

## SETUP_CHECKLIST.md – Vorlage

**Musterdatei im Projekt-Root**

Ziel: Ein Entwickler sollte diese Datei öffnen und Schritt für Schritt die API Rules konfigurieren können, **ohne** andere Dokumentation lesen zu müssen.

**Inhalte:**

1. **Überschrift:** "Setup-Checklist – Öffentliche Website Fertigstellung"
2. **Sicherheitsschritt (API Rules)**
   - Link zu PocketBase Admin
   - Tabelle aller öffentlichen Collections + erforderliche Rules
   - Tabelle aller Admin-Collections + erforderliche Rules
3. **Test-Matrix**
   - Alle öffentlichen Seiten aufgelistet (Startseite, Turniere, News, etc.)
   - Checkboxen für jeden Test (lädt die Seite? Zeigt Daten?)
4. **Rollenverwaltung (optional)**
   - Falls Rollen-System vorhanden
5. **Zeitaufwand**
   - Realistische Schätzung (z.B. "~20 Minuten")
6. **Status-Übersicht**
   - Finale Checkliste zum Abhaken

**Format:** Markdown mit Tabellen (nicht HTML, nicht JSON)

---

## STRATO_DEPLOYMENT.md – Vorlage

**Musterdatei in `docs/`**

Ziel: Ein Systemadministrator oder DevOps-Team sollte diese Datei befolgen können, um das Projekt vom Dev zum Live-System zu bringen.

**Inhalte:**

1. **Umgebungen**
   ```
   Development: /.sfs-bd/
   Production: /.sfs-be/
   ```

2. **Prädeployment-Checkliste (Dev)**
   - [ ] Alle Tests bestanden
   - [ ] SETUP_CHECKLIST.md erfolgreich abgearbeitet
   - [ ] API Rules auf Dev gesetzt
   - [ ] Öffentliche Website funktioniert (kein 403)
   - [ ] Admin-Bereich funktioniert

3. **Schema-Migration**
   ```bash
   # Automatisch durch STRATO
   pb_migrate_sfs.js
   # Kopiert Collections von /.sfs-bd/ zu /.sfs-be/
   # Beachte: API Rules folgen NICHT mit!
   ```

4. **Postdeployment (auf Production)**
   - [ ] PocketBase Admin öffnen (/.sfs-be/admin/)
   - [ ] API Rules **erneut** setzen (gleiches wie auf Dev)
   - [ ] Öffentliche Website testen (/.sfs-be/)
   - [ ] Admin-Bereich testen (/.sfs-be/admin/)
   - [ ] Monitoring konfigurieren (optional)

5. **Rollback-Plan**
   - Falls etwas schiefgeht: Wie stellt man den Zustand her?

6. **Häufig gestellte Fragen**
   ```
   F: Warum bekomme ich 403 nach dem Deployment?
   A: API Rules wurden nicht migriert. Schritt 4.2 beachten.
   
   F: Warum funktioniert die Admin-UI auf Production nicht?
   A: Authentifizierungstoken sind env-spezifisch. Neu anmelden.
   
   F: Kann ich Daten von Dev zu Production kopieren?
   A: pb_migrate_sfs.js migert nur Schema, nicht Daten. Manuelle Migration nötig.
   ```

---

## Best-Practice-Workflow

### Phase 1: Entwicklung (Dev)
```
1. Code schreiben (Components, Services, Pages)
2. Collections anlegen + Schema definieren
3. Test-Daten laden
4. Tests schreiben + bestanden
5. Build erfolgreicher
```

### Phase 2: Setup & Tests (lokal auf Dev)
```
6. SETUP_CHECKLIST.md befolgen
   → API Rules setzen (manuell, im Admin Panel)
7. Öffentliche Website testen
8. Admin-Bereich testen
9. Alle Tests auf grün
```

### Phase 3: Dokumentation
```
10. STRATO_DEPLOYMENT.md schreiben
11. Alle Infrastruktur-Schritte dokumentieren
12. Abnahme-Checklist abhaken
```

### Phase 4: Deployment (zu Production)
```
13. Schema migrieren (pb_migrate_sfs.js)
14. API Rules auf Production setzen
    → SETUP_CHECKLIST.md Schritt 2 wiederholen, aber auf /.sfs-be/
15. Produktion testen
16. Go Live
```

---

## Dokumentation: Was muss wohin?

| Dokumenttyp | Zielgruppe | Format | Ort |
|--|--|--|--|
| **SETUP_CHECKLIST.md** | Entwickler (lokal) | Markdown mit Tabellen | `./SETUP_CHECKLIST.md` |
| **STRATO_DEPLOYMENT.md** | DevOps / Sysadmin (Produktiv) | Markdown, Step-by-Step | `./docs/STRATO_DEPLOYMENT.md` |
| **Architecture** | Entwickler + Team | Markdown, Konzept | `./docs/STRATO_ARCHITECTURE_ANALYSIS.md` |
| **API Rules Reference** | Alle | Markdown, Referenz | `./docs/POCKETBASE_RULES_CORRECTION.md` |
| **Roles & Permissions** | Admin + Entwickler | Markdown, Konzept | `./docs/ROLES_AND_PERMISSIONS.md` |
| **Database Schema** | Entwickler + DBA | Markdown, technisch | `./docs/database/DATABASE.md` |

---

## Auto-Generierung (für zukünftige Projekte)

Wenn ein Projekt erkannt wird, das öffentliche Pages + PocketBase hat:

1. **Template laden:** `SETUP_CHECKLIST_TEMPLATE.md`
   - Collections-Namen automatisch einfüllen
   - Öffentliche Seiten-Namen einfüllen
   - Speichern in `./SETUP_CHECKLIST.md`

2. **Template laden:** `STRATO_DEPLOYMENT_TEMPLATE.md`
   - Projekt-Name einfüllen
   - Collection-Namen einfüllen
   - Speichern in `./docs/STRATO_DEPLOYMENT.md`

3. **Validierung:** Nach Build prüfen, dass beide Dateien existieren

4. **Hinweis:** "Setup documentation is ready. See SETUP_CHECKLIST.md"

---

## Abnahme-Kriterien

Ein Projekt mit öffentlicher Website wird nur dann **released**, wenn:

- [ ] Code kompiliert fehlerfrei
- [ ] Alle automatisierten Tests bestanden
- [ ] SETUP_CHECKLIST.md existiert und ist vollständig
- [ ] STRATO_DEPLOYMENT.md existiert und ist vollständig
- [ ] Alle Infrastruktur-Schritte dokumentiert
- [ ] Kein 403-Fehler auf öffentlichen Seiten (nach Setup)
- [ ] Admin-Bereich funktioniert
- [ ] Dokumentation ist verständlich auch für Nicht-Entwickler

---

## Anwendung auf dieses Projekt

Dieses Tennis-Turnier-Management-System folgt diesem Standard:

- ✅ `SETUP_CHECKLIST.md` – Schritt 1-3 (öffentliche + Admin Collections)
- ✅ `STRATO_DEPLOYMENT.md` – Wird als nächstes erstellt
- ✅ `STRATO_ARCHITECTURE_ANALYSIS.md` – Erklärt das Warum
- ✅ `POCKETBASE_RULES_CORRECTION.md` – API Rules technisch
- ✅ `ROLES_AND_PERMISSIONS.md` – Zugriffskonzept

**Status:** ⏳ Warten auf STRATO_DEPLOYMENT.md

---

## Zusammenfassung

**Dieser Standard stellt sicher, dass:**

1. Code-Qualität + Infrastruktur-Klarheit gleich wichtig sind
2. Kein Projekt wird released, das "fast funktioniert"
3. Neue Entwickler können Projekte schnell verstehen
4. Deployment wird nicht zum Überraschungs-Event
5. STRATO-Sicherheitskonzept bleibt, aber ist erklärt

**Für alle neuen Projekte:**
- Automatische Prüfung nach Build
- Template-basierte Dokumentation
- Strukturierte Abnahme
- Klare Übergabe an Production
