<?php

declare(strict_types=1);

use TT\Infrastructure\Config\Configuration;
use TT\Infrastructure\Health\DatabaseHealthCheck;
use TT\Infrastructure\Persistence\PDO\Connection\DatabaseConnection;

return static function (): void {
    $configuration = new Configuration([
        'database' => [
            'host' => '127.0.0.1',
            'port' => 3306,
            'name' => 'not_configured_for_unit_test',
            'username' => 'not_configured',
            'password' => '',
            'charset' => 'utf8mb4',
            'timeout' => 1,
        ],
    ]);

    $health = (new DatabaseHealthCheck(new DatabaseConnection($configuration)))->check();

    test_assert_true(in_array($health['status'], ['down', 'degraded', 'ok'], true), 'Health check must return a supported status.');
    test_assert_same('mariadb', $health['database'], 'Health check must identify the configured database type.');
};
