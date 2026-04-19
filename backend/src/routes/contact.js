const express = require('express');
const { body, param } = require('express-validator');
const router  = express.Router();

const {
  submitContact,
  listSubmissions,
  getSubmissionById,
  updateSubmissionStatus,
  getContactStats,
} = require('../controllers/contactController');
const { protect, adminOrMod } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

// ─── Validation rules ─────────────────────────────────────────────────────────

const submitRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2–100 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Valid email address required')
    .normalizeEmail(),

  body('mobile')
    .optional()
    .trim()
    .matches(/^[6-9]\d{9}$/).withMessage('Valid 10-digit Indian mobile number required'),

  body('subject')
    .optional()
    .trim()
    .isLength({ max: 255 }).withMessage('Subject too long'),

  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Message must be 10–2000 characters'),
];

const statusRules = [
  param('id').isInt({ min: 1 }).withMessage('Invalid submission ID'),
  body('status')
    .notEmpty().withMessage('Status is required')
    .isIn(['new', 'in_progress', 'resolved', 'closed'])
    .withMessage('Invalid status value'),
  body('admin_notes')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Admin notes too long'),
];

// ─── Routes ───────────────────────────────────────────────────────────────────

// Public
router.post('/', submitRules, validate, submitContact);

// Admin / moderator
router.get  ('/stats',      protect, adminOrMod, getContactStats);
router.get  ('/',           protect, adminOrMod, listSubmissions);
router.get  ('/:id',        protect, adminOrMod, getSubmissionById);
router.patch('/:id/status', protect, adminOrMod, statusRules, validate, updateSubmissionStatus);

module.exports = router;
