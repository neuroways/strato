<?php

declare(strict_types=1);

use TT\Infrastructure\Config\Configuration;
use TT\Infrastructure\Config\Env;
use TT\Infrastructure\Health\DatabaseHealthCheck;
use TT\Infrastructure\Persistence\PDO\Connection\DatabaseConnection;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');

$projectRoot = dirname(__DIR__);

require_once $projectRoot . '/backend/src/Infrastructure/Config/Env.php';
require_once $projectRoot . '/backend/src/Infrastructure/Config/Configuration.php';
require_once $projectRoot . '/backend/src/Infrastructure/Persistence/PDO/Connection/DatabaseConnection.php';
require_once $projectRoot . '/backend/src/Infrastructure/Health/DatabaseHealthCheck.php';

try {
    Env::load($projectRoot . '/.env');

    $configuration = Configuration::fromFile($projectRoot . '/backend/config/database.php');
    $connection = new DatabaseConnection($configuration);
    $healthCheck = new DatabaseHealthCheck($connection);
    $result = $healthCheck->check();

    $response = [
        'test' => 'TT-DEV-0001-C003-T001',
        'status' => $result['status'],
        'database' => $result['database'],
        'latency_ms' => $result['latency_ms'],
        'message' => $result['message'],
        'environment' => Env::get('APP_ENV', 'unknown'),
        'pdo_mysql_loaded' => extension_loaded('pdo_mysql'),
        'php_version' => PHP_VERSION,
        'timestamp_utc' => gmdate('c'),
    ];

    if ($result['status'] === 'ok') {
        try {
            $pdo = $connection->get();
            $serverVersion = $pdo->getAttribute(PDO::ATTR_SERVER_VERSION);
            $response['server_version'] = is_string($serverVersion) ? $serverVersion : (string) $serverVersion;
        } catch (Throwable) {
            // Health status remains authoritative; optional metadata failure must not expose internals.
        }
    }

    http_response_code($result['status'] === 'ok' ? 200 : 503);
    echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . "\n";
} catch (Throwable $exception) {
    http_response_code(500);
    echo json_encode([
        'test' => 'TT-DEV-0001-C003-T001',
        'status' => 'error',
        'database' => 'mariadb',
        'message' => 'Integration test bootstrap failed.',
        'detail' => Env::get('APP_DEBUG', 'false') === 'true' ? $exception->getMessage() : null,
        'pdo_mysql_loaded' => extension_loaded('pdo_mysql'),
        'php_version' => PHP_VERSION,
        'timestamp_utc' => gmdate('c'),
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . "\n";
}
