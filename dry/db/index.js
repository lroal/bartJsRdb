require('./relations');
var db = require('./pg');
db.reset = require('./reset');
db.mySql = require('./mySql');
db.mySql.reset = require('./resetMySql');

module.exports = db;