<?php

declare(strict_types=1);

namespace TT\Infrastructure\Persistence\PDO\Tournament;

use PDO;
use TT\Domain\Tournament\PublicTournamentRecord;
use TT\Domain\Tournament\PublicTournamentRepository;

final class PdoPublicTournamentRepository implements PublicTournamentRepository
{
    public function __construct(private readonly PDO $pdo)
    {
    }

    public function findCurrentPublicTournament(): ?PublicTournamentRecord
    {
        $sql = <<<'SQL'
SELECT
    t.TOURNAMENT_ID,
    t.NAME,
    t.EVENT_DATE,
    t.STATUS,
    l.NAME AS LOCATION_NAME
FROM TT_TOURNAMENT t
LEFT JOIN TT_LOCATION l ON l.LOCATION_ID = t.LOCATION_ID
ORDER BY
    CASE
        WHEN t.STATUS = 'REGISTRATION' THEN 1
        WHEN t.STATUS = 'ACTIVE' THEN 2
        WHEN t.STATUS = 'DRAFT' THEN 3
        WHEN t.STATUS = 'COMPLETED' THEN 4
        ELSE 5
    END,
    t.EVENT_DATE ASC,
    t.TOURNAMENT_ID ASC
LIMIT 1
SQL;

        $statement = $this->pdo->query($sql);
        $row = $statement->fetch(PDO::FETCH_ASSOC);
        if (!is_array($row)) {
            return null;
        }

        return new PublicTournamentRecord(
            id: (int) $row['TOURNAMENT_ID'],
            name: (string) $row['NAME'],
            eventDate: (string) $row['EVENT_DATE'],
            locationName: isset($row['LOCATION_NAME']) ? (string) $row['LOCATION_NAME'] : null,
            status: (string) $row['STATUS'],
        );
    }
}
