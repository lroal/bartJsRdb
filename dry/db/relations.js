var order = require('./order');
var orderLine = require('./order/orderLine');
var deliveryAddress = require('./order/deliveryAddress');
var compositeOrder = require('./compositeOrder');
var compositeOrderLine = require('./compositeOrder/compositeOrderLine');
var customer = require('./customer');

var orderCustomerJoin = order.join(customer).by('customerId').as('customer');
customer.hasMany(orderCustomerJoin).as('orders');

var deliveryAddressOrderJoin = deliveryAddress.join(order).by('orderId').as('order');
order.hasOne(deliveryAddressOrderJoin).as('deliveryAddress');

var lineOrderJoin = orderLine.join(order).by('orderId').as('order');
order.hasMany(lineOrderJoin).as('lines');

var compositeLineOrderJoin = compositeOrderLine.join(compositeOrder).by('companyId', 'orderNo').as('order');
compositeOrder.hasMany(compositeLineOrderJoin).as('lines');