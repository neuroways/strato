<?php

declare(strict_types=1);

use TT\Application\PublicTournament\PublicTournamentService;
use TT\Infrastructure\Config\Configuration;
use TT\Infrastructure\Persistence\PDO\Connection\DatabaseConnection;
use TT\Infrastructure\Persistence\PDO\Tournament\PdoPublicTournamentRepository;

$backendRoot = dirname(__DIR__, 5);

require $backendRoot . '/bootstrap.php';

header('Content-Type: application/json; charset=utf-8');

try {
    $configuration = Configuration::fromFile(
        $backendRoot . '/config/database.php'
    );

    $databaseConnection = new DatabaseConnection($configuration);
    $pdo = $databaseConnection->get();

    $repository = new PdoPublicTournamentRepository($pdo);
    $service = new PublicTournamentService($repository);

    $viewModel = $service->getCurrent();

    if ($viewModel === null) {
        http_response_code(404);

        echo json_encode([
            'status' => 'error',
            'code' => 'tournament_not_found',
            'message' => 'No public tournament is available.',
            'timestamp_utc' => gmdate(DATE_ATOM),
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL;

        return;
    }

    http_response_code(200);

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
