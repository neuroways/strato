<?php
declare(strict_types=1);
$entry = dirname(__DIR__) . '/public/index.php';
$js = dirname(__DIR__) . '/public/assets/js/app.js';
$css = dirname(__DIR__) . '/public/assets/css/experience.css';
foreach ([$entry, $js, $css] as $file) {
    if (!is_file($file) || filesize($file) === 0) {
        fwrite(STDERR, "Missing or empty: {$file}\n");
        exit(1);
    }
}
ob_start();
require $entry;
$html = ob_get_clean();
foreach (['id="app"', 'content-card', 'assets/js/app.js'] as $needle) {
    if (!str_contains($html, $needle)) {
        fwrite(STDERR, "HTML contract missing: {$needle}\n");
        exit(1);
    }
}
echo "PASS: STRATO pilot smoke test\n";
