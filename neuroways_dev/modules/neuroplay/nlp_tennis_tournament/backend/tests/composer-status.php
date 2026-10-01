<?php

declare(strict_types=1);

$backendRoot = dirname(__DIR__);
$composerJson = $backendRoot . '/composer.json';
$composerLock = $backendRoot . '/composer.lock';
$vendorAutoload = $backendRoot . '/vendor/autoload.php';

header('Content-Type: application/json; charset=utf-8');

$checks = [
    'composer_json' => is_readable($composerJson),
    'composer_lock' => is_readable($composerLock),
    'vendor_autoload' => is_readable($vendorAutoload),
];

if (!$checks['composer_json']) {
    $status = 'error';
    $message = 'composer.json is missing or unreadable.';
} elseif ($checks['composer_lock'] && $checks['vendor_autoload']) {
    $status = 'ok';
    $message = 'Composer installation is present and reproducible.';
} else {
    $status = 'pending';
    $message = 'Composer foundation is installed, but composer.lock and/or vendor/autoload.php are not present yet.';
}

echo json_encode([
    'test' => 'TT-DEV-0002-C003-R001',
    'status' => $status,
    'message' => $message,
    'checks' => $checks,
    'php_version' => PHP_VERSION,
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;
