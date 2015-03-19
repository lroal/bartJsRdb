var db = require('./db');
var Customer = require('./db/customer');

db.reset()
    .then(db.transaction)
    .then(insert)
    .then(getById)
    .then(printCustomer)
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, console.log);

function insert() {
    var customer = Customer.insert('abcdef00-0000-0000-0000-000000000000')
    customer.name = 'Paul';
}

function getById() {
    return Customer.getById('abcdef00-0000-0000-0000-000000000000'); //will use cache
}

function printCustomer(customer) {
    var format = 'Customer Id: %s, Customer Name: %s'; 
    console.log(format, customer.id, customer.name);
}

function onOk() {
    console.log('Done');
}