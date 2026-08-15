<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');

$fallbackPath = dirname(__DIR__) . '/data/default-story.json';
$configPath = dirname(__DIR__) . '/config/config.php';

function sendJson(array $payload, int $status = 200): never
{
    http_response_code($status);
    echo json_encode(
        $payload,
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT
    );
    exit;
}

function sendFallback(string $path, string $reason): never
{
    $json = @file_get_contents($path);

    if ($json === false) {
        sendJson([
            'apiVersion' => '0.3.2',
            'source' => 'error',
            'reason' => $reason,
            'error' => 'Standardgeschichte fehlt.',
        ], 500);
    }

    $data = json_decode($json, true);

    sendJson([
        'apiVersion' => '0.3.2',
        'source' => 'fallback',
        'reason' => $reason,
        'data' => is_array($data) ? $data : null,
    ]);
}

if (!is_file($configPath)) {
    sendFallback($fallbackPath, 'config_missing');
}

$config = require $configPath;
$db = $config['database'] ?? [];

if (empty($db['enabled'])) {
    sendFallback($fallbackPath, 'database_disabled');
}

$host = trim((string) ($db['host'] ?? ''));
$port = (int) ($db['port'] ?? 3306);
$database = trim((string) ($db['database'] ?? ''));
$username = trim((string) ($db['username'] ?? ''));
$password = (string) ($db['password'] ?? '');
$charset = trim((string) ($db['charset'] ?? 'utf8mb4'));

if ($host === '' || $database === '' || $username === '' || $password === '') {
    sendFallback($fallbackPath, 'database_config_incomplete');
}

$day = filter_input(INPUT_GET, 'day', FILTER_VALIDATE_INT, [
    'options' => ['default' => 1, 'min_range' => 1, 'max_range' => 99],
]);

$mission = filter_input(INPUT_GET, 'mission', FILTER_VALIDATE_INT, [
    'options' => ['default' => 1, 'min_range' => 1, 'max_range' => 99],
]);

try {
    $dsn = sprintf(
        'mysql:host=%s;port=%d;dbname=%s;charset=%s',
        $host,
        $port,
        $database,
        $charset
    );

    $pdo = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::ATTR_TIMEOUT => 3,
    ]);

    $statement = $pdo->prepare(
        'SELECT
            d.id AS story_day_id,
            d.story_id,
            d.day_number,
            d.title AS day_title,
            d.location_name,
            d.arrival_headline,
            d.arrival_text,
            d.completion_text,
            p.id AS story_part_id,
            p.round_number,
            p.part_number,
            p.text_content
         FROM nq_story_days d
         INNER JOIN nq_story_parts p
            ON p.story_day_id = d.id
         WHERE d.day_number = :day
           AND p.round_number = :mission
         ORDER BY d.story_id ASC, p.part_number ASC
         LIMIT 1'
    );

    $statement->execute([
        'day' => $day,
        'mission' => $mission,
    ]);

    $row = $statement->fetch();

    if (!$row || trim((string) ($row['text_content'] ?? '')) === '') {
        sendFallback($fallbackPath, 'story_not_found');
    }

    sendJson([
        'apiVersion' => '0.3.2',
        'source' => 'database',
        'data' => [
            'storyId' => (int) $row['story_id'],
            'storyDayId' => (int) $row['story_day_id'],
            'storyPartId' => (int) $row['story_part_id'],
            'day' => (int) $row['day_number'],
            'mission' => (int) $row['round_number'],
            'part' => (int) $row['part_number'],
            'title' => (string) $row['day_title'],
            'locationName' => (string) $row['location_name'],
            'arrivalHeadline' => (string) $row['arrival_headline'],
            'arrivalText' => (string) $row['arrival_text'],
            'completionText' => (string) $row['completion_text'],
            'text' => (string) $row['text_content'],
        ],
    ]);
} catch (Throwable $error) {
    error_log('[NeuroQuest] story.php v0.3.2: ' . $error->getMessage());

    sendJson([
        'apiVersion' => '0.3.2',
        'source' => 'fallback',
        'reason' => 'database_unavailable',
        'debugMessage' => $error->getMessage(),
        'data' => json_decode((string) @file_get_contents($fallbackPath), true),
    ]);
}
