var db = require('./db');
var Customer = require('./db/customer');

db.reset()
    .then(db.transaction)
    .then(getById)
    .then(deleteCustomer)
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, console.log);

function getById() {
    return Customer.getById('87654399-0000-0000-0000-000000000000');
}

function deleteCustomer(customer) {
    customer.cascadeDelete();
}

function onOk() {
    console.log('Done');
}