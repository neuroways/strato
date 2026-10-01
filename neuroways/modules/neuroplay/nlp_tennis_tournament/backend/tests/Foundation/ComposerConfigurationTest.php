<?php

declare(strict_types=1);

$composerFile = dirname(__DIR__, 2) . '/composer.json';

if (!is_file($composerFile)) {
    throw new RuntimeException('backend/composer.json is missing.');
}

$config = json_decode((string) file_get_contents($composerFile), true, 512, JSON_THROW_ON_ERROR);

if (($config['require']['php'] ?? null) !== '^8.2') {
    throw new RuntimeException('Expected PHP requirement ^8.2.');
}

if (($config['autoload']['psr-4']['TT\\'] ?? null) !== 'src/') {
    throw new RuntimeException('Expected PSR-4 mapping TT\\ => src/.');
}

if (($config['type'] ?? null) !== 'project') {
    throw new RuntimeException('Expected Composer package type project.');
}
