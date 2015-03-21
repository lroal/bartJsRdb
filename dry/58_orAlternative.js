var rdb = require('rdb');
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
    var john = Customer.name.equal('John');
    var yoko = Customer.name.equal('Yoko');
    var filter = rdb.filter.or(john).or(yoko);
    //alternatively rdb.filter.and(john).or(yoko);
    return Customer.getMany(filter);
}

function printCustomers(customers) {
    return customers.toDto().then(console.log);
}

function onOk() {
    console.log('Done');
}
