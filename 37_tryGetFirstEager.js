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
    .then(tryGetFirstOrderWithCustomer)
    .then(printOrder)
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, console.log);

function tryGetFirstOrderWithCustomer() {
    var filter = Order.customer.name.equal('John');
    var strategy = {customer : null};
    return Order.tryGetFirst(filter, strategy);
}

function printOrder(order) {
    var strategy = {customer: null};
    return order.toDto(strategy).then(console.log);
}

function onOk() {
    console.log('Done');
}