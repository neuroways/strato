<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$cardId = trim((string)($_GET['id'] ?? ''));
if ($cardId === '') {
    json_response(['status'=>'error','error'=>'CARD_ID_REQUIRED'], 400);
}

$card = $service->card($cardId);
if ($card === null) {
    json_response(['status'=>'error','error'=>'CARD_NOT_FOUND'], 404);
}

json_response(['status'=>'ok','card'=>$card]);
