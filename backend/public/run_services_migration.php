<?php
// Run once to create services table — delete this file immediately after running
require_once __DIR__ . '/../config/database.php';

$pdo = getDbConnection();

$sql = "CREATE TABLE IF NOT EXISTS services (
  id                  INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug                VARCHAR(100) NOT NULL,
  icon                VARCHAR(100) NOT NULL DEFAULT 'bi-briefcase',
  title               VARCHAR(255) NOT NULL,
  overview            TEXT         NULL,
  client_types        TEXT         NULL,
  transaction_scope   TEXT         NULL,
  structuring_themes  TEXT         NULL,
  is_active           TINYINT(1)   NOT NULL DEFAULT 1,
  sort_order          TINYINT UNSIGNED NOT NULL DEFAULT 0,
  created_at          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

$pdo->exec($sql);
echo json_encode(['success' => true, 'message' => 'services table created. Delete this file now.']);
