<?php

declare(strict_types=1);

require dirname(__DIR__) . '/bootstrap.php';

use TT\Infrastructure\Config\SharedConfig;

header('Content-Type: application/json; charset=utf-8');

$projectRoot = dirname(__DIR__, 2);
$dir = SharedConfig::directory($projectRoot);

echo json_encode([
    'test' => 'TT-DEV-0002-C004-R001',
    'status' => $dir !== null ? 'ok' : 'pending',
    'shared_config_detected' => $dir !== null,
    'database_config_present' => $dir !== null && is_readable($dir . '/database.php'),
    'message' => $dir !== null
        ? 'Shared config root detected.'
        : 'Shared config root not detected; local .env fallback remains available.',
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;
