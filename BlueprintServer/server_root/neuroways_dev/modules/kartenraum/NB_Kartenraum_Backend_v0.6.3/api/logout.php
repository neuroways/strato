<?php
declare(strict_types=1);
require __DIR__.'/bootstrap.php';

try {
    $token = bearer_token();
    $auth->logout($token);
    json_response(['status'=>'ok']);
} catch (Throwable $e) {
    json_response(['status'=>'ok']);
}
