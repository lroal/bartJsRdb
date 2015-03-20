var inspect = require('util').inspect;
var rdb = require('rdb');
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
    var isActive = Order.customer.isActive.eq(true);
    var didOrderCar = Order.lines.product.contains('car');
    var filter = isActive.and(didOrderCar);
    //alternatively rdb.filter.and(isActive).and(didOrderCar);
    return Order.getMany(filter);
}

function printOrders(orders) {
    var strategy = {customer: null, lines: null}
    return orders.toDto(strategy).then(printDtos);
}

function printDtos(dtos) {
    console.log(inspect(dtos,false,10));
}

function onOk() {
    console.log('Done');
}