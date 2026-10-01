<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

try {
    $cards = $service->cards();
    $adult = 0;
    $child = 0;

    foreach ($cards as $card) {
        if ($service->text($card['card_id'], 'ADULT', 'de') !== null) $adult++;
        if ($service->text($card['card_id'], 'CHILD', 'de') !== null) $child++;
    }

    json_response([
        'status' => ($adult === 78 && $child === 78 && count($cards) === 78) ? 'ok' : 'warning',
        'module' => 'nb_kartenraum',
        'backend_version' => '0.3.2',
        'php' => PHP_VERSION,
        'cards' => count($cards),
        'adult_de' => $adult,
        'child_de' => $child,
        'expected' => [
            'cards' => 78,
            'adult_de' => 78,
            'child_de' => 78,
        ],
        'timestamp' => gmdate('c'),
    ]);
} catch (Throwable $e) {
    json_response([
        'status' => 'error',
        'error' => 'BACKEND_HEALTH_FAILED',
        'message' => $e->getMessage(),
    ], 500);
}
