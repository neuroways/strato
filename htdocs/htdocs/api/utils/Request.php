<?php
declare(strict_types=1);

namespace NeuroWays\Api\Utils;

final class Request
{
    public static function json(): array
    {
        $raw = file_get_contents('php://input');

        if ($raw === false || $raw === '') {
            return [];
        }

        $data = json_decode($raw, true);

        return is_array($data) ? $data : [];
    }
}
