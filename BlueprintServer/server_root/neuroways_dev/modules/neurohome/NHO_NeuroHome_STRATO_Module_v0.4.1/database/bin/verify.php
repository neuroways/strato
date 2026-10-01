<?php
declare(strict_types=1);

function fail(string $message, int $code = 1): never
{
    fwrite(STDERR, "FAIL · {$message}\n");
    exit($code);
}

$databaseRoot = dirname(__DIR__);
$moduleRoot = dirname($databaseRoot);
require $moduleRoot . '/backend/bootstrap/database.php';

try {
    $pdo = nhoPlatformConnection($moduleRoot);
} catch (Throwable $error) {
    fail('Zentrale Plattformverbindung fehlgeschlagen: ' . $error->getMessage());
}

$expectedTables = [
    'NHO_SCHEMA_MIGRATIONS','NHO_CATALOG_ENTRIES','NHO_CATALOG_TRANSLATIONS','NHO_HOMES','NHO_HOME_MEMBERS','NHO_IDEMPOTENCY_KEYS',
    'NHO_PLACES','NHO_PLACE_ALIASES','NHO_PLACE_FUNCTIONS','NHO_FUNCTION_MINIMUM_STATES','NHO_ZONES','NHO_ZONE_ROLES','NHO_ZONE_MINIMUM_STATES',
    'NHO_CATEGORIES','NHO_CATEGORY_ALIASES','NHO_ITEMS','NHO_ITEM_CATEGORY_LINKS','NHO_HOME_ASSIGNMENTS','NHO_ZONE_ALLOWED_CATEGORY_LINKS',
    'NHO_ACTIVITIES','NHO_ACTIVITY_VERSIONS','NHO_ACTIVITY_PLACE_LINKS','NHO_ACTIVITY_NEEDS','NHO_ACTIVITY_STEPS','NHO_PATH_DEFINITIONS',
    'NHO_METHODS','NHO_METHOD_VERSIONS','NHO_METHOD_STEPS','NHO_RECOMMENDATION_RULES','NHO_STOP_SIGNALS',
    'NHO_SESSIONS','NHO_SESSION_CHECKINS','NHO_SESSION_SCOPES','NHO_SESSION_SCOPE_TARGETS','NHO_SESSION_METHODS','NHO_SESSION_ACTIONS',
    'NHO_SESSION_INTERVALS','NHO_SESSION_CLOSES','NHO_OBSERVATIONS','NHO_SEARCH_DOCUMENTS','NHO_PROJECTION_QUEUE_ENTRIES'
];

$placeholders = implode(',', array_fill(0, count($expectedTables), '?'));
$statement = $pdo->prepare("SELECT table_name, engine, table_collation FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name IN ({$placeholders})");
$statement->execute($expectedTables);
$tables = [];
foreach ($statement->fetchAll() as $row) {
    $tables[$row['table_name']] = $row;
}

$missing = array_values(array_diff($expectedTables, array_keys($tables)));
if ($missing !== []) {
    fail('Fehlende Tabellen: ' . implode(', ', $missing), 10);
}
foreach ($tables as $name => $table) {
    if (strtoupper((string)$table['engine']) !== 'INNODB') {
        fail("{$name} verwendet nicht InnoDB.", 11);
    }
    if (!str_starts_with(strtolower((string)$table['table_collation']), 'utf8mb4_')) {
        fail("{$name} verwendet nicht utf8mb4.", 12);
    }
}

$checks = [
    ['Migrationen', "SELECT COUNT(*) FROM NHO_SCHEMA_MIGRATIONS", 5],
    ['Katalogwerte', "SELECT COUNT(*) FROM NHO_CATALOG_ENTRIES WHERE status = 'published'", 60],
    ['Methoden', "SELECT COUNT(*) FROM NHO_METHODS WHERE status = 'published'", 7],
    ['Methodenversionen', "SELECT COUNT(*) FROM NHO_METHOD_VERSIONS WHERE status = 'published'", 7],
    ['Methodenschritte', "SELECT COUNT(*) FROM NHO_METHOD_STEPS", 21],
    ['Empfehlungsregeln', "SELECT COUNT(*) FROM NHO_RECOMMENDATION_RULES WHERE status = 'published'", 7],
    ['Stoppsignale', "SELECT COUNT(*) FROM NHO_STOP_SIGNALS WHERE status = 'published'", 7],
];

foreach ($checks as [$label, $sql, $minimum]) {
    $actual = (int)$pdo->query($sql)->fetchColumn();
    if ($actual < $minimum) {
        fail("{$label}: erwartet mindestens {$minimum}, gefunden {$actual}.", 20);
    }
    fwrite(STDOUT, "PASS · {$label}: {$actual}\n");
}

$fulltext = (int)$pdo->query(
    "SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name = 'NHO_SEARCH_DOCUMENTS' AND index_type = 'FULLTEXT'"
)->fetchColumn();
if ($fulltext < 1) {
    fail('FULLTEXT-Index für die Suche fehlt.', 30);
}
fwrite(STDOUT, "PASS · Suche: FULLTEXT vorhanden\n");

$invalidRules = (int)$pdo->query("SELECT COUNT(*) FROM NHO_RECOMMENDATION_RULES WHERE JSON_VALID(condition_json) = 0")->fetchColumn();
if ($invalidRules !== 0) {
    fail("Ungültige Empfehlungsregeln: {$invalidRules}", 31);
}
fwrite(STDOUT, "PASS · Empfehlungsregeln: gültiges JSON\n");

fwrite(STDOUT, "\nPASS · NeuroHome-Schema v0.4.1 ist technisch vollständig.\n");
