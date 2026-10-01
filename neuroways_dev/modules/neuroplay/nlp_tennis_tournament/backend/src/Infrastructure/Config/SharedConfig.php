<?php

declare(strict_types=1);

namespace TT\Infrastructure\Config;

final class SharedConfig
{
    public static function directory(string $projectRoot): ?string
    {
        $explicit = getenv('NW_SHARED_CONFIG_DIR');
        if (is_string($explicit) && trim($explicit) !== '') {
            $candidate = rtrim($explicit, DIRECTORY_SEPARATOR);
            return is_dir($candidate) ? $candidate : null;
        }

        $normalized = rtrim($projectRoot, DIRECTORY_SEPARATOR);
        $candidate = dirname(dirname(dirname(dirname($normalized)))) . DIRECTORY_SEPARATOR . 'config';

        return is_dir($candidate) ? $candidate : null;
    }

    public static function loadPhpArray(string $projectRoot, string $fileName): ?array
    {
        $dir = self::directory($projectRoot);
        if ($dir === null) {
            return null;
        }

        $path = $dir . DIRECTORY_SEPARATOR . ltrim($fileName, DIRECTORY_SEPARATOR);
        if (!is_readable($path)) {
            return null;
        }

        $value = require $path;
        return is_array($value) ? $value : null;
    }

    public static function connection(string $projectRoot, string $connectionName): ?array
    {
        $all = self::loadPhpArray($projectRoot, 'database.php');
        if (!is_array($all)) {
            return null;
        }

        $connection = $all[$connectionName] ?? null;
        return is_array($connection) ? $connection : null;
    }
}
