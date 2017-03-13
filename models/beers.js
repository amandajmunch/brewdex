const db = require('../db');
const fetch = require('node-fetch');

const Beers = {};

// fetching beer name from the BreweryDB API
Beers.fetch = (beerName) => {
    // console.log('beernadfasdfasf', beerName)
    return fetch(`https://api.brewerydb.com/v2/beers/?name=${beerName}&withBreweries=Y&key=8b1966c87465e2982e982b5560177694`);
};

// rendering all the beers from one user's list
Beers.findAll = (user_id) => {
  // user_id = req.user.id;
  return db.any('SELECT * FROM beers WHERE user_id = $1',
    [user_id]
    );
};

// rendering 1 individual beer
Beers.findById = (id) => {
  return db.one(
    'SELECT * FROM beers WHERE id=$1',
    [id]
  );
};

// creating a new beer
Beers.create = (name,abv,labels_medium,style_name,breweries_name, user_id) => {
  return db.one(
    'INSERT INTO beers(name,abv,labels_medium,style_name,breweries_name,user_id) VALUES ($1, $2, $3, $4, $5, $6) returning id',
    [name,abv,labels_medium,style_name,breweries_name, user_id]
  );
};

// updating a beer
Beers.update = (id, name,abv, labels_medium,style_name,breweries_name) => {
  return db.one(
    'UPDATE beers SET name = $1, abv = $2, labels_medium = $3, style_name = $4, breweries_name = $5 WHERE id = $6 returning id',
    [name,abv,labels_medium,style_name,breweries_name, id]
  );
};

// deleting a beer
Beers.delete = (id) => {
  return db.none(
    'DELETE FROM beers WHERE id = $1',
    [id]
  );
};

module.exports = Beers;
