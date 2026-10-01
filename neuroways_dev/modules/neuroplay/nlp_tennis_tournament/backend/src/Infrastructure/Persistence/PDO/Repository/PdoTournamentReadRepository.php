<?php

declare(strict_types=1);

namespace TT\Infrastructure\Persistence\PDO\Repository;

use PDO;
use TT\Domain\Tournament\Repository\TournamentReadRepository;

final class PdoTournamentReadRepository implements TournamentReadRepository
{
    public function __construct(
        private readonly PDO $pdo,
    ) {
    }

    public function findAll(): array
    {
        $sql = <<<'SQL'
SELECT
    t.TOURNAMENT_ID,
    t.NAME,
    t.EVENT_DATE,
    t.START_TIME,
    t.END_TIME,
    t.STATUS,
    l.LOCATION_ID,
    l.NAME AS LOCATION_NAME,
    l.ADDRESS AS LOCATION_ADDRESS
FROM TT_TOURNAMENT t
INNER JOIN TT_LOCATION l
    ON l.LOCATION_ID = t.LOCATION_ID
ORDER BY
    t.EVENT_DATE ASC,
    t.START_TIME ASC,
    t.TOURNAMENT_ID ASC
SQL;

        $statement = $this->pdo->prepare($sql);
        $statement->execute();

        $rows = $statement->fetchAll();

        return array_map(
            static fn (array $row): array => [
                'id' => (int) $row['TOURNAMENT_ID'],
                'name' => (string) $row['NAME'],
                'eventDate' => $row['EVENT_DATE'],
                'startTime' => $row['START_TIME'],
                'endTime' => $row['END_TIME'],
                'status' => (string) $row['STATUS'],
                'location' => [
                    'id' => (int) $row['LOCATION_ID'],
                    'name' => (string) $row['LOCATION_NAME'],
                    'address' => $row['LOCATION_ADDRESS'],
                ],
            ],
            $rows,
        );
    }
}
