<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
echo json_encode([
  'module'=>'nb_kartenraum',
  'version'=>'0.3.3',
  'endpoints'=>[
    'GET api/health.php',
    'GET api/cards.php',
    'GET api/card.php?id=major-00',
    'GET api/text.php?id=major-00&audience=ADULT&language=de',
    'GET api/text.php?id=major-00&audience=CHILD&language=de'
  ]
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
