<?php
declare(strict_types=1);

namespace NeuroWays\NeuroBalance\Kartenraum\Domain;

interface DrawRepository
{
    public function findDailyDraw(string $scopeId, string $date): ?Draw;

    public function save(Draw $draw): void;
}
