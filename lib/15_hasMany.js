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
    .then(getOrder)
    .then(printOrder)
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, console.log);

function getOrder() {
    return Order.getById('b0000000-b000-0000-0000-000000000000');
}

function printOrder(order) {
    var format = 'Order Id: %s, Order No: %s'; 
    console.log(format, order.id, order.orderNo);
    return order.lines.then(printLines); 
}

function printLines(lines) {
    lines.forEach(printLine);

    function printLine(line) {
        var format = 'Line Id: %s, Order Id: %s, Product: %s'; 
        console.log(format, line.id, line.orderId, line.product)
    }    
}

function onOk() {
    console.log('Done');
}