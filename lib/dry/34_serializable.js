var rdb = require('rdb');
var db = rdb('postgres://demoUser:demoPassword@localhost/bartJs');
var reset = require('./reset');

var User = rdb.table('_user');
User.primaryColumn('id').guid();
User.column('userId').string();
User.column('password').string().serializable(false);
User.column('salt').string().serializable(false);
User.column('email').string();

reset()
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