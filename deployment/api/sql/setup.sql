-- ============================================================
-- Mugumo Capital Partners — Full Database Setup
-- Run this entire file in phpMyAdmin on database: vdarmulh_mugumo_partners
-- ============================================================

-- Contact submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id             INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name      VARCHAR(120)  NOT NULL,
  organisation   VARCHAR(150)  NOT NULL,
  email          VARCHAR(200)  NOT NULL,
  phone          VARCHAR(30)   NULL,
  inquiry_type   ENUM(
    'project_sponsor',
    'ppp_authority',
    'institutional_investor',
    'dfi',
    'mfi',
    'other'
  ) NOT NULL,
  subject        VARCHAR(255)  NOT NULL,
  message        TEXT          NOT NULL,
  status         ENUM('new','read','responded') NOT NULL DEFAULT 'new',
  ip_address     VARCHAR(45)   NULL,
  created_at     DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email        (email),
  INDEX idx_inquiry_type (inquiry_type),
  INDEX idx_created_at   (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Partner inquiries
CREATE TABLE IF NOT EXISTS partner_inquiries (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name     VARCHAR(120)  NOT NULL,
  organisation  VARCHAR(150)  NOT NULL,
  email         VARCHAR(200)  NOT NULL,
  investor_type VARCHAR(100)  NULL,
  interest_area VARCHAR(200)  NULL,
  message       TEXT          NOT NULL,
  status        ENUM('new','read','responded') NOT NULL DEFAULT 'new',
  ip_address    VARCHAR(45)   NULL,
  created_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email      (email),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Newsletter subscribers (optional)
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email      VARCHAR(200) NOT NULL,
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Admin users
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

-- Team members
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

-- Site settings
CREATE TABLE IF NOT EXISTS site_settings (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  setting_key   VARCHAR(80)  NOT NULL,
  setting_value TEXT         NULL,
  setting_label VARCHAR(120) NOT NULL,
  updated_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_setting_key (setting_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Default site settings
INSERT IGNORE INTO site_settings (setting_key, setting_label, setting_value) VALUES
  ('whatsapp_number', 'WhatsApp Number (with country code, no +)', '254700000000'),
  ('contact_email',   'Contact Email',                             'info@mugumocapital.com'),
  ('office_address',  'Office Address',                            'Nairobi, Kenya'),
  ('office_phone',    'Office Phone',                              ''),
  ('linkedin_url',    'Company LinkedIn URL',                      '');

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id                  INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug                VARCHAR(100) NOT NULL,
  icon                VARCHAR(100) NOT NULL DEFAULT 'bi-briefcase',
  title               VARCHAR(255) NOT NULL,
  overview            TEXT         NULL,
  client_types        TEXT         NULL COMMENT 'JSON array',
  transaction_scope   TEXT         NULL COMMENT 'JSON array',
  structuring_themes  TEXT         NULL COMMENT 'JSON array',
  is_active           TINYINT(1)   NOT NULL DEFAULT 1,
  sort_order          TINYINT UNSIGNED NOT NULL DEFAULT 0,
  created_at          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
