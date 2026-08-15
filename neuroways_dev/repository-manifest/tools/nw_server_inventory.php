<?php
declare(strict_types=1);

/**
 * NW-CONFIG-P2.4.1 – Server-Dateiinventar
 * Version: 0.1.0 Draft
 *
 * Zweck:
 * - Erfasst Dateien in "neuroways" und "htdocs"
 * - Verändert keine Quelldateien
 * - Erzeugt CSV, JSON und einen Kurzbericht
 * - Berechnet SHA-256
 *
 * Ausführung:
 *   CLI: php nw_server_inventory.php
 *   Browser: Datei aufrufen; danach aus Sicherheitsgründen entfernen oder sperren.
 */

const INVENTORY_VERSION = '0.1.0';
const FOLLOW_SYMLINKS = false;
const INCLUDE_DIRECTORIES = true;
const HASH_ALGORITHM = 'sha256';
const MAX_HASH_BYTES = 0; // 0 = alle Dateien vollständig hashen

date_default_timezone_set('Europe/Berlin');

function fail(string $message): never {
    http_response_code(500);
    header('Content-Type: text/plain; charset=utf-8');
    echo "FEHLER: {$message}\n";
    exit(1);
}

function normalizePath(string $path): string {
    return str_replace('\\', '/', $path);
}

function findRepositoryRoot(string $start): array {
    $current = realpath($start);
    if ($current === false) {
        fail("Startpfad konnte nicht aufgelöst werden: {$start}");
    }

    for ($i = 0; $i < 8; $i++) {
        $nw = $current . DIRECTORY_SEPARATOR . 'neuroways';
        $htdocs = $current . DIRECTORY_SEPARATOR . 'htdocs';

        if (is_dir($nw) && is_dir($htdocs)) {
            return [
                'account_root' => $current,
                'neuroways' => realpath($nw),
                'htdocs' => realpath($htdocs),
            ];
        }

        $parent = dirname($current);
        if ($parent === $current) {
            break;
        }
        $current = $parent;
    }

    fail(
        "Es wurde kein gemeinsamer übergeordneter Ordner gefunden, der sowohl " .
        "\"neuroways\" als auch \"htdocs\" enthält. Lege das Skript innerhalb dieses " .
        "Serverbereichs ab oder setze die Pfade im Skript manuell."
    );
}

function safeFileHash(string $path): array {
    $size = filesize($path);
    if ($size === false) {
        return ['hash' => null, 'hash_status' => 'SIZE_ERROR'];
    }

    if (MAX_HASH_BYTES > 0 && $size > MAX_HASH_BYTES) {
        return ['hash' => null, 'hash_status' => 'SKIPPED_SIZE_LIMIT'];
    }

    $hash = @hash_file(HASH_ALGORITHM, $path);
    if ($hash === false) {
        return ['hash' => null, 'hash_status' => 'HASH_ERROR'];
    }

    return ['hash' => $hash, 'hash_status' => 'OK'];
}

function inventoryTree(string $root, string $area, string $accountRoot): array {
    $rows = [];
    $flags = FilesystemIterator::SKIP_DOTS;
    if (FOLLOW_SYMLINKS) {
        $flags |= FilesystemIterator::FOLLOW_SYMLINKS;
    }

    $directory = new RecursiveDirectoryIterator($root, $flags);
    $iterator = new RecursiveIteratorIterator(
        $directory,
        RecursiveIteratorIterator::SELF_FIRST,
        RecursiveIteratorIterator::CATCH_GET_CHILD
    );

    foreach ($iterator as $item) {
        /** @var SplFileInfo $item */
        $absolute = $item->getPathname();
        $relativeArea = ltrim(substr($absolute, strlen($root)), DIRECTORY_SEPARATOR);
        $relativeServer = ltrim(substr($absolute, strlen($accountRoot)), DIRECTORY_SEPARATOR);

        $isLink = $item->isLink();
        $type = $item->isDir() ? 'DIRECTORY' : ($item->isFile() ? 'FILE' : 'OTHER');

        if ($type === 'DIRECTORY' && !INCLUDE_DIRECTORIES) {
            continue;
        }

        $extension = $type === 'FILE'
            ? strtolower(pathinfo($item->getFilename(), PATHINFO_EXTENSION))
            : '';

        $hashData = ['hash' => null, 'hash_status' => 'NOT_APPLICABLE'];
        if ($type === 'FILE') {
            $hashData = safeFileHash($absolute);
        }

        $rows[] = [
            'inventory_id' => '',
            'server_area' => $area,
            'object_type' => $type,
            'absolute_path' => normalizePath($absolute),
            'server_relative_path' => normalizePath($relativeServer),
            'area_relative_path' => normalizePath($relativeArea),
            'filename' => $item->getFilename(),
            'extension' => $extension,
            'size_bytes' => $type === 'FILE' ? (string)$item->getSize() : '',
            'modified_at' => date(DATE_ATOM, $item->getMTime()),
            'created_at' => date(DATE_ATOM, $item->getCTime()),
            'sha256' => $hashData['hash'] ?? '',
            'hash_status' => $hashData['hash_status'],
            'is_readable' => is_readable($absolute) ? 'YES' : 'NO',
            'is_writable' => is_writable($absolute) ? 'YES' : 'NO',
            'is_symlink' => $isLink ? 'YES' : 'NO',
            'symlink_target' => $isLink ? (string)readlink($absolute) : '',
            'scan_status' => 'DISCOVERED',
        ];
    }

    return $rows;
}

function assignInventoryIds(array &$rows): void {
    usort($rows, static function(array $a, array $b): int {
        return [$a['server_area'], $a['server_relative_path']]
            <=> [$b['server_area'], $b['server_relative_path']];
    });

    foreach ($rows as $index => &$row) {
        $row['inventory_id'] = sprintf('INV-%08d', $index + 1);
    }
    unset($row);
}

function writeCsv(string $path, array $rows): void {
    $handle = fopen($path, 'wb');
    if ($handle === false) {
        fail("CSV konnte nicht geschrieben werden: {$path}");
    }

    // UTF-8 BOM für Excel/LibreOffice
    fwrite($handle, "\xEF\xBB\xBF");

    if ($rows !== []) {
        fputcsv($handle, array_keys($rows[0]), ';');
        foreach ($rows as $row) {
            fputcsv($handle, $row, ';');
        }
    }

    fclose($handle);
}

function writeJson(string $path, array $payload): void {
    $json = json_encode(
        $payload,
        JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
    );
    if ($json === false || file_put_contents($path, $json . PHP_EOL) === false) {
        fail("JSON konnte nicht geschrieben werden: {$path}");
    }
}

function summarize(array $rows): array {
    $summary = [
        'total_objects' => count($rows),
        'files' => 0,
        'directories' => 0,
        'other' => 0,
        'neuroways_files' => 0,
        'htdocs_files' => 0,
        'unreadable_objects' => 0,
        'hash_errors' => 0,
        'duplicate_hash_groups' => 0,
        'duplicate_files' => 0,
        'extensions' => [],
    ];

    $hashGroups = [];

    foreach ($rows as $row) {
        if ($row['object_type'] === 'FILE') {
            $summary['files']++;
            if ($row['server_area'] === 'neuroways') {
                $summary['neuroways_files']++;
            } elseif ($row['server_area'] === 'htdocs') {
                $summary['htdocs_files']++;
            }

            $ext = $row['extension'] !== '' ? $row['extension'] : '[ohne Endung]';
            $summary['extensions'][$ext] = ($summary['extensions'][$ext] ?? 0) + 1;

            if ($row['hash_status'] !== 'OK') {
                $summary['hash_errors']++;
            } elseif ($row['sha256'] !== '') {
                $hashGroups[$row['sha256']][] = $row['server_relative_path'];
            }
        } elseif ($row['object_type'] === 'DIRECTORY') {
            $summary['directories']++;
        } else {
            $summary['other']++;
        }

        if ($row['is_readable'] !== 'YES') {
            $summary['unreadable_objects']++;
        }
    }

    foreach ($hashGroups as $paths) {
        if (count($paths) > 1) {
            $summary['duplicate_hash_groups']++;
            $summary['duplicate_files'] += count($paths);
        }
    }

    ksort($summary['extensions']);
    return $summary;
}

function writeReport(string $path, array $config, array $summary): void {
    $lines = [
        'NEUROWAYS SERVER-DATEIINVENTAR',
        '================================',
        '',
        'Inventarversion: ' . INVENTORY_VERSION,
        'Erzeugt: ' . date(DATE_ATOM),
        'Account-Root: ' . normalizePath($config['account_root']),
        'Repository: ' . normalizePath($config['neuroways']),
        'Produktivsystem: ' . normalizePath($config['htdocs']),
        '',
        'ERGEBNIS',
        '--------',
        'Objekte gesamt: ' . $summary['total_objects'],
        'Dateien: ' . $summary['files'],
        'Ordner: ' . $summary['directories'],
        'Sonstige Objekte: ' . $summary['other'],
        'Dateien unter neuroways: ' . $summary['neuroways_files'],
        'Dateien unter htdocs: ' . $summary['htdocs_files'],
        'Nicht lesbare Objekte: ' . $summary['unreadable_objects'],
        'Hash-Fehler: ' . $summary['hash_errors'],
        'Duplikatgruppen nach SHA-256: ' . $summary['duplicate_hash_groups'],
        'Dateien in Duplikatgruppen: ' . $summary['duplicate_files'],
        '',
        'DATEITYPEN',
        '----------',
    ];

    foreach ($summary['extensions'] as $ext => $count) {
        $lines[] = "{$ext}: {$count}";
    }

    $lines[] = '';
    $lines[] = 'HINWEIS';
    $lines[] = '-------';
    $lines[] = 'Dieses Inventar verändert keine Quelldateien.';
    $lines[] = 'Ausgabedateien wurden ausschließlich im Repositorybereich erzeugt.';
    $lines[] = 'Die fachliche Klassifikation und Migration erfolgt in einem späteren Schritt.';

    if (file_put_contents($path, implode(PHP_EOL, $lines) . PHP_EOL) === false) {
        fail("Bericht konnte nicht geschrieben werden: {$path}");
    }
}

$config = findRepositoryRoot(__DIR__);

$outputDir = $config['neuroways']
    . DIRECTORY_SEPARATOR . 'registers'
    . DIRECTORY_SEPARATOR . 'inventory';

if (!is_dir($outputDir) && !mkdir($outputDir, 0775, true) && !is_dir($outputDir)) {
    fail("Ausgabeordner konnte nicht angelegt werden: {$outputDir}");
}

$timestamp = date('Ymd_His');
$rows = array_merge(
    inventoryTree($config['neuroways'], 'neuroways', $config['account_root']),
    inventoryTree($config['htdocs'], 'htdocs', $config['account_root'])
);
assignInventoryIds($rows);

$summary = summarize($rows);

$csvPath = $outputDir . DIRECTORY_SEPARATOR . "NW-REPOSITORY-INVENTORY-001_{$timestamp}.csv";
$jsonPath = $outputDir . DIRECTORY_SEPARATOR . "NW-REPOSITORY-INVENTORY-001_{$timestamp}.json";
$reportPath = $outputDir . DIRECTORY_SEPARATOR . "NW-REPOSITORY-INVENTORY-001_REPORT_{$timestamp}.txt";

writeCsv($csvPath, $rows);
writeJson($jsonPath, [
    'inventory' => [
        'id' => 'NW-REPOSITORY-INVENTORY-001',
        'version' => INVENTORY_VERSION,
        'created_at' => date(DATE_ATOM),
        'hash_algorithm' => HASH_ALGORITHM,
        'source_roots' => [
            'neuroways' => normalizePath($config['neuroways']),
            'htdocs' => normalizePath($config['htdocs']),
        ],
        'summary' => $summary,
        'objects' => $rows,
    ],
]);
writeReport($reportPath, $config, $summary);

header('Content-Type: text/plain; charset=utf-8');
echo "NW-CONFIG-P2.4.1 erfolgreich abgeschlossen.\n\n";
echo "CSV: " . normalizePath($csvPath) . "\n";
echo "JSON: " . normalizePath($jsonPath) . "\n";
echo "Bericht: " . normalizePath($reportPath) . "\n\n";
echo "Dateien erfasst: {$summary['files']}\n";
echo "Ordner erfasst: {$summary['directories']}\n";
echo "Duplikatgruppen: {$summary['duplicate_hash_groups']}\n";
?>
