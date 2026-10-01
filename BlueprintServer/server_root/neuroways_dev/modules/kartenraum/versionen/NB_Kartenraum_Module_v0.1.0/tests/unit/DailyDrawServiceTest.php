<?php
declare(strict_types=1);

require_once __DIR__ . '/../../backend/domain/Card.php';
require_once __DIR__ . '/../../backend/domain/Draw.php';
require_once __DIR__ . '/../../backend/domain/CardRepository.php';
require_once __DIR__ . '/../../backend/domain/DrawRepository.php';
require_once __DIR__ . '/../../backend/domain/DailyDrawService.php';
require_once __DIR__ . '/../../backend/infrastructure/DevFixtureCardRepository.php';
require_once __DIR__ . '/../../backend/infrastructure/InMemoryDrawRepository.php';

use NeuroWays\NeuroBalance\Kartenraum\Domain\DailyDrawService;
use NeuroWays\NeuroBalance\Kartenraum\Infrastructure\DevFixtureCardRepository;
use NeuroWays\NeuroBalance\Kartenraum\Infrastructure\InMemoryDrawRepository;

$cards = new DevFixtureCardRepository(__DIR__ . '/../../database/seeds/cards.dev.json');
$draws = new InMemoryDrawRepository();
$service = new DailyDrawService();

$first = $service->draw('scope-1', 'dev_neurobalance', '2026-08-20', $cards, $draws, fn(int $count) => 1);
$second = $service->draw('scope-1', 'dev_neurobalance', '2026-08-20', $cards, $draws, fn(int $count) => 2);

if ($first->cardId !== 'dev_card_02') {
    fwrite(STDERR, "FAIL: expected dev_card_02\n");
    exit(1);
}
if ($second->id !== $first->id) {
    fwrite(STDERR, "FAIL: daily draw must remain stable for scope/date\n");
    exit(1);
}

echo "PASS DailyDrawServiceTest\n";
