var rdb = require('rdb');

var deliveryAddress = rdb.table('deliveryAddress');
deliveryAddress.primaryColumn('id').guid();
deliveryAddress.column('orderId').string();
deliveryAddress.column('name').string();
deliveryAddress.column('street').string();
deliveryAddress.column('postalCode').string();
deliveryAddress.column('postalPlace').string();
deliveryAddress.column('countryCode').string();
deliveryAddress.column('country').string();

module.exports = deliveryAddress;
