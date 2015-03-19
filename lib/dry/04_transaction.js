var db = require('./db');

db.transaction()
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, console.log);

function onOk() {
    console.log('Done');
}