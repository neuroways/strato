<?php
declare(strict_types=1);
require __DIR__.'/bootstrap.php';

try {
    $profile=$auth->requireSession(bearer_token());
    $data=request_json();

    $item=$journalService->updateJournalEntry(
        (int)$profile['profile_id'],
        (int)($data['journal_entry_id'] ?? 0),
        (string)($data['entry_type'] ?? ''),
        array_key_exists('depth_code',$data) && $data['depth_code'] !== null
            ? (string)$data['depth_code']
            : null,
        (string)($data['entry_text'] ?? '')
    );

    json_response(['status'=>'ok','journal_entry'=>$item]);
} catch (Throwable $e) {
    $code=$e->getMessage();
    $status=match($code){
        'AUTH_REQUIRED'=>401,
        'JOURNAL_ENTRY_NOT_FOUND'=>404,
        default=>400,
    };
    json_response(['status'=>'error','error'=>$code],$status);
}
