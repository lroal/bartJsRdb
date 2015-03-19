var fs = require('fs');
var promise = require('promise');
var conString = require('./dry/db/connectionString');
var pg = require('pg');
var mySql = require('mysql');

//var drop = "DROP TABLE IF EXISTS compositeOrderLine;DROP TABLE IF EXISTS compositeOrder;DROP TABLE IF EXISTS deliveryAddress;DROP TABLE IF EXISTS orderLine;DROP TABLE IF EXISTS _order;DROP TABLE IF EXISTS customer;"
var drop = 'drop schema public cascade;create schema public;'
var createCustomer = "CREATE TABLE customer (id uuid PRIMARY KEY, name varchar(40), balance numeric, registeredDate timestamp with time zone, isActive boolean, picture bytea);"
var createUser = "CREATE TABLE _user (id uuid PRIMARY KEY, userId varchar(40), password varchar(40), salt text, email varchar(100));"
var createOrder = "CREATE TABLE _order (id uuid PRIMARY KEY, orderNo varchar(20), customerId uuid  REFERENCES customer);"
var createOrderLine = "CREATE TABLE orderLine (id uuid PRIMARY KEY, orderId uuid REFERENCES _order, product varchar(40));"
var createCompositeOrder = "CREATE TABLE compositeOrder (companyId numeric, orderNo numeric, customerId uuid  REFERENCES customer, PRIMARY KEY (companyId,orderNo));";
var createCompositeOrderLine = "CREATE TABLE compositeOrderLine (companyId numeric, orderNo numeric, lineNo numeric, product varchar(40), PRIMARY KEY (companyId,orderNo, lineNo));";
var createDeliveryAddress = "CREATE TABLE deliveryAddress (id uuid PRIMARY KEY, orderId uuid REFERENCES _order, name varchar(100), street varchar(200), postalCode varchar(50), postalPlace varchar(200), countryCode varchar(2), country varchar(100));";

var createSql = drop + createCustomer + createOrder + createOrderLine + createDeliveryAddress + createCompositeOrder +  createCompositeOrderLine + createUser;
var buffer;
var buffer2;

createBuffers();

var insertCustomer1 = "INSERT INTO customer VALUES ('a0000000-0000-0000-0000-000000000000','George',177,'2003-04-12 04:05:06 z',false," + buffer +  ");";
var insertCustomer2 = "INSERT INTO customer VALUES ('b0000000-0000-0000-0000-000000000000','John',3045,'2014-05-11 06:49:40.297-0200',true," + buffer2 +  ");";
var insertCustomer3 = "INSERT INTO customer VALUES ('12345678-0000-0000-0000-000000000000','Yoko',8765,'2012-02-10 07:00:40.297-0200',false," + buffer2 +  ");";
var insertCustomer4 = "INSERT INTO customer VALUES ('87654321-0000-0000-0000-000000000000','Johnny',8123,'2011-03-11 06:00:40.297-0200',true," + buffer2 +  ");";
var insertCustomer5 = "INSERT INTO customer VALUES ('87654399-0000-0000-0000-000000000000','Paul',8125,'2011-04-11 06:00:40.297-0200',true," + buffer2 +  ");";
var insertCustomers = insertCustomer1 + insertCustomer2 + insertCustomer3 + insertCustomer4 + insertCustomer5;

var insertUser1 = "INSERT INTO _user VALUES ('87654400-0000-0000-0000-000000000000','paul','secretPassword','salt123','paul@mccartney.net');";
var insertUser2 = "INSERT INTO _user VALUES ('97654400-0000-0000-0000-000000000000','john','myPassword','saltn pepper','john@lennon.net');";
var insertUsers = insertUser1 + insertUser2;

var insertOrders =
    "INSERT INTO _order VALUES ('a0000000-a000-0000-0000-000000000000','1000', 'a0000000-0000-0000-0000-000000000000');" +
    "INSERT INTO _order VALUES ('b0000000-b000-0000-0000-000000000000','1001', 'b0000000-0000-0000-0000-000000000000');" +
    "INSERT INTO _order VALUES ('c0000000-c000-0000-0000-000000000000','1002', null);" + 
    "INSERT INTO _order VALUES ('b0000000-d000-0000-0000-000000000000','1003', '87654399-0000-0000-0000-000000000000');" +
    "INSERT INTO compositeOrder VALUES (1,1001, null);";
var insertOrderLines =
    "INSERT INTO orderLine VALUES ('a0000000-a000-1000-0000-000000000000','a0000000-a000-0000-0000-000000000000','Bicycle');" +
    "INSERT INTO orderLine VALUES ('a0000000-a000-1001-0000-000000000000','a0000000-a000-0000-0000-000000000000','A small car');" +
    "INSERT INTO orderLine VALUES ('a0000000-a000-2000-0000-000000000000','a0000000-a000-0000-0000-000000000000','Skateboard');" +
    "INSERT INTO orderLine VALUES ('b0000000-b000-1000-0000-000000000000','b0000000-b000-0000-0000-000000000000','Climbing gear');" +
    "INSERT INTO orderLine VALUES ('b0000000-b000-2000-0000-000000000000','b0000000-b000-0000-0000-000000000000','Hiking shoes');" +
    "INSERT INTO orderLine VALUES ('b0000000-b000-3000-0000-000000000000','b0000000-b000-0000-0000-000000000000','A big car');" + 
    "INSERT INTO orderLine VALUES ('b0000000-b000-3100-0000-000000000000','b0000000-d000-0000-0000-000000000000','A yellow submarine');" + 
    "INSERT INTO compositeOrderLine VALUES (1,1001,1,'Free lunch');" +
    "INSERT INTO compositeOrderLine VALUES (1,1001,2,'Gide to the galaxy');";
var insertDeliveryAddress = "INSERT INTO deliveryAddress values ('dddddddd-0000-0000-0000-000000000000','b0000000-b000-0000-0000-000000000000', 'Lars-Erik Roald', 'Node Street 1', '7030', 'Trondheim', 'NO', 'Norway');"
    
var insertSql = insertCustomers + insertOrders + insertOrderLines + insertDeliveryAddress + insertUsers;

function createBuffers() {
    buffer = newBuffer([1, 2, 3]);
    buffer2 = newBuffer([4, 5]);

    function newBuffer(contents) {
        var buffer = new Buffer(contents);
        return "E'\\\\x" + buffer.toString('hex') + "'";
    }
}

function insert(onSuccess, onFailed) {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if (err) {
            console.log('Error while connecting: ' + err);
            onFailed(err);
            return;
        }
        client.query(createSql + insertSql, onInserted);

        function onInserted(err, result) {
            client.end();
            if (err) {
                console.error('error running query', err);
                onFailed(err);
                return;
            }
            onSuccess();
        }
    });
}


var resetOnce = new promise(insert);
module.exports = function() {
    return resetOnce;
};