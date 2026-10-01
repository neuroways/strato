<?php

declare(strict_types=1);

use TT\Application\Application;
use TT\Infrastructure\Config\Configuration;
use TT\Infrastructure\Config\Env;
use TT\Infrastructure\Health\DatabaseHealthCheck;
use TT\Infrastructure\Persistence\PDO\Connection\DatabaseConnection;

$backendRoot = __DIR__;
$projectRoot = dirname($backendRoot);
$serverRoot = dirname($backendRoot, 5);

spl_autoload_register(static function (string $class) use ($backendRoot): void {
    $prefix = 'TT\\';

    if (!str_starts_with($class, $prefix)) {
        return;
    }

    $relativeClass = substr($class, strlen($prefix));
    $file = $backendRoot
        . '/src/'
        . str_replace('\\', '/', $relativeClass)
        . '.php';

    if (is_file($file)) {
        require_once $file;
    }
});

Env::load($projectRoot . '/.env');

$allDatabaseConfigurations = require $serverRoot . '/config/database.php';

if (!is_array($allDatabaseConfigurations)) {
    throw new RuntimeException(
        'Central database configuration must return an array.'
    );
}

if (
    !isset($allDatabaseConfigurations['platform'])
    || !is_array($allDatabaseConfigurations['platform'])
) {
    throw new RuntimeException(
        'Database configuration "platform" is missing.'
    );
}

$platform = $allDatabaseConfigurations['platform'];

$databaseConfiguration = new Configuration([
    'database' => [
        'driver' => $platform['driver'] ?? 'mysql',
        'host' => $platform['host'] ?? '',
        'port' => $platform['port'] ?? 3306,
        'name' => $platform['database'] ?? '',
        'username' => $platform['username'] ?? '',
        'password' => $platform['password'] ?? '',
        'charset' => $platform['charset'] ?? 'utf8mb4',
    ],
]);

$databaseConnection = new DatabaseConnection($databaseConfiguration);
$databaseHealthCheck = new DatabaseHealthCheck($databaseConnection);

return new Application(
    appName: Env::get('APP_NAME', 'Tennisturnier Neindorf'),
    environment: Env::get('APP_ENV', 'development'),
    version: Env::get('APP_VERSION', '0.0.1-dev'),
    databaseHealthCheck: $databaseHealthCheck,
);
