<?php

declare(strict_types=1);

namespace TT\Infrastructure\Persistence\PDO\Connection;

use PDO;
use PDOException;
use RuntimeException;
use TT\Infrastructure\Config\Configuration;

final class DatabaseConnection
{
    private ?PDO $connection = null;

    public function __construct(private readonly Configuration $configuration)
    {
    }

    public function get(): PDO
    {
        if ($this->connection instanceof PDO) {
            return $this->connection;
        }

        $dsn = self::buildDsn(
            $this->configuration->requireString('database.host'),
            (int) $this->configuration->get('database.port', 3306),
            $this->configuration->requireString('database.name'),
            $this->configuration->requireString('database.charset')
        );

        $username = $this->configuration->requireString('database.username');
        $password = (string) $this->configuration->get('database.password', '');
        $timeout = max(1, (int) $this->configuration->get('database.timeout', 5));

        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_TIMEOUT => $timeout,
        ];

        try {
            $this->connection = new PDO($dsn, $username, $password, $options);
        } catch (PDOException $exception) {
            throw new RuntimeException('Database connection failed.', 0, $exception);
        }

        return $this->connection;
    }

    public static function buildDsn(string $host, int $port, string $database, string $charset): string
    {
        if ($host === '' || $database === '' || $charset === '') {
            throw new RuntimeException('Host, database and charset are required to build the database DSN.');
        }

        if ($port < 1 || $port > 65535) {
            throw new RuntimeException('Database port must be between 1 and 65535.');
        }

        return sprintf('mysql:host=%s;port=%d;dbname=%s;charset=%s', $host, $port, $database, $charset);
    }
}
