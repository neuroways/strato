<?php

declare(strict_types=1);

final class ComposerAutoloadIntegrationTest
{
    /** @return list<string> */
    public static function run(string $backendRoot): array
    {
        $failures = [];
        $bootstrap = $backendRoot . '/bootstrap.php';
        $composer = $backendRoot . '/composer.json';

        if (!is_file($bootstrap)) {
            return ['backend/bootstrap.php is missing.'];
        }

        if (!is_file($composer)) {
            return ['backend/composer.json is missing.'];
        }

        $source = file_get_contents($bootstrap);
        if ($source === false) {
            return ['backend/bootstrap.php could not be read.'];
        }

        if (!str_contains($source, "vendor/autoload.php")) {
            $failures[] = 'bootstrap.php does not reference vendor/autoload.php.';
        }

        if (!str_contains($source, 'is_file($composerAutoload)')) {
            $failures[] = 'bootstrap.php does not guard Composer autoload availability.';
        }

        if (!str_contains($source, 'spl_autoload_register')) {
            $failures[] = 'deployment-safe fallback autoloader is missing.';
        }

        $decoded = json_decode((string) file_get_contents($composer), true);
        if (!is_array($decoded)) {
            $failures[] = 'composer.json is not valid JSON.';
        } elseif (($decoded['autoload']['psr-4']['TT\\'] ?? null) !== 'src/') {
            $failures[] = 'composer.json PSR-4 mapping TT\\ => src/ is missing.';
        }

        return $failures;
    }
}
