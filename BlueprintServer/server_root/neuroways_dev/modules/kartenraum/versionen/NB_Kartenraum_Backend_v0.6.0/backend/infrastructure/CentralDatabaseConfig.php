<?php
declare(strict_types=1);
namespace NeuroWays\NeuroBalance\Kartenraum\Infrastructure;
use RuntimeException;

final class CentralDatabaseConfig {
    public static function load(): array {
        $candidates = [];
        if (!empty($_SERVER['DOCUMENT_ROOT'])) {
            $r = rtrim((string)$_SERVER['DOCUMENT_ROOT'], '/');
            $candidates[] = $r . '/config/database.php';
            $candidates[] = dirname($r) . '/config/database.php';
        }
        $candidates[] = '/config/database.php';

        foreach (array_unique($candidates) as $path) {
            if (is_file($path)) {
                $config = require $path;
                if (!is_array($config)) {
                    throw new RuntimeException('/config/database.php must return an array.');
                }
                return $config;
            }
        }
        throw new RuntimeException('Central NeuroWays config /config/database.php not found.');
    }
}
