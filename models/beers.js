const db = require('../db');
const fetch = require('node-fetch');

const Beers = {};

Beers.fetch = (beerName) => {
    // console.log('beernadfasdfasf', beerName)
    return fetch(`https://api.brewerydb.com/v2/beers/?name=${beerName}&withBreweries=Y&key=8b1966c87465e2982e982b5560177694`);
};

Beers.findAll = () => {
  return db.manyOrNone('SELECT * FROM beers');
};

Beers.findById = (id) => {
  return db.one(
    'SELECT * FROM beers WHERE id=$1',
    [id]
  );
};

Beers.create = (name,abv,labels_medium,style_name,breweries_name) => {
  return db.one(
    'INSERT INTO beers(name,abv,labels_medium,style_name,breweries_name) VALUES ($1, $2, $3, $4, $5) returning id',
    [name,abv,labels_medium,style_name,breweries_name]
  );
};

Beers.update = (id, name,abv, labels_medium,style_name,breweries_name) => {
  return db.one(
    'UPDATE pokemon SET name = $1, abv = $2, labels_medium = $3, style_name = $4, breweries_name = $5 WHERE id = $6 returning id',
    [name,abv,labels_medium,style_name,breweries_name,id]
  );
};


Beers.delete = (id) => {
  return db.none(
    'DELETE FROM beers WHERE id = $1',
    [id]
  );
};

module.exports = Beers;
