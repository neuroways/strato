<?php

declare(strict_types=1);

namespace TT\Application\PublicTournament;

use TT\Domain\Tournament\PublicTournamentRecord;

final class PublicTournamentViewModel
{
    public static function fromRecord(PublicTournamentRecord $record): array
    {
        return [
            'name' => $record->name,
            'eventDate' => $record->eventDate,
            'location' => ['name' => $record->locationName],
            'publicState' => self::publicState($record->status),
            'primaryAction' => self::primaryAction($record->status),
        ];
    }

    private static function publicState(string $status): array
    {
        return match ($status) {
            'DRAFT' => ['code' => 'DRAFT', 'label' => 'Turnier wird vorbereitet'],
            'REGISTRATION' => ['code' => 'REGISTRATION', 'label' => 'Anmeldung geöffnet'],
            'ACTIVE' => ['code' => 'ACTIVE', 'label' => 'Turnier läuft'],
            'COMPLETED' => ['code' => 'COMPLETED', 'label' => 'Turnier abgeschlossen'],
            default => ['code' => 'UNKNOWN', 'label' => 'Turnierstatus unbekannt'],
        };
    }

    private static function primaryAction(string $status): ?array
    {
        return match ($status) {
            'REGISTRATION' => ['type' => 'REGISTRATION', 'label' => 'Anmelden', 'target' => '/registration'],
            'ACTIVE' => ['type' => 'SCHEDULE', 'label' => 'Spielplan ansehen', 'target' => '/schedule'],
            'COMPLETED' => ['type' => 'RESULTS', 'label' => 'Ergebnisse ansehen', 'target' => '/results'],
            default => null,
        };
    }
}
