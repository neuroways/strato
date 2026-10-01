<?php

declare(strict_types=1);

use TT\Application\PublicTournament\PublicTournamentViewModel;
use TT\Domain\Tournament\PublicTournamentRecord;

return static function (): void {
    $record = new PublicTournamentRecord(
        id: 1,
        name: 'Tennisturnier Neindorf — Ein Tag für alle!',
        eventDate: '2026-09-05',
        locationName: 'Neindorf',
        status: 'DRAFT',
    );

    $model = PublicTournamentViewModel::fromRecord($record);

    if (($model['publicState']['label'] ?? null) !== 'Turnier wird vorbereitet') {
        throw new RuntimeException('DRAFT public label mismatch.');
    }

    if (($model['primaryAction'] ?? null) !== null) {
        throw new RuntimeException('DRAFT must not expose a primary action.');
    }
};
