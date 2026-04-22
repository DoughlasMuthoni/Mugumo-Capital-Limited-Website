-- Admin migration: run once on existing mugumo_capital database
USE mugumo_capital;

-- Add status column to contact_submissions (idempotent)
SET @sql_1 = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
   WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'contact_submissions' AND COLUMN_NAME = 'status') = 0,
  "ALTER TABLE contact_submissions ADD COLUMN status ENUM('new','read','responded') NOT NULL DEFAULT 'new' AFTER message",
  "SELECT 'status column already exists on contact_submissions'"
));
PREPARE stmt FROM @sql_1;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add status column to partner_inquiries (idempotent)
SET @sql_2 = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
   WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'partner_inquiries' AND COLUMN_NAME = 'status') = 0,
  "ALTER TABLE partner_inquiries ADD COLUMN status ENUM('new','read','responded') NOT NULL DEFAULT 'new' AFTER message",
  "SELECT 'status column already exists on partner_inquiries'"
));
PREPARE stmt FROM @sql_2;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id               INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username         VARCHAR(60)  NOT NULL,
  password_hash    VARCHAR(255) NOT NULL,
  auth_token       VARCHAR(128) NULL,
  token_expires_at DATETIME     NULL,
  last_login       DATETIME     NULL,
  created_at       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_username   (username),
  INDEX idx_auth_token (auth_token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(120) NOT NULL,
  role        VARCHAR(120) NOT NULL,
  bio         TEXT         NULL,
  linkedin    VARCHAR(255) NULL,
  photo_url   VARCHAR(255) NULL,
  sort_order  TINYINT UNSIGNED NOT NULL DEFAULT 0,
  is_active   TINYINT(1)   NOT NULL DEFAULT 1,
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Site settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  setting_key   VARCHAR(80)  NOT NULL,
  setting_value TEXT         NULL,
  setting_label VARCHAR(120) NOT NULL,
  updated_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_setting_key (setting_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Default site settings (safe to re-run)
INSERT IGNORE INTO site_settings (setting_key, setting_label, setting_value) VALUES
  ('whatsapp_number', 'WhatsApp Number (with country code, no +)', '254700000000'),
  ('contact_email',   'Contact Email',   'info@mugumocapital.com'),
  ('office_address',  'Office Address',  'Nairobi, Kenya'),
  ('office_phone',    'Office Phone',    ''),
  ('linkedin_url',    'Company LinkedIn URL', '');
