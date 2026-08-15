<?php

declare(strict_types=1);

namespace NeuroWays\Application;

use NeuroWays\Domain\AppInfo;
use NeuroWays\Domain\AppInfoRepository;
use RuntimeException;

final readonly class GetAppInfo
{
    public function __construct(private AppInfoRepository $repository)
    {
    }

    public function execute(): AppInfo
    {
        return $this->repository->findCurrent()
            ?? throw new RuntimeException('Keine Anwendungsinformationen vorhanden.');
    }
}
