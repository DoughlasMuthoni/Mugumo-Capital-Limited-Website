<?php

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';

class AdminAuthController
{
    private static function extractToken(): ?string
    {
        // Apache may strip the Authorization header; check multiple locations
        $auth = $_SERVER['HTTP_AUTHORIZATION']
             ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION']
             ?? '';

        if (!$auth && function_exists('getallheaders')) {
            $headers = getallheaders();
            $auth = $headers['Authorization'] ?? $headers['authorization'] ?? '';
        }

        if (str_starts_with($auth, 'Bearer ')) {
            return trim(substr($auth, 7));
        }
        return null;
    }

    /** Called at the top of every protected admin route. Exits on failure. */
    public static function requireAuth(): void
    {
        $token = self::extractToken();
        if (!$token) {
            jsonError('Unauthorized.', 401);
        }
        $pdo  = getDbConnection();
        $stmt = $pdo->prepare(
            'SELECT id FROM admin_users WHERE auth_token = ? AND token_expires_at > NOW()'
        );
        $stmt->execute([$token]);
        if (!$stmt->fetch()) {
            jsonError('Session expired or invalid. Please log in again.', 401);
        }
    }

    public static function login(): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            jsonError('Method not allowed.', 405);
        }

        $data     = json_decode(file_get_contents('php://input'), true) ?? [];
        $username = trim((string)($data['username'] ?? ''));
        $password = (string)($data['password'] ?? '');

        if (!$username || !$password) {
            jsonError('Username and password are required.', 422);
        }

        $pdo  = getDbConnection();
        $stmt = $pdo->prepare(
            'SELECT id, username, password_hash FROM admin_users WHERE username = ?'
        );
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($password, $user['password_hash'])) {
            jsonError('Invalid credentials.', 401);
        }

        $token   = bin2hex(random_bytes(32));
        $expires = (new DateTime('+24 hours'))->format('Y-m-d H:i:s');

        $pdo->prepare(
            'UPDATE admin_users SET auth_token = ?, token_expires_at = ?, last_login = NOW() WHERE id = ?'
        )->execute([$token, $expires, $user['id']]);

        jsonSuccess([
            'token'      => $token,
            'expires_at' => $expires,
            'username'   => $user['username'],
        ]);
    }

    public static function logout(): void
    {
        $token = self::extractToken();
        if ($token) {
            getDbConnection()
                ->prepare('UPDATE admin_users SET auth_token = NULL, token_expires_at = NULL WHERE auth_token = ?')
                ->execute([$token]);
        }
        jsonSuccess(['message' => 'Logged out.']);
    }

    public static function verify(): void
    {
        $token = self::extractToken();
        if (!$token) {
            jsonError('Unauthorized.', 401);
        }
        $stmt = getDbConnection()->prepare(
            'SELECT username FROM admin_users WHERE auth_token = ? AND token_expires_at > NOW()'
        );
        $stmt->execute([$token]);
        $user = $stmt->fetch();

        if (!$user) {
            jsonError('Session expired.', 401);
        }
        jsonSuccess(['username' => $user['username']]);
    }
}
