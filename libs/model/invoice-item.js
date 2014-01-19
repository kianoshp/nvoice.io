var mongoose 		= require('mongoose')
    , db 			= require('./db');

var InvoiceItemSchema = new db.Schema({
	invoiceId: db.Schema.ObjectId
	, description: String
	, qty: Number
	, rate: Number
	, isFlatFee: { type: Boolean, default: false }
});

module.exports = mongoose.model('invoiceItem', InvoiceItemSchema);