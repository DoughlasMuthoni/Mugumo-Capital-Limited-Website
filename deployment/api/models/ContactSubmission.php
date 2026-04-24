<?php

require_once __DIR__ . '/../config/database.php';

class ContactSubmission {

    public static function create(array $data): int {
        $pdo  = getDbConnection();
        $stmt = $pdo->prepare(
            'INSERT INTO contact_submissions
             (full_name, organisation, email, phone, inquiry_type, subject, message, ip_address)
             VALUES (:full_name, :organisation, :email, :phone, :inquiry_type, :subject, :message, :ip_address)'
        );
        $stmt->execute([
            ':full_name'    => $data['full_name'],
            ':organisation' => $data['organisation'],
            ':email'        => $data['email'],
            ':phone'        => $data['phone'] ?: null,
            ':inquiry_type' => $data['inquiry_type'],
            ':subject'      => $data['subject'],
            ':message'      => $data['message'],
            ':ip_address'   => $_SERVER['REMOTE_ADDR'] ?? null,
        ]);
        return (int) $pdo->lastInsertId();
    }
}
