var db = require('./db');
var Order = require('./db/compositeOrder');

db.reset()
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