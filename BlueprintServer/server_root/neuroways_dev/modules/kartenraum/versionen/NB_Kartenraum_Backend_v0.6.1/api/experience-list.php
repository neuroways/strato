<?php
declare(strict_types=1);
require __DIR__.'/bootstrap.php';

try {
    $profile=$auth->requireSession(bearer_token());
    $drawId=(int)($_GET['draw_id'] ?? 0);
    $items=$journalService->experiences((int)$profile['profile_id'],$drawId);
    json_response(['status'=>'ok','draw_id'=>$drawId,'items'=>$items]);
} catch (Throwable $e) {
    $code=$e->getMessage();
    $status=$code==='AUTH_REQUIRED'?401:($code==='DRAW_NOT_FOUND'?404:400);
    json_response(['status'=>'error','error'=>$code],$status);
}
