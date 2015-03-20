var db = require('./db');
var User = require('./db/user');

db.reset()
    .then(db.transaction)
    .then(getUser)
    .then(printUser)
    .then(db.commit)
    .then(null, db.rollback)
    .then(onOk, console.log);

function getUser() {
    return User.getById('87654400-0000-0000-0000-000000000000');
}

function printUser(user) {
    return user.toDto().then(console.log);
    //will print all properties except password
    //because it is not serializable
}

function onOk() {
    console.log('Done');
}