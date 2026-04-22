<?php

function sanitize(string $value): string {
    return htmlspecialchars(strip_tags(trim($value)), ENT_QUOTES, 'UTF-8');
}

function validateContactForm(array $data): array {
    $errors = [];

    $required = ['full_name', 'organisation', 'email', 'inquiry_type', 'subject', 'message'];
    foreach ($required as $field) {
        if (empty(trim((string) ($data[$field] ?? '')))) {
            $label = ucfirst(str_replace('_', ' ', $field));
            $errors[$field] = "{$label} is required.";
        }
    }

    if (!empty($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Please provide a valid email address.';
    }

    $validTypes = ['project_sponsor', 'ppp_authority', 'institutional_investor', 'dfi', 'mfi', 'other'];
    if (!empty($data['inquiry_type']) && !in_array($data['inquiry_type'], $validTypes, true)) {
        $errors['inquiry_type'] = 'Invalid inquiry type selected.';
    }

    if (!empty($data['message']) && strlen(trim((string) $data['message'])) < 20) {
        $errors['message'] = 'Message must be at least 20 characters.';
    }

    return $errors;
}

function validateInquiryForm(array $data): array {
    $errors = [];

    $required = ['full_name', 'organisation', 'email', 'message'];
    foreach ($required as $field) {
        if (empty(trim((string) ($data[$field] ?? '')))) {
            $label = ucfirst(str_replace('_', ' ', $field));
            $errors[$field] = "{$label} is required.";
        }
    }

    if (!empty($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Please provide a valid email address.';
    }

    if (!empty($data['message']) && strlen(trim((string) $data['message'])) < 20) {
        $errors['message'] = 'Message must be at least 20 characters.';
    }

    return $errors;
}
