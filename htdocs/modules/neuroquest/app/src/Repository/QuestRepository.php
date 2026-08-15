<?php
declare(strict_types=1);

final class QuestRepository
{
    public function __construct(private PDO $pdo)
    {
    }

    /**
     * Vorlage für die echte Datenbankintegration.
     *
     * Die Tabellennamen sind bewusst neutral gehalten, weil die bestehende
     * NeuroQuest-MariaDB-Struktur noch nicht vorliegt. Passe ausschließlich
     * diese Repository-Schicht an deine tatsächlichen Tabellen und Spalten an.
     */
    public function findStartStateByChildId(int $childId): ?array
    {
        /*
        Beispiel:

        $sql = <<<'SQL'
            SELECT
                c.id AS child_id,
                c.display_name,
                c.grade_level,
                q.id AS quest_id,
                q.title AS quest_title,
                d.day_number,
                d.title AS day_title,
                p.current_round,
                p.completed_rounds,
                p.current_step,
                s.scene_type,
                s.headline,
                s.greeting_text,
                s.location_name,
                s.illustration_key,
                s.ambience_key,
                cp.name AS companion_name
            FROM nq_children c
            JOIN nq_progress p ON p.child_id = c.id
            JOIN nq_quests q ON q.id = p.quest_id
            JOIN nq_story_days d ON d.id = p.story_day_id
            LEFT JOIN nq_scenes s ON s.id = p.scene_id
            LEFT JOIN nq_companions cp ON cp.id = p.companion_id
            WHERE c.id = :child_id
            LIMIT 1
        SQL;

        $statement = $this->pdo->prepare($sql);
        $statement->execute(['child_id' => $childId]);
        $row = $statement->fetch();

        return $row ?: null;
        */

        return null;
    }
}
