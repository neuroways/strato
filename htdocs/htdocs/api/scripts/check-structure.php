<?php
declare(strict_types=1);

$required = [
    __DIR__ . '/../config/config.php',
    __DIR__ . '/../api/index.php',
    __DIR__ . '/../api/routes/api.php',
    __DIR__ . '/../api/utils/Response.php',
];

$missing = array_filter(
    $required,
    static fn(string $file): bool => !is_file($file)
);

if ($missing !== []) {
    fwrite(STDERR, "Fehlende Dateien:\n" . implode("\n", $missing) . "\n");
    exit(1);
}

echo "Grundstruktur vollständig.\n";
