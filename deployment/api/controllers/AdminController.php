<?php

declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';

class AdminController
{
    // ─── Dashboard ──────────────────────────────────────────────────────────

    public static function stats(): void
    {
        $pdo = getDbConnection();

        $q = fn(string $sql) => (int)$pdo->query($sql)->fetchColumn();

        // Guard: services table may not exist yet if migration hasn't been run
        $activeServices = 0;
        try {
            $activeServices = $q("SELECT COUNT(*) FROM services WHERE is_active = 1");
        } catch (\PDOException $e) {
            // table doesn't exist yet — return 0
        }

        jsonSuccess([
            'total_contacts'   => $q('SELECT COUNT(*) FROM contact_submissions'),
            'new_contacts'     => $q("SELECT COUNT(*) FROM contact_submissions WHERE status = 'new'"),
            'total_partners'   => $q('SELECT COUNT(*) FROM partner_inquiries'),
            'new_partners'     => $q("SELECT COUNT(*) FROM partner_inquiries WHERE status = 'new'"),
            'active_team'      => $q('SELECT COUNT(*) FROM team_members WHERE is_active = 1'),
            'active_services'  => $activeServices,
        ]);
    }

    // ─── Inquiries ──────────────────────────────────────────────────────────

    public static function listInquiries(): void
    {
        $type   = ($_GET['type'] ?? 'contact') === 'partner' ? 'partner' : 'contact';
        $table  = $type === 'partner' ? 'partner_inquiries' : 'contact_submissions';
        $page   = max(1, (int)($_GET['page']  ?? 1));
        $limit  = min(50, max(1, (int)($_GET['limit'] ?? 20)));
        $status = $_GET['status'] ?? '';
        $search = trim($_GET['search'] ?? '');
        $offset = ($page - 1) * $limit;

        $where  = [];
        $params = [];

        if ($status && in_array($status, ['new', 'read', 'responded'], true)) {
            $where[]  = 'status = ?';
            $params[] = $status;
        }

        if ($search) {
            $like     = '%' . $search . '%';
            $where[]  = '(full_name LIKE ? OR email LIKE ? OR organisation LIKE ?)';
            $params   = array_merge($params, [$like, $like, $like]);
        }

        $whereStr = $where ? 'WHERE ' . implode(' AND ', $where) : '';
        $pdo      = getDbConnection();

        $count = $pdo->prepare("SELECT COUNT(*) FROM {$table} {$whereStr}");
        $count->execute($params);
        $total = (int)$count->fetchColumn();

        $rows = $pdo->prepare("SELECT * FROM {$table} {$whereStr} ORDER BY created_at DESC LIMIT {$limit} OFFSET {$offset}");
        $rows->execute($params);

        jsonSuccess([
            'items' => $rows->fetchAll(),
            'total' => $total,
            'page'  => $page,
            'limit' => $limit,
            'pages' => (int)ceil($total / $limit),
        ]);
    }

    public static function updateInquiry(int $id): void
    {
        $type   = ($_GET['type'] ?? 'contact') === 'partner' ? 'partner' : 'contact';
        $table  = $type === 'partner' ? 'partner_inquiries' : 'contact_submissions';
        $data   = json_decode(file_get_contents('php://input'), true) ?? [];
        $status = $data['status'] ?? '';

        if (!in_array($status, ['new', 'read', 'responded'], true)) {
            jsonError('Invalid status value.', 422);
        }

        $stmt = getDbConnection()->prepare("UPDATE {$table} SET status = ? WHERE id = ?");
        $stmt->execute([$status, $id]);

        if ($stmt->rowCount() === 0) {
            jsonError('Record not found.', 404);
        }
        jsonSuccess(['id' => $id, 'status' => $status]);
    }

    public static function deleteInquiry(int $id): void
    {
        $type  = ($_GET['type'] ?? 'contact') === 'partner' ? 'partner' : 'contact';
        $table = $type === 'partner' ? 'partner_inquiries' : 'contact_submissions';

        $stmt = getDbConnection()->prepare("DELETE FROM {$table} WHERE id = ?");
        $stmt->execute([$id]);

        if ($stmt->rowCount() === 0) {
            jsonError('Record not found.', 404);
        }
        jsonSuccess(['deleted' => true]);
    }

    // ─── Team ────────────────────────────────────────────────────────────────

    public static function listTeam(): void
    {
        $rows = getDbConnection()
            ->query('SELECT * FROM team_members ORDER BY sort_order ASC, id ASC')
            ->fetchAll();
        jsonSuccess(['items' => $rows]);
    }

    public static function createTeam(): void
    {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];
        $name = trim((string)($data['name'] ?? ''));
        $role = trim((string)($data['role'] ?? ''));

        if (!$name || !$role) {
            jsonError('Name and role are required.', 422);
        }

        $pdo = getDbConnection();
        $pdo->prepare(
            'INSERT INTO team_members (name, role, bio, linkedin, photo_url, sort_order, is_active)
             VALUES (?, ?, ?, ?, ?, ?, ?)'
        )->execute([
            $name,
            $role,
            trim((string)($data['bio']       ?? '')),
            trim((string)($data['linkedin']  ?? '')),
            trim((string)($data['photo_url'] ?? '')),
            (int)($data['sort_order'] ?? 0),
            isset($data['is_active']) ? (int)(bool)$data['is_active'] : 1,
        ]);

        $id   = (int)$pdo->lastInsertId();
        $stmt = $pdo->prepare('SELECT * FROM team_members WHERE id = ?');
        $stmt->execute([$id]);
        jsonSuccess(['item' => $stmt->fetch()], 201);
    }

    public static function updateTeam(int $id): void
    {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];
        $name = trim((string)($data['name'] ?? ''));
        $role = trim((string)($data['role'] ?? ''));

        if (!$name || !$role) {
            jsonError('Name and role are required.', 422);
        }

        $pdo = getDbConnection();
        $pdo->prepare(
            'UPDATE team_members SET name=?, role=?, bio=?, linkedin=?, photo_url=?, sort_order=?, is_active=?
             WHERE id=?'
        )->execute([
            $name,
            $role,
            trim((string)($data['bio']       ?? '')),
            trim((string)($data['linkedin']  ?? '')),
            trim((string)($data['photo_url'] ?? '')),
            (int)($data['sort_order'] ?? 0),
            isset($data['is_active']) ? (int)(bool)$data['is_active'] : 1,
            $id,
        ]);

        $stmt = $pdo->prepare('SELECT * FROM team_members WHERE id = ?');
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (!$row) {
            jsonError('Team member not found.', 404);
        }
        jsonSuccess(['item' => $row]);
    }

    public static function deleteTeam(int $id): void
    {
        $stmt = getDbConnection()->prepare('DELETE FROM team_members WHERE id = ?');
        $stmt->execute([$id]);

        if ($stmt->rowCount() === 0) {
            jsonError('Team member not found.', 404);
        }
        jsonSuccess(['deleted' => true]);
    }

    // ─── Services ────────────────────────────────────────────────────────────

    private static function parseServiceRow(array $row): array
    {
        $row['client_types']       = json_decode($row['client_types']       ?? '[]', true) ?: [];
        $row['transaction_scope']  = json_decode($row['transaction_scope']  ?? '[]', true) ?: [];
        $row['structuring_themes'] = json_decode($row['structuring_themes'] ?? '[]', true) ?: [];
        $row['image_url']          = $row['image_url'] ?? null;
        return $row;
    }

    private static function encodeLines(mixed $v): string
    {
        if (is_array($v)) {
            return json_encode(array_values(array_filter(array_map('trim', $v))));
        }
        $lines = preg_split('/\r?\n/', (string)$v);
        return json_encode(array_values(array_filter(array_map('trim', $lines))));
    }

    public static function listServices(): void
    {
        try {
            $rows = getDbConnection()
                ->query('SELECT * FROM services ORDER BY sort_order ASC, id ASC')
                ->fetchAll();
            $rows = array_map([self::class, 'parseServiceRow'], $rows);
        } catch (\PDOException $e) {
            $rows = [];
        }
        jsonSuccess(['items' => $rows]);
    }

    public static function createService(): void
    {
        $data  = json_decode(file_get_contents('php://input'), true) ?? [];
        $title = trim((string)($data['title'] ?? ''));
        if (!$title) jsonError('Title is required.', 422);

        $slug = trim((string)($data['slug'] ?? ''));
        if (!$slug) $slug = strtolower(trim(preg_replace('/[^a-z0-9]+/i', '-', $title), '-'));

        try {
            $pdo = getDbConnection();
            $pdo->prepare(
                'INSERT INTO services (slug, icon, title, overview, client_types, transaction_scope, structuring_themes, image_url, is_active, sort_order)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
            )->execute([
                $slug,
                trim((string)($data['icon']     ?? 'bi-briefcase')),
                $title,
                trim((string)($data['overview'] ?? '')),
                self::encodeLines($data['client_types']       ?? []),
                self::encodeLines($data['transaction_scope']  ?? []),
                self::encodeLines($data['structuring_themes'] ?? []),
                trim((string)($data['image_url'] ?? '')) ?: null,
                isset($data['is_active']) ? (int)(bool)$data['is_active'] : 1,
                (int)($data['sort_order'] ?? 0),
            ]);

            $id = (int)$pdo->lastInsertId();
            $st = $pdo->prepare('SELECT * FROM services WHERE id = ?');
            $st->execute([$id]);
            jsonSuccess(['item' => self::parseServiceRow($st->fetch())], 201);
        } catch (\PDOException $e) {
            jsonError('Database error: ' . $e->getMessage(), 500);
        }
    }

    public static function updateService(int $id): void
    {
        $data  = json_decode(file_get_contents('php://input'), true) ?? [];
        $title = trim((string)($data['title'] ?? ''));
        if (!$title) jsonError('Title is required.', 422);

        $slug = trim((string)($data['slug'] ?? ''));
        if (!$slug) $slug = strtolower(trim(preg_replace('/[^a-z0-9]+/i', '-', $title), '-'));

        try {
            $pdo = getDbConnection();
            $pdo->prepare(
                'UPDATE services SET slug=?, icon=?, title=?, overview=?, client_types=?, transaction_scope=?, structuring_themes=?, image_url=?, is_active=?, sort_order=?
                 WHERE id=?'
            )->execute([
                $slug,
                trim((string)($data['icon']     ?? 'bi-briefcase')),
                $title,
                trim((string)($data['overview'] ?? '')),
                self::encodeLines($data['client_types']       ?? []),
                self::encodeLines($data['transaction_scope']  ?? []),
                self::encodeLines($data['structuring_themes'] ?? []),
                trim((string)($data['image_url'] ?? '')) ?: null,
                isset($data['is_active']) ? (int)(bool)$data['is_active'] : 1,
                (int)($data['sort_order'] ?? 0),
                $id,
            ]);

            $st = $pdo->prepare('SELECT * FROM services WHERE id = ?');
            $st->execute([$id]);
            $row = $st->fetch();
            if (!$row) jsonError('Service not found.', 404);
            jsonSuccess(['item' => self::parseServiceRow($row)]);
        } catch (\PDOException $e) {
            jsonError('Database error: ' . $e->getMessage(), 500);
        }
    }

    public static function deleteService(int $id): void
    {
        $stmt = getDbConnection()->prepare('DELETE FROM services WHERE id = ?');
        $stmt->execute([$id]);
        if ($stmt->rowCount() === 0) jsonError('Service not found.', 404);
        jsonSuccess(['deleted' => true]);
    }

    // ─── Settings ────────────────────────────────────────────────────────────

    // ─── Photo Upload ─────────────────────────────────────────────────────────

    public static function uploadPhoto(): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            jsonError('Method not allowed.', 405);
        }

        if (empty($_FILES['photo']) || $_FILES['photo']['error'] !== UPLOAD_ERR_OK) {
            $code = $_FILES['photo']['error'] ?? 0;
            jsonError($code === UPLOAD_ERR_INI_SIZE ? 'File too large.' : 'No valid file uploaded.', 422);
        }

        $file    = $_FILES['photo'];
        $allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        $mime    = mime_content_type($file['tmp_name']);

        if (!in_array($mime, $allowed, true)) {
            jsonError('Only JPG, PNG, WebP, or GIF images are allowed.', 422);
        }

        if ($file['size'] > 5 * 1024 * 1024) {
            jsonError('Image must be under 5 MB.', 422);
        }

        $ext       = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION)) ?: 'jpg';
        $filename  = bin2hex(random_bytes(10)) . '.' . $ext;
        $uploadDir = __DIR__ . '/../../public/uploads/team/';

        if (!is_dir($uploadDir) && !mkdir($uploadDir, 0755, true)) {
            jsonError('Could not create upload directory.', 500);
        }

        if (!move_uploaded_file($file['tmp_name'], $uploadDir . $filename)) {
            jsonError('Failed to save the uploaded file.', 500);
        }

        // Build absolute URL — file is saved two dirs above backend/public, so go up three levels from SCRIPT_NAME
        $proto       = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
        $host        = $_SERVER['HTTP_HOST'] ?? 'localhost';
        $projectRoot = rtrim(dirname(dirname(dirname($_SERVER['SCRIPT_NAME']))), '/');
        $url         = $proto . '://' . $host . $projectRoot . '/public/uploads/team/' . $filename;

        jsonSuccess(['url' => $url], 201);
    }

    // ─── Settings ────────────────────────────────────────────────────────────

    public static function getSettings(): void
    {
        $rows = getDbConnection()
            ->query('SELECT setting_key, setting_value, setting_label FROM site_settings ORDER BY id ASC')
            ->fetchAll();

        $settings = [];
        foreach ($rows as $r) {
            $settings[$r['setting_key']] = [
                'value' => $r['setting_value'],
                'label' => $r['setting_label'],
            ];
        }
        jsonSuccess(['settings' => $settings]);
    }

    public static function updateSettings(): void
    {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];
        if (!is_array($data)) {
            jsonError('Invalid request body.', 400);
        }

        $pdo  = getDbConnection();
        $stmt = $pdo->prepare('UPDATE site_settings SET setting_value = ? WHERE setting_key = ?');

        foreach ($data as $key => $value) {
            $stmt->execute([trim((string)$value), $key]);
        }
        jsonSuccess(['message' => 'Settings saved.']);
    }
}
