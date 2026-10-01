<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$cards = __DIR__ . '/data/cards.json';
$settings = __DIR__ . '/data/settings.json';

$result = [
  'status' => 'ok',
  'module' => 'nb_kartenraum',
  'version' => '0.2.2',
  'php' => PHP_VERSION,
  'cards_json' => is_file($cards),
  'settings_json' => is_file($settings),
  'timestamp' => gmdate('c'),
];

if (is_file($cards)) {
  $data = json_decode((string)file_get_contents($cards), true);
  $result['registered_cards'] = count($data['cards'] ?? []);
  if ($result['registered_cards'] !== 78) {
    $result['status'] = 'warning';
  }
}

echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
