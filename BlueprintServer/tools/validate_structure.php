<?php
// CLI-only structural validator for this blueprint.
if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}
$root = realpath(__DIR__ . '/../server_root');
if ($root === false) {
    fwrite(STDERR, "server_root not found\n");
    exit(2);
}
$errors = [];
$iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($root, FilesystemIterator::SKIP_DOTS),
    RecursiveIteratorIterator::SELF_FIRST
);
foreach ($iterator as $item) {
    if (!$item->isDir()) continue;
    $readme = $item->getPathname() . DIRECTORY_SEPARATOR . 'README.md';
    if (!is_file($readme)) {
        $errors[] = 'Missing README.md: ' . $item->getPathname();
    }
}
$required = ['config','_packages','_blueprints','_instances','neuroways_dev','neuroways','_git_backup'];
foreach ($required as $dir) {
    if (!is_dir($root . DIRECTORY_SEPARATOR . $dir)) {
        $errors[] = 'Missing root directory: ' . $dir;
    }
}
if ($errors) {
    fwrite(STDERR, implode("\n", $errors) . "\n");
    exit(1);
}
echo "OK: structure valid; every directory has README.md\n";
