var rdb = require('rdb');

var orderLine = rdb.table('orderLine');
orderLine.primaryColumn('id').guid();
orderLine.column('orderId').guid();
orderLine.column('product').string();

module.exports = orderLine;
