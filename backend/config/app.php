<?php

define('APP_ENV', getenv('APP_ENV') ?: 'development');
define('ALLOWED_ORIGIN', getenv('ALLOWED_ORIGIN') ?: 'http://localhost:5173');

function setCorsHeaders(): void {
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');

    if (APP_ENV === 'development') {
        header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PATCH, DELETE, PUT');
        header('Access-Control-Allow-Headers: Content-Type, Accept, Authorization, X-Requested-With');
        header('Access-Control-Max-Age: 86400');
    }

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}
