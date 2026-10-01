<?php
declare(strict_types=1);

namespace NeuroWays\NeuroBalance\Kartenraum\Application;

use PDO;
use RuntimeException;

final class JournalService
{
    public function __construct(private PDO $pdo) {}

    public function createDraw(int $profileId, string $cardId, string $orientation, string $audience, string $language): array
    {
        if (!in_array($orientation, ['UPRIGHT','REVERSED'], true)) {
            throw new RuntimeException('ORIENTATION_INVALID');
        }

        $stmt = $this->pdo->prepare(
            "INSERT INTO nb_card_draw(profile_id,card_id,orientation_code,audience_code,language_code)
             VALUES (:profile,:card,:orientation,:audience,:language)"
        );
        $stmt->execute([
            'profile'=>$profileId,'card'=>$cardId,'orientation'=>$orientation,
            'audience'=>$audience,'language'=>$language
        ]);

        $id=(int)$this->pdo->lastInsertId();
        $q=$this->pdo->prepare(
            "SELECT draw_id,card_id,orientation_code,audience_code,language_code,drawn_at
             FROM nb_card_draw WHERE draw_id=:id"
        );
        $q->execute(['id'=>$id]);
        return $q->fetch();
    }

    public function savePerception(int $profileId, int $drawId, string $text): array
    {
        $text=trim($text);
        if ($text==='') throw new RuntimeException('PERCEPTION_EMPTY');

        $check=$this->pdo->prepare(
            "SELECT draw_id FROM nb_card_draw WHERE draw_id=:draw AND profile_id=:profile LIMIT 1"
        );
        $check->execute(['draw'=>$drawId,'profile'=>$profileId]);
        if (!$check->fetch()) throw new RuntimeException('DRAW_NOT_FOUND');

        $stmt=$this->pdo->prepare(
            "INSERT INTO nb_card_perception(draw_id,profile_id,perception_text)
             VALUES (:draw,:profile,:text)
             ON DUPLICATE KEY UPDATE perception_text=VALUES(perception_text),updated_at=CURRENT_TIMESTAMP"
        );
        $stmt->execute(['draw'=>$drawId,'profile'=>$profileId,'text'=>$text]);

        return ['draw_id'=>$drawId,'perception_text'=>$text];
    }

    public function journal(int $profileId, int $limit=50): array
    {
        $limit=max(1,min($limit,200));
        $sql="
          SELECT d.draw_id,d.card_id,c.title_de,d.orientation_code,d.audience_code,d.language_code,
                 d.drawn_at,p.perception_text,p.updated_at AS perception_updated_at
          FROM nb_card_draw d
          JOIN nb_card c ON c.card_id=d.card_id
          LEFT JOIN nb_card_perception p ON p.draw_id=d.draw_id
          WHERE d.profile_id=:profile
          ORDER BY d.drawn_at DESC,d.draw_id DESC
          LIMIT {$limit}";
        $stmt=$this->pdo->prepare($sql);
        $stmt->execute(['profile'=>$profileId]);
        return $stmt->fetchAll();
    }
    public function experiences(int $profileId, int $drawId): array
    {
        $this->requireOwnedDraw($profileId, $drawId);

        $stmt=$this->pdo->prepare(
            "SELECT experience_id,draw_id,experience_text,experienced_at,created_at,updated_at
             FROM nb_card_experience
             WHERE draw_id=:draw AND profile_id=:profile
             ORDER BY experienced_at ASC,experience_id ASC"
        );
        $stmt->execute(['draw'=>$drawId,'profile'=>$profileId]);
        return $stmt->fetchAll();
    }

    public function addExperience(int $profileId, int $drawId, string $text, ?string $experiencedAt=null): array
    {
        $text=trim($text);
        if ($text==='') throw new RuntimeException('EXPERIENCE_EMPTY');
        if (mb_strlen($text,'UTF-8') > 10000) throw new RuntimeException('EXPERIENCE_TOO_LONG');

        $this->requireOwnedDraw($profileId, $drawId);

        $experiencedAt=trim((string)$experiencedAt);
        if ($experiencedAt==='') {
            $experiencedAt=(new \DateTimeImmutable())->format('Y-m-d H:i:s');
        } else {
            $dt=\DateTimeImmutable::createFromFormat('Y-m-d H:i:s',$experiencedAt);
            if (!$dt || $dt->format('Y-m-d H:i:s')!==$experiencedAt) {
                throw new RuntimeException('EXPERIENCED_AT_INVALID');
            }
        }

        $stmt=$this->pdo->prepare(
            "INSERT INTO nb_card_experience(profile_id,draw_id,experience_text,experienced_at)
             VALUES (:profile,:draw,:text,:experienced_at)"
        );
        $stmt->execute([
            'profile'=>$profileId,'draw'=>$drawId,'text'=>$text,'experienced_at'=>$experiencedAt
        ]);

        $id=(int)$this->pdo->lastInsertId();
        $q=$this->pdo->prepare(
            "SELECT experience_id,draw_id,experience_text,experienced_at,created_at,updated_at
             FROM nb_card_experience
             WHERE experience_id=:id AND profile_id=:profile LIMIT 1"
        );
        $q->execute(['id'=>$id,'profile'=>$profileId]);
        $row=$q->fetch();
        if (!$row) throw new RuntimeException('EXPERIENCE_SAVE_FAILED');
        return $row;
    }

    private function requireOwnedDraw(int $profileId, int $drawId): void
    {
        if ($drawId < 1) throw new RuntimeException('DRAW_NOT_FOUND');
        $check=$this->pdo->prepare(
            "SELECT draw_id FROM nb_card_draw WHERE draw_id=:draw AND profile_id=:profile LIMIT 1"
        );
        $check->execute(['draw'=>$drawId,'profile'=>$profileId]);
        if (!$check->fetch()) throw new RuntimeException('DRAW_NOT_FOUND');
    }

}
