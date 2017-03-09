const pgp = require('pg-promise')();

const db = pgp(
    process.env.DATABASE_URL
    ||'postgres://amandamunch@localhost:5432/beer_list');


module.exports = db;
