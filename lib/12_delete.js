var rdb = require('rdb');
var db = rdb('postgres://demoUser:demoPassword@localhost/bartJs');
var reset = require('./reset');

var Customer = rdb.table('customer');
Customer.primaryColumn('id').guid();
Customer.column('name').string();

var id = '87654321-0000-0000-0000-000000000000';

reset()
    .then(db.transaction)
    .then(getById)
    .then(deleteCustomer)
    .then(tryGetById)
    .then(verifyDeleted)
    .then(rdb.commit)
    .then(null, rdb.rollback)
    .then(onOk, console.log);

function getById() {    
    return Customer.getById(id);
}

function deleteCustomer(customer) {
    customer.delete();
}

function tryGetById() {
    // return Customer.tryGetById(id);
}

function verifyDeleted(customer) {
    if (!customer) 
        console.log('Customer was deleted');
}

function onOk() {
    console.log('Done');
}