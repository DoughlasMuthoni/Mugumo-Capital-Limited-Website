<?php

require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../helpers/validator.php';
require_once __DIR__ . '/../models/Inquiry.php';

class InquiryController {

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
            'full_name'     => sanitize((string) ($data['full_name']     ?? '')),
            'organisation'  => sanitize((string) ($data['organisation']  ?? '')),
            'email'         => sanitize((string) ($data['email']         ?? '')),
            'investor_type' => sanitize((string) ($data['investor_type'] ?? '')),
            'interest_area' => sanitize((string) ($data['interest_area'] ?? '')),
            'message'       => sanitize((string) ($data['message']       ?? '')),
        ];

        $errors = validateInquiryForm($clean);
        if (!empty($errors)) {
            jsonError('Validation failed. Please check the form and try again.', 422, $errors);
        }

        $id = Inquiry::create($clean);

        jsonSuccess(
            ['id' => $id, 'message' => 'Your partnership inquiry has been received.'],
            201
        );
    }
}
