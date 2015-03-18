var rdb = require('rdb');
var db = rdb('postgres://demoUser:demoPassword@localhost/bartJs');
var reset = require('./reset');

var Customer = rdb.table('customer');
Customer.primaryColumn('id').guid();

reset()
    .then(db.transaction)
    .then(deleteCustomer)
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, console.log);

function deleteCustomer() {    
    var filter = Customer.id.eq('87654321-0000-0000-0000-000000000000');
    return Customer.delete(filter);
}

function onOk() {
    console.log('Done');
}