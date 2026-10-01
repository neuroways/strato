<?php
declare(strict_types=1);

require __DIR__.'/bootstrap.php';

try {
    $profile = $auth->requireSession(bearer_token());
    $data = request_json();

    $item = $journalService->addJournalEntry(
        (int)$profile['profile_id'],
        (int)($data['draw_id'] ?? 0),
        (string)($data['entry_type'] ?? ''),
        array_key_exists('depth_code', $data) && $data['depth_code'] !== null
            ? (string)$data['depth_code']
            : null,
        (string)($data['entry_text'] ?? '')
    );

    json_response([
        'status' => 'ok',
        'journal_entry' => $item,
    ], 201);
} catch (Throwable $e) {
    $code = $e->getMessage();

    $status = match ($code) {
        'AUTH_REQUIRED' => 401,
        'DRAW_NOT_FOUND' => 404,
        default => 400,
    };

    json_response([
        'status' => 'error',
        'error' => $code,
    ], $status);
}
