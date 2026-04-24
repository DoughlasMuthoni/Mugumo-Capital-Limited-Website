<?php

require_once __DIR__ . '/../config/database.php';

class Inquiry {

    public static function create(array $data): int {
        $pdo  = getDbConnection();
        $stmt = $pdo->prepare(
            'INSERT INTO partner_inquiries
             (full_name, organisation, email, investor_type, interest_area, message, ip_address)
             VALUES (:full_name, :organisation, :email, :investor_type, :interest_area, :message, :ip_address)'
        );
        $stmt->execute([
            ':full_name'    => $data['full_name'],
            ':organisation' => $data['organisation'],
            ':email'        => $data['email'],
            ':investor_type'  => $data['investor_type'] ?: null,
            ':interest_area'  => $data['interest_area'] ?: null,
            ':message'      => $data['message'],
            ':ip_address'   => $_SERVER['REMOTE_ADDR'] ?? null,
        ]);
        return (int) $pdo->lastInsertId();
    }
}
