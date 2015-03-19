var rdb = require('rdb');

var order = rdb.table('compositeOrder');
order.primaryColumn('companyId').numeric();
order.primaryColumn('orderNo').numeric();

module.exports = order;
