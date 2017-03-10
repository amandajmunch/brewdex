const router = require('express').Router();
const controller = require('./controller');

router.get('/', controller.index);
router.get('/fetchBeer/:beerName', controller.fetchBeer);
router.get('/:id', controller.show);
router.get('/:id/edit', controller.update);

router.post('/beers', controller.create);
router.put('/beers/:id', controller.update);
router.delete('/beers/:id', controller.delete);

module.exports = router;

