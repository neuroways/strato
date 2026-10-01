<?php
declare(strict_types=1);
require __DIR__.'/bootstrap.php';
try {
    $profile=$auth->requireSession(bearer_token());
    $items=$journalService->journal((int)$profile['profile_id'],50);
    json_response([
      'status'=>'ok',
      'profile'=>[
        'username'=>$profile['username'],
        'audience_code'=>$profile['audience_code'],
        'language_code'=>$profile['language_code']
      ],
      'items'=>$items
    ]);
} catch (Throwable $e) {
    json_response(['status'=>'error','error'=>'AUTH_REQUIRED'],401);
}
