var rdb = require('rdb');

var dbPg = rdb('postgres://demoUser:demoPassword@localhost/bartJs');
var dbMySql = rdb.mySql('mysql://demoUser:demoPassword@localhost/bartJs?multipleStatements=true');

module.exports = connectPg()
    .then(connectMySql)
    .then(rdb.end)
    .then(onOk, console.log);


function connectPg() {
    return dbPg.transaction()
        .then(rdb.commit)
        .then(null, rdb.rollback);
}

function connectMySql() {
    return dbMySql.transaction()
        .then(rdb.commit)
        .then(null, rdb.rollback);
}

function onOk() {
    console.log('Pools ended.');
}