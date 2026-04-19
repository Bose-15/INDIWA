const bcrypt = require('bcryptjs');
const { query, withTransaction } = require('../config/db');
const {
  generateAccessToken,
  generateRefreshToken,
  rotateRefreshToken,
  revokeRefreshToken,
  revokeAllTokens,
} = require('../utils/jwt');
const {
  generateReferralCode,
  generateOTP,
  sanitizeUser,
  getClientIP,
} = require('../utils/helpers');

const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || '12', 10);

// ─── POST /api/auth/register ──────────────────────────────────────────────────
const register = async (req, res, next) => {
  try {
    const { name, email, mobile, password, referral_code, pincode, state, district, position } = req.body;

    // Check duplicates
    const dup = await query(
      'SELECT id, email, mobile FROM users WHERE email = $1 OR mobile = $2',
      [email.toLowerCase(), mobile]
    );
    if (dup.rows.length) {
      const field = dup.rows[0].email === email.toLowerCase() ? 'Email' : 'Mobile number';
      return res.status(409).json({ success: false, message: `${field} already registered` });
    }

    // Validate referral code exists (if provided)
    if (referral_code) {
      const ref = await query('SELECT id FROM users WHERE referral_code = $1', [referral_code]);
      if (!ref.rows.length) {
        return res.status(400).json({ success: false, message: 'Invalid referral code' });
      }
    }

    const password_hash   = await bcrypt.hash(password, BCRYPT_ROUNDS);
    const my_referral_code = generateReferralCode();

    const result = await withTransaction(async (client) => {
      const { rows } = await client.query(
        `INSERT INTO users
          (name, email, mobile, password_hash, referred_by, referral_code, pincode, state, district, position)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
         RETURNING *`,
        [
          name.trim(),
          email.toLowerCase().trim(),
          mobile.trim(),
          password_hash,
          referral_code || null,
          my_referral_code,
          pincode || null,
          state   || null,
          district|| null,
          position|| null,
        ]
      );

      // Update member_id (trigger handles it but let's confirm)
      await client.query(
        "UPDATE users SET member_id = 'IW-' || LPAD(id::TEXT, 6, '0') WHERE id = $1 AND member_id IS NULL",
        [rows[0].id]
      );

      const { rows: fresh } = await client.query('SELECT * FROM users WHERE id = $1', [rows[0].id]);
      return fresh[0];
    });

    const accessToken  = generateAccessToken(result);
    const refreshToken = await generateRefreshToken(result.id);

    res.status(201).json({
      success: true,
      message: 'Registration successful. Welcome to INDIWA!',
      data: {
        user:         sanitizeUser(result),
        accessToken,
        refreshToken,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
const login = async (req, res, next) => {
  try {
    const { mobile, password } = req.body;

    const { rows } = await query('SELECT * FROM users WHERE mobile = $1', [mobile.trim()]);
    if (!rows.length) {
      return res.status(401).json({ success: false, message: 'Invalid mobile number or password' });
    }

    const user = rows[0];

    if (user.status === 'suspended') {
      return res.status(403).json({ success: false, message: 'Account suspended. Contact support@indiwa.org' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid mobile number or password' });
    }

    const accessToken  = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user.id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user:         sanitizeUser(user),
        accessToken,
        refreshToken,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ─── POST /api/auth/refresh ───────────────────────────────────────────────────
const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ success: false, message: 'Refresh token required' });
    }

    const result = await rotateRefreshToken(refreshToken);
    if (!result) {
      return res.status(401).json({ success: false, message: 'Invalid or expired refresh token' });
    }

    res.json({
      success: true,
      data: {
        accessToken:  result.accessToken,
        refreshToken: result.refreshToken,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ─── POST /api/auth/logout ────────────────────────────────────────────────────
const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) await revokeRefreshToken(refreshToken);
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
};

// ─── GET /api/auth/me ─────────────────────────────────────────────────────────
const me = async (req, res, next) => {
  try {
    const { rows } = await query('SELECT * FROM users WHERE id = $1', [req.user.id]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: sanitizeUser(rows[0]) });
  } catch (err) {
    next(err);
  }
};

// ─── POST /api/auth/forgot-password ──────────────────────────────────────────
const forgotPassword = async (req, res, next) => {
  try {
    const { mobile } = req.body;
    const { rows } = await query('SELECT id FROM users WHERE mobile = $1', [mobile.trim()]);

    // Always return success (don't reveal whether mobile exists)
    if (!rows.length) {
      return res.json({ success: true, message: 'If this mobile is registered, an OTP will be sent.' });
    }

    const otp     = generateOTP();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    await query(
      'UPDATE users SET reset_otp = $1, reset_otp_expires = $2 WHERE id = $3',
      [otp, expires, rows[0].id]
    );

    // TODO: Integrate SMS provider (Twilio / MSG91) to send OTP
    // For now, log in development
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[DEV] OTP for ${mobile}: ${otp}`);
    }

    res.json({ success: true, message: 'If this mobile is registered, an OTP will be sent.' });
  } catch (err) {
    next(err);
  }
};

// ─── POST /api/auth/reset-password ───────────────────────────────────────────
const resetPassword = async (req, res, next) => {
  try {
    const { mobile, otp, newPassword } = req.body;

    const { rows } = await query(
      `SELECT id FROM users
       WHERE mobile = $1
         AND reset_otp = $2
         AND reset_otp_expires > NOW()`,
      [mobile.trim(), otp]
    );

    if (!rows.length) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    const password_hash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);

    await query(
      'UPDATE users SET password_hash=$1, reset_otp=NULL, reset_otp_expires=NULL WHERE id=$2',
      [password_hash, rows[0].id]
    );

    // Revoke all sessions
    await revokeAllTokens(rows[0].id);

    res.json({ success: true, message: 'Password reset successful. Please log in.' });
  } catch (err) {
    next(err);
  }
};

// ─── PUT /api/auth/change-password ───────────────────────────────────────────
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const { rows } = await query('SELECT password_hash FROM users WHERE id=$1', [req.user.id]);

    const match = await bcrypt.compare(currentPassword, rows[0].password_hash);
    if (!match) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }

    const password_hash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
    await query('UPDATE users SET password_hash=$1 WHERE id=$2', [password_hash, req.user.id]);
    await revokeAllTokens(req.user.id);

    res.json({ success: true, message: 'Password changed. Please log in again.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, refresh, logout, me, forgotPassword, resetPassword, changePassword };
