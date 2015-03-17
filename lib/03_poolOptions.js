var poolOptions = {size: 20};
var db = require('rdb')('postgres://demoUser:demoPassword@localhost/bartJs', poolOptions);