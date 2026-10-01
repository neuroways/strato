<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$test = require __DIR__ . '/Application/PublicTournament/PublicHomeContractTest.php';

try {
    $test();
    fwrite(STDOUT, "[PASS] PublicHomeContractTest\n");
    fwrite(STDOUT, "\nTT-FRONTEND-0002-C001-R001 tests: 1 passed, 0 failed\n");
    exit(0);
} catch (Throwable $exception) {
    fwrite(STDERR, "[FAIL] PublicHomeContractTest: {$exception->getMessage()}\n");
    exit(1);
}
