<?php

function jsonSuccess(array $data = [], int $code = 200): void {
    http_response_code($code);
    echo json_encode(['success' => true, 'data' => $data]);
    exit;
}

function jsonError(string $message, int $code = 400, array $errors = []): void {
    http_response_code($code);
    $payload = ['success' => false, 'message' => $message];
    if (!empty($errors)) {
        $payload['errors'] = $errors;
    }
    echo json_encode($payload);
    exit;
}
