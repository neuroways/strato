<?php
declare(strict_types=1);

final class QuestService
{
    public function __construct(private QuestRepository $repository)
    {
    }

    public function getStartState(int $childId): array
    {
        $row = $this->repository->findStartStateByChildId($childId);

        if ($row === null) {
            throw new RuntimeException('Für das Kinderprofil wurde kein Startzustand gefunden.');
        }

        $currentRound = max(1, (int) ($row['current_round'] ?? 1));
        $completedRounds = max(0, (int) ($row['completed_rounds'] ?? 0));
        $currentStep = max(1, (int) ($row['current_step'] ?? 1));

        return [
            'status' => 'active',
            'source' => 'database',
            'player' => [
                'id' => (int) $row['child_id'],
                'displayName' => (string) $row['display_name'],
                'grade' => (int) $row['grade_level'],
            ],
            'companion' => [
                'name' => (string) ($row['companion_name'] ?? 'Luna'),
            ],
            'quest' => [
                'id' => (int) $row['quest_id'],
                'title' => (string) $row['quest_title'],
                'currentDay' => (int) $row['day_number'],
                'dayTitle' => (string) $row['day_title'],
                'currentRound' => $currentRound,
                'completedRounds' => $completedRounds,
                'totalRounds' => 5,
            ],
            'scene' => [
                'sceneType' => (string) ($row['scene_type'] ?? 'MISSION_RESUME'),
                'headline' => (string) ($row['headline'] ?? 'Willkommen zurück.'),
                'greeting' => (string) ($row['greeting_text'] ?? 'Dein Abenteuer wartet auf dich.'),
                'locationName' => (string) ($row['location_name'] ?? 'am Waldrand'),
                'illustrationKey' => (string) ($row['illustration_key'] ?? 'neutral-start'),
                'ambienceKey' => (string) ($row['ambience_key'] ?? 'calm'),
            ],
            'nextAction' => $this->buildNextAction(
                (string) ($row['scene_type'] ?? 'MISSION_RESUME'),
                $currentRound,
                $currentStep
            ),
        ];
    }

    private function buildNextAction(string $sceneType, int $round, int $step): array
    {
        return match ($sceneType) {
            'NO_ACTIVE_STORY' => [
                'type' => 'discover_adventure',
                'label' => 'Abenteuer entdecken',
                'url' => 'adventures.html',
            ],
            'WEEK_START' => [
                'type' => 'start_week',
                'label' => 'Neues Abenteuer beginnen',
                'url' => 'story.html?action=start-week',
            ],
            'DAY_START' => [
                'type' => 'start_day',
                'label' => 'Heutiges Kapitel beginnen',
                'url' => 'story.html?action=start-day',
            ],
            'STORY_UNLOCKED' => [
                'type' => 'read_discovery',
                'label' => 'Entdeckung ansehen',
                'url' => sprintf('story.html?round=%d', $round),
            ],
            'DAY_COMPLETE' => [
                'type' => 'read_day',
                'label' => 'Heutige Geschichte nachlesen',
                'url' => 'adventure-book.html?scope=day',
            ],
            'WEEK_COMPLETE' => [
                'type' => 'open_book',
                'label' => 'Abenteuerbuch öffnen',
                'url' => 'adventure-book.html?scope=week',
            ],
            default => [
                'type' => 'continue_mission',
                'label' => sprintf('Mit Satz %d weitermachen', $round),
                'url' => sprintf('mission.html?round=%d&step=%d', $round, $step),
            ],
        };
    }
}
