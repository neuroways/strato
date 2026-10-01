<?php
declare(strict_types=1);

/**
 * NeuroWays / Admin Startseite
 *
 * Zielpfad:
 * htdocs/public/admin/index.php
 *
 * Diese Seite prüft serverseitig die MariaDB-Verbindung und zeigt
 * eine erste technische Übersicht. Es werden ausschließlich lesende
 * Abfragen verwendet.
 */

$configFile = dirname(__DIR__, 2) . '/config/config.php';

$dashboard = [
    'connected' => false,
    'latency_ms' => null,
    'server_version' => null,
    'charset' => null,
    'database_size_mb' => 0.0,
    'table_count' => 0,
    'story_count' => 0,
    'story_tables' => [],
    'tables' => [],
    'checked_at' => (new DateTimeImmutable('now', new DateTimeZone('Europe/Berlin')))
        ->format('d.m.Y, H:i:s') . ' Uhr',
    'error' => null,
];

function safeIdentifier(string $identifier): string
{
    if (!preg_match('/^[A-Za-z0-9_]+$/', $identifier)) {
        throw new RuntimeException('Ungültiger Tabellenname.');
    }

    return '`' . str_replace('`', '``', $identifier) . '`';
}

function classifyTable(string $tableName): array
{
    $name = strtolower($tableName);

    $categories = [
        'Geschichten' => ['story', 'stories', 'geschichte', 'geschichten', 'quest', 'quests', 'adventure', 'abenteuer'],
        'Story-Tage' => ['story_day', 'story_days', 'storyday', 'chapter', 'chapters', 'kapitel'],
        'Missionen' => ['mission', 'missions', 'aufgabe', 'aufgaben'],
        'Runden' => ['round', 'rounds', 'runde', 'runden'],
        'Begleiter' => ['companion', 'companions', 'begleiter'],
        'Kinder' => ['child', 'children', 'child_profile', 'child_profiles', 'kinder'],
        'Fortschritt' => ['progress', 'progresses', 'fortschritt'],
    ];

    foreach ($categories as $label => $keywords) {
        foreach ($keywords as $keyword) {
            if (str_contains($name, $keyword)) {
                return [
                    'label' => $label,
                    'is_story' => $label === 'Geschichten',
                ];
            }
        }
    }

    return [
        'label' => 'Allgemein',
        'is_story' => false,
    ];
}

try {
    if (!is_file($configFile)) {
        throw new RuntimeException(
            'Die zentrale Konfigurationsdatei wurde nicht gefunden.'
        );
    }

    $config = require $configFile;
    $database = $config['database'] ?? null;

    if (!is_array($database)) {
        throw new RuntimeException(
            'Der Konfigurationsbereich "database" fehlt.'
        );
    }

    date_default_timezone_set(
        (string)($config['application']['timezone'] ?? 'Europe/Berlin')
    );

    $dsn = sprintf(
        'mysql:host=%s;port=%d;dbname=%s;charset=%s',
        (string)$database['host'],
        (int)($database['port'] ?? 3306),
        (string)$database['name'],
        (string)($database['charset'] ?? 'utf8mb4')
    );

    $options = $database['options'] ?? [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];

    $start = hrtime(true);

    $pdo = new PDO(
        $dsn,
        (string)$database['user'],
        (string)$database['password'],
        $options
    );

    $dashboard['latency_ms'] = round(
        (hrtime(true) - $start) / 1_000_000,
        1
    );

    $dashboard['connected'] = true;
    $dashboard['server_version'] = (string)$pdo
        ->query('SELECT VERSION()')
        ->fetchColumn();

    $dashboard['charset'] = (string)$pdo
        ->query('SELECT @@character_set_database')
        ->fetchColumn();

    $tableStatement = $pdo->prepare(
        <<<'SQL'
        SELECT
            TABLE_NAME,
            ROUND(
                (COALESCE(DATA_LENGTH, 0) + COALESCE(INDEX_LENGTH, 0))
                / 1024 / 1024,
                2
            ) AS SIZE_MB
        FROM information_schema.TABLES
        WHERE TABLE_SCHEMA = :schema
          AND TABLE_TYPE = 'BASE TABLE'
        ORDER BY TABLE_NAME
        SQL
    );

    $tableStatement->execute([
        'schema' => (string)$database['name'],
    ]);

    $tableRows = $tableStatement->fetchAll();
    $dashboard['table_count'] = count($tableRows);

    foreach ($tableRows as $tableRow) {
        $tableName = (string)$tableRow['TABLE_NAME'];
        $classification = classifyTable($tableName);

        $count = (int)$pdo
            ->query(
                sprintf(
                    'SELECT COUNT(*) FROM %s',
                    safeIdentifier($tableName)
                )
            )
            ->fetchColumn();

        $table = [
            'name' => $tableName,
            'count' => $count,
            'size_mb' => (float)$tableRow['SIZE_MB'],
            'category' => $classification['label'],
        ];

        $dashboard['tables'][] = $table;

        if ($classification['is_story']) {
            $dashboard['story_tables'][] = $tableName;
            $dashboard['story_count'] += $count;
        }
    }

    $sizeStatement = $pdo->prepare(
        <<<'SQL'
        SELECT ROUND(
            COALESCE(SUM(DATA_LENGTH + INDEX_LENGTH), 0)
            / 1024 / 1024,
            2
        )
        FROM information_schema.TABLES
        WHERE TABLE_SCHEMA = :schema
        SQL
    );

    $sizeStatement->execute([
        'schema' => (string)$database['name'],
    ]);

    $dashboard['database_size_mb'] = (float)$sizeStatement->fetchColumn();
} catch (Throwable $exception) {
    error_log('[NeuroWays Admin Dashboard] ' . $exception->getMessage());

    $dashboard['error'] =
        'Die Datenbankverbindung konnte nicht hergestellt werden. '
        . 'Technische Details wurden im Serverlog gespeichert.';
}

function e(string|int|float|null $value): string
{
    return htmlspecialchars(
        (string)$value,
        ENT_QUOTES | ENT_SUBSTITUTE,
        'UTF-8'
    );
}

function formatNumber(int|float $value): string
{
    return number_format((float)$value, 0, ',', '.');
}

function formatDecimal(float $value): string
{
    return number_format($value, 1, ',', '.');
}
?>
<!doctype html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#1F355E">

    <title>NeuroWays Administration</title>

    <link rel="stylesheet" href="../assets/css/site.css">
</head>

<body>
<main class="shell">

    <header class="topbar">
        <a href="../" class="brand">
            <span class="mark" aria-hidden="true">✦</span>
            <span>NeuroWays Administration</span>
        </a>

        <nav class="nav" aria-label="Adminnavigation">
            <a href="./">Dashboard</a>
            <a href="neuroquest/">NeuroQuest</a>
            <a href="database/">Datenbank</a>
            <a href="../">Öffentliche Seite</a>
        </nav>
    </header>

    <section class="hero">
        <p class="eyebrow">NeuroWays / Administration</p>

        <h1>Systeme ruhig im Blick behalten.</h1>

        <p>
            Die Startseite prüft die MariaDB-Verbindung serverseitig und
            zeigt den aktuellen technischen Datenbestand.
        </p>

        <div class="actions">
            <a class="button primary" href="./">
                Neu prüfen
            </a>

            <a class="button secondary" href="neuroquest/">
                NeuroQuest verwalten
            </a>
        </div>
    </section>

    <?php if ($dashboard['error'] !== null): ?>
        <section class="card" style="margin-top:24px;">
            <span class="status" style="color:#A43A3A;background:rgba(164,58,58,.12);">
                Nicht verbunden
            </span>

            <h2>Datenbank nicht erreichbar</h2>

            <p><?= e($dashboard['error']) ?></p>
        </section>
    <?php else: ?>
        <section class="grid" aria-label="Systemkennzahlen">

            <article class="card">
                <span class="status">Verbunden</span>

                <h2>Datenbank</h2>

                <span class="metric">
                    <?= e(formatDecimal((float)$dashboard['latency_ms'])) ?> ms
                </span>

                <p>
                    MariaDB <?= e($dashboard['server_version']) ?><br>
                    Zeichensatz: <?= e($dashboard['charset']) ?>
                </p>
            </article>

            <article class="card">
                <span class="status">Aktueller Bestand</span>

                <h2>Tabellen</h2>

                <span class="metric">
                    <?= e(formatNumber((int)$dashboard['table_count'])) ?>
                </span>

                <p>
                    Gesamtgröße:
                    <?= e(formatDecimal((float)$dashboard['database_size_mb'])) ?>
                    MB
                </p>
            </article>

            <article class="card">
                <span class="status">Automatisch erkannt</span>

                <h2>Geschichten</h2>

                <span class="metric">
                    <?= e(formatNumber((int)$dashboard['story_count'])) ?>
                </span>

                <p>
                    <?php if ($dashboard['story_tables'] !== []): ?>
                        Quellen:
                        <?= e(implode(', ', $dashboard['story_tables'])) ?>
                    <?php else: ?>
                        Noch keine eindeutige Story-Tabelle erkannt.
                    <?php endif; ?>
                </p>
            </article>

        </section>

        <section class="card" style="margin-top:24px; min-height:auto;">
            <span class="status">Datenbankstruktur</span>

            <h2>Tabellen und Datensätze</h2>

            <p>
                Die Werte werden direkt aus MariaDB gelesen.
                Es werden keine Tabelleninhalte angezeigt.
            </p>

            <div style="overflow-x:auto; margin-top:20px;">
                <table style="width:100%; border-collapse:collapse;">
                    <thead>
                    <tr>
                        <th style="text-align:left;padding:12px;border-bottom:1px solid var(--line);">
                            Tabelle
                        </th>
                        <th style="text-align:right;padding:12px;border-bottom:1px solid var(--line);">
                            Datensätze
                        </th>
                        <th style="text-align:right;padding:12px;border-bottom:1px solid var(--line);">
                            Größe
                        </th>
                        <th style="text-align:left;padding:12px;border-bottom:1px solid var(--line);">
                            Einordnung
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    <?php foreach ($dashboard['tables'] as $table): ?>
                        <tr>
                            <td style="padding:12px;border-bottom:1px solid var(--line);">
                                <strong><?= e($table['name']) ?></strong>
                            </td>

                            <td style="text-align:right;padding:12px;border-bottom:1px solid var(--line);">
                                <?= e(formatNumber((int)$table['count'])) ?>
                            </td>

                            <td style="text-align:right;padding:12px;border-bottom:1px solid var(--line);">
                                <?= e(formatDecimal((float)$table['size_mb'])) ?> MB
                            </td>

                            <td style="padding:12px;border-bottom:1px solid var(--line);">
                                <?= e($table['category']) ?>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </section>
    <?php endif; ?>

    <footer style="display:flex;justify-content:space-between;gap:16px;padding:28px 4px 0;color:var(--muted);font-size:.86rem;">
        <span>Letzte Prüfung: <?= e($dashboard['checked_at']) ?></span>
        <span>NeuroWays Admin · v0.2.0</span>
    </footer>

</main>
</body>
</html>
