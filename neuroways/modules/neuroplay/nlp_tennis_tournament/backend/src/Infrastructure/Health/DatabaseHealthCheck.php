<?php

declare(strict_types=1);

namespace TT\Infrastructure\Health;

use Throwable;
use TT\Infrastructure\Persistence\PDO\Connection\DatabaseConnection;

final class DatabaseHealthCheck
{
    public function __construct(private readonly DatabaseConnection $databaseConnection)
    {
    }

    /** @return array{status:string,database:string,latency_ms:float|null,message:string|null} */
    public function check(): array
    {
        $startedAt = hrtime(true);

        try {
            $pdo = $this->databaseConnection->get();
            $statement = $pdo->query('SELECT 1 AS ok');
            $result = $statement !== false ? $statement->fetch() : false;

            if (!is_array($result) || (int) ($result['ok'] ?? 0) !== 1) {
                return [
                    'status' => 'degraded',
                    'database' => 'mariadb',
                    'latency_ms' => self::elapsedMilliseconds($startedAt),
                    'message' => 'Database responded, but health query returned an unexpected result.',
                ];
            }

            return [
                'status' => 'ok',
                'database' => 'mariadb',
                'latency_ms' => self::elapsedMilliseconds($startedAt),
                'message' => null,
            ];
        } catch (Throwable $exception) {
            return [
                'status' => 'down',
                'database' => 'mariadb',
                'latency_ms' => self::elapsedMilliseconds($startedAt),
                'message' => $exception->getMessage(),
            ];
        }
    }

    private static function elapsedMilliseconds(int $startedAt): float
    {
        return round((hrtime(true) - $startedAt) / 1_000_000, 2);
    }
}
