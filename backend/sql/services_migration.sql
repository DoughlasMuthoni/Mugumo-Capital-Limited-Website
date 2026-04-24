-- Services migration: run once on existing mugumo_capital database
USE mugumo_capital;

CREATE TABLE IF NOT EXISTS services (
  id                  INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug                VARCHAR(100) NOT NULL,
  icon                VARCHAR(100) NOT NULL DEFAULT 'bi-briefcase',
  title               VARCHAR(255) NOT NULL,
  overview            TEXT         NULL,
  client_types        TEXT         NULL COMMENT 'JSON array',
  transaction_scope   TEXT         NULL COMMENT 'JSON array',
  structuring_themes  TEXT         NULL COMMENT 'JSON array',
  image_url           VARCHAR(500) NULL DEFAULT NULL,
  is_active           TINYINT(1)   NOT NULL DEFAULT 1,
  sort_order          TINYINT UNSIGNED NOT NULL DEFAULT 0,
  created_at          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Run this if the table already exists (safe to run even if column already present on MySQL 8+)
-- For MySQL 5.7 run manually only if upgrading an existing database:
-- ALTER TABLE services ADD COLUMN image_url VARCHAR(500) NULL DEFAULT NULL AFTER structuring_themes;
