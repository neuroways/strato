<?php
declare(strict_types=1);

$path = __DIR__ . '/db-connection-diagnostic.php';
$failures = [];

if (!is_file($path)) {
    $failures[] = 'Diagnostic file missing';
}

$content = is_file($path) ? (string) file_get_contents($path) : '';
foreach (['sqlstate', 'driver_code', 'category', 'No host, database name, username, password'] as $marker) {
    if (!str_contains($content, $marker)) {
        $failures[] = 'Missing marker: ' . $marker;
    }
}

echo json_encode([
    'test' => 'TT-DEV-0002-C004-R005',
    'status' => $failures === [] ? 'ok' : 'error',
    'failures' => $failures,
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;

exit($failures === [] ? 0 : 1);
