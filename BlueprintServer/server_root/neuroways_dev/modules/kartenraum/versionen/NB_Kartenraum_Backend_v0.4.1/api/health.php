<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

try {
    $cards = $service->cards();
    $adult = 0;
    $child = 0;
    $knowledgeAdult = 0;
    $knowledgeChild = 0;

    foreach ($cards as $card) {
        if ($service->text($card['card_id'], 'ADULT', 'de') !== null) $adult++;
        if ($service->text($card['card_id'], 'CHILD', 'de') !== null) $child++;
        if ($service->knowledge($card['card_id'], 'ADULT', 'de') !== null) $knowledgeAdult++;
        if ($service->knowledge($card['card_id'], 'CHILD', 'de') !== null) $knowledgeChild++;
    }

    json_response([
        'status' => ($adult === 78 && $child === 78 && $knowledgeAdult === 78 && $knowledgeChild === 78 && count($cards) === 78) ? 'ok' : 'warning',
        'module' => 'nb_kartenraum',
        'backend_version' => '0.4.1',
        'php' => PHP_VERSION,
        'database_config' => '/config/database.php',
        'connection_key' => 'platform',
        'cards' => count($cards),
        'adult_de' => $adult,
        'child_de' => $child,
        'knowledge_adult_de' => $knowledgeAdult,
        'knowledge_child_de' => $knowledgeChild,
        'expected' => [
            'cards' => 78,
            'adult_de' => 78,
            'child_de' => 78,
            'knowledge_adult_de' => 78,
            'knowledge_child_de' => 78,
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
