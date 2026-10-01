<?php

declare(strict_types=1);

return static function (): void {
    $backendRoot = dirname(__DIR__);

    foreach ([
        $backendRoot . '/bootstrap.php',
        $backendRoot . '/public/index.php',
        $backendRoot . '/src/Application/Application.php',
        $backendRoot . '/src/Infrastructure/Http/JsonResponse.php',
    ] as $file) {
        test_assert_true(is_file($file), sprintf('Required C004 file missing: %s', $file));
        test_assert_true(is_readable($file), sprintf('Required C004 file unreadable: %s', $file));
    }
};
