var db = require('./db');

db.transaction()
    .then(throwError)
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, console.log);

function throwError() {
	throw new Error('some error..');
}

function onOk() {
    console.log('Done');
}