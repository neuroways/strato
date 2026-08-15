<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$state = $service->getHomeState($childId);
$day = $state['day'];
$run = $state['run'];
$completedCount = $state['completedCount'];
$unlockedCount = count($state['unlocked']);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = (string)($_POST['action'] ?? '');

    if ($action === 'start') {
        $run = $service->startOrResume($childId);
        header('Location: mission.php?run=' . (int)$run['id']);
        exit;
    }

    if ($action === 'replay') {
        if ($run && $run['status'] === 'active') {
            header('Location: mission.php?run=' . (int)$run['id']);
            exit;
        }

        $newRun = $repository->startRun($childId, (int)$day['id']);
        header('Location: mission.php?run=' . (int)$newRun['id']);
        exit;
    }
}

$primaryLabel = $run
    ? 'Mit Satz ' . (int)$run['current_round'] . ' weitermachen'
    : ($completedCount > 0 ? 'Tag noch einmal spielen' : 'Tag 1 beginnen');
?>
<!doctype html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= h($day['story_title']) ?></title>
    <link rel="stylesheet" href="assets/css/neuroquest.css">
</head>
<body>
<main class="page">
    <header class="topbar">
        <div class="brand">✦ NeuroQuest</div>
        <a href="../">NeuroWays</a>
    </header>

    <section class="scene">
        <div class="scene-art" aria-hidden="true">
            <div class="moon"></div>
            <div class="tree tree-a"></div>
            <div class="tree tree-b"></div>
            <div class="path"></div>
            <div class="luna">🦊</div>
        </div>

        <div class="scene-copy">
            <p class="eyebrow">Geschichte 1 · Tag 1</p>
            <h1><?= h($day['arrival_headline']) ?></h1>
            <p><?= h($day['arrival_text']) ?></p>

            <div class="meta">
                <strong><?= h($day['story_title']) ?></strong><br>
                <?= h($day['title']) ?> · <?= h($day['location_name']) ?><br>
                Mit <?= h($day['companion_name']) ?>
            </div>

            <form method="post">
                <input type="hidden" name="action" value="<?= $completedCount > 0 && !$run ? 'replay' : 'start' ?>">
                <button class="primary" type="submit"><?= h($primaryLabel) ?></button>
            </form>

            <?php if ($completedCount > 0): ?>
                <a class="secondary-link" href="story.php">Vollständige Geschichte lesen</a>
            <?php endif; ?>
        </div>
    </section>

    <section class="summary-grid">
        <article>
            <span>Abgeschlossene Durchläufe</span>
            <strong><?= h($completedCount) ?></strong>
        </article>
        <article>
            <span>Freigeschaltete Storyteile</span>
            <strong><?= h($unlockedCount) ?>/5</strong>
        </article>
        <article>
            <span>Aktueller Stand</span>
            <strong><?= $run ? 'Runde ' . h($run['current_round']) : ($completedCount ? 'Tag geschafft' : 'Bereit') ?></strong>
        </article>
    </section>
</main>
</body>
</html>
