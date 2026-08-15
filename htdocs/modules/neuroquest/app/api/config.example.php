<?php
declare(strict_types=1);

/**
 * Diese Datei kopieren:
 *   config.example.php -> config.php
 *
 * Danach die echten STRATO-MariaDB-Zugangsdaten eintragen.
 * config.php nicht öffentlich teilen und möglichst außerhalb des Webroots ablegen.
 */
return [
    'db' => [
        'host' => 'rdbms.strato.de',
        'port' => 3306,
        'name' => 'DB_NAME',
        'user' => 'DB_USER',
        'password' => 'DB_PASSWORD',
        'charset' => 'utf8mb4',
    ],
    'demo_mode' => true,
];
