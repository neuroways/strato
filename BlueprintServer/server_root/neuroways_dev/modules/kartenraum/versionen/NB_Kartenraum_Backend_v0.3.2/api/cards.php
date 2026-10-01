<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

json_response([
    'status' => 'ok',
    'count' => count($service->cards()),
    'cards' => $service->cards(),
]);
