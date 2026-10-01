<?php
declare(strict_types=1);

namespace NeuroWays\NeuroBalance\Kartenraum\Infrastructure;

use NeuroWays\NeuroBalance\Kartenraum\Domain\CardRepository;
use PDO;

final class MariaDbCardRepository implements CardRepository
{
    public function __construct(private PDO $pdo) {}

    public function allCards(): array
    {
        $stmt = $this->pdo->query(
            "SELECT card_id, arcana_code, suit_code, rank_code, major_number,
                    title_de, sheet_name, sheet_position, status_code
             FROM nb_card
             WHERE status_code = 'active'
             ORDER BY
               CASE WHEN arcana_code = 'major' THEN 0 ELSE 1 END,
               major_number,
               suit_code,
               rank_code,
               card_id"
        );
        return $stmt->fetchAll();
    }

    public function findCard(string $cardId): ?array
    {
        $stmt = $this->pdo->prepare(
            "SELECT card_id, arcana_code, suit_code, rank_code, major_number,
                    title_de, sheet_name, sheet_position, status_code
             FROM nb_card
             WHERE card_id = :card_id
             LIMIT 1"
        );
        $stmt->execute(['card_id' => $cardId]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public function findText(string $cardId, string $audience, string $language): ?array
    {
        $stmt = $this->pdo->prepare(
            "SELECT card_text_id, card_id, audience_code, language_code, content_version,
                    title, subtitle, reflection_keywords,
                    what_do_you_see, card_room, helpful_side, difficult_side,
                    context_questions_json, own_card_language,
                    possible_next_step, status_code
             FROM nb_card_text
             WHERE card_id = :card_id
               AND audience_code = :audience
               AND language_code = :language
             ORDER BY card_text_id DESC
             LIMIT 1"
        );
        $stmt->execute([
            'card_id' => $cardId,
            'audience' => $audience,
            'language' => $language,
        ]);

        $row = $stmt->fetch();
        if (!$row) {
            return null;
        }

        $questions = json_decode((string)$row['context_questions_json'], true);
        $row['context_questions'] = is_array($questions) ? $questions : [];
        unset($row['context_questions_json']);

        return $row;
    }
}
