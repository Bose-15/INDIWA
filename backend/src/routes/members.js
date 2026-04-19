const express = require('express');
const { body, param } = require('express-validator');
const router  = express.Router();

const {
  getMe,
  updateMe,
  listMembers,
  getMemberById,
  updateMemberStatus,
  updateMemberRole,
  getMemberStats,
} = require('../controllers/memberController');
const { protect, adminOnly, adminOrMod } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

// ─── Validation rules ─────────────────────────────────────────────────────────

const updateMeRules = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2–100 characters'),

  body('pincode')
    .optional()
    .trim()
    .matches(/^\d{6}$/).withMessage('Pincode must be 6 digits'),

  body('state').optional().trim().isLength({ max: 100 }),
  body('district').optional().trim().isLength({ max: 100 }),
  body('position').optional().trim().isLength({ max: 100 }),
];

const statusRules = [
  param('id').isInt({ min: 1 }).withMessage('Invalid member ID'),
  body('status')
    .notEmpty().withMessage('Status is required')
    .isIn(['active', 'inactive', 'suspended', 'pending'])
    .withMessage('Invalid status value'),
];

const roleRules = [
  param('id').isInt({ min: 1 }).withMessage('Invalid member ID'),
  body('role')
    .notEmpty().withMessage('Role is required')
    .isIn(['member', 'moderator', 'admin'])
    .withMessage('Invalid role value'),
];

// ─── Self routes (authenticated member) ──────────────────────────────────────
router.get ('/me',     protect,                    getMe);
router.put ('/me',     protect, updateMeRules,     validate, updateMe);

// ─── Admin / moderator routes ─────────────────────────────────────────────────
router.get  ('/stats',      protect, adminOrMod, getMemberStats);
router.get  ('/',           protect, adminOrMod, listMembers);
router.get  ('/:id',        protect, adminOrMod, getMemberById);
router.patch('/:id/status', protect, adminOnly, statusRules, validate, updateMemberStatus);
router.patch('/:id/role',   protect, adminOnly, roleRules,   validate, updateMemberRole);

module.exports = router;
