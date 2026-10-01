<?php
declare(strict_types=1);

namespace NeuroWays\NeuroBalance\Kartenraum\Domain;

interface CardRepository
{
    /** @return Card[] */
    public function activeCardsForDeck(string $deckId): array;

    public function find(string $cardId): ?Card;
}
