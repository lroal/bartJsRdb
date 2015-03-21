var rdb = require('rdb');

var order = rdb.table('_order');
order.primaryColumn('id').guid();
order.column('orderNo').string();
order.column('customerId').guid();

module.exports = order;