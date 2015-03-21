var db = require('./db');
var Customer = require('./db/customer');

var id = '87654321-0000-0000-0000-000000000000';

db.reset()
    .then(db.transaction)
    .then(getById)
    .then(deleteCustomer)
    .then(tryGetById)
    .then(verifyDeleted)
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, console.log);

function getById() {    
    return Customer.getById(id);
}

function deleteCustomer(customer) {
    customer.delete();
}

function tryGetById() {
    return Customer.tryGetById(id);
}

function verifyDeleted(customer) {
    if (!customer) 
        console.log('Customer was deleted');
}

function onOk() {
    console.log('Done');
}