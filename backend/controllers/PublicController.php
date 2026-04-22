<?php

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';

class PublicController
{
    /** Public team roster — only active members, no sensitive columns */
    public static function team(): void
    {
        $rows = getDbConnection()
            ->query(
                'SELECT id, name, role, bio, linkedin, photo_url
                 FROM team_members
                 WHERE is_active = 1
                 ORDER BY sort_order ASC, id ASC'
            )
            ->fetchAll();

        jsonSuccess(['items' => $rows]);
    }

    /** Public site settings — only a safe subset of keys */
    public static function siteSettings(): void
    {
        $allowed = ['contact_email', 'office_address', 'office_phone', 'whatsapp_number', 'linkedin_url'];
        $pdo     = getDbConnection();

        $rows = $pdo->query(
            'SELECT setting_key, setting_value FROM site_settings WHERE setting_key IN (\''
            . implode("','", $allowed) . '\')'
        )->fetchAll();

        $out = [];
        foreach ($rows as $r) {
            $out[$r['setting_key']] = $r['setting_value'] ?? '';
        }

        jsonSuccess(['settings' => $out]);
    }
}
