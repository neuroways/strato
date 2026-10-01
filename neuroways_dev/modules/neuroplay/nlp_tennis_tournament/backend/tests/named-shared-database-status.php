<?php

declare(strict_types=1);

require dirname(__DIR__) . '/bootstrap.php';

use TT\Infrastructure\Config\Env;
use TT\Infrastructure\Config\SharedConfig;

header('Content-Type: application/json; charset=utf-8');

$projectRoot = dirname(__DIR__, 2);
$connectionName = Env::get('DB_CONNECTION', 'platform');
$connection = SharedConfig::connection($projectRoot, $connectionName);

$checks = [
    'shared_config_detected' => SharedConfig::directory($projectRoot) !== null,
    'connection_profile_found' => is_array($connection),
    'host_present' => is_array($connection) && !empty($connection['host']),
    'database_present' => is_array($connection) && !empty($connection['database'] ?? $connection['name'] ?? null),
    'username_present' => is_array($connection) && !empty($connection['username'] ?? $connection['user'] ?? null),
    'password_present' => is_array($connection) && array_key_exists('password', $connection) && $connection['password'] !== '',
];

$ok = !in_array(false, $checks, true);

echo json_encode([
    'test' => 'TT-DEV-0002-C004-R003',
    'status' => $ok ? 'ok' : 'error',
    'connection' => $connectionName,
    'checks' => $checks,
    'security' => 'No database host, name, username, password or secret value is included in this response.',
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;
