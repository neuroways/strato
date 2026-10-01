<?php
declare(strict_types=1);
require __DIR__.'/bootstrap.php';
try {
    $profile=$auth->requireSession(bearer_token());
    $data=request_json();
    $result=$journalService->savePerception(
      (int)$profile['profile_id'],
      (int)($data['draw_id'] ?? 0),
      (string)($data['perception_text'] ?? '')
    );
    json_response(['status'=>'ok','perception'=>$result]);
} catch (Throwable $e) {
    $code=$e->getMessage();
    json_response(['status'=>'error','error'=>$code],$code==='AUTH_REQUIRED'?401:400);
}
