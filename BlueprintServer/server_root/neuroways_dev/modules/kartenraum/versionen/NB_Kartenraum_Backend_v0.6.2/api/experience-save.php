<?php
declare(strict_types=1);
require __DIR__.'/bootstrap.php';

try {
    $profile=$auth->requireSession(bearer_token());
    $data=request_json();
    $item=$journalService->addExperience(
        (int)$profile['profile_id'],
        (int)($data['draw_id'] ?? 0),
        (string)($data['experience_text'] ?? ''),
        isset($data['experienced_at']) ? (string)$data['experienced_at'] : null
    );
    json_response(['status'=>'ok','experience'=>$item],201);
} catch (Throwable $e) {
    $code=$e->getMessage();
    $status=$code==='AUTH_REQUIRED'?401:($code==='DRAW_NOT_FOUND'?404:400);
    json_response(['status'=>'error','error'=>$code],$status);
}
