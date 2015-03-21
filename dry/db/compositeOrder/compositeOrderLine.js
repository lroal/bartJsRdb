var rdb = require('rdb');

var orderLine = rdb.table('compositeOrderLine');
orderLine.primaryColumn('companyId').numeric();
orderLine.primaryColumn('orderNo').numeric();
orderLine.primaryColumn('lineNo').numeric();
orderLine.column('product').string();

module.exports = orderLine;