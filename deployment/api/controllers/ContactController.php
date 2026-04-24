<?php

require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../helpers/validator.php';
require_once __DIR__ . '/../models/ContactSubmission.php';

class ContactController {

    public static function submit(): void {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            jsonError('Method not allowed.', 405);
        }

        $raw  = file_get_contents('php://input');
        $data = json_decode($raw, true);

        if (!is_array($data)) {
            jsonError('Invalid request body.', 400);
        }

        $clean = [
            'full_name'    => sanitize((string) ($data['full_name']    ?? '')),
            'organisation' => sanitize((string) ($data['organisation'] ?? '')),
            'email'        => sanitize((string) ($data['email']        ?? '')),
            'phone'        => sanitize((string) ($data['phone']        ?? '')),
            'inquiry_type' => sanitize((string) ($data['inquiry_type'] ?? '')),
            'subject'      => sanitize((string) ($data['subject']      ?? '')),
            'message'      => sanitize((string) ($data['message']      ?? '')),
        ];

        $errors = validateContactForm($clean);
        if (!empty($errors)) {
            jsonError('Validation failed. Please check the form and try again.', 422, $errors);
        }

        $id = ContactSubmission::create($clean);

        jsonSuccess(
            ['id' => $id, 'message' => 'Your inquiry has been received. We will be in touch shortly.'],
            201
        );
    }
}
