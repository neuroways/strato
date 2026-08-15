<?php
declare(strict_types=1);

namespace NeuroWays\Api\Routes;

use NeuroWays\Api\Utils\Response;

final class Router
{
    private array $routes = [];

    public function get(string $path, array $handler): void
    {
        $this->routes['GET'][$path] = $handler;
    }

    public function post(string $path, array $handler): void
    {
        $this->routes['POST'][$path] = $handler;
    }

    public function dispatch(string $method, string $uri): void
    {
        $path = parse_url($uri, PHP_URL_PATH) ?: '/';
        $handler = $this->routes[$method][$path] ?? null;

        if ($handler === null) {
            Response::json([
                'success' => false,
                'error' => 'Route nicht gefunden.',
            ], 404);
            return;
        }

        [$class, $action] = $handler;
        (new $class())->{$action}();
    }
}
