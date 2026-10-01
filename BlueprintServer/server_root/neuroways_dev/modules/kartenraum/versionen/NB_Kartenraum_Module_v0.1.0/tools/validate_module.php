<?php
declare(strict_types=1);

$root = dirname(__DIR__);
$required = [
    'module.json',
    'README.md',
    'backend/application',
    'backend/domain',
    'backend/infrastructure',
    'config',
    'database/migrations',
    'database/seeds',
    'deployment',
    'docs/decisions',
    'frontend/assets',
    'frontend/components',
    'frontend/css',
    'frontend/pages',
    'public-assets',
    'routes',
    'tests/unit',
    'tests/integration',
    'tests/e2e',
];

$errors = [];
foreach ($required as $path) {
    if (!file_exists($root . '/' . $path)) {
        $errors[] = 'Missing: ' . $path;
    }
}
$data = json_decode((string) file_get_contents($root . '/module.json'), true);
if (($data['module_code'] ?? null) !== 'nb_kartenraum') {
    $errors[] = 'Unexpected module_code';
}
if (($data['contains_secrets'] ?? true) !== false) {
    $errors[] = 'contains_secrets must be false';
}
if ($errors) {
    foreach ($errors as $error) {
        fwrite(STDERR, "ERROR: {$error}\n");
    }
    exit(1);
}
echo "PASS module structure\n";
