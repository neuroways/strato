<?php
declare(strict_types=1);

namespace NeuroQuest\Infrastructure\Database;

use PDO;
use PDOException;
use RuntimeException;

final class Connection
{
    private static ?PDO $instance = null;

    /**
     * @param array<string, mixed> $config
     */
    public static function create(array $config): PDO
    {
        if (self::$instance instanceof PDO) {
            return self::$instance;
        }

        foreach (['host', 'port', 'database', 'username', 'password', 'charset'] as $key) {
            if (!array_key_exists($key, $config)) {
                throw new RuntimeException(
                    sprintf('Missing database configuration value: %s', $key)
                );
            }
        }

        $dsn = sprintf(
            'mysql:host=%s;port=%d;dbname=%s;charset=%s',
            $config['host'],
            (int) $config['port'],
            $config['database'],
            $config['charset']
        );

        try {
            self::$instance = new PDO(
                $dsn,
                (string) $config['username'],
                (string) $config['password'],
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]
            );
        } catch (PDOException $exception) {
            throw new RuntimeException(
                'The database connection could not be established.',
                0,
                $exception
            );
        }

        return self::$instance;
    }

    private function __construct()
    {
    }
}
