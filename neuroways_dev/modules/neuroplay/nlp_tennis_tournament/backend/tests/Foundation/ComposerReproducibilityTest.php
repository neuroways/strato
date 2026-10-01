<?php

declare(strict_types=1);

$backendRoot = dirname(__DIR__, 2);
$projectRoot = dirname($backendRoot);
$failures = [];

$composerPath = $backendRoot . '/composer.json';
if (!is_file($composerPath)) {
    $failures[] = 'composer.json missing';
} else {
    $composer = json_decode((string) file_get_contents($composerPath), true);
    if (!is_array($composer)) {
        $failures[] = 'composer.json invalid JSON';
    } else {
        if (($composer['autoload']['psr-4']['TT\\'] ?? null) !== 'src/') {
            $failures[] = 'TT PSR-4 mapping must be src/';
        }
        if (($composer['require']['php'] ?? null) !== '^8.2') {
            $failures[] = 'PHP requirement must be ^8.2';
        }
        if (($composer['scripts']['test:foundation'] ?? null) !== 'php tests/run-c003.php') {
            $failures[] = 'test:foundation script missing';
        }
    }
}

if (!is_file($projectRoot . '/.gitignore')) {
    $failures[] = '.gitignore missing';
} else {
    $gitignore = (string) file_get_contents($projectRoot . '/.gitignore');
    if (!preg_match('/^\\.env$/m', $gitignore)) {
        $failures[] = '.env is not ignored';
    }
    if (strpos($gitignore, '!.env.example') === false) {
        $failures[] = '.env.example exception missing';
    }
}

if (!is_file($projectRoot . '/.env.example')) {
    $failures[] = '.env.example missing';
}

echo json_encode([
    'test' => 'TT-DEV-0002-C003-R001',
    'status' => $failures === [] ? 'ok' : 'error',
    'failures' => $failures,
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;

exit($failures === [] ? 0 : 1);
