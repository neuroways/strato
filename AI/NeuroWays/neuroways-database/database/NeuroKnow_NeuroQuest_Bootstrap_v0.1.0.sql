-- ============================================================
-- NeuroQuest / NeuroWays Module DB - Registrierung in NeuroKnow
-- Ziel-Datenbank: NeuroKnow (dbs15949374)
-- Version: 0.1.0
--
-- Zweck:
-- 1. NeuroQuest als Modul, App und Entwicklungsprojekt registrieren
-- 2. die getrennte NeuroWays Module DB dokumentieren
-- 3. App, Modul und Datenbank miteinander verknüpfen
-- 4. ein erstes kleines Arbeitspaket im Backlog anlegen
--
-- Eigenschaften:
-- - idempotent über stabile Codes und INSERT ... SELECT ... WHERE NOT EXISTS
-- - verändert die operative Modul-Datenbank nicht
-- - dokumentiert nur den aktuellen Ist-Stand in NeuroKnow
-- ============================================================

START TRANSACTION;

-- ------------------------------------------------------------
-- 0. Vorprüfung
-- ------------------------------------------------------------

SELECT
    'NeuroKnow-Zieldatenbank' AS check_name,
    DATABASE() AS check_value;

-- ------------------------------------------------------------
-- 1. NeuroQuest als Modul registrieren
-- ------------------------------------------------------------

INSERT INTO nk_modules
(
    module_code,
    module_name,
    module_category,
    short_description,
    purpose,
    responsibility,
    status_code
)
SELECT
    'NQU',
    'NeuroQuest',
    'experience',
    'Narrative Lern- und Aufgabenanwendung für Kinder.',
    'Verbindet strukturierte Aufgaben mit Geschichten, Charakteren, Missionen und kindgerechter Orientierung.',
    'Fachmodul für Storystruktur, Lernmissionen, Aufgabenbegleitung und kindbezogenen Fortschritt.',
    'in_progress'
WHERE NOT EXISTS (
    SELECT 1
    FROM nk_modules
    WHERE module_code = 'NQU'
);

-- ------------------------------------------------------------
-- 2. NeuroQuest-App registrieren
-- ------------------------------------------------------------

INSERT INTO nk_apps
(
    app_code,
    app_name,
    app_type,
    platform,
    purpose,
    target_group,
    hosting_info,
    status_code,
    current_version
)
SELECT
    'NQU-APP',
    'NeuroQuest',
    'PWA',
    'Web / Mobile',
    'Kindgerechte Anwendung für fünftägige Geschichten, Missionen, Aufgaben und dauerhaften Fortschritt.',
    'Kinder sowie begleitende Eltern und später weitere Sorge- und Lernpersonen.',
    'STRATO Webhosting; PHP 8.4; MariaDB; bestehende React/Vite-PWA.',
    'in_progress',
    '0.1.0'
WHERE NOT EXISTS (
    SELECT 1
    FROM nk_apps
    WHERE app_code = 'NQU-APP'
);

-- ------------------------------------------------------------
-- 3. NeuroQuest-Entwicklungsprojekt registrieren
-- ------------------------------------------------------------

INSERT INTO nk_projects
(
    project_code,
    project_name,
    description,
    goal_text,
    status_code,
    current_phase
)
SELECT
    'NQU-001',
    'NeuroQuest',
    'Schrittweise Weiterentwicklung der bestehenden NeuroQuest-PWA auf vollständiger Datenbankbasis.',
    'Einen stabilen datenbankbasierten Story-, Aufgaben-, Charakter- und Fortschrittskern entwickeln und in kleinen testbaren Arbeitspaketen in die UI integrieren.',
    'in_progress',
    'Datenmodell und Datenbankintegration'
WHERE NOT EXISTS (
    SELECT 1
    FROM nk_projects
    WHERE project_code = 'NQU-001'
);

-- ------------------------------------------------------------
-- 4. Getrennte operative Modul-Datenbank registrieren
-- ------------------------------------------------------------

INSERT INTO nk_database_systems
(
    database_code,
    database_name,
    database_type,
    server_name,
    database_identifier,
    environment,
    purpose,
    hosting_info,
    privacy_class,
    backup_notes,
    status_code
)
SELECT
    'NW-MODULE-DB-DEV',
    'NeuroWays Module DB',
    'MariaDB',
    'database-5021022338.webspace-host.com',
    'dbs15945095',
    'development',
    'Operative Entwicklungsdatenbank für NeuroWays-Module. Enthält aktuell unter anderem NeuroQuest- und NeuroRhythm-Strukturen.',
    'STRATO Webhosting. Physisch und fachlich von der NeuroKnow-Datenbank getrennt.',
    'sensitive',
    'Vor produktiven Migrationen und Strukturänderungen vollständigen Export erstellen.',
    'active'
WHERE NOT EXISTS (
    SELECT 1
    FROM nk_database_systems
    WHERE database_code = 'NW-MODULE-DB-DEV'
);

-- ------------------------------------------------------------
-- 5. App ↔ Modul verknüpfen
-- ------------------------------------------------------------

INSERT INTO nk_app_modules
(
    app_id,
    module_id,
    implementation_role,
    notes
)
SELECT
    a.app_id,
    m.module_id,
    'primary',
    'Die NeuroQuest-App implementiert das NeuroQuest-Modul.'
FROM nk_apps a
JOIN nk_modules m
  ON m.module_code = 'NQU'
WHERE a.app_code = 'NQU-APP'
  AND NOT EXISTS (
      SELECT 1
      FROM nk_app_modules am
      WHERE am.app_id = a.app_id
        AND am.module_id = m.module_id
  );

-- ------------------------------------------------------------
-- 6. App ↔ Datenbank verknüpfen
-- ------------------------------------------------------------

INSERT INTO nk_app_databases
(
    app_id,
    database_system_id,
    access_type,
    notes
)
SELECT
    a.app_id,
    d.database_system_id,
    'uses',
    'NeuroQuest nutzt die getrennte NeuroWays Module DB als operative Laufzeit- und Inhaltsdatenbank.'
FROM nk_apps a
JOIN nk_database_systems d
  ON d.database_code = 'NW-MODULE-DB-DEV'
WHERE a.app_code = 'NQU-APP'
  AND NOT EXISTS (
      SELECT 1
      FROM nk_app_databases ad
      WHERE ad.app_id = a.app_id
        AND ad.database_system_id = d.database_system_id
  );

-- ------------------------------------------------------------
-- 7. Erste Architekturentscheidung dokumentieren
-- ------------------------------------------------------------

INSERT INTO nk_decisions
(
    decision_code,
    title,
    question_text,
    context_text,
    options_text,
    decision_text,
    rationale_text,
    consequences_text,
    status_code,
    decided_at
)
SELECT
    'DEC-NQU-DB-001',
    'NeuroKnow und operative Modul-Daten bleiben getrennt',
    'Sollen Entwicklungswissen und operative Moduldaten in derselben Datenbank gespeichert werden?',
    'NeuroKnow dokumentiert Projekte, Ideen, Entscheidungen, Backlog, technische Strukturen und Nachweise. Die NeuroWays Module DB enthält die operativen Daten der einzelnen Module.',
    'Option A: gemeinsame Datenbank. Option B: getrennte Datenbanken mit dokumentierten Verknüpfungen über stabile Codes.',
    'NeuroKnow und die operative NeuroWays Module DB bleiben physisch und fachlich getrennt.',
    'Die Trennung schützt Verantwortungsbereiche, verhindert eine Vermischung von Meta- und Laufzeitdaten und unterstützt unabhängige Modulentwicklung.',
    'Keine datenbankübergreifenden Fremdschlüssel. Zuordnungen werden in NeuroKnow über Apps, Module, Datenbanksysteme und stabile technische Codes dokumentiert.',
    'decided',
    CURRENT_TIMESTAMP()
WHERE NOT EXISTS (
    SELECT 1
    FROM nk_decisions
    WHERE decision_code = 'DEC-NQU-DB-001'
);

-- ------------------------------------------------------------
-- 8. Erstes kleines Backlog-Arbeitspaket
-- ------------------------------------------------------------

INSERT INTO nk_backlog_items
(
    backlog_code,
    project_id,
    parent_item_id,
    item_type,
    title,
    description,
    business_value,
    acceptance_criteria,
    definition_of_done,
    complexity_level,
    energy_level,
    status_code,
    priority_rank,
    target_release
)
SELECT
    'NQU-WP-001',
    p.project_id,
    NULL,
    'technical',
    'NeuroQuest-Istmodell der Modul-Datenbank analysieren',
    'Das vorhandene NeuroQuest-Datenmodell aus der NeuroWays Module DB wird vollständig gegen die neuen fachlichen Anforderungen geprüft. Bestehende NQU_- und ältere nq_-Strukturen werden getrennt bewertet. Noch keine Tabellen werden gelöscht oder verändert.',
    'Schafft eine belastbare Grundlage für die Migration, verhindert doppelte Strukturen und schützt vorhandene Daten.',
    '1. Alle NeuroQuest-Tabellen sind erfasst. 2. NQU_- und nq_-Strukturen sind fachlich zugeordnet. 3. Wiederverwendbare, zu erweiternde und abzulösende Strukturen sind markiert. 4. Fehlende Tabellen und Relationen sind dokumentiert. 5. Es wurde noch keine operative Struktur verändert.',
    'Analysebericht liegt vor; Abweichungen sind als Entscheidungen, Backlog oder Backup-Ideen eingeordnet; nächstes Migrationspaket ist eindeutig abgegrenzt.',
    'medium',
    'medium',
    'ready',
    1,
    '0.2.0'
FROM nk_projects p
WHERE p.project_code = 'NQU-001'
  AND NOT EXISTS (
      SELECT 1
      FROM nk_backlog_items
      WHERE backlog_code = 'NQU-WP-001'
  );

COMMIT;

-- ------------------------------------------------------------
-- 9. Kontrolle
-- ------------------------------------------------------------

SELECT
    module_id,
    module_code,
    module_name,
    status_code
FROM nk_modules
WHERE module_code = 'NQU';

SELECT
    app_id,
    app_code,
    app_name,
    status_code,
    current_version
FROM nk_apps
WHERE app_code = 'NQU-APP';

SELECT
    project_id,
    project_code,
    project_name,
    status_code,
    current_phase
FROM nk_projects
WHERE project_code = 'NQU-001';

SELECT
    database_system_id,
    database_code,
    database_name,
    database_identifier,
    environment,
    status_code
FROM nk_database_systems
WHERE database_code = 'NW-MODULE-DB-DEV';

SELECT
    b.backlog_code,
    b.title,
    b.item_type,
    b.status_code,
    b.priority_rank,
    b.target_release
FROM nk_backlog_items b
JOIN nk_projects p
  ON p.project_id = b.project_id
WHERE p.project_code = 'NQU-001'
ORDER BY b.priority_rank, b.backlog_code;
