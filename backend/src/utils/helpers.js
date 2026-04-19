const crypto = require('crypto');

/**
 * Generate a unique referral code for a user.
 * Format: IW + 6 random uppercase alphanumeric chars → e.g. IWAB3X9K
 */
const generateReferralCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no ambiguous chars
  let code = 'IW';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
};

/**
 * Generate a 6-digit numeric OTP
 */
const generateOTP = () => {
  return String(Math.floor(100000 + Math.random() * 900000));
};

/**
 * Get client IP from request (works behind Render's proxy)
 */
const getClientIP = (req) => {
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    'unknown'
  );
};

/**
 * Strip sensitive fields before returning user to client
 */
const sanitizeUser = (user) => {
  const { password_hash, reset_otp, reset_otp_expires, ...safe } = user;
  return safe;
};

/**
 * Paginate query helper — returns { limit, offset, page }
 */
const getPagination = (query) => {
  const page   = Math.max(1, parseInt(query.page  || '1',  10));
  const limit  = Math.min(100, Math.max(1, parseInt(query.limit || '20', 10)));
  const offset = (page - 1) * limit;
  return { page, limit, offset };
};

/**
 * Build paginated response envelope
 */
const paginatedResponse = (rows, total, page, limit) => ({
  data:       rows,
  pagination: {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasNext:    page * limit < total,
    hasPrev:    page > 1,
  },
});

module.exports = {
  generateReferralCode,
  generateOTP,
  getClientIP,
  sanitizeUser,
  getPagination,
  paginatedResponse,
};
