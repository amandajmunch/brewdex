const router = require('express').Router();
const controller = require('./controller');

// router.get('/', res.render(''));
router.get('/logout', req.logout());
router.get('/signup', res.render('users/signup'));
router.post('/login', passport.authenticate);
router.post('/', passport.authenticate);


module.exports = router;

// router.get(
//   '/beers',
//   AuthService.restrict,


// router.post('/login', passport.authenticate(
//   'local-login',

//   router.get('/logout', (req, res) => {
//   req.logout();


//   router.get('/signup', (req, res) => {
//   res.render('users/signup');


//   router.post(
//   '/',
//   passport.authenticate(
//     'local-signup',
