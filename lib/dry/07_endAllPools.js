var rdb = require('rdb');
var db = require('./db');
var dbMySql = db.mySql;

module.exports = connectPg()
    .then(connectMySql)
    .then(rdb.end)
    .then(onOk, console.log);


function connectPg() {
    return db.transaction()
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