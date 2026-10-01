<?php
declare(strict_types=1);

namespace NeuroWays\NeuroBalance\Kartenraum\Application;

use NeuroWays\NeuroBalance\Kartenraum\Domain\CardRepository;
use InvalidArgumentException;

final class CardService
{
    private const AUDIENCES = ['ADULT', 'CHILD'];
    private const LANGUAGES = ['de'];

    public function __construct(private CardRepository $repo) {}

    public function cards(): array
    {
        return $this->repo->allCards();
    }

    public function card(string $cardId): ?array
    {
        return $this->repo->findCard($cardId);
    }

    public function text(string $cardId, string $audience, string $language): ?array
    {
        $audience = strtoupper(trim($audience));
        $language = strtolower(trim($language));

        if (!in_array($audience, self::AUDIENCES, true)) {
            throw new InvalidArgumentException('Unsupported audience.');
        }
        if (!in_array($language, self::LANGUAGES, true)) {
            throw new InvalidArgumentException('Unsupported language.');
        }

        return $this->repo->findText($cardId, $audience, $language);
    }
}
