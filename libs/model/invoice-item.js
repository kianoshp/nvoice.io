<<<<<<< HEAD
var mongoose = require('mongoose'),
    db = require('./db');

var InvoiceItemSchema = new db.Schema({
    invoiceId: db.Schema.ObjectId,
    description: String,
    qty: Number,
    rate: Number,
    isFlatFee: {
        type: Boolean,
        default: false
    }
=======
var mongoose        = require('mongoose')
    , db            = require('./db');

var InvoiceItemSchema = new db.Schema({
    invoiceId: db.Schema.ObjectId
    , description: String
    , qty: Number
    , rate: Number
    , isFlatFee: { type: Boolean, default: false }
>>>>>>> 3a9166cbaf0264bc0435f22fc5dae4551d8231a5
});

module.exports = mongoose.model('invoiceItem', InvoiceItemSchema);