var rdb = require('rdb');
var db = rdb('postgres://demoUser:demoPassword@localhost/bartJs');
var reset = require('./reset');

var buf = new Buffer(10);
buf.write('\u00bd + \u00bc = \u00be', 0);

var Customer = rdb.table('customer');
Customer.primaryColumn('id').guid().default(null);
Customer.column('name').string().default('default name');
Customer.column('balance').numeric().default(2000);
Customer.column('registeredDate').date().default(new Date());
Customer.column('isActive').boolean().default(true);
Customer.column('picture').binary().default(buf);
/*unless overridden, numeric is default 0, 
string is default null, 
guid is default null,
date is default null,
binary is default null
booean is default false
*/                    

reset()
    .then(db.transaction)
    .then(insert)
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, console.log);

function insert() {
    var customer = Customer.insert('abcdef02-0000-0000-0000-000000000000')
    printCustomer(customer);
}

function printCustomer(customer) {
    var format = 'Id: %s, name: %s, Balance: %s, Registered Date: %s, Is Active: %s, Picture: %s'; 
    var args = [format, customer.id, customer.name, customer.balance, customer.registeredDate, customer.isActive, customer.picture];
    console.log.apply(null,args);
}

function onOk() {
    console.log('Done');
}