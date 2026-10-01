<?php

declare(strict_types=1);

namespace TT\Domain\Tournament\Repository;

interface TournamentReadRepository
{
    /** @return list<array<string, mixed>> */
    public function findAll(): array;
}
