<?php

declare(strict_types=1);

$backendRoot = dirname(__DIR__, 2);
$projectRoot = dirname($backendRoot);
$failures = [];

$composerJson = $backendRoot . '/composer.json';
$composerLock = $backendRoot . '/composer.lock';
$vendorAutoload = $backendRoot . '/vendor/autoload.php';

if (!is_file($composerJson)) {
    $failures[] = 'composer.json missing';
}

if (!is_file($composerLock)) {
    $failures[] = 'composer.lock missing';
}

if (!is_file($vendorAutoload)) {
    $failures[] = 'vendor/autoload.php missing';
} else {
    require_once $vendorAutoload;

    $requiredClasses = [
        'TT\\Application\\Application',
        'TT\\Infrastructure\\Config\\Env',
        'TT\\Infrastructure\\Config\\Configuration',
        'TT\\Infrastructure\\Health\\DatabaseHealthCheck',
        'TT\\Infrastructure\\Persistence\\PDO\\Connection\\DatabaseConnection',
    ];

    foreach ($requiredClasses as $class) {
        if (!class_exists($class)) {
            $failures[] = "Composer autoload failed for {$class}";
        }
    }
}

echo json_encode([
    'test' => 'TT-DEV-0002-C004',
    'status' => $failures === [] ? 'ok' : 'error',
    'composer_lock' => is_file($composerLock),
    'vendor_autoload' => is_file($vendorAutoload),
    'failures' => $failures,
    'php_version' => PHP_VERSION,
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;

exit($failures === [] ? 0 : 1);
