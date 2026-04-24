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

    /** Public services list — active only */
    public static function services(): void
    {
        try {
            $rows = getDbConnection()
                ->query(
                    'SELECT id, slug, icon, title, overview, client_types, transaction_scope, structuring_themes, image_url
                     FROM services
                     WHERE is_active = 1
                     ORDER BY sort_order ASC, id ASC'
                )
                ->fetchAll();

            foreach ($rows as &$row) {
                $row['client_types']       = json_decode($row['client_types']       ?? '[]', true) ?: [];
                $row['transaction_scope']  = json_decode($row['transaction_scope']  ?? '[]', true) ?: [];
                $row['structuring_themes'] = json_decode($row['structuring_themes'] ?? '[]', true) ?: [];
            }
        } catch (\PDOException $e) {
            $rows = []; // table not yet migrated — frontend falls back to static data
        }

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
