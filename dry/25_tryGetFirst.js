var db = require('./db');
var Customer = require('./db/customer');

db.reset() 
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