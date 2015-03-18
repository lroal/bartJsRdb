var rdb = require('rdb');
var db = rdb('postgres://demoUser:demoPassword@localhost/bartJs');
var reset = require('./reset');

var Customer = rdb.table('customer');
Customer.primaryColumn('id').guid();
Customer.column('name').string();

reset() 
    .then(db.transaction)
    .then(tryGetFirst)
    .then(printCustomer)
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, console.log);

function tryGetFirst() {
    var filter = Customer.name.equal('John');
    return Customer.tryGetFirst(filter);
}

function printCustomer(customer) {
    if (customer) 
        console.log('Customer Id: %s, name: %s', customer.id, customer.name);
    else
        console.log('customer not found');
}

function onOk() {
    console.log('Done');
}