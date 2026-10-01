<?php
declare(strict_types=1);

final class NeuroQuestDatabase
{
    public static function connect(): PDO
    {
        $configFile = dirname(__DIR__, 3) . '/config/config.php';

        if (!is_file($configFile)) {
            throw new RuntimeException('Die zentrale Konfiguration wurde nicht gefunden.');
        }

        $config = require $configFile;
        $db = $config['database'] ?? null;

        if (!is_array($db)) {
            throw new RuntimeException('Die Datenbankkonfiguration fehlt.');
        }

        $dsn = sprintf(
            'mysql:host=%s;port=%d;dbname=%s;charset=%s',
            $db['host'],
            $db['port'] ?? 3306,
            $db['name'],
            $db['charset'] ?? 'utf8mb4'
        );

        return new PDO(
            $dsn,
            $db['user'],
            $db['password'],
            $db['options'] ?? [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]
        );
    }
}
