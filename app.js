const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const normalize = require('normalize');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const PORT = process.env.PORT || 8080;

// normal setup for express & mustache (if we want to go there)
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


// body-parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Important: mount express middleware BEFORE passport middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));


app.use(passport.initialize());

app.use(passport.session());

// app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(flash());



// We're going to need the User model
const User = require('./models/users');
// And we're going to need the Local Strategy for this kind of registration
const LocalStrategy = require('passport-local').Strategy;
// We'll also need bcrypt to authenticate uses without storing their
// passoword _anywhere_...
const bcrypt = require('bcrypt');

// Given user information called "user", what do we want to serialize
// to the session?
passport.serializeUser((user, done) => {
  console.log(user);

  done(null, user);
});

// Given an object representing our user (obtained from the session),
// how shall we define any other user information we'll need in our
// routes, conveniently accessible as req.user in routes?
passport.deserializeUser((userObj, done) => {
  console.log(userObj);

  User
    .findByName(userObj.name)
    .then((user) => done(null, user))
    .catch((err) => {
      console.log('ERROR:', err);
      return done(null, false);
    });
});

// see router.post('/', ...) in controllers/users
passport.use(
  'local-signup',
  new LocalStrategy(
    {
      // these are the names of the fields for email and password in
      // the login form we'll be serving (see the view)
      usernameField: 'user[name]',
      passwordField: 'user[password]',
      passReqToCallback: true
    },
    (req, name, password, done) => {
      User
  .create(req.body.user)
  .then((user) => {
    return done(null, user);
  })
  .catch((err) => {
    console.log('ERROR:', err);
    return done(null, false);
  });
    })
);

passport.use(
  'local-login',
  new LocalStrategy(
    {
      usernameField: 'user[name]',
      passwordField: 'user[password]',
      passReqToCallback: true
    },
    (req, name, password, done) => {
      User
        .findByName(name)
        .then((user) => {
          if (user) {
      // here we use bcrypt to figure out whether the user is logged in or not
            const isAuthed = bcrypt.compareSync(password, user.password);

            if (isAuthed) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          } else {
            return done(null, false);
          }
        });
    })
);

// connect router
app.use(require('./router'));

app.listen(PORT, () => console.log('Server is listening on port', PORT));
