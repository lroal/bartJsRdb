var rdb = require('rdb');
var db = rdb('postgres://demoUser:demoPassword@localhost/bartJs');
var reset = require('./reset');

var Customer = rdb.table('customer');
Customer.primaryColumn('id').guid();
Customer.column('name').string();

reset()
    .then(db.transaction)
    .then(getById)
    .then(update)
    .then(getById) //will use cache
    .then(verifyUpdated)
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, console.log);

function getById() {
    return Customer.getById('a0000000-0000-0000-0000-000000000000');
}

function update(customer) {
    customer.name = 'Ringo'; 
}

function verifyUpdated(customer) {
    var format = 'Customer Name: %s'; 
    console.log(format, customer.name);
}

function onOk() {
    console.log('Done');
}