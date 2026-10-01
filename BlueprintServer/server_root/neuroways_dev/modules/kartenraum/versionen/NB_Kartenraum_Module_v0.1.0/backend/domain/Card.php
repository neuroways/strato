<?php
declare(strict_types=1);

namespace NeuroWays\NeuroBalance\Kartenraum\Domain;

final class Card
{
    public function __construct(
        public readonly string $id,
        public readonly string $deckId,
        public readonly string $title,
        public readonly string $shortText,
        public readonly ?string $imageRef = null,
    ) {
        if ($id === '' || $deckId === '' || $title === '') {
            throw new \InvalidArgumentException('Card identity fields must not be empty.');
        }
    }
}
