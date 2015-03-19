var rdb = require('rdb');
var db = rdb('postgres://demoUser:demoPassword@localhost/bartJs');
var reset = require('./reset');

var Order = rdb.table('_order');
Order.primaryColumn('id').guid();
Order.column('customerId').guid();

var Customer = rdb.table('customer');
Customer.primaryColumn('id').guid();

var orderCustomerJoin = Order.join(Customer).by('customerId').as('customer');
Customer.hasMany(orderCustomerJoin).as('orders');

var DeliveryAddress = rdb.table('deliveryAddress');
DeliveryAddress.primaryColumn('id').guid();
DeliveryAddress.column('orderId').string();

var deliveryAddressOrderJoin = DeliveryAddress.join(Order).by('orderId').as('order');
Order.hasOne(deliveryAddressOrderJoin).as('deliveryAddress');

var OrderLine = rdb.table('orderLine');
OrderLine.primaryColumn('id').guid();
OrderLine.column('orderId').guid();

var lineOrderJoin = OrderLine.join(Order).by('orderId').as('order');
Order.hasMany(lineOrderJoin).as('lines');

reset()
    .then(db.transaction)
    .then(getById)
    .then(deleteCustomer)
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, console.log);

function getById() {
    return Customer.getById('87654399-0000-0000-0000-000000000000');
}

function deleteCustomer(customer) {
    customer.cascadeDelete();
}

function onOk() {
    console.log('Done');
}