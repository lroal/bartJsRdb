var inspect = require('util').inspect;
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
Customer.column('balance').string();
Customer.column('isActive').boolean();

var orderCustomerJoin = Order.join(Customer).by('customerId').as('customer');
Customer.hasMany(orderCustomerJoin).as('orders');

reset()
    .then(db.transaction)
    .then(getOrders)
    .then(printOrders)
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, console.log);

function getOrders() {
    var filter = {
        sql: 'exists (select 1 from customer where customer.id=customerId and customer.balance > 3000 and customer.name LIKE ?)',
        parameters: ['%o%']
    };
    return Order.getMany(filter);
}

function printOrders(orders) {
    var strategy = {customer: null}
    return orders.toDto(strategy).then(printDtos);
}

function printDtos(dtos) {
    console.log(inspect(dtos,false,10));
}

function onOk() {
    console.log('Done');
}