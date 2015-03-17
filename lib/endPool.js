var db = db('postgres://postgres:postgres@localhost/test');

module.exports = db.transaction()
    .then(db.commit)
    .then(null, db.rollback)
    .then(db.end)
    .then(onOk, onFailed);

function onOk() {
    console.log('Pool ended.');
}

function onFailed(err) {
    console.log('Rollback');
    console.log(err);
}