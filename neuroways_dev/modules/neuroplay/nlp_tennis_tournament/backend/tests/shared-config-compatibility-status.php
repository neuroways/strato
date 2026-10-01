<?php

declare(strict_types=1);

require dirname(__DIR__) . '/bootstrap.php';

header('Content-Type: application/json; charset=utf-8');

$config = require dirname(__DIR__) . '/config/database.php';
$db = $config['database'] ?? null;

$checks = [
    'database_section_present' => is_array($db),
    'host_present' => is_array($db) && !empty($db['host']),
    'database_name_present' => is_array($db) && !empty($db['name']),
    'username_present' => is_array($db) && !empty($db['username']),
    'password_present' => is_array($db) && array_key_exists('password', $db) && $db['password'] !== '',
    'charset_present' => is_array($db) && !empty($db['charset']),
    'shared_config_source' => is_array($db) && (($db['source'] ?? null) === 'shared_config'),
    'connection_is_platform' => is_array($db) && (($db['connection'] ?? null) === 'platform'),
];

$ok = !in_array(false, $checks, true);

echo json_encode([
    'test' => 'TT-DEV-0002-C004-R004',
    'status' => $ok ? 'ok' : 'error',
    'checks' => $checks,
    'security' => 'No database host, name, username, password or secret value is included in this response.',
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;
