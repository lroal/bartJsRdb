var rdb = require('rdb');
var db = rdb('postgres://demoUser:demoPassword@localhost/bartJs');
var reset = require('./reset');

var Order = rdb.table('_order');
Order.primaryColumn('id').guid();
Order.column('orderNo').string();

var OrderLine = rdb.table('orderLine');
OrderLine.primaryColumn('id').guid();
OrderLine.column('orderId').guid();
OrderLine.column('product').string();

var lineOrderJoin = OrderLine.join(Order).by('orderId').as('order');
Order.hasMany(lineOrderJoin).as('lines');

reset()
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