<?php

declare(strict_types=1);

use TT\Infrastructure\Config\SharedConfig;

$failures = [];
$projectRoot = dirname(__DIR__, 3);

if (!class_exists(SharedConfig::class)) {
    $failures[] = 'SharedConfig class missing';
}

$explicit = getenv('NW_SHARED_CONFIG_DIR');
putenv('NW_SHARED_CONFIG_DIR=' . __DIR__);
$resolved = SharedConfig::directory($projectRoot);
if ($resolved !== __DIR__) {
    $failures[] = 'Explicit shared config directory was not resolved';
}

putenv('NW_SHARED_CONFIG_DIR=' . ($explicit === false ? '' : $explicit));

echo json_encode([
    'test' => 'TT-DEV-0002-C004-R001',
    'status' => $failures === [] ? 'ok' : 'error',
    'failures' => $failures,
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;

exit($failures === [] ? 0 : 1);
