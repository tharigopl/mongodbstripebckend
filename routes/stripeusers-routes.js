
const express = require('express');
const { check, validationResult } = require('express-validator');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const stripeusersController = require('../controllers/stripeusers-controllers');

const router = express.Router();

const HttpError = require('../models/http-error');
const StripeUser = require('../models/stripeuser');
const createStripeAccount = require('../util/stripeservice');



router.get('/', stripeusersController.getStripeUsers);

// router.post(
//   '/signup',
//   [
//     check('name')
//       .not()
//       .isEmpty(),
//     check('email')
//       .normalizeEmail() // Test@test.com => test@test.com
//       .isEmail(),
//     check('password').isLength({ min: 6 })
//   ],
//   stripeusersController.signup
// );


router.post('/signup', async (req, res, next) => {
    const errors = validationResult(req);
    console.log("Error ^^^^^^^^^^^^^^^ ");
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
      );
    }
    const { name, email, password } = req.body;
    //console.log("Error !!!!!!!!!!!!1 ", req.body, name, email, password);
    let existingUser
    try {
      existingUser = await StripeUser.findOne({ email: email })
    } catch (err) {
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
    }
    
    if (existingUser) {
      const error = new HttpError(
        'User exists already, please login instead.',
        422
      );
      return next(error);
    }
    
    const createdUser = new StripeUser({
      name,
      email,
      password
    });

    try {
      //console.log("created Stripe user ^^^^^^^^^^ ", createdUser);
      //await createdUser.save();
      const stripeAccount = await createStripeAccount(createdUser); 
      //console.log("created Stripe user 1 ##^^^^^^^^^^^^^####", stripeAccount);
      const stripuse = new StripeUser(stripeAccount);
      const response = await stripuse.save();
      console.log("created Stripe user 2 ##^^^^^^^^^^^^####", response);

      // req.logIn(response, err => {
      //   if (err) next(err);
      //   return res.redirect('/stripeusers/signup');
      // });
      res.status(201).json({user: response.toObject({ getters: true })});
    } catch (err) {
      console.log("err ####^^^^^^^^^^^^^^#####", err);
      const error = new HttpError(
        'Signing up failed, please try again.',
        500
      );
      return next(error);
    }  
  }
  );


//router.post('/login', stripeusersController.login);

router.get('/onboarded', async (req, res) => {
    //console.log("/onboarded", req);
    
    try {
      // Retrieve the user's Stripe account and check if they have finished onboarding
      // const account = await stripe.account.retrieve(req.user.stripeAccountId);
      // if (account.details_submitted) {
      //   req.user.onboardingComplete = true;
      //   await req.user.save();

      //   // Redirect to the Rocket Rides dashboard
      //   req.flash('showBanner', 'true');
      //   res.redirect('/pilots/dashboard');
      // } else {
      //   console.log('The onboarding process was not completed.');
      //   res.redirect('/pilots/signup');
      // }
      res.json({message: '@@@@@@@@@@@@@@@@@Logged in##############################@@@@@@@@@@@@!'});
    } catch (err) {
      console.log('Failed to retrieve Stripe account information.');
      console.log(err);
    }
  }
);

router.get('/authorize', stripeusersController.authorize);

router.get('/dashboard', stripeusersController.dashboard);

// Serialize the pilot's sessions for Passport
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    let user = await StripeUser.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Define the login strategy for pilots based on email and password
passport.use('stripeuser-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  let user;
  try {
    user = await StripeUser.findOne({email});
    if (!user) {
      return done(null, false, { message: 'Unknown user' });
    }
  } catch (err) {
    return done(err);
  }
  if (!user.validatePassword(password)) {
    return done(null, false, { message: 'Invalid password' });
  }
  return done(null, user);
}));

/**
 * GET /pilots/login
 *
 * Simple pilot login.
 */
router.post(
  '/login',
  passport.authenticate('stripeusers-login', {
    successRedirect: '/stripeusers/dashboard',
    failureRedirect: '/stripeusers/login',
  })
);

module.exports = router;
