var poolOptions = {size: 20};
var connectionString = require('./db/connectionString');
var db = require('rdb')(connectionString, poolOptions);
