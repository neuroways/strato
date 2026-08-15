# Setup-Checklist – Öffentliche Website Fertigstellung

Diese Checkliste hilft dabei, die Anwendung produktionsreif zu machen.

---

## 🔒 Sicherheitsschritt: API Rules konfigurieren

**Status:** ⏳ Ausstehend

Damit die öffentliche Website Daten anzeigen kann, müssen die API Rules konfiguriert werden.

### Schritt 1: PocketBase Admin öffnen

```
URL: /.sfs-bd/admin/
Melde dich an (Admin-Credentials)
```

### Schritt 2: Öffentliche Collections konfigurieren

Diese 8 Collections sollen für **jeden lesbar** sein:

| Collection | List Rule | View Rule | Create Rule | Update Rule | Delete Rule |
|-----------|-----------|-----------|-------------|-------------|-------------|
| tournaments | **(leer)** | **(leer)** | **(leer)** | **(leer)** | **(leer)** |
| players | **(leer)** | **(leer)** | **(leer)** | **(leer)** | **(leer)** |
| rounds | **(leer)** | **(leer)** | **(leer)** | **(leer)** | **(leer)** |
| matches | **(leer)** | **(leer)** | **(leer)** | **(leer)** | **(leer)** |
| announcements | **(leer)** | **(leer)** | **(leer)** | **(leer)** | **(leer)** |
| courts | **(leer)** | **(leer)** | **(leer)** | **(leer)** | **(leer)** |
| results | **(leer)** | **(leer)** | **(leer)** | **(leer)** | **(leer)** |
| info_sections | **(leer)** | **(leer)** | **(leer)** | **(leer)** | **(leer)** |

**Für jede Collection:**

1. Klick auf Collection name
2. Tab "API Rules" öffnen
3. Alle Felder **leer lassen** (null/default)
4. Speichern

**Bedeutung:** Leer = „Jeder darf lesen" = öffentlich

### Schritt 3: Admin-Collections schützen

Diese 4 Collections sollen **nur für Admins** zugänglich sein:

| Collection | List Rule | View Rule | Create Rule | Update Rule | Delete Rule |
|-----------|-----------|-----------|-------------|-------------|-------------|
| tournament_settings | `@request.auth.collectionId = "admins"` | `@request.auth.collectionId = "admins"` | `@request.auth.collectionId = "admins"` | `@request.auth.collectionId = "admins"` | `@request.auth.collectionId = "admins"` |
| registrations | `@request.auth.collectionId = "admins"` | `@request.auth.collectionId = "admins"` | `@request.auth.collectionId = "admins"` | `@request.auth.collectionId = "admins"` | `@request.auth.collectionId = "admins"` |
| match_players | `@request.auth.collectionId = "admins"` | `@request.auth.collectionId = "admins"` | `@request.auth.collectionId = "admins"` | `@request.auth.collectionId = "admins"` | `@request.auth.collectionId = "admins"` |
| ai_schedule_runs | `@request.auth.collectionId = "admins"` | `@request.auth.collectionId = "admins"` | `@request.auth.collectionId = "admins"` | `@request.auth.collectionId = "admins"` | `@request.auth.collectionId = "admins"` |

**Für jede Collection:**

1. Klick auf Collection name
2. Tab "API Rules" öffnen
3. **Alle 5 Felder** mit diesem Text ausfüllen: `@request.auth.collectionId = "admins"`
4. Speichern

**Bedeutung:** Nur Admin-Benutzer dürfen diese Daten anfassen

---

## ✅ Test: Öffentliche Website funktioniert?

Nach den API Rules-Änderungen:

1. **Website neu laden** (Browser)
   ```
   Startseite sollte jetzt "Tennis Turnier 2026" anzeigen
   Kein 403-Fehler mehr
   ```

2. **Alle öffentlichen Seiten prüfen:**
   - [ ] Startseite → Turnier angezeigt?
   - [ ] Turniere → Liste angezeigt?
   - [ ] Spielplan → Runden und Spiele angezeigt?
   - [ ] Ergebnisse → Resultate angezeigt?
   - [ ] Teilnehmer → Spielerliste angezeigt?
   - [ ] News → Ankündigungen angezeigt?
   - [ ] Plätze → Courts angezeigt?
   - [ ] Kontakt → Kontaktform angezeigt?

3. **Admin-Bereich testen:**
   - [ ] Login funktioniert? (Admin-Credentials)
   - [ ] Dashboard lädt?
   - [ ] Alle Admin-Seiten funktionieren?
   - [ ] Können Daten bearbeitet werden?

---

## 📊 Rollenverwaltung (optional)

Das Projekt hat ein **Rollen-System** vorbereitet:

- **Superadmin** – Vollzugriff (Platform-Admin)
- **Administrator** – Verwaltung aller Daten
- **Redakteur** – News und Content
- **Öffentlicher Besucher** – Nur Lesezugriff

Die Rollen sind in der Datenbank (`roles` Collection) vorbereitet.

**Verwaltung:** PocketBase Admin → `roles` und `role_assignments` Collections

---

## 📝 Dokumentation

Wichtige Dokumente zum Verständnis:

- `docs/STRATO_ARCHITECTURE_ANALYSIS.md` – Warum Sicherheit so funktioniert
- `docs/ROLES_AND_PERMISSIONS.md` – Rollen-Modell
- `docs/POCKETBASE_RULES_CORRECTION.md` – API Rules richtig setzen
- `docs/database/DATABASE.md` – Alle Collections dokumentiert

---

## 🚀 Deployment (nach Setup)

Wenn alle Tests grün sind:

1. **Website publishen** (STRATO)
2. **Überprüfung auf Production-Instance** (/.sfs-be/)
3. **API Rules auch dort prüfen** (sollten migriert sein)
4. **Live-Test** – funktioniert alles?

---

## ⏱️ Zeitaufwand

- Öffentliche Collections: 8 × 1 min = **~8 Minuten**
- Admin-Collections: 4 × 2 min = **~8 Minuten**
- Tests: **~5 Minuten**

**Gesamt: ~20 Minuten**

---

## Status

- [ ] Öffentliche Collections (8) – API Rules leer
- [ ] Admin-Collections (4) – API Rules mit @request.auth.collectionId = "admins"
- [ ] Öffentliche Website funktioniert (kein 403)
- [ ] Admin-Bereich funktioniert
- [ ] Alle Tests bestanden

**Wenn alle Häkchen: ✅ Anwendung ist produktionsreif**
