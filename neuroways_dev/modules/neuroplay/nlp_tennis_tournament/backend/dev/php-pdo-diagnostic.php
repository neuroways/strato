<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');

// T002 is deliberately self-contained. It must still produce useful output
// when the project bootstrap itself is the source of the failure.
ini_set('display_errors', '0');
error_reporting(E_ALL);

$testId = 'TT-DEV-0001-C003-T002';
$projectRoot = dirname(__DIR__);
$checks = [];
$overallStatus = 'ok';

function addCheck(array &$checks, string $name, string $status, string $message, array $meta = []): void
{
    $checks[] = array_merge([
        'check' => $name,
        'status' => $status,
        'message' => $message,
    ], $meta);
}

function safeEnvPresence(string $file, array $requiredKeys): array
{
    if (!is_file($file)) {
        return [
            'file_exists' => false,
            'readable' => false,
            'keys' => array_fill_keys($requiredKeys, false),
        ];
    }

    $result = [
        'file_exists' => true,
        'readable' => is_readable($file),
        'keys' => array_fill_keys($requiredKeys, false),
    ];

    if (!$result['readable']) {
        return $result;
    }

    $lines = @file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if (!is_array($lines)) {
        return $result;
    }

    foreach ($lines as $line) {
        $trimmed = trim($line);
        if ($trimmed === '' || str_starts_with($trimmed, '#') || !str_contains($trimmed, '=')) {
            continue;
        }

        [$key] = explode('=', $trimmed, 2);
        $key = trim($key);
        if (array_key_exists($key, $result['keys'])) {
            $result['keys'][$key] = true;
        }
    }

    return $result;
}

function errorResponse(string $testId, array $checks, string $message, ?Throwable $error = null): never
{
    http_response_code(500);
    echo json_encode([
        'test' => $testId,
        'status' => 'error',
        'message' => $message,
        'checks' => $checks,
        'error_type' => $error ? $error::class : null,
        // Intentionally no exception message: it can contain host/path details.
        'timestamp_utc' => gmdate('c'),
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . "\n";
    exit;
}

register_shutdown_function(static function () use (&$checks, $testId): void {
    $lastError = error_get_last();
    if ($lastError === null) {
        return;
    }

    $fatalTypes = [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR, E_USER_ERROR];
    if (!in_array($lastError['type'], $fatalTypes, true)) {
        return;
    }

    if (!headers_sent()) {
        http_response_code(500);
        header('Content-Type: application/json; charset=utf-8');
    }

    echo json_encode([
        'test' => $testId,
        'status' => 'fatal_error',
        'message' => 'PHP terminated with a fatal error. Exact server paths and messages are intentionally hidden.',
        'checks' => $checks,
        'fatal_type' => $lastError['type'],
        'timestamp_utc' => gmdate('c'),
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . "\n";
});

try {
    addCheck($checks, 'php_runtime', 'ok', 'PHP script execution reached T002.', [
        'php_version' => PHP_VERSION,
        'php_sapi' => PHP_SAPI,
    ]);

    $pdoLoaded = extension_loaded('PDO');
    addCheck(
        $checks,
        'pdo_extension',
        $pdoLoaded ? 'ok' : 'error',
        $pdoLoaded ? 'PDO extension is loaded.' : 'PDO extension is not loaded.'
    );
    if (!$pdoLoaded) {
        $overallStatus = 'error';
    }

    $pdoMysqlLoaded = extension_loaded('pdo_mysql');
    addCheck(
        $checks,
        'pdo_mysql_extension',
        $pdoMysqlLoaded ? 'ok' : 'error',
        $pdoMysqlLoaded ? 'pdo_mysql extension is loaded.' : 'pdo_mysql extension is not loaded.'
    );
    if (!$pdoMysqlLoaded) {
        $overallStatus = 'error';
    }

    $requiredFiles = [
        'Env.php' => $projectRoot . '/backend/src/Infrastructure/Config/Env.php',
        'Configuration.php' => $projectRoot . '/backend/src/Infrastructure/Config/Configuration.php',
        'DatabaseConnection.php' => $projectRoot . '/backend/src/Infrastructure/Persistence/PDO/Connection/DatabaseConnection.php',
        'DatabaseHealthCheck.php' => $projectRoot . '/backend/src/Infrastructure/Health/DatabaseHealthCheck.php',
        'database.php' => $projectRoot . '/backend/config/database.php',
    ];

    $allFilesPresent = true;
    foreach ($requiredFiles as $label => $path) {
        $exists = is_file($path) && is_readable($path);
        addCheck(
            $checks,
            'file_' . $label,
            $exists ? 'ok' : 'error',
            $exists ? $label . ' is present and readable.' : $label . ' is missing or not readable.'
        );
        $allFilesPresent = $allFilesPresent && $exists;
    }
    if (!$allFilesPresent) {
        $overallStatus = 'error';
    }

    $envFile = $projectRoot . '/.env';
    $envPresence = safeEnvPresence($envFile, [
        'DB_HOST',
        'DB_PORT',
        'DB_DATABASE',
        'DB_USERNAME',
        'DB_PASSWORD',
        'DB_CHARSET',
    ]);

    addCheck(
        $checks,
        'env_file',
        ($envPresence['file_exists'] && $envPresence['readable']) ? 'ok' : 'error',
        !$envPresence['file_exists']
            ? '.env file is missing.'
            : ($envPresence['readable'] ? '.env file is present and readable.' : '.env file is not readable.'),
        ['configured_keys' => $envPresence['keys']]
    );
    if (!$envPresence['file_exists'] || !$envPresence['readable']) {
        $overallStatus = 'error';
    }

    if (!$allFilesPresent) {
        http_response_code(500);
        echo json_encode([
            'test' => $testId,
            'status' => $overallStatus,
            'message' => 'Project files are incomplete. Database connection test was not attempted.',
            'checks' => $checks,
            'timestamp_utc' => gmdate('c'),
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . "\n";
        exit;
    }

    require_once $requiredFiles['Env.php'];
    addCheck($checks, 'load_Env.php', 'ok', 'Env.php loaded successfully.');

    require_once $requiredFiles['Configuration.php'];
    addCheck($checks, 'load_Configuration.php', 'ok', 'Configuration.php loaded successfully.');

    require_once $requiredFiles['DatabaseConnection.php'];
    addCheck($checks, 'load_DatabaseConnection.php', 'ok', 'DatabaseConnection.php loaded successfully.');

    require_once $requiredFiles['DatabaseHealthCheck.php'];
    addCheck($checks, 'load_DatabaseHealthCheck.php', 'ok', 'DatabaseHealthCheck.php loaded successfully.');

    \TT\Infrastructure\Config\Env::load($envFile);
    addCheck($checks, 'env_loader', 'ok', 'Project Env loader completed.');

    $configuration = \TT\Infrastructure\Config\Configuration::fromFile($requiredFiles['database.php']);
    addCheck($checks, 'database_configuration', 'ok', 'Database configuration loaded.');

    $requiredConfig = [
        'database.host',
        'database.name',
        'database.username',
        'database.charset',
    ];
    $missingConfig = [];
    foreach ($requiredConfig as $path) {
        $value = $configuration->get($path);
        if (!is_string($value) || trim($value) === '') {
            $missingConfig[] = $path;
        }
    }

    if ($missingConfig !== []) {
        addCheck($checks, 'database_config_required_values', 'error', 'Required database configuration values are missing.', [
            'missing' => $missingConfig,
        ]);
        $overallStatus = 'error';
    } else {
        addCheck($checks, 'database_config_required_values', 'ok', 'Required database configuration values are present.');
    }

    if (!$pdoMysqlLoaded || $missingConfig !== []) {
        http_response_code(503);
        echo json_encode([
            'test' => $testId,
            'status' => $overallStatus,
            'message' => 'Prerequisites failed. Database connection test was not attempted.',
            'checks' => $checks,
            'timestamp_utc' => gmdate('c'),
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . "\n";
        exit;
    }

    $connection = new \TT\Infrastructure\Persistence\PDO\Connection\DatabaseConnection($configuration);
    $started = microtime(true);
    try {
        $pdo = $connection->get();
        $elapsedMs = round((microtime(true) - $started) * 1000, 2);
        $serverVersion = $pdo->getAttribute(PDO::ATTR_SERVER_VERSION);
        addCheck($checks, 'database_connection', 'ok', 'MariaDB/MySQL connection established.', [
            'latency_ms' => $elapsedMs,
            'server_version' => is_scalar($serverVersion) ? (string) $serverVersion : 'available',
        ]);
    } catch (Throwable $dbError) {
        $elapsedMs = round((microtime(true) - $started) * 1000, 2);
        addCheck($checks, 'database_connection', 'error', 'Database connection failed. Credentials are not displayed.', [
            'latency_ms' => $elapsedMs,
            'error_type' => $dbError::class,
        ]);
        $overallStatus = 'error';
    }

    http_response_code($overallStatus === 'ok' ? 200 : 503);
    echo json_encode([
        'test' => $testId,
        'status' => $overallStatus,
        'message' => $overallStatus === 'ok'
            ? 'PHP, PDO, project bootstrap and MariaDB connection are operational.'
            : 'One or more diagnostic checks failed.',
        'checks' => $checks,
        'security' => 'No database password or database username is included in this response.',
        'timestamp_utc' => gmdate('c'),
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . "\n";
} catch (Throwable $error) {
    addCheck($checks, 'bootstrap_exception', 'error', 'Project bootstrap raised an exception.', [
        'error_type' => $error::class,
    ]);
    errorResponse($testId, $checks, 'T002 caught a bootstrap exception.', $error);
}
