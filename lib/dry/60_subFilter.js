var db = require('./db');
var Order = require('./db/order');

db.reset()
    .then(db.transaction)
    .then(getOrders)
    .then(printOrders)
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, console.log);

function getOrders() {
    var filter = Order.deliveryAddress.street.startsWith('Node');
    return Order.getMany(filter);
}

function printOrders(orders) {
    return orders.toDto().then(console.log);
}

function onOk() {
    console.log('Done');
}