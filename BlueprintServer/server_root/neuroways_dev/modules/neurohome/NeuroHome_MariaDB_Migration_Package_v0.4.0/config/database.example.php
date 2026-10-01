<?php
declare(strict_types=1);

return [
    'dsn' => getenv('NEUROHOME_DB_DSN') ?: 'mysql:host=localhost;dbname=neuroways_dev;charset=utf8mb4',
    'user' => getenv('NEUROHOME_DB_USER') ?: '',
    'password' => getenv('NEUROHOME_DB_PASSWORD') ?: '',
];
