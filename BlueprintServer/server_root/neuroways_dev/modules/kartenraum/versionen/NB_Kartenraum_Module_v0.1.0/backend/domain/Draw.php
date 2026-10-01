<?php
declare(strict_types=1);

namespace NeuroWays\NeuroBalance\Kartenraum\Domain;

final class Draw
{
    public function __construct(
        public readonly string $id,
        public readonly string $scopeId,
        public readonly string $cardId,
        public readonly string $drawDate,
        public readonly string $createdAt,
        public readonly ?string $selfPerception = null,
    ) {}
}
