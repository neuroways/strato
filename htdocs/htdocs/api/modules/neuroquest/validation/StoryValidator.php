<?php
declare(strict_types=1);

namespace NeuroWays\Modules\NeuroQuest\Validation;

final class StoryValidator
{
    public function validateCreate(array $data): array
    {
        $errors = [];

        if (trim((string)($data['title'] ?? '')) === '') {
            $errors['title'] = 'Der Titel ist erforderlich.';
        }

        return $errors;
    }
}
