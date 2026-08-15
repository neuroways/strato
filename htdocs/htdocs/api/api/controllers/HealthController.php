<?php
declare(strict_types=1);

namespace NeuroWays\Api\Controllers;

use NeuroWays\Api\Utils\Response;

final class HealthController
{
    public function index(): void
    {
        Response::json([
            'success' => true,
            'service' => 'NeuroWays API',
            'status' => 'ok',
            'timestamp' => date(DATE_ATOM),
        ]);
    }
}
