<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$cardId = trim((string)($_GET['id'] ?? ''));
$audience = trim((string)($_GET['audience'] ?? 'ADULT'));
$language = trim((string)($_GET['language'] ?? 'de'));

if ($cardId === '') {
    json_response(['status'=>'error','error'=>'CARD_ID_REQUIRED'], 400);
}

try {
    $text = $service->text($cardId, $audience, $language);
} catch (InvalidArgumentException $e) {
    json_response([
        'status'=>'error',
        'error'=>'UNSUPPORTED_CONTENT_VARIANT',
        'message'=>$e->getMessage(),
    ], 400);
}

if ($text === null) {
    json_response(['status'=>'error','error'=>'CARD_TEXT_NOT_FOUND'], 404);
}

json_response(['status'=>'ok','text'=>$text]);
