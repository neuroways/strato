<?php
declare(strict_types=1);

define('NEUROQUEST_ROOT', dirname(__DIR__));

spl_autoload_register(
    static function (string $class): void {
        $prefix = 'NeuroQuest\\';
        $baseDirectory = NEUROQUEST_ROOT . '/src/';

        if (!str_starts_with($class, $prefix)) {
            return;
        }

        $relativeClass = substr($class, strlen($prefix));
        $file = $baseDirectory
            . str_replace('\\', DIRECTORY_SEPARATOR, $relativeClass)
            . '.php';

        if (is_file($file)) {
            require $file;
        }
    }
);
