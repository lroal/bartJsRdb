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
    return order.toJSON() //expand all hasOne and hasMany relations
        .then(console.log);
}

function onOk() {
    console.log('Done');
}
