<?php
declare(strict_types=1);

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

echo '<!doctype html>';
echo '<html lang="de">';
echo '<head><meta charset="utf-8"><title>NeuroQuest Systemtest</title></head>';
echo '<body style="font-family:Arial;padding:40px;background:#f5f3ed;color:#222">';
echo '<h1>Systemtest erreichbar</h1>';
echo '<p>Die Datei database-test.php wurde erfolgreich ausgeführt.</p>';
echo '<p>PHP-Version: ' . htmlspecialchars(PHP_VERSION) . '</p>';
echo '</body>';
echo '</html>';