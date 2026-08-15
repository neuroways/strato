<?php
declare(strict_types=1);

/**
 * NeuroWays / NeuroQuest
 * Zentrale Datenbankkonfiguration
 *
 * Diese Datei enthält ausschließlich Konfigurationswerte.
 * Niemals in ein öffentliches Repository mit echten Zugangsdaten hochladen.
 */

return [
    'database' => [
        'host'     => 'database-5021022338.webspace-host.com',
        'port'     => 3306,
        'name'     => 'dbs15945095',
        'user'     => 'dbu683992',
        'password' => 'bernow-waNber-vagfe2',
        'charset'  => 'utf8mb4',
    ],

    'application' => [
        'name'        => 'NeuroWays',
        'environment' => 'development', // development | test | production
        'debug'       => true,
        'timezone'    => 'Europe/Berlin',
    ],
];
