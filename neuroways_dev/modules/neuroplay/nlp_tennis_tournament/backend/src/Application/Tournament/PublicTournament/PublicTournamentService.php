<?php

declare(strict_types=1);

namespace TT\Application\PublicTournament;

use TT\Domain\Tournament\PublicTournamentRepository;

final class PublicTournamentService
{
    public function __construct(private readonly PublicTournamentRepository $repository)
    {
    }

    public function getCurrent(): ?array
    {
        $record = $this->repository->findCurrentPublicTournament();
        return $record === null ? null : PublicTournamentViewModel::fromRecord($record);
    }
}
