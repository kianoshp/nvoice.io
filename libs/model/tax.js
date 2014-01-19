var mongoose = require('mongoose')
    , db = require('./db');

var TaxSchema = db.Schema({
	state: { type: String, required: true }
	, amount: Number
	, inventoryId: db.Schema.ObjectId
});

module.exports = mongoose.model('tax', TaxSchema);