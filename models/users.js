const db = require('../db');

const Users = {};

Schools.findById = (id) => {
    return db.one('SELECT * FROM users WHERE id = $1', [id]);
};

module.exports = Users;
