<?php
declare(strict_types=1);

const MIGRATION_TABLE = 'NHO_SCHEMA_MIGRATIONS';
const MIGRATION_LOCK = 'NHO_MIGRATIONS_V041';

function fail(string $message, int $code = 1): never
{
    fwrite(STDERR, "FEHLER: {$message}\n");
    exit($code);
}

function bootstrapLedger(PDO $pdo): void
{
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS " . MIGRATION_TABLE . " (
            migration_code VARCHAR(128) NOT NULL,
            checksum_sha256 CHAR(64) NOT NULL,
            applied_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            execution_ms INT UNSIGNED NOT NULL,
            PRIMARY KEY (migration_code)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );
}

function ledgerExists(PDO $pdo): bool
{
    $statement = $pdo->prepare(
        "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = :table_name"
    );
    $statement->execute(['table_name' => MIGRATION_TABLE]);
    return (int)$statement->fetchColumn() === 1;
}

function migrationFiles(string $root): array
{
    $files = glob($root . '/migrations/[0-9][0-9][0-9][0-9]_*.sql') ?: [];
    sort($files, SORT_STRING);
    if ($files === []) {
        fail('Keine Migrationen gefunden.');
    }
    return $files;
}

function appliedMigrations(PDO $pdo): array
{
    $rows = $pdo->query('SELECT migration_code, checksum_sha256, applied_at FROM ' . MIGRATION_TABLE . ' ORDER BY migration_code')->fetchAll();
    $result = [];
    foreach ($rows as $row) {
        $result[$row['migration_code']] = $row;
    }
    return $result;
}

$databaseRoot = dirname(__DIR__);
$moduleRoot = dirname($databaseRoot);
require $moduleRoot . '/backend/bootstrap/database.php';
$options = getopt('', ['status', 'dry-run', 'apply']) ?: [];
$modes = array_intersect(['status', 'dry-run', 'apply'], array_keys($options));
if (count($modes) !== 1) {
    fail('Genau einen Modus verwenden: --status, --dry-run oder --apply.', 2);
}
$mode = array_values($modes)[0];
try {
    $pdo = nhoPlatformConnection($moduleRoot);
} catch (Throwable $error) {
    fail('Zentrale Plattformverbindung fehlgeschlagen: ' . $error->getMessage());
}
$files = migrationFiles($databaseRoot);
$hasLedger = ledgerExists($pdo);
if ($mode === 'apply' && !$hasLedger) {
    bootstrapLedger($pdo);
    $hasLedger = true;
}
$applied = $hasLedger ? appliedMigrations($pdo) : [];

if ($mode === 'apply' && strtolower((string)(getenv('NEUROWAYS_ENV') ?: '')) !== 'dev') {
    fail('Für --apply muss NEUROWAYS_ENV=dev explizit gesetzt sein; PROD ist noch nicht freigegeben.', 3);
}

$pending = [];
foreach ($files as $file) {
    $code = basename($file, '.sql');
    $checksum = hash_file('sha256', $file);
    if (isset($applied[$code])) {
        if (!hash_equals($applied[$code]['checksum_sha256'], $checksum)) {
            fail("Bereits angewendete Migration wurde verändert: {$code}", 4);
        }
        printf("OK       %-44s %s\n", $code, $applied[$code]['applied_at']);
    } else {
        printf("AUSSTEHEND %-40s %s\n", $code, substr($checksum, 0, 12));
        $pending[] = [$file, $code, $checksum];
    }
}

if ($mode === 'status' || $mode === 'dry-run') {
    printf("\n%d angewendet · %d ausstehend\n", count($applied), count($pending));
    exit(0);
}

if ($pending === []) {
    fwrite(STDOUT, "\nSchema ist bereits aktuell.\n");
    exit(0);
}

$lockStatement = $pdo->prepare('SELECT GET_LOCK(:lock_name, 10)');
$lockStatement->execute(['lock_name' => MIGRATION_LOCK]);
if ((int)$lockStatement->fetchColumn() !== 1) {
    fail('Migrationssperre konnte nicht übernommen werden.', 5);
}

$migrationError = null;
try {
    foreach ($pending as [$file, $code, $checksum]) {
        $sql = file_get_contents($file);
        if ($sql === false || trim($sql) === '') {
            fail("Migration ist leer oder nicht lesbar: {$code}", 6);
        }
        $started = hrtime(true);
        fwrite(STDOUT, "WENDE AN  {$code}\n");
        $pdo->exec($sql);
        $durationMs = (int)round((hrtime(true) - $started) / 1_000_000);
        $insert = $pdo->prepare(
            'INSERT INTO ' . MIGRATION_TABLE . ' (migration_code, checksum_sha256, execution_ms) VALUES (:code, :checksum, :duration)'
        );
        $insert->execute(['code' => $code, 'checksum' => $checksum, 'duration' => $durationMs]);
        fwrite(STDOUT, "BESTÄTIGT {$code} ({$durationMs} ms)\n");
    }
} catch (Throwable $error) {
    $migrationError = $error;
} finally {
    $release = $pdo->prepare('SELECT RELEASE_LOCK(:lock_name)');
    $release->execute(['lock_name' => MIGRATION_LOCK]);
}

if ($migrationError !== null) {
    fail('Migration abgebrochen: ' . $migrationError->getMessage(), 7);
}

fwrite(STDOUT, "\nMigration vollständig. Jetzt: php database/bin/verify.php\n");
