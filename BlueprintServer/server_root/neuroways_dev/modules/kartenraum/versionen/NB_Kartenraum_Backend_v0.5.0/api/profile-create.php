<?php
declare(strict_types=1);
require __DIR__.'/bootstrap.php';
$data=request_json();
try {
    $result=$auth->createProfile(
        (string)($data['username'] ?? ''),
        strtoupper((string)($data['audience_code'] ?? '')),
        'de'
    );
    json_response(['status'=>'ok','profile'=>$result],201);
} catch (Throwable $e) {
    $map=[
      'USERNAME_UNAVAILABLE'=>409,
      'USERNAME_INVALID'=>400,
      'AUDIENCE_INVALID'=>400,
    ];
    $code=$e->getMessage();
    json_response(['status'=>'error','error'=>$code],$map[$code] ?? 400);
}
