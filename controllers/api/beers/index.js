const router = require('express').Router();
const controller = require('./controller');

router.get('/', controller.index);
router.get('/fetchBeer/:beerName', controller.fetchBeer);

router.get('/:id', controller.show);

// your work here
router.post('/beers', controller.create);
router.put('/beers/:id', controller.update);
router.get('/beers/:id/edit', controller.update);
router.delete('/beers/:id', controller.destroy);

module.exports = router;

