const express = require('express');
const { check } = require('express-validator');

const stripeusersController = require('../controllers/stripeusers-controllers');

const router = express.Router();

router.get('/', stripeusersController.getStripeUsers);

router.post(
  '/signup',
  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail() // Test@test.com => test@test.com
      .isEmail(),
    check('password').isLength({ min: 6 })
  ],
  stripeusersController.signup
);

router.post('/login', stripeusersController.login);

module.exports = router;
