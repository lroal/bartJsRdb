var rdb = require('rdb');
var db = rdb('postgres://demoUser:demoPassword@localhost/bartJs');
var reset = require('./reset');

var Customer = rdb.table('customer');
Customer.primaryColumn('id').guid();
Customer.column('name').string();

reset()
    .then(db.transaction)
    .then(getAllCustomers)
    .then(printCustomers)
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, console.log);

function getAllCustomers() {
    return Customer.getMany();    
}

function printCustomers(customers) {
    customers.forEach(printCustomer);

    function printCustomer(customer) {
        console.log('Customer Id: %s, name: %s', customer.id, customer.name);
    }
}

function onOk() {
    console.log('Done');
}
