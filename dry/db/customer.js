var rdb = require('rdb');

var customer = rdb.table('customer');
customer.primaryColumn('id').guid();
customer.column('name').string();
customer.column('balance').numeric();
customer.column('registeredDate').date();
customer.column('isActive').boolean();
customer.column('picture').binary();

module.exports = customer;