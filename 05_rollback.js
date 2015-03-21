var db = require('rdb')('postgres://demoUser:demoPassword@localhost/bartJs');

db.transaction()
    .then(db.commit)
    .then(throwError)
    .then(null, db.rollback)
    .then(onOk, console.log);

function throwError() {
	throw new Error('some error..');
}

function onOk() {
    console.log('Done');
}