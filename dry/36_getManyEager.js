var db = require('./db');
var Order = require('./db/order');

db.reset()
    .then(db.transaction)
    .then(getOrdersWithLines)
    .then(printOrders)
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, console.log);

function getOrdersWithLines() {
    var emptyFilter;
    var strategy = {lines : null};
    return Order.getMany(emptyFilter, strategy);
}

function printOrders(orders) {
    return orders.toJSON().then(console.log);
}
function onOk() {
    console.log('Done');
}