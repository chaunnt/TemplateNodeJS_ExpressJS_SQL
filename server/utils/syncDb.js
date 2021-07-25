require('dotenv').config();
const DBFunction = require('../database/script');
DBFunction.syncDb();

module.exports = {};
