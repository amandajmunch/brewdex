const router = require('express').Router();

router.use('/beers', require('./beers'));
router.use('/users', require('../users'));

module.exports = router;
