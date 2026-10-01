<?php
declare(strict_types=1);

namespace NeuroWays\NeuroBalance\Kartenraum\Domain;

interface CardRepository
{
    public function allCards(): array;
    public function findCard(string $cardId): ?array;
    public function findText(string $cardId, string $audience, string $language): ?array;
}
