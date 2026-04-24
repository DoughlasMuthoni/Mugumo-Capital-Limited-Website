<?php

define('APP_ENV', getenv('APP_ENV') ?: 'production');
define('ALLOWED_ORIGIN', getenv('ALLOWED_ORIGIN') ?: 'https://mugumocapitalpartners.africa');

function setCorsHeaders(): void {
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');

    // In production the frontend is on the same domain — no CORS headers needed.
    // Only send them in development mode.
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
