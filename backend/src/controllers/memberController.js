const { query } = require('../config/db');
const { sanitizeUser, getPagination, paginatedResponse } = require('../utils/helpers');

// ─── GET /api/members/me (alias, same as auth/me) ────────────────────────────
const getMe = async (req, res, next) => {
  try {
    const { rows } = await query('SELECT * FROM users WHERE id = $1', [req.user.id]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: sanitizeUser(rows[0]) });
  } catch (err) {
    next(err);
  }
};

// ─── PUT /api/members/me ──────────────────────────────────────────────────────
const updateMe = async (req, res, next) => {
  try {
    const allowed  = ['name', 'pincode', 'state', 'district', 'position'];
    const updates  = [];
    const values   = [];
    let   idx      = 1;

    for (const field of allowed) {
      if (req.body[field] !== undefined) {
        updates.push(`${field} = $${idx}`);
        values.push(req.body[field]);
        idx++;
      }
    }

    if (!updates.length) {
      return res.status(400).json({ success: false, message: 'No valid fields to update' });
    }

    values.push(req.user.id);
    const { rows } = await query(
      `UPDATE users SET ${updates.join(', ')} WHERE id = $${idx} RETURNING *`,
      values
    );

    res.json({ success: true, message: 'Profile updated', data: sanitizeUser(rows[0]) });
  } catch (err) {
    next(err);
  }
};

// ─── GET /api/members  [admin/moderator only] ─────────────────────────────────
const listMembers = async (req, res, next) => {
  try {
    const { page, limit, offset } = getPagination(req.query);
    const { status, role, search } = req.query;

    const conditions = [];
    const values     = [];
    let   idx        = 1;

    if (status) {
      conditions.push(`status = $${idx}`);
      values.push(status);
      idx++;
    }
    if (role) {
      conditions.push(`role = $${idx}`);
      values.push(role);
      idx++;
    }
    if (search) {
      conditions.push(`(name ILIKE $${idx} OR email ILIKE $${idx} OR mobile ILIKE $${idx} OR member_id ILIKE $${idx})`);
      values.push(`%${search}%`);
      idx++;
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const [countRes, dataRes] = await Promise.all([
      query(`SELECT COUNT(*) FROM users ${where}`, values),
      query(
        `SELECT id, member_id, name, email, mobile, role, status, referral_code,
                pincode, state, district, position, created_at
         FROM users ${where}
         ORDER BY created_at DESC
         LIMIT $${idx} OFFSET $${idx + 1}`,
        [...values, limit, offset]
      ),
    ]);

    res.json({
      success: true,
      ...paginatedResponse(dataRes.rows, parseInt(countRes.rows[0].count, 10), page, limit),
    });
  } catch (err) {
    next(err);
  }
};

// ─── GET /api/members/:id  [admin/moderator only] ─────────────────────────────
const getMemberById = async (req, res, next) => {
  try {
    const { rows } = await query('SELECT * FROM users WHERE id = $1', [req.params.id]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Member not found' });
    res.json({ success: true, data: sanitizeUser(rows[0]) });
  } catch (err) {
    next(err);
  }
};

// ─── PATCH /api/members/:id/status  [admin only] ─────────────────────────────
const updateMemberStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['active', 'inactive', 'suspended', 'pending'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: `Status must be one of: ${validStatuses.join(', ')}` });
    }

    // Prevent admin from suspending themselves
    if (parseInt(req.params.id, 10) === req.user.id) {
      return res.status(400).json({ success: false, message: 'Cannot change your own account status' });
    }

    const { rows } = await query(
      'UPDATE users SET status = $1 WHERE id = $2 RETURNING id, member_id, name, email, status',
      [status, req.params.id]
    );

    if (!rows.length) return res.status(404).json({ success: false, message: 'Member not found' });

    res.json({ success: true, message: `Member status updated to ${status}`, data: rows[0] });
  } catch (err) {
    next(err);
  }
};

// ─── PATCH /api/members/:id/role  [admin only] ───────────────────────────────
const updateMemberRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    const validRoles = ['member', 'moderator', 'admin'];

    if (!validRoles.includes(role)) {
      return res.status(400).json({ success: false, message: `Role must be one of: ${validRoles.join(', ')}` });
    }

    if (parseInt(req.params.id, 10) === req.user.id) {
      return res.status(400).json({ success: false, message: 'Cannot change your own role' });
    }

    const { rows } = await query(
      'UPDATE users SET role = $1 WHERE id = $2 RETURNING id, member_id, name, email, role',
      [role, req.params.id]
    );

    if (!rows.length) return res.status(404).json({ success: false, message: 'Member not found' });

    res.json({ success: true, message: `Member role updated to ${role}`, data: rows[0] });
  } catch (err) {
    next(err);
  }
};

// ─── GET /api/members/stats  [admin/moderator only] ──────────────────────────
const getMemberStats = async (req, res, next) => {
  try {
    const { rows } = await query(`
      SELECT
        COUNT(*)                                          AS total,
        COUNT(*) FILTER (WHERE status = 'active')        AS active,
        COUNT(*) FILTER (WHERE status = 'inactive')      AS inactive,
        COUNT(*) FILTER (WHERE status = 'suspended')     AS suspended,
        COUNT(*) FILTER (WHERE status = 'pending')       AS pending,
        COUNT(*) FILTER (WHERE role   = 'admin')         AS admins,
        COUNT(*) FILTER (WHERE role   = 'moderator')     AS moderators,
        COUNT(*) FILTER (WHERE role   = 'member')        AS members,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') AS new_last_30_days
      FROM users
    `);

    res.json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMe,
  updateMe,
  listMembers,
  getMemberById,
  updateMemberStatus,
  updateMemberRole,
  getMemberStats,
};
