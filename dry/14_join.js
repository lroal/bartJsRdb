var db = require('./db');
var Customer = require('./db/customer');
var Order = require('./db/order');

db.reset()
    .then(db.transaction)
    .then(getOrder)
    .then(printOrder)
    .then(printCustomer)
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, console.log);

function getOrder() {
    return Order.getById('a0000000-a000-0000-0000-000000000000');
}

function printOrder(order) {
    var format = 'Order Id: %s, Order No: %s, Customer Id: %s'; 
    console.log(format, order.id, order.orderNo, order.customerId);
    return order.customer;
}

function printCustomer(customer) {
    var format = 'Customer Id: %s, Name: %s'; 
    console.log(format, customer.id, customer.name);
}

function onOk() {
    console.log('Done');
}