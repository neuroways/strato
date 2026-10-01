<?php

declare(strict_types=1);

use TT\Infrastructure\Config\Configuration;

return static function (): void {
    $configuration = new Configuration([
        'database' => [
            'host' => 'db.internal',
            'port' => 3307,
            'name' => 'tt_test',
        ],
    ]);

    test_assert_same('db.internal', $configuration->get('database.host'), 'Nested config value must be readable.');
    test_assert_same(3307, $configuration->get('database.port'), 'Integer config value must be preserved.');
    test_assert_same('fallback', $configuration->get('database.missing', 'fallback'), 'Default must be returned for missing config.');
    test_assert_same('tt_test', $configuration->requireString('database.name'), 'Required string must be returned.');
};
