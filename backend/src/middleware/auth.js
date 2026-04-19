const jwt = require('jsonwebtoken');
const { query } = require('../config/db');

// ─── Verify JWT ───────────────────────────────────────────────────────────────
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch fresh user data (catches suspended/deleted accounts)
    const { rows } = await query(
      'SELECT id, name, email, mobile, role, status, member_id FROM users WHERE id = $1',
      [decoded.id]
    );

    if (!rows.length) {
      return res.status(401).json({ success: false, message: 'User no longer exists' });
    }

    const user = rows[0];
    if (user.status === 'suspended') {
      return res.status(403).json({ success: false, message: 'Account suspended. Contact support.' });
    }
    if (user.status === 'inactive') {
      return res.status(403).json({ success: false, message: 'Account inactive.' });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired', code: 'TOKEN_EXPIRED' });
    }
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// ─── Role-based guard ─────────────────────────────────────────────────────────
const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: `Access denied. Required role: ${roles.join(' or ')}`,
    });
  }
  next();
};

// Convenience guards
const adminOnly = requireRole('admin');
const adminOrMod = requireRole('admin', 'moderator');

module.exports = { protect, requireRole, adminOnly, adminOrMod };
