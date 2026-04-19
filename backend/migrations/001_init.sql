-- ─────────────────────────────────────────────────────────────────────────────
-- INDIWA Database Schema — v1
-- Run: node migrations/run.js
-- ─────────────────────────────────────────────────────────────────────────────

-- ─── Extensions ──────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── Users / Members ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id                SERIAL PRIMARY KEY,
  member_id         VARCHAR(20)  UNIQUE,              -- auto-generated: IW-000001
  name              VARCHAR(255) NOT NULL,
  email             VARCHAR(255) UNIQUE NOT NULL,
  mobile            VARCHAR(15)  UNIQUE NOT NULL,
  password_hash     VARCHAR(255) NOT NULL,

  -- Referral
  referral_code     VARCHAR(50),                      -- code THIS user can share
  referred_by       VARCHAR(50),                      -- referral_code of sponsor
  position          VARCHAR(10)  CHECK (position IN ('Left', 'Right')),

  -- Location
  pincode           VARCHAR(10),
  state             VARCHAR(100),
  district          VARCHAR(100),

  -- Account
  role              VARCHAR(20)  NOT NULL DEFAULT 'member'
                    CHECK (role IN ('member', 'admin', 'moderator')),
  status            VARCHAR(20)  NOT NULL DEFAULT 'active'
                    CHECK (status IN ('active', 'inactive', 'suspended', 'pending')),

  -- OTP / Password reset
  reset_otp         VARCHAR(6),
  reset_otp_expires TIMESTAMP WITH TIME ZONE,

  created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─── Refresh Tokens ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS refresh_tokens (
  id         SERIAL PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token      VARCHAR(512) NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─── Events ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS events (
  id               SERIAL PRIMARY KEY,
  title            VARCHAR(255) NOT NULL,
  description      TEXT,
  type             VARCHAR(50)  NOT NULL DEFAULT 'general'
                   CHECK (type IN ('general', 'workshop', 'seminar', 'rally', 'meeting', 'other')),
  event_date       TIMESTAMP WITH TIME ZONE NOT NULL,
  location         VARCHAR(255),
  image_url        VARCHAR(500),
  registration_url VARCHAR(500),
  status           VARCHAR(20)  NOT NULL DEFAULT 'draft'
                   CHECK (status IN ('draft', 'published', 'cancelled')),
  created_by       INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at       TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at       TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─── Contact / Enquiries ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_submissions (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  email       VARCHAR(255) NOT NULL,
  mobile      VARCHAR(15),
  subject     VARCHAR(255),
  message     TEXT         NOT NULL,
  status      VARCHAR(20)  NOT NULL DEFAULT 'new'
              CHECK (status IN ('new', 'in_progress', 'resolved', 'closed')),
  admin_notes TEXT,
  ip_address  VARCHAR(50),
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─── Indexes ──────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_users_email        ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_mobile       ON users(mobile);
CREATE INDEX IF NOT EXISTS idx_users_status       ON users(status);
CREATE INDEX IF NOT EXISTS idx_users_referral     ON users(referral_code);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens     ON refresh_tokens(token);
CREATE INDEX IF NOT EXISTS idx_events_type        ON events(type);
CREATE INDEX IF NOT EXISTS idx_events_date        ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_status      ON events(status);
CREATE INDEX IF NOT EXISTS idx_contact_status     ON contact_submissions(status);

-- ─── Auto-update updated_at ──────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_users_updated_at ON users;
CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_events_updated_at ON events;
CREATE TRIGGER trg_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_contact_updated_at ON contact_submissions;
CREATE TRIGGER trg_contact_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── Auto-generate member_id ─────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION generate_member_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.member_id := 'IW-' || LPAD(NEW.id::TEXT, 6, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_users_member_id ON users;
CREATE TRIGGER trg_users_member_id
  BEFORE INSERT ON users
  FOR EACH ROW
  WHEN (NEW.member_id IS NULL)
  EXECUTE FUNCTION generate_member_id();

-- ─── Seed: Default Admin ─────────────────────────────────────────────────────
-- Password: Admin@1234  (change immediately after first login)
-- Hash generated with bcrypt 12 rounds
INSERT INTO users (name, email, mobile, password_hash, role, status, referral_code)
VALUES (
  'INDIWA Admin',
  'admin@indiwa.org',
  '9000000000',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TsbnBBdqRU5m3PIQV2z9dFsTBKvO',
  'admin',
  'active',
  'INDIWA-ADMIN'
)
ON CONFLICT (email) DO NOTHING;
