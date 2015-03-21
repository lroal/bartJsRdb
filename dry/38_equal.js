var db = require('./db');
var Customer = require('./db/customer');

db.reset()
    .then(db.transaction)
    .then(getCustomers)
    .then(printCustomers)
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, console.log);

function getCustomers() {
    var filter = Customer.name.equal('John');
    //alias: Customer.name.eq('John');   
    return Customer.getMany(filter);
}

function printCustomers(customers) {
    return customers.toDto().then(console.log);
}

function onOk() {
    console.log('Done');
}