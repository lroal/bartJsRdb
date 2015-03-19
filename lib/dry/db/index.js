require('./relations');
var db = require('./pg');
db.reset = require('../../reset');
db.mySql = require('./mySql');

module.exports = db;