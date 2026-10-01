<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';
$tests = [
    __DIR__ . '/Application/PublicTournament/PublicTournamentViewModelTest.php',
    __DIR__ . '/Application/PublicTournament/PublicTournamentServiceTest.php',
];
$passed = 0;
$failed = 0;
foreach ($tests as $file) {
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
fwrite(STDOUT, sprintf("\nTT-FRONTEND-0002-C001 tests: %d passed, %d failed\n", $passed, $failed));
exit($failed === 0 ? 0 : 1);
