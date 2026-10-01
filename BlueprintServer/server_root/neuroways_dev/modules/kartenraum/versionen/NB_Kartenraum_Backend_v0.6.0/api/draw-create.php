<?php
declare(strict_types=1);
require __DIR__.'/bootstrap.php';
try {
    $profile=$auth->requireSession(bearer_token());
    $data=request_json();
    $draw=$journalService->createDraw(
      (int)$profile['profile_id'],
      (string)($data['card_id'] ?? ''),
      strtoupper((string)($data['orientation_code'] ?? '')),
      (string)$profile['audience_code'],
      (string)$profile['language_code']
    );
    json_response(['status'=>'ok','draw'=>$draw],201);
} catch (Throwable $e) {
    $code=$e->getMessage();
    json_response(['status'=>'error','error'=>$code],$code==='AUTH_REQUIRED'?401:400);
}
