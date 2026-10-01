<?php

declare(strict_types=1);

require dirname(__DIR__) . '/bootstrap.php';

header('Content-Type: application/json; charset=utf-8');

$config = require dirname(__DIR__) . '/config/database.php';
$db = $config['database'] ?? [];

$result = [
    'test' => 'TT-DEV-0002-C004-R006',
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
        'transport_category' => null,
        'transport_flags' => [
            'connection_refused' => false,
            'connection_timed_out' => false,
            'operation_timed_out' => false,
            'no_such_file_or_directory' => false,
            'name_or_service_not_known' => false,
            'getaddrinfo_failed' => false,
            'network_unreachable' => false,
            'access_denied' => false,
            'unknown_database' => false,
        ],
    ],
    'security' => 'No host, database name, username, password, DSN or raw exception text is returned.',
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
    $result['pdo']['transport_category'] = 'connected';
} catch (PDOException $e) {
    $info = $e->errorInfo ?? null;
    $sqlstate = is_array($info) ? ($info[0] ?? null) : $e->getCode();
    $driverCode = is_array($info) ? ($info[1] ?? null) : null;
    $message = strtolower($e->getMessage());

    $result['pdo']['sqlstate'] = is_scalar($sqlstate) ? (string) $sqlstate : null;
    $result['pdo']['driver_code'] = (is_int($driverCode) || is_string($driverCode)) ? $driverCode : null;

    $flags = [
        'connection_refused' => str_contains($message, 'connection refused'),
        'connection_timed_out' => str_contains($message, 'connection timed out'),
        'operation_timed_out' => str_contains($message, 'operation timed out') || str_contains($message, 'timed out'),
        'no_such_file_or_directory' => str_contains($message, 'no such file or directory'),
        'name_or_service_not_known' => str_contains($message, 'name or service not known'),
        'getaddrinfo_failed' => str_contains($message, 'getaddrinfo') || str_contains($message, 'php_network_getaddresses'),
        'network_unreachable' => str_contains($message, 'network is unreachable'),
        'access_denied' => str_contains($message, 'access denied'),
        'unknown_database' => str_contains($message, 'unknown database'),
    ];

    $result['pdo']['transport_flags'] = $flags;

    if ($flags['access_denied']) {
        $result['pdo']['transport_category'] = 'authentication_or_grant';
    } elseif ($flags['unknown_database']) {
        $result['pdo']['transport_category'] = 'unknown_database';
    } elseif ($flags['getaddrinfo_failed'] || $flags['name_or_service_not_known']) {
        $result['pdo']['transport_category'] = 'host_resolution';
    } elseif ($flags['connection_refused']) {
        $result['pdo']['transport_category'] = 'connection_refused';
    } elseif ($flags['network_unreachable']) {
        $result['pdo']['transport_category'] = 'network_unreachable';
    } elseif ($flags['connection_timed_out'] || $flags['operation_timed_out']) {
        $result['pdo']['transport_category'] = 'network_timeout';
    } elseif ($flags['no_such_file_or_directory']) {
        $result['pdo']['transport_category'] = 'socket_or_path';
    } elseif ((string) $result['pdo']['driver_code'] === '2002') {
        $result['pdo']['transport_category'] = 'mysql_transport_2002_unclassified';
    } else {
        $result['pdo']['transport_category'] = 'pdo_error_unclassified';
    }
}

echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;
