<?php

declare(strict_types=1);

$tests = [
    __DIR__ . '/Foundation/ComposerConfigurationTest.php',
];

$passed = 0;
$failed = 0;
foreach ($tests as $test) {
    try {
        require $test;
        ++$passed;
        echo '[PASS] ' . basename($test) . PHP_EOL;
    } catch (Throwable $e) {
        ++$failed;
        echo '[FAIL] ' . basename($test) . ': ' . $e->getMessage() . PHP_EOL;
    }
}

echo sprintf('Result: %d passed, %d failed.%s', $passed, $failed, PHP_EOL);
exit($failed === 0 ? 0 : 1);
