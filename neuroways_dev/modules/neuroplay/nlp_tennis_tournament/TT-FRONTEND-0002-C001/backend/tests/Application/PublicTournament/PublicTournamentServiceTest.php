<?php

declare(strict_types=1);

use TT\Application\PublicTournament\PublicTournamentService;
use TT\Domain\Tournament\PublicTournamentRecord;
use TT\Domain\Tournament\PublicTournamentRepository;

return static function (): void {
    $repository = new class implements PublicTournamentRepository {
        public function findCurrentPublicTournament(): ?PublicTournamentRecord
        {
            return new PublicTournamentRecord(1, 'Testturnier', '2026-09-05', 'Neindorf', 'ACTIVE');
        }
    };
    $result = (new PublicTournamentService($repository))->getCurrent();
    if (($result['publicState']['code'] ?? null) !== 'ACTIVE') {
        throw new RuntimeException('Service did not return ACTIVE public state.');
    }
};
