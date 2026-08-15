<?php
declare(strict_types=1);

require dirname(__DIR__, 2) . '/bootstrap/app.php';

use NeuroQuest\Infrastructure\Database\Connection;

header('Content-Type: text/html; charset=utf-8');
header('X-Robots-Tag: noindex, nofollow', true);

$config = require NEUROQUEST_ROOT . '/config/database.php';
$testConfig = $config['connection_test'] ?? [];

$enabled = (bool) ($testConfig['enabled'] ?? false);
$expectedKey = (string) ($testConfig['access_key'] ?? '');
$providedKey = (string) ($_GET['key'] ?? '');

if (
    !$enabled
    || $expectedKey === ''
    || !hash_equals($expectedKey, $providedKey)
) {
    http_response_code(404);
    echo '<!doctype html><html lang="de"><head><meta charset="utf-8">';
    echo '<title>Nicht gefunden</title></head><body><h1>404</h1></body></html>';
    exit;
}

$success = false;
$message = '';
$serverVersion = null;
$databaseName = null;
$responseTimeMs = null;

$startedAt = microtime(true);

try {
    $pdo = Connection::create($config);
    $result = $pdo->query(
        'SELECT DATABASE() AS database_name, VERSION() AS server_version'
    )->fetch();

    $responseTimeMs = round((microtime(true) - $startedAt) * 1000, 1);
    $databaseName = $result['database_name'] ?? null;
    $serverVersion = $result['server_version'] ?? null;
    $success = true;
    $message = 'Die Verbindung zur Datenbank wurde erfolgreich hergestellt.';
} catch (Throwable $exception) {
    $responseTimeMs = round((microtime(true) - $startedAt) * 1000, 1);
    $message = 'Die Verbindung zur Datenbank konnte nicht hergestellt werden.';
    error_log(
        '[NeuroQuest database test] '
        . $exception->getMessage()
        . ' | Previous: '
        . ($exception->getPrevious()?->getMessage() ?? 'none')
    );
}

$statusClass = $success ? 'status--success' : 'status--error';
$statusLabel = $success ? 'Verbindung erfolgreich' : 'Verbindung fehlgeschlagen';
?>
<!doctype html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>NeuroQuest – Datenbanktest</title>
    <style>
        :root {
            color-scheme: light;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            background: #f7f7f4;
            color: #203047;
        }

        * { box-sizing: border-box; }

        body {
            min-height: 100vh;
            margin: 0;
            display: grid;
            place-items: center;
            padding: 24px;
        }

        main {
            width: min(680px, 100%);
            background: #fff;
            border: 1px solid #dce1e5;
            border-radius: 20px;
            padding: 28px;
            box-shadow: 0 12px 36px rgba(32, 48, 71, 0.08);
        }

        h1 { margin-top: 0; }

        .status {
            border-radius: 14px;
            padding: 18px;
            margin: 20px 0;
        }

        .status--success {
            background: #eaf7f1;
            border: 1px solid #72b69b;
        }

        .status--error {
            background: #fff0ef;
            border: 1px solid #d68a83;
        }

        dl {
            display: grid;
            grid-template-columns: 150px 1fr;
            gap: 10px 18px;
        }

        dt { font-weight: 700; }
        dd { margin: 0; overflow-wrap: anywhere; }

        code {
            background: #eef1f3;
            border-radius: 5px;
            padding: 2px 6px;
        }

        .notice {
            margin-top: 24px;
            padding-top: 18px;
            border-top: 1px solid #dce1e5;
            color: #536273;
        }

        @media (max-width: 520px) {
            dl { grid-template-columns: 1fr; gap: 4px; }
            dd { margin-bottom: 10px; }
        }
    </style>
</head>
<body>
<main>
    <p>NEUROQUEST / SYSTEMTEST</p>
    <h1>Datenbankverbindung</h1>

    <section class="status <?= htmlspecialchars($statusClass, ENT_QUOTES, 'UTF-8') ?>">
        <strong><?= htmlspecialchars($statusLabel, ENT_QUOTES, 'UTF-8') ?></strong>
        <p><?= htmlspecialchars($message, ENT_QUOTES, 'UTF-8') ?></p>
    </section>

    <dl>
        <dt>Host</dt>
        <dd><?= htmlspecialchars((string) $config['host'], ENT_QUOTES, 'UTF-8') ?></dd>

        <dt>Datenbank</dt>
        <dd><?= htmlspecialchars((string) ($databaseName ?? $config['database']), ENT_QUOTES, 'UTF-8') ?></dd>

        <dt>Serverversion</dt>
        <dd><?= htmlspecialchars((string) ($serverVersion ?? 'nicht verfügbar'), ENT_QUOTES, 'UTF-8') ?></dd>

        <dt>Antwortzeit</dt>
        <dd><?= htmlspecialchars((string) $responseTimeMs, ENT_QUOTES, 'UTF-8') ?> ms</dd>

        <dt>PDO-Treiber</dt>
        <dd>mysql</dd>
    </dl>

    <p class="notice">
        Nach erfolgreichem Test in <code>config/database.php</code>
        <code>connection_test.enabled</code> auf <code>false</code> setzen.
        Die Seite gibt niemals Benutzername oder Passwort aus.
    </p>
</main>
</body>
</html>
