<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap/app.php';

use NeuroWays\Api\Utils\Response;

try {
    $router = require __DIR__ . '/routes/api.php';
    $router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);
} catch (Throwable $exception) {
    Response::json([
        'success' => false,
        'error' => 'Interner Serverfehler.',
    ], 500);
}