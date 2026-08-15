<?php
declare(strict_types=1);

/*
 * Kopiere config.example.php nach config.local.php
 * und trage dort die echten Zugangsdaten ein.
 */

$base = require __DIR__ . '/config.example.php';
$localFile = __DIR__ . '/config.local.php';

if (is_file($localFile)) {
    $local = require $localFile;
    $base = array_replace_recursive($base, $local);
}

return $base;
