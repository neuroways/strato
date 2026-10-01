<?php
declare(strict_types=1);

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

require_once dirname(__DIR__, 2) . '/modules/neuroquest/infrastructure/Database.php';
require_once dirname(__DIR__, 2) . '/modules/neuroquest/infrastructure/DayOneRepository.php';
require_once dirname(__DIR__, 2) . '/modules/neuroquest/application/DayOneService.php';

$pdo = NeuroQuestDatabase::connect();
$repository = new DayOneRepository($pdo);
$service = new DayOneService($repository);

$childId = isset($_SESSION['active_child_id'])
    ? (int)$_SESSION['active_child_id']
    : 1;

function h(string|int|float|null $value): string
{
    return htmlspecialchars((string)$value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
