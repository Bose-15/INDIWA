const { query } = require('../config/db');
const { getPagination, paginatedResponse } = require('../utils/helpers');

// ─── POST /api/contact ────────────────────────────────────────────────────────
const submitContact = async (req, res, next) => {
  try {
    const { name, email, mobile, subject, message } = req.body;

    await query(
      `INSERT INTO contact_submissions (name, email, mobile, subject, message)
       VALUES ($1,$2,$3,$4,$5)`,
      [
        name.trim(),
        email.toLowerCase().trim(),
        mobile?.trim() || null,
        subject?.trim() || null,
        message.trim(),
      ]
    );

    // TODO: Send acknowledgement email via NodeMailer / SendGrid

    res.status(201).json({
      success: true,
      message: "Thank you for reaching out! We'll get back to you within 2–3 business days.",
    });
  } catch (err) {
    next(err);
  }
};

// ─── GET /api/contact  [admin/moderator only] ─────────────────────────────────
const listSubmissions = async (req, res, next) => {
  try {
    const { page, limit, offset } = getPagination(req.query);
    const { status } = req.query;

    const conditions = [];
    const values     = [];
    let   idx        = 1;

    if (status) {
      conditions.push(`status = $${idx}`);
      values.push(status);
      idx++;
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const [countRes, dataRes] = await Promise.all([
      query(`SELECT COUNT(*) FROM contact_submissions ${where}`, values),
      query(
        `SELECT * FROM contact_submissions ${where}
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

// ─── GET /api/contact/:id  [admin/moderator only] ────────────────────────────
const getSubmissionById = async (req, res, next) => {
  try {
    const { rows } = await query(
      'SELECT * FROM contact_submissions WHERE id = $1',
      [req.params.id]
    );

    if (!rows.length) {
      return res.status(404).json({ success: false, message: 'Submission not found' });
    }

    res.json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
};

// ─── PATCH /api/contact/:id/status  [admin/moderator only] ───────────────────
const updateSubmissionStatus = async (req, res, next) => {
  try {
    const { status, admin_notes } = req.body;
    const validStatuses = ['new', 'in_progress', 'resolved', 'closed'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const updates = [`status = $1`];
    const values  = [status];
    let   idx     = 2;

    if (admin_notes !== undefined) {
      updates.push(`admin_notes = $${idx}`);
      values.push(admin_notes);
      idx++;
    }

    values.push(req.params.id);
    const { rows } = await query(
      `UPDATE contact_submissions SET ${updates.join(', ')} WHERE id = $${idx} RETURNING *`,
      values
    );

    if (!rows.length) {
      return res.status(404).json({ success: false, message: 'Submission not found' });
    }

    res.json({ success: true, message: 'Submission updated', data: rows[0] });
  } catch (err) {
    next(err);
  }
};

// ─── GET /api/contact/stats  [admin/moderator only] ──────────────────────────
const getContactStats = async (req, res, next) => {
  try {
    const { rows } = await query(`
      SELECT
        COUNT(*)                                               AS total,
        COUNT(*) FILTER (WHERE status = 'new')                AS new,
        COUNT(*) FILTER (WHERE status = 'in_progress')        AS in_progress,
        COUNT(*) FILTER (WHERE status = 'resolved')           AS resolved,
        COUNT(*) FILTER (WHERE status = 'closed')             AS closed,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days')  AS last_7_days,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') AS last_30_days
      FROM contact_submissions
    `);

    res.json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  submitContact,
  listSubmissions,
  getSubmissionById,
  updateSubmissionStatus,
  getContactStats,
};
