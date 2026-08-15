<?php

declare(strict_types=1);

use TT\Application\Application;
use TT\Infrastructure\Config\Configuration;
use TT\Infrastructure\Health\DatabaseHealthCheck;
use TT\Infrastructure\Persistence\PDO\Connection\DatabaseConnection;

return static function (): void {
    $configuration = new Configuration([
        'database' => [
            'host' => 'localhost',
            'port' => 3306,
            'name' => 'test',
            'username' => 'test',
            'password' => '',
            'charset' => 'utf8mb4',
            'timeout' => 1,
        ],
    ]);

    $health = new DatabaseHealthCheck(new DatabaseConnection($configuration));
    $application = new Application('TT Test', 'test', '0.0.1-test', $health);
    $status = $application->status(false);

    test_assert_same('ok', $status['status'], 'Application must be healthy when database check is disabled.');
    test_assert_same('TT Test', $status['application']['name'], 'Application name mismatch.');
    test_assert_same('test', $status['application']['environment'], 'Application environment mismatch.');
    test_assert_same('0.0.1-test', $status['application']['version'], 'Application version mismatch.');
    test_assert_true(isset($status['runtime']['php_version']), 'PHP version must be exposed.');
    test_assert_true(!isset($status['database']), 'Database section must be absent when disabled.');
};
