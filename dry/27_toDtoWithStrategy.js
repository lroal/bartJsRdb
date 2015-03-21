var db = require('./db');
var Order = require('./db/order');

db.reset()
    .then(db.transaction)
    .then(getOrder)
    .then(printOrder)
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, console.log);

function getOrder() {
    return Order.getById('b0000000-b000-0000-0000-000000000000');
}

function printOrder(order) {
    var strategy = {customer : null, lines : null, deliveryAddress : null};
    return order.toDto(strategy)
        .then(console.log);
}

function onOk() {
    console.log('Done');
}

