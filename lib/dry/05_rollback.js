var db = require('./db');

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