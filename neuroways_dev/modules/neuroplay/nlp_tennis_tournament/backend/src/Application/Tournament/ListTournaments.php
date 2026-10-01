<?php

declare(strict_types=1);

namespace TT\Application\Tournament;

use TT\Domain\Tournament\Repository\TournamentReadRepository;

final class ListTournaments
{
    public function __construct(
        private readonly TournamentReadRepository $repository,
    ) {
    }

    /** @return array{data: list<array<string, mixed>>, count: int} */
    public function execute(): array
    {
        $tournaments = $this->repository->findAll();

        return [
            'data' => $tournaments,
            'count' => count($tournaments),
        ];
    }
}
