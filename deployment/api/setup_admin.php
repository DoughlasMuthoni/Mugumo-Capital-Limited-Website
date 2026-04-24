<?php
/**
 * ONE-TIME admin user setup script.
 * 1. Visit https://mugumocapitalpartners.africa/api/setup_admin.php in your browser.
 * 2. The default admin account will be created.
 * 3. DELETE this file from the server immediately after use.
 *
 * Default credentials:
 *   Username : admin
 *   Password : Mugumo@2024
 */

require_once __DIR__ . '/config/database.php';

$username = 'admin';
$password = 'Mugumo@2024';
$hash     = password_hash($password, PASSWORD_BCRYPT);

try {
    $pdo = getDbConnection();

    // Upsert: update hash if user exists, insert if not
    $exists = $pdo->prepare('SELECT id FROM admin_users WHERE username = ?');
    $exists->execute([$username]);

    if ($exists->fetch()) {
        $pdo->prepare('UPDATE admin_users SET password_hash = ? WHERE username = ?')
            ->execute([$hash, $username]);
        echo '<p style="font-family:sans-serif;color:green;">Admin password updated successfully.</p>';
    } else {
        $pdo->prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)')
            ->execute([$username, $hash]);
        echo '<p style="font-family:sans-serif;color:green;">Admin user created successfully.</p>';
    }

    echo '<p style="font-family:sans-serif;"><strong>Username:</strong> admin<br>';
    echo '<strong>Password:</strong> Mugumo@2024</p>';
    echo '<p style="font-family:sans-serif;color:red;"><strong>IMPORTANT: Delete this file from your server now!</strong></p>';

} catch (Exception $e) {
    echo '<p style="font-family:sans-serif;color:red;">Error: ' . htmlspecialchars($e->getMessage()) . '</p>';
}
