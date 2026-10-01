<?php

declare(strict_types=1);

namespace NeuroWays\Domain;

use DateTimeImmutable;

final readonly class AppInfo
{
    public function __construct(
        public string $version,
        public string $status,
        public DateTimeImmutable $buildDate,
    ) {
    }

    /** @return array{version: string, status: string, buildDate: string} */
    public function toArray(): array
    {
        return [
            'version' => $this->version,
            'status' => $this->status,
            'buildDate' => $this->buildDate->format('Y-m-d'),
        ];
    }
}
