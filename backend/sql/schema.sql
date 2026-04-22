CREATE DATABASE IF NOT EXISTS mugumo_capital
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE mugumo_capital;

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
  ip_address     VARCHAR(45)   NULL,
  created_at     DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email        (email),
  INDEX idx_inquiry_type (inquiry_type),
  INDEX idx_created_at   (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS partner_inquiries (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name     VARCHAR(120)  NOT NULL,
  organisation  VARCHAR(150)  NOT NULL,
  email         VARCHAR(200)  NOT NULL,
  investor_type VARCHAR(100)  NULL,
  interest_area VARCHAR(200)  NULL,
  message       TEXT          NOT NULL,
  ip_address    VARCHAR(45)   NULL,
  created_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email      (email),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email      VARCHAR(200) NOT NULL,
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_email (email),
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
