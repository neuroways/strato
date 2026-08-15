<?php
declare(strict_types=1);

spl_autoload_register(static function (string $class): void {
    $prefix = 'NeuroWays\\';
    $baseDir = dirname(__DIR__, 2) . '/';

    if (!str_starts_with($class, $prefix)) {
        return;
    }

    $relativeClass = substr($class, strlen($prefix));
    $file = $baseDir . str_replace('\\', '/', $relativeClass) . '.php';

    if (is_file($file)) {
        require $file;
    }
});

$config = require dirname(__DIR__, 2) . '/config/config.php';

date_default_timezone_set($config['application']['timezone'] ?? 'Europe/Berlin');
