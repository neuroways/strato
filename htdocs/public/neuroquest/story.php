<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$day = $repository->getDay();
$parts = $repository->getUnlockedParts($childId, (int)$day['id']);
$completedCount = $repository->getCompletedRunCount($childId, (int)$day['id']);

if ($completedCount < 1) {
    header('Location: index.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $run = $repository->startRun($childId, (int)$day['id']);
    header('Location: mission.php?run=' . (int)$run['id']);
    exit;
}
?>
<!doctype html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Die vollständige Geschichte</title>
    <link rel="stylesheet" href="assets/css/neuroquest.css">
</head>
<body>
<main class="story-page">
    <header class="topbar">
        <a href="index.php">← Zur Startseite</a>
        <span>Abenteuerbuch</span>
    </header>

    <article class="story-book">
        <p class="eyebrow">Geschichte 1 · Tag 1</p>
        <h1><?= h($day['story_title']) ?></h1>
        <h2><?= h($day['title']) ?></h2>

        <p class="arrival"><?= h($day['arrival_text']) ?></p>

        <?php foreach ($parts as $part): ?>
            <section class="book-part">
                <span><?= h($part['part_number']) ?></span>
                <p><?= h($part['text_content']) ?></p>
            </section>
        <?php endforeach; ?>

        <p class="completion"><?= h($day['completion_text']) ?></p>

        <div class="story-actions">
            <form method="post">
                <button class="primary" type="submit">Tag noch einmal spielen</button>
            </form>
            <a class="secondary-link" href="index.php">Zur Ankunftsszene</a>
        </div>
    </article>
</main>
</body>
</html>
