var rdb = require('rdb');
var db = rdb('postgres://demoUser:demoPassword@localhost/bartJs');
var reset = require('./reset');

var Customer = rdb.table('customer');
Customer.primaryColumn('id').guid();
Customer.column('name').string();
Customer.column('balance').string();
Customer.column('isActive').boolean();

reset()
    .then(db.transaction)
    .then(getCustomers)
    .then(printCustomers)
    .then(rdb.commit)
    .then(null, rdb.rollback)
    .then(onOk, console.log);

function getCustomers() {
    var isActive = Customer.isActive.equal(true);
    var highBalance = Customer.balance.greaterThan(8000);
    var filter = rdb.filter.and(isActive).and(highBalance);
    //alternatively rdb.filter.or(isActive).and(highBalance);
    return Customer.getMany(filter);
}

function printCustomers(customers) {
    return customers.toDto().then(console.log);
}

function onOk() {
    console.log('Done');
}