<?php

declare(strict_types=1);

use TT\Infrastructure\Persistence\PDO\Connection\DatabaseConnection;

return static function (): void {
    $dsn = DatabaseConnection::buildDsn('localhost', 3306, 'tt_test', 'utf8mb4');

    test_assert_same(
        'mysql:host=localhost;port=3306;dbname=tt_test;charset=utf8mb4',
        $dsn,
        'MariaDB/MySQL PDO DSN must be built deterministically.'
    );

    $failed = false;
    try {
        DatabaseConnection::buildDsn('', 3306, 'tt_test', 'utf8mb4');
    } catch (RuntimeException) {
        $failed = true;
    }

    test_assert_true($failed, 'Invalid DSN input must be rejected.');
};
