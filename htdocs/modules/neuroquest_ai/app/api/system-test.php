<?php
declare(strict_types=1);

header('Content-Type: text/plain; charset=utf-8');
header('Cache-Control: no-store');

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

echo "NeuroQuest Systemtest\n";
echo "=====================\n\n";

echo "PHP-Version: " . PHP_VERSION . "\n";
echo "PHP-Datei erreichbar: JA\n\n";

$configPath = __DIR__ . '/../config/config.php';

echo "Konfigurationsdatei:\n";
echo $configPath . "\n";

if (!is_file($configPath)) {
    echo "Status: FEHLT\n";
    exit;
}

echo "Status: VORHANDEN\n\n";

try {
    $config = require $configPath;
} catch (Throwable $error) {
    echo "Fehler beim Laden der config.php:\n";
    echo get_class($error) . ': ' . $error->getMessage() . "\n";
    echo "Datei: " . $error->getFile() . "\n";
    echo "Zeile: " . $error->getLine() . "\n";
    exit;
}

if (!is_array($config)) {
    echo "Fehler: config.php gibt kein Array zurück.\n";
    exit;
}

echo "config.php konnte geladen werden.\n\n";

$database = $config['database'] ?? null;

if (!is_array($database)) {
    echo "Fehler: Bereich 'database' fehlt.\n";
    exit;
}

$enabled = (bool) ($database['enabled'] ?? false);

echo "Datenbank aktiviert: " . ($enabled ? 'JA' : 'NEIN') . "\n";

if (!$enabled) {
    echo "Die Datenbank ist in config.php deaktiviert.\n";
    exit;
}


$host = trim((string) ($database['host'] ?? ''));
$port = (int) ($database['port'] ?? 3306);
$name = trim((string) ($database['database'] ?? ''));
$user = trim((string) ($database['username'] ?? ''));
$password = (string) ($database['password'] ?? '');

echo "Host vorhanden: " . ($host !== '' ? 'JA' : 'NEIN') . "\n";
echo "Datenbankname vorhanden: " . ($name !== '' ? 'JA' : 'NEIN') . "\n";
echo "Benutzer vorhanden: " . ($user !== '' ? 'JA' : 'NEIN') . "\n";
echo "Passwort vorhanden: " . ($password !== '' ? 'JA' : 'NEIN') . "\n\n";

if ($host === '' || $name === '' || $user === '' || $password === '') {
    echo "Fehler: Zugangsdaten sind unvollständig.\n";
    exit;
}

try {
    $dsn = sprintf(
        'mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4',
        $host,
        $port,
        $name
    );

    $pdo = new PDO(
        $dsn,
        $user,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );

    echo "Datenbankverbindung: ERFOLGREICH\n";
    echo "Serverversion: " . $pdo->getAttribute(PDO::ATTR_SERVER_VERSION) . "\n\n";

    $requiredTables = [
        'nq_story_worlds',
        'nq_story_regions',
        'nq_story_weeks',
        'nq_story_days',
        'nq_story_parts',
    ];

    echo "Tabellenprüfung:\n";

    foreach ($requiredTables as $table) {
        $statement = $pdo->prepare(
            'SELECT COUNT(*)
             FROM information_schema.tables
             WHERE table_schema = :database_name
               AND table_name = :table_name'
        );

        $statement->execute([
            'database_name' => $name,
            'table_name' => $table,
        ]);

        $exists = (int) $statement->fetchColumn() > 0;

        echo '- ' . $table . ': ' . ($exists ? 'VORHANDEN' : 'FEHLT') . "\n";
    }

    echo "\nSystemtest abgeschlossen.\n";
} catch (Throwable $error) {
    echo "Datenbankverbindung: FEHLGESCHLAGEN\n\n";
    echo get_class($error) . ': ' . $error->getMessage() . "\n";
    echo "Datei: " . $error->getFile() . "\n";
    echo "Zeile: " . $error->getLine() . "\n";
}