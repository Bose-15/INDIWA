const { query, withTransaction } = require('../config/db');
const { getPagination, paginatedResponse } = require('../utils/helpers');

// ─── GET /api/events ──────────────────────────────────────────────────────────
const listEvents = async (req, res, next) => {
  try {
    const { page, limit, offset } = getPagination(req.query);
    const { type, status, upcoming } = req.query;

    const conditions = [];
    const values     = [];
    let   idx        = 1;

    // Public: only show published events
    const isAdmin = req.user && (req.user.role === 'admin' || req.user.role === 'moderator');
    if (!isAdmin) {
      conditions.push(`status = 'published'`);
    } else if (status) {
      conditions.push(`status = $${idx}`);
      values.push(status);
      idx++;
    }

    if (type) {
      conditions.push(`type = $${idx}`);
      values.push(type);
      idx++;
    }

    if (upcoming === 'true') {
      conditions.push(`event_date >= NOW()`);
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const [countRes, dataRes] = await Promise.all([
      query(`SELECT COUNT(*) FROM events ${where}`, values),
      query(
        `SELECT * FROM events ${where}
         ORDER BY event_date ASC
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

// ─── GET /api/events/:id ──────────────────────────────────────────────────────
const getEventById = async (req, res, next) => {
  try {
    const { rows } = await query('SELECT * FROM events WHERE id = $1', [req.params.id]);

    if (!rows.length) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    const event = rows[0];
    const isAdmin = req.user && (req.user.role === 'admin' || req.user.role === 'moderator');

    if (event.status !== 'published' && !isAdmin) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.json({ success: true, data: event });
  } catch (err) {
    next(err);
  }
};

// ─── POST /api/events  [admin/moderator only] ─────────────────────────────────
const createEvent = async (req, res, next) => {
  try {
    const {
      title, description, type, event_date, location,
      image_url, registration_url, status,
    } = req.body;

    const { rows } = await query(
      `INSERT INTO events
         (title, description, type, event_date, location, image_url, registration_url, status, created_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING *`,
      [
        title,
        description  || null,
        type         || 'general',
        event_date,
        location     || null,
        image_url    || null,
        registration_url || null,
        status       || 'draft',
        req.user.id,
      ]
    );

    res.status(201).json({ success: true, message: 'Event created', data: rows[0] });
  } catch (err) {
    next(err);
  }
};

// ─── PUT /api/events/:id  [admin/moderator only] ──────────────────────────────
const updateEvent = async (req, res, next) => {
  try {
    const allowed = ['title', 'description', 'type', 'event_date', 'location',
                     'image_url', 'registration_url', 'status'];
    const updates = [];
    const values  = [];
    let   idx     = 1;

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

    values.push(req.params.id);
    const { rows } = await query(
      `UPDATE events SET ${updates.join(', ')} WHERE id = $${idx} RETURNING *`,
      values
    );

    if (!rows.length) return res.status(404).json({ success: false, message: 'Event not found' });

    res.json({ success: true, message: 'Event updated', data: rows[0] });
  } catch (err) {
    next(err);
  }
};

// ─── DELETE /api/events/:id  [admin only] ─────────────────────────────────────
const deleteEvent = async (req, res, next) => {
  try {
    const { rows } = await query(
      'DELETE FROM events WHERE id = $1 RETURNING id, title',
      [req.params.id]
    );

    if (!rows.length) return res.status(404).json({ success: false, message: 'Event not found' });

    res.json({ success: true, message: `Event "${rows[0].title}" deleted` });
  } catch (err) {
    next(err);
  }
};

// ─── PATCH /api/events/:id/publish  [admin/moderator only] ───────────────────
const publishEvent = async (req, res, next) => {
  try {
    const { rows } = await query(
      "UPDATE events SET status = 'published' WHERE id = $1 RETURNING id, title, status",
      [req.params.id]
    );

    if (!rows.length) return res.status(404).json({ success: false, message: 'Event not found' });

    res.json({ success: true, message: 'Event published', data: rows[0] });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  publishEvent,
};
