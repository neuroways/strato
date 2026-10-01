<?php

declare(strict_types=1);

use TT\Infrastructure\Config\Configuration;
use TT\Infrastructure\Config\Env;
use TT\Infrastructure\Health\DatabaseHealthCheck;
use TT\Infrastructure\Persistence\PDO\Connection\DatabaseConnection;

$projectRoot = dirname(__DIR__);

require_once $projectRoot . '/backend/src/Infrastructure/Config/Env.php';
require_once $projectRoot . '/backend/src/Infrastructure/Config/Configuration.php';
require_once $projectRoot . '/backend/src/Infrastructure/Persistence/PDO/Connection/DatabaseConnection.php';
require_once $projectRoot . '/backend/src/Infrastructure/Health/DatabaseHealthCheck.php';

Env::load($projectRoot . '/.env');

$configuration = Configuration::fromFile($projectRoot . '/backend/config/database.php');
$connection = new DatabaseConnection($configuration);
$healthCheck = new DatabaseHealthCheck($connection);
$result = $healthCheck->check();

$output = [
    'test' => 'TT-DEV-0001-C003-T001',
    'status' => $result['status'],
    'database' => $result['database'],
    'latency_ms' => $result['latency_ms'],
    'message' => $result['message'],
    'pdo_mysql_loaded' => extension_loaded('pdo_mysql'),
    'php_version' => PHP_VERSION,
];

echo json_encode($output, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . PHP_EOL;
exit($result['status'] === 'ok' ? 0 : 1);
