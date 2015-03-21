var db = require('./db');
var Order = require('./db/order');

db.reset() 
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