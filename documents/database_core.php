<?php
declare(strict_types=1);

/**
 * NeuroQuest database configuration.
 *
 * SECURITY:
 * - This file must remain outside the public/ directory.
 * - Replace the placeholder values with the credentials from STRATO.
 * - Do not commit real credentials to a public repository.
 */
return [
    'driver' => 'mysql',
    'host' => 'database-5021032196.webspace-host.com',
    'port' => 3306,
    'database' => 'dbs15949374',
    'username' => 'dbu4435403',
    'password' => 'bernow-waNber-vagfe2',
    'charset' => 'utf8mb4',

    // Temporary database connection test.
    // Disable after the connection has been verified.
    'connection_test' => [
        'enabled' => true,
        'access_key' => 'CHANGE_THIS_TO_A_LONG_RANDOM_SECRET',
    ],
];
