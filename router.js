const router = require('express').Router();
const AuthService = require('./services/authenticate');
const passport = require('passport');

router.use('/beers', AuthService.restrict, require('./controllers/beers'));
router.use('/users', require('./controllers/users'));
router.use('/api', require('./controllers/api'));
router.get('/', (req, res) => res.render('index'));

module.exports = router;
