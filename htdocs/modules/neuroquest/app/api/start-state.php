<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$root = dirname(__DIR__);
$configFile = dirname(__DIR__, 3) . '/config/config.php';
$exampleConfigFile = __DIR__ . '/config.example.php';

try {
    $config = file_exists($configFile)
        ? require $configFile
        : require $exampleConfigFile;

    if (($config['demo_mode'] ?? true) === true) {
        $demoFile = $root . '/data/start-state.demo.json';

        if (!file_exists($demoFile)) {
            throw new RuntimeException('Demo-Datei fehlt.');
        }

        readfile($demoFile);
        exit;
    }

    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_start();
    }

    $childId = filter_input(INPUT_GET, 'childId', FILTER_VALIDATE_INT);

    if (!$childId && isset($_SESSION['active_child_id'])) {
        $childId = (int) $_SESSION['active_child_id'];
    }

    if (!$childId) {
        http_response_code(401);
        echo json_encode([
            'error' => 'NO_ACTIVE_CHILD',
            'message' => 'Kein aktives Kinderprofil gefunden.'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    require_once $root . '/src/Repository/QuestRepository.php';
    require_once $root . '/src/Service/QuestService.php';

    $db = $config['db'];
    $dsn = sprintf(
        'mysql:host=%s;port=%d;dbname=%s;charset=%s',
        $db['host'],
        $db['port'],
        $db['name'],
        $db['charset']
    );

    $pdo = new PDO($dsn, $db['user'], $db['password'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    $repository = new QuestRepository($pdo);
    $service = new QuestService($repository);

    $state = $service->getStartState($childId);

    echo json_encode($state, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
} catch (Throwable $exception) {
    error_log('[NeuroQuest start-state] ' . $exception->getMessage());

    http_response_code(500);
    echo json_encode([
        'error' => 'START_STATE_UNAVAILABLE',
        'message' => 'Die Abenteuerkarte konnte gerade nicht geladen werden.'
    ], JSON_UNESCAPED_UNICODE);
}
