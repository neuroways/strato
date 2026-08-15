<?php

declare(strict_types=1);

use TT\Infrastructure\Http\JsonResponse;

return static function (): void {
    $json = JsonResponse::encode([
        'status' => 'ok',
        'message' => 'Tennisturnier',
    ]);

    $decoded = json_decode($json, true, 512, JSON_THROW_ON_ERROR);
    test_assert_same('ok', $decoded['status'] ?? null, 'JSON status mismatch.');
    test_assert_same('Tennisturnier', $decoded['message'] ?? null, 'JSON message mismatch.');
};
