const express = require('express');
const { body } = require('express-validator');
const router  = express.Router();

const {
  register,
  login,
  refresh,
  logout,
  me,
  forgotPassword,
  resetPassword,
  changePassword,
} = require('../controllers/authController');
const { protect }  = require('../middleware/auth');
const { validate } = require('../middleware/validate');

// ─── Validation rule sets ─────────────────────────────────────────────────────

const registerRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2–100 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Valid email is required')
    .normalizeEmail(),

  body('mobile')
    .trim()
    .notEmpty().withMessage('Mobile is required')
    .matches(/^[6-9]\d{9}$/).withMessage('Valid 10-digit Indian mobile number required'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
    .matches(/\d/).withMessage('Password must contain a number'),

  body('referral_code')
    .optional()
    .trim()
    .isLength({ min: 8, max: 8 }).withMessage('Referral code must be 8 characters'),

  body('pincode')
    .optional()
    .trim()
    .matches(/^\d{6}$/).withMessage('Pincode must be 6 digits'),

  body('state').optional().trim().isLength({ max: 100 }),
  body('district').optional().trim().isLength({ max: 100 }),
  body('position').optional().trim().isLength({ max: 100 }),
];

const loginRules = [
  body('mobile')
    .trim()
    .notEmpty().withMessage('Mobile is required')
    .matches(/^[6-9]\d{9}$/).withMessage('Valid 10-digit Indian mobile number required'),

  body('password')
    .notEmpty().withMessage('Password is required'),
];

const forgotPasswordRules = [
  body('mobile')
    .trim()
    .notEmpty().withMessage('Mobile is required')
    .matches(/^[6-9]\d{9}$/).withMessage('Valid 10-digit Indian mobile number required'),
];

const resetPasswordRules = [
  body('mobile')
    .trim()
    .notEmpty().withMessage('Mobile is required')
    .matches(/^[6-9]\d{9}$/).withMessage('Valid 10-digit Indian mobile number required'),

  body('otp')
    .trim()
    .notEmpty().withMessage('OTP is required')
    .isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits')
    .isNumeric().withMessage('OTP must be numeric'),

  body('newPassword')
    .notEmpty().withMessage('New password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
    .matches(/\d/).withMessage('Password must contain a number'),
];

const changePasswordRules = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),

  body('newPassword')
    .notEmpty().withMessage('New password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
    .matches(/\d/).withMessage('Password must contain a number'),
];

// ─── Routes ───────────────────────────────────────────────────────────────────

router.post('/register',         registerRules,        validate, register);
router.post('/login',            loginRules,           validate, login);
router.post('/refresh',          refresh);
router.post('/logout',           logout);
router.get ('/me',               protect,              me);
router.post('/forgot-password',  forgotPasswordRules,  validate, forgotPassword);
router.post('/reset-password',   resetPasswordRules,   validate, resetPassword);
router.put ('/change-password',  protect, changePasswordRules, validate, changePassword);

module.exports = router;
