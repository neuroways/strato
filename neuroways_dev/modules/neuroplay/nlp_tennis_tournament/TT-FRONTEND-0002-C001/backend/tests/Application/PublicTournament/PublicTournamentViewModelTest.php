<?php

declare(strict_types=1);

use TT\Application\PublicTournament\PublicTournamentViewModel;
use TT\Domain\Tournament\PublicTournamentRecord;

return static function (): void {
    $record = new PublicTournamentRecord(1, 'Testturnier', '2026-09-05', 'Neindorf', 'REGISTRATION');
    $viewModel = PublicTournamentViewModel::fromRecord($record);
    if (($viewModel['publicState']['label'] ?? null) !== 'Anmeldung geöffnet') {
        throw new RuntimeException('Public state mapping failed.');
    }
    if (($viewModel['primaryAction']['type'] ?? null) !== 'REGISTRATION') {
        throw new RuntimeException('Primary action mapping failed.');
    }
};
