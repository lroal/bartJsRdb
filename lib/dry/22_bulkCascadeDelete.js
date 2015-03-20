var db = require('./db');
var Customer = require('./db/customer');

db.reset()
    .then(db.transaction)
    .then(deleteCustomer)
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, onFailed);

function deleteCustomer() {
    var filter =  Customer.id.eq('87654399-0000-0000-0000-000000000000');
    Customer.cascadeDelete(filter);
}

function onOk() {
    console.log('Done');
}

function onFailed(err) {
    console.log('Rollback');
    console.log(err.stack);
}