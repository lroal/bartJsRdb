var db = require('./db');
var Order = require('./db/order');
var DeliveryAddress = require('./db/order/deliveryAddress');

db.reset()
    .then(db.transaction)
    .then(insertDeliveryAddress)
    .then(printOrder)
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, console.log);

function insertDeliveryAddress() {
    var address = DeliveryAddress.insert('eeeeeeee-0000-0000-0000-000000000000');
    address.orderId = 'a0000000-a000-0000-0000-000000000000';
    address.name = 'Sgt. Pepper';
    address.street = 'L18 Penny Lane';
    return address.order;
}

function printOrder(order) {
    var format = 'Order Id: %s, Order No: %s';
    console.log(format, order.id, order.orderNo);
    return order.deliveryAddress.then(printDeliveryAddress);
}

function printDeliveryAddress(address) {
    var format = 'DeliveryAddress Id: %s, Order Id: %s, %s'; 
    console.log(format, address.id, address.orderId, address.name, address.street);
}

function onOk() {
    console.log('Success');
}