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
    return Order.getMany();
}

function printOrders(orders) {
    var strategy = {customer : null, lines : null, deliveryAddress : null};
    return orders.toJSON(strategy).then(console.log);
}

function onOk() {
    console.log('Done');
}