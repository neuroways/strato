# NeuroPlay – Rollen und Berechtigungen

Datum: 2026-07-26

## 1. Schritt 1: Bestand

### Vorhandene Tabellen (23)
- npl_activity_types
- npl_activity_tags
- npl_feature_groups
- npl_publishers
- npl_persons
- npl_game_mechanics
- npl_component_types
- npl_sources
- npl_users
- npl_preference_definitions
- npl_need_definitions
- npl_matching_models
- npl_observation_categories
- npl_effect_definitions
- npl_activities
- npl_activity_tag_links
- npl_activity_relations
- npl_feature_definitions
- npl_games
- npl_source_documents
- npl_rules
- npl_core_loops
- npl_human_profiles

### Fehlende Tabellen (21)
Aus Spec erforderlich:
- npl_activities (unvollständig – muss repariert)
- npl_situations
- npl_situation_needs
- npl_checkins
- npl_households
- npl_household_members
- npl_user_preferences
- npl_collections
- npl_collection_items
- npl_sessions
- npl_session_participants
- npl_game_states
- npl_reflections
- npl_observations
- npl_observed_effects
- npl_recommendations
- npl_recommendation_factors
- npl_recommendation_feedback
- npl_user_learning_progress
- npl_roles
- npl_user_roles

---

## 2. Rollen

### 2.1 Implementierte Rollen

1. **guest** – nicht angemeldet
2. **user** – registrierter Benutzer
3. **household_admin** – Haushaltsadministrator
4. **household_member** – Haushaltsmitglied mit eigenem Konto
5. **managed_member** – verwaltetes Haushaltsmitglied
6. **coach** – Coach oder Moderator
7. **editor** – Redaktion (Fachwissen)
8. **reviewer** – Fachprüfer (Genehmigung)
9. **org_admin** – Organisationsadministrator
10. **app_admin** – NeuroPlay-Administrator
11. **system_admin** – Systemadministrator

Rolle wird in `npl_user_roles` gespeichert. Ein Benutzer kann mehrere Rollen haben.

---

## 3. Datenbereiche

### 3.1 Öffentliche Fachdaten (READ-only für Gast, Editor+Reviewer für Änderung)
- npl_activity_types
- npl_activity_tags
- npl_activity_tag_links
- npl_activity_relations
- npl_feature_groups
- npl_feature_definitions
- npl_activity_feature_values
- npl_publishers
- npl_persons
- npl_games
- npl_game_editions
- npl_game_mechanics
- npl_game_mechanic_links
- npl_component_types
- npl_game_components
- npl_rules
- npl_rule_relations
- npl_phases
- npl_steps
- npl_core_loops
- npl_core_loop_steps
- npl_learning_units
- npl_effect_definitions
- npl_activities (teil – öffentliche Metadaten)
- npl_sources
- npl_source_documents
- npl_need_definitions
- npl_preference_definitions

### 3.2 Persönliche Benutzerdaten (nur Eigentümer oder Haushaltskontext)
- npl_users (eigene Daten)
- npl_human_profiles (owner_user_id)
- npl_user_preferences (user_id)
- npl_situations (user_id)
- npl_situation_needs (situation_id > user_id)
- npl_checkins (user_id)
- npl_collections (owner_user_id)
- npl_collection_items (collection_id > owner)
- npl_sessions (user_id)
- npl_session_participants (user_id)
- npl_game_states (session_id > user_id)
- npl_reflections (user_id)
- npl_observations (subject_user_id, created_by_user_id)
- npl_observed_effects (observation_id)
- npl_recommendations (user_id)
- npl_recommendation_factors (recommendation_id)
- npl_recommendation_feedback (user_id)
- npl_user_learning_progress (user_id)

### 3.3 Haushalts- und Gruppendaten (mit Freigabelogik)
- npl_households (household_id)
- npl_household_members (household_id)

### 3.4 Administrative Daten (nur Admin/System)
- npl_roles
- npl_user_roles
- npl_matching_models
- npl_observation_categories

---

## 4. Berechtigungsmatrix (Ausgabe)

Wird in separater Datei generiert: `PERMISSIONS_MATRIX.md`

---

## 5. Gast-Speicherung im Browser

### Zulässig (nur JavaScript, nicht serverseitig)
- sessionStorage: Check-in Eingaben (Bedürfnisse, Energie, Zeit, etc.)
- sessionStorage: lokale Passungsberechnung
- sessionStorage: aktuelle Merkliste
- localStorage (optional mit Nutzerkonsens): persistente Merkliste
- RAM: Zustandsvariablen während Session

### Nicht zulässig
- serverseitige Speicherung ohne Konto
- Langfristige Geräteerkennung
- Browser-Fingerprinting
- dauerhafte Datenspeicherung

---

## 6. Anmeldepunkte

Anmeldung wird angeboten bei:

1. **Nach Gast-Check-in**: Ergebnis speichern
2. **Beim Favorisieren**: Speichern
3. **Beim Spielstandspeichern**: Pausieren und später fortsetzen
4. **Beim Lernstandspeichern**: Fortschritt speichern
5. **Haushalt erstellen/beitreten**: Gruppenmodus
6. **Sammlung erstellen**: Favoriten speichern
7. **Reflexion speichern**: Persönliche Notiz
8. **Beobachtung speichern**: Mit anderem Bezug

---

## 7. Serverseitige Zugriffsregeln (PocketBase)

Zu implementieren:

### npl_situations
```
listRule: "@request.auth.id = user_id"
viewRule: "@request.auth.id = user_id"
createRule: "@request.auth.id != ''"
updateRule: "@request.auth.id = user_id"
deleteRule: "@request.auth.id = user_id"
```

### npl_user_preferences
```
listRule: "@request.auth.id = user_id"
viewRule: "@request.auth.id = user_id"
createRule: "@request.auth.id != ''"
updateRule: "@request.auth.id = user_id"
deleteRule: "@request.auth.id = user_id"
```

### npl_human_profiles
```
listRule: "@request.auth.id = owner_user_id"
viewRule: "@request.auth.id = owner_user_id"
createRule: "@request.auth.id != ''"
updateRule: "@request.auth.id = owner_user_id"
deleteRule: "@request.auth.id = owner_user_id"
```

### npl_need_definitions
```
listRule: "is_active = true"
viewRule: "is_active = true"
createRule: "false" (nur Admin)
updateRule: "false" (nur Admin)
deleteRule: "false" (nur Admin)
```

---

## 8. Tests (geplant)

- [ ] Gast kann Check-in lokal durchführen
- [ ] Gast kann Ergebnis nicht speichern
- [ ] Nutzer kann eigene Situation speichern
- [ ] Nutzer kann fremde Situation nicht sehen
- [ ] Admin kann alle Situationen sehen (mit Audit)
- [ ] Coach sieht nur freigegebene Daten
- [ ] Haushaltsmitglied sieht private Profile anderer Erwachsener nicht
- [ ] Haushaltsadministrator kann verwaltete Profile bearbeiten

---

## 9. Nächste Schritte

- [ ] Schritt 2: Fehlende Tabellen anlegen
- [ ] Schritt 3: Vollständige Berechtigungsmatrix
- [ ] Schritt 4: Anmeldepunkte implementieren
- [ ] Schritt 5: SessionStorage für Gäste
- [ ] Schritt 6: Serverseitige Regeln (PocketBase)
- [ ] Schritt 7: Lösch-, Export-, Freigabe-Logik
- [ ] Schritt 8: Testen
