<?php
declare(strict_types=1);

namespace NeuroWays\NeuroBalance\Kartenraum\Application;

use NeuroWays\NeuroBalance\Kartenraum\Domain\CardRepository;
use NeuroWays\NeuroBalance\Kartenraum\Domain\DrawRepository;
use NeuroWays\NeuroBalance\Kartenraum\Domain\DailyDrawService;

final class DrawCardHandler
{
    public function __construct(
        private readonly CardRepository $cards,
        private readonly DrawRepository $draws,
        private readonly DailyDrawService $service,
    ) {}

    public function handle(string $scopeId, string $deckId, string $date): array
    {
        if ($scopeId === '') {
            throw new \RuntimeException('Default deny: unresolved identity scope.');
        }

        $draw = $this->service->draw(
            $scopeId,
            $deckId,
            $date,
            $this->cards,
            $this->draws,
            static fn (int $count): int => random_int(0, $count - 1)
        );

        $card = $this->cards->find($draw->cardId);
        if ($card === null) {
            throw new \RuntimeException('Draw references unknown card.');
        }

        return [
            'draw_id' => $draw->id,
            'draw_date' => $draw->drawDate,
            'card' => [
                'id' => $card->id,
                'title' => $card->title,
                'short_text' => $card->shortText,
                'image_ref' => $card->imageRef,
            ],
        ];
    }
}
