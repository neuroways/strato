<?php
declare(strict_types=1);
require __DIR__.'/bootstrap.php';
$data=request_json();
try {
    $result=$auth->login(
        (string)($data['username'] ?? ''),
        (string)($data['access_code'] ?? ''),
        (string)($_SERVER['REMOTE_ADDR'] ?? '')
    );
    json_response(['status'=>'ok','profile'=>$result]);
} catch (Throwable $e) {
    $code=$e->getMessage();
    $status=$code==='TOO_MANY_ATTEMPTS'?429:401;
    json_response([
      'status'=>'error',
      'error'=>$code==='TOO_MANY_ATTEMPTS'?'TOO_MANY_ATTEMPTS':'LOGIN_FAILED',
      'message'=>$code==='TOO_MANY_ATTEMPTS'
        ? 'Zu viele Versuche. Bitte später erneut versuchen.'
        : 'Name oder Code passen nicht zusammen.'
    ],$status);
}
