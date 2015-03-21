var db = require('./db');
var Customer = require('./db/customer');

db.reset()
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