<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$testFiles = [
    __DIR__ . '/Infrastructure/Config/ConfigurationTest.php',
    __DIR__ . '/Infrastructure/Persistence/PDO/Connection/DatabaseConnectionTest.php',
    __DIR__ . '/Infrastructure/Health/DatabaseHealthCheckTest.php',
];

$passed = 0;
$failed = 0;

foreach ($testFiles as $file) {
    $name = basename($file, '.php');

    try {
        $test = require $file;
        $test();
        ++$passed;
        fwrite(STDOUT, sprintf("[PASS] %s\n", $name));
    } catch (Throwable $exception) {
        ++$failed;
        fwrite(STDERR, sprintf("[FAIL] %s: %s\n", $name, $exception->getMessage()));
    }
}

fwrite(STDOUT, sprintf("\nTests: %d passed, %d failed\n", $passed, $failed));
exit($failed === 0 ? 0 : 1);
