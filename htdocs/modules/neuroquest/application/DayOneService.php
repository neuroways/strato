<?php
declare(strict_types=1);

final class DayOneService
{
    public function __construct(private DayOneRepository $repository)
    {
    }

    public function getHomeState(int $childId): array
    {
        $day = $this->repository->getDay();
        $run = $this->repository->getActiveRun($childId, (int)$day['id']);
        $completedCount = $this->repository->getCompletedRunCount($childId, (int)$day['id']);
        $unlocked = $this->repository->getUnlockedParts($childId, (int)$day['id']);

        return compact('day', 'run', 'completedCount', 'unlocked');
    }

    public function startOrResume(int $childId): array
    {
        $day = $this->repository->getDay();
        $run = $this->repository->getActiveRun($childId, (int)$day['id']);

        return $run ?: $this->repository->startRun($childId, (int)$day['id']);
    }
}
