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
    .then(getOrderWithCustomer)
    .then(printOrder)
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, console.log);

function getOrderWithCustomer() {
    var fetchingStrategy = {customer : null}; 
    return Order.getById('a0000000-a000-0000-0000-000000000000', fetchingStrategy);
}

function printOrder(order) {
    var mappingStrategy = {customer : null};
    return order.toDto(mappingStrategy).then(console.log);
}

function onOk() {
    console.log('Done');
}