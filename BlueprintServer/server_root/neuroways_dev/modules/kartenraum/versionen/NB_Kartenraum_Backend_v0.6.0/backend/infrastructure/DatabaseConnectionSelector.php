<?php
declare(strict_types=1);
namespace NeuroWays\NeuroBalance\Kartenraum\Infrastructure;
use RuntimeException;

final class DatabaseConnectionSelector {
    public static function select(array $databases, string $key): array {
        if (!isset($databases[$key]) || !is_array($databases[$key])) {
            throw new RuntimeException('Database connection key not configured: ' . $key);
        }
        return $databases[$key];
    }
}
