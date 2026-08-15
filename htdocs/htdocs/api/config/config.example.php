<?php
declare(strict_types=1);

return [
    'application' => [
        'name' => 'NeuroWays',
        'environment' => 'production',
        'debug' => false,
        'timezone' => 'Europe/Berlin',
        'base_url' => 'https://DEINE-DOMAIN.DE',
    ],

    'database' => [
        'host' => 'database-5021022338.webspace-host.com',
        'port' => 3306,
        'name' => 'dbs15945095',
        'user' => 'DEIN_DATENBANKBENUTZER',
        'password' => 'DEIN_DATENBANKPASSWORT',
        'charset' => 'utf8mb4',
    ],

    'security' => [
        'allowed_origins' => [
            'https://DEINE-DOMAIN.DE',
        ],
        'session_cookie_secure' => true,
        'session_cookie_httponly' => true,
        'session_cookie_samesite' => 'Lax',
    ],
];
