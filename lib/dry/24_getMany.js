var db = require('./db');
var Customer = require('./db/customer');

db.reset()
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
