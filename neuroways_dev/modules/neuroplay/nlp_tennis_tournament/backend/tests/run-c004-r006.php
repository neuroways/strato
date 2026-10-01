<?php

declare(strict_types=1);

$path = __DIR__ . '/pdo-2002-transport-diagnostic.php';
$failures = [];

if (!is_file($path)) {
    $failures[] = 'Diagnostic file missing';
}

$content = is_file($path) ? (string) file_get_contents($path) : '';

foreach ([
    'connection_refused',
    'connection_timed_out',
    'operation_timed_out',
    'no_such_file_or_directory',
    'name_or_service_not_known',
    'getaddrinfo_failed',
    'network_unreachable',
    'access_denied',
    'unknown_database',
    'mysql_transport_2002_unclassified',
    'No host, database name, username, password, DSN or raw exception text'
] as $marker) {
    if (!str_contains($content, $marker)) {
        $failures[] = 'Missing diagnostic marker: ' . $marker;
    }
}

echo json_encode([
    'test' => 'TT-DEV-0002-C004-R006',
    'status' => $failures === [] ? 'ok' : 'error',
    'failures' => $failures,
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;

exit($failures === [] ? 0 : 1);
