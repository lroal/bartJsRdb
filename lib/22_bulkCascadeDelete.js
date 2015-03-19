var rdb = require('rdb');
var db = rdb('postgres://demoUser:demoPassword@localhost/bartJs');
var reset = require('./reset');

var Order = rdb.table('_order');
Order.primaryColumn('id').guid();
Order.column('orderNo').string();
Order.column('customerId').guid();

var Customer = rdb.table('customer');
Customer.primaryColumn('id').guid();
Customer.column('name').string();

var orderCustomerJoin = Order.join(Customer).by('customerId').as('customer');
Customer.hasMany(orderCustomerJoin).as('orders');

var DeliveryAddress = rdb.table('deliveryAddress');
DeliveryAddress.primaryColumn('id').guid();
DeliveryAddress.column('orderId').string();
DeliveryAddress.column('name').string();
DeliveryAddress.column('street').string();

var deliveryAddressOrderJoin = DeliveryAddress.join(Order).by('orderId').as('order');
Order.hasOne(deliveryAddressOrderJoin).as('deliveryAddress');

var OrderLine = rdb.table('orderLine');
OrderLine.primaryColumn('id').guid();
OrderLine.column('orderId').guid();
OrderLine.column('product').string();

var lineOrderJoin = OrderLine.join(Order).by('orderId').as('order');
Order.hasMany(lineOrderJoin).as('lines');

reset()
    .then(db.transaction)
    .then(deleteCustomer)
    .then(rdb.commit)
    .then(null, rdb.rollback)
    .then(onOk, onFailed);

function deleteCustomer() {
    var filter =  Customer.id.eq('87654399-0000-0000-0000-000000000000');
    Customer.cascadeDelete(filter);
}

function onOk() {
    console.log('Done');
}

function onFailed(err) {
    console.log('Rollback');
    console.log(err.stack);
}