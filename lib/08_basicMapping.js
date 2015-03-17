var rdb = require('rdb');
var db = rdb('postgres://demoUser:demoPassword@localhost/bartJs');
var reset = require('./reset');

var Customer = rdb.table('customer');

Customer.primaryColumn('id').guid();
Customer.column('name').string();
Customer.column('balance').numeric();
Customer.column('registeredDate').date();
Customer.column('isActive').boolean();
Customer.column('picture').binary();

reset()
    .then(db.transaction)
    .then(getById)
    .then(printCustomer)
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, console.log);

function getById() {
    return Customer.getById('a0000000-0000-0000-0000-000000000000');
}

function printCustomer(customer) {
    var format = 'Id: %s, name: %s, Balance: %s, Registered Date: %s, Is Active: %s, Picture: %s'; 
    var args = [format, customer.id, customer.name, customer.balance, customer.registeredDate, customer.isActive, customer.picture];
    console.log.apply(null,args);
}

function onOk() {
    console.log('Done');
}