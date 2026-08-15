<?php

declare(strict_types=1);

namespace TT\Infrastructure\Http;

use JsonException;

final class JsonResponse
{
    /** @param array<string, mixed> $payload */
    public static function encode(array $payload): string
    {
        try {
            return json_encode(
                $payload,
                JSON_THROW_ON_ERROR | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
            );
        } catch (JsonException) {
            return '{"status":"error","message":"Response serialization failed."}';
        }
    }

    /** @param array<string, mixed> $payload */
    public static function send(array $payload, int $statusCode = 200): never
    {
        http_response_code($statusCode);
        header('Content-Type: application/json; charset=utf-8');
        header('X-Content-Type-Options: nosniff');
        echo self::encode($payload);
        exit;
    }
}
