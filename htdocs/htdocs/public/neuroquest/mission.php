<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$runId = filter_input(INPUT_GET, 'run', FILTER_VALIDATE_INT);
if (!$runId) {
    header('Location: index.php');
    exit;
}

$run = $repository->getRun($runId);
$day = $repository->getDay();

if ((int)$run['child_id'] !== $childId) {
    http_response_code(403);
    exit('Kein Zugriff auf diesen Durchlauf.');
}

if ($run['status'] === 'completed') {
    header('Location: story.php?completed=1');
    exit;
}

$rounds = $repository->getRounds((int)$day['id']);
$parts = $repository->getStoryParts((int)$day['id']);
$currentRound = (int)$run['current_round'];
$currentStep = (int)$run['current_step'];
$round = $rounds[$currentRound - 1];
$storyPart = $parts[$currentRound - 1];

$steps = [
    1 => ['title' => 'Zeichen suchen', 'text' => $round['search_instruction']],
    2 => ['title' => 'Satz abschreiben', 'text' => $round['sentence_text']],
    3 => ['title' => 'Satz kontrollieren', 'text' => 'Vergleiche deinen Satz Wort für Wort mit der Vorlage.'],
    4 => ['title' => 'Geschafft markieren', 'text' => 'Markiere den Satz auf deinem Blatt als geschafft.'],
    5 => ['title' => 'Entdeckung öffnen', 'text' => 'Die Geschichte geht jetzt weiter.'],
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $run = $repository->advanceStep($runId);

    if ($run['status'] === 'completed') {
        header('Location: story.php?completed=1');
        exit;
    }

    header('Location: mission.php?run=' . $runId);
    exit;
}
?>
<!doctype html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Runde <?= h($currentRound) ?> · NeuroQuest</title>
    <link rel="stylesheet" href="assets/css/neuroquest.css">
</head>
<body>
<main class="mission-page">
    <header class="mission-header">
        <a href="index.php">← Zur Ankunftsszene</a>
        <span>Runde <?= h($currentRound) ?> von 5</span>
    </header>

    <section class="mission-card">
        <p class="eyebrow">Schritt <?= h($currentStep) ?> von 5</p>
        <h1><?= h($steps[$currentStep]['title']) ?></h1>

        <?php if ($currentStep === 2): ?>
            <blockquote><?= h($round['sentence_text']) ?></blockquote>
            <label class="write-box">
                Dein abgeschriebener Satz
                <textarea rows="4" placeholder="Schreibe den Satz hier oder auf dein Blatt."></textarea>
            </label>
        <?php elseif ($currentStep === 5): ?>
            <div class="story-part">
                <span aria-hidden="true">✨</span>
                <p><?= h($storyPart['text_content']) ?></p>
            </div>
        <?php else: ?>
            <p class="instruction"><?= h($steps[$currentStep]['text']) ?></p>
            <?php if ($currentStep === 1): ?>
                <blockquote><?= h($round['sentence_text']) ?></blockquote>
            <?php endif; ?>
        <?php endif; ?>

        <form method="post">
            <button class="primary" type="submit">
                <?= $currentStep === 5
                    ? ($currentRound === 5 ? 'Tagesgeschichte öffnen' : 'Nächste Runde')
                    : 'Schritt geschafft' ?>
            </button>
        </form>
    </section>

    <ol class="stepper" aria-label="Fünf Schritte">
        <?php for ($i = 1; $i <= 5; $i++): ?>
            <li class="<?= $i < $currentStep ? 'done' : ($i === $currentStep ? 'current' : '') ?>">
                <?= h($i) ?>
            </li>
        <?php endfor; ?>
    </ol>
</main>
</body>
</html>
