<?php
declare(strict_types=1);

use NeuroWays\NeuroBalance\Kartenraum\Application\CardService;
use NeuroWays\NeuroBalance\Kartenraum\Infrastructure\Db;
use NeuroWays\NeuroBalance\Kartenraum\Infrastructure\MariaDbCardRepository;

spl_autoload_register(function (string $class): void {
    $prefix = 'NeuroWays\\NeuroBalance\\Kartenraum\\';
    if (!str_starts_with($class, $prefix)) {
        return;
    }

    $relative = substr($class, strlen($prefix));
    $parts = explode('\\', $relative);
    $layer = strtolower(array_shift($parts));
    $path = __DIR__ . '/../backend/' . $layer . '/' . implode('/', $parts) . '.php';

    if (is_file($path)) {
        require_once $path;
    }
});

$configPath = __DIR__ . '/../config/config.local.php';
if (!is_file($configPath)) {
    http_response_code(503);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'status' => 'error',
        'error' => 'CONFIG_MISSING',
        'message' => 'config/config.local.php fehlt.',
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$config = require $configPath;
$pdo = Db::connect($config);
$repo = new MariaDbCardRepository($pdo);
$service = new CardService($repo);

function json_response(array $payload, int $status = 200): never {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    exit;
}
