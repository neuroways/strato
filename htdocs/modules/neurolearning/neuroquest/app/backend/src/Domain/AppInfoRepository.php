<?php

declare(strict_types=1);

namespace NeuroWays\Domain;

interface AppInfoRepository
{
    public function findCurrent(): ?AppInfo;
}
