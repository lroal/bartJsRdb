var rdb = require('rdb');

var user = rdb.table('_user');
user.primaryColumn('id').guid();
user.column('userId').string();
user.column('password').string().serializable(false);
user.column('salt').string().serializable(false);
user.column('email').string();

module.exports = user;
