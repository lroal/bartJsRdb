var db = require('./db');
var Customer = require('./db/customer');

db.reset()
    .then(db.transaction)
    .then(getById)
    .then(update)
    .then(getById) //will use cache
    .then(printCustomer)
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, console.log);

function getById() {
    return Customer.getById('a0000000-0000-0000-0000-000000000000');
}

function update(customer) {
    customer.name = 'Ringo'; 
}

function printCustomer(customer) {
    var format = 'Customer Name: %s'; 
    console.log(format, customer.name);
}

function onOk() {
    console.log('Done');
}