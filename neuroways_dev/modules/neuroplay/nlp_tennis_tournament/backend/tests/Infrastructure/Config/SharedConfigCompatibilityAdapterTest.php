<?php

declare(strict_types=1);

$failures = [];
$configPath = dirname(__DIR__, 3) . '/config/database.php';

if (!is_file($configPath)) {
    $failures[] = 'database.php missing';
} else {
    $content = (string) file_get_contents($configPath);

    $requiredMarkers = [
        "'database' => [",
        "'host' =>",
        "'name' =>",
        "'username' =>",
        "'password' =>",
        "'charset' =>",
    ];

    foreach ($requiredMarkers as $marker) {
        if (strpos($content, $marker) === false) {
            $failures[] = 'Required compatibility marker missing: ' . $marker;
        }
    }
}

echo json_encode([
    'test' => 'TT-DEV-0002-C004-R004',
    'status' => $failures === [] ? 'ok' : 'error',
    'compatibility_shape' => 'database.*',
    'failures' => $failures,
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;

exit($failures === [] ? 0 : 1);
