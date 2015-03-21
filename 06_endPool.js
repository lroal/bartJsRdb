var db = require('rdb')('postgres://demoUser:demoPassword@localhost/bartJs');

db.transaction()
    .then(db.commit)
    .then(null, db.rollback)
    .then(db.end)
    .then(onOk, console.log);

function onOk() {
    console.log('Pool ended.');
}