var db = require('./db');
var Order = require('./db/order');

db.reset()
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