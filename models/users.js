const db = require('../db');
const bcrypt = require('bcrypt');

const User = {};

// creates a new user
User.create = (user) => {
  const password = bcrypt.hashSync(user.password, 10);

  return db.oneOrNone(`
    INSERT INTO users
    (name, password)
    VALUES
    ($1, $2)
    RETURNING *;`,
    [ user.name, password ]
  );
};

// finds a user by their name
User.findByName = (name) => {
  return db.oneOrNone(`
    SELECT *
    FROM users
    WHERE name = $1;`,
    [name]
  );
};

module.exports = User;
