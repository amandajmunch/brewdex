const router = require('express').Router();

router.use('/beers', require('./controllers/beers'));
router.use('/api', require('./controllers/api'));
router.get('/', (req, res) => res.render('index'));

module.exports = router;
