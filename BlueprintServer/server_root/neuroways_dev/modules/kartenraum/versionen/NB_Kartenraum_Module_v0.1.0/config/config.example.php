<?php
return [
    'module' => [
        'enabled' => true,
        'route_base' => '/neurobalance/kartenraum',
    ],
    'persistence' => [
        'connection_key' => null, // Core resolves this.
    ],
    'identity' => [
        'scope_provider' => null, // Core resolves this.
    ],
    'features' => [
        'allow_redraw' => false,
        'journal_enabled' => true,
    ],
    'assets' => [
        'base_url' => null,
    ],
];
