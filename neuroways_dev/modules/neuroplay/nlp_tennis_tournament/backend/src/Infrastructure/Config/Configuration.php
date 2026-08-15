<?php

declare(strict_types=1);

namespace TT\Infrastructure\Config;

use InvalidArgumentException;

final class Configuration
{
    /** @param array<string, mixed> $values */
    public function __construct(private readonly array $values)
    {
    }

    public static function fromFile(string $file): self
    {
        if (!is_file($file)) {
            throw new InvalidArgumentException(sprintf('Configuration file not found: %s', $file));
        }

        $values = require $file;
        if (!is_array($values)) {
            throw new InvalidArgumentException(sprintf('Configuration file must return an array: %s', $file));
        }

        return new self($values);
    }

    public function get(string $path, mixed $default = null): mixed
    {
        $segments = array_values(array_filter(explode('.', $path), static fn (string $part): bool => $part !== ''));
        if ($segments === []) {
            return $default;
        }

        $current = $this->values;
        foreach ($segments as $segment) {
            if (!is_array($current) || !array_key_exists($segment, $current)) {
                return $default;
            }
            $current = $current[$segment];
        }

        return $current;
    }

    public function requireString(string $path): string
    {
        $value = $this->get($path);
        if (!is_string($value) || $value === '') {
            throw new InvalidArgumentException(sprintf('Required configuration value "%s" is missing.', $path));
        }

        return $value;
    }
}
