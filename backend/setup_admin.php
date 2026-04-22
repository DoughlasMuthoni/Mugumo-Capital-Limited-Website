<?php
/**
 * One-time admin user setup script.
 * Run from the backend directory:  php setup_admin.php
 * Optional: php setup_admin.php myCustomPassword
 *
 * Default credentials:
 *   Username : admin
 *   Password : Mugumo@2024
 */

require_once __DIR__ . '/config/database.php';

$username = 'admin';
$password = $argv[1] ?? 'Mugumo@2024';
$hash     = password_hash($password, PASSWORD_BCRYPT);

try {
    $pdo = getDbConnection();

    // Upsert: if admin already exists, update the password hash
    $exists = $pdo->prepare('SELECT id FROM admin_users WHERE username = ?');
    $exists->execute([$username]);
    $row = $exists->fetch();

    if ($row) {
        $pdo->prepare('UPDATE admin_users SET password_hash = ? WHERE username = ?')
            ->execute([$hash, $username]);
        echo "Admin user '{$username}' password updated.\n";
    } else {
        $pdo->prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)')
            ->execute([$username, $hash]);
        echo "Admin user '{$username}' created.\n";
    }

    echo "Password : {$password}\n";
    echo "Login at  : /admin/login\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    exit(1);
}
