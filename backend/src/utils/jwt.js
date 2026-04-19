const jwt  = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { query } = require('../config/db');

const ACCESS_EXPIRES  = process.env.JWT_EXPIRES_IN        || '7d';
const REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES_IN || '30d';
const REFRESH_MS      = 30 * 24 * 60 * 60 * 1000; // 30 days in ms

// ─── Generate Access Token ────────────────────────────────────────────────────
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role, member_id: user.member_id },
    process.env.JWT_SECRET,
    { expiresIn: ACCESS_EXPIRES }
  );
};

// ─── Generate & Store Refresh Token ──────────────────────────────────────────
const generateRefreshToken = async (userId) => {
  const token     = uuidv4();
  const expiresAt = new Date(Date.now() + REFRESH_MS);

  await query(
    'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
    [userId, token, expiresAt]
  );

  return token;
};

// ─── Verify & Rotate Refresh Token ───────────────────────────────────────────
const rotateRefreshToken = async (oldToken) => {
  const { rows } = await query(
    `SELECT rt.*, u.id AS uid, u.role, u.member_id, u.status
     FROM refresh_tokens rt
     JOIN users u ON u.id = rt.user_id
     WHERE rt.token = $1 AND rt.expires_at > NOW()`,
    [oldToken]
  );

  if (!rows.length) return null;

  const record = rows[0];
  if (record.status === 'suspended' || record.status === 'inactive') return null;

  // Delete old token
  await query('DELETE FROM refresh_tokens WHERE token = $1', [oldToken]);

  // Issue new pair
  const user         = { id: record.uid, role: record.role, member_id: record.member_id };
  const accessToken  = generateAccessToken(user);
  const refreshToken = await generateRefreshToken(record.uid);

  return { accessToken, refreshToken, user };
};

// ─── Revoke Refresh Token ─────────────────────────────────────────────────────
const revokeRefreshToken = async (token) => {
  await query('DELETE FROM refresh_tokens WHERE token = $1', [token]);
};

// ─── Revoke all tokens for user (on password change / account lock) ───────────
const revokeAllTokens = async (userId) => {
  await query('DELETE FROM refresh_tokens WHERE user_id = $1', [userId]);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  rotateRefreshToken,
  revokeRefreshToken,
  revokeAllTokens,
};
