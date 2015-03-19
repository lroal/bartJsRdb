require('./relations');
var connectionString = require('./mySqlConnectionString');

module.exports = require('rdb')(connectionString);