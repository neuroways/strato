<?php
declare(strict_types=1);

namespace NeuroWays\Modules\NeuroQuest\Domain\Entities;

final class Story
{
    public function __construct(
        public readonly int $id,
        public readonly string $title,
        public readonly bool $active
    ) {
    }
}
