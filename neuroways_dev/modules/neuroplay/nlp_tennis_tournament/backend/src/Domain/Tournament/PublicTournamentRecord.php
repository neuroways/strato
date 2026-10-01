<?php

declare(strict_types=1);

namespace TT\Domain\Tournament;

final class PublicTournamentRecord
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly string $eventDate,
        public readonly ?string $locationName,
        public readonly string $status,
    ) {
    }
}
