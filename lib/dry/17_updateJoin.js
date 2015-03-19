var rdb = require('rdb');
var db = rdb('postgres://demoUser:demoPassword@localhost/bartJs');
var reset = require('./reset');

var Customer = rdb.table('customer');
Customer.primaryColumn('id').guid();
Customer.column('name').string();

var Order = rdb.table('_order');
Order.primaryColumn('id').guid();
Order.column('orderNo').string();
Order.column('customerId').guid();
Order.join(Customer).by('customerId').as('customer');

reset()
    .then(db.transaction)
    .then(getById)
    .then(update)
    .then(printCustomer)
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, console.log);

function getById() {
    return Order.getById('b0000000-b000-0000-0000-000000000000');
}

function update(order) {
    var yokoId = '12345678-0000-0000-0000-000000000000';
    order.customerId = yokoId;
    return order.customer; 
}

function printCustomer(customer) {
    var format = 'Customer Name: %s';
    console.log(format, customer.name);
}

function onOk() {
    console.log('Done');
}