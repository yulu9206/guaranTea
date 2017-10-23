var mongoose = require('mongoose');

// Tea Schema
var TeaSchema = mongoose.Schema({
	teaname: {
		type: String,
		required:true,
	},
	price: {
		type: Number,
		required:true,
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

var Tea = module.exports = mongoose.model('Tea', TeaSchema);

// Get All Teas
module.exports.getTeas = (callback, limit) => {
	Tea.find(callback).limit(limit);
}

// Get Tea
module.exports.getTeaById = (id, callback) => {
	Tea.findById(id, callback);
}

// Add Tea
module.exports.addTea = (tea, callback) => {
	Tea.create(tea, callback);
}

// Update Tea
module.exports.updateTea = (id, tea, option, callback) => {
	var query = {_id: id};
	var update = {
		name: tea.teaname,
		price: tea.price,
		update_date: Date.now,
		create_date: tea.create_date,
	}
	Tea.findOneAndUpdate(query, update, options, callback);
}

// Delete Tea
module.exports.removeTea = (id, callback) => {
	var query = {_id: id};
	Tea.remove(query, callback);
}