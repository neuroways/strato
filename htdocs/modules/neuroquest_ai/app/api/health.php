<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
$configPath = dirname(__DIR__) . '/config/config.php';
$result = ['php' => PHP_VERSION, 'api' => true, 'database' => false];
if (!is_file($configPath)) { echo json_encode($result); exit; }
$config = require $configPath;
$db = $config['database'] ?? [];
if (empty($db['enabled'])) { echo json_encode($result); exit; }
try {
  $dsn = sprintf('mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4', $db['host'], $db['port'] ?? 3306, $db['name']);
  new PDO($dsn, $db['user'], $db['password'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_TIMEOUT => 3]);
  $result['database'] = true;
} catch (Throwable $e) { $result['database_error'] = 'Verbindung nicht möglich'; }
echo json_encode($result, JSON_UNESCAPED_UNICODE);
