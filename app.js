const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const session = require('cookie-session');
const cookieParser = require('cookie-parser');
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const stripeUsersRoutes = require('./routes/stripeusers-routes');
const HttpError = require('./models/http-error');
const config = require('./config');
//const initialize = require("./passport-config");

const app = express();

// mongoose
//   .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.34y8vqt.mongodb.net/${process.env.DB_NAME}`)
//   .then(() => {
//     app.listen(5000);
//   })
//   .catch(err => {
//     console.log(err);
//   });

const connectRetry = function() {
  //console.log("Token ", process.env.DB_NAME);
  const mongouri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.34y8vqt.mongodb.net/${process.env.DB_NAME}`;
  //console.log("Token ", mongouri);
  mongoose.connect(mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    poolSize: 500,
  }, (err) => {
    if (err) {
      console.log('Mongoose connection error:', err);
      setTimeout(connectRetry, 3000);
    }
  });
}
connectRetry();


app.use(bodyParser.json());
// Enable sessions using encrypted cookies
app.use(cookieParser(config.secret));
app.use(
  session({
    cookie: {maxAge: 60000},
    secret: config.secret,
    signed: true,
    resave: true,
  })
);


// Initialize Passport and restore any existing authentication state
//initialize(passport);
app.use(passport.initialize());
app.use(passport.session());

// Middleware that exposes the pilot object (if any) to views
app.use((req, res, next) => {
  if (req.user) {
    res.locals.stripeusers = req.user;
  }
  next();
});

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/stripeusers', stripeUsersRoutes);

app.use((req, res, next) => {
  //console.log(req);
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});







// Start the server on the correct port
const server = app.listen(process.env.PORT || '3000', () => {
  console.log('🚀 Monodg udemy finished server started:', 'http://localhost:3000');
});
