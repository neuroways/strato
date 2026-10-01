<?php

declare(strict_types=1);

require dirname(__DIR__) . '/bootstrap.php';

header('Content-Type: application/json; charset=utf-8');

$config = require dirname(__DIR__) . '/config/database.php';
$db = $config['database'] ?? [];

$result = [
    'test' => 'TT-DEV-0002-C004-R005',
    'status' => 'error',
    'connection' => $db['connection'] ?? null,
    'source' => $db['source'] ?? null,
    'checks' => [
        'host_present' => !empty($db['host']),
        'port_present' => !empty($db['port']),
        'database_present' => !empty($db['name']),
        'username_present' => !empty($db['username']),
        'password_present' => array_key_exists('password', $db) && $db['password'] !== '',
        'charset_present' => !empty($db['charset']),
    ],
    'pdo' => [
        'attempted' => false,
        'sqlstate' => null,
        'driver_code' => null,
        'category' => null,
    ],
    'security' => 'No host, database name, username, password or secret value is returned.',
];

try {
    $dsn = sprintf(
        'mysql:host=%s;port=%d;dbname=%s;charset=%s',
        (string) ($db['host'] ?? ''),
        (int) ($db['port'] ?? 3306),
        (string) ($db['name'] ?? ''),
        (string) ($db['charset'] ?? 'utf8mb4')
    );

    $result['pdo']['attempted'] = true;

    $pdo = new PDO(
        $dsn,
        (string) ($db['username'] ?? ''),
        (string) ($db['password'] ?? ''),
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_TIMEOUT => (int) ($db['timeout'] ?? 5),
        ]
    );

    $pdo->query('SELECT 1')->fetchColumn();

    $result['status'] = 'ok';
    $result['pdo']['category'] = 'connected';
} catch (PDOException $e) {
    $info = $e->errorInfo ?? null;
    $sqlstate = is_array($info) ? ($info[0] ?? null) : $e->getCode();
    $driverCode = is_array($info) ? ($info[1] ?? null) : null;

    $result['pdo']['sqlstate'] = is_string($sqlstate) ? $sqlstate : (string) $sqlstate;
    $result['pdo']['driver_code'] = is_int($driverCode) || is_string($driverCode) ? $driverCode : null;

    $message = strtolower($e->getMessage());

    if (str_contains($message, 'access denied')) {
        $result['pdo']['category'] = 'authentication_or_grant';
    } elseif (str_contains($message, 'unknown database')) {
        $result['pdo']['category'] = 'unknown_database';
    } elseif (str_contains($message, 'getaddrinfo') || str_contains($message, 'name or service not known')) {
        $result['pdo']['category'] = 'host_resolution';
    } elseif (str_contains($message, 'timed out') || str_contains($message, 'timeout')) {
        $result['pdo']['category'] = 'network_timeout';
    } elseif (str_contains($message, 'connection refused')) {
        $result['pdo']['category'] = 'connection_refused';
    } else {
        $result['pdo']['category'] = 'pdo_error';
    }
}

echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;
