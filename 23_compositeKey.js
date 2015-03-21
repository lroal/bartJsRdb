var rdb = require('rdb');
var db = rdb('postgres://demoUser:demoPassword@localhost/bartJs');
var reset = require('./reset');

var Order = rdb.table('compositeOrder');
Order.primaryColumn('companyId').numeric();
Order.primaryColumn('orderNo').numeric();

var OrderLine = rdb.table('compositeOrderLine');
OrderLine.primaryColumn('companyId').numeric();
OrderLine.primaryColumn('orderNo').numeric();
OrderLine.primaryColumn('lineNo').numeric();
OrderLine.column('product').string();

var lineOrderJoin = OrderLine.join(Order).by('companyId', 'orderNo').as('order');
Order.hasMany(lineOrderJoin).as('lines');

reset()
    .then(db.transaction)
    .then(getOrder)
    .then(printOrder)
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, console.log);

function getOrder() {
    var companyId = 1;
    var orderId = 1001;
    return Order.getById(companyId, orderId);
}

function printOrder(order) {
    console.log('Company Id: %s, Order No: %s', order.companyId, order.orderNo)
    return order.lines.then(printLines); 
}

function printLines(lines) {
    lines.forEach(function(line){
        var format = 'Company Id: %s, Order No: %s, Line No: %s, Product: %s'; 
        var args = [format, line.companyId, line.orderNo, line.lineNo, line.product];
        console.log.apply(null,args);        
    });
}

function onOk() {
    console.log('Done');
}