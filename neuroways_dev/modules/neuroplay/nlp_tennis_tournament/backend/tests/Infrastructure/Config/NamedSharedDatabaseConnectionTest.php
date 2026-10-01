<?php

declare(strict_types=1);

use TT\Infrastructure\Config\SharedConfig;

$failures = [];
$projectRoot = dirname(__DIR__, 3);

$tempDir = sys_get_temp_dir() . '/tt-r003-' . bin2hex(random_bytes(4));
mkdir($tempDir, 0700, true);

$config = <<<'PHP'
<?php
return [
    'platform' => [
        'driver' => 'mysql',
        'host' => 'example.invalid',
        'port' => 3306,
        'database' => 'db_example',
        'username' => 'user_example',
        'password' => 'secret_example',
        'charset' => 'utf8mb4',
    ],
    'knowledge' => [
        'driver' => 'mysql',
        'host' => 'example.invalid',
        'port' => 3306,
        'database' => 'knowledge_example',
        'username' => 'knowledge_user',
        'password' => 'secret_example',
        'charset' => 'utf8mb4',
    ],
];
PHP;

file_put_contents($tempDir . '/database.php', $config);
putenv('NW_SHARED_CONFIG_DIR=' . $tempDir);

$platform = SharedConfig::connection($projectRoot, 'platform');
$knowledge = SharedConfig::connection($projectRoot, 'knowledge');
$missing = SharedConfig::connection($projectRoot, 'missing');

if (!is_array($platform) || ($platform['database'] ?? null) !== 'db_example') {
    $failures[] = 'platform connection could not be resolved';
}
if (!is_array($knowledge) || ($knowledge['database'] ?? null) !== 'knowledge_example') {
    $failures[] = 'knowledge connection could not be resolved';
}
if ($missing !== null) {
    $failures[] = 'missing connection must resolve to null';
}

@unlink($tempDir . '/database.php');
@rmdir($tempDir);
putenv('NW_SHARED_CONFIG_DIR');

echo json_encode([
    'test' => 'TT-DEV-0002-C004-R003',
    'status' => $failures === [] ? 'ok' : 'error',
    'default_connection' => 'platform',
    'named_connection_support' => true,
    'failures' => $failures,
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;

exit($failures === [] ? 0 : 1);
