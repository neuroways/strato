<?php
declare(strict_types=1);
require __DIR__.'/bootstrap.php';

try {
    $profile=$auth->requireSession(bearer_token());
    $data=request_json();

    $journalService->deleteJournalEntry(
        (int)$profile['profile_id'],
        (int)($data['journal_entry_id'] ?? 0)
    );

    json_response(['status'=>'ok']);
} catch (Throwable $e) {
    $code=$e->getMessage();
    $status=match($code){
        'AUTH_REQUIRED'=>401,
        'JOURNAL_ENTRY_NOT_FOUND'=>404,
        default=>400,
    };
    json_response(['status'=>'error','error'=>$code],$status);
}
