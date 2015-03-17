var rdb = require('rdb');
var db = rdb('postgres://demoUser:demoPassword@localhost/bartJs');
var reset = require('./reset');

var Customer = rdb.table('customer');
Customer.primaryColumn('id').guid();
Customer.column('name').string();

reset()
    .then(db.transaction)
    .then(insert)
    .then(getById) //will use cache
    .then(verifyInserted)
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, console.log);

function insert() {
    var customer = Customer.insert('abcdef00-0000-0000-0000-000000000000')
    customer.name = 'Paul';
}

function getById() {
    return Customer.getById('abcdef00-0000-0000-0000-000000000000');
}

function verifyInserted(customer) {
    var format = 'Customer Id: %s, Customer Name: %s'; 
    console.log(format, customer.id, customer.name);
}

function onOk() {
    console.log('Done');
}