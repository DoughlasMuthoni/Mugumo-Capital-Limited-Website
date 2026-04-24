<?php

declare(strict_types=1);

ini_set('display_errors', '0');
ini_set('display_startup_errors', '0');
error_reporting(0);

set_exception_handler(function (\Throwable $e): void {
    if (!headers_sent()) {
        http_response_code(500);
        header('Content-Type: application/json; charset=utf-8');
    }
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    exit;
});

require_once __DIR__ . '/config/app.php';
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/helpers/response.php';
require_once __DIR__ . '/controllers/ContactController.php';
require_once __DIR__ . '/controllers/InquiryController.php';
require_once __DIR__ . '/controllers/PublicController.php';

setCorsHeaders();

// ─── Normalise path ──────────────────────────────────────────────────────────
$uri    = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

$basePaths = [
    '/api',                                          // production
    '/Mugumo Capital Partners/backend/public',       // local dev
    '/Mugumo%20Capital%20Partners/backend/public',   // local dev (URL-encoded)
    '/backend/public',                               // local dev (alternate)
];
$path = $uri;
foreach ($basePaths as $base) {
    if (str_starts_with($uri, $base)) {
        $path = substr($uri, strlen($base));
        break;
    }
}
$path = '/' . ltrim($path, '/');

$isAdmin = str_starts_with($path, '/admin/') || $path === '/admin';

// ─── Rate limiting (public routes only, time-windowed) ────────────────────────
if (!$isAdmin) {
    session_start();
    $ip        = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $windowKey = 'rw_' . md5($ip);
    $countKey  = 'rc_' . md5($ip);
    $now       = time();

    if (($now - ($_SESSION[$windowKey] ?? 0)) > 60) {
        $_SESSION[$windowKey] = $now;
        $_SESSION[$countKey]  = 0;
    }
    $_SESSION[$countKey] = ($_SESSION[$countKey] ?? 0) + 1;
    if ($_SESSION[$countKey] > 60) {
        jsonError('Too many requests. Please try again later.', 429);
    }
}

// ─── Admin routes ────────────────────────────────────────────────────────────
if ($isAdmin) {
    require_once __DIR__ . '/controllers/AdminAuthController.php';
    require_once __DIR__ . '/controllers/AdminController.php';

    $adminPath = ltrim(substr($path, strlen('/admin')), '/');
    $parts     = array_values(array_filter(explode('/', $adminPath)));
    $resource  = $parts[0] ?? '';
    $id        = (isset($parts[1]) && ctype_digit($parts[1])) ? (int)$parts[1] : null;

    if ($resource === 'login'  && $method === 'POST') { AdminAuthController::login();  }
    elseif ($resource === 'logout' && $method === 'POST') { AdminAuthController::logout(); }
    elseif ($resource === 'verify' && $method === 'GET')  { AdminAuthController::verify(); }
    else {
        AdminAuthController::requireAuth();

        if ($resource === 'upload-photo' && $method === 'POST') {
            AdminController::uploadPhoto();

        } elseif ($resource === 'stats' && $method === 'GET') {
            AdminController::stats();

        } elseif ($resource === 'inquiries') {
            if ($id !== null) {
                if ($method === 'PATCH')      AdminController::updateInquiry($id);
                elseif ($method === 'DELETE') AdminController::deleteInquiry($id);
                else jsonError('Method not allowed.', 405);
            } else {
                if ($method === 'GET') AdminController::listInquiries();
                else jsonError('Method not allowed.', 405);
            }

        } elseif ($resource === 'team') {
            if ($id !== null) {
                if ($method === 'PUT')        AdminController::updateTeam($id);
                elseif ($method === 'DELETE') AdminController::deleteTeam($id);
                else jsonError('Method not allowed.', 405);
            } else {
                if ($method === 'GET')       AdminController::listTeam();
                elseif ($method === 'POST')  AdminController::createTeam();
                else jsonError('Method not allowed.', 405);
            }

        } elseif ($resource === 'services') {
            if ($id !== null) {
                if ($method === 'PUT')        AdminController::updateService($id);
                elseif ($method === 'DELETE') AdminController::deleteService($id);
                else jsonError('Method not allowed.', 405);
            } else {
                if ($method === 'GET')       AdminController::listServices();
                elseif ($method === 'POST')  AdminController::createService();
                else jsonError('Method not allowed.', 405);
            }

        } elseif ($resource === 'settings') {
            if ($method === 'GET')     AdminController::getSettings();
            elseif ($method === 'PUT') AdminController::updateSettings();
            else jsonError('Method not allowed.', 405);

        } else {
            jsonError('Admin endpoint not found.', 404);
        }
    }
    exit;
}

// ─── Public routes ───────────────────────────────────────────────────────────
switch ($path) {
    case '/contact':
        ContactController::submit();
        break;

    case '/inquiry':
        InquiryController::submit();
        break;

    case '/team':
        if ($method === 'GET') PublicController::team();
        else jsonError('Method not allowed.', 405);
        break;

    case '/services':
        if ($method === 'GET') PublicController::services();
        else jsonError('Method not allowed.', 405);
        break;

    case '/public-settings':
        if ($method === 'GET') PublicController::siteSettings();
        else jsonError('Method not allowed.', 405);
        break;

    case '/health':
        jsonSuccess(['status' => 'ok', 'env' => APP_ENV]);
        break;

    default:
        jsonError('Endpoint not found.', 404);
        break;
}
