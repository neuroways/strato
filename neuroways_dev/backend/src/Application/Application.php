<?php

declare(strict_types=1);

namespace TT\Application;

use TT\Infrastructure\Health\DatabaseHealthCheck;

final class Application
{
    public function __construct(
        private readonly string $appName,
        private readonly string $environment,
        private readonly string $version,
        private readonly DatabaseHealthCheck $databaseHealthCheck,
    ) {
    }

    /** @return array<string, mixed> */
    public function status(bool $withDatabase = true): array
    {
        $status = [
            'application' => [
                'name' => $this->appName,
                'environment' => $this->environment,
                'version' => $this->version,
            ],
            'runtime' => [
                'php_version' => PHP_VERSION,
                'sapi' => PHP_SAPI,
            ],
        ];

        if ($withDatabase) {
            $status['database'] = $this->databaseHealthCheck->check();
        }

        $databaseStatus = $status['database']['status'] ?? 'not_checked';
        $status['status'] = $databaseStatus === 'ok' || $databaseStatus === 'not_checked'
            ? 'ok'
            : 'degraded';

        $status['timestamp_utc'] = gmdate(DATE_ATOM);

        return $status;
    }
}
