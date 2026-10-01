<?php
declare(strict_types=1);

namespace NeuroWays\NeuroBalance\Kartenraum\Infrastructure;

use NeuroWays\NeuroBalance\Kartenraum\Domain\Card;
use NeuroWays\NeuroBalance\Kartenraum\Domain\CardRepository;

final class DevFixtureCardRepository implements CardRepository
{
    /** @var Card[] */
    private array $cards = [];

    public function __construct(string $fixturePath)
    {
        $raw = json_decode((string) file_get_contents($fixturePath), true, 512, JSON_THROW_ON_ERROR);
        foreach ($raw['cards'] ?? [] as $item) {
            $this->cards[] = new Card(
                (string) $item['id'],
                (string) $item['deck_id'],
                (string) $item['title'],
                (string) $item['short_text'],
                $item['image_ref'] ?? null
            );
        }
    }

    public function activeCardsForDeck(string $deckId): array
    {
        return array_values(array_filter(
            $this->cards,
            static fn (Card $card): bool => $card->deckId === $deckId
        ));
    }

    public function find(string $cardId): ?Card
    {
        foreach ($this->cards as $card) {
            if ($card->id === $cardId) {
                return $card;
            }
        }
        return null;
    }
}
