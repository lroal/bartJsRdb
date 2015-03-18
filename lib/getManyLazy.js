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
    .then(getAllOrders)
    .then(printOrders)
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, console.log);

function getAllOrders() {
    return Order.getMany();
}

function printOrders(orders) {
    var printAllLines = [];
    var promiseChain;
    orders.forEach(function(order) {
        var next = printOrder.bind(null, order);
        if (!promiseChain)
            promiseChain = next;
        else 
            promiseChain.then(next)
    });

    function printOrder(order) {
        var format = 'Order Id: %s, Order No: %s'; 
        var args = [];
        console.log(format, order.id, order.orderNo);
    }
    return promiseChain;
}

function printLines(lines) {
    lines.forEach(printLine);

    function printLine(line) {
        var format = 'Line Id: %s, Order Id: %s, Product: %s'; 
        var args = [format, line.id, line.orderId, line.product];
        console.log.apply(null,args);
    }    
}

function onOk() {
    console.log('Done');
}