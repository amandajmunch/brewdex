const Beers = require('../../../models/beers');
const controller = {};



controller.index = (req, res) => {
    Beers
        .findAll()
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
}



controller.create = (req, res) => {
    const name = req.body.name,
        abv = req.body.abv,
        ibu = req.body.ibu,
        labels_medium = req.body.labels_medium,
        style_name = req.body.style_name,
        breweries_name = req.body.breweries_name,
        beer_id = req.body.beer_id;
    Beers
        .create(name, abv, ibu, labels_medium, style_name, breweries_name, beer_id)
        .then(data => res.json(data))
        .catch(err => console.log('ERROR:', err));
};

controller.update = (req, res) => {
    const id = req.params.id,
         abv = req.body.abv,
        ibu = req.body.ibu,
        labels_medium = req.body.labels_medium,
        style_name = req.body.style_name,
        breweries_name = req.body.breweries_name,
        beer_id = req.body.beer_id;

    Beers
        .update(name, abv, ibu, labels_medium, style_name, breweries_name, beer_id)
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

// controller.new = (req, res) => {
//     Beers
//         .create()
//         .then(data => {
//             res.render('beers/new', { beers: data });
//         })
//         .catch(err => console.log('ERROR:', err));
// };

controller.destroy = (req,res) => {
  const id = req.params.id;
  Pokemon
    .destroy(id)
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log('ERROR:', err));
};



module.exports = controller;


