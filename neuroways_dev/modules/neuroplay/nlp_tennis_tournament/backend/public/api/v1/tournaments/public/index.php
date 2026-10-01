<?php

declare(strict_types=1);

use TT\Application\PublicTournament\PublicTournamentService;
use TT\Infrastructure\Persistence\PDO\Connection\DatabaseConnection;
use TT\Infrastructure\Persistence\PDO\Tournament\PdoPublicTournamentRepository;

require dirname(__DIR__, 5) . '/bootstrap.php';

header('Content-Type: application/json; charset=utf-8');

try {
    $configuration = require dirname(__DIR__, 5) . '/config/database.php';
    $db = $configuration['database'] ?? [];

    $pdo = DatabaseConnection::connect($db);
    $service = new PublicTournamentService(
        new PdoPublicTournamentRepository($pdo)
    );

    $viewModel = $service->getCurrent();

    if ($viewModel === null) {
        http_response_code(404);
        echo json_encode([
            'status' => 'error',
            'code' => 'tournament_not_found',
            'message' => 'No public tournament is available.',
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;
        return;
    }

    echo json_encode([
        'status' => 'ok',
        'data' => $viewModel,
        'timestamp_utc' => gmdate(DATE_ATOM),
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;
} catch (Throwable $exception) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'code' => 'public_tournament_failed',
        'message' => 'Public tournament data could not be loaded.',
        'timestamp_utc' => gmdate(DATE_ATOM),
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;
}
