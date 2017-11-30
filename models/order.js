var mongoose = require('mongoose');

// Order Schema
var OrderSchema = mongoose.Schema({
	content: {
		type: JSON,
	},
	complete: {
		type: Boolean,
		default: false
	},
	create_date: {
		type:Date,
		default: Date.now
	},
	update_date: {
		type:Date,
		default: Date.now
	}
});

var Order = module.exports = mongoose.model('Order', OrderSchema);

// Get All Orders
module.exports.getOrders = (callback, limit) => {
	Order.find(callback).limit(limit);
}

// Get Order
module.exports.getOrderById = (id, callback) => {
	Order.findById(id, callback);
}

// Add Order
module.exports.addOrder = (order, callback) => {
	Order.create(order, callback);
}

// Update Order
module.exports.updateOrder = (id, order, callback) => {
	var query = {_id: id};
	var update = {
		name: order.ordername,
		price: order.price,
		update_date: order.update_date,
		create_date: order.create_date,
	}
	Order.findOneAndUpdate(query, update, callback);
}

// Delete Order
module.exports.removeOrder = (id, callback) => {
	var query = {_id: id};
	Order.remove(query, callback);
}