<?php
declare(strict_types=1);

namespace NeuroWays\NeuroBalance\Kartenraum\Infrastructure;

use PDO;
use RuntimeException;

final class Db
{
    public static function connect(array $config): PDO
    {
        if (!isset($config['db']['dsn'], $config['db']['user'], $config['db']['password'])) {
            throw new RuntimeException('Database configuration incomplete.');
        }

        return new PDO(
            $config['db']['dsn'],
            $config['db']['user'],
            $config['db']['password'],
            $config['db']['options'] ?? []
        );
    }
}
