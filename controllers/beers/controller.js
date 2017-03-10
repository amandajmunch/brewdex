const Beers = require('../../models/beers');

const controller = {};

controller.index = (req, res) => {
    Beers
        .findAll()
        .then(data => {
            res.render('beers/index', { beers: data });
        })
        .catch(err => console.log('ERROR:', err));
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

controller.new = (req, res) => {
  res.render('beers/new');
};

controller.update = (req, res) => {
    const id = req.params.id;
    Beers
        .findById(id)
        .then(data => {
            res.render('beers/edit', data);
        })
        .catch(err => console.log(err));
};


// controller.edit = (req, res) => {
//   const id = req.params.id;
//   Pokemon
//     .findById(id)
//     .then((data) => {
//       res.render('pokemon/edit', data);
//     })
//     .catch(err => console.log('ERROR:', err));

// };
// controller.destroy = (req,res) => {
//   const id = req.params.id;
//   Pokemon
//     .destroy(id)
//     .then(data => {
//       res.json(data);
//     })
//     .catch(err => console.log('ERROR:', err));
// };


module.exports = controller;

