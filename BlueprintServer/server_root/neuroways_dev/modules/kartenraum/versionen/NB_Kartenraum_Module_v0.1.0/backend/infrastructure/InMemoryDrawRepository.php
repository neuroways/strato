<?php
declare(strict_types=1);

namespace NeuroWays\NeuroBalance\Kartenraum\Infrastructure;

use NeuroWays\NeuroBalance\Kartenraum\Domain\Draw;
use NeuroWays\NeuroBalance\Kartenraum\Domain\DrawRepository;

final class InMemoryDrawRepository implements DrawRepository
{
    /** @var array<string,Draw> */
    private array $items = [];

    public function findDailyDraw(string $scopeId, string $date): ?Draw
    {
        return $this->items[$scopeId . '|' . $date] ?? null;
    }

    public function save(Draw $draw): void
    {
        $this->items[$draw->scopeId . '|' . $draw->drawDate] = $draw;
    }
}
