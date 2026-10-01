<?php

declare(strict_types=1);

use TT\Application\Application;
use TT\Infrastructure\Http\JsonResponse;

try {
    /** @var Application $application */
    $application = require dirname(__DIR__) . '/bootstrap.php';

    $withDatabase = ($_GET['db'] ?? '1') !== '0';
    $payload = $application->status($withDatabase);
    $httpStatus = ($payload['status'] ?? 'error') === 'ok' ? 200 : 503;

    JsonResponse::send($payload, $httpStatus);
} catch (Throwable $exception) {
    JsonResponse::send([
        'status' => 'error',
        'message' => 'Backend bootstrap failed.',
        'timestamp_utc' => gmdate(DATE_ATOM),
    ], 500);
}
