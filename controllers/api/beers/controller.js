const Beers = require('../../../models/beers');
const controller = {};

controller.index = (req, res) => {
    user_id = req.user.id;
    // console.log(user_id);
    Beers
        .findAll(user_id)
        .then(data => {
            res.render('beers/index', { beers: data });
        })
        .catch(err => console.log('ERROR:', err));
};


controller.fetchBeer = (req, res) => {
    const beerName = req.params.beerName;
    Beers
        .fetch(beerName)
        .then(r => r.json())
        .then(beers => {
          console.log('the data from backend fetch to API --> ', beers.data);
          return beers.data;
        })
        .then(data => {
          console.log(data)
          res.json(data)
          })
        .catch(err => { console.log(err) })
};



controller.create = (req, res) => {
    const name = req.body.name,
        abv = req.body.abv,
        labels_medium = req.body.labels_medium,
        style_name = req.body.style_name,
        breweries_name = req.body.breweries_name,
        user_id = req.user.id;
    Beers
        .create(name, abv, labels_medium, style_name, breweries_name, user_id)
        .then(data => res.json(data))
        .catch(err => console.log('ERROR:', err));
};


controller.update = (req, res) => {
    const id = req.params.id,
          name = req.body.name,
         abv = req.body.abv,
        labels_medium = req.body.labels_medium,
        style_name = req.body.style_name,
        breweries_name = req.body.breweries_name;
      console.log(req.body);
    Beers
        .update(id, name, abv, labels_medium, style_name, breweries_name)
        .then(data => res.json(data))
        .catch(err => console.log('ERROR', err));

};


controller.show = (req, res) => {
    const id = req.params.id;
    Beers
        .findById(id)
        .then((data) => {
            res.render('beers/show', data);
        })
        .catch(err => console.log('ERROR:', err));
};

controller.delete = (req,res) => {
  const id = req.params.id;
  Beers
    .delete(id)
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log('ERROR:', err));
};



module.exports = controller;


