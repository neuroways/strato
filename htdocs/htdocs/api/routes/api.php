<?php
declare(strict_types=1);

use NeuroWays\Api\Routes\Router;
use NeuroWays\Api\Controllers\HealthController;

$router = new Router();

$router->get('/api/health', [HealthController::class, 'index']);

return $router;
