var connectionString = require('./connectionString');

module.exports = require('rdb')(connectionString);