<?php

declare(strict_types=1);

namespace TT\Domain\Tournament;

interface PublicTournamentRepository
{
    public function findCurrentPublicTournament(): ?PublicTournamentRecord;
}
