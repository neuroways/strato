<?php

declare(strict_types=1);

use NeuroWays\Application\GetAppInfo;
use NeuroWays\Infrastructure\DatabaseConnection;
use NeuroWays\Repository\MariaDbAppInfoRepository;

require dirname(__DIR__) . '/backend/src/autoload.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

$path = '/' . trim((string) ($_SERVER['PATH_INFO'] ?? ''), '/');
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method !== 'GET' || $path !== '/app-info') {
    http_response_code(404);
    echo json_encode(['error' => 'Not Found'], JSON_UNESCAPED_UNICODE);
    exit;
}

try {
    $configFile = dirname(__DIR__) . '/backend/config/database.php';
    if (!is_file($configFile)) {
        throw new RuntimeException('Datenbankkonfiguration fehlt.');
    }

    $connection = DatabaseConnection::create(require $configFile);
    $useCase = new GetAppInfo(new MariaDbAppInfoRepository($connection));

    echo json_encode($useCase->execute()->toArray(), JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
} catch (Throwable $exception) {
    error_log($exception->getMessage());
    http_response_code(503);
    echo json_encode(
        ['error' => 'Der Anwendungsstatus ist momentan nicht verfügbar.'],
        JSON_UNESCAPED_UNICODE,
    );
}
