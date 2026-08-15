<?php

declare(strict_types=1);

use TT\Infrastructure\Config\Env;

return [
    'database' => [
        'driver' => 'mysql',
        'host' => Env::get('DB_HOST', '127.0.0.1'),
        'port' => (int) Env::get('DB_PORT', '3306'),
        'name' => Env::get('DB_DATABASE', ''),
        'username' => Env::get('DB_USERNAME', ''),
        'password' => Env::get('DB_PASSWORD', ''),
        'charset' => Env::get('DB_CHARSET', 'utf8mb4'),
        'timeout' => (int) Env::get('DB_TIMEOUT', '5'),
        'table_prefix' => Env::get('DB_TABLE_PREFIX', 'TT_'),
    ],
];
