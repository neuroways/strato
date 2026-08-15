<?php
declare(strict_types=1);

final class DayOneRepository
{
    public function __construct(private PDO $pdo)
    {
    }

    public function getDay(): array
    {
        $sql = <<<'SQL'
            SELECT
                d.id,
                d.day_number,
                d.title,
                d.location_name,
                d.arrival_headline,
                d.arrival_text,
                d.completion_text,
                s.title AS story_title,
                c.name AS companion_name
            FROM nq_story_days d
            JOIN nq_stories s ON s.id = d.story_id
            LEFT JOIN nq_story_day_companions dc ON dc.story_day_id = d.id
            LEFT JOIN nq_companions c ON c.id = dc.companion_id
            WHERE s.code = 'WALDKARTE'
              AND d.day_number = 1
            LIMIT 1
        SQL;

        $day = $this->pdo->query($sql)->fetch();

        if (!$day) {
            throw new RuntimeException('Geschichte 1, Tag 1 wurde nicht gefunden.');
        }

        return $day;
    }

    public function getRounds(int $storyDayId): array
    {
        $stmt = $this->pdo->prepare(
            'SELECT * FROM nq_day_rounds WHERE story_day_id = :day ORDER BY round_number'
        );
        $stmt->execute(['day' => $storyDayId]);
        return $stmt->fetchAll();
    }

    public function getStoryParts(int $storyDayId): array
    {
        $stmt = $this->pdo->prepare(
            'SELECT * FROM nq_story_parts WHERE story_day_id = :day ORDER BY part_number'
        );
        $stmt->execute(['day' => $storyDayId]);
        return $stmt->fetchAll();
    }

    public function getActiveRun(int $childId, int $storyDayId): ?array
    {
        $stmt = $this->pdo->prepare(
            "SELECT * FROM nq_day_runs
             WHERE child_id = :child
               AND story_day_id = :day
               AND status = 'active'
             ORDER BY id DESC
             LIMIT 1"
        );
        $stmt->execute(['child' => $childId, 'day' => $storyDayId]);
        return $stmt->fetch() ?: null;
    }

    public function startRun(int $childId, int $storyDayId): array
    {
        $stmt = $this->pdo->prepare(
            'SELECT COALESCE(MAX(run_number), 0) + 1
             FROM nq_day_runs
             WHERE child_id = :child AND story_day_id = :day'
        );
        $stmt->execute(['child' => $childId, 'day' => $storyDayId]);
        $runNumber = (int)$stmt->fetchColumn();

        $insert = $this->pdo->prepare(
            "INSERT INTO nq_day_runs
             (child_id, story_day_id, run_number, current_round, current_step, status)
             VALUES (:child, :day, :run, 1, 1, 'active')"
        );
        $insert->execute([
            'child' => $childId,
            'day' => $storyDayId,
            'run' => $runNumber,
        ]);

        return $this->getRun((int)$this->pdo->lastInsertId());
    }

    public function getRun(int $runId): array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM nq_day_runs WHERE id = :id');
        $stmt->execute(['id' => $runId]);
        $run = $stmt->fetch();

        if (!$run) {
            throw new RuntimeException('Durchlauf wurde nicht gefunden.');
        }

        return $run;
    }

    public function advanceStep(int $runId): array
    {
        $run = $this->getRun($runId);
        $round = (int)$run['current_round'];
        $step = (int)$run['current_step'];

        if ($step < 5) {
            $step++;
        } else {
            $this->completeRound($runId, $round);

            if ($round >= 5) {
                $this->completeRun($runId);
                return $this->getRun($runId);
            }

            $round++;
            $step = 1;
        }

        $stmt = $this->pdo->prepare(
            'UPDATE nq_day_runs
             SET current_round = :round, current_step = :step
             WHERE id = :id'
        );
        $stmt->execute(['round' => $round, 'step' => $step, 'id' => $runId]);

        return $this->getRun($runId);
    }

    private function completeRound(int $runId, int $round): void
    {
        $stmt = $this->pdo->prepare(
            "INSERT INTO nq_run_round_progress
             (day_run_id, round_number, current_step, completed_flag, completed_at)
             VALUES (:run, :round, 5, 1, NOW())
             ON DUPLICATE KEY UPDATE
                current_step = 5,
                completed_flag = 1,
                completed_at = NOW()"
        );
        $stmt->execute(['run' => $runId, 'round' => $round]);

        $unlock = $this->pdo->prepare(
            "INSERT INTO nq_story_unlocks
             (child_id, story_part_id, first_unlocked_at, read_count)
             SELECT r.child_id, p.id, NOW(), 0
             FROM nq_day_runs r
             JOIN nq_story_parts p
               ON p.story_day_id = r.story_day_id
              AND p.round_number = :round
             WHERE r.id = :run
             ON DUPLICATE KEY UPDATE
                first_unlocked_at = first_unlocked_at"
        );
        $unlock->execute(['round' => $round, 'run' => $runId]);
    }

    private function completeRun(int $runId): void
    {
        $stmt = $this->pdo->prepare(
            "UPDATE nq_day_runs
             SET status = 'completed',
                 current_round = 5,
                 current_step = 5,
                 completed_at = NOW()
             WHERE id = :id"
        );
        $stmt->execute(['id' => $runId]);
    }

    public function getCompletedRunCount(int $childId, int $storyDayId): int
    {
        $stmt = $this->pdo->prepare(
            "SELECT COUNT(*)
             FROM nq_day_runs
             WHERE child_id = :child
               AND story_day_id = :day
               AND status = 'completed'"
        );
        $stmt->execute(['child' => $childId, 'day' => $storyDayId]);
        return (int)$stmt->fetchColumn();
    }

    public function getUnlockedParts(int $childId, int $storyDayId): array
    {
        $stmt = $this->pdo->prepare(
            "SELECT p.*
             FROM nq_story_parts p
             JOIN nq_story_unlocks u ON u.story_part_id = p.id
             WHERE u.child_id = :child
               AND p.story_day_id = :day
             ORDER BY p.part_number"
        );
        $stmt->execute(['child' => $childId, 'day' => $storyDayId]);
        return $stmt->fetchAll();
    }
}
