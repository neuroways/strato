<?php

declare(strict_types=1);

namespace NeuroWays\Repository;

use DateTimeImmutable;
use NeuroWays\Domain\AppInfo;
use NeuroWays\Domain\AppInfoRepository;
use PDO;

final readonly class MariaDbAppInfoRepository implements AppInfoRepository
{
    public function __construct(private PDO $connection)
    {
    }

    public function findCurrent(): ?AppInfo
    {
        $statement = $this->connection->prepare(
            'SELECT version, status, build_date
             FROM app_info
             WHERE is_current = :is_current
             ORDER BY id DESC
             LIMIT 1',
        );
        $statement->execute(['is_current' => 1]);
        $row = $statement->fetch();

        if ($row === false) {
            return null;
        }

        return new AppInfo(
            version: $row['version'],
            status: $row['status'],
            buildDate: new DateTimeImmutable($row['build_date']),
        );
    }
}
