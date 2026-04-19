const express = require('express');
const { body, param } = require('express-validator');
const router  = express.Router();

const {
  listEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  publishEvent,
} = require('../controllers/eventController');
const { protect, adminOnly, adminOrMod } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

// ─── Optional auth middleware ─────────────────────────────────────────────────
// Allows public access but enriches req.user if token is present
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return next();
  // Reuse protect but catch errors silently
  const jwt = require('jsonwebtoken');
  try {
    const token   = authHeader.split(' ')[1];
    req.user      = jwt.verify(token, process.env.JWT_SECRET);
  } catch (_) { /* token invalid — continue as guest */ }
  next();
};

// ─── Validation rules ─────────────────────────────────────────────────────────

const createEventRules = [
  body('title')
    .trim()
    .notEmpty().withMessage('Event title is required')
    .isLength({ max: 255 }).withMessage('Title too long'),

  body('event_date')
    .notEmpty().withMessage('Event date is required')
    .isISO8601().withMessage('event_date must be a valid ISO 8601 date'),

  body('type')
    .optional()
    .isIn(['general', 'workshop', 'seminar', 'rally', 'meeting', 'other'])
    .withMessage('Invalid event type'),

  body('status')
    .optional()
    .isIn(['draft', 'published', 'cancelled'])
    .withMessage('Invalid status'),

  body('registration_url')
    .optional()
    .isURL().withMessage('registration_url must be a valid URL'),

  body('image_url')
    .optional()
    .isURL().withMessage('image_url must be a valid URL'),
];

const updateEventRules = [
  param('id').isInt({ min: 1 }).withMessage('Invalid event ID'),
  ...createEventRules.map(r => r.optional ? r : r), // all fields optional for update
];

// ─── Routes ───────────────────────────────────────────────────────────────────

// Public (optionally authenticated for admin to see drafts)
router.get('/',    optionalAuth, listEvents);
router.get('/:id', optionalAuth, getEventById);

// Protected — admin/moderator
router.post  ('/',           protect, adminOrMod, createEventRules, validate, createEvent);
router.put   ('/:id',        protect, adminOrMod, updateEventRules, validate, updateEvent);
router.patch ('/:id/publish',protect, adminOrMod, publishEvent);
router.delete('/:id',        protect, adminOnly,  deleteEvent);

module.exports = router;
