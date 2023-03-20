const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
//const stripeuser = require('../models/stripeuser');
const StripeUser = require('../models/stripeuser');
const createStripeAccount = require('../util/stripeservice');

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

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  console.log("Error !!!!!!!!!!!! ", errors);
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
    console.log("created Stripe user ", createdUser);
    await createStripeAccount(createdUser); 
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({user: createdUser.toObject({ getters: true })});
};

const login = async (req, res, next) => {
  const { semail, spassword } = req.body;

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

exports.getStripeUsers = getStripeUsers;
exports.signup = signup;
exports.login = login;
