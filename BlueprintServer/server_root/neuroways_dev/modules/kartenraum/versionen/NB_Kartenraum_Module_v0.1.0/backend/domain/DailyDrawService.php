<?php
declare(strict_types=1);

namespace NeuroWays\NeuroBalance\Kartenraum\Domain;

final class DailyDrawService
{
    /**
     * DEV/Pilot selection rule:
     * - existing draw for scope+date wins
     * - otherwise choose one card via injectable random index
     * Production redraw semantics remain an explicit open decision.
     */
    public function draw(
        string $scopeId,
        string $deckId,
        string $date,
        CardRepository $cards,
        DrawRepository $draws,
        callable $randomIndex
    ): Draw {
        $existing = $draws->findDailyDraw($scopeId, $date);
        if ($existing !== null) {
            return $existing;
        }

        $available = $cards->activeCardsForDeck($deckId);
        if ($available === []) {
            throw new \RuntimeException('No active cards available.');
        }

        $index = (int) $randomIndex(count($available));
        if ($index < 0 || $index >= count($available)) {
            throw new \OutOfBoundsException('Random index outside card range.');
        }

        $card = $available[$index];
        $draw = new Draw(
            bin2hex(random_bytes(8)),
            $scopeId,
            $card->id,
            $date,
            gmdate('c')
        );
        $draws->save($draw);

        return $draw;
    }
}
