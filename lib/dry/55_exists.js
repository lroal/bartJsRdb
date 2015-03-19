var rdb = require('rdb');
var db = rdb('postgres://demoUser:demoPassword@localhost/bartJs');
var reset = require('./reset');

var Order = rdb.table('_order');
Order.primaryColumn('id').guid();
Order.column('orderNo').string();

var DeliveryAddress = rdb.table('deliveryAddress');
DeliveryAddress.primaryColumn('id').guid();
DeliveryAddress.column('orderId').string();
DeliveryAddress.column('name').string();
DeliveryAddress.column('street').string();

var deliveryAddressOrderJoin = DeliveryAddress.join(Order).by('orderId').as('order');
Order.hasOne(deliveryAddressOrderJoin).as('deliveryAddress');

reset()
    .then(db.transaction)
    .then(getOrders)
    .then(printOrders)
    .then(rdb.commit)
    .then(null, rdb.rollback)
    .then(onOk, console.log);

function getOrders() {
    var filter = Order.deliveryAddress.exists();
    return Order.getMany(filter);
}

function printOrders(orders) {
    return orders.toDto().then(console.log);
}

function onOk() {
    console.log('Done');
}