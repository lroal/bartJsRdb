var rdb = require('rdb');
var db = require('./db');

var Customer = rdb.table('customer');
Customer.primaryColumn('id').guid().as('customerId');
Customer.column('name').string().as('customerName');
Customer.column('balance').numeric().as('customerBalance');
Customer.column('registeredDate').date().as('createdDate');
Customer.column('isActive').boolean().as('active');
Customer.column('picture').binary().as('photo');

db.reset()
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
    var format = 'Customer Id: %s, Customer Name: %s, Balance: %s, Created Date: %s, Active: %s, Photo: %s'; 
    var args = [format, customer.customerId, customer.customerName, customer.customerBalance, customer.createdDate, customer.active, customer.photo];
    console.log.apply(null,args);
}

function onOk() {
    console.log('Done');
}