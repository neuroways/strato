<?php

declare(strict_types=1);

namespace TT\Infrastructure\Persistence\PDO\Connection;

use PDO;
use RuntimeException;

final class PlatformPdoFactory
{
    public static function create(string $centralDatabaseConfigFile): PDO
    {
        if (!is_file($centralDatabaseConfigFile)) {
            throw new RuntimeException(
                sprintf('Central database configuration not found: %s', $centralDatabaseConfigFile)
            );
        }

        $allConfigurations = require $centralDatabaseConfigFile;

        if (!is_array($allConfigurations)) {
            throw new RuntimeException('Central database configuration must return an array.');
        }

        $platform = $allConfigurations['platform'] ?? null;

        if (!is_array($platform)) {
            throw new RuntimeException('Database configuration "platform" is missing.');
        }

        $host = (string) ($platform['host'] ?? '');
        $port = (int) ($platform['port'] ?? 3306);
        $database = (string) ($platform['database'] ?? '');
        $username = (string) ($platform['username'] ?? '');
        $password = (string) ($platform['password'] ?? '');
        $charset = (string) ($platform['charset'] ?? 'utf8mb4');

        if ($host === '' || $database === '' || $username === '') {
            throw new RuntimeException('Platform database configuration is incomplete.');
        }

        $dsn = sprintf(
            'mysql:host=%s;port=%d;dbname=%s;charset=%s',
            $host,
            $port,
            $database,
            $charset
        );

        return new PDO(
            $dsn,
            $username,
            $password,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ],
        );
    }
}
