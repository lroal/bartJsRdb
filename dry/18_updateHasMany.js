var db = require('./db');
var Order = require('./db/order');
var OrderLine = require('./db/order/orderLine');

var orderIdWithNoLines = 'c0000000-c000-0000-0000-000000000000';

db.reset()
    .then(db.transaction)
    .then(insertOrderLine1)
    .then(insertOrderLine2)
    .then(printOrder)
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, console.log);

function insertOrderLine1() {
    var line = OrderLine.insert('eeeeeeee-0001-0000-0000-000000000000');
    line.orderId = orderIdWithNoLines;
    line.product = 'Roller blades';
    return line.order;
}

function insertOrderLine2() {
    var line = OrderLine.insert('eeeeeeee-0002-0000-0000-000000000000');
    line.orderId = orderIdWithNoLines;
    line.product = 'Helmet';
    return line.order;
}

function printOrder(order) {
    var format = 'Order Id: %s, Order No: %s'; 
    console.log(format, order.id, order.orderNo);
    return order.lines.then(printLines); 
}

function printLines(lines) {
    lines.forEach(function(line){
        var format = 'Line Id: %s, Order Id: %s, Product: %s'; 
        console.log(format, line.id, line.orderId, line.product)
    });
}

function onOk() {
    console.log('Success');
}