<?php

declare(strict_types=1);

require_once __DIR__ . '/Foundation/ComposerAutoloadIntegrationTest.php';

$backendRoot = dirname(__DIR__);
$failures = ComposerAutoloadIntegrationTest::run($backendRoot);

$result = [
    'test' => 'TT-DEV-0002-C002',
    'status' => $failures === [] ? 'ok' : 'error',
    'checks' => 1,
    'failures' => $failures,
];

echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;
exit($failures === [] ? 0 : 1);
