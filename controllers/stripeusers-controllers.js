const { validationResult } = require('express-validator');
const { stripe } = require('../config');

const HttpError = require('../models/http-error');
//const stripeuser = require('../models/stripeuser');
const StripeUser = require('../models/stripeuser');
const createStripeAccount = require('../util/stripeservice');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const getStripeUsers = async (req, res, next) => {
  let stripeusers;
  try {
    stripeusers = await StripeUser.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching stripeusers failed, please try again later.',
      500
    );
    return next(error);
  }
  console.log("Stripe Users ", stripeusers);
  res.json({stripeusers: stripeusers.map(stripeuser => stripeuser.toObject({ getters: true }))});
};

const authorize = async (req, res, next) => {
  console.log("/authorize", req);
  let stripeusers;
  try {
    stripeusers = await StripeUser.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching stripeusers failed, please try again later.',
      500
    );
    return next(error);
  }
  console.log("Stripe Users ", stripeusers);
  res.json({stripeusers: stripeusers.map(stripeuser => stripeuser.toObject({ getters: true }))});
};

const dashboard = async (req, res, next) => {
  //console.log("/dashboard", req);
  // const errors = validationResult(req);
  // console.log("Error !!!!!!!!!!!! ", errors);
  // if (!errors.isEmpty()) {
  //   return next(
  //     new HttpError('Invalid inputs passed, please check your data. Dashboard', 422)
  //   );
  // }
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
    res.json({message: 'Logged in!'});
  } catch (err) {
    console.log('Failed to retrieve Stripe account information.');
    console.log(err);
    next(err);
  }
};

// const onboarded = async (req, res, next) => {

//   console.log("/onboarded ######################## ", req.user);
//   const errors = validationResult(req);
//   try {
//     // Retrieve the user's Stripe account and check if they have finished onboarding
//     //const account = await stripe.account.retrieve(req.user.stripeAccountId);
//     // if (account.details_submitted) {
//     //   req.user.onboardingComplete = true;
//     //   await req.user.save();

//     //   // Redirect to the Rocket Rides dashboard
//     //   //req.flash('showBanner', 'true');
//     //   res.redirect('/api/stripeusers/dashboard');
//     // } else {
//     //   console.log('The onboarding process was not completed.');
//     //   res.redirect('/api/stripeusers/signup');
//     // }
//   } catch (err) {
//     console.log('Failed to retrieve Stripe account information.');
//     //console.log(err);
//     next(err);
//   }
// };

// const signup = async (req, res, next) => {
//   const errors = validationResult(req);
//   console.log("Error !!!!!!!!!!!! ");
//   if (!errors.isEmpty()) {
//     return next(
//       new HttpError('Invalid inputs passed, please check your data.', 422)
//     );
//   }
//   const { name, email, password } = req.body;
//   //console.log("Error !!!!!!!!!!!!1 ", req.body, name, email, password);
//   let existingUser
//   try {
//     existingUser = await StripeUser.findOne({ email: email })
//   } catch (err) {
//     const error = new HttpError(
//       'Signing up failed, please try again later.',
//       500
//     );
//     return next(error);
//   }
  
//   if (existingUser) {
//     const error = new HttpError(
//       'User exists already, please login instead.',
//       422
//     );
//     return next(error);
//   }
  
//   const createdUser = new StripeUser({
//     name,
//     email,
//     password
//   });

//   try {
//     console.log("created Stripe user ", createdUser);
//     //await createdUser.save();
//     const stripeAccount = await createStripeAccount(createdUser); 
//     console.log("created Stripe user 1 ######", stripeAccount);
//     const stripuse = new StripeUser(stripeAccount);
//     const response = await stripuse.save();
//     console.log("created Stripe user 2 ######", response);

//     req.logIn(response, err => {
//       if (err) next(err);
//       return res.redirect('/stripeusers/signup');
//     });
//     res.status(201).json({user: response.toObject({ getters: true })});
//   } catch (err) {
//     console.log("err #########", err);
//     const error = new HttpError(
//       'Signing up failed, please try again.',
//       500
//     );
//     return next(error);
//   }

  
// };

const login = async (req, res, next) => {
  const {semail, spassword } = req.body;

  let existingStripeUser;

  try {
    existingStripeUser = await StripeUser.findOne({ semail: semail })
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingStripeUser || existingStripeUser.spassword !== spassword) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401
    );
    return next(error);
  }

  res.json({message: 'Logged in!'});
};

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


exports.getStripeUsers = getStripeUsers;
exports.authorize = authorize;
//exports.signup = signup;
exports.login = login;
exports.dashboard = dashboard;
//exports.onboarded = onboarded;