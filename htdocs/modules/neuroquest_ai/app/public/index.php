<?php
declare(strict_types=1);

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

require dirname(__DIR__) . '/bootstrap/app.php';

use NeuroQuest\Infrastructure\Database\Connection;

$config = require dirname(__DIR__) . '/config/database.php';

$databaseConnected = false;
$databaseMessage = '';
$databaseName = null;
$serverVersion = null;
$responseTimeMs = null;

$startedAt = microtime(true);

try {
    $pdo = Connection::create($config);

    $result = $pdo->query(
        'SELECT DATABASE() AS database_name, VERSION() AS server_version'
    )->fetch();

    $responseTimeMs = round((microtime(true) - $startedAt) * 1000, 1);
    $databaseConnected = true;
    $databaseMessage = 'Die Verbindung zur Datenbank wurde erfolgreich hergestellt.';
    $databaseName = $result['database_name'] ?? null;
    $serverVersion = $result['server_version'] ?? null;
} catch (Throwable $exception) {
    $responseTimeMs = round((microtime(true) - $startedAt) * 1000, 1);

    $technicalError = $exception->getMessage();

    if ($exception->getPrevious() !== null) {
        $technicalError .= ' | Ursache: '
            . $exception->getPrevious()->getMessage();
    }

    $databaseMessage =
        'Die Verbindung zur Datenbank konnte nicht hergestellt werden. '
        . $technicalError;

    error_log(
        '[NeuroQuest Startseite] '
        . $exception->getMessage()
        . ' | Previous: '
        . ($exception->getPrevious()?->getMessage() ?? 'none')
    );
}

$statusClass = $databaseConnected
    ? 'database-status--success'
    : 'database-status--error';

$statusLabel = $databaseConnected
    ? 'Datenbank verbunden'
    : 'Datenbank nicht erreichbar';
?>
<!doctype html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>NeuroQuest</title>

    <style>
        :root {
            font-family:
                system-ui,
                -apple-system,
                BlinkMacSystemFont,
                "Segoe UI",
                sans-serif;

            color: #243447;
            background: #f6f5ef;
        }

        * {
            box-sizing: border-box;
        }

        body {
            min-height: 100vh;
            margin: 0;
            padding: 24px;
            display: grid;
            place-items: center;
        }

        main {
            width: min(760px, 100%);
        }

        .hero,
        .database-status {
            background: #ffffff;
            border: 1px solid #dfe4e7;
            border-radius: 22px;
            padding: 28px;
            box-shadow: 0 14px 40px rgba(36, 52, 71, 0.08);
        }

        .hero {
            margin-bottom: 20px;
        }

        .eyebrow {
            margin: 0 0 10px;
            font-size: 0.8rem;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #477c73;
        }

        h1 {
            margin: 0 0 12px;
            font-size: clamp(2rem, 5vw, 3.4rem);
        }

        p {
            line-height: 1.6;
        }

        .database-status {
            border-left-width: 8px;
        }

        .database-status--success {
            border-left-color: #2f8f6d;
            background: #f2fbf7;
        }

        .database-status--error {
            border-left-color: #bd554c;
            background: #fff6f5;
        }

        .status-title {
            margin: 0 0 16px;
            font-size: 1.3rem;
        }

        dl {
            display: grid;
            grid-template-columns: 170px 1fr;
            gap: 10px 18px;
            margin: 22px 0 0;
        }

        dt {
            font-weight: 700;
        }

        dd {
            margin: 0;
            overflow-wrap: anywhere;
        }

        .status-dot {
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-right: 8px;
            border-radius: 50%;
            background: currentColor;
        }

        .security-note {
            margin-top: 20px;
            color: #596777;
            font-size: 0.94rem;
        }

        @media (max-width: 560px) {
            body {
                padding: 14px;
            }

            .hero,
            .database-status {
                padding: 22px;
            }

            dl {
                grid-template-columns: 1fr;
                gap: 4px;
            }

            dd {
                margin-bottom: 10px;
            }
        }
    </style>
</head>

<body>
<main>
    <section class="hero">
        <p class="eyebrow">NeuroQuest</p>
        <h1>Die PWA-Grundstruktur ist bereit.</h1>
        <p>
            Diese Startseite prüft aktuell bei jedem Aufruf die Verbindung
            zur NeuroQuest-Datenbank.
        </p>
    </section>

    <section class="database-status <?= htmlspecialchars($statusClass, ENT_QUOTES, 'UTF-8') ?>">
        <h2 class="status-title">
            <span class="status-dot"></span>
            <?= htmlspecialchars($statusLabel, ENT_QUOTES, 'UTF-8') ?>
        </h2>

        <p>
            <?= htmlspecialchars($databaseMessage, ENT_QUOTES, 'UTF-8') ?>
        </p>

        <dl>
            <dt>Host</dt>
            <dd>
                <?= htmlspecialchars((string) $config['host'], ENT_QUOTES, 'UTF-8') ?>
            </dd>

            <dt>Datenbank</dt>
            <dd>
                <?= htmlspecialchars(
                    (string) ($databaseName ?? $config['database']),
                    ENT_QUOTES,
                    'UTF-8'
                ) ?>
            </dd>

            <dt>Serverversion</dt>
            <dd>
                <?= htmlspecialchars(
                    (string) ($serverVersion ?? 'nicht verfügbar'),
                    ENT_QUOTES,
                    'UTF-8'
                ) ?>
            </dd>

            <dt>Antwortzeit</dt>
            <dd>
                <?= htmlspecialchars((string) $responseTimeMs, ENT_QUOTES, 'UTF-8') ?>
                ms
            </dd>

            <dt>PHP-Version</dt>
            <dd>
                <?= htmlspecialchars(PHP_VERSION, ENT_QUOTES, 'UTF-8') ?>
            </dd>
        </dl>

        <p class="security-note">
            Benutzername und Passwort werden nicht angezeigt.
        </p>
    </section>
</main>
</body>
</html>