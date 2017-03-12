// const User = require('../models/users');
// const router = require('express').Router();
// const passport = require('passport');
// const AuthService = require('../services/auth');

// router.post(
//   '/',
//   passport.authenticate(
//     'local-signup',
//     {
//       failureRedirect: '/',
//       successRedirect: '/beers/'
//     }
//   )
// );

// // // register new user

// // router.get('/new', (req, res) => {
// //   res.render('/');
// // });

// // user logout

// router.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/');
// });

// // user login

// router.get('/', (req, res) => {
//   res.render('/');
// });

// router.post('/login', passport.authenticate(
//   'local-login',
//   {
//     failureRedirect: '/',
//     successRedirect: '/beers/index'
//   }
// ));


// // user profile

// router.get(
//   '/profile',
//   AuthService.restrict,
//   (req, res) => {
//     User
//       .findByName(req.user.name)
//       .then((user) => {
//   res.render(
//     'beers/index',
//     { user: user }
//   );
//       })
//       .catch(err => console.log('ERROR:', err));
//   }
// );

// module.exports = router;

